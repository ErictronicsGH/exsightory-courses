---
targetMinutes: 4
objectives:
  - Read what a sheet that is still being drawn can and cannot tell you.
---

# A circuit that is not finished being drawn

Every other circuit in this fixture is finished. It has a ground, every pin goes
somewhere, and the bench solves it. This section holds the other state — the
one a sheet is in for the whole time somebody is drawing on it.

## Thirty seconds in {#half-drawn}

```circuit
title: Thirty seconds in
circuit: shared/circuits/half-drawn.benchcircuit
libraries:
  - shared/parts/baseline/library.json
alt: A nine-volt supply and two resistors placed on the sheet. One wire joins the supply's positive terminal to the top resistor and a second joins the two resistors to each other. The supply's negative terminal and the bottom resistor's lower leg are not connected to anything, and nothing on the sheet is marked as the ground.
caption: The parts are placed and two wires are drawn. The bench names what is still missing and prints no numbers at all.
```

## Unfinished is not a failure {#not-a-failure}

Nothing here has gone wrong. There is no ground yet because no ground has been
drawn yet, and two legs go nowhere because they have not been wired up yet. What
the bench must not do is call any of that a failure — and what it must not do
either is put a number under a part on the strength of a circuit this incomplete.

## A section that is not joined to the rest

```circuit
title: Two resistors waiting to be connected
circuit: shared/circuits/section-adrift.benchcircuit
libraries:
  - shared/parts/baseline/library.json
alt: On the left, a nine-volt supply across two resistors in series with the lower end marked as ground. On the right, two ten-kilohm resistors wired to each other at both ends and to nothing else on the sheet.
caption: Every pin on the right-hand pair goes somewhere. Where none of them goes is back to the ground on the left.
```

The second state is harder to see and easier to be wrong about. The divider is
finished: it has a ground, every pin is wired, and on its own it would solve. The
pair beside it is wired to itself and to nothing else.

## A path back to the ground {#a-path-to-ground}

Every terminal is connected, so *is this pin wired* has nothing to say about it.
The question that catches it is a different one — whether there is a path from
the part back to the ground — and a room is told which parts it is about rather
than being left to find them.
