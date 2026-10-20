```yaml
id: D1-070-05-one-capacitor-many-inputs
card: "One capacitor, many inputs"
module: notes/Day01/070-adc-input/en.md
bench: Draw                       # the target, and it exists (M59): steps traced on the wall, function curves, zoom in Study
library: "mux-one-capacitor (`mux-one-capacitor.benchdrawing`): four sensors → analog MUX → one sample-and-hold → one converter, with the one capacitor's voltage on a timeline beneath, CH1 at t₁ to CH4 at t₄; a last step makes CH3 a 50 kΩ source (the PLAN's crosstalk)"
dimensions: 2D
stand_in: none                    # the drawing plays all its steps today; the live toggle of the page waits for X1 (§12, F1)
optional_benches: []
real_thing: "a microcontroller's multiplexed SAR ADC: one sample-and-hold capacitor shared by its analog inputs, selected in turn by an analog multiplexer, at the course's model (12 bits, 3.3 V, truncating; R_on 1 kΩ, C_s 10 pF, 1 µs window, 1 µs of conversion); drawn in IEC symbols"
minutes: 1.7                      # on the bench: the drawing is up for the whole card, the crosstalk step included (1.35 without it, F1)
card_minutes: 1.7
status: spec-ready
learner_action: none
predictions: []
seeds: [S17]                      # planted in the Flow's p3, over s6 held
key_variable: "the one capacitor's voltage as the MUX hands it from input to input: each channel starts from the charge the last one left"
time_scale: "none (no motion): a drawn timeline, 0 to 8 µs on one scale, 170 drawing units per µs"
steps: 8                          # s0–s7
```

The Draw block's format as read on 2026-10-20 (`C:\ExSightory\src\insight\packages\insight-core\src\registry\drawingBlock.ts`
and `…\src\drawing\schema.ts`): the fence carries `title`, `src` (a `.benchdrawing`), `alt` and `caption` (these three
localised); the file carries the artboard, layers, items (line, polyline, rect, ellipse, polygon, path, text, function),
named inks (`teal amber violet lime rose azure orange magenta contrast`, fills also `ground`), line types (`outline thin
hidden centre construction`, a stroke's `dash` overriding), text roles `label note title`, and **steps**, each with a
required `say` and cumulative `draw` / `hide` lists. A `function` item is drawn from its equation (`graph` form, y in x,
`at` its origin, `scale` [sx, sy] drawing units per unit, y up). Text and `say` are plain strings. **No live controls, no
sliders**: a drawing is made, not solved.

## 1. What the room must understand

- **Statement** (verbatim): *A multi-channel ADC is usually one conversion system with a multiplexer in front of it,
  connected to each input in turn. Every channel has to charge the same capacitor.*
- **SHOW** (verbatim from the PLAN): *Draw — four sensors → analog MUX → one S/H → one converter; the switch arm stepping
  from input to input, with a timeline beneath: CH1 at t₁, CH2 at t₂, CH3 at t₃, CH4 at t₄; the capacitor carrying each
  channel's charge into the next.*
- **Drive** (verbatim): *step the arm through the four inputs.*
- **Look for** (verbatim): *one capacitor, four different moments.*
- **Status** (verbatim): *needs Draw: the multiplexer-and-timeline drawing.*
- **SEED** (verbatim): *plants S17 — "One capacitor, many inputs, converted at different times. That will matter a great
  deal on Day 3, when we sample voltage and current together."*
- **FAULT** (verbatim): *Crosstalk: a high-impedance channel read straight after a full-scale one reads high, because the
  capacitor arrives carrying the previous channel's charge.*
- **ASK**: *none in the PLAN.*
- **Bench and library.** The **bench** is the Draw Bench (M59). The **library** is a new drawing, `mux-one-capacitor`,
  built for this card. The owner has seen its design in `bench-work/previews/u016-preview.html`, card 5: *"Four sensors
  (0.40, 3.00, 1.65, 2.20 V, each a 1 kΩ source), one MUX, one capacitor, one converter; the arm steps CH1 → CH4, a 1 µs
  window and 1 µs of conversion each. The library's own control makes CH3 a 50 kΩ source (the PLAN's crosstalk fault)."*
  This spec turns that live page into steps a drawing can hold (§4, F1).
- **Insight**: *a four-channel ADC is one converter and one capacitor taking turns: each input is sampled at its own
  moment, and starts from whatever charge the last one left.*
- **Kind of knowledge**: *a picture built up* (the chain, then the turns taken on the timeline), with a *process through
  stages* inside it (the arm stepping). Card test → **Draw**: the stages are discrete selections, each a held state, and
  no motion between them teaches anything (the charging inside a window is drawn as a curve, on the timeline). B15
  applies (the circuit first, then the timeline that is its behaviour); B17 applies loosely (the circuit and the timeline
  stay up together, linked by the channel names). B18, B19 do not.
- **Why this bench, not a still**: the point is *turns*. Stepping the arm one input at a time, with the timeline filling
  slot by slot beneath it, makes "one system, four inputs, four moments" something the room watches happen; a still shows
  four inputs and one converter and lets the eye read it as four parallel paths. The crosstalk step then changes one
  channel and nothing else, so the cause is visible.
- **Key variable**: the capacitor's voltage at the start of each window (the charge carried in from the last channel).

## 2. Time

The Flow is 150 words, all spoken: **1.15 min** at 130 wpm (p0 47, p1 28, p2 36, p3 39).

| Beat | Minutes | Source of the number |
|---|---|---|
| s0 meet the parts: p0 *"Many ADCs have more than one analog input…"* (47) | 0.36 | 47 ÷ 130 |
| s1–s4 the arm steps CH1 → CH4: p1 *"Imagine four sensors feeding one multiplexer…"* (28) | 0.22 | 28 ÷ 130 |
| s3, s4 under p1's *"and so on"*: the presenter names them, unscripted (≈ 8 words: *"sensor 3 … sensor 4"*) | 0.06 | estimate |
| s5 one system, four moments: p2 *"So it is more accurate to think…"* (36) | 0.28 | 36 ÷ 130 |
| s6 one capacitor, held: p3 *"Every one of those inputs…"* (39, SEED S17) | 0.30 | 39 ÷ 130 |
| s7 the crosstalk (the PLAN's FAULT; not in the Flow): the presenter's unscripted line (≈ 45 words, §7d, F2) | 0.35 | estimate |
| Waiting on traces not covered by speech (8 steps, ≈ 1.2 s each) | 0.15 | estimate |
| **Card total / of which on the bench** | **1.7 / 1.7** | 1.35 / 1.35 without s7 (F1) |

p1 is short and drives four steps: s1 lands on *"select Sensor 1 and convert it"*, s2 on *"then select Sensor 2 and convert
that"*, s3 and s4 on *"and so on"* (two presses; the presenter names each). Each of s1–s4 is a held state, so the four
quick presses are not motion spoken over (B13). p2 and p3, the long paragraphs, are spoken over s5 and s6 held.

**Module check**: `D1-070-02-charge-in-time.md` §2. (The owner has seen about 21 of the module's 45 minutes used and said to
leave it; this card is reported, not trimmed.)

## 3. The scene: what is on the bench

Artboard **1600 × 900** drawing units, two bands: the circuit above (y 40–420), the timeline beneath (y 460–880). Drawn in
IEC 60617 symbols (resistor a rectangle; comparator a rectangle with ▷; D/A converter `#/∩`; switch an open blade; IEC
earth). Inks are names from the Draw palette, never hex. Layers, bottom to top: `circuit`, `timeline-frame`, `timeline`,
`notes`, `fault` (the circuit and the timeline in separate layers so D3·050 can reuse the circuit with its own timeline,
F6).

**The circuit band** (schematic, not to scale; the timeline band below is to scale):

| id | Item | Value, and its source | Drawn as |
|---|---|---|---|
| `sen-1` … `sen-4` | four sensors, boxes x 60–300, centres y 100, 180, 260, 340, 220 × 50 | 0.40 V, 3.00 V, 1.65 V, 2.20 V, each behind 1 kΩ (the page's values, seen by the owner; every one inside 0–3.3 V) | `rect`, `thin`, `contrast`; text *sensor 1 · 0.40 V behind 1 kΩ* … in role `label` |
| `in-1` … `in-4` | input wires x 300–450 at each sensor's y | — | `line`, `outline`, `contrast` |
| `ch-1` … `ch-4` | the MUX's four contacts, open dots at x 460; *CH1* … *CH4* above each | — | `ellipse` r 6, `outline`; text role `label` |
| `mux` | the multiplexer box x 430–590, y 60–380 | — | `rect`, `outline`, `violet`; *MUX* (role `title`) inside top, *analog multiplexer* (role `note`) under the box |
| `pole` | the arm's common pole, a dot at (570, 220) | — | `ellipse` r 5, filled `contrast` |
| `arm-1` … `arm-4` | the arm, from the pole to contact n | one at a time | `line`, `outline`, `teal`, `dot` end |
| `sel-1` … `sel-4` | the selected sensor's box re-drawn | one at a time | `rect`, `outline`, `teal` (the box's outline thickens: second channel) |
| `w-mux` | wire from the pole to the sample switch, x 570–650, y 220 | — | `line`, `outline` |
| `sw` | the sample switch, contacts at x 650 and 710, blade lifted (open) | **open in every still**: each step ends after its conversion, holding (F4) | `line` ×2 + `ellipse` ×2, `outline`; *sample switch* (role `label`) and *open: hold* (role `note`) |
| `r-on` | R_on, body x 750–840 at y 220 | 1 kΩ (course-accuracy §3; the module's card 1: the MUX and the switch together) | `rect` 90 × 18, `outline`; *R_on 1 kΩ* above |
| `node`, `cs`, `cs-gnd` | the capacitor node at (920, 220); C_s plates at y 290 and 304, to IEC earth at y 360 | 10 pF (course-accuracy §3; card 1) | `outline`; *C_s 10 pF* beside, role `label` |
| `sh-box` | a box round `sw`, `r-on`, `cs`: x 630–1000, y 140–390 | — | `rect`, `thin`, dash [4, 3], `contrast`; *one sample-and-hold* (role `note`) under it |
| `conv` | the converter: comparator (▷) x 1060–1140, D/A `#/∩` under it, *SAR logic* box x 1170–1270; its input from the node | 12 bits, 3.3 V, truncating (course-accuracy §3) | `outline`; *one converter (12-bit SAR)* (role `label`) above |
| `code` | the code register, box x 1340–1540, y 190–250, with *code* above | per step (§8; F3) | `rect`, `outline`, `lime`; the code in role `title`, `lime` |
| `vc-1` … `vc-4` | the capacitor's held voltage, left of C_s | 0.400, 3.000, 1.650, 2.200 V (§8) | text role `label`, `teal`, *v_C = 0.400 V, held* |
| `note-gnd` | *sensor returns through ground, not drawn* | — | text role `note`, `contrast`, bottom right of the band |

**The timeline band** (one scale: x **170 units per µs** from x 160 = 0 µs to x 1520 = 8 µs; y **90.91 units per V** from
y 820 = 0 V to y 520 = 3.3 V):

| id | Item | Value | Drawn as |
|---|---|---|---|
| `t-axis`, `t-ticks`, `t-nums` | time axis y 820, ticks every 1 µs; *0, 2, 4, 6, 8 µs* under | 0–8 µs: four slots of 1 µs window + 1 µs conversion | `line`, `thin`, `contrast`; role `note` |
| `v-axis`, `v-nums` | voltage axis x 160; *0 V*, *3.3 V* | 0–3.3 V, the converter's range | `line`, `thin`; role `note` |
| `t-title` | *the one capacitor's voltage, v_C · each input's own voltage dashed · one scale* | — | role `note`, right-aligned under the axis |
| `win-1` … `win-4` | the acquisition windows: x 160–330, 500–670, 840–1010, 1180–1350; y 520–820 | 1 µs each, starting at 0, 2, 4, 6 µs | `rect`, stroke `none`, fill `teal` tint `faint`; *acquire* on `win-1`, *hold and convert* on the first conversion slot (role `note`; card 1's words) |
| `slot-1` … `slot-4` | *CH1* … *CH4* centred over each 2 µs slot, y 500 | — | role `label` |
| `lvl-1` … `lvl-4` | each input's voltage across its slot: y 783.6, 547.3, 670.0, 620.0 | 0.40, 3.00, 1.65, 2.20 V | `line`, `thin`, `azure`, dash [3, 2] |
| `acq-1` … `acq-4` | v_C in each window: `function`, form `graph`, x in µs over [0, 1], `at` (160 + 340(n−1), 820), `scale` [170, 90.91] | CH1 `0.40*(1 - exp(-x/0.02))`; CH2 `3.00 - 2.60*exp(-x/0.02)`; CH3 `1.65 + 1.35*exp(-x/0.02)`; CH4 `2.20 - 0.55*exp(-x/0.02)` (τ = 0.02 µs, §8) | `outline`, `teal` |
| `hold-1` … `hold-4` | v_C held through each conversion, x 330–500, 670–840, 1010–1180, 1350–1520 | at 0.400, 3.000, 1.650, 2.200 V | `line`, `outline`, `teal` |
| `ok-1` … `ok-4` | *settled* beside each held line | each within 0.5 LSB (§8) | role `note`, `lime` |
| `tn-1` … `tn-4` | the sample instants: ticks at x 330, 670, 1010, 1350 (the switch opens), *t₁ … t₄* under the axis | 1, 3, 5, 7 µs: 2 µs apart (F5) | `line`, `thin`, `contrast`; role `label` |
| `apart` | a dimension between t₁ and t₂ | *2 µs apart* | `line`, `thin`, arrow both ends; role `note` |
| `carry-2` … `carry-4` | dots at each window's start on the curve, with *starts at 0.40 V*, *starts at 3.00 V*, *starts at 1.65 V* | the voltage the last channel left (§8) | `ellipse` r 5 filled `amber`; role `note`, `amber` |
| `cs-ring` | a dashed ring round C_s in the circuit, *one C_s for every channel* | — | `ellipse`, `thin`, `amber`, dash [3, 2]; role `note` |

**The fault layer** (s7; §9):

| id | Item | Value | Drawn as |
|---|---|---|---|
| `sen-3-hiz` | sensor 3's box relabelled *sensor 3 · 1.65 V behind 50 kΩ* (replaces `sen-3`'s text) | 50 kΩ: the 100 k / 100 k divider of card 3 | `rect`, `outline`, `rose` |
| `acq-3-ghost`, `hold-3-ghost` | the 1 kΩ curve and hold of CH3, kept for comparison | as `acq-3`, `hold-3` | `thin`, `contrast`, dash [3, 2]; *at 1 kΩ* (role `note`) |
| `acq-3-hiz` | CH3's window at 50 kΩ | `1.65 + 1.35*exp(-x/0.51)` (τ = 0.51 µs) | `function`, `outline`, `rose` |
| `hold-3-hiz` | held at y 652.7 | 1.840 V | `line`, `outline`, `rose` |
| `err-3-hiz` | *+236 LSB · reads high* beside it | §8 | role `label`, `rose` |
| `acq-4-hiz` | CH4's window starting from 1.840 V | `2.20 - 0.36*exp(-x/0.02)` | `function`, `outline`, `teal` |
| `tau-3-hiz` | *τ = 51 kΩ × 10 pF = 510 ns: the window holds 1.96 τ* | §8 | role `note`, `rose`, over CH3's slot |
| `vc-3-hiz`, `code-3-hiz` | *v_C = 1.840 V, held*; code *2283* | §8 | as `vc-n`, `code` |

**Meet the parts** (B3): s0 is the whole circuit band, every part labelled with its value, the arm not yet drawn, the
timeline's axes and empty slots drawn. The room met the switch, R_on and C_s on card 1.

**Values beside their element** (B14, B16): each sensor's voltage and source resistance in its box; v_C beside C_s; the
code in its register; each held level's *settled* (or *+236 LSB*) beside its line on the timeline.

**Labels**: on their parts; nothing moves (each step draws or hides whole items), so leaders are allowed; none are needed
but the `apart` dimension.

**Colours and their second channel** (C4):

| Thing | Ink | Second channel |
|---|---|---|
| The selected path (arm, selected box) and the capacitor's voltage | `teal` | the arm's position; the box's thicker outline; the curve is the only solid line on the timeline |
| Each input's own voltage | `azure` | dashed; *each input's own voltage dashed* in `t-title` |
| The multiplexer | `violet` | its words *MUX*, *analog multiplexer* |
| The charge carried in (s6) | `amber` | the dots and the words *starts at …* |
| The fault (s7) | `rose` | *50 kΩ* in the box; *+236 LSB · reads high*; the 1 kΩ curve kept dashed beside it |
| Settled; the code | `lime` | the word *settled*; the code is a number |

**Key views**: *Home* (the whole artboard); framings `circuit` (y 40–420) and `timeline` (y 460–880) for Study's zoom.

## 4. The run: step by step, as the Flow goes

### 4a. Steps

| # | id | Flow paragraph (first words) | What changes: the step's one sentence (B5; the `say`) | Overlay for the room | Presenter's control |
|---|---|---|---|---|---|
| 0 | `s0-parts` | p0 *"Many ADCs have more than one analog input…"* | Four sensors, one analog multiplexer, one sample-and-hold, one converter: the multiplexer chooses which input is connected. | *MUX · one sample-and-hold · one converter* | (the Canvas is up) |
| 1 | `s1-ch1` | p1 *"Imagine four sensors…"* to *"…select Sensor 1 and convert it"* | The MUX selects CH1: the capacitor charges to 0.40 V in its 1 µs window, holds, and the converter reads it. | *CH1 · 0.400 V · 496* | Next |
| 2 | `s2-ch2` | p1 *"…then select Sensor 2 and convert that"* | The arm moves to CH2: the same capacitor goes from 0.40 V up to 3.00 V, and the converter reads it. | *CH2 · 3.000 V · 3723* | Next |
| 3 | `s3-ch3` | p1 *"…and so on"* (the presenter: *"sensor 3"*) | CH3: the same capacitor comes down from 3.00 V to 1.65 V. | *CH3 · 1.650 V · 2047 or 2048* | Next |
| 4 | `s4-ch4` | p1 *"…and so on"* (the presenter: *"sensor 4"*) | CH4: the same capacitor goes from 1.65 V up to 2.20 V. | *CH4 · 2.200 V · 2730* | Next |
| 5 | `s5-four-moments` | p2 *"So it is more accurate to think…"* | One conversion system, four inputs, four different moments: t₁, t₂, t₃, t₄, 2 µs apart, never at once. | *t₁ t₂ t₃ t₄ · 2 µs apart* | Next |
| 6 | `s6-one-capacitor` | p3 *"Every one of those inputs…"* (SEED S17) | One capacitor for every channel: each window starts from the voltage the last channel left, and the input must bring it to its own. | *one C_s for every channel · starts at …* | Next |
| 7 | `s7-crosstalk` | none: the PLAN's FAULT, the presenter's unscripted line (§7d, F1, F2) | Make CH3 a 50 kΩ source: the capacitor arrives carrying CH2's 3.00 V, cannot get down to 1.65 V in its window, and CH3 reads about 236 LSB high. | *50 kΩ · τ 510 ns · +236 LSB · 2283* | Next leads to card 6 |

Steps are cumulative (`draw` / `hide`): s1 draws `arm-1`, `sel-1`, `win-1`, `slot-1`, `lvl-1`, `acq-1`, `hold-1`, `ok-1`,
`vc-1` and the code *496*; s2 hides `arm-1`, `sel-1`, `vc-1` and the code, and draws CH2's set; and so on. s5 draws `tn-1` …
`tn-4` and `apart`. s6 draws `carry-2` … `carry-4` and `cs-ring`. s7 hides `sen-3`'s text, `acq-3`, `hold-3`, `ok-3`,
`acq-4`, `vc-4` and the code, and draws the fault layer; CH4's hold, its *settled* and the arm on CH4 stay (CH4 settles
from 1.840 V as from 1.650 V). The arm stays on CH4 from s4 to the end: s5–s7 are about the record the timeline holds.

### 4b. Motion, cues and stills per step

| # | Motion (Draw entries, M59d) | Movers | Cue and its second channel (B6) | Hold | Reduced motion (C3) | Still (B4) |
|---|---|---|---|---|---|---|
| 0 | the circuit traces left to right: sensors, wires, MUX, switch, R_on, C_s, converter, register; then the timeline's axes | 1 at a time | the trace runs along the chain in signal order | hold | whole | the parts |
| 1–4 | (a)–(d): the arm traces from the pole to contact n; the box's outline; then the window's shading, the input's dashed level, v_C's curve and hold trace left to right; v_C and the code appear | 1, then 1 (linked by order) | the arm ends on the contact the Flow names; the curve ends on its held line | hold | whole | CH1 … CH4 (four stills) |
| 5 | the four ticks trace up, *t₁ … t₄* appear, the `apart` dimension traces | 1 | the ticks land at the switch's openings | hold | whole | four moments |
| 6 | `cs-ring` traces round C_s; the three `carry` dots and their words appear at the window starts | 1 | the ring on the one capacitor, the dots on the curve's starts | hold | whole | one capacitor (S17) |
| 7 | the 1 kΩ curve of CH3 turns dashed (hide and redraw); the 50 kΩ curve traces in `rose`; its hold, *+236 LSB*, τ and the code appear; CH4's short rise retraces from 1.840 V | 1, then 1 | the rose curve stops short of the dashed 1.65 V level, beside the 1 kΩ curve that reached it | hold | whole | the crosstalk |

Eight stills. Nothing flashes. The arm *stepping* is a hide-and-draw per step today; with M59n it could rotate from contact to
contact (§12), which adds nothing the stills do not show.

## 5. Pacing and interaction, by surface and view

**Who paces** (B12): the presenter on the wall; the learner in Study Mode and Scope.

| View | Who | Controls |
|---|---|---|
| Preview (in the slide) | everyone | Back · Next · *step n of 8* · Replay |
| View (details) | everyone | the step list with each `say`; zoom to `circuit`, `timeline`; *Home* |
| Edit (session only) | everyone | ink, a pinned note (X6; not yet specified for the Draw Bench) |
| Authoring | authors | the Draw editor (M59e); the steps and `say` lines in the file (M59k for the step list in the editor) |

- **The presenter's strip** (B20): the next step's `say`; at s3 and s4 *name the sensor*; at s6 *S17 planted: Day 3 harvests
  it (D3·030, D3·050)*; at s7 the unscripted line and the teacher tip (§7d).
- **Study and Scope**: the learner steps all eight; zoom on the timeline to read the 20 ns rises and the 236 LSB gap.
- **Phone** (C6): the artboard fitted to the width, the circuit above the timeline; the step's `say` under it; two fingers
  zoom to either band. One finger does nothing on the stage.
- **Locked**: nothing (no ASK on this card).

## 6. The frame

The Draw Bench's frame (M59). Identity bar: *One capacitor, many inputs · ● Holding · step n of 8*. Legend card: *teal: the
selected input and the capacitor's voltage · azure dashed: each input's own voltage · amber: the charge carried in · rose:
a 50 kΩ source*; *IEC symbols · a model: the capacitor keeps the last channel's voltage* (A6, F6). No inset, no graph band:
the timeline is part of the drawing.

| Tile / panel | Used? | Selected item (one large value) | List / contents |
|---|---|---|---|
| Steps | yes | the step's `say` | the eight `say` lines |
| Zoom | yes (Study, Scope) | — | `circuit`, `timeline`, *Home* |
| Symbols IEC \| US | wanted (§12, missing) | — | — |
| EN \| FR | wanted (§12, missing in the file format) | — | — |

## 7. Thinking, not watching

- **7a. The PLAN's ASK**: *none in the PLAN.* The statement and the drawing carry the card.
- **7b. Prediction points**: none. **Proposal** (not recommended, F8): before s7, *"Make sensor 3 a 50 kΩ source. Does it
  read high, low or right?"* as a `poe`; it would add about 0.8 min to a card whose crosstalk is already unscripted.
- **7c. After**: none fires. In Study, done = s7 reached.
- **7d. Teacher tip and the unscripted lines** — **Proposal** (F2), on the presenter's strip, never on the wall:
  - s3, s4: *"Sensor 3 … sensor 4."*
  - s7 (≈ 45 words): *"Now make sensor 3 a 50 kΩ source. The capacitor arrives carrying sensor 2's 3 volts, and one microsecond
    is under two time constants: it cannot get back down. Sensor 3 reads about 236 codes high. Sensor 4, at 1 kΩ, is
    fine."*
  - Tip: *Expect some to think a channel's error is its own. Ask: read the same 50 kΩ sensor straight after CH1's 0.40 V
    instead: high or low? Low, code 1829. The error's sign is set by the previous channel, which is why it "changed when
    I added a sensor" (card 2's FAULT, card 3's last paragraph).*
- **7e. Explore**: none on the drawing (a Draw has no live controls). The live version, channel order and each channel's
  source resistance as controls on the hardware, is the Electronics Bench's ADC-input block (X1, §12).

## 8. Faithfulness (the quality bar)

**The model** (course-accuracy §3): 12 bits, 3.3 V reference, truncating, code = ⌊V / LSB⌋, LSB = 3.3 / 4096 =
0.80566 mV; R_on 1 kΩ, C_s 10 pF, 1 µs window, 1 µs of conversion; the capacitor starts at 0 V (nothing before CH1) and keeps
its charge between conversions. In a window, v_C(t) = V + (v₀ − V)·e^(−t/τ), τ = (R_s + R_on)·C_s.

**Every number recomputed** (Node, 2026-10-20):
- **τ at 1 kΩ**: (1 kΩ + 1 kΩ) × 10 pF = **20 ns**; the window holds 1 µs / 20 ns = **50 τ**; e^(−50) = 1.93 × 10⁻²². **τ at
  50 kΩ**: (50 kΩ + 1 kΩ) × 10 pF = **510 ns**; 1 µs / 510 ns = **1.961 τ**; e^(−1.961) = **0.14075**.
- **The run, all 1 kΩ** (v₀ → held; residual; ideal in LSB; code):
  - CH1: 0 → **0.400 V**; −0.40 × 1.93 × 10⁻²² = −7.7 × 10⁻²³ V; 0.40 / LSB = 496.48; code **496**.
  - CH2: 0.40 → **3.000 V**; −2.60 × 1.93 × 10⁻²² = −5.0 × 10⁻²² V; 3723.64; code **3723**.
  - CH3: 3.00 → **1.650 V**; +1.35 × 1.93 × 10⁻²² = +2.6 × 10⁻²² V; 1.65 / LSB = **2048.000** exactly: on the 2047|2048 edge,
    so **2047 or 2048** (decision F5 of 2026-10-20; the model's settled value is a hair above and truncates to 2048, and any
    noise makes it either).
  - CH4: 1.65 → **2.200 V**; −0.55 × 1.93 × 10⁻²² = −1.1 × 10⁻²² V; 2730.67; code **2730**.
  - Every residual is under 10⁻²¹ V, under 10⁻¹⁸ LSB: *settled* (within ½ LSB) ✓. Settling to ½ LSB takes, for the largest
    step here (CH2's 2.60 V), 20 ns × ln(2.60 / 0.403 mV) = 175 ns, well inside 1 µs.
- **The crosstalk, CH3 at 50 kΩ after CH2's 3.00 V**: residual (3.00 − 1.65) × 0.14075 = **+0.19001 V**; held **1.840 V**;
  0.19001 / 0.80566 mV = **+235.8 LSB** (*+236 LSB*, the page's figure ✓, as a voltage); 1.84001 / LSB = 2283.84, code
  **2283**: 235 codes above 2048, 236 above 2047 (so *about 236* on the wall is right either way). The capacitor got
  1 − 0.14075 = **86 %** of the way down. CH4 after it: 1.840 → 2.200 V, residual −0.36 × 1.93 × 10⁻²² V: code **2730**,
  unchanged ✓. Settling CH3 to ½ LSB from 3.00 V at 50 kΩ would take 510 ns × ln(1.35 / 0.403 mV) = **4.14 µs**.
- **The other direction** (§7d tip): the same 50 kΩ CH3 read straight after 0.40 V: 1.65 − 1.25 × 0.14075 = 1.474 V, 1829.6,
  code **1829** (low); after 0 V it is card 2's and card 3's **1759** (1.65 × 0.85925 / LSB = 1759.7) ✓.
- **The timeline**: slots of 1 µs + 1 µs = 2 µs; windows 0–1, 2–3, 4–5, 6–7 µs; sample instants (the switch opens) **t₁ =
  1 µs, t₂ = 3 µs, t₃ = 5 µs, t₄ = 7 µs**, 2 µs apart; conversions end at 2, 4, 6, 8 µs. One converter at 2 µs a conversion
  is 500 kS/s in all and 125 kS/s per channel, as card 7 (*"a 1 µs window allowed 500,000 samples a second"*) ✓.
- **Drawing coordinates** (one scale): x = 160 + 170·t[µs]; y = 820 − 90.909·V. Levels: 0.40 V → 783.6; 3.00 → 547.3; 1.65
  → 670.0; 2.20 → 620.0; 1.840 → 652.7. The 236 LSB gap is 0.190 V = **17.3 units** (visible at the wall; the label carries
  the number). A 20 ns rise is 3.4 units wide: drawn honestly as a near-vertical edge; 510 ns is 86.7 units.
- **The page** (`u016-preview.src.html`, card 5, lines 403–428): the same values, τ, window, conversion time and the
  *"236 LSB high"*; its timeline caption *"0 – 8 µs, slowed 2 500 000× at 1×"* (8 µs × 2.5 × 10⁶ = 20 s) is the page's
  animation, not used by a drawing. **No error found in the page's numbers.**

**Section D, Draw rows**
- [x] Proportions: the circuit is a schematic (no scale, said by its symbols); the timeline is **to one stated scale** (in
  `t-title` and §3) and its curves are true.
- [x] Line types: `outline` for conductors, parts and the curve; `thin` for axes, ticks and reference levels (dashed by
  `dash`, not by misusing `hidden`); no construction layer left.
- [x] Curves from their equation (`function`), the equations in §3.
- [x] Every `say` matches its Flow paragraph (§4a); s7's matches the PLAN's FAULT.
- [x] Numbers on the drawing recomputed above.

**Section D, Electronics rows** (the drawing shows a circuit's values): the sensors are Thévenin sources (*a voltage behind
1 kΩ*, D1·040 card 4's model); R_on and C_s the course's model; the converter the course's; every value from §3 of
course-accuracy. Sources (cited here only, never on the wall): the multiplexed single-S/H structure is the common MCU ADC
(for example the ATmega328P datasheet's ADC chapter: an 8-channel analog multiplexer in front of one sample-and-hold, whose
*Analog Input Circuitry* gives C_S/H 14 pF and a 1–100 kΩ series resistance); the course's 12-bit, 1 kΩ, 10 pF values are
course-accuracy §3's.

**A1–A8**: A1 ✓ (values sourced above); A2 ✓ (s7 is the non-ideal, beside the ideal settled run); A3 ✓ (IEC; not branded); A4
n/a (no instrument); A5 ✓ (no motion stands for time: the timeline is the time, on one scale); A6 ✓ with the labels below;
A7 ✓ (2047 or 2048, 1759, 510 ns, 14 %, 500 kS/s agree with cards 2, 3 and 7); A8 ✓.

**Simplifications and their on-bench labels** (A6):
- *sensor returns through ground, not drawn* (`note-gnd`).
- *a model: the capacitor keeps the last channel's voltage* (the legend; F6). Real converters differ: some reset or
  precharge the sampling capacitor between conversions, and in a charge-redistribution SAR the capacitor array is switched
  during the conversion. The course decided this model (course-accuracy §3); the label says it is one.
- *the timeline to one scale; the circuit not to scale*: said by `t-title`.

**Course accuracy (A1–A7 on the owner's text for this card)**: the statement, the PLAN's SHOW, Look for, SEED and FAULT, and
the Flow (p0–p3) checked against the model and against D3·030 and D3·050's S17 harvests. **No accuracy finding.** One
consistency note on our own demonstration (F7).

## 9. Faults and non-ideal behaviour

**PLAN FAULT** (verbatim): *Crosstalk: a high-impedance channel read straight after a full-scale one reads high, because the
capacitor arrives carrying the previous channel's charge.*

On the bench: **s7** (owner-approved on the U016 page as the library's *"CH3 at 50 kΩ"* control). CH3 becomes a 50 kΩ source
(card 3's 100 k / 100 k divider); the capacitor arrives at 3.00 V from CH2; τ = 510 ns, so the 1 µs window holds 1.96 τ and
leaves 14 % of the 1.35 V step: held 1.840 V, **+236 LSB, code 2283** where the settled channel reads 2047 or 2048. CH4 (1 kΩ)
is unaffected (2730). §8 has the arithmetic.

**How it is driven.** The page drove it with a toggle on the hardware (a library control). A drawing has no live control,
so on the Draw Bench it is a **step**: s7 hides CH3's 1 kΩ curve, keeps it dashed for comparison, and draws the 50 kΩ one.
What the Draw Bench cannot do: let the learner flip it back and forth, pick another channel, or reorder the channels. That
is the ADC-input block's (X1) on the Electronics Bench, where the source resistance sits on the sensor itself (the control
built into the hardware), and the capacitor's voltage is solved, not drawn (§12; F1).

Other non-ideal effects, not shown (named for the record): charge injection from the switch; the protection diodes and pin
capacitance (card 1's drawing omits them, said on it); the converter's own noise, which is why 1.65 V reads *2047 or 2048*.

## 10. Accessibility, legibility and print

- Wall (C2): values and labels in role `label` at 7:1 and the viewer's floor; notes in role `note`. Check at 1920 × 1080 and
  1024 × 768 that the four *settled* words clear the next slot's curve, that *starts at 3.00 V* (s6) clears CH2's hold line,
  and that s7's *+236 LSB · reads high* and τ note clear the dashed 1 kΩ curve (the closest pairs).
- Reduced motion (C3): each step lands whole; every still reads from its `say`, values and codes alone.
- Colour (C4): every ink carries words or a dash (§3); the drawing reads in greyscale (the fault curve is the one labelled
  *50 kΩ*, the ghost the one dashed *at 1 kΩ*).
- Keyboard (C5): → ← R.
- Print (C8): the eight stills with their `say` lines, codes and voltages.

## 11. Assets to make or source

| Asset | Format | Made by | Status |
|---|---|---|---|
| `mux-one-capacitor.benchdrawing`: two bands, five layers, eight steps (§3, §4) | Draw library | the author (written as a file, or drawn and imported by SVG, M59b) | to make for Saturday |
| The `drawing` block on the card: `title` *One capacitor, many inputs*; `src` `drawings/mux-one-capacitor.benchdrawing`; `alt` *Four sensors feed one analog multiplexer, one sample-and-hold capacitor and one converter; a timeline beneath shows the capacitor taking each input's voltage in turn, at four different moments 2 µs apart.*; `caption` *One converter, one capacitor, four inputs taken in turn.* (wording a **Proposal**, F2) | `en.md` | the author | to write |
| French: until a drawing's text can be localised, a variant `mux-one-capacitor.fr.benchdrawing` (my draft, marked for the owner's review) | Draw library | the author | when FR is built |

## 12. Bench capabilities this needs

**Draw Bench**:
- **exists**: the format with layers, rect / line / text / ellipse / `function` items, named inks, line types with `dash`,
  fills with tint (M59a); steps with `draw` / `hide` and `say`, traced on the wall and mirrored (M59d); function curves with
  `exp` (M59p); zoom in Study and Scope (M59e-iii); SVG export (M59b), which D3·050's Figure reuse needs.
- **planned (M59n)**: entries other than trace and motions played on the wall: the arm could *rotate* from contact to
  contact and texts fade. Not needed: hide and draw per step carry the PLAN's *"the switch arm stepping"*.
- **to confirm**: whether text items trace or simply appear on the wall today (either is fine here).
- **missing (request it)**: (1) the **Symbols IEC | US** bench-level switch on the Draw Bench (owner, 2026-10-20; a drawing
  would need both symbol sets as layers and the bench choosing one); (2) **EN | FR text in a `.benchdrawing`** (text items
  and `say` are plain strings today; only the fence's `title`, `alt`, `caption` are localised); (3) **X2** (to raise):
  `steps:` on the fence, so s7 can be left to Study (F1 option b), and `layers:` with a ghosted layer, so D3·050 reuses the
  circuit with its own timeline (F6). Each goes to Benches as a crossing from `pbl2026` when the course needs it; none
  blocks this card.
- **Not this bench's**: the live crosstalk (a toggle on CH3's sensor, channel order, the capacitor's voltage solved) is the
  **Electronics Bench's ADC-input block, X1** (to raise): when it is raised as a crossing, it should ask for several channels
  converted in order, a source resistance per channel, and the capacitor carrying its charge from one channel to the next,
  naming this card. Charge dots and voltage glows are the bench's signal effects (memory `circuit-effects-are-the-benchs`):
  none drawn here; the drawing shows state and values. The curve as a live plot is the Plot Bench's (card 2's centrepiece),
  not needed here.

**Reuse of this idea elsewhere**: card 3's last paragraph (*"Convert the same channel again and again … Add a second
channel, and it comes back"*) is the same mechanism, played on card 3's Plot (1759 → 2007 → 2042 back-to-back, then 1759
again); s7 shows its other sign. Day 3 harvests S17 in D3·030 (sampling instants) and D3·050 (sequential V and I sampling is
a phase error), and D3·050's SHOW re-embeds *"Day 1's four sensors → MUX → one sample-and-hold → ADC"* with a timeline of
100 µs conversions (F6).

## 13. Stand-in for the lecture

None needed: the Draw Bench plays all eight steps today. What the drawing loses against the U016 page: the 8 µs run played in
slow motion inside each step (the curves are drawn whole, not grown in time) and the live CH3 toggle (s7 stands in, F1).
Quality-bar checks lost: B11 (the learner cannot drive the key variable; X1 restores it). The drawing's circuit layer
exports to SVG (M59b) as the source of D3·050's Figure, so nothing is drawn twice.

## 14. Findings for the owner

- **F1 — Proposal: the crosstalk as step s7.** The page made CH3 a 50 kΩ source with a control on the library; a drawing has
  no live control. Options: (a) **s7 in the drawing, played in the lecture after p3**, with the presenter's unscripted line
  (+0.35 min; the Flow does not mention the fault) — **recommended**; (b) s7 in the drawing for Study only, the lecture
  stopping at s6 (the presenter does not press on; a clean way needs X2's `steps:`); (c) a separate variant drawing; (d) wait
  for X1, the live toggle on the Electronics Bench. Recommend (a) now and (d) when X1 lands.
- **F2 — Proposal: the presenter's words.** The unscripted lines for s3, s4 and s7 and the teacher tip (§7d), and the
  fence's `alt` and `caption` (§11). On the strip only; the Flow is not touched. Take, or reword?
- **F3 — Proposal: the code in the converter's register at each step** (496, 3723, *2047 or 2048*, 2730; 2283 at s7). The
  page showed *settled* and *+236 LSB* but no codes; codes tie this card to cards 3 and 8 (B16). Take (**recommended**), or
  leave the register blank?
- **F4 — Proposal: the MUX arm and the sample switch drawn apart.** The page drew one arm, teal while acquiring and amber while
  holding: colour alone (C4), and in a still it would always look connected. Here the arm selects the channel and a separate
  sample switch, inside *one sample-and-hold*, is drawn open in every still (each step ends after its conversion), as the
  PLAN's *"analog MUX → one S/H"*; card 1 joined them as *"the multiplexer and the sample switch"*, so this card shows them
  apart. Each sensor reads *0.40 V behind 1 kΩ* (D1·040's words). Take (**recommended**), or one arm as the page?
- **F5 — Proposal: t₁ … t₄ are the instants the switch opens** (1, 3, 5, 7 µs, 2 µs apart), ticked on the time axis, with
  *CH1* … *CH4* over the slots. The page centred *"CH1 at t₁"* on each 2 µs slot without a tick. Day 3 measures exactly this
  interval (D3·050: *"each input's sample sits 100 µs from its neighbour's"*). Take (**recommended**), or label slots only?
- **F6 — Proposal: layers for reuse, and the model's label.** The circuit and the timeline in separate layers, so D3·050's
  Figure takes the circuit with its own 100 µs timeline (Day 1's 2 µs slots must not appear there under a 100 µs label, A4);
  and the legend's *a model: the capacitor keeps the last channel's voltage* (A6), since some converters reset or precharge
  it. Take both (**recommended**)?
- **F7 — Consistency note (not accuracy): "full-scale" in the FAULT, 3.00 V on the bench.** The PLAN's FAULT says *"read
  straight after a full-scale one"*; the page's CH2 is 3.00 V, 91 % of full scale. The FAULT is true as a general statement
  and is not shown to learners; the drawing labels CH2's 3.00 V and s7's `say` names it. Options: (a) keep 3.00 V
  (**recommended**); (b) CH2 at 3.30 V: CH3 would read 1.65 + 1.65 × 0.14075 = 1.882 V, code 2336, but CH2 itself reads 4095
  (3.3 V is 4096 LSB, past the last code), a clipping detail this card does not need.
- **F8 — Proposal, not recommended: a `poe` before s7** (§7b), +0.8 min.

**Accuracy findings: none** on this card's statement, PLAN or Flow (§8).

**Decided 2026-10-20** (owner: *"go with your recommendations on the proposals"*): **F1 (a)** s7 in the drawing, played in the lecture after p3 with the presenter's unscripted line (+0.35 min, inside the card's 1.7), and the live toggle on the Electronics Bench when X1 lands; **F2** the presenter's lines, the teacher tip, `alt` and `caption` taken as written; **F3** the code in the converter's register at each step; **F4** the MUX arm and the sample switch drawn apart, the switch open in every still; **F5** t₁ … t₄ ticked as the instants the switch opens (1, 3, 5, 7 µs); **F6** the circuit and the timeline in separate layers, and the legend's model label; **F7 (a)** CH2 stays 3.00 V; **F8** not taken (no `poe` before s7). Every Proposal in §3–§11 is now the spec, except §7b. This card may still join crossing 505's family; if so it is revised to Benches' shape.

## 15. Acceptance: how we know it is built right

- The eight steps of §4a play on the wall, the presenter's window and Study Mode, each holding, with the values of §3 and §8:
  v_C 0.400, 3.000, 1.650, 2.200 V; codes 496, 3723, *2047 or 2048*, 2730; at s7 1.840 V, *+236 LSB*, 2283, CH4 still 2730.
- The timeline is to one scale (170 units per µs, 90.91 per V): the four windows at 0, 2, 4, 6 µs, t₁ … t₄ at 1, 3, 5, 7 µs;
  each `function` curve passes through its start (the last held level) and its held level, and the 50 kΩ curve ends 17.3
  units above CH3's dashed level.
- The drawing compiles (`checkBenchDrawing`): every item in one layer, every step with a `say`, no construction left.
- B1 one channel per press; B2 only the new channel's items draw; B3 s0 is the parts, labelled; B4 eight stills; B5 each `say`
  on the strip; B6 the arm ends on the named contact, the curve on its held line; B7 at most two items tracing at once; B13
  values and terms only; B14 values beside their parts; B15 the circuit first, then the timeline; B16 v_C and the code as
  text; B17 circuit and timeline up together; B20 the strip's lines and tip.
- C2 legible at 1920 × 1080 and 1024 × 768 (the pairs named in §10); C3 whole steps; C4 greyscale; C5 → ← R; C6 the artboard
  fitted at 320 with zoom to each band; C8 the stills with their `say`.
- E1–E6 for the drawing as presented; checked on the lecture laptop before Saturday, both themes.
