---
targetMinutes: 25
motivates: A rectified voltage is always positive, and still falls to nothing a hundred times a second.
concepts: [ripple, reservoir-capacitor]
objectives:
  - Say why a supply that looks clean unloaded can be filthy under load.
  - Size a reservoir capacitor for a given load current and ripple.
---

# Smoothing: trading size for steadiness

The rectifier gives you a voltage that is always positive but far from steady.
The smoothing capacitor's job is to hold the voltage up during the gaps. {concept=ripple}

## A capacitor is a tank on the roof

```analogy
A capacitor is a header tank: the pump runs in bursts, the tank covers the
gaps, the tap runs steadily.

A bigger tank varies less; a wider tap, more. So a supply clean when unloaded
can be filthy under load.
```

## The parts you have been sizing, on a real board

```figure
concepts: [reservoir-capacitor]
title: The board itself, and the parts you have been sizing
image: psu-board.jpg
alt: A photograph of a cassette deck's power supply board. Two large brown electrolytic capacitors stand in the foreground, a finned aluminium heatsink rises behind them, a glass cartridge fuse sits to the left, a blue mains filter capacitor sits to the right, and a row of small rectifier diodes runs along the bottom.
caption: Everything Part 1 has described so far, on a board somebody actually built.
aspect: 1.5
labels: numbers
spotlight: blur-dim
leader-weight: normal
leader-tail: ring
effect: glow
motion: steady
provenance:
  origin: system
  licence: free
references:
  - title: Marantz SD-60 power supply board
    author: Wikimedia Commons user Retired electrician
    url: https://commons.wikimedia.org/wiki/File:Marantz_SD-60_power_supply_board_02.jpg
    year: '2016'
    note: Public domain (CC0). Photographed as found, with no parts moved for the picture.
scale:
  from: [0.216, 0.655]
  to: [0.326, 0.655]
  length: 25
  unit: mm
features:
  - id: reservoir
    poly: [[0.216, 0.292], [0.326, 0.284], [0.331, 0.618], [0.222, 0.633]]
    label: Reservoir capacitor
    note: The one you just sized. It is the biggest thing on the board, and that is not a coincidence - the ripple you are willing to accept is what sets its size, and the size is what sets its price.
    colour: teal
    emphasis: spotlight
    effect: draw
    effect-on: both
    motion: slow
    on-click: zoom
  - id: second-rail
    poly: [[0.344, 0.406], [0.445, 0.400], [0.449, 0.655], [0.348, 0.672]]
    label: The second rail's reservoir
    effect: march
    note: A supply with two rails needs two of these. Same equation, different load current - which is why they are different sizes.
    colour: amber
  - id: regulator
    rect: [0.375, 0.066, 0.089, 0.356]
    label: Regulator heatsink
    note: The regulator throws away the difference between what the capacitor holds and what the circuit wants, as heat. Every volt of ripple you did not smooth out is a volt this has to burn.
    colour: violet
    weight: heavy
    effect: pulse
    effect-on: area
  - id: mains-filter
    ellipse:
      centre: [0.596, 0.773]
      radii: [0.055, 0.059]
    label: Mains filter capacitor
    effect: pulse
    note: Not a reservoir. It sits across the incoming mains to keep switching noise out, and it is a class-X part - it fails open, because a capacitor across the mains that fails closed is a fire.
    colour: azure
    line: dotted
    weight: heavy
  - id: fuse
    point: [0.200, 0.723]
    label: 1.25 A fuse
    leader-weight: heavy
    leader-colour: amber
    note: Sized for the primary side, not the secondary. That is the trap the turns ratio sets, and it is why this one is a quarter of the current the load actually draws.
    colour: rose
    on-click: tour
  - id: charge-path
    arrow:
      from: [0.395, 0.760]
      to: [0.310, 0.665]
    label: Where the charge comes from
    tail: ring
    head: arrow
    effect: chase
    motion: quick
    note: The rectifier diodes are along the bottom edge. Twice per mains cycle they refill the reservoir, in a pulse much shorter and much taller than the steady current the load is drawing.
    colour: lime
  - id: heatsink-height
    span:
      from: [0.500, 0.070]
      to: [0.500, 0.422]
    label: Heatsink height
    tail: dot
    head: dot
    leader-tail: bar
    note: Measured off the picture, not typed in. The fin area is what decides how much the regulator can burn before it shuts down.
    colour: orange
zoom:
  - id: reservoir
    feature: reservoir
    label: The reservoir, close up
  - id: bottom-edge
    rect: [0.15, 0.62, 0.40, 0.30]
    label: The rectifier and the fuse
tour:
  - feature: charge-path
    zoom: bottom-edge
    note: Start at the bottom. The diodes hand over the charge, and they only do it near the peaks.
  - feature: reservoir
    zoom: reservoir
    note: This is what holds the voltage up between those handovers. Read the value printed on it and compare it with the number you calculated.
  - feature: regulator
    note: And this is what pays for the ripple you left behind. Everything the capacitor failed to smooth arrives here as heat.
  - feature: fuse
    note: Last, the part nobody sizes carefully. It is on the primary side, so it is a fifth of the current you might expect.
```

## Three parts lifted off the board

```figure
title: Three regions, lifted off the board
aspect: 1.5
alt: Three regions cut out of the board photograph - a pair of upright electrolytic capacitors, the large capacitors beside their heatsink, and the low row of small components - arranged apart from one another on an empty ground.
caption: The same photograph, cut into parts and rearranged. There is no picture behind these; each one is its own file.
labels: numbers
spotlight: dim
leader-weight: normal
provenance:
  origin: system
  licence: free
references:
  - title: Marantz SD-60 power supply board
    author: Wikimedia Commons user Retired electrician
    url: https://commons.wikimedia.org/wiki/File:Marantz_SD-60_power_supply_board_02.jpg
    year: '2016'
    note: Public domain (CC0). The three parts below are crops of this photograph, cut to the shapes an author traced.
features:
  - id: electrolytics
    image: board-part-electrolytics.png
    rect: [0.06, 0.12, 0.2292, 0.2806]
    label: A pair of electrolytics
    note: Cut as a rectangle, which is the least a cut can claim - it says "this area" and nothing about the outline of what is in it.
    colour: rose
  - id: capacitors
    image: board-part-capacitors.png
    poly: [[0.42, 0.1693], [0.5395, 0.0908], [0.6698, 0.15], [0.72, 0.2894], [0.6399, 0.4095]]
    smooth: true
    corners: [2]
    label: The large capacitors and their heatsink
    note: A traced outline with one corner in it. The fitted curve rounds every point it is given, so the one place the boundary genuinely turns has to say so.
    colour: orange
  - id: low-row
    image: board-part-low-row.png
    poly:
      - [0.2702, 0.6696]
      - [0.3757, 0.7016]
      - [0.4156, 0.7177]
      - [0.4408, 0.7337]
      - [0.4481, 0.7433]
      - [0.4496, 0.7497]
      - [0.4487, 0.7555]
      - [0.4459, 0.7609]
      - [0.4342, 0.7715]
      - [0.4259, 0.7769]
      - [0.3994, 0.7894]
      - [0.343, 0.8089]
      - [0.2702, 0.8298]
    smooth: true
    label: The low row
    note: Traced freehand and simplified. Thirteen vertices where the pointer emitted four hundred - few enough to review in a diff, and smooth because the curve is fitted through them rather than joining them.
    colour: magenta
```

## Ripple rises with load and falls with capacitance

```canvas
kind: image
src: ripple-vs-load.png
alt: A plot of peak-to-peak ripple against load current for three capacitor values, showing ripple rising linearly with current
caption: Ripple rises with load and falls with capacitance. Nothing here is free.
```

## The rule of thumb, and where it breaks

For a full-wave rectifier at 50 Hz, the capacitor has about 10 ms to bridge each
gap. That gives a workable estimate.

## How big the reservoir capacitor has to be

```equation
title: Sizing the reservoir capacitor
statement: C = I / (2 * f * Vr)
caption: Every symbol here is a design decision except one, and that one is the rectifier you chose.
source: Any power-supply text; this form is the linear-discharge approximation.
references:
  - title: The Art of Electronics
    author: Horowitz, P. and Hill, W.
    publisher: Cambridge University Press
    year: '2015'
    locator: 3rd ed., section 1.7.16
    note: The ripple estimate this block uses, with the same linear-discharge assumption stated explicitly.
  - title: Linear and Switching Voltage Regulator Fundamentals
    author: Texas Instruments
    year: '2011'
    url: https://www.ti.com/lit/an/snva558/snva558.pdf
    locator: SNVA558
    note: Sizing worked through against a real regulator's dropout, which is where the boundary below comes from.
  - title: Bench measurements, Fenwick Institute
    year: '2026'
    note: The points on the ripple-against-load plot later in this subsection. A 4700 uF reservoir on a 50 Hz bridge.
symbols:
  - name: C
    label: Reservoir capacitance
    unit: F
    note: What you are solving for. The number you take to a catalogue.
  - name: I
    label: Load current
    unit: A
    note: What the circuit downstream draws. Ripple is proportional to it, so a supply that looks clean unloaded can be filthy at full load.
  - name: f
    label: Mains frequency
    unit: Hz
    note: Fixed by the wall, not by you. 50 Hz here, 60 Hz elsewhere, and the difference is worth about 20 percent of your capacitor.
  - name: Vr
    label: Ripple you will accept
    unit: V
    note: A budget you set. Halving it doubles the capacitor, so this is where the cost lives.
  - name: Q
    label: Charge removed between peaks
    unit: C
    note: Only appears in the derivation. It is the bridge between the capacitor equation and the load.
  - name: t
    label: Time between peaks
    unit: s
    note: How long the capacitor is on its own. Full-wave rectification halves it, which is the whole reason full-wave is worth the extra diodes.
  - name: Vpeak
    label: Peak rectified voltage
    unit: V
    note: The top of the sawtooth. It appears only in the boundary — the equation itself never needs it, which is exactly why the boundary is worth stating.
highlights:
  - coefficient: f
    label: The full-wave 2
    note: A full-wave rectifier refills the capacitor twice per mains cycle, so it only has to bridge half as long. Swap it for a half-wave rectifier and this 2 disappears — and the capacitor you need doubles for exactly the same ripple.
  - term: 2 * f * Vr
    label: Everything you are dividing the current by
    note: Read the formula as one division and it stops being four symbols. More refills per second, or more ripple allowed, and the capacitor gets smaller.
assumptions:
  - text: The capacitor discharges linearly between peaks.
    breaksWhen: The load is a large fraction of what the capacitor can supply, so the droop is a curve rather than a ramp.
    severity: simplifying
  - text: The charging pulse is ignored entirely.
    breaksWhen: You are sizing the transformer or the diodes, which see the pulse and not the average.
    severity: limiting
  - text: The ripple is small compared with the peak voltage.
    breaksWhen: Vr climbs past about a fifth of the peak — beyond that this is not an approximation, it is the wrong equation.
    severity: limiting
derivation:
  - statement: Q = C * Vr
    note: The defining relation for a capacitor, applied to the droop you are willing to tolerate rather than to the whole voltage.
  - statement: Q = I * t
    note: Meanwhile the load removes charge at a steady rate. Over one gap, that is current times time.
  - statement: C * Vr = I * t
    note: The same charge, counted twice. Setting the two expressions equal is the only step here that does any work.
  - statement: t = 1 / (2 * f)
    note: A full-wave rectifier peaks twice per cycle, so each gap is half a period. This is where the 2 comes from.
  - statement: C = I / (2 * f * Vr)
    note: Substituted and rearranged for the thing you have to buy.
rearrangements:
  - solveFor: Vr
    note: So if the capacitor is what you have and the ripple is what you want to know.
  - solveFor: I
    note: The other way round again — how much load a given capacitor will carry at a stated ripple.
examples:
  - label: Typical
    note: Halve the ripple you will accept and this number doubles. That is where the cost lives.
    values:
      - name: I
        value: 1
      - name: f
        value: 50
      - name: Vr
        value: 1
  - label: Worst case
    note: Full load, 60 Hz mains, and a ripple budget a linear regulator will actually tolerate.
    values:
      - name: I
        value: 3
      - name: f
        value: 60
      - name: Vr
        value: 0.4
boundaries:
  - when: Vr < 0.2 * Vpeak
    label: Linear-discharge approximation holds
    note: Below a fifth of the peak the droop is close enough to a ramp that this equation is worth trusting.
    kind: valid
graph:
  against: Vr
  domain: [0.1, 3]
  markExamples: true
  hold:
    - name: I
      min: 0.1
      max: 5
      default: 1
    - name: f
      min: 40
      max: 400
      default: 50
  compare:
    name: f
    values: [50, 60, 100, 400]
simulate:
  drive: I
  waveform: square
  amplitude: 1.2
  offset: 1.5
  frequency: 0.4
  seconds: 10
  note: A load that switches on and off — and the capacitor you would need, tracking it.
```

Open the bench: the worked example computes it, and the Assumptions pane says
when to distrust it.

## The charging pulse is the part that bites

That equation is why bench supplies have large capacitors in them.

The capacitor only draws current near the peaks, so it draws a *lot* for a short
time. Your transformer and diodes see peak currents several times the average.

## Back to the diode at full load

```reveal
seed: diode-current
text: >-
  That diode carries nothing for most of the half-cycle, then a short pulse
  near the peak, several times the 1 A load, while the capacitor refills. That
  pulse is why its datasheet gives a repetitive peak current beside the average.
```

## The slope of the droop is the load current {layout=split}

```plot
title: The capacitor's voltage and its slope
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
    tangent: true
markers:
  - at: 10
    label: Next peak recharges it
caption: >-
  Sweep the cursor along the curve. The tangent is the discharge rate, and
  i = C dV/dt makes the load current that slope times C: the slope is the reading.
readout: true
```

## Does the model match the bench readings?

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
    dashed: true
parameters:
  - name: k
    label: Predicted slope
    min: 1
    max: 3
    default: 2.13
    step: 0.01
caption: >-
  The measurements and the model on one pair of axes. Drag the predicted slope
  until the dashed line sits on the data, then compare it with the fitted value.
```

## What does a bigger capacitor do to the diodes?

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

## Size the capacitor for our supply

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

## Questions before we move on

```qa
scope: chapter
```
