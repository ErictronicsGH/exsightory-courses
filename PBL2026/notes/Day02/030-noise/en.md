---
targetMinutes: 35
motivates: The input is steady, but the last digit of the code will not stand still — where is that coming from, and is it our fault?
objectives:
  - Explain where the unstable last digits come from, and why bobble at a threshold is a decision problem.
  - Derive a thermal-noise floor from resistance and bandwidth on the Equation Bench, and say why high-impedance nodes are noisy.
  - Combine independent noise sources by root-sum-of-squares, and recognise self-inflicted noise coupled through shared impedance and the ground path.
concepts: [noise]
---

# Noise: thermal, coupled and self-inflicted

<!-- PATH: [ … → DIGITAL INTERFACE → **FIRMWARE** sees it … traced back up to SOURCE, CONDITIONING and the
     return path ]  — noise is met where it is seen, in the code, and then traced back up the path.
     TOOL: Equation (centrepiece: thermal noise √(4kTRB) against R and B; RSS) · Coding Bench (`bobble`,
           `threshold`) · Electronics (new fixture `ground-return`, shared with 090) · Plot (the floor for four resistances,
           marked on the Equation's curve).
     SOURCES: transcripts/Chapter 15 - measurement_errors.md ("Reading static errors": last-digit bobble);
              Chapter 14 - what_is_average.md (the RSS noise paragraph); training-overview.md Day 2 Module 1. -->

## The last digit will not stand still

On a digital readout the least significant digit often flips back and forth between two values:
the last-digit bobble. It happens when the actual value sits midway between the two indicated values.

<!-- PLAN
SHOW     Coding Bench — `bobble`: a modelled 12-bit converter reading a perfectly steady input set at 2047.4
         LSB, with seeded Gaussian noise of σ (in LSB) added before rounding; the screen shows the codes
         scrolling, the latest one large, and a live histogram. Drive: σ = 0 (the code sits at 2047) → σ =
         0.3 LSB (2047 and 2048, roughly 63 % and 37 %) → σ = 1 LSB (four or five codes) → back to 0.3 and move
         the input to 2047.0 (the bobble mostly stops) and to 2047.5 (half and half).
         Look for: the bobble depending on where the value sits between two codes as much as on the noise.
         Status: needs Coding Bench: `bobble` (ADC model with seeded noise, scrolling codes, histogram)
ASK      poe (before the statement) — "The input is not changing at all. So why is the last digit?"
         options: The input is changing a little after all | The converter is faulty | Noise, and a value
         sitting between two codes | The firmware is printing it wrong
         answer: Noise, and a value sitting between two codes
         reveal: σ to 0 and the digit freezes; σ back to 0.3 and it bobbles; input to 2047.0 and it calms
         explain: Noise smaller than a step changes the code only when the value is near a boundary, so the
         same noise bobbles a reading at 2047.5 and barely touches one at 2047.0.
         depth: understand    practice: constructing explanations
HARVEST  S7 — "Yesterday, on the meter, there was a last digit that would not sit still, and we filed it as a
         reading error. Here is what it is: noise, and a value that sits between two codes."
-->

```flow
The code has left the converter, crossed the bus, and arrived in our firmware. So let us look at it.

[[demo]] Noise & averaging widget — a perfectly steady input, and the code it produces.

[[ask]] The input is not changing at all. So why is the last digit?

[[pause]]

There is a reading error we see on digital readouts called the **last-digit bobble**. On digital
displays, the least significant digit will often flip back and forth between two values. This
happens when the actual voltage is midway between the two indicated voltages.

We are going to meet noise exactly where you meet it on your own bench: in the code, in that
flickering last digit. And then we are going to trace it back up the path, stage by stage, to where
it got in.
```

***

## Bobble at a threshold

Bobble matters most when an action is taken as a value crosses a threshold. A reading that bobbles
above and below the critical value turns a measurement problem into a decision problem.

<!-- PLAN
SHOW     Coding Bench — `threshold`: the `bobble` stream (input 2047.4 LSB, σ = 0.3 LSB, 1,000 samples a
         second) into `if (code >= 2048) relay = ON; else relay = OFF;`, the relay drawn as a lamp beside a
         counter of switchings per second. Drive: input well below the set point (lamp steady) → input at
         2047.4 (lamp flickers, counter near 470 a second) → σ = 0 (lamp steady again).
         Look for: a steady input making hundreds of decisions a second.
         Status: needs Coding Bench: `threshold` (reuses `bobble`'s ADC model)
ASK      poe (before the statement) — "Your firmware switches a relay when the reading crosses a set point,
         and the reading is bobbling right on it. What does the relay do?"
         options: Switches once and stays | Chatters on and off | Stays off: the average is below the set
         point | Stays on
         answer: Chatters on and off
         reveal: the lamp and the switching counter
         explain: Each sample is a fresh decision, and with 0.3 LSB of noise a value 0.1 LSB below the boundary
         crosses it on about a third of the samples, several hundred switchings a second at 1 kS/s.
         depth: understand    practice: developing models
SEED     plants S53 — "Hold on to that chattering relay. The firmware will learn to calm it, and it will
         charge us for it."
-->

```flow
[[ask]] Suppose your firmware switches a relay when the reading crosses a set point, and the reading
is bobbling right on that set point. What does the relay do?

[[pause]]

Bobbling is of significant concern where some action is taken when a value changes above or below a
certain amount, and the digital display bobbles above and below the critical threshold. At that
point it is no longer only a measurement problem. It is a decision problem.
```

***

## Thermal noise: a floor set by resistance and bandwidth

Thermal noise is a floor set by resistance and bandwidth. The Equation Bench derives the
number rather than asserting it.

<!-- PLAN
SHOW (centrepiece) Equation — v_n = √(4kTRB), T, R and B on dials, k fixed; graphed against R on log axes
         as a family for B = 1 kHz, 10 kHz, 100 kHz; worked example 10 kΩ, 300 K, 10 kHz → 1.29 µV RMS; an
         assumption card, "breaks when: the resistor carries current and adds excess (1/f) noise; thermal is
         the floor, not the total". Then Plot: the floor for 1 k, 10 k, 100 k and 1 MΩ at
         10 kHz (0.41, 1.29, 4.07, 12.9 µV) as data points on the same axes.
         Drive: R × 100 (noise × 10) → B × 4 (noise × 2) → mark the four points.
         Look for: each hundredfold step in resistance landing as a tenfold step in noise: the number is derived, not asserted.
         Status: ready (Equation, Plot) · on-circuit version
                 needs Electronics: resistor thermal noise and a noise analysis
ASK      poe (before the re-runs) — "Raise the resistance a hundredfold. Then widen the bandwidth four times.
         What does the noise do each time?"
         options: × 100, then × 4 | × 10, then × 2 | × 100, then × 2 | Unchanged both times
         answer: × 10, then × 2
         reveal: the Equation's R and B dials, then the four marked points
         explain: Thermal noise power is 4kTRB, so its voltage grows as the square root of resistance and of
         bandwidth.
         depth: understand    practice: developing models
ASK      numeric (after the reveal) — "10 kΩ at 300 K, over a 10 kHz bandwidth: what is the thermal noise, in
         µV RMS?"
         answer: 1.29 µV ± 0.05 µV
         reveal: the Equation's worked example
         explain: √(4 × 1.38×10⁻²³ × 300 × 10⁴ × 10⁴) ≈ 1.29 µV, about 1/600 of a 12-bit, 3.3 V step (806 µV)
         but a sixth of the ADS1115's 7.8 µV step, so on an MCU's own converter most of the bobble comes from
         elsewhere.
         depth: use    practice: computational thinking
HARVEST  S52 — "The ADS1115's table, explained: a faster data rate means a wider bandwidth, and noise grows as
         the square root of bandwidth."
HARVEST  S10 — "On Day 1 we said analog does not mean accurate. Here is the part of that no design removes:
         every resistor at room temperature is a noise source."
-->

<!-- FILLED 2026-10-07: drafted from training-overview Day 2 Module 1; Johnson–Nyquist thermal noise (standard physics); tutor to review -->

```flow
Let us go back up the path, to the very first thing the signal passes through: resistance.

[[demo]] Equation Bench — a resistor feeding the ADC input, and its thermal noise from resistance, temperature and bandwidth.

[[ask]] Before I re-run it: raise the resistance. Then widen the bandwidth. What does the noise
result do each time?

[[pause]]

[[reveal]] A hundred times the resistance gives ten times the noise. Four times the bandwidth gives
twice the noise.

Every resistor above absolute zero makes noise. Its electrons jiggle with heat, and that random motion
appears as a tiny random voltage across the resistor. The noise power is 4kTRB: Boltzmann's constant,
the absolute temperature, the resistance, and the bandwidth you measure over. The voltage is the
square root of that, which is why it grows as the square root of R and of B.

[[demo]] Here is the equation, with its values for 1 kΩ, 10 kΩ, 100 kΩ and 1 MΩ marked on the same axes.
Every hundredfold step in resistance is a tenfold step in noise. The number is
derived, not asserted.

[[ask]] So: 10 kΩ, room temperature, a 10 kHz bandwidth. How many microvolts?

[[pause]]

About 1.3 µV RMS. Now compare it with one step of a 12-bit converter on 3.3 V: about 806 µV. The
resistor's thermal noise is roughly a six-hundredth of a step. On the ADS1115's most sensitive range,
though, one step is 7.8 µV, and the same noise is about a sixth of it.

So on your microcontroller's own converter, most of the flicker comes from somewhere else: the
converter's own noise, the supply, the board. Thermal noise is the floor, not the whole story.

And look again at the ADS1115's table. A faster data rate means a wider bandwidth, and noise grows as
the square root of the bandwidth.

On Day 1 we said analog does not mean accurate. Here is the part of that no design removes: every
resistor at room temperature is a noise source.
```

***

## The cost of high impedance

Because the floor is set by resistance, high-impedance nodes are noisy by physics. That is one more
cost of Day 1's choices.

<!-- PLAN
SHOW     Equation — the centrepiece Equation with R stepped from 10 kΩ to 1 MΩ, beside D1·040's loaded divider
         and D1·070's settling time, the same R on all three. Drive: R × 100 on all three together.
         Look for: one resistor, three costs, all growing with it.
         Status: ready
ASK      numeric (before the statement) — "A 1 MΩ source instead of 10 kΩ, same bandwidth. How many times
         more thermal noise?"
         answer: 10 ± 0
         reveal: the R dial stepped from 10 kΩ to 1 MΩ
         explain: Noise voltage goes as √R and √(1 MΩ / 10 kΩ) = 10, so the high-impedance node pays in
         loading, in settling time and now in noise.
         depth: use    practice: computational thinking
-->

<!-- FILLED 2026-10-07: drafted from training-overview Day 2 Module 1; tutor to review -->

```flow
On Day 1 we met high source impedances, in dividers and in sensors themselves, and we learnt to
count their cost: in loading (040) and in acquisition time (070).

[[ask]] Given what `.noise` just showed us, what else did those high resistances cost?

[[pause]]

[[reveal]] Noise. Thermal noise grows as the square root of the resistance, so going from a 10 kΩ
source to 1 MΩ gives ten times the noise voltage over the same bandwidth.

[[demo]] Here are the three costs side by side, all driven by the same resistor: the loaded divider
from 040, the settling time from 070, and the noise from the last card. Turn R up a hundredfold and all
three get worse together.

So a high-impedance node is noisy by physics. When you choose a megohm divider to save a few
microamps, you do not pay once. You pay in loading, in acquisition time, and in noise.
```

***

## Independent noise adds as root-sum-of-squares

Truly independent noise sources cannot be combined in a linear, additive way. They combine as the
root of the sum of their squares (RSS).

<!-- PLAN
SHOW     Equation — v_total = √(v₁² + v₂²) with two dials (D1·020's RSS card, reused). Then Coding Bench
         `bobble` with a second, independent seeded noise source and a measured-σ readout. Drive: v₂ = 0 →
         v₂ = v₁ (measured σ 1.41 × one source) → v₂ = 3·v₁ (3.16 × v₁: the smaller one nearly vanishes).
         Look for: equal sources giving √2, not 2.
         Status: ready (Equation) · needs Coding Bench: `bobble` with a second noise source and σ readout
ASK      poe (before the statement) — "Two truly independent noise sources of equal size meet at one node. Is
         the total twice either one?"
         options: Yes, twice | About 1.4 times | The same as one | Anywhere from zero to twice
         answer: About 1.4 times
         reveal: the Coding Bench's measured σ with both sources on
         explain: Independent noise has no fixed phase relation, so the powers add rather than the voltages,
         √(1² + 1²) ≈ 1.41, and only correlated sources can reach twice or cancel.
         depth: understand    practice: analysing data
-->

```flow
We met root-sum-of-squares on Day 1 (020) as a way of combining errors in a budget. Noise is where
it earns its keep.

[[ask]] Two truly independent noise sources of equal size meet at the same node. Is the total twice
either one of them?

[[pause]]

Noise signals in electronic circuits are errors, and they come from several different sources.
Suppose we have *n* independent noise voltage sources, where these sources are truly independent of
each other. They cannot simply be combined in a linear, additive manner, but must be combined using
the **RSS** method. The RSS number is sometimes used to define a single-valued error term from a
number of uncorrelated error terms.
```

***

## Self-inflicted: switching noise through shared impedance

Some noise is our own. Switching currents elsewhere on the board couple into the measurement
through an impedance both circuits share, and a lumped model shows exactly how.

<!-- PLAN
SHOW     Electronics — new fixture `ground-return` (also 090's centrepiece): a 10 V supply V1; a sensor
         divider (R1 90 kΩ over R2 10 kΩ, 1.000 V) returned to V1's own ground; a load RL (5 Ω, 25 W) switched
         by an N-MOSFET M1 whose gate comes from a dial supply V2; RL's return and the DMM's low lead (the
         stand-in for the ADC's ground pin) both land at the far end of one 0.5 mm return trace TR, about
         10 mΩ. Drive: V2 = 0 V (load off, reading steady at 1.000 V) → V2 = 10 V (2 A, reading steps to about
         0.980 V) → toggle a few times.
         Look for: the reading moving in time with a load it has no wire to, except through TR.
         Status: ready (fixture from existing parts: supply-bench ×2, resistor-typical, resistor-power-25,
                 mosfet-typical, trace-cu-0r5mm, dmm-bench) · the switching edges themselves need
                 Electronics: pulse source and transient solve
ASK      circuit + predict (before the load switches) — "When M1 switches the load on, what does the DMM do?"
         options: Nothing: it is not connected to the load | It reads lower | It reads higher | It reads zero
         answer: It reads lower
         reveal: V2 to 10 V, the DMM steps down
         explain: The load's 2 A returns through TR, which lifts the far end of "ground", where the DMM's low
         lead sits, by about 20 mV, and the meter subtracts that from the sensor's 1.000 V.
         depth: understand    practice: developing models
FAULT    The ADC's ground pin returned at the load end of a shared trace: every reading low by 20 mV, only
         while the load runs; found by measuring ground to ground under load.
-->

<!-- FILLED 2026-10-07: drafted from training-overview Day 2 Module 1; tutor to review -->

```flow
So far the noise has come from physics. Some of it, though, we make ourselves.

[[ask]] Name something on your own board that switches.

[[pause]]

[[demo]] Electronics Bench — a switching load and the measurement circuit sharing one lumped impedance.

Here is what is on the bench. A sensor divider gives 1.000 V, returned to the supply's own ground. A
5 Ω load, switched by a MOSFET, draws 2 A. And the load's return and the meter's low lead, standing in
for the ADC's ground pin, both land at the far end of one short piece of track, about 10 mΩ.

[[ask]] When the MOSFET switches the load on, what does the meter do?

[[pause]]

[[reveal]] It reads lower, by about 20 mV, and it jumps back every time the load switches off. The
meter has no wire to the load. The only thing they share is that piece of track.

That is coupling through a shared impedance. The load's current flows through copper the measurement
also uses as its reference, and the voltage that current makes is added to the reading. On a real
board the load switches thousands of times a second, so the reading carries a pattern that follows the
switching: a motor, a relay, a PWM-dimmed LED, a radio transmitting.
```

***

## Return current makes voltage in the ground path

Return current flowing through the ground path makes a voltage there, and the converter reads it as
signal. We take this up in full when we reach ground (Day 2 · 090).

<!-- PLAN
SHOW     Electronics — the same `ground-return` fixture with the Voltage overlay on and TR's `ir_drop` reveal,
         the drop drawn along a piece of copper labelled ground. Drive: reveal on; load on, off, on.
         Look for: a voltage across "ground".
         Status: ready (the `ir_drop` reveal exists on trace-cu-0r5mm, as in `net-sizing`)
SEED     plants S23 — "Return current makes a voltage in the ground path, and the converter reads it as signal.
         Keep that sentence. This afternoon ground gets a module of its own, and we put a number on it."
-->

<!-- FILLED 2026-10-07: drafted from training-overview Day 2 Module 1; tutor to review -->

```flow
[[demo]] The same circuit on the Electronics Bench, with the ground return drawn as a lumped resistance.

Turn on the voltage view along that track. The drop is drawn along a piece of copper we labelled
ground. Return current makes a voltage in the ground path, and the converter reads it as signal.

Keep that sentence.

We will come back to this one this afternoon, when ground gets a module of its own.

[[transition]] So noise is everywhere on the path, some of it from physics and some of it from us.
So far we have treated it as the enemy. Next, the firmware starts to *use* it: averaging, and the
condition under which averaging buys you resolution you did not have.
```
