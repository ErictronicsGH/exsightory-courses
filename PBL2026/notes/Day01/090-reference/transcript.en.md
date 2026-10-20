---
includeInExport: false
---

<!-- Restructured from: transcripts/Chapter 07 - Analog to digital converters.md (Reference voltage and
     input range). GAPs: VDD as reference, ratiometric measurement (training-overview Day 1 Module 6).
     Where on the path: still inside the converter — the reference every code is measured against.
     It closes the day by reaching back to the sensor's excitation (030). -->

<!-- Lesson-level script for “The reference voltage, and ratiometric measurement”. The words for each slide are in the ```flow
     fence under that card in en.md, and appear on the teleprompter with it. -->

## Where we are on the path

Still inside the converter — the reference every code is measured against. It closes the day by reaching back to the sensor's excitation (030).

## The arc

1. **A code is a ratio to the reference** — The ADC does not measure volts.
2. **The code alone means nothing** — To turn a code back into a voltage you need the resolution, the reference, the input range and the configuration.
3. **Reference error is measurement error** — If the reference is 1 % high, every reading is 1 % low.
4. **VDD: the default, and usually the worst** — Using the supply as the reference is convenient, and the supply is the noisiest, least accurate voltage on the board.
5. **Ratiometric: let the error cancel** — Excite a resistive sensor from the same rail that references the converter.
6. **Back to the sensor** — The excitation of a modulating sensor, from this morning, and the converter's reference turn out to be one design decision, not two.

## What the wall shows

- A code is a ratio to the reference: Equation — code = (V_in / V_ref)·2^N, rearranged (solveFor) to V_in = code·V_ref / 2^N, graphed as
- VDD: the default, and usually the worst: Electronics — the bench supply as a 3.3 V rail that feeds the MCU's own load and references the ADC,
- Ratiometric: let the error cancel: Plot — the code against the rail voltage V_dd from 3.0 to 3.6 V for two inputs: an absolute

## Learner actions

- The code alone means nothing: numeric ×2 (at the Flow's [[ask]]) — "The code is 2047, from a 12-bit converter. What voltage is that
- Reference error is measurement error: poe (before the statement) — "The supply rail, which is also the reference, sags from 3.30 V to
- VDD: the default, and usually the worst: poll (after the SHOW) — "An ATmega328P on 5 V reads a 0–1 V signal. Which reference would you use:
- Ratiometric: let the error cancel: poe (before the reveal) — "Now the thermistor divider, the 10 k NTC under 10 kΩ, is powered from the
- Back to the sensor: checkpoint (at the Flow's [[ask]]) — "Back to 2047": 1 name every stage it passed through · 2 for

## Hand-off

[[transition]] Today the quantity became a code. Tomorrow the code leaves the converter, and the
firmware has to earn the right to call it a number.
