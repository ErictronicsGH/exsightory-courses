---
targetMinutes: 8
objectives:
  - Say why a reverse-biased diode is not a perfect switch, and what its recovery time costs.
---

# The part is not the symbol

A reverse-biased diode is the easiest thing in electronics to draw as a perfect
switch, and every schematic does. It is not: two diodes at the same
price differ by a factor of 750 in how long they take to stop conducting.

## A diode that is switched off, and still conducting {#leakage}

```circuit
title: A diode that is switched off, and still conducting
circuit: shared/circuits/leakage.benchcircuit
libraries:
  - shared/parts/baseline/library.json
alt: A ten-volt supply across two one-megohm resistors in series, with a signal diode connected backwards across the lower one - cathode to the divider's midpoint, anode to ground.
caption: The diode is backwards, in parallel with the lower resistor. Predict what it is doing, then reveal it.
reveal:
  part: D1
  show: reverse_leakage
predict:
  prompt: The diode is reverse-biased across the lower resistor. What is flowing through the diode?
  options:
    - Nothing at all - a reverse diode is an open circuit
    - A few nanoamps
    - A few microamps, like the divider beside it
    - A few milliamps
  correct: 1
```

## Two diodes, one reversal, and a factor of 750 {#recovery}

```circuit
title: Two diodes, one reversal, and a factor of 750
circuit: shared/circuits/recovery.benchcircuit
libraries:
  - shared/parts/baseline/library.json
alt: A five-volt bench supply feeding two parallel branches, each a 470 ohm resistor in series with a diode to ground - a 1N4148W in one branch and a 1N4001 in the other.
caption: Turn the supply down to zero and watch which diode keeps conducting. The transit times differ by a factor of 750.
```

These two diodes are the profiles in this library with a manufacturer's own
SPICE model behind them, which is what lets the bench show reverse recovery at
all.

## An LED lit by the current through it {#led-current-limit}

```circuit
title: Two LEDs, each lit by the current its resistor allows
circuit: shared/circuits/led-current-limit.benchcircuit
libraries:
  - shared/parts/baseline/library.json
alt: A five-volt bench supply feeding two parallel branches, each a resistor in series with an LED to ground - 150 ohms and a red LED in one branch, 1.5 kilohms and a green LED in the other.
caption: The red LED's resistor lets twenty milliamps through and the green's about two. Open it in View and turn either resistor.
opens:
  tool: iv
  part: D1
```

Some parts answer the current where you can see it. An LED lights with the
current through it, in its own colour.

## A capacitor charged through a resistor {#rc-charging}

```circuit
title: A capacitor charged through a resistor
circuit: shared/circuits/rc-charging.benchcircuit
libraries:
  - shared/parts/baseline/library.json
alt: A five-volt bench supply in series with a ten-kilohm resistor and a hundred-microfarad capacitor to ground.
caption: Settled across the supply, it is full. Open it in View to see a charge bulb on each plate, the + on the side the supply drives.
```

A capacitor holds a charge on its plates, and its charge bulbs grow as it
fills.

## Light into a voltage {#ldr-divider}

```circuit
title: Light into a voltage
circuit: shared/circuits/ldr-divider.benchcircuit
libraries:
  - shared/parts/baseline/library.json
alt: A five-volt bench supply across a light-dependent resistor above a fixed resistor to ground; the junction between them is the midpoint.
caption: The LDR's resistance falls as the light rises, so the midpoint's voltage rises with the light. Step through it, or turn the lamp in View.
stops:
  - id: lamp-low
    title: The lamp is low
    caption: "A dim room, 5 lx: the LDR is high, so the midpoint sits low."
    view:
      sources:
        LDR1: 5
      flow: true
  - id: the-loop
    title: The current's loop
    caption: One current, from the supply through the LDR and R1, and back.
    view:
      sources:
        LDR1: 5
    trace:
      loop: [V1, vcc, LDR1, mid, R1, gnd]
    quiet: []
  - id: the-midpoint
    title: The midpoint
    caption: "The midpoint holds its voltage, steady: an ADC reads it and draws no current from it."
    view:
      sources:
        LDR1: 5
    trace:
      net: mid
    quiet: []
  - id: lamp-up
    title: Turn the lamp up
    caption: "100 lx: the LDR falls, the current rises, and the midpoint with it."
    view:
      sources:
        LDR1: 100
    trace:
      loop: [V1, vcc, LDR1, mid, R1, gnd]
    quiet: []
```

A divider turns a resistance into a voltage. The LDR's resistance follows the
light, so the midpoint does too.
