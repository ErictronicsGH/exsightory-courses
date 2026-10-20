---
name: camera-profiles-standard
description: Breadboard Bench cameras (isometric is a projection, not a profile): 2D = ortho top-down + 250 mm section, 2.5D = the owner's own view (perspective 40°, 13.5° elevation, front-dominant); Custom angle set and locked by the author; six-DOF student policy (Free/Range/Locked) per profile
metadata:
  type: project
---

Owner, 2026-10-11: buttons to test 2D and 2.5D; *"a custom view that allows author to set and lock any view angle"*;
in 3D *"author can lock the degrees of freedom they want the students to have"*.

**Why:** one scene seen through fixed, comparable cameras. The owner set 2.5D in three steps on 2026-10-11:
- first 65°, orthographic, top-dominant;
- then *"the 2.5D view should be in the X-Z plane dominant"*, so 20°, orthographic;
- then they set a view by hand in 3D: *"that is what I want you to consider as a 2.5D view"*. It was read off the live
  bench and adopted.

When the owner shows a view, read it from the running page (`__bench.camNow()`) and take it as it stands; do not
re-derive it.

**How to apply:**
- Work frame: z = 0 is the worktop. Azimuth 0° is the user's side, positive towards +X. Elevation 90° is top-down.
- **2D:** orthographic, top-down, front edge at the bottom, a section at +250 mm.
- **2.5D:** perspective, 40° lens, 13.5° elevation, square to the front. Target 130 mm above the mat's centre; the
  field is the owner's 563 mm (the eye 774 mm away). It is not one scale: the front edge is about 2.3 × the back.
- Both are framed on the mat. Their angles are fixed standards; any other angle is a **Custom** view.
- Every profile has a policy over six freedoms: turn, tilt, X, Y, Z and zoom, each Free, Range or Locked. Roll is
  always locked.
- Saving a view is always explicit (spec §9.5).
- **Projections** (separate from profiles): perspective, orthographic, **isometric** (owner, 2026-10-11: added to *"the
  orthogonal, and perspective component"*, not as a profile; a first build as a fifth profile was undone). Isometric =
  orthographic held on a corner, azimuth 45° + k·90°, elevation arctan(1/√2) = 35.264°; a released turn glides to the
  nearest corner. In the view cube (key I) and the Custom profile's panel.
- Full numbers: bench-work/breadboard-bench/04-camera-profiles.md. Code: src/lab/cameras.js.

Related: [[worktop-is-the-reference-plane]], [[solid-objects-rendered-2-5d]], [[the-lab-is-reusable]].

**Since 2026-10-11 (owner):** in 2D and 2.5D these cameras set **the ground only** (worktop, mat, grid); each part is
drawn in its own locked preset view (manifest `views`, standard §3.8.1). 3D and Custom remain one camera through the room.
See [[component-standard]].

**Superseded in part (owner, 2026-10-12): 2D and 3D only.** 2.5D and Custom were dropped after stills showed a 13.5° view
useless for flat work (bench-work/previews/25d-compare/). 3D is the author's: its angle and projection taken by looking,
each freedom Free/Range/Locked, kept in the activity's `camera['3d']`; students are put in it. The 2.5D numbers above are
history. Related: [[design-view]].
