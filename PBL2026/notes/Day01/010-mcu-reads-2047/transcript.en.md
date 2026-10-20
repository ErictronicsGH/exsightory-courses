---
includeInExport: false
---

<!-- Restructured from: transcripts/Chapter 01 - The need for sensing.md (all);
     Chapter 04 - Data domains.md (introduction, the temperature chain);
     Chapter 06 - Data conversion.md §11 (the ADC does not know what the measurement means).
     Where on the path: the whole path, seen once, before we walk it stage by stage. -->

<!-- Lesson-level script for “Your MCU reads 2047 — what is that?”. The words for each slide are in the ```flow
     fence under that card in en.md, and appear on the teleprompter with it. -->

## Where we are on the path

The whole path, seen once, before we walk it stage by stage.

## The arc

1. **The number is confidently wrong** — A sensor, a divider, an ADC pin and three lines of firmware report a reading.
2. **A person with no senses** — Information is fundamental to how we understand and act on the world.
3. **Sense organ, pathway, processor** — The eye detects light.
4. **Three places the information can be spoiled** — A defect in the sense organ, in the pathway, or in the processor each changes what we perceive.
5. **The path a measurement travels** — Temperature → resistance → voltage → ADC code → binary data → software variable → 27.4 °C.
6. **The ADC does not know what 2047 means** — The converter knows its input voltage and its configuration, nothing else.
7. **A number that appears is not a number you have earned** — Every stage of the path can add error, and almost none of them announce it.

## What the wall shows

- The number is confidently wrong: Electronics — the cold-open circuit (Demo #1): a sensor output of 3.585 V into two 100 kΩ
- A person with no senses: none — the room's imagination is the canvas; keep the wall to the statement.
- Sense organ, pathway, processor: Model — the eye with named parts (cornea, lens, retina, photoreceptors, optic nerve) and the visual
- Three places the information can be spoiled: Draw — the eye's three stages drawn left to right; the measurement path drawn beneath them; three
- The path a measurement travels: Draw — the course path built arrow by arrow: Temperature → Resistance → Voltage → ADC code → Binary
- The ADC does not know what 2047 means: Draw — the path drawing focused on the converter: "1.65 V → ADC → 2048", with the seven things it
- A number that appears is not a number you have earned: Draw — the whole path drawing, every stage blank, waiting for the room's marks.

## Learner actions

- The number is confidently wrong: poe (before the statement) — "Here is the circuit and here is the code. Is 2047 right?"
- A person with no senses: poll, live (before the statement) — "Imagine a person with no functioning sense organs. What would
- A number that appears is not a number you have earned: checkpoint (after the statement) — "Your suspect list":

## Reference

| Domain | Example |
|---|---|
| Physical domain | temperature, pressure, force, light |
| Mechanical domain | displacement, rotation, vibration |
| Analog electrical domain | voltage, current, resistance |
| Digital electrical domain | logic HIGH and LOW |
| Digital data domain | numbers, bits, bytes, words |
| Communication domain | packets, frames, protocols |
| Software/application domain | 27.4 °C, 101.3 kPa |

## Hand-off

[[transition]] So we walk the path from its very beginning, and the beginning is not the sensor. It
is the thing we want to measure, and what it would mean for our number to be *right*.
