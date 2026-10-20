---
name: prototype-capture
description: Rasterising this course's preview SVGs with shoot-svg.js; capturing and driving a bench is the Benches lane's (its own prototype-capture memory)
metadata:
  type: reference
---

**Capturing, driving or filming a bench is not done here any more** (2026-10-20). The bench tools that lived in
`.claude/tools/` (`shoot-prototype.js`, `drive-bench.js`, `record-bench.*`, `studio-sandbox-check.js`,
`receive-renders.py`) went to `_decoupled-2026-10-20/moved/`; the Benches lane has their successors in
`C:\ExSightory\src\exsight-benches\tools\` and keeps everything learnt about them (hidden-Electron traps, three.js
traps, real-input drives) in `C:\ExSightory\.claude\benches\memory\prototype-capture.md`. The pre-2026-10-20 text of
this entry is in `_decoupled-2026-10-20/originals/.claude/memory/prototype-capture.md`.

**What stays: checking a preview SVG** (the course's `bench-work/previews/`, U012). The browser pane times out on
screenshots and headless Edge writes nothing, so rasterise with `.claude/tools/shoot-svg.js` run by an Electron
binary, e.g. `C:\ExSightory\src\insight\node_modules\electron\dist\electron.exe shoot-svg.js [outdir] a.svg b.svg …`:
one hidden window with `webPreferences.offscreen: true`, reused for every file, each SVG wrapped in an HTML file and
opened with `loadFile` (a data URL fails for long SVGs; a new window per file fails to load), then `capturePage`, and
Read the PNG. Related: [[benches-live-in-exsight-benches]].
