---
name: design-view
description: A bench activity is built in one design view (2D, 2.5D or 3D) chosen by the author; the other views are look-only (camera only, instruments still work)
metadata:
  type: project
---
Owner, 2026-10-12 (on Claude's recommendation): an activity's circuit is placed and wired in **one design view**, chosen up
front by the author; the other views students may open are **look-only**. Built the same day: activity
`design: { view, others }` (`bench-work/components/schema/rules.mjs`), the gate `parts.designHere()` (plugin.js), the
identity row's *Design view* chip in Authoring (frame.js), the look-only banner, the camera picker limited to the
allowed views.

**Why:** in 2D and 2.5D each part is drawn in its own preset view, so a wire neat in one view can cross a part in another.

**How to apply:** any new editing gesture (a new tool, a new kind of part or wire) must go through `parts.canEdit()` /
`canMove()` (which include the design gate), never around it. Wires in 2D/2.5D: a jumper through its board's picture,
a test lead drawn simply between its plugs' pictures (`wires.js layoutDecor`). Operating instruments is not editing:
it stays allowed in look-only views (Claude's call, flagged for the owner). Related: [[connections-snap-and-click]],
[[camera-profiles-standard]], [[select-drag-and-property-pane]].
