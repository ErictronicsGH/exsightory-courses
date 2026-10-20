---
targetMinutes: 45
motivates: The RMS voltage is right, the RMS current is right, and the power factor is still wrong.
objectives:
  - Compute real power, apparent power and power factor from sampled voltage and current, and say when power factor is not simply cos φ.
  - Explain why muxed sequential V and I sampling corrupts a power-factor measurement, and fix it.
concepts: [ac-power, mux-phase-error]
---

# Power on an MCU: real, reactive, and the phase-error trap

<!-- PATH: … → CONVERSION (two channels) → … →[ FIRMWARE: V × I ]→ NUMBER
     AC pass: a second channel joins the first, and the timing between them becomes part of the number.
     TOOL: Plot (centrepiece: the PF a sequential sampler reports against f, with the V-to-I delay; v, i and p with φ;
           distorted current) · Draw (phasors and the power triangle, extending waveform-construction) · Equation
           (P, Q, S) · Coding Bench (power: P, S, PF from samples; mux delay and its correction) · Figure (MUX
           timeline, asset). Electronics ideal: AC source, inductor class, R/L/C loads, scope with a v·i trace.
     SOURCES: AC_Metering_System_Simulation_Project.md §6, §12, §18–22, §28 Scenario 8;
              transcripts/Chapter 07 - Analog to digital converters.md "Multiplexed inputs";
              training-overview.md Day 3 Module 5, learning outcome 8. -->

## Why V × I stops being power once phase enters

Real power depends on voltage and current at corresponding points in time. Multiply each pair of
samples, p_n = v_n · i_n, and power itself varies with time; once current is shifted from voltage, the
product of the two RMS values is no longer the power.

<!-- PLAN
SHOW     Plot — v(t) = √2·sin(ωt) and i(t) = √2·sin(ωt − φ) (1 V and 1 A RMS) over two cycles of 50 Hz, and
         p(t) = v·i with fill, a dashed line at its average, cos φ. Slider: φ (−90° → +90°, start at 0). Drive:
         φ = 0 (resistive: p never goes negative, its average is 1 W = V_RMS·I_RMS), then 60° (inductive), then
         animate to 90°.
         Look for: the negative lobes, where the load hands energy back; the average falls to 0.5 W at 60° and to
         zero at 90°, while V_RMS·I_RMS stays 1 VA throughout.
         Status: ready. Ideal on-circuit version → needs Electronics: AC source, inductor class, scope with a
                 v·i math trace.
ASK      poe (before the statement) — "An inductive load: the current lags the voltage. Is V_RMS × I_RMS the power
         it takes?"
         options: yes | no — it takes more | no — it takes less | it depends only on the frequency
         answer: no — it takes less
         reveal: drag φ from 0 to 60°; the filled p(t) dips below zero and its average falls
         explain: for part of every cycle v and i have opposite signs and energy flows back to the source, so the
                  average of v·i is smaller than the product of the two RMS values.
         depth: understand    practice: developing models
HARVEST  S26 — "Equal heating defined RMS through an average of power. The watt on a meter is the same idea: real
         power is average power, the mean of v·i, not the product of two RMS values."
-->

```flow
We have an RMS voltage we can defend, and the same steps give us an RMS current. The natural next move is
to multiply them and call the result power.

Real power depends on the relationship between voltage and current **at corresponding points in time**.
The instantaneous power is

**p(t) = v(t) · i(t)**

and therefore, in the digital system, for each corresponding pair of samples,

**p_n = v_n · i_n**

This produces a sequence of instantaneous power values, and when we plot it we see something important:
**power itself can vary with time**.

Now change the load. With a resistive load, voltage and current are approximately in phase. With an
inductive load, current lags voltage. With a capacitive load, current leads voltage.

[[ask]] An inductive load: the current lags the voltage. Is V_RMS × I_RMS the power it takes?

[[pause]]

[[demo]] Plot Bench — the resistive and the inductive load, v, i and p = v·i on one plot.

[[reveal]] For a purely resistive sinusoidal load, P ≈ V_RMS · I_RMS. For loads with a power factor below
unity, P < V_RMS · I_RMS. Once phase enters, V × I is no longer the power.
```

***

## Real, reactive and apparent power

Real power is the average of the instantaneous power, in watts. Apparent power is V_RMS × I_RMS, in
volt-amperes. Below unity power factor, real power is less than apparent power. Real, reactive and
apparent power are derived together.

<!-- PLAN
SHOW     Draw — start from the existing waveform-construction drawing (a phasor drawing a sine); add a current
         phasor lagging by φ; resolve it into I·cos φ along V and I·sin φ across it; scale both by V into P and Q,
         and close the triangle with S. Drive: one step per quantity. Then Equation — S = √(P² + Q²), P = S·cos φ,
         Q = S·sin φ, worked example 230 V, 4.2 A, PF 0.86: S = 966 VA, P = 831 W, Q = 493 var. Then the Coding
         Bench power program: P as the mean of v_n·i_n, S from the two RMS values, on a resistive and an
         inductive load.
         Look for: P and Q come from the same current, split by the angle; S is what the wiring has to carry.
         Status: needs Draw: power triangle from phasors (extends waveform-construction); Equation ready; needs
                 Coding Bench: power (accumulates v·i, v², i² over whole cycles; load selector)
-->

<!-- FILLED 2026-10-07: drafted from training-overview Day 3 Module 5 and standard practice (reactive power); tutor to review.
     Was: GAP — no transcript yet. Needs (training-overview Day 3 Module 5): real, reactive *and* apparent power derived together. The AC metering project lists reactive power only as an extension (AC doc §2), so the derivation of reactive power, and how the three relate, still has to be written. -->

```flow
The **real power** is obtained from the average of instantaneous power:

**P = (1/N) Σ v_n i_n**

The result is expressed in **watts (W)**.

**Apparent power** is

**S = V_RMS · I_RMS**

It is expressed in **volt-amperes (VA)**, and it represents the product of RMS voltage and RMS current.
So where does the rest of S go?

[[demo]] Draw — the voltage phasor, then the current phasor, lagging it by φ.

Split the current into two parts. One part, I cos φ, lies along the voltage, in phase with it. The other,
I sin φ, lies at right angles to it.

The in-phase part does the work. Multiply it by V and you have the **real power**, P = V I cos φ, in watts.

The part at right angles flows into the load for a quarter of a cycle and back out for the next quarter: the
negative lobes we saw in p(t). On average it delivers nothing, but it still flows in the wires. Multiply it by
V and you have the **reactive power**, Q = V I sin φ, in volt-amperes reactive, var.

[[demo]] Close the triangle.

P and Q are at right angles, and S is the hypotenuse: S² = P² + Q². Take the capstone's example: 230 V, 4.2 A,
power factor 0.86. S is 966 VA, P is about 831 W, and Q is about 493 var. The cables and the fuse have to carry
the 966; only the 831 does any work.

[[demo]] Coding Bench — the power routine: multiply each pair of samples, accumulate, average. P comes straight
from the samples, and S from the two RMS values.

One caution: P = V I cos φ and Q = V I sin φ assume sine waves. The sampled P, and S, are more general. The
next card shows why that matters.
```

***

## Power factor is P / S — and only sometimes cos φ

Power factor is P / S. For an ideal sinusoidal system with a linear load it equals cos φ. For distorted
waveforms the current contains harmonics, cos φ no longer fully describes the true power factor, and
the sampled-waveform P / (V_RMS I_RMS) is the general measurement.

<!-- PLAN
SHOW     Plot — v = √2·sin(ωt) and a distorted current i = √2·(sin(ωt) + h·sin(3ωt))/√(1 + h²) (1 A RMS for every
         h), with p = v·i filled. Slider: h, the third-harmonic content (0 → 1). Beside it, against h: the power
         factor 1/√(1 + h²) and cos φ₁ = 1. Drive: h = 0, then 0.5, then 0.8.
         Look for: the fundamental stays in phase (cos φ = 1), yet PF falls to 0.89 at h = 0.5 and 0.78 at
         h = 0.8 — the harmonic carries RMS current but no average power. Then Scenario 8 in the Coding Bench
         power program: P/(V_RMS·I_RMS) from the samples reports the same 0.78 with no phase angle measured.
         Status: ready (Plot); needs Coding Bench: power (distorted-current load)
ASK      poe (before the statement) — "A nonlinear load distorts the current waveform. Can we still get its power
         factor from the phase angle between V and I?"
         options: yes — cos φ of the fundamental is the power factor | no — the power factor is lower than cos φ |
                  no — the power factor is higher than cos φ      answer: no — the power factor is lower than cos φ
         reveal: raise h on the Plot with the fundamental held in phase
         explain: with a clean sine of voltage, the harmonic adds to the current's RMS, and so to S, without adding
                  to the average of v·i, so P/S falls below cos φ; the shortfall is the distortion power factor.
         depth: understand    practice: arguing from evidence
-->

<!-- FILLED 2026-10-07: drafted from training-overview Day 3 Module 5, the AC metering doc §22 and §28 Scenario 8, and standard practice (distortion power factor); tutor to review.
     Was: GAP — no transcript yet. Needs (training-overview Day 3 Module 5): name *distortion power factor* for the non-sinusoidal loads embedded work actually meets, and connect it to the sampled-waveform result. -->

```flow
**Power factor** is

**PF = P / S = P / (V_RMS · I_RMS)**

For a system where the calculated real power and apparent power are positive, 0 ≤ PF ≤ 1 for the common
load conditions we consider. For an ideal sinusoidal system with a linear load,

**PF = cos φ**

where φ is the phase difference between voltage and current. That relationship is a useful conceptual
bridge. But **power factor is more general than simply phase angle**.

[[ask]] Now a nonlinear load: the current waveform is distorted, not simply a shifted copy of the
voltage. Can we still get its power factor from the phase angle between V and I?

[[pause]]

[[demo]] Widget — Scenario 8, distorted current.

On the Plot bench: the voltage stays a clean sine, and the current gains a third harmonic as I raise the
slider. The fundamental stays exactly in phase, so cos φ stays at 1. Watch the power factor.

[[reveal]] For distorted waveforms, the current may contain harmonics, and the simple cos φ
interpretation may no longer fully describe the true power factor. This is what lets the meter show that
power factor is not merely a matter of looking at two sine waves and measuring their phase angle. The
sampled-waveform method, PF = P / (V_RMS · I_RMS), remains the more general measurement.
On the plot, with a third harmonic of half the fundamental, the power factor is 0.89. At 0.8 it is about 0.78.
And cos φ is still 1.

The harmonic adds to the current's RMS, so it adds to S. But with a clean sine of voltage, voltage times a
third-harmonic current averages to zero over a cycle, so it adds nothing to P. P over S falls.

Engineers split the result in two. The **displacement** power factor is cos φ of the fundamental. The
**distortion** power factor is the fundamental current divided by the total RMS current. The true power factor
is their product. Rectifiers with a smoothing capacitor, switch-mode supplies and LED drivers draw exactly this
kind of current: often nearly in phase, and still with a power factor well below 1.

[[demo]] Coding Bench — Scenario 8 in the power routine: P / (V_RMS · I_RMS) from the samples gives the same
0.78, and no phase angle was measured.
```

***

## One converter, many inputs, at different times

A four-channel multiplexed ADC is one conversion system connected to four inputs at different times,
not four ADCs converting simultaneously. Its conversions are shared between the channels.

<!-- PLAN
SHOW     Figure — Day 1's four sensors → MUX → one sample-and-hold → ADC, re-embedded, with a timeline under it:
         conversions 1, 2, 3, 4, 1, 2, … each 100 µs long. Drive: spotlight the single ADC, then walk the timeline.
         Status: needs asset: the Day 1 · 070 MUX figure with a timeline row (SVG)
ASK      numeric (after the statement) — "An ADC performs 10,000 conversions per second and shares them equally
         over four inputs. How many samples per second does each sensor get?"
         answer: 2,500 samples/s (exact)
         reveal: the timeline: each input comes round every fourth slot, every 400 µs
         explain: one conversion engine divides its 10,000 conversions a second among four inputs, so each gets a
                  quarter, and each input's sample sits 100 µs from its neighbour's.
         depth: use    practice: computational thinking
-->

```flow
Everything so far assumed that v_n and i_n were taken at the same moment. Were they?

Many ADCs have more than one analog input but do not necessarily contain a separate ADC for every input.
Instead, they may use an **analog multiplexer**, usually called a **MUX**. A multiplexer is essentially an
electronically controlled selector. It allows the ADC to choose **which input is connected to the
conversion circuitry at a particular moment**.

Imagine we have four sensors, all going into one analog MUX and then one ADC. The ADC can select Sensor 1,
perform a conversion, then select Sensor 2, perform another conversion, and so on. It is therefore more
accurate to think of a four-channel multiplexed ADC as:

**One conversion system that can be connected to four different inputs at different times,**

rather than:

**Four ADCs converting four signals simultaneously.**

This distinction becomes important when considering **sampling rate**.

[[ask]] Suppose an ADC can perform 10,000 conversions per second and has four multiplexed inputs, shared
equally. How many samples per second does each sensor get?

[[pause]]

[[reveal]] We cannot simply claim that each sensor is being sampled at 10,000 samples per second. The
available conversion time must be shared between the channels. An idealised arrangement might provide
roughly:

**10,000 conversions/s ÷ 4 channels = 2,500 samples/s per channel**

The actual rate depends on how the ADC and software configure the multiplexer and whether every channel
is sampled equally.
```

***

## Sequential sampling is a phase error

A muxed ADC samples voltage and current sequentially. The microseconds between them are a phase
error, and it grows with frequency. Computed live, then swept in the widget.

<!-- PLAN
SHOW (centrepiece) Plot — the power factor a sequential (V, then I) sampler reports, against frequency f
         (0 → 1 kHz): cos(φ − 360°·f·Δt), with the true cos φ dashed and the phase error, 360°·f·Δt, as a second
         curve. Sliders: Δt, the gap between the V and I conversions (0 → 200 µs, default 100 µs), and φ, the
         load's angle (−90° → +90°, default +60°: inductive, PF 0.50). Drive: Δt = 0 (simultaneous: the curves
         coincide); Δt = 100 µs, read at 50 Hz; set φ = −60° (capacitive); then animate f.
         Look for: at 50 Hz, 100 µs is 0.5 % of the period and 1.8°, which turns a true PF of 0.500 into 0.527 for
         the inductive load — 509 W reported for 483 W at 230 V and 4.2 A — and into 0.473 for the capacitive one;
         at a resistive load it barely shows (0.9995). At 400 Hz the same gap is 14.4°, at 1 kHz 36°.
         Status: ready. The Coding Bench power program with its mux delay switched on reproduces the same numbers
                 from samples (needs Coding Bench: power, mux-delay switch).
ASK      numeric (after the statement) — "Use the multiplexer we just met. How far apart in time are the voltage and
         current samples of one pair, and what angle is that at 50 Hz?"
         answer: 1.8° ± 0.1° (100 µs, 0.5 % of 20 ms)
         reveal: Δt = 100 µs on the Plot; the phase-error curve reads 1.8° at 50 Hz
         explain: 100 µs out of a 20 ms period is 1/200 of a cycle and 360°/200 = 1.8°, so each current sample
                  belongs to a moment 1.8° later than the voltage sample it is multiplied with.
         depth: use    practice: computational thinking
ASK      poe (after the statement) — "Before the sweep: what happens to that error at a higher frequency?"
         options: it shrinks | it stays at 1.8° | it grows in proportion to the frequency | it grows with the square
                  of the frequency      answer: it grows in proportion to the frequency
         reveal: animate f from 50 Hz to 1 kHz; the phase-error line rises straight
         explain: the gap is a fixed time, and a fixed time is a larger fraction of a shorter period, so the angle is
                  360°·f·Δt.
         depth: understand    practice: developing models
HARVEST  S17 — "On Day 1: one capacitor, many inputs, converted at different times — and I said it would matter a
         great deal today. Here is how much: 100 µs is 1.8° at 50 Hz, and five percent of the real power at a power
         factor of one half."
HARVEST  S73 — "This morning it was slope times lateness. Here the lateness is fixed and the slope is the
         current's, so the error comes out as an angle: 2πf·Δt."
FAULT    PF reads 0.53 on a 0.50 inductive load and 0.47 on an equal capacitive one; the diagnostic is that the
         error flips sign with the direction of the phase shift and grows with frequency (wrap-up F5).
-->

<!-- FILLED 2026-10-07: drafted from training-overview Day 3 Module 5 (Demo #9), the AC metering doc §12 and §26, and standard practice; tutor to review.
     Was: GAP — no transcript yet. Needs (training-overview Day 3 Module 5): the MCU-specific trap and the best lesson of Day 3. A muxed ADC samples voltage and current *sequentially*, and the microseconds between them are a phase error that grows with frequency. Compute it live with the room from the delay and the period, then sweep it in the widget (Demo #9). This is the "channel skew" in the capstone's list of timing errors (AC doc §26), and the cousin of this morning's jitter. -->

```flow
So with one conversion engine, the voltage and current samples are taken one after the other:

**Voltage sample → Current sample → Voltage sample → Current sample**

and not:

**Voltage sample and current sample at the same measurement instant.**

The voltage and current samples must have a **known timing relationship**, because p_n = v_n · i_n
assumes the two belong to the same instant.

[[ask]] Use the multiplexer we just met. How far apart in time are the voltage sample and the current
sample of one pair? What fraction of a 20 ms mains period is that, and what angle does it make?

[[pause]]

[[reveal]] Ten thousand conversions a second is one every 100 µs, so the current sample is taken 100 µs after
its voltage sample. A mains period is 20 ms, so that is half a percent of a cycle, and half a percent of 360° is
1.8°.

So every current sample is multiplied with a voltage sample from 1.8° earlier. As far as the firmware can tell,
the load's phase angle has changed by 1.8°.

Is 1.8° a lot? On a resistive load, hardly: cos 1.8° is 0.9995. But take an inductive load with a power factor
of 0.5, an angle of 60°. Sampled this way it looks like 58.2°, and the meter reports 0.527. At 230 V and 4.2 A
that is 509 W reported for 483 W: over five percent of the real power, from timing alone. On an equal
capacitive load the error goes the other way, to 0.473.

[[ask]] Before the sweep: what happens to that error at a higher frequency?

[[pause]]

[[demo]] Demo #9 — sequential vs simultaneous sampling, delay and frequency as sliders, PF error plotted.
On the Plot bench: the power factor this sampler reports, against frequency. The delay at zero first, which is
simultaneous sampling, and the reported and true curves lie on top of each other. Now 100 µs. Now sweep the
frequency.

[[reveal]] It grows in proportion. The delay is a fixed time, and a fixed time is a bigger slice of a shorter
period: 1.8° at 50 Hz, 14.4° at 400 Hz, 36° at 1 kHz. The harmonics of a distorted current are higher
frequencies, so they are shifted most of all.

This morning we said an error in *when* becomes an error in *what*: the slope times the lateness. Here the
lateness is fixed, and it comes out as an angle, 2πf × Δt. On Day 1 I said that one capacitor serving many
inputs at different times would matter a great deal today. That is how much.
```

***

## The fixes: sample together, or correct for the delay

An ADC system with independent conversion engines can acquire voltage and current at the same instant.
Where only one converter is available, the delay between the channels is known, and can be accounted
for.

<!-- PLAN
SHOW     Coding Bench — the power program on the inductive load with the mux delay on (PF 0.527); then with the
         correction on: the voltage interpolated to the current's instant, v_corr = v_n + (Δt/T_s)·(v_(n+1) − v_n),
         or the order V, I, V with the two voltage samples averaged; then a simultaneous-sampling configuration
         (two converters). Drive: delay on, correction off → on → simultaneous.
         Look for: both fixes bring PF back to about 0.500; the interpolation needs Δt, which comes from the
         acquisition and conversion times the firmware itself configured, and not the frequency.
         Status: needs Coding Bench: power (mux-delay and correction switches, simultaneous mode)
ASK      checkpoint (after the statement) — "Your MCU has one ADC and a mux. Which fix is open to you, and what do
         you need to know to apply it?"
         items: the fix — correct in firmware for the known delay (interpolate, or sample V, I, V and average) |
                what you need — the exact Δt between the two conversions, from the ADC clock, acquisition and
                conversion times | a fixed-angle correction also needs the frequency | the check — a resistive
                load must read PF ≈ 1.000
         depth: create    practice: designing solutions
-->

<!-- FILLED 2026-10-07: drafted from training-overview Day 3 Module 5 and learning outcome 8, and standard practice; tutor to review.
     Was: GAP — no transcript yet. Needs (training-overview Day 3 Module 5 and learning outcome 8: "explain why muxed sequential V and I sampling corrupts a power-factor measurement, and fix it"): the second fix, correcting in firmware for the known delay between the channels, when only one converter is available. -->

```flow
This is why ADC architecture matters. A multiplexed ADC with one conversion engine may acquire multiple
channels sequentially. An ADC system with **independent conversion engines** may allow **simultaneous**
acquisition.

[[ask]] Your MCU has one ADC and a mux. Which fix is open to you, and what do you need to know to apply
it?

[[pause]]

The first fix needs different hardware: two converters, or one with a sample-and-hold on each channel,
triggered together. Many MCUs have two or more ADCs that can be triggered at the same moment, so check before
you assume you have only one.

The second fix is in firmware, and it works because the delay is known. Your code configured the ADC clock,
the acquisition time and the conversion time, so you know Δt. Estimate the voltage at the instant the current
was sampled: interpolate between two voltage samples, or sample voltage, current, voltage and average the two
voltage samples. Or rotate the result by the angle 2πf × Δt, but then you need the frequency as well.

[[demo]] Coding Bench — the power routine on the inductive load. Delay on: 0.527. Interpolation on: back to
about 0.500. Then simultaneous sampling: 0.500.

And the check, whichever fix you use: a purely resistive load must read a power factor of 1.000.

[[transition]] We now have every stage of the AC path: the quantity, getting at it safely, ground and
wiring, bias and anti-alias, sampling rate and sampling instants, RMS, and power with the timing between
two channels. After the break we stop studying the stages one at a time and build the whole path as one
instrument.
```
