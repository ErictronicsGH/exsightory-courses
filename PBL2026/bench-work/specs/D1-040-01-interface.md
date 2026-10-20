```yaml
id: D1-040-01-interface
card: "Connecting anything makes an interface"
module: notes/Day01/040-sensor-as-source/en.md
bench: Draw                       # the target, and it exists (M59)
library: "course-path (`D1-010-05-measurement-path.md` §3a), played here as its variant `course-path-040-interface.benchdrawing`: layer `stages` (re-spaced, focused) and a new layer `interface-040`"
dimensions: 2D
stand_in: none                    # every step plays on the wall today; the focus is drawn into the variant until X2's `focus:`
optional_benches: []
real_thing: "the course path of D1·010 with the boundary after SENSOR opened up as D1·040's stage, SOURCE & LOADING; a block diagram, not to scale"
minutes: 1.7                      # on the bench: the drawing is up for the whole card
card_minutes: 1.7
status: spec-draft
learner_action: none
predictions: []
seeds: []
key_variable: "the boundary after SENSOR: where the sensor's output meets whatever it is connected to"
time_scale: "none (traces only)"
steps: 4                          # s0–s3; s2 is a proposal (F2)
```

The first card of D1·040, and the module's time table (§2). It loads the course path library for the
seventh time and adds the module's stage, **SOURCE & LOADING**, which `D1-010-05` §3c places between
SENSOR and CONDITIONING. How it is drawn is F1.

## 1. What the room must understand

- **Statement** (verbatim): *An interface is where two parts of a system meet, and the means by which
  information, energy or signals cross between them. The question it asks is: what does each side expect?*
- **SHOW** (verbatim from the PLAN): *Draw — the path drawing focused on the boundary after SENSOR, labelled
  "interface: what does each side expect?".*
- **Drive**: *none in the PLAN.* The steps below follow the Flow's paragraphs.
- **Status** (verbatim): *needs Draw (a focus on the path drawing).*
- **Look for**: *none in the PLAN.* Proposed (F3): *the boundary after the sensor is a place in its own right:
  the sensor's output on one side, what it is connected to on the other.*
- **Bench and library.** The **bench** is the Draw Bench (M59). The **library** is the course path drawing,
  loaded as the variant `course-path-040-interface`.
- **Insight**: *the arrow out of the sensor is not just a wire; it is an interface, and both sides of it have
  requirements.*
- **Kind of knowledge**: *a picture built up* (a known drawing, one boundary opened up and named). Card test
  → **Draw**. B15, B17, B18, B19 do not apply.
- **Why this bench, not a still**: the room knows the path; the steps open the boundary after SENSOR, name
  it, and only then ask the module's question, in the Flow's order. A still with the question already on it
  answers before the Flow has asked.
- **Key variable**: the boundary after SENSOR.

## 2. Time

The card's Flow is 208 words, all spoken: **1.60 min**.

| Beat | Minutes | Source of the number |
|---|---|---|
| s0 the path, the gap after SENSOR open; s1 the interface named: p0 *"The conversion from a physical quantity…"* (30) | 0.23 | 30 ÷ 130 |
| s1 held: p1 *"Think of your computer…"* (41), p2 *"An **interface** is the boundary…"* (17), p3 the definition (26) | 0.65 | 84 ÷ 130 |
| s2 (proposal) every arrow ticked: p4 *"Examples include sensor ↔ signal conditioner…"* (29) | 0.22 | 29 ÷ 130 |
| s2 held: p5 *"An interface is not necessarily a physical connector…"* (32) | 0.25 | 32 ÷ 130 |
| s3 the question: p6 *"So when an engineer asks…"* (33) | 0.25 | 33 ÷ 130 |
| Waiting on traces not covered by speech (4 steps, ≈ 1 s each) | 0.07 | estimate |
| **Card total / of which on the bench** | **1.7 / 1.7** | |

Without s2 (F2 declined), p4 is spoken over s1 held and the card is the same length.

### The module, card by card (U013's measure; D1·040 `targetMinutes: 45`)

The Flow is 1,600 words. Four `[[demo]]` lines are directions, not spoken: card 3 *"Electronics Bench: the
same source…"* (13), card 6 *"Widget (#1 ADC input loading)…"* (24), card 8 *"Electronics Bench: the same
ratio…"* (15), card 9 *"Electronics Bench: the loaded divider…"* (13). **1,535 spoken = 11.8 min.**

| Card | Flow spoken | Beyond the Flow | Card | Source |
|---|---|---|---|---|
| 1 Connecting anything makes an interface | 1.60 | traces 0.07 | **1.7** | this spec |
| 2 Two voltages are not automatically compatible | 0.91 | multi-select ≈ 0.9 | **1.8** | estimate (no bench) |
| 3 What impedance means | 1.58 | the Electronics drive, three beats ≈ 1.0 | **2.6** | estimate (**deferred**: Electronics in development) |
| 4 Every source has an output impedance | 1.58 | numeric ≈ 1.0, traces 0.1 | **2.7** | `D1-040-04-thevenin-redraw.md` §2 |
| 5 Loading: the measurement changes the measurand | 1.22 | circuit predict ≈ 1.0, the drive ≈ 0.75, the three HARVEST lines (not in the Flow, 55 words) 0.42 | **3.4** | estimate (**deferred**) |
| 6 High in, low out | 0.63 | the Equation driven, unscripted 0.79, the SEED line (not in the Flow) 0.15 | **1.6** | `D1-040-06-high-in-low-out.md` §2 |
| 7 Attenuation: making a large signal smaller | 0.60 | the example read 0.19 | **0.8** | `D1-040-07-attenuation.md` §2 |
| 8 A divider that does not lie to the ADC | 2.02 | numeric ≈ 1.0, checkpoint ≈ 3.0, the Electronics drive ≈ 1.0 | **7.0** | estimate (**deferred**) |
| 9 Buffering: drive without disturbing | 1.66 | the drive ≈ 0.75, the SEED line (not in the Flow) 0.18 | **2.6** | estimate (**deferred**) |
| **Module** | **11.8** | **12.4** | **24.2** | |

**D1·040 uses ≈ 24 of its 45 minutes: ≈ 21 min unused** (F4). The Electronics estimates (cards 3, 5, 8,
9: ≈ 4.5 min beyond their Flow) belong to their specs when they are written, and live circuit demos tend
to run long; even doubling them leaves ≈ 16 min. The proposals in this module's specs add ≈ +0.4 min if
all are taken (card 4 F2, F3 +0.2; card 6 F6 +0.1; card 7 F4 +0.1); card 1's s2 adds nothing.

## 3. The scene: what is on the bench

**The library grows here.** `D1-010-05` §3c: *"D1·040 adds SOURCE & LOADING between SENSOR and
CONDITIONING … Adding a stage re-spaces the stage lane in that module's variant."* This spec draws it as
**a band on the boundary after SENSOR**, not a seventh box (F1): the stage *is* the interface, which is what
the card says, and the Flow's first example, *sensor ↔ signal conditioner*, stays one arrow.

**Re-spacing** (this variant only; earlier variants keep the master's pitch 260): six boxes 205 wide, gaps
25, the gap after SENSOR opened to 210 for the band. Left edges: QUANTITY 35, SENSOR 265, CONDITIONING 680,
ADC 910, FIRMWARE 1140, NUMBER 1370 (right edge 1575 of 1600). Lane centre y = 420 on the 900-unit
artboard, as in D1·030's variant (the preview crops to the lane). The forms lane is not shown on this card.

**Parts** (the master's layer, plus the new layer `interface-040`):

| id | Item | Drawn as | Where, and why |
|---|---|---|---|
| `s-sensor`, `s-conditioning` | the two stages either side of the boundary | `outline`, `contrast`, label in role `label` | the two sides of the interface |
| `s-quantity`, `s-adc`, `s-firmware`, `s-number` and their arrows | the rest of the path | `thin`, `contrast` at tint `faint`, labels `faint` | context (natural order); dimmed, not removed |
| `if-arrow` | the arrow SENSOR → CONDITIONING, across the 210-unit gap | `outline`, `contrast`, `arrow` end | the signal crossing the boundary |
| `if-band` | SOURCE & LOADING: a rounded band over the gap (x 478–672, y 340–500, corner 16), the crossing arrow through its lower half | `hidden` (dashed), `amber`, no fill | the boundary after SENSOR, opened up as the module's stage |
| `if-name` | *SOURCE & / LOADING* inside the band, above the arrow | role `label`, `amber` | the stage's name (the PATH comment) |
| `if-word` | *interface* above the band | role `label`, `amber`, weight bold | the Flow's p0 word |
| `if-ticks` | short `amber` ticks across CONDITIONING → ADC, ADC → FIRMWARE, FIRMWARE → NUMBER (**Proposal**, F2) | `hidden`, `amber` at tint `faint` | p4's examples that sit on the path: every arrow is an interface |
| `if-ask` | *interface: what does each side expect?* under the band | role `label`, `amber` | the PLAN's label, verbatim |

The preview (`bench-work/previews/d1-040-01-interface.svg`) is the layout check.

**Meet the parts** (B3): the room has met the path three times (D1·010, D1·030 card 1, card 9); s0 shows it
named. The new item, the band, is met at s1 with its name on it.

**Values beside their element**: none; no numbers on this card.

**Labels**: on their items; nothing moves, so no leaders are needed.

**Colours and their second channel** (C4):

| Thing | Ink | Second channel |
|---|---|---|
| The interface (band, its name, *interface*, the question) | `amber` | `hidden` (dashed) line type, and the words |
| The ticks on the other arrows (proposal) | `amber` at `faint` | `hidden` line type |
| The two sides, SENSOR and CONDITIONING | `contrast` | `outline` weight |
| Dimmed stages | `contrast` at `faint` | `thin` line, lower contrast (they never carry the point) |

**Key views**: *Home* (the whole lane). One framing, `boundary` (x 240–910), for Study's zoom.

## 4. The run: step by step, as the Flow goes

### 4a. Steps

| # | id | Flow paragraph (first words) | What changes: the step's one sentence (B5; the `say`) | Overlay | Presenter's control |
|---|---|---|---|---|---|
| 0 | `s0-path` | p0 *"The conversion from a physical quantity…"* (first sentence) | The path, with the boundary after the sensor opened up: the signal leaves the sensor and crosses to what comes next. | — | (the Canvas is up) |
| 1 | `s1-interface` | p0 *"…We call that boundary an **interface**"*; held through p1–p3 | The boundary is an interface: here, the sensor as a source meets whatever it is connected to. | *interface* · *SOURCE & LOADING* | Next |
| 2 | `s2-every-arrow` (**Proposal**, F2) | p4 *"Examples include sensor ↔ signal conditioner…"*; held through p5 | Every arrow on the path is an interface: conditioner to ADC, ADC to microcontroller, microcontroller to display. | — | Next |
| 3 | `s3-each-side` | p6 *"So when an engineer asks…"* | The question every interface asks: what does each side expect? | *interface: what does each side expect?* | Next leads to card 2 |

### 4b. Motion, cues and stills per step

| # | Motion (Draw entries, M59d) | Movers | Cue and its second channel (B6) | Hold | Reduced motion (C3) | Still (B4) |
|---|---|---|---|---|---|---|
| 0 | the dimmed lane fades in (`enter: fade`); SENSOR, CONDITIONING and `if-arrow` trace | 1 at a time | the arrow's trace runs out of SENSOR across the gap | hold | whole | the path, the gap open |
| 1 | `if-band` traces round the gap, then `if-name` and `if-word` fade in | 1 at a time | the dashed band closing round the arrow | hold | whole | the interface named |
| 2 | the three `if-ticks` trace, left to right | 1 at a time | each tick in turn along the path | hold | whole | — |
| 3 | `if-ask` fades in | 1 | the question arriving under the band | hold | whole | the whole card |

Three stills (s0, s1, s3). Nothing flashes.

## 5. Pacing and interaction, by surface and view

As `D1-010-05-measurement-path.md` §5: the presenter paces on the wall; Preview Back · Next · *step n of 4* ·
Replay; View the step list and zoom (Study, Scope; framing `boundary`); Edit ink, hide or fade an item, a
note (session only; not yet specified for the Draw Bench, request X6); Authoring the editor and the steps in
the file. Phone: the lane in two rows (D1-010-05 F4), SENSOR, the band and CONDITIONING on the first; two
fingers zoom. **Locked**: none.

## 6. The frame

As `D1-010-05-measurement-path.md` §6. Identity bar: *Connecting anything makes an interface · ● Holding ·
step n of 4*. Legend card: *amber: the interface*; *not to scale*.

## 7. Thinking, not watching

- **7a. The PLAN's ASK**: *none on this card.* The question is asked out loud at s3 and answered by the
  module; card 2's multi-select is its first test.
- **7b. Prediction point**: none.
- **7c. After**: card 2's multi-select.
- **7d. Teacher tip** — **Proposal** (F3): *Learners hear "interface" and think of a connector. Ask: if you
  join the sensor to the ADC with a perfect wire, is there still an interface?* (Yes: the wire is not what
  meets; the sensor's output and the ADC's input are.)
- **7e. Explore**: none.

## 8. Faithfulness (the quality bar)

**Section D, Draw rows**
- [x] Proportions: a block diagram, *not to scale*.
- [x] Line types: `outline` for the two sides and the crossing arrow, `thin` for the dimmed lane, `hidden`
  for the band and ticks; no construction left at the last step.
- [x] Curves: none.
- [x] Every `say` matches its Flow paragraph (§4a).
- [x] Numbers: none.

**A1–A8**: A1 n/a (no values); A2 n/a (card 3 onward shows what goes wrong); A3 ✓ (*not to scale*); A4, A5
n/a; A6 ✓ (*not to scale*); A7 ✓ (the stage's name and place are the module's PATH comment and
`D1-010-05` §3c; p4's on-path examples map to the lane's arrows: sensor ↔ conditioner the band,
conditioner ↔ ADC, ADC ↔ microcontroller (ADC → FIRMWARE), microcontroller ↔ display (FIRMWARE → NUMBER); the
off-path examples, industrial controller, CAN bus, Ethernet, are not drawn); A8 ✓.

## 9. Faults and non-ideal behaviour

**PLAN FAULT**: none on this card.

## 10. Accessibility, legibility and print

- Wall (C2): the two sides, the band's name and the question at 7:1 and the floor; *SOURCE & LOADING* in two
  lines (22 drawing units) to fit the 194-unit band. Dimmed stage names still reach the floor. Check at
  1920 × 1080 and 1024 × 768.
- Reduced motion (C3): each step whole.
- Colour (C4): the interface is dashed and worded.
- Keyboard (C5): → ← R.
- Print (C8): the three stills with all four `say` lines.

## 11. Assets to make or source

| Asset | Format | Made by | Status |
|---|---|---|---|
| The `interface-040` layer in `course-path.benchdrawing` | Draw library (master) | the author | to make for Saturday |
| `course-path-040-interface.benchdrawing`, the variant: the stage lane re-spaced (§3), four steps | Draw library | the author | to make for Saturday |

## 12. Bench capabilities this needs

**Draw Bench**: **exists**: traces, `enter: fade`, steps, `say`, tints, zoom in Study (M59a–e). **Missing
(request it)**: X2's `focus:`, `layers:` and the ghosted layer (already requested); until then the dimming
and the re-spacing are drawn into the variant.

## 13. Stand-in for the lecture

None needed: the variant plays all four steps today.

## 14. Findings for the owner

- **F1 — SOURCE & LOADING drawn as the boundary, not as a seventh box.** `D1-010-05` §3c adds the stage
  *between SENSOR and CONDITIONING*. Options: (a) a dashed band on the arrow after SENSOR, named SOURCE &
  LOADING: the stage is the interface, the Flow's *sensor ↔ signal conditioner* stays one arrow, and later
  modules keep six boxes (**recommended**; the preview draws it); (b) a seventh box like the others (pitch
  ≈ 222, and *sensor ↔ signal conditioner* then spans two arrows). Whichever is chosen, D1·050's current
  stage follows it.
- **F2 — Proposal: s2, every arrow ticked** while p4 lists the examples. Without it p4's list is heard, not
  seen; with it the room sees the module's question applies all along the path. Take (**recommended**), or
  leave p4 over s1?
- **F3 — Proposals**: the Look for (§1) and the teacher tip (§7d).
- **F4 — D1·040 runs ≈ 21 min short of its 45** (§2: 24.2 min, the Electronics beats estimated). Reported, not
  acted on: the owner may keep the time for the live Electronics demos and questions, move time to a module
  that overruns (D1·010 overran by ≈ 5.7 min, `D1-010-01` §2), or lower `targetMinutes`.
- **F5 — Three PLAN lines are not in the Flow** (cards 5, 6, 9): HARVEST S6, S8, S36 (card 5), SEED S14 (card
  6) and SEED S13 (card 9) are written in the PLAN but never spoken in the Flow. The time table counts them as
  spoken (0.75 min). Add them to the Flow where they fall, or leave them to the presenter's notes? (Card 6's
  is in `D1-040-06` F2.)

## 15. Acceptance: how we know it is built right

- The four steps of §4a play on the wall, the presenter's window and Study Mode, each holding, with the
  `say` lines of §4a.
- B1 one idea per press; B2 only the new item draws; B4 three stills and the `say` list; B5 each `say` on the
  strip and read in Scope; B6 the band traces round the crossing arrow; B8 nothing blinks; B12 the wall's strip
  not operable; B13 terms only; B14 the labels on their items; B16 the card readable as text; B20 the next
  `say` and the tip on the strip.
- C2 the two sides, the band and the question at 7:1 and the floor at 1920 × 1080 and 1024 × 768; C3 each
  step whole; C4 readable in greyscale; C5 → ← R; C6 walked at 320, 768, 1200, 1440, 1920; C7 < 100 ms to
  first frame; C8 the stills with their `say`.
- The variant's ids are the master's; `interface-040` changes nothing in earlier variants.
- E1–E6 for the drawing as presented; checked on the lecture laptop before Saturday, both themes.
