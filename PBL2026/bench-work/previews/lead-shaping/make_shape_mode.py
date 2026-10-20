"""Layout still of the bench's Shape mode (leads, wires, cables bent in 3D), for the owner's direction (2026-10-12).
Drawn from real geometry, projected: the LDR market version exsight.ldr.5mm-5528 (Φ5.1, flats 4.3, 2.1 thick, leads
Ø0.5 leaving the body 3.0 apart, formed to the front with a 3 mm stand-off, tips 2.54 apart, the body at 26.815 mm), a
breadboard whose holes line up with lead a's tip, and lead b grabbed 12 mm above the board and bent 45° forward in its
working plane. Rule numbers: bench-work/components/conductors/classes.json (research 12).
    python make_shape_mode.py  → shape-mode.svg (rasterise with .claude/tools/shoot-svg.js, absolute paths)"""
import math, os

W, H, PANEL_X, FOOT = 1920, 1080, 1400, 1024
AZ, EL, S = math.radians(-36), math.radians(26), 21.5
OX, OY = 690, 868
def P(x, y, z):
    sx = x * math.cos(AZ) - y * math.sin(AZ)
    dp = x * math.sin(AZ) + y * math.cos(AZ)
    return (OX + sx * S, OY - (z * math.cos(EL) + dp * math.sin(EL)) * S)
def depth(x, y, z): return -(x * math.sin(AZ) + y * math.cos(AZ))
def pts(seq): return ' '.join(f'{a:.1f},{b:.1f}' for a, b in seq)
def at(k): return ' '.join(f'{a.replace("_", "-")}="{v}"' for a, v in k.items())
def line(a, b, **k): (x1, y1), (x2, y2) = P(*a), P(*b); return f'<line x1="{x1:.1f}" y1="{y1:.1f}" x2="{x2:.1f}" y2="{y2:.1f}" {at(k)}/>'
def poly3(seq, **k): return f'<polyline points="{pts([P(*q) for q in seq])}" fill="none" {at(k)}/>'
def txt(x, y, s, size=13, fill='#c9d6d1', anchor='start', weight=500):
    return f'<text x="{x:.1f}" y="{y:.1f}" font-size="{size}" fill="{fill}" text-anchor="{anchor}" font-weight="{weight}">{s}</text>'
def callout(anchor3, x, y, s, col, size=12.5, anchor='start'):
    ax, ay = P(*anchor3)
    w = len(s) * size * 0.53 + 16
    bx = x if anchor == 'start' else x - w
    return (f'<line x1="{ax:.1f}" y1="{ay:.1f}" x2="{(bx if anchor == "start" else bx + w):.1f}" y2="{y:.1f}" stroke="{col}" stroke-opacity=".7" stroke-width="1.2"/>'
            f'<circle cx="{ax:.1f}" cy="{ay:.1f}" r="2.6" fill="{col}"/>'
            f'<rect x="{bx:.1f}" y="{y - 13:.1f}" width="{w:.1f}" height="24" rx="6" fill="#0d1312" stroke="{col}" stroke-opacity=".55"/>'
            + txt(bx + 8, y + 4, s, size, col, 'start', 600))

TEAL, AMBER, RED, INK, DIM, TEXT = '#2dd4bf', '#f5b84a', '#f07a6e', '#7f918b', '#4f605a', '#e8f0ed'
o = []
o.append(f'<svg xmlns="http://www.w3.org/2000/svg" width="{W}" height="{H}" viewBox="0 0 {W} {H}" font-family="IBM Plex Sans, Segoe UI, sans-serif">')
o.append('''<defs><radialGradient id="bg" cx="42%" cy="58%" r="70%"><stop offset="0" stop-color="#18211f"/><stop offset="1" stop-color="#0a0e0d"/></radialGradient>
<filter id="glow" x="-50%" y="-50%" width="200%" height="200%"><feGaussianBlur stdDeviation="3.2"/></filter></defs>''')
o.append(f'<rect width="{W}" height="{H}" fill="url(#bg)"/>')
o.append(f'<rect width="{W}" height="54" fill="#0e1413"/><line x1="0" y1="54" x2="{W}" y2="54" stroke="#1f2a27"/>')
o.append(txt(24, 34, 'ExSight Studio', 18, TEAL, weight=700) + txt(170, 34, 'Breadboard Bench  ›  Authoring', 14, INK))
o.append(f'<rect x="740" y="12" width="440" height="30" rx="15" fill="rgb(245 184 74 / 14%)" stroke="{AMBER}" stroke-opacity=".6"/>')
o.append(txt(960, 32, 'Shape mode · LDR1 · lead b · Authoring and Edit', 13.5, AMBER, 'middle', 600))

# ---- geometry (mm) ----
d, r_disc, flat, thick, ST = 0.5, 5.1 / 2, 4.3, 2.1, 3.0
diag = math.hypot(5.08, 0.23)
zB = round(31.9 - diag, 3)                       # 26.815: the body's underside (wire length kept)
zb = zB - ST                                      # the formed run's height
tipA = (-1.27, -5.08, 0.0)
bend = (1.27, -5.08, 12.0)
ang, Lr = math.radians(45), 12.0
tipB = (1.27, -5.08 - Lr * math.sin(ang), 12.0 - Lr * math.cos(ang))
legA = [(-1.5, 0, zB), (-1.5, 0, zb), (-1.27, -5.08, zb), tipA]
legB_fixed = [(1.5, 0, zB), (1.5, 0, zb), (1.27, -5.08, zb), bend]
holes = [(tipA[0] + i * 2.54, tipA[1] + j * 2.54) for i in range(-3, 5) for j in range(-5, 3)]
bx = (min(h[0] for h in holes) - 1.7, max(h[0] for h in holes) + 1.7)
by = (min(h[1] for h in holes) - 1.7, max(h[1] for h in holes) + 1.7)

# 1 the board
o.append(f'<polygon points="{pts([P(bx[0], by[0], 0), P(bx[1], by[0], 0), P(bx[1], by[0], -3), P(bx[0], by[0], -3)])}" fill="#bdb8ad"/>')
o.append(f'<polygon points="{pts([P(bx[0], by[0], 0), P(bx[0], by[1], 0), P(bx[0], by[1], -3), P(bx[0], by[0], -3)])}" fill="#a39e93"/>')
o.append(f'<polygon points="{pts([P(bx[0], by[0], 0), P(bx[1], by[0], 0), P(bx[1], by[1], 0), P(bx[0], by[1], 0)])}" fill="#e9e5dc"/>')
for hx, hy in holes:
    o.append(f'<polygon points="{pts([P(hx - .5, hy - .5, 0), P(hx + .5, hy - .5, 0), P(hx + .5, hy + .5, 0), P(hx - .5, hy + .5, 0)])}" fill="#3a3e41"/>')
# the 2.54 mm grid lines through the holes, faint (the floor of the cage)
for i in range(-3, 5): o.append(line((tipA[0] + i * 2.54, by[0], 0.01), (tipA[0] + i * 2.54, by[1], 0.01), stroke=TEAL, stroke_opacity='.16'))
for j in range(-5, 3): o.append(line((bx[0], tipA[1] + j * 2.54, 0.01), (bx[1], tipA[1] + j * 2.54, 0.01), stroke=TEAL, stroke_opacity='.16'))

# 2 the cage (back edges first, dashed), origin midway between the leads' exits
cx, cy, cz = (-7.62, 7.62), (-17.78, 5.08), (0, 30.48)
for a, b in [((cx[0], cy[1], 0), (cx[0], cy[1], cz[1])), ((cx[0], cy[1], cz[1]), (cx[1], cy[1], cz[1])), ((cx[0], cy[0], cz[1]), (cx[0], cy[1], cz[1])), ((cx[1], cy[1], 0), (cx[1], cy[1], cz[1]))]:
    o.append(line(a, b, stroke=TEAL, stroke_opacity='.3', stroke_width='1', stroke_dasharray='5 5'))
def ticks(a, ax, n, dirv, sgn=1):
    for k in range(n + 1):
        p = list(a); p[ax] += sgn * k
        q = [p[i] + dirv[i] * (0.9 if k % 5 == 0 else 0.45) for i in range(3)]
        o.append(line(tuple(p), tuple(q), stroke=TEAL, stroke_opacity='.8' if k % 5 == 0 else '.4', stroke_width='1'))
o.append(line((cx[0], cy[0], 0), (cx[1], cy[0], 0), stroke=TEAL, stroke_opacity='.55', stroke_width='1.3'))
o.append(line((cx[0], cy[0], 0), (cx[0], cy[1], 0), stroke=TEAL, stroke_opacity='.55', stroke_width='1.3'))
o.append(line((cx[0], cy[0], 0), (cx[0], cy[0], cz[1]), stroke=TEAL, stroke_opacity='.55', stroke_width='1.3'))
ticks((cx[0], cy[0], 0), 0, 15, (0, -1, 0)); ticks((cx[0], cy[0], 0), 1, 22, (-1, 0, 0)); ticks((cx[0], cy[0], 0), 2, 30, (-1, 0, 0))
for k in (-5, 0, 5):
    x_, y_ = P(k, cy[0] - 1.6, 0); o.append(txt(x_, y_ + 14, f'{k}', 12, TEAL, 'middle', 600))
for k in (-15, -10, -5, 0, 5):
    x_, y_ = P(cx[0] - 1.6, k, 0); o.append(txt(x_ - 4, y_ + 5, f'{k}', 12, TEAL, 'end', 600))
for k in range(0, 31, 5):
    x_, y_ = P(cx[0] - 1.4, cy[0], k); o.append(txt(x_ - 4, y_ + 4, f'{k}', 12, TEAL, 'end', 600))
x_, y_ = P(cx[1] + 1, cy[0] - 1.6, 0); o.append(txt(x_ + 6, y_ + 14, 'x mm', 12, INK))
x_, y_ = P(cx[0] - 1.6, cy[0] - 1, 0); o.append(txt(x_ - 4, y_ + 22, 'y mm', 12, INK, 'end'))
x_, y_ = P(cx[0] - 1.4, cy[0], cz[1] + 1.3); o.append(txt(x_ - 4, y_, 'z mm', 12, INK, 'end'))

# 3 the working plane through the bend (x = 1.27, the Y–Z plane), its 1 mm grid, 5 mm brighter
gy, gz = (-17, -1), (1, 17)
o.append(f'<polygon points="{pts([P(1.27, gy[0], gz[0]), P(1.27, gy[1], gz[0]), P(1.27, gy[1], gz[1]), P(1.27, gy[0], gz[1])])}" fill="{AMBER}" fill-opacity=".06" stroke="{AMBER}" stroke-opacity=".45"/>')
for yy in range(gy[0], gy[1] + 1): o.append(line((1.27, yy, gz[0]), (1.27, yy, gz[1]), stroke=AMBER, stroke_opacity='.42' if (yy - int(bend[1])) % 5 == 0 else '.16', stroke_width='.8'))
for zz in range(gz[0], gz[1] + 1): o.append(line((1.27, gy[0], zz), (1.27, gy[1], zz), stroke=AMBER, stroke_opacity='.42' if (zz - 12) % 5 == 0 else '.16', stroke_width='.8'))

# 4 lead a (bare) with its clearance halo (KiCad style), lead b up to the bend, the ghost of b's old run
def wire(seq, core='#e2e6e9', edge='#666c71', w=d):
    return poly3(seq, stroke=edge, stroke_width=f'{w * S + 2.5:.1f}', stroke_linejoin='round', stroke_linecap='round') + poly3(seq, stroke=core, stroke_width=f'{w * S - 2.5:.1f}', stroke_linejoin='round', stroke_linecap='round')
o.append(poly3(legA, stroke=TEAL, stroke_opacity='.13', stroke_width=f'{(d + 2 * 0.2) * S + 6:.1f}', stroke_linejoin='round', stroke_linecap='round'))
o.append(wire(legA))
o.append(poly3([bend, (1.27, -5.08, 0)], stroke='#e2e6e9', stroke_opacity='.3', stroke_width=f'{d * S:.1f}', stroke_dasharray='7 7', stroke_linecap='round'))
o.append(wire(legB_fixed))

# 5 the snap rays every 15° from straight on (down) toward the front, in the plane; the chosen one lit; the protractor
for k in range(7):
    a = math.radians(15 * k); e = (1.27, bend[1] - 10.5 * math.sin(a), bend[2] - 10.5 * math.cos(a)); on = k == 3
    o.append(line(bend, e, stroke=AMBER, stroke_opacity='1' if on else '.4', stroke_width='1.6' if on else '1', stroke_dasharray='' if on else '3 5'))
    lx, ly = P(1.27, bend[1] - 11.8 * math.sin(a), bend[2] - 11.8 * math.cos(a))
    if k in (0, 3, 6): o.append(txt(lx, ly + 4, f'{15 * k}°', 12.5, AMBER if on else '#c9a25a', 'middle', 700 if on else 600))
arc = [P(1.27, bend[1] - 4.6 * math.sin(math.radians(t)), bend[2] - 4.6 * math.cos(math.radians(t))) for t in range(0, 46, 3)]
o.append(f'<polyline points="{pts(arc)}" fill="none" stroke="{AMBER}" stroke-width="3"/>')

# 6 lead b's bent run (the active one), its glow, the handles
seg = [bend, tipB]
o.append(poly3(seg, stroke=AMBER, stroke_opacity='.4', stroke_width=f'{d * S + 12:.1f}', stroke_linecap='round', filter='url(#glow)'))
o.append(wire(seg, core='#fff3da', edge='#7a6a4a'))
for q, rr in [(bend, 9), (tipB, 10)]:
    x_, y_ = P(*q); o.append(f'<circle cx="{x_:.1f}" cy="{y_:.1f}" r="{rr}" fill="#0b0f0e" stroke="{AMBER}" stroke-width="2.4"/><circle cx="{x_:.1f}" cy="{y_:.1f}" r="3.2" fill="{AMBER}"/>')

# 7 the drop line from the tip to the board, its shadow; the nearest hole lit
tx, ty = P(*tipB); fx, fy = P(tipB[0], tipB[1], 0)
o.append(f'<line x1="{tx:.1f}" y1="{ty:.1f}" x2="{fx:.1f}" y2="{fy:.1f}" stroke="{AMBER}" stroke-dasharray="3 4" stroke-width="1.4"/><ellipse cx="{fx:.1f}" cy="{fy:.1f}" rx="7" ry="3.2" fill="{AMBER}" fill-opacity=".55"/>')
hole = (1.27, -12.7)
hx, hy = P(hole[0], hole[1], 0)
o.append(f'<ellipse cx="{hx:.1f}" cy="{hy:.1f}" rx="19" ry="9" fill="none" stroke="{TEAL}" stroke-width="2.4" filter="url(#glow)"/><ellipse cx="{hx:.1f}" cy="{hy:.1f}" rx="19" ry="9" fill="none" stroke="{TEAL}" stroke-width="1.8"/>')

# 8 the body (in front of everything above it): a disc with flats on Y, the CdS track along the leads
def outline(z):
    h = flat / 2; a = math.asin(h / r_disc); seq = []
    for t in [(-a + 2 * a * i / 14) for i in range(15)]: seq.append((r_disc * math.cos(t), r_disc * math.sin(t), z))
    for t in [(math.pi - a + 2 * a * i / 14) for i in range(15)]: seq.append((r_disc * math.cos(t), r_disc * math.sin(t), z))
    return seq
lo, hi = outline(zB), outline(zB + thick)
o.append(f'<polygon points="{pts([P(*q) for q in lo])}" fill="#c9c4ba"/>')
quads = sorted([(depth(*lo[i]), [P(*lo[i]), P(*lo[(i + 1) % len(lo)]), P(*hi[(i + 1) % len(lo)]), P(*hi[i])]) for i in range(len(lo))], key=lambda t: -t[0])
for _, q in quads: o.append(f'<polygon points="{pts(q)}" fill="#ece8de" stroke="#ddd8cd" stroke-width=".6"/>')
o.append(f'<polygon points="{pts([P(*q) for q in hi])}" fill="#d2d5d9" stroke="#f4f0e7" stroke-width="6"/>')
zt = zB + thick + .01; n = 8; step = flat * .82 / n
for k in range(n):
    yy = -flat * .41 + (k + .5) * step
    o.append(line((-1.76, yy, zt), (1.76, yy, zt), stroke='#b5452a', stroke_width='4.6'))
    if k < n - 1:
        xs = 1.76 if k % 2 == 0 else -1.76
        o.append(line((xs, yy, zt), (xs, yy + step, zt), stroke='#b5452a', stroke_width='4.6'))
# the no-bend zone: the first 3 mm of each lead under the body
for x0 in (-1.5, 1.5): o.append(line((x0, 0, zB), (x0, 0, zB - ST), stroke=RED, stroke_width=f'{d * S + 6:.1f}', stroke_opacity='.5'))
# the cage's origin and its axes
ox_, oy_ = P(0, 0, zB)
for v, col in [((3.2, 0, 0), '#ef5350'), ((0, 3.2, 0), '#66bb6a'), ((0, 0, 3.2), '#42a5f5')]:
    ex, ey = P(v[0], v[1], zB + v[2]); o.append(f'<line x1="{ox_:.1f}" y1="{oy_:.1f}" x2="{ex:.1f}" y2="{ey:.1f}" stroke="{col}" stroke-width="2.4"/>')
o.append(f'<circle cx="{ox_:.1f}" cy="{oy_:.1f}" r="4.5" fill="{TEXT}" stroke="#0b0f0e" stroke-width="1.5"/>')

# 9 callouts, in the empty space beside the scene
tgx, tgy = P(1.27, bend[1] - 6.2 * math.sin(math.radians(22)), bend[2] - 6.2 * math.cos(math.radians(22)))
o.append(f'<line x1="{tgx - 62:.1f}" y1="{tgy:.1f}" x2="{tgx - 8:.1f}" y2="{tgy:.1f}" stroke="{AMBER}" stroke-width="1.2"/>')
o.append(f'<rect x="{tgx - 112:.1f}" y="{tgy - 14:.1f}" width="50" height="24" rx="6" fill="#1b1407" stroke="{AMBER}"/>' + txt(tgx - 87, tgy + 3, '45°', 14, AMBER, 'middle', 700))
o.append(callout((0, 0, zB), 250, 330, 'grid origin: midway between the leads', TEXT))
o.append(callout((1.5, 0, zB - 1.5), 1000, 352, 'no bend within 3 mm of the body (photocell: analog rule)', RED))
o.append(callout((1.27, -5.08 - 2.3 * math.sin(math.radians(22)), 12 - 2.3 * math.cos(math.radians(22))), 1010, 560, 'bend 3: 45° (15° steps · Shift 1°)', AMBER))
o.append(callout(tuple((bend[i] + tipB[i]) / 2 for i in range(3)), 1010, 610, 'run 12.00 mm, rigid: the length never changes', AMBER))
o.append(callout((1.27, -9.5, 6.7), 1010, 660, 'working plane Y–Z through the bend · Tab: next plane', AMBER))
o.append(callout(tipB, 1010, 760, f'tip {tipB[2]:.2f} mm above the board', AMBER))
o.append(callout((hole[0], hole[1], 0), 1010, 850, 'nearest hole: release to insert', TEAL))
o.append(callout((-1.27, -5.08, 17), 250, 600, 'lead a: clearance 0.2 mm (design rule)', TEAL))

# 10 inset: the same core for wires and cables
ix, iy, iw, ih = 28, 74, 520, 196
o.append(f'<rect x="{ix}" y="{iy}" width="{iw}" height="{ih}" rx="12" fill="#0f1514" stroke="#24302d"/>')
o.append(txt(ix + 18, iy + 28, 'The same core for wires and cables', 14, TEXT, weight=700))
jy = iy + 150
o.append(f'<rect x="{ix + 18}" y="{jy}" width="220" height="28" rx="3" fill="#e7e3da"/>')
for k in range(8): o.append(f'<rect x="{ix + 30 + k * 26}" y="{jy + 11}" width="7" height="7" fill="#3a3e41"/>')
jp = f'M {ix + 59} {jy + 14} L {ix + 59} {jy - 40} Q {ix + 59} {jy - 50} {ix + 69} {jy - 50} L {ix + 151} {jy - 50} Q {ix + 161} {jy - 50} {ix + 161} {jy - 40} L {ix + 161} {jy + 14}'
o.append(f'<path d="{jp}" fill="none" stroke="#b5372b" stroke-width="9" stroke-linecap="round"/><path d="{jp}" fill="none" stroke="#e8705f" stroke-width="3" stroke-opacity=".7" stroke-linecap="round"/>')
o.append(txt(ix + 128, iy + 56, 'jumper 22 AWG solid · bends hold', 12, TEXT, 'middle', 600))
o.append(txt(ix + 128, iy + 74, 'Ø0.644 · insulated 1.45 · radius ≥ 2d', 11.5, INK, 'middle'))
wx0, wy0, wx1, wy1, sag = ix + 300, iy + 92, ix + 496, iy + 112, 58
cat = []
for k in range(41):
    t = k / 40; x = wx0 + (wx1 - wx0) * t; y = wy0 + (wy1 - wy0) * t + sag * (math.cosh(2 * t - 1) - math.cosh(1)) / (1 - math.cosh(1)); cat.append((x, y))
o.append(f'<polyline points="{pts(cat)}" fill="none" stroke="#1d1f22" stroke-width="12" stroke-linecap="round"/><polyline points="{pts(cat)}" fill="none" stroke="#c0392b" stroke-width="8" stroke-linecap="round"/>')
for px_, py_ in [(wx0, wy0), (wx1, wy1)]: o.append(f'<circle cx="{px_}" cy="{py_}" r="8" fill="#0b0f0e" stroke="{TEAL}" stroke-width="2.2"/><circle cx="{px_}" cy="{py_}" r="2.8" fill="{TEAL}"/>')
o.append(txt((wx0 + wx1) / 2, iy + 56, 'test lead 1 mm² · hangs between waypoints', 12, TEXT, 'middle', 600))
o.append(txt((wx0 + wx1) / 2, iy + 74, 'Ø3.0 · 16 g/m · radius ≥ 3 × Ø', 11.5, INK, 'middle'))

# 11 the pane
o.append(f'<rect x="{PANEL_X}" y="54" width="{W - PANEL_X}" height="{H - 54}" fill="#0e1413"/><line x1="{PANEL_X}" y1="54" x2="{PANEL_X}" y2="{H}" stroke="#1f2a27"/>')
X, y = PANEL_X + 28, 96
o.append(txt(X, y, 'Shape', 18, TEXT, weight=700) + txt(X + 70, y, 'LDR1 · lead b', 14, INK)); y += 34
for i, (lab, on) in enumerate([('Lead a', False), ('Lead b', True)]):
    o.append(f'<rect x="{X + i * 120}" y="{y - 20}" width="112" height="30" rx="7" fill="{"rgb(45 212 191 / 15%)" if on else "#151d1b"}" stroke="{TEAL if on else "#2a3633"}"/>' + txt(X + i * 120 + 56, y, lab, 13, TEAL if on else INK, 'middle', 600))
y += 42
def sec(t):
    global y
    o.append(txt(X, y, t.upper(), 11.5, INK, weight=700)); y += 10
    o.append(f'<line x1="{X}" y1="{y}" x2="{W - 28}" y2="{y}" stroke="#1f2a27"/>'); y += 24
def row(k, v, note=''):
    global y
    o.append(txt(X, y, k, 13, INK) + txt(X + 168, y, v, 13, TEXT, weight=600))
    if note: o.append(txt(W - 28, y, note, 11, DIM, 'end'))
    y += 26
sec('Conductor class (like a KiCad net class)')
row('Class', 'Photocell lead · bare')
row('Width', 'Ø 0.50 mm', 'datasheet')
row('Clearance', '0.2 mm to bare metal', 'design rule')
row('Bend radius', '≥ 0.50 mm (1 × d)', 'ECSS §8.2.7b')
row('First bend', '≥ 3 mm from the body', 'analog rule')
row('Re-bending', 'warned after 3', 'ECSS §8.2.7j')
row('Angle step', '15° · Shift 1° · Alt free')
y += 4
sec('Bends of lead b')
o.append(txt(X, y, '#', 12, DIM) + txt(X + 30, y, 'from body', 12, DIM) + txt(X + 140, y, 'angle', 12, DIM) + txt(X + 215, y, 'toward', 12, DIM) + txt(X + 318, y, 'run after', 12, DIM)); y += 24
b2 = ST + diag; b3 = b2 + (zb - 12)
for nb, f_, a_, t_, r_, on in [('1', f'{ST:.2f} mm', '90°', 'front', f'{diag:.2f} mm', False), ('2', f'{b2:.2f} mm', '90°', 'down', f'{zb - 12:.2f} mm', False), ('3', f'{b3:.2f} mm', '45°', 'front', '12.00 mm', True)]:
    if on: o.append(f'<rect x="{X - 10}" y="{y - 18}" width="{W - 28 - X + 10}" height="26" rx="6" fill="rgb(245 184 74 / 12%)" stroke="{AMBER}" stroke-opacity=".5"/>')
    c = AMBER if on else TEXT
    o.append(txt(X, y, nb, 13, c, weight=600) + txt(X + 30, y, f_, 13, c) + txt(X + 140, y, a_, 13, c, weight=700 if on else 500) + txt(X + 215, y, t_, 13, c) + txt(X + 318, y, r_, 13, c)); y += 28
o.append(txt(X, y, 'Length 31.90 mm, kept: bending never stretches the wire', 12, INK)); y += 32
sec('Shape presets')
xc = X
for lab, on in [('Straight', False), ('Front', True), ('Splay', False), ('Kink', False), ('Hairpin', False), ('Cut to length…', False)]:
    w = 18 + len(lab) * 7.4
    if xc + w > W - 28: xc, y = X, y + 36
    o.append(f'<rect x="{xc}" y="{y - 19}" width="{w:.0f}" height="28" rx="14" fill="{"rgb(45 212 191 / 15%)" if on else "#151d1b"}" stroke="{TEAL if on else "#2a3633"}"/>' + txt(xc + w / 2, y, lab, 12.5, TEAL if on else TEXT, 'middle', 600)); xc += w + 8
y += 40
sec('Rule check (like KiCad’s DRC)')
for ok_, m in [(True, 'bends ≥ 0.50 mm; the first 3 mm out'), (True, 'clear of lead a by 3.8 mm (rule 0.2 mm)'), (True, 'length kept: 31.90 mm'), (True, 'conductor 0.50 mm fits a breadboard (0.4–0.7)'), (False, 'the tip is 3.51 mm above the board')]:
    o.append(txt(X, y, '✓' if ok_ else '!', 14, TEAL if ok_ else AMBER, weight=700) + txt(X + 24, y, m, 12.5, TEXT if ok_ else AMBER)); y += 26
y += 10
sec('Router (like KiCad’s)')
xs = X
for lab, on, soon in [('Highlight collisions', True, False), ('Walk around', False, True), ('Shove', False, True)]:
    w = 22 + len(lab) * 7.3
    dash = 'stroke-dasharray="3 3"' if soon else ''
    o.append(f'<rect x="{xs}" y="{y - 19}" width="{w:.0f}" height="28" rx="7" fill="{"rgb(45 212 191 / 15%)" if on else "#151d1b"}" stroke="{TEAL if on else "#2a3633"}" {dash}/>' + txt(xs + w / 2, y, lab, 12.5, TEAL if on else INK, 'middle', 600)); xs += w + 8
y += 28
o.append(txt(X, y, 'Walk around and Shove come with wire harnesses', 11.5, DIM))

# 12 the key hints, on their own bar
o.append(f'<rect x="0" y="{FOOT}" width="{PANEL_X}" height="{H - FOOT}" fill="#0c1110"/><line x1="0" y1="{FOOT}" x2="{PANEL_X}" y2="{FOOT}" stroke="#1f2a27"/>')
x0 = 28
for k, v in [('Drag', '15° steps'), ('Shift', '1°'), ('Alt', 'free'), ('X · Y · Z', 'lock an axis'), ('Tab', 'next plane'), ('Double-click', 'add a bend'), ('Esc', 'done')]:
    w = 14 + len(k) * 7.6
    o.append(f'<rect x="{x0}" y="{FOOT + 16}" width="{w:.0f}" height="25" rx="5" fill="#1a2422" stroke="#2c3a37"/>' + txt(x0 + w / 2, FOOT + 33, k, 12, TEXT, 'middle', 600) + txt(x0 + w + 9, FOOT + 33, v, 12, INK))
    x0 += w + 9 + len(v) * 6.7 + 26
o.append('</svg>')
open(os.path.join(os.path.dirname(os.path.abspath(__file__)), 'shape-mode.svg'), 'w', encoding='utf-8').write('\n'.join(o))
print('ok', len(o))
