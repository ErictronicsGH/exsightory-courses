---
name: solid-objects-rendered-2-5d
description: In a 2D library every solid object (instruments, glassware, hotplates, parts, leads) is a 3D render through the bench camera (2.5D), not a flat SVG drawing; live parts overlaid through the same camera
metadata:
  type: feedback
---

Owner, 2026-10-11, on D1·030 card 3's rig (D1·020's 2D beaker, hotplate and handheld redrawn in SVG): *"the thermometer or
thermocouple bead is not really visible and it is far from reality. the meter value is not changing to show that something is
even happening. the thermometer and boiling setup is far from realistic remember solid objects in 2D mode should be rendered as
2.5D"*.

**Why:** flat vector drawings of real hardware fail gate 1 (realism ≥ 95 %) next to the rendered benches of D1·030 cards 1–2;
the owner reads a flat drawing as "far from reality".

**How to apply:** build the scene in `component-render/` (owner's STEP models where they exist, else modelled at real size in
render.html), render it through the bench's camera as a transparent picture, and overlay only what is live (displays, glows,
bubbles, moving parts as per-angle pictures) through the same camera (CAM3/project), as cards 1–2 do. Small items the point
depends on (a thermocouple bead) are made visible by a close camera or a lens, never by enlarging them. Something must visibly
happen: a reading that changes with its cause. Reusing an older 2D drawing is not enough when the card needs realism; the
older card keeps its own. Related: [[one-scale-per-scene]], [[image-based-component-libraries]], [[reuse-done-scenes]],
[[first-class-requirements]], [[owner-models-rebuilt-where-simplified]].

**The camera (owner, 2026-10-11, card 3: "the perspective of the camera is not natural … the object perspectives should be
streamlined"):** a product photograph's view: about 14° down, from far enough with a longer lens (≈ 35° field) that the side objects
are not stretched; the parts square to the camera on one front line, as they would stand on a bench. Labels sit tidily on the
objects they name (the meter's on top of it). A steep, close camera (36° down, wide) read as unnatural.

