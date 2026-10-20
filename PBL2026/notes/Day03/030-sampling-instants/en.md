---
targetMinutes: 30
motivates: The samples are converted correctly and the maths is right, yet the RMS still wanders — because the samples were not taken when the code assumes they were.
objectives:
  - Explain why a sample interval that varies with the rest of the loop produces error that looks like noise but does not average away.
  - Choose hardware-paced conversion over loop-paced sampling, and say why.
concepts: [sampling-jitter]
---

# Sampling instants: timing and jitter

<!-- PATH: … → CONDITIONING → ADC INPUT →[ CONVERSION: when ]→ REFERENCE → … → NUMBER
     AC pass: not how often the converter looks, but exactly when each look happens.
     TOOL: Plot (centrepiece: a sine sampled at jittered instants, and the error it makes) · Draw (loop-paced against
           timer-paced timeline) · Equation (error ≈ 2πf·A·Δt) · Coding Bench (jitter-rms: RMS error against jitter,
           averaging on and off).
     SOURCES: training-overview.md Day 2 Module 5 and "Everything here is simulated" (DMA/interrupts/registers);
              AC_Metering_System_Simulation_Project.md §11 Sampling, §26 timing errors. -->

## When you sample matters as much as what you sample

The ADC does not observe every instant; it takes samples at discrete time intervals. The firmware
assumes those intervals are equal. When you sample matters as much as what you sample.

<!-- PLAN
SHOW     Draw — a timeline of the loop: "read ADC", "print", "check button" as blocks of different widths (the
         print's width changes with the string; the button branch runs only sometimes), with a tick at each ADC
         read; above it, the evenly spaced ticks the firmware assumes. Drive: the assumed ticks first, then the
         loop's blocks one at a time, then its actual ticks, drifting against the assumed row.
         Look for: the interval between reads is the sum of everything else the loop did.
         Status: needs Draw: loop-paced sampling timeline (its timer-paced row is added in the last card)
ASK      poe (after the statement) — "Your loop reads the ADC, prints a value, checks a button, then reads the ADC
         again. Is the time between two samples constant?"
         options: yes — the code is the same every pass | no — it varies with what the print and the button check
                  take | yes, but longer than intended      answer: no — it varies with what the print and the
                  button check take
         reveal: the Draw timeline; the actual ticks drift against the assumed ones
         explain: in a loop the time from one read to the next is however long the rest of the pass took, and that
                  depends on the string printed and on which branches ran.
         depth: understand    practice: asking questions
HARVEST  S17 — "On Day 1: one capacitor, many inputs, converted at different times — and I said 'when' would
         matter today. It starts here with a single input: even one channel is converted when the loop gets round
         to it."
-->

<!-- FILLED 2026-10-07: drafted from training-overview Day 2 Module 5 and the AC metering doc §26; tutor to review.
     Was: GAP — no transcript yet. Needs (training-overview Day 2 Module 5): when you sample matters as much as what you sample. The capstone project lists the timing errors we will meet (AC doc §26): sampling-rate variation, channel skew and sampling jitter. This module is the first and the last of those; channel skew comes back after lunch as the power module's phase trap. -->

```flow
The voltage and current waveforms are continuous in time. The ADC does not observe every instant.
Instead, it takes samples at discrete time intervals: v₁, v₂, v₃, v₄ and so on, and the same for current.

Before the break we chose how many of those samples we need per second. But every calculation the
firmware will do on them, the RMS and the power, assumes something we have not checked yet: that the
samples are evenly spaced.

[[ask]] Your loop reads the ADC, prints a value, checks a button, then reads the ADC again. Is the time
between two samples constant?

[[pause]]
[[demo]] The loop as a timeline: read, print, check the button, read again.

[[reveal]] The time from one read to the next is however long everything else in the pass took. The print
takes longer for a longer number. The button branch only runs sometimes. So the interval moves, and nothing in
the code records by how much.

The capstone project lists three timing errors: sampling-rate variation, channel skew and sampling jitter.
This module is about the first and the last. Channel skew we keep for the power module.

On Day 1 I said: one capacitor, many inputs, converted at different times, and that "when" would matter today.
It starts here, with a single input. Even one channel is converted when the loop gets round to it.
```

***

## Uneven spacing looks like noise

A sample interval that varies with whatever else the loop is doing produces an error that is
indistinguishable from noise.

<!-- PLAN
SHOW (centrepiece) Plot — a 50 Hz, 1 V sine sampled at fs = 2 kHz, two staircases: at the intended instants,
         sin(2π·50·n/fs), and at the actual ones, sin(2π·50·(n/fs + J·u(n))), with n = floor(t·fs) and
         u(n) = mod(43758.5453·sin(12.9898·n), 1) − 0.5, a fixed pseudo-random offset for each sample; below,
         their difference with fill. Slider: J, the spread of the timing error (0 → 200 µs). Drive: J = 0 (the
         staircases coincide), then 50, 100 and 200 µs.
         Look for: the error looks like noise, but it is largest where the sine is steepest (the zero crossings)
         and almost nothing at the peaks — its size follows the slope of the signal.
         Status: ready (deterministic pseudo-random u(n); the Plot bench has no random source)
ASK      poll (after the statement) — "If you only had the numbers, and not this picture, what would you have
         called that?"
         options: noise | a real change in the signal | quantization | a firmware bug
         depth: understand    practice: analysing data
-->

<!-- FILLED 2026-10-07: drafted from training-overview Day 2 Module 5 and standard practice; tutor to review.
     Was: GAP — no transcript yet. Needs (training-overview Day 2 Module 5): a sample interval that varies with whatever else the loop is doing produces error indistinguishable from noise. Show a clean sine sampled evenly, then with the interval varying, and let the room watch the RMS reading wander although nothing about the signal has changed. -->

```flow
Let us see what uneven spacing does to the numbers.

[[demo]] Sampling-jitter widget — even spacing, then loop-paced spacing.

Here it is on the Plot bench: a 50 Hz sine sampled 2,000 times a second. One staircase uses the instants the firmware
assumes; the other, the instants the samples were really taken. Underneath, the difference. With no timing
spread, the two coincide.

Now let the timing wander: 50 µs, then 100, then 200.

[[ask]] If you only had the numbers, and not this picture, what would you have called that?

[[pause]]

Most of us would call it noise. It flickers, it has no obvious pattern, and the signal underneath has not
changed at all.

But look where it is largest: at the zero crossings, where the sine is steepest. At the peaks, where the sine
is nearly flat, a late sample is still almost right. The error is the slope of the signal times how late the
sample was, so its size is set by the signal itself. That is what makes it different from the noise of Day 2.
```

***

## Jitter error and averaging

Jitter error is signal-dependent, so it does not average away the way independent noise does. The
widget sweeps jitter magnitude against RMS error.

<!-- PLAN
SHOW     Coding Bench — a sampling loop on a simulated 50 Hz, 1 V sine at a nominal 200 µs interval, computing RMS
         over 500 samples per window and printing its error against 0.7071 V. Two timing modes: (1) random jitter
         independent of the signal (σ = 50 µs); (2) loop-paced, where the loop does 100 µs of extra work whenever
         |v| > 0.7 (a branch that logs high readings). Averaging over 1, 16 or 256 windows. Drive: mode 1 at 1, 16,
         256; then mode 2 at the same three.
         Look for: mode 1 scatters by about ±0.5 % and its average closes in on the true value; mode 2 reads about
         6.6 % low at every averaging count — the timing depends on the signal, so every reading is wrong the same
         way.
         Status: needs Coding Bench: jitter-rms (two timing modes, averaging count, error printout)
ASK      poe (before the statement) — "On Day 2 averaging beat noise down. So average many readings: does the
         jitter error go away?"
         options: yes, all of it | the scatter shrinks, but part of the error stays | no, none of it
         answer: the scatter shrinks, but part of the error stays
         reveal: the two runs at 1, 16 and 256 windows
         explain: averaging removes what is independent from one reading to the next; when the sampling instants
                  depend on the signal itself, the samples crowd into the same parts of every cycle, and that bias
                  survives any amount of averaging.
         depth: understand    practice: arguing from evidence
-->

<!-- FILLED 2026-10-07: drafted from training-overview Day 2 Module 5 and standard practice; tutor to review.
     Was: GAP — no transcript yet. Needs (training-overview Day 2 Module 5): worse than looking like noise, jitter error is signal-dependent, so it does not average away. The widget sweeps jitter magnitude against RMS error; run the sweep with averaging off and on. -->

```flow
On Day 2 averaging was our friend: with enough noise present, more samples bought us resolution and a
steadier number.

[[ask]] So average many readings. Does the jitter error go away? Commit before I run it.

[[pause]]

[[demo]] Sweep jitter magnitude against RMS error.

On the Coding Bench: a loop sampling a 50 Hz, 1 V sine every 200 µs, computing the RMS over 500 samples
and printing its error. First, random jitter that has nothing to do with the signal. Average one window, then
16, then 256.

The single readings scatter by about half a percent. Averaging pulls them together, and the average closes in
on the true value. That part behaves like noise.

Now the loop the way people really write it: whenever the reading is above 0.7 V, it does an extra
100 µs of work. Say it logs the high value. Same averaging: 1, 16, 256.

[[reveal]] Name what the averaging did, and did not, remove.

About 6.6 % low, every time, however many readings we average.

Here the timing depends on the signal. The loop runs slower while the signal is high, so fewer samples land
near the peaks, in every single window. Every reading is wrong in the same direction, and averaging keeps what
all the readings share. That is the sense in which jitter error does not average away: the part that depends on
the signal stays.
```

***

## Hardware-paced conversion is the fix

Let the hardware, not the loop, pace each conversion, so the interval no longer depends on whatever
else the code is doing. Its register-level setup is named, not simulated: there would be nothing to see.

<!-- PLAN
SHOW     Equation — error ≈ 2πf·A·Δt, the worst-case error of a sample taken Δt late, at the zero crossing;
         graphed against f (0 → 1 kHz) with Δt as the slider; worked examples at A = 1 V, f = 50 Hz: Δt = 100 µs
         (a loop) → 31.4 mV, about 39 LSB at 12 bits on 3.3 V; Δt = 50 ns (a timer-triggered conversion) →
         15.7 µV, about 0.02 LSB. Then the Draw timeline from the first card gains its timer-paced row: evenly
         spaced ticks, the loop's blocks now free to take whatever time they like.
         Look for: the error grows with both f and Δt; hardware pacing does not make the loop faster, it takes the
         loop out of the timing.
         Status: ready (Equation); needs Draw: loop-paced timeline, timer-paced row
ASK      checkpoint (after the statement) — "Think of a project you have built that samples from a loop. What
         decides when its samples are taken — and what could pace them instead?"
         items: what paces it now | how much the interval could vary | which hardware could pace it (a timer
                trigger, DMA) | what the error would become, from 2πf·A·Δt
         depth: create    practice: designing solutions
SEED     plants S73 — "An error in when becomes an error in what: the slope of the signal times how late you were.
         Hold on to that product — in the power module it comes back as an angle."
-->

<!-- FILLED 2026-10-07: drafted from training-overview Day 2 Module 5 and standard practice; tutor to review.
     Was: GAP — no transcript yet. Needs (training-overview Day 2 Module 5): hardware-paced conversion is presented as the fix; its register-level setup is named but not simulated, because there would be nothing to see. -->

```flow
The fix is to stop the loop deciding when samples are taken. Let the hardware do it: a timer triggers
each conversion, and DMA moves each result into memory without the CPU. The interval no longer depends on
whatever else the code is doing. The loop can print and check buttons as slowly as it likes; it reads a buffer
that is already filled.

[[demo]] Equation — the error of one sample taken Δt late: about 2πf × A × Δt.

At 50 Hz and 1 V, a sample 100 µs late can be off by 31 mV, about 39 LSB on a 12-bit, 3.3 V converter. A
timer-triggered conversion might wander by tens of nanoseconds; at 50 ns that is about 16 µV, a fiftieth of an
LSB. And notice the f: the same Δt costs twenty times more at 1 kHz than at 50 Hz.

[[demo]] The timeline again, with a second row: the timer's ticks, evenly spaced, while the loop's blocks above
take whatever time they like.

Say this plainly to the room: DMA setup, interrupt priorities and register configuration are firmware
plumbing, and there is nothing in them to show. What we can show is the consequence, uneven sample
spacing and the error it produces, and that is what the widget did.

[[ask]] Think of a project you have built that samples from a loop. What decides when its samples are
taken? And what could pace them instead?

[[pause]]

An error in *when* becomes an error in *what*: the slope of the signal times how late you were. Hold on to that
product. In the power module it comes back as an angle.

[[transition]] So now the samples are evenly spaced, the converter is looking at the right rate and at
the right instants, and a stream of honest numbers is arriving in firmware. The next stage of the path
is what the firmware does with them, and the first thing we want from an AC signal is its true RMS.
```
