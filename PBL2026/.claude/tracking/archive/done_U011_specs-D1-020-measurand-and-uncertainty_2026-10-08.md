---
id: U011
title: Bench specs for D1·020 — The measurand, and what "right" means
status: done
depends_on: [U002, U003]
refs:
  - .claude/standards/bench-spec-template.md
  - .claude/standards/bench-quality-bar.md
  - .claude/standards/authoring-digest.md
  - notes/Day01/020-measurand-and-uncertainty/en.md
  - elements-by-section.md
  - bench-work/specs/D1-010-05-measurement-path.md (§3a: the course path library; the four-categories pins card (en.md ≈ line 318) goes on it as a new layer and variant)
  - bench-work/specs/D1-010-01-confidently-wrong.md (the first Electronics spec: its shape for an Electronics card)
  - .claude/memory/bench-versus-library.md (every spec names the bench and the library)
---

## Goal

Write one spec in `bench-work/specs/` for every card of D1·020 (30 min) that shows a bench, so each
activity can be built straight from its file when its bench is ready.

Elements in this module (from elements-by-section.md): Flash quiz ×2, Plot Bench ×2, Numeric answer ×2, Equation Bench ×2, Analogy ×1, Electronics Bench ×1, Multi-select ×1, Draw Bench ×1, Checkpoint ×1.

## Acceptance criteria

- [x] One spec per bench card, in the template's shape, named `D<day>-<module>-<card>-<slug>.md`.
- [x] Each spec gives the minutes on the bench, inside the module's budget, and says where they come from.
- [x] Each spec meets the quality bar: real values and units, the faithfulness checklist filled, the four views named.
- [x] Each spec's steps follow the card's Flow paragraph by paragraph; nothing in the owner's text is trimmed or reworded.
- [x] `bench-work/README.md` lists every new spec with bench, minutes and status.

## Out of scope

Building any bench or asset. Changing the owner's card text or Flow (report anything that looks wrong).

## Progress

- 2026-10-08: loaded after U010.
- 2026-10-08: bench cards: 3 (Electronics, bridge-null fixture, ready), 5 and 6 (the centrepiece Plot;
  card 5 also the four targets), 7 (Draw pins on the course path: **written**), 8 (Equation + Figure: a
  real meter, RS PRO 296568, ±(0.5 % + 3) on 2 V, lowest DC range 2 V), 9 (Equation, RSS). Fence formats
  surveyed by an agent. Card 5's and 9's Flows name retired widgets in `[[demo]]` lines (findings).
- 2026-10-08: specs written for cards 5, 6, 7, 8, 9; card 3 written before the owner deferred Electronics, kept as **deferred**. Preview rendered and sent.

## Handoff notes

**What changed.** Six specs (`D1-020-03` deferred, `-05`, `-06`, `-07`, `-08`, `-09`); the first Plot and
Equation specs, written to the fences as they are (read 2026-10-08 by an agent: `plotBlock.ts`,
`equationBlock.ts`, `figureBlock.ts`, `circuitBlock.ts`). Requests X8–X12 added. Previews:
`bench-work/previews/` (script + 10 SVG panels + one HTML page), which moved the course path's stage lane.

**What the fences can and cannot do** (for every later unit): a `plot` has sliders, curves, markers,
`animate`, but **no steps and no reveal**, and its sliders are local to each window (no presenter strip,
not pushed to devices); an `equation` is drivable (panes, derivation steps, examples, mirrored) but graphs
one statement; a `figure` has a tour and reveal; a `circuit` is one beat with one predict/reveal and no
steps; a resistor has no live value (knob M66b-ii-b-iv). **One Canvas block per card.**

**Owner, mid-unit:** Electronics deferred (memory `electronics-bench-in-development`); render visual
milestones (memory `render-visual-milestones`).

**Next units:** list Electronics cards as deferred; spec the others; render each visual milestone.
