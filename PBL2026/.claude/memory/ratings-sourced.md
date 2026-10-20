---
name: ratings-sourced
description: Every conductor, connector and terminal carries current, voltage and insulation ratings with source and basis; unstated = null with the reason, never guessed
metadata:
  type: feedback
---
Owner, 2026-10-12: *"Do well to add ampacity, voltage limit and insulation values to cables and wires and connectors."*

**Why:** a bench that lets students wire a 5 A supply into a 2 A breadboard must know (and say) what each part takes.

**How to apply:** a new wire class, plug, board or component terminal gets a `rating`/`ratings` block (classes.json style:
`current`, `voltage` with `kind`/`cat`, `insulation` with material, temperature range, wall, withstand), each value with
its `source` and `basis` (maker, distributor, table-free-air, table-chassis, derived). In a component manifest the source
is the `provenance` shape (a document named as text, no keys, no URLs). A value no source states is `null` plus
`valueIs` (the reason); never a plausible guess. A terminal's `rating` is the part's own, not what the instrument
delivers through it. The wire pane checks the supply's live limit against the weakest rated part on the path.
Research behind the first values: bench-work/research/14-conductor-and-connector-ratings.md. Related: [[component-standard]],
[[connections-snap-and-click]], [[design-view]].
