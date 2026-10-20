---
targetMinutes: 25
motivates: We have met every DC error source one at a time — but when they all act together, does the number we finally earn land where our own budget said it would?
objectives:
  - Build the sensor → shunt → in-amp → ADC chain ideal, then inject non-idealities one at a time in attributable order and record the effect of each.
  - Carry the codes through firmware scaling and calibration to a number, and check its final error against the uncertainty window computed in Day 1 · 020.
concepts: [uncertainty-budget, calibration]
---

# Lab: the DC chain end to end, ideal vs non-ideal

<!-- PATH: [ QUANTITY → SENSOR → SOURCE & LOADING → CONDITIONING → ADC INPUT → CONVERSION → REFERENCE
           → DIGITAL INTERFACE → FIRMWARE → NUMBER ]  — the whole DC path, walked end to end. Closes the DC pass.
     TOOL: Electronics (centrepiece: the lab chain — shunt and Kelvin leads today; needs in-amp and ADC
           parts) · Coding Bench (`dc-lab`: scaling and two-point calibration) · Plot (each row's reading
           against the Day 1 budget bands) · Draw (the path, closed). The in-amp and ADC stages need those parts on the
           Electronics Bench.
     SOURCES: training-overview.md Day 1 Module 9 (the lab) and "Purpose" (ideal vs non-ideal as the teaching
              moment). No transcript yet. Concepts served again as practice: uncertainty-budget (D1·020),
              calibration (D2·050). -->

## Build the chain ideal

Participants build the full sensor → shunt → in-amp → ADC chain on the Electronics Bench and run it ideal. That
reading is the baseline every later change is measured against.

<!-- PLAN
SHOW     Electronics — the lab chain, built stage by stage as the Flow names it: supply and load set to
         1.000 A (a bench ammeter as the truth), shunt R_S 10 mΩ with Kelvin sense leads (as in
         `four-wire-sensing`), an in-amp with G = 100, and a 12-bit ADC with a 3.300 V reference whose code is
         the reading; everything ideal. Firmware (Coding Bench `dc-lab`): I = code × 3.3 / (4096 × 100 ×
         0.010) = code × 0.806 mA. Drive: build, run. Look for: code 1241, 0.9998 A: even ideal, 0.02 % low,
         which is quantization.
         Status: needs Electronics: in-amp part (gain, V_os, CMRR) · ADC part (V_ref pin, sample-and-hold with
                 an acquisition window, code readout) · needs Coding Bench: `dc-lab`
ASK      checkpoint (after the build) — "Record row 0."
         items: chain built | code recorded (1241) | current recorded (0.9998 A) | budget from D1·020 on the desk
         depth: use    practice: planning investigations
-->

<!-- FILLED 2026-10-07: drafted from training-overview Day 1 Module 9 (the lab); chain values chosen for this lab; tutor to review -->

```flow
Since yesterday at noon we have walked one path, one stage at a time: the quantity, the sensor, the
source and its loading, conditioning, the ADC input, conversion, the reference, the digital
interface, and this morning the firmware that filters, calibrates and scales. Now we put all of it
in one circuit and run it.

[[demo]] Electronics Bench — the guided build of sensor → shunt → in-amp → ADC, everything ideal.

Here is the chain. A load draws 1.000 A, and a bench ammeter tells us the truth. The current flows
through a 10 mΩ shunt, so the shunt gives 10 mV. An in-amp with a gain of 100 lifts that to 1.000 V. A
12-bit converter with a 3.300 V reference converts it, and the firmware turns the code back into amps:
the code times 3.3 V over 4096, divided by the gain and by the shunt. That is about 0.806 mA per count.

[[ask]] Run it, and write down row 0: the code, and the current.

[[pause]]

Code 1241, 0.9998 A. Even with every part ideal, the reading is 0.02 % low. That is quantization:
1.000 V sits between two codes. Every row after this one is measured against this baseline.
```

***

## One non-ideality at a time

Non-idealities are injected one at a time, in attributable order: shunt tolerance, lead resistance,
in-amp offset, source impedance against acquisition time, reference drift. The reading is recorded
after each, so every change has one cause.

<!-- PLAN
SHOW (centrepiece) Electronics + Plot — inject in order, one row each, every row keeping the ones before:
         (1) R_S at +1 % (10.1 mΩ) → code 1253, 1.0095 A;
         (2) sense leads moved off the Kelvin pads, picking up 0.1 mΩ of copper (`lead_resistance` reveal) →
             1266, 1.0200 A;
         (3) in-amp V_os +100 µV → 1278, 1.0296 A;
         (4) acquisition window shortened so the sample settles 0.5 % short → 1272, 1.0248 A;
         (5) V_ref drifts 1 % low, 3.267 V, firmware still assumes 3.3 V → 1284, 1.0345 A.
         Plot beside it: reading against row number as a data series, the true 1.000 A and the Day 1 budget
         bands (worst case ±4.6 %, RSS ±2.1 %) as markers. Look for: each row moving for one reason; row 4
         moving the other way.
         Status: rows 1–2 ready on existing parts (resistor tolerance, `lead_resistance`) · rows 3–5 need
                 Electronics: in-amp part, ADC part · Plot ready
ASK      poe (before each injection, five times) — "Which way will the reading move, and by roughly how much?"
         options: Up about 1 % | Down about 1 % | Up about 0.5 % | Down about 0.5 % | No change
         answer: rows 1, 2, 3, 5: up about 1 % · row 4: down about 0.5 %
         reveal: the row's reading, added to the Plot
         explain: Shunt, copper and offset each add to the voltage the in-amp sees, an unsettled sample is
         short of its target, and a low reference makes every code larger while the firmware still divides by
         3.3 V.
         depth: understand    practice: analysing data
ASK      flash (after each row) — "Where did this one enter: organ, pathway or processor?"
         options: Organ (the sensor) | Pathway (wiring, conditioning) | Processor (ADC, reference, firmware)
         answer: shunt → organ · leads → pathway · offset → pathway · settling → where pathway meets processor
         (the ADC input; let the room argue it) · reference → processor
         explain: Each row has one address on the path, which is what makes the table a diagnosis instead of a
         list of symptoms.
         depth: understand    practice: arguing from evidence
HARVEST  S3 — "On Day 1 the eye gave us three places information is spoiled: the organ, the pathway, the
         processor. Every row of this table has an address in one of them. Say which before we move on."
FAULT    Row 1, shunt at its tolerance limit: organ.
FAULT    Row 2, sense leads off the Kelvin pads: pathway.
FAULT    Row 3, in-amp offset: pathway.
FAULT    Row 4, acquisition window too short for the source: the ADC input.
FAULT    Row 5, reference drift: processor.
FAULT    Bonus row, firmware: 050's version B conversion in `dc-lab`: the reading collapses to a small,
         plausible number; processor.
-->

<!-- FILLED 2026-10-07: drafted from training-overview Day 1 Module 9 (the lab); injected values chosen for this lab; tutor to review -->

```flow
Now we break it, carefully. One thing at a time, and in a set order, so that when the reading moves
we know exactly why it moved.

[[ask]] Before each injection, write down your prediction: which way will the reading move, and
roughly by how much?

[[pause]]

A recording table for the room to fill in:

(Table on the script panel: Stage · Non-ideality injected · Prediction · Reading · Change from previous row.)

Row 1: the shunt at the edge of its 1 % tolerance, 10.1 mΩ.

[[reveal]] Up about 1 %: code 1253, 1.0095 A. The shunt makes 1 % more voltage for the same current,
and the firmware still assumes 10 mΩ.

Row 2: the in-amp's sense leads moved off the shunt's Kelvin pads, so they pick up 0.1 mΩ of copper.

[[reveal]] Up about 1 % again: 1266, 1.0200 A. The copper has become part of the shunt: Day 1's
two-wire measurement.

Row 3: the in-amp's input offset, 100 µV.

[[reveal]] Up about 1 %: 1278, 1.0296 A. The offset is amplified exactly like the signal, and 100 µV
is 1 % of a 10 mV signal.

Row 4: the acquisition window shortened, so the sampling capacitor settles 0.5 % short of its target.

[[reveal]] This one goes the other way: down about 0.5 %, 1272, 1.0248 A. A source that cannot settle
reads low.

Row 5: the reference drifts 1 % low, to 3.267 V, while the firmware still divides by 3.3.

[[reveal]] Up about 1 %: 1284, 1.0345 A. Reference error is measurement error, one-for-one.

[[ask]] After each row: where on the path did this one enter? The organ, the pathway, or the
processor?

[[pause]]

That is the eye from Day 1, used as a diagnosis. The shunt is the sense organ. The leads and the
in-amp are the pathway. The reference belongs to the processor. And the settling? It happens where the
pathway meets the processor, at the converter's input. Argue that one out.
```

***

## Through the firmware to a number

The codes are carried through the firmware: scaled to engineering units and calibrated, until the
chain produces a number, not just a code.

<!-- PLAN
SHOW     Coding Bench — `dc-lab`: row 5's code scaled by the 050 equation (1.0345 A), then a two-point
         calibration taken through the whole chain at 0 A and 2 A (codes 12 and 2557) and applied.
         Drive: scaled → calibrated (0.9996 A) → let the reference drift a further 0.5 % after calibration
         (1.0051 A). Look for: five injected errors removed by two constants, and one coming back as soon as
         something moves after the constants were stored.
         Status: needs Coding Bench: `dc-lab`
ASK      multi-select (before the calibration runs) — "Which of the five injected errors can the two-point
         calibration remove?"
         options: Shunt tolerance | Lead resistance | In-amp offset | Incomplete settling | Reference drift
         answer: all five, as they stood when the constants were taken
         reveal: the calibrated reading, then the drift after calibration
         explain: At the moment of calibration each of the five is either an offset or a proportional error,
         so two constants absorb them all; what calibration cannot touch is a bend in the line, or anything
         that moves after the constants were stored.
         depth: understand    practice: arguing from evidence
HARVEST  S55 — "In 050 we asked which errors two points can remove. Here is the answer for this chain,
         measured: all five, until one of them moves."
-->

<!-- FILLED 2026-10-07: drafted from training-overview Day 1 Module 9 and Day 2 Module 4; tutor to review -->

```flow
On Day 1 this lab would have stopped at an ADC code. Today it does not have to.

[[demo]] Coding Bench — the codes from the Electronics Bench fed through the scaling and the two-point
calibration from 050.

So far the scaling assumes a perfect chain, and row 5 says 1.0345 A.

[[ask]] Before we calibrate: which of the five injected errors can a two-point calibration remove?

[[pause]]

[[demo]] Two reference currents through the whole chain, 0 A and 2 A. The codes are 12 and 2557. Two
constants come out, and we apply them to row 5.

[[reveal]] 0.9996 A. All five errors are gone. At the moment of calibration each one was either an
offset, like the in-amp's, or proportional to the reading, and two constants absorb both kinds.

[[demo]] Now let the reference drift another 0.5 % after the constants were stored.

1.0051 A. The error is back. Calibration removes what is stable at the moment you calibrate. It cannot
touch a bend in the line, or anything that moves afterwards.
```

***

## Checking against the Day 1 budget

The final error should land inside the uncertainty window computed in Day 1 · 020. Ideal against
non-ideal, the gap between what the datasheet says and what the firmware reports is the lesson.

<!-- PLAN
SHOW     Plot — the D1·020 budget for this chain as two bands round 1.000 A: worst case ±4.6 % (1 + 1 + 1 +
         0.5 + 1 % plus one count) and RSS ±2.1 %; then the uncalibrated row 5 (+3.4 %), the calibrated
         reading (−0.04 %) and the reading after post-calibration drift (+0.5 %) as points.
         Drive: bands → row 5 → calibrated → drifted. Look for: the uncalibrated number landing between the
         two bands.
         Status: ready (if the room's Day 1 stack-up used other tolerances, put theirs in)
ASK      poe (before the comparison) — "Your Day 1 window is on the screen. Will the uncalibrated final error
         land inside it?"
         options: Inside the RSS band | Inside the worst-case band, outside RSS | Outside both
         answer: Inside the worst-case band, outside RSS
         reveal: row 5 plotted against the bands
         explain: Four of the five errors were injected at full size and in the same direction, which is the
         case the worst-case band is built for and the case RSS treats as unlikely.
         depth: understand    practice: analysing data
HARVEST  S5 — "On Day 1 you built an uncertainty budget and I asked you to keep it. Here it is doing its job:
         the number we earned either lands inside it, or tells us which assumption did not hold."
-->

<!-- FILLED 2026-10-07: drafted from training-overview Day 1 Modules 2 and 9; tutor to review -->

```flow
On Day 1 (020) you stacked the tolerances of this chain and drew an uncertainty window around the
true value.

[[ask]] Put your window on the screen. Will your final error land inside it?

[[pause]]

[[demo]] Here is the budget for this chain: 1 % for the shunt, 1 % for the leads, 1 % for the offset,
0.5 % for settling, 1 % for the reference, and one count of quantization. Worst case, everything lined
up: about ±4.6 %. Root-sum-of-squares: about ±2.1 %.

[[reveal]] The uncalibrated reading, +3.4 %, lands inside the worst-case band and outside the RSS
band. That is not a contradiction. RSS assumes independent errors pointing in random directions. We
injected four of the five at full size and in the same direction, which is exactly the case the
worst-case band is built for.

The calibrated reading, −0.04 %, lands well inside both. The reading after the drift, +0.5 %, is
inside both too, and now we know where it came from.

On Day 1 I asked you to keep this budget. Here it is doing its job: the number we earned either lands
inside it, or tells us which assumption did not hold.
```

***

## The DC pass, closed

The path has now been walked once with a quantity that stands still: every error source located,
quantified and, where it can be, fixed. A number that appears is not the same as a number you have
earned.

<!-- PLAN
SHOW     Draw — the course path drawing complete, each stage lit with the row number that entered there, and
         the thesis written underneath. Status: needs Draw: path drawing, final state (reuse)
ASK      checkpoint (after the statement) — "Look down your table: which single stage moved the reading the
         most?"
         items: largest row found | its place named (organ, pathway, processor) | whether calibration removed it
         explain: In this chain four rows moved it by about 1 % each, so no single stage dominates: the error
         is a sum of small, ordinary things.
         depth: understand    practice: analysing data
HARVEST  S4 — "A number that appears is not a number you have earned. This afternoon we earned one: every
         error located, quantified, and where it could be, fixed, and we can say how far to trust what is
         left."
-->

<!-- FILLED 2026-10-07: drafted from training-overview Purpose ("a number that appears is not the same as a number you have earned"); tutor to review -->

```flow
[[ask]] Look down your table. Which single stage moved the reading the most?

[[pause]]

The path has now been walked once, with a quantity that stands still. Every error source we know of
has been located, quantified, and where it can be, fixed.

In this chain no single stage dominated: four rows each moved the reading by about 1 %. The error was a
sum of small, ordinary things, each of which looked harmless on its own.

Day 1 began with a microcontroller reading 2047, and nothing anywhere saying whether to believe it.
**A number that appears is not the same as a number you have earned.** This afternoon we earned one.
We know what went into it, where each error entered, which ones calibration removed, and how far to
trust what is left.

[[transition]] The DC pass is complete. But everything we have done so far has had one quiet
assumption in it: that the quantity holds still while we measure it. After the break, it starts to
move.
```
