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

1. **Continuity and shorts, unpowered.** Before it sees mains, check that
   output-to-ground is not a short and that the mains earth reaches the chassis.
2. **Raw DC only.** Power it with the regulator out of circuit, and confirm the
   smoothing capacitor charges to the peak you predicted in Part 1.
3. **Regulator in, no load.** Check the output holds the set voltage and that
   the pass transistor is not warm.
4. **Dummy load, slowly.** Bring the current up in steps, watching the output
   voltage and the heatsink together.
5. **Limit test, deliberately.** Short it on purpose, through an ammeter,
   knowing what the limit should be.

## A pre-flight check, not a test flight

```analogy
Bringing up a power supply is a pre-flight check, not a test flight. Every item
is boring, every item is checked in order, and the reason the order exists is
that each step assumes the previous one passed.

Skipping to step four because the first three "obviously" pass is how a bench
supply becomes a fuse tester.
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

With a scope on the output and the supply at full load, you are looking for two
different things at once. Low-frequency [ripple](glossary:ripple) at twice the
mains frequency is the smoothing capacitor talking. High-frequency noise on top
of it is the regulator's loop, or your probe grounding, and the two are easily
confused.

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
  prompt: The divider is two equal resistors on ten volts. What does the handheld read across the lower one?
  options:
    - Five volts - the divider is symmetrical
    - A little under five volts
    - A little over five volts
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

Move the reference clip and you have not adjusted the measurement, you have
changed which measurement it is. With the clip on the mid-node the meter is
across the top resistor, and the number it prints is a perfectly good one for a
quantity nobody asked about. That is the case worth drawing in full: a probe
referenced to ground draws its tip and nothing else, exactly as every scope
screenshot does, and a probe referenced anywhere else shows you the lead that
made it so.

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
  prompt: The ammeter's shunt is turned from ten milliohms to ten ohms. What happens to the current it reports?
  options:
    - Nothing - the supply and the resistor decide the current
    - It falls, because the shunt is now a tenth of the circuit
    - It rises, because a bigger shunt develops more voltage
    - It falls, and the clamp beside it reports the fall too
  correct: 1
```

There are two ways to find out what a current is, and the difference between
them is not accuracy. An ammeter goes *in* the branch, so it is a resistor you
have added to the circuit you were asking about, and the voltage across that
resistor is the price of the reading - turn its shunt up and watch the current
you are measuring fall.

## A clamp adds nothing, and pays in resolution

A clamp goes *around* the conductor and adds nothing at
all: solve the bench with it and without it and every number is identical to the
digit. What it costs instead is resolution. A hundred-amp jaw reads a hundred
milliamps in ten-milliamp steps with fifty milliamps of uncertainty around it,
which is a way of saying it cannot see the very error the ammeter beside it is
causing.

## A finer jaw, and the reading appears

Fit the milliamp clamp in place of the hundred-amp one and nothing about the
circuit moves - the reading appears because the instrument changed, which is the
same lesson the two multimeters teach one page above, arriving from the side
where the instrument was never in the way at all.

## Moving the probe is moving the lead

A probe is not part of the circuit, which is why you may move it while somebody
is watching. Where the tip sits is not a decision about the drawing - it is
which node you are measuring - so moving it is the same act as lifting a lead
off one test post and putting it on the next, and it is the act the whole of
this page has been building towards.

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
  explanation: A and B both look into 667 kΩ, so the meter pulls each down by the same fraction, 6.25 %. That fraction is taken from 6.67 V at A and from 3.33 V at B, so A loses 0.42 V and B loses 0.21 V. On the rail there is nothing to pull.
```

What the room sees is not just a different
number. It is a different *error*: a ten-megohm meter across a megohm ladder
drags whichever node it is on, by an amount that node's own impedance decides,
and on the rail - fifty milliohms behind it - there is nothing to drag at all.

## One clamp, sent to three branches

```circuit
title: One jaw, three branches, three different currents
circuit: circuits/clamp-walk.benchcircuit
libraries:
  - parts/baseline/library.json
alt: A ten-volt supply through a hundred-ohm resistor into two parallel branches - a two-hundred-ohm resistor behind an ammeter, and a six-hundred-ohm resistor beside it. A clamp is closed around one of the conductors without breaking it.
caption: Forty milliamps in the feed, thirty in one branch and ten in the other. The clamp reads whichever you send it to; the ammeter reads the branch it is in and cannot be sent anywhere.
```

The same is true of the jaw, and it is easier to see because a clamp changes
nothing at all when it moves. Three branches, three different currents, one
instrument - and the ammeter beside it stays exactly where it was soldered,
because moving that one would mean cutting the circuit open and re-making it.
That is the whole line: you can move what you can touch without cutting.

## The current that is not there

A reverse-biased diode is the easiest thing in electronics to draw as a
perfect switch, and every schematic does. It is not one. There is a current, it
is always there, and beside a divider drawing five microamps it is a two
thousandth - which is to say invisible, until the node it sits on is a hundred
times higher in impedance and it is the only thing that matters.

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

Almost everyone reads a wattage on a resistor as an electrical limit. It is not.
It is a thermal one, and what it is really describing is the package and how it
is mounted - which is why two parts working equally hard can be sixty degrees
apart.

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

Every source is a voltage behind a resistance, and the resistance is the whole
of the story. Ours is ten volts behind fifty milliohms. Hang a five-ohm dummy
load on it and it delivers about twenty watts - which sounds like a lot until
the bench tells you it is under four per cent of what this supply could
theoretically produce.

## The source resistance sets the ceiling

```circuit
title: The most this supply could ever give
circuit: circuits/power-transfer.benchcircuit
libraries:
  - parts/baseline/library.json
alt: A ten-volt bench supply driving a single five-ohm twenty-five-watt aluminium-clad load resistor, with the supply's negative terminal as the circuit reference.
caption: Open it plain and the supply is ideal - no output resistance, so no maximum, and the readout says so. Switch on its output impedance and the theorem has terms.
```

Turn the supply *down* and watch which numbers move - down, because at ten volts
this load is already drawing the two amps the supply's own profile recommends as
its ceiling, and there is nowhere up to go that a real bench would follow you.
The delivered power falls and so does the maximum, in step, because both go as
the square of the open-circuit voltage - so the percentage does not move at all.
It is a statement about the load, not about the dial, and the only way to shift
it is to change what is hanging on the terminals.

## A good supply is enormously unmatched

The theorem says the peak is where the load equals the source's own resistance.
For this supply that is a fifty-milliohm load, at five volts, drawing a hundred
amps - a current that is thirty-three times its own absolute maximum and would
destroy it in the time it takes to say so. **A bench supply is deliberately,
enormously unmatched, and that is exactly what makes it a good supply.**

## At maximum power, half of it is wasted

And there is a second number the bench prints beside the first, because the
first one on its own teaches the wrong lesson. At the peak, half of everything
the source produces is burnt inside the source: the efficiency at maximum power
transfer is exactly fifty per cent, always, for every source there has ever
been. Where we are actually sitting - a hundred times unmatched - it is
ninety-nine. Maximum power and best efficiency are not the same place, and only
one of them is somewhere you would design.

## The leads are in the measurement

Every wire on every schematic you have read is a line with no resistance, and
for almost everything you will ever build that is close enough to true. A
resistance thermometer is where it stops being true. A Pt100 is a hundred ohms
at the ice point and moves 0.385 ohms per degree, so a tenth of an ohm is a
quarter of a degree - and two metres of AWG 24 between the bench and the sensor
is about 0.16 ohms, in each lead, in series with the thing you are measuring.

## A wire with a length is in the answer

The bench can promote a net's leads into solved elements: same net, same
circuit, but the wire now has a length, a cross-section and a resistivity, and
it is in the answer. Nothing about the drawing changes. What changes is that
there is a number where there used to be an assumption.

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
  prompt: The two force leads are swapped for ten metres of the same wire. Which readings move?
  options:
    - Both, because the leads are in series with everything
    - Neither - the excitation current is set by the ten kilohms
    - The two-wire reading only, and it goes up
    - The four-wire reading only, because its sense leads got longer too
  correct: 2
```

Two meters are watching the same sensor here. One is clipped to the binding
posts where the leads start, which is a two-wire measurement and the way anybody
would do it first. The other has two sense leads of its own, running all the way
down to the sensor's own terminals. It draws no current, so its leads drop
nothing, so it reads the sensor and not the loop - and that is the whole of
four-wire sensing. Lengthen the force leads and watch which of the two moves.

## Sense leads that carry no current

Note which lead a longer wire is allowed to be. The *sense* leads can be twenty
metres and the reading does not move by a digit, because nothing flows in them;
the *force* leads are the measurement. That is why four-wire is worth four wires
and why nobody bothers on a ten-kilohm thermistor, where a third of an ohm is
three thousandths of a per cent and beneath everything else that is wrong.

## The wire is a component, and it has a rating too

A schematic draws a wire as a line, and a line has no properties. That is the one
thing a schematic teaches people to forget, and it is why the question *how thick
does this have to be* is usually asked for the first time in a different program,
by a different person, weeks later.

## Ask what each net has to be

Turn **NetClass Mode** on and the analysis stops asking what each part is doing
and asks what each *net* has to be. It needs three things nobody has to measure:
the current the bench has already solved through the net, how much the net is
allowed to heat, and whether it runs on the outside of the board or buried in it.
Out comes the minimum cross-section - IPC-2221's chart done as arithmetic instead
of read off a nomograph with a ruler - and, from the board's copper weight, the
narrowest the track is allowed to be.

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
  prompt: A hundred millimetres of this track is about twenty-five milliohms. At the current the load is drawing, what does the rail lose along it?
  options:
    - Nothing worth a number - copper is a conductor
    - About thirty millivolts
    - About a tenth of a volt
    - About half a volt
  correct: 2
```

The rail here is a half-millimetre track in one-ounce copper, and it is declared
a `signal` net: ten degrees of rise, which is what almost every board is designed
to. As authored it is comfortably adequate. Turn the supply up and watch the
reading on the rail fall through 100 %, without one thing on the schematic moving.

## A missing conductor is not a pass

Two answers worth having on the same view. A net with **no conductor chosen yet**
says what it needs and says that nothing has been chosen - it does not report a
pass, because a pass against a wire that does not exist is the most expensive
kind of wrong number. And a net carrying a milliamp says **heating does not size
this net**, which is the honest answer for the four-wire rig above: its leads are
AWG 24 because a thinner one breaks when you solder it, not because a thinner one
would melt.

## A track is a piece of wire until the edge is fast enough

The rail above was sized by how hot it is allowed to get. That is the only
question a DC bench can ask of a piece of copper, and it is not the question a
fast board is designed around.

## Declare the stack-up and the edge rates

Two more declarations turn the same view into the one high-speed design actually
starts from. A **stack-up** says what the board is made of - how far the track is
from its reference plane, and what is in between - because a schematic carries
none of that and an impedance is a fact about the *space* between two conductors
rather than about either of them. And the parts declare their **edge rates**:
`t_r` at the drain, off the datasheet, with the conditions it was measured under
and the band it was measured over. Nothing is assumed. A net whose driver
declares no rise time gets told so, never a default.

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
fifty ohms on this stack-up is about a third of a millimetre - so a wider track
is a *lower* impedance, not a higher one, which is the way round most people
guess wrong the first time.

## A net is sized by its worst requirement

The rail is a `50 Ω controlled` net: the fabricator will be told what it has to
be and will test that it is. Half a millimetre of track on this stack-up is
thirty-seven ohms, so it prints the comparison rather than the heating margin -
not because heating stopped mattering, but because a net is sized by its **worst**
requirement, and this one is a quarter of the way outside a tolerance while
sitting at a fifth of its permitted rise.

## Long enough to be a transmission line

The drain net asks the other question. Nobody has told it to be fifty ohms, so
what matters is whether the run is long enough, at the edge actually driving it,
for any of that to matter at all. Press its length and watch: while it is short
the reading is its heating margin, and past four metres it becomes `2.4× critical
length` - the same track, the same board, the same edge, now a transmission line.

## The one number here that is not physics

The divisor in that judgement is the one number here that is **not** physics. The
literature quotes nine different values for it, and Altium's own resources call
the rule useless on exactly that ground - so it is declared on the net class,
with a citation, where an author can read it and disagree with it, rather than
sitting in the software as a constant that traces to nothing.

## A part number is a value, and a model is a capability

Two diodes, the same price, across the same rail. One is a 1N4148W and the other
a 1N4001, and the schematic says so where a resistor would say `2k2` - because on
every schematic ever drawn, what a diode is *is* its part number.

They are also the two profiles in this library with a manufacturer's own SPICE
model behind them, which is what lets the bench show reverse recovery at all. The
through-hole 1N4148 beside them has no published model: its forward parameters
are fitted from the datasheet's guaranteed maxima, and the inspector says so.

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
