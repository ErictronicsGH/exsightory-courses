# From Sensor to Number — Presenting and Demonstrating in ExSight Studio

How the course is laid out in ExSight Studio: what the room sees, what the presenter sees, which bench
carries each demonstration, and what Studio cannot do yet. Based on the Studio source and specs in
`D:\@Projects\2026\InsightDemo\Application`, as of 7 October 2026. Paths below are relative to that
folder.

---

## 1. Three surfaces, three audiences

| Surface | Who sees it | What it holds | In our notes |
|---|---|---|---|
| **The wall** (window "ExSight wall") | The room — shared over screen-share | One **card** at a time: a reading column and the **Canvas** beside it, where benches, images, PDFs and video play. Never Flow, never answers. | `en.md` — the cards |
| **The teleprompter** (Flow) | Presenter only | The words for *this beat*, stepped paragraph by paragraph, with cues. Content-protected: screen-share and the recording never capture it. | ` ```flow ` fences inside `en.md` (to be written — see §3) |
| **The script panel** (transcript) | Presenter only | The lesson-level script for the whole subsection, with "~N min to say" at 130 wpm. | `transcript.en.md` |
| **Scope** (learners' devices) | Each participant | Polls, flash quizzes, predictions, numeric answers, checkpoints, "Ask a question". | Activity fences in `en.md` |

The **PowerPoint** is the wall. The **teleprompter** is Flow, not the transcript.

### Running it online

- Declare `delivery: [multi-screen, single-screen]` (now set in [course.yaml](course.yaml)). With a second
  monitor, the wall sits there and Flow goes to the presenter window. On one laptop, Flow opens in a
  separate teleprompter window over the wall.
- **Share the window "ExSight wall", not the whole screen.** Studio, the teleprompter and the presenter
  panel are excluded from capture. A whole-screen share shows a black curtain where they are, plus your
  taskbar.
- The recording captures a clean 1920×1080 copy of the wall plus your microphone, and nothing private.
  Webcam recording is not implemented.

### Live activities for remote participants — to confirm on a dry run

The owner's understanding (7 October) is that live activities are built for this online lecture, and
the plan assumes they are. What the code in this checkout shows, so the dry run can confirm it:

- `insight/apps/server/src/transport.ts`: "**Only `LocalLanTransport` is written.**"
- `insight/apps/desktop/src/shared/offeringWizard.ts`: an internet class "is the Rust server's to
  orchestrate". It also says choosing `hosted` "would claim a public address that nothing in this build
  brings up".
- `insight-platform` (the Rust API): no WebSocket or interaction-session code in `crates/` or
  `insight/insight-api/`. Recent platform commits are registration and payments (P03) and Ask EAC (P29).
- `.claude/platform/backlog/044-M05x…` (sign-in over a public transport) is `depends_on: [P09]`, and
  P09's status reads "Not started". (Several program status headers are stale, so P09's header alone
  is not proof.)

If that work lives somewhere not in this checkout, the dry run settles it. Before Saturday: one
participant **off your network** joins with a session code and answers one `poll` and one `flash`.

If it does not reach them, the **Show of hands** fallback works as is: run the question on the wall,
collect answers with the conferencing tool's poll or chat, and type the counts into Studio.

---

## 2. What becomes the "PowerPoint": how a card is built

Studio cuts `en.md` into cards automatically:

- **A heading always opens a card.** Our `##` per knowledge point is exactly one card each.
- **`***` forces a break.** We already use it between every card.
- **Budget: 110 words and 3 blocks per card.** A paragraph or list joins the open card while there is
  room.
- **Bench and media blocks** (`canvas`, `figure`, `plot`, `equation`, `model`, `circuit`, `drawing`) join
  a card that so far holds only its heading, and play on the Canvas beside the reading column. Otherwise
  they open their own card.
- **Activities and `analogy` blocks get a card to themselves.**
- A card's layout is `text-only`, `split` (text plus Canvas) or `widget-focus`.

So each of our cards becomes: heading → the one- or two-sentence statement → its bench on the Canvas →
its Flow. An activity (`poe`, `flash`…) placed before the statement becomes its own card just ahead of
it, which is exactly the predict-first order.

**Pitfalls on the wall:**

- `**bold**` and `*italic*` are **flattened to plain text**. Emphasise with `[words]{color=amber}`, and
  size with `{size=large}` / `{size=huge}`. Only body, primary, muted, amber and teal are valid colours,
  and an unknown key is a compile error.
- **Tables and raw HTML are dropped.** A table has to be an image, an SVG, a PDF page or a Figure.
- **Untagged code fences are dropped entirely, and there is no code-listing block.** This matters for
  the firmware modules: show code as an SVG or image, or as `{font=mono}` paragraphs, or inside a widget.
- Minimum wall text is 32 pt, which is why the budget is 110 words.
- Glossary: `[term](glossary:slug)`. Subscripts and superscripts: `V~RMS~`, `I^2^R`.
- Walking the room through one diagram: re-embed the same `canvas` `src` with a different
  `focus: "x y w h"`. Inline links such as `[the datasheet](pdf:ads1115.pdf#4)` put an asset on the
  Canvas when clicked.

Our cards already respect this: no tables, emphasis or code fences in any `en.md` (checked).

---

## 3. Flow vs transcript, and what it means for our notes

- **Flow** is a ` ```flow ` fence placed **after the block it belongs to**. It attaches to that beat and
  is shown on the teleprompter only while that beat is on the wall. A Flow after a `poe` belongs to its
  reveal. Cues: `[[ask]] [[pause]] [[demo]] [[reveal]] [[transition]]`. Bold and italic *do* render here.
- **`transcript.en.md`** is shown whole, in the script panel. Studio also uses its word count as the
  "minutes to say" figure, and as the pacing budget when a module has no `targetMinutes`.

**Done (7 October).** Every card's spoken prose now sits in a ` ```flow ` fence under that card in
`en.md`, so the teleprompter steps with the slides. Gaps, CHECK notes and production notes stay beside
the fence as comments, where the author sees them; they never reach the teleprompter.

Each `transcript.en.md` is now the lesson-level script panel: where we are on the path, the arc (one
line per card), the demos and assets to have ready, the learner actions, reference tables (tables
cannot go on the wall or the teleprompter), the hand-off, and the parked appendix.

**Speaker notes:** an HTML comment of the form `<!-- notes: … -->` shows in the presenter's notes,
separate from Flow.

---

## 4. Learner activities

| Fence | What it does live | Use it for |
|---|---|---|
| `poe` | Prediction pushed to devices (never scored), then a reveal beat with its explanation and Flow. | The predict-first moment before every bench reveal. |
| `circuit` + `predict:` | The same, attached to an Electronics Bench circuit and its reveal. | "What does the meter read?" before input loading is switched on. |
| `circuit` + `measure:` | A timed question that moves the bench probe. | "Where would you clip the reference?" |
| `flash` | Timed single choice (20 s by default), closed by the server. | Quick classification checks. |
| `numeric` | A number with tolerance and unit. | LSB size, settling time, offset at a given gain, counts of error. |
| `multi-select` | More than one correct answer (all or nothing). | "Which of these errors can calibration remove?" |
| `poll` | Opinion or experience, no right answer (`live: true` shows bars moving). | The cold open; "Have you ever trusted a reading you shouldn't have?" |
| `checkpoint` | Learners tick items done; you see % complete. | The uncertainty budget, the lab steps. |
| `quiz`, `exam`, `exit-survey`, `qa` | Multi-question quiz, marked exam, end-of-day survey, question queue. | End of each day; `qa` at each break. |

The predict → reveal → explain rhythm (`poe`, or `circuit` with `predict` and `reveal`) is the backbone of
this course: every module pairs an idealised view with a non-ideal one, and that gap is the teaching
moment. The online limitation in §1 applies to all of these.

---

## 5. The benches

| Bench | Fence | What the room sees, and what you can drive live | Best for | Cannot do |
|---|---|---|---|---|
| **Equation** | `equation` | A formula with colour-coded symbols; step through a derivation; rearrange (`solveFor`); worked examples; assumptions with "breaks when"; graph against one symbol with sliders and a family of curves; `simulate` drives one symbol with a sine, square, triangle, ramp, step or **seeded noise** source. | Closed-form design relations: LSB = Vref/2ᴺ, settling time, G·Vos, RSS, thermal noise, form factor, P = VI cos φ, counts → units. | One statement per block; no discrete-time maths; no circuit. |
| **Plot** | `plot` | Curves y = f(x) with a slider per parameter; tangent, derivative, fill; data series with linear, quadratic or exponential fits and R²; markers; `animate` sweeps a parameter. Has `floor`, `round`, `mod`, `step`, `clamp`. | Quantization staircases, sample-and-hold staircases, aliasing (true sine vs sampled), settling curves, RMS (v, v² filled), power (v, i, p with φ), calibration data with a linear fit. | No random data, no FFT, no discrete dots computed from an expression (data points are static). |
| **Figure** | `figure` | An image, SVG or PDF page with named parts; spotlight; numbered labels; tour; zoom; before/after compare; scale for measuring off the picture. | Datasheets (the INL/DNL table, the ADS1115 noise table), meter front panels and CAT labels, scope screenshots, real boards, timing diagrams. | Nothing is computed. |
| **Model** | `model` | A 3D model (STL, GLB, STEP) with named parts, views, joints and poses, sections, exploded view, measurements and a tour. | The eye (cornea, lens, retina, optic nerve) as a stand-in until the animation bench exists; a clamp meter's jaw; a probe; a PCB. | No playback of animated clips. |
| **Electronics** | `circuit` + `.benchcircuit` | A schematic solved live: voltage, current, power and thermal overlays; animated current; reveals that switch on real effects (input loading, burden, lead resistance, contact, IR drop, overpower, self-heating, tempco…); swapping a part's profile (10 MΩ ↔ 10 GΩ meter); dials on the supply and the ammeter; moving probes and clamps; lead length 3 cm → 10 m; reading against truth; damage that latches. | Every DC loading story: meters loading dividers, burden voltage, Kelvin sensing, supply output impedance, IR drop in a shared return, thermistors and self-heating, overpower failure. | **DC only**: no AC sources, no scope, no frequency analysis, no noise. **No op-amp or in-amp, no switch, no ADC, no transformer, no inductor class.** Resistors have no dials yet. |
| **Draw** | `drawing` + `.benchdrawing` | Line art drawn on the wall step by step (trace, fade, wipe, grow…), with linked motions (rotate, move, scale) and construction lines rubbed out. Includes `function` curves. Existing drawings: a phasor drawing a sine; the mean of a half sine. | Constructions and stories: the path diagram built stage by stage, the transduction chain, SAR's binary search, the S/H timing, aliasing's folding, phasors and power factor, RMS geometry. | Fixed by the author: no sliders, nothing computed live. |
| **Widget** | `canvas` with `kind: widget` | Your own HTML and JavaScript in a sandbox on the Canvas. | Anything the benches cannot compute: sampling with random noise and dither, histograms, an FFT, a firmware sandbox in pure JavaScript. | No network, no WebAssembly, no inline script; **not shown to learners in Study**; state is not mirrored between presenter and wall. |

**Not available:** the 3D Animation Bench (specified only, M62); the "Vision Library" (not found);
oscilloscope, signal generator and Bode plots (backlog M66m–o); ngspice (backlog M66p); a Code bench (not
ready). Manim was deliberately dropped in favour of Plot, Equation and Draw. A pre-rendered video still
plays via `canvas` with `kind: video`.

---

## 6. Choosing how to show a concept

1. **Is it a circuit whose behaviour the room should discover?** If it's DC, use the **Electronics
   Bench**, with `predict` before the `reveal`. That is the strongest experience Studio has. If it needs
   AC, an op-amp, a switch or an ADC, the bench can't do it yet, so go to step 2 or step 5.
2. **Is it a relation between quantities the room should feel by moving one?** Use an **Equation**
   (when the formula is the point) or a **Plot** (when the curve's shape is the point). One slider and
   one question beats five sliders.
3. **Is it a process or a construction that unfolds in order?** Use the **Draw Bench**, one step per
   idea, with the Flow saying why each step comes next.
4. **Is it a real object or document?** Use a **Figure** (photo, datasheet, screenshot) with a tour, or
   a **Model** for something you turn in the hand.
5. **Does it need randomness, many samples, a spectrum, or code?** Use a **Widget**. Remember learners
   cannot reopen it in Study.
6. **Does it need a part a bench does not have yet** (an op-amp, a switch and clock, an AC source,
   a scope)? Plan the ideal demo on the bench anyway and name the part: that list is the Electronics
   Bench's backlog (course-plan.md §7).

The rule the EAC specification applies: a technique earns its place only if it carries the idea better
than words. Not every card needs a bench.

---

## 7. Bench plan, module by module

> **Superseded (7 October) by the card-by-card plan.** The `<!-- PLAN -->` blocks in every `en.md`, and
> the index and bench backlog in [course-plan.md](course-plan.md) §6, replace this first draft. It is
> kept for reference.

**Bold** = the centrepiece of the module. Status: ✅ possible today · 🔧 needs a new bench part or
feature · 🧩 needs a widget .

### Day 1 — From quantity to code

| Module | Benches | Status |
|---|---|---|
| 010 Your MCU reads 2047 | **Electronics**: a divider into a meter standing in for the ADC input, reading against truth (`divider-loading`). **Draw**: the path diagram built stage by stage, kept for the whole course. **Model**: the eye with parts and a tour (needs a GLB), in place of the unbuilt animation bench. | ✅ (eye model to source) |
| 020 The measurand, and what "right" means | **Plot**: two bell curves against a true-value marker, with mean and spread sliders (accuracy vs precision). **Equation**: ±(% of reading + counts), with worked examples. **Equation**: RSS against worst case. **Figure**: a DMM front panel and its spec sheet. | ✅ |
| 030 Sensing | **Draw**: the pressure → deformation → strain → resistance → voltage chain. **Electronics**: an NTC thermistor in a divider, driven by the ambient thermometer, with self-heating as a reveal (modulating sensor; an interfering input). **Figure**: a redraw of the measurement-system figure (`image-3.png`). | ✅ |
| 040 The sensor as a source | **Electronics: `divider-loading` with the `input_loading` reveal and a predict; swap a 10 MΩ ↔ 10 GΩ meter profile.** **Equation**: the loaded divider, graphed against input impedance. Buffer: no op-amp part yet. | ✅ · buffer 🔧 |
| 050 Current sensing | **Electronics: `branch-current` for burden voltage (budget vs bench DMM); `four-wire-sensing` for Kelvin, with the lead-length dial.** **Equation**: shunt signal and shunt power. | ✅ |
| 060 Conditioning | **Equation: output = G(Vin + Vos), with G as the slider — "a third of the range gone".** Equation: dB, and CMRR. **Draw**: the conditioning functions pinned on the path. The in-amp itself: no op-amp part. | ✅ · in-amp 🔧 |
| 070 The ADC input (centrepiece) | **Plot: the sampling capacitor's exponential charge, with the acquisition window and ½ LSB as markers; R, C and window sliders.** Shrinking the window shows "faster makes it worse". **Equation**: settling time = R·C·ln(2ᴺ⁺¹), solved for maximum R. **Draw**: the S/H as a switch and capacitor, with its timing. | ✅ · on-circuit S/H 🔧 |
| 080 Conversion | **Plot: the quantizer staircase `round(x/q)*q` and its error sawtooth, with an N slider.** **Draw**: SAR's binary search, one step per bit. **Equation**: LSB size; ENOB from SINAD. **Figure**: a real ADC datasheet's offset, gain, INL and DNL table. | ✅ |
| 090 The reference | **Plot: the code against the rail voltage for an absolute and a ratiometric sensor — one line moves, the other stays flat.** **Equation**: the ratiometric algebra collapsing. Electronics: the supply dial moving a thermistor divider. | ✅ |

### Day 2 — From code to number, then time enters

| Module | Benches | Status |
|---|---|---|
| 010 Digital interfaces | **Plot: the bus rise time against the pull-up value and the bus capacitance.** **Draw**: open-drain and wired-AND. **Figure**: an I²C timing diagram. Electronics can show the DC side (MOSFET pull-down and pull-up), but not edges. | ✅ |
| 020 External ADCs | **Figure: the ADS1115 and INA226 datasheets — PGA table, data rate against noise, input impedance — as a tour.** **Equation**: the data-rate budget (samples/s × bits, plus overhead). | ✅ |
| 030 Noise | **Equation: thermal noise √(4kTRB), graphed against R.** Equation: noise sources combined as RSS. Equation `simulate` with seeded noise, for flickering last digits. **Widget**: histogram of readings / last-digit bobble. | ✅ · histogram 🧩 |
| 040 Oversampling | **Widget: the firmware sandbox — oversample a quiet signal (fails), add dither (works).** **Equation**: extra bits = log₄(N). Plot: moving-average vs median response to a step and a spike. | 🧩 (must be built) |
| 050 Calibration and maths | **Plot: the calibration table (0, 25, 50, 75 °C) as data with a linear fit — offset and gain read straight off it.** **Equation**: corrected = (raw − offset) × gain, with worked examples. **Widget**: the same conversion written four ways, each with its live error. | ✅ · fixed-point 🧩 |
| 060 DC lab | **Electronics**: lead resistance, burden, input loading, supply droop; the in-amp and ADC stages once those parts exist. **Plot**: the recorded readings after each injected error, against the uncertainty band from 020. | ✅ · in-amp, ADC 🔧 |
| 070 AC as the quantity | **Draw: the existing phasor-draws-a-sine and mean-of-half-a-sine drawings.** **Plot**: v and v² with fill — RMS as the square root of the mean of the square. **Equation**: RMS with `simulate` sine/square/triangle (0.707 is the sine's only). | ✅ |
| 080 Isolation and safety | **Electronics: `overpower` / `package-heat` — a part driven past its rating until damage latches, where the maths said.** **Figure**: CAT ratings on real meters; an optocoupler. | ✅ |
| 090 Ground | **Electronics: a shared return trace (`trace-cu-0r5mm`) with the Voltage overlay showing its IR drop — 2 A × 10 mΩ.** **Equation**: 20 mV → counts at 12 bits / 3.3 V. **Draw**: a ground loop as two paths to earth. Mains-hum loops: no transformer part. | ✅ · AC loop 🔧 |

### Day 3 — The AC chain, power, and the capstone

| Module | Benches | Status |
|---|---|---|
| 010 Parasitics | **Plot: the ×10 probe's step response, with a C<sub>comp</sub>/C<sub>in</sub> slider — under-compensated, flat, over-compensated.** **Figure**: real scope screenshots of each. Plot: lead-inductance ringing against loop area. On-circuit: the probe class has no tip capacitance and there is no scope. | ✅ · live circuit 🔧 |
| 020 AC conditioning and aliasing | **Plot: a true sine and its sampled staircase `sin(2πf·floor(t·fs)/fs)`, with f and fs sliders and `animate` sweeping f.** Plot: apparent frequency against true frequency (the fold). Plot: biasing — the waveform, an offset slider, and the ADC's limits as markers. **Equation**: the anti-alias filter's attenuation in dB, against frequency. **Draw**: the folding diagram. Live sampled dots or a spectrum: widget. | ✅ · dots/FFT 🧩 |
| 030 Sampling instants | **Equation: error = 2πfA·Δt, graphed against f.** Plot: the same signal sampled with fixed and with varying intervals. **Widget**: random jitter against RMS error (the overview's sweep). | ✅ · random sweep 🧩 |
| 040 True RMS | **Plot: a PWM wave with a duty-cycle slider — true RMS against an average-responding meter's reading.** **Equation**: form factor 1.11, and where it breaks. Plot: v and v² with fill. Electronics DMMs are DC only. | ✅ |
| 050 Power | **Plot: v(t), i(t) and p = v·i with a φ slider — the negative lobes filled.** **Equation**: P = V<sub>RMS</sub>·I<sub>RMS</sub>·cos φ. **Equation**: phase error = 2πf·Δt between sequential V and I samples, graphed against f. **Draw**: the phasor diagram. | ✅ |
| 060 Capstone | **Coding Bench** (the front end, and codes → RMS → power → PF). **Plot**: each scenario's readings against truth. **Draw**: the final path, every stage named. | Coding Bench |
| 070 Wrap-up | Staged faults rebuilt on benches already used: Electronics (loading, burden, lead resistance), Plot (aliasing, a quiet signal under oversampling, a phase error), Equation (offset at gain). | ✅ |

**In short:** most of the demos can be built on today's benches.
- **What's missing is concentrated** in an op-amp/in-amp part, a switch and clock for sample-and-hold,
  AC sources and a scope, and a firmware sandbox.
- **The Electronics Bench** carries every DC loading story, which is the heart of Day 1.
- **Plot and Equation** carry almost all of the ADC and AC mathematics.
- **Draw** carries the constructions.
- **Widgets** fill in where randomness, many samples or code are needed.

---

## 8. Decisions needed before Saturday

*Updated 7 October with the owner's direction.*

1. **Remote participation.** Taken as built; confirm with an off-network dry run (§1).
2. **Firmware demos go on the Coding Bench** (planned, for all kinds of coding). Day 2 · 040 and 050,
   Day 3 · 040 and 050, and the capstone's firmware are planned against it. Code on the wall becomes
   the Coding Bench's job.
3. **The Electronics Bench is being extended.** The plan names each part or feature it needs (op-amp,
   switch and clock, AC source, scope…), and that list is its backlog (course-plan.md §6).
4. **The Draw Bench is almost done.** The plan names each drawing to make.
5. **The eye.** Until an animation bench exists: a Model Bench GLB with a tour, a Figure with a tour,
   or a short video.
6. ~~Pass 2 structure~~ — done: the prose is in Flow (§3).
