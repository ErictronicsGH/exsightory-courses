---
name: screens-and-devices-parked
description: Owner wants every animation consistent on any screen (compact laptops to phones/tablets, students may interact) — parked 2026-10-10 until bench work starts; findings and the gap recorded here
metadata:
  type: project
---

Owner, 2026-10-10: *"ensure that the animation stays consistent on different screens … compact screens as defined in the
parent project … the screens resolution and size does not distort how the animation displays"*, then *"a student needing
to interact … on phone or tablet so we really need to work on this"*, then **parked**: *"for now our focus is on the
lecture so lets pause on that. when we actually start working on benches, we will consider all these."*

**Why:** the course is taught from laptops, but learners may drive a demonstration in Study Mode / Scope on a phone or
tablet; a picture that only works at 1920 × 1080 fails them.

**How to apply (when bench work starts, not before):**
- Our bench today: a fixed 1920 × 1080 stage, `fit()` = uniform scale-to-fit, letterboxed (bench.js): no distortion,
  but it shrinks. Already at full HD some marks render under 9 px (card 9's "3V3" 5.9 px); a phone in portrait would
  show the stage at ≈ 0.2×. Drags map through `getBoundingClientRect`, so they stay right under any scale.
- Our standards already say what to do: bench-design-rules §9 (phone ≤ 767 · tablet 768–1199 · compact 1200–1439 ·
  laptop 1440–1919 · desktop ≥ 1920; responsive is re-composition, not shrinking; 44 px targets on a phone; one finger
  does nothing on the stage, two pinch/pan; hover hides nothing; stills as fallback; walk at 320/768/1200/1440/1920) and
  quality bar C6 (phone portrait first).
- The parent app (InsightDemo, researched 2026-10-10): its benches fill their pane (100 %, container queries,
  ResizeObserver), not a fixed stage; labels grow to a floor (`labelFloor.ts`; drawings `TEXT_FLOOR_PX = 11.5` on a
  1024 × 768 wall); the compact reference is a **1366 × 768** laptop, stress frame **1024 × 768**; desktop window min
  1024 × 640; a docked wall can be ≈ 858 × 483; the wall is letterboxed 16:9; fixed 1920 × 1080 only for recording.
  Embedded HTML widgets are a sandboxed iframe at 100 % of their pane, with no resize/postMessage protocol (our
  `bench:lang` message is our own proposal).
- A measuring script was started (rendered text px, smallest hold, transport size at 12 device sizes) and stopped when
  parked; the method: Electron windows at each size, `getScreenCTM` × font size per text.
Related: [[player-controls-are-the-bench]], [[languages-follow-the-parent-app]], [[bench-quality-bar]].
