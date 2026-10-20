// Unit library: two errors added (D1·020 card 8, ¶2–4). "Let's take the specification apart … It is two errors added
// together. The first scales with the reading: 0.5 % of 1.000 V is 5 mV. The second is fixed, in counts of the last digit.
// On a 3½-digit meter's 2 V range the display runs up to 1.999, so one count is 1 mV, and three counts are 3 mV."
// The rig of ¶0 (the supply, the handheld reading it); the specification as written with its two parts boxed (green: the
// percentage of the reading; coral: the counts); a millivolt ruler round the reading, the same scale in every view of the
// card. 2a: the green part grows out from the reading to ±5 mV (it follows the reading: turn the supply). 2b: the display
// enlarged, its last digit ringed (one count, 1 mV on the 2 V range); three blocks of one count each drop in beyond the
// green part, each side: 3 mV, the same at any reading on the range.
'use strict';
(function () {
  const K = window.SVGKIT('te8-'), D = window.DINKIT(K), Q = window.SPECKIT(K, D);
  const TX = (k, v) => bench.text(k, v);
  const P = k => (bench ? bench.value(k) : undefined);
  const { COL } = Q;
  const A = { line: [0.2, 0.5], ruler: [0.6, 0.6], grow: [1.3, 1.4], card: [2.8, 0.6], dur: 3.8 };
  const B = { zoom: [0.2, 0.6], ring: [0.9, 0.5], drops: [1.6, 0.55], card: [3.5, 0.6], dur: 4.6 };
  let hand = false, seenT = 0;
  const watchT = S => S.top(S.g(t2 => { if (t2 < seenT - 0.05) hand = false; seenT = t2; return null; }, ''));
  const st = () => ({ V: P('supplyV') ?? 1, rng: P('meterRange') ?? 2 });
  const RX = 990, RW = 800, RY = 476;

  function scene(stop, t, b) {
    bench = b;
    const S = K.timeline(), g = [], over = [], rg = Q.rig(), rng = P('meterRange') ?? 2, R = Q.rangeOf(rng);
    const bd = Q.band(P('supplyV') ?? 1, rng), T = hand ? 99 : t;
    watchT(S);
    over.push(Q.head(960, 102, TX('h1'), COL.pct));
    const set = rg.body(R.fn) + rg.leads;
    g.push(K.floor(0, 860, rg.FL, COL.teal, rg.MX, 260) + set + K.reflect(set, rg.FL, 0, 860, 80, 0.18, '#070B12'));
    Q.liveRig(S, rg, st, 3);
    // the specification as written, the part this view is about lit
    const words = { pct: TX('wPct'), cnt: TX('wCnt') }, sl = Q.specLine(1390, 214, words, { lit: stop === 0 ? 'pct' : 'cnt', size: 40 });
    const under = K.text(sl.at.pct[0], 262, TX('uPct'), 17, COL.pct, 'middle', 600, false, `opacity="${stop === 0 ? 1 : 0.45}"`)
      + K.text(sl.at.cnt[0], 262, TX('uCnt'), 17, COL.cnt, 'middle', 600, false, `opacity="${stop === 1 ? 1 : 0.45}"`);
    if (stop === 0) S.top(S.g(K.appear(A.line[0], A.line[1]), sl.svg + under)); else over.push(sl.svg + under);
    // the ruler round the reading (1 mV a tick), clipped to its span; what it shows
    const Rl = Q.ruler(RX, RY, RW);
    const rulerSvg = K.text(RX, RY - 128, TX('rulerT'), 17, '#C9D3DE', 'start', 600) + Rl.svg + Q.readingMark(Rl, bd.ol ? 'OL' : Q.vStr(bd));
    if (stop === 0) S.top(S.g(K.appear(A.ruler[0], A.ruler[1]), rulerSvg)); else over.push(rulerSvg);
    g.push(`<clipPath id="te8-span"><rect x="${RX - 2}" y="${RY - 140}" width="${RW + 4}" height="200"/></clipPath>`);
    if (bd.ol) over.push(K.text(RX + RW / 2, RY - 70, TX(rng === 0.2 ? 'olMv' : 'ol'), 20, COL.cnt, 'middle', 700));
    else S.top(S.g((t2, a) => {
      const T2 = hand ? 99 : t2;
      const fp = stop === 0 ? K.ease((T2 - A.grow[0]) / A.grow[1]) : 1;
      const k = stop === 0 ? 0 : Math.max(0, Math.min(Q.SPEC.n, (T2 - B.drops[0]) / B.drops[1]));
      return { html: `<g clip-path="url(#te8-span)">${Q.bars(Rl, bd, { fp, k })}</g>` + Q.offScale(Rl, bd, TX('offScale', { U: Q.mV(bd.U) })) };
    }, ''));
    // the two terms, each a card: its sum at this reading
    const pctLine = TX('pctLine', { v: Q.vStr(bd), P: Q.mV(bd.P) }), cntLine = TX('cntLine', { q: R.step, C: Q.mV(bd.C) });
    const cardP = bd.ol ? '' : Q.termCard(RX, 620, 380, 128, COL.pct, TX('pctT'), pctLine, TX('pctS')), cardC = bd.ol ? '' : Q.termCard(RX + 420, 620, 380, 128, COL.cnt, TX('cntT'), cntLine, TX('cntS', { r: R.name }));
    if (stop === 0) S.top(S.g(K.appear(A.card[0], A.card[1]), cardP));
    else { over.push(cardP); S.top(S.g(K.appear(B.card[0], B.card[1]), cardC)); }
    // 2b: the display enlarged beside the meter, its last digit ringed (one count); its maximum reading
    if (stop === 1 && !bd.ol) {
      const lcd = rg.at.lcd;
      // the reading as the meter shows it (the conversion's value, steady), its last digit ringed
      S.top(S.g(K.appear(B.zoom[0], B.zoom[1], 10), `<path d="M${lcd[0] - 98 * rg.MS},${lcd[1] - 60} L${70 + 294},${150 + 30} M${lcd[0] - 98 * rg.MS},${lcd[1] + 50} L${70 + 294},${150 + 207}" stroke="${COL.cnt}" stroke-opacity="0.45" stroke-width="1.4" stroke-dasharray="4 4"/>`
        + S.g((t2) => { const T2 = hand ? 99 : t2, ring = K.ease((T2 - B.ring[0]) / B.ring[1]);
          return { html: Q.lcdBig(70, 150, 1.5, Q.lcdStr(bd), R.unit, { ring }).svg }; }, '')
        + K.text(70 + 147, 400, TX('maxRd', { m: Q.show(Q.reading(R.q * Q.SPEC.max, rng)) + ' ' + R.unit }), 17, '#E6EDF5', 'middle', 600)
        + K.text(70 + 147, 426, TX('oneCount', { q: R.step }), 18, COL.cnt, 'middle', 700)));
    }
    const svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1920 1080" width="1920" height="1080">${K.DEFS}${D.DEFS}${Q.DEFS}`
      + D.lab() + g.join('') + over.join('') + '</svg>';
    return { html: K.layers(svg, S), tl: S };
  }

  let bench = null;
  window.DINKIT.run({
    id: 'two-errors',
    watch: ['supplyV', 'meterRange'],
    stops: [
      { key: 'pct', group: 'p2', title: '@s1Title', dur: A.dur, caption: () => { const b = Q.band(P('supplyV') ?? 1, P('meterRange') ?? 2); return bench.text(b.ol ? (b.r === 0.2 ? 'capOLmv' : 'capOL') : 's1Caption', { v: Q.vStr(b), P: Q.mV(b.P) }); } },
      { key: 'cnt', group: 'p4', title: '@s2Title', dur: B.dur, caption: () => { const b = Q.band(P('supplyV') ?? 1, P('meterRange') ?? 2); return bench.text(b.ol ? (b.r === 0.2 ? 'capOLmv' : 'capOL') : 's2Caption', { q: b.R.step, C: Q.mV(b.C) }); } },
    ],
    scene,
    onHand: () => { hand = true; },
    controls: () => Q.rigControls(Q.rig(), bench),
  });
})();
