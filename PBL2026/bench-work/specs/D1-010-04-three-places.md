```yaml
id: D1-010-04-three-places
card: "Three places the information can be spoiled"
module: notes/Day01/010-mcu-reads-2047/en.md
bench: Draw                       # the target, and it exists (M59): a picture built up step by step
library: "course-path (the course path drawing, `D1-010-05-measurement-path.md` §3a), played here as its variant `eye-over-path.benchdrawing`: layers `eye`, `stages`, `brackets`, `spoiled`"
dimensions: 2D
stand_in: none                    # every step plays on the wall today (§12)
optional_benches: [Animation]     # the eye spec's proposal F5: the three faults on the eye itself first (§14 F2)
real_thing: "the eye and visual pathway (as toured on card 3) over a temperature measurement chain's stages; a schematic, labelled not to scale"
minutes: 2.1                      # on the bench: the drawing is up for the whole card
card_minutes: 2.1
status: spec-ready                # decided 2026-10-08; F2–F3 open
learner_action: none
predictions: []
seeds: [S3]                       # planted at s8
key_variable: "which of the three places is marked: organ ↔ sensor, pathway ↔ conditioning & wiring, processor ↔ ADC & firmware"
time_scale: "none (traces only)"
steps: 9                          # s0–s8
```

Reuses the course path library designed in `D1-010-05-measurement-path.md` §3a (its `stages` lane, and
the `eye`, `brackets` and `spoiled` layers this card adds to it). This card comes **before** card 5 builds
the forms, so it shows the stage lane only: the room meets the stages here and the forms next.

## 1. What the room must understand

- **Statement** (verbatim): *A defect in the sense organ, in the pathway, or in the processor each changes
  what we perceive. The same three places exist in every electronic measurement.*
- **SHOW** (verbatim from the PLAN): *Draw — the eye's three stages drawn left to right; the measurement
  path drawn beneath them; three brackets dropped over both rows: sensor | conditioning & wiring | ADC &
  firmware, each taking a "spoiled here" mark as the Flow names it.*
- **Drive** (verbatim): *one step per Flow paragraph (organ, pathway, processor), then the electronic
  row.*
- **Look for** (verbatim): *the two rows lining up bracket for bracket.*
- **Status** (verbatim): *needs Draw: eye-over-path three-stage drawing (built on the course path
  drawing).*
- **Bench and library.** The **bench** is the Draw Bench. The **library** is the course path drawing,
  loaded as the variant `eye-over-path`.
- **Insight**: *information can be spoiled in three places, in the eye and in an electronic measurement
  alike: where it is sensed, on its way, and where it is processed.*
- **Kind of knowledge**: *a picture built up*, ending in *a relation between two representations* (the
  eye's row and the measurement's row). Card test → **Draw**. **B17 applies**: both rows visible at once,
  linked by the brackets. B15 applies: each row is met alone before the brackets join them.
- **Why this bench, not a still**: the marks arrive one per paragraph as the Flow names each place, and
  the second row arrives only after the first is understood; a still shows six marks at once.
- **Key variable**: the marked place.

## 2. Time

The Flow is 227 words, all spoken: **1.75 min**.

| Beat | Minutes | Source of the number |
|---|---|---|
| s0 the eye row: Flow p0 *"Three things matter here…"* (20) | 0.15 | 20 ÷ 130 |
| s1 organ: p1 *"Ignoring for the moment…"* (40) | 0.31 | 40 ÷ 130 |
| s2 pathway: p2 *"The transmission pathway…"* (35) | 0.27 | 35 ÷ 130 |
| s3 processor: p3 *"Finally, the processing system…"* (32) | 0.25 | 32 ÷ 130 |
| s4 the electronic row and the brackets: p4 *"Although these are biological processes…"* (25) | 0.19 | 25 ÷ 130 |
| s5–s7 one mark per sentence of p5 *"A problem with the sensing element…"* (12 + 15 + 14 = 41) | 0.32 | 41 ÷ 130 |
| s8 held: p6 *"The same general idea…"* (27), p7 (7), and SEED S3 (30 words) | 0.49 | 64 ÷ 130 |
| Waiting on traces not covered by speech (9 steps, ≈ 0.7 s each) | 0.10 | estimate |
| **Card total / of which on the bench** | **2.1 / 2.1** | |

**Module check**: D1·010 overruns by ≈ 5.7 min (`D1-010-01-confidently-wrong.md` §2). This card adds
0.33 min to its Flow (the SEED and the traces).

## 3. The scene: what is on the bench

**Parts** (layers of the course path library, §3a of the card-5 spec; ids stable):

| id | Item | Drawn as | Source |
|---|---|---|---|
| `e-object` | The jar of sugar from card 3, *the thing seen* | line art, the jar's outline and *SUGAR* label | card 3's scene (`D1-010-03-eye-to-brain.md` §3) |
| `e-eye` | The eye in section: cornea, lens, retina; label *organ* | line art **to its own scale**: globe 24.2 mm, cornea radius 7.8 mm, lens 4.0 mm thick (the Le Grand eye of card 3's spec) | `bench-work/research/04-eye-anatomy-optics-sources.md` |
| `e-nerve` | Optic nerve and pathway, a bundle of lines; label *pathway* | `outline`, schematic | card 3's spec §3 |
| `e-brain` | The brain's outline from the side, the visual cortex marked at the back; label *processor* | `outline` and a `faint` fill on V1; schematic | card 3's spec §3 |
| `e-seen` | *What we see*: the jar, in a frame | line art | — |
| `s-quantity` … `s-number` | The stage lane: QUANTITY → SENSOR → CONDITIONING → ADC → FIRMWARE → NUMBER | six boxes and arrows, aligned under the eye row | the module's PATH comment |
| `k-organ`, `k-pathway`, `k-processor` | Three brackets spanning both rows, labelled *sensor* · *conditioning & wiring* · *ADC & firmware* (the PLAN's words) | `thin` brackets with `label` text | PLAN |
| `x-organ`, `x-pathway`, `x-processor` | *Spoiled here* on the eye row | a neutral card, ⚠ and the words; **never red** | PLAN; the eye spec's colour table |
| `x-sensor`, `x-wiring`, `x-converter` | *Spoiled here* on the electronic row | the same | PLAN |

The rows line up bracket for bracket: QUANTITY under the jar (outside every bracket: the environment the
Flow sets aside in p1); SENSOR under the eye; CONDITIONING, and the wires either side of it, under the
nerve; ADC and FIRMWARE under the brain; NUMBER under *what we see*.

**Meet the parts** (B3): s0 draws the eye row with its three labels (*organ · pathway · processor*); the
electronic row is met at s4, alone, before the brackets join them.

**Values beside their element**: none (no numbers on this card).

**Labels** (B14): on their items; nothing moves, so none needs a badge.

**Colours and their second channel** (C4):

| Thing | Ink | Second channel |
|---|---|---|
| Eye row, stage lane | `contrast` | — |
| The visual cortex | `contrast` at `faint` tint | its label |
| Brackets | `teal` | `thin` bracket shape and its words |
| *Spoiled here* | `contrast` on a neutral card | ⚠ and the words; never red |
| s8: the three brackets lit | `amber` | thicker and the overlay's words |

## 4. The run: step by step, as the Flow goes

### 4a. Steps

| # | id | Flow paragraph (first words) | What changes: the step's one sentence (`say`) | Overlay | Presenter's control |
|---|---|---|---|---|---|
| 0 | `s0-eye-row` | p0 *"Three things matter here…"* | The eye's three stages, left to right: the organ that senses, the pathway that carries, the processor that interprets. | — | Next appears the bench |
| 1 | `s1-organ` | p1 *"Ignoring for the moment…"* | A defect in the sense organ spoils the information before it leaves the eye. | — | Next |
| 2 | `s2-pathway` | p2 *"The transmission pathway…"* | A problem on the pathway spoils what reaches the brain. | — | Next |
| 3 | `s3-processor` | p3 *"Finally, the processing system…"* | A problem in the processor spoils how the information is interpreted. | — | Next |
| 4 | `s4-path-row` | p4 *"Although these are biological processes…"* | The measurement path beneath, and three brackets joining the rows: sensor, conditioning and wiring, ADC and firmware. | — | Next |
| 5 | `s5-sensor` | p5, sentence 1 *"A problem with the sensing element…"* | A problem in the sensor spoils the information we obtain. | — | Next |
| 6 | `s6-wiring` | p5, sentence 2 *"A problem in the path…"* | A problem in the conditioning or the wiring spoils what reaches the converter. | — | Next |
| 7 | `s7-converter` | p5, sentence 3 *"And a problem in the processing stage…"* | A problem in the converter or the firmware spoils the result. | — | Next |
| 8 | `s8-three-places` | p6 *"The same general idea…"*, p7, SEED S3 | Three places, in both rows: every error in this course lives in one of them. | *organ · pathway · processor* | Next leads to card 5 |

### 4b. Motion, cues and stills per step

| # | Motion (Draw entries) | Movers | Cue and its second channel | Hold | Reduced motion | Still |
|---|---|---|---|---|---|---|
| 0 | the eye row traces left to right, in layer order | 1 | the trace leads from the jar to *what we see* | hold | whole | the eye row |
| 1–3 | the step's *Spoiled here* card fades in on its stage | 1 | the card arrives on the stage the Flow names | hold | whole | (s3) the eye row with three marks |
| 4 | the stage lane traces; then the three brackets trace downward over both rows | 1, then 1 | the brackets' trace joins the rows (B6: the cue travels from the eye's stage to its twin) | hold | whole | both rows, bracketed |
| 5–7 | the step's *Spoiled here* card fades in on the electronic stage | 1 | under the matching eye mark, inside the same bracket | hold | whole | (s7) both rows, six marks |
| 8 | the three brackets fade to `amber` (a second, amber copy fades in over each) | 1 (one linked fade) | the brackets and the overlay | hold | whole | the finished drawing |

Stills in the strip: **s0, s3, s4, s7, s8** (five, B4). Nothing flashes (B8).

## 5. Pacing and interaction, by surface and view

As card 5 (`D1-010-05-measurement-path.md` §5): presenter paces on the wall; Preview Back · Next · *step n
of 9* · Replay; View the step list and zoom (Study, Scope); Edit ink, hide or fade an item, a note
(session only; not yet specified for the Draw Bench); Authoring the editor and the steps in the file.
Phone: the two rows stack naturally (one above the other) and read at 320 px if the eye row's line art
stays simple; one finger does nothing, two pinch and pan. **Locked**: none.

## 6. The frame

As card 5's §6: Steps (selected item: the current `say`), Ink, Zoom. Identity bar: *Three places the
information can be spoiled · ● Holding · step n of 9*. Legend card: *schematic: the eye to its own
scale, the rest not to scale*; *⚠ Spoiled here: a place where information can be spoiled*.

## 7. Thinking, not watching

- **7a. The PLAN's ASK**: *none on this card.*
- **7b. Prediction point** — **Proposal** (F3): before s5, *"Under which bracket would a loose wire
  between the sensor and the board sit?"* (sensor · conditioning & wiring · ADC & firmware); answer:
  *conditioning & wiring*. A `poe` block before the card, or asked aloud; +0.5 min. It rehearses
  tomorrow's lab (S3's harvest: *"tomorrow, in the lab, you'll say which"*).
- **7c. After**: card 7's checkpoint (*mark where you suspect the 8 % came from*) uses these three places.
- **7d. Teacher tip** — **Proposal** (F3): *Learners put every error in the sensor. Ask: if the sensor is
  perfect, can the number still be wrong?* (Yes: card 1's circuit has no sensor error at all.)
- **7e. Explore**: none.

## 8. Faithfulness (the quality bar)

**Section D, Draw rows**
- [x] Proportions: the eye in section to its own scale from the eye spec's cited numbers (24.2 mm globe,
  cornea R 7.8 mm, lens 4.0 mm, `research/04`); the pathway and brain schematic; the legend says so.
- [x] Line types: `outline` for the stages and the eye; `thin` for brackets; no construction left after
  s8.
- [x] Curves from equations: the eye's cornea, globe and lens surfaces as circle arcs of their cited
  radii (`function` shapes or arcs converted to cubic segments by M59's `toPath`), not by hand.
- [x] Every step's `say` matches its Flow paragraph or sentence (§4a).
- [x] Numbers on the drawing: none.

**Mechanism**: the three places and their examples are card 3's, with its sources (the eye spec's [S50]–
[S54]: cataract, optic nerve damage, visual agnosia), so nothing new is claimed here.

**A1–A8**: A1 ✓; A2 n/a (the card names where faults enter; card 1 and later modules show them); A3 ✓
(scale stated); A4, A5 n/a; A6 ✓ (*schematic: the eye to its own scale, the rest not to scale*); A7 ✓
(the eye row uses card 3's parts and words; the brackets use the PLAN's words; see F1 on the mapping); A8 ✓.

## 9. Faults and non-ideal behaviour

**PLAN FAULT**: none on this card. **Proposal** (the eye spec's F5): the three faults on the eye itself,
shown on the Animation Bench just before this drawing (a cloudy lens, a damaged nerve, *seen but not
recognised*), so the room has seen each fault before the drawing names its place (§14 F2).

## 10. Accessibility, legibility and print

- Wall (C2): labels at the wall's floor (compiler warnings clean); the eye's line art at ≥ 2 device px
  strokes at 1024 × 768. **Check when drawn.**
- Reduced motion (C3): every step lands whole.
- Colour (C4): marks are words and a glyph; brackets are a shape with words; s8's amber is also thicker.
- Keyboard (C5): → ← R.
- Print (C8): five stills with their `say`.

## 11. Assets to make or source

| Asset | Format | Made by | Status |
|---|---|---|---|
| The `eye`, `brackets`, `spoiled` layers in `course-path.benchdrawing` | Draw library (master) | the author | to make for Saturday |
| `eye-over-path.benchdrawing`, the variant with nine steps | Draw library | the author | to make for Saturday |
| The eye's line art in section | redrawn from the eye prototype's geometry (`bench-work/prototypes/eye-to-brain/src/anatomy.js`) as SVG, imported (M59b) | the author | to make |

## 12. Bench capabilities this needs

**Draw Bench**: **exists**: traces and `enter: fade` on the wall (M59d), steps and `say`, zoom (M59e-iii),
SVG import (M59b). **Missing (request it)**: the fence's `steps:` / `layers:` (see card 5, F7): this
card is the first variant of the master. **Not this bench's**: the faults happening to the eye (motion
through stages) are the Animation Bench's (F2).

## 13. Stand-in for the lecture

None needed: the Draw Bench plays all nine steps today.

## 14. Findings for the owner

**Owner, 2026-10-08: "go with your recommendations".** Decided: F1 (no change), F4 (keep as specified:
the stage lane is met here). Still open: F2 (the eye spec's F5) and F3 (proposals).

- **F1 — The brackets' mapping.** The PLAN pairs pathway ↔ *conditioning & wiring* and processor ↔ *ADC
  & firmware*. Card 3's ANALOGY maps the eye the same way (*organ → sensor, optic nerve → conditioning
  and wiring, cortex → converter and firmware*), so the two cards agree. QUANTITY and NUMBER stay outside
  the brackets (the Flow's p1 sets the environment aside). No change; noted so the drawing and card 3
  agree.
- **F2 — The eye spec's F5 (still open).** Options there: (a) this drawing only (the PLAN as written);
  (b) the eye's three faults on the Animation Bench first, then this drawing (+≈ 0.5 min); (c) the faults
  only. This spec works for (a) and (b) unchanged.
- **F3 — Proposals**: the prediction before s5 (§7b, +0.5 min) and the teacher tip (§7d).
- **F4 — Natural order.** The room meets the stage lane here (card 4) and the chain of forms on card 5.
  The stage names (*sensor*, *conditioning*, *ADC*, *firmware*) appear on the wall before card 5 explains
  the path. It reads naturally (the eye leads into the stages), but the owner may prefer card 4 to show
  only the three brackets' words, with the stage boxes arriving on card 5. Keep as specified?

## 15. Acceptance: how we know it is built right

- The nine steps of §4a play on the wall, the presenter's window and Study Mode in order, each holding;
  the `say` lines exactly as §4a; the rows aligned bracket for bracket as §3 (jar over QUANTITY, eye over
  SENSOR, nerve over CONDITIONING, brain over ADC + FIRMWARE, *what we see* over NUMBER).
- B1 one place per press; B2 only the new row, bracket or mark draws; B3 the eye row met alone (s0),
  the electronic row alone (s4) before the marks; B4 five stills; B5 each `say` on the strip and read in
  Scope; B6 the brackets' trace joins each eye stage to its twin; B8 nothing blinks; B12 the wall's strip
  not operable; B13 no Flow text on the drawing; B14 labels on their items; B15 each row alone, then
  together; B17 both rows visible from s4 on; B20 the next `say` and the tip on the strip.
- C2 labels and strokes at the floor at 1920 × 1080 and 1024 × 768 (compiler warnings clean); C3 each step
  whole; C4 readable in greyscale (marks are words, brackets are shapes); C5 → ← R; C6 walked at 320, 768,
  1200, 1440, 1920; C7 a step to first frame < 100 ms; C8 the stills with their `say`.
- The variant's layers and ids are the master's (card 5's §3a), so later modules reuse them.
- E1–E6 for the drawing as presented; checked on the lecture laptop before Saturday, both themes.
