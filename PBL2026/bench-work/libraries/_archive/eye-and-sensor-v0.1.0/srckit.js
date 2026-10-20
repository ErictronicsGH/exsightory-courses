// The error-sources kit: what D1·020 card 7's units share ("Where error comes from"). Card 1's hot-water chain (a glass mug
// of water, an NTC 10 kΩ probe in a stainless sheath, the conditioning board, the converter board with its ADC and MCU, the
// display), now standing on a hot plate whose set-temperature dial is the chain's one input; the course's six stages; the
// six kinds of error with their inks and letters; pins; an analog panel meter; plot axes. Every number is computed here:
// the NTC's B-model and its divider, the firmware's straight line fitted over 0 … 50 °C, the probe's stem as a two-part
// fin (immersed, and in the room's air), the probe's first-order lag, the heat a cold probe takes from the water. Each unit
// carries its own copy (a library is a self-contained folder); the master is libraries/source-kit/. Built on svgkit.js and
// dinkit.js: SRCKIT(K, D) takes the unit's kits (its id prefix keeps every gradient its own).
'use strict';
(function () {
  // ───────────── the numbers ─────────────
  // the sensor: an NTC thermistor, 10 kΩ at 25 °C, B 3950 K (the B-model, itself a first-order approximation of the
  // Steinhart–Hart curve), in a divider under a 10 kΩ resistor from 3.3 V; the ADC reads the divider's middle
  const NTC = { R25: 10000, B: 3950, T25: 298.15, Rf: 10000, Vs: 3.3 };
  const R = T => NTC.R25 * Math.exp(NTC.B * (1 / (T + 273.15) - 1 / NTC.T25));
  const V = T => NTC.Vs * R(T) / (R(T) + NTC.Rf);
  const dVdT = T => (V(T + 0.05) - V(T - 0.05)) / 0.1;
  // the firmware's model: a straight line T = m · V + c, least squares over 0 … 50 °C (every 0.5 °C)
  const FIT = (() => {
    const xs = [], ys = [];
    for (let t = 0; t <= 50; t += 0.5) { xs.push(V(t)); ys.push(t); }
    const n = xs.length, mx = xs.reduce((a, b) => a + b) / n, my = ys.reduce((a, b) => a + b) / n;
    let sxy = 0, sxx = 0;
    xs.forEach((x, i) => { sxy += (x - mx) * (ys[i] - my); sxx += (x - mx) * (x - mx); });
    const m = sxy / sxx, c = my - m * mx;
    let worst = 0;
    for (let t = 0; t <= 50; t += 0.5) worst = Math.max(worst, Math.abs(m * V(t) + c - t));
    return { m, c, lo: 0, hi: 50, worst };
  })();
  const lineRead = T => FIT.m * V(T) + FIT.c;            // what the firmware's straight line reports at a true T
  const lineV = T => (T - FIT.c) / FIT.m;                 // the line drawn in the V–T plane
  const WATER_T = 63.2, ROOM_T = 22.0;                   // card 1's hot water, and the room

  // the probe's stem (environmental: the room's air reaches the bead through the sheath): stainless sheath Ø 4 × 0.5 mm wall,
  // 100 mm long (k 16 W/m·K); immersed length L1 in water (h 500 W/m²·K), the rest, 100 − L1 mm, in the room's air up to its
  // handle (h 10 still, 50 in a light draught; the handle taken as adiabatic), the bead at an adiabatic tip. Two fins joined
  // at the surface (T and heat flow continuous):
  // θ_tip = −ΔT · m2·tanh(m2·L2) / (m1·sinh(m1·L1) + m2·tanh(m2·L2)·cosh(m1·L1))
  const STEM = { k: 16, ro: 0.002, ri: 0.0015, h1: 500, h2: 10, h2draught: 50, len: 100 };   // len: the sheath (mm)
  const finM = h => Math.sqrt(h * 2 * Math.PI * STEM.ro / (STEM.k * Math.PI * (STEM.ro * STEM.ro - STEM.ri * STEM.ri)));
  function stemError(L1mm, draught, Tw = WATER_T, Ta = ROOM_T) {
    const m1 = finM(STEM.h1), m2 = finM(draught ? STEM.h2draught : STEM.h2), L1 = Math.max(0.0005, L1mm / 1000), L2 = (STEM.len - L1mm) / 1000, t2 = m2 * Math.tanh(m2 * L2);
    return -(Tw - Ta) * t2 / (m1 * Math.sinh(m1 * L1) + t2 * Math.cosh(m1 * L1));
  }
  // the sheath's temperature at s mm from the tip (in the water up to L1, then in the air up to L1 + 60 mm)
  function stemAt(s, L1mm, draught, Tw = WATER_T, Ta = ROOM_T) {
    const m1 = finM(STEM.h1), m2 = finM(draught ? STEM.h2draught : STEM.h2), L1 = Math.max(0.0005, L1mm / 1000), x = s / 1000;
    const th = stemError(L1mm, draught, Tw, Ta);
    if (x <= L1) return Tw + th * Math.cosh(m1 * x);
    const L2 = (STEM.len - L1mm) / 1000, Ts = Tw + th * Math.cosh(m1 * L1), y = Math.min(L2, x - L1);
    return Ta + (Ts - Ta) * Math.cosh(m2 * (L2 - y)) / Math.cosh(m2 * L2);
  }
  // the mug as drawn (card 1's, 2.8 px a mm): inside Ø 80 mm at the water line, Ø 68.6 mm at the bottom, 52.1 mm of water:
  // 226.6 mL by its frustum, taken as 225 mL; a 250 g soda-lime glass mug (0.84 J/g·K: 210 J/K) at the water's temperature
  const MUG = { mL: 225, glassC: 250 * 0.84, rise60: 32.4 };          // rise60: the water line's rise for 60 mL more (px)
  const cWater = (mL, T) => mL * (T > 40 ? 0.9813 : 0.9986) * 4.185;  // J/K (density at 63 °C or at 18 °C)
  // the probe's lag (dynamic). The hot plate off; 60 mL of water at 18 °C poured in from 2 s to 3 s and stirred (the water
  // at the probe follows the bulk with τ 1.5 s); the bulk by its energy: (924 · 63.2 + 251 · 18) / 1175 = 53.55 °C; the
  // glass then gives heat back (G ≈ 2.2 W/K: 0.0153 m² wetted at ≈ 145 W/m²·K; τ ≈ 80 s, toward 55.0 °C); the probe a
  // first-order sensor, τ 6 s (a 4 mm sheathed probe in stirred water). Integrated in 1 ms steps, kept every 10 ms.
  const LAG = { tau: 6, mixTau: 1.5, pour: 2, pourDur: 1, coldML: 60, coldT: 18, G: 2.22, T0: WATER_T };
  LAG.Cw = cWater(MUG.mL, WATER_T); LAG.Cc = cWater(LAG.coldML, LAG.coldT);
  LAG.Tmix = (LAG.Cw * WATER_T + LAG.Cc * LAG.coldT) / (LAG.Cw + LAG.Cc);
  LAG.Teq = (LAG.Cw * WATER_T + LAG.Cc * LAG.coldT + MUG.glassC * WATER_T) / (LAG.Cw + LAG.Cc + MUG.glassC);
  const pourF = t => clampV((t - LAG.pour) / LAG.pourDur);
  function clampV(v) { return Math.max(0, Math.min(1, v)); }
  const LAGT = (() => {
    const dt = 0.001, out = { w: [], p: [] };
    let Q = 0, Tg = WATER_T, Tl = WATER_T, y = WATER_T;
    for (let k = 0; k <= 30000; k++) {
      const t = k * dt, f = pourF(t), C = LAG.Cw + LAG.Cc * f, Tb = (LAG.Cw * WATER_T + LAG.Cc * f * LAG.coldT + Q) / C;
      if (k % 10 === 0) { out.w.push(Tl); out.p.push(y); }
      const q = LAG.G * (Tg - Tb);
      Q += q * dt; Tg -= q * dt / MUG.glassC; Tl += (Tb - Tl) * dt / LAG.mixTau; y += (Tl - y) * dt / LAG.tau;
    }
    return out;
  })();
  const lagAt = (arr, t) => { const x = Math.max(0, Math.min(2999.999, t * 100)), i = Math.floor(x), r = x - i; return arr[i] + (arr[i + 1] - arr[i]) * r; };
  const trueAt = t => lagAt(LAGT.w, t), probeAt = t => lagAt(LAGT.p, t);
  // insertion: the probe at the room's 22 °C dipped in, its immersed 42 mm (a 4 × 0.5 mm stainless sheath, 1.84 g × 0.50,
  // and its compacted MgO filling, 0.90 g × 0.92: 1.74 J/K) against the water and the mug at 63.2 °C (924 + 210 J/K);
  // the same probe in a 5 mL sample in a 5 g glass vial (20.5 + 4.2 J/K)
  const INS = { cp: 1.84 * 0.50 + 0.90 * 0.92, Tp: ROOM_T, ch: cWater(MUG.mL, WATER_T) + MUG.glassC, cv: cWater(5, WATER_T) + 5 * 0.84 };
  INS.Tf = (INS.ch * WATER_T + INS.cp * INS.Tp) / (INS.ch + INS.cp);
  INS.dT = WATER_T - INS.Tf;
  INS.Tv = (INS.cv * WATER_T + INS.cp * INS.Tp) / (INS.cv + INS.cp);
  INS.dTv = WATER_T - INS.Tv;
  // self-heating: the divider's current through the NTC at 63.2 °C, and its dissipation constant (8 mW/K stirred water)
  INS.P = (() => { const r = R(WATER_T), i = NTC.Vs / (r + NTC.Rf); return i * i * r; })();
  INS.selfDT = INS.P / 0.008;

  // a characteristic (illustrative instrument): zero offset +0.8 °C, gain +1.5 %, non-linearity (a bow, 0.5 °C at mid
  // scale), hysteresis ±0.3 °C (low rising, high falling), resolution 0.5 °C
  const CH = { off: 0.8, gain: 0.015, nl: 0.5, hys: 0.3, res: 0.5 };
  const chTerm = {
    offset: T => CH.off,
    gain: T => CH.gain * T,
    linearity: T => CH.nl * 4 * (T / 100) * (1 - T / 100),
    hysteresis: (T, up) => up ? -CH.hys : CH.hys,
  };
  const chRaw = (T, up = true) => T + chTerm.offset(T) + chTerm.gain(T) + chTerm.linearity(T) + chTerm.hysteresis(T, up);
  const chRead = (T, up = true) => Math.round(chRaw(T, up) / CH.res) * CH.res;

  // the six kinds of error (the Flow's four, and the two the course meets at the converter and the firmware): ink, letter
  const CAT = {
    theo: { col: '#2EE6C5', L: 'T' }, stat: { col: '#FFC24D', L: 'S' }, dyn: { col: '#B48CFF', L: 'D' },
    ins: { col: '#FF6B9A', L: 'I' }, quant: { col: '#38B6FF', L: 'Q' }, digit: { col: '#A8E05F', L: 'N' },
  };

  window.SRCKIT = function (K, D) {
    const { text, u } = K, P = K.P;
    const SANS = `font-family="'IBM Plex Sans','Segoe UI',system-ui,sans-serif"`;
    const fit = D.fit;

    const DEFS = `<defs>
<linearGradient id="${P}pcb" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#1D6B3E"/><stop offset="1" stop-color="#0C3D22"/></linearGradient>
<linearGradient id="${P}chip" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#2A2E35"/><stop offset="1" stop-color="#121418"/></linearGradient>
<linearGradient id="${P}term" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#3FB56A"/><stop offset="1" stop-color="#1E6B3A"/></linearGradient>
<linearGradient id="${P}clearWater" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#CFF0FF" stop-opacity="0.30"/><stop offset="0.7" stop-color="#8FD4F5" stop-opacity="0.26"/><stop offset="1" stop-color="#FFB060" stop-opacity="0.45"/></linearGradient>
<linearGradient id="${P}coolWater" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#CFF0FF" stop-opacity="0.30"/><stop offset="1" stop-color="#8FD4F5" stop-opacity="0.30"/></linearGradient>
<linearGradient id="${P}box" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#121B27"/><stop offset="1" stop-color="#0A1018"/></linearGradient>
<linearGradient id="${P}plate" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#E9EEF3"/><stop offset="0.5" stop-color="#B9C3CE"/><stop offset="1" stop-color="#7D8894"/></linearGradient>
<linearGradient id="${P}plateTop" x1="0" y1="0" x2="1" y2="0"><stop offset="0" stop-color="#3A3F46"/><stop offset="0.5" stop-color="#5A616A"/><stop offset="1" stop-color="#33383E"/></linearGradient>
<linearGradient id="${P}dial" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#F4F1EA"/><stop offset="1" stop-color="#D6D0C4"/></linearGradient>
<linearGradient id="${P}mirror" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#C9D6E2"/><stop offset="0.5" stop-color="#F4F8FB"/><stop offset="1" stop-color="#9FB0C0"/></linearGradient>
<radialGradient id="${P}hot" cx="0.5" cy="0.5" r="0.5"><stop offset="0.5" stop-color="#FF7A1A" stop-opacity="0"/><stop offset="0.8" stop-color="#FF9A3A" stop-opacity="0.9"/><stop offset="1" stop-color="#FF5A00" stop-opacity="0"/></radialGradient>
<marker id="${P}arrS" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="6" markerHeight="6" orient="auto"><path d="M0,0 L10,5 L0,10 z" fill="#2EE6C5"/></marker>
<marker id="${P}arrW" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse"><path d="M0,0 L10,5 L0,10 z" fill="#E6EDF5"/></marker>
<marker id="${P}arrR" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse"><path d="M0,0 L10,5 L0,10 z" fill="#FF6B9A"/></marker>
<marker id="${P}arrA" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse"><path d="M0,0 L10,5 L0,10 z" fill="#FFC24D"/></marker>
</defs>`;

    // ───────────── the six stages (card 1's strip) ─────────────
    const STAGES = ['quantity', 'sensor', 'conditioning', 'adc', 'firmware', 'number'];
    function icon(id, x, y, col) {
      const s = `fill="none" stroke="${col}" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"`;
      if (id === 'quantity') return `<g ${s}><ellipse cx="${x}" cy="${y}" rx="19" ry="7.5"/><ellipse cx="${x}" cy="${y}" rx="19" ry="7.5" transform="rotate(60 ${x} ${y})"/><ellipse cx="${x}" cy="${y}" rx="19" ry="7.5" transform="rotate(-60 ${x} ${y})"/></g><circle cx="${x}" cy="${y}" r="3.6" fill="${col}"/>`;
      if (id === 'sensor') return `<g ${s}><path d="M${x - 3},${y - 14} V${y + 14} M${x + 3},${y - 9} V${y + 9}"/><path d="M${x - 10},${y - 9} q-6,9 0,18 M${x - 16},${y - 14} q-10,14 0,28 M${x + 10},${y - 9} q6,9 0,18 M${x + 16},${y - 14} q10,14 0,28"/></g>`;
      if (id === 'firmware') {
        let p = `<rect x="${x - 11}" y="${y - 11}" width="22" height="22" rx="3" ${s}/><rect x="${x - 4.5}" y="${y - 4.5}" width="9" height="9" rx="1.5" ${s}/>`;
        for (const d of [-6, 0, 6]) p += `<path d="M${x + d},${y - 11} v-6 M${x + d},${y + 11} v6 M${x - 11},${y + d} h-6 M${x + 11},${y + d} h6" ${s}/>`;
        return p;
      }
      if (id === 'conditioning') {
        let p = '';
        for (let k = 0; k < 8; k++) { const a = k * Math.PI / 4; p += `<path d="M${(x + 12 * Math.cos(a)).toFixed(1)},${(y + 12 * Math.sin(a)).toFixed(1)} L${(x + 17 * Math.cos(a)).toFixed(1)},${(y + 17 * Math.sin(a)).toFixed(1)}" ${s} stroke-width="5.5"/>`; }
        return p + `<circle cx="${x}" cy="${y}" r="12.5" ${s}/><circle cx="${x}" cy="${y}" r="5" ${s}/>`;
      }
      if (id === 'adc') return `<path d="M${x - 22},${y} h8 l4,-10 l5,22 l5,-26 l5,20 l3,-6 h12" ${s}/>`;
      return `<rect x="${x - 24}" y="${y - 13}" width="48" height="26" rx="4" ${s}/>` + text(x, y + 5, '0101', 13, col, 'middle', 700, true);
    }
    // the strip: six boxes from x0, each w wide with gap g, at y (h tall); names(id) → the stage's word; lit: ids lit
    function strip(x0, y, w, g, h, names, o = {}) {
      const out = [], cx = [], lit = o.lit || [];
      STAGES.forEach((id, k) => {
        const x = x0 + k * (w + g), on = lit.includes(id), col = on ? '#2EE6C5' : '#8FA0B5', r = 14;
        cx.push(x + w / 2);
        out.push(`<rect x="${x}" y="${y}" width="${w}" height="${h}" rx="${r}" fill="url(#${P}box)" stroke="${col}" stroke-opacity="${on ? 1 : 0.55}" stroke-width="${on ? 2.6 : 1.6}"/>`
          + `<path d="M${x + r},${y + 1.5} H${x + w - r}" stroke="#fff" stroke-opacity="0.08" stroke-width="1.5"/>`
          + icon(id, x + 48, y + h / 2, on ? '#A6FFF0' : '#B9C8D8')
          + text(x + 84, y + h / 2 + 7, names(id), fit(names(id), 20, 600, w - 94), '#DCE3EA', 'start', 600));
        if (k < 5) out.push(`<path d="M${x + w + 8},${y + h / 2} H${x + w + g - 10}" stroke="#2EE6C5" stroke-opacity="0.9" stroke-width="2.4" marker-end="url(#${P}arrS)"/>`);
      });
      return { svg: out.join(''), cx, top: y, bot: y + h, gapX: k => x0 + k * (w + g) + w + g / 2 };
    }

    // ───────────── the hot plate, the mug, the probe ─────────────
    // a hot plate (stage space): a cast body with a ceramic-glass top, a set-temperature dial (°C, 30 … 100 over 270°),
    // the heater's ring glowing under the top while it is on; cx its centre, fl the bench top. Returns its top's y and the
    // dial's centre.
    const PLATE = { w: 300, h: 56, dialR: 21 };
    const dialAng = T => -135 + 270 * K.clamp((T - 30) / 70);
    function hotPlate(cx, fl, setT, o = {}) {
      const g = [], w = PLATE.w, h = PLATE.h, top = fl - h, x0 = cx - w / 2;
      g.push(`<path d="M${x0 + 8},${fl} L${x0},${top + 14} Q${x0},${top} ${x0 + 14},${top} H${x0 + w - 14} Q${x0 + w},${top} ${x0 + w},${top + 14} L${x0 + w - 8},${fl} Z" fill="url(#${P}plate)" stroke="#5B6672" stroke-width="1.4"/>`);
      g.push(`<rect x="${x0 + 4}" y="${top + 2}" width="${w - 8}" height="5" rx="2.5" fill="#fff" opacity="0.5"/>`);
      g.push(`<rect x="${x0 + 18}" y="${top - 10}" width="${w - 36}" height="12" rx="4" fill="url(#${P}plateTop)" stroke="#22262B"/>`);
      if (o.on !== false) g.push(`<ellipse cx="${cx}" cy="${top - 4}" rx="${w / 2 - 34}" ry="7" fill="url(#${P}hot)" opacity="0.8"/><ellipse cx="${cx}" cy="${top - 10}" rx="${w / 2 - 20}" ry="22" fill="#FF7A1A" opacity="0.16" filter="${u('big')}"/>`);
      // the front panel: the dial, a pilot lamp, the marks
      const dx = x0 + w - 56, dy = top + h / 2 + 4;
      g.push(`<rect x="${x0 + 22}" y="${top + 14}" width="${w - 44}" height="${h - 22}" rx="6" fill="#20262E" stroke="#11151A"/>`);
      for (let v = 30; v <= 100; v += 10) {
        const a = dialAng(v) * Math.PI / 180, r0 = PLATE.dialR + 3, r1 = PLATE.dialR + (v % 50 === 0 ? 8 : 6);
        g.push(`<line x1="${(dx + r0 * Math.sin(a)).toFixed(1)}" y1="${(dy - r0 * Math.cos(a)).toFixed(1)}" x2="${(dx + r1 * Math.sin(a)).toFixed(1)}" y2="${(dy - r1 * Math.cos(a)).toFixed(1)}" stroke="#C9D1D9" stroke-width="1.1"/>`);
      }
      if (!o.bare) g.push(plateFace(cx, fl, setT, o.on !== false));
      g.push(`<circle cx="${x0 + 44}" cy="${dy}" r="5" fill="${o.on !== false ? '#FF8A2A' : '#4A2A18'}"/>` + (o.on !== false ? `<circle cx="${x0 + 44}" cy="${dy}" r="11" fill="#FF8A2A" opacity="0.5" filter="${u('soft')}"/>` : ''));
      g.push(text(x0 + 58, dy + 4, 'HEAT', 10.5, '#9AA8B6', 'start', 700));
      return { svg: g.join(''), top: top - 10, dial: [dx, dy], dialR: PLATE.dialR };
    }
    // the dial and its set-value readout alone (a plate drawn o.bare leaves them out, so a unit can turn the dial as it plays)
    function plateFace(cx, fl, setT, on = true) {
      const dx = cx - PLATE.w / 2 + PLATE.w - 56, dy = fl - PLATE.h + PLATE.h / 2 + 4;
      return D.knob(dx, dy, PLATE.dialR - 4, dialAng(setT))
        + text(dx - 44, dy + 5, on ? `${setT.toFixed(1)} °C` : 'OFF', 13, on ? '#FFB547' : '#8B97A8', 'end', 700, true);
    }
    // card 1's glass mug of hot water, standing on y = base (its bottom), centred at qx; S for its bubbles and steam (moving
    // layer). Returns the water's surface y and the inside's x range.
    function mug(qx, base, S, o = {}) {
      const g = [], mb = base, mt = mb - 212, steam = o.steam !== false;
      // (o.cool: water not yet warm: no warm glow, no warm tint; a unit draws them as it warms)
      if (!o.cool) g.push(`<ellipse cx="${qx}" cy="${mb - 4}" rx="110" ry="14" fill="#FF9A3A" opacity="0.45" filter="${u('big')}"/>`);
      g.push(`<path d="M${qx + 102},${mt + 40} q74,4 74,74 q0,70 -78,74" fill="none" stroke="#D6F0FF" stroke-opacity="0.55" stroke-width="18"/><path d="M${qx + 102},${mt + 40} q74,4 74,74 q0,70 -78,74" fill="none" stroke="#fff" stroke-opacity="0.35" stroke-width="3"/>`);
      const wl = mt + (o.level || 56);
      g.push(`<path d="M${qx - 112 + (wl - mt - 56) * 0.07},${wl} H${qx + 112 - (wl - mt - 56) * 0.07} L${qx + 104},${mb - 10} q-2,10 -12,10 H${qx - 92} q-10,0 -12,-10 Z" fill="url(#${P}${o.cool ? 'coolWater' : 'clearWater'})"/>`);
      g.push(`<ellipse cx="${qx}" cy="${wl}" rx="${112 - (wl - mt - 56) * 0.07}" ry="9" fill="#DDF5FF" opacity="0.45"/>`);
      if (S) S.top(o.wrap ? `<g transform="${o.wrap}">${S.g((t, a) => ({ html: K.bubbles(qx - 90, qx + 90, wl + 14, mb - 14, 22, a, 21, 26, '#F2FBFF') }), '')}</g>` : S.g((t, a) => ({ html: K.bubbles(qx - 90, qx + 90, wl + 14, mb - 14, 22, a, 21, 26, '#F2FBFF') }), ''));
      g.push(`<path d="M${qx - 120},${mt} L${qx - 104},${mb - 8} q2,12 16,12 H${qx + 88} q14,0 16,-12 L${qx + 120},${mt}" fill="url(#${K.P}glassV)" stroke="#E2F4FF" stroke-opacity="0.85" stroke-width="2.4"/>`);
      g.push(`<ellipse cx="${qx}" cy="${mt}" rx="120" ry="12" fill="none" stroke="#E2F4FF" stroke-opacity="0.8" stroke-width="2.4"/>`);
      g.push(`<path d="M${qx - 108},${mt + 20} L${qx - 96},${mb - 20}" stroke="#fff" stroke-opacity="0.45" stroke-width="7" stroke-linecap="round"/><path d="M${qx + 96},${mt + 26} L${qx + 88},${mb - 26}" stroke="#fff" stroke-opacity="0.2" stroke-width="4" stroke-linecap="round"/>`);
      if (S && steam) S.top(o.wrap ? `<g transform="${o.wrap}">${S.g((t, a) => ({ html: K.steam(qx - 10, wl - 4, 4, 170, 175, 0.3, a) }), '')}</g>` : S.g((t, a) => ({ html: K.steam(qx - 10, wl - 4, 4, 170, 175, 0.3, a) }), ''));
      return { svg: g.join(''), top: mt, wl, x0: qx - 104, x1: qx + 104, bottom: mb - 10, px: 2.8 };   // px: stage px a mm (the mug ≈ 80 mm across)
    }
    // the probe: a stainless sheath Ø 4 mm (12 px) from the tip to its top, the NTC bead at the tip, the cable to its head
    // (a small moulded box, "NTC 10 kΩ"). tip, top, head: points. o.warm: the bead's glow 0 … 1; o.cold: a blue tip
    function probe(tip, top, head, o = {}) {
      const g = [], [tx, ty] = tip, [ux, uy] = top, [hx, hy] = head;
      g.push(`<path d="M${tx},${ty} L${ux},${uy}" stroke="#7C8692" stroke-width="12" stroke-linecap="round"/><path d="M${tx - 3},${ty} L${ux - 3},${uy}" stroke="#F2F6FA" stroke-opacity="0.65" stroke-width="3" stroke-linecap="round"/>`);
      g.push(`<circle cx="${tx}" cy="${ty + 4}" r="7" fill="#3A2A20" stroke="#C9A04A" stroke-width="1.5"/>`);
      if (o.warm) g.push(`<circle cx="${tx}" cy="${ty + 4}" r="16" fill="#FFB547" opacity="${(0.6 * o.warm).toFixed(2)}" filter="${u('big')}"/>`);
      if (o.cold) g.push(`<circle cx="${tx}" cy="${ty + 4}" r="16" fill="#5FB8FF" opacity="${(0.6 * o.cold).toFixed(2)}" filter="${u('big')}"/>`);
      g.push(`<path d="M${ux},${uy} C${ux + 30},${uy - 60} ${hx - 120},${hy - 6} ${hx},${hy}" fill="none" stroke="#C9D3DE" stroke-width="9" stroke-linecap="round"/><path d="M${ux},${uy - 3} C${ux + 30},${uy - 63} ${hx - 120},${hy - 9} ${hx},${hy - 3}" fill="none" stroke="#fff" stroke-opacity="0.5" stroke-width="2.5"/>`);
      g.push(`<rect x="${hx}" y="${hy - 22}" width="112" height="44" rx="10" fill="#141A22" stroke="#4A5866"/>` + text(hx + 56, hy + 6, 'NTC 10 kΩ', 14, '#E6EDF5', 'middle', 700, true));
      return g.join('');
    }

    // ───────────── the boards and the display (card 1's) ─────────────
    function pcbParts(x0, y0, w, h) {
      const g = [];
      for (let k = 0; k < 22; k++) {
        const fx = K.rnd(k + 3 * x0, 8), fy = K.rnd(k + 3 * x0, 9), x = x0 + 16 + fx * (w - 40), y = y0 + 14 + fy * (h - 34);
        g.push(k % 3 === 0 ? `<rect x="${x.toFixed(0)}" y="${y.toFixed(0)}" width="12" height="7" rx="1" fill="#C8A060"/><rect x="${(x + 3).toFixed(0)}" y="${y.toFixed(0)}" width="6" height="7" fill="#1A1A1A"/>`
          : k % 3 === 1 ? `<rect x="${x.toFixed(0)}" y="${y.toFixed(0)}" width="9" height="6" rx="1" fill="#B88A5A"/>` : `<circle cx="${x.toFixed(0)}" cy="${y.toFixed(0)}" r="2.6" fill="#C9A04A" stroke="#7A5A1E" stroke-width="0.8"/>`);
      }
      return g.join('');
    }
    function qfp(cx, cy, s, n, label) {
      const g = [`<rect x="${cx - s / 2}" y="${cy - s / 2}" width="${s}" height="${s}" rx="3" fill="url(#${P}chip)" stroke="#000"/>`, `<rect x="${cx - s / 2 + 3}" y="${cy - s / 2 + 3}" width="${s - 6}" height="5" fill="#fff" opacity="0.06"/>`];
      for (let k = 0; k < n; k++) {
        const d = -s / 2 + 6 + k * (s - 12) / (n - 1);
        g.push(`<rect x="${(cx + d - 1.6).toFixed(1)}" y="${cy - s / 2 - 8}" width="3.2" height="8" fill="#D5DCE4"/><rect x="${(cx + d - 1.6).toFixed(1)}" y="${cy + s / 2}" width="3.2" height="8" fill="#D5DCE4"/>`
          + `<rect x="${cx - s / 2 - 8}" y="${(cy + d - 1.6).toFixed(1)}" width="8" height="3.2" fill="#D5DCE4"/><rect x="${cx + s / 2}" y="${(cy + d - 1.6).toFixed(1)}" width="8" height="3.2" fill="#D5DCE4"/>`);
      }
      g.push(`<circle cx="${cx - s / 2 + 9}" cy="${cy - s / 2 + 9}" r="3" fill="#3A3F48"/>` + text(cx, cy + 6, label, s > 90 ? 17 : 15, '#C9D3DE', 'middle', 700, true));
      return g.join('');
    }
    function terminal(x, y, n) {
      let p = `<rect x="${x}" y="${y}" width="26" height="${n * 22}" rx="3" fill="url(#${P}term)" stroke="#0E3B22"/>`;
      for (let k = 0; k < n; k++) p += `<circle cx="${x + 13}" cy="${y + 11 + k * 22}" r="6" fill="#C9D3DE" stroke="#5B636E"/><line x1="${x + 9}" y1="${y + 11 + k * 22}" x2="${x + 17}" y2="${y + 11 + k * 22}" stroke="#333" stroke-width="1.6"/>`;
      return p;
    }
    function condBoard(cx, y0, y1, fl) {
      const x0 = cx - 108, x1 = cx + 108, g = [];
      g.push(`<rect x="${x0 + 6}" y="${y1}" width="${x1 - x0 - 12}" height="${fl - y1}" fill="#000" opacity="0.45"/><rect x="${x0 - 4}" y="${fl - 12}" width="${x1 - x0 + 8}" height="12" rx="3" fill="#15191F"/>`);
      g.push(`<rect x="${x0}" y="${y0}" width="${x1 - x0}" height="${y1 - y0}" rx="6" fill="url(#${P}pcb)" stroke="#2A8A58" stroke-width="1.5"/>`);
      g.push(pcbParts(x0 + 30, y0, x1 - x0 - 60, y1 - y0));
      g.push(terminal(x0 + 4, y0 + 30, 3) + terminal(x1 - 30, y0 + 30, 3));
      g.push(`<rect x="${cx - 30}" y="${y0 + 38}" width="60" height="44" rx="3" fill="url(#${P}chip)" stroke="#000"/>`);
      for (let k = 0; k < 4; k++) g.push(`<rect x="${cx - 26 + k * 15}" y="${y0 + 30}" width="6" height="8" fill="#D5DCE4"/><rect x="${cx - 26 + k * 15}" y="${y0 + 82}" width="6" height="8" fill="#D5DCE4"/>`);
      g.push(`<path d="M${x0 + 30},${y0 + 52} H${cx - 30} M${cx + 30},${y0 + 66} H${x1 - 30}" stroke="#E6C068" stroke-width="2" opacity="0.8"/>`);
      return { svg: g.join(''), x0, x1, mid: (y0 + y1) / 2 };
    }
    // the converter board's traces: the bus from the ADC to the MCU (k of 10), the input and the output
    const BUS = (cA, cM, y0, k) => `M${cA + 50},${y0 + 58 + k * 6} C${cA + 120},${y0 + 58 + k * 6} ${cM - 120},${y0 + 50 + k * 8} ${cM - 72},${y0 + 50 + k * 8}`;
    // (the input runs at the conditioning board's height, inY, so its cable carries straight on into it; both meet the chips'
    // pin rows)
    const CV_IN = (x0, cA, inY) => `M${x0 + 8},${inY} H${cA - 51}`, CV_OUT = (cM, x1, cm) => `M${cM + 68},${cm} H${x1 - 8}`;
    function convBoard(cA, cM, y0, y1, fl, inY) {
      const x0 = cA - 120, x1 = cM + 130, cm = (y0 + y1) / 2, g = [];
      g.push(`<rect x="${x0 + 8}" y="${y1}" width="${x1 - x0 - 16}" height="${fl - y1}" fill="#000" opacity="0.45"/><rect x="${x0 - 4}" y="${fl - 10}" width="${x1 - x0 + 8}" height="10" rx="3" fill="#15191F"/>`);
      g.push(`<rect x="${x0}" y="${y0}" width="${x1 - x0}" height="${y1 - y0}" rx="7" fill="url(#${P}pcb)" stroke="#2A8A58" stroke-width="1.5"/>`);
      g.push(pcbParts(x0, y0, x1 - x0, y1 - y0));
      for (let k = 0; k < 10; k++) g.push(`<path d="${BUS(cA, cM, y0, k)}" fill="none" stroke="#E6C068" stroke-width="1.4" opacity="0.85"/>`);
      // the input trace from the board's edge to the ADC's pins, the output trace from the MCU's pins to the display's connector
      g.push(`<path d="${CV_IN(x0, cA, inY == null ? cm : inY)}" fill="none" stroke="#E6C068" stroke-width="2.2" opacity="0.9"/><path d="${CV_OUT(cM, x1, cm)}" fill="none" stroke="#E6C068" stroke-width="2.2" opacity="0.9"/>`);
      g.push(qfp(cA, cm, 84, 9, 'ADC') + qfp(cM, cm - 4, 118, 12, 'MCU'));
      g.push(`<circle cx="${x0 + 22}" cy="${y0 + 22}" r="6" fill="#FFB547" filter="${u('soft')}"/><rect x="${x1 - 46}" y="${y0 + 14}" width="30" height="14" rx="6" fill="#C9D3DE"/>`);
      for (const [x, y] of [[x0 + 12, y1 - 12], [x1 - 12, y1 - 12], [x1 - 12, y0 + 46]]) g.push(`<circle cx="${x}" cy="${y}" r="5" fill="#0A0F16" stroke="#C9A04A" stroke-width="2"/>`);
      return { svg: g.join(''), x0, x1, mid: cm };
    }
    // the display: a case and its LCD; str (e.g. '63.2') in amber seven segments, °C
    function display(cx, y0, y1, fl, str, o = {}) {
      const x0 = cx - 158, x1 = cx + 158, g = [];
      g.push(`<ellipse cx="${cx}" cy="${fl - 2}" rx="170" ry="14" fill="#FFB547" opacity="0.3" filter="${u('big')}"/>`);
      g.push(`<rect x="${x0}" y="${y0}" width="${x1 - x0}" height="${y1 - y0}" rx="16" fill="url(#${K.P}case)" stroke="#5A6878" stroke-width="1.6"/><rect x="${x0 + 6}" y="${y0 + 4}" width="${x1 - x0 - 12}" height="6" rx="3" fill="#fff" opacity="0.08"/>`);
      g.push(`<rect x="${x0 + 18}" y="${y0 + 20}" width="${x1 - x0 - 36}" height="${y1 - y0 - 40}" rx="8" fill="url(#${K.P}lcd)" stroke="#000"/>`);
      g.push(`<rect x="${x0 + 20}" y="${y1}" width="40" height="10" rx="3" fill="#15191F"/><rect x="${x1 - 60}" y="${y1}" width="40" height="10" rx="3" fill="#15191F"/>`);
      return { svg: g.join(''), digits: s => K.seg7(x1 - 82 - K.seg7Width('63.2', 84), y1 - 40, s.padStart(4, ' '), 84, o.col || '#FFB547') + text(x1 - 32, y1 - 42, '°C', 30, o.col || '#FFB547', 'end', 600, false, `filter="${u('soft')}"`), x0, x1 };
    }

    // ───────────── card 1's chain on its bench top, the hot plate under the mug ─────────────
    // In card 1's coordinates (1920 × 1080, the bench top at FL 646); a unit places it with a transform. o: { T (the water),
    // setT (the dial), reading (the display's string, or a function of the moving layer's time), S (timeline), wrap (the
    // transform, for the moving layer), warm }. Returns its svg (parts and their reflections, cables), the names' anchor
    // points and where each stage's part is.
    const FL = 646, COLX = [189, 497, 805, 1113, 1421, 1729];
    const TERM_Y = 494 + 30 + 11 + 22;                   // the conditioning board's middle screw terminals (in and out): the cables' height
    function chain(o) {
      const g = [], parts = [], S = o.S, wrap = o.wrap || '';
      const qx = COLX[0] + 10, hp = hotPlate(qx, FL, o.setT == null ? 64 : o.setT);
      const mg = mug(qx, hp.top - 2, S, { wrap });
      parts.push([qx - 160, qx + 200, hp.svg + mg.svg]);
      const tipX = qx - 6, tipY = mg.bottom - 30, topX = qx + 50, topY = mg.top - 70, hx = COLX[1] - 54, hy = 350;
      parts.push([qx - 40, hx + 130, probe([tipX, tipY], [topX, topY], [hx, hy], { warm: o.warm == null ? 0.8 : o.warm })]);
      const cb = condBoard(COLX[2], 494, 616, FL), cv = convBoard(COLX[3], COLX[4], 456, 632, FL, TERM_Y), dp = display(COLX[5], 470, 630, FL);
      parts.push([cb.x0 - 10, cb.x1 + 10, cb.svg], [cv.x0 - 10, cv.x1 + 10, cv.svg], [dp.x0 - 20, dp.x1 + 20, dp.svg]);
      g.push(K.floor(0, 1920, FL, null));
      parts.forEach(([a, b, art]) => g.push(art));
      parts.forEach(([a, b, art]) => g.push(K.reflect(art, FL, a, b, 120, 0.22, '#070B12')));
      // the cables, each lit in its signal's colour
      const sig1 = `M${hx + 112},${hy} C${hx + 190},${hy} ${cb.x0 - 60},${hy + 20} ${cb.x0 - 40},${cb.mid - 30} S${cb.x0 - 20},${TERM_Y} ${cb.x0 + 8},${TERM_Y}`;
      const sig2 = `M${cb.x1 - 8},${TERM_Y} H${cv.x0 + 10}`, sig3 = `M${cv.x1 - 8},${cv.mid} H${dp.x0 + 6}`;
      for (const [d, col] of [[sig1, '#FFB547'], [sig2, '#4DD8FF'], [sig3, '#4DD8FF']]) g.push(`<path d="${d}" fill="none" stroke="#1A1E24" stroke-width="7" stroke-linecap="round"/><path d="${d}" fill="none" stroke="${col}" stroke-width="2.6" stroke-linecap="round" filter="${u('glow')}"/>`);
      if (S) for (const d of [sig1, sig2, sig3]) S.top(`<g transform="${wrap}">${S.g((t, a) => ({ 'stroke-dashoffset': (-a * 70).toFixed(1) }), `<path d="${d}" fill="none" stroke="#FFFFFF" stroke-width="2" stroke-dasharray="4 26" stroke-linecap="round"/>`)}</g>`);
      // on the converter board: into the ADC, the converted number over the bus to the MCU, out to the display
      if (S) {
        const cy = (456 + 632) / 2, x0 = COLX[3] - 120, x1 = COLX[4] + 130;
        const on = [CV_IN(x0, COLX[3], TERM_Y), CV_OUT(COLX[4], x1, cy)].map(d => `<path d="${d}" fill="none" stroke="#FFFFFF" stroke-width="2" stroke-dasharray="4 22" stroke-linecap="round"/>`).join('')
          + [0, 3, 6, 9].map(k => `<path d="${BUS(COLX[3], COLX[4], 456, k)}" fill="none" stroke="#BFF6FF" stroke-width="1.8" stroke-dasharray="3 20" stroke-linecap="round"/>`).join('');
        S.top(`<g transform="${wrap}">${S.g((t, a) => ({ 'stroke-dashoffset': (-a * 70).toFixed(1) }), on)}</g>`);
      }
      // the display's digits: live (a function of the moving layer's time) or fixed
      if (typeof o.reading === 'function' && S) S.top(`<g transform="${wrap}">${S.g((t, a) => ({ html: dp.digits(o.reading(t, a)) }), '')}</g>`);
      else g.push(dp.digits(o.reading || WATER_T.toFixed(1)));
      return {
        svg: g.join(''), FL, COLX, mug: mg, plate: hp,
        at: { quantity: [qx, mg.wl + 40], sensor: [tipX, tipY + 4], probeHead: [hx + 56, hy], conditioning: [COLX[2], cb.mid], adc: [COLX[3], cv.mid], firmware: [COLX[4], cv.mid], number: [COLX[5], 550],
          sigSC: [cb.x0 - 40, cb.mid - 30] },
      };
    }

    // ───────────── the kinds of error: a card, a pin, the legend ─────────────
    // a pin: a thin leader from a dot on the part (ax, ay) to a round head (hx, hy) carrying the letter, the label beside the
    // head: line 1 the kind (in its ink), line 2 what · where (module). side: where the label sits ('right' | 'left' | 'up')
    function pin(ax, ay, hx, hy, cat, l1, l2, side = 'right', o = {}) {
      const c = CAT[cat].col, g = [], r = o.r || 17;
      g.push(`<path d="M${ax},${ay} L${hx},${hy}" stroke="${c}" stroke-opacity="0.85" stroke-width="1.8"/><circle cx="${ax}" cy="${ay}" r="5" fill="${c}" filter="${u('soft')}"/>`);
      g.push(`<circle cx="${hx}" cy="${hy}" r="${r + 7}" fill="${c}" opacity="0.18" filter="${u('soft')}"/><circle cx="${hx}" cy="${hy}" r="${r}" fill="#07111A" stroke="${c}" stroke-width="2.6"/>`
        + text(hx, hy + r * 0.38, CAT[cat].L, r * 1.05, c, 'middle', 800));
      const w1 = D.fit ? null : null;
      if (side === 'up') {
        g.push(text(hx, hy - r - 30, l1, 17, c, 'middle', 700) + text(hx, hy - r - 10, l2, 15.5, '#E6EDF5', 'middle', 500));
      } else {
        const dx = side === 'right' ? r + 10 : -r - 10, an = side === 'right' ? 'start' : 'end';
        g.push(text(hx + dx, hy - 3, l1, 17, c, an, 700) + text(hx + dx, hy + 17, l2, 15.5, '#E6EDF5', an, 500));
      }
      return g.join('');
    }
    // a kind's card: its letter in a ringed head, its name, two lines under it; x, y its top left
    function kindCard(x, y, w, h, cat, name, l1, l2, o = {}) {
      const c = CAT[cat].col, g = [];
      if (o.lit) g.push(`<rect x="${x - 6}" y="${y - 6}" width="${w + 12}" height="${h + 12}" rx="24" fill="${c}" opacity="0.16" filter="url(#${P}lbig)"/>`);
      g.push(`<rect x="${x}" y="${y}" width="${w}" height="${h}" rx="18" fill="#07111A" fill-opacity="0.95" stroke="${c}" stroke-opacity="${o.dim ? 0.35 : 0.9}" stroke-width="2"/>`);
      g.push(`<circle cx="${x + 42}" cy="${y + 42}" r="22" fill="${c}" fill-opacity="0.12" stroke="${c}" stroke-width="2.4"/>` + text(x + 42, y + 51, CAT[cat].L, 25, c, 'middle', 800));
      g.push(text(x + 78, y + 50, name, fit(name, 25, 700, w - 96), c, 'start', 700, false, 'letter-spacing="1.2"'));
      g.push(text(x + 24, y + 96, l1, fit(l1, 18, 600, w - 48), '#FFFFFF', 'start', 600));
      if (l2) g.push(text(x + 24, y + 122, l2, fit(l2, 16, 500, w - 48), '#C9D3DE', 'start', 500));
      return g.join('');
    }

    // ───────────── a view's heading: the kind in white, its topic (after the colon) in the view's colour (owner's renders) ─────────────
    function head(E, cx, y, s, col) {
      const out = E.head(cx, y, s, col), i = s.search(/\s?:\s/);
      if (i < 0 || /^#E/i.test(col)) return out;
      const j = s.indexOf(':', i) + 1, a = s.slice(0, j), b = s.slice(j);
      return out.replace(`>${K.esc(s)}</text>`, `><tspan fill="#FFFFFF">${K.esc(a)}</tspan><tspan fill="${col}">${K.esc(b)}</tspan></text>`);
    }

    // ───────────── plot axes (stage space) ─────────────
    // x0, y0 the plot's top left, w × h; o: { xd: [a, b], yd: [a, b], xt: [ticks], yt: [ticks], xl, yl (axis names), grid, xf, yf
    // (tick formats), col }. Returns { svg, X, Y }
    function axes(x0, y0, w, h, o) {
      const X = v => x0 + (v - o.xd[0]) / (o.xd[1] - o.xd[0]) * w, Y = v => y0 + h - (v - o.yd[0]) / (o.yd[1] - o.yd[0]) * h, g = [];
      g.push(`<rect x="${x0}" y="${y0}" width="${w}" height="${h}" fill="#060B12" fill-opacity="0.85" stroke="#1E2B3A"/>`);
      (o.xt || []).forEach(v => { g.push(`<line x1="${X(v)}" y1="${y0}" x2="${X(v)}" y2="${y0 + h}" stroke="#1C2A38" stroke-width="1"/>` + text(X(v), y0 + h + 22, o.xf ? o.xf(v) : String(v), 14, '#8B97A8', 'middle', 500, true)); });
      (o.yt || []).forEach(v => { g.push(`<line x1="${x0}" y1="${Y(v)}" x2="${x0 + w}" y2="${Y(v)}" stroke="#1C2A38" stroke-width="1"/>` + text(x0 - 10, Y(v) + 5, o.yf ? o.yf(v) : String(v), 14, '#8B97A8', 'end', 500, true)); });
      if (o.xl) g.push(text(x0 + w, y0 + h + 46, o.xl, 15.5, '#C9D3DE', 'end', 600));
      if (o.yl) g.push(text(x0, y0 - 14, o.yl, 15.5, '#C9D3DE', 'start', 600));
      return { svg: g.join(''), X, Y };
    }
    const pathOf = (f, a, b, n, X, Y) => { let d = ''; for (let i = 0; i <= n; i++) { const v = a + (b - a) * i / n; d += `${i ? 'L' : 'M'}${X(v).toFixed(1)},${Y(f(v)).toFixed(1)}`; } return d; };

    // ───────────── an analog panel meter (3a): moving coil, 0 … 100 °C over a 90° arc, a mirror band ─────────────
    // cx, cy: the pivot; R the scale's radius (stage px); T the pointer's value; o.pw the pointer's width at the scale (px).
    // The arc: −45° … +45° from upright. Returns { svg, at(T) → angle, pt(T, r) }
    const MET = { a0: -45, a1: 45, lo: 0, hi: 100 };
    const metAng = T => MET.a0 + (MET.a1 - MET.a0) * (T - MET.lo) / (MET.hi - MET.lo);
    function panelMeter(cx, cy, R, T, o = {}) {
      const g = [], pt = (v, r) => { const a = metAng(v) * Math.PI / 180; return [cx + r * Math.sin(a), cy - r * Math.cos(a)]; };
      const W = R * 1.414 + 150, H = R + 64 + 52, bx = cx - W / 2, by = cy - R - 64;
      const CH = H + 52 + (o.plate ? 36 : 0);
      g.push(`<rect x="${bx - 30}" y="${by - 30}" width="${W + 60}" height="${CH + 24}" rx="22" fill="#0B0E12" stroke="#2E3640" stroke-width="2"/>`
        + `<rect x="${bx - 18}" y="${by - 18}" width="${W + 36}" height="${CH}" rx="16" fill="url(#${K.P}case)" stroke="#4A5866" stroke-width="1.6"/><rect x="${bx - 12}" y="${by - 12}" width="${W + 24}" height="6" rx="3" fill="#fff" opacity="0.07"/>`);
      // its four mounting screws, in the bezel's corners
      for (const [sx, sy] of [[bx - 16, by - 16], [bx + W + 16, by - 16], [bx - 16, by + CH - 32], [bx + W + 16, by + CH - 32]])
        g.push(`<circle cx="${sx}" cy="${sy}" r="9" fill="url(#${K.P}steelV)" stroke="#11151A" stroke-width="1.2"/><path d="M${sx - 5},${sy - 3} L${sx + 5},${sy + 3} M${sx - 3},${sy + 5} L${sx + 3},${sy - 5}" stroke="#2A2F36" stroke-width="1.8"/>`);
      if (o.plate) {
        const pw = 300, px0 = cx - pw / 2, py0 = by + H + 8;
        g.push(`<rect x="${px0}" y="${py0}" width="${pw}" height="36" rx="5" fill="url(#${K.P}steelV)" stroke="#5A646E" stroke-width="1.2"/><rect x="${px0 + 3}" y="${py0 + 3}" width="${pw - 6}" height="30" rx="3" fill="none" stroke="#FFFFFF" stroke-opacity="0.25"/>`
          + text(cx, py0 + 16, 'MOVING-COIL PANEL METER', 14.5, '#1C2128', 'middle', 800, false, 'letter-spacing="0.8"') + text(cx, py0 + 30.5, '0 … 100 °C · MARKS EVERY 2 °C', 12.5, '#2A3038', 'middle', 700));
      }
      g.push(`<rect x="${bx}" y="${by}" width="${W}" height="${H}" rx="8" fill="url(#${P}dial)" stroke="#8A8478"/>`);
      // the mirror band, just inside the scale
      const arc = (r, a, b) => { const p = pt(a, r), q = pt(b, r); return `M${p[0].toFixed(1)},${p[1].toFixed(1)} A${r},${r} 0 0 1 ${q[0].toFixed(1)},${q[1].toFixed(1)}`; };
      g.push(`<path d="${arc(R - 12, 0, 100)}" fill="none" stroke="url(#${P}mirror)" stroke-width="10"/>`);
      g.push(`<path d="${arc(R, 0, 100)}" fill="none" stroke="#1A1A1A" stroke-width="1.6"/>`);
      for (let v = 0; v <= 100; v += 2) {
        const big = v % 10 === 0, mid = v % 5 === 0 && !big, [x0, y0] = pt(v, R), [x1, y1] = pt(v, R + (big ? 18 : mid ? 12 : 8));
        g.push(`<line x1="${x0.toFixed(1)}" y1="${y0.toFixed(1)}" x2="${x1.toFixed(1)}" y2="${y1.toFixed(1)}" stroke="#1A1A1A" stroke-width="${big ? 2 : 1.1}"/>`);
        if (big) { const [lx, ly] = pt(v, R + 34); g.push(text(lx, ly + 6, String(v), 17, '#1A1A1A', 'middle', 600)); }
      }
      g.push(text(cx - R * 0.36, cy - R * 0.3, '°C', 22, '#1A1A1A', 'middle', 700) + text(cx - R * 0.36, cy - R * 0.3 + 22, 'CLASS 1.5', 11, '#4A4A44', 'middle', 600));
      // the pointer (o.pw: its width at the scale), its pivot; o.noPointer leaves them out (pointer(T) draws them, for a
      // unit that moves the pointer as it plays)
      const pointer = (v, pw = o.pw || 2) => {
        const [px, py] = pt(v, R + 10), a = metAng(v) * Math.PI / 180, nx = Math.cos(a), ny = Math.sin(a);
        return `<path d="M${(cx - nx * 5).toFixed(1)},${(cy - ny * 5).toFixed(1)} L${(px - nx * pw / 2).toFixed(1)},${(py - ny * pw / 2).toFixed(1)} L${(px + nx * pw / 2).toFixed(1)},${(py + ny * pw / 2).toFixed(1)} L${(cx + nx * 5).toFixed(1)},${(cy + ny * 5).toFixed(1)} Z" fill="#111" />`
          + `<circle cx="${cx}" cy="${cy}" r="12" fill="#2A2E35" stroke="#000"/><circle cx="${cx}" cy="${cy}" r="4" fill="#9AA4AF"/>`;
      };
      if (!o.noPointer) g.push(pointer(T));
      g.push(`<rect x="${bx}" y="${by}" width="${W}" height="${H * 0.4}" rx="8" fill="#fff" opacity="0.06"/>`);
      return { svg: g.join(''), pt, ang: metAng, box: [bx, by, W, H], pointer };
    }

    return { DEFS, NTC, R, V, dVdT, FIT, lineRead, lineV, WATER_T, ROOM_T, STEM, stemError, stemAt, MUG, LAG, pourF, trueAt, probeAt, INS, CH, chTerm, chRaw, chRead, CAT,
      STAGES, strip, icon, head, hotPlate, plateFace, dialAng, PLATE, mug, probe, condBoard, convBoard, display, chain, FL, COLX, pin, kindCard, axes, pathOf, panelMeter, metAng, SANS };
  };
})();
