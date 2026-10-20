// The Animation Bench (prototype): loads a library and plays it.
// Owner, 2026-10-08: "each demonstration will act like a library that will be loaded in the animation bench. so the
// play, previous, reset, next, speed, explore buttons should be bench level controls. then the library specific ones
// would stay in the library" — and "you are not to couple the libraries to the bench. we should be able to load a
// library in a bench and the metadata to configure the bench should come from the library like the name, title, etc."
// So the bench knows no library: it is given a location (?lib=…) or a folder, reads the library's library.json,
// checks it targets this bench, configures its frame from it, then runs the library's code, which registers only its
// behaviour. The bench owns the clock, the transport, the rail, the caption, the time chip, Explore, Cards, speed,
// reduced motion and the keys. The contract is in README.md.
// Owner, 2026-10-08 (D1·020 card 1): one block at a time takes over the whole stage as the Flow reaches it; the blocks
// are separate unit libraries, reusable, joined by a sequence library; the bench's transport is the only one. So the
// bench also loads a sequence (kind "sequence": units in Flow order, each with its params), mounts each unit in a block
// of its own, flattens their stops onto one rail (sections = blocks) and hands the stage from block to block.
'use strict';
(function () {
  const $ = id => document.getElementById(id);
  const BENCH = { type: 'animation', contracts: [1, 2] };
  const HANDOVER = 750;                // ms: one block gives the stage to the next
  const SPEEDS = [1, 2, 0.5];
  const ICON_PLAY = '<svg viewBox="0 0 24 24"><path d="M8 5v14l11-7z"/></svg>';
  const ICON_STOP = '<svg viewBox="0 0 24 24"><path d="M6 6h12v12H6z"/></svg>';
  const TAIL = 1.2;                    // a stop holds this long after its motion before Play moves on (a stop may set its own)

  // the bench's state; a library reads it (never writes it): i, t, playing, paused, speed, reduced, cards, explore
  const st = { i: 0, t: 0, playing: false, paused: false, speed: 1, reduced: false, cards: false, explore: false };
  try { st.reduced = matchMedia('(prefers-reduced-motion: reduce)').matches; } catch (e) { /* no media queries */ }
  let lib = null, meta = null, STOPS = [];
  let added = [], blobs = [];          // what the loaded library put into the page (removed when another is loaded)
  let regError = null;                 // why the library's register call was refused
  let collecting = null;               // while a sequence loads a unit: where that unit's register call goes

  // ───────────── loading a library ─────────────
  function check(m) {
    const need = (k, ok) => { if (!ok) throw new Error(`library.json: ${k}`); };
    need('needs an id, a name and a title', m && m.id && m.name && m.title);
    need(`targets the ${m.bench && m.bench.type || 'unknown'} bench, not this one (animation)`, m.bench && m.bench.type === BENCH.type);
    need(`asks for contract ${m.bench.contract}; this bench speaks ${BENCH.contracts.join(', ')}`, BENCH.contracts.includes(m.bench.contract));
    if (m.kind === 'sequence') need('is a sequence with no units', Array.isArray(m.sequence) && m.sequence.length && m.sequence.every(b => b && b.unit));
    else need('lists no scripts', Array.isArray(m.scripts) && m.scripts.length);
  }
  // a unit's settings: its library.json declares them (type, values or range, default); a sequence may set them per block
  function resolveParams(um, given, where) {
    const decl = um.params || {}, out = {};
    for (const [k, d] of Object.entries(decl)) out[k] = d.default;
    for (const [k, v] of Object.entries(given || {})) {
      const d = decl[k];
      if (!d) throw new Error(`${where}: ${um.name} has no setting “${k}”`);
      if (d.values && !d.values.includes(v)) throw new Error(`${where}: ${um.name}: “${k}” is one of ${d.values.join(', ')}, not ${v}`);
      if (d.min != null && (typeof v !== 'number' || v < d.min || v > d.max)) throw new Error(`${where}: ${um.name}: “${k}” runs ${d.min}–${d.max}, not ${v}`);
      out[k] = v;
    }
    return out;
  }
  const loadScript = src => new Promise((res, rej) => {
    const s = document.createElement('script'); s.src = src; s.async = false;
    s.onload = res; s.onerror = () => rej(new Error(`could not load ${src.startsWith('blob:') ? 'a file' : src}`));
    document.body.appendChild(s); added.push(s);
  });
  const addCss = href => { const l = document.createElement('link'); l.rel = 'stylesheet'; l.href = href; document.head.appendChild(l); added.push(l); };
  async function mountLibrary(m, urlOf) {
    check(m);
    unload();
    meta = m; regError = null;
    configure(m);
    for (const f of m.css || []) addCss(urlOf(f));
    for (const f of m.scripts) await loadScript(urlOf(f));   // in order: each runs after the one before
    if (!lib) throw regError || new Error(`${m.name}: its scripts ran but it did not register with the bench`);
  }
  // a sequence: fetch each unit's library.json, check it, set its params, run its scripts (its register call is kept),
  // then compose the units into one played library
  async function mountSequence(m, base) {
    check(m);
    unload();
    meta = m; regError = null;
    configure(m);
    const units = [];
    for (const [n, b] of m.sequence.entries()) {
      const where = `block ${n + 1}`;
      const ubase = new URL(b.unit.endsWith('/') ? b.unit : b.unit + '/', base);
      const r = await fetch(new URL('library.json', ubase), { cache: 'no-cache' });
      if (!r.ok) throw new Error(`${where}: no library.json at ${b.unit}`);
      const um = await r.json();
      check(um);
      if (um.kind === 'sequence') throw new Error(`${where}: ${um.name} is itself a sequence`);
      const params = resolveParams(um, b.params, where);
      const urlOf = f => new URL(f, ubase).href + '?v=' + encodeURIComponent(um.version || '1');
      for (const f of um.css || []) addCss(urlOf(f));
      collecting = { meta: um, impl: null };
      try { for (const f of um.scripts) await loadScript(urlOf(f)); }
      finally { var got = collecting; collecting = null; }
      if (!got.impl) throw regError || new Error(`${where}: ${um.name}: its scripts ran but it did not register with the bench`);
      units.push({ meta: um, impl: got.impl, params, block: b });
    }
    start(compose(units));
  }
  async function loadFromLocation(loc) {
    const base = new URL(loc.endsWith('/') ? loc : loc + '/', location.href);
    const r = await fetch(new URL('library.json', base), { cache: 'no-cache' });
    if (!r.ok) throw new Error(`no library.json at ${loc}`);
    const m = await r.json();
    if (m.kind === 'sequence') await mountSequence(m, base);
    else await mountLibrary(m, f => new URL(f, base).href + '?v=' + encodeURIComponent(m.version || '1'));
    remember({ loc, id: m.id, name: m.name, title: m.title, card: m.card || '' });
    const u = new URL(location.href); u.searchParams.set('lib', loc); history.replaceState(null, '', u.pathname + u.search + location.hash);
  }
  async function loadFromFolder(fileList) {
    const files = {};
    for (const f of fileList) { const rel = (f.webkitRelativePath || f.name).split('/').slice(1).join('/') || f.name; files[rel] = f; }
    if (!files['library.json']) throw new Error('the folder has no library.json');
    const m = JSON.parse(await files['library.json'].text());
    if (m.kind === 'sequence') throw new Error('a sequence names its units by location: load it from a location, not a folder');
    await mountLibrary(m, f => {
      if (!files[f]) throw new Error(`the folder has no ${f} (named in library.json)`);
      const u = URL.createObjectURL(files[f]); blobs.push(u); return u;
    });
    history.replaceState(null, '', location.pathname);
  }
  function unload() {
    if (lib && lib.unmount) try { lib.unmount(); } catch (e) { /* the stage is cleared anyway */ }
    lib = null; meta = null; STOPS = [];
    $('stage').innerHTML = '';
    added.forEach(e => e.remove()); added = [];
    blobs.forEach(u => URL.revokeObjectURL(u)); blobs = [];
    Object.assign(st, { i: 0, t: 0, playing: false, paused: false, cards: false, explore: false });
    trayKey = null; $('tray').innerHTML = '';
    configure(null);
  }
  function fail(e) {
    unload();
    $('emptyMsg').innerHTML = `<b>The library could not be loaded.</b><br>${String(e.message || e).replace(/</g, '&lt;')}`;
  }
  // the bench's frame, from the library's metadata (or empty)
  function configure(m) {
    $('empty').style.display = m ? 'none' : '';
    $('libTitle').textContent = m ? m.title : 'Animation Bench';
    const crumbs = m ? [m.name, m.card, 'Animation Bench', m.kind === 'sequence' ? `${m.sequence.length} blocks` : m.kind || '2D'].filter(Boolean) : ['no library loaded'];
    $('libSub').replaceChildren(...crumbs.flatMap((c, k) => { const t = document.createTextNode(c); if (!k) return [t]; const i = document.createElement('i'); i.textContent = '›'; return [i, t]; }));
    document.title = m ? `${m.title} · Animation Bench` : 'Animation Bench';
    const f = (m && m.features) || {};
    $('xBtn').style.display = f.explore ? '' : 'none';
    $('cardsBtn').style.display = m && f.cards !== false ? '' : 'none';
    const keys = 'Space play / stop · R reset · ← → step' + (f.explore ? ' · X explore' : '') + (m && f.cards !== false ? ' · C cards' : '');
    $('hint').textContent = m ? (m.keys ? `${keys} · ${m.keys}` : keys) : '';
    ['prev', 'play', 'reset', 'next', 'speed'].forEach(id => { $(id).disabled = !m; });
    drawMenu();
  }

  // ───────────── the library menu: what is loaded, open a folder, open a location, recent ─────────────
  const RECENT = 'animationBench.recent';
  function recent() { try { return JSON.parse(localStorage.getItem(RECENT)) || []; } catch (e) { return []; } }
  function remember(r) {
    try { localStorage.setItem(RECENT, JSON.stringify([r, ...recent().filter(x => x.loc !== r.loc)].slice(0, 8))); } catch (e) { /* not kept */ }
  }
  const esc = s => String(s == null ? '' : s).replace(/[&<>"]/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]));
  function drawMenu() {
    const m = meta, rs = recent().filter(r => !m || r.id !== m.id);
    $('libMenu').innerHTML =
      (m ? `<div class="cap">LOADED</div><div class="loaded"><div class="t">${esc(m.title)}</div>
        <div class="mono">${esc([m.name, m.card, m.kind, m.version && 'v' + m.version].filter(Boolean).join(' · '))}</div>
        ${m.description ? `<div class="d">${esc(m.description)}</div>` : ''}</div>` : '') +
      `<div class="cap">LOAD A LIBRARY</div>
       <button class="it" id="pickFolder"><span>Open a library folder…</span><span class="note">a folder with a library.json</span></button>
       <form class="loc" id="locForm"><input id="locIn" placeholder="or a location, e.g. ../../libraries/ldr-chain/" spellcheck="false"><button>Load</button></form>` +
      (rs.length ? `<div class="cap">RECENT</div>` + rs.map(r =>
        `<button class="it" data-loc="${esc(r.loc)}"><span class="card">${esc(r.card)}</span><span>${esc(r.title)}</span><span class="note">${esc(r.name)}</span></button>`).join('') : '');
    $('pickFolder').onclick = () => $('folderIn').click();
    $('locForm').onsubmit = ev => { ev.preventDefault(); const v = $('locIn').value.trim(); if (v) openLoc(v); };
    $('libMenu').querySelectorAll('[data-loc]').forEach(b => { b.onclick = () => openLoc(b.dataset.loc); });
  }
  const openLoc = loc => { $('libMenu').classList.remove('open'); loadFromLocation(loc).catch(fail); };
  $('folderIn').onchange = ev => { $('libMenu').classList.remove('open'); if (ev.target.files.length) loadFromFolder(ev.target.files).catch(fail); ev.target.value = ''; };
  $('libBtn').onclick = ev => { ev.stopPropagation(); drawMenu(); $('libMenu').classList.toggle('open'); };
  $('emptyOpen').onclick = ev => { ev.stopPropagation(); drawMenu(); $('libMenu').classList.add('open'); };
  addEventListener('pointerdown', ev => { if (!ev.target.closest('#libMenu,#libBtn,#emptyOpen')) $('libMenu').classList.remove('open'); });

  // ───────────── the clock and the transport ─────────────
  const stop = () => STOPS[st.i];
  const tailOf = s => s.tail != null ? s.tail : TAIL;
  function step(dt) {
    if (!st.paused) st.t += dt * st.speed;
    const s = stop();
    if (st.playing && !st.explore && st.t >= s.dur + tailOf(s)) {   // Play runs a paragraph (a group of stops) and holds
      const nx = STOPS[st.i + 1];
      if (nx && nx.group === s.group) go(st.i + 1, true);
      else { st.playing = false; ui(); }
    }
  }
  function go(i, keepPlaying = false) {
    if (!lib) return;
    i = Math.max(0, Math.min(STOPS.length - 1, i));
    if (st.explore) setExplore(false);
    if (i !== st.i) {
      const from = st.i;
      st.i = i; st.t = 0;
      if (lib.enterStop) lib.enterStop(i, from, keepPlaying);
    }
    st.paused = false;
    if (!keepPlaying) st.playing = false;
    ui();
  }
  function play() {
    if (!lib) return;
    if (st.explore) setExplore(false);
    if (st.playing) { st.playing = false; st.paused = true; ui(); return; }
    st.playing = true; st.paused = false;
    const s = stop();
    if (s.advanceOnPlay && st.i < STOPS.length - 1) { go(st.i + 1, true); return; }
    if (lib.onPlay) lib.onPlay(st.i);
    if (st.t >= s.dur) {                // this stop is done: Play runs the next paragraph
      if (st.i < STOPS.length - 1) go(st.i + 1, true); else st.playing = false;
    }
    ui();
  }
  // Reset (owner, 2026-10-08: "reset must take the animation to the beginning"): back to the first stop, stopped, and
  // the library's own inputs back to how it was set up (its reset hook); in Explore, the scene as it was set up
  function reset() {
    if (!lib) return;
    if (st.explore) { lib.explore.reset(); ui(); return; }
    st.playing = false; st.paused = false;
    if (lib.reset) lib.reset();
    if (st.i !== 0) go(0); else { st.t = 0; if (lib.enterStop) lib.enterStop(0, -1, false); lib.settle(); ui(); }
    st.t = 0; ui();
  }
  function setExplore(on) {
    if (!lib || !lib.explore || (on && lib.hasExplore && !lib.hasExplore())) return;
    st.explore = on;
    if (on) { st.playing = false; st.paused = false; }
    lib.explore.set(on);
    ui();
  }

  // ───────────── the bar ─────────────
  let railW = 820;
  const railX = i => railW * i / Math.max(1, STOPS.length - 1);
  function layoutBar() {
    // the rail takes what the right-hand group leaves
    const right = $('right'), left = 1920 - 28 - right.offsetWidth;
    railW = Math.max(360, left - 30 - 556);
    $('railTrack').style.width = railW + 'px';
    $('holdinfo').style.left = (556 + railW - 420) + 'px'; $('holdinfo').style.width = '420px';
    const tray = $('tray');
    if (tray.children.length) { $('trayCap').style.width = (tray.offsetWidth - 24) + 'px'; $('trayCap').textContent = 'THIS LIBRARY'; }
    else $('trayCap').textContent = '';
  }
  function buildRail() {
    const rail = $('rail');
    rail.querySelectorAll('.dot,.num,.ch').forEach(e => e.remove());
    for (const [name, a, b] of (lib.sections || [])) {
      const d = document.createElement('div'); d.className = 'ch';
      d.style.left = (railX(a) - 8) + 'px'; d.style.width = (railX(b) - railX(a) + 16) + 'px'; d.textContent = name; d.title = name;
      rail.appendChild(d);
    }
    STOPS.forEach((s, k) => {
      const b = document.createElement('button'); b.className = 'dot' + (s.minor ? ' small' : ''); b.style.left = railX(k) + 'px';
      b.title = `${s.key} · ${s.title}`; b.onclick = () => go(k); rail.appendChild(b);
      const n = document.createElement('div'); n.className = 'num'; n.style.left = railX(k) + 'px'; n.textContent = s.key; rail.appendChild(n);
    });
  }
  // the library's own buttons, drawn by the bench in its tray: [{ id, label, on, disabled, title, onClick }]
  let trayKey = null;
  function drawTray() {
    const items = lib.tray ? lib.tray() : [], tray = $('tray');
    const key = items.map(b => b.id).join('|');
    if (key !== trayKey) {
      trayKey = key; tray.innerHTML = '';
      items.forEach(b => {
        const e = document.createElement('button'); e.dataset.id = b.id;
        e.onclick = () => { const it = (lib.tray() || []).find(x => x.id === b.id); if (it && it.onClick) it.onClick(); ui(); };
        tray.appendChild(e);
      });
      layoutBar(); buildRail();
    }
    items.forEach(b => {
      const e = tray.querySelector(`[data-id="${b.id}"]`);
      e.textContent = b.label; e.title = b.title || ''; e.disabled = !!b.disabled; e.classList.toggle('on', !!b.on);
    });
  }
  // the caption: a string, or segments [[text, colour?], …] so a library can colour its key words (text nodes only)
  const COLOUR = /^#[0-9a-f]{3,8}$/i;
  let capKey = null;
  function setCaption(c, mark = 'i') {   // mark: 'i' (a statement) or '?' (a question to the room)
    const segs = Array.isArray(c) ? c.map(x => (Array.isArray(x) ? x : [String(x)])) : (c ? [[String(c)]] : []);
    const key = JSON.stringify(segs) + mark;
    if (key === capKey) return;
    capKey = key;
    const el = $('caption');
    el.classList.toggle('none', !segs.length);
    if (!segs.length) { el.replaceChildren(); return; }
    const icon = document.createElement('span'); icon.className = 'ci'; icon.textContent = mark === '?' ? '?' : 'i';
    el.replaceChildren(icon, ...segs.map(([t, col]) => {
      const sp = document.createElement('span'); sp.className = 'seg'; sp.textContent = t;
      if (col && COLOUR.test(col)) { sp.style.color = col; sp.style.fontWeight = '700'; }
      return sp;
    }));
  }
  function holdText(s) {
    if (st.explore) return lib.explore.hold || 'Explore: the scene is yours to drive';
    const nx = STOPS[st.i + 1];
    if (nx && nx.group === s.group) {
      let last = st.i; while (STOPS[last + 1] && STOPS[last + 1].group === s.group) last++;
      return `Play runs ${s.group} through to “${STOPS[last].title}”`;
    }
    return 'Play runs the next paragraph, then holds';
  }
  function ui() {
    if (!lib) {
      ['tchip', 'title', 'holdinfo'].forEach(id => { $(id).textContent = ''; }); setCaption('');
      $('stateText').textContent = 'No library'; $('state').className = '';
      $('rail').querySelectorAll('.dot,.num,.ch').forEach(e => e.remove()); $('railFill').style.width = '0';
      return;
    }
    const s = stop(), val = v => typeof v === 'function' ? v() : v, X = lib.explore;
    setCaption(st.explore ? (X.caption ? val(X.caption) : '') : (val(s.caption) || ''), st.explore ? 'i' : (s.captionMark || 'i'));
    const chip = st.explore ? val(X.chip) : val(s.chip);
    $('tchip').textContent = chip || ''; $('tchip').style.opacity = chip ? 1 : 0;
    const pb = $('play');
    if (pb.classList.contains('stop') !== st.playing) {
      pb.classList.toggle('stop', st.playing);
      pb.innerHTML = st.playing ? ICON_STOP : ICON_PLAY;
      pb.setAttribute('aria-label', st.playing ? 'Stop' : 'Play'); pb.title = (st.playing ? 'Stop' : 'Play') + ' (Space)';
    }
    $('prev').disabled = st.i === 0; $('next').disabled = st.i === STOPS.length - 1;
    $('title').textContent = `Stop ${s.key} · ${s.title}`;
    $('holdinfo').textContent = holdText(s);
    $('xBtn').classList.toggle('on', st.explore); $('xBtn').textContent = st.explore ? 'Explore: on' : 'Explore';
    if (lib.hasExplore) {   // a sequence: Explore shows only while the block on the stage has one
      const on = !!(meta.features || {}).explore && lib.hasExplore();
      if ($('xBtn').style.display !== (on ? '' : 'none')) { $('xBtn').style.display = on ? '' : 'none'; layoutBar(); }
    }
    $('cardsBtn').textContent = st.cards ? 'Cards: on' : 'Cards: off'; $('cardsBtn').classList.toggle('on', st.cards);
    $('speed').textContent = st.speed + '×';
    $('state').className = st.playing ? 'moving' : '';
    $('stateText').textContent = `${st.explore ? 'Exploring' : st.playing ? 'Playing' : 'Holding'} · stop ${s.key}`;
    drawTray();
    document.querySelectorAll('#rail .dot').forEach((d, k) => { d.classList.toggle('done', k < st.i); d.classList.toggle('cur', k === st.i); });
    document.querySelectorAll('#rail .num').forEach((d, k) => d.classList.toggle('cur', k === st.i));
    $('railFill').style.width = railX(st.i) + 'px';
  }

  $('prev').onclick = () => go(st.i - 1);
  $('next').onclick = () => go(st.i + 1);
  $('play').onclick = play;
  $('reset').onclick = reset;
  $('xBtn').onclick = () => setExplore(!st.explore);
  $('cardsBtn').onclick = () => { st.cards = !st.cards; ui(); };
  $('speed').onclick = () => { st.speed = SPEEDS[(SPEEDS.indexOf(st.speed) + 1) % SPEEDS.length]; ui(); };
  addEventListener('keydown', e => {
    if (!lib || e.ctrlKey || e.metaKey || e.altKey || e.target.closest('input')) return;
    const f = meta.features || {}, k = e.key, K = k.length === 1 ? k.toLowerCase() : k;
    if (K === 'ArrowRight' || K === 'PageDown') { go(st.i + 1); e.preventDefault(); }
    else if (K === 'ArrowLeft' || K === 'PageUp') { go(st.i - 1); e.preventDefault(); }
    else if (K === ' ') { play(); e.preventDefault(); }
    else if (K === 'r') reset();
    else if (K === 'x' && f.explore) setExplore(!st.explore);
    else if (K === 'c' && f.cards !== false) $('cardsBtn').click();
    else if (K === 'm') st.reduced = !st.reduced;
    else if (K === 'Home') go(0);
    else if (K === 'End') go(STOPS.length - 1);
    else if (lib.keys && lib.keys[K]) { lib.keys[K](); ui(); }
  });
  function fit() {
    const s = Math.min(innerWidth / 1920, innerHeight / 1080);
    $('app').style.transform = `translate(${(innerWidth - 1920 * s) / 2}px,${(innerHeight - 1080 * s) / 2}px) scale(${s})`;
  }
  addEventListener('resize', fit); fit();

  // ───────────── the frame loop ─────────────
  let last = 0;
  (function loop(now) {
    if (now != null) {
      now /= 1000;
      const dt = last ? Math.min(0.1, now - last) : 0.016;
      last = now;
      if (lib) { step(dt); lib.frame(dt); }
    }
    requestAnimationFrame(loop);
  })();

  // ───────────── what a library calls ─────────────
  const api = {
    state: st,
    meta: () => meta,              // the library's own library.json, as loaded
    params: () => resolveParams(meta, {}, meta.name),   // loaded on its own, a unit runs on its declared defaults
    refresh: () => ui(),           // a value on the bench's surface changed (a caption follows the input)
  };
  window.AnimationBench = {
    register(impl) {
      try { accept(impl); } catch (e) { regError = e; throw e; }
    },
  };
  function validate(impl, m) {
    if (!m) throw new Error('a library registered without being loaded through its library.json');
    if (impl.id && impl.id !== m.id) throw new Error(`library.json says ${m.id}, its code registers ${impl.id}`);
    if (!Array.isArray(impl.stops) || !impl.stops.length) throw new Error(`${m.name} registered no stops`);
    if ((m.features || {}).explore && !impl.explore) throw new Error(`${m.name}: library.json offers Explore, its code has none`);
  }
  function accept(impl) {
    if (collecting) { validate(impl, collecting.meta); collecting.impl = impl; return; }
    validate(impl, meta);
    start(impl);
  }
  function start(impl) {
    lib = impl; STOPS = impl.stops;
    impl.mount($('stage'), api);
    const h = decodeURIComponent(location.hash.slice(1)), hi = STOPS.findIndex(s => s.key === h);
    if (hi >= 0) st.i = hi;
    if (impl.enterStop) impl.enterStop(st.i, -1, false);
    drawTray(); layoutBar(); buildRail(); ui();
    impl.settle();
  }

  // ───────────── a sequence: its units composed into one played library ─────────────
  // Each unit mounts in a block of its own (a full-stage layer); only the block of the current stop is shown. A unit
  // sees the bench's state through a view of its own: its stop index (i) and time (t) are its own; the rest is the bench's.
  function compose(units) {
    const stops = [], sections = [], LET = 'abcdefghijklmnopqrstuvwxyz';
    units.forEach((u, b) => {
      const first = stops.length, n = u.impl.stops.length, keys = u.block.keys || [];
      u.impl.stops.forEach((s, k) => stops.push(Object.assign({}, s, {
        key: keys[k] != null ? String(keys[k]) : (n === 1 ? String(b + 1) : `${b + 1}${LET[k]}`),
        group: `${b}:${s.group || s.key}`, block: b, local: k,
      })));
      sections.push([u.block.title || u.meta.title, first, stops.length - 1]);
    });
    let cur = -1;
    const blocks = [], timers = [];
    const act = () => units[cur] || units[0];
    const view = b => ({
      get i() { const s = STOPS[st.i]; return s.block === b ? s.local : (s.block > b ? units[b].impl.stops.length - 1 : 0); },
      get t() { return STOPS[st.i].block === b ? st.t : 0; },
      get playing() { return st.playing; }, get paused() { return st.paused; }, get speed() { return st.speed; },
      get reduced() { return st.reduced; }, get cards() { return st.cards; }, get explore() { return st.explore; },
    });
    function show(b) {
      if (b === cur) return;
      const out = blocks[cur], inn = blocks[b];
      clearTimeout(timers[b]);
      inn.style.display = '';
      inn.classList.toggle('instant', st.reduced);
      inn.classList.remove('before', 'after');
      inn.classList.add(cur < 0 || b > cur ? 'before' : 'after');
      void inn.offsetWidth;                        // the entering block starts from its "before" state
      inn.classList.remove('before', 'after'); inn.classList.add('on');
      if (out) {
        out.classList.toggle('instant', st.reduced);
        out.classList.remove('on'); out.classList.add(b > cur ? 'after' : 'before');
        const k = cur;
        timers[k] = setTimeout(() => { if (k !== cur) out.style.display = 'none'; }, st.reduced ? 0 : HANDOVER);
      }
      cur = b;
    }
    const X = {
      set: on => { const e = act().impl.explore; if (e) e.set(on); },
      reset: () => { const e = act().impl.explore; if (e) e.reset(); },
      get chip() { const e = act().impl.explore; return e && e.chip; },
      get hold() { const e = act().impl.explore; return e && e.hold; },
      get caption() { const e = act().impl.explore; return e && e.caption; },
    };
    return {
      id: meta.id, stops, sections, units,
      mount(stage) {
        units.forEach((u, b) => {
          const el = document.createElement('div'); el.className = 'block before'; el.style.display = 'none';
          el.dataset.unit = u.meta.id; stage.appendChild(el); blocks.push(el);
          u.impl.mount(el, { state: view(b), meta: () => u.meta, params: () => u.params, refresh: () => ui() });
        });
      },
      enterStop(i, from, playing) {
        const s = stops[i], f = from >= 0 ? stops[from] : null;
        show(s.block);
        const u = units[s.block];
        if (u.impl.enterStop) u.impl.enterStop(s.local, f && f.block === s.block ? f.local : -1, playing);
        if (!f || f.block !== s.block) u.impl.settle();
      },
      onPlay(i) { const s = stops[i], u = units[s.block]; if (u.impl.onPlay) u.impl.onPlay(s.local); },
      reset() { units.forEach(u => { if (u.impl.reset) u.impl.reset(); }); },
      frame(dt) { act().impl.frame(dt); },
      settle() { act().impl.settle(); },
      unmount() { units.forEach(u => { if (u.impl.unmount) try { u.impl.unmount(); } catch (e) { /* cleared anyway */ } }); timers.forEach(clearTimeout); },
      hasExplore: () => !!act().impl.explore,
      explore: X,
      tray: () => (act().impl.tray ? act().impl.tray() : []),
      keys: new Proxy({}, { get: (_, k) => act().impl.keys && act().impl.keys[k] }),
      capture: {
        opts: o => { const c = act().impl.capture; if (c && c.opts) c.opts(o); },
        explore: o => { const c = act().impl.capture; return c && c.explore ? c.explore(o) : null; },
      },
    };
  }

  // for captures (hidden window): set a stop and a moment by hand
  window.__bench = {
    at: (key, t, opts = {}) => {
      const i = STOPS.findIndex(s => s.key === key); go(i);
      for (const k of Object.keys(opts)) if (k in st) st[k] = opts[k];
      if (lib.capture && lib.capture.opts) lib.capture.opts(opts);
      st.t = t; st.paused = true;
      lib.settle(); ui(); lib.frame(0.016); return STOPS[i].title;
    },
    explore: (o = {}) => { if (!st.explore) setExplore(true); const r = lib.capture.explore(o); ui(); return r; },
    frameNow: () => lib.frame(0.016),
    run: sec => { for (let n = 0; n < sec * 30; n++) { step(1 / 30); lib.frame(1 / 30); } return { i: st.i, key: stop().key, playing: st.playing, t: +st.t.toFixed(2) }; },
    stops: () => STOPS.map(s => s.key),
    fps: ms => new Promise(res => { let n = 0; const t0 = performance.now(); (function f() { n++; if (performance.now() - t0 < ms) requestAnimationFrame(f); else res((n / ((performance.now() - t0) / 1000)).toFixed(1)); })(); }),
    state: st, meta: () => meta,
    load: loc => loadFromLocation(loc).catch(fail),
    block: () => (lib && lib.units ? STOPS[st.i].block : null),
    play, go, reset, setExplore,
  };

  configure(null); ui();
  const loc = new URLSearchParams(location.search).get('lib');
  if (loc) loadFromLocation(loc).catch(fail);
})();
