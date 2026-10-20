---
id: U016
title: Bench specs for D1·070 — The ADC input: sample-and-hold and acquisition time
status: in-progress
depends_on: [U002, U003]
refs:
  - .claude/standards/bench-spec-template.md
  - .claude/standards/bench-quality-bar.md
  - .claude/standards/authoring-digest.md
  - notes/Day01/070-adc-input/en.md
  - elements-by-section.md
---

## Goal

Write one spec in `bench-work/specs/` for every card of D1·070 (45 min) that shows a bench, so each
activity can be built straight from its file when its bench is ready.

Elements in this module (from elements-by-section.md): Plot Bench ×4, Predict–observe–explain ×3, Draw Bench ×2, Numeric answer ×2, Equation Bench ×2, Analogy ×1, Electronics Bench ×1, Multi-select ×1.

## Acceptance criteria

- [ ] One spec per bench card, in the template's shape, named `D<day>-<module>-<card>-<slug>.md`.
- [ ] Each spec gives the minutes on the bench, inside the module's budget, and says where they come from.
- [ ] Each spec meets the quality bar: real values and units, the faithfulness checklist filled, the four views named.
- [ ] Each spec's steps follow the card's Flow paragraph by paragraph; nothing in the owner's text is trimmed or reworded.
- [ ] `bench-work/README.md` lists every new spec with bench, minutes and status.

## Out of scope

Building any bench or asset. Changing the owner's card text or Flow (report anything that looks wrong).

## Progress

- 2026-10-20: loaded after U014. Not started. **Start by briefing the owner** (memory brief-before-each-unit): D1·070's
  cards, their benches, what is deferred (Electronics ×1), the visuals and design choices, then wait for direction.
  Check crossings 493–495 first.
