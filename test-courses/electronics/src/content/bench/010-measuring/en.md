---
targetMinutes: 10
---

# What the instrument costs the circuit

Two demonstrations, both about the same thing: a meter is a component, and where
you put it decides what you measured.

```circuit
title: Why the meter changes the reading
circuit: shared/circuits/divider-loading.benchcircuit
libraries:
  - shared/parts/baseline/library.json
alt: A ten-volt supply across two one-megohm resistors in series, with a handheld multimeter connected across the lower one.
caption: A 10 MΩ handheld across a 1 MΩ divider. The reading is not the voltage.
reveal:
  part: M1
  show: input_loading
predict:
  prompt: The divider is two equal resistors on ten volts. What does the handheld read across the lower one?
  options:
    - Five volts - the divider is symmetrical
    - A little under five volts
    - A little over five volts
    - Ten volts, because the meter is across the supply return
  correct: 1
```

Move the reference clip and you have not adjusted the measurement, you have
changed which measurement it is.

```circuit
title: Where the clip goes decides what you measured
circuit: shared/circuits/divider-differential.benchcircuit
libraries:
  - shared/parts/baseline/library.json
alt: A ten-volt supply across two one-megohm resistors in series. A probe touches the top node at right angles to the wire, and its reference lead runs to the junction between the two resistors rather than to the circuit reference, so the handheld reads the drop across the upper resistor.
caption: The same divider, the same meter. The clip is on the mid-node, so the reading is the top resistor's - and the sheet is where you can see that.
```
