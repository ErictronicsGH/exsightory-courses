---
name: worktop-is-the-reference-plane
description: In the Breadboard Bench the top of the worktop is the reference plane (z = 0), origin at its centre; a fine grid with snapping and alignment helpers lies on it
metadata:
  type: project
---

Owner, 2026-10-11: *"the top of the table will be our reference plane with a good grid overlay that is fine and allows
snapping within alignment visual helpers"*, with axes indicators.

**Why:** every placement on the bench (parts, boards, instruments later) needs one datum that the grid, snapping, the
2D/2.5D views and the scene files all share.

**How to apply:** units mm; X across the bench to the user's right, Y away from the user (to the back wall), Z up; z = 0 at
the worktop's top surface, origin at its centre (`bench-work/prototypes/breadboard-bench/src/dims.js`). The ESD mat lies on
it (its top at z = 2). Grid 1/10/100 mm, X axis red, Y green, Z blue (triad and origin arrows). Snap steps 1, 2.54, 5, 10 mm,
Alt = free; guides light up on the axes and on mat and worktop edges. Related: [[benches-load-in-studio-as-widgets]],
[[real-electronics-belong-to-breadboard-bench]].
