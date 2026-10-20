---
id: U037
title: Visualizations for D1·020 — The measurand, and what "right" means (30 min), in lecture order
status: done
depends_on: [U036]
refs:
  - notes/Day01/020-measurand-and-uncertainty/en.md
  - bench-work/specs/ (U011's D1·020 specs: what each card was to show)
  - .claude/tracking/archive/done_U036_ldr-chain-2d-card-4_2026-10-08.md (handoff: the patterns to follow)
  - .claude/memory/visualize-every-card-in-lecture-order.md · design-direction-before-building.md · brief-before-each-unit.md · animation-follows-the-flow.md · controls-built-into-the-hardware.md
---

## Goal

Every card of D1·020 gets a demonstration built alongside it, in lecture order, at the standard of the card-4
animation; cards whose PLAN says the words carry it still get one. Brief the owner first, build on their direction.

## Acceptance criteria

- [x] The owner has been briefed (cards, what each demonstrates, bench, look) and has given direction.
- [x] Each card's demonstration follows its Flow paragraph by paragraph; the owner's text is untouched.
      (Card 3's 2026-10-10 audit found settled frames that are not the end of Play, A–E: open, carried to U038.)
- [x] Real values and units; anything illustrative is labelled on the surface.
- [x] Runs smoothly and without errors; key frames rendered and sent to the owner.
- [x] README per prototype; tracking updated.

## Out of scope

Electronics Bench cards (deferred: the bench is in development). Changing the owner's card text.

## Progress

- 2026-10-08: loaded after U036 (owner: "proceed to D1·020"). Next: the brief.
- 2026-10-08: brief sent (9 cards incl. card 8's Figure card; a demonstration proposed for each; card 3 Electronics
  deferred; one module app proposed; 5 direction questions: app shape, card 3, card 7's base, card 5–6 controls,
  build order). Noted: D1·010 cards 5–7 have no built demonstration yet. Waiting for the owner's direction.
- 2026-10-08: owner: the input's strength must reach the output, in every section (memory `input-drives-every-output`).
  Done in the LDR chain (`ldr-chain-2d/app`, README updated): the lamp's cord switch-dimmer is on the lamp in the
  guided walk too, one input shared with Explore; `CHAIN.setInput` recomputes every value (captions, trace, panels, SAR
  window, firmware, display, faults); lamp brightens above 300 lux; display fits 4 digits; scripts versioned `?v=`.
  Checked 1–10 000 lux and off, all stops + Explore, no errors. Eye animation has no input control (asked the owner).
  Still waiting for direction on the D1·020 brief's five questions.
- 2026-10-08 (new session): the brief's questions were asked again; the owner dismissed them and directed instead
  (memory `player-controls-are-the-bench`): each demonstration is a library loaded into the Animation Bench; Play,
  Previous, Reset, Next, speed and Explore are bench-level; library-specific controls stay in the library. Plan sent:
  bench shell prototype → port the LDR chain as its first library → D1·020's cards as libraries. Waiting for the go,
  and for the split of Cards / context-panel toggles. Still open: card 3, card 7's base, cards 5–6 controls.
- 2026-10-08: owner said yes (Cards on the bench, the eye toggle in the library). Built `bench-work/prototypes/animation-bench/`
  (README: who owns what, the contract): bench player (Prev/Play/Reset/Next, rail, speed, Explore, Cards, reduced
  motion, keys, time chip, caption, LIBRARY menu, a THIS LIBRARY tray), `libraries/registry.js`, and `ldr-chain` ported
  (scene files copied unchanged; `library.js` = `app.js` without the player). Launch entry `animation-bench` (8768).
  Checked: every stop, Play 3 → 4i holds, Explore + Reset, tray eye toggle, Cards, speed, menu; no errors; 55 fps.
  Old app's README points to the library. Next: the owner's verdict, then D1·020 card 1's brief (questions on card 3,
  card 7's base, cards 5–6 controls still open); the eye library to port.
- 2026-10-08: owner: don't couple libraries to the bench; the bench is configured from the library's metadata (memory
  `libraries-decoupled-from-the-bench`). Done: registry removed; `ldr-chain` moved to `bench-work/libraries/ldr-chain/`
  with a `library.json` (id, name, title, card, course, kind, version, bench type + contract, features, keys, files);
  the bench starts empty and loads from `?lib=`, a typed location, a folder, or Recent (per viewer); checks the
  manifest and refuses with the reason; title, line, menu card, Explore/Cards, key hint all from the metadata; swaps
  libraries without a reload. Launch entry now serves `bench-work/`. All checks re-run, no errors. Waiting for the
  owner's verdict; then D1·020 card 1's brief.
- 2026-10-08: owner: "proceed" (taken as the decoupled bench accepted). D1·020 card 1's brief sent: library `measurand`,
  8 stops on the Flow's 8 paragraphs (path with QUANTITY lit → system → five quantities → six reasons → the wire and
  its ohmmeter → pause → measurand vs displayed number → stated conditions), one input = the bath's temperature dial,
  copper AWG 30 × 10 m = 3.376 Ω at 20 °C, α 0.00393/°C. Four questions (wire rig, instrument, intro paragraphs,
  lattice zoom). Waiting for direction.
- 2026-10-08: owner: "go with your recommendations, proceed / first create a still image of it then we discuss it before
  we animate". Built `bench-work/prototypes/measurand-2d/` (make_still.py → still.png, README): top band stops 1–4,
  main band stops 5–8 (tapped coil in a stirred bath, controller dial = the input, our four-wire meter 3.3759 Ω,
  lattice zoom, R–T plot, the measurand stated). Sent. Also, owner mid-turn: the bench's transport keys are square,
  icon over name inside the key, Play green / Stop red / Reset amber (replay arrow) / Previous & Next blue
  (`animation-bench/index.html`, `bench.js`; `shots/transport-keys.png`, sent). Next: the owner's comments on the still,
  then the library.
- 2026-10-08: owner on the still: "good", but not all at once: one block per Flow step takes over the whole view; a block
  with its own animation gets its own sub-controls; and split the blocks into individual loadable, reusable libraries
  (they prefer that). Replied recommending: unit libraries with parameters + a thin sequence library per card (the card
  keeps one bench block, EAC: one block per card); the bench's transport works at two levels (blocks, then the block's
  own steps) so one Next/clicker drives both; in-block controls only for the block's hardware. Waiting for the go.
- 2026-10-08: owner: "yes … no sub-control buttons … reality as much as possible" (memory `one-block-at-a-time`,
  quality-bar note). Then mid-turn: transport to the top bar's right, icons only in their colours (memory
  `animation-player-controls`); Reset goes back to the beginning (first stop, stopped, units' `reset()` restores their
  set-up). Built: bench sequences (contract 2: `kind: sequence`, unit `params`, blocks with a 0.75 s hand-over, one rail
  with sections = blocks; README). Units in `bench-work/libraries/`: `measurement-path` (¶1–2), `quantity-and-method`
  (¶3), `why-we-measure` (¶4, 4a–4f), `copper-wire-bath` (¶5–8, realistic rig, the dial is draggable), each with its own
  `svgkit.js` (master copy in `measurand-kit/`); sequence `measurand`. Checked: all 14 stops, the hand-over, Reset from
  stop 8, no errors. Stills sent (`libraries/measurand/contact-sheet.png`, stops 5 and 8). Next: the owner's comments,
  then the motion.
- 2026-10-08: owner sent five reference renders (one per block) and: the property needs a better demo; no resistor for
  the quantity; designs must look sharp (memory `reference-designs-set-the-look`). Done: bench frame (rounded top bar,
  breadcrumb, transport pill, caption with an i/? mark and coloured segments: contract notes in README); kit gains
  `backdrop`, `floor`, `reflect` (text-free, clipped), `rnd`, `steam`, `pill` (master `libraries/measurand-kit/`, copied
  to each unit). Units rebuilt to the references: `measurement-path` (chevron stages with icons; cards 01–04 with
  definitions: a colorimeter + spectrum for the property, a caliper on a rod 25.40 mm for the quantity, boiling, a scope
  event; ¶2 glass mug, probe, glowing signal cables, detailed PCBs, 63.2 °C display), `quantity-and-method` (five
  numbered cards, 1800 rpm, 63.2 °C), `why-we-measure` (glowing title, six lit tiles), `copper-wire-bath` (lab backdrop,
  base plate, boxed controller and meter, pills, camera per stop, stop 8 panels as the reference). Reference errors kept
  right: taps in m, PV = SV = 20.0 when STABLE, no coil-to-meter line, 3.3759 Ω throughout. Stills sent
  (`libraries/measurand/contact-sheet.png`, stops 1, 2, 8). Next: the owner's comments, then the motion.
- 2026-10-08: owner: "go ahead and animate it". Done: kit motion (`timeline` of parts as functions of the bench's time,
  `appear`/`fadeIn`/`drawOn`/`along`/`front`/`bubbles`/`steam`/`loop`; `layers`: the scene painted once, each
  continuously moving part on a light layer of its own: 14–40 → ~60 fps). All four units animated along the Flow (table
  in `libraries/measurand/README.md`); stop durations set (3.4, 3.9, 4.2, 1.8 + 6 × 2.2, 2.2, 0.5, 1.8, 3.6 s).
  Versions 0.3.x. Next: send the owner a recording/frames, take comments.
- 2026-10-08: owner mid-turn: vapour; live readings; ¶3's cards too tall. Done: `K.steam` turbulent vapour from the
  surface; `K.counts` live readings (meter ±1–2 counts, bath PV ±0.1, lux/rpm/thermometers; scale and caliper steady;
  statement "reads ≈"); ¶3 cards 768 → 640 px. All stops ~60 fps after the layer split. Film made with the new
  `.claude/tools/record-bench.py` (+ `.js`): `libraries/measurand/measurand-card1.webp` + strip, sent. Memories
  `instruments-read-live`, prototype-capture updated. Next: the owner's comments on the film.
- 2026-10-08: owner: ¶3's cards still too tall ("reduce the space of their footer then the space between their header
  and the experiment"). Done: cards 170–750 (580 px), scenes at 92 % about their bench top right under the titles,
  footer 46 px (reflection + method line); moving parts share the scene's transform. v0.3.6. Sent a still.
- 2026-10-08: owner: "proceed" (card 1 taken as accepted at v0.3.6). Card 2's brief sent: sequence `objectivity`, four
  units on the Flow's four paragraphs (three requirements → the taste test, same pot, two numbers → practical salinity
  by conductivity, two operators, one number → the written procedure becomes a standard), seawater S = 35.0 at 25.0 °C,
  κ ≈ 53.1 mS/cm; taster scores labelled illustrative. Five questions (the input, the tasters' look, PSS-78 named,
  the analogy's "where it breaks", a still first). Waiting for direction.
- 2026-10-08: owner, before answering card 2's brief: card 1's ¶3 block (`quantity-and-method`) needs refinement, "all the
  cards … we aim for 95% reality": first the desk lamp's light rays (card 01), then the spectrometer (02), then the rest.
  Reviewed a full-res still (`quantity-and-method/shots/v0.3.6-before-refinement.png`) and sent a per-card plan; found a
  physics error: card 05 boils hard at 63.2 °C. Waiting for the go. Card 2's brief is still open behind it.
- 2026-10-08: owner: "proceed" (63.2 °C heating kept), then mid-turn: card 01's shade, beam and pool must align, the lamp
  dims/brightens by itself and the meter follows; card 02's light colour drifts and the spectrum follows; card 03's last
  digit wanders; card 05's probe misaligned. Done, `quantity-and-method` v0.4.0: 01 balanced-arm lamp (springs, cone
  shade seen from below, ±22° beam from the rim on the shade's axis, pool where the axis lands, dust), 10 → 1800 lux
  log cycle 14 s, light meter = body with grey LCD + sensor head on a coiled cable under the axis; 02 tunable source
  (430 → 650 nm, 18 s) → fibre probe → spectrometer → monitor, live peak (σ 5.1 nm, 10 Hz, 0.1 nm wander); 03 2 kg
  knob-top weight, precision balance 0.1 g, last digit ±1; 04 finned motor on feet, hub with tape moving down its face
  (side-on, correct), optical sensor on a magnetic stand aimed at the hub, tachometer with grey LCD; 05 beaker on a
  hotplate at 63.2 °C (faint vapour, clinging bubbles, shimmer), probe stem + handle on one axis, clipped at the rim,
  refraction shift under water, type-K meter. 52 fps, no errors. Film + stills sent (`quantity-and-method/shots/`).
  Owner asked about the weight increasing gradually; replied recommending stacked calibration weights. Waiting.
- 2026-10-08: owner chose option 1 (weights set down one by one) and asked card 05 to run from ice to boiling, then
  "add more ice". Done, v0.4.1: weights 1 kg, 500 g, 200 g, 200 g, 100 g every 2.4 s to 2000.0 g, ring + settle +
  last digit ±1, lifted after 3.2 s (16.1 s round); water 32 s round: ice melting at 0.0 °C (5 s), heating to 100 °C
  (23 s), condensation, air bubbles 30–60 °C, shimmer, bottom bubbles collapsing from 82 °C, rolling boil + surface
  agitation, steam growing; six ice cubes. Film + stills sent. Owner then: (a) save each card as its own library, the
  assembly adds the numbers ("what do you think?"); (b) "add the language switch outright", following how the parent
  application (InsightDemo) handles language. Researching (b) with an agent; then a plan for both.
- 2026-10-08: card 05's thermocouple cable made yellow (type-K jacket), still sent. Language research back (InsightDemo):
  content text is `LocalizedText { en, fr? }` per field, en mandatory, fallback to en, codes en/fr only; benches get
  the language from the host (`useLocalized`, `canvasRequestForBlock(block, language)`); units and numbers never
  translated (`formatQuantity`, '.' decimal); no fragments, `{placeholder}`s; 30–50 % room; insight-web keeps the choice
  in localStorage `ex-locale`; the desktop is fixed at 'en' today, sandboxed HTML widgets get no language (a channel is
  needed). Plan sent for the split (five scene libraries + an assembly that owns numbers, order, titles, layout,
  entrances) and the language switch (bench-level EN | FR, strings as {en, fr} in library.json, ?lang= + per-viewer
  memory, live re-render, the bench's own frame in a catalogue). Two questions: device markings, French drafted by me.
- 2026-10-08: owner: "go with your recommendations, proceed" (markings stay; French drafted by me). Done: memories
  `scene-libraries-and-assemblies`, `languages-follow-the-parent-app`. Bench contract 3 (bench.js v13, archived v11 in
  `libraries/_archive/`): kinds `scene` (viewport, instance per mount, fitted + soft edges alone) and `assembly` (parts,
  `bench.parts()`, `bench.place(k, el, delay)`); languages: `i18n.json` for the bench, `{en, fr}` + `strings` + `@key` in
  library.json, `bench.text/L`, EN | FR switch (shown when `languages` > 1), `?lang=`, localStorage `ex-locale`, relabel
  in place. Five scene libraries generated from v0.4.1 (`lamp-and-light-meter`, `tunable-source-spectrometer`,
  `precision-balance`, `motor-tachometer`, `beaker-thermometer`, params declared); `quantity-and-method` v0.5.0 = the
  assembly (numbers, rings, *key word* titles, canvas-fitted text). Measurand sequence v0.4.0 bilingual titles. Checked:
  EN/FR, 14 stops, switch keeps the stop, scenes alone, ldr-chain; no errors, 60 fps. README sections added. Next: the
  owner's review of the French and the look; then card 1's other units' words into data; then card 2's brief.
- 2026-10-08: owner: "move the rest of card 1's words into data, proceed". Done: measurement-path 0.4.2, why-we-measure
  0.4.1, copper-wire-bath 0.4.2 keep every visible word in `strings` ({en, fr}, `@key` stop texts, per-language caption
  segments; bench.js v14 resolves the language before segments), `relabel` re-draws, canvas-measured fitting for long
  French lines, the metrology subtitle follows its title's width; markings stay (POWER, PV/SV, FORCE/SENSE, ADC/MCU chips,
  scope settings, "test current 10 mA", LIGHT METER). Checked: all 14 stops in FR (titles, captions, scenes), EN
  unchanged, switch both ways, no errors, 60 fps. Stills `measurand/shots/bilingual-{en,fr}-stops-1-4-8-5.png`.
  Next: the owner's review of the French; then card 2's brief (still open).
- 2026-10-08 (new session): owner: "proceed" (French taken as accepted; card 2's brief answered with my recommendations:
  a sea ↔ fresh mixing tap on the sample line is the input, lit side-view silhouettes for the tasters with spoon and
  score card, a PSS-78 pill, no "where it breaks" beat (card 8 makes it), a still first). Building card 2's units as
  static libraries in the bench for stills; motion after the owner's comments.
- 2026-10-08: card 2 stills built (owner mid-turn: "remember 95%+ reality"). Bench contract 4 (bench.js v15, v14 archived):
  a sequence's `"shared"` settings, `bench.value/setValue`, `onValue`; Reset restores. Libraries: `three-requirements` (¶1,
  1a–1c), `taste-test` (¶2, 2a–2b), `salinity-by-conductivity` (¶3, 3a–3b), `operational-definition` (¶4, 4a–4c),
  sequence `objectivity`; shared kit `objectivity-kit/` (salkit.js: pot + mixing tap, taster silhouettes, salinity
  station, PSS-78 maths, `SALKIT.run`). Values: S 35.0 ↔ κ 53.07 mS/cm at 25.0 °C; fresh S 0.2 (0.42 mS/cm). Checked:
  10 stops EN, 4 FR, the tap carried across blocks (S 6.0 → κ 10.62 in 3a and the report), fresh end, Reset; no errors.
  Realism pass on the station (cell size, shroud and rings, clamp, glass hose arms, hanging cable). Stills
  `bench-work/libraries/objectivity/shots/`, `contact-sheet.jpg`; README. Next: the owner's comments, then the motion.
- 2026-10-08: owner sent five reference renders for card 2 (¶3 ×3 variants, 3b, 4c): "renderings you can mimic". Taking:
  ¶3 (ref 5 layout): lab backdrop with shelves and bottles, glossy bench, pills with leader lines, circulator printed
  TEMPERATURE CIRCULATOR with HEAT/COOL/STABLE and a brushed knob, jacketed beaker with graduations and spout, lit water,
  magnetic stirrer with LED, meter with three rows (COND, TEMP, SAL PSS-78), ON key green, panels THE METHOD GIVES and
  SAMPLE CONTEXT (icons). 3b (ref 3): operator portrait cards (lab coats, safety glasses), the tap running into the pot,
  both stations. 4c (ref 4): clipboard with a lever clip and a beaker beside it, the standard as a standing book with a
  sea cover on a lit plinth, the report in an acrylic holder, a Standard Seawater bottle behind, numbered captions under
  each. Reference errors to keep right: meter "153.07" (ref 1), probes in the pot instead of the cell in the jacketed
  beaker (refs 1–2), "k" for κ (ref 5), "Tester" for taster (ref 3), HEAT lit with STABLE at set point, the standard
  "defines PSS-78" (ours is a generic standard; PSS-78 is the real example), the rails (card 1's keys).
- 2026-10-08: built to the references (v0.2.0): kit gains `lab()` (shelves of glassware out of focus, warm lights, bench
  top), `person()` (skin, hair, clothes or lab coat + safety glasses, rim light; replaces the silhouettes in 2 and 3b),
  `portrait()` (lit frame, name, who), `tagPill()` (labels with leaders), a new station (circulator with brushed knob and
  HEAT/COOL/STABLE, jacketed beaker with graduations, spout and lit sample, stirrer with LED, meter with COND/TEMP/SAL rows,
  ON green). Block 3: 3a labels with leaders + THE METHOD GIVES + SAMPLE CONTEXT (sample class follows S: sea, brackish,
  fresh); 3b portraits + the tap running. Block 4: lever clip, standing book with a sea on its cover on a lit plinth,
  report in an acrylic holder, beaker and Standard Seawater bottle, numbered captions. Stills `objectivity/shots/` (v0.1
  kept in `shots/v0.1/`). Owner mid-turn: "if you need the human images i can get them for you but i really hope you can
  get your designs closer to [those of] the images". Asked for the human images (spec in the reply) and whether to go
  hybrid (rendered equipment images, live SVG displays over them). Waiting.
- 2026-10-08: owner sent two photos (operators in lab coats, safety glasses; blue and amber rim), then: "some reality needs
  to be introduced … the fresh and seawater should probably have a source", then "the operators integrated in the design
  like it is in the rendering". Done (v0.3.0): photos flattened to JPG (their alpha was a blocky mask) in
  `salinity-by-conductivity/img/`, listed as `assets`; kit `photo()`: a tall lit frame open at its foot, the person
  standing behind the station, name card at the top; 3b stations at 0.8. The pot's supply: two 10 L carboys (SEAWATER,
  FRESH WATER) on a wall shelf, spigots, tubing down into the mixing valve (valve and knob lower; all blocks). Capture
  waits 2.2 s per stop (images decode late). Stills in `objectivity/shots/` (1a, 2b, 3a, 3b updated). Still drawn: the
  tasters in block 2 (asked for four casual photos of the same two people) and the equipment (hybrid question open).
- 2026-10-08: owner sent a block 2 reference: "the water mixture setup needs more realism". Done (kit, v0.3.x): two glass
  aspirator tanks with the water lit (sea teal, fresh pale), meniscus, bubbles, caps, labels, on a stainless rack standing
  on the bench (two uprights, a platform under each tank); side outlets with stopcocks; stainless pipes into hex
  compression fittings on the mixing valve; the valve with a printed face, knurled knob, FRESH/SEA, an aerator; rings on
  the pot's water. Block 2 draws the pot (and rack) first, the tasters (and their cards) in front. Kept right against the
  reference: the card says SALTINESS (the reference's SALINITY is the measured quantity), no hotplate under the pot
  (tasting needs no heating). Stills `objectivity/shots/`. Tasters in block 2 still drawn (the reference shows them in lab
  coats with spoons and cards: photos asked for).
- 2026-10-08: owner sent two cut-out photos (the same two people, lab coats, safety glasses, a blank card held up, a spoon).
  Block 2 (taste-test v0.4.1) now uses them (`taste-test/img/*.webp`, `assets`): each stands behind the bench top, facing
  the pot; the score is printed on the photo's card in the card's own plane (an affine from its measured corners,
  clear of the thumb); 2a: the coast taster's 4 / 10, the Savannah taster dimmed with the card blank; 2b both scored. No
  tasting pose yet (spoon at the lips): asked whether one is coming. Capture: wait for the card to load (shoot.py --js).
- 2026-10-08: owner: replace the drawn heads on block 1's Objective tile with "our boy and girl". Done (three-requirements
  v0.4.1): round crops of the two operator photos (`three-requirements/img/`, `assets`), a lit ring in each one's colour,
  facing the shared reading; the tile's subline narrowed so it clears them. EN and FR checked.
- 2026-10-08: owner: no round frame on the Objective tile's faces (it hid them): now frameless cut-outs from the taster
  photos, head and shoulders fading at the foot (`three-requirements/img/obs-*.webp`). Then "the fresh and sea water label
  on the mixer should be made clearer": coloured badges FRESH (blue) and SEA (teal) at the ends of the knob's travel (kit).
  Owner: "great … now lets proceed to animating. remember reality". Animating card 2 now.
- 2026-10-08: animating (owner: "remember reality"; mid-turn: the mixer's words must sit naturally on it; "the water and
  flow and the mixing should all be animated"; "the two should have their own knob for adjusting the quantity"). Kit:
  two needle valves (SEA, FRESH tags; 0–10 dials; knurled knobs = the inputs `seaOpen`, `freshOpen`, shared with `salinity`
  by the sequence), clear tubing from each tank to its valve and on to a Y, a ball valve (lever along the pipe while the
  tap runs), spout; S = (35·q_sea + 0.2·q_fresh)/(q_sea + q_fresh). Water: the pot fills at 1a (level rises from behind the
  rim), the column in the mixed colour, rings, schlieren curling and settling (τ 1.2 s); tubes show the flow (dashes at
  each supply's rate); the tap runs 1.6 s after a valve is turned. Station: the cell lowered (1.2 s), the meter settling
  (wetting τ 0.25 s, sensor 22.0 → 25.0 °C τ 0.75 s, κ referred to 25 °C with the lagging T, STAB when steady), the stir bar
  turning, specks circling, the heater lamp cycling. Block 1 tiles animate (observers, the window waking, the steps
  written, the loop turning). Checked: two knobs, S 17.6 with both open, 0.2 with sea shut, Reset 35.0.
- 2026-10-08: card 2 animated, all four blocks (table in `objectivity/README.md`); film `objectivity-card2.webp` (387
  frames) + strip; `record.json`. Block 2: sway, the score written across the card, "two different numbers" arrives;
  block 4: steps written, book onto its plinth, stamp pressed (only from 4b), highlighter, signature drawn. Next: the
  owner's comments on the film.
- 2026-10-08: owner: "the retort stand and the conductivity cell holding does not look realistic". Kit: a cast-iron base
  (enamelled, top face seen from above, rubber feet), a 12 mm stainless rod screwed in with a hex nut (tall enough that the
  boss stays on it with the cell raised), a die-cast double boss (rod screw facing us, arm screw on top), a round arm to a
  die-cast finger clamp with blue vinyl sleeves round the cell's body and a wing nut; boss, arm and clamp slide down with
  the cell. Stills 3a, 3b updated.
- 2026-10-08 (new session): owner: "proceed" (card 2 taken as accepted with the new retort stand). Card 3's brief sent:
  its SHOW is the Electronics bridge (deferred, stays the Electronics Bench's); proposed instead a sequence
  `direct-indirect-null` on the Flow's own examples: ¶0–2 three set-ups unlabelled under the ASK; ¶3 direct (voltmeter
  5.1 V across a resistor, metre rule); ¶4 indirect (V across a known 10.0 Ω → I = V/R); ¶5 furnace shell + cuff
  (aneroid, stethoscope, 120/80 mmHg); ¶6 null (slide-wire potentiometer, zero-centre galvanometer, the jockey = the input).
  Five questions (build it at all, slide-wire vs decade dials, a person for the cuff, the furnace's labelled factor, a
  still first). Waiting for direction.
- 2026-10-08: owner: "go with your recommendations, proceed … still image renderings first … beyond 95% reality". Built card
  3 as stills (README `bench-work/libraries/direct-indirect-null/README.md`): kit `libraries/dinkit/` (dinkit.js: bench
  supply, handheld DMM, breadboard nearer the camera, 5 W resistor, MES lamp on a tungsten curve, metre rule + rod + zoom,
  crucible furnace with lid on its pivot, surface thermocouple + type-K thermometer, controller, wall section, arm + cuff +
  aneroid gauge + bulb + stethoscope, cuff trace, slide-wire potentiometer with driver/rheostat/reference/unknown/two-way
  key, galvanometer; `DINKIT.run` with knob/slide controls; `manifests.py` writes all manifests, EN + FR). Units
  `three-kinds`, `direct-reading`, `indirect-by-calculation`, `indirect-in-the-world`, `null-potentiometer`; sequence
  `direct-indirect-null` (shared `supplyV`). Values solved: 5.10 V; lamp circuit 2.43 V → 0.243 A (brief's 2.47/0.247 was
  before solving the lamp); furnace 160 °C → ≈ 700 °C (factor 5.0 illustrative); cuff 120/80; null 64.25 cm → 1.2850 V,
  −28 div at 60.00 cm. Stills sent (`direct-indirect-null/contact-sheet.jpg`, `shots/`). The arm (4b) is drawn: asked for
  an operator photo with a cuff. Next: the owner's comments, then the motion.
- 2026-10-08: owner opened the stills in the browser pane and sent a reference render for 1a (tiles lit per kind, kind name +
  title + description, larger lit set-ups, a footer per tile). Done (three-kinds v0.2.0): the reference layout, but the
  kinds are not shown before the ASK (the reference named them, which answers the question): 1a/1b neutral with "? WHICH
  KIND?", new stop 1c "The answers" (after the pause) lit as the reference. Kept right: R = 10.0 Ω (reference 100 Ω), NULL
  text says the reference is adjusted. Kit: potentiometer `o.gx`. Fixed an id clash (tk-fade with svgkit's fade).
- 2026-10-08: owner on 1a: no background behind the tiles' heads (just good contrast), I = V / R too big and over the meter,
  the meter display not legible. Done: tile fills removed (frames only), head text with a dark halo; I = V / R a small label
  top-left of the scene; kit `lcd7` redrawn as flat-ended LCD segments with gaps (`lcdWidth`), used by the DMM and the
  thermometer, legible small and full size.
- 2026-10-08: owner: the breadboard doesn't look naturally placed. Done (kit): one camera height for all (board top factor
  0.42 → 0.30, skew 0.15; the supply's top deeper, 40 px); the board only a little nearer (1.22×, front edge 26 px below the
  bench line), between supply and meter with no overlap, a firm contact shadow and its own reflection; tile crops tightened.
- 2026-10-08: owner sent a second 1b reference ("use the following for the which kind … the breadboard looks natural").
  Done: tiles (three-kinds) lit in their kind's colour from 1a with a mark (trace / bars / balance) and the name (owner's
  choice over my "don't name before the ask"), a "?" badge in 1b, a ✓ in 1c, title + description, numbered footer.
  Breadboard redrawn in true perspective (a homography from its flat plan onto four corners: left end nearer, turned a
  little; hole wells, rails, channel, front and left end faces, shadow, faint reflection), lying in front of supply and meter;
  axial banded resistors on it: direct 1 kΩ ½ W metal film (5.1 V would burn a small 10 Ω), indirect 10.0 Ω 2 W metal oxide
  (0.59 W); lamp holder seated on the board. Electric blocks' bench line raised to 730.
- 2026-10-08: owner: loves the supply showing both V and A (kept); "use a half breadboard like in the image"; mid-turn:
  "the image rendering looks so real … i loved the power resistor you used at first, use it". Done: half-size board (30
  columns, 400 points) between supply and meter (corners FL 590,72 · FR 1125,50 · BR 1166,−34 · BL 632,−20), the 5 W
  ceramic power resistor redrawn on the board's plan (`powerResistor`: box in perspective, printed face, leads bent into
  holes) in both blocks; direct back to 10 Ω (5.10 V, 0.510 A, 2.6 W); clips scaled to the board; bench line 700 for
  the electric blocks; tile crops 420…1430.
- 2026-10-08: owner sent a 1a reference: "WHICH KIND?" heads; the breadboard "not flat on the surface"; the supply closer to
  the meter. Done: 1a = "?" + WHICH KIND? in each kind's colour, title only, footer without number; 1b = names + "?" badge
  (previous reference); 1c = ✓. Rig re-laid (kit): supply at 0, meter close beside it (centre 604), the half board lying
  flat and square in front (corners FL 118,100 · FR 548,100 · BR 530,4 · BL 136,4; far edge converging), fed from the back
  rails right under the supply's posts (short wires with the supply's clips), jumpers across to the parts. Full-size 2a/3a:
  rig at 1.1×, bench line 712, labels moved to the clear spaces left and right. Kept right against the reference: the
  supply's ammeter shows the real current (0.510 / 0.243 A, not 0.000), 10.0 Ω (not 100 Ω).
- 2026-10-08: owner: the middle tile's breadboard placement is good; remove the 10.0 Ω label on the board (it is printed on
  the resistor); bulb a bit bigger with more glow; a space between bulb and resistor; the supply's lettering as in the
  render. Done: label removed; bulb Ø +20 %, three-layer glow; lamp moved to columns 1–7 with a short yellow link to the
  resistor's column 10; supply: DC POWER SUPPLY 17 px bold white, ranges beside it, V/A units large inside the displays,
  VOLTAGE / CURRENT above the knobs in bold white, CV/CC and POWER white, OUTPUT label dropped.
- 2026-10-08: owner: the supply's value display still not good. Done (kit): `led7` (the LCD's solid flat-ended segments,
  lit in the LED colour with a hot core and a soft glow, unlit segments at 7 %), used by the bench supply and the furnace
  controller; `segPaths` shared with `lcd7`.
- 2026-10-08: owner: refine the potentiometer (rendering and position, from the reference) and the galvanometer; sent the
  NULL tile reference. Done (kit): potentiometer redrawn compact (1 m at 0.78 px/mm, board seen from above k 0.62, bold
  0–100 scale, wire, brass bars, jockey with red pointer); back row close behind (2 V cell, plug key, copper-wound tube
  rheostat, reference cell box, unknown, two-way key), wires re-routed; galvanometer nearer at the right (1.3×): dark case,
  large cream dial −30 … 0 … 30 with minus signs, mirror strip, red needle on a visible pivot, glare, GALVANOMETER printed
  on the case, zero screw, terminals on top. Null unit at 1.12×, labels re-placed; tile crop 20…1290.
- 2026-10-08: owner: the galvanometer is OK but the meter bridge is wrong ("make it look like the one in the image"), also the
  reference cell, rheostat and the rest; then "your galvanometer scale is bad and too small". Done (kit): the bridge seen
  from the front (varnished top with the wire between brass strips and binding posts, a cream metre scale on its front with
  upright 0–100 and fine divisions, a thin wooden lip), a black jockey on the wire with a red pointer; `bpost` brass binding
  posts; rheostat copper-wound between iron end plates, slider on a square rod; reference cell a varnished box with lid and
  white REFERENCE CELL label; unknown a black case with a plate; wiring re-routed. Galvanometer: case 270 × 250, dial window
  taller, scale radius 172 with the pivot below the window, ±31°, bigger divisions, numbers −30 … 30 at 17–20 px, µA, −/+.
- 2026-10-08: owner: "a problem with the order of 1a 1b 1c, one of them needs to go". The question visual (WHICH KIND?)
  sat with the statement caption and the names (the answer) with the question caption. Done (three-kinds v0.3.0): two stops,
  1a the question (WHICH KIND? tiles, "?" caption) and 1b the answers (names, marks, ✓, the answers' caption); the names
  with a "?" (old 1b) dropped. Sequence keys 1a, 1b; 10 stops in all.
- 2026-10-08: owner sent a 2a reference ("refine 2a as in the image but use the power resistor"). Done: kit `LAYOUT`
  compact (tiles) / wide (2a, 3a: supply at 0, meter full size at 1010, the half board flat between them in front, fed from
  its back rails at the left end); `setBoard` switches the board's corners; `label2` two-line labels with leaders ("DC power
  supply / Set to 5.10 V", "Voltmeter (multimeter) / DC volts (V⎓) mode", "Resistor / 10 Ω ±1 % 5 W"); panels take a kind
  mark (`KIND_ICON`) and a leader from the meter; panel lines capitalised; 2a/3a at 1.05×. Kept right: the supply shows the
  real 0.510 A (the reference 0.00), 10 Ω 5 W power resistor (the reference a banded 100 Ω ¼ W).
- 2026-10-08: owner sent a 2b reference ("now refine 2b"). Done: bench line 676, rule from x 224; numbers bold every 5 cm
  (small for the other cm, as a real rule has); stop block 55 mm; zoom 172 px at (ex − 180, 320) with dashed cone lines and a
  lit ring at the reading point; two-line labels (Stop block / Both zeros here, Metre rule / 1 mm divisions, Rod / Ø 12 mm
  steel); panel with a ruler mark (`KIND_ICON.ruler`). Kept right: the rod ends at 41.2 cm on the main rule too (the
  reference put it at ~40 cm while its zoom and label said 412 mm).
- 2026-10-08: owner sent a 3a reference ("now refine 3a"). Done: panels with an icon now show the mark in a tinted square
  and a 30 px heading (2a/2b/3a/3b alike); panel rows can wrap (`wrap: true`); 3a panel: the full sentence, V = 2.43 V at 64
  px, "Read directly from the voltmeter. (No ammeter in the circuit)"; labels: DC power supply / Set to 5.10 V (cyan),
  Load: 3.8 V 0.3 A lamp / running at {I} A, Known resistance / 10.0 Ω ±1 % 5 W, Voltmeter (across R only) / DC voltage
  mode; lamp 1.32× ; 3b panel lines capitalised. Kept right: 10.0 Ω (the reference 100.0 Ω would give 24.3 mA).
- 2026-10-08: owner: improve the value font on 3a's meter. Done (kit `segPaths`): the classic 7-segment glass, each segment a
  long hexagon with mitred ends meeting at fine gaps (w 0.54 h, t 0.135 h, gap 0.028 h, advance 0.74 h), square decimal
  point; LCD slant 7°, ghosts 6 %. Shared by the meter's LCD, the thermometer, the supply's and the controller's LEDs.
- 2026-10-09: owner: "now refine 3b" (no reference). Done in 3a's style: panel = the sentence (Ohm's law turns the voltage
  we measured into the current we want), I = V / R bold, = 2.43 V ÷ 10.0 Ω, I = 0.243 A at 64 px, "Only as good as R is
  known: ±1 % → ±0.002 A"; a lit dashed ring round the supply's ammeter with "Supply's own ammeter / agrees: 0.243 A" (the
  supply's label gives way to it in 3b); the S37 seed box restyled (a shunt mark in a tinted square, "A current sensor").
  EN and FR checked.
- 2026-10-09: session closed at the owner's word ("clear this session, continue the refinement in the next"). Stills of all
  ten stops re-shot into `direct-indirect-null/shots/` (old round in `shots/v0.1/`), contact sheet updated, README brought
  up to date (stops, layouts, kit pieces, references' errors kept right). NEXT: open the bench in the browser pane
  (`preview_start` name `animation-bench`, then `?lib=../../libraries/direct-indirect-null/`), and continue the refinement
  stop by stop with the owner from 4a (furnace), 4b (cuff: arm photo still wanted), 5a/5b (full view of the bridge and
  galvanometer); then the motion. Card 3 stays at stills until the owner calls for animation.
- 2026-10-09 (new session): owner sent a 4a reference ("lets refine D1-020 card 3 4a"), then mid-turn: "the wall card and
  the info card need refinement" and "the graph line should not overflow the designated graph area". Done (kit + unit
  indirect-in-the-world 0.2.4, other units' versions bumped for the kit copy): 4a in a frame (`stageFrame`) under the three
  kinds (`kindStrip`, INDIRECT lit, "Electronic instruments exist in all three"), "? WHICH KIND?" + "The temperature inside a
  furnace is measured indirectly" (`askHead`); furnace at 0.86× on bench line 820; its glow follows the set point
  (`glowCol`: cherry at 700, yellow near 1100; solid aluminium below 660 °C), heat shimmer, no flame; nameplate kept 1100 °C
  max; thermometer HOLD/MIN/MAX. Wall card: profile computed from the layers' conduction (ln r per layer, R = ln(r₂/r₁)/k:
  ~90 % of the drop across the insulation), the air film its own band, every line clipped to the framed plot, measured point
  ringed in the thermocouple's yellow, inside "≈ 700 °C" in amber; checked at 500/700/1050 °C. Info card: sentence,
  Measured: T_shell = 160.0 °C, the relation, the substitution, T_in ≈ 700 °C at 54 px, real subscripts (`sub: true`),
  the illustrative note under a rule; icon kept as on 2a–3b. EN + FR shot; `shots/en-4a.png` replaced. Asked the owner:
  the controller's PV shows 700 too (its sensor is in the chamber, not the melt) — label it, or leave. Next: owner's
  verdict on 4a, then 4b.
- 2026-10-09: owner sent a 4b reference and their own arm image ("refine 4b … i have also added the hand to use"). Done
  (indirect-in-the-world 0.3.2; asset `img/arm-cuff.webp`, alpha cleaned): the drawn arm (`armCuff`) replaced by `armPhoto`
  (the photo at 0.88, fixed points in `ARMP`): elbow and forearm on a folded towel with a deep top face (bench line 870),
  contact shadows, gauge Ø larger (gr 104, 12.5 px numbers every 20) on a stem at the cuff's top edge, its tube across the cuff
  to the bulb and valve seated on the towel, the chest piece pressed into the crook; kinds strip as 4a; trace rebuilt
  (`bpTrace`: 0–180 axis, time label, beat ticks only between 120 and 80, a "now" dot, clipped to its plot); panel "? WHICH
  KIND?" (`panel` icon 'ask'), the sentence, 120 / 80 mmHg, "Direct: a catheter … invasive." Reference errors kept right:
  garbled dial, needle near 120, early beat ticks. 4b has no stage frame (as its reference); 4a has one: asked the owner.
  Still open from 4a: the controller's PV label. Next: owner's verdict on 4a/4b, then 5a/5b.
- 2026-10-09: owner asked whether the stethoscope's position is right. It was not (on the forearm's muscle, ~8 cm below the
  cuff; the reference had it further still). Moved (0.3.3): chest piece in the crook of the elbow over the brachial artery,
  ~1 cm clear of the cuff's lower edge, never under it; the bulb's tube re-routed down the cuff's face and along the forearm.
  Not shown: the listener's fingertips holding it (no image of a hand for that); offered.
- 2026-10-09: owner sent a placement diagram (diaphragm over the brachial artery at the inner elbow, just below the cuff).
  Position already matched (in the crook, ~1 cm clear of the cuff). The diagram showed the chest piece's build was wrong
  (a puck with a stem up from its centre): redrawn (0.3.4) as a dual-head chest piece seen side-on: diaphragm flat on the
  skin, bell above facing up, the stem out of the neck level with the skin towards the hand, the tube curving up.
- 2026-10-09: owner (with the placement diagram again): the diaphragm must be centred at the inner elbow joint, and the tubes
  should run at the diagram's angle. Done (0.3.6): chest piece centred on the elbow's crease (photo point 740,328 → stage
  641,590), lying tilted on the inner elbow, turned 10° with the arm, stem towards the hand, its tube diagonally down the
  forearm and out of the picture; the bulb's tube now leaves the cuff's lower edge (a port, `ARMP.cuffOut`) and runs along
  the forearm to the valve (it used to drape from the gauge's connector over the cuff).
- 2026-10-09: owner sent a 5a reference ("now refine 5a"). Done (null-potentiometer 0.2.2): rig at 1.36× (OX 26, bench line
  800) to fill the stage above the bench's caption (the reference is cropped lower); labels as the reference (`tagPill2`:
  larger, white with the value in yellow, cyan frames, the jockey's violet; kept on the stage), the galvanometer's label
  moved left of it (the bigger galvanometer reaches the panel); panel: icon + NULL, "The jockey at 60.00 cm: the wire gives
  1.2000 V against the unknown.", a rule that is a track with the jockey's dot (the reference's dot, made to mean
  something), −28 div at 52 px, "A difference: current flows through the galvanometer." EN + FR shot; 5b checked (same rig,
  its old panel until refined). No kinds strip on 5a (its reference has none; 4a/4b do): asked. Next: 5b.
- 2026-10-09: owner: "now refine 5b" (no reference). Done (null-potentiometer 0.2.4) in 5a's style: same rig and labels; a
  lit dashed violet ring round the galvanometer's zero (needle on it), a violet glow at the setting on the scale; panel:
  icon + NULL, "At 64.25 cm the difference is zero: the setting is the answer.", Eₓ = 0.020 00 V/cm × 64.25 cm, the track
  rule with the jockey's dot, Eₓ = 1.2850 V at 48 px, "No current is drawn from the unknown. Set up first: 1.0186 V at
  50.93 cm." Panel kept clear of the galvanometer's terminals. EN + FR shot. All ten stops refined; next: the owner's
  open questions (kinds strip on 5a/5b, 4a/4b frame, furnace PV label, cuff ARTERY arrow), then motion when called for.
- 2026-10-09: owner: "add the kinds strip to 5a and 5b". Done (null-potentiometer 0.2.5): `kindStrip('null', …)` on both
  stops (strings kDirect/kIndirect/kNull/kSub added to the unit), clear of the labels and the panel; EN + FR shot, stills
  replaced. Still open: 4a/4b frame, furnace PV label, cuff ARTERY arrow; 2a–3b have no strip (not asked).
- 2026-10-09: owner (5a reference again): the NULL panels too big (space right and bottom); panel and the galvanometer's
  label stacked vertically and right-aligned. Done (null-potentiometer 0.2.8, kit: `panel` h 'auto' + `panel.last.bottom`,
  plain heading `titleSize`; `tagPill2` options `right`/`down`): panel 468 wide at x 1404, plain NULL heading 26 px, as tall
  as its rows; the galvanometer's label under it, right edge aligned, leader straight down to the case; "set up first:
  1.0186 V at 50.93 cm" moved onto the reference cell's label (both stops) so 5b's panel fits; long lines wrap at 17–19 px.
  EN + FR of both stops checked (label clear of the + terminal), stills replaced.
- 2026-10-09: owner: "add the kinds strip to 2a to 3b". Done (direct-reading and indirect-by-calculation, versions bumped;
  strings kDirect/kIndirect/kNull/kSub added): `kindStrip('direct' | 'indirect', …)` on 2a, 2b, 3a, 3b. Room made: the
  voltmeter's label (2a/3a/3b) moved from above the meter to just left of its top (clear of the meter in French too); 2b's
  zoom bubble lowered and a little smaller (372, r 164). EN + FR of all four shot; stills replaced. The strip is now on
  every stop 2a–5b (1a/1b have their own tiles).
- 2026-10-09: owner: "make 4a match 4b, remove the frame". Done (indirect-in-the-world 0.4.1): the frame and its question
  head removed; the panel headed "? WHICH KIND?" (icon 'ask', as 4b), auto height, at 4b's height (y 172); floor and
  reflection full width; string askFurnace dropped. Kit's stageFrame/askHead now unused (kept). EN + FR shot. Still open:
  furnace PV label, cuff ARTERY arrow.
- 2026-10-09: owner: "make the furnace a bit bigger to fill the space". Done (indirect-in-the-world 0.4.2): furnace 0.86 →
  0.98× (centre x 660 → 640, clear of the controller and the thermometer), the melt's label raised to y 286. EN + FR shot.
- 2026-10-09: owner: "fix the cuff's ARTERY arrow". Done (indirect-in-the-world 0.4.3): the owner's original kept as
  `img/source/arm-cuff-owner.webp`; in `img/arm-cuff.webp` the printed ARTERY text and down-pointing arrow painted out with
  the flap's own fabric (two feathered patches from x 370–446, y 378–510; checked clean); `armPhoto` draws the mark in white
  print: "ARTERY →" on the cuff's distal part, tilted 11° with the stitching, pointing along the arm to the crook of the
  elbow and the stethoscope. Still open: furnace PV label.
- 2026-10-09: owner: "now lets begin the animation of the measurement types. but first lets model the power supply as a
  standalone library … knobs can turn, the CV and CC functions. the power on button, and the current capacity should be
  0-5A". Briefed; owner chose one knob each, a sliding rheostat as load, an OUTPUT key (off shows the settings), a short
  walk + free use. Owner also: real electronics drawn as they are (breadboard, supplies, meters) belong to the BreadBoard
  Bench; for now build them in the Animation Bench as animation tools with true electrical behaviour (memory
  `real-electronics-belong-to-breadboard-bench`). Done: `bench-work/libraries/bench-supply/` 0.1.5 (README there):
  `psukit.js` (reusable supply 0–30 V 0–5 A + 50 Ω 2.5 A rheostat + model: self-test, output off at power-on, SET
  display, CV/CC crossover, soft start, capacitor drain, display fade, winding heat), stops front · power · cv · cc,
  current dots, V–I panel; EN + FR; shots in `shots/`. `dinkit.js` (master + copy) exports `led7`. FPS unmeasured (pane
  throttled to 2–4 fps for every library). Next: owner's verdict; then move the card 3 units (2a, 3a) onto psukit
  (asks first: changes refined stops), then the measurement-types animation.
- 2026-10-09: owner: the supply library must stand alone, with a round icon-only labels button that draws little
  attention; the rheostat a component on its own. Done (memory `components-standalone-labels-on-a-button`):
  `bench-supply` 0.2.1 = the supply alone (centred at 1.2×; stops supply · power · output; `loadR` param for whoever
  connects a load, 100 kΩ = open); `rheostat` 0.1.0 (new: `rheokit.js` master; A/B/C rings, live A–C / C–B brackets,
  `rAC` and `current` params, stops rheostat · resistance); the wired CV/CC demo moved to `supply-rheostat` 0.3.0
  (copies of both kits). Bench: tray items take `icon` (44 px round icon-only button; index.html CSS, bench.js?v=16,
  README contract line); `#trayCap` kept on one line. dinkit master + copies: `callout`, `ICONS.labels`. Shots in each
  library's `shots/`. Next: owner's verdict; then card 3 units onto psukit (ask first), then the measurement types.
- 2026-10-09: owner: "yes move them onto the new supply". Done: `dinkit.js` `supply()` (master + every copy) draws the
  psukit supply at the old 420-wide footprint (PSU geometry from psukit's G; old drawing removed; throws if psukit.js
  missing); on, output on, CV, limit 3.000 A (never reached 0–30 V). three-kinds 0.4.0, direct-reading 0.2.0,
  indirect-by-calculation 0.2.0 load psukit.js (manifests.py `KIT_PSU`). Numbers unchanged (2a 5.10 V 0.510 A, 3a 0.243 A).
  Stills en-1a…3b in direct-indirect-null/shots replaced. Open: owner may want a 0.70 A limit (protects the 5 W
  resistor; CC above 7 V). Next: the measurement-types animation.
- 2026-10-09: owner: "the parts label button should be on the part not the bench". Done: `D.partButton` (dinkit master
  + copies: a 36 px round icon-only HTML button in stage space, quiet, teal when on); the tray buttons removed from the
  libraries (bench capability kept, unused). bench-supply 0.3.0 (on the case's top right corner), rheostat 0.2.0 (on the
  right end frame under the plate), supply-rheostat 0.4.0 (one button per part, each naming itself; L toggles both; the
  rheostat callout now under it). Memory `components-standalone-labels-on-a-button` corrected. Open: 0.70 A limit
  question for card 3. Next: the measurement-types animation.
- 2026-10-09: card 3 motion begun: owner "yes start with 1a and 1b"; plan briefed and chosen: timed on Play (Next shows the
  stop done), supplies already on, the why shown in 1b. Done (three-kinds 0.5.1): 1a kinds arrive (0.2/0.55/0.9 s), the
  line (1.4), tiles rise per sentence (2.2/4.6/7.4) and come alive (3.0/5.4/8.2): current dots (speed ∝ I), DMM reading
  up at 3/s and settling with last-digit wander, lamp warming, I = V / R tag, jockey 20 cm → 64.25 cm (2.4 s), needle
  pinned → damped swing → 0; "?" rings breathing; dur 12 s. 1b: per tile (0.3/1.0/1.7) head swap, set-up eases down to
  make room for the description, ✓ pop + ring, footer number, matching kind pill lit; why (2.8/4.1/5.5): pulse up the
  meter lead + LCD lit + "The reading is the voltage"; "2.43 V" carried into I = V / R, "I = 0.243 A · Calculated, not
  read" left of the tag; galvanometer zero lit, then the jockey's 64.25 cm with "the setting at zero is the answer";
  dur 7.2 s. Kit (master + all copies): dmmReading, meterBlank, lampCold, bulb/leads (incl. meterRed) from rigElectric,
  potentiometer moving mode (jockey/needle functions, needle clipped to the window), DINKIT.run settleOnArrival + onPlay
  'replay'. Bench: onPlay may return 'replay' (st.t = 0); bench.js?v=17; README contract line. Checked by Electron frames
  (timeline sheets) and live pane (no errors). Next: owner's verdict on 1a/1b, then 2a/2b motion (brief first).
- 2026-10-09: owner on 1a/1b: no current dots; auto-adjust the voltage 0 → max → down with the current and meter
  following; the jockey adjusted automatically as the galvo swings in response. Done (three-kinds 0.6.1): VOLTAGE knob
  swept 0 ↔ supplyV (cosine, 7 s period, from ALIVE in 1a, mid-rise at 1b's start); supply face drawn live (kit:
  rigElectric supplyLive + face/solve, D.supplyFace) and meter both updating 3/s at the same instants; lamp glow from the
  series solution; 1b's carried "x.xx V" and "I = … A" follow the meter. Pot: 11 s cycle (1.2 s off balance to 20 cm,
  6.5 s hunt in narrowing swings across 64.25 cm, ~3.3 s at the null), needle damped response integrated over the cycle;
  1b's null highlights shown only while at the null. Dots removed. Checked in Electron (sweep sheet, hunt strip, sync).
  Next: owner's verdict; then brief 2a/2b.
- 2026-10-09: owner: "the voltage change should be smooth and not too fast so it is easy for student to follow". Done
  (three-kinds 0.6.2): sweep = 8 s eased rise, 2.5 s held at the setting, 8 s eased fall, 2.5 s held at 0 (21 s); displays
  (supply and meter, same instants) 5 updates/s (≤ ~0.15 V a step); meter's last-digit wander only while the knob is still;
  1b opens near the top (at 5.10 V from 2 s to 4.5 s, so the carried reading is 2.43 V). Checked: tile 1 frames each second.
- 2026-10-09: owner: at the destination value stay ~5 s before starting over. Done (three-kinds 0.6.3): the sweep holds 5 s
  at the setting (cycle 23.5 s: 8 up, 5 held, 8 down, 2.5 at 0); the potentiometer likewise rests 5 s at the null before the
  next hunt (cycle 12.7 s). Checked: tile 1 at 5.10 V from 11 s to 16 s, tile 2 from 13.4 s to 18.4 s.
- 2026-10-09: 2a/2b briefed; owner: make 2a and 2b user-interactive (no auto sweep), fine adjustment, fix the meter's
  clipped display; labels stay always on; 2b "leave it interactive". Done: direct-reading 0.3.2 — 2a: supply face, meter,
  "Set to … V" label and panel V drawn in moving layers (no scene redraw), displays sampled 5/s, panel quotes the meter;
  2b: rod slid by hand (param rodAt 0–80 mm, stops at the block), zoom bubble follows its far end, panel "L = 412 mm" against
  the block else "L = far − near = … mm" (each end to 1 mm) + "Off the block: read both ends, and subtract." Kit (all
  copies): controls follow the hand from where they are (no jump), Shift = a tenth, wheel steps (c.wheel), slid handles
  repositioned; dmmReading: 3 full places + faint leading half-digit "1", H 46, right edge 46, V at 56; ruleRig noRod +
  rodOf(L, px, d). Checked live: 60° turn +6.7 V, Shift +0.72 V, wheel 0.01 V/notch; rod 21 mm off → 433 − 21 = 412.
  Versions: three-kinds 0.6.5, indirect-by-calculation 0.2.2, null-potentiometer 0.2.10, indirect-in-the-world 0.4.5.
  Next: owner's verdict on 2a/2b; then brief 3a/3b.
- 2026-10-09: owner: the supply's CURRENT must be tunable to set CC; show CC reached (current can't rise) and its effect on
  the voltage. Done: kit — rigElectric({lim}) solveL(V, lim): direct I = min(V/R, lim), V_out = I·R; lamp series: CC at
  lim gives V_out = lim·R + V_lamp(lim); supply()/supplyFace(V, lim, sol) show V_out, I, C.V./C.C. lamps, both knob
  pointers; PSU.iknob; I_LIMIT default 0.700 A (protects the 10 Ω 5 W resistor; 5.10 V → 0.510 A CV, CC from 7.00 V).
  New shared param supplyI (sequence shared: supplyV, supplyI), declared in direct-reading 0.4.0, three-kinds 0.6.6,
  indirect-by-calculation 0.3.0 (watch supplyI). CURRENT knob control in 2a and 3a (Shift fine, wheel 0.01 A). 2a label:
  "Set to {V} V · limit {I} A", in CC red "CC: holds {I} A, {V} V out"; meter/panel/caption follow V_out. Checked live:
  5.10 V CV → knob ~10 V → CC 0.700 A, 7.00 V (C.C. lamp red); limit 1.258 A → CV 10.14 V. The open 0.70 A question is
  settled by this default.
- 2026-10-09: owner: the bulb in the off state still looks faintly on. Fixed (kit, all copies): lamp() off (glow ≤ 0.02)
  draws clear glass (gradient bulbCold: low-opacity grey-blue, no white centre), a thinner/fainter reflection and bead;
  lit unchanged. Checked 1a tile 2 at 0 V and at 5.10 V. Versions: direct-reading 0.4.1, three-kinds 0.6.7,
  indirect-by-calculation 0.3.1, null-potentiometer 0.2.12, indirect-in-the-world 0.4.7.
- 2026-10-09: owner: the lit bulb had no mid glow; then "the bulb should have a rating that can make it burn and the effect
  shown". Done (kit, all copies): lamp() = cold glass + dark filament always, plus lampLitAt(glow): halo, warm glass
  (bulbLit), hot core, filament dull red → yellow-white, scaled by w = glow^0.6 (dim/mid/full read as lit); D.lampLit for a
  moving layer (rig.bulb.tf/pL/pR). Rating LAMP 3.8 V 0.3 A, burnI 0.45 A (≈7.6 V across it): D.circuitAt(lampIn, V, lim,
  blown) (blown opens the series circuit: I 0, VR 0, V_out = V); lamp(…, {blown}) broken filament + smoky deposit;
  D.lampFlash(pL, pR, k) blue-white flash. New shared param lampBlown (three-kinds 0.7.0, indirect-by-calculation 0.4.0;
  sequence shared). 3a: burns when I > 0.45 A (≈ 12 V with the 0.700 A limit), flash 0.6 s, label "burnt out: no current
  (click it for a new lamp)", a press control on the bulb fits a new lamp (DINKIT.run: kind 'press'); Reset also. 1a/1b
  tile 2: the same lamp, burns if the sweep overdrives it. Checked live (10.7 V 0.416 A alive; 12.94 V burnt, 0.00 V
  across R; replace at high V burns again; back down + replace → 0.243 A) and in captures (hot, flash, fading, burnt).
- 2026-10-09: owner: turning the CURRENT knob sets a CC point: show the set value blinking and following the knob; on
  release blink 3 more times, then settle back to following (the measured current). Done: psukit (master + copies)
  PSUKIT.touch(param, down|move|up|wheel) and PSUKIT.limitBlink(param) → { on } while turned (blink 0.25 s on / 0.15 s off;
  the wheel counts as turning for 0.3 s after a notch) and for 3 blinks (1.2 s) after release, else null; page clock (UI
  feedback). supplyLive: r.setA lights SET in the amps window only. dinkit supplyFace(V, lim, d, blink); DINKIT.run reports
  down/up/wheel to PSUKIT.touch. 2a and 3a (3a's supply face now in a moving layer: rigElectric supplyLive) show it;
  bench-supply 0.3.1 and supply-rheostat 0.4.1 too (output on). Checked live: held → ON/off with SET; released → blinks to
  ~1.2 s → current; captured 1.258 A SET then 0.510 A. Versions: direct 0.4.4, three-kinds 0.7.1, indirect 0.4.1,
  null 0.2.15, world 0.4.10.
- 2026-10-09: 3a/3b briefed; owner chose: hide the lamp's current in 3a; animate 3b's calculation on Play then live; a
  soft pulse along the meter's leads in 3a. Done (indirect-by-calculation 0.5.0): rebuilt as 2a (rigElectric supplyLive,
  meterBlank, lampCold; only lampBlown re-renders): supply face (CC, limit blink), meter (5/s, wander), lamp lit/flash,
  burn check, labels and panel numbers all in moving layers; 3a lamp label "its current: what we want to find"; pulse
  every 4.5 s along meterRed/meterBlack to R's ends (kit returns leads.meterBlack). 3b (settleOnArrival): reading chip
  carried 0.3 s, "= V ÷ 10.0 Ω" 1.0, "I = … A" 1.5 (+glow), ±1 % 2.2, ammeter ring 2.6, "agrees: … A" 2.9, lamp
  "running at … A" 3.3, seed 3.8; dur 4.6; then live. Checked live (5.10 → 7.90 V: 3.34 V; 3b settled 3.33 V ÷ 10.0 Ω =
  0.333 A, agrees 0.334) and in Electron frames. Next: owner's verdict; then brief 4a/4b.
- 2026-10-09: owner: 3a's pulse from the meter to the resistor is not needed (and ran the wrong way): disabled.
  indirect-by-calculation 0.5.1 (pulse code and constants removed). Memory `signal-cues-only-when-needed`.
- 2026-10-09: owner: when a component burns out, a small icon-only replace button (its name on hover). Done (kit, all
  copies): ICONS.replace (two arrows round), partButtonCss shared (+ .act: amber icon), DINKIT.run control kind 'button'
  {param, value, icon, x, y, tip}: a 36 px round icon-only button that sets param = value on click. Lamp: replaces the
  invisible click area in 3a (button at the bulb's top right) and appears on 1a/1b tile 2 (bulbAt per stop). Strings:
  lampTip "Replace the lamp"; lampSBlown "burnt out: no current". Checked live (appears on burn-out, title/aria "Replace
  the lamp", no text, click → new lamp, button gone) and in a capture. Versions: direct 0.4.6, three-kinds 0.7.3, indirect
  0.5.2, null 0.2.17, world 0.4.12. Any future part that can fail uses the same button.
- 2026-10-09: owner: the replace icon sat off-centre in its circle; "just make it a button with the icon". Done (kit, all
  copies): .dk-partbtn svg pinned to the centre (absolute 50%/50%, translate −50%); .act buttons are a 34 px rounded
  square (radius 9, dark fill, amber icon and border); the round labels button unchanged in look. Checked by capture
  (replace button, supply labels button). Versions: direct 0.4.7, three-kinds 0.7.4, indirect 0.5.3, null 0.2.18, world
  0.4.13, bench-supply/supply-rheostat/rheostat patch bumps.
- 2026-10-09: ROUND-UP (owner: "round up and lets do 4a next"). Card 3 motion/interaction done for 1a–3b (see
  bench-work/libraries/direct-indirect-null/README.md, "Motion and interaction"); stills en-1a…5b re-shot as each settles,
  contact sheet rebuilt. Standing patterns: Play runs a stop's motion, Next shows it done (settleOnArrival + 'replay');
  interactive blocks redraw only what changes (moving layers); controls follow the hand, Shift fine, wheel steps; the
  supply's CV/CC + limit blink and the lamp's glow/burn-out/replace live in the kits (dinkit master → copy to all eight
  libraries; psukit master in bench-supply → copies). Next: brief 4a (the furnace), then build on direction.
- 2026-10-09: 4a briefed; owner chose: real thermal lag (time ×20), PV = chamber temperature, show melting at 660 °C, a
  short demo on Play then interactive. IN PROGRESS: kit master dinkit.js has furnace(o.uid, o.frac) and controller(PV, SV,
  {heat}, CHAMBER) — NOT yet copied to the libraries. The full build plan, model constants and test results are in
  bench-work/libraries/indirect-in-the-world/4a-plan.md. Next session: build 4a's unit.js from that plan, sync the kit,
  bump versions, capture, show the owner.
- 2026-10-09: 4a BUILT from 4a-plan.md (indirect-in-the-world 0.5.0). Lumped heat model in unit.js (PI on the chamber,
  melt at 660 °C via enthalpy, shell tauS 10 s, time ×20), stepped on the bench's ambient time (frozen while paused; a
  jump back = arrival → settled at the set point; reduced motion → straight to rest). furnaceSet = chamber set point,
  default 750 (melt 700, shell 160). Play: settled at 720, the knob turns itself to 750 at 1.0 s over 1.2 s (touching the
  knob ends it); stop dur 24 s; settleOnArrival; watch dropped. Moving layers: furnace top (kit furnace part 'top' over
  'body', uid L), melt pill (solid / melting at 660 °C / molten), controller face (PV 4 Hz, HEAT time-proportioned),
  thermometer LCD (2 Hz, ±1 count), wall section (from the inferred value), panel (+ "the melt really is … °C" while
  |true − inferred| > 3); "time ×20" pill; caption live (bench.refresh). Kit: part options on furnace/thermometer/
  controller; CHAMBER tag moved under PV's label (it hit the digits); synced to all 8 copies. Versions: direct 0.4.8,
  three-kinds 0.7.5, indirect-by-calc 0.5.4, world 0.5.0, null 0.2.19, bench-supply 0.3.3, rheostat 0.2.2,
  supply-rheostat 0.4.3; default 750 and new strings in manifests.py. Checked live (no console errors): 750 → 650 freezes
  at 660 then solid, back up melts ~20 s then climbs; demo 3/8/15/23 s inferred 672/677/687/693 vs true 678/691/698/700.
  Frames: shots/en-4a.png re-shot, shots/4a-motion-strip.jpg (8 frames). contact-sheet.jpg NOT rebuilt. README updated.
  shoot-prototype.js now takes the plan as a .json path. Next: owner's verdict on 4a; then brief 4b (the cuff).
- 2026-10-09: owner: "animate the heat of 4a, show some heat radiated" → "as natural as possible", "animate the rise of
  the temperature slowly", "mock up the furnace details nicely on its surface". Done (world 0.6.1): model repaced (HM a
  1/12, b 0.1, lc 0.005, lm 0.00741, P 14, Kp 0.3, Ki 0.006, Lh 110, tauS 12): chamber 720→750 in ~8 s, melt ~30 s, shell
  ~45 s; stop dur 40. Heat: haze over the mouth (backdrop + lid rasterised once to a 2× PNG, bent by feTurbulence →
  feDisplacementMap in a group sliding up, two copies cross-faded, radial mask), lit wisps, melt surface stirring, glow
  flicker on lid edge and lip, faint shell shimmer; the first try's radiating arcs dropped as unnatural. Kit: furnace
  shimmer:false option; shell details (grain filter, heat tint, highlight, weld seam, band screws, riveted nameplate +
  serial, HOT SURFACE label, terminal box + 400 V label + gland → black power cable, chamber TC sheath + head → grey cable
  to the controller; returns powerEnd/tcEnd); lead 'grey'. Synced to all copies; versions direct 0.4.10, three-kinds
  0.7.7, indirect-by-calc 0.5.6, null 0.2.21, bench-supply/rheostat/supply-rheostat +2 patches. 59–60 fps live, no
  console errors. Shots: en-4a.png, 4a-motion-strip.jpg (demo 0.5–39 s), 4a-heat.webp (8 s clip). README updated.
  Next: owner's verdict on 4a; then brief 4b.
- 2026-10-09: owner: "brief 4b next" (4a taken as accepted). 4b brief sent: real-time measurement on Play (pump to 160 in
  5 s, let down at 3 mmHg/s: sounds 120 at ~18 s, stop 80 at ~32 s), the needle and trace live, the sys/dia lines and
  the panel's numbers revealed only when captured, beat ticks as heard; questions: pace, sound (Korotkoff taps via
  WebAudio, muted by default behind an icon button?), interaction (bulb squeeze to pump + valve to let down, or Play-only),
  an artery inset under the cuff (closed / spurting / open: why the sounds), needle bounce with each beat, the
  rate-vs-resolution point (±2.5 mmHg at 3 mmHg/s and 72 /min). Waiting for direction.
- 2026-10-09: owner: "proceed" (4b brief answered with its recommendations: real time; sound muted behind an icon button;
  Play demo then bulb + valve interactive; artery inset; needle bounce; the rate-vs-resolution line). Mid-build: "animate
  the aneroid gauge". Done (indirect-in-the-world 0.7.2; README "Motion and interaction", 4b): cuff model in unit.js (artery
  80→120 each beat at 72 /min, squeezes +16 mmHg, valve 0–40 mmHg/s, sounds while the cuff is between, readings to 2 mmHg,
  demo's heart phased so beats land on 120 and 80); Next = one measurement done; Play 41 s (10 squeezes, valve to 3, sounds
  18.8–32 s, dump at 70, valve closed); gauge needle a damped spring (steps per squeeze, beat kicks, stop pin); live trace
  (lines + panel numbers only once read; ticks per sound); panel rate line + "pumped too low"; artery inset; teal ring per
  sound; Korotkoff sounds by WebAudio behind a round icon button (params cuffValve, cuffSound). Kit (all 8 copies synced):
  gaugeNeedle, cuffBulb, bpTraceLive, arteryInset, ICONS.sound/soundOff, control kinds 'tap' and toggle 'button'. Versions:
  world 0.7.2, direct 0.4.11, three-kinds 0.7.8, indirect-by-calc 0.5.7, null 0.2.22, bench-supply 0.3.6, rheostat 0.2.5,
  supply-rheostat 0.4.6. Checked: Node (demo 120/80, 8 mmHg/s → 114/82, pumped to 96 → "too low"), Electron frames, live
  pane (9 taps → 144 mmHg, wheel → 4.0 mmHg/s, new run "— / —", sound toggle, 52 fps, no console errors). Stills: en-4b.png,
  4b-motion-strip.jpg. Sound itself not heard by me (no audio check possible). Next: owner's verdict on 4b; then brief 5a/5b.
- 2026-10-09 (new session): owner: "proceed" (4b taken as accepted). 5a/5b brief sent: 5a on Play (~8 s) calibrate on the
  reference cell first (two-way key on REF, jockey tapped at 50.93 cm, needle to zero: 0.020 00 V/cm), the key thrown to
  Eₓ, tapped at 60.00 cm: a damped swing to −28 div; 5b on Play (~14 s) the hunt by bracketing (60 → 70 → 65 → 64 →
  64.5 → 64.25), then live. Recommended: the jockey lifted while moved and pressed when let go (the needle answers only
  in contact, back to zero when lifted); the two-way key clickable; the rheostat a second input (moving it un-calibrates
  the wire: the panel says so and the reference balance moves); no coarse/fine protective resistor. Waiting for direction.
- 2026-10-09: owner: "proceed" (5a/5b brief answered with its recommendations). Done (null-potentiometer 0.3.3; README
  "Motion and interaction", 5a/5b): kit POT driver model (2.10 V cell, 0.05 Ω, rheostat 1.0 Ω slider f, wire 10.0 Ω; f 0.45 →
  0.020 00 V/cm; `POT.kOf`); the rheostat rewired (driver into the winding's low left terminal, out by slider and rod: only
  the part left of the slider in circuit); `potentiometer({ live, rheo, key })` with moving slider/plug/jockey(c, lift),
  `jockey(…, lift)`, DINKIT.run `liveControls`. Unit: jockey lifted while it moves, pressed after 0.25 s at rest; two-way key
  clickable (S reference / X unknown, plug carried across); rheostat slider an input; damped needle (1.2 Hz, ζ 0.32) with
  stop pins; calibration remembered (balanced on S → 1.0186 ÷ L), red "check it again on the reference cell" when the
  rheostat moves after; panel and caption follow the rig (caption holds while lifted). Play 5a (13 s): set up on S, rheostat
  0.30, +5 div at 50.93, rheostat to 0.45 → zero, "0.020 00 V/cm", key to X, 60.00 cm → −28. Play 5b (16 s): bracketing 70
  (pinned) → 65 (+5) → 64 (−2) → 64.5 (+2) → 64.25 null. 5a retitled "Calibrated, then off balance". Fixed the jockey's jump
  to 0 cm on first grab. Kit synced to all 8 copies; versions direct 0.4.12, three-kinds 0.7.9, indirect-by-calc 0.5.8,
  world 0.7.3, null 0.3.3, bench-supply 0.3.7, rheostat 0.2.6, supply-rheostat 0.4.7. Checked: live pane (drag
  64.25 → 60.25 no jump, −27 div; key → S pinned; rheostat +40 px → −5 div at 64.25 + warning), sequence Play in real time,
  60 fps, no console errors, 1a tile unaffected. Stills en-5a/en-5b replaced, shots/5ab-motion-strip.jpg. contact-sheet.jpg
  NOT rebuilt. Card 3's motion is now done 1a–5b. Next: owner's verdict on 5a/5b; then what follows card 3 (card 4's brief).
- 2026-10-09: owner on 5a: the jockey's sliding must be interactive and slide by itself until moved, the galvanometer
  answering the movement; mid-turn: "the display info card has gone beyond the header … reduce the sizes of the diagrams a
  bit". Done (null-potentiometer 0.4.1): no lifting any more (the jockey stays on the wire as it slides, by hand and in both
  demos; the needle follows continuously); 5a self-slide (reached by Next or after its demo: ±8 cm about the balance, 14 s
  round, re-centred when the key/rheostat move the balance; caption sSlide; stops for good when the presenter touches the
  jockey; Reset or re-arrival starts it again); rig 1.36× → 1.18× (OX 80, bench line 812), panel at y 92 (452 wide, smaller
  numbers and heading), galvanometer label under it with its leader to the case's top right corner. Checked: Electron
  frames (sliding 60 → 67 → 71 cm, needle following and pinning; calibrated, null, rheostat warning EN + FR all clear of the
  header and the galvanometer), live pane in the sequence (grab stops the slide: 66.95 cm, +18 div), no console errors.
  en-5a/en-5b re-shot; 5ab-motion-strip.jpg is from 0.3.3 (before these changes). Next: owner's verdict on 5a.
- 2026-10-09: owner: "i still cannot grab and drive the jockey". Cause: the jockey's hand-hold (an invisible slide control)
  sat ABOVE the drawn jockey (centred 30 px over its top, 56 px round), so a press on the jockey itself hit the scene; my
  earlier checks dispatched events on the hold directly and missed it. Fixed (null-potentiometer 0.4.2): the hold is the
  jockey itself, 64 px wide from its top down to its pointer on the scale (ew-resize cursor), following it as it slides.
  Checked with a real mouse drag in the pane on the drawn block: 40.00 → 51.50 cm, the demo handed over. Lesson: test
  hand controls by dragging the drawn part with the pointer tool, not by dispatching on the control element.
- 2026-10-09: owner: "proceed" (5a's jockey fix taken as accepted; card 3 done 1a–5b). Card 4's brief sent ("Error is
  not a mistake", 2.8 min, PLAN SHOW none, 8 Flow paragraphs): sequence `error-not-mistake`, one rig carried through
  and handed to card 5: a 1 V DC voltage reference with its calibration certificate (conventional true value) read by
  card 5's handheld (μ 1.0010 V, σ 2.0 mV). Stops: ¶1 seven lit word tiles, each tagged with where it is met (card 5,
  card 6, D1·080); ¶2 static vs dynamic, the reference beside a probe plunged 20 → 80 °C (lag, τ ≈ 3 s); ¶3–5 the
  reading wanders, error = indicated − actual drawn live; a second operator gets the same spread (no one's fault);
  ¶6 the certificate (1.000 02 V ± 0.000 01 V, k = 2) as the conventional true value; ¶7 readings stack as dots into a
  cluster round a central value (hands to card 5's curve), the bench meter held back so card 5's reveal is not spoiled;
  ¶8 absolute (± mV) and relative (± %) side by side. Questions: the rig (voltage reference vs calibration weight on
  the precision balance, OIML "conventional mass"), ¶2's dynamic example, the input, still first. Waiting for direction.
- 2026-10-09: owner: "proceed with your recomendations and as usual create still image representations first for me to
  judge". Built card 4's stills (README bench-work/libraries/error-not-mistake/README.md): kit master
  libraries/error-kit/errkit.js (+ manifests.py writing the manifests and copying kits); units vocabulary-of-trust (1),
  static-and-dynamic (2), error-on-a-reference (3a–3c, card 2's operator photos copied into img/),
  conventional-true-value (4), readings-cluster (5a–5b); sequence error-not-mistake, all v0.1.0, EN + FR. Bench: a
  one-stop section's rail label now as wide as a stop gap (was "T…"). Checked: every stop free of NaN/undefined, no
  errors, French fits. Stills shots/en-*.png + contact-sheet.jpg sent. Next: the owner's verdict on the stills, then motion
  (proposed input: the meter's HOLD button takes a reading).
- 2026-10-09: owner: "refine one more time", mid-turn "remember realism, physics complied". Done (card 4 units v0.1.1;
  README "Refinement"): physics audit: stop 2's static plot was near-flat while the meter's spread is 2 mV (now the same
  40 readings as 5a, "scatter, no drift"; its meter shows the latest), the probe's underwater stem refracted the wrong way
  (now outward ×1.33); realism: probe in a retort-stand clamp (was floating), small bubbles on the glass at 80 °C (were big
  rings), reference box screws + vents, readings as lit beads; tiles gained example lines, a clearer error mark. All other
  numbers re-checked (64.2 °C at 4 s, τ 3 s; mean 1.0010 V; operators' means; 0.2 % and 0.24 %; certificate). Stills
  re-shot, contact sheet rebuilt and sent. Next: the owner's verdict, then motion.
- 2026-10-09: owner: "proceed with animation of error is not mistake" (card 4 stills taken as accepted). Motion brief
  sent (per brief-before-each-unit): stop by stop motion on the existing stills; input = the meter's HOLD button (a reading
  per press, flowing into ticker, error, operators' logs, dots) with Play running it unaided; questions: a second input
  (reference 1 V / 10 V output switch, meter dial to 20 V, OL until turned), 5a pace (real 60 s vs ×4 labelled), stop 2's
  probe lifted/plunged by hand (cooling in air τ ≈ 20 s, illustrative), block 1 tile marks animating as each word is said.
  Waiting for direction.
- 2026-10-09: owner: "proceed" (motion brief answered with its recommendations: HOLD as the input; the 1 V / 10 V posts and
  the meter's RANGE as the strength input, OL until ranged; 5a at time × 4, labelled; the probe lifted/plunged by hand,
  τ air 20 s illustrative; tile marks animated). Done (card 4 units v0.2.5; README "Motion and interaction"): kit errkit
  meter/CNT/CERT (10 V line 9.999 87 V ± 0.000 05 V)/rigLive/clock/ICONA, logCard and dotPlot on counts, hotBeaker probe
  'moving'; dinkit 'L' segment + zoom icons synced to all 14 copies; sequence shares refOut, meterRange. Every stop
  settleOnArrival with a Play motion (see README table). Checked live (real clicks: probe, leads, RANGE, HOLD) and in
  Electron frames EN + FR, no errors. Stills re-shot (en-*.png, contact-sheet.jpg), shots/motion-strip.jpg. Fixed on
  the way: 3b number-line labels, the zoom chip, 5b's sum spacing, stop 2's plot labels. Next: the owner's verdict on
  card 4's motion; then card 5's brief.
- 2026-10-09: owner: "dont you think drawing the bell curve on 5a 5b?" → "have the area under the curve nicely and faintly
  shaded". Done (v0.2.7): errkit dotPlot o.curve (n × normal density scaled to the beads, shaded area behind, line over;
  sdOf), 5a's curve from the readings so far (fades in from the 9th; settled 1.0010 V, spread ≈ 2 mV, three-line label
  "the handheld's curve · … · card 5 picks it up here"), 5b's under the band. Checked in Electron frames EN + FR + 10 V on
  20 V, no errors. en-5a/en-5b, contact sheet, motion strip refreshed; README "The bell curve". Next: the owner's verdict on
  card 4's motion; then card 5's brief.
- 2026-10-09 (new session): owner: "proceed" (card 4's motion taken as accepted); card 5's brief begun (spec
  D1-020-05 read; notes for it: the bench meter's digits vs σ 0.15 mV, the handheld can't show σ 0.3 mV at 1 mV a count,
  so the A–D walk should be model curves). Interrupted: owner "can you animate the beads and the drawing of the bell
  curve?" (card 4, readings-cluster 5a/5b). Plan sent: beads fall with a bounce and land, several in flight; the curve
  drawn by a pen left to right at the 9th reading, then easing to each new mean/spread; 5b's Play rains the beads in and
  draws the curve before the band. Waiting for direction; then card 5's brief.
- 2026-10-09: owner: "proceed" (beads-and-pen plan as proposed). Done (card 4 v0.2.8; README "Beads and pen"): errkit
  dotPlot `o.drop/from/flyDur/grav` (5a beads thrown from the display on an arc, 0.6 s, several in the air; 5b's forty fall
  under gravity; two hops, a white flash and a ring on landing) and `o.curve.draw/n/labelOp` (a lit pen tip draws the curve
  left to right, 1.2 s, from the 9th landed reading in 5a; after the forty in 5b), `o.meanOp`; readings count once landed
  (tally, central value, curve, caption, mark). 5b stop 9.5 → 13.6 s. Kit synced to all 5 units. Checked in Electron
  frames EN + FR, no errors; shots/beads-and-pen.jpg sent. Next: the owner's verdict; then card 5's brief (its notes are in
  the entry above).
- 2026-10-09: owner (mid-turn): "make the animation replayable". Before: a finished stop's Play ran the next paragraph (and
  did nothing on the last stop); Reset went to stop 1 settled; nothing re-ran the stop on show. Done (bench.js v18, index,
  i18n v13; bench README "Replay"; memory animation-player-controls): a teal Replay button between Play and Reset +
  Shift+Space: the current stop from t 0 (`enterStop(i, i, true)`), holding at its end. Checked on card 4 (5a, 5b, 3a):
  replays from an empty plot, holds, replays again, Play then advances; real click in the pane; no errors. Note: the
  pane served a cached index.html; reload with `index.html?…&nc=`. Next: the owner's verdict on beads/pen + Replay; then
  card 5's brief.

- 2026-10-09 (new session): owner: "proceed" (beads/pen + Replay taken as accepted). Card 5's brief sent ("Accuracy is
  not precision", 3.1 min, PLAN SHOW Plot centrepiece, Flow ¶0 ASK, ¶1 pause, ¶2 accuracy, ¶3 precision, ¶4 standard
  deviation, ¶5 [[demo]], ¶6 both, ¶7 techniques): sequence `accuracy-precision`, four units: (1) `four-targets` ¶0–1,
  paper targets A–D, shots from the spec's seeded table (§3b), no answer shown; (2) `accuracy-and-precision` ¶2–4 on card
  4's handheld and forty readings (mean 1.0010 V, σ 1.87 mV ≈ 1.9 mV from the counts, variance 3.5 mV²; the spec's 2.0 mV
  rounded), 2a accuracy = mean vs truth, 2b precision = readings vs each other, 2c σ and ±1σ band (~68 %); (3)
  `two-meters` ¶5, handheld + a 6½-digit bench meter with an expired CAL sticker (1.0040 V, σ 0.15 mV) on the same
  reference, beads into two curves on one axis, 3a "which do you believe?", 3b the truth (1.0000 V), 3c the walk A→B→C→D
  with the matching target lit each time; (4) `both-and-techniques` ¶6–7, two instruments disagreeing, different parts of
  the scale, averaging: σ/√N shrinks the scatter (1.9 → 0.30 mV at 40) but not the bench's +4 mV offset (hands to card 6).
  Questions: Animation Bench sequence (Plot spec kept for the lecture), paper targets with holes vs archery, the walk at
  σ 0.3 mV below the handheld's 1 mV count (model curve, no beads), μ/σ handles on the curve itself, averaging shown with
  the offset kept, stills first. Waiting for direction.
- 2026-10-09: owner: "accepted" (card 5's brief, all six recommendations). Building card 5's stills.
- 2026-10-09: card 5's stills built (README bench-work/libraries/accuracy-precision/README.md): kit master
  libraries/accuracy-kit/acckit.js (+ manifests.py); units four-targets (1), accuracy-and-precision (2a–2c), two-meters
  (3a–3f: the walk as four stops, A–D, the case before ghosted), both-and-techniques (4a the 2 × 2, 4b three techniques);
  sequence accuracy-precision, all v0.1.0, EN + FR. Physics change from the brief: the bench meter is 4½ digits (0.1 mV a
  count), not 6½ (a 6½-digit meter scatters by µV; 0.15 mV would be broken): readings 2 4 8 12 8 4 2 counts about
  1.0040 V, s 0.147 mV; +4.0 mV = 8 × its ±0.5 mV spec. Handheld s shown as the sample value (1.895 → 1.9 mV, s² 3.6 mV²).
  Colours: true value amber dashed (card 4's), handheld teal, bench violet. errkit dotPlot gained o.trueOp (card 4's copies
  re-synced, behaviour unchanged). Checked: 12 stops EN + FR, no NaN, French fits. Stills shots/en-*.png, fr-*.png,
  contact-sheet.jpg sent. Next: the owner's verdict on the stills, then motion (to brief: beads falling into both meters'
  columns, the truth's reveal, the curve dragged by its handles, the running averages drawn).
- 2026-10-09: owner: "review it one more time … physics, mathematics, visualization, reality consistency, design". Done
  (card 5 v0.1.1; README "Review"): all numbers recomputed in Node (all held); fixed the bench meter's 12-reading column over
  its curve (counts 2 5 8 10 8 5 2, s 0.154 mV), 4b's scale text contradicting its picture, the targets' lab backdrop (kit
  range(): an indoor range), the bench meter's crowded digits (dinkit led7) and leads over its terminals, 4b's empty space
  and unnamed ± s ÷ √n band. EN + FR re-shot, contact sheet rebuilt and sent. Next: the owner's verdict, then motion.
- 2026-10-09: owner: "proceed" (card 5 stills v0.1.1 taken as accepted). Motion brief sent (brief-before-each-unit):
  stop by stop motion on the stills (shots landing; beads raining and pens drawing; the deviations table filling; both
  meters reading live into their columns at time × 4; the truth dropping in; the walk gliding A → D; the 2 × 2 lighting;
  the rod slid, the averages drawn). Inputs: HOLD on both meters (3a), the curve's handles (3c–3f) driving the verdicts
  and the side target's shots, the rod slid by hand (4b). Questions: verdict thresholds (1 mV each, labelled), 3a pace
  (× 4 as card 4), the side target driven by the curve, stop 1's shot pacing, the rod by hand. Waiting for direction.
- 2026-10-09: owner: "proceed" (motion brief answered with its recommendations). Card 5 motion built (v0.2.0; README
  "Motion and interaction"): shots landing with puffs; 2a–2c entrances (beads, pen, mean, truth, arrow; bracket; table
  filling, sum counting, band); 3a both meters reading into their columns at time × 4 with live-fitted curves and a counting
  panel, HOLD on both meters; 3b truth drop, arrows, sticker pulse; 3c–3f glide + draggable peak (μ) and shoulder (σ) driving
  letter, verdicts (±1 mV / σ < 1 mV, labelled), side target (walkShots) and a live caption; 4a cells in turn; 4b curves,
  rod slid (draggable, rodFrom) and the running averages drawn. Bench meter keys re-laid (were under the terminal block) with
  HOLD. Recorder: record-bench.js "mode": "run" (replays and steps the clock; waits for the library to load). Checked EN + FR
  no NaN, real drags in the pane, 54–61 fps. Film accuracy-precision-card5.webp + shots/motion-strip.jpg sent. Next: the
  owner's verdict on card 5's motion; then card 6's brief ("Repeatable is not the same as right").
- 2026-10-09: owner: on 2a "let the ball appear when a hit … is thrown" on the paper target; "proceed" on the plan. Done
  (v0.2.1; README "The readings as shots"): 2a/2b's target = the handheld's forty readings as forty hits (left–right = the
  reading's error, 1 mV = ½ ring; up–down scatter only, labelled); 2a fires them 0.12 s apart, each bead leaving its hole
  (hole-sized, growing) for its column; group centre exactly +0.5 ring (= +1.0 mV); 2b a left–right bracket under the group
  (8 mV), not a circle (vertical scatter is meaningless); 2c keeps its table. errkit dotPlot o.from(i), o.fromR (card 4
  re-synced). shoot-prototype.js waits for the library to load. Film (924 frames) + strip re-made and sent. Next: the owner's
  verdict on card 5's motion; then card 6's brief.
- 2026-10-09: owner: "the bell curve should begin at the early stage of the shooting and adjust as the shots arrive". Done
  (v0.2.2): 2a's curve is the fit to the landed readings from the 5th (pen 0.8 s), gliding 0.3 s to each new centre, spread
  and height, labelled "the fit to n readings so far" (s 1.0 → 1.9 mV); 2a retimed to 9.5 s. Film + strip re-made, sent.
  Next: the owner's verdict on card 5's motion; then card 6's brief.
- 2026-10-09: owner: the two meters' balls differ in size and spacing, so the difference isn't evident; then "make sure the
  entire bench has these correctness enforced … take a second look at it all from 1 to 4b". Done (v0.3.0; README "Visual
  accuracy"; memory visual-accuracy-same-scale): curvePlot rewritten count-honest (one ball = one reading, same size and step,
  columns at each meter's displayed values, curves = expected counts, count axis); 3a/3b axis 0.995–1.007 V; walk on a count
  axis (σ 3 stands ten times lower than σ 0.3; bench curve clipped with a note), walk target by 2a's rule (40 shots); 4a and
  4b panel 1 on shared count scales. Audit of 1, 2a–2c, 4b rule/averages: unchanged, correct. EN + FR, film, strip sent.
  Next: the owner's verdict; then card 6's brief.
- 2026-10-09: owner: views must not open on their finished state; show the first frame, Play runs it, or the presenter sets
  Autoplay; "a standing rule for all libraries in the animation bench"; then "play and replay will be per view but the reset
  will be for the whole views". Done: bench.js v19 (v18 archived): arrive() holds a new view at t 0 ("Ready"), Play per view
  (holds at its end, again on a finished view), Reset whole library, Autoplay switch (key A, per viewer, ?autoplay=1), new
  hints (i18n). DINKIT.run settleOnArrival retired (master + 18 copies), versions bumped (card 5 0.3.1, card 4 0.2.9, card 3
  units +1, supply libraries +1). Memory views-arrive-at-first-frame (animation-player-controls updated). Checked in the pane:
  card 5 transport; cards 1–4 and ldr-chain arrive Ready and play, no errors. Next: the owner's verdict; then card 6's brief.
- 2026-10-09 (new session): owner: "proceed" (views-arrive-at-first-frame / bench.js v19 taken as accepted). Card 6's brief
  sent ("Repeatable is not the same as right", 1.5 min, PLAN SHOW the Plot spike, Flow ¶1 repeatability, ¶2 reliability
  (diaphragm), ¶3 neither is accuracy, ¶4 validity (diaphragm + strain gauge, range, conditions)): sequence
  `repeatable-not-right`, four units: (1) `repeat-readings` ¶1, card 5's out-of-calibration bench meter on card 4's 1 V
  reference, readings stacking in one column, truth hidden, a RES key 4½ ↔ 3½ digits as the input (at 3½: 1.004 every
  time; P(stray) = 2Q(0.5/0.15) ≈ 9 × 10⁻⁴ a reading); (2) `diaphragm-overload` ¶2, a 0–10 bar diaphragm pressure
  transmitter on a hand pump with a reference gauge, trials at very different pressures, an overpressure past proof
  (20 bar) leaves a permanent set: back at 2.000 bar it reads high (shift illustrative, labelled), diaphragm cut-away inset;
  (3) `repeatable-and-wrong` ¶3, the PLAN's spike on card 5's count-honest plot, truth dropped in, +4.0 mV; (4)
  `validity` ¶4, the sensor cut away (port → diaphragm of known area → cemented foil gauge → bridge → mV), 4a the chain,
  4b range and conditions (transfer curve, rated band, temperature). Spec D1-020-06's handheld spike and F1 (inside its
  spec) no longer fit card 5 as built (said in the brief). Questions: ¶1's instrument and RES key, the pressure rig
  (hand pump + reference gauge vs deadweight tester), ¶4's inputs (pressure + temperature), the confidence question on
  stop 1, stills first. Waiting for direction.
- 2026-10-09: owner: "proceed" (card 6's brief, all five recommendations). Card 6's stills built (README
  bench-work/libraries/repeatable-not-right/README.md): kit master libraries/repeat-kit/repkit.js (+ manifests.py: EN + FR,
  no-break spaces between numbers and units); units repeat-readings (1), diaphragm-overload (2a, 2b), repeatable-and-wrong
  (3), validity (4a, 4b); sequence repeatable-not-right, all v0.1.0. Values: bench meter at 3½ digits, forty readings all
  1.004 (gain 0.4 % high: 10.04 V on 10 V); diaphragm 17-4PH Ø 10 × 0.25 mm by clamped-plate theory (3.46 µm, +69/−139 µε,
  30 MPa, 0.208 mV/V per bar; yield ≈ 33 bar); 40 bar overload → +0.12 bar (illustrative), drift 0.01 bar/K outside 0 … 50 °C
  (illustrative). Inputs declared: meterDigits (RES tap), pressure, mediumT (no hand controls yet besides RES). Stills
  shots/en-*.png, fr-*.png, contact-sheet.jpg sent. Noticed (not fixed): in French the bench's "Lecture auto : non" switch
  covers the rail's last stop label (bench.js v19 layout). Next: the owner's comments on the stills, then motion.
- 2026-10-09: owner sent six reference renders of card 6's views ("realistic; valid, fact checked, consistent, physics
  preserved, beautiful, professional"). Done (v0.2.0; README "To the owner's reference renders"): kit repkit gains a
  brushed-steel pump with tees, blue hoses, three-quarter rubber-rimmed handwheel, chrome-bezel gauge, blue six-bolt
  transmitter housing, shaded cut-away (cut faces, concave interior, rims, board with chip, gold wires, glowing arrows),
  `callout`, `headHi`, `keyLit`; all views' type enlarged, trials as a gridded table. Reference errors kept right (README):
  36 chips → 40, "3½ DIGITS · 20,000 COUNTS" → 4½, y axis "Reading (V)" → count, pump 0–10 bar → 0–60, ±0.015 % FS →
  ±0.025 %, −1090 → −1109 µε, "4.0 mV at 10 V" → 40 mV, "+ 16Et³" → ÷, "2ε · 5 –20 mV" → Σε · 5.20 mV, yield 35 → 33 bar.
  EN + FR stills re-shot (round 1 in shots/v0.1/), contact sheet rebuilt. Next: the owner's comments, then motion.
- 2026-10-09: owner: "proceed" (card 6 stills v0.2.0 taken as accepted). Motion brief sent (brief-before-each-unit;
  views-arrive-at-first-frame): 1 readings fly from the display into the chips and the column at time × 4, the count and
  the question last, RES and HOLD the presenter's; 2a three trials (handwheel turns, both displays climb, the transmitter
  lags ~0.3 s, diaphragm bows, a row written, RELEASE between), 2b the overload (OL from 11 bar, yield flash at 33 bar,
  back to 2.000 → 2.12 twice), handwheel drag + RELEASE tap, damage persists until a replace button; 3 truth drops, arrow,
  verdict rows in turn, Look for; 4a pressure 0 → 5 bar and the chain filling link by link; 4b the transfer curve drawn by a
  pen through its zones, the temperature curve, markers dragged to set p and T (verdict flips). Questions: stop 1 pace,
  the pump's speeds, 4a's hand control for pressure, p and T shared between 4a and 4b, a film after. Waiting for direction.
- 2026-10-09 (new session): owner: "proceed" (card 6's motion brief, all five recommendations: stop 1 at time × 4
  labelled; trials 1 bar/s, overload 4 bar/s; 4a's pressure set by dragging the oil in the bore; p and T shared between 4a
  and 4b; film + key frames after). Building card 6's motion.
- 2026-10-09: card 6 motion built (v0.3.0; README "Motion and interaction"): 1 numbers fly display → chip, balls chip →
  column at time × 4, count, question last; RES/HOLD live (question only at 3½; labels count HOLD's). 2a three trials at
  1 bar/s (wheel turns, vents wind it back), transmitter 0.3 s behind, rows written; 2b 40 bar at 4 bar/s, OL from 11, edge
  flares/yields at 33, 2.12 twice, ring. Hand: handwheel (pumpTurn, ~4 bar/turn, ≤ 45 bar), RELEASE tap, damage past
  33 bar until a replace button (txDamaged). 3 truth drop, gap, words in turn. 4a pressure eased to the set value, chain
  link by link; oil in the bore dragged (DINKIT vertical slide, new). 4b pens through the zones, markers, verdict; markers
  slide. Kits additive (repkit part/flash/draw/glow, acckit from(i), dinkit y0/y1; copies re-synced). Checked: all views
  played EN + FR, no errors/NaN, real drags/taps, 57–61 fps. Stills re-shot (v0.2 kept), key frames + strip, film.
  Film repeatable-not-right-card6.webp (848 frames, 10 fps, 8.1 MB) + motion-strip + contact sheet sent. Next: the owner's
  verdict on card 6's motion; then card 7's brief.
- 2026-10-10: owner: "review the work … correctness, consistency, reality > 95 %, accuracy, physics, mathematics, improvement
  in animations especially on 2a, 2b and 4a". Done (v0.4.0; README "Review"; memory drawing-and-numbers-agree): strains
  at the gauges' drawn radii (εc(1 − 3ρ²) averaged over each grid: +64 / −90 µε per bar; bridge 1.55 mV/V FS, was 2.08);
  transmitter non-linearity 0.0002·p·(p − 2) (trial 3 reads 8.01); wheel/spindle/hand one law (4 bar a turn); no elastic
  numbers past yield; displays at 5 / 4 Hz; 4b membrane stiffening (Timoshenko, 8 % at 33 bar), axis 0 … 9; README stray
  rate 1 in 860; section tags kept inside. Animation: 2a/2b turning arrow, row readings fly from the displays, ratings
  badge (over range / past proof / yielding); 4a links 1 s apart, arrows draw, each link lights its part (oil, force,
  w dimensioned, gauges, wires, board/connector). Checked EN + FR played, no errors/NaN, real half-turn = 1.957 bar.
  v0.3 shots in shots/v0.3/; stills, key frames, strip re-shot; film re-recorded.
- 2026-10-10 (new session): owner: "proceed". v0.4.0's contact sheet, motion strip and film (852 frames) sent (the
  previous session ended before sending them). Card 7's brief sent ("Where error comes from", 3.2 min, spec D1-020-07:
  Draw pins on the path): proposed sequence `where-error-comes-from` on card 1's hot-water chain (63.2 °C, NTC 10 kΩ
  B 3950, divider to 3.3 V), five units: (1) four categories ¶0; (2) theoretical ¶1, the NTC curve vs a straight line
  fitted over 0 … 50 °C (within ±2 °C there, reads 55.9 °C at 63.2: −7.3 °C, computed in Node); (3) static ¶2–3, 3a reading
  (analog meter: parallax, interpolation, broad pointer), 3b environmental, 3c characteristic (one transfer curve through
  offset, gain, linearity, hysteresis, resolution); (4) dynamic + insertion ¶4 + S6 (probe lag on changing water; cold probe
  takes 0.49 °C from 50 mL); (5) the error map ¶5 + S7 (the spec's pins, the last digit wandering). Questions: the base,
  3a's instrument, 3b's influence, dynamic's pin (PLAN: ADC 070 only), the hot plate's knob as the input, stills first.
  Waiting for direction.
- 2026-10-10: owner: "proceed" (card 7's brief, its recommendations; Q4 had none: the PLAN's single dynamic pin kept).
  Card 7's stills built (v0.1.0; README bench-work/libraries/where-error-comes-from/README.md): kit master
  libraries/source-kit/srckit.js (+ manifests.py, EN + FR); units four-kinds (1), theoretical-error (2), reading-error (3a),
  environmental-error (3b), characteristic-error (3c), dynamic-and-insertion (4a, 4b), error-map (5); sequence
  where-error-comes-from (shared waterT). Inputs: hot plate dial (waterT 30 … 100 °C), the eye (eyeAngle), the probe slid
  in its clamp (immersion) and the desk fan's switch (draught). Numbers recomputed in Node (README "Numbers"). Departure
  reported: 3b shows heat leaking up the sheath into the room's air (−1.2 °C at 8 mm; draught −2.35), not the brief's mains
  pickup (computed: a few mV of 50 Hz at a 1.8 kΩ divider, filtered and averaged away). Checked: 8 views EN + FR, no
  errors/NaN/undefined, drags on dial, eye, probe and the fan's tap. Stills shots/en-*, fr-*, contact sheets sent.
  Next: the owner's comments on the stills, then the motion brief.
- 2026-10-10: owner: the six gates as first-class requirements for every animation (realism ≥ 95 %, science 100 %, maths
  100 %, visualization/intuition 100 %, consistency and coherence, professional design), then "proceed"; mid-turn: put
  them in the local files loaded every session. Done: memory first-class-requirements; .claude/standards/six-gates.md; a
  standing rule in CLAUDE.md. Card 7 stills put through the gates (v0.2.0; README "The six gates"): 4a/4b recomputed on the
  drawn mug (≈ 225 mL + 250 g glass; 4a +6.0 °C at 5 s; 4b −0.06 °C, below the last digit, against −2.72 in a 5 mL vial),
  beaker to scale, hot plate off in 4a/4b, block 2's B-model wording and display coherent with card 1, plate readout to a
  tenth, desk fan redrawn, FR panels wrap. Checked EN + FR, no errors/NaN, controls dragged. Stills + sheets sent; card 7's
  motion brief sent. Waiting for direction on the motion.
- 2026-10-10 (new session): owner: "proceed with all your recommendations and render the live animation for me in browser"
  (card 7's motion brief: 4a at time × 2 labelled; 3b lift-then-fan automatic on Play, clamp and switch the presenter's
  after; block 2's warm-up from 30 °C; film + key frames after). Building card 7's motion.
- 2026-10-10: card 7 motion built (v0.3.0; README "Motion"): every view arrives at its first frame and plays its motion; hand
  takeover without a jump (DINKIT onHand, new); 2 warm-up 30 → 63.2 (time-lapse) with lines drawn in first (owner); 3a parallax
  rebuilt as what the eye sees + seen from above with a real head (owner: "far from real … not acceptable"); 3b lift then fan
  (60.8, not the brief's 60.9: rounding of 60.8495); 3c term-by-term build; 4a time × 2, a real tilt-and-pour from the mug's left
  rim (owner: "the cup is clipped"; rig moved to QX 330, reach ≥ 29 px inside); 4b time × 8; 5 pins grow. Owner mid-session:
  labels never cross (fixed 3a, 3b, 4a, 4b; memory labels-never-cross), ADC → MCU signal and cable/trace alignment (srckit),
  "where the four kinds are found" withdrawn by the owner. Checked: node --check; 8 views × every 0.25 s EN + FR clean; real
  drags (dial, head, clamp, fan). Stills, key frames, strip, contact sheets in shots/; film recording. Next: owner's verdict.
- 2026-10-10 (same session, later): v0.3.1 on the owner's running requests: view 2 lines drawn in and dots from 0 °C (iced
  water, plate off → on), equal model cards, plate tag under it; 3a to the owner's reference render (bezel, nameplate, badge,
  60/70, amber numbers); 3b realism to scale (fan, retort stand, clamp, readout on the bench, card 1's probe, thermal view
  legend, model air length = drawn sheath); 3c to the owner's render (term colours, layout); 4a real beaker + gloved hand + jet
  + ripples, true tilted-cylinder volume; two-colour headings. Full six-gate review table in the README. Checked EN + FR clean,
  captures reviewed. Film re-recorded. Next: the owner's verdict on card 7's motion; then card 8 (the Figure card).
- 2026-10-10 (new session): owner: "proceed" (card 7's motion v0.3.1 taken as accepted; its film, contact sheets and strip
  sent). Card 8's brief sent ("Reading a meter's specification", 3.0 min, spec D1-020-08: Equation + the Figure card):
  proposed sequence `meter-specification`, five units: (1) the question ¶0–1 (the handheld on 2 V reading 1.000 V, its
  spec line); (2) two errors ¶2–4 (2a 0.5 % of reading = 5 mV, scales; 2b the last digit, 1 count = 1 mV, × 3 = 3 mV,
  fixed); (3) the band ¶5 (±8 mV, 0.992 … 1.008 V on a mV scale, no true value shown); (4) down the range ¶6 (the knob to
  0.100 V: ±3.5 mV, 3.5 %; the curve u(V) drawn 0.05 … 1.999 V; then the 200 mV range: ±0.8 mV, 0.8 %); (5) whose band ¶7
  + S36 (a marker for "your MCU's reading" dragged against the band). Plus (6) the Figure card's tour (face + spec page).
  Found: the spec's meter (manual dial 200 mV … 600 V) differs from the course's handheld (cards 3–5: dinkit `dmm`, ranges
  on the RANGE key, mV dial position, "2000 counts" in the kit comment, bargraph scaled to 20 V on every range).
  Questions: which meter, the input (bench supply knob recommended), the graph inside the animation, ¶7's MCU, the Figure
  card's text (drafted for the owner, not written into en.md), the term colours, stills first. Waiting for direction.
- 2026-10-10: owner: "proceed with all your recommendations" (card 8: the course's handheld, bargraph per range and 1999
  counts made to agree; the bench supply's knob as the input; the graph drawn inside unit 4; ¶7 a draggable "your MCU's
  reading" marker; the Figure card's text drafted for the owner, not written into en.md; % green, counts coral; stills
  first). Building card 8's stills.
- 2026-10-10: card 8's stills built (v0.1.0; README bench-work/libraries/meter-specification/README.md): kit master
  libraries/spec-kit/speckit.js (+ manifests.py, EN + FR); units spec-question (1), two-errors (2a, 2b), the-band (3),
  down-the-range (4a, 4b), whose-band (5); sequence meter-specification (shared supplyV, meterRange); the Figure card as its
  own library handheld-meter (4 tour stops; its card text drafted in its README, not in en.md). Numbers recomputed in Node
  (±8 mV 0.8 %; ±3.5 mV 3.5 %; 200 mV range ±0.8 mV 0.8 %; graph ends 6.5 % / 0.65 %). Realism: the 3½-digit glass shows
  " .100" (blank half digit) on 2 V; 2.5 conversions/s; OL and off-scale handled in every block. dinkit master: dmm fn
  (dial), mV unit size, dmmReading rng, panel wraps on plain spaces (nbsp holds FR ? :). Found, not changed: card 4's RANGE
  cycles without 600 V. Checked: 272 frames EN + FR clean; real drags (knob → OL, RANGE → 20 V, dial → mV, pin). Stills,
  key frames, sheets sent. Next: the owner's comments on the stills and the Figure card's draft text, then card 8's motion
  brief.
- 2026-10-10: owner: Autoplay as a toggle among the bench's control buttons. Done (bench.js v20; v19 + index archived in
  libraries/_archive/; README "Autoplay in the transport"): the transport's last button after Next, set apart by a rule (a
  switch with a play mark: grey off, violet on), aria-pressed, a state-first tooltip EN/FR; removed from the bottom bar
  (frees the FR rail's last label); key A, ?autoplay=1, ab-autoplay unchanged; language switch moved to right 346 px.
  Checked: click, A, arrival plays when on, both bars captured. Card 8 still waits for the owner's comments on its stills.
- 2026-10-10 (new session): owner: "proceed" (card 8's stills v0.1.0 and the Figure card's draft text taken as seen; the
  draft stays out of en.md until the owner says to write it). Card 8's motion brief sent: today's Play motions run 3.6 … 7.4 s,
  the Flow's paragraphs 6 … 24 s spoken (word counts at 140 wpm: ¶0 12.9, ¶2 6.4, ¶3 6.0, ¶4 15.0, ¶5 9.4, ¶6 24.0 (4a ≈ 14,
  4b ≈ 9.5), ¶7 16.7; 90 s in all, inside the spec's 1.7 min on the bench). Proposed: each view paced to its sentence, beats
  on the words; everything in real time (no time-lapse: 2.5 conversions/s is the meter's own); 4a's 8.1° knob turn shown in a
  zoom inset of the knob with its arc, a hand's fingers on it; 4b the dial likewise; 5's pin timed to ¶7's last sentence; the
  Figure card stepped by the presenter (spotlight eases in), no autoplay across its stops; film + key frames after.
  Waiting for direction.
- 2026-10-10: owner: "proceed with all your recommendations" (card 8's motion brief), "dont forget the 6 gates". Card 8 v0.2.0
  motion built (README bench-work/libraries/meter-specification/README.md "Motion"): every view paced to its Flow paragraph
  (beats on the words; 12.9 / 12.8 / 15.4 / 9.6 / 14.6 / 9.6 / 16.9 s, 92 s in all); 4a's 8.1° knob turn and 4b's dial
  shown in an enlarged window; 4a's parts lit as named; 4b draws the rest of the 2 V range on "the counts dominate". Kits:
  speckit detail(), labelBox, specLine pieces (o.only), bars glow, specPage cell; dinkit panel rows with ids. A drawn SVG
  hand was tried twice and failed gate 1 (archived libraries/_archive/card8-hand-attempt/). Owner mid-turn: a reference
  render of 4a ("refinement"), taken: callout box + leader, yellow ring + turn arrows on the control, signed counts, boxed
  band label (share in cyan), ▲ reading mark, framed graph; the reference's errors named in the README (not copied). Owner
  then: "image of the hand you can use": the image is not on disk; asked the owner to save it as
  bench-work/libraries/spec-kit/assets/hand-knob.png. Checked: node --check; 7 views × 0.25 s EN + FR clean; captures.
  Next: when the file lands, cut the hand out (white ground, its knob, the fingertips' yellow glow), place it on 4a's knob
  (and 4b's dial if it fits), re-check the gates, film + key frames + contact sheets, send.
- 2026-10-10: owner, on the two questions: "keep the course supply" (one VOLTAGE knob, not the reference's COARSE/FINE),
  "keep that" (each view's own heading colour). Recorded in DECISIONS.md and the card's README. Still waiting for the hand
  image file (bench-work/libraries/spec-kit/assets/hand-knob.png).
- 2026-10-10: owner: "I saved the hand image, proceed" (it was not on disk: read off the clipboard into
  bench-work/libraries/spec-kit/assets/hand-knob.png). Hand built (spec-kit/prep_hand.py: ground and the image's knob cut
  away, pad glow tinted back to skin, pads drawn in to our 21 mm knob / 42 mm dial at the rig's scale 0.55, back + front
  layers with the control between); 4a a right hand on the VOLTAGE knob, 4b a left (mirrored) hand on the dial; the yellow
  ring under the fingers. Fixed: the control between the layers had slid with the hand. Checked: node --check; 7 views ×
  0.25 s EN + FR clean, no console errors; captures (settled ends EN/FR, beats, hand in/turn/out) and contact sheets in
  meter-specification/shots/v0.2/; film card8-motion.webp. README "Motion" (hand section) and memory hand-on-turned-controls
  updated. Next: send the film, sheets and key frames; the owner's verdict on card 8's motion; then card 9 (Stacking
  tolerances along the chain) per lecture order.

- 2026-10-10 (new session): owner: "proceed to card 9", then mid-turn "make sure to load the gates to meet all requirements"
  (six-gates.md read; the brief plans each gate). Card 8 v0.2's film, sheets and key frames sent (the last session had not).
  Card 9's brief sent ("Stacking tolerances along the chain", spec D1-020-09; Flow ¶0 26 w, ¶1 62, ¶2 31, ¶3 94, ¶5 26,
  ¶6 56): proposed sequence `error-budget` on card 7's hot-water chain (63.2 °C, 0.5997 V at the divider): (1) the
  contributions pinned on the parts ¶0; (2) worst case ¶1, four arrows end to end on one % ruler, ±3.0 % → the display
  reads 62.2 / 64.3 °C (−1.04 / +1.07 °C, Node); (3) the budget ¶2, a purpose window shared out; (4) RSS ¶3: 4a arrows at
  right angles (0.5 → 1.118 → 1.500 → 1.581), 4b 1000 assembled instruments, uniform within each allowance (illustrative):
  91.7 % inside ±1.58 %, 0.13 % beyond ±2.5 %; (5) the stages added ¶4 (gap 0 / 0.38 / 1.00 / 1.42), RSS of stage 4
  held as "?" for the numeric, revealed in 5b; (6) keep the budget ¶5 + S5; (7) hand-off to the sensor ¶6. Findings: the
  reference term cancels if the divider and the ADC share one 3.3 V (D1·090's ratiometric) → recommend the ADC on its own
  internal reference (inside its ±0.5 % gain) and the 3.3 V feeding the divider as "the reference ±1 %"; the % are
  allowances referred to the divider's output (the 10 kΩ ±1 % gives 0.82 % at 63.2 °C, inside its allowance); the spec's
  "card 1's 100 kΩ pair" does not match the course chain (NTC + one 10 kΩ). Questions: Q1 reference, Q2 allowances
  referred to the reading + °C, Q3 the purpose's window (±1 °C recommended: worst case just over, RSS inside), Q4 both RSS
  pictures, Q5 the numeric's hold, Q6 the hand-off view, Q7 stills first. Waiting for direction.
- 2026-10-10: owner: "proceed with all your recommendations" (card 9's brief, Q1–Q7). Card 9's stills built (v0.1.0; README
  bench-work/libraries/error-budget/README.md): kit master libraries/budget-kit/budkit.js (+ manifests.py, EN + FR); units
  error-contributions (1), worst-case (2), budget-window (3), root-sum-squares (4a, 4b), stages-added (5a, 5b),
  keep-the-budget (6), to-the-sensor (7); sequence error-budget (shared eS eD eR eA, dragged on the budget sheet in 3).
  Departures reported: ¶3 shown on two terms (divider + reference: 2.0 % vs 1.41 %) so the four-term RSS stays the
  numeric's (asked 5a, revealed 5b with the 1000 instruments: 902 inside ±1.58 %); worst case in °C −1.03 (not −1.04).
  Spec D1-020-09 §8 corrected (no "card 1's 100 kΩ pair"); DECISIONS row. Six gates in the README. Checked: node --check;
  9 views × 0.25 s EN + FR (1262 frames) clean; real drag (divider → 0.3 %) and extremes walked. Stills + contact sheets
  sent. Next: the owner's comments, then card 9's motion brief.
- 2026-10-10: owner: "review one last time then do any refinement needed before we go to the next session". Final pass on
  every view EN + FR: fixed view 2's "+3 %" label crossed by the window and worst-case lines (labels on a dark ground over
  them), 63.2 labelled on the °C scale, view 1's divider leader off the resistor's bands. Stills and contact sheets
  re-shot; walk re-run (1262 frames EN + FR, clean; no console errors). Card 9 v0.1.0 stills stand. Next session: the
  owner's comments on the stills, then card 9's motion brief (pacing to the Flow; 5a to the presenter's words; the
  instruments falling in; ¶6's "remember the eye", not yet shown).
- 2026-10-10 (new session): owner: "proceed" (card 9's stills v0.1.0 taken as seen). Card 9's motion brief sent. The first
  pass is already timed to the Flow at 140 words a minute (¶0 11.1 s, ¶1 26.6, ¶2 13.3, ¶3 40.3 = 4a 19.4 + 4b 20.9, 5a 19.0
  unscripted, 5b 8.6, ¶5 11.1, ¶6 24.0; 154 s in all). Proposed: (1) the tags drawn out from their parts, each sign flicking
  + / − on "random"; (2) the arrows stacked end to end, each worst case's end dropped to the °C scale; (3) each allowance set
  on the sheet, its share sliding into the window, the total counting up, the overflow hatched; (4a) the reference turned
  90° from lined-up to at right angles, the two unit squares cut on their diagonals into the √2 square (a true dissection
  at 1 % = 1 %, a fade when they differ), the hypotenuse laid down on the % scale beside 2.0; (4b) the first five
  instruments built slowly (their two errors as arrows, partly cancelling, the ball dropped at the sum), then the rest
  faster to 1000; (5a) a stage every 4.2 s, worst case stacked as in 2, RSS grown by a small right triangle as in 4a, the
  gap counting; "?" with no ghost band; (5b) the arithmetic term by term, the four-part instruments falling fast;
  (6) the RSS row written in, the KEPT stamp, Day 2's mark; (7) the eye (eye-to-brain-2d) small beside the probe on
  "Remember the eye". Questions Q1–Q6 in the brief. Waiting for direction.
- 2026-10-10: owner: "proceed with all your recommendations" (card 9's motion brief, Q1–Q6). Card 9 v0.2.0 motion built
  (README bench-work/libraries/error-budget/README.md "Motion"): every brief item built; 4a's dissection exact (pieces
  checked landing on the hypotenuse square's centre and corners), fade fallback for unequal legs; 7's eye made by
  budget-kit/make_eye.py from D1·010's 2D eye (label-free, the jar's word SUGAR / SUCRE written by the unit). Kit: stageTag
  noVal, budgetSheet wcNow/verdict and row-then-knob, arrowBar below; manifests copy img assets. Fixed on the way: 4b's line
  adds as written (−0.38 − 0.55 = −0.93), 4a's 1 + 1 = 2 off the seams, 5a's joined band, 4a's short-arrow label under
  its bracket, 4b's line room, 6's ring clear of its words (owner mid-turn: "dont forget the 6 gate rules": the README's
  six-gate review covers the motion). Checked: node --check; 1262 frames EN + FR clean (re-run after each fix); real drag mid-play
  (view 3 divider → ±0.3 %, all followed; 4a fallback 1.3 / 1.04); Reset. Shots in error-budget/shots/v0.2/ (settled EN/FR,
  contact sheets, beat-key-frames.jpg, kf-*), film card9-motion.webp (1908 frames, 12.7 MB); all sent. Next: the owner's verdict; card 9 is D1·020's last
  card, so then U037's close (acceptance criteria; only card 3's PLAN widget, the Electronics bridge, is deferred:
  card 3's demonstration `direct-indirect-null` was built and accepted 2026-10-08/09).
- 2026-10-10: owner: "bring up card 3 again before we continue". Card 3 audited live against the six gates and the rules
  made after it (fresh captures in the session scratchpad; walk 1220 frames EN + FR clean once base64 image data is
  stripped from the check). Found: (A) the settled frame (stills, reduced motion) is not the end of Play: 1a/1b supplies
  caught mid power-up (0.80 V / 0.00 V; Play ends right, 5.10 V / 0.243 A), 4a shows the demo's start (720 °C: 154.4 /
  672) not its end (750: 160.0 / 700), 4b "— / —" while the caption says 120 / 80 (Play ends 120 / 80); (B) first
  frames give the answer: 2a (V = 5.1x V), 2b (L = 412 mm), 3a (V = 2.4x V); (C) panels copy the glass's wander: 2a
  "V = 5.11 V", 3a/3b "2.44 V" against captions 5.10 / 2.43; (D) the supplies replay their power-up on arrival (1b's
  first frame 4.30 V); (E) README's furnace default (750) is Play's end, its first frame is 720. Checked fine: 2b's rod
  end reads 411.7 mm on the zoom's scale (412), the 0.70 A limit is in, 5a/5b. Brief sent with Q1–Q5 (a six-gate pass
  with A–E; first frames = set-up + question; panels quote the settled reading; supplies already on; FR + film after).
  Waiting for direction.
- 2026-10-10: owner, mid-turn: (1) speed is a bench control → moved into the transport; (2) the language switch must hide
  when the bench is hosted by the main app; (3) why I said card 3 "stays deferred" (my error: only its PLAN widget is
  deferred; acknowledged; memory electronics-bench-in-development clarified). Done: bench.js v21 (v20 + index archived in
  libraries/_archive/): Speed pill in the transport's mode group before Autoplay (1× grey, 2× / 0.5× amber; i18n speedNow,
  speedHow); hosted = ?host=<app>, a { type: 'bench:lang', lang } message, or AnimationBench.setLanguage(l): EN | FR hides,
  the host's language rules; standalone unchanged. Checked: real click (2× → 0.5× → 1×), ?host=insight&lang=fr hides and
  opens FR, message → EN, setLanguage → FR; captures shots/v21-top-bar.png. README "Speed in the transport"; memories
  player-controls-are-the-bench, languages-follow-the-parent-app. Card 3's brief (above) sent with the answer. Waiting for
  direction on card 3 (Q1–Q5) and the verdict on card 9's motion.
- 2026-10-10: owner: animations must hold on any screen (compact laptops as the parent defines them; then students on
  phones/tablets), then: "for now our focus is on the lecture so lets pause on that … when we actually start working on
  benches, we will consider all these." Research done (parent app's screen classes; our §9/C6 rules) and parked in memory
  screens-and-devices-parked; the device measuring run stopped. Still waiting: card 3's direction (Q1–Q5) and the verdict
  on card 9's motion.
- 2026-10-10: owner: "continue with card 10", then chose "D1·030 card 1" (U037 closed, card 9's motion v0.2.0 taken as
  accepted). Unit closed.

## Handoff notes

**What changed.** All nine cards of D1·020 have a demonstration in the Animation Bench (`bench-work/prototypes/
animation-bench/`, bench.js v21), each a sequence library of unit libraries in `bench-work/libraries/` (cards 1–9:
`measurand`, `objectivity`, `direct-indirect-null`, `error-not-mistake`, `accuracy-precision`, `repeatable-not-right`,
`where-error-comes-from`, `meter-specification` + the Figure card, `error-budget`), EN + FR, each with a README and its
six-gate review. Kits (`measurand-kit`, `accuracy-kit`, `error-kit`, `spec-kit`, `budget-kit`, `source-kit`…) are masters
copied into their units. The bench gained Speed in the transport and hides EN | FR when hosted (`?host=`).

**Decisions** are in DECISIONS.md (2026-10-08 to 2026-10-10) and in the memories made during the unit (one block at a
time, views arrive at their first frame, drawing and numbers agree, labels never cross, glass reads as made, hand on
turned controls, the six gates, languages follow the parent app, …).

**Open, carried to U038:**
- Card 3 (`direct-indirect-null`): the six-gate audit's A–E (settled frame ≠ end of Play in 1a/1b, 4a, 4b; first frames
  that give the answer in 2a, 2b, 3a; panels copying the glass's wander; supplies replaying power-up; README's furnace
  default) and the brief's Q1–Q5, no direction yet.
- Card 8's Figure card text was drafted for the owner, not written into en.md.
- D1·010 cards 5–7 still have no built demonstration.
- Screens and devices parked until bench work (memory `screens-and-devices-parked`).

**Next unit (U038):** D1·030 Sensing, card by card in lecture order, starting with card 1's brief. U012's specs
(cards 1–4, 9) are the start; their §14 questions were never answered.

