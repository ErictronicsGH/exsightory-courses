---
targetMinutes: 25
motivates: The wall offers 230 volts AC, and the circuit on the bench wants a few volts DC that you chose.
concepts: [step-down]
objectives:
  - Choose a transformer's turns ratio for the voltage a supply needs.
---

# Why the wall is the wrong voltage {size=huge color=primary}

A bench supply exists to give you a voltage you [chose]{color=amber}, at a
current you [set]{color=amber}, from a socket that offers neither. Everything in
Part 1 is about getting from one to the other without setting anything on fire.

```flow
Start with the socket on the wall behind you, and point at it.

[[ask]] Who here has ever plugged something in and smelt it before they saw it?

[[pause]]
```

## Four stages between the socket and your circuit

```canvas
kind: svg
src: block-diagram.svg
alt: Four stages in series - transformer, rectifier, smoothing capacitor, regulator - with the waveform sketched beneath each
caption: The whole supply in four stages. Each one fixes exactly one problem.
references:
  - title: Redrawn for this course
    author: Fenwick Institute for Applied Electronics
    year: '2026'
    note: The stage names follow the order a supply is built in, not the order a textbook usually presents them.
  - title: IEC 60617 graphical symbols for diagrams
    publisher: International Electrotechnical Commission
    url: https://std.iec.ch/iec60617
    note: The symbol conventions the waveform sketches follow.
```

Keep [the block diagram](svg:block-diagram.svg) open while we go stage by stage.

## Step down, rectify, smooth, regulate

The mains gives a high alternating voltage; your circuit wants a low, steady,
direct one. Four things happen in order:

- **Step down** with a transformer
- **Rectify**, so current flows one way
- **Smooth** away the zero-crossings
- **Regulate**, so it holds when the load changes {color=muted}

## A transformer is a gearbox for voltage

```analogy
A gearbox does not create torque: it trades speed for turning force, power in
for power out, less heat.

A transformer trades volts for amps. Halve the voltage, double the current.
Nobody expects a gearbox to produce free horsepower.
```

```flow
The gearbox is the picture to keep: **power in is power out**, less the heat.

[[transition]] Now the ratio itself, and what it costs on the other side.
```

## What the turns ratio actually buys you

```canvas
kind: svg
src: block-diagram.svg
alt: The transformer stage of the block diagram, highlighted
caption: The first stage, and the only one that changes the voltage.
focus: 0.04 0.10 0.24 0.75
```

A transformer's ratio is fixed by its windings, so a 230 V primary and 24 V
secondary is about 9.6 : 1. The current ratio runs the opposite way, which
people forget when they fuse the wrong side.

## Which side carries the bigger current?

```poe
prompt: A transformer steps 230 V down to 23 V. The load draws 2 A from the secondary. Ignoring losses, roughly what current flows in the primary?
options:
  - About 0.2 A
  - About 2 A
  - About 20 A
correct: 0
explanation: >-
  Power in equals power out. The secondary delivers 23 V x 2 A = 46 W, so the
  primary must supply the same 46 W at 230 V, which is 0.2 A. The voltage went
  down by ten, so the current went up by ten - on the secondary side. A fuse
  chosen for 2 A and fitted to the primary would never blow.
```

## Have you ever wound a transformer?

```poll
question: Before we go on - have you wound or rewound a transformer yourself?
options:
  - Never
  - Once or twice
  - Regularly
live: true
```
