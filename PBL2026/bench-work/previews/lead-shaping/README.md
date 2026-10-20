# Shape mode: bending leads, wires and cables in 3D (layout still, 2026-10-12)

`shape-mode.png` (made by `make_shape_mode.py` from real geometry: the Φ5 · 5528 market version, its formed leads,
a breadboard's holes on lead a's grid). For the owner's direction before stage 2 is built.

**The owner's asks (2026-10-12):** bend leads (angle, length) by hand; a grid cage round the part to read angles and
lengths; double-click a lead to place a bend; the same bending for wires and cables (wire harnessing); drag in 3D,
guided, with a grid and snapping; the grid's origin the middle of the terminal or wire being routed; 15° bends, Shift
for 1°; a 3D guide that makes tracing natural; KiCad's ideas (clearance, width…); active in Authoring and Edit.

**The design shown:**
- **The cage**: 1 mm ticks, 5 mm labels, the 2.54 mm holes on its floor, its origin midway between the leads.
- **The working plane**: through the held bend, Y–Z here (Tab: the next plane; X · Y · Z lock an axis); 15° snap rays
  (Shift 1°, Alt free); the protractor reads the bend; the run beyond the bend is rigid (the wire's length kept).
- **Depth**: a drop line from the tip to the board, its height; the nearest hole lit (release to insert).
- **Conductor classes** (KiCad's net classes): width, clearance (a design rule, KiCad's 0.2 mm default), bend radius
  ≥ 1 × d (ECSS-Q-ST-70-61C §8.2.7b), first bend ≥ 3 mm from a photocell's body (an analog rule: no maker gives one),
  re-bending warned after 3 (ECSS §8.2.7j). Numbers: `bench-work/components/conductors/classes.json` (research 12).
- **Rule check** (KiCad's DRC) and the **router** modes: highlight collisions now; walk-around and shove with harnesses.
- **Wires and cables**: one core (`components/conductors/bend.mjs`); solid wire keeps its bends; a stranded cable hangs
  between waypoints under its weight (16 g/m, radius ≥ 3 × Ø).

**Stages:** 1 the core (built: bend.mjs, classes.json, tests 40/40); 2 Shape mode (the cage, the plane, drag, insert,
jumper wires, hanging cables); 3 bend points by double-click, typed values, cut to length; harnesses (bundles, ties,
walk-around and shove).

**Added (owner, 2026-10-12): insulation and nets.** Every conductor knows where it is bare (a lead all along, a jumper
at its stripped ends) and every terminal what of it is bare (`exposure`: bare, bare-tip, shrouded, insulated). Bare
metal of different nets keeps the clearance (touching is a short); one net may touch; insulation may touch anything;
nothing passes through anything (`components/conductors/collide.mjs`). Shape mode will show a breach live: the
pair lit red with its gap, as KiCad's "highlight collisions".
