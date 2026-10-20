---
name: one-block-at-a-time
description: A card's demonstration shows one block at a time, each taking over the whole stage as the Flow reaches it; blocks are separate reusable unit libraries joined by a sequence library; the bench's transport is the only transport
metadata:
  type: feedback
---

Owner, 2026-10-08, on the D1·020 card 1 still (all blocks at once): *"to show all of them at the same time is not a good
one so we need to control each block according to the flow so that a block will be promoted to the view at a time to
take over the entire view nicely"*; *"we can split all of them into individual loadable library units … this way they
will be reuseable"*; then, agreeing to unit libraries + a sequence library and a two-level rail: *"since we now do one
block at a time then it need no sub-control buttons"*.

**Why:** a wall crowded with every block competes with the presenter's words; one block at a time follows the Flow.
Unit libraries can be reused on other cards with other settings. One transport (the bench's) keeps the presenter's
clicker and the wall's mirrored state simple.

**How to apply:**
- A still for direction may show everything at once, but the demonstration promotes **one block at a time to the full
  stage**, with a smooth hand-over owned by the bench.
- Each block is its own **unit library** (folder + `library.json` with declared `params`); a card loads one
  **sequence library** that lists the units in Flow order with their params and the paragraphs they take. The card
  keeps one bench block (EAC: one block per card).
- **No transport inside a block**: the bench's Previous / Play / Reset / Next step through the block's own steps and
  then into the next block; the rail shows blocks with their steps. A block keeps only the controls built into its
  hardware ([[controls-built-into-the-hardware]]).
Related: [[player-controls-are-the-bench]], [[libraries-decoupled-from-the-bench]], [[animation-follows-the-flow]].
