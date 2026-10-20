---
name: visual-accuracy-same-scale
description: Distributions and counts drawn so a glance gives the truth: one symbol = one reading, same size and step for everything compared, curves as expected counts (area true), never stretched to equal heights
metadata:
  type: feedback
---

Owner, 2026-10-09, on card 5's two meters (D1·020): *"they do not use same balls and do not have same spacing hence it is not
visually evident by inspection that they really differ … we should have same balls at least but different color"*; then
*"make sure the entire bench has these correctness enforced … we want realism, intuition but these should make it easier
for learner to picture things in their mind so the concept has to be visually accurate too"*.

**Why:** I had drawn the handheld's readings as beads and the bench meter's as thin tiles, each stack stretched to fit its
own curve, both curves forced to the same height (the PLAN's exp(−(x−μ)²/2σ²)). Each picture was labelled, but the eye
compared them and was misled: forty narrow readings and forty wide ones looked alike.

**How to apply:** whenever quantities are compared on one picture —
- One symbol is one item (a reading, a shot), the same size and the same stacking step for every series; colour tells
  them apart. A column's height is its count.
- Each instrument's items sit at its own displayed values (its resolution is a fact: whole mV vs tenths), and the axis is
  zoomed so the finest step is at least a symbol wide.
- A curve is the expected count at each displayed value, n · bin/(s√2π) · exp(…): it passes over its own columns, and the
  same n spread wider stands lower. Never normalise curves to one height; if one is far taller, clip it at the frame and
  say so on it, rather than rescale.
- A mapping used once (e.g. 2a's "a hit's left–right place is the reading's error, 1 mV = ½ ring") is used everywhere
  the same picture returns on the card.
- Give the count axis ticks and a label ("readings at each displayed value · one ball, one reading").
Related: [[instruments-read-live]], [[reference-designs-set-the-look]], [[bench-quality-bar]].
