---
name: input-drives-every-output
description: In every animation, the input's strength (light level, source voltage, a knob) must change the output value, and every section, stop, caption and panel that shows a value recomputes from it
metadata:
  type: feedback
---

Owner, 2026-10-08, after the LDR chain (D1·010 card 4) was accepted: *"you have to make sure that the input signal
strength also affect the output value and all sessions that need to be updated"*.

**Why:** a chain whose display shows the same number whatever the input teaches nothing about measurement. The
room must see cause and effect end to end: turn the input, and every stage's value, the code and the displayed
number move with it. In the first build only Explore did this; the guided walk was fixed at 300 lux.

**How to apply:**
- One input per animation, operated through the real object's own control ([[controls-built-into-the-hardware]]),
  available in the guided walk as well as in Explore, not only in a side mode.
- Every value on the surface is computed from that input, never typed in: captions, the signal trace, zoom panels
  (e.g. the SAR search window follows the held voltage), fault values, and what moves (counts, speeds, brightness).
- The set-up value (e.g. 300 lux) stays the default, so the Flow's walk reads as written; a changed input never
  edits the owner's text.
- Check the extremes (off, minimum, maximum) for errors and for numbers that no longer fit their display.
- D1·020's demonstrations get this from the start (card 1's wire temperature, card 4's source, card 8's source knob
  and range dial, card 9's stage tolerances). Related: [[animation-follows-the-flow]], [[bench-quality-bar]].
