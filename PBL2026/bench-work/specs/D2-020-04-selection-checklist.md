```yaml
id: D2-020-04-selection-checklist
card: "The selection checklist"
module: notes/Day02/020-external-adcs/en.md
bench: Draw                       # the PLAN's bench: the course path drawing with the checklist pinned to its stages
library: "course-path: the course path drawing, master `course-path.benchdrawing` (D1-010-05 §3a–§3c), played here as a new variant `course-path-d2-020-checklist`: the stage lane of D2·010's variant (`course-path-d2-010-interface`, crossing 517) re-laid in two rows of five columns, with a new layer `pins-020` of nineteen pins, one per checklist line, each hung under the stage where the room meets it. NOT BUILT: the master and D1·090's variant are asked by crossing 511 (open), D2·010's by 517 (open); this variant goes to Benches by a crossing with 511 (owner D3, 2026-10-21), drafted in §12, not written"
dimensions: 2D
stand_in: "a Figure of our own SVG (`figures/d2-020-checklist-path.svg`, §3a's working layout): the nineteen pins as `rect` features, `labels: on-figure`, `reveal: on-tour`, a mirrored tour of twenty stops in the Flow's order (§13)"
optional_benches: []
real_thing: "the course's measurement path as the room has it at 12:30 on Day 2 (quantity to the reference on Day 1, the digital interface at 12:00, firmware and number), with each line of the module's ADC selection checklist placed at the stage of that path where the course teaches it; a block diagram, not to scale, labelled so"
minutes: 2.1                      # on the bench: the Flow, 278 words (§2); the checkpoint takes the wall (widget-focus) and the drawing leaves it
card_minutes: 5.1                 # 2.14 min of Flow + 3.0 min checkpoint (§2)
status: spec-draft                # round two open: F-c4-1 to F-c4-6 (§14)
learner_action: checkpoint
predictions: []                   # none added (§7b)
seeds: []
key_variable: "the stage each checklist line hangs from, and whether that stage is on the path the room walked on Day 1"
time_scale: "none (no motion: one fade per press)"
steps: 21                         # s0 (the path), s1–s19 (one pin per bullet, F-c4-2 (a)), s20 (the count)
```

**Written 2026-10-21 (U020)** after the owner's choices on the U020 brief (*"Apply all recommendations"*, 2026-10-21): **D3**
(a spec for every card; *"card 4's pinned course path goes to the Benches lane as a crossing with 511"*), **D1** (the four parts
named in this module; none is named on this card) and the accuracy findings D2·020-F1 to F7 (applied; none touches card 4's
text). The brief page's `draw4` (`bench-work/previews/u020-preview.html`, *Card 4 · The selection checklist*) is the
approved visual: the course path with the nineteen items pinned to the stage where the room met each, Day 1 stages teal, the
digital interface violet, the later firmware stage amber, power with no stage, and the tally *"16 of 19 on Day 1"*. This
spec follows it and says where it departs (§14): **bandwidth's home is moved** (the brief put it at D1·080; the course teaches
it at D3·020, §8), the boxes carry the course path's stage names rather than module names, the pins arrive one per spoken
bullet, power is drawn neutral, and the lane is laid in two rows so nineteen labels reach the wall's floor. The count the
Flow's claim rests on is unchanged: **16 of 19 lines hang from a stage of the path the room walked on Day 1**. Everything
beyond the PLAN is marked **Proposal** and listed in §14 (round two, open).

**Which library, exactly** (read 2026-10-21, read-only):

- **The course path is the Draw Bench library `course-path`**, master `course-path.benchdrawing`, designed in
  `D1-010-05-measurement-path.md` §3a (stages in their own lane, one layer per lane) and §3c (*"Each is a new item in the
  `stages` layer, so earlier variants never change. Adding a stage re-spaces the stage lane in that module's variant"*, so a
  variant may carry its own spacing).
- **It is not built.** Crossing **511** (`C:\ExSightory\lanes\pbl2026-x\.claude\crossing\open\511-pbl2026-to-benches-the-course-path-master-and-d1-090-card-6-checkpoint.request.md`,
  open) asks for the master and D1·090 card 6's variant; crossing **517** (`…\open\517-pbl2026-to-benches-the-course-path-d2-010-interface-variant.request.md`,
  open) asks for D2·010 card 1's variant `course-path-d2-010-interface`, which adds `s-digital-interface`, the
  `forms-inline` node *digital data* and the gap. Neither covers this card.
- **This variant starts from 517's end state** (its s5: the whole path with DIGITAL INTERFACE), so the room sees the drawing
  it saw at 12:00, re-laid to make room for the pins: the same stage ids, names, order and topology (REFERENCE a side input
  into CONVERSION, D1·090 F2), the stage lane only.
- **Not this card's list**: D3·070 (*"Wrap-up: staged faults, the checklist and Q&A"*) pins a different list, the 23-line
  diagnostic checklist, on *"the Day 1 path drawing, final state with checklist line numbers"*. The two must not be merged;
  the pin layer here is keyed by stage id so D3·070's can reuse the mechanism (§12, *would help*).

## 1. What the room must understand

- **Statement** (verbatim): *ADC selection is a matter of matching the converter to the signal and the measurement objective:
  resolution, rate, bandwidth, accuracy, linearity, noise, reference, input range and impedance, single-ended or
  differential, gain, channels, multiplexing, architecture, latency, power, interface, calibration and environment.*
- **SHOW** (verbatim from the PLAN): *Draw — the course path drawing with the checklist's items pinned to the stages they
  belong to: input impedance → source and loading (D1·040), differential and gain → conditioning (D1·060), acquisition → ADC
  input (D1·070), resolution, noise, linearity → conversion (D1·080), reference → reference (D1·090), interface → digital
  interface (D2·010).*
- **Look for** (verbatim): *almost no item without a home.*
- **Status** (verbatim): *needs Draw: path drawing with checklist pins (reuse the course path drawing)*
- **The PLAN names six homes; the brief homed all nineteen** (approved on the brief), so that the Flow's closing claim,
  *"Almost every line of that list is a stage of the path we walked yesterday, seen from the converter's side."*, can be
  counted on the wall. The PLAN's *acquisition* is not a line of the list; D1·070's stage takes three lines that are
  (channels, multiplexing, latency; latency is our proposal, approved on the brief, verified in §8).
- **Bench and library.** The **bench** is the Draw Bench (M59). The **library** is the course path, `course-path`, loaded as
  its new variant `course-path-d2-020-checklist` (to be built: asked of Benches by the crossing of §12).
- **Insight**: *the checklist is not a new list to memorise: nearly every line of it is a question about a stage of the path
  we already walked, asked from the converter's side; only power has no stage of its own.*
- **Kind of knowledge**: *a picture built up* (one pin per line, on a known drawing). Card test → **Draw**. B15, B17, B18,
  B19 do not apply.
- **Why this bench, not a still**: the claim is a count, and the count is made by the room watching each spoken line land on
  a stage it knows. A still of the finished drawing shows the answer without the matching; the pins arriving as their names
  are spoken make each line's home the thing the room sees (B6, B14).
- **Key variable**: where each line lands.

## 2. Time

The card's Flow is **278 words** (`en.md`, 2026-10-21, counted as the U020 brief counts: whitespace tokens of the ```flow
fence, `[[cue]]` markers removed, `*()` stripped, tokens with a letter or digit; Node). All of it is spoken over the drawing.
**278 ÷ 130 = 2.14 min.** The checkpoint follows the Flow.

| Beat | Words | Seconds | Step |
|---|---|---|---|
| p0 *"Among the important ADC characteristics to consider are:"* | 8 | 3.7 | s0 (the path, no pins) |
| b1 *Resolution* | 9 | 4.2 | s1 |
| b2 *Sampling rate* | 9 | 4.2 | s2 |
| b3 *Bandwidth* | 10 | 4.6 | s3 |
| b4 *Accuracy* | 10 | 4.6 | s4 |
| b5 *Linearity* | 14 | 6.5 | s5 |
| b6 *Noise* | 12 | 5.5 | s6 |
| b7 *Reference accuracy and stability* | 15 | 6.9 | s7 |
| b8 *Input range* | 10 | 4.6 | s8 |
| b9 *Input impedance and loading* | 13 | 6.0 | s9 |
| b10 *Single-ended or differential input* | 18 | 8.3 | s10 |
| b11 *Gain/PGA* | 17 | 7.8 | s11 |
| b12 *Number of channels* | 10 | 4.6 | s12 |
| b13 *Multiplexing* | 12 | 5.5 | s13 |
| b14 *Conversion architecture* | 11 | 5.1 | s14 |
| b15 *Latency* | 15 | 6.9 | s15 |
| b16 *Power consumption* | 6 | 2.8 | s16 (the shortest gap between presses) |
| b17 *Interface* | 13 | 6.0 | s17 |
| b18 *Calibration requirements* | 12 | 5.5 | s18 |
| b19 *Operating environment* | 14 | 6.5 | s19 |
| p20 *"This is why ADC selection is really a matter of…"* | 20 | 9.2 | s19 held |
| p21 *"Almost every line of that list is a stage…"* | 20 | 9.2 | s20 (the count) |
| **Flow, on the bench** | **278** | **128.3 s = 2.14 min** | |
| Checkpoint (after the statement; `widget-focus`, it takes the wall) | | 3.0 min | the brief's figure for a checkpoint |
| **Card total / of which on the bench** | | **5.1 / 2.1 min** | 2.14 + 3.0 |

Each press falls on the first word of its bullet (the bold name), so the twenty presses add no time; the fade is ≈ 0.3 s.
The longest stretch of speech over one held state is p20–p21 (18 s), over the finished drawing (B13). The presses come every
2.8 to 8.3 s (mean 5.6 s over b1–b19): a steady clicker rhythm, not a rush.

**Module check** (`targetMinutes: 30`): the Flow is **2,045 words = 15.7 min** at 130 wpm (cards 231, 414, 45, 278, 396,
331, 350; Node). Activities, at the brief's figures: two POEs and the flash ≈ 1 min each (3), three numerics ≈ 1 each (3),
the poll 1.5, this checkpoint 3 = **10.5 min**; bench moves ≈ 3 min, mostly over speech. **≈ 26.2 min + up to 3 ≈ 29–30 of
30 min**, as the brief estimated. This card adds no unscripted words and no unspoken presses. Reported only; nothing is
trimmed.

## 3. The scene: what is on the bench

### 3a. The variant (`course-path-d2-020-checklist`), from the master's layers

Artboard **1600 × 900** drawing units (16:9, the master's). Ink names from the Draw palette (`teal`, `amber`, `violet`,
`contrast`; fill tint `faint`; `insight-core/src/palette.ts`, read 2026-10-21), never hex. **The stage lane only, in two rows
of five columns at row 1's pitch** (320 units: boxes 270 wide, gaps 50), so that every pin hangs straight under its own
stage. This is a re-layout of 517's lane, not a new path: same ids, names, order and arrows (**Proposal**, F-c4-4). **The
geometry below is the working layout, used for the stand-in and checked by script (no overlap, smallest gap 6 units between
two pins of one stack, every item inside the artboard); Benches fixes the built geometry in its brief**, as it does for 511
and 517 (F-c1-7 (a)).

| Layer | Items (stable ids) | What | Source |
|---|---|---|---|
| `stages` row 1 | `s-quantity` (x 25), `s-sensor` (345), `s-loading` (665), `s-conditioning` (985), `s-adc-input` (1305) | boxes 270 × 110, top at y 20, `teal` `outline`, name in role `label` | the master's ids; D1·090 card 6 §3a |
| `stages` row 2 | `s-conversion` (x 25), `s-digital-interface` (665), `s-firmware` (985), `s-number` (1305) | boxes 270 × 110, top at y 410; DIGITAL INTERFACE `violet`, capitals on two lines, the heavier `outline`; firmware `amber`; number `contrast` | 517; the module's palette (gate 5) |
| `stages` side input | `s-reference` | box 270 × 110 in column 2, top at y 560 (below row 2's line, under where 517 drew *digital data*), `teal`, lower case | D1·090 F2 (a side input, not a stage the code passes through) |
| `stage-arrows` | `sa1`–`sa4` (row 1); `sa5`, the turn: out of ADC input's right edge, down the right margin (x 1590), left along y 388 between the rows, down into CONVERSION's top at x 160; `sa-ref`: up out of REFERENCE (x 400, y 560 → 500), left into CONVERSION's right edge at y 500 | `outline`, `arrow` end, `contrast` | 517 §3a, re-routed for this layout |
| `leg-arrows` | `la-direct` (**new**): CONVERSION → DIGITAL INTERFACE along row 2's line (y 465, x 295 → 665); `la3` → firmware; `la4` → number | `outline`, `arrow` end | 517 (`la1`/`la2` through the *digital data* node are not shown) |
| `pins-020` (**new**) | `p-resolution`, `p-sampling-rate`, `p-bandwidth`, `p-accuracy`, `p-linearity`, `p-noise`, `p-reference-stability`, `p-input-range`, `p-impedance`, `p-single-ended-differential`, `p-gain-pga`, `p-channels`, `p-multiplexing`, `p-architecture`, `p-latency`, `p-power`, `p-interface`, `p-calibration`, `p-environment` | one chip per checklist line: `rect` 270 × 46 (one line) or 270 × 84 (two lines), corner 8, `faint` fill in its stage's ink, outline in its stage's ink; stacked under its stage from 10 units below the box, 6 units apart (table below) | the Flow's nineteen bullets; the homes of §8 |
| `count-020` (**new**) | `c-count` | one line, role `label`, `contrast`, at x 665, y 810 (box 590 × 46): §3a *Labels* | the count, §8 |

**Not shown** from 517: the `forms-inline` node *digital data* and the `gap` layer (stub and note). Card 4 pins stages, and
*digital data* is a form (F-c1-1 (a)); dropping it frees column 2 of row 2 for REFERENCE and puts row 2 on row 1's columns.

**The pins, by stage** (y is the chip's top; one-line chips 46 tall, two-line 84):

| Stage (column) | Pins, top to bottom | Line type | Lowest edge |
|---|---|---|---|
| quantity (1) | accuracy (140) | `outline` | 186 |
| sensor (2) | environment (140) | `outline` | 186 |
| loading (3) | impedance (140) | `outline` | 186 |
| conditioning (4) | single-ended / differential (140, 2 lines); gain / PGA (230); **bandwidth · Day 3 (020)** (282, 2 lines) | `outline`; bandwidth `hidden` (dashed) | 366 |
| ADC input (5) | channels (140); multiplexing (192); latency (244) | `outline` | 290 |
| conversion (1, row 2) | resolution (530); sampling rate (582); linearity (634); noise (686); architecture (738) | `outline` | 784 |
| reference (2, below row 2) | accuracy and stability (680, 2 lines); input range (770) | `outline` | 816 |
| DIGITAL INTERFACE (3) | interface (530) | `outline` | 576 |
| firmware (4) | **calibration · 14:30 (050)** (530, 2 lines) | `hidden` (dashed) | 614 |
| number (5) | none | | |
| *no stage* (5, bottom) | **power · no one stage** (770, 2 lines) | `thin` frame, `contrast`, no fill tint of a stage, no connector | 854 |

Counts: 1 + 1 + 1 + 3 + 3 + 5 + 2 + 1 + 1 + 1 = **19** ✓; on the seven Day 1 stages (quantity to reference) 1 + 1 + 1 + 3 +
3 + 5 + 2 = **16** ✓. The turn's corridor at y 388 clears conditioning's lowest pin (366) and row 2's tops (410) by 22 units
each; the counter (x 665–1255, y 810–856) clears calibration (614) and power (x ≥ 1305).

**Labels, EN · FR** (FR drafts ours, for the owner's review; numbers and module codes untranslated). Stages as 517: quantity
· *grandeur*; sensor · *capteur*; loading · *charge*; conditioning · *conditionnement*; ADC input · *entrée du CAN*;
conversion · *conversion*; reference · *référence*; **DIGITAL / INTERFACE** · *INTERFACE / NUMÉRIQUE*; firmware ·
*micrologiciel*; number · *nombre*. Pins (short key terms, B13; **Proposal**, F-c4-4; the Flow's full bold name is each
step's `say`, §4a):

| Pin | EN | FR |
|---|---|---|
| `p-resolution` | resolution | *résolution* |
| `p-sampling-rate` | sampling rate | *fréquence / d'échantillonnage* (2 lines; check length, §10) |
| `p-bandwidth` | bandwidth / Day 3 (020) | *bande passante / jour 3 (020)* |
| `p-accuracy` | accuracy | *exactitude* (VIM's *exactitude de mesure*) |
| `p-linearity` | linearity | *linéarité* |
| `p-noise` | noise | *bruit* |
| `p-reference-stability` | accuracy and / stability | *exactitude et / stabilité* |
| `p-input-range` | input range | *plage d'entrée* |
| `p-impedance` | impedance | *impédance* |
| `p-single-ended-differential` | single-ended / / differential | *asymétrique / / différentielle* |
| `p-gain-pga` | gain / PGA | *gain / PGA* |
| `p-channels` | channels | *voies* |
| `p-multiplexing` | multiplexing | *multiplexage* |
| `p-architecture` | architecture | *architecture* |
| `p-latency` | latency | *latence* |
| `p-power` | power / no one stage | *consommation / aucune étape seule* |
| `p-interface` | interface | *interface* |
| `p-calibration` | calibration / 14:30 (050) | *étalonnage / 14 h 30 (050)* |
| `p-environment` | environment | *environnement* |
| `c-count` | 16 of 19 on Day 1's path | *16 sur 19 sur le chemin du jour 1* |

The stage carries the rest of each line's name: *accuracy and stability* under **reference** reads *reference accuracy and
stability*; *impedance* under **loading** reads *input impedance and loading*. Two pins say *accuracy*, at two stages, as the
list has two lines that say it.

Legend card: *not to scale*; *each line of the checklist, under the stage where the course teaches it*; *dashed: still to
come* · *pas à l'échelle* ; *chaque ligne de la liste, sous l'étape où le cours l'enseigne* ; *en pointillé : encore à
venir*.

**Fence text** (`drawing` block): `title` EN *The course path: where the checklist lives* · FR *Le chemin du cours : où vit
la liste*; `alt` EN *The course path from the quantity to the number, with each of the nineteen lines of the ADC selection
checklist under the stage where the course teaches it: sixteen on the stages walked on Day 1, the interface at the digital
interface, calibration at the firmware, and power at no one stage.* · FR *Le chemin du cours, de la grandeur au nombre, avec
chacune des dix-neuf lignes de la liste de choix d'un CAN sous l'étape où le cours l'enseigne : seize sur les étapes
parcourues le jour 1, l'interface à l'interface numérique, l'étalonnage au micrologiciel, et la consommation à aucune étape
seule.*; `caption` EN *Not to scale. Almost every line has a stage.* · FR *Pas à l'échelle. Presque chaque ligne a son
étape.*

**Meet the parts** (B3): the room met every stage on Day 1 and DIGITAL INTERFACE at 12:00 (D2·010 card 1); s0 is the
meeting, the path arriving whole.

**Values beside their element**: the module codes and times on the two dashed pins (*Day 3 (020)*, *14:30 (050)*) and the
count (*16 of 19*). Nothing else.

**Colours and their second channel** (C4):

| Thing | Ink | Second channel |
|---|---|---|
| Day 1 stages (quantity to reference) and their pins | `teal` | position: on rows 1 and 2's Day 1 stages; the pin hangs under its own box |
| DIGITAL INTERFACE and its pin | `violet` (the bus, the module's palette; D2·010 card 1 drew it `amber` as that module's new stage) | capitals, two-line name, heavier `outline` |
| firmware and its pin | `amber` (later-today firmware stage) | its name; the pin's time tag *14:30 (050)* |
| A line still to come (bandwidth, calibration) | its stage's ink | `hidden` (dashed) outline and its time tag |
| power | `contrast`, `thin` frame | the words *no one stage*; no connector; apart from every box |
| number, arrows, the count | `contrast` | words |

### 3b. No converter, chip or bus is drawn

The checklist is about any converter; the drawing is the course's path and asserts no case (517 §3b: no chip boundary). The
external converter's `amber` is not used on this card; the four named parts are not on it.

## 4. The run: step by step, as the Flow goes

### 4a. Steps

One pin per bullet (**Proposal**, F-c4-2 (a)): the presenter presses on the bullet's bold name and the pin fades in under its
stage while the name is spoken.

| # | id | Flow (first words) | What changes (`say`) | Press |
|---|---|---|---|---|
| 0 | `s0-path` | p0 *"Among the important ADC characteristics…"* | The course path as the room has it: Day 1's stages, the digital interface, firmware and the number. | (the card opens) |
| 1 | `s1-resolution` | b1 *"Resolution — How finely…"* | Resolution, at the conversion (Day 1, 080). | Next |
| 2 | `s2-sampling-rate` | b2 *"Sampling rate —…"* | Sampling rate, at the conversion (Day 1, 080). | Next |
| 3 | `s3-bandwidth` | b3 *"Bandwidth —…"* | Bandwidth, at the conditioning: the analog path's filter, taught on Day 3 (020). Dashed: still to come. | Next |
| 4 | `s4-accuracy` | b4 *"Accuracy —…"* | Accuracy, at the quantity: what "right" means (Day 1, 020). | Next |
| 5 | `s5-linearity` | b5 *"Linearity —…"* | Linearity, at the conversion: INL and DNL (Day 1, 080). | Next |
| 6 | `s6-noise` | b6 *"Noise —…"* | Noise, at the conversion: what ENOB counts (Day 1, 080). | Next |
| 7 | `s7-reference` | b7 *"Reference accuracy and stability —…"* | Reference accuracy and stability, at the reference (Day 1, 090). | Next |
| 8 | `s8-input-range` | b8 *"Input range —…"* | Input range, at the reference: the code is a ratio to it (Day 1, 090). | Next |
| 9 | `s9-impedance` | b9 *"Input impedance and loading —…"* | Input impedance and loading, at the loading stage (Day 1, 040). | Next |
| 10 | `s10-differential` | b10 *"Single-ended or differential input —…"* | Single-ended or differential, at the conditioning (Day 1, 060). | Next |
| 11 | `s11-gain` | b11 *"Gain/PGA —…"* | Gain, at the conditioning (Day 1, 060). | Next |
| 12 | `s12-channels` | b12 *"Number of channels —…"* | Number of channels, at the ADC input (Day 1, 070). | Next |
| 13 | `s13-multiplexing` | b13 *"Multiplexing —…"* | Multiplexing, at the ADC input: one capacitor, many inputs (Day 1, 070). | Next |
| 14 | `s14-architecture` | b14 *"Conversion architecture —…"* | Conversion architecture, at the conversion: SAR and sigma-delta (Day 1, 080). | Next |
| 15 | `s15-latency` | b15 *"Latency —…"* | Latency, at the ADC input: the window and the conversion each sample waits for (Day 1, 070). | Next |
| 16 | `s16-power` | b16 *"Power consumption —…"* | Power consumption: every stage draws it, so it has no one stage. | Next |
| 17 | `s17-interface` | b17 *"Interface —…"* | Interface, at the digital interface (today, 010). | Next |
| 18 | `s18-calibration` | b18 *"Calibration requirements —…"* | Calibration, at the firmware, later today (050). Dashed: still to come. | Next |
| 19 | `s19-environment` | b19 *"Operating environment —…"*; held over p20 | Operating environment, at the sensor: the quantity never arrives alone (Day 1, 030). | Next |
| 20 | `s20-count` | p21 *"Almost every line of that list…"* | Sixteen of the nineteen lines hang from a stage walked on Day 1. | Next leads to the checkpoint |

The `say` lines are for the strip and Study (B5); the presenter speaks the Flow.

### 4b. Motion, cues and stills

| # | Motion | Movers | Cue and its second channel | Hold | Reduced motion (C3) | Still |
|---|---|---|---|---|---|---|
| 0 | the whole lane fades in (`enter: fade`); the room saw it traced at 12:00 | 1 | the drawing arriving | hold | whole | **s0** |
| 1–19 | the pin fades in under its stage (`enter: fade`, ≈ 0.3 s); nothing else moves | 1 | its stage's ink and its place under that box; the dashed outline and time tag on s3 and s18; *no one stage* on s16 | hold | whole | **s15** (all fifteen lines so far on Day 1 stages), **s19** (all nineteen) |
| 20 | the count fades in | 1 | its words | hold | whole | **s20** |

Four stills (s0, s15, s19, s20; B4). Nothing flashes (B8). No pin is lit or spotlit after it lands: the drawing builds up,
the newest pin is the only change (B2).

## 5. Pacing and interaction, by surface and view

**Who paces** (B12): the presenter on the wall (steps mirrored); the learner in Study Mode and Scope.

| View | Who | Controls |
|---|---|---|
| Preview (in the slide) | everyone | Back · Next · *step n of 21* · *Open details* |
| View (details) | everyone | the step list with each `say`; zoom and pan (Study, Scope) |
| Edit (session only) | everyone; a student's own copy | not specified for the Draw Bench (M59; X6) |
| Authoring | authors | the drawing editor; the variant's steps |

- **The presenter's strip** (B20): the next pin's bold name (*"Next: Linearity"*) so each press falls on the spoken name;
  the teacher tip (§7d); keys → ←.
- **Study / Scope**: the twenty-one steps learner-paced; the four stills; the full bullet name in each `say`.
- **Phone** (C6): the drawing full width, two rows; one finger does nothing on the drawing, two fingers zoom; the step's `say`
  under it carries the line's full name where the chip is too small to read; fallback the four stills.
- **Locked**: nothing.

## 6. The frame

| Tile / panel | Used? | Selected item | List / contents |
|---|---|---|---|
| Steps | yes | the current step's `say` | twenty-one steps; *Stills* |
| Zoom | Study, Scope | *Whole* / % | Fit, −, + |
| Ink | available | — | the presenter's ink and laser (M07-c), not needed by the Drive |

Identity bar: *The selection checklist · ● Holding · step n of 21*. Legend card: §3a.

## 7. Thinking, not watching

- **7a. The PLAN's ASK** (verbatim): *checkpoint (after the statement) — "In pairs: run the checklist on one sensor of your own
  and tick the two items that decide it." items: sensor named | signal size and bandwidth written | two deciding items ticked
  | the converter that follows from them named. depth: create practice: defining problems.* It fires **after the Flow** (the
  Flow has no `[[ask]]`): the presenter presses on from s20, the checkpoint opens and takes the wall (`widget-focus`,
  `stage: 'solo'`, `blockRegistry.ts`, read 2026-10-21), so the drawing leaves the wall while the pairs work. **Proposal**
  F-c4-6: the checkpoint's instructions carry the nineteen lines grouped by stage, so the pairs can tick from what they just
  saw.
- **7b. Prediction point**: none added. A *"where does this line live?"* before each pin would put nineteen questions into a
  2-minute list; the checkpoint is the card's thinking.
- **7c. After**: in Study, done means s20 reached and the checkpoint answered.
- **7d. Teacher tip** (**Proposal**, F-c4-6; presenter only, never on the wall): *Expect pairs to tick resolution first: card
  3 just warned against it. Ask what their signal requires: how big (gain, input range), how fast (sampling rate,
  bandwidth), from what source (impedance), wired how (single-ended or differential). "Bandwidth" here can be written as how
  fast the signal changes, a few hertz for a slow sensor; the full idea is Day 3 (020).*
- **7e. Explore**: none.

## 8. Faithfulness (the quality bar)

### 8a. The homes, verified (grep of `notes/Day01/` and `notes/Day02/`, 2026-10-21)

| Line | Home (stage · module) | Where the module teaches it | Verdict |
|---|---|---|---|
| Accuracy | quantity · D1·020 | card *Accuracy is not precision* (l. 223) | ✓ |
| Operating environment | sensor · D1·030 | *The quantity never arrives alone* (l. 341), *Defending the sensor against interference* (l. 383); temperature and supply drift of the reference also at D1·090 (l. 159) | ✓ |
| Input impedance and loading | loading · D1·040 | *Loading: the measurement changes the measurand* (l. 197); the maximum source impedance again at D1·070 (l. 278) | ✓ |
| Single-ended or differential | conditioning · D1·060 | *Differential gain: amplify the difference* (l. 212) | ✓ |
| Gain/PGA | conditioning · D1·060 | *Amplification, and undoing it* (l. 90), *Negative feedback sets the gain* (l. 113); the PGA itself is card 5 today | ✓ |
| Number of channels | ADC input · D1·070 | *One capacitor, many inputs* (l. 241: *"A multi-channel ADC is usually one conversion system with a multiplexer in front of it"*) | ✓ |
| Multiplexing | ADC input · D1·070 | the same card | ✓ |
| Latency | ADC input · D1·070 | not by name on Day 1 (no Day 1 module uses *latency*, *conversion time* or *delay*); in substance at *Fix one: a longer acquisition time*: *"If the conversion itself takes 1 µs, a 1 µs window allowed 500,000 samples a second"* (l. 363), the time each sample waits before it is a code. The word arrives at D2·040, *What each filter costs in latency* (l. 335), for the firmware's filters, a different delay. | ✓ (our proposal, approved; the `say` names the window and the conversion) |
| Resolution | conversion · D1·080 | *Resolution: how many levels* (l. 86) | ✓ |
| Sampling rate | conversion · D1·080 | *When, and which level* (l. 63: *"the number of samples per second is the **sampling rate**"*) | ✓ |
| Bandwidth | **moved: conditioning · D3·020** (the brief: conversion · D1·080) | D1·080 uses the word once, as a property of the signals sigma-delta suits (*"precision measurement of relatively low-bandwidth signals"*, l. 288), and never defines it. D3·020's card *Bandwidth is not sampling rate* (l. 86) teaches it, with the analog input's full-power bandwidth (its PLAN), and D3·020's PATH is *"[ CONDITIONING → (SAMPLING) ]"*; D1·060 names filtering as conditioning's Day 3 job (*"filtering (Day 3·020)"*, l. 69). | **moved** (F-c4-1) |
| Linearity | conversion · D1·080 | *The table everyone scrolls past* (l. 304: offset, gain, INL, DNL) | ✓ |
| Noise | conversion · D1·080 | *ENOB: the honest number of bits* (l. 360; SINAD, *"noise and distortion"*, l. 391); D2·030 at 13:00 takes it further | ✓ |
| Conversion architecture | conversion · D1·080 | *SAR: a binary search* (l. 225), *Sigma-delta: fast and coarse, then filtered* (l. 266) | ✓ |
| Reference accuracy and stability | reference · D1·090 | *Reference error is measurement error* (l. 84), *VDD: the default, and usually the worst* (l. 126; *"drifts with temperature"*, l. 159) | ✓ |
| Input range | reference · D1·090 | *A code is a ratio to the reference* (l. 38: *"an input range from **0 V to 3.3 V**"*); also D1·060's card 1 (*"outside the ADC's input range"*) | ✓ (the line's *safely* half, absolute maximum ratings, is not taught on Day 1; the pin claims only where the range was met) |
| Interface | DIGITAL INTERFACE · D2·010 | the whole of the last module | ✓ |
| Calibration requirements | firmware · D2·050 (14:30) | *Calibration: compare with a known reference* (l. 302); previewed on Day 1 at D1·080 (*"Offset and gain tell you what calibration will have to fix"*, l. 354) and D1·060 (*"we do that tomorrow"*, l. 360) | ✓ |
| Power consumption | no stage | Day 1 meets it only as a motive in two staged faults (*"to save battery"*, D1·040 l. 327, D1·070 l. 170) | ✓ |

**The Flow's claim, by count.** *"Almost every line of that list is a stage of the path we walked yesterday."* The path walked
on Day 1 runs from the quantity to the reference (D2·010 p0: *"Yesterday we walked the path from the quantity all the way to
the converter's reference"*). Lines hanging from those seven stages: **16 of 19 (84 %)**, the moved bandwidth included (its
stage, conditioning, was walked on Day 1). Lines also *taught* on Day 1: **15 of 19 (79 %)**. Off yesterday's path: interface
(a stage since 12:00), calibration (firmware, drawn on Day 1 but not walked; counted with it, 17 of 19) and power (no stage).
*"Almost every"* holds on every reading ✓. The PLAN's *"almost no item without a home"*: 1 of 19 (power) ✓. The brief's
*"16 of 19 on Day 1"* stands as a count of stages; by module it is now 15 (bandwidth is taught on Day 3).

### 8b. Checks

**Numbers** (recomputed, Node 2026-10-21): 19 lines in the Flow and 19 in the statement (resolution, rate, bandwidth, accuracy,
linearity, noise, reference, input range, impedance, single-ended or differential, gain, channels, multiplexing,
architecture, latency, power, interface, calibration, environment) ✓, in the same order ✓; pins per stage 1 + 1 + 1 + 3 + 3
+ 5 + 2 + 1 + 1 + 1 = 19 ✓; on Day 1 stages 16 ✓; 16 ÷ 19 = 0.842, 15 ÷ 19 = 0.789 ✓; D2·050 at 14:30 and D3·020 on Day 3 at
12:35 (`course-organization.md`, Day 2 row 5 and Day 3 row 2) ✓; card Flow 278 words = 2.14 min, module 2,045 = 15.73 min ✓.

**Section D, Draw rows**
- [x] Proportions: a block diagram, *not to scale* on the legend card.
- [x] Line types: `outline` for boxes, arrows and taught pins; `hidden` for the two lines still to come; `thin` for power's
  frame.
- [x] Curves: none.
- [x] Every `say` matches its bullet (§4a); the Flow's wording is the `say`'s, shortened only to its name.
- [x] No construction line left after the last step.
- [x] Numbers on the drawing recomputed (above).

**A1–A8** (on the owner's current text and this spec):
- A1 ✓ (the counts and times above). A2 n/a (no converter model on this card). A3 ✓: *"almost"* at 16 of 19; the edge cases
  are the three off-path lines, each drawn as what it is (a new stage, a later stage, no stage).
- A4 ✓: every home checked against its module (8a); *"yesterday"* is Day 1 (Sat 10 Oct; this is Day 2, Sun 11 Oct) ✓; the path
  as D2·010 card 1 left it ✓; D3·070's list is a different one and is not drawn here ✓.
- A5 ✓: bandwidth at the analog path's conditioning, where the anti-alias filter sets it (D3·020); REFERENCE a side input into
  CONVERSION (D1·090 F2); latency at the ADC input, where the course shows the time a sample takes (a sigma-delta's latency is
  its digital filter's, at the conversion; this card's converter is the course's SAR).
- A6 ✓: *"almost every"* and *"almost no item"* hold; *no one stage* for power claims only that it has no stage of its own
  (every active stage draws supply current), not that power is off the path.
- A7 ✓: sources are the modules' own lines (8a) and `course-organization.md`. A8 ✓: Draw rows above.
- **Our own error, fixed before sending** (gate 3, gate 5): the brief page homed bandwidth at D1·080; §8a moves it (F-c4-1).
- **Owner's text**: no **accuracy** finding. The Flow's claim and the PLAN's Look for are true by count; the PLAN's six homes
  agree with 8a; the PLAN's *acquisition* is not a line of the list (noted on the brief, no wording change asked).

**Simplifications and their on-bench labels** (A6): *not to scale*; *each line of the checklist, under the stage where the
course teaches it* (one home per line, where a line touches several stages, e.g. noise at every stage, D2·030); *dashed:
still to come*.

## 9. Faults and non-ideal behaviour

**PLAN FAULT**: none on this card. Nothing non-ideal is drawn.

## 10. Accessibility, legibility and print

- Wall (C2): every label at the wall's floor at 1920 × 1080 and 1024 × 768, EN and FR (the compiler warns, D12.16). A
  270-unit chip holds about 13 characters a line at the floor (517 §10's estimate: *conditioning*, 12, fills a 270 box); the
  pin labels were cut to key terms for that (F-c4-4). **To check on the render**: *sampling rate* (13), *multiplexing* (12),
  *architecture* (12), *single-ended /* (14) in EN; *d'échantillonnage* (17) and *aucune étape seule* (18) in FR, which may
  need a hyphenated break (*d'échan- / tillonnage*) or a third line (power's chip then 122 tall, top at y 770 → 892 ≤ 900).
  Wrap, don't shrink (gate 6).
- Reduced motion (C3): every step is a fade; each lands whole.
- Colour (C4): stage by position under its box as well as ink; still-to-come by dash and time tag; power by words and by
  standing apart; checked under protanopia, deuteranopia, tritanopia on the render (teal against violet and amber).
- Keyboard (C5): → ←.
- Print (C8): s0 and s20, with the nineteen `say` lines as a list grouped by stage.
- Languages: every label, note, `say` and the count `{en, fr}`; FR drafts ours, marked for review.

## 11. Assets to make or source

| Asset | Format | Made by | Status |
|---|---|---|---|
| `course-path.benchdrawing`, the master, with 517's `s-digital-interface` | Draw library | the Benches lane | asked by 511 and 517 (open) |
| `course-path-d2-020-checklist.benchdrawing`, this variant: layers `stages`, `stage-arrows`, `leg-arrows` (`la-direct` new), `pins-020` (new), `count-020` (new); 21 steps; EN and FR; stills s0, s15, s19, s20 | Draw library (variant) | the Benches lane | to ask by the crossing of §12 (D3) |
| `figures/d2-020-checklist-path.svg` and its `figure` block, the stand-in (§13), from §3a's working layout | SVG + Figure block | this project | to make if the variant is late |
| FR labels (§3a) | text | the owner (review) | drafts |

## 12. Bench capabilities this needs

- **Draw Bench** (M59): `rect` and text items, role `label`, `enter: fade`, steps with `say`, `step` mirrored — **exist**
  (517 §12; `drawingBlock.ts`). Inks `teal`, `amber`, `violet`, `contrast`, fill tint `faint`, line types `outline`, `thin`,
  `hidden` — **exist** (`insight-core/src/palette.ts`, `drawing/schema.ts` `LINE_TYPES`, `FILL_TINTS`, read 2026-10-21).
- **One master, variants by layers** (X2) — **missing**, listed; until then the variant file.
- **The library** — **missing**: this variant by the crossing below.
- **Not needed**: IEC symbols (no circuit on this drawing); ink.

**For the Benches lane: the crossing (D3).** The owner decided on 2026-10-21 (D3) that this drawing goes to Benches **as a
crossing with 511**. The spec does not write it. What it must ask for, exactly:

1. **The variant** `course-path-d2-020-checklist` of the course path, for D2·020 card 4 *"The selection checklist"*
   (`notes\Day02\020-external-adcs\en.md`), described by this spec (§3a, §4a–§4b, §10, §13); **built on 511's master and on
   517's variant** (`course-path-d2-010-interface`), whose stage ids, names (EN and FR) and topology it keeps.
2. **The re-layout** of §3a: the stage lane only, two rows of five columns at pitch 320 (row 1 at y 20, row 2 at y 410),
   REFERENCE below row 2 in column 2 with its side arrow into CONVERSION's right edge, the turn routed between the rows into
   CONVERSION's top, *digital data* and the gap not shown, a direct arrow `la-direct` CONVERSION → DIGITAL INTERFACE.
   **Benches fixes the built geometry in its brief, with 511's and 517's** (one brief for the three variants), keeping: every
   pin straight under its own stage; no arrow crossing a pin or another arrow; every label at the wall's floor in EN and FR.
3. **This module's inks**: Day 1 stages and their pins `teal`; DIGITAL INTERFACE `violet` (517 drew it `amber`); firmware
   `amber`; number, arrows and the count `contrast`; reference lower case, `teal`.
4. **A new layer `pins-020`**: the nineteen chips of §3a's table (ids, EN and FR labels, sizes, stacking, stage ink),
   `outline` for taught lines and `hidden` for bandwidth (*Day 3 (020)*) and calibration (*14:30 (050)*); `p-power` in a
   `thin` `contrast` frame, *no one stage*, with no connector, apart from every box.
5. **A new text item `c-count`**: *16 of 19 on Day 1's path* · *16 sur 19 sur le chemin du jour 1*, at s20.
6. **Twenty-one steps** s0–s20 with the `say` of §4a, in the Flow's order (one pin per bullet, F-c4-2), `enter: fade`; the
   legend card and fence text of §3a.
7. **Stills** s0, s15, s19, s20 in `shots/`, English and French.
8. **Real values**: none beyond the words, the counts (19, 16) and the two times (D2·050 at 14:30, D3·020 on Day 3), all
   from the course's files (`course-organization.md`; §8a).
9. **What stands in until it lands**: §13 (a Figure tour of our SVG).
10. **When the course needs it**: in lecture order, after 517's variant (D2·010 card 1, 12:00) and before D2·020 card 4
    (12:30); no date pressure beyond lecture order.
11. **Would help, not required**: the pin layer keyed by stage id, so D3·070's *"Day 1 path drawing, final state with
    checklist line numbers"* (its own 23-line list) can reuse the mechanism without a new design.
12. **Gates and rules**: the six gates and ExSight's bench design rules bind; the spec departs from neither. Brief the owner on
    the design before building, as always.

Whether that is a new crossing naming 511 and 517 or an addition to 511 is F-c4-5.

## 13. Stand-in for the lecture

Until the variant is built: **a Figure** of our own SVG, `figures/d2-020-checklist-path.svg`, drawn from §3a's working
layout (stages, arrows, the nineteen chips and the count, in the same inks and line types). The `figure` block: one `rect`
feature per chip and one for the count, `labels: on-figure`, **`reveal: on-tour`**, and a mirrored `tour` of twenty stops in
§4a's order (s1–s20), so a pin's name appears when its stop is reached and stays (`nameShown`: shown when its tour index ≤
the current step; `canvas/src/figureTypes.ts`, read 2026-10-21). The presenter presses on each bold name as on the target.

- **It shows**: the path, every line's name landing at its stage in the Flow's order, the dashed lines still to come, power
  apart, the count at the end.
- **It loses**: the chips' outlines are drawn from s0 (the Figure draws a feature's mark from the start; `reveal` withholds
  names only), so the room sees nineteen empty slots before the list begins and the stacks' sizes before the names (B6
  partly); the `say` per step in Study becomes the tour stop's `note`. Checks lost: B2 partly (the empty slots), B6 partly.
- **The Flow**: unchanged.
- The SVG is drawn from the variant's layout, so nothing is designed twice; the build replaces it.

## 14. Findings for the owner

No **accuracy** finding in the owner's text on this card (§8b). Six items, all open (round two); each recommended option is
(a).

- **F-c4-1 — Bandwidth's home: moved from conversion (D1·080) to conditioning (D3·020).** The brief page put it at D1·080.
  D1·080 uses the word once and never teaches it; D3·020 teaches it (*Bandwidth is not sampling rate*) at its
  conditioning-and-sampling stage, and D1·060 names filtering as conditioning's Day 3 job (§8a). The count on yesterday's
  stages stays 16 of 19; taught on Day 1 becomes 15. `course-organization.md`'s transcript map (*"Sampling, bandwidth,
  quantization, resolution, architectures → D1·080"*, Chapter 07 row) says the same as the brief and would be corrected to
  match (ours, not the owner's text). Options: (a) conditioning, dashed, *Day 3 (020)* (**recommended**); (b) the ADC input,
  dashed (the converter's own input bandwidth, which D3·020's datasheet extract shows); (c) keep the brief's conversion
  (D1·080), solid: not recommended, the room was not taught it there.
- **F-c4-2 — Proposal: how the pins arrive.** Options: (a) **one pin per bullet**, pressed on each bold name (19 presses, every
  2.8–8.3 s), the count only at s20 on *"Almost every line…"* (**recommended**: each name lands where it lives as it is
  spoken, B6, B14, and the count arrives with the sentence that claims it); (b) one per bullet with a running count, as the
  brief's `draw4` (a number ticking through the list is a second thing to watch, B2); (c) grouped by stage in path order, as
  `draw4`'s ten steps: the pins would arrive out of the spoken order, or need ≈ 0.7 min of unscripted lines after the list;
  (d) all at once on p21: the matching is lost.
- **F-c4-3 — Proposal: power drawn neutral.** The brief drew it `rose`, which this module keeps for a fault. Options: (a)
  `contrast`, a `thin` frame, the words *no one stage*, no connector, apart from every box (**recommended**: what it says is
  that every stage draws power, so none owns it); (b) `rose` as the brief.
- **F-c4-4 — Proposal: fitting nineteen pins at the wall's floor.** Nineteen labels and ten stages do not fit 517's geometry
  at the floor (C2). Options: (a) short key terms on the chips (§3a's table; the full name in each `say`), and the lane re-laid
  in two rows of five columns with *digital data* and the gap not shown, REFERENCE below row 2 (**recommended**; Benches fixes
  the geometry); (b) the Flow's full bold names on the chips (two to three lines each; the conversion's five pins would not
  fit under its box); (c) line numbers on the stages and the names in a key, as D3·070 plans for its own list (a separate
  legend for names, B14).
- **F-c4-5 — The crossing's form (D3: *"as a crossing with 511"*).** 511 is open and scoped to the master and D1·090's
  variant; 517 added D2·010's as a new crossing building on it. Options: (a) **a new crossing** for this variant naming 511
  and 517 as what it builds on, the twelve points of §12 (**recommended**: one need per request, as 517); (b) an addition to
  511, only if Benches has not started on it.
- **F-c4-6 — Proposals: the checkpoint's list, and the teacher tip.** The checkpoint takes the wall when it opens
  (`widget-focus`), so the pinned path leaves it while the pairs tick *"the two items that decide it"*. Options: (a) the
  checkpoint's instructions carry the nineteen lines grouped by stage (one line per stage, the short names of §3a), and the
  teacher tip of §7d (**recommended**); (b) the tip only; the pairs work from memory; (c) neither. The PLAN's prompt and items
  stay verbatim in (a); the list is added after them.

## 15. Acceptance: how we know it is built right

- s0 shows the lane whole (row 1, the turn, CONVERSION with REFERENCE feeding it, DIGITAL INTERFACE in violet, firmware in
  amber, number); s1–s19 each add one pin under its stage as §4a, in the Flow's order; s20 adds the count; on the wall, the
  presenter's window and Study.
- The pins match §3a's table: 19 in all, 16 under the seven Day 1 stages, bandwidth and calibration dashed with their time
  tags, power apart with *no one stage*; the count reads *16 of 19 on Day 1's path*.
- Stage ids, names and arrows are 517's; the geometry is the one Benches fixes in its brief with 511 and 517.
- B1 one pin per press; B2 only the new pin changes; B3 the path met at s0; B4 four stills; B5 each `say` on the strip; B6 the
  pin lands as its name is spoken; B8 nothing flashes; B12 the wall's strip not operable; B13 key terms only on the drawing;
  B14 each pin at its stage; B20 the next pin's name on the strip.
- C2 every label at the floor at 1920 × 1080 and 1024 × 768, EN and FR (§10's list checked); C3 whole; C4 position, dash,
  words; C5 → ←; C6 at 320 px with the `say` under the drawing; C8 s0 and s20 with the list.
- E1–E6 for the drawing as presented, both themes, EN and FR.
- The stand-in (§13) run on the lecture laptop before the day: twenty stops, names accumulating, legible.
- **Six gates (this spec)**: (1) realism ≥ 95 %: the course's own path as a labelled block diagram, *not to scale*, each line
  at the stage where the course teaches it ✓; (2) science 100 %: every home verified against its module (§8a), bandwidth
  moved to where it is taught, power not forced onto a stage, REFERENCE where it acts ✓; (3) maths 100 %: 19, 16, 15, 84 %,
  79 %, the times and the word counts recomputed (Node), the layout checked by script ✓; (4) visualization and intuition
  100 %: each name lands on its stage as it is spoken, the count arrives with the claim, dashes mark what is still to come ✓
  (stand-in partial, §13); (5) consistency and coherence: 517's ids and names, the module's palette (DIGITAL INTERFACE violet
  here, named against D2·010's amber), D3·070's list kept separate, the brief's bandwidth error fixed and named ✓; (6)
  professional design: two rows at row 1's pitch, no overlap, labels cut to the floor in EN and FR ✓ on paper, the FR lengths
  of §10 to check on the render.
