```yaml
id: D1-060-02-what-conditioning-does
card: "What conditioning does"
module: notes/Day01/060-conditioning/en.md
bench: Draw                       # the target, and it exists (M59)
library: "course-path (`D1-010-05-measurement-path.md` §3a), played here as its variant `course-path-060-conditioning.benchdrawing`: layer `stages` as D1·040 left it (SOURCE & LOADING after SENSOR), `forms` faint, and a new layer `pins-060`"
dimensions: 2D
stand_in: none                    # every step plays on the wall today
optional_benches: []
real_thing: "the course path of D1·010 with the seven conditioning functions of the card's statement pinned where the course meets each one; not to scale"
minutes: 1.1                      # on the bench: the drawing is up for the whole card
card_minutes: 1.1
status: spec-draft
learner_action: none
predictions: []
seeds: []
key_variable: "where on the path each conditioning function acts"
time_scale: "none (traces only)"
steps: 4                          # s0–s3
```

The eighth variant of the course path library. Pins are drawn as on D1·020 card 7 and D1·030 card 9. There is one
new layer, `pins-060`, and no earlier variant changes. **This spec also holds D1·060's time table** (§2), since card 1
has no bench and no spec.

## 1. What the room must understand

- **Statement** (verbatim): *Conditioning prepares a signal for the next stage: amplifying, attenuating, level shifting,
  filtering, buffering, isolating, linearizing. Each has its own place on the path.*
- **SHOW** (verbatim from the PLAN): *Draw — the conditioning functions pinned on the path where the course meets them:
  attenuation and buffering (040), amplification (here), level shifting (Day 2·010), linearization (Day 2·050),
  isolation (Day 2·080), filtering (Day 3·020).*
- **Status** (verbatim): *needs Draw (pins over the path drawing).*
- **Drive / Look for**: *none in the PLAN.* Proposed (F4) Look for: *seven functions, and only one of them is this
  module's: gain.*
- **Bench and library.** The **bench** is the Draw Bench. The **library** is the course path drawing, loaded as the
  variant `course-path-060-conditioning`.
- **Insight**: *conditioning is not one box; each function has its own place on the path, and this module's is gain.*
- **Kind of knowledge**: *a picture built up* (pins added to a known drawing). Card test → **Draw**. B15, B17, B18 and
  B19 do not apply.
- **Why this bench, not a still**: each pin lands as the paragraph names it, on a path the room knows. The last pin,
  gain, lands lit at CONDITIONING, which hands off to card 3. A still is a list of seven words; here the list becomes
  places.
- **Key variable**: the stage that each function sits on.

## 2. Time

The card's Flow is 136 words, all spoken: **1.05 min**.

| Beat | Minutes | Source of the number |
|---|---|---|
| s0 the path, CONDITIONING lit: p0 *"This is where **signal conditioning** comes in…"* (37) | 0.28 | 37 ÷ 130 |
| s1 attenuation and buffering: p1 *"We have already met two of these at the sensor…"* (first sentence, 13) | 0.10 | 13 ÷ 130 |
| s2 the four further on: p1 *"The others each belong at a particular place…"* (51) | 0.39 | 51 ÷ 130 |
| s3 gain: p1 *"Here we deal with the one this signal needs most: gain."* (11) | 0.08 | 11 ÷ 130 |
| s3 held: p2 *"Signal conditioning is not simply…"* (24) | 0.18 | 24 ÷ 130 |
| Waiting on traces not covered by speech (4 steps, ≈ 1 s each) | 0.07 | estimate |
| **Card total / of which on the bench** | **1.1 / 1.1** | |

### The module, card by card (U015's measure; D1·060 `targetMinutes: 40`)

The Flow is 1,682 words. Two `[[demo]]` lines are directions and are not spoken: card 6's *"Electronics Bench: an
in-amp across the high-side shunt…"* (16) and card 8's *"Plot Bench: inject the offset into the model…"* (16). The four
`[[ask]]` questions (cards 1, 5, 7, 8: 80 words) are counted in their activities. Card 7's and card 9's other `[[demo]]`
lines are spoken sentences. That leaves **1,570 words spoken outside the activities = 12.1 min.**

| Card | Flow spoken | Beyond the Flow | Card | Source |
|---|---|---|---|---|
| 1 The sensor's output is rarely ready | 0.48 | multi-select ≈ 0.9 (its question included); the HARVEST S33 line (not in the Flow, 18 words) 0.14 | **1.5** | estimate (no bench) |
| 2 What conditioning does | 1.05 | traces 0.07 | **1.1** | this spec |
| 3 Amplification, and undoing it | 0.58 | the example read 0.15 | **0.7** | `D1-060-03-amplification.md` §2 |
| 4 Negative feedback sets the gain | 1.09 | predict–observe–explain ≈ 1.0 (its question is not in the Flow); the reveal and the graph walked 0.40; the HARVEST S11 line (not in the Flow, 17 words) 0.13 | **2.6** | `D1-060-04-negative-feedback.md` §2 |
| 5 Ratios in decibels | 2.03 | flash quiz ≈ 0.75; examples read 0.21 | **3.0** | `D1-060-05-decibels.md` §2 |
| 6 Differential gain: amplify the difference | 1.80 | the Electronics drive, three beats ≈ 1.0 | **2.8** | estimate (**Electronics widget deferred**: in development) |
| 7 CMRR decides whether high-side sensing works | 1.48 | predict–observe–explain ≈ 1.0; the 80 → 100 dB ramp 0.10 | **2.6** | `D1-060-07-cmrr.md` §2 |
| 8 Offset is amplified exactly like the signal | 1.65 | numeric ≈ 1.0; slider moves not covered by speech 0.30 | **3.0** | `D1-060-08-offset-at-gain.md` §2 |
| 9 Bias current makes another offset | 1.91 | the R_s ramp 0.13 | **2.0** | `D1-060-09-bias-current.md` §2 |
| **Module** | **12.1** | **7.3** | **19.4** | |

**D1·060 uses ≈ 19 of its 40 minutes, leaving ≈ 21 min unused** (F5). That is the same pattern as D1·040 (≈ 21 min
unused). The owner cuts or adds; nothing is trimmed here. Card 6's Electronics estimate belongs to its spec when it is
written, and live circuit demos tend to run long. The proposals in this module's specs add ≈ +0.8 min if all are taken
(card 2 F4 +0.1; card 3 F3 +0.1; card 4 F5 +0.1; card 5 F3, F4 +0.2; card 7 F5 +0.1; card 9 F5 +0.2).

## 3. The scene: what is on the bench

**Parts** (the master's layers, `D1-010-05-measurement-path.md` §3a, the stage lane as D1·040's variant left it
(`D1-040-01-interface.md` §3: boxes 205 wide, the gap after SENSOR opened for SOURCE & LOADING), plus the new layer).
Layout as rendered in `bench-work/previews/d1-060-02-conditioning-pins.svg`:

| id | Item | Drawn as | Where it sits, and why |
|---|---|---|---|
| `s-quantity` … `s-number`, `s-loading` | the six stages, **named**, with SOURCE & LOADING as D1·040 drew it | `outline`, `label`; CONDITIONING lit (`outline` weight, `teal`) from s0 | the room knows them; this module is CONDITIONING |
| `f-*`, `a1`–`a6` | the forms lane, faint | `thin`, faint | context only |
| `c-attenuation` | **1 Attenuation** · *met · 040* | pin, `contrast`, head numeral **1** | SOURCE & LOADING (D1·040 card 7, the divider) |
| `c-buffering` | **2 Buffering** · *met · 040* | pin, `contrast`, **2** | SOURCE & LOADING (D1·040 card 9, the follower) |
| `c-levelshift` | **3 Level shifting** · *logic families · D2·010* | pin, `azure`, **3** | on the arrow ADC → FIRMWARE, where the code crosses the chip's boundary (D2·010's DIGITAL INTERFACE, which D1-010-05 §3c places over `a4`) |
| `c-linearize` | **4 Linearization** · *firmware · D2·050* | pin, `azure`, **4** | FIRMWARE (D2·050's *calibrate → scale*) |
| `c-isolation` | **5 Isolation** · *at the mains · D2·080* | pin, `azure`, **5** | SENSOR (D2·080's PATH: *SENSOR at the mains*) (F2) |
| `c-filtering` | **6 Filtering** · *the sampler · D3·020* | pin, `violet`, **6** | the ADC's input edge, **at the same place as D1·030 card 9's pin 4** (consistency, A7) |
| `c-gain` | **7 Amplification** · *here · 060* | pin, `teal`, **7**, head ringed | CONDITIONING (this module) |

A **pin** is drawn as on D1·020 card 7 and D1·030 card 9: a `thin` leader with a `dot` start on the stage's top edge,
and a round head carrying the numeral. The label sits beside the head in role `note`: the name on the first line, *where
· when* on the second. The two pins on SOURCE & LOADING are stacked (1 below 2) so neither overlaps.

**Meet the parts** (B3): s0 shows the path the room knows, named, with CONDITIONING lit as *you are here*.

**Values beside their element**: none. The module numbers are the only figures.

**Labels**: on their pins. Nothing moves, so leaders are allowed (D6.3).

**Colours and their second channel** (C4):

| Thing | Ink | Second channel |
|---|---|---|
| Already met (040) | `contrast` | the word *met* and the module number |
| Here (060) | `teal` | the word *here*, the ringed head, and CONDITIONING lit |
| Day 2 | `azure` | the module number *D2·0x0* |
| Day 3 | `violet` | the module number *D3·020* |

## 4. The run: step by step, as the Flow goes

### 4a. Steps

| # | id | Flow paragraph (first words) | What changes: the step's one sentence (`say`) | Overlay | Presenter's control |
|---|---|---|---|---|---|
| 0 | `s0-path` | p0 *"This is where **signal conditioning** comes in…"* | The path, every stage named, CONDITIONING lit: conditioning prepares the signal for the next stage. | — | (the Canvas is up) |
| 1 | `s1-met` | p1 *"We have already met two of these at the sensor…"* | Two we have met already, where the sensor became a source: attenuation and buffering. | — | Next |
| 2 | `s2-ahead` | p1 *"The others each belong at a particular place…"* | Four more, each where the course meets it: level shifting, linearization, isolation, filtering. | — | Next |
| 3 | `s3-gain` | p1 *"Here we deal with the one this signal needs most: gain."*, then p2 held | The one this signal needs most, here in conditioning: gain. | *here: gain* | Next leads to card 3 |

### 4b. Motion, cues and stills per step

| # | Motion (Draw entries) | Movers | Cue and its second channel | Hold | Reduced motion | Still |
|---|---|---|---|---|---|---|
| 0 | the stages and the faint forms lane trace in; CONDITIONING's outline thickens to `teal` | 1 | the trace; the lit box | hold | whole | the named path, CONDITIONING lit |
| 1 | pins 1 and 2 trace their leaders up from SOURCE & LOADING, one after the other; heads and labels fade in | 1 at a time | the leader grows out of the stage the paragraph names (B6) | hold | whole | the path with two pins |
| 2 | pins 3, 4, 5 and 6 in the order p1 names them (level shifting, linearization, isolation, filtering) | 1 at a time | each leader grows from its stage | hold | whole | six pins |
| 3 | pin 7 traces up from CONDITIONING; its head is ringed and the overlay *here: gain* fades in | 1 | the leader grows from the lit stage | hold | whole | the seven pins: the module's map |

There are four stills (s0–s3), and nothing flashes.

## 5. Pacing and interaction, by surface and view

As in `D1-030-09-five-defences.md` §5. The presenter paces on the wall. Preview offers Back · Next · *step n of 4* ·
Replay. View offers the step list and zoom (Study, Scope). Edit offers ink, hiding or fading an item, and a note
(session only; request X6). Authoring offers the editor and the steps in the file. Phone: the path in two rows
(D1-010-05 F4), with the pins above each row. **Locked**: none.

## 6. The frame

As in `D1-010-05-measurement-path.md` §6. The identity bar reads *What conditioning does · ● Holding · step n of 4*.
The legend card reads *grey: met (040) · teal: here · blue: Day 2 · violet: Day 3 · not to scale*.

## 7. Thinking, not watching

- **7a. The PLAN's ASK**: *none on this card.* Card 1's multi-select comes just before it.
- **7b. Prediction point**: none in the PLAN. **Proposal** (F4): before s2, ask aloud *"Filtering: where on the path
  would you put it?"*. The room has seen D1·030 card 9's pin, so this is recall. +0.1 min.
- **7c. After**: card 3 opens the gain pin. In Study, done means the four steps were played.
- **7d. Teacher tip** — **Proposal** (F4): *Learners picture "the conditioning circuit" as one box between the sensor
  and the ADC. Ask: which of these seven is not a circuit at all?* (Linearization, in firmware.)
- **7e. Explore**: none.

## 8. Faithfulness (the quality bar)

**Section D, Draw rows**
- [x] Proportions: a block diagram, *not to scale*.
- [x] Line types: `outline` for stages, `thin` for the faint forms and the pin leaders; no construction lines.
- [x] Curves: none.
- [x] Every `say` matches its Flow paragraph (§4a).
- [x] Numbers: module numbers only, each checked against `course.yaml` and the module titles. 040 is *The sensor as a
  source: impedance, dividers and loading* (attenuation is card 7 and buffering card 9). D2·010 is *The code leaves the
  converter: open-drain, pull-ups and I²C*. D2·050 is *Scaling, calibration and the maths that loses your precision*.
  D2·080 is *Isolation and electrical safety*. D3·020 is *Conditioning AC for the ADC: bias, aliasing and the
  anti-alias filter*. All agree with the PLAN and the Flow's p1.

**Mechanism** (the source, `transcripts/Chapter  03 - Signal conditioning.md`, introduction): conditioning includes
amplification, level shifting, filtering, impedance matching, buffering, modulation and demodulation. The card's
statement names seven functions, and the drawing pins those seven. *Impedance matching, modulation, demodulation*
(Flow p0) are not pinned, because the PLAN does not place them (F3).

**A1–A8**: A1 ✓; A2 n/a (a map; each function is shown at its own module); A3 ✓ (*not to scale*); A4, A5 n/a; A6 ✓; A7
✓ (filtering sits where D1·030 card 9 put it; attenuation and buffering sit at SOURCE & LOADING, where D1·040 drew
them); A8 ✓.

## 9. Faults and non-ideal behaviour

**PLAN FAULT**: none on this card.

## 10. Accessibility, legibility and print

- Wall (C2): seven pins on a six-stage path, fewer than D1·020 card 7's eleven. **Check at 1920 × 1080 and 1024 ×
  768** that no label collides (the render staggers the heads in three heights) and that every label reaches the floor.
- Reduced motion (C3): each step lands whole.
- Colour (C4): every pin carries an ink, a numeral, a name and a module number; the four inks also differ in words
  (*met*, *here*, *D2*, *D3*).
- Keyboard (C5): → ← R.
- Print (C8): four stills with their `say`; the last one is the module's conditioning map.

## 11. Assets to make or source

| Asset | Format | Made by | Status |
|---|---|---|---|
| The `pins-060` layer (seven pins) in `course-path.benchdrawing` | Draw library (master) | the author | to make |
| `course-path-060-conditioning.benchdrawing`, the variant with four steps | Draw library | the author | to make |

## 12. Bench capabilities this needs

**Draw Bench** (**exists**): traces and `enter: fade` on the wall (M59d), steps, `say`, `dot` ends, zoom in Study.
**Missing (request it)**: `steps:` / `layers:` on the `drawing` fence (X2); this is the library's eighth variant.

## 13. Stand-in for the lecture

None needed: the Draw Bench plays all four steps today.

## 14. Findings for the owner

- **F1 — SOURCE & LOADING's shape follows D1·040's F1.** This variant draws the stage lane as D1·040 card 1 left it
  (a band on the boundary after SENSOR). If D1·040 F1 is decided differently, this variant follows that decision; the
  pins do not move.
- **F2 (A7) — Where isolation is pinned.** The PLAN gives its module (D2·080), not its place. D2·080's PATH reads
  *SENSOR at the mains*, so this spec pins isolation at SENSOR. In real designs the barrier can sit in conditioning (an
  isolated amplifier) or at the digital interface (a digital isolator or optocoupler, which D2·080's Draw shows). The
  options:
  - (a) at SENSOR, *at the mains · D2·080* (**recommended**: it is where the course meets it);
  - (b) on the boundary between CONDITIONING and ADC;
  - (c) at the digital interface, beside level shifting.
- **F3 — Three functions in the Flow are not pinned.** p0 also names *impedance matching, modulation, demodulation*;
  the statement and the PLAN do not. Leave them unpinned (**recommended**: impedance matching is buffering's job, met
  in 040, and the course never modulates), or add an eighth pin?
- **F4 — Proposals**: the Look for (§1), the recall question before s2 (+0.1 min), and the teacher tip (§7d).
- **F5 — The module runs ≈ 21 min short of its 40** (§2). Reported only; the owner decides.

## 15. Acceptance: how we know it is built right

- The four steps of §4a play on the wall, the presenter's window and Study Mode, each one holding. There are seven pins
  at the stages of §3, each with numeral, name and module, with filtering at the same place as D1·030 card 9's pin.
- B1 one group per press; B2 only the new pins draw; B4 four stills; B5 each `say` on the strip and read in Scope; B6
  each leader grows from its stage; B8 nothing blinks; B12 the wall's strip is not operable; B13 names and module
  numbers only; B14 labels on their pins; B16 the map readable as text; B20 the next `say` and the tip on the strip.
- C2 no collision at 1920 × 1080 and labels at the floor at 1024 × 768; C3 each step whole; C4 the pins told apart in
  greyscale by numeral; C5 → ← R; C6 walked at 320, 768, 1200, 1440, 1920; C7 under 100 ms to first frame; C8 the
  stills with their `say`.
- The variant's ids are the master's. `pins-060` is a new layer and changes nothing in earlier variants.
- E1–E6 for the drawing as presented, checked on the lecture laptop in both themes.
