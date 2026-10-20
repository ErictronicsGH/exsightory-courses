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
// Owner, 2026-10-08 (contract 3): "save each card as a library on its own then they are assembled … the numbers will not
// be part of the library but the assembly": a scene library (kind "scene") draws one set-up in its own viewport and can
// be mounted many times; an assembly (kind "assembly") names scene libraries as its parts, and its own code lays them
// out and frames them (numbers, titles, order, entrances). And "add the language switch outright … languages can be
// switch[ed] efficiently without recoding", following the parent application: every word is { en, fr } data (the
// bench's own in i18n.json, a library's in its library.json), English where a language is missing, numbers and units
// never translated; the bench's EN | FR switch re-labels everything in place, without a reload.
'use strict';
(async function () {
  const $ = id => document.getElementById(id);
  const BENCH = { type: 'animation', contracts: [1, 2, 3, 4] };
  const HANDOVER = 750;                // ms: one block gives the stage to the next
  const SPEEDS = [1, 2, 0.5];
  const ICON_PLAY = '<svg viewBox="0 0 24 24"><path d="M8 5v14l11-7z"/></svg>';
  const ICON_STOP = '<svg viewBox="0 0 24 24"><path d="M6 6h12v12H6z"/></svg>';
  const TAIL = 1.2;                    // a stop holds this long after its motion before Play moves on (a stop may set its own)

  // ───────────── languages (as the parent application: LocalizedText { en, fr? }, English the fallback) ─────────────
  const LANGS = ['en', 'fr'], LANG_KEY = 'ex-locale';     // the viewer's choice, under the key the platform uses
  let CAT = {};
  try { CAT = await (await fetch('i18n.json?v=14', { cache: 'no-cache' })).json(); } catch (e) { /* the English below stands */ }
  const fill = (s, vars) => vars ? s.replace(/\{(\w+)\}/g, (m, k) => vars[k] != null ? vars[k] : m) : s;
  // a text: a plain string (the same in every language), a { en, fr } map, '@key' (an entry of the strings table given),
  // or caption segments [[text, colour?], …]
  function loc(v, strings, vars) {
    if (v == null) return '';
    if (typeof v === 'string' && v[0] === '@' && strings && strings[v.slice(1)] != null) v = strings[v.slice(1)];
    if (typeof v === 'object' && !Array.isArray(v)) v = v[st.lang] != null ? v[st.lang] : (v.en != null ? v.en : '');   // the language first
    if (Array.isArray(v)) return v.map(x => Array.isArray(x) ? [loc(x[0], strings, vars), x[1]] : [loc(x, strings, vars)]);   // then segments
    return fill(String(v), vars);
  }
  const T = (k, vars) => loc(CAT[k] != null ? CAT[k] : k, null, vars);
  const nm = m => loc(m && m.name);

  // the bench's state; a library reads it (never writes it): i, t, playing, paused, speed, reduced, cards, explore, lang
  const st = { i: 0, t: 0, playing: false, paused: false, speed: 1, reduced: false, cards: false, explore: false, lang: 'en', autoplay: false };
  // Arriving at a stop (owner, 2026-10-09, a standing rule for every library): a stop reached by Next, Previous, the rail,
  // Reset or a load shows its FIRST frame, frozen (the clock held at 0), until Play: the view never gives its ending away
  // before it is played. Autoplay (the presenter's switch, kept per viewer; key A; ?autoplay=1) starts each stop's motion
  // the moment it arrives and holds at its end, as Replay does.
  try { st.autoplay = localStorage.getItem('ab-autoplay') === '1'; } catch (e) { /* storage blocked: off */ }
  { const q = new URLSearchParams(location.search).get('autoplay'); if (q != null) st.autoplay = q === '1' || q === 'true'; }
  // the stop just arrived at: held at its first frame, or (Autoplay) its motion started, holding at its end
  function arrive() {
    st.t = 0;
    if (st.autoplay && !st.explore) { st.playing = true; st.paused = false; st.replaying = true; }
    else { st.playing = false; st.paused = true; st.replaying = false; }
  }
  st.lang = (() => {
    const q = new URLSearchParams(location.search).get('lang'); if (LANGS.includes(q)) return q;
    try { const s = localStorage.getItem(LANG_KEY); if (LANGS.includes(s)) return s; } catch (e) { /* not kept */ }
    return 'en';
  })();
  try { st.reduced = matchMedia('(prefers-reduced-motion: reduce)').matches; } catch (e) { /* no media queries */ }
  let lib = null, meta = null, top = null, STOPS = [];   // top: the loaded unit (its strings), when it is not a sequence
  let added = [], blobs = [];          // what the loaded library put into the page (removed when another is loaded)
  let regError = null;                 // why the library's register call was refused
  let collecting = null;               // while a unit's scripts run: where its register call goes
  let emptyErr = null;                 // why the last library could not be loaded (shown on the empty stage)
  let loaded = [], SHARED = new Set();  // every unit in play; the settings a sequence shares across its blocks (contract 4)

  // ───────────── loading a library ─────────────
  function check(m) {
    const need = (k, ok) => { if (!ok) throw new Error(`library.json: ${k}`); };
    need('needs an id, a name and a title', m && m.id && m.name && m.title);
    need(`targets the ${m.bench && m.bench.type || 'unknown'} bench, not this one (animation)`, m.bench && m.bench.type === BENCH.type);
    need(`asks for contract ${m.bench.contract}; this bench speaks ${BENCH.contracts.join(', ')}`, BENCH.contracts.includes(m.bench.contract));
    if (m.kind === 'sequence') need('is a sequence with no units', Array.isArray(m.sequence) && m.sequence.length && m.sequence.every(b => b && b.unit));
    else need('lists no scripts', Array.isArray(m.scripts) && m.scripts.length);
    if (m.kind === 'scene') need('is a scene with no viewport (width, height)', m.viewport && m.viewport.width > 0 && m.viewport.height > 0);
    if (m.kind === 'assembly') need('is an assembly with no parts', Array.isArray(m.parts) && m.parts.length && m.parts.every(p => p && p.unit));
  }
  // a unit's settings: its library.json declares them (type, values or range, default); a sequence or an assembly may set them
  function resolveParams(um, given, where) {
    const decl = um.params || {}, out = {};
    for (const [k, d] of Object.entries(decl)) out[k] = d.default;
    for (const [k, v] of Object.entries(given || {})) {
      const d = decl[k];
      if (!d) throw new Error(`${where}: ${nm(um)} has no setting “${k}”`);
      if (d.values && !d.values.includes(v)) throw new Error(`${where}: ${nm(um)}: “${k}” is one of ${d.values.join(', ')}, not ${v}`);
      if (d.min != null && (typeof v !== 'number' || v < d.min || v > d.max)) throw new Error(`${where}: ${nm(um)}: “${k}” runs ${d.min}–${d.max}, not ${v}`);
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
  const dirOf = (rel, base) => new URL(rel.endsWith('/') ? rel : rel + '/', base);
  const urlFor = (base, m) => f => new URL(f, base).href + '?v=' + encodeURIComponent(m.version || '1');
  async function fetchMeta(base, where) {
    const r = await fetch(new URL('library.json', base), { cache: 'no-cache' });
    if (!r.ok) throw new Error(`${where}: no library.json`);
    return r.json();
  }
  // run a library's files; its register call is kept (collecting) and returned
  async function runScripts(m, urlOf, where) {
    for (const f of m.css || []) addCss(urlOf(f));
    collecting = { meta: m, impl: null };
    let got;
    try { for (const f of m.scripts) await loadScript(urlOf(f)); }
    finally { got = collecting; collecting = null; }
    if (!got.impl) throw regError || new Error(`${where}: ${nm(m)}: its scripts ran but it did not register with the bench`);
    return got.impl;
  }
  // a unit: a library made ready to play (alone, as a block of a sequence, or as a part of an assembly). Its strings are
  // its library.json's, with any the user of it (a sequence's block, an assembly's part) gives over them.
  async function loadUnit(m, base, urlOf, given, overrides, where) {
    check(m);
    if (m.kind === 'sequence') throw new Error(`${where}: ${nm(m)} is a sequence; a sequence cannot be used inside another library`);
    const unit = { meta: m, params: resolveParams(m, given, where), strings: Object.assign({}, m.strings || {}, overrides || {}), parts: [] };
    unit.live = Object.assign({}, unit.params); loaded.push(unit);
    if (m.kind === 'assembly') for (const [k, p] of m.parts.entries()) {
      const pw = `${where} · part ${k + 1}`, pbase = dirOf(p.unit, base), pm = await fetchMeta(pbase, pw);
      if (pm.kind !== 'scene') throw new Error(`${pw}: ${nm(pm)} is not a scene library; an assembly places scenes`);
      unit.parts.push(await loadUnit(pm, pbase, urlFor(pbase, pm), p.params, p.strings, pw));
    }
    unit.raw = await runScripts(m, urlOf, where);
    unit.impl = m.kind === 'scene' ? composeScene(unit) : m.kind === 'assembly' ? composeAssembly(unit) : unit.raw;
    return unit;
  }
  async function loadFromLocation(where) {
    const base = dirOf(where, location.href), m = await fetchMeta(base, where);
    check(m);
    unload();
    meta = m; regError = null;
    configure(m);
    if (m.kind === 'sequence') {
      const units = [];
      SHARED = new Set(m.shared || []);
      for (const [n, b] of m.sequence.entries()) {
        const bw = `block ${n + 1}`, ubase = dirOf(b.unit, base), um = await fetchMeta(ubase, bw);
        const u = await loadUnit(um, ubase, urlFor(ubase, um), b.params, b.strings, bw);
        u.block = b; units.push(u);
      }
      // a shared setting starts from the first block that sets it up, and every block that declares it holds that value
      for (const k of SHARED) {
        const first = units.find(u => k in u.live);
        if (!first) throw new Error(`${nm(m)} shares “${k}”, and none of its blocks has that setting`);
        units.forEach(u => { if (k in u.live) u.live[k] = u.params[k] = first.params[k]; });
      }
      start(compose(units));
    } else {
      top = await loadUnit(m, base, urlFor(base, m), {}, null, nm(m));
      start(top.impl, top);
    }
    remember({ loc: where, id: m.id, name: m.name, title: m.title, card: m.card || '' });
    const u = new URL(location.href); u.searchParams.set('lib', where); history.replaceState(null, '', u.pathname + u.search + location.hash);
  }
  async function loadFromFolder(fileList) {
    const files = {};
    for (const f of fileList) { const rel = (f.webkitRelativePath || f.name).split('/').slice(1).join('/') || f.name; files[rel] = f; }
    if (!files['library.json']) throw new Error('the folder has no library.json');
    const m = JSON.parse(await files['library.json'].text());
    if (m.kind === 'sequence' || m.kind === 'assembly') throw new Error(`a ${m.kind} names its libraries by location: load it from a location, not a folder`);
    check(m);
    unload();
    meta = m; regError = null;
    configure(m);
    top = await loadUnit(m, location.href, f => {
      if (!files[f]) throw new Error(`the folder has no ${f} (named in library.json)`);
      const u = URL.createObjectURL(files[f]); blobs.push(u); return u;
    }, {}, null, nm(m));
    start(top.impl, top);
    history.replaceState(null, '', location.pathname + (st.lang !== 'en' ? `?lang=${st.lang}` : ''));
  }
  function unload() {
    if (lib && lib.unmount) try { lib.unmount(); } catch (e) { /* the stage is cleared anyway */ }
    lib = null; meta = null; top = null; STOPS = []; loaded = []; SHARED = new Set();
    $('stage').innerHTML = '';
    added.forEach(e => e.remove()); added = [];
    blobs.forEach(u => URL.revokeObjectURL(u)); blobs = [];
    Object.assign(st, { i: 0, t: 0, playing: false, paused: false, cards: false, explore: false });
    trayKey = null; $('tray').innerHTML = '';
    emptyErr = null;
    configure(null);
  }
  function fail(e) {
    unload();
    emptyErr = String(e.message || e);
    applyChrome();
  }
  // the bench's frame, from the library's metadata (or empty)
  function configure(m) {
    $('empty').style.display = m ? 'none' : '';
    $('libTitle').textContent = m ? loc(m.title) : T('benchName');
    const kind = !m ? '' : m.kind === 'sequence' ? T('nBlocks', { n: m.sequence.length }) : m.kind === 'assembly' ? T('nParts', { n: m.parts.length })
      : m.kind === 'scene' ? T('kindScene') : (m.kind || '2D');
    const crumbs = m ? [nm(m), loc(m.card), T('benchName'), kind].filter(Boolean) : [T('noLibrary')];
    $('libSub').replaceChildren(...crumbs.flatMap((c, k) => { const t = document.createTextNode(c); if (!k) return [t]; const i = document.createElement('i'); i.textContent = '›'; return [i, t]; }));
    document.title = m ? `${loc(m.title)} · ${T('benchName')}` : T('benchName');
    const f = (m && m.features) || {};
    $('xBtn').style.display = f.explore ? '' : 'none';
    $('cardsBtn').style.display = m && f.cards !== false ? '' : 'none';
    const keys = T('hintKeys') + (f.explore ? T('hintExplore') : '') + (m && f.cards !== false ? T('hintCards') : '');
    $('hint').textContent = m ? (m.keys ? `${keys} · ${loc(m.keys)}` : keys) : '';
    ['prev', 'play', 'reset', 'next', 'speed', 'autoBtn'].forEach(id => { $(id).disabled = !m; });
    // the language switch shows when the library offers more than one language (and on the empty bench)
    const offered = m ? (m.languages || ['en']).filter(l => LANGS.includes(l)) : LANGS;
    $('langSw').style.display = offered.length > 1 ? '' : 'none';
    drawMenu();
  }
  // the bench's own words on its frame (everything that is not the library's)
  function applyChrome() {
    document.documentElement.lang = st.lang;
    $('emptyMsg').innerHTML = emptyErr ? `<b>${T('couldNotLoad')}</b><br>${emptyErr.replace(/</g, '&lt;')}` : T('emptyMsg');
    $('emptyOpen').textContent = T('loadLibrary');
    $('libBtn').innerHTML = `${T('library')} <b>▾</b>`; $('libBtn').title = T('libraryTip');
    $('prev').title = $('prev').ariaLabel = T('prevTip');
    $('next').title = $('next').ariaLabel = T('nextTip');
    $('reset').title = T('resetTip'); $('reset').ariaLabel = T('resetTip');
    $('replay').title = T('replayTip'); $('replay').ariaLabel = T('replayTip');
    $('xBtn').title = T('exploreTip'); $('cardsBtn').title = T('cardsTip'); $('speed').title = T('speedTip');
    $('langSw').title = T('languageTip');
    $('langSw').querySelectorAll('button').forEach(b => { b.classList.toggle('on', b.dataset.l === st.lang); b.setAttribute('aria-pressed', b.dataset.l === st.lang); });
  }
  // the language switch: everything re-labels in place; the stop, its time and the play state are kept
  function setLang(l) {
    if (!LANGS.includes(l) || l === st.lang) return;
    st.lang = l;
    try { localStorage.setItem(LANG_KEY, l); } catch (e) { /* not kept */ }
    const u = new URL(location.href); u.searchParams.set('lang', l); history.replaceState(null, '', u.pathname + u.search + location.hash);
    applyChrome();
    configure(meta);
    if (lib) { if (lib.relabel) lib.relabel(); trayKey = null; drawTray(); buildRail(); capKey = null; playKey = null; ui(); }
    else ui();
  }
  $('langSw').querySelectorAll('button').forEach(b => { b.onclick = () => setLang(b.dataset.l); });

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
      (m ? `<div class="cap">${esc(T('loaded'))}</div><div class="loaded"><div class="t">${esc(loc(m.title))}</div>
        <div class="mono">${esc([nm(m), loc(m.card), m.kind, m.version && 'v' + m.version].filter(Boolean).join(' · '))}</div>
        ${m.description ? `<div class="d">${esc(loc(m.description))}</div>` : ''}</div>` : '') +
      `<div class="cap">${esc(T('loadALibrary'))}</div>
       <button class="it" id="pickFolder"><span>${esc(T('openFolder'))}</span><span class="note">${esc(T('openFolderNote'))}</span></button>
       <form class="loc" id="locForm"><input id="locIn" placeholder="${esc(T('locationPh'))}" spellcheck="false"><button>${esc(T('load'))}</button></form>` +
      (rs.length ? `<div class="cap">${esc(T('recent'))}</div>` + rs.map(r =>
        `<button class="it" data-loc="${esc(r.loc)}"><span class="card">${esc(loc(r.card))}</span><span>${esc(loc(r.title))}</span><span class="note">${esc(loc(r.name))}</span></button>`).join('') : '');
    $('pickFolder').onclick = () => $('folderIn').click();
    $('locForm').onsubmit = ev => { ev.preventDefault(); const v = $('locIn').value.trim(); if (v) openLoc(v); };
    $('libMenu').querySelectorAll('[data-loc]').forEach(b => { b.onclick = () => openLoc(b.dataset.loc); });
  }
  const openLoc = where => { $('libMenu').classList.remove('open'); loadFromLocation(where).catch(fail); };
  $('folderIn').onchange = ev => { $('libMenu').classList.remove('open'); if (ev.target.files.length) loadFromFolder(ev.target.files).catch(fail); ev.target.value = ''; };
  $('libBtn').onclick = ev => { ev.stopPropagation(); drawMenu(); $('libMenu').classList.toggle('open'); };
  $('emptyOpen').onclick = ev => { ev.stopPropagation(); drawMenu(); $('libMenu').classList.add('open'); };
  addEventListener('pointerdown', ev => { if (!ev.target.closest('#libMenu,#libBtn,#emptyOpen')) $('libMenu').classList.remove('open'); });

  // ───────────── the clock and the transport ─────────────
  const stop = () => STOPS[st.i];
  const tailOf = s => s.tail != null ? s.tail : TAIL;
  const sx = s => s._s || (top && top.strings) || (meta && meta.strings);   // the strings a stop's '@key' texts name
  function step(dt) {
    if (!st.paused) st.t += dt * st.speed;
    const s = stop();
    // Play and Replay are per view (owner, 2026-10-09: "the play button and replay will be per view but the reset will be
    // for the whole views"): the stop's motion runs to its end and holds there; Next and Previous move between views
    if (st.playing && !st.explore && st.t >= s.dur + tailOf(s)) { st.playing = false; st.replaying = false; ui(); }
  }
  function go(i, keepPlaying = false) {
    if (!lib) return;
    i = Math.max(0, Math.min(STOPS.length - 1, i));
    if (st.explore) setExplore(false);
    if (i !== st.i) {
      const from = st.i;
      st.i = i;
      if (keepPlaying) { st.t = 0; st.paused = false; st.replaying = false; }   // Play running on into the paragraph's next stop
      else arrive();
      if (lib.enterStop) lib.enterStop(i, from, st.playing);
    }
    ui();
  }
  function play() {
    if (!lib) return;
    if (st.explore) setExplore(false);
    st.replaying = false;
    if (st.playing) { st.playing = false; st.paused = true; ui(); return; }
    st.playing = true; st.paused = false;
    const s = stop();
    if (s.advanceOnPlay && st.i < STOPS.length - 1) { go(st.i + 1, true); return; }
    // a library that showed this stop settled (reached by Next) may ask Play to run its motion again from the start
    if (lib.onPlay && lib.onPlay(st.i) === 'replay') { st.t = 0; ui(); return; }
    if (st.t >= s.dur) { replay(); return; }   // this view is done: Play runs it again from its start (per view, never on)
    ui();
  }
  // Replay (owner, 2026-10-09: "make the animation replayable"): the stop on show runs its motion again from its start,
  // whether it was played or reached settled by Next, then holds at its end (Play still runs the next paragraph)
  function replay() {
    if (!lib) return;
    if (st.explore) setExplore(false);
    st.t = 0; st.paused = false; st.playing = true; st.replaying = true;
    if (lib.enterStop) lib.enterStop(st.i, st.i, true);
    ui();
  }
  // Reset (owner, 2026-10-08: "reset must take the animation to the beginning"): back to the first stop, stopped, and
  // the library's own inputs back to how it was set up (its reset hook); in Explore, the scene as it was set up
  function reset() {
    if (!lib) return;
    if (st.explore) { lib.explore.reset(); ui(); return; }
    st.playing = false; st.paused = false; st.replaying = false;
    loaded.forEach(u => { u.live = Object.assign({}, u.params); });   // every input as it was set up (shared ones too)
    if (lib.reset) lib.reset();
    if (st.i !== 0) go(0); else { arrive(); if (lib.enterStop) lib.enterStop(0, -1, st.playing); lib.settle(); ui(); }
    ui();
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
    if (tray.children.length) { $('trayCap').style.width = (tray.offsetWidth - 24) + 'px'; $('trayCap').textContent = T('thisLibrary'); }
    else $('trayCap').textContent = '';
  }
  function buildRail() {
    const rail = $('rail');
    rail.querySelectorAll('.dot,.num,.ch').forEach(e => e.remove());
    for (const [name, a, b, strs] of (lib.sections || [])) {
      const d = document.createElement('div'), label = loc(name, strs || sx(STOPS[a])); d.className = 'ch';
      // a one-stop section is as wide as the gap to its neighbours (its name readable, not cut to "T…")
      const step = STOPS.length > 1 ? railX(1) - railX(0) : 120, w = Math.max(railX(b) - railX(a) + 16, step - 14), mid = (railX(a) + railX(b)) / 2;
      d.style.left = (mid - w / 2) + 'px'; d.style.width = w + 'px'; d.textContent = label; d.title = label;
      rail.appendChild(d);
    }
    STOPS.forEach((s, k) => {
      const b = document.createElement('button'); b.className = 'dot' + (s.minor ? ' small' : ''); b.style.left = railX(k) + 'px';
      b.title = `${s.key} · ${loc(s.title, sx(s))}`; b.onclick = () => go(k); rail.appendChild(b);
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
      // an item with an icon (svg markup for a 24 × 24 box) is a small round button, icon only; its title says what it does
      if (b.icon) { if (e._icon !== b.icon) { e.innerHTML = `<svg viewBox="0 0 24 24" aria-hidden="true">${b.icon}</svg>`; e._icon = b.icon; } e.classList.add('icon'); e.setAttribute('aria-label', loc(b.title, sx(stop()))); }
      else e.textContent = loc(b.label, sx(stop()));
      e.title = loc(b.title, sx(stop())); e.disabled = !!b.disabled; e.classList.toggle('on', !!b.on); e.setAttribute('aria-pressed', b.on ? 'true' : 'false');
    });
  }
  // the caption: a string, or segments [[text, colour?], …] so a library can colour its key words (text nodes only)
  const COLOUR = /^#[0-9a-f]{3,8}$/i;
  let capKey = null, playKey = null;
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
    if (st.explore) return loc(lib.explore.hold, sx(s)) || T('exploreHold');
    if (st.playing) return T('holdPlaying');
    if (st.paused && st.t === 0) return T('holdReady');                 // waiting at its first frame
    if (st.t >= s.dur) return T(st.i < STOPS.length - 1 ? 'holdDone' : 'holdLast');
    return T('holdPaused');
  }
  function ui() {
    if (!lib) {
      ['tchip', 'title', 'holdinfo'].forEach(id => { $(id).textContent = ''; }); setCaption('');
      $('stateText').textContent = T('noLibraryState'); $('state').className = '';
      $('rail').querySelectorAll('.dot,.num,.ch').forEach(e => e.remove()); $('railFill').style.width = '0';
      return;
    }
    const s = stop(), val = v => typeof v === 'function' ? v() : v, X = lib.explore, ss = sx(s);
    setCaption(loc(st.explore ? (X.caption ? val(X.caption) : '') : (val(s.caption) || ''), ss), st.explore ? 'i' : (s.captionMark || 'i'));
    const chip = loc(st.explore ? val(X.chip) : val(s.chip), ss);
    $('tchip').textContent = chip || ''; $('tchip').style.opacity = chip ? 1 : 0;
    const pb = $('play'), pk = st.playing + st.lang;
    if (pk !== playKey) {
      playKey = pk;
      pb.classList.toggle('stop', st.playing);
      pb.innerHTML = st.playing ? ICON_STOP : ICON_PLAY;
      pb.setAttribute('aria-label', T(st.playing ? 'stop' : 'play')); pb.title = T(st.playing ? 'stopTip' : 'playTip');
    }
    $('prev').disabled = st.i === 0; $('next').disabled = st.i === STOPS.length - 1;
    $('title').textContent = T('stopTitle', { key: s.key, title: loc(s.title, ss) });
    $('holdinfo').textContent = holdText(s);
    $('xBtn').classList.toggle('on', st.explore); $('xBtn').textContent = T(st.explore ? 'exploreOn' : 'explore');
    if (lib.hasExplore) {   // a sequence: Explore shows only while the block on the stage has one
      const on = !!(meta.features || {}).explore && lib.hasExplore();
      if ($('xBtn').style.display !== (on ? '' : 'none')) { $('xBtn').style.display = on ? '' : 'none'; layoutBar(); }
    }
    $('cardsBtn').textContent = T(st.cards ? 'cardsOn' : 'cardsOff'); $('cardsBtn').classList.toggle('on', st.cards);
    $('speed').textContent = st.speed + '×';
    $('state').className = st.playing ? 'moving' : '';
    $('stateText').textContent = T('stateLine', { state: T(st.explore ? 'exploring' : st.playing ? 'playing' : st.paused && st.t === 0 ? 'ready' : 'holding'), key: s.key });
    { const ab = $('autoBtn'), tip = T(st.autoplay ? 'autoOn' : 'autoOff') + ' · ' + T('autoHow');   // the transport's Autoplay toggle (v20)
      ab.classList.toggle('on', st.autoplay); ab.setAttribute('aria-pressed', st.autoplay ? 'true' : 'false'); ab.title = tip; ab.setAttribute('aria-label', tip); }
    drawTray();
    document.querySelectorAll('#rail .dot').forEach((d, k) => { d.classList.toggle('done', k < st.i); d.classList.toggle('cur', k === st.i); });
    document.querySelectorAll('#rail .num').forEach((d, k) => d.classList.toggle('cur', k === st.i));
    $('railFill').style.width = railX(st.i) + 'px';
  }

  $('prev').onclick = () => go(st.i - 1);
  $('next').onclick = () => go(st.i + 1);
  $('play').onclick = play;
  $('reset').onclick = reset;
  $('replay').onclick = replay;
  $('xBtn').onclick = () => setExplore(!st.explore);
  $('cardsBtn').onclick = () => { st.cards = !st.cards; ui(); };
  $('speed').onclick = () => { st.speed = SPEEDS[(SPEEDS.indexOf(st.speed) + 1) % SPEEDS.length]; ui(); };
  function setAutoplay(on) { st.autoplay = on; try { localStorage.setItem('ab-autoplay', on ? '1' : '0'); } catch (e) { /* not kept */ } ui(); }
  $('autoBtn').onclick = () => setAutoplay(!st.autoplay);
  addEventListener('keydown', e => {
    if (!lib || e.ctrlKey || e.metaKey || e.altKey || e.target.closest('input')) return;
    const f = meta.features || {}, k = e.key, K = k.length === 1 ? k.toLowerCase() : k;
    if (K === 'ArrowRight' || K === 'PageDown') { go(st.i + 1); e.preventDefault(); }
    else if (K === 'ArrowLeft' || K === 'PageUp') { go(st.i - 1); e.preventDefault(); }
    else if (K === ' ' && e.shiftKey) { replay(); e.preventDefault(); }
    else if (K === ' ') { play(); e.preventDefault(); }
    else if (K === 'r') reset();
    else if (K === 'x' && f.explore) setExplore(!st.explore);
    else if (K === 'c' && f.cards !== false) $('cardsBtn').click();
    else if (K === 'm') st.reduced = !st.reduced;
    else if (K === 'a') setAutoplay(!st.autoplay);
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
  // each unit gets its own: its state (a view of the bench's clock), its library.json, its settings, its words in the
  // language on the bench (text: an entry of its strings, with {placeholders}; L: any { en, fr } value), and, for an
  // assembly, place(): mount one of its parts into an element it has laid out
  const apiFor = (u, state) => ({
    state,
    meta: () => u.meta,
    params: () => u.params,
    refresh: () => ui(),
    lang: () => st.lang,
    text: (k, vars) => loc(u.strings[k] != null ? u.strings[k] : k, u.strings, vars),
    L: (v, vars) => loc(v, u.strings, vars),
    // contract 4: a setting's live value (params() stays as it was set up; Reset brings the live values back to it), and
    // setting it from the library's own hardware: kept to its declaration; when the sequence shares it, every block that
    // declares it takes the value and is told (its onValue hook), so the next block shows the same pot, the same bath
    value: k => u.live[k],
    setValue: (k, v) => {
      const d = (u.meta.params || {})[k];
      if (!d) throw new Error(`${nm(u.meta)} has no setting “${k}”`);
      if (d.min != null) v = Math.max(d.min, Math.min(d.max, v));
      if (d.values && !d.values.includes(v)) return;
      if (u.live[k] === v) return;
      const to = SHARED.has(k) ? loaded.filter(x => k in x.live) : [u];
      to.forEach(x => { x.live[k] = v; if (x !== u && x.raw && x.raw.onValue) x.raw.onValue(k, v); });
      ui();
    },
  });
  window.AnimationBench = {
    register(impl) {
      try { accept(impl); } catch (e) { regError = e; throw e; }
    },
  };
  function validate(impl, m) {
    if (!m) throw new Error('a library registered without being loaded through its library.json');
    if (impl.id && impl.id !== m.id) throw new Error(`library.json says ${m.id}, its code registers ${impl.id}`);
    if (!Array.isArray(impl.stops) || !impl.stops.length) throw new Error(`${nm(m)} registered no stops`);
    if ((m.features || {}).explore && !impl.explore) throw new Error(`${nm(m)}: library.json offers Explore, its code has none`);
  }
  function accept(impl) {
    if (!collecting) throw new Error('a library registered outside a load');
    validate(impl, collecting.meta); collecting.impl = impl;
  }
  function start(impl, unit) {
    lib = impl; STOPS = impl.stops;
    impl.mount($('stage'), unit ? apiFor(unit, st) : null);
    const h = decodeURIComponent(location.hash.slice(1)), hi = STOPS.findIndex(s => s.key === h);
    if (hi >= 0) st.i = hi;
    arrive();
    if (impl.enterStop) impl.enterStop(st.i, -1, st.playing);
    trayKey = null; drawTray(); layoutBar(); buildRail(); ui();
    impl.settle();
  }

  // ───────────── a scene: one set-up in its own viewport, mounted as an instance ─────────────
  // Alone (or as a sequence's block) it fills the stage between the bars, its viewport fitted and centred; its layers are
  // sized in pixels to that box, so it renders crisp at any size.
  function composeScene(u) {
    const vp = u.meta.viewport, raw = u.raw;
    let host = null, inst = null;
    return {
      id: raw.id, stops: raw.stops, sections: raw.sections,
      mount(stage, api) {
        const s = Math.min(1760 / vp.width, 800 / vp.height), w = vp.width * s, h = vp.height * s;
        host = document.createElement('div'); host.className = 'scene-host';
        // its edges fade into the stage (a scene's bench top ends where its viewport does; on a card the frame hides that)
        const fade = 'linear-gradient(90deg,transparent,#000 7%,#000 93%,transparent),linear-gradient(180deg,#000 88%,transparent)';
        host.style.cssText = `position:absolute;left:${((1920 - w) / 2).toFixed(1)}px;top:${(70 + (806 - h) / 2).toFixed(1)}px;width:${w.toFixed(1)}px;height:${h.toFixed(1)}px;`
          + `-webkit-mask-image:${fade};mask-image:${fade};-webkit-mask-composite:source-in;mask-composite:intersect`;
        stage.appendChild(host);
        inst = raw.mount(host, api);
      },
      frame: dt => inst.frame(dt), settle: () => inst.settle(),
      reset: () => { if (inst.reset) inst.reset(); }, relabel: () => { if (inst.relabel) inst.relabel(); },
      unmount: () => { if (inst && inst.unmount) inst.unmount(); if (host) host.remove(); },
    };
  }

  // ───────────── an assembly: its own code lays out and frames its parts (scenes), the bench runs them ─────────────
  // place(k, el, delay) mounts part k into el (a box the assembly has sized to the part's viewport aspect); the part's
  // clock starts delay seconds into the assembly's stop, so it begins as the assembly brings it in.
  function composeAssembly(u) {
    const raw = u.raw, live = [];
    return {
      id: raw.id, stops: raw.stops, sections: raw.sections,
      mount(stage, api) {
        const base = api.state;
        const place = (k, el, delay = 0) => {
          const p = u.parts[k];
          if (!p) throw new Error(`${nm(u.meta)}: it has no part ${k + 1}`);
          const view = {
            get i() { return 0; }, get t() { return base.t - delay; }, get playing() { return base.playing; }, get paused() { return base.paused; },
            get speed() { return base.speed; }, get reduced() { return base.reduced; }, get cards() { return base.cards; }, get explore() { return false; },
            get lang() { return st.lang; },
          };
          const inst = p.raw.mount(el, apiFor(p, view));
          live.push(inst);
          return inst;
        };
        const parts = u.parts.map(p => ({ meta: p.meta, viewport: p.meta.viewport, text: apiFor(p, base).text }));
        raw.mount(stage, Object.assign(api, { place, parts: () => parts }));
      },
      enterStop: (i, from, playing) => { if (raw.enterStop) raw.enterStop(i, from, playing); },
      onPlay: i => { if (raw.onPlay) raw.onPlay(i); },
      frame: dt => { raw.frame(dt); live.forEach(p => p.frame(dt)); },
      settle: () => { raw.settle(); live.forEach(p => p.settle()); },
      reset: () => { if (raw.reset) raw.reset(); live.forEach(p => { if (p.reset) p.reset(); }); },
      relabel: () => { live.forEach(p => { if (p.relabel) p.relabel(); }); if (raw.relabel) raw.relabel(); },
      unmount: () => { live.forEach(p => { if (p.unmount) try { p.unmount(); } catch (e) { /* cleared anyway */ } }); live.length = 0; if (raw.unmount) raw.unmount(); },
    };
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
        group: `${b}:${s.group || s.key}`, block: b, local: k, _s: u.strings,
      })));
      sections.push([u.block.title || u.meta.title, first, stops.length - 1, u.strings]);
    });
    let cur = -1;
    const blocks = [], timers = [];
    const act = () => units[cur] || units[0];
    const view = b => ({
      get i() { const s = STOPS[st.i]; return s.block === b ? s.local : (s.block > b ? units[b].impl.stops.length - 1 : 0); },
      get t() { return STOPS[st.i].block === b ? st.t : 0; },
      get playing() { return st.playing; }, get paused() { return st.paused; }, get speed() { return st.speed; },
      get reduced() { return st.reduced; }, get cards() { return st.cards; }, get explore() { return st.explore; },
      get lang() { return st.lang; },
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
          u.impl.mount(el, apiFor(u, view(b)));
        });
      },
      enterStop(i, from, playing) {
        const s = stops[i], f = from >= 0 ? stops[from] : null;
        show(s.block);
        const u = units[s.block];
        if (u.impl.enterStop) u.impl.enterStop(s.local, f && f.block === s.block ? f.local : -1, playing);
        if (!f || f.block !== s.block) u.impl.settle();
      },
      onPlay(i) { const s = stops[i], u = units[s.block]; return u.impl.onPlay ? u.impl.onPlay(s.local) : undefined; },
      reset() { units.forEach(u => { if (u.impl.reset) u.impl.reset(); }); },
      relabel() { units.forEach(u => { if (u.impl.relabel) u.impl.relabel(); }); },
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
      for (const k of Object.keys(opts)) if (k in st && k !== 'lang') st[k] = opts[k];
      if (opts.lang) setLang(opts.lang);
      if (lib.capture && lib.capture.opts) lib.capture.opts(opts);
      st.t = t; st.paused = true;
      lib.settle(); ui(); lib.frame(0.016); return loc(STOPS[i].title, sx(STOPS[i]));
    },
    explore: (o = {}) => { if (!st.explore) setExplore(true); const r = lib.capture.explore(o); ui(); return r; },
    frameNow: () => lib.frame(0.016),
    run: sec => { for (let n = 0; n < sec * 30; n++) { step(1 / 30); lib.frame(1 / 30); } return { i: st.i, key: stop().key, playing: st.playing, t: +st.t.toFixed(2) }; },
    stops: () => STOPS.map(s => s.key),
    fps: ms => new Promise(res => { let n = 0; const t0 = performance.now(); (function f() { n++; if (performance.now() - t0 < ms) requestAnimationFrame(f); else res((n / ((performance.now() - t0) / 1000)).toFixed(1)); })(); }),
    state: st, meta: () => meta,
    load: where => loadFromLocation(where).catch(fail),
    block: () => (lib && lib.units ? STOPS[st.i].block : null),
    play, replay, go, reset, setExplore, setLang, setAutoplay,
  };

  applyChrome(); configure(null); ui();
  const where = new URLSearchParams(location.search).get('lib');
  if (where) loadFromLocation(where).catch(fail);
})();
