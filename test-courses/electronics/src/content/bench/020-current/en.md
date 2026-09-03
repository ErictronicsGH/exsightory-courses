---
targetMinutes: 10
---

# Reading a current, and moving what reads it

An ammeter is in the branch and is therefore part of it. A clamp is around the
conductor and adds nothing — what it costs instead is resolution. The third
circuit is the one that only moves: you can move what you can touch without
cutting.

```circuit
title: Two ways to read a current, and what each one costs
circuit: shared/circuits/branch-current.benchcircuit
libraries:
  - shared/parts/baseline/library.json
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

A ten-megohm meter across a megohm ladder drags whichever node it is on, by an
amount that node's own impedance decides, and on the rail there is nothing to
drag at all.

```circuit
title: Move the probe, and the error moves with it
circuit: shared/circuits/probe-walk.benchcircuit
libraries:
  - shared/parts/baseline/library.json
alt: A ten-volt supply across three one-megohm resistors in series, with a test post on each of the three upper nodes. A probe touches the top rail at right angles and runs to a handheld multimeter.
caption: Send the probe to IN, then A, then B. Ideally 10, 6.67 and 3.33 volts; the handheld says 10.00, 6.25 and 3.12, and only the rail is honest.
```

The same is true of the jaw, and it is easier to see because a clamp changes
nothing at all when it moves.

```circuit
title: One jaw, three branches, three different currents
circuit: shared/circuits/clamp-walk.benchcircuit
libraries:
  - shared/parts/baseline/library.json
alt: A ten-volt supply through a hundred-ohm resistor into two parallel branches - a two-hundred-ohm resistor behind an ammeter, and a six-hundred-ohm resistor beside it. A clamp is closed around one of the conductors without breaking it.
caption: Forty milliamps in the feed, thirty in one branch and ten in the other. The clamp reads whichever you send it to; the ammeter reads the branch it is in and cannot be sent anywhere.
```
