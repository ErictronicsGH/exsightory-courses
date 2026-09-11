---
targetMinutes: 6
---

# Saying what the voltage should be

Every circuit on this bench so far has been analysed: the parts are given and
the bench works out the answer. This one is the other way round. The number at
the midpoint is the given, and what the resistors have to be is the answer.

```circuit
title: The midpoint is stated, not computed
circuit: shared/circuits/stated-midpoint.benchcircuit
libraries:
  - shared/parts/baseline/library.json
alt: A nine-volt supply across two resistors in series, five point six kilohms above three point three kilohms. A dimension callout with an arrow touching the junction between them states that the potential there should be four volts.
caption: The callout does not supply anything and nothing flows through it. It is the drawing saying what this node shall be.
```

Read the mark the way you would read it on a machined part. The arrow touches
the feature, and the number on the landing is what that feature has to measure.
It is a requirement, not a reading, and nothing on the sheet is claiming to have
measured it.

## Asking for something the supply has not got

The answer the bench gives back is two resistances, and both of them appear
beside the values that were set — not instead of them. The pair is the point:
what the resistor is, and what it would have to be.

But a stated point is a requirement, and a requirement can be impossible. This
is the same divider asking for twelve volts at the midpoint of a nine-volt
supply.

```circuit
title: Twelve volts asked of a nine-volt rail
circuit: shared/circuits/stated-unreachable.benchcircuit
libraries:
  - shared/parts/baseline/library.json
alt: The same two-resistor divider across a nine-volt supply, with a dimension callout at the midpoint stating twelve volts. The callout is drawn in the refusal colour and the row beneath it reads unresolved.
caption: No choice of resistances puts a node outside the potentials the supplies impose. The bench says which rail holds the number out of reach rather than answering.
```

Nothing here is a mistake in the arithmetic. In a network whose only sources are
its supplies, every node sits between them whatever the resistors are, so there
is no answer to find and the honest thing is to say which rail is in the way.
Notice where that sentence appears: beside the circuit, on the part it is about.
A box in the middle of the screen would have covered the drawing you are being
asked to read.
