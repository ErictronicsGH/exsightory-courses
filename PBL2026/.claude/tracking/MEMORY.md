---
id: U017
title: Bench specs for D1·080 — Conversion: sampling, quantization, architecture and ENOB
status: in-progress
depends_on: [U002, U003]
refs:
  - .claude/standards/bench-spec-template.md
  - .claude/standards/bench-quality-bar.md
  - .claude/standards/authoring-digest.md
  - notes/Day01/080-adc-conversion/en.md
  - elements-by-section.md
---

## Goal

Write one spec in `bench-work/specs/` for every card of D1·080 (30 min) that shows a bench, so each
activity can be built straight from its file when its bench is ready.

Elements in this module (from elements-by-section.md): Numeric answer ×3, Plot Bench ×2, Equation Bench ×2, Predict–observe–explain ×1, Flash quiz ×1, Draw Bench ×1, Coding Bench ×1, Figure Bench ×1, Multi-select ×1.

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

- 2026-10-20: loaded while U016 waits on crossing 505 (owner). Start: list crossings; run the accuracy check A1–A7 on
  D1·080 (the module's numbers under the course's models, its cross-references to D1·010 and D1·070); then brief the owner
  as a browser page (`bench-work/previews/u017-preview.html`, the `previews` server) and wait for design direction.
- 2026-10-20: crossings checked (none owed, none answered). **Accuracy check A1–A7 run on D1·080**: nine findings, all
  **open** in ACCURACY.md (F1 2714 → 2693; F2 "closest" vs truncating; F3 1001 = 9; F4 8.502/8.41/8.880 and 39.0 mV;
  F5 statement's ½ LSB vs truncating; F6 "no circuit removes it" vs D2·040; F7 "never reaches zero"; F8 card 6's "same
  input"; F9 "a 12-bit converter delivers ten bits"). Also N1–N4 (old Widget names, ATmega/ESP32 named, ADS1115 course-wide
  with D2·020, the datasheet Figure unbranded) and D1–D4 (bench per card; sigma-delta as a Plot since the Coding Bench is
  not built; our SAR spec's ATmega/8 µs per bit to revise; card 4 no bench). Time ≈ 20 of 30 min (Flow 1,781 words, 13.7
  min). **Brief page built and verified: `bench-work/previews/u017-preview.html`** (live plots for cards 1, 2, 3, 5, 6, 7,
  8; findings as choice buttons; read back with `u017Feedback()`). **Waiting for the owner's answers / design direction.**
