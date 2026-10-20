// Unit library: down the range (D1·020 card 8, ¶6). "Now slide the reading down to 0.100 V. The percentage part shrinks to
// half a millivolt, but the counts stay at 3 mV. The band is ±3.5 mV — 3.5 % of the reading. Near the bottom of a range the
// counts dominate, which is why you choose the lowest range that still holds the reading."
// The rig; the ruler of ¶2–5 (the same scale) above the Equation's graph: the band as a share of the reading against the
// reading, u = 0.5 % + 3 counts ÷ V, as two stacked parts (the percentage part flat at 0.5 %, green; the counts' share
// coral above it). 4a: the supply's knob turned from 1.000 V down to 0.100 V; the meter follows (2.5 conversions a second),
// the green part shrinks on the ruler, the coral stays; on the graph a pen draws the curve under the reading as it goes
// (① 1.000 V: ±8 mV, 0.8 %; ② 0.100 V: ±3.5 mV, 3.5 %), then the rest of the range, 0.05 … 1.999 V. 4b: the dial turned to
// mV (the 200 mV range, one count 0.1 mV): the meter reads 100.0 mV; the band shrinks to ±0.8 mV (② kept as a dashed
// ghost); the 200 mV range's own curve is drawn and the reading drops onto it: ③ 0.8 %. Afterwards the knob, the dial and
// RANGE are the presenter's: every number follows them.
'use strict';
(function () {
  const K = window.SVGKIT('dr-'), D = window.DINKIT(K), Q = window.SPECKIT(K, D);
  const TX = (k, v) => bench.text(k, v);
  const P = k => (bench ? bench.value(k) : undefined);
  const { COL } = Q;
  const V0 = 1.000, V1 = 0.100;
  // Paced to ¶6 as said (140 words a minute; the beats on its words, times from the view's start). 4a: "Now slide the
  // reading down to 0.100 V" (0.4 … 3.0: a hand turns the knob, 8.1°, until "half a millivolt", 6.0); "The percentage part
  // shrinks to half a millivolt" (3.9 … 6.4: the green part lit as it shrinks), "but the counts stay at 3 mV" (7.3 … 9.4: the
  // coral lit), "The band is ±3.5 mV — 3.5 % of the reading" (9.9 … 14.1: ② and its row). 4b: "Near the bottom of a range
  // the counts dominate" (0 … 2.9: the rest of the 2 V range drawn), "which is why you choose the lowest range that still
  // holds the reading" (3.8 … 9.4: the hand turns the dial to mV on "the lowest range", 6.2; ③ on "holds the reading").
  const A = { handIn: [0.0, 0.55], turn: [0.6, 5.4], handOut: [6.3, 0.7], glowP: [3.9, 6.6], glowC: [7.6, 9.6], two: [11.0, 0.4], det: [0.1, 0.5], dur: 14.6 };
  const B = { rest: [0.3, 2.6], names: [2.7, 0.6], det: [3.8, 0.5], handIn: [3.9, 0.6], dial: [6.2, 0.6], swap: 6.9, shrink: [7.0, 0.8], pen: [7.2, 1.4], handOut: [7.1, 0.7], row: [8.6, 0.5], dur: 9.6 };
  const win = (t, w) => K.ease((t - w[0]) / w[1]);
  const bump = (t, w, d = 0.35) => K.ease((t - w[0]) / d) * (1 - K.ease((t - w[1]) / d));   // lit over [a, b], easing in and out
  let hand = false, seenT = 0;
  const watchT = S => S.top(S.g(t2 => { if (t2 < seenT - 0.05) hand = false; seenT = t2; return null; }, ''));
  let stopNow = 0;
  // the rig at a moment of this view's motion (or the presenter's settings, once a hand is on a control)
  function st(t, i = stopNow) {
    if (hand) return { V: P('supplyV') ?? 1, rng: P('meterRange') ?? 2 };
    if (i === 0) return { V: V0 + (V1 - V0) * K.ease((t - A.turn[0]) / A.turn[1]), rng: 2 };
    const f = (t - B.dial[0]) / B.dial[1];
    return { V: V1, rng: t >= B.swap ? 0.2 : 2, ang: f > 0 && f < 1.2 ? -70 + 35 * K.ease(f) : null, blank: t >= B.dial[0] && t < B.swap };
  }
  // the dial's angle at a moment of 4b (V⎓ −70°, mV −35°)
  const dialAng = t => { const s = st(t, 1); return s.ang != null ? s.ang : (s.rng === 0.2 ? -35 : -70); };
  // the knob's angle (single-turn, 270° for 30 V: 9° a volt)
  const knobAng = V => -135 + 270 * V / 30;
  const RX = 990, RW = 800, RY = 300;
  const GX = 1000, GY = 420, GW = 800, GH = 360;

  function scene(stop, t, b) {
    bench = b; stopNow = stop;
    const S = K.timeline(), g = [], over = [], rg = Q.rig();
    const s0 = st(hand ? 99 : t), R0 = Q.rangeOf(s0.rng);
    watchT(S);
    over.push(Q.head(960, 102, TX(stop === 0 ? 'h1a' : 'h1b'), stop === 0 ? COL.cnt : COL.teal));
    const set = rg.body(R0.fn) + rg.leads;
    g.push(K.floor(0, 860, rg.FL, COL.teal, rg.MX, 260) + set + K.reflect(set, rg.FL, 0, 860, 80, 0.18, '#070B12'));
    Q.liveRig(S, rg, st, 5);
    // what the meter shows at the last conversion (the ruler and the graph follow the reading, not the knob)
    const shown = t2 => { const s = st(hand ? 99 : Q.convT(t2)); return Q.band(s.V, s.rng); };
    // ── the ruler
    const Rl = Q.ruler(RX, RY, RW);
    g.push(`<clipPath id="dr-span"><rect x="${RX - 2}" y="${RY - 140}" width="${RW + 4}" height="250"/></clipPath>`);
    over.push(K.text(RX, RY - 128, TX('rulerT'), 17, '#C9D3DE', 'start', 600) + Rl.svg);
    const ghost = stop === 1 ? Q.band(V1, 2) : null;
    S.top(S.g(t2 => {
      const T2 = hand ? 99 : t2;
      let bd = shown(t2); const real = bd;   // (the label always says the band of the reading shown)
      if (bd.ol) return { html: Q.readingMark(Rl, 'OL') + K.text(RX + RW / 2, RY - 70, TX(bd.r === 0.2 ? 'olMv' : 'ol'), 20, COL.cnt, 'middle', 700) };
      // 4b: the counts' part shrinks from the 2 V range's to the 200 mV range's as the meter changes range
      if (stop === 1 && !hand && T2 >= B.swap) {
        const f = K.ease((T2 - B.shrink[0]) / B.shrink[1]), q = 0.001 + (0.0001 - 0.001) * f, C = Q.SPEC.n * q;
        bd = Object.assign({}, bd, { R: Object.assign({}, bd.R, { q }), C, U: bd.P + C, u: (bd.P + C) / bd.V });
      }
      const gh = ghost && (hand || T2 >= B.swap) ? `<rect x="${Rl.X(-ghost.U * 1000)}" y="${RY - 52}" width="${Rl.X(ghost.U * 1000) - Rl.X(-ghost.U * 1000)}" height="34" fill="none" stroke="#FFFFFF" stroke-opacity="0.55" stroke-width="1.6" stroke-dasharray="6 5"/>`
        + K.text(Rl.X(ghost.U * 1000) + 10, RY - 28, TX('ghost', { U: Q.mV(ghost.U) }), 15, '#C9D3DE', 'start', 600) : '';
      // 4a: each part lit while the sentence names it
      const lit = stop === 0 && !hand ? { glowP: bump(T2, A.glowP), glowC: bump(T2, A.glowC) } : {};
      return { html: `<g clip-path="url(#dr-span)">${gh}${Q.bars(Rl, bd, lit)}${Q.bracket(Rl, bd, 1, { edges: false, label: TX('pmU', { U: Q.mV(real.U), u: Q.pct(real.u) }) })}</g>` + Q.readingMark(Rl, Q.vStr(bd)) + Q.offScale(Rl, bd, TX('offScale', { U: Q.mV(bd.U) })) };
    }, ''));
    // ── the graph
    const G = Q.graph(GX, GY, GW, GH, { xl: TX('xl'), yl: TX('yl') });
    over.push(G.svg);
    g.push(`<clipPath id="dr-plot"><rect x="${GX}" y="${GY}" width="${GW}" height="${GH}"/></clipPath>`);
    const LO = 0.05, HI = 1.999;
    // the part of the 2 V range's curve drawn so far: under the reading as it falls, then the rest of the range
    const drawn = t2 => {
      if (hand) return [LO, HI];
      if (stop === 0) return [Math.min(V0, Math.max(LO, shown(t2).V)), V0];
      const r = win(t2, B.rest);   // 4b: "the counts dominate": the rest of the range, down to 0.05 V and up to 1.999 V
      return [V1 * Math.pow(LO / V1, r), V0 + (HI - V0) * r];
    };
    const area2 = (a, b2) => (b2 - a < 1e-4 ? '' : `<path d="${G.area(a, b2, 2)}" fill="${COL.cnt}" fill-opacity="0.24"/>`
      + `<rect x="${G.X(a)}" y="${G.Y(Q.SPEC.p)}" width="${G.X(b2) - G.X(a)}" height="${G.Y(0) - G.Y(Q.SPEC.p)}" fill="${COL.pct}" fill-opacity="0.55"/>`
      + K.neon(G.curveLog(a, b2, 2), '#FFFFFF', 2.6, 'soft'));
    S.top(S.g(t2 => { const [a, b2] = drawn(t2); return { html: `<g clip-path="url(#dr-plot)">${area2(a, b2)}</g>` }; }, ''));
    // the two parts named on the graph (once the whole range is drawn)
    const names = K.text(GX + GW - 12, G.Y(0) - 8, TX('floorLab'), 14.5, '#06281A', 'end', 700)
      + K.text(G.X(0.5), G.Y(Q.uOf(0.5, 2)) - 40, TX('cntLab'), 16, COL.cnt, 'start', 700);
    S.top(S.g(t2 => ({ opacity: (hand ? 1 : stop === 1 ? win(t2, B.names) : 0).toFixed(3) }), names + K.text(G.X(1.6), G.Y(Q.uOf(1.6, 2)) - 12, TX('range2'), 15, '#FFFFFF', 'middle', 700)));
    // 4b: the 200 mV range's own curve (the same shape, ten times narrower), drawn by the pen from its top end down
    if (stop === 1) {
      S.top(S.g(t2 => {
        const f = hand ? 1 : K.ease((t2 - B.pen[0]) / B.pen[1]); if (f <= 0) return { html: '' };
        const a = 0.1999 * Math.pow(0.005 / 0.1999, f);
        return { html: `<g clip-path="url(#dr-plot)"><path d="${G.area(a, 0.1999, 0.2)}" fill="${COL.teal}" fill-opacity="0.16"/>` + K.neon(G.curveLog(a, 0.1999, 0.2), COL.teal, 2.4, 'soft') + '</g>'
          + (f > 0.95 ? `<rect x="${G.X(0.1999) + 8}" y="${G.Y(0.0065) - 4}" width="${Q.measure(TX('range02'), 15, 700) + 16}" height="26" rx="8" fill="#07111A" fill-opacity="0.9" stroke="${COL.teal}" stroke-opacity="0.7"/>` + K.text(G.X(0.1999) + 16, G.Y(0.0065) + 14, TX('range02'), 15, COL.teal, 'start', 700) : '') };
      }, ''));
    }
    // the examples (the Equation's): ① 1.000 V, ② 0.100 V on 2 V, ③ 0.100 V on 200 mV; each a dot and its number, and a row of
    // the key in the plot's empty corner
    const num = (x, y, n, col) => `<circle cx="${x}" cy="${y}" r="7" fill="${col}" stroke="#FFFFFF" stroke-width="1.6"/><circle cx="${x + 18}" cy="${y - 18}" r="12" fill="#07111A" stroke="${col}" stroke-width="1.8"/>`
      + K.text(x + 18, y - 13, String(n), 14, '#FFFFFF', 'middle', 700);
    const EX = [[V0, 2, 1], [V1, 2, 2], [V1, 0.2, 3]];
    const kx = 1336, ky = 434, kw = 448;
    const keyBox = n => `<rect x="${kx}" y="${ky}" width="${kw}" height="${34 + 30 * n}" rx="12" fill="#07111A" fill-opacity="0.92" stroke="#2C4458"/>` + K.text(kx + 18, ky + 24, TX('keyT'), 14.5, '#AEB8C3', 'start', 700, false, 'letter-spacing="1.2"');
    const keyRow = (k, [V, r, n]) => { const bd = Q.band(V, r);
      return `<circle cx="${kx + 30}" cy="${ky + 50 + 30 * k}" r="11" fill="#07111A" stroke="${n === 3 ? COL.teal : '#FFFFFF'}" stroke-width="1.6"/>` + K.text(kx + 30, ky + 55 + 30 * k, String(n), 13, '#FFFFFF', 'middle', 700)
        + K.text(kx + 52, ky + 56 + 30 * k, TX('keyRow', { v: Q.vStr(bd), r: bd.R.name, U: Q.mV(bd.U), u: Q.pct(bd.u) }), D.fit(TX('keyRow', { v: Q.vStr(bd), r: bd.R.name, U: Q.mV(bd.U), u: Q.pct(bd.u) }), 16, 600, kw - 66), '#E6EDF5', 'start', 600); };
    const exAt = ([V, r]) => [G.X(V), G.Y(Q.uOf(V, r))];
    if (stop === 0) {
      over.push(num(...exAt(EX[0]), 1, '#FFFFFF'));
      S.top(S.g(t2 => ({ opacity: hand ? 1 : win(t2, A.two).toFixed(3) }), num(...exAt(EX[1]), 2, '#FFFFFF')));
      S.top(S.g(t2 => { const two = hand || t2 >= A.two[0]; return { html: keyBox(two ? 2 : 1) + keyRow(0, EX[0]) + (two ? keyRow(1, EX[1]) : '') }; }, ''));
    } else {
      over.push(num(...exAt(EX[0]), 1, '#FFFFFF'), num(...exAt(EX[1]), 2, '#FFFFFF'));
      S.top(S.g(t2 => ({ opacity: hand ? 1 : K.ease((t2 - B.row[0]) / B.row[1]).toFixed(3) }), num(...exAt(EX[2]), 3, COL.teal)));
      S.top(S.g(t2 => { const three = hand || t2 >= B.row[0]; return { html: keyBox(three ? 3 : 2) + keyRow(0, EX[0]) + keyRow(1, EX[1]) + (three ? keyRow(2, EX[2]) : '') }; }, ''));
    }
    // the reading now: a ring on its range's curve (it hops at each conversion)
    S.top(S.g(t2 => {
      const T2 = hand ? 99 : t2, bd = shown(t2);
      if (bd.ol || !(bd.V > 0)) return { html: '' };
      let u2 = Q.uOf(bd.V, bd.r);
      // 4b: the ring drops from ② onto the 200 mV range's curve as the meter changes range
      if (stop === 1 && !hand) { const f = T2 < B.swap ? 0 : K.ease((T2 - B.shrink[0]) / B.shrink[1]); u2 = Q.uOf(V1, 2) + (Q.uOf(V1, 0.2) - Q.uOf(V1, 2)) * f; }
      const x = G.X(bd.V), y = G.Y(Math.min(0.07, u2));
      return { html: `<circle cx="${x}" cy="${y}" r="13" fill="none" stroke="${COL.teal}" stroke-width="2.6" filter="${K.u('soft')}"/><circle cx="${x}" cy="${y}" r="13" fill="none" stroke="#FFFFFF" stroke-width="1.2"/>` };
    }, ''));
    // ── the hand on the control, and the control enlarged (the turn is small on the stage: 8.1° of the knob's 270°)
    // 4a: the supply's VOLTAGE knob, the hand on its rim turning it down with the reading; 4b: the meter's dial, the hand on
    // its ridge turning it from V⎓ to mV. The window enlarges the stage itself (the same knob, pointer and hand), with the
    // pointer's start dashed and the turn drawn as an arc; it is the motion's: a presenter's hand on a control hides it.
    const W = stop === 0 ? A : B, inn = t2 => (hand ? 0 : win(t2, W.handIn) * (1 - win(t2, W.handOut)));
    const ctl = stop === 0 ? rg.at.knob : rg.at.dial, kR = stop === 0 ? rg.at.knobR : rg.at.dialR;
    const grip = stop === 0 ? Q.GRIPS.knob(kR / Q.MM) : Q.GRIPS.ridge();
    const rotAt = t2 => (stop === 0 ? knobAng(st(t2).V) - knobAng(V0) : dialAng(t2) + 70);
    const handAt = t2 => Q.hand(ctl[0], ctl[1], rotAt(t2), grip, inn(t2));
    S.top(S.g(t2 => ({ html: handAt(hand ? 99 : t2) }), ''));
    const Dt = Q.detail(250, 292, 136, ctl[0], ctl[1], stop === 0 ? 3.2 : 1.9, 'dr-det');
    g.push(`<defs>${Dt.defs}<marker id="dr-arr" viewBox="0 0 10 10" refX="7" refY="5" markerWidth="5" markerHeight="5" orient="auto"><path d="M0,0 L10,5 L0,10 Z" fill="#FFFFFF"/></marker></defs>`);
    const detOp = t2 => (hand ? 0 : win(t2, W.det));
    S.top(S.g(t2 => ({ opacity: detOp(t2).toFixed(3) }), Dt.wrap(null) + Dt.wrap(set)));
    S.top(S.g((t2, a) => {
      const op = detOp(t2); if (op <= 0) return { html: '' };
      const s = st(t2), kr = kR * Dt.m;
      // the control's moving part, enlarged: the supply's face (its knob's pointer) or the dial while it turns; the hand
      const live = stop === 0 ? rg.face(s.V, true, a, true) : (s.ang != null ? rg.dial(s.ang) : '');
      // the pointer's start (dashed) and the turn (an arc just outside the knob's rim; on the dial, over its face)
      const a0 = stop === 0 ? knobAng(V0) : -70, a1 = stop === 0 ? knobAng(s.V) : dialAng(t2), rad = stop === 0 ? kr * 1.07 : kr * 0.82;
      const pt = (ang, r) => [Dt.cx + r * Math.sin(ang * Math.PI / 180), Dt.cy - r * Math.cos(ang * Math.PI / 180)];
      const [g0x, g0y] = pt(a0, stop === 0 ? kr * 0.22 : kr * 0.3), [g1x, g1y] = pt(a0, stop === 0 ? kr * 0.88 : kr * 0.95);
      const turned = Math.abs(a1 - a0) > 0.3, [ax, ay] = pt(a0, rad), [bx, by] = pt(a1, rad);
      const marks = `<line x1="${g0x.toFixed(1)}" y1="${g0y.toFixed(1)}" x2="${g1x.toFixed(1)}" y2="${g1y.toFixed(1)}" stroke="#FFFFFF" stroke-opacity="0.75" stroke-width="2" stroke-dasharray="5 4"/>`
        + (turned ? `<path d="M${ax.toFixed(1)},${ay.toFixed(1)} A${rad.toFixed(1)},${rad.toFixed(1)} 0 0 ${a1 > a0 ? 1 : 0} ${bx.toFixed(1)},${by.toFixed(1)}" fill="none" stroke="#FFFFFF" stroke-width="2.4" marker-end="url(#dr-arr)"/>` : '');
      const cap = stop === 0 ? TX('detKnobCap', { a: (Math.abs(a1 - a0)).toFixed(1), v0: V0.toFixed(3), v: s.V.toFixed(3) }) : TX(s.rng === 0.2 ? 'detDialCap2' : 'detDialCap');
      return { html: `<g opacity="${op.toFixed(3)}">${Dt.wrap(live + handAt(t2))}${marks}${Dt.frame(TX(stop === 0 ? 'detKnob' : 'detDial'), cap)}${Dt.src}</g>` };
    }, ''));
    const svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1920 1080" width="1920" height="1080">${K.DEFS}${D.DEFS}${Q.DEFS}`
      + D.lab() + g.join('') + over.join('') + '</svg>';
    return { html: K.layers(svg, S), tl: S };
  }

  let bench = null;
  const capVals = i => { const s = st(99, i), b = Q.band(s.V, s.rng); return { ol: b.ol, mv: b.r === 0.2, v: Q.vStr(b), P: Q.mV(b.P), C: Q.mV(b.C), U: Q.mV(b.U), u: Q.pct(b.u), q: b.R.step, r: b.R.name }; };
  window.DINKIT.run({
    id: 'down-the-range',
    watch: ['supplyV', 'meterRange'],
    // the scene is drawn again when the meter changes range in 4b (its LCD's unit and dial are part of the body)
    phase: (i, T) => String(st(T, i).rng),
    stops: [
      { key: 'down', group: 'p6', title: '@s1Title', dur: A.dur, caption: () => { const c = capVals(0); return bench.text(c.ol ? (c.mv ? 'capOLmv' : 'capOL') : 's1Caption', c); } },
      { key: 'range', group: 'p6b', title: '@s2Title', dur: B.dur, caption: () => { const c = capVals(1); return bench.text(c.ol ? (c.mv ? 'capOLmv' : 'capOL') : 's2Caption', c); } },
    ],
    scene,
    // the hand takes the knob (or the dial, RANGE) where the motion has it: the knob's setting and the range stay as shown
    onHand: () => { if (!hand) { const s = st(bench.state.reduced ? 99 : bench.state.t); bench.setValue('supplyV', +s.V.toFixed(4)); bench.setValue('meterRange', s.rng); } hand = true; },
    controls: () => Q.rigControls(Q.rig(), bench),
  });
})();
