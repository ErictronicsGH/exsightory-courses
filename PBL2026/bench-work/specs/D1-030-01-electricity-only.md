```yaml
id: D1-030-01-electricity-only
card: "Our circuits only understand electricity"
module: notes/Day01/030-sensing/en.md
bench: Draw                       # the target, and it exists (M59)
library: "course-path (`D1-010-05-measurement-path.md` §3a), played here as its variant `course-path-030-sensor.benchdrawing`: layers `stages` (focused), `eye` (the organ only, ghosted) and a new layer `focus-030`"
dimensions: 2D
stand_in: none                    # every step plays on the wall today; the focus is drawn into the variant until X2's `focus:`
optional_benches: []
real_thing: "the course path of D1·010 with its first stage, QUANTITY → SENSOR, singled out, and the eye of D1·010 card 3 over the sensor; a block diagram, not to scale"
minutes: 2.2                      # on the bench: the drawing is up for the whole card
card_minutes: 2.2
status: spec-draft
learner_action: none
predictions: []
seeds: [S8]                       # planted in Flow p5, item 2, spoken over s3 held
key_variable: "the form of the information either side of the sensor: not electrical in, electrical out"
time_scale: "none (traces only)"
steps: 4                          # s0–s3
```

The first card of D1·030, and the module's time table (§2). It loads the course path library for the
sixth time and adds one layer, `focus-030`; no earlier variant changes (`D1-010-05` §3a, §3c).

## 1. What the room must understand

- **Statement** (verbatim): *Most of the quantities we want to measure are not electrical. Like the eye for
  the brain, a sensor has to give the electronic system a representation it can work with: an electrical
  one.*
- **SHOW** (verbatim from the PLAN): *Draw — the path drawing focused on its first arrow, QUANTITY →
  SENSOR, with the eye's organ from 010 ghosted above it.*
- **Drive**: *none in the PLAN.* The steps below follow the Flow's paragraphs.
- **Status** (verbatim): *needs Draw (a focus on the path drawing).*
- **Look for**: *none in the PLAN.* Proposed (F3): *the information changes form at the sensor: not
  electrical before it, electrical after.*
- **Bench and library.** The **bench** is the Draw Bench (M59). The **library** is the course path drawing,
  loaded as the variant `course-path-030-sensor`.
- **Insight**: *the sensor is where the measurement becomes electrical, as the eye is where seeing becomes
  neural; everything after it works on its output, never on the quantity.*
- **Kind of knowledge**: *a picture built up* (a focus and two labels added to a known drawing). Card test →
  **Draw**. B15, B17, B18, B19 do not apply (one chain; the eye is a ghosted reminder, not a second
  representation to compare).
- **Why this bench, not a still**: the room has already walked the path in D1·010; the steps narrow it to
  its first stage and then name what goes in and what comes out, in the order the Flow says them. A still
  with all of it at once loses the arrival of *electrical* as the last word.
- **Key variable**: the form either side of the sensor.

## 2. Time

The card's Flow is 282 words, all spoken: **2.17 min**.

| Beat | Minutes | Source of the number |
|---|---|---|
| s0 the path, focused; s1 the eye ghosted: Flow p0 *"At the start of the day, the eye…"* (48) | 0.37 | 48 ÷ 130 |
| s2 the quantity is not electrical: p1 *"Unfortunately, most of the physical quantities…"* (44) | 0.34 | 44 ÷ 130 |
| s3 the usable signal: p2 *"A sensor provides one of the first…"* (39), p3 *"Physical quantity → sensor → usable signal"* (7) | 0.35 | 46 ÷ 130 |
| s3 held: p4 *"Electronic measurement systems have several advantages…"* (13), p5 the five advantages, SEED S8 inside item 2 (131) | 1.11 | 144 ÷ 130 |
| Waiting on traces not covered by speech (4 steps, ≈ 1 s each) | 0.07 | estimate |
| **Card total / of which on the bench** | **2.2 / 2.2** | |

p5 (131 words) is spoken over s3 held (B13).

### The module, card by card (U012's measure; D1·030 `targetMinutes: 25`)

The Flow is 2,032 words; card 6's *"[[demo]] Electronics Bench: a thermistor that needs a supply…"* (20) is
a direction, not spoken: **2,012 spoken = 15.5 min**.

| Card | Flow spoken | Beyond the Flow | Card | Source |
|---|---|---|---|---|
| 1 Our circuits only understand electricity | 2.17 | traces 0.07 | **2.2** | this spec |
| 2 Transducer, sensor, actuator | 1.38 | one unscripted line 0.12, traces 0.08 | **1.6** | `D1-030-02-transducer-sensor-actuator.md` §2 |
| 3 Transduction is not unit conversion | 1.56 | poe answer window ≈ 0.75, the Plot driven 0.4 | **2.7** | `D1-030-03-not-unit-conversion.md` §2 |
| 4 Transduction can take several stages | 0.96 | unscripted values 0.27, traces 0.13 | **1.4** | `D1-030-04-pressure-chain.md` §2 |
| 5 What a sensor hands you | 2.66 | flash ≈ 0.75 | **3.4** | estimate (no bench) |
| 6 Modulating or self-generating | 1.71 | the Electronics drive, five steps ≈ 2.0; circuit predict ≈ 1.0 | **4.7** | estimate (**deferred**: Electronics in development) |
| 7 Detect, or quantify? | 1.02 | multi-select ≈ 0.9 | **1.9** | estimate (no bench) |
| 8 The quantity never arrives alone | 1.32 | poll ≈ 1.0 | **2.3** | estimate (no bench) |
| 9 Defending the sensor against interference | 2.69 | the poll answers dropped 0.23, traces 0.1 | **3.0** | `D1-030-09-five-defences.md` §2 |
| **Module** | **15.5** | **7.9** | **23.4** | |

**D1·030 fits its 25 minutes with ≈ 1.6 min to spare**, before any proposal. Card 6's 3.0 min beyond its
Flow is the largest estimate and belongs to the Electronics spec when it is written. The proposals in
this module's specs add ≈ +1.0 min if all are taken (card 2 F4 +0.1, card 3 F3 +0.3, card 4 F4 +0.3, card 9
F4 +0.3); with all of them, **24.4 min**. (Card 4's row already counts its values read aloud, F4's first
proposal: 0.27 min.)

## 3. The scene: what is on the bench

**Parts** (the master's layers, `D1-010-05-measurement-path.md` §3a, plus the new layer):

| id | Item | Drawn as | Where, and why |
|---|---|---|---|
| `s-quantity`, `s-sensor` | the first two stages, named | `outline`, `contrast`, label in role `label` | the focus: the card's subject |
| `s-conditioning` … `s-number` and their arrows | the rest of the path, named | `thin`, stroke and label in `contrast` at tint `faint` | context: where on the path we are (the natural-order rule); dimmed, not removed |
| `e-eye` | the eye in section, the master's own item | strokes `thin`, `contrast` at tint `faint` (ghosted) | over SENSOR, as on D1·010 card 4: the organ ↔ the sensor |
| `fc-eye-say` | *the eye: a sense organ (D1·010)* | role `note`, faint | under the ghost |
| `fc-eye-leader` | a `thin` dotted leader from the ghost to SENSOR | `hidden` | ties the organ to the stage |
| `fc-frame` | a rounded frame round QUANTITY and SENSOR | `hidden` (dashed), `amber` | the focus (PLAN: *"focused on its first arrow"*) |
| `fc-a1` | the arrow QUANTITY → SENSOR, redrawn | `outline` weight, `amber`, `arrow` end | lit at s2 |
| `fc-not-elec` | *not electrical: temperature, pressure, light* | role `note`, `amber`, under QUANTITY | the card's first sentence, and the module's `motivates` line |
| `fc-a2` | the arrow SENSOR → CONDITIONING, redrawn | `outline` weight, `teal`, `arrow` end | lit at s3 |
| `fc-usable` | *usable signal: electrical* | role `note`, `teal`, under that arrow | the Flow's p3 |
| `fc-chain` | *physical quantity → sensor → usable signal* | role `label`, under the lane | the Flow's p3, verbatim |

Layout (the preview, `bench-work/previews/d1-030-01-first-arrow.svg`, on the master's 1600-unit width): the
eye ghost at y ≈ 150 over SENSOR's centre (x = 410), the stage lane at y = 420 (the master's pitch 260 from
x = 35), notes 85 units under the lane, the chain caption at y ≈ 595.

**Meet the parts** (B3): the room built this path in D1·010; s0 shows it named, nothing new to meet.

**Values beside their element**: none; no numbers on this card.

**Labels**: on their stages; nothing moves, so leaders are allowed (D6.3).

**Colours and their second channel** (C4):

| Thing | Ink | Second channel |
|---|---|---|
| Focus frame | `amber` | `hidden` (dashed) line type |
| Into the sensor (not electrical) | `amber` | the arrow's weight and the words *not electrical* |
| Out of the sensor (electrical) | `teal` | the words *usable signal: electrical*, and its place after SENSOR |
| Dimmed stages, ghosted eye | `contrast` at `faint` | `thin` line, lower contrast (and they never carry the point) |

## 4. The run: step by step, as the Flow goes

### 4a. Steps

| # | id | Flow paragraph (first words) | What changes: the step's one sentence (B5; the `say`) | Overlay | Presenter's control |
|---|---|---|---|---|---|
| 0 | `s0-focus` | p0 *"At the start of the day, the eye…"* (first sentence) | The path from D1·010, its first stage singled out: the quantity, and the sensor that meets it. | — | (the Canvas is up) |
| 1 | `s1-eye` | p0 *"…The brain never handles light itself"* | The eye over the sensor: as the eye did for the brain, the sensor makes something the system can work with. | — | Next |
| 2 | `s2-not-electrical` | p1 *"Unfortunately, most of the physical quantities…"* | Into the sensor: a quantity that is not electrical (temperature, pressure, light). | *not electrical* | Next |
| 3 | `s3-usable-signal` | p2 *"A sensor provides one of the first…"*, p3; held through p4, p5 | Out of the sensor: a usable signal, an electrical one. | *physical quantity → sensor → usable signal* | Next leads to card 2 |

### 4b. Motion, cues and stills per step

| # | Motion (Draw entries, M59d) | Movers | Cue and its second channel (B6) | Hold | Reduced motion (C3) | Still (B4) |
|---|---|---|---|---|---|---|
| 0 | the dimmed lane fades in (`enter: fade`), then `s-quantity`, `s-sensor` and `fc-frame` trace | 1 at a time | the frame traces round the two stages | hold | whole | the path, focused |
| 1 | `e-eye` and its leader fade in (`enter: fade`), faint | 1 | the leader runs down to SENSOR | hold | whole | — |
| 2 | `fc-a1` traces from QUANTITY to SENSOR, then `fc-not-elec` fades in | 1 | the arrow's trace leads into the sensor (B6) | hold | whole | — |
| 3 | `fc-a2` traces out of SENSOR, `fc-usable` fades in, then `fc-chain` | 1 at a time | the arrow's trace leads out; the caption last | hold | whole | the whole card |

Two stills (s0, s3): a four-step card with one idea per side of the sensor (B4's 3–7 is for a sequence;
here the two stills plus the `say` list carry it, and print shows all four `say` lines). Nothing flashes.

## 5. Pacing and interaction, by surface and view

As `D1-010-05-measurement-path.md` §5: the presenter paces on the wall; Preview Back · Next · *step n of
4* · Replay; View the step list and zoom (Study, Scope); Edit ink, hide or fade an item, a note (session
only; not yet specified for the Draw Bench, request X6); Authoring the editor and the steps in the file.
Phone: the lane in two rows (D1-010-05 F4), QUANTITY and SENSOR on the first; two fingers zoom.
**Locked**: none.

## 6. The frame

As `D1-010-05-measurement-path.md` §6. Identity bar: *Our circuits only understand electricity · ● Holding ·
step n of 4*. Legend card: *amber: not electrical · teal: electrical*; *not to scale*.

## 7. Thinking, not watching

- **7a. The PLAN's ASK**: *none on this card.*
- **7b. Prediction point**: none; the card names the problem the module solves.
- **7c. After**: the SEED S8 (*"This does not mean that measurement is free of energy transfer. Hold on to
  that — it comes back in the next module."*), spoken in p5's item 2, is harvested at D1·040 (loading).
- **7d. Teacher tip** — **Proposal** (F3): *Learners treat the sensor as a measuring device that knows the
  temperature. Ask: after the sensor, does anything in the system ever touch the temperature again?* (No:
  from here on it is a resistance, a voltage, a code.)
- **7e. Explore**: none.

## 8. Faithfulness (the quality bar)

**Section D, Draw rows**
- [x] Proportions: a block diagram, *not to scale*; the eye is the master's own item (drawn to its own
  scale on D1·010 card 4: globe 24.2 mm, `research/04-eye-anatomy-optics-sources.md`).
- [x] Line types: `outline` for the focus, `thin` for the dimmed lane and the ghost, `hidden` for the frame
  and leader; no construction left at the last step (the ghost is a tint, not a construction layer).
- [x] Curves: none.
- [x] Every `say` matches its Flow paragraph (§4a).
- [x] Numbers: none.

**A1–A8**: A1 n/a (no values); A2 n/a (the card states the need; card 8 starts what goes wrong); A3 ✓ (*not
to scale*); A4, A5 n/a; A6 ✓ (*not to scale*); A7 ✓ (the three quantities named, temperature, pressure and
light, are the module's own `motivates` line and the three this module draws: card 3, card 4, card 8); A8 ✓.

## 9. Faults and non-ideal behaviour

**PLAN FAULT**: none on this card.

## 10. Accessibility, legibility and print

- Wall (C2): the dimmed stages are context and may sit under 7:1, but their names must still reach the
  floor size; the focused stages, the notes and the caption at 7:1. Check at 1920 × 1080 and 1024 × 768.
- Reduced motion (C3): each step whole.
- Colour (C4): amber and teal each carry words; the frame is dashed.
- Keyboard (C5): → ← R.
- Print (C8): the two stills with all four `say` lines.

## 11. Assets to make or source

| Asset | Format | Made by | Status |
|---|---|---|---|
| The `focus-030` layer in `course-path.benchdrawing` | Draw library (master) | the author | to make for Saturday |
| `course-path-030-sensor.benchdrawing`, the variant with four steps (the dimmed stages and ghosted eye restyled in the variant) | Draw library | the author | to make for Saturday |

## 12. Bench capabilities this needs

**Draw Bench**: **exists**: traces, `enter: fade`, steps, `say`, tints, zoom in Study (M59a–e). **Missing
(request it)**: X2's `focus:` and `layers:` on the `drawing` fence, plus a way to show a layer **ghosted**
(faint) rather than hidden (added to X2 in `requests-to-exsight.md`); until then the dimming is drawn into
the variant. **Check when drawn**: that a stroke tint (`contrast` at `faint`) renders on the wall as on the
fills of `strain-gauge-beam`.

## 13. Stand-in for the lecture

None needed: the variant plays all four steps today.

## 14. Findings for the owner

- **F1 — "Focused" read as framed and dimmed, not zoomed.** The PLAN says the path is *focused on its first
  arrow*. This spec frames QUANTITY and SENSOR and dims the rest, so the room still sees where on the path
  the module sits. Zooming in to the first two stages alone is the other reading. Keep the frame
  (**recommended**), or zoom?
- **F2 — The eye's organ only.** The PLAN ghosts the organ; the jar over QUANTITY (also in the eye lane)
  is left out. Add it?
- **F3 — Proposals**: the Look for (§1) and the teacher tip (§7d).

## 15. Acceptance: how we know it is built right

- The four steps of §4a play on the wall, the presenter's window and Study Mode, each holding, with the
  `say` lines of §4a.
- B1 one side of the sensor per press; B2 only the new arrow and its note draw; B4 two stills and the `say`
  list; B5 each `say` on the strip and read in Scope; B6 each arrow's trace leads in or out of the sensor;
  B8 nothing blinks; B12 the wall's strip not operable; B13 the notes are terms only; B14 notes beside
  their arrows; B16 the card readable as text; B20 the next `say` and the tip on the strip.
- C2 the focused stages and notes at 7:1 and the floor at 1920 × 1080 and 1024 × 768; C3 each step whole;
  C4 readable in greyscale; C5 → ← R; C6 walked at 320, 768, 1200, 1440, 1920; C7 < 100 ms to first frame;
  C8 the stills with their `say`.
- The variant's ids are the master's; `focus-030` changes nothing in earlier variants.
- E1–E6 for the drawing as presented; checked on the lecture laptop before Saturday, both themes.
