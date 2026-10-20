---
name: hand-on-turned-controls
description: when a motion turns a control, the owner wants a realistic hand on it (stage and enlarged window); drawn SVG hands failed the realism gate, use the owner's hand image
metadata:
  type: feedback
---

When a motion turns a control (a knob, a dial), the owner wants a real-looking hand on it, on the stage and in any enlarged
view of it (D1·020 card 8, 4a, 2026-10-10: their reference render showed one, then "image of the hand you can use").

**Why:** the cause has to be seen. A knob that turns by itself reads as a glyph, not as what happens at the bench. Two hands
drawn in SVG (stroked tubes, then tapered shaded outlines) failed gate 1: stick fingers and a claw. They are archived in
`bench-work/libraries/_archive/card8-hand-attempt/`.

**How to apply:** use the owner's hand image (`bench-work/libraries/spec-kit/assets/hand-knob.png`) through
`spec-kit/prep_hand.py`, which cuts away its ground and its own knob, takes the glow off the pads, draws the pads in to the
control's rim at the rig's scale (2.76 px a mm, image scale 0.55), and splits it into a back layer (the whole hand, under the
control) and a front layer (thumb and index, over it). Turn it so the pointer and the marks that matter stay in the opening
between thumb and index finger. Mirror it for a left hand. Keep the control still while the hand slides in and out. Don't
draw a hand from scratch again. If the owner pastes an image, read it off the clipboard (PowerShell
`[System.Windows.Forms.Clipboard]::GetImage()`): a pasted image is not on disk. Related: [[first-class-requirements]],
[[reference-designs-set-the-look]], [[real-process-not-glyphs]].
