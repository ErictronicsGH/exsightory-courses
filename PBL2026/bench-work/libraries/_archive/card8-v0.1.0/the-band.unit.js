// Unit library: the band (D1·020 card 8, ¶5). "Add them: ±8 mV. The true value lies somewhere between 0.992 V and 1.008 V,
// and the meter cannot tell you where." The rig; the ruler of ¶2–4 with both parts on it (green 5 mV, coral 3 counts);
// Play: the band bracketed (±8 mV), its two edges named in volts, the stretch between them shaded with no point in it (the
// true value is somewhere in there, unmarked: the meter cannot say where); the sum written out under it (U = 5 mV + 3 mV;
// 0.8 % of the reading). This reveals the numeric. Every number follows the supply's knob and the meter's range.
'use strict';
(function () {
  const K = window.SVGKIT('tb-'), D = window.DINKIT(K), Q = window.SPECKIT(K, D);
  const TX = (k, v) => bench.text(k, v);
  const P = k => (bench ? bench.value(k) : undefined);
  const { COL } = Q;
  const BR = [0.3, 0.6], EDGE = [0.9, 0.5], SHADE = [1.5, 0.7], SUM = [2.3, 0.7], DUR = 3.6;
  let hand = false, seenT = 0;
  const watchT = S => S.top(S.g(t2 => { if (t2 < seenT - 0.05) hand = false; seenT = t2; return null; }, ''));
  const st = () => ({ V: P('supplyV') ?? 1, rng: P('meterRange') ?? 2 });
  const RX = 990, RW = 800, RY = 476;

  function scene(stop, t, b) {
    bench = b;
    const S = K.timeline(), g = [], over = [], rg = Q.rig(), rng = P('meterRange') ?? 2, R = Q.rangeOf(rng);
    const bd = Q.band(P('supplyV') ?? 1, rng);
    const win = (w, t2) => (hand ? 1 : K.ease((t2 - w[0]) / w[1]));
    watchT(S);
    over.push(Q.head(960, 102, TX('h1', { U: Q.mV(bd.U) }), COL.band));
    const set = rg.body(R.fn) + rg.leads;
    g.push(K.floor(0, 860, rg.FL, COL.teal, rg.MX, 260) + set + K.reflect(set, rg.FL, 0, 860, 80, 0.18, '#070B12'));
    Q.liveRig(S, rg, st, 3);
    const words = { pct: TX('wPct'), cnt: TX('wCnt') };
    over.push(Q.specLine(1390, 214, words, { size: 36 }).svg);
    const Rl = Q.ruler(RX, RY, RW);
    g.push(`<clipPath id="tb-span"><rect x="${RX - 2}" y="${RY - 140}" width="${RW + 4}" height="260"/></clipPath>`);
    over.push(K.text(RX, RY - 128, TX('rulerT'), 17, '#C9D3DE', 'start', 600) + Rl.svg);
    if (bd.ol) over.push(Q.readingMark(Rl, 'OL') + K.text(RX + RW / 2, RY - 70, TX(rng === 0.2 ? 'olMv' : 'ol'), 20, COL.cnt, 'middle', 700));
    else {
      const vEdge = v => Q.edge(v, R);
      // the stretch the true value is in: shaded, nothing marked in it
      S.top(S.g(t2 => ({ opacity: (0.9 * win(SHADE, t2)).toFixed(3) }), `<g clip-path="url(#tb-span)"><rect x="${Rl.X(-bd.U * 1000)}" y="${RY - 52}" width="${Rl.X(bd.U * 1000) - Rl.X(-bd.U * 1000)}" height="${122}" fill="#FFFFFF" fill-opacity="0.07"/></g>`));
      over.push(`<g clip-path="url(#tb-span)">${Q.bars(Rl, bd)}</g>` + Q.readingMark(Rl, Q.vStr(bd)) + Q.offScale(Rl, bd, TX('offScale', { U: Q.mV(bd.U) })));
      S.top(S.g(t2 => ({ html: `<g clip-path="url(#tb-span)">${Q.bracket(Rl, bd, win(BR, t2), { edges: false, label: TX('pm', { U: Q.mV(bd.U) }) })}</g>` }), ''));
      S.top(S.g(t2 => ({ opacity: win(EDGE, t2).toFixed(3) }), K.text(Rl.X(-bd.U * 1000), RY + 92, vEdge(bd.lo), 18, COL.band, 'middle', 700, true)
        + K.text(Rl.X(bd.U * 1000), RY + 92, vEdge(bd.hi), 18, COL.band, 'middle', 700, true)));
      S.top(S.g(K.appear(SHADE[0] + 0.2, SHADE[1]), (sw => K.text(RX + RW / 2, RY + 134, sw, D.fit(sw, 20, 600, RW), '#FFFFFF', 'middle', 600))(TX('somewhere', { lo: vEdge(bd.lo), hi: vEdge(bd.hi) }))));
      // the sum, under it: U = p·V + n·q, in numbers, then u = U ÷ V
      const y0 = 660, x0 = RX, w = RW;
      const sum = `<rect x="${x0}" y="${y0}" width="${w}" height="150" rx="18" fill="#07151A" fill-opacity="0.95" stroke="#C9D3DE" stroke-opacity="0.7" stroke-width="2" filter="${K.u('soft')}"/>`
        + `<text x="${x0 + w / 2}" y="${y0 + 56}" font-size="30" font-weight="700" text-anchor="middle" font-family="'IBM Plex Sans','Segoe UI',system-ui,sans-serif" fill="#FFFFFF">U = <tspan fill="${COL.pct}">${Q.mV(bd.P)} mV</tspan> + <tspan fill="${COL.cnt}">${Q.mV(bd.C)} mV</tspan> = ±${Q.mV(bd.U)} mV</text>`
        + K.text(x0 + w / 2, y0 + 92, TX('sumS', { p: '0.5 %', v: Q.vStr(bd), n: Q.SPEC.n, q: R.step }), 17, '#C9D3DE', 'middle', 500)
        + K.text(x0 + w / 2, y0 + 128, TX('share', { u: Q.pct(bd.u), v: Q.vStr(bd) }), 21, '#FFFFFF', 'middle', 700);
      S.top(S.g(K.appear(SUM[0], SUM[1]), sum));
    }
    const svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1920 1080" width="1920" height="1080">${K.DEFS}${D.DEFS}${Q.DEFS}`
      + D.lab() + g.join('') + over.join('') + '</svg>';
    return { html: K.layers(svg, S), tl: S };
  }

  let bench = null;
  window.DINKIT.run({
    id: 'the-band',
    watch: ['supplyV', 'meterRange'],
    stops: [{ key: 'band', group: 'p5', title: '@s1Title', dur: DUR, caption: () => { const b = Q.band(P('supplyV') ?? 1, P('meterRange') ?? 2); return bench.text(b.ol ? (b.r === 0.2 ? 'capOLmv' : 'capOL') : 's1Caption', { U: Q.mV(b.U), lo: Q.edge(b.lo, b.R), hi: Q.edge(b.hi, b.R) }); } }],
    scene,
    onHand: () => { hand = true; },
    controls: () => Q.rigControls(Q.rig(), bench),
  });
})();
