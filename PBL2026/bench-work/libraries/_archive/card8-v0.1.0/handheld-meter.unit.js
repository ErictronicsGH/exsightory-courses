// Instrument library: the course's handheld multimeter and its specification page (D1·020 card 8's Figure card: "a handheld
// DMM's front panel and its spec page, toured"; owner, 2026-10-08: our own realistic design, no brand, on a card of its own
// straight after card 8, toured without new Flow). The meter of cards 3–8 large, reading 1.000 V on its 2 V range; its
// specification page beside it (our own layout). Four stops, each a feature spotlit and named: the display (its last digit
// one count, 1 mV), the counts (3½ digits: 1999 at most), the range (the dial on V⎓, the ranges on RANGE; 200 mV on the
// dial's mV), the specification's row (±(0.5 % + 3): the band card 8 computed, ±8 mV at 1.000 V). Its words, and the
// page's, are in both languages; the markings on the meter stay as printed.
'use strict';
(function () {
  const K = window.SVGKIT('hm-'), D = window.DINKIT(K), Q = window.SPECKIT(K, D);
  const TX = (k, v) => bench.text(k, v);
  const { COL } = Q;
  const MX = 470, FL = 822, MS = 1.32, PX = 1088, PY = 170, PW = 712;
  const DIM = [0.2, 0.6], CALL = [0.6, 0.6], DUR = 2.0;
  const mp = ([x, y]) => [MX + MS * x, FL + MS * y];

  function scene(stop, t, b) {
    bench = b;
    const S = K.timeline(), g = [], over = [];
    // the meter, standing on the bench, its leads in COM and VΩ running off to the left
    const vo = mp([84, -52]), com = mp([28, -52]);
    const boot = ([x, y], col) => `<rect x="${(x - 7 * MS).toFixed(1)}" y="${y.toFixed(1)}" width="${(14 * MS).toFixed(1)}" height="${(26 * MS).toFixed(1)}" rx="${(4 * MS).toFixed(1)}" fill="${col === 'red' ? '#C8262B' : '#1B1D21'}" stroke="#000" stroke-opacity="0.5"/>`;
    const lead = ([x, y], col, sag) => D.lead(`M${x},${y + 26 * MS} C${x},${FL + sag} ${x - 120},${FL + sag + 6} ${x - 260},${FL + sag} S-40,${FL + sag + 20} -60,${FL + sag + 18}`, col, 7.5);
    const meter = `<g transform="translate(${MX} ${FL}) scale(${MS})">${D.dmm({ txt: null, unit: 'V', fn: 'V⎓' })}</g>` + lead(com, 'black', 30) + lead(vo, 'red', 46) + boot(com, 'black') + boot(vo, 'red');
    g.push(K.floor(0, 1000, FL, COL.teal, MX, 300) + meter + K.reflect(meter, FL, 0, 1000, 70, 0.16, '#070B12'));
    // its reading: 1.000 V on the 2 V range, the last digit wandering a count now and then
    S.top(`<g transform="translate(${MX} ${FL}) scale(${MS})">` + S.g((t2, a) => { const rd = Q.reading(1.000, 2), c = t2 < 99 ? K.counts(a, Q.CONV, 4, 1) : 0;
      return { html: (() => { const str = Q.lcdStr(rd, c), H = 46, x = 46 - D.lcdWidth(str, H), nb = Math.round(K.clamp((+str) / 2) * 40);
        let s = D.lcd7(x, -366, str, H); for (let k = 0; k < 40; k++) s += `<rect x="${-80 + k * 3.9}" y="-352" width="2.4" height="6" fill="#15191C" opacity="${k < nb ? 0.9 : 0.06}"/>`; return s; })() }; }, '') + '</g>');
    // its specification page
    const L = ['title', 'page', 'display', 'accuracy', 'cond', 'dcv', 'colRange', 'colRes', 'colAcc', 'acc', 'notes1', 'notes2'].reduce((o, k) => (o[k] = TX('pg_' + k), o), {});
    const pg = Q.specPage(PX, PY, PW, L, { hiRow: stop === 3 ? 1 : null, hi: 1 });
    g.push(pg.svg);
    // the feature of this stop: its box (stage), and its callout's place
    const r1 = pg.rowAt[1];
    const F = [
      { box: [mp([-100, -472])[0], mp([0, -472])[1], 200 * MS, 146 * MS], at: mp([98, -400]), call: [856, 236] },
      { box: [PX + 24, pg.at.display[1] - 26, PW - 48, 38], at: [PX + 24, pg.at.display[1] - 7], call: [856, 320] },
      { box: [mp([-102, -324])[0], mp([0, -324])[1], 204 * MS, 228 * MS], at: mp([100, -250]), call: [856, 470] },
      { box: [r1[0] - 6, r1[1] - 4, r1[2] + 12, r1[3] + 8], at: [r1[0] - 6, r1[1] + r1[3] / 2], call: [856, r1[1] + r1[3] / 2 + 120] },
    ][stop];
    const [bx, by, bw, bh] = F.box;
    // the spotlight: the stage dimmed round the feature, its box lit
    S.top(S.g(t2 => ({ opacity: K.ease((t2 - DIM[0]) / DIM[1]).toFixed(3) }),
      `<defs><mask id="hm-hole"><rect x="0" y="0" width="1920" height="1080" fill="#fff"/><rect x="${bx}" y="${by}" width="${bw}" height="${bh}" rx="14" fill="#000"/></mask></defs>`
      + `<rect x="0" y="64" width="1920" height="816" fill="#03070C" opacity="0.62" mask="url(#hm-hole)"/>`
      + `<rect x="${bx}" y="${by}" width="${bw}" height="${bh}" rx="14" fill="none" stroke="${COL.teal}" stroke-width="2.6" filter="${K.u('soft')}"/>`
      + `<circle cx="${bx + bw}" cy="${by}" r="17" fill="#07111A" stroke="${COL.teal}" stroke-width="2"/>` + K.text(bx + bw, by + 6, String(stop + 1), 17, '#FFFFFF', 'middle', 700)));
    S.top(Q.head(960, 102, TX('h1'), COL.teal));   // (above the spotlight's dimming: the heading stays lit)
    const keys = [['dispT', 'dispS'], ['cntT', 'cntS'], ['rangeT', 'rangeS'], ['specT', 'specS']][stop];
    S.top(S.g(K.appear(CALL[0], CALL[1], 10), D.callout(F.call[0], F.call[1], F.at[0], F.at[1], TX(keys[0]), TX(keys[1]), COL.teal)));
    const svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1920 1080" width="1920" height="1080">${K.DEFS}${D.DEFS}${Q.DEFS}`
      + D.lab() + g.join('') + over.join('') + '</svg>';
    return { html: K.layers(svg, S), tl: S };
  }

  let bench = null;
  window.DINKIT.run({
    id: 'handheld-meter',
    stops: [
      { key: '1', group: 'f', title: '@s1Title', dur: DUR, caption: '@s1Caption' },
      { key: '2', group: 'f', title: '@s2Title', dur: DUR, caption: '@s2Caption' },
      { key: '3', group: 'f', title: '@s3Title', dur: DUR, caption: '@s3Caption' },
      { key: '4', group: 'f', title: '@s4Title', dur: DUR, caption: '@s4Caption' },
    ],
    scene,
  });
})();
