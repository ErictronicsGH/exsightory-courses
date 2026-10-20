---
includeInExport: false
---

<!-- Restructured from: transcripts/Chapter 02 - Measurement fundamentals.md (indirect measurement of
     current, one passage); Chapter 15 - measurement_errors.md (instrument insertion errors, recalled).
     Everything else is a GAP: the transcripts have no material on shunts, Kelvin connection or burden
     voltage. GAP notes follow training-overview.md Day 1 Module 7.
     Where on the path: the sensor again — this time the quantity is a current, and the sensor is a
     resistor. -->

<!-- Lesson-level script for “Current as the quantity: shunts, Kelvin and burden voltage”. The words for each slide are in the ```flow
     fence under that card in en.md, and appear on the teleprompter with it. -->

## Where we are on the path

The sensor again — this time the quantity is a current, and the sensor is a resistor.

## The arc

1. **A shunt turns current into voltage** — Measure the voltage across a known resistance, and Ohm's law gives the current.
2. **Sizing a shunt: signal against disturbance** — A larger shunt gives more signal, and takes more voltage and power from the circuit it measures.
3. **Low side or high side** — Low-side sensing is easy to measure and lifts the load off ground.
4. **The leads are part of the shunt** — When the shunt is milliohms, the resistance of its leads and contacts is comparable to it.
5. **Kelvin: separate the current from the measurement** — Force the current through one pair of connections and sense the voltage with another, which carries almost no current.
6. **Burden voltage: the drop your ammeter inserts** — An ammeter is a shunt too.

## What the wall shows

- A shunt turns current into voltage: Equation — I = V_sh / R_sh, with a worked example: 20 mV across 10 mΩ → 2 A.
- Sizing a shunt: signal against disturbance: Equation — V = I·R and P = I²·R, graphed against R from 1 mΩ to 100 mΩ at I = 2 A, with the signal
- Low side or high side: Electronics — two copies of a 12 V supply driving a 6 Ω load (resistor-power-25, on its heatsink plate: it burns 23.9 W of its 25 W) through a 10 mΩ shunt:
- The leads are part of the shunt: Electronics — four-wire-sensing (the same fixture as the next card), opened on the two-wire meter.
- Kelvin: separate the current from the measurement: Electronics — four-wire-sensing: a precision 1 mA source into a Pt100, two metres of AWG 24
- Burden voltage: the drop your ammeter inserts: Electronics — branch-current re-valued: V1 = 3.3 V, R1 = 66 Ω (a load drawing 50 mA), ammeter A1 on

## Learner actions

- Sizing a shunt: signal against disturbance: numeric ×2 (at the Flow's [[ask]]) — "Two amps through a 10 mΩ shunt. How much signal do you get?"
- Low side or high side: flash (after the SHOW) — "The load's return must stay at system ground, because a sensor shares it.
- The leads are part of the shunt: circuit + predict (at the Flow's [[ask]]) — "A 10 mΩ shunt, measured with two-wire leads. Will the
- Kelvin: separate the current from the measurement: circuit + predict (the fixture's own) — "The two force leads are swapped for ten metres of the same
- Burden voltage: the drop your ammeter inserts: circuit + predict (at the Flow's [[ask]]) — "The meter reads a perfectly sensible current. Is the

## Hand-off

[[transition]] A good shunt gives a small signal — tens of millivolts — and on the high side, that small
signal sits on top of a large voltage. Neither of those is anything an ADC can use directly. The signal
has to be prepared first: conditioning.
