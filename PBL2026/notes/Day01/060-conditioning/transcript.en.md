---
includeInExport: false
---

<!-- Restructured from: transcripts/Chapter  03 - Signal conditioning.md (introduction; the list of
     functions; Amplification; the closing line); 07_compensation_techniques.md (Negative feedback);
     Chapter 16 - logarithmic_representations_decibels.md (taught here, at first use: CMRR).
     Moved elsewhere from Chapter 03: Attenuation and Buffering → 040; Level shifting → Day 2·010;
     Linearization → Day 2·050; Isolation → Day 2·080; Filtering → Day 3·020.
     GAPs: in-amps, differential gain, CMRR, offset and bias current (training-overview Day 1 Module 8).
     Where on the path: between the sensor and the converter — preparing the signal for the ADC. -->

<!-- Lesson-level script for “Signal conditioning: in-amps, gain, offset and bias current”. The words for each slide are in the ```flow
     fence under that card in en.md, and appear on the teleprompter with it. -->

## Where we are on the path

Between the sensor and the converter — preparing the signal for the ADC.

## The arc

1. **The sensor's output is rarely ready** — It may be too small, too large, noisy, offset, nonlinear, high in impedance, outside the ADC's range, or differential when the next stage expects otherwise.
2. **What conditioning does** — Conditioning prepares a signal for the next stage: amplifying, attenuating, level shifting, filtering, buffering, isolating, linearizing.
3. **Amplification, and undoing it** — Multiply a small signal by a known gain until the next stage can use it: 5 mV becomes 2 V.
4. **Negative feedback sets the gain** — With enough loop gain, the gain is set by the feedback network, not by the amplifier.
5. **Ratios in decibels** — A decibel is a ratio on a logarithmic scale: twenty times the log of a voltage ratio, ten times the log of a power ratio.
6. **Differential gain: amplify the difference** — An instrumentation amplifier amplifies the difference between its two inputs and ignores what they have in common.
7. **CMRR decides whether high-side sensing works** — No amplifier ignores the common-mode voltage completely.
8. **Offset is amplified exactly like the signal** — The amplifier cannot tell its own input offset from your signal.
9. **Bias current makes another offset** — Input bias current flowing through the source's resistance is a voltage at the input, and it is amplified just like the offset.

## What the wall shows

- What conditioning does: Draw — the conditioning functions pinned on the path where the course meets them: attenuation and
- Amplification, and undoing it: Equation — V_out = G·V_in, rearranged to what the firmware does: V_in = V_out / G. Worked example:
- Negative feedback sets the gain: Equation — A_cl = G / (1 + G·H), graphed against G from 10² to 10⁶ with H = 0.01, and a family for
- Ratios in decibels: Equation — dB = 20·log(V_out/V_in) and dB = 10·log(P_out/P_in), with worked examples: ×2 → +6.02 dB,
- Differential gain: amplify the difference: Electronics — the high-side shunt from 050 (12 V, 10 mΩ, 6 Ω load, 2 A) with an instrumentation
- CMRR decides whether high-side sensing works: Equation — input-referred error = V_cm / 10^(CMRR/20), graphed against CMRR from 40 to 120 dB at
- Offset is amplified exactly like the signal: Plot — the ADC's view of the in-amp: y = clamp(G·(x + V_os), 0, 3.3) against x = V_in from 0
- Bias current makes another offset: Equation — V_err = I_b·R_s at the input and G·I_b·R_s at the output, graphed against R_s from 100 Ω to

## Learner actions

- The sensor's output is rarely ready: multi-select (at the Flow's [[ask]]) — "Our high-side shunt from 050 gives 20 mV, riding on 12 V.
- Negative feedback sets the gain: poe (before the graph) — "An amplifier with an open-loop gain of 100,000 is set by feedback to a gain
- Ratios in decibels: flash (at the Flow's [[ask]]) — "Three stages: ×10, ×0.5 and ×100. What is the total gain, in dB?"
- CMRR decides whether high-side sensing works: poe (at the Flow's [[ask]]) — "The same shunt signal, measured at the low side and then at the high
- Offset is amplified exactly like the signal: numeric (before the reveal) — "The in-amp has a 2 mV input offset and a gain of 500. How much of a

## Hand-off

[[transition]] The signal is now big enough, in range, and as clean as the analog side can make it.
After the break it meets the converter — and the first thing it meets is not the conversion, but a
small capacitor that has to be charged in a very short time.

## Appendix (parked)

<!-- PARKED: not taught live; kept for reference. From Chapter 16 - logarithmic_representations_decibels.md. -->

**Special dB scales.** Various user groups have defined special dB-based scales to meet their own
needs. They make one by defining a particular signal level as "0 dB" and referencing every other level
to that point. In the dimensionless dB scale, 0 dB corresponds to a gain of unity, since log(1) = 0. If
instead we define 0 dB as a particular signal level, we get one of the special scales. Several are
common in electronics:

- **dBm** — used in RF measurements: 0 dBm is 1 mW of RF signal dissipated in a 50 Ω resistive load.
- **Volume unit (VU)** — used in audio work: 0 VU is 1 mW of 1000 Hz audio signal dissipated in a 600 Ω
  resistive load.
- **dB (now obsolete)** — once used in telephone work: 0 dB was 6 mW of 1000 Hz audio signal dissipated
  in a 500 Ω load. Another source gives 400 Hz as the reference frequency.
- **dBmV** — used in television antenna coaxial-cable systems with 75 Ω impedance: 1000 µV across a
  75 Ω resistive load is the 0 dBmV reference point.

<!-- The source list ends with an empty bullet — there may have been more scales intended. -->
