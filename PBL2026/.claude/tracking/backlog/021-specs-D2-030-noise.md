---
id: U021
title: Bench specs for D2·030 — Noise: thermal, coupled and self-inflicted
status: not-started
depends_on: [U002, U003]
refs:
  - .claude/standards/bench-spec-template.md
  - .claude/standards/bench-quality-bar.md
  - .claude/standards/authoring-digest.md
  - notes/Day02/030-noise/en.md
  - elements-by-section.md
---

## Goal

Write one spec in `bench-work/specs/` for every card of D2·030 (35 min) that shows a bench, so each
activity can be built straight from its file when its bench is ready.

Elements in this module (from elements-by-section.md): Predict–observe–explain ×4, Equation Bench ×3, Coding Bench ×2, Numeric answer ×2, Electronics Bench ×2, Circuit predict ×1.

## Acceptance criteria

- [ ] **Accuracy (blocking):** check A1–A7 of `.claude/standards/course-accuracy.md` run on the module before the brief and on everything produced; results in `tracking/ACCURACY.md`; **no open accuracy finding** on this module.
- [ ] One spec per bench card, in the template's shape, named `D<day>-<module>-<card>-<slug>.md`.
- [ ] Each spec gives the minutes on the bench, inside the module's budget, and says where they come from.
- [ ] Each spec meets the quality bar: real values and units, the faithfulness checklist filled, the four views named.
- [ ] Each spec's steps follow the card's Flow paragraph by paragraph; nothing in the owner's text is trimmed or reworded.
- [ ] `bench-work/README.md` lists every new spec with bench, minutes and status.

## Out of scope

Building any bench or asset. Changing the owner's card text or Flow (report anything that looks wrong).
