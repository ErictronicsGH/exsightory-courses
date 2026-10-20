```yaml
id: D1-020-05-accuracy-precision
card: "Accuracy is not precision"
module: notes/Day01/020-measurand-and-uncertainty/en.md
bench: Plot                       # exists; the centrepiece
library: "two-instruments: a Plot (two Gaussian curves of repeated readings, the hidden true value, sliders for μ and σ of each), defined in the card's `plot` block; plus `four-targets.benchdrawing` (Draw) for the ASK"
dimensions: 2D
stand_in: "the same Plot today, with the true value as a slider-scaled curve held at zero until the reveal (§13); the Plot cannot yet hide a marker (request X10)"
optional_benches: [Draw]          # the four targets
real_thing: "repeated readings of one 1.0000 V source by a 3½-digit handheld (1 mV resolution) and a 6½-digit bench meter out of calibration, as distributions"
minutes: 1.6                      # on the bench: the targets during the ASK, and the Plot's six states
card_minutes: 3.1
status: spec-ready                # decided 2026-10-08; F3, F5 open
learner_action: multi-select
predictions: [s0-which]           # the motivates line asked of the room before the truth (PLAN's Drive)
seeds: []
key_variable: "μ (where the readings centre) against σ (how wide they spread), each moved alone"
time_scale: "none (distributions, not motion)"
steps: 6                          # s0–s5 on the Plot; the targets are the ASK's
```

The first Plot spec. The Plot Bench's format was read on 2026-10-08 (`insight-core/src/registry/plotBlock.ts`
and the test course's plots): parameters become sliders, curves are expressions, markers are always
drawn, and a plot has **no steps and no reveal**, so this spec's steps are the presenter's slider
settings, and the true value's reveal needs either a new capability (X10) or the stand-in curve of §13.

## 1. What the room must understand

- **Statement** (verbatim): *An accurate measurement has its mean close to the true value. A precise one
  has a small spread under repeated trials. You can have either without the other.*
- **SHOW** (verbatim from the PLAN): *(centrepiece) Plot — two instruments' readings of one voltage as bell
  curves exp(−(x−μ)²/2σ²), labelled "handheld" and "bench", with the true-value marker hidden at first.
  Sliders: μ and σ for each.*
- **Drive** (verbatim): *the motivates line first — two curves, no truth: "which do you believe?"; reveal
  the true value (the narrow curve sits off it); then walk one curve through A → B → C → D.*
- **Look for** (verbatim): *moving μ changes accuracy and leaves the width alone; moving σ does the
  reverse.*
- **Status** (verbatim): *ready (Plot) · needs Draw: the four targets (or an SVG figure).*
- **Bench and library.** The **bench** is the Plot Bench (the viewer, sliders, readout, zoom). The
  **library** is this plot's definition: the two curves, the true value, the four sliders and their
  values. The four targets are a second library, a Draw drawing.
- **Insight**: *where the readings centre (accuracy) and how widely they spread (precision) are two
  separate things, and the narrow, confident curve can be the wrong one.*
- **Kind of knowledge**: *a relation between quantities* (μ and σ against the curve's place and width),
  plus *a contrast between two states* (the two instruments). Card test → **Plot**. **B17 applies**: both
  curves on one axis. B15, B18, B19 do not.
- **Why this bench, not a still**: the Look for is about *moving* one parameter and seeing only one
  property change; a still cannot show that the width stayed put while the centre moved.
- **Key variable**: μ against σ.

## 2. Time

The Flow is 223 words; p5 *"[[demo]] Bell-curve widget: …"* (13) is a direction naming a retired widget
(F1): **210 spoken = 1.62 min**.

| Beat | Minutes | Source of the number |
|---|---|---|
| The four targets on the wall; Flow p0 *"[[ask]] Look at these four targets…"* (16) | 0.12 | 16 ÷ 130 |
| multi-select answer window and tally | 0.88 | estimate: four options, about 45 s, then the tally |
| p2 accuracy (32), p3 precision (34), p4 standard deviation (52), the Plot on the Canvas (s0, still) | 0.91 | 118 ÷ 130 |
| s0–s5: the presenter's lines over the Plot (≈ 50 words: *"Two meters, the same voltage. Which do you believe? … Here is the truth. … Watch the width while I move the centre…"*) and six slider settings (≈ 2 s each) | 0.58 | 50 ÷ 130 + 12 s |
| p6 *"A good measurement has both…"* (10), p7 practical techniques (66), over s5 held | 0.58 | 76 ÷ 130 |
| **Card total / of which on the bench** | **3.1 / 1.6** | the targets during the ASK (1.0) and the Plot's drive (0.58) |

**Module check**: D1·020 totals ≈ 29.0 min against 30 (`D1-020-03-direct-indirect-null.md` §2).

## 3. The scene: what is on the bench

### 3a. The Plot (`two-instruments`)

| id | Item | Value | Source |
|---|---|---|---|
| axis x | *Reading (V)* | domain 0.985–1.015 V | chosen to hold every state of §4 and card 6 (the preview showed 0.990–1.010 cut D off at 1.7 σ) |
| axis y | *How often (peak = 1)* | range 0–1.1 | the PLAN's unnormalised exp(−(x−μ)²/2σ²) |
| `handheld` | curve `exp(-(x-mh)^2/(2*sh^2))`, teal, solid | μ_h 1.0010 V, σ_h 2.0 mV (default) | **Proposal** (F2): a 3½-digit handheld, 1 mV resolution |
| `bench` | curve `exp(-(x-mb)^2/(2*sb^2))`, amber, dashed | μ_b 1.0040 V, σ_b 0.15 mV | **Proposal** (F2): a 6½-digit meter out of calibration |
| `truth` | the true value, 1.0000 V | target: a `marker` revealed at s1 (X10); today: §13 | **Proposal** (F2) |
| sliders | `mh` 0.985–1.015 V step 0.5 mV · `sh` 0.1–5.0 mV step 0.1 mV · `mb`, `sb` the same | defaults as above | the PLAN (*"Sliders: μ and σ for each"*) |

**Meet the parts** (s0, B3): the two curves named by their labels (*handheld*, *bench*), the axes named,
one line from the presenter: *each curve is how often each reading turns up if you measure the same
voltage again and again*.

**Values beside their element** (B14, B16): the sliders show μ and σ in V and mV, mono, 4 significant
figures (*μ 1.0010 V*, *σ 2.0 mV*); the readout (hover) gives x and y; the truth's value in its label at
s1.

**Labels**: the curves' labels in the plot's legend; the truth's label on its line.

**Colours and their second channel** (C4): handheld teal **solid**, bench amber **dashed**, truth
contrast ink **with its label**; the Plot's six series colours only (plotBlock).

### 3b. The four targets (`four-targets.benchdrawing`)

Four targets side by side, A–D, each with five rings (radius 1–5 units; the bull is radius 1) and eight
shots computed from a seeded normal distribution (seed 20261010), so the drawing is reproducible, not
hand-placed. Positions in ring units (x, y):

| Target | Centre of the group, spread (σ) | Shots | Group's mean, rms spread |
|---|---|---|---|
| A tight on the bull | (0, 0), 0.35 | (−0.30, 0.42) (0.64, 0.17) (−0.02, 0.35) (−0.31, 0.39) (0.16, 0.31) (−0.59, 0.18) (−0.31, −0.03) (−0.17, −0.13) | (−0.11, 0.21), 0.40 |
| B tight, off to one side | (1.6, 1.2), 0.35 | (1.43, 1.44) (1.63, 0.67) (1.86, 1.36) (1.83, 0.93) (1.42, 0.86) (1.98, 1.63) (0.69, 0.83) (1.39, 1.14) | (1.53, 1.11), 0.50 |
| C wide, centred | (0, 0), 1.6 | (−2.26, −1.69) (0.48, −1.37) (1.60, −1.50) (1.69, −1.72) (−0.96, 0.54) (−1.58, −0.39) (0.20, 0.14) (−2.57, 0.24) | (−0.42, −0.72), 1.79 |
| D wide, off to one side | (1.6, 1.2), 1.6 | (1.53, 1.56) (1.48, 0.55) (2.75, 2.83) (1.35, −0.86) (−0.43, 0.54) (0.46, 1.92) (1.74, 4.15) (1.45, 2.44) | (1.29, 1.64), 1.70 |

Rings `thin`, the bull `faint` fill; shots as filled dots (`contrast`); each target's letter under it
(*A* … *D*) and no other words (the ASK carries the question). One step: all four appear together (a
picture to look at, not built).

## 4. The run: step by step, as the Flow goes

### 4a. Steps (the Plot; the presenter's slider settings)

| # | id | Flow paragraph | What changes: the step's one sentence (`say`) | Settings | Presenter's control |
|---|---|---|---|---|---|
| 0 | `s0-which` | after p4 (unscripted) | Two meters read the same voltage many times: the handheld spreads wide, the bench is narrow. No truth shown: which do you believe? | defaults | (the Canvas is up) |
| 1 | `s1-truth` | (unscripted) | The true value, 1.0000 V: the narrow bench curve sits 4 mV off it; the wide handheld is centred 1 mV away. | truth shown | reveal (§13) |
| 2 | `s2-A` | (unscripted) | A: the handheld centred on the truth and narrow, accurate and precise. | mh 1.0000, sh 0.3 mV | sliders |
| 3 | `s3-B` | (unscripted) | B: the same width, moved off: still precise, no longer accurate. | mh 1.0050 | slider μ only |
| 4 | `s4-C` | (unscripted) | C: back on the truth and widened: accurate, not precise. | mh 1.0000, sh 3.0 mV | sliders |
| 5 | `s5-D` | (unscripted), then p6, p7 | D: wide and off: neither. | mh 1.0050 | slider μ only |

The bench curve stays at its defaults throughout s2–s5 (one curve walks, as the Drive says). s3 and s5
move **only μ**; s4 moves σ (and μ back), so the Look for is seen twice: B and D change the place, not the
width.

### 4b. Motion, cues and stills

| # | Motion | Movers | Cue | Hold | Reduced motion | Still |
|---|---|---|---|---|---|---|
| 0–5 | the handheld curve follows its slider as it is dragged (the Plot redraws per input; no animation is authored) | 1 | the slider being moved and the curve moving with it (linked) | hold | each setting lands whole (the presenter types or steps the value) | one per step, captured for print (§10) |

No `animate` block: a looping animation would move without the presenter (B1). Nothing flashes.

## 5. Pacing and interaction, by surface and view

**Who paces**: the presenter, on the wall. *Today the Plot's sliders are local to each window and the
presenter works them on the wall window itself; a plot is not pushed to devices* (plotBlock: no
`drivable`, `livePush: false`). In Study and Scope the learner has the same sliders.

| View | Who | Controls |
|---|---|---|
| Preview (in the slide) | everyone | the two curves; the four sliders; readout on hover |
| View (details) | everyone | the same, larger; zoom and pan; *fixedView* off |
| Edit (session only) | everyone | not specified for the Plot Bench (it computes from sliders already) |
| Authoring | authors | the `plot` block's YAML: curves, parameters, markers, domain |

- **The presenter's strip** (B20): **missing today** (no plot strip); the next setting's values and `say`
  go in the presenter's notes (request X12).
- **Study Mode and Scope**: the sliders free after s5; the targets drawing beside the ASK.
- **Phone**: the plot on top, then the four sliders (44 px), then the step's sentence; two fingers zoom.
- **Locked**: nothing can be locked on a Plot today.

## 6. The frame

The Plot's viewer frame (the Canvas header and footer, D4.10–4.12): title *Two meters, one voltage*,
the legend (handheld solid teal, bench dashed amber, truth labelled), the sliders under the plot, the
readout. No dock or panels on the Plot today.

## 7. Thinking, not watching

- **7a. The PLAN's ASK** (verbatim): *multi-select (before the statement) — four targets on the wall, A to
  D. "Which of these show precise shooting?" options: A, a tight group on the bull | B, a tight group off
  to one side | C, a wide scatter centred on the bull | D, a wide scatter off to one side · answer: A and B
  · reveal: the Plot below, moved through the same four cases. · explain: Precision is the spread alone, so
  both tight groups are precise whether or not they sit on the bull; accuracy is where the middle of the
  group sits. · depth: understand · practice: analysing data.* It fires **before s0**, with the targets on
  the wall; **s2–s5 reveal it** (the Plot walked through A–D).
- **7b. Prediction point**: s0's *"which do you believe?"* is the PLAN's own (the motivates line);
  answered by s1. Asked aloud or as a show of hands; **Proposal** (F3): a two-option `poll` (handheld ·
  bench), +0.3 min.
- **7c. After**: the explain. In Study, done = the multi-select answered and the sliders tried.
- **7d. Teacher tip** — **Proposal** (F3): *Most of the room will believe the narrow curve. Ask: what would
  make a precise instrument wrong?* (Calibration: the D2·050 thread.)
- **7e. Explore**: the four sliders in Study, after the guided pass.

## 8. Faithfulness (the quality bar)

**Arithmetic.**
- The curve is the PLAN's exp(−(x−μ)²/2σ²), peak 1 for every σ (unnormalised), so a narrow curve is as
  tall as a wide one: labelled *each curve scaled to the same height* (A6). A true probability density
  would make the bench's peak 2.0 / 0.15 = 13.3 × the handheld's.
- Handheld: 3½ digits, 1 mV resolution; σ 2.0 mV is a reading that wanders over about ±2 counts (an
  estimate: a handheld in a noisy room; F2).
- Bench: σ 0.15 mV; offset +4.0 mV = **0.40 %** at 1 V. Its own specification (InsightDemo `dmm-bench`:
  ±(0.0035 % + 5 counts) = ±(35 µV + 5 µV) = ±40 µV at 1 V) puts this **100 × outside its spec**: an
  instrument out of calibration, labelled so (A6; F2).
- The walk: A (1.0000, 0.3 mV), B (1.0050, 0.3 mV), C (1.0000, 3.0 mV), D (1.0050, 3.0 mV): offsets 5 mV
  and widths 0.3 vs 3 mV, so the four states are told apart at a glance on a 30 mV axis.

**Section D, Plot rows**
- [x] The expression is the physics: the normal distribution of repeated readings (GUM's Type A view of
  repeated observations), unnormalised as the PLAN writes it; labelled.
- [x] Axis and slider ranges real: 0.985–1.015 V holds every state; σ 0.1–5 mV covers both instruments.
- [x] One worked value: at x = μ_b ± σ_b, y = exp(−½) = 0.607.
- [ ] No artefacts: a σ of 0.1–0.15 mV on a 30 mV axis is 0.3–0.5 % of its width: **check the Plot's
  sampling draws the spike smoothly** (a few hundred points across the domain are needed).

**Section D, Draw rows (the targets)**: proportions from the ring units; shots computed (seed above); the
drawing says nothing else.

**A1–A8**: A1 partly: the instruments' spreads and the bench's offset are illustrative (F2); A2 ✓ (the
non-ideal *is* the subject); A3 ✓; A4 partly (the curves are distributions, not meter faces); A5 n/a; A6
✓ (*each curve scaled to the same height*; *the bench meter here is out of calibration*;
*illustrative spreads*); A7 ✓ (card 6 reuses these values; card 8's ±8 mV band agrees, §14 F4); A8 ✓.

## 9. Faults and non-ideal behaviour

**PLAN FAULT**: none. The bench meter's offset is the card's fault, and its cause (calibration) is
D2·050's.

## 10. Accessibility, legibility and print

- Wall (C2): legend, slider values and axis labels at the Canvas's wall size; the dashed amber curve
  readable on the projector profile. Check at 1920 × 1080 and 1024 × 768.
- Reduced motion (C3): the curve follows the slider with no tween; nothing animates.
- Colour (C4): solid against dashed, and labels.
- Keyboard (C5): sliders by arrow keys (the viewer's own).
- Print (C8): six stills of the Plot (one per step) with their sentences; the four targets. **The Plot has
  no print form of its own today**; stills are captured by hand (PNG) until it does.

## 11. Assets to make or source

| Asset | Format | Made by | Status |
|---|---|---|---|
| The `plot` block: two curves, the truth (§13), four sliders | YAML in `en.md` | the author | to write |
| `four-targets.benchdrawing` | Draw library (shots from §3b's table) | the author | to make for Saturday |

## 12. Bench capabilities this needs

**Plot Bench** (read 2026-10-08): **exists**: curves from expressions, parameters as sliders (min, max,
step, default, unit), `dashed`, labels, the readout, zoom; Study the same. **Missing (request it)**: a
marker (or curve) hidden until a reveal (X10); a presenter strip for the Plot with named settings (X12:
*steps* as named slider presets the presenter steps through, mirrored to the wall and devices).
**Draw Bench**: one-step drawing; exists.

## 13. Stand-in for the lecture

The Plot exists; only the hidden truth needs a stand-in. **Today**: a third curve,
`show * exp(-(x-t)^2/(2*0.00005^2))` (a spike 0.05 mV wide at t = 1.0000 V, contrast ink, label *True
value*), with a slider `show` 0–1, default 0; the presenter slides `show` to 1 at s1. The legend shows
*True value* from the start (its place is not given away). If the spike draws poorly (§8), use a marker
on a second plot block on card 6 instead and say the truth aloud here. The presenter's settings for
s2–s5 go in the notes (no plot strip).

## 14. Findings for the owner

**Owner, 2026-10-08: "go with your recommendations".** Decided: F1 (the Flow's cue now reads *"[[demo]] Plot
Bench: …"*), F2 (a) (the values of §3a, written into the PLAN). Still open: F3 (proposals), F5 (confirm in
Studio that the targets show during the ASK).

- **F1 — The Flow's `[[demo]]` names a retired widget**: *"Bell-curve widget: move the mean and the spread
  independently against the true value."* The PLAN says Plot. Update the cue to *"[[demo]] Plot Bench: the
  two instruments' readings…"*? (As the SAR card's F2.)
- **F2 — The PLAN gives no values.** Proposed: truth 1.0000 V; handheld μ 1.0010 V, σ 2.0 mV; bench μ
  1.0040 V, σ 0.15 mV, which is 100 × outside a bench meter's spec, so it must be labelled *out of
  calibration*. Options: (a) as proposed, labelled (**recommended**: the narrow-and-wrong curve is the
  card's point and calibration is a real cause); (b) make the narrow curve a handheld and the wide one a
  noisy bench reading (less likely in life); (c) your values.
- **F3 — Proposals**: the poll at s0 (+0.3 min) and the teacher tip (§7d).
- **F4 — Consistent with card 8**: card 6 parks the handheld at 1.004 V, inside the card-8 meter's ±8 mV
  band at 1 V: *repeatable, wrong, and within its specification*. A thread worth saying aloud at card 8.
- **F5 — The four targets must be on the wall during the ASK.** An activity has a card of its own; confirm
  in Studio that the multi-select's card can show the targets drawing (or that the content card with the
  drawing comes first). Otherwise the targets go in the reading column as an image.

## 15. Acceptance: how we know it is built right

- s0–s5 reach the settings of §4a exactly (typed or stepped), and the curves match §8's arithmetic at the
  readout (e.g. the bench curve at 1.00415 V reads 0.607).
- B1 one setting per step; B2 only the handheld curve moves in s2–s5; B4 six stills; B5 each `say` in the
  presenter's notes; B6 the slider and the curve move together; B9 the truth waits for *"which do you
  believe?"*; B11 μ and σ one slider each; B13 legend and values only; B14 labels on curves; B16 μ and σ
  readable as numbers; B17 both curves on one axis.
- C2 legible at 1920 × 1080 and 1024 × 768; C3 nothing animates; C4 solid against dashed; C5 arrow keys;
  C6 walked at 320 with sliders below; C7 a slider move to its frame < 16 ms; C8 the stills.
- The targets drawing's shots at §3b's positions.
