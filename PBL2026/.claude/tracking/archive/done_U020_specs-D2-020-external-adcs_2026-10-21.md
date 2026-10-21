---
id: U020
title: Bench specs for D2·020 — External ADCs as a design choice: ADS1115 and INA226
status: done
depends_on: [U002, U003]
refs:
  - .claude/standards/bench-spec-template.md
  - .claude/standards/bench-quality-bar.md
  - .claude/standards/authoring-digest.md
  - notes/Day02/020-external-adcs/en.md
  - elements-by-section.md
---

## Goal

Write one spec in `bench-work/specs/` for every card of D2·020 (30 min) that shows a bench, so each
activity can be built straight from its file when its bench is ready.

Elements in this module (from elements-by-section.md): Figure Bench ×3, Numeric answer ×3, Plot Bench ×2, Predict–observe–explain ×2, Flash quiz ×1, Draw Bench ×1, Checkpoint ×1, Equation Bench ×1, Poll ×1.

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

- 2026-10-20: loaded after U019 (U016 still parked on crossing 505). Start: list crossings from the worktree (ours
  510–512 and 516–519 open); run the accuracy check A1–A7 on D2·020 (open already: **D2·020-F1**, the noise table and
  ENOB, from D1·080; and DAY23-F1's *"this morning"* at l. 392; the title's product names under *real but unbranded*);
  check `transcript.en.md` against `en.md`; then brief the owner as `bench-work/previews/u020-preview.html` and wait
  for design direction.
- 2026-10-20 (session 2): crossings listed from the worktree (nothing open for pbl2026; next free 522). **Accuracy check
  A1–A7 done**: every number recomputed ✓ (Node); ADS1115 values read off SBAS444E (Dec 2024; Tables 6-1/6-2, §5.5,
  Table 7-3, MUX[2:0]) and INA226 off SBOS547C (Aug 2026), both PDFs fetched into the session scratchpad (not kept).
  **Open: D2·020-F1 (widened: RMS column flat at 1 LSB, only p-p grows; 7.81 → 35.83 µV pp on ±0.256 V, 13.80
  noise-free bits at 860 SPS) and F2–F7** (staircase floor; card 2 Look for; *differential* impedance; *"extend"* the
  chain; *"all of it signal"*; *"this morning's firmware jobs"* come later, so DAY23-F1's *"earlier today"* is false
  here). Script panel card-4 arc line fixed (cut mid-word). **Brief page `bench-work/previews/u020-preview.html`**
  (live visual per card; F1–F7 plus D1 named parts vs unbranded, D2 redrawn extracts, D3 benches/crossing, D4 the
  FAULT on the figure, N1, N2; ≈ 29 of 30 min). **Next: read the owner's choices off the page (`u020Feedback()`) or
  the chat, apply, re-check, then write the seven specs.**

- 2026-10-21: owner *"Apply all recommendations"* (asked in the chat): **F1–F7 applied** to en.md and re-checked (Flow
  2,045 words); D1 named-parts exception (memory `real-but-unbranded`), D2 redrawn extracts, D4 fault on the figure;
  DECISIONS.md row. **Seven specs written** (`D2-020-01` to `07`, spec-draft; README rows), cards 26.6 of 30 min. The
  specs found **seven more accuracy points, D2·020-F8 – F14 (open)**, and D2·030-F1 (for U021). Our own page fixed
  (bandwidth home, INA226 has no reference block, pointer sentence, S52 cross-reference). **Round two is on the brief
  page** (`#specs`: F8–F14 and C1–C7, each card's proposals). **Next: read the owner's round-two choices, apply, re-check,
  set specs spec-ready, write the crossing(s) (card 4 with 511/517; card 1's X-inset; card 6 into 506), push.**
- 2026-10-21 (session 3): the page held no round-two answers; the owner answered in the chat (*"Apply all recommended
  (a)"*). **F8–F14 applied** to en.md and the script panel (ACCURACY.md: none open on D2·020); every spec proposal at (a);
  the seven specs **spec-ready**; crossings **524, 525, 526** pushed; X10, X21, X22 rows updated; course-organization.md's
  bandwidth row corrected; DECISIONS.md row; brief page marked decided.

## Handoff notes

- **en.md (owner's text, by decision):** F8 sentence in card 6's second explain; card 6's drafted ask (31 words) and reveal
  (40) in the Flow; F9 (*"the shunt still ours"*), F10 (*"three Day 1 stages … the reference is inside too … slot shown
  empty"*), F11 (*"shunt and gain together"*), F13 (S52 *"in the next module … how fast it grows, and where noise comes
  from"*); fences split, no word changed: card 1 → 4, card 3 → 2, card 5 → 6, card 6 → 4; card 5's numeric *"(after the
  impedance stop)"*; card 3's SHOW names card 1's showing B; card 4's PLAN gains *Built as* and the checkpoint's
  `instructions` (19 lines by stage). F12 and F14 live on the figure / script panel (F14: *"No native differential ADC
  measurement"*). **Module Flow 2,116 words = 16.3 min**; the seven cards sum to **26.6 of 30 min** with activities (card
  6's reveal was already counted: the brief's "+0.3" double-counted it); ≈ 29.3–30.3 if the ≈ 3 min of bench moves do not
  overlap speech. Nothing trimmed.
- **Our own fixes:** card 1's ADS1115 label (*"one step is its range ÷ 32,768 (at the default ±0.256 V, 7.81 µV, too fine
  to see at this scale)"*), true at every PGA range (specs 01, 03, crossing 524); spec 01's A6 hedges; spec 02's table
  geometry recomputed for the shorter ESP32 cell (artboard 1600 × 2885).
- **Crossings:** 524 (Plot: X-inset, X10 extended, X-steps; card 1, card 3's copy), 525 (card 4's
  `course-path-d2-020-checklist`, a fourth drawing in B059's `course-path`), 526 (card 6's two y reference lines on B060,
  `from: rearrangements`). For Benches' briefs to the owner (said in the crossings): the course-path inks differ between
  517's variant (Day 1 `contrast`, interface `amber`) and card 4's (Day 1 `teal`, interface `violet`); card 4's layout
  departs from B059's REFERENCE geometry; B060 draws reference lines neutral where `draw6` had violet.
- **To the owner, not open findings:** card 6's spoken ask and reveal state the 27 clocks as the question's premise; the
  condition (parked pointer) is on the explain and B's caption at the same moment (F8 (a)). Card 5's numeric still says
  *"(confirm on the page)"* and the FILLED note *"to be confirmed on the page"*: the 710 kΩ is confirmed (SBAS444E §5.5),
  so both are stale (the owner's text, left).
- **Downstream:** D2·030-F1 (S52's √bandwidth harvest, only where p-p is above one count) is U021's and matters more now
  S52 promises *"how fast it grows"*; D2·040's S20 under D2·020-F1 is U022's; DAY23-F1 (D2·090's *"this morning"*) open.
- **Crossings answered 2026-10-21 (13, all *taken into Benches' backlog*):** 493–495 (D1·050: B051–B053), 496 and 506
  (B060), 505 (D1·070: `adc-sampler`, B054/B055: **unblocks U016**), 510 (B056), 511 and 517 (B059), 512 (Core 523, B060,
  B061), 516 (B057/B058; card 8's blocks B and C go to the fallback, to the owner), 518 (B062), 519 (B063). Each says its
  close will give the final names when the unit lands, so they stay in `answered/` until then; nothing to replace yet.

