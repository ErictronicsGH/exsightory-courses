---
targetMinutes: 30
concepts: [linear-regulation]
---

# The linear regulator, and what it costs

A linear regulator holds its output steady by burning the difference. That
sentence is the entire design trade, and everything else in this subsection is a
consequence of it.

```canvas
kind: svg
src: regulator-schematic.svg
alt: A series-pass transistor with a feedback divider, error amplifier and reference, driving a load
caption: The classic series-pass regulator. The transistor is a variable resistor the feedback loop adjusts.
```

The error amplifier compares a fraction of the output against a fixed reference
and drives the pass transistor to keep them equal. If the output sags, the
amplifier turns the transistor on harder. If it rises, it backs off.

That loop runs whether or not anything is connected, which is what the
[quiescent current](glossary:quiescent-current) figure on a datasheet is
telling you: the price of keeping the regulator awake, paid continuously.

## Where the heat goes

The pass transistor drops the difference between input and output while carrying
the full load current. That is real power, and it leaves as heat:

**P = (V_in − V_out) × I_load**

A supply set to 5 V, drawing 2 A, fed from a 20 V rail dissipates
(20 − 5) × 2 = **30 W**. The load receives 10 W. The regulator wastes three
times what it delivers, and it needs a heatsink sized for the worst case, not
the typical one.

```drawing
title: Where the regulator's heat leaves
src: shared/drawings/pass-transistor-heatsink.benchdrawing
alt: A finned heatsink drawn side on, with a pass transistor's metal tab bolted flat against the underside of its base, and two arrows rising past the fins to show the heat leaving upward.
caption: Built up in four steps, the way you would draw it on a board.
```

```plot
title: Where the power goes, as you turn the knob
xLabel: Output voltage set (V)
yLabel: Power (W)
domain: [0, 24]
parameters:
  - name: vin
    label: Input rail
    min: 8
    max: 30
    default: 20
    step: 0.5
    unit: V
  - name: i
    label: Load current
    min: 0
    max: 3
    default: 2
    step: 0.1
    unit: A
curves:
  - expression: (vin - x) * i
    label: Burnt in the pass device
    colour: amber
    fill: true
  - expression: x * i
    label: Delivered to the load
    colour: teal
markers:
  - at: 5
    label: 5 V setting
animate:
  parameter: vin
  seconds: 7
  mode: bounce
  autoplay: true
caption: >-
  Press play, or drag the rail yourself. The amber area is what the regulator
  destroys as heat, and watching it breathe as the rail sweeps is the whole
  argument for a pre-regulator — not a sentence you have to take on trust.
```

```flash
question: Same supply, now set to 15 V at 2 A from the same 20 V rail. What does the pass transistor dissipate?
options:
  - 10 W
  - 30 W
  - 40 W
correct: 0
timerSeconds: 30
```

The dissipation is worst when the output is set *low*, which is the opposite of
what most people expect. A bench supply is at its hottest delivering 1 V into a
short-tempered load, not 30 V into an easy one.

```analogy
A linear regulator is a tap on a fixed-pressure water main. You get the flow you
asked for, but the pressure you did not want is not sent back — it is destroyed
in the tap, as heat and noise.

A switching regulator, by contrast, is a gearbox: it converts the excess rather
than destroying it. That is why switchers run cool and why they are noisier.
```

## Dropout and headroom

A regulator cannot regulate if you do not give it enough to work with. The
[dropout voltage](glossary:dropout-voltage) is the minimum input-to-output
difference it needs; below that the output simply follows the input down,
ripple and all.

That gives you a floor on [headroom](glossary:headroom) — and the smoothing
capacitor's ripple eats into it. It is not enough for the *average* input to
clear dropout; the input at the **bottom of every ripple trough** has to clear
it too.

```poe
prompt: A regulator with a 2 V dropout must output 12 V. Its input averages 14.5 V with 2 V peak-to-peak of ripple. Does it regulate cleanly?
options:
  - Yes - the average is above 14 V
  - No - the ripple troughs dip below dropout
  - Only above half load
correct: 1
explanation: >-
  No. The average is 14.5 V, but the ripple swings +/- 1 V around it, so the
  troughs reach 13.5 V. Dropout needs 12 + 2 = 14 V, so for part of every cycle
  the regulator is not regulating and the ripple passes straight through to the
  output. Design against the trough, never the average.
```

```qa
scope: subsection
```

```multi-select
question: Which of these raise the dissipation in a linear regulator's pass transistor?
options:
  - Raising the input voltage
  - Raising the output current
  - Raising the output voltage
  - Adding a larger smoothing capacitor
correct: [0, 1]
explanation: >-
  Dissipation is (Vin - Vout) x Iout. Raising Vin widens the drop, and raising
  the current multiplies it. Raising Vout narrows the drop and lowers it. The
  capacitor changes ripple, not the average dissipation.
```
