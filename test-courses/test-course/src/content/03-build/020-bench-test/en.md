---
targetMinutes: 30
---

# Bringing it up, without letting the smoke out

First power-on is the moment to be slow and deliberate. Everything in this
subsection assumes the supply is on the bench, unloaded, and not yet trusted.

```canvas
kind: image
src: test-setup.png
alt: A test bench layout with the supply under test, a dummy load, a meter across the output and a scope probe on the ripple
caption: The bring-up bench. Dummy load, meter, scope - and nothing valuable connected.
```

## The order that matters

1. **Continuity and shorts, unpowered.** Before it sees mains, check that
   output-to-ground is not a short and that the mains earth reaches the chassis.
2. **Raw DC only.** Power it with the regulator out of circuit, and confirm the
   smoothing capacitor charges to the peak you predicted in Part 1.
3. **Regulator in, no load.** Check the output holds the set voltage and that
   the pass transistor is not warm.
4. **Dummy load, slowly.** Bring the current up in steps, watching the output
   voltage and the heatsink together.
5. **Limit test, deliberately.** Short it on purpose, through an ammeter,
   knowing what the limit should be.

```analogy
Bringing up a power supply is a pre-flight check, not a test flight. Every item
is boring, every item is checked in order, and the reason the order exists is
that each step assumes the previous one passed.

Skipping to step four because the first three "obviously" pass is how a bench
supply becomes a fuse tester.
```

```canvas
kind: widget
src: shared/widgets/ohms-law/index.html
caption: Work out your dummy load resistance and its wattage before you build it.
```

## Reading the ripple

With a scope on the output and the supply at full load, you are looking for two
different things at once. Low-frequency [ripple](glossary:ripple) at twice the
mains frequency is the smoothing capacitor talking. High-frequency noise on top
of it is the regulator's loop, or your probe grounding, and the two are easily
confused.

```poe
prompt: You see 200 mV of noise on the output. Moving the scope probe's ground clip closer to the output terminals drops it to 20 mV. What were you measuring?
options:
  - Real output ripple that the shorter ground fixed
  - Mostly a measurement artefact from the ground lead
  - A faulty regulator that has now settled
correct: 1
explanation: >-
  Mostly measurement artefact. A long ground lead is a loop of wire, and a loop
  of wire near a supply that switches current in pulses will pick up a voltage
  that has nothing to do with your output. The supply did not change - only the
  measurement did. Ripple figures taken with a long ground clip are not wrong so
  much as meaningless.
```

```quiz
title: Bring-up check
number: "2"
objective: Whether you would bring up an unknown board without destroying it
timerSeconds: 180
questions:
  - prompt: The first check on a newly built supply should be...
    options:
      - Output voltage at full load
      - Continuity and shorts, with no power applied
      - Ripple on the scope
    correct: 1
  - prompt: The pass transistor runs hottest when the output is set...
    options:
      - Low, at high current
      - High, at high current
      - It does not depend on the setting
    correct: 0
  - prompt: Ripple should be measured...
    options:
      - Unloaded, for the cleanest reading
      - At full load, with a short probe ground
      - With the load switching on and off
    correct: 1
```
