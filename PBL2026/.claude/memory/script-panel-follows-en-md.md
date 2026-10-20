---
name: script-panel-follows-en-md
description: transcript.en.md (the script panel) copies lines from en.md and drifts when en.md is edited; sync it whenever a module's en.md changes
metadata:
  type: project
---

Each module's `transcript.en.md` repeats lines of its `en.md`: the arc (each card's statement, first sentence), "What the
wall shows" (each PLAN SHOW's first line) and the hand-off (the `[[transition]]`). Editing `en.md` does not update it.
Found 2026-10-20 (U019): D2·010's panel still had the ESP32 (removed by N1), card 7's pre-F4 formula and the old
transition.

**Why:** the presenter reads the panel live; a stale line is something the room may hear, and the course cannot misinform
([[course-cannot-misinform]]).

**How to apply:** after every change to a module's `en.md`, diff those three parts of `transcript.en.md` against it and
sync them (derived text, not the owner's wording); include the panel in each module's accuracy check.
