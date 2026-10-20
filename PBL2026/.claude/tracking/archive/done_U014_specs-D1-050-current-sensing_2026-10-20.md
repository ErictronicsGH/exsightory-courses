---
id: U014
title: Bench specs for D1·050 — Current as the quantity: shunts, Kelvin and burden voltage
status: done
depends_on: [U002, U003]
refs:
  - .claude/standards/bench-spec-template.md
  - .claude/standards/bench-quality-bar.md
  - .claude/standards/authoring-digest.md
  - notes/Day01/050-current-sensing/en.md
  - elements-by-section.md
  - bench-work/specs/D1-040-06-high-in-low-out.md (the latest Equation spec: what the Equation Bench mirrors to the wall)
  - .claude/tracking/archive/done_U013_specs-D1-040-sensor-as-source_2026-10-08.md (handoff)
  - .claude/memory/electronics-bench-in-development.md · render-visual-milestones.md · bench-versus-library.md · real-but-unbranded.md
---

## Goal

Write one spec in `bench-work/specs/` for every card of D1·050 (40 min) that shows a bench, so each
activity can be built straight from its file when its bench is ready.

Elements in this module (from elements-by-section.md): Electronics Bench ×4, Circuit predict ×3, Equation Bench ×2, Numeric answer ×1, Flash quiz ×1.

## Acceptance criteria

- [x] One spec per bench card, in the template's shape, named `D<day>-<module>-<card>-<slug>.md`.
- [x] Each spec gives the minutes on the bench, inside the module's budget, and says where they come from.
- [x] Each spec meets the quality bar: real values and units, the faithfulness checklist filled, the four views named.
- [x] Each spec's steps follow the card's Flow paragraph by paragraph; nothing in the owner's text is trimmed or reworded.
- [x] `bench-work/README.md` lists every new spec with bench, minutes and status.

## Out of scope

Building any bench or asset. Changing the owner's card text or Flow (report anything that looks wrong).

## Progress

- 2026-10-08: loaded after U035. **Start by briefing the owner** (owner, 2026-10-08): what D1·050's cards need on
  which benches, which are Electronics (deferred), what the Equation cards will show, and any visual to design.
  **Then wait for their design direction before writing or drawing anything.**
- 2026-10-08: brief sent (cards 1–2 Equation; 3–6 Electronics deferred; card 2 hits one-equation-per-block;
  card 6 brown-out arithmetic). Waiting for the owner's design direction.
- 2026-10-08: **parked** (owner redirected to building the visualizations in lecture order). The D1·050 brief
  stands; reload when its turn comes.
- 2026-10-13: **loaded after U015** (D1·060's specs done). Lecture order: D1·050 before D1·060's demonstrations, and
  D1·050's high-side shunt scene is reused by D1·060 cards 1, 6, 7 (DECISIONS 2026-10-13). The 2026-10-08 brief stands;
  re-send it briefly (with the shunt numbers D1·060 now relies on) and wait for the owner's direction.
- 2026-10-20: owner: *"proceed"*. Crossings: none open for pbl2026. No shunt scene exists in exsight-benches (only
  `measurement-path`), so card 3's scene is new and goes to Benches by crossing. Brief re-sent (numbers rechecked; three
  findings: card 4's 100.33 vs 100.34 Ω, card 5 "same shunt" vs the Pt100, card 6's 10 Ω does not brown out a 66 Ω
  load). Waiting for the owner's direction; nothing written yet.
- 2026-10-20: owner: *"proceed with best recommendations"*. Two specs written (cards 1, 2; card 1 holds the module's time
  table and the findings on cards 3–6); cards 3–6's Electronics widgets deferred (numbers checked); their demonstrations
  asked of Benches by **crossings 493** (card 3), **494** (cards 4–5), **495** (card 6), pushed. Preview
  `bench-work/previews/u014-preview.html` (one panel, collisions checked). X20 raised. Done.

## Handoff notes

**What changed.** `bench-work/specs/D1-050-01-shunt-current-to-voltage.md` and `D1-050-02-shunt-signal-and-power.md`
(spec-draft); `bench-work/README.md` (six rows: two specs, cards 3–6 deferred with their crossings);
`bench-work/requests-to-exsight.md` (X20, a second y axis rescaled from the first, for codes);
`bench-work/previews/make_preview.py` (U014 panel) and `u014-preview.html`, `d1-050-02-signal-and-heat.svg`.
In ExSightory's crossing (pushed from `lanes\pbl2026-x`): `open/493-…-high-side-shunt-scene`, `open/494-…-kelvin`,
`open/495-…-burden-voltage-and-the-brown-out`.

**Decisions** (DECISIONS 2026-10-20): card 2 is two Equation blocks, log–log, four marked shunts, codes in notes until X20;
demonstrations by crossing in lecture order, 493 first (reused by D1·060 cards 1, 6, 7); card 6's brown-out comes from
the radio burst (F9).

**Open with the owner** (`D1-050-01` §14): F1–F3 (symbols, HARVEST S37, proposals); F4 the module runs ≈ 17 of 40 min;
F5 the 6 Ω load at 23.93 W of a 25 W rating (recommended: on its heatsink); F6 100.34 Ω, not 100.33; F7 card 5's "same
shunt" (recommended: "same sensor", or the fixture shows both); F8 10 V / 10 kΩ is 0.990 mA (recommended: a 1 mA
source); **F10 a handheld's 200 mA range is ≈ 1–2 Ω, not 10 Ω** (gate 2; recommended (b): ≈ 2–2.5 Ω and the Wi-Fi burst
browns the board out; changes card 6's numbers, so crossing 495 waits on it). `D1-050-02` §14: F1–F5. When the owner
answers F10, append the choice to crossing 495 (or answer Benches if it asks).

**Next unit needs.** Check crossings at session start (`crossings.mjs pbl2026`): Benches may answer 493–495 or ask.

**After closing (2026-10-20).** Owner: *"go with your recommendations on the findings"*. Applied to `en.md` (and where
`transcript.en.md`, `elements-by-section.md` and `course-plan.md` quote it): F5 heatsink, F6 100.34 Ω, F7 "same sensor",
F8 a 1 mA source, F10 at 2.5 Ω (48.2 mA, 0.12 V, 3.18 V, 3.6 %; burst 0.75 V → 2.55 V). Spec proposals taken (card 1 0.8 min,
card 2 3.3 min with two boundaries). Crossings 493–495 appended with the decisions; **496** raised for X20. DECISIONS
2026-10-20.

