---
targetMinutes: 30
concepts: [current-limiting]
---

# Current limiting: the feature that saves the board

A bench supply without a current limit is a device for converting small mistakes
into expensive ones. The limit is what turns a shorted probe from a destroyed
prototype into an inconvenience.

```canvas
kind: image
src: limit-curves.png
alt: Two output curves - constant-current limiting holding current flat as voltage collapses, and foldback limiting where current falls as the fault worsens
caption: Constant-current against foldback. The difference matters most into a dead short.
```

## Constant current

The simplest useful behaviour: below the limit the supply is a voltage source;
at the limit it becomes a current source and the voltage falls to whatever the
load demands. Set 1 A into a short and you get 1 A at nearly 0 V.

That is safe for the load, but it is the **worst case for the regulator** — full
current at full input-to-output difference, which is maximum dissipation.

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

[Foldback](glossary:foldback) limiting reduces the current limit as the output
voltage falls, so a dead short draws *less* than a mild overload. It keeps the
pass transistor inside its safe operating area at the exact moment constant
current pushes it out.

The catch: foldback can fail to start a load that draws a large inrush, because
the supply reads the inrush as a fault, folds back, and never gets the output up.
Lamps and capacitive loads are the usual victims.

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

```poll
question: On your own bench, how often has a current limit actually saved you?
options:
  - Never - I do not use one
  - Once or twice
  - More times than I want to admit
```

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
