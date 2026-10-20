---
id: U016
title: Bench specs for D1·070 — The ADC input: sample-and-hold and acquisition time
status: in-progress
depends_on: [U002, U003]
refs:
  - .claude/standards/bench-spec-template.md
  - .claude/standards/bench-quality-bar.md
  - .claude/standards/authoring-digest.md
  - notes/Day01/070-adc-input/en.md
  - elements-by-section.md
---

## Goal

Write one spec in `bench-work/specs/` for every card of D1·070 (45 min) that shows a bench, so each
activity can be built straight from its file when its bench is ready.

Elements in this module (from elements-by-section.md): Plot Bench ×4, Predict–observe–explain ×3, Draw Bench ×2, Numeric answer ×2, Equation Bench ×2, Analogy ×1, Electronics Bench ×1, Multi-select ×1.

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

- 2026-10-20: loaded after U014. Not started. **Start by briefing the owner** (memory brief-before-each-unit): D1·070's
  cards, their benches, what is deferred (Electronics ×1), the visuals and design choices, then wait for direction.
  Check crossings 493–496 first (D1·050's findings were decided and appended to them on 2026-10-20).
- 2026-10-20 (session 2): crossings checked — nothing owed, nothing answered; 493–496 still open on Benches' side.
  Every number in the Flow re-computed and correct (incl. 040's 270 k "a quarter low": 73 kΩ source, 1.35 τ, 26 %).
  Estimate ≈ 21 of 45 min used (Flow 1,768 words ≈ 13.6 min + activities). **Owner briefed** (rendered card map +
  live centrepiece sketch). Findings raised, awaiting direction: F1 ATmega328P named but 12-bit/3.3 V numbers used
  (the UNO library says 10-bit); F2 card 8's leftover direction "[[demo]] Widget (#2)…"; F3 ≈ 24 min unused;
  F4 card 8 Electronics deferred → crossing for its demonstration, as D1·050. Proposed specs: 01, 02 (holds time
  table + centrepiece library), 03, 04, 05, 06, 07, 08. Next: owner's design direction, then write specs.
- 2026-10-20: owner asked for the brief **in the browser, interactive, with feedback on the page**. Built
  `bench-work/previews/u016-preview.html` (card 1 S/H stepper + timing play, centrepiece Plot with every card's
  preset and a ghost, card 5 MUX timeline with the CH3 50 kΩ crosstalk, cards 6–7 equation graph, card 8 sketch,
  findings F1–F4 as choice buttons, feedback boxes). Served by launch.json `previews` (port 8795). **Read the owner's
  answers with javascript_tool `u016Feedback()` on http://localhost:8795/u016-preview.html**, then write the specs.
- 2026-10-20: owner asked for a full correctness review and a rule. **New rule: a course cannot misinform**
  (`.claude/standards/course-accuracy.md`, register `tracking/ACCURACY.md`, blocking criterion added to this unit and
  every backlog unit, CLAUDE.md, six-gates.md widened to everything sent). The review found accuracy findings F5
  (1.65 V on the 2047|2048 edge; truncating converter → 2047, 1759), F6 (card 3's "our 2047" vs its own 1760; cold open
  was 3.585 V, 1.29 µs), F7 (9 τ full-scale rule on a half-scale demo); F1 now marked accuracy. Nine faults in my own page
  fixed (see its gate report). **This unit cannot be done while F1, F5, F6, F7 are open.** Page re-verified in the browser.
- 2026-10-20: owner: sliders side by side (done); **every card now plays** like the bench (Prev/Play/Replay/Next/Reset,
  one stop per Flow paragraph, captions injected verbatim from en.md by `bench-work/previews/make_u016.mjs` from
  `u016-preview.src.html`; edit the .src and rebuild); **IEC symbols by default, US on a bench-level switch**; circuit
  signal effects (dots/glows) **paused: the bench handles them** (`CIRCUIT_FX=false`). New accuracy finding **F8** (meter
  1.650 vs 1.642 V). Verified: 392 frames (every stop × 4 points × IEC/US) clean, Play/hold/speed tested. Open: the
  bench needs the Symbols switch (a crossing to Benches when the specs are written).
- 2026-10-20 (session 3): the page held no answers; the owner answered in chat. **All findings decided**: F1 name the class
  (*"A 12-bit MCU converter, like most…"*; no chip name in card 7 either); F2 *"Electronics Bench: …"*; F3 noted; F4
  schematic + board pin; F5 *"2047 or 2048"* on the edge; F6 the cold-open run added to card 3; F7 show both (full-scale
  ghost on the zoom); F8 *"Nearly the same voltage on a meter"*. **Applied to en.md** and ACCURACY.md (no open finding on
  D1·070; F6/F7 to be checked in the card-3/card-2/card-7 specs). **Target for the centrepiece (cards 2, 3, 4, 7, 8's
  Plot beat): an Animation Bench (2D) demonstration by Benches, the Plot block as stand-in, but the owner said to wait
  for Benches' check on how first** → **crossing 505** pushed (asks the shape: one `adc-sampler` unit + a sequence per
  card; asks whether cards 1 and 5 join). **Cards 2, 3, 4, 7, 8 wait for 505's answer.** Cards 1, 5, 6 specified from
  their PLAN (Draw, Draw, Equation) meanwhile. Still to raise: the bench-level Symbols switch (IEC/US), unless 505's
  answer takes it.
- 2026-10-20 (session 3, end): specs **D1-070-01** (Draw, `adc-input-inside-the-pin`, 1.4/3.0 min), **-05** (Draw,
  `mux-one-capacitor`, 1.7 min), **-06** (Equation, `max-source-impedance`, 1.4/2.3 min) written (spec-draft; README rows
  added). They raised F9, F10, F11, which the owner decided and which are applied (no open finding on D1·070). Their
  design proposals (each spec's §14) are still open for the owner. Page updated (findings decided, the full-scale ghost on
  cards 2 and 7, card 1's strip one sample) and re-verified. Committed and pushed (4a3ce69). **Next session: list crossings;
  when 505 is answered, write specs 02 (holds D1·070's module time table: cards 1 3.0, 5 1.7, 6 2.3 so far), 03, 04, 07,
  08 to Benches' shape (each with the Plot stand-in), revise 01 and 05 if they join the family, then raise the Symbols
  switch (and `{en, fr}` text in a `.benchdrawing`) as crossings unless 505 took them.**
- 2026-10-20 (session 3, later): owner *"go with your recommendations on the proposals"*: specs 01, 05, 06 → **spec-ready**
  (decisions at the end of each §14). Card 6's 5 kΩ reference line → **X21, crossing 506** pushed. Waiting on 505 as above.
