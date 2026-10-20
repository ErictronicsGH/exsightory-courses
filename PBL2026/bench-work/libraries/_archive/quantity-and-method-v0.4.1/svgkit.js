// A small drawing kit for 2D Animation Bench libraries: the course's palette, text, neon strokes, seven-segment
// digits, and the shared gradients and glows. Each unit library carries its own copy of this file (a library is a
// self-contained folder), and each unit makes the kit with its own id prefix, because every block's SVG lives in the
// same page and a gradient referenced across blocks fails when the block that holds it is hidden.
'use strict';
(function () {
  const INK = { bg: '#05070B', panel: '#0B0F16', line: '#1C2430', text: '#E6EDF5', muted: '#8B97A8', teal: '#2EE6C5',
    amber: '#FFC24D', violet: '#B48CFF', red: '#FF6B5A', glass: '#9FD8FF', copper: '#F2914E', warm: '#FFE9C2' };
  const FONT = `font-family="'IBM Plex Sans','Segoe UI',system-ui,sans-serif"`;
  const MONO = `font-family="'IBM Plex Mono',Consolas,monospace"`;
  const esc = s => String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
  const clamp = (v, a = 0, b = 1) => Math.max(a, Math.min(b, v));
  const lerp = (a, b, t) => a + (b - a) * t;
  const ease = t => { t = clamp(t); return t * t * (3 - 2 * t); };
  const f1 = v => (Math.round(v * 10) / 10).toFixed(1);

  // seven segments: a b c d e f g, for each character
  const SEG = { '0': 'abcdef', '1': 'bc', '2': 'abged', '3': 'abgcd', '4': 'fgbc', '5': 'afgcd', '6': 'afgedc', '7': 'abc',
    '8': 'abcdefg', '9': 'abcdfg', '-': 'g', ' ': '', 'E': 'afged', 'r': 'eg', 'o': 'cdeg', 'L': 'fed', 'H': 'fbgec', 'P': 'abfge' };

  window.SVGKIT = function (P) {
    const u = id => `url(#${P}${id})`;
    function text(x, y, s, size = 18, fill = INK.text, anchor = 'start', weight = 400, mono = false, extra = '') {
      return `<text x="${x.toFixed(1)}" y="${y.toFixed(1)}" ${mono ? MONO : FONT} font-size="${size}" fill="${fill}" text-anchor="${anchor}" font-weight="${weight}" ${extra}>${esc(s)}</text>`;
    }
    function neon(d, col, w = 2.2, glow = 'glow', o = {}) {
      return `<path d="${d}" fill="${o.fill || 'none'}" fill-opacity="${o.fop || 0}" stroke="${col}" stroke-width="${w}" stroke-linejoin="round" stroke-linecap="round"`
        + `${o.dash ? ` stroke-dasharray="${o.dash}"` : ''}${glow ? ` filter="${u(glow)}"` : ''} opacity="${o.op == null ? 1 : o.op}"/>`;
    }
    // a seven-segment readout: the lit segments in col, the unlit ones as faint ghosts (as on a real display)
    function seg7(x, y, s, h, col, o = {}) {
      const w = h * 0.5, t = h * 0.13, adv = h * 0.78, ghost = o.ghost == null ? 0.05 : o.ghost, slant = o.slant == null ? 6 : o.slant;
      const tip = t * 0.62;                       // each segment stops short of the corner by this much: the hairline gaps
      const H = (x0, yc, L) => `M${(x0 + tip).toFixed(1)},${yc.toFixed(1)} l${t / 2},${-t / 2} h${(L - 2 * tip - t).toFixed(1)} l${t / 2},${t / 2} l${-t / 2},${t / 2} h${-(L - 2 * tip - t).toFixed(1)} Z`;
      const V = (xc, y0, L) => `M${xc.toFixed(1)},${(y0 + tip).toFixed(1)} l${t / 2},${t / 2} v${(L - 2 * tip - t).toFixed(1)} l${-t / 2},${t / 2} l${-t / 2},${-t / 2} v${-(L - 2 * tip - t).toFixed(1)} Z`;
      const chars = [];
      for (const c of s) {
        if (c === '.') { if (chars.length) chars[chars.length - 1].dp = true; continue; }
        chars.push({ c, dp: false });
      }
      const lit = [], dim = [];
      let cx = x;
      for (const { c, dp } of chars) {
        const on = SEG[c] || '', hh = h / 2;
        const segs = { a: H(cx, y - h, w), g: H(cx, y - hh, w), d: H(cx, y, w), f: V(cx, y - h, hh), b: V(cx + w, y - h, hh),
          e: V(cx, y - hh, hh), c: V(cx + w, y - hh, hh) };
        for (const [k, d] of Object.entries(segs)) (on.includes(k) ? lit : dim).push(d);
        const dot = `M${(cx + w + (adv - w) * 0.5 - t * 0.55).toFixed(1)},${(y - t * 0.1).toFixed(1)} a${(t * 0.55).toFixed(1)},${(t * 0.55).toFixed(1)} 0 1 0 ${(t * 1.1).toFixed(1)},0 a${(t * 0.55).toFixed(1)},${(t * 0.55).toFixed(1)} 0 1 0 ${(-t * 1.1).toFixed(1)},0 Z`;
        (dp ? lit : dim).push(dot);
        cx += adv;
      }
      return `<g transform="translate(0 ${y}) skewX(${-slant}) translate(0 ${-y})">`
        + `<path d="${dim.join(' ')}" fill="${col}" opacity="${ghost}"/>`
        + `<path d="${lit.join(' ')}" fill="${col}"${o.glow === false ? '' : ` filter="${u('soft')}"`}/></g>`;
    }
    const seg7Width = (s, h) => s.replace(/\./g, '').length * h * 0.78 - h * 0.28;

    const DEFS = `<defs>
<filter id="${P}glow" filterUnits="userSpaceOnUse" x="-100" y="-100" width="2120" height="1280"><feGaussianBlur stdDeviation="2.2" result="a"/><feGaussianBlur in="SourceGraphic" stdDeviation="7" result="b"/>
<feMerge><feMergeNode in="b"/><feMergeNode in="a"/><feMergeNode in="SourceGraphic"/></feMerge></filter>
<filter id="${P}soft" filterUnits="userSpaceOnUse" x="-100" y="-100" width="2120" height="1280"><feGaussianBlur stdDeviation="3.2" result="b"/><feMerge><feMergeNode in="b"/><feMergeNode in="SourceGraphic"/></feMerge></filter>
<filter id="${P}vapor" x="-60%" y="-40%" width="220%" height="180%"><feTurbulence type="fractalNoise" baseFrequency="0.011 0.032" numOctaves="3" seed="11" result="n"/>
<feGaussianBlur in="SourceGraphic" stdDeviation="3.6" result="b"/><feDisplacementMap in="b" in2="n" scale="34" xChannelSelector="R" yChannelSelector="G" result="d"/><feGaussianBlur in="d" stdDeviation="2.6"/></filter>
<filter id="${P}mist" filterUnits="userSpaceOnUse" x="-100" y="-100" width="2120" height="1280"><feGaussianBlur stdDeviation="11"/></filter>
<filter id="${P}big" x="-60%" y="-60%" width="220%" height="220%"><feGaussianBlur stdDeviation="18"/></filter>
<filter id="${P}shadow" x="-20%" y="-20%" width="140%" height="160%"><feDropShadow dx="0" dy="10" stdDeviation="12" flood-color="#000" flood-opacity="0.65"/></filter>
<linearGradient id="${P}case" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#2A303A"/><stop offset="0.08" stop-color="#1B2028"/><stop offset="1" stop-color="#101318"/></linearGradient>
<linearGradient id="${P}bezel" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#3A414C"/><stop offset="1" stop-color="#1A1E25"/></linearGradient>
<linearGradient id="${P}lcd" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#0A0C0E"/><stop offset="1" stop-color="#050607"/></linearGradient>
<linearGradient id="${P}steel" x1="0" y1="0" x2="1" y2="0"><stop offset="0" stop-color="#5B636E"/><stop offset="0.35" stop-color="#D5DCE4"/><stop offset="0.55" stop-color="#9AA4AF"/><stop offset="1" stop-color="#4A515B"/></linearGradient>
<linearGradient id="${P}steelV" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#D5DCE4"/><stop offset="0.5" stop-color="#8C96A2"/><stop offset="1" stop-color="#4A515B"/></linearGradient>
<linearGradient id="${P}brass" x1="0" y1="0" x2="1" y2="0"><stop offset="0" stop-color="#7A5A1E"/><stop offset="0.4" stop-color="#F2D27A"/><stop offset="0.6" stop-color="#C9A04A"/><stop offset="1" stop-color="#6B4E18"/></linearGradient>
<linearGradient id="${P}copper" x1="0" y1="0" x2="1" y2="0"><stop offset="0" stop-color="#6E2E12"/><stop offset="0.3" stop-color="#E8834A"/><stop offset="0.45" stop-color="#FFC59A"/><stop offset="0.62" stop-color="#D86F36"/><stop offset="1" stop-color="#5A240E"/></linearGradient>
<linearGradient id="${P}copperBack" x1="0" y1="0" x2="1" y2="0"><stop offset="0" stop-color="#3A1A0C"/><stop offset="0.5" stop-color="#7A3A1A"/><stop offset="1" stop-color="#3A1A0C"/></linearGradient>
<linearGradient id="${P}ceramic" x1="0" y1="0" x2="1" y2="0"><stop offset="0" stop-color="#8E8A82"/><stop offset="0.35" stop-color="#F1EEE6"/><stop offset="0.6" stop-color="#D8D3C8"/><stop offset="1" stop-color="#7B776F"/></linearGradient>
<linearGradient id="${P}glassV" x1="0" y1="0" x2="1" y2="0"><stop offset="0" stop-color="#BFE6FF" stop-opacity="0.22"/><stop offset="0.06" stop-color="#BFE6FF" stop-opacity="0.06"/>
<stop offset="0.9" stop-color="#BFE6FF" stop-opacity="0.04"/><stop offset="0.96" stop-color="#BFE6FF" stop-opacity="0.18"/><stop offset="1" stop-color="#BFE6FF" stop-opacity="0.05"/></linearGradient>
<linearGradient id="${P}water" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#1E5B78" stop-opacity="0.55"/><stop offset="1" stop-color="#0B2A3C" stop-opacity="0.8"/></linearGradient>
<linearGradient id="${P}redLead" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#FF7A7A"/><stop offset="1" stop-color="#B3262B"/></linearGradient>
<radialGradient id="${P}knob" cx="0.38" cy="0.32" r="0.75"><stop offset="0" stop-color="#5A6270"/><stop offset="0.55" stop-color="#262B33"/><stop offset="1" stop-color="#121519"/></radialGradient>
<radialGradient id="${P}bulb" cx="0.5" cy="0.5" r="0.5"><stop offset="0" stop-color="#FFFFFF"/><stop offset="0.35" stop-color="#FFF1C9"/><stop offset="1" stop-color="#FFB547" stop-opacity="0"/></radialGradient>
<radialGradient id="${P}vignette" cx="0.5" cy="0.45" r="0.75"><stop offset="0.6" stop-color="#05070B" stop-opacity="0"/><stop offset="1" stop-color="#000" stop-opacity="0.55"/></radialGradient>
<linearGradient id="${P}fade" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#0A0F16" stop-opacity="0.25"/><stop offset="0.7" stop-color="#0A0F16" stop-opacity="1"/></linearGradient>
<linearGradient id="${P}floor" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#16202C" stop-opacity="0.9"/><stop offset="1" stop-color="#070A0F" stop-opacity="0"/></linearGradient>
<marker id="${P}arr" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="6" markerHeight="6" orient="auto"><path d="M0,0 L10,5 L0,10 z" fill="#8B97A8"/></marker>
<marker id="${P}arrT" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="6" markerHeight="6" orient="auto"><path d="M0,0 L10,5 L0,10 z" fill="#2EE6C5"/></marker>
</defs>`;

    // (the glows use the stage's own space, so a straight horizontal or vertical stroke, whose box has no height or width,
    // still glows)
    // a numbered callout with a leader (shown when the bench's Cards are on)
    function tag(ax, ay, x, y, n, col, name, sub, side = 'right') {
      const w = Math.max(name.length * 9, (sub || '').length * 7) + 52, h = sub ? 48 : 32;
      const bx = side === 'right' ? x - 18 : x - w + 18;
      const tx = side === 'right' ? x + 22 : x - 22, anc = side === 'right' ? 'start' : 'end';
      return `<line x1="${ax}" y1="${ay}" x2="${x}" y2="${y}" stroke="${INK.text}" stroke-width="1.1" opacity="0.55"/><circle cx="${ax}" cy="${ay}" r="3.6" fill="${INK.text}"/>`
        + `<rect x="${bx}" y="${y - 18}" width="${w}" height="${h}" rx="10" fill="${INK.panel}" fill-opacity="0.95" stroke="${INK.line}"/>`
        + `<circle cx="${x}" cy="${y}" r="13" fill="${INK.bg}" stroke="${col}" stroke-width="2" filter="${u('soft')}"/>` + text(x, y + 5, String(n), 14, INK.text, 'middle', 700)
        + text(tx, y + 6, name, 16, INK.text, anc, 600) + (sub ? text(tx, y + 25, sub, 12.5, INK.muted, anc) : '');
    }
    // a mirror image of svg under the floor line y = axis, fading out (a polished bench top)
    let nRef = 0;
    function reflect(svg, axis, x0, x1, depth = 140, op = 0.22, bg = '#0A0F16') {
      const id = `${P}rf${nRef++}`;
      return `<linearGradient id="${id}" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="${bg}" stop-opacity="0.15"/><stop offset="0.85" stop-color="${bg}" stop-opacity="1"/></linearGradient>`
        + `<clipPath id="${id}c"><rect x="${x0}" y="${axis}" width="${x1 - x0}" height="${depth}"/></clipPath>`
        + `<g clip-path="url(#${id}c)"><g opacity="${op}" transform="translate(0 ${2 * axis}) scale(1 -1)">${svg.replace(/<text[\s\S]*?<\/text>/g, '')}</g>`
        + `<rect x="${x0}" y="${axis}" width="${x1 - x0}" height="${depth}" fill="url(#${id})"/></g>`;
    }
    // a repeatable scatter: k-th pseudo-random number in [0, 1) (bubbles, small parts), never in a visible line
    const rnd = (k, salt = 0) => { const v = Math.sin((k + 1) * 12.9898 + salt * 78.233) * 43758.5453; return v - Math.floor(v); };
    // vapour: puffs rise off the surface, widen and thin out, drifting; a turbulence field bends them into curling wisps
    // (the field stays put while the puffs move through it, so the wisps keep changing shape as they rise)
    function steam(cx, y, n, spread, h, op = 0.32, a = 0) {
      const g = [`<g filter="url(#${P}vapor)">`];
      const N = n * 9;
      for (let k = 0; k < N; k++) {
        const sp = 0.16 + 0.1 * rnd(k, 8), f = ((rnd(k, 9) + a * sp) % 1 + 1) % 1;            // its life: 0 at the surface → 1 gone
        const lane = (rnd(k, 3) - 0.5) * spread * 0.8;
        const x = cx + lane * (0.6 + 0.9 * f) + Math.sin(a * 0.9 + k * 1.3) * 12 * f + 18 * f * f * Math.sin(k);
        const yy = y - f * h * (0.85 + 0.3 * rnd(k, 7));
        const o = op * 1.15 * Math.pow(Math.sin(Math.PI * Math.min(1, f * 1.05)), 0.7) * (1 - 0.55 * f);
        g.push(`<ellipse cx="${x.toFixed(1)}" cy="${yy.toFixed(1)}" rx="${(3 + f * 17 + rnd(k, 5) * 4).toFixed(1)}" ry="${(6 + f * 16).toFixed(1)}" fill="${k % 3 ? '#F2F7FB' : '#E2ECF4'}" opacity="${o.toFixed(3)}"/>`);
      }
      return g.join('') + '</g>';
    }
    // a bench top: a soft lit band from y down, and a pool of coloured light where the object stands
    function floor(x0, x1, y, col, cx, w = 200) {
      return `<rect x="${x0}" y="${y}" width="${x1 - x0}" height="160" fill="url(#${P}floor)"/>`
        + `<line x1="${x0 + 10}" y1="${y}" x2="${x1 - 10}" y2="${y}" stroke="#FFFFFF" stroke-opacity="0.06"/>`
        + (col ? `<ellipse cx="${cx}" cy="${y + 6}" rx="${w}" ry="16" fill="${col}" opacity="0.28" filter="url(#${P}big)"/>` : '');
    }
    // the stage's ground: deep navy, lit from above centre; a faint floor grid in perspective; optionally a lab far
    // behind, out of focus (soft lights, shelving)
    function backdrop(lab) {
      const g = [`<rect width="1920" height="1080" fill="#04070C"/>`,
        `<radialGradient id="${P}sky" cx="0.5" cy="0.28" r="0.75"><stop offset="0" stop-color="#0E1C2C"/><stop offset="0.6" stop-color="#070D16"/><stop offset="1" stop-color="#03050A"/></radialGradient>`,
        `<rect width="1920" height="1080" fill="url(#${P}sky)"/>`];
      if (lab) {
        g.push(`<g filter="url(#${P}big)" opacity="0.55">`);
        for (let k = 0; k < 7; k++) g.push(`<rect x="${60 + k * 270}" y="120" width="210" height="${300 + (k % 3) * 40}" rx="6" fill="#0C1724" stroke="#14273A" stroke-width="6"/>`);
        g.push('</g>');
        const dots = [[90, 230, '#FFB547'], [210, 180, '#FFB547'], [330, 260, '#5FB8FF'], [1560, 210, '#FFB547'], [1660, 300, '#FF9A3D'], [1780, 190, '#5FB8FF'],
          [1860, 330, '#FFB547'], [700, 150, '#5FB8FF'], [1240, 140, '#5FB8FF'], [40, 420, '#FFB547'], [1890, 520, '#FFB547']];
        for (const [x, y, c] of dots) g.push(`<circle cx="${x}" cy="${y}" r="${10 + (x % 7)}" fill="${c}" opacity="0.28" filter="url(#${P}big)"/><circle cx="${x}" cy="${y}" r="4" fill="${c}" opacity="0.5" filter="url(#${P}soft)"/>`);
      }
      const hz = 700;
      for (let k = -12; k <= 12; k++) g.push(`<line x1="${960 + k * 60}" y1="${hz}" x2="${960 + k * 240}" y2="1080" stroke="#2EE6C5" stroke-opacity="0.035"/>`);
      for (let k = 0; k < 6; k++) { const y = hz + Math.pow(k / 6, 1.8) * 380; g.push(`<line x1="0" y1="${y.toFixed(0)}" x2="1920" y2="${y.toFixed(0)}" stroke="#2EE6C5" stroke-opacity="0.03"/>`); }
      return g.join('');
    }
    // a small labelled pill (a part's name, on the scene)
    function pill(x, y, s, col = '#2EE6C5', anchor = 'start') {
      const w = s.length * 8.6 + 26, bx = anchor === 'middle' ? x - w / 2 : anchor === 'end' ? x - w : x;
      return `<rect x="${bx}" y="${y - 17}" width="${w}" height="30" rx="8" fill="#08111A" fill-opacity="0.92" stroke="${col}" stroke-opacity="0.65" stroke-width="1.3"/>`
        + text(bx + w / 2, y + 3, s, 15, '#E6EDF5', 'middle', 500);
    }
    // ───────────── motion ─────────────
    // A timeline: the scene is drawn once per stop; the parts that move are registered here with a function of the
    // bench's time and set every frame (attributes, or a small piece of markup). Nothing keeps a clock of its own:
    // t is the stop's time (entrances), a the time for ambient motion (bubbles, steam, flow); both come from the bench.
    function timeline() {
      let n = 0;
      const specs = [], over = [];
      const on = fn => { const id = `${P}m${n++}`; specs.push({ id, fn, el: null, last: '' }); return id; };
      return {
        over,                                                 // what goes in the moving layer, in order
        // a part that keeps moving (bubbles, steam, flow): drawn in a light layer of its own above the scene, so the
        // scene itself (filters, gradients) is painted once and never again while it plays
        top(content) { over.push(content); return ''; },
        on,                                                   // an id for an element whose attributes fn(t, a) sets
        g(fn, content, attrs = '') { return `<g id="${on(fn)}"${attrs ? ' ' + attrs : ''}>${content}</g>`; },
        bind(host) { for (const s of specs) { s.el = host.querySelector('#' + s.id); s.last = ''; } },
        tick(t, a) {
          for (const s of specs) {
            if (!s.el) continue;
            const v = s.fn(t, a);
            if (!v) continue;
            let key = '';
            for (const k in v) key += k + '=' + v[k] + ';';
            if (key === s.last) continue;
            s.last = key;
            for (const k in v) { if (k === 'html') s.el.innerHTML = v[k]; else s.el.setAttribute(k, v[k]); }
          }
        },
      };
    }
    const win = (t, t0, d) => ease((t - t0) / d);                       // 0 → 1 over [t0, t0 + d], eased
    const appear = (t0, d = 0.5, dy = 18) => t => { const e = win(t, t0, d); return { opacity: e.toFixed(3), transform: `translate(0 ${((1 - e) * dy).toFixed(1)})` }; };
    const fadeIn = (t0, d = 0.5, to = 1) => t => ({ opacity: (win(t, t0, d) * to).toFixed(3) });
    const drawOn = (t0, d = 0.6) => t => ({ 'stroke-dashoffset': (1 - win(t, t0, d)).toFixed(4) });   // on paths with pathLength="1" stroke-dasharray="1 1"
    // a path sampled once (in the page) so a front or a particle can ride along it
    let probe = null;
    function along(d, n = 160) {
      if (!probe) {
        const NS = 'http://www.w3.org/2000/svg', sv = document.createElementNS(NS, 'svg');
        sv.setAttribute('style', 'position:absolute;width:0;height:0;visibility:hidden');
        probe = document.createElementNS(NS, 'path'); sv.appendChild(probe); document.body.appendChild(sv);
      }
      probe.setAttribute('d', d);
      const L = probe.getTotalLength(), pts = [];
      for (let i = 0; i <= n; i++) { const p = probe.getPointAtLength(L * i / n); pts.push([p.x, p.y]); }
      return { L, at(f) { f = clamp(f); const x = f * n, i = Math.min(n - 1, Math.floor(x)), r = x - i, a = pts[i], b = pts[i + 1]; return [a[0] + (b[0] - a[0]) * r, a[1] + (b[1] - a[1]) * r]; } };
    }
    // a glowing front riding a path from t0 over d (null once it has arrived or before it starts)
    function front(path, t0, d, col, r = 5) {
      return t => { const f = (t - t0) / d; if (f <= 0 || f >= 1) return { opacity: 0 }; const [x, y] = path.at(ease(f)); return { opacity: 1, transform: `translate(${x.toFixed(1)} ${y.toFixed(1)})` }; };
    }
    const dot = (col, r = 6) => `<circle r="${r * 2.2}" fill="${col}" opacity="0.35" filter="url(#${P}big)"/><circle r="${r}" fill="#FFFFFF" filter="url(#${P}soft)"/><circle r="${r * 0.6}" fill="${col}"/>`;
    // rising bubbles in a box, each a function of the ambient time (they wrap round at the top)
    function bubbles(x0, x1, yTop, yBot, n, a, salt = 0, speed = 60, col = '#EFFBFF') {
      const g = [];
      for (let k = 0; k < n; k++) {
        const h = yBot - yTop, ph = (rnd(k, salt + 1) + a * speed * (0.6 + 0.8 * rnd(k, salt + 2)) / h) % 1;
        const y = yBot - ph * h, x = x0 + rnd(k, salt + 3) * (x1 - x0) + Math.sin(a * 2 + k) * 2.5, r = 1.4 + rnd(k, salt + 4) * 2.4 + ph * 2.6;
        g.push(`<circle cx="${x.toFixed(1)}" cy="${y.toFixed(1)}" r="${r.toFixed(1)}" fill="none" stroke="${col}" stroke-opacity="${(0.85 * (1 - ph * 0.5)).toFixed(2)}" stroke-width="1.1"/>`);
      }
      return g.join('');
    }
    // a live reading's wander, in counts of its last digit: updated `rate` times a second, mostly 0, sometimes ±1, rarely ±2
    // (from the bench's time, so it is the same every time the stop is played)
    function counts(a, rate, salt = 0, max = 2) {
      const r = rnd(Math.floor(a * rate), salt + 61);
      const c = r < 0.1 ? -2 : r < 0.3 ? -1 : r < 0.7 ? 0 : r < 0.9 ? 1 : 2;
      return Math.max(-max, Math.min(max, c));
    }
    // a looping value (0 → 1 every period seconds)
    const loop = (a, period, phase = 0) => ((a / period + phase) % 1 + 1) % 1;
    // the two layers a unit puts on its stage: the scene (painted once) and the moving parts (on their own compositor layer)
    // (each moving part gets a layer of its own: one part's change then repaints only its own small region)
    const layers = (scene, tl) => scene + tl.over.map(c => `<svg class="ovl" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1920 1080" width="1920" height="1080" style="position:absolute;left:0;top:0;will-change:transform;pointer-events:none">${c}</svg>`).join('');
    return { INK, P, u, text, neon, seg7, seg7Width, tag, DEFS, esc, clamp, lerp, ease, f1, reflect, floor, backdrop, pill, rnd, steam, layers,
      timeline, win, appear, fadeIn, drawOn, along, front, dot, bubbles, loop, counts };
  };
})();
