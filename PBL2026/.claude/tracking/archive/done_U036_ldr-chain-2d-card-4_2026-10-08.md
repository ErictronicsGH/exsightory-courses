---
id: U036
title: The LDR chain animation, D1·010 card 4 — eye still intro, zoomed steps, Explore (the cell, the lamp, the films)
status: done
depends_on: [U035]
refs:
  - bench-work/prototypes/ldr-chain-2d/app/README.md
  - .claude/memory/eye-intro-then-electronics-zoom.md · animation-player-controls.md · animation-follows-the-flow.md · controls-built-into-the-hardware.md
---

## Goal

D1·010 card 4's demonstration as a running 2D animation (Animation Bench prototype): the eye's process as a mapped
still, then the measurement chain from light to number, interface by interface, the three places it is spoiled, and
an Explore mode for the LDR's response. Built in lecture order (owner, 2026-10-08), outside the spec units; it was
logged inside U014's slot and is archived here as its own unit.

## Acceptance criteria

- [x] Stops follow the card's Flow paragraph by paragraph (17 stops, p0–p6), the owner's text untouched.
- [x] Every interface shows its real mechanism at real values; the chain's numbers match `make_flow.py`.
- [x] Player: Previous / Play·Stop / Reset / Next, rail, Eye and Cards toggles (cards off by default), speed; Play runs a paragraph.
- [x] Explore: controls built into the lamp and the board; switch, dimmer, tuner (whole spectrum), shade tilt, films, divider swap.
- [x] Smooth (52–60 fps at the stops in the desktop pane), error-free across every stop and Explore state.
- [x] The owner reviewed it ("i love what i am seeing") and said proceed to D1·020.

## Progress

- 2026-10-08: **owner redirected**: build the visualizations in lecture order, every card with a demonstration
  (memory `visualize-every-card-in-lecture-order`). Next in order: D1·010 card 4's electronic half + the course path
  (cards 4–7). Design plan sent; waiting for direction. U014 (D1·050 specs) to be parked when the new unit opens.
- 2026-10-08: owner's direction for card 4's electronic half: the eye's full process as a still on top, an LDR chain
  as a 2D animation below, each stage mapped to its eye twin up to the MCU; still first. Rendered
  `bench-work/prototypes/ldr-chain-2d/still.png` (`make_still.py`, reuses `../eye-to-brain-2d/world.py`; numbers:
  300 lux, 15 kΩ@10 lux, γ 0.70, 2.2 kΩ low side → R 1.39 kΩ, 2.02 V, code 2512, back to 300 lux; RC 1 k/100 n, 1.6 kHz).
  Sent to the owner with 13 planned stops on the rail. Waiting for their verdict before building the animation.
- 2026-10-08: owner: eye band toggles off and hides on Play; Prev/Play-Stop/Next; signal traced; cards toggle off by
  default (memory `animation-player-controls`). Rendered `ldr-chain-2d/focus-cards-off.png` and `focus-cards-on.png`
  (`make_focus.py`, stop 6 playing; signal-trace ribbon; S/H + staircase in the ADC; 12-line bus; firmware fills at
  stop 7). Reviewed: diffuser window, CdS cell, follower + RC, QFP MCU, OLED over I²C. Waiting for the verdict.
- 2026-10-08: owner: each interface as it really happens; stops must follow the Flow. Rebuilt as `ldr-chain-2d/make_flow.py`
  + `panels.py` → `flow/stop-*.png`, `flow-sheet.png` (16 rail stops: 0–3 eye still p0–p3; 4a–4h chain p4 with zoom
  panels: spectrum, photoconduction, divider potential, cable field, filter, SAR, arithmetic, I²C; 5–7 faults on p5's
  three sentences: dusty window 210 lux, 50 Hz hum ±55 mV readings 325/272/331/278/313, firmware 10 kΩ → 34 lux;
  8 both rows p6–p7). Open for the owner: p4 is 25 words (≈ 12 s) for 8 mechanism stops (≈ 20 s at 2.5 s each);
  zoom-panel toggle; whether stops 1–3 here or the eye animation's 9a–9c carry p1–p3.
- 2026-10-08: owner said proceed; built the running animation `bench-work/prototypes/ldr-chain-2d/app/` (README there;
  `export_eye.py` makes the eye still; launch entry `ldr-2d`, port 8767). Owner's direction mid-build (memory
  `eye-intro-then-electronics-zoom`): opening = eye still over the chain, mapped, dashed divider, no eye-side tags;
  Play hides the eye; each step zooms into its zone; new stop 4i = full chain, all signals flowing; stop 8 electronics
  only. 60 fps in the desktop pane. Key frames `app/shots/v4-*`, `v3-4f`, `v3-4i`. Waiting for the owner's verdict.
  Still open: p4 runs ≈ 30 s of motion for ≈ 12 s of words (Play holds nothing back; the presenter can step).
- 2026-10-08: owner: improve the rays from the light to the lens. Now 7 rays radiate from the bulb (point source), spread
  over the window's whole aperture, end on its curved front face (a landing glint each), dim towards the edges; the
  glow cone is bounded by the outer rays and follows the face. Frames `app/shots/rays-4a*.png`. Waiting for the verdict.
- 2026-10-08: owner: fix parts clipped at the base; lamp light in all directions with our LDR's beam highlighted; then
  "more of the light shade with few photons"; Explore (button) with a light switch, intensity and a full-spectrum
  wavelength slider, controls beside the lamp. Done: zones frame parts whole + spotlight; soft pool + shaded beam + few
  photons; `app/explore.js` (lamp card, response panel: spectrum, cell/eye sensitivity, R against lux, divider range).
  Frames `app/shots/z-*`. Proposed next (owner asked what I think): a film-material choice for the cell (CdS, CdSe,
  Si, PbS), each with its own gap and sensitivity curve. Waiting for the go-ahead.
- 2026-10-08: owner approved both and added: controls built into the lamp (realism), light only within the shade's
  angle, the divider swap (darkness detector). Done in `app/explore.js` + `chain.js`: shade on a swivel aimed at the
  sensor (cone-only light), cord switch-dimmer, tuner head (band + tune + display), film selector CdS/CdSe/Si/PbS,
  divider swap with a voltage graph. Owner: "i love what i am seeing". Frames `app/shots/h-*`. Memory
  `controls-built-into-the-hardware`. Next: the owner's verdict, then the next card in lecture order (D1·020).
- 2026-10-08: owner: tune knob seemed dead (WHITE has nothing to tune: the display now says "turn BAND to tune"); tilt the
  light (done as grabbing the shade on its swivel; windowK = beam profile on the window); "LDR" label above the cell;
  motion follows values (photon count with lux, divider drift with current, signal brightness with voltage, film
  panel's photon rate with light; integrated phases so speeds change smoothly); film keys moved clear of GND.
  57–61 fps. Frames `app/shots/t-*`.
- 2026-10-08: owner: refine the lamp's sweep; TUNE unresponsive. Done: shade hangs on a stem + yoke (pivot y 276) and
  swings −60…75° without touching the head; the housing casts a true shadow from the bulb (mask: board + wedge
  behind it); dragging is relative and steady near the swivel; TUNE on WHITE now switches to VISIBLE and sweeps
  (display "TUNE: a colour"). Frames `app/shots/s-*`.
- 2026-10-08: owner: highlight only the light reaching the lens, traced naturally. Done: the beam is a wedge from the
  bulb to the lens's edges, cut by the shade's cone, edges softened (softEdge blur), fading with distance; the lens's
  face glows only where the cone lands. Frames `app/shots/b-*`. Next: the owner's verdict, then D1·020.
- 2026-10-08: review pass before proceeding. Fixed: the window's share now averaged over its whole face (what is lit and
  what the cell gets agree); film panel says "CdS gap 2.4 eV · doped ≈ 1.9 eV"; cards moved onto the trace's nodes;
  marks cross-fade; Reset added (Play / Stop / Reset); dead code removed. Owner withdrew "marks only when triggered":
  marks stay automatic. Verified: numbers, Play sequence, all stops + 11 Explore states error-free. Ready for the
  owner's go to proceed to D1·020.

## Handoff notes

- **Where it is:** `bench-work/prototypes/ldr-chain-2d/app/` (index.html, chain.js, explore.js, app.js, eye-static.js from
  `../export_eye.py`); launch entry `ldr-2d` (port 8767); key frames in `app/shots/`.
- **Patterns set by the owner here, for every later animation:** the analogy only as a mapped still intro; Play gives the
  stage to the system; each step zooms to its zone (parts whole, spotlight); the end shows the whole system running;
  controls are the real object's own; light follows real optics; everything that moves follows the values.
- **Not done:** the bench spec for card 4 (the spec of record is still U010's); the Edit/Authoring views; lecture-laptop
  performance; p4's motion (≈ 30 s) against its words (≈ 12 s) is the owner's to cut, if at all.
- **Capture trap:** the hidden Electron window can show the previous state; call `__bench.at` two or three times before a
  shot, or use `__bench.run(sec)` to step deterministically.
