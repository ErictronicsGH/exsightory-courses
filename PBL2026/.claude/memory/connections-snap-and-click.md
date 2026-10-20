---
name: connections-snap-and-click
description: Owner 2026-10-12 — connections lock magnetically (capture/release, compatible pairs only) and are made by clicks (end, then place); a multi-terminal part connects only once every terminal is mapped
metadata:
  type: feedback
---
Every connection on the Breadboard Bench (leads into holes, jumper ends, plugs on posts) follows two owner rules:

1. **Magnetic snapping** — an end within reach of a place it fits is pulled in and locks; it comes out only past a wider
   radius (`bench-work/components/conductors/magnet.mjs`: capture 1.2 mm, release 2.2 mm, lift 4 mm). The held place wins
   while inside the release radius, even if a neighbour is nearer. Only compatible pairs attract (a hole takes 0.4–0.7 mm;
   a Φ20 cell's 1.0 mm leads are refused, with the reason). Alt drags without the pull.
2. **Click to connect** — click an end, then the place; the bench forms the conductor itself
   (`conductors/connect.mjs`). **A part with several terminals connects only after the whole map is done** (owner:
   "the connection happens after the click to map is completed"): each lead gets its hole first, then all are formed and
   seated together, lengths kept.

**Why:** the owner wants connecting to feel natural and exact, never fiddly pixel-hunting.
**How to apply:** jumpers (hole → hole) and test leads (post → post/hole) in stage 2b use the same two gestures and the
same modules. Anything that would pass through or short is refused in words, never made then flagged
(nothing passes through anything). Built for wires in stage 2b (`prototypes/breadboard-bench/src/benches/electronics/wires.js`,
`conductors/jumper.mjs`, `conductors/drape.mjs`): the tile takes up the tool, a wire joins its ends' nets, and a wire
follows and goes with the part it is in. Related: [[component-standard]], [[model-components-first]].
