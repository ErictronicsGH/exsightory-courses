---
targetMinutes: 8
---

# The part is not the symbol

A reverse-biased diode is the easiest thing in electronics to draw as a perfect
switch, and every schematic does. It is not one — and two diodes at the same
price differ by a factor of 750 in how long they take to stop conducting.

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

The two diodes below are the profiles in this library with a manufacturer's own
SPICE model behind them, which is what lets the bench show reverse recovery at
all.

```circuit
title: Two diodes, one reversal, and a factor of 750
circuit: shared/circuits/recovery.benchcircuit
libraries:
  - shared/parts/baseline/library.json
alt: A five-volt bench supply feeding two parallel branches, each a 470 ohm resistor in series with a diode to ground - a 1N4148W in one branch and a 1N4001 in the other.
caption: Take the supply negative and watch which diode keeps conducting. The transit times differ by a factor of 750.
```
