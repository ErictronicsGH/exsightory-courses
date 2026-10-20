```yaml
id: D1-020-07-where-error-comes-from
card: "Where error comes from"
module: notes/Day01/020-measurand-and-uncertainty/en.md
bench: Draw                       # the target, and it exists (M59)
library: "course-path (`D1-010-05-measurement-path.md` §3a), played here as its variant `course-path-020-errors.benchdrawing`: layers `stages` (named), `forms` (thin), and a new layer `pins-020`"
dimensions: 2D
stand_in: none                    # every step plays on the wall today
optional_benches: []
real_thing: "the course path of D1·010 with the four categories of error (theoretical, static, dynamic, insertion) pinned at the stages where the course meets them; not to scale"
minutes: 3.2                      # on the bench: the drawing is up for the whole card
card_minutes: 3.2
status: spec-draft
learner_action: none
predictions: []
seeds: [S6, S7]                   # S6 at s3 (insertion), S7 at s4 (the bobbling last digit)
key_variable: "where on the path each kind of error enters"
time_scale: "none (traces only)"
steps: 5                          # s0–s4
```

The second module to load the course path library. It adds one layer, `pins-020`, and one variant; no
earlier drawing changes (the library's rule, `D1-010-05-measurement-path.md` §3a, §3c).

## 1. What the room must understand

- **Statement** (verbatim): *Theoretical, static, dynamic, and insertion errors. Each of them has a home
  on the path, and the course meets each one where it happens.*
- **SHOW** (verbatim from the PLAN): *Draw — the path drawing with the four categories pinned where the
  course meets them: theoretical (the sensor's model; linearization, Day 2·050), static (reading,
  environmental, characteristic: offset and gain at 060 and 080), dynamic (the ADC input, 070), insertion
  (040 and 050); plus quantization (080) and the bobbling last digit (Day 2·030).*
- **Drive** (verbatim): *one pin per Flow paragraph.*
- **Status** (verbatim): *needs Draw (pins over the path drawing).*
- **Look for**: *none in the PLAN.* Proposed: *every category has a place on the path, and the
  module number beside it says when the course gets there* (F2).
- **Bench and library.** The **bench** is the Draw Bench; the **library** is the course path drawing,
  loaded as the variant `course-path-020-errors`.
- **Insight**: *error is not one thing: each kind enters at a particular stage, so finding an error
  starts with asking where on the path it came in.*
- **Kind of knowledge**: *a picture built up* (pins added to a known drawing). Card test → **Draw**. B17,
  B18, B19 do not apply.
- **Why this bench, not a still**: the pins arrive with the paragraph that names them, on a path the room
  already knows from D1·010, so each category is placed before the next is named. A still of eight pins
  at once is a list again, which the Flow says it is not (*"We will not study these as a list"*).
- **Key variable**: the stage a pin sits on.

## 2. Time

The Flow is 352 words, all spoken: **2.71 min**.

| Beat | Minutes | Source of the number |
|---|---|---|
| s0 the path: Flow p0 *"There are four general categories…"* (14) | 0.11 | 14 ÷ 130 |
| s1 theoretical: p1 *"Theoretical error. Every measurement…"* (137) | 1.05 | 137 ÷ 130 |
| s2 static: p2 *"Static errors stay…"* (18) and the list p3 (90) | 0.83 | 108 ÷ 130 |
| s3 dynamic and insertion: p4 *"Dynamic errors arise…"* (22) and SEED S6 (26 words) | 0.37 | 48 ÷ 130 |
| s4 where the course meets them: p5 *"We will not study these as a list…"* (71) and SEED S7 (26 words) | 0.75 | 97 ÷ 130 |
| Waiting on traces not covered by speech (5 steps, ≈ 1 s each) | 0.08 | estimate |
| **Card total / of which on the bench** | **3.2 / 3.2** | |

p1 (137 words) is spoken over s1 held, not over motion (B13). **Module check**: D1·020's card-by-card
table is in `D1-020-03-direct-indirect-null.md` §2.

## 3. The scene: what is on the bench

**Parts** (the master's layers, `D1-010-05-measurement-path.md` §3a, plus the new layer):

| id | Item | Drawn as | Where it sits, and why |
|---|---|---|---|
| `s-quantity` … `s-number` | The six stages, **named** (QUANTITY → SENSOR → CONDITIONING → ADC → FIRMWARE → NUMBER) | `outline`, `label` | the room wrote them in D1·010's checkpoint |
| `f-*`, `a1`–`a6` | The forms lane, light | `thin` | context only |
| `p-theo-sensor` | **Theoretical**: *the sensor's model* | pin, `teal`, head letter **T** | SENSOR: the model that says how the sensor's output follows the quantity (D1·030) |
| `p-theo-fw` | **Theoretical**: *linearization · D2·050* | pin, `teal`, **T** | FIRMWARE: where the model is applied to the code |
| `p-stat-read` | **Static**: *reading* | pin, `amber`, **S** | NUMBER: misreading the display |
| `p-stat-env` | **Static**: *environmental* | pin, `amber`, **S** | SENSOR: temperature, fields and radiation act on the sensor first (the Flow's *"can affect a sensor's output"*) |
| `p-stat-char-060` | **Static**: *offset, gain · 060* | pin, `amber`, **S** | CONDITIONING |
| `p-stat-char-080` | **Static**: *offset, gain · 080* | pin, `amber`, **S** | ADC |
| `p-dyn` | **Dynamic**: *the ADC input · 070* | pin, `violet`, **D** | ADC (its input; D1·070 adds the ADC INPUT stage here) |
| `p-ins-040` | **Insertion**: *loading · 040* | pin, `rose`, **I** | the arrow SENSOR → CONDITIONING (where D1·040 adds SOURCE & LOADING; the library reserves the space, §3c) |
| `p-ins-050` | **Insertion**: *the ammeter · 050* | pin, `rose`, **I** | SENSOR (D1·050: current sensed by putting something in its path) |
| `p-quant` | *Quantization · 080* | pin, `azure`, **Q** | ADC |
| `p-bobble` | *The last digit · D2·030* | pin, `lime`, **N** | FIRMWARE (D2·030: the bobbling code reaches the firmware) |

A **pin** is a short `thin` leader with a `dot` start on the stage's edge and a round head carrying the
letter, the label beside the head in role `note`: category on the first line, *what · where* on the
second. Pins on one stage fan out above it so none overlaps (eleven pins, at most three on a stage:
ADC carries static, dynamic and quantization).

**Meet the parts** (B3): s0 shows the path the room already knows, named; nothing new to meet.

**Values beside their element**: none; the module numbers (*040*, *070* …) are the only figures.

**Labels**: on their pins; nothing moves, so leaders are allowed (D6.3).

**Colours and their second channel** (C4): each category has an annotation ink **and** a head letter
(T, S, D, I, Q, N) **and** its name in the label; legend card lists the six.

## 4. The run: step by step, as the Flow goes

### 4a. Steps

| # | id | Flow paragraph (first words) | What changes: the step's one sentence (`say`) | Overlay | Presenter's control |
|---|---|---|---|---|---|
| 0 | `s0-path` | p0 *"There are four general categories…"* | The path from D1·010, every stage named: each kind of error enters somewhere on it. | — | Next appears the bench |
| 1 | `s1-theoretical` | p1 *"Theoretical error…"* | Theoretical error lives in the model: the sensor's, and the firmware's linearization of it. | — | Next |
| 2 | `s2-static` | p2 *"Static errors stay…"*, p3 the list | Static errors: reading at the display, environmental at the sensor, offset and gain in the conditioning and the converter. | — | Next |
| 3 | `s3-dynamic-insertion` | p4 *"Dynamic errors arise…"*, SEED S6 | Dynamic error at the converter's input; insertion error where the sensor meets its load and where an ammeter goes in. | — | Next |
| 4 | `s4-where-we-meet` | p5 *"We will not study these as a list…"*, SEED S7 | Two more at the converter and the firmware: quantization, and the last digit that will not sit still. Each pin names the module that meets it. | *each error, where it happens* | Next leads to card 8 |

### 4b. Motion, cues and stills per step

| # | Motion (Draw entries) | Movers | Cue and its second channel | Hold | Reduced motion | Still |
|---|---|---|---|---|---|---|
| 0 | the stages and the light forms lane trace in | 1 | the trace | hold | whole | the named path |
| 1–4 | each pin of the step traces its leader from the stage outward, then its head and label fade in (`enter: trace`, then `enter: fade`), in the order the paragraph names them | 1 at a time | the leader grows out of the stage the paragraph names (B6: the cue starts at the place) | hold | pins whole | the path with the pins so far |

Five stills (B4). Nothing flashes (B8).

## 5. Pacing and interaction, by surface and view

As `D1-010-05-measurement-path.md` §5: presenter paces on the wall; Preview Back · Next · *step n of 5* ·
Replay; View the step list and zoom (Study, Scope); Edit ink, hide or fade an item, a note (session only;
not yet specified for the Draw Bench, request X6); Authoring the editor and the steps in the file.
**Proposal** (F3): in View, a *Layers* toggle per category so a learner can show one category's pins
alone. Phone: the path in two rows (card 5's F4) with the pins above each row; two fingers zoom.
**Locked**: none.

## 6. The frame

As `D1-010-05-measurement-path.md` §6. Identity bar: *Where error comes from · ● Holding · step n of 5*.
Legend card: the six categories with their inks and letters; *not to scale*.

## 7. Thinking, not watching

- **7a. The PLAN's ASK**: *none on this card.*
- **7b. Prediction point** — **Proposal** (F4): before s3, *"Where on the path would you expect the act
  of measuring to change what is measured?"* (at the sensor's output · in the firmware · at the display);
  answer: *at the sensor's output* (D1·040's loading). A `poe` before the card or asked aloud; +0.5 min.
- **7c. After**: the module's checkpoint (card 9, *"Your budget"*) takes the stages from the D1·010
  suspect list and gives each an allowance; these pins are the reasons.
- **7d. Teacher tip** — **Proposal** (F4): *Learners file every error under "the sensor". Ask: if the sensor
  were perfect, which pins would still be on the path?* (Every pin not on SENSOR.)
- **7e. Explore**: none.

## 8. Faithfulness (the quality bar)

**Section D, Draw rows**
- [x] Proportions: a block diagram, *not to scale*.
- [x] Line types: `outline` stages, `thin` forms and leaders; no construction.
- [x] Curves: none.
- [x] Every `say` matches its Flow paragraphs (§4a).
- [x] Numbers: module numbers only, each checked against the course's modules: 040 *The sensor as a
  source* (loading), 050 *Current as the quantity* (burden), 060 *Signal conditioning* (offset, gain),
  070 *The ADC input* (acquisition), 080 *Conversion* (quantization, gain and offset), D2·030 *Noise* (the
  bobbling code), D2·050 *Calibration and maths* (linearization). These match the PLAN, the Flow's p5 and
  the seed register (S6 → 040, 050; S7 → D2·030, D2·040).

**Mechanism**: the four categories and their members are the Flow's (from the source transcript
*Chapter 15 - measurement_errors.md*); the pins add only *where*, and each *where* is the module the PLAN
names.

**A1–A8**: A1 ✓; A2 n/a (a map of where errors enter; each is shown at its module); A3 ✓ (*not to scale*);
A4, A5 n/a; A6 ✓; A7 ✓ with one choice reported (F1: environmental at SENSOR); A8 ✓.

## 9. Faults and non-ideal behaviour

**PLAN FAULT**: none on this card. The card is the course's map of faults; each is shown at its module.

## 10. Accessibility, legibility and print

- Wall (C2): eleven pins and labels on a six-stage path is the densest drawing of Day 1: **check at
  1920 × 1080 and 1024 × 768 when drawn** that no label collides and every label reaches the floor; if not,
  labels drop to one line (*insertion · 040*) with the second line in the step's `say`.
- Reduced motion (C3): each step whole.
- Colour (C4): ink + letter + name; checked under the three colour-vision simulations.
- Keyboard (C5): → ← R.
- Print (C8): five stills with their `say`; the final still with the legend is the module's error map.

## 11. Assets to make or source

| Asset | Format | Made by | Status |
|---|---|---|---|
| The `pins-020` layer in `course-path.benchdrawing` | Draw library (master) | the author | to make for Saturday |
| `course-path-020-errors.benchdrawing`, the variant with five steps | Draw library | the author | to make for Saturday |

## 12. Bench capabilities this needs

**Draw Bench**: **exists**: traces and `enter: fade` on the wall (M59d), steps, `say`, `dot` ends, zoom in
Study. **Missing (request it)**: `steps:` / `layers:` on the `drawing` fence (request X2; this is the
library's sixth variant). **Proposal**: a per-layer toggle in View (F3), part of X2's `layers:`.

## 13. Stand-in for the lecture

None needed: the Draw Bench plays all five steps today.

## 14. Findings for the owner

- **F1 — Environmental error pinned at SENSOR.** The PLAN lists environmental error under static without
  a place; the Flow says it *"can affect a sensor's output"*, so this spec pins it at SENSOR. It also acts
  on references and resistors (D1·090, D2·060). Keep the single pin, or add one at the reference later?
- **F2 — No Look for in the PLAN.** Proposed: *every category has a place on the path, and the module
  number beside it says when the course gets there.* Add it?
- **F3 — Proposal**: a per-category layer toggle in View for Study.
- **F4 — Proposals**: the prediction before s3 (§7b, +0.5 min) and the teacher tip (§7d).

## 15. Acceptance: how we know it is built right

- The five steps of §4a play on the wall, the presenter's window and Study Mode, each holding; eleven
  pins at the stages of §3, each with its category, letter and module number.
- B1 one category's pins per press; B2 only the new pins draw; B4 five stills; B5 each `say` on the
  strip and read in Scope; B6 each leader grows from its stage; B8 nothing blinks; B12 the wall's strip not
  operable; B13 labels are terms and module numbers only; B14 labels on their pins; B16 the map readable
  as text (the `say` list); B20 the next `say` and the tip on the strip.
- C2 no collision at 1920 × 1080, labels at the floor at 1024 × 768 (compiler warnings clean); C3 each
  step whole; C4 the six categories distinguishable in greyscale by letter; C5 → ← R; C6 walked at 320,
  768, 1200, 1440, 1920; C7 < 100 ms to first frame; C8 the stills with their `say`.
- The variant's ids are the master's; `pins-020` is a new layer and changes nothing in D1·010's variants.
- E1–E6 for the drawing as presented; checked on the lecture laptop before Saturday, both themes.
