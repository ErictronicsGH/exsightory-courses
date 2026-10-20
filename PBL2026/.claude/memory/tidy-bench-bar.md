---
name: tidy-bench-bar
description: A bench's top bar keeps four controls; grouped choices fold to their current state and open on hover or focus; everything else sits behind an ellipsis that opens on hover or click
metadata:
  type: feedback
---

Owner, 2026-10-11, on the Breadboard Bench bar: *"lets make it into some sort of action button that expands to the
current state hovered or keep on 4 important controls and an ellipsis button that auto expands when hovered or clicked on
so that the top will be tidy"*.

**Why:** the bar had grown to a dozen buttons across the top of the stage; a tidy top keeps the scene the page.

**How to apply:** on the Breadboard Bench the four are the view (Room · Bench · Tour, folded), the camera profile
(2D · 2.5D · 3D · Custom · settings, folded), the active bench's first tool (Grid) and Render; the ellipsis holds the
bench's other tools, lights, light/dark, sound, reset and language. A folded group shows its pressed button (or its own
stand-in) with a small caret, and opens on hover or keyboard focus; the ellipsis opens on hover (closes 350 ms after
leaving) or on a click that keeps it open until a click elsewhere or Escape. Code: src/lab/lab.js (ui), bench.css.
Apply the same shape to every bench we build. Related: [[design-rules-from-the-start]], [[the-lab-is-reusable]].
