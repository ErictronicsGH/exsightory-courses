# Draw Bench — What Is Built, What Is Left, and What This Course Needs

Read from `D:\@Projects\2026\InsightDemo\.claude\implementation` (milestone `M59`, its archive and
backlog, `INDEX.md`) and the Studio source, 8 October 2026.

---

## 1. Built (archived as implemented, 3–4 October)

| Milestone | What it gives |
|---|---|
| **M59a** — the format | A drawing is a `.benchdrawing` file. It has an artboard; layers, including construction layers that can be rubbed out; items in eight shapes (line, polyline, rect, ellipse, polygon, path, text, function); groups; named inks; engineering line types (outline, thin, hidden, centre, construction); arrow and dot ends; and **steps** with a `say` line. The compiler checks it. |
| **M59c** — the viewer | One viewer for the wall, Studio's Study Mode and Scope. It is high contrast, with inks re-toned per surface. |
| **M59b** — SVG in and out | A drawing made in another editor imports as a `.benchdrawing`. Tested with LibreOffice Draw; Inkscape and Illustrator use the same path. It exports back to SVG, and the round trip is exact. There is also an `insight-draw` command-line tool. |
| **M59p** — function shapes | Curves from equations: y(x), parametric, polar, filled to an axis. Made with `insight-draw shape`. |
| **M59m** — animations, in the format | Each item can say how it enters (trace, fade, appear, wipe, grow, fly), how it exits (fade, vanish, erase, wipe, shrink, fly), and what motions it plays (rotate, move, scale, ink), together, in order or **linked**. **Stored and checked, but not yet played on the wall** (M59n). |
| **M59d** — the wall watches it drawn | The presenter steps the drawing (back, next, replay, the step's words). Each step **traces on** stroke by stroke, in sync on every window. |
| **M59e** — the editor shell | *Draw* on a `drawing` fence opens the editor. You can select, move, duplicate, delete, reorder, undo and zoom, and it writes the file back. |
| **M59e-ii** — the File menu | Import SVG, Export SVG, Export PNG; *Draw* also from Study Mode. |
| **M59e-iii** — zoom in the viewer | Students zoom and pan in Study Mode and Scope. |

Existing drawings in `bench-courses/draw` that this course can reuse:
- `waveform-construction` (a phasor drawing a sine);
- `half-wave-mean`;
- `strain-gauge-beam` and `gauge-on-beam`;
- `thermocouple-junction`;
- `wheatstone-bridge`;
- `damped-oscillation`;
- `moving-coil-meter` and `meter-section`.

## 2. Left to build (backlog, in its order)

| Milestone | What it adds | Does this course need it? |
|---|---|---|
| **M59n** — the wall plays every animation | Entries other than trace, exits, motions and **linked** motion, played on the wall and in Study Mode. Put back unstarted on 4 October when the EAC went first. | **Yes, for 2 cards**: the phasor drawing a sine (D2·070) and the power triangle (D3·050). Optional for 3 more (the mux switch arm, the pressure chain fading behind its package, the path's arrows flashing). |
| **M59f** — shape tools and snapping | Line, arrow, rectangle, ellipse, polygon, text, drawn in the editor. | Only to draw in Studio itself (see §4) |
| **M59g** — properties panel | Ink, width, line type, caps, ends, fill. | Same |
| **M59h** — the pen and node editing | Bézier anchors and handles. | Same |
| **M59i** — the pencil | Freehand fitted to curves. | No |
| **M59j** — layers, groups, align | — | Helpful for authoring |
| **M59k** — steps in the editor, and print | The step list edited and previewed in Studio. | **Yes, for authoring**: today steps are written in the file by hand |
| **M59o** — the animation section | Pick and preview each animation in the editor. | Only with M59n |
| **M59l** — a drawing as a figure's picture | Callouts and a tour over line art. | **Possibly**: the "pins over the path drawing" cards (§3) |
| M59q DXF in · M59r images · M59s PowerClip | — | No |
| **M62** — the Animation Bench | GLB/Lottie animations with stops and overlays. "Noted, not sized, not carved." | The eye's 3D animation. Until it exists, a Model Bench GLB with a tour stands in. |

## 3. What the plan asks the Draw Bench for: 36 cards

**A. Possible today** (traced step by step, labels, curves from equations), 21 cards:
- **Day 1:**
  - the course path drawing itself, built arrow by arrow (D1·010);
  - the eye's three stages over the path (D1·010);
  - the transducer data flow, a redraw of `image-3.png` (D1·030);
  - the pressure chain (D1·030 — reuse `strain-gauge-beam`);
  - the Thévenin redraw (D1·040);
  - the S/H inside the pin with its timing, and the mux with its timeline (D1·070);
  - SAR's binary search (D1·080).
- **Day 2:** the calibration chain (D2·050); the optocoupler barrier and the three barrier positions
  (D2·080); the ground loop (D2·090).
- **Day 3:**
  - the wire as R, L and C, and its final state (D3·010);
  - the anti-alias filter chain, and the capstone voltage path with a waveform at each node (D3·020);
  - the loop timeline (D3·030);
  - `half-wave-mean` (D3·040, exists);
  - the capstone architecture, both paths, and its reverse walk (D3·060).

**B. Needs M59n** (motion played on the wall), 2 cards: `waveform-construction` turning, with the AC
pass then marked on the path (D2·070); the power triangle built from phasors (D3·050). Today the
wall would show only each step's end. Plot and Equation can carry both ideas until M59n lands.

**C. The course path drawing reused**, 13 cards. It returns with a focus, an overlay, pins or extra
steps: D1·010 (focus on the converter; blank, for the room's marks), D1·020 (pins), D1·030 (focus;
pins), D1·040 (focus), D1·060 (pins), D2·010 (the digital leg added), D2·020 (pins), D2·050 (firmware
split; pins as the room calls them out), D2·060 (final state), D3·070 (final, with checklist numbers).
**The `drawing` fence has no way to do this.** It takes `title`, `src`, `alt`, `caption` and nothing to
start at a step, show a range of steps, or focus on a region. The options:
1. **Today:** one `.benchdrawing` variant per use, each a copy of the path with its own steps. It
   works now, at the cost of 13 copies to keep in step.
2. **A small new fence feature**, e.g. `steps: frame..converter` and `focus: x y w h`, like the
   Canvas fence's `focus`. One drawing serves every module. Not specified anywhere yet.
3. **M59l** (callouts over line art) for the pinned versions.

**Decided (owner, 2026-10-08):** one master, `course-path.benchdrawing`, designed in
`bench-work/specs/D1-010-05-measurement-path.md` §3a (forms on the nodes, stages on the arrows, one
layer per lane). For Saturday, option 1: each use is a variant file copied from the master's layers.
Option 2 (`steps:`, `layers:`, `focus:` on the `drawing` fence) is requested from ExSight
(`bench-work/requests-to-exsight.md`), so the variants collapse into the master when it lands.

Two of those cards (D1·010 blank, D2·050 "pinned as they are called out") also want **marks made
live as the room calls them out**. That is live ink — the whiteboard over the wall — not the Draw
Bench. Alternatively, pins authored in advance and revealed step by step.

21 + 2 + 13 = 36 cards.

## 4. How our drawings can be made before the editor's tools land

- **Draw in CorelDraw, Illustrator or LibreOffice Draw → export SVG → Studio's *Import SVG***, or
  `insight-draw import`. Then add the steps (and any animations) to the `.benchdrawing` file by hand,
  until M59k puts the step list in the editor.
- **Curves** (sines, staircases, exponentials): `insight-draw shape`.
- **Or write the `.benchdrawing` directly.** The format is fully specified (M59 §3.1) and checked by
  the compiler, so the course's diagrams (the path, the chains, the timelines) can be written as files
  now and opened in the editor to adjust.
- **Reuse what exists:** `strain-gauge-beam` / `gauge-on-beam` (the pressure chain),
  `thermocouple-junction` (a self-generating sensor), `wheatstone-bridge`, `damped-oscillation` (lead-L
  ringing), `moving-coil-meter` (the meter that averages), `waveform-construction`, `half-wave-mean`.

## 5. For Saturday, in order of value

1. **The course path drawing**: it plus 13 reuses — the most-used drawing in the course. Decide between variant files and a fence
   step-range/focus feature (§3C).
2. **The static drawings** (§3A: 21 cards from about 17 drawings), made by SVG import or written as files.
3. **M59n**, if the phasor and power triangle must animate on the wall. Otherwise Plot and Equation
   carry those two cards.
4. **M59k** (steps in the editor): the biggest relief for authoring after the course.
