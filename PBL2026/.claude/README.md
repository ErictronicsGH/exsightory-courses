# PBL2026 — how this folder works

Adapted from InsightDemo's `.claude/implementation/README.md` (the owner's session protocol) for a
single-lane authoring project. Read once; the rules don't change.

## Layout

```
CLAUDE.md                     ← project root. Read EVERY session
.claude/
├── README.md                 ← you are here
├── tracking/
│   ├── MEMORY.md             ← THE ONE UNIT being worked on. Read every session
│   ├── INDEX.md              ← every unit and its status, one line each
│   ├── DECISIONS.md          ← every scope or direction change, dated, with the reason
│   ├── STATE.md              ← dates, budgets, standing rules, open questions
│   ├── backlog/              ← units not yet started, NNN-slug.md (TEMPLATE.md is the shape)
│   └── archive/              ← finished units + INDEX.md, one line each
├── standards/                ← shared references several units draw on
│   ├── authoring-digest.md   ← the EAC format, Studio's surfaces and the bench rules, in one place
│   ├── bench-design-rules.md ← ExSight's design rules for any bench surface (~205, cited)
│   ├── bench-spec-template.md← the shape of every file in bench-work/specs/
│   └── bench-quality-bar.md  ← what "≥ 95 % reality" and "the best way" mean, checkably
└── memory/                   ← one fact per file + MEMORY.md index (moved here from the global profile)
```

## Units of work

A unit is one focused piece of work a session can finish: write the specs for one module's bench
activities, research one bench, revise one day's PLAN blocks. It names its goal, ≤ 5–7 acceptance
criteria, what is out of scope, and its `refs`. Bigger than that → split it with `depends_on`.

**`MEMORY.md` holds exactly one unit.** When it is done:

1. Tick every acceptance criterion honestly (done means the criteria pass, not that files exist).
2. Append `## Handoff notes`: what changed, the decisions, what the next unit needs. Deviations
   matter more than successes.
3. Move it to `archive/done_<id>_<slug>_<YYYY-MM-DD>.md`; mark it **done** in `INDEX.md`; add a line
   to `archive/INDEX.md`.
4. Load the next eligible backlog file (lowest number whose `depends_on` are done) into `MEMORY.md`,
   mark it **in-progress**, delete it from `backlog/`.
5. Record any direction change in `DECISIONS.md`.
6. Say: **"Unit `<id>` archived, unit `<id>` loaded into MEMORY.md — safe to /clear now."** Then stop.

A session that ends mid-unit still ends with whether it is safe to clear and the file that carries
it forward (the unit's `## Progress` section in `MEMORY.md`).

## Bench specs (`bench-work/specs/`)

One file per bench activity (a card that shows a bench), named `D<day>-<module>-<card>-<slug>.md`,
e.g. `D1-010-03-eye-to-brain.md`, in the shape of `standards/bench-spec-template.md`. The index of
every spec, with its bench, minutes and status, is `bench-work/README.md`. A spec is complete when
someone who has never seen this conversation could build the activity from it alone.

## Changing scope

Write it in `DECISIONS.md` with a date and a reason. Do not silently rewrite a unit to match what was
done: the record of how the plan moved is what makes the next estimate better.
