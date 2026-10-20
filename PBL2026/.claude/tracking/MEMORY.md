---
id: U018
title: Bench specs for D1·090 — The reference voltage, and ratiometric measurement
status: in-progress
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

- [ ] **Accuracy (blocking):** check A1–A7 of `.claude/standards/course-accuracy.md` run on the module before the brief and on everything produced; results in `tracking/ACCURACY.md`; **no open accuracy finding** on this module.
- [ ] One spec per bench card, in the template's shape, named `D<day>-<module>-<card>-<slug>.md`.
- [ ] Each spec gives the minutes on the bench, inside the module's budget, and says where they come from.
- [ ] Each spec meets the quality bar: real values and units, the faithfulness checklist filled, the four views named.
- [ ] Each spec's steps follow the card's Flow paragraph by paragraph; nothing in the owner's text is trimmed or reworded.
- [ ] `bench-work/README.md` lists every new spec with bench, minutes and status.

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
