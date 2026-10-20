---
includeInExport: false
---

<!-- Restructured from: transcripts/Chapter 14 - what_is_average.md (the RMS paragraph of "Integrated, RMS
     and RSS averages", tidied from note form); AC_Metering_System_Simulation_Project.md §5 "The AC Source"
     (230 V RMS, 50 Hz, v(t) = V_peak sin(2πft), V_peak = 230√2 ≈ 325.3 V). The sine-only 0.707 and crest
     factor: no transcript yet (training-overview Day 2 Module 6). Integrated average → D3·040.
     Where on the path: back at the very beginning — the QUANTITY — because the AC pass walks the path
     again from the quantity inwards. -->

<!-- Lesson-level script for “AC as the quantity: RMS and crest factor”. The words for each slide are in the ```flow
     fence under that card in en.md, and appear on the teleprompter with it. -->

## Where we are on the path

Back at the very beginning — the QUANTITY — because the AC pass walks the path again from the quantity inwards.

## The arc

1. **The quantity starts to move** — The DC pass assumed the quantity stood still.
2. **230 V of what?** — The RMS value of an AC wave is the DC level that would produce the same amount of heating in an electrical resistance.
3. **Is 0.707 universal?** — 0.707 is a sine-only constant.
4. **Crest factor** — Crest factor is the shape descriptor that decides what copes with what.

## What the wall shows

- The quantity starts to move: Draw — `waveform-construction` (existing): the phasor turning and drawing v(t) = V_peak·sin(2πft),
- 230 V of what?: Plot — v(t) = 325.3·sin(2π·50·t) over two cycles; v²(t) on a second axis with its area
- Is 0.707 universal?: Equation — V_RMS = √(mean of v²) with `simulate` driving v as a sine, then a square, then a triangle,
- Crest factor: Plot — the three waveforms at the same RMS, 230 V: square peak 230 V, sine 325 V, triangle 398 V,

## Learner actions

- 230 V of what?: poe (before the statement) — "We call that supply 230 V. 230 V of what?"
- Is 0.707 universal?: poe (before the meters) — "Is the RMS of each of these the peak times 0.707?"
- Crest factor: poe (before the statement) — "Same RMS, same heating. Which of the three has the highest peak?"

## Hand-off

[[transition]] So now we know what number we want from the mains. But we cannot measure what we
cannot reach, and this quantity can hurt us. Before a sensor goes anywhere near it, we have to get at
it safely.
