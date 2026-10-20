---
id: U040
title: The component standard (manifest) for bench components, starting with the bench power supply
status: in-progress
depends_on: []
refs:
  - bench-work/components/00-component-standard.md (the standard 0.1; decisions C1–C7 accepted)
  - bench-work/components/bench-supply/component.json (the supply's manifest, draft)
  - bench-work/research/08-component-manifest-research.md (the product's part model + prior art + real supply data)
  - bench-work/research/09-supply-design-values.md (the five design values; adopted 2026-10-12)
  - bench-work/components/01-user-made-components.md + research/10 (users' components; awaiting the owner)
  - bench-work/libraries/bench-supply/psukit.js (the supply's existing model and drawing)
  - .claude/standards/six-gates.md · bench-quality-bar.md · bench-design-rules.md
  - bench-work/reviews/2026-10-12-bench-review.md (the full review: 5 dimensions, P0–P3, order of work; owner to prioritise)
---

## Goal

A standard every bench component is defined by (owner, 2026-10-11): controls, properties, connections, representations
for the bench's camera profiles and projections, signal tracing, failure modes, allowed orientation; authors narrow
what students get (cap, lock, hide); data only, behaviour from trusted engine classes; secure, fast, six gates, ≥ 95 %
realism. First component: the bench power supply, built in the Breadboard Bench prototype to the standard.

## Acceptance criteria

- [x] Research: the product's existing part model (class, profile, laws, limits, damage, locks) and the prior art
      (Fritzing, KiCad/IPC, FMI, SPICE/Multisim/Tinkercad, PhET, IVI/SCPI, IEC 61360, glTF/USD, policy layering), plus
      real 0–30 V / 0–5 A supply data (research 08).
- [x] The standard drafted (00-component-standard.md) and the supply's manifest written (component.json; golden cases
      4/4 against psukit's solve).
- [x] The owner's direction on C1–C7: all accepted as recommended (2026-10-11).
- [x] A JSON Schema and a Node validator for manifests (bench-work/components/schema/): component.schema.json (draft
      2020-12, ajv from InsightDemo read-only) + validate.mjs (references, numbers, geometry, the class's required
      members and golden cases via classes/dc-supply-linear.mjs, and activities narrow-only). Supply: ok, golden 5/5;
      bad activities refused (widen, lock outside cap, hide not authorable, start outside, arm not plantable, version).
- [x] The manifest follows the owner's new design (2026-10-11): exsight.supply.sw3005 0.2.0, class
      instrument.dc-supply.switching@1 (classes/dc-supply-switching.mjs, firmware test 25/25), validator ok, golden 9/9.
- [x] The supply built in 3D in the prototype to its manifest (src/components/supply/): model at real size (bounds and
      post tips measured equal to the manifest), controls bound by node and operated by real pointer drags, cap and lock
      enforced and shown (LOCK dot, held value blinking), trace anchors at the post tips, failure modes in the firmware;
      loads in Studio (compiled, sandbox run clean); stills of the modes and views (shots/v0.9-supply/).
- [x] The Component Editor, stage 1 (owner, 2026-10-11): src/editor/ (?editor=exsight.supply.sw3005): sections | studio
      stage (3D, 2D view, 2.5D view; measure; grid) | forms (identity, body, orientation, views, terminals picked on the
      model); strip (checks shared with the validator, golden cases, file); save (file picker or download); read-only
      mark. Supply terminals bound and saved; key lamp nodes added to the model. Stills shots/v1.5-component-editor/.
- [x] Editor stage 2 (2026-10-12): properties, controls, indicators (picked on the model), panel/symbol/icon, materials
      & colours (manifest `materials`). Stills shots/v1.8-editor-stage2/.
- [x] Editor stage 3 (2026-10-12): failures (Show on the stage), author limits, labels + words EN/FR, sounds, trace.
      Stills shots/v1.9-editor-stage3/.
- [x] Editor stage 4 (2026-10-12): golden cases edited and run on the law and on a unit (glass within accuracy), Try it
      (firmware live, real pointer, loads, CV/CC plot), the six gates signed per content digest, Publish (release record +
      stills, server re-checks, class tests). Tested by real clicks; publish tested end to end on a scratch copy only.
      Stills shots/v2.0-editor-stage4/.
- [x] The part card and the labels button (2026-10-12): card in View on a click on the body; labels as numbered tags
      with a key (owner's change mid-build). Stills shots/v2.1-part-card-labels/.
- [x] Hide: no property of the supply is hideable (authorable has no `hide`), so no blanking cap is needed; the card leaves
      hidden properties out. Plantable faults' authoring UI: exists (inspector Faults tab, built 10-11), verified 10-12.
- [x] USB ports usable (2026-10-12): class group usb, tests 45/45, golden 15/15 law and unit, Try it, card. Panel inset dropped.
- [x] **Complete and test the supply in all its capabilities and views** (owner, 2026-10-12): done 2026-10-12. Campaign
      `bench-work/prototypes/breadboard-bench/tests/supply-campaign.js` run by `.claude/tools/drive-bench.js` (real mouse
      input in a hidden Electron window): 241 checks, 0 failed; stills and the list of five defects found and fixed in
      shots/v2.3-supply-campaign/README.md (V-FINE push turned it; Edit's first click lost on reflow; coalesced moves;
      3D Free ortho black; the r185 shadow warning). Class tests 50/50, validator ok, golden 15/15 · 15/15, sandbox clean.
- [x] Soft shadows in 2D/2.5D (owner, 2026-10-12: "if it makes the UI better and realistic"): the studio key is a soft
      box (8 lights, 12°), shadow maps redrawn only when a part moved (frame ≈ 11 ms); PCF radius tried and rejected
      (DECISIONS). Regression A, D, E, F: 166/166.
- [x] **Components made by users: approach adopted (U1–U8) and its proof built** (2026-10-12; DECISIONS):
      `bench-work/components/convention/` (CONVENTION + SKILL 0.2, class/family pages, NTC example, experiment 1 with
      REPORT), `classes/sensor-resistive-curve.mjs` (22/22), `families/radial-disc.mjs`, schema/validator (tiers,
      provenance, bands, independence, conflicts, families), editor (entries from a class, sensor Try it, New component
      → `components/library/private/`), server routes, tracking mock-up `bench-work/previews/component-requests/`.
      Stills shots/v2.4-user-components/. Regression A, E, F after it.
- [x] Tracking-page mock-up adopted (owner: "go with your recommendations", 2026-10-12): added to X17.
- [ ] After the course: the lecture's LDR becomes the sourced component (model-components-first), resolving γ (0.70 in
      the ldr-chain library vs the GL5528 datasheet's stated 0.6, its Fig. 2 slope ≈ 0.69). Nothing changed before
      the course (recommendation, owner's "go with your recommendations", 2026-10-12).
- [x] Experiment 2 (TDK S861 NTC, guide 0.2): valid on its 2nd run (the family had forced an invented colour) →
      convention 0.3 (C18–C19), sizes' provenance, unknown colours, family `bead-leads` (data + model); REPORT.
- [x] The LDR and the NTC on the bench (library tiles, factory, "What it senses" slider, card with SI and the stimulus).
- [x] C20 the market (owner, 2026-10-12): research 11, `components/market/` (data, rules cds.mjs, tests 20/20), track
      drawn from the class, editor Body picker (sizes and classes, real-click tested), convention 0.4. Stills U5, U6.
- [x] **Market versions, locked (C21; owner 2026-10-12)**: 40 ready-made LDRs (GL/Token 25 + PDV-P 15) generated from
      the market data (0.3.0, every row re-read off the rendered pages) into `components/library/exsight/`; validator
      `checkLocked`; bench library version list; editor market block; cell orientation corrected; leads formed to the
      front onto the 2.54 mm grid. Experiment 3 dropped (an LDR is no longer made). Stills shots/v2.5-ldr-market-versions/.
- [x] The Excelitas VT series: held until a current datasheet turns up (owner, 2026-10-12, DECISIONS); X17 raised with ExSight.
- [x] **The error logger → Studio's Core lane (X18; owner, 2026-10-12)**: request `bench-work/requests/X18-app-wide-error-logger.md`, L1–L4 decided as recommended. The bench's part built and tested: `src/lab/report.js` (capture, record, scrubber, switch, postMessage / `/api/log`), `watch.js` for the supply (9 checks) and the sensors (3), `tools/serve.mjs` `/api/log` → `bench-work/logs/`, the sandbox harness as a stand-in host. Fixed with it: OTP waits `for_s`. Campaign 235/235, LDR 23/23, wires 49/49, zero records; sandbox clean.
- [ ] Owner: raise X18 (file it on InsightDemo's crossing for the Core lane, or hand it to a Core session). Was: **an error logger** (owner, 2026-10-12): captures and reports actual errors (exceptions, failed
      loads, console errors), physics errors (unit against the law, readings outside ratings, thermal/energy that do not add
      up) and maths errors (display against value beyond accuracy, NaN/Infinity, rounding); with context (component,
      version, view, state); used for upgrades; **pushes the logs to the platform** (in Studio the widget sandbox has no
      network: through the host, postMessage, to raise with ExSight; standalone: an endpoint on tools/serve.mjs). Brief
      its design first (design-direction rule).
- [x] The five design values researched and adopted (research 09; DECISIONS 2026-10-12): sw3005 0.2.1, cOut 2200 µF,
      η 0.86, rTh 1.2 K/W + rThNoFan 4.8, cTh 200 J/K (τ = R × C), OTP 85 °C on the heatsink, tAmbMax 40 °C checked by
      the validator, OUTPUT back below 60 °C with the fan. Class tests 50/50, golden 15/15 law and unit, sandbox clean.
- [x] **Shape mode, stage 2a: leads** (2026-10-12): `src/benches/electronics/shape.js` (cage, handles, working plane with
      Tab/X/Y/Z, 15° · Shift 1° · Alt free, protractor, drop line, hole under the tip, the Shape pane: class, bends, connect,
      presets Straight/Front/Splay/Kink, rule check, router), **magnetic mounting** (`conductors/magnet.mjs`: capture 1.2,
      release 2.2, lift 4 mm, compatible pairs only; parts.js boards as supports, parts carried with their board, a soft
      tick), **click to connect** (`conductors/connect.mjs`: every lead mapped, then formed and seated together, lengths
      kept; a colliding shape refused in words), stand-in boards full **and half** (BB830, BB400; `breadboard/holes.mjs`,
      tile versions). Tests: connect 35/35, `tests/shape-mode.js` 50/50 (real input), sandbox clean; regression: supply campaign 241/241, ldr-versions 23/23. Stills shots/v2.6-shape-mode/.
- [x] **Stage 2b: jumper wires and hanging test leads** (2026-10-12): `src/benches/electronics/wires.js` (the library's tiles take
      up the tool; click an end, then the other), `conductors/jumper.mjs` (flat bridge, arched over what it would cross,
      kit colours, the 0.1 in bare wire), `conductors/drape.mjs` (a lead settling under its weight onto the bench, never
      through anything), nets joined, wires follow and go with their parts, Source lists them. Numbers: research 13,
      classes.json 0.3.0. Tests: core 30/30, `tests/wires.js` 49/49 (real input). Stills shots/v2.7-wires/. 3D only until
      the design view.
- [x] **Design view** (2026-10-12): activity `design` (rules.mjs, design.test.mjs 11/11), look-only elsewhere, Authoring's chip,
      students offered only the allowed views, wires drawn and made in 2D/2.5D. `tests/design-view.js` 43/43 (real input).
      Fixed: test leads through each other (drape.mjs links kept off cables; wires.test.mjs 35/35). Stills shots/v2.8-design-view/.
- [x] **Ratings on conductors and connectors** (2026-10-12): research 14; classes.json 0.4.0; schema `ratings`; supply 0.2.2
      (posts, USB); the wire pane's rating rows and rule-check line (supply limit vs the weakest part). Validator 41/41 + supply ok,
      market 41/41, conductors 125/125, design-view 47/47, wires 49/49, Studio sandbox clean. Open: USB-A 3 A vs 1.5–2.5 A receptacles.
- [x] **2D and 3D, the author's 3D** (2026-10-12): 2.5D and Custom dropped; camera['3d'] in the activity (rules, design.test 21/21);
      tests/camera-3d.js (real input). Stills shots/v2.9-2d-3d/.
- [x] **Frame**: library folded by default; properties float over the stage (2026-10-12).
- [x] **Shelf twin moved, not copied** (2026-10-12): tests/shelf-twin.js.
- [x] **Desk mat** (2026-10-12): two-layer ESD mat, ESD label by the stud, 7 tones, the author's via ⚙ (activity mat.tone);
      tests/desk-mat.js; rules design.test 25/25. Stills shots/v3.0-desk-mat/. Silicone repair mat: only if the owner asks.
      "desktop mark" read as the desk mat (not contradicted).
- [ ] Owner: sign the six gates (unsigned for 0.2.1's content) and publish. Signal tracing drawn waits for wires and a load.
- [ ] Then: the next component, modelled first (every lecture component is modelled first: DECISIONS 2026-10-12).
- [ ] Every lecture supply becomes this one: plan the 2D lecture form and the 11 psukit libraries, after the course.
- [x] **The 2026-10-12 review fixed, every finding** (owner, 2026-10-13: "fix the review findings"; decisions a–e as
      recommended, DECISIONS). Status per finding and the final verification: the review's §9. All of §2–§6 fixed except
      6.39 (the crumb needs course data) and the French of the validator's own notes (6.29: needs manifest-rules to return
      keys). Final tree: real input 235 · 50 · 50 · 49 · 20 · 23 · 14 · 8 · 16, Node 462/462, validator 41/41, Studio
      sandbox clean, rest stills within noise. New: one bench document, activity schema + validateBench, the breadboard as
      class board.breadboard@1, components/registry.mjs, drift test, lab.js and frame.js split into lab/ and frame/,
      editor.js its own bundle, components/package.json.
- [ ] Owner: the review's open decisions (§9 end): moving-frame pixel ratio (3.6), 44 px cube targets (6.3), button
      hairlines (6.16), the PCB screen's board name, the `takes.kinds` values; run `npm install` once in
      bench-work/components.

## Out of scope

No edits in InsightDemo. Other components (meter, LDR, resistors, breadboard) wait for the supply to pass.

## Progress

- 2026-10-11: owner asked for the component standard. Research (two agents: the product's part model; prior art and real
  supplies) → research 08. Standard draft 0.1 and the supply's manifest written. While this ran the owner also had
  added to the bench: Isometric projection, Render (stills, frame-exact turntable about the room's centre, live), a tidy
  bar (see backlog/039 cont. 8). U039 paused to backlog/039. Next: the owner's direction on C1–C7 and on the view-cube
  dial plan; then the schema and validator; then build the supply.
- 2026-10-11 (cont.): owner accepted C1–C7 and the dial plan. Built: the view-cube dial (dial.js: smoked bezel, turn
  scale rotating with the cube, teal neon sweep F → index, azure tilt arc, amber stops from the profile, readout, glow
  while moving, ignition sweep); the tour's speed chip (0.5×–1.5×, keys − +; the turn now 32 s, peak 21°/s) and the
  look-around's view (eye on the room's centre, 70° lens tipped 15° down, eased in/out). The manifest gained coarse/fine
  VOLTAGE, the OVP group (recessed trimmer, OVP lamp) and the LOCK lamp; posts moved to the drawn layout. Schema +
  validator done. Front-panel preview sent for direction.
- 2026-10-11 (cont. 2): owner: the supply too big → **variants** (standard §3.13; schema, validator resolve and check each):
  compact (default, 160 × 120 × 250, single knobs) and fine (200 × 145 × 290, coarse + fine on V and I). Preview
  bench-work/previews/supply-front-panels.svg (made by make_supply_panels.py; every pointer computed: 5.00 V, cap 12 V,
  0.100 A, FINE at 0). The look-around now keeps every bench at one distance (eye eases back facing a near bench,
  ≤ 0.67 m; 58° lens, −11°). Next: the owner's word on the two panels, then build the supply in 3D (compact first).

- 2026-10-11 (cont. 3): owner: "the panels are good, build the compact supply in 3D, but first render the still images of
  the various modes"; then **design this supply instead**: their reference `InsightDemo/Application/rsrc/image_assets/
  Components/bench supply.avif` (a tall programmable switching supply: V/A/W white 4-digit LED rows, four encoders
  V-COARSE, V-FINE/mute, A-COARSE, A-FINE, OCP/OVP/OUTPUT lit keys, POWER, USB-A + USB-C, posts − GND +). Rendered
  unbranded at 0–30 V 0–5 A, 110 × 170 × 220 mm: 12 mode stills + side elevation + contact sheet in
  bench-work/previews/supply-modes/ (make_supply_modes.py; every reading computed: CV 68 Ω, CC 22 Ω). Sent for the
  owner's direction. Open: the manifest (component.json) still describes the old linear design (pots, OVP trimmer,
  rocker, LOCK/SET lamps, + GND − order) and must follow once the owner approves; then the 3D build.
- 2026-10-11 (cont. 4): owner: *"go with your recommendations, update the manifest and build it in 3D; dont forget the
  reality and the 3D accuracy"*. Manifest rewritten (sw3005 0.2.0; linear one archived in components/_archive/), schema
  (+ travel.step, alt, effect.parameter/factor, sounds, K/W) and validator (encoders, alt, thermal) extended; the
  class holds the firmware, tested in Node. 3D: src/components/supply/ (model.js, glass.js, component.js) on the
  Electronics Bench shelf at the activity's place; the decorative supply removed. Stills shots/v0.9-supply/00-modes.png
  and 00-views.png; real-pointer checks; Studio sandbox clean (.claude/tools/studio-sandbox-check.js, new). Preview's OTP
  caption corrected (a short does not heat a switching supply). Next: the owner's word on the 3D supply; then the panel
  inset for 2D/2.5D and the part card + labels button.
- 2026-10-11 (cont. 5): owner: *"Proceed"* on the 3D supply, read as acceptance. Next items briefed for design direction
  (design-direction-before-building): the docked `panel` inset (a live face-on second render of the same model, operable),
  the part card (the side-panel shape, design rules 4.4) and the on-part labels button with callouts. The owner chose all four
  recommendations (DECISIONS 2026-10-11): inset auto in 2D/2.5D, on demand in 3D/Custom, docked bottom right; card in
  the side-panel shape; planted faults never on the card. Design for the build: the inset is a second EffectComposer
  (RenderPass on a face-on ortho camera + bloom + OutputPass) drawn into the main canvas's viewport rect under an HTML
  frame kept outside #stage; the supply's pointer handling generalised to a second view (element + camera). The supply
  was shown live in the browser pane (?view=bench, 5.00 V into 68 Ω). Next: build the inset.
- 2026-10-11 (cont. 6): owner (their photo again): *"make the control knobs and connectors a bit lighter"*. model.js
  materials: knob 0x16181b → 0x4c5157 (roughness 0.42), knobTop → 0x53585e, postBody 0x141517 → 0x45494e, POWER btn
  0x202327 → 0x4a4e53; rings, chrome, case unchanged. Rebuilt; checked live in the pane (the pane caches bench.js:
  `fetch('bench.js', {cache:'reload'})` then reload). Next: the inset, as above.
- 2026-10-11 (cont. 7): owner, on their render `InsightDemo/…/Components/Professional DC Power Supply Product Render.png`:
  lighten the board (only the screen dark), the light-room glass looked foggy, digits contained as in the image; then
  "the rest of the body aside the screen have the same light charcoal color, it is the lighting"; then "darken just a
  bit". Done: one paint BODY 0x5f5f63 for case, bezel, POWER/USB strip (new 0.4 mm plate, L.strip, own legends),
  ledge, knobs, POWER, back plate; glass envMapIntensity 0.2 / clearcoat 0.5; lit segments are emission only (LIT
  diffuser dark) so digits sit under bloom; lab bloom threshold 0.86 → 1.0; legends blended instead of alpha-tested
  (thin strokes had dropped: "V COARSI"). Stills shots/v0.9-supply/L1–L3. Measured: on the shelf the front gets ≈ 1/5
  of the top's light (the sun comes from behind the bench), so it reads darker than the studio photo; a shelf light is
  the owner's call. Pending brief: the owner's neon scale overlay on a knob while it is turned.
- 2026-10-11 (cont. 8): owner: a neon scale overlay on a knob while it is adjusted. Choices: what it shows is the
  author's ("the settings should be configurable by author"), teal as the dial, shows while turning and fades 1.5 s
  after. Built: src/components/supply/turnscale.js (range: 270° arc filled to the value, amber past a cap, amber stop;
  vernier: a fine encoder's one-turn window, travel.span; angle; off; 20 detent marks with a trail); standard:
  authorPolicy.defaults.turnScale "range", overlays.turnScale [range, angle, vernier, off]; activity
  constraints.turnScale (one mode or per encoder); schema + validator (refuses unknown modes, non-encoders, vernier
  without a window); example activity: COARSE range, FINE vernier. Real drag tested; stills K1–K5, K0-turn-scale-sheet.
  Then owner: *"the bench should have authoring interface … every bench has 4 states: Authoring, Edit, View, Preview;
  contact the main core application for details"*: research of InsightDemo's four views under way; brief to follow.
- 2026-10-11 (cont. 9): owner chose for the four views: Authoring built now with a Source sheet; sections + learner
  matrix; Edit = operate unlocked settings, place/move parts, wire parts, teacher plants faults (DECISIONS). Plan:
  bench-work/breadboard-bench/05-four-views.md, then build in stages (frame → Authoring sections → matrix → Source →
  Edit placing → wiring). The panel inset / part card / labels (above) fit into View.
- 2026-10-11 (cont. 10): building the four views had begun (firmware plant/clear + latch, 33/33; schema/rules.mjs split
  out of validate.mjs, browser-safe; activity: title, sentence, lesson matrix, faultsInSession, validated; supply
  apply/plant/clear/setPolicy/state; turn scales' modes live; src/lab/frame.js written, NOT wired in, nothing in the
  bench changed by it). Owner stopped it: *"first create the plan for the bench actually wait i have images from the
  electronics bench we could copy"*. Next: the owner's images (or InsightDemo/…/studio_images/electronics bench/: the
  Authoring Dashboard, Circuit Editor, IV Preview, Bench Interface renders, light and dark) → a plan for the four
  views on the Breadboard Bench copied from them → owner's direction → build (frame.js is reusable).
- 2026-10-11 (cont. 11): owner pointed at the five Electronics Bench renders and said "adopt the structure". Plan written:
  bench-work/breadboard-bench/06-four-views-plan.md (frame, View, Edit, Authoring, Preview mapped panel by panel; the
  Preview's plot is the supply's CV/CC output characteristic with the load line and Q). Decisions R1–R4 taken (DECISIONS).
  Lesson rows renamed to the render's (rules.mjs ABILITIES; example activity revalidated). Next: build in the plan's
  §7 order, starting with the frame (frame.js to be reshaped to the renders' grid), and send stills of each view.
- 2026-10-11 (cont. 12): owner: *"proceed"* → §7 step 1 built: **the frame** (src/lab/frame.js rewritten to the renders'
  grid; bench.css: Instrument ladder tokens, light/dark): top bar (ExSight Studio, crumb, switcher with R2 teal fill, ⋯,
  Exit View in View, Save in Edit/Authoring → Source sheet), identity row (title, v, sentence | run state from the supply,
  bench clock, 25 °C, Camera, Flow, ⚙ = finish/lights/sound/language), the stage as a grid cell (lab's #stage and its
  furniture re-anchored by --st-t/l/r/b; the bar is the stage strip with fit/zoom− /zoom+ added), numbered panels per view
  (View: rail, overview, measurements = the supply's glass, parts, four chart shells, probes/find/ask, dock; Edit: tool row,
  ①–⑤; Authoring: tab row, ①③–⑦; Preview: the slide card with ≤ 6 controls), R4 fold. Unbuilt panels say *Built next* and
  what fills them. Mid-turn the owner added: **a property pane for any selected component (Authoring)** and **components
  draggable** → built: benches/electronics/parts.js (select, drag, rotate, surfaces, collisions, clearance) and
  src/lab/inspector.js (Properties · Limits · Effects · Faults from the manifest, validated live); DECISIONS. Real pointer
  drag tested (shelf → worktop; activity.place rewritten); Studio sandbox clean (origin null, ready). Stills
  shots/v1.0-frame/F1–F10. Next: the owner's word on the frame and the pane; then §7 step 2 (View's panels filled: the
  four charts from the firmware, Probes & Instruments with the supply's panel inset, Find, Ask), and the views' rail
  re-arranging the panels.
- 2026-10-11 (cont. 13): owner cut the frame to **three regions** (library by function | bench in focus | properties of
  the selection) and set **what each view carries** (Authoring all; Edit what the author allows; View the bench with the
  allowed interactions only; Preview a clean render of the bench's content as a slide thumbnail); then: library foldable,
  properties shown on selection, bigger strip icons. Built: frame.js rewritten (no rail/dock/charts/tabs/tools), the
  catalogue (benches/electronics/catalogue.js: 8 groups, 24 parts, the supply built, the rest listed *Not built yet*), a
  built part's tile rendered from its own model (thumbs.js), plugin.previewShot(), lesson-gated Edit pane and View policy
  (supply.setPolicy operate), no selection in View/Preview, the lab opens on the bench in the frame. Checked live (real
  click selects → pane appears; click on empty bench → pane goes; fold); stills shots/v1.1-three-regions/G1–G7; Studio
  sandbox clean. DECISIONS (supersedes R3, R4 and the plan's §2–§5 panels). Next: the owner's word; then placing parts
  from the library (drag a tile onto the bench) as each component is built, and the panel inset for 2D/2.5D.
- 2026-10-11 (cont. 14): owner: *"proceed with dragging components from the library onto the bench"*. Built: a built tile
  is dragged by the pointer (frame.js grab: card over the library, the real model on the stage; parts.js placing: highest
  allowed surface, snap, footprint teal/amber *no room here*); drop → a new instance (plugin.js FACTORY + make: PSU2…,
  manifest defaults, the lesson copied), selected with its pane; off the stage / no room / Esc → nothing. Click on a tile
  selects the next of its kind. Delete or the pane's *Remove from the bench* takes a part off (component.js dispose:
  listeners by AbortController, clock, geometry and glass freed; hover no longer clears another instance's cursor).
  Authoring always, Edit when lesson `edit`; View/Preview never. Policy, run-state chip and clock follow the selected
  (else first) part; Source lists one activity per instance. Shadows redrawn when a part moves (lab.js `shadows`; they
  had stayed at the old place). Fixed on the way: the tile's <img> started a native image drag. Tested with real drags
  in the pane (Authoring and Edit: place, refuse at the riser, cancel over the library, move PSU2, wheel on PSU2's
  knob leaves PSU1 alone, Delete, Remove button, remove all then add → PSU1 again); Studio sandbox clean (origin null,
  place/remove inside it). Stills shots/v1.2-library-drag/H1–H3. DECISIONS. Next: the owner's word; open: a bench-level
  activity (title, sentence, lesson, the instances) instead of the first instance's; then the panel inset for 2D/2.5D.
- 2026-10-11 (cont. 15): owner: each component predefines its 2D and 2.5D views, locked, the creator's (supply in 2D shows
  its interface, a breadboard its plan); *"go with your recommendations, proceed"*. Done: standard §3.8.1 (laid-out
  views); schema `views` (+ $defs.presetView, required); validate.mjs checks face vs angle and that every terminal and
  control faces the view (supply ok, golden 9/9; a supply set to a plan refused: 5 terminals, 9 controls; an activity
  with `views` refused); rules.mjs refuses activity views. Supply manifest: views 2d front 0°/0° on-front-edge,
  2.5d front 0°/13.5° on-footprint, legible 2.6 mm ≥ 9 px, operable; `plan` dropped, `panel` for the Measure tile only.
  Prototype: benches/electronics/presetviews.js (compose: ground in the profile's projection + each part through its
  preset orthographic view, one scale, back to front, shelf band, soft shadows, magnifier badge when not legible,
  terminal screen places; partSheet), plugin `presets`; a stand-in 830 breadboard (components/breadboard/standin.js,
  NOT a component). Stills shots/v1.3-preset-views/ P1–P4, S1–S2; Studio sandbox clean with compose inside. NOT yet:
  the bench's 2D/2.5D buttons drawing this layout live (operating knobs through the preset view, picking, wires).
  Next: the owner's word on the stills; then wire the profiles to the layout. Watch: at 13.5° the ground is very flat
  (P4), so front parts overlap those behind; at whole-bench scale every part is below legible (magnifiers).
- 2026-10-11 (cont. 16): owner: *"wire the 2D and 2.5D buttons to it"*, then (mid-turn) *"bring up the power supply
  authoring and lets set those 2D and 2.5D views"* and *"hide scrollbars by default … thin … themed"*. Built:
  layout.js (live laid-out 2D/2.5D drawn by lab.js instead of the room while a 2D/2.5D profile is active; parts.js and
  component.js pick and drag through it; magnifier zoom; fit on entry and by Fit; shelf band, fixed plates, selection
  outline, words that never cross a part); cameras.js layoutBox (pan over the band) and zoom to 4000; chip *Laid out*;
  soft shadows while laid out. The Views tab (inspector.js) edits manifest.views live with pictures and the shared
  check (rules.mjs checkViews; validate.mjs uses it); *Component file…* in the Source sheet. Scrollbars (bench.css).
  Tested with real pointer in the pane: magnifier → readable (10 px legends), wheel and round drag on V-COARSE through
  the 2D picture (5 → 6 → 11 V), PSU1 dragged from the shelf band to the mat (3D place and activity updated), a supply
  dropped from the library in 2.5D, Views: 2D → Top refused live (14 errors, the bench shows only the case top) and
  back to Front valid; 2.5D tilt typed 25° live; 3D comes back clean. Studio sandbox clean with both layouts. Stills
  shots/v1.4-laid-out-live/ L1–L4. The supply's file views are unchanged (13.5° etc.; tests were in memory only).
  Next: the owner sets the views in the Views tab and copies the Component file into bench-supply/component.json (or
  says the values); then the remaining U040 items (the part card + labels button, hide, plantable faults UI, tracing).
- 2026-10-11 (cont. 17): owner: *"it seems we actually need a component editor"*. Read InsightDemo first (read-only): its
  rule *components are made in-house* (owner 2026-09-28: only ExSight creates components; authors request them) and M25
  stage 15's planned **Component Studio** (internal: class/profile editors, curve digitiser, symbol editor, fixture runner,
  live preview; not built). Brief sent (the editor as ExSight's internal tool for bench components, sections = the
  manifest's groups, staged build; the bench's Views tab moves there). Waiting for the owner's direction.
- 2026-10-11 (cont. 18): owner: *"go with your recommendations, proceed"*, then *"proceed"* → the four choices taken as
  recommended (DECISIONS: ExSight only; Views tab moves to the editor; four stages with stills; a layout still first).
  Layout still: bench-work/previews/component-editor/editor-layout.html → .png (sections | the part alone on a studio
  stage with 3D / 2D view / 2.5D view / Panel / Symbol, measured bounds, terminals as pick spots | the section's form,
  shown on Terminals with pos being bound; strip: Checks, Golden cases, Try it, File, Release needs). The stage's supply
  is a render of the real model (plugin `library.thumb(entry, size)` now takes a size; rebuilt). Sent for direction.
  Seen on the way: the glass legend DC POWER SUPPLY blurs at grazing angles in the 3D render (no anisotropic filtering):
  fix in stage 1. Next: the owner's word on the layout, then stage 1 (shell, stage, Views, body, orientation, terminals
  placed on the model, live checks, save).
- 2026-10-11 (cont. 19): owner: *"go with your recommendations, proceed"* on the layout still (DECISIONS: studio stage
  follows the theme; ?editor= page plus ⋯ menu). Mid-build: *"the component properties does not need the views section
  anymore but it should have edit component"* and *"a component can be marked as readonly in which case user cannot
  edit"* (DECISIONS). Built stage 1 (src/editor/: editor, stage, forms, checks, measure, registry; lab/viewsform.js;
  schema/manifest-rules.mjs split out of validate.mjs, identical output; make-standalone.mjs precompiles the schema in
  build.cmd). The editor's first check found the file's three key lamps naming nodes the model lacked: key_*_led nodes
  added (model.js). Terminals bound by real clicks (picking fixed: decals skipped; a ray down a 4 mm socket picks the
  post) and saved through the editor's own output (sha-256 equal to a Node rebuild); validator ok, golden 9/9, firmware
  33/33. Found and fixed: torn glass digits at an angle = 1 mm near plane (editor and thumbs.js now 20 mm); the
  sandbox harness 404'd on a relative root (fixed). Studio sandbox clean (no Edit item there). Stills E1–E8. Note: the
  model's overall extent is 111.8 × 242.2 × 176 mm (posts 20 mm proud, fan guard 2.2 mm) against bounds 110 × 220 ×
  176: placing and collisions use the bounds (owner's call whether bounds should include the posts). Next: the owner's
  word on stage 1; then stage 2.
- 2026-10-11 (cont. 20): owner sent a rendered UI of the Component Editor ("check out their UI rendering"; image in the
  session's images folder, 1.webp: workbench backdrop, Pan/Rotate/Move/Select + Camera picker + axis gizmo, terminals
  as a numbered table with Auto-detect from model, Terminal properties card, checks as Level/Message/Action, Release
  needs card with Publish component, Materials & colours section, part thumbnail in the identity row). Review sent:
  what to adopt, the render's errors (brand KUAIQU and kuaiqu.step, 60.00 V / 5.000 A / 300.0 W on a 30 V 5 A unit, CV
  and CC both lit, sm3005, 0.7.0, black body vs the chosen charcoal, contradictory check lines, ±20 mm bounds, "bmc",
  terminal Rotation) and five choices. Waiting for the owner's direction before rebuilding the frame to it.
- 2026-10-11 (cont. 21): owner: "go with your recommendations, proceed. 1. use neutral studio" (DECISIONS). Editor rebuilt
  to the render: top bar (mark, steps, Open in bench, Read-only, Save, ⋮ with file/revert/theme/language), part's row
  (thumbnail, id › class › standard, badges), foldable groups (Looks + Materials & colours S2 read-only listing the
  model's paints; Verification; Metadata), stage bar (3D/2D/2.5D, Pan·Rotate·Select, grid menu, Camera persp/ortho, full
  screen), axis marker, Real size / Screenshot / Fit / ⚙; terminals table + Auto-detect (tested: rebuilds the saved
  bindings exactly), properties card (rename with references, Reset, plug direction derived); checks Level·Message·
  Action; Release needs + Publish (closed). Select on a knob opens Controls (real click). Stills shots/v1.6-editor-render/
  R1–R5; sandbox clean. Mid-turn the owner sent the bench's Authoring render ("also the authoring interface") and the
  View render with "we need to decide where the toolbar should be vertically at the right side beneath the orb".
  Proposal still: bench-work/previews/bench-toolbar/ (rail.html → rail-authoring.png, rail-view.png): one vertical rail
  under the orb (Authoring/Edit: Select·Move·Orbit·Pan | Fit·zoom | grid·step·snap | Screenshot·Full screen | ⋯; View:
  Orbit·Pan·Zoom | Fit | grid·step | Screenshot·Full screen | ⋯), the orb's four profile buttons kept as the view switch,
  XYZ under the orb in Authoring. Waiting for the owner's word on the rail and the bench render's corrections before
  building the bench frame (library chips/filter/foldable groups, Instruments group, mat ruler, brand mark, ⋮).
- 2026-10-11 (cont. 22): owner: "the 3D control toolbar of the view mode should be at the extreme left or top center"
  (not under the orb). Two previews: bench-work/previews/bench-toolbar/view-toolbar-top.png (one labelled bar, top
  centre) and view-toolbar-left.png (icon rail at the stage's left edge, names on hover). Recommended top centre.
  Waiting for the owner's pick, plus the four other points (Orbit as the name, Exit View, the ↔ button, the library).
- 2026-10-12 (cont. 23): owner: "top center, go with your recommendations, proceed" (DECISIONS), then "when a component
  is not readonly, saving after editing should save to the original file" (DECISIONS). Built: the bench's toolbar at the
  stage's top centre (frame.js drawTools; lab.js setTool and the More actions; parts.js Select/Move), the lab's old bar
  hidden in the frame, XYZ readout under the orb (plugin.pointer), library chips + built-only filter + foldable groups,
  catalogue: Instruments first, Inductor, Electromechanical (relay, DC motor, micro servo), band mark and ⋮, the mat's mm
  scale (grid.js matScale; bench frame, ticks 50, numbers 100). Save to file: tools/serve.mjs (launch config switched),
  editor loads from disk; tested by real clicks: write + backup + rebuild, read-only 403, id change 409, invalid 422; the
  supply file is back byte-for-byte to its bound version (6 test backups in components/_archive/autosave/). Pan/Orbit
  checked with real drags; sandbox clean. Stills shots/v1.7-bench-toolbar/ T2–T4. Next: the owner's word; then editor
  stage 2 or the remaining U040 items.
- 2026-10-12 (cont. 24): owner: "go with stage 2 of the editor, proceed"; mid-build "save button should only show when
  there is something to save" (DECISIONS). Built src/editor/forms2.js (Properties, Controls, Indicators, Panel/symbol/
  icon, Materials & colours), stage.highlight (gold outline of the selected control/lamp), picking a node = nearest named
  part + a list of the named parts inside; model.js PAINTS + applyPaints; schema `materials`; standard §3.8.2; checks warn
  on an unknown paint. Tested: the OCP lamp re-tied by a real click (to key_ocp: the check flagged the clash with the
  OCP control) then refined to key_ocp_led (no errors, file unchanged); body paint changed live and reset; Save hidden
  until a change, in the editor and on the bench. Found and fixed: the number fields dropped a whole number's zeros
  (detents 20 shown as 2; display only, the file never touched). Validator ok, firmware 33/33, sandbox clean. Next:
  the owner's word; then stage 3 (failures, author limits, words EN/FR, sounds, trace).
- 2026-10-12 (cont. 25): owner: "go with stage 3 of the editor, proceed" (DECISIONS). Built src/editor/forms3.js (Failure
  modes with Show on the stage, Author limits, Labels + the component's words EN/FR, Sounds with synthesised playback,
  Signal trace with the terminals' spots), registry restore(), BUILT = 3. Tested by real clicks: calibration drift shown
  (05.15 V, 0.381 W) and cleared (05.00); mains fuse blank then restored; each section opens without changing the file;
  every toggle round-trips. Found and fixed: toggles re-ordered lists (an undone toggle still showed Save) — lists now
  keep the saved order, in stage 2's chips too. Validator ok, sandbox clean. Next: the owner's word; then stage 4.
- 2026-10-12 (cont. 26): owner: "proceed with stage 4 of editor" (DECISIONS). Built: components/schema/release.mjs (content
  digest, signatures, release rules; validate.mjs runs them, `CLASSES` exported, opts.dir/stillExists), schema
  `verification.gates` object + `release`; manifest-rules refuses a golden case expecting nothing; src/editor/runner.js
  (each case on a fresh unit's firmware: readings exact, glass within ±(0.5 % + 2 counts); evalExpr, no eval),
  forms4.js (Golden cases form, Six gates with evidence EN/FR, signatures), tryit.js (firmware live on the stage,
  supply.detach + canvasOnly, loads, glass vs law, CV/CC plot), editor.js (digest by crypto.subtle, runner tab, Try it
  tab, release card, Publish sheet, released → draft on change), registry (firmware, drive, reset, cases, loads),
  stage.stills(), serve.mjs (/api/publish, /api/classtest, --components, --no-build). Fixed on the way: thumbs.js's
  `cam.up.set(0,0,1)` had been inside a comment (icons rolled). Tested by real clicks in the pane: V-COARSE dragged 5 → 9 V
  (CC 6.80 V into 68 Ω, law agrees), 22 Ω chip, OCP key clicked → trip, golden case from Try it, expectations typed
  ("0.1*22" → caught: law gives 0), revert, gate signed then made stale by a change; publish end to end on a scratch copy
  (scratchpad, server --components): released, 4 stills, class tests 33/33, then refusals (changed released file, no
  stills, stale gates, bad path, not a PNG). Real file: only `gates` text → {} (backup _archive/autosave/…/
  2026-10-12-before-stage4.json); still draft 0.2.0, 0/6 signed. Browser and Node digests equal. Sandbox clean, firmware
  33/33, validator ok, golden 9/9 law and unit. Next: the owner signs the gates and publishes (their call), or the next
  U040 item.
- 2026-10-12 (cont. 27): owner: "go with your recommendations, proceed" → gates and release left to the owner; built the
  part card (src/lab/partcard.js; supply api.values(); frame: View click → card, close button) and the labels button
  (src/lab/partlabels.js; supply api.project/layoutMode; parts.js View click + labels-button guard). Mid-build the owner:
  "tag the parts with callout numbers and then define the numbers" → numbered tags + key (no lines). Manifest:
  identity.summary, representations.card {primary, status, list, ratings: vSet, iLim}, labels.words EN/FR (19),
  labels.at (display tags beside the units); schema + validator + editor fields. Fixed on the way: ratings had shown
  5.2 A as "5 A" and internal maxima (31 V) against the 0–30 V name; a − post's tip judged as facing left; a press that
  never moved (View) lost its click. Tested by real clicks: card opens/closes, POWER/OUTPUT drive it (self-test,
  4.99/5.01 V CV matching the glass frame by frame), L, hover row ↔ tag; 11 views: 19 tags, 0 overlaps, key inside the
  stage and off the part. Sandbox clean. Then the owner asked: set the supply to 64 V / 60 A, or let the author set
  voltage and current limits? Answered, nothing changed: this unit stays 0–30 V 0–5 A; authors already cap/lock within
  it; a 64 V / 60 A unit would be a separate component. Waiting for the owner's word.
- 2026-10-12 (cont. 28): owner: "go with your recommendations, proceed" → supply stays 0–30 V 0–5 A, authors limit within
  it (DECISIONS). Hide: nothing hideable on the supply. Faults UI: verified by real clicks (Authoring → Faults → Plant
  calibration drift: glass 05.15 V; View card reads the same 5.14/05.14 and names no fault). What is left of U040 is the
  owner's (sign, publish) or waits on the next components (tracing drawn). Brief sent: next unit = the components the
  supply drives (breadboard, jumper wires, resistor; then the multimeter), one standard each. Waiting for direction.
- 2026-10-12 (cont. 29): owner: "make the power on button red nicely shaded" → model.js powerRed/powerRedSide, domed face, paint `power`; stills shots/v2.2-red-power/ R1–R4.
- 2026-10-12 (cont. 30): owner: keep only this PSU → linear class archived (DECISIONS). Asked the owner: drop the panel inset (the 2D preset view already shows the front panel)? and redraw the 11 course libraries that still use the old linear psukit supply? Waiting.
- 2026-10-12 (cont. 31): owner: every lecture supply becomes this one (DECISIONS); asked whether the supply's modelling is done: answered with what is left.
- 2026-10-12 (cont. 32): owner: drop the panel inset; make the USB ports usable; model every lecture component first; next session: complete and test the supply in all capabilities and views, plus an error logger that pushes to the platform. Done now: inset dropped; USB group built and tested (class 45/45 incl. the QC port back to 5 V when unplugged, a fault the new test caught; golden 15/15 law and unit; Try it by real clicks: 9 V ask 1.8 A, overload cut and held, USB-C 2.5 A; card lists both ports); Try it column keeps its scroll on redraw (a click had landed on the main load's 1 kΩ); sandbox clean. Next session starts with the two parts above.
- 2026-10-12 (cont. 33): owner: "research the five design values first". Research 09 written (sources: a measured 2800 µF switch-mode 30 V 5 A unit; Mean Well 89 %, TDK Z+ 82–84 %; Kiprim 85 °C OTP; 0–40 °C ratings). No manifest edits. Waiting for D1–D3.
- 2026-10-12 (cont. 34): owner: "go with your recommendations, proceed" (DECISIONS). Manifest 0.2.1 (activity example pinned), schema unit J/K, standard §9 note, class (τ = R_th × C_th, fan off with POWER, OUTPUT accepted below tResetBelow), validator worst-rated-case check (188 W at 40 °C → 79 °C; vents blocked trips above 64 W), tests 50/50 (old 48 W blocked-vent test no longer trips, correctly: moved to 150 W, trips 9–11 min), labels Heatsink / Dissipateur, rebuilt; editor: valid, golden 15/15 · 15/15, the gates' open evidence gone; Studio sandbox clean.
- 2026-10-12 (cont. 35): owner: "complete and test the supply in all its capabilities and views". Built the driver (.claude/tools/drive-bench.js) and the campaign (A controls, B protection/faults/USB, C cap/lock/turn scales, D profiles × projections, E four views + card + labels EN/FR light/dark, F the editor's 19 sections + Try it): 241/241. Fixed in the bench: V-FINE dead zone, key press kept across a reflow, coalesced pointer samples, setProjection relaxes the profile first (3D Free ortho was black), PCF named. Owner asked mid-way about a universal editor for authors: brief written (E1–E4).
- 2026-10-12 (cont. 36): owner: soften the shadows if better and realistic → soft-box key (compared on stills; radius rejected), shadows redrawn only on change. Owner: authors create their own components; requests with a tracking page; AI on their tokens with a guide; "determine the right approach". Two research agents (prior art; the product) → research 10; the approach 01-user-made-components.md (U1–U8), X17 raised. Waiting for the owner's word before §11.
- 2026-10-12 (cont. 37): owner: "go with your recommendations, proceed" (U1–U8). Built the proof: schema (provenance, curves, tiers, stimuli, families, banded golden, independent, conflicts, lead terminals), class sensor.resistive-curve@1 + tests, family radial-disc (data + model), validator rules, convention + AI guide, NTC worked example from Vishay 29049 (golden 5/5), editor (class entries, sensor Try it, New component), server (/api/components, /api/component/new, nested scan), tracking mock-up. Experiment 1: a fresh agent with only the guide made the GL5528 LDR, valid first run (community); 18 findings → convention 0.2 + validator; reviewer added flats (family got `flat`), confidences, conflicts. Models reviewed on close-ups (bead shape, band order, CdS colours, no refraction ghost).
- 2026-10-12 (cont. 38): owner: "go with your recommendations, proceed"; then, mid-way: LDR surface area to follow resistance within market standards. Experiment 2 + convention 0.3 + family bead-leads; LDR/NTC on the bench (stimulus slider, card); market research → research 11, market data + rules + tests, track from physics (calibrated ρ₁₀ 2.25 MΩ/□; half-grid floor after a 3-run face looked wrong), editor picker, family widened for Φ12/Φ20 (found by the picker test), C20.
- 2026-10-12 (cont. 39): owner: "go with your recommendations, proceed" (experiment 3 + VT/PDV-P tables), then mid-way *"precreate the available market versions for user to select … locked to their specific values"*, *"bend the leads … to expose them in the 2D view"*, *"lead spacing … align with the breadboard"* (DECISIONS ×4). Guide/SKILL brought to the convention (0.4 → 0.5, C21). Market data re-read on rendered pages: Token pages were printed numbers, per-type times, Token γ a minimum (0.2.0); PDV-P 15 types added, P5003 out, VT held (0.3.0; research 11 addendum). Found and fixed: the CdS cell's flats were drawn across its leads (every drawing has them parallel). Built: cds.mjs versionOf/applyVersion/checkLocked, cds-versions.mjs (browser-safe), make-cds-catalogue.mjs (+ --check, LDR-CATALOGUE.md), schema identity.market, family leadForm + form(), model (flats on Y, formed leads as tubes), bench library version select (sorted by size), editor market block (read-only, Open other versions; data-nav kept enabled in read-only). Tests: market 39/39, 40/40 valid, tests/ldr-versions.js 17/17 (real drag), A/E/F regression 131/131 after the orientation fix and again on the final build with formed leads (a first run's 1 failure was a flake), Studio sandbox clean.
- 2026-10-12 (cont. 40): owner disliked the Φ12's splayed leads → formed leads now bend toward each other at the base to the widest whole 2.54 mm pitch that fits the front flat (Φ12 9 → 5.08; DECISIONS). family form() (jog, edge), model filleted path, docs; market tests 41/41, 40/40 valid, ldr-versions 17/17, stills redone (shots/v2.5-ldr-market-versions/).
- 2026-10-12 (cont. 41): owner: adjustable lead spacing (breadboard steps or custom) → built (DECISIONS): family pitchRange/onGrid + form/bounds/terminals/face(p, {tipPitch}), model opt, sensor leadRange/leadPitch/setLeadPitch/terminalsNow, inspector Lead spacing row, rules.mjs mount.leadPitch. Tests: ldr-versions 23/23 (real click on a chip), rules checked (step ok, 6.35 warned, 40 refused, supply refused), market 41/41, sandbox clean, A/E/F regression 131/131 on this build. Owner then asked whether an author should fix the lecture's intended view (2D / 2.5D / 3D) beforehand: recommendation given (see the session's last message), **waiting for the owner's choice** before building.
- 2026-10-12 (cont. 42): owner proposed user-controlled lead bending (angle, length; a measuring cage around the part; double-click a lead to place a bend) and asked what I think. Brief sent (this session's last message): bends as data in the activity's mount, a Shape-leads mode with the cage, drag a tip to a hole as the main gesture, bend points for fine control, cut to length; three stages, a layout still first. Owner added: the same bending for wires and cables → one bending core, materials solid (bends hold: leads, jumper wire) and stranded (hangs between waypoints with a minimum radius: cables, test leads). **Waiting for the owner's direction** (and still: the lecture-view choice, the VT series).
- 2026-10-12 (cont. 43): owner: drag in 3D with a grid and 15° snapping (Shift 1°), grid origin the middle of the item routed, a 3D guide for natural tracing (wire harnessing), KiCad's concepts (clearance, width), active in Authoring and Edit. Research 12 (bend rules; agent, sources checked in its report) → `components/conductors/classes.json`. Stage 1 built: `components/conductors/bend.mjs` (chains: turn/roll/len; walk, fromCorners, aim with snapping, splitAt, cutTo, samples with arcs, dense, check: radius, body clearance, room for arcs, bodies, clearance to others, self-crossing, board grid) + `bend.test.mjs` 40/40. The core's check found today's formed leads' Φ5/P9005 base jog too short for two bends → family `leadCorners` (diagonal when the jog < 2 bend radii), `BEND_R`; stand-off 2 → 3 mm (research: photocell analog). Regenerated: 40/40 valid, market 41/41, ldr-versions 23/23, Studio sandbox clean, A/E/F regression 131/131. Layout still `bench-work/previews/lead-shaping/shape-mode.png` (+ README) sent; **waiting for the owner's direction before stage 2**.
- 2026-10-12 (cont. 44): owner: avoid bare wires and terminals colliding; know what is insulated → built (DECISIONS): `conductors/collide.mjs` (wires as points with radius and bare flag along their length; terminals as flat-ended cylinders: bare metal + insulated body; nets; through / short / clearance; point-to-segment both ways), `collide.test.mjs` 15/15 (real parts: the Φ5's formed leads, a 22 AWG jumper, the supply's post and USB); schema terminals `exposure`, `metal`, `body`; validator note when unstated; supply posts bare-tip (r 3.1 × 1.2, body r 7.8 × 17), USB shrouded; LDR leads bare; classes.json 0.2.0. 40/40 valid, market 41/41, core 40/40, class tests ok, Studio sandbox clean; regression A/B/E/F 195/195. Shape-mode direction, the lecture-view choice and the VT series still waiting for the owner.
- 2026-10-12 (cont. 45): owner: *"Proceed"* on the three open questions → my recommendations (DECISIONS): build Shape mode stage 2; a design view chosen up front, others look-only; VT held. Building stage 2.
- 2026-10-12 (cont. 46): built stage 2a; mid-turn the owner added magnetic snapping, click to connect (connection after the whole map), the half breadboard (DECISIONS ×3). Found and fixed: the held hole lost to a nearer neighbour (grip first); click to connect had made crossing leads (now refused); stale messages and banner words across a language switch; the pane said Worktop for a part in a board. Next: stage 2b (jumpers, test leads), then the design view.
- 2026-10-12 (cont. 47): owner: *"Proceed"* → stage 2b built (above). Found and fixed on the way: a tile click after a library
  drag was swallowed (frame.js `dragged` never reset); a board removed with one of its wires selected redrew a pane with no
  net. Choices left for the owner's review (DECISIONS): kit colour default, 100 cm lead, post colour, one plug per post.
  Next: the design view (then the error logger, part 2 of the owner's list).
- 2026-10-12 (cont. 48): owner: *"Proceed"* → the design view built (above; DECISIONS). Mid-turn the owner asked for ampacity,
  voltage limit and insulation values on cables, wires and connectors: research agent started; values to be applied from its sources.
- 2026-10-12 (cont. 49): ratings applied (above; DECISIONS). Regression on the design-view build: wires 49/49, shape mode 50/50,
  LDR versions 23/23, supply campaign 241/241. A flake seen twice in ~7 runs: the first click on the supply's + post just after
  a camera glide can miss in the hidden test window (passes on rerun). Next: the error logger (owner's part 2), then the next
  component, modelled first.
- 2026-10-12 (cont. 50): owner: 2.5D not useful → compared stills (bench-work/previews/25d-compare/) → owner: 2D and 3D, the author locks 3D.
  Then: library mini by default, properties overlay; the desk mat to industry standard (research 15); the shelf supply moved
  instead of copied. Built all but the mat's selector (preview first).
- 2026-10-12 (cont. 51): owner: "proceed" → the desk mat on the recommendations (above). Found and fixed: the ⚙ and ⋮ menus
  fell behind the stage after the overlay change (now on the page); the 3D view centres on the part the panel leaves (view offset).
  Next: the error logger (owner's part 2), then the next component, modelled first.
- 2026-10-12 (cont. 52): owner: the error logger is application-wide, switchable, every warning and error, sent to the platform, on the Core lane. Survey of InsightDemo (read-only: no logger, no widget message bridge, security-baseline 4.5 forbids crash reporting, a signed device-log route accepts study.* only and is unmounted) and of the bench's hook points → draft request X18 with decisions L1–L4 (DECISIONS). Found: the supply's overTemp trip ignores the manifest's `for_s: 1` (firmware trips at once). Also answered: the desk mat is changed in Authoring → ⚙ → Desk mat…. **Waiting for the owner's word on L1–L4.**
- 2026-10-12 (cont. 53): owner: *"Proceed"* → L1–L4 as recommended. Built the bench's side of X18 (above) and fixed the supply's OTP `for_s` (class tests 53/53, validator ok, golden 15/15). The first campaign run under the logger left 6 records: all false alarms of the checks (clock jumps from captures, sub-count differences, a limit just lowered, OUTPUT toggled inside a second), fixed; then 235/235 with no records. A labels-button click in E dark-en failed once (timing after a reflow) and passed on rerun. Test log records deleted. Next: the owner raises X18; then the next component, modelled first.
- 2026-10-12 (cont. 54): owner: a ceiling camera that sees the whole room; the room higher. Built (DECISIONS): `src/lab/ceilingcam.js` (the dome fixture and the PTZ view), lab.js (view 'ceiling', key 4, leaves on any other camera move; pendant rods from the ceiling height), dims.js ceiling 4.0 m, frame ⋯ menu, i18n EN/FR, bench.css readout. Tested by real drags and wheel in the pane (through the nadir, E-flip upright, 1.8× zoom), leaving restores the room camera; stills shots/v3.1-ceiling-camera/ C1–C6; no log records. Owner then asked about 360° on all axes and wheel turns on the orb (Z; Shift X; Ctrl Y; Shift+Ctrl X+Y; Shift+Ctrl+Alt all): the room camera is a turntable (OrbitControls: tilt stops at the poles, no roll; clampCamera keeps the eye above the floor; the 3D profile's default tilt 5–90°). Owner chose (DECISIONS): floor camera recessed; wheel turns under the Orbit tool; see-through shell; 5°.
- 2026-10-12 (cont. 55): built the floor camera (ceilingcam.js createRoomCam, floor opening in room.js), wheel turns (lab.js turnQueue, levelUp, claimsWheel for knobs), zoom 15 mm–30 m (fitClip, cameras.js FREE), scenery card hidden from outside; tests: 360° about Z returns exactly, 90° about X exact, zoom 37 mm and 30 m; stills shots/v3.2-floor-camera-turns/. Then owner: choose cameras + render one or a group (DECISIONS): building in stages: camera list + picker, saved cameras, group stills (ZIP + contact sheet), group video (fly-through / cuts).
- 2026-10-12 (cont. 56): cameras as one list built (lab.js rig; DECISIONS): picker grouped (Lab views · Bench views · Saved, ＋ Save this view… in Authoring), saved cameras in the activity's camera.saved (rules.mjs; design.test 32/32), popover ⚙ → Saved cameras… (save, rename, go, delete), Render from chosen cameras (ZIP of stills + contact sheet, zip() verified by Python's CRC check; fly-through and cuts through encodeVideo shared with the turntable; the user's view restored). Lab views held back with the author's 3D. Owner: the camera dropdown's group headings were white on white → optgroup themed, dark native list in the dark theme (contrast 6.4:1 headings, 15.5–17.8:1 names). Room view's eye 1.6 m (fov 50° ≈ 26 mm kept: 35 mm cuts the room); the Bench view's approved framing kept (brief said seated 1.2 m: not applied, offered as a saved camera). Regression: supply 235, camera-3d 19, design-view 48, shape 50, LDR 23, mat 9, shelf 8, wires 49 (one run 41/49: the known first-click flake, 49/49 twice after; task suggested to harden it); Studio sandbox clean; no log records. Stills shots/v3.3-cameras-render/. Next: the owner's review; then the next component, modelled first.
- 2026-10-12 (cont. 57): owner: *"proceed"*, then mid-turn: review all the bench work (performance, bottlenecks, physics/
  maths/science, security, UI/UX, other upgrades, recommendations). Five parallel read-only reviews, headlines re-verified
  here (Node probe of the supply class; esbuild metafile in the scratchpad; greps) → `bench-work/reviews/2026-10-12-bench-review.md`
  (§1 summary, §2–§6 findings with file:line, §7 what the breadboard/resistor/multimeter need, §8 order of work, decisions
  a–e). P0: the supply's downward step ignores C_out (10 mΩ short → 452 A, 2 kW on the glass, 56 J; 0 Ω → NaN), OCP trips on
  prediction; the dev server accepts cross-site writes and the editor has unescaped manifest sinks (stored XSS chain);
  every drag redraws two 4096² room shadow maps; bundle 41 % editor/webp weight; Edit shows a student a Save + Source sheet;
  unmodified single-letter global keys; view cube at 70 %. Nothing changed in the code. All Node suites pass as shipped.
  The brief for the next component (breadboard first: §7) was not sent; the owner's prioritisation comes first.
  Next: the owner's word on the review's order (recommended: P0 pass, then the breadboard brief).
- 2026-10-13: owner: *"fix the review findings"*. Fixed in waves with parallel agents on disjoint files, P0 first: supply
  physics and triggers (me), security, shadows, UI (bench, editor), performance (three waves), architecture (state and
  schema; infrastructure), then the leftovers and the P3 splits. Four agents were cut off once by the API session limit and
  resumed from where they stopped. Found on the way: 15 transitions broken by an invalid easing token; the first 2D entry
  took 22 s (shader compile, now warmed in the background); the ANGLE X4122 boot note failing console checks (filtered in
  the driver); the first-click flake's cause (camera damping and the inset a frame late; 0 misses in 5 runs now).
  Next: the owner's open decisions; then the breadboard component brief (review §7), modelled first.
- 2026-10-13 (cont.): owner: benches get their own repository and lane. exsight-benches founded on InsightDemo's
  conventions at D:\@Projects\2026\exsight-benches; the Breadboard Bench moved in as nine packages (all tests
  green there: Node 493, validator 44/44, drives 465/465, sandbox, stills within noise); 12 local commits; the
  push waits on write access for `ppi-repo` (this machine's SSH account). Founding crossing to Core drafted there
  (`.claude/benches/crossings/001-…`), to be placed by an InsightDemo session. **Bench work continues in
  exsight-benches, not here.** Here: delete `bench-work/`'s code once that repository is pushed and verified;
  keep `bench-work/specs/` and the lesson files.

- 2026-10-13 (cont. 2): checked exsight-benches: `main` pushed and level with `origin/main` (B001 done and archived there,
  13 commits). B002 (the Animation Bench and its libraries moving in) is loaded there, not started. Still open: the
  founding crossing placed by an InsightDemo session; PBL2026's `bench-work/` code deleted only on the owner's word
  (keep `specs/` and the lesson files).

- 2026-10-13 (cont. 3): owner: *"proceeds with good recommendations. when you are done moving the benches and the
  restructuring and ready to begin work on the Breadboard Bench let me know"*. The Animation Bench and its 80 libraries
  moved to exsight-benches (its B002, stills compared old against new); this project restructured: every moved source
  staged out of `bench-work/` and sent to the Recycle Bin, evidence kept at its old paths, CLAUDE.md, launch.json and
  memory (`benches-live-in-exsight-benches`) pointed at the repository. U040 closed here as moved.

## Handoff notes

- **Status: moved, not finished here.** The supply is built and tested; everything left of U040 is bench work and goes
  on in `D:\@Projects\2026\exsight-benches` (Benches lane):
  - the review's open items, the `boards` library and the breadboard component → its unit **B005**;
  - the owner signs the six gates and publishes the supply; X18 raised with Core; the lecture's LDR as the sourced
    component after the course; every lecture supply redrawn as the sw3005 → that repository's `STATE.md`.
- **Decisions on the way:** DECISIONS here up to 2026-10-13; from then on, that repository's `.claude/benches/DECISIONS.md`.
- **Paths:** `bench-work/…` in this file means the new places in memory `benches-live-in-exsight-benches`.
