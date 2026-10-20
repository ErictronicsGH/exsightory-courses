---
name: bench-versus-library
description: A bench is the platform (interface and controls); a library is a specific unit of content loaded into a bench to be played or viewed — every spec names both
metadata:
  type: feedback
---

Owner, 2026-10-08: *"a bench create the general platform and define interface and controls that can be
used to manipulate libraries. a bench library is a specific unit of the bench that describes something.
for instance in our case the library could be the threejs animation for the light reception process from
the eye all the way to the brain. a library is loaded to be played/viewed in a bench. so understand the
difference"*. Said while U010's specs were being written.

**Why:** specs had been blurring the two ("the bench shows the eye", "the prototype is the bench's code
source"). The bench is built once by ExSight and serves every course; a library is what an author makes
for a card and loads into it.

**How to apply:**
- Every spec's yaml names the `bench` (the platform) **and** the `library` it loads (the eye-to-brain
  three.js animation; the cold-open circuit; the course path drawing). §11 (assets) lists libraries;
  §12 (capabilities) lists what the bench must offer to play them.
- A capability belongs to the bench (step, scrub, key views, part cards, ink); content belongs to the
  library (parts, stops, `say` lines, values). Never ask a library to provide a control, or a bench to
  hold a card's content.
- **Animation libraries may be code, made safe** (owner, same day: *"unfortunately the 3js and other
  animation libraries will have to be codes so there should be some form of sandboxing … compiled or
  inspected or written in the bench or any other better means"*). The layers are capability list C79:
  built in the bench from source, inspected at build, run sandboxed with no network, proved
  deterministic, digest-pinned and signed, stopped on overrun. This departs from InsightDemo's
  *"a library is data and never code"* (2026-09-01) for the Animation Bench only, and is still to be
  raised with ExSight (STATE). Other benches' libraries stay data. Related:
  [[three-d-bench-is-modelling]], [[design-rules-from-the-start]].
