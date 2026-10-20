// The direct-indirect-null kit: what D1·020 card 3's units share ("Direct, indirect and null"). Our own unbranded bench
// equipment, drawn as it is: a linear bench supply, a handheld multimeter (grey LCD, rotary switch, sprung hook clips), a
// solderless breadboard seen from a little above, a 5 W ceramic resistor and an MES lamp on it, a wooden metre rule
// against a steel rod, a crucible furnace with a magnetic surface thermocouple on its shell, an arm with a blood-pressure
// cuff (aneroid gauge, bulb, stethoscope), and a slide-wire potentiometer with a zero-centre galvanometer. Every reading
// is computed here (Ohm's law, the lamp's tungsten curve, the furnace wall's relation, the cuff's deflation, the wire's
// potential gradient). Each unit carries its own copy (a library is a self-contained folder); the master is
// libraries/dinkit/. Built on svgkit.js: DINKIT(K) takes the unit's kit (its id prefix keeps every gradient its own).
// Perspective: a camera a little above the bench, so low flat things (the breadboard, the potentiometer's board) are seen
// more from above than tall boxes, whose tops are a thin band; things left of centre show their right side, and the other
// way round.
'use strict';
(function () {
  // ───────────── the numbers ─────────────
  const R_KNOWN = 10.0;                                   // Ω, the 5 W ceramic resistor (±1 %)
  const LAMP = { V: 3.8, I: 0.3, burnI: 0.45 };           // the MES lamp's rating (a school 3.8 V 0.3 A lamp); its filament
                                                          // fails past 1.5 × its current (≈ 7.6 V across it, twice its rating)
  // owner, 2026-10-09: "the bulb should have a rating that can make it burn and the effect shown"
  // a tungsten lamp: I ∝ V^0.6, so V = V_r · (I / I_r)^(1/0.6); the cold filament (≈ 1.3 Ω) at the bottom
  const lampV = I => Math.max(I * 1.3, LAMP.V * Math.pow(Math.max(0, I) / LAMP.I, 1 / 0.6));
  // the series circuit: supply Vs → lamp → known R. Solve Vs = I·R + V_lamp(I) (bisection)
  function series(Vs) {
    let lo = 0, hi = Vs / R_KNOWN;
    for (let k = 0; k < 60; k++) { const m = (lo + hi) / 2; (m * R_KNOWN + lampV(m) > Vs ? (hi = m) : (lo = m)); }
    const I = (lo + hi) / 2;
    return { I, VR: I * R_KNOWN, VL: lampV(I), P: I * lampV(I), glow: Math.min(1.25, Math.pow((I * lampV(I)) / (LAMP.V * LAMP.I), 1.6)) };
  }
  // a 3½-digit meter (2000 counts) on its 20 V range: two decimals
  const dmm20 = v => (Math.round(v * 100) / 100).toFixed(2);
  // the furnace: the shell's outside temperature and the melt inside, related by a fixed factor (illustrative):
  // T_in = T_room + F · (T_shell − T_room)
  const FURN = { room: 25, F: 5.0 };
  const shellOf = Tin => FURN.room + (Tin - FURN.room) / FURN.F;
  const insideOf = Ts => FURN.room + FURN.F * (Ts - FURN.room);
  // the cuff: pumped to 160 mmHg, let down at 3 mmHg/s; the sounds (Korotkoff) heard at each beat (72 /min) from the
  // systolic pressure down to the diastolic one
  const BP = { sys: 120, dia: 80, top: 160, rate: 3, bpm: 72, pump: 5 };
  const cuffAt = t => (t < BP.pump ? BP.top * Math.pow(t / BP.pump, 0.8) : Math.max(0, BP.top - BP.rate * (t - BP.pump)));
  // the potentiometer: 1 m of constantan, its fall set to 0.020 00 V/cm against the reference cell (1.0186 V at 50.93 cm)
  // The driver: a charged 2 V lead-acid cell (2.10 V, 0.05 Ω inside) through the rheostat's in-circuit part (its slider f of
  // 1.0 Ω) into 1 m of constantan (10.0 Ω); the slider at 0.45 gives 0.2000 A, so 2.000 V over the metre: 0.020 00 V/cm.
  // Moving the slider changes the fall (0.020 90 … 0.019 00 V/cm end to end): that is how the wire is set against the reference.
  const POT = { k: 0.02, Eref: 1.0186, Ex: 1.2850, sens: 0.003, Ed: 2.10, rIn: 0.05, Rw: 10.0, Rrh: 1.0, f0: 0.45 };   // sens: volts of imbalance per division (with its series resistance)
  POT.kOf = f => POT.Ed * POT.Rw / (POT.rIn + f * POT.Rrh + POT.Rw) / 100;   // the wire's fall (V/cm) with the slider at f
  const nullCm = E => E / POT.k;
  const galvDiv = (cm, E) => Math.max(-32, Math.min(32, (POT.k * cm - E) / POT.sens));

  // icons for a library's tray buttons (svg markup in a 24 × 24 box, drawn as strokes by the bench)
  const ICONS = {
    labels: '<path d="M3.5 12.2V5a1.5 1.5 0 0 1 1.5-1.5h7.2l8.3 8.3a1.5 1.5 0 0 1 0 2.1l-6.9 6.9a1.5 1.5 0 0 1-2.1 0Z"/><circle cx="8" cy="8" r="1.6"/>',
    replace: '<path d="M19.5 10.5A7.5 7.5 0 0 0 6.2 6.6L4.5 8.4"/><path d="M4.5 4.2v4.2h4.2"/><path d="M4.5 13.5a7.5 7.5 0 0 0 13.3 3.9l1.7-1.8"/><path d="M19.5 19.8v-4.2h-4.2"/>',
    sound: '<path d="M3.5 9.5h3.6L11.5 5.5v13l-4.4-4H3.5Z"/><path d="M15 9.2a4 4 0 0 1 0 5.6"/><path d="M17.8 6.6a7.6 7.6 0 0 1 0 10.8"/>',
    soundOff: '<path d="M3.5 9.5h3.6L11.5 5.5v13l-4.4-4H3.5Z"/><path d="M15.5 9.5l5 5"/><path d="M20.5 9.5l-5 5"/>',
    zoom: '<circle cx="10.5" cy="10.5" r="6.5"/><path d="M15.3 15.3l5.2 5.2"/><path d="M10.5 7.6v5.8M7.6 10.5h5.8"/>',
    zoomOut: '<circle cx="10.5" cy="10.5" r="6.5"/><path d="M15.3 15.3l5.2 5.2"/><path d="M7.6 10.5h5.8"/>',
  };
  // a small icon-only button over a scene (its look shared by every such button): round, a thin ring, the icon in muted ink,
  // lit teal while on; .act (an action waiting, e.g. a part to replace): a small rounded-square button, the icon in amber
  // (owner, 2026-10-09: "the icon is displaced from the circle. just make it a button with the icon"); the icon is pinned
  // to the button's centre
  function partButtonCss() {
    if (document.getElementById('dk-partbtn-css')) return;
    const st = document.createElement('style'); st.id = 'dk-partbtn-css';
    st.textContent = '.dk-partbtn{position:absolute;width:36px;height:36px;border-radius:50%;padding:0;margin:0;display:flex;align-items:center;justify-content:center;'
      + 'background:rgba(7,13,20,.72);border:1.4px solid #2A3646;color:#8B97A8;cursor:pointer;z-index:4;transition:color .2s,border-color .2s,box-shadow .2s}'
      + '.dk-partbtn svg{position:absolute;left:50%;top:50%;transform:translate(-50%,-50%);display:block;width:18px;height:18px;fill:none;stroke:currentColor;stroke-width:1.7;stroke-linecap:round;stroke-linejoin:round}'
      + '.dk-partbtn:hover{color:#E6EDF5;border-color:#4A5868}.dk-partbtn.on{color:#2EE6C5;border-color:rgba(46,230,197,.5);box-shadow:0 0 10px rgba(46,230,197,.15)}'
      + '.dk-partbtn.act{width:34px;height:34px;border-radius:9px;background:rgba(14,18,24,.92);color:#FFC24D;border-color:rgba(255,194,77,.55)}'
      + '.dk-partbtn.act:hover{color:#FFE2A0;border-color:#FFC24D;box-shadow:0 0 10px rgba(255,194,77,.2)}'
      + '.dk-partbtn:focus-visible{outline:2px solid #2EE6C5;outline-offset:2px}';
    document.head.appendChild(st);
  }
  window.DINKIT = function (K) {
    const { text, u, clamp, P, rnd } = K;
    const rim = `url(#${P}rim)`, ksh = `url(#${P}kshadow)`;
    const seg7 = (x, y, s, h, col, o = {}) => `<g filter="${rim}">${K.seg7(x, y, s, h, col, Object.assign({}, o, { glow: false }))}</g>`;
    // colours: a mix of two hex colours; the colour of something glowing at T °C, as it looks in a dim room (dull red from
    // ~500 °C, cherry at 700, orange at 900, yellow-white near 1100)
    const hexRgb = h => [1, 3, 5].map(i => parseInt(h.slice(i, i + 2), 16));
    const mixCol = (a, b, f) => { const A = hexRgb(a), B = hexRgb(b); return '#' + A.map((v, i) => Math.round(v + (B[i] - v) * clamp(f)).toString(16).padStart(2, '0')).join(''); };
    const GLOW = [[450, '#3A0C06'], [550, '#7A160A'], [700, '#E04A16'], [850, '#FF7A22'], [1000, '#FFA845'], [1150, '#FFD27A']];
    function glowCol(T) {
      if (T <= GLOW[0][0]) return GLOW[0][1];
      for (let k = 1; k < GLOW.length; k++) if (T <= GLOW[k][0]) return mixCol(GLOW[k - 1][1], GLOW[k][1], (T - GLOW[k - 1][0]) / (GLOW[k][0] - GLOW[k - 1][0]));
      return GLOW[GLOW.length - 1][1];
    }
    // a reflective LCD's digits (black on grey): flat-ended segments with small gaps, as the glass is printed, so they read
    // at any size; the unlit segments faintly visible; a decimal point after its digit
    const LSEG = { '0': 'abcdef', '1': 'bc', '2': 'abged', '3': 'abgcd', '4': 'fgbc', '5': 'afgcd', '6': 'afgedc', '7': 'abc', '8': 'abcdefg', '9': 'abcdfg', '-': 'g', ' ': '', 'L': 'fed' };   // L: a meter's OL (over range)
    const lcdWidth = (s, h) => s.replace(/\./g, '').length * h * 0.74 - h * 0.2;
    // the segments of a digit string: flat-ended with small gaps (as LCD glass and LED digits are made), the lit and the
    // unlit ones as two path strings; a decimal point after its digit
    function segPaths(x, y, str, h) {
      // the classic 7-segment glass: each segment a long hexagon with pointed (mitred) ends, the segments meeting at fine
      // gaps at the corners; the decimal point a small square at the foot of the digit
      const w = h * 0.54, t = h * 0.135, gp = h * 0.028, lit = [], dim = [];
      const P_ = pts => 'M' + pts.map(p => p[0].toFixed(2) + ',' + p[1].toFixed(2)).join(' L') + ' Z';
      const Hs = (x0, x1, yc) => [[x0, yc], [x0 + t / 2, yc - t / 2], [x1 - t / 2, yc - t / 2], [x1, yc], [x1 - t / 2, yc + t / 2], [x0 + t / 2, yc + t / 2]];
      const Vs = (xc, y0, y1) => [[xc, y0], [xc + t / 2, y0 + t / 2], [xc + t / 2, y1 - t / 2], [xc, y1], [xc - t / 2, y1 - t / 2], [xc - t / 2, y0 + t / 2]];
      let cx = x;
      const chars = [];
      for (const c of str) { if (c === '.') { if (chars.length) chars[chars.length - 1].dp = true; continue; } chars.push({ c, dp: false }); }
      for (const { c, dp } of chars) {
        const X = cx, on = LSEG[c] || '', L = X + t / 2, R = X + w - t / 2, T = y - h + t / 2, M = y - h / 2, B = y - t / 2;
        const seg = {
          a: Hs(L + gp, R - gp, T), g: Hs(L + gp, R - gp, M), d: Hs(L + gp, R - gp, B),
          f: Vs(L, T + gp, M - gp), e: Vs(L, M + gp, B - gp), b: Vs(R, T + gp, M - gp), c: Vs(R, M + gp, B - gp),
        };
        for (const [k, pts] of Object.entries(seg)) (on.includes(k) ? lit : dim).push(P_(pts));
        const dx = X + w + h * 0.06, ds = t * 1.05;
        (dp ? lit : dim).push(P_([[dx, y - ds], [dx + ds, y - ds], [dx + ds, y], [dx, y]]));
        cx += h * 0.74;
      }
      return { lit: lit.join(' '), dim: dim.join(' ') };
    }
    // a reflective LCD's digits: black on grey, the unlit segments faintly visible
    function lcd7(x, y, str, h, o = {}) {
      const { lit, dim } = segPaths(x, y, str, h), sl = o.slant == null ? 7 : o.slant;
      return `<g transform="translate(0 ${y}) skewX(${-sl}) translate(0 ${-y})"><path d="${dim}" fill="#0E1114" opacity="${o.ghost == null ? 0.06 : o.ghost}"/><path d="${lit}" fill="#0E1114"/></g>`;
    }
    // an LED display's digits: the lit segments in their colour with a hot core and a soft glow round them, the unlit ones
    // barely there (a dark red or green behind the filter glass)
    function led7(x, y, str, h, col, o = {}) {
      const { lit, dim } = segPaths(x, y, str, h), sl = o.slant == null ? 7 : o.slant;
      return `<g transform="translate(0 ${y}) skewX(${-sl}) translate(0 ${-y})"><path d="${dim}" fill="${col}" opacity="0.07"/>`
        + `<path d="${lit}" fill="${col}" opacity="0.55" filter="url(#${P}ledGlow)"/><path d="${lit}" fill="${col}"/><path d="${lit}" fill="#FFFFFF" opacity="0.18"/></g>`;
    }
    const F = v => (+v).toFixed(1);
    const DEFS = `<defs>
<filter id="${P}rim" x="-30%" y="-30%" width="160%" height="160%"><feGaussianBlur stdDeviation="2.4" result="b"/><feMerge><feMergeNode in="b"/><feMergeNode in="SourceGraphic"/></feMerge></filter>
<filter id="${P}kshadow" x="-40%" y="-80%" width="180%" height="260%"><feGaussianBlur stdDeviation="6"/></filter>
<filter id="${P}blur2" x="-20%" y="-20%" width="140%" height="140%"><feGaussianBlur stdDeviation="2"/></filter>
<filter id="${P}grain" x="0" y="0" width="1" height="1"><feTurbulence type="fractalNoise" baseFrequency="1.3" numOctaves="1" seed="4"/><feColorMatrix values="0 0 0 0 0.8  0 0 0 0 0.86  0 0 0 0 0.95  0.42 0 0 0 -0.16"/></filter>
<filter id="${P}lbig" x="-80%" y="-80%" width="260%" height="260%"><feGaussianBlur stdDeviation="18"/></filter>
<filter id="${P}lsoft" x="-30%" y="-30%" width="160%" height="160%"><feGaussianBlur stdDeviation="3.2" result="b"/><feMerge><feMergeNode in="b"/><feMergeNode in="SourceGraphic"/></feMerge></filter>
<filter id="${P}uSoft" filterUnits="userSpaceOnUse" x="-400" y="-1300" width="2600" height="1500"><feGaussianBlur stdDeviation="4"/></filter>
<filter id="${P}uBig" filterUnits="userSpaceOnUse" x="-400" y="-1300" width="2600" height="1500"><feGaussianBlur stdDeviation="16"/></filter>
<filter id="${P}ledGlow" x="-20%" y="-40%" width="140%" height="180%"><feGaussianBlur stdDeviation="3"/></filter>
<filter id="${P}heat" x="-40%" y="-40%" width="180%" height="180%"><feGaussianBlur stdDeviation="14"/></filter>
<filter id="${P}dof" filterUnits="userSpaceOnUse" x="-50" y="-50" width="2020" height="1180"><feGaussianBlur stdDeviation="5"/></filter>
<linearGradient id="${P}benchTop" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#0B121A" stop-opacity="0"/><stop offset="0.35" stop-color="#0D1620"/><stop offset="1" stop-color="#05080C"/></linearGradient>
<linearGradient id="${P}psuFront" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#363C44"/><stop offset="0.05" stop-color="#2A2F36"/><stop offset="1" stop-color="#1A1E23"/></linearGradient>
<linearGradient id="${P}psuTop" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#2A3038"/><stop offset="1" stop-color="#4A525C"/></linearGradient>
<linearGradient id="${P}psuSide" x1="0" y1="0" x2="1" y2="0"><stop offset="0" stop-color="#1E2228"/><stop offset="1" stop-color="#121418"/></linearGradient>
<linearGradient id="${P}window" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#160A0B"/><stop offset="1" stop-color="#0A0607"/></linearGradient>
<linearGradient id="${P}windowG" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#08140C"/><stop offset="1" stop-color="#050A07"/></linearGradient>
<radialGradient id="${P}skirt" cx="0.42" cy="0.35" r="0.75"><stop offset="0" stop-color="#4B525C"/><stop offset="0.7" stop-color="#22262C"/><stop offset="1" stop-color="#121418"/></radialGradient>
<radialGradient id="${P}cap" cx="0.38" cy="0.3" r="0.8"><stop offset="0" stop-color="#5E6672"/><stop offset="0.5" stop-color="#2A2F36"/><stop offset="1" stop-color="#15181C"/></radialGradient>
<radialGradient id="${P}postRed" cx="0.38" cy="0.32" r="0.75"><stop offset="0" stop-color="#FF8A80"/><stop offset="0.45" stop-color="#D8262B"/><stop offset="1" stop-color="#6E0F12"/></radialGradient>
<radialGradient id="${P}postBlack" cx="0.38" cy="0.32" r="0.75"><stop offset="0" stop-color="#6A707A"/><stop offset="0.45" stop-color="#23262B"/><stop offset="1" stop-color="#0A0B0D"/></radialGradient>
<radialGradient id="${P}postGreen" cx="0.38" cy="0.32" r="0.75"><stop offset="0" stop-color="#7EE29A"/><stop offset="0.45" stop-color="#1F8A3B"/><stop offset="1" stop-color="#0B3A18"/></radialGradient>
<linearGradient id="${P}holster" x1="0" y1="0" x2="1" y2="0"><stop offset="0" stop-color="#9C4A16"/><stop offset="0.12" stop-color="#E07A2E"/><stop offset="0.5" stop-color="#D86A22"/><stop offset="0.88" stop-color="#C55E1D"/><stop offset="1" stop-color="#7E3A10"/></linearGradient>
<linearGradient id="${P}dmmFace" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#3B4047"/><stop offset="1" stop-color="#25292E"/></linearGradient>
<linearGradient id="${P}lcdGrey" x1="0" y1="0" x2="0.3" y2="1"><stop offset="0" stop-color="#C9D1C3"/><stop offset="0.55" stop-color="#B5BFAF"/><stop offset="1" stop-color="#A3AE9C"/></linearGradient>
<radialGradient id="${P}selector" cx="0.4" cy="0.35" r="0.75"><stop offset="0" stop-color="#555C66"/><stop offset="0.6" stop-color="#2B3036"/><stop offset="1" stop-color="#181B1F"/></radialGradient>
<linearGradient id="${P}bbTop" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#E9E5DB"/><stop offset="1" stop-color="#F7F5EF"/></linearGradient>
<linearGradient id="${P}bbFront" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#D6D1C5"/><stop offset="1" stop-color="#A7A194"/></linearGradient>
<linearGradient id="${P}ceramic" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#FBFAF6"/><stop offset="0.55" stop-color="#E3DFD5"/><stop offset="1" stop-color="#B9B3A6"/></linearGradient>
<linearGradient id="${P}tin" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#F2F4F6"/><stop offset="0.5" stop-color="#A9B1BA"/><stop offset="1" stop-color="#6A727C"/></linearGradient>
<radialGradient id="${P}bulb" cx="0.36" cy="0.32" r="0.72"><stop offset="0" stop-color="#FFFFFF" stop-opacity="0.55"/><stop offset="0.35" stop-color="#DDEBF5" stop-opacity="0.16"/><stop offset="1" stop-color="#9FC3DA" stop-opacity="0.32"/></radialGradient>
<radialGradient id="${P}bulbLit" cx="0.5" cy="0.55" r="0.6"><stop offset="0" stop-color="#FFF8E0" stop-opacity="0.95"/><stop offset="0.35" stop-color="#FFE3A0" stop-opacity="0.7"/><stop offset="0.75" stop-color="#FFC060" stop-opacity="0.38"/><stop offset="1" stop-color="#FFA640" stop-opacity="0.25"/></radialGradient>
<radialGradient id="${P}bulbCold" cx="0.36" cy="0.32" r="0.72"><stop offset="0" stop-color="#B8C6D2" stop-opacity="0.14"/><stop offset="0.45" stop-color="#7F95A6" stop-opacity="0.06"/><stop offset="1" stop-color="#6F8A9E" stop-opacity="0.24"/></radialGradient>
<radialGradient id="${P}filGlow" cx="0.5" cy="0.5" r="0.5"><stop offset="0" stop-color="#FFFFFF"/><stop offset="0.2" stop-color="#FFF3C4"/><stop offset="0.55" stop-color="#FFB547" stop-opacity="0.55"/><stop offset="1" stop-color="#FF8A1F" stop-opacity="0"/></radialGradient>
<linearGradient id="${P}brassV" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#F6DE92"/><stop offset="0.45" stop-color="#C9A04A"/><stop offset="1" stop-color="#6B4E18"/></linearGradient>
<linearGradient id="${P}brassH" x1="0" y1="0" x2="1" y2="0"><stop offset="0" stop-color="#7A5A1E"/><stop offset="0.4" stop-color="#F2D27A"/><stop offset="0.6" stop-color="#C9A04A"/><stop offset="1" stop-color="#6B4E18"/></linearGradient>
<linearGradient id="${P}rod" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#5B636E"/><stop offset="0.18" stop-color="#E9EEF3"/><stop offset="0.32" stop-color="#C3CBD3"/><stop offset="0.7" stop-color="#6E7884"/><stop offset="0.9" stop-color="#8A939E"/><stop offset="1" stop-color="#3B424C"/></linearGradient>
<linearGradient id="${P}rodEnd" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#E4E9EE"/><stop offset="1" stop-color="#7A848F"/></linearGradient>
<linearGradient id="${P}beech" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#F3D9A4"/><stop offset="0.5" stop-color="#E7C487"/><stop offset="1" stop-color="#C99F5E"/></linearGradient>
<linearGradient id="${P}beechTop" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#B38A4E"/><stop offset="1" stop-color="#E2BF83"/></linearGradient>
<linearGradient id="${P}walnut" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#7A4A22"/><stop offset="1" stop-color="#9B6332"/></linearGradient>
<linearGradient id="${P}walnutFront" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#6A3D1A"/><stop offset="1" stop-color="#3E220C"/></linearGradient>
<linearGradient id="${P}steelBlock" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#C3CBD3"/><stop offset="0.5" stop-color="#8C96A2"/><stop offset="1" stop-color="#4A525C"/></linearGradient>
<linearGradient id="${P}shell" x1="0" y1="0" x2="1" y2="0"><stop offset="0" stop-color="#141C25"/><stop offset="0.14" stop-color="#2D3D4E"/><stop offset="0.36" stop-color="#5A7088"/><stop offset="0.5" stop-color="#4A5E73"/><stop offset="0.8" stop-color="#26323F"/><stop offset="1" stop-color="#10161D"/></linearGradient>
<linearGradient id="${P}band" x1="0" y1="0" x2="1" y2="0"><stop offset="0" stop-color="#2A2F36"/><stop offset="0.35" stop-color="#A9B3BE"/><stop offset="0.55" stop-color="#6E7884"/><stop offset="1" stop-color="#1E2228"/></linearGradient>
<radialGradient id="${P}melt" cx="0.45" cy="0.42" r="0.6"><stop offset="0" stop-color="#FFFBEA"/><stop offset="0.25" stop-color="#FFE7A6"/><stop offset="0.6" stop-color="#FFA44A"/><stop offset="1" stop-color="#C2410C"/></radialGradient>
<radialGradient id="${P}refr" cx="0.5" cy="0.5" r="0.5"><stop offset="0.6" stop-color="#E4A060"/><stop offset="1" stop-color="#7A5034"/></radialGradient>
<linearGradient id="${P}skin" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#2E1C12"/><stop offset="0.3" stop-color="#4A2E1E"/><stop offset="0.72" stop-color="#7A4E34"/><stop offset="0.9" stop-color="#9A6646"/><stop offset="1" stop-color="#83563B"/></linearGradient>
<linearGradient id="${P}cuff" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#3A5584"/><stop offset="0.35" stop-color="#2B4170"/><stop offset="0.8" stop-color="#1A2A48"/><stop offset="1" stop-color="#0F1A2E"/></linearGradient>
<pattern id="${P}weave" patternUnits="userSpaceOnUse" width="6" height="6"><path d="M0,6 L6,0 M-1,1 L1,-1 M5,7 L7,5" stroke="#0A1222" stroke-width="0.8" opacity="0.5"/></pattern>
<linearGradient id="${P}towelTop" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#AEB9C4"/><stop offset="1" stop-color="#E2E8EE"/></linearGradient>
<linearGradient id="${P}towel" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#C9D3DC"/><stop offset="1" stop-color="#8A96A2"/></linearGradient>
<linearGradient id="${P}coat" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#F4F7FA"/><stop offset="0.45" stop-color="#DCE3EA"/><stop offset="0.85" stop-color="#A9B4BF"/><stop offset="1" stop-color="#7E8A96"/></linearGradient>
<radialGradient id="${P}rubber" cx="0.38" cy="0.32" r="0.8"><stop offset="0" stop-color="#4A5058"/><stop offset="0.5" stop-color="#1D2025"/><stop offset="1" stop-color="#0A0B0D"/></radialGradient>
<radialGradient id="${P}chromeR" cx="0.36" cy="0.3" r="0.8"><stop offset="0" stop-color="#FFFFFF"/><stop offset="0.35" stop-color="#C9D1D9"/><stop offset="0.75" stop-color="#6E7884"/><stop offset="1" stop-color="#3B424C"/></radialGradient>
<radialGradient id="${P}dial" cx="0.45" cy="0.4" r="0.65"><stop offset="0" stop-color="#FFFFFF"/><stop offset="0.85" stop-color="#EEF1F4"/><stop offset="1" stop-color="#D2D8DE"/></radialGradient>
<radialGradient id="${P}galvDial" cx="0.5" cy="0.9" r="0.95"><stop offset="0" stop-color="#FFFBEF"/><stop offset="1" stop-color="#E9DFC6"/></radialGradient>
<linearGradient id="${P}bakelite" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#3A332D"/><stop offset="0.08" stop-color="#26211D"/><stop offset="1" stop-color="#110E0C"/></linearGradient>
<linearGradient id="${P}glassCase" x1="0" y1="0" x2="1" y2="0"><stop offset="0" stop-color="#BFE6FF" stop-opacity="0.3"/><stop offset="0.1" stop-color="#BFE6FF" stop-opacity="0.08"/><stop offset="0.85" stop-color="#BFE6FF" stop-opacity="0.06"/><stop offset="1" stop-color="#BFE6FF" stop-opacity="0.26"/></linearGradient>
<linearGradient id="${P}acid" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#CFE8F0" stop-opacity="0.35"/><stop offset="1" stop-color="#9FC8D8" stop-opacity="0.5"/></linearGradient>
<linearGradient id="${P}ceramTube" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#9A8F7C"/><stop offset="0.3" stop-color="#F1EADB"/><stop offset="0.6" stop-color="#D2C8B4"/><stop offset="1" stop-color="#7E7462"/></linearGradient>
<pattern id="${P}coil" patternUnits="userSpaceOnUse" width="3.2" height="40"><rect width="3.2" height="40" fill="none"/><line x1="0.4" y1="0" x2="2.4" y2="40" stroke="#B8794A" stroke-width="1.6"/><line x1="1.1" y1="0" x2="3.1" y2="40" stroke="#F0B887" stroke-width="0.6" opacity="0.8"/></pattern>
<pattern id="${P}hole" patternUnits="userSpaceOnUse" width="7.112" height="7.112"><rect x="1.9" y="1.9" width="3.3" height="3.3" rx="0.5" fill="#4A463E"/><rect x="1.9" y="1.9" width="3.3" height="1.1" fill="#26231E"/></pattern>
<pattern id="${P}rail" patternUnits="userSpaceOnUse" width="42.672" height="7.112"><g fill="#4A463E"><rect x="5.5" y="1.9" width="3.3" height="3.3" rx="0.5"/><rect x="12.6" y="1.9" width="3.3" height="3.3" rx="0.5"/><rect x="19.7" y="1.9" width="3.3" height="3.3" rx="0.5"/><rect x="26.8" y="1.9" width="3.3" height="3.3" rx="0.5"/><rect x="33.9" y="1.9" width="3.3" height="3.3" rx="0.5"/></g></pattern>
<linearGradient id="${P}cyl" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#FFFFFF" stop-opacity="0.15"/><stop offset="0.22" stop-color="#FFFFFF" stop-opacity="0.55"/><stop offset="0.42" stop-color="#FFFFFF" stop-opacity="0"/><stop offset="0.75" stop-color="#000" stop-opacity="0.15"/><stop offset="1" stop-color="#000" stop-opacity="0.55"/></linearGradient>
<linearGradient id="${P}copperV" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#5A2A10"/><stop offset="0.18" stop-color="#C8743A"/><stop offset="0.32" stop-color="#FFD2A8"/><stop offset="0.46" stop-color="#E08A4C"/><stop offset="0.8" stop-color="#8A4318"/><stop offset="1" stop-color="#3E1A08"/></linearGradient>
<linearGradient id="${P}woodBox" x1="0" y1="0" x2="1" y2="0"><stop offset="0" stop-color="#6A3A16"/><stop offset="0.35" stop-color="#9A5E2A"/><stop offset="0.7" stop-color="#7E4A1E"/><stop offset="1" stop-color="#5A3010"/></linearGradient>
<linearGradient id="${P}woodLid" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#C08448"/><stop offset="1" stop-color="#6A3A16"/></linearGradient>
<pattern id="${P}vent" patternUnits="userSpaceOnUse" width="12" height="40"><rect x="2" y="0" width="5" height="40" rx="2" fill="#0E1114"/></pattern>
</defs>` + (window.PSUKIT ? window.PSUKIT(K, {}).DEFS : '');

    // ───────────── the lab behind the bench (stage space): shelves out of focus, warm lights ─────────────
    function lab() {
      const g = [`<rect width="1920" height="1080" fill="#04070C"/>`,
        `<radialGradient id="${P}room" cx="0.5" cy="0.3" r="0.8"><stop offset="0" stop-color="#10202F"/><stop offset="0.6" stop-color="#08111B"/><stop offset="1" stop-color="#03060A"/></radialGradient>`,
        `<rect width="1920" height="1080" fill="url(#${P}room)"/>`, `<g filter="url(#${P}dof)" opacity="0.5">`];
      for (const sy of [300, 520]) {
        g.push(`<rect x="0" y="${sy}" width="1920" height="10" fill="#1A2836"/><rect x="0" y="${sy + 10}" width="1920" height="26" fill="#0A121B"/>`);
        for (let k = 0; k < 34; k++) {
          const bx = 20 + k * 57 + rnd(k, sy) * 24, h = 50 + rnd(k, sy + 1) * 90, w = 22 + rnd(k, sy + 2) * 40, kind = Math.floor(rnd(k, sy + 3) * 3);
          const fill = rnd(k, sy + 4) < 0.25 ? '#173040' : '#0F1C29', hi = '#2E4A60';
          // instrument cases, binders, boxes of parts (an electronics lab's shelves)
          if (kind === 0) g.push(`<rect x="${bx}" y="${sy - h * 0.7}" width="${w * 1.4}" height="${h * 0.7}" rx="4" fill="${fill}"/><rect x="${bx + 6}" y="${sy - h * 0.7 + 8}" width="${w * 0.6}" height="${h * 0.22}" rx="2" fill="${rnd(k, sy + 5) < 0.4 ? '#3A1E10' : hi}" opacity="0.6"/>`);
          else if (kind === 1) g.push(`<rect x="${bx}" y="${sy - h}" width="${w * 0.45}" height="${h}" rx="2" fill="${fill}"/><rect x="${bx + w * 0.5}" y="${sy - h * 0.9}" width="${w * 0.45}" height="${h * 0.9}" rx="2" fill="${fill}"/>`);
          else g.push(`<rect x="${bx}" y="${sy - h * 0.5}" width="${w * 1.2}" height="${h * 0.5}" rx="3" fill="${fill}"/><rect x="${bx}" y="${sy - h * 0.5}" width="${w * 1.2}" height="${h * 0.12}" fill="${hi}" opacity="0.35"/>`);
        }
      }
      g.push('</g>');
      [[150, 160], [520, 120], [1290, 130], [1700, 170], [960, 90]].forEach(([lx, ly]) => g.push(`<ellipse cx="${lx}" cy="${ly}" rx="90" ry="40" fill="#FFB547" opacity="0.16" filter="${u('big')}"/><circle cx="${lx}" cy="${ly}" r="9" fill="#FFD9A0" opacity="0.6" filter="${u('soft')}"/>`));
      g.push(`<rect y="600" width="1920" height="480" fill="url(#${P}benchTop)"/>`);
      return g.join('');
    }
    // a label pill with a leader to what it names (stage space)
    function tagPill(px, py, ax, ay, s, col = '#2EE6C5', anchor = 'middle') {
      return `<line x1="${px}" y1="${py}" x2="${ax}" y2="${ay}" stroke="${col}" stroke-opacity="0.7" stroke-width="1.4"/><circle cx="${ax}" cy="${ay}" r="3.5" fill="${col}"/>` + K.pill(px, py, s, col, anchor);
    }
    // a larger label (owner's 5a reference): white text, the part in [brackets] in yellow, a coloured frame, a leader to a
    // dot on what it names (stage space)
    // o.right: the label's right edge instead of its centre (labels stacked right-aligned); o.down: the leader straight
    // down from the label's centre to ay
    function tagPill2(px, py, ax, ay, s, col = '#38D9FF', hi = '#FFD54A', o = {}) {
      const parts = s.split(/\[|\]/), size = 19, w = fitW(parts.join(''), size, 600) + 40, h = 40;
      if (o.right != null) px = o.right - w / 2;
      px = clamp(px, 16 + w / 2, 1904 - w / 2);   // kept on the stage (a long French label near an edge)
      if (o.down) ax = px;
      const tsp = parts.map((p, i) => (p ? `<tspan fill="${i % 2 ? hi : '#FFFFFF'}">${K.esc(p)}</tspan>` : '')).join('');
      return `<line x1="${px}" y1="${py}" x2="${ax}" y2="${ay}" stroke="${col}" stroke-opacity="0.85" stroke-width="1.6"/><circle cx="${ax}" cy="${ay}" r="4.5" fill="${col}" filter="${u('soft')}"/>`
        + `<rect x="${px - w / 2}" y="${py - h / 2}" width="${w}" height="${h}" rx="10" fill="#07111A" fill-opacity="0.94" stroke="${col}" stroke-width="2" filter="${u('soft')}"/>`
        + text(px, py + 7, '§', size, '#FFFFFF', 'middle', 600).replace('§', tsp);
    }
    // a contact shadow under an object standing on the bench (local floor y = 0)
    const shadow = (cx, w, op = 0.55) => `<ellipse cx="${cx}" cy="3" rx="${w / 2}" ry="9" fill="#000" opacity="${op}" filter="${ksh}"/>`;

    // ───────────── small parts ─────────────
    // a control knob (a skirt with a scale, a knurled cap, a pointer); ang: degrees clockwise from up
    function knob(cx, cy, r, ang, o = {}) {
      const g = [`<circle cx="${cx}" cy="${cy + 4}" r="${r + 3}" fill="#000" opacity="0.55" filter="${ksh}"/>`];
      if (o.scale) for (let k = 0; k <= 10; k++) {
        const a = (-135 + k * 27) * Math.PI / 180, r0 = r + 5, r1 = r + (k % 5 ? 9 : 13);
        g.push(`<line x1="${(cx + r0 * Math.sin(a)).toFixed(1)}" y1="${(cy - r0 * Math.cos(a)).toFixed(1)}" x2="${(cx + r1 * Math.sin(a)).toFixed(1)}" y2="${(cy - r1 * Math.cos(a)).toFixed(1)}" stroke="#C9D1D9" stroke-width="1.3"/>`);
      }
      g.push(`<circle cx="${cx}" cy="${cy}" r="${r}" fill="url(#${P}skirt)" stroke="#0A0B0D" stroke-width="1.2"/>`);
      const kn = [];
      for (let k = 0; k < 36; k++) { const a = k * 10 * Math.PI / 180; kn.push(`M${(cx + r * 0.78 * Math.sin(a)).toFixed(1)},${(cy - r * 0.78 * Math.cos(a)).toFixed(1)} L${(cx + r * 0.95 * Math.sin(a)).toFixed(1)},${(cy - r * 0.95 * Math.cos(a)).toFixed(1)}`); }
      g.push(`<path d="${kn.join(' ')}" stroke="#0B0D10" stroke-width="1.2" opacity="0.8"/>`);
      g.push(`<circle cx="${cx}" cy="${cy}" r="${r * 0.72}" fill="url(#${P}cap)"/><path d="M${cx - r * 0.5},${cy - r * 0.42} A${r * 0.72},${r * 0.72} 0 0 1 ${cx + r * 0.4},${cy - r * 0.55}" fill="none" stroke="#FFFFFF" stroke-opacity="0.25" stroke-width="1.6"/>`);
      const a = ang * Math.PI / 180;
      g.push(`<line x1="${(cx + r * 0.3 * Math.sin(a)).toFixed(1)}" y1="${(cy - r * 0.3 * Math.cos(a)).toFixed(1)}" x2="${(cx + r * 0.92 * Math.sin(a)).toFixed(1)}" y2="${(cy - r * 0.92 * Math.cos(a)).toFixed(1)}" stroke="${o.mark || '#F2F4F6'}" stroke-width="${Math.max(2, r * 0.09).toFixed(1)}" stroke-linecap="round"/>`);
      return g.join('');
    }
    // a binding post seen from the front (a hex nut, the knurled coloured cap, the 4 mm hole)
    function post(cx, cy, col = 'Red', r = 12) {
      const hex = [];
      for (let k = 0; k < 6; k++) { const a = (k * 60 + 30) * Math.PI / 180; hex.push(`${(cx + r * 1.32 * Math.cos(a)).toFixed(1)},${(cy + r * 1.32 * Math.sin(a)).toFixed(1)}`); }
      return `<circle cx="${cx}" cy="${cy + 3}" r="${r * 1.4}" fill="#000" opacity="0.5" filter="${ksh}"/><polygon points="${hex.join(' ')}" fill="url(#${P}rodEnd)" stroke="#2A2F36" stroke-width="0.8"/>`
        + `<circle cx="${cx}" cy="${cy}" r="${r}" fill="url(#${P}post${col})" stroke="#000" stroke-opacity="0.5"/>`
        + `<circle cx="${cx}" cy="${cy}" r="${r * 0.82}" fill="none" stroke="#000" stroke-opacity="0.35" stroke-width="${r * 0.18}" stroke-dasharray="1.2 1.6"/>`
        + `<circle cx="${cx}" cy="${cy}" r="${r * 0.34}" fill="#08090A"/><circle cx="${cx - r * 0.06}" cy="${cy - r * 0.08}" r="${r * 0.2}" fill="url(#${P}brassV)" opacity="0.8"/>`;
    }
    // a flexible test lead (silicone): its colour, a darker underside, a highlight
    function lead(d, col, w = 6) {
      const dark = col === 'red' ? '#7A1014' : col === 'black' ? '#050506' : col === 'yellow' ? '#8A6A08' : col === 'grey' ? '#262B31' : '#0B2A6E';
      const main = col === 'red' ? '#D42A2F' : col === 'black' ? '#1D2024' : col === 'yellow' ? '#E8C21A' : col === 'grey' ? '#5C6670' : '#2A5BD7';
      return `<path d="${d}" fill="none" stroke="#000" stroke-opacity="0.35" stroke-width="${w + 3}" stroke-linecap="round" transform="translate(2 4)" filter="url(#${P}blur2)"/>`
        + `<path d="${d}" fill="none" stroke="${dark}" stroke-width="${w}" stroke-linecap="round"/>`
        + `<path d="${d}" fill="none" stroke="${main}" stroke-width="${w * 0.7}" stroke-linecap="round" transform="translate(0 -0.8)"/>`
        + `<path d="${d}" fill="none" stroke="#FFFFFF" stroke-opacity="0.35" stroke-width="${Math.max(0.8, w * 0.16)}" stroke-linecap="round" transform="translate(-0.6 -${(w * 0.28).toFixed(1)})"/>`;
    }
    // a crocodile clip: its jaws at (x, y), the body along angle ang (degrees; 0 = the boot to the right), the boot's colour.
    // Returns its markup and where the lead leaves the boot
    function croc(x, y, ang, col, s = 1) {
      const body = `<g transform="translate(${x} ${y}) rotate(${ang}) scale(${s})">`
        + `<path d="M-2,-1 L14,-7 L30,-6 L30,6 L14,7 L-2,1 Z" fill="url(#${P}tin)" stroke="#4A525C" stroke-width="0.6"/>`
        + `<path d="M1,-1.6 l2,-1.6 l2,1.6 l2,-1.8 l2,1.8 l2,-2 l2,2 M1,1.6 l2,1.6 l2,-1.6 l2,1.8 l2,-1.8 l2,2 l2,-2" fill="none" stroke="#3B424C" stroke-width="0.7"/>`
        + `<circle cx="22" cy="0" r="2.2" fill="#6E7884"/>`
        + `<path d="M26,-9 Q30,-11 52,-8 Q58,-6 58,0 Q58,6 52,8 Q30,11 26,9 Z" fill="${col === 'red' ? '#C8262B' : '#1B1D21'}" stroke="#000" stroke-opacity="0.5" stroke-width="0.8"/>`
        + `<path d="M30,-7 Q42,-8.4 52,-6" fill="none" stroke="#FFFFFF" stroke-opacity="${col === 'red' ? 0.35 : 0.22}" stroke-width="1.6"/></g>`;
      const a = ang * Math.PI / 180;
      return { svg: body, end: [x + 58 * s * Math.cos(a), y + 58 * s * Math.sin(a)] };
    }
    // a sprung hook clip (a multimeter accessory): the hook round a wire at (x, y), the barrel along ang
    function hookClip(x, y, ang, col, s = 1) {
      const c = col === 'red' ? '#C8262B' : '#1B1D21', hi = col === 'red' ? 0.38 : 0.22;
      const body = `<g transform="translate(${x} ${y}) rotate(${ang}) scale(${s})">`
        + `<path d="M3,0 C3,-6 -5,-6 -5,0 C-5,3 -3,4 -1,4" fill="none" stroke="url(#${P}tin)" stroke-width="1.8"/>`
        + `<rect x="2" y="-1.4" width="12" height="2.8" fill="url(#${P}tin)"/>`
        + `<path d="M13,-6 H40 Q44,-6 44,-3 V3 Q44,6 40,6 H13 Q11,6 11,3 V-3 Q11,-6 13,-6 Z" fill="${c}" stroke="#000" stroke-opacity="0.5" stroke-width="0.7"/>`
        + `<path d="M44,-4.5 H70 Q74,-4.5 74,0 Q74,4.5 70,4.5 H44 Z" fill="${c}" stroke="#000" stroke-opacity="0.5" stroke-width="0.7"/>`
        + `<rect x="74" y="-7" width="8" height="14" rx="2.5" fill="${c}" stroke="#000" stroke-opacity="0.5" stroke-width="0.7"/>`
        + `<path d="M14,-4 H40 M46,-3 H70" stroke="#FFFFFF" stroke-opacity="${hi}" stroke-width="1.4"/></g>`;
      const a = ang * Math.PI / 180;
      return { svg: body, end: [x + 82 * s * Math.cos(a), y + 82 * s * Math.sin(a)] };
    }

    // ───────────── the bench supply (local: front face x 0 … 420, y −302 … 0, standing on the bench line y 0) ─────────────
    // Our 0–30 V 0–5 A linear supply, drawn by its own kit (libraries/bench-supply/psukit.js, which a unit that shows the
    // supply loads after this file) at the size the rigs were laid out for: 420 wide. On, its output on. Its CURRENT knob
    // sets a limit: while the circuit draws less, it holds the voltage set on its VOLTAGE knob (CV); once the circuit would
    // draw more, it holds the current at the limit and the voltage falls to what that current makes across the circuit (CC,
    // its C.C. lamp lit). The red display shows the voltage at its posts, the green one the current. o: { V (the VOLTAGE
    // knob), lim (the CURRENT knob), sol (the circuit's solution at them, from a rig's solveL), bodyOnly }
    // Owner, 2026-10-09: "yes move them onto the new supply"; "the power supply current is not tunable now but remember we
    // need it to set CC and that feature should be implemented as its effect when CC value set is reached and cannot
    // increase any further and the effect it has on voltage as we increase it". The limit's default, 0.700 A, keeps the
    // 10 Ω 5 W resistor within its rating (4.9 W); 5.10 V draws 0.510 A (CV), CC from 7.00 V.
    const PSK = window.PSUKIT ? window.PSUKIT(K, { post, led7, lcdWidth }) : null;
    const PSK_S = PSK ? 420 / PSK.G.W : 1, PSK_Y = PSK ? -PSK.G.FEET * PSK_S : 0, I_LIMIT = 0.7;
    const psk = (x, y) => [+(x * PSK_S).toFixed(1), +(PSK_Y + y * PSK_S).toFixed(1)];
    const PSU = PSK ? { W: 420, H: Math.round(PSK.G.H * PSK_S - PSK_Y), pos: psk(...PSK.G.pos), gnd: psk(...PSK.G.gnd), neg: psk(...PSK.G.neg), knob: [...psk(PSK.G.vKnob[0], PSK.G.vKnob[1]), +(PSK.G.vKnob[2] * PSK_S).toFixed(1)], iknob: [...psk(PSK.G.iKnob[0], PSK.G.iKnob[1]), +(PSK.G.iKnob[2] * PSK_S).toFixed(1)], limit: I_LIMIT }
      : { W: 420, H: 300, pos: [306, -44], gnd: [348, -44], neg: [390, -44], knob: [112, -106, 30] };
    function supply(o) {
      if (!PSK) throw new Error('the bench supply needs psukit.js (libraries/bench-supply/) in this library’s scripts');
      const lim = o.lim != null ? o.lim : I_LIMIT;
      return `<g transform="translate(0 ${PSK_Y.toFixed(2)}) scale(${PSK_S.toFixed(5)})">${PSK.supplyBody()}</g>` + (o.bodyOnly ? '' : supplyFace(o.V, lim, o.sol));
    }
    // the supply's face alone (its displays, lamps, knob pointers, POWER, OUTPUT), for a moving layer over supply({ bodyOnly }):
    // V on the VOLTAGE knob, lim on the CURRENT knob; d what its displays show (a solution { Vout, I, cc }: they update a few
    // times a second); blink: the limit being set on the CURRENT knob (PSUKIT.limitBlink: the amps display shows it, blinking)
    function supplyFace(V, lim, d, blink) {
      const r = { vStr: PSK.fmtV(d.Vout), aStr: blink ? (blink.on ? PSK.fmtA(lim) : '') : PSK.fmtA(d.I), setA: !!blink, lit: 1, set: false, test: false, out: true, cv: !d.cc, cc: d.cc, pw: true };
      return `<g transform="translate(0 ${PSK_Y.toFixed(2)}) scale(${PSK_S.toFixed(5)})">${PSK.supplyLive(r, V / 30, lim / 5)}</g>`;
    }

    // ───────────── the handheld multimeter (local: bottom centre at (0, 0); 246 × 504) ─────────────
    // 3½ digits (2000 counts: a maximum reading of 1999), DC volts on the 20 V range. An orange holster, a grey reflective LCD with black segments,
    // RANGE/HOLD/REL/SELECT, the rotary switch on V⎓, the jacks (10A, mA µA, COM, VΩ) with the leads' plugs in COM and VΩ.
    const DMM = { com: [28, -64], vo: [84, -64] };
    // the meter's reading (its local space): the digits (3½, black on grey), a minus, the bargraph (an analogue echo of it)
    function dmmReading(str, rng = 20) {   // rng: the range (V) the bargraph's full scale is (card 3's readings are all on 20 V)
      // 3½ digits: three full places and a leading half digit (only a "1"), right-aligned, the whole inside the glass
      const g = [], neg = str[0] === '-', H = 46, digits = neg ? str.slice(1) : str, x = 46 - lcdWidth(digits, H);
      if (digits && digits.replace(/\./g, '').length < 4) g.push(`<g opacity="0.06">${lcd7(x - H * 0.74, -366, '1', H, { ghost: 0 })}</g>`);
      if (neg) g.push(`<rect x="-84" y="-392" width="11" height="4.5" fill="#15191C"/>`);
      g.push(lcd7(x, -366, digits, H));
      const nb = Math.round(clamp(Math.abs(+str) / rng) * 40);
      for (let k = 0; k < 40; k++) g.push(`<rect x="${-80 + k * 3.9}" y="-352" width="2.4" height="6" fill="#15191C" opacity="${k < nb ? 0.9 : 0.06}"/>`);
      return g.join('');
    }
    // o: { txt (the reading; null: the LCD blank), unit, fn (the rotary switch's position, a name round it: 'V⎓' unless said,
    // e.g. 'mV' for the 200 mV range: card 8) }
    function dmm(o) {
      const g = [], W = 246, H = 504, x0 = -W / 2;
      g.push(shadow(0, W + 30, 0.6));
      g.push(`<rect x="${x0 - 12}" y="${-H + 8}" width="${W}" height="${H - 8}" rx="40" fill="#6E3410"/>`);   // its left side shows (it stands right of centre)
      g.push(`<rect x="${x0}" y="${-H}" width="${W}" height="${H}" rx="40" fill="url(#${P}holster)" stroke="#5A2A0A" stroke-width="1.4"/>`
        + `<path d="M${x0 + 30},${-H + 6} H${-x0 - 30}" stroke="#FFD2A8" stroke-opacity="0.5" stroke-width="2"/>`
        + `<rect x="${x0 + 14}" y="${-H + 16}" width="${W - 28}" height="${H - 32}" rx="26" fill="url(#${P}dmmFace)" stroke="#15181C" stroke-width="1.4"/>`);
      // the LCD
      g.push(`<rect x="-98" y="-468" width="196" height="138" rx="12" fill="#111316" stroke="#000"/><rect x="-88" y="-458" width="176" height="118" rx="6" fill="url(#${P}lcdGrey)"/>`
        + `<path d="M-86,-456 L-30,-456 L-60,-342 L-86,-342 Z" fill="#FFFFFF" opacity="0.13"/>`);
      if (o.txt != null) g.push(dmmReading(o.txt));   // o.txt null: the LCD blank (a moving layer draws the reading)
      g.push(text(-80, -438, 'DC', 13, '#15191C', 'start', 700) + `<path d="M-56,-447 h14 M-56,-442 h3 m2.5,0 h3 m2.5,0 h3" stroke="#15191C" stroke-width="1.6"/>`
        + text(-28, -438, 'AUTO', 10, '#15191C', 'start', 700, false, 'opacity="0.18"') + text(55, -368, o.unit || 'V', (o.unit || 'V').length > 1 ? 16 : 22, '#15191C', 'start', 700));   // (mV: smaller, inside the glass)
      ['RANGE', 'HOLD', 'REL', 'SELECT'].forEach((nm, k) => g.push(`<rect x="${-96 + k * 49}" y="-318" width="44" height="22" rx="7" fill="#4A515B" stroke="#15181C"/><rect x="${-94 + k * 49}" y="-316" width="40" height="8" rx="4" fill="#FFFFFF" opacity="0.08"/>`
        + text(-74 + k * 49, -303, nm, 7.8, '#E6EDF5', 'middle', 700)));
      // the rotary switch: functions round it, its pointer on V⎓
      const cx = 0, cy = -196, R = 64;
      const FN = [['OFF', -140], ['V~', -105], ['V⎓', -70], ['mV', -35], ['Ω', 0], ['·)))', 35], ['°C', 70], ['µA', 105], ['mA', 140], ['A', 175]];
      g.push(`<circle cx="${cx}" cy="${cy}" r="${R + 34}" fill="#2B3036" stroke="#15181C"/>`);
      FN.forEach(([nm, a]) => {
        const r = a * Math.PI / 180, tx = cx + (R + 20) * Math.sin(r), ty = cy - (R + 20) * Math.cos(r) + 4;
        g.push(text(tx, ty, nm, nm.length > 2 ? 9.5 : 11, nm === 'OFF' ? '#FFFFFF' : nm.startsWith('V') || nm === 'mV' ? '#FFC24D' : '#E6EDF5', 'middle', 700));
      });
      const fnA = (FN.find(f => f[0] === (o.fn || 'V⎓')) || FN[2])[1], pa = fnA * Math.PI / 180;
      g.push(`<circle cx="${cx}" cy="${cy + 5}" r="${R}" fill="#000" opacity="0.5" filter="${ksh}"/><circle cx="${cx}" cy="${cy}" r="${R}" fill="url(#${P}selector)" stroke="#0B0D10" stroke-width="1.4"/>`
        + `<g transform="rotate(${fnA} ${cx} ${cy})"><rect x="${cx - 15}" y="${cy - R + 4}" width="30" height="${2 * R - 8}" rx="13" fill="#3A4048" stroke="#15181C"/><rect x="${cx - 11}" y="${cy - R + 8}" width="8" height="${2 * R - 16}" rx="4" fill="#FFFFFF" opacity="0.1"/>`
        + `<path d="M${cx},${cy - R + 8} l-6,14 h12 Z" fill="#F2F4F6"/></g>`
        + `<circle cx="${(cx + (R - 6) * Math.sin(pa)).toFixed(1)}" cy="${(cy - (R - 6) * Math.cos(pa)).toFixed(1)}" r="0" />`);
      // the jacks
      [['10A', -84, 'Red', false], ['mA µA', -28, 'Red', false], ['COM', 28, 'Black', true], ['VΩ', 84, 'Red', true]].forEach(([nm, jx, c, plug]) => {
        g.push(`<circle cx="${jx}" cy="-64" r="17" fill="#15181C"/><circle cx="${jx}" cy="-64" r="13" fill="none" stroke="${c === 'Red' ? '#C8262B' : '#C9D1D9'}" stroke-width="3"/><circle cx="${jx}" cy="-64" r="6" fill="#050506"/>`
          + text(jx, -30, nm, 9.5, c === 'Red' ? '#FF8A80' : '#E6EDF5', 'middle', 700));
        if (plug) g.push(`<circle cx="${jx}" cy="-64" r="12" fill="url(#${P}post${c})"/><circle cx="${jx}" cy="-64" r="7" fill="#000" opacity="0.35"/><circle cx="${jx - 3}" cy="-68" r="3" fill="#FFFFFF" opacity="0.25"/>`);
      });
      g.push(text(0, -270 + 4, '', 1));
      return g.join('');
    }

    // ───────────── the breadboard, in true perspective (rig space: the bench line y = 0) ─────────────
    // a half-size board (400 points: 30 columns, 82.5 × 55 mm, 9.5 mm thick), lying flat on the bench in front of the supply
    // and the meter, square to the camera, seen a little from above (its far edge a little shorter: the lines converge). The top is mapped by a homography from the board's own flat plan (X along it 0 … 462,
    // Y from the front edge back 0 … 154, 2.8 px/mm) onto its four corners on the picture, so the holes, rails and parts
    // all keep their places on it and shrink toward its far end, as they do in a photograph.
    const BB = { W: 231, D: 154, pitch: 7.112, x0: 9, cols: 30,
      FL: [118, 100], FR: [548, 100], BR: [530, 4], BL: [136, 4], tL: 30, tR: 30 };
    const ROW = { neg: 3.9, pos: 6.45, a: 10.6, b: 13.14, c: 15.68, d: 18.22, e: 20.76, f: 28.4, g: 30.94, h: 33.48, i: 36.02, j: 38.56, neg2: 45.4, pos2: 47.95 };
    let HOMO;
    function setBoard(c) {
      Object.assign(BB, c);
      const [x0, y0] = BB.FL, [x1, y1] = BB.FR, [x2, y2] = BB.BR, [x3, y3] = BB.BL;
      const dx1 = x1 - x2, dx2 = x3 - x2, dx3 = x0 - x1 + x2 - x3, dy1 = y1 - y2, dy2 = y3 - y2, dy3 = y0 - y1 + y2 - y3, den = dx1 * dy2 - dx2 * dy1;
      const gg = (dx3 * dy2 - dx2 * dy3) / den, hh = (dx1 * dy3 - dx3 * dy1) / den;
      const a = x1 - x0 + gg * x1, b = x3 - x0 + hh * x3, d = y1 - y0 + gg * y1, e = y3 - y0 + hh * y3;
      HOMO = (X, Y) => { const u = X / BB.W, v = Y / BB.D, w = gg * u + hh * v + 1; return [(a * u + b * v + x0) / w, (d * u + e * v + y0) / w]; };
    }
    setBoard({});
    const bbFlat = (col, row) => [BB.x0 + BB.pitch * (col + 0.5), ROW[row] * 2.8];
    const bbAt = (col, row) => HOMO(...bbFlat(col, row));
    // the picture's scale at a point of the board (pixels per flat pixel), and the direction of its length there
    const bbScale = (X, Y) => { const p = HOMO(X, Y), q = HOMO(X + 1, Y); return Math.hypot(q[0] - p[0], q[1] - p[1]); };
    const bbAngle = (X, Y) => { const p = HOMO(X, Y), q = HOMO(X + 1, Y); return Math.atan2(q[1] - p[1], q[0] - p[0]) * 180 / Math.PI; };
    const poly = pts => 'M' + pts.map(p => p[0].toFixed(1) + ',' + p[1].toFixed(1)).join(' L') + ' Z';
    function breadboard() {
      const { FL, FR, BR, BL, tL, tR } = BB, g = [];
      const fb = [FL[0], FL[1] + tL], rb = [FR[0], FR[1] + tR], lb = [BL[0], BL[1] + tL * 0.85];
      // its shadow on the bench, and a faint mirror of its front face in the polished top
      g.push(`<path d="${poly([[fb[0] - 6, fb[1] + 4], [rb[0] + 8, rb[1] + 2], [BR[0] + 14, BR[1] + 30], [lb[0] - 10, lb[1]]])}" fill="#000" opacity="0.7" filter="url(#${P}uSoft)"/>`
        + `<linearGradient id="${P}bbRef" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#D6D1C5" stop-opacity="0.16"/><stop offset="1" stop-color="#D6D1C5" stop-opacity="0"/></linearGradient>`
        + `<path d="${poly([fb, rb, [rb[0], rb[1] + tR], [fb[0], fb[1] + tL]])}" fill="url(#${P}bbRef)"/>`);
      // the left end (it faces us a little: that end is nearer), the front face, the top
      g.push(`<path d="${poly([FL, FR, rb, fb])}" fill="url(#${P}bbFront)"/>`
        + `<path d="${poly([FL, FR, BR, BL])}" fill="url(#${P}bbTop)"/>`
        + `<path d="M${FL[0]},${FL[1]} L${FR[0]},${FR[1]}" stroke="#FFFFFF" stroke-opacity="0.85" stroke-width="1.4"/><path d="M${FL[0]},${FL[1]} L${BL[0]},${BL[1]}" stroke="#FFFFFF" stroke-opacity="0.6"/>`);
      // the central channel, the rails' printed lines
      const strip = (y0, y1, x0 = 0, x1 = BB.W) => poly([HOMO(x0, y0), HOMO(x1, y0), HOMO(x1, y1), HOMO(x0, y1)]);
      g.push(`<path d="${strip(24.6 * 2.8 - 7, 24.6 * 2.8 + 7)}" fill="#D2CCBF"/><path d="${strip(24.6 * 2.8 - 7, 24.6 * 2.8 - 3)}" fill="#ABA496"/>`);
      [[1.6, '#2F6FD6'], [8.6, '#D63A2F'], [43.2, '#2F6FD6'], [50.2, '#D63A2F']].forEach(([mm, c]) => g.push(`<path d="${strip(mm * 2.8 - 0.8, mm * 2.8 + 0.8, BB.x0, BB.x0 + BB.cols * BB.pitch)}" fill="${c}"/>`));
      // the holes: each a small square well, darker on its far side
      const holes = [], walls = [], hs = 1.3;
      const hole = (X, Y) => { holes.push(poly([HOMO(X - hs, Y - hs), HOMO(X + hs, Y - hs), HOMO(X + hs, Y + hs), HOMO(X - hs, Y + hs)])); walls.push(poly([HOMO(X - hs, Y + hs * 0.2), HOMO(X + hs, Y + hs * 0.2), HOMO(X + hs, Y + hs), HOMO(X - hs, Y + hs)])); };
      ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j'].forEach(r => { for (let c = 0; c < BB.cols; c++) hole(...bbFlat(c, r)); });
      ['neg', 'pos', 'neg2', 'pos2'].forEach(r => { for (let c = 0; c < BB.cols; c++) if (c % 6 !== 5) hole(...bbFlat(c, r)); });
      g.push(`<path d="${holes.join(' ')}" fill="#4A463E"/><path d="${walls.join(' ')}" fill="#1E1B17"/>`);
      return g.join('');
    }
    // a jumper wire between two holes, arched (solid core, coloured insulation, bare ends); s: the picture's scale there
    function jumper(p, q, col, h = 9, s = 1) {
      const d = `M${p[0]},${p[1]} C${p[0]},${p[1] - h * s} ${q[0]},${q[1] - h * s} ${q[0]},${q[1]}`;
      const c = { red: ['#C8262B', '#FF8A80'], black: ['#1D2024', '#6A707A'], yellow: ['#E0B81A', '#FFF0A0'], blue: ['#2A5BD7', '#9FC0FF'], green: ['#1F8A3B', '#7EE29A'] }[col];
      return `<path d="${d}" fill="none" stroke="#000" stroke-opacity="0.3" stroke-width="${4 * s}" transform="translate(${1.5 * s} ${2 * s})"/><path d="${d}" fill="none" stroke="${c[0]}" stroke-width="${3.2 * s}" stroke-linecap="round"/>`
        + `<path d="${d}" fill="none" stroke="${c[1]}" stroke-opacity="0.6" stroke-width="${0.9 * s}" transform="translate(-0.4 -1)"/>`;
    }
    // a wire out of a hole with a bared end standing free (the supply's clip bites it): returns the markup and the end
    function flyWire(p, col, dx, dy, s = 1) {
      const e = [p[0] + dx * s, p[1] + dy * s], d = `M${p[0]},${p[1]} C${p[0]},${p[1] - 14 * s} ${e[0] + 20 * s},${e[1]} ${e[0] + 8 * s},${e[1]}`;
      const c = col === 'red' ? ['#C8262B', '#FF8A80'] : ['#1D2024', '#6A707A'];
      return { svg: `<path d="${d}" fill="none" stroke="${c[0]}" stroke-width="${3.2 * s}" stroke-linecap="round"/><path d="${d}" fill="none" stroke="${c[1]}" stroke-opacity="0.6" stroke-width="${0.9 * s}" transform="translate(-0.4 -1)"/>`
        + `<line x1="${e[0] + 8 * s}" y1="${e[1]}" x2="${e[0]}" y2="${e[1]}" stroke="#D5DCE4" stroke-width="${1.6 * s}"/>`, end: e };
    }
    // an axial resistor lying on the board, its leads bent down into two holes of one row (cA, cB). kind: '1k' (a ½ W
    // metal-film, blue, 1 kΩ 1 %: brown black black brown brown) or '10R' (a 2 W metal-oxide, beige, 10.0 Ω 1 %: brown black
    // black gold brown). Returns its markup, two grip points on its bare leads and its top.
    const RES = { '1k': { L: 9, D: 3.3, body: '#3F86C6', bands: ['#7A4A1E', '#151515', '#151515', '#7A4A1E', '#7A4A1E'] },
      '10R': { L: 15, D: 5, body: '#D8C39A', bands: ['#7A4A1E', '#151515', '#151515', '#C9A24A', '#7A4A1E'] } };
    function axialResistor(cA, cB, row, kind) {
      const r = RES[kind], [XA, Y] = bbFlat(cA, row), [XB] = bbFlat(cB, row), Xm = (XA + XB) / 2, s = bbScale(Xm, Y), ang = bbAngle(Xm, Y);
      const pA = HOMO(XA, Y), pB = HOMO(XB, Y), mid = HOMO(Xm, Y);
      const Lb = r.L * 2.8 * s, rb = r.D * 2.8 * s / 2, lift = rb + 1.2 * s, C = [mid[0], mid[1] - lift], th = ang * Math.PI / 180;
      const end = k => [C[0] + k * Lb / 2 * Math.cos(th), C[1] + k * Lb / 2 * Math.sin(th)];
      const eA = end(-1), eB = end(1), lw = (0.6 * 2.8 * s).toFixed(2);
      const leadD = (e, p, k) => `M${e[0].toFixed(1)},${e[1].toFixed(1)} L${(p[0] - k * 1.5 * s).toFixed(1)},${(e[1] + (p[0] - e[0]) * Math.tan(th)).toFixed(1)} Q${p[0].toFixed(1)},${(e[1] + (p[0] - e[0]) * Math.tan(th)).toFixed(1)} ${p[0].toFixed(1)},${(e[1] + (p[0] - e[0]) * Math.tan(th) + 2 * s).toFixed(1)} L${p[0].toFixed(1)},${p[1].toFixed(1)}`;
      const leads = leadD(eA, pA, 1) + ' ' + leadD(eB, pB, -1);
      const g = [`<ellipse cx="${(mid[0] + 2 * s).toFixed(1)}" cy="${(mid[1] + 1 * s).toFixed(1)}" rx="${(Lb * 0.55).toFixed(1)}" ry="${(rb * 0.55).toFixed(1)}" transform="rotate(${ang.toFixed(1)} ${mid[0].toFixed(1)} ${mid[1].toFixed(1)})" fill="#000" opacity="0.35" filter="url(#${P}blur2)"/>`,
        `<path d="${leads}" fill="none" stroke="#6A727C" stroke-width="${lw}" stroke-linejoin="round"/><path d="${leads}" fill="none" stroke="#EEF2F5" stroke-width="${(lw * 0.4).toFixed(2)}" stroke-linejoin="round" transform="translate(-0.3 -0.4)"/>`];
      // the body: end caps a little fatter than the middle, the colour bands, a cylinder's light
      const bands = r.bands.map((c, k) => { const f = [0.2, 0.32, 0.44, 0.58, 0.8][k]; return `<rect x="${(-Lb / 2 + f * Lb).toFixed(2)}" y="${(-rb * 1.06).toFixed(2)}" width="${(Lb * 0.075).toFixed(2)}" height="${(rb * 2.12).toFixed(2)}" fill="${c}"/>`; }).join('');
      const bodyD = `M${-Lb / 2 + rb},${-rb * 1.1} C${-Lb / 2 + rb * 1.6},${-rb * 1.1} ${-Lb / 2 + rb * 1.8},${-rb * 0.92} ${-Lb / 2 + rb * 2.4},${-rb * 0.92} H${Lb / 2 - rb * 2.4} C${Lb / 2 - rb * 1.8},${-rb * 0.92} ${Lb / 2 - rb * 1.6},${-rb * 1.1} ${Lb / 2 - rb},${-rb * 1.1}`
        + ` A${rb},${rb * 1.1} 0 0 1 ${Lb / 2 - rb},${rb * 1.1} C${Lb / 2 - rb * 1.6},${rb * 1.1} ${Lb / 2 - rb * 1.8},${rb * 0.92} ${Lb / 2 - rb * 2.4},${rb * 0.92} H${-Lb / 2 + rb * 2.4} C${-Lb / 2 + rb * 1.8},${rb * 0.92} ${-Lb / 2 + rb * 1.6},${rb * 1.1} ${-Lb / 2 + rb},${rb * 1.1} A${rb},${rb * 1.1} 0 0 1 ${-Lb / 2 + rb},${-rb * 1.1} Z`;
      const cid = `${P}rb${kind}`;
      g.push(`<g transform="translate(${C[0].toFixed(1)} ${C[1].toFixed(1)}) rotate(${ang.toFixed(2)})"><clipPath id="${cid}"><path d="${bodyD}"/></clipPath>`
        + `<path d="${bodyD}" fill="${r.body}"/><g clip-path="url(#${cid})">${bands}<rect x="${-Lb}" y="${-rb * 1.2}" width="${2 * Lb}" height="${rb * 2.4}" fill="url(#${P}cyl)"/></g></g>`);
      const grip = (e, p) => [p[0], (e[1] + (p[0] - e[0]) * Math.tan(th) + p[1]) / 2 + 1 * s];
      return { svg: g.join(''), gripL: grip(eA, pA), gripR: grip(eB, pB), top: C[1] - rb * 1.2, mid: C, s };
    }
    // the 5 W ceramic power resistor (22 × 10 × 9 mm, white cement, printed) lying on the board on a 1 mm stand-off, its
    // leads out of its ends and bent down into two holes of one row (cA, cB); drawn on the board's own plan, so it turns and
    // shrinks with it. Returns its markup, two grip points on its bare leads, its top and the picture's scale there.
    function powerResistor(cA, cB, row, label = '10Ω 1% 5W') {
      const [XA, Ym] = bbFlat(cA, row), [XB] = bbFlat(cB, row), Xm = (XA + XB) / 2, s = bbScale(Xm, Ym), ang = bbAngle(Xm, Ym);
      const L = 22 * 2.8, Dd = 10 * 2.8, up = (y, h) => y - h, hz = 9 * 2.8 * s * 0.92, so = 1 * 2.8 * s;
      const at = (X, Y, h) => { const p = HOMO(X, Y); return [p[0], up(p[1], h)]; };
      const x0 = Xm - L / 2, x1 = Xm + L / 2, yF = Ym - Dd / 2, yB = Ym + Dd / 2;
      const fbl = at(x0, yF, so), fbr = at(x1, yF, so), ftl = at(x0, yF, so + hz), ftr = at(x1, yF, so + hz);
      const bbl = at(x0, yB, so), btl = at(x0, yB, so + hz), btr = at(x1, yB, so + hz);
      const g = [];
      // its shadow on the board
      const sh = [HOMO(x0 - 2, yF - 2), HOMO(x1 + 4, yF - 2), HOMO(x1 + 6, yB + 4), HOMO(x0, yB + 4)];
      g.push(`<path d="${poly(sh)}" fill="#000" opacity="0.4" filter="url(#${P}blur2)"/>`);
      // the leads: out of the end faces' middles, along, then down into the holes
      const mL = [(fbl[0] + btl[0]) / 2, (fbl[1] + btl[1]) / 2 - hz * 0.02], mR = [(fbr[0] + btr[0]) / 2 + (btr[0] - ftr[0]) * 0, (fbr[1] + btr[1]) / 2];
      const eL = at(x0, Ym, so + hz / 2), eR = at(x1, Ym, so + hz / 2), hA = HOMO(XA, Ym), hB = HOMO(XB, Ym);
      const lw = (0.8 * 2.8 * s).toFixed(2);
      const leadD = (e, h) => `M${e[0].toFixed(1)},${e[1].toFixed(1)} L${h[0].toFixed(1)},${(e[1] + (h[0] - e[0]) * Math.tan(ang * Math.PI / 180)).toFixed(1)} L${h[0].toFixed(1)},${h[1].toFixed(1)}`;
      const leads = leadD(eL, hA) + ' ' + leadD(eR, hB);
      g.push(`<path d="${leads}" fill="none" stroke="#6A727C" stroke-width="${lw}" stroke-linejoin="round"/><path d="${leads}" fill="none" stroke="#EEF2F5" stroke-width="${(lw * 0.4).toFixed(2)}" stroke-linejoin="round" transform="translate(-0.3 -0.4)"/>`);
      // the body: its left end (nearer, so it shows), its top, its front face with the printing and the cement's grain
      g.push(`<path d="${poly([fbl, bbl, btl, ftl])}" fill="#D6D0C3"/><path d="${poly([ftl, ftr, btr, btl])}" fill="#F7F4EC"/>`
        + `<path d="${poly([fbl, fbr, ftr, ftl])}" fill="url(#${P}ceramic)"/>`);
      const fx = (ftl[0] + fbr[0]) / 2, fy = (ftl[1] + fbr[1]) / 2;
      for (let k = 0; k < 40; k++) { const u = 0.04 + rnd(k, 5) * 0.92, v = 0.1 + rnd(k, 6) * 0.8; const px = fbl[0] + (fbr[0] - fbl[0]) * u + (ftl[0] - fbl[0]) * v, py = fbl[1] + (fbr[1] - fbl[1]) * u + (ftl[1] - fbl[1]) * v; g.push(`<circle cx="${px.toFixed(1)}" cy="${py.toFixed(1)}" r="${(0.35 * s).toFixed(2)}" fill="#8C8577" opacity="0.5"/>`); }
      g.push(`<g transform="translate(${fx.toFixed(1)} ${fy.toFixed(1)}) rotate(${ang.toFixed(2)}) scale(${(s * 0.92).toFixed(3)})">${text(0, 3, label, 8.6, '#2A2F36', 'middle', 700)}</g>`);
      const gp = (e, h) => [h[0], (e[1] + (h[0] - e[0]) * Math.tan(ang * Math.PI / 180) + h[1]) / 2];
      return { svg: g.join(''), gripL: gp(eL, hA), gripR: gp(eR, hB), top: Math.min(ftl[1], btl[1], btr[1]), mid: [(ftl[0] + btr[0]) / 2, (ftl[1] + btr[1]) / 2], s };
    }
    // the MES lamp in its batten holder, wires to two holes; glow 0 … 1.2 (from its power)
    // the lamp's glass (its outline) and its filament (a coil between its supports), in its own space
    const glassPath = (cx, yb) => { const by = yb - 76, br = 19; return `M${cx - 7},${yb - 56} C${cx - 8},${by + 12} ${cx - br},${by + 6} ${cx - br},${by} A${br},${br} 0 1 1 ${cx + br},${by} C${cx + br},${by + 6} ${cx + 8},${by + 12} ${cx + 7},${yb - 56} Z`; };
    const filPath = (cx, by) => `M${cx - 6},${by + 2} q1,-3 2,0 q1,-3 2,0 q1,-3 2,0 q1,-3 2,0 q1,-3 2,0 q1,-3 2,0`;
    // the lamp's light, glow 0 … 1.25 (its filament's power against its rating): a halo round it, the glass filled with
    // warm light, the filament glowing from dull red to yellow-white, a hot core round it; dim, half-lit and full all read as
    // a bulb lit that hard (owner, 2026-10-09: "the bulb doesnt have any mid glow effect when it turns on")
    function lampLitAt(cx, yb, glow) {
      const by = yb - 76, br = 19, gl = Math.min(1, glow), w = Math.pow(gl, 0.6);   // w: how bright it looks (the eye's response)
      const fc = `rgb(255,${Math.round(110 + 140 * w)},${Math.round(40 + 180 * w * w)})`;
      return `<circle cx="${cx}" cy="${by}" r="${(br * 7).toFixed(1)}" fill="#FFB547" opacity="${(0.32 * w).toFixed(3)}" filter="url(#${P}lbig)"/>`
        + `<circle cx="${cx}" cy="${by}" r="${(br * 3.2).toFixed(1)}" fill="#FFD27A" opacity="${(0.42 * w).toFixed(3)}" filter="url(#${P}lbig)"/>`
        + `<path d="${glassPath(cx, yb)}" fill="url(#${P}bulbLit)" opacity="${Math.min(1, 0.25 + 0.85 * w).toFixed(3)}"/>`
        + `<circle cx="${cx}" cy="${by + 2}" r="${(br * (0.55 + 0.75 * w)).toFixed(1)}" fill="url(#${P}filGlow)" opacity="${Math.min(1, 0.4 + 0.7 * w).toFixed(3)}"/>`
        + `<path d="${filPath(cx, by)}" fill="none" stroke="${fc}" stroke-width="${(1.3 + 0.8 * w).toFixed(2)}" filter="${rim}"/>`
        + `<path d="M${cx - 10},${by - 9} Q${cx - 6},${by - 13} ${cx - 1},${by - 13}" fill="none" stroke="#FFFFFF" stroke-opacity="0.75" stroke-width="2" stroke-linecap="round"/>`
        + `<path d="${glassPath(cx, yb)}" fill="none" stroke="#FFF1C9" stroke-opacity="${(0.25 + 0.45 * w).toFixed(3)}" stroke-width="1"/>`;
    }
    // the flash a filament goes out in (k 1 → 0 over the flash): blue-white, far brighter than its glow, the glass lit through
    function lampFlash(pL, pR, k) {
      if (k <= 0.01) return '';
      const cx = (pL[0] + pR[0]) / 2 + 2, yb = pL[1] - 10, by = yb - 76, br = 19;
      return `<circle cx="${cx}" cy="${by}" r="${(br * 9).toFixed(1)}" fill="#DDEBFF" opacity="${(0.45 * k).toFixed(3)}" filter="url(#${P}lbig)"/>`
        + `<circle cx="${cx}" cy="${by}" r="${(br * 3.6).toFixed(1)}" fill="#FFFFFF" opacity="${(0.7 * k).toFixed(3)}" filter="url(#${P}lbig)"/>`
        + `<path d="${glassPath(cx, yb)}" fill="#FFFFFF" opacity="${(0.9 * k).toFixed(3)}"/><circle cx="${cx}" cy="${by + 2}" r="${(br * 1.4).toFixed(1)}" fill="url(#${P}filGlow)" opacity="${k.toFixed(3)}"/>`;
    }
    // the lamp's light alone, for a moving layer over a cold lamp drawn at pL, pR (the same space as lamp())
    const lampLit = (pL, pR, glow) => (glow > 0.01 ? lampLitAt((pL[0] + pR[0]) / 2 + 2, pL[1] - 10, glow) : '');
    function lamp(pL, pR, glow, o = {}) {
      const cx = (pL[0] + pR[0]) / 2 + 2, yb = pL[1] - 10, g = [];
      g.push(`<ellipse cx="${cx + 4}" cy="${yb + 2}" rx="44" ry="6" fill="#000" opacity="0.35" filter="url(#${P}blur2)"/>`);
      // the base (black moulding), its two screw terminals, the wires down into the board
      g.push(`<path d="M${pL[0]},${pL[1]} C${pL[0]},${yb - 6} ${cx - 34},${yb - 8} ${cx - 30},${yb - 9}" fill="none" stroke="#C8262B" stroke-width="3"/><path d="M${pR[0]},${pR[1]} C${pR[0]},${yb - 6} ${cx + 34},${yb - 8} ${cx + 30},${yb - 9}" fill="none" stroke="#1D2024" stroke-width="3"/>`);
      g.push(`<path d="M${cx - 40},${yb} V${yb - 14} Q${cx - 40},${yb - 18} ${cx - 36},${yb - 18} H${cx + 36} Q${cx + 40},${yb - 18} ${cx + 40},${yb - 14} V${yb} Z" fill="url(#${P}bakelite)"/>`
        + `<path d="M${cx - 40},${yb - 18} L${cx - 35},${yb - 24} H${cx + 45} L${cx + 40},${yb - 18} Z" fill="#3A3530"/>`
        + `<circle cx="${cx - 30}" cy="${yb - 9}" r="4" fill="url(#${P}brassV)"/><line x1="${cx - 32.5}" y1="${yb - 9}" x2="${cx - 27.5}" y2="${yb - 9}" stroke="#5A4010" stroke-width="1"/>`
        + `<circle cx="${cx + 30}" cy="${yb - 9}" r="4" fill="url(#${P}brassV)"/><line x1="${cx + 27.5}" y1="${yb - 9}" x2="${cx + 32.5}" y2="${yb - 9}" stroke="#5A4010" stroke-width="1"/>`);
      // the socket (brass screw), the lamp's cap and glass
      g.push(`<rect x="${cx - 13}" y="${yb - 44}" width="26" height="22" fill="url(#${P}bakelite)"/><rect x="${cx - 9}" y="${yb - 56}" width="18" height="14" fill="url(#${P}brassH)"/>`);
      for (let k = 0; k < 4; k++) g.push(`<path d="M${cx - 9},${yb - 54 + k * 3.4} L${cx + 9},${yb - 52.4 + k * 3.4}" stroke="#6B4E18" stroke-width="1"/>`);
      const by = yb - 76, br = 19;
      g.push(`<path d="${glassPath(cx, yb)}" fill="url(#${P}bulbCold)" stroke="#E8F4FF" stroke-opacity="0.35" stroke-width="1"/>`);   // the glass, cold
      g.push(`<path d="M${cx - 3},${yb - 56} L${cx - 6},${by + 2} M${cx + 3},${yb - 56} L${cx + 6},${by + 2}" stroke="#9AA3AD" stroke-width="0.9"/><ellipse cx="${cx}" cy="${by + 8}" rx="3.2" ry="2" fill="#DDEBF5" opacity="0.3"/>`
        + (o.blown ? `<path d="M${cx - 6},${by + 2} q1,-3 2,0 q1,-3 1.6,1.5 M${cx + 6},${by + 2} q-1,-3 -2,0 q-1,3 -1.5,4.5" fill="none" stroke="#3A332C" stroke-width="1.3"/>`
          + `<ellipse cx="${cx}" cy="${by - 7}" rx="13" ry="8" fill="#2B2622" opacity="0.38"/><ellipse cx="${cx - 2}" cy="${by - 9}" rx="7" ry="4" fill="#1C1814" opacity="0.3"/>`
          : `<path d="${filPath(cx, by)}" fill="none" stroke="#4A4038" stroke-width="1.3"/>`)
        + `<path d="M${cx - 10},${by - 9} Q${cx - 6},${by - 13} ${cx - 1},${by - 13}" fill="none" stroke="#FFFFFF" stroke-opacity="0.45" stroke-width="1.4" stroke-linecap="round"/>`);
      if (glow > 0.01 && !o.blown) g.push(lampLitAt(cx, yb, glow));
      return g.join('');
    }

    // ───────────── rigs: whole set-ups, in their own local space (floor y = 0) ─────────────
    // the direct and indirect rigs share their parts (owner's references, 2026-10-08), in two layouts. 'compact' (the tiles):
    // the supply at x 0, the meter close beside it a little behind (centre 604, 0.86x), the breadboard flat in front of them.
    // 'wide' (the full stage, 2a/3a): the supply at x 0, the meter at full size on the bench line (centre 1010), the board in
    // front between them. Both use the 10 Ω 5 W ceramic power resistor (5.1 V across it is 2.6 W); the indirect rig has it
    // in series with the lamp (0.59 W). Returns { back, front }: what stands on the bench line, and the board with everything
    // on it and the leads.
    const LAYOUT = {
      compact: { meter: 604, ms: 0.86, my: -18, board: { FL: [118, 100], FR: [548, 100], BR: [530, 4], BL: [136, 4], tL: 30, tR: 30 } },
      wide: { meter: 1010, ms: 1, my: 0, board: { FL: [436, 104], FR: [936, 104], BR: [914, 6], BL: [458, 6], tL: 32, tR: 32 } },
    };
    const RIG = { meter: 604, W: 735, ms: 0.86, my: -18 };
    const R_DIRECT = R_KNOWN;
    // the circuit at the supply's knobs (V, its limit L): the 10 Ω alone, or the lamp in series with it. CV while it draws
    // less than the limit, else CC. A burnt-out lamp (blown) opens the circuit: no current, the supply's set voltage at its
    // posts, nothing across the resistor
    function circuitAt(lampIn, V, L, blown) {
      if (lampIn) {
        if (blown) return { I: 0, VR: 0, VL: 0, Vout: V, P: 0, glow: 0, cc: false, open: true };
        const s0 = series(V);
        if (s0.I <= L) return Object.assign({}, s0, { Vout: V, cc: false });
        const I = Math.max(0, L), VL = I > 0 ? lampV(I) : 0;
        return { I, VR: I * R_KNOWN, VL, Vout: I * R_KNOWN + VL, P: I * VL, glow: Math.min(1.25, Math.pow((I * VL) / (LAMP.V * LAMP.I), 1.6)), cc: true };
      }
      const I = V / R_DIRECT;
      return I <= L ? { I, VR: V, Vout: V, glow: 0, cc: false } : { I: Math.max(0, L), VR: Math.max(0, L) * R_DIRECT, Vout: Math.max(0, L) * R_DIRECT, glow: 0, cc: true };
    }
    function rigElectric(o) {
      const lampIn = !!o.lamp, Vs = o.V, lim = o.lim != null ? o.lim : I_LIMIT;
      const solveL = (V, L = lim) => circuitAt(lampIn, V, L, o.blown);
      const sol = solveL(Vs);
      const L = LAYOUT[o.layout || 'compact'], wide = o.layout === 'wide';
      setBoard(L.board);
      const at = bbAt, sc = (c, r) => bbScale(...bbFlat(c, r));
      const back = [], front = [];
      back.push(`<g>${supply({ V: Vs, lim, sol, bodyOnly: o.supplyLive })}</g>`);   // o.supplyLive: its face drawn by a moving layer (out.face)
      back.push(`<g transform="translate(${L.meter} ${L.my}) scale(${L.ms})">${dmm({ txt: o.meterBlank ? null : dmm20(sol.VR) })}</g>`);
      front.push(breadboard());
      // the columns: the lamp from 1 to 7 and a short link from 7 to 10 (indirect), the resistor across ten columns (its 22 mm
      // body and the bends)
      const cR0 = 10, cR1 = 20, cIn = lampIn ? 1 : cR0;
      // the supply comes in on the back rails, right under its output posts: two wires standing up out of the rails (+ red,
      // − black), the supply's crocodile clips on them; jumpers from those rails across to the parts' columns
      // (wide: the posts are left of the board, so the wires stand at its left end and lean toward them)
      const rFly = wide ? flyWire(at(1, 'pos2'), 'red', -16, -22, sc(1, 'pos2')) : flyWire(at(12, 'pos2'), 'red', 2, -24, sc(12, 'pos2'));
      const bFly = wide ? flyWire(at(3, 'neg2'), 'black', -10, -14, sc(3, 'neg2')) : flyWire(at(19, 'neg2'), 'black', 2, -20, sc(19, 'neg2'));
      front.push(rFly.svg, bFly.svg);
      front.push(jumper(at(cR1, 'neg2'), at(cR1, 'e'), 'black', 10, sc(cR1, 'e')), jumper(at(cIn, 'pos2'), at(cIn, 'e'), 'red', 10, sc(cIn, 'e')));
      let lampTop = null, bulb = null;
      if (lampIn) {
        const pL = at(1, 'c'), pR = at(7, 'c'), m = [(pL[0] + pR[0]) / 2, (pL[1] + pR[1]) / 2], ls = 1.32 * Math.hypot(pR[0] - pL[0], pR[1] - pL[1]) / 2 / 36;
        front.push(jumper(at(7, 'b'), at(10, 'b'), 'yellow', 5, sc(8, 'b')));
        front.push(`<g transform="translate(${m[0].toFixed(1)} ${m[1].toFixed(1)}) scale(${ls.toFixed(3)})">${lamp([-32.1, 9], [32.1, 9], o.lampCold ? 0 : sol.glow, { blown: o.blown })}</g>`);
        lampTop = [m[0], m[1] - 104 * ls];
        bulb = { x: m[0] + 2 * ls, y: m[1] - 77 * ls, r: 19 * ls, glow: sol.glow, tf: `translate(${m[0].toFixed(1)} ${m[1].toFixed(1)}) scale(${ls.toFixed(3)})`, pL: [-32.1, 9], pR: [32.1, 9] };   // the bulb's centre (lamp(): cx + 2, yb − 76); its space for lampLit
      }
      const R = powerResistor(cR0, cR1, 'd');
      front.push(R.svg);
      const s0 = sc(12, 'pos2');
      const cr = croc(rFly.end[0], rFly.end[1], wide ? -150 : -94, 'red', 0.42 * s0), cb = croc(bFly.end[0], bFly.end[1], wide ? -165 : -86, 'black', 0.42 * s0);
      const hr = hookClip(R.gripL[0], R.gripL[1], 70, 'red', 0.5 * R.s), hb = hookClip(R.gripR[0], R.gripR[1], 50, 'black', 0.5 * R.s);
      front.push(cr.svg, cb.svg, hr.svg, hb.svg);
      // the supply's leads: from its posts, a sag on the bench, up to the crocodile clips
      const pp = PSU.pos, pn = PSU.neg, ce = cr.end, be = cb.end;
      const dRed = wide ? `M${pp[0]},${pp[1]} C${pp[0]},${pp[1] + 70} ${ce[0] - 70},${ce[1] - 10} ${ce[0]},${ce[1]}` : `M${pp[0]},${pp[1]} C${pp[0]},${pp[1] + 26} ${ce[0]},${ce[1] - 30} ${ce[0]},${ce[1]}`;
      const dBlk = wide ? `M${pn[0]},${pn[1]} C${pn[0]},${pn[1] + 60} ${be[0] - 50},${be[1] - 6} ${be[0]},${be[1]}` : `M${pn[0]},${pn[1]} C${pn[0]},${pn[1] + 26} ${be[0]},${be[1] - 30} ${be[0]},${be[1]}`;
      front.push(lead(dRed, 'red'), lead(dBlk, 'black'));
      // the meter's leads: from its jacks, over the board's back edge, to the hook clips on the resistor's bare leads
      const jc = [L.meter + L.ms * DMM.com[0], L.my + L.ms * DMM.com[1]], jv = [L.meter + L.ms * DMM.vo[0], L.my + L.ms * DMM.vo[1]], re = hr.end, ke = hb.end;
      const dMR = `M${jv[0]},${jv[1]} C${jv[0] + 10},${jv[1] + 140} ${re[0] + 150},${re[1] + 90} ${re[0]},${re[1]}`;
      const dMB = `M${jc[0]},${jc[1]} C${jc[0] + 4},${jc[1] + 110} ${ke[0] + 110},${ke[1] + 60} ${ke[0]},${ke[1]}`;
      front.push(lead(dMR, 'red', 5),
        lead(dMB, 'black', 5));
      const out = { back: back.join(''), front: front.join(''), svg: back.join('') + front.join(''), sol, rTop: [R.mid[0], R.top], lampTop, bulb, meter: L.meter, ms: L.ms, my: L.my, leads: { red: dRed, black: dBlk, meterRed: dMR, meterBlack: dMB },
        solve: V => solveL(V), solveL, face: supplyFace };
      setBoard(LAYOUT.compact.board);
      return out;
    }

    // ───────────── the metre rule against a rod (local: the stop block's face at x 0, floor y 0) ─────────────
    // a wooden metre rule (30 mm wide) standing on its edge, its graduated face to us: 1 mm divisions down from its top edge,
    // numbered every cm under them; a steel rod (Ø 12 mm) on the bench in front of it, its end against the same stop block
    // as the rule's zero. px: pixels per mm.
    function ruleRig(Lmm, px, o = {}) {
      const g = [], H = 30 * px, top = -H, len = 1000 * px;
      g.push(shadow(len / 2, len + 60, 0.45));
      // the stop block (ground steel, 40 mm high)
      const bh = 55 * px;
      g.push(`<path d="M-60,${-bh} L-50,${-bh - 9} H6 L-4,${-bh} Z" fill="#DDE3E9"/><rect x="-60" y="${-bh}" width="56" height="${bh}" fill="url(#${P}steelBlock)" stroke="#3B424C"/><path d="M-4,${-bh} L6,${-bh - 9} V-9 L-4,0 Z" fill="#6E7884"/>`);
      // the rule: its top edge (a thin band), its face with the grain, the divisions and numbers
      g.push(`<path d="M0,${top} L4,${top - 4} H${len + 4} L${len},${top} Z" fill="url(#${P}beechTop)"/><rect x="0" y="${top}" width="${len}" height="${H}" fill="url(#${P}beech)" stroke="#8A6432" stroke-width="0.6"/>`);
      for (let k = 0; k < 16; k++) g.push(`<path d="M0,${(top + 2 + rnd(k, 41) * (H - 4)).toFixed(1)} C${len * 0.3},${(top + 2 + rnd(k, 42) * (H - 4)).toFixed(1)} ${len * 0.7},${(top + 2 + rnd(k, 43) * (H - 4)).toFixed(1)} ${len},${(top + 2 + rnd(k, 44) * (H - 4)).toFixed(1)}" fill="none" stroke="#A97E43" stroke-opacity="0.2" stroke-width="${(0.4 + rnd(k, 45) * 0.8).toFixed(1)}"/>`);
      const tk = [];
      for (let m = 0; m <= 1000; m++) { const x = m * px, l = (m % 10 === 0 ? 7.5 : m % 5 === 0 ? 5.5 : 3.6) * px; tk.push(`M${x.toFixed(2)},${top} v${l.toFixed(2)}`); }
      g.push(`<path d="${tk.join(' ')}" stroke="#1A140C" stroke-width="${(0.22 * px).toFixed(2)}"/>`);
      for (let c = 1; c < 100; c++) g.push(c % 5 ? text(c * 10 * px, top + 12.2 * px, String(c), 3.4 * px, '#3A2A16', 'middle', 600) : text(c * 10 * px, top + 15.5 * px, String(c), 7.6 * px, '#1A140C', 'middle', 700));
      g.push(text(6 * px, top + 12.2 * px, 'cm', 2.6 * px, '#1A140C', 'start', 600, false, 'opacity="0.75"'));
      if (!o.noRod) g.push(rodOf(Lmm, px, 0));
      return g.join('');
    }
    // the rod: a cylinder on the bench in front of the rule, its far end faced and chamfered, its near end d mm from the stop
    // block (rule space)
    function rodOf(Lmm, px, d = 0) {
      const L = Lmm * px, rr = 6 * px, cy = -rr, x0 = d * px, g = [];
      g.push(`<g transform="translate(${x0.toFixed(2)} 0)"><ellipse cx="${L / 2}" cy="2" rx="${L / 2 + 8}" ry="4" fill="#000" opacity="0.5" filter="${ksh}"/>`
        + `<rect x="0" y="${cy - rr}" width="${L - 1.5}" height="${2 * rr}" fill="url(#${P}rod)"/>`
        + `<ellipse cx="0.8" cy="${cy}" rx="${0.8 * px}" ry="${rr}" fill="#8A939E" opacity="${d > 0.05 ? 0.9 : 0}"/>`
        + `<ellipse cx="${L - 1.5}" cy="${cy}" rx="${0.8 * px}" ry="${rr}" fill="url(#${P}rodEnd)" stroke="#5B636E" stroke-width="0.3"/>`);
      for (let k = 0; k < 9; k++) { const a = rnd(k, 51) * (L - 120); g.push(`<line x1="${a.toFixed(1)}" y1="${(cy - rr * 0.55).toFixed(1)}" x2="${(a + 40 + rnd(k, 53) * 80).toFixed(1)}" y2="${(cy - rr * 0.55).toFixed(1)}" stroke="#FFFFFF" stroke-opacity="0.22" stroke-width="0.6"/>`); }
      return g.join('') + '</g>';
    }
    // a magnifier over a point of the rule: a lens in a ring with its handle, showing the rule there at m×
    function magnifier(cx, cy, r, src, srcX, srcY, m, id) {
      return `<clipPath id="${P}mg${id}"><circle cx="${cx}" cy="${cy}" r="${r}"/></clipPath>`
        + `<line x1="${cx + r * 0.7}" y1="${cy + r * 0.7}" x2="${cx + r * 1.5}" y2="${cy + r * 1.6}" stroke="#15181C" stroke-width="16" stroke-linecap="round"/><line x1="${cx + r * 0.7}" y1="${cy + r * 0.7}" x2="${cx + r * 1.5}" y2="${cy + r * 1.6}" stroke="#3A414B" stroke-width="10" stroke-linecap="round"/>`
        + `<circle cx="${cx}" cy="${cy}" r="${r}" fill="#0A0F16"/><g clip-path="url(#${P}mg${id})"><g transform="translate(${cx} ${cy}) scale(${m}) translate(${-srcX} ${-srcY})">${src}</g></g>`
        + `<circle cx="${cx}" cy="${cy}" r="${r}" fill="none" stroke="#BFE6FF" stroke-opacity="0.1" stroke-width="${r * 0.25}"/><path d="M${cx - r * 0.7},${cy - r * 0.35} A${r * 0.8},${r * 0.8} 0 0 1 ${cx - r * 0.2},${cy - r * 0.78}" fill="none" stroke="#FFFFFF" stroke-opacity="0.5" stroke-width="4" stroke-linecap="round"/>`
        + `<circle cx="${cx}" cy="${cy}" r="${r + 5}" fill="none" stroke="url(#${P}rod)" stroke-width="10"/><circle cx="${cx}" cy="${cy}" r="${r}" fill="none" stroke="#2A2F36" stroke-width="1.5"/>`;
    }

    // a zoom: a small ring at the point (px, py) in the scene, a cone to a lit circle at (cx, cy) showing the scene there at m×
    function zoomBubble(cx, cy, r, src, sx, sy, m, id, px, py, col = '#2EE6C5') {
      const r0 = r / m, d = Math.hypot(cx - px, cy - py), a = Math.atan2(cy - py, cx - px), b = Math.asin(Math.min(1, (r - r0) / d));
      const t1 = a + Math.PI / 2 + b, t2 = a - Math.PI / 2 - b;
      const P1 = [px + r0 * Math.cos(t1), py + r0 * Math.sin(t1)], Q1 = [cx + r * Math.cos(t1), cy + r * Math.sin(t1)];
      const P2 = [px + r0 * Math.cos(t2), py + r0 * Math.sin(t2)], Q2 = [cx + r * Math.cos(t2), cy + r * Math.sin(t2)];
      return `<path d="M${P1[0].toFixed(1)},${P1[1].toFixed(1)} L${Q1[0].toFixed(1)},${Q1[1].toFixed(1)} M${P2[0].toFixed(1)},${P2[1].toFixed(1)} L${Q2[0].toFixed(1)},${Q2[1].toFixed(1)}" stroke="${col}" stroke-opacity="0.8" stroke-width="1.8" stroke-dasharray="6 5"/>`
        + `<circle cx="${px}" cy="${py}" r="${r0}" fill="none" stroke="${col}" stroke-width="2.2" filter="${u('soft')}"/><circle cx="${px}" cy="${py}" r="3" fill="${col}"/>`
        + `<clipPath id="${P}zb${id}"><circle cx="${cx}" cy="${cy}" r="${r}"/></clipPath>`
        + `<circle cx="${cx}" cy="${cy}" r="${r + 6}" fill="#05080C"/><g clip-path="url(#${P}zb${id})"><g transform="translate(${cx} ${cy}) scale(${m}) translate(${-sx} ${-sy})">${src}</g></g>`
        + `<circle cx="${cx}" cy="${cy}" r="${r}" fill="none" stroke="${col}" stroke-width="2.4" filter="${u('soft')}"/>`;
    }

    // ───────────── the crucible furnace (local: its shell's centre line at x 0, floor y 0) ─────────────
    // a top-loading electric crucible furnace (Ø 500 mm, 560 mm high at 0.75 px/mm): blue-grey powder-coated shell on a
    // base frame, the lid swung aside, the clay-graphite crucible with molten aluminium in it, the controller beside it;
    // a magnetic surface thermocouple on the shell, its yellow (type K) cable to a handheld thermometer on the bench.
    const FUR = { r: 188, h: 420, base: 34, probe: [-60, -250] };
    function furnace(o, tl) {
      const { r, h, base } = FUR, g = [], top = -base - h, ry = r * 0.28, Tin = o.Tin, Ts = shellOf(Tin), id = o.uid || '';
      // o.part: 'body' (all but the open top's hot parts), 'top' (only those: drawn over the body as a moving layer), else all
      const part = o.part || 'all', gb = s => { if (part !== 'top') g.push(s); }, gt = s => { if (part !== 'body') g.push(s); };
      const frac = o.frac != null ? clamp(o.frac) : (Tin >= 660 ? 1 : 0);   // how much has melted
      gb(shadow(0, 2 * r + 120, 0.6));
      // the lid, swung aside on its pivot post (left, behind): a thick disc, its steel top, a handle
      const lx = -r * 1.16, ly = top - 40;
      gb(`<rect x="${-r + 2}" y="${top - 70}" width="14" height="${h + 40}" fill="url(#${P}band)"/><rect x="${-r - 2}" y="${top - 78}" width="22" height="14" rx="3" fill="#2A3038"/>`
        + `<path d="M${-r + 9},${top - 70} L${lx + 40},${ly - 12}" stroke="url(#${P}band)" stroke-width="10"/>`
        + `<path d="M${lx - r + 10},${ly} V${ly + 30} A${r - 10},${ry - 2} 0 0 0 ${lx + r - 10},${ly + 30} V${ly} Z" fill="url(#${P}shell)"/>`
        + `<ellipse cx="${lx}" cy="${ly}" rx="${r - 10}" ry="${ry - 2}" fill="url(#${P}shell)" stroke="#6E86A0" stroke-width="1.5"/>`
        + `<ellipse cx="${lx}" cy="${ly}" rx="${r - 60}" ry="${ry - 16}" fill="none" stroke="#1A2430" stroke-width="2"/>`
        + `<rect x="${lx - 30}" y="${ly - 22}" width="60" height="14" rx="6" fill="#15181C"/><rect x="${lx - 34}" y="${ly - 12}" width="8" height="12" fill="#2A3038"/><rect x="${lx + 26}" y="${ly - 12}" width="8" height="12" fill="#2A3038"/>`);
      // the base frame and feet
      gb(`<rect x="${-r - 10}" y="${-base}" width="${2 * r + 20}" height="${base - 10}" fill="#1A2028" stroke="#0A0D10"/><rect x="${-r + 4}" y="-12" width="22" height="12" fill="#0E1114"/><rect x="${r - 26}" y="-12" width="22" height="12" fill="#0E1114"/>`);
      // the shell: a cylinder, two bands, a nameplate, the elements' terminal box
      gb(`<path d="M${-r},${top} V${-base} A${r},${ry} 0 0 0 ${r},${-base} V${top} Z" fill="url(#${P}shell)"/>`);
      [top + 60, -base - 70].forEach(y => gb(`<path d="M${-r},${y} A${r},${ry} 0 0 0 ${r},${y} v12 A${r},${ry} 0 0 1 ${-r},${y + 12} Z" fill="url(#${P}band)"/>`));
      gb(`<rect x="${r * 0.1}" y="${top + 146}" width="132" height="64" rx="4" fill="#D5DCE3" stroke="#6E7884"/><rect x="${r * 0.1 + 4}" y="${top + 150}" width="124" height="56" rx="2" fill="none" stroke="#9AA4AF" stroke-width="0.8"/>`
        + text(r * 0.1 + 66, top + 168, 'CRUCIBLE FURNACE', 10, '#1A2028', 'middle', 700, false, 'letter-spacing="0.6"')
        + text(r * 0.1 + 66, top + 185, '1100 °C max · 9 kW', 9, '#2A3038', 'middle', 600) + text(r * 0.1 + 66, top + 199, '400 V 3~ · ELECTRIC', 9, '#2A3038', 'middle', 600));
      // the shell as it is after use (owner, 2026-10-09: "mock up the furnace details nicely on its surface, natural"): the
      // powder coat's grain; a straw-to-blue heat tint under the lip, where the steel runs hottest; a soft highlight; the
      // rolled shell's weld seam; screws round the bands; the nameplate riveted on; a hot-surface label; the elements'
      // terminal box with its gland and the power cable out of it; the chamber thermocouple's head through the wall (what
      // the controller's PV reads), its cable out of it; scuffs low down. A point on the cylinder at angle th (0 = front)
      // on a ring at height y: (r sin th, y + ry cos th).
      const onC = (th, y) => [r * Math.sin(th * Math.PI / 180), y + ry * Math.cos(th * Math.PI / 180)];
      const shellD = `M${-r},${top} V${-base} A${r},${ry} 0 0 0 ${r},${-base} V${top} Z`;
      gb(`<clipPath id="${P}shellClip${id}"><path d="${shellD}"/></clipPath><linearGradient id="${P}tint${id}" x1="0" y1="0" x2="0" y2="1">`
        + `<stop offset="0" stop-color="#9A6A34" stop-opacity="0.42"/><stop offset="0.35" stop-color="#7A5A70" stop-opacity="0.22"/><stop offset="0.7" stop-color="#3C5A8A" stop-opacity="0.12"/><stop offset="1" stop-color="#3C5A8A" stop-opacity="0"/></linearGradient>`
        + `<g clip-path="url(#${P}shellClip${id})">`
        + `<rect x="${-r}" y="${top}" width="${2 * r}" height="${h}" fill="#000" filter="url(#${P}grain)" opacity="0.32"/>`
        + `<rect x="${-r}" y="${top}" width="${2 * r}" height="150" fill="url(#${P}tint${id})"/>`
        + `<rect x="${-r * 0.42}" y="${top + 20}" width="34" height="${h + 30}" fill="#DCE8F5" opacity="0.07" filter="url(#${P}blur2)"/>`
        + `<rect x="${-r * 0.36}" y="${top + 20}" width="8" height="${h + 30}" fill="#FFFFFF" opacity="0.06"/>`
        + `<path d="M${-r},${top + 6} A${r},${ry} 0 0 0 ${r},${top + 6}" fill="none" stroke="#120C08" stroke-opacity="0.35" stroke-width="10" filter="url(#${P}blur2)"/></g>`);
      const sx = r * 0.86, sy0 = top + 14, sy1 = -base + ry * Math.cos(Math.asin(0.86)) - 2;
      gb(`<line x1="${sx.toFixed(1)}" y1="${sy0}" x2="${sx.toFixed(1)}" y2="${sy1.toFixed(1)}" stroke="#121920" stroke-width="1.8" stroke-opacity="0.7"/>`
        + `<line x1="${(sx - 1.6).toFixed(1)}" y1="${sy0}" x2="${(sx - 1.6).toFixed(1)}" y2="${sy1.toFixed(1)}" stroke="#8FA4B8" stroke-width="0.9" stroke-opacity="0.28"/>`);
      const screw = (x, y, k = 1, s = 3.4) => `<ellipse cx="${x.toFixed(1)}" cy="${(y + 0.8).toFixed(1)}" rx="${(s * k + 0.8).toFixed(1)}" ry="${(s + 0.8).toFixed(1)}" fill="#0C1014" opacity="0.6"/>`
        + `<ellipse cx="${x.toFixed(1)}" cy="${y.toFixed(1)}" rx="${(s * k).toFixed(1)}" ry="${s}" fill="url(#${P}chromeR)"/><line x1="${(x - s * k * 0.7).toFixed(1)}" y1="${y.toFixed(1)}" x2="${(x + s * k * 0.7).toFixed(1)}" y2="${y.toFixed(1)}" stroke="#2A3038" stroke-width="0.9"/>`;
      [top + 60, -base - 70].forEach(yb => [-62, -24, 24, 62].forEach(th => { const [x, y] = onC(th, yb + 6); gb(screw(x, y, Math.cos(th * Math.PI / 180))); }));
      [[0, 0], [1, 0], [0, 1], [1, 1]].forEach(([i, j]) => gb(`<circle cx="${(r * 0.1 + 5 + i * 122).toFixed(1)}" cy="${top + 151 + j * 54}" r="2.2" fill="url(#${P}chromeR)" stroke="#5A646E" stroke-width="0.5"/>`));
      gb(text(r * 0.1 + 66, top + 207, 'No. 24-0187 · 2024', 6.5, '#4A545E', 'middle', 600));
      // the hot-surface label: a yellow plate, the warning triangle with its heat waves, the words (as on a real furnace)
      const hx = -112, hy = top + 104, hk = Math.cos(Math.asin(hx / r));
      gb(`<g transform="translate(${hx} ${hy}) scale(${hk.toFixed(3)} 1)"><rect x="-30" y="-30" width="60" height="70" rx="4" fill="#F2C80F" stroke="#6A5508" stroke-width="0.8"/>`
        + `<path d="M0,-24 L22,14 L-22,14 Z" fill="#F2C80F" stroke="#111" stroke-width="3.2" stroke-linejoin="round"/>`
        + `<path d="M-7,6 c-3,-4 3,-7 0,-12 M0,6 c-3,-4 3,-7 0,-12 M7,6 c-3,-4 3,-7 0,-12 M-11,9 H11" fill="none" stroke="#111" stroke-width="1.8" stroke-linecap="round"/>`
        + text(0, 26, 'HOT SURFACE', 7.2, '#111', 'middle', 800) + text(0, 35, 'DO NOT TOUCH', 6.4, '#111', 'middle', 700) + '</g>');
      // the elements' terminal box (right, low), its gland and the power cable's start; a lightning-flash label on its lid
      const tb = { x: r * 0.5, y: -214, w: 64, h: 72 };
      gb(`<rect x="${tb.x + 3}" y="${tb.y + 5}" width="${tb.w}" height="${tb.h}" rx="5" fill="#000" opacity="0.4" filter="url(#${P}blur2)"/>`
        + `<rect x="${tb.x}" y="${tb.y}" width="${tb.w}" height="${tb.h}" rx="5" fill="url(#${P}band)" stroke="#1A2028" stroke-width="1.2"/>`
        + `<rect x="${tb.x + 5}" y="${tb.y + 5}" width="${tb.w - 10}" height="${tb.h - 10}" rx="3" fill="none" stroke="#2A3038" stroke-opacity="0.6"/>`
        + [[7, 7], [tb.w - 7, 7], [7, tb.h - 7], [tb.w - 7, tb.h - 7]].map(([dx, dy]) => screw(tb.x + dx, tb.y + dy, 1, 2.4)).join('')
        + `<path d="M${tb.x + 32},${tb.y + 16} L${tb.x + 46},${tb.y + 40} L${tb.x + 18},${tb.y + 40} Z" fill="#F2C80F" stroke="#111" stroke-width="2" stroke-linejoin="round"/>`
        + `<path d="M${tb.x + 33},${tb.y + 23} l-4,8 h5 l-4,7" fill="none" stroke="#111" stroke-width="1.6" stroke-linejoin="round"/>`
        + text(tb.x + 32, tb.y + 56, '400 V', 8, '#15191C', 'middle', 800)
        + `<rect x="${tb.x + 24}" y="${tb.y + tb.h}" width="16" height="8" fill="#9AA4AF" stroke="#2A3038" stroke-width="0.8"/><rect x="${tb.x + 26}" y="${tb.y + tb.h + 8}" width="12" height="10" rx="2" fill="#15181C"/>`);
      const powerEnd = [tb.x + 32, tb.y + tb.h + 18];
      // the chamber thermocouple: through the wall high on the right, a ceramic sheath out to its aluminium head
      const [tcx, tcy] = onC(56, top + 92);
      gb(`<ellipse cx="${tcx.toFixed(1)}" cy="${tcy.toFixed(1)}" rx="5" ry="10" fill="url(#${P}band)" stroke="#1A2028"/>`
        + `<rect x="${tcx.toFixed(1)}" y="${(tcy - 5).toFixed(1)}" width="24" height="10" fill="#E8DFC8" stroke="#8A8068" stroke-width="0.8"/><rect x="${tcx.toFixed(1)}" y="${(tcy - 5).toFixed(1)}" width="24" height="3" fill="#FFFFFF" opacity="0.5"/>`
        + `<rect x="${(tcx + 22).toFixed(1)}" y="${(tcy - 13).toFixed(1)}" width="24" height="26" rx="5" fill="url(#${P}chromeR)" stroke="#3B424C"/><rect x="${(tcx + 22).toFixed(1)}" y="${(tcy - 13).toFixed(1)}" width="24" height="6" rx="3" fill="#C9D1D9"/>`
        + `<rect x="${(tcx + 29).toFixed(1)}" y="${(tcy + 13).toFixed(1)}" width="10" height="7" rx="1.5" fill="#15181C"/>`);
      const tcEnd = [tcx + 34, tcy + 20];
      // scuffs and a little dirt low on the shell, the bench's dust on the base frame
      for (let k = 0; k < 6; k++) gb(`<path d="M${((rnd(k, 51) - 0.5) * r * 1.5).toFixed(1)},${(-base - 20 - rnd(k, 52) * 120).toFixed(1)} l${(8 + rnd(k, 53) * 18).toFixed(1)},${(-2 - rnd(k, 54) * 4).toFixed(1)}" stroke="#A9B8C8" stroke-opacity="${(0.08 + 0.08 * rnd(k, 55)).toFixed(2)}" stroke-width="1.1" stroke-linecap="round"/>`);
      gb(`<path d="M${-r},${-base - 6} A${r},${ry} 0 0 0 ${r},${-base - 6}" fill="none" stroke="#0A0D10" stroke-opacity="0.35" stroke-width="14" filter="url(#${P}blur2)"/>`
        + screw(-r * 0.72, -base / 2 - 4, 1, 3) + screw(r * 0.72, -base / 2 - 4, 1, 3) + `<line x1="${-r - 10}" y1="${-base + 0.8}" x2="${r + 10}" y2="${-base + 0.8}" stroke="#4A5664" stroke-opacity="0.5"/>`);
      // the open top: the shell's rolled steel lip, the refractory lining lit by the heat inside, the crucible's rim, the
      // melt. Everything that glows follows the melt's temperature (dark below ~450 °C, cherry at 700, orange-yellow at
      // 1100); aluminium melts at 660 °C, so below that the crucible holds a solid, dull metal.
      const hot = glowCol(Tin), heat = clamp((Tin - 430) / 520), molten = frac > 0.5;
      gt(`<radialGradient id="${P}liningT${id}" cx="0.5" cy="0.55" r="0.5"><stop offset="0.55" stop-color="${mixCol(hot, '#FFF2C8', 0.25 * heat)}" stop-opacity="${(0.25 + 0.75 * heat).toFixed(2)}"/><stop offset="1" stop-color="#4A2A18"/></radialGradient>`
        + `<radialGradient id="${P}meltT${id}" cx="0.46" cy="0.4" r="0.62"><stop offset="0" stop-color="${mixCol(hot, '#FFFBEA', 0.55 * heat + 0.1)}"/><stop offset="0.45" stop-color="${mixCol(hot, '#FFE0A0', 0.3 * heat)}"/><stop offset="1" stop-color="${mixCol(hot, '#5A1406', 0.45)}"/></radialGradient>`
        + `<radialGradient id="${P}meltS${id}" cx="0.46" cy="0.4" r="0.62"><stop offset="0" stop-color="${mixCol('#B8BEC6', hot, 0.35 * heat)}"/><stop offset="0.45" stop-color="${mixCol('#8E949C', hot, 0.3 * heat)}"/><stop offset="1" stop-color="#4E545C"/></radialGradient>`);
      gt(`<ellipse cx="0" cy="${top}" rx="${r}" ry="${ry}" fill="url(#${P}band)" stroke="#9FB2C6" stroke-width="2"/>`
        + `<ellipse cx="0" cy="${top + 2}" rx="${r - 12}" ry="${ry - 3.5}" fill="#1A2029"/>`
        + `<ellipse cx="0" cy="${top + 4}" rx="${r - 20}" ry="${ry - 6.5}" fill="url(#${P}liningT${id})"/>`
        + `<ellipse cx="0" cy="${top + 5}" rx="${r - 58}" ry="${ry - 16}" fill="#2B2420" stroke="${mixCol('#4A423C', hot, 0.5 * heat)}" stroke-width="4"/>`
        + `<ellipse cx="0" cy="${top + 9}" rx="${r - 70}" ry="${ry - 21}" fill="url(#${P}meltS${id})"/>`   // the solid metal
        + (frac > 0.005 ? `<ellipse cx="0" cy="${top + 9}" rx="${((r - 70) * (0.55 + 0.45 * frac)).toFixed(1)}" ry="${((ry - 21) * (0.55 + 0.45 * frac)).toFixed(1)}" fill="url(#${P}meltT${id})" opacity="${Math.min(1, 0.35 + 0.65 * frac).toFixed(2)}"/>` : ''));   // the liquid, growing as it melts
      // the metal's own sheen (a liquid metal mirrors the glowing lining) and its dross: a dull skin, broken
      if (frac > 0.05) gt(`<ellipse cx="${-r * 0.12}" cy="${top + 4}" rx="${r * 0.3}" ry="${ry * 0.18}" fill="#FFFFFF" opacity="${((0.12 + 0.2 * heat) * frac).toFixed(2)}" filter="url(#${P}lsoft)"/>`);
      for (let k = 0; k < 7; k++) gt(`<ellipse cx="${((rnd(k, 61) - 0.5) * (r - 96) * 1.6).toFixed(1)}" cy="${(top + 9 + (rnd(k, 62) - 0.5) * (ry - 28)).toFixed(1)}" rx="${(6 + rnd(k, 63) * 10).toFixed(1)}" ry="${(2 + rnd(k, 64) * 2).toFixed(1)}" fill="#8A7E70" opacity="${(0.45 * frac).toFixed(2)}"/>`);
      // the heat: a glow over the open top, and the air above it shimmering (an electric furnace: no flame)
      if (heat > 0) {
        gt(`<ellipse cx="0" cy="${top - 18}" rx="${r * 0.95}" ry="${ry * 2.2}" fill="${hot}" opacity="${(0.42 * heat).toFixed(2)}" filter="url(#${P}lbig)"/>`
          + `<ellipse cx="0" cy="${top - 130}" rx="${r * 0.62}" ry="150" fill="${hot}" opacity="${(0.12 * heat).toFixed(2)}" filter="url(#${P}lbig)"/>`);
        // (o.shimmer === false: a unit animates its own rising air instead)
        if (o.shimmer !== false) for (let k = 0; k < 5; k++) {
          const x0 = (k - 2) * r * 0.22 + (rnd(k, 71) - 0.5) * 20, hh = 120 + rnd(k, 72) * 90, sw = 1 + rnd(k, 73) * 1.4;
          gt(`<path d="M${x0.toFixed(1)},${top + 4} C${(x0 + 26 * sw).toFixed(1)},${(top - hh * 0.3).toFixed(1)} ${(x0 - 30 * sw).toFixed(1)},${(top - hh * 0.65).toFixed(1)} ${(x0 + 10).toFixed(1)},${(top - hh).toFixed(1)}" fill="none" stroke="${mixCol(hot, '#FFE6B0', 0.4)}" stroke-width="${(10 + 8 * sw).toFixed(1)}" stroke-linecap="round" opacity="${(0.09 * heat).toFixed(2)}" filter="url(#${P}lsoft)"/>`);
        }
        // the lid's underside and the lip catch the light
        gt(`<path d="M${-r + 6},${top + 2} A${r - 6},${ry - 2} 0 0 1 ${r - 6},${top + 2}" fill="none" stroke="${hot}" stroke-width="3" opacity="${(0.5 * heat).toFixed(2)}" filter="url(#${P}lsoft)"/>`);
      }
      // the surface thermocouple: a magnet base (black) on the shell, the probe, the yellow cable
      const [px, py] = FUR.probe;
      gb(`<ellipse cx="${px}" cy="${py + 4}" rx="20" ry="20" fill="#000" opacity="0.5" filter="${ksh}"/><circle cx="${px}" cy="${py}" r="17" fill="url(#${P}rubber)" stroke="#000"/><circle cx="${px}" cy="${py}" r="7" fill="url(#${P}chromeR)"/>`
        + `<rect x="${px - 5}" y="${py + 14}" width="10" height="26" rx="3" fill="#1A1D21"/>`);
      return { svg: g.join(''), Ts, probeEnd: [px, py + 40], top, powerEnd, tcEnd };
    }
    // the handheld thermometer (type K): local bottom centre; yellow-trimmed grey, an LCD, °C (o.part 'lcd': only its
    // display, for a moving layer)
    function thermometer(T, o = {}) {
      const W = 128, H = 250, s = T.toFixed(1);
      const lcd = `<rect x="${-W / 2 + 16}" y="${-H + 22}" width="${W - 32}" height="74" rx="6" fill="url(#${P}lcdGrey)"/>`
        + `<path d="M${-W / 2 + 18},${-H + 24} L${-W / 2 + 50},${-H + 24} L${-W / 2 + 30},${-H + 94} L${-W / 2 + 18},${-H + 94} Z" fill="#FFFFFF" opacity="0.13"/>`
        + lcd7(W / 2 - 22 - lcdWidth(s, 32), -H + 84, s, 32) + text(W / 2 - 22, -H + 46, '°C', 12, '#15191C', 'end', 700) + text(-W / 2 + 22, -H + 38, 'T1', 9, '#15191C', 'start', 700);
      if (o.part === 'lcd') return lcd;
      const g = [shadow(0, 150, 0.55)];
      g.push(`<rect x="${-W / 2}" y="${-H}" width="${W}" height="${H}" rx="22" fill="#3A4048" stroke="#15181C" stroke-width="1.4"/><rect x="${-W / 2 + 8}" y="${-H + 8}" width="${W - 16}" height="${H - 16}" rx="16" fill="url(#${P}dmmFace)"/>` + lcd);
      ['HOLD', 'MIN', 'MAX'].forEach((nm, k) => g.push(`<rect x="${-W / 2 + 14 + k * 34}" y="${-H + 116}" width="30" height="18" rx="6" fill="#4A515B"/>` + text(-W / 2 + 29 + k * 34, -H + 128, nm, 6.8, '#E6EDF5', 'middle', 700)));
      g.push(`<circle cx="0" cy="${-H + 170}" r="18" fill="#C8262B" stroke="#6E0F12"/><path d="M0,${-H + 158} v10 M-7,${-H + 162} a10,10 0 1 0 14,0" fill="none" stroke="#FFFFFF" stroke-width="2.4" stroke-linecap="round"/>`
        + text(0, -H + 212, 'TYPE K', 9, '#FFC24D', 'middle', 700, false, 'letter-spacing="1"'));
      g.push(`<rect x="-16" y="${-H - 14}" width="32" height="16" rx="3" fill="#E8C21A" stroke="#8A6A08"/>`);
      return g.join('');
    }
    // the furnace's controller (local: bottom-left): PV (red: the chamber, its thermocouple near the elements, not the melt;
    // owner, 2026-10-09), SV (green: the set point), the set knob, the HEAT lamp (lit while its output drives the elements);
    // the CHAMBER tag under PV's label, clear of the digits. o.part 'face': only the displays, the knob and the lamps, for a
    // moving layer over the drawn controller
    function controller(Tin, Tset, o = {}) {
      const g = o.part === 'face' ? [] : [shadow(110, 240, 0.5)], W = 220, H = 230;
      if (o.part !== 'face') g.push(`<rect x="0" y="${-H}" width="${W}" height="${H}" rx="8" fill="url(#${P}psuFront)" stroke="#0B0D10"/><path d="M${W},${-H} l12,-12 V-12 L${W},0 Z" fill="#15181C"/><path d="M0,${-H} l12,-12 H${W + 12} L${W},${-H} Z" fill="#3A414B"/>`
        + text(W / 2, -H + 26, 'TEMPERATURE CONTROLLER', 9.5, '#C9D3DE', 'middle', 700, false, 'letter-spacing="1.2"'));
      const box = (y, col, lab, str, hh) => `<rect x="18" y="${y}" width="${W - 36}" height="${hh}" rx="5" fill="url(#${P}window)" stroke="#000"/>` + text(28, y + 16, lab, 9.5, col, 'start', 700)
        + led7(W - 30 - lcdWidth(str, hh - 22), y + hh - 10, str, hh - 22, col);
      g.push(box(-H + 40, '#FF6B5A', 'PV °C', String(Math.round(Tin)), 64) + text(28, -H + 70, 'CHAMBER', 8, '#FF6B5A', 'start', 700, false, 'letter-spacing="0.6" opacity="0.85"'), box(-H + 112, '#5BFF8A', 'SV °C', String(Math.round(Tset)), 48));
      const lit = o.heat !== false;
      g.push(knob(60, -40, 22, -135 + 270 * clamp(Tset / 1100)) + (lit ? `<circle cx="140" cy="-48" r="6" fill="#FF9A2A" filter="${rim}"/>` : `<circle cx="140" cy="-48" r="6" fill="#3A2410"/>`) + text(154, -44, 'HEAT', 9.5, '#AEB8C3', 'start', 700)
        + `<circle cx="140" cy="-26" r="6" fill="#2A1A1A"/>` + text(154, -22, 'ALARM', 9.5, '#AEB8C3', 'start', 700));
      return g.join('');
    }
    // the wall in section (an inset): the melt, the crucible, the refractory, the insulation, the steel shell, and the
    // temperature falling across them, from the melt to the shell (illustrative)
    // The profile is the wall's own conduction, not a sketch: steady heat through coaxial layers, each falling as ln r over
    // its thickness, the drops shared in proportion to each layer's resistance ln(r₂/r₁)/k (clay-graphite crucible
    // 150–170 mm, k 20; dense refractory 170–230 mm, k 1.2; insulating board 230–300 mm, k 0.12; steel 300–305 mm, k 45
    // W/m·K): almost all of it falls across the insulation. Outside the steel the air's film takes it down to the room.
    // The bands are drawn wider than to scale so each can be named. names: [melt, refractory, insulation, steel, air].
    // Everything is drawn inside the plot's frame: the lines are clipped to it.
    const WALL = [
      { f: 0.16, c: 'melt' }, { f: 0.06, c: '#2E2622', r: [150, 170], k: 20 }, { f: 0.26, c: '#B06A38', r: [170, 230], k: 1.2 },
      { f: 0.32, c: '#E0D3B8', r: [230, 300], k: 0.12 }, { f: 0.1, c: '#8C9BAB', r: [300, 305], k: 45 }, { f: 0.1, c: '#0F1C29' }];
    function wallSection(x0, y0, w, h, Tin, names = []) {
      const Ts = shellOf(Tin), d = Tin - Ts, Tmax = Math.max(800, Tin * 1.22), yt = y0 + 22, yb = y0 + h - 8;
      const tY = T => yb - 14 - T / Tmax * (yb - yt - 30), g = [], edges = [];
      const Rs = WALL.map(L => (L.r ? Math.log(L.r[1] / L.r[0]) / L.k : 0)), RT = Rs.reduce((a, b) => a + b, 0);
      const molten = Tin >= 660, meltC = molten ? mixCol(glowCol(Math.max(Tin, 700)), '#FFC060', 0.45) : '#9AA0A8';
      let x = x0;
      WALL.forEach((L, i) => {
        const ww = w * L.f, c = L.c === 'melt' ? meltC : L.c;
        if (c) g.push(`<rect x="${x.toFixed(1)}" y="${yt}" width="${ww.toFixed(1)}" height="${yb - yt}" fill="${c}" opacity="0.92"/>`);
        if (i === 2) for (let k = 1; k < 6; k++) g.push(`<line x1="${x.toFixed(1)}" y1="${yt + k * (yb - yt) / 6}" x2="${(x + ww).toFixed(1)}" y2="${yt + k * (yb - yt) / 6}" stroke="#7A4524" stroke-opacity="0.35"/>`);
        if (i === 3) for (let k = 0; k < 40; k++) g.push(`<circle cx="${(x + 2 + rnd(k, 81) * (ww - 4)).toFixed(1)}" cy="${(yt + 4 + rnd(k, 82) * (yb - yt - 8)).toFixed(1)}" r="${(0.8 + rnd(k, 83)).toFixed(1)}" fill="#A8977A" opacity="0.6"/>`);
        edges.push(x); x += ww;
      });
      edges.push(x);
      if (molten) g.push(`<rect x="${x0}" y="${yt}" width="${(edges[1] - x0).toFixed(1)}" height="${yb - yt}" fill="#FFFFFF" opacity="0.12" filter="${u('soft')}"/>`);
      // the profile: flat in the melt, then layer by layer
      const pts = [[x0, Tin], [edges[1], Tin]];
      let T = Tin;
      for (let i = 1; i <= 4; i++) {
        const L = WALL[i], T2 = T - d * Rs[i] / RT, x1 = edges[i], x2 = edges[i + 1];
        for (let s = 1; s <= 12; s++) { const rr = L.r[0] + (L.r[1] - L.r[0]) * s / 12; pts.push([x1 + (x2 - x1) * s / 12, T + (T2 - T) * Math.log(rr / L.r[0]) / Math.log(L.r[1] / L.r[0])]); }
        T = T2;
      }
      const air = [];
      for (let s = 0; s <= 12; s++) air.push([edges[5] + (edges[6] - edges[5]) * s / 12, FURN.room + (Ts - FURN.room) * Math.exp(-3 * s / 12)]);
      const pl = a => a.map(([px, pT]) => `${px.toFixed(1)},${tY(pT).toFixed(1)}`).join(' ');
      const clip = `${P}wallClip${Math.round(x0)}`;
      g.push(`<clipPath id="${clip}"><rect x="${x0}" y="${yt}" width="${w}" height="${yb - yt}"/></clipPath><g clip-path="url(#${clip})">`
        + `<polyline points="${pl(pts)}" fill="none" stroke="#FF5A3C" stroke-width="7" stroke-opacity="0.45" stroke-linejoin="round" filter="${u('soft')}"/>`
        + `<polyline points="${pl(pts)}" fill="none" stroke="#FF7A5C" stroke-width="3" stroke-linejoin="round" stroke-linecap="round"/>`
        + `<polyline points="${pl(air)}" fill="none" stroke="#FF4FA8" stroke-width="3" stroke-linejoin="round" filter="${u('soft')}"/></g>`
        + `<rect x="${x0}" y="${yt}" width="${w}" height="${yb - yt}" fill="none" stroke="#FFFFFF" stroke-opacity="0.28" stroke-width="1.2"/>`);
      // the boundaries, dashed down into the names
      edges.slice(1, 6).forEach(ex => g.push(`<line x1="${ex.toFixed(1)}" y1="${yt}" x2="${ex.toFixed(1)}" y2="${yb + 30}" stroke="#FFFFFF" stroke-opacity="0.22" stroke-dasharray="4 4"/>`));
      // what is measured (the thermocouple on the steel's outer face, yellow as its cable) and what is worked out from it
      // (the inside, amber, "≈")
      const halo = 'stroke="#07111A" stroke-width="4" stroke-opacity="0.85" paint-order="stroke"', yS = tY(Ts);
      g.push(text(x0 + 6, tY(Tin) - 10, `≈ ${Math.round(Tin)} °C`, 15.5, '#FFC24D', 'start', 700, false, halo)
        + `<circle cx="${edges[5].toFixed(1)}" cy="${yS.toFixed(1)}" r="9" fill="none" stroke="#F2C80F" stroke-width="2" filter="${u('soft')}"/><circle cx="${edges[5].toFixed(1)}" cy="${yS.toFixed(1)}" r="4.5" fill="#F2C80F"/>`
        + text(edges[4] - 6, yS - 12, `${Ts.toFixed(0)} °C`, 15.5, '#FFFFFF', 'end', 700, false, halo));
      [[0, 0], [2, 1], [3, 2], [4, 3], [5, 4]].forEach(([i, n]) => { if (names[n]) g.push(text((edges[i] + edges[i + 1]) / 2, yb + 24, names[n], fit(names[n], 12.5, 500, Math.max(34, edges[i + 1] - edges[i] + 8)), '#D5DEE8', 'middle', 500)); });
      return g.join('');
    }

    // ───────────── the arm and the cuff (stage space) ─────────────
    // The owner's photograph of an arm with a cuff on (a cut-out, 2000 × 667 px, the unit's img/arm-cuff.webp): a seated
    // person's arm, palm up, the lab coat's sleeve at the shoulder, the cuff round the upper arm with its RANGE and ARTERY
    // marks. Laid on the stage at 0.88 with the elbow and forearm resting on a folded towel; drawn round it: the aneroid
    // gauge (larger than life, as the owner's reference has it) on its stem at the cuff's top edge, its tube to the bulb and
    // release valve on the towel, and the stethoscope's chest piece in the crook of the elbow over the brachial artery: centred
    // on the elbow's crease just below the cuff's lower edge, never under it, lying on the inner elbow (seen tilted); its tube
    // down along the forearm to the listener, out of the picture.
    const ARMP = { x: -10, y: 300, s: 0.88, w: 2000, h: 667, gauge: [356, 317], gr: 104, conn: [356, 462], chest: [641, 590], cuffOut: [496, 706], bulb: [990, -112] };
    function armPhoto(o) {
      const g = [], p = o.p, FL = o.FL, [gx, gy] = ARMP.gauge, gr = ARMP.gr, [cx, cy] = ARMP.conn, [sx, sy] = ARMP.chest;
      const tube = (d, w = 9) => `<path d="${d}" fill="none" stroke="#000" stroke-opacity="0.3" stroke-width="${w + 4}" stroke-linecap="round" transform="translate(3 6)" filter="url(#${P}blur2)"/>`
        + `<path d="${d}" fill="none" stroke="#0A0B0D" stroke-width="${w}" stroke-linecap="round"/><path d="${d}" fill="none" stroke="#2A2F36" stroke-width="${w * 0.66}" stroke-linecap="round"/>`
        + `<path d="${d}" fill="none" stroke="#FFFFFF" stroke-opacity="0.2" stroke-width="${w * 0.18}" stroke-linecap="round" transform="translate(-1 -${(w * 0.25).toFixed(1)})"/>`;
      // the towel, folded in three, from under the elbow off the right edge: its top, its rounded front, the folds, the terry
      const t0 = 600, t1 = 1960, tt = FL - 62;
      g.push(`<ellipse cx="${(t0 + t1) / 2}" cy="${FL + 3}" rx="${(t1 - t0) / 2}" ry="10" fill="#000" opacity="0.5" filter="${ksh}"/>`
        + `<path d="M${t0},${tt + 12} Q${t0},${tt} ${t0 + 14},${tt} H${t1} V${FL} H${t0 + 14} Q${t0},${FL} ${t0},${FL - 12} Z" fill="url(#${P}towel)"/>`
        + `<path d="M${t0 + 2},${tt + 4} L${t0 + 52},${tt - 40} H${t1} V${tt} H${t0 + 14} Z" fill="url(#${P}towelTop)"/>`
        + `<path d="M${t0 + 14},${tt} H${t1}" stroke="#F4F7FA" stroke-opacity="0.8" stroke-width="2"/>`);
      for (let k = 0; k < 3; k++) g.push(`<path d="M${t0 + 6},${tt + 20 + k * 15} C${t0 + 400},${tt + 22 + k * 15} ${t0 + 900},${tt + 18 + k * 15} ${t1},${tt + 20 + k * 15}" stroke="#6E7884" stroke-opacity="0.35" stroke-width="1.4" fill="none"/>`);
      for (let k = 0; k < 220; k++) g.push(`<circle cx="${(t0 + 30 + rnd(k, 101) * (t1 - t0 - 30)).toFixed(1)}" cy="${(tt - 36 + rnd(k, 102) * 94).toFixed(1)}" r="0.9" fill="#FFFFFF" opacity="0.25"/>`);
      // where the forearm and hand press on the towel
      g.push(`<ellipse cx="1150" cy="${tt - 28}" rx="560" ry="12" fill="#1A222C" opacity="0.55" filter="url(#${P}lsoft)"/><ellipse cx="860" cy="${tt - 22}" rx="230" ry="12" fill="#0A0E14" opacity="0.5" filter="url(#${P}lsoft)"/>`
        + `<ellipse cx="1620" cy="${tt - 30}" rx="170" ry="9" fill="#1A222C" opacity="0.45" filter="url(#${P}lsoft)"/>`);
      // the arm
      g.push(`<image href="${o.href}" x="${ARMP.x}" y="${ARMP.y}" width="${ARMP.w * ARMP.s}" height="${ARMP.h * ARMP.s}" preserveAspectRatio="none"/>`);
      // the cuff's ARTERY mark, printed on it: along the arm, pointing down it to the crook of the elbow (where the brachial
      // artery runs and the stethoscope listens), tilted with the cuff's stitching. The photograph's own mark pointed across
      // the arm; it was painted out of the image (the owner's original is img/source/arm-cuff-owner.webp).
      g.push(`<g transform="translate(410 548) rotate(11)" opacity="0.92">`
        + text(-58, 6, 'ARTERY', 15, '#F2F4F6', 'start', 700, false, 'letter-spacing="1.4"')
        + `<path d="M22,-3 H48 V-10 L64,1 L48,12 V5 H22 Z" fill="#F2F4F6"/></g>`);
      // the tube from the cuff's second port, out of its lower edge, along the forearm to the bulb's valve
      const bx = ARMP.bulb[0], by = FL + ARMP.bulb[1], [ox, oy] = ARMP.cuffOut;
      g.push(`<rect x="${ox - 14}" y="${oy - 9}" width="22" height="16" rx="4" fill="#15181C" stroke="#000" transform="rotate(12 ${ox} ${oy})"/>`
        + tube(`M${ox + 4},${oy} C${ox + 110},${oy + 14} ${ox + 260},${oy + 70} ${ox + 330},${oy + 58} C${ox + 400},${oy + 46} ${bx - 70},${by} ${bx - 8},${by}`));
      // the bulb and its valve, on the towel (o.bulb false: drawn by the caller, moving: cuffBulb)
      if (o.bulb !== false) g.push(cuffBulb(FL, 0, 0));
      // the stethoscope's chest piece lying on the inner elbow, seen tilted (the skin there faces up and a little towards us),
      // turned with the arm's line: the diaphragm's head on the skin, the bell above it, the stem out of the neck towards the
      // hand and the viewer; its tube down across the forearm and out of the picture
      const rot = 10, rr = rot * Math.PI / 180, W = (x, y) => [sx + x * Math.cos(rr) - y * Math.sin(rr), sy + x * Math.sin(rr) + y * Math.cos(rr)];
      const se = W(76, 22);
      g.push(`<g transform="translate(${sx} ${sy}) rotate(${rot})">`
        + `<ellipse cx="4" cy="8" rx="62" ry="29" fill="#000" opacity="0.38" filter="url(#${P}blur2)"/>`
        + `<path d="M-56,0 V9 A56,25 0 0 0 56,9 V0 Z" fill="url(#${P}band)" stroke="#3B424C" stroke-width="0.8"/>`
        + `<ellipse cx="0" cy="0" rx="56" ry="25" fill="url(#${P}chromeR)" stroke="#3B424C" stroke-width="0.8"/><ellipse cx="0" cy="0" rx="44" ry="19" fill="none" stroke="#7C858F" stroke-width="1.4"/>`
        + `<path d="M8,-6 L72,20" stroke="#3B424C" stroke-width="11" stroke-linecap="round"/><path d="M8,-6 L72,20" stroke="url(#${P}chromeR)" stroke-width="8.5" stroke-linecap="round"/>`
        + `<rect x="64" y="12" width="20" height="13" rx="3" fill="url(#${P}chromeR)" stroke="#3B424C" stroke-width="0.8" transform="rotate(22 74 18)"/>`
        + `<path d="M-12,-2 L-11,-16 C-18,-22 -27,-28 -30,-34 H30 C27,-28 18,-22 11,-16 L12,-2 Z" fill="url(#${P}band)" stroke="#3B424C" stroke-width="0.8"/>`
        + `<ellipse cx="0" cy="-34" rx="30" ry="12" fill="url(#${P}chromeR)" stroke="#3B424C" stroke-width="0.8"/><ellipse cx="0" cy="-34" rx="22" ry="8" fill="#15181C"/>`
        + `<path d="M-40,-8 C-30,-16 -10,-20 10,-20" fill="none" stroke="#FFFFFF" stroke-opacity="0.5" stroke-width="2"/></g>`);
      g.push(tube(`M${se[0].toFixed(1)},${se[1].toFixed(1)} C${se[0] + 70},${se[1] + 40} ${se[0] + 130},${se[1] + 170} ${se[0] + 160},${se[1] + 300} S${se[0] + 190},${se[1] + 460} ${se[0] + 200},${se[1] + 520}`, 12));
      // the gauge on its stem: the connector on the cuff's top edge, the stem, the case (chrome bezel), the dial 0–300 mmHg
      g.push(`<ellipse cx="${cx}" cy="${cy + 12}" rx="22" ry="6" fill="#000" opacity="0.45" filter="url(#${P}blur2)"/>`
        + `<rect x="${cx - 16}" y="${cy - 8}" width="32" height="20" rx="5" fill="url(#${P}chromeR)" stroke="#3B424C"/>`
        + `<rect x="${cx - 7}" y="${gy + gr + 8}" width="14" height="${cy - gy - gr - 8}" fill="url(#${P}chromeR)" stroke="#3B424C" stroke-width="0.8"/>`
        + `<rect x="${cx - 12}" y="${gy + gr + 4}" width="24" height="14" rx="3" fill="url(#${P}chromeR)" stroke="#3B424C"/>`
        + `<circle cx="${gx + 8}" cy="${gy + 14}" r="${gr + 16}" fill="#000" opacity="0.55" filter="${ksh}"/><circle cx="${gx}" cy="${gy}" r="${gr + 13}" fill="url(#${P}chromeR)" stroke="#3B424C" stroke-width="1.4"/>`
        + `<circle cx="${gx}" cy="${gy}" r="${gr + 3}" fill="#2A2F36"/><circle cx="${gx}" cy="${gy}" r="${gr}" fill="url(#${P}dial)" stroke="#8C96A2"/>`);
      const ang = mm => (-150 + mm) * Math.PI / 180, tk = [], tkb = [];
      for (let m = 0; m <= 300; m += 2) {
        const a = ang(m), r0 = gr - 6, r1 = gr - (m % 20 === 0 ? 20 : m % 10 === 0 ? 14 : 10);
        (m % 10 === 0 ? tkb : tk).push(`M${(gx + r0 * Math.sin(a)).toFixed(2)},${(gy - r0 * Math.cos(a)).toFixed(2)} L${(gx + r1 * Math.sin(a)).toFixed(2)},${(gy - r1 * Math.cos(a)).toFixed(2)}`);
      }
      g.push(`<path d="${tk.join(' ')}" stroke="#15191C" stroke-width="1.1"/><path d="${tkb.join(' ')}" stroke="#15191C" stroke-width="2"/>`);
      for (let m = 0; m <= 300; m += 20) { const a = ang(m), rr = gr - 32; g.push(text(gx + rr * Math.sin(a), gy - rr * Math.cos(a) + 4.5, String(m), 12.5, '#15191C', 'middle', 700, false, 'letter-spacing="-0.3"')); }
      g.push(`<g transform="rotate(-150 ${gx} ${gy})"><rect x="${gx - 5}" y="${gy - gr + 4}" width="10" height="10" fill="none" stroke="#C8262B" stroke-width="1.6"/></g>`
        + text(gx, gy + 34, 'mmHg', 13, '#3A414B', 'middle', 700) + text(gx, gy + 50, '± 3 mmHg', 9, '#6A727C', 'middle', 600));
      if (o.needle !== false) g.push(gaugeNeedle(p));
      return g.join('');
    }
    // the gauge's needle at p mmHg, its pivot and the glass's glare over it (a moving layer of its own while the cuff runs)
    function gaugeNeedle(p) {
      const [gx, gy] = ARMP.gauge, gr = ARMP.gr, a = (-150 + clamp(p, -6, 306)) * Math.PI / 180;
      const needle = `<line x1="${(gx - 18 * Math.sin(a)).toFixed(1)}" y1="${(gy + 18 * Math.cos(a)).toFixed(1)}" x2="${(gx + (gr - 10) * Math.sin(a)).toFixed(1)}" y2="${(gy - (gr - 10) * Math.cos(a)).toFixed(1)}"`;
      return `${needle} stroke="#000" stroke-opacity="0.3" stroke-width="4" transform="translate(2 3)"/>${needle} stroke="#15191C" stroke-width="2.8" stroke-linecap="round"/>`
        + `<circle cx="${gx}" cy="${gy}" r="8" fill="url(#${P}chromeR)" stroke="#3B424C"/>`
        + `<path d="M${gx - gr * 0.78},${gy - gr * 0.3} A${gr * 0.86},${gr * 0.86} 0 0 1 ${gx - gr * 0.1},${gy - gr * 0.85}" fill="none" stroke="#FFFFFF" stroke-opacity="0.6" stroke-width="5" stroke-linecap="round"/>`;
    }
    // the bulb (a pear of black rubber) and its release valve (chrome, a thumb screw on top), lying on the towel: FL the bench
    // line; k how far it is squeezed (0 … 1: shorter and much flatter, about the valve's end, the intake end coming with it);
    // turn the thumb screw's angle (degrees: its knurls and index mark go round with it)
    function cuffBulb(FL, k, turn) {
      const bx = ARMP.bulb[0], by = FL + ARMP.bulb[1], sx = 1 - 0.1 * k, sy = 1 - 0.32 * k, kn = [];
      for (let j = 0; j < 12; j++) {
        const th = (turn + j * 30) * Math.PI / 180, c = Math.cos(th);
        if (c > 0.05) kn.push(`<line x1="${(16 + 13 * Math.sin(th)).toFixed(2)}" y1="-39" x2="${(16 + 13 * Math.sin(th)).toFixed(2)}" y2="-33.5" stroke="#3B424C" stroke-width="${(0.6 + 0.9 * c).toFixed(2)}" opacity="${(0.35 + 0.5 * c).toFixed(2)}"/>`);
      }
      const im = (turn * Math.PI / 180), ic = Math.cos(im);
      return `<g transform="translate(${bx} ${by})"><ellipse cx="${(38 + 90 * sx).toFixed(1)}" cy="38" rx="${(132 * (0.4 + 0.6 * sx)).toFixed(1)}" ry="9" fill="#25303C" opacity="0.8" filter="url(#${P}kshadow)"/>`
        + `<rect x="-8" y="-12" width="46" height="22" rx="4" fill="url(#${P}chromeR)" stroke="#3B424C"/><rect x="10" y="-34" width="12" height="24" rx="3" fill="url(#${P}chromeR)"/><ellipse cx="16" cy="-36" rx="14" ry="6" fill="url(#${P}chromeR)" stroke="#3B424C"/>`
        + kn.join('') + (ic > 0 ? `<circle cx="${(16 + 9 * Math.sin(im)).toFixed(2)}" cy="-37.5" r="1.6" fill="#15191C" opacity="${(0.3 + 0.6 * ic).toFixed(2)}"/>` : '')
        + `<g transform="translate(38 -1) scale(${sx.toFixed(3)} ${sy.toFixed(3)}) translate(-38 1)">`
        + `<path d="M38,-12 C70,-20 90,-58 150,-58 C210,-58 236,-30 236,-2 C236,24 210,40 150,40 C90,40 70,18 38,10 Z" fill="url(#${P}rubber)"/>`
        + `<path d="M80,-30 C110,-50 170,-54 210,-34" fill="none" stroke="#FFFFFF" stroke-opacity="${(0.22 + 0.1 * k).toFixed(2)}" stroke-width="5" stroke-linecap="round"/>`
        + (k > 0.05 ? `<path d="M110,-6 C140,-14 170,-12 200,-4" fill="none" stroke="#000" stroke-opacity="${(0.5 * k).toFixed(2)}" stroke-width="3" stroke-linecap="round"/>` : '')
        + `<rect x="236" y="-10" width="20" height="18" rx="4" fill="#1D2025"/></g></g>`;
    }
    // the cuff's pressure against time (0–180 mmHg), with the sounds heard at each beat (from systolic down to diastolic);
    // the trace, the lines and the "now" dot are clipped to the plot
    function bpTrace(x0, y0, w, h, tNow, L) {
      const T = BP.pump + (BP.top - 50) / BP.rate, px0 = x0 + 62, px1 = x0 + w - 24, py0 = y0 + 54, py1 = y0 + h - 64;
      const X = t => px0 + 10 + (t / T) * (px1 - px0 - 20), Y = p => py1 - p / 180 * (py1 - py0), clip = `${P}bpClip`;
      const g = [`<rect x="${x0}" y="${y0}" width="${w}" height="${h}" rx="16" fill="#07111A" fill-opacity="0.95" stroke="#38D9FF" stroke-opacity="0.7" stroke-width="1.8" filter="${u('soft')}"/>`,
        text(x0 + 22, y0 + 32, L.title, 17, '#38D9FF', 'start', 700, false, 'letter-spacing="1"'),
        `<clipPath id="${clip}"><rect x="${px0}" y="${py0 - 6}" width="${px1 - px0}" height="${py1 - py0 + 6}"/></clipPath>`];
      for (let p = 0; p <= 180; p += 20) g.push((p ? `<line x1="${px0}" y1="${Y(p).toFixed(1)}" x2="${px1}" y2="${Y(p).toFixed(1)}" stroke="#FFFFFF" stroke-opacity="0.07"/>` : '') + text(px0 - 12, Y(p) + 5, String(p), 13, '#AEBBC8', 'end', 600));
      g.push(`<path d="M${px0},${py0 - 6} V${py1} H${px1}" fill="none" stroke="#8B97A8" stroke-opacity="0.6" stroke-width="1.4"/>`);
      const tn = Math.min(tNow, T), pts = [];
      for (let t = 0; t <= tn + 1e-6; t += 0.1) pts.push(`${X(t).toFixed(1)},${Y(cuffAt(t)).toFixed(1)}`);
      g.push(`<g clip-path="url(#${clip})">`);
      [[BP.sys, '#FF6B5A'], [BP.dia, '#FFC24D']].forEach(([p, c]) => g.push(`<line x1="${px0}" y1="${Y(p)}" x2="${px1}" y2="${Y(p)}" stroke="${c}" stroke-dasharray="7 5" stroke-width="1.8" opacity="0.9"/>`));
      g.push(`<polyline points="${pts.join(' ')}" fill="none" stroke="#38D9FF" stroke-width="3" stroke-linejoin="round" filter="${u('soft')}"/>`
        + `<circle cx="${X(tn).toFixed(1)}" cy="${Y(cuffAt(tn)).toFixed(1)}" r="5" fill="#E6FBFF" filter="${u('soft')}"/></g>`);
      g.push(text(px1 - 4, Y(BP.sys) - 9, L.sys, 14, '#FF6B5A', 'end', 700) + text(px0 + 70, Y(BP.dia) + 22, L.dia, 14, '#FFC24D', 'start', 700));
      // the beats heard: a tick under the plot at each beat while the cuff is between systolic and diastolic
      const beat = 60 / BP.bpm, ticks = [];
      for (let t = BP.pump; t <= tn; t += beat) { const p = cuffAt(t); if (p <= BP.sys && p >= BP.dia) ticks.push(X(t)); }
      ticks.forEach(x => g.push(`<line x1="${x.toFixed(1)}" y1="${py1 + 10}" x2="${x.toFixed(1)}" y2="${py1 + 28}" stroke="#2EE6C5" stroke-width="2.6"/>`));
      g.push(text(px0 + 6, py1 + 48, L.time, 14, '#C9D3DE', 'start', 600)
        + (ticks.length ? text((ticks[0] + ticks[ticks.length - 1]) / 2, py1 + 48, L.beats, 14, '#2EE6C5', 'middle', 600) : ''));
      return g.join('');
    }
    // the same plot, live: the cuff's pressure as it has run (R.pts [[t, p]], t in s from the run's start, the gauge's needle
    // with its small swing at each beat), the sounds actually heard (R.sounds [{t, p}]: a tick under the plot at each), and the
    // two lines only once they have been read (R.sys, R.dia, with their labels L.sys, L.dia); the last R.win seconds shown
    // (it slides on after that); the "now" dot at the needle
    function bpTraceLive(x0, y0, w, h, R, L) {
      const px0 = x0 + 62, px1 = x0 + w - 24, py0 = y0 + 54, py1 = y0 + h - 64, win = R.win, tA = Math.max(0, R.tNow - win);
      const X = t => px0 + 10 + ((t - tA) / win) * (px1 - px0 - 20), Y = p => py1 - Math.min(p, 190) / 180 * (py1 - py0), clip = `${P}bpClip`;
      const g = [`<rect x="${x0}" y="${y0}" width="${w}" height="${h}" rx="16" fill="#07111A" fill-opacity="0.95" stroke="#38D9FF" stroke-opacity="0.7" stroke-width="1.8" filter="${u('soft')}"/>`,
        text(x0 + 22, y0 + 32, L.title, 17, '#38D9FF', 'start', 700, false, 'letter-spacing="1"'),
        `<clipPath id="${clip}"><rect x="${px0}" y="${py0 - 6}" width="${px1 - px0}" height="${py1 - py0 + 6}"/></clipPath>`];
      for (let p = 0; p <= 180; p += 20) g.push((p ? `<line x1="${px0}" y1="${Y(p).toFixed(1)}" x2="${px1}" y2="${Y(p).toFixed(1)}" stroke="#FFFFFF" stroke-opacity="0.07"/>` : '') + text(px0 - 12, Y(p) + 5, String(p), 13, '#AEBBC8', 'end', 600));
      g.push(`<path d="M${px0},${py0 - 6} V${py1} H${px1}" fill="none" stroke="#8B97A8" stroke-opacity="0.6" stroke-width="1.4"/>`);
      g.push(`<g clip-path="url(#${clip})">`);
      [[R.sys, '#FF6B5A'], [R.dia, '#FFC24D']].forEach(([p, c]) => { if (p != null) g.push(`<line x1="${px0}" y1="${Y(p).toFixed(1)}" x2="${px1}" y2="${Y(p).toFixed(1)}" stroke="${c}" stroke-dasharray="7 5" stroke-width="1.8" opacity="0.9"/>`); });
      const pts = [];
      R.pts.forEach(([t, p]) => { if (t >= tA - 0.2) pts.push(`${X(t).toFixed(1)},${Y(p).toFixed(1)}`); });
      if (pts.length > 1) g.push(`<polyline points="${pts.join(' ')}" fill="none" stroke="#38D9FF" stroke-width="3" stroke-linejoin="round" filter="${u('soft')}"/>`);
      g.push(`<circle cx="${X(R.tNow).toFixed(1)}" cy="${Y(R.pNow).toFixed(1)}" r="5" fill="#E6FBFF" filter="${u('soft')}"/></g>`);
      if (R.sys != null) g.push(text(px1 - 4, Y(R.sys) - 9, L.sys, 14, '#FF6B5A', 'end', 700));
      if (R.dia != null) g.push(text(px0 + 70, Y(R.dia) + 22, L.dia, 14, '#FFC24D', 'start', 700));
      const shown = R.sounds.filter(s => s.t >= tA), ticks = shown.map(s => X(s.t));
      ticks.forEach(x => g.push(`<line x1="${x.toFixed(1)}" y1="${py1 + 10}" x2="${x.toFixed(1)}" y2="${py1 + 28}" stroke="#2EE6C5" stroke-width="2.6"/>`));
      // the label under the latest unbroken run of sounds (those heard on the way up, while pumping, stand alone)
      let j = shown.length - 1;
      while (j > 0 && shown[j].t - shown[j - 1].t < 1.5) j--;
      g.push(text(px0 + 6, py1 + 48, L.time, 14, '#C9D3DE', 'start', 600)
        + (ticks.length ? text(clamp((ticks[j] + ticks[ticks.length - 1]) / 2, px0 + 150, px1 - 110), py1 + 48, L.beats, 14, '#2EE6C5', 'middle', 600) : ''));
      return g.join('');
    }
    // why the sounds come and go: the brachial artery under the cuff, in section along the arm (shoulder left, elbow right:
    // the blood flows to the right). The cuff presses the tissue and the artery against the bone. A: { p (the cuff), Pa (the
    // artery's pressure now), pulse (0 … 1 over the beat), open (the lumen under the cuff, 0.06 … 1), flowX (how far the blood
    // has gone, px), jet (0 … 1: the spurt just past the cuff), a (the time, for the eddies' turning) }; L: { title, state, stateCol,
    // nums, cuff, artery, bone }. Schematic, drawn to explain (not to scale).
    function arteryInset(x0, y0, w, h, A, L) {
      const col = '#FF6B5A', g = [], dx = x0 + 14, dy = y0 + 44, W = w - 28, H = h - 44 - 62, clip = `${P}artClip`;
      g.push(`<rect x="${x0}" y="${y0}" width="${w}" height="${h}" rx="14" fill="#07111A" fill-opacity="0.95" stroke="${col}" stroke-opacity="0.75" stroke-width="1.6" filter="${u('soft')}"/>`
        + text(x0 + 16, y0 + 28, L.title, fit(L.title, 14.5, 700, w - 30), col, 'start', 700, false, 'letter-spacing="1"'));
      g.push(`<defs><linearGradient id="${P}artFlesh" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#8A4A3E"/><stop offset="1" stop-color="#5E2F28"/></linearGradient>`
        + `<linearGradient id="${P}artBlood" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#B0242A"/><stop offset="0.5" stop-color="#7E1418"/><stop offset="1" stop-color="#5A0E12"/></linearGradient>`
        + `<linearGradient id="${P}artBone" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#F1E8D6"/><stop offset="1" stop-color="#C9BB9E"/></linearGradient>`
        + `<clipPath id="${clip}"><rect x="${dx}" y="${dy}" width="${W}" height="${H}" rx="8"/></clipPath></defs><g clip-path="url(#${clip})">`);
      const c0 = dx + W * 0.24, c1 = dx + W * 0.66, press = clamp(A.p / 200) * 9, sk = dy + 30;
      const sm = x => { x = clamp(x); return x * x * (3 - 2 * x); };
      const under = x => sm((x - c0) / 16) * (1 - sm((x - c1 + 16) / 16)), down = x => sm((x - c1 + 4) / 18);
      const skinY = x => sk + press * under(x);
      // the tissue under the skin, the bone below
      const sl = [];
      for (let x = dx; x <= dx + W + 0.1; x += 4) sl.push(`${x.toFixed(1)},${skinY(x).toFixed(1)}`);
      g.push(`<path d="M${sl.join(' L')} L${dx + W},${dy + H} L${dx},${dy + H} Z" fill="url(#${P}artFlesh)"/>`
        + `<polyline points="${sl.join(' ')}" fill="none" stroke="#D9A07E" stroke-width="5"/>`);
      const by0 = dy + H - 30;
      g.push(`<path d="M${dx},${by0 + 6} C${dx + W * 0.3},${by0 - 2} ${dx + W * 0.7},${by0 - 2} ${dx + W},${by0 + 6} V${dy + H} H${dx} Z" fill="url(#${P}artBone)"/>`
        + `<path d="M${dx + 10},${by0 + 16} C${dx + W * 0.4},${by0 + 12} ${dx + W * 0.6},${by0 + 13} ${dx + W - 10},${by0 + 17}" stroke="#B7A684" stroke-opacity="0.6" stroke-width="1.2" fill="none"/>`
        + text(dx + 8, dy + H - 8, L.bone, 12, '#6B5A40', 'start', 700));
      // the artery: its radius along the arm (upstream swelling with each beat, under the cuff as open as the artery's pressure
      // over the cuff's lets it be, downstream full while blood gets through, slack when it doesn't)
      const yc = (sk + by0) / 2 + 3, r0 = 15, flowing = A.open > 0.08;
      const rUp = r0 * (0.9 + 0.1 * A.pulse), rUn = r0 * A.open, rDn = r0 * (flowing || A.p < 5 ? 0.86 + 0.1 * A.pulse : 0.6);
      const R = x => { const b = rUp + (rDn - rUp) * down(x), un = under(x); return b * (1 - un) + rUn * un; };
      const top = [], bot = [], itop = [], ibot = [];
      for (let x = dx - 2; x <= dx + W + 2.1; x += 3) { const r = R(x); top.push(`${x.toFixed(1)},${(yc - r - 3.5).toFixed(1)}`); bot.unshift(`${x.toFixed(1)},${(yc + r + 3.5).toFixed(1)}`); itop.push(`${x.toFixed(1)},${(yc - r).toFixed(1)}`); ibot.unshift(`${x.toFixed(1)},${(yc + r).toFixed(1)}`); }
      g.push(`<path d="M${top.join(' L')} L${bot.join(' L')} Z" fill="#C2524A"/><path d="M${itop.join(' L')} L${ibot.join(' L')} Z" fill="url(#${P}artBlood)"/>`
        + `<polyline points="${top.join(' ')}" fill="none" stroke="#F2A090" stroke-opacity="0.5" stroke-width="1.4"/>`);
      // the blood's cells, carried along (they stand still while nothing gets through)
      for (let i = 0; i < 26; i++) {
        const x = dx + ((rnd(i, 71) * W + A.flowX * (0.8 + 0.4 * rnd(i, 72))) % W), r = R(x);
        if (r < 5) continue;
        g.push(`<ellipse cx="${x.toFixed(1)}" cy="${(yc + (rnd(i, 73) - 0.5) * 1.3 * (r - 3)).toFixed(1)}" rx="3.4" ry="2" fill="#E8564C" opacity="0.85"/>`);
      }
      // the spurt through the narrowed artery: eddies just past the cuff, and the sound they make, up through the skin to the
      // stethoscope on it
      const sx = dx + W * 0.86, sy = sk;
      if (A.jet > 0.02) {
        for (let k = 0; k < 4; k++) {
          const ex = c1 + 4 + k * 13 + A.jet * 0, ey = yc + (k % 2 ? -1 : 1) * 4, rr = 5 + k * 0.8, rot = (A.a * 520 + k * 80) % 360;
          g.push(`<path d="M${ex + rr},${ey} A${rr},${rr} 0 1 1 ${ex},${ey - rr} A${rr * 0.55},${rr * 0.55} 0 0 1 ${ex + rr * 0.3},${ey}" fill="none" stroke="#FFC0B0" stroke-width="1.6" stroke-linecap="round" opacity="${(A.jet * (0.9 - k * 0.15)).toFixed(3)}" transform="rotate(${rot.toFixed(0)} ${ex} ${ey})"/>`);
        }
        const ox = c1 + 26, oy = yc - 8;
        for (let k = 0; k < 3; k++) {
          const ph = clamp(1 - A.jet + k * 0.2), rr = 12 + ph * (oy - sy - 10);
          g.push(`<path d="M${(ox - rr * 0.5).toFixed(1)},${(oy - rr * 0.87).toFixed(1)} A${rr.toFixed(1)},${rr.toFixed(1)} 0 0 1 ${(ox + rr * 0.5).toFixed(1)},${(oy - rr * 0.87).toFixed(1)}" fill="none" stroke="#2EE6C5" stroke-width="2" stroke-linecap="round" opacity="${(A.jet * (1 - ph) * 0.9).toFixed(3)}"/>`);
        }
      }
      g.push('</g>');
      // the cuff on the skin (its pressure pushing down: an arrow either side of its name) and the stethoscope's chest piece on the skin past it
      const cy1 = skinY((c0 + c1) / 2), ar = clamp(A.p / 160);
      g.push(`<path d="M${c0 - 6},${dy - 2} H${c1 + 6} V${(skinY(c1) - 2).toFixed(1)} Q${c1 + 6},${cy1.toFixed(1)} ${c1 - 10},${cy1.toFixed(1)} H${c0 + 10} Q${c0 - 6},${cy1.toFixed(1)} ${c0 - 6},${(skinY(c0) - 2).toFixed(1)} Z" fill="#1F3A6E" stroke="#0E1D3A" stroke-width="1.2"/>`
        + `<path d="M${c0},${dy + 5} H${c1}" stroke="#7F9AC8" stroke-opacity="0.5" stroke-width="1" stroke-dasharray="3 3"/>`
        + text((c0 + c1) / 2, dy + 18, L.cuff, 12, '#DCE6F5', 'middle', 700));
      if (ar > 0.02) [0.13, 0.87].forEach(f => { const ax = c0 + (c1 - c0) * f; g.push(`<path d="M${ax},${dy + 22} V${(cy1 - 6).toFixed(1)} M${ax - 4},${(cy1 - 10).toFixed(1)} L${ax},${(cy1 - 5).toFixed(1)} L${ax + 4},${(cy1 - 10).toFixed(1)}" stroke="#FFFFFF" stroke-width="1.6" fill="none" stroke-linecap="round" opacity="${(0.25 + 0.65 * ar).toFixed(2)}"/>`); });
      g.push(`<rect x="${sx - 17}" y="${sy - 9}" width="34" height="8" rx="3" fill="url(#${P}chromeR)" stroke="#3B424C" stroke-width="0.8"/><rect x="${sx - 4}" y="${sy - 22}" width="8" height="14" rx="2" fill="url(#${P}chromeR)"/>`
        + `<path d="M${sx + 2},${sy - 20} C${sx + 10},${sy - 32} ${sx + 22},${dy - 4} ${sx + 30},${dy - 10}" fill="none" stroke="#15181C" stroke-width="4"/>`
        + text(dx + 4, yc - r0 - 10, L.artery, 11.5, '#FFD2C8', 'start', 700));
      // what it is doing, and the two pressures that decide it
      g.push(text(x0 + 16, y0 + h - 34, L.state, fit(L.state, 15.5, 700, w - 30), L.stateCol, 'start', 700)
        + text(x0 + 16, y0 + h - 12, L.nums, fit(L.nums, 13.5, 600, w - 30), '#AEBBC8', 'start', 600));
      return g.join('');
    }

    // ───────────── the potentiometer (meter bridge) and its circuit (rig space: the board's front-left corner on the bench) ─────────────
    // As the owner's reference shows it: a varnished wooden board seen from the front, its front a cream metre scale with
    // upright numbers, the wire along its top between two brass end posts, a black jockey on the wire with a red pointer to the
    // scale. Behind it: the 2 V driver cell, a plug key, a rheostat (bare copper close-wound on a tube between iron end plates,
    // its slider on a square rod), the reference cell in a varnished wooden box (white label, brass terminals), the unknown
    // cell in a black case, a two-way key. In front, right: the zero-centre galvanometer.
    const POTB = { mm: 0.78, x0: 40, W: 860, gx: 930, gy: 34, gs: 1.3 };
    // a point of the bridge: on the scale's top edge (depth < 80), on the wire (80 … 119), on the board's top (120 … 149),
    // on the jockey's top (≥ 150)
    const potAt = (cm, depth) => {
      const x = POTB.x0 + cm * 10 * POTB.mm;
      return depth >= 150 ? [x + 5, -152] : depth >= 120 ? [x + 5, -128] : depth >= 80 ? [x + 3, -118] : [x, -100];
    };
    // a brass binding post standing on a surface at (x, y): hex base, column, knurled cap, a coloured collar
    function bpost(x, y, collar) {
      return `<ellipse cx="${x}" cy="${y + 1}" rx="10" ry="3.5" fill="#000" opacity="0.4"/><path d="M${x - 9},${y} V${y - 6} H${x + 9} V${y} Z" fill="url(#${P}brassH)"/>`
        + `<rect x="${x - 5.5}" y="${y - 22}" width="11" height="16" fill="url(#${P}brassH)"/>`
        + (collar ? `<rect x="${x - 7}" y="${y - 16}" width="14" height="5" rx="1.5" fill="${collar}"/>` : '')
        + `<rect x="${x - 8}" y="${y - 30}" width="16" height="9" rx="2" fill="url(#${P}brassH)"/><path d="M${x - 6},${y - 30} v9 M${x - 2},${y - 30} v9 M${x + 2},${y - 30} v9 M${x + 6},${y - 30} v9" stroke="#6B4E18" stroke-width="0.8"/>`
        + `<ellipse cx="${x}" cy="${y - 30}" rx="8" ry="2.6" fill="#F6DE92"/>`;
    }
    // the jockey: a black block resting on the wire at jw, its knife edge, a red pointer down to the scale at jp. lift 0 … 1:
    // raised off the wire (JLIFT px at 1: no contact), its shadow left on the board, wider and fainter
    const JLIFT = 11;
    function jockey(jw, jp, lift = 0) {
      const dy = -JLIFT * lift, j = [jw[0], jw[1] + dy], q = [jp[0], jp[1] + dy];
      return `<ellipse cx="${jw[0] + 4}" cy="${jw[1] + 6}" rx="${(20 + 6 * lift).toFixed(1)}" ry="4" fill="#000" opacity="${(0.4 - 0.18 * lift).toFixed(2)}" filter="url(#${P}blur2)"/>`
        + `<path d="M${j[0] - 16},${j[1] - 6} L${j[0] - 12},${j[1] - 36} H${j[0] + 12} L${j[0] + 16},${j[1] - 6} Z" fill="#1D2025" stroke="#0A0B0D"/><rect x="${j[0] - 12}" y="${j[1] - 36}" width="24" height="5" rx="2" fill="#FFFFFF" opacity="0.14"/>`
        + `<path d="M${j[0] - 3},${j[1] - 6} L${j[0]},${j[1]} L${j[0] + 3},${j[1] - 6} Z" fill="url(#${P}brassV)"/>`
        + `<path d="M${j[0]},${j[1] - 2} L${q[0]},${q[1] + 6}" stroke="#D12A2A" stroke-width="2"/><path d="M${q[0] - 4},${q[1] - 1} L${q[0]},${q[1] + 8} L${q[0] + 4},${q[1] - 1} Z" fill="#D12A2A"/>`;
    }
    // the rheostat's slider at f (0 … 1 along the winding, in the rheostat's own space): a block round the square rod, its
    // brass contact pressed on the turns, a knob to push it by
    const rheoSlider = f => `<g transform="translate(${(26 + 230 * f).toFixed(2)} 0)"><rect x="-14" y="-146" width="28" height="22" rx="3" fill="#1D2025"/><rect x="-12" y="-145" width="24" height="5" rx="2" fill="#FFFFFF" opacity="0.12"/><path d="M-4,-124 v12 h8 v-12" fill="url(#${P}brassV)"/><rect x="-6" y="-160" width="12" height="14" rx="3" fill="#15181C"/></g>`;
    // the two-way key's plug: s 0 in X's gap (the unknown), 1 in S's (the reference); between, lifted out and carried across
    const keyPlug = s => { const x = 67 + (35.5 - 67) * s, y = -24 * Math.sin(Math.PI * Math.max(0, Math.min(1, s)));
      return `<g transform="translate(${x.toFixed(2)} ${y.toFixed(2)})"><path d="M-6,-62 h12 l-2,30 h-8 Z" fill="url(#${P}brassH)"/><rect x="-10" y="-70" width="20" height="10" rx="3" fill="#15181C"/></g>`; };
    function potentiometer(o) {
      const { W } = POTB, cm = o.cm, E = o.E, at = potAt, g = [], back = [];
      const by = -150;                                            // the back row's floor line, just behind the board
      const X = { drv: 0, key1: 128, rheo: 222, ref: 528, unk: 700, key2: 826 };
      // the driver: a 2 V lead-acid cell in a clear case, its plates seen through it, terminals on its lid
      back.push(`<g transform="translate(${X.drv} ${by})">${shadow(55, 130, 0.45)}<rect x="0" y="-150" width="110" height="150" rx="6" fill="url(#${P}glassCase)" stroke="#CFEFFF" stroke-opacity="0.5" stroke-width="1.4"/>`
        + `<rect x="5" y="-128" width="100" height="123" fill="url(#${P}acid)"/>`
        + [0, 1, 2, 3, 4, 5, 6].map(i => `<rect x="${10 + i * 13.5}" y="-136" width="8" height="126" fill="${i % 2 ? '#5A3A2A' : '#5A5E62'}" opacity="0.85"/>`).join('')
        + `<rect x="-3" y="-160" width="116" height="14" rx="3" fill="#2A2F36"/>${bpost(25, -160, '#C8262B')}${bpost(85, -160, '#1D2024')}`
        + text(55, -64, '2 V', 18, '#FFFFFF', 'middle', 700, false, 'opacity="0.85"') + `</g>`);
      // the plug key (brass blocks on ebonite, the plug in: closed)
      back.push(`<g transform="translate(${X.key1} ${by})">${shadow(40, 90, 0.4)}<rect x="0" y="-20" width="80" height="20" rx="3" fill="url(#${P}bakelite)"/><rect x="6" y="-34" width="30" height="14" fill="url(#${P}brassV)"/><rect x="44" y="-34" width="30" height="14" fill="url(#${P}brassV)"/>`
        + `<path d="M34,-62 h12 l-2,30 h-8 Z" fill="url(#${P}brassH)"/><rect x="30" y="-70" width="20" height="10" rx="3" fill="#15181C"/><circle cx="14" cy="-40" r="5" fill="url(#${P}brassV)"/><circle cx="66" cy="-40" r="5" fill="url(#${P}brassV)"/></g>`);
      // the rheostat: iron end plates on feet, a tube close-wound with bare copper (its turns catching the light), the slider
      // on a square rod above, a terminal on each end plate
      const turns = [];
      for (let x = 30; x < 260; x += 3.2) turns.push(`M${x.toFixed(1)},-110 l1.2,60`);
      back.push(`<g transform="translate(${X.rheo} ${by})">${shadow(140, 300, 0.5)}`
        + `<path d="M0,0 V-118 Q0,-126 8,-126 H18 Q26,-126 26,-118 V0 Z" fill="#2A2F36" stroke="#15181C"/><path d="M256,0 V-118 Q256,-126 264,-126 H274 Q282,-126 282,-118 V0 Z" fill="#2A2F36" stroke="#15181C"/>`
        + `<rect x="-4" y="-6" width="34" height="6" rx="2" fill="#15181C"/><rect x="252" y="-6" width="34" height="6" rx="2" fill="#15181C"/>`
        + `<rect x="26" y="-112" width="230" height="64" rx="6" fill="url(#${P}copperV)"/><path d="${turns.join(' ')}" stroke="#5A2810" stroke-width="1" opacity="0.55"/>`
        + `<rect x="26" y="-104" width="230" height="7" fill="#FFE0C0" opacity="0.45"/><rect x="26" y="-112" width="230" height="64" rx="6" fill="url(#${P}cyl)" opacity="0.55"/>`
        + `<rect x="10" y="-138" width="262" height="8" rx="1.5" fill="url(#${P}steelBlock)"/>`
        + (o.live ? '' : rheoSlider(o.rheo != null ? o.rheo : POT.f0))
        // the winding's ends come out to a screw terminal low on each end plate; the rod's own terminals sit on top
        + [13, 269].map(x => `<circle cx="${x}" cy="-30" r="7.5" fill="url(#${P}brassV)" stroke="#5A4416" stroke-width="0.8"/><circle cx="${x}" cy="-30" r="4.2" fill="url(#${P}brassH)"/><path d="M${x - 3},-30 h6" stroke="#5A4416" stroke-width="1.1"/>`).join('')
        + `${bpost(13, -126, null)}${bpost(269, -126, null)}</g>`);
      // the reference cell: a varnished wooden box with a lid, a white label, brass terminals on its lid
      back.push(`<g transform="translate(${X.ref} ${by})">${shadow(75, 165, 0.5)}`
        + `<path d="M150,-118 l12,-10 V-10 L150,0 Z" fill="#3E220C"/><path d="M-4,-128 L8,-138 H166 L154,-128 Z" fill="#B57A40"/>`
        + `<rect x="0" y="-118" width="150" height="118" fill="url(#${P}woodBox)"/><rect x="-4" y="-130" width="158" height="14" rx="2" fill="url(#${P}woodLid)"/>`
        + [0, 1, 2, 3, 4, 5].map(i => `<path d="M0,${-112 + i * 19} C50,${-108 + i * 19} 100,${-114 + i * 19} 150,${-110 + i * 19}" fill="none" stroke="#3E220C" stroke-opacity="0.22" stroke-width="1.2"/>`).join('')
        + `<rect x="24" y="-100" width="102" height="56" rx="3" fill="#F7F3E8" stroke="#2A1608" stroke-width="1.2"/><rect x="28" y="-96" width="94" height="48" rx="2" fill="none" stroke="#2A1608" stroke-opacity="0.5"/>`
        + text(75, -77, 'REFERENCE', 13, '#15191C', 'middle', 700, false, 'letter-spacing="0.6"') + text(75, -61, 'CELL', 13, '#15191C', 'middle', 700) + text(75, -51, '1.0186 V at 20 °C', 7, '#3A2A16', 'middle', 600)
        + `${bpost(45, -133, '#C8262B')}${bpost(105, -133, '#1D2024')}</g>`);
      // the unknown cell: a black case, a small plate, brass terminals
      back.push(`<g transform="translate(${X.unk} ${by})">${shadow(55, 125, 0.5)}<path d="M110,-96 l10,-8 V-8 L110,0 Z" fill="#0A0B0D"/><path d="M0,-96 L10,-104 H120 L110,-96 Z" fill="#3A3F46"/>`
        + `<rect x="0" y="-96" width="110" height="96" rx="4" fill="url(#${P}bakelite)" stroke="#000"/>`
        + `<rect x="18" y="-74" width="74" height="34" rx="3" fill="url(#${P}steelBlock)"/>` + text(55, -58, 'UNKNOWN', 10, '#15191C', 'middle', 700, false, 'letter-spacing="0.8"') + text(55, -45, 'Eₓ', 11, '#15191C', 'middle', 700)
        + `${bpost(30, -100, '#C8262B')}${bpost(80, -100, '#1D2024')}</g>`);
      // the two-way key: brass blocks on a black base, the plug in the unknown's side
      back.push(`<g transform="translate(${X.key2} ${by})">${shadow(50, 110, 0.4)}<rect x="0" y="-20" width="104" height="20" rx="3" fill="url(#${P}bakelite)"/><rect x="6" y="-34" width="26" height="14" fill="url(#${P}brassV)"/><rect x="39" y="-34" width="26" height="14" fill="url(#${P}brassV)"/><rect x="72" y="-34" width="26" height="14" fill="url(#${P}brassV)"/>`
        + (o.live ? '' : keyPlug(o.key || 0)) + `${text(19, -4, 'S', 9, '#C9D1D9', 'middle', 700)}${text(85, -4, 'X', 9, '#C9D1D9', 'middle', 700)}</g>`);
      // the board, from the front: its top (varnished, seen a little from above), the cream scale on its front, the wooden lip
      const r0 = POTB.x0, r1 = POTB.x0 + 1000 * POTB.mm;
      g.push(`<ellipse cx="${W / 2}" cy="4" rx="${W / 2 + 30}" ry="9" fill="#000" opacity="0.6" filter="url(#${P}blur2)"/>`
        + `<path d="M0,-100 L10,-136 H${W + 10} L${W},-100 Z" fill="url(#${P}walnut)"/><path d="M${W},-100 L${W + 10},-136 V-36 L${W},0 Z" fill="#5A4020"/>`
        + `<rect x="0" y="-100" width="${W}" height="78" fill="url(#${P}beech)"/><line x1="0" y1="-100" x2="${W}" y2="-100" stroke="#FFF2D0" stroke-opacity="0.8"/>`
        + `<rect x="0" y="-22" width="${W}" height="22" fill="url(#${P}walnutFront)"/><line x1="0" y1="-22" x2="${W}" y2="-22" stroke="#C99A6A" stroke-opacity="0.5"/>`);
      for (let i = 0; i < 10; i++) g.push(`<path d="M${12 + i * 4},${(-104 - i * 3.2).toFixed(1)} H${W - 4 + i * 0.9}" stroke="#3E220C" stroke-opacity="0.2" stroke-width="${(0.8 + rnd(i, 95)).toFixed(1)}"/>`);
      const tk = [];
      for (let m = 0; m <= 1000; m++) { const x = r0 + m * POTB.mm, l = m % 100 === 0 ? 24 : m % 10 === 0 ? 14 : m % 5 === 0 ? 9 : 5; tk.push(`M${x.toFixed(2)},-100 v${l}`); }
      g.push(`<path d="${tk.join(' ')}" stroke="#1A140C" stroke-width="0.5"/>`);
      for (let c = 0; c <= 100; c += 10) g.push(text(r0 + c * 10 * POTB.mm, -40, String(c), 24, '#1A140C', 'middle', 700));
      g.push(text(r1 + 20, -40, 'cm', 13, '#1A140C', 'start', 700));
      // the brass strips at the ends, the wire between them, the binding posts
      g.push(`<path d="M8,-112 L14,-130 H34 L28,-112 Z" fill="url(#${P}brassH)"/><path d="M${W - 30},-112 L${W - 24},-130 H${W - 4} L${W - 10},-112 Z" fill="url(#${P}brassH)"/>`);
      const w0 = at(0, 96), w1 = at(100, 96);
      g.push(`<line x1="${w0[0] - 16}" y1="${w0[1]}" x2="${w1[0] + 16}" y2="${w1[1]}" stroke="#5A626D" stroke-width="2.4"/><line x1="${w0[0] - 16}" y1="${w0[1] - 0.6}" x2="${w1[0] + 16}" y2="${w1[1] - 0.6}" stroke="#F2F4F6" stroke-width="1"/>`);
      const tA = [20, -120], tB = [W - 18, -120];
      g.push(bpost(tA[0], tA[1], null) + bpost(tB[0], tB[1], null));
      // the jockey: a black block resting on the wire, its knife edge, a red pointer down to the scale
      const j0 = at(cm, 160), jw = at(cm, 96), jp = at(cm, 58);
      const jock = jockey(jw, jp);
      const jTop = [jw[0], jw[1] - 36];
      const jockAt = (c, lift) => jockey(at(c, 96), at(c, 58), lift);
      // the galvanometer: nearer the camera, standing on the bench right of the board
      const mv = o.moving || o.live, deflect = galvDiv(cm, E), G = galvanometer(deflect, { noNeedle: mv }), gx = POTB.gx, gy = POTB.gy, gs = POTB.gs;
      const gp = ([x, y]) => [gx + gs * x, gy + gs * y], gNeg = gp([G.posts[0][0], G.posts[0][1] - 10]), gPos = gp([G.posts[1][0], G.posts[1][1] - 10]);
      // the wiring (PVC, lying on the bench behind the board)
      const wire = (d, c) => `<path d="${d}" fill="none" stroke="#000" stroke-opacity="0.35" stroke-width="5" transform="translate(1 3)"/><path d="${d}" fill="none" stroke="${c}" stroke-width="3.6" stroke-linecap="round"/><path d="${d}" fill="none" stroke="#FFFFFF" stroke-opacity="0.25" stroke-width="1" transform="translate(-0.5 -1)"/>`;
      const T_ = (dx, dy) => [dx, by + dy];
      const dP = T_(X.drv + 25, -190), dN = T_(X.drv + 85, -190), k1a = T_(X.key1 + 14, -40), k1b = T_(X.key1 + 66, -40);
      const rhL = T_(X.rheo + 13, -30), rhR = T_(X.rheo + 269, -156), rfP = T_(X.ref + 45, -163), rfN = T_(X.ref + 105, -163);
      const ukP = T_(X.unk + 30, -130), ukN = T_(X.unk + 80, -130), kS = T_(X.key2 + 19, -40), kC = T_(X.key2 + 52, -40), kX = T_(X.key2 + 85, -40);
      const pA = [tA[0], tA[1] - 30], pB = [tB[0], tB[1] - 30];
      const R_ = '#C8262B', K_ = '#1D2024', Y_ = '#E0B81A';
      const W1 = [
        wire(`M${dP[0]},${dP[1]} C${dP[0]},${dP[1] - 40} ${k1a[0] - 20},${k1a[1] - 60} ${k1a[0]},${k1a[1]}`, R_),
        wire(`M${k1b[0]},${k1b[1]} C${k1b[0] + 14},${k1b[1] - 30} ${rhL[0] - 30},${rhL[1] - 4} ${rhL[0]},${rhL[1]}`, R_),
        wire(`M${dN[0]},${dN[1]} C${dN[0] + 30},${dN[1] - 90} ${pB[0] - 400},${by - 230} ${pB[0] - 40},${by - 130} S${pB[0]},${pB[1] - 40} ${pB[0]},${pB[1]}`, K_),
        wire(`M${rfP[0]},${rfP[1]} C${rfP[0] + 20},${rfP[1] - 40} ${ukP[0] - 20},${ukP[1] - 40} ${ukP[0]},${ukP[1]}`, R_),
        wire(`M${rfN[0]},${rfN[1]} C${rfN[0] + 40},${rfN[1] + 20} ${kS[0] - 40},${kS[1] - 70} ${kS[0]},${kS[1]}`, K_),
        wire(`M${ukN[0]},${ukN[1]} C${ukN[0] + 20},${ukN[1] - 30} ${kX[0] - 10},${kX[1] - 50} ${kX[0]},${kX[1]}`, K_),
      ].join('');
      // in front of the back row: the rheostat to A, A to the reference cell (they rise over the board's back edge)
      const W1b = [
        wire(`M${rhR[0]},${rhR[1]} C${rhR[0] + 30},${rhR[1] - 60} ${pA[0] + 120},${pA[1] - 140} ${pA[0]},${pA[1]}`, R_),
        wire(`M${pA[0]},${pA[1]} C${pA[0] + 60},${pA[1] - 200} ${rfP[0] - 120},${rfP[1] - 80} ${rfP[0]},${rfP[1]}`, R_),
      ].join('');
      // the galvanometer to the jockey: a flying lead, following the jockey along the wire
      const jLead = (c, lift = 0) => { const w = at(c, 96), t = [w[0], w[1] - 36 - JLIFT * lift]; return wire(`M${gNeg[0]},${gNeg[1]} C${gNeg[0] - 70},${gNeg[1] + 120} ${t[0] + 220},${t[1] - 6} ${t[0]},${t[1]}`, Y_); };
      const W2 = wire(`M${kC[0]},${kC[1]} C${kC[0] + 10},${kC[1] + 40} ${gPos[0] - 20},${gPos[1] - 80} ${gPos[0]},${gPos[1]}`, Y_) + (mv ? '' : jLead(cm));
      const galv = `<g transform="translate(${gx} ${gy}) scale(${gs})">${G.svg}</g>`;
      // o.moving: what moves, for the user of it to draw in a moving layer (the same space): the jockey and its lead at c cm
      // (lift 0 … 1 off the wire), the needle at div divisions; o.live also leaves out the rheostat's slider and the key's plug
      // (slider(f), plug(s)) for the presenter's hands. rheoAt(f) / keyAt: where a hand takes them (rig space)
      const moving = { jockey: (c, lift = 0) => jockAt(c, lift) + jLead(c, lift), needle: div => `<g transform="translate(${gx} ${gy}) scale(${gs})">${galvNeedle(div)}</g>`,
        slider: f => `<g transform="translate(${X.rheo} ${by})">${rheoSlider(f)}</g>`, plug: s => `<g transform="translate(${X.key2} ${by})">${keyPlug(s)}</g>` };
      const rheoAt = f => [X.rheo + 26 + 230 * f, by - 140], keyAt = [X.key2 + 52, by - 40];
      return { svg: back.join('') + W1 + g.join('') + W1b + (mv ? '' : jock) + galv + W2, deflect, at, galvTop: [gx + gs * 135, gy - gs * (G.h + 6)], X, by, moving, rheoAt, keyAt, gZero: [gx + gs * GALV.cx, gy + gs * GALV.cy] };
    }
    // the zero-centre galvanometer (local: bottom-left on the bench; 270 × 250), as the owner's reference shows it: a dark
    // moulded case, a large cream dial filling most of its face behind a chrome-edged window, −30 … 0 … 30 with a mirror strip
    // under the divisions, a red needle on a visible black pivot, the glass's glare, GALVANOMETER printed on the case below,
    // the zero-adjust screw, two terminals on top. div: the needle's divisions (± 32 at the stops)
    // the needle alone (the galvanometer's local space): red, from its pivot to the divisions, its shadow
    const GALV = { cx: (14 + 250) / 2, cy: -14, R: 172 };
    function galvNeedle(div) {
      const { cx, cy, R } = GALV, a = (Math.max(-32, Math.min(32, div)) / 30) * 31 * Math.PI / 180;
      const tx = cx + (R - 3) * Math.sin(a), ty = cy - (R - 3) * Math.cos(a), nx = Math.cos(a), ny = Math.sin(a);
      const nd = `M${(cx - 3.4 * nx).toFixed(1)},${(cy - 3.4 * ny).toFixed(1)} L${tx.toFixed(1)},${ty.toFixed(1)} L${(cx + 3.4 * nx).toFixed(1)},${(cy + 3.4 * ny).toFixed(1)} Z`;
      // clipped to the dial's window, as the needle in the case is (its pivot sits below the window)
      return `<clipPath id="${P}gneedle"><rect x="14" y="-232" width="236" height="170" rx="7"/></clipPath><g clip-path="url(#${P}gneedle)"><path d="${nd}" fill="#000" opacity="0.2" transform="translate(3 3)"/><path d="${nd}" fill="#D61F26"/></g>`;
    }
    function galvanometer(div, o = {}) {
      const W = 270, H = 250, g = [], wx0 = 14, wx1 = W - 20, wy0 = -H + 18, wy1 = -62, cx = (wx0 + wx1) / 2, cy = -14, R = 172;
      g.push(`<ellipse cx="${W / 2 + 6}" cy="4" rx="${W / 2 + 26}" ry="10" fill="#000" opacity="0.65" filter="url(#${P}kshadow)"/>`
        + `<rect x="16" y="-6" width="30" height="8" rx="3" fill="#0A0B0D"/><rect x="${W - 46}" y="-6" width="30" height="8" rx="3" fill="#0A0B0D"/>`);
      // the case: top and side faces, the front, a fine bevel
      g.push(`<path d="M6,${-H} L18,${-H - 14} H${W + 4} L${W - 6},${-H} Z" fill="#3A3F46"/><path d="M${W - 6},${-H} L${W + 4},${-H - 14} V-12 L${W - 6},0 Z" fill="#111317"/>`
        + `<rect x="0" y="${-H}" width="${W - 6}" height="${H}" rx="14" fill="url(#${P}dmmFace)" stroke="#000"/>`
        + `<rect x="5" y="${-H + 5}" width="${W - 16}" height="${H - 10}" rx="11" fill="none" stroke="#FFFFFF" stroke-opacity="0.08" stroke-width="2"/>`);
      // the window and the dial
      const id = `${P}gw${Math.round((div + 40) * 10)}`;
      g.push(`<rect x="${wx0 - 5}" y="${wy0 - 5}" width="${wx1 - wx0 + 10}" height="${wy1 - wy0 + 10}" rx="10" fill="url(#${P}steelBlock)"/>`
        + `<clipPath id="${id}"><rect x="${wx0}" y="${wy0}" width="${wx1 - wx0}" height="${wy1 - wy0}" rx="7"/></clipPath>`
        + `<rect x="${wx0}" y="${wy0}" width="${wx1 - wx0}" height="${wy1 - wy0}" rx="7" fill="url(#${P}galvDial)"/>`);
      const ang = d => (d / 30) * 31 * Math.PI / 180, P_ = (a, r) => [cx + r * Math.sin(a), cy - r * Math.cos(a)], tk = [], tkB = [];
      for (let d = -30; d <= 30; d++) {
        const a = ang(d), [x0, y0] = P_(a, R), [x1, y1] = P_(a, R - (d % 10 === 0 ? 24 : d % 5 === 0 ? 17 : 11));
        (d % 5 === 0 ? tkB : tk).push(`M${x0.toFixed(1)},${y0.toFixed(1)} L${x1.toFixed(1)},${y1.toFixed(1)}`);
      }
      const arc = r => { const [a0, b0] = P_(ang(-31), r), [a1, b1] = P_(ang(31), r); return `M${a0.toFixed(1)},${b0.toFixed(1)} A${r},${r} 0 0 1 ${a1.toFixed(1)},${b1.toFixed(1)}`; };
      g.push(`<g clip-path="url(#${id})"><path d="${arc(R)}" fill="none" stroke="#15191C" stroke-width="1.4"/><path d="${tk.join(' ')}" stroke="#15191C" stroke-width="1.3"/><path d="${tkB.join(' ')}" stroke="#15191C" stroke-width="2.4"/>`
        + `<path d="${arc(R - 34)}" fill="none" stroke="url(#${P}rod)" stroke-width="8"/>`);
      [-30, -20, -10, 0, 10, 20, 30].forEach(d => { const [x, y] = P_(ang(d), R + 17); g.push(text(x, y + 6, d < 0 ? `−${-d}` : String(d), d === 0 ? 20 : 17, '#15191C', 'middle', 700)); });
      g.push(text(cx - 62, wy1 - 34, 'µA', 15, '#3A414B', 'middle', 700) + text(wx0 + 28, wy1 - 12, '−', 20, '#15191C', 'middle', 700) + text(wx1 - 28, wy1 - 12, '+', 20, '#15191C', 'middle', 700));
      // the needle: red, from its pivot to the divisions; the pivot's black cap
      const a = ang(Math.max(-32, Math.min(32, div))), [tx, ty] = P_(a, R - 3), nx = Math.cos(a), ny = Math.sin(a);
      const nd = `M${(cx - 3.4 * nx).toFixed(1)},${(cy - 3.4 * ny).toFixed(1)} L${tx.toFixed(1)},${ty.toFixed(1)} L${(cx + 3.4 * nx).toFixed(1)},${(cy + 3.4 * ny).toFixed(1)} Z`;
      g.push((o.noNeedle ? '' : `<path d="${nd}" fill="#000" opacity="0.2" transform="translate(3 3)"/><path d="${nd}" fill="#D61F26"/>`) + `</g>`);
      // the glass's glare, the window's inner shadow
      g.push(`<path d="M${wx0 + 4},${wy0 + 4} H${wx0 + 96} L${wx0 + 44},${wy1 - 4} H${wx0 + 4} Z" fill="#FFFFFF" opacity="0.08"/><rect x="${wx0}" y="${wy0}" width="${wx1 - wx0}" height="${wy1 - wy0}" rx="7" fill="none" stroke="#000" stroke-opacity="0.35" stroke-width="3"/>`);
      // the name on the case, the zero-adjust screw, the terminals on top
      g.push(text(cx, -32, 'GALVANOMETER', 15, '#E6EDF5', 'middle', 700, false, 'letter-spacing="1.4"')
        + `<circle cx="${cx}" cy="-12" r="5" fill="url(#${P}chromeR)" stroke="#3B424C"/><line x1="${cx - 3}" y1="-12" x2="${cx + 3}" y2="-12" stroke="#3B424C" stroke-width="1.2"/>`);
      const posts = [[70, -H - 6], [W - 76, -H - 6]];
      g.push(post(...posts[0], 'Black', 11) + post(...posts[1], 'Red', 11) + text(posts[0][0] - 22, -H - 2, '−', 14, '#C9D1D9', 'middle', 700) + text(posts[1][0] + 22, -H - 2, '+', 14, '#FF8A80', 'middle', 700));
      return { svg: g.join(''), h: H, posts };
    }

    // ───────────── panels (stage space) ─────────────
    // text fitted to a width (canvas-measured, so long French lines shrink to fit)
    const CTX = typeof document !== 'undefined' ? document.createElement('canvas').getContext('2d') : null;
    const fitW = (s, size, weight) => { if (!CTX) return s.length * size * 0.55; CTX.font = `${weight} ${size}px 'IBM Plex Sans','Segoe UI',system-ui,sans-serif`; return CTX.measureText(s).width; };
    const fit = (s, size, weight, max) => { if (!CTX) return size; CTX.font = `${weight} ${size}px 'IBM Plex Sans','Segoe UI',system-ui,sans-serif`; const w = CTX.measureText(s).width; return w > max ? +(size * max / w).toFixed(1) : size; };
    // each kind's mark (local, centred, ~30 px): a trace (direct), bars (indirect: a calculation), a balance (null)
    const KIND_ICON = {
      ruler: c => `<rect x="-9" y="-15" width="18" height="30" rx="3" fill="none" stroke="${c}" stroke-width="2.4"/><path d="M-9,-9 h6 M-9,-3 h4 M-9,3 h6 M-9,9 h4" stroke="${c}" stroke-width="2"/>`,
      direct: c => `<path d="M-15,2 h7 l4,-11 l6,21 l5,-15 l3,5 h9" fill="none" stroke="${c}" stroke-width="3" stroke-linejoin="round" stroke-linecap="round"/>`,
      indirect: c => `<rect x="-13" y="2" width="7" height="11" rx="1.5" fill="${c}"/><rect x="-3.5" y="-6" width="7" height="19" rx="1.5" fill="${c}"/><rect x="6" y="-13" width="7" height="26" rx="1.5" fill="${c}"/>`,
      null: c => `<path d="M0,-13 V12 M-9,13 H9 M-15,-7 H15" stroke="${c}" stroke-width="2.6" stroke-linecap="round" fill="none"/><circle cx="0" cy="-14" r="2.6" fill="${c}"/>`
        + `<path d="M-15,-7 L-21,4 H-9 Z M15,-7 L9,4 H21 Z" fill="none" stroke="${c}" stroke-width="2" stroke-linejoin="round"/><path d="M-21,4 Q-15,9 -9,4 M9,4 Q15,9 21,4" fill="${c}" stroke="${c}" stroke-width="1.6"/>`,
    };
    // a two-line label with a leader (owner's reference): the part's name bold, what it is set to under it
    function label2(px, py, ax, ay, t1, t2, col = '#38D9FF', subCol = '#E6EDF5') {
      const w = Math.max(fitW(t1, 17, 700), fitW(t2, 15, 500)) + 44, h = 54;
      return `<line x1="${px}" y1="${py + h / 2}" x2="${ax}" y2="${ay}" stroke="${col}" stroke-opacity="0.8" stroke-width="1.6"/><circle cx="${ax}" cy="${ay}" r="4.5" fill="${col}" filter="${u('soft')}"/>`
        + `<rect x="${px - w / 2}" y="${py - h / 2}" width="${w}" height="${h}" rx="12" fill="#07111A" fill-opacity="0.94" stroke="${col}" stroke-width="1.8" filter="${u('soft')}"/>`
        + text(px, py - 4, t1, 17, '#FFFFFF', 'middle', 700) + text(px, py + 17, t2, 15, subCol, 'middle', 500);
    }
    // a part's labels button (owner, 2026-10-09: "the parts label button should be on the part not the bench"): small, round,
    // icon only, quiet (a thin ring, the icon in muted ink; lit teal while on), an HTML button over the scene in stage space,
    // sitting on the part it names. o: { x, y, onClick }; returns { el, place(x, y), set(on, title) }
    function partButton(root, o) {
      partButtonCss();
      const b = document.createElement('button');
      b.type = 'button'; b.className = 'dk-partbtn'; b.innerHTML = `<svg viewBox="0 0 24 24" aria-hidden="true">${ICONS.labels}</svg>`;
      b.addEventListener('pointerdown', ev => ev.stopPropagation());
      b.addEventListener('keydown', ev => ev.stopPropagation());                       // its own Space/Enter, not the bench's
      b.addEventListener('click', ev => { ev.stopPropagation(); o.onClick(); if (ev.detail) b.blur(); });   // a mouse click hands the keys back
      root.appendChild(b);
      const api = {
        el: b,
        place(x, y) { b.style.left = (x - 18).toFixed(1) + 'px'; b.style.top = (y - 18).toFixed(1) + 'px'; return api; },
        set(on, title) { b.classList.toggle('on', !!on); b.setAttribute('aria-pressed', on ? 'true' : 'false'); b.title = title; b.setAttribute('aria-label', title); return api; },
      };
      return api.place(o.x, o.y);
    }
    // a callout for a part (the labels a library shows on its labels button): the part's name bold, what it does under it, a
    // leader from the box's nearest edge (its side when the part is off to the side, else its top or bottom) to a dot on the
    // part; kept on the stage
    function callout(px, py, ax, ay, t1, t2, col = '#38D9FF') {
      const w = Math.max(fitW(t1, 18, 700), fitW(t2, 15.5, 500)) + 44, h = 56;
      px = clamp(px, 12 + w / 2, 1908 - w / 2);
      const side = Math.abs(ax - px) > w / 2 + 24, lx = side ? px + Math.sign(ax - px) * w / 2 : px, ly = side ? py : py + Math.sign(ay - py) * h / 2;
      return `<line x1="${lx}" y1="${ly}" x2="${ax}" y2="${ay}" stroke="${col}" stroke-opacity="0.85" stroke-width="1.6"/><circle cx="${ax}" cy="${ay}" r="4.5" fill="${col}" filter="${u('soft')}"/>`
        + `<rect x="${px - w / 2}" y="${py - h / 2}" width="${w}" height="${h}" rx="12" fill="#07111A" fill-opacity="0.95" stroke="${col}" stroke-width="1.8"/>`
        + text(px, py - 4, t1, 18, '#FFFFFF', 'middle', 700) + text(px, py + 18, t2, 15.5, '#E6EDF5', 'middle', 500);
    }
    // a reading panel: a heading (the kind, in its colour, its mark before it), lines of text, the number large
    // h 'auto': as tall as its rows (panel.last.bottom then says where it ends); o.titleSize: a plain heading's size
    function panel(x0, y0, w, h, col, title, rows, icon, o = {}) {
      const g = ['',
        icon === 'ask' ? `<circle cx="${x0 + 46}" cy="${y0 + 40}" r="23" fill="${col}" fill-opacity="0.08" stroke="${col}" stroke-width="2.4"/>` + text(x0 + 46, y0 + 51, '?', 30, col, 'middle', 700)
          + text(x0 + 86, y0 + 52, title, 30, col, 'start', 700, false, 'letter-spacing="1.4"') :
        icon ? `<rect x="${x0 + 22}" y="${y0 + 16}" width="48" height="48" rx="11" fill="${col}" fill-opacity="0.15" stroke="${col}" stroke-opacity="0.55" stroke-width="1.4"/><g transform="translate(${x0 + 46} ${y0 + 40})">${KIND_ICON[icon](col)}</g>`
          + text(x0 + 86, y0 + 52, title, 30, col, 'start', 700, false, 'letter-spacing="1.4"') : text(x0 + 24, y0 + 40, title, o.titleSize || 18, col, 'start', 700, false, 'letter-spacing="1.6"')];
      let y = y0 + (icon ? 66 : 40);
      // (a row with an id is wrapped in a group of that id, so a motion can bring one sentence in at a time: card 8)
      rows.forEach(r => { const n0 = g.length; row(r); if (r.id) g.splice(n0, g.length - n0, `<g id="${r.id}">${g.slice(n0).join('')}</g>`); });
      function row(r) {
        y += r.gap || 34;
        if (r.rule) {
          g.push(`<line x1="${x0 + 24}" y1="${y - 14}" x2="${x0 + w - 24}" y2="${y - 14}" stroke="${col}" stroke-opacity="0.3"/>`);
          // a rule that is also a little track (the wire, 0 … 1): a dot where the jockey is
          if (r.dot != null) { const dx = x0 + 24 + clamp(r.dot) * (w - 48); g.push(`<line x1="${x0 + 24}" y1="${y - 14}" x2="${dx}" y2="${y - 14}" stroke="${col}" stroke-opacity="0.75" stroke-width="2"/><circle cx="${dx}" cy="${y - 14}" r="5" fill="${r.dotCol || '#38D9FF'}" filter="${u('soft')}"/>`); }
          return;
        }
        if (r.wrap) {   // a sentence wrapped to the panel's width
          const sz = r.size || 17, words = r.s.split(/[ \t\n]+/), lines = [];   // (a no-break space keeps French ? : ; with their word)
          let line = '';
          for (const wd of words) { const t = line ? line + ' ' + wd : wd; if (line && fitW(t, sz, r.w || 500) > w - 48) { lines.push(line); line = wd; } else line = t; }
          if (line) lines.push(line);
          lines.forEach((l, i) => { if (i) y += Math.round(sz * 1.35); g.push(text(x0 + 24, y, l, sz, r.col || '#E6EDF5', 'start', r.w || 500)); });
          return;
        }
        const t = text(x0 + 24, y, r.s, fit(r.s, r.size || 17, r.w || 500, w - 48), r.col || '#E6EDF5', 'start', r.w || 500, false, r.glow ? `filter="${u('soft')}"` : '');
        g.push(r.sub ? subscripts(t) : t);
      }
      if (h === 'auto') h = y - y0 + (o.pad || 24);
      g[0] = `<rect x="${x0}" y="${y0}" width="${w}" height="${h}" rx="18" fill="#07151A" fill-opacity="0.95" stroke="${col}" stroke-width="2" filter="${u('soft')}"/>`;
      panel.last = { bottom: y0 + h };
      return g.join('');
    }
    // a symbol's subscript written T_in (T_shell, T_int …) set as one: T with "in" lowered and smaller (dy in px from the
    // text's size, the rest of the line raised back with it)
    function subscripts(t) {
      const size = +(/font-size="([\d.]+)"/.exec(t) || [0, 17])[1], d = (size * 0.24).toFixed(1), fs = (size * 0.6).toFixed(1);
      return t.replace(/>([^<]*)</g, (m, s) => { let n = 0; const o = s.replace(/([A-Za-z])_([A-Za-zÀ-ÿ]+)/g, (q, a, b) => (n++, `${a}<tspan dy="${d}" font-size="${fs}">${b}</tspan><tspan dy="-${d}">`)); return '>' + o + '</tspan>'.repeat(n) + '<'; });
    }

    // ───────────── the stage's frame (stage space): the three kinds, the question, a frame round the scene ─────────────
    const KIND_COL = { direct: '#2EE6C5', indirect: '#FFC24D', null: '#B48CFF' };
    // three pills, the active kind lit; names: {direct, indirect, null}; sub: the line under them
    function kindStrip(active, names, sub, cx = 960, y = 112) {
      const W = 236, H = 54, gap = 30, g = [];
      ['direct', 'indirect', 'null'].forEach((k, i) => {
        const c = KIND_COL[k], on = k === active, x = cx + (i - 1) * (W + gap) - W / 2;
        if (on) g.push(`<rect x="${x - 6}" y="${y - H / 2 - 6}" width="${W + 12}" height="${H + 12}" rx="${H / 2 + 6}" fill="${c}" opacity="0.22" filter="url(#${P}lbig)"/>`);
        g.push(`<rect x="${x}" y="${y - H / 2}" width="${W}" height="${H}" rx="${H / 2}" fill="#06101A"/>`);   // the room's lamps don't show through
        g.push(`<rect x="${x}" y="${y - H / 2}" width="${W}" height="${H}" rx="${H / 2}" fill="${c}" fill-opacity="${on ? 0.2 : 0.07}" stroke="${c}" stroke-opacity="${on ? 1 : 0.7}" stroke-width="${on ? 3 : 2.2}" ${on ? `filter="${u('soft')}"` : ''}/>`
          + text(x + W / 2, y + 9, names[k], fit(names[k], 25, 700, W - 30), on ? mixCol(c, '#FFFFFF', 0.15) : c, 'middle', 700, false, `letter-spacing="2" opacity="${on ? 1 : 0.85}"`));
      });
      if (sub) g.push(text(cx, y + H / 2 + 32, sub, 19, '#E6EDF5', 'middle', 500));
      return g.join('');
    }
    // a frame round the scene, a little darker than the room
    const stageFrame = (x0, y0, x1, y1) => `<rect x="${x0}" y="${y0}" width="${x1 - x0}" height="${y1 - y0}" rx="24" fill="#050C14" fill-opacity="0.32" stroke="#2C4458" stroke-opacity="0.85" stroke-width="1.6"/>`
      + `<path d="M${x0 + 24},${y0 + 1} H${x1 - 24}" stroke="#7FA8C8" stroke-opacity="0.18" stroke-width="1.2"/>`;
    // the question at the frame's top left: a ringed "?", the question in the kind's colour, the statement under it
    const askHead = (x, y, q, s, col = '#38D9FF') => `<circle cx="${x}" cy="${y}" r="27" fill="#07111A" fill-opacity="0.6" stroke="#D5DEE8" stroke-width="2.4"/>`
      + text(x, y + 11, '?', 32, '#E6EDF5', 'middle', 600) + text(x + 48, y - 6, q, 23, col, 'start', 700, false, 'letter-spacing="1.2"')
      + text(x + 48, y + 26, s, 24, '#FFFFFF', 'start', 500);

    return { DEFS, lab, tagPill, tagPill2, shadow, knob, post, lead, croc, hookClip, supply, PSU, dmm, DMM, breadboard, bbAt, jumper, flyWire, axialResistor, powerResistor, lamp, BB, R_DIRECT,
      RIG, rigElectric, ruleRig, magnifier, zoomBubble, furnace, FUR, thermometer, controller, wallSection, kindStrip, stageFrame, askHead, KIND_COL, glowCol, mixCol, armPhoto, ARMP, bpTrace, bpTraceLive, arteryInset, gaugeNeedle, cuffBulb, potentiometer, POTB, galvanometer, panel, label2, KIND_ICON, fit, lcdWidth, LAYOUT,
      series, dmm20, R_KNOWN, LAMP, FURN, shellOf, insideOf, BP, cuffAt, POT, nullCm, galvDiv, seg7, lcd7, led7, callout, partButton, ICONS, dmmReading, galvNeedle, jockey, supplyFace, rodOf, lampLit, lampFlash, circuitAt };
  };

  // ───────────── a unit's behaviour on the bench (each of card 3's units registers through this) ─────────────
  // cfg: { id, stops, scene(stop, t, bench) → { html, tl }, controls(stop) → [{ param, kind: 'rot' | 'slide', x, y, r, w?, h?,
  // min, max, step, x0, x1, wheel?, tip }] (controls built into the hardware: a knob turned, a jockey or a rod slid),
  // watch: [params], settleOnArrival, liveControls, onHand(param) }
  // onHand: called when the presenter takes hold of a control (pressed, or its wheel turned), before it changes anything: a
  // unit whose motion drives a part the presenter also moves (an eye glided, a probe lifted) gives way to the hand from then
  // liveControls: the controls are placed again every frame (a part the unit moves by itself, e.g. a jockey in a demo, keeps
  // its handle under it)
  // A 'slide' given y0, y1 (and no x0, x1) runs up and down instead: y0 its minimum, y1 its maximum (e.g. a column of oil
  // pushed up for more pressure: y1 above y0).
  // Two more kinds: 'tap' { x, y, w, h, onTap, tip } (a part pressed, e.g. a bulb squeezed: onTap is called on each press, no
  // setting changes), and 'button' { param, value, icon, x, y, tip, toggle?, on?, onClick? } (a small icon-only button on a part:
  // sets param = value; toggle: the quiet round look, lit while on; onClick runs first, inside the click)
  // A control moves with the hand from where it is (no jump on grabbing): a knob turns as far as the hand turns it round
  // its centre (its full 270° sweep is its range), a slider by the hand's travel (x0 … x1 its range); Shift makes it a tenth
  // as fast (fine); the wheel steps it (c.wheel, default 1/300 of the range; Shift a tenth of that).
  // Arrival (owner, 2026-10-09, a standing rule for every library): a stop reached by Next, Previous, Reset or a load shows
  // its FIRST frame (the bench holds its clock at 0) and Play runs it; the settled view (time 99) is only for reduced motion
  // and for captures (__bench.at(key, 99)). (settleOnArrival, card 3's earlier "Next jumps to the settled view", is retired:
  // it gave the ending away before Play; the flag is accepted and ignored.)
  window.DINKIT.run = function (cfg) {
    let root = null, bench = null, host = null, els = [], drawn = '', tl = null, live = true;
    const T = () => (bench.state.reduced || !live ? 99 : bench.state.t);
    const tick = () => { const s = bench.state; if (tl) tl.tick(T(), s.reduced ? 0 : s.t); };
    const v = k => { try { return bench.value(k); } catch (e) { return undefined; } };
    function render(force) {
      const s = bench.state, ph = cfg.phase ? cfg.phase(s.i, T()) : '';
      const key = `${s.i}|${ph}|${(cfg.watch || []).map(v).join(',')}|${bench.lang()}|${s.cards}`;
      if (!force && key === drawn) return;
      drawn = key;
      const out = cfg.scene(s.i, T(), bench);
      host.innerHTML = out.html; tl = out.tl;
      tl.bind(host); tick(); place();
    }
    let btns = [];
    function place() {
      const all = cfg.controls ? (cfg.controls(bench.state.i) || []) : [], cs = all.filter(c => c.kind !== 'button');
      els.forEach(e => { e.style.display = 'none'; });
      btns.forEach(e => { e.style.display = 'none'; });
      all.filter(c => c.kind === 'button').forEach((c, i) => {
        let e = btns[i];
        if (!e) {
          partButtonCss();
          e = document.createElement('button'); e.type = 'button'; e.className = 'dk-partbtn act';
          e.addEventListener('pointerdown', ev => ev.stopPropagation());
          e.addEventListener('keydown', ev => ev.stopPropagation());
          e.addEventListener('click', ev => { ev.stopPropagation(); const c2 = e._c; if (c2.onClick) c2.onClick(); bench.setValue(c2.param, c2.value); render(); place(); tick(); if (ev.detail) e.blur(); });
          root.appendChild(e); btns.push(e);
        }
        e._c = c;
        e.className = c.toggle ? 'dk-partbtn' + (c.on ? ' on' : '') : 'dk-partbtn act';
        if (c.toggle) e.setAttribute('aria-pressed', c.on ? 'true' : 'false'); else e.removeAttribute('aria-pressed');
        if (e._icon !== c.icon) { e.innerHTML = `<svg viewBox="0 0 24 24" aria-hidden="true">${ICONS[c.icon] || ''}</svg>`; e._icon = c.icon; }
        const tip = c.tip ? bench.text(c.tip) : ''; e.title = tip; e.setAttribute('aria-label', tip);
        Object.assign(e.style, { display: '', left: (c.x - 17).toFixed(1) + 'px', top: (c.y - 17).toFixed(1) + 'px' });
      });
      cs.forEach((c, i) => {
        let e = els[i];
        if (!e) {
          e = document.createElement('div'); e.className = 'dk-ctl';
          e.addEventListener('pointerdown', ev => {
            ev.preventDefault();
            if (cfg.onHand) cfg.onHand(e._c.param);   // the presenter's hand on a part (a unit's motion then gives way to it)
            if (e._c.kind === 'press') { bench.setValue(e._c.param, e._c.value); render(); place(); tick(); return; }   // clicked: set
            if (e._c.kind === 'tap') { if (e._c.onTap) e._c.onTap(); tick(); return; }                                   // pressed: told
            try { e.setPointerCapture(ev.pointerId); } catch (x) { /* a synthetic pointer */ } e._at = pos(e, ev);
            if (window.PSUKIT && window.PSUKIT.touch) window.PSUKIT.touch(e._c.param, 'down');   // (a supply's limit shows while set)
          });
          e.addEventListener('pointermove', ev => { if (e._at != null) drag(e, ev); });
          e.addEventListener('pointerup', () => { if (e._at != null && window.PSUKIT && window.PSUKIT.touch) window.PSUKIT.touch(e._c.param, 'up'); e._at = null; });
          e.addEventListener('wheel', ev => wheel(e, ev), { passive: false });
          root.appendChild(e); els.push(e);
        }
        e._c = c; e.title = c.tip ? bench.text(c.tip) : '';
        const w = c.w || 2 * c.r, h = c.h || 2 * c.r;
        Object.assign(e.style, { display: '', left: (c.x - w / 2).toFixed(1) + 'px', top: (c.y - h / 2).toFixed(1) + 'px', width: w.toFixed(1) + 'px', height: h.toFixed(1) + 'px', borderRadius: c.kind === 'slide' ? '10px' : '50%', cursor: c.kind === 'slide' ? (c.y0 != null && c.x0 == null ? 'ns-resize' : 'ew-resize') : c.kind === 'press' || c.kind === 'tap' ? 'pointer' : 'grab' });
      });
    }
    // where the hand is: round a knob's centre (degrees), or along the stage (stage px)
    function pos(e, ev) {
      if (e._c.kind === 'slide') { const st = root.getBoundingClientRect();
        return e._c.y0 != null && e._c.x0 == null ? (ev.clientY - st.top) * 1080 / st.height : (ev.clientX - st.left) * 1920 / st.width; }
      const r = e.getBoundingClientRect();
      return Math.atan2(ev.clientX - (r.left + r.width / 2), (r.top + r.height / 2) - ev.clientY) * 180 / Math.PI;
    }
    function nudge(c, dv) {
      let val = Math.max(c.min, Math.min(c.max, v(c.param) + dv));
      if (c.step) val = Math.round(val / c.step) * c.step;
      bench.setValue(c.param, +val.toFixed(4));
      render(); place(); tick();   // a slid part's handle goes with it
    }
    function drag(e, ev) {
      const c = e._c, p = pos(e, ev);
      let d = p - e._at;
      if (c.kind !== 'slide') { if (d > 180) d -= 360; if (d < -180) d += 360; }
      e._at = p;
      const span = c.kind === 'slide' ? (c.y0 != null && c.x0 == null ? c.y1 - c.y0 : c.x1 - c.x0) : 270;
      nudge(c, d / span * (c.max - c.min) * (ev.shiftKey ? 0.1 : 1));
    }
    function wheel(e, ev) {
      const c = e._c, step = c.wheel || (c.max - c.min) / 300;
      ev.preventDefault();
      if (c.kind === 'press' || c.kind === 'tap') return;
      if (cfg.onHand) cfg.onHand(c.param);
      if (window.PSUKIT && window.PSUKIT.touch) window.PSUKIT.touch(c.param, 'wheel');
      nudge(c, (ev.deltaY < 0 ? 1 : -1) * step * (ev.shiftKey ? 0.1 : 1));
    }
    AnimationBench.register({
      id: cfg.id, stops: cfg.stops, sections: [['@section', 0, cfg.stops.length - 1]],
      mount(stage, b) {
        bench = b;
        root = document.createElement('div'); root.className = 'dk-root';
        host = document.createElement('div'); host.className = 'dk-svg';
        root.append(host); stage.appendChild(root);
        render(true);
      },
      enterStop() { render(true); },
      frame() { render(); tick(); if (cfg.liveControls) place(); },
      settle() { render(true); },
      relabel() { render(true); },
      onValue() { render(true); },
      reset() { render(true); },
      unmount() { if (root) root.remove(); },
    });
  };
})();
