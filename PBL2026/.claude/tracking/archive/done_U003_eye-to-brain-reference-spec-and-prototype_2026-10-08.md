---
id: U003
title: The reference spec — D1·010 card 3, the eye to the brain, on the Animation Bench, with a prototype
status: done
depends_on: [U001, U002]
refs:
  - notes/Day01/010-mcu-reads-2047/en.md (cards 3 and 4, the production brief)
  - bench-work/animation-bench-capabilities.md
  - .claude/standards/bench-spec-template.md
  - .claude/standards/bench-quality-bar.md
---

## Goal

Write `bench-work/specs/D1-010-03-eye-to-brain.md` as the model every other spec copies, and build an
interactive prototype (three.js, the same engine Studio's viewers use) that shows the quality the
spec asks for. The owner asked to see the 3D capability on this card before the rest.

## Acceptance criteria

- [x] The spec follows the Flow paragraph by paragraph: light in → cornea and lens focus → retina and
      photoreceptors (section view) → optic nerve → visual cortex, then the sugar association, the
      measurement-system analogy, and card 4's three places it can be spoiled.
- [x] Every item of the card's production brief is met: step-through with keyed, pausable stages;
      realistic, zoom without distortion and zoom into a selected area; parts selectable, each
      opening its highlight and explanation; overlay text per stage.
- [~] The prototype runs on the lecture laptop at frame rate and uses only the capabilities the
      capability list names (nothing the bench will not have).
- [x] Anatomy and optics checked against sources (dimensions, refractive power split, chiasm
      crossing, rods/cones behaviour), listed in the spec.
- [~] The minutes on the bench are given and fit D1·010's 15.

## Out of scope

Building the Animation Bench itself.

## Progress

- 2026-10-08: loaded after U002. Use the revised template (15 sections) and quality bar (A–E); the SAR
  dry run (`bench-work/specs/D1-080-05-sar-binary-search.md`) shows the shape. This card must exercise
  the 3D rows the SAR could not: B18 (key views, constrained rotation, orientation, section), section D
  *Animation (3D)*, §6 with the Views, Section and Parts tiles. Inputs: capability list §3a, §7.1 (ten
  stops), §9; STATE open questions 1–2 still wait on the owner.

- 2026-10-08 (session 2): **spec and prototype written.** `bench-work/specs/D1-010-03-eye-to-brain.md`
  (15 sections, 10 stops + 3 proposed for card 4); `bench-work/research/04-eye-anatomy-optics-sources.md`
  (54 references, by a research agent); `bench-work/prototypes/eye-to-brain/` (README, `src/`, a bundled
  `eye.bundle.js` that opens from disk, `shots/` of every stop). The ray tracer reproduces Le Grand's
  59.94 / 42.36 / 21.78 / 67.68 D exactly. Our capability list's sample time scales and the "names it
  salt" fault were wrong and are corrected (spec §14 F6, F7). `.claude/launch.json` serves the prototype
  for the browser pane.
  **Open**: (1) frame rate measured on this workstation only (GTX 1050: 0.8–2.7 ms/frame), not on the
  lecture laptop; (2) the module overruns 15 min by ≈ 4–5 min before any proposal (spec §2, F9), which is
  the owner's cut, not this card's; (3) the owner's answers to spec §14 F1, F2, F4, F5, F11 (STATE Q1, Q2,
  Q5). Close U003 when the owner has looked at the prototype and answered F1/F2, or accepts it as is.

## Handoff notes

**Done (2026-10-08).** The owner said *proceed* after seeing the prototype and the spec; U003 is closed
with two criteria partly met, both carried forward rather than hidden:

- *Runs on the lecture laptop at frame rate*: measured only on this workstation (GTX 1050, 0.8–2.7 ms
  per frame, every stop). The laptop check is a pre-course item in STATE (open question 6).
- *Minutes fit D1·010's 15*: the card's 4.0 min on the bench are given, but the module already overruns
  by ≈ 4–5 min before any proposal (spec §2, F9). That is the owner's cut; U010 measures it card by card.

**What changed**: `bench-work/specs/D1-010-03-eye-to-brain.md` (the reference spec);
`bench-work/research/04-eye-anatomy-optics-sources.md`; `bench-work/prototypes/eye-to-brain/` (three.js
0.185.1, bundled, opens from disk; README; `shots/`); `.claude/launch.json`; `.claude/tools/
shoot-prototype.js` and memory `prototype-capture.md`; the capability list corrected (time scales,
agnosia) and extended (C78 code-source contract, §9 item 14).

**Decisions**: prototypes in Studio's engine, bundled to open from disk; Explore shows the focus error's
blur, not the traced ray spread (DECISIONS). Owner, after review: **the Animation Bench holds anything
built with an animation library (three.js, Manim, …); STEP and CAD are the 3D Bench's** (DECISIONS,
capability list §9.14, memory). Consequence: the eye's stand-in is no longer a Model Bench tour; the
prototype's scene is itself the bench's code source (spec §13).

**For the next units**: copy this spec's shape. The prototype's `src/stops.js` is the pattern for a
code source's data (stops, `say`, overlays, keyed points, views, part cards). Card 4 of D1·010 has a
proposal in this spec (F5: its three faults also on the Animation Bench); U010 must decide how its own
card-4 spec relates to it. Owner answers still open: F1, F2, F4, F5, F11 (STATE Q1, Q2, Q5).
