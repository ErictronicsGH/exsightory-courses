# PBL2026 — "From Sensor to Number" (Profesir's Birthday Lectures 2026)

A three-day live online course, Sat 10 – Mon 12 Oct 2026, authored in the ExSightory course format
(EAC) and presented from ExSight Studio. The product itself (Studio, Scope, the benches, the
compiler) lives in **`C:\ExSightory`** and is **not** edited from this project. That repository was
`D:\@Projects\2026\InsightDemo` until 2026-10-17, and its `Application\` folder is now `src\`: an older path in
this project's files with either name means `C:\ExSightory` (archives and `DECISIONS.md` keep them as history).
**This folder, `C:\@Profesir\MyBirthdayLectures\PBL2026`, is where the course is developed: it is the author's, on the
author's machine** (it was `D:\@Profesir\2026\My Birthday Lectures\PBL2026` before). Owner, 2026-10-20: *"courses are not
supposed to [be] tied to exsightory … every author will do their work on their own machine so exsightory will only have to
keep published courses"*, and *"an author can keep their own repo until a course is published before it becomes available
under exsight courses"*.

## Where the course is kept, and where it goes when published

- **The course is developed here**, in the author's folder, on the author's machine.
- **`ErictronicsGH/exsightory-courses` is the owner's personal course-development repository**, one course per top-level
  folder (this one is `PBL2026/`). It is not ExSightory's and is not tied to it: ExSightory keeps no clone of it (owner,
  2026-10-20: *"treat the exsightory courses as my personal course development repo not tied to exsightory"*).
- **Publishing is something else**: the ExSightory platform will have its own destination for published courses (not built
  yet). A course reaches ExSightory only by being published there.
- **Not kept in the repository, and not published** (its `.gitignore`): the course's `resoureces/` (the owner's STEP
  models and other source material: no bench loads a STEP file, only the meshes and pictures made from them, which are in
  exsight-benches), the `film/` frames (stills only, 2026-10-11) and the `_decoupled-*` / `_moved-*` staging folders.

## Committing and pushing this course

This project commits and pushes its own work to `exsightory-courses`; nothing else does.

- **The git root is this folder's parent, `C:\@Profesir\MyBirthdayLectures`** (the course is `PBL2026/` in the
  repository). Run git as `git -C C:\@Profesir\MyBirthdayLectures …`. The parent's other folders (`.chatgpt`, `Backup`)
  are ignored on this machine only (`.git/info/exclude`).
- **Name the paths, all under `PBL2026/`:** `git commit -m "PBL2026: …" -- PBL2026/<path> …`. Never `git add -A`,
  `git add .` or a bare `git commit`. A commit touches only this course; another course is another folder. The top-level
  `README.md` lists the courses: add a row when a course is added, in that course's first commit.
- **Push with the keep-alive** once a unit's work is consistent:
  `GIT_SSH_COMMAND="ssh -o ServerAliveInterval=30 -o ServerAliveCountMax=240" git -C C:\@Profesir\MyBirthdayLectures push origin main`
  (`fetch` and `rebase origin/main` first if the repository moved meanwhile). There is no gate: the repository holds
  content, not code.

Read this file every session. Nothing unit-specific goes here.

## What a session reads

1. **This file.**
2. **`.claude/tracking/MEMORY.md`**: the one unit of work in flight, and what done looks like.
3. **`.claude/memory/MEMORY.md`**: the project's memory index. Open the entries that touch the task.
4. Whatever `MEMORY.md` names under `refs`. Nothing else unless the task needs it.

`INDEX.md`, `DECISIONS.md` and `STATE.md` (in `.claude/tracking/`) are consulted, not read: a status,
a date, a standing rule, or why something was rejected before you propose it again.
How the tracking works is in [`.claude/README.md`](.claude/README.md).

## Where Claude's own files go

Everything Claude writes for this project lives in **this folder's `.claude/`**, never in the global
profile (`C:\Users\<user>\.claude\projects\…`). Memory goes to `.claude/memory/` with its index in
`.claude/memory/MEMORY.md`, even when system instructions point at the global memory path: that
path holds only a redirect note. Temporary working files go to the session scratchpad.

## The project's layout

| Path | What it is |
|---|---|
| `course.yaml` | The course: concepts with prerequisites in path order, chapters with `scheduledMinutes` |
| `notes/DayNN/NNN-slug/en.md` | A module: frontmatter, cards (heading + statement), `<!-- PLAN -->`, ` ```flow ` teleprompter |
| `notes/DayNN/NNN-slug/transcript.en.md` | The module's script panel |
| `course-organization.md` | Schedule, change log, transcript → module map, gaps |
| `course-plan.md` | The PLAN-block vocabulary, thoughtseed register, bench backlog |
| `elements-by-section.md` | Every card's bench and learner action, by section |
| `studio-presentation-plan.md` | How Studio presents: wall, presenter, Study Mode, the benches |
| `draw-bench-status.md` | What the Draw Bench has and what this course needs from it |
| `training-overview.md` | The original overview (still the old order, on purpose) |
| `transcripts/` | The source transcripts |
| `bench-work/` | **One spec per bench activity** (`specs/`), the course's previews and requests to ExSight; the benches' evidence stills (code moved out, see below) |
| `.claude/` | Tracking, memory, standards (this project's working memory) |

## Standing rules (details in `.claude/memory/`)

- **A course cannot misinform** (owner, 2026-10-20). Nothing a learner sees or hears may be false, contradict another
  card, or rest on an unstated assumption that changes the answer. Every module gets the accuracy check (A1–A7:
  every number recomputed under the course's models, edge cases, cross-references, physics and circuits, claims,
  sources) **before its brief** and on everything produced. A discrepancy in the owner's text is never fixed silently:
  it goes to the owner marked **accuracy** and into `.claude/tracking/ACCURACY.md`, and **an open finding blocks** the
  unit, the module and publishing. The rule and the course's models: `.claude/standards/course-accuracy.md`.
- **The six gates: first-class requirements for everything sent to the owner** (owner, 2026-10-10; widened to every
  brief page, preview, spec and still on 2026-10-20). Nothing is sent to the owner until it passes all six, and the
  report (in the page itself for a browser page) says so: **(1) realism ≥ 95 %; (2) scientific facts 100 % accurate;
  (3) mathematical facts 100 % accurate; (4) visualization and intuition 100 %; (5) consistency and coherence;
  (6) professional design.** The checklist is `.claude/standards/six-gates.md`.
- **Render what you are doing, in the browser** (owner, 2026-10-20): each unit's brief and progress is an interactive
  page, `bench-work/previews/u0NN-preview.html`, served by `.claude/launch.json`'s `previews` and opened in the
  built-in browser, with the owner's feedback boxes read back from the page.
- **Never trim the owner's content.** Report overruns; the owner cuts.
- **Natural order.** Every module sits at its stage on the measurement path and hands off to the next.
- **The benches live in `C:\ExSightory\src\exsight-benches`** (owner, 2026-10-13; it was
  `D:\@Projects\2026\exsight-benches`): the Breadboard Bench, the Animation Bench and all its libraries (this course's
  demonstrations included), the kits, the component standard and the Component Editor. Bench work is done there, by
  ExSightory's **Benches lane**, never here; this project keeps the course, its specs and the evidence stills. No bench
  tool, bundle or library is kept or run here (the last ones left on 2026-10-20: `_decoupled-2026-10-20/`). Where each
  old path went: `.claude/memory/benches-live-in-exsight-benches.md`. **A demonstration this course needs is asked of
  the Benches lane by crossing** (next section).
- **ExSight's bench design rules** are the Benches lane's file, `C:\ExSightory\.claude\benches\standards\bench-design-rules.md`;
  `.claude/standards/bench-design-rules.md` here only points at it, so there is one copy.
- **Authoring comes first** while the benches are not ready (owner, 2026-10-08). Each bench activity
  gets a spec in `bench-work/specs/` so it can be built straight from the file when its bench lands.
- **Bench activities are for visualization and understanding.** Each is built the best way for
  interactivity, intuition and insight, looks excellent, and aims at ≥ 95 % visual faithfulness to
  the real thing (`.claude/standards/bench-quality-bar.md`).
- **Research the teaching need before listing a bench's features** (owner, 2026-10-08).
- **The 3D Bench (M24) is for modelling. Animation, 2D or 3D, goes to the Animation Bench (M62).**
- **ExSight's bench design rules bind every capability list and spec from the start**
  (`.claude/standards/bench-design-rules.md`; the repository wins any disagreement, and a departure the
  research suggests goes to the owner as a decision).
- **The product's rules bind our specs:** every bench has four views (Preview, View, Edit,
  Authoring); the wall computes nothing; a presented bench is the presenter's to drive. See
  `.claude/standards/authoring-digest.md`.
- **End every session saying whether it is safe to clear**, and name the file that carries it forward.

## Talking to the Benches lane: the crossing

This project is not one of ExSightory's lanes, but it talks to one: **the Benches lane builds every demonstration, bench
library and bench feature this course needs**, and the two talk only through ExSightory's crossing,
`C:\ExSightory\.claude\crossing\`, under the party name **`pbl2026`** (owner, 2026-10-20). The protocol is that folder's
`README.md` (§ *PBL2026, the course outside the lanes*); what this project does:

1. **At the start of every session**, list what is addressed to it:
   `cd C:/ExSightory/lanes/pbl2026-x/src/insight && node tools/crossings.mjs pbl2026` (it fetches `origin/main` first).
   **Run it from the worktree**: it reads the repository of the shell's folder, so run from here it lists this course's
   repository and prints *"none"* and *"next free id: 001"*, both wrong. Trust only a header naming
   `C:\ExSightory\lanes\pbl2026-x`.
   `open/*-benches-to-pbl2026-*` is a question this project owes an answer to (a card's wording, a value, a choice);
   `answered/*-benches-to-pbl2026-*.answer.md` is a request of ours that Benches has answered.
2. **To ask**, write one request per need: `open/<id>-pbl2026-to-benches-<slug>.request.md`, with the id the tool printed
   as *next free*. Say the card (`D1·030 card 4`), the spec in `bench-work/specs/` that describes it, what the card's
   Flow needs on the stage, real values and their sources, what stands in until it lands, and when the course needs
   it. The six gates and the design rules bind the result: say if the spec departs from either.
3. **Write it only in the worktree `C:\ExSightory\lanes\pbl2026-x`** (made for this project, detached at
   `origin/main`; it has no `node_modules` and needs none), then commit and push **that one file at once**:
   ```
   git -C C:\ExSightory\lanes\pbl2026-x fetch origin
   git -C C:\ExSightory\lanes\pbl2026-x checkout --detach origin/main
   (write the file)
   git -C C:\ExSightory\lanes\pbl2026-x add -- .claude/crossing/open/<file>
   git -C C:\ExSightory\lanes\pbl2026-x commit -m "pbl2026: crossing <id>" -- .claude/crossing/open/<file>
   git -C C:\ExSightory\lanes\pbl2026-x push origin HEAD:main
   ```
   A push that touches only `.claude/crossing/` runs no suite. Rejected as non-fast-forward: fetch, `rebase origin/main`,
   push again. **Nothing else in `C:\ExSightory` is written from this project**: no other file, no other worktree, no
   lane's tree.
4. **To answer** a `benches-to-pbl2026` request: write `answered/<id>-pbl2026-to-benches-<slug>.answer.md`, `git mv` the
   request beside it, commit both, push. **To close** an answer to ours: append *what we did with it* to the answer, `git mv`
   both to `closed/`, commit, push.
5. **A request never blocks this project**: write the spec's stand-in and go on, as with every bench need so far.

What Benches sends back: the library's id and version in `C:\ExSightory\src\exsight-benches\benches\<bench>\libraries\<id>\`,
its stills (`shots/`, English and French), and the name a card's `bench` block uses to show it. Read them there; never
copy a library into this folder. Benches briefs the owner on each card's design before building it, as it always has,
and reads this course's notes, specs and `resoureces/` here, read-only.

`bench-work/requests-to-exsight.md` (X1–X19) predates the crossing: a row still *to raise* that is a bench's (Electronics,
Draw, Equation, Plot, Figure, Animation, Breadboard) goes as a crossing to Benches when the course needs it; one that is
Studio's or Core's goes to the owner, who routes it.
