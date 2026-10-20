---
includeInExport: false
---

<!-- Restructured from: AC_Metering_System_Simulation_Project.md §9 Signal conditioning (9.1 Scaling,
     9.2 Level shifting, 9.3 Filtering, 9.4 Buffering) and §11 Sampling;
     transcripts/Chapter 07 - Analog to digital converters.md "Input bandwidth";
     transcripts/Chapter 08 - Aliasing.md (all, including the closing paragraphs);
     transcripts/07_compensation_techniques.md "Filtering";
     transcripts/Chapter  03 - Signal conditioning.md "Filtering";
     training-overview.md Day 2 Module 7 (GAP for the filter sizing).
     Where on the path: the AC pass reaches conditioning, the last stage before the converter, and we
     settle how often the converter has to look. -->

<!-- Lesson-level script for “Conditioning AC for the ADC: bias, aliasing and the anti-alias filter”. The words for each slide are in the ```flow
     fence under that card in en.md, and appear on the teleprompter with it. -->

## Where we are on the path

The AC pass reaches conditioning, the last stage before the converter, and we settle how often the converter has to look.

## The arc

1. **An AC signal swings negative; the ADC pin does not** — If the ADC accepts only positive voltages, a bipolar AC waveform cannot simply be connected to it.
2. **Bandwidth is not sampling rate** — Bandwidth tells us about the frequency content, or how rapidly the signal can change.
3. **Sampling a signal at its own frequency** — Sample a 5 kHz signal at exactly 5 kHz and every sample can land on the same point of each cycle.
4. **We only know what we observe** — If we observe something too infrequently, we may form a completely wrong picture of what is happening between our observations.
5. **The Nyquist limit** — The Nyquist frequency is half the sampling frequency.
6. **Below the Nyquist limit** — At 6 kHz sampling the Nyquist frequency is 3 kHz, so a 5 kHz signal is above it.
7. **Once aliased, no software can tell** — A 7 kHz component sampled at 10 kHz appears as 3 kHz, and looks like a perfectly legitimate signal.
8. **The anti-alias filter goes before the ADC** — Aliasing must be prevented before the ADC: an analog low-pass filter reduces the components above the usable range of the sampling rate.
9. **Sizing a real anti-alias filter** — The filter is sized against the sample rate: we read, in dB, how much it attenuates at the frequencies that would alias, while it keeps the band we want to preserve.
10. **Filtering prepares the signal for digitization** — Filtering is not simply about making a signal look cleaner; it is part of preparing it for reliable digitization.

## What the wall shows

- An AC signal swings negative; the ADC pin does not: Plot — the conditioned ±1.0 V, 50 Hz signal as the ADC pin sees it: clamp(b + A·sin(2π·50·t), 0, 3.3),
- Bandwidth is not sampling rate: Figure — an ADC datasheet's two separate lines: the sampling rate and the analog input's full-power
- Sampling a signal at its own frequency: Plot — a 5 kHz sine (thin) and what the ADC holds from it, sin(2π·f·floor(t·fs)/fs + φ), drawn as a
- The Nyquist limit: Equation — f_N = f_s / 2, with f_s as the slider and the worked example 10 kHz → 5 kHz; one assumption
- Below the Nyquist limit: Plot — a true sine sin(2π·f·t) (thin), its sampled-and-held staircase sin(2π·f·floor(t·fs)/fs),
- Once aliased, no software can tell: Plot — two cosines, a real 3 kHz and an unwanted 7 kHz, each with its staircase at fs = 10 kHz (cosines,
- The anti-alias filter goes before the ADC: Draw — Analog signal → anti-aliasing filter → ADC → digital signal, built left to right; then a ghost
- Sizing a real anti-alias filter: Equation — the attenuation of an n-th order Butterworth low-pass, A(f) = −10·log₁₀(1 + (f/f_c)^(2n)) dB,
- Filtering prepares the signal for digitization: Draw — the capstone's mains voltage path, stage by stage: ±325 V → divider (to ±1.0 V) → bias to 1.65 V →

## Learner actions

- An AC signal swings negative; the ADC pin does not: numeric (after the statement) — "A ±1.0 V signal is shifted to sit around 1.65 V. Where does its upper
- Bandwidth is not sampling rate: flash (after the statement) — "An ADC's analog input handles frequencies far above its sampling rate.
- Sampling a signal at its own frequency: poe (before the statement) — "A 5 kHz signal sampled at exactly 5 kHz: one sample per cycle, always at the
- The Nyquist limit: flash (after the statement) — "To preserve a 5 kHz component, the sampling frequency must be…"
- Below the Nyquist limit: poe (before the statement) — "We sample our 5 kHz signal at 6 kHz. What frequency does the sampled data
- Once aliased, no software can tell: poe (before the statement) — "An unwanted 7 kHz component gets in, and we sample at 10 kHz. What does the
- Sizing a real anti-alias filter: numeric (after the statement) — "A first-order RC low-pass with f_c = 1 kHz, sampling at 10 kHz. Read its
- Filtering prepares the signal for digitization: checkpoint (after the statement) — "For the mains voltage path in the capstone: what do we bias, what do

## Hand-off

[[transition]] We now know how often the converter has to look. But "how often" is an average. The next
question is *when*, exactly, each of those samples is taken, and what happens to our number when the
answer is "not quite when we thought".
