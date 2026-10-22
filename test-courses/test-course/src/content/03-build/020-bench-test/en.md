---
targetMinutes: 30
objectives:
  - Bring a new supply up in an order that protects it.
  - Read the ripple on a scope, under load.
---

# Bringing it up, without letting the smoke out

First power-on is the moment to be slow and deliberate. Everything in this
subsection assumes the supply is on the bench, unloaded, and not yet trusted.

## Nothing valuable on the bench

```canvas
kind: image
src: test-setup.png
alt: A test bench layout with the supply under test, a dummy load, a meter across the output and a scope probe on the ripple
caption: The bring-up bench. Dummy load, meter, scope - and nothing valuable connected.
```

## The order that matters

1. **Continuity, unpowered.** No short from output to ground.
2. **Raw DC only.** Regulator out; capacitor reaches the predicted peak.
3. **Regulator in, no load.** Output holds; pass transistor stays cool.
4. **Dummy load, slowly.** Raise the current, watching the heatsink.
5. **Limit test, deliberately.** Short through an ammeter.

## A pre-flight check, not a test flight

```analogy
Bringing up a power supply is a pre-flight check, not a test flight. Each item
is checked in order, because each step assumes the previous one passed.

Skipping to step four is how a bench supply becomes a fuse tester.
```

## Size the dummy load before you build it

```canvas
kind: widget
src: shared/widgets/ohms-law/index.html
caption: Work out your dummy load resistance and its wattage before you build it.
```

Then build it on the breadboard before you trust it with the supply.

## The same load, built on a breadboard

```bench
title: Build the dummy load on a breadboard
package: "@exsight/bench-breadboard@0.1.3"
alt: A breadboard with the bench supply, a power resistor across its rails, and two leads to the meter.
caption: The same load you just sized, built and powered.
```

## Reading the ripple

With a scope on the output at full load, look for two things. Low-frequency
[ripple](glossary:ripple) at twice the mains frequency is the smoothing
capacitor talking. High-frequency noise on top is the regulator's loop, or your
probe grounding, and the two are easily confused.

## Is that noise, or your ground lead

```poe
prompt: You see 200 mV of noise on the output. Moving the scope probe's ground clip closer to the output terminals drops it to 20 mV. What were you measuring?
options:
  - Real output ripple that the shorter ground fixed
  - Mostly a measurement artefact from the ground lead
  - A faulty regulator that has now settled
correct: 1
explanation: >-
  Mostly measurement artefact. A long ground lead is a loop of wire, and a loop
  of wire near a supply that switches current in pulses will pick up a voltage
  that has nothing to do with your output. The supply did not change - only the
  measurement did. Ripple figures taken with a long ground clip are not wrong so
  much as meaningless.
```

## The meter changes the voltage it reads

```circuit
title: Why the meter changes the reading
circuit: circuits/divider-loading.benchcircuit
libraries:
  - parts/baseline/library.json
alt: A ten-volt supply across two one-megohm resistors in series, with a handheld multimeter connected across the lower one.
caption: A 10 MΩ handheld across a 1 MΩ divider. The reading is not the voltage.
# One fence carries the author's choice of analyses (M25-14), so the format
# fixture has one of the field as it has one of everything else.
analyses: [voltage, current]
# And one question (M64h-iv), which a classroom wall says in place of the title.
question: Why does the meter read less than the divider gives?
reveal:
  part: M1
  show: input_loading
predict:
  prompt: Two equal resistors divide ten volts. What does the handheld read across the lower one?
  options:
    - Five volts - the divider is symmetrical
    - Just under five volts
    - Just over five volts
    - Ten volts, because the meter is across the supply return
  correct: 1
```

## The clip decides which measurement it is

```circuit
title: Where the clip goes decides what you measured
circuit: circuits/divider-differential.benchcircuit
libraries:
  - parts/baseline/library.json
alt: A ten-volt supply across two one-megohm resistors in series. A probe touches the top node at right angles to the wire, and its reference lead runs to the junction between the two resistors rather than to the circuit reference, so the handheld reads the drop across the upper resistor.
caption: The same divider, the same meter. The clip is on the mid-node, so the reading is the top resistor's - and the sheet is where you can see that.
```

Move the reference clip and you have changed which measurement it is. With the
clip on the mid-node, the meter is across the top resistor, and its number is a
perfectly good answer to a question nobody asked.

## In the branch, or around it

```circuit
title: Two ways to read a current, and what each one costs
circuit: circuits/branch-current.benchcircuit
libraries:
  - parts/baseline/library.json
alt: A ten-volt supply driving a hundred-ohm resistor. An ammeter sits in the branch between them, and a clamp meter is closed around the same conductor further along, touching it without breaking it.
caption: Both instruments read the same branch. Only one of them is in it.
reveal:
  part: A1
  show: burden_voltage
predict:
  prompt: Raise the shunt from 10 mΩ to 10 Ω. What happens to the reading?
  options:
    - Unchanged; supply and resistor set it
    - Falls; the shunt is a tenth of the circuit
    - Rises; a bigger shunt drops more voltage
    - Falls, and the clamp agrees
  correct: 1
```

## The ammeter's shunt is in the circuit

An ammeter goes *in* the branch, so its shunt is a resistor you have added: turn
it up and the current falls.

## A clamp adds nothing, and pays in resolution

A clamp goes *around* the conductor and adds nothing: solve the bench with and
without it and every number is identical. It costs resolution: a hundred-amp
jaw reads in ten-milliamp steps, too coarse to see the ammeter's error.

## A finer jaw, and the reading appears

Fit the milliamp clamp instead of the hundred-amp one and nothing in the circuit
moves: the reading appears because the instrument changed. It is the two
multimeters' lesson again, from the side where the instrument was never in the
way.

## Moving the probe is moving the lead

A probe is not part of the circuit, so you may move it while somebody watches.
Where its tip sits is which node you are measuring: moving it is lifting a lead
from one test post to the next.

## Only the rail is honest

```circuit
title: Move the probe, and the error moves with it
circuit: circuits/probe-walk.benchcircuit
libraries:
  - parts/baseline/library.json
alt: A ten-volt supply across three one-megohm resistors in series, with a test post on each of the three upper nodes. A probe touches the top rail at right angles and runs to a handheld multimeter.
caption: Send the probe to IN, then A, then B. Ideally 10, 6.67 and 3.33 volts; the handheld says 10.00, 6.25 and 3.12, and only the rail is honest.
measure:
  probe: VP1
  question: Where will the handheld read furthest below the true voltage, in volts?
  places: [TP1, TP2, TP3]
  correct: TP2
  timerSeconds: 30
  explanation: Both lose 6.25 % to the meter, 0.42 V of 6.67 V at A, 0.21 V of 3.33 V at B. The rail loses nothing.
```

## A meter drags the node it is on

A ten-megohm meter across a megohm ladder drags whichever node it is on; on the
rail there is nothing to drag.

## One clamp, sent to three branches

```circuit
title: One jaw, three branches, three different currents
circuit: circuits/clamp-walk.benchcircuit
libraries:
  - parts/baseline/library.json
alt: A ten-volt supply through a hundred-ohm resistor into two parallel branches - a two-hundred-ohm resistor behind an ammeter, and a six-hundred-ohm resistor beside it. A clamp is closed around one of the conductors without breaking it.
caption: Forty milliamps in the feed, thirty in one branch and ten in the other. The clamp reads whichever you send it to; the ammeter reads the branch it is in and cannot be sent anywhere.
```

A clamp changes nothing when it moves, so three branches give three different
currents from one instrument. The ammeter stays where it was soldered, because
moving it means cutting the circuit open. You can move what you can touch
without cutting.

## The current that is not there

A reverse-biased diode is easy to draw as a perfect switch, and it is not one.
There is always a current: invisible beside a divider drawing five microamps,
dominant on a node a hundred times higher in impedance.

## Switched off, and still conducting

```circuit
title: A diode that is switched off, and still conducting
circuit: circuits/leakage.benchcircuit
libraries:
  - parts/baseline/library.json
alt: A ten-volt supply across two one-megohm resistors in series, with a signal diode connected backwards across the lower one - cathode to the divider's midpoint, anode to ground.
caption: The diode is backwards, in parallel with the lower resistor. Predict what it is doing, then reveal it.
reveal:
  part: D1
  show: reverse_leakage
predict:
  prompt: The diode is reverse-biased across the lower resistor. What is flowing through the diode?
  options:
    - Nothing at all - a reverse diode is an open circuit
    - A few nanoamps
    - A few microamps, like the divider beside it
    - A few milliamps
  correct: 1
```

## What a power rating is actually a statement about

Almost everyone reads a resistor's wattage as an electrical limit. It is a
thermal one: it describes the package and how it is mounted, which is why two
parts working equally hard can be sixty degrees apart.

## Same rail, four different temperatures

```circuit
title: Four resistors, one rail, four different lives
circuit: circuits/package-heat.benchcircuit
libraries:
  - parts/baseline/library.json
alt: A ten-volt rail feeding four separate resistor branches - a pair in series, two single resistors of different values, and a fifty-ohm power resistor in a TO-220 package on a heatsink.
caption: Every one of these is a resistor across the same rail. Ask which is hottest before you switch to IR view.
```

## Past its rating, the clock starts

```circuit
title: Turn it up until something gives
circuit: circuits/overpower.benchcircuit
libraries:
  - parts/baseline/library.json
alt: A bench supply across a 470 ohm resistor in series with a 2.2 kilohm resistor, with the divider output taken from the junction between them.
caption: Run the clock and take the supply up. The 2k2 is the one paying for it, and its profile says how long it has.
```

## The most a supply can give, and why you never ask for it

Every source is a voltage behind a resistance. Ours is ten volts behind fifty
milliohms: a five-ohm dummy load draws about twenty watts, under four per cent
of what this supply could theoretically produce.

## The source resistance sets the ceiling

```circuit
title: The most this supply could ever give
circuit: circuits/power-transfer.benchcircuit
libraries:
  - parts/baseline/library.json
alt: A ten-volt bench supply driving a single five-ohm twenty-five-watt aluminium-clad load resistor, with the supply's negative terminal as the circuit reference.
caption: Open it plain and the supply is ideal - no output resistance, so no maximum, and the readout says so. Switch on its output impedance and the theorem has terms.
```

Turn the supply *down* and the delivered power and the maximum both fall, in
step, because both go as the square of the open-circuit voltage. The percentage
does not move: it is a statement about the load, not the dial.

## A good supply is enormously unmatched

The peak is where the load equals the source's resistance: here, fifty
milliohms at five volts, drawing a hundred amps, thirty-three times its
absolute maximum. **A bench supply is deliberately, enormously unmatched, and
that is what makes it a good supply.**

## At maximum power, half of it is wasted

At the peak, the source burns half its power internally: efficiency at maximum
power transfer is exactly fifty per cent, always. Where we sit, a hundred times
unmatched, it is ninety-nine. Maximum power and best efficiency are different
places.

## The leads are in the measurement

A wire on a schematic has no resistance, close enough for almost everything but
a resistance thermometer. A Pt100 moves 0.385 ohms per degree, so two metres of
AWG 24, about 0.16 ohms per lead, is nearly a degree wrong.

## A wire with a length is in the answer

The bench can promote a net's leads into solved elements: the wire now has a
length, a cross-section and a resistivity, and it is in the answer. The drawing
does not change; a number replaces an assumption.

## Two wires against four on one sensor

```circuit
title: The leads are in the measurement, until you stop measuring through them
circuit: circuits/four-wire-sensing.benchcircuit
libraries:
  - parts/baseline/library.json
alt: A ten-volt supply driving a ten-kilohm resistor and a hundred-ohm platinum RTD in series through two metres of AWG 24 in each lead, with an ammeter in the loop. One multimeter is connected across the near ends of the leads and a second is connected by its own pair of sense wires to the RTD's own terminals.
caption: A milliamp through the sensor. Divide either meter's reading by it and the four-wire answer is 100 ohms; the two-wire answer is 100.33, and the third of an ohm is the copper.
reveal:
  part: WF1
  show: lead_resistance
predict:
  prompt: Lengthen each force lead to ten metres. Which readings move?
  options:
    - Both; the leads are in series with everything
    - Neither; the ten-kilohm resistor sets the current
    - The two-wire only, and it rises
    - The four-wire only; its sense leads grew too
  correct: 2
```

## One meter reads the loop, one the sensor

One meter sits at the binding posts, a two-wire measurement. The other has its
own sense leads to the sensor's terminals, draws no current, and reads the
sensor, not the loop. Lengthen the force leads and watch which moves.

## Sense leads that carry no current

The *sense* leads can be twenty metres and the reading does not move, because
nothing flows in them; the *force* leads are the measurement. Four-wire is
worth four wires, except on a ten-kilohm thermistor, where a third
of an ohm is noise.

## The wire is a component, and it has a rating too

A schematic draws a wire as a line, and a line has no properties. So *how thick
does this have to be* is usually first asked in a different program, by a
different person, weeks later.

## Ask what each net has to be

Turn **NetClass Mode** on and the analysis asks what each *net* has to be. From
the solved current, the allowed temperature rise and the layer, outer or inner,
it returns IPC-2221's minimum cross-section, and from the copper weight the
narrowest track.

## Same copper, a bigger ask

```circuit
title: The track never moved. What it has to be did.
circuit: circuits/net-sizing.benchcircuit
libraries:
  - parts/baseline/library.json
alt: A ten-volt bench supply feeding an eight-point-two ohm load through two half-millimetre PCB tracks, with a test point on the rail. Both nets are declared to the signal net class.
caption: A milliamp needs no copper and an amp needs a millimetre of it. The track is the same track in both; what changed is what is being asked of it.
reveal:
  part: TR1
  show: ir_drop
predict:
  prompt: A hundred millimetres of this track is about twenty-five milliohms. At the load's current, what does the rail lose along it?
  options:
    - Nothing worth a number - copper is a conductor
    - About thirty millivolts
    - About a tenth of a volt
    - About half a volt
  correct: 2
```

## The reading falls as the current climbs

The rail is a half-millimetre track in one-ounce copper, declared a `signal` net:
ten degrees of rise, as most boards are designed to. Turn the supply up and watch
its reading fall through 100 %, with nothing on the schematic moving.

## A missing conductor is not a pass

A net with **no conductor chosen** says what it needs, and that nothing is chosen.
It reports no pass: a pass for a missing wire is the costliest wrong number. A milliamp net says **heating does not size this
net**.

## A track is a piece of wire until the edge is fast enough

The rail above was sized by how hot it may get: the only question a DC bench can
ask of copper, and not the one a fast board is designed around.

## Declare the stack-up and the edge rates

Two more declarations make the view a high-speed one. A **stack-up** says what
the board is made of, because impedance is a fact about the space between
conductors. Parts declare their **edge rates**, `t_r`, from datasheets; none
declared, none assumed.

## Two nets, two different questions

```circuit
title: A track is a piece of wire until the edge is fast enough.
circuit: circuits/controlled-impedance.benchcircuit
libraries:
  - parts/baseline/library.json
alt: A ten-volt supply feeding a twenty-two ohm drain resistor and an N-channel MOSFET switch through two half-millimetre tracks. The rail is a fifty-ohm controlled net and the drain net is a fast signal with no impedance target.
caption: Two nets, two questions, one reading each. The rail is asked what it is against what it was asked to be; the drain is asked whether it needs asking at all.
```

Both tracks are half a millimetre wide on a two-hundred-micron dielectric, and
fifty ohms on this stack-up is about a third of a millimetre, so the wider track
is a *lower* impedance: most people first guess the other way.

## A net is sized by its worst requirement

The rail is a `50 Ω controlled` net. A half-millimetre track on this stack-up is
thirty-seven ohms, so it prints the comparison, not the heating margin: a net is
sized by its **worst** requirement, here a quarter outside tolerance.

## Long enough to be a transmission line

The drain net asks the other question: is the run long enough, at this edge, to
matter? While it is short the reading is its heating margin; past four metres it
becomes `2.4× critical length`, now a transmission line.

## The one number here that is not physics

The divisor in that judgement is **not** physics: the literature quotes nine
different values, and Altium's own resources call the rule useless. So it is
declared on the net class, with a citation, where an author can disagree with it.

## A part number is a value, and a model is a capability

A 1N4148W and a 1N4001: on a schematic, a diode is its part number.

Only these two carry a manufacturer's SPICE model, so the bench shows reverse
recovery. The 1N4148 has none; the inspector says so.

## Reverse recovery, a factor of 750 apart

```circuit
title: Two diodes, one reversal, and a factor of 750
circuit: circuits/recovery.benchcircuit
libraries:
  - parts/baseline/library.json
alt: A five-volt bench supply feeding two parallel branches, each a 470 ohm resistor in series with a diode to ground - a 1N4148W in one branch and a 1N4001 in the other.
caption: Turn the supply down to zero and watch which diode keeps conducting. The transit times differ by a factor of 750.
```

## Would you bring it up safely

```quiz
title: Bring-up check
number: "2"
objective: Whether you would bring up an unknown board without destroying it
timerSeconds: 180
questions:
  - prompt: The first check on a newly built supply should be...
    options:
      - Output voltage at full load
      - Continuity and shorts, with no power applied
      - Ripple on the scope
    correct: 1
  - prompt: The pass transistor runs hottest when the output is set...
    options:
      - Low, at high current
      - High, at high current
      - It does not depend on the setting
    correct: 0
  - prompt: Ripple should be measured...
    options:
      - Unloaded, for the cleanest reading
      - At full load, with a short probe ground
      - With the load switching on and off
    correct: 1
```
