---
targetMinutes: 6
objectives:
  - Choose resistors for a divider from the voltage it has to give.
---

# Saying what the voltage should be

Every circuit on this bench so far has been analysed: the parts are given and
the bench works out the answer. This one is the other way round. The number at
the midpoint is the given, and what the resistors have to be is the answer.

## The midpoint is stated, not computed {#stated-midpoint}

```circuit
title: The midpoint is stated, not computed
circuit: shared/circuits/stated-midpoint.benchcircuit
libraries:
  - shared/parts/baseline/library.json
alt: A nine-volt supply across two resistors in series, five point six kilohms above three point three kilohms. A dimension callout with an arrow touching the junction between them states that the potential there should be four volts.
caption: The callout does not supply anything and nothing flows through it. It is the drawing saying what this node shall be.
```

## A requirement, not a reading {#a-requirement}

Read the mark the way you would read it on a machined part. The arrow touches
the feature, and the number on the landing is what that feature has to measure.
It is a requirement, not a reading, and nothing on the sheet is claiming to have
measured it.

The answer the bench gives back is two resistances, and both of them appear
beside the values that were set — not instead of them. The pair is the point:
what the resistor is, and what it would have to be.

## Asking for something the supply has not got

```circuit
title: Twelve volts asked of a nine-volt rail
circuit: shared/circuits/stated-unreachable.benchcircuit
libraries:
  - shared/parts/baseline/library.json
alt: The same two-resistor divider across a nine-volt supply, with a dimension callout at the midpoint stating twelve volts. The callout is drawn in the refusal colour and the row beneath it reads unresolved.
caption: No choice of resistances puts a node outside the potentials the supplies impose. The bench says which rail holds the number out of reach rather than answering.
```

But a stated point is a requirement, and a requirement can be impossible. This
is the same divider asking for twelve volts at the midpoint of a nine-volt
supply.

## Saying which rail is in the way {#which-rail}

Nothing here is a mistake in the arithmetic. In a network whose only sources are
its supplies, every node sits between them whatever the resistors are, so there
is no answer to find and the honest thing is to say which rail is in the way.
Notice where that sentence appears: beside the circuit, on the part it is about.
A box in the middle of the screen would have covered the drawing you are being
asked to read.

## A circuit the bench had never been shown

```circuit
title: A bridge, and the circuit the bench had never been shown
circuit: shared/circuits/bridge-null.benchcircuit
libraries:
  - shared/parts/baseline/library.json
alt: A ten-volt supply across two parallel resistor divider arms - R1 over R2 on the left and R3 over R4 on the right - with a multimeter connected between the two midpoints.
caption: Three of the four arms are a kilohm and the fourth is 1k2. Ask which way the meter reads before switching anything on, then take R4 back to balance.
```

Everything before this was a circuit this bench was built around. A bridge is
not: two dividers side by side, read against each other rather than against
ground, with the meter across the middle where nothing is at a rail at all.

## An absence printed as an absence {#an-absence}

Every analysis this bench has is on the bridge too, and each of them says
something about it rather than about the circuits it was written against. Under
*Working hard* the four resistors read a percentage and the supply reads zero;
the meter reads no percentage at all, because its profile states no limit to be
a fraction of. It still prints what it is dissipating. An absence printed as an
absence, and not as a zero.

## Unavailable is not quiet {#unavailable-is-not-quiet}

One analysis has nothing to say here at all. *What the wire has to be* is
answered from a net's declared class, this circuit declares none, and the bench
says so in place of the scale rather than drawing a legend over an empty sheet.
An analysis that is unavailable and an analysis that is merely quiet are two
different statements, and a room is owed the difference.
