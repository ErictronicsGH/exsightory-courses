---
targetMinutes: 45
motivates: The sensor's voltage is right until you connect the thing that measures it.
objectives:
  - Explain what impedance means physically, and why instruments want high input impedance and sources low output impedance.
  - Predict how much a load pulls down a source of known output impedance.
  - Design a divider that brings a signal into an ADC's range without loading it.
concepts: [source-impedance, loading, voltage-divider]
---

# The sensor as a source: impedance, dividers and loading

<!-- PATH: quantity → sensor → [ SOURCE & LOADING ] → conditioning → ADC → firmware → number
     TOOL: Electronics (centrepiece: divider-loading with a predict, input_loading revealed, the 10 MΩ ↔
           10 GΩ meter swap — Demo #1; a source behind its own impedance, light and heavy loads; one ratio
           built ×10 and ÷10; ideal: a voltage follower) · Equation (the loaded divider graphed against
           source impedance — replaces the Demo #1/#1b widget sweep) · Draw (the thermistor divider
           redrawn as a source behind its output impedance).
     SOURCES: transcripts/Chapter 05 - Interfaces.md §4–5; Chapter 07 - Analog to digital converters.md
              (opening: loading and buffering); Chapter 03 - Signal conditioning.md (Attenuation,
              Buffering); Chapter 15 - measurement_errors.md (instrument insertion error; rubric
              procedure); training-overview.md Day 1 Module 3. -->

## Connecting anything makes an interface

An interface is where two parts of a system meet, and the means by which information, energy or
signals cross between them. The question it asks is: what does each side expect?

<!-- PLAN
SHOW     Draw — the path drawing focused on the boundary after SENSOR, labelled "interface: what does each
         side expect?".
         Status: needs Draw (a focus on the path drawing).
-->

```flow
The conversion from a physical quantity such as temperature into an equivalent signal, such as a
resistance, happens across a boundary — an interaction. We call that boundary an **interface**.

Think of your computer. It lives in its own world, but through the keyboard and mouse you interact with
it, and it answers you through its display and speakers. That is why we call an application's front end
a *user interface*.

An **interface** is the boundary through which two systems, components or domains interact. A simple
engineering definition:

*An interface is the point at which two parts of a system meet, and the means by which information,
energy or signals are transferred between them.*

Examples include sensor ↔ signal conditioner, signal conditioner ↔ ADC, ADC ↔ microcontroller,
microcontroller ↔ display, sensor ↔ industrial controller, controller ↔ CAN bus, embedded system ↔
Ethernet network.

An interface is not necessarily a physical connector. It can consist of wires, connectors, amplifiers,
filters, buffers, level shifters, isolation circuits, ADCs, DACs, communication protocols, timing
signals, software drivers and data formats.

So when an engineer asks, "What is the interface between these two devices?", the real question is:
*how does information get from one side to the other, and what does each side expect?*
```

***

## Two voltages are not automatically compatible

A 0–100 mV sensor and a 0–3.3 V ADC both deal in volts. The sensor may still be too small, too
high in impedance, or too noisy for the ADC to use.

<!-- PLAN
SHOW     none.
ASK      multi-select (at the Flow's [[ask]]) — "A 0–100 mV sensor straight into a 0–3.3 V ADC. Both deal in
         volts. Which of these could stop it working well?"
         options: it uses about 3 % of the ADC's range | its output impedance may be too high for the ADC's
                  input | it may carry noise that should be filtered first | the ADC cannot convert anything
                  below 1 V
         answer: the first three
         explain: 100 mV is 3 % of 3.3 V, about 124 of 4,096 codes at 12 bits; impedance and noise are what
                  the rest of the path has to manage, while a small voltage converts fine, just into few codes.
         depth: understand    practice: defining problems
-->

```flow
Consider a sensor that produces 0–100 mV, and an ADC whose useful input range is 0–3.3 V.

[[ask]] Both devices deal in voltage. Why can't we simply connect them?

[[pause]]

They are not necessarily compatible. The sensor's output may be too small to use the ADC's range
effectively. The sensor may have an output impedance that is unsuitable for the ADC. Its signal may
contain noise that should be filtered before conversion.

The interface may therefore need amplification, filtering, buffering, protection, impedance management
or level shifting.

This illustrates a basic engineering principle: *an interface makes two systems able to work
together*, and it must satisfy the requirements of both sides. This module is about the requirement
that bites first: impedance.
```

***

## What impedance means

Impedance is the effective opposition a circuit presents to a changing signal. It can involve
resistance, inductance and capacitance.

<!-- PLAN
SHOW     Electronics — a 10 V supply behind a 1 kΩ resistor standing in for a source's own impedance, driving a
         load R_L; then the bench supply's own output_resistance reveal ("the resistor inside the supply").
         Drive: R_L = 100 kΩ (light), then 100 Ω (heavy); then reveal the bench supply's 50 mΩ.
         Look for: 9.90 V under the light load, 0.91 V under the heavy one, and the current overlay showing
         where the rest went: into the source's own resistance.
         Status: ready (edit R_L's value) · needs Electronics: resistor value dial, for a live sweep.
-->

<!-- FILLED 2026-10-07: drafted from training-overview Day 1 Module 3 and standard circuit theory; tutor to review -->

```flow
**Impedance** is the effective opposition a circuit presents to a changing electrical signal. It can
involve resistance, inductance and capacitance.

[[demo]] Electronics Bench: the same source, driving a light load and then a heavy one.

On the bench: a 10 V source with a 1 kΩ resistor in series, standing in for the source's own
impedance. Watch the voltage across the load as I change it.

With a 100 kΩ load, the load gets 9.90 V. Almost everything arrives.

Now a 100 Ω load. The load gets 0.91 V. The source has not changed at all. The rest of its voltage is
dropped across its own 1 kΩ, because the load now draws about ninety times more current.

That is what impedance means physically: how much current a circuit takes for the voltage across it,
and so how much a source's voltage gives way when something draws on it. A high impedance takes little
current. A low impedance takes a lot, and makes its source work for it.

[[demo]] Even the bench supply has one. Switch on its output resistance: about 50 mΩ, hidden behind the
regulator. Nothing you would notice at 10 mA; half a volt at 10 A.

Every source has an impedance, and so does every load. The rest of this module is what happens when
they meet.
```

***

## Every source has an output impedance

A sensor and its excitation behave like an ideal source behind an output impedance. Whatever you
connect becomes the bottom half of a divider with it.

<!-- PLAN
SHOW     Draw — the 10 k NTC and its 10 kΩ excitation resistor from 030, redrawn step by step: the supply and
         the two resistors → a Thévenin source, 1.65 V behind 5 kΩ at 25 °C → a load hung beneath it, visibly
         the bottom half of a new divider.
         Look for: the thermistor circuit turning into "a voltage behind a resistance".
         Status: needs Draw: Thévenin redraw of the thermistor divider.
ASK      numeric (before the drawing's last step) — "At 25 °C, what output impedance does the 10 k thermistor
         with its 10 kΩ resistor present?"
         answer: 5 kΩ ± 0.1 kΩ
         reveal: the drawing's last step.
         explain: Looking back into the midpoint, the supply is a short for changes, so the two 10 kΩ
                  resistors appear in parallel: 5 kΩ.
         depth: understand    practice: developing models
SEED     plants S35 — "Write down five kilohms. Later today we hold it up against the ADC's input and see
         whether it is small enough."
-->

<!-- FILLED 2026-10-07: drafted from training-overview Day 1 Module 3 and standard circuit theory (Thévenin); tutor to review -->

```flow
Every signal source has an **output impedance**. The ADC input also has its own input
characteristics, including its input impedance.

Take the thermistor circuit from the sensing module: a 10 k NTC under a 10 kΩ resistor, on 3.3 V. At
25 °C the midpoint sits at 1.65 V.

[[demo]] Let me redraw it. Whatever we connect to that midpoint sees two things: a voltage, and a
resistance looking back into the circuit. Thévenin's theorem says a network like this behaves exactly
like one ideal voltage source behind one resistance.

[[ask]] At 25 °C, what output impedance does the thermistor with its 10 kΩ resistor present?

[[pause]]

[[reveal]] Looking back into the midpoint, the supply is a short circuit for any change, so the two
10 kΩ resistors appear in parallel: 5 kΩ. The thermistor circuit is a 1.65 V source behind 5 kΩ. As the
temperature changes, the thermistor changes, and so does that 5 kΩ.

Now hang a load beneath it. The load and that 5 kΩ make a new divider, and the load is its bottom half.
Whatever you connect becomes part of the measurement.

Write down five kilohms. Later today we hold it up against the ADC's input and see whether it is small
enough.
```

***

## Loading: the measurement changes the measurand

If connecting the input changes the source's voltage, you are no longer measuring the original
signal. You are measuring the circuit you created by connecting to it.

<!-- PLAN
SHOW (centrepiece) Electronics — divider-loading (Demo #1): 10 V across R1 and R2, 1 MΩ each; probe VP1 on MID;
         the handheld M1 (budget DMM, 10 MΩ).
         Drive: take the ASK → reveal input_loading on M1 → swap M1's profile to dmm-bench (10 GΩ) → swap it
         back.
         Look for: 4.76 V on the handheld, 4.9998 V on the bench meter, with nothing in the circuit changed
         but the instrument.
         Status: ready (the fixture's own predict and reveal).
ASK      circuit + predict (before the reveal) — "The divider is two equal resistors on ten volts. What does
         the handheld read across the lower one?"
         options: five volts — the divider is symmetrical | a little under five volts | a little over five
                  volts | ten volts
         answer: a little under five volts
         reveal: input_loading on M1, then the profile swap.
         explain: The 10 MΩ meter sits in parallel with R2, so the lower leg becomes 909 kΩ and the node
                  falls to 4.76 V; the 10 GΩ bench meter moves it by 0.005 %.
         depth: understand    practice: arguing from evidence
HARVEST  S6 — "Insertion error, from earlier today: we measured, and the measuring moved the thing measured."
HARVEST  S8 — "And here is the energy transfer I promised: to read the node, the meter takes current from it."
HARVEST  S36 — "The handheld reported its own terminals faithfully. It was the node that moved — inside the
         meter's band, and outside the truth."
FAULT    A 10 MΩ handheld used to "check" a high-impedance node reads low, and the ADC gets the blame.
-->

```flow
[[ask]] Two equal 1 MΩ resistors divide 10 V. A 10 MΩ handheld meter is connected across the lower
one. What does it read?

[[pause]]

[[reveal]]

A fundamental rule of engineering and scientific measurement is that the measurement process should not
significantly alter the phenomenon being measured. Otherwise the measurand is actually the altered
situation, not the original one we were interested in.

Voltmeters, for instance, put some resistance into the circuit being measured. A voltmeter with a low
input impedance of its own can change the resistance ratios in a circuit and give a false reading. This
problem is common when cheap instruments are used. This is **instrument insertion error**.

The same thing happens at the ADC. If the interaction between the source and the ADC input changes the
signal voltage significantly, the ADC will not be converting the signal we intended to measure. It will
be converting a signal that has already been altered by the interface. This is **loading**.
```

***

## High in, low out

Instruments want a high input impedance and sources want a low output impedance. Then the load
draws little, and the source barely notices it.

<!-- PLAN
SHOW     Equation — V_read = V_s·R_in/(R_in + R_s), graphed against R_s from 100 Ω to 10 MΩ as a family for
         R_in = 100 kΩ, 1 MΩ, 10 MΩ and 10 GΩ. Replaces the Demo #1 widget sweep.
         Drive: slide R_s up with R_in = 10 MΩ; then step through the family.
         Look for: the knee where R_s reaches about a hundredth of R_in — a 1 % error.
         Status: ready.
SEED     plants S14 — "High in, low out: the impedances decide who disturbs whom. Tomorrow you'll hear this
         again, in ones and zeros."
-->

```flow
No measuring device has zero effect on the system being measured, but the error can be made very small
by choosing methods and devices well, and by good design and practice.

The rule: use an instrument that disturbs the thing being measured as little as possible. For a
voltmeter, that means an input impedance very high compared with the circuit's resistances. Put the
other way round, a source wants a low output impedance, so that whatever it drives barely changes its
voltage.

[[demo]] Widget (#1 ADC input loading): sweep the source impedance and watch the reading fall away from
the true value at a fixed input impedance.
```

***

## Attenuation: making a large signal smaller

A signal too large for the next stage is scaled down by a known factor, and the firmware multiplies
that factor back in later.

<!-- PLAN
SHOW     Equation — V_out = V_in·R2/(R1 + R2), rearranged to what the firmware does: V_in = V_out·(R1 + R2)/R2.
         Worked example: 10 V → 2 V with a ratio of 0.2.
         Status: ready. (The next card builds it as a circuit.)
-->

```flow
**Attenuation** makes a large signal smaller — the opposite of amplification. We need it when the
incoming signal's amplitude is higher than the next stage requires, for example **10 V → 2 V**.

Just as with amplification, we scale the signal down by a known factor that puts it in the required
range. Then, once the signal reaches the microcontroller, the firmware undoes every transformation that
was made — in this case, it multiplies by the attenuation factor.
```

***

## A divider that does not lie to the ADC

The divider sets the ratio. Its resistance values decide how much the next stage loads it. Choose
both.

<!-- PLAN
ASK      numeric (at the Flow's [[ask]]) — "What is the largest ratio R2/(R1 + R2) that keeps 12 V inside a
         3.3 V input?"
         answer: 0.275 ± 0.005
         explain: 3.3 ÷ 12 is 0.275; a real design takes a little less for margin — 27 k over 10 k gives 0.270,
                  3.24 V at 12 V.
         depth: use    practice: computational thinking
ASK      checkpoint (straight after) — "Design it": 1 pick R1 and R2 for your ratio · 2 compute what the next
         stage sees, R1 ∥ R2 · 3 compute the current it takes from the 12 V source · 4 say whether you would
         build it, and why.
         depth: create    practice: designing solutions
SHOW     Electronics — three dividers of the same ratio on 12 V: 2.7 k/1 k, 27 k/10 k and 270 k/100 k, each with
         a budget DMM standing in for the ADC input; then (ideal) the same three into an ADC-input block with
         a 1 µs window.
         Drive: probe each under the meters; then swap the meters for the ADC block.
         Look for: under the meters all three look fine (0.007 %, 0.07 % and 0.7 % low); under the ADC block
         the 270 k version reads about a quarter low, while the 2.7 k version burns 3.2 mA standing.
         Status: ready with the meters · needs Electronics: ADC-input block (switch R_on 1 kΩ, C_s 10 pF,
                 window) for the second beat.
SEED     plants S32 — "Notice that the meter called the 270 k divider fine. Keep that. Later today we find out
         exactly why the ADC disagrees."
FAULT    Divider values raised ×10 "to save battery": the lab's source-impedance fault.
-->

<!-- FILLED 2026-10-07: drafted from training-overview Day 1 Module 3 and standard divider-design practice; tutor to review -->

```flow
[[ask]] Design a divider that brings 0–12 V into a 0–3.3 V ADC. Now, what does the ADC's input do to
your divider?

[[pause]]

[[demo]] Electronics Bench: the same ratio with high and low resistor values, under the same load.

Start with the ratio. 3.3 divided by 12 is 0.275, so R2 / (R1 + R2) can be at most 0.275. Leave some
margin: 27 kΩ over 10 kΩ gives 0.270, and 12 V becomes 3.24 V.

But the ratio only fixes the range. The same ratio can be built from 2.7 kΩ and 1 kΩ, or from 270 kΩ and
100 kΩ. What changes is the divider's output impedance, R1 in parallel with R2: about 730 Ω, 7.3 kΩ or
73 kΩ.

On the bench: three dividers with the same ratio on 12 V, each with a handheld meter standing in for the
ADC input. Watch the three readings.

Under a 10 MΩ meter all three look fine: 0.007 %, 0.07 % and 0.7 % low. By the meter, you could build any
of them.

[[demo]] Now the same three into an ADC input with a 1 µs acquisition window, straight after it has
read a grounded channel.

[[reveal]] The 270 k divider now reads about a quarter low. The 2.7 k divider reads perfectly, and to do
it, it takes 3.2 mA from your 12 V source all day long.

So you choose both: the ratio for the range, and the values for the trade between the current the
divider wastes and how hard the next stage loads it. Notice that the meter called the 270 k divider
fine. Keep that. Later today we find out exactly why the ADC disagrees.
```

***

## Buffering: drive without disturbing

A buffer presents a light load to the source and drives the next stage itself. It keeps the voltage
and supplies the current the source cannot.

<!-- PLAN
SHOW     Electronics — the loaded divider from the loading card (1 M/1 M on 10 V, the 10 MΩ handheld), then a
         voltage follower inserted between MID and the meter.
         Drive: read the loaded 4.76 V; insert the follower; current overlay on.
         Look for: 5.00 V back on the meter, and the divider's own current no longer disturbed by the load —
         the follower's output now supplies the meter.
         Status: needs Electronics: op-amp (voltage follower, with output swing, input bias current and supply
                 rails).
SEED     plants S13 — "A buffer keeps the voltage and supplies the current. Remember both halves: later today a
         very small capacitor is going to need exactly that."
FAULT    A follower on a 3.3 V single supply that is not rail-to-rail: the reading tops out short of the rail
         and looks like a limit of the sensor.
-->

```flow
**Buffering** lets one circuit drive another without significantly disturbing the source.

Say you have a voltage signal from a microphone, with an amplitude of 2 V, and you want to use it to
drive a red LED as a visual signal. A red LED needs about 2 V, but it also takes up to 20 mA, and
something like 5 mA to turn on. The microphone may give you 2 V, but it may not be able to supply that
much current.

So we feed the microphone's output into a buffer, and let the buffer's output drive the LED. In
principle, the buffer keeps the same voltage but supplies the current the LED needs — something that
would not have been possible had we connected the sensor output directly to the LED.

This is one reason buffering is often used in front of an ADC. A buffer presents a suitable load to the
signal source, while its output drives the ADC input without significantly disturbing the original
signal.

[[demo]] Electronics Bench: the loaded divider, then the same divider through a voltage follower.

[[transition]] So far the sensor has handed us a voltage. But many of the quantities we care about are
currents, and to measure a current we have to put something *in* its path — which makes loading
impossible to avoid. How we choose to lose is the next module.
```
