---
includeInExport: false
---

<!-- Restructured from: AC_Metering_System_Simulation_Project.md §6 The load, §12 Voltage and current
     sampling relationship, §18 Instantaneous power, §19 Real power, §20 Apparent power, §21 Power factor,
     §22 Phase relationship, §28 Scenario 8;
     transcripts/Chapter 07 - Analog to digital converters.md "Multiplexed inputs";
     training-overview.md Day 3 Module 5 (GAP notes for reactive power, the live phase computation, and
     correcting for the delay).
     Where on the path: firmware again, but now with two channels. Voltage and current are both
     converted, and the firmware multiplies them, so the timing between the two conversions becomes part
     of the number. -->

<!-- Lesson-level script for “Power on an MCU: real, reactive, and the phase-error trap”. The words for each slide are in the ```flow
     fence under that card in en.md, and appear on the teleprompter with it. -->

## Where we are on the path

Firmware again, but now with two channels. Voltage and current are both converted, and the firmware multiplies them, so the timing between the two conversions becomes part of the number.

## The arc

1. **Why V × I stops being power once phase enters** — Real power depends on voltage and current at corresponding points in time.
2. **Real, reactive and apparent power** — Real power is the average of the instantaneous power, in watts.
3. **Power factor is P / S — and only sometimes cos φ** — Power factor is P / S.
4. **One converter, many inputs, at different times** — A four-channel multiplexed ADC is one conversion system connected to four inputs at different times, not four ADCs converting simultaneously.
5. **Sequential sampling is a phase error** — A muxed ADC samples voltage and current sequentially.
6. **The fixes: sample together, or correct for the delay** — An ADC system with independent conversion engines can acquire voltage and current at the same instant.

## What the wall shows

- Why V × I stops being power once phase enters: Plot — v(t) = √2·sin(ωt) and i(t) = √2·sin(ωt − φ) (1 V and 1 A RMS) over two cycles of 50 Hz, and
- Real, reactive and apparent power: Draw — start from the existing waveform-construction drawing (a phasor drawing a sine); add a current
- Power factor is P / S — and only sometimes cos φ: Plot — v = √2·sin(ωt) and a distorted current i = √2·(sin(ωt) + h·sin(3ωt))/√(1 + h²) (1 A RMS for every
- One converter, many inputs, at different times: Figure — Day 1's four sensors → MUX → one sample-and-hold → ADC, re-embedded, with a timeline under it:
- Sequential sampling is a phase error: Plot — the power factor a sequential (V, then I) sampler reports, against frequency f
- The fixes: sample together, or correct for the delay: Coding Bench — the power program on the inductive load with the mux delay on (PF 0.527); then with the

## Learner actions

- Why V × I stops being power once phase enters: poe (before the statement) — "An inductive load: the current lags the voltage. Is V_RMS × I_RMS the power
- Power factor is P / S — and only sometimes cos φ: poe (before the statement) — "A nonlinear load distorts the current waveform. Can we still get its power
- One converter, many inputs, at different times: numeric (after the statement) — "An ADC performs 10,000 conversions per second and shares them equally
- Sequential sampling is a phase error: numeric (after the statement) — "Use the multiplexer we just met. How far apart in time are the voltage and
- Sequential sampling is a phase error: poe (after the statement) — "Before the sweep: what happens to that error at a higher frequency?"
- The fixes: sample together, or correct for the delay: checkpoint (after the statement) — "Your MCU has one ADC and a mux. Which fix is open to you, and what do

## Hand-off

[[transition]] We now have every stage of the AC path: the quantity, getting at it safely, ground and
wiring, bias and anti-alias, sampling rate and sampling instants, RMS, and power with the timing between
two channels. After the break we stop studying the stages one at a time and build the whole path as one
instrument.
