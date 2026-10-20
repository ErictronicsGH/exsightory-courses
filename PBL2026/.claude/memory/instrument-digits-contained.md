---
name: instrument-digits-contained
description: Lit digits on an instrument's glass stay white and sharp, never fogging the glass (no bloom halo, no grey reflection veil); the body is one paint, only the glass black
metadata:
  type: feedback
---

Owner, 2026-10-11, on the bench supply in the light room against their product render: the white digits made the glass
look foggy; *"let the value white lights stay contained as in the image"*; and *"the rest of the body aside the screen
area have the same light charcoal color, it is the lighting that makes it look different"* (then "darken just a bit").

**Why:** bloom spreads over a fixed number of screen pixels, so on a small, distant display the halos cover the whole
glass; a glossy clear coat mirrors a bright room as a grey veil. Neither is how a real LED display looks.

**How to apply:**
- A lit segment's light is emission only (its diffuser dark in room light), kept just under the lab's bloom threshold
  (1.0 since 2026-10-11), so it reads white and sharp; the glass reflects weakly (envMapIntensity ≈ 0.2).
- Paint a body with one colour where the real one is one colour; let the lighting make the tonal differences.
- Printed legends: blended, not alpha-tested (thin strokes vanish at a distance).
- Check in both moods against the owner's reference, measuring pixels, before sending.

Related: [[reference-designs-set-the-look]], [[glass-reads-as-made]], [[component-standard]].
