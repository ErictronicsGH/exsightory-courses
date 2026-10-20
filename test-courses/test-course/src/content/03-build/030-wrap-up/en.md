---
targetMinutes: 20
objectives:
  - Name what each stage of the supply trades, and where the design runs out.
---

# What you built, and what you would change

You now have a supply that steps down, rectifies, smooths, regulates and
protects — and, more usefully, you know what each stage costs.

The through-line worth keeping: **every stage in this supply trades one thing
for another, and none of them is free.**

## What each stage trades away

- The transformer trades volts for amps
- The bridge trades two diode drops for half the smoothing capacitance
- The capacitor trades ripple for peak diode current
- The regulator trades heat for steadiness
- The current limit trades a working supply under fault for a survivable one

## The finished unit under load

```canvas
kind: video
src: full-load-test.mp4
timestamp: 0
caption: The finished unit under a 2 A step load, with the output on the scope.
```

Two questions from the course's bank follow the analogy, asked by reference and
pinned to the version this lecture was written against.

## An instrument is an argument about compromises

```analogy
A finished instrument is an argument about which compromises you were willing to
live with. Somebody reading your schematic five years from now is reading that
argument, not the components.

Which is why the notes on the drawing matter as much as the drawing.
```

## How far does the heatsink rise

```numeric
ref: heatsink-rise@1
```

## Where the regulator's heat comes from

```multi-select
ref: regulator-heat@1
```

## Where this design runs out

Honest limits of what we built:

- **Efficiency is poor by design.** A linear supply at low output settings is
  mostly a heater. A switching pre-regulator is the usual fix.
- **No remote sensing.** The voltage is right at the terminals and slightly
  wrong at the load, and the error grows with current and lead length.
  - Remote sensing runs two extra wires to the load and regulates there.
  - It needs two more terminals and a regulator built to take them.
- **Single output.** Anything needing split rails needs a second supply.
- **The limit is not fast.** It protects against a sustained short, not against
  a nanosecond-scale transient.

## Questions on anything we covered

```qa
scope: all
```

## Before you go

```exit-survey
title: Before you go
questions:
  - prompt: How confident do you feel sizing a heatsink for a known dissipation?
    type: rating
    scaleMax: 5
  - prompt: Which stage would you most want to spend another hour on?
    type: choice
    options:
      - The transformer and rectifier
      - Smoothing and ripple
      - The regulator loop
      - Current limiting and protection
      - The mechanical and thermal design
  - prompt: What is one thing that was explained less clearly than it should have been?
    type: text
    maxLength: 400
```
