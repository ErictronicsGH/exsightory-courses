---
targetMinutes: 45
motivates: The divider is correct, the reference is correct, and the ADC still reads low — and reads lower still when you make it faster.
objectives:
  - Model an ADC input as a switch with on-resistance charging a sampling capacitor in a finite acquisition window.
  - Compute the maximum source impedance a given acquisition time permits.
  - Choose between a longer acquisition time and an op-amp buffer to fix a source that cannot settle.
concepts: [sample-and-hold]
---

# The ADC input: sample-and-hold and acquisition time

<!-- PATH: quantity → sensor → loading → conditioning → [ ADC INPUT ] → conversion → firmware → number
     TOOL: Plot (centrepiece — Demo #2, promoted: the sampling capacitor charging inside the acquisition
           window, with an error-in-LSB zoom; R_s, C_s and window sliders) · Equation (settling time
           solved for the largest source impedance, and for the window) · Draw (the S/H inside the pin
           with its timing; one multiplexer, one capacitor) · Electronics (ideal: the on-circuit S/H —
           needs a switch, a clock, a transient solve and an ADC-input block).
     SOURCES: transcripts/Chapter 07 - Analog to digital converters.md (opening; ATmega328P
              sample-and-hold; Multiplexed inputs); Chapter 15 - measurement_errors.md (Dynamic errors);
              training-overview.md Day 1 Module 4.
     The most important MCU-specific module in the course. Mostly GAP. -->

## The ADC input is a switch and a capacitor

To convert a voltage, the ADC first holds it still. A switch connects a small sampling capacitor to
the input, then opens, and the conversion works on the voltage the capacitor kept.

<!-- PLAN
ASK      poe (before the statement) — "To your divider, what does an MCU's ADC input look like?"
         options: nothing — it draws no current | a large resistor, like a meter | a small capacitor,
                  connected for a moment and then let go | a current source
         answer: a small capacitor, connected for a moment and then let go
         reveal: the Draw sequence below.
         explain: The converter holds its sample on a capacitor of a few picofarads, connected through a switch
                  for a short window, and the source has to charge it every time.
         depth: understand    practice: developing models
SHOW     Draw — inside the pin: pad → multiplexer switch → R_on (1 kΩ) → C_s (10 pF) → comparator; under it the
         timing strip: switch closed (acquire), open (hold and convert), closed again.
         Drive: one step per element, then the timing strip.
         Status: needs Draw: the S/H-inside-the-pin drawing with its timing.
-->

<!-- FILLED 2026-10-07: drafted from training-overview Day 1 Module 4 and standard SAR-ADC input practice; tutor to review -->

```flow
Before the signal reaches the ADC, one of the things we have to make sure of through signal conditioning
is that the ADC does not significantly disturb the signal we are trying to measure. That is loading,
and we met it in 040 with a voltmeter. The ADC's input is where it matters most — because it is not a
steady resistance at all.

The ATmega328P's ADC, like most MCU converters, includes a **sample-and-hold** circuit, so that the
input voltage is held still while the conversion takes place.

[[ask]] So, to your divider, what does that input look like? Nothing at all? A big resistor, like a
meter? Or something else?

[[pause]]

[[demo]] Let me draw what is inside the pin. First the pad. Then a switch: the multiplexer and the sample
switch, with a real on-resistance, typically somewhere around a kilohm. Then a small capacitor to ground,
the sampling capacitor: typically a few picofarads, and we will use 10 pF. Behind it, the comparator that
does the conversion.

[[reveal]] To your divider, the ADC input is a small capacitor, connected for a moment and then let go.

Now the timing strip underneath. The switch closes: this is the **acquisition** window, when the
capacitor charges towards the input. The switch opens: the capacitor **holds** that voltage while the
converter works on it. Then the switch closes again for the next sample.

So the source is not feeding a steady resistance. Every sample, it has to fill a capacitor, through the
switch and through its own output impedance.
```

***

## The capacitor has to charge in time

The switch closes for a fixed acquisition window. The sampling capacitor charges through the
switch's resistance and the source's own impedance, and it may not get there.

<!-- PLAN
SHOW (centrepiece) Plot — Demo #2, the switched-capacitor sampler, as two linked plots. (a) v_C(t) =
         V·(1 − e^(−min(t, t_acq)/τ)) with τ = (R_s + R_on)·C_s and V = 1.65 V, held flat once the window
         closes; (b) the zoom: the shortfall in LSB, 2048·e^(−min(t, t_acq)/τ), on 0 to 20 LSB with a ½-LSB
         line. Sliders: R_s (0 to 100 kΩ), C_s (2 to 20 pF, 10 pF), t_acq (0.1 to 5 µs, 1 µs); R_on = 1 kΩ.
         The capacitor starts at 0 V (the previous channel was at ground).
         Drive, in order: R_s = 1 kΩ (settles long before the window closes) → 10 kΩ (just inside ½ LSB,
         0.23 LSB short) → 50 kΩ (freezes about 290 LSB short); then hand the same plot to the next cards:
         the window down (Faster makes it worse), then up (Fix one).
         Look for: on (a) the 50 kΩ curve looks almost there; on (b) it is nearly 300 codes short.
         Status: ready (Plot: exp, min) · the ideal on-circuit demo needs Electronics: analog switch with
                 R_on, a clock/pulse source for the window, a capacitor transient solve with a scope trace,
                 and an ADC-input block with a code readout.
ANALOGY  Filling a bucket through a hose while a door closes on a timer: the hose's bore is the resistance,
         the bucket the capacitance, the timer the window. It breaks usefully: a real bucket fills at a
         steady rate, but this one fills ever more slowly as it nears the brim, so "nearly full" can still be
         hundreds of codes short.
FAULT    Converted back-to-back on one channel, the capacitor starts from the last sample and the error
         nearly vanishes; enable a second channel and it returns. "It changed when I added a sensor."
-->

<!-- FILLED 2026-10-07: drafted from training-overview Day 1 Module 4 and standard SAR-ADC input practice; tutor to review -->

```flow
This is a **dynamic error**: an error that arises because something changes during the measurement.
Dynamic errors include the inertia of a mechanical meter's pointer trying to follow a fast-changing
quantity, and many limitations in electronic instruments — wherever a frequency, phase or slew-rate
limit is present. Here, the thing changing is the capacitor's own voltage, and it is still changing
when the converter stops looking.

[[demo]] Plot Bench: the switched-capacitor model, with the capacitor's voltage plotted against the
acquisition window.

Here is that capacitor on the Plot Bench. The top plot is its voltage during one sample, charging
towards 1.65 V from 0 V, because the previous channel was at ground. The window is 1 µs. When it closes
the curve goes flat, and that flat value is what the converter gets.

The capacitor charges through the switch's 1 kΩ plus the source's own impedance. Their sum times the
capacitance is the **time constant**, τ. After one τ the capacitor has covered 63 % of the way; after
two, 86 %; after five, 99.3 %. Each τ removes the same fraction of what is left, so it never quite
arrives.

How close is close enough? Half an LSB. At 12 bits that is one part in 8,192 of full scale. The error
left after a time t is e to the minus t over τ, and setting that to 1/8192 gives t = ln 8192 × τ, about
9 τ. In general, settling to half an LSB takes (N + 1) × ln 2 time constants.

[[demo]] Start with a 1 kΩ source. τ is 2 kΩ times 10 pF: 20 ns. The window holds fifty time constants,
and the curve is flat long before it closes.

Now 10 kΩ. τ is 110 ns, and the window holds about nine of them. Look at the bottom plot, the shortfall
in codes: it finishes just under half an LSB. Only just.

Now 50 kΩ. On the top plot the curve still looks nearly there. On the bottom plot it froze nearly 300
codes short.
```

***

## A source that cannot settle reads low

If the capacitor has not reached the input voltage when the switch opens, the ADC converts what it
has. Nothing reports an error: the code is simply too small.

<!-- PLAN
ASK      poe (at the Flow's [[ask]]; a circuit + predict once the ADC block exists) — "The same divider ratio on
         3.3 V, built once with 1 kΩ resistors and once with 100 kΩ. Do the two ADC codes agree?"
         options: yes, both 2048 — same ratio, same voltage | close, within a code or two | no — the 100 k
                  one reads lower | no — the 100 k one reads higher
         answer: no — the 100 k one reads lower
         reveal: the centrepiece Plot at R_s = 0.5 kΩ, then 50 kΩ (each divider's output impedance), window
                 1 µs: codes 2048 and about 1760.
         explain: The ratio and the open-circuit voltage are the same, but the 100 k divider has a 50 kΩ output
                  impedance, so τ is 510 ns; the window closes after under two time constants, with the
                  capacitor about 14 % short.
         depth: understand    practice: arguing from evidence
SHOW     Plot — the centrepiece, at the two divider impedances.
         Status: ready · needs Electronics: ADC-input block (two dividers on two channels, codes side by
                 side).
HARVEST  S31 — "That's our 2047 from the start of the day: a 100 k divider, and a capacitor that ran out of
         time."
HARVEST  S32 — "And the 270 k divider the meter called fine in 040? Here is the ADC disagreeing: about a
         quarter low."
FAULT    A divider "upgraded" to higher values to save battery: the lab's source-impedance fault.
-->

<!-- FILLED 2026-10-07: drafted from training-overview Day 1 Module 4 and standard SAR-ADC input practice; tutor to review -->

```flow
[[ask]] The same divider ratio, built once with 1 kΩ resistors and once with 100 kΩ. Do the two ADC codes
agree?

[[pause]]

[[demo]] The same Plot. A divider of two equal resistors on 3.3 V gives 1.65 V either way. What the
capacitor sees is the divider's output impedance: two 1 kΩ resistors in parallel is 500 Ω; two 100 kΩ
is 50 kΩ. I set the source to each in turn.

[[reveal]] With 500 Ω, τ is 15 ns, and the code is 2048. With 50 kΩ, τ is 510 ns. The window closes
after under two time constants with the capacitor about 14 % short, and the code is about 1760.

Same ratio. The same voltage on a meter. Nearly 300 codes apart. And nothing reports an error. The
converter did its job perfectly: it converted what the capacitor held.

That is our 2047 from the start of the day: a 100 k divider, and a capacitor that ran out of time. And
the 270 k divider the meter called fine? Here it reads about a quarter low.

One more thing makes this hard to find. Convert the same channel again and again, and the capacitor
starts each sample from the last one, so the error nearly disappears. Add a second channel, and it comes
back.
```

***

## Faster makes it worse

Speeding up the ADC shortens the acquisition window. The capacitor has even less time, so the
reading falls further.

<!-- PLAN
ASK      poe (at the Flow's [[ask]]) — "You raise the sample rate. Does the reading go up, go down, or stay the
         same?"
         options: up | down | stays the same
         answer: down
         reveal: the centrepiece Plot at R_s = 10 kΩ, t_acq 1 µs → 0.5 µs: the zoom goes from 0.2 to about
                 22 LSB short.
         explain: A faster rate is bought with a shorter window; the source and the capacitor did not change,
                  so the capacitor gets 4.5 time constants instead of 9.
         depth: understand    practice: analysing data
SHOW     Plot — the centrepiece, window slider only.
         Status: ready.
FAULT    "It was fine until we raised the logging rate": the readings drop when the sample rate goes up.
-->

<!-- FILLED 2026-10-07: drafted from training-overview Day 1 Module 4 and standard SAR-ADC input practice; tutor to review -->

```flow
[[ask]] You raise the sample rate. Does the reading go up, go down, or stay the same?

[[pause]]

[[demo]] Back to the 10 kΩ source, which only just settled in 1 µs. To sample faster, the converter
spends less time on each sample, and the window is where that time comes from. I halve it to 0.5 µs.

[[reveal]] The reading goes down. The capacitor now gets four and a half time constants instead of nine,
and the bottom plot shows it stopping about 22 codes short, where before it was well under one.

Nothing about the source or the capacitor changed, only the time you gave it. That is how a measurement
that was fine can quietly go wrong the day someone speeds up the ADC to log faster.
```

***

## One capacitor, many inputs

A multi-channel ADC is usually one conversion system with a multiplexer in front of it, connected to
each input in turn. Every channel has to charge the same capacitor.

<!-- PLAN
SHOW     Draw — four sensors → analog MUX → one S/H → one converter; the switch arm stepping from input to
         input, with a timeline beneath: CH1 at t₁, CH2 at t₂, CH3 at t₃, CH4 at t₄; the capacitor carrying
         each channel's charge into the next.
         Drive: step the arm through the four inputs.
         Look for: one capacitor, four different moments.
         Status: needs Draw: the multiplexer-and-timeline drawing.
SEED     plants S17 — "One capacitor, many inputs, converted at different times. That will matter a great deal
         on Day 3, when we sample voltage and current together."
FAULT    Crosstalk: a high-impedance channel read straight after a full-scale one reads high, because the
         capacitor arrives carrying the previous channel's charge.
-->

```flow
Many ADCs have more than one analog input but do not contain a separate ADC for every input. Instead,
they use an **analog multiplexer**, usually called a **MUX** — an electronically controlled selector
that chooses which input is connected to the conversion circuitry at a particular moment.

Imagine four sensors feeding one multiplexer and one ADC. The ADC can select Sensor 1 and convert it,
then select Sensor 2 and convert that, and so on.

So it is more accurate to think of a four-channel multiplexed ADC as **one conversion system that can be
connected to four different inputs at different times**, rather than four ADCs converting four signals
at once.

Every one of those inputs has to charge the same sampling capacitor in its own acquisition window. That
the conversions happen at *different times* will matter a great deal on Day 3, when we sample voltage
and current together.
```

***

## The maximum source impedance

Given the sampling capacitance, the switch resistance, the acquisition time and the accuracy you
want, you can compute the largest source impedance that still settles.

<!-- PLAN
ASK      numeric (at the Flow's [[ask]]) — "12 bits, C_s = 10 pF, R_on = 1 kΩ, a 1 µs window, settling to
         ½ LSB after a full-scale step. What is the largest source impedance?"
         answer: 10.1 kΩ ± 0.3 kΩ
         reveal: the Equation below, solved for R_s.
         explain: ½ LSB of 12 bits is one part in 8,192, which takes ln 8192 ≈ 9.0 time constants; 1 µs ÷ 9.0 ÷
                  10 pF is 11.1 kΩ in total, less the switch's 1 kΩ.
         depth: use    practice: computational thinking
SHOW     Equation — t_acq = (R_s + R_on)·C_s·ln(2^(N+1)), solved for R_s and graphed against t_acq; worked
         examples for N = 10 (12.1 kΩ), 12 (10.1 kΩ) and 16 (7.5 kΩ) at 1 µs.
         Look for: more bits want a smaller source, and a longer window allows a larger one.
         Status: ready.
HARVEST  S35 — "Our thermistor divider from 040: five kilohms. Inside ten. It settles."
-->

<!-- FILLED 2026-10-07: drafted from training-overview Day 1 Module 4 and standard SAR-ADC input practice; tutor to review -->

```flow
[[ask]] For a 12-bit ADC with this acquisition window, what is the largest source impedance that still
settles in time?

[[pause]]

[[reveal]] Let's work it on the Equation Bench. The window has to hold enough time constants to settle to
half an LSB:

t_acq = (R_s + R_on) × C_s × ln(2^(N+1))

For 12 bits, ln(2^13) = ln 8192, about 9.0. Solve for the total resistance: 1 µs divided by 9.0, divided
by 10 pF, is about 11.1 kΩ. Take away the switch's own 1 kΩ, and the source can be at most about
10.1 kΩ, with our example values.

That ten kilohms is no coincidence. Several MCU datasheets recommend a source impedance of about 10 kΩ or
less for exactly this reason, and some give a formula or a table against the sample time. Look for it in
yours.

Slide N. At 10 bits the limit rises to about 12.1 kΩ; at 16 bits it falls to about 7.5 kΩ. More bits ask
for a smaller source, and a longer window allows a larger one.

And our thermistor divider from the impedance module: 5 kΩ. Inside ten. It settles.
```

***

## Fix one: a longer acquisition time

If the MCU lets you configure the sampling time, give the capacitor longer to charge. You pay for
it in conversion rate.

<!-- PLAN
ASK      numeric (before the reveal) — "The 100 k / 100 k divider, a 50 kΩ source. How long must the window be
         to settle to ½ LSB at 12 bits?"
         answer: 4.6 µs ± 0.1 µs
         reveal: the Equation solved for t_acq; then the centrepiece Plot with the window dragged to 4.6 µs,
                 the zoom crossing the ½-LSB line.
         explain: 51 kΩ × 10 pF is 510 ns per time constant, and nine of them is 4.6 µs; with 1 µs of
                  conversion that caps the rate near 180 kS/s instead of 500 kS/s.
         depth: use    practice: computational thinking
SHOW     Equation and Plot — as above.
         Status: ready. Point the room at their own MCU's lever: a sample-time field in clock cycles on many
                 parts; on the ATmega328P, only the ADC clock prescaler.
-->

<!-- FILLED 2026-10-07: drafted from training-overview Day 1 Module 4 and standard SAR-ADC input practice; tutor to review -->

```flow
The first fix is to give the capacitor more time. Many MCUs let you set the sample time, usually as a
number of ADC clock cycles. On parts without that setting, such as the ATmega328P, a slower ADC clock is
the lever.

[[ask]] Take the 100 k divider again: a 50 kΩ source. How long must the window be to settle to half an
LSB at 12 bits?

[[pause]]

[[reveal]] The total resistance is 51 kΩ, and 51 kΩ times 10 pF is 510 ns per time constant. Nine of
them is about 4.6 µs.

[[demo]] On the Plot, I drag the window out to 4.6 µs. The bottom curve crosses the half-LSB line just as
the window closes.

The cost is speed. If the conversion itself takes 1 µs, a 1 µs window allowed 500,000 samples a second.
A 4.6 µs window allows about 180,000. For a still quantity that is usually a bargain. But if the sample
time is shared, every channel on the multiplexer pays it.
```

***

## Fix two: a buffer

An op-amp buffer gives the sampling capacitor a low-impedance source, whatever is behind it. It is
the buffer from 040, doing exactly the job it was introduced for.

<!-- PLAN
SHOW     Electronics (ideal) — the 100 k / 100 k divider → op-amp follower → ADC-input block at the full rate
         (1 µs window); then the centrepiece Plot with R_s set to the buffer's output (about 100 Ω).
         Drive: code without the buffer (≈1760); insert the follower; code with it (2048).
         Look for: the code back at 2048 at full speed, and the divider's current undisturbed.
         Status: Plot ready · needs Electronics: op-amp (follower) + ADC-input block; replaces the Demo #2
                 widget beat.
ASK      multi-select (after the reveal) — "A 100 k / 100 k divider must be read at 200 kS/s, with 1 µs of
         conversion. Which of these work?"
         options: lengthen the acquisition window | put an op-amp follower between divider and pin | rebuild
                  the divider with 1 kΩ resistors | slow the ADC clock
         answer: the follower; the 1 kΩ divider
         explain: 200 kS/s leaves 4 µs of window and the 50 kΩ source needs 4.6 µs, so a longer window or a
                  slower clock misses the rate; a follower or a low-impedance divider (at 1.65 mA standing
                  current) gets the capacitor's time constant down to nanoseconds.
         depth: create    practice: designing solutions
HARVEST  S13 — "The buffer from 040: it keeps the voltage and supplies the current the capacitor needs. Both
         halves, right here."
FAULT    A follower too slow to recover from the capacitor's kick inside the window: the buffer is there and
         the reading is still low.
-->

<!-- FILLED 2026-10-07: drafted from training-overview Day 1 Module 4 and standard SAR-ADC input practice; tutor to review -->

```flow
This is one reason **buffering** is so often used in front of an ADC. A buffer presents a suitable load
to the signal source, and its output can drive the ADC input without significantly disturbing the
original signal.

[[demo]] Widget (#2): the same high-impedance source, through a buffer, at full speed.

On the bench: the same 100 k divider, now through an op-amp voltage follower, into the ADC at the full
rate with a 1 µs window. Without the buffer the code was about 1760. With it, 2048.

The divider no longer charges anything; it only supplies the op-amp's tiny input current. The op-amp's
output is a source of a few ohms, and it fills the capacitor in nanoseconds. On the Plot, that is the
source slider down at 100 Ω or less.

It is the buffer from the impedance module, doing exactly the job it was introduced for: it keeps the
voltage, and supplies the current the capacitor needs.

One condition: the op-amp has to recover from the capacitor's kick inside the window, so choose one fast
enough for your sample rate. Datasheets and application notes often add a small resistor and capacitor
between the buffer and the pin to help it.

[[ask]] So: a 100 k divider must be read at 200,000 samples a second, with 1 µs of conversion. Which of
these work: a longer window, a buffer, a divider rebuilt from 1 kΩ resistors, or a slower ADC clock?

[[pause]]

[[reveal]] At 200,000 samples a second each sample has 5 µs, which leaves 4 µs of window. The 50 kΩ
source needs 4.6 µs, so a longer window or a slower clock misses the rate. The buffer works. So does a
1 kΩ divider, at the price of 1.65 mA flowing through it all the time.

[[transition]] The capacitor now holds the right voltage. What the converter does with it — how a
held voltage becomes a number, and how many of that number's bits you can believe — is next.
```
