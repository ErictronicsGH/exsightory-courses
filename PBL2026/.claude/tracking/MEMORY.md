---
id: U014
title: Bench specs for D1·050 — Current as the quantity: shunts, Kelvin and burden voltage
status: in-progress
depends_on: [U002, U003]
refs:
  - .claude/standards/bench-spec-template.md
  - .claude/standards/bench-quality-bar.md
  - .claude/standards/authoring-digest.md
  - notes/Day01/050-current-sensing/en.md
  - elements-by-section.md
  - bench-work/specs/D1-040-06-high-in-low-out.md (the latest Equation spec: what the Equation Bench mirrors to the wall)
  - .claude/tracking/archive/done_U013_specs-D1-040-sensor-as-source_2026-10-08.md (handoff)
  - .claude/memory/electronics-bench-in-development.md · render-visual-milestones.md · bench-versus-library.md · real-but-unbranded.md
---

## Goal

Write one spec in `bench-work/specs/` for every card of D1·050 (40 min) that shows a bench, so each
activity can be built straight from its file when its bench is ready.

Elements in this module (from elements-by-section.md): Electronics Bench ×4, Circuit predict ×3, Equation Bench ×2, Numeric answer ×1, Flash quiz ×1.

## Acceptance criteria

- [ ] One spec per bench card, in the template's shape, named `D<day>-<module>-<card>-<slug>.md`.
- [ ] Each spec gives the minutes on the bench, inside the module's budget, and says where they come from.
- [ ] Each spec meets the quality bar: real values and units, the faithfulness checklist filled, the four views named.
- [ ] Each spec's steps follow the card's Flow paragraph by paragraph; nothing in the owner's text is trimmed or reworded.
- [ ] `bench-work/README.md` lists every new spec with bench, minutes and status.

## Out of scope

Building any bench or asset. Changing the owner's card text or Flow (report anything that looks wrong).

## Progress

- 2026-10-08: loaded after U035. **Start by briefing the owner** (owner, 2026-10-08): what D1·050's cards need on
  which benches, which are Electronics (deferred), what the Equation cards will show, and any visual to design.
  **Then wait for their design direction before writing or drawing anything.**
- 2026-10-08: brief sent (cards 1–2 Equation; 3–6 Electronics deferred; card 2 hits one-equation-per-block;
  card 6 brown-out arithmetic). Waiting for the owner's design direction.
- 2026-10-08: **parked** (owner redirected to building the visualizations in lecture order). The D1·050 brief
  stands; reload when its turn comes.
- 2026-10-13: **loaded after U015** (D1·060's specs done). Lecture order: D1·050 before D1·060's demonstrations, and
  D1·050's high-side shunt scene is reused by D1·060 cards 1, 6, 7 (DECISIONS 2026-10-13). The 2026-10-08 brief stands;
  re-send it briefly (with the shunt numbers D1·060 now relies on) and wait for the owner's direction.

