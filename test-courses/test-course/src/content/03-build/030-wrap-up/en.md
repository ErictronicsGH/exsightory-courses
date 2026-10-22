---
targetMinutes: 20
objectives:
  - Name what each stage of the supply trades, and where the design runs out.
---

# What you built, and what you would change

You now have a supply that steps down, rectifies, smooths, regulates and
protects — and, more usefully, you know what each stage costs.

The through-line worth keeping: **every stage trades one thing for another,
and none of them is free.**

## What each stage trades away

- The transformer trades volts for amps
- The bridge trades two diode drops for half the smoothing capacitance
- The capacitor trades ripple for peak diode current
- The regulator trades heat for steadiness
- The current limit trades working under a fault for surviving it

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
live with. Someone reading your schematic in five years is reading that
argument, not the components.

So the notes on the drawing matter as much as the drawing.
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

<!-- Two plants in this list. "No remote sensing" nests a list, which reaches the wall
     (M76b). The quote inside "Efficiency" is not kept in a list item: content-not-kept
     says so, and is one of this fixture's four warnings. A quote and not a fence,
     because the editor badges a fence in an item as a block (M76b's handoff).
     Kept short on purpose: the section's video keeps this slide split, and its
     text column holds about half a card (crossing 538, drive 115 found it 432 px
     past the bottom of the wall at twice this length). -->

- **Efficiency is poor.** At low settings it is mostly a heater.

  > At best, efficiency is V_out / V_in: at 5 V out of 15 V in, two thirds of
  > the power heats the pass transistor.
- **No remote sensing.** It regulates at the terminals, not the load.
  - Load sensing needs two more wires.
- **Single output.** Split rails need another supply.
- **A slow limit.** It survives shorts, not transients.

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
