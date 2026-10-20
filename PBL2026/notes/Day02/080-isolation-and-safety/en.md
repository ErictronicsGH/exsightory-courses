---
targetMinutes: 35
motivates: The quantity we want is on the mains — how do we get a measurement out of it without bringing the mains, or its dangers, along with it?
objectives:
  - Explain that what injures is the current path through the body, not voltage alone, and choose a meter by its CAT rating, not just its voltage.
  - Explain galvanic isolation as information crossing while the electrical path does not, tell it apart from buffering, and say where it belongs in a measurement system.
  - Predict where a component driven past its rated dissipation will fail.
concepts: [isolation]
---

# Isolation and electrical safety

<!-- PATH: [ QUANTITY → **SENSOR at the mains** → … ]  — getting at the AC quantity safely.
     TOOL: Discussion-led — say so to the room. Electronics (centrepiece: `overpower`, existing) · Equation
           (body current = voltage / path resistance) · Draw (optocoupler across a barrier; the AC meter's
           chain with three barrier positions) · Figure (CAT locations, meter labels, the transient table).
     SOURCES: transcripts/Chapter 03 - Signal conditioning.md "Isolation"; AC_Metering_System_Simulation_Project.md
              §9 (isolation as a conceptual system boundary); training-overview.md Day 3 Module 4. -->

## What actually injures?

What injures is the current path through the body, not voltage alone.

<!-- PLAN
SHOW     Equation — body current = V / R_path, with V and R_path on dials, and a Figure beside it of two paths
         through the body (hand to hand, hand to foot). Worked examples, stated as illustrative: 12 V across
         roughly 100 kΩ of dry skin → 0.12 mA; 230 V across roughly 1 kΩ, wet hands and good contact →
         230 mA. Drive: same voltage, R_path from dry to wet; same R_path, voltage from 12 V to 230 V.
         Look for: the current, not the voltage, being the thing that changes by a factor of a thousand.
         Status: ready (Equation) · needs asset: body-path Figure (ours to draw); any physiological threshold
                 shown on the wall to be taken from IEC 60479-1 and cited, never from memory
ASK      poll (before the statement) — "Which is dangerous: high voltage, or high current?"
         options: High voltage | High current | Both | Neither on its own
         explain: The room argues it first; the Equation then shows that voltage only decides how hard a path
         is pushed, and the path's resistance decides the current.
         depth: understand    practice: arguing from evidence
ANALOGY  A car battery: twelve volts that can push a few hundred amps into a starter motor and almost nothing
         through dry hands, because the hands are a high-resistance path. It breaks the moment the path
         changes: a ring or a spanner across the terminals is a low-resistance path, and the same battery
         burns.
-->

<!-- FILLED 2026-10-07: drafted from training-overview Day 3 Module 4; standard electrical-safety practice (body-resistance figures illustrative only); tutor to review -->

```flow
I want to say one thing before we start. Every module in this course has a simulation behind it,
except this one. Electrical safety cannot honestly be simulated, and I am not going to pretend
otherwise. This module is a discussion. It is in the course because leaving it out of a measurement
course would be worse than teaching it without a demo.

[[ask]] So let us start with a question you have probably answered before without thinking. Which is
dangerous: high voltage, or high current?

[[pause]]

Here is the honest answer: it is the **current**, and the path it takes through the body. Voltage
matters because it is what pushes current along that path.

[[demo]] Look at the equation: the current is the voltage divided by the resistance of the path. Keep
the voltage and change the path, from dry skin to wet hands with a good contact, and the current
changes by something like a hundred times. The body's resistance varies enormously, so treat these
numbers as illustrations, never as safe limits.

Twelve volts across roughly 100 kΩ of dry skin is about a tenth of a milliamp; you would not feel it.
230 V across roughly 1 kΩ with wet hands is around 230 mA. Currents of only a few tens of milliamps
across the chest can upset the heart's rhythm.

A car battery shows it well. Twelve volts that can push hundreds of amps into a starter motor, and
almost nothing through dry hands. Put a ring or a spanner across its terminals, a low-resistance path,
and the same battery burns.

So the question is never only "how many volts?" It is: **what path can current take, and through
what?**
```

***

## Isolation: information crosses, the path does not

Isolation lets the information pass while preventing an unwanted direct electrical connection. An
optocoupler, for example, carries a digital signal across as light.

<!-- PLAN
SHOW     Draw — an optocoupler across an isolation barrier: the input circuit and its LED on the left with
         its own ground symbol, a dashed gap with light crossing it, the phototransistor and its pull-up on the
         right with a different ground symbol; a pulse stepped across as light. Drive: left circuit → barrier
         → light → right circuit → the two ground symbols highlighted. Look for: no wire crosses the dashed
         line; the output side is an open-collector with a pull-up, the 010 card again.
         Status: needs Draw: optocoupler across a barrier · on-circuit version needs Electronics: optocoupler
                 part (LED, phototransistor, CTR) and two separate reference nets on one sheet
SEED     plants S57 — "Look at the two ground symbols. Across an isolation barrier they no longer have to be the
         same ground. Hold that thought; it comes back at the end of today."
-->

```flow
Isolation allows information to pass while preventing an unwanted direct electrical connection.

Let's say we have a sensor that is measuring something in a circuit operating at a relatively high
voltage. We want to send the sensor's signal to a microcontroller, but we do not want the
high-voltage circuit to have a direct electrical connection to the microcontroller.

In such a situation, we can use **isolation**. The information from the sensor can still be
transferred to the microcontroller, but the electrical connection between the two circuits is
broken.

For example, an **optocoupler** can transfer a digital signal using light. The input side converts
the electrical signal into light, and the output side detects the light and recreates the signal. In
this way, information crosses from one circuit to another without requiring a direct electrical
connection between them.

Isolation is particularly useful when we want to **protect one circuit from dangerous voltages,
electrical faults, ground differences or unwanted currents** coming from another circuit.
```

***

## Isolation is not buffering

Buffering keeps the electrical connection while preventing the source from being loaded. Isolation
lets the information cross while deliberately preventing the direct electrical path itself.

<!-- PLAN
ASK      flash (after the statement, four short rounds) — "Buffer, or isolator?"
         options: Buffer | Isolator
         answer: (1) a 100 kΩ sensor that cannot charge the ADC's sampling capacitor in time → buffer;
         (2) a shunt in the live conductor of a 230 V supply, read by an MCU → isolator; (3) a thermocouple
         welded to a heater element at mains potential → isolator; (4) a high-impedance divider into a meter
         on the same ground → buffer
         explain: A buffer answers a loading problem on a shared ground; an isolator answers a problem with
         the connection itself: a dangerous potential, a fault path, or a ground difference.
         depth: use    practice: constructing explanations
-->

```flow
On Day 1 (040) we met the buffer: a stage that lets one circuit drive another without significantly
disturbing the source.

So, unlike buffering, where we maintain an electrical connection while preventing the source from
being significantly loaded, isolation allows the information to cross while **deliberately preventing
the direct electrical path itself**.

[[ask]] I will read out a few situations. For each one, tell me: buffer, or isolator?

[[pause]]
```

***

## Where galvanic isolation belongs

Galvanic isolation is a boundary in the measurement system, and where it is placed is a design
decision.

<!-- PLAN
SHOW     Draw — the capstone meter's blocks, sensor → signal conditioning → ADC → digital interface →
         processing, with a dashed barrier drawn in turn at three places: at the sensor (a current or voltage
         transformer isolates), between conditioning and ADC (an isolation amplifier), between ADC and
         interface (a digital isolator, ADC powered on the mains side). Drive: after the poll, draw each
         barrier and shade what must then be powered on the mains side. Look for: the barrier moving, and the
         mains side growing or shrinking with it.
         Status: needs Draw: AC-meter chain with three barrier positions
ASK      poll (after the statement) — "Where would you draw the isolation boundary?"
         options: At the sensor | Between conditioning and the ADC | Between the ADC and the digital
         interface | After processing
         explain: The first three are all used in real meters: moving the barrier toward the processor puts
         more of the chain, and a power supply for it, on the mains side, while moving it toward the sensor
         asks the barrier to carry an analog signal accurately.
         depth: create    practice: designing solutions
FAULT    The barrier drawn after processing: the MCU sits on the mains side and the laptop on its USB
         debugger is bonded to it.
-->

<!-- FILLED 2026-10-07: drafted from training-overview Day 3 Module 4; AC_Metering_System_Simulation_Project §9; tutor to review -->

```flow
Here is the chain of the AC meter you will build tomorrow in the capstone: sensor, signal
conditioning, ADC, digital interface, processing. The project brief lists isolation among the
conditioning stages as "a conceptual system boundary".

[[ask]] Where would you draw that boundary — and why there, and not one block earlier or later?

[[pause]]

There is no single answer, and real meters use three of these.

[[demo]] Put the barrier at the sensor, and the sensor does the isolating: a current transformer, or
a voltage transformer. Put it between conditioning and the ADC, and you need an isolation amplifier
that carries an analog signal across accurately. Put it between the ADC and the digital interface, and
a digital isolator carries the bits, but the converter and its conditioning now live on the mains side
and need power there.

Move the barrier toward the processor, and more of the chain, with a power supply for it, sits at
mains potential. Move it toward the sensor, and the barrier has to carry an analog signal without
spoiling it.

What does not work is drawing it after processing. Then the microcontroller is on the mains side, and
so is the laptop you plug into its debugger.

Whichever you choose, the reasons are the ones we listed: dangerous voltages, faults, ground
differences, unwanted currents. The barrier is where they stop.
```

***

## Two meters at the distribution panel

The voltage printed on a meter is not the whole of its rating. A CAT II 1000 V meter is more dangerous
at a distribution panel than a CAT III 600 V one.

<!-- PLAN
SHOW     Figure — an installation drawn as CAT IV (origin of supply, service entrance), CAT III (distribution
         panel, fixed wiring), CAT II (loads plugged into socket outlets); two real meter labels photographed
         (CAT II 1000 V, CAT III 600 V); then the transient-withstand table as commonly tabulated from
         IEC 61010-1 (CAT II 1000 V and CAT III 600 V both 6 kV peak; test source 12 Ω and 2 Ω). Drive: tour
         IV → III → II, then the labels, then the table row. Look for: the same 6 kV on both lines, and the
         source impedance that differs.
         Status: needs asset: CAT locations Figure (ours to draw), two meter-label photos, the transient table
                 — every value confirmed against the current IEC 61010-1 or the meter makers' published
                 tables before the build
ASK      poe (before the statement) — "At a distribution panel: a CAT II 1000 V meter, or a CAT III 600 V
         meter. Which do you use?"
         options: CAT II 1000 V | CAT III 600 V | Either: both are well above 230 V | Neither
         answer: CAT III 600 V
         reveal: the panel lit as CAT III; the table row
         explain: The category says where on the installation a meter may be used, and at a distribution panel
         transients arrive from a much lower source impedance, so the same impulse drives far more current
         into the meter.
         depth: understand    practice: arguing from evidence
ASK      numeric (after the reveal) — "A 6 kV transient from a 12 Ω source, and the same from a 2 Ω source.
         What peak current does the 2 Ω source deliver into a short, in amps?"
         answer: 3000 A ± 50 A
         explain: 6000 / 2 = 3000 A against 6000 / 12 = 500 A: six times the current, from the same voltage.
         depth: use    practice: computational thinking
HARVEST  S14 — "High in, low out, from Day 1: every source has an output impedance. Here it decides whether a
         transient is a click or an explosion in your hand."
HARVEST  S56 — "The peak, not the RMS, is what the insulation must survive, we said. A transient is a peak that
         was never in the waveform, and the category tells you how hard it can push."
-->

<!-- FILLED 2026-10-07: drafted from training-overview Day 3 Module 4; IEC 61010-1 measurement categories and transient test values as commonly tabulated (to be confirmed against the current standard before delivery); tutor to review -->

```flow
[[ask]] You have to take a measurement at a distribution panel. In one hand, a meter rated CAT II
1000 V. In the other, a meter rated CAT III 600 V. Which one do you use?

[[pause]]

[[reveal]] The CAT III 600 V meter, even though its voltage is lower.

The voltage on the label is only half of the rating. The **category** says where on an installation
the meter may be used. CAT IV is the origin of the supply: the service entrance and the utility meter.
CAT III is the distribution panel and the fixed wiring. CAT II is equipment plugged into a socket.

What differs between the categories is the energy a transient, a lightning surge or a large load
switching, can deliver at that point. Close to the origin, transients come from a source with very low
impedance.

[[demo]] Look at the transient test as it is commonly tabulated from IEC 61010-1. A CAT II 1000 V
meter and a CAT III 600 V meter are both tested with a 6 kV impulse. But the CAT II test comes through
12 Ω, and the CAT III test through 2 Ω. Six thousand volts through 12 Ω is 500 A; through 2 Ω it is
3,000 A. Six times the current, from the same voltage.

Every source has an output impedance: Day 1 again. Here it decides whether a transient is a click or
an arc in your hand. Choose a meter rated for the category of the place you are measuring, and check
the current standard and your meter's own manual, not a slide.
```

***

## Past the rating

A component driven past its rated dissipation fails at exactly the point the maths predicted.

<!-- PLAN
SHOW (centrepiece) Electronics — `overpower` (existing): V1 across R1 (470 Ω) in series with R2 (2.2 kΩ),
         and R3 (10 kΩ) across V1; all 0805 thick film, 62.5 mW absolute maximum, failing open after 3 s over
         it. Drive: Power and IR overlays on, clock running; V1 at 10 V (R2 at 31 mW, about half) → 12 V →
         14 V (R2 at 60 mW, heading for 150 °C) → 15 V and hold: R2 latches open after 3 s.
         Look for: R2 failing just above 14.2 V, where the numeric said, while R3, which looks most exposed
         across the whole rail, sits at a third of its rating.
         Status: ready (existing fixture; V1, R1, R2 editable)
ASK      circuit + predict (before the clock runs) — "As V1 rises, which part fails first?"
         options: R1 | R2 | R3 | None before 30 V
         answer: R2
         reveal: `overpower`'s damage latch on R2
         explain: In series the same current flows through both, so the larger resistor takes the larger
         share of the power (2.2 / 2.67, about 82 %), while R3 alone across the rail would need 25 V to
         reach its rating.
         depth: understand    practice: developing models
ASK      numeric (before the clock runs) — "R2 is rated 62.5 mW. At what supply voltage does it reach its
         rating?"
         answer: 14.2 V ± 0.3 V
         reveal: V1 stepped past 14.2 V, R2's power reading crossing 62.5 mW
         explain: I = √(62.5 mW / 2.2 kΩ) ≈ 5.33 mA, and the series pair needs 5.33 mA × 2.67 kΩ ≈ 14.2 V,
         at which R3 dissipates only about 20 mW.
         depth: use    practice: computational thinking
FAULT    A part run between its recommended (37.5 mW, reached at 11.0 V) and its absolute rating: it survives
         the demo at 14 V near 150 °C, and fails in the field on a hot day.
-->

<!-- FILLED 2026-10-07: drafted from training-overview Day 3 Module 4; Electronics Bench `overpower` fixture values; tutor to review -->

```flow
There is one thing in this module that we *can* show, and it is a good one to end on.

[[demo]] Overload widget — a component, its rated dissipation, and a source we can turn up.

On the bench: a 470 Ω resistor and a 2.2 kΩ resistor in series across the supply, and a 10 kΩ
resistor straight across it. All three are small surface-mount parts rated for 62.5 mW, and each fails
open if it is held over that for a few seconds.

[[ask]] First: as we turn the supply up, which of the three do you expect to fail first?

[[pause]]

[[ask]] Work out the dissipation at which this part goes past its rating. Now predict: at what
setting does it fail?

[[pause]]

The same current flows through the two in series, so the larger one takes the larger share of the
power, about 82 % of it. The 2.2 kΩ reaches 62.5 mW at 5.33 mA, and that takes about 14.2 V across
the pair. The 10 kΩ, which looks the most exposed sitting across the whole rail, would need 25 V.

[[demo]] Clock running, heat view on. At 10 V the 2.2 kΩ is at about half its rating. At 14 V it is
near 60 mW and close to 150 °C. Now 15 V, and hold.

[[reveal]] It fails open a few seconds past the line the maths drew. Not at random, and not where it
looked most exposed: where the numbers said.

[[transition]] Isolation breaks the electrical path on purpose. Everything that stays connected
still has a path, and every path has a return. We have been drawing the end of that return as a
little symbol called "ground", as if it were nothing at all. Next, we find out what it really is.
```
