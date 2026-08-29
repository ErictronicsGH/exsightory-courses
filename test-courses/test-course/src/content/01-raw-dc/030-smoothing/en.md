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
