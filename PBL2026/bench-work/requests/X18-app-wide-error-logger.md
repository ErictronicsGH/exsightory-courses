---
request: X18
from: PBL2026 (owner's direction, 2026-10-12)
to: core (InsightDemo, .claude/implementation/), with a crossing core → platform for the route
raised: not yet (draft; to be filed as `.claude/crossing/open/<id>-core-…` or into Core's backlog by the owner or a core-lane session)
blocks: nothing here. This project stubs its side (§6) and keeps going
status: L1–L4 decided as recommended (owner, 2026-10-12: "Proceed"); to raise. This project's stub (§6) built and tested
---

# One error logger for the whole application, switchable, that sends to the platform

Owner, 2026-10-12: *"an application wide error logger in the studio and that can be activated or
disabled. and it should log any form [of] warning and errors and send it to the platform. so this should
be done on the core lane"*.

This replaces the plan for a logger inside the Breadboard Bench prototype (U040, part 2). The bench
becomes one reporter among many; Studio owns the capture, the switch, the store and the sending.

## 1. What exists today (read-only survey, 2026-10-12)

| Piece | Where | State |
|---|---|---|
| Renderer console → main | `apps/desktop/src/main/windows.ts:215-225` `forwardConsole` | copied to main's **stdout only**; no file |
| Vue errors | `apps/desktop/src/renderer/src/main.ts:156-158` `app.config.errorHandler` | `console.error` only |
| `window.onerror`, `unhandledrejection`, crashReporter | anywhere in `Application/` | **none** |
| Widget host | `packages/canvas/src/WidgetViewer.vue` | iframe `sandbox="allow-scripts"`, **no `message` listener** |
| Compiler diagnostics | `insight-core/src/compiler/diagnostics.ts` | authoring-time, not run-time |
| Event logs | `insight-protocol/src/event-log.ts` | learning records; namespaces closed (room: session, student, …; device: `study` only) |
| Device-log upload | insight-api `POST /api/v1/devices/{device}/log` (`device_logs.rs`) | hash-chained, signed; accepts `study.*` only; **mounted nowhere yet** |
| Server tracing | `erictronics-common/src/telemetry` | levels error/warn/info/debug and a "never logged" list: a model to follow |

## 2. The rules this meets (and the one it changes)

- **security-baseline 4.5**: *no telemetry, no analytics, no crash reporting to any third party*; any other
  outbound flow is "undeclared". **This request asks for one declared, first-party flow** (to ExSight's own
  platform, through `PlatformClient`) and an amendment to 4.5 that names it. Nothing to a third party.
- **4.4**: no secret, roster row or email address in a log line. Enforced by the record's shape (§4) and a
  scrubber, not by trust.
- **2.3 / 3.1**: widgets stay `connect-src 'none'` and opaque-origin. They report by `postMessage` to the
  host; they never get the network.
- **Standing rule 12**: the app teaches with the platform off. Logging never waits on the network; the
  store is local first, sending is an outbox.
- **UI/UX guidelines**: *the least telemetry*, *do not collect because you can*, first-party, consent-respecting,
  never on the critical path; pending data labelled *on this device*.
- **Design rules 8.12**: the teacher is told, never interrupted. No toast, modal or wall message for a
  logged error during a presentation.

## 3. What Core builds

**3.1 One switch, two states shown.** Settings → *Diagnostics*: **Error logging** on/off. Under it, while
on: *Send to ExSight* on/off, the count kept on this device, *Open the log*, *Clear*. Switching logging
off stops capture and keeps nothing new. (Decision L1 in §7: defaults.)

**3.2 Capture, everywhere the app runs code:**
- main: `process.on('uncaughtException' | 'unhandledRejection')`, `console.warn`/`console.error`, failed IPC
  guards (they already name the field: CLAUDE.md 495-496);
- renderer(s), presenter and wall: `window.onerror`, `unhandledrejection`, `console.warn`/`error`, Vue's
  `errorHandler` and `warnHandler`, failed resource loads (`error` events in the capture phase);
- benches in-process: the same, with the bench's kind and canvas id;
- **widgets** (iframes): a `message` listener in WidgetViewer accepting only
  `event.source === iframe.contentWindow` and a versioned, zod-guarded shape (§4.2). Rate-limited per
  widget (e.g. 20 a second, 500 a session), size-capped, with drops counted.
- the compiler's run in Studio: diagnostics of level error/warning, as records of `source: compiler`.

**3.3 Store.** JSON lines under `userData/logs/` (rotating: e.g. 5 files × 1 MB), written by main only.
Identical consecutive records collapse into one with a count, so a 60 Hz failure does not flood the file.

**3.4 Send.** An outbox in main. When *Send to ExSight* is on and the platform is reachable, batches go
through `PlatformClient` to the platform's route (§5); acknowledged lines are marked sent; failures retry
with backoff; nothing blocks. Off, or offline: the lines stay *on this device*.

## 4. The record

**4.1 One line:**
```json
{ "v": 1, "ts": "2026-10-12T14:03:22.418Z", "level": "warn",
  "source": "widget", "code": "bench.physics.law-mismatch",
  "message": "vOut 5.06 V against the law's 5.00 V (CV, 68 Ω)",
  "where": { "app": "studio", "version": "0.x.y", "build": "…", "window": "presenter",
             "course": "<id>", "slide": "<id>", "canvas": "<id>", "widget": "breadboard-bench" },
  "context": { "component": "exsight.supply.sw3005@0.2.2", "view": "view", "camera": "3d", "lang": "en" },
  "stack": "…", "count": 1 }
```
- `level`: `error | warn` (what the owner asked for); `info`/`debug` exist but are never sent.
- `source`: `main | renderer | bench | widget | compiler`.
- `code`: stable, dotted; a widget's codes are prefixed by the host with `widget.<name>.`.
- `context`: a small free object (≤ 2 KB, flat values, no arrays of rows); scrubbed: emails, tokens,
  key-like strings and file paths under the user's home are replaced.
- Numbers: `NaN`/`Infinity` are written as strings (`"NaN"`) so they survive JSON (CLAUDE.md 480-483).
- Never: student names, roster rows, answers, recordings, document text.

**4.2 What a widget posts** (the only thing it can do):
```js
parent.postMessage({ exsight: 'log', v: 1, level: 'warn', code: 'physics.law-mismatch',
                     message: '…', context: { … }, stack: '…' }, hostOrigin);   // the origin its log-hello came from, never '*'
```
The host fills `where`. The host greets the widget once at load with `{ exsight: 'log-hello', v: 1,
enabled: true }`, so a widget can skip expensive checks when logging is off; a widget posts nothing before that
greeting, and only to the origin it came from (`e.origin`), so a page that merely frames it receives no record.

## 5. Crossing core → platform: the route

Either (a) a new device-log namespace `diag` on the existing signed device-log route (a deliberate change to
`insight-protocol`'s closed namespaces, and the route mounted), or (b) a separate `POST /api/v1/diagnostics`
on insight-api: authenticated by the device, batches ≤ 500 lines, ≤ 16 KB a line, retention stated
(e.g. 90 days), readable by ExSight staff for upgrades, never by course authors. **Recommendation: (b)**:
diagnostics are not learning records and should not share their chain, retention or readers.

## 6. What this project does meanwhile (the stub): built 2026-10-12

The Breadboard Bench prototype reports through §4.2 and nothing else:
- `src/lab/report.js`: `report(level, code, message, context)` → `parent.postMessage` when framed;
  standalone, `POST /api/log` to `tools/serve.mjs`, which appends to `bench-work/logs/YYYY-MM-DD.jsonl`
  (the stand-in for the platform, as the crossing rule asks: stub it, keep going).
- capture inside the widget: `window.onerror`, `unhandledrejection`, `console.warn`/`error`, the swallowed
  catches that matter (component fetch, compile, thumbnails), `createLab(…)` without `.catch`.
- **the bench's own checks**, which Studio cannot make (it does not know the physics), sent as `warn` /
  `error` with `code` `physics.*` and `maths.*`:
  - physics: the unit's readings against its class law at steady state (beyond the accuracy band);
    a reading past a rating (terminal, conductor, `pOutMax`); the thermal node against `thermalSteady`;
    power in = power out + loss within 1 %; a trip that fired against its manifest's rule;
  - maths: a glass value against the true value beyond ±(pct + counts); `NaN`/`Infinity` in any reading;
    a rounding that shows a digit the resolution does not have.
  Checked once a second, not per frame; one record per kind until the state changes.

Found by the survey (fixed 2026-10-12): the supply's over-temperature trip in the manifest waits `for_s: 1`; the
firmware tripped at once. It now waits the manifest's time above the trip temperature (class tests 53/53).

**As built** (`bench-work/prototypes/breadboard-bench/`):
- `src/lab/report.js`: capture, the record, the scrubber, a twin collapsed into a count, 20 a second and 500 a session,
  the host's `log-hello` switch and `?log=0`, `postMessage` inside Studio, `POST /api/log` standalone,
  `window.__report` for tests; `src/lab/build-stamp.js` (written by build.cmd) carried as `where.build`.
- `src/components/supply/watch.js`: maths.non-finite, physics.law-mismatch, physics.usb-law, physics.over-range,
  physics.over-rating, physics.power-balance, physics.thermal, maths.glass-accuracy, maths.glass-format.
- `src/components/sensor/watch.js`: maths.non-finite, physics.law-mismatch (self-heating included), physics.power-balance.
- `tools/serve.mjs`: `POST /api/log` (checked: v, level, code, sizes, ≤ 200 a batch) → `bench-work/logs/<day>.jsonl`;
  `GET /api/log?n=`.
- `.claude/tools/studio-sandbox-check.js`: the parent page stands in for WidgetViewer's listener (source check, hello).
- Swallowed catches now reported: library tiles, preset views, shader pre-compile, a boot that fails.

**Tested** (2026-10-12): clean boot, nothing reported; 5 V into 68 Ω, CC into 2 Ω, USB-C loaded: nothing reported;
an unplanted 5 % glass gain → maths.glass-accuracy; an unplanted 5 Ω contact → physics.law-mismatch; the same as a
planted fault → nothing; console.warn / a thrown error / a rejection / a missing image → captured, address, home path
and token scrubbed, the component id kept; 100 twins → one record, count 100; 50 in a second → 20 kept;
switched off → nothing kept; the route refuses v 2, level info, a bad code, 0 or 201 records, bad JSON. In Studio's
sandbox (origin null, fetch blocked): both records reached the stand-in host by message; with the host's switch off,
nothing kept or sent.

**What the first real run taught** (the supply campaign, 2026-10-12): the checks themselves raised false alarms, all
fixed before anything was kept. A capture's jump of the clock (`at(t)`) counted as settling time; differences
below what the glass can show (10⁻⁵ V) counted as errors; a current just above a limit lowered a moment ago (the
output capacitor letting go, as on a real unit) counted as over-range; OUTPUT switched off and on inside a second
looked like no change. The rules now: the checks' own stepped clock, a tenth of a count as the floor, the limit
checked once settled, the state compared at every step. Final: campaign 235/235, LDR versions 23/23, wires 49/49,
**zero records** from any of them; the planted-by-hand defects still caught; Studio sandbox clean. Bench gate for
the future: a regression run that leaves records in `bench-work/logs/` is a finding, either in the model or in the check.

## 7. Decisions (owner, 2026-10-12: "Proceed" → as recommended)

- **L1. Defaults.** Recommended: **Error logging on**, kept on this device; **Send to ExSight off** until the
  user (or the institution's policy) turns it on, with one line saying what is sent. Alternative: both on.
- **L2. Who sees the switch.** Recommended: every Studio user in Settings; Scope (student app) logs only
  its own app errors, sending off, no widgets (Scope does not show them).
- **L3. Route.** Recommended (b) above.
- **L4. During a presentation.** Recommended: nothing shown; a quiet count on the presenter's strip after
  the lecture only (8.12).
