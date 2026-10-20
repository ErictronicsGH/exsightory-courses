---
name: component-editor
description: The Component Editor (ExSight-only) edits bench components' manifests; index.html?editor=<id>; all four stages built (S4: golden cases on law + unit, Try it, six gates signed per content digest, Publish)
metadata:
  type: project
---

Owner, 2026-10-11: *"it seems we actually need a component editor"*, then "go with your recommendations" on the brief and on
the layout still (bench-work/previews/component-editor/editor-layout.png). It is the Breadboard Bench's side of the
product's planned Component Studio (M25 stage 15), **ExSight only** (the product's rule: only ExSight makes components).

**Why:** a component's own properties (views, terminals, body…) were being set inside lesson Authoring, which may only
narrow a component. They belong to the component's maker, in a tool of their own.

**How to apply:**
- Code: `bench-work/prototypes/breadboard-bench/src/editor/` (editor.js page, stage.js studio stage, forms.js sections,
  checks.js, measure.js, registry.js: a new component joins `COMPONENTS` with its manifest and model builder).
  Opened as `index.html?editor=<component id>`, from the bench's ⋯ menu and the pane's *Edit component…* — both only
  where the bench runs on its own (never in Studio's sandbox: `window.top === window && origin !== 'null'`).
- The checks are the validator's own: `components/schema/manifest-rules.mjs` (shared with validate.mjs) plus the schema
  precompiled by `make-standalone.mjs` (run by build.cmd; no eval). Never fork the rules into the editor.
- It edits data only; the model is measured and bound by node name, never shaped. Terminals: `modelNode`, stud = middle
  of what stands proud + tip, socket = opening (standard §3.7).
- Look: the owner's rendered UI, corrected (DECISIONS 2026-10-11): neutral studio, no brand, computed readings, charcoal
  body, plug direction derived. Stills shots/v1.6-editor-render/.
- Stages: S1–S3 built (S2: properties, controls, indicators picked on the model, panel/symbol/icon, materials & colours
  = manifest `materials` read by model.js applyPaints; forms2.js. S3: failures with Show on the stage, author limits,
  labels + EN/FR words, sounds, trace; forms3.js). S4 built 2026-10-12 (forms4.js, runner.js, tryit.js; stills
  v2.0-editor-stage4): golden cases run on the law and on a unit (glass within accuracy); Try it (supply.attach with
  canvasOnly, detach, entry.reset); six gates signed for a content digest (components/schema/release.mjs, shared with
  the validator; browser crypto.subtle and Node agree); Publish → POST /api/publish (stills to stills/<version>/,
  validator + class tests first). A released file never changes. Released only through Publish.
- **Never publish or sign the real supply in tests**: the release belongs to the owner. Test publish against a scratch
  copy: `node tools/serve.mjs 8771 --components <scratch>/components --no-build`.
- Toggle lists keep the saved file's order (inOrder) or an undone toggle reads as a change.
- Save shows only when something changed (owner, 2026-10-12), in the editor and on the bench.
- **Save → the component's own file** (owner, same day): through tools/serve.mjs (the prototype's server now; launch
  config "breadboard-bench"): validator first, backup in components/_archive/autosave/<id>/, then build.cmd. The editor
  loads the file from disk via GET /api/component. Static hosting: a copy only.
- **Read-only** (owner, same day): manifest `readOnly: true` locks the whole editor until unlocked (top-bar switch).
- Stage camera near plane 20 mm: the glass's planes are 0.01 mm apart and tear with a 1 mm near plane (also fixed in
  thumbs.js). Related: [[component-standard]], [[select-drag-and-property-pane]], [[benches-load-in-studio-as-widgets]].
- **Next (owner, 2026-10-12):** an error logger (actual, physics, maths errors) that pushes its logs to the platform; and a full test of the supply in every capability and view.
