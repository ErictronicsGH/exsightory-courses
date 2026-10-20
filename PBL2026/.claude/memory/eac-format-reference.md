---
name: eac-format-reference
description: "Where the ExSightory Authoring Compiler (EAC) guide, spec and example courses live"
metadata:
  node_type: memory
  type: reference
  originSessionId: 9596deb1-4a33-41b4-93d9-daf3e0bb509f
  modified: 2026-10-07T23:03:00.531Z
---

EAC = ExSightory Authoring Compiler, in C:\ExSightory\src (was D:\@Projects\2026\InsightDemo\Application until 2026-10-17).
- Planning docs: features_to_add_3/EAC_Implementation_Docs/ (01 = pedagogical spec: one knowledge point per slide).
- Encoded rules: insight/artifacts/eac-spec-1.1.0.json (rules + 18 dimensions) and refine-guide-1.1.0.json (block types, predict-first / no-new-claims invariants).
- Format example: test-course/src (course.yaml with concepts/prerequisites, chapters with scheduledMinutes; content/<chapter>/<NNN-slug>/en.md with frontmatter targetMinutes, motivates, objectives, concepts; optional transcript.en.md per subsection and per chapter; cue tokens [[ask]] [[pause]] [[demo]] [[reveal]] [[transition]]).
- Compiler: insight/packages/insight-core (dist not built as of 2026-10-07).
Studio facts verified 2026-10-07 (details in PBL2026/studio-presentation-plan.md):
- Wall = en.md cards (heading opens a card; 110 words / 3 blocks; bold/italic, tables, untagged code fences dropped).
- Teleprompter = ```flow fences after a block; transcript.en.md = script panel.
- Learner live activities over the internet: owner says built (2026-10-07); code in the checkout shows LAN-only + "hosted" unimplemented — confirm with an off-network dry run, don't argue it again.
- Benches: equation, plot, figure, model, circuit (DC only, no op-amp/switch/ADC/scope), drawing, plus sandboxed widgets (not in Study).
Related: [[pbl2026-course-structure]].
