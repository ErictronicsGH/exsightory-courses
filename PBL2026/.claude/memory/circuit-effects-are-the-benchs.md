---
name: circuit-effects-are-the-benchs
description: Owner 2026-10-20 — circuit signal effects (charge flow, voltage glows) are drawn by the bench, not built into previews or libraries; paused in our pages
metadata:
  type: feedback
---

Owner, 2026-10-20, while I was adding charge-flow dots and voltage glows to the U016 circuits: *"pause on the animation
effect for the circuit the bench is handling that"*.

**Why:** the bench (Electronics / Breadboard, built by ExSightory's Benches lane) owns how a circuit's signals are shown;
a preview or library that draws its own would duplicate it and could disagree with it.

**How to apply:** in previews and specs, circuits show their **state** (switch positions, node voltages and branch
currents as values, codes when the conversion ends) and the plots carry the motion; no drawn charge dots or glows
(`CIRCUIT_FX = false` in `bench-work/previews/u016-preview.src.html`). A spec states what the circuit's signals must
show (which currents, which directions, the physics in [[signal-cues-only-when-needed]]) as a requirement for the
bench, not as our drawing. Related: [[iec-symbols-us-switch]], [[benches-live-in-exsight-benches]].
