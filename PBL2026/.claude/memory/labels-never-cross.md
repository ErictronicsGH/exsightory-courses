---
name: labels-never-cross
description: Callout and tag leaders never cross each other, text, curves or the parts they don't name; labels ride with moving parts and never overlap them; checked on full-size captures of every frame that shows them
metadata:
  type: feedback
---

Owner, 2026-10-10, during card 7's motion: *"refine the labels and tags and avoid label line crossing"*, after *"the cup is
clipped in 4a"* and *"check the sensor module to adc and mcu to display signal alignment. it is misaligned"*.

**Why:** crossing leaders, a label sitting on a part, a cable meeting its trace a few pixels off, or a part leaving the stage read
as careless on the wall and break the professional-design gate ([[first-class-requirements]]).

**How to apply:** place each callout so its leader runs through empty space (above its part, between scale numbers, into a
gap); a tag on a moving part points at a fixed feature of it (a clamp's jaw) and moves with it; two labels that could collide
show one until they have room. Every cable continues straight into the trace or terminal it feeds (same height). For moving
parts, compute their extreme reach over the whole motion and keep it inside the stage. Check on full-size Electron captures
(the pane's screenshots are too small), at the motion's key moments, EN and FR. Related: [[test-controls-with-a-real-drag]].
