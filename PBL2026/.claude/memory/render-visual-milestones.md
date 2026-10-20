---
name: render-visual-milestones
description: When work reaches a visual milestone (a drawing, plot, layout or prototype designed in a spec), render it and show the owner, don't just describe it
metadata:
  type: feedback
---

Owner, 2026-10-08, during U011: *"also when you reach any visual milestones render it for me to see"*.

**Why:** specs describe drawings and plots in tables of ids and coordinates; the owner judges a visual by
seeing it, and sees mistakes sooner that way.

**How to apply:** when a spec fixes a drawing's layout, a plot's curves, a figure's tour or a prototype's
look, render a preview from the spec's own numbers (a script-generated SVG/HTML in
`bench-work/previews/`, or a screenshot of a prototype) and send it with SendUserFile (`display:
render`). Label it a preview, not the bench's own rendering. One preview per milestone, re-sent only when
it changes. Related: [[prototype-capture]], [[authoring-first-specs-per-activity]].
