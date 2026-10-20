---
id: U017
title: Bench specs for D1·080 — Conversion: sampling, quantization, architecture and ENOB
status: done
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

- [x] **Accuracy (blocking):** check A1–A7 of `.claude/standards/course-accuracy.md` run on the module before the brief and on everything produced; results in `tracking/ACCURACY.md`; **no open accuracy finding** on this module.
- [x] One spec per bench card, in the template's shape, named `D<day>-<module>-<card>-<slug>.md`.
- [x] Each spec gives the minutes on the bench, inside the module's budget, and says where they come from.
- [x] Each spec meets the quality bar: real values and units, the faithfulness checklist filled, the four views named.
- [x] Each spec's steps follow the card's Flow paragraph by paragraph; nothing in the owner's text is trimmed or reworded.
- [x] `bench-work/README.md` lists every new spec with bench, minutes and status.

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
- 2026-10-20: owner *"go with your recommendations"* on the brief → F1–F9, N1, N2 applied to en.md (F4 without *"around
  its level"*); N3 waits for D2·020; N4, D1–D4 in the specs; DECISIONS row. **Specs written** (spec-draft): 01 (Plot, 3.8),
  02 (Equation, 2.5), 03 (Plot centrepiece, 3.0; **holds the module table: ≈ 22.9 of 30**), 05 revised (Animation, 3.1),
  06 (Plot ×2 precomputed, 2.4), 07 (Figure + Plot, 3.5), 08 (Equation, 3.4); README rows added. **New accuracy findings,
  open**: D1·080-F10–F18 (1.76 dB "loses"; S20's noise table vs ENOB; error sign; 8.535 edge; top code; "resolution error";
  offset "0 V no longer gives code 0"; "Every MCU datasheet"; "Nothing fixes the second") and D2·040-F1 (for U022). Page
  fixed (error sign; card 7's offset, INL, DNL). Next: the owner decides F10–F18 and the specs' proposals.
- 2026-10-20: owner *"apply all recommendations"* (F10–F18) and *"go with the recommendations"* (the specs' proposals):
  F10–F18 applied to en.md and course-plan.md; the seven specs **spec-ready**; module ≈ 23.6 of 30 min. D2·020-F1 and
  D2·040-F1 logged open for U020 and U022.

## Handoff notes

- **What changed.** D1·080's accuracy check found 18 points in the owner's text (F1–F9 before the brief, F10–F18 while
  writing the specs); all decided on the recommendations and applied to `notes/Day01/080-adc-conversion/en.md` (and S21 in
  `course-plan.md`). Specs: `D1-080-01` (Plot), `-02` (Equation), `-03` (Plot centrepiece; **holds the module table**),
  `-05` (Animation, revised from the U002 dry run to the course's 12-bit, 3.3 V converter, ≈ 83 ns per bit), `-06` (Plot ×2,
  floor curves with an input slider; the Coding Bench is not built), `-07` (Figure + Plot), `-08` (Equation). Card 4 has no
  bench (owner D4). The brief page `bench-work/previews/u017-preview.html` is updated to the decisions.
- **Deviations.** The F4 wording left out *"around its level"* (untrue on a truncating converter). Card 5's and card 6's
  predictions were taken as the specs' proposals (owner confirmed card 5's). Card 3's error convention is level − input,
  as D1·020 defines error; my brief page had input − level and was fixed.
- **Raised for other units.** D2·020-F1 (effective resolution vs ENOB, U020); D2·040-F1 (*"exactly"* about the sigma-delta,
  U022); N3 (the ADS1115 named in card 6, decided with D2·020). Card 7's two blocks side by side on one card is Studio's:
  for the owner to route. New Plot needs named in the specs (framings in X12 presets, a second band, sampling at jumps, a
  labelled switch, `series.src` drawn) get X-numbers when raised as crossings.
- **Next.** U016 stays parked until Benches answers crossing 505. U018 (D1·090) loaded.
