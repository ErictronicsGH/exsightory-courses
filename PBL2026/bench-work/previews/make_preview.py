"""Previews of the drawings and plots specified in U010–U015, drawn from the specs' own numbers.

Not the benches' renderings: a look at layout and values before the libraries are made.
Run: python make_preview.py  ->  writes one SVG per panel and one HTML page per unit beside this file.
"""
import math
import os

HERE = os.path.dirname(os.path.abspath(__file__))

# ExSight's dark annotation hues (bench-design-rules 2.21) on a wall-like ground
INK = '#E8EAED'
MUTED = '#9AA3AD'
FAINT = '#3A424C'
BG = '#0E1217'
PANEL = '#151B22'
TEAL, AMBER, VIOLET, LIME, ROSE, AZURE = '#2DD4BF', '#F5B942', '#A78BFA', '#A3E635', '#F472B6', '#60A5FA'
FONT = "font-family='Segoe UI, system-ui, sans-serif'"


def esc(s):
    return s.replace('&', '&amp;').replace('<', '&lt;').replace('>', '&gt;')


def text(x, y, s, size=26, fill=INK, anchor='middle', weight=400, extra=''):
    return (f"<text x='{x:.1f}' y='{y:.1f}' {FONT} font-size='{size}' fill='{fill}' "
            f"text-anchor='{anchor}' font-weight='{weight}' {extra}>{esc(s)}</text>")


def multiline(x, y, lines, size=26, fill=INK, anchor='middle', weight=400, lh=1.15):
    top = y - (len(lines) - 1) * size * lh / 2
    return ''.join(text(x, top + i * size * lh + size * 0.35, ln, size, fill, anchor, weight)
                   for i, ln in enumerate(lines))


def arrowhead(x, y, col, size=11):
    """A filled arrowhead pointing right with its tip at (x, y): drawn, not a marker, so every renderer shows it."""
    return f"<path d='M{x:.1f},{y:.1f} L{x - size:.1f},{y - size * 0.55:.1f} L{x - size:.1f},{y + size * 0.55:.1f} z' fill='{col}'/>"


def harrow(x1, x2, y, col, width):
    return (f"<line x1='{x1:.1f}' y1='{y}' x2='{x2 - 9:.1f}' y2='{y}' stroke='{col}' stroke-width='{width}'/>"
            + arrowhead(x2, y, col))


def svg(w, h, body, title):
    return (f"<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 {w} {h}' role='img' "
            f"aria-label='{esc(title)}'><title>{esc(title)}</title>"
            f"<rect width='{w}' height='{h}' fill='{BG}'/>{body}</svg>")


# ---------- the course path library (D1-010-05 §3a, as revised by this render) ----------
NODE_W, NODE_H, X0, PITCH = 170, 110, 40, 225
FORMS = [['Temperature'], ['Resistance'], ['Voltage'], ['ADC', 'code'], ['Binary', 'data'],
         ['Software', 'variable'], ['27.4 °C']]
STAGE_NAMES = ['QUANTITY', 'SENSOR', 'CONDITIONING', 'ADC', 'FIRMWARE', 'NUMBER']
STAGE_W, STAGE_PITCH, STAGE_X0 = 230, 260, 35
# what each stage acts on in the forms lane: a node (the two end stages) or the arrows it turns one form into the next
STAGE_TARGETS = [[('n', 0)], [('a', 1)], [('a', 2)], [('a', 3)], [('a', 4), ('a', 5), ('a', 6)], [('n', 6)]]


def node_x(i):
    return X0 + PITCH * i


def arrow_mid(i):  # the arrow from node i-1 to node i, i = 1..6
    return node_x(i - 1) + NODE_W + (PITCH - NODE_W) / 2


def stage_cx(j):
    return STAGE_X0 + STAGE_W / 2 + STAGE_PITCH * j


def forms_lane(y, labels=None, ink=INK, weight=3, values=None):
    labels = labels or FORMS
    out = []
    for i, lab in enumerate(labels):
        x = node_x(i)
        out.append(f"<rect x='{x}' y='{y - NODE_H / 2}' width='{NODE_W}' height='{NODE_H}' rx='16' "
                   f"fill='{PANEL}' stroke='{ink}' stroke-width='{weight}'><title>{esc(' '.join(lab))}</title></rect>")
        has_val = bool(values and values.get(i))
        out.append(multiline(x + NODE_W / 2, y - (14 if has_val else 0), lab, 26, INK if ink == INK else MUTED))
        if has_val:
            out.append(text(x + NODE_W / 2, y + 36, values[i], 24, AMBER, weight=600,
                            extra="font-family='Consolas, monospace'"))
    for i in range(1, 7):
        out.append(harrow(node_x(i - 1) + NODE_W + 4, node_x(i) - 3, y, ink, weight))
    return ''.join(out)


def stage_lane(y, ink=INK, forms_y=None, blank=False):
    out = []
    for j, name in enumerate(STAGE_NAMES):
        cx = stage_cx(j)
        out.append(f"<rect x='{cx - STAGE_W / 2}' y='{y - 40}' width='{STAGE_W}' height='80' rx='10' fill='{PANEL}' "
                   f"stroke='{ink}' stroke-width='2.5'><title>{name}</title></rect>")
        if not blank:
            out.append(text(cx, y + 9, name, 24, INK, weight=600))
        if j < 5:
            out.append(harrow(cx + STAGE_W / 2 + 3, stage_cx(j + 1) - STAGE_W / 2 - 2, y, ink, 2.5))
        if forms_y is not None:
            for kind, k in STAGE_TARGETS[j]:
                tx = arrow_mid(k) if kind == 'a' else node_x(k) + NODE_W / 2
                ty = forms_y - (6 if kind == 'a' else NODE_H / 2 + 4)
                out.append(f"<line x1='{cx}' y1='{y + 40}' x2='{tx}' y2='{ty}' stroke='{MUTED}' stroke-width='1.5' "
                           f"stroke-dasharray='3 5'/>")
    return ''.join(out)


def panel_card5():
    fy, ty = 190, 80
    body = [forms_lane(fy)]
    for i in range(1, 7):
        x = arrow_mid(i)
        body.append(f"<line x1='{x}' y1='{fy - 75}' x2='{x}' y2='{fy + 75}' stroke='{AMBER}' stroke-width='5'/>")
    body.append(text(800, fy + 120, 'every boundary: a place to spoil it', 26, AMBER, weight=600))
    body.append(f"<path d='M{node_x(0) + 10},{ty + 20} V{ty} H{node_x(6) + NODE_W - 10} V{ty + 20}' fill='none' "
                f"stroke='{TEAL}' stroke-width='2'/>")
    body.append(text(800, ty - 12, 'one temperature, seven forms   (proposal s7)', 22, TEAL))
    return svg(1600, 350, ''.join(body), 'Course path, D1-010 card 5 final step')


def eye_lane(y):
    out = []
    cx = stage_cx(0)
    out.append(f"<rect x='{cx - 30}' y='{y - 45}' width='60' height='80' rx='8' fill='none' stroke='{INK}' stroke-width='2.5'/>"
               f"<rect x='{cx - 34}' y='{y - 55}' width='68' height='14' rx='4' fill='{ROSE}'/>"
               + text(cx, y + 2, 'SUGAR', 13, INK, weight=600) + text(cx, y + 62, 'the jar', 20, MUTED))
    # the eye in section, to its own scale (globe 24.2 mm, cornea R 7.8 mm, lens 4.0 mm thick), 3.3 units per mm
    ex, s = stage_cx(1), 3.3
    R = 12.1 * s
    out.append(f"<circle cx='{ex}' cy='{y}' r='{R}' fill='none' stroke='{INK}' stroke-width='2.5'/>")
    out.append(f"<path d='M{ex - 9.6 * s},{y - 5.8 * s} A{7.8 * s},{7.8 * s} 0 0 0 {ex - 9.6 * s},{y + 5.8 * s}' "
               f"fill='none' stroke='{AZURE}' stroke-width='3'/>")
    out.append(f"<ellipse cx='{ex - 6.5 * s}' cy='{y}' rx='{2.0 * s}' ry='{4.6 * s}' fill='none' stroke='{AMBER}' stroke-width='2.5'/>")
    out.append(f"<path d='M{ex + 8 * s},{y - 9 * s} A{R},{R} 0 0 1 {ex + 8 * s},{y + 9 * s}' fill='none' stroke='{ROSE}' stroke-width='4'/>")
    out.append(text(ex, y + 62, 'eye · organ', 20, MUTED))
    nx1, nx2 = ex + R, stage_cx(3) - 160
    out.append(f"<path d='M{nx1},{y - 4} C{nx1 + 80},{y - 4} {nx2 - 120},{y - 14} {nx2},{y - 14}' fill='none' stroke='{TEAL}' stroke-width='3'/>"
               f"<path d='M{nx1},{y + 4} C{nx1 + 80},{y + 4} {nx2 - 120},{y + 14} {nx2},{y + 14}' fill='none' stroke='{TEAL}' stroke-width='3'/>")
    out.append(text(stage_cx(2), y + 62, 'optic nerve · pathway', 20, MUTED))
    bx = (stage_cx(3) + stage_cx(4)) / 2
    out.append(f"<path d='M{bx - 210},{y + 30} C{bx - 230},{y - 60} {bx - 60},{y - 75} {bx + 40},{y - 60} "
               f"C{bx + 160},{y - 75} {bx + 240},{y - 20} {bx + 210},{y + 30} C{bx + 150},{y + 55} {bx - 150},{y + 55} {bx - 210},{y + 30} z' "
               f"fill='none' stroke='{INK}' stroke-width='2.5'/>")
    out.append(f"<ellipse cx='{bx + 190}' cy='{y + 5}' rx='22' ry='30' fill='{VIOLET}' fill-opacity='0.35' stroke='{VIOLET}' stroke-width='2'/>")
    out.append(text(bx, y + 80, 'brain · processor (visual cortex shaded)', 20, MUTED))
    sx = stage_cx(5)
    out.append(f"<rect x='{sx - 55}' y='{y - 50}' width='110' height='100' rx='10' fill='none' stroke='{MUTED}' stroke-width='2' stroke-dasharray='6 5'/>"
               f"<rect x='{sx - 18}' y='{y - 25}' width='36' height='48' rx='5' fill='none' stroke='{INK}' stroke-width='2'/>"
               + text(sx, y + 72, 'what we see', 20, MUTED))
    return ''.join(out)


def spoiled(x, y):
    return (f"<rect x='{x - 78}' y='{y - 18}' width='156' height='36' rx='8' fill='{PANEL}' stroke='{MUTED}' stroke-width='1.5'/>"
            + text(x, y + 8, '⚠ Spoiled here', 18, INK, weight=600))


def panel_card4():
    ey, sy = 160, 440
    body = [eye_lane(ey), stage_lane(sy)]
    spans = [('sensor', stage_cx(1) - 125, stage_cx(1) + 125),
             ('conditioning & wiring', stage_cx(2) - 125, stage_cx(2) + 125),
             ('ADC & firmware', stage_cx(3) - 125, stage_cx(4) + 125)]
    for name, x1, x2 in spans:
        body.append(f"<rect x='{x1}' y='{ey - 85}' width='{x2 - x1}' height='{sy + 55 - (ey - 85)}' rx='14' fill='none' "
                    f"stroke='{AMBER}' stroke-width='3'/>")
        body.append(text((x1 + x2) / 2, ey - 97, name, 22, AMBER, weight=600))
    for x in (stage_cx(1), stage_cx(2), (stage_cx(3) + stage_cx(4)) / 2):
        body.append(spoiled(x, ey + 125))
        body.append(spoiled(x, sy + 90))
    body.append(text(800, sy + 155, 'organ · pathway · processor', 24, AMBER, weight=600))
    return svg(1600, 620, ''.join(body), 'Eye over path, D1-010 card 4 final step')


def panel_card6():
    fy = 150
    labels = [['Temperature'], ['Resistance'], ['Voltage'], ['ADC', 'code'], ['Binary', 'data'], ['Software', 'variable'], ['25 °C']]
    body = [forms_lane(fy, labels, values={0: '25 °C', 2: '1.65 V', 3: '2048'})]
    for i, t in ((1, 'temperature sensor'), (3, 'ADC'), (6, 'software')):
        body.append(text(arrow_mid(i), fy - 72, t, 18, TEAL, weight=600))
    body.append(text(arrow_mid(3), fy - 100, 'the ADC knows: its input voltage · its configuration', 18, MUTED))
    hung = [(1, 'the sensor'), (2, 'the signal conditioning'), (3, 'the ADC reference'), (3, 'the ADC configuration'),
            (6, 'calibration'), (6, 'scaling'), (1, "the sensor's characteristics")]
    tiers = [0, 2, 0, 1, 0, 1, 1]  # rows chosen so no two notes touch
    for k, (i, t) in enumerate(hung):
        x = arrow_mid(i)
        y = fy + 105 + tiers[k] * 44
        body.append(f"<line x1='{x}' y1='{fy + 8}' x2='{x}' y2='{y - 16}' stroke='{TEAL}' stroke-width='1.5'/>")
        body.append(f"<circle cx='{x}' cy='{fy + 8}' r='4' fill='{TEAL}'/>")
        body.append(text(x, y, f'{k + 1}  {t}', 19, TEAL, weight=600))
    body.append(text(800, fy + 262, 'a raw code is not an engineering value', 24, INK, weight=600))
    return svg(1600, 440, ''.join(body), 'Converter focus, D1-010 card 6 final step')


def panel_card7_blank():
    sy, fy = 110, 300
    body = [stage_lane(sy, forms_y=fy, blank=True), forms_lane(fy, ink=FAINT, weight=1.5)]
    body.append(text(node_x(3) + NODE_W / 2, fy + 82, '2047', 26, AMBER, weight=700, extra="font-family='Consolas, monospace'"))
    body.append(text(800, fy + 125, '(proposal: 2047 on ADC code)', 18, MUTED))
    return svg(1600, 450, ''.join(body), 'Blank path, D1-010 card 7')


def pin(x, y_base, y_head, letter, col, l1, l2):
    return (f"<line x1='{x}' y1='{y_base}' x2='{x}' y2='{y_head + 16}' stroke='{col}' stroke-width='2'/>"
            f"<circle cx='{x}' cy='{y_base}' r='4' fill='{col}'/>"
            f"<circle cx='{x}' cy='{y_head}' r='16' fill='{col}'/>" + text(x, y_head + 7, letter, 18, BG, weight=700)
            + text(x + 24, y_head - 3, l1, 17, INK, 'start', 600) + text(x + 24, y_head + 17, l2, 16, MUTED, 'start'))


def panel_d1020_card7():
    sy, fy = 330, 500
    body = [stage_lane(sy, forms_y=fy), forms_lane(fy, ink=FAINT, weight=1.5)]
    top = sy - 40
    pins = [(1, -95, 'T', TEAL, 'Theoretical', "the sensor's model"), (1, -170, 'S', AMBER, 'Static', 'environmental'),
            (1, -245, 'I', ROSE, 'Insertion', 'the ammeter · 050'), (1.5, -95, 'I', ROSE, 'Insertion', 'loading · 040'),
            (2, -170, 'S', AMBER, 'Static', 'offset, gain · 060'), (3, -245, 'S', AMBER, 'Static', 'offset, gain · 080'),
            (3, -170, 'D', VIOLET, 'Dynamic', 'the ADC input · 070'), (3, -95, 'Q', AZURE, 'Quantization', '080'),
            (4, -170, 'T', TEAL, 'Theoretical', 'linearization · D2·050'), (4, -95, 'N', LIME, 'The last digit', 'D2·030'),
            (5, -95, 'S', AMBER, 'Static', 'reading')]
    for j, dy, letter, col, l1, l2 in pins:
        if j == 1.5:
            x, base, head = (stage_cx(1) + stage_cx(2)) / 2, sy, sy - 245
        else:
            x, base, head = stage_cx(int(j)) - STAGE_W / 2 + 22, top, sy + dy
        body.append(pin(x, base, head, letter, col, l1, l2))
    return svg(1600, 590, ''.join(body), 'Error pins, D1-020 card 7 final step')


# ---------- four targets (D1-020-05 §3b) ----------
SHOTS = {
    'A': [(-0.30, 0.42), (0.64, 0.17), (-0.02, 0.35), (-0.31, 0.39), (0.16, 0.31), (-0.59, 0.18), (-0.31, -0.03), (-0.17, -0.13)],
    'B': [(1.43, 1.44), (1.63, 0.67), (1.86, 1.36), (1.83, 0.93), (1.42, 0.86), (1.98, 1.63), (0.69, 0.83), (1.39, 1.14)],
    'C': [(-2.26, -1.69), (0.48, -1.37), (1.60, -1.50), (1.69, -1.72), (-0.96, 0.54), (-1.58, -0.39), (0.20, 0.14), (-2.57, 0.24)],
    'D': [(1.53, 1.56), (1.48, 0.55), (2.75, 2.83), (1.35, -0.86), (-0.43, 0.54), (0.46, 1.92), (1.74, 4.15), (1.45, 2.44)],
}


def panel_targets():
    body = []
    u = 34  # drawing units per ring
    for k, (name, pts) in enumerate(SHOTS.items()):
        cx, cy = 200 + 400 * k, 210
        for r in range(5, 0, -1):
            fill = f"fill='{FAINT}'" if r == 1 else "fill='none'"
            body.append(f"<circle cx='{cx}' cy='{cy}' r='{r * u}' {fill} stroke='{MUTED}' stroke-width='1.5'/>")
        for (x, y) in pts:
            body.append(f"<circle cx='{cx + x * u:.1f}' cy='{cy - y * u:.1f}' r='7' fill='{INK}' stroke='{BG}' stroke-width='2'>"
                        f"<title>({x}, {y}) rings</title></circle>")
        body.append(text(cx, 420, name, 34, INK, weight=700))
    return svg(1600, 450, ''.join(body), 'Four targets, D1-020 card 5')


# ---------- plots ----------
def plot_frame(x0, y0, w, h, xmin, xmax, ymin, ymax, xticks, xfmt, yticks, yfmt, xlabel, ylabel):
    sx = lambda v: x0 + (v - xmin) / (xmax - xmin) * w
    sy = lambda v: y0 + h - (v - ymin) / (ymax - ymin) * h
    out = [f"<rect x='{x0}' y='{y0}' width='{w}' height='{h}' fill='{PANEL}'/>"]
    for t in xticks:
        out.append(f"<line x1='{sx(t):.1f}' y1='{y0}' x2='{sx(t):.1f}' y2='{y0 + h}' stroke='{FAINT}' stroke-width='1'/>")
        out.append(text(sx(t), y0 + h + 24, xfmt(t), 17, MUTED))
    for t in yticks:
        out.append(f"<line x1='{x0}' y1='{sy(t):.1f}' x2='{x0 + w}' y2='{sy(t):.1f}' stroke='{FAINT}' stroke-width='1'/>")
        out.append(text(x0 - 10, sy(t) + 6, yfmt(t), 17, MUTED, 'end'))
    if xlabel:
        out.append(text(x0 + w / 2, y0 + h + 52, xlabel, 18, MUTED))
    if ylabel:
        out.append(text(x0 - 70, y0 + h / 2, ylabel, 18, MUTED, extra=f"transform='rotate(-90 {x0 - 70} {y0 + h / 2})'"))
    return out, sx, sy


def gauss_path(sx, sy, mu, sig, xmin, xmax, n=1200):
    pts = []
    for i in range(n + 1):
        x = xmin + (xmax - xmin) * i / n
        pts.append(f"{sx(x):.2f},{sy(math.exp(-((x - mu) ** 2) / (2 * sig ** 2))):.2f}")
    return 'M' + ' L'.join(pts)


def panel_two_instruments():
    xmin, xmax = 0.985, 1.015
    body, sx, sy = plot_frame(140, 40, 1000, 380, xmin, xmax, 0, 1.1, [0.985 + 0.005 * i for i in range(7)],
                              lambda v: f'{v:.3f}', [0, 0.5, 1.0], lambda v: f'{v:g}', 'Reading (V)', 'How often (peak = 1)')
    body.append(f"<path d='{gauss_path(sx, sy, 1.0010, 0.0020, xmin, xmax)}' fill='none' stroke='{TEAL}' stroke-width='3'/>")
    body.append(f"<path d='{gauss_path(sx, sy, 1.0040, 0.00015, xmin, xmax, 4000)}' fill='none' stroke='{AMBER}' stroke-width='3' stroke-dasharray='9 6'/>")
    body.append(f"<line x1='{sx(1.0)}' y1='40' x2='{sx(1.0)}' y2='420' stroke='{INK}' stroke-width='2.5'/>")
    body.append(text(sx(1.0) - 8, 64, 'True value 1.0000 V', 18, INK, 'end', 600))
    body.append(text(sx(0.9975), sy(0.62), 'handheld', 20, INK, 'end', 600))
    body.append(text(sx(1.0043), sy(0.95), 'bench (out of calibration)', 20, INK, 'start', 600))
    lx = 1180
    body.append(f"<line x1='{lx}' y1='90' x2='{lx + 50}' y2='90' stroke='{TEAL}' stroke-width='3'/>" + text(lx + 60, 96, 'handheld  μ 1.0010 V  σ 2.0 mV', 17, INK, 'start'))
    body.append(f"<line x1='{lx}' y1='130' x2='{lx + 50}' y2='130' stroke='{AMBER}' stroke-width='3' stroke-dasharray='9 6'/>" + text(lx + 60, 136, 'bench  μ 1.0040 V  σ 0.15 mV', 17, INK, 'start'))
    body.append(f"<line x1='{lx + 25}' y1='155' x2='{lx + 25}' y2='185' stroke='{INK}' stroke-width='2.5'/>" + text(lx + 60, 176, 'true value', 17, INK, 'start'))
    body.append(text(lx, 230, 'each curve scaled to the same height', 16, MUTED, 'start'))
    return svg(1600, 500, ''.join(body), 'Two instruments plot, D1-020 card 5 step s1')


def panel_walk():
    cases = [('A  accurate, precise', 1.0000, 0.0003), ('B  precise, not accurate', 1.0050, 0.0003),
             ('C  accurate, not precise', 1.0000, 0.0030), ('D  neither', 1.0050, 0.0030),
             ('card 6: repeatable, wrong', 1.0040, 0.0001)]
    xmin, xmax = 0.985, 1.015
    body = []
    w, h = 270, 200
    for k, (name, mu, sig) in enumerate(cases):
        x0 = 40 + k * 312
        fr, sx, sy = plot_frame(x0, 50, w, h, xmin, xmax, 0, 1.1, [0.985, 1.000, 1.015], lambda v: f'{v:.3f} V' if abs(v - 1.0) < 1e-9 else '',
                                [], str, '', '')
        body += fr
        body.append(f"<line x1='{sx(1.0)}' y1='50' x2='{sx(1.0)}' y2='{50 + h}' stroke='{INK}' stroke-width='2'/>")
        body.append(f"<path d='{gauss_path(sx, sy, mu, sig, xmin, xmax, 3000)}' fill='none' stroke='{TEAL}' stroke-width='3'/>")
        body.append(text(x0 + w / 2, 36, name, 18, INK, weight=600))
        body.append(text(x0 + w / 2, 50 + h + 52, f'μ {mu:.4f} V   σ {sig * 1000:.1f} mV', 16, MUTED))
    return svg(1600, 330, ''.join(body), 'Accuracy and precision walk, D1-020 cards 5 and 6')


def panel_meter_band():
    body, sx, sy = plot_frame(150, 40, 1100, 380, 0, 2.0, 0, 7, [0, 0.5, 1.0, 1.5, 2.0], lambda v: f'{v:.1f}',
                              [0, 1, 2, 3, 4, 5, 6, 7], lambda v: f'{v:g} %', 'Reading V (V), 2 V range', 'Band, % of the reading')
    pts = []
    for i in range(0, 1201):
        v = 0.05 + (1.999 - 0.05) * i / 1200
        pts.append(f"{sx(v):.1f},{sy((0.005 * v + 0.003) / v * 100):.1f}")
    body.append(f"<path d='M{' L'.join(pts)}' fill='none' stroke='{TEAL}' stroke-width='3'/>")
    body.append(f"<line x1='{sx(0)}' y1='{sy(0.5)}' x2='{sx(2.0)}' y2='{sy(0.5)}' stroke='{AMBER}' stroke-width='2' stroke-dasharray='8 6'/>")
    body.append(text(sx(1.95), sy(0.5) - 10, 'the 0.5 % part alone', 17, INK, 'end'))
    for v, lab in ((1.0, '1.000 V: ±8 mV, 0.8 %'), (0.1, '0.100 V: ±3.5 mV, 3.5 %'), (0.05, '0.05 V: 6.5 %')):
        u = (0.005 * v + 0.003) / v * 100
        body.append(f"<circle cx='{sx(v):.1f}' cy='{sy(u):.1f}' r='8' fill='{TEAL}' stroke='{BG}' stroke-width='2'><title>{lab}</title></circle>")
        body.append(text(sx(v) + 16, sy(u) - 12, lab, 18, INK, 'start', 600))
    body.append(f"<rect x='{sx(1.999)}' y='40' width='6' height='380' fill='{ROSE}' fill-opacity='0.5'/>")
    body.append(text(sx(1.999) - 8, 70, 'over range above 1.999 V', 16, MUTED, 'end'))
    return svg(1600, 500, ''.join(body), 'Meter band, D1-020 card 8')


def panel_rss():
    stages = ['sensor', '+ divider', '+ reference', '+ ADC gain']
    wc = [0.5, 1.5, 2.5, 3.0]
    rss = [0.5, math.sqrt(1.25), math.sqrt(2.25), math.sqrt(2.5)]
    body, sx, sy = plot_frame(150, 40, 1000, 360, 0.6, 4.4, 0, 3.5, [1, 2, 3, 4], lambda v: stages[int(v) - 1],
                              [0, 1, 2, 3], lambda v: f'±{v:g} %', 'Stages added', 'Combined error')
    for series, col, dash, name in ((wc, AMBER, True, 'worst case  Σ|eᵢ|'), (rss, TEAL, False, 'RSS  √(Σeᵢ²)')):
        d = 'M' + ' L'.join(f"{sx(i + 1):.1f},{sy(v):.1f}" for i, v in enumerate(series))
        dash_attr = "stroke-dasharray='9 6'" if dash else ''
        body.append(f"<path d='{d}' fill='none' stroke='{col}' stroke-width='3' {dash_attr}/>")
        for i, v in enumerate(series):
            body.append(f"<circle cx='{sx(i + 1):.1f}' cy='{sy(v):.1f}' r='8' fill='{col}' stroke='{BG}' stroke-width='2'><title>{name}: ±{v:.2f} %</title></circle>")
        body.append(text(sx(4) + 18, sy(series[-1]) + 6, f'{name}: ±{series[-1]:.2f} %', 18, INK, 'start', 600))
    return svg(1600, 470, ''.join(body), 'Worst case against RSS, D1-020 card 9')


# ---------- U012: D1·030 ----------
def dim_stage_lane(y, lit, forms_y=None):
    """The stage lane with only the stages in `lit` at full ink: the focus of X2, drawn as a variant."""
    out = []
    for j, name in enumerate(STAGE_NAMES):
        cx = stage_cx(j)
        on = j in lit
        ink = INK if on else FAINT
        out.append(f"<rect x='{cx - STAGE_W / 2}' y='{y - 40}' width='{STAGE_W}' height='80' rx='10' fill='{PANEL}' "
                   f"stroke='{ink}' stroke-width='{2.5 if on else 1.5}'><title>{name}</title></rect>")
        out.append(text(cx, y + 9, name, 24, INK if on else MUTED, weight=600 if on else 400))
        if j < 5:
            out.append(harrow(cx + STAGE_W / 2 + 3, stage_cx(j + 1) - STAGE_W / 2 - 2, y, ink, 2.5 if on else 1.5))
    return ''.join(out)


def ghost_eye(ex, y, s=3.3):
    R = 12.1 * s
    g = MUTED
    return (f"<g opacity='0.55'><circle cx='{ex}' cy='{y}' r='{R}' fill='none' stroke='{g}' stroke-width='2'/>"
            f"<path d='M{ex - 9.6 * s},{y - 5.8 * s} A{7.8 * s},{7.8 * s} 0 0 0 {ex - 9.6 * s},{y + 5.8 * s}' fill='none' stroke='{g}' stroke-width='2'/>"
            f"<ellipse cx='{ex - 6.5 * s}' cy='{y}' rx='{2.0 * s}' ry='{4.6 * s}' fill='none' stroke='{g}' stroke-width='2'/>"
            f"<path d='M{ex + 8 * s},{y - 9 * s} A{R},{R} 0 0 1 {ex + 8 * s},{y + 9 * s}' fill='none' stroke='{g}' stroke-width='3'/></g>")


def panel_d1030_card1():
    ey, sy = 150, 420
    body = [dim_stage_lane(sy, lit={0, 1})]
    ex = stage_cx(1)
    body.append(ghost_eye(ex, ey))
    body.append(text(ex, ey + 70, 'the eye: a sense organ (D1·010)', 20, MUTED))
    body.append(f"<line x1='{ex}' y1='{ey + 82}' x2='{ex}' y2='{sy - 46}' stroke='{MUTED}' stroke-width='1.5' stroke-dasharray='3 5'/>")
    # s2: the first arrow lit, the quantity is not electrical
    x1, x2 = stage_cx(0) + STAGE_W / 2 + 3, stage_cx(1) - STAGE_W / 2 - 2
    body.append(f"<line x1='{x1}' y1='{sy}' x2='{x2 - 9}' y2='{sy}' stroke='{AMBER}' stroke-width='6'/>" + arrowhead(x2, sy, AMBER, 15))
    body.append(multiline(stage_cx(0), sy + 85, ['not electrical:', 'temperature, pressure, light'], 20, AMBER, weight=600))
    # s3: the sensor's output, a usable signal
    x3, x4 = stage_cx(1) + STAGE_W / 2 + 3, stage_cx(2) - STAGE_W / 2 - 2
    body.append(f"<line x1='{x3}' y1='{sy}' x2='{x4 - 9}' y2='{sy}' stroke='{TEAL}' stroke-width='6'/>" + arrowhead(x4, sy, TEAL, 15))
    body.append(multiline(stage_cx(1) + 130, sy + 85, ['usable signal:', 'electrical'], 20, TEAL, weight=600))
    body.append(f"<rect x='{stage_cx(0) - 135}' y='{sy - 62}' width='{stage_cx(1) - stage_cx(0) + 270}' height='124' rx='16' fill='none' "
                f"stroke='{AMBER}' stroke-width='2' stroke-dasharray='10 7'/>")
    body.append(text(800, sy + 175, 'physical quantity → sensor → usable signal', 26, INK, weight=600))
    return svg(1600, 640, ''.join(body), 'D1-030 card 1, last step: the path focused on its first arrow, the eye ghosted above')


def box(x, y, w, h, lines, ink=INK, size=26, weight=600, sw=3):
    return (f"<rect x='{x}' y='{y}' width='{w}' height='{h}' rx='14' fill='{PANEL}' stroke='{ink}' stroke-width='{sw}'/>"
            + multiline(x + w / 2, y + h / 2, lines, size, INK, weight=weight))


def panel_d1030_card2():
    W, H, yc = 1600, 640, 300
    bx1, bx2 = 430, 1170  # the two domain boundaries
    body = []
    for x in (bx1, bx2):  # the domain boundary, broken where the transducer and its labels sit on it
        for y1, y2 in ((80, 190), (500, H - 70)):
            body.append(f"<line x1='{x}' y1='{y1}' x2='{x}' y2='{y2}' stroke='{MUTED}' stroke-width='2' stroke-dasharray='12 8'/>")
    body.append(text(215, 60, 'PHYSICAL WORLD', 22, MUTED, weight=600))
    body.append(text(800, 60, 'ELECTRONIC SYSTEM', 22, MUTED, weight=600))
    body.append(text(1385, 60, 'PHYSICAL WORLD', 22, MUTED, weight=600))
    sw, shh = 220, 120
    # the sensor and the actuator straddle the boundaries: they are the interface
    body.append(text(bx1, yc - 80, 'input transducer', 22, TEAL, weight=600))
    body.append(box(bx1 - sw / 2, yc - shh / 2, sw, shh, ['SENSOR'], TEAL))
    body.append(text(bx2, yc - 80, 'output transducer', 22, AMBER, weight=600))
    body.append(box(bx2 - sw / 2, yc - shh / 2, sw, shh, ['ACTUATOR'], AMBER))
    body.append(box(640, yc - 80, 320, 160, ['ELECTRONICS', 'condition · convert ·', 'process · decide'], INK, 24))
    body.append(multiline(140, yc, ['physical', 'quantity'], 24, INK, weight=600))
    body.append(multiline(1475, yc, ['physical', 'effect'], 24, INK, weight=600))
    body.append(harrow(215, bx1 - sw / 2 - 4, yc, INK, 3))
    body.append(harrow(bx1 + sw / 2 + 4, 636, yc, TEAL, 4))
    body.append(harrow(964, bx2 - sw / 2 - 4, yc, TEAL, 4))
    body.append(harrow(bx2 + sw / 2 + 4, 1395, yc, INK, 3))
    body.append(text(800, yc - 100, 'electrical signals', 20, TEAL, weight=600))
    body.append(multiline(bx1, yc + 100, ['acquires', 'information'], 22, TEAL, weight=600))
    body.append(multiline(bx2, yc + 100, ['produces', 'an effect'], 22, AMBER, weight=600))
    body.append(multiline(bx1, yc + 175, ['e.g. thermistor, photodiode'], 18, MUTED))
    body.append(multiline(bx2, yc + 175, ['e.g. heater, motor, valve'], 18, MUTED))
    # proposal: the loop closed through the same process
    body.append(f"<path d='M1475,{yc + 40} V{H - 40} H140 V{yc + 40}' fill='none' stroke='{FAINT}' stroke-width='2' stroke-dasharray='6 6'/>")
    body.append(text(800, H - 50, 'the same process: the loop closes (proposal, optional layer)', 18, MUTED))
    body.append(text(800, yc + 120, 'information flows left to right →', 20, MUTED))
    return svg(W, H, ''.join(body), 'D1-030 card 2, last step: transducer data flow (redrawn after Pallàs-Areny & Webster, Fig. 1.1)')


C_K = [-0.176004136860E-01, 0.389212049750E-01, 0.185587700320E-04, -0.994575928740E-07, 0.318409457190E-09,
       -0.560728448890E-12, 0.560750590590E-15, -0.320207200030E-18, 0.971511471520E-22, -0.121047212750E-25]


def e_k(t):
    """NIST ITS-90 type K reference function, 0 to 1372 °C, mV."""
    return sum(c * t ** i for i, c in enumerate(C_K)) + 0.1185976 * math.exp(-0.0001183432 * (t - 126.9686) ** 2)


def panel_d1030_card3():
    xmin, xmax, ymin, ymax = 0, 200, -2, 8
    body, sx, sy = plot_frame(150, 40, 1050, 420, xmin, xmax, ymin, ymax, [0, 25, 50, 75, 100, 125, 150, 175, 200], lambda v: f'{v:g}',
                              [-2, 0, 2, 4, 6, 8], lambda v: f'{v:g}', 'Hot-junction temperature T_hot (°C)', 'Output (mV)')
    body.append(f"<line x1='{sx(0)}' y1='{sy(0)}' x2='{sx(200)}' y2='{sy(0)}' stroke='{MUTED}' stroke-width='1.5'/>")
    S = 0.041

    def line(f, col, w=3, dash=''):
        pts = ' L'.join(f"{sx(x):.1f},{sy(f(x)):.1f}" for x in [i * 0.5 for i in range(401)] if ymin - 1 < f(x) < ymax + 1)
        d = f"stroke-dasharray='{dash}'" if dash else ''
        return f"<path d='M{pts}' fill='none' stroke='{col}' stroke-width='{w}' {d}/>"
    # the start state, kept as the faint previous line (proposal: B4)
    body.append(line(lambda x: S * (x - 25), VIOLET, 2.5, '8 6'))
    body.append(line(lambda x: S * (x - 35), TEAL, 3.5))
    body.append(f"<line x1='{sx(0)}' y1='{sy(S * 65)}' x2='{sx(200)}' y2='{sy(S * 65)}' stroke='{AMBER}' stroke-width='2.5'/>")
    body.append(f"<line x1='{sx(0)}' y1='{sy(S * 75)}' x2='{sx(200)}' y2='{sy(S * 75)}' stroke='{MUTED}' stroke-width='1.5' stroke-dasharray='4 6'/>")
    body.append(f"<line x1='{sx(100)}' y1='40' x2='{sx(100)}' y2='460' stroke='{INK}' stroke-width='2'/>")
    body.append(text(sx(100) + 8, 64, 'T_hot = 100 °C, held', 18, INK, 'start', 600))
    body.append(f"<circle cx='{sx(100)}' cy='{sy(S * 65)}' r='8' fill='{AMBER}' stroke='{BG}' stroke-width='2'><title>2.665 mV</title></circle>")
    body.append(f"<circle cx='{sx(100)}' cy='{sy(S * 75)}' r='6' fill='none' stroke='{MUTED}' stroke-width='2'><title>3.075 mV</title></circle>")
    body.append(text(sx(98), sy(S * 75) - 12, 'was 3.08 mV (T_cold 25 °C)', 17, MUTED, 'end'))
    body.append(text(sx(103), sy(S * 65) + 26, 'now 2.67 mV (T_cold 35 °C)', 18, AMBER, 'start', 600))
    body.append(f"<circle cx='{sx(35)}' cy='{sy(0)}' r='6' fill='{TEAL}'/>")
    body.append(text(sx(38), sy(0) + 26, 'zero where T_hot = T_cold', 16, TEAL, 'start'))
    lx = 1230
    rows = [(TEAL, '', 'linear, S = 41 µV/°C'),
            (AMBER, '', 'output now: S·(T_hot − T_cold)'), (VIOLET, '8 6', 'the line at T_cold 25 °C (proposal)')]
    for k, (col, dash, lab) in enumerate(rows):
        y = 90 + 40 * k
        d = f"stroke-dasharray='{dash}'" if dash else ''
        body.append(f"<line x1='{lx}' y1='{y}' x2='{lx + 44}' y2='{y}' stroke='{col}' stroke-width='3' {d}/>" + text(lx + 54, y + 6, lab, 16, INK, 'start'))
    body.append(text(lx, 236, 'sliders: T_hot 100 °C · T_cold 35 °C', 16, MUTED, 'start'))
    body.append(text(lx, 270, 'a linear approximation: the type K', 16, MUTED, 'start'))
    body.append(text(lx, 292, 'table differs by < 0.04 mV here', 16, MUTED, 'start'))
    return svg(1600, 530, ''.join(body), 'D1-030 card 3, step s1: the thermocouple output with T_cold moved')


# the pressure chain (D1-030-04 §3): a 17-4PH diaphragm, a = 6 mm, t = 0.3 mm, 1.0 MPa
DIA_A, DIA_T, P_FS, E_MOD, NU = 6.0, 0.3, 1.0e6, 197e9, 0.27
K_STRAIN = 3 * P_FS * (1 - NU ** 2) / (8 * E_MOD * (DIA_T * 1e-3) ** 2)          # strain per m²
W0_UM = 3 * P_FS * (1 - NU ** 2) * (DIA_A * 1e-3) ** 4 / (16 * E_MOD * (DIA_T * 1e-3) ** 3) * 1e6


def badge(x, y, n, col=INK):
    return f"<circle cx='{x}' cy='{y}' r='17' fill='{col}'/>" + text(x, y + 7, str(n), 19, BG, weight=700)


def panel_d1030_card4(packaged=True):
    W, H = 1600, 900
    u = 30          # drawing units per mm
    cx, ytop = 560, 470  # diaphragm centre, its top face
    a = DIA_A * u
    tk = DIA_T * u
    exag = 50
    body = []
    # the body around the diaphragm (in section): the port's walls
    body.append(f"<path d='M{cx - a - 90},{ytop - 40} V{ytop + 240} H{cx - a} V{ytop + tk} H{cx - a - 0} ' fill='none'/>")
    for sgn in (-1, 1):
        x_in = cx + sgn * a
        x_out = cx + sgn * (a + 90)
        body.append(f"<path d='M{x_in},{ytop + tk} V{ytop + 250} H{x_out} V{ytop - 30} H{x_in} V{ytop}' fill='{FAINT}' stroke='{INK}' stroke-width='2.5'/>")
        for k in range(8):  # hatch, thin
            y0 = ytop - 20 + k * 34
            body.append(f"<line x1='{min(x_in, x_out) + 6}' y1='{y0 + 26}' x2='{max(x_in, x_out) - 6}' y2='{y0}' stroke='{MUTED}' stroke-width='1'/>")
    # flat diaphragm (s0) and its deflected shape (s1), w(r) = w0 (1 - r²/a²)², drawn from the equation
    body.append(f"<rect x='{cx - a}' y='{ytop}' width='{2 * a}' height='{tk}' fill='{INK}' opacity='0.25'/>")
    pts_top = []
    pts_bot = []
    for i in range(201):
        r = -DIA_A + 2 * DIA_A * i / 200
        w = W0_UM * (1 - (r / DIA_A) ** 2) ** 2 * 1e-3 * exag * u
        pts_top.append(f"{cx + r * u:.1f},{ytop - w:.1f}")
        pts_bot.append(f"{cx + r * u:.1f},{ytop + tk - w:.1f}")
    body.append(f"<path d='M{' L'.join(pts_top)} L{' L'.join(reversed(pts_bot))} z' fill='{AZURE}' fill-opacity='0.35' stroke='{AZURE}' stroke-width='2.5'/>")
    body.append(text(cx, ytop + 70, f'deflection exaggerated ×{exag}', 16, MUTED))
    # pressure from the port, below
    for dx in (-120, -60, 0, 60, 120):
        body.append(f"<line x1='{cx + dx}' y1='{ytop + 220}' x2='{cx + dx}' y2='{ytop + 110}' stroke='{ROSE}' stroke-width='4'/>"
                    + f"<path d='M{cx + dx},{ytop + 96} l-9,16 h18 z' fill='{ROSE}'/>")
    body.append(text(cx, ytop + 250, 'pressure, up to 10 bar', 20, ROSE, weight=600))
    body.append(badge(cx - 150, ytop + 243, 1, ROSE))
    body.append(badge(cx + a + 130, ytop - 40, 2, AZURE))
    body.append(text(cx + a + 155, ytop - 33, 'diaphragm', 18, INK, 'start', 600))
    # radial strain on the top face, εr(r) = K (a² − 3r²): a curve from its equation, above the diaphragm
    yb = ytop - 190
    sc = 90 / 1412  # units per µε
    body.append(f"<line x1='{cx - a}' y1='{yb}' x2='{cx + a}' y2='{yb}' stroke='{MUTED}' stroke-width='1.5'/>")
    pts = []
    for i in range(201):
        r = -DIA_A + 2 * DIA_A * i / 200
        e = K_STRAIN * ((DIA_A * 1e-3) ** 2 - 3 * (r * 1e-3) ** 2) * 1e6
        pts.append(f"{cx + r * u:.1f},{yb - e * sc:.1f}")
    body.append(f"<path d='M{' L'.join(pts)}' fill='none' stroke='{VIOLET}' stroke-width='3'/>")
    e0 = K_STRAIN * (DIA_A * 1e-3) ** 2 * 1e6
    body.append(text(cx, yb - e0 * sc - 14, f'+{e0:.0f} µε (stretched)', 18, VIOLET, weight=600))
    body.append(text(cx - a - 10, yb + 2 * e0 * sc + 6, f'−{2 * e0:.0f} µε', 18, VIOLET, 'end', 600))
    body.append(text(cx + a + 10, yb + 2 * e0 * sc + 6, '(squeezed)', 16, VIOLET, 'start'))
    body.append(text(cx + a + 155, yb - 14, 'strain on the top face', 18, INK, 'start', 600))
    body.append(badge(cx + a + 130, yb - 20, 3, VIOLET))
    # the four gauges on the top face: two at the centre (+), two at the rim (−)
    gpos = [(-25, 'G1', '+'), (25, 'G3', '+'), (-a + 22, 'G4', '−'), (a - 22, 'G2', '−')]
    for dx, name, sg in gpos:
        r_mm = dx / u
        w = W0_UM * (1 - (r_mm / DIA_A) ** 2) ** 2 * 1e-3 * exag * u
        body.append(f"<rect x='{cx + dx - 16}' y='{ytop - w - 9}' width='32' height='8' fill='{AMBER}'/>")
        body.append(text(cx + dx, ytop - w - 18, name, 15, AMBER, weight=700))
    # the bridge
    bc, by, hd = 1200, 400, 150
    N, E_, S_, W_ = (bc, by - hd), (bc + hd, by), (bc, by + hd), (bc - hd, by)
    arms = [(N, W_, 'G1 +'), (N, E_, 'G2 −'), (E_, S_, 'G3 +'), (W_, S_, 'G4 −')]
    for (x1, y1), (x2, y2), lab in arms:
        body.append(f"<line x1='{x1}' y1='{y1}' x2='{x2}' y2='{y2}' stroke='{INK}' stroke-width='2.5'/>")
        mx, my = (x1 + x2) / 2, (y1 + y2) / 2
        ang = math.degrees(math.atan2(y2 - y1, x2 - x1))
        body.append(f"<rect x='{mx - 30}' y='{my - 10}' width='60' height='20' fill='{PANEL}' stroke='{AMBER}' stroke-width='2.5' transform='rotate({ang:.1f} {mx} {my})'/>")
        off = -34 if mx < bc else 34
        body.append(text(mx + off, my - (20 if my < by else -30), lab, 18, AMBER, 'middle', 700))
    body.append(text(bc, by - hd - 14, '+5 V excitation', 18, INK, weight=600))
    body.append(text(bc, by + hd + 30, '0 V', 18, INK, weight=600))
    body.append(f"<line x1='{W_[0]}' y1='{by}' x2='{E_[0]}' y2='{by}' stroke='{TEAL}' stroke-width='2' stroke-dasharray='6 5'/>")
    body.append(text(bc, by - 10, 'V_out', 20, TEAL, weight=700))
    body.append(badge(cx, ytop - 125, 4, AMBER))
    body.append(badge(bc - hd - 45, by + 60, 4, AMBER))
    body.append(badge(bc + hd + 50, by, 5, TEAL))
    vo = 5.0 * 2.0 / 4 * (2 * e0 + 2 * 2 * e0) * 1e-6 * 1e3
    body.append(text(bc + hd + 50, by + 40, f'{vo:.1f} mV', 20, TEAL, weight=700))
    # the package, drawn round all of it (s6)
    if packaged:
        # the body, open only at the port where the pressure comes in
        body.append(f"<path d='M{cx - a},{ytop + 260} H250 V150 H1460 V{ytop + 260} H{cx + a}' fill='{BG}' fill-opacity='0.62' "
                    f"stroke='{INK}' stroke-width='5'/>")
        body.append(f"<rect x='1460' y='355' width='60' height='100' rx='6' fill='{PANEL}' stroke='{INK}' stroke-width='4'/>")
        for k in range(4):
            body.append(f"<line x1='1520' y1='{370 + 23 * k}' x2='1590' y2='{370 + 23 * k}' stroke='{INK}' stroke-width='2'/>")
        body.append(text(1525, 490, 'four wires out', 16, MUTED))
        body.append(text(855, 132, 'the package: one body, the stages inside it (not to scale)', 20, INK, weight=600))
    # the chain, numbered as the badges
    chain = [('Pressure', ROSE), ('Deformation', AZURE), ('Strain', VIOLET), ('Resistance change', AMBER), ('Voltage', TEAL)]
    xs = [170, 470, 760, 1060, 1400]
    for k, ((lab, col), x) in enumerate(zip(chain, xs)):
        body.append(badge(x - 20 - len(lab) * 6.2, 835, k + 1, col) + text(x, 843, lab, 24, INK, weight=600))
        if k < 4:
            body.append(harrow(x + len(lab) * 6.6 + 12, xs[k + 1] - 20 - len(chain[k + 1][0]) * 6.2 - 24, 835, MUTED, 2.5))
    return svg(W, H, ''.join(body), 'D1-030 card 4: the pressure chain inside its package')


def panel_d1030_card4_open():
    return panel_d1030_card4(packaged=False)


def panel_d1030_card9():
    sy, fy = 360, 520
    body = [stage_lane(sy, forms_y=fy), forms_lane(fy, ink=FAINT, weight=1.5)]
    top = sy - 40
    # the five defences: number, ink, name, where
    pins = [(stage_cx(1) - 70, -230, '1', TEAL, 'Insensitive design', 'here, at the sensor'),
            (stage_cx(1) - 70, -120, '2', TEAL, 'Opposing inputs', 'here, at the sensor'),
            (stage_cx(2) - 70, -120, '3', AZURE, 'Negative feedback', 'conditioning · 060'),
            (stage_cx(3) - 70, -230, '4', VIOLET, 'Filtering', 'the sampler · D3·020'),
            (stage_cx(4) - 70, -120, '5', AMBER, 'Mathematical correction', 'firmware · D2·050')]
    for x, dy, n, col, l1, l2 in pins:
        body.append(pin(x, top, sy + dy, n, col, l1, l2))
    # s4: the poll's four answers dropped onto them (as the PLAN maps them)
    heads = {p[2]: (p[0], sy + p[1]) for p in pins}
    cards = [('shade the sensor', 340, '1'), ('an optical filter', 820, '4'),
             ('source on/off, difference', 1120, '5'), ('a second, shaded sensor', 1420, '5')]
    for k, (lab, x, n) in enumerate(cards):
        y = 52
        wcard = len(lab) * 10 + 40
        hx, hy = heads[n]
        body.append(f"<line x1='{x}' y1='{y + 16}' x2='{hx}' y2='{hy - 17}' stroke='{MUTED}' stroke-width='1.5' stroke-dasharray='3 4'/>")
        body.append(f"<rect x='{x - wcard / 2}' y='{y - 24}' width='{wcard}' height='40' rx='8' fill='{PANEL}' stroke='{MUTED}' stroke-width='1.5' stroke-dasharray='5 4'/>")
        body.append(text(x, y + 3, lab, 17, INK, weight=600))
        body.append(text(x + wcard / 2 - 14, y + 3, f'→{n}', 15, MUTED, 'end'))
    body.append(text(800, 650, "the poll's answers, dropped onto the defences (the PLAN's mapping; see F1, F2)", 18, MUTED))
    return svg(1600, 680, ''.join(body), 'D1-030 card 9, last step: the five defences pinned on the path, the poll answers on them')


# ---------- U013: D1·040 ----------
LEFT_040 = [35, 265, 680, 910, 1140, 1370]   # D1-040-01 §3: boxes 205 wide, the gap after SENSOR opened to 210
W_040 = 205


def panel_d1040_card1():
    y = 250
    body = []
    for j, name in enumerate(STAGE_NAMES):
        x = LEFT_040[j]
        on = j in (1, 2)
        ink = INK if on else FAINT
        body.append(f"<rect x='{x}' y='{y - 40}' width='{W_040}' height='80' rx='10' fill='{PANEL}' stroke='{ink}' "
                    f"stroke-width='{2.5 if on else 1.5}'><title>{name}</title></rect>")
        body.append(text(x + W_040 / 2, y + 9, name, 23, INK if on else MUTED, weight=600 if on else 400))
        if j < 5:
            x1, x2 = x + W_040 + 3, LEFT_040[j + 1] - 2
            body.append(harrow(x1, x2, y, INK if j == 1 else ink, 3 if j == 1 else 1.5))
            if j >= 2:  # s2 (proposal): every other arrow is an interface too
                mx = (x + W_040 + LEFT_040[j + 1]) / 2
                body.append(f"<line x1='{mx}' y1='{y - 52}' x2='{mx}' y2='{y + 52}' stroke='{AMBER}' stroke-opacity='0.55' "
                            f"stroke-width='2.5' stroke-dasharray='7 5'/>")
    # s1: SOURCE & LOADING, the boundary after SENSOR opened up as the module's stage
    body.append(f"<rect x='478' y='{y - 80}' width='194' height='160' rx='16' fill='none' stroke='{AMBER}' stroke-width='3' "
                f"stroke-dasharray='12 8'/>")
    body.append(multiline(575, y - 42, ['SOURCE &', 'LOADING'], 21, AMBER, weight=600))
    body.append(text(575, y - 102, 'interface', 26, AMBER, weight=700))
    # s3: the PLAN's label
    body.append(text(575, y + 125, 'interface: what does each side expect?', 26, AMBER, weight=600))
    body.append(text(1255, y + 78, 'every arrow is an interface (proposal s2)', 18, MUTED))
    return svg(1600, 420, ''.join(body), 'D1-040 card 1, last step: the boundary after SENSOR opened up as SOURCE & LOADING')


def resistor_v(x, y1, y2, col, ntc=False, sw=3):
    """An IEC resistor, vertical, body from y1 to y2 (44 wide); the NTC adds the thermistor's diagonal and foot."""
    out = f"<rect x='{x - 22}' y='{y1}' width='44' height='{y2 - y1}' fill='{PANEL}' stroke='{col}' stroke-width='{sw}'/>"
    if ntc:
        a, b = (x - 40, y2 + 12), (x + 40, y1 - 12)
        out += (f"<path d='M{a[0] - 18},{a[1]} H{a[0]} L{b[0]},{b[1]}' fill='none' stroke='{col}' stroke-width='2'/>"
                + text(x - 52, y1 + 12, '−t°', 20, col, 'end'))
    return out


def source_v(x, y, col, r=40):
    return (f"<circle cx='{x}' cy='{y}' r='{r}' fill='{PANEL}' stroke='{col}' stroke-width='3'/>"
            + text(x, y - 10, '+', 26, col, weight=700) + text(x, y + 30, '−', 26, col, weight=700))


def wire(points, col=INK, sw=3):
    return f"<polyline points='{' '.join(f'{px},{py}' for px, py in points)}' fill='none' stroke='{col}' stroke-width='{sw}'/>"


def terminal(x, y, col=INK):
    return f"<circle cx='{x}' cy='{y}' r='7' fill='{BG}' stroke='{col}' stroke-width='2.5'/>"


def dot(x, y, col=INK):
    return f"<circle cx='{x}' cy='{y}' r='6' fill='{col}'/>"


def ground(x, y, col=INK):
    return (f"<line x1='{x}' y1='{y}' x2='{x}' y2='{y + 18}' stroke='{col}' stroke-width='3'/>"
            f"<line x1='{x - 22}' y1='{y + 18}' x2='{x + 22}' y2='{y + 18}' stroke='{col}' stroke-width='4'/>")


def panel_d1040_card4():
    body = []
    top, mid, bot = 170, 450, 730
    # panel A: the divider (D1-040-04 §3)
    body.append(text(300, 80, 'the thermistor divider (D1·030)', 22, MUTED, weight=600))
    body.append(wire([(130, mid - 40), (130, top), (330, top), (330, 215)]))
    body.append(wire([(330, 345), (330, 555)]) + wire([(330, 685), (330, bot), (130, bot), (130, mid + 40)]))
    body.append(source_v(130, mid, INK) + text(78, mid + 8, '3.3 V', 24, INK, 'end', 600))
    body.append(resistor_v(330, 215, 345, INK) + text(368, 288, '10 kΩ', 24, INK, 'start', 600))
    body.append(resistor_v(330, 555, 685, INK, ntc=True) + multiline(368, 620, ['NTC 10 kΩ', 'at 25 °C'], 22, INK, 'start', 600))
    body.append(wire([(330, mid), (500, mid)]) + wire([(330, bot), (500, bot)]) + dot(330, mid) + dot(330, bot))
    body.append(terminal(500, mid) + terminal(500, bot) + ground(230, bot))
    body.append(text(480, mid - 22, 'MID 1.65 V', 24, INK, 'middle', 600))
    # s1: looking back in, between the terminals
    body.append(f"<line x1='630' y1='590' x2='520' y2='590' stroke='{AMBER}' stroke-width='4'/>"
                f"<path d='M510,590 L524,581 L524,599 z' fill='{AMBER}'/>")
    body.append(multiline(595, 645, ['looking back in:', 'a voltage · a resistance'], 18, AMBER, weight=600))
    # panel B: for changes, the supply is a short, the pair in parallel
    body.append(text(820, 80, 'looking back, for changes', 22, MUTED, weight=600))
    t2, b2 = 330, 640
    body.append(wire([(730, t2), (960, t2)]) + wire([(730, b2), (960, b2)]))
    for x, ntc in ((730, False), (870, True)):
        body.append(wire([(x, t2), (x, 420)]) + wire([(x, 550), (x, b2)]) + resistor_v(x, 420, 550, INK, ntc=ntc))
        body.append(dot(x, t2) if x == 870 else '')
    body.append(text(770, 492, '10 kΩ', 20, INK, 'start') + text(910, 492, '10 kΩ', 20, INK, 'start'))
    body.append(terminal(960, t2) + terminal(960, b2))
    body.append(text(845, 700, '10 kΩ ∥ 10 kΩ = 5 kΩ', 28, TEAL, weight=700))
    body.append(text(845, 740, 'an ideal supply is a short for any change', 18, MUTED))
    # panel C: one source behind one resistance, then the load (s4)
    body.append(text(1310, 80, 'one source behind one resistance', 22, MUTED, weight=600))
    sx, rx = 1130, 1330
    body.append(wire([(sx, mid - 40), (sx, top), (rx, top), (rx, 215)], TEAL))
    body.append(wire([(rx, 345), (rx, mid)], TEAL) + wire([(rx, mid), (1470, mid)]) + dot(rx, mid))
    body.append(wire([(sx, mid + 40), (sx, bot), (1470, bot)]) + terminal(1470, mid) + terminal(1470, bot) + ground(1230, bot))
    body.append(source_v(sx, mid, TEAL) + text(sx - 52, mid + 8, '1.65 V', 24, TEAL, 'end', 700))
    body.append(resistor_v(rx, 215, 345, TEAL) + multiline(rx + 38, 280, ['5 kΩ', 'at 25 °C'], 22, TEAL, 'start', 700))
    body.append(wire([(rx, mid), (rx, 555)], AMBER) + resistor_v(rx, 555, 685, AMBER) + wire([(rx, 685), (rx, bot)], AMBER) + dot(rx, bot))
    body.append(multiline(rx + 38, 620, ['R_L', 'whatever you connect'], 20, AMBER, 'start', 600))
    body.append(f"<path d='M1268,215 H1252 V685 H1268' fill='none' stroke='{AMBER}' stroke-width='2'/>")
    body.append(multiline(1330, 805, ['a new divider:', 'the load is its bottom half'], 20, AMBER, 'middle', 600))
    return svg(1600, 860, ''.join(body), 'D1-040 card 4, last step: the thermistor divider, the view looking back, the Thévenin source with its load')


def panel_d1040_card6():
    lx0, lx1 = 2.0, 7.0   # log10 of R_s: 100 Ω to 10 MΩ
    names = {2: '100 Ω', 3: '1 kΩ', 4: '10 kΩ', 5: '100 kΩ', 6: '1 MΩ', 7: '10 MΩ'}
    body, sx, sy = plot_frame(150, 40, 1080, 400, lx0, lx1, 0, 5.2, [2, 3, 4, 5, 6, 7], lambda v: names[int(v)],
                              [0, 1, 2, 3, 4, 5], lambda v: f'{v:g}', 'Source impedance R_s (log axis)', 'Reading V_r (V)')
    vs = 5.0
    # the shaded region: within 1 % for the held R_in = 10 MΩ (R_s < R_in / 100)
    body.append(f"<rect x='{sx(lx0)}' y='40' width='{sx(5.0) - sx(lx0):.1f}' height='400' fill='{TEAL}' fill-opacity='0.08'/>")
    body.append(f"<line x1='{sx(5.0)}' y1='40' x2='{sx(5.0)}' y2='440' stroke='{TEAL}' stroke-width='1.5' stroke-dasharray='6 5'/>")
    body.append(text(sx(5.0) - 10, sy(0.3), 'within 1 % for the 10 MΩ input (R_s < R_in / 100)', 16, TEAL, 'end', 600))
    family = [(1e5, AZURE, '100 kΩ'), (1e6, VIOLET, '1 MΩ'), (1e7, TEAL, '10 MΩ (handheld)'), (1e10, LIME, '10 GΩ (bench)')]
    for rin, col, lab in family:
        pts = []
        for i in range(601):
            lx = lx0 + (lx1 - lx0) * i / 600
            pts.append(f"{sx(lx):.1f},{sy(vs * rin / (rin + 10 ** lx)):.1f}")
        body.append(f"<path d='M{' L'.join(pts)}' fill='none' stroke='{col}' stroke-width='{4 if rin == 1e7 else 3}'/>")
        body.append(text(sx(lx1) + 12, sy(vs * rin / (rin + 1e7)) + 6, 'R_in ' + lab, 18, col, 'start', 600))
    examples = [(1e5, 1e7, 'E1 knee 4.950 V'), (5e5, 1e7, 'E2 card 5, handheld 4.762 V'), (5e5, 1e10, 'E3 card 5, bench 4.9998 V'),
                (1e4, 1e6, 'E4 knee 4.950 V'), (1e3, 1e5, 'E5 knee 4.950 V')]
    for rs, rin, lab in examples:
        v = vs * rin / (rin + rs)
        x, y = sx(math.log10(rs)), sy(v)
        body.append(f"<circle cx='{x:.1f}' cy='{y:.1f}' r='7' fill='{INK}' stroke='{BG}' stroke-width='2'><title>{lab}</title></circle>")
    for lx, lab in ((3.0, 'E5 4.950'), (4.0, 'E4 4.950'), (5.0, 'E1 4.950')):
        body.append(text(sx(lx), sy(5.0) - 16, lab, 16, INK, 'middle', 600))
    body.append(text(sx(math.log10(5e5)) + 12, sy(4.762) + 26, 'E2 4.762 V', 16, INK, 'start', 600)
                + text(sx(math.log10(5e5)) + 40, sy(5.0) - 16, 'E3 4.9998', 16, INK, 'start', 600))
    body.append(f"<circle cx='{sx(7.0):.1f}' cy='{sy(2.5):.1f}' r='6' fill='{TEAL}'/>"
                + text(sx(7.0) - 14, sy(2.5) + 28, '2.500 V at R_s = R_in', 16, MUTED, 'end'))
    body.append(text(150, 528, 'V_r = V_s · R_in / (R_in + R_s),  V_s = 5.000 V;  the knee of each curve at R_s = R_in / 100: 1 % low', 18, MUTED, 'start'))
    return svg(1600, 548, ''.join(body), 'D1-040 card 6, step s5: the family of four input impedances against the source impedance')


# ---------- U015: D1·060 ----------
def panel_d1060_card2():
    y, fy = 400, 560
    body = []
    for j, name in enumerate(STAGE_NAMES):
        x = LEFT_040[j]
        lit = j == 2
        body.append(f"<rect x='{x}' y='{y - 40}' width='{W_040}' height='80' rx='10' fill='{PANEL}' "
                    f"stroke='{TEAL if lit else INK}' stroke-width='{4 if lit else 2.5}'><title>{name}</title></rect>")
        body.append(text(x + W_040 / 2, y + 9, name, 23, INK, weight=600))
        if j < 5:
            body.append(harrow(x + W_040 + 3, LEFT_040[j + 1] - 2, y, INK, 2.5))
    # SOURCE & LOADING as D1·040 left it: a band on the boundary after SENSOR
    body.append(f"<rect x='478' y='{y - 62}' width='194' height='124' rx='14' fill='none' stroke='{MUTED}' "
                f"stroke-width='2' stroke-dasharray='10 7'/>")
    body.append(multiline(575, y + 92, ['SOURCE & LOADING'], 16, MUTED, weight=600))
    body.append(forms_lane(fy, ink=FAINT, weight=1.5))
    top, sl_top = y - 40, y - 62
    pins = [  # x, base, head y, numeral, ink, name, where
        (500, sl_top, y - 150, '1', MUTED, 'Attenuation', 'met · 040'),
        (500, sl_top, y - 250, '2', MUTED, 'Buffering', 'met · 040'),
        (LEFT_040[1] + 22, top, y - 330, '5', AZURE, 'Isolation', 'at the mains · D2·080'),
        (LEFT_040[2] + 50, top, y - 150, '7', TEAL, 'Amplification', 'here · 060'),
        (LEFT_040[3] + 22, top, y - 250, '6', VIOLET, 'Filtering', 'the sampler · D3·020'),
        ((LEFT_040[3] + W_040 + LEFT_040[4]) / 2, y - 3, y - 150, '3', AZURE, 'Level shifting', 'logic families · D2·010'),
        (LEFT_040[4] + 195, top, y - 330, '4', AZURE, 'Linearization', 'firmware · D2·050'),
    ]
    for x, base, head, n, col, l1, l2 in pins:
        body.append(pin(x, base, head, n, col, l1, l2))
        if n == '7':
            body.append(f"<circle cx='{x}' cy='{head}' r='22' fill='none' stroke='{TEAL}' stroke-width='2.5'/>")
    body.append(text(LEFT_040[2] + W_040 / 2, y + 72, 'here: gain', 24, TEAL, weight=700))
    body.append(text(1590, 30, 'grey: met (040) · teal: here · blue: Day 2 · violet: Day 3 · not to scale', 16, MUTED, 'end'))
    return svg(1600, 640, ''.join(body), 'D1-060 card 2, last step: the seven conditioning functions pinned where the course meets them')


def log_path(sx, sy, f, lx0, lx1, n=600, ylo=None, yhi=None):
    pts = []
    for i in range(n + 1):
        lx = lx0 + (lx1 - lx0) * i / n
        ly = math.log10(f(10 ** lx))
        if ylo is not None:
            ly = max(ylo, min(yhi, ly))
        pts.append(f"{sx(lx):.1f},{sy(ly):.1f}")
    return 'M' + ' L'.join(pts)


SUP = {-8: '10 nV', -7: '100 nV', -6: '1 µV', -5: '10 µV', -4: '100 µV', -3: '1 mV', -2: '10 mV', -1: '100 mV', 0: '1 V', 1: '10 V'}


def hline(sx, sy, x0, x1, ly, col):
    return (f"<line x1='{sx(x0):.1f}' y1='{sy(ly):.1f}' x2='{sx(x1):.1f}' y2='{sy(ly):.1f}' stroke='{col}' "
            f"stroke-width='1.5' stroke-dasharray='6 5'/>")


def dot_at(x, y):
    return f"<circle cx='{x:.1f}' cy='{y:.1f}' r='7' fill='{INK}' stroke='{BG}' stroke-width='2'/>"


def panel_d1060_card4():
    body, sx, sy = plot_frame(150, 40, 1060, 420, 2, 6, 0, math.log10(2000), [2, 3, 4, 5, 6],
                              lambda v: ['10²', '10³', '10⁴', '10⁵', '10⁶'][int(v) - 2], [0, 1, 2, 3],
                              lambda v: ['1', '10', '100', '1000'][int(v)], 'Open-loop gain G (log axis)',
                              'Closed-loop gain A_cl (log)')
    for h, col, lab in ((0.1, AZURE, 'H = 0.1 → 10'), (0.01, TEAL, 'H = 0.01 → 100'), (0.001, VIOLET, 'H = 0.001 → 1000')):
        body.append(hline(sx, sy, 2, 6, math.log10(1 / h), col))
        body.append(f"<path d='{log_path(sx, sy, lambda g, h=h: g / (1 + g * h), 2, 6)}' fill='none' stroke='{col}' "
                    f"stroke-width='{4 if h == 0.01 else 3}'/>")
        body.append(text(sx(6) + 12, sy(math.log10(1 / h)) + 6, lab, 18, col, 'start', 600))
    for g, lab in ((1e2, 'E3 50.00'), (1e3, 'E4 90.91'), (1e4, 'E2 99.01 (warm)'), (1e5, 'E1 99.90 (cool)'), (1e6, 'E5 99.99')):
        x, yy = sx(math.log10(g)), sy(math.log10(g / (1 + g * 0.01)))
        body.append(dot_at(x, yy) + text(x, yy + 30, lab, 16, INK, 'middle', 600))
    body.append(text(150, 540, 'A_cl = G / (1 + G·H): each curve leaves G behind and settles on 1/H (dashed). '
                     'E1 → E2: G ÷ 10, A_cl −0.89 %.', 18, MUTED, 'start'))
    return svg(1600, 560, ''.join(body), 'D1-060 card 4, step s4: closed-loop gain against open-loop gain, three feedback fractions')


def panel_d1060_card7():
    body, sx, sy = plot_frame(150, 40, 1060, 420, 40, 120, -8, 0, [40, 60, 80, 100, 120], lambda v: f'{v:g} dB',
                              list(range(-8, 1)), lambda v: SUP[int(v)], 'CMRR (dB)',
                              'Error referred to the input V_e (log)')
    body.append(f"<rect x='{sx(95.56):.1f}' y='{sy(math.log10(0.0002)):.1f}' width='{sx(120) - sx(95.56):.1f}' "
                f"height='{sy(-8) - sy(math.log10(0.0002)):.1f}' fill='{TEAL}' fill-opacity='0.07'/>")
    for v, col, lab in ((0.02, AMBER, 'smaller than the 20 mV signal'), (0.0002, TEAL, 'under 1 % of the 20 mV signal')):
        body.append(hline(sx, sy, 40, 120, math.log10(v), col))
        body.append(text(sx(120) - 8, sy(math.log10(v)) - 8, lab, 16, col, 'end', 600))
    for vcm, col, lab, wdt in ((12, AMBER, 'high side, V_cm 12 V', 4), (0.01, AZURE, 'low side, V_cm 10 mV (proposal F3)', 3)):
        pts = []
        for i in range(401):
            c = 40 + 80 * i / 400
            ly = math.log10(vcm / 10 ** (c / 20))
            if ly < -8:
                break
            pts.append(f"{sx(c):.1f},{sy(ly):.1f}")
        body.append(f"<path d='M{' L'.join(pts)}' fill='none' stroke='{col}' stroke-width='{wdt}'/>")
        if vcm > 1:
            body.append(text(sx(44), sy(math.log10(vcm / 10 ** (44 / 20))) - 16, lab, 17, col, 'start', 600))
        else:
            body.append(text(sx(98), sy(math.log10(vcm / 10 ** (98 / 20))) + 30, lab, 17, col, 'end', 600))
    for vcm, c, lab in ((12, 80, 'E1 1.200 mV · 6.0 %'), (12, 100, 'E2 0.1200 mV · 0.60 %'), (0.01, 80, 'E3 1.000 µV · 0.005 %')):
        x, yy = sx(c), sy(math.log10(vcm / 10 ** (c / 20)))
        right = c != 100
        body.append(dot_at(x, yy) + text(x + 12 if right else x - 12, yy - 12 if right else yy + 28, lab, 16, INK,
                                         'start' if right else 'end', 600))
    body.append(text(150, 540, 'V_e = V_cm / 10^(CMRR/20). The high side crosses the signal at 55.6 dB and 1 % at 95.6 dB; '
                     'the staged fault (34 dB, 0.240 V) is off the left edge.', 18, MUTED, 'start'))
    return svg(1600, 560, ''.join(body), 'D1-060 card 7, step s4: error referred to the input against CMRR, high and low side')


def panel_d1060_card8():
    w, h = 680, 380
    cases = [('s1   G 500, V_os +2.0 mV', 500, 2.0, 'starts at 1.000 V (30.3 %, 1,241 codes) · ceiling at 4.60 mV'),
             ('s3   G 1000, V_os −2.0 mV', 1000, -2.0, 'dead zone below 2.00 mV · ceiling at 5.30 mV')]
    body = []
    for k, (title, g, vos, note) in enumerate(cases):
        x0 = 120 + k * 770
        out, sx, sy = plot_frame(x0, 60, w, h, 0, 7, -0.15, 3.6, list(range(8)), lambda v: f'{v:g}', [0, 1, 2, 3],
                                 lambda v: f'{v:g} V', 'Signal at the in-amp input V_in (mV)',
                                 'At the ADC input (V)' if k == 0 else '')
        body += out
        body.append(text(x0, 44, title, 20, INK, 'start', 700))
        body.append(f"<line x1='{x0}' y1='{sy(3.3):.1f}' x2='{x0 + w}' y2='{sy(3.3):.1f}' stroke='{AMBER}' stroke-width='2'/>")
        body.append(text(x0 + 8, sy(3.3) - 8, 'ADC full scale, 3.3 V', 15, AMBER, 'start', 600))
        body.append(text(x0 + w - 6, sy(0) - 8, '0 V: a single supply cannot go below', 15, MUTED, 'end'))
        ideal = [f"{sx(i * 7 / 700):.1f},{sy(g * (i * 7 / 700) / 1000):.1f}" for i in range(701) if g * (i * 7 / 700) / 1000 <= 3.6]
        body.append(f"<path d='M{' L'.join(ideal)}' fill='none' stroke='{INK}' stroke-width='2.5' stroke-dasharray='9 7'/>")
        real = [f"{sx(i * 7 / 1000):.1f},{sy(max(0, min(3.3, g * (i * 7 / 1000 + vos) / 1000))):.1f}" for i in range(1001)]
        body.append(f"<path d='M{' L'.join(real)}' fill='none' stroke='{TEAL}' stroke-width='4.5'/>")
        body.append(text(x0, 60 + h + 80, note, 17, MUTED, 'start'))
    body.append(text(130, 590, 'teal, heavy: what the ADC sees, clamp(G·(V_in + V_os), 0, 3.3) · dashed: ideal G·V_in, no offset',
                     17, MUTED, 'start'))
    return svg(1600, 610, ''.join(body), 'D1-060 card 8, s1 and s3: the offset lifts the line; a negative one opens a dead zone')


def panel_d1060_card9():
    body, sx, sy = plot_frame(150, 40, 1060, 420, 2, 6, -7, 1, [2, 3, 4, 5, 6],
                              lambda v: ['100 Ω', '1 kΩ', '10 kΩ', '100 kΩ', '1 MΩ'][int(v) - 2], list(range(-7, 2)),
                              lambda v: SUP[int(v)], 'Source resistance R_s (log axis)', 'Error at the output V_o (log)')
    for v, col, lab in ((0.033, TEAL, 'under 1 % of 3.3 V (proposal F4): R_s < 6.6 kΩ'),
                        (3.3, AMBER, '3.3 V rail: above it the real output stops')):
        body.append(hline(sx, sy, 2, 6, math.log10(v), col))
        body.append(text(sx(2) + 8, sy(math.log10(v)) - 8, lab, 16, col, 'start', 600))
    for ib, col, lab, wdt in ((1e-8, AMBER, 'bipolar, I_b 10 nA', 4), (1e-11, AZURE, 'CMOS, I_b 10 pA (proposal F3)', 3)):
        body.append(f"<path d='{log_path(sx, sy, lambda r, ib=ib: 500 * ib * r, 2, 6, ylo=-7, yhi=1)}' fill='none' "
                    f"stroke='{col}' stroke-width='{wdt}'/>")
        body.append(text(sx(6) + 12, sy(min(1, max(-7, math.log10(500 * ib * 1e6)))) + 6, lab, 17, col, 'start', 600))
    for r, lab in ((1e3, 'E1 5.000 mV'), (1e5, 'E2 0.5000 V'), (1e6, 'E3 5.000 V')):
        x, yy = sx(math.log10(r)), sy(math.log10(500 * 1e-8 * r))
        body.append(dot_at(x, yy) + text(x - 12, yy + (28 if r == 1e6 else -12), lab, 16, INK, 'end', 600))
    body.append(text(150, 540, 'V_o = G·I_b·R_s at G = 500. The ramp (s2) runs 1 kΩ → 100 kΩ: 5 mV → 0.5 V with nothing '
                     'changed in the signal.', 18, MUTED, 'start'))
    return svg(1600, 560, ''.join(body), 'D1-060 card 9, step s2: output error against source resistance')


PANELS_U015 = [
    ('d1-060-02-conditioning-pins', panel_d1060_card2, 'D1·060 card 2, last step: the seven conditioning functions pinned where the course meets them, CONDITIONING lit (D1-060-02-what-conditioning-does.md)'),
    ('d1-060-04-closed-loop', panel_d1060_card4, 'D1·060 card 4, step s4: A_cl = G/(1 + G·H) for H = 0.1, 0.01, 0.001; the decade walk E3–E5 on H = 0.01 (D1-060-04-negative-feedback.md)'),
    ('d1-060-07-cmrr', panel_d1060_card7, 'D1·060 card 7, step s4: V_e = V_cm/10^(CMRR/20), high side and low side, with the two boundaries (D1-060-07-cmrr.md)'),
    ('d1-060-08-offset', panel_d1060_card8, 'D1·060 card 8 (the centrepiece), s1 and s3: the offset at gain, and the dead zone (D1-060-08-offset-at-gain.md)'),
    ('d1-060-09-bias', panel_d1060_card9, 'D1·060 card 9, step s2: V_o = G·I_b·R_s against R_s, bipolar and CMOS (D1-060-09-bias-current.md)'),
]

PANELS_U013 = [
    ('d1-040-01-interface', panel_d1040_card1, 'D1·040 card 1, last step: the boundary after SENSOR opened up as SOURCE & LOADING, the interface; the dashed ticks are proposal s2 (D1-040-01-interface.md)'),
    ('d1-040-04-thevenin', panel_d1040_card4, 'D1·040 card 4, last step: the divider (s0–s1), looking back for changes (s2), one source behind one resistance with a load hung beneath (s3–s4) (D1-040-04-thevenin-redraw.md)'),
    ('d1-040-06-family', panel_d1040_card6, 'D1·040 card 6, step s5: V_r against R_s for R_in = 100 kΩ, 1 MΩ, 10 MΩ, 10 GΩ; examples E1–E5; the 1 % region for the held 10 MΩ (D1-040-06-high-in-low-out.md)'),
]

PANELS_U012 = [
    ('d1-030-01-first-arrow', panel_d1030_card1, 'D1·030 card 1, last step: the path focused on QUANTITY → SENSOR, the eye ghosted above (D1-030-01-electricity-only.md)'),
    ('d1-030-02-transducers', panel_d1030_card2, 'D1·030 card 2, last step: input transducer → electronics → output transducer; the transducers straddle the domain boundaries (D1-030-02-transducer-sensor-actuator.md)'),
    ('d1-030-03-thermocouple', panel_d1030_card3, 'D1·030 card 3, step s1: T_hot held at 100 °C, T_cold moved 25 → 35 °C; the output falls 3.08 → 2.67 mV (D1-030-03-not-unit-conversion.md)'),
    ('d1-030-04-pressure-chain-open', panel_d1030_card4_open, 'D1·030 card 4, step s5: the five stages drawn, numbered as the chain under them (D1-030-04-pressure-chain.md)'),
    ('d1-030-04-pressure-chain', panel_d1030_card4, 'D1·030 card 4, step s6: the package drawn round all of it, the stages faded behind its wall'),
    ('d1-030-09-defences', panel_d1030_card9, 'D1·030 card 9, last step: the five defences pinned where the course teaches them, the poll answers dropped on (D1-030-09-five-defences.md)'),
]

PANELS = [
    ('d1-010-04-eye-over-path', panel_card4, 'D1·010 card 4, last step: the eye over the measurement path, bracket for bracket (D1-010-04-three-places.md)'),
    ('d1-010-05-course-path', panel_card5, 'D1·010 card 5, last step: the forms lane, every boundary lit (D1-010-05-measurement-path.md)'),
    ('d1-010-06-converter', panel_card6, 'D1·010 card 6, last step: the whole path with values, the seven things hung (D1-010-06-adc-does-not-know.md)'),
    ('d1-010-07-blank-path', panel_card7_blank, 'D1·010 card 7: every stage blank, the forms lightly under them (D1-010-07-number-not-earned.md)'),
    ('d1-020-07-error-pins', panel_d1020_card7, 'D1·020 card 7, last step: where error comes from, pinned on the named path (D1-020-07-where-error-comes-from.md)'),
    ('d1-020-05-targets', panel_targets, 'D1·020 card 5, the ASK: four targets, eight shots each from seed 20261010 (D1-020-05-accuracy-precision.md §3b)'),
    ('d1-020-05-two-instruments', panel_two_instruments, 'D1·020 card 5, step s1: two meters, one voltage, the truth revealed'),
    ('d1-020-05-06-walk', panel_walk, 'D1·020 cards 5 (s2–s5) and 6: one curve walked through A–D, then parked as a spike'),
    ('d1-020-08-meter-band', panel_meter_band, 'D1·020 card 8, step s4: u = (p·V + n·q) / V for ±(0.5 % + 3 counts) on the 2 V range (D1-020-08-meter-specification.md)'),
    ('d1-020-09-rss', panel_rss, 'D1·020 card 9: worst case against RSS as the four stages are added (D1-020-09-stacking-tolerances.md)'),
]


def main():
    page(PANELS, 'u010-u011-preview.html', 'Bench previews: U010 and U011')
    page(PANELS_U012, 'u012-preview.html', 'Bench previews: U012 (D1·030 Sensing)')
    page(PANELS_U013, 'u013-preview.html', 'Bench previews: U013 (D1·040 The sensor as a source)')
    page(PANELS_U015, 'u015-preview.html', 'Bench previews: U015 (D1·060 Signal conditioning)')
    print('wrote', len(PANELS) + len(PANELS_U012) + len(PANELS_U013) + len(PANELS_U015), 'panels')


def page(panels, filename, title):
    sections = []
    for name, fn, cap in panels:
        s = fn()
        with open(os.path.join(HERE, name + '.svg'), 'w', encoding='utf-8') as f:
            f.write(s)
        sections.append(f"<figure><figcaption>{esc(cap)}</figcaption>{s}</figure>")
    html = f"""<!doctype html><html lang='en'><head><meta charset='utf-8'><meta name='viewport' content='width=device-width,initial-scale=1'>
<title>Bench previews</title><style>
:root{{color-scheme:dark}} body{{margin:0;background:{BG};color:{INK};font-family:'Segoe UI',system-ui,sans-serif;padding:16px}}
h1{{font-size:22px;font-weight:600;margin:4px 0}} p{{color:{MUTED};margin:0 0 18px;max-width:80ch}}
figure{{margin:0 0 28px;background:{PANEL};border:1px solid {FAINT};border-radius:10px;padding:12px}}
figcaption{{font-size:14px;color:{MUTED};margin:0 0 8px}} svg{{width:100%;height:auto;display:block;border-radius:6px}}
</style></head><body><h1>{esc(title)}</h1>
<p>Drawn from the specs' own numbers, on a wall-like dark ground in ExSight's annotation colours. Not the benches'
renderings: a check of layout and values before the libraries are made. Hover a mark for its value.</p>
{''.join(sections)}</body></html>"""
    with open(os.path.join(HERE, filename), 'w', encoding='utf-8') as f:
        f.write(html)


if __name__ == '__main__':
    main()
