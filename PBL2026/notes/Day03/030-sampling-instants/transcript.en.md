---
includeInExport: false
---

<!-- Restructured from: AC_Metering_System_Simulation_Project.md §11 Sampling and §26 (timing errors);
     training-overview.md Day 2 Module 5 and "Everything here is simulated" (GAP notes). No lecture
     transcript yet.
     Where on the path: conversion, but this time the question is *when* the converter looks, not how
     often. The signal is conditioned and filtered; now the instants at which it is sampled decide
     whether the samples mean what the firmware thinks they mean. -->

<!-- Lesson-level script for “Sampling instants: timing and jitter”. The words for each slide are in the ```flow
     fence under that card in en.md, and appear on the teleprompter with it. -->

## Where we are on the path

Conversion, but this time the question is *when* the converter looks, not how often. The signal is conditioned and filtered; now the instants at which it is sampled decide whether the samples mean what the firmware thinks they mean.

## The arc

1. **When you sample matters as much as what you sample** — The ADC does not observe every instant; it takes samples at discrete time intervals.
2. **Uneven spacing looks like noise** — A sample interval that varies with whatever else the loop is doing produces an error that is indistinguishable from noise.
3. **Jitter error and averaging** — Jitter error is signal-dependent, so it does not average away the way independent noise does.
4. **Hardware-paced conversion is the fix** — Let the hardware, not the loop, pace each conversion, so the interval no longer depends on whatever else the code is doing.

## What the wall shows

- When you sample matters as much as what you sample: Draw — a timeline of the loop: "read ADC", "print", "check button" as blocks of different widths (the
- Uneven spacing looks like noise: Plot — a 50 Hz, 1 V sine sampled at fs = 2 kHz, two staircases: at the intended instants,
- Jitter error and averaging: Coding Bench — a sampling loop on a simulated 50 Hz, 1 V sine at a nominal 200 µs interval, computing RMS
- Hardware-paced conversion is the fix: Equation — error ≈ 2πf·A·Δt, the worst-case error of a sample taken Δt late, at the zero crossing;

## Learner actions

- When you sample matters as much as what you sample: poe (after the statement) — "Your loop reads the ADC, prints a value, checks a button, then reads the ADC
- Uneven spacing looks like noise: poll (after the statement) — "If you only had the numbers, and not this picture, what would you have
- Jitter error and averaging: poe (before the statement) — "On Day 2 averaging beat noise down. So average many readings: does the
- Hardware-paced conversion is the fix: checkpoint (after the statement) — "Think of a project you have built that samples from a loop. What

## Hand-off

[[transition]] So now the samples are evenly spaced, the converter is looking at the right rate and at
the right instants, and a stream of honest numbers is arriving in firmware. The next stage of the path
is what the firmware does with them, and the first thing we want from an AC signal is its true RMS.
