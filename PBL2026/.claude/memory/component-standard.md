---
name: component-standard
description: Every bench component (supply, meter, part, board) is defined by a data manifest to one standard; behaviour from trusted engine classes by id; authors may only narrow (cap, lock, hide); 0.1 accepted, supply first
metadata:
  type: project
---

Owner, 2026-10-11: *"we need to create a standard for creating and defining components as each component is supposed to
have its physical abilities"* (controls, properties, connections, view mode, signal tracing, fail mode, allowed
orientation), with authors able to *"define and lock the properties that should be available to the student"*.

**Why:** components are reused across benches and courses; without one manifest each is a one-off, and locks, views,
failures and realism drift. The product already has part classes and profiles (data, never code; closed device laws;
limits; damage; `locked`), so the standard extends them rather than adding a second catalogue.

**How to apply:**
- Four layers: class (engine, trusted code) → component (manifest, data) → activity (author's constraints, narrow only)
  → session (live state, small). Twelve groups: identity, body, behaviour, properties, controls, indicators, terminals,
  representations, trace, failures, orientation, author policy (+ words, labels, sounds, verification).
- A constraint shows on the real object (the LOCK lamp, the part card), never a floating badge: a pot knob gets an end
  stop + amber mark; an **encoder** (endless) holds the value at the cap, blinks it and flashes LOCK (`clampBlink`).
- **Variants** exist in the standard (one default, chosen by the activity), but the supply no longer uses them.
- **The supply is now a programmable switching unit** (owner, 2026-10-11: "lets design this supply instead", their
  reference photo `InsightDemo/Application/rsrc/image_assets/Components/bench supply.avif`; then "go with your
  recommendations"): `exsight.supply.sw3005` 0.2.0, class `instrument.dc-supply.switching@1`, 0–30 V 0–5 A, 110 × 220 ×
  170 mm on 6 mm feet, V/A/W rows, four encoders, OCP/OVP/OUTPUT keys, USB-A/C, posts − GND +, unbranded. The linear
  ls3005 manifest is archived in bench-work/components/_archive/. Its firmware lives in the class file and is shared
  by the validator, its test and the bench; the 3D model is built in code in the Breadboard Bench prototype
  (src/components/supply/).
- Representations answer the bench's camera profile and projection; one 3D model through every camera; `panel` inset
  where the 2D section cuts an instrument away.
- Files: bench-work/components/00-component-standard.md (decisions C1–C7 accepted 2026-10-11: knob end stop + amber mark, map onto the product's part class/profile, models in code now, graded damage, supply gains coarse/fine + OVP + output capacitance, constraints shown on the object, vocabulary), bench-supply/component.json, classes/dc-supply-switching.mjs (+ .test.mjs),
  research bench-work/research/08-component-manifest-research.md. Tracking U040.

Related: [[components-standalone-labels-on-a-button]], [[controls-built-into-the-hardware]], [[real-electronics-belong-to-breadboard-bench]],
[[camera-profiles-standard]], [[first-class-requirements]], [[bench-versus-library]].
- **Preset views, locked** (owner, 2026-10-11): every manifest has `views.2d` and `views.2.5d` (face, azimuth, elevation,
  orthographic, stands, legible, operable), the creator's, never an activity's. 2D/2.5D are laid-out views: ground in
  the profile's projection, each part in its own preset view at one scale (standard §3.8.1, prototype presetviews.js).
  A new component is not done until its two views pass the validator and have stills. See [[camera-profiles-standard]].
- **Setting the views:** Authoring → select the part → Views tab (the creator's section): Face, Turn, Tilt, Stands,
  Smallest legend, Worked in this view, live pictures, the shared check (rules.mjs checkViews), *Component file…* to copy
  the manifest into the course. 2D/2.5D on the bench are live (layout.js).

**One supply only (owner, 2026-10-12):** *"This psu is what we will keep now. when we need any other capabilities we will model it intentionally"*. `exsight.supply.sw3005` is the bench supply; don't add supply variants or revive the linear one (its class and manifest are in components/_archive/). A new capability = a new component, on purpose. Every supply in the lectures is to be replaced with this one (owner, 2026-10-12); the 11 psukit libraries get redrawn, planned first.
