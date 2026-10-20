```yaml
id: D2-010-01-code-has-to-travel
card: "The code has to travel"
module: notes/Day02/010-digital-interfaces/en.md
bench: Draw                       # the PLAN's bench (D2, 2026-10-20); the course path, its next growth
library: "course-path: the course path drawing, master `course-path.benchdrawing` as designed in `D1-010-05-measurement-path.md` §3a–§3c (decided 2026-10-08), played here as its variant `course-path-d2-010-interface.benchdrawing`: the stage lane at D1·090's growth (two rows, REFERENCE feeding CONVERSION) stopped at the converter, then the code's own leg drawn box by box: digital data → DIGITAL INTERFACE (amber) → firmware → number. NOT BUILT: the master and D1·090's variant are asked of Benches by crossing 511 (open, 2026-10-20); this variant is a further need (§12, F-c1-6)"
dimensions: 2D
stand_in: "a Figure `compare` of two stills rendered from §3a (the path stopped at the converter; the path with the new leg), the presenter wiping the seam left to right; until the master is built"
optional_benches: []
real_thing: "the course's measurement path as built by the end of Day 1 (quantity to the conversion and its reference), extended by the step Day 2 adds: the code leaving the converter through a digital interface to the firmware, as a block diagram: not to scale, labelled so"
minutes: 2.4                      # on the bench: the drawing is up for the whole card (§2)
card_minutes: 2.4
status: spec-draft                # the library is not built (511); F-c1-1 to F-c1-6 open
learner_action: none
predictions: []
seeds: []
key_variable: "what comes after the converter: nothing at s1, then the code's own leg, with DIGITAL INTERFACE the new stage"
time_scale: "none (no motion: traces and fades, one per press)"
steps: 6                          # s0–s5
```

**Written 2026-10-20 (U019)** after the owner's choices on the U019 brief (*"apply all recommendations"*): **D2** (card 1 on
the PLAN's bench, the Draw Bench's course path, the drawing crossing 511 asks for) and **N3** (*"Keep the Flow; the drawing
shows the course path, with the Flow's names on the new leg (digital data, DIGITAL INTERFACE) and 'firmware → number' as the
drawing's own"*). The brief page's `draw1` (`bench-work/previews/u019-preview.html`) is the approved model of the design:
six steps, the Day 1 stages to REFERENCE, the gap, then *digital data*, *DIGITAL INTERFACE* in amber, *firmware*, *number*.
This spec follows it and names where it departs (§14).

**Which library, exactly** (read 2026-10-20, read-only):

- **The course path is the Draw Bench library `course-path`**, master `course-path.benchdrawing`, designed in
  `D1-010-05-measurement-path.md` §3a (forms on nodes, stages in their own lane, one layer per lane) and §3c, whose growth
  plan names this card: *"D2·010 adds DIGITAL INTERFACE over `a4` (exactly where ADC code → Binary data crosses the chip's
  boundary) … Each is a new item in the `stages` layer, so earlier variants never change. Adding a stage re-spaces the stage
  lane in that module's variant."*
- **It is not built.** Crossing **511** (`C:\ExSightory\lanes\pbl2026-x\.claude\crossing\open\511-pbl2026-to-benches-the-course-path-master-and-d1-090-card-6-checkpoint.request.md`,
  raised 2026-10-20, open) asks Benches for the master and D1·090 card 6's variant `course-path-090-checkpoint` (nine stages in
  two rows, 5 + 4, REFERENCE a side input into CONVERSION, the stage lane only). Its scope is those two; this card's variant
  is not in it (F-c1-6).
- **This variant starts from D1·090's**: the same stage ids, labels, inks and two-row geometry for row 1 and the turn into
  row 2, so the room sees yesterday's last drawing come back, then grow. Conventions copied from
  `D1-090-06-back-to-the-sensor.md` §3a.
- **Not the same library**: the Animation Bench's `measurement-path` v0.4.2 (D1·020 card 1; six chevron stages) is not used
  (D1·090 F1 (b)).

## 1. What the room must understand

- **Statement** (verbatim): *Once an ADC has produced digital data, that data still has to reach the processor. A digital
  signal is the electrical representation; digital data is the information it carries. They are related, but they are not
  the same thing.*
- **SHOW** (verbatim from the PLAN): *Draw — the course path drawing from D1·010, with the code's own leg added: ADC →
  Digital data → DIGITAL INTERFACE → Processor → Engineering value.*
- **Drive** (verbatim): *retrace the Day 1 stages quickly (the room knows them), stop on the ADC with nothing after it, then
  draw the new leg one box at a time and light DIGITAL INTERFACE amber.*
- **Look for** (verbatim): *the code sitting at the ADC with a gap after it; the path is not finished when the converter
  is.*
- **Status** (verbatim): *needs Draw: the D1·010 path drawing with three more steps (digital data, interface, processor)*
- **The PLAN's names against N3.** The PLAN's leg ends *Processor → Engineering value*; N3 decided the drawing's own
  *firmware → number* there (the stages the course path already has), and the Flow's names on the new part: *digital data*,
  *DIGITAL INTERFACE*. The Flow still speaks the transcript's nine names (p6); the drawing shows the course path.
- **Bench and library.** The **bench** is the Draw Bench (M59). The **library** is the course path, `course-path`, loaded as
  its variant `course-path-d2-010-interface` (to be built: F-c1-6).
- **Insight**: *the ADC's code is not the end of the path: it is data that still has to move, through a digital interface,
  before firmware can turn it into a number.*
- **Kind of knowledge**: *a picture built up* (the path extended box by box). Card test → **Draw**. B15, B17, B18, B19 do
  not apply.
- **Why this bench, not a still**: the gap is the point. The room sees yesterday's path end at the converter with nothing
  after it, and then sees the new leg arrive one box at a time while the Flow names it. A still shows the whole path at once
  and loses the gap.
- **Key variable**: what follows the converter.

## 2. Time

The card's Flow is **307 words** (`en.md`, 2026-10-20; whitespace tokens, cue markers removed, list markers counted, as the
U019 brief counts them). All of it is spoken; there is no activity. **307 ÷ 130 = 2.36 min.**

| Beat | Minutes | Source of the number |
|---|---|---|
| s0 Day 1 retraced (one linked trace, ≈ 3 s, under speech): p0 *"Yesterday we walked the path…"*, first sentence | 0.38 (p0 whole, 49 words) | 49 ÷ 130 |
| s1 the gap: p0 from *"By the end of Day 1…"* to *"…still sitting inside the converter."* | (in p0) | |
| s1 held: p1 *"Once an ADC has produced digital data…"* (41), p2 the five interfaces (17), p3 *"Digital systems represent information…"* (50) | 0.83 | 108 ÷ 130 |
| s2 digital data: p4 *"This gives us an important distinction…"* (68), p5 *"So the measurement chain does not end…"* (22) | 0.69 | 90 ÷ 130 |
| s3–s5 pressed as p6 names them (*"…Digital interface → Processor → Engineering value"*, 23) | 0.18 | 23 ÷ 130 |
| s5 held: p7 *"The ADC solves the problem…"* (37) | 0.28 | 37 ÷ 130 |
| Presses not covered by speech (s1–s5, ≈ 1 s each for the trace or fade) | 0.08 | 5 × 1 s, estimate |
| **Card total / of which on the bench** | **2.4 / 2.4** | 2.44 |

The long paragraphs (p1–p3, p4) fall on held states (B13). s3–s5 come quickly, inside one spoken sentence: three presses
in about four seconds, each a short fade, so the boxes arrive as their names are said (F-c1-5).

**Module check** (D2·010, `targetMinutes: 30`): the Flow is **2,643 words = 20.3 min** at 130 wpm (cards 307, 363, 175, 258,
217, 197, 292, 224, 423, 187); the module is **≈ 31.6 of 30 min** (`D2-010-07` §2b; the brief said ≈ 33) with its ten activities and bench moves.
This card adds no activity and 0.08 min of presses. Reported only; nothing is trimmed.

## 3. The scene: what is on the bench

### 3a. The variant (`course-path-d2-010-interface`), from the master's layers

The master as designed: artboard 1600 × 900 drawing units, ink names from the Draw palette (D12.15), never hex. This variant
shows **the stage lane only**, in **two rows**, as D1·090's variant does (its F3 (a), decided); no forms lane.

| Layer | Items (stable ids) | What | Source |
|---|---|---|---|
| `stages` (row 1, unchanged from D1·090) | `s-quantity`, `s-sensor`, `s-loading`, `s-conditioning`, `s-adc-input` | five boxes 270 × 110, `contrast` outline, each with its name (role `label`); left edges at x = 25 + 320 i, top at y = 120 | D1·090 card 6 §3a; the master's ids |
| `stages` (row 2) | `s-conversion` (x 25), `s-digital-interface` (**new**, x 625), `s-firmware` (x 945), `s-number` (x 1265), all 270 × 110, top at y = 470 | the converter, then the code's leg; row 2 **re-spaced** for this variant (§3c's rule) | the master §3c; this card |
| `stages` (side input) | `s-reference` | 270 × 110, placed where D1·090's variant places it (*"beside CONVERSION"*; proposed: under it, top at y = 700), its arrow into CONVERSION | D1·090 F2 (a), decided |
| `forms-inline` (**new layer**) | `f-digital-data` | the Flow's *digital data*, drawn as a **form**, not a stage: a rounded node 230 × 90 (corner 16, `faint` fill, `contrast` outline, the forms lane's style), at x 345, centred on row 2's line (F-c1-1) | the master §3a (*"forms are nodes; stages are what turns one form into the next"*); N3 |
| `stage-arrows` | `sa1`–`sa4` (row 1), `sa5` (ADC input → CONVERSION, the turn into row 2, routed through the gap between the rows), `sa-ref` (REFERENCE into CONVERSION) | `outline` arrows with an `arrow` end, as D1·090 | D1·090 §3a |
| `leg-arrows` (**new**) | `la1` CONVERSION → digital data, `la2` digital data → DIGITAL INTERFACE, `la3` → firmware, `la4` → number | `outline` arrows, 50 units long between boxes | this card |
| `gap` (**Proposal**, F-c1-2) | `g-stub`, `g-say` | a short `hidden` (dashed) arrow stub out of CONVERSION ending in nothing, and the note *still sitting inside the converter* (role `note`, the Flow's own words, p0) above it | Flow p0 |

Row 2's geometry: 25 + 270 = 295; the form node 345–575; 625–895; 945–1215; 1265–1535 ≤ 1600 ✓; every gap 50 units, as row 1's
(pitch 320 − 270). The node is narrower (230) and shorter (90) than a stage box, so it reads as what travels, not as a stage.

**Labels, EN · FR** (D1·090's where they exist; FR drafts ours, for the owner's review): quantity · *grandeur*; sensor ·
*capteur*; loading · *charge*; conditioning · *conditionnement*; ADC input · *entrée du CAN*; conversion · *conversion*;
reference · *référence* (F-c1-3); **digital data** · *données numériques*; **DIGITAL INTERFACE** · *INTERFACE NUMÉRIQUE*
(capitals: the module's own stage, as the PATH line writes it; on two lines, *DIGITAL / INTERFACE*, *INTERFACE /
NUMÉRIQUE*, the master's two-line limit); firmware · *micrologiciel*; number · *nombre*; the note *still sitting inside the
converter* · *encore à l'intérieur du convertisseur*. Legend card: *not to scale*; *the stages of the path, as the course has
built it* · *pas à l'échelle* ; *les étapes du chemin, telles que le cours les a construites*.

**Fence text** (`drawing` block): `title` EN *The course path: the code's own leg* · FR *Le chemin du cours : le trajet du
code*; `alt` EN *The course path from the quantity to the conversion and its reference, then the code's own leg: digital
data, the digital interface, firmware and the number.* · FR *Le chemin du cours, de la grandeur à la conversion et à sa
référence, puis le trajet du code : données numériques, interface numérique, micrologiciel et nombre.*; `caption` EN *Not
to scale. The path does not end at the converter.* · FR *Pas à l'échelle. Le chemin ne s'arrête pas au convertisseur.*

**Meet the parts** (B3): the room met every Day 1 stage yesterday (the PLAN: *"the room knows them"*); s0 is the meeting,
fast. The new leg introduces each box as it arrives (its `say`).

**Values beside their element**: none. No number is on this card (Day 1's 2047 is not tagged: F-c1-4).

**Colours and their second channel** (C4):

| Thing | Ink | Second channel |
|---|---|---|
| Stage boxes, arrows | `contrast` | `outline` weight; names in the boxes |
| reference | `contrast` (F-c1-3; D1·090 drew it `rose` as that module's stage) | its side arrow into CONVERSION |
| digital data | `contrast` text on `faint` fill | rounded node shape, smaller than a stage box |
| DIGITAL INTERFACE | `amber`, outline and name | capitals, the heavier `outline` weight, two-line name |
| The gap stub (proposal) | `contrast` | `hidden` (dashed) line type, ends in nothing; the note's words |

### 3b. No chip boundary is drawn

The master's §3c places DIGITAL INTERFACE *"where ADC code → Binary data crosses the chip's boundary"*. This card does
**not** draw a chip outline: Day 1's converter is inside the microcontroller (the module's own transition: *"So far the code
has come from the converter inside the microcontroller, and travelled a few millimetres"*), and p1 (F3, applied) gives the
separate ADC chip only as an example (*"when the ADC is a separate chip…"*). A drawn boundary would assert one case as the
path. The interface is drawn as the stage it is in both cases.

## 4. The run: step by step, as the Flow goes

### 4a. Steps

| # | id | Flow paragraph (first words) | What changes (`say`) | Presenter's control |
|---|---|---|---|---|
| 0 | `s0-day1-retraced` | p0 *"Yesterday we walked the path…"* | Day 1's path, retraced: from the quantity to the conversion and its reference. | (the slide opens) |
| 1 | `s1-the-gap` | p0 *"By the end of Day 1 the ADC had produced a code…"*; held over p1–p3 | The code exists, but it is still inside the converter: nothing comes after it yet. | Next |
| 2 | `s2-digital-data` | p4 *"This gives us an important distinction…"*; held over p5 | Digital data: the information the code carries, which still has to move. | Next |
| 3 | `s3-digital-interface` | p6, at *"…Digital interface"* | DIGITAL INTERFACE: how the data moves reliably from one device to another. | Next |
| 4 | `s4-firmware` | p6, at *"…Processor"* | firmware, on the processor, receives the data. | Next |
| 5 | `s5-number` | p6, at *"…Engineering value"*; held over p7 | number: the engineering value, at the end of a path that did not stop at the converter. | Next leads to card 2 |

The `say` lines are for the strip and Study (B5); the presenter speaks the Flow.

### 4b. Motion, cues and stills

| # | Motion | Movers | Cue and its second channel | Hold | Reduced motion (C3) | Still |
|---|---|---|---|---|---|---|
| 0 | row 1, the turn, CONVERSION and REFERENCE trace in as one linked trace (`enter: trace`, ≈ 3 s; *quickly*, as the PLAN asks) | 1 | the trace | hold | whole | s0 |
| 1 | the dashed stub and its note fade in (`enter: fade`) | 1 | the stub ending in nothing; the note's words | hold | whole | s1 (the gap) |
| 2 | `la1` traces, the digital data node fades in | 1 | the node's shape, unlike a stage box | hold | whole | s2 |
| 3 | `la2` traces, DIGITAL INTERFACE fades in amber; the stub and note fade out | 1 | amber, capitals, heavier outline | hold | whole | s3 |
| 4 | `la3`, firmware | 1 | its name arriving | hold | whole | — |
| 5 | `la4`, number | 1 | its name arriving | hold | whole | s5 (the whole path, interface amber) |

Four stills (s0, s1, s3, s5). Nothing flashes (B8); the amber is steady.

## 5. Pacing and interaction, by surface and view

**Who paces** (B12): the presenter on the wall (steps mirrored); the learner in Study Mode and Scope.

| View | Who | Controls |
|---|---|---|
| Preview (in the slide) | everyone | Back · Next · *step n of 6* · *Open details* |
| View (details) | everyone | the step list with each `say`; zoom and pan (Study, Scope) |
| Edit (session only) | everyone; a student's own copy | not specified for the Draw Bench (M59; X6) |
| Authoring | authors | the drawing editor; the variant's steps |

- **The presenter's strip** (B20): the next step's `say`; the note that s3–s5 go in one sentence of p6 (press on *Digital
  interface*, *Processor*, *Engineering value*); keys → ←.
- **Study / Scope**: the six steps learner-paced; the stills.
- **Phone** (C6): the two rows full width, each box ≥ 44 px tall; one finger does nothing on the drawing; two fingers zoom.
- **Locked**: nothing.

## 6. The frame

| Tile / panel | Used? | Selected item | List / contents |
|---|---|---|---|
| Steps | yes | the current step's `say` | six steps; *Stills* |
| Zoom | Study, Scope | *Whole* / % | Fit, −, + |
| Ink | available | — | the presenter's ink and laser (M07-c), not needed by the Drive |

Identity bar: *The code has to travel · ● Holding · step n of 6*. Legend card: *not to scale*; *the stages of the path, as
the course has built it*.

## 7. Thinking, not watching

- **7a. The PLAN's ASK**: none on this card.
- **7b. Prediction point**: none added. (A *"what comes after the converter?"* would pre-empt the Flow's own p1, which
  answers it at once.)
- **7c. After**: in Study, done means s5 reached.
- **7d. Teacher tip** — **Proposal** (F-c1-5), presenter only, never on the wall: *Expect "the code goes straight to the
  firmware, like yesterday". Yesterday's converter was inside the microcontroller and its code reached the CPU through a
  register: an interface too, a few millimetres long. Today's question is the same one at any length: how does the data get
  from one device to another, and what does each side expect (D1·040's question)?*
- **7e. Explore**: none.

## 8. Faithfulness (the quality bar)

**Numbers**: none on the drawing or in the `say` lines.

**Section D, Draw rows**
- [x] Proportions: a block diagram, *not to scale* on the legend card.
- [x] Line types: `outline` for boxes and arrows; `hidden` for the gap stub; the form node in the forms lane's style.
- [x] Curves: none.
- [x] Every `say` matches its Flow paragraph (§4a).
- [x] No construction line left after the last step: the stub and note leave at s3.

**A1–A8** (on the owner's text and this spec):
- A1 n/a (no numbers). A2 ✓: the path runs through the course's own stages; firmware runs on the processor, and the number
  is the engineering value (N3's mapping of the Flow's *Processor → Engineering value*).
- A3 n/a. A4 ✓: p0 *"Yesterday we walked the path from the quantity all the way to the converter's reference"* against
  D1·090 (the last module of Day 1, the reference) ✓; *"we knew what that code was a ratio to"* against D1·090 card 1
  (*A code is a ratio to the reference*) ✓; the drawing's row 1 and REFERENCE against D1·090 card 6's variant ✓.
- A5 ✓: REFERENCE drawn as a side input into the conversion, where it acts (D1·090 F2); no chip boundary asserted (§3b).
- A6 ✓: p1 (F3, applied 2026-10-20) now says *"For example, when the ADC is a separate chip, **ADC → microcontroller** may
  communicate through interfaces such as:"*: re-checked, it limits the list to the external-ADC case and is consistent with
  the module's transition ✓. *"may communicate"* over the five kinds (SPI, I²C, parallel, UART or other serial,
  device-specific) is true of external ADCs as a class ✓.
- A7 ✓: the stages are the course's own (PATH lines, `course-organization.md`). A8 ✓.
- **N3 re-checked**: the Flow's spoken path (p6, nine names) and the drawn path (eleven items) describe the same chain at two
  levels of detail; neither is false. The new leg uses the Flow's names (*digital data*, *DIGITAL INTERFACE*) ✓.

## 9. Faults and non-ideal behaviour

**PLAN FAULT**: none on this card. Nothing non-ideal is drawn; the faults of the interface are the module's later cards.

## 10. Accessibility, legibility and print

- Wall (C2): labels at the wall's floor in boxes 270 units wide, as D1·090 (its F3: two rows give ≈ 270-unit boxes where
  *conditioning* fits). *DIGITAL INTERFACE* in capitals needs two lines (≈ 11.6 em on one line; *INTERFACE* alone ≈ 6 em,
  about *conditioning*'s width); *données numériques* in the 230-unit node may need two lines in FR. Check at 1920 × 1080
  and 1024 × 768, EN and FR (the compiler warns, D12.16).
- Reduced motion (C3): each step lands whole.
- Colour (C4): the interface by capitals and weight as well as amber; the form node by its shape.
- Keyboard (C5): → ←.
- Print (C8): s1 (the gap) and s5 (the whole path), each with its `say`.
- Languages: every label, note and `say` `{en, fr}`; FR drafts ours, marked for review.

## 11. Assets to make or source

| Asset | Format | Made by | Status |
|---|---|---|---|
| `course-path.benchdrawing`, the master (D1-010-05 §3a), with the new items `s-digital-interface`, `sb-digital-interface` and the layer `forms-inline` (`f-digital-data`) | Draw library | the Benches lane | master asked by crossing 511; the new items to ask (F-c1-6) |
| `course-path-d2-010-interface.benchdrawing`, this variant: layers `stages`, `stage-arrows`, `leg-arrows`, `forms-inline`, `gap`; six steps; EN and FR | Draw library (variant) | the Benches lane | to request (F-c1-6) |
| The stand-in's two stills (§13) | SVG, rendered from §3a's layout | this project (a preview) | to render if the build is late |

## 12. Bench capabilities this needs

- **Draw Bench** (M59): traces (`enter: trace`), `enter: fade`, steps with `say`, mirrored, `amber` and `faint` inks
  (D12.15), role `note` — **exist** (`drawingBlock.ts`: one `.benchdrawing` per fence, `derived.steps` with `id` and `say`,
  `step` mirrored; read 2026-10-20).
- **One master, variants by step range and layers** (the fence's `steps:` / `layers:` / `focus:`, `requests-to-exsight.md`
  X2) — **missing**, already listed (to raise as a crossing, a Draw capability); until then the variant file.
- **The library** — **missing (request it)**: the master by 511; this variant by the crossing F-c1-6 describes.
- **Not needed**: the Symbols IEC | US switch (no circuit symbols on this drawing); ink.

**For the Benches lane (the need F-c1-6 describes)**: the course path's D2·010 variant `course-path-d2-010-interface`,
built on 511's master and D1·090's two-row geometry: row 1 and REFERENCE as D1·090; row 2 re-spaced as §3a (CONVERSION,
the *digital data* form node, DIGITAL INTERFACE in amber capitals on two lines, firmware, number); the gap stub and note
(if F-c1-2); six steps with the `say` of §4a and the motion of §4b; EN and FR; stills s0, s1, s3, s5 in `shots/`. Values and
sources: none beyond the words (§3a). Stand-in until it lands: §13. Needed in lecture order: Day 2's first card.

## 13. Stand-in for the lecture

Until the master is built: **a Figure `compare`** of two stills rendered here from §3a: the base is the path stopped at the
converter with the gap (s1), the overlay the whole path with the new leg (s5), same aspect. The presenter drags the wipe
seam from left to right over p4–p6, so the new leg appears in order (`wipe` is mirrored, `figureTypes.ts`).

- **It shows**: the retraced path, the gap, the new leg in path order, DIGITAL INTERFACE in amber.
- **It loses**: one box per press (the seam reveals continuously), the traces, the `say` per step in Study. Checks lost: B1
  and B5 partly, B4 for s0, s2 and s3.
- **The Flow**: unchanged.
- The stills are drawn from the variant's layout, so nothing is designed twice; the build replaces them.

## 14. Findings for the owner

No **accuracy** finding on this card: its Flow and statement pass A1–A7 (§8), with F3 applied and re-checked.

- **F-c1-1 — Proposal: *digital data* drawn as a form, not a stage.** The master puts forms on nodes and stages on arrows
  (D1-010-05 §3a); *digital data* is what the statement calls *"the information it carries"*, a form, and DIGITAL INTERFACE
  is the stage that moves it. The brief's model drew it as a stage box. Options: (a) a smaller rounded node in the forms
  lane's style, inline in row 2 (**recommended**: the drawing then says what the statement says); (b) a stage box like the
  others, as the brief drew; (c) a tag on the arrow out of CONVERSION, like D1·090's *2047*.
- **F-c1-2 — Proposal: the gap drawn, with the Flow's words.** The Look for wants *"a gap after it"*. Options: (a) a dashed
  stub out of CONVERSION ending in nothing, and the note *still sitting inside the converter* (p0's words), both gone at s3
  (**recommended**); (b) the gap as empty space only, as the brief drew (its note sat in the brief's caption line); (c)
  firmware and number drawn ghosted (faint) at the right, so the gap opens *between* the converter and the firmware the room
  saw yesterday.
- **F-c1-3 — Proposal: reference back to plain ink on Day 2.** D1·090 drew REFERENCE in capitals and rose as its own
  module's stage; on D2·010 the module's stage is DIGITAL INTERFACE. Options: (a) *reference* in lower case and `contrast`,
  its side arrow kept (**recommended**: one accent on the drawing, B2; the PATH lines' rule, each module capitalises its
  own); (b) keep REFERENCE capitals and rose, as D1·090.
- **F-c1-4 — No number on the path.** D1·090's variant could carry *2047* on the conversion's output; this card's Flow says
  *"a code"* and never 2047. Kept off (no proposal); say if you want it.
- **F-c1-5 — Proposals: the teacher tip (§7d); s3–s5 pressed inside p6's one sentence** (three presses in ≈ 4 s, the boxes
  arriving as their names are spoken; the alternative is s3 on p6 and s4–s5 on p7's first words). Options: (a) take both
  (**recommended**); (b) the tip only; (c) neither.
- **F-c1-6 — Crossing: this variant is not in 511.** 511 asks for the master and D1·090 card 6's variant only, and is
  pushed and open. Options: (a) **a new crossing** to Benches for `course-path-d2-010-interface` (the need in §12's last
  paragraph), naming 511 as what it builds on, so each request is one need and 511's scope is unchanged
  (**recommended**); (b) append this variant to 511, only if Benches has not started on it; (c) no request, the stand-in
  (§13) for good.
- **F-c1-7 — Row 2's geometry, shared with D1·090.** D1·090's spec says REFERENCE sits *"beside CONVERSION"* and the row-1
  arrow *"turning down"* without coordinates; this variant re-spaces row 2 and needs REFERENCE and the turn where D1·090's
  variant puts them (proposed: REFERENCE under CONVERSION, the turn routed back through the gap between the rows to
  CONVERSION's left). Options: (a) Benches fixes one geometry for both variants in its brief on 511 (**recommended**); (b)
  this spec's coordinates for both.

**Decided 2026-10-20 (owner: *"apply all recommendations"* on the U019 brief):** **D2** — card 1 on the PLAN's bench, the
Draw Bench's course path, the drawing crossing 511 asks Benches to build (this spec: its D2·010 variant, F-c1-6); **N3** —
the Flow's spoken path kept; the drawing shows the course path, with the Flow's names on the new leg (*digital data*,
*DIGITAL INTERFACE*) and *firmware → number* as the drawing's own (this spec §1, §3a, §8); **F3** (accuracy, applied to
`en.md`) — p1 *"For example, when the ADC is a separate chip, **ADC → microcontroller** may communicate through interfaces
such as:"*, re-checked here (§8 A6) ✓. F-c1-1 to F-c1-7 above are new and **open**.

## 15. Acceptance: how we know it is built right

- s0 traces row 1, the turn, CONVERSION and REFERENCE (its arrow into CONVERSION) in one linked trace, and nothing after
  CONVERSION; s1 shows the gap (and its note, if F-c1-2); s2–s5 add the digital data node, DIGITAL INTERFACE in amber,
  firmware, number, one per press; on the wall, the presenter's window and Study.
- Row 1, REFERENCE and the turn are pixel-identical to D1·090's variant (one geometry, F-c1-7); the stage ids are the
  master's.
- B1 one box per press; B2 only the new item changes; B4 four stills; B5 each `say` on the strip; B8 nothing flashes; B12
  the wall's strip not operable; B13 names only on the drawing; B20 the press cues on the strip.
- C2 every label at the floor at 1920 × 1080 and 1024 × 768, EN and FR, *DIGITAL / INTERFACE* on two lines; C3 whole; C4
  shape, capitals and weight as well as hue; C5 → ←; C6 at 320 px; C8 s1 and s5 with their `say`.
- E1–E6 for the drawing as presented, both themes, EN and FR.
- The stand-in (§13) run on the lecture laptop before the day: the seam wiped and the two stills legible.
- **Six gates (this spec)**: (1) realism: the course's own chain as a labelled block diagram, *not to scale*, no chip
  boundary asserted (§3b) ✓; (2) science: REFERENCE where it acts, the interface as the stage that moves data, data drawn
  as a form (F-c1-1) ✓; (3) maths: no numbers on the card ✓; (4) visualization: the gap, then the leg box by box, one amber
  accent (F-c1-3) ✓, stand-in partial; (5) consistency: D1·090's rows, ids, labels and inks; N3's names; F3 re-checked ✓;
  (6) design: two rows, two-line capitals, labels at the floor, EN and FR ✓ on paper, to check on the built drawing.
