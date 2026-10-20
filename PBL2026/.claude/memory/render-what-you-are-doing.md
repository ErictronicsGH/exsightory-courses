---
name: render-what-you-are-doing
description: Owner 2026-10-20 — render every step in the browser pane as an interactive page the owner can drive and annotate, not inline chat widgets
metadata:
  type: feedback
---

Owner, 2026-10-20: *"always render what you are doing so i can follow"*, then *"the rendering has to be in a browser so
i can interract and give you feedback"*.

**Why:** the owner follows the work by driving it (sliders, steps, presets) and answers on the page itself, not by
reading tool output or an inline chat widget.

**How to apply:** each unit gets an interactive page, `bench-work/previews/u0NN-preview.html` (the previews' dark wall
look), served by the `previews` entry in `.claude/launch.json` (python http.server on 8795) and opened in the built-in
browser with preview_start. Every card section carries its controls and a feedback box saved in the page's
localStorage; findings carry choice buttons. Read the owner's answers back with javascript_tool (`localStorage`) when
they say they're done. Update the page as the unit advances (brief → specs → status). Complements
[[render-visual-milestones]] and [[brief-before-each-unit]].
