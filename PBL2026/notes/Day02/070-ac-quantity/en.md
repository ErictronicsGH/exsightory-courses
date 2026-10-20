---
targetMinutes: 30
motivates: The quantity will not hold still any more — so what single number honestly describes a voltage that is never the same twice?
objectives:
  - Explain RMS as the DC value that delivers equal heating power in a resistance.
  - Say why 0.707 is a sine-only constant, and use crest factor to describe a waveform's shape.
concepts: [rms]
---

# AC as the quantity: RMS and crest factor

<!-- PATH: [ **QUANTITY** → SENSOR → … → NUMBER ]  — the AC pass begins, from the quantity inwards.
     TOOL: Plot (centrepiece: v and v² with the mean of the square; three waveforms at the same RMS) ·
           Equation (`simulate` sine, square, triangle) · Draw (`waveform-construction`, `half-wave-mean`,
           both existing; the AC pass on the path). The equal-heating demo on the circuit needs an AC source.
     SOURCES: transcripts/Chapter 14 - what_is_average.md (the RMS paragraph);
              AC_Metering_System_Simulation_Project.md §5 (the AC source: 230 V RMS, 50 Hz, v(t), V_peak);
              training-overview.md Day 2 intro and Module 6. -->

## The quantity starts to move

The DC pass assumed the quantity stood still. Now it moves, and we walk the path a second time, from
the quantity inwards, because time changes what every stage does.

<!-- PLAN
SHOW     Draw — `waveform-construction` (existing): the phasor turning and drawing v(t) = V_peak·sin(2πft),
         labelled 230 V RMS, 50 Hz; then the course path drawing with the AC pass marked from the quantity
         inwards: RMS → isolation → ground and parasitics → conditioning and aliasing → jitter → true RMS and
         power. Look for: a quantity that is never the same twice.
         Status: ready (existing drawing) · needs Draw: AC-pass overlay on the path drawing
-->

```flow
Welcome back. Before the break we closed the DC pass: a quantity that stood still, walked all the way
to a number we had earned.

Everything we did had one assumption in it: the quantity held still while we measured it. From now
on it does not. Day 1 built the chain; this morning firmware either rescued the measurement or
quietly ruined it. This afternoon, AC arrives.

So we go back to the start of the path, to the quantity itself, and walk the path a second time.
This time we go from the quantity inwards: first, what number describes a quantity that moves; then
how we get at it safely; then what the wiring adds; then conditioning it for the converter, when the
converter looks, and finally what the firmware computes. Tomorrow's capstone is that whole AC path
built as one meter.

Here is the quantity we will be following. A nominal sinusoidal supply: **230 V**, **50 Hz**, phase
**0°**. Its instantaneous voltage can be written as:

**v(t) = V_peak · sin(2πft)**

where V_peak is the peak voltage, *f* is the frequency and *t* is time.
```

***

## 230 V of what?

The RMS value of an AC wave is the DC level that would produce the same amount of heating in an
electrical resistance.

<!-- PLAN
SHOW (centrepiece) Plot — v(t) = 325.3·sin(2π·50·t) over two cycles; v²(t) on a second axis with its area
         filled; a horizontal marker at the mean of v², 52,900 V²; the DC level √52,900 = 230 V drawn on the v
         axis; a peak slider. Then Draw `half-wave-mean` (existing): the mean of one hump is 2/π of the peak,
         0.637, against the RMS's 0.707: two averages of the same hump.
         Drive: v → v² (both half-cycles now positive) → the mean of v² → its square root, 230 V.
         Look for: the root of the mean of the square landing on 230 V while the peak is 325 V.
         Status: ready · equal heating on the circuit (two resistors under the heat overlay, one on AC, one on
                 DC, the DC dialled until they match, at bench voltages) needs Electronics: AC source with
                 time-averaged power in the thermal solver
ASK      poe (before the statement) — "We call that supply 230 V. 230 V of what?"
         options: The peak | The average | The DC voltage that would heat a resistor equally | The minimum
         answer: The DC voltage that would heat a resistor equally
         reveal: the Plot's mean of v² and its square root
         explain: Squaring makes both half-cycles heat, averaging gives the mean power per ohm, and the square
         root turns that back into the one DC voltage that heats the same resistor equally: 230 V for a
         325 V peak.
         depth: understand    practice: developing models
SEED     plants S26 — "Equal heating is the definition of RMS. Not 0.707, not a formula printed on a meter:
         equal heating. Tomorrow the firmware computes exactly this, sample by sample."
HARVEST  S24 — "This morning: mean, median, mode. Here is one more average, the root of the mean of the
         square, and it is the one the mains is quoted in."
-->

```flow
[[ask]] We call that supply 230 volts. But the voltage is never 230 V for more than an instant. So
230 V of *what*? The peak? The average? Something else?

[[pause]]

The **root mean square (RMS)** value is used extensively in electrical circuits and certain other
technologies. For example, a sine-wave alternating current may be compared with the direct (DC)
voltage level that would produce the same amount of heating in an electrical resistance. The value of
the AC wave that is the DC heating equivalent is the root mean square value.

[[demo]] Plot Bench — one resistor heated by a DC source, the same resistor heated by an AC source. We
turn the DC up until the two dissipate the same power.

[[demo]] Manim clip — the geometry of RMS: square the wave, take the mean, take the root.

That is what "230 V" means: an AC supply that heats a resistor exactly as 230 V of DC would.
```

***

## Is 0.707 universal?

0.707 is a sine-only constant. Flag it hard: Day 3 · 040, true RMS against the meter, turns on
exactly that hinge.

<!-- PLAN
SHOW     Equation — V_RMS = √(mean of v²) with `simulate` driving v as a sine, then a square, then a triangle,
         all with a 1 V peak; RMS read out as 0.707, 1.000 and 0.577 V; beside it, peak × 0.707 for each:
         0.707 every time. Drive: sine → square → triangle. Look for: one match and two misses (the 0.707
         rule reads the square 29 % low and the triangle 22 % high).
         Status: ready (if the Equation cannot read out RMS over a window, the same three on a Plot with v²
                 filled)
ASK      poe (before the meters) — "Is the RMS of each of these the peak times 0.707?"
         options: Yes, all three | Only the sine | The sine and the triangle | None of them
         answer: Only the sine
         reveal: the three RMS readings beside peak × 0.707
         explain: 0.707 is 1/√2, the result of averaging sin² over a cycle; a square sits at its peak all the
         time (RMS = peak) and a triangle spends less time near it (RMS = peak/√3 ≈ 0.577).
         depth: understand    practice: analysing data
SEED     plants S25 — "0.707 belongs to the sine, and only to the sine. Remember whose it is: tomorrow we meet a
         meter that uses it on everything."
-->

<!-- FILLED 2026-10-07: drafted from training-overview Day 2 Module 6; tutor to review -->

```flow
For our 230 V RMS sinusoidal supply, the peak is **230 × √2 ≈ 325.3 V**. Going the other way, for this
sine, the RMS is the peak times 0.707. It is a number everybody carries around.

[[demo]] Equation Bench — a sine, a square and a triangle, all with the same peak.

[[ask]] Is the RMS of each of these the peak times 0.707?

[[pause]]

[[reveal]] Only the sine. The square's RMS equals its peak. The triangle's is 0.577 of its peak. Only
the sine gives 0.707.

0.707 is one over the square root of two, and it comes from averaging sin² over a whole cycle, which
gives exactly one half. It is a property of the sine's shape. A square wave sits at its peak all the
time, so its RMS is its peak. A triangle spends less of its time near its peak, so its RMS is lower:
the peak divided by the square root of three.

So use 0.707 on anything that is not a sine and you are off: by it, the square reads 29 % low and the
triangle 22 % high.

Flag this one hard. 0.707 belongs to the sine, and only to the sine. Tomorrow we meet a meter that
uses it on everything.
```

***

## Crest factor

Crest factor is the shape descriptor that decides what copes with what. Two waveforms with the same
RMS can make very different demands on whatever has to measure them.

<!-- PLAN
SHOW     Plot — the three waveforms at the same RMS, 230 V: square peak 230 V, sine 325 V, triangle 398 V,
         each with its crest factor (peak/RMS) printed: 1.00, 1.41, 1.73. Drive: hold the RMS; switch between
         the waveforms. Look for: equal heating, peaks 73 % apart.
         Status: ready
ASK      poe (before the statement) — "Same RMS, same heating. Which of the three has the highest peak?"
         options: Square | Sine | Triangle | All the same
         answer: Triangle
         reveal: the three peaks and crest factors
         explain: At equal RMS a wave that spends less of its time near its peak must reach a higher peak to
         deliver the same heating, which is what crest factors of 1, 1.41 and 1.73 measure.
         depth: understand    practice: analysing data
SEED     plants S56 — "The RMS sets the heat. The peak is what the insulation, the converter's input range and
         the meter in your hand have to survive. Keep the two apart."
-->

<!-- FILLED 2026-10-07: drafted from training-overview Day 2 Module 6; tutor to review -->

```flow
[[demo]] Plot Bench — three waveforms, this time set to the *same RMS*.

[[ask]] Same RMS, same heating. Which of the three has the highest peak?

[[pause]]

[[reveal]] The triangle. At 230 V RMS the square peaks at 230 V, the sine at about 325 V, and the
triangle at about 398 V.

The ratio of the peak to the RMS is the **crest factor**: 1 for the square, 1.41 for the sine, 1.73
for the triangle. It describes the shape. A wave that spends little time near its peak has to reach a
higher peak to deliver the same heating.

Why does that matter to us? Because everything along the path has to cope with the peak, not the RMS.
The converter's input range has to hold the peak. The conditioning that scales the mains down has to
bring the peak into that range. And a meter's specification states the highest crest factor at which
its RMS reading still holds.

The RMS sets the heat. The peak is what the insulation, the converter's input range and the meter in
your hand have to survive.

[[transition]] So now we know what number we want from the mains. But we cannot measure what we
cannot reach, and this quantity can hurt us. Before a sensor goes anywhere near it, we have to get at
it safely.
```
