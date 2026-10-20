---
includeInExport: false
---

<!-- Restructured from: AC_Metering_System_Simulation_Project.md §14 Microcontroller, §15 Converting ADC
     codes to electrical values, §16 RMS voltage, §17 RMS current;
     transcripts/Chapter 14 - what_is_average.md "Integrated average" paragraph;
     training-overview.md Day 2 Modules 6 and 8, and "Purpose" (GAP notes).
     Where on the path: firmware. The samples are evenly spaced and arriving; the firmware now computes
     the number that describes a moving quantity, and we reconcile it with the meter on the bench. -->

<!-- Lesson-level script for “True RMS on an MCU vs on a meter”. The words for each slide are in the ```flow
     fence under that card in en.md, and appear on the teleprompter with it. -->

## Where we are on the path

Firmware. The samples are evenly spaced and arriving; the firmware now computes the number that describes a moving quantity, and we reconcile it with the meter on the bench.

## The arc

1. **Accumulate squares, divide, root** — The firmware converts each code to volts, squares every sample, averages the squares and takes the square root.
2. **Over a whole number of cycles** — The sum of squares is taken over a whole number of cycles of the waveform.
3. **The integrated average** — The integrated average is the area under the curve divided by the interval it is taken over.
4. **An average-responding meter assumes a sine** — An average-responding meter rectifies, averages, and scales by a constant that assumes a sine.
5. **On PWM, the meter is wrong by a predictable amount** — On the PWM and switch-mode waveforms embedded work is full of, the average-responding meter is simply wrong, and by a predictable amount, because its sine constant no longer applies.
6. **Coupling and DC offset** — A waveform can carry a DC component as well as an AC one.
7. **Your firmware can be more accurate than your multimeter** — Your firmware can be more accurate than your multimeter, and now you can prove which one to trust.

## What the wall shows

- Accumulate squares, divide, root: Coding Bench — the true-RMS routine on a buffer of 12-bit codes from the capstone's voltage path (3.3 V
- Over a whole number of cycles: Plot — the RMS a firmware window reports, against the window's length W in cycles (0.5 → 3), for
- The integrated average: Draw — the existing half-wave-mean drawing: half a sine, the area under it, and that area as a rectangle of
- An average-responding meter assumes a sine: Equation — the meter's reading = 1.11 × rectified mean, beside the form factor FF = V_RMS / rectified mean,
- On PWM, the meter is wrong by a predictable amount: Plot — a 0/V PWM wave (V = 1) in two views. Top: the waveform over two periods,
- Coupling and DC offset: Equation — V_RMS = √(V_DC² + V_AC,RMS²), with V_DC as the slider (0 → 1.65 V) and V_AC,RMS = 0.707 V;
- Your firmware can be more accurate than your multimeter: Figure — two handheld meters' front panels, one marked TRUE RMS and one not; then the AC specification of

## Learner actions

- Accumulate squares, divide, root: numeric (after the statement) — "The buffer starts 2048, 2432, 2778. Each sample in volts is
- Over a whole number of cycles: poe (before the statement) — "I compute the RMS of a clean sine over exactly one cycle, then over one and a
- An average-responding meter assumes a sine: flash (after the statement) — "Quick recall from Day 2: for which waveform is 0.707 the right constant?"
- On PWM, the meter is wrong by a predictable amount: poe (before the statement) — "The same PWM waveform goes into our firmware's true RMS and into an
- Coupling and DC offset: poe (after the statement) — "Our ADC signal sits on a 1.65 V bias. If the firmware squares the samples
- Your firmware can be more accurate than your multimeter: checkpoint (after the statement) — "Your MCU and your meter disagree on a PWM-driven load. In two

## Hand-off

[[transition]] One channel, one number we can defend. But a meter that only knows voltage cannot tell
you what the load is doing with it. For that we need a second channel, current, sampled alongside the
first, and the moment there are two channels, *when* each one is sampled comes back to bite us.
