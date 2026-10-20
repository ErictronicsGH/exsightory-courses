---
name: animation-player-controls
description: Every animation gets Previous / Play-Stop / Next, a Cards toggle (reveal cards off by default), traced signal movement, and context panels (like the eye) that toggle off and hide on Play
metadata:
  type: feedback
---

Owner, 2026-10-08, on the LDR-chain still: *"we should be able to toggle the eye section off to give more focus to the
electronics demonstration. again we need prev, play/stop, and next and when we begin to play the eye image side
should hide … the signal movement should all be traced … the reveal cards … should have a toggle and should be off
by default so presenter can decide to turn on."*

**Why:** the presenter drives the wall; extra panels and explanation cards compete with the demonstration unless
the presenter asks for them. Tracing every movement keeps cause and effect visible (nothing jumps).

**How to apply** (every animation from now on, not only this one):
- Player: Previous, Play/Stop, Next, a stop rail; keyboard ← → and Space.
- **The transport keys' look** (owner, 2026-10-08, on the Animation Bench: *"make them round buttons and icons only
  give them the universal colors and icons"*, then *"the reset icon is not good"*, *"make it square icons and put the
  names under the icon"*, *"the text should be within the square"*, then *"move the bench control buttons to the right
  side of the topbar"* and *"get rid of the square and the text and just keep the icons according to the theme
  color"*): **at the right of the top bar, icons only** (no key shape, no name; names in tooltips and aria-labels),
  each icon in its colour with a soft glow: Play green (turns into a red Stop), Reset amber (the standard replay
  arrow), Previous and Next blue (skip icons). The state and time chips moved to the bottom bar's left.
- **Replay** (owner, 2026-10-09: *"make the animation replayable"*): teal, between Play and Reset (the replay arrow with
  a play triangle), Shift + Space: the stop on show runs again from its start and holds at its end; Reset goes to the
  first stop. **Superseded 2026-10-09:** Play is per view and views arrive at their first frame; Autoplay is a presenter
  switch ([[views-arrive-at-first-frame]]).
- A **Cards** toggle, **off by default**: numbered callouts and info cards appear only when on. The stop caption
  stays on (it is the narration line).
- Any context panel (here the eye band) has its own toggle and **hides when Play begins**, giving the stage to the
  main demonstration.
- Every signal is traced along its real path: a lit trail behind a moving front; what the trace has not reached
  is drawn dim, values not yet computed show "…".
Related: [[design-direction-before-building]], [[visualize-every-card-in-lecture-order]], [[bench-quality-bar]].
