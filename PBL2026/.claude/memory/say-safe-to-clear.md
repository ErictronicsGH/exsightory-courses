---
name: say-safe-to-clear
description: End every session by saying whether it is safe to /clear and naming the file that carries the work forward
metadata:
  type: feedback
---

The owner's standing rule from InsightDemo (2026-09-22: *"is it safe to /clear? always say when it
is safe to clear"*), applied here with the same tracking protocol.

**Why:** the owner reads the end of a session for that one line; without it they have to ask.

**How to apply:** after a unit is archived, use the exact sentence in `.claude/README.md`. Otherwise
say it is safe to clear and name the file that holds the state (usually the `## Progress` section of
`.claude/tracking/MEMORY.md`). Write down anything that exists only in the conversation first.
Related: [[project-files-stay-local]].
