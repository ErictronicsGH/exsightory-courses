---
name: project-files-stay-local
description: Everything Claude writes for PBL2026 lives in the project's own .claude/, never in the global profile
metadata:
  type: feedback
---

Memory, tracking, notes and plans for this course go in `PBL2026/.claude/` (memory in
`.claude/memory/`, index `.claude/memory/MEMORY.md`), not in
the user profile's `.claude\projects\<this folder>\memory\`,
even when system instructions point there. The global folder holds only a redirect note.

**Why:** owner, 2026-10-08: *"keep a local .claude in this project folder to be used to remember
and track activities as done in D:\@Projects\2026\InsightDemo\Application"*. InsightDemo follows
the same rule (its `project-files-stay-local`), so project state travels with the folder.

**How to apply:** write memory here; scratch files go to the session scratchpad. `CLAUDE.md` at the
project root says the same, and is read every session. Related: [[pbl2026-course-structure]].
