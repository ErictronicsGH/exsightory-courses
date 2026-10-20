---
name: views-arrive-at-first-frame
description: Standing rule for every Animation Bench library: a view arrives at its first frame (never its finished state); Play and Replay are per view and hold at its end; Reset is for the whole library; Autoplay is the presenter's switch
metadata:
  type: feedback
---

Owner, 2026-10-09: *"for each of the views when you navigate to it, the animation does not play automatically but the view
shows the completed state until you press the play … it reveals the final state to the learner so the question is why do i
have to play the animation … the view should show the initial state of the animation then when played it plays the
animation … or presenter can set autoplay … this should be a standing rule for all libraries in the animation bench"*; then
*"the play button and replay will be per view but the reset will be for the whole views."*

**Why:** a view that opens on its ending answers its own question before it is asked, and Play then has nothing to show.
Card 3 onward had done that (`settleOnArrival`: Next jumped to the settled state); older libraries ran their motion while
"holding".

**How to apply** (the bench enforces it; a library must not work against it):
- A view reached by Next, Previous, the rail, Reset or a load shows its **first frame**, its clock held at 0 (state
  "Ready", hint "At its first frame: Play runs this view").
- **Play is per view**: it runs this view's motion and holds at its end (never runs on into the next view); pressed on a
  finished view it runs it again; Play while playing stops it. **Replay** runs this view again and holds. Next / Previous
  move between views. **Reset** is for the whole library: the first view, every input back to its set-up, at its first frame.
- **Autoplay** (the presenter's toggle, the last button of the transport since 2026-10-10 (owner); key A; kept per viewer; `?autoplay=1`): each view starts its motion
  as it arrives and holds at its end.
- Libraries draw everything from the bench's clock; the settled view (time 99) is only for reduced motion and captures
  (`__bench.at(key, 99)` for stills). DINKIT.run ignores `settleOnArrival` now.
- Design each view's first frame to be a sensible, unspoiled start (the question before the answer).
Related: [[animation-player-controls]], [[player-controls-are-the-bench]], [[one-block-at-a-time]].
