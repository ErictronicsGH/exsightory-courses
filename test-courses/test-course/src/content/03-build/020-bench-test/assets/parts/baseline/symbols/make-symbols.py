# Generates the shipped symbols. **An authoring aid, not part of any build.**
#
# Nothing runs this: the SVGs beside it are the artefact, and Circuit Studio's
# symbol editor (stage 15) supersedes it. It is checked in because it is where
# the grid, the stroke scale and the proportions are actually expressed, and a
# rule that lives only in prose drifts from the files it describes.
#
# Run from the repository's `Application/insight` directory:
#     python libraries/baseline/symbols/make-symbols.py
#
# See README.md beside it for the rules in words.

# The baseline library's symbols, in both schematic standards.
#
# A generator rather than thirty-odd hand-typed files, so the grid, the stroke
# weights, the lead lengths and the layer order cannot drift apart between parts
# — which is the thing that makes a schematic look assembled from three sources.
#
# ## The grid, and what a unit is
#
#   **One unit is 0.1 mm.** The owner's direction, 2026-09-01, and it settles a
#   question the first version left open by using arbitrary units: a lead is
#   **2.54 mm** — 0.1 inch, the pitch every through-hole part, every breadboard
#   and every piece of stripboard in the world is built on — which is 25.4 units.
#
#   That is not decoration. A schematic whose leads are the pitch of the board
#   is a schematic a student can lay a part on, and the first version's 38-unit
#   leads made every component look like it was on the end of a wire.
#
#   The origin is the part's own centre. A two-terminal part is 104 × 52 with
#   its anchors at (∓47.4, 0); a three-terminal part declares its own box,
#   because a MOSFET is as tall as it is wide and padding every symbol to the
#   largest would make a row of resistors look sparse.
#
# ## Proportions are the standard's, not a guess
#
#   IEC 60617 draws a resistor as a plain rectangle of roughly **3:1**, with the
#   leads meeting its short edges. The first version was 40 × 22 — nearly 2:1,
#   which reads as a box rather than as a resistor — and it was drawn with
#   `fill="none"` over a flow stroke that ran the full width, so the current
#   showed straight through the body and the part came out looking like a fuse.
#   Both are fixed here: 44 × 15, and **every body is opaque**.
#
#   A schematic symbol's body is filled with the sheet colour precisely so that
#   nothing passes through it. A wire crossing a part is a different claim from a
#   wire joining it, and a symbol that cannot make that distinction is not a
#   symbol.
#
# ## The two standards
#
#   `iec`  — IEC 60617, the plain rectangle. The default: it survives a
#            projector and a compressed stream, where a six-peak zigzag becomes
#            a smudge.
#   `ansi` — the American form (IEEE Std 315), the zigzag. Offered because a
#            student reading a US datasheet or almost any online schematic meets
#            it, and a tool that pretends one of the two does not exist teaches a
#            parochialism they then have to unlearn.
#
# Only the parts whose drawing actually differs get two versions. A capacitor, a
# diode and a MOSFET are the same shape in both, and shipping a duplicate file
# to say "identical" is a second copy of one drawing that can drift.

import io, json, os

ROOT = 'libraries/baseline'

# ── The stroke scale ───────────────────────────────────────────────────────
#
# Three weights, in a ratio rather than picked one at a time, because a diagram
# whose lines are all slightly different weights reads as untidy without anybody
# being able to say why. Each step is 1.5×:
#
#   1.6  a marking *inside* a symbol — a meter's needle, a display window, the
#        non-linear stroke across a thermistor. Subordinate to the outline it
#        sits in.
#   2.4  the symbol's own outline. The heaviest thing on the sheet, because the
#        components are the subject and the wires are what connects them.
#   1.8  a wire (set in the stylesheet, not here). Lighter than a symbol, so a
#        schematic reads as parts joined by wires rather than as a mesh.
# Written as CSS variables with the number as the fallback, so a *state* can
# weight them without a second copy of every symbol: a part past an absolute
# maximum is drawn heavier as well as redder, which is the channel that survives
# greyscale. The fallback is what an author sees opening the file in a browser.
W = 'var(--bench-stroke, 2.4)'      # the body outline
T = 'var(--bench-stroke-mark, 1.6)'  # a marking within a body

# ── Three colours, for three different kinds of thing ──────────────────────
#
# A schematic drawn in one colour is a drawing of a circuit; drawn in three it
# is a diagram of one. The symbol is the subject and is brightest; the wire
# recedes, because a net is a relationship rather than a thing; and a terminal
# is a *connection point*, which is neither — it is where the two meet, and
# giving it its own colour is what makes a junction dot mean something at a
# glance.
INK = f'stroke="var(--bench-symbol)" fill="none" stroke-width="{W}" stroke-linecap="round" stroke-linejoin="round"'
# An opaque body: filled with the sheet, so nothing shows through it.
BODY = f'stroke="var(--bench-symbol)" fill="var(--bench-sheet)" stroke-width="{W}" stroke-linejoin="round"'
MARK = f'stroke="var(--bench-symbol)" fill="none" stroke-width="{T}" stroke-linecap="round" stroke-linejoin="round"'
SOLID = f'stroke="var(--bench-symbol)" fill="var(--bench-symbol)" stroke-width="{W}" stroke-linejoin="round"'
FILL = 'fill="var(--bench-symbol)" stroke="none"'
HEAT = 'fill="var(--bench-heat)" stroke="none"'
FLOW = 'stroke="var(--bench-flow)" fill="none" stroke-width="7" stroke-linecap="round" stroke-linejoin="round"'

# A lead is 2.54 mm — 0.1 inch, the pitch everything through-hole is built on.
LEAD = 25.4
# Two-terminal parts: the body sits in the middle and a lead reaches each side.
FLAT = (-52, -26, 104, 52)
# Three-terminal parts declare their own, because a MOSFET is as tall as it is
# wide and padding every symbol to the largest would make a row of resistors
# look sparse.
TALL = (-52, -52, 104, 104)


def hit(box):
    x, y, w, h = box
    return ('  <g data-layer="hitbox">\n'
            f'    <rect x="{x}" y="{y}" width="{w}" height="{h}" fill="currentColor" opacity="0"/>\n'
            '  </g>')


def write(where, name, note, thermal, body, flow, terminals, box=FLAT):
    x, y, w, h = box
    out = [f'<!-- {note} -->', f'<svg xmlns="http://www.w3.org/2000/svg" viewBox="{x} {y} {w} {h}">']
    out.append('  <g data-layer="thermal">')
    out.extend('    ' + one for one in thermal)
    out.append('  </g>')
    out.append('  <g data-layer="flow">')
    out.extend('    ' + one for one in flow)
    out.append('  </g>')
    out.append('  <g data-layer="body">')
    out.extend('    ' + one for one in body)
    for tid, (x, y) in terminals.items():
        out.append(f'    <circle data-terminal="{tid}" cx="{x}" cy="{y}" r="2.6" fill="var(--bench-terminal)"/>')
    out.append('  </g>')
    out.append(hit(box))
    out.append('</svg>')
    folder = os.path.join(ROOT, 'symbols', where)
    os.makedirs(folder, exist_ok=True)
    io.open(os.path.join(folder, name), 'w', encoding='utf-8', newline='\n').write('\n'.join(out) + '\n')


def ends(half):
    """Where the two terminals of a part whose body is `2 × half` wide land."""
    return round(half + LEAD, 1)


AB = lambda half: {'a': (-ends(half), 0), 'b': (ends(half), 0)}
AK = lambda half: {'a': (-ends(half), 0), 'k': (ends(half), 0)}
HL = lambda half: {'hi': (-ends(half), 0), 'lo': (ends(half), 0)}
PN = lambda half: {'p': (-ends(half), 0), 'n': (ends(half), 0)}


def leads(half):
    """A 2.54 mm lead each side, meeting the body's edge and never crossing it."""
    e = ends(half)
    return [f'<line x1="-{e}" y1="0" x2="-{half}" y2="0" {INK}/>',
            f'<line x1="{e}" y1="0" x2="{half}" y2="0" {INK}/>']


def flow_around(half):
    """Current shown entering and leaving. It does not cross an opaque body."""
    e = ends(half)
    return [f'<line x1="-{e}" y1="0" x2="-{half}" y2="0" {FLOW}/>',
            f'<line x1="{e}" y1="0" x2="{half}" y2="0" {FLOW}/>']


def zigzag(half=22, amp=12, peaks=6):
    """ANSI's zigzag: three full triangles, apex to apex, ends on the axis."""
    step = (half * 2) / peaks
    pts = [(-half, 0)]
    for i in range(peaks):
        x = round(-half + step * (i + 0.5), 1)
        pts.append((x, amp if i % 2 == 0 else -amp))
    pts.append((half, 0))
    return ' '.join(f'{x},{y}' for x, y in pts)


# ── Resistor. IEC 60617: a plain rectangle, about 3:1. ─────────────────────
RES_THERMAL = [f'<rect x="-22" y="-8" width="44" height="16" rx="1" {HEAT}/>']

write('iec', 'resistor.svg', 'Resistor — IEC 60617 rectangle, 3:1, leads meeting its short edges.',
      RES_THERMAL,
      [f'<rect x="-22" y="-7.5" width="44" height="15" {BODY}/>'] + leads(22),
      flow_around(22), AB(22))

write('ansi', 'resistor.svg', 'Resistor — ANSI / IEEE Std 315 zigzag, three full triangles.',
      RES_THERMAL,
      [f'<polyline points="{zigzag()}" {INK}/>'] + leads(22),
      flow_around(22), AB(22))

# ── Thermistor: the same body with IEC's non-linear stroke across it. ──────
NONLINEAR = f'<polyline points="-31,15 -24,15 24,-16" {MARK}/>'
write('iec', 'thermistor.svg', 'Thermistor — IEC rectangle with the non-linear stroke across it.',
      RES_THERMAL,
      [f'<rect x="-22" y="-7.5" width="44" height="15" {BODY}/>', NONLINEAR] + leads(22),
      flow_around(22), AB(22))
write('ansi', 'thermistor.svg', 'Thermistor — ANSI zigzag with the non-linear stroke across it.',
      RES_THERMAL,
      [f'<polyline points="{zigzag()}" {INK}/>', NONLINEAR] + leads(22),
      flow_around(22), AB(22))

# ── Capacitors. Plates a fifth of their length apart, which is the standard. ─
write('iec', 'capacitor.svg', 'Capacitor — two parallel plates, unpolarised.',
      [f'<rect x="-10" y="-19" width="20" height="38" {HEAT}/>'],
      [f'<line x1="-5" y1="-18" x2="-5" y2="18" {INK}/>',
       f'<line x1="5" y1="-18" x2="5" y2="18" {INK}/>'] + leads(5),
      flow_around(5), AB(5))

write('iec', 'capacitor-polarised.svg', 'Polarised capacitor — one straight plate, one curved, and a plus mark.',
      [f'<rect x="-10" y="-19" width="22" height="38" {HEAT}/>'],
      [f'<line x1="-5" y1="-18" x2="-5" y2="18" {INK}/>',
       f'<path d="M 7 -18 A 24 24 0 0 1 7 18" {INK}/>',
       f'<line x1="-30.4" y1="0" x2="-5" y2="0" {INK}/>',
       f'<line x1="9" y1="0" x2="34.4" y2="0" {INK}/>',
       f'<line x1="-30" y1="-25" x2="-18" y2="-25" {MARK}/>',
       f'<line x1="-24" y1="-31" x2="-24" y2="-19" {MARK}/>'],
      [f'<line x1="-30.4" y1="0" x2="-5" y2="0" {FLOW}/>',
       f'<line x1="9" y1="0" x2="34.4" y2="0" {FLOW}/>'], {'a': (-30.4, 0), 'b': (34.4, 0)})

# ── Diodes. The triangle's height equals the cathode bar's, as drawn. ──────
DIODE_THERMAL = [f'<rect x="-16" y="-16" width="32" height="32" rx="1" {HEAT}/>']


def diode(name, note, extra):
    write('iec', name, note,
          DIODE_THERMAL,
          [f'<polygon points="-13,-14 14,0 -13,14" {SOLID}/>',
           f'<line x1="14" y1="-14" x2="14" y2="14" {INK}/>'] + leads(13) + extra,
          flow_around(13), AK(13))


diode('diode.svg', 'Signal diode — triangle to the anode, bar to the cathode.', [])
diode('diode-schottky.svg', 'Schottky diode — the cathode bar with its S hooks.',
      [f'<polyline points="21,-8 21,-14 14,-14" {MARK}/>',
       f'<polyline points="7,14 14,14 14,8" {MARK}/>'])
diode('diode-zener.svg', 'Zener diode — the cathode bar with its Z tails.',
      [f'<line x1="14" y1="-14" x2="7" y2="-21" {MARK}/>',
       f'<line x1="14" y1="14" x2="21" y2="21" {MARK}/>'])
diode('led.svg', 'LED — a diode with the two emission arrows, at 45°, pointing away.',
      [f'<line x1="-1" y1="-19" x2="10" y2="-30" {MARK}/>',
       f'<polygon points="12,-32 3,-29 9,-23" {FILL}/>',
       f'<line x1="9" y1="-13" x2="20" y2="-24" {MARK}/>',
       f'<polygon points="22,-26 13,-23 19,-17" {FILL}/>'])

# ── MOSFETs. Drain up, source down, gate left. ─────────────────────────────
def mosfet(name, note, arrow):
    write('iec', name, note,
          [f'<rect x="-8" y="-24" width="32" height="48" rx="1" {HEAT}/>'],
          [f'<line x1="-60" y1="0" x2="-18" y2="0" {INK}/>',
           f'<line x1="-18" y1="-20" x2="-18" y2="20" {INK}/>',
           f'<line x1="-8" y1="-20" x2="-8" y2="-10" {INK}/>',
           f'<line x1="-8" y1="-5" x2="-8" y2="5" {INK}/>',
           f'<line x1="-8" y1="10" x2="-8" y2="20" {INK}/>',
           f'<polyline points="-8,-15 16,-15 16,-45.4" {INK}/>',
           f'<polyline points="-8,15 16,15 16,45.4" {INK}/>',
           f'<line x1="-8" y1="0" x2="16" y2="0" {INK}/>'] + arrow,
          [f'<polyline points="16,-45.4 16,-15" {FLOW}/>',
           f'<polyline points="16,15 16,45.4" {FLOW}/>'],
          {'d': (16, -45.4), 's': (16, 45.4), 'g': (-43.4, 0)}, TALL)


mosfet('mosfet-n.svg', 'N-channel MOSFET — the bulk arrow points in at the channel.',
       [f'<polygon points="5,0 -4,-5 -4,5" {FILL}/>'])
mosfet('mosfet-p.svg', 'P-channel MOSFET — the bulk arrow points out of the channel.',
       [f'<polygon points="-4,0 5,-5 5,5" {FILL}/>'])

# ── Instruments. A handheld is a circle; a bench instrument is a box. ──────
write('iec', 'dmm.svg', 'Handheld multimeter — the round meter face, opaque.',
      [f'<circle cx="0" cy="0" r="22" {HEAT}/>'],
      [f'<circle cx="0" cy="0" r="20" {BODY}/>',
       f'<line x1="-10" y1="9" x2="10" y2="-8" {MARK}/>'] + leads(20),
      flow_around(20), HL(20))

write('iec', 'dmm-bench.svg', 'Bench multimeter — the box with a display, beside the handheld.',
      [f'<rect x="-29" y="-23" width="58" height="46" rx="2" {HEAT}/>'],
      [f'<rect x="-28" y="-22" width="56" height="44" rx="2" {BODY}/>',
       f'<rect x="-20" y="-14" width="40" height="15" rx="1" {MARK}/>',
       f'<line x1="-14" y1="13" x2="14" y2="13" {MARK}/>'] + leads(28),
      flow_around(28), HL(28))

write('iec', 'supply.svg', 'Bench supply — a source with its polarity marked in strokes.',
      [f'<circle cx="0" cy="0" r="22" {HEAT}/>'],
      [f'<circle cx="0" cy="0" r="20" {BODY}/>',
       f'<line x1="-16" y1="0" x2="-6" y2="0" {MARK}/>',
       f'<line x1="-11" y1="-5" x2="-11" y2="5" {MARK}/>',
       f'<line x1="6" y1="0" x2="16" y2="0" {MARK}/>'] + leads(20),
      flow_around(20), PN(20))

# ── Conductors: a family, because the comparison is the lesson. ────────────
write('iec', 'wire.svg', 'Wire — a plain conductor, drawn as one.',
      [f'<rect x="-34" y="-6" width="68" height="12" rx="6" {HEAT}/>'],
      [f'<line x1="-52" y1="0" x2="52" y2="0" {INK}/>'],
      [f'<line x1="-52" y1="0" x2="52" y2="0" {FLOW}/>'], {'a': (-52, 0), 'b': (52, 0)})

write('iec', 'trace.svg', 'PCB trace — a conductor with a width, which is why it has a rating.',
      [f'<rect x="-34" y="-8" width="68" height="16" {HEAT}/>'],
      [f'<rect x="-52" y="-6" width="104" height="12" stroke="var(--bench-symbol)" fill="none" stroke-width="{T}"/>'],
      [f'<line x1="-52" y1="0" x2="52" y2="0" {FLOW}/>'], {'a': (-52, 0), 'b': (52, 0)})

write('iec', 'contact.svg', 'Breadboard contact — two spring jaws that touch, and a resistance.',
      [f'<rect x="-16" y="-12" width="32" height="24" rx="2" {HEAT}/>'],
      [f'<line x1="-39.4" y1="0" x2="-14" y2="0" {INK}/>',
       f'<line x1="14" y1="0" x2="39.4" y2="0" {INK}/>',
       f'<path d="M -14 -11 A 14 14 0 0 1 -14 11" {MARK}/>',
       f'<path d="M 14 -11 A 14 14 0 0 0 14 11" {MARK}/>'],
      flow_around(14), AB(14))

# ── The manifest and the classes ──────────────────────────────────────────
iec = sorted(os.listdir(os.path.join(ROOT, 'symbols', 'iec')))
ansi = sorted(os.listdir(os.path.join(ROOT, 'symbols', 'ansi')))

p = os.path.join(ROOT, 'library.json')
m = json.load(io.open(p, encoding='utf-8'))
m['symbols'] = [f'symbols/iec/{f}' for f in iec] + [f'symbols/ansi/{f}' for f in ansi]
io.open(p, 'w', encoding='utf-8', newline='\n').write(json.dumps(m, indent=2, ensure_ascii=False) + '\n')

for f in sorted(os.listdir(os.path.join(ROOT, 'classes'))):
    path = os.path.join(ROOT, 'classes', f)
    d = json.load(io.open(path, encoding='utf-8'))
    for name, variant in d['variants'].items():
        stem = variant['symbol'].split('/')[-1]
        variant['symbol'] = f'symbols/iec/{stem}'
        if stem in ansi:
            variant['alternates'] = {'ansi': f'symbols/ansi/{stem}'}
        else:
            variant.pop('alternates', None)
    io.open(path, 'w', encoding='utf-8', newline='\n').write(json.dumps(d, indent=2, ensure_ascii=False) + '\n')

print('iec :', ', '.join(iec))
print('ansi:', ', '.join(ansi))
