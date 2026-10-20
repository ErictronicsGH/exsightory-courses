---
name: benches-load-in-studio-as-widgets
description: Our bench prototypes must load in ExSight Studio; until a bench is a registry bench they ship as a `canvas` kind:widget folder, built to its sandbox (one script file, no fetch, textures in code, no storage)
metadata:
  type: feedback
---

Owner, 2026-10-11, on the Breadboard Bench prototype: *"make sure the bench we are creating can be loaded in the studio app"*.

**Why:** a bench designed outside Studio and only shown in a browser can fail where it matters; the course is taught from
Studio. Studio already hosts custom HTML with no product change: ```` ```canvas ```` `kind: widget`, `src: shared/widgets/<name>/index.html`
(the compiler copies the .html's folder).

**How to apply** (WidgetViewer.vue: `sandbox="allow-scripts"`, no same-origin; course CSP in insight-container/src/serving.ts):
- `script-src 'self'`: no inline script; bundle to one file beside index.html (InsightDemo esbuild, IIFE).
- `connect-src 'none'` and an opaque origin: no fetch/XHR, no GLB/HDR/JSON at run time; a picture file would taint WebGL,
  so textures are drawn in code (CanvasTexture) or `data:`; geometry in code.
- No localStorage (blocked; guard any use), no dialogs, no popups. Fonts: system fonts only.
- Widgets are not mirrored presenter→wall and not in Study Mode yet: say so; the real bench (M49) becomes a registry bench.
- Check it: compile a test course with `node packages/insight-core/bin/insight-compile.js <src> --out <dir>` and run the
  compiled widget under the course CSP inside a `sandbox="allow-scripts"` iframe (origin must read `null`, no console errors).
  The harness is a script, the Benches lane's since 2026-10-20: `C:\ExSightory\src\exsight-benches\tools\studio-sandbox-check.cjs` (this project's old `.js` is in `_decoupled-2026-10-20/moved/`); Benches runs it, not this project.
  Harness recipe (2026-10-11):
  - Electron and two local servers: the course server sends the course CSP with `frame-ancestors` set to the parent's
    origin; the parent page on another port holds `<iframe sandbox="allow-scripts" style="display:block">`.
  - Drive and read the iframe through `webContents.mainFrame.frames[0].executeJavaScript`: origin, `__bench.ready`,
    probes for storage and fetch, a `gl.readPixels` read-back (proves `data:` images do not taint).
  - Then screenshots.
  `data:` images are allowed (img-src 'self' data:): esbuild `--loader:.webp=dataurl` inlines them.
  Example: bench-work/prototypes/breadboard-bench/ (build.cmd, studio-course/). Related: [[prototype-capture]], [[bench-versus-library]].
