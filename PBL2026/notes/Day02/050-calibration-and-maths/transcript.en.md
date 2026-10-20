---
includeInExport: false
---

<!-- Restructured from: transcripts/Chapter 11 - Conversion.md (opening "Conversion is a broader concept",
     the kinds of conversion, §18 "Unit conversion is not the same as ADC conversion", §19 "Scaling and
     engineering units"); Chapter 03 - Signal conditioning.md "Linearization"; 07_compensation_techniques.md
     "Mathematical correction" (tidied from note form); Chapter 12 - Calibration.md (all);
     08_static_characteristics_of_mesurement_systems.md (static calibration and the calibration curve,
     tidied from note form); Chapter 01 - The need for sensing.md (the sugar story, recalled as a bridge);
     Chapter 06 (the Kumasi–Accra driver, recalled in one line). Two-point calibration of offset and gain
     vs INL/DNL, and the precision-losing arithmetic: no transcript yet (training-overview Day 2 Module 4).
     Where on the path: FIRMWARE — calibrate and scale — and out the other end: the NUMBER. -->

<!-- Lesson-level script for “Scaling, calibration and the maths that loses your precision”. The words for each slide are in the ```flow
     fence under that card in en.md, and appear on the teleprompter with it. -->

## Where we are on the path

FIRMWARE — calibrate and scale — and out the other end: the NUMBER.

## The arc

1. **The code has arrived** — Now that the data has reached the microcontroller, we can compute on it, and relate the digital representation to the physical quantity we are actually interested in.
2. **"Conversion" means many things** — Transduction, signal conditioning, ADC, DAC, unit conversion, scaling, calibration, encoding and protocol conversion are all called "conversion", and they are conceptually different processes.
3. **Unit conversion is not ADC conversion** — 10 m → 1,000 cm changes only the unit.
4. **Scaling: from code to engineering unit** — A raw code means nothing until the software relates it, through the electrical quantity and the sensor relationship, to the physical quantity and its unit.
5. **Nonlinear sensors: compensate, don't straighten** — A nonlinear sensor needs a lookup table, polynomial, compensation algorithm or calibration data.
6. **Real systems are never ideal** — The sensor, the amplifier, the reference and the ADC each depart from their nominal behaviour, so the theoretical relationship from quantity to code may not match what the real system does.
7. **Calibration: compare with a known reference** — Calibration establishes or verifies the relationship between an instrument's indication and a known reference, repeated at several points across the range.
8. **What two points can fix** — Offset and gain errors are separately correctable; INL and DNL are not.
9. **Calibration is not correction** — Calibration establishes how the instrument behaves relative to a reference; correction uses that knowledge to compensate.
10. **Code, indication, corrected value, result** — ADC code 3102 → calculated indication 72.4 °C → calibration correction → measurement result 71.8 °C.
11. **Four ways to write one conversion** — The conversion arithmetic itself throws bits away: dividing before multiplying, intermediate overflow, and floating point on a part with no FPU.

## What the wall shows

- The code has arrived: Draw — the course path drawing with FIRMWARE lit and split into its three boxes, filter → calibrate
- "Conversion" means many things: Figure — nine small cards, one per kind of conversion (transduction, conditioning, ADC, DAC, unit,
- Unit conversion is not ADC conversion: None: the three examples are the card.
- Scaling: from code to engineering unit: Equation — the scaling chain with each stage coloured to its place on the path: V = code × V_ref /
- Nonlinear sensors: compensate, don't straighten: Plot — a 10 kΩ NTC (β = 3950) in a divider with 10 kΩ from 3.3 V, the divider voltage against
- Real systems are never ideal: Draw — the course path drawing, each departure the room names pinned to its stage as it is called
- Calibration: compare with a known reference: Plot — the calibration table as a data series, reference 0, 25, 50, 75 °C against
- What two points can fix: Coding Bench — `two-point`: a modelled temperature channel whose raw indication follows the table
- Calibration is not correction: Draw — Reference → Compare → Characterise error → Establish relationship → Apply correction, five
- Code, indication, corrected value, result: Figure — the chain 3102 → 72.4 °C → calibration correction → 71.8 °C, with numbered labels (code,
- Four ways to write one conversion: Coding Bench — `four-ways`: one conversion, code → millivolts at 3.3 V and 12 bits, written four ways

## Learner actions

- "Conversion" means many things: poll (before the statement) — "Temperature → resistance. 5 mV → 2 V. 25 °C → 77 °F. ADC count →
- Real systems are never ideal: checkpoint (after the statement) — "Name one way the real part departs from nominal at each stage."
- Calibration: compare with a known reference: poe (before the fit is drawn) — "Work out the error on each row. Is it a constant offset, or does it
- What two points can fix: poe (before the statement) — "How many known reference points do you need to correct an offset? And
- What two points can fix: numeric (after the demo) — "Calibrate at 0 °C and 75 °C, where the system indicated 1.8 and 76.5 °C.
- Code, indication, corrected value, result: poe (before the labels appear) — "3102, 72.4 °C, 71.8 °C: which one is the measurement result?"
- Four ways to write one conversion: multi-select (before the live errors) — "Which of the four return 2499 mV for code 3102, to within

## Reference

| Reference temperature | System indication |
|---:|---:|
| 0 °C | 1.8 °C |
| 25 °C | 26.2 °C |
| 50 °C | 51.1 °C |
| 75 °C | 76.5 °C |

## Hand-off

[[transition]] That is every stage of the DC path, from the quantity to a number with a unit, checked
against a reference. We have walked it one stage at a time. Now we walk it end to end, in one go,
and see whether the number we earn lands where Day 1's uncertainty budget said it would.
