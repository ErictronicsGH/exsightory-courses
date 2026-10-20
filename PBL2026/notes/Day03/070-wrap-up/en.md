---
targetMinutes: 35
motivates: Something on the bench reads wrong and nothing says what — where along the path do you start looking?
objectives:
  - Diagnose a wrong reading systematically, stage by stage along the path, instead of by guesswork.
  - Use the one-page diagnostic checklist to question any measurement chain, from the quantity to the number.
concepts: []
---

# Wrap-up: staged faults, the checklist and Q&A

<!-- PATH: [ QUANTITY → SENSOR → SOURCE & LOADING → CONDITIONING → ADC INPUT → CONVERSION → REFERENCE
         → DIGITAL INTERFACE → FIRMWARE → NUMBER ] — the whole path, walked backwards from a wrong number.
     TOOL: the benches already used — Electronics (divider-loading, Day 1 · 040; four-wire-sensing, Day 1 · 050),
           Coding Bench (oversampling, Day 2 · 040), Plot (sampled staircase, Day 3 · 020; PF against Δt, Day 3 ·
           050) — plus Figure (the checklist and the parked list, assets) and Draw (the Day 1 path diagram).
     SOURCES: training-overview.md Purpose, learning outcome 10, Day 3 Module 7;
              course-organization.md §2 (module titles, for the checklist). -->

## Staged faults, presented cold

Four or five broken measurements, across the tools we have used. The room diagnoses each one live; the
tutor drives the simulator and answers only direct questions.

<!-- PLAN
SHOW (centrepiece) Five staged faults, each rebuilt on the bench where it was taught, shown with only the setup and
         the wrong reading; the presenter drives, the room asks for measurements.
         F1 · Electronics, divider-loading (Day 1 · 040). 10 V across two 1 MΩ resistors; the "ADC" (a 10 MΩ meter
            profile) across the lower one reads 4.76 V, not 5.00 V. Stage: source & loading (pathway).
            Diagnostic: "does the reading change when the instrument's input impedance changes?" — swap the
            profile 10 MΩ → 10 GΩ and it reads 5.00 V.
         F2 · Electronics, four-wire-sensing (Day 1 · 050). A 10 mΩ shunt read two-wire reports 2.4 A for a 2.0 A
            load (2 mΩ of lead and contact in series). Stage: sensor, current → voltage (organ). Diagnostic:
            "does the reading change with lead length?" — turn the lead-length dial, then go four-wire.
         F3 · Coding Bench, oversampling (Day 2 · 040). 256-sample averaging promised four extra bits, but the
            result never leaves a whole code. Stage: firmware (processor), its cause a signal too quiet to
            oversample. Diagnostic: "is there at least an LSB of noise on the input?" — add dither and the extra
            bits appear.
         F4 · Plot, sampled staircase (Day 3 · 020). A meter on a 50 Hz supply reads a steady 10 Hz. Stage:
            conditioning and sampling (no anti-alias filter, f_s = 60 S/s). Diagnostic: "does the reading move
            when the sample rate changes?" — at 70 S/s it reads 20 Hz; a real component would stay put.
         F5 · Plot, PF against Δt (Day 3 · 050). PF reads 0.53 on a load known to be 0.50 inductive, and 0.47 on
            an equal capacitive one. Stage: conversion, two channels at different times (processor). Diagnostic:
            "does the error flip sign with the direction of the shift, and grow with frequency?" — it does: a fixed
            V-to-I delay, 1.8° at 50 Hz.
         Drive: one fault at a time; the room commits to a stage before any question; the room names the
         measurement, the presenter makes it.
         Look for: every fault is found by a measurement that changes one thing, not by looking harder.
         Status: ready (F1, F2 on existing circuits; F4, F5 on the Day 3 Plots); F3 needs Coding Bench:
                 oversampling (Day 2 · 040). Reserves: an over-compensated probe (Plot, Day 3 · 010); a 2 mV offset
                 at a gain of 500 taking a third of the range (Equation, Day 1 · 060).
ASK      poe (before the statement, once per fault) — "Here is the setup and here is the reading. Where on the path
         is the fault?"
         options: sensor | source & loading | conditioning | ADC input & sampling | conversion & reference | firmware
         answer: F1 source & loading | F2 sensor | F3 firmware | F4 ADC input & sampling | F5 conversion &
                 reference
         reveal: the diagnostic measurement for that fault, made on its bench
         explain: the measurement that moves the reading points to the stage, because only a fault at that stage
                  depends on what was changed.
         depth: understand    practice: planning investigations
HARVEST  S3 — "On the first morning: three places information is spoiled — the organ, the pathway, the processor.
         Before you name a stage, say which of the three it is in. You have just found faults in all three."
-->

<!-- FILLED 2026-10-07: drafted from training-overview Day 3 Module 7, with faults taken from Day 1 · 040 and 050, Day 2 · 040 and Day 3 · 020 and 050; tutor to review.
     Was: GAP — no transcript yet. Needs (training-overview Day 3 Module 7): four or five broken measurements presented cold across the tools already used, diagnosed live by the room, with the tutor driving the simulator and answering only direct questions. Choose faults that sit at different stages of the path and on different days, and present each with only the setup and the wrong reading. -->

```flow
We have built the meter. Now I am going to break things.

Five faults, each on a bench you have already used. For each one you get the setup and the reading, nothing
else. Before you ask me anything, commit to a stage of the path, and say which of Day 1's three places it is
in: the organ, the pathway or the processor.

[[demo]] Fault 1 — the setup and the reading. Nothing else.

Electronics bench. Ten volts across two equal 1 MΩ resistors. The ADC, across the lower one, reads 4.76 V.

[[ask]] Where on the path is the fault? Commit to a stage before you ask me anything.

[[pause]]

I will drive. You tell me what to change, what to probe, what to plot. I will answer direct questions
only.
[[reveal]] The measurement that settles it: change the instrument's input impedance. Swap the 10 MΩ meter for
a 10 GΩ one, and the reading goes to 5.00 V. The source and its loading: the pathway.

[[demo]] Fault 2 — a 10 mΩ shunt, read with two wires. The load draws 2.0 A. The firmware reports 2.4 A.

[[ask]] Where is it?

[[pause]]

[[reveal]] Turn the lead-length dial, and the reading moves. Two milliohms of lead and contact sit in series
with the shunt, and a two-wire measurement cannot tell them apart. The sensor itself, the current-to-voltage
stage: the organ. Four wires fix it.

[[demo]] Fault 3 — Coding Bench. Averaging 256 samples should buy four extra bits. The result never leaves a
whole code.

[[ask]] Where is it?

[[pause]]

[[reveal]] Look at the input: there is less than an LSB of noise on it, and oversampling needs some. Add dither,
and the extra bits appear. It shows in the firmware, the processor, but its cause is a signal too quiet for
what the firmware asked of it.

[[demo]] Fault 4 — Plot. A meter on a 50 Hz supply reads a steady 10 Hz.

[[ask]] Where is it?

[[pause]]

[[reveal]] Change the sample rate from 60 to 70 samples a second. The reading jumps to 20 Hz. A real
component would have stayed where it was; an alias moves with the sample rate. The rate is too slow for the
signal, and nothing in front of the ADC stops what it cannot represent.

[[demo]] Fault 5 — Plot. On a load we know is 0.50 inductive, the meter reads a power factor of 0.53. On an
equal capacitive load, 0.47.

[[ask]] Where is it?

[[pause]]

[[reveal]] The error flips sign with the direction of the phase shift, and it grows with frequency. That is a
fixed delay between the voltage and current samples: 100 µs, 1.8° at 50 Hz. The conversion stage, two
channels converted at different times.

Every one of these was found the same way: by changing one thing and watching the reading, not by staring
harder at the number.
```

***

## The diagnostic checklist

One line per module across three days, each a question you can ask of any measurement, in the order
the signal travels the path. Read through whole, it is how to diagnose a wrong reading instead of
guessing.

<!-- PLAN
SHOW     Figure — the one-page checklist (the 23 lines in the Flow), with a tour that spotlights, for each staged
         fault just solved, the line that would have caught it.
         Status: needs asset: the checklist as SVG or PDF, each line a named part (also the participants' handout)
ASK      checkpoint (after the statement) — "Go back to the faults we just diagnosed. Which line would have caught
         each one?"
         items: F1 → line 4 (the sensor as a source) | F2 → line 5 (current as the quantity) | F3 → line 13
                (oversampling) | F4 → line 20 (conditioning AC) | F5 → line 23 (power)
         depth: use    practice: arguing from evidence
HARVEST  S3 — "Every line on this page asks about one of the same three places — the organ, the pathway, the
         processor. The checklist just names what to look for in each."
-->

<!-- FILLED 2026-10-07: drafted from training-overview Day 3 Module 7 and learning outcome 10; tutor to review.
     Was: GAP — no transcript yet. Needs (training-overview Day 3 Module 7 and learning outcome 10): the diagnostic checklist, built one line per module across three days, now read through whole. It is also the one-page checklist participants receive. Draft skeleton below, one line per module in path order, each drawn from that module's description in training-overview.md. -->

<!-- DRAFT: tutor to confirm wording -->

<!-- No overview description for this module (it is new in course-organization.md §3); line drawn from
        course-organization.md. -->

```flow
[[demo]] The checklist, on one page.

Over three days, every module left one question behind. Here they are together, in the order we walked the
path: once with a quantity that stood still, once with one that moved. It is the page you take home.

**Day 1 — from quantity to code**

1. *Your MCU reads 2047* — Can I trace this number back to the quantity, and say what each stage did to
   it?
2. *The measurand, and what "right" means* — What uncertainty window should this reading land in, once
   the tolerances along the chain and the meter's ±(% of reading + counts) are stacked?
3. *Sensing* — Does the sensor turn the quantity I want into the electrical signal I think it does?

4. *The sensor as a source* — Is the source impedance low compared with what loads it, and does my
   divider feed the ADC without lying to it?
5. *Current as the quantity* — Is the shunt sized as a trade between signal and disturbance, are lead and
   contact resistance removed with a Kelvin connection, and is my own meter's burden voltage disturbing
   the circuit?
6. *Signal conditioning* — How much of my ADC range does the amplified offset consume, and is the CMRR
   good enough for the common-mode voltage?
7. *The ADC input* — Did the source settle in the acquisition window?
8. *Conversion* — How many bits are effective, as distinct from the bit count, and what do the datasheet's
   offset, gain, INL and DNL add?
9. *The reference voltage* — What is the code a ratio to, how good is that reference, and could this
   measurement be ratiometric?

**Day 2 — from code to number, then time enters**

10. *The code leaves the converter* — Is every digital input defined, not floating, and is the pull-up
    chosen for edge rate against drive current?
11. *External ADCs* — Do the architecture, the PGA, the input impedance at this gain setting and the
    data-rate-versus-noise table fit my signal?
12. *Noise* — Where do the unstable last digits come from: the thermal floor of a high-Z node, or
    switching noise and return current in a shared impedance?
13. *Oversampling* — Is there at least an LSB of noise for oversampling to work, and what latency does my
    filter cost?
14. *Scaling and calibration* — Are offset and gain calibrated out, and does the conversion arithmetic
    keep its precision — order of operations, intermediate overflow, floating point with no FPU?
15. *The DC lab* — Does the final error land inside the uncertainty window I computed at the start?
16. *AC as the quantity* — Is the constant I am using valid for this waveform's shape, and what is its
    crest factor?
17. *Isolation and safety* — Is there galvanic isolation where it belongs, and is the meter's CAT rating
    right for where I am measuring?
18. *Ground* — Is the ground I measure from really zero, is return current making voltage in it, is there
    a loop, and should I be measuring differentially?

**Day 3 — the AC chain**

19. *Parasitic C and L* — Is what I see the circuit, or the probe — its compensation, the cable's
    capacitance, the leads' inductance and loop area?
20. *Conditioning AC* — Is the AC biased into range, and is everything that could alias filtered out
    before the ADC?
21. *Sampling instants* — Are the samples evenly spaced — paced by hardware, not by the loop?
22. *True RMS* — Is the RMS computed over a whole number of cycles, and is my meter true-RMS or
    average-responding?
23. *Power* — Were voltage and current sampled at the same instant, or is the delay between them a phase
    error in my power factor?

[[ask]] Go back to the faults we just diagnosed. Which line would have caught each one?
[[pause]]

[[reveal]] Fault 1, line 4: the sensor as a source. Fault 2, line 5: current as the quantity. Fault 3, line 13:
oversampling. Fault 4, line 20: conditioning AC. Fault 5, line 23: power.

Every line on this page asks about one of the same three places: the organ, the pathway, the processor. The
checklist just names what to look for in each.
```

***

## Questions, including the parked list

The questions parked over three days come back now, with whatever the room still wants to ask.

<!-- PLAN
SHOW     Figure — the parked-questions list kept across the three days, one named part per question, so the chosen
         one is spotlighted while it is answered.
         Status: needs asset: the parked list (kept live over the three days; export it as SVG or PDF on the morning
                 of Day 3)
ASK      poll (after the statement) — "Here is everything we parked. Which do you want answered first?"
         options: one per parked question
         depth: understand    practice: asking questions
ASK      qa — the floor opens once the parked list is done.
-->

<!-- FILLED 2026-10-07: drafted from training-overview Day 3 Module 7; tutor to review.
     Was: GAP — no transcript yet. Needs (training-overview Day 3 Module 7): closing Q&A, including the parked-questions list kept across the three days. Put the list on screen and let the room choose the order. -->

```flow
Over three days we parked questions that would have taken us off the path at the time. They come back now.

[[demo]] The parked list.

[[ask]] Here is everything we parked. Which do you want answered first?
[[pause]]

We take them in the order you voted, as many as the time allows. Then the floor is open.
```

***

## A number that appears is not a number you have earned

The code runs and the number appears, but almost none of the places it can go wrong announce
themselves. You can now trace a number back along the path, and say how much of it to believe.

<!-- PLAN
SHOW     Draw — the Day 1 path diagram (Day 1 · 010, "The path a measurement travels") drawn once more, each stage
         now carrying the checklist lines that question it, ending where Day 1 began: 2047.
         Status: needs Draw: the Day 1 path drawing, final state with checklist line numbers
ASK      checkpoint (after the statement) — "Your MCU reads 2047. What is that? Write down the first three
         questions from the checklist that you would ask."
         items: three questions, in path order | the stage each one questions
         depth: create    practice: asking questions
HARVEST  S4 — "A number that appears is not the same as a number you have earned. On the first morning that was a
         warning. Now it is a procedure."
-->

<!-- FILLED 2026-10-07: drafted from training-overview Purpose; tutor to review.
     Was: GAP — no transcript yet. Needs (training-overview Purpose): close on the thesis. The chain from a physical quantity to a value in a variable has a dozen places to lose accuracy — source impedance, acquisition time, reference drift, offset, noise, sampling jitter, firmware maths — and almost none of them announce themselves. The code runs. The number appears. It is wrong by 8 %, and nothing anywhere reports an error. The thesis in one sentence: **a number that appears is not the same as a number you have earned.** -->

```flow
We started on Day 1 with a microcontroller that read 2047 and a room that could not say what it was.

The chain from a physical quantity to a value in a variable has a dozen places to lose accuracy: source
impedance, acquisition time, reference drift, offset, noise, sampling jitter, the firmware's maths. Almost none
of them announce themselves. The code runs. The number appears. It can be wrong by 8 %, and nothing anywhere
reports an error.

[[demo]] The path from Day 1, drawn once more, each stage now carrying the checklist lines that question it.

A number that appears is not the same as a number you have earned. On the first morning that was a warning.
Now it is a procedure.

[[ask]] Your MCU reads 2047. What is that? Write down the first three questions from the checklist that
you would ask.

[[transition]] That is the path, walked twice: once with a quantity that stood still, and once with one
that moved. Take the checklist with you. The next time a number appears on your bench, before you
believe it, ask it where it came from.
```
