---
id: U015
title: Bench specs for D1·060 — Signal conditioning: in-amps, gain, offset and bias current
status: done
depends_on: [U002, U003]
refs:
  - .claude/standards/bench-spec-template.md
  - .claude/standards/bench-quality-bar.md
  - .claude/standards/authoring-digest.md
  - notes/Day01/060-conditioning/en.md
  - elements-by-section.md
---

## Goal

Write one spec in `bench-work/specs/` for every card of D1·060 (40 min) that shows a bench, so each
activity can be built straight from its file when its bench is ready.

Elements in this module (from elements-by-section.md): Equation Bench ×5, Predict–observe–explain ×2, Multi-select ×1, Draw Bench ×1, Flash quiz ×1, Electronics Bench ×1, Numeric answer ×1, Plot Bench ×1.

## Acceptance criteria

- [x] One spec per bench card, in the template's shape, named `D<day>-<module>-<card>-<slug>.md`.
- [x] Each spec gives the minutes on the bench, inside the module's budget, and says where they come from.
- [x] Each spec meets the quality bar: real values and units, the faithfulness checklist filled, the four views named.
- [x] Each spec's steps follow the card's Flow paragraph by paragraph; nothing in the owner's text is trimmed or reworded.
- [x] `bench-work/README.md` lists every new spec with bench, minutes and status.

## Out of scope

Building any bench or asset. Changing the owner's card text or Flow (report anything that looks wrong).

## Progress

- 2026-10-13: loaded after U040 moved to exsight-benches (bench work goes on there). Not started.
- 2026-10-13: brief sent to the owner (cards, benches, reuse of `measurement-path`, the missing 050 shunt scene,
  the in-amp's supply and input range, card 8's "a third" vs 30 %). Waiting for the owner's direction; nothing written yet.
- 2026-10-13: owner: *"proceed with best recommendations"*. Seven specs written (cards 2, 3, 4, 5, 7, 8, 9); card 1 has no
  bench (no spec, as earlier modules' "show none" cards); card 6's Electronics widget deferred (numbers checked).
  Previews `bench-work/previews/u015-preview.html` (5 panels, collisions checked). X19 raised. Done.

## Handoff notes

**What changed.** `bench-work/specs/D1-060-02 … -09` (seven specs, spec-draft); `bench-work/README.md` (eight rows: seven
specs and card 6 deferred); `bench-work/requests-to-exsight.md` (X19, a logarithmic ramp for an Equation's `simulate`);
`bench-work/previews/make_preview.py` (U015 panels) and `u015-preview.html`.

**Decisions** (DECISIONS 2026-10-13, the owner's "best recommendations" on the brief):
1. Specs are independent of D1·050's shunt scene, so U015 finished first; **the demonstrations follow lecture order**:
   D1·050's high-side shunt scene (12 V, 10 mΩ, 6 Ω, 2 A, 20 mV) is built first and reused, unchanged, by D1·060 cards 1, 6
   and 7. U014 (D1·050) is loaded next.
2. **The module's in-amp is a single-supply part** whose inputs are rated for ≥ 12 V common mode with a range that includes
   0 V (both sides of the shunt), at G = 100 by one resistor, its output into the 3.3 V ADC through a clamp. This keeps card
   8's clamp(…, 0, 3.3) and its "cannot go below ground" true. Its V_os, I_b and CMRR come from the class's datasheets.
3. **The in-amp is modelled first** as a standard component (unbranded 8-pin, R_G, optional three-op-amp inside view) in
   exsight-benches when card 6's demonstration is built.
4. Card 8's "a third" against 30 % is reported only (F1 there; recommended *"nearly a third"*).
5. New demonstrations match the accepted look (dark ground, glow lines, 2.5D scenes); each still gets its own design brief.

**Deviations worth knowing.** The Flow is ≈ 12 min of speech; the module uses ≈ 19 of 40 min (card 2 spec §2), like D1·040.
G means open-loop gain on card 4 and closed-loop gain elsewhere (card 3 F1: labelled on the bench). Card 4's POE has no
`[[ask]]` and two HARVEST lines (S11, S33) are not in the Flow. Card 4's "warms up" tenfold is beyond warming alone (F4).
Card 7's 80 dB is low for an in-amp at G = 100 (F4). The Equation's `simulate` ramp is linear only (X19); card 4 walks
four decades by examples. A preview check caught a wrong claim in card 7 (the low side's curve), fixed before sending.

**Next unit needs.** U014's brief of 2026-10-08 stands (cards 1–2 Equation; 3–6 Electronics deferred); its shunt numbers
must match D1·060 cards 1, 6, 7 (12 V, 10 mΩ, 6 Ω → 1.997 A, 19.97 mV).

