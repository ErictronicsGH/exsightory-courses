---
includeInExport: false
---

<!-- Restructured from: transcripts/Chapter 13 - factors_in_making_measurements.md ("Techniques to reduce the
     effect of error on practical measurements": average many readings); Chapter 14 - what_is_average.md
     (what an average is; mean, median, mode; symmetry and outliers; the closing caution; geometric and
     harmonic mean with the cedis example → Appendix, parked). Tidied from note form into sentences.
     The 4ⁿ rule, the too-quiet failure, dither and filter latency: no transcript yet (training-overview
     Day 2 Module 3). Integrated average → D3·040; RMS → D2·070; RSS → D1·020 and D2·030.
     Where on the path: FIRMWARE, its first job — filter. The noisy code from 030 is in a variable, and
     the firmware decides what to do with many of them. -->

<!-- Lesson-level script for “Oversampling, dither and digital filtering”. The words for each slide are in the ```flow
     fence under that card in en.md, and appear on the teleprompter with it. -->

## Where we are on the path

FIRMWARE, its first job — filter. The noisy code from 030 is in a variable, and the firmware decides what to do with many of them.

## The arc

1. **Measure many times and average** — One way to reduce the effect of random error on a practical measurement is to make the measurement a large number of times and average the results.
2. **Buying resolution with time** — Averaging can buy real resolution, paid for in time: each extra bit costs four times as many samples.
3. **What if the signal is too quiet?** — Oversampling only works if at least one LSB of noise is present.
4. **Dither: adding noise on purpose** — When the signal is too quiet, add deliberate noise — dither — and oversampling works again.
5. **Which average?** — The mean is the sum of the values divided by their number; the median is the middle value; the mode is the most frequent.
6. **When the mean misleads** — When one or two values are very large or very small compared with the rest, the mean is not terribly useful; the median is used when outliers make the data asymmetrical.
7. **What each filter costs in latency** — Moving average, IIR and median filters are compared for what each costs in latency.

## What the wall shows

- Measure many times and average: Coding Bench — `oversample`, first pass: the `bobble` converter at 2047.4 LSB with σ = 1 LSB; each
- Buying resolution with time: Equation — n extra bits = log₄ N, derived in three steps on the card: averaging N independent
- What if the signal is too quiet?: Coding Bench — `oversample`: input 2047.4 LSB, N = 256, result printed to 1/100 LSB
- Dither: adding noise on purpose: Coding Bench — `oversample` with its dither switch: σ = 0 input plus deliberate dither, first
- Which average?: Coding Bench — `filters`, first screen: seven codes, 2046, 2047, 2047, 2048, 2047, 2049, 2048, with
- When the mean misleads: Coding Bench — `filters`: a stream of codes round 2047 with one spike to 3900, through a moving
- What each filter costs in latency: Coding Bench — `filters`: a clean step of 100 counts through a moving average of 8, an IIR with

## Learner actions

- Measure many times and average: flash (after the demo) — "What did averaging change: the value, or the spread?"
- Buying resolution with time: poe (before the statement) — "To gain one extra bit of real resolution by averaging, how many
- Buying resolution with time: numeric (after the reveal) — "A 12-bit converter, and you want 14 bits. How many samples per
- What if the signal is too quiet?: poe (before the statement) — "I am going to average 256 samples of this noise-free input. Do we
- Dither: adding noise on purpose: poe (before the run) — "We are about to add noise to the measurement. What happens to the averaged
- Which average?: numeric (after the statement) — "Codes: 2046, 2047, 2047, 2048, 2047, 2049, 2048. What is the mean?"
- When the mean misleads: poe (before the filters run) — "Which survives the spike: the mean, or the median?"
- What each filter costs in latency: poe (before the step) — "The input makes a genuine step. Which follows it fastest: moving average,

## Hand-off

[[transition]] The firmware now holds a steady, filtered code. But it is still a code: a number with
no unit, and no promise that it agrees with the world. Next, the firmware turns it into a quantity,
and checks that quantity against a reference.

## Appendix (parked)

<!-- PARKED: not taught live; kept for reference -->

Other averages include the **geometric mean** and the **harmonic mean**.

The geometric mean is often used when the data are not very symmetrical, especially in biological
studies. Suppose you have 48 cedis to spend, and you spend one half of your available money each day
for 5 days. The data would tabulate as follows:

| Day | Amount (cedis) |
|---:|---:|
| 1 | 48 |
| 2 | 24 |
| 3 | 12 |
| 4 | 6 |
| 5 | 3 |

The arithmetic mean in this case will be 18.6 cedis. However, if we graph these values, the line
connecting the tops of the bars is not straight but traces an exponential curve, which requires a
logarithmic treatment to get the median, which will be 11.99.
<!-- CHECK: what the logarithmic treatment computes here is the geometric mean, not the median, and the
     geometric mean of 48, 24, 12, 6 and 3 is exactly 12 (the fifth root of 48 × 24 × 12 × 6 × 3 = 248,832
     is 12). Coincidentally the median of this set is also 12 (the middle value). Suggest: "…a logarithmic
     treatment to get the geometric mean, which is 12 cedis." -->

The harmonic mean is a bit more complicated and is used when the data are expressed as ratios. It is
the reciprocal of the mean of the reciprocals of the data.
