---
name: image-based-component-libraries
description: For the 2D benches, realistic component libraries are built from a base image the owner supplies, rectified to the part's plan and drawn through the bench camera (2.5D), with the working functions overlaid in the same perspective
metadata:
  type: feedback
---

Owner, 2026-10-10, while an Arduino UNO photo was turned into a library for D1·030 card 1: *"i think for 2D bench we can adopt
this style to create realistic libraries for specific components. i give you a base image then you overlay the functions we
need over it in a 2.5D perspective"* (and before: *"create an arduino library as stand alone and import it"*, the same for an
OLED module).

**Why:** hand-drawn SVG parts never reached the realism gate; a real (or rendered) photo of the part does, and overlays keep it
working and accurate.

**How to apply:**
- One standalone library per component (folder, library.json, its own view with a labels button; kit file = master, copied into
  the units that use it), its base image in `assets/`, a `make_*.py` that rectifies the image onto the part's plan (mm, from
  the part's real dimensions), cuts away the background, and paints out what is wrong or must be live.
- The kit draws the rectified plan through any bench camera (a projection function), piecewise-affine, and overlays the
  functions in the same perspective: live readouts, sockets/pins (positions from the real part's drawing), leads, labels.
- Check the image against the real part: an AI-made image may have wrong print or pin counts; repaint or redraw those parts
  (accuracy gates). Say what was corrected in the README.
Related: [[components-standalone-labels-on-a-button]], [[reuse-done-scenes]], [[one-scale-per-scene]], [[first-class-requirements]],
[[real-but-unbranded]] (the owner kept the UNO's maker marks: an exception, 2026-10-10).
