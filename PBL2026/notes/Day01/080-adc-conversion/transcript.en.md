---
includeInExport: false
---

<!-- Restructured from: transcripts/Chapter 06 - Data conversion.md (The ADC: crossing from analog to
     digital; §9 Sampling; §10 Quantization); Chapter 07 - Analog to digital converters.md (opening;
     What an ADC actually does; Sampling; Quantization; Resolution; How the ADC performs the
     conversion; From analog signal to digital data); Chapter 02 - Measurement fundamentals.md (the ADC
     paragraph); Chapter 13 - factors_in_making_measurements.md (Resolution);
     Chapter 15 - measurement_errors.md (quantization error, under Characteristic static errors).
     Moved elsewhere from Chapter 07: Input bandwidth → Day 3·020; Reference voltage and input range →
     090; multiplexed inputs → 070 and Day 3·050; the three-device comparison and selection checklist →
     Day 2·020. The aliasing pointer in Ch07 → Day 3·020.
     GAPs: SAR/sigma-delta animation; INL/DNL/offset/gain (moved here from Day 1 Module 2); ENOB.
     Where on the path: inside the converter — the held voltage becomes a code. -->

<!-- Lesson-level script for “Conversion: sampling, quantization, architecture and ENOB”. The words for each slide are in the ```flow
     fence under that card in en.md, and appear on the teleprompter with it. -->

## Where we are on the path

Inside the converter — the held voltage becomes a code.

## The arc

1. **When, and which level** — Sampling decides when the converter looks: it divides time into observation points.
2. **Resolution: how many levels** — An n-bit converter has 2ⁿ levels spread across its input range.
3. **Quantization error is a floor** — Every voltage between two levels is reported as one of them.
4. **More bits are not more accuracy** — Resolution says how finely the converter can divide its range.
5. **SAR: a binary search** — A successive-approximation converter compares the held voltage with a trial level, keeps or drops each bit, and narrows the range until every bit is decided.
6. **Sigma-delta: fast and coarse, then filtered** — A sigma-delta converter samples far faster than its output rate, shapes its noise, and filters digitally to reach high resolution for slow signals.
7. **The table everyone scrolls past** — An ADC datasheet lists offset error, gain error, INL and DNL.
8. **ENOB: the honest number of bits** — With real noise and distortion present, a converter behaves like one with fewer bits.

## What the wall shows

- When, and which level: Plot — one slow waveform with its sampled-and-held version v(floor(t·f_s)/f_s) and its quantized
- Resolution: how many levels: Equation — LSB = range / 2^N, with an N slider; worked examples: 8 bits on 10 V → 39.06 mV; 12 bits
- Quantization error is a floor: Plot — the quantizer staircase q·round(x/q) and its error sawtooth x − q·round(x/q), x from
- SAR: a binary search: Draw — SAR's binary search for a 4-bit converter, Vref 3.3 V, input 2.17 V: trial 1000 (1.650 V) keep;
- Sigma-delta: fast and coarse, then filtered: Coding Bench — a first-order sigma-delta modulator: an input (say 0.30 of full scale) in, the 1-bit
- The table everyone scrolls past: Figure — the ADC accuracy table from a real MCU datasheet (offset error, gain error, INL, DNL, absolute
- ENOB: the honest number of bits: Equation — ENOB = (SINAD − 1.76 dB) / 6.02 dB, graphed against SINAD; worked examples: an ideal

## Learner actions

- Resolution: how many levels: numeric (at the Flow's [[ask]]) — "8 bits represent 0 to 10 V. How big is each step, in mV?"
- Quantization error is a floor: poe (at the Flow's [[ask]]) — "A sensor gives 8.540 V into the 8-bit, 0–10 V converter. Which
- More bits are not more accuracy: flash (after the statement) — "A 16-bit ADC runs from a reference good to ±1 %. Is its reading
- SAR: a binary search: numeric (at the Flow's [[ask]]) — "A converter decides one bit per comparison. How many comparisons
- The table everyone scrolls past: multi-select (after the tour) — "Which of these can a two-point calibration remove?"
- ENOB: the honest number of bits: numeric (before the reveal) — "A 12-bit ADC's datasheet gives a SINAD of 62 dB. What is its ENOB?"

## Hand-off

[[transition]] There is one input to every conversion that we have not yet questioned. Every one of
those levels is a fraction of something: the reference. The last module of the day asks what the code
is really a ratio *to* — and finds a way to make that question disappear.
