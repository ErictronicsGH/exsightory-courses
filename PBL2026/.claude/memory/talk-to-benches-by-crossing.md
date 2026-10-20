---
name: talk-to-benches-by-crossing
description: Owner 2026-10-20: this course asks ExSightory's Benches lane for every demonstration and bench need by crossing (party pbl2026), written and pushed only from C:\ExSightory\lanes\pbl2026-x
metadata:
  type: project
---

Owner, 2026-10-20: a session of its own works on this course, and the Benches lane builds what it needs; the two have
to talk. They talk through ExSightory's crossing (`C:\ExSightory\.claude\crossing\`), this project's party name being
**`pbl2026`**: requests `NNN-pbl2026-to-benches-<slug>.request.md`, questions back `NNN-benches-to-pbl2026-…`. The
steps are in `CLAUDE.md` (*Talking to the Benches lane*) and the crossing's `README.md`.

**Why:** the crossing is already the one place ExSightory's lanes write to each other, and the Benches session lists
it at every start, so a request is seen without anyone relaying it. The worktree `lanes\pbl2026-x` (detached at
`origin/main`, no `node_modules`) exists so this project never writes into a lane's tree or the root checkout, which
carries other lanes' uncommitted work.

**How to apply:** start every session with `node C:\ExSightory\lanes\pbl2026-x\src\insight\tools\crossings.mjs pbl2026`.
One request per need, naming the card, its spec in `bench-work/specs/`, real values, the stand-in and when it is
needed; commit and push that one file at once; never wait on it. Never write anything else in `C:\ExSightory`: the
course lives in its author's folder (its development repository, `exsightory-courses`, is the owner's own and not
ExSightory's), and it reaches ExSightory only when published to the platform (`CLAUDE.md`).
Related: [[benches-live-in-exsight-benches]], [[authoring-first-specs-per-activity]].
