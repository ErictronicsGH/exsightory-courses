---
includeInExport: false
---

<!-- Restructured from: transcripts/Chapter 02 - Measurement fundamentals.md (the quantity we want to
     measure, metrology, why we measure, objectivity, direct/indirect, the measurand);
     categories_of_measurement.md (direct, indirect, null);
     08_static_characteristics_of_mesurement_systems.md (accuracy, true value, conventional true value);
     Chapter 13 - factors_in_making_measurements.md (error, validity, reliability, repeatability,
     accuracy, precision); Chapter 15 - measurement_errors.md (error vs mistake, categories, error
     contribution analysis, operational definitions); Chapter 14 - what_is_average.md (RSS).
     Moved elsewhere: resolution and 1 LSB → 080; quantization error → 080; last-digit bobble →
     Day 2·030; insertion error → 040/050; dynamic error → 070; averaging repeated readings → Day 2·040.
     Where on the path: the very start — the quantity, before any sensor touches it. -->

<!-- Lesson-level script for “The measurand, and what "right" means”. The words for each slide are in the ```flow
     fence under that card in en.md, and appear on the teleprompter with it. -->

## Where we are on the path

The very start — the quantity, before any sensor touches it.

## The arc

1. **The measurand** — Before we can measure, there has to be something to measure.
2. **A measurement must not depend on who made it** — A result should be objective, follow a defined method, and be reproducible.
3. **Direct, indirect and null** — Direct: read the quantity from the instrument.
4. **Error is not a mistake** — Error is the difference between the indicated value and the true value.
5. **Accuracy is not precision** — An accurate measurement has its mean close to the true value.
6. **Repeatable is not the same as right** — An instrument can return the same value every time and still be wrong.
7. **Where error comes from** — Theoretical, static, dynamic, and insertion errors.
8. **Reading a meter's specification** — ±(0.5 % of reading + 3 counts) is two errors added: one that scales with the reading, and one fixed at the last digit.
9. **Stacking tolerances along the chain** — Worst case assumes every error lines up in one direction.

## What the wall shows

- The measurand: none — the question does the work, and the statement lands after it.
- A measurement must not depend on who made it: none — the analogy carries it.
- Direct, indirect and null: Electronics — bridge-null: two divider arms on 10 V, a meter across the midpoints, R4 at 1k2 against
- Error is not a mistake: none — the words carry it; the next card's Plot shows readings clustering round a central value.
- Accuracy is not precision: Plot — two instruments' readings of one voltage as bell curves exp(−(x−μ)²/2σ²), labelled
- Repeatable is not the same as right: Plot — the same Plot, one curve narrowed to a spike and parked well off the true value: every trial
- Where error comes from: Draw — the path drawing with the four categories pinned where the course meets them: theoretical
- Reading a meter's specification: Equation — U = p·reading + n·count, with p = 0.5 %, n = 3 and one count = 1 mV, graphed as U/reading
- Stacking tolerances along the chain: Equation — worst case Σ|eᵢ| beside RSS √(Σeᵢ²), with a worked example on the Day 1 path: sensor

## Learner actions

- The measurand: flash (before the statement) — "You want the electrical resistance of a copper wire. What exactly is
- Direct, indirect and null: flash (before the statement) — "A voltmeter across a resistor. The voltage across a known resistor,
- Accuracy is not precision: multi-select (before the statement) — four targets on the wall, A to D. "Which of these show precise
- Reading a meter's specification: numeric (before the reveal) — "A 3½-digit meter on its 2 V range reads 1.000 V. Its specification is
- Stacking tolerances along the chain: numeric (before the worked example evaluates) — "Four independent errors: ±0.5 %, ±1 %, ±1 % and
- Stacking tolerances along the chain: checkpoint (after the reveal) — "Your budget": 1 take the stages from your 010 suspect list ·

## Hand-off

[[transition]] We know what we want to measure and what "right" would mean. But the quantity is
temperature, or pressure, or light, and our circuits only understand electricity. Remember the eye:
before the brain could interpret anything, a sense organ had to turn light into signals. Our
measurement system needs its own sense organ — the sensor.
