"""The bench supply, new design (owner's reference, 2026-10-11): a tall programmable switching supply, 0-30 V 0-5 A,
three 4-digit white LED rows (V, A, W), four encoders (V coarse/fine, A coarse/fine), OCP / OVP / OUTPUT keys, POWER,
USB-A and USB-C, posts - GND +. Unbranded. One still per mode, front panel at true size (4 px a mm), plus a contact
sheet and a side elevation. Every number on the glass is computed from the stated load and settings (W auto-ranges).
Writes supply-modes/*.svg beside this file; rasterise with .claude/tools/shoot-svg.js."""
import math, os

OUT = os.path.join(os.path.dirname(os.path.abspath(__file__)), 'supply-modes')
os.makedirs(OUT, exist_ok=True)

W, H = 110, 170            # front panel, mm
DEPTH = 220
S = 4                      # px per mm in the stills

# ---------------------------------------------------------------- the supply's own arithmetic (shown numbers)
def fmt_v(v):  return f'{v:05.2f}'                      # 05.00
def fmt_a(a):  return f'{a:5.3f}'                       # 0.100
def fmt_w(p):                                           # auto-ranging: 0.000-9.999, 10.00-99.99, 100.0-150.0
    if p < 9.9995: return f'{p:5.3f}'
    if p < 99.995: return f'{p:5.2f}'
    return f'{p:5.1f}'

def solve(vset, ilim, r):
    """CV/CC of an ideal regulated source into a resistor: returns (mode, V, I, P)."""
    i_cv = vset / r
    if i_cv <= ilim: return 'CV', vset, i_cv, vset * i_cv
    return 'CC', ilim * r, ilim, ilim * ilim * r

# ---------------------------------------------------------------- 7-segment glyphs
SEGS = {'0': 'abcdef', '1': 'bc', '2': 'abdeg', '3': 'abcdg', '4': 'bcfg', '5': 'acdfg', '6': 'acdefg', '7': 'abc',
        '8': 'abcdefg', '9': 'abcdfg', 'O': 'abcdef', 'C': 'adef', 'P': 'abefg', 'U': 'bcdef', 't': 'defg',
        '-': 'g', ' ': '', 'E': 'adefg', 'S': 'acdfg'}
DW, DH, DT, GAP = 9.6, 17.0, 2.1, 0.32      # digit width, height, stroke, segment gap (mm)
PITCH = 12.6

def hseg(x0, x1, y, t):
    h = t / 2
    return f'{x0:.2f},{y:.2f} {x0 + h:.2f},{y - h:.2f} {x1 - h:.2f},{y - h:.2f} {x1:.2f},{y:.2f} {x1 - h:.2f},{y + h:.2f} {x0 + h:.2f},{y + h:.2f}'

def vseg(x, y0, y1, t):
    h = t / 2
    return f'{x:.2f},{y0:.2f} {x + h:.2f},{y0 + h:.2f} {x + h:.2f},{y1 - h:.2f} {x:.2f},{y1:.2f} {x - h:.2f},{y1 - h:.2f} {x - h:.2f},{y0 + h:.2f}'

def seg_polys():
    t = DT; x0, x1 = t / 2, DW - t / 2; y0, ym, y1 = t / 2, DH / 2, DH - t / 2
    return {'a': hseg(x0 + GAP, x1 - GAP, y0, t), 'g': hseg(x0 + GAP, x1 - GAP, ym, t), 'd': hseg(x0 + GAP, x1 - GAP, y1, t),
            'f': vseg(x0, y0 + GAP, ym - GAP, t), 'b': vseg(x1, y0 + GAP, ym - GAP, t),
            'e': vseg(x0, ym + GAP, y1 - GAP, t), 'c': vseg(x1, ym + GAP, y1 - GAP, t)}
POLYS = seg_polys()
LIT, GHOST = '#f3f6ff', '#15181c'

def digits(x, y, text, all_dots=False):
    """text like '05.00': 4 glyphs, a '.' lights the dot of the glyph before it."""
    cells, dots = [], []
    for ch in text:
        if ch == '.': dots[-1] = True
        else: cells.append(ch); dots.append(False)
    if all_dots: dots = [True] * len(cells)
    out = []
    for k, (ch, dp) in enumerate(zip(cells, dots)):
        gx = x + k * PITCH
        on = SEGS[ch]
        out.append(f'<g transform="translate({gx:.2f} {y}) skewX(-5)">')
        out += [f'<polygon points="{POLYS[s]}" fill="{GHOST}"/>' for s in 'abcdefg' if s not in on]
        lit = ''.join(f'<polygon points="{POLYS[s]}"/>' for s in on)
        if lit: out.append(f'<g fill="{LIT}" filter="url(#led)">{lit}</g>')
        out.append(f'<circle cx="{DW + 0.9:.2f}" cy="{DH - DT / 2:.2f}" r="1.05" fill="{LIT if dp else GHOST}"'
                   + (' filter="url(#led)"' if dp else '') + '/>')
        out.append('</g>')
    return out

# ---------------------------------------------------------------- panel parts (mm)
def encoder(cx, cy, label, mute_icon=False):
    r = 9.0
    o = [f'<circle cx="{cx + .7}" cy="{cy + 1.1}" r="{r + .5}" fill="#000" opacity=".55"/>',
         f'<circle cx="{cx}" cy="{cy}" r="{r}" fill="url(#skirt)" stroke="#050607" stroke-width=".3"/>']
    for k in range(60):
        a = 2 * math.pi * k / 60
        o.append(f'<line x1="{cx + 7.7 * math.cos(a):.2f}" y1="{cy + 7.7 * math.sin(a):.2f}" x2="{cx + 8.85 * math.cos(a):.2f}" '
                 f'y2="{cy + 8.85 * math.sin(a):.2f}" stroke="#08090a" stroke-width=".42"/>')
    o += [f'<circle cx="{cx}" cy="{cy}" r="7.4" fill="url(#cap)" stroke="#0b0c0d" stroke-width=".25"/>',
          f'<ellipse cx="{cx - 2.2}" cy="{cy - 2.6}" rx="3.6" ry="2.1" fill="#fff" opacity=".10" transform="rotate(-35 {cx - 2.2} {cy - 2.6})"/>',
          f'<text x="{cx - (2.6 if mute_icon else 0)}" y="{cy + 14.6}" font-size="3.3" fill="#eef2f5" text-anchor="middle">{label}</text>']
    if mute_icon:
        o.append(speaker(cx + 9.2, cy + 13.4, '#eef2f5', 0.85))
    return o

def speaker(x, y, colour, s=1.0, crossed=True):
    p = f'<g transform="translate({x} {y}) scale({s})"><polygon points="-2,-0.9 -0.9,-0.9 0.8,-2.3 0.8,2.3 -0.9,0.9 -2,0.9" fill="{colour}"/>'
    if crossed:
        p += f'<line x1="1.6" y1="-1.3" x2="3.6" y2="1.3" stroke="{colour}" stroke-width=".5"/><line x1="1.6" y1="1.3" x2="3.6" y2="-1.3" stroke="{colour}" stroke-width=".5"/>'
    return p + '</g>'

def key(cx, cy, text, on):
    w, h = 13, 5.4
    fill, ink, glow = ('#5dff6c', '#0d4a16', ' filter="url(#key)"') if on else ('#173320', '#4d7a56', '')
    return [f'<rect x="{cx - w / 2}" y="{cy - h / 2}" width="{w}" height="{h}" rx="2.7" fill="#050605"/>',
            f'<rect x="{cx - w / 2 + .5}" y="{cy - h / 2 + .5}" width="{w - 1}" height="{h - 1}" rx="2.2" fill="{fill}"{glow}/>',
            f'<rect x="{cx - w / 2 + 1.2}" y="{cy - h / 2 + .8}" width="{w - 2.4}" height="1.2" rx=".6" fill="#fff" opacity="{.35 if on else .06}"/>',
            f'<text x="{cx}" y="{cy + 1.0}" font-size="2.5" font-weight="700" fill="{ink}" text-anchor="middle">{text}</text>']

def dot(x, y, on, colour='#ff2a1f'):
    return f'<circle cx="{x}" cy="{y}" r="1.0" fill="{colour if on else "#2a1514"}"' + (' filter="url(#led)"' if on else '') + '/>'

def post(cx, cy, ring):
    o = [f'<circle cx="{cx + .8}" cy="{cy + 1.2}" r="7.6" fill="#000" opacity=".55"/>']
    if ring:
        o += [f'<circle cx="{cx}" cy="{cy}" r="7.6" fill="{ring}" opacity=".95"/>',
              f'<circle cx="{cx}" cy="{cy}" r="7.6" fill="url(#ringshade)"/>']
    o += [f'<circle cx="{cx}" cy="{cy}" r="{6.0 if ring else 7.4}" fill="url(#postbody)" stroke="#000" stroke-width=".3"/>']
    for k in range(24):
        a = 2 * math.pi * k / 24; r0 = (4.9 if ring else 6.2); r1 = (5.9 if ring else 7.3)
        o.append(f'<line x1="{cx + r0 * math.cos(a):.2f}" y1="{cy + r0 * math.sin(a):.2f}" x2="{cx + r1 * math.cos(a):.2f}" y2="{cy + r1 * math.sin(a):.2f}" stroke="#000" stroke-width=".35"/>')
    o += [f'<circle cx="{cx}" cy="{cy}" r="3.0" fill="url(#chrome)" stroke="#2b2f33" stroke-width=".3"/>',
          f'<circle cx="{cx}" cy="{cy}" r="1.9" fill="none" stroke="#5c646b" stroke-width=".35"/>',
          f'<circle cx="{cx}" cy="{cy}" r="1.25" fill="#060708"/>']
    return o

def panel(st):
    """st: dict of what is lit. Returns SVG in mm, origin the panel's top-left."""
    o = [f'<rect x="-.6" y="-.6" width="{W + 1.2}" height="{H + 1.2}" rx="5.4" fill="#0b0c0d"/>',
         f'<rect x="0" y="0" width="{W}" height="{H}" rx="5" fill="url(#bezel)"/>',
         f'<rect x=".6" y=".6" width="{W - 1.2}" height="{H - 1.2}" rx="4.5" fill="none" stroke="#5b6168" stroke-width=".3" opacity=".6"/>',
         # glass
         '<rect x="4" y="4" width="74" height="114" rx="3" fill="#040506" stroke="#000" stroke-width=".5"/>',
         '<rect x="4" y="4" width="74" height="114" rx="3" fill="url(#sheen)"/>',
         '<text x="9" y="13.2" font-size="5" font-weight="700" font-style="italic" fill="#eef2f5" letter-spacing=".1">DC POWER SUPPLY</text>',
         f'<text x="94" y="10.6" font-size="3.6" font-weight="700" fill="#eef2f5" text-anchor="middle">30 V · 5 A</text>']
    rows = [(20, st['v'], 'V'), (53, st['a'], 'A'), (82, st['w'], 'W')]
    for y, txt, unit in rows:
        o += digits(9.5, y, txt, st.get('self'))
        o.append(f'<text x="64.5" y="{y + 15.5}" font-size="10" font-family="Times New Roman, serif" fill="#eef2f5">{unit}</text>')
    # legend row printed on the glass, with its dots
    L = st.get('dots', '')
    o += [dot(11, 44, 'V' in L), '<text x="13.4" y="45.3" font-size="3.6" font-family="Times New Roman, serif" fill="#d9dee3">C.V</text>',
          dot(31, 44, 'C' in L), '<text x="33.4" y="45.3" font-size="3.6" font-family="Times New Roman, serif" fill="#d9dee3">C.C</text>',
          dot(51, 44, 'L' in L, '#ffb02e'), '<text x="53.4" y="45.3" font-size="3.6" font-family="Times New Roman, serif" fill="#d9dee3">LOCK</text>',
          speaker(70.5, 44, '#ffb02e' if 'M' in L else '#3a2c14', 0.85)]
    if 'M' in L:
        o[-1] = f'<g filter="url(#led)">{o[-1]}</g>'
    K = st.get('keys', '')
    o += key(16, 109, 'OCP', 'C' in K) + key(38, 109, 'OVP', 'V' in K) + key(61, 109, 'OUTPUT', 'O' in K)
    # encoder column
    o += encoder(94, 25, 'V - COARSE') + encoder(94, 57, 'V - FINE /', True) + encoder(94, 89, 'A - COARSE') + encoder(94, 121, 'A - FINE')
    # lower section: POWER, USB
    pin = st.get('power', True)
    o += [f'<circle cx="14.5" cy="{127.5 + .6}" r="5" fill="#000" opacity=".5"/>',
          '<circle cx="14.5" cy="127.5" r="5" fill="#0c0d0e"/>',
          f'<circle cx="14.5" cy="127.5" r="{3.9 if pin else 4.3}" fill="url(#btn)" stroke="#000" stroke-width=".25"/>',
          '<text x="14.5" y="138" font-size="3.2" fill="#eef2f5" text-anchor="middle">POWER</text>',
          '<text x="36" y="123.2" font-size="2.7" fill="#eef2f5" text-anchor="middle">USB-A</text>',
          '<rect x="30.2" y="125" width="11.6" height="5.2" rx=".5" fill="#9aa1a7"/>',
          '<rect x="30.9" y="125.6" width="10.2" height="4" rx=".3" fill="#050505"/>',
          '<rect x="31.6" y="125.8" width="8.8" height="1.6" fill="#f2c200"/>',
          '<text x="55.5" y="123.2" font-size="2.7" fill="#eef2f5" text-anchor="middle">USB-C</text>',
          '<rect x="51" y="126" width="9" height="3.4" rx="1.7" fill="#9aa1a7"/>',
          '<rect x="51.5" y="126.4" width="8" height="2.6" rx="1.3" fill="#050505"/>',
          '<rect x="52.8" y="127.35" width="5.4" height=".7" rx=".35" fill="#70777d"/>',
          '<path d="M29 131.8 v1.2 h3.2 M59.8 133 h3.2 v-1.2" fill="none" stroke="#c9ced3" stroke-width=".3"/>',
          '<text x="46" y="133.9" font-size="2.6" fill="#d9dee3" text-anchor="middle">Quick Charge</text>']
    # post ledge
    o += ['<rect x="3" y="141" width="104" height="27" rx="3" fill="url(#ledge)" stroke="#000" stroke-width=".3"/>',
          '<line x1="4" y1="141.4" x2="106" y2="141.4" stroke="#6b7177" stroke-width=".3" opacity=".7"/>']
    o += post(18, 152, None) + post(50, 152, '#22c55e') + post(84, 152, '#e5322b')
    o += ['<text x="18" y="166.2" font-size="5" fill="#eef2f5" text-anchor="middle">−</text>',
          '<text x="50" y="166" font-size="3.4" fill="#eef2f5" text-anchor="middle">GND</text>',
          '<text x="84" y="166.4" font-size="5" fill="#eef2f5" text-anchor="middle">+</text>']
    # feet
    o += [f'<rect x="{x}" y="{H + .4}" width="15" height="4" rx="1" fill="#141618"/>' for x in (7, 88)]
    return o

DEFS = '''<defs>
<linearGradient id="bezel" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#3a3f45"/><stop offset=".55" stop-color="#2a2e33"/><stop offset="1" stop-color="#1f2226"/></linearGradient>
<linearGradient id="ledge" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#2c3035"/><stop offset="1" stop-color="#1a1c1f"/></linearGradient>
<linearGradient id="sheen" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#fff" stop-opacity=".07"/><stop offset=".35" stop-color="#fff" stop-opacity=".015"/><stop offset=".36" stop-color="#fff" stop-opacity="0"/><stop offset="1" stop-color="#fff" stop-opacity=".02"/></linearGradient>
<radialGradient id="skirt" cx=".45" cy=".4" r=".7"><stop offset="0" stop-color="#2b2f33"/><stop offset="1" stop-color="#0d0f10"/></radialGradient>
<radialGradient id="cap" cx=".4" cy=".35" r=".8"><stop offset="0" stop-color="#3d4247"/><stop offset=".6" stop-color="#1b1e21"/><stop offset="1" stop-color="#0e1012"/></radialGradient>
<radialGradient id="btn" cx=".4" cy=".35" r=".8"><stop offset="0" stop-color="#454a50"/><stop offset="1" stop-color="#121416"/></radialGradient>
<radialGradient id="postbody" cx=".4" cy=".35" r=".8"><stop offset="0" stop-color="#34383c"/><stop offset="1" stop-color="#0b0c0d"/></radialGradient>
<radialGradient id="chrome" cx=".38" cy=".32" r=".8"><stop offset="0" stop-color="#f4f6f8"/><stop offset=".5" stop-color="#a9b0b6"/><stop offset="1" stop-color="#5a6268"/></radialGradient>
<radialGradient id="ringshade" cx=".4" cy=".35" r=".7"><stop offset="0" stop-color="#fff" stop-opacity=".35"/><stop offset=".7" stop-color="#000" stop-opacity="0"/><stop offset="1" stop-color="#000" stop-opacity=".45"/></radialGradient>
<filter id="led" x="-60%" y="-60%" width="220%" height="220%"><feGaussianBlur stdDeviation=".55" result="b"/><feMerge><feMergeNode in="b"/><feMergeNode in="SourceGraphic"/></feMerge></filter>
<filter id="key" x="-40%" y="-80%" width="180%" height="260%"><feGaussianBlur stdDeviation=".9" result="b"/><feMerge><feMergeNode in="b"/><feMergeNode in="SourceGraphic"/></feMerge></filter>
</defs>'''

# ---------------------------------------------------------------- the modes (numbers computed, not typed)
VSET, ILIM, OVP_DEFAULT = 5.00, 0.100, 33.0
cv = solve(VSET, ILIM, 68.0)
cc = solve(VSET, ILIM, 22.0)
assert cv[0] == 'CV' and cc[0] == 'CC'
blank = '    '
MODES = [
    dict(id='01-off', en='Off', fr='Arrêt', power=False, v=blank, a=blank, w=blank,
         cap_en=['POWER out: no mains to the converter. Glass and keys', 'dark, USB ports dead, posts floating.'],
         cap_fr=['POWER relâché : convertisseur hors tension. Afficheurs et', 'touches éteints, ports USB coupés, bornes flottantes.']),
    dict(id='02-self-test', en='Self-test at switch-on', fr='Autotest à la mise sous tension', self=True,
         v='8888', a='8888', w='8888', dots='VCLM', keys='CVO',
         cap_en=['POWER pressed in: every segment, dot and key lights for', '1 s with one beep; then the last settings come back.'],
         cap_fr=['POWER enfoncé : tous les segments, points et touches', "s'allument 1 s avec un bip ; puis les derniers réglages reviennent."]),
    dict(id='03-standby', en='Standby: output off', fr='Veille : sortie coupée', v=fmt_v(VSET), a=fmt_a(ILIM), w=fmt_w(0), keys='V',
         cap_en=[f'Posts disconnected; the glass shows the settings:', f'V set {VSET:.2f} V, current limit {ILIM:.3f} A, 0 W. OVP armed', f'at {OVP_DEFAULT:.1f} V (key lit), OCP off.'],
         cap_fr=['Bornes déconnectées ; les afficheurs montrent les consignes :', f'{VSET:.2f} V, limite {ILIM:.3f} A, 0 W. OVP armée à {OVP_DEFAULT:.1f} V.']),
    dict(id='04-setting', en='Setting a value', fr="Réglage d'une valeur", v=fmt_v(9.00), a=fmt_a(ILIM), w=fmt_w(0), keys='V',
         flash=[(20, 37, 'V')],
         cap_en=['V-COARSE turned 4 clicks (1 V a click): the V digits flash', 'the new setting, 9.00 V, and hold 3 s after the last click.', 'V-FINE 0.01 V, A-COARSE 0.1 A, A-FINE 0.001 A a click.'],
         cap_fr=['V-COARSE tourné de 4 crans (1 V par cran) : les chiffres V', 'clignotent sur la consigne, 9.00 V, et se figent 3 s après.']),
    dict(id='05-cv', en='Output on, constant voltage', fr='Sortie active, tension constante', v=fmt_v(cv[1]), a=fmt_a(cv[2]), w=fmt_w(cv[3]),
         dots='V', keys='VO',
         cap_en=['OUTPUT pressed: key lit, C.V dot on. Load 68 Ω:', f'V holds {cv[1]:.2f} V; I = {cv[1]:.2f}/68 = {cv[2]:.3f} A (under the', f'{ILIM:.3f} A limit); P = V × I = {cv[3]:.3f} W.'],
         cap_fr=['OUTPUT pressé : touche allumée, point C.V. Charge 68 Ω :', f'V = {cv[1]:.2f} V ; I = {cv[2]:.3f} A (sous la limite) ; P = {cv[3]:.3f} W.']),
    dict(id='06-cc', en='Output on, constant current', fr='Sortie active, courant constant', v=fmt_v(cc[1]), a=fmt_a(cc[2]), w=fmt_w(cc[3]),
         dots='C', keys='VO',
         cap_en=[f'Load 22 Ω wants {VSET:.2f}/22 = {VSET / 22:.3f} A, above the limit:', f'C.C dot on; I holds {cc[2]:.3f} A and V falls to', f'{cc[2]:.3f} × 22 = {cc[1]:.2f} V; P = {cc[3]:.3f} W.'],
         cap_fr=[f'La charge 22 Ω demande {VSET / 22:.3f} A, au-dessus de la limite :', f'point C.C ; I = {cc[2]:.3f} A et V descend à {cc[1]:.2f} V ; P = {cc[3]:.3f} W.']),
    dict(id='07-ocp-trip', en='OCP trip', fr='Déclenchement OCP', v=fmt_v(VSET), a=' OCP', w=fmt_w(0), keys='CV',
         flash=[(53, 70, 'A')],
         cap_en=['OCP armed (key lit) and the same 22 Ω: instead of', f'holding {ILIM:.3f} A the supply cuts the output. A flashes OCP,', 'three beeps, OUTPUT off. Reset: clear the fault, press OUTPUT.'],
         cap_fr=['OCP armée et la même charge 22 Ω : la sortie est coupée au lieu', "de limiter. A clignote OCP, trois bips. Réarmer : supprimer le défaut, OUTPUT."]),
    dict(id='08-ovp-set', en='Setting the OVP level', fr='Réglage du seuil OVP', v=fmt_v(6.00), a=' OUP', w=fmt_w(0), keys='V',
         flash=[(20, 37, 'V'), (106.3, 111.7, 'OVP key')],
         cap_en=['OVP pressed: key flashes, A reads OUP, V flashes the trip', 'level, set with the V knobs: 6.00 V. OVP again keeps it', '(key steady: armed). A 7-segment cell cannot draw a V.'],
         cap_fr=['OVP pressé : la touche clignote, A affiche OUP, V clignote sur', 'le seuil, réglé aux boutons V : 6.00 V. OVP à nouveau le garde.']),
    dict(id='09-ovp-trip', en='OVP trip', fr='Déclenchement OVP', v=' OUP', a=fmt_a(0), w=fmt_w(0), keys='V',
         flash=[(20, 37, 'V')],
         cap_en=['V set raised to 6.50 V, over the 6.00 V level: the output is', 'cut as it passes 6.00 V. V flashes OUP, three beeps, OUTPUT', 'off. Reset: lower V under the level, press OUTPUT.'],
         cap_fr=['V réglé à 6.50 V, au-dessus du seuil 6.00 V : sortie coupée au', 'passage de 6.00 V. V clignote OUP, trois bips. Réarmer : baisser V, OUTPUT.']),
    dict(id='10-otp', en='Over-temperature', fr='Surchauffe', v=' OtP', a=fmt_a(0), w=fmt_w(0), keys='V',
         flash=[(20, 37, 'V')],
         cap_en=['Inside too hot (side slots covered under a heavy load): output', 'cut, V flashes OtP, fan at full speed. Reset: switch off, let it', 'cool about a minute. (Trip temperature to confirm.)'],
         cap_fr=['Intérieur trop chaud (fentes couvertes, forte charge) : sortie coupée,', 'V clignote OtP. Réarmer : éteindre, laisser refroidir une minute.']),
    dict(id='11-locked', en='Narrowed by the activity', fr="Restreint par l'activité", v=fmt_v(12.00), a=fmt_a(ILIM), w=fmt_w(0), keys='V', dots='L',
         cap_en=[f'The activity caps V at 12.00 V and locks A at {ILIM:.3f} A: LOCK on.', 'At the cap a further click is refused: V blinks twice, LOCK', 'flashes. A locked knob turns freely and changes nothing.'],
         cap_fr=[f"L'activité plafonne V à 12.00 V et verrouille A à {ILIM:.3f} A : LOCK.", 'Au plafond, un cran de plus est refusé : V clignote deux fois.']),
    dict(id='12-mute', en='Beeper muted', fr='Bip coupé', v=fmt_v(cv[1]), a=fmt_a(cv[2]), w=fmt_w(cv[3]), dots='VM', keys='VO',
         cap_en=['V-FINE pressed (the speaker mark under it): the beeper is', 'muted, the speaker mark on the glass lights. Trips still cut', 'the output and flash; only the sound goes.'],
         cap_fr=['V-FINE pressé : bip coupé, le haut-parleur barré s\'allume.', 'Les déclenchements coupent et clignotent toujours, sans son.']),
]

PX0, PY0 = 26, 84            # panel origin in a still, px
CW, CH = 640, 960            # still size, px

def still(m, n):
    o = [f'<rect width="{CW}" height="{CH}" fill="#eef1f3"/>',
         f'<text x="{PX0}" y="34" font-size="22" font-weight="700" fill="#16202a">{n}. {m["en"]}</text>',
         f'<text x="{PX0}" y="60" font-size="17" fill="#5b6873">{m["fr"]}</text>',
         f'<g transform="translate({PX0} {PY0}) scale({S})">'] + panel(m) + ['</g>']
    for (y0, y1, what) in m.get('flash', []):     # a bracket in the right margin: what flashes, at its height
        ya, yb = PY0 + y0 * S, PY0 + y1 * S
        x = PX0 + W * S + 12
        o += [f'<path d="M{x} {ya:.1f} h7 V{yb:.1f} h-7" fill="none" stroke="#d98a00" stroke-width="2.4"/>',
              f'<text x="{x + 13}" y="{(ya + yb) / 2 - 2:.1f}" font-size="15" font-weight="700" fill="#b06f00">{what} flashes</text>',
              f'<text x="{x + 13}" y="{(ya + yb) / 2 + 16:.1f}" font-size="14" fill="#b06f00">{what} clignote</text>']
    y = PY0 + (H + 5) * S + 34
    for line in m['cap_en']:
        o.append(f'<text x="{PX0}" y="{y}" font-size="16" fill="#16202a">{esc(line)}</text>'); y += 21
    y += 4
    for line in m['cap_fr']:
        o.append(f'<text x="{PX0}" y="{y}" font-size="14" font-style="italic" fill="#5b6873">{esc(line)}</text>'); y += 18
    return o

def esc(s): return s.replace('&', '&amp;').replace('<', '&lt;')

def svg(w, h, body):
    return (f'<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 {w} {h}" width="{w}" height="{h}" '
            f'font-family="Segoe UI, Arial, sans-serif">{DEFS}' + '\n'.join(body) + '</svg>\n')

def write(name, text):
    open(os.path.join(OUT, name), 'w', encoding='utf-8', newline='\n').write(text)

for n, m in enumerate(MODES, 1):
    write(f'{m["id"]}.svg', svg(CW, CH, still(m, n)))

# contact sheet: composed from the rasterised stills (run again with --sheet after shoot-svg.js)
import sys
if '--sheet' in sys.argv:
    from PIL import Image, ImageDraw, ImageFont
    cols, sc = 6, 0.5
    cw, ch = int(CW * sc), int(CH * sc)
    sheet = Image.new('RGB', (cols * cw + 40, 2 * ch + 100), '#dfe4e8')
    d = ImageDraw.Draw(sheet)
    f1 = ImageFont.truetype('segoeuib.ttf', 26); f2 = ImageFont.truetype('segoeui.ttf', 17)
    d.text((20, 18), 'The bench supply, new design: its modes (front panel at true size, 0–30 V 0–5 A)', font=f1, fill='#16202a')
    d.text((20, 56), 'Every reading computed from the stated load: 5.00 V set, 0.100 A limit; W auto-ranges. Unbranded; markings as printed on the hardware.', font=f2, fill='#3d4a55')
    for k, m in enumerate(MODES):
        im = Image.open(os.path.join(OUT, m['id'] + '.png')).convert('RGB').resize((cw, ch), Image.LANCZOS)
        sheet.paste(im, (20 + (k % cols) * cw, 90 + (k // cols) * ch))
    sheet.save(os.path.join(OUT, '00-contact-sheet.png'))
    print('wrote contact sheet'); sys.exit()

# side elevation (right side), 3 px a mm, for the 3D build
s3 = 3; ox, oy = 60, 70
side = [f'<rect width="{DEPTH * s3 + 180}" height="{H * s3 + 170}" fill="#eef1f3"/>',
        f'<text x="20" y="34" font-size="22" font-weight="700" fill="#16202a">Right side, {W} × {H} × {DEPTH} mm (W × H × D), front to the left</text>',
        f'<g transform="translate({ox} {oy}) scale({s3})">',
        f'<rect x="8" y="0" width="{DEPTH - 8}" height="{H}" rx="2" fill="#2a2e33" stroke="#0b0c0d" stroke-width=".5"/>',
        f'<rect x="0" y="0" width="8" height="{H}" rx="1.5" fill="#1b1e21" stroke="#0b0c0d" stroke-width=".5"/>']
for (gx, gy) in [(70, 22), (70, 92), (70, 118), (140, 40)]:   # vent slot fields, as on the reference's side
    for r in range(4):
        for c in range(6):
            side.append(f'<rect x="{gx + c * 9 + (r % 2) * 3}" y="{gy + r * 6}" width="5" height="2" rx=".6" fill="#07080a"/>')
side += [f'<rect x="-9" y="{y - 8.5}" width="9" height="17" rx="2" fill="#16181b"/>' for y in (25, 57, 89, 121)]   # knobs
side += [f'<rect x="-14" y="{152 - 4}" width="14" height="8" rx="2" fill="#16181b"/>']                              # posts
side += [f'<rect x="{x}" y="{H}" width="16" height="5" rx="1" fill="#141618"/>' for x in (12, DEPTH - 30)]
side += [f'<g stroke="#5d6b77" stroke-width=".3" fill="#3d4a55" font-size="4.2">',
         f'<line x1="0" y1="{H + 12}" x2="{DEPTH}" y2="{H + 12}"/><line x1="0" y1="{H + 9}" x2="0" y2="{H + 15}"/><line x1="{DEPTH}" y1="{H + 9}" x2="{DEPTH}" y2="{H + 15}"/>',
         f'<text x="{DEPTH / 2}" y="{H + 19}" text-anchor="middle" stroke="none">{DEPTH} (body; knobs and posts add 9–14 in front)</text>',
         f'<line x1="{DEPTH + 8}" y1="0" x2="{DEPTH + 8}" y2="{H}"/><line x1="{DEPTH + 5}" y1="0" x2="{DEPTH + 11}" y2="0"/><line x1="{DEPTH + 5}" y1="{H}" x2="{DEPTH + 11}" y2="{H}"/>',
         f'<text x="{DEPTH + 12}" y="{H / 2}" stroke="none">{H}</text></g>', '</g>']
write('13-side.svg', svg(DEPTH * s3 + 180, H * s3 + 170, side))
print('wrote', len(MODES) + 1, 'files to', OUT)
for m in MODES: print(f'  {m["id"]:14} V {m["v"]!r:8} A {m["a"]!r:8} W {m["w"]!r}')
