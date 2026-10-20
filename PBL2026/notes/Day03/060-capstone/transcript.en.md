---
includeInExport: false
---

<!-- Restructured from: AC_Metering_System_Simulation_Project.md — §1 Project purpose, §2 Objectives,
     §3 The measurement problem, §4 Architecture, §5 The AC source, §6 The load, §7 Voltage path,
     §8 Current path, §9 Signal conditioning, §10 ADC, §11 Sampling, §12 V/I sampling relationship,
     §13 Digital interface, §14 Microcontroller, §15–17 Codes, RMS voltage and current, §18–23 Power,
     PF, phase and frequency, §24 Calibration, §25 Scaling and engineering units, §26 Non-idealities,
     §27 Simulation views, §28 Core scenarios, §29 Milestones (the build sequence), §30 Final meter,
     §31 Final chain, §32 Engineering questions, §33 Outcome. Condensed into presenter prose.
     Where on the path: all of it. Every stage of the AC pass, built as one instrument, in path order. -->

<!-- Lesson-level script for “Capstone: build an AC power meter”. The words for each slide are in the ```flow
     fence under that card in en.md, and appear on the teleprompter with it. -->

## Where we are on the path

All of it. Every stage of the AC pass, built as one instrument, in path order.

## The arc

1. **From v(t) and i(t) to 230 V, 4.2 A and 0.86 PF** — The quantities we want are not digital numbers; they are a continuously varying voltage and current.
2. **The architecture: two paths, one processor** — Voltage and current each have a sensor and a conditioning path.
3. **The build, in twelve milestones** — Observe the quantities; add sensing; condition; digitize; transfer the data; recover volts and amperes; calculate RMS; calculate power; calculate apparent power and PF; calibrate; stress the system; p
4. **The source and the load** — The source is a nominal 230 V RMS, 50 Hz sinusoid, about 325 V peak.
5. **Sensing voltage and current** — The voltage sensor scales the high-voltage waveform into a small signal, for example ±1.0 V; the current sensor turns 5 A into, for example, ±0.8 V.
6. **Conditioning both paths** — Each path is scaled to fit the ADC range, level-shifted around a bias so the whole waveform stays within the ADC's allowable input range, filtered against unwanted high-frequency components, and buffe
7. **Digitizing: the ADC and sampling** — The ADC turns each conditioned waveform into a sequence of samples: v₁ v₂ v₃ … and i₁ i₂ i₃ … Its resolution, reference, sampling rate, input range, channel architecture, offset, gain error and noise
8. **Voltage and current need a known timing relationship** — Because p_n = v_n · i_n, each voltage sample must belong with its current sample.
9. **Transfer and processing: the interface and the MCU** — The ADC produces the data, the interface determines how it is transferred, and the protocol defines the rules.
10. **Codes to volts and amperes, then RMS** — A raw code is not a voltage: code → ADC voltage → conditioning scale → sensor scale → measured value.
11. **Power, power factor and frequency** — Instantaneous power p_n = v_n · i_n; real power is its average; apparent power is V_RMS · I_RMS; power factor is P / S.
12. **Calibration and engineering units** — First run the meter without calibration.
13. **Stress the meter** — Switch on controlled imperfections — sensor, analog, ADC and timing errors, and changed signal conditions — and run the core scenarios.
14. **The final meter** — The display shows voltage, current, frequency, real power, apparent power and power factor.
15. **Where did every number come from?** — The lesson is not how to build an AC meter.

## What the wall shows

- From v(t) and i(t) to 230 V, 4.2 A and 0.86 PF: Figure — the AC doc §30 meter face, numbers only, waveforms hidden: 230.4 V, 3.21 A, 50.02 Hz, 612 W,
- The architecture: two paths, one processor: Draw — the AC doc §4 architecture, built stage by stage on the Day 1 path diagram: the system splits into
- The build, in twelve milestones: Figure — the twelve milestones (AC doc §29) as a progress bar laid along the path, each milestone under the
- The source and the load: Plot — View 1: v(t) = 325.3·sin(2π·50·t) and i(t) = I_pk·sin(2π·50·t − φ), with φ (resistive 0°,
- Sensing voltage and current: Equation — the two sensor scales: k_V = 1.0 V / 325.3 V ≈ 3.07 mV per volt, and k_I = 0.8 V / I_pk. The AC
- Conditioning both paths: Draw — the capstone voltage path from 020's last card, now with the current path beside it. Then View 3 in
- Digitizing: the ADC and sampling: Coding Bench — View 4 of the ac-meter program: sampling points and codes for both channels, with
- Voltage and current need a known timing relationship: Coding Bench — the ac-meter program on the inductive load (φ = 60°, PF 0.50), its channel architecture
- Transfer and processing: the interface and the MCU: Figure — ADC ⇄ SPI ⇄ Microcontroller, then Digital code → Numerical processing → Engineering value, with
- Codes to volts and amperes, then RMS: Coding Bench — View 5 of the ac-meter program: code → ADC volts → minus the bias → ÷ conditioning scale →
- Power, power factor and frequency: Coding Bench — the power stage of the ac-meter program: p_n = v_n·i_n as View 5's instantaneous power, P as
- Calibration and engineering units: Plot — the Day 2 · 050 calibration view re-used: known DC levels applied to the sensor model as the
- Stress the meter: Coding Bench — the whole ac-meter program: front end (source and load; sensors with offset,
- The final meter: Figure — the AC doc §30 meter face from the first card, now with both waveforms; beside it, the room's own
- Where did every number come from?: Draw — the capstone architecture from the second card, stepped backwards from the display to the mains as

## Learner actions

- From v(t) and i(t) to 230 V, 4.2 A and 0.86 PF: checkpoint (after the statement) — "Before you touch the simulator: write down the path from the mains to
- The source and the load: checkpoint (after the statement) — "Milestone 1. Simulate the voltage and current for the resistive and
- Sensing voltage and current: checkpoint (after the statement) — "Milestone 2. Build both sensor models, with the scaling ratios as
- Conditioning both paths: checkpoint (after the statement) — "Milestone 3. Add scaling, filtering, amplification and level shifting.
- Digitizing: the ADC and sampling: poe (after the statement) — "Milestone 4. Add sampling and quantization. Then drop the sampling rate to 60
- Voltage and current need a known timing relationship: poe (after the statement) — "Take the inductive load and switch from simultaneous to sequential sampling.
- Transfer and processing: the interface and the MCU: checkpoint (after the statement) — "Milestone 5. Put the digital interface between the ADC and the MCU in
- Codes to volts and amperes, then RMS: checkpoint (after the statement) — "Milestones 6 and 7. Convert the codes into volts and amperes, then
- Power, power factor and frequency: checkpoint (after the statement) — "Milestones 8 and 9. Instantaneous and real power, then S and PF. Then
- Calibration and engineering units: checkpoint (after the statement) — "Milestone 10. Introduce errors on both paths, then derive and apply
- Stress the meter: poe (after the statement) — "Scenario 1, a resistive load. Scenario 2, inductive. Scenario 3, capacitive.
- Stress the meter: checkpoint (after the statement; predictions written before each run) — "Scenario 4, noise. 5, a sensor
- The final meter: checkpoint (after the statement) — "Milestone 12. Present your final engineering values."
- Where did every number come from?: checkpoint (after the statement) — "In pairs: pick one number on your meter and walk it back to the mains,

## Hand-off

[[transition]] You have just built a meter that works. For the last half hour, I am going to break some
— and you are going to find out where.
