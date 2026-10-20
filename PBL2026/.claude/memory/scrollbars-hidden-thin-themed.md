---
name: scrollbars-hidden-thin-themed
description: Every bench UI hides scrollbars until the area is hovered/focused, then shows a 4 px thumb in the theme's faint ink (light/dark); no track, no arrows
metadata:
  type: feedback
---

Owner, 2026-10-11: *"hide scrollbars by default, make them as thin as possible when they show, and theme them according
to the color scheme"*.

**Why:** scrollbars are visual noise in a teaching surface; when needed they should be barely there and match the theme.

**How to apply:** in every bench or page we build: `::-webkit-scrollbar` 4 px, transparent track and corner, no buttons,
thumb transparent until `:hover`/`:focus-within`, then the theme's faint ink (`--f-faint` at 70 %, `--f-muted` when
hovered); a `@supports not selector(::-webkit-scrollbar)` fallback with `scrollbar-width: thin` and a themed
`scrollbar-color`. Don't set the standard `scrollbar-width`/`scrollbar-color` where the webkit rules should apply (Chromium
ignores the webkit ones when the standard ones are set). Breadboard Bench: end of bench.css. Related: [[design-rules-from-the-start]].
