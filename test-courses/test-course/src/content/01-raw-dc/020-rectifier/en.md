---
targetMinutes: 25
concepts: [rectification]
---

# Rectification: one direction only

A rectifier is the first place a beginner's supply usually goes wrong, because
two of the three common arrangements look almost identical on paper and behave
very differently on the bench.

```canvas
kind: image
src: rectifier-waveforms.png
alt: Three stacked plots showing the same AC input after half-wave, full-wave bridge, and centre-tapped rectification
caption: The same input, three arrangements. Note where the output touches zero.
```

## Half-wave

One diode. It passes the positive half and blocks the negative one, so you get
current for half the time and nothing for the other half. It is cheap, it is
simple, and it wastes half of everything you paid the transformer for.

## Full-wave bridge

Four diodes. Both halves of the cycle are used, so the output touches zero twice
per cycle rather than sitting at zero for half of it. That doubles the ripple
frequency, which matters more than it sounds: it halves the capacitance you need
downstream for the same [ripple](glossary:ripple).

### What the bridge costs: 2V~F~ and I^2^R

The cost is two diode drops in the path instead of one — about 1.4 V gone before
your circuit sees anything, so V~out~ ≈ V~peak~ − 2V~F~. The winding pays too: its
loss grows as I^2^R, so the bridge that halves the ripple does not halve the heat.

```flash
question: A bridge rectifier is fed from a 12 V~RMS~ secondary. Roughly what peak DC does the smoothing capacitor charge to?
options:
  - About 8.6 V, V~RMS~ ÷ √2
  - About 12 V, V~RMS~ itself
  - About 15.6 V, V~RMS~ × √2 − 2V~F~
  - About 24 V, 2 × V~RMS~
correct: 2
timerSeconds: 45
```

```analogy
A bridge rectifier is a turnstile that funnels people walking in both directions
into a single corridor going one way. Nobody is turned away, which is the whole
point — but every person pays the turnstile a small toll on the way through, and
with a bridge each one pays twice.
```

```canvas
kind: pdf
src: diode-datasheet.pdf
page: 1
caption: The rectifier datasheet. We want the forward voltage and the average forward current.
```

```quiz
title: Check - choosing a rectifier
number: "1"
objective: Whether you can pick a rectifier topology and defend the choice
timerSeconds: 240
questions:
  - prompt: Compared with half-wave, a full-wave bridge produces ripple at...
    options:
      - Half the frequency
      - The same frequency
      - Twice the frequency
    correct: 2
  - prompt: The main cost of a bridge over a centre-tapped rectifier is...
    options:
      - Two diode drops instead of one
      - Twice the ripple
      - A larger transformer
    correct: 0
  - prompt: Peak inverse voltage matters because...
    options:
      - It sets how hot the diode runs
      - A diode that cannot block the reverse peak will fail short
      - It determines the output current
    correct: 1
```
