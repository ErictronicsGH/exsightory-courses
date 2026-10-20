---
id: U002
title: Finish the bench-spec template and the quality bar from the Animation Bench research
status: done
depends_on: [U001]
refs:
  - .claude/standards/bench-spec-template.md
  - .claude/standards/bench-quality-bar.md
  - bench-work/research/01-learning-science.md, 02-product-survey.md, 03-exsight-constraints.md
---

## Goal

The template and the quality bar were drafted on 2026-10-08 before the research came back. Revise
both so every finding that applies to *any* bench (segmenting, cueing, pacing, predict before
reveal, key views, reduced motion, phone behaviour) is a field or a check, not a hope.

## Acceptance criteria

- [x] Every requirement in the research that applies to all benches appears as a template field or a
      quality-bar check, with the finding it comes from.
- [x] The quality bar's faithfulness checklist is concrete per bench kind (Electronics, Draw, Plot,
      Equation, Figure, Coding, Animation, 3D).
- [x] One existing card is written up with the template as a dry run, and the template is fixed
      where it did not fit.

## Out of scope

Writing the module specs (U010 onwards).

## Progress

- 2026-10-08: loaded after U001. Inputs: research 01–03, bench-design-rules.md, U001 handoff notes (archive).
- 2026-10-08: quality bar rewritten (A1–A8, B1–B20, C1–C8, D per bench kind, E = ExSight's definition
  of done, and a table placing all 45 research requirements); template rewritten (15 sections, new
  yaml fields `dimensions`, `key_variable`, `time_scale`, `predictions`, `steps`); dry run on D1·080
  card 5 (SAR) → `bench-work/specs/D1-080-05-sar-binary-search.md`; template fixed after it.

## Handoff notes

**What changed.** `.claude/standards/bench-quality-bar.md` is now checks with ids: A (faithful, incl. new
A6 *every simplification labelled on the bench* and A7 *consistent with the rest of the course*), B1–B20
(understanding: one idea per step, only the teaching change moves, meet the parts, stills, a sentence
per step, cues along the causal path, ≤ 2 movers, no flashing, predict first, check after, who paces,
words on the bench, labels, compose, three representations, side by side, 3D views, procedures,
presenter's text), C1–C8 (design rules, wall legibility, reduced motion, colour, keys, phone, budgets,
print), D (concrete rows for Electronics, Draw, Plot, Equation, Figure, Coding, Animation, 3D), E
(D13's definition of done). Its last table places every research requirement R1–R45: applies to any
bench → a check + a template section; Animation- or platform-only (R9, R16, R17, R22, R27, R30, R39)
→ the capability list. `.claude/standards/bench-spec-template.md` has 15 sections: the old 12 plus
§6 *The frame* (dock tiles and panels, as U001 asked), §7 *Thinking, not watching*, §10 *Accessibility,
legibility and print*, §14 *Findings for the owner*; §4 split into steps (4a) and motion/cues/stills
(4b); a *time_scale* field.

**The dry run** (`bench-work/specs/D1-080-05-sar-binary-search.md`, indexed in `bench-work/README.md`):
SAR on the Animation Bench (2D), Draw stand-in, 1.6 min on the bench, 2.7 for the card. Template misfits
it found, all fixed: no place for the PLAN's SHOW/Drive/Status lines; no anchor for the real device
(`real_thing`); card vs bench minutes; optional second benches; an ASK before the bench appears;
repeated steps (one row per bit) bloating §4b; stand-in assets reusable as the target's source.

**Deviations.** The dry run used the SAR card, not the eye, so U003 stays the first full reference spec.
The ≤ 2 movers threshold (B7) is ours, not the research's (it says "flag more than N"); recorded in
DECISIONS. The capability list's SAR sample time scale was changed from *10⁶ ×, 2 µs* to the ATmega328P
figure (≈ 200 000 ×, ≈ 8 µs per bit) for consistency with the spec; the ATmega numbers (13 ADC clocks,
50–200 kHz) are from memory and flagged *check the datasheet* in the spec.

**For the owner** (STATE open questions 3–4): the SAR card truncates while the module's Plot rounds
(2.17 V → 1010 vs 1011), and the Flow's demo cue still names the retired widget. Proposals F3–F6 in
the spec's §14.

**What the next units need.** U003 (the eye) fills the template top to bottom, with §6's frame from the
capability list §3a and §7.1's ten stops; it should test the 3D rows (B18, D Animation 3D) the SAR
could not. U010+ copy the SAR spec's shape for 2D and the eye's for 3D; every spec's §14 feeds STATE.

