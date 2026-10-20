---
name: reuse-done-scenes
description: Always reuse a scene already built (its drawing files, unchanged) when another card needs it; never recreate it — consistency
metadata:
  type: feedback
---

Owner, 2026-10-10, on D1·030 card 1's view 1 (I had redrawn an eye-over-bench comparison): *"we already have such a screen
already right so why not use it instead of recreating a new one?"*, *"we already designed a screen that compared the eye
operation with light operation in the first chapter … use that"*, and *"take note always reuse a scene that has already been
done if we need it in another place. this will also improve consistency"*.

**Why:** a scene the owner has already accepted is the course's picture of that idea; a second drawing of the same thing
splits the look, the numbers and the vocabulary, and costs a review.

**How to apply:**
- Before briefing or building any view, look for an existing library/scene that shows it (libraries/, prototypes/, earlier
  cards' sequences) and propose reusing it in the brief; say which and what (if anything) changes for this card.
- Reuse means loading its drawing files unchanged (copied into the unit, as kits are), driven by this card's input and
  words; changes for the new card go in a thin unit around it, or as a backward-compatible option in the master file.
- Only draw new where nothing exists; then build it as a reusable scene for later cards.
Related: [[scene-libraries-and-assemblies]], [[libraries-decoupled-from-the-bench]], [[one-scale-per-scene]].

**Components too (owner, 2026-10-11):** *"always remember to reuse a component if it has already been modeled"*. Before modelling a
part, check `component-render/` (render.html's builders, the owner's STEP models: uno, oled, bb, ldr, servo90, mic4544, speaker15w,
unowifi; the builders ptfilm, humid, piezo, hall, laptop, phone, usbA, boardStand, spkMotor, micCapsule, servoArm, servoLead,
ntcBead, tcBead, pressureSensor, photodiode, accelBoard, and what follows) and extend a builder with an option rather than write a
second one.
**The course's instruments too (owner, 2026-10-11):** *"we already have a meter design use that meter instead of creating a new
one"*: the course's handheld multimeter is DINKIT's `dmm` (D1·020 cards 3–8; `dmmReading` for its LCD). In a 2.5D scene it is drawn
in place at its depth's scale, square to a near-frontal camera, its leads carried into its own jacks; never remodelled.

