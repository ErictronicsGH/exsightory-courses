---
includeInExport: false
---

<!-- Restructured from: transcripts/Chapter 07 - Analog to digital converters.md (opening paragraphs on
     loading — recalled from 040; the ATmega328P's sample-and-hold sentence; Multiplexed inputs);
     Chapter 15 - measurement_errors.md (Dynamic errors).
     Moved elsewhere from the multiplexer section: the per-channel sample rate and the sequential
     V-and-I sampling trap → Day 3·050; differential inputs through the multiplexer (ADS1115) → Day 2·020.
     GAPs: almost everything — training-overview Day 1 Module 4 describes it in full.
     Where on the path: the ADC's input pin — the last analog thing the signal meets. -->

<!-- Lesson-level script for “The ADC input: sample-and-hold and acquisition time”. The words for each slide are in the ```flow
     fence under that card in en.md, and appear on the teleprompter with it. -->

## Where we are on the path

The ADC's input pin — the last analog thing the signal meets.

## The arc

1. **The ADC input is a switch and a capacitor** — To convert a voltage, the ADC first holds it still.
2. **The capacitor has to charge in time** — The switch closes for a fixed acquisition window.
3. **A source that cannot settle reads low** — If the capacitor has not reached the input voltage when the switch opens, the ADC converts what it has.
4. **Faster makes it worse** — Speeding up the ADC shortens the acquisition window.
5. **One capacitor, many inputs** — A multi-channel ADC is usually one conversion system with a multiplexer in front of it, connected to each input in turn.
6. **The maximum source impedance** — Given the sampling capacitance, the switch resistance, the acquisition time and the accuracy you want, you can compute the largest source impedance that still settles.
7. **Fix one: a longer acquisition time** — If the MCU lets you configure the sampling time, give the capacitor longer to charge.
8. **Fix two: a buffer** — An op-amp buffer gives the sampling capacitor a low-impedance source, whatever is behind it.

## What the wall shows

- The ADC input is a switch and a capacitor: Draw — inside the pin: pad → multiplexer switch → R_on (1 kΩ) → C_s (10 pF) → comparator; under it the
- The capacitor has to charge in time: Plot — Demo #2, the switched-capacitor sampler, as two linked plots. (a) v_C(t) =
- A source that cannot settle reads low: Plot — the centrepiece, at the two divider impedances.
- Faster makes it worse: Plot — the centrepiece, window slider only.
- One capacitor, many inputs: Draw — four sensors → analog MUX → one S/H → one converter; the switch arm stepping from input to
- The maximum source impedance: Equation — t_acq = (R_s + R_on)·C_s·ln(2^(N+1)), solved for R_s and graphed against t_acq; worked
- Fix one: a longer acquisition time: Equation and Plot — as above.
- Fix two: a buffer: Electronics (ideal) — the 100 k / 100 k divider → op-amp follower → ADC-input block at the full rate

## Learner actions

- The ADC input is a switch and a capacitor: poe (before the statement) — "To your divider, what does an MCU's ADC input look like?"
- A source that cannot settle reads low: poe (at the Flow's [[ask]]; a circuit + predict once the ADC block exists) — "The same divider ratio on
- Faster makes it worse: poe (at the Flow's [[ask]]) — "You raise the sample rate. Does the reading go up, go down, or stay the
- The maximum source impedance: numeric (at the Flow's [[ask]]) — "12 bits, C_s = 10 pF, R_on = 1 kΩ, a 1 µs window, settling to
- Fix one: a longer acquisition time: numeric (before the reveal) — "The 100 k / 100 k divider, a 50 kΩ source. How long must the window be
- Fix two: a buffer: multi-select (after the reveal) — "A 100 k / 100 k divider must be read at 200 kS/s, with 1 µs of

## Hand-off

[[transition]] The capacitor now holds the right voltage. What the converter does with it — how a
held voltage becomes a number, and how many of that number's bits you can believe — is next.
