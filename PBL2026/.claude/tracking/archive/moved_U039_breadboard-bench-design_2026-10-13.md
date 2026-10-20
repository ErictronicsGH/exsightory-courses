---
id: U039
title: Breadboard Bench (M49) design — the room and the bench, then the locked 2D/2.5D cameras, then the controls per surface
status: paused (for U040, 2026-10-11)
depends_on: []
refs:
  - bench-work/breadboard-bench/spec-review.md (the review of the owner's spec; decisions D1–D8 still open)
  - D:\@Projects\2026\InsightDemo\Application\rsrc\xdocs\ExSight_Breadboard_Bench_Implementation_Specification.md (read-only)
  - .claude/standards/bench-design-rules.md · bench-quality-bar.md · six-gates.md
  - .claude/memory/design-direction-before-building.md · prototype-capture.md · research-before-bench-features.md
---

## Goal

Design the Breadboard Bench itself (the platform, not its content), in the owner's order (2026-10-11):
1. the room with a bench, as a 3D prototype;
2. the camera angles standardised and locked as 2D and 2.5D;
3. the controls the bench offers for authoring, presentation and student interaction.

## Acceptance criteria

- [x] Room + bench: design plan sent and directed by the owner, then built as a three.js prototype
      (`bench-work/prototypes/breadboard-bench/`), at real dimensions (mm), passing the six gates; stills sent
      (v0.2–v0.8; tour stops re-checked after the PCB Bench moved). Awaiting the owner's word that the room is accepted.
- [ ] **Loads in ExSight Studio** (owner, 2026-10-11): built to the `canvas` `kind: widget` sandbox (one bundled script, no
      fetch, textures drawn in code, no storage), with a test course beside it; opened and walked in Studio.
      DONE: compiled and run under Studio's exact course CSP in a sandbox="allow-scripts" iframe (passes). NOT DONE:
      opened in the real Studio desktop app.
- [x] Cameras: the 2D (plan) and 2.5D profiles defined with their numbers (projection, elevation, azimuth, field, framing)
      and locked; shown on the prototype; recorded as a standard (04-camera-profiles.md; memory camera-profiles-standard).
      Plus Custom (author sets and locks any angle) and the six-freedom student policy per profile (owner, 2026-10-11).
- [x] Controls: a capability list per surface and view (Authoring; presenting: Preview/View/Edit on the wall and the
      presenter's strip; Study Mode/Scope), researched first, ready for the owner's UI renders.
- [~] Decisions recorded in DECISIONS.md (the 13 control decisions, settled 2026-10-11); the spec review still to be
      updated with what the owner settled (D5 settled; D1–D4, D6–D8 open).

## Out of scope

**No components** (owner: *"do not create any components yets"*): no parts, boards, instruments or wires. No edits in
InsightDemo. The spec review's D1–D8 stay open until the owner takes them up.

## Progress

- 2026-10-11: spec reviewed (bench-work/breadboard-bench/spec-review.md). Owner: *"no this time we are designing the bench
  itself. lets start with creating the room with a bench then we will standardize and define what camera angles will be
  locked as 2D, and 2.5. then the controls of the bench … do not create any components yets."* U038 paused to backlog/038.
  Owner: *"make sure the bench we are creating can be loaded in the studio app"*: Studio's `canvas` widget route checked
  (WidgetViewer.vue sandbox, serving.ts CSP); plan bench-work/breadboard-bench/01-room-and-bench-plan.md (Q1–Q4) sent.
  Next: the room-and-bench design plan to the owner (design-direction-before-building), then build.
- 2026-10-11: owner directed the room plan (ESD bench + riser, whole room, light/dark moods, build from the plan). Built
  bench-work/prototypes/breadboard-bench/ (three.js 0.185.1, one IIFE bench.js, textures drawn in code): room 7.2 × 6.0 × 3.0 m
  (window, door with hinges and vision panel, LED panels, air diffuser, trunking with CEE 7 sockets, light switch), ESD bench
  (laminate + ABS edge, rounded tube frame, levelling feet, mat with stud and earth cord, riser + luminaire, 6-outlet strip,
  lit rocker, cord and plug to the wall), GTAO ambient occlusion + MSAA, env = the room captured twice.
  Owner then asked, mid-build: (1) an Inventor-style view changer → chamfered CSS-3D ViewCube (6 faces, 12 edge facets =
  views between two axes, 8 corners = isometric), Home, adjacent-face arrows, ring, Perspective / Orthographic /
  Perspective-with-ortho-faces; (2) more realism (done as above); (3) axes indicator (bottom-left triad + origin arrows) and the
  TOP OF THE WORKTOP AS THE REFERENCE PLANE (z = 0; dims.js), a fine 1/10/100 mm shader grid (fades by zoom; X axis red, Y
  green), snapping (1 / 2.54 / 5 / 10 mm, Alt = free) with a cursor, alignment guides (axes, mat and worktop edges) and an
  X/Y readout; (4) an LED sign "ExSight Electronics / Laboratory" with Studio's own band mark (BrandMark.vue paths), second
  line centred and larger (owner). (5) Studio: test course studio-course/ compiles with insight-compile (3 widget assets);
  the compiled widget run under Studio's exact CSP + sandbox="allow-scripts" (scratchpad harness): origin null, storage
  blocked, renders, no console errors. Stills: shots/v0.2/. Open: furnishing + virtual tour plan
  (bench-work/breadboard-bench/02-lab-furnishing-and-tour-plan.md, Q1–Q3) sent for direction; locked 2D/2.5D cameras; controls.
- 2026-10-11 (cont.): owner directed plan 02 (essential set, static look-alike instruments, guided stops). Built src/furniture.js
  (+ panels.js, screens.js): instrument cabinet (glass doors, 4 shelves of unbranded scopes/supplies/generators/meters, off),
  component storage (drawer cabinet, 4 small-parts units of 32 labelled drawers, louvred panel with 28 conductive bins),
  soldering station (bench, station, iron + holder, fume-extractor arm and hood, magnifier lamp), low cabinets + binders under
  the window, EPA boundary tape, EPA sign, wrist-strap/footwear tester, ESD smocks, EPO, CO2 extinguisher + sign, first aid,
  rules poster (EN/FR), whiteboard (divider sketch), instructor desk, ESD stools, clock, e-waste bin; bakeStatic merges the
  room and furniture by material. Owner, mid-build: a COMPUTER DESK with multiple monitors (left wall: three lit screens —
  schematic, layout, datasheet — on a triple arm, tower, chair) and a TOP SHELF on the bench for static tools (800 mm: wire-
  spool rack, tool caddy, solder reel, desoldering pump, parts organiser); the TOUR WALKS like a person (eye 1.6 m, 1.1 m/s,
  eased strides, 7 mm footstep bob, looks ahead then turns to the subject; routes round the furniture; dwell after arrival;
  reduced motion = whole). Tour: 8 stops (entrance, tester, safety, storage, cabinet, solder, computer desk, bench); T / ← → /
  Space / Esc. Stills shots/v0.3, v0.4. Studio: recompiled + sandbox run clean (origin null, no errors).
  Open: smocks still read flat; locked 2D/2.5D cameras (step 2); controls per surface (step 3).
- 2026-10-11 (cont. 2): the lab became REUSABLE (owner: benches Electronics, PCB, 3DDev, Coding, Mechatronics now, "almost all
  lab-like benches" later; only the active bench workable, the rest static, every bench signed). Code reorganised: src/lab/
  (lab.js createLab, config.js stations + tour, room, furniture kit, stations/*, sign, lights, tour, walker, footsteps,
  viewcube), src/benches/electronics/ (plugin: grid + snap), src/main.js. Doc: bench-work/breadboard-bench/03-the-reusable-lab.md.
  Also this round (owner, in order): realism (sunlight through the window with wall/ceiling shadows, full-room shadows, bloom,
  deeper AO); a smooth natural tour (walker: minimum-jerk motion, turn-then-walk, head ≤ 60°/s, gait bob/sway) with
  synthesised footsteps (sound switch, M); a loader (ExSight mark assembling, staged bar); realistic static instruments on
  the electronics bench's first shelf (instruments.js); a 3DDev bench (printer + CNC); signs "ExSight Laboratory / <bench>",
  same size, dimmer, only the active lit (others light as they come into view on the tour); a look-around stop at the room's
  centre (16 s turn); the tour continuous (2 s glance per stop; pause eases to a stop, then the place can be explored; drag =
  pause); dark mode = dark-painted room with lights ON (charcoal walls, smooth wall finish, even fill, gentler panels/bloom);
  a Lights panel: room lights on/off/brightness/colour, each bench's light on/off/brightness/colour/pulse. Start-up 24.5 s →
  7.5 s (hidden window): compile in parallel for the off-screen buffer first, then the reflection capture. Studio sandbox
  run clean. Stills shots/v0.5–v0.7. Open: smocks flat; locked 2D/2.5D cameras (step 2); controls per surface (step 3).
- 2026-10-11 (cont. 3): STEP 2, CAMERAS (owner: buttons to test 2D and 2.5D; Custom set-and-lock; 3D degrees of freedom).
  src/lab/cameras.js:
  - profiles 2D (ortho, top-down, section at +250 mm), 2.5D (ortho, 65°), 3D, Custom;
  - each with a Free/Range/Locked policy over turn, tilt, X, Y, Z and zoom, installed on OrbitControls; the target held
    to the box, the view cube held or dimmed;
  - left-drag pans when turning is locked; a chip and the hint say what is locked;
  - the author's panel (C): view sliders, explicit *Save the current view*, the six rows, the profile JSON;
  - bar 2D · 2.5D · 3D · Custom (keys 3–6); frustum-true fit for perspective, 20 % safe area.
  Doc bench-work/breadboard-bench/04-camera-profiles.md.
  Also (owner, mid-turn):
  - area signs (ESD Area, Component Storage, Instrument Cabinet, Safety Point, Teaching Area);
  - wall cards fitted (fitFont; ESD sign redrawn);
  - the PCB Bench rebuilt as the same ESD bench beside the Electronics Bench (green mat, 10 mm gap, no top shelf), with
    the owner's four KiCad captures on a 2×2 wall mount (tools/prep_kicad.py: crop and mask, WebP inlined by esbuild,
    Studio CSP allows data: images);
  - the Coding Bench's screens: backend, frontend and the running app (screens.js);
  - the e-waste bin moved to the back-left corner; the old soldering station removed.
  Naming memory: the room's Electronics Bench is Studio's Breadboard Bench. Stills shots/v0.8 (20–37).
  (Studio check: see cont. 4.)
  Open: smocks flat; whether the 2D section height is the author's; step 3 (controls per surface).
- 2026-10-11 (cont. 4): STUDIO CHECK PASSED on the final build. The test course compiles (3 content-audit warnings on the
  stub course only); the compiled widget runs under Studio's exact course CSP in a sandbox="allow-scripts" iframe from
  another origin. Results: ready in ~12 s, origin "null", localStorage and fetch blocked, no widget console errors, WebGL
  read-back works (the inlined KiCad images do not taint). Harness: the session scratchpad's studio-check.js (Electron, two
  local servers); its recipe is in memory benches-load-in-studio-as-widgets.
  REALISM:
  - smocks rebuilt as hanging garments (body with shoulders, chest and folds, sleeves, knit cuffs, collar);
  - the PCB Bench's computer: a tower, keyboard, mouse and a cable channel; the vise board's printed face now shows.
  2.5D FRONT-DOMINANT (owner: "X-Z plane dominant"): ortho 20°, the working face framed (mat to the instruments' tops).
  Fixed: leaving a profile kept its orthographic projection. Stills shots/v0.8 (40–56).
  Open: whether D1·030's 65° stills follow the new 2.5D; smocks' material could take a finer weave normal map; step 3.
- 2026-10-11 (cont. 5):
  - The PCB Bench re-laid: two monitors low on a dual stand (schematic, layout); its shelf at 600 mm; the hot-air unit
    on the shelf; the extractor moved left; the magnifier parked.
  - The tour starts with the look-around (stop 1 of 11).
  - 2.5D is the owner's own view (perspective 40°, 13.5°, target 130 mm above the mat, field 563 mm).
  - Stills shots/v0.8 (62–66).
  - Step 3 research: 06 (product survey) and 07 (ExSight constraints, conflicts X1–X17) are in; 05 (learning science)
    is running. Next: the capability list, bench-work/breadboard-bench/05-controls-capabilities.md.
- 2026-10-11 (cont. 6):
  - STEP 3 DRAFT WRITTEN: bench-work/breadboard-bench/05-controls-capabilities.md. It holds C1–C78 by group, the
    frame (View, Edit, Authoring), 13 screens to render, sample data (the LDR divider: 2.02 V, code 2512, 202 µA),
    words EN/FR, and 13 decisions for the owner. Research 05, 06 and 07 are in bench-work/research/.
  - PERFORMANCE:
    - static shadow maps;
    - half-resolution ambient occlusion, skipped while moving;
    - reflections re-captured on release;
    - sticky light visibility (no recompiles);
    - a frame 33–38 → ≈ 15 ms.
    - `__bench.perf()` measures it.
  - LIGHTS PANEL: restyled as a device. Presets: white (3 tones), R, G, B, C, M, Y, natural sunlight, and any colour.
  - Studio check re-run on this build (see output).
- 2026-10-11 (cont. 7): the owner settled all 13 control decisions as recommended. Applied in the prototype:
  - pulse ≤ 2 Hz, named colours only (the free colour well removed);
  - one finger does nothing on the stage (two fingers pinch and pan);
  - the tour key T removed.
  The capability list (05) is ready for the owner's ChatGPT renders (§6 screens, §7 data). Next: the renders, then
  build to them. The spec review's D1–D4 and D6–D8 stay open.
- 2026-10-11 (cont. 8, while U040 opened): the owner added to the bench, in order:
  - **Isometric** as a projection beside Perspective and Orthographic (owner: *"the isometrica view should be added to the
    orthogonal, and perspective component"*; first built as a fifth camera profile, then moved): view cube switch and key
    I; the author's camera panel (Custom) too. Orthographic held on a corner (azimuth 45° + k·90°, elevation 35.264°); a
    turn let go glides to the nearest corner; a face or an edge of the cube leaves it for orthographic. Checked live:
    45.000° / 35.264° exactly, corner to corner.
  - **Render** (src/lab/render.js): stills at screen / 1080p / 1440p / 4K in PNG, JPEG or WebP (full quality, the
    interface not in the picture, grid optional); video as a **turntable** (frame-exact: WebCodecs H.264 written to MP4 by
    a built-in writer; about the room's centre by default, owner: *"the center of the room should be used as the
    reference"*, or the target) or a **live** recording (MediaRecorder). Checked: 1920 × 1080 PNG; MP4 1920 × 1080,
    90/90 frames, decodes and seeks, frames distinct. In Studio's sandbox nothing can be saved (the panel says so).
  - **Tidy bar**: four controls (view and camera profile folded to their current state, opening on hover; Grid; Render)
    and an ellipsis that opens on hover or click for the rest.
  - Studio sandbox check NOT re-run on this build.
  - The dial round the view cube built (owner accepted the plan); the tour's speed chip; the look-around's wider,
    lower view on the room's centre (see U040's progress for detail).

