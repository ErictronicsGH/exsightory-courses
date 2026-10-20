// Unit library: like the eye for the brain (D1·030 card 1, ¶0): "At the start of the day, the eye turned light into neural
// signals the brain could work with. The brain never handles light itself; it handles what the sense organ made of it. An
// electronic measurement system has the same arrangement. In electronics, measurements mostly begin with sensing."
// Above: D1·010's eye and visual pathway (img/head.svg, made by sense-kit/make_head.py from prototypes/eye-to-brain-2d's
// overview: the Le Grand eye to scale, the head and pathway approximate), the jar's light focused on the retina, signals
// leaving on the optic nerve for the visual cortex. Below: the card's bench at 0.62 scale, the same four roles: the lamp's
// light, the LDR sensor, a voltage on the lead, the microcontroller. A table pairs the roles; the lamp's dimmer sets the light
// and every value in it follows.
'use strict';
(function () {
  const K = window.SVGKIT('es1-'), D = window.DINKIT(K), Z = window.SRCKIT(K, D), N = window.SENKIT(K, D);
  const TX = (k, v) => bench.text(k, v);
  // paced to ¶0 (49 words, 21.0 s at 140 a minute): "At the start of the day, the eye turned light into neural signals the
  // brain could work with" (the eye, from the first frame: its roles 1 … 4 marked 0.8 … 4.6, signals on the pathway from 3.0);
  // "The brain never handles light itself; it handles what the sense organ made of it" (its line 8.2); "An electronic
  // measurement system has the same arrangement" (the bench 14.6, its roles 15.4 … 16.9); "In electronics, measurements mostly
  // begin with sensing" (the sensor ringed 18.4, SENSING 19.0)
  const W = { r1: 0.8, r2: 2.0, r3: 3.2, r4: 4.4, pulses: 3.0, never: 8.2, same: 14.0, bench: 14.6, b1: 15.4, b2: 15.9, b3: 16.4, b4: 16.9, ring: 18.4, sensing: 19.0, dur: 21.0 };
  // the head picture (crop of the overview, its own pixels) and where it goes
  const HEAD = { w: 1660, h: 770, s: 0.5, x: 70, y: 84,
    lines: { nerve: [[1085.0, 448.0], [1115.6, 443.2], [1156.4, 435.7], [1197.2, 427.6], [1238.0, 419.4]], tract: [[1238.0, 419.4], [1272.0, 414.0], [1306.0, 407.8], [1333.2, 402.4]],
      up: [[1333.2, 402.4], [1380.8, 361.6], [1448.8, 334.4], [1516.8, 327.6], [1578.0, 337.8]], mid: [[1333.2, 402.4], [1401.2, 385.4], [1476.0, 371.8], [1537.2, 365.0], [1581.4, 361.6]],
      meyer: [[1333.2, 402.4], [1299.2, 436.4], [1312.8, 467.0], [1380.8, 450.0], [1469.2, 419.4], [1537.2, 392.2], [1578.0, 378.6]] },
    spots: [[1081.1, 459.3], [1081.1, 440.7]], jar: [150.0, 450.0], eye: [1044.2, 450.0], brain: [1374.0, 314.0] };
  const hp = ([x, y]) => [HEAD.x + x * HEAD.s, HEAD.y + y * HEAD.s];
  // the bench below, scaled: the sensor right under the eye
  const RS = 0.42, RTY = 476;
  const BASE = new URL('.', document.currentScript.src).href;
  // the smooth curve the overview draws through its points (Catmull–Rom, its tension 0.5), so pulses ride the drawn line
  function smooth(pts, t = 0.5) {
    const Q = [pts[0], ...pts, pts[pts.length - 1]];
    let d = `M${Q[1][0].toFixed(1)},${Q[1][1].toFixed(1)}`;
    for (let i = 1; i < Q.length - 2; i++) {
      const [p0, p1, p2, p3] = [Q[i - 1], Q[i], Q[i + 1], Q[i + 2]];
      d += ` C${(p1[0] + (p2[0] - p0[0]) * t / 3).toFixed(1)},${(p1[1] + (p2[1] - p0[1]) * t / 3).toFixed(1)} ${(p2[0] - (p3[0] - p1[0]) * t / 3).toFixed(1)},${(p2[1] - (p3[1] - p1[1]) * t / 3).toFixed(1)} ${p2[0].toFixed(1)},${p2[1].toFixed(1)}`;
    }
    return d;
  }
  let bench = null;

  function scene(stop, t, b) {
    bench = b;
    const S = K.timeline(), g = [], fl = N.RIG.fl;
    const L0 = N.luxOfDim(bench.value('dim')), c0 = N.codeOf(L0);
    const RTX = hp(HEAD.eye)[0] - (N.RIG.spotX + 6) * RS;   // the sensor's middle under the eye
    const rs = ([x, y]) => [RTX + x * RS, RTY + y * RS];
    const wrap = `translate(${RTX.toFixed(1)} ${RTY}) scale(${RS})`;
    // ── the eye and its pathway (D1·010), the jar's word in the viewer's language ──
    const [jx, jy] = hp(HEAD.jar);
    g.push(`<image href="${BASE}img/head.svg" x="${HEAD.x}" y="${HEAD.y}" width="${HEAD.w * HEAD.s}" height="${HEAD.h * HEAD.s}"/>`
      + `<rect x="${jx - 31}" y="${jy - 10}" width="62" height="24" rx="3" fill="#05070B" fill-opacity="0.6" stroke="#E6EDF5" stroke-opacity="0.8" stroke-width="0.7"/>`
      + K.text(jx, jy + 7, TX('jar'), N.fit(TX('jar'), 11, 700, 56), '#E6EDF5', 'middle', 700)
      + K.text(HEAD.x + 8, HEAD.y + HEAD.h * HEAD.s - 4, TX('headNote'), 12, '#8B97A8', 'start', 500)
      + K.text(HEAD.x + 8, HEAD.y + 22, TX('eyeT'), 16, '#FF8FD0', 'start', 800, false, 'letter-spacing="1.4"'));
    // the image lit where the two bundles land on the retina
    g.push(HEAD.spots.map(p => { const [x, y] = hp(p); return `<circle cx="${x}" cy="${y}" r="5" fill="#FFE07A" opacity="0.5" filter="${K.u('big')}"/><circle cx="${x}" cy="${y}" r="1.8" fill="#FFFFFF"/>`; }).join(''));
    // signals: trains of pulses leaving the retina along the nerve, then each radiation to the visual cortex
    const paths = ['nerve', 'tract', 'up', 'mid', 'meyer'].map(k => K.along(smooth(HEAD.lines[k].map(hp)), 120));
    S.top(S.g((t2, a) => {
      if (t2 < W.pulses) return { html: '' };
      const q = [], tt = a - W.pulses;
      for (let i = 0; i < 6; i++) {
        const ph = tt / 2.4 - i / 6; if (ph < 0) continue;
        const f = ph % 1;   // 0 … 1 along nerve + tract (0 … 0.5), then a radiation (0.5 … 1)
        const pts = f < 0.32 ? [paths[0].at(f / 0.32)] : f < 0.5 ? [paths[1].at((f - 0.32) / 0.18)] : [2, 3, 4].map(k => paths[k].at((f - 0.5) / 0.5));
        const o = Math.min(1, Math.sin(Math.PI * f) * 2);
        for (const [x, y] of pts) q.push(`<circle cx="${x.toFixed(1)}" cy="${y.toFixed(1)}" r="5" fill="#2EE6C5" opacity="${(0.35 * o).toFixed(2)}" filter="${K.u('soft')}"/><circle cx="${x.toFixed(1)}" cy="${y.toFixed(1)}" r="2.4" fill="#E9FFFB" opacity="${o.toFixed(2)}"/>`);
      }
      return { html: q.join('') };
    }, ''));
    // ── between them: the same arrangement ──
    S.top(S.g(K.fadeIn(W.same, 0.6), `<line x1="80" y1="496" x2="1160" y2="496" stroke="#2A3442" stroke-width="1.2" stroke-dasharray="3 7"/>`
      + `<rect x="${960 - N.measure(TX('same'), 15, 700) / 2 - 16}" y="482" width="${N.measure(TX('same'), 15, 700) + 32}" height="28" rx="14" fill="#07111A" stroke="#2A3442"/>` + K.text(960, 501, TX('same'), 15, '#C9D3DE', 'middle', 700)));
    // ── the bench below, scaled ──
    const i0 = S.over.length;   // the bench's layer goes under the moving layers the rig registers (lamp light, wheel, OLED)
    const r = N.rig({ mode: 'sensor', luxAt: () => L0, dimAt: () => N.dimOfLux(L0), S, wrap, show: t2 => K.win(t2, W.bench, 0.8), reading: (tt, a) => c0 + (tt >= 90 ? 0 : K.counts(a, 4, 3, 2)) });
    // (the bench is seen close: the lamp's arm leaves its frame, so the frame clips it)
    const benchSvg = `<clipPath id="${K.P}rigClip"><rect x="0" y="92" width="1540" height="818"/></clipPath><g clip-path="url(#${K.P}rigClip)">` + K.floor(0, 1530, fl, '#FFB547', N.RIG.spotX, 300) + r.svg + '</g>';
    S.over.splice(i0, 0, S.g(K.fadeIn(W.bench, 0.8), `<g transform="${wrap}">${benchSvg}</g>`));
    S.top(S.g(K.fadeIn(W.bench, 0.6), K.text(HEAD.x + 8, 548, TX('sysT'), 16, '#38D9FF', 'start', 800, false, 'letter-spacing="1.4"')));
    // ── the roles, numbered on both pictures, in their inks ──
    const ROLE = ['#FFC24D', '#FF6FC8', '#F5E68C', '#A9B4FF'];
    const mark = (x, y, n, t0) => S.top(S.g(K.appear(t0, 0.4, 4), `<circle cx="${x.toFixed(1)}" cy="${y.toFixed(1)}" r="13" fill="#05070B" stroke="${ROLE[n - 1]}" stroke-width="2.2"/>` + K.text(x, y + 5, String(n), 14, '#FFFFFF', 'middle', 800)));
    const at = r.at, sb = at.sensor;
    [[hp([520, 360]), W.r1], [hp([1044, 370]), W.r2], [hp([1170, 488]), W.r3], [hp([1430, 240]), W.r4]].forEach(([[x, y], t0], i) => mark(x, y, i + 1, t0));
    [[rs([at.lamp.hit[0] - 120, 560]), W.b1], [rs([sb.cell[0] - 70, sb.cell[1] - 10]), W.b2], [rs([sb.pins[1][0] + 60, sb.pins[1][1] - 110]), W.b3], [rs([at.mcu.mcu[0], at.mcu.mcu[1] - 90]), W.b4]].forEach(([[x, y], t0], i) => mark(x, y, i + 1, t0));
    // ── the table: the four roles, the eye's and the bench's side by side ──
    const tx0 = 1196, c1 = 1240, c2 = 1528, tw1 = 270, tw2 = 336, ty0 = 150, rh = 118;
    const head = K.text(c1, ty0, TX('eyeT'), 14, '#FF8FD0', 'start', 800, false, 'letter-spacing="1.2"');
    S.top(S.g(K.appear(W.r1, 0.5, 6), head + `<line x1="${tx0 - 10}" y1="${ty0 + 14}" x2="1870" y2="${ty0 + 14}" stroke="#2A3442"/>`));
    S.top(S.g(K.appear(W.bench, 0.5, 6), K.text(c2, ty0, N.fit(TX('sysT'), 14, 800, tw2) === 14 ? TX('sysT') : TX('sysT'), N.fit(TX('sysT'), 14, 800, tw2), '#38D9FF', 'start', 800, false, 'letter-spacing="1.2"')));
    const eyeR = [TX('rLight'), TX('rEye'), TX('rNerve'), TX('rBrain')];
    const sysR = [TX('rLight'), TX('rSensor'), TX('rWire'), TX('rMcu')];
    const vals = [`${N.fmtLux(L0)} lux`, `LDR ${N.fmtR(N.ldrR(L0))}`, `${N.outV(L0).toFixed(2)} V`, `code ${c0}`];
    for (let i = 0; i < 4; i++) {
      const y = ty0 + 54 + i * rh;
      S.top(S.g(K.appear([W.r1, W.r2, W.r3, W.r4][i], 0.5, 6), `<circle cx="${tx0 + 6}" cy="${y - 6}" r="15" fill="#05070B" stroke="${ROLE[i]}" stroke-width="2.4"/>` + K.text(tx0 + 6, y, String(i + 1), 15, '#FFFFFF', 'middle', 800)
        + N.wrap(c1, y, eyeR[i], 19, tw1, ROLE[i], 'start', 700, 1.25).svg));
      S.top(S.g(K.appear([W.b1, W.b2, W.b3, W.b4][i], 0.5, 6), N.wrap(c2, y, sysR[i], 19, tw2, ROLE[i], 'start', 700, 1.25).svg
        + K.text(c2, y + (N.wrap(c2, y, sysR[i], 19, tw2).n > 1 ? 50 : 26), vals[i], 16, '#C9D3DE', 'start', 600, true)));
      if (i < 3) S.top(S.g(K.fadeIn([W.r2, W.r3, W.r4][i], 0.4), `<path d="M${tx0 + 6},${y + 14} V${y + rh - 32}" stroke="${ROLE[i + 1]}" stroke-opacity="0.6" stroke-width="2" marker-end="url(#${K.P}arr)"/>`));
    }
    // the brain's line, and the microcontroller's
    S.top(S.g(K.appear(W.never, 0.6, 6), N.wrap(tx0 - 10, ty0 + 54 + 4 * rh - 30, TX('never'), 17, 1870 - tx0 + 10, '#FFFFFF', 'start', 600, 1.3).svg));
    // ── sensing: the sensor ringed, the word ──
    const [scx, scy] = rs(sb.cell);
    S.top(S.g(K.fadeIn(W.ring, 0.6), `<ellipse cx="${scx}" cy="${scy + 2}" rx="16" ry="11" fill="none" stroke="#FFFFFF" stroke-width="2.2"/><ellipse cx="${scx}" cy="${scy + 4}" rx="24" ry="18" fill="#FFB547" opacity="0.2" filter="${K.u('big')}"/>`));
    S.top(S.g(K.appear(W.sensing, 0.6, 8), K.text(tx0 - 10, 812, TX('sensing'), N.fit(TX('sensing'), 48, 800, 660), '#FFB547', 'start', 800, false, `letter-spacing="3" filter="${K.u('soft')}"`)
      + K.text(tx0 - 8, 846, TX('sensingS'), 17, '#FFD08A', 'start', 600)));
    const svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1920 1080" width="1920" height="1080">${K.DEFS}${D.DEFS}${Z.DEFS}${N.DEFS}`
      + K.backdrop(false) + g.join('') + '</svg>';
    return { html: K.layers(svg, S), tl: S };
  }

  window.DINKIT.run({
    id: 'eye-and-sensor',
    watch: ['dim'],
    stops: [{ key: 'eye', group: 'p0', title: '@s1Title', dur: W.dur, caption: '@s1Caption' }],
    scene,
    controls: () => {
      const x = hpEyeX() - (N.RIG.spotX + 6) * RS, wh = N.RIG.dimX + (88 - 66) * N.RIG.dimS;
      return [{ param: 'dim', kind: 'slide', x: x + wh * RS, y: RTY + N.RIG.dimY * RS, w: (34 * N.RIG.dimS + 12) * RS, h: 44 * N.RIG.dimS * RS, min: 0, max: 1, x0: 0, x1: 320, tip: 'dimTip' }];
    },
  });
  function hpEyeX() { return HEAD.x + HEAD.eye[0] * HEAD.s; }
})();
