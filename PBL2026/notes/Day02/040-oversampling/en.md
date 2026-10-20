---
targetMinutes: 40
motivates: The noisy code is in the firmware now — can averaging it buy back resolution the converter does not have, and which "average" should the firmware compute?
objectives:
  - Gain real resolution through oversampling, using the four-samples-per-extra-bit rule, and explain why it silently fails on a too-quiet signal.
  - Use deliberate dither to make oversampling work again.
  - Choose between mean and median, and between moving-average, IIR and median filters, by what the data contains and what each costs in latency.
concepts: [oversampling, digital-filtering]
---

# Oversampling, dither and digital filtering

<!-- PATH: [ … → DIGITAL INTERFACE → **FIRMWARE: filter** → calibrate → scale → NUMBER ]
     TOOL: Coding Bench (centrepiece: `oversample` — noisy, too quiet, dithered; `filters` — mean, median,
           moving average, IIR, median filter) · Equation (N = 4ⁿ and what it costs in time).
     SOURCES: transcripts/Chapter 13 - factors_in_making_measurements.md ("Techniques to reduce the effect of
              error"); Chapter 14 - what_is_average.md (mean, median, mode; outliers; geometric and harmonic
              mean parked in the transcript appendix); training-overview.md Day 2 Module 3. -->

## Measure many times and average

One way to reduce the effect of random error on a practical measurement is to make the measurement a
large number of times and average the results.

<!-- PLAN
SHOW     Coding Bench — `oversample`, first pass: the `bobble` converter at 2047.4 LSB with σ = 1 LSB; each
         result is the mean of N readings; fifty results drawn as dots with their spread printed. Drive: N =
         1 → 4 → 16 → 64 (spread about 1, 0.5, 0.25, 0.125 LSB). Look for: the cloud tightening round the same
         centre.
         Status: needs Coding Bench: `oversample` (ADC model with σ and dither controls, N, result against
                 truth, spread over 50 runs)
ASK      flash (after the demo) — "What did averaging change: the value, or the spread?"
         options: The value | The spread | Both | Neither
         answer: The spread
         explain: The centre stays at 2047.4 while the spread falls as 1/√N, halving with every fourfold
         increase in N.
         depth: understand    practice: analysing data
HARVEST  S58 — "The INA226 had an averaging register, from 1 to 1024. This is what it does."
-->

```flow
We left the last module with a code that will not stand still. The obvious thing to do with a number
that will not stand still is to take it several times.

When we collect data, there are a number of ways the results can vary from one observation to
another, even when conditions are supposed to be the same. First there is good old-fashioned
measurement and observational error. Not all rulers are truly the same, and not all applications of
the same ruler to the same object turn out the same. In short, there will always be some variability
in the measurements from one trial to another.

One technique to reduce the effect of error on practical measurements is to **make the measurement a
large number of times and then average the results**.

[[demo]] Firmware sandbox — average 1, then 4, then 16, then 64 readings of the noisy input from the
last module.

[[ask]] What did averaging change: the value, or the spread?

[[pause]]
```

***

## Buying resolution with time

Averaging can buy real resolution, paid for in time: each extra bit costs four times as many
samples. The rule is derived, not asserted.

<!-- PLAN
SHOW     Equation — n extra bits = log₄ N, derived in three steps on the card: averaging N independent
         samples divides the noise by √N (RSS, from 030); one extra bit halves the step, so the noise must
         halve, √N = 2, N = 4; each further bit, four times again. Worked examples: 12 → 14 bits, 16 samples;
         12 → 16 bits, 256 samples; at 1 kS/s that is 62.5 and 3.9 readings a second. Graph extra bits
         against N on a log axis.
         Status: ready
ASK      poe (before the statement) — "To gain one extra bit of real resolution by averaging, how many
         samples do you need?"
         options: 2 | 4 | 10 | 16
         answer: 4
         reveal: the Equation's three steps
         explain: Averaging N samples shrinks random noise by √N, one bit is a factor of two, so it takes four
         samples, and every further bit four times as many again.
         depth: understand    practice: developing models
ASK      numeric (after the reveal) — "A 12-bit converter, and you want 14 bits. How many samples per
         reading?"
         answer: 16 ± 0
         explain: Two extra bits cost 4² = 16 samples: sum them (at most 65,520, which still fits 16 bits) and
         shift right by two.
         depth: use    practice: computational thinking
HARVEST  S19 — "Yesterday's sigma-delta sampled far faster than it reported, then filtered. This is the same
         trick in our own firmware, paid for with our own time."
HARVEST  S20 — "And these are real bits, unlike the sixteen printed on a box — provided one condition holds.
         That condition is the next card."
SEED     plants S54 — "Two hundred and fifty-six twelve-bit samples add up to a twenty-bit sum. Notice where
         you store it."
-->

<!-- FILLED 2026-10-07: drafted from training-overview Day 2 Module 3; tutor to review -->

```flow
[[ask]] Here is a bolder claim: averaging can buy you *resolution* — bits the converter does not
have. If that is true, how many samples do you think one extra bit costs? Two? Four? Ten?

[[pause]]

[[reveal]] Four. Here is why, and it rests on root-sum-of-squares from the noise module.

Average N independent samples and the random noise in the result shrinks by the square root of N. One
extra bit means a step half the size, so the noise has to halve too. Halving means the square root of
N is 2, so N is 4.

Every further bit halves the noise again, which costs four times as many samples again. So n extra
bits cost 4ⁿ samples.

[[ask]] A 12-bit converter, and you want 14 bits. How many samples per reading?

[[pause]]

Sixteen. Sum them, and sixteen 12-bit codes add up to at most 65,520, which still fits in 16 bits.
Then shift right by two. Four extra bits would cost 256 samples. At 1,000 samples a second that is
about 62 readings a second for 14 bits, and fewer than four a second for 16. You are buying resolution
with time.

And notice where you keep that sum: 256 twelve-bit samples add up to a twenty-bit number.

Yesterday's sigma-delta did exactly this inside itself: sample far faster than it reports, then
filter. We are doing it in firmware, and paying with our own time. These are real bits, unlike the
ones printed on a box, provided one condition holds.
```

***

## What if the signal is too quiet?

Oversampling only works if at least one LSB of noise is present. On a too-quiet signal it fails
silently: the arithmetic runs, the bits do not appear.

<!-- PLAN
SHOW (centrepiece) Coding Bench — `oversample`: input 2047.4 LSB, N = 256, result printed to 1/100 LSB
         beside the true value and the error; a histogram of the raw codes underneath. Drive: σ = 1 LSB
         (2047.40 ± 0.07) → σ = 0, a perfectly quiet input (every code 2047, result 2047.00, error 0.4 LSB
         however large N) → σ = 0.1 LSB (still about 0.24 LSB off) → σ = 0.5 LSB (within about 0.02 LSB).
         Look for: the arithmetic running and the bits not appearing; the histogram's single bar.
         Status: needs Coding Bench: `oversample`
ASK      poe (before the statement) — "I am going to average 256 samples of this noise-free input. Do we
         gain four bits?"
         options: Yes, four bits | Two bits | None: every sample is the same code | It depends on N
         answer: None: every sample is the same code
         reveal: σ = 0, N = 256
         explain: With no noise the converter returns 2047 every time, so the average is 2047 and the 0.4 LSB
         rounding threw away stays thrown away: averaging recovers only what the samples carry.
         depth: understand    practice: constructing explanations
FAULT    Oversampling on a channel that is too quiet (a well-filtered reference, a ratiometric bridge at
         rest): the extra digits never change; found by looking at the raw codes' histogram, one bar.
-->

<!-- FILLED 2026-10-07: drafted from training-overview Day 2 Module 3; tutor to review -->

```flow
[[demo]] Firmware sandbox — a perfectly steady, noise-free input.

[[ask]] I am going to average 256 samples of this. Do we gain four bits?

[[pause]]

[[reveal]] We gain nothing. Every one of the 256 samples is 2047, so their average is 2047.

[[demo]] Look at the histogram: a single bar. The true input is 2047.4, but rounding threw the 0.4 away
on every sample, the same way every time. Averaging cannot bring back what none of the samples carry.

Now add a little noise, a tenth of a step. A few samples start to read 2048, but the average is still
about a quarter of a step short. With half a step of noise, the average lands within a couple of
hundredths of 2047.4.

So **oversampling only works if roughly an LSB of noise is present.** And it fails silently: the
arithmetic runs, the extra digits appear, and they never change. Remember the thermal noise of a
10 kΩ resistor: a six-hundredth of a step on a 12-bit converter. A clean, quiet input can defeat you.
```

***

## Dither: adding noise on purpose

When the signal is too quiet, add deliberate noise — dither — and oversampling works again. Noise,
the enemy of the last module, becomes a resource.

<!-- PLAN
SHOW     Coding Bench — `oversample` with its dither switch: σ = 0 input plus deliberate dither, first
         uniform ±½ LSB, then Gaussian 1 LSB RMS; N = 256. Drive: dither off (2047.00) → uniform dither on
         (2047.40 ± 0.03) → Gaussian (2047.40 ± 0.07) → the histogram: 2047 and 2048 in the ratio 60 : 40.
         Look for: adding noise taking the error from 0.4 LSB to a few hundredths.
         Status: needs Coding Bench: `oversample` (dither control)
ASK      poe (before the run) — "We are about to add noise to the measurement. What happens to the averaged
         result?"
         options: It gets noisier | It moves closer to the true value | Nothing changes | It drifts at random
         answer: It moves closer to the true value
         reveal: dither on, the result and the histogram
         explain: With dither the chance of reading 2048 rather than 2047 becomes proportional to where the
         value sits between them, 40 % here, so the average of many codes lands on 2047.4.
         depth: understand    practice: constructing explanations
HARVEST  S7 — "The last digit that would not sit still: in 030 it was noise. Here it is the thing that makes
         the extra bits real."
ANALOGY  A ruler marked only in whole centimetres, measuring a 2.4 cm step: held still it says 2 every time;
         jiggled at random by about a centimetre, it says 3 on about four readings in ten, and the average
         finds the 0.4. It breaks where real dither must be independent of the signal and of known size, which
         a hand's jiggle is not.
-->

<!-- FILLED 2026-10-07: drafted from training-overview Day 2 Module 3; tutor to review -->

```flow
[[ask]] So the quiet signal defeated us. What if we deliberately *add* noise to the measurement? What
happens to the averaged result?

[[pause]]

[[demo]] Firmware sandbox — add dither to the too-quiet input and re-run the oversampling.

[[reveal]] The averaged result moves closer to the true value: from 0.4 of a step off to a few
hundredths.

Look at the histogram. With dither the code reads 2047 about 60 % of the time and 2048 about 40 % of
the time. The chance of reading the higher code is now proportional to where the true value sits
between the two. Average many of them and you land on 2047.4.

The dither has to be about a step in size, and it must not be related to the signal. In real designs
it is injected as a small triangle wave or pseudo-random signal, or it is the circuit's own noise, if
there is enough of it.

So noise, the enemy of the last module, has become a resource. The last digit that would not sit still
is the thing that makes the extra bits real.
```

***

## Which average?

The mean is the sum of the values divided by their number; the median is the middle value; the mode
is the most frequent. Each is a correct average when used in the right context.

<!-- PLAN
SHOW     Coding Bench — `filters`, first screen: seven codes, 2046, 2047, 2047, 2048, 2047, 2049, 2048, with
         mean, median and mode hidden until the room has answered.
         Status: needs Coding Bench: `filters`
ASK      numeric (after the statement) — "Codes: 2046, 2047, 2047, 2048, 2047, 2049, 2048. What is the mean?"
         answer: 2047.43 ± 0.01
         reveal: the three averages shown
         explain: The sum is 14,332 and 14,332 / 7 ≈ 2047.43, while the median (the fourth of the sorted
         seven) and the mode are both 2047.
         depth: use    practice: computational thinking
SEED     plants S24 — "Mean, median, mode: three answers to 'what is the typical value?'. After the break a
         fourth one turns up, and the mains is quoted in it."
-->

```flow
There are several different kinds of "average", and all of them are valid in the right situations.
The word *average* refers to the most typical value, or most expected value, in a collection of
numerical data. When results vary from trial to trial, and there can also be actual variability in
the events being recorded, one way to handle these variations is to find the most typical value for
the lot.

The most commonly encountered averages are the **arithmetic mean** (usually called simply the mean),
the **median** and the **mode**. Each is a little different from the others, and all of them are
correct "averages" when used in the right context.

- The **arithmetic mean** is the common type of average. It is the sum of all the values divided by
  the number of values.
- The **median** is the middle value in the data set: the value where exactly half of the values are
  above it and half are below it.
- The **mode** is also an average of sorts. It is defined as the most frequently occurring value in a
  data set.

[[ask]] Here is a short run of codes in the sandbox. Work out the mean, the median and the mode.

[[pause]]
```

***

## When the mean misleads

When one or two values are very large or very small compared with the rest, the mean is not terribly
useful; the median is used when outliers make the data asymmetrical. In firmware, that is the choice
between a moving-average filter and a median filter.

<!-- PLAN
SHOW     Coding Bench — `filters`: a stream of codes round 2047 with one spike to 3900, through a moving
         average of 8 and a median of 5, both drawn as lines. Drive: run; the spike passes through.
         Look for: the moving average lifting by about 230 counts for eight samples; the median not moving.
         Status: needs Coding Bench: `filters`
ASK      poe (before the filters run) — "Which survives the spike: the mean, or the median?"
         options: The mean | The median | Both | Neither
         answer: The median
         reveal: the two filtered lines
         explain: One 3900 among eight values near 2047 lifts their mean by about 1853 / 8 ≈ 230 counts, while
         a median of five needs only three ordinary values to stay put.
         depth: understand    practice: analysing data
-->

<!-- CHECK: strictly, symmetry guarantees mean = median, but not the mode (a symmetrical two-peaked set has
     two modes, neither at the mean). So "mean ≠ median" shows asymmetry; a mode that differs does not on
     its own. Suggest "symmetrical and single-peaked". -->

```flow
[[demo]] Firmware sandbox — a run of steady codes with one spike in it.

[[ask]] Which of the two survives that spike: the mean, or the median?

[[pause]]

Different averages are used for different situations. If the data are perfectly symmetrical, then
the mean, median and mode are the same number. If the mean, median and mode are not the same, then
the data are not symmetrical around the mean, and the difference is a test of that symmetry.

When the data are symmetrical, or at least almost symmetrical, the mean can be used.

There are situations where the mean is not terribly useful, especially if one or two data points have
very large or very small values compared with the rest of the data. So:

- the **mean** is best used when the data are symmetrical;
- the **median** is often used when the data are highly asymmetrical because of outliers;
- the **mode** is usually used to answer the question of which event occurs most often.

In firmware this is not an abstract choice. A **moving-average filter** computes a running mean; a
**median filter** takes the middle value of the last few readings. One spike, and you can see which
of the two the spike drags along.

Although it is common in measurement, and in science experiments in general, to quote the "average"
value of the data acquired, you must be careful to use the correct average (or the most reasonable
average) and to interpret correctly what "average" means in the context of the experiment.
```

***

## What each filter costs in latency

Moving average, IIR and median filters are compared for what each costs in latency. A filter that
steadies the number also delays it.

<!-- PLAN
SHOW     Coding Bench — `filters`: a clean step of 100 counts through a moving average of 8, an IIR with
         α = 1/8 and a median of 5, drawn together, each with a marker where it first reaches 90 % of the step;
         then the same three on a steady input with σ = 1 LSB noise, with the spread of each printed.
         Drive: step only → noise only. Look for: the median there by sample 3, the moving average by sample
         8, the IIR only after about 17; and on noise the order reversed: IIR steadiest (σ × 0.26), moving
         average next (× 0.35), median least (about × 0.54).
         Status: needs Coding Bench: `filters`
ASK      poe (before the step) — "The input makes a genuine step. Which follows it fastest: moving average,
         IIR or median?"
         options: Moving average of 8 | IIR, α = 1/8 | Median of 5 | All the same
         answer: Median of 5
         reveal: the three traces with their 90 % markers
         explain: The median switches once three of its five values are new, the moving average needs all
         eight, and the IIR closes in by an eighth of the gap per sample, (7/8)ⁿ = 0.1 at n ≈ 17, which is
         also why it steadies noise the most.
         depth: understand    practice: analysing data
HARVEST  S53 — "The relay that chattered in 030: put any of these filters in front of it and it calms down.
         And now it switches late. The steadiness and the delay are the same thing."
-->

<!-- FILLED 2026-10-07: drafted from training-overview Day 2 Module 3; tutor to review -->

```flow
[[ask]] Now the input makes a genuine step. Which of the three — moving average, IIR or median — do
you expect to follow it fastest?

[[pause]]

[[demo]] Firmware sandbox — the same step through all three filters, side by side.

[[reveal]] The median. A five-point median switches as soon as three of its five values are new: three
samples after the step. The eight-point moving average needs all eight. The IIR closes an eighth of
the remaining gap each sample, so it needs about seventeen samples to get 90 % of the way.

[[demo]] Now give the same three filters a steady input with noise on it. The order turns round: the
IIR is the steadiest, the moving average next, the median the least steady.

That is the trade. **A filter that steadies the number also delays it.** The more samples a filter
leans on, the steadier it is, and the later.

Remember the relay chattering on its set point in the noise module? Put any of these filters in front
of it and it calms down. And now it switches late. The steadiness and the delay are the same thing.

[[transition]] The firmware now holds a steady, filtered code. But it is still a code: a number with
no unit, and no promise that it agrees with the world. Next, the firmware turns it into a quantity,
and checks that quantity against a reference.
```
