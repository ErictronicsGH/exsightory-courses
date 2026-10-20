---
targetMinutes: 30
motivates: The datasheet says 12 bits, and the last two of them never sit still.
objectives:
  - Distinguish sampling from quantization, and compute the size of one LSB for a given range and resolution.
  - Describe how a SAR and a sigma-delta converter arrive at a code.
  - Read offset, gain, INL and DNL in an ADC datasheet, and explain why ENOB is the honest specification.
concepts: [sampling, quantization, adc-architecture, adc-datasheet-errors, enob]
---

# Conversion: sampling, quantization, architecture and ENOB

<!-- PATH: quantity → sensor → loading → conditioning → ADC input → [ CONVERSION ] → firmware → number
     TOOL: Plot (centrepiece: the quantizer staircase round(x/q)·q and its error sawtooth, N slider; one
           waveform sampled and quantized; the transfer line with offset, gain, INL and DNL) · Equation
           (LSB size; ENOB from SINAD) · Draw (SAR's binary search, one step per bit) · Figure (an MCU ADC
           datasheet's accuracy table) · Coding Bench (a first-order sigma-delta modulator).
     SOURCES: transcripts/Chapter 06 - Data conversion.md (§9 Sampling, §10 Quantization);
              Chapter 07 - Analog to digital converters.md (What an ADC actually does; Sampling;
              Quantization; Resolution; How the ADC performs the conversion; From analog signal to
              digital data); Chapter 02 (ADC paragraph); Chapter 13 (Resolution);
              Chapter 15 (quantization error); training-overview.md Day 1 Modules 2 and 5. -->

## When, and which level

Sampling decides when the converter looks: it divides time into observation points. Quantization
decides what it records: it divides amplitude into representable levels.

<!-- PLAN
SHOW     Plot — one slow waveform with its sampled-and-held version v(floor(t·f_s)/f_s) and its quantized
         version q·round(v/q); sliders f_s and N.
         Drive: lower f_s (the steps widen in time); lower N (the steps coarsen in amplitude).
         Look for: two independent kinds of coarseness, one on each axis.
         Status: ready.
         Note: resolved 2026-10-20 (ACCURACY D1·080-F1): the Flow now says 2693, the 12-bit, 3.3 V code for 2.17 V.
HARVEST  S12 — "Detect or quantify, from the sensor module: to quantify, we digitize. Here it is."
SEED     plants S18 — "With today's still quantity, how often we sample hardly matters. Today. On Day 3 it
         becomes the most dangerous question in the course."
-->

```flow
When we want to give a physical quantity a numerical value — for display, recording, communication or
further computation — we have to **digitize** the analog signal so that a digital system can represent
and process it.

Converting data from the **analog domain to the digital domain** is the job of a class of electronic
devices called **analog-to-digital converters (ADCs)**. This is a very important step, because the ADC
is the bridge that lets information carried by an analog signal be represented as digital data, where it
can be processed, stored, transmitted, displayed, or used for decisions. The goal is to do this while
introducing as little **loss, distortion and error** as reasonably possible.

Once an interface exists between two domains, the next step is to convert the data or signals between them. Depending on the device, this is mostly a one-way process.

At the simplest level, an ADC takes an analog voltage and produces a digital number that represents it.
2.17 V, for example, may be represented by a code such as 2693 (on a 12-bit, 3.3 V converter), depending on
the ADC's configuration, reference, resolution and input range.

But an ADC does not simply "turn voltage into binary". Two fundamental processes are involved:
**sampling** and **quantization**.

**Sampling.** An analog signal can vary continuously with time. An ADC does not observe every possible
instant; it takes measurements at particular points in time. Observing the signal at discrete points in
time is called sampling, and the number of samples per second is the **sampling rate** or sampling
frequency — 1,000 samples per second is 1 kS/s; an ADC at 10 kS/s takes 10,000 samples every second.
Sampling answers the question: *how often do we observe the analog signal?* A rapidly changing signal
needs frequent enough observations to represent its behaviour. This is why sampling is a fundamental consideration in data acquisition
and digital signal processing. With today's still DC quantity, that
hardly matters. When the quantity starts to move, on Day 3, it becomes the most dangerous question in
the course.

**Quantization.** Sampling tells us *when* the ADC measures. We then have another problem: *what value
should we assign to the voltage that was measured?* An analog voltage can in principle take infinitely
many values — between 0 V and 1 V it could be 0.1 V, 0.1001 V, 0.10001 V, 0.100001 V… A digital system
cannot represent an infinite number of values. So the ADC divides its input range into a finite number
of levels and assigns the measured voltage to one of the available levels: the nearest, or the one just
below, depending on the converter. That is quantization: the
process of constraining a continuous set of values to a discrete set.

A useful mental model:

**Sampling divides time into observation points. Quantization divides amplitude into representable levels.**
```

***

## Resolution: how many levels

An n-bit converter has 2ⁿ levels spread across its input range. One step — one LSB — is the range
divided by the number of levels.

<!-- PLAN
ASK      numeric (at the Flow's [[ask]]) — "8 bits represent 0 to 10 V. How big is each step, in mV?"
         answer: 39.1 mV ± 0.3 mV
         reveal: the Equation below.
         explain: 10 V spread over 256 levels is 39.06 mV a step (a datasheet that divides by 255 gives
                  39.2 mV); every extra bit halves it.
         depth: use    practice: computational thinking
SHOW     Equation — LSB = range / 2^N, with an N slider; worked examples: 8 bits on 10 V → 39.06 mV; 12 bits
         on 3.3 V → 0.806 mV.
         Status: ready.
-->

<!-- CHECK (resolved 2026-10-20, ACCURACY D1·080-F3): binary 1001 is decimal 9, not 5 (decimal 5 is 0101). -->

```flow
The number of available levels is set mainly by the **resolution** of the ADC, normally specified in
**bits**:

- an 8-bit ADC has 2⁸ = **256** levels;
- a 10-bit ADC has 2¹⁰ = **1,024** levels;
- a 12-bit ADC has 2¹² = **4,096** levels;
- a 16-bit ADC has 2¹⁶ = **65,536** levels.

The higher the resolution, the more finely the ADC can represent differences in the input voltage.
Resolution is the degree to which a measurand can be broken into identifiable adjacent parts, and in
digital instruments it is set by the number of bits in the data word.

[[ask]] If 8 bits are used to represent a range of 0–10 V, how big is each step?

[[pause]]

If 8 bits represent 0–10 V, the resolution is about 39 mV per step. This is often specified as the
**1-LSB resolution** — the value of the least significant bit.

Digital instruments use the binary number system, where the only permitted digits are 0 and 1. The
binary "word" is a binary number representing a quantity. Binary 0001 represents decimal 1, while binary
1001 represents decimal 9.
```

***

## Quantization error is a floor

Every voltage between two levels is reported as one of them. That error, a band one LSB wide (±½ LSB
when the converter rounds, 0 to −1 LSB when it truncates), is built into every conversion, and no circuit
removes it from a single conversion.

<!-- PLAN
ASK      poe (at the Flow's [[ask]]) — "A sensor gives 8.540 V into the 8-bit, 0–10 V converter. Which
         voltages could the resulting code stand for?"
         options: exactly 8.540 V | any voltage in a band one step (39 mV) wide | any voltage within ±39 mV
                  of 8.540 V | anything from 8.41 to 8.88 V
         answer: any voltage in a band one step (39 mV) wide
         reveal: the centrepiece Plot at N = 8, zoomed near 8.5 V.
         explain: With rounding, 8.540 V lands on level 219 (8.555 V), and every input from 8.535 to 8.574 V
                  gives that same code: ±½ LSB, ±19.5 mV.
         depth: understand    practice: analysing data
SHOW (centrepiece) Plot — the quantizer staircase q·round(x/q) and its error sawtooth x − q·round(x/q), x from
         0 to 10 V, q = 10/2^N with an N slider (4 to 12), a marker at 8.540 V and ±½ LSB lines on the
         error.
         Drive: N = 8, zoom near 8.5 V (code 219 covers 8.535 to 8.574 V); then N from 4 to 12.
         Look for: the sawtooth staying inside ±½ LSB at every N, shrinking, its height never reaching zero.
         Status: ready.
         Note: resolved 2026-10-20 (ACCURACY D1·080-F4): the Flow now says "a band one step wide"; the reveal
         gives 8.535 to 8.574 V.
FAULT    Firmware that divides by 2^N in one place and by 2^N − 1 in another: a gain error of one part in
         2^N (0.39 % at 8 bits). Truncating instead of rounding: a steady −½ LSB offset.
-->

<!-- FILLED 2026-10-07: drafted from training-overview Day 1 Module 5; tutor to review -->

<!-- CHECK (resolved 2026-10-20, ACCURACY D1·080-F4): 8.41 V and 8.880 V are far more than one step (39 mV) from 8.540 V. With 39 mV steps, the
     nearest levels to 8.540 V are about 8.516 V and 8.555 V. With rounding to the nearest level, the
     quantization error is ±½ LSB ≈ ±0.0195 V; with truncation it is 0 to −1 LSB. The ±½ LSB floor is
     what training-overview Day 1 Module 5 teaches. -->

```flow
For a digital system, we must add to the resolution error a **quantization error**, which comes from the
fact that the output can take only certain discrete values.

[[ask]] A weight sensor outputs 8.540 V on a 10 V scale. It is digitized by the 8-bit converter we just
described. Which voltages could the resulting code stand for?

[[pause]]

With 8 bits over 0–10 V, the range is broken into discrete steps of 39.06 mV. A voltage between two of
those steps is assigned to one or the other, according to the rounding rule the measurement process
uses. The code it gets may stand for any voltage in a band one step wide.

[[demo]] On the Plot Bench: the staircase for 8 bits over 0 to 10 V, and under it the error, the input
minus the level it was given. I'll zoom in near 8.5 V.

[[reveal]] 8.540 V is 218.6 steps of 39.06 mV. Rounded, that is level 219, which is 8.555 V. And every
input from 8.535 V to 8.574 V gives that same code. A code does not stand for one voltage. It stands for
a band one step wide: ±½ LSB, here ±19.5 mV.

Now slide N from 4 bits to 12. The sawtooth shrinks, step by step, and its height never reaches zero.
That ±½ LSB is the floor of every conversion. It is built in, and no circuit after the converter can
remove it from a single conversion. A
converter that truncates instead of rounding has a band from 0 to −1 LSB: the same width, shifted.
```

***

## More bits are not more accuracy

Resolution says how finely the converter can divide its range. Noise, the reference, linearity and
temperature decide how much of that fineness is true.

<!-- PLAN
ASK      flash (after the statement) — "A 16-bit ADC runs from a reference good to ±1 %. Is its reading
         accurate to one part in 65,536?"
         options: yes — that is what 16 bits means | no — to about 1 %, set by the reference | no — to about
                  ½ LSB
         answer: no — to about 1 %, set by the reference
         explain: Sixteen bits divide the range into steps of 0.0015 %; the reference sets where the whole
                  range sits, so a 1 % reference can put every reading up to 1 % off, however fine the steps.
         depth: understand    practice: constructing explanations
SEED     plants S34 — "How much of that fineness is true is a separate question, and the last card of this
         module answers it."
-->

```flow
More bits do not automatically mean more accurate measurements. Noise, reference-voltage accuracy,
linearity, temperature effects, the input circuitry and other characteristics also affect the actual
quality of the measurement.

Resolution is how finely the converter can divide its range. How much of that fineness is true is a
separate question, and the last card of this module answers it.
```

***

## SAR: a binary search

A successive-approximation converter compares the held voltage with a trial level, keeps or drops
each bit, and narrows the range until every bit is decided.

<!-- PLAN
ASK      numeric (at the Flow's [[ask]]) — "A converter decides one bit per comparison. How many comparisons
         does a 12-bit conversion need?"
         answer: 12 ± 0
         explain: Each comparison halves the remaining range, and twelve halvings take 4,096 possibilities
                  down to one.
         depth: use    practice: computational thinking
SHOW     Draw — SAR's binary search for a 4-bit converter, Vref 3.3 V, input 2.17 V: trial 1000 (1.650 V) keep;
         1100 (2.475 V) drop; 1010 (2.063 V) keep; 1011 (2.269 V) drop → 1010, code 10 (2.063 V). Each step
         draws the trial level as a line on a 0–3.3 V bar beside the input's marker and writes the bit.
         Drive: one step per bit.
         Look for: the window halving each time, closing on the input from below.
         Status: needs Draw: the SAR binary-search drawing · optional needs Coding Bench: a SAR step-through
                 for any input the room calls out (replaces the SAR half of the old visualiser widget).
-->

```flow
Different ADCs use different internal techniques to perform the conversion.

[[ask]] A converter decides one bit per comparison. How many comparisons does a 12-bit conversion need?

[[pause]]

A **successive-approximation register (SAR)** ADC essentially performs a controlled binary search. It
makes a comparison, decides whether the input is above or below a particular level, and then
progressively narrows down the possible value until it has the digital result.

[[demo]] Animation Bench: a SAR conversion, one comparison per bit.

SAR ADCs are widely used in microcontrollers and general-purpose data acquisition, because they offer a
useful combination of **speed, resolution, power efficiency and relatively simple implementation**. Most
microcontrollers' built-in converters are SAR ADCs.
```

***

## Sigma-delta: fast and coarse, then filtered

A sigma-delta converter samples far faster than its output rate, shapes its noise, and filters
digitally to reach high resolution for slow signals.

<!-- PLAN
SHOW     Coding Bench — a first-order sigma-delta modulator: card 5's input (2.17 V, 0.658 of full scale) in, the
         1-bit stream out, and a running average over the last 16, 64 and 256 bits converging on 0.658.
         Decided 2026-10-20: the Plot fallback (a precomputed series) carries it until a Coding Bench exists.
         Drive: run; change the input; change the averaging length.
         Look for: the density of 1s is the value, and the resolution comes from how many bits you average.
         Status: needs Coding Bench: first-order sigma-delta modulator with its bitstream and an averaging
                 decimator (replaces the old visualiser widget); fallback: Plot with a precomputed series.
SEED     plants S19 — "A sigma-delta oversamples inside itself: it trades speed for resolution. Tomorrow you'll
         do the same trick in firmware, on purpose."
-->

```flow
A **sigma-delta (Σ-Δ) ADC** takes a different approach. It samples and processes the signal internally
at a much higher rate than its final output data rate, and uses oversampling, noise shaping and digital
filtering to reach high resolution. This makes it attractive for **precision measurement of relatively
low-bandwidth signals**, such as many sensor applications. The ADS1115, which we meet on Day 2, is a
16-bit sigma-delta ADC.

[[demo]] Plot Bench: the same input through a sigma-delta modulator.

Two other architectures complete the common picture. A **flash ADC** uses many comparators in parallel
to find the input level very quickly; because the number of comparators grows rapidly with resolution,
flash converters suit applications where **very high speed** matters more than high resolution. A
**pipeline ADC** divides the conversion into stages that work on different samples at the same time,
which suits **high-speed acquisition** such as imaging, communications and high-speed instrumentation.
There are others, including integrating or dual-slope ADCs, but SAR, flash, sigma-delta and pipeline
cover many of the converters in modern electronic systems.
```

***

## The table everyone scrolls past

An ADC datasheet lists offset error, gain error, INL and DNL. Offset and gain move the whole
transfer line; INL and DNL bend it and make its steps unequal.

<!-- PLAN
SHOW     Figure — the ADC accuracy table from a real MCU datasheet (offset error, gain error, INL, DNL, absolute
         accuracy, in LSB), toured row by row; beside it a Plot of the transfer line: the ideal staircase,
         then offset (a shift), gain error (a tilt), INL (a bow, a·x·(1 − x)) and DNL (uneven steps), each a
         curve that can be shown on its own.
         Drive: tour a row; show its curve.
         Look for: two rows move the whole line, two bend it.
         Status: Plot ready · needs asset: the datasheet's ADC-characteristics page (PDF).
ASK      multi-select (after the tour) — "Which of these can a two-point calibration remove?"
         options: offset error | gain error | INL | DNL | quantization error
         answer: offset error; gain error
         reveal: a straight line through the two end points laid over each curve on the Plot.
         explain: Two points define a straight line, so they correct any error that is itself a straight line
                  — a shift or a tilt; a bend or an uneven step is still there between the points.
         depth: understand    practice: arguing from evidence
SEED     plants S21 — "Offset and gain shift the line; INL and DNL bend it. Tomorrow, two points will fix the
         first. Nothing fixes the second."
-->

<!-- FILLED 2026-10-07: drafted from training-overview Day 1 Module 2 (moved to conversion) and standard ADC-datasheet terminology; tutor to review -->

```flow
Every MCU datasheet has a table in its ADC section that most people scroll straight past: offset error,
gain error, integral nonlinearity and differential nonlinearity, usually given in LSB.

[[demo]] Here is one, beside the converter's transfer line: input voltage along the bottom, code up the
side. The ideal is a perfect staircase on a straight line from zero to full scale.

**Offset error** shifts the whole line up or down: 0 V no longer gives code 0. **Gain error** tilts it:
the line reaches full scale at the wrong input. Both are straight-line errors.

**Integral nonlinearity**, INL, bends the line: it is the worst distance between the real transfer line
and a straight one. **Differential nonlinearity**, DNL, makes the steps unequal: some codes are wider
than one LSB and some narrower. If a step shrinks to nothing, that code goes missing.

[[ask]] Tomorrow we calibrate with two known points. Which of these errors can a two-point calibration
remove?

[[pause]]

[[reveal]] Offset and gain. Two points define a straight line, so they correct any error that is itself a
straight line: a shift or a tilt. A bend, or an uneven step, is still there between the points. And the
quantization floor stays where it was.

So read the table in two halves. Offset and gain tell you what calibration will have to fix. INL and DNL
tell you what it cannot.
```

***

## ENOB: the honest number of bits

With real noise and distortion present, a converter behaves like one with fewer bits. A typical 12-bit
MCU converter delivers closer to ten useful bits.

<!-- PLAN
ASK      numeric (before the reveal) — "A 12-bit ADC's datasheet gives a SINAD of 62 dB. What is its ENOB?"
         answer: 10.0 ± 0.1 bits
         reveal: the Equation below.
         explain: Each bit is worth 6.02 dB; 62 dB less the 1.76 dB a perfect quantizer already loses leaves
                  60.2 dB, which is ten bits' worth.
         depth: use    practice: computational thinking
SHOW     Equation — ENOB = (SINAD − 1.76 dB) / 6.02 dB, graphed against SINAD; worked examples: an ideal
         12-bit converter, 6.02 × 12 + 1.76 = 74.0 dB; a real one at 62 dB → 10.0 bits.
         Look for: every 6 dB of noise and distortion costs one bit.
         Status: ready.
HARVEST  S15 — "The decibels from conditioning: here they buy us an honest count of bits."
HARVEST  S34 — "We asked how much of that fineness is true. Here is the honest answer: about ten bits of
         twelve."
SEED     plants S20 — "More bits are not more accuracy. ENOB is the honest number. Tomorrow we read one off a
         real noise table, and then buy bits back with time."
-->

<!-- FILLED 2026-10-07: drafted from training-overview Day 1 Module 5 and the standard ENOB definition; tutor to review -->

```flow
Back to the question we left open: of the bits the datasheet promises, how many can you believe?

A perfect N-bit converter still has quantization error, and that alone sets its best possible
signal-to-noise ratio for a full-scale sine wave: 6.02 × N + 1.76 dB. For 12 bits, that is 74.0 dB.

A real converter adds noise and distortion, and the datasheet reports the total as **SINAD**, the
signal-to-noise-and-distortion ratio, in decibels. Turn that back into bits and you have the **effective
number of bits**: ENOB = (SINAD − 1.76) / 6.02.

[[ask]] A 12-bit ADC's datasheet gives a SINAD of 62 dB. What is its ENOB?

[[pause]]

[[reveal]] 62 minus 1.76 is 60.2 dB, and 60.2 divided by 6.02 is 10.0. Ten bits. The last two are noise
and distortion, not information.

Every 6 dB costs one bit. That is the decibels from the conditioning module, buying us an honest count of
bits. More bits are not more accuracy; ENOB is the honest number. It says nothing about offset, gain or
the reference, though: those are the table we just read, and the next module.

Putting the converter's work together:

**Analog signal → signal conditioning → sampling (deciding when to measure) → quantization (deciding
which level represents each measurement) → encoding (representing that level as a digital code) →
digital data**

The code the ADC produces is still only a **representation of the electrical signal**. To turn it into a
meaningful measurement we will still need scaling, calibration, conversion and interpretation. The ADC
is an important bridge between the analog and digital domains — not the final stage of measurement.

[[transition]] There is one input to every conversion that we have not yet questioned. Every one of
those levels is a fraction of something: the reference. The last module of the day asks what the code
is really a ratio *to* — and finds a way to make that question disappear.
```
