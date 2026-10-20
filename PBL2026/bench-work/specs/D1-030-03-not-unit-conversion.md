```yaml
id: D1-030-03-not-unit-conversion
card: "Transduction is not unit conversion"
module: notes/Day01/030-sensing/en.md
bench: Plot                       # exists
library: "thermocouple-two-junctions: a Plot (output against the hot junction's temperature, sliders T_hot and T_cold, the output now as a level line), defined in the card's `plot` block"
dimensions: 2D
stand_in: none                    # the Plot plays every step today; the moving operating point is drawn as a level line until X13
optional_benches: []
real_thing: "a type K thermocouple near room temperature, its hot junction at 100 °C and its cold (reference) junction at 25 °C, then 35 °C: 3.08 → 2.67 mV on the linear approximation (3.10 → 2.69 mV from the NIST table)"
minutes: 1.8                      # on the bench: the Plot is up from the reveal to the end of the card; driven 0.4 of it
card_minutes: 2.7
status: spec-draft
learner_action: poe
predictions: [poe]                # the PLAN's poe fires before the card; s1 reveals it
seeds: []
key_variable: "T_cold, moved while T_hot is held: the output changes with the quantity we meant to measure standing still"
time_scale: "none (a relation, not motion)"
steps: 2                          # s0–s1 (+ s2, proposal)
```

The Plot's format is as read for U011 (`plotBlock.ts`, 2026-10-08): parameters become sliders, curves are
expressions, markers sit at fixed numbers, and a plot has no steps, no reveal and no presenter strip. This
spec's steps are the presenter's slider settings (as `D1-020-05-accuracy-precision.md`).

## 1. What the room must understand

- **Statement** (verbatim): *A thermocouple is not doing °C → volts the way we do metres → feet. It responds
  to a physical phenomenon with another physical quantity that is related to it.*
- **SHOW** (verbatim from the PLAN): *Plot — thermocouple output V = S·(T_hot − T_cold) with S ≈ 41 µV/°C
  (type K near room temperature; a linear approximation, and say so), sliders T_hot and T_cold.*
- **Drive** (verbatim): *T_hot = 100 °C, T_cold = 25 °C (≈3.08 mV); move T_cold to 35 °C (≈2.67 mV).*
- **Look for** (verbatim): *the output moving with nothing changed at the end we care about.*
- **Status** (verbatim): *ready.*
- **Bench and library.** The **bench** is the Plot Bench (viewer, sliders, readout). The **library** is this
  card's `plot` block: the curves, the two sliders, the marker.
- **Insight**: *a unit conversion depends only on the number converted; a thermocouple's voltage changed
  while the temperature we meant to measure stood still, because it answers to the difference between two
  junctions.*
- **Kind of knowledge**: *a relation between quantities* (V against T_hot and T_cold), shown as *a contrast
  between two states* (T_cold at 25 °C and at 35 °C). Card test → **Plot**. **B17 applies**: both states
  visible at once (the start line kept, §3). B15, B18, B19 do not.
- **Why this bench, not a still**: the Look for is about *moving* one slider and watching a value change
  while another stays put. A still of two lines invites "the sensor was hotter"; the drag shows the hot end
  never moved.
- **Key variable**: T_cold, with T_hot held.

## 2. Time

The card's Flow is 203 words, all spoken: **1.56 min**. The poe is the card before (an activity placed before
the statement is the predict-first order); its question is this Flow's p0.

| Beat | Minutes | Source of the number |
|---|---|---|
| The poe card: Flow p0 *"[[ask]] When a thermocouple turns a temperature into a voltage…"* (21) | 0.16 | 21 ÷ 130 |
| poe answer window (two options) and the room's commitment | 0.75 | estimate, as D1·020's flash |
| s0–s1 on the Plot: the presenter's lines (≈ 45 words, unscripted: *"Hot junction at 100, cold at 25: 3.08 millivolts. Now I warm only the cold end, to 35. The hot end has not moved, and the output falls to 2.67. A unit conversion could never do that."*), two settings ≈ 3 s | 0.40 | 45 ÷ 130 + 6 s |
| s1 held: p2 *"A sensor responds to a physical quantity…"* (13), p3 the list (69), p4 *"This process is called transduction…"* (66), p5 *"A transducer is not necessarily…"* (34) | 1.40 | 182 ÷ 130 |
| **Card total / of which on the bench** | **2.7 / 1.8** | the Plot is up from s0 (1.8); driven for 0.4 |

**Module check**: D1·030's table is in `D1-030-01-electricity-only.md` §2 (23.4 of 25 min).

## 3. The scene: what is on the bench

### 3a. The Plot (`thermocouple-two-junctions`)

| id | Item | Value | Source |
|---|---|---|---|
| `variable` | `x`, the hot junction's temperature | domain 0–200 °C | covers the Drive (100 °C) and the proposal s2 (§7b) |
| axis x | *Hot-junction temperature T_hot (°C)* | ticks every 25 °C | |
| axis y | *Output (mV)* | `range: [-2, 8]` | holds 0.041 × (200 − 25) = 7.18 mV and the line's negative end at x = 0 |
| `th` | slider *T_hot, the junction we meant* | 0–200 °C, step 1, default **100**, unit °C | the PLAN |
| `tc` | slider *T_cold, the reference junction* | 0–100 °C, step 1, default **25**, unit °C | the PLAN; 100 °C reaches the proposal s2 |
| curve `transfer` | `0.041*(x - tc)`, `teal`, solid, label *output at this T_cold (linear, S = 41 µV/°C)* | | the PLAN's V = S·(T_hot − T_cold), drawn for every T_hot |
| curve `now` | `0.041*(th - tc)`, `amber`, solid, label *output now: S·(T_hot − T_cold)* | | a level line at the current output; it crosses `transfer` at x = T_hot (§14 F2) |
| curve `start` **Proposal** (F3) | `0.041*(x - 25)`, `violet`, dashed, label *the line at T_cold 25 °C* | | keeps the start state on the plot after T_cold moves (B4, B17) |
| marker `m-hot` | `axis: x`, `at: 100`, label *T_hot = 100 °C, held* | | the Drive's held end |
| marker `m-start` **Proposal** (F3) | `axis: y`, `at: 3.075`, label *3.08 mV at the start* | | the Drive's first value |
| `fixedView` | true | | the framing is the point (both values on screen) |

The `now` curve never uses `x`, so the compiler warns that it draws flat (`plotBlock.ts`: *"a marker on the y
axis says it more clearly"*). The flat line is deliberate: it is a level that moves with both sliders, which
a y marker (a fixed number) cannot do. Request X13 asks for a marker whose position is an expression.

Layout as rendered in `bench-work/previews/d1-030-03-thermocouple.svg` (step s1).

**Meet the parts** (s0, B3): the presenter names the x axis (*the temperature we meant to measure*), the two
sliders (*the hot junction, at the thing; the cold junction, at the terminals*), and the line (*the voltage
for every hot-end temperature, at this cold end*).

**Values beside their element** (B14, B16): slider values in °C beside each slider; the readout (hover) gives
x and y to 3 significant figures (mV); the marker's label carries 100 °C; the presenter reads 3.08 and 2.67
mV aloud from the crossing (the readout shows them).

**Labels**: curve labels in the legend; the marker's label on its line.

**Colours and their second channel** (C4): `transfer` teal solid with its legend words; `now` amber solid and
horizontal (its shape is its channel); `start` violet **dashed**; the marker contrast ink with its label.

## 4. The run: step by step, as the Flow goes

### 4a. Steps (the presenter's slider settings)

| # | id | Flow paragraph | What changes: the step's one sentence (`say`) | Settings | Presenter's control |
|---|---|---|---|---|---|
| 0 | `s0-start` | after the poe's commitment (unscripted) | Hot junction at 100 °C, cold junction at 25 °C: the output is 3.08 mV. | th 100, tc 25 (defaults) | (the Canvas is up) |
| 1 | `s1-cold-moves` | (unscripted); held for p2–p5 | Only the cold junction warms, to 35 °C: the output falls to 2.67 mV while the hot end, the one we meant to measure, stays at 100 °C. | tc 35 | slider T_cold only |
| 2 | `s2-same` **Proposal** (F3) | (unscripted, ≈ 15 words) | Both junctions at 100 °C: no output at all, though the hot end is as hot as ever. | tc 100 | slider T_cold only |

s1 moves **only T_cold**: the `transfer` line slides right by 10 °C, the `now` level drops 0.41 mV, and the
crossing stays on the 100 °C marker. That is the Look for.

### 4b. Motion, cues and stills

| # | Motion | Movers | Cue | Hold | Reduced motion | Still |
|---|---|---|---|---|---|---|
| 0–2 | the `transfer` line and the `now` level follow the T_cold slider as it is dragged (no animation authored) | 1 (linked: both are one function of `tc`) | the slider moving and the level dropping together; the crossing stays on the marker | hold | each setting lands whole (the presenter steps the slider with the arrow keys) | one per step, captured for print (§10) |

No `animate` block (it would move without the presenter, B1). Nothing flashes.

## 5. Pacing and interaction, by surface and view

**Who paces**: the presenter, on the wall. Today the Plot's sliders are local to each window: the presenter
drags them on the wall window, and they are not pushed to devices (as `D1-020-05` §5; request X12).

| View | Who | Controls |
|---|---|---|
| Preview (in the slide) | everyone | the curves; the two sliders; readout on hover |
| View (details) | everyone | the same, larger; zoom and pan off (`fixedView`) |
| Edit (session only) | everyone | not specified for the Plot Bench |
| Authoring | authors | the `plot` block's YAML |

- **The presenter's strip** (B20): missing today; the settings and `say` lines go in the presenter's notes
  (X12).
- **Study Mode and Scope**: both sliders free after the guided pass (§7e).
- **Phone**: the plot on top, then T_cold, then T_hot (44 px), then the step's sentence.
- **Locked**: nothing can be locked on a Plot today. **Proposal**: T_hot locked at 100 °C for the guided pass
  (it is the held end), freed in Study (needs X12's presets).

## 6. The frame

The Plot's viewer frame (D4.10–4.12): title *A thermocouple's two junctions*; the legend (teal solid, amber
level, violet dashed); the sliders under the plot; the readout. The legend card adds *linear approximation:
S = 41 µV/°C, type K near room temperature* (A6).

## 7. Thinking, not watching

- **7a. The PLAN's ASK** (verbatim): *poe (before the statement) — "When a thermocouple turns a temperature
  into a voltage, is it converting units, the way we convert metres into feet?" · options: yes — a fixed
  factor turns °C into millivolts | no — it makes a different quantity, which depends on more than the
  temperature we meant · answer: no · reveal: the Plot below, with the hot junction held at 100 °C while the
  cold junction moves. · explain: A unit conversion depends only on the number being converted; this voltage
  changed while the temperature we meant to measure stood still, because a thermocouple responds to the
  difference between two junctions. · depth: understand · practice: constructing explanations.* It fires on
  its own card **before s0**; **s1 reveals it**.
- **7b. Prediction point**: the poe is the card's. **Proposal** (F3): before s2, asked aloud: *"What will it
  read with both junctions at 100 °C?"* (+0.3 min with s2's line).
- **7c. After**: the explain, read with s1 on the wall. In Study, done = the poe answered and T_cold moved.
- **7d. Teacher tip** — **Proposal** (F3): *Those who answered "yes" think of S as a conversion factor. Ask:
  if it were one, what would T_cold have to do with it?*
- **7e. Explore** (B11): both sliders in Study, after the guided pass. One thing to try, in the step's text:
  *put T_cold above T_hot*: the output goes negative.

## 8. Faithfulness (the quality bar)

**Arithmetic** (S = 0.041 mV/°C, the PLAN's):
- s0: 0.041 × (100 − 25) = **3.075 mV** → 3.08 mV ✓ (the PLAN's ≈3.08).
- s1: 0.041 × (100 − 35) = **2.665 mV** → 2.67 mV ✓ (the PLAN's ≈2.67). The change: 0.041 × 10 = 0.41 mV.
- s2 (proposal): 0.041 × 0 = 0 mV.
- The line crosses zero at x = T_cold: 25 °C at s0, 35 °C at s1 (a second view of the same fact).

**Against the real thermocouple** (NIST ITS-90 type K reference function, 0–1372 °C; the polynomial with its
exponential term, evaluated here): E(25) = 1.000 mV, E(35) = 1.407 mV, E(100) = 4.096 mV, E(200) = 8.139 mV.
- s0: 4.096 − 1.000 = **3.096 mV** (linear 3.075: −0.021 mV, −0.7 %).
- s1: 4.096 − 1.407 = **2.689 mV** (linear 2.665: −0.024 mV).
- Over the plot (T_hot 0–200, T_cold 25): the linear line stays within **0.04 mV** of the table (at 200 °C:
  8.139 − 1.000 = 7.139 vs 7.175).
- The Seebeck coefficient at 25 °C is 40.5 µV/°C (the table's slope); 41 µV/°C is the average from 25 to
  100 °C (3.096 / 75 = 41.3 µV/°C). *S ≈ 41 µV/°C* is honest for this range.
- A table curve was rendered beside the line and could not be told from it at this scale, so it is not on
  the plot; the legend card says *linear approximation; the type K table differs by less than 0.04 mV
  here* (A6).

**Section D, Plot rows**
- [x] The expression is the physics: the Seebeck relation for a thermocouple, linearised (named, and the
  table checked above).
- [x] Axis and slider ranges real: T_hot 0–200 °C and T_cold 0–100 °C are type K's everyday range; the y
  range holds every value.
- [x] One worked value: at x = 100, tc = 35: y = 2.665 mV.
- [x] No artefacts: straight lines.

**A1–A8**: A1 ✓ (type K, the NIST table); A2 partly: the non-linearity is below the plot's resolution and
stated in words; the cold-junction dependence *is* the non-ideal the card is about; A3 n/a (a plot); A4 n/a;
A5 n/a; A6 ✓ (*linear approximation*); A7 ✓ (the course's other thermocouple use, card 6's ideal beside the
NTC, is deferred with the Electronics card; its values will have to use this S); A8 ✓.

## 9. Faults and non-ideal behaviour

**PLAN FAULT**: none. The card's point is a real fault in the field: a thermocouple read without its cold
junction known reads wrong by S × ΔT_cold (here 0.41 mV, 10 °C). **Proposal**: name it in the step text in
Study, *this is why every thermocouple input measures its own terminals' temperature (cold-junction
compensation)*, with the forward reference to D2·050's mathematical correction.

## 10. Accessibility, legibility and print

- Wall (C2): legend, slider values, axis labels and the marker label at the Canvas's wall size, 7:1; the
  amber level and the dashed violet line readable on the projector profile. Check at 1920 × 1080 and
  1024 × 768.
- Reduced motion (C3): the curves follow the slider with no tween; nothing animates.
- Colour (C4): solid against level against dashed, and their legend words.
- Keyboard (C5): sliders by arrow keys (one key = 1 °C).
- Print (C8): the two (three) stills with their sentences; captured by hand (PNG) until the Plot has a
  print form.

## 11. Assets to make or source

| Asset | Format | Made by | Status |
|---|---|---|---|
| The `plot` block of §3a | YAML in `en.md` | the author | to write |

## 12. Bench capabilities this needs

**Plot Bench**: **exists**: curves from expressions, parameters as sliders with units, `dashed`, markers on
x and y, the readout, `fixedView`. **Missing (request it)**: a marker or point whose position is an
expression of the parameters (X13: here, the operating point (T_hot, V) moving down the 100 °C line); the
presenter strip with named settings (X12). **Not needed**: `animate`.

## 13. Stand-in for the lecture

None needed. Until X13, the operating point is the crossing of the `transfer` line with the `now` level,
on the fixed 100 °C marker.

## 14. Findings for the owner

- **F1 — The PLAN's numbers check out** (§8): 3.08 and 2.67 mV on the linear S, 3.10 and 2.69 mV on the type K
  table. Nothing to change. The Flow's *"°C → volts"* and the statement agree with the plot.
- **F2 — How the plot shows "nothing changed at the end we care about".** The PLAN names the sliders but not
  the axes. This spec puts T_hot on the x axis with a fixed marker at 100 °C, and draws the output as a
  level line, so moving T_cold drops the level while the crossing stays on the marker. The alternative (T_cold
  on the x axis) makes the moving end the axis and hides the held one. Keep this layout (**recommended**)?
- **F3 — Proposals**: the start line and its 3.08 mV marker kept on the plot (B17: both states at once); s2,
  both junctions at 100 °C, with its prediction (+0.3 min); the teacher tip (§7d); the cold-junction note in
  Study (§9).
- **F4 — Bench time.** The Plot is up for 1.8 min but driven for 0.4; p3's list of five sensors (69 words)
  and p4 are spoken over s1 held. That is B13's rule (long paragraphs over held states), noted only so the
  presenter knows the Plot carries the whole second half of the card.

## 15. Acceptance: how we know it is built right

- s0–s1 reach the settings of §4a; the readout at x = 100 reads 3.08 mV at s0 and 2.67 mV at s1 on the
  `transfer` curve, and the `now` level reads the same.
- B1 one setting per step; B2 only T_cold moves; B4 a still per step; B5 each `say` in the presenter's
  notes; B6 the level and the line move with the slider; B9 the poe's commitment before s1; B11 the key
  variable is one slider; B13 legend and values only; B14 labels on the curves and the marker; B16 the
  state readable as numbers (sliders, readout); B17 the start line and the moved line together (if F3).
- C2 legible at 1920 × 1080 and 1024 × 768; C3 nothing animates; C4 solid, level and dashed tell apart in
  greyscale; C5 arrow keys; C6 walked at 320 with the sliders below; C7 a slider move to its frame < 16 ms;
  C8 the stills.
- The compiler's one warning (the flat `now` curve) is the only one, and expected.
