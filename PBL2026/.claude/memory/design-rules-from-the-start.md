---
name: design-rules-from-the-start
description: ExSight's bench design rules are integrated into every bench capability list and spec from the start; the digest is .claude/standards/bench-design-rules.md
metadata:
  type: feedback
---

Owner, 2026-10-08: *"also check the bench design rules so we can integrate from the start"*, said
while the Animation Bench research was running.

**Why:** a capability list or a mock-up that ignores the product's frame and rules has to be redone;
the owner renders the UI in ChatGPT straight from the list.

**How to apply:** read `.claude/standards/bench-design-rules.md` (digest of InsightDemo's guidelines,
standards, tokens and the owner's Electronics Bench renderings) before writing any bench list or spec.
Every bench's View uses the Electronics Bench frame (mode switcher, identity bar, stage, dock of tiles,
one side-panel shape). Where research and the repository disagree, the repository wins and the point
goes to the owner as a decision. Attach the owner's renderings
(`InsightDemo\Application\rsrc\image_assets\studio_images\electronics bench\`) when asking ChatGPT for
renders. Related: [[research-before-bench-features]], [[bench-quality-bar]].
