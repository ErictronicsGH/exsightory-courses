// The sensing kit: what D1·030 card 1's units share ("Our circuits only understand electricity"). Our own unbranded bench
// set-up, drawn as it is: a balanced-arm desk lamp with an in-line switch-dimmer on its cord (the card's one input), the
// spot on the bench its shade lights, a bare jumper lead from the microcontroller's analog pin (a floating input), the LDR
// sensor board (a CdS cell over a 2.2 kΩ resistor, 3-pin header), a microcontroller development board with its 12-bit ADC
// inside, a 0.96" OLED module showing the code, jumper leads with their plastic housings, and a chart of the light and the
// reading over the stop. Every value is computed here: the LDR's law and its divider (as D1·010 card 4's chain: R10 15 kΩ,
// γ 0.70, 2.2 kΩ, 3.3 V, 12 bits), the firmware's inverse, the floating input's wander, the lamp's brightness.
// Each unit carries its own copy (a library is a self-contained folder); the master is libraries/sense-kit/. Built on
// svgkit.js and dinkit.js: SENKIT(K, D) takes the unit's kits (its id prefix keeps every gradient its own).
'use strict';
(function () {
  // ───────────── the numbers ─────────────
  // the sensor: a CdS light-dependent resistor, R = R10 · (E / 10 lux)^−γ (dark ≥ 1 MΩ), on top of a 2.2 kΩ resistor to
  // ground from 3.3 V; the ADC (12 bits, 3.3 V reference) reads the middle. D1·010 card 4's numbers, unchanged.
  const LDR = { R10: 15e3, G: 0.70, Rdark: 1e6, Rf: 2.2e3, Vs: 3.3, N: 4096 };
  const ldrR = lux => (lux > 0 ? Math.min(LDR.Rdark, LDR.R10 * Math.pow(lux / 10, -LDR.G)) : LDR.Rdark);
  const outV = lux => LDR.Vs * LDR.Rf / (LDR.Rf + ldrR(lux));
  const codeOfV = v => Math.max(0, Math.min(LDR.N - 1, Math.floor(v / LDR.Vs * LDR.N)));
  const codeOf = lux => codeOfV(outV(lux));
  const vOfCode = c => c * LDR.Vs / LDR.N;                                      // the firmware: volts from the code
  const luxOfCode = c => (c <= 0 ? 0 : 10 * Math.pow(LDR.R10 / (LDR.Rf * (LDR.N / c - 1)), 1 / LDR.G));   // and light back
  const ldrI = lux => LDR.Vs / (LDR.Rf + ldrR(lux));                             // the divider's current (A)
  const ldrP = lux => ldrI(lux) * ldrI(lux) * ldrR(lux);                         // the power heating the LDR (W)
  // the dimmer: a thumbwheel with a logarithmic taper, 0 … 1 of its travel; the light at the sensor 1 … 2000 lux
  const DIM = { lo: 1, hi: 2000 };
  const luxOfDim = d => DIM.lo * Math.pow(DIM.hi / DIM.lo, Math.max(0, Math.min(1, d)));
  const dimOfLux = l => Math.log(l / DIM.lo) / Math.log(DIM.hi / DIM.lo);
  // the lamp's look: how bright it seems (the eye's scale is about logarithmic), 0.1 … 1
  const glowOf = lux => Math.max(0, Math.min(1, 0.1 + 0.9 * Math.log10(Math.max(lux, 1)) / Math.log10(DIM.hi)));
  // a floating analog input (a bare lead on the pin, nothing driving it): the sample capacitor keeps what the last channel
  // left, the lead picks up the mains' field and the hand's; the code wanders over much of the range, never with the light
  const rndK = (k, salt = 0) => { const v = Math.sin((k + 1) * 12.9898 + salt * 78.233) * 43758.5453; return v - Math.floor(v); };
  const floatCode = a => {
    const s = Math.floor(a * 10) / 10;          // ten readings a second
    const v = 2050 + 560 * Math.sin(2 * Math.PI * s / 2.3 + 0.6) + 320 * Math.sin(2 * Math.PI * s / 0.9 + 1.9) + 420 * (rndK(Math.floor(a * 10), 7) - 0.5);
    return Math.max(0, Math.min(4095, Math.round(v)));
  };
  // the guided walk's turn of the dimmer (blocks 2 and 3): from where it is set, down a decade, up half a decade, back
  // (stop time t; L0 the light it is set to); the same sweep in both blocks, so the two charts compare
  const SWEEP = { t0: 2.4, t1: 6.6, t2: 10.6, t3: 14.4 };
  function sweepLux(t, L0) {
    const e = x => { x = Math.max(0, Math.min(1, x)); return x * x * (3 - 2 * x); };
    let s = 0;
    if (t < SWEEP.t0) s = 0;
    else if (t < SWEEP.t1) s = -e((t - SWEEP.t0) / (SWEEP.t1 - SWEEP.t0));
    else if (t < SWEEP.t2) s = -1 + 1.5 * e((t - SWEEP.t1) / (SWEEP.t2 - SWEEP.t1));
    else s = 0.5 - 0.5 * e((t - SWEEP.t2) / (SWEEP.t3 - SWEEP.t2));
    return Math.max(DIM.lo, Math.min(DIM.hi, L0 * Math.pow(10, s)));
  }

  window.SENKIT = function (K, D) {
    const { text, u } = K, P = K.P;
    const f1 = v => (Math.round(v * 10) / 10).toFixed(1);
    // text measured in the page (a canvas), for wrapping and fitting words in either language
    let CTX = null;
    try { CTX = document.createElement('canvas').getContext('2d'); } catch (e) { /* no canvas */ }
    const measure = (s, size, weight = 500) => { if (!CTX) return String(s).length * size * 0.55; CTX.font = `${weight} ${size}px 'IBM Plex Sans','Segoe UI',system-ui,sans-serif`; return CTX.measureText(String(s)).width; };
    const fit = (s, size, weight, max) => { const w = measure(s, size, weight); return w > max ? +(size * max / w).toFixed(1) : size; };
    function wrap(x, y, s, size, w, col = '#E6EDF5', anchor = 'start', weight = 500, lh = 1.32) {
      const words = String(s).split(/\s+/), lines = [];
      let line = '';
      for (const wd of words) { const t = line ? line + ' ' + wd : wd; if (line && measure(t, size, weight) > w) { lines.push(line); line = wd; } else line = t; }
      if (line) lines.push(line);
      return { svg: lines.map((l, i) => text(x, y + i * size * lh, l, size, col, anchor, weight)).join(''), h: lines.length * size * lh, n: lines.length };
    }
    // a line of coloured runs ([[text, colour, weight?], …]) from x (start) or about x (middle)
    function runs(x, y, parts, size, anchor = 'start', weight = 600) {
      const ws = parts.map(p => measure(p[0], size, p[2] || weight)), tot = ws.reduce((a, b) => a + b, 0);
      let cx = anchor === 'middle' ? x - tot / 2 : anchor === 'end' ? x - tot : x;
      return parts.map((p, i) => { const s = text(cx, y, p[0], size, p[1] || '#E6EDF5', 'start', p[2] || weight, false, 'xml:space="preserve"'); cx += ws[i]; return s; }).join('');
    }

    const DEFS = `<defs>
<linearGradient id="${P}pcbG" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#1F7444"/><stop offset="1" stop-color="#0D4226"/></linearGradient>
<linearGradient id="${P}pcbD" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#17583A"/><stop offset="1" stop-color="#0A3220"/></linearGradient>
<linearGradient id="${P}pcbEdge" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#C9B98A"/><stop offset="1" stop-color="#6F6448"/></linearGradient>
<linearGradient id="${P}chipT" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#2C3037"/><stop offset="1" stop-color="#15181D"/></linearGradient>
<linearGradient id="${P}hdr" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#2A2D33"/><stop offset="1" stop-color="#0E1013"/></linearGradient>
<linearGradient id="${P}gold" x1="0" y1="0" x2="1" y2="0"><stop offset="0" stop-color="#8A6A22"/><stop offset="0.45" stop-color="#F6D77E"/><stop offset="1" stop-color="#9C7A2C"/></linearGradient>
<linearGradient id="${P}cuWire" x1="0" y1="0" x2="1" y2="0"><stop offset="0" stop-color="#7A3416"/><stop offset="0.5" stop-color="#FFB37A"/><stop offset="1" stop-color="#8A3E1A"/></linearGradient>
<linearGradient id="${P}resBody" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#F0D9AE"/><stop offset="0.45" stop-color="#D9B98A"/><stop offset="1" stop-color="#9C7C52"/></linearGradient>
<radialGradient id="${P}cds" cx="0.42" cy="0.38" r="0.62"><stop offset="0" stop-color="#F6EEDC"/><stop offset="0.7" stop-color="#E6D8BA"/><stop offset="1" stop-color="#B9A57E"/></radialGradient>
<linearGradient id="${P}oledGlass" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#0B0D10"/><stop offset="1" stop-color="#040506"/></linearGradient>
<linearGradient id="${P}oledPcb" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#1D4FA0"/><stop offset="1" stop-color="#123570"/></linearGradient>
<linearGradient id="${P}black" x1="0" y1="0" x2="1" y2="0"><stop offset="0" stop-color="#0E1014"/><stop offset="0.35" stop-color="#3A404A"/><stop offset="0.6" stop-color="#1E2228"/><stop offset="1" stop-color="#0A0C0F"/></linearGradient>
<linearGradient id="${P}blackV" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#3A404A"/><stop offset="0.3" stop-color="#1E2228"/><stop offset="1" stop-color="#0A0C0F"/></linearGradient>
<linearGradient id="${P}chrome" x1="0" y1="0" x2="1" y2="0"><stop offset="0" stop-color="#4A525C"/><stop offset="0.25" stop-color="#E9EEF3"/><stop offset="0.45" stop-color="#A9B3BE"/><stop offset="0.75" stop-color="#D5DCE4"/><stop offset="1" stop-color="#3E464F"/></linearGradient>
<linearGradient id="${P}shade" x1="0" y1="0" x2="1" y2="0"><stop offset="0" stop-color="#0C0E12"/><stop offset="0.26" stop-color="#454C57"/><stop offset="0.5" stop-color="#22272E"/><stop offset="0.85" stop-color="#121519"/><stop offset="1" stop-color="#2A3038"/></linearGradient>
<radialGradient id="${P}mouthOn" cx="0.5" cy="0.42" r="0.56"><stop offset="0" stop-color="#FFFFFF"/><stop offset="0.3" stop-color="#FFF3D6"/><stop offset="0.72" stop-color="#FFD48A"/><stop offset="1" stop-color="#C9822E"/></radialGradient>
<radialGradient id="${P}mouthOff" cx="0.5" cy="0.42" r="0.56"><stop offset="0" stop-color="#5A5E64"/><stop offset="0.6" stop-color="#2A2D32"/><stop offset="1" stop-color="#17191C"/></radialGradient>
<radialGradient id="${P}pool" cx="0.5" cy="0.5" r="0.5"><stop offset="0" stop-color="#FFEBC4" stop-opacity="0.75"/><stop offset="0.4" stop-color="#FFD592" stop-opacity="0.34"/><stop offset="1" stop-color="#FFC56E" stop-opacity="0"/></radialGradient>
<linearGradient id="${P}wheel" x1="0" y1="0" x2="1" y2="0"><stop offset="0" stop-color="#2A2E34"/><stop offset="0.5" stop-color="#5A616B"/><stop offset="1" stop-color="#2A2E34"/></linearGradient>
<linearGradient id="${P}gaugeFace" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#F7F5EF"/><stop offset="1" stop-color="#DCD7CB"/></linearGradient>
<linearGradient id="${P}pipe" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#5B636E"/><stop offset="0.35" stop-color="#D5DCE4"/><stop offset="0.6" stop-color="#9AA4AF"/><stop offset="1" stop-color="#3E464F"/></linearGradient>
<marker id="${P}arrA" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="6" markerHeight="6" orient="auto"><path d="M0,0 L10,5 L0,10 z" fill="#FFC24D"/></marker>
<marker id="${P}arrT" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="6" markerHeight="6" orient="auto"><path d="M0,0 L10,5 L0,10 z" fill="#2EE6C5"/></marker>
<marker id="${P}arrW" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="6" markerHeight="6" orient="auto"><path d="M0,0 L10,5 L0,10 z" fill="#E6EDF5"/></marker>
</defs>`;

    // ───────────── a jumper lead: a wire with a plastic housing at each end (stage space) ─────────────
    // p, q: its two ends; c1, c2: the bezier's control points; col: the insulation's colour; o.bare: the end at q stripped
    // (copper showing, no housing): a lead whose end lies loose
    function lead(p, q, c1, c2, col, o = {}) {
      const d = `M${f1(p[0])},${f1(p[1])} C${f1(c1[0])},${f1(c1[1])} ${f1(c2[0])},${f1(c2[1])} ${f1(q[0])},${f1(q[1])}`;
      const w = o.w || 6;
      let s = `<path d="${d}" fill="none" stroke="#000" stroke-opacity="0.45" stroke-width="${w + 3}" stroke-linecap="round" transform="translate(2 4)" filter="${u('soft')}"/>`
        + `<path d="${d}" fill="none" stroke="${col}" stroke-width="${w}" stroke-linecap="round"/>`
        + `<path d="${d}" fill="none" stroke="#FFFFFF" stroke-opacity="0.32" stroke-width="${(w * 0.28).toFixed(1)}" stroke-linecap="round" transform="translate(-1 -1.2)"/>`;
      const housing = (x, y, ang) => `<g transform="translate(${f1(x)} ${f1(y)}) rotate(${ang.toFixed(1)})"><rect x="-3" y="-3.8" width="40" height="7.6" rx="1.2" fill="#16181C" stroke="#3A3F47" stroke-width="0.7"/><rect x="0" y="-2.6" width="34" height="1.6" fill="#FFFFFF" opacity="0.12"/></g>`;
      const angAt = (a, b) => Math.atan2(b[1] - a[1], b[0] - a[0]) * 180 / Math.PI;
      if (!o.noHousingP) s += housing(p[0], p[1], angAt(c1, p) + 180);
      if (o.bare) {
        const a = angAt(c2, q) * Math.PI / 180, L = 22;
        s += `<line x1="${f1(q[0])}" y1="${f1(q[1])}" x2="${f1(q[0] + Math.cos(a) * L)}" y2="${f1(q[1] + Math.sin(a) * L)}" stroke="url(#${P}cuWire)" stroke-width="3.2" stroke-linecap="round"/>`
          + `<line x1="${f1(q[0])}" y1="${f1(q[1]) - 0.8}" x2="${f1(q[0] + Math.cos(a) * L)}" y2="${f1(q[1] + Math.sin(a) * L - 0.8)}" stroke="#FFE2C4" stroke-opacity="0.7" stroke-width="0.9" stroke-linecap="round"/>`;
      } else if (!o.noHousingQ) s += housing(q[0], q[1], angAt(c2, q));
      return { svg: s, d };
    }

    // ───────────── the desk lamp's head, close up (stage space, the bench drawn at 3 px a millimetre) ─────────────
    // The card's bench is seen close (1 mm = 3 px), so of the balanced-arm lamp (D1·020 card 1's, the same head) only its
    // head and upper arm are in the frame: a Ø 90 mm cone shade, its mouth 150 mm above the bench, its axis 6° off
    // vertical, aimed at the spot; the arm leaves the frame at the top left, its base stands off the bench's left end.
    // mx, my: the mouth's centre; fl: the bench top; bright(t, a) → 0 … 1: how bright it looks (the light on a layer of its
    // own). Returns the svg, the spot the axis lights (hit), the mouth, the pool's half-width.
    function lampHead(mx, my, fl, S, bright, o = {}) {
      const g = [], sc = 2.5, PHI = 6 * Math.PI / 180, Dd = [Math.sin(PHI), Math.cos(PHI)], SL = 92 * sc, RM = 54 * sc;
      const KN = [mx - Dd[0] * SL, my - Dd[1] * SL], M = [mx, my];
      const ALPHA = 22 * Math.PI / 180, VB = RM / Math.tan(ALPHA), V = [M[0] - Dd[0] * VB, M[1] - Dd[1] * VB];
      const ray = (a, s) => [V[0] + Math.sin(PHI + a) * s, V[1] + Math.cos(PHI + a) * s];
      const toBench = a => (fl - V[1]) / Math.cos(PHI + a);
      const cone = a => [ray(-a, VB / Math.cos(a)), ray(a, VB / Math.cos(a)), ray(a, toBench(a)), ray(-a, toBench(-a))];
      const hit = ray(0, toBench(0)), half = (ray(ALPHA, toBench(ALPHA))[0] - ray(-ALPHA, toBench(-ALPHA))[0]) / 2;
      const id = P + 'lh';
      const f = v => v.toFixed(1), PTS = pts => pts.map(([x, y]) => `${f(x)},${f(y)}`).join(' ');
      g.push(`<defs><linearGradient id="${id}beam" gradientUnits="userSpaceOnUse" x1="0" y1="${f(my)}" x2="0" y2="${fl}"><stop offset="0" stop-color="#FFF1D2" stop-opacity="0.55"/><stop offset="0.5" stop-color="#FFE7BC" stop-opacity="0.2"/><stop offset="1" stop-color="#FFDDA6" stop-opacity="0.08"/></linearGradient>`
        + `<filter id="${id}blur" filterUnits="userSpaceOnUse" x="${f(hit[0] - half - 200)}" y="${f(my - 60)}" width="${f(2 * half + 400)}" height="${f(fl - my + 120)}"><feGaussianBlur stdDeviation="10"/></filter></defs>`);
      // the upper arm: twin rods and a tension spring from the knuckle up out of the frame; the cord clipped along it
      const E = [KN[0] - 560, KN[1] - 150];
      const off = (a, b, oo) => { const dx = b[0] - a[0], dy = b[1] - a[1], L = Math.hypot(dx, dy); return [[a[0] - dy / L * oo, a[1] + dx / L * oo], [b[0] - dy / L * oo, b[1] + dx / L * oo]]; };
      const line = (p, q, col, w) => `<line x1="${f(p[0])}" y1="${f(p[1])}" x2="${f(q[0])}" y2="${f(q[1])}" stroke="${col}" stroke-width="${w}" stroke-linecap="round"/>`;
      for (const oo of [-9, 9]) { const [p, q] = off(KN, E, oo); g.push(line(p, q, '#2A2F36', 11) + line(p, q, '#C3CBD4', 6) + line([p[0], p[1] - 1.5], [q[0], q[1] - 1.5], '#FFFFFF', 1.6).replace('stroke="#FFFFFF"', 'stroke="#FFFFFF" stroke-opacity="0.5"')); }
      { const [p, q] = off(KN, E, 28), s0 = [p[0] + (q[0] - p[0]) * 0.18, p[1] + (q[1] - p[1]) * 0.18], s1 = [p[0] + (q[0] - p[0]) * 0.62, p[1] + (q[1] - p[1]) * 0.62];
        const L = Math.hypot(s1[0] - s0[0], s1[1] - s0[1]), n = 30, ux = (s1[0] - s0[0]) / L, uy = (s1[1] - s0[1]) / L;
        let d = `M${f(s0[0])},${f(s0[1])}`;
        for (let i = 1; i <= n * 8; i++) { const tt = i / (n * 8), th = 2 * Math.PI * n * tt; d += ` L${f(s0[0] + ux * L * tt - uy * 7 * Math.sin(th) + ux * 3 * Math.cos(th))},${f(s0[1] + uy * L * tt + ux * 7 * Math.sin(th) + uy * 3 * Math.cos(th))}`; }
        g.push(`<path d="${d}" fill="none" stroke="#1A1D22" stroke-width="4.4"/><path d="${d}" fill="none" stroke="#AEB7C1" stroke-width="2"/>`); }
      { const [p, q] = off(KN, E, -20); g.push(line(p, q, '#0E1013', 5)); }
      g.push(`<circle cx="${f(KN[0])}" cy="${f(KN[1])}" r="20" fill="url(#${K.P}knob)" stroke="#5A626D" stroke-width="2"/><circle cx="${f(KN[0])}" cy="${f(KN[1])}" r="7" fill="#9AA4AF"/>`);
      // the head, drawn in the shade's own frame (its axis straight down; D1·020's head at 2.5 ×), turned to aim
      const head = inner => `<g transform="translate(${f(KN[0])} ${f(KN[1])}) rotate(${(-PHI * 180 / Math.PI).toFixed(2)}) scale(${sc})">${inner}</g>`;
      g.push(head(`<rect x="-7" y="-17" width="14" height="19" rx="3" fill="url(#${P}chrome)" stroke="#5B636E" stroke-width="0.8"/>`
        + `<path d="M-15,0 C-17,26 -35,63 -54,92 L54,92 C35,63 17,26 15,0 Z" fill="url(#${P}shade)" stroke="#3E454F" stroke-width="0.6"/>`
        + `<ellipse cx="0" cy="0" rx="15" ry="4" fill="#2A2F36" stroke="#4A525C" stroke-width="0.5"/>`
        + `<path d="M-10,8 C-13,30 -27,60 -42,86" fill="none" stroke="#FFFFFF" stroke-opacity="0.16" stroke-width="3" stroke-linecap="round"/>`
        + [18, 26, 34].map(y => { const w = 15 + y * 0.14; return `<path d="M${(-w).toFixed(1)},${y} q${w.toFixed(1)},4 ${(2 * w).toFixed(1)},0" fill="none" stroke="#0A0C0F" stroke-width="1.1" opacity="0.7"/>`; }).join('')
        + `<ellipse cx="0" cy="92" rx="51" ry="11" fill="url(#${P}mouthOff)"/><ellipse cx="0" cy="90" rx="15" ry="5.5" fill="#D8D2C4" opacity="0.7"/>`
        + `<ellipse cx="0" cy="92" rx="54" ry="12.5" fill="none" stroke="url(#${P}chrome)" stroke-width="2.2"/>`));
      // the light: the pool on the bench, the beam in the air, the lit mouth and its bloom
      const litPart = `<ellipse cx="${f(hit[0] + 10)}" cy="${fl + 8}" rx="${f(half * 1.05)}" ry="${f(half * 0.1)}" fill="url(#${P}pool)" filter="${u('soft')}"/><ellipse cx="${f(hit[0])}" cy="${fl + 6}" rx="${f(half * 0.45)}" ry="${f(half * 0.045)}" fill="#FFF4DE" opacity="0.5" filter="${u('soft')}"/>`
        + `<g filter="url(#${id}blur)">${[[ALPHA, 0.3], [ALPHA * 0.62, 0.28], [ALPHA * 0.3, 0.34]].map(([a, oo]) => `<polygon points="${PTS(cone(a))}" fill="url(#${id}beam)" opacity="${oo}"/>`).join('')}</g>`
        + head(`<ellipse cx="0" cy="92" rx="51" ry="11" fill="url(#${P}mouthOn)"/><ellipse cx="0" cy="90" rx="19" ry="6.5" fill="#FFFFFF" filter="${u('soft')}"/><ellipse cx="0" cy="92" rx="54" ry="12.5" fill="none" stroke="#FFE7C0" stroke-opacity="0.5" stroke-width="1.2"/>`)
        + `<ellipse cx="${f(M[0])}" cy="${f(M[1] + 10)}" rx="190" ry="60" fill="#FFD9A0" opacity="0.45" filter="${u('big')}"/>`;
      if (S) {
        const wrapL = o.wrapFn || (c => c);
        S.top(wrapL(S.g((t, a) => ({ opacity: bright(t, a).toFixed(3) }), litPart)));
        S.top(wrapL(S.g((t, a) => {
          const oo = bright(t, a); if (oo <= 0.01) return { html: '' };
          let h = '';
          for (let k = 0; k < 22; k++) {
            const uu = (K.rnd(k, 1) * 2 - 1) * 0.85 + 0.05 * Math.sin(a * 0.23 + 2 * k), vv = 0.1 + 0.85 * K.rnd(k, 2) + 0.03 * Math.sin(a * 0.31 + k);
            const s0 = VB / Math.cos(uu * ALPHA), s1 = toBench(uu * ALPHA), [x, y] = ray(uu * ALPHA, s0 + (s1 - s0) * vv);
            const op = oo * (1 - Math.abs(uu) * 0.7) * (1 - 0.5 * vv) * (0.35 + 0.65 * (0.5 + 0.5 * Math.sin(a * 1.3 + k * 2.1)));
            h += `<circle cx="${f(x)}" cy="${f(y)}" r="${(1.1 + 1.1 * K.rnd(k, 4)).toFixed(1)}" fill="#FFF3DA" opacity="${op.toFixed(3)}"/>`;
          }
          return { html: `<g filter="${u('soft')}">${h}</g>` };
        }, '')));
      }
      return { svg: g.join(''), hit: [hit[0], fl], mouth: M, half, top: KN[1] - 30, x0: M[0] - RM, x1: M[0] + RM };
    }

    // ───────────── the lamp's in-line switch-dimmer, on its cord (stage space) ─────────────
    // A moulded body lying on the bench: a rocker (I / O) and a thumbwheel coming out of its top face, ribbed; the cord in
    // at one end, out at the other. dim 0 … 1: the wheel's travel (its ribs roll with it). Returns the svg and the wheel's
    // centre and size (for the control built into it).
    function cordDimmer(cx, cy, dim, on = true) {
      const g = [], w = 132, h = 44, x0 = cx - w / 2, y0 = cy - h / 2;
      g.push(`<ellipse cx="${cx}" cy="${cy + h / 2 + 4}" rx="${w / 2 + 6}" ry="6" fill="#000" opacity="0.5" filter="${u('soft')}"/>`);
      g.push(`<rect x="${x0}" y="${y0}" width="${w}" height="${h}" rx="18" fill="url(#${P}blackV)" stroke="#4A525C" stroke-width="1.2"/>`
        + `<rect x="${x0 + 8}" y="${y0 + 4}" width="${w - 16}" height="6" rx="3" fill="#FFFFFF" opacity="0.07"/>`
        + `<path d="M${x0 + 6},${cy + 6} H${x0 + w - 6}" stroke="#000" stroke-opacity="0.35" stroke-width="1"/>`);
      // the rocker
      const rx = x0 + 30;
      g.push(`<rect x="${rx - 14}" y="${y0 + 8}" width="28" height="22" rx="4" fill="#111317" stroke="#5A626D" stroke-width="0.9"/>`
        + `<rect x="${rx - 12}" y="${y0 + 10}" width="24" height="18" rx="3" fill="${on ? '#2B3038' : '#1A1D22'}"/>`
        + `<rect x="${on ? rx - 12 : rx}" y="${y0 + 10}" width="12" height="18" rx="3" fill="${on ? '#4A525C' : '#3A414B'}"/>`
        + text(rx - 6, y0 + 23, 'I', 8.5, '#E6EDF5', 'middle', 700) + text(rx + 6, y0 + 23, 'O', 8.5, '#8B97A8', 'middle', 700)
        + `<circle cx="${rx}" cy="${y0 + 36}" r="2.6" fill="${on ? '#FFB547' : '#3A2A10'}"${on ? ` filter="${u('soft')}"` : ''}/>`);
      // the thumbwheel: a ribbed wheel in a slot, its ribs rolling with the dim setting
      const wx = x0 + 88, wr = 17;
      g.push(`<rect x="${wx - 24}" y="${y0 + 5}" width="48" height="${h - 10}" rx="6" fill="#0B0C0F"/>`);
      let ribs = '';
      const ph = dim * 9;   // the wheel turns about one and a half turns over its travel (9 ribs' pitch each)
      for (let k = -6; k <= 6; k++) {
        const a = (k + (ph % 1)) * 0.26;
        if (Math.abs(a) > 1.45) continue;
        const x = wx + Math.sin(a) * wr, lw = 2.6 * Math.cos(a);
        ribs += `<line x1="${x.toFixed(1)}" y1="${y0 + 8}" x2="${x.toFixed(1)}" y2="${y0 + h - 8}" stroke="#9AA4AF" stroke-opacity="${(0.25 + 0.6 * Math.cos(a)).toFixed(2)}" stroke-width="${lw.toFixed(2)}"/>`;
      }
      g.push(`<rect x="${wx - wr}" y="${y0 + 6}" width="${2 * wr}" height="${h - 12}" rx="5" fill="url(#${P}wheel)"/>` + ribs
        + `<rect x="${wx - wr}" y="${y0 + 6}" width="${2 * wr}" height="${h - 12}" rx="5" fill="none" stroke="#000" stroke-opacity="0.5"/>`
        + `<path d="M${wx - 30},${y0 + h + 9} l-6,0 M${wx + 30},${y0 + h + 9} l6,0" stroke="#8B97A8" stroke-width="1.2"/>`
        + text(wx - 34, y0 + h + 13, '−', 13, '#8B97A8', 'end', 700) + text(wx + 34, y0 + h + 13, '+', 13, '#8B97A8', 'start', 700));
      return { svg: g.join(''), wheel: [wx, cy], w: 2 * wr + 16, h, x0, x1: x0 + w };
    }

    // ───────────── boards lying on the bench, seen a little from above (stage space) ─────────────
    // A board is drawn in its own plan (u along it, to the right; v from its back edge towards us, in plan units) and mapped
    // onto the bench: its top face is a parallelogram fh tall, leaning sk to the right at the back; silkscreen and parts drawn
    // in the plan come out foreshortened as they would. The whole board is then scaled about its front-left corner (or its
    // middle) to the bench's 3 px a millimetre. plan(x0, fl, w, d, fh, sk) → { M, at(u, v), yt, yb }
    function plan(x0, fl, w, d, fh, sk, th = 8) {
      const yb = fl - th, yt = yb - fh;
      return { M: `matrix(1 0 ${(-sk / d).toFixed(4)} ${(fh / d).toFixed(4)} ${x0 + sk} ${yt})`, at: (u, v) => [x0 + sk - sk * v / d + u, yt + fh * v / d], yt, yb, th };
    }
    const standPin = ([x, y], h = 16) => `<rect x="${(x - 4.5).toFixed(1)}" y="${(y - 4).toFixed(1)}" width="9" height="6" rx="1" fill="url(#${P}hdr)"/><rect x="${(x - 1.5).toFixed(1)}" y="${(y - h).toFixed(1)}" width="3" height="${h - 2}" fill="url(#${P}gold)"/>`;
    const scaleAbout = (svg, ox, oy, s) => `<g transform="translate(${ox} ${oy}) scale(${s}) translate(${-ox} ${-oy})">${svg}</g>`;
    const ptAbout = (p, ox, oy, s) => [ox + (p[0] - ox) * s, oy + (p[1] - oy) * s];

    // ───────────── the LDR sensor board: 32 × 16 mm ─────────────
    // cx: its middle, fl: the bench top. The CdS cell (5 mm) stands on its legs facing up to the lamp, the 2.2 kΩ resistor
    // (¼ W, red red red gold) lies beside it, a 3-pin header (2.54 mm) at its right end: VCC, OUT, GND. Drawn in a plan at
    // 2 × and scaled by ½ onto the bench. Returns its svg, the pins' tops, the cell, its ends.
    function sensorBoard(cx, fl, o = {}) {
      const s = o.s || 0.5, w = 190, d = 96, fh = 64, sk = 16, x0 = cx - w / 2, B = plan(x0, fl, w, d, fh, sk), g = [];
      g.push(`<ellipse cx="${cx + 8}" cy="${fl + 2}" rx="${w / 2 + 16}" ry="9" fill="#000" opacity="0.55" filter="${u('soft')}"/>`);
      g.push(`<path d="M${x0},${B.yb} h${w} v${B.th} h${-w} Z" fill="url(#${P}pcbEdge)"/><path d="M${x0 + w},${B.yb} l${sk},${-fh} v${B.th} l${-sk},${fh} Z" fill="#5E5540"/>`);
      const pl = [`<rect x="0" y="0" width="${w}" height="${d}" rx="5" fill="url(#${P}pcbG)" stroke="#2C8A55" stroke-width="1.2"/>`,
        `<circle cx="10" cy="10" r="4.5" fill="#0A2414" stroke="url(#${P}gold)" stroke-width="2"/><circle cx="10" cy="${d - 10}" r="4.5" fill="#0A2414" stroke="url(#${P}gold)" stroke-width="2"/>`,
        `<path d="M48,48 H96 V33 H160 M96,48 V63 H160 M150,63 V67 M140,67 H150" fill="none" stroke="#3FA36A" stroke-opacity="0.6" stroke-width="3"/>`,
        `<rect x="88" y="70" width="10" height="10" rx="2" fill="url(#${P}gold)"/><rect x="140" y="70" width="10" height="10" rx="2" fill="url(#${P}gold)"/>`,
        `<circle cx="40" cy="42" r="5" fill="url(#${P}gold)"/><circle cx="56" cy="42" r="5" fill="url(#${P}gold)"/>`,
        text(118, 92, 'R1 2.2k', 9, '#E9F2EC', 'middle', 700), text(48, 78, 'LDR', 9, '#E9F2EC', 'middle', 700),
        ...['VCC', 'OUT', 'GND'].map((nm, k) => text(162, 37 + k * 15, nm, 9, '#E9F2EC', 'end', 700))];
      g.push(`<g transform="${B.M}">${pl.join('')}</g>`);
      const [ra, rya] = B.at(93, 75), [rb, ryb] = B.at(145, 75), ry = (rya + ryb) / 2 - 7, r0 = ra + 10, r1 = rb - 10;
      g.push(`<path d="M${ra},${rya} q2,-7 10,-7 H${r1} q8,0 10,7" fill="none" stroke="#C9CED4" stroke-width="1.8"/>`
        + `<rect x="${r0}" y="${ry - 6}" width="${r1 - r0}" height="12" rx="6" fill="url(#${P}resBody)"/>`
        + [[r0 + 7, '#C0262B'], [r0 + 13, '#C0262B'], [r0 + 19, '#C0262B'], [r1 - 8, '#C9A24A']].map(([x, c]) => `<rect x="${x.toFixed(1)}" y="${ry - 6}" width="3.4" height="12" fill="${c}"/>`).join('')
        + `<rect x="${r0 + 3}" y="${ry - 5}" width="${r1 - r0 - 6}" height="3" rx="1.5" fill="#FFFFFF" opacity="0.25"/>`);
      const [la, lya] = B.at(40, 42), [lb, lyb] = B.at(56, 42), lx = (la + lb) / 2, lr = 15, lh = 16, ly = (lya + lyb) / 2 - lh;
      g.push(`<line x1="${la}" y1="${lya}" x2="${lx - 5}" y2="${ly + 4}" stroke="#C9CED4" stroke-width="1.8"/><line x1="${lb}" y1="${lyb}" x2="${lx + 5}" y2="${ly + 4}" stroke="#C9CED4" stroke-width="1.8"/>`
        + `<path d="M${lx - lr},${ly} v4 a${lr},${lr * 0.45} 0 0 0 ${2 * lr},0 v-4" fill="#8F7B56"/>`
        + `<ellipse cx="${lx}" cy="${ly}" rx="${lr}" ry="${lr * 0.45}" fill="url(#${P}cds)" stroke="#A8916A" stroke-width="0.8"/>`);
      let zz = `M${lx - 10},${ly - 3.6}`;
      for (let k = 0; k < 4; k++) zz += ` h20 v0.9 h-20 v0.9`;
      g.push(`<path d="${zz}" fill="none" stroke="#C4462A" stroke-width="0.9"/><path d="M${lx - 11},${ly - 4} v9 M${lx + 11},${ly - 4.4} v9" stroke="#C9CED4" stroke-width="1.4"/>`
        + `<ellipse cx="${lx - 4}" cy="${ly - 2}" rx="${lr * 0.55}" ry="${lr * 0.18}" fill="#FFFFFF" opacity="0.25"/>`);
      const pins = [0, 1, 2].map(k => B.at(174, 33 + k * 15));
      pins.forEach(p => g.push(standPin(p, 16)));
      const m = p => ptAbout(p, cx, fl, s);
      return { svg: scaleAbout(g.join(''), cx, fl, s), pins: pins.map(([x, y]) => m([x, y - 16])), cell: m([lx, ly]), x0: m([x0, fl])[0], x1: m([x0 + w + sk, fl])[0], top: m([0, ly - 12])[1], s };
    }

    // ───────────── the microcontroller board: a 90 × 39 mm development board ─────────────
    // x0: its left end, fl: the bench top. The MCU (a 48-pin LQFP, its 12-bit ADC inside), a crystal, a regulator, two LEDs,
    // a USB-C socket, a 20-way 2.54 mm header along each long edge (sockets in front, pins behind) with its silkscreen. Drawn
    // in a plan and scaled 0.62 onto the bench. Returns the svg, the front row's socket holes by name, the MCU, the USB socket.
    const MCU_NAMES = ['3V3', 'GND', 'A0', 'A1', 'A2', 'A3', 'A4', 'A5', 'D2', 'D3', 'D4', 'D5', 'D6', 'D7', 'SDA', 'SCL', 'TX', 'RX', 'GND', '5V'];
    function mcuBoard(x0, fl, o = {}) {
      const s = o.s || 0.62, w = 440, d = 190, fh = 125, sk = 30, B = plan(x0, fl, w, d, fh, sk), g = [], pitch = 12.3, h0 = 30;
      g.push(`<ellipse cx="${x0 + w / 2 + 12}" cy="${fl + 3}" rx="${w / 2 + 22}" ry="13" fill="#000" opacity="0.55" filter="${u('soft')}"/>`);
      g.push(`<path d="M${x0},${B.yb} h${w} v${B.th} h${-w} Z" fill="url(#${P}pcbEdge)"/><path d="M${x0 + w},${B.yb} l${sk},${-fh} v${B.th} l${-sk},${fh} Z" fill="#5E5540"/>`);
      const pl = [`<rect x="0" y="0" width="${w}" height="${d}" rx="8" fill="url(#${P}pcbD)" stroke="#2C8A55" stroke-width="1.4"/>`];
      for (const [x, y] of [[10, 10], [w - 10, 10], [10, d - 10], [w - 10, d - 10]]) pl.push(`<circle cx="${x}" cy="${y}" r="5.5" fill="#0A2414" stroke="url(#${P}gold)" stroke-width="2"/>`);
      for (let k = 0; k < 20; k++) pl.push(`<path d="M${h0 + k * pitch},${d - 44} V${d - 52 - (k % 5) * 4} H${300 + (k % 10) * 5} V${120}" fill="none" stroke="#2F8F5A" stroke-opacity="0.4" stroke-width="1.4"/>`);
      for (let k = 0; k < 20; k++) pl.push(`<path d="M${h0 + k * pitch},${28} V${40 + (k % 5) * 3} H${300 + (k % 10) * 5} V${70}" fill="none" stroke="#2F8F5A" stroke-opacity="0.4" stroke-width="1.4"/>`);
      pl.push(`<rect x="${h0 - 7}" y="${d - 41}" width="${20 * pitch + 2}" height="14" rx="1.5" fill="#101215"/><rect x="${h0 - 7}" y="7" width="${20 * pitch + 2}" height="14" rx="1.5" fill="#101215"/>`);
      MCU_NAMES.forEach((nm, k) => pl.push(text(h0 + k * pitch + 2.4, d - 5, nm, 7, '#E9F2EC', 'start', 700, false, `transform="rotate(-90 ${h0 + k * pitch + 2.4} ${d - 5})"`)));
      // the MCU, its crystal, the regulator, LEDs, the USB-C socket
      pl.push(`<rect x="300" y="69" width="52" height="52" rx="2" fill="url(#${P}chipT)" stroke="#3A3F47"/>`
        + Array.from({ length: 12 }, (_, k) => { const p = 303 + k * 4; const q = 72 + k * 4; return `<rect x="${p}" y="64" width="1.8" height="5" fill="#C9CED4"/><rect x="${p}" y="121" width="1.8" height="5" fill="#C9CED4"/><rect x="295" y="${q}" width="5" height="1.8" fill="#C9CED4"/><rect x="352" y="${q}" width="5" height="1.8" fill="#C9CED4"/>`; }).join('')
        + `<circle cx="306" cy="75" r="2" fill="#0B0C0F"/>` + text(326, 99, 'MCU', 10, '#C9D3DE', 'middle', 700));
      pl.push(`<rect x="364" y="58" width="22" height="9" rx="4.5" fill="url(#${P}chrome)" stroke="#5B636E" stroke-width="0.5"/>`
        + `<rect x="368" y="128" width="26" height="22" rx="1.5" fill="url(#${P}chipT)"/><rect x="371" y="121" width="20" height="7" fill="#9AA4AF"/>`
        + `<rect x="300" y="146" width="7" height="5" rx="1" fill="#FF9A3A"/><rect x="314" y="146" width="7" height="5" rx="1" fill="#2EE6C5"/>`
        + `<rect x="${w - 22}" y="76" width="30" height="38" rx="5" fill="url(#${P}chrome)" stroke="#5B636E" stroke-width="0.8"/><rect x="${w - 14}" y="84" width="22" height="22" rx="8" fill="#15181C"/>`);
      g.push(`<g transform="${B.M}">${pl.join('')}</g>`);
      for (const [uu, vv, c] of [[303, 148, '#FF9A3A'], [317, 148, '#2EE6C5']]) { const [x, y] = B.at(uu, vv); g.push(`<circle cx="${x}" cy="${y}" r="7" fill="${c}" opacity="0.45" filter="${u('soft')}"/>`); }
      for (let k = 0; k < 20; k++) { const [x, y] = B.at(h0 + k * pitch, 14); g.push(`<rect x="${(x - 3.5).toFixed(1)}" y="${(y - 4).toFixed(1)}" width="7" height="6" rx="1" fill="url(#${P}hdr)"/><rect x="${(x - 1.4).toFixed(1)}" y="${(y - 16).toFixed(1)}" width="2.8" height="13" fill="url(#${P}gold)"/>`); }
      // the front row: a female socket strip standing on the board (a lead's pin goes into a hole in its top)
      const [sa, sya] = B.at(h0 - 7, d - 28), [sb] = B.at(h0 + 19 * pitch + 7, d - 28), sh = 12;
      g.push(`<path d="M${sa},${sya} h${sb - sa} v${-sh} h${-(sb - sa)} Z" fill="#0B0C0F"/><path d="M${sa},${sya - sh} h${sb - sa} l${(sk * 14 / d).toFixed(1)},${(-fh * 14 / d).toFixed(1)} h${-(sb - sa)} Z" fill="#24272D"/>`);
      const holes = {};
      MCU_NAMES.forEach((nm, k) => { const [px, py] = B.at(h0 + k * pitch, d - 28); g.push(`<rect x="${(px - 1.2).toFixed(1)}" y="${(py - sh - 6).toFixed(1)}" width="3.6" height="3.4" fill="#000"/>`); holes[holes[nm] ? nm + '2' : nm] = [px + 0.6, py - sh - 4.5]; });
      const m = p => ptAbout(p, x0, fl, s);
      const pins = {};
      for (const k in holes) pins[k] = m(holes[k]);
      return { svg: scaleAbout(g.join(''), x0, fl, s), pins, mcu: m(B.at(326, 95)), x1: m([x0 + w + sk, fl])[0], top: m([0, B.yt - 16])[1], usb: m(B.at(w + 8, 95)), s };
    }

    // ───────────── a 2.42" I²C OLED module (stage space): 70 × 43 mm, propped up on the bench, its 4 pins at its top ─────────────
    // x0, y0: the module's top-left; returns the svg, its pins (GND, VCC, SCL, SDA) and its screen (55 × 28 mm, 128 × 64 dots)
    function oled(x0, y0, lines, o = {}) {
      const w = 210, h = 128, g = [];
      g.push(`<path d="M${x0 + 30},${y0 + h} l-14,22 M${x0 + w - 30},${y0 + h} l14,22" stroke="#3A414B" stroke-width="5" stroke-linecap="round"/>`
        + `<ellipse cx="${x0 + w / 2}" cy="${y0 + h + 24}" rx="${w / 2 + 6}" ry="6" fill="#000" opacity="0.5" filter="${u('soft')}"/>`);
      g.push(`<rect x="${x0}" y="${y0}" width="${w}" height="${h}" rx="5" fill="url(#${P}oledPcb)" stroke="#2B64C4" stroke-width="1.2"/>`
        + [[x0 + 7, y0 + 7], [x0 + w - 7, y0 + 7], [x0 + 7, y0 + h - 7], [x0 + w - 7, y0 + h - 7]].map(([x, y]) => `<circle cx="${x}" cy="${y}" r="4" fill="#0B1A33" stroke="#C9CED4" stroke-width="1.2"/>`).join(''));
      const pins = [];
      ['GND', 'VCC', 'SCL', 'SDA'].forEach((nm, k) => {
        const px = x0 + w / 2 - 11.4 + k * 7.6;
        g.push(`<rect x="${(px - 2.6).toFixed(1)}" y="${y0 + 4}" width="5.2" height="6" rx="1" fill="#101215"/><rect x="${(px - 0.9).toFixed(1)}" y="${y0 - 10}" width="1.8" height="15" fill="url(#${P}gold)"/>`
          + text(px, y0 + 17, nm, 4.2, '#E6EDF5', 'middle', 700));
        pins.push([px, y0 - 10]);
      });
      const gx = x0 + (w - 165) / 2, gy = y0 + 26, gw = 165, gh = 84;
      g.push(`<rect x="${gx - 5}" y="${gy - 5}" width="${gw + 10}" height="${gh + 12}" rx="2" fill="#15181D"/><rect x="${gx}" y="${gy}" width="${gw}" height="${gh}" fill="url(#${P}oledGlass)"/>`
        + `<path d="M${gx + 4},${gy + 4} h${gw * 0.3} l${-gw * 0.18},${gh - 8} h-${gw * 0.12} Z" fill="#FFFFFF" opacity="0.04"/>`);
      return { svg: g.join(''), pins, screen: [gx, gy, gw, gh] };
    }
    // the OLED's text, in its pixels: [[text, size, dy, colour?, dx?], …]
    const oledText = (scr, lines) => lines.map(([s, size, dy, col, dx]) => text(scr[0] + (dx == null ? 8 : dx), scr[1] + dy, s, size, col || '#CFEFFF', 'start', 600, true, `filter="${u('soft')}"`)).join('');

    // ───────────── the chart: the light at the sensor and the reading over the stop ─────────────
    // (a measurement readout: it may stand beside the set-up). x0, y0, w, h: its box; dur: the stop's length (s); tNow: how far
    // the stop has run; luxAt(t), codeAt(t); words: { title, light, code, time }. Light on a log axis 1 … 2000 lux (amber), the
    // code on 0 … 4095 (teal), both against the stop's time.
    function chart(x0, y0, w, h, dur, tNow, luxAt, codeAt, words) {
      const g = [], px0 = x0 + 64, px1 = x0 + w - 64, py0 = y0 + 62, py1 = y0 + h - 46;
      const X = t => px0 + (px1 - px0) * t / dur, YL = l => py1 - (py1 - py0) * Math.log10(Math.max(1, l)) / Math.log10(DIM.hi), YC = c => py1 - (py1 - py0) * c / 4095;
      g.push(`<rect x="${x0}" y="${y0}" width="${w}" height="${h}" rx="16" fill="#07111A" fill-opacity="0.94" stroke="#2A3442" stroke-width="1.4"/>`
        + text(x0 + 22, y0 + 32, words.title, fit(words.title, 17, 700, w - 44), '#E6EDF5', 'start', 700));
      for (const l of [1, 10, 100, 1000]) g.push(`<line x1="${px0}" y1="${YL(l).toFixed(1)}" x2="${px1}" y2="${YL(l).toFixed(1)}" stroke="#1C2430"/>` + text(px0 - 8, YL(l) + 4, String(l), 11, '#FFC24D', 'end', 600, true));
      for (const c of [0, 2048, 4095]) g.push(text(px1 + 8, YC(c) + 4, String(c), 11, '#2EE6C5', 'start', 600, true));
      g.push(`<line x1="${px0}" y1="${py1}" x2="${px1}" y2="${py1}" stroke="#3A4656"/>`
        + text(px0 - 8, py0 - 14, words.light, 12, '#FFC24D', 'end', 700) + text(px1 + 8, py0 - 14, words.code, 12, '#2EE6C5', 'start', 700)
        + text((px0 + px1) / 2, py1 + 22, words.time, 11.5, '#8B97A8', 'middle', 500));
      const n = Math.max(2, Math.round(160 * Math.min(1, tNow / dur))), tl = Math.min(dur, tNow);
      let dl = '', dc = '';
      for (let i = 0; i <= n; i++) { const t = tl * i / n; dl += (i ? ' L' : 'M') + X(t).toFixed(1) + ',' + YL(luxAt(t)).toFixed(1); }
      const m = Math.max(2, Math.round(tl * 10));
      for (let i = 0; i <= m; i++) { const t = tl * i / m; dc += (i ? ' L' : 'M') + X(t).toFixed(1) + ',' + YC(codeAt(t)).toFixed(1); }
      g.push(`<path d="${dl}" fill="none" stroke="#FFC24D" stroke-width="2.6" filter="${u('soft')}"/><path d="${dc}" fill="none" stroke="#2EE6C5" stroke-width="2.2" filter="${u('soft')}"/>`
        + `<circle cx="${X(tl).toFixed(1)}" cy="${YL(luxAt(tl)).toFixed(1)}" r="4.5" fill="#FFC24D"/><circle cx="${X(tl).toFixed(1)}" cy="${YC(codeAt(tl)).toFixed(1)}" r="4.5" fill="#2EE6C5"/>`);
      return g.join('');
    }

    // ───────────── the quantities that are not electrical: a pressure gauge on an air line (stage space) ─────────────
    // A 63 mm Bourdon gauge, 0 … 10 bar over 270°, on a tee in a compressed-air line; bar: its reading
    function airGauge(cx, cy, r, bar) {
      const g = [], a = b => (-135 + 270 * b / 10) * Math.PI / 180;
      g.push(`<rect x="${cx - 190}" y="${cy + r + 20}" width="380" height="22" rx="11" fill="url(#${P}pipe)"/>`
        + `<rect x="${cx - 16}" y="${cy + r - 2}" width="32" height="26" fill="url(#${P}pipe)"/><rect x="${cx - 24}" y="${cy + r + 14}" width="48" height="34" rx="4" fill="url(#${K.P}brass)"/>`
        + `<rect x="${cx - 200}" y="${cy + r + 16}" width="16" height="30" rx="3" fill="url(#${K.P}brass)"/><rect x="${cx + 184}" y="${cy + r + 16}" width="16" height="30" rx="3" fill="url(#${K.P}brass)"/>`);
      g.push(`<circle cx="${cx}" cy="${cy}" r="${r + 8}" fill="url(#${P}chrome)" stroke="#3E464F"/><circle cx="${cx}" cy="${cy}" r="${r}" fill="url(#${P}gaugeFace)"/>`);
      for (let b = 0; b <= 10; b += 0.5) {
        const big = b % 1 === 0, an = a(b), r0 = r - (big ? 13 : 8);
        g.push(`<line x1="${(cx + Math.sin(an) * r0).toFixed(1)}" y1="${(cy - Math.cos(an) * r0).toFixed(1)}" x2="${(cx + Math.sin(an) * (r - 3)).toFixed(1)}" y2="${(cy - Math.cos(an) * (r - 3)).toFixed(1)}" stroke="#1A1D22" stroke-width="${big ? 1.8 : 1}"/>`);
        if (big && b % 2 === 0) g.push(text(cx + Math.sin(an) * (r - 24), cy - Math.cos(an) * (r - 24) + 4, String(b), 11, '#1A1D22', 'middle', 700));
      }
      g.push(text(cx, cy + r * 0.45, 'bar', 11, '#1A1D22', 'middle', 700));
      const an = a(bar);
      g.push(`<line x1="${cx - Math.sin(an) * 10}" y1="${cy + Math.cos(an) * 10}" x2="${(cx + Math.sin(an) * (r - 10)).toFixed(1)}" y2="${(cy - Math.cos(an) * (r - 10)).toFixed(1)}" stroke="#C0262B" stroke-width="2.6" stroke-linecap="round"/><circle cx="${cx}" cy="${cy}" r="5" fill="#2A2E34"/>`
        + `<path d="M${cx - r * 0.7},${cy - r * 0.5} A${r},${r} 0 0 1 ${cx + r * 0.2},${cy - r * 0.86}" fill="none" stroke="#FFFFFF" stroke-opacity="0.35" stroke-width="5" stroke-linecap="round"/>`);
      return g.join('');
    }

    // ───────────── the card's set-up on its bench top (stage space, the bench top at RIG.fl, 3 px a millimetre) ─────────────
    // o: { mode: 'bare' (a bare lead from A0 lying in the light) | 'sensor' (the LDR board, wired to 3V3, A0, GND) | 'none',
    // luxAt(t) (the light at the sensor at the stop's time t), dimAt(t) (the wheel), S (timeline), wrap (a transform for the
    // moving layers, when the unit scales the set-up), show(t) (their opacity, when the set-up comes in late), reading(t, a) →
    // the code the ADC returns }. Everything on the bench is drawn to one scale, 1 mm = 3 px (the lamp's head, the boards,
    // the display, the dimmer, the leads); the parts too small to read are shown again through a magnifier by the units.
    const RIG = { fl: 780, spotX: 560, mouthY: 330, mcuX: 700, oledX: 1108, dimX: 250, dimY: 846, dimS: 1.9, mm: 3 };
    function rig(o) {
      const S = o.S, g = [], fl = RIG.fl;
      const wrapL = c => { const w = o.wrap ? `<g transform="${o.wrap}">${c}</g>` : c; return o.show && S ? S.g(t => ({ opacity: o.show(t).toFixed(3) }), w) : w; };
      const mx = RIG.spotX - Math.tan(6 * Math.PI / 180) * (fl - RIG.mouthY);
      const lamp = lampHead(mx, RIG.mouthY, fl, S, (t, a) => glowOf(o.luxAt(t)), { wrapFn: wrapL });
      const mcu = mcuBoard(RIG.mcuX, fl);
      const ol = oled(RIG.oledX, fl - 152, []);
      // the dimmer (85 × 35 mm) lying on the bench in front, on the lamp's cord: the cord comes in from the lamp's base off the
      // bench's left end, through the dimmer, and back out to the wall socket
      const dS = RIG.dimS, dm0 = cordDimmer(RIG.dimX, RIG.dimY, 0.75), dx0 = RIG.dimX - (RIG.dimX - dm0.x0) * dS, dx1 = RIG.dimX + (dm0.x1 - RIG.dimX) * dS;
      const cord = `M0,${fl + 14} C70,${fl + 16} ${dx0 - 70},${RIG.dimY} ${dx0},${RIG.dimY} M${dx1},${RIG.dimY} C${dx1 + 90},${RIG.dimY + 2} ${dx1 + 80},${RIG.dimY + 46} ${dx1 - 20},${RIG.dimY + 50} S60,${RIG.dimY + 44} 0,${RIG.dimY + 48}`;
      g.push(`<path d="${cord}" fill="none" stroke="#0E1013" stroke-width="7" stroke-linecap="round"/><path d="${cord}" fill="none" stroke="#FFFFFF" stroke-opacity="0.1" stroke-width="1.6" transform="translate(0 -1.6)"/>`);
      g.push(lamp.svg);
      const dimSvg = d => scaleAbout(cordDimmer(RIG.dimX, RIG.dimY, d).svg, RIG.dimX, RIG.dimY, dS);
      if (S) S.top(wrapL(S.g(t => ({ html: dimSvg(o.dimAt(t)) }), ''))); else g.push(dimSvg(0.75));
      const leads = [], at = { lamp, mcu, oled: ol, dimmer: { wheel: [RIG.dimX + (dm0.wheel[0] - RIG.dimX) * dS, RIG.dimY], w: dm0.w * dS, h: dm0.h * dS }, spot: [lamp.hit[0], fl] };
      const pin = n => mcu.pins[n];
      const LW = 4.2;
      if (o.mode === 'bare') {
        const end = [lamp.hit[0] - 30, fl + 10], a0 = pin('A0');
        leads.push(lead(a0, end, [a0[0] - 6, a0[1] - 110], [end[0] + 140, end[1] - 30], '#F2C230', { bare: true, w: LW }).svg);
        at.bare = [end[0] + 12, end[1] + 2];
      } else if (o.mode === 'sensor') {
        const sb = sensorBoard(lamp.hit[0] + 6, fl);
        g.push(sb.svg);
        at.sensor = sb;
        const [vcc, out, gnd] = sb.pins;
        leads.push(lead(vcc, pin('3V3'), [vcc[0] + 16, vcc[1] - 70], [pin('3V3')[0] - 10, pin('3V3')[1] - 80], '#D8343B', { w: LW }).svg);
        leads.push(lead(gnd, pin('GND'), [gnd[0] + 22, gnd[1] - 50], [pin('GND')[0] - 8, pin('GND')[1] - 60], '#1C1F24', { w: LW }).svg);
        const ol0 = lead(out, pin('A0'), [out[0] + 30, out[1] - 90], [pin('A0')[0] - 4, pin('A0')[1] - 100], '#F2C230', { w: LW });
        leads.push(ol0.svg);
        at.outLead = ol0.d;
      }
      g.push(mcu.svg);
      const op = ol.pins;   // GND VCC SCL SDA
      const oledLeads = [['GND2', 0, '#1C1F24'], ['5V', 1, '#D8343B'], ['SCL', 2, '#2F7FE0'], ['SDA', 3, '#2EB872']]
        .map(([n, k, c], i) => lead(pin(n), op[k], [pin(n)[0] + 4, pin(n)[1] - 60 - i * 10], [op[k][0] - 10, op[k][1] - 50 - i * 6], c, { w: LW }).svg);
      g.push(ol.svg, oledLeads.join(''), leads.join(''));
      if (S) S.top(wrapL(S.g((t, a) => {
        const c = o.reading(t, a);
        if (c == null) return { html: '' };
        return { html: oledText(ol.screen, [['A0', 11, 16, '#7FB8E0'], [String(c), 40, 58], [`${vOfCode(c).toFixed(3)} V`, 15, 78, '#9FD4FF']]) };
      }, '')));
      return { svg: g.join(''), at };
    }

    const fmtR = r => (r >= 1e6 ? (r / 1e6).toFixed(2) + ' MΩ' : r >= 1e4 ? (r / 1e3).toFixed(1) + ' kΩ' : r >= 1e3 ? (r / 1e3).toFixed(2) + ' kΩ' : r.toFixed(0) + ' Ω');
    const fmtLux = l => (l >= 10 ? String(Math.round(l)) : l.toFixed(1));
    return { fmtR, fmtLux, DEFS, LDR, ldrR, outV, codeOf, codeOfV, vOfCode, luxOfCode, ldrI, ldrP, DIM, luxOfDim, dimOfLux, glowOf, floatCode, sweepLux, SWEEP,
      measure, fit, wrap, runs, lead, lampHead, cordDimmer, sensorBoard, mcuBoard, MCU_NAMES, oled, oledText, scaleAbout, ptAbout, chart, airGauge, rig, RIG, f1 };
  };
})();
