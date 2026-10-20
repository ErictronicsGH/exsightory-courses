---
includeInExport: false
---

<!-- Restructured from: no transcript yet. Built from training-overview.md Day 1 Module 9 ("Lab: the DC
     chain, ideal vs non-ideal"), moved here so the lab can walk the whole DC path to a firmware number;
     and the overview's "Purpose" (the ideal/non-ideal pairing as the teaching moment; the thesis).
     Where on the path: the WHOLE DC PATH, end to end — quantity to number. This module closes the DC
     pass that began yesterday at 12:00. -->

<!-- Lesson-level script for “Lab: the DC chain end to end, ideal vs non-ideal”. The words for each slide are in the ```flow
     fence under that card in en.md, and appear on the teleprompter with it. -->

## Where we are on the path

The WHOLE DC PATH, end to end — quantity to number. This module closes the DC pass that began yesterday at 12:00.

## The arc

1. **Build the chain ideal** — Participants build the full sensor → shunt → in-amp → ADC chain on the Electronics Bench and run it ideal.
2. **One non-ideality at a time** — Non-idealities are injected one at a time, in attributable order: shunt tolerance, lead resistance, in-amp offset, source impedance against acquisition time, reference drift.
3. **Through the firmware to a number** — The codes are carried through the firmware: scaled to engineering units and calibrated, until the chain produces a number, not just a code.
4. **Checking against the Day 1 budget** — The final error should land inside the uncertainty window computed in Day 1 · 020.
5. **The DC pass, closed** — The path has now been walked once with a quantity that stands still: every error source located, quantified and, where it can be, fixed.

## What the wall shows

- Build the chain ideal: Electronics — the lab chain, built stage by stage as the Flow names it: supply and load set to
- One non-ideality at a time: Electronics + Plot — inject in order, one row each, every row keeping the ones before:
- Through the firmware to a number: Coding Bench — `dc-lab`: row 5's code scaled by the 050 equation (1.0345 A), then a two-point
- Checking against the Day 1 budget: Plot — the D1·020 budget for this chain as two bands round 1.000 A: worst case ±4.6 % (1 + 1 + 1 +
- The DC pass, closed: Draw — the course path drawing complete, each stage lit with the row number that entered there, and

## Learner actions

- Build the chain ideal: checkpoint (after the build) — "Record row 0."
- One non-ideality at a time: poe (before each injection, five times) — "Which way will the reading move, and by roughly how much?"
- One non-ideality at a time: flash (after each row) — "Where did this one enter: organ, pathway or processor?"
- Through the firmware to a number: multi-select (before the calibration runs) — "Which of the five injected errors can the two-point
- Checking against the Day 1 budget: poe (before the comparison) — "Your Day 1 window is on the screen. Will the uncalibrated final error
- The DC pass, closed: checkpoint (after the statement) — "Look down your table: which single stage moved the reading the

## Reference

| Stage | Non-ideality injected | Prediction | Reading | Change from previous row |
|---|---|---|---|---|
| 0 | none (ideal) | — | | — |
| 1 | shunt tolerance | | | |
| 2 | lead resistance | | | |
| 3 | in-amp offset | | | |
| 4 | source impedance vs acquisition time | | | |
| 5 | reference drift | | | |

## Hand-off

[[transition]] The DC pass is complete. But everything we have done so far has had one quiet
assumption in it: that the quantity holds still while we measure it. After the break, it starts to
move.
