---
id: U020
title: Bench specs for D2·020 — External ADCs as a design choice: ADS1115 and INA226
status: in-progress
depends_on: [U002, U003]
refs:
  - .claude/standards/bench-spec-template.md
  - .claude/standards/bench-quality-bar.md
  - .claude/standards/authoring-digest.md
  - notes/Day02/020-external-adcs/en.md
  - elements-by-section.md
---

## Goal

Write one spec in `bench-work/specs/` for every card of D2·020 (30 min) that shows a bench, so each
activity can be built straight from its file when its bench is ready.

Elements in this module (from elements-by-section.md): Figure Bench ×3, Numeric answer ×3, Plot Bench ×2, Predict–observe–explain ×2, Flash quiz ×1, Draw Bench ×1, Checkpoint ×1, Equation Bench ×1, Poll ×1.

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

- 2026-10-20: loaded after U019 (U016 still parked on crossing 505). Start: list crossings from the worktree (ours
  510–512 and 516–519 open); run the accuracy check A1–A7 on D2·020 (open already: **D2·020-F1**, the noise table and
  ENOB, from D1·080; and DAY23-F1's *"this morning"* at l. 392; the title's product names under *real but unbranded*);
  check `transcript.en.md` against `en.md`; then brief the owner as `bench-work/previews/u020-preview.html` and wait
  for design direction.
- 2026-10-20 (session 2): crossings listed from the worktree (nothing open for pbl2026; next free 522). **Accuracy check
  A1–A7 done**: every number recomputed ✓ (Node); ADS1115 values read off SBAS444E (Dec 2024; Tables 6-1/6-2, §5.5,
  Table 7-3, MUX[2:0]) and INA226 off SBOS547C (Aug 2026), both PDFs fetched into the session scratchpad (not kept).
  **Open: D2·020-F1 (widened: RMS column flat at 1 LSB, only p-p grows; 7.81 → 35.83 µV pp on ±0.256 V, 13.80
  noise-free bits at 860 SPS) and F2–F7** (staircase floor; card 2 Look for; *differential* impedance; *"extend"* the
  chain; *"all of it signal"*; *"this morning's firmware jobs"* come later, so DAY23-F1's *"earlier today"* is false
  here). Script panel card-4 arc line fixed (cut mid-word). **Brief page `bench-work/previews/u020-preview.html`**
  (live visual per card; F1–F7 plus D1 named parts vs unbranded, D2 redrawn extracts, D3 benches/crossing, D4 the
  FAULT on the figure, N1, N2; ≈ 29 of 30 min). **Next: read the owner's choices off the page (`u020Feedback()`) or
  the chat, apply, re-check, then write the seven specs.**

