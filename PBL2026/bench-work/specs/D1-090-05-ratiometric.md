```yaml
id: D1-090-05-ratiometric
card: "Ratiometric: let the error cancel"
module: notes/Day01/090-reference/en.md
bench: Plot                       # the module's centrepiece (owner D1, 2026-10-20: the PLAN's Plot and Equation, ready today); the Equation is the card's second block
library: "ratiometric-rail: a Plot of the 12-bit code against the rail V_dd (3.0–3.6 V) for a fixed 1.65 V (amber, falling 2252 → 1877) and the 10 k NTC divider on the same rail (teal, flat; 2048 at 25 °C), slider T 15–35 °C, markers at 3.0, 3.3 and 3.6 V; shown twice, at T = 25 °C and at T = 35 °C with the 25 °C line dashed · ratiometric-cancel: an Equation, code = ⌊k·2^N⌋, derived in five lines from the divider and card 1's code, V_dd pinned where it divides out; examples 25, 35 and 15 °C; all defined in the card's `plot` and `equation` blocks"
dimensions: 2D
stand_in: "none for the blocks (every field exists); the strike-out of V_dd is the pinned symbol until X-cancel; if the Flow is not split (F2), one Plot for the whole card with the presenter moving T on the wall window"
optional_benches: [Electronics]   # the PLAN's on-circuit version (deferred; card 4's `vdd-reference` scene could carry it, §12)
real_thing: "a 10 kΩ NTC (B25/85 = 3950 K, the course's thermistor-ntc-10k) under a 10 kΩ 1 % resistor, excited from the MCU's 3.3 V rail, which is also the 12-bit converter's reference (truncating); beside it a fixed 1.65 V from a separate reference, read against the same rail; the rail swept 3.0–3.6 V"
minutes: 1.9                      # on the bench: from p3's [[demo]] to the card's end (§2)
card_minutes: 3.1                 # the whole card, the poe included (§2)
status: spec-ready                # D1, D5, F4, N1 and round two (C5a–C5c, D1·090-F7) decided
learner_action: poe
predictions: []                   # the PLAN's poe fires before the bench appears and is answered at s1; a spoken one before s3 is a Proposal (F7)
seeds: [S35 (harvest)]
key_variable: "the rail V_dd (the x axis): the fixed input's code falls with it, the ratiometric code does not; then the temperature, which moves the flat line"
time_scale: "none (no motion: two plot states and five derivation steps)"
steps: 4                          # s0, s1, s2a–e, s3
```

**Written 2026-10-20 (U018)** after the owner's choices on the U018 brief (*"apply all recommendations"*). **This spec also
holds D1·090's module time table** (§2), as `D1-080-03-quantization-floor.md` holds D1·080's.

**The formats, as read in source on 2026-10-20** (read-only, `C:\ExSightory\src\insight\packages\insight-core\src\`):

- **Plot** (`registry/plotBlock.ts`): `variable`, `domain`, `range`, `parameters` (sliders: `name`, `label`, `min`, `max`,
  `default`, `step`, `unit`), `curves` (`expression`, `label`, `colour` from teal · amber · violet · rose · azure · lime,
  `dashed`, `fill`), `markers` (a fixed number on x or y, with a label), `animate` (one parameter swept), `readout`,
  `fixedView`, `caption`. **There is no `compare`** (that is the Equation's graph), so a family is written as separate
  curves. A curve that never uses the variable warns *"will draw as a flat line"*. The expression language
  (`expr/parse.ts`) has `exp`, `floor`, `min`, `max`, `sqrt`; a non-finite sample is not drawn. The block is
  `livePush: false` and **not `drivable`**: its slider values, the view and `animate` are local to each window; the wall
  shows the block at its authored defaults.
- **Equation** (`registry/equationBlock.ts`): one `statement`; `symbols`; `highlights` (a `term` or `coefficient` **of the
  statement only**); `derivation` (lines, each with a note; only the last line is checked, against the statement, by
  structure, and a mismatch is a warning); `examples` (right-hand values only); `assumptions` (`simplifying` or
  `limiting`, with `breaksWhen`). `drivable: true`: **the pane, the pinned annotation, the derivation step and a
  simulation's transport are mirrored to the wall** (`apps/desktop/src/shared/presentation.ts`, `CanvasView`). A slider's
  value, the hover readout and `graph.animate` are not. `floor(…)` is typeset as the word *floor* (`expr/latex.ts`,
  `\operatorname{floor}`), not ⌊ ⌋; **there is no strike-out notation** (no `cancel`).
- **Cards** (`registry/cards.ts`): `plot` and `equation` are `stage: 'lead'`; a lead block that does not follow the
  heading directly opens its own slide, and the Canvas is sticky within a card. So the PLAN's *Plot, then the Equation*
  is a sequence of slides under the one heading, each with the Flow fence that follows its block (F2).

So the PLAN's *"sliders: temperature, and the rail (animate)"* would move nothing the room sees. Here the rail **is** the x
axis (the sweep is read along it, the presenter's laser tracing it, which is mirrored), and the temperature's move is a
**second showing of the same plot** opened at 35 °C with the 25 °C line dashed: a block's defaults are what the wall shows,
so the move needs no mirroring (F1).

**Six gates** (this spec, 2026-10-20): (1) realism: the course's 10 k NTC (B = 3950 K) and 10 kΩ divider of D1·030 and
D1·040, the course's truncating 12-bit converter, a 3.0–3.6 V rail; nothing branded — pass. (2) science: the rail
multiplies the divider's output and the reference alike and divides out exactly in the ideal; the two effects that remain
in the real circuit (self-heating that grows with the rail, and 2048 sitting on a code edge) are **raised as accuracy
F3** and labelled on the bench — pass with F3 open. (3) maths: every code recomputed in Node, exact on code edges (the
`1e-9` guard, §8) — pass. (4) visualization: both inputs on one code axis, the falling line beside the flat one, the
temperature's move shown against the 25 °C line it left; the cancellation as the pinned V_dd lit twice, then gone — pass
for the target, the strike-out itself waits for X-cancel. (5) consistency: 2252 and 1877 as the decided F4; 1.30 V and
1614 at 35 °C as D1·030's 25 → 35 °C step; 5 kΩ as D1·040's S35; 10.1 kΩ as D1·070; colours as the brief (amber the fixed
input, teal the ratiometric, rose the reference) — pass. (6) design: one slider row, words on top with the symbol in
parentheses; labels on every line; EN and FR drafted — pass on paper, to check on the built blocks.

## 1. What the room must understand

- **Statement** (verbatim): *Excite a resistive sensor from the same rail that references the converter. The rail
  appears in both the input and the reference, so it divides out.*
- **SHOW (centrepiece)** (verbatim from the PLAN): *Plot — the code against the rail voltage V_dd from 3.0 to 3.6 V for
  two inputs: an absolute one, a fixed 1.65 V (code = 1.65/V_dd·4096: falls from 2252 to 1877), and the ratiometric
  thermistor divider (code = R_T/(R_T + 10 kΩ)·4096: flat at 2048 at 25 °C); sliders: temperature, and the rail
  (animate).*
- **Drive** (verbatim): *animate the rail; then move the temperature.*
- **Look for** (verbatim): *one line moving with the rail and the other flat — and the flat one still moving with
  temperature. Then the Equation: code = (V_dd·k)/V_dd·2^N, V_dd struck out, leaving k·2^N.*
- **Status** (verbatim): *ready (Plot, Equation) · the on-circuit version needs Electronics: ADC-input block referenced
  to the same supply (today the thermistor divider on the supply dial shows the volts moving, not the code standing
  still); replaces the reference-drift widget.*
- **HARVEST** (verbatim): *S35 — "It's our thermistor divider from 040 again: 1.65 V behind 5 kΩ, settling fine, and now
  deaf to the rail."* (The Flow's p6 carries it as *"It is our thermistor divider from the impedance module: 1.65 V behind
  5 kΩ, settling fine, and now deaf to the rail."*)
- **FAULT** (verbatim): *The sensor is excited from 5 V while the ADC references 3.3 V: ratiometric in name only.* ·
  *A filter resistor between the rail and the divider that is not in the reference path: the two no longer see the same
  rail under load.*
- **Bench and library.** The **benches** are the Plot Bench (the centrepiece) and the Equation Bench (owner decision D1,
  2026-10-20). The **libraries** are this card's plot, `ratiometric-rail` (shown twice, §3a), and its equation,
  `ratiometric-cancel` (§3b).
- **Insight**: *when the sensor's excitation is the converter's reference, the rail is on the top and the bottom of the
  code and cancels: the code is the resistance ratio times 2^N, which moves with temperature and not with the rail.*
- **Kind of knowledge**: *a contrast between two states* (an absolute input against a ratiometric one, under the same rail
  sweep) and *a relation between quantities* (code against rail; then the algebra). Card test → **Plot**, then
  **Equation**. B17 applies (both inputs on one code axis, one rail axis). B15, B18, B19 do not.
- **Why these benches, not a still**: the claim is about every rail from 3.0 to 3.6 V at once, and the contrast is a
  slope against no slope on one scale; then the temperature moves the flat line, shown against where it was. The
  Equation shows *why* in the same symbols the room met in cards 1–3, one line per sentence of p5.
- **Key variable**: V_dd (the x axis); then T.

## 2. Time

### 2a. This card

The card's Flow is **262 words** (cue words not counted; counted from `en.md` 2026-10-20). The `[[ask]]` question (p1,
38) is counted in the poe. Both `[[demo]]` paragraphs are spoken. **224 words are spoken outside the poe = 1.72 min** at
130 wpm.

| Beat | Minutes | Source of the number |
|---|---|---|
| p0 *"There is an escape…"* (13), before the bench | 0.10 | 13 ÷ 130 |
| The PLAN's poe: p1 the question (38), four options, the answer window, the tally (p2 `[[pause]]`), before the bench | ≈ 1.1 | as D1·080's poe (≈ 1.0), +0.1 for the 38-word question |
| s0 the plot opens: p3 *"[[demo]] On the Plot Bench: the code against the rail voltage…"* up to *"…powered from that same rail."* | 0.36 | 47 ÷ 130 |
| s1 the sweep and the reveal: p3 *"I'll sweep the rail."* (5) and the laser along x, 3.0 → 3.6 V (≈ 4 s); p4 *"[[reveal]] The thermistor's code stays put at 2048…"* (14) | 0.21 | 19 ÷ 130 + 4 s |
| s2a–e the Equation: p5 *"Here is the algebra…"* (69) over five derivation steps (≈ 1.5 s a press) and the slide change (≈ 2 s) | 0.68 | 69 ÷ 130 + 9.5 s |
| s3 the plot at 35 °C: p6 *"[[demo]] Now I move the temperature…"* (40) and the slide change (≈ 2 s) | 0.34 | 40 ÷ 130 + 2 s |
| s3 held: p7 *"This is **ratiometric** measurement…"* (36) | 0.28 | 36 ÷ 130 |
| **Card total / of which on the bench** | **3.1 / 1.9** | 3.07 / 1.87; +0.1 with the spoken prediction before s3 (F7) |

The U018 brief estimated ≈ 4.6 min for this card (an activity at 1.5 min and more bench moves); this spec's figures
replace it. p5 (69 words) is spoken over the derivation, one sentence per line; p7 over a held state (B13).

### 2b. The module, card by card (D1·090 `targetMinutes: 30`)

The Flow is **1,058 words** = **8.14 min** at 130 wpm (cue words not counted). The five activity questions in the Flow
(cards 2, 3, 4, 5, 6: 130 words) are counted in their activities, leaving **928 words spoken outside the activities =
7.14 min**. Activities as D1·080's table: a poe ≈ 1.0, a numeric ≈ 0.75 each, a poll ≈ 1.0, each with its question; the
four-part checkpoint ≈ 3.0.

| Card | Flow spoken outside the activity | Activity | Beyond the Flow | Card | Source |
|---|---|---|---|---|---|
| 1 A code is a ratio to the reference | 0.91 (118) | none | Equation moves and D5's zoom near 1.65 V | **1.4** | `D1-090-01-code-is-a-ratio.md` (0.9 on the bench) |
| 2 The code alone means nothing | 0.58 (75) | numeric ×2 | the reveal (V_ref switched); HARVEST S30 (26 words, not in the Flow) | **2.3** | `D1-090-02-code-alone.md` (0.9 on the bench) |
| 3 Reference error is measurement error | 0.91 (118) | poe ≈ 1.0 | V_ref compared, pane moves, the zoom Proposal ≈ 0.2 | **2.2** | `D1-090-03-reference-error.md` §2 (1.2 on the bench; 2.1 without the zoom) |
| 4 VDD: the default, and usually the worst | 2.38 (309) | poll ≈ 1.0 | load steps, the trace | **3.7** | `D1-090-04-vdd-reference.md` §2 (1.8 on the bench) |
| 5 Ratiometric: let the error cancel | 1.72 (224) | poe ≈ 1.1 | the sweep, five derivation steps, two slide changes ≈ 0.25 | **3.1** | this spec, §2a |
| 6 Back to the sensor | 0.65 (84) | checkpoint ≈ 3.0 | stages lit as named ≈ 0.45; the suspect marked, answers read ≈ 0.5 | **4.6** | `D1-090-06-back-to-the-sensor.md` §2 |
| **Module** | **7.1** | **≈ 9.6** | **≈ 2.4** | **≈ 17.3** | |

**D1·090 uses ≈ 17.3 of its 30 minutes, leaving ≈ 12.7 min unused** (F8). Reported only; the owner adds or cuts, nothing is
trimmed here. The U018 brief estimated ≈ 20 (cards ≈ 1.4, 2.2, 2.9, 4.7, 4.6, 3.8, each activity at about 1.5 min).
Every card's figure is its own spec's (reconciled 2026-10-20, U018). This is the module's one time table; `D1-090-01` §2 points here.

## 3. The scene: what is on the bench

### 3a. The plot (`ratiometric-rail`), shown twice

The same block, written twice: **A** (s0–s1) opens at T = 25 °C; **B** (s3) opens at T = 35 °C and adds the 25 °C line,
dashed. Everything else is identical.

| Field | Content | Source |
|---|---|---|
| `title` | *Ratiometric: let the error cancel* · FR *Ratiométrique : laisser l'erreur s'annuler* | the card's heading |
| `caption` | *The code against the rail, which is also the reference. A fixed 1.65 V falls as the rail rises; the thermistor divider on the same rail stays flat, and moves only with temperature. Ideal converter, fully settled; parts at nominal; the bead at the temperature shown (self-heating left out).* · FR *Le code en fonction du rail, qui est aussi la référence. Une tension fixe de 1.65 V baisse quand le rail monte ; le diviseur à thermistance sur le même rail reste plat, et ne bouge qu'avec la température. Convertisseur idéal, entièrement établi ; composants nominaux ; la perle à la température indiquée (auto-échauffement négligé).* | the statement; the last sentence is the A6 label (F3, **Proposal**) |
| `variable` | `x` (the rail V_dd, V) | the PLAN |
| `xLabel` | *Rail and reference, V_dd (V)* · FR *Rail et référence, V_dd (V)* | the PLAN |
| `yLabel` | *Code (12 bits, truncated)* · FR *Code (12 bits, tronqué)* | D5 |
| `domain` | [3.0, 3.6] | the PLAN |
| `range` | [1500, 2600] | F6 (**Proposal**): fixed, so moving T moves the line, not the axis |
| `parameters` (one row) | `T` *Thermistor's temperature (T)*, 15–35, default **25** (A) / **35** (B), step 1, unit *°C* · FR *Température de la thermistance (T)* | the PLAN's temperature slider |
| `markers` (x) | 3.0 *3.0 V* · 3.3 *3.3 V: nominal* (FR *3.3 V : nominal*) · 3.6 *3.6 V* | the PLAN's range (**Proposal**, F7) |
| `readout` | on (x, each curve's code at the hover; Study) | the Plot's default |
| `fixedView` | true (the framing is the point; wheel zoom would refit nothing, `range` is fixed) | F6 |
| `animate` | none (not mirrored; the rail is the axis: F1) | F1 |

**Curves.** Write R for the thermistor, `10000*exp(3950*(1/(T + 273.15) - 1/298.15))` (Ω); the block spells it out.

| id | In | Expression | Label (EN · FR) | Colour, line |
|---|---|---|---|---|
| `fixed` | A, B | `floor(1.65*4096/x + 1e-9)` | *A fixed 1.65 V, read against the rail* · *Une tension fixe de 1.65 V, lue contre le rail* | amber, solid |
| `ratio` | A, B | `floor(R/(R + 10000)*4096 + 1e-9)` | *Thermistor divider on the same rail, at T* · *Diviseur à thermistance sur le même rail, à T* | teal, solid |
| `ratio25` | B only | `floor(10000/(10000 + 10000)*4096 + 1e-9)` | *The divider at 25 °C, where it was* · *Le diviseur à 25 °C, là où il était* | teal, `dashed` |

- `fixed` is the PLAN's 1.65/V_dd·4096 with the course's truncation (D5). `ratio` is the PLAN's R_T/(R_T + 10 kΩ)·4096,
  truncated; R_T is the course's profile `thermistor-ntc-10k` (R25 = 10 kΩ ± 1 %, B25/85 = 3950 K: the β model, as
  D1·030 card 6 and D1·040).
- The `+ 1e-9` guard keeps a code that lands exactly on an edge exact under floating point (1.65·4096/3.2 evaluates to
  2111.9999999999995 in doubles; exact is 2112). It moves no other code (§8).
- `ratio` and `ratio25` never use `x`, so the compiler warns that they draw as flat lines: **expected**, it is the point.
- On this axis one code is about 0.36 px (1100 codes over ≈ 400 px) and `fixed` changes by one code every ≈ 1.3 to
  1.9 mV of rail (751 to 521 codes per volt), about one sample a code at ≈ 429 samples: its steps are under a pixel and
  it draws as a smooth falling line. No riser artefact can be seen (§8).

### 3b. The equation (`ratiometric-cancel`)

| Field | Content | Source |
|---|---|---|
| `title` | *The rail divides out* · FR *Le rail s'élimine* | p5 |
| `statement` | `code = floor(k * 2^N)` | the PLAN's *"leaving k·2^N"*, with D5's truncation |
| `caption` | *The rail excites the divider and references the converter, so it is on the top and the bottom. What is left is the resistance ratio: the temperature.* · FR *Le rail alimente le diviseur et sert de référence au convertisseur : il est en haut et en bas. Il reste le rapport des résistances : la température.* | p5 |
| `symbols` | `code` *Code* (no unit), note *what the converter reports; truncated on the course's converter* · `k` *Divider ratio* (no unit), note *R_T/(R_T + R_F): 0.5 at 25 °C, 0.394 at 35 °C* (teal) · `N` *Resolution* (bits), note *12 on the course's converter* · `V_in` *Divider's output* (V) (teal) · `V_ref` *Reference* (V) · `V_dd` *The rail* (V), note *it excites the divider and is the converter's reference* (rose) · `R_T` *Thermistor's resistance* (Ω), note *10 kΩ at 25 °C, 6.51 kΩ at 35 °C* · `R_F` *Fixed resistor* (Ω), note *10 kΩ, 1 %* | p5; D1·030; D1·040 |
| `highlights` | term `k * 2^N` — *what is left: the ratio times the levels; no volts anywhere* · FR *ce qui reste : le rapport fois les niveaux ; plus aucun volt* | p5 (a highlight must be a term of the statement) |
| `source` | *The resistive divider and the ideal converter's code (card 1)* | §8 |
| `derivation` | §4a s2a–e: five lines, the last the statement | p5 |
| `examples` | E1 *25 °C* k 0.5, N 12 → **2048**; E2 *35 °C* k 0.39414, N 12 → **1614**; E3 *15 °C* k 0.61296, N 12 → **2510**, each note *at any rail from 3.0 to 3.6 V* (**Proposal**, F5) | §8 |
| `assumptions` | (1) *The divider and the converter's reference are the same rail, with nothing between them that one sees and the other does not* — breaksWhen *the sensor is excited from 5 V while the converter references 3.3 V, or a filter resistor sits in one path only: then the rail no longer cancels (the PLAN's two faults)* — **limiting**. (2) *An ideal converter, fully settled: code = ⌊V_in/V_ref·2^N⌋* — breaksWhen *the source cannot settle in the window: above 10.1 kΩ at 12 bits and 1 µs (D1·070); our divider's 5 kΩ settles in 16.7 time constants* — simplifying. (3) *The bead is at the temperature shown: self-heating left out* — breaksWhen *the rail heats the bead by V_T²/R_T × 500 °C/W, 0.11 °C at 3.0 V and 0.16 °C at 3.6 V at 25 °C (D1·030), so the code drifts by about 2 counts across the sweep* — simplifying (F3). (4) *Parts at nominal, R_T from the β model (B25/85 = 3950 K)* — breaksWhen *each 1 % tolerance moves k: 2027 to 2068 at 25 °C, a steady offset a calibration removes (D2·050)* — simplifying | the PLAN's FAULTs; D1·070; D1·030; F3 |
| `graph` | none (the Plot is the graph; B2) | F5 |
| `notes` | `include: true` | print |

**Colours and their second channel** (C4): on the plot, amber falling and teal flat (slope and label as well as hue), the
25 °C line dashed and labelled; on the equation, V_dd rose and k teal, each with its label in the Symbols pane, the
pinned symbol lit with its note.

**Values beside their element** (B14, B16): the slider's T with its unit; the three x markers; the codes on the y axis
(a grid every 100 codes, to confirm) and in the readout (Study); on the Equation, the Example pane's codes.
2252, 1877 and 2048 are spoken (p3, p4), not written on the plot (B13) until X13 can label a live value.

## 4. The run: step by step, as the Flow goes

### 4a. Steps

| # | id | Flow paragraph (first words) | What changes (`say`) | Block, setting | Presenter's control |
|---|---|---|---|---|---|
| — | p0 spoken; the PLAN's poe fires at p1 `[[ask]]`, p2 `[[pause]]` | — | (§7a) | — | the activity |
| 0 | `s0-two-inputs` | p3 *"[[demo]] On the Plot Bench: the code against the rail voltage, for two inputs…"* | Two inputs against one rail: a fixed 1.65 V, and the thermistor divider powered from that rail. | plot A, T 25 °C | (the slide opens) |
| 1 | `s1-rail-swept` | p3 *"I'll sweep the rail."*, then p4 *"[[reveal]] The thermistor's code stays put at 2048…"* | From 3.0 to 3.6 V the fixed input falls from 2252 to 1877; the thermistor's code stays at 2048. | plot A held | the laser traced along x, 3.0 → 3.6 V (mirrored ink, M07-c) |
| 2a | `s2a-divider` | p5 *"Here is the algebra. The divider's output is the rail times a ratio…"* | The divider's output: the rail times R_T over R_T plus R_F. | Equation, Proof, line 1: `V_in = V_dd * R_T / (R_T + R_F)` | (the slide opens), step |
| 2b | `s2b-ratio` | p5 *"…k = R_T / (R_T + R_F)."* | Call that ratio k: the output is the rail times k. | line 2: `V_in = V_dd * k` | step |
| 2c | `s2c-code` | p5 *"The code is that output divided by the reference, times 2^N."* | The code is the output over the reference, times 2^N (card 1). | line 3: `code = floor(V_in / V_ref * 2^N)` | step |
| 2d | `s2d-same-rail` | p5 *"But the reference is the rail. So the rail appears on the top and on the bottom…"* | The reference is the rail: V_dd on the top and on the bottom. | line 4: `code = floor((V_dd * k) / V_dd * 2^N)`; **V_dd pinned** (lit twice, rose) | step, pin |
| 2e | `s2e-divides-out` | p5 *"…and divides out: code = k × 2^N. All that is left is the resistance ratio…"* | V_dd divides out: code = k·2^N, the resistance ratio, which is the temperature. | line 5 = the statement; `k * 2^N` pinned | step, pin |
| 3 | `s3-temperature` | p6 *"[[demo]] Now I move the temperature…"*; p7 *"This is **ratiometric** measurement…"* held | At 35 °C the flat line drops to 1614 and stays flat: it ignores the rail, not the temperature. | plot B, T 35 °C, the 25 °C line dashed | (the slide opens) |

Derivation notes (the Proof pane, EN; FR drafted with the block): line 1 *the divider: R_T under R_F, the output across
R_T*; line 2 *the ratio k = R_T/(R_T + R_F): 0.5 at 25 °C, set by the two resistances only*; line 3 *card 1's code,
truncated on our converter*; line 4 *the reference is the rail: V_ref = V_dd*; line 5 *the rail divides out*.

Suggested words for the strip (B20): s1 *"Watch the right-hand end: amber down to 1877, teal still on 2048."*; s3 *"The
dashed line is where it was at 25 °C; at 35 it sits at 1614, and it is still flat."*

### 4b. Motion, cues and stills

| # | Motion | Movers | Cue and its second channel | Hold | Reduced motion (C3) | Still |
|---|---|---|---|---|---|---|
| 0 | none (the slide appears) | 0 | the two labelled lines | hold | same | s0 |
| 1 | the presenter's laser along the x axis, 3.0 → 3.6 V (hand-paced, ≈ 4 s) | 1 (the laser) | the laser's dot over each line in turn; amber falling, teal level | hold | the laser is the presenter's hand; the still carries the state | s1 (= s0's picture, with the `say`) |
| 2a–e | none (derivation lines arrive) | 0 | the new line; at 2d V_dd lit twice; at 2e it is gone and `k * 2^N` is lit | hold | same | one per line (five), printed as one derivation |
| 3 | none (the slide appears) | 0 | the solid teal at 1614 beside the dashed 25 °C line | hold | same | s3 |

Four stills on the wall (s0, s2d, s2e, s3) plus the derivation's print form. No `animate` (F1).

## 5. Pacing and interaction, by surface and view

**Who paces** (B12): on the wall the presenter (the Equation's pane, pin and step are mirrored; the plot's state is its
defaults; the laser is mirrored ink). In Study Mode and Scope, the learner.

| View | Who | Controls |
|---|---|---|
| Preview (in the slide) | everyone | the plot with its one slider; the equation and its current pane |
| View (details) | everyone | plot: the slider *Thermistor's temperature (T)*, the label above in words with the symbol in parentheses and the value with its unit at the label's right, one row (`sliders-side-by-side`); the hover readout. Equation: every pane (Symbols, Terms, Proof, Example, Assumptions) |
| Edit (session only) | everyone | not specified for the Plot or Equation Bench |
| Authoring | authors | the `plot` and `equation` blocks' YAML |

- **The presenter's strip** (B20): the steps of §4a with their `say`, the suggested words, the teacher tip (§7d); keys:
  Next / Back for the slides and derivation steps, the laser key (M07-c).
- **Study / Scope**: T free on both plots (15–35 °C); the readout; the Equation's Example pane (E1–E3) and Assumptions.
- **Phone** (C6): the plot full width, the slider under it; the equation then its pane, full width; the two line labels
  must not collide at 320. At 25 °C the two lines **cross at 3.3 V** (both 2048: the same 1.65 V on the same 3.3 V), so the
  labels sit at the ends: at 3.0 V they are 204 codes apart, at 3.6 V 171 (check both).
- **Locked**: the plot opens only after the poe is answered (B9).

## 6. The frame

| Tile / panel | Used? | Selected item | List / contents |
|---|---|---|---|
| Plot legend | yes | — | A: fixed, ratio; B: fixed, ratio, ratio25 |
| Plot slider | yes | T with its unit | one |
| Plot readout | yes (hover, Study) | x and each code | — |
| Equation panes | yes | the pinned symbol or term with its note | Symbols, Terms, Proof, Example, Assumptions |
| Ink (laser) | yes (s1) | — | the laser over the plot |

The Canvas header and footer of each bench (D4.10–4.12); no inset, no graph band.

## 7. Thinking, not watching

- **7a. The PLAN's ASK** (verbatim): *poe (before the reveal) — "Now the thermistor divider, the 10 k NTC under 10 kΩ, is
  powered from the same rail that references the ADC. At 25 °C the rail moves from 3.0 V to 3.6 V. What does the code
  do?" · options: rises as the rail falls, like before | falls as the rail falls | stays put | wanders · answer: stays put
  · reveal: the centrepiece Plot, rail swept. · explain: The rail multiplies the sensor's voltage and the reference alike,
  so it divides out of the code; only the resistance ratio, which is the temperature, is left. · depth: understand ·
  practice: developing models.* It fires at p1, **before the bench appears**; **s1 reveals it**.
- **7b. Prediction point** — **Proposal** (F7): before s3, ask aloud *"If the bead warms to 35 °C, does the flat line
  move, and which way?"* (down: an NTC's resistance falls, so k falls); +0.1 min.
- **7c. After**: the explain. In Study, done means the poe was answered and T was moved on the plot.
- **7d. Teacher tip** — **Proposal** (F7): *Expect "it rises as the rail falls, like before" (card 3's rule applied
  without seeing that the input moves too). Ask: when the rail goes up 20 %, what happens to the divider's output? (It
  goes up 20 % too.) If someone says "wanders": the real circuit does move by about 2 counts, because more rail heats the
  bead more (D1·030), against the fixed input's 375.*
- **7e. Explore** (B11): in Study, T from 15 to 35 °C on either plot; *find the temperature at which the divider reads
  what the fixed 1.65 V reads at 3.3 V* (25 °C: both 2048, the only crossing at 3.3 V); the Equation's E1–E3.

## 8. Faithfulness (the quality bar)

**Arithmetic** (Node, 2026-10-20; the course's converter: 12 bits, truncating, codes exact on edges):
- Fixed input, code = ⌊1.65/V_dd·4096⌋: 3.0 V → 2252.8 → **2252** (✓ the decided F4, p3 *"about 2252"*); 3.3 V → **2048**
  exactly; 3.6 V → 1877.33 → **1877** (✓). In between: 3.1 V 2180, 3.2 V **2112** (exact; doubles give 2111.9999999999995,
  hence the guard), 3.4 V 1987, 3.5 V 1930. The rail rises 20.0 %; the code falls 16.7 % (1/1.2).
- Thermistor, R_T = 10 kΩ·exp(3950·(1/T − 1/298.15 K)), k = R_T/(R_T + 10 kΩ):

  | T (°C) | R_T (kΩ) | k | code | V_out at 3.3 V | R_th = R_T ∥ 10 kΩ |
  |---|---|---|---|---|---|
  | 0 | 33.62 | 0.77075 | 3156 | 2.544 V | 7.71 kΩ |
  | 15 | 15.84 | 0.61296 | 2510 | 2.023 V | 6.13 kΩ |
  | 25 | 10.00 | 0.50000 | **2048** (exact) | **1.650 V** | **5.00 kΩ** |
  | 30 | 8.037 | 0.44559 | 1825 | 1.470 V | 4.46 kΩ |
  | 35 | 6.506 | 0.39414 | **1614** | **1.301 V** | 3.94 kΩ |
  | 50 | 3.588 | 0.26407 | 1081 | 0.871 V | 2.64 kΩ |

  ✓ the brief's 30 °C (8.04 kΩ, 1825), 0 °C (33.6 kΩ, 3156) and 50 °C (3.59 kΩ, 1081); ✓ D1·030 card 6's *"ambient 25 → 35
  °C — 1.65 → 1.30 V"*; k at 25 °C is exactly 0.5 (exp(0) = 1), so the code is exactly 2048 at every rail.
- The examples: 0.5·4096 = **2048**; 0.39414·4096 = 1614.40 → **1614**; 0.61296·4096 = 2510.68 → **2510** (k to five
  places gives the same codes as the exact k).
- The axis: every code on §3a's curves for T 15–35 °C lies in [1500, 2600] (1614 to 2510, and 1877 to 2252).
- S35 (A4): D1·040's Thévenin, 10 kΩ ∥ 10 kΩ = **5 kΩ** behind **1.65 V** at 25 °C on 3.3 V ✓; D1·070's limit at 12 bits
  and 1 µs, settling to ½ LSB after a full-scale step in (N + 1)·ln 2 = 9.01 τ: R_s,max = 1 µs/(9.01 × 10 pF) − 1 kΩ =
  **10.1 kΩ** ✓; our divider: τ = (1 kΩ + 5 kΩ) × 10 pF = **60 ns**, 1 µs / 60 ns = **16.7 τ** ✓ *"settling fine"*. Over
  0–50 °C R_th stays 2.64–7.71 kΩ, inside 10.1 kΩ. p6's *"1.65 V behind 5 kΩ"* names the divider by its 25 °C, 3.3 V
  values while plot B shows 35 °C (1.30 V behind 3.94 kΩ); the dashed 25 °C line is on the plot when it is said, so the
  sentence has its picture (no finding).
- Card 3's rule against this card's fixed input: 1.65/3.2·4096 = 2112 (card 3's reveal ✓), the same curve.
- **The idealisations behind "stays put at 2048"** (F3, **accuracy**): (i) self-heating, the profile's 500 °C/W (D1·030):
  at 25 °C ambient the bead runs 0.113, 0.136 and 0.162 °C warm at 3.0, 3.3 and 3.6 V, and the code (−45.5 counts per °C
  at 25 °C) is **2042, 2041 and 2040**: flat to 2 counts against the fixed input's 375, but not 2048, and not perfectly
  deaf to the rail (P ∝ V_dd²). (ii) k = 0.5 puts 2048 exactly on a code edge; D1·070 told the room that 1.65 V on 3.3 V
  reads *"2047 or 2048"*, and under the course's ADC-input model (the capacitor from 0 V, 1 µs) the 5 kΩ divider settles to
  1.65 V − 1.65·e^(−16.7) = 1.65 V − 0.1 µV, which truncates to **2047**. Neither depends on the rail sweep in a way the
  room could see (the line stays flat), but both make "2048" the ideal value.
- The parts' tolerance: 9.9 kΩ under 10.1 kΩ gives 2027; 10.1 under 9.9 gives 2068 (± 1 % each, a steady offset).

**Section D, Plot rows**
- [x] The expression is the physics: the ideal truncating 12-bit code of a fixed voltage and of a resistive divider on
  the reference rail, the NTC by the β model of the course's profile (B25/85 = 3950 K).
- [x] Axis and slider ranges real: the PLAN's 3.0–3.6 V rail; 15–35 °C, room temperatures around D1·030's 25 → 35 °C step.
- [x] One worked value: at x = 3.0 V the readout gives `fixed` 2252 and `ratio` 2048 at 25 °C; at x = 3.6 V, 1877 and 2048;
  plot B at 35 °C, `ratio` 1614 at every x.
- [x] No artefacts: the steps are under a pixel (§3a); the flat lines are exact.

**Section D, Equation rows**
- [x] Symbols as the course: code, N, V_in, V_ref as cards 1–3; R_T and R_F as D1·040 (the Flow's p5 writes *R_F*); k as
  p5.
- [x] Every example recomputed above to the integer shown.
- [x] No slider, no graph (the Plot carries the graph).

**A1–A8**: A1 ✓ (Node, above); A2 ✓ with F3 raised (truncation applied; self-heating and settling named); A3 ✓ (2048
exactly on an edge, evaluated exactly; 3.2 V's 2112 guarded); A4 ✓ (S35 against D1·040 and D1·070; D1·030's 1.30 V; card
3's 2112); A5 ✓ (the divider's output across R_T, the NTC under R_F; ratiometric only with one rail in both paths, the
assumption); A6 ✓ (the caption's last sentence and the Equation's assumptions 2–4); A7 ✓ (the β model and R25, B, 500 °C/W
from the course's `thermistor-ntc-10k` profile; the ratiometric divider is standard practice, e.g. any MCU application
note on ratiometric bridges, cited here only); A8 ✓.

## 9. Faults and non-ideal behaviour

**PLAN FAULTs** (verbatim): *The sensor is excited from 5 V while the ADC references 3.3 V: ratiometric in name only.* ·
*A filter resistor between the rail and the divider that is not in the reference path: the two no longer see the same
rail under load.* Both are the Equation's limiting assumption (1), with its `breaksWhen` in the room's words. They are not
drawn on the plot: excited from a fixed 5 V, the divider at 25 °C reads 2.5/V_dd·4096 = 3413 → 2844, off the axis, and it
behaves like the amber line (**Proposal**: none here; card 4's `vdd-reference` scene could show it on the board, §12).

Also, beside the ideal (A2): self-heating that grows with the rail (about 2 counts, F3); the 1 % parts (2027–2068 at
25 °C, an offset); 2048 on an edge (2047 or 2048, D1·070).

## 10. Accessibility, legibility and print

- Wall (C2): axis labels, line labels, the slider and its value, the three marker labels, the derivation lines and pane
  text at the benches' wall sizes; check at 1920 × 1080 and 1024 × 768 that the marker labels clear the legend and that the
  amber and teal labels do not collide: the lines cross at 3.3 V (both 2048 at 25 °C), so the labels go at the ends,
  204 codes apart at 3.0 V (≈ 74 px) and 171 at 3.6 V (≈ 62 px). The crossing is true and worth a word (*"at 3.3 V they
  agree: card 1's 2048"*), not a clash to hide.
- Reduced motion (C3): nothing animates; the laser is the presenter's hand, and the stills carry each state.
- Colour (C4): slope, dash and labels as well as hue (§3b); check amber against teal under deuteranopia.
- Keyboard (C5): Next / Back; the slider's arrow keys (1 °C a press); the Equation's pane, pin and step keys; the laser key.
- Print (C8): the stills s0, s3 with their `say`; the derivation with its notes; the examples and assumptions.
- Languages: every label, note, caption and assumption `{en, fr}`; the French drafts are ours, for the owner's review;
  numbers and units are not translated.

## 11. Assets to make or source

| Asset | Format | Made by | Status |
|---|---|---|---|
| The two `plot` blocks (§3a, A and B), EN and FR | YAML in `en.md` | the author (FR drafts for the owner's review) | to write once F2 is decided |
| The `equation` block (§3b), EN and FR | YAML in `en.md` | the author | to write |

## 12. Bench capabilities this needs

**Plot Bench, exists**: `variable`, `domain`, `range`, `parameters`, `curves` with `exp`, `floor`, `dashed`; `markers` on
x; `readout`; `fixedView`; `caption`.

**Equation Bench, exists**: statement, symbols with notes and colours, a term highlight, derivation steps, examples,
assumptions; pane, pin and derivation step mirrored.

**Ink**: the laser over the Canvas, mirrored (M07-c) — exists.

**To confirm when written**:
- (a) that the compiler accepts **three lead blocks under one heading** (plot A, equation, plot B), each opening its own
  slide with its Flow fence (`cards.ts` reads so; D1·080 card 7 has two in sequence);
- (b) that a **pinned symbol lights its occurrences in the derivation line on show** (both V_dd in line 4); if only the
  statement lights, the stand-in for the strike-out is the line note alone;
- (c) the y axis's grid and ticks every 100 codes on [1500, 2600];
- (d) that the flat-line warnings on `ratio` and `ratio25` do not block the build.

**Missing (request it; working names until each is raised as a crossing to Benches)**:
- **X-cancel** (**proposed**): a display notation in the expression language, e.g. `cancel(V_dd)`, typeset as the symbol
  struck through and **evaluating as its argument** (so the line still parses and computes), usable in derivation lines,
  ideally with the stroke drawn when the step arrives (mirrored with the step). Here: line 4 written
  `code = floor((cancel(V_dd) * k) / cancel(V_dd) * 2^N)` — the PLAN's *"V_dd struck out"*. Until then: V_dd pinned at
  line 4, gone at line 5.
- **⌊ ⌋ for `floor`** (**proposed**, shared with cards 1–3's specs and D5; one request): typeset `floor(x)` as ⌊x⌋.
  Until then the Equation prints *floor(k·2^N)*.

**Would help (already listed in `bench-work/requests-to-exsight.md`)**: **X10** (a curve hidden until a reveal: the teal
line arriving at p4 instead of with the plot at p3); **X12** (presets mirrored: one plot block, T moved by a preset, no
second block); **X13** with a **mirrored `animate`** (a "rail now" dot on each line moving 3.0 → 3.6 V as the room watches;
the laser stands in).

**Not this card's**: the on-circuit ratiometric version the PLAN's Status names (the code standing still on the board while
the rail moves). Card 4's library **`vdd-reference`** (Animation Bench, by Benches; `D1-090-04-vdd-reference.md` §12) keeps
the ADC's input as a `params` choice, so the same board scene could later load the thermistor divider in place of the
1.65 V reference, excited from the rail. That would be a crossing of its own if the owner wants it (F5 (c)); this card does
not need it.

## 13. Stand-in for the lecture

None needed for the blocks: every field of §3 exists. The strike-out is the pinned V_dd (until X-cancel), and `floor`
prints as a word (until ⌊ ⌋).

**If the Flow is not split** (F2 (b) or (c)): plot A carries the whole card, the Equation follows p5 on its own slide only
if two blocks are allowed, and for p6 the presenter drags T to 35 °C on the wall window (as D1·080's stand-ins) — the room
then sees the line move, but not against the dashed 25 °C line, and nothing is mirrored to the devices. Checks lost: B4
(the previous state), B12 (the presenter on the wall window).

## 14. Findings for the owner

- **F1 — The PLAN's "sliders: temperature, and the rail (animate)" → the rail is the x axis, the temperature a second
  showing.** A plot's sliders and `animate` are not mirrored, so neither would reach the wall. The rail is already the
  x axis: the sweep is read along it, the presenter's laser tracing 3.0 → 3.6 V. The temperature's move is plot B, the
  same block opened at 35 °C with the 25 °C line dashed. Options: (a) as specified (**recommended**: works on the wall
  today, the move seen against where the line was, on one scale); (b) one plot, T dragged by the presenter on the wall
  window until X12 (live movement, not mirrored to devices); (c) a family of 15, 25 and 35 °C lines from the start (no
  beat for *"Now I move the temperature"*).
- **F2 — Plot → Equation → Plot on one card: the Flow fence split in three.** Each lead block opens its own slide and a
  Flow fence belongs to the block before it, so the card's one fence would become three: p0–p4 after plot A, p5 after the
  equation, p6–p7 after plot B. **No word changes.** Options: (a) split (**recommended**: one block at a time as the Flow
  goes, the owner's rule `one-block-at-a-time`); (b) plot and equation side by side on one slide, the Flow unchanged
  (Studio's capability, routed by the owner, as D1·080 card 7's F-c7-4); (c) the plot only and the algebra spoken (loses
  D1's Equation).
- **F3 (accuracy; proposed D1·090-F7) — "stays put at 2048", "deaf to the rail".** The Flow (p4, p6) and the PLAN (*"flat
  at 2048 at 25 °C"*) state the ideal. With the self-heating D1·030 taught (500 °C/W, ≈ 0.14 °C at 3.3 V), at 25 °C
  ambient the code is **2042, 2041, 2040** at 3.0, 3.3, 3.6 V: about 2 counts across the sweep (more rail heats the bead
  more), against the fixed input's 375. And 2048 sits exactly on a code edge: D1·070 told the room 1.65 V on 3.3 V reads
  *"2047 or 2048"*, and under the course's ADC-input model the settled divider truncates to 2047. The answer *"stays put"*
  stays the right option; the value 2048 and *"deaf"* rest on unstated assumptions. Options:
  - (a) the Flow unchanged; the plot's slider names the **bead's** temperature, the caption ends *"Ideal converter, fully
    settled; parts at nominal; the bead at the temperature shown (self-heating left out)."*, the Equation's assumptions 2
    and 3 give the sizes (2 counts; 2047 or 2048), and the teacher tip has the answer for the sharp learner
    (**recommended**: the room's ears hear the ideal, the bench states it);
  - (b) as (a), and p4 adds the owner's words, e.g. *"…stays put at 2048, to within a couple of counts of the bead's own
    self-heating."*;
  - (c) draw the self-heated line as well (2042 → 2040: 6 to 8 counts under the ideal, under 3 px apart; not
    recommended: a line the room cannot tell from the ideal).
- **F4 — "The excitation from the sensing module"** (p0) and *"our thermistor divider from the impedance module"* (p6):
  D1·030 (*Sensing*) and D1·040 (*The sensor as a source: impedance, dividers and loading*): ✓, no finding.
- **F5 — Proposals for the Equation**: the five-line derivation (one line per sentence of p5), V_dd pinned at line 4
  (the strike-out until X-cancel), `k * 2^N` pinned at line 5; the examples E1–E3 (25, 35, 15 °C), each *"at any rail"*;
  the four assumptions; no graph. And the requests X-cancel and ⌊ ⌋ (§12). Options: (a) all (**recommended**); (b)
  the PLAN's single line *code = (V_dd·k)/V_dd·2^N → k·2^N* as a two-line derivation (lines 4 and 5 only; the divider and
  the code are left to the words); (c) also ask Benches for the on-circuit version on card 4's `vdd-reference` scene (a
  crossing; not needed for this card).
- **F6 — Proposal: the y axis 1500–2600 codes, fixed.** Options: (a) 1500–2600 (**recommended**: the fixed input's fall is
  34 % of the height, the move to 35 °C 39 %, and every code of T 15–35 °C fits); (b) 0–4096, full scale (an honest
  baseline; the fall is 9 % of the height); (c) fitted to the data (the axis would refit when T moves and the move would
  vanish: not recommended).
- **F7 — Proposals**: the markers at 3.0, 3.3, 3.6 V; the caption; the suggested words on the strip; the spoken
  prediction before s3 (+0.1 min); the teacher tip (§7d); the explore task (§7e); the `1e-9` guard on every `floor`; the
  FR drafts.
- **F8 — The module runs ≈ 13 min short of its 30** (§2b: ≈ 17.3 min, every card its own spec's figure).
  Reported only.

**Decided 2026-10-20 (owner: *"apply all recommendations"* on the U018 brief):** **D1** — card 5 uses the PLAN's Plot and
Equation benches (§3a, §3b); **D5** — the course's converter truncates, codes are ⌊·⌋ (every curve and the statement use
`floor`); **F4** (ACCURACY D1·090-F4, applied) — *"about 2252 at 3.0 V"* in p3 and *"falls from 2252 to 1877"* in the PLAN,
recomputed here (§8); **N1** (applied) — the old *"[[demo]] Widget…"* line at the top of the Flow is gone, so the reveal is
not spoiled. The findings and proposals above (F1–F3, F5–F8) are new and **open**; F3 is an **accuracy** finding.

**Decided 2026-10-20, round two** (owner: *"apply all recommendations"* on the U018 page's *specs* section): F1 (a) the rail on the x axis, the temperature as the second showing at 35 °C; F2 (a) applied to `en.md`: the card's Flow fence is split in three (p0–p4 | p5 | p6–p7), no word changed; F3 = **D1·090-F7** (accuracy) (a): the Flow unchanged, the bench states the ideal (caption, the bead's temperature, assumptions, teacher tip), applied in this spec and in `ACCURACY.md`; every **Proposal** of F5–F7 taken (X-cancel and ⌊ ⌋ printed go to Benches in one crossing). F8: the module ≈ 17.3 of 30 min, reported.

## 15. Acceptance: how we know it is built right

- Plot A compiles with the fields of §3a (the two flat-line warnings expected) and shows, at the hover, `fixed` 2252 at
  3.0 V, 2112 at 3.2 V, 2048 at 3.3 V, 1877 at 3.6 V, and `ratio` 2048 at every x; plot B the same `fixed` line, `ratio`
  1614 and `ratio25` 2048 dashed. T at 15 °C gives 2510.
- The Equation compiles with no warning; its last derivation line is the statement; E1–E3 show 2048, 1614, 2510; at s2d
  both V_dd in line 4 light when V_dd is pinned (or §12 (b)'s fallback); pane, pin and step reach the wall.
- The poe fires before plot A opens; s1 reveals it.
- B1 one change per step; B2 only the rail (as the axis) and then T change; B4 the stills and the dashed 25 °C line; B5 each
  `say` on the strip; B6 V_dd lit at the moment it cancels; B9 the reveal waits; B10 the explain; B11 T one control away
  in Study; B13 values spoken, not written; B16 values on the axis, slider and readout; B17 both inputs on one code axis;
  B20 the strip's words and tip.
- C2 at 1920 × 1080 and 1024 × 768, labels clear; C3 nothing animates; C4 slope, dash and labels; C5 keys; C6 at 320; C8
  the print form.
- D Plot: no visible steps or risers; D Equation: examples and symbols as §8.
- E1–E6 for both blocks as presented, in both themes, EN and FR.
- **Six gates (this spec)**: (1) realism: the course's own divider, thermistor profile and truncating converter, a real
  3.0–3.6 V rail, nothing branded ✓; (2) science: the cancellation exact in the ideal, the real residues (self-heating,
  the code edge, tolerance) named and sized, raised as F3 (**accuracy, open**) ✓; (3) maths: every code recomputed in
  Node, exact on the edges (§8) ✓; (4) visualization: both inputs on one scale, the move shown against the line it left,
  the cancellation lit then gone; the strike-out itself waits for X-cancel ✓; (5) consistency: D1·030's 1.30 V, D1·040's
  5 kΩ, D1·070's 10.1 kΩ and 2047-or-2048, card 3's 2112, the decided 2252 ✓; (6) design: one slider row with words and
  symbol, every line labelled, label clearances named with their checks (§10) ✓ on paper.
