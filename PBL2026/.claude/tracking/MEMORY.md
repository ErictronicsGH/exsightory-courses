---
id: U019
title: Bench specs for D2·010 — The code leaves the converter: open-drain, pull-ups and I²C
status: in-progress
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

- [ ] **Accuracy (blocking):** check A1–A7 of `.claude/standards/course-accuracy.md` run on the module before the brief and on everything produced; results in `tracking/ACCURACY.md`; **no open accuracy finding** on this module.
- [ ] One spec per bench card, in the template's shape, named `D<day>-<module>-<card>-<slug>.md`.
- [ ] Each spec gives the minutes on the bench, inside the module's budget, and says where they come from.
- [ ] Each spec meets the quality bar: real values and units, the faithfulness checklist filled, the four views named.
- [ ] Each spec's steps follow the card's Flow paragraph by paragraph; nothing in the owner's text is trimmed or reworded.
- [ ] `bench-work/README.md` lists every new spec with bench, minutes and status.

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
