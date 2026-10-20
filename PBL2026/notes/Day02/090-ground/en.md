---
targetMinutes: 40
motivates: Every reading is taken against "ground" — but if ground is not the same 0 V everywhere, every reading carries an error nobody drew on the schematic.
objectives:
  - Explain ground as a chosen reference with resistance and inductance, and compute the error a return current makes in an ADC reading.
  - Recognise a ground loop as two paths to earth forming a closed circuit.
  - Use differential sensing as the structural fix, and say why external ADCs offer paired inputs.
concepts: [ground-impedance, ground-loop]
---

# Ground as an impedance: returns, loops and differential sensing

<!-- PATH: [ QUANTITY → SENSOR → **the PATH: wiring and returns** → CONDITIONING → … ]  — what the wiring adds,
     starting with the return.
     TOOL: Electronics (centrepiece: the `ground-return` fixture from 030 — shared return trace, IR drop,
           differential probe; new fixture `ground-loop` as a DC stand-in) · Equation (20 mV → counts) · Draw
           (a ground loop as two paths to earth) · Figure (single-ended against differential). Mains-hum loops
           need an AC source.
     SOURCES: transcripts/Chapter 15 - measurement_errors.md ("Dealing with measurement errors": ground loop
              voltage drop and ground plane noise — tutor's note "this needs modern touch");
              training-overview.md Day 3 Module 3. -->

## What is 0 V?

Ground is a chosen reference, not a physical zero. Copper has resistance and inductance, so "ground"
at one point is not the same voltage as "ground" at another when current flows.

<!-- PLAN
SHOW     Electronics — `ground-return` (first met in 030): a DMM between the supply's ground and the far end
         of the return trace TR, where the load and the ADC's ground both land. Drive: load off (0 mV) → load
         on, 2 A (about 20 mV). Look for: a voltage between two points that are both called ground.
         Status: ready (fixture from existing parts)
ASK      circuit + predict (before the load switches on) — "Ground right at the ADC, and ground at the far end
         where the load returns. With the load running, is it the same 0 V?"
         options: The same 0 V | Different by millivolts | Different only with AC | Different by volts
         answer: Different by millivolts
         reveal: the DMM across TR with the load on
         explain: The load's 2 A returns through the same copper, and copper has resistance, so the two ends
         of "ground" differ by the current times that resistance.
         depth: understand    practice: developing models
HARVEST  S23 — "This morning I said return current makes a voltage in the ground path, and the converter reads
         it as signal. Here it is: a voltage between two points we both call 0 V."
-->

<!-- FILLED 2026-10-07: drafted from training-overview Day 3 Module 3; tutor to review -->

```flow
On every schematic you have ever drawn there is a little symbol at the bottom, and we call it ground.
Every voltage in this course has been measured against it. This morning, in the noise module, I
promised we would come back to it.

[[ask]] Suppose you touch a probe to ground right at the ADC pin, and then to ground at the far end of
the board, where the load returns. Is it the same 0 V?

[[pause]]

[[demo]] On the bench: a meter between ground at the supply and ground at the far end of the return
track, where the load and the ADC's ground both land. Load off: zero. Now the load on, two amps.

[[reveal]] About 20 millivolts. Two points we both call 0 V, and they are not the same.

Ground is a **chosen reference**, not a physical zero. We pick one point and call it zero. Everywhere
else is joined to it by copper, and copper has resistance, and inductance too. When current flows
through it, the two ends differ by that current times that resistance.

And here is why it matters. The ADC reads its input against *its own* ground pin. Any voltage between
that pin and the sensor's ground is added to the reading, as if it were signal.
```

***

## How much is ten milliohms worth?

Two amps through ten milliohms of return trace is twenty millivolts. At 12 bits on 3.3 V that is
about twenty-five counts of pure error, in every reading.

<!-- PLAN
SHOW (centrepiece) Equation + Electronics — Equation first: 2 A × 10 mΩ = 20 mV; 1 LSB = 3.3 V / 4096 ≈
         0.806 mV; 20 mV ≈ 25 counts, with I, R and N on dials. Then `ground-return`: TR set to 10 mΩ (by
         ρ/(w·t), about 10 mm of 0.5 mm, 1 oz track; read the bench's own value rather than assuming it), RL
         drawing 2 A, the sensor divider at 1.000 V against its own ground, the DMM standing in for the ADC
         against the far end of TR; Voltage overlay and TR's `ir_drop` reveal on. Drive: compute → model:
         load on, the DMM reads about 0.980 V; then NetClass Mode: TR's 2 A is also past its 1.3 A rating.
         Look for: the hand number and the bench number agreeing, 20 mV of error in a reading with no wire to
         the load.
         Status: ready (Equation; fixture from existing parts) · counts shown as counts need Electronics: ADC
                 part with a ground pin and code readout
ASK      numeric (before the reveal) — "2 A of return current through 10 mΩ of return trace. How many counts
         of error is that at 12 bits on 3.3 V?"
         answer: 25 counts ± 1
         reveal: the Equation, then the DMM on the bench
         explain: 2 A × 10 mΩ = 20 mV, and 20 mV / 0.806 mV ≈ 24.8, so about 25 counts in every reading taken
         while the load runs.
         depth: use    practice: computational thinking
HARVEST  S51 — "Two amps through ten milliohms: on the INA226 this morning that was eight thousand counts of
         signal. Same numbers, other copper, and here every one of them is error."
FAULT    The ADC's ground pin returned at the load end of a shared trace: readings 25 counts low only while the
         load runs; found by measuring ground to ground under load.
-->

<!-- FILLED 2026-10-07: drafted from training-overview Day 3 Module 3; tutor to review -->

```flow
[[ask]] Here are the numbers. Two amps of return current flow through ten milliohms of return trace.
What voltage does that make? And on a 12-bit converter with a 3.3 V reference, how many counts is
that?

[[pause]]

[[reveal]] Two amps through ten milliohms is twenty millivolts. One LSB at 12 bits on 3.3 V is
3.3 V / 4096, about 0.81 mV. So twenty millivolts is about twenty-five counts — twenty-five counts of
pure error, in every reading.

[[demo]] Electronics Bench — the same return trace drawn as a lumped resistance. The number we just computed
by hand, now modelled.

On the bench the reading is about 0.980 V instead of 1.000 V. The hand calculation and the circuit
agree.

And the bench says one more thing: this half-millimetre track is rated for about 1.3 A at a 10 °C
rise. Two amps is too much for it to begin with.

Think how hard we have fought for single counts since yesterday: the acquisition time, the reference,
the oversampling, the calibration. A return trace can take twenty-five of them without anyone
noticing.

Two amps through ten milliohms is the same pair of numbers as the INA226 this morning. There it was
eight thousand counts of signal across a shunt. Here, across a ground trace, every one of them is
error.
```

***

## Ground loops

A ground loop is two paths to earth forming a closed circuit. Ground-loop voltage drop and
ground-plane noise are a significant source of measurement error.

<!-- PLAN
SHOW     Draw + Electronics — Draw first: two instruments, each bonded to earth through its own mains lead,
         joined by a signal cable whose screen is also bonded at both ends; the second earth path closes the
         loop, and the loop is shaded. Then new fixture `ground-loop` (DC stand-in): instrument A (sensor) and
         instrument B (ADC, a DMM) joined by 2 m of AWG 24 as the signal return; a stated voltage
         (voltage-drop-stated) standing for the difference between the two earth points; the second ground
         wire added last. Drive: one ground path (reading as expected) → add the second → current overlay on
         the cable's return. Look for: current in a wire that carries no signal, and the reading moving by
         that current times the cable's resistance.
         Status: needs Draw: ground loop as two paths to earth · Electronics ready as a DC stand-in (fixture
                 from wire-cu-awg24, voltage-drop-stated, dmm-bench) · real mains hum needs Electronics:
                 50 Hz AC source
ASK      circuit + predict (before the second ground connection) — "I am adding one wire: a second
         connection to ground. What happens to the reading?"
         options: Nothing: ground is ground | A current circulates and the reading shifts | The reading goes
         to zero | The reading becomes more accurate
         answer: A current circulates and the reading shifts
         reveal: the second ground wire added, current overlay on the cable's return
         explain: Two connections to earth at points that are not at the same potential close a loop, a
         current flows round it, and part of that loop is the signal's own return, so its drop adds to the
         reading.
         depth: understand    practice: developing models
HARVEST  S57 — "Before the break the optocoupler gave its two sides two different grounds. That is one way out
         of a loop: break the path, keep the information."
-->

<!-- FILLED 2026-10-07: drafted from training-overview Day 3 Module 3; tutor to review -->

<!-- Tutor's note in Chapter 15: "this needs modern touch". The GAP below is that modern treatment. -->

```flow
A significant source of measurement error in some electronic circuits is ground-loop voltage drop and
ground-plane noise.

[[demo]] Electronics Bench (#8) — two instruments, each with its own connection to ground.

[[ask]] I am about to add one wire: a second connection to ground. What happens to the reading?

[[pause]]

[[reveal]] A current starts to flow round the loop, and the reading shifts.

[[demo]] Here is the picture. Two instruments, each connected to earth through its own mains lead. A
signal cable joins them, and its return conductor connects their grounds a second time. Now there are
two paths between the two grounds, and together they form a closed loop.

Two earth points are rarely at exactly the same potential. So a current flows round the loop, and part
of the loop is the signal's own return conductor. The current makes a voltage in that conductor, and
the reading picks it up: the same mechanism as the shared return track, and as the switching noise
this morning.

On a real installation the difference between two earth points is mostly at mains frequency, so a
ground loop usually shows up as hum: a 50 Hz ripple riding on the measurement.

The fix is to break the loop without breaking the signal. You have already seen one way: before the
break, the optocoupler gave its two sides two different grounds. Break the path, keep the information.
```

***

## Differential sensing: the structural fix

Differential sensing measures the difference between two inputs rather than one input against
ground, so the ground difference is rejected rather than read. That is why an external ADC's paired
inputs exist.

<!-- PLAN
SHOW     Electronics — `ground-return` again with the DMM replaced by a differential probe (as in
         `divider-differential`): tip on the sensor output, reference moved from the far end of TR to the
         sensor's own ground. Drive: single-ended, load on (about 0.980 V) → differential, load on and off
         (1.000 V both times). Then Figure: the same sensor wired single-ended and differentially across the
         drop, and the ADS1115's AIN0–AIN1 pair.
         Look for: the drop leaving the reading without anything in the copper changing.
         Status: ready (probe-x1 with a differential reference exists) · needs asset: single-ended against
                 differential SVG (ours to draw)
ASK      checkpoint (before the statement's explanation) — "Where on the path have we already met a difference
         measured instead of a level against ground?"
         items: D1·050 Kelvin sense leads | D1·060 the in-amp and CMRR | D2·020 the ADS1115's input pairs |
         D2·020 the INA226's shunt inputs
         depth: understand    practice: constructing explanations
HARVEST  S16 — "Differential gain ignores what both inputs share; on Day 1 that was CMRR. The ground drop is
         shared by both of our wires, so a differential input ignores it. That is why an external ADC gives
         you paired inputs."
FAULT    A ground difference large enough to push one input outside the converter's allowed input range
         (for the ADS1115 only a few tenths of a volt below its own ground; check the datasheet): the
         differential input stops rejecting and starts clipping.
-->

<!-- FILLED 2026-10-07: drafted from training-overview Day 3 Module 3; tutor to review -->

```flow
[[ask]] Where on the path have we already met a circuit that measures a *difference* rather than a
level against ground?

[[pause]]

On Day 1 (060) the in-amp did exactly that, and CMRR told us how well it ignored what the two inputs
had in common. This morning (020) we saw that the ADS1115's multiplexer offers two differential input
pairs.

[[demo]] Back to the shared return track, with the load running. The meter, measuring single-ended
against the far end of the track, reads about 0.980 V. Now move its reference lead to the sensor's own
ground, so that it measures the difference between the sensor's two wires.

[[reveal]] 1.000 V, load on or off. Nothing in the copper changed. The ground drop is still there; we
have simply stopped measuring it.

That is differential sensing. Both of the measured wires carry the ground drop in common, and a
differential input ignores what its two inputs share: CMRR, from Day 1. It is the structural fix,
because it does not depend on making the ground perfect.

And that is why an external ADC gives you paired inputs. On the ADS1115, wire the sensor's output to
AIN0 and the sensor's own ground to AIN1, and the ground drop is rejected instead of read, as long as
both inputs stay inside the converter's allowed input range.

[[transition]] So ground is not nothing: it is a piece of wire with resistance and inductance, and it
is on the path whether we draw it or not. Tomorrow we keep walking that same stretch of the path,
because the return is not the only thing the wiring adds. The probes and leads themselves bring
capacitance and inductance, and with a quantity that moves, those start to matter.
```
