---
targetMinutes: 6
objectives:
  - Choose resistors for a divider from the voltage it has to give.
---

# Saying what the voltage should be

Every circuit so far has been analysed: the parts are given and the bench works
out the answer. This one is the other way round. The number at the midpoint is
given, and what the resistors have to be is the answer.

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

Read the mark as on a machined part: the arrow touches the feature; the number
is what it has to measure, not what anything measured.

The bench answers beside the values set: what each resistor is, and what it
would have to be.

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

Where only the supplies are sources, every node sits between them whatever the
resistors are: there is no answer, only a rail in the way, which the bench
names beside the part it concerns, not in a box over the drawing.

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
ground, with the meter across the middle where nothing is at a rail.

## An absence printed as an absence {#an-absence}

Every analysis works here too. Under *Working hard* the resistors read a
percentage and the supply zero; the meter reads none, because its profile states
no limit. It still prints its dissipation: an absence
printed as an absence, not as a zero.

## Unavailable is not quiet {#unavailable-is-not-quiet}

*What the wire has to be* is unavailable here: it reads a net's declared class,
and this circuit declares none. The bench says so, and draws no legend over an
empty sheet. Unavailable and quiet are different statements; a room is owed the
difference.
