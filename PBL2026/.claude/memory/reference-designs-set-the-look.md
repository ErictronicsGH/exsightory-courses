---
name: reference-designs-set-the-look
description: The owner sends AI-rendered reference images of a stop; match their look closely (lit real objects, reflections, cards, glow) but keep the physics and values right, and say where the reference was wrong
metadata:
  type: feedback
---

Owner, 2026-10-08, on D1·020 card 1's first full-stage stills: *"you designs should look sharp too"*, then five reference
renders (one per block), each a design idea: chevron path stages with icons; numbered colour-coded cards with a coloured
key word and a definition box; real objects lit, with steam, glow pools and mirror reflections on a polished bench top;
signals glowing along cables; a lab backdrop with soft out-of-focus lights; labels as small pills; a glowing title;
the caption with an "i" (or "?" for a question). Also: *"at least the white light in and amber out we can do something
much better for the property measurement"* and *"i dont like that you are using resistor for the quantity. resistor
itself is a component"*.

**Why:** the owner judges by the picture; the references show the finish they expect, and the bench must look as good
as the best renders to hold the room.

**How to apply:**
- Treat a reference image as the target layout and finish; reproduce it in SVG with the kit (`backdrop`, `floor`,
  `reflect`, `steam`, `pill`, seven-segment displays), not as a looser "inspired by".
- **Correct what the reference gets wrong and say so** (in D1·020: taps labelled Ω instead of m, PV 27.0 against a
  STABLE 20.0 set point, a signal line drawn from the coil through the glass to the meter, a reading 3.3755 against a
  statement of 3.3759). Values stay computed, never copied from a render.
- Examples of a concept are real things measured for real (a colorimeter for colour, a caliper for length), never a
  component standing in for a quantity.
Related: [[bench-quality-bar]], [[one-block-at-a-time]], [[real-but-unbranded]], [[design-direction-before-building]].

**Working this way (card 3, 2026-10-08/09):** the owner reviews the live stops in the desktop app's browser pane (launch
entry `animation-bench`, reload after each change) and sends a render per stop ("refine 2a as in the image"); refine that
stop, keep its numbers computed, state the render's errors in the reply (e.g. a 0.00 A supply with a load, 100 Ω where the
numbers need 10 Ω), and let the owner's explicit choices win (e.g. naming the kinds on the tiles).
