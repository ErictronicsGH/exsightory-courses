---
targetMinutes: 30
objectives:
  - Explain how a current limit turns a shorted probe into an inconvenience.
  - Tell constant-current limiting from foldback by its curve.
motivates: A regulated supply pushes whatever current a mistake on the bench asks of it.
concepts: [current-limiting]
---

# Current limiting: the feature that saves the board

A bench supply without a current limit is a device for converting small mistakes
into expensive ones. The limit is what turns a shorted probe from a destroyed
prototype into an inconvenience.

## Two ways to limit the current

```canvas
kind: image
src: limit-curves.png
alt: Two output curves - constant-current limiting holding current flat as voltage collapses, and foldback limiting where current falls as the fault worsens
caption: Constant-current against foldback. The difference matters most into a dead short.
```

## Constant current

Below the limit the supply is a voltage source; at the limit, a current source,
and the voltage falls to suit the load. Set 1 A into a short: 1 A at nearly 0 V.

Safe for the load, but the **regulator's worst case**: maximum dissipation.

## Try the limit on a breadboard

```bench
title: Set the limit, then load it
package: "@exsight/bench-breadboard@0.2.8"
work: shared/benches/bench-supply.breadboard
alt: A bench supply on a breadboard, set to 5 V with its current limit at 0.1 A, and a load across its leads.
caption: The limit you set is the most the load can draw, whatever it asks for.
```

```challenge
title: Light the path
package: "@exsight/bench-breadboard@0.2.8"
work: shared/benches/ldr-current.breadboard
alt: A bench supply at 5 V beside an empty breadboard, and a light-dependent resistor to place so the supply drives 0.35 mA through it.
caption: A load far under the limit draws only what it needs, and the limit never acts.
```

## What happens into a dead short?

```poe
prompt: A supply set to 20 V with a 1 A limit is shorted at its output terminals. Input rail is 25 V. What does the pass transistor now dissipate?
options:
  - About 5 W, as before
  - About 20 W
  - About 25 W
correct: 2
explanation: >-
  About 25 W. Under short circuit the output is near 0 V, so the pass transistor
  drops the entire 25 V input while the limit holds current at 1 A. That is
  25 W - considerably more than the 5 W it dissipated while regulating normally.
  A short circuit is the regulator's hardest moment, not its easiest, and this is
  precisely why foldback exists.
```

## Foldback

[Foldback](glossary:foldback) lowers the limit as the output falls, so a dead
short draws *less* than a mild overload, keeping the pass transistor in its safe
operating area.

A large inrush looks like a fault: the supply folds back and never starts.
Lamps and capacitive loads suffer most.

## Which limit runs coolest?

```flash
question: A dead short is put across the output. Which kind of limit leaves the pass transistor coolest?
options:
  - Constant current, held at the full limit
  - Foldback, which lowers the limit as the output voltage falls
  - Neither, because a short draws no current
correct: 1
timerSeconds: 30
onWrong: relearn
relearnFrom: 02-regulation-current-limit
why: What made you choose that one?
```

## Set our limit and prove it

```checkpoint
instructions: |
  Set the limit for the supply we are building, and prove it works.
  Use a resistive dummy load, not a real board.
items:
  - Set the output to 12 V with no load
  - Set the current limit to 500 mA
  - Load it until the supply enters limit, and note the voltage where it does
  - Short the output through an ammeter and confirm the current holds at the limit
  - Calculate the pass transistor dissipation at that moment
```

## Has a limit ever saved you?

```poll
question: On your own bench, how often has a current limit actually saved you?
options:
  - Never - I do not use one
  - Once or twice
  - More times than I want to admit
```

## What our supply burns into a short

```numeric
question: The supply is set to 12 V out and holds a 500 mA limit into a dead short. The raw DC into the pass transistor is 18 V. What does the transistor dissipate, in watts?
correctAnswer: 9
tolerance: 0.5
unit: W
explanation: >-
  Into a short the output is 0 V, so the whole 18 V is across the transistor
  while the limit holds the current at 500 mA. P = 18 x 0.5 = 9 W. That is the
  worst case, and it is why the limit and the heatsink are the same decision.
```
