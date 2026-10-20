---
targetMinutes: 40
motivates: To measure a current you have to put something in its path, and whatever you put there changes the circuit.
objectives:
  - Size a shunt as a trade between the signal it gives and the disturbance it causes.
  - Choose between high-side and low-side sensing, and say what each gives up.
  - Use a Kelvin connection to remove lead and contact resistance, and predict the burden voltage an ammeter inserts.
concepts: [shunt-sensing, kelvin-connection, burden-voltage]
---

# Current as the quantity: shunts, Kelvin and burden voltage

<!-- PATH: quantity → [ SENSOR (current → voltage) ] → conditioning → ADC → firmware → number
     TOOL: Electronics (centrepiece: four-wire-sensing, two-wire and four-wire side by side, with the
           lead-length dial; branch-current re-valued for burden voltage, budget against bench shunt;
           a 10 mΩ shunt at the low and the high side under the Voltage overlay) · Equation (shunt
           signal and shunt power). The brown-out demo needs an MCU-style load with a brown-out threshold on
           the bench.
     SOURCES: transcripts/Chapter 02 - Measurement fundamentals.md (indirect measurement of current);
              Chapter 15 - measurement_errors.md (insertion error); training-overview.md Day 1 Module 7.
     Mostly GAP: no transcript yet for this module. -->

## A shunt turns current into voltage

Measure the voltage across a known resistance, and Ohm's law gives the current. The shunt is a
transducer, and the measurement is an indirect one.

<!-- PLAN
SHOW     Equation — I = V_sh / R_sh, with a worked example: 20 mV across 10 mΩ → 2 A.
         Status: ready.
HARVEST  S37 — "This is the indirect measurement from this morning: a voltage, a known resistance, and Ohm's
         law."
-->

```flow
In the measurand module we met indirect measurement. Suppose you want to measure current. Instead of
using an ammeter, you can measure the voltage across a known resistance and compute the current using
Ohm's law, I = V/R.

That known resistance is a **shunt**, and it is a transducer in exactly the sense of 030: it turns one
quantity, current, into another, voltage, through a known relationship.
```

***

## Sizing a shunt: signal against disturbance

A larger shunt gives more signal, and takes more voltage and power from the circuit it measures.
Its value is a trade, not a default.

<!-- PLAN
ASK      numeric ×2 (at the Flow's [[ask]]) — "Two amps through a 10 mΩ shunt. How much signal do you get?"
         then "How much power does the shunt burn?"
         answer: 20 mV ± 1 mV, then 40 mW ± 2 mW
         reveal: the Equation pair below, at R = 10 mΩ.
         explain: V = I·R = 2 A × 10 mΩ = 20 mV and P = I²·R = 4 A² × 10 mΩ = 40 mW; at a fixed current both
                  grow in step with the shunt, so every extra millivolt of signal costs the circuit voltage
                  and heat.
         depth: use    practice: computational thinking
SHOW     Equation — V = I·R and P = I²·R, graphed against R from 1 mΩ to 100 mΩ at I = 2 A, with the signal
         also shown in codes at 12 bits on 3.3 V.
         Look for: 20 mV is about 25 codes — measurable, and nowhere near the ADC's range (the problem 060
         solves).
         Status: ready.
-->

<!-- FILLED 2026-10-07: drafted from training-overview Day 1 Module 7 and standard current-sensing practice; tutor to review -->

```flow
[[ask]] Two amps flow through your candidate shunt. How much signal do you get, and how much power does
the shunt burn?

[[pause]]

[[demo]] Two equations on the bench: the signal, V = I·R, and the power, P = I²·R. Put in 2 A and
10 mΩ.

[[reveal]] 2 A times 10 mΩ is 20 mV of signal. 2 A squared is 4, times 10 mΩ is 40 mW of heat.

Now slide the shunt up. At 50 mΩ you get 100 mV, five times the signal, and 200 mW, five times the
heat, and the circuit you are measuring loses 100 mV of its supply. Slide it down to 1 mΩ and the
circuit barely notices, but you are left with 2 mV to measure.

That is the trade. A bigger shunt is easier to measure and harder on the circuit. A smaller one is kind
to the circuit and hard to measure: 20 mV straight into a 12-bit, 3.3 V ADC is only about 25 codes.

So a shunt's value is a decision, not a default. Decide how much voltage the circuit can spare at
full-scale current, choose the shunt that drops that much, and check its power rating with a margin.
Getting the small signal up to a size the ADC can use is the next module's job.
```

***

## Low side or high side

Low-side sensing is easy to measure and lifts the load off ground. High-side keeps the ground
intact and puts the small signal on top of a large common-mode voltage.

<!-- PLAN
SHOW     Electronics — two copies of a 12 V supply driving a 6 Ω load (resistor-power-25, on its heatsink plate: it
         burns 23.9 W of its 25 W) through a 10 mΩ shunt:
         at the bottom in one, at the top in the other; Voltage overlay on.
         Drive: probe both ends of each shunt; then the load's lower terminal in the low-side copy.
         Look for: low side — 0 and 20 mV, and the load's return lifted 20 mV off ground; high side — 12.00 V
         and 11.98 V: a 20 mV signal riding on 12 V.
         Status: ready (a 10 mΩ resistor value and the Voltage overlay).
ASK      flash (after the SHOW) — "The load's return must stay at system ground, because a sensor shares it.
         Which side does the shunt go?"
         options: low side | high side | either
         answer: high side
         explain: A low-side shunt lifts the load's return by I·R — 20 mV here, more in a fault — while a
                  high-side shunt leaves the return alone and moves the problem into the measurement: a small
                  signal on a large voltage.
         depth: use    practice: designing solutions
SEED     plants S33 — "Twenty millivolts, sitting on twelve volts. That pair is the whole problem of the next
         module."
-->

<!-- FILLED 2026-10-07: drafted from training-overview Day 1 Module 7 and standard current-sensing practice; tutor to review -->

```flow
There are two places to put the shunt: between the load and ground, or between the supply and the load.

[[demo]] Two copies of the same circuit: 12 V, a 6 Ω load drawing 2 A, and our 10 mΩ shunt. Low side on
the left, high side on the right. Watch the voltage overlay on each shunt.

On the low side, the shunt's two ends sit at 0 V and 20 mV. The signal is referred to ground, and any
ADC can read it. But look at the load's lower terminal: it is no longer at ground. It sits 20 mV above
it, and further if the current rises.

On the high side, the load keeps its ground. But the shunt's two ends sit at 12.00 V and 11.98 V. The
signal is still 20 mV, riding on top of 12 V.

[[ask]] The load's return has to stay at system ground, because a sensor shares it. Which side does the
shunt go?

[[pause]]

[[reveal]] The high side. A low-side shunt lifts the load's return by I times R. A high-side shunt leaves
the return alone, and moves the problem into the measurement: a small signal on a large voltage.

Low side gives up the load's ground. High side gives up an easy measurement. Twenty millivolts, sitting
on twelve volts: that pair is the whole problem of the next module.
```

***

## The leads are part of the shunt

When the shunt is milliohms, the resistance of its leads and contacts is comparable to it. A
two-wire measurement reads all of them together.

<!-- PLAN
ASK      circuit + predict (at the Flow's [[ask]]) — "A 10 mΩ shunt, measured with two-wire leads. Will the
         reading be high, low, or right?"
         options: high | low | right
         answer: high
         reveal: four-wire-sensing with lead_resistance on WF1: the two-wire meter M2W reads 100.34 Ω for the
                 Pt100, against 100.00 Ω on M4W.
         explain: The meter reads every resistance between its two contacts, and the leads and contacts are in
                  series with the shunt, so the reading can only come out larger; a 10 mΩ shunt on 10 cm of
                  AWG 24 each side reads about 27 mΩ, 2.7 times the shunt.
         depth: understand    practice: arguing from evidence
SHOW     Electronics — four-wire-sensing (the same fixture as the next card), opened on the two-wire meter.
         Status: ready with the Pt100 at 1 mA · needs Electronics: a milliohm four-terminal shunt profile, to
                 run the 10 mΩ case itself.
-->

<!-- FILLED 2026-10-07: drafted from training-overview Day 1 Module 7 and standard current-sensing practice; tutor to review -->

```flow
[[ask]] A 10 mΩ shunt, measured with two-wire leads. Will the reading be high, low, or right?

[[pause]]

[[demo]] On the bench: a sensor measured two ways at once. One meter connects at the near ends of the
leads, two metres of thin copper away. The other has its own pair of wires landing right on the
sensor's terminals. Switch on the lead resistance.

[[reveal]] The two-wire reading is high. A meter reads every resistance between its two contacts, and
the leads and their contacts are in series with the thing you meant to measure. They can only add.

For this 100 Ω sensor, two metres of wire each way add a third of an ohm. You might not mind. Now put a
10 mΩ shunt there instead. Ten centimetres of AWG 24 on each side is about 8 mΩ per lead, so the
two-wire reading comes out near 27 mΩ: nearly three times the shunt. A screw terminal or a breadboard
contact can add tens of milliohms more, and a different amount every time you touch it.

When the shunt is milliohms, the leads are part of the shunt.
```

***

## Kelvin: separate the current from the measurement

Force the current through one pair of connections and sense the voltage with another, which carries
almost no current. The lead resistance drops out of the reading.

<!-- PLAN
SHOW (centrepiece) Electronics — four-wire-sensing: a precision 1 mA source into a Pt100, two metres of AWG 24
         in each force lead; M2W across the near ends of the leads, M4W on its own AWG 30 sense pair at the
         RTD's terminals.
         Drive: read both meters → take the ASK → force leads 2 m → 10 m → add a contact-breadboard in the
         force path (contact_variability).
         Look for: M4W unmoved at 100.00 Ω while M2W climbs to about 101.7 Ω, then jumps with the contact.
         Status: ready (the fixture, its reveal and predict, the lead-length dial).
ASK      circuit + predict (the fixture's own) — "The two force leads are swapped for ten metres of the same
         wire. Which readings move?"
         options: both — the leads are in series | neither — the source sets the current | only the two-wire
                  one, upward | only the four-wire one
         answer: only the two-wire one, upward
         explain: The sense pair carries almost no current, so its own resistance drops almost no voltage and
                  the four-wire meter sees only the RTD; the two-wire meter sees 20 m of copper, about 1.7 Ω.
         depth: understand    practice: arguing from evidence
FAULT    Sense wires landed on the force terminals: it looks four-wire and behaves two-wire.
FAULT    A breadboard contact in the force path: the two-wire reading jumps between runs; the four-wire one
         does not.
-->

<!-- FILLED 2026-10-07: drafted from training-overview Day 1 Module 7 and standard current-sensing practice; tutor to review -->

```flow
[[demo]] Electronics Bench: 2-wire and 4-wire measurements of the same sensor, side by side.

The fix is to stop measuring through the wires that carry the current.

A **Kelvin**, or four-wire, connection uses two pairs. The **force** pair carries the current through the
sensor. The **sense** pair connects the meter to the sensor's own terminals, and carries almost no
current, because a good meter's input is in the gigaohms. With almost no current in the sense wires,
their resistance drops almost no voltage, and the meter sees only the sensor.

On the bench: the two-wire meter across the near ends of the leads, and the four-wire meter on its own
sense pair. The same 1 mA flows through the same Pt100.

[[ask]] I swap the two force leads for ten metres of the same wire. Which readings move?

[[pause]]

[[reveal]] Only the two-wire one, and upward, to about 101.7 Ω, because it now sees twenty metres of
copper. The four-wire meter stays at 100.00 Ω. The lead resistance has dropped out of the reading.

[[demo]] One more: a breadboard contact in the force path. The two-wire reading jumps. The four-wire one
does not move. Resistance in the force path does not matter, as long as the sense wires land on the
sensor itself.

That is why precision shunts have four terminals: two heavy ones for the current, two small ones for the
measurement. Use the small ones.
```

***

## Burden voltage: the drop your ammeter inserts

An ammeter is a shunt too. The voltage it drops is taken from the circuit under test, and at low
supply voltages that can be enough to change what you are measuring.

<!-- PLAN
SHOW     Electronics — branch-current re-valued: V1 = 3.3 V, R1 = 66 Ω (a load drawing 50 mA), ammeter A1 on
         its shunt dial, clamp CP1 on the same conductor.
         Drive: A1 at 10 mΩ → take the ASK → dial to 2.5 Ω (a handheld's 200 mA range: its 1 Ω shunt, fuse
         and leads) → reveal burden_voltage → probe the load → the load swapped for a microcontroller that
         transmits → dial to 0.1 Ω (a bench meter's shunt).
         Look for: A1 reports 48.2 mA and the load now sits at 3.18 V; the microcontroller's 300 mA radio burst
         takes 0.75 V and drops its rail to 2.55 V, below its brown-out; at 0.1 Ω the load loses 5 mV.
         Status: ready (the fixture, re-valued) · needs Electronics: an MCU-style load with a brown-out
                 threshold (resets below about 2.7 V), so the circuit browns out on the bench instead of in
                 words.
ASK      circuit + predict (at the Flow's [[ask]]) — "The meter reads a perfectly sensible current. Is the
         circuit still doing what it did before you connected the meter?"
         options: yes — an ammeter changes nothing | yes, to within the meter's accuracy | no — the load lost
                  about 0.12 V and 3.6 % of its current | no, but only the clamp can tell
         answer: no — the load lost about 0.12 V and 3.6 % of its current
         reveal: burden_voltage on A1, and the probe on the load.
         explain: The 2.5 Ω shunt takes 0.12 V of the 3.3 V that was the load's, so the load runs at 3.18 V and
                  draws 48.2 mA instead of 50 mA; a microcontroller's 300 mA radio burst through the same 2.5 Ω
                  would take 0.75 V.
         depth: understand    practice: arguing from evidence
HARVEST  S6 — "Insertion error again, on the current side: the ammeter's own shunt is now part of the circuit."
HARVEST  S36 — "Same display, two meters, two different circuits underneath. Whose band are you standing in?"
FAULT    A handheld on its mA range in series with an MCU: it resets on every radio burst, and "works" again
         once the meter is taken out.
-->

<!-- FILLED 2026-10-07: drafted from training-overview Day 1 Module 7 and standard current-sensing practice; tutor to review -->

```flow
This is the insertion error from the measurand module again, on the current side. With a voltmeter, a
low input impedance alters the circuit; with an ammeter, it is the voltage the meter's own shunt takes
from the circuit. No measuring device has zero effect on the system being measured — the skill is
knowing how much effect, and choosing it.

On the bench: a 3.3 V supply and a load that draws 50 mA, an ammeter in the branch, and a clamp on the
same wire. The ammeter's shunt starts at 10 mΩ. I turn it to 2.5 Ω, which is about what a handheld meter
puts in circuit on its 200 mA range, fuse and leads included.

[[ask]] The meter reads a perfectly sensible current. Is the circuit still doing what it did before you
connected the meter?

[[pause]]

[[demo]] Electronics Bench: the meter's 200 mA range in circuit; later, a microcontroller in the resistor's place
browns out on its radio bursts.

[[demo]] Switch on the burden voltage, and probe the load.

[[reveal]] The meter says 48.2 mA. A perfectly sensible number. But its shunt is now taking 0.12 V of the
3.3 V, so the load runs on 3.18 V and draws 3.6 % less than it did before you measured it.

A resistor just draws less. A microcontroller is worse: below its brown-out threshold, often somewhere
around 2.7 V (check yours), it resets. Every radio burst pulls more current, the burden grows, the rail
sags, and the board reboots: 300 mA through the same 2.5 Ω takes 0.75 V, and leaves the board 2.55 V. Take
the meter out and the fault disappears.

Turn the shunt down to 0.1 Ω, as in a bench meter, and the load loses only 5 mV. The same reading on the
display; a different circuit underneath. Before you trust an ammeter, ask what its burden voltage took
from the circuit.

[[transition]] A good shunt gives a small signal — tens of millivolts — and on the high side, that small
signal sits on top of a large voltage. Neither of those is anything an ADC can use directly. The signal
has to be prepared first: conditioning.
```
