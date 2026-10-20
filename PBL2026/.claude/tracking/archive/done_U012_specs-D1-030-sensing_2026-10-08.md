---
id: U012
title: Bench specs for D1·030 — Sensing: from physical quantity to electrical signal
status: done
depends_on: [U002, U003]
refs:
  - .claude/standards/bench-spec-template.md
  - .claude/standards/bench-quality-bar.md
  - .claude/standards/authoring-digest.md
  - notes/Day01/030-sensing/en.md
  - elements-by-section.md
  - bench-work/specs/D1-010-05-measurement-path.md (§3a: the course path library, its stage lane as rendered)
  - bench-work/specs/D1-020-05-accuracy-precision.md (a Plot spec) and D1-020-08-meter-specification.md (Equation, Figure)
  - .claude/tracking/archive/done_U011_specs-D1-020-measurand-and-uncertainty_2026-10-08.md (what the fences can and cannot do)
  - .claude/memory/electronics-bench-in-development.md · render-visual-milestones.md · bench-versus-library.md
---

## Goal

Write one spec in `bench-work/specs/` for every card of D1·030 (25 min) that shows a bench, so each
activity can be built straight from its file when its bench is ready.

Elements in this module (from elements-by-section.md): Draw Bench ×4, Predict–observe–explain ×1, Plot Bench ×1, Flash quiz ×1, Electronics Bench ×1, Circuit predict ×1, Multi-select ×1, Poll ×1.

## Acceptance criteria

- [x] One spec per bench card, in the template's shape, named `D<day>-<module>-<card>-<slug>.md`.
- [x] Each spec gives the minutes on the bench, inside the module's budget, and says where they come from.
- [x] Each spec meets the quality bar: real values and units, the faithfulness checklist filled, the four views named.
- [x] Each spec's steps follow the card's Flow paragraph by paragraph; nothing in the owner's text is trimmed or reworded.
- [x] `bench-work/README.md` lists every new spec with bench, minutes and status.

## Out of scope

Building any bench or asset. Changing the owner's card text or Flow (report anything that looks wrong).

## Progress

- 2026-10-08: loaded after U011. Electronics cards: list as deferred. Render each visual milestone.
- 2026-10-08: not started beyond a first read (the owner cleared the session first). Bench cards: 1 (Draw:
  the path focused on QUANTITY → SENSOR, the eye's organ ghosted above: a new layer on the course path
  library), 2 (Draw: transducer data flow, a redraw of transcripts/image-3.png, never a copy), 3 (Plot:
  thermocouple V = S·(T_hot − T_cold), S ≈ 41 µV/°C, label the linear approximation), 4 (Draw: the pressure
  chain with its package; reuse InsightDemo's `strain-gauge-beam`), 9 (Draw: the five defences pinned on
  the path). Card 6 is Electronics (the NTC divider): list it as **deferred**. Cards 5, 7, 8 have no bench.
  Render each visual milestone (bench-work/previews/make_preview.py, add panels).
- 2026-10-08 (second session): specs written for cards 1, 2, 3, 4, 9; card 6 (Electronics) listed as
  **deferred**, its numbers checked (all agree). Previews rendered (`bench-work/previews/u012-preview.html`,
  six panels) and the layouts fixed from the render. Requests X13, X14 added; X2 extended.

## Handoff notes

**What changed.** Five specs: `D1-030-01-electricity-only` (holds D1·030's time table: **23.4 of 25 min**,
24.4 with every proposal), `-02-transducer-sensor-actuator`, `-03-not-unit-conversion` (Plot),
`-04-pressure-chain`, `-09-five-defences`. `make_preview.py` now writes one page per unit
(`u010-u011-preview.html` unchanged, `u012-preview.html` new). Previews are captured to PNG for checking
with a hidden Electron window loading each SVG from a file (`offscreen: true`, one window reused; a data URL
fails for long SVGs, and a fresh window per file fails to load).

**Decisions made in the specs** (the owner has not seen them yet):
- Card 2 is **our own redraw** of the idea in `image-3.png`, one line instead of the source's loop, the two
  transducers drawn straddling the domain boundaries (the source caption's point). The source looks like
  Pallàs-Areny & Webster Fig. 1.1: F1 asks the owner to confirm before it is cited on the legend.
- Card 3's plot puts **T_hot on the x axis** with a fixed 100 °C marker and the output as a level line
  (`0.041*(th - tc)`, a deliberate compiler warning), so moving T_cold drops the level while the crossing
  stays on the marker. PLAN numbers verified against the NIST type K table (3.10 / 2.69 mV vs 3.08 / 2.67).
  The table curve was tried and is invisible at this scale: dropped, stated in words.
- Card 4 is a **real sensor**: 10 bar, 17-4PH diaphragm a = 6 mm, t = 0.3 mm, four 350 Ω gauges on 5 V →
  42.4 µm, +706 / −1412 µε, +0.49 / −0.99 Ω, 10.6 mV (2.12 mV/V), from clamped-plate theory. Not
  `strain-gauge-beam` (a cantilever; its grid also runs the wrong way: X14).
- Card 9 follows the PLAN's mapping in the preview, but **F1 and F2 dispute two drops**: the optical filter
  acts at the sensor (filtering at the input, per the source), and the second shaded sensor is opposing
  inputs when subtracted in the circuit.

**Open for the owner**: card 1 F1–F3, card 2 F1–F5, card 3 F2–F4, card 4 F2–F6, card 9 F1–F4 (each spec's
§14). None changes a course file until answered.

**Next unit (U013, D1·040)** is Electronics-heavy (×4, deferred); its Draw ×2 and Equation ×2 are the work.
D1·040 harvests S8 (loading) planted here.
