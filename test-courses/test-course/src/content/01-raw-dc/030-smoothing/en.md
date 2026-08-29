---
targetMinutes: 25
---

# Smoothing: trading size for steadiness

The rectifier gives you a voltage that is always positive but far from steady.
The smoothing capacitor's job is to hold the voltage up during the gaps.

```analogy
A smoothing capacitor is a header tank on a roof. The pump runs in bursts, but
the tap runs steadily, because the tank covers the gaps between bursts.

Make the tank bigger and the pressure at the tap varies less. Open the tap
wider and it varies more. That is the whole design trade, and it is why a supply
that looks clean with nothing plugged in can be filthy under load.
```

```canvas
kind: image
src: ripple-vs-load.png
alt: A plot of peak-to-peak ripple against load current for three capacitor values, showing ripple rising linearly with current
caption: Ripple rises with load and falls with capacitance. Nothing here is free.
```

## The rule of thumb, and where it breaks

For a full-wave rectifier at 50 Hz, the capacitor has about 10 ms to bridge each
gap. That gives a workable estimate:

**C ≈ (I × t) / V_ripple**

At 1 A with 1 V of allowed ripple, that is 0.01 F — 10 000 µF. This is why bench
supplies have physically large capacitors in them, and why the estimate is only
an estimate: it assumes the capacitor discharges linearly and ignores the
charging pulse entirely.

That charging pulse is the part that bites. The capacitor only draws current
near the peaks, so it draws a *lot* for a short time. Your transformer and
diodes see peak currents several times the average.

```plot
title: The capacitor's voltage, and the current that follows from its slope
xLabel: Time through one ripple cycle (ms)
yLabel: Capacitor voltage (V)
domain: [0, 20]
variable: t
parameters:
  - name: sag
    label: Droop under load
    min: 0
    max: 6
    default: 3
    step: 0.25
    unit: V
curves:
  - expression: 24 - sag * (t / 10 - floor(t / 10))
    label: Capacitor voltage
    colour: teal
    tangent: true
markers:
  - at: 10
    label: Next peak recharges it
caption: >-
  Sweep the cursor along the curve. The tangent is the discharge rate, and
  i = C dV/dt says the current the load is drawing is that slope times the
  capacitance — so the slope is not a decoration, it is the reading.
readout: true
```

```plot
title: Ripple against capacitance, measured and modelled
xLabel: Load current (A)
yLabel: Ripple, peak to peak (V)
domain: [0, 3]
series:
  - label: Bench readings, 4700 uF
    style: points
    fit: linear
    points: |
      0.25, 0.58
      0.50, 1.09
      0.75, 1.66
      1.00, 2.11
      1.50, 3.24
      2.00, 4.31
      2.50, 5.28
      3.00, 6.44
curves:
  - expression: k * x
    label: Predicted, V = I t / C
    colour: amber
    dashed: true
parameters:
  - name: k
    label: Predicted slope
    min: 1
    max: 3
    default: 2.13
    step: 0.01
caption: >-
  The measurements and the model on one pair of axes, which is the only way to
  see that the model is good. Drag the predicted slope until the dashed line
  sits on the data, and compare what you chose with the fitted value below.
```

```poe
prompt: You double the smoothing capacitance to halve the ripple. What happens to the peak current the rectifier diodes have to survive?
options:
  - It halves as well
  - It stays about the same
  - It goes up
correct: 2
explanation: >-
  It goes up. A larger capacitor is charged over a shorter part of each cycle,
  because it only draws current while the incoming waveform is above the voltage
  it already holds - and a bigger capacitor sags less, so that window is
  narrower. The same charge delivered in less time is a higher peak current.
  Smoothing is not free; you pay for it in diode and transformer stress.
```

```checkpoint
instructions: |
  Work out the smoothing capacitor for the supply we are building.
  Assume a full-wave bridge on 50 Hz mains, 2 A maximum load, and no more
  than 1.5 V peak-to-peak of ripple at that load.
items:
  - Write down the time the capacitor must bridge between peaks
  - Apply C = (I x t) / V and get a value in microfarads
  - Round up to the nearest standard value
  - Check the voltage rating against the peak, not the RMS
```

```qa
scope: chapter
```
