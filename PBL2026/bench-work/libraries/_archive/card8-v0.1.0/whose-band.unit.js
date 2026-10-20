// Unit library: whose band (D1·020 card 8, ¶7, seed S36). "Remember this meter. It is the instrument you will check your
// microcontroller against, it has an uncertainty of its own, and you can calculate it. When the two disagree, the first
// question is whose band you are standing in."
// The rig, the meter on its 2 V range; the ruler with the meter's band (±8 mV at 1.000 V). A pin for "your MCU's reading"
// (no MCU's numbers are made up here: the pin is the presenter's, dragged along the ruler). Play: the pin lands 5 mV above
// the meter's reading (they disagree by 5 mV, inside the meter's band: the meter cannot tell the two apart), then slides to
// 12 mV (outside it: if the meter is within its specification, the MCU reads at least 4 mV high). The verdict follows the
// pin, the knob and the range.
'use strict';
(function () {
  const K = window.SVGKIT('wb-'), D = window.DINKIT(K), Q = window.SPECKIT(K, D);
  const TX = (k, v) => bench.text(k, v);
  const P = k => (bench ? bench.value(k) : undefined);
  const { COL } = Q;
  const IN = [0.4, 0.6], LAND = [1.2, 0.6], SLIDE = [3.0, 1.4], DUR = 5.4, OFF0 = 5, OFF1 = 12;
  let hand = false, seenT = 0;
  const watchT = S => S.top(S.g(t2 => { if (t2 < seenT - 0.05) hand = false; seenT = t2; return null; }, ''));
  const st = () => ({ V: P('supplyV') ?? 1, rng: P('meterRange') ?? 2 });
  // the pin's offset from the meter's reading (mV): the motion's, or the presenter's
  const offAt = t => (hand ? (P('mcuOff') ?? OFF1) : OFF0 + (OFF1 - OFF0) * K.ease((t - SLIDE[0]) / SLIDE[1]));
  const RX = 990, RW = 800, RY = 494;

  function scene(stop, t, b) {
    bench = b;
    const S = K.timeline(), g = [], over = [], rg = Q.rig(), rng = P('meterRange') ?? 2, R = Q.rangeOf(rng);
    const bd = Q.band(P('supplyV') ?? 1, rng);
    watchT(S);
    over.push(Q.head(960, 102, TX('h1'), COL.mcu));
    const set = rg.body(R.fn) + rg.leads;
    g.push(K.floor(0, 860, rg.FL, COL.teal, rg.MX, 260) + set + K.reflect(set, rg.FL, 0, 860, 80, 0.18, '#070B12'));
    Q.liveRig(S, rg, st, 3);
    over.push(D.callout(560, 214, rg.at.meterTop[0], rg.at.meterTop[1] + 6, TX('meterT'), TX('meterS', { r: R.name })));
    // the S36 seed, as the Flow says it
    over.push(D.panel(RX, 158, RW, 'auto', COL.mcu, TX('seedT'), [{ s: TX('seed1'), size: 19, wrap: true, w: 500, col: '#FFFFFF' }], null, { pad: 22, titleSize: 17 }));
    const Rl = Q.ruler(RX, RY, RW);
    g.push(`<clipPath id="wb-span"><rect x="${RX - 2}" y="${RY - 150}" width="${RW + 4}" height="260"/></clipPath>`);
    over.push(Rl.svg);
    if (bd.ol) { over.push(Q.readingMark(Rl, 'OL') + K.text(RX + RW / 2, RY - 70, TX(rng === 0.2 ? 'olMv' : 'ol'), 20, COL.cnt, 'middle', 700)); }
    else {
      const band = `<g clip-path="url(#wb-span)">${Q.bars(Rl, bd, { pLabel: false })}${Q.bracket(Rl, bd, 1, { edges: false })}</g>` + Q.readingMark(Rl, Q.vStr(bd))
        + K.text(RX + RW / 2, RY + 78, TX('meterBand', { U: Q.mV(bd.U) }), 18, COL.band, 'middle', 700) + Q.offScale(Rl, bd, TX('offScale', { U: Q.mV(bd.U) }));
      S.top(S.g(K.appear(IN[0], IN[1]), band));
      // the pin: its head above the ruler (its reading), its stem down to the axis; the gap to the band's edge when outside
      S.top(S.g(t2 => {
        const T2 = hand ? 99 : t2, land = hand ? 1 : K.ease((T2 - LAND[0]) / LAND[1]);
        if (land <= 0) return { html: '' };
        const off = Math.max(-Rl.span, Math.min(Rl.span, offAt(T2))), x = Rl.X(off), Um = bd.U * 1000, out = Math.abs(off) > Um + 1e-9;
        const vM = bd.V + off / 1000, vs = Q.edge(vM, R);   // (to a tenth of a mV, as the pin can be set)
        const lab = TX('pin', { v: vs }), w = Q.measure(lab, 17, 700) + 28, hy = RY - 170 - (1 - land) * 40;
        const lx = Math.max(RX + w / 2, Math.min(RX + RW - w / 2, x));
        const gap = out ? (() => { const e = Rl.X(Math.sign(off) * Um), d = Math.abs(off) - Um;
          return `<path d="M${e},${RY + 58} H${x}" stroke="${COL.mcu}" stroke-width="2.2" marker-end="url(#wb-arr)"/>` + K.text((e + x) / 2, RY + 82, TX('gap', { d: Q.trim(d, R.unit === 'mV' ? 1 : 1) }), 16, COL.mcu, 'middle', 700); })() : '';
        return { html: `<g opacity="${land.toFixed(3)}"><line x1="${x}" y1="${hy + 18}" x2="${x}" y2="${RY + 10}" stroke="${COL.mcu}" stroke-width="3"/><circle cx="${x}" cy="${RY}" r="6" fill="${COL.mcu}" stroke="#FFFFFF" stroke-width="1.4"/>`
          + `<rect x="${lx - w / 2}" y="${hy - 18}" width="${w}" height="36" rx="18" fill="#07111A" fill-opacity="0.95" stroke="${COL.mcu}" stroke-width="2" filter="${K.u('soft')}"/>`
          + K.text(lx, hy + 6, lab, 17, '#FFFFFF', 'middle', 700) + gap + '</g>' };
      }, ''));
      // the verdict: inside the meter's band, or outside it by how much
      S.top(S.g(t2 => {
        const T2 = hand ? 99 : t2, op = hand ? 1 : K.ease((T2 - LAND[0] - LAND[1]) / 0.5);
        if (op <= 0) return { html: '' };
        const off = offAt(T2), Um = bd.U * 1000, out = Math.abs(off) > Um + 1e-9, d = Math.abs(off) - Um;
        const col = out ? COL.mcu : '#C9D3DE', head = TX(out ? 'outT' : 'inT'), line = out ? TX(off > 0 ? 'outHigh' : 'outLow', { d: Q.trim(d, 1) }) : TX('inS', { o: Q.trim(Math.abs(off), 1), U: Q.mV(bd.U) });
        return { html: `<g opacity="${op.toFixed(3)}"><rect x="${RX}" y="${640}" width="${RW}" height="128" rx="18" fill="#07151A" fill-opacity="0.95" stroke="${col}" stroke-width="2" filter="${K.u('soft')}"/>`
          + K.text(RX + 26, 682, head, 18, col, 'start', 700, false, 'letter-spacing="1.4"') + K.text(RX + 26, 720, line, D.fit(line, 21, 600, RW - 52), '#FFFFFF', 'start', 600)
          + K.text(RX + 26, 752, TX('next'), D.fit(TX('next'), 16, 500, RW - 52), '#C9D3DE', 'start', 500) + '</g>' };
      }, ''));
    }
    const defs = `<defs><marker id="wb-arr" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="7" markerHeight="7" orient="auto-start-reverse"><path d="M0,0 L10,5 L0,10 Z" fill="${COL.mcu}"/></marker></defs>`;
    const svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1920 1080" width="1920" height="1080">${K.DEFS}${D.DEFS}${Q.DEFS}${defs}`
      + D.lab() + g.join('') + over.join('') + '</svg>';
    return { html: K.layers(svg, S), tl: S };
  }

  let bench = null;
  window.DINKIT.run({
    id: 'whose-band',
    watch: ['supplyV', 'meterRange', 'mcuOff'],
    liveControls: true,
    stops: [{ key: 'whose', group: 'p7', title: '@s1Title', dur: DUR, caption: '@s1Caption' }],
    scene,
    // the hand takes the pin where the motion has it
    onHand: p => { if (!hand && p === 'mcuOff') bench.setValue('mcuOff', +offAt(bench.state.reduced ? 99 : bench.state.t).toFixed(2)); hand = true; },
    controls: () => {
      const Rl = Q.ruler(RX, RY, RW), off = offAt(bench.state.reduced ? 99 : bench.state.t);
      return Q.rigControls(Q.rig(), bench).concat([{ param: 'mcuOff', kind: 'slide', x: Rl.X(Math.max(-15, Math.min(15, off))), y: RY - 100, w: 56, h: 200, x0: RX, x1: RX + RW, min: -15, max: 15, step: 0.1, wheel: 0.5, tip: 'tipPin' }]);
    },
  });
})();
