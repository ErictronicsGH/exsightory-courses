"""
Generates the course's video asset: a real, playable H.264/MP4, from code.

Why write an encoder rather than ship a file: the test corpus must be wholly
synthetic and regenerable, there is no ffmpeg on this machine, and a video is
the one canvas kind that cannot be faked with a placeholder — the player has to
actually decode it.

The trick that makes this tractable is **I_PCM macroblocks**. H.264 lets a
macroblock carry raw samples instead of transformed, predicted, entropy-coded
residuals. That skips essentially all of an encoder: no motion estimation, no
DCT, no CAVLC residual coding. The output is large for its duration, which is
fine here — a few megabytes of real video is exactly what M03 needs to measure
range-decrypt throughput against.

Every frame is an IDR, so the file is also trivially seekable.

    python tools/gen-video.py
"""

import importlib.util
import math
import os
import struct

HERE = os.path.dirname(os.path.abspath(__file__))

_spec = importlib.util.spec_from_file_location("assets", os.path.join(HERE, "gen-assets.py"))
A = importlib.util.module_from_spec(_spec)
_spec.loader.exec_module(A)

WIDTH, HEIGHT = 400, 224          # both multiples of 16, so no cropping is needed
FPS = 12
SECONDS = 3
FRAMES = FPS * SECONDS


# ── Bitstream writing ──────────────────────────────────────────────────────

class BitWriter:
    def __init__(self):
        self.bytes = bytearray()
        self.acc = 0
        self.nbits = 0

    def u(self, value, count):
        for i in range(count - 1, -1, -1):
            self.acc = (self.acc << 1) | ((value >> i) & 1)
            self.nbits += 1
            if self.nbits == 8:
                self.bytes.append(self.acc)
                self.acc = 0
                self.nbits = 0

    def ue(self, value):
        """Exp-Golomb, unsigned."""
        code = value + 1
        length = code.bit_length()
        self.u(0, length - 1)
        self.u(code, length)

    def se(self, value):
        self.ue(2 * value - 1 if value > 0 else -2 * value)

    def raw_bytes(self, data):
        """Append whole bytes. Only valid when already byte-aligned."""
        assert self.nbits == 0, "raw_bytes requires byte alignment"
        self.bytes += data

    def byte_align_zero(self):
        while self.nbits != 0:
            self.u(0, 1)

    def is_aligned(self):
        return self.nbits == 0

    def rbsp_trailing(self):
        self.u(1, 1)
        self.byte_align_zero()

    def data(self):
        assert self.nbits == 0, "bitstream must end byte-aligned"
        return bytes(self.bytes)


def to_ebsp(rbsp):
    """Insert emulation-prevention bytes: 00 00 0x -> 00 00 03 0x."""
    out = bytearray()
    zeros = 0
    for b in rbsp:
        if zeros >= 2 and b <= 3:
            out.append(0x03)
            zeros = 0
        out.append(b)
        zeros = zeros + 1 if b == 0 else 0
    return bytes(out)


# ── SPS / PPS / slices ─────────────────────────────────────────────────────

PROFILE_IDC = 66      # Baseline: no CABAC, no B-frames. Decoded by everything.
LEVEL_IDC = 30

def build_sps():
    w = BitWriter()
    w.u(0, 1); w.u(3, 2); w.u(7, 5)          # NAL header: ref_idc 3, type 7 (SPS)
    w.u(PROFILE_IDC, 8)
    w.u(0xE0, 8)                             # constraint_set0/1/2, reserved zero
    w.u(LEVEL_IDC, 8)
    w.ue(0)                                  # seq_parameter_set_id
    w.ue(0)                                  # log2_max_frame_num_minus4 -> 4 bits
    w.ue(2)                                  # pic_order_cnt_type 2: output = decode order
    w.ue(1)                                  # max_num_ref_frames
    w.u(0, 1)                                # gaps_in_frame_num_value_allowed_flag
    w.ue(WIDTH // 16 - 1)
    w.ue(HEIGHT // 16 - 1)
    w.u(1, 1)                                # frame_mbs_only_flag
    w.u(1, 1)                                # direct_8x8_inference_flag
    w.u(0, 1)                                # frame_cropping_flag
    w.u(0, 1)                                # vui_parameters_present_flag
    w.rbsp_trailing()
    return to_ebsp(w.data())


def build_pps():
    w = BitWriter()
    w.u(0, 1); w.u(3, 2); w.u(8, 5)          # NAL header: type 8 (PPS)
    w.ue(0)                                  # pic_parameter_set_id
    w.ue(0)                                  # seq_parameter_set_id
    w.u(0, 1)                                # entropy_coding_mode_flag: CAVLC
    w.u(0, 1)                                # bottom_field_pic_order_in_frame_present
    w.ue(0)                                  # num_slice_groups_minus1
    w.ue(0)                                  # num_ref_idx_l0_default_active_minus1
    w.ue(0)                                  # num_ref_idx_l1_default_active_minus1
    w.u(0, 1)                                # weighted_pred_flag
    w.u(0, 2)                                # weighted_bipred_idc
    w.se(0)                                  # pic_init_qp_minus26
    w.se(0)                                  # pic_init_qs_minus26
    w.se(0)                                  # chroma_qp_index_offset
    w.u(0, 1)                                # deblocking_filter_control_present_flag
    w.u(0, 1)                                # constrained_intra_pred_flag
    w.u(0, 1)                                # redundant_pic_cnt_present_flag
    w.rbsp_trailing()
    return to_ebsp(w.data())


MB_TYPE_I_PCM = 25


def build_idr_slice(y_plane, u_plane, v_plane, idr_id):
    w = BitWriter()
    w.u(0, 1); w.u(3, 2); w.u(5, 5)          # NAL header: type 5 (IDR slice)

    w.ue(0)                                  # first_mb_in_slice
    w.ue(7)                                  # slice_type 7: I, and all slices are I
    w.ue(0)                                  # pic_parameter_set_id
    w.u(0, 4)                                # frame_num (IDR resets it)
    w.ue(idr_id)                             # idr_pic_id
    # pic_order_cnt_type is 2, so no POC syntax here.
    w.u(0, 1)                                # no_output_of_prior_pics_flag
    w.u(0, 1)                                # long_term_reference_flag
    w.se(0)                                  # slice_qp_delta (unused by I_PCM)

    mbw = WIDTH // 16
    for mb in range(mbw * (HEIGHT // 16)):
        mx, my = (mb % mbw) * 16, (mb // mbw) * 16
        w.ue(MB_TYPE_I_PCM)
        while not w.is_aligned():             # pcm_alignment_zero_bit
            w.u(0, 1)

        # Byte-aligned from here, so the samples go in as whole bytes.
        pcm = bytearray()
        for row in range(16):
            base = (my + row) * WIDTH + mx
            pcm += y_plane[base:base + 16]
        for plane in (u_plane, v_plane):
            for row in range(8):
                base = (my // 2 + row) * (WIDTH // 2) + mx // 2
                pcm += plane[base:base + 8]
        w.raw_bytes(pcm)

    w.rbsp_trailing()
    return to_ebsp(w.data())


# -- Colour conversion ------------------------------------------------------

def rgb_to_yuv420(canvas):
    """BT.601 studio swing, which is what a baseline decoder assumes."""
    w, h, px = canvas.w, canvas.h, canvas.px
    y = bytearray(w * h)
    u = bytearray((w // 2) * (h // 2))
    v = bytearray((w // 2) * (h // 2))

    for j in range(h):
        row = j * w
        for i in range(w):
            k = (row + i) * 3
            r, g, b = px[k], px[k + 1], px[k + 2]
            y[row + i] = min(235, max(16, int(0.257 * r + 0.504 * g + 0.098 * b + 16)))

    for j in range(0, h, 2):
        for i in range(0, w, 2):
            r = g = b = 0
            for dy in (0, 1):
                for dx in (0, 1):
                    k = ((j + dy) * w + (i + dx)) * 3
                    r += px[k]
                    g += px[k + 1]
                    b += px[k + 2]
            r, g, b = r / 4.0, g / 4.0, b / 4.0
            idx = (j // 2) * (w // 2) + (i // 2)
            u[idx] = min(240, max(16, int(-0.148 * r - 0.291 * g + 0.439 * b + 128)))
            v[idx] = min(240, max(16, int(0.439 * r - 0.368 * g - 0.071 * b + 128)))

    return y, u, v


# -- The frames: a scope trace of the supply under a step load --------------

def render_frame(n, total):
    """
    One frame of the bring-up test: a 2 A step load applied to the finished
    supply, seen on the scope. The output dips, the loop recovers it, and the
    ripple grows because the load current grew.
    """
    c = A.Canvas(WIDTH, HEIGHT, A.INK)
    t = n / total

    A.text(c, 14, 12, "FULL LOAD STEP TEST", A.TEXT, 2)
    A.text(c, 14, 36, "CH1 OUTPUT  200 MV/DIV  AC COUPLED", A.MUTED, 1)

    gx0, gy0, gx1, gy1 = 14, 58, WIDTH - 14, HEIGHT - 44
    c.rect(gx0, gy0, gx1, gy1, A.SURFACE)
    for i in range(1, 10):
        x = gx0 + (gx1 - gx0) * i / 10.0
        c.line(x, gy0, x, gy1, A.GRID, 1)
    for i in range(1, 6):
        y = gy0 + (gy1 - gy0) * i / 6.0
        c.line(gx0, y, gx1, y, A.GRID, 1)

    mid = (gy0 + gy1) / 2.0

    # The load step arrives 30 per cent in and stays on.
    step_at = 0.30
    loaded = t >= step_at

    pts = []
    span = int(gx1 - gx0)
    for px in range(span):
        frac = px / float(span)
        # Ripple at twice mains, with an amplitude set by how much current flows.
        amp = 6.0 if not loaded else 20.0
        phase = frac * 18 * math.pi + n * 0.55
        ripple = math.sin(phase) * amp
        # Sawtooth character: the cap charges fast and discharges slowly.
        ripple += (((phase / math.pi) % 2.0) - 1.0) * amp * 0.55

        # The transient itself, decaying as the loop recovers.
        sag = 0.0
        if loaded:
            since = (t - step_at) * total / float(FPS)
            local = frac - 0.18
            if local > -0.02:
                sag = -70.0 * math.exp(-max(0.0, local) * 26.0) * math.exp(-since * 0.9)

        pts.append((gx0 + px, mid - ripple - sag))

    c.line(gx0, mid, gx1, mid, A.MUTED, 1)
    c.curve(pts, A.TEAL, 2)

    # A load-state lamp, so a paused scrub still reads correctly.
    lamp = A.AMBER if loaded else A.GRID
    c.rect(gx1 - 104, gy0 + 8, gx1 - 90, gy0 + 22, lamp)
    A.text(c, gx1 - 82, gy0 + 8, "2 A LOAD" if loaded else "NO LOAD", lamp, 1)

    readout = "RIPPLE 210 MV P-P" if loaded else "RIPPLE 62 MV P-P"
    A.text(c, 14, HEIGHT - 34, readout, A.TEXT, 1)
    A.text(c, WIDTH - 150, HEIGHT - 34, "T PLUS %0.2f S" % (n / float(FPS)), A.MUTED, 1)

    # Progress hairline: makes it obvious at a glance that this is moving.
    c.rect(0, HEIGHT - 4, int(WIDTH * (n + 1) / float(total)), HEIGHT - 1, A.TEAL)
    return c


# -- MP4 container ----------------------------------------------------------

def box(tag, *payload):
    body = b"".join(payload)
    return struct.pack(">I", len(body) + 8) + tag + body


def full_box(tag, version, flags, *payload):
    head = struct.pack(">B", version) + struct.pack(">I", flags)[1:]
    return box(tag, head, *payload)


def build_mp4(samples, sps, pps, timescale, frame_ticks):
    """samples: a list of AVCC access units, each a 4-byte length plus its NAL."""
    duration = frame_ticks * len(samples)

    avcc = box(b"avcC",
               bytes([1, sps[1], sps[2], sps[3], 0xFF, 0xE1]) +
               struct.pack(">H", len(sps)) + sps +
               bytes([1]) + struct.pack(">H", len(pps)) + pps)

    avc1 = box(b"avc1",
               b"\x00" * 6 + struct.pack(">H", 1) +
               b"\x00" * 16 +
               struct.pack(">HH", WIDTH, HEIGHT) +
               struct.pack(">II", 0x00480000, 0x00480000) +
               struct.pack(">I", 0) + struct.pack(">H", 1) +
               b"\x00" * 32 +
               struct.pack(">H", 0x0018) + struct.pack(">h", -1),
               avcc)

    stbl = box(b"stbl",
               full_box(b"stsd", 0, 0, struct.pack(">I", 1), avc1),
               full_box(b"stts", 0, 0, struct.pack(">I", 1),
                        struct.pack(">II", len(samples), frame_ticks)),
               # Every frame is an IDR, so every sample is a sync sample and an
               # stss box may be omitted entirely.
               full_box(b"stsc", 0, 0, struct.pack(">I", 1),
                        struct.pack(">III", 1, 1, 1)),
               full_box(b"stsz", 0, 0, struct.pack(">I", 0),
                        struct.pack(">I", len(samples)) +
                        b"".join(struct.pack(">I", len(s)) for s in samples)),
               full_box(b"stco", 0, 0, struct.pack(">I", len(samples)),
                        b"\x00" * (4 * len(samples))))

    minf = box(b"minf",
               full_box(b"vmhd", 0, 1, struct.pack(">HHHH", 0, 0, 0, 0)),
               box(b"dinf", full_box(b"dref", 0, 0, struct.pack(">I", 1),
                                     full_box(b"url ", 0, 1))),
               stbl)

    mdia = box(b"mdia",
               full_box(b"mdhd", 0, 0,
                        struct.pack(">IIII", 0, 0, timescale, duration) +
                        struct.pack(">HH", 0x55C4, 0)),
               full_box(b"hdlr", 0, 0,
                        struct.pack(">I", 0) + b"vide" + b"\x00" * 12 +
                        b"INSIGHT test\x00"),
               minf)

    unity = struct.pack(">9i", 0x10000, 0, 0, 0, 0x10000, 0, 0, 0, 0x40000000)

    trak = box(b"trak",
               full_box(b"tkhd", 0, 3,
                        struct.pack(">IIIII", 0, 0, 1, 0, duration) +
                        b"\x00" * 8 + struct.pack(">hhhh", 0, 0, 0, 0) + unity +
                        struct.pack(">II", WIDTH << 16, HEIGHT << 16)),
               mdia)

    moov = box(b"moov",
               full_box(b"mvhd", 0, 0,
                        struct.pack(">IIII", 0, 0, timescale, duration) +
                        struct.pack(">Ihh", 0x00010000, 0x0100, 0) + b"\x00" * 8 +
                        unity + b"\x00" * 24 + struct.pack(">I", 2)),
               trak)

    ftyp = box(b"ftyp", b"isom" + struct.pack(">I", 512) + b"isomiso2avc1mp41")

    mdat_body = b"".join(samples)
    mdat_start = len(ftyp) + len(moov) + 8

    offsets, cursor = [], mdat_start
    for s in samples:
        offsets.append(cursor)
        cursor += len(s)

    # Patch stco now the real offsets are known. Finding the placeholder by tag
    # keeps this correct if any box above it changes size.
    moov = bytearray(moov)
    at = moov.index(b"stco") + 4 + 4 + 4
    for i, off in enumerate(offsets):
        moov[at + i * 4: at + i * 4 + 4] = struct.pack(">I", off)

    return ftyp + bytes(moov) + box(b"mdat", mdat_body)


# -- Entry ------------------------------------------------------------------

def main():
    out = os.path.normpath(os.path.join(
        HERE, "..", "src", "content", "03-build", "030-wrap-up",
        "assets", "full-load-test.mp4"))

    sps, pps = build_sps(), build_pps()
    samples = []

    for n in range(FRAMES):
        frame = render_frame(n, FRAMES)
        y, u, v = rgb_to_yuv420(frame)
        nal = build_idr_slice(y, u, v, n % 65536)
        samples.append(struct.pack(">I", len(nal)) + nal)
        if (n + 1) % 12 == 0:
            print("  encoded %d/%d frames" % (n + 1, FRAMES))

    data = build_mp4(samples, sps, pps, timescale=FPS * 100, frame_ticks=100)

    os.makedirs(os.path.dirname(out), exist_ok=True)
    with open(out, "wb") as f:
        f.write(data)

    print("full-load-test.mp4              %9d bytes  %dx%d  %d frames  %d fps"
          % (len(data), WIDTH, HEIGHT, FRAMES, FPS))


if __name__ == "__main__":
    main()
