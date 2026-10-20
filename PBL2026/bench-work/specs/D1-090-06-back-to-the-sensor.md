```yaml
id: D1-090-06-back-to-the-sensor
card: "Back to the sensor"
module: notes/Day01/090-reference/en.md
bench: Draw                       # owner D4, 2026-10-20: reuse D1·010 card 5's course path unchanged
library: "course-path: the course path drawing, master `course-path.benchdrawing` as designed in `D1-010-05-measurement-path.md` §3a–§3c (decided 2026-10-08), played here as its variant `course-path-090-checkpoint.benchdrawing`: the stage lane grown to D1·090's nine stages (§3c's plan), each blank, lit as the room names it; the suspect inked by the presenter. NOT BUILT: no file of the master exists (only the renders `bench-work/previews/d1-010-05-course-path.svg`, `d1-010-07-blank-path.svg`); to ask of the Benches lane by crossing (F1)"
dimensions: 2D
stand_in: "a still of the nine blank stages (a Figure, rendered from §3's layout), the names and the suspect written in the presenter's ink; until the master is built"
optional_benches: []
real_thing: "the temperature measurement's path as the course has built it by 17:00 on Day 1 (the thermistor divider, the ADC input, the conversion against the rail, the firmware), as a block diagram: not to scale, labelled so"
minutes: 4.6                      # on the bench: the drawing is up for the whole card, the checkpoint and its debrief included (§2)
card_minutes: 4.6
status: spec-draft                # D4 decided; F1 (the build), F2–F7 open; F4 is an accuracy finding
learner_action: checkpoint
predictions: []                   # the checkpoint's part 3 (the suspect) is the room's own claim; nothing added
seeds: [S9 (harvest), S30 (harvest)]
key_variable: "the stage each learner now suspects for the 2047, against the list they wrote at 12:00"
time_scale: "none (no motion: names fade in, one per press)"
steps: 11                         # s0, s1–s9, s10 (a proposal)
```

**Written 2026-10-20 (U018)** after the owner's choices on the U018 brief (*"apply all recommendations"*). D4: *"Reuse D1·010
card 5's course path unchanged; the stages light as the room names them, the presenter marks the suspect."*

**Which library, exactly** (read 2026-10-20, read-only):

- **The course path is the Draw Bench library `course-path`**: one master drawing, `course-path.benchdrawing`, designed in
  `D1-010-05-measurement-path.md` §3a (forms on the nodes, stages in their own lane with leaders to what they act on, one
  layer per lane, at most two lanes shown at once) and §3c (how its stage lane grows: *"D1·040 adds SOURCE & LOADING …;
  D1·070–090 split ADC into ADC INPUT, CONVERSION, REFERENCE … Each is a new item in the `stages` layer, so earlier variants
  never change. Adding a stage re-spaces the stage lane in that module's variant"*). D1·010 card 5 plays it as the variant
  `course-path-010-build`; cards 4, 6, 7 of D1·010 and the PATH focus of every later module are further variants.
  **It has no version: it has not been built.** No `*.benchdrawing` and no `course-path` folder exists in
  `C:\ExSightory\src\exsight-benches` (benches `animation`, `breadboard`, `electronics`), in Studio's tree
  (`C:\ExSightory\src\insight`), or here; the course has only its renders (`bench-work/previews/d1-010-05-course-path.svg`,
  `d1-010-07-blank-path.svg`, `d1-040-01-interface.svg`, `d1-060-02-conditioning-pins.svg`), and no crossing has asked for
  it (open crossings from `pbl2026`: 493–496, 505, 506).
- **The REFERENCE stage**: in the library's design (§3c, *"D1·070–090 split ADC into … REFERENCE"*), not drawn anywhere.
  The renders stop at six stages plus D1·040's SOURCE & LOADING band. This card is the first to need the full nine of the
  PATH line: *quantity → sensor → loading → conditioning → ADC input → conversion → [REFERENCE] → firmware → number*.
- **Not the same library**: the Animation Bench's `measurement-path` **v0.4.2**
  (`C:\ExSightory\src\exsight-benches\benches\animation\libraries\measurement-path\`, D1·020 card 1, contract 2) is a
  built path, but a different drawing: six chevron stages with icons (QUANTITY, sensor, conditioning, ADC, firmware,
  number), a `lit` param that lights **one** stage chosen by the author, and two stops of D1·020's own (something to
  measure; the system makes it a number). It has no loading, ADC input, conversion or REFERENCE stage, no blank state, no
  per-stage lighting in sequence and no mark. Reusing it here would put a second path drawing in the course (F1 (b)).

**What exists for the checkpoint's two actions** (Studio, M59 and M07-c, as `D1-010-07-number-not-earned.md` §12 records):
- *"The stages light as the room names them"* → **exists as Draw Bench steps** (M59d: `enter: fade`, one step per stage,
  mirrored), in a fixed order: the presenter presses Next as each stage is named, in path order (the checkpoint's part 1
  asks for them in order). Lighting **in any order**, as called, is **missing** (F6).
- *"The presenter marks the suspect"* → **exists as live ink** (M07-c: ink and laser over the Canvas, mirrored, kept with
  *Pin ink*), as D1·010 card 7 marks its suspects. A drawn suspect mark the presenter places on any stage (kept in the
  drawing's state, shown to devices and Study) is **missing** (F6).
- So the only thing to ask of the Benches lane is **the library itself** (the master and this variant, F1); the two
  actions run on what Studio has.

**Six gates** (this spec, 2026-10-20): (1) realism: a block diagram of the course's own chain, labelled *not to scale* —
pass. (2) science: every stage is one the day taught, and REFERENCE is drawn feeding the conversion, which is where it acts
(F2) — pass. (3) maths: the presenter's numbers (2047, 2224, 1.79 V, 50 kΩ, 1.29 µs, 2.53 τ, 3.59 V) recomputed in Node
(§8) — pass. (4) visualization: nine blanks filled in the room's order of naming, the suspect marked on the stage itself,
the stages added since 12:00 tagged for the comparison (s10) — pass for the target; the stand-in loses the lit names. (5)
consistency: the stage names are the PATH lines' and the master's ids; the suspect is D1·070's cause (S31); one finding on
"this morning" against the schedule, raised as **accuracy** (F4) — pass with F4 open. (6) design: nine labels at the
wall's floor need two rows (F3); EN and FR drafted — pass on paper, to check on the built drawing.

## 1. What the room must understand

- **Statement** (verbatim): *The excitation of a modulating sensor, from this morning, and the converter's reference turn
  out to be one design decision, not two.*
- **SHOW**: *none in the PLAN* (the PLAN has only the checkpoint and two harvests). Owner decision D4: the course path,
  reused.
- **ASK** (verbatim): *checkpoint (at the Flow's [[ask]]) — "Back to 2047": 1 name every stage it passed through · 2 for
  each, one way it could have spoiled the number · 3 mark the one you now suspect · 4 compare with your list from 010. ·
  depth: understand · practice: arguing from evidence*
- **HARVEST** (verbatim): *S9 — "This morning we chose the excitation for sensitivity. Now the excitation and the
  converter's reference turn out to be one design decision."* · *S30 — "Look back at the 2047 we started the day with.
  Name every stage it passed through."*
- **Bench and library.** The **bench** is the Draw Bench (M59), with the presenter's ink (M07-c). The **library** is the
  course path, `course-path`, loaded as its variant `course-path-090-checkpoint` (to be built: F1).
- **Insight**: *the 2047 passed through nine stages, each of which can spoil a number silently; after today I can name a
  way for each, and the evidence points at one: the ADC input, starved by the 100 k divider.*
- **Kind of knowledge**: *a picture built up* (the path filled in by the room). Card test → **Draw**. B17, B18, B19 do not
  apply.
- **Why this bench, not a still**: the drawing is the frame for the room's own answers. The stages light one by one as the
  room names them, so the room builds the path it walked, and the suspect is marked on it where everyone can see.
- **Key variable**: the suspected stage.

## 2. Time

The card's Flow is **106 words** (cue words not counted; `en.md`, 2026-10-20). The `[[ask]]` question (p1, 22) is counted
in the checkpoint. **84 words are spoken outside the checkpoint = 0.65 min.**

| Beat | Minutes | Source of the number |
|---|---|---|
| s0 the blank path; p0 *"This morning we met the modulating sensor…"* (59), the S9 harvest, held | 0.45 | 59 ÷ 130 |
| The checkpoint: p1 *"[[ask]] Look back at the 2047…"* (22, the S30 harvest), then the four parts written on Scope (p2 `[[pause]]`): nine stages, one way each, a suspect, the comparison with 010's list | ≈ 3.0 | estimate, as the U018 brief (D1·010 card 7's six stages and one mark took ≈ 2.0, with *"may run to 3"*) |
| s1–s9 the debrief: the room names the stages in order, one press each (≈ 3 s) | 0.45 | 9 × 3 s, estimate |
| The suspect: the presenter inks the stage the room names and reads two or three suspects with their reasons (≈ 60 words, unscripted) | 0.5 | estimate |
| s10 (**Proposal**) the stages added since 12:00 tagged, for part 4; p3 *"[[transition]] Today the quantity became a code…"* (25) over it | 0.19 | 25 ÷ 130 |
| **Card total / of which on the bench** | **4.6 / 4.6** | 4.59 |

The U018 brief estimated ≈ 3.8 min (the Flow and a 3-minute checkpoint); this spec adds the debrief (≈ 1.0) that D4's
*"the stages light as the room names them"* needs. **Module check**: `D1-090-05-ratiometric.md` §2b (≈ 17 of 30 min).

## 3. The scene: what is on the bench

### 3a. The variant (`course-path-090-checkpoint`), from the master's layers

The master as designed (artboard 1600 × 900 drawing units, ink names from the Draw palette, never hex). This variant shows
the **stage lane only**, at D1·090's growth, in **two rows** (F3), and no forms lane (F3 (a)).

| Layer | Items (stable ids) | What | Source |
|---|---|---|---|
| `stage-blanks` | `sb-quantity`, `sb-sensor`, `sb-loading`, `sb-conditioning`, `sb-adc-input`, `sb-conversion`, `sb-reference`, `sb-firmware`, `sb-number` | nine stage boxes, `outline`, no text; row 1 *quantity → sensor → loading → conditioning → ADC input*, the last arrow turning down; row 2 *conversion → firmware → number*, with REFERENCE beside CONVERSION (F2) | the master's `stage-blanks` (D1·010 card 7), grown by §3c; the PATH line |
| `stages` | `s-quantity`, `s-sensor`, `s-loading`, `s-conditioning`, `s-adc-input`, `s-conversion`, `s-reference`, `s-firmware`, `s-number` | each stage's name in its box, role `label`, one item each so each can enter on its own step | the PATH line; the master's `stages` layer (its ids `s-quantity` … extended) |
| `stage-arrows` | `sa1`–`sa7`, `sa-ref` | `outline` arrows along the chain; `sa-ref` from REFERENCE **into** CONVERSION (a side input, F2) | F2 |
| `tag-2047` (**Proposal**, F5) | `t-2047` | *2047*, mono, `amber`, on the arrow out of CONVERSION: the code under suspicion | D1·010 card 7's proposal F4 |
| `since-010` (**Proposal**, F5) | `n-loading`, `n-adc-split` + labels | a small tag under LOADING *new at 13:25 (040)*; a bracket under ADC input, conversion and REFERENCE *at 12:00 this was one stage: ADC (070, 080, 090)* | D1·010's six-stage PATH against D1·090's nine |

**Labels, EN · FR** (as the Animation library's strings where they exist): quantity · *grandeur*; sensor · *capteur*;
loading · *charge*; conditioning · *conditionnement*; ADC input · *entrée du CAN*; conversion · *conversion*; REFERENCE ·
*RÉFÉRENCE* (capitalised, today's stage, as every PATH line writes its own); firmware · *micrologiciel*; number ·
*nombre*. Legend card: *not to scale*; *the stages of the path, as the course has built it*.

**Meet the parts** (B3): the blanks are the task, so nothing is introduced; the room has met every stage today.

**Values beside their element**: *2047* on the conversion's output (if F5); nothing else.

**Colours and their second channel** (C4):

| Thing | Ink | Second channel |
|---|---|---|
| Blank boxes, arrows | `contrast` | `outline` weight |
| A stage named | `contrast` text in its box | the text itself |
| REFERENCE named | `rose` text (the reference's colour, as card 5) | capitals and its side arrow into CONVERSION |
| *2047* (proposal) | `amber` | mono digits and its place on the arrow |
| *since 010* tags (proposal) | `contrast`, role `note` | words and a bracket |
| The presenter's ink | the ink tool's colour | it is drawn on the stage the room named; position carries it |

## 4. The run: step by step, as the Flow goes

### 4a. Steps

| # | id | Flow paragraph (first words) | What changes (`say`) | Presenter's control |
|---|---|---|---|---|
| 0 | `s0-blank-path` | p0 *"This morning we met the modulating sensor…"* held; then p1 `[[ask]]`, p2 `[[pause]]` (the checkpoint, §7a) | Nine blank stages: the path the 2047 travelled. Name them, one way each could spoil it, and mark your suspect. | (the slide opens); Ink, *Pin ink* on |
| 1 | `s1-quantity` | (the debrief, unscripted: *"First stage?"*) | QUANTITY: the temperature itself, what we meant to measure. | Next |
| 2 | `s2-sensor` | ″ | sensor: the thermistor turns temperature into resistance, given an excitation. | Next |
| 3 | `s3-loading` | ″ | loading: the divider is a source with an impedance, and whatever it drives loads it. | Next |
| 4 | `s4-conditioning` | ″ | conditioning: gain, offset and bias current, before the converter. | Next |
| 5 | `s5-adc-input` | ″ | ADC input: a switch and a capacitor that must charge in the window. | Next |
| 6 | `s6-conversion` | ″ | conversion: the voltage becomes one of 4,096 codes, truncated. | Next |
| 7 | `s7-reference` | ″ | REFERENCE: every code is a fraction of it; here, the rail. | Next |
| 8 | `s8-firmware` | ″ | firmware: it multiplies by what it assumes the reference is. | Next |
| 9 | `s9-number` | ″ | number: 2047, printed as 1.649 V, with nothing to say it is wrong. | Next; then the suspect inked |
| 10 | `s10-since-010` **Proposal** | p3 *"[[transition]] Today the quantity became a code…"* | Since 12:00 the path grew: loading, and the ADC split into its input, its conversion and its reference. | Next leads to Day 2 |

The lighting follows path order (the steps are fixed). If the room names a stage out of order, the presenter says *"we'll
come to it"* and lights it in its turn (F6). The `say` lines are for the strip and Study; the presenter takes the room's
words, not these.

### 4b. Motion, cues and stills

| # | Motion | Movers | Cue and its second channel | Hold | Reduced motion (C3) | Still |
|---|---|---|---|---|---|---|
| 0 | the nine blanks and arrows trace in (`enter: trace`), row 1 then row 2 | 1 | the trace | hold | whole | s0 (the blank path, a worksheet) |
| 1–9 | the stage's name fades in (`enter: fade`, once) | 1 | the name arriving in its box | hold | the name at once | s5 (half named), s9 (all named, with the ink) |
| 10 | the two tags fade in together (one linked fade) | 1 | words and bracket | hold | whole | s10 |

Four stills (s0, s5, s9, s10). Nothing flashes (B8). The ink is the presenter's hand, not animation.

## 5. Pacing and interaction, by surface and view

**Who paces** (B12): on the wall the presenter (steps and ink are mirrored); in Study Mode and Scope the learner, who also
writes the checkpoint.

| View | Who | Controls |
|---|---|---|
| Preview (in the slide) | everyone | Back · Next · *step n of 11* · *Open details* |
| View (details) | everyone | the step list with each `say`; zoom and pan (Study, Scope) |
| Edit (session only) | everyone; a student's own copy | not specified for the Draw Bench (M59); a learner's own mark is F6 |
| Authoring | authors | the drawing editor; the variant's steps |

- **The presenter's strip** (B20): the next stage's name and `say`; the checkpoint's progress (how many submitted); the
  teacher tip with the table of §7d; keys → ← and the ink tool's.
- **Study / Scope**: the checkpoint beside the blank path; the steps learner-paced after the checkpoint is submitted.
- **Phone** (C6): the two rows full width (each box ≥ 44 px tall), then the checkpoint; one finger does nothing on the
  drawing.
- **Locked**: s1–s10 wait until the checkpoint is closed (they would give away part 1).

## 6. The frame

| Tile / panel | Used? | Selected item | List / contents |
|---|---|---|---|
| Steps | yes | the current step's `say` | eleven steps; *Stills* |
| Ink | yes | — | laser, ink, *Pin ink*, clear |
| Zoom | Study, Scope | *Whole* / % | Fit, −, + |

Identity bar: *Back to the sensor · ● Holding · step n of 11*; *Checkpoint open* while it runs. Legend card: *not to
scale*.

## 7. Thinking, not watching

- **7a. The PLAN's ASK** (verbatim): *checkpoint (at the Flow's [[ask]]) — "Back to 2047": 1 name every stage it passed
  through · 2 for each, one way it could have spoiled the number · 3 mark the one you now suspect · 4 compare with your
  list from 010. · depth: understand · practice: arguing from evidence.* It fires at p1, **at s0**, over the blank path;
  the debrief s1–s9 follows its close.
- **7b. Prediction point**: none added; part 3 is the room's own claim, and D1·070 has already given the evidence (S31).
- **7c. After**: in Study, done means the checkpoint submitted. Nothing renders a verdict (B10): the room's suspects are
  inked as said.
- **7d. Teacher tip** — **Proposal** (F5), presenter only, never on the wall:
  *Expect "the reference", today's stage. Ask: how far off would it have to be? To read the pin's 1.79 V as 2047 the
  reference would have to be about 3.59 V, 8.6 % high; a 3.3 V regulator is off by a percent or two. The evidence is
  D1·070's: a 100 kΩ/100 kΩ divider, 50 kΩ behind the ADC input's 1 kΩ and 10 pF, only 2.53 time constants in a 1.29 µs
  window, so 2047 where the settled pin gives 2224 (S31). LOADING and ADC INPUT together are the right suspect; either
  alone is close.* One way each stage can spoil the number, from the day (for the debrief):

  | Stage | One way it spoils the number | Where |
  |---|---|---|
  | quantity | the measurand ill-defined: which temperature, of what, when | D1·020 |
  | sensor | self-heating from its excitation, ≈ 0.14 °C at 3.3 V; a damaged part reading low | D1·030 |
  | loading | whatever the divider drives draws current through its source impedance | D1·040 |
  | conditioning | an offset multiplied by the gain; bias current through the source | D1·060 |
  | ADC input | the sampling capacitor not settled in the window: 2047 for 2224 | D1·070 |
  | conversion | the floor of one LSB (0.806 mV), truncation; INL and DNL | D1·080 |
  | REFERENCE | the rail sags 3.30 → 3.20 V and the code rises 2048 → 2112 | D1·090 card 3 |
  | firmware | it multiplies by 3.3 V while the rail is 3.28 V: about 0.6 % | D1·090 card 3's FAULT |
  | number | printed to more digits than it has earned (1.649 V) | D1·010 |

- **7e. Explore**: none.

## 8. Faithfulness (the quality bar)

**Numbers the presenter may say** (Node, 2026-10-20; the course's models):
- D1·010: the sensor's 3.585 V into two 100 kΩ: the pin at **1.7925 V** (*"1.79 V"* ✓); 1.7925/3.3·4096 = **2224.87**, the
  truth pane's *"≈ 2225"*, settled and truncated **2224** ✓ (D1·010's note); 2047 is 8.0 % below 2225 ✓.
- D1·070: τ = (1 kΩ + 50 kΩ) × 10 pF = **510 ns**; 1.29 µs / 510 ns = **2.53 τ** ✓ (D1·070's *"2.53 τ … code 2047 where the
  ideal is 2224"*).
- The reference that would explain 2047 alone: ⌊1.7925/V_ref·4096⌋ = 2047 needs **3.585 < V_ref ≤ 3.587 V**, **8.6 %**
  above 3.3 V.
- Card 3: 1.65/3.20·4096 = **2112** ✓; card 3's FAULT 3.30/3.28 − 1 = **0.61 %** ✓. D1·030: self-heating at 3.3 V,
  (1.65 V)²/10 kΩ × 500 °C/W = **0.136 °C** ✓ (*"≈ 0.14 °C"*). D1·080: 3.3/4096 = **0.806 mV** ✓.

**Section D, Draw rows**
- [x] Proportions: a block diagram, *not to scale* on the legend card.
- [x] Line types: `outline` for boxes and arrows; role `note` for the tags.
- [x] Curves: none.
- [x] Every `say` matches its stage as the course taught it (§7d's sources).
- [x] Numbers on the drawing: *2047* only (if F5).

**A1–A8**: A1 ✓ (above); A2 n/a (no behaviour drawn); A3 ✓ (the reference's 3.585–3.587 V window computed exactly); A4 ✓
(S30 against D1·010's checkpoint and *"At five o'clock we come back to 2047"*: the card is at 17:00 ✓; S9 against D1·030's
seed *"It comes back at the end of today, when we meet the reference voltage"* ✓; the suspect against D1·070's S31 ✓; one
finding, F4, on *"this morning"*); A5 ✓ with F2 (REFERENCE feeds the conversion, it is not a stage the code passes through
afterwards); A6 ✓ (*not to scale*); A7 ✓ (the course's own modules, §7d); A8 ✓.

## 9. Faults and non-ideal behaviour

**PLAN FAULT**: none on this card. The faults of the day are the checkpoint's part 2 (§7d's table, for the presenter).

## 10. Accessibility, legibility and print

- Wall (C2): nine labels at the wall's floor. In one row of 1600 units each box would be ≈ 160 units wide and
  *conditioning* at 32 pt does not fit; two rows (5 + 4, F3) give ≈ 270-unit boxes. Check at 1920 × 1080 and 1024 × 768;
  boxes tall enough to be inked from the back row (≥ 1/8 of the Canvas, as D1·010 card 7).
- Reduced motion (C3): each step lands whole.
- Colour (C4): position and words carry everything; REFERENCE also by capitals and its side arrow.
- Keyboard (C5): → ←; the ink keys.
- Print (C8): the blank path as a worksheet; the named path with each `say`.
- Languages: labels and `say` lines `{en, fr}` (FR drafts ours, for review).

## 11. Assets to make or source

| Asset | Format | Made by | Status |
|---|---|---|---|
| `course-path.benchdrawing`, the master (D1-010-05 §3a), with the stage lane's D1·090 items (`*-loading`, `*-adc-input`, `*-conversion`, `*-reference`) | Draw library | the Benches lane | **to request by crossing** (F1); not built |
| `course-path-090-checkpoint.benchdrawing`, this variant: layers `stage-blanks`, `stages`, `stage-arrows` (+ `tag-2047`, `since-010`), eleven steps | Draw library (variant) | the Benches lane | to request, with the master |
| The stand-in still (§13) | SVG, rendered from §3a's layout | this project (a preview) | to render if the build is late |

## 12. Bench capabilities this needs

- **Draw Bench** (M59): traces, `enter: fade`, steps with `say`, mirrored — **exists**. The fence's `steps:` / `layers:`
  / `focus:` (one master, no copied variants; `requests-to-exsight.md` X2) — **missing**, already requested; until then the
  variant file.
- **Ink** (M07-c): the presenter's ink and laser, mirrored, *Pin ink* — **exists**.
- **Checkpoint**: part 4 (*"compare with your list from 010"*) needs the learner's D1·010 answers shown again at D1·090 —
  **to confirm** in Studio's `checkpoint` activity (Studio's, routed by the owner; D1·010 card 7 §12 asked the same); if
  not, the learners compare with the list they kept on paper.
- **Missing, would help** (F6): (a) a Draw item the presenter lights **in any order** by clicking it on their window,
  mirrored (the stages lit exactly as called); (b) a **suspect mark** the presenter (or a learner, in their own copy)
  places on a stage, kept in the drawing's state and shown to devices and Study. Today: path-order steps and pinned ink.
- **Not this bench's**: the Animation Bench's `measurement-path` v0.4.2 (D1·020 card 1) is not used (F1 (b)).

**For the Benches lane (the crossing F1 asks for)**: build the course path master as `D1-010-05-measurement-path.md`
§3a–§3c designs it, so every card that names it (D1·010 cards 4–7, D1·020 card 7, D1·030 cards 1 and 9, D1·040 card 1,
D1·060 card 2, and this card) loads one drawing; the stage lane at D1·090's nine stages in two rows with REFERENCE as a
side input to CONVERSION (F2, F3); this card's variant with its eleven steps (§4a), EN and FR; stills in `shots/`. Values
and sources: §3a, §8. Stand-in until it lands: §13. Needed by D1·090's next run.

## 13. Stand-in for the lecture

Until the master is built: **a still of §3a's nine blank stages** (rendered here as a preview SVG, shown on the Figure
Bench), and the presenter **writes each name and the suspect in ink** as the room calls them (M07-c, pinned).

- **It shows**: s0 (the blank path) and the debrief's content; the suspect marked.
- **It loses**: the clean, legible names (handwriting instead), the stills of s5, s9 and s10, the print of the named path,
  the `say` in Study. Checks lost: B4 partly, B5, C8 for the named path.
- **The Flow**: unchanged.
- The still is drawn from the master's layout, so nothing is designed twice; the build replaces it.

## 14. Findings for the owner

- **F1 — The course path library is not built.** D4 reuses *"D1·010 card 5's course path"*: that is the Draw library
  `course-path`, designed in `D1-010-05-measurement-path.md` §3a–§3c and decided on 2026-10-08, but no file of it exists
  (only renders); the REFERENCE stage is in its growth plan, not drawn. Options: (a) ask the Benches lane by crossing to
  build the master as designed, with D1·090's nine-stage lane and this card's variant (**recommended**: D4's reuse, one
  path drawing for every card that names it); (b) extend the built Animation library `measurement-path` (v0.4.2, D1·020
  card 1: six chevron stages, one lit) to nine stages, a lit-set and a blank state (a second path drawing in the course,
  against `reuse-done-scenes`); (c) the stand-in still and ink only (§13).
- **F2 — Proposal: REFERENCE drawn as a side input to CONVERSION.** The PATH line writes it in series, *conversion →
  [REFERENCE] → firmware*; drawn that way the code would seem to pass through the reference after it is made. The
  reference acts on the conversion (every code is a fraction of it). Options: (a) REFERENCE beside CONVERSION, its arrow
  into it, the chain conversion → firmware (**recommended**: physically right, the PATH's order kept left to right); (b)
  in series, as the PATH line writes it; (c) REFERENCE as a sub-box inside CONVERSION.
- **F3 — Proposal: the stage lane in two rows, without the forms lane.** Nine labels in one row of 1600 units miss the
  wall's floor. Options: (a) two rows (5 + 4), stages only (**recommended**); (b) one row on a full-width Canvas, the forms
  lane thin beneath (as D1·010 card 7); (c) one row at the Canvas's width, labels abbreviated (*cond.*, *ADC in*).
- **F4 (accuracy; proposed D1·090-F8) — "This morning".** The statement (*"from this morning"*), p0 (*"This morning we met
  the modulating sensor"*) and the S9 HARVEST (*"This morning we chose the excitation for sensitivity"*) place D1·030 in
  the morning; the schedule (`course-organization.md`, all times GMT) has Day 1 start at 12:00, D1·030 at 12:45–13:10 and
  this module at 17:00, which is why S30 says *"At five o'clock we come back to 2047"*. Both cannot be true for one room.
  Options: (a) *"earlier today"*: the statement *"…from earlier today, and the converter's reference…"*, p0 *"Earlier today
  we met the modulating sensor…"*, S9 *"Earlier today we chose the excitation for sensitivity…"* (**recommended**: true in
  any time zone); (b) *"this afternoon"* / *"at lunchtime"* (true in GMT only); (c) keep (only if the room's local clock is
  morning, and then S30's *"five o'clock"* must change). The same words are in D1·090 card 2's S30 HARVEST (*"Our 2047 from
  this morning…"*, decided F5) and may be elsewhere on Day 1: to sweep.
- **F5 — Proposals**: the *2047* tag on the conversion's output (as D1·010 card 7's F4); s10, the stages added since 12:00
  tagged for part 4 (+0 min: under p3); the teacher tip and its table (§7d); REFERENCE in rose.
- **F6 — Lighting in any order, and a kept suspect mark** (§12): would help; today the stages light in path order and the
  suspect is pinned ink. Options: (a) path order and ink (**recommended** for now: both exist); (b) also ask the Benches
  lane for the click-to-light item and the suspect mark (a second crossing, Draw Bench features); (c) ink for both, no
  steps.
- **F7 — The card's time, 4.6 min** (the brief said ≈ 3.8): the debrief D4 needs adds ≈ 1.0. The module still runs ≈ 13 min
  short (`D1-090-05-ratiometric.md` §2b). Reported only.

**Decided 2026-10-20 (owner: *"apply all recommendations"* on the U018 brief):** **D4** — card 6 reuses D1·010 card 5's
course path unchanged; the stages light as the room names them and the presenter marks the suspect (this spec: the master
`course-path` as designed, its D1·090 stage items from §3c's plan, steps and ink); **F6** (ACCURACY D1·090-F6, applied) —
p0 ends *"…Make them the same voltage, and the reference's error, sag and drift included, stops mattering for that
sensor."*, re-checked here (A6: it is limited to the ratiometric sensor ✓). F1–F7 above are new and **open**; F4 is an
**accuracy** finding.

## 15. Acceptance: how we know it is built right

- s0 shows nine blank boxes in two rows with REFERENCE feeding CONVERSION; s1–s9 each fade one name into its box in path
  order; s10 tags LOADING and the ADC's three stages; on the wall, the presenter's window and Study.
- The checkpoint's four parts open on Scope at p1 with the blank path beside them; s1 waits for its close.
- The presenter's ink lands on the wall (M07-c) and stays pinned until the card is left.
- B1 one name per press; B2 only the new name changes; B4 four stills; B5 each `say` on the strip; B10 no verdict on the
  room's suspects; B12 the wall's strip not operable; B13 names only on the drawing; B20 the tip and table on the strip.
- C2 every label at the floor at 1920 × 1080 and 1024 × 768, boxes inkable; C3 whole; C4 position and words; C5 → ←; C6 at
  320; C8 the worksheet and the named path.
- The master's ids as §3a, so later variants reuse them; E1–E6 for the drawing as presented, both themes, EN and FR.
- **Six gates (this spec)**: (1) realism: the course's chain as a labelled block diagram, *not to scale* ✓; (2) science:
  REFERENCE where it acts (F2), each stage's way to spoil the number from the module that taught it ✓; (3) maths: the
  presenter's numbers recomputed (§8) ✓; (4) visualization: the room's path built as named, the suspect on its stage, the
  growth since 12:00 tagged ✓ (stand-in partial); (5) consistency: the PATH lines' names and order, D1·070's cause, S30's
  five o'clock; *"this morning"* raised (F4, **accuracy, open**) ✓; (6) design: two rows for legibility (F3), EN and FR ✓ on
  paper.
