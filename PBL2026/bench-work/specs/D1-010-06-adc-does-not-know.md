```yaml
id: D1-010-06-adc-does-not-know
card: "The ADC does not know what 2047 means"
module: notes/Day01/010-mcu-reads-2047/en.md
bench: Draw                       # the target, and it exists (M59)
library: "course-path (`D1-010-05-measurement-path.md` §3a), played here as its variant `course-path-010-converter.benchdrawing`: layers `ghost`, `forms`, `values-010`"
dimensions: 2D
stand_in: none                    # every step plays on the wall today; the focus is drawn, not zoomed (§13)
optional_benches: []
real_thing: "a 12-bit converter with a 3.3 V reference reading a 10 kΩ NTC on a 10 kΩ divider at 25 °C (1.650 V → 2048), drawn as the course path; not to scale"
minutes: 2.0                      # on the bench: the drawing is up for the whole card
card_minutes: 2.0
status: spec-draft
learner_action: none
predictions: []
seeds: [S1]                       # planted at the end of s2
key_variable: "what the converter knows (its input voltage, its configuration) against what the number needs (seven things along the path)"
time_scale: "none (traces only)"
steps: 3                          # s0–s2
```

Reuses the course path library (`D1-010-05-measurement-path.md` §3a). The PLAN's *"focus"* is drawn: the
converter's stretch of the path at full ink, the rest as a faint ghost, because the `drawing` fence has no
focus or zoom of its own (card 5's F7).

## 1. What the room must understand

- **Statement** (verbatim): *The converter knows its input voltage and its configuration, nothing else.
  Turning 2047 into 25 °C needs the sensor, the conditioning, the reference, the calibration and the
  scaling.*
- **SHOW** (verbatim from the PLAN): *Draw — the path drawing focused on the converter: "1.65 V → ADC →
  2048", with the seven things it needs before 2048 can mean 25 °C (sensor, conditioning, reference,
  configuration, calibration, scaling, the sensor's characteristics) hung under the arrows they belong
  to.*
- **Status** (verbatim): *needs Draw (a focus and an overlay on the path drawing).*
- **Note** (verbatim): *the Flow uses 2048 (1.65 V on a 3.3 V, 12-bit converter: exact mid-scale); the
  heading's 2047 is the cold-open reading. Both stand.*
- **Drive / Look for**: *the PLAN gives none for this card.* This spec proposes the three steps of §4.
- **Bench and library.** The **bench** is the Draw Bench; the **library** is the course path drawing,
  loaded as the variant `course-path-010-converter`.
- **Insight**: *a raw code means nothing on its own; it becomes 25 °C only through everything else on the
  path, which the converter knows nothing about.*
- **Kind of knowledge**: *a picture built up* (a focus, then the whole path, then what hangs on it). Card
  test → **Draw**. B17 applies weakly (what the converter knows against what the number needs, both on
  the drawing at s2). B15, B18, B19 do not.
- **Why this bench, not a still**: the focus comes first and the rest of the path second, so the room
  sees how little the converter holds before it sees how much the number needs.
- **Key variable**: the converter's knowledge against the path's.

## 2. Time

The Flow is 190 words, all spoken: **1.46 min**.

| Beat | Minutes | Source of the number |
|---|---|---|
| s0 the converter in focus: Flow p0 *"The ADC itself has no idea…"* (47) and p1 *"Suppose an ADC gives…"* (47) | 0.72 | 94 ÷ 130 |
| s1 the whole path: p2 *"The number has to be interpreted…"* (14), p3 the chain (16) | 0.23 | 30 ÷ 130 |
| s2 the seven hung: p4 *"The ADC has done its job…"* (30), p5 the list (23) | 0.41 | 53 ÷ 130 |
| s2 held: p6 *"This is why…"* (13) | 0.10 | 13 ÷ 130 |
| s2 held: the PLAN's ANALOGY, where it breaks (unscripted, ≈ 40 words: *"…a driver might notice a passenger at the wrong station; the converter carries a wrong voltage exactly as faithfully as a right one. Nobody checks the ticket."*) | 0.31 | estimate, 40 ÷ 130 |
| s2 held: SEED S1 (28 words) | 0.22 | 28 ÷ 130 |
| **Card total / of which on the bench** | **2.0 / 2.0** | |

All long paragraphs fall on held states. **Module check**: D1·010 overruns by ≈ 5.7 min
(`D1-010-01-confidently-wrong.md` §2).

## 3. The scene: what is on the bench

**Parts** (the master's layers; ids stable):

| id | Item | Drawn as | Value and source |
|---|---|---|---|
| `g-*` | The whole forms lane as a ghost | `construction` line type (thin, faint); rubbed out at s1 | card 5's §3a |
| `f-voltage` + `v-volt` | Voltage, with its value | `outline`, the value in mono | **1.65 V** (Flow) |
| `a3` + `al-adc` | The converter's arrow, labelled *ADC* | `outline` arrow; the box *ADC* on it | Flow |
| `al-knows` | Inside the ADC box: *knows: its input voltage · its configuration* | role `note` | the statement's words |
| `f-code` + `v-code` | ADC code, with its value | `outline`, value in mono | **2048** (§8) |
| `f-temperature` + `v-temp-25` | Temperature, *25 °C* | `outline` | Flow |
| `a1` + `al-sensor` | arrow labelled *temperature sensor* | `outline` | Flow p3's word |
| `f-resistance`, `f-binary`, `f-variable` | the forms the Flow's chain passes over | `outline`, no values | card 5's chain |
| `a5`–`a6` + `al-software` | arrows labelled *software* | `outline` | Flow p3's word |
| `f-number` + `v-number-25` | *25 °C* | `outline` | Flow |
| `n-1` … `n-7` | The seven things, each a short `note` with a `thin` leader up to its arrow | in the Flow's order: *the sensor* (under `a1`) · *the signal conditioning* (under `a2`) · *the ADC reference* (under `a3`) · *the ADC configuration* (under `a3`) · *calibration* (under `a6`) · *scaling* (under `a6`) · *the sensor's characteristics* (under `a1`) | Flow p5 (verbatim words) |

**Meet the parts** (B3): s0 shows only the converter's stretch, with its one line (*knows: its input
voltage · its configuration*): the part is met before anything is hung on the path.

**Values beside their element** (B14, B16): *1.65 V* in Voltage, *2048* in ADC code, *25 °C* at both
ends; mono.

**Labels**: on their items; leaders only for the seven notes (nothing moves, D6.3).

**Colours and their second channel** (C4):

| Thing | Ink | Second channel |
|---|---|---|
| The converter's stretch (s0) | `contrast` | full `outline` weight against the ghost's `construction` line |
| The ghost | `contrast`, construction | thin and faint (a line type) |
| The seven notes | `teal` | role `note` with a leader; their words |
| What the converter knows | `contrast` | inside the ADC box |

## 4. The run: step by step, as the Flow goes

### 4a. Steps

| # | id | Flow paragraph (first words) | What changes: the step's one sentence (`say`) | Overlay | Presenter's control |
|---|---|---|---|---|---|
| 0 | `s0-converter` | p0 *"The ADC itself has no idea…"*, p1 *"Suppose an ADC gives…"* | The converter alone: 1.65 V in, 2048 out. It knows its input voltage and its configuration, nothing else. | — | Next appears the bench |
| 1 | `s1-whole-path` | p2 *"The number has to be interpreted…"*, p3 *"Temperature → temperature sensor → …"* | The whole path around it: 25 °C, the sensor, 1.65 V, the converter, 2048, the software, 25 °C. | — | Next |
| 2 | `s2-seven` | p4 *"The ADC has done its job…"*, p5 the list, p6 | Seven things hang on the path, each under the stage it belongs to: without them 2048 is not 25 °C. | *a raw code is not an engineering value* | Next leads to card 7 |

### 4b. Motion, cues and stills per step

| # | Motion (Draw entries) | Movers | Cue and its second channel | Hold | Reduced motion | Still |
|---|---|---|---|---|---|---|
| 0 | the ghost lane fades in (`enter: fade`); the converter's stretch traces: Voltage, the ADC arrow and box, ADC code | 1, then 1 | full ink against the ghost (a line-type contrast, not a colour) | hold | whole | the converter in focus |
| 1 | the ghost is erased (`exit: erase`) as the rest of the path traces over it, left to right, with the stage labels and values | 1 | the trace leads outward from the converter to both ends | hold | whole | the whole path with values |
| 2 | the seven notes trace one after another in the Flow's list order (layer order), each with its leader | 1 at a time | each note lands under its stage as the presenter reads it | hold | whole | the path with the seven |

Three stills (B4). Nothing flashes (B8).

## 5. Pacing and interaction, by surface and view

As card 5 (`D1-010-05-measurement-path.md` §5): the presenter paces on the wall; Preview Back · Next ·
*step n of 3* · Replay; View the step list, zoom (Study, Scope); Edit ink, hide or fade an item, a note
(session only); Authoring the editor and the steps in the file. Phone: the path in two rows (card 5's
F4) with the seven notes under them; zoom with two fingers. **Locked**: none.

## 6. The frame

As card 5's §6. Identity bar: *The ADC does not know what 2047 means · ● Holding · step n of 3*. Legend
card: *not to scale*; *faint: the rest of the path*.

## 7. Thinking, not watching

- **7a. The PLAN's ASK**: *none on this card.*
- **7b. Prediction point** — **Proposal** (F3): before s2, *"The converter gave 2048. Name one thing you
  would need to know before you could say what temperature that is."* (free text in Scope, never
  marked); the seven notes are the reveal. +0.5 min.
- **7c. After**: card 7's checkpoint.
- **7d. Teacher tip** — **Proposal** (F3): *Learners assume the code is the temperature in some unit.
  Ask: if I change the reference from 3.3 V to 1.1 V, does the temperature change? Does the code?* (The
  temperature does not; the code triples.)
- **7e. Explore**: none.

## 8. Faithfulness (the quality bar)

**Arithmetic.** LSB = 3.3 / 4096 = 0.8057 mV; 1.65 / 0.0008057 = **2048.0**, exact mid-scale. For a
truncating converter (D1·080's SAR card, and card 1's F1), code 2048 starts at exactly 1.650 V: 1.65 V
sits on the edge between 2047 and 2048, and any negative offset, even a fraction of one LSB (0.81 mV),
reads 2047. So the
heading's 2047 and the Flow's 2048 are one LSB apart, and this circuit could give either (§14 F1).

**Coherence of 1.65 V and 25 °C** (A7). A 10 kΩ NTC at 25 °C (R25 = 10 kΩ, B = 3950 K: InsightDemo's
`thermistor-ntc-10k` profile) in a divider with a 10 kΩ resistor on 3.3 V gives 3.3 × 10 / 20 =
**1.650 V**, whichever leg it is in. So *25 °C → 1.65 V → 2048* is one real circuit. (Card 5's 27.4 °C
on the same circuit: 8.996 kΩ → 1.563 V → 1939, card 5's F6.)

**The seven, under their stages**: *the sensor* and *the sensor's characteristics* belong to SENSOR (the
temperature-to-resistance curve); *the signal conditioning* to CONDITIONING (the divider, any gain);
*the ADC reference* and *the ADC configuration* to the converter; *calibration* and *scaling* to FIRMWARE
(D2·050 splits FIRMWARE into filter → calibrate → scale, at the same place on the library).

**Section D, Draw rows**
- [x] Proportions: a block diagram, *not to scale*.
- [x] Line types: `construction` for the ghost (erased at s1, so none is left after the last step,
  D12.16); `outline`; `thin` leaders.
- [x] Curves: none.
- [x] Every `say` matches its Flow paragraphs.
- [x] Numbers recomputed above: 1.65 V, 2048, 25 °C.

**A1–A8**: A1 ✓ (Flow; the profile); A2 n/a; A3 ✓; A4, A5 n/a; A6 ✓ (*not to scale*); A7 ✓ with one
note (F1); A8 ✓.

## 9. Faults and non-ideal behaviour

**PLAN FAULT**: none on this card. The ANALOGY's break is itself the fault the card names: *the converter
carries a wrong voltage exactly as faithfully as a right one*. **Proposal**: none on the drawing; the
cold open (card 1) is that fault, and its cause is held for D1·070 (S31).

## 10. Accessibility, legibility and print

- Wall (C2): the seven notes at the wall's floor: seven notes under a seven-node row is the densest
  state of the drawing; **check at 1920 × 1080 and 1024 × 768 when drawn**; if they collide, they hang
  in two tiers.
- Reduced motion (C3): each step whole.
- Colour (C4): the focus is a line type (full against construction), not a colour.
- Keyboard (C5): → ← R.
- Print (C8): three stills with their `say`.

## 11. Assets to make or source

| Asset | Format | Made by | Status |
|---|---|---|---|
| The `values-010` layer (values, stage labels, the seven notes) in `course-path.benchdrawing` | Draw library (master) | the author | to make for Saturday |
| `course-path-010-converter.benchdrawing`, the variant with three steps | Draw library | the author | to make for Saturday |

## 12. Bench capabilities this needs

**Draw Bench**: **exists**: `enter: trace`, `enter: fade`, `exit: erase` on the wall (M59d), steps,
`say`, construction line type, zoom in Study. **Missing (request it)**: `focus:` on the `drawing` fence
(card 5's F7): with it, s0 is the master framed on the converter, with no ghost layer needed.

## 13. Stand-in for the lecture

None needed. The *focus* is drawn (full ink against a ghost), which plays today; when `focus:` exists,
the variant becomes the master with `focus:` and `steps:`.

## 14. Findings for the owner

- **F1 — 2047 and 2048.** The PLAN's note says both stand, and they do: on a truncating converter 1.65 V
  is exactly the edge between them (§8), so this very circuit reads 2047 or 2048 depending on an offset
  of under one LSB. Proposal: say so in the teacher's notes (not on the wall) for the learner who asks
  why the heading and the Flow differ.
- **F2 — The PLAN has no Drive or Look for** on this card. This spec proposes three steps (§4) and the
  Look for *the converter's two facts against the path's seven*. Add them to the PLAN?
- **F3 — Proposals**: the prediction before s2 (§7b, +0.5 min) and the teacher tip (§7d).
- **F4 — Overlay on s2** (*a raw code is not an engineering value*): the Flow's own bold sentence, short
  enough to be a key phrase (B13). Keep it, or leave the drawing wordless?

## 15. Acceptance: how we know it is built right

- The three steps of §4a play on the wall, the presenter's window and Study Mode in order, each
  holding; the values *1.65 V*, *2048*, *25 °C*; the seven notes under their stages as §8.
- B1 one change per press; B2 only the new items draw; B3 the converter met alone at s0; B4 three stills;
  B5 each `say` on the strip; B6 the trace leads out from the converter, the notes land under their
  stages; B8 nothing blinks; B12 the wall's strip not operable; B13 one key phrase only; B14 values
  beside their forms, notes with leaders; B16 the values readable; B20 the next `say` and the tip on the
  strip.
- C2 no collision among the seven notes at 1920 × 1080; legible at 1024 × 768; C3 each step whole; C4
  the focus readable in greyscale; C5 → ← R; C6 walked at 320, 768, 1200, 1440, 1920; C7 < 100 ms to
  first frame; C8 the stills with their `say`.
- No construction item showing after s1 (the compiler's warning clean).
- E1–E6 for the drawing as presented; checked on the lecture laptop before Saturday, both themes.
