---
name: cameras-one-list
description: Every camera of the lab (Room, Bench, Ceiling, Floor, 2D, 3D, the author's saved views) is one list (lab.js rig); the picker, saved cameras and the Render panel's groups use it
metadata:
  type: project
---

Owner, 2026-10-12: a ceiling camera, then a floor camera, then *"select which camera we want to use … video making and photo
render … a particular camera or group of camera. all cameras should have a good natural angle and ranges and zoom"*. The
choices were taken as recommended (DECISIONS 2026-10-12).

**Why:** cameras had grown one at a time: lab views, profiles, then the room cameras. One list keeps the picker, the
students' allowances and the renders consistent.

**How to apply:**
- The ids are `v:room|bench|ceiling|floor`, `p:plan|free` and `s:<id>`. `lab.cameras` (`__bench.cameras`) provides list, current,
  poseOf (a pose without going there), place (exact, with roll; leaves out the room-camera fixture within 350 mm),
  go, save, rename and remove.
- Saved cameras are stored in the activity's `camera.saved` (rules.mjs checks id, name, pos, target, a unit up, perspective fov or
  ortho field; at most 24). They are made in Authoring, through the picker's "＋ Save this view…" or ⚙ → Saved cameras….
- Students: the lab's own cameras (`v:*`) are held back when the author holds back 3D. Saved views stay offered.
- Render: from "This view" or "Chosen cameras", ticked in order. A group of stills is one ZIP (render.js zip(), stored
  entries) plus a contact sheet. A group video is a fly-through (slerped orientations, straight moves, lens eased in log)
  or cuts. Both go through encodeVideo(), shared with the turntable.
- The room cameras are in ceilingcam.js (createRoomCam, mount ceiling|floor). Under Orbit, the wheel turns the view (lab.js turnQueue);
  frameNow() finishes any pending turns.
- Tests that read the picker filter out the hidden `free` and the Authoring `+save` options.
Related: [[camera-profiles-standard]], [[design-view]].
