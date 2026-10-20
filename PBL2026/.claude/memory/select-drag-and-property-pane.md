---
name: select-drag-and-property-pane
description: Bench frame = library (left, foldable) | bench in focus | properties (right, on selection); Authoring all, Edit as allowed, View interactions only, Preview a clean thumbnail render; parts selectable and draggable
metadata:
  type: feedback
---

Owner, 2026-10-11 (mid-build of the four views): *"during authoring, any selected components should have a property pane
that can use to customize the component"*; *"components should be draggable"*.

**Why:** authors build a bench activity by picking a part and setting it up where it stands, as in the Electronics
Bench renders' Selected Component; a part pinned in place reads as a picture, not a bench.

**The frame around them (owner, same day):** three regions only: ① library by function (left, foldable), the bench in
focus (centre), ② properties (right, shown only with a selection). Authoring = full ability; Edit = only what the author
allows; View = the bench with only the allowed interactions (no panels, no selection); Preview = a clean render of the
bench's content as a slide thumbnail. Never bring back dashboard panels (charts, rails, docks) without the owner asking.

**How to apply:**
- Every new component (meter, breadboard, R, LDR…) joins `benches/electronics/parts.js` (select, drag, rotate) and gets
  its pane from `src/lab/inspector.js` through its manifest alone: no per-part UI code. Its manifest must carry
  `body.bounds`, `orientation.surfaces/rotations`, and `body.clearance` where it has vents.
- Moving follows the surfaces, never through other things; Authoring writes `activity.place`, View/Edit only as the lesson
  matrix allows and for the session. See [[component-standard]], [[test-controls-with-a-real-drag]].
- **Onto the bench from the library** (2026-10-11): a new built component joins `FACTORY` in `benches/electronics/plugin.js`
  (and gets `ref` in catalogue.js) and its tile becomes draggable; each drop is a new instance. Its component API must
  offer `dispose()` (listeners on an AbortController) so a part taken off stops answering the pointer. Tile images need
  `draggable="false"` or the browser's image drag swallows the pointer.
- **No Views tab in the pane** (owner, 2026-10-11): the pane has Properties · Limits · Effects · Faults and *Edit component…*
  (*View component…* when read-only); the component's own settings live in the Component Editor ([[component-editor]]).
- **The stage toolbar, top centre** (owner, 2026-10-11, DECISIONS): View = Orbit · Pan · Zoom | Fit | Grid + step | shot ·
  full screen · More; Authoring/Edit add Select and Move and Snap; the lab's old bar is hidden in the frame, its items in
  More. Parts drag only with Move (in View with Orbit, where the lesson lets them). frame.js drawTools; lab.js setTool.
