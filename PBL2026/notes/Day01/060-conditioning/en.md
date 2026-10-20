---
targetMinutes: 40
motivates: Tens of millivolts of shunt signal, riding on a large common-mode voltage, have to fill an ADC's range — without amplifying the amplifier's own errors along with them.
objectives:
  - Say what signal conditioning does, and where on the path each conditioning function belongs.
  - Explain differential gain and why CMRR decides whether high-side sensing works.
  - Predict how much of an ADC's range an amplified input offset consumes at a given gain.
concepts: [signal-conditioning, decibels, differential-gain, input-offset]
---

# Signal conditioning: in-amps, gain, offset and bias current

<!-- PATH: quantity → sensor → loading → [ CONDITIONING ] → ADC → firmware → number
     TOOL: Plot (centrepiece: offset at gain — the ADC's range eaten before the signal arrives) ·
           Equation (closed-loop gain; decibels; CMRR as input-referred error; bias current through the
           source resistance) · Draw (the conditioning functions pinned on the path) · Electronics (ideal:
           an in-amp across the high-side shunt from 050 — needs an in-amp part).
     SOURCES: transcripts/Chapter  03 - Signal conditioning.md (introduction, Amplification);
              07_compensation_techniques.md (Negative feedback);
              Chapter 16 - logarithmic_representations_decibels.md; training-overview.md Day 1 Module 8. -->

## The sensor's output is rarely ready

It may be too small, too large, noisy, offset, nonlinear, high in impedance, outside the ADC's
range, or differential when the next stage expects otherwise.

<!-- PLAN
ASK      multi-select (at the Flow's [[ask]]) — "Our high-side shunt from 050 gives 20 mV, riding on 12 V.
         Which items on this list does it fail?"
         options: too small | too large | high impedance | outside the ADC's input range | differential when
                  the ADC expects a single-ended input
         answer: too small; outside the ADC's input range; differential
         explain: 20 mV fills under 1 % of a 3.3 V range; both of its terminals sit near 12 V; and the
                  information is the difference between two terminals — while 10 mΩ is about as low an output
                  impedance as a signal ever has.
         depth: understand    practice: defining problems
HARVEST  S33 — "Twenty millivolts on twelve volts: the pair from the last module. This is where we deal with it."
-->

```flow
A sensor's output is often not immediately suitable for the next stage. Before we display, record or
transmit it, we have to make sure it is suitable. The output may be:

- too small
- too large
- noisy
- offset
- nonlinear
- high impedance
- outside the input range of the ADC
- differential when the receiving circuit expects another configuration

[[ask]] Our shunt from the last module gives a few tens of millivolts. Which items on this list does it
fail?

[[pause]]
```

***

## What conditioning does

Conditioning prepares a signal for the next stage: amplifying, attenuating, level shifting,
filtering, buffering, isolating, linearizing. Each has its own place on the path.

<!-- PLAN
SHOW     Draw — the conditioning functions pinned on the path where the course meets them: attenuation and
         buffering (040), amplification (here), level shifting (Day 2·010), linearization (Day 2·050),
         isolation (Day 2·080), filtering (Day 3·020).
         Status: needs Draw (pins over the path drawing).
-->

```flow
This is where **signal conditioning** comes in. Signal conditioning prepares a signal for the next
stage. It may need circuits that perform amplification, level shifting, filtering, impedance matching,
buffering, modulation, demodulation, and other forms of signal processing.

We have already met two of these at the sensor: attenuation and buffering. The others each belong at a
particular place on the path, and we will meet them there — level shifting where the code crosses
between logic families on Day 2, linearization in the firmware, isolation when we approach the mains,
and filtering when the signal meets the sampler on Day 3. Here we deal with the one this signal needs
most: gain.

Signal conditioning is not simply "extra circuitry". It is often what makes the interface between the
sensor and the measurement system practical at all.
```

***

## Amplification, and undoing it

Multiply a small signal by a known gain until the next stage can use it: 5 mV becomes 2 V. In
firmware, divide by the same gain to recover what the sensor said.

<!-- PLAN
SHOW     Equation — V_out = G·V_in, rearranged to what the firmware does: V_in = V_out / G. Worked example:
         5 mV × 400 = 2 V.
         Status: ready.
-->

```flow
In **amplification**, we take a small signal and multiply it by a factor called the **gain** to
increase its amplitude. That brings the input signal to a level the next stage can deal with — for
example, **5 mV → 2 V**.

Once the signal reaches the microcontroller, we can use computation to reverse every transformation we
applied, and recover the actual value the sensor produced — in this case, by dividing by the
amplification factor.
```

***

## Negative feedback sets the gain

With enough loop gain, the gain is set by the feedback network, not by the amplifier. The feedback
part handles little power, so it can be made accurate and stable.

<!-- PLAN
ASK      poe (before the graph) — "An amplifier with an open-loop gain of 100,000 is set by feedback to a gain
         of 100. It warms up, and its open-loop gain falls to 10,000. What is the gain now?"
         options: about 10 | about 99 | exactly 100 still | about 1,000
         answer: about 99
         reveal: the Equation at G = 10⁵ (99.90) and at G = 10⁴ (99.01).
         explain: With G·H still at 100 the loop takes up almost all of the change, so a tenfold fall in G
                  moves the result by under 1 %.
         depth: understand    practice: developing models
SHOW     Equation — A_cl = G / (1 + G·H), graphed against G from 10² to 10⁶ with H = 0.01, and a family for
         H = 0.1, 0.01 and 0.001. It stands in for the missing image-7 and image-8 figures.
         Drive: slide G across four decades.
         Look for: the curve flattening onto 1/H; the amplifier's own gain stops mattering.
         Status: ready.
HARVEST  S11 — "Remember the five defences from the sensor? This is the one we left for here: negative
         feedback."
-->

<!-- The original notes show this relation as an image (image-8.png) and the block diagram as
     image-7.png; neither is in transcripts/. Only image-3.png is present. -->

```flow
Negative feedback is a common way to reduce the effect of modifying inputs, and it is the method used
in null measurement systems.

It assumes that the measurement system and the feedback are linear, described by their transfer
functions G(s) and H(s). The input–output relation is the closed-loop gain G/(1 + GH), which tends to
1/H when G(s)H(s) ≫ 1.

If the feedback is insensitive to the modifying input, and the system has been designed to remain
stable, the output is not affected by the modifying input.

The advantage comes from the different physical characteristics of the two blocks. H is likely to be
insensitive to a modifying input because it handles less power than G. That also gives H higher
accuracy and linearity. And negative feedback extracts less energy from the measured system, because G
is designed to be very large.
```

***

## Ratios in decibels

A decibel is a ratio on a logarithmic scale: twenty times the log of a voltage ratio, ten times the
log of a power ratio. Gains in a chain then add instead of multiply.

<!-- PLAN
SHOW     Equation — dB = 20·log(V_out/V_in) and dB = 10·log(P_out/P_in), with worked examples: ×2 → +6.02 dB,
         ×0.5 → −6.02 dB, ×10 → +20 dB.
         Status: ready.
ASK      flash (at the Flow's [[ask]]) — "Three stages: ×10, ×0.5 and ×100. What is the total gain, in dB?"
         options: ≈ 27 dB | ≈ 54 dB | ≈ 66 dB | 500 dB
         answer: ≈ 54 dB
         explain: 20 dB − 6 dB + 40 dB = 54 dB, the same as 20·log 500; 27 dB is what the power formula gives
                  for that voltage ratio.
         depth: use    practice: computational thinking
SEED     plants S15 — "Decibels: a ratio you can add. We spend them three times: CMRR in a moment, bits at the
         converter, and a filter on Day 3."
-->

```flow
Before we can say how well an amplifier rejects what it should ignore, we need the unit engineers use
for ratios.

The **decibel** (dB) is simply a way of expressing the ratio between two signal levels
logarithmically — for example, the output-over-input ratio, the gain, of an amplifier. Because the
decibel is a ratio, it is dimensionless, even though dB looks like a unit to some people.

To analyse gains and losses with addition and subtraction instead of multiplication and division, we
use a small mathematical trick: take the base-10 logarithm of the ratio and multiply it by a scaling
factor, 10 or 20.

For voltage, as in a voltage amplifier: **dB = 20 log(V_out / V_in)**. The same formula holds for
current amplifiers.

For power we need a modified expression, because power is proportional to the square of the voltage
or current: **dB = 10 log(P_out / P_in)**.

So why convert easy-to-handle numbers like voltage or power gains into dB? Because it makes signal
levels through a system easier to calculate. With three stages of amplification, the net gain is the
product of the gains; in dB, it is the sum. A convenience of the scheme is that gains are positive
numbers and losses negative ones. A loss of −6.02 dB is easier to picture than a "gain" of +0.50.

To convert back from dB to a gain, reverse the log operation.

[[ask]] Three stages: ×10, ×0.5 and ×100. What is the total gain, in dB?

[[pause]]

We will use decibels three times in this course: for CMRR in a moment, for the effective number of
bits at the converter, and for the anti-alias filter on Day 3.
```

***

## Differential gain: amplify the difference

An instrumentation amplifier amplifies the difference between its two inputs and ignores what
they have in common.

<!-- PLAN
SHOW     Electronics — the high-side shunt from 050 (12 V, 10 mΩ, 6 Ω load, 2 A) with an instrumentation
         amplifier across it at G = 100; Voltage overlay on both inputs and the output.
         Drive: probe each input; probe the output; move the shunt and the in-amp to the low side.
         Look for: both inputs near 12 V and the output at 2.0 V, and the same 2.0 V at the low side.
         Status: needs Electronics: instrumentation amplifier (gain, V_os, I_b, CMRR and rails as parameters;
                 reveals for offset and common-mode leakage).
SEED     plants S16 — "An in-amp ignores what both inputs share. Tomorrow you'll meet an ADC with paired inputs
         for exactly this reason, and by the evening the same trick beats a ground loop."
-->

<!-- FILLED 2026-10-07: drafted from training-overview Day 1 Module 8 and standard in-amp practice; tutor to review -->

```flow
[[demo]] Electronics Bench: an in-amp across the high-side shunt from 050, both inputs riding on the supply.

Back to the high-side shunt: 20 mV, sitting on 12 V. An ordinary amplifier referred to ground would see
the 12 V and amplify that. We need one that sees only the difference between the shunt's two ends.

An **instrumentation amplifier**, or in-amp, does exactly that. Its output is the gain times the
difference between its two inputs, measured from its own reference pin. What the two inputs have in
common, here the 12 V, is the **common-mode voltage**, and ideally it is ignored.

On the bench: the in-amp across the high-side shunt, set to a gain of 100. Watch the overlay. Both inputs
sit near 12 V. The output sits at 2.0 V: 20 mV times 100.

Now I move the shunt and the in-amp to the low side. The inputs drop to near 0 V, and the output stays at
2.0 V. The amplifier never cared where the signal was sitting, only how big the difference was.

The classic in-amp is three op-amps and a set of closely matched resistors in one package, with the gain
set by a single resistor. And it ignores the common-mode voltage only within its input range: check that
a part is rated for 12 V on its inputs before you put it on the high side.

An in-amp ignores what both inputs share. Tomorrow you will meet an ADC with paired inputs for exactly
this reason.
```

***

## CMRR decides whether high-side sensing works

No amplifier ignores the common-mode voltage completely. Its common-mode rejection ratio, in dB, says
how much of that large voltage leaks into the small signal.

<!-- PLAN
ASK      poe (at the Flow's [[ask]]) — "The same shunt signal, measured at the low side and then at the high
         side. Does the in-amp's output change?"
         options: no — an in-amp ignores the common-mode voltage | a little — some of the 12 V leaks through |
                  by 12 V times the gain | the output saturates
         answer: a little — some of the 12 V leaks through
         reveal: the Equation below at a CMRR of 80 dB, then 100 dB.
         explain: CMRR says how many times less the amplifier responds to what its inputs share than to their
                  difference; 80 dB is 10,000 times, so 12 V looks like 1.2 mV of signal, 6 % of 20 mV.
         depth: understand    practice: analysing data
SHOW     Equation — input-referred error = V_cm / 10^(CMRR/20), graphed against CMRR from 40 to 120 dB at
         V_cm = 12 V, beside the 20 mV signal.
         Look for: 1.2 mV (6 %) at 80 dB, 0.12 mV (0.6 %) at 100 dB.
         Status: ready (ideal: the in-amp part's common-mode reveal).
FAULT    A plain op-amp difference amplifier with 1 % resistors on the high side: CMRR around 34 dB, so 12 V
         looks like about 0.24 V at the input — twelve times the full-scale shunt signal.
-->

<!-- FILLED 2026-10-07: drafted from training-overview Day 1 Module 8 and standard in-amp practice; tutor to review -->

```flow
[[ask]] The same shunt signal, measured at the low side and then at the high side. Does the in-amp's
output change?

[[pause]]

[[reveal]] It changes, a little. No amplifier ignores the common-mode voltage completely. A tiny fraction
of it leaks through, and the output cannot tell that fraction from signal.

How tiny is given by the **common-mode rejection ratio**, CMRR: how many times less the amplifier
responds to what its inputs share than to their difference. It is quoted in decibels.

[[demo]] On the Equation Bench, the error referred to the input is the common-mode voltage divided by the
CMRR as a ratio. Put in 12 V and 80 dB.

80 dB is a ratio of 10,000, so 12 V looks like 1.2 mV of signal. Against our 20 mV shunt signal, that is
a 6 % error, from nothing but where the shunt sits. Slide to 100 dB and it is 0.12 mV: 0.6 %.

That is why CMRR decides whether high-side sensing works. At the low side the common-mode voltage is
almost zero, and CMRR hardly matters. At the high side it turns the whole supply voltage into error.
Read the CMRR on the datasheet at the gain you will use, and notice that for most parts it gets worse
as the frequency rises.
```

***

## Offset is amplified exactly like the signal

The amplifier cannot tell its own input offset from your signal. At a gain of 500, a 2 mV offset is
1 V — a third of a 3.3 V ADC's range, gone before the signal arrives.

<!-- PLAN
ASK      numeric (before the reveal) — "The in-amp has a 2 mV input offset and a gain of 500. How much of a
         3.3 V ADC's range is gone before the signal arrives?"
         answer: 30 % ± 2 %    (1.0 V)
         reveal: the Plot below, V_os slid from 0 to 2 mV at G = 500.
         explain: The offset sits at the input, so it gets the full gain: 2 mV × 500 = 1.0 V, which is 30 % of
                  3.3 V, about 1,241 codes at 12 bits.
         depth: use    practice: computational thinking
SHOW (centrepiece) Plot — the ADC's view of the in-amp: y = clamp(G·(x + V_os), 0, 3.3) against x = V_in from 0
         to 7 mV, with the ideal G·x dashed and the 3.3 V ceiling as a line; sliders G (1 to 1000) and V_os
         (−3 to +3 mV).
         Drive: G = 500, V_os = 0 (the ceiling at 6.6 mV) → V_os to 2 mV → G at 100, 500, 1000 (the line
         starts at 0.2, 1.0, 2.0 V) → V_os to −2 mV.
         Look for: a third of the range used before the input leaves zero; the ceiling now reached at 4.6 mV;
         and, with a negative offset, a dead zone where small signals read zero.
         Status: ready (Plot: clamp) · the on-circuit version needs Electronics: in-amp with V_os (an offset
                 reveal).
FAULT    Offset at gain (a wrap-up staple): a positive offset reads current when none flows; a negative one
         hides small currents in a dead zone at zero. Calibration can subtract the first; the range it used
         is gone either way.
-->

<!-- FILLED 2026-10-07: drafted from training-overview Day 1 Module 8 and standard in-amp practice; tutor to review -->

```flow
[[ask]] The in-amp has a 2 mV input offset and a gain of 500. How much of a 3.3 V ADC's range is gone
before the signal arrives?

[[pause]]

[[demo]] Plot Bench: inject the offset into the model and watch the output with no signal applied.

On the Plot Bench: what the ADC sees from the in-amp. Gain 500, offset zero. The line starts at the
origin and reaches the 3.3 V ceiling at 6.6 mV of input. Now I slide the offset to 2 mV.

[[reveal]] The whole line lifts. With no signal at all, the output already sits at 2 mV times 500: 1.0 V.
That is 30 % of a 3.3 V range, about 1,241 codes at 12 bits, gone before the signal arrives. The ceiling
now comes at 4.6 mV.

Every op-amp and in-amp has an **input offset voltage**: a small voltage that behaves as if it were in
series with one input. The amplifier cannot tell it from your signal, so it gets exactly the same gain.

Watch the gain slider. At 100 the offset costs 0.2 V; at 500, 1.0 V; at 1,000, 2.0 V. The more gain
you need, the more the offset matters.

And if the offset is negative, small signals vanish into a dead zone at zero, because on a single supply
the output cannot go below ground.

Firmware calibration can subtract an offset, and we do that tomorrow. It cannot give back the range the
offset used up. So choose a part whose offset, times your gain, is small against your range.
```

***

## Bias current makes another offset

Input bias current flowing through the source's resistance is a voltage at the input, and it is
amplified just like the offset.

<!-- PLAN
SHOW     Equation — V_err = I_b·R_s at the input and G·I_b·R_s at the output, graphed against R_s from 100 Ω to
         1 MΩ with I_b = 10 nA (a bipolar-input part, as an example) and G = 500.
         Drive: R_s 1 kΩ → 100 kΩ.
         Look for: the output moving from 5 mV to 0.5 V with no change in the signal.
         Status: ready · the on-circuit version needs Electronics: in-amp with I_b.
FAULT    A high-impedance source on a bipolar-input amplifier: the "offset" changes when the sensor is
         swapped, because it was never the amplifier's alone.
-->

<!-- FILLED 2026-10-07: drafted from training-overview Day 1 Module 8 and standard in-amp practice; tutor to review -->

```flow
There is a second input error that looks just like offset.

Real amplifier inputs draw a small current, the **input bias current**. It is tiny: nanoamps for many
bipolar parts, picoamps for many CMOS ones. But it has to flow through whatever resistance sits in front
of the input, and a current through a resistance is a voltage. That voltage is amplified like everything
else.

[[demo]] On the Equation Bench: 10 nA of bias current as an example, a gain of 500, and the source
resistance as the slider. At 1 kΩ the bias current makes 10 µV at the input, 5 mV at the output. Now I
take the source to 100 kΩ: 1 mV at the input, 0.5 V at the output. Nothing changed in the signal, only
the resistance in front of it.

That is one more reason the source impedance from the impedance module matters. A high-impedance source
in front of a bipolar-input amplifier makes an offset of its own, and it changes when you change the
sensor. Choose a low-bias-current part, or keep the resistance each input sees small and equal, so the
two bias currents make nearly equal voltages that the in-amp rejects.

[[transition]] The signal is now big enough, in range, and as clean as the analog side can make it.
After the break it meets the converter — and the first thing it meets is not the conversion, but a
small capacitor that has to be charged in a very short time.
```
