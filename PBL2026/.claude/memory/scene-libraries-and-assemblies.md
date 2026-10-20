---
name: scene-libraries-and-assemblies
description: Each instrument scene on a card grid is its own reusable library; an assembly library lays them out and owns the numbers, order, titles, frames and entrances
metadata:
  type: feedback
---

Owner, 2026-10-08, after the D1·020 ¶3 cards were refined: *"we should save each card as a library on its own then they
are assembled to rather arrive at the current view … this way they will be reusable. but the numbers will not be part
of the library but the assembly"*; then "go with your recommendations".

**Why:** a well-made instrument scene (a lamp and light meter, a balance, a spectrometer) is worth reusing on other
cards and other courses; numbering and order belong to the place it is used, not to the scene.

**How to apply:**
- A **scene library** (`kind: "scene"`) holds one instrument set-up, its live behaviour, its declared `params`
  (ranges, periods, sets) and its own words (instrument name, principle line, pills, axis labels). It draws in its
  own viewport; loaded alone, it fills the stage.
- An **assembly library** (`kind: "assembly"`) places several scene libraries on one stage at once, in slots, and owns
  the numbers, the order, the coloured titles, the card frames, the layout, when each slot arrives, and any shared
  note; it may override a scene's words. Assemblies can be units inside a sequence ([[one-block-at-a-time]]).
- Libraries stay self-contained folders configured from `library.json` ([[libraries-decoupled-from-the-bench]]).
