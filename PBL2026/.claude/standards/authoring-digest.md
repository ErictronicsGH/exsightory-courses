# Authoring digest: the format, Studio's surfaces, and the bench rules

What a session needs to author this course and write bench specs, pulled together from InsightDemo
(as read on 2026-10-07/08). **The repository wins any disagreement**: if Studio behaves differently,
correct this file. Fuller accounts: `studio-presentation-plan.md` (this folder), InsightDemo
`Application/insight/AUTHORING.md`, and the memory `eac-format-reference.md`.

## 1. The course format (EAC)

- A course is a folder: `course.yaml` (title, concepts with prerequisites, chapters with
  `scheduledMinutes`) and `content/<chapter>/<NNN-slug>/en.md`. Ours keeps the modules under
  `notes/DayNN/NNN-slug/`. Numbers go up in tens so something can go in between.
- `en.md` frontmatter: `targetMinutes`, `motivates`, `objectives`, `concepts`.
- **One knowledge point per card** (EAC spec 01). A heading opens a card; `***` forces a break;
  110 words and 3 blocks per card; minimum wall text 32 pt.
- A bench or media block (`canvas`, `figure`, `plot`, `equation`, `model`, `circuit`, `drawing`) joins
  a card holding only its heading and plays on the **Canvas** beside the reading column. Activities and
  `analogy` blocks get a card of their own; an activity placed before the statement is the
  predict-first order.
- On the wall, bold and italic flatten, tables, raw HTML and untagged code fences are dropped. Use
  `[words]{color=amber}`, `{size=large}`, `{font=mono}`, `V~RMS~`, `I^2^R`, `[term](glossary:slug)`.
- **Flow** = a ` ```flow ` fence after the block it belongs to: the teleprompter for that beat. Cues
  `[[ask]] [[pause]] [[demo]] [[reveal]] [[transition]]`. `transcript.en.md` is the lesson-level script
  panel (its word count gives "minutes to say" at 130 wpm).
- This course adds a `<!-- PLAN -->` comment per card: SHOW / ASK / SEED / HARVEST / ANALOGY / FAULT
  (vocabulary in `course-plan.md` §1–2), and a thoughtseed register (S1–S26 cross-day, S30+ within a day).

## 2. The surfaces

| Surface | Who | Holds |
|---|---|---|
| The wall ("ExSight wall" window) | The room (screen-shared, recorded at 1920 × 1080) | One card: reading column + Canvas. Never Flow, never answers |
| Teleprompter (Flow) | Presenter | The words for this beat; content-protected from capture |
| Script panel | Presenter | `transcript.en.md` |
| Study Mode (Studio) / Scope (learners' app) | Each learner | The course to read and drive alone; live activities |

## 3. Learner activities

`poe` (prediction, never scored, then reveal), `circuit` + `predict:` / `measure:`, `flash` (timed
single choice), `numeric` (tolerance + unit), `multi-select`, `poll` (`live: true`), `checkpoint`,
`quiz`, `exam`, `exit-survey`, `qa`. A `circuit` that declares a `reveal` and no `predict` does not
build: predict-before-reveal is a compiler rule, not a convention.

## 4. Bench rules that bind every spec

1. **Four views** (owner, 2026-10-07): **Preview** (default inside a slide, a few controls),
   **View** (the details panel, full view controls), **Edit** (during a presentation: basic and
   graphical editing, session-only, never written to the course; a student's Edit changes their own
   copy), **Authoring** (Course Studio, full editors, authors only). The first three are for everyone.
   A spec names which view each control lives in.
2. **The wall computes nothing**; it paints what main sends. A presented bench is the presenter's to
   drive; in Study Mode and Scope nobody owns it, so the learner drives it.
3. **Placement is authored, state is mirrored**: where a thing is drawn is frozen before the lecture;
   what state it is in is driven live.
4. **Stable ids, never indices**, for parts, steps, stops. Overlays are text nodes, never `innerHTML`.
5. **Reduced motion**: content animation reads `prefers-reduced-motion`; a step then lands whole.
   A wall's `data-motion="reduced"` is the projector's capability, not the person's request.
6. **Performance** on the weakest lecture machine (InsightDemo `standards/performance-budgets.md`).
7. **Libraries and components come from the platform**; only ExSight makes bench components.
8. **Electronics follows EveryCircuit** for anything circuit-specific; IEC symbols by default.
9. **The 3D Bench is for modelling (STEP, CAD, STL, GLB models); animation (2D or 3D) is the Animation
   Bench's**, built with any animation library: three.js or another code source, Manim or another
   rendered video, GLB/Lottie clips (owner, 2026-10-08). CAD never goes to the Animation Bench.

## 5. Benches at a glance

| Bench | Fence | Strength | Cannot (as of 2026-10-07) |
|---|---|---|---|
| Equation | `equation` | Colour-coded formula, derivation steps, `solveFor`, graph with sliders, `simulate` sources | Discrete-time maths; circuits |
| Plot | `plot` | y = f(x) with sliders, fills, fits, `animate`; `floor`, `round`, `mod`, `clamp` | Random data, FFT, computed dots |
| Figure | `figure` | Image/SVG/PDF with named parts, spotlight, tour, zoom, compare, scale | Computes nothing |
| 3D (Model) | `model` | STL/GLB/STEP, named parts, views, joints, sections, explode, tour | Animated clips (and it is for modelling) |
| Electronics | `circuit` | Live DC solve, overlays, animated current, reveals of real effects, probes, damage | DC only; no op-amp, switch, ADC, AC, scope |
| Draw | `drawing` | Step-traced line art, function curves, entries/exits/motions in the format | Wall plays trace only until M59n; no sliders |
| Widget | `canvas` kind `widget` | Own HTML/JS in a sandbox | Not in Study; state not mirrored |
| Animation | — (M62) | Planned: play/step 2D and 3D from any animation library (three.js code sources, Manim and other rendered videos, GLB/Lottie clips), stops, keyed points, overlays | Not built; never CAD |
| Coding | — | Planned for all firmware demos | Not built |
