---
name: test-controls-with-a-real-drag
description: verify a bench's hand controls by dragging the drawn part with the pointer tool, never only by dispatching events on the control element
metadata:
  type: feedback
---

A bench part the presenter drives (jockey, knob, slider) must be grabbed where it is drawn. Check it with a real pointer
drag (browser pane `computer` left_click_drag) starting on the drawn part itself, and with `document.elementsFromPoint` at
that spot (the hand-hold must be on top there).

**Why:** 2026-10-09, D1·020 card 3 5a: the jockey's invisible hand-hold sat 30 px above the drawn jockey. My checks
dispatched pointer events on the hold element directly, so they passed, and the owner twice could not grab the jockey.

**How to apply:** size and place each hold over the whole visible part (the jockey: its block down to its pointer on the
scale); in a sequence pick the control by its title and a non-zero rect (every block's controls stay in the page); a part
that moves by itself must keep its hold under it (DINKIT.run `liveControls`). Related: [[controls-built-into-the-hardware]].
