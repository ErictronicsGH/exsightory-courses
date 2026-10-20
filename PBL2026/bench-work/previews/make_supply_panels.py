"""The bench supply's two variants, front panels at true size (mm), side by side, for the owner's direction (U040).
Every pointer is computed from the value it shows (270° scales), so the drawing and the numbers agree:
VOLTAGE 5.00 V (capped at 12 V: the amber end-stop mark), CURRENT locked at 0.100 A (LOCK lit), FINE knobs at zero,
output off (SET lit: the displays show the settings). Writes supply-front-panels.svg beside this file."""
import math, os

def pt(cx, cy, r, v, vmax):
    a = math.radians(-135 + 270 * v / vmax)
    return cx + r * math.sin(a), cy - r * math.cos(a)

def knob(cx, cy, r, v, vmax, label, ticks=None, cap=None, scale=True):
    out = []
    if scale:
        rs = r + 3.5
        x0, y0 = pt(cx, cy, rs, 0, 1); x1, y1 = pt(cx, cy, rs, 1, 1)
        out.append(f'<path d="M{x0:.2f} {y0:.2f}A{rs} {rs} 0 1 1 {x1:.2f} {y1:.2f}" fill="none" stroke="#c9d2d7" stroke-width=".35"/>')
        for i in range(11):
            a0 = pt(cx, cy, rs, i, 10); a1 = pt(cx, cy, rs + (1.6 if i % 5 == 0 else 0.9), i, 10)
            out.append(f'<line x1="{a0[0]:.2f}" y1="{a0[1]:.2f}" x2="{a1[0]:.2f}" y2="{a1[1]:.2f}" stroke="#c9d2d7" stroke-width=".3"/>')
        for val, txt in ticks or []:
            tx, ty = pt(cx, cy, rs + 4.2, val, vmax)
            out.append(f'<text x="{tx:.2f}" y="{ty + 0.9:.2f}" font-size="2.3" fill="#c9d2d7" text-anchor="middle">{txt}</text>')
        if cap is not None:
            c0 = pt(cx, cy, rs - 0.6, cap, vmax); c1 = pt(cx, cy, rs + 2.6, cap, vmax)
            out.append(f'<line x1="{c0[0]:.2f}" y1="{c0[1]:.2f}" x2="{c1[0]:.2f}" y2="{c1[1]:.2f}" stroke="#f5b942" stroke-width="1" stroke-linecap="round"/>')
    out.append(f'<circle cx="{cx}" cy="{cy}" r="{r}" fill="url(#knob)" stroke="#0c0e10" stroke-width=".5"/>')
    px, py = pt(cx, cy, r * 0.75, v, vmax)
    out.append(f'<line x1="{cx}" y1="{cy}" x2="{px:.2f}" y2="{py:.2f}" stroke="#e8eef1" stroke-width="{max(.8, r * .09):.2f}" stroke-linecap="round"/>')
    out.append(f'<text x="{cx}" y="{cy + r + 8.2:.2f}" font-size="2.9" font-weight="700" fill="#c9d2d7" text-anchor="middle">{label}</text>')
    return out

def lamp(x, y, colour, on, label):
    fill = colour if on else {'#f5b942': '#4a3a14', '#39d353': '#173a1f', '#ff3b30': '#4a2020'}[colour]
    g = ' filter="url(#glow)"' if on else ''
    return [f'<circle cx="{x}" cy="{y}" r="1.4" fill="{fill}"{g}/>', f'<text x="{x}" y="{y + 5.2}" font-size="2.4" fill="#aeb8be" text-anchor="middle">{label}</text>']

def display(x, y, w, h, text, colour, unit, size):
    return [f'<rect x="{x}" y="{y}" width="{w}" height="{h}" rx="2" fill="#0a0c0d" stroke="#000"/>',
            f'<text x="{x + w - 9}" y="{y + h * 0.74:.2f}" font-family="Consolas, monospace" font-size="{size}" font-weight="700" fill="{colour}" text-anchor="end" filter="url(#glow)">{text}</text>',
            f'<text x="{x + w - 5}" y="{y + h * 0.74:.2f}" font-size="{size * .3:.2f}" font-weight="700" fill="{colour}">{unit}</text>']

def post(x, y, r, colour, rim):
    return [f'<circle cx="{x}" cy="{y}" r="{r}" fill="{colour}" stroke="{rim}" stroke-width=".6"/>', f'<circle cx="{x}" cy="{y}" r="{r * .27:.2f}" fill="#050505"/>']

def panel(ox, oy, W, H, L):
    s = [f'<g transform="translate({ox} {oy})">',
         f'<rect x="-2" y="-2" width="{W + 4}" height="{H + 4}" rx="4" fill="#1b2024"/>',
         f'<rect x="0" y="0" width="{W}" height="{H}" rx="3" fill="url(#panel)" stroke="#4b555c" stroke-width=".5"/>',
         f'<text x="8" y="7" font-size="3.2" font-weight="700" letter-spacing=".25" fill="#c9d2d7">DC POWER SUPPLY</text>',
         f'<text x="{W - 8}" y="7" font-size="2.8" text-anchor="end" fill="#8f9aa1">0–30 V  ·  0–5 A</text>']
    s += display(*L['dispV'], '05.00', '#ff3b30', 'V', L['digit'])
    s += display(*L['dispA'], '0.100', '#3bff6a', 'A', L['digit'])
    y = L['lampY']
    for (x, c, on, t) in L['lamps']:
        s += lamp(x, y, c, on, t)
    for k in L['knobs']:
        s += knob(*k)
    tx, ty = L['ovp']
    s += [f'<circle cx="{tx}" cy="{ty}" r="4" fill="#14181b" stroke="#0a0c0d" stroke-width=".4"/>',
          f'<circle cx="{tx}" cy="{ty}" r="2.7" fill="url(#cap)"/>',
          f'<line x1="{tx - 1.9}" y1="{ty + 1.5}" x2="{tx + 1.9}" y2="{ty - 1.5}" stroke="#20262a" stroke-width=".7"/>',
          f'<text x="{tx}" y="{ty + 9.5}" font-size="2.9" font-weight="700" fill="#c9d2d7" text-anchor="middle">OVP ADJ</text>']
    rx, ry, rw, rh = L['rocker']
    s += [f'<rect x="{rx}" y="{ry}" width="{rw}" height="{rh}" rx="2" fill="#111" stroke="#000"/>',
          f'<rect x="{rx + 2}" y="{ry + 2}" width="{rw - 4}" height="{rh - 4}" rx="1.5" fill="#d9362b" filter="url(#glow)"/>',
          f'<text x="{rx + rw / 2}" y="{ry + rh + 5.5}" font-size="2.9" font-weight="700" fill="#c9d2d7" text-anchor="middle">POWER</text>']
    kx, ky, kw, kh = L['key']
    s += [f'<rect x="{kx}" y="{ky}" width="{kw}" height="{kh}" rx="2" fill="#20262a" stroke="#0c0e10"/>',
          f'<circle cx="{kx + kw - 3.5}" cy="{ky + 3}" r="1.1" fill="#173a1f"/>',
          f'<text x="{kx + kw / 2}" y="{ry + rh + 5.5}" font-size="2.9" font-weight="700" fill="#c9d2d7" text-anchor="middle">OUTPUT</text>']
    (p1, p2, p3), py, pr = L['posts']
    s += post(p1, py, pr, '#c62828', '#6b0f0f') + post(p2, py, pr, '#2e7d32', '#123d16') + post(p3, py, pr, '#1a1a1a', '#000')
    s += [f'<text x="{p1}" y="{py - pr - 2.5}" font-size="4" font-weight="700" fill="#e8eef1" text-anchor="middle">+</text>',
          f'<text x="{p2}" y="{py - pr - 2.5}" font-size="3" font-weight="700" fill="#e8eef1" text-anchor="middle">GND</text>',
          f'<text x="{p3}" y="{py - pr - 2.5}" font-size="4" font-weight="700" fill="#e8eef1" text-anchor="middle">−</text>']
    # dimensions
    s += [f'<g stroke="#7d8a93" stroke-width=".25" fill="#5d6b77" font-size="3">',
          f'<line x1="0" y1="{H + 7}" x2="{W}" y2="{H + 7}"/><line x1="0" y1="{H + 4}" x2="0" y2="{H + 10}"/><line x1="{W}" y1="{H + 4}" x2="{W}" y2="{H + 10}"/>',
          f'<text x="{W / 2}" y="{H + 13}" text-anchor="middle" stroke="none">{W}</text>',
          f'<line x1="{W + 7}" y1="0" x2="{W + 7}" y2="{H}"/><line x1="{W + 4}" y1="0" x2="{W + 10}" y2="0"/><line x1="{W + 4}" y1="{H}" x2="{W + 10}" y2="{H}"/>',
          f'<text x="{W + 9}" y="{H / 2}" stroke="none">{H}</text></g>',
          f'<text x="0" y="{H + 21}" font-size="3.6" font-weight="700" fill="#1d2730">{L["title"]}</text>',
          f'<text x="0" y="{H + 26}" font-size="2.9" fill="#3d4a55">{L["sub"]}</text>', '</g>']
    return s

V_TICKS = [(0, '0'), (15, '15'), (30, '30')]
I_TICKS = [(0, '0'), (2.5, '2.5'), (5, '5')]
compact = dict(
    title='Compact (fine tuners off, the default)', sub='160 × 120 × 250 mm · 4.2 kg · one knob each', digit=12.5,
    dispV=(8, 11, 68, 24), dispA=(84, 11, 68, 24), lampY=41,
    lamps=[(16, '#f5b942', True, 'SET'), (66, '#39d353', False, 'C.V.'), (94, '#ff3b30', False, 'C.C.'), (124, '#f5b942', False, 'OVP'), (144, '#f5b942', True, 'LOCK')],
    knobs=[(34, 65, 10, 5, 30, 'VOLTAGE', V_TICKS, 12), (86, 65, 10, 0.1, 5, 'CURRENT', I_TICKS)],
    ovp=(132, 63), rocker=(8, 95, 22, 14), key=(38, 97, 18, 10), posts=((98, 120, 142), 102, 6.5),
)
fine = dict(
    title='With fine tuners', sub='200 × 145 × 290 mm · 5.5 kg · coarse and fine on VOLTAGE and CURRENT', digit=17,
    dispV=(10, 12, 82, 32), dispA=(108, 12, 82, 32), lampY=51,
    lamps=[(20, '#f5b942', True, 'SET'), (80, '#39d353', False, 'C.V.'), (120, '#ff3b30', False, 'C.C.'), (160, '#f5b942', False, 'OVP'), (180, '#f5b942', True, 'LOCK')],
    knobs=[(30, 82, 11, 5, 30, 'VOLTAGE', V_TICKS, 12), (60, 84, 7, 0, 1, 'FINE', None, None, False),
           (104, 82, 11, 0.1, 5, 'CURRENT', I_TICKS), (134, 84, 7, 0, 0.2, 'FINE', None, None, False)],
    ovp=(170, 80), rocker=(10, 114, 24, 16), key=(46, 116, 22, 12), posts=((125, 150, 175), 122, 7.5),
)
W = 420
svg = ['<svg xmlns="http://www.w3.org/2000/svg" viewBox="-10 -18 430 215" width="1720" height="860" font-family="IBM Plex Sans, Segoe UI, sans-serif">',
       '<defs><linearGradient id="panel" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#3a434a"/><stop offset="1" stop-color="#2a3137"/></linearGradient>'
       '<radialGradient id="knob" cx=".4" cy=".35" r=".75"><stop offset="0" stop-color="#5b646b"/><stop offset=".7" stop-color="#22282c"/><stop offset="1" stop-color="#121517"/></radialGradient>'
       '<radialGradient id="cap" cx=".4" cy=".35" r=".7"><stop offset="0" stop-color="#9aa3a9"/><stop offset="1" stop-color="#4b5359"/></radialGradient>'
       '<filter id="glow" x="-50%" y="-50%" width="200%" height="200%"><feGaussianBlur stdDeviation=".6" result="b"/><feMerge><feMergeNode in="b"/><feMergeNode in="SourceGraphic"/></feMerge></filter></defs>',
       '<rect x="-10" y="-18" width="430" height="215" fill="#f4f6f7"/>',
       '<text x="-4" y="-9" font-size="4.4" font-weight="700" fill="#1d2730">The bench supply, two variants, front panels at true size (mm): the activity chooses</text>',
       '<text x="-4" y="-4" font-size="3" fill="#3d4a55">Both shown as an activity sets them: VOLTAGE at 5.00 V, capped at 12 V (amber end-stop mark); CURRENT locked at 0.100 A (LOCK lit); output off (SET lit). FINE knobs at zero.</text>']
svg += panel(0, 26, 160, 120, compact)
svg += panel(196, 0, 200, 145, fine)
svg.append('</svg>')
out = os.path.join(os.path.dirname(os.path.abspath(__file__)), 'supply-front-panels.svg')
open(out, 'w', encoding='utf-8', newline='\n').write('\n'.join(svg) + '\n')
print('wrote', out)
