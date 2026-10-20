---
includeInExport: false
---

<!-- Restructured from: transcripts/Chapter 15 - measurement_errors.md ("Static error" → "Reading static
     errors": the last-digit bobble and bobble at a threshold, tidied from note form); Chapter 14 -
     what_is_average.md (the noise sentences of the RSS paragraph; the general RSS definition is taught at
     D1·020). Thermal noise, high-Z nodes, switching noise and ground-path voltage: no transcript yet
     (training-overview Day 2 Module 1).
     Where on the path: we meet noise where the room actually SEES it — in the firmware, as a last digit
     that will not stand still — and then trace it back up the path to where it enters: the source
     resistance, the bandwidth, the shared impedances and the return path. -->

<!-- Lesson-level script for “Noise: thermal, coupled and self-inflicted”. The words for each slide are in the ```flow
     fence under that card in en.md, and appear on the teleprompter with it. -->

## Where we are on the path

We meet noise where the room actually SEES it — in the firmware, as a last digit that will not stand still — and then trace it back up the path to where it enters: the source resistance, the bandwidth, the shared impedances and the return path.

## The arc

1. **The last digit will not stand still** — On a digital readout the least significant digit often flips back and forth between two values: the last-digit bobble.
2. **Bobble at a threshold** — Bobble matters most when an action is taken as a value crosses a threshold.
3. **Thermal noise: a floor set by resistance and bandwidth** — Thermal noise is a floor set by resistance and bandwidth.
4. **The cost of high impedance** — Because the floor is set by resistance, high-impedance nodes are noisy by physics.
5. **Independent noise adds as root-sum-of-squares** — Truly independent noise sources cannot be combined in a linear, additive way.
6. **Self-inflicted: switching noise through shared impedance** — Some noise is our own.
7. **Return current makes voltage in the ground path** — Return current flowing through the ground path makes a voltage there, and the converter reads it as signal.

## What the wall shows

- The last digit will not stand still: Coding Bench — `bobble`: a modelled 12-bit converter reading a perfectly steady input set at 2047.4
- Bobble at a threshold: Coding Bench — `threshold`: the `bobble` stream (input 2047.4 LSB, σ = 0.3 LSB, 1,000 samples a
- Thermal noise: a floor set by resistance and bandwidth: Equation — v_n = √(4kTRB), T, R and B on dials, k fixed; graphed against R on log axes
- The cost of high impedance: Equation — the centrepiece Equation with R stepped from 10 kΩ to 1 MΩ, beside D1·040's loaded divider
- Independent noise adds as root-sum-of-squares: Equation — v_total = √(v₁² + v₂²) with two dials (D1·020's RSS card, reused). Then Coding Bench
- Self-inflicted: switching noise through shared impedance: Electronics — new fixture `ground-return` (also 090's centrepiece): a 10 V supply V1; a sensor
- Return current makes voltage in the ground path: Electronics — the same `ground-return` fixture with the Voltage overlay on and TR's `ir_drop` reveal,

## Learner actions

- The last digit will not stand still: poe (before the statement) — "The input is not changing at all. So why is the last digit?"
- Bobble at a threshold: poe (before the statement) — "Your firmware switches a relay when the reading crosses a set point,
- Thermal noise: a floor set by resistance and bandwidth: poe (before the re-runs) — "Raise the resistance a hundredfold. Then widen the bandwidth four times.
- Thermal noise: a floor set by resistance and bandwidth: numeric (after the reveal) — "10 kΩ at 300 K, over a 10 kHz bandwidth: what is the thermal noise, in
- The cost of high impedance: numeric (before the statement) — "A 1 MΩ source instead of 10 kΩ, same bandwidth. How many times
- Independent noise adds as root-sum-of-squares: poe (before the statement) — "Two truly independent noise sources of equal size meet at one node. Is
- Self-inflicted: switching noise through shared impedance: circuit + predict (before the load switches) — "When M1 switches the load on, what does the DMM do?"

## Hand-off

[[transition]] So noise is everywhere on the path, some of it from physics and some of it from us.
So far we have treated it as the enemy. Next, the firmware starts to *use* it: averaging, and the
condition under which averaging buys you resolution you did not have.
