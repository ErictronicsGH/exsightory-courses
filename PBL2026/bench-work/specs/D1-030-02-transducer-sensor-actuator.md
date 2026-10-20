```yaml
id: D1-030-02-transducer-sensor-actuator
card: "Transducer, sensor, actuator"
module: notes/Day01/030-sensing/en.md
bench: Draw                       # the target, and it exists (M59)
library: "transducer-data-flow.benchdrawing (new): our own redraw of the idea in transcripts/image-3.png, simplified to one line; never a copy of the figure"
dimensions: 2D
stand_in: none                    # every step plays on the wall today
optional_benches: []
real_thing: "the functions and data flow of a measurement and control system: a sensor and an actuator at the physical interface of an electronic system (the source figure, transcripts/image-3.png, its 'Figure 1.1'); a block diagram, not to scale"
minutes: 1.6                      # on the bench: the drawing is up for the whole card
card_minutes: 1.6
status: spec-draft
learner_action: none
predictions: []
seeds: []
key_variable: "which side of the electronic system a transducer sits on: input (physical in, electrical out) or output (electrical in, physical out)"
time_scale: "none (traces only)"
steps: 5                          # s0–s4
```

## 1. What the room must understand

- **Statement** (verbatim): *A transducer carries information from one physical domain into another. A
  sensor is an input transducer: physical in, electrical out. An actuator goes the other way.*
- **SHOW** (verbatim from the PLAN): *Draw — input transducer → electronics → output transducer, a sensor
  and an actuator labelled, the data flowing left to right. A redraw of transcripts/image-3.png ("Figure 1.1
  Functions and data flow in a measurement and control system", a textbook figure: redraw it for the
  course, do not reproduce it).*
- **Drive** (verbatim): *the sensor, then the electronics, then the actuator.*
- **Status** (verbatim): *needs Draw: the transducer data-flow drawing (redraw of image-3.png).*
- **Look for**: *none in the PLAN.* Proposed (F5): *both transducers sit on a boundary between the physical
  world and the electronic system; they differ only in which way they cross it.*
- **Bench and library.** The **bench** is the Draw Bench. The **library** is a new drawing,
  `transducer-data-flow`.
- **Insight**: *a sensor and an actuator are the same kind of thing, a transducer at the edge of the
  electronic system, facing opposite ways: one brings information in, the other sends an effect out.*
- **Kind of knowledge**: *a picture built up* (a chain left to right). Card test → **Draw**. B15 does not
  apply (one chain); B17: the two transducers are a contrast, and both are visible together from s3; B18,
  B19 do not apply.
- **Why this bench, not a still**: the Drive puts the three blocks on in the Flow's order, and the data's
  trace runs left to right at s4, so the direction (the whole difference between the two) is seen moving,
  not inferred from arrowheads.
- **Key variable**: the side a transducer sits on, and the direction it crosses.

### What the source figure has and this drawing keeps

`transcripts/image-3.png` is a loop of eleven blocks: *System, plant or process* → Sensor → Signal
conditioning → Data transmission → Display, Alarms, Controller, Supervisor → Orders transmission → Signal
conditioning → Actuator → back to the process, with *Interference* and *Objectives* coming in. The PLAN
asks for one idea from it, the caption's: *sensors and actuators are transducers at the physical interface
between electronic systems and processes*. This drawing keeps that idea and its left-to-right data flow,
folds the middle seven blocks into one ELECTRONICS block, and draws the interface as two domain boundaries
the transducers straddle. Our own layout, shapes and words: nothing is traced from the figure (F1).

## 2. Time

The card's Flow is 179 words, all spoken: **1.38 min**.

| Beat | Minutes | Source of the number |
|---|---|---|
| s0 the two worlds: Flow p0 *"A device that converts information…"* (51) | 0.39 | 51 ÷ 130 |
| s1 the sensor: p1 *"Based on the direction of conversion…"* (16), p2 *"Input transducers convert…"* (27) | 0.33 | 43 ÷ 130 |
| s2 the electronics: the presenter's line (≈ 15 words, unscripted: *"In between, the electronics: conditioning, conversion, processing, all of it electrical."*) | 0.12 | estimate, 15 ÷ 130 |
| s3 the actuator: p3 *"Output transducers convert…"* (21) | 0.16 | 21 ÷ 130 |
| s4 the roles: p4 *"Sensors are mainly intended…"* (25); held for p5 *"Sensor and transducer are sometimes used interchangeably…"* (39) | 0.49 | 64 ÷ 130 |
| Waiting on traces not covered by speech (5 steps, ≈ 1 s each) | 0.08 | estimate |
| **Card total / of which on the bench** | **1.6 / 1.6** | |

**Module check**: D1·030's table is in `D1-030-01-electricity-only.md` §2 (23.4 of 25 min).

## 3. The scene: what is on the bench

Artboard **1600 × 640** drawing units (wide, one line). Inks from the Draw palette (D12.15), never hex. Layout
as rendered in `bench-work/previews/d1-030-02-transducers.svg`.

| Layer | id | Item | Drawn as | Where |
|---|---|---|---|---|
| `worlds` | `w-left`, `w-mid`, `w-right` | *PHYSICAL WORLD* · *ELECTRONIC SYSTEM* · *PHYSICAL WORLD* | role `label`, `contrast` at `faint` | y = 60, over x = 215, 800, 1385 |
| `worlds` | `bd-in`, `bd-out` | the two domain boundaries | `hidden` (dashed), `thin`, broken where the transducers and their labels sit (y 80–190 and 500–570) | x = 430 and x = 1170 |
| `chain` | `q-in` | *physical quantity* | role `label` | x = 140, y = 300 |
| `chain` | `t-sensor` | box *SENSOR*, 220 × 120, **straddling `bd-in`** | `outline`, `teal` | centre (430, 300) |
| `chain` | `t-sensor-kind` | *input transducer* | role `note`, `teal` | over the box, y = 220 |
| `chain` | `elec` | box *ELECTRONICS* with *condition · convert · process · decide* | `outline`, `contrast` | 320 × 160, centre (800, 300) |
| `chain` | `t-actuator` | box *ACTUATOR*, 220 × 120, **straddling `bd-out`** | `outline`, `amber` | centre (1170, 300) |
| `chain` | `t-actuator-kind` | *output transducer* | role `note`, `amber` | y = 220 |
| `chain` | `q-out` | *physical effect* | role `label` | x = 1475 |
| `flow` | `f1`–`f4` | the four arrows, quantity → sensor → electronics → actuator → effect | `outline`, `arrow` end; `f2`, `f3` (electrical) in `teal`, `f1`, `f4` (physical) in `contrast` | y = 300 |
| `flow` | `f-say` | *electrical signals* | role `note`, `teal` | over the middle, y = 193 |
| `roles` | `r-acquire`, `r-effect` | *acquires information* · *produces an effect* | role `note`, `teal` / `amber` | under each transducer, y ≈ 400 |
| `examples` **Proposal** (F3) | `x-sensor`, `x-actuator` | *e.g. thermistor, photodiode* · *e.g. heater, motor, valve* | role `note`, `contrast` at `faint` | y ≈ 475 |
| `loop` **Proposal, optional** (F4) | `lp`, `lp-say` | a `hidden` return path under everything, effect back to quantity, *the same process: the loop closes* | `thin`, faint | y ≈ 600 |

**Meet the parts** (B3): s0 shows the two worlds and the boundaries between them, nothing else; each box
then arrives with its name and kind.

**Values beside their element**: none; no numbers on this card.

**Labels**: on or beside their box; nothing moves, so leaders are not needed.

**Colours and their second channel** (C4):

| Thing | Ink | Second channel |
|---|---|---|
| Sensor, input side | `teal` | the words *input transducer* and *acquires information*; its place on the left boundary |
| Actuator, output side | `amber` | the words *output transducer* and *produces an effect*; its place on the right boundary |
| Electrical arrows | `teal` | the label *electrical signals*; they lie inside the electronic system |
| Boundaries | `contrast` faint | `hidden` (dashed) line type |

## 4. The run: step by step, as the Flow goes

### 4a. Steps

| # | id | Flow paragraph (first words) | What changes: the step's one sentence (`say`) | Overlay | Presenter's control |
|---|---|---|---|---|---|
| 0 | `s0-worlds` | p0 *"A device that converts information…"* | Two domains: the physical world, and an electronic system that works on electrical signals. A transducer crosses between them. | — | (the Canvas is up) |
| 1 | `s1-sensor` | p1 *"Based on the direction…"*, p2 *"Input transducers…"* | On the way in: a sensor, an input transducer, turns a physical quantity into an electrical signal. | *input transducer* | Next |
| 2 | `s2-electronics` | (unscripted, between p2 and p3) | In between, the electronics: conditioning, conversion, processing, all electrical. | — | Next |
| 3 | `s3-actuator` | p3 *"Output transducers…"* | On the way out: an actuator, an output transducer, turns an electrical signal into a physical effect. | *output transducer* | Next |
| 4 | `s4-roles` | p4 *"Sensors are mainly intended…"*; held for p5 | The sensor acquires information; the actuator produces an effect. Information flows left to right. | *acquires information · produces an effect* | Next leads to card 3 |

### 4b. Motion, cues and stills per step

| # | Motion (Draw entries) | Movers | Cue and its second channel (B6) | Hold | Reduced motion (C3) | Still (B4) |
|---|---|---|---|---|---|---|
| 0 | the three world names fade in; the two boundaries trace top to bottom | 1 | the boundaries' trace | hold | whole | the two worlds |
| 1 | `q-in` fades in, `f1` traces to the left boundary, `t-sensor` traces on it, its kind fades in | 1 at a time | the arrow leads into the sensor at the boundary | hold | whole | the sensor on its boundary |
| 2 | `f2` traces out of the sensor, `elec` traces, `f-say` fades in | 1 at a time | the arrow leads into the electronics | hold | whole | — |
| 3 | `f3` traces to the right boundary, `t-actuator` traces on it, `f4` and `q-out` follow | 1 at a time | the arrow leads out of the system | hold | whole | the whole chain |
| 4 | the roles fade in; **Proposal**: all four arrows re-trace once, left to right, as one linked trace (the data flowing) | 1 (linked) | the travelling trace (B6: the cue runs along the causal chain) | hold | the roles whole, no re-trace | the chain with its roles |

Four stills (s0, s1, s3, s4). Nothing flashes; the re-trace runs once (B8).

## 5. Pacing and interaction, by surface and view

As `D1-010-05-measurement-path.md` §5: the presenter paces on the wall; Preview Back · Next · *step n of
5* · Replay; View the step list and zoom (Study, Scope); Edit ink, hide or fade an item, a note (session
only, request X6); Authoring the editor and the steps in the file. Phone: the chain wraps after ELECTRONICS
into a second row (sensor and electronics on the first, actuator on the second), or the learner zooms; two
fingers zoom. **Locked**: none.

## 6. The frame

As `D1-010-05-measurement-path.md` §6. Identity bar: *Transducer, sensor, actuator · ● Holding · step n of
5*. Legend card: *teal: input side · amber: output side · dashed: a domain boundary*; *not to scale*; *after
a textbook figure (F1)*.

## 7. Thinking, not watching

- **7a. The PLAN's ASK**: *none on this card.*
- **7b. Prediction point**: none in the PLAN. (Card 3's poe follows straight after.)
- **7c. After**: card 5's flash asks which electrical quantity four sensors hand over; this card names the
  side they sit on.
- **7d. Teacher tip** — **Proposal** (F5): *Learners file a loudspeaker or a motor under "sensors" because
  they are transducers. Ask: which way does the information cross the boundary?*
- **7e. Explore**: none.

## 8. Faithfulness (the quality bar)

**Section D, Draw rows**
- [x] Proportions: a block diagram, *not to scale*.
- [x] Line types: `outline` boxes and arrows, `hidden` boundaries and loop, no construction.
- [x] Curves: none.
- [x] Every `say` matches its Flow paragraph (§4a); s2's is the presenter's line, marked unscripted.
- [x] Numbers: none.

**Section D, Figure row that applies to a redraw**: *a redrawn figure says "redrawn from …"*: the legend card
carries *after a textbook figure* with the citation once the owner confirms it (F1).

**Faithful to the source**: the source's caption (*sensors and actuators are transducers at the physical
interface*) is drawn literally: both transducers straddle the boundary. The source's left-to-right data
direction (sensor → conditioning → transmission) is kept; its return path (orders → conditioning →
actuator → process) is folded into the line and offered back as the optional loop (F4). Its middle blocks
(conditioning, transmission, display, alarms, controller, supervisor) are summarised as *condition ·
convert · process · decide* (A6: the ELECTRONICS box says what it stands for).

**A1–A8**: A1 n/a; A2 n/a; A3 ✓ (*not to scale*); A4, A5 n/a; A6 ✓ (*not to scale*; the folded middle is
named); A7 ✓ (card 1's *usable signal: electrical* is this card's teal arrow; the course uses *sensor* for
the input transducer, as p5 says); A8 ✓ (the source figure).

## 9. Faults and non-ideal behaviour

**PLAN FAULT**: none on this card. The source's *Interference* arrow into the process is card 8's subject;
it is left off here (one idea per card).

## 10. Accessibility, legibility and print

- Wall (C2): box names at the drawing's `label` role, notes at `note`; all at the floor at 1920 × 1080 and
  1024 × 768 (compiler warnings). The faint world names are context, at the floor.
- Reduced motion (C3): each step whole; s4's re-trace is skipped.
- Colour (C4): teal and amber always come with their words and their side.
- Keyboard (C5): → ← R.
- Print (C8): four stills with their `say`.

## 11. Assets to make or source

| Asset | Format | Made by | Status |
|---|---|---|---|
| `transducer-data-flow.benchdrawing`, five steps, layers `worlds`, `chain`, `flow`, `roles` (+ `examples`, `loop` if accepted) | Draw library, written as a file or drawn and imported (M59b) | the author | to make for Saturday |

## 12. Bench capabilities this needs

**Draw Bench**: **exists**: traces, `enter: fade`, steps, `say`, dashed line types, zoom in Study. **Planned**:
s4's linked re-trace of four arrows needs M59n's linked motion on the wall; today the four arrows can
re-trace one after another as four entries of one step, which reads the same. **Not needed**: anything
else.

## 13. Stand-in for the lecture

None needed: the Draw Bench plays all five steps today.

## 14. Findings for the owner

- **F1 — Cite the source on the legend.** The figure in `transcripts/image-3.png` reads *"Figure 1.1
  Functions and data flow in a measurement and control system. Sensors and actuators are transducers at the
  physical interface between electronic systems and processes or experiments."* Its wording and layout
  match Pallàs-Areny and Webster, *Sensors and Signal Conditioning* (2nd ed., Wiley, 2001), Fig. 1.1. Confirm
  the book, so the legend can say *after Pallàs-Areny & Webster, Fig. 1.1*; or say *after a textbook
  figure*?
- **F2 — One line, not the loop.** The PLAN asks for input → electronics → output; the source is a closed
  control loop. This spec draws the line. Agreed?
- **F3 — Proposal: an example under each transducer** (*e.g. thermistor, photodiode* · *e.g. heater, motor,
  valve*), so the boxes name real parts the course uses. No time added.
- **F4 — Proposal, optional: the loop closed underneath** (*the same process*), the source's return path as
  one faint line, for a room with control engineers. +0.1 min.
- **F5 — Proposals**: the Look for (§1), the teacher tip (§7d), and s4's left-to-right re-trace.

## 15. Acceptance: how we know it is built right

- The five steps of §4a play on the wall, the presenter's window and Study Mode, each holding; both
  transducers drawn straddling their boundaries.
- B1 one block per press; B2 only the new block and its arrows draw; B4 four stills; B5 each `say` on the
  strip and read in Scope; B6 each arrow leads into the next block, and s4's trace runs left to right; B8
  the re-trace runs once; B12 the wall's strip not operable; B13 names and kinds only on the drawing; B14
  labels at their boxes; B16 readable as text (the `say` list); B17 sensor and actuator visible together
  from s3; B20 the next `say` and the tip on the strip.
- C2 every label at the floor at 1920 × 1080 and 1024 × 768; C3 each step whole; C4 readable in greyscale
  (words and sides); C5 → ← R; C6 walked at 320, 768, 1200, 1440, 1920; C7 < 100 ms to first frame; C8 the
  stills with their `say`.
- Nothing in the drawing is traced or copied from the source figure.
- E1–E6 for the drawing as presented; checked on the lecture laptop before Saturday, both themes.
