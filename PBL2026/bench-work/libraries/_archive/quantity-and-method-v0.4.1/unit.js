// Unit library: the quantity sets the method. Five physical quantities, each beside the real instrument that suits it:
// light emitted, its colour, weight, how fast it turns, how hot. First used by D1·020 card 1 (Flow ¶3).
// Readings are illustrative and say so on the stage.
// Owner, 2026-10-08: one block at a time on the full stage; no transport inside a block; realism first; unbranded; and
// the owner's reference design: five numbered cards, the key word coloured, each instrument lit and reflected on its
// bench top.
'use strict';
(function () {
  const K = window.SVGKIT('qm-');
  const { INK, text, neon, seg7, u } = K;
  const W = 344, GAP = 14, X0 = (1920 - (5 * W + 4 * GAP)) / 2, Y0 = 170, Y1 = 750;   // owner, 2026-10-08: "the cards … are too tall": the scene right under the title, a short footer
  const ART = 0.92, FOOT = 46;                      // each scene at 92 % about its bench top; the footer: reflection and method line
  let CUR = '';                                     // the current card's scene transform (its moving parts share it)
  const top = c => S.top(`<g transform="${CUR}">${c}</g>`);
  const SANS = `font-family="'IBM Plex Sans','Segoe UI',system-ui,sans-serif"`;
  const TEAL = '#2EE6C5', GOLD = '#FFB547';
  let S = K.timeline();
  const T0 = k => 0.3 + 0.6 * k;                    // each card arrives as the Flow names its quantity

  const DEFS = `<defs>
<linearGradient id="qm-lcdBack" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#D3E0D8"/><stop offset="1" stop-color="#A7BCB1"/></linearGradient>
<linearGradient id="qm-black" x1="0" y1="0" x2="1" y2="0"><stop offset="0" stop-color="#0E1014"/><stop offset="0.35" stop-color="#3A404A"/><stop offset="0.6" stop-color="#1E2228"/><stop offset="1" stop-color="#0A0C0F"/></linearGradient>
<linearGradient id="qm-blackV" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#3A404A"/><stop offset="0.3" stop-color="#1E2228"/><stop offset="1" stop-color="#0A0C0F"/></linearGradient>
<linearGradient id="qm-chrome" x1="0" y1="0" x2="1" y2="0"><stop offset="0" stop-color="#4A525C"/><stop offset="0.25" stop-color="#E9EEF3"/><stop offset="0.45" stop-color="#A9B3BE"/><stop offset="0.75" stop-color="#D5DCE4"/><stop offset="1" stop-color="#3E464F"/></linearGradient>
</defs>`;

  function lcd(cx, cy, w, h, s, unit, col, size) {     // a seven-segment window, its unit beside it
    const uw = unit ? unit.length * size * 0.32 + 8 : 0;
    return `<rect x="${cx - w / 2}" y="${cy - h / 2}" width="${w}" height="${h}" rx="6" fill="url(#qm-lcd)" stroke="#000"/><rect x="${cx - w / 2 + 3}" y="${cy - h / 2 + 3}" width="${w - 6}" height="${h * 0.3}" rx="4" fill="#fff" opacity="0.04"/>`
      + seg7(cx + w / 2 - 10 - uw - K.seg7Width(s, size), cy + size / 2, s, size, col)
      + (unit ? text(cx + w / 2 - 8, cy + size / 2, unit, size * 0.42, col, 'end', 700, false, `filter="${u('soft')}"`) : '');
  }
  function handheld(x, y, w, h) {                       // a rubber-armoured handheld instrument body
    return `<rect x="${x}" y="${y}" width="${w}" height="${h}" rx="${w * 0.22}" fill="url(#qm-blackV)" stroke="#4A525C" stroke-width="1.4"/>`
      + `<rect x="${x + 5}" y="${y + 5}" width="${w - 10}" height="${h - 10}" rx="${w * 0.18}" fill="none" stroke="#000" stroke-opacity="0.6"/>`
      + `<rect x="${x + 8}" y="${y + 6}" width="${w * 0.2}" height="${h - 20}" rx="${w * 0.1}" fill="#fff" opacity="0.05"/>`;
  }

  // each draws around its card's centre cx; floor is the bench top's line
  // card 01 (owner, 2026-10-08: "the light ray and its source does not look natural, the photometer also does not look
  // natural"; "the lamp shade direction … must all align naturally and the light should be automatically adjusting from
  // very dim to very bright while the photometer reacts accordingly"; 95 % reality). A balanced-arm desk lamp: weighted
  // base, two arms with tension springs, a metal cone shade; we look up into its mouth, so its lit inside shows. The shade,
  // the beam and the pool share one axis: the light leaves the rim as a soft cone (±22°, a hotter core), brightest on its
  // axis and fading with distance, and lands as a pool on the bench top centred where the axis meets it. The lamp's dimmer
  // runs slowly from very dim (10 lux at the sensor) to very bright (1800 lux) and back; the meter follows a moment later.
  // The light meter is built the way real ones are: a handheld body (backlit LCD, keys) and a separate sensor head on a
  // coiled cable, its flat white diffuser lying face-up in the pool, which is how illuminance is measured.
  const bez = (p0, p1, p2, p3, s) => { const m = 1 - s; return [0, 1].map(i => m * m * m * p0[i] + 3 * m * m * s * p1[i] + 3 * m * s * s * p2[i] + s * s * s * p3[i]); };
  function coil(p0, p1, p2, p3, r, turns, n = 420) {   // a coiled cable (or a spring) along a cubic: a trochoid round its line
    let d = '';
    for (let i = 0; i <= n; i++) {
      const s = i / n, [x, y] = bez(p0, p1, p2, p3, s), a = bez(p0, p1, p2, p3, Math.max(0, s - 0.002)), b = bez(p0, p1, p2, p3, Math.min(1, s + 0.002));
      let tx = b[0] - a[0], ty = b[1] - a[1]; const L = Math.hypot(tx, ty) || 1; tx /= L; ty /= L;
      const th = 2 * Math.PI * turns * s, k = Math.min(1, s * 14, (1 - s) * 14);      // straight for a moment at each end
      d += (i ? ' L' : 'M') + (x + k * r * (-ty * Math.sin(th) + 0.5 * tx * Math.cos(th))).toFixed(1) + ',' + (y + k * r * (tx * Math.sin(th) + 0.5 * ty * Math.cos(th))).toFixed(1);
    }
    return d;
  }
  // the dimmer: lux at the sensor head, 10 → 1800 → 10 on a log scale, one round every 14 s, passing 420 lux (the set-up)
  // rising as the lamp comes on
  const LUX_LO = 10, LUX_HI = 1800, LUX_P = 14;
  const luxFrac = (a, aOn) => { const f0 = Math.log(420 / LUX_LO) / Math.log(LUX_HI / LUX_LO), ph = Math.acos(1 - 2 * f0); return 0.5 - 0.5 * Math.cos(ph + 2 * Math.PI * (a - aOn) / LUX_P); };
  const luxAt = (a, aOn) => LUX_LO * Math.pow(LUX_HI / LUX_LO, luxFrac(a, aOn));
  function light(cx, fl, t0) {
    const g = [], X = x => +(cx + x).toFixed(1), Y = y => +(fl + y).toFixed(1), P = pts => pts.map(([x, y]) => `${X(x)},${Y(y)}`).join(' ');
    const aOn = t0 + 0.5, on = t => K.win(t, aOn, 0.35);             // the lamp switched on
    const bright = (t, a) => on(t) * (0.07 + 0.93 * luxFrac(a, aOn));   // how bright it looks (the eye's scale is about logarithmic)
    // the head: its knuckle, the shade's axis 8° off straight down (towards the sensor head), the rim's radius
    const KN = [-40, -372], PHI = 8 * Math.PI / 180, D = [Math.sin(PHI), Math.cos(PHI)], SL = 92, RM = 54;
    const M = [KN[0] + D[0] * SL, KN[1] + D[1] * SL];                 // the mouth's centre
    const ALPHA = 22 * Math.PI / 180, VB = RM / Math.tan(ALPHA), V = [M[0] - D[0] * VB, M[1] - D[1] * VB];   // the cone's apex, behind the rim
    const ray = (a, s) => [V[0] + Math.sin(PHI + a) * s, V[1] + Math.cos(PHI + a) * s];
    const cone = a => [ray(-a, VB / Math.cos(a)), ray(a, VB / Math.cos(a)), ray(a, -V[1] / Math.cos(PHI + a)), ray(-a, -V[1] / Math.cos(PHI - a))];
    const hit = ray(0, -V[1] / Math.cos(PHI));                        // where the axis meets the bench: the sensor head sits here
    const hx = hit[0], bx = 84, by = -198, bw = 94, bh = 196;
    g.push(`<defs><linearGradient id="qm-beamG" gradientUnits="userSpaceOnUse" x1="0" y1="${Y(M[1])}" x2="0" y2="${Y(0)}"><stop offset="0" stop-color="#FFF1D2" stop-opacity="0.6"/><stop offset="0.45" stop-color="#FFE7BC" stop-opacity="0.24"/><stop offset="1" stop-color="#FFDDA6" stop-opacity="0.09"/></linearGradient>`
      + `<radialGradient id="qm-pool" cx="0.5" cy="0.5" r="0.5"><stop offset="0" stop-color="#FFEBC4" stop-opacity="0.75"/><stop offset="0.4" stop-color="#FFD592" stop-opacity="0.34"/><stop offset="1" stop-color="#FFC56E" stop-opacity="0"/></radialGradient>`
      + `<linearGradient id="qm-shade" x1="0" y1="0" x2="1" y2="0"><stop offset="0" stop-color="#0C0E12"/><stop offset="0.26" stop-color="#454C57"/><stop offset="0.5" stop-color="#22272E"/><stop offset="0.85" stop-color="#121519"/><stop offset="1" stop-color="#2A3038"/></linearGradient>`
      + `<radialGradient id="qm-mouthOn" cx="0.5" cy="0.42" r="0.56"><stop offset="0" stop-color="#FFFFFF"/><stop offset="0.3" stop-color="#FFF3D6"/><stop offset="0.72" stop-color="#FFD48A"/><stop offset="1" stop-color="#C9822E"/></radialGradient>`
      + `<radialGradient id="qm-mouthOff" cx="0.5" cy="0.42" r="0.56"><stop offset="0" stop-color="#5A5E64"/><stop offset="0.6" stop-color="#2A2D32"/><stop offset="1" stop-color="#17191C"/></radialGradient>`
      + `<linearGradient id="qm-warmSide" x1="0" y1="0" x2="1" y2="0"><stop offset="0" stop-color="#FFD9A0" stop-opacity="0.42"/><stop offset="0.45" stop-color="#FFD9A0" stop-opacity="0.06"/><stop offset="1" stop-color="#FFD9A0" stop-opacity="0"/></linearGradient>`
      + `<filter id="qm-beamBlur" filterUnits="userSpaceOnUse" x="${X(-260)}" y="${Y(-420)}" width="560" height="460"><feGaussianBlur stdDeviation="7"/></filter>`
      + `<clipPath id="qm-poolClip"><rect x="${X(-200)}" y="${Y(-2)}" width="420" height="60"/></clipPath></defs>`);

    // the cord, from the base off the bench's left
    g.push(`<path d="M${X(-150)},${Y(-4)} Q${X(-178)},${Y(4)} ${X(-215)},${Y(3)}" fill="none" stroke="#0E1013" stroke-width="3" stroke-linecap="round"/>`);
    // the weighted base, its dimmer knob
    g.push(`<path d="M${X(-174)},${Y(-14)} V${Y(-3)} A46,9 0 0 0 ${X(-82)},${Y(-3)} V${Y(-14)} Z" fill="url(#qm-black)" stroke="#3A414B"/>`
      + `<ellipse cx="${X(-128)}" cy="${Y(-14)}" rx="46" ry="9" fill="#262B32" stroke="#4A525C"/><ellipse cx="${X(-134)}" cy="${Y(-16)}" rx="26" ry="3.5" fill="#FFFFFF" opacity="0.06"/>`
      + `<ellipse cx="${X(-98)}" cy="${Y(-17)}" rx="8" ry="3" fill="#111317" stroke="#5A626D" stroke-width="0.8"/><rect x="${X(-106)}" y="${Y(-23)}" width="16" height="6" fill="url(#qm-blackV)"/><ellipse cx="${X(-98)}" cy="${Y(-23)}" rx="8" ry="3" fill="#3A414B" stroke="#6B7480" stroke-width="0.7"/>`);
    // the arms: twin rods, a tension spring beside each, the cord clipped along them
    const P0 = [-128, -22], E = [-152, -236];
    const off = (a, b, o) => { const dx = b[0] - a[0], dy = b[1] - a[1], L = Math.hypot(dx, dy); return [[a[0] - dy / L * o, a[1] + dx / L * o], [b[0] - dy / L * o, b[1] + dx / L * o]]; };
    const lerp2 = (a, b, s) => [a[0] + (b[0] - a[0]) * s, a[1] + (b[1] - a[1]) * s];
    const line = (p, q, col, w) => `<line x1="${X(p[0])}" y1="${Y(p[1])}" x2="${X(q[0])}" y2="${Y(q[1])}" stroke="${col}" stroke-width="${w}" stroke-linecap="round"/>`;
    const rods = (a, b) => [-3.6, 3.6].map(o => { const [p, q] = off(a, b, o); return line(p, q, '#2A2F36', 4.4) + line(p, q, '#C3CBD4', 2.4) + `<line x1="${X(p[0])}" y1="${Y(p[1])}" x2="${X(q[0])}" y2="${Y(q[1])}" stroke="#FFFFFF" stroke-opacity="0.5" stroke-width="0.8"/>`; }).join('');
    const spring = (a, b, o, s0, s1, turns) => {
      const [p, q] = off(a, b, o), s = lerp2(p, q, s0), e = lerp2(p, q, s1), ha = lerp2(a, b, s0 - 0.05), hb = lerp2(a, b, s1 + 0.05);
      const d = coil([X(s[0]), Y(s[1])], [X(lerp2(s, e, 0.33)[0]), Y(lerp2(s, e, 0.33)[1])], [X(lerp2(s, e, 0.66)[0]), Y(lerp2(s, e, 0.66)[1])], [X(e[0]), Y(e[1])], 3.6, turns, 300);
      return line(ha, s, '#8A939E', 1.3) + line(e, hb, '#8A939E', 1.3) + `<path d="${d}" fill="none" stroke="#1A1D22" stroke-width="2.2"/><path d="${d}" fill="none" stroke="#AEB7C1" stroke-width="1.1"/>`;
    };
    const cordOn = (a, b, o) => { const [p, q] = off(a, b, o); return line(p, q, '#0E1013', 2.2); };
    g.push(cordOn(P0, E, -8) + cordOn(E, KN, -8) + rods(P0, E) + rods(E, KN) + spring(P0, E, 12, 0.1, 0.56, 24) + spring(E, KN, 11, 0.16, 0.62, 15));
    for (const [j, r] of [[P0, 8], [E, 10], [KN, 8]]) g.push(`<circle cx="${X(j[0])}" cy="${Y(j[1])}" r="${r}" fill="url(#qm-knob)" stroke="#5A626D" stroke-width="1.2"/><circle cx="${X(j[0])}" cy="${Y(j[1])}" r="${r * 0.35}" fill="#9AA4AF"/>`);
    g.push(`<path d="M${X(-138)},${Y(-22)} h20 l-4,-8 h-12 z" fill="#2A2F36" stroke="#4A525C"/>`);   // the arm's bracket on the base

    // the head, drawn in the shade's own frame (its axis straight down), turned to aim
    const head = inner => `<g transform="translate(${X(KN[0])} ${Y(KN[1])}) rotate(${(-PHI * 180 / Math.PI).toFixed(2)})">${inner}</g>`;
    g.push(head(`<rect x="-7" y="-17" width="14" height="19" rx="3" fill="url(#qm-chrome)" stroke="#5B636E" stroke-width="0.8"/>`
      + `<path d="M-15,0 C-17,26 -35,63 -${RM},${SL} L${RM},${SL} C35,63 17,26 15,0 Z" fill="url(#qm-shade)" stroke="#3E454F" stroke-width="1"/>`
      + `<ellipse cx="0" cy="0" rx="15" ry="4" fill="#2A2F36" stroke="#4A525C" stroke-width="0.8"/>`
      + `<path d="M-10,8 C-13,30 -27,60 -42,86" fill="none" stroke="#FFFFFF" stroke-opacity="0.16" stroke-width="3" stroke-linecap="round"/>`
      + [18, 26, 34].map(y => { const w = 15 + y * 0.14; return `<path d="M${(-w).toFixed(1)},${y} q${w.toFixed(1)},4 ${(2 * w).toFixed(1)},0" fill="none" stroke="#0A0C0F" stroke-width="1.4" opacity="0.7"/>`; }).join('')
      + `<ellipse cx="0" cy="${SL}" rx="${RM - 3}" ry="11" fill="url(#qm-mouthOff)"/><ellipse cx="0" cy="${SL - 2}" rx="15" ry="5.5" fill="#D8D2C4" opacity="0.7"/>`
      + `<ellipse cx="0" cy="${SL}" rx="${RM}" ry="12.5" fill="none" stroke="url(#qm-chrome)" stroke-width="2.6"/>`));

    // the light meter: its contact shadows, the body (a rubber holster, the face plate, a backlit LCD, four keys)
    g.push(`<ellipse cx="${X(bx + bw / 2)}" cy="${Y(1)}" rx="54" ry="6" fill="#000" opacity="0.45" filter="${u('soft')}"/><ellipse cx="${X(hx)}" cy="${Y(0)}" rx="38" ry="6" fill="#000" opacity="0.5" filter="${u('soft')}"/>`);
    g.push(`<rect x="${X(bx)}" y="${Y(by)}" width="${bw}" height="${bh}" rx="18" fill="url(#qm-blackV)" stroke="#4A525C" stroke-width="1.4"/>`
      + `<rect x="${X(bx + 3)}" y="${Y(by + 22)}" width="4" height="${bh - 44}" rx="2" fill="#0A0C0F"/><rect x="${X(bx + bw - 7)}" y="${Y(by + 22)}" width="4" height="${bh - 44}" rx="2" fill="#0A0C0F"/>`
      + `<rect x="${X(bx + 8)}" y="${Y(by + 8)}" width="${bw - 16}" height="${bh - 16}" rx="12" fill="#2B3037" stroke="#121519"/>`
      + `<rect x="${X(bx + 13)}" y="${Y(by + 16)}" width="${bw - 26}" height="58" rx="6" fill="#0A0C0F" stroke="#3A414B" stroke-width="0.8"/>`
      + `<rect x="${X(bx + 17)}" y="${Y(by + 20)}" width="${bw - 34}" height="50" rx="3" fill="url(#qm-lcdBack)"/>`
      + text(X(bx + 21), Y(by + 30), 'AUTO', 7, '#2A3330', 'start', 700) + text(X(bx + bw - 21), Y(by + 66), 'lux', 9.5, '#1B2220', 'end', 700));
    [['POWER', 0, 0], ['HOLD', 1, 0], ['RANGE', 0, 1], ['LUX/FC', 1, 1]].forEach(([s, c, r]) => {
      const kx = bx + 14 + c * 36, ky = by + 88 + r * 30;
      g.push(`<rect x="${X(kx)}" y="${Y(ky)}" width="30" height="17" rx="6" fill="#1A1D22" stroke="#454C57" stroke-width="0.9"/><rect x="${X(kx + 3)}" y="${Y(ky + 2)}" width="24" height="5" rx="2.5" fill="#FFFFFF" opacity="0.06"/>`
        + text(X(kx + 15), Y(ky + 11.5), s, 6.4, s === 'POWER' ? '#FF8A7A' : '#C9D3DE', 'middle', 700));
    });
    g.push(text(X(bx + bw / 2), Y(by + 168), 'LIGHT METER', 7.5, '#8B97A8', 'middle', 700, false, 'letter-spacing="1.2"'));
    g.push(`<rect x="${X(bx + 60)}" y="${Y(by - 8)}" width="16" height="10" rx="3" fill="#15181C" stroke="#4A525C" stroke-width="0.8"/>`);
    // the sensor head: a black puck on the axis, its flat white diffuser face-up; the coiled cable up to the body
    g.push(`<path d="M${X(hx - 32)},${Y(-20)} V${Y(-6)} A32,8 0 0 0 ${X(hx + 32)},${Y(-6)} V${Y(-20)} Z" fill="url(#qm-black)" stroke="#3A414B"/>`
      + `<ellipse cx="${X(hx)}" cy="${Y(-20)}" rx="32" ry="8" fill="#262B32" stroke="#4A525C"/><ellipse cx="${X(hx)}" cy="${Y(-20.5)}" rx="22" ry="5.6" fill="#121519"/>`
      + `<ellipse cx="${X(hx)}" cy="${Y(-21)}" rx="19" ry="4.6" fill="#D9D6CE"/>`
      + `<rect x="${X(hx + 30)}" y="${Y(-16)}" width="11" height="7" rx="2" fill="#15181C" stroke="#3A414B" stroke-width="0.8"/>`);
    const cd = coil([X(hx + 42), Y(-12)], [X(hx + 78), Y(-14)], [X(54), Y(-252)], [X(bx + 68), Y(by - 8)], 4.2, 30);
    g.push(`<path d="${cd}" fill="none" stroke="#0B0D10" stroke-width="2.8"/><path d="${cd}" fill="none" stroke="#5A626D" stroke-opacity="0.55" stroke-width="0.9"/>`);
    // the reading follows the light a moment later (the meter samples about twice a second), its last digit wandering
    g.push(S.g((t, a) => {
      const sample = Math.floor(a * 2.5) / 2.5, lx = on(t) > 0 ? luxAt(Math.max(aOn, sample - 0.25), aOn) * K.win(sample, aOn, 0.6) : 0;
      const v = String(Math.max(0, Math.round(lx) + (lx > 5 ? K.counts(a, 2.5, 11) : 0)));
      return { html: `<g>${seg7(X(bx + bw - 22) - K.seg7Width(v, 20), Y(by + 54), v, 20, '#14191A', { glow: false, ghost: 0.07, slant: 4 })}</g>` };
    }, ''));
    g.push(`<path d="M${X(bx + 17)},${Y(by + 20)} h22 l-14,50 h-8 z" fill="#FFFFFF" opacity="0.08"/>`);

    // the light itself, on a layer of its own (it changes all the time): the pool, the beam in the air, the lit mouth and
    // its bloom, the lit diffuser, the warm side of the body, and the shadows the lamp casts (to the right)
    const litPart = `<g clip-path="url(#qm-poolClip)"><ellipse cx="${X(hx + 8)}" cy="${Y(6)}" rx="178" ry="17" fill="url(#qm-pool)" filter="${u('soft')}"/><ellipse cx="${X(hx)}" cy="${Y(5)}" rx="74" ry="8" fill="#FFF4DE" opacity="0.55" filter="${u('soft')}"/></g>`
      + `<path d="M${X(bx + bw + 2)},${Y(-1)} L${X(bx + bw + 74)},${Y(6)} L${X(bx + bw + 62)},${Y(12)} L${X(bx + bw - 10)},${Y(7)} Z" fill="#000" opacity="0.5" filter="${u('soft')}"/><ellipse cx="${X(hx + 40)}" cy="${Y(3)}" rx="18" ry="4" fill="#000" opacity="0.4" filter="${u('soft')}"/>`
      + `<g filter="url(#qm-beamBlur)">${[[ALPHA, 0.34], [ALPHA * 0.62, 0.3], [ALPHA * 0.3, 0.36]].map(([a, o]) => `<polygon points="${P(cone(a))}" fill="url(#qm-beamG)" opacity="${o}"/>`).join('')}</g>`
      + head(`<ellipse cx="0" cy="${SL}" rx="${RM - 3}" ry="11" fill="url(#qm-mouthOn)"/><ellipse cx="0" cy="${SL - 2}" rx="19" ry="6.5" fill="#FFFFFF" filter="${u('soft')}"/><ellipse cx="0" cy="${SL}" rx="${RM}" ry="12.5" fill="none" stroke="#FFE7C0" stroke-opacity="0.5" stroke-width="1.6"/>`)
      + `<ellipse cx="${X(M[0])}" cy="${Y(M[1] + 4)}" rx="74" ry="26" fill="#FFD9A0" opacity="0.5" filter="${u('big')}"/><ellipse cx="${X(M[0])}" cy="${Y(M[1] + 2)}" rx="44" ry="10" fill="#FFF6E4" opacity="0.55" filter="${u('soft')}"/>`
      + `<ellipse cx="${X(hx)}" cy="${Y(-21)}" rx="19" ry="4.6" fill="#FFF8EA"/><ellipse cx="${X(hx)}" cy="${Y(-21)}" rx="26" ry="8" fill="#FFF1D6" opacity="0.55" filter="${u('soft')}"/><path d="M${X(hx - 31)},${Y(-19)} V${Y(-7)}" stroke="#FFE2B0" stroke-opacity="0.5" stroke-width="2"/>`
      + `<rect x="${X(bx)}" y="${Y(by)}" width="${bw}" height="${bh}" rx="18" fill="url(#qm-warmSide)"/><ellipse cx="${X(-116)}" cy="${Y(-14)}" rx="34" ry="6" fill="#FFE2B0" opacity="0.35"/>`;
    top(S.g(K.appear(t0, 0.55, 26), S.g((t, a) => ({ opacity: bright(t, a).toFixed(3) }), litPart)));
    // dust in the beam, catching the light (it drifts; it is there whether we look or not)
    top(S.g(K.appear(t0, 0.55, 26), S.g((t, a) => {
      const o = bright(t, a); if (o <= 0.01) return { html: '' };
      let h = '';
      for (let k = 0; k < 16; k++) {
        const uu = (K.rnd(k, 1) * 2 - 1) * 0.85 + 0.06 * Math.sin(a * 0.23 + 2 * k), vv = 0.12 + 0.8 * K.rnd(k, 2) + 0.04 * Math.sin(a * 0.31 + k);
        const s0 = VB / Math.cos(uu * ALPHA), s1 = -V[1] / Math.cos(PHI + uu * ALPHA), [x, y] = ray(uu * ALPHA, s0 + (s1 - s0) * vv);
        const op = o * (1 - Math.abs(uu) * 0.7) * (1 - 0.5 * vv) * (0.35 + 0.65 * (0.5 + 0.5 * Math.sin(a * 1.3 + k * 2.1)));
        h += `<circle cx="${X(x)}" cy="${Y(y)}" r="${(1 + 0.9 * K.rnd(k, 4)).toFixed(1)}" fill="#FFF3DA" opacity="${op.toFixed(3)}"/>`;
      }
      return { html: `<g filter="${u('soft')}">${h}</g>` };
    }, '')));
    return g.join('');
  }
  // a backlit grey LCD, as on handheld instruments: dark digits with faint ghosts, the unit small at the lower right
  function lcdG(x, y, w, h, s, size, unit) {
    return `<rect x="${x - 4}" y="${y - 4}" width="${w + 8}" height="${h + 8}" rx="5" fill="#0A0C0F" stroke="#3A414B" stroke-width="0.8"/><rect x="${x}" y="${y}" width="${w}" height="${h}" rx="3" fill="url(#qm-lcdBack)"/>`
      + seg7(x + w - 6 - K.seg7Width(s, size), y + (unit ? h * 0.68 : h / 2 + size / 2), s, size, '#14191A', { glow: false, ghost: 0.07, slant: 4 })
      + (unit ? text(x + w - 5, y + h - 3.5, unit, Math.max(7, size * 0.38), '#1B2220', 'end', 700) : '')
      + `<path d="M${x},${y} h${(w * 0.3).toFixed(1)} l${(-w * 0.15).toFixed(1)},${h} h${(-w * 0.15).toFixed(1)} z" fill="#FFFFFF" opacity="0.08"/>`;
  }
  const keyRow = (X, Y, x, y, labels, w = 26, gap = 6, h = 14) => labels.map((s, i) => {
    const kx = x + i * (w + gap);
    return `<rect x="${X(kx)}" y="${Y(y)}" width="${w}" height="${h}" rx="5" fill="#1A1D22" stroke="#454C57" stroke-width="0.9"/><rect x="${X(kx + 3)}" y="${Y(y + 2)}" width="${w - 6}" height="4" rx="2" fill="#FFFFFF" opacity="0.06"/>`
      + text(X(kx + w / 2), Y(y + h * 0.68), s, 6.2, s === 'ON' || s === 'POWER' ? '#FF8A7A' : '#C9D3DE', 'middle', 700);
  }).join('');
  const at = (cx, fl) => [x => +(cx + x).toFixed(1), y => +(fl + y).toFixed(1)];

  // card 02 (owner, 2026-10-08: "the spectrometer too can slowly change the light color and the spectrum shift to the set
  // color accordingly"). A tunable light source on the bench (its set wavelength on its own display) shines into a fibre
  // probe; the fibre runs to a compact spectrometer, and its USB lead to the monitor behind, where the live spectrum shows
  // one peak (≈ 12 nm wide) that moves as the source is tuned slowly from 430 to 650 nm and back. The light, the peak's
  // colour and the measured peak (to 0.1 nm, its last digit wandering) all follow the set wavelength.
  function nmRGB(l) {                    // a wavelength's colour as sRGB (after Bruton's approximation)
    let r = 0, g = 0, b = 0;
    if (l < 440) { r = (440 - l) / 60; b = 1; } else if (l < 490) { g = (l - 440) / 50; b = 1; } else if (l < 510) { g = 1; b = (510 - l) / 20; }
    else if (l < 580) { r = (l - 510) / 70; g = 1; } else if (l < 645) { r = 1; g = (645 - l) / 65; } else r = 1;
    const f = l < 420 ? 0.3 + 0.7 * (l - 380) / 40 : l > 700 ? 0.3 + 0.7 * (780 - l) / 80 : 1;
    const h = v => Math.round(255 * Math.pow(Math.max(0, v) * f, 0.8)).toString(16).padStart(2, '0');
    return '#' + h(r) + h(g) + h(b);
  }
  const SWEEP = (a, a0) => 540 - 110 * Math.cos(2 * Math.PI * Math.max(0, a - a0) / 18);   // nm: 430 → 650 → 430 every 18 s
  function colour(cx, fl, t0) {
    const g = [], [X, Y] = at(cx, fl);
    const aOn = t0 + 0.4, on = t => K.win(t, aOn, 0.4), lam = a => SWEEP(a, aOn);
    const PX0 = -150, PX1 = 158, PY0 = -408, PY1 = -284, XL = l => PX0 + (PX1 - PX0) * (l - 400) / 300;
    g.push(`<defs><linearGradient id="qm-spec" gradientUnits="userSpaceOnUse" x1="${X(PX0)}" y1="0" x2="${X(PX1)}" y2="0">`
      + Array.from({ length: 13 }, (_, i) => `<stop offset="${(i / 12).toFixed(3)}" stop-color="${nmRGB(400 + 25 * i)}"/>`).join('') + `</linearGradient>`
      + `<filter id="qm-cBlur" filterUnits="userSpaceOnUse" x="${X(-120)}" y="${Y(-140)}" width="200" height="180"><feGaussianBlur stdDeviation="4"/></filter></defs>`);
    // the USB lead from the spectrometer, up behind the monitor
    g.push(`<path d="M${X(168)},${Y(-64)} C${X(186)},${Y(-140)} ${X(150)},${Y(-200)} ${X(116)},${Y(-246)}" fill="none" stroke="#0B0D10" stroke-width="4" stroke-linecap="round"/>`);
    // the monitor: stand, bezel, screen, the plot's grid and axis
    g.push(`<path d="M${X(-14)},${Y(-240)} h28 l6,170 h-40 z" fill="url(#qm-black)" stroke="#3A414B"/><ellipse cx="${X(0)}" cy="${Y(-66)}" rx="74" ry="9" fill="#1E2228" stroke="#4A525C"/><ellipse cx="${X(-10)}" cy="${Y(-68)}" rx="40" ry="3" fill="#FFFFFF" opacity="0.06"/>`
      + `<rect x="${X(-180)}" y="${Y(-456)}" width="360" height="222" rx="10" fill="#0E1014" stroke="#3A414B" stroke-width="1.4"/><rect x="${X(-172)}" y="${Y(-448)}" width="344" height="200" rx="3" fill="#04070A"/>`
      + `<circle cx="${X(0)}" cy="${Y(-241)}" r="1.6" fill="#2EE6C5" opacity="0.8"/>`);
    for (let k = 0; k <= 4; k++) g.push(`<line x1="${X(PX0)}" y1="${Y(PY1 - k * (PY1 - PY0) / 4)}" x2="${X(PX1)}" y2="${Y(PY1 - k * (PY1 - PY0) / 4)}" stroke="#14222E" stroke-width="0.8"/>`);
    for (let l = 450; l <= 650; l += 50) g.push(`<line x1="${X(XL(l))}" y1="${Y(PY0)}" x2="${X(XL(l))}" y2="${Y(PY1)}" stroke="#14222E" stroke-width="0.8"/>`);
    g.push(`<line x1="${X(PX0)}" y1="${Y(PY1)}" x2="${X(PX1)}" y2="${Y(PY1)}" stroke="#4A5868" stroke-width="1"/><line x1="${X(PX0)}" y1="${Y(PY0)}" x2="${X(PX0)}" y2="${Y(PY1)}" stroke="#4A5868" stroke-width="1"/>`);
    for (let l = 400; l <= 700; l += 100) g.push(text(X(XL(l)), Y(PY1 + 14), String(l), 10, '#8FA0B5', 'middle', 600));
    g.push(text(X((PX0 + PX1) / 2), Y(PY1 + 28), 'wavelength, nm', 9.5, '#6F7F92', 'middle', 500) + text(X(PX0), Y(PY0 - 22), 'SPECTRUM · live', 9.5, '#8FA0B5', 'start', 700, false, 'letter-spacing="0.8"')
      + text(X(PX0 - 6), Y(PY0 + 4), 'counts', 8.5, '#6F7F92', 'end', 500, false, `transform="rotate(-90 ${X(PX0 - 6)} ${Y(PY0 + 4)})"`));
    g.push(`<path d="M${X(-172)},${Y(-448)} h120 l-60,200 h-60 z" fill="#FFFFFF" opacity="0.025"/>`);

    // the tunable source: a bench box, its own display of the set wavelength, the tuning knob, its output port
    g.push(`<rect x="${X(-184)}" y="${Y(-100)}" width="126" height="98" rx="8" fill="url(#qm-blackV)" stroke="#4A525C" stroke-width="1.2"/>`
      + `<rect x="${X(-178)}" y="${Y(-94)}" width="114" height="86" rx="5" fill="#22262D" stroke="#0E1014"/>`
      + `<rect x="${X(-172)}" y="${Y(-88)}" width="62" height="26" rx="3" fill="url(#qm-lcd)" stroke="#000"/>`
      + `<circle cx="${X(-86)}" cy="${Y(-74)}" r="13" fill="url(#qm-knob)" stroke="#5A626D"/><line x1="${X(-86)}" y1="${Y(-74)}" x2="${X(-86)}" y2="${Y(-85)}" stroke="#C9D3DE" stroke-width="1.6" stroke-linecap="round"/>`
      + text(X(-86), Y(-52), 'λ TUNE', 6.5, '#8B97A8', 'middle', 700) + text(X(-172), Y(-44), 'TUNABLE SOURCE', 6.8, '#8B97A8', 'start', 700, false, 'letter-spacing="0.6"')
      + `<circle cx="${X(-168)}" cy="${Y(-24)}" r="3" fill="#3BE36A" filter="${u('soft')}"/>` + text(X(-160), Y(-21.5), 'ON', 6.5, '#8B97A8', 'start', 700)
      + `<rect x="${X(-176)}" y="${Y(-4)}" width="16" height="4" fill="#0A0C0F"/><rect x="${X(-82)}" y="${Y(-4)}" width="16" height="4" fill="#0A0C0F"/>`
      + `<rect x="${X(-58)}" y="${Y(-76)}" width="18" height="20" rx="2" fill="url(#qm-chrome)" stroke="#5B636E" stroke-width="0.8"/><ellipse cx="${X(-40)}" cy="${Y(-66)}" rx="3.5" ry="8" fill="#0A0C0F"/>`);
    // the fibre probe on its post, the fibre (orange jacket) to the spectrometer
    g.push(`<ellipse cx="${X(14)}" cy="${Y(-4)}" rx="22" ry="5" fill="#1E2228" stroke="#4A525C"/><rect x="${X(11)}" y="${Y(-58)}" width="6" height="54" fill="url(#qm-chrome)"/>`
      + `<rect x="${X(0)}" y="${Y(-76)}" width="28" height="20" rx="2" fill="url(#qm-blackV)" stroke="#4A525C"/><ellipse cx="${X(0)}" cy="${Y(-66)}" rx="3.5" ry="9" fill="#2A3A48" stroke="#8FA0B5" stroke-width="0.8"/>`
      + `<rect x="${X(28)}" y="${Y(-70)}" width="10" height="8" fill="url(#qm-brass)"/>`);
    const fib = `M${X(38)},${Y(-66)} C${X(66)},${Y(-66)} ${X(46)},${Y(-30)} ${X(70)},${Y(-30)}`;
    g.push(`<path d="${fib}" fill="none" stroke="#B4561A" stroke-width="4.4" stroke-linecap="round"/><path d="${fib}" fill="none" stroke="#FFB27A" stroke-opacity="0.55" stroke-width="1.2"/>`);
    // the compact spectrometer: an anodised box, its fibre port, a status light
    g.push(`<rect x="${X(76)}" y="${Y(-66)}" width="106" height="64" rx="6" fill="url(#qm-blackV)" stroke="#4A525C" stroke-width="1.2"/><rect x="${X(80)}" y="${Y(-62)}" width="98" height="5" rx="2.5" fill="#FFFFFF" opacity="0.07"/>`
      + `<rect x="${X(68)}" y="${Y(-34)}" width="8" height="8" fill="url(#qm-brass)"/>` + text(X(129), Y(-30), 'SPECTROMETER', 7, '#8B97A8', 'middle', 700, false, 'letter-spacing="0.8"')
      + `<circle cx="${X(170)}" cy="${Y(-14)}" r="2.6" fill="#3BE36A" filter="${u('soft')}"/><rect x="${X(160)}" y="${Y(-70)}" width="14" height="5" rx="1" fill="#0A0C0F"/>`);
    // the light (its colour changes as the source is tuned): the lit port, the beam into the probe, its glow on the bench
    top(S.g(K.appear(t0, 0.55, 26), S.g((t, a) => {
      const o = on(t); if (o <= 0) return { html: '' };
      const c = nmRGB(lam(a));
      return { html: `<g opacity="${o.toFixed(3)}"><ellipse cx="${X(-21)}" cy="${Y(4)}" rx="46" ry="5" fill="${c}" opacity="0.4" filter="${u('soft')}"/>`
        + `<g filter="url(#qm-cBlur)"><polygon points="${X(-40)},${Y(-73)} ${X(0)},${Y(-75)} ${X(0)},${Y(-57)} ${X(-40)},${Y(-59)}" fill="${c}" opacity="0.55"/></g>`
        + `<polygon points="${X(-40)},${Y(-69)} ${X(0)},${Y(-70)} ${X(0)},${Y(-62)} ${X(-40)},${Y(-63)}" fill="${c}" opacity="0.6"/>`
        + `<ellipse cx="${X(-40)}" cy="${Y(-66)}" rx="3.5" ry="8" fill="${c}"/><ellipse cx="${X(-40)}" cy="${Y(-66)}" rx="14" ry="16" fill="${c}" opacity="0.5" filter="${u('big')}"/>`
        + `<ellipse cx="${X(0)}" cy="${Y(-66)}" rx="3.5" ry="9" fill="${c}" opacity="0.7"/></g>` };
    }, '')));
    // the source's display (set) and the live spectrum with its measured peak (the spectrometer integrates for 0.1 s)
    top(S.g(K.appear(t0, 0.55, 26), S.g((t, a) => {
      const o = on(t), l0 = lam(a), set = String(Math.round(l0));
      let h = seg7(X(-126) - K.seg7Width(set, 13), Y(-68), set, 13, TEAL) + text(X(-123), Y(-68), 'nm', 7, TEAL, 'start', 700);
      if (o > 0) {
        const as = Math.floor(a * 10) / 10, lm = lam(as), amp = 0.86 * o;
        let d = '';
        for (let l = 400; l <= 700; l += 1.5) {
          const I = 0.035 + 0.02 * (K.rnd(Math.round(l * 2) + Math.round(as * 10) * 1009, 5) - 0.5) + amp * Math.exp(-0.5 * Math.pow((l - lm) / 5.1, 2));
          d += (d ? ' L' : 'M') + X(XL(l)) + ',' + (Y(PY1) - (PY1 - PY0) * 0.92 * I).toFixed(1);
        }
        const pk = (lm + 0.1 * K.counts(a, 4, 41)).toFixed(1), c = nmRGB(lm);
        h += `<path d="${d} L${X(PX1)},${Y(PY1)} L${X(PX0)},${Y(PY1)} Z" fill="url(#qm-spec)" opacity="0.6"/>${neon(d, '#FFFFFF', 1.3, 'soft', { op: 0.9 })}`
          + `<line x1="${X(XL(lm))}" y1="${Y(PY0)}" x2="${X(XL(lm))}" y2="${Y(PY1)}" stroke="${c}" stroke-width="1" stroke-dasharray="3 3" opacity="0.7"/>`
          + text(X(PX1), Y(PY0 - 22), `peak ${pk} nm`, 11, c, 'end', 700, true);
      }
      return { html: h };
    }, '')));
    return g.join('');
  }

  // card 03 (owner, 2026-10-08: the last digit must wander like the other meters'; "keep changing the weight by gradually
  // increasing it"). Calibration weights set down one after another on a precision balance (1 kg, 500 g, 200 g, 200 g,
  // 100 g: 2000.0 g). Each landing rings the reading, which settles with its last digit wandering a count; after a pause
  // they are lifted off together and it starts again.
  const WSET = [[1000, -88, 34, 72, '1 kg'], [500, -18, 27, 58, '500 g'], [200, 36, 20, 44, '200 g'], [200, 76, 20, 44, '200 g'], [100, 113, 15, 34, '100 g']];
  const W_STEP = 2.4, W_HOLD = 3.2, W_LIFT = 0.9, W_CYC = WSET.length * W_STEP + W_HOLD + W_LIFT;   // 16.1 s a round
  function weight(cx, fl, t0) {
    const g = [], [X, Y] = at(cx, fl);
    g.push(`<rect x="${X(-140)}" y="${Y(-10)}" width="24" height="10" rx="2" fill="#0A0C0F"/><rect x="${X(116)}" y="${Y(-10)}" width="24" height="10" rx="2" fill="#0A0C0F"/>`);
    g.push(`<path d="M${X(-152)},${Y(-10)} h304 l-12,-98 h-280 z" fill="url(#qm-blackV)" stroke="#4A525C" stroke-width="1.2"/><path d="M${X(-140)},${Y(-108)} h280" stroke="#FFFFFF" stroke-opacity="0.12"/>`);
    g.push(`<rect x="${X(-134)}" y="${Y(-94)}" width="268" height="74" rx="6" fill="#1A1E24" stroke="#0A0C0F"/>`);
    const a0 = t0 + 0.35, cyc = t => t < a0 ? -1 : (t - a0) % W_CYC;
    const lift = u => u < 0 ? 0 : K.clamp((u - (W_CYC - W_LIFT)) / W_LIFT);
    const drop = (u, i) => { if (u < 0) return 0; const e = K.clamp((u - i * W_STEP) / 0.4); return e * e; };   // lowered, let go the last few mm
    g.push(S.g(t => {
      const u = cyc(t), L = lift(u); let v = 0, since = 99;
      WSET.forEach(([m], i) => { const dt = u - i * W_STEP - 0.4; if (u >= 0 && dt > 0) { v += m * (1 + 0.06 * Math.exp(-dt * 5) * Math.cos(dt * 22)) * Math.min(1, dt / 0.08); since = Math.min(since, dt); } });
      v *= 1 - L;
      if (v > 1 && L === 0 && since > 0.9) v += 0.1 * K.counts(t, 2.5, 23, 1);
      return { html: lcd(X(-46), Y(-60), 168, 50, (Math.round(v * 10) / 10).toFixed(1), 'g', TEAL, 27) };
    }, ''));
    g.push(keyRow(X, Y, 50, -86, ['ON', 'ZERO']) + keyRow(X, Y, 50, -62, ['TARE', 'UNIT']) + text(X(-128), Y(-27), 'PRECISION BALANCE · d = 0.1 g · Max 3100 g', 6.5, '#6F7F92', 'start', 600));
    g.push(`<ellipse cx="${X(118)}" cy="${Y(-104)}" rx="9" ry="3.2" fill="#0A0C0F" stroke="#5A626D" stroke-width="0.8"/><ellipse cx="${X(119)}" cy="${Y(-104.4)}" rx="3" ry="1.4" fill="#BFF5E9" opacity="0.8"/>`);
    // the pan on its support
    g.push(`<rect x="${X(-22)}" y="${Y(-120)}" width="44" height="12" fill="#1E2228"/>`
      + `<path d="M${X(-142)},${Y(-120)} h284 l10,-9 h-304 z" fill="url(#qm-chrome)" stroke="#5B636E" stroke-width="0.8"/><rect x="${X(-142)}" y="${Y(-120)}" width="284" height="4" fill="#6B7480"/>`);
    // the weights: stainless, knob-topped, their denominations engraved
    WSET.forEach(([m, x, r, h, label], i) => {
      const ry = r * 0.19, yb = -132, yt = yb - h, nw = r * 0.52, nh = r * 0.36, kw = r * 1.12, kh = r * 0.52;
      const shown = u => u < 0 ? 0 : K.clamp((u - i * W_STEP + 0.3) / 0.3) * (1 - lift(u));
      g.push(S.g(t => { const u = cyc(t); return { opacity: (shown(u) * (0.4 + 0.6 * drop(u, i))).toFixed(3) }; }, `<ellipse cx="${X(x)}" cy="${Y(-129)}" rx="${(r * 1.2).toFixed(1)}" ry="${(ry + 1.5).toFixed(1)}" fill="#000" opacity="0.45" filter="${u('soft')}"/>`));
      g.push(S.g(t => { const u = cyc(t); return { opacity: shown(u).toFixed(3), transform: `translate(0 ${(-(1 - drop(u, i)) * 60 - lift(u) * 80).toFixed(1)})` }; },
        `<path d="M${X(x - r)},${Y(yt)} V${Y(yb)} A${r},${ry.toFixed(1)} 0 0 0 ${X(x + r)},${Y(yb)} V${Y(yt)} Z" fill="url(#qm-chrome)" stroke="#5B636E" stroke-width="0.8"/>`
        + `<ellipse cx="${X(x)}" cy="${Y(yt)}" rx="${r}" ry="${ry.toFixed(1)}" fill="#DCE3EA" stroke="#5B636E" stroke-width="0.8"/><ellipse cx="${X(x)}" cy="${Y(yt)}" rx="${(r * 0.86).toFixed(1)}" ry="${(ry * 0.8).toFixed(1)}" fill="none" stroke="#9AA4AF" stroke-width="0.9"/>`
        + `<path d="M${X(x - nw / 2)},${Y(yt - nh)} V${Y(yt)} A${(nw / 2).toFixed(1)},${(ry * 0.3).toFixed(1)} 0 0 0 ${X(x + nw / 2)},${Y(yt)} V${Y(yt - nh)} Z" fill="url(#qm-chrome)"/>`
        + `<rect x="${X(x - kw / 2)}" y="${Y(yt - nh - kh)}" width="${kw.toFixed(1)}" height="${kh.toFixed(1)}" rx="${(kh * 0.45).toFixed(1)}" fill="url(#qm-chrome)" stroke="#5B636E" stroke-width="0.8"/><ellipse cx="${X(x)}" cy="${Y(yt - nh - kh + 1)}" rx="${(kw * 0.36).toFixed(1)}" ry="${(kh * 0.14).toFixed(1)}" fill="#F2F5F8" opacity="0.8"/>`
        + `<rect x="${X(x - r * 0.74)}" y="${Y(yt + 4)}" width="${(r * 0.2).toFixed(1)}" height="${h - 10}" rx="${(r * 0.1).toFixed(1)}" fill="#FFFFFF" opacity="0.25"/>`
        + text(X(x), Y(yt + h * 0.56), label, Math.max(8, r * 0.48), '#2A3038', 'middle', 700)));
    });
    return g.join('');
  }
  // card 04 (95 % reality): a finned motor on its feet turns a coupling hub with a strip of reflective tape; seen side-on,
  // the tape sweeps across the hub's face (top to bottom) as it turns. An optical sensor on a magnetic stand aims its
  // laser at the hub; each pass of the tape flashes the spot, and the tachometer (its sensor on a cable) counts them:
  // 1800 rpm, the last digit wandering. Rotation slowed on the stage.
  function speed(cx, fl, t0) {
    const g = [], [X, Y] = at(cx, fl);
    const SY = -112, HX0 = 0, HX1 = 36, HR = 32;            // the shaft's line; the hub's ends and radius
    g.push(`<defs><linearGradient id="qm-chromeV" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#4A525C"/><stop offset="0.25" stop-color="#E9EEF3"/><stop offset="0.45" stop-color="#A9B3BE"/><stop offset="0.75" stop-color="#D5DCE4"/><stop offset="1" stop-color="#3E464F"/></linearGradient>`
      + `<linearGradient id="qm-motor" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#3A4A5C"/><stop offset="0.3" stop-color="#5D7286"/><stop offset="0.55" stop-color="#2E3B49"/><stop offset="1" stop-color="#141B23"/></linearGradient>`
      + `<clipPath id="qm-hub"><rect x="${X(HX0)}" y="${Y(SY - HR)}" width="${HX1 - HX0}" height="${2 * HR}"/></clipPath></defs>`);
    // the motor: base plate, feet, finned frame, end bells, fan cowl, terminal box
    g.push(`<rect x="${X(-182)}" y="${Y(-12)}" width="128" height="12" rx="2" fill="url(#qm-blackV)" stroke="#4A525C"/>`
      + `<path d="M${X(-168)},${Y(-12)} v${SY + 58} h26 v${-(SY + 58)} z M${X(-96)},${Y(-12)} v${SY + 58} h26 v${-(SY + 58)} z" fill="#1E2833" stroke="#3A4A5C"/>`
      + `<rect x="${X(-160)}" y="${Y(SY - 54)}" width="96" height="108" rx="6" fill="url(#qm-motor)" stroke="#0E141B"/>`);
    for (let k = -4; k <= 4; k++) g.push(`<line x1="${X(-158)}" y1="${Y(SY + k * 11.5)}" x2="${X(-66)}" y2="${Y(SY + k * 11.5)}" stroke="#0E141B" stroke-width="2.2" opacity="${(0.7 - Math.abs(k) * 0.05).toFixed(2)}"/><line x1="${X(-158)}" y1="${Y(SY + k * 11.5 - 2)}" x2="${X(-66)}" y2="${Y(SY + k * 11.5 - 2)}" stroke="#7F95AA" stroke-width="0.8" opacity="0.35"/>`);
    g.push(`<rect x="${X(-66)}" y="${Y(SY - 48)}" width="14" height="96" rx="4" fill="url(#qm-motor)" stroke="#0E141B"/><rect x="${X(-174)}" y="${Y(SY - 48)}" width="16" height="96" rx="4" fill="url(#qm-motor)" stroke="#0E141B"/>`
      + `<path d="M${X(-174)},${Y(SY - 46)} q-14,0 -14,14 v64 q0,14 14,14 z" fill="#1E2833" stroke="#0E141B"/>`);
    for (let k = 0; k < 6; k++) g.push(`<line x1="${X(-185)}" y1="${Y(SY - 26 + k * 10)}" x2="${X(-176)}" y2="${Y(SY - 26 + k * 10)}" stroke="#05080B" stroke-width="2"/>`);
    g.push(`<rect x="${X(-132)}" y="${Y(SY - 76)}" width="40" height="22" rx="3" fill="url(#qm-motor)" stroke="#0E141B"/><circle cx="${X(-100)}" cy="${Y(SY - 65)}" r="4" fill="#1A1D22" stroke="#4A525C"/>`
      + `<rect x="${X(-150)}" y="${Y(SY + 26)}" width="40" height="16" rx="2" fill="#C9CFD6" opacity="0.85"/>` + text(X(-130), Y(SY + 36.5), '1500 W', 6.5, '#2A3038', 'middle', 700));
    // the shaft and the hub
    g.push(`<rect x="${X(-52)}" y="${Y(SY - 9)}" width="54" height="18" fill="url(#qm-chromeV)" stroke="#5B636E" stroke-width="0.6"/>`
      + `<rect x="${X(HX0)}" y="${Y(SY - HR)}" width="${HX1 - HX0}" height="${2 * HR}" rx="3" fill="url(#qm-chromeV)" stroke="#5B636E" stroke-width="0.8"/>`
      + `<ellipse cx="${X(HX1)}" cy="${Y(SY)}" rx="5" ry="${HR}" fill="#9AA4AF" stroke="#5B636E" stroke-width="0.8"/><ellipse cx="${X(HX1)}" cy="${Y(SY)}" rx="2.4" ry="9" fill="#3E464F"/>`);
    g.push(text(X(18), Y(SY - HR - 12), 'rotation slowed', 11, '#8FA0B5', 'middle', 500));
    // the tape: a strip round the hub, angle φ from the front (seen side-on, it moves down the face as the hub turns)
    const turn = a => 2 * Math.PI * K.loop(a, 0.9), TAPE = 0.38;      // one turn every 0.9 s on the stage (really 30 a second)
    const face = phi => SY - HR * Math.sin(phi);                            // the face's height for an angle (φ = 0 faces us)
    top(S.g(K.appear(t0, 0.55, 26), `<g clip-path="url(#qm-hub)">${S.g((t, a) => {
      let th = turn(a); th = ((th + Math.PI) % (2 * Math.PI)) - Math.PI;    // −π … π, φ = π/2 at the top
      const p0 = Math.PI / 2 - th - TAPE / 2, p1 = p0 + TAPE, lo = Math.max(p0, -Math.PI / 2), hi = Math.min(p1, Math.PI / 2);
      if (hi <= lo) return { html: '' };
      const y0 = face(hi), y1 = face(lo), sh = Math.cos((lo + hi) / 2);
      return { html: `<rect x="${X(HX0 + 8)}" y="${Y(y0).toFixed(1)}" width="20" height="${Math.max(0.6, y1 - y0).toFixed(1)}" fill="#F4F2EC" opacity="${(0.55 + 0.45 * sh).toFixed(2)}"/>` };
    }, '')}</g>`));
    // the optical sensor on its magnetic stand, aimed at the hub's lower front
    const T = [HX0 + 18, SY + HR * Math.sin(50 * Math.PI / 180)], S0 = [98, -66];
    const ux = T[0] - S0[0], uy = T[1] - S0[1], uL = Math.hypot(ux, uy), U = [ux / uL, uy / uL], ang = Math.atan2(U[1], U[0]) * 180 / Math.PI;
    const F = [S0[0] + U[0] * 30, S0[1] + U[1] * 30], B = [S0[0] - U[0] * 18, S0[1] - U[1] * 18];
    g.push(`<rect x="${X(72)}" y="${Y(-26)}" width="50" height="24" rx="3" fill="url(#qm-blackV)" stroke="#4A525C"/><rect x="${X(72)}" y="${Y(-8)}" width="50" height="6" fill="#8A939E"/><circle cx="${X(110)}" cy="${Y(-17)}" r="4" fill="#C8302A" stroke="#5A1A18"/>`
      + `<rect x="${X(96)}" y="${Y(S0[1] + 4)}" width="5" height="${-26 - S0[1] - 4}" fill="url(#qm-chrome)"/><rect x="${X(92)}" y="${Y(S0[1] + 4)}" width="13" height="10" rx="2" fill="#1A1D22" stroke="#4A525C"/>`);
    const cab = `M${X(B[0])},${Y(B[1])} C${X(B[0] + 24)},${Y(B[1] + 6)} ${X(150)},${Y(-200)} ${X(152)},${Y(-152)}`;
    g.push(`<path d="${cab}" fill="none" stroke="#0B0D10" stroke-width="3"/>`);
    g.push(`<g transform="translate(${X(S0[0])} ${Y(S0[1])}) rotate(${ang.toFixed(2)})"><rect x="-18" y="-9" width="44" height="18" rx="4" fill="url(#qm-blackV)" stroke="#4A525C"/><rect x="24" y="-10" width="7" height="20" rx="2" fill="url(#qm-chrome)"/><circle cx="31" cy="0" r="3.4" fill="#5A1A18" stroke="#FF6B5A" stroke-width="0.8"/><rect x="-14" y="-7" width="30" height="3" rx="1.5" fill="#FFFFFF" opacity="0.08"/></g>`);
    g.push(neon(`M${X(F[0])},${Y(F[1])} L${X(T[0])},${Y(T[1])}`, '#FF3B30', 1.6, 'glow', { op: 0.85 }));
    top(S.g(K.appear(t0, 0.55, 26), S.g((t, a) => {
      const th = turn(a), phiT = -50 * Math.PI / 180, tape = Math.PI / 2 - th;     // the tape's centre angle; it passes φT once a turn
      let dphi = ((tape - phiT) % (2 * Math.PI) + 3 * Math.PI) % (2 * Math.PI) - Math.PI;
      const hit = Math.abs(dphi) < TAPE / 2 + 0.05;
      return { opacity: hit ? 1 : 0.5, transform: `translate(${X(T[0])} ${Y(T[1])}) scale(${hit ? 2.4 : 1})` };
    }, `<circle r="3.2" fill="#FF6B5A" filter="${u('soft')}"/>`)));
    // the tachometer: a handheld body standing on its kickstand, grey LCD, keys
    const tx = 126, ty = -152, tw = 58, th = 150;
    g.push(`<rect x="${X(tx)}" y="${Y(ty)}" width="${tw}" height="${th}" rx="14" fill="url(#qm-blackV)" stroke="#4A525C" stroke-width="1.3"/><rect x="${X(tx + 6)}" y="${Y(ty + 6)}" width="${tw - 12}" height="${th - 12}" rx="10" fill="#2B3037" stroke="#121519"/>`
      + `<rect x="${X(tx + 20)}" y="${Y(ty - 6)}" width="14" height="8" rx="2" fill="#15181C" stroke="#4A525C" stroke-width="0.8"/>`
      + keyRow(X, Y, tx + 8, ty + 70, ['MEAS', 'MEM'], 19, 4, 13) + keyRow(X, Y, tx + 8, ty + 90, ['MAX', 'ON'], 19, 4, 13)
      + text(X(tx + tw / 2), Y(ty + 124), 'TACHOMETER', 6.4, '#8B97A8', 'middle', 700, false, 'letter-spacing="0.6"'));
    g.push(S.g(t => ({ html: lcdG(X(tx + 9), Y(ty + 14), tw - 18, 40, String(Math.round(1800 * K.win(t, t0 + 0.6, 0.8) + (t > t0 + 1.4 ? 2 * K.counts(t, 1.6, 13) : 0))), 13, 'rpm') }), ''));
    return g.join('');
  }

  // card 05 (95 % reality; owner, 2026-10-08: "the probe … is not properly aligned", then "increase the temperature slowly
  // from ice to boiling"). Water in a lab beaker on a hotplate, from ice water to a rolling boil and round again. A
  // thermocouple probe, its stem and handle on one straight axis, clipped at the rim, its tip in the water clear of the
  // bottom (the stem below the surface shifted a little by refraction); its cable runs to the thermometer on the bench.
  function hot(cx, fl, t0) {
    const g = [], [X, Y] = at(cx, fl);
    const BX = -40, BW = 150, BT = -244, BB = -74, WS = -196;           // the beaker: centre, width, rim, bottom; the water's surface
    const bl = BX - BW / 2, br = BX + BW / 2;
    // the hotplate: body, controls, ceramic top
    g.push(`<rect x="${X(-152)}" y="${Y(-66)}" width="224" height="64" rx="7" fill="url(#qm-blackV)" stroke="#4A525C" stroke-width="1.2"/><rect x="${X(-146)}" y="${Y(-58)}" width="212" height="50" rx="4" fill="#E2E4E6" opacity="0.92"/>`
      + `<circle cx="${X(-118)}" cy="${Y(-33)}" r="13" fill="url(#qm-knob)" stroke="#5A626D"/><line x1="${X(-118)}" y1="${Y(-33)}" x2="${X(-110)}" y2="${Y(-43)}" stroke="#E6EDF5" stroke-width="1.6"/>`
      + `<circle cx="${X(-80)}" cy="${Y(-33)}" r="13" fill="url(#qm-knob)" stroke="#5A626D"/><line x1="${X(-80)}" y1="${Y(-33)}" x2="${X(-80)}" y2="${Y(-46)}" stroke="#E6EDF5" stroke-width="1.6"/>`
      + text(X(-118), Y(-12), 'HEAT', 6.5, '#2A3038', 'middle', 700) + text(X(-80), Y(-12), 'STIR', 6.5, '#2A3038', 'middle', 700)
      + `<circle cx="${X(40)}" cy="${Y(-36)}" r="3.4" fill="#FF9A2A" filter="${u('soft')}"/>` + text(X(40), Y(-20), 'HOT', 6.5, '#2A3038', 'middle', 700)
      + `<rect x="${X(-150)}" y="${Y(-74)}" width="220" height="9" rx="3" fill="url(#qm-ceramic)" stroke="#8A939E" stroke-width="0.6"/>`);
    // the water's round (owner, 2026-10-08: "increase the temperature slowly from ice to boiling (100 degrees)"): ice
    // melting at 0 °C (the temperature holds while ice is left), heated to the boil, boiling at 100 °C, then a fresh
    // beaker of ice water. What shows follows the temperature: condensation on the cold glass; air bubbles on the glass
    // as it warms; a shimmer of rising warm water; bubbles forming on the bottom and collapsing from about 85 °C; a
    // rolling boil at 100 °C; vapour growing from faint wisps to steam.
    const aS = t0 + 0.6, HP = 32, ramp = (v, a, b) => K.clamp((v - a) / (b - a));
    const st = t => {
      if (t < aS) return { u: 0, T: 0 };
      const uu = (t - aS) % HP;
      return { u: uu, T: uu < 5 ? 0 : Math.min(100, 135 * (1 - Math.exp(-(uu - 5) / 13.33))) };   // reaches 100 °C at 23 s
    };
    const boilOf = (u, T) => T >= 99.95 ? K.clamp((u - 23) / 1.5) : 0;
    const fresh = u => K.clamp(u / 0.5) * K.clamp((HP - u) / 0.6);
    g.push(`<path d="M${X(bl + 3)},${Y(WS)} V${Y(BB - 8)} q0,7 8,7 H${X(br - 11)} q8,0 8,-7 V${Y(WS)} Z" fill="url(#qm-water)"/><ellipse cx="${X(BX)}" cy="${Y(WS)}" rx="${BW / 2 - 3}" ry="5" fill="#8FD0F0" opacity="0.28"/>`);
    top(S.g(K.appear(t0, 0.55, 26), S.g((t, a) => {
      const { u, T } = st(t), f = fresh(u), boil = boilOf(u, T), ice = K.clamp(1 - u / 5);
      const air = ramp(T, 30, 60) * (1 - ramp(T, 95, 100)), nuc = ramp(T, 82, 99.9) * (1 - boil), shim = ramp(T, 15, 30) * (1 - ramp(T, 90, 100)), cold = 1 - ramp(T, 4, 15);
      let h = `<g opacity="${f.toFixed(3)}">`;
      if (cold > 0) for (let k = 0; k < 18; k++)                                   // condensation on the outside of the cold glass
        h += `<circle cx="${X(bl + 4 + K.rnd(k, 51) * (BW - 8))}" cy="${Y(WS + 6 + K.rnd(k, 52) * (BB - WS - 14))}" r="${(0.8 + K.rnd(k, 53) * 1.1).toFixed(1)}" fill="#E6F6FF" opacity="${(0.55 * cold).toFixed(2)}"/>`;
      if (shim > 0) for (let k = 0; k < 3; k++) {                                // warm water rising: a faint shimmer
        const x0 = BX - 40 + k * 40, ph = a * 1.6 + k * 2;
        let d = `M${X(x0)},${Y(BB - 10)}`;
        for (let s = 1; s <= 12; s++) d += ` L${X(x0 + 4 * Math.sin(ph + s * 0.9))},${Y(BB - 10 - s * 9)}`;
        h += `<path d="${d}" fill="none" stroke="#CFEFFF" stroke-opacity="${(0.045 * shim).toFixed(3)}" stroke-width="9" stroke-linecap="round"/>`;
      }
      if (air > 0) for (let k = 0; k < 22; k++) {                                // dissolved air coming out on the glass
        const side = k % 3, r = (1.1 + K.rnd(k, 31) * 1.8) * (0.4 + 0.6 * air);
        const x = side === 0 ? bl + 6 + K.rnd(k, 32) * 6 : side === 1 ? br - 6 - K.rnd(k, 32) * 6 : bl + 12 + K.rnd(k, 33) * (BW - 24);
        const y = side === 2 ? BB - 4 - K.rnd(k, 34) * 5 : WS + 14 + K.rnd(k, 35) * (BB - WS - 22);
        h += `<circle cx="${X(x)}" cy="${Y(y)}" r="${r.toFixed(1)}" fill="#EFFBFF" fill-opacity="0.12" stroke="#EFFBFF" stroke-opacity="${(0.6 * air).toFixed(2)}" stroke-width="0.8"/>`;
      }
      if (nuc > 0) for (let k = 0; k < 14; k++) {                                // vapour bubbles forming on the hot bottom, collapsing in cooler water
        const per = 0.7 + 0.5 * K.rnd(k, 61), ph = K.loop(a, per, K.rnd(k, 62)), x = bl + 14 + K.rnd(k, 63) * (BW - 28);
        const grow = K.clamp(ph / 0.45), rise = K.clamp((ph - 0.45) / 0.55), r = (1 + 2.6 * grow) * (1 - rise) * (0.5 + 0.5 * nuc);
        if (r > 0.3) h += `<circle cx="${X(x + Math.sin(a * 5 + k) * rise * 2)}" cy="${Y(BB - 4 - r - rise * (14 + 30 * nuc * K.rnd(k, 64)))}" r="${r.toFixed(1)}" fill="#F4FCFF" fill-opacity="0.2" stroke="#F4FCFF" stroke-opacity="0.75" stroke-width="0.9"/>`;
      }
      if (boil > 0) {                                                           // a rolling boil: bubbles grow as they rise and burst at the top
        for (let k = 0; k < 28; k++) {
          const per = 0.9 + 0.6 * K.rnd(k, 71), ph = K.loop(a, per, K.rnd(k, 72)), x = bl + 14 + K.rnd(k, 73) * (BW - 28) + Math.sin(a * 6 + k * 1.7) * 3 * ph;
          const y = BB - 6 - ph * (BB - 6 - WS - 2), r = (2 + 5.5 * ph) * (0.6 + 0.4 * K.rnd(k, 74));
          h += `<circle cx="${X(x)}" cy="${Y(y)}" r="${r.toFixed(1)}" fill="#F4FCFF" fill-opacity="0.16" stroke="#F4FCFF" stroke-opacity="${(0.8 * boil).toFixed(2)}" stroke-width="1"/>`;
        }
        let d = `M${X(bl + 3)},${Y(WS)}`;
        for (let x = bl + 3; x <= br - 3; x += 6) d += ` L${X(x)},${Y(WS + boil * (2.2 * Math.sin(a * 9 + x * 0.21) + 1.4 * Math.sin(a * 13 - x * 0.37)))}`;
        h += `<path d="${d}" fill="none" stroke="#DFF4FF" stroke-opacity="${(0.75 * boil).toFixed(2)}" stroke-width="2"/>`;
      }
      [[-64, 17, 32, 7], [-97, 23, 8, 0], [-75, 20, -14, 0], [-53, 24, 18, 0], [-30, 21, -6, 0], [-86, 16, -25, 9]].forEach(([x, s0, rot, dy], k) => {   // ice cubes, mostly under the surface (two a little deeper, behind)
        if (ice <= 0) return;
        const s = s0 * Math.cbrt(ice), y = WS + s * 0.32 + dy + Math.sin(a * 1.2 + k * 2) * 1.2, o = Math.min(1, ice * 3) * (dy ? 0.7 : 1);
        h += `<g transform="translate(${X(x)} ${Y(y)}) rotate(${rot})" opacity="${o.toFixed(2)}"><rect x="${(-s / 2).toFixed(1)}" y="${(-s / 2).toFixed(1)}" width="${s.toFixed(1)}" height="${s.toFixed(1)}" rx="${(s * 0.2).toFixed(1)}" fill="#E8F6FF" fill-opacity="0.38" stroke="#FFFFFF" stroke-opacity="0.8" stroke-width="1.1"/>`
          + `<rect x="${(-s / 2 + 3).toFixed(1)}" y="${(-s / 2 + 3).toFixed(1)}" width="${(s * 0.35).toFixed(1)}" height="${(s * 0.18).toFixed(1)}" rx="2" fill="#FFFFFF" opacity="0.6"/></g>`
          + `<line x1="${X(x - s * 0.62)}" y1="${Y(WS)}" x2="${X(x + s * 0.62)}" y2="${Y(WS)}" stroke="#BFE9FF" stroke-opacity="0.6" stroke-width="1"/>`;
      });
      return { html: h + '</g>' };
    }, '')));
    g.push(`<path d="M${X(bl)},${Y(BT)} V${Y(BB - 8)} q0,10 11,10 H${X(br - 11)} q11,0 11,-10 V${Y(BT)}" fill="url(#qm-glassV)" stroke="#E2F4FF" stroke-opacity="0.75" stroke-width="2.2"/>`
      + `<ellipse cx="${X(BX)}" cy="${Y(BT)}" rx="${BW / 2}" ry="7" fill="none" stroke="#E2F4FF" stroke-opacity="0.75" stroke-width="2.2"/><path d="M${X(bl - 2)},${Y(BT + 2)} q-8,-4 -10,-10" fill="none" stroke="#E2F4FF" stroke-opacity="0.7" stroke-width="2"/>`
      + `<rect x="${X(bl + 7)}" y="${Y(BT + 14)}" width="6" height="${BB - BT - 40}" rx="3" fill="#FFFFFF" opacity="0.28"/>`);
    for (let k = 1; k <= 5; k++) { const y = BB - 4 - k * 28; g.push(`<line x1="${X(br - 30)}" y1="${Y(y)}" x2="${X(br - 12)}" y2="${Y(y)}" stroke="#FFFFFF" stroke-opacity="0.7" stroke-width="1.1"/>` + (k % 2 === 0 ? text(X(br - 32), Y(y + 3), String(k * 100), 7.5, '#FFFFFF', 'end', 700, false, 'opacity="0.75"') : '')); }
    g.push(text(X(br - 21), Y(BB - 172), 'mL', 7, '#FFFFFF', 'middle', 700, false, 'opacity="0.7"'));
    top(S.g(K.appear(t0, 0.55, 26), S.g((t, a) => {                   // vapour: faint wisps when warm, steam at the boil
      const { u, T } = st(t), boil = boilOf(u, T), op = fresh(u) * (0.1 * ramp(T, 35, 90) + 0.22 * boil);
      return { html: op < 0.004 ? '' : K.steam(X(BX + 6), Y(WS - 2), boil > 0 ? 3 : 2, 90 + 30 * boil, 130 + 70 * boil, op, a) };
    }, '')));
    // the probe: one straight axis from its tip in the water to its handle above the rim
    const TIP = [-14, -94], U = (() => { const v = [56, -240], L = Math.hypot(v[0], v[1]); return [v[0] / L, v[1] / L]; })();
    const ang = Math.atan2(U[0], -U[1]) * 180 / Math.PI, SURF = (WS - TIP[1]) / U[1], RIM = (BT - TIP[1]) / U[1], HEND = 286;
    const stem = (s0, s1) => `<rect x="-2.6" y="${(-s1).toFixed(1)}" width="5.2" height="${(s1 - s0).toFixed(1)}" rx="2.6" fill="url(#qm-chrome)"/>`;
    const probeAt = c => `<g transform="translate(${X(TIP[0])} ${Y(TIP[1])}) rotate(${ang.toFixed(2)})">${c}</g>`;
    g.push(`<g transform="translate(3 0)" opacity="0.85">${probeAt(stem(0, SURF) + `<circle cx="0" cy="-1" r="2.6" fill="#C9D3DE"/>`)}</g>`);   // under water: seen through it, shifted
    g.push(probeAt(stem(SURF, 210) + `<rect x="-4" y="-216" width="8" height="8" rx="1.5" fill="#8A939E"/>`
      + `<rect x="-9" y="-276" width="18" height="62" rx="8" fill="url(#qm-blackV)" stroke="#4A525C"/>`
      + [0, 1, 2, 3].map(k => `<rect x="-9" y="${-266 + k * 9}" width="18" height="2" fill="#0A0C0F" opacity="0.7"/>`).join('')
      + `<rect x="-5" y="-${HEND}" width="10" height="12" rx="3" fill="#15181C"/>`));
    const R = [TIP[0] + U[0] * RIM, TIP[1] + U[1] * RIM];               // the pan clip: from the rim to the stem
    g.push(`<path d="M${X(br + 2)},${Y(BT - 3)} h-6 v10 h6 M${X(br - 4)},${Y(BT - 1)} L${X(R[0] + 3)},${Y(R[1] - 1)}" fill="none" stroke="url(#qm-chrome)" stroke-width="3" stroke-linejoin="round"/><circle cx="${X(R[0] + 3)}" cy="${Y(R[1] - 1)}" r="3" fill="#8A939E"/>`);
    const HE = [TIP[0] + U[0] * HEND, TIP[1] + U[1] * HEND];
    // the thermometer: a handheld body standing on the bench, its type-K socket (yellow) at the top
    const mx = 104, my = -170, mw = 76, mh = 168;
    const cab = `M${X(HE[0])},${Y(HE[1])} C${X(HE[0] + U[0] * 40)},${Y(HE[1] + U[1] * 40)} ${X(mx + 24)},${Y(my - 120)} ${X(mx + 24)},${Y(my - 8)}`;
    g.push(`<path d="${cab}" fill="none" stroke="#5C4A0C" stroke-width="4.6" stroke-linecap="round"/><path d="${cab}" fill="none" stroke="#D9B92A" stroke-width="3.2" stroke-linecap="round"/><path d="${cab}" fill="none" stroke="#FFF1A8" stroke-opacity="0.55" stroke-width="0.9"/>`);   // type-K cable: a yellow jacket (owner: the cable was hard to see)
    g.push(`<rect x="${X(mx)}" y="${Y(my)}" width="${mw}" height="${mh}" rx="16" fill="url(#qm-blackV)" stroke="#4A525C" stroke-width="1.3"/><rect x="${X(mx + 7)}" y="${Y(my + 7)}" width="${mw - 14}" height="${mh - 14}" rx="11" fill="#2B3037" stroke="#121519"/>`
      + `<rect x="${X(mx + 16)}" y="${Y(my - 10)}" width="16" height="11" rx="2" fill="#E8C930" stroke="#7A6610" stroke-width="0.8"/>`
      + keyRow(X, Y, mx + 11, my + 74, ['HOLD', '°C/°F'], 25, 4, 14) + keyRow(X, Y, mx + 11, my + 96, ['MAX', 'ON'], 25, 4, 14)
      + text(X(mx + mw / 2), Y(my + 134), 'THERMOMETER', 6.4, '#8B97A8', 'middle', 700, false, 'letter-spacing="0.6"') + text(X(mx + mw / 2), Y(my + 146), 'TYPE K', 6.4, '#E8C930', 'middle', 700));
    g.push(S.g(t => { const v = st(t).T + 0.1 * K.counts(t, 1.5, 17, 1); return { html: lcdG(X(mx + 12), Y(my + 16), mw - 24, 44, v.toFixed(1), 15, '°C') }; }, ''));
    return g.join('');
  }
  const ITEMS = [
    ['01', [['light', GOLD], [' emitted']], 'a light meter', 'a photodiode behind a diffuser', light, TEAL],
    ['02', [['its '], ['colour', GOLD]], 'a spectrometer', 'a grating spreads the wavelengths', colour, GOLD],
    ['03', [['weight']], 'a bench scale', 'a load cell: strain gauges on a beam', weight, TEAL],
    ['04', [['how '], ['fast', GOLD], [' it turns']], 'a laser tachometer', 'counts the tape’s reflections', speed, GOLD],
    ['05', [['how '], ['hot', GOLD]], 'a probe thermometer', 'a thermocouple: a voltage from heat', hot, TEAL],
  ];

  function scene() {
    const g = [];
    S = K.timeline();
    ITEMS.forEach(([n, title, inst, how, draw, bcol], k) => {
      const x = X0 + k * (W + GAP), cx = x + W / 2, fl = Y1 - FOOT, t0 = T0(k), card = [];
      CUR = `translate(${cx} ${fl}) scale(${ART}) translate(${-cx} ${-fl})`;
      g.push(`<defs><linearGradient id="qm-card${k}" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#0F2A30" stop-opacity="0.9"/><stop offset="0.5" stop-color="#0A141C"/><stop offset="1" stop-color="#070B11"/></linearGradient>`
        + `<clipPath id="qm-clip${k}"><rect x="${x}" y="${Y0}" width="${W}" height="${Y1 - Y0}" rx="18"/></clipPath></defs>`);
      card.push(`<rect x="${x}" y="${Y0}" width="${W}" height="${Y1 - Y0}" rx="18" fill="url(#qm-card${k})"/>`);
      const art = draw(cx, fl, t0);
      card.push(`<g clip-path="url(#qm-clip${k})">${K.floor(x, x + W, fl, null)}<g transform="${CUR}">${art}</g>${K.reflect(`<g transform="${CUR}">${art}</g>`, fl, x, x + W, Y1 - fl - 30, 0.24, '#070B11')}</g>`);
      card.push(`<rect x="${x}" y="${Y0}" width="${W}" height="${Y1 - Y0}" rx="18" fill="none" stroke="${TEAL}" stroke-opacity="0.45" stroke-width="1.6"/><path d="M${x + 18},${Y0 + 1.5} H${x + W - 18}" stroke="#fff" stroke-opacity="0.1" stroke-width="1.5"/>`);
      card.push(`<circle cx="${x + 48}" cy="${Y0 + 52}" r="26" fill="${bcol}" fill-opacity="0.1" stroke="${bcol}" stroke-width="1.8"/>` + text(x + 48, Y0 + 60, n, 21, bcol, 'middle', 700));
      card.push(`<text x="${x + 90}" y="${Y0 + 52}" ${SANS} font-size="27" font-weight="700" fill="#FFFFFF">${title.map(([t, c]) => c ? `<tspan fill="${c}">${K.esc(t)}</tspan>` : K.esc(t)).join('')}</text>`);
      card.push(text(x + 90, Y0 + 84, inst, 19, '#DCE3EA', 'start', 500));
      card.push(text(cx, Y1 - 14, how, 14.5, '#8FA0B5', 'middle', 500));
      g.push(S.g(K.appear(t0, 0.55, 26), card.join('')));
    });
    g.push(text(1920 - X0, Y1 + 18, 'readings illustrative', 12, INK.muted, 'end'));
    return K.layers(`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1920 1080" width="1920" height="1080">${K.DEFS}${DEFS}${K.backdrop(false)}${g.join('')}</svg>`, S);
  }

  let host = null, bench = null;
  function tick() { const s = bench.state; S.tick(s.reduced ? 99 : s.t, s.reduced ? 0 : s.t); }
  AnimationBench.register({
    id: 'quantity-and-method',
    stops: [{ key: 'method', group: 'p3', title: 'The quantity sets the method', dur: 4.2,
      caption: 'The approach, the instrument and the method depend on the nature of the quantity.' }],
    sections: [['The quantity sets the method', 0, 0]],
    mount(stage, b) { bench = b; host = document.createElement('div'); host.className = 'qm-root'; stage.appendChild(host); host.innerHTML = scene(); S.bind(host); tick(); },
    enterStop() { tick(); },
    frame() { tick(); },
    settle() { tick(); },
    unmount() { if (host) host.remove(); },
  });
})();
