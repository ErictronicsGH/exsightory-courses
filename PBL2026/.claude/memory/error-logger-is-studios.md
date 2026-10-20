---
name: error-logger-is-studios
description: The error logger is application-wide in Studio (Core lane, request X18); a bench only posts records in X18's shape and runs its own physics/maths checks (report.js, watch.js)
metadata:
  type: project
---

Owner, 2026-10-12: *"an application wide error logger in the studio and that can be activated or disabled. and it should
log any form [of] warning and errors and send it to the platform. so this should be done on the core lane"*; then
"Proceed" on L1–L4 (logging on, kept on the device; sending off until turned on; every Studio user sees the switch;
a separate diagnostics route, not the signed study log; nothing shown to the room, a count after the lecture).

**Why:** a widget is sandboxed (`connect-src 'none'`, origin null) and cannot reach the network, and Studio had no
logger, no widget message bridge, and a security baseline (4.5) that forbids crash reporting. So capture, switch,
store and sending belong to Studio. A bench adds only what Studio cannot know: its physics and maths.

**How to apply:**
- The request is `bench-work/requests/X18-app-wide-error-logger.md` (also listed as X18 in `requests-to-exsight.md`). This project
  never edits InsightDemo. The owner, or a Core-lane session, files it through InsightDemo's `.claude/crossing/`.
- Every bench reports through `src/lab/report.js`: `report(level, code, message, context)`, and `watcher()` for a part's
  checks (once per kind while it lasts). Codes are dotted: `physics.*`, `maths.*`, `render.*`, `js.*`, `load.*`.
- Each new component gets a `watch.js` beside its component, built like the supply's and the sensor's. Planted faults are deliberate,
  so law and glass checks wait while one is planted.
- Standalone, records go to `tools/serve.mjs` `/api/log`, which writes `bench-work/logs/<day>.jsonl`. Delete test records you made.
- In Studio's sandbox check, the parent page stands in for WidgetViewer: it prints HOST LOGS, and `HELLO=off` sends the off switch.
- A check judges "settled" on its own stepped clock (watch.tick(dt)), and it compares the state at every step. It ignores
  differences below a tenth of a display count. It checks limits once settled. Each of these was a false alarm in the
  first campaign run.
- A regression run that leaves records in `bench-work/logs/` is a finding, either in the model or in the check.
Related: [[benches-load-in-studio-as-widgets]], [[component-standard]].
