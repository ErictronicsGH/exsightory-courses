---
id: U019
title: Bench specs for D2·010 — The code leaves the converter: open-drain, pull-ups and I²C
status: done
depends_on: [U002, U003]
refs:
  - .claude/standards/bench-spec-template.md
  - .claude/standards/bench-quality-bar.md
  - .claude/standards/authoring-digest.md
  - notes/Day02/010-digital-interfaces/en.md
  - elements-by-section.md
---

## Goal

Write one spec in `bench-work/specs/` for every card of D2·010 (30 min) that shows a bench, so each
activity can be built straight from its file when its bench is ready.

Elements in this module (from elements-by-section.md): Predict–observe–explain ×5, Electronics Bench ×4, Figure Bench ×2, Poll ×2, Plot Bench ×2, Draw Bench ×1, Multi-select ×1, Analogy ×1, Numeric answer ×1, Checkpoint ×1.

## Acceptance criteria

- [x] **Accuracy (blocking):** check A1–A7 of `.claude/standards/course-accuracy.md` run on the module before the brief and on everything produced; results in `tracking/ACCURACY.md`; **no open accuracy finding** on this module.
- [x] One spec per bench card, in the template's shape, named `D<day>-<module>-<card>-<slug>.md`.
- [x] Each spec gives the minutes on the bench, inside the module's budget, and says where they come from. (The module runs ≈ 31.7 of 30 min: reported, D5, owner cuts; nothing trimmed.)
- [x] Each spec meets the quality bar: real values and units, the faithfulness checklist filled, the four views named.
- [x] Each spec's steps follow the card's Flow paragraph by paragraph; nothing in the owner's text is trimmed or reworded.
- [x] `bench-work/README.md` lists every new spec with bench, minutes and status.

## Out of scope

Building any bench or asset. Changing the owner's card text or Flow (report anything that looks wrong).

## Progress

- 2026-10-20: loaded after U018 (U016 still parked on crossing 505). Start: list crossings from the worktree
  (510–512 are ours, open); run the accuracy check A1–A7 on D2·010 (watch *"this morning"*: DAY23-F1), then brief the
  owner as `bench-work/previews/u019-preview.html` and wait for design direction.
- 2026-10-20: crossings listed from the worktree (none to pbl2026; ours 510–512 open). Accuracy check A1–A7 on D2·010:
  five findings **open** (F1 card 3: wired straight the pin sits at 4.03 V, not "about 3.3 V", 20.6 mA into a rail that
  must have a load; Studio's 1N4148 profile is a max envelope giving 14.3 mA; F2 card 5 "sits between" vs its FAULT;
  F3 card 1 assumes a separate ADC chip; F4 the centrepiece's 300 ns marker measured from release (1.77 kΩ crosses 70 %
  at 426 ns); F5 swapped divider 1.66 V, not 1.67). Brief page `bench-work/previews/u019-preview.html` (all ten cards
  live, N1 ESP32 named, N2 duplicate demo numbers, N3 spoken vs drawn path, D1 Electronics cards 3/5/6/8 as one
  Animation library by Benches, D2 benches, D3 card 9 wiring Figure, D4 the Equation beside the Plot, D5 overrun).
  Flow 2,626 words (20.2 min); module ≈ 33 of 30 min. **Next:** read the owner's choices (`u019Feedback()`), apply to
  `en.md`, re-check, write the specs.
- 2026-10-20: owner *"apply all recommendations"*: F1–F5, N1 (no ESP32 on the teaching surface), N2 (demo numbers
  dropped) applied to `en.md` (and card 7's formula in `elements-by-section.md`), re-checked; register clear. Ten specs
  being written by three agents: cards 1, 2, 4, 9 (Draw, Figures); 7, 10 (the centrepiece, holds the module table);
  3, 5, 6, 8 (one Animation library by Benches, crossing draft in the scratchpad).
- 2026-10-20: all ten specs written (`bench-work/specs/D2-010-01` … `10`, README rows added); one module table in
  `D2-010-07` §2b, reconciled: ≈ 31.6 of 30 min. The specs raised **D2·010-F6 – F11** (open): F6 card 5's meter swap
  (a 10 GΩ meter does not read 0 V); F7 card 7's "ten times" (0.4 V held); F8 "only sink 3 mA" (6 mA at 0.6 V);
  F9 card 10's transition; F10 card 2's "two-way, or bidirectional"; F11 card 4's SPI "defines bit ordering". Round two
  on the U019 page (*specs*: F6–F11, C1–C10, X). Our brief's card 8 truth table fixed (1 = lets go). Crossing draft for
  `logic-io` in the scratchpad (`crossing-d2-010-logic-io.request.md`). **Next:** read round two, apply, update the
  specs' §14 and statuses, write and push the crossings.
- 2026-10-20: owner *"apply all recommendations"* (round two). Applied to `en.md`: F6 (card 5 Look for *"Swap in another
  10 MΩ meter…"*), F9 (card 10 transition *"So far, in the course's own example, …"*), F10 (card 2 bullet 8), F11 (card 4
  p9); the demo cues of cards 5, 6, 8 to *"Animation Bench"*; card 7's Flow split into five fences and card 10's
  transition into its own fence after the checkpoint (no word changed); card 7's PLAN SHOW and poe reveal say what is
  built. F7, F8: the Flow unchanged, the bench states the model. `transcript.en.md` synced (it still had the ESP32,
  card 7's pre-F4 formula and the old transition). All ten specs **spec-ready**; register clear on D2·010. Crossings
  **516** (`logic-io`, cards 3, 5, 6, 8), **517** (course-path D2·010 variant, on 511), **518** (Figure cumulative tour;
  card 8's c1–c2 a second user), **519** (Plot gauge + curve domain, cards 7, 10) pushed. Studio's X22 (an activity
  that keeps the Canvas) and X23 (two blocks side by side) added to `requests-to-exsight.md` for the owner to route.
  Module ≈ 31.7 of 30 min (Flow 2,663 words).

## Handoff notes

- **What changed.** D2·010's accuracy check found F1–F5 before the brief and F6–F11 while writing the specs; all decided on
  the recommendations (two rounds) and applied to `notes/Day02/010-digital-interfaces/en.md`, re-checked. Specs
  `D2-010-01` (Draw, the course path's D2·010 variant: 517 on 511), `-02` (Figure, nine agreements, cumulative tour: 518),
  `-03` (Animation by Benches, **designs the `logic-io` library**: 516), `-04` (Figure, SPI mode 0, 182/109; sources
  confirmed: Analog Dialogue 52-09, Motorola S12SPIV2), `-05`, `-06` (`logic-io`), `-07` (Plot + Equation centrepiece;
  **holds the module table**: ≈ 31.7 of 30 min; 519), `-08` (four-block sequence A → B → C → A′), `-09` (Figure, SPI vs I²C
  wiring, real classes and addresses), `-10` (card 7's plot B copied). Brief page `bench-work/previews/u019-preview.html`,
  both rounds decided.
- **Deviations.** Our own slips fixed before sending: card 8's truth table convention (1 = lets go), card 8's 16 mA-point
  contention 53.1 mA (not 52.8), card 9's address highlight colour (orange, not card 4's clock violet), card 7's UM10204
  table (Table 10, not 9) and §2a sum. The script panel had drifted from `en.md` since round one: check it on every
  module from now on. Card 3's new OPEN position shows the meter holding the pin at 4 mV (card 5's mechanism appearing
  early, true, unspoken). Card 6's spec departs from the PLAN's `mosfet-typical` and V2 (stated in its §1).
- **Still to confirm (not blocking).** Spec 03's R1 47 Ω against a named 5 V CMOS output datasheet; spec 04's
  "SPI clock 1–20 MHz" has no source (not on a teaching surface); card 7's R_p(min) is 0.967 kΩ at exactly 3.3 V,
  UM10204 sizes it at the supply's maximum (1.067 kΩ at 3.6 V): the Flow's "about 1 kΩ" holds either way. The authoring
  notes for card 7's plot B and card 10's copy (spec 07 §3a, spec 10 §3) go into `en.md` when the plot blocks are written.
- **For the next units.** X12 and X13 (Plot presets, moving markers) are now named by D1·020, D1·090 and D2·010: raise them
  together in one crossing when a module needs them on the wall. U016 stays parked on crossing 505. U020's title names
  products (ADS1115, INA226): the accuracy check should treat that under *real but unbranded*.
