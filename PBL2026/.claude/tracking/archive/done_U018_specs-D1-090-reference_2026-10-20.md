---
id: U018
title: Bench specs for D1·090 — The reference voltage, and ratiometric measurement
status: done
depends_on: [U002, U003]
refs:
  - .claude/standards/bench-spec-template.md
  - .claude/standards/bench-quality-bar.md
  - .claude/standards/authoring-digest.md
  - notes/Day01/090-reference/en.md
  - elements-by-section.md
---

## Goal

Write one spec in `bench-work/specs/` for every card of D1·090 (30 min) that shows a bench, so each
activity can be built straight from its file when its bench is ready.

Elements in this module (from elements-by-section.md): Predict–observe–explain ×2, Equation Bench ×1, Numeric answer ×1, Electronics Bench ×1, Poll ×1, Plot Bench ×1, Checkpoint ×1.

## Acceptance criteria

- [x] **Accuracy (blocking):** check A1–A7 of `.claude/standards/course-accuracy.md` run on the module before the brief and on everything produced; results in `tracking/ACCURACY.md`; **no open accuracy finding** on this module.
- [x] One spec per bench card, in the template's shape, named `D<day>-<module>-<card>-<slug>.md`.
- [x] Each spec gives the minutes on the bench, inside the module's budget, and says where they come from.
- [x] Each spec meets the quality bar: real values and units, the faithfulness checklist filled, the four views named.
- [x] Each spec's steps follow the card's Flow paragraph by paragraph; nothing in the owner's text is trimmed or reworded.
- [x] `bench-work/README.md` lists every new spec with bench, minutes and status.

## Out of scope

Building any bench or asset. Changing the owner's card text or Flow (report anything that looks wrong).

## Progress

- 2026-10-20: loaded after U017 (U016 parked, blocked on crossing 505). Start: list crossings; run the accuracy check
  A1–A7 on D1·090 (its numbers under the course's models; cross-references to D1·010's 2047 and D1·040's dividers);
  then brief the owner as `bench-work/previews/u018-preview.html` and wait for design direction.
- 2026-10-20: crossings listed (none to pbl2026; 505 still open). Accuracy check A1–A7 run on D1·090: six findings
  **open** (D1·090-F1 the supply's 50 mΩ against the sw3005; F2 the internal 1.1 V's spread clips the poll's signal;
  F3 "the noisiest" absolute; F4 2253 → 2252 truncating; F5 S30's 1.649 V against the pin's 1.79 V; F6 "the most
  stubborn error"), plus D1·040-F1 for the sweep; all in `ACCURACY.md`. Brief page `bench-work/previews/u018-preview.html`
  (live Equation cards 1–3, card 4's rail schematic, card 5's centrepiece Plot, card 6's path) with N1–N2 and D1–D5.
  Flow 1,041 words; module ≈ 20 of 30 min. **Next:** read the owner's choices (`u018Feedback()` in the page), apply the
  decided findings to `en.md` and re-check, then write the specs (cards 1, 2, 3, 5 Equation/Plot; card 4 Animation +
  crossing if D2 is chosen; card 6 per D4).
- 2026-10-20: owner chose every recommendation (F1–F6, N1, N2, D1–D5); applied to `en.md` and re-checked (commit
  f0e787b); `ACCURACY.md` shows no open finding on D1·090 (D1·040-F1 waits for the D1·010–060 sweep). Card 4's spec
  written (`D1-090-04-vdd-reference.md`, spec-draft, new proposals P1–P9 open; its numbers re-verified in Node); its
  crossing draft was lost with that session's scratchpad: write it after P1–P9 are decided. Specs for cards 1–3, 5
  (with the module's time table) and 6 being written. Found in Node: 1.65/3.20 × 4096 is 2111.9999999999995 in IEEE
  doubles, so a bench `floor` shows **2111** where the Flow says 2112 (cards 3 and 5): the specs raise it. **Next:**
  review the five specs (numbers in Node), add the `bench-work/README.md` rows, put every spec's §14 on the brief page
  for the owner's choices, then the crossing for card 4.
- 2026-10-20: owner *"apply all recommendations"*: F1–F6, N1, N2 applied to `en.md` and re-checked; D1–D5 into the
  specs. All six specs written (`bench-work/specs/D1-090-01` … `06`, README rows added); one module time table, in
  `D1-090-05` §2b: ≈ 17.3 of 30 min. The specs raised **D1·090-F7** (card 5's ideal 2048) and **F8** ("this morning"
  against the GMT schedule; also D1·040-F2, D1·050-F1), open, and round-two proposals (cards 1–3 C1a–C3c, card 4
  P1–P9, card 5 C5a–c, card 6 C6a–c, X: three crossings). All on the U018 page, section *specs*. The card 4 crossing
  draft is in the session scratchpad (`crossing-d1-090-04.request.md`; it will need re-writing from the spec if the
  scratchpad is gone). **Next:** read the owner's round-two choices, apply F7/F8 and any Flow changes (C2b, C5b, P9)
  to `en.md`, update the specs' §14 "Decided" lines and statuses, then write and push the crossings (id from the tool).
- 2026-10-20: owner *"apply all recommendations"* (round two). F7 (the bench states card 5's ideal) and F8 (*"earlier
  today"*, also D1·040 S6, D1·050 S37, the transcript) applied; C2b (*"…from a 12-bit converter."*), C5b (card 5's
  fence split in three, no word changed), P9 (*"[[demo]] Animation Bench: …"*) applied to `en.md`; every spec proposal
  taken; all six specs **spec-ready**. Crossings **510** (card 4's demonstration), **511** (the course-path master and
  card 6's variant), **512** (Equation and Plot needs: exact ⌊ ⌋, codes whole, ⌊ ⌋ typeset, whole-bit N, dashed ideal
  line, mirrored framings, compare styles, strike-out) pushed. CLAUDE.md's crossings command corrected (run from the
  worktree). Days 2–3's *"this morning"* logged as DAY23-F1.

## Handoff notes

- **What changed.** D1·090's accuracy check found F1–F6 before the brief and F7–F8 while writing the specs; all decided on
  the recommendations and applied to `notes/Day01/090-reference/en.md` (F8 also to D1·040's S6, D1·050's S37 and the
  module's transcript). Specs: `D1-090-01` (Equation, ⌊ ⌋ and the staircase, no rearrangement), `-02` (Equation, the inverse
  as its own statement, V_ref compared), `-03` (Equation, a compare family; its target needs exact ⌊ ⌋), `-04` (Animation by
  Benches, `vdd-reference`: an unbranded board and its schematic; the Electronics widget stays deferred; Plot stand-in
  `rail-sag-code`), `-05` (Plot + Equation centrepiece; **holds the module table**: ≈ 17.3 of 30 min), `-06` (the course path,
  variant `course-path-090-checkpoint`). Brief page `bench-work/previews/u018-preview.html`, both rounds decided.
- **Deviations.** The brief's card 4 used the course's bench supply for the 50 mΩ; the sw3005 cannot be it (F1): the 50 mΩ
  is the rail at the pin. The brief said card 2's answers sit in their bands; they are the bands' rounded bottoms (fixed).
  The two spec agents for cards 1–3 and 5–6 were interrupted once and resumed; card 1 and card 5 both wrote a module table,
  reconciled to card 5's. D1·010's course path, decided 2026-10-08, was never built: 511 asks for it.
- **Found in Studio** (read-only): no rearrangement through ⌊ ⌋; floating point floors 2112 to 2111; codes print *2.048 k*;
  ⌊ ⌋ prints *floor*; hold sliders have no step; Plot sliders and `animate` are not mirrored; no strike-out. All in 512.
- **Raised for other units.** D1·040-F1 (the bench supply's 50 mΩ and *"half a volt at 10 A"*, for the D1·010–060 sweep);
  DAY23-F1 (*"this morning"* on Days 2 and 3: every day starts at 12:00 GMT).
- **Next.** U016 stays parked until 505 is answered. Watch 510–512 for Benches' answers. U019 (D2·010) loaded.
