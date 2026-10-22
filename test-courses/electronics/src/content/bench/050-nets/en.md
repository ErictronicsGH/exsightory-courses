---
targetMinutes: 12
objectives:
  - Say when a wire’s resistance is part of the measurement, and size copper for a current.
---

# The wire is a component

Every wire on every schematic you have read is a line with no resistance. These
three circuits are where that stops being true: first because the leads are in
the measurement, then because the copper has to be sized, and finally because
the edge is fast enough that the track is a transmission line.

## The leads are in the measurement, until you stop measuring through them {#four-wire-sensing}

```circuit
title: The leads are in the measurement, until you stop measuring through them
circuit: shared/circuits/four-wire-sensing.benchcircuit
libraries:
  - shared/parts/baseline/library.json
alt: A ten-volt supply driving a ten-kilohm resistor and a hundred-ohm platinum RTD in series through two metres of AWG 24 in each lead, with an ammeter in the loop. One multimeter is connected across the near ends of the leads and a second is connected by its own pair of sense wires to the RTD's own terminals.
caption: A milliamp through the sensor. Divide either meter's reading by it and the four-wire answer is 100 ohms; the two-wire answer is 100.33, and the third of an ohm is the copper.
reveal:
  part: WF1
  show: lead_resistance
predict:
  prompt: The two force leads are swapped for ten metres of the same wire. Which readings move?
  options:
    - Both - the leads are in series
    - Neither - ten kilohms set the current
    - Only the two-wire one, upward
    - Only the four-wire one
  correct: 2
```

## What each net has to be {#netclass-mode}

Turn **NetClass Mode** on: the analysis asks what each *net* has to be, not what
each part is doing. The next rail is a half-millimetre, one-ounce track declared
a `signal` net. Turn the supply up: the rail's reading falls through 100 %, and
nothing on the schematic moves.

## The track never moved. What it has to be did {#net-sizing}

```circuit
title: The track never moved. What it has to be did.
circuit: shared/circuits/net-sizing.benchcircuit
libraries:
  - shared/parts/baseline/library.json
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

## Heat is not the question a fast board asks {#fast-board}

That rail was sized by how hot it may get, the only question a DC bench asks of
copper. A fast board asks another. On the next sheet, press the drain net's
length: short, it reads its heating margin; past four metres,
`2.4× critical length`.

## A track is a piece of wire until the edge is fast enough {#controlled-impedance}

```circuit
title: A track is a piece of wire until the edge is fast enough.
circuit: shared/circuits/controlled-impedance.benchcircuit
libraries:
  - shared/parts/baseline/library.json
alt: A ten-volt supply feeding a twenty-two ohm drain resistor and an N-channel MOSFET switch through two half-millimetre tracks. The rail is a fifty-ohm controlled net and the drain net is a fast signal with no impedance target.
caption: Two nets, two questions, one reading each. The rail is asked what it is against what it was asked to be; the drain is asked whether it needs asking at all.
```
