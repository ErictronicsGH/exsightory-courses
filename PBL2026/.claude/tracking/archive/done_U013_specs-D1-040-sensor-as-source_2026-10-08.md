---
id: U013
title: Bench specs for D1·040 — The sensor as a source: impedance, dividers and loading
status: done
depends_on: [U002, U003]
refs:
  - .claude/standards/bench-spec-template.md
  - .claude/standards/bench-quality-bar.md
  - .claude/standards/authoring-digest.md
  - notes/Day01/040-sensor-as-source/en.md
  - elements-by-section.md
  - bench-work/specs/D1-010-05-measurement-path.md (§3a, §3c: the course path library; D1·040 adds SOURCE & LOADING)
  - .claude/tracking/archive/done_U012_specs-D1-030-sensing_2026-10-08.md (handoff: previews, capture method)
  - .claude/memory/electronics-bench-in-development.md · render-visual-milestones.md · bench-versus-library.md · real-but-unbranded.md
---

## Goal

Write one spec in `bench-work/specs/` for every card of D1·040 (45 min) that shows a bench, so each
activity can be built straight from its file when its bench is ready.

Elements in this module (from elements-by-section.md): Electronics Bench ×4, Draw Bench ×2, Numeric answer ×2, Equation Bench ×2, Multi-select ×1, Circuit predict ×1, Checkpoint ×1.

## Acceptance criteria

- [x] One spec per bench card, in the template's shape, named `D<day>-<module>-<card>-<slug>.md`.
  (Cards 1, 4, 6, 7; the four Electronics cards 3, 5, 8, 9 **deferred** by the standing rule, listed in the
  README with their numbers checked.)
- [x] Each spec gives the minutes on the bench, inside the module's budget, and says where they come from.
- [x] Each spec meets the quality bar: real values and units, the faithfulness checklist filled, the four views named.
- [x] Each spec's steps follow the card's Flow paragraph by paragraph; nothing in the owner's text is trimmed or reworded.
- [x] `bench-work/README.md` lists every new spec with bench, minutes and status.

## Out of scope

Building any bench or asset. Changing the owner's card text or Flow (report anything that looks wrong).

## Progress

- 2026-10-08: loaded after U012. Electronics cards: list as deferred. Render each visual milestone.
- 2026-10-08: specs written for cards 1, 4, 6, 7; cards 3, 5, 8, 9 (Electronics) deferred, numbers checked.
  Previews rendered (`bench-work/previews/u013-preview.html`, three panels), layouts fixed from the render,
  sent to the owner. Request X15 added.

## Handoff notes

**What changed.** Four specs: `D1-040-01-interface` (Draw; holds D1·040's time table: **24.2 of 45 min**),
`-04-thevenin-redraw` (Draw, a new library `thermistor-thevenin`), `-06-high-in-low-out` (Equation, log x,
`compare` family, `simulate` ramp), `-07-attenuation` (Equation with a `rearrangements` entry). README rows for
all eight bench cards (four deferred). `make_preview.py` writes `u013-preview.html` (three panels). Request X15
(a `compare` family stepped one curve at a time). The SVG capture script was rewritten in the scratchpad
(Electron, offscreen window, `loadFile` per SVG): the method in memory `prototype-capture` still holds.

**What the Equation Bench mirrors** (read 2026-10-08 in `EquationBench.vue`, `BenchView`): the pane, the pinned
annotation, the derivation step and the `simulate` transport (main's clock). **Not** slider values, the hover
readout, or which example is selected (every example's dot is drawn at once). Card 6's drive is built on that:
the "slide R_s up" is a `simulate` ramp; "step through the family" is all four curves at once (X15).
`graph.scale` (log), `compare` (2–5 values), `boundaries`, `rearrangements` exist. Earlier Equation specs
(D1-020-08, -09) assumed the example was mirrored: worth a check when U017+ write Equation specs.

**Decisions made in the specs** (the owner has not seen them yet):
- Card 1 draws **SOURCE & LOADING as a dashed band on the arrow after SENSOR**, not a seventh box (F1), so the
  stage is the interface and later modules keep six boxes. D1·050's stage (if any) should follow the owner's
  answer.
- Card 4's reveal is **s2–s3** (the Thévenin step), not *the drawing's last step* as the PLAN says (F1): the
  Flow reveals 5 kΩ before it hangs the load.
- Card 6 holds **V_s = 5.000 V** (card 5's divider as a source) so 4.762 V and 4.9998 V fall on the curves; card
  3's 9.90 V is the 100 kΩ curve's knee (same 1 %).
- Card 7 uses **12 kΩ over 3.0 kΩ** (E24, exactly 0.2); no graph, so card 8's numeric is not given away.

**Found in the owner's text** (each in a spec's §14): D1·040 runs ≈ 21 min short of 45 (card 1 F4); five PLAN
lines are not in the Flow (HARVEST S6, S8, S36 on card 5; SEED S14 card 6; SEED S13 card 9: card 1 F5); card 6's
Flow cue still names the widget (card 6 F1); *"multiplies by the attenuation factor"* is ambiguous (card 7 F1).

**Open for the owner**: card 1 F1–F5, card 4 F1–F4, card 6 F1–F6, card 7 F1–F5. None changes a course file until
answered.

**Next unit (U014, D1·050)** is Electronics-heavy again (×4, deferred); its Equation ×2 are the work. If D1·050
re-embeds the course path, it follows card 1 F1.
