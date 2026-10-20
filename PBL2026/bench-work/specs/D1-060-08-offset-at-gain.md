```yaml
id: D1-060-08-offset-at-gain
card: "Offset is amplified exactly like the signal"
module: notes/Day01/060-conditioning/en.md
bench: Plot                       # exists; the module's centrepiece
library: "offset-at-gain: a Plot (what a 3.3 V ADC sees from a single-supply in-amp, clamp(G·(V_in + V_os), 0, 3.3), against V_in from 0 to 7 mV, the ideal G·V_in dashed, the 3.3 V ceiling marked; sliders G and V_os), defined in the card's `plot` block"
dimensions: 2D
stand_in: "the presenter drags the sliders on the wall window until X12 (named presets, mirrored)"
optional_benches: [Electronics]   # the PLAN's on-circuit version: the in-amp part's offset reveal (Electronics in development)
real_thing: "a single-supply instrumentation amplifier at G = 100–1000 with an input offset of up to ±3 mV, driving a 12-bit converter of 3.3 V full scale"
minutes: 3.0                      # on the bench: from the numeric to the card's end
card_minutes: 3.0
status: spec-draft
learner_action: numeric
predictions: []                   # the PLAN's numeric fires before the bench appears and is answered at s1
seeds: []
key_variable: "V_os at gain: the line's starting height, G·V_os, against the 3.3 V range"
time_scale: "none (slider states)"
steps: 6                          # s0, s1, s2a–c, s3
```

The Plot's format, read 2026-10-13 (`packages/insight-core/src/registry/plotBlock.ts`): `variable`, `domain`, `range`,
`parameters` (sliders), `curves` (an expression in the variable and parameters; `dashed`), `markers` (at a fixed x or
y), `animate` (one parameter swept), `readout`, `fixedView`. `clamp(x, lo, hi)` is in the expression language
(`expr/parse.ts`). As for D1·020 card 5: a plot's sliders are local to each window and not mirrored (X12).

## 1. What the room must understand

- **Statement** (verbatim): *The amplifier cannot tell its own input offset from your signal. At a gain of 500, a 2 mV
  offset is 1 V — a third of a 3.3 V ADC's range, gone before the signal arrives.*
- **SHOW (centrepiece)** (verbatim from the PLAN): *Plot — the ADC's view of the in-amp: y = clamp(G·(x + V_os), 0, 3.3)
  against x = V_in from 0 to 7 mV, with the ideal G·x dashed and the 3.3 V ceiling as a line; sliders G (1 to 1000) and
  V_os (−3 to +3 mV).*
- **Drive** (verbatim): *G = 500, V_os = 0 (the ceiling at 6.6 mV) → V_os to 2 mV → G at 100, 500, 1000 (the line
  starts at 0.2, 1.0, 2.0 V) → V_os to −2 mV.*
- **Look for** (verbatim): *a third of the range used before the input leaves zero; the ceiling now reached at 4.6 mV;
  and, with a negative offset, a dead zone where small signals read zero.*
- **Status** (verbatim): *ready (Plot: clamp) · the on-circuit version needs Electronics: in-amp with V_os (an offset
  reveal).*
- **Bench and library.** The **bench** is the Plot Bench. The **library** is this card's plot, `offset-at-gain`.
- **Insight**: *the offset sits at the input, so it gets the full gain: at high gain it uses up the converter's range
  before any signal arrives, and a negative one hides small signals at zero.*
- **Kind of knowledge**: *a relation between quantities* (the ADC's input against the sensor's), and *a contrast between
  two states* (ideal against offset). Card test → **Plot**. B17 applies (the ideal dashed beside the real line). B15,
  B18 and B19 do not.
- **Why this bench, not a still**: the line lifting as V_os slides, the ceiling arriving earlier, the lift tripling as G
  doubles, and the dead zone opening at a negative offset are four changes of one picture. Each is a slider move the room
  watches happen.
- **Key variable**: V_os, multiplied by G.

## 2. Time

The Flow is 258 words. p0, the `[[ask]]` question (27), is counted in the numeric. p2 *"[[demo]] Plot Bench: inject the
offset…"* (16) is a direction and is not spoken. **215 words are spoken around the bench = 1.65 min.**

| Beat | Minutes | Source of the number |
|---|---|---|
| The PLAN's numeric: p0 the question, the answer window (before the bench) | ≈ 1.0 | as D1·040's numerics |
| s0 G = 500, no offset: p3 *"On the Plot Bench: what the ADC sees…"* (40) | 0.31 | 40 ÷ 130 |
| s1 V_os to 2 mV, the reveal: p4 *"[[reveal]] The whole line lifts…"* (47); then p5 *"Every op-amp and in-amp has an **input offset voltage**…"* (38) held | 0.65 | 85 ÷ 130 |
| s2a–c G at 100, 500, 1000: p6 *"Watch the gain slider…"* (29) | 0.22 | 29 ÷ 130 |
| s3 V_os to −2 mV: p7 *"And if the offset is negative…"* (26) | 0.20 | 26 ÷ 130 |
| s3 held: p8 *"Firmware calibration can subtract an offset…"* (35) | 0.27 | 35 ÷ 130 |
| Slider moves not covered by speech (5 moves, ≈ 3–4 s each) | 0.30 | estimate |
| **Card total / of which on the bench** | **3.0 / 3.0** | |

**Module check**: `D1-060-02-what-conditioning-does.md` §2.

## 3. The scene: what is on the bench

### 3a. The plot (`offset-at-gain`)

| Field | Content | Source |
|---|---|---|
| `title` | *What the ADC sees from the in-amp* | the PLAN |
| `caption` | *The in-amp's input offset gets the same gain as the signal. Watch where the line starts.* | the statement |
| `variable` | `x` (the sensor's signal V_in, in mV) | the PLAN |
| `xLabel` / `yLabel` | *Signal at the in-amp's input, V_in (mV)* / *At the ADC's input (V)* | the PLAN |
| `domain` | [0, 7] | the PLAN |
| `range` | [−0.15, 3.6], `fixedView: true` | the 3.3 V range with room above the ceiling and a visible zero (F2) |
| `parameters` | `G` *Gain* (1–1000, default 500, step 1); `vos` *Input offset V_os* (−3 to +3, default 0, step 0.1, unit mV) | the PLAN |
| `curves` | `real`: `clamp(G * (x + vos) / 1000, 0, 3.3)`, label *What the ADC sees*, teal, solid, heavy; `ideal`: `G * x / 1000`, label *Ideal: G·V_in, no offset*, contrast, `dashed` | the PLAN |
| `markers` | y = 3.3, label *ADC full scale, 3.3 V*; y = 0, label *0 V: a single supply cannot go below* | the PLAN's ceiling; the Flow's p7 |
| `readout` | on: x and both curves' y at the hover | the Plot's default |

The `/ 1000` converts mV to V (x and V_os are in mV, the output in V). The real curve is drawn with enough points that
its corners at the floor and the ceiling stay sharp (1,000 across 7 mV gives one per 7 µV).

### 3b. The states the presenter sets (the PLAN's Drive)

| State | G | V_os | Where the real line starts | Where it meets 3.3 V | Codes used at V_in = 0 (12 bit) |
|---|---|---|---|---|---|
| s0 | 500 | 0 | 0 V | 6.60 mV | 0 |
| s1 | 500 | +2.0 mV | 1.000 V (30.3 %) | 4.60 mV | 1,241 |
| s2a | 100 | +2.0 mV | 0.200 V (6.1 %) | (31 mV, off the axis) | 248 |
| s2b | 500 | +2.0 mV | 1.000 V | 4.60 mV | 1,241 |
| s2c | 1000 | +2.0 mV | 2.000 V (60.6 %) | 1.30 mV | 2,482 |
| s3 | 1000 | −2.0 mV | 0 V until V_in = 2.00 mV (the dead zone) | 5.30 mV | 0 for every V_in below 2 mV |

**Values beside their element**: the readout at the hover; the slider values beside the sliders; the two markers'
labels on their lines. The 1.000 V, 30 % and 1,241 codes are said in the Flow, not written on the plot (B13), until X13
can pin a live value at x = 0 (F3).

**Colours and their second channel** (C4): the real line teal and heavy; the ideal contrast and **dashed**; the markers
labelled. Each is told apart by weight, dash and label as well as hue.

## 4. The run: step by step, as the Flow goes

### 4a. Steps (slider states; until X12 the presenter drags them on the wall window)

| # | id | Flow paragraph | What changes (`say`) | Setting | Presenter's control |
|---|---|---|---|---|---|
| — | the PLAN's numeric fires before the bench (p0 `[[ask]]`) | — | (§7a) | — | the activity |
| 0 | `s0-ideal` | p3 *"On the Plot Bench: what the ADC sees…"* | Gain 500, no offset: the line starts at zero and meets the 3.3 V ceiling at 6.6 mV. | G 500, V_os 0 | (the plot opens) |
| 1 | `s1-offset` | p4 *"[[reveal]] The whole line lifts…"*, then p5 held | A 2 mV offset lifts the whole line by 1.0 V: 30 % of the range used before the signal arrives, and the ceiling now at 4.6 mV. | V_os → 2.0 | slider |
| 2 | `s2-gain` (a, b, c) | p6 *"Watch the gain slider…"* | The more gain, the more the offset costs: 0.2 V at 100, 1.0 V at 500, 2.0 V at 1000. | G → 100, → 500, → 1000 | slider |
| 3 | `s3-dead-zone` | p7 *"And if the offset is negative…"*, then p8 held | A negative offset hides small signals: below 2 mV the ADC sees zero. | V_os → −2.0 | slider |

### 4b. Motion, cues and stills

| # | Motion | Movers | Cue | Hold | Reduced motion (C3) | Still |
|---|---|---|---|---|---|---|
| 0 | none | 0 | the two lines together, then the ceiling's label | hold | same | s0 |
| 1 | the real line rises as V_os is dragged from 0 to 2.0 mV (the presenter's drag, ≈ 2 s) | 1 | the gap between the dashed ideal and the real line opening at x = 0 | hold | the end state set at once | s1 |
| 2a–c | the real line's start rises or falls with G | 1 | the line's start at x = 0 | hold at each | each state at once | s2a, s2c |
| 3 | the line drops to the floor below 2 mV | 1 | the flat stretch along 0 V, beside the dashed ideal still rising | hold | at once | s3 |

There are five stills (s0, s1, s2a, s2c, s3). The dashed ideal moves only with G (linked motion: one mover).

## 5. Pacing and interaction, by surface and view

**Who paces** (B12): the presenter on the wall; the learner in Study Mode and Scope. **Until X12**, the plot's sliders
are not mirrored. The presenter drags them on the wall window and announces each setting (as D1·020 card 5, §5 and §13
there).

| View | Who | Controls |
|---|---|---|
| Preview (in the slide) | everyone | the plot at its defaults (G 500, V_os 0) |
| View (details) | everyone | the two sliders; the hover readout |
| Edit (session only) | everyone | not specified for the Plot Bench (its sliders already vary the values) |
| Authoring | authors | the `plot` block's YAML |

- **The presenter's strip** (B20): the six settings of §3b in order, with the next step's `say`; the teacher tip.
- **Study / Scope**: both sliders free (§7e).
- **Phone** (C6): the plot full width, the sliders under it, the caption; the two marker labels must not collide at 320.
- **Locked**: the plot opens only after the numeric is answered (the reveal waits, B9).

## 6. The frame

The Plot's viewer frame (the Canvas header and footer, D4.10–4.12): title *What the ADC sees from the in-amp*, the legend
(the real line teal, the ideal dashed), the sliders under the plot, the readout. There is no dock and there are no
panels on the Plot today.

## 7. Thinking, not watching

- **7a. The PLAN's ASK** (verbatim): *numeric (before the reveal) — "The in-amp has a 2 mV input offset and a gain of 500.
  How much of a 3.3 V ADC's range is gone before the signal arrives?" · answer: 30 % ± 2 % (1.0 V) · reveal: the Plot
  below, V_os slid from 0 to 2 mV at G = 500. · explain: The offset sits at the input, so it gets the full gain: 2 mV ×
  500 = 1.0 V, which is 30 % of 3.3 V, about 1,241 codes at 12 bits. · depth: use · practice: computational thinking.*
  It fires **before the bench appears**; **s1 reveals it**.
- **7b. Prediction point**: the numeric is the prediction.
- **7c. After**: the explain. In Study, done means the numeric was answered and both sliders were moved.
- **7d. Teacher tip** — **Proposal** (F4): *Expect 0.06 % from those who compare 2 mV with 3.3 V. Ask: where does the
  offset sit, before or after the gain?*
- **7e. Explore** (B11): in Study, G from 1 to 1000 and V_os from −3 to +3 mV. *Find the largest gain a ±1 mV part allows
  if the offset may use no more than 10 % of the range* (330 mV / 1 mV = 330).

## 8. Faithfulness (the quality bar)

**Arithmetic** (y = clamp(G·(x + V_os), 0, 3.3), x and V_os in mV):
- s0: the ceiling at x = 3.3 V / 500 = **6.60 mV** ✓ (the PLAN's 6.6 mV).
- s1: 500 × 2 mV = **1.000 V** ✓; 1.000 / 3.3 = **30.3 %** ✓ (the answer's 30 % ± 2 %); 1.000 / 3.3 × 4096 = **1,241**
  codes ✓; the ceiling at 6.60 − 2.00 = **4.60 mV** ✓.
- s2: 100 × 2 mV = **0.200 V** ✓; 1000 × 2 mV = **2.000 V** ✓ (the PLAN's 0.2, 1.0, 2.0 V). At G = 100 the ceiling is at
  33 − 2 = 31 mV, off the 7 mV axis. At G = 1000 it is at 3.3 − 2 = 1.30 mV.
- s3: at G = 1000, V_os = −2 mV, the output is 0 until x = 2.00 mV and reaches 3.3 V at **5.30 mV**.
- **"A third"** (the statement) against **30 %** (the PLAN's answer and the Flow's p4): 1.0/3.3 = 0.303, a little under
  a third (0.333) (F1).
- **Real values** (cited here only, never on a teaching surface): input offset of instrumentation amplifiers runs from
  tens of µV (precision, zero-drift parts) to a few mV (general-purpose CMOS and older bipolar parts); ±3 mV covers the
  class. Gains of 100–1000 are the in-amp's normal range for a 20 mV full-scale shunt into a 3.3 V converter.

**Section D, Plot rows**
- [x] The expression is the physics: the in-amp's output G·(V_in + V_os), clamped by its single supply at 0 V and by the
  converter's 3.3 V full scale (the Flow's p7 and the PLAN). The model treats the ceiling as the converter's input range
  (§9, F2).
- [x] Axis and slider ranges real: 0–7 mV covers the 20 mV shunt's lower third at the gains used; G and V_os as above.
- [x] One worked value checked: s1 at x = 0 gives 1.000 V.
- [x] No artefacts: the clamp's corners are drawn as corners (1,000 points), not slopes.

**A1–A8**: A1 ✓; A2 ✓ (the offset, the clamp at both rails and the dead zone are the non-ideal; the ideal is dashed
beside it); A3 n/a; A4 ✓ (12 bits at 3.3 V, the course's converter: the cold open's 2047); A5 n/a; A6 ✓ (the floor's
marker *a single supply cannot go below*); A7 ✓ (G = 500 and 3.3 V as cards 3 and 9; the 1,241 codes as D1·010's 12-bit
converter); A8 ✓.

## 9. Faults and non-ideal behaviour

**PLAN FAULT** (verbatim): *Offset at gain (a wrap-up staple): a positive offset reads current when none flows; a
negative one hides small currents in a dead zone at zero. Calibration can subtract the first; the range it used is gone
either way.* s1 and s3 are its two halves. The wrap-up (D3·070) can reopen the plot at those settings.

Also, a real single-supply in-amp's output stops tens of mV short of each rail (its output swing). Drawn ideal here, the
model's floor is 0 V exactly. This is noted for the on-circuit version (Electronics).

## 10. Accessibility, legibility and print

- Wall (C2): the axis labels, the slider labels and values, the legend and the markers' labels at the Plot's wall size.
  Check at 1920 × 1080 and 1024 × 768.
- Reduced motion (C3): each setting lands at once.
- Colour (C4): real against ideal by weight and dash; the markers labelled.
- Keyboard (C5): the sliders' arrow keys; Tab between them.
- Print (C8): the five stills of §4b, each with its `say` and its row of §3b.

## 11. Assets to make or source

| Asset | Format | Made by | Status |
|---|---|---|---|
| The `plot` block (§3a) | YAML in `en.md` | the author | to write |

## 12. Bench capabilities this needs

**Plot Bench**: `parameters`, `curves` with `clamp` and `dashed`, `markers` on the y axis, `range` with `fixedView`,
`readout`: **all exist**.

**Missing (request it)**:
- **X12** (already requested): named slider presets the presenter steps through, mirrored to the wall and devices. The
  six settings of §3b are this card's presets.
- **X13** (already requested): a marker whose position is an expression, here the line's start at x = 0 (G·V_os) and
  the ceiling's crossing at 3.3/G − V_os, each with its value.

**Not possible, and not needed**: the plot computing codes; the Flow says them.

## 13. Stand-in for the lecture

Until X12, the presenter drags G and V_os on the wall window to the settings on the strip, as on D1·020 card 5. The room
sees the drag, which carries the motion of §4b. Nothing else is lost.

## 14. Findings for the owner

- **F1 (A7) — "A third" in the statement, 30 % in the answer.** The card's statement says *"1 V — a third of a 3.3 V
  ADC's range"*; the PLAN's answer and the Flow's p4 say *30 %*, and the Look for says *"a third of the range"*. 1.0/3.3 =
  30.3 %, a third is 33.3 %. The options:
  - (a) *"nearly a third"* in the statement and the Look for (**recommended**: one word, and both stay true);
  - (b) *"30 %"* in both;
  - (c) leave it: the numeric's ± 2 % does not accept 33 %, so a learner who trusts the statement is marked wrong.
- **F2 — The 3.3 V ceiling is the converter's, the 0 V floor is the in-amp's.** The PLAN's clamp(…, 0, 3.3) is right if
  the in-amp runs from a single supply and the converter clips (or is protected) at 3.3 V. That is the module's in-amp
  as recommended in U015 (DECISIONS 2026-10-13): a single-supply part, its inputs rated for 12 V, its output into the
  ADC through a clamp. No change to the text.
- **F3 — The codes are spoken, not drawn.** 1,241 codes and 30 % are said in p4. Until X13 lets the plot pin a live
  value at x = 0, they are not written on the plot (B13 keeps the narration off the screen anyway).
- **F4 — Proposals**: the teacher tip (§7d) and the explore task (§7e).

## 15. Acceptance: how we know it is built right

- The plot compiles with the fields of §3a. At s1 (G 500, V_os 2.0) the real line starts at 1.000 V and meets 3.3 V at
  4.60 mV. Each row of §3b reads as written, checked with the hover readout. The clamp's corners are sharp.
- The numeric fires before the plot opens.
- B1 one setting per step; B2 only the real line moves (the ideal with G); B4 five stills; B5 each `say` on the strip;
  B6 the gap at x = 0 opening; B7 one mover; B9 the reveal waits; B10 the explain; B11 both sliders in Study after the
  guided pass; B13 labels and values only; B16 the readout; B17 the ideal beside the real; B20 the settings on the strip.
- C2 legible at 1920 × 1080 and 1024 × 768; C3 each setting at once; C4 dash and weight; C5 slider keys; C6 at 320; C8
  the stills.
