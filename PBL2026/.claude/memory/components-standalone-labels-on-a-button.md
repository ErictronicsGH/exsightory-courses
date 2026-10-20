---
name: components-standalone-labels-on-a-button
description: Each instrument or component is its own library (supply, rheostat…), circuits that join them are separate libraries; part labels appear only on a small, quiet, round icon-only button sitting on the part itself (never the bench)
metadata:
  type: feedback
---

Owner, 2026-10-09, on the bench supply built wired to a rheostat: *"i need the power supply library to be stand alone.
with a button to show labels nicely done icon only, and round and not dim nto having much attention. the rheostat too
shold be a component on its own"*.

**Why:** a component made on its own is reusable in any circuit or card. Labels shown all the time (or timed in) crowd
the object; the presenter wants them on demand, with a control that does not compete with the scene.

**How to apply:**
- One library per instrument or component, with its kit file as the reusable master (`bench-supply/psukit.js`,
  `rheostat/rheokit.js`). Anything wired together (`supply-rheostat`) is its own library carrying copies of the kits.
  A component exposes what a circuit sets as declared params (the supply's `loadR`, the rheostat's `current`).
- Part labels are off by default. They come from a button **on the part** (owner, same day: *"the parts label button
  should be on the part not the bench"*), never the bench's tray: `D.partButton(root, {x, y, onClick})`, 36 px, round,
  icon only, a thin ring with the icon in muted ink, lit teal while on; title "Show labels (L)" / "Hide labels (L)".
  Where a scene has several parts, each has its own button naming only itself. L toggles them all. Labels fade in, and
  Reset hides them. Callouts come from `D.callout`, the leader leaving the box's nearest edge.
  Related: [[real-electronics-belong-to-breadboard-bench]], [[scene-libraries-and-assemblies]],
  [[controls-built-into-the-hardware]], [[player-controls-are-the-bench]].

**Numbered tags, not leaders (owner, 2026-10-12):** *"instead of forcing label lines from each part you could just tag the
parts with callout numbers and then define the numbers"*. On the Breadboard Bench: a small numbered tag on each labelled
item (number = order in `labels.items`, stable as the view turns; `labels.at` moves a tag off something it would hide,
e.g. beside a display's unit), one key beside the part (`labels.words` EN/FR), hover links row and tag. No leader lines.
Code: src/lab/partlabels.js. Apply the same to any new component and, by default, to other benches' part labels.
