// The specification kit: what D1·020 card 8's units share ("Reading a meter's specification"), and the Figure card after it.
// The course's handheld multimeter (cards 3–5: the orange holster, 3½ digits, a maximum reading of 1999, the ranges on its
// RANGE key, a mV position on its dial) reading the course's bench supply (0–30 V, its VOLTAGE knob the one input). Its
// specification, our own unbranded design of the common class (owner, 2026-10-08; the class's source is cited in the spec,
// never on a teaching surface): DC volts 200 mV / 2 V / 20 V / 200 V / 600 V, every range ±(0.5 % of reading + 3 counts).
// Every number is computed here: U = p·V + n·q (the band in volts), u = U / V (the band as a share of the reading), for the
// reading V the display shows on the range set, q one count of that range. Each unit carries its own copy (a library is a
// self-contained folder); the master is libraries/spec-kit/. Built on svgkit.js, dinkit.js and psukit.js: SPECKIT(K, D).
'use strict';
(function () {
  // ───────────── the numbers ─────────────
  const SPEC = { p: 0.005, n: 3, max: 1999 };
  // the ranges: their full scale (V), one count (V), the digits after the point, the unit shown, the dial's position
  const RANGES = {
    0.2: { q: 0.0001, dec: 1, unit: 'mV', k: 1000, fn: 'mV', name: '200 mV', step: '0.1 mV' },
    2: { q: 0.001, dec: 3, unit: 'V', k: 1, fn: 'V⎓', name: '2 V', step: '1 mV' },
    20: { q: 0.01, dec: 2, unit: 'V', k: 1, fn: 'V⎓', name: '20 V', step: '10 mV' },
    200: { q: 0.1, dec: 1, unit: 'V', k: 1, fn: 'V⎓', name: '200 V', step: '100 mV' },
    600: { q: 1, dec: 0, unit: 'V', k: 1, fn: 'V⎓', name: '600 V', step: '1 V' },
  };
  const rangeOf = r => RANGES[r] || RANGES[2];
  // the reading on a range for an input V (V): the nearest count; over range past 1999 counts (600 V on its 600 V range)
  function reading(V, r) {
    const R = rangeOf(r), c = Math.round(Math.max(0, V) / R.q), ol = r === 600 ? c > 600 : c > SPEC.max;
    return { R, r: RANGES[r] ? r : 2, c, V: c * R.q, ol };
  }
  // the band for that reading: the percentage part, the counts part, their sum (V), the share of the reading
  function band(V, r) {
    const rd = reading(V, r), P = SPEC.p * rd.V, C = SPEC.n * rd.R.q, U = P + C;
    return Object.assign(rd, { P, C, U, u: rd.V > 0 ? U / rd.V : Infinity, lo: rd.V - U, hi: rd.V + U });
  }
  // the display's digits (counts c away from the reading): 1.000, 100.0, OL
  function show(rd, c = 0) {
    if (rd.ol) return 'OL';
    const v = (rd.c + c) * rd.R.q * rd.R.k;
    return Math.max(0, v).toFixed(rd.R.dec);
  }
  // what the 3½-digit glass shows (counts c away from the reading): the half digit (only ever a 1, blank otherwise), three
  // full digits that keep their zeros, the point where the range puts it: 1.000, " .100" (0.100 V on 2 V), 100.0, "05.3",
  // OL. (The blank half digit carries the point when it has one after it.)
  const DP = { 0.2: 3, 2: 1, 20: 2, 200: 3, 600: 4 };
  function lcdStr(rd, c = 0) {
    if (rd.ol) return 'OL';
    const n = Math.max(0, rd.c + c), d = String(n).padStart(4, '0').slice(-4), p = DP[rd.r] || 1;
    let str = d.slice(0, p) + (p < 4 ? '.' + d.slice(p) : '');
    if (str[0] === '0') str = ' ' + str.slice(1);
    return str;
  }
  // numbers as they are said: up to two decimals, no trailing zeros (8, 3.5, 0.8, 9.17)
  const trim = (v, d = 2) => { let s = (+v).toFixed(d); if (s.includes('.')) s = s.replace(/0+$/, '').replace(/\.$/, ''); return s; };
  const mV = v => trim(v * 1000);                        // a voltage given in V, said in mV
  const pct = u => trim(u * 100);                        // a share, said in %
  const vStr = (rd) => (rd.R.unit === 'mV' ? (rd.V * 1000).toFixed(1) + ' mV' : rd.V.toFixed(rd.R.dec) + ' V');
  const vAt = (v, dec) => v.toFixed(dec);
  // a band's edge in the range's unit, to one digit finer than the display when it needs it (0.992 V, 0.0965 V, 99.2 mV)
  const edge = (v, R) => { let s = (v * R.k).toFixed(R.dec + 1); if (s.endsWith('0')) s = s.slice(0, -1); return s + ' ' + R.unit; };

  // the course's colours on this card (owner, 2026-10-10: the % of reading green, the counts coral; teal stays the handheld's
  // from card 5, amber the true value's, violet the bench meter's)
  const COL = { pct: '#4ADE80', cnt: '#FF8C69', band: '#E6EDF5', mcu: '#38B6FF', teal: '#2EE6C5', cyan: '#38D9FF', ink: '#E6EDF5', dim: '#8B97A8' };

  window.SPECKIT = function (K, D) {
    const { text, P, u, clamp, ease } = K;
    const CTX = typeof document !== 'undefined' ? document.createElement('canvas').getContext('2d') : null;
    const measure = (s, size, weight = 500) => { if (!CTX) return s.length * size * 0.55; CTX.font = `${weight} ${size}px 'IBM Plex Sans','Segoe UI',system-ui,sans-serif`; return CTX.measureText(s).width; };
    const f1 = v => (+v).toFixed(1);

    // ───────────── a view's heading: the kind in white, its topic (after the colon) in the view's colour ─────────────
    function head(cx, y, s, col = COL.teal, size = 26) {
      const w = measure(s, size, 700) + 64, h = size + 30, i = s.indexOf(': ');
      const body = i < 0 ? K.esc(s) : `<tspan fill="#FFFFFF">${K.esc(s.slice(0, i + 1))}</tspan><tspan fill="${col}">${K.esc(s.slice(i + 1))}</tspan>`;
      return `<rect x="${cx - w / 2}" y="${y - h / 2}" width="${w}" height="${h}" rx="${h / 2.6}" fill="${col}" opacity="0.14" filter="url(#${P}lbig)"/>`
        + `<rect x="${cx - w / 2}" y="${y - h / 2}" width="${w}" height="${h}" rx="${h / 2.6}" fill="#06111A" fill-opacity="0.95" stroke="${col}" stroke-width="2.4" filter="${u('soft')}"/>`
        + `<text x="${cx}" y="${y + size * 0.36}" font-size="${size}" fill="#FFFFFF" text-anchor="middle" font-weight="700" font-family="'IBM Plex Sans','Segoe UI',system-ui,sans-serif">${body}</text>`;
    }

    // ───────────── the rig (stage space): the bench supply, the handheld, the two leads ─────────────
    // The supply's front face from SX (its left) on the bench line FL; the meter's bottom centre at MX, scaled MS. The red
    // lead from the supply's + post into the meter's VΩ jack, the black from − into COM (banana plugs in the posts, booted
    // plugs in the jacks). The meter draws ~0.1 µA (10 MΩ): the supply shows 0.000 A and stays in CV.
    const RIG = { FL: 790, SX: 60, MX: 646, MS: 0.9 };
    function plug([x, y], col) { const c = col === 'red' ? ['#D42A2F', '#7A1014'] : ['#2A2E33', '#050506'];
      return `<circle cx="${x + 2}" cy="${y + 3}" r="12" fill="#000" opacity="0.45"/><circle cx="${x}" cy="${y}" r="11.5" fill="${c[0]}" stroke="${c[1]}" stroke-width="1.6"/>`
        + `<circle cx="${x}" cy="${y}" r="6.5" fill="none" stroke="${c[1]}" stroke-width="1.4"/><circle cx="${x - 3.5}" cy="${y - 4}" r="3" fill="#FFFFFF" opacity="0.3"/>`; }
    function rig(o = {}) {
      const { FL, SX, MX, MS } = Object.assign({}, RIG, o);
      const sp = ([x, y]) => [SX + x, FL + y], mp = ([x, y]) => [MX + MS * x, FL + MS * y];
      const pos = sp(D.PSU.pos), neg = sp(D.PSU.neg), vo = mp([84, -52]), com = mp([28, -52]);
      const boot = ([x, y], col) => `<rect x="${(x - 7 * MS).toFixed(1)}" y="${y.toFixed(1)}" width="${(14 * MS).toFixed(1)}" height="${(26 * MS).toFixed(1)}" rx="${(4 * MS).toFixed(1)}" fill="${col === 'red' ? '#C8262B' : '#1B1D21'}" stroke="#000" stroke-opacity="0.5"/>`;
      // a lead from a post, down onto the bench in front, along it and up into the boot under its jack
      const lead = (a, b, col, sag, bend) => { const bx = b[0], by = b[1] + 26 * MS;
        return D.lead(`M${f1(a[0])},${f1(a[1])} C${f1(a[0] + bend)},${f1(FL + sag)} ${f1(bx - 60)},${f1(FL + sag + 6)} ${f1(bx - 18)},${f1(FL + sag - 4)} S${f1(bx)},${f1(by + 30)} ${f1(bx)},${f1(by)}`, col, 6.3); };
      const leads = lead(neg, com, 'black', 22, 20) + lead(pos, vo, 'red', 44, 10) + boot(com, 'black') + boot(vo, 'red') + plug(pos, 'red') + plug(neg, 'black');
      const meterT = `translate(${MX} ${FL}) scale(${MS})`;
      const body = fn => `<g transform="translate(${SX} ${FL})">${D.supply({ V: 1, lim: 1, sol: { Vout: 0, I: 0, cc: false }, bodyOnly: true })}</g>`
        + `<g transform="${meterT}">${D.dmm({ txt: null, unit: fn === 'mV' ? 'mV' : 'V', fn })}</g>`;
      // the supply's face at its knob's setting: its output on (CV: the meter draws next to nothing, 0.000 A), or off (the
      // displays show the settings, SET lit; the posts carry nothing). Its VOLTAGE display wanders a count when on (a).
      const PS = window.PSUKIT(K, D), PSS = 420 / PS.G.W;
      const face = (V, out = true, a = 0, still = false) => {
        const r = out ? { vStr: PS.fmtV(V + (V > 0.02 && !still ? K.counts(a, 2.3, 17, 1) * 0.01 : 0)), aStr: PS.fmtA(0), lit: 1, set: false, test: false, out: true, cv: true, cc: false, pw: true }
          : { vStr: PS.fmtV(V), aStr: PS.fmtA(1.0), lit: 1, set: true, test: false, out: false, cv: false, cc: false, pw: true };
        return `<g transform="translate(${SX} ${FL}) translate(0 ${f1(-PS.G.FEET * PSS)}) scale(${PSS.toFixed(5)})">${PS.supplyLive(r, V / 30, 1.0 / 5)}</g>`;
      };
      // the meter's reading (3½ digits right-aligned in the glass, the bargraph's full scale the range), and its dial when it
      // turns (an angle between two positions) or a key pressed
      function lcd(str, rng) {
        const g = [], H = 46, s = str === 'OL' ? ' 0L' : str, x = 46 - D.lcdWidth(s, H);
        g.push(D.lcd7(x, -366, s, H));
        const R = rangeOf(rng), full = rng === 600 ? 600 : (SPEC.max + 1) * R.q * R.k;
        const nb = str === 'OL' ? 40 : Math.round(clamp(Math.abs(+str.replace(/\s/g, '')) / full) * 40);
        for (let k = 0; k < 40; k++) g.push(`<rect x="${-80 + k * 3.9}" y="-352" width="2.4" height="6" fill="#15191C" opacity="${k < nb ? 0.9 : 0.06}"/>`);
        return `<g transform="${meterT}">${g.join('')}</g>`;
      }
      // the rotary switch at an angle (degrees, −70 V⎓, −35 mV), drawn over the body's own (the same knob)
      function dial(ang) {
        const cx = 0, cy = -196, R = 64;
        return `<g transform="${meterT}"><circle cx="${cx}" cy="${cy}" r="${R + 2}" fill="#2B3036"/><circle cx="${cx}" cy="${cy}" r="${R}" fill="url(#${P}selector)" stroke="#0B0D10" stroke-width="1.4"/>`
          + `<g transform="rotate(${f1(ang)} ${cx} ${cy})"><rect x="${cx - 15}" y="${cy - R + 4}" width="30" height="${2 * R - 8}" rx="13" fill="#3A4048" stroke="#15181C"/><rect x="${cx - 11}" y="${cy - R + 8}" width="8" height="${2 * R - 16}" rx="4" fill="#FFFFFF" opacity="0.1"/>`
          + `<path d="M${cx},${cy - R + 8} l-6,14 h12 Z" fill="#F2F4F6"/></g></g>`;
      }
      // RANGE pressed: it sinks, darker, a lit rim round it
      const rangeKey = () => `<g transform="${meterT}"><rect x="-96" y="-317" width="44" height="22" rx="7" fill="#262B32" stroke="${COL.teal}" stroke-opacity="0.8" stroke-width="2"/>`
        + text(-74, -302, 'RANGE', 7.8, '#AEB8C3', 'middle', 700) + '</g>';
      return { FL, SX, MX, MS, body, leads, face, lcd, dial, rangeKey, meterT,
        at: { knob: [SX + D.PSU.knob[0], FL + D.PSU.knob[1]], knobR: D.PSU.knob[2], lcd: mp([0, -400]), lcdTop: mp([0, -468]), lcdRight: mp([98, -400]), digitLast: mp([30, -390]),
          meterTop: mp([0, -504]), meterRight: mp([123, -300]), meterLeft: mp([-123, -300]), range: mp([-74, -307]), dial: mp([0, -196]), dialR: 64 * MS,
          supplyTop: [SX + 210, FL - D.PSU.H], supplyDisp: [SX + 100, FL - 230], posts: [(pos[0] + neg[0]) / 2, pos[1]] } };
    }
    const FN_ANG = { 'V⎓': -70, mV: -35 };
    // the rig's moving parts on a unit's timeline. st(t) → { V (the knob), rng, out (false: output off), ang (the dial's angle
    // while it turns), blank (the display between ranges), key (RANGE held down) }. The meter converts 2.5 times a second
    // (card 4's handheld): its reading is the input at the last conversion; its last digit wanders a count while the input
    // is still. Everything a unit computes from the reading uses the same conversion (convT).
    const CONV = 2.5;
    const convT = t => Math.floor(t * CONV + 1e-6) / CONV;
    function liveRig(S, rg, st, salt = 0) {
      S.top(S.g((t, a) => { const s = st(t); return { html: rg.face(s.V, s.out !== false, a, t >= 99) }; }, ''));
      S.top(S.g((t, a) => {
        const s = st(t), c = st(convT(t)), p = st(Math.max(0, convT(t) - 1 / CONV)), moving = Math.abs(p.V - c.V) > 1e-6 || p.rng !== c.rng;
        // (the settled view, for reduced motion and captures, holds still: no wander)
        const rd = reading(c.out === false ? 0 : c.V, c.rng), w = t < 99 && !moving && !rd.ol && rd.c > 20 ? K.counts(a, CONV, salt, 1) : 0;
        return { html: (s.blank ? '' : rg.lcd(lcdStr(rd, w), c.rng)) + (s.ang != null ? rg.dial(s.ang) : '') + (s.key ? rg.rangeKey() : '') };
      }, ''));
    }
    // the controls built into the rig: the supply's VOLTAGE knob (a drag turns it as far as the hand turns; the wheel a count
    // at a time: 1 mV), the meter's dial (V⎓ ↔ mV) and its RANGE key (2 → 20 → 200 → 600 → 2 V on V⎓)
    function rigControls(rg, bench, onPress) {
      const val = k => bench.value(k);
      return [
        { param: 'supplyV', kind: 'rot', x: rg.at.knob[0], y: rg.at.knob[1], r: rg.at.knobR + 10, min: 0, max: 30, step: 0.0001, wheel: 0.001, tip: 'tipKnob' },
        { param: 'meterRange', kind: 'tap', x: rg.at.dial[0], y: rg.at.dial[1], w: rg.at.dialR * 2, h: rg.at.dialR * 2, tip: 'tipDial',
          onTap: () => { bench.setValue('meterRange', val('meterRange') === 0.2 ? 2 : 0.2); if (onPress) onPress('dial'); } },
        { param: 'meterRange', kind: 'tap', x: rg.at.range[0], y: rg.at.range[1], w: 46 * rg.MS, h: 30 * rg.MS, tip: 'tipRange',
          onTap: () => { const r = val('meterRange'); if (r !== 0.2) bench.setValue('meterRange', r === 2 ? 20 : r === 20 ? 200 : r === 200 ? 600 : 2); if (onPress) onPress('range'); } },
      ];
    }

    // ───────────── the millivolt ruler (stage space): offsets from the reading, the same scale in every view ─────────────
    // x0 … x0 + w spans ±span mV round the reading, the axis at y; ticks every mV (every 0.1 mV under the 200 mV range's
    // tenth-steps is not drawn: the scale stays one), labelled every 5 mV. Returns { svg, X(offset in mV), y, w }
    function ruler(x0, y, w, o = {}) {
      const span = o.span || 15, X = m => x0 + w / 2 + m * w / (2 * span), g = [];
      g.push(`<line x1="${x0}" y1="${y}" x2="${x0 + w}" y2="${y}" stroke="#C9D3DE" stroke-opacity="0.85" stroke-width="2"/>`);
      for (let m = -span; m <= span; m++) {
        const big = m % 5 === 0;
        g.push(`<line x1="${f1(X(m))}" y1="${y}" x2="${f1(X(m))}" y2="${y + (big ? 14 : 8)}" stroke="#C9D3DE" stroke-opacity="${big ? 0.9 : 0.5}" stroke-width="${big ? 1.8 : 1.2}"/>`);
        if (big && m !== 0) g.push(text(X(m), y + 36, (m > 0 ? '+' : '−') + Math.abs(m), 17, '#AEB8C3', 'middle', 600, true));
      }
      g.push(text(x0 + w + 32, y + 36, 'mV', 17, '#AEB8C3', 'start', 600));
      return { svg: g.join(''), X, y, w, x0, span, pxmv: w / (2 * span) };
    }
    // the reading's mark on the ruler: a white stem through it, its value under the axis
    function readingMark(R, s, col = '#FFFFFF') {
      const x = R.X(0);
      return `<line x1="${x}" y1="${R.y - 70}" x2="${x}" y2="${R.y + 16}" stroke="${col}" stroke-width="2.4"/>`
        + `<circle cx="${x}" cy="${R.y}" r="5" fill="${col}"/>` + text(x, R.y + 40, s, 20, col, 'middle', 700, true);
    }
    // the band's two parts as bars above the axis (y − 52 … y − 18): the percentage part green from the reading out to ±P,
    // grown by fp (0 … 1); the counts coral beyond it, one block a count (k of them shown, fractional: the last dropping in)
    function bars(R, b, o = {}) {
      const fp = o.fp == null ? 1 : o.fp, k = o.k == null ? SPEC.n : o.k, y0 = R.y - 52, h = 34, g = [];
      const Pm = b.P * 1000 * fp, qm = b.R.q * 1000, x = R.X;
      if (Pm > 0) {
        g.push(`<rect x="${f1(x(-Pm))}" y="${y0}" width="${f1(x(Pm) - x(-Pm))}" height="${h}" fill="${COL.pct}" fill-opacity="0.82"/>`
          + `<rect x="${f1(x(-Pm))}" y="${y0}" width="${f1(x(Pm) - x(-Pm))}" height="${h}" fill="none" stroke="#C7FFD8" stroke-opacity="0.7" stroke-width="1.2"/>`);
        // its value in it, each side, while there is room
        const wide = x(Pm) - x(0);
        if (o.pLabel !== false && wide > 72 && fp > 0.98) [-1, 1].forEach(sd => g.push(text((x(0) + x(sd * Pm)) / 2, y0 + 24, (sd < 0 ? '−' : '+') + trim(b.P * 1000) + ' mV', 16, '#06281A', 'middle', 700)));
      }
      for (let j = 0; j < SPEC.n; j++) {
        const f = clamp(k - j); if (f <= 0) continue;
        [-1, 1].forEach(sd => {
          const a = Pm + j * qm, e = a + qm, xa = x(sd * a), xe = x(sd * e), lx = Math.min(xa, xe), w = Math.abs(xe - xa), drop = (1 - ease(f)) * -60;
          g.push(`<g transform="translate(0 ${f1(drop)})" opacity="${ease(f).toFixed(3)}"><rect x="${f1(lx)}" y="${y0}" width="${f1(w)}" height="${h}" fill="${COL.cnt}" fill-opacity="0.85" stroke="#FFE1D6" stroke-opacity="0.8" stroke-width="1.2"/>`
            + (w > 22 ? text(lx + w / 2, y0 + 24, String(j + 1), 16, '#3A1206', 'middle', 700) : '') + '</g>');
        });
      }
      // a part lit while the sentence names it (o.glowP, o.glowC: 0 … 1): a soft rim in its colour round it, each side
      const rim = (xa, xe, col, op) => { const lx = Math.min(xa, xe), w = Math.abs(xe - xa);
        return `<rect x="${f1(lx - 3)}" y="${y0 - 3}" width="${f1(w + 6)}" height="${h + 6}" rx="4" fill="none" stroke="${col}" stroke-width="3" opacity="${op.toFixed(3)}" filter="${u('soft')}"/>`
          + `<rect x="${f1(lx - 3)}" y="${y0 - 3}" width="${f1(w + 6)}" height="${h + 6}" rx="4" fill="none" stroke="#FFFFFF" stroke-width="1.4" opacity="${op.toFixed(3)}"/>`; };
      if (o.glowP > 0 && Pm > 0) g.push(rim(x(-Pm), x(Pm), COL.pct, clamp(o.glowP)));
      if (o.glowC > 0 && k > 0) { const e = Pm + Math.min(k, SPEC.n) * qm; g.push(rim(x(-e), x(-Pm), COL.cnt, clamp(o.glowC)) + rim(x(Pm), x(e), COL.cnt, clamp(o.glowC))); }
      return g.join('');
    }
    // when the band runs past the ruler's ends (a higher range): arrows at both ends, and the band's size said over the right end
    function offScale(R, b, label) {
      if (!(b.U * 1000 > R.span)) return '';
      const y = R.y - 35, xl = R.x0, xr = R.x0 + R.w;
      return `<path d="M${xr + 4},${y - 12} l14,12 l-14,12 Z M${xl - 4},${y - 12} l-14,12 l14,12 Z" fill="#FFFFFF" opacity="0.85"/>`
        + `<rect x="${xr - measure(label, 16, 700) - 28}" y="${R.y - 104}" width="${measure(label, 16, 700) + 24}" height="30" rx="10" fill="#07111A" fill-opacity="0.92" stroke="#C9D3DE" stroke-opacity="0.6"/>`
        + text(xr - 16, R.y - 83, label, 16, '#FFFFFF', 'end', 700);
    }
    // the band bracketed above the bars: its edges, ±U, and the two voltages under the ends
    function bracket(R, b, op = 1, o = {}) {
      const Um = b.U * 1000, xl = R.X(-Um), xr = R.X(Um), y = R.y - 74, c = o.col || COL.band, yb = o.edges === false ? 4 : 70;
      return `<g opacity="${op.toFixed(3)}"><path d="M${f1(xl)},${y + 12} V${y} H${f1(xr)} V${y + 12}" fill="none" stroke="${c}" stroke-width="2.4"/>`
        + `<line x1="${f1(xl)}" y1="${R.y - 52}" x2="${f1(xl)}" y2="${R.y + yb}" stroke="${c}" stroke-opacity="0.6" stroke-width="1.6" stroke-dasharray="5 4"/>`
        + `<line x1="${f1(xr)}" y1="${R.y - 52}" x2="${f1(xr)}" y2="${R.y + yb}" stroke="${c}" stroke-opacity="0.6" stroke-width="1.6" stroke-dasharray="5 4"/>`
        + (o.edges !== false ? text(xl, R.y + 92, o.lo, 18, c, 'middle', 700, true) + text(xr, R.y + 92, o.hi, 18, c, 'middle', 700, true) : '')
        + (o.label ? text((xl + xr) / 2, y - 14, o.label, 24, '#FFFFFF', 'middle', 700) : '') + '</g>';
    }

    // ───────────── the specification as written: ±( 0.5 % of reading + 3 counts ), its two parts coloured ─────────────
    // centred at cx; parts { pct, cnt } (their words, each in its language); lit: which part is lit (null: both); returns
    // { svg, at: { pct: [x, y], cnt: [x, y] } } (the middles under each part, for a leader)
    function specLine(cx, y, words, o = {}) {
      const size = o.size || 40, a = '±(', b = words.pct, c = ' + ', d = words.cnt, e = ')';
      const wa = measure(a, size, 700), wb = measure(b, size, 700), wc = measure(c, size, 700), wd = measure(d, size, 700), we = measure(e, size, 700);
      // each part boxed, a clear gap (gp) between a box and the signs round it
      const gp = size * 0.42, W = wa + wb + wc + wd + we + 4 * gp, x0 = cx - W / 2;
      const dimB = o.lit === 'cnt' ? 0.35 : 1, dimD = o.lit === 'pct' ? 0.35 : 1;
      const xs = [x0, x0 + wa + gp, x0 + wa + wb + 2 * gp, x0 + wa + wb + wc + 3 * gp, x0 + wa + wb + wc + wd + 4 * gp];
      const box = (x, w, col, op) => `<rect x="${f1(x - gp * 0.6)}" y="${y - size * 0.95}" width="${f1(w + gp * 1.2)}" height="${f1(size * 1.32)}" rx="10" fill="${col}" fill-opacity="${(0.12 * op).toFixed(3)}" stroke="${col}" stroke-opacity="${(0.9 * op).toFixed(3)}" stroke-width="2"/>`;
      // (o.only: 'boxes' or 'text', for a motion that draws the boxes round words already written)
      const svg = (o.boxes !== false && o.only !== 'text' ? box(xs[1], wb, COL.pct, dimB) + box(xs[3], wd, COL.cnt, dimD) : '')
        + (o.only === 'boxes' ? '' : text(xs[0], y, a, size, '#FFFFFF', 'start', 700) + text(xs[1], y, b, size, COL.pct, 'start', 700, false, `opacity="${dimB}"`)
        + text(xs[2], y, c, size, '#FFFFFF', 'start', 700) + text(xs[3], y, d, size, COL.cnt, 'start', 700, false, `opacity="${dimD}"`)
        + text(xs[4], y, e, size, '#FFFFFF', 'start', 700));
      return { svg, at: { pct: [xs[1] + wb / 2, y + size * 0.37 + 4], cnt: [xs[3] + wd / 2, y + size * 0.37 + 4] }, w: W };
    }

    // ───────────── the display enlarged (stage space): the same grey LCD, its last digit ringed ─────────────
    // x0, y0 its top left, scale s (the meter's own LCD is 176 × 118); str the digits; ring: the last digit's ring (0 … 1)
    function lcdBig(x0, y0, s, str, unit, o = {}) {
      const g = [], H = 46, x = 46 - D.lcdWidth(str, H), us = unit.length > 1 ? 16 : 22;
      g.push(`<g transform="translate(${x0 + 88 * s} ${y0 + 458 * s}) scale(${s})">`
        + `<rect x="-98" y="-468" width="196" height="138" rx="12" fill="#111316" stroke="#000"/><rect x="-88" y="-458" width="176" height="118" rx="6" fill="url(#${P}lcdGrey)"/>`
        + `<path d="M-86,-456 L-30,-456 L-60,-342 L-86,-342 Z" fill="#FFFFFF" opacity="0.13"/>`
        + text(-80, -438, 'DC', 13, '#15191C', 'start', 700) + text(55, -368, unit, us, '#15191C', 'start', 700));
      g.push(D.lcd7(x, -366, str, H));
      // the last digit's cell: 0.74 H wide, ending at the right edge (46); its ring in coral
      if (o.ring) { const cx0 = 46 - H * 0.74 + 2, rw = H * 0.74, op = clamp(o.ring);
        g.push(`<rect x="${f1(cx0 - 6)}" y="${-366 - H - 8}" width="${f1(rw + 8)}" height="${H + 16}" rx="7" fill="${COL.cnt}" fill-opacity="${(0.14 * op).toFixed(3)}" stroke="${COL.cnt}" stroke-opacity="${op.toFixed(3)}" stroke-width="${(3 / s).toFixed(2)}"/>`); }
      g.push('</g>');
      return { svg: g.join(''), lastDigit: [x0 + 88 * s + s * (46 - H * 0.37), y0 + 458 * s + s * (-366 - H - 8)], w: 196 * s, h: 138 * s, bottom: y0 + 458 * s + s * (-330) };
    }

    // ───────────── the graph: the band as a share of the reading, against the reading ─────────────
    // x0, y0 its top left, w × h; the 2 V range's curve u = p + n·q/V over 0.05 … 1.999 V, as two stacked parts (the
    // percentage part green, flat at 0.5 %; the counts' share coral above it, growing as the reading falls). Returns
    // { svg, X, Y, curve(a, b, r) (the path of u over [a, b] on range r), area(a, b) }
    const uOf = (V, r) => SPEC.p + SPEC.n * rangeOf(r).q / V;
    function graph(x0, y0, w, h, L) {
      const xd = [0, 2], yd = [0, 0.07], X = v => x0 + (v - xd[0]) / (xd[1] - xd[0]) * w, Y = v => y0 + h - (v - yd[0]) / (yd[1] - yd[0]) * h, g = [];
      g.push(`<rect x="${x0}" y="${y0}" width="${w}" height="${h}" fill="#060B12" fill-opacity="0.85" stroke="#1E2B3A"/>`);
      for (let v = 0; v <= 2.0001; v += 0.25) { const big = Math.abs(v * 2 - Math.round(v * 2)) < 1e-6;
        g.push(`<line x1="${f1(X(v))}" y1="${y0}" x2="${f1(X(v))}" y2="${y0 + h}" stroke="#1C2A38" stroke-width="1"/>`); if (big) g.push(text(X(v), y0 + h + 24, v.toFixed(1), 15, '#8B97A8', 'middle', 500, true)); }
      for (let k = 0; k <= 7; k++) g.push(`<line x1="${x0}" y1="${f1(Y(k / 100))}" x2="${x0 + w}" y2="${f1(Y(k / 100))}" stroke="#1C2A38" stroke-width="1"/>` + text(x0 - 10, Y(k / 100) + 5, k + ' %', 15, '#8B97A8', 'end', 500, true));
      g.push(text(x0 + w, y0 + h + 50, L.xl, 16, '#C9D3DE', 'end', 600), text(x0, y0 - 16, L.yl, 16, '#C9D3DE', 'start', 600));
      const curve = (a, b, r = 2, n = 160) => { let d = ''; for (let i = 0; i <= n; i++) { const v = a + (b - a) * Math.pow(i / n, 1); d += `${i ? 'L' : 'M'}${f1(X(v))},${f1(Y(Math.min(0.0702, uOf(v, r))))}`; } return d; };
      // a log-spaced path is smoother where the curve bends hard (near the bottom of the range)
      const curveLog = (a, b, r = 2, n = 200) => { let d = ''; for (let i = 0; i <= n; i++) { const v = a * Math.pow(b / a, i / n); d += `${i ? 'L' : 'M'}${f1(X(v))},${f1(Y(Math.min(0.0702, uOf(v, r))))}`; } return d; };
      const area = (a, b, r = 2) => `${curveLog(a, b, r)} L${f1(X(b))},${f1(Y(SPEC.p))} L${f1(X(a))},${f1(Y(SPEC.p))} Z`;
      return { svg: g.join(''), X, Y, curve, curveLog, area, x0, y0, w, h };
    }

    // ───────────── the meter's specification page (our own layout; printed, so its words are the reader's language) ─────────────
    // x0, y0, w: the sheet; L: its words; o.hiRow: the row lit (0 … 4: 200 mV … 600 V), o.hiCol, o.hi (0 … 1: the light's
    // strength), o.ring: { counts, cond } (which notes are ringed). Returns { svg, rowAt(i) → [x, y, w, h], at }
    function specPage(x0, y0, w, L, o = {}) {
      const g = [], ink = '#1C232B', soft = '#5A6672', rule = '#B8BEC4', pad = 34, h = o.h || 560;
      g.push(`<rect x="${x0 + 10}" y="${y0 + 14}" width="${w}" height="${h}" rx="6" fill="#000" opacity="0.45" filter="${u('soft')}"/>`
        + `<rect x="${x0}" y="${y0}" width="${w}" height="${h}" rx="5" fill="#F3F0E8"/><rect x="${x0}" y="${y0}" width="${w}" height="${h}" rx="5" fill="url(#${P}pageShade)"/>`);
      let y = y0 + 52;
      g.push(text(x0 + pad, y, L.title, 26, ink, 'start', 700, false, 'letter-spacing="1.6"') + text(x0 + w - pad, y, L.page, 16, soft, 'end', 500));
      y += 16; g.push(`<line x1="${x0 + pad}" y1="${y}" x2="${x0 + w - pad}" y2="${y}" stroke="${ink}" stroke-width="2"/>`);
      y += 36; g.push(text(x0 + pad, y, L.display, 17, ink, 'start', 500));
      const dispY = y;
      y += 30; g.push(text(x0 + pad, y, L.accuracy, 17, ink, 'start', 500));
      const accY = y;
      y += 28; g.push(text(x0 + pad, y, L.cond, 15.5, soft, 'start', 500));
      const condY = y;
      // the table: DC VOLTAGE, its columns
      y += 44; g.push(text(x0 + pad, y, L.dcv, 19, ink, 'start', 700, false, 'letter-spacing="1.2"'));
      y += 14;
      const cols = [x0 + pad, x0 + pad + w * 0.24, x0 + pad + w * 0.5], rowH = 40;
      g.push(`<rect x="${x0 + pad}" y="${y}" width="${w - 2 * pad}" height="${rowH}" fill="#DCD8CE"/>`);
      [L.colRange, L.colRes, L.colAcc].forEach((s, i) => g.push(text(cols[i] + 12, y + 26, s, 15.5, ink, 'start', 700)));
      y += rowH;
      const rows = [['200 mV', '0.1 mV'], ['2 V', '1 mV'], ['20 V', '10 mV'], ['200 V', '100 mV'], ['600 V', '1 V']], rowAt = [];
      rows.forEach(([r, q], i) => {
        const lit = o.hiRow === i ? clamp(o.hi == null ? 1 : o.hi) : 0;
        if (lit > 0) g.push(`<rect x="${x0 + pad - 4}" y="${y + 1}" width="${w - 2 * pad + 8}" height="${rowH - 2}" rx="5" fill="#FFE27A" opacity="${(0.75 * lit).toFixed(3)}"/>`);
        g.push(text(cols[0] + 12, y + 27, r, 17, ink, 'start', 600, true), text(cols[1] + 12, y + 27, q, 17, ink, 'start', 600, true), text(cols[2] + 12, y + 27, L.acc, 17, ink, 'start', 700, true));
        g.push(`<line x1="${x0 + pad}" y1="${y + rowH}" x2="${x0 + w - pad}" y2="${y + rowH}" stroke="${rule}" stroke-width="1"/>`);
        // the lit row's accuracy, ringed as the sentence reads it (o.cell: 0 … 1)
        if (o.hiRow === i && o.cell > 0) g.push(`<rect x="${cols[2] + 2}" y="${y + 4}" width="${x0 + w - pad - cols[2] - 6}" height="${rowH - 8}" rx="8" fill="none" stroke="#0E8FB3" stroke-width="2.6" opacity="${clamp(o.cell).toFixed(3)}"/>`);
        rowAt.push([x0 + pad, y, w - 2 * pad, rowH]);
        y += rowH;
      });
      y += 34; g.push(text(x0 + pad, y, L.notes1, 15.5, soft, 'start', 500));
      y += 24; g.push(text(x0 + pad, y, L.notes2, 15.5, soft, 'start', 500));
      return { svg: g.join(''), rowAt, at: { display: [x0 + pad, dispY], accuracy: [x0 + pad, accY], cond: [x0 + pad, condY], colAcc: cols[2] }, h, bottom: y0 + h };
    }
    const DEFS = `<defs><linearGradient id="${P}pageShade" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#FFFFFF" stop-opacity="0.35"/><stop offset="0.6" stop-color="#FFFFFF" stop-opacity="0"/><stop offset="1" stop-color="#B9B1A0" stop-opacity="0.35"/></linearGradient></defs>`;

    // ───────────── a small value card (stage space): a term's sum, in its colour ─────────────
    function termCard(x0, y0, w, h, col, title, line, sub, op = 1) {
      return `<g opacity="${(+op).toFixed(3)}"><rect x="${x0}" y="${y0}" width="${w}" height="${h}" rx="16" fill="#07151A" fill-opacity="0.95" stroke="${col}" stroke-width="2" filter="${u('soft')}"/>`
        + text(x0 + 24, y0 + 36, title, 16.5, col, 'start', 700, false, 'letter-spacing="1.4"')
        + text(x0 + 24, y0 + 78, line, D.fit(line, 30, 700, w - 48), '#FFFFFF', 'start', 700)
        + (sub ? text(x0 + 24, y0 + 110, sub, D.fit(sub, 16, 500, w - 48), '#C9D3DE', 'start', 500) : '') + '</g>';
    }

    // ───────────── a hand on a control (stage space) ─────────────
    // A right hand reaching in from the front (the viewer's side), its back to us, its fingertips on the control, the sleeve
    // running down out of the picture. Drawn to the rig's own scale: the supply's binding posts, 19.05 mm apart (the
    // standard spacing), are 52.5 px apart, so 2.76 px a mm: a fingertip ~15 mm wide, the hand ~85 mm across the knuckles.
    // Its shapes are in mm in the hand's own frame (the control's centre at 0, 0, y down); it turns with the control (rot,
    // degrees clockwise) and comes in from below (inn: 0 out of the picture … 1 on the control).
    const MM = 52.5 / 19.05;
    const SKIN = { edge: '#3A2112', deep: '#5A321C', dark: '#7A4829', mid: '#9E643C', lite: '#C98F63', nail: '#D9AA90', nailEdge: '#8A5A3E', free: '#F0DCCB' };
    const f2 = v => (+v).toFixed(2);
    // a smooth path through points (Catmull-Rom, as cubic Béziers)
    function smooth(p, closed = false) {
      const n = p.length, Pt = i => (closed ? p[(i + n) % n] : p[Math.max(0, Math.min(n - 1, i))]);
      let d = `M${f2(p[0][0])},${f2(p[0][1])}`;
      for (let i = 0; i < (closed ? n : n - 1); i++) {
        const p0 = Pt(i - 1), p1 = Pt(i), p2 = Pt(i + 1), p3 = Pt(i + 2);
        d += ` C${f2(p1[0] + (p2[0] - p0[0]) / 6)},${f2(p1[1] + (p2[1] - p0[1]) / 6)} ${f2(p2[0] - (p3[0] - p1[0]) / 6)},${f2(p2[1] - (p3[1] - p1[1]) / 6)} ${f2(p2[0])},${f2(p2[1])}`;
      }
      return d + (closed ? ' Z' : '');
    }
    const unit = (a, b) => { const dx = b[0] - a[0], dy = b[1] - a[1], l = Math.hypot(dx, dy) || 1; return [dx / l, dy / l]; };
    // a centre line sampled along its smooth curve: points, unit tangents, and the share of the way (0 at the first point)
    function sampleLine(p, n = 28) {
      const segs = p.length - 1, out = [], Pt = i => p[Math.max(0, Math.min(p.length - 1, i))];
      for (let k = 0; k <= n; k++) {
        const s = k / n * segs, i = Math.min(segs - 1, Math.floor(s)), t = s - i;
        const p0 = Pt(i - 1), p1 = Pt(i), p2 = Pt(i + 1), p3 = Pt(i + 2);
        const c1 = [p1[0] + (p2[0] - p0[0]) / 6, p1[1] + (p2[1] - p0[1]) / 6], c2 = [p2[0] - (p3[0] - p1[0]) / 6, p2[1] - (p3[1] - p1[1]) / 6];
        const b = (a, b2, c, d) => (1 - t) ** 3 * a + 3 * (1 - t) ** 2 * t * b2 + 3 * (1 - t) * t * t * c + t ** 3 * d;
        const db = (a, b2, c, d) => 3 * (1 - t) ** 2 * (b2 - a) + 6 * (1 - t) * t * (c - b2) + 3 * t * t * (d - c);
        const x = b(p1[0], c1[0], c2[0], p2[0]), y = b(p1[1], c1[1], c2[1], p2[1]), tx = db(p1[0], c1[0], c2[0], p2[0]), ty = db(p1[1], c1[1], c2[1], p2[1]), l = Math.hypot(tx, ty) || 1;
        out.push({ x, y, tx: tx / l, ty: ty / l, s });
      }
      return out;
    }
    // A finger (or the thumb) as it is: a tapered outline through its joints (tip first: tip, DIP, PIP, MCP; the thumb tip,
    // IP, MCP, CMC), swelling a little at each joint, its round tip; shaded across its width (lit from above left, as the
    // stage's lamps), the nail on the last segment, the creases over the joints. w: its width at the middle joint (mm).
    let skinN = 0;
    function finger(pts, w, o = {}) {
      const L = sampleLine(pts), segs = pts.length - 1;
      // the width along it: the tip 0.86 w, a joint a little wider, wider toward the knuckle
      const wAt = s => { const j = Math.round(s), near = Math.abs(s - j); const base = 0.86 + 0.14 * Math.min(1, s / 1.2) + 0.05 * (s / segs);
        return w * (base + (j > 0 && j < segs ? 0.06 * Math.max(0, 1 - near * 3) : 0) - 0.04 * Math.sin(Math.PI * (s % 1))); };
      const lft = [], rgt = [];
      L.forEach(q => { const hw = wAt(q.s) / 2; lft.push([q.x - q.ty * hw, q.y + q.tx * hw]); rgt.push([q.x + q.ty * hw, q.y - q.tx * hw]); });
      const r0 = wAt(0) / 2, F = v => f2(v);
      let d = `M${F(rgt[0][0])},${F(rgt[0][1])} A${F(r0)},${F(r0)} 0 0 1 ${F(lft[0][0])},${F(lft[0][1])}`;
      for (let k = 1; k < lft.length; k++) d += ` L${F(lft[k][0])},${F(lft[k][1])}`;
      for (let k = rgt.length - 1; k >= 0; k--) d += ` L${F(rgt[k][0])},${F(rgt[k][1])}`;
      d += ' Z';
      // shading across: from the side facing the light (up and left) to the side away from it, at the finger's middle
      const m = L[Math.floor(L.length / 2)], nx = -m.ty, ny = m.tx, lit = nx * -0.6 + ny * -0.8 > 0 ? 1 : -1, hw = w / 2;
      const id = `${P}sk${skinN++}`;
      const g = [`<defs><linearGradient id="${id}" gradientUnits="userSpaceOnUse" x1="${F(m.x + nx * hw * lit)}" y1="${F(m.y + ny * hw * lit)}" x2="${F(m.x - nx * hw * lit)}" y2="${F(m.y - ny * hw * lit)}">`
        + `<stop offset="0" stop-color="${SKIN.lite}"/><stop offset="0.3" stop-color="${SKIN.mid}"/><stop offset="0.75" stop-color="${SKIN.dark}"/><stop offset="1" stop-color="${SKIN.deep}"/></linearGradient></defs>`,
        `<path d="${d}" fill="url(#${id})" stroke="${SKIN.edge}" stroke-width="0.5" stroke-linejoin="round"/>`];
      // a soft highlight down the lit side
      const hl = L.slice(2, L.length - 3).map(q => [q.x - q.ty * hw * 0.55 * lit, q.y + q.tx * hw * 0.55 * lit]);
      if (hl.length > 1) g.push(`<path d="${smooth(hl)}" fill="none" stroke="#FFFFFF" stroke-opacity="0.16" stroke-width="${F(w * 0.16)}" stroke-linecap="round"/>`);
      // the creases over the middle joints: short curved lines across the back of the finger, dark with a light lip
      (o.joints || []).forEach(j => {
        const q = L.reduce((a, b) => (Math.abs(b.s - j) < Math.abs(a.s - j) ? b : a)), cw = wAt(j) * 0.3;
        [-1.1, 0, 1.1].forEach((off, k) => { const cx = q.x + q.tx * off, cy = q.y + q.ty * off, sw = cw * (k === 1 ? 1 : 0.75), bow = 0.7;
          const path = `M${F(cx - q.ty * sw)},${F(cy + q.tx * sw)} Q${F(cx + q.tx * bow)},${F(cy + q.ty * bow)} ${F(cx + q.ty * sw)},${F(cy - q.tx * sw)}`;
          g.push(`<path d="${path}" fill="none" stroke="${SKIN.edge}" stroke-opacity="0.5" stroke-width="0.32" stroke-linecap="round"/>`
            + `<path d="${path}" fill="none" stroke="#FFFFFF" stroke-opacity="0.12" stroke-width="0.3" stroke-linecap="round" transform="translate(${F(q.tx * 0.35)} ${F(q.ty * 0.35)})"/>`); });
      });
      // the nail: on the back of the last segment, its free edge at the tip, its cuticle a soft arc
      if (o.nail !== false) {
        const q = L[2], ang = Math.atan2(-q.ty, -q.tx) * 180 / Math.PI, nl = w * 0.62, nw = w * 0.58, c = [q.x, q.y];
        g.push(`<g transform="translate(${F(c[0])} ${F(c[1])}) rotate(${F(ang)})">`
          + `<path d="M${F(-nl * 0.55)},${F(-nw / 2)} H${F(nl * 0.25)} Q${F(nl * 0.62)},${F(-nw / 2)} ${F(nl * 0.62)},0 Q${F(nl * 0.62)},${F(nw / 2)} ${F(nl * 0.25)},${F(nw / 2)} H${F(-nl * 0.55)} Q${F(-nl * 0.68)},0 ${F(-nl * 0.55)},${F(-nw / 2)} Z" fill="${SKIN.nail}" stroke="${SKIN.nailEdge}" stroke-width="0.3"/>`
          + `<path d="M${F(nl * 0.3)},${F(-nw / 2 + 0.3)} Q${F(nl * 0.58)},${F(-nw / 2 + 0.3)} ${F(nl * 0.58)},0 Q${F(nl * 0.58)},${F(nw / 2 - 0.3)} ${F(nl * 0.3)},${F(nw / 2 - 0.3)}" fill="none" stroke="${SKIN.free}" stroke-width="${F(nl * 0.14)}" stroke-opacity="0.8"/>`
          + `<path d="M${F(-nl * 0.4)},${F(-nw * 0.22)} H${F(nl * 0.1)}" stroke="#FFFFFF" stroke-opacity="0.45" stroke-width="0.45" stroke-linecap="round"/></g>`);
      }
      return g.join('');
    }
    // The grips (mm; the control's centre at 0, 0, y down). A right hand reaching up from below, along the panel, its back to
    // us: knob(r), a round knob of radius r pinched by its sides, the thumb's pad at nine o'clock, the index finger's at half
    // past two, the middle finger's at four, ring and little fingers curled loose; every fingertip only just over the rim, so
    // the knob's pointer (lower left) stays in sight. ridge(), a rotary switch's grip ridge pinched near its tail, the thumb
    // under it and the index finger hooked over it from beside its end; drawn for the ridge at −70° (its pointer up left).
    // The joints' spacing is an adult's (index: proximal 40, middle 24, distal 19 mm; the hand 85 mm across the knuckles).
    const GRIPS = {
      knob: r => ({
        sleeve: [[0, 156], [66, 152], [80, 400], [-8, 400]],
        palm: [[-6, 58], [8, 66], [20, 66], [36, 72], [52, 80], [64, 90], [70, 108], [66, 154], [2, 158], [-12, 128], [-16, 98], [-14, 76]],
        knuckles: [[17, 70], [34, 76], [50, 84], [62, 94]],
        fingers: [
          { pts: [[58, 70], [64, 76], [66, 94]], w: 13.5, joints: [1] },                                                // little, curled
          { pts: [[46, 56], [52, 66], [52, 86]], w: 15.5, joints: [1] },                                                // ring, curled
          { pts: [[(r + 7) * 0.866, (r + 7) * 0.5], [24, 22], [31, 44], [35, 76]], w: 17, joints: [1, 2] },               // middle
          { pts: [[(r + 6.5) * 0.966, -(r + 6.5) * 0.259], [21, 12], [21, 34], [18, 70]], w: 16.5, joints: [1, 2] },      // index
          { pts: [[-r - 7.5, 0], [-23, 19], [-17, 45], [2, 84]], w: 20, joints: [1] },                                   // thumb
        ],
      }),
      ridge: () => ({
        sleeve: [[10, 152], [68, 148], [84, 400], [-4, 400]],
        palm: [[6, 72], [18, 62], [30, 62], [44, 72], [56, 82], [66, 92], [72, 110], [68, 150], [8, 154], [-2, 124], [-2, 96]],
        knuckles: [[30, 64], [45, 76], [57, 86], [66, 96]],
        fingers: [
          { pts: [[60, 72], [66, 80], [68, 98]], w: 13.5, joints: [1] },
          { pts: [[50, 58], [56, 68], [58, 88]], w: 15.5, joints: [1] },
          { pts: [[30, 18], [38, 32], [42, 54], [46, 78]], w: 17, joints: [1, 2] },
          { pts: [[15.4, -7.1], [30, 6], [34, 30], [30, 64]], w: 16.5, joints: [1, 2] },
          { pts: [[7.2, 15.3], [2, 34], [8, 58], [24, 86]], w: 20, joints: [1] },
        ],
      }),
    };
    function hand(cx, cy, rot, grip, inn = 1) {
      const e = ease(inn); if (e <= 0) return '';
      const g = [];
      // the sleeve (a dark shirt cuff, its seam), under the wrist
      const sv = grip.sleeve;
      g.push(`<path d="M${sv[0].join(',')} Q${f2((sv[0][0] + sv[1][0]) / 2)},${f2((sv[0][1] + sv[1][1]) / 2 - 6)} ${sv[1].join(',')} L${sv[2].join(',')} L${sv[3].join(',')} Z" fill="url(#${P}sleeve)" stroke="#0B0E13" stroke-width="0.6"/>`
        + `<path d="M${f2(sv[0][0] + 1)},${f2(sv[0][1] + 12)} Q${f2((sv[0][0] + sv[1][0]) / 2)},${f2((sv[0][1] + sv[1][1]) / 2 + 6)} ${f2(sv[1][0] + 2)},${f2(sv[1][1] + 12)}" fill="none" stroke="#0B0E13" stroke-opacity="0.8" stroke-width="0.9"/>`);
      const fs = grip.fingers, thumb = fs[fs.length - 1];
      // the curled fingers first (behind), then the back of the hand over their roots, then the reaching fingers and the thumb
      fs.slice(0, 2).forEach(f => g.push(finger(f.pts, f.w, { joints: f.joints, nail: false })));
      const pd = smooth(grip.palm, true), cid = `${P}palmClip${skinN++}`;
      g.push(`<defs><clipPath id="${cid}"><path d="${pd}"/></clipPath></defs>`
        + `<path d="${pd}" fill="url(#${P}skinBack)" stroke="${SKIN.edge}" stroke-width="0.5"/>`
        + `<g clip-path="url(#${cid})"><path d="${pd}" fill="none" stroke="${SKIN.deep}" stroke-opacity="0.55" stroke-width="7" filter="url(#${P}handBlur)"/></g>`);
      // the knuckles (lit bumps) and the tendons running back from them toward the wrist, faint
      grip.knuckles.forEach(([x, y], i) => g.push(`<ellipse cx="${x - 1.5}" cy="${y - 1}" rx="${f2(5.4 - i * 0.6)}" ry="3.4" fill="${SKIN.lite}" opacity="0.3" filter="url(#${P}handBlur2)"/>`
        + `<path d="M${x - 1},${y + 5} Q${f2(x - 6 + i)},${y + 26} ${f2(x - 18 + i * 5)},${y + 52}" fill="none" stroke="${SKIN.lite}" stroke-opacity="0.13" stroke-width="2"/>`));
      fs.slice(2, fs.length - 1).forEach(f => g.push(finger(f.pts, f.w, { joints: f.joints })));
      g.push(finger(thumb.pts, thumb.w, { joints: thumb.joints }));
      return `<g transform="translate(0 ${f1((1 - e) * 420)})" opacity="${Math.min(1, e * 2.5).toFixed(3)}"><g filter="url(#${P}handSh)">`
        + `<g transform="translate(${f1(cx)} ${f1(cy)}) rotate(${f2(rot)}) scale(${MM.toFixed(4)})">${g.join('')}</g></g></g>`;
    }

    // ───────────── a detail window (stage space): a control enlarged where the rig leaves room ─────────────
    // The stage round (sx, sy) enlarged m times in a round window at (cx, cy), radius R; its source ringed on the stage with
    // the same dashed ring (the engineering drawing's detail view: no leader drawn across the rig).
    function detail(cx, cy, R, sx, sy, m, id) {
      const T = `translate(${cx} ${cy}) scale(${m}) translate(${-sx} ${-sy})`;
      return { cx, cy, R, m,
        defs: `<clipPath id="${id}"><circle cx="${cx}" cy="${cy}" r="${R}"/></clipPath>`,
        wrap: s => `<g clip-path="url(#${id})">${s === null ? `<circle cx="${cx}" cy="${cy}" r="${R}" fill="#0A0F16"/>` : `<g transform="${T}">${s}</g>`}</g>`,
        frame: (title, cap) => `<circle cx="${cx}" cy="${cy}" r="${R}" fill="none" stroke="#05080C" stroke-width="7"/><circle cx="${cx}" cy="${cy}" r="${R + 3}" fill="none" stroke="#FFFFFF" stroke-opacity="0.8" stroke-width="1.6" stroke-dasharray="7 5"/>`
          + text(cx, cy - R - 16, title, 17, '#FFFFFF', 'middle', 700) + (cap ? text(cx, cy + R + 30, cap, 17, '#E6EDF5', 'middle', 600) : ''),
        src: `<circle cx="${sx}" cy="${sy}" r="${f1(R / m)}" fill="none" stroke="#FFFFFF" stroke-opacity="0.8" stroke-width="1.6" stroke-dasharray="7 5"/>`,
        at: (x, y) => [cx + (x - sx) * m, cy + (y - sy) * m] };
    }
    const HAND_DEFS = `<defs><radialGradient id="${P}skinBack" cx="0.4" cy="0.3" r="0.8"><stop offset="0" stop-color="${SKIN.lite}"/><stop offset="0.45" stop-color="${SKIN.mid}"/><stop offset="1" stop-color="${SKIN.dark}"/></radialGradient>`
      + `<linearGradient id="${P}sleeve" x1="0" y1="0" x2="1" y2="0"><stop offset="0" stop-color="#1A2030"/><stop offset="0.45" stop-color="#34405A"/><stop offset="1" stop-color="#151A26"/></linearGradient>`
      + `<filter id="${P}handBlur" x="-20%" y="-20%" width="140%" height="140%"><feGaussianBlur stdDeviation="2.2"/></filter><filter id="${P}handBlur2" x="-50%" y="-50%" width="200%" height="200%"><feGaussianBlur stdDeviation="1.2"/></filter><filter id="${P}handSh" x="-30%" y="-30%" width="160%" height="160%"><feGaussianBlur in="SourceAlpha" stdDeviation="6"/><feOffset dx="9" dy="12"/><feComponentTransfer><feFuncA type="linear" slope="0.5"/></feComponentTransfer><feMerge><feMergeNode/><feMergeNode in="SourceGraphic"/></feMerge></filter></defs>`;

    return { SPEC, RANGES, rangeOf, reading, band, show, lcdStr, trim, mV, pct, vStr, vAt, edge, COL, head, RIG, rig, FN_ANG, CONV, convT, liveRig, rigControls, ruler, readingMark, bars, offScale, bracket, specLine, lcdBig, uOf, graph, specPage, termCard, DEFS: DEFS + HAND_DEFS, measure, MM, GRIPS, hand, detail, smooth };
  };
})();
