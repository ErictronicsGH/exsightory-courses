---
includeInExport: false
---

<!-- Restructured from: transcripts/Chapter 02 - Measurement fundamentals.md (from "In electronics,
     measurements mostly begin with sensing" to the end); Chapter 04 - Data domains.md §3 (the sensor
     is an interface to the physical world); Chapter 05 - Interfaces.md §6 (the analog domain);
     05_sensor_classification.md; 07_compensation_techniques.md (insensitive design, opposing inputs).
     Moved elsewhere: the ADC paragraph of Ch02 → 080; negative feedback → 060; filtering → Day 3·020;
     mathematical correction → Day 2·050.
     Where on the path: the sensor — the first stage, where the quantity becomes electrical. -->

<!-- Lesson-level script for “Sensing: from physical quantity to electrical signal”. The words for each slide are in the ```flow
     fence under that card in en.md, and appear on the teleprompter with it. -->

## Where we are on the path

The sensor — the first stage, where the quantity becomes electrical.

## The arc

1. **Our circuits only understand electricity** — Most of the quantities we want to measure are not electrical.
2. **Transducer, sensor, actuator** — A transducer carries information from one physical domain into another.
3. **Transduction is not unit conversion** — A thermocouple is not doing °C → volts the way we do metres → feet.
4. **Transduction can take several stages** — Pressure → deformation → strain → resistance change → voltage.
5. **What a sensor hands you** — Voltage, current, resistance, capacitance, frequency or charge.
6. **Modulating or self-generating** — A modulating sensor only changes how an existing supply flows, so you choose its excitation and its sensitivity.
7. **Detect, or quantify?** — To act when light falls below a threshold, a comparator on the analog signal is enough.
8. **The quantity never arrives alone** — A sensor responds to everything that affects it, not only to what we intend.
9. **Defending the sensor against interference** — Choose sensors and parts that are insensitive to the interference.

## What the wall shows

- Our circuits only understand electricity: Draw — the path drawing focused on its first arrow, QUANTITY → SENSOR, with the eye's organ from 010
- Transducer, sensor, actuator: Draw — input transducer → electronics → output transducer, a sensor and an actuator labelled, the
- Transduction is not unit conversion: Plot — thermocouple output V = S·(T_hot − T_cold) with S ≈ 41 µV/°C (type K near room temperature;
- Transduction can take several stages: Draw — the pressure chain stage by stage: the diaphragm deforms → strain → the gauge's resistance
- Modulating or self-generating: Electronics — a 10 k NTC (thermistor-ntc-10k, B = 3950 K) under a 10 kΩ resistor from the bench
- The quantity never arrives alone: none — the room's answers are the material for the next card.
- Defending the sensor against interference: Draw — the five defences pinned on the path where the course teaches them: insensitive design and

## Learner actions

- Transduction is not unit conversion: poe (before the statement) — "When a thermocouple turns a temperature into a voltage, is it
- What a sensor hands you: flash (at the Flow's [[ask]]) — "A thermistor, a thermocouple, a photodiode, a strain gauge. Which
- Modulating or self-generating: circuit + predict (before step 5's reveal) — "The excitation goes from 3.3 V to 10 V. How much does
- Detect, or quantify?: multi-select (before the statement) — "Which of these need the sensor's signal digitized?"
- The quantity never arrives alone: poll (at the Flow's [[ask]]) — "Sunlight's infrared reaches the sensor too. How would you measure only

## Hand-off

[[transition]] The quantity is now electrical — a voltage, a current, or a resistance waiting to be
excited. But the moment we connect anything to that sensor, we have made a circuit, and the circuit can
change what the sensor says. After the break: the sensor as a source.

## Appendix (parked)

<!-- PARKED: not taught live; kept for reference. -->

**By operating mode.** In **deflection** sensors, the measured quantity produces a physical effect that
generates, in some part of the instrument, a similar but opposing effect related to a useful variable.
A dynamometer measuring force is an example: the force deflects a spring until the spring's force,
proportional to its deformation, balances the applied force. **Null-type** sensors try to prevent
deflection from the null point by applying a known effect that opposes the one produced by the
measured quantity — an imbalance detector plus a means of restoring balance, like a weighing scale to
which known masses are added until the pointer shows no imbalance. Null measurements are usually more
accurate, because the opposing effect can be calibrated against a high-precision standard, and because
they only operate near zero they can be very sensitive. They are, however, slow: even with servo
automation their response is usually not as fast as a deflection system's.

<!-- CHECK: the source note says null-type sensors "do not require any calibration". The opposing
     known effect must itself be calibrated against a standard, as the previous sentence in the
     source says — consider rewording to "the detector itself need not be calibrated, only the
     reference". -->

**By input–output relationship.** Sensors can be classified as zero, first, second or higher order. The
order relates to the number of independent energy-storing elements in the sensor, and it affects
accuracy and speed. It matters when the sensor is part of a closed-loop control system, because
excessive delay can lead to oscillation.

<!-- The original notes reference a figure, image-5.png ("Sensor classifications according to
     different exhaustive criteria"), which is not in transcripts/. -->
