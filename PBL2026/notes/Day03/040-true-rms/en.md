---
targetMinutes: 40
motivates: My firmware and my multimeter disagree on the same AC signal — which one is lying?
objectives:
  - Compute true RMS in firmware — accumulate squares, divide, root — over a whole number of cycles.
  - Predict how an average-responding meter misreads a non-sinusoidal waveform, and decide which reading to trust.
concepts: [true-rms]
---

# True RMS on an MCU vs on a meter

<!-- PATH: … → DIGITAL INTERFACE →[ FIRMWARE: compute ]→ NUMBER
     AC pass: evenly spaced samples arrive; the firmware turns them into the number that describes a moving quantity.
     TOOL: Plot (centrepiece: PWM duty against true RMS and an average-responding reading; the RMS window) · Coding
           Bench (true-rms: accumulate, divide, root; window length; bias removal) · Equation (form factor; RMS with a
           DC part) · Draw (half-wave-mean, existing) · Figure (meter panels and AC spec, asset). Electronics ideal:
           PWM/AC source, AC-coupled and average-responding DMM profiles.
     SOURCES: AC_Metering_System_Simulation_Project.md §14, §15, §16, §17;
              transcripts/Chapter 14 - what_is_average.md "Integrated average";
              training-overview.md Day 2 Modules 6 and 8, and "Purpose" (the meter thread). -->

## Accumulate squares, divide, root

The firmware converts each code to volts, squares every sample, averages the squares and takes the
square root. The result is the RMS voltage, in volts; the same steps on the current samples give the
RMS current, in amperes.

<!-- PLAN
SHOW     Coding Bench — the true-RMS routine on a buffer of 12-bit codes from the capstone's voltage path (3.3 V
         reference, bias at code 2048, 20 samples per 50 Hz cycle): code → volts → subtract the bias → square →
         accumulate → divide by N → square root, every intermediate value printed in its own column. Then the same
         routine on the current buffer. Drive: step the first three samples one line at a time (after the room's
         numeric), then run to the end of the window.
         Look for: the accumulator grows in steps the size of the signal's square; the result is 0.707 V at the
         pin, which the path's scale (325.3 V per volt) turns back into 230 V.
         Status: needs Coding Bench: true-rms (code buffer, bias removal, per-step columns, window length)
ASK      numeric (after the statement) — "The buffer starts 2048, 2432, 2778. Each sample in volts is
         (code − 2048) × 3.3/4096. Square each one. What is the running sum after three samples?"
         answer: 0.442 V² ± 0.005 V²
         reveal: step the Coding Bench run through the first three samples; the accumulator column shows it
         explain: the samples are 0, 0.309 and 0.588 V, whose squares, 0, 0.096 and 0.346 V², add to 0.442 V² —
                  the accumulator only ever adds squares.
         depth: use    practice: computational thinking
HARVEST  S26 — "On Day 2 we defined RMS as equal heating. Watch what the firmware does: square, because power goes
         as v²; average, because heat accumulates; root, to get back to volts. It is doing what the resistor does."
-->

```flow
The samples have arrived, evenly spaced. On Day 2 we said what number describes a moving quantity: its
RMS, the DC value that delivers the same heating. Now the firmware has to compute it.

The ADC first gives us a raw digital code. For example: ADC code = 3102. That number does not
automatically mean 3102 V, or 3102 A. We must know the ADC configuration and the measurement-path
relationship. For a simple ADC:

**V_ADC ≈ (Code / Code_max) × V_ref**

The measurement system then applies the scaling relationship of the sensing circuit: ADC code → ADC
voltage → conditioning scale → sensor scale → measured voltage. The same principle applies to current.
(And remember this morning's bias: among the computations the MCU has to do is removing the offset
before anything else.)

Then, for the sampled voltage values:

**V_RMS = √( (1/N) Σ v_n² )**

Voltage samples → square each sample → average the squares → square root → RMS voltage. The final
result is expressed in volts.

Similarly for current:

**I_RMS = √( (1/N) Σ i_n² )**

Current samples → square each sample → average the squares → square root → RMS current, in amperes.

[[demo]] Firmware sandbox — the four steps, with the intermediate values visible.

[[ask]] Before the code runs: take the first few samples in the buffer, convert them to volts and square
them by hand. What is the running sum after three?
```

***

## Over a whole number of cycles

The sum of squares is taken over a whole number of cycles of the waveform. The window the firmware
averages over is part of the measurement, not a detail of the code.

<!-- PLAN
SHOW     Plot — the RMS a firmware window reports, against the window's length W in cycles (0.5 → 3), for
         v = b + A·sin(2π·t + φ):
         sqrt(b² + 2bA·(cos φ − cos(2πW + φ))/(2πW) + A²·(½ − (sin(4πW + 2φ) − sin 2φ)/(8πW))),
         with the true RMS, sqrt(b² + A²/2), dashed. Sliders: start phase φ (0 → 360°), DC offset b (0 → 0.5 V);
         A = 1 V. Drive: b = 0, markers at W = 1 and 1.5; drag φ around; then raise b to 0.3 V; then put a marker
         at W = 1.25 and drag φ again.
         Look for: with no offset the curve touches the true RMS at every half cycle (sin² repeats each half cycle),
         so 1.5 cycles gives the same answer as 1; with b = 0.3 V, 1.5 cycles reads from 11 % low to 10 % high
         depending on φ, and only whole cycles stay on the line. At 1.25 cycles even the clean sine reads 6.6 % low
         to 6.2 % high. Then the same windows in the Coding Bench true-rms program (the Flow's "sandbox").
         Status: ready (Plot); needs Coding Bench: true-rms (window length, start phase, DC offset)
ASK      poe (before the statement) — "I compute the RMS of a clean sine over exactly one cycle, then over one and a
         half. Will the second answer be higher, lower, or the same?"
         options: higher | lower | the same | it depends on where the window starts      answer: the same
         reveal: W = 1.5 on the Plot for every φ; then b raised to 0.3 V, and the 1.5-cycle reading leaves the line
                 while the 1-cycle reading stays
         explain: the square of a clean sine repeats every half cycle, so any whole number of half cycles averages
                  it exactly, but a DC part or an even harmonic repeats only once per cycle — which is why the rule
                  the firmware keeps is whole cycles.
         depth: understand    practice: analysing data
SEED     plants S74 — "To hold whole cycles, the firmware has to know how long a cycle is. Remember that when the
         meter starts measuring frequency."
-->

<!-- FILLED 2026-10-07: drafted from training-overview Day 2 Module 8, the AC metering doc §23 and standard practice; tutor to review.
     Was: GAP — no transcript yet. Needs (training-overview Day 2 Module 8): true RMS on-chip is accumulate squares, divide, root, *over a whole number of cycles*. Explain from the sandbox result why the window must contain whole cycles, and what that asks of the firmware when it does not know the frequency exactly (the capstone measures frequency, AC doc §23). -->

```flow
[[ask]] I compute the RMS of a clean sine over exactly one cycle, and then over one and a half. Will the
second answer be higher, lower, or the same?

[[pause]]

[[demo]] Run both windows in the sandbox.

[[reveal]] The same. On the Plot bench we can see why: the RMS a window reports, against the window's length
in cycles, with the true RMS dashed. A clean sine, no offset.

At one cycle and at one and a half, the curve touches the true value, and it touches it at
every half cycle. The square of a sine repeats every half cycle, so any whole number of half cycles averages it
exactly.

[[demo]] Now give the signal a small DC offset, 0.3 V.

Now one and a half cycles reads anywhere from about 11 % low to 10 % high, depending on where the window
starts. One cycle still reads true. An offset, or an even harmonic, repeats only once per cycle, so only whole
cycles average it fairly. Even the clean sine is off by up to about 6 % over one and a quarter cycles.

So the window is part of the measurement, not a detail of the code: whole cycles. And that asks something of
the firmware. To hold whole cycles, it has to know how long a cycle is. If the mains drifts from 50 Hz to
49.5 Hz, a fixed 20 ms window no longer holds one. Remember that when the capstone meter starts measuring
frequency.
```

***

## The integrated average

The integrated average is the area under the curve divided by the interval it is taken over. An RC
low-pass filter with an RC product much greater than the period of the input gives an output
proportional to the time average of the input.

<!-- PLAN
SHOW     Draw — the existing half-wave-mean drawing: half a sine, the area under it, and that area as a rectangle of
         the same width whose height, 2/π of the peak (0.637), is the integrated average. Drive: step it as drawn;
         pause on the rectangle.
         Look for: an average that is an area divided by a time — what an RC filter with RC much longer than the
         period settles to.
         Status: ready (existing drawing half-wave-mean). Optional Plot: a full-wave rectified sine through an RC
                 low-pass (RC ≫ T) settling to 0.637 of the peak.
HARVEST  S24 — "On Day 2 we asked which 'average' — mean, median, mode — and then called RMS another one. Here is
         one more: the area divided by the time. It is the average an RC filter computes, and it is the one inside
         the meter on the next card."
-->

```flow
Before we bring the bench meter into it, recall that "average" has more than one meaning, and that
there is one more we have not used yet.

The **integrated average** is the area under the curve of the function divided by the segment of the
range over which the average is taken.

The integrated average is often found in electronic circuits where either an RC low-pass filter, or an
RC operational-amplifier circuit called a Miller integrator, is used, and where the filter has an RC
product **much greater than the period** of the applied input waveform. The output of the circuit is
proportional to the time average of the input signal.
```

***

## An average-responding meter assumes a sine

An average-responding meter rectifies, averages, and scales by a constant that assumes a sine. On a
sine it reads correctly; the constant is the whole of its claim to RMS.

<!-- PLAN
SHOW     Equation — the meter's reading = 1.11 × rectified mean, beside the form factor FF = V_RMS / rectified mean,
         with `simulate` driving the input with a sine, then a square, then a triangle. Worked examples: sine,
         FF = π/(2√2) = 1.111, the meter is right; square, FF = 1.000, the meter reads 11 % high; triangle,
         FF = 2/√3 = 1.155, the meter reads about 4 % low. Assumption: "the input is a sine" — breaks when the
         waveform is anything else.
         Look for: 1.11 is the sine's form factor, built into the instrument.
         Status: ready
ASK      flash (after the statement) — "Quick recall from Day 2: for which waveform is 0.707 the right constant?"
         options: any periodic waveform | the sine only | sine and square | any symmetrical waveform
         answer: the sine only
         explain: 0.707 is 1/√2, the ratio of RMS to peak that the sine's shape produces, and the meter's 1.11 is
                  the same kind of constant: the sine's RMS over its rectified mean.
         depth: use    practice: constructing explanations
HARVEST  S25 — "0.707 belongs to the sine only — I flagged it hard on Day 2. This meter has its cousin, 1.11, built
         into its front end: it assumes every waveform you show it is a sine."
-->

<!-- FILLED 2026-10-07: drafted from training-overview Day 2 Modules 6 and 8 and standard practice; tutor to review.
     Was: GAP — no transcript yet. Needs (training-overview Day 2 Module 8): an average-responding meter rectifies, averages and scales by a constant that assumes a sine. Connect it back: the averaging is the integrated average of the previous card, and the constant is the sine-only relationship flagged hard on Day 2 (070) — "why 0.707 is a sine-only constant", because this module turns on that hinge. -->

```flow
Now the instrument on your bench. Many multimeters, especially cheaper ones, are **average-responding**. They
do not compute an RMS at all. They rectify the signal, take its integrated average, the one on the last card,
and multiply by a constant so that the display reads RMS.

Which constant? For a sine, the RMS is 0.707 of the peak and the rectified average is 0.637 of the peak. Their
ratio, 1.11, is the **form factor**. Multiply the rectified average by 1.11 and, for a sine, you get the RMS
exactly.

[[ask]] Quick recall from Day 2: for which waveform is 0.707 the right constant?

[[pause]]

[[reveal]] The sine only. And 1.11 is built from 0.707, so it belongs to the sine only too. I flagged it hard on
Day 2, and this is where it bites: the meter assumes every waveform you show it is a sine.

[[demo]] Equation — the meter's reading against the true RMS, driven with a sine, then a square, then a
triangle.

On a sine, right. On a square wave the form factor is 1.00, so the meter reads 11 % high. On a triangle it is
1.155, so the meter reads about 4 % low. The constant is the whole of its claim to RMS.
```

***

## On PWM, the meter is wrong by a predictable amount

On the PWM and switch-mode waveforms embedded work is full of, the average-responding meter is simply
wrong, and by a predictable amount, because its sine constant no longer applies.

<!-- PLAN
SHOW (centrepiece) Plot — a 0/V PWM wave (V = 1) in two views. Top: the waveform over two periods,
         V·step(D − mod(t, 1)), with the duty D as the slider. Bottom: against D (0 → 1), both readings of its AC
         part as an AC range takes it — the true RMS, V·√(D(1 − D)), and an average-responding meter's,
         1.11 × 2V·D(1 − D) — with the gap filled and markers at D = 0.5 and 0.1. Drive: D = 0.5 (the square wave),
         then drag D down to 0.1, then animate D across.
         Look for: the meter reads 11 % high at 50 %, agrees by coincidence near 28 % and 72 %, and reads 33 % low
         at D = 0.1. The error is not noise; it is a function of the shape alone.
         Status: ready. Ideal on-circuit version → needs Electronics: PWM/square source, DMM profiles for
                 average-responding and true-RMS AC ranges.
ASK      poe (before the statement) — "The same PWM waveform goes into our firmware's true RMS and into an
         average-responding meter. Which reads higher? And does the gap stay the same as I change the duty cycle?"
         options: the meter, by the same amount at every duty | the firmware, by the same amount at every duty |
                  it depends on the duty: the meter reads high near 50 % and low for narrow pulses | they agree —
                  both are RMS
         answer: it depends on the duty: the meter reads high near 50 % and low for narrow pulses
         reveal: drag D from 0.5 to 0.1 on the lower plot
         explain: the meter measures the rectified mean and multiplies by the sine's 1.11, but a narrow pulse has a
                  much larger RMS than mean, so the constant falls short, while near a square wave it overshoots.
         depth: understand    practice: analysing data
FAULT    an average-responding meter used as the reference on a PWM-driven load disagrees with correct firmware
         by −33 % to +11 % depending on duty; the diagnostic is to vary the duty and watch the disagreement move.
-->

<!-- FILLED 2026-10-07: drafted from training-overview Day 2 Module 8 (Demo #5) and standard practice; tutor to review.
     Was: GAP — no transcript yet. Needs (training-overview Day 2 Module 8): on the PWM and switch-mode waveforms embedded work is full of, the average-responding meter is simply wrong by a predictable amount. Reveal from the widget: name the direction and how it depends on the waveform's shape. -->

```flow
[[ask]] The same PWM waveform goes into our firmware's true RMS and into an average-responding meter.
Which reads higher? And does the gap stay the same as I change the duty cycle?

[[pause]]

[[demo]] Demo #5 — true RMS vs average-responding, shape and duty cycle as sliders.

On the Plot bench: a PWM wave on top, its duty cycle as the slider. Underneath, against duty cycle, two readings
of the same wave on an AC range: the true RMS, and what an average-responding meter shows. Start at 50 %: a
square wave.

[[reveal]] At 50 % the meter reads 11 % high: the square wave from the last card. Now drag the duty down. The
curves cross near 28 %, where the meter is right by coincidence. Keep going: at 10 % it reads a third low.

A narrow pulse has a large RMS for its average. Most of the time it sits at zero, then it is all the way up. The
meter sees only the average and multiplies by the sine's 1.11, so it falls short. Near a square wave, the same
constant overshoots.

So the meter is not noisy, and it is not broken. It is wrong by an amount set entirely by the shape of the
wave, and you can predict it. And that is the shape most embedded work produces: PWM, switch-mode supplies,
motor drives.
```

***

## Coupling and DC offset

A waveform can carry a DC component as well as an AC one. What a meter reports depends on whether its
input is AC-coupled, which removes that component from the reading.

<!-- PLAN
SHOW     Equation — V_RMS = √(V_DC² + V_AC,RMS²), with V_DC as the slider (0 → 1.65 V) and V_AC,RMS = 0.707 V;
         worked example V_DC = 1.65 V → 1.80 V. Then the Coding Bench true-rms program with its bias-removal line
         switched off, on the same buffer. Drive: the Equation at V_DC = 0, then 1.65 V; then the run.
         Look for: the reading more than doubles (1.80 V against 0.707 V) and is still a true RMS — of the wrong
         thing. An AC-coupled meter on the same pin reads 0.707 V; a DC-coupled "AC+DC" true-RMS range reads
         1.80 V (Demo #7).
         Status: ready (Equation); needs Coding Bench: true-rms (bias-removal switch). Demo #7 on a circuit → needs
                 Electronics: AC source on a DC bias, DMM with AC and DC coupling.
ASK      poe (after the statement) — "Our ADC signal sits on a 1.65 V bias. If the firmware squares the samples
         without removing that bias first, what happens to the RMS it reports?"
         options: nothing — a constant squares away | a little higher | far higher — more than double | lower
         answer: far higher — more than double
         reveal: the Equation at V_DC = 1.65 V, then the Coding Bench run without bias removal
         explain: a DC part adds its square to the mean of the squares, so 1.65 V of bias under 0.707 V of AC gives
                  √(1.65² + 0.707²) ≈ 1.80 V.
         depth: understand    practice: computational thinking
HARVEST  S72 — "This morning we added 1.65 V to get the sine into the ADC, and I said somebody would have to take
         it out. This is that somebody — and this is the number when nobody does."
-->

<!-- FILLED 2026-10-07: drafted from the Demo #7 brief (coupling & DC offset), training-overview Purpose and standard practice; tutor to review.
     Was: GAP — no transcript yet. Needs (Demo #7 Coupling & DC offset; training-overview "Purpose", which names coupling among the ways meters lie): what AC coupling removes from a reading, and what that does when the waveform carries a DC component. Tie it to our own signal: it rides on the bias we added this morning. -->

```flow
A waveform can carry a DC part as well as an AC part. Many meters' AC ranges are **AC-coupled**: a capacitor
in the input blocks the DC, and only the AC part is measured. Others offer a DC-coupled "AC+DC" range that
includes it. The same signal gives two different readings, and each is honest about what it measures.

Our own signal has a DC part. We put it there this morning: 1.65 V of bias.

[[ask]] Our ADC signal sits on a 1.65 V bias. If the firmware squares the samples without removing that
bias first, what happens to the RMS it reports?

[[pause]]

[[demo]] Demo #7.

On the Equation bench: the RMS of a signal with a DC part: the square root of the DC squared plus the AC RMS
squared. AC part 0.707 V. Slide the DC from zero to 1.65 V.

[[reveal]] It more than doubles: about 1.80 V instead of 0.707 V. A DC part adds its square to the mean of the
squares. The firmware is still computing a true RMS, of the wrong thing.

[[demo]] Coding Bench — the true-RMS routine with the bias removal switched off. Same buffer, same 1.80 V.

This morning I said somebody would have to take the 1.65 V out again. This is that somebody. Subtract the bias
first, or better, subtract the mean of the window so that a drifting bias goes too, and only then square.
```

***

## Your firmware can be more accurate than your multimeter

Your firmware can be more accurate than your multimeter, and now you can prove which one to trust.

<!-- PLAN
SHOW     Figure — two handheld meters' front panels, one marked TRUE RMS and one not; then the AC specification of
         the true-RMS one, its crest-factor limit and bandwidth spotlighted. Drive: tour — the TRUE RMS mark, the
         crest-factor line, the bandwidth line.
         Look for: even a true-RMS meter states the waveforms it is honest about; knowing those limits is what makes
         it a reference instead of an argument.
         Status: needs asset: two meter front-panel photos and a true-RMS meter's AC specification (PDF page)
ASK      checkpoint (after the statement) — "Your MCU and your meter disagree on a PWM-driven load. In two
         sentences: which do you trust, and why?"
         items: the meter's type (average-responding or true RMS) and its coupling | its expected error at this
                duty | the firmware's conditions — whole cycles, bias removed, a sample rate above the waveform's
                significant harmonics
         depth: understand    practice: arguing from evidence
-->

<!-- FILLED 2026-10-07: drafted from training-overview Day 2 Module 8 and Purpose; tutor to review.
     Was: GAP — no transcript yet. Needs (training-overview Day 2 Module 8 and "Purpose"): close the meter thread that has run since Day 1 — when the MCU and the multimeter disagree, often the meter is the one that is wrong, and knowing *how* meters lie (input impedance, burden voltage, average-responding RMS, coupling, bandwidth) is what lets you use one as a trustworthy reference instead of an argument. Your firmware can be more accurate than your multimeter, and now you can prove which to trust. -->

```flow
Since Day 1 a second thread has run alongside the path: when your MCU and your multimeter disagree, which
one is wrong? Often it is the meter. We have now met most of the ways a meter misleads. Its input impedance
loads the circuit. Its burden voltage disturbs it. An average-responding meter assumes a sine. Its coupling
decides whether DC counts, and its bandwidth decides which harmonics count.

[[demo]] Figure — two meters' front panels, one marked TRUE RMS; then the AC specification of the true-RMS one.

Even the true-RMS meter states its limits: the crest factor it can handle, and its bandwidth. Knowing those
limits is what turns a meter from an argument into a reference.

Your firmware can be more accurate than your multimeter, if it samples fast enough for the harmonics, over
whole cycles, with the bias removed. And now you can prove which one to trust.

[[ask]] Your MCU and your meter disagree on a PWM-driven load. In two sentences: which do you trust, and
why?

[[transition]] One channel, one number we can defend. But a meter that only knows voltage cannot tell
you what the load is doing with it. For that we need a second channel, current, sampled alongside the
first, and the moment there are two channels, *when* each one is sampled comes back to bite us.
```
