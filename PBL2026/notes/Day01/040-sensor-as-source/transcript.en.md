---
includeInExport: false
---

<!-- Restructured from: transcripts/Chapter 05 - Interfaces.md §4–5 (what an interface is; interfaces
     exist because systems are not automatically compatible); Chapter 07 - Analog to digital
     converters.md (opening paragraphs: output impedance, input impedance, loading, buffering);
     Chapter 03 - Signal conditioning.md (Attenuation; Buffering); Chapter 15 - measurement_errors.md
     (Instrument insertion errors; Dealing with measurement errors — rubric procedure).
     Where on the path: the sensor's output, at the moment something is connected to it. -->

<!-- Lesson-level script for “The sensor as a source: impedance, dividers and loading”. The words for each slide are in the ```flow
     fence under that card in en.md, and appear on the teleprompter with it. -->

## Where we are on the path

The sensor's output, at the moment something is connected to it.

## The arc

1. **Connecting anything makes an interface** — An interface is where two parts of a system meet, and the means by which information, energy or signals cross between them.
2. **Two voltages are not automatically compatible** — A 0–100 mV sensor and a 0–3.3 V ADC both deal in volts.
3. **What impedance means** — Impedance is the effective opposition a circuit presents to a changing signal.
4. **Every source has an output impedance** — A sensor and its excitation behave like an ideal source behind an output impedance.
5. **Loading: the measurement changes the measurand** — If connecting the input changes the source's voltage, you are no longer measuring the original signal.
6. **High in, low out** — Instruments want a high input impedance and sources want a low output impedance.
7. **Attenuation: making a large signal smaller** — A signal too large for the next stage is scaled down by a known factor, and the firmware multiplies that factor back in later.
8. **A divider that does not lie to the ADC** — The divider sets the ratio.
9. **Buffering: drive without disturbing** — A buffer presents a light load to the source and drives the next stage itself.

## What the wall shows

- Connecting anything makes an interface: Draw — the path drawing focused on the boundary after SENSOR, labelled "interface: what does each
- Two voltages are not automatically compatible: none.
- What impedance means: Electronics — a 10 V supply behind a 1 kΩ resistor standing in for a source's own impedance, driving a
- Every source has an output impedance: Draw — the 10 k NTC and its 10 kΩ excitation resistor from 030, redrawn step by step: the supply and
- Loading: the measurement changes the measurand: Electronics — divider-loading (Demo #1): 10 V across R1 and R2, 1 MΩ each; probe VP1 on MID;
- High in, low out: Equation — V_read = V_s·R_in/(R_in + R_s), graphed against R_s from 100 Ω to 10 MΩ as a family for
- Attenuation: making a large signal smaller: Equation — V_out = V_in·R2/(R1 + R2), rearranged to what the firmware does: V_in = V_out·(R1 + R2)/R2.
- A divider that does not lie to the ADC: Electronics — three dividers of the same ratio on 12 V: 2.7 k/1 k, 27 k/10 k and 270 k/100 k, each with
- Buffering: drive without disturbing: Electronics — the loaded divider from the loading card (1 M/1 M on 10 V, the 10 MΩ handheld), then a

## Learner actions

- Two voltages are not automatically compatible: multi-select (at the Flow's [[ask]]) — "A 0–100 mV sensor straight into a 0–3.3 V ADC. Both deal in
- Every source has an output impedance: numeric (before the drawing's last step) — "At 25 °C, what output impedance does the 10 k thermistor
- Loading: the measurement changes the measurand: circuit + predict (before the reveal) — "The divider is two equal resistors on ten volts. What does
- A divider that does not lie to the ADC: numeric (at the Flow's [[ask]]) — "What is the largest ratio R2/(R1 + R2) that keeps 12 V inside a
- A divider that does not lie to the ADC: checkpoint (straight after) — "Design it": 1 pick R1 and R2 for your ratio · 2 compute what the next

## Hand-off

[[transition]] So far the sensor has handed us a voltage. But many of the quantities we care about are
currents, and to measure a current we have to put something *in* its path — which makes loading
impossible to avoid. How we choose to lose is the next module.
