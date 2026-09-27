---
targetMinutes: 25
---

# Why the wall is the wrong voltage {size=huge color=primary}

A bench supply exists to give you a voltage you [chose]{color=amber}, at a
current you [set]{color=amber}, from a socket that offers neither. Everything in
Part 1 is about getting from one to the other without setting anything on fire.

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

The mains socket gives you a high alternating voltage. Your circuit wants a low,
steady, direct one. Four things have to happen in order, and each has its own
failure mode:

- **Step down** the voltage, with a transformer
- **Rectify** it, so current flows one way only
- **Smooth** it, so it stops collapsing to zero a hundred times a second
- **Regulate** it, so it holds still when the load changes {color=muted}

```analogy
A transformer is a gearbox for voltage. A gearbox does not create torque out of
nothing — it trades speed for turning force, and the power going in is the power
coming out, minus what the gears waste as heat.

A transformer trades volts for amps in exactly the same way. Halve the voltage
and you double the available current, minus what the core and windings waste as
heat. Nobody expects a gearbox to produce free horsepower, and nobody should
expect a transformer to produce free watts.
```

Keep [the block diagram](svg:block-diagram.svg) open while we go stage by stage.

***

## What the turns ratio actually buys you

```canvas
kind: svg
src: block-diagram.svg
alt: The transformer stage of the block diagram, highlighted
caption: The first stage, and the only one that changes the voltage.
focus: 0.04 0.10 0.24 0.75
```

A transformer's ratio is fixed by its windings, so a 230 V primary and a 24 V
secondary is a ratio of about 9.6 : 1. That ratio applies to current in the
opposite direction, which is the part people forget when they size the fuse on
the wrong side.

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

```poll
question: Before we go on - have you wound or rewound a transformer yourself?
options:
  - Never
  - Once or twice
  - Regularly
live: true
```
