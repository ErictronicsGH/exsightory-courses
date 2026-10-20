---
id: U035
title: The eye-to-brain 2D animation (D1·010 cards 2–4): the owner's review, then the fixes
status: done
depends_on: [U003]
refs:
  - bench-work/prototypes/eye-to-brain-2d/app/README.md (open, drive, what moves)
  - bench-work/prototypes/eye-to-brain-2d/contact-sheet.png (the 17 stills the owner accepted)
  - bench-work/specs/D1-010-03-eye-to-brain.md (the reference spec)
  - .claude/tracking/DECISIONS.md (2026-10-08: the eye card becomes a 2D animation)
  - .claude/memory/design-direction-before-building.md · prototype-capture.md · bench-quality-bar.md
---

## Goal

Take the built 2D animation (`bench-work/prototypes/eye-to-brain-2d/app/`, 14 stops in three chapters) through
the owner's own review, fix what they ask for, and close the open items, so D1·010 cards 2–4 have an accepted
animation for Saturday.

## Acceptance criteria

- [x] The owner has driven the animation themselves and given their verdict (2026-10-08: *"great eye demo implementation"*; accepted as it is).
- [x] (none asked) Every change they ask for is made and re-captured (key frames in `app/shots/`), with any change of look
      described to them first (design-direction rule).
- [ ] (left open) The glances question (the owner's wish against B2, no decorative motion) is decided by the owner.
- [ ] (left open, not raised by the owner) The layout faults found on 2026-10-08 are fixed or waived by the owner (Progress below).
- [ ] (left open) The reference spec and the README say what was accepted; frame rate checked on the lecture laptop or
      listed as a pre-course check.

## Out of scope

The Animation Bench itself (M62); the D1·040+ spec units (back in the backlog, U014 next).

## Progress

- 2026-10-08: unit opened after the owner asked why the eye animation was left for U013 (nothing in tracking
  held it). Every stop played in an offscreen Electron window and captured at its end (the browser pane gave
  0 frames while hidden). All 16 states reach their views and finish. Found, for the owner:
  1. Stop 13: the *Where the analogy breaks* card covers the *You are here* inset's title.
  2. Stop 7: the note under the Normal / Long-sighted / Short-sighted pills describes short sight while long
     sight is selected, and sits on the nerve's dashed line.
  3. Stops 9c–12: the radiations' lines run through the *Hearing* and *Recognition* labels.
  4. Stop 8's inset: the *damaged* label sits on the inverted jar.
  5. Stops 3, 7, 8: the *Home: this stop's view…* help line overlaps the eye's outline when zoomed in.
  6. Not checked: stop 2's commit-and-reveal flow, Explore, reduced motion (M), touch.
  The owner then asked to drive it themselves: opened at http://127.0.0.1:8766/ (launch.json `eye-2d`).
- 2026-10-08: the owner drove it in their own browser and accepted it: *"great eye demo implementation. we can
  stop it now and go to the next in a new session."* Closed on their word, with the items below left open.

## Handoff notes

**Accepted by the owner as built** (`bench-work/prototypes/eye-to-brain-2d/app/`). No changes asked.

**Left open, not lost** (copied to STATE open questions): the five layout faults in Progress; the glances
question (B2); stop 2's reveal, Explore, reduced motion and touch not checked by me; the reference spec
`D1-010-03-eye-to-brain.md` still describes the 3D target and has not been updated to the accepted 2D animation;
frame rate on the lecture laptop.

**How to see it running:** the browser pane gives no animation frames while the app reports it hidden; use the
owner's own browser at http://127.0.0.1:8766/ (launch.json `eye-2d`), or an offscreen Electron window for
captures (scratchpad script `walk-eye.js`: `window.__eb.go(i)`, wait 3.2 s + the stop's `dur`, `capturePage`).

**Next (U014, D1·050):** the owner's rule for every new unit from now on: **brief them first** on what the unit
has to do, **wait for their design direction**, then proceed.
