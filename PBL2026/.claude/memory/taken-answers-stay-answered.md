---
name: taken-answers-stay-answered
description: a Benches answer that only says "taken as B0NN, the close gives the names when it lands" stays in answered/ until the unit lands; we close it then
metadata:
  type: project
---

When Benches answers a pbl2026 request with *"Taken as B0NN … when it lands, the close gives the library's id and the
names"*, the course does **not** move it to `closed/` yet: there is no stub to replace. Record the backlog unit in the
spec (§12/§13) and the unit's handoff, and leave the pair in `answered/`. Close it (append what we did, `git mv` both to
`closed/`) when the build lands and the card's `bench` block is rewritten. An answer that settles a shape to write the
specs to (505) is consumed by writing the specs, then closed.

**Why:** 2026-10-21, thirteen answers arrived at once (493–496, 505, 506, 510–512, 516–519), every one "taken into
Benches' backlog" with the final names promised at the close; the protocol's close means *the requester took it and
replaced its stub*, which cannot happen before the build.

**How to apply:** at session start, an answered/ list of "taken" answers is not work owed; read new ones once, note the
B-unit in the spec, and act only on answers that ask the course something (e.g. 516's card 8 fallback, to the owner) or
settle a shape (505). See [[talk-to-benches-by-crossing]], [[crossings-tool-runs-from-the-worktree]].
