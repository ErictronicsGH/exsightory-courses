"""
Generates the binary assets for the bench-supply test course.

Every asset here is synthesised from code rather than downloaded, for the same
reason the course text is invented: nothing in the test corpus should be
something we do not own or cannot regenerate. Run it again and you get the same
bytes.

    python tools/gen-assets.py
"""

import math
import os
import struct
import zlib

HERE = os.path.dirname(os.path.abspath(__file__))
SRC = os.path.join(HERE, "..", "src")

# The Instrument Panel palette (spec 2.1). Amber is an analog quantity, teal a
# measured one; the plots below honour that rather than picking pretty colours.
INK        = (0x0E, 0x14, 0x1A)
SURFACE    = (0x12, 0x1A, 0x22)
GRID       = (0x24, 0x30, 0x3C)
TEXT       = (0xD4, 0xDE, 0xE8)
MUTED      = (0x7A, 0x8A, 0x9A)
AMBER      = (0xD4, 0xA0, 0x17)
TEAL       = (0x1F, 0xB8, 0xA6)
VIOLET     = (0x7A, 0x6E, 0xD4)
RED        = (0xC2, 0x4B, 0x3F)


class Canvas:
    """A tiny RGB raster with just enough drawing to make a legible plot."""

    def __init__(self, width, height, background=SURFACE):
        self.w = width
        self.h = height
        self.px = bytearray(width * height * 3)
        for i in range(width * height):
            self.px[i * 3 : i * 3 + 3] = bytes(background)

    def set(self, x, y, colour):
        if 0 <= x < self.w and 0 <= y < self.h:
            i = (y * self.w + x) * 3
            self.px[i : i + 3] = bytes(colour)

    def blend(self, x, y, colour, alpha):
        if not (0 <= x < self.w and 0 <= y < self.h):
            return
        i = (y * self.w + x) * 3
        for c in range(3):
            base = self.px[i + c]
            self.px[i + c] = int(base + (colour[c] - base) * alpha)

    def rect(self, x0, y0, x1, y1, colour):
        for y in range(int(y0), int(y1)):
            for x in range(int(x0), int(x1)):
                self.set(x, y, colour)

    def line(self, x0, y0, x1, y1, colour, width=1):
        """Anti-aliased line, thick enough to survive screen-share compression."""
        steps = int(max(abs(x1 - x0), abs(y1 - y0)) * 2) + 1
        for s in range(steps + 1):
            t = s / steps
            x = x0 + (x1 - x0) * t
            y = y0 + (y1 - y0) * t
            self.dot(x, y, colour, width)

    def dot(self, x, y, colour, width=1):
        r = width / 2
        for dy in range(int(-r) - 1, int(r) + 2):
            for dx in range(int(-r) - 1, int(r) + 2):
                px, py = int(x) + dx, int(y) + dy
                d = math.hypot(px + 0.5 - x, py + 0.5 - y)
                a = max(0.0, min(1.0, r + 0.5 - d))
                if a > 0:
                    self.blend(px, py, colour, a)

    def curve(self, points, colour, width=2):
        for i in range(len(points) - 1):
            self.line(points[i][0], points[i][1], points[i + 1][0], points[i + 1][1], colour, width)

    def write_png(self, path):
        raw = bytearray()
        for y in range(self.h):
            raw.append(0)
            raw += self.px[y * self.w * 3 : (y + 1) * self.w * 3]

        def chunk(tag, data):
            out = struct.pack(">I", len(data)) + tag + data
            return out + struct.pack(">I", zlib.crc32(tag + data) & 0xFFFFFFFF)

        png = b"\x89PNG\r\n\x1a\n"
        png += chunk(b"IHDR", struct.pack(">IIBBBBB", self.w, self.h, 8, 2, 0, 0, 0))
        png += chunk(b"IDAT", zlib.compress(bytes(raw), 9))
        png += chunk(b"IEND", b"")

        os.makedirs(os.path.dirname(path), exist_ok=True)
        with open(path, "wb") as f:
            f.write(png)
        return len(png)


# ── 5x7 bitmap font, enough for axis labels and titles ─────────────────────

FONT = {
    "A": ["01110","10001","10001","11111","10001","10001","10001"],
    "B": ["11110","10001","10001","11110","10001","10001","11110"],
    "C": ["01110","10001","10000","10000","10000","10001","01110"],
    "D": ["11110","10001","10001","10001","10001","10001","11110"],
    "E": ["11111","10000","10000","11110","10000","10000","11111"],
    "F": ["11111","10000","10000","11110","10000","10000","10000"],
    "G": ["01110","10001","10000","10111","10001","10001","01111"],
    "H": ["10001","10001","10001","11111","10001","10001","10001"],
    "I": ["01110","00100","00100","00100","00100","00100","01110"],
    "J": ["00111","00010","00010","00010","00010","10010","01100"],
    "K": ["10001","10010","10100","11000","10100","10010","10001"],
    "L": ["10000","10000","10000","10000","10000","10000","11111"],
    "M": ["10001","11011","10101","10101","10001","10001","10001"],
    "N": ["10001","11001","10101","10011","10001","10001","10001"],
    "O": ["01110","10001","10001","10001","10001","10001","01110"],
    "P": ["11110","10001","10001","11110","10000","10000","10000"],
    "Q": ["01110","10001","10001","10001","10101","10010","01101"],
    "R": ["11110","10001","10001","11110","10100","10010","10001"],
    "S": ["01111","10000","10000","01110","00001","00001","11110"],
    "T": ["11111","00100","00100","00100","00100","00100","00100"],
    "U": ["10001","10001","10001","10001","10001","10001","01110"],
    "V": ["10001","10001","10001","10001","10001","01010","00100"],
    "W": ["10001","10001","10001","10101","10101","11011","10001"],
    "X": ["10001","10001","01010","00100","01010","10001","10001"],
    "Y": ["10001","10001","01010","00100","00100","00100","00100"],
    "Z": ["11111","00001","00010","00100","01000","10000","11111"],
    "0": ["01110","10001","10011","10101","11001","10001","01110"],
    "1": ["00100","01100","00100","00100","00100","00100","01110"],
    "2": ["01110","10001","00001","00110","01000","10000","11111"],
    "3": ["11111","00010","00100","00010","00001","10001","01110"],
    "4": ["00010","00110","01010","10010","11111","00010","00010"],
    "5": ["11111","10000","11110","00001","00001","10001","01110"],
    "6": ["00110","01000","10000","11110","10001","10001","01110"],
    "7": ["11111","00001","00010","00100","01000","01000","01000"],
    "8": ["01110","10001","10001","01110","10001","10001","01110"],
    "9": ["01110","10001","10001","01111","00001","00010","01100"],
    " ": ["00000","00000","00000","00000","00000","00000","00000"],
    ".": ["00000","00000","00000","00000","00000","01100","01100"],
    ",": ["00000","00000","00000","00000","01100","01100","01000"],
    "-": ["00000","00000","00000","11111","00000","00000","00000"],
    "/": ["00001","00010","00010","00100","01000","01000","10000"],
    "(": ["00010","00100","01000","01000","01000","00100","00010"],
    ")": ["01000","00100","00010","00010","00010","00100","01000"],
    ":": ["00000","01100","01100","00000","01100","01100","00000"],
    "%": ["11001","11010","00010","00100","01000","01011","10011"],
    "+": ["00000","00100","00100","11111","00100","00100","00000"],
    "=": ["00000","00000","11111","00000","11111","00000","00000"],
    "*": ["00000","10101","01110","11111","01110","10101","00000"],
}


def text(canvas, x, y, string, colour, scale=2):
    cx = x
    for ch in string.upper():
        glyph = FONT.get(ch, FONT[" "])
        for gy, row in enumerate(glyph):
            for gx, bit in enumerate(row):
                if bit == "1":
                    canvas.rect(cx + gx * scale, y + gy * scale,
                                cx + (gx + 1) * scale, y + (gy + 1) * scale, colour)
        cx += 6 * scale
    return cx


def text_width(string, scale=2):
    return len(string) * 6 * scale


# ── Plot scaffolding ───────────────────────────────────────────────────────

def plot_frame(c, x0, y0, x1, y1, title, xlabel, ylabel):
    """Axes, grid and labels. Everything below draws inside the returned box."""
    c.rect(0, 0, c.w, c.h, INK)
    c.rect(x0 - 1, y0 - 1, x1 + 1, y1 + 1, SURFACE)

    for i in range(1, 8):
        gx = x0 + (x1 - x0) * i / 8
        c.line(gx, y0, gx, y1, GRID, 1)
    for i in range(1, 5):
        gy = y0 + (y1 - y0) * i / 5
        c.line(x0, gy, x1, gy, GRID, 1)

    c.line(x0, y0, x0, y1, MUTED, 2)
    c.line(x0, y1, x1, y1, MUTED, 2)

    # Title above, axis names clear of the ticks. An axis label sitting on top
    # of its own last tick is the commonest way a generated plot reads as sloppy.
    text(c, x0, y0 - 62, title, TEXT, 2)
    text(c, x0, y0 - 34, ylabel, MUTED, 2)
    text(c, (x0 + x1) / 2 - text_width(xlabel, 2) / 2, y1 + 46, xlabel, MUTED, 2)


def legend(c, x, y, entries, scale=2):
    for label, colour in entries:
        c.rect(x, y + 4, x + 18, y + 10, colour)
        text(c, x + 26, y, label, TEXT, scale)
        y += 22


# ── 1. Rectifier waveforms ─────────────────────────────────────────────────

def rectifier_waveforms(path):
    c = Canvas(1000, 776)
    c.rect(0, 0, c.w, c.h, INK)
    text(c, 40, 24, "RECTIFICATION: THE SAME INPUT, THREE ARRANGEMENTS", TEXT, 2)

    panels = [
        ("HALF-WAVE", lambda t: max(0.0, math.sin(t)), AMBER),
        ("FULL-WAVE BRIDGE", lambda t: abs(math.sin(t)), TEAL),
        ("CENTRE-TAPPED", lambda t: abs(math.sin(t)), VIOLET),
    ]

    top = 80
    for name, fn, colour in panels:
        x0, y0, x1, y1 = 120, top, 940, top + 160
        c.rect(x0, y0, x1, y1, SURFACE)
        # Zero sits mid-panel, not on the floor: the input's negative half has
        # to be visible inside its own panel, or the plot cannot show what
        # rectification actually discards.
        mid = (y0 + y1) / 2 + 24

        for i in range(1, 8):
            gx = x0 + (x1 - x0) * i / 8
            c.line(gx, y0, gx, y1, GRID, 1)
        c.line(x0, mid, x1, mid, MUTED, 1)

        # The input, drawn faintly behind, so the loss is visible not asserted.
        raw = []
        out = []
        amp = 52
        for px in range(int(x1 - x0)):
            t = px / (x1 - x0) * 4 * math.pi
            raw.append((x0 + px, mid - math.sin(t) * amp))
            out.append((x0 + px, mid - fn(t) * amp))
        c.curve(raw, GRID, 2)
        c.curve(out, colour, 3)

        text(c, x0 + 8, y0 + 8, name, colour, 2)
        text(c, 84, mid - 7, "0", MUTED, 2)
        top += 200

    text(c, 120, top + 10, "TIME  (TWO MAINS CYCLES)", MUTED, 2)
    legend(c, 660, top + 4, [("OUTPUT", TEXT), ("INPUT, FOR REFERENCE", GRID)], 2)
    return c.write_png(path)


# ── 2. Ripple against load ─────────────────────────────────────────────────

def ripple_vs_load(path):
    c = Canvas(1000, 700)
    x0, y0, x1, y1 = 110, 120, 940, 520
    plot_frame(c, x0, y0, x1, y1,
               "SMOOTHING: RIPPLE RISES WITH LOAD, FALLS WITH CAPACITANCE",
               "LOAD CURRENT (A)", "RIPPLE P-P (V)")

    # V = I t / C, with t = 10 ms for a full-wave rectifier on 50 Hz mains.
    for cap_uf, colour, label in [(2200, RED, "2200 UF"),
                                  (4700, AMBER, "4700 UF"),
                                  (10000, TEAL, "10000 UF")]:
        pts = []
        for step in range(101):
            amps = step / 100 * 3.0
            volts = amps * 0.010 / (cap_uf * 1e-6)
            pts.append((x0 + (x1 - x0) * amps / 3.0,
                        y1 - (y1 - y0) * min(volts, 14.0) / 14.0))
        c.curve(pts, colour, 3)

    for i in range(4):
        text(c, x0 + (x1 - x0) * i / 3 - 8, y1 + 14, str(i), MUTED, 2)
    for i in range(5):
        text(c, x0 - 40, y1 - (y1 - y0) * i / 4 - 7, str(i * 3) + ("" if i else ""), MUTED, 2)

    legend(c, x0 + 40, y0 + 20,
           [("2200 UF", RED), ("4700 UF", AMBER), ("10000 UF", TEAL)])
    text(c, x0, y1 + 96, "AT 2 A A 4700 UF CAP GIVES OVER 4 V OF RIPPLE - AND THE", MUTED, 2)
    text(c, x0, y1 + 120, "REGULATOR MUST STILL CLEAR DROPOUT AT THE TROUGH", MUTED, 2)
    return c.write_png(path)


# ── 3. Current-limit curves ────────────────────────────────────────────────

def limit_curves(path):
    c = Canvas(1000, 700)
    x0, y0, x1, y1 = 110, 120, 940, 520
    plot_frame(c, x0, y0, x1, y1,
               "CURRENT LIMITING: CONSTANT CURRENT AGAINST FOLDBACK",
               "OUTPUT CURRENT (A)", "OUTPUT VOLTAGE (V)")

    def to_px(amps, volts):
        return (x0 + (x1 - x0) * amps / 1.4, y1 - (y1 - y0) * volts / 24.0)

    # The regulating region is shared - both schemes behave identically until
    # the limit - so it is drawn once, in neutral. Overlaying two coloured
    # curves here would hide whichever was drawn first and imply a difference
    # that does not exist.
    c.curve([to_px(a / 100 * 1.0, 20.0) for a in range(101)], MUTED, 3)
    text(c, x0 + 30, to_px(0, 20.0)[1] - 34, "REGULATING - IDENTICAL", MUTED, 2)

    # Constant current: the limit holds while the voltage collapses.
    c.curve([to_px(1.0, 20.0 - v / 100 * 20.0) for v in range(101)], TEAL, 4)

    # Foldback: the limit itself retreats as the output collapses.
    c.curve([to_px(1.0 - (v / 100) ** 1.4 * 0.72, 20.0 - v / 100 * 20.0)
             for v in range(101)], AMBER, 4)

    for i in range(8):
        amps = i * 0.2
        text(c, to_px(amps, 0)[0] - 18, y1 + 14, f"{amps:.1f}".replace("0.0", "0"), MUTED, 2)
    for i in range(5):
        volts = i * 6
        text(c, x0 - 44, to_px(0, volts)[1] - 7, str(volts), MUTED, 2)

    sx, sy = to_px(1.0, 0.0)
    c.dot(sx, sy, TEAL, 12)
    text(c, sx - 150, sy - 40, "SHORT: 1.0 A", TEAL, 2)
    fx, fy = to_px(0.28, 0.0)
    c.dot(fx, fy, AMBER, 12)
    text(c, fx - 150, fy - 70, "SHORT: 0.28 A", AMBER, 2)

    # Lower right: the only quadrant both curves leave empty.
    legend(c, x0 + 620, y0 + 170,
           [("CONSTANT CURRENT", TEAL), ("FOLDBACK", AMBER)])
    text(c, x0, y1 + 96, "BOTH PROTECT THE LOAD. ONLY ONE PROTECTS THE PASS", MUTED, 2)
    text(c, x0, y1 + 120, "TRANSISTOR, WHICH IS HOTTEST INTO A DEAD SHORT", MUTED, 2)
    return c.write_png(path)


# ── 4. Test bench layout ───────────────────────────────────────────────────

def test_setup(path):
    c = Canvas(1000, 620)
    c.rect(0, 0, c.w, c.h, INK)
    text(c, 40, 28, "THE BRING-UP BENCH", TEXT, 3)
    text(c, 40, 66, "NOTHING VALUABLE IS CONNECTED", MUTED, 2)

    def box(x, y, w, h, label, sub, colour):
        c.rect(x, y, x + w, y + h, SURFACE)
        for t in range(3):
            c.rect(x + t, y + t, x + w - t, y + t + 1, colour)
            c.rect(x + t, y + h - t - 1, x + w - t, y + h - t, colour)
            c.rect(x + t, y + t, x + t + 1, y + h - t, colour)
            c.rect(x + w - t - 1, y + t, x + w - t, y + h - t, colour)
        text(c, x + 16, y + 20, label, colour, 2)
        text(c, x + 16, y + 46, sub, MUTED, 2)

    box(60, 130, 300, 150, "SUPPLY UNDER TEST", "SET 12 V, LIMIT 500 MA", AMBER)
    box(560, 130, 300, 150, "DUMMY LOAD", "10 OHM 20 W WIREWOUND", VIOLET)
    box(60, 380, 300, 150, "METER", "ACROSS OUTPUT TERMINALS", TEAL)
    box(560, 380, 300, 150, "SCOPE", "AC COUPLED, SHORT GROUND", TEAL)

    def wire(x0, y0, x1, y1, colour):
        c.line(x0, y0, x1, y0, colour, 3)
        c.line(x1, y0, x1, y1, colour, 3)

    wire(360, 180, 560, 180, AMBER)
    wire(360, 230, 460, 230, TEAL)
    c.line(460, 230, 460, 430, TEAL, 3)
    c.line(460, 430, 560, 430, TEAL, 3)
    c.line(210, 280, 210, 380, TEAL, 3)

    text(c, 380, 150, "LOAD", MUTED, 2)
    text(c, 250, 320, "MEASURE", MUTED, 2)

    text(c, 60, 566, "SHORT PROBE GROUNDS. A LONG GROUND LEAD MEASURES", MUTED, 2)
    text(c, 60, 590, "ITS OWN LOOP AREA, NOT YOUR OUTPUT RIPPLE", MUTED, 2)
    return c.write_png(path)


# ── 5. SVG: the block diagram and the schematic ────────────────────────────

BLOCK_DIAGRAM = """<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1000 420" role="img"
     aria-label="Four stages in series: transformer, rectifier, smoothing capacitor, regulator">
  <style>
    .bg    { fill: #121A22; }
    .box   { fill: #0E141A; stroke-width: 3; }
    .lbl   { fill: #D4DEE8; font: 600 19px system-ui, sans-serif; }
    .sub   { fill: #7A8A9A; font: 400 14px system-ui, sans-serif; }
    .wire  { stroke: #7A8A9A; stroke-width: 3; fill: none; }
    .trace { fill: none; stroke-width: 2.5; }
    .cap   { fill: #7A8A9A; font: 400 13px system-ui, sans-serif; }
  </style>
  <rect class="bg" width="1000" height="420" rx="8"/>

  <g class="wire">
    <path d="M20 110 H60"/><path d="M260 110 H300"/>
    <path d="M500 110 H540"/><path d="M740 110 H780"/><path d="M980 110 H960"/>
  </g>

  <rect class="box" x="60"  y="60" width="200" height="100" rx="6" stroke="#D4A017"/>
  <rect class="box" x="300" y="60" width="200" height="100" rx="6" stroke="#1FB8A6"/>
  <rect class="box" x="540" y="60" width="200" height="100" rx="6" stroke="#7A6ED4"/>
  <rect class="box" x="780" y="60" width="180" height="100" rx="6" stroke="#C24B3F"/>

  <text class="lbl" x="88"  y="105">TRANSFORMER</text>
  <text class="sub" x="88"  y="130">steps the voltage down</text>
  <text class="lbl" x="342" y="105">RECTIFIER</text>
  <text class="sub" x="342" y="130">one direction only</text>
  <text class="lbl" x="576" y="105">SMOOTHING</text>
  <text class="sub" x="576" y="130">bridges the gaps</text>
  <text class="lbl" x="812" y="105">REGULATOR</text>
  <text class="sub" x="812" y="130">holds it steady</text>

  <g class="trace">
    <path stroke="#D4A017" d="M70 300 q 22 -60 45 0 t 45 0 t 45 0 t 45 0"/>
    <path stroke="#1FB8A6" d="M310 300 q 22 -60 45 0 q 22 -60 45 0 q 22 -60 45 0 q 22 -60 45 0"/>
    <path stroke="#7A6ED4" d="M550 268 q 30 6 55 14 q 12 -20 30 -26 q 30 6 55 14 q 12 -20 30 -26"/>
    <path stroke="#C24B3F" d="M790 270 H950"/>
  </g>

  <text class="cap" x="70"  y="340">high AC</text>
  <text class="cap" x="310" y="340">low, pulsing, one-sided</text>
  <text class="cap" x="550" y="340">nearly DC, with ripple</text>
  <text class="cap" x="790" y="340">flat DC</text>

  <text class="sub" x="70" y="392">Each stage fixes exactly one problem, and each one costs something.</text>
</svg>
"""

REGULATOR_SCHEMATIC = """<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1000 520" role="img"
     aria-label="A series-pass regulator: pass transistor, error amplifier, voltage reference and feedback divider">
  <style>
    .bg   { fill: #121A22; }
    .w    { stroke: #7A8A9A; stroke-width: 3; fill: none; }
    .fb   { stroke: #1FB8A6; stroke-width: 3; fill: none; stroke-dasharray: 9 6; }
    .part { fill: none; stroke: #D4DEE8; stroke-width: 3; }
    .lbl  { fill: #D4DEE8; font: 600 17px system-ui, sans-serif; }
    .sub  { fill: #7A8A9A; font: 400 14px system-ui, sans-serif; }
    .hot  { fill: #C24B3F; font: 600 15px system-ui, sans-serif; }
  </style>
  <rect class="bg" width="1000" height="520" rx="8"/>

  <path class="w" d="M50 120 H330"/>
  <text class="lbl" x="50" y="104">V-IN  (raw, rippling)</text>

  <rect class="part" x="330" y="80" width="120" height="80" rx="6"/>
  <text class="lbl" x="346" y="115">PASS</text>
  <text class="lbl" x="346" y="140">DEVICE</text>

  <path class="w" d="M450 120 H900"/>
  <circle cx="900" cy="120" r="7" fill="#D4DEE8"/>
  <text class="lbl" x="820" y="100">V-OUT</text>

  <path class="w" d="M760 120 V210"/>
  <rect class="part" x="738" y="210" width="44" height="80" rx="4"/>
  <path class="w" d="M760 290 V330"/>
  <rect class="part" x="738" y="330" width="44" height="80" rx="4"/>
  <path class="w" d="M760 410 V460 M700 460 H860"/>
  <text class="sub" x="800" y="262">R1</text>
  <text class="sub" x="800" y="382">R2</text>
  <text class="sub" x="800" y="452">0 V</text>

  <path class="fb" d="M760 310 H540"/>
  <path class="part" d="M420 250 L540 290 L420 330 Z"/>
  <text class="lbl" x="440" y="298">ERR</text>
  <path class="w" d="M420 290 H360 M390 120 V290"/>

  <rect class="part" x="230" y="262" width="130" height="60" rx="6"/>
  <text class="lbl" x="246" y="299">V-REF</text>
  <path class="w" d="M360 292 H420"/>

  <text class="hot" x="330" y="196">P = (V-IN - V-OUT) x I-LOAD, and it all becomes heat</text>
  <text class="sub" x="50" y="490">The loop drives the pass device until the divider matches the reference. It never sends the excess back.</text>
</svg>
"""


# ── 6. The heatsink bracket, as an ASCII STL ───────────────────────────────

def heatsink_stl(path):
    """
    A finned bracket with two mounting ears and a transistor pad.

    Written as STL rather than STEP on purpose: it exercises the compiler's
    mesh-conversion path (three.js loaders) rather than the OpenCascade one,
    and it is what a teacher who owns a 3D printer would actually hand over.
    """
    tris = []

    def quad(a, b, c, d):
        tris.append((a, b, c))
        tris.append((a, c, d))

    def box(x0, y0, z0, x1, y1, z1):
        p = [(x0, y0, z0), (x1, y0, z0), (x1, y1, z0), (x0, y1, z0),
             (x0, y0, z1), (x1, y0, z1), (x1, y1, z1), (x0, y1, z1)]
        quad(p[0], p[3], p[2], p[1])   # bottom
        quad(p[4], p[5], p[6], p[7])   # top
        quad(p[0], p[1], p[5], p[4])   # front
        quad(p[2], p[3], p[7], p[6])   # back
        quad(p[1], p[2], p[6], p[5])   # right
        quad(p[3], p[0], p[4], p[7])   # left

    # Base plate the transistor bolts to.
    box(0, 0, 0, 90, 60, 6)

    # Fin stack, vertical so convection works (the subsection makes the point).
    for i in range(9):
        x = 4 + i * 9.5
        box(x, 6, 6, x + 4, 58, 44)

    # Two mounting ears.
    box(-14, 14, 0, 0, 34, 6)
    box(90, 14, 0, 104, 34, 6)

    # The raised pad the transistor tab sits flat against.
    box(30, -8, 0, 60, 0, 10)

    out = ["solid heatsink-bracket"]
    for a, b, c in tris:
        ux, uy, uz = (b[0] - a[0], b[1] - a[1], b[2] - a[2])
        vx, vy, vz = (c[0] - a[0], c[1] - a[1], c[2] - a[2])
        nx, ny, nz = (uy * vz - uz * vy, uz * vx - ux * vz, ux * vy - uy * vx)
        length = math.sqrt(nx * nx + ny * ny + nz * nz) or 1.0
        out.append(f"facet normal {nx/length:.6f} {ny/length:.6f} {nz/length:.6f}")
        out.append("  outer loop")
        for v in (a, b, c):
            out.append(f"    vertex {v[0]:.4f} {v[1]:.4f} {v[2]:.4f}")
        out.append("  endloop")
        out.append("endfacet")
    out.append("endsolid heatsink-bracket")

    os.makedirs(os.path.dirname(path), exist_ok=True)
    with open(path, "w", encoding="utf-8", newline="\n") as f:
        f.write("\n".join(out) + "\n")
    return os.path.getsize(path), len(tris)


# ── 7. A small PDF, written by hand ────────────────────────────────────────

def datasheet_pdf(path):
    """
    Two pages of invented datasheet. Uncompressed and hand-assembled so there
    is no dependency on a PDF library for a test asset.
    """
    def esc(s):
        return s.replace("\\", r"\\").replace("(", r"\(").replace(")", r"\)")

    def page_stream(title, rows, footer):
        parts = ["BT /F1 20 Tf 1 1 1 rg 56 760 Td (" + esc(title) + ") Tj ET"]
        parts.append("0.16 0.72 0.65 rg 56 748 m 540 748 l 2 w S")
        y = 716
        for label, value in rows:
            parts.append(f"BT /F1 11 Tf 0.75 0.80 0.86 rg 56 {y} Td ({esc(label)}) Tj ET")
            parts.append(f"BT /F2 11 Tf 1 1 1 rg 320 {y} Td ({esc(value)}) Tj ET")
            parts.append(f"0.20 0.24 0.28 rg 56 {y - 8} m 540 {y - 8} l 0.5 w S")
            y -= 30
        parts.append(f"BT /F1 9 Tf 0.48 0.54 0.60 rg 56 {y - 20} Td ({esc(footer)}) Tj ET")
        return "\n".join(parts)

    p1 = page_stream(
        "BR-6208  BRIDGE RECTIFIER  (INVENTED PART)",
        [("Maximum repetitive reverse voltage", "600 V"),
         ("Average forward rectified current", "8.0 A"),
         ("Forward voltage per diode at 4 A", "1.05 V typical"),
         ("Peak forward surge, one cycle", "200 A"),
         ("Operating junction temperature", "-55 to +150 C"),
         ("Thermal resistance, junction to case", "1.9 C/W"),
         ("Package", "KBPC, chassis mount")],
        "Fictional device. Values are internally consistent and describe no real part.")

    p2 = page_stream(
        "BR-6208  SELECTION NOTES",
        [("Derate average current above", "60 C case"),
         ("Recommended heatsink above 4 A", "Yes - chassis mount"),
         ("Peak charging current, 10000 uF", "Approx 5x average"),
         ("Reverse leakage at rated V, 25 C", "5 uA typical"),
         ("Reverse leakage at rated V, 125 C", "500 uA typical"),
         ("Minimum PIV for 24 V RMS input", "68 V - choose 200 V or better"),
         ("Bridge drop in the supply budget", "Allow 1.4 V")],
        "Choose PIV against the peak, never the RMS. The margin is the point.")

    objs = {}
    objs[1] = "<< /Type /Catalog /Pages 2 0 R >>"
    objs[2] = "<< /Type /Pages /Kids [3 0 R 6 0 R] /Count 2 >>"
    objs[3] = ("<< /Type /Page /Parent 2 0 R /MediaBox [0 0 595 792] "
               "/Resources << /Font << /F1 5 0 R /F2 8 0 R >> >> /Contents 4 0 R >>")
    objs[4] = None  # stream, filled below
    objs[5] = "<< /Type /Font /Subtype /Type1 /BaseFont /Helvetica >>"
    objs[6] = ("<< /Type /Page /Parent 2 0 R /MediaBox [0 0 595 792] "
               "/Resources << /Font << /F1 5 0 R /F2 8 0 R >> >> /Contents 7 0 R >>")
    objs[7] = None
    objs[8] = "<< /Type /Font /Subtype /Type1 /BaseFont /Helvetica-Bold >>"

    def stream_obj(body):
        data = "0.07 0.10 0.13 rg 0 0 595 792 re f\n" + body
        return f"<< /Length {len(data)} >>\nstream\n{data}\nendstream"

    objs[4] = stream_obj(p1)
    objs[7] = stream_obj(p2)

    out = bytearray(b"%PDF-1.4\n%\xe2\xe3\xcf\xd3\n")
    offsets = {}
    for num in sorted(objs):
        offsets[num] = len(out)
        out += f"{num} 0 obj\n{objs[num]}\nendobj\n".encode("latin-1")

    xref = len(out)
    out += f"xref\n0 {len(objs) + 1}\n".encode("latin-1")
    out += b"0000000000 65535 f \n"
    for num in sorted(objs):
        out += f"{offsets[num]:010d} 00000 n \n".encode("latin-1")
    out += (f"trailer\n<< /Size {len(objs) + 1} /Root 1 0 R >>\n"
            f"startxref\n{xref}\n%%EOF\n").encode("latin-1")

    os.makedirs(os.path.dirname(path), exist_ok=True)
    with open(path, "wb") as f:
        f.write(bytes(out))
    return len(out)


# ── 8. Tutor photo ─────────────────────────────────────────────────────────

def tutor_photo(path):
    """
    A generated placeholder portrait.

    Deliberately not a real person's photograph: the fixture must be wholly
    synthetic, and a stock face would be somebody's likeness in a test corpus.
    A JPEG extension with PNG bytes would be a lie, so this is written as PNG
    and course.yaml points at it.
    """
    c = Canvas(320, 320, SURFACE)
    for y in range(320):
        for x in range(320):
            t = (x + y) / 640
            c.set(x, y, (int(18 + t * 14), int(26 + t * 22), int(34 + t * 30)))

    cx, cy = 160, 132
    for y in range(320):
        for x in range(320):
            if math.hypot(x - cx, y - cy) < 58:
                c.blend(x, y, TEAL, 0.30)
    for y in range(190, 320):
        w = 96 + (y - 190) * 0.5
        for x in range(int(160 - w), int(160 + w)):
            if 0 <= x < 320:
                c.blend(x, y, TEAL, 0.22)

    text(c, 122, 250, "AF", TEXT, 5)
    return c.write_png(path)


# ── 9. Everything, in one pass ─────────────────────────────────────────────

def write_text(path, body):
    os.makedirs(os.path.dirname(path), exist_ok=True)
    with open(path, "w", encoding="utf-8", newline="\n") as f:
        f.write(body)
    return os.path.getsize(path)


def main():
    def p(*parts):
        return os.path.normpath(os.path.join(SRC, *parts))

    C1 = ("content", "01-raw-dc")
    C2 = ("content", "02-regulation")
    C3 = ("content", "03-build")

    jobs = [
        ("block-diagram.svg",
         lambda: write_text(p(*C1, "010-transformer", "assets", "block-diagram.svg"), BLOCK_DIAGRAM)),
        ("rectifier-waveforms.png",
         lambda: rectifier_waveforms(p(*C1, "020-rectifier", "assets", "rectifier-waveforms.png"))),
        ("diode-datasheet.pdf",
         lambda: datasheet_pdf(p(*C1, "020-rectifier", "assets", "diode-datasheet.pdf"))),
        ("ripple-vs-load.png",
         lambda: ripple_vs_load(p(*C1, "030-smoothing", "assets", "ripple-vs-load.png"))),
        ("regulator-schematic.svg",
         lambda: write_text(p(*C2, "010-linear-regulator", "assets", "regulator-schematic.svg"),
                            REGULATOR_SCHEMATIC)),
        ("limit-curves.png",
         lambda: limit_curves(p(*C2, "020-current-limit", "assets", "limit-curves.png"))),
        ("heatsink-bracket.stl",
         lambda: heatsink_stl(p(*C3, "010-enclosure", "assets", "heatsink-bracket.stl"))),
        ("test-setup.png",
         lambda: test_setup(p(*C3, "020-bench-test", "assets", "test-setup.png"))),
        ("tutor/photo.png",
         lambda: tutor_photo(p("tutor", "photo.png"))),
    ]

    print(f"{'asset':<34} {'result'}")
    print("-" * 60)
    for name, fn in jobs:
        result = fn()
        if isinstance(result, tuple):
            print(f"{name:<34} {result[0]:>9,} bytes  {result[1]:>6,} triangles")
        else:
            print(f"{name:<34} {result:>9,} bytes")


if __name__ == "__main__":
    main()
