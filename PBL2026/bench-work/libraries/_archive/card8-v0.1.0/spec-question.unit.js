// Unit library: the question (D1·020 card 8, ¶0–1). "A 3½-digit meter on its 2 V range reads 1.000 V. Its specification is
// ±(0.5 % of reading + 3 counts). What is the band the true value lies in?" The course's handheld (cards 3–5) reads the
// course's bench supply; the meter's specification page beside them, its 2 V row lit. Play: the supply's OUTPUT on, the
// meter's reading comes up (it converts 2.5 times a second), the page's row lights, then the question. No answer: the
// numeric waits. The supply's VOLTAGE knob, the meter's dial and RANGE key are the presenter's (every value follows them).
'use strict';
(function () {
  const K = window.SVGKIT('sq-'), D = window.DINKIT(K), Q = window.SPECKIT(K, D);
  const TX = (k, v) => bench.text(k, v);
  const P = k => (bench ? bench.value(k) : undefined);
  const { COL } = Q;
  const OUT_AT = 0.5, ROW = [1.4, 0.6], ASK = [2.4, 0.7], DUR = 4.0;
  // the presenter's hand on a control: the motion gives way to it until the view runs from its start again
  let hand = false, seenT = 0;
  const watchT = S => S.top(S.g(t2 => { if (t2 < seenT - 0.05) hand = false; seenT = t2; return null; }, ''));
  const st = t => ({ V: P('supplyV') ?? 1, rng: P('meterRange') ?? 2, out: hand || t >= OUT_AT });

  function scene(stop, t, b) {
    bench = b;
    const S = K.timeline(), g = [], over = [], rng = P('meterRange') ?? 2, rg = Q.rig(), R = Q.rangeOf(rng);
    watchT(S);
    over.push(Q.head(960, 102, TX('h1'), COL.cyan));
    // the rig on the bench
    const set = rg.body(R.fn) + rg.leads;
    g.push(K.floor(0, 860, rg.FL, COL.teal, rg.MX, 260) + set + K.reflect(set, rg.FL, 0, 860, 80, 0.18, '#070B12'));
    Q.liveRig(S, rg, st, 3);
    over.push(D.callout(560, 214, rg.at.meterTop[0], rg.at.meterTop[1] + 6, TX('meterT'), TX('meterS', { r: R.name, q: R.step })),
      D.callout(200, 330, rg.at.supplyTop[0] - 60, rg.at.supplyTop[1] + 4, TX('supplyT'), TX('supplyS')));
    // the meter's specification page: its DC voltage table, the row of the range set lit on Play
    const L = ['title', 'page', 'display', 'accuracy', 'cond', 'dcv', 'colRange', 'colRes', 'colAcc', 'acc', 'notes1', 'notes2'].reduce((o, k) => (o[k] = TX('pg_' + k), o), {});
    const rowIx = { 0.2: 0, 2: 1, 20: 2, 200: 3, 600: 4 }[rng];
    S.top(S.g(t2 => ({ html: Q.specPage(900, 170, 560, L, { hiRow: rowIx, hi: hand ? 1 : K.ease((t2 - ROW[0]) / ROW[1]) }).svg }), ''));
    over.push(K.text(1180, 760, TX('pageCap'), 16, '#AEB8C3', 'middle', 500));
    // the question (the PLAN's numeric, as the learners answer it)
    const ask = D.panel(1492, 214, 368, 'auto', COL.cyan, TX('askT'), [
      { s: TX('ask1', { v: (rd => (rd.ol ? 'OL' : Q.vStr(rd)))(Q.reading(P('supplyV') ?? 1, rng)), r: R.name }), size: 19, wrap: true, w: 600, col: '#FFFFFF' },
      { s: TX('ask2'), size: 19, wrap: true, gap: 40 },
      { s: TX('ask3'), size: 19, wrap: true, gap: 40, w: 700, col: COL.cyan }], 'ask', { pad: 26 });
    S.top(S.g(K.appear(ASK[0], ASK[1]), ask));
    const svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1920 1080" width="1920" height="1080">${K.DEFS}${D.DEFS}${Q.DEFS}`
      + D.lab() + g.join('') + over.join('') + '</svg>';
    return { html: K.layers(svg, S), tl: S };
  }

  let bench = null;
  window.DINKIT.run({
    id: 'spec-question',
    watch: ['supplyV', 'meterRange'],
    stops: [{ key: 'ask', group: 'p0', title: '@s1Title', dur: DUR, caption: '@s1Caption', captionMark: '?' }],
    scene,
    onHand: () => { hand = true; },
    controls: () => Q.rigControls(Q.rig(), bench),
  });
})();
