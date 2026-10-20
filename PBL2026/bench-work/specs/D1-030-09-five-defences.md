```yaml
id: D1-030-09-five-defences
card: "Defending the sensor against interference"
module: notes/Day01/030-sensing/en.md
bench: Draw                       # the target, and it exists (M59)
library: "course-path (`D1-010-05-measurement-path.md` §3a), played here as its variant `course-path-030-defences.benchdrawing`: layers `stages` (named), `forms` (thin), and a new layer `pins-030` with the poll's answers"
dimensions: 2D
stand_in: none                    # every step plays on the wall today
optional_benches: []
real_thing: "the course path of D1·010 with the five classic defences against interfering and modifying inputs pinned at the stages where the course teaches them; not to scale"
minutes: 3.0                      # on the bench: the drawing is up for the whole card
card_minutes: 3.0
status: spec-draft
learner_action: none              # the poll is card 8's; its answers are this card's material
predictions: []
seeds: [S11]                      # planted at s3
key_variable: "where on the path each defence acts"
time_scale: "none (traces only)"
steps: 5                          # s0–s4
```

The seventh variant of the course path library, built like `D1-020-07-where-error-comes-from.md` (pins
on the named stages). One new layer, `pins-030`; no earlier variant changes.

## 1. What the room must understand

- **Statement** (verbatim): *Choose sensors and parts that are insensitive to the interference. Oppose one
  effect with an equal and opposite one. Filter it, feed it back, or correct for it mathematically.*
- **SHOW** (verbatim from the PLAN): *Draw — the five defences pinned on the path where the course teaches
  them: insensitive design and opposing inputs at the sensor (here), negative feedback at conditioning (060),
  filtering at the sampler (Day 3·020), mathematical correction in firmware (Day 2·050). Then the poll's four
  answers dropped onto them (the filter → filtering; on/off difference and the second sensor → correction;
  shading → insensitive design).*
- **Status** (verbatim): *needs Draw (pins over the path drawing).*
- **Look for**: *none in the PLAN.* Proposed (F4): *every answer the room gave is one of the five, and each
  has a place on the path.*
- **Bench and library.** The **bench** is the Draw Bench; the **library** is the course path drawing, loaded
  as the variant `course-path-030-defences`.
- **Insight**: *defending a measurement is not one trick but five, and each works at a particular stage: two
  at the sensor, three further down the path.*
- **Kind of knowledge**: *a picture built up* (pins added to a known drawing). Card test → **Draw**. B17, B18,
  B19 do not apply.
- **Why this bench, not a still**: each defence lands as its paragraph names it, on a path the room knows,
  and then the room's own answers from card 8 land on the defences they are. A still is a list of five; the
  poll answers dropping on is the card's payoff and needs the pins to be there first.
- **Key variable**: the stage a defence sits on.

## 2. Time

The card's Flow is 350 words, all spoken: **2.69 min**.

| Beat | Minutes | Source of the number |
|---|---|---|
| s0 the path: Flow p0 *"The effects of interfering and modifying inputs…"* (22) | 0.17 | 22 ÷ 130 |
| s1 insensitive design: p1 *"The best approach is to design systems…"* (66) | 0.51 | 66 ÷ 130 |
| s2 opposing inputs: p2 *"The opposing-inputs technique…"* (46) | 0.35 | 46 ÷ 130 |
| s3 the other three: p3 *"Three more defences belong further along…"* (16), p4 the list (48) | 0.49 | 64 ÷ 130 |
| s4 the poll's answers: the presenter's lines (≈ 30 words, unscripted: *"Your answers from a minute ago: shading is insensitive design; the filter is filtering; the on-off difference and the second sensor are correction."*) | 0.23 | 30 ÷ 130 |
| s4 held: p5 *"And the sensor is only the beginning…"* (50), p6 *"So it is very important…"* (42), p7 (12), p8 the transition (48) | 1.17 | 152 ÷ 130 |
| Waiting on traces not covered by speech (5 steps, ≈ 1 s each) | 0.08 | estimate |
| **Card total / of which on the bench** | **3.0 / 3.0** | (2.7 Flow + 0.23 + 0.08) |

p5–p8 (152 words) are spoken over s4 held (B13). **Module check**: `D1-030-01-electricity-only.md` §2 (23.4 of
25 min).

## 3. The scene: what is on the bench

**Parts** (the master's layers, `D1-010-05-measurement-path.md` §3a, plus the new layer); layout as rendered
in `bench-work/previews/d1-030-09-defences.svg`:

| id | Item | Drawn as | Where it sits, and why |
|---|---|---|---|
| `s-quantity` … `s-number` | the six stages, **named** | `outline`, `label` | the room knows them (D1·010) |
| `f-*`, `a1`–`a6` | the forms lane, light | `thin`, faint | context only |
| `d-insensitive` | **1 Insensitive design** · *here, at the sensor* | pin, `teal`, head numeral **1** | SENSOR: choose the sensor and parts (the Flow's low-tempco gauge, metal-film resistors, NP0 capacitors) |
| `d-opposing` | **2 Opposing inputs** · *here, at the sensor* | pin, `teal`, **2** | SENSOR: the compensating element beside it (p2's NTC resistor in series with a PTC one; a dummy gauge) |
| `d-feedback` | **3 Negative feedback** · *conditioning · 060* | pin, `azure`, **3** | CONDITIONING (D1·060, the PLAN; S11's harvest) |
| `d-filtering` | **4 Filtering** · *the sampler · D3·020* | pin, `violet`, **4** | ADC, at its input edge (D3·020's anti-alias filter before the sampler; the PLAN) |
| `d-correction` | **5 Mathematical correction** · *firmware · D2·050* | pin, `amber`, **5** | FIRMWARE (D2·050, the PLAN; the Flow's smart pressure sensor) |
| `ans-shade` | answer card *shade the sensor* → 1 | a dashed rounded card, role `note`, dotted leader to pin 1's head | the PLAN: *shading → insensitive design* |
| `ans-filter` | *an optical filter* → 4 | as above, to pin 4 | the PLAN: *the filter → filtering* (F1) |
| `ans-onoff` | *source on/off, difference* → 5 | as above, to pin 5 | the PLAN: *on/off difference → correction* |
| `ans-second` | *a second, shaded sensor* → 5 | as above, to pin 5 | the PLAN: *the second sensor → correction* (F2) |

A **pin** is as on D1·020 card 7: a `thin` leader with a `dot` start on the stage's top edge and a round head
carrying the numeral, the label beside the head in role `note` (name on the first line, *where · when* on the
second). Pins on SENSOR are stacked (1 above 2) so neither overlaps. Answer cards sit in one row above the
pins, each with a dotted leader to the head it belongs to; the card's text is the poll option, shortened to
its noun (the full option is in the poll).

**Meet the parts** (B3): s0 shows the path the room knows, named; nothing new to meet.

**Values beside their element**: none; the module numbers are the only figures.

**Labels**: on their pins and cards; nothing moves, so leaders are allowed (D6.3).

**Colours and their second channel** (C4): each defence has an ink **and** a numeral **and** its name; the
two at the sensor share `teal` (they are the card's *here*) and differ by numeral and name. Answer cards are
neutral (dashed outline) and carry the numeral they point to (→ 1, → 4, → 5).

## 4. The run: step by step, as the Flow goes

### 4a. Steps

| # | id | Flow paragraph (first words) | What changes: the step's one sentence (`say`) | Overlay | Presenter's control |
|---|---|---|---|---|---|
| 0 | `s0-path` | p0 *"The effects of interfering and modifying inputs…"* | The path from D1·010, every stage named: defences can be built in, or added, at different stages. | — | (the Canvas is up) |
| 1 | `s1-insensitive` | p1 *"The best approach is to design systems…"* | First defence, at the sensor: choose a sensor and parts that do not respond to the interference. | — | Next |
| 2 | `s2-opposing` | p2 *"The opposing-inputs technique…"* | Second, also at the sensor: add an opposite effect that cancels the interference. | — | Next |
| 3 | `s3-further` | p3 *"Three more defences belong further along…"*, p4 the list | Three more, further down the path: negative feedback in conditioning, filtering at the sampler, correction in firmware. | *two here, three further on* | Next |
| 4 | `s4-answers` | (unscripted), then p5–p8 held | The room's four answers land on the defences they are: shading, a filter, an on/off difference, a second sensor. | — | Next leads to the break (D1·040) |

S11 (*"Five defences. Two of them live here at the sensor; the other three are waiting for us further down the
path."*) is planted at s3, on the overlay's words.

### 4b. Motion, cues and stills per step

| # | Motion (Draw entries) | Movers | Cue and its second channel | Hold | Reduced motion | Still |
|---|---|---|---|---|---|---|
| 0 | the stages and the light forms lane trace in | 1 | the trace | hold | whole | the named path |
| 1–2 | the step's pin traces its leader up from SENSOR, then its head and label fade in | 1 | the leader grows out of the stage the paragraph names (B6) | hold | whole | the path with the sensor's two pins (after s2) |
| 3 | pins 3, 4, 5 in the order p4 names them, one after another | 1 at a time | each leader grows from its stage | hold | whole | the five pins |
| 4 | the four answer cards fade in one at a time, each followed by its dotted leader tracing down to its pin | 1 at a time | the leader travels from the room's answer to the defence (B6) | hold | cards and leaders whole | the five pins with the answers |

Four stills (s0, s2, s3, s4). Nothing flashes.

## 5. Pacing and interaction, by surface and view

As `D1-020-07-where-error-comes-from.md` §5: the presenter paces on the wall; Preview Back · Next · *step n
of 5* · Replay; View the step list and zoom (Study, Scope); Edit ink, hide or fade an item, a note (session
only, request X6); Authoring the editor and the steps in the file. Phone: the path in two rows (D1-010-05
F4), the pins above each row, the answer cards under the drawing as a list with their numerals. **Locked**:
none.

## 6. The frame

As `D1-010-05-measurement-path.md` §6. Identity bar: *Defending the sensor against interference · ● Holding ·
step n of 5*. Legend card: the five defences with inks and numerals; *dashed card: your answer from the
poll*; *not to scale*.

## 7. Thinking, not watching

- **7a. The PLAN's ASK**: *none on this card.* Card 8's poll (verbatim: *"Sunlight's infrared reaches the
  sensor too. How would you measure only your device's infrared?" · options: an optical filter for our
  wavelength | switch our source on and off and take the difference | a second, shaded sensor measuring the
  sunlight, subtracted | shade the sensor from the sun · (no answer: every option is a real defence; the
  next card names which defence each one is) · depth: create · practice: designing solutions*) is this
  card's material; s4 closes it.
- **7b. Prediction point** — **Proposal** (F4): before s4, *"Which defence is each of your answers?"*, asked
  aloud with the poll's results still in mind; s4 reveals it. +0.3 min.
- **7c. After**: the seed S11 carries the three further pins to D1·060, D2·050 and D3·020; each of those
  modules re-pins its defence when it gets there.
- **7d. Teacher tip** — **Proposal** (F4): *Learners hear "filtering" and think only of an RC filter. Ask:
  where does the optical filter sit, before or after the sensor?* (Before: a filter can act in any domain;
  F1.)
- **7e. Explore**: none.

## 8. Faithfulness (the quality bar)

**Section D, Draw rows**
- [x] Proportions: a block diagram, *not to scale*.
- [x] Line types: `outline` stages, `thin` forms and pin leaders, `hidden` (dotted) answer leaders, dashed
  answer cards; no construction.
- [x] Curves: none.
- [x] Every `say` matches its Flow paragraph (§4a).
- [x] Numbers: module numbers only, each checked: 060 *Signal conditioning: in-amps, gain, offset and bias
  current*; D2·050 *Scaling, calibration and the maths that loses your precision*; D3·020 *Conditioning AC
  for the ADC: bias, aliasing and the anti-alias filter*. These match the PLAN, the Flow's p4 and the seed
  register (S11 → D1·060, D2·050, D3·020; `course-plan.md`).

**Mechanism** (the source, `transcripts/07_compensation_techniques.md`): the five methods against interfering and modifying inputs are insensitive design,
negative feedback, filtering, opposing inputs and mathematical correction. The source adds that *filters can
be placed at inputs or at intermediate stages* and *can be electrical, mechanical, pneumatic, thermal or
electromagnetic*: an optical filter is a filter at the input (F1).

**A1–A8**: A1 ✓; A2 n/a (a map of defences; each is shown at its module); A3 ✓ (*not to scale*); A4, A5 n/a;
A6 ✓; **A7: two placements reported** (F1, F2); A8 ✓.

## 9. Faults and non-ideal behaviour

**PLAN FAULT**: none on this card. The interference itself is card 8's.

## 10. Accessibility, legibility and print

- Wall (C2): five pins and four cards on a six-stage path, lighter than D1·020 card 7's eleven pins; **check
  at 1920 × 1080 and 1024 × 768** that the answer cards do not collide (the render places them in one row:
  §3) and every label reaches the floor; if not, the cards drop to the numeral and a short noun.
- Reduced motion (C3): each step whole.
- Colour (C4): ink + numeral + name; the two teal pins differ by numeral and name.
- Keyboard (C5): → ← R.
- Print (C8): four stills with their `say`; the last is the module's defence map.

## 11. Assets to make or source

| Asset | Format | Made by | Status |
|---|---|---|---|
| The `pins-030` layer (five pins, four answer cards and their leaders) in `course-path.benchdrawing` | Draw library (master) | the author | to make for Saturday |
| `course-path-030-defences.benchdrawing`, the variant with five steps | Draw library | the author | to make for Saturday |

## 12. Bench capabilities this needs

**Draw Bench**: **exists**: traces and `enter: fade` on the wall (M59d), steps, `say`, `dot` ends, dashed and
dotted line types, zoom in Study. **Missing (request it)**: `steps:` / `layers:` on the `drawing` fence (X2);
this is the library's seventh variant. **Not possible, and not needed**: the drawing showing the poll's live
counts (the wall computes nothing; the poll shows its own tally on card 8).

## 13. Stand-in for the lecture

None needed: the Draw Bench plays all five steps today.

## 14. Findings for the owner

- **F1 (A7) — The optical filter is filtering, but at the sensor, not at the sampler.** The PLAN drops *the
  filter* onto the filtering pin at D3·020 (the sampler). An optical filter for our wavelength sits in front
  of the sensor, in the optical domain, before any transduction; the source says filters *"can be placed at
  inputs"* and *"can be … electromagnetic"*. Dropped on the D3·020 pin, the drawing would put an optical
  filter at the converter. Options: (a) a second, small filtering pin at SENSOR (*filtering · optical, at the
  input*) and the answer dropped there, with the D3·020 pin left for electrical filtering (**recommended**:
  true to the source, and it teaches that a defence is defined by what it does, not where); (b) drop it on the
  D3·020 pin with a note *filtering acts here optically; Day 3 filters electrically*; (c) as the PLAN.
- **F2 (A7) — The second, shaded sensor is opposing inputs when it is subtracted in the circuit.** The PLAN
  maps it to correction. A matched sensor that sees only the interference and is subtracted in hardware
  (wired in opposition, or in a bridge) is the textbook opposing-inputs arrangement (the dummy gauge for
  temperature); subtracted in firmware after both are digitised, it is mathematical correction. The poll's
  wording (*"subtracted"*) does not say where. Options: (a) drop it on pin 2 with *subtracted in the
  circuit*, and say aloud that in firmware it would be correction (**recommended**: it gives opposing inputs,
  otherwise unclaimed by the room, its example); (b) on pin 5 as the PLAN, with *subtracted in firmware*;
  (c) a card with leaders to both.
- **F3 — The on/off difference is correction, and also the start of modulation.** As the PLAN says, measuring
  with the source off and subtracting is correction (pin 5). It is also synchronous detection, which Day 3
  meets again; a word in the teacher's notes only. No change proposed.
- **F4 — Proposals**: the Look for (§1), the prediction before s4 (+0.3 min), the teacher tip (§7d).

## 15. Acceptance: how we know it is built right

- The five steps of §4a play on the wall, the presenter's window and Study Mode, each holding; five pins at
  the stages of §3 with numeral, name and module; four answer cards with leaders to their pins (as decided in
  F1, F2).
- B1 one defence (or one group) per press; B2 only the new pins or cards draw; B4 four stills; B5 each `say`
  on the strip and read in Scope; B6 each leader grows from its stage, and each answer's leader runs to its
  pin; B8 nothing blinks; B12 the wall's strip not operable; B13 names and module numbers only; B14 labels on
  their pins; B16 the map readable as text; B20 the next `say` and the tip on the strip.
- C2 no collision at 1920 × 1080, labels at the floor at 1024 × 768; C3 each step whole; C4 the five
  defences told apart in greyscale by numeral; C5 → ← R; C6 walked at 320, 768, 1200, 1440, 1920; C7
  < 100 ms to first frame; C8 the stills with their `say`.
- The variant's ids are the master's; `pins-030` is a new layer and changes nothing in earlier variants.
- E1–E6 for the drawing as presented; checked on the lecture laptop before Saturday, both themes.
