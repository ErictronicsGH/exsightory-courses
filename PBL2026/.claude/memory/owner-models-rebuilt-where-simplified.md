---
name: owner-models-rebuilt-where-simplified
description: Use the owner's 3D models, but where a model simplifies a part (a solid cone, a solid magnet block) rebuild that part as it really is, on the model's own profile and size; materials as the real part (paper cone matte, never metal)
metadata:
  type: feedback
---

Owner, 2026-10-11, on D1·030 card 2's loudspeaker: sent their own STEP models mid-build (Speaker_15W_4Ohm_STEP.stp, SERVO
MG995R.step) after I had modelled both myself, then *"the speaker diaphragm doesnt look realistic"* with a reference render
(a cut-away driver: thin black paper cone and dust cap, amber spider, bright machined steel, copper coil in the gap).

What was wrong: the model's cone is a solid up to 5.5 mm deep and its magnet one block, so the cut showed a hollow wedge and no
gap; I had also mapped the cone's grey to a polished metal finish.

**Why:** a cut-away shows the inside, and a part the model fakes looks fake the moment it is cut; the owner judges by the picture
(gate 1, realism ≥ 95 %).

**How to apply:**
- When the owner gives a model, use it (frame, basket, terminals, case) and check each part a cut or a close-up will show:
  slice it (a section through the axis) before rendering.
- Where the model is simplified, rebuild that part as the real one at the model's own size and profile (thin shells for a
  cone and a dust cap, a magnet assembly with its plates, pole, gap and coil), leave the model's faces for it out, and say so
  in the README.
- Materials as the real part: pressed paper is matte with a soft sheen, never metal; steel machined and bright; the spider's
  doped cloth amber.
Related: [[reference-designs-set-the-look]], [[image-based-component-libraries]], [[bench-quality-bar]], [[first-class-requirements]].
