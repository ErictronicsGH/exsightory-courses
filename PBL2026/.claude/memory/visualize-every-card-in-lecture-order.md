---
name: visualize-every-card-in-lecture-order
description: Build the visualizations one after another in lecture order (after the eye); every card needs something demonstrated alongside it, including cards whose PLAN says "Show: none"
metadata:
  type: feedback
---

Owner, 2026-10-08, after the U014 brief: *"let us create the visualizations in order of the lecture. from the eye
visualizaation when is the next according to the lecture? remember every chapter will need something that is
demonstrated alongside to explain the concepts"*.

**Why:** the course is taught from the wall; a card with nothing demonstrated leaves the concept to words
alone. The accepted 2D eye animation set the standard, and the owner wants the rest built in teaching order
rather than unit by unit of specs.

**How to apply:**
- Work in lecture order (course.yaml → modules → cards). After the eye (D1·010 cards 2–4's eye half), the next
  one is card 4's electronic half and the course path (cards 4–7), then D1·020, and so on.
- **Every card gets a demonstration**, including cards whose PLAN says *SHOW none* or *the words carry it*
  (D1·010 card 2, D1·020 cards 1, 2, 4, D1·030 cards 5, 7, 8, D1·040 card 2, D1·060 card 1, D1·080 card 4…).
  Propose one for each; the owner's PLAN text is not changed without them.
- Each visual still follows [[design-direction-before-building]] (plan → owner's direction → build) and
  [[render-visual-milestones]]. Electronics cards stay deferred ([[electronics-bench-in-development]]).
- The look to match is the accepted eye animation (`bench-work/prototypes/eye-to-brain-2d/`): dark ground,
  neon glow lines, numbered callouts, caption bar, stop rail. Related: [[bench-quality-bar]].
