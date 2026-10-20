---
name: benches-live-in-exsight-benches
description: Since 2026-10-13 every bench, library and kit of this course lives in C:\ExSightory\src\exsight-benches (ExSightory's Benches lane; was D:\@Projects\2026\exsight-benches); requests go to it by crossing as pbl2026; old bench-work/ paths map there; only specs, previews, requests and evidence stills stay here
metadata:
  type: project
---

Owner, 2026-10-13: the benches get their own repository and lane (`ErictronicsGH/exsight-benches`, private), then
*"proceeds with good recommendations"* for moving the Animation Bench and restructuring this project.

Where the old paths went (B001 and B002 in that repository's `.claude/benches/archive/`):

| Was in PBL2026 `bench-work/` | Now in exsight-benches |
|---|---|
| `prototypes/breadboard-bench/` | `benches/breadboard/` (bench), `kit/` (frame, editor, words), `lab-kit/` (the room) |
| `components/` (standard, schema, classes, market, convention, library) | `standard/`, `benches/breadboard/` and its `libraries/` |
| `prototypes/animation-bench/` | `benches/animation/` (served by `node tools/serve.mjs animation 8791`) |
| `libraries/<id>/` (80 libraries, 12 kits) | `benches/animation/libraries/<id>/`, each its own package |
| `libraries/component-render/` | `benches/animation/tools/component-render/` |
| `prototypes/eye-to-brain*`, `ldr-chain-2d`, `measurand-2d` | `benches/animation/prototypes/` |
| `research/01–15`, `breadboard-bench/*.md`, `reviews/`, `animation-bench-capabilities.md` | the bench they belong to (`research/`, `plans/`, `reviews/`), `standard/research/` |

What stays here: `specs/`, `previews/`, `requests/` and `requests-to-exsight.md`, `logs/`, every `shots/` folder,
films, frames and contact sheets (evidence, at their old paths, so links in the tracking archive still work), and the
archives (`libraries/_archive/`, `components/_archive/`). The moved files were staged in
`PBL2026/_moved-to-exsight-benches-2026-10-13/` and sent to the Recycle Bin (restorable).

**How to apply:** build or change a bench or a library only in exsight-benches, by the Benches lane. From this
project, write the spec in `bench-work/specs/` and ask for it by a crossing to Benches (`CLAUDE.md`, *Talking to the
Benches lane*). On 2026-10-20 the last bench tools here (`drive-bench.js`, `record-bench.*`, `shoot-prototype.js`,
`studio-sandbox-check.js`, `receive-renders.py`) and the stale `prototypes/breadboard-bench/bench.js` bundle went to
`_decoupled-2026-10-20/moved/`; exsight-benches has `tools/drive-bench.cjs` and `tools/studio-sandbox-check.cjs`. A path under `bench-work/` in older memory
entries or tracking files means the new place in the table. Related: [[authoring-first-specs-per-activity]],
[[bench-versus-library]].
