---
name: crossings-tool-runs-from-the-worktree
description: crossings.mjs reads the repository of the shell's cwd; run it from C:\ExSightory\lanes\pbl2026-x\src\insight or it lists the course repo (0 crossings, next id 001)
metadata:
  type: feedback
---

Run the crossing list from the worktree, not from the course folder:
`cd C:/ExSightory/lanes/pbl2026-x/src/insight && node tools/crossings.mjs pbl2026`.
Run as CLAUDE.md writes it (`node C:\ExSightory\lanes\pbl2026-x\src\insight\tools\crossings.mjs pbl2026`) from
`PBL2026`, it fetches and reads **the shell's repository** (`C:\@Profesir\MyBirthdayLectures`), prints *"none"* for both
lists and *"next free id: 001"*: wrong, and a crossing written with that id would collide.

**Why:** 2026-10-20 (U018 session start): the CLAUDE.md form gave 0 / 0 / 001; from the worktree it gave 0 / 0 / 510,
with 493–496, 505, 506 still open on origin/main. The worktree's own checkout lags origin/main; read files there with
`MSYS_NO_PATHCONV=1 git -C C:/ExSightory/lanes/pbl2026-x show "origin/main:<path>"` (Git Bash mangles `origin/main:.claude/…`
without `MSYS_NO_PATHCONV`).

**How to apply:** at every session start ([[talk-to-benches-by-crossing]]), and just before taking an id for a request.
Trust the header line *"origin/main + C:\ExSightory\lanes\pbl2026-x"*; any other path means the wrong repository.
