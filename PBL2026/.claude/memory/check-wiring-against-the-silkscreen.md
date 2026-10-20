---
name: check-wiring-against-the-silkscreen
description: Every lead's socket is checked against the board model's printed labels (a close render), not only a pin table; a wrong socket can be a short
metadata:
  type: feedback
---

2026-10-11, D1·030 card 2's six-gate pass: a close render of the UNO model's digital header showed that card 1's AREF lead
had sat in the **GND** socket since card 1 was built (the pin table's u 26.416 is GND; AREF is u 23.876). On a real bench that
lead would short the 3.3 V rail to ground. Fixed, card 1 re-rendered (`component-render/layout_card1.py UNO_PINS`).

**Why:** gate 2 (science 100 %) covers the circuit as wired, not only the numbers; a lead one socket off looks right in a
render and is wrong (or dangerous) on the bench. Pin tables copied from memory or nominal drawings drift from the model.

**How to apply:** before sending any wired bench, render the headers close (a camera over the board, as out/test/hdr-test.png)
and read each lead's socket against the silkscreen; take pin positions from the model's own header geometry. Also check the
order of a servo or sensor plug's cores against the sockets they go to, so leads do not cross. Related:
[[first-class-requirements]], [[drawing-and-numbers-agree]], [[real-electronics-belong-to-breadboard-bench]].
