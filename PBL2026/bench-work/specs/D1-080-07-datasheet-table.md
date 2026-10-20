```yaml
id: D1-080-07-datasheet-table
card: "The table everyone scrolls past"
module: notes/Day01/080-adc-conversion/en.md
bench: Plot                       # exists; with the Figure Bench (exists) for the table (D1, 2026-10-20)
library: "adc-transfer-errors: a Plot of a 3-bit converter's transfer staircase against its input (0 to full scale), the ideal staircase and the ideal straight line dashed, four error sliders (offset, gain, INL, DNL) and a two-point-line switch, defined in the card's `plot` block; plus `adc-accuracy-table`: a Figure of our own unbranded datasheet page (the ADC accuracy table of a 12-bit MCU SAR converter, VREF 3.3 V, 25 °C), toured row by row"
dimensions: 2D
stand_in: "until a Canvas can hold the Figure and the Plot side by side (F-c7-4), the Figure is toured first and the Plot follows on the same card; until X12, the presenter drags the Plot's sliders on the wall window"
optional_benches: [Figure]        # the PLAN's second bench; both are this card's
real_thing: "the accuracy table of a 12-bit MCU SAR converter on a 3.3 V reference (offset, gain, INL, DNL and total unadjusted error in LSB, typical and maximum at 25 °C), and that converter's truncating transfer function, drawn at 3 bits with each error exaggerated"
minutes: 2.3                      # on the bench: from p1's [[demo]] to the card's end, less the multi-select (§2)
card_minutes: 3.5
status: spec-draft
learner_action: multi-select
predictions: []                   # the PLAN's multi-select is the prediction: it fires after s4, before the reveal s5
seeds: [S21]                      # planted by p7 (the PLAN's SEED line); harvested in D2·050 "What two points can fix"
key_variable: "which error is switched on, and whether the converter's code transitions still lie on one straight line"
time_scale: "none (slider states)"
steps: 10                         # s0, s1, s2, s3, s4, s5a–s5e
```

The first spec for this card. Formats read 2026-10-20 (read-only) in `C:\ExSightory\src\insight\packages\insight-core\src\registry\`:
`plotBlock.ts` (`variable`, `domain`, `range`, `parameters`, `curves` with `dashed`, `series`, `markers` at a fixed x or y,
`animate`, `readout`, `fixedView`, `aspect`) and the expression language (`expr/parse.ts`, `expr/evaluate.ts`: `floor`,
`clamp`, `min`, `max`, `round`, `mod`, and **`step(edge, x)`**, 0 below the edge and 1 at or above it). `figureBlock.ts`:
`image`, `alt`, `caption`, `features` (stable ids; `rect` and other geometry as fractions), `labels`, `emphasis`,
`spotlight`, `tour` (each step a `feature`, an optional `zoom` target and a `note`), `zoom`, `compare`, `reveal`. The
Plot's sampler (`canvas/src/plotModel.ts`, `sampleCurve`) samples about one point per 1.5 px of plot width and **ends a
segment at any non-finite value**; §3a uses that to keep the two-point line off the stage until the reveal (X10 stand-in).

## 1. What the room must understand

- **Statement** (verbatim): *An ADC datasheet lists offset error, gain error, INL and DNL. Offset and gain move the whole
  transfer line; INL and DNL bend it and make its steps unequal.*
- **SHOW** (verbatim from the PLAN): *Figure — the ADC accuracy table from a real MCU datasheet (offset error, gain error,
  INL, DNL, absolute accuracy, in LSB), toured row by row; beside it a Plot of the transfer line: the ideal staircase,
  then offset (a shift), gain error (a tilt), INL (a bow, a·x·(1 − x)) and DNL (uneven steps), each a curve that can be
  shown on its own.*
- **Drive** (verbatim): *tour a row; show its curve.*
- **Look for** (verbatim): *two rows move the whole line, two bend it.*
- **Status** (verbatim): *Plot ready · needs asset: the datasheet's ADC-characteristics page (PDF).* Superseded on the
  asset by **N4** (owner, 2026-10-20, "go with your recommendations"): the table is **our own unbranded datasheet page**
  with values of the class, its sources cited in §8 only. The PLAN's words *"from a real MCU datasheet"* and the Status's
  PDF are the owner's to update (§14, F-c7-6).
- **Benches and libraries.** The **benches** are the Plot Bench and the Figure Bench (D1, 2026-10-20: the PLAN's
  benches). The **libraries** are this card's plot, `adc-transfer-errors`, and its figure, `adc-accuracy-table`.
- **Insight**: *offset and gain errors keep every code transition on one straight line, so two points can put that line
  back; INL and DNL move transitions off any straight line, so no two points can.*
- **Kind of knowledge**: *a contrast between two states* (straight-line errors against bending ones) shown through *a
  relation between quantities* (code against input). Card test → **Plot**; the table is a document → **Figure**. B17
  applies (the ideal dashed beside the real staircase; the two-point line laid over each). B15, B18, B19 do not.
- **Why these benches, not a still**: each error grows from zero as its slider moves, so the room sees what *kind* of
  change it is (the whole line shifts; it tilts; it bows; one step shrinks until a code disappears), and then one line
  laid over four curves sorts them into two halves. Four stills could show the end states but not the sorting.
- **Key variable**: which error is on, read as *do the transitions still lie on one straight line?*

## 2. Time

The card's Flow is **228 words**. p4, the `[[ask]]` (16 words), is counted in the multi-select. **212 words are spoken
= 1.63 min** (recounted 2026-10-20 with Node over the current `en.md`; cue markers and bold stripped).

| Beat | Minutes | Source of the number |
|---|---|---|
| p0 *"Every MCU datasheet has a table…"* (29), before the bench | 0.22 | 29 ÷ 130 |
| s0: p1 *"[[demo]] Here is one, beside the converter's transfer line…"* (32) | 0.25 | 32 ÷ 130 |
| s0: the Figure's tour, the conditions and five rows, unscripted (≈ 40 words: *"offset, gain, INL, DNL and the total; typical and maximum, in LSB; one LSB here is 0.8 mV"*) | 0.31 | estimate, 40 ÷ 130 |
| s1–s2: p2 *"**Offset error** shifts the whole line…"* (33) | 0.25 | 33 ÷ 130 |
| s3–s4: p3 *"**Integral nonlinearity**, INL, bends the line…"* (47) | 0.36 | 47 ÷ 130 |
| Slider moves s1–s4 not covered by speech (offset 0→1; offset back, gain 0→1; gain back, INL 0→1; INL back, DNL 0→0.5→1: ≈ 19 s) | 0.32 | estimate, ≈ 3 s a move |
| The multi-select: p4 the question (16 words), the answer window, the spread (p5 `[[pause]]`) | 0.90 | the task's figure for a multi-select |
| s5a–e: p6 *"[[reveal]] Offset and gain…"* (45) | 0.35 | 45 ÷ 130 |
| Slider moves s5a–e (the switch on, then four error changes: ≈ 18 s) | 0.30 | estimate |
| s5e held: p7 *"So read the table in two halves…"* (26) | 0.20 | 26 ÷ 130 |
| **Card total / of which on the bench** | **3.46 ≈ 3.5 / 2.34 ≈ 2.3** | on the bench = total − p0 − the multi-select |

The approved brief page said ≈ 3.2 min; the difference is the reveal's walk over four curves (0.30) and the table's
unscripted tour (0.31), both counted here and both named. With the Figure and Plot side by side (F-c7-4 (a)) the tour
can ride on p1 and p2 and the estimate drops by about 0.2 min.

**Module check**: `D1-080-03-quantization-floor.md` §2.

## 3. The scene: what is on the bench

### 3a. The plot (`adc-transfer-errors`)

**The model** (the course's converter type, A2: truncating, code = ⌊input / LSB⌋), at **3 bits** so each step can be
seen. The input x is a fraction of full scale (0 to 1 = 0 to V_REF); one LSB is 1/8. The ideal converter's transitions
are at T_k = k/8 (k = 1…7): code k from T_k upwards, so 0 V gives code 0 and full scale gives code 7. The ideal straight
line is **y = 8x**, which passes through every transition's top corner (k/8, k) and runs *"from zero to full scale"*
(the Flow's p1): (0, 0) to (1, 8 = 2³).

Each error moves the transitions. With the sliders' values eo, eg, ei, ed:

- DNL: u_k = (k + ed·e_k)/8, with e = [0, +0.25, −0.25, +0.5, −0.5, +0.25, 0] LSB (the two end transitions never move);
- INL, a bow a·u·(1 − u) on the input axis (the PLAN's *a·x·(1 − x)*), a = 0.5·ei: v_k = u_k − 0.5·ei·u_k·(1 − u_k);
- gain and offset: **T_k = (v_k − 0.1875·eo) / (1 + 0.125·eg)**.

At full slider, offset (eo = 1) lifts the line by **1.5 LSB** (0.1875 = 1.5/8); gain (eg = 1) makes its slope 9 instead
of 8, **+1 LSB at full scale**; INL (ei = 1) bows it by up to **1 LSB** from the ideal line, **0.5625 LSB** from the
end-point line; DNL (ed = 1) gives code widths 1.25, 0.5, 1.75, **0**, 1.75, 0.75 LSB, so **code 4 goes missing**. All
recomputed in §8.

**The real staircase is one expression**: the code is the number of transitions at or below the input, Σ step(T_k, x).
That form is chosen over a `series` of points and over floor-of-a-transformed-input because (i) DNL moves single
transitions, which no smooth transform of x can do, and a `series` is fixed points that cannot follow a slider;
(ii) one expression carries all four errors, so each is shown on its own by its slider and any mix can be explored in
Study; (iii) every transition is exact, so a missing code is a true zero-width step. The single-error forms below are
the same staircases (checked equal at 10,001 points each, §8) and are kept as the spec's cross-check:

| Error alone | Transformed input | Transitions |
|---|---|---|
| none (ideal) | `clamp(floor(8 * x), 0, 7)` | k/8 |
| offset, eo = 1 | `clamp(floor(8 * x + 1.5), 0, 7)` | (k − 1.5)/8 |
| gain, eg = 1 | `clamp(floor(9 * x), 0, 7)` | k/9 |
| INL, ei = 1 | `clamp(floor(8 * (sqrt(0.25 + 2 * x) - 0.5)), 0, 7)` (the inverse of v = u − 0.5·u·(1 − u)) | v(k/8) |
| DNL | no transform: the step sum | (k + e_k)/8 |

| Field | Content | Source |
|---|---|---|
| `title` | EN *The transfer line, at 3 bits* · FR *La droite de transfert, sur 3 bits* | the PLAN |
| `caption` | EN *A 3-bit converter with each error exaggerated so it can be seen. The 12-bit converter in the table has errors of a few LSB out of 4,096.* · FR *Un convertisseur de 3 bits, chaque erreur exagérée pour être visible. Le convertisseur de 12 bits du tableau a des erreurs de quelques LSB sur 4 096.* | A6 (D1, 2026-10-20: *labelled on the stage*) |
| `variable` | `x` | |
| `xLabel` / `yLabel` | EN *Input, as a fraction of full scale (V_REF)* / *Code* · FR *Entrée, en fraction de la pleine échelle (V_REF)* / *Code* | |
| `domain` | [0, 1] | 0 V to V_REF |
| `range` | [−0.5, 9.5], `fixedView: true` | codes 0–7, and room for the two-point line's 9 at full scale under gain |
| `aspect` | `wide` | |
| `parameters` (one row, side by side, each label on top in words with the symbol in parentheses and the value at its right: memory *sliders-side-by-side*) | `eo` EN *Offset error (E_O)* FR *Erreur de décalage (E_O)*: −1 to 1, default 0, step 0.05 · `eg` EN *Gain error (E_G)* FR *Erreur de gain (E_G)*: −1 to 1, default 0, step 0.05 · `ei` EN *Integral nonlinearity (INL)* FR *Non-linéarité intégrale (INL)*: 0 to 1, default 0, step 0.05 · `ed` EN *Differential nonlinearity (DNL)* FR *Non-linéarité différentielle (DNL)*: 0 to 1, default 0, step 0.05 · `tp` EN *Two-point line (0 off, 1 on)* FR *Droite à deux points (0 non, 1 oui)*: 0 to 1, default 0, step 1 | the PLAN's four errors; the reveal's line |
| `curves` | `real` (teal, solid, heavy), EN *This converter* FR *Ce convertisseur*: the step sum below · `ideal-steps` (contrast, `dashed`), EN *Ideal staircase* FR *Escalier idéal*: `clamp(floor(8 * x), 0, 7)` · `ideal-line` (contrast, `dashed`, thin), EN *Ideal line, zero to full scale* FR *Droite idéale, de zéro à la pleine échelle*: `8 * x` · `two-point` (lime, solid), EN *Two-point line: straight through two points near the ends* FR *Droite à deux points : droite passant par deux points près des extrémités*: `((8 + eg) * x + 1.5 * eo + 0.4375 * ei) / tp` | §3a's model |
| `markers` | y = 7, EN *Top code (7)* FR *Code maximal (7)*; x = 1, EN *Full scale (V_REF)* FR *Pleine échelle (V_REF)* | |
| `readout` | on (x and each curve's y at the hover) | the Plot's default |

The `real` curve's expression (verified, §8):

```
step((0.125 - 0.0546875 * ei - 0.1875 * eo) / (1 + 0.125 * eg), x)
+ step((((2 + 0.25 * ed) / 8) - 0.5 * ei * ((2 + 0.25 * ed) / 8) * (1 - ((2 + 0.25 * ed) / 8)) - 0.1875 * eo) / (1 + 0.125 * eg), x)
+ step((((3 - 0.25 * ed) / 8) - 0.5 * ei * ((3 - 0.25 * ed) / 8) * (1 - ((3 - 0.25 * ed) / 8)) - 0.1875 * eo) / (1 + 0.125 * eg), x)
+ step((((4 + 0.5 * ed) / 8) - 0.5 * ei * ((4 + 0.5 * ed) / 8) * (1 - ((4 + 0.5 * ed) / 8)) - 0.1875 * eo) / (1 + 0.125 * eg), x)
+ step((((5 - 0.5 * ed) / 8) - 0.5 * ei * ((5 - 0.5 * ed) / 8) * (1 - ((5 - 0.5 * ed) / 8)) - 0.1875 * eo) / (1 + 0.125 * eg), x)
+ step((((6 + 0.25 * ed) / 8) - 0.5 * ei * ((6 + 0.25 * ed) / 8) * (1 - ((6 + 0.25 * ed) / 8)) - 0.1875 * eo) / (1 + 0.125 * eg), x)
+ step((0.875 - 0.0546875 * ei - 0.1875 * eo) / (1 + 0.125 * eg), x)
```

(0.0546875 = 0.5 × 0.125 × 0.875 = 0.5 × 0.875 × 0.125: the two end transitions carry the same INL shift and no DNL.)

**The two-point line.** It is the straight line through the **first and last code transitions**, (T_1, 1) and (T_7, 7):
the *end-point line* that the table's INL is measured from (§8) and the line a two-point calibration puts back. Through
those two points its equation reduces to **y = (8 + eg)·x + 1.5·eo + 0.4375·ei** (DNL never moves the end transitions,
so ed is absent). Under offset or gain alone every transition lies on it, exactly as every ideal transition lies on
y = 8x: the error is gone once the line is known. Under INL or DNL the inner transitions sit off it (§8). Its stage label
says *"two points near the ends"* rather than *"the end transitions"*, because with the offset at +1 the first
transition is at −0.0625 (below 0 V, off the plot; the line still passes through it, extended).

**Hiding it until the reveal (X10 stand-in).** Divided by `tp`, the line is ±∞ or NaN when tp = 0 at every x; the
sampler ends a segment at any non-finite value, so nothing is drawn. At tp = 1 it is the line. The legend still lists it,
and the readout's behaviour at tp = 0 is to check (§12, §15). When X10 lands, `tp` and the division go.

**Each error on its own (the PLAN's *"each a curve that can be shown on its own"*).** Without X10 a curve cannot be
hidden, and four extra staircases on one plot would bury each other. So the four errors are **one staircase with four
sliders**, each moved from 0 on its own while the others sit at 0; the presenter's states are §3c's presets (X12).

### 3b. The figure (`adc-accuracy-table`): our own datasheet page, unbranded (N4)

An SVG drawn in a datasheet's look: a section heading *ADC accuracy* (no maker, logo, part number or document number),
a conditions line, a table, two footnotes. Values are the class's (sources in §8, never on the page).

| Symbol | Parameter | Typ | Max | Unit |
|---|---|---|---|---|
| E_O | Offset error | ±1 | ±3 | LSB |
| E_G | Gain error | ±1.5 | ±4 | LSB |
| E_I | Integral nonlinearity (INL) | ±1.5 | ±2.5 | LSB |
| E_D | Differential nonlinearity (DNL) | ±0.5 | ±1 | LSB |
| E_T | Total unadjusted error (absolute accuracy) — **Proposal** (F-c7-5) | ±2.5 | ±6 | LSB |

Conditions line (as approved): *12-bit resolution, V_REF = 3.3 V, T_A = 25 °C*. Footnotes — **Proposal** (F-c7-5):
*1 LSB = V_REF / 4096 = 0.806 mV.* · *INL is measured from the end-point line; monotonic, no missing codes.*
FR: *Précision du CAN* · *Erreur de décalage, Erreur de gain, Non-linéarité intégrale, Non-linéarité différentielle,
Erreur totale non ajustée* · *Résolution 12 bits, V_REF = 3,3 V, T_A = 25 °C* (French decimal comma in the drawn page as a
French datasheet prints it; numbers otherwise unchanged).

| Feature id | What | Geometry |
|---|---|---|
| `conditions` | the conditions line | rect |
| `row-offset` | the E_O row | rect |
| `row-gain` | the E_G row | rect |
| `row-inl` | the E_I row | rect |
| `row-dnl` | the E_D row | rect |
| `row-total` | the E_T row (if F-c7-5 is taken) | rect |

Tour: `conditions` (*12 bits on 3.3 V: one LSB is 0.806 mV*) → `row-offset` (*shifts the whole line*) → `row-gain`
(*tilts it*) → `row-inl` (*bends it*) → `row-dnl` (*makes the steps unequal*) → `row-total` (*all of them together, at
worst*). `labels: numbers`, `spotlight: dim`. Each note is EN and FR.

### 3c. The states the presenter sets (presets for X12)

| State | eo | eg | ei | ed | tp | What the room sees |
|---|---|---|---|---|---|---|
| s0 | 0 | 0 | 0 | 0 | 0 | the real staircase on the ideal one, under y = 8x |
| s1 | 1 | 0 | 0 | 0 | 0 | the whole staircase 1.5 LSB up: 0 V reads **code 1**; code 7 from 0.6875 FS |
| s2 | 0 | 1 | 0 | 0 | 0 | tilted: code 7 from **0.778 FS** instead of 0.875 |
| s3 | 0 | 0 | 1 | 0 | 0 | bowed: the middle transition at 0.375 FS instead of 0.5 |
| s4 | 0 | 0 | 0 | 0.5 → 1 | 0 | uneven steps (widths 1.125 … 0.5 LSB), then **code 4 gone** (3 jumps to 5 at 0.5625 FS) |
| s5a | 1 | 0 | 0 | 0 | 1 | the two-point line through every corner of the shifted staircase |
| s5b | 0 | 1 | 0 | 0 | 1 | through every corner of the tilted one |
| s5c | 0 | 0 | 1 | 0 | 1 | through the two end corners; the middle ones up to 0.56 LSB off it |
| s5d | 0 | 0 | 0 | 1 | 1 | through the end corners; the inner ones ±0.25 and ±0.5 LSB off it |
| s5e | 0 | 0 | 0 | 0 | 1 | held: the ideal staircase under its line: the steps, the quantization floor, are still there |

**Values beside their element**: the sliders' values at their labels; the hover readout; the markers' labels. The LSB
figures above are spoken or in the presenter's notes, not written on the plot (B13).

**Colours and their second channel** (C4): the real staircase teal and heavy; the ideal staircase and line contrast and
**dashed** (the line thinner); the two-point line lime, solid, labelled in the legend; markers labelled. Weight, dash and
label tell them apart as well as hue.

## 4. The run: step by step, as the Flow goes

### 4a. Steps

| # | id | Flow paragraph | What changes (`say`) | Overlay for the room | Presenter's control |
|---|---|---|---|---|---|
| — | p0 *"Every MCU datasheet has a table…"* | before the bench | — | — | — |
| 0 | `s0-table-and-line` | p1 *"[[demo]] Here is one, beside the converter's transfer line…"* | The accuracy table, row by row; then the ideal converter: a staircase on a straight line from zero to full scale. | the Figure's row highlight and note; then the Plot at s0 | the Figure's tour steps; then the Plot |
| 1 | `s1-offset` | p2 *"**Offset error** shifts the whole line…"* (first two sentences) | Offset shifts the whole staircase: here 0 V now reads code 1. | E_O slider at 1 | slider eo 0 → 1 |
| 2 | `s2-gain` | p2 (*"**Gain error** tilts it…"* to *"…straight-line errors."*) | Gain tilts it: the top code arrives at the wrong input. | E_G at 1 | eo → 0; eg 0 → 1 |
| 3 | `s3-inl` | p3 (*"**Integral nonlinearity**, INL, bends the line…"*) | INL bends it: the middle of the staircase bows away from a straight line. | INL at 1 | eg → 0; ei 0 → 1 |
| 4 | `s4-dnl` | p3 (*"**Differential nonlinearity**, DNL…"* to the end) | DNL makes the steps unequal; when one shrinks to nothing, its code goes missing. | DNL at 0.5, then 1 | ei → 0; ed 0 → 0.5 → 1 |
| — | the multi-select, p4–p5 (§7a) | | | | the activity |
| 5a | `s5a-line-offset` | p6 *"[[reveal]] Offset and gain. Two points define a straight line…"* | The two-point line passes through every corner of the shifted staircase. | two-point line on | tp → 1; ed → 0; eo → 1 |
| 5b | `s5b-line-gain` | p6 (*"…a shift or a tilt."*) | And through every corner of the tilted one: offset and gain are gone once the line is known. | | eo → 0; eg → 1 |
| 5c | `s5c-line-inl` | p6 (*"A bend, or an uneven step, is still there between the points."*) | Over the bend, the line meets only the two ends; the middle stays off it. | | eg → 0; ei → 1 |
| 5d | `s5d-line-dnl` | p6 (same sentence) | Over the uneven steps, the same: the inner corners stay off the line. | | ei → 0; ed → 1 |
| 5e | `s5e-floor` | p6 (*"And the quantization floor stays…"*), then p7 held | Even a perfect line leaves the staircase: the quantization floor stays. | | ed → 0 |

### 4b. Motion, cues and stills

| # | Motion | Movers | Cue and its second channel | Hold | Reduced motion (C3) | Still |
|---|---|---|---|---|---|---|
| 0 | the Figure's spotlight moving row to row; then none | 1 | the dimmed page with one row lit and numbered | hold | each row lit at once | s0-table, s0-plot |
| 1 | the staircase rises as eo is dragged (≈ 2 s) | 1 | the first step leaving 0 at x = 0; the gap to the dashed ideal | hold | the end state at once | s1 |
| 2 | the staircase steepens (≈ 2 s) | 1 | the top step's start moving left of the dashed one | hold | at once | s2 |
| 3 | the middle bows (≈ 2 s) | 1 | the middle corners pulling away from the dashed line | hold | at once | s3 |
| 4 | steps widen and narrow; step 4 closes (≈ 3 s) | 1 | the code-4 tread shrinking to nothing; the jump from 3 to 5 | hold at 0.5 and at 1 | each state at once | s4a, s4b |
| 5a–d | the line appears (at once); then each error's change as above | 1 (the staircase; the line follows its sliders) | the corners on or off the lime line | hold at each | at once | s5a, s5b, s5c, s5d |
| 5e | the staircase back to ideal | 1 | the steps under the line | hold | at once | s5e |

Twelve stills: s0-table, s0-plot, s1, s2, s3, s4a, s4b, s5a, s5b, s5c, s5d, s5e.

## 5. Pacing and interaction, by surface and view

**Who paces** (B12): the presenter on the wall; the learner in Study Mode and Scope. **Until X12**, the plot's sliders
are local to each window and not mirrored: the presenter drags them on the wall window to §3c's states (as D1·060
card 8). The Figure's tour is drivable and mirrored.

| View | Who | Controls |
|---|---|---|
| Preview (in the slide) | everyone | the Figure: the page, the current row; the Plot: at its defaults (s0) |
| View (details) | everyone | the Figure's tour, zoom to a row; the Plot's five sliders in one row and the hover readout |
| Edit (session only) | everyone | not specified for either bench (the sliders already vary the values) |
| Authoring | authors | the `figure` and `plot` blocks' YAML |

- **The presenter's strip** (B20): the Figure's tour (*step n / 6* and its note); then §3c's states in order, each with
  its `say`; the teacher tip.
- **Study / Scope**: all five sliders free, mixes included (§7e).
- **Phone** (C6): the Figure full width, then the Plot full width; the sliders wrap to one per line; the legend's four
  entries and the two marker labels must not collide at 320 px.
- **Locked**: the two-point line stays off (tp = 0) until the multi-select closes (the presenter does not touch it; the
  Plot has no lock, X10).

## 6. The frame

The Figure's viewer frame (title *ADC accuracy*, its tour pills, the key of numbered rows) and the Plot's viewer frame
(title, legend, the slider row under the plot, the readout). Neither bench has a dock or panels; nothing is drawn over
the stage.

| Tile / panel | Used? | Selected item | List / contents |
|---|---|---|---|
| Figure: tour | yes | the lit row | the six tour steps (§3b) |
| Figure: key | yes | — | the numbered rows |
| Plot: legend | yes | — | this converter, ideal staircase, ideal line, two-point line |
| Plot: sliders | yes | each slider's value at its label | E_O, E_G, INL, DNL, two-point line |

## 7. Thinking, not watching

- **7a. The PLAN's ASK** (verbatim): *multi-select (after the tour) — "Which of these can a two-point calibration
  remove?" · options: offset error | gain error | INL | DNL | quantization error · answer: offset error; gain error ·
  reveal: a straight line through the two end points laid over each curve on the Plot. · explain: Two points define a
  straight line, so they correct any error that is itself a straight line — a shift or a tilt; a bend or an uneven step
  is still there between the points. · depth: understand · practice: arguing from evidence.* It fires at the Flow's p4
  `[[ask]]`, **after s4**; **s5a–s5e reveal it**.
- **7b. Prediction point**: the multi-select is the prediction; the two-point line waits for it.
- **7c. After the reveal**: the explain. In Study, done means the multi-select answered and the two-point line switched
  on over at least one bending error.
- **7d. Teacher tip** — **Proposal** (F-c7-7): *Expect INL ticked by those who think "calibration fixes accuracy". Ask:
  how many numbers does a two-point calibration store, and how many numbers would it take to describe a bow?*
- **7e. Explore** (B11): in Study, every slider, mixes included. **Proposal** (F-c7-7): *Set the offset to −1. Which
  inputs read 0, and can a calibration point at 0 V see this offset?* (0 to 0.3125 of full scale read 0, and the top
  code never arrives: §9.)

## 8. Faithfulness (the quality bar)

**Arithmetic** (Node, 2026-10-20; transitions as fractions of full scale; LSB = 1/8 on the plot):

- **Ideal**: T = 0.125, 0.25, …, 0.875; y = 8x through every (T_k, k); code at 0 V = 0, at full scale = 7.
- **Offset, eo = 1**: T_k = (k − 1.5)/8 = −0.0625, 0.0625, 0.1875, 0.3125, 0.4375, 0.5625, 0.6875. Code at 0 V = **1**.
  Two-point line y = 8x + 1.5; every transition on it (residuals 0.0000 LSB).
- **Offset, eo = −1** (explore): T = 0.3125 … 1.0625: 0 V to 0.3125 FS read 0; the last transition is above full
  scale, so code at full scale = **6**. Residuals 0.
- **Gain, eg = 1**: T_k = k/9 = 0.1111 … 0.7778 (ideal 0.875). Line y = 9x; residuals 0; widths all 1/9 FS, so DNL
  = 0 against the line's own LSB. Deviation from y = 8x grows linearly to −0.778 LSB at the last transition (the tilt).
- **INL, ei = 1**: T = 0.0703, 0.1563, 0.2578, 0.3750, 0.5078, 0.6563, 0.8203. Deviation from y = 8x: −0.438, −0.750,
  −0.938, **−1.000**, −0.938, −0.750, −0.438 LSB. Two-point line y = 8x + 0.4375. Residuals from it: 0, 0.3125, 0.5000,
  **0.5625**, 0.5000, 0.3125, 0 LSB: **end-point INL = 0.5625 LSB**. A best-fit line (least squares through the seven
  transitions) gives 0.344 LSB, 61 % of it. On a 620 px plot the middle corner sits 43.6 px off the line: visible.
- **DNL, ed = 0.5**: widths 1.125, 0.75, 1.375, 0.5, 1.375, 0.875 LSB → DNL +0.125, −0.25, +0.375, **−0.5**, +0.375,
  −0.125; INL (residuals) 0, ∓0.125, ±0.25 → max 0.25 LSB.
- **DNL, ed = 1**: widths 1.25, 0.5, 1.75, **0**, 1.75, 0.75 → DNL +0.25, −0.5, +0.75, **−1** (code 4 missing: T_4 = T_5
  = 0.5625), +0.75, −0.25; their sum is 0 (the ends are fixed). INL from the cumulative shifts: 0, ±0.25, ±0.5 → max
  0.5 LSB. DNL errors add up to INL: the DNL-only staircase also bends.
- **The two-point line's equation**: L(x) = 1 + 6(x − T_1)/(T_7 − T_1). T_7 − T_1 = 0.75/(1 + 0.125·eg), so the slope is
  8 + eg; 8(1 + 0.125·eg)·T_1 = 1 − 0.4375·ei − 1.5·eo, so L(x) = (8 + eg)·x + 1.5·eo + 0.4375·ei. L(T_1) = 1 and
  L(T_7) = 7 for every eo, eg, ei, ed.
- **The expression**: the `real` curve of §3a against the model, 20,000 random slider settings and inputs: 0
  mismatches. The single-error transformed inputs of §3a against the step sum, 10,001 points each: 0 mismatches.
- **At tp = 0** the two-point expression is NaN at x = 0 and +∞ elsewhere: never finite, never drawn.
- **The 12-bit table in volts** (1 LSB = 3.3/4096 = **0.8057 mV**): offset ±1 / ±3 LSB = ±0.81 / ±2.42 mV; gain
  ±1.5 / ±4 LSB = ±1.21 / ±3.22 mV at full scale (±4 LSB is 0.098 % of full scale); INL ±1.5 / ±2.5 LSB = ±1.21 /
  ±2.01 mV; DNL ±0.5 / ±1 LSB = ±0.40 / ±0.81 mV. Total (Proposal): the root-sum-square of the other rows, the method
  one source states (MSPM0 below): typ √(1² + 1.5² + 1.5²) = 2.35 → **±2.5**; max √(3² + 4² + 2.5²) = 5.59 → **±6**.
- **How exaggerated the stage is** (for the caption's truth): at 3 bits the offset is 1.5 LSB of 8 levels (19 % of full
  scale); on the table's converter ±3 LSB is 0.07 % of full scale.

**The table's values against real 12-bit MCU SAR converters** (cited here only; nothing on a teaching surface names
them; read 2026-10-20):

| Source | Offset | Gain | INL | DNL | Total | Notes |
|---|---|---|---|---|---|---|
| TI MSP430FR2355 datasheet, SLASEC4D (rev. Dec 2019), Table 5-22 *ADC, Linearity Parameters*, 12-bit mode, 2.4–3.6 V | ±1.5 mV max (= ±1.86 LSB at 3.3 V) | ±3 max | ±2.5 max | ±1 max | ±4 max | no typical column |
| TI MSPM0G3507 datasheet, SLASEX6C (rev. Oct 2025), §7.12.3 *Linearity Parameters*, 12-bit, external reference | ±5 mV max (= ±6.2 LSB) | ±4 max | ±2 max | ±1 max, *guaranteed no missing codes* | TUE = √(E_I² + E_O² + E_G²), note (1) | typical at 25 °C |
| Microchip AVR128DA28/32/48/64, DS40002183E, Table 37-23 *ADC Accuracy Specifications*, V_DD = V_REF = 3.0 V, 25 °C | 2.5 typ, ±5 max | 1.5 typ, ±5 max | 0.1 typ, ±1.5 max | 0.1 typ, ±1 max; *monotonic, no missing codes* | (not given) | |
| TI TM4C123GH6PM datasheet, SPMS376E, ADC electrical characteristics, *system performance when using internal reference* | ±5 typ, ±15 max | ±10 typ, ±30 max | ±1.5 typ, ±3.0 max | ±0.8 typ, +2.0/−1.0 max | ±10 typ, ±30 max | the reference is V_DDA itself |
| ST STM32F103 (DS5319) Table *ADC accuracy*, f_ADC 14 MHz, V_DDA 3–3.6 V, 25 °C, after calibration | ±1 typ, ±1.5 max | ±0.5 typ, ±1.5 max | ±0.8 typ, ±1.5 max | ±0.7 typ, ±1 max | | **read second-hand** (search excerpts of the datasheet; st.com did not answer from this machine): confirm before spec-ready |
| Espressif ESP32 Series datasheet v5.3, Table 4-3 *ADC Characteristics* | — | — | ±12 max | ±7 max | — | lists only DNL and INL (F-c7-2) |

**Verdict: the approved values stand.** Each max lies inside the class's spread (offset max 1.5–15 LSB, ±3 chosen; gain
1.5–30, ±4; INL 1.5–3, ±2.5; DNL ±1 in every table of the class); the typicals sit with the parts that give them (offset
1–2.5, gain 0.5–1.5, INL 0.1–1.5, DNL 0.1–0.8). No change. The definitions the table follows are the class's: offset at
the first transition, gain at the last after offset, INL from the end-point line (ST's *"end point correlation line"*;
Microchip's and TI's *"after adjusting for offset and gain"*, the same line), DNL as the worst code width's departure
from 1 LSB. The ideal transitions are drawn at k LSB, the course's truncating converter; many datasheets draw the first
ideal transition at ½ LSB (a rounding converter). The definitions do not change with it.

**Section D, Plot rows**
- [x] The expression is the physics: a truncating converter's code is the count of transitions at or below the input;
  each error is a named displacement of those transitions (§3a), the class's definitions above.
- [x] Axis and slider ranges real: 0 to full scale; each slider's 1 is a stated exaggeration (caption).
- [x] One worked value: at s1 (eo = 1), x = 0 gives code 1; at s4 (ed = 1), x = 0.56 gives code 3 and x = 0.5625 gives 5.
- [x] No artefacts: about one sample per 1.5 px, so each riser is drawn within one sample (≤ 1.5 px), vertical to the
  eye; a missing code is a single jump of 2. The sampler joins a riser rather than breaking it (it breaks only on a sign
  change across the whole window), which is the convention for a transfer staircase.

**Section D, Figure rows**
- [x] Our own drawing (N4): no licence; *"redrawn from …"* does not apply (it copies no page); the values are the class's,
  cited above.
- [x] Named parts on the right rows (§3b); nothing cropped.
- [x] Nothing on the page names a maker, part or document.

**A1–A8**: A1 ✓ (the table's values sourced above; the plot's are stated exaggerations); A2 ✓ (four non-ideal
behaviours, each beside the dashed ideal); A3 ✓ (a datasheet table's look, unbranded); A4 n/a (no instrument); A5 n/a
(no motion in time); A6 ✓ the caption *"A 3-bit converter with each error exaggerated so it can be seen…"*; A7 ✓ (the
course's truncating 12-bit 3.3 V converter: 0.806 mV LSB as D1·080 card 2; S21 against D2·050, F-c7-3); A8 ✓.

**Six gates** (this spec): (1) realism: the table's values are the class's (sourced), its look a datasheet's; the plot is
a stated exaggeration of the real mechanism ✓. (2) science: each error is the class's definition; two-point removal of
offset and gain shown exactly (residuals 0), INL and DNL left (0.5625 and 0.5 LSB) ✓. (3) maths: every number above
recomputed; the expression checked against the model ✓. (4) visualization: one error at a time, the dashed ideal beside
it, one line laid over each ✓. (5) consistency: the course's converter, LSB and truncation; S21 checked against D2·050
(one finding, F-c7-3) ✓. (6) design: slider row, legend and labels to be checked on the rendered stills (§15).
Fixed in our own work against the approved brief page (named here, as the rule asks): the brief's offset moved the
transitions right, so 0 V still read code 0 while the Flow says *"0 V no longer gives code 0"* (now up 1.5 LSB, code 1 at
0 V); its INL bow (0.18 LSB from the end-point line) was too faint to see (now 0.56 LSB); its DNL did not show the Flow's
missing code (now at ed = 1); its table lacked the PLAN's *absolute accuracy* row (now a Proposal, F-c7-5).

## 9. Faults and non-ideal behaviour

**PLAN FAULT**: none in the PLAN. The bench can show, in Study (Proposals, F-c7-7):
- **A negative offset hides at zero**: eo = −1 makes every input from 0 to 0.3125 of full scale read 0 and the top code
  never arrive. A calibration point at 0 V cannot see it; the two points must lie where the codes respond (as D1·060
  card 8's dead zone).
- **A missing code**: ed = 1. On a real converter a DNL of −1 LSB is where a code goes missing; the class's tables keep DNL
  inside ±1 and state *no missing codes*.
- **DNL builds INL**: the DNL-only staircase bends too (0.5 LSB here).
- Not shown, said only if asked: offset and gain drift with temperature (the table is at 25 °C), which is why a
  calibration is repeated.

## 10. Accessibility, legibility and print

- Wall (C2): the table's text, the plot's axis labels, slider labels and values, legend and markers at the benches' wall
  size; checked at 1920 × 1080 and 1024 × 768; the table's rows legible when zoomed to a row.
- Reduced motion (C3): every slider state and tour step lands at once (§4b).
- Colour (C4): real against ideal by weight and dash; the two-point line by its legend label; rows by number.
- Keyboard (C5): the Figure's tour keys; the sliders' arrow keys, Tab between them.
- Print (C8): the table with its notes; the stills of §4b, each with its `say` and its row of §3c.

## 11. Assets to make or source

| Asset | Format | Made by | Status |
|---|---|---|---|
| Our own datasheet page (§3b), EN and FR | SVG (rendered for the owner first, a visual milestone) | the author | to make |
| The `figure` block (§3b) | YAML in `en.md` | the author | to write |
| The `plot` block (§3a) | YAML in `en.md` | the author | to write |

The PLAN's *"needs asset: the datasheet's ADC-characteristics page (PDF)"* is replaced by the first row (N4).

## 12. Bench capabilities this needs

**Plot Bench**: `parameters`, `curves` with `step`, `floor`, `clamp` and `dashed`, `markers` on both axes, `range` with
`fixedView`, `readout`: **exist**. A non-finite curve not drawn: **exists** (`sampleCurve`). **To check**: the readout at
tp = 0 (shows nothing or a dash, not *Infinity*), and the legend entry of a curve that draws nothing.
**Figure Bench**: `features` (rect), `tour` with notes, `labels: numbers`, `spotlight: dim`, `zoom`: **exist**.

**Missing (request it)**:
- **X10** (to raise; a Plot capability → a crossing to Benches when the course needs it): a curve hidden until a reveal.
  Here the two-point line; it would also let each error be its own curve, as the PLAN words it.
- **X12** (to raise; same route): named slider presets, mirrored. §3c's ten states are this card's presets.
- **A Figure and a Plot side by side on one card's Canvas** (F-c7-4): a Studio question, the same as D1·050 card 2's
  two equations (*to confirm*). It goes to the owner, who routes it.

**Not this bench's**: computing the 12-bit errors in volts on the plot (the notes carry them).

## 13. Stand-in for the lecture

Until the Canvas holds both blocks side by side: the Figure is the card's first block, toured over p1 (the unscripted
tour, 0.31 min, already counted); the Plot follows from *"beside the converter's transfer line"* to the end, and its
slider labels carry the rows' names so the link stays. The PLAN's *"tour a row; show its curve"* alternation becomes
*tour all rows, then show each curve*; B17 between table and plot is lost, nothing else. Until X12 the presenter drags
the sliders on the wall window to §3c's states, listed on the strip. Until X10 the `/ tp` switch keeps the line hidden.
Both blocks are the final assets; nothing is made twice.

## 14. Findings for the owner

Nothing below is changed in the course files until the owner answers. Ids are this card's (*c7*); ACCURACY.md numbers
the accuracy ones when they are logged.

- **F-c7-1 (accuracy) — p2 *"Offset error shifts the whole line up or down: 0 V no longer gives code 0."*** True only
  for an **upward** shift of at least 1 LSB on a truncating converter (½ LSB on a rounding one). A downward shift leaves
  0 V at code 0 and makes every small input read 0 (at −3 LSB, everything below 4 LSB, 3.2 mV, reads 0; D1·060 card 8's
  dead zone). Options:
  - (a) *"…shifts the whole line up or down: 0 V no longer gives code 0, or the smallest inputs all read 0."*
    (**recommended**: both directions, and it echoes D1·060);
  - (b) *"…shifts the whole line up or down, so zero volts no longer lands where it should."*;
  - (c) keep, and the stage shows only the upward case (s1). The sentence then over-claims for half the cases.
- **F-c7-2 (accuracy) — p0 *"Every MCU datasheet has a table in its ADC section … offset error, gain error, integral
  nonlinearity and differential nonlinearity"*.** Not every one: the ESP32 Series datasheet (v5.3, Table 4-3) lists only
  DNL and INL. Options: (a) *"Most MCU datasheets have a table…"* (**recommended**: one word); (b) *"An MCU datasheet
  usually has…"*; (c) keep.
- **F-c7-3 (accuracy) — the SEED S21 *"Tomorrow, two points will fix the first. Nothing fixes the second."*** (and the
  register in `course-plan.md`: *"nothing fixes the second"*). A repeatable INL bow can be corrected by more calibration
  points, a polynomial or a lookup table, which D2·050 itself teaches for nonlinear sensors (*"a lookup table,
  polynomial, compensation algorithm or calibration data"*); only a missing code is beyond any correction. D2·050's
  harvest says it rightly: *"no pair of constants removes it"*. p7's *"INL and DNL tell you what it cannot"* reads the
  same way if *it* is heard as calibration in general. Options:
  - (a) SEED *"…Tomorrow, two points will fix the first. No pair of constants fixes the second."*, and p7 *"…INL and DNL
    tell you what two points cannot."* (**recommended**: matches D2·050's harvest word for word);
  - (b) change the SEED only (p7's *it* follows *calibration … two known points* closely enough);
  - (c) keep.
- **F-c7-4 — Two blocks on one card.** The PLAN puts the Figure *beside* the Plot; a card's Canvas shows one block at a
  time today (as D1·050 card 2, *to confirm*). Options: (a) ask for both blocks side by side on the Canvas (Studio's,
  routed by the owner), with §13 as the stand-in (**recommended**); (b) the Figure on its own card straight before, with
  no new Flow (as D1·020 F6 (b)); (c) the table only in Study.
- **F-c7-5 — Proposal: the table's PLAN row and footnotes.** The PLAN lists *absolute accuracy*; the approved page has
  four rows. Add (a) **E_T, total unadjusted error, ±2.5 typ / ±6 max LSB** (the root-sum-square of the rows, the method
  one source states), toured last with *"all of them together, at worst"*, and the footnotes *1 LSB = V_REF/4096 =
  0.806 mV* and *INL from the end-point line; monotonic, no missing codes* (**recommended**: the PLAN's row, and the
  footnote makes the INL definition the plot uses visible); (b) the row only; (c) the four rows as approved.
- **F-c7-6 — The PLAN's words after N4.** SHOW *"from a real MCU datasheet"* and Status *"needs asset: the datasheet's
  ADC-characteristics page (PDF)"* predate N4. Suggested: *"…the ADC accuracy table of our own unbranded datasheet page
  (values of the class, sourced in the spec)…"* and *"Status: Plot ready · Figure ready · needs asset: our own datasheet
  page (SVG)"*. The owner's text; not accuracy (no learner sees the PLAN).
- **F-c7-7 — Proposals**: the teacher tip (§7d), the explore task (§7e) and the Study faults (§9).
- **F-c7-8 — Departures from the approved brief page** (our own work, fixed here, named for the owner): offset now
  upward (0 V reads code 1, as the Flow says); the INL bow 0.5625 LSB from the end-point line instead of 0.18; the DNL
  slider closes code 4 at its end (the Flow's missing code); the two-point line labelled *"two points near the ends"*.
  Options: (a) as specified (**recommended**); (b) the brief page's values.

## 15. Acceptance: how we know it is built right

- The plot compiles with §3a's fields and the `real` expression verbatim. At each §3c state the hover readout gives:
  s0 code 0 at x = 0 and 7 at x = 1; s1 code 1 at x = 0 and 7 from x = 0.6875; s2 code 7 from x = 0.7778; s3 code 4 from
  x = 0.375; s4 (ed = 1) code 3 at x = 0.56 and 5 at x = 0.5625, never 4.
- With tp = 1: at s5a and s5b every corner of the staircase is on the lime line (to a pixel); at s5c the corner at
  x = 0.375 is 0.5625 LSB below the line and the end corners are on it; at s5d the corners at 0.5313 and 0.5625 are off
  it, the end ones on it. With tp = 0 nothing lime is drawn and the readout shows no *Infinity* or *NaN*.
- The caption is on the stage whenever the plot is (A6), EN and FR.
- The Figure: the six features land on their rows; the tour lights them in §3b's order; nothing on the page names a
  maker, part or document.
- B1 one change per step; B2 the staircase is the one mover; B4 the stills of §4b; B5 each `say` on the strip; B6 the
  corners on or off the line; B7 one mover; B9 the line waits for the multi-select; B10 the explain; B11 all sliders in
  Study after the guided pass; B13 labels and values only; B16 slider values and readout; B17 ideal beside real, line
  over each; B20 the states on the strip.
- C2 legible at 1920 × 1080 and 1024 × 768; C3 every state at once; C4 dash, weight and labels; C5 tour and slider keys;
  C6 the slider row wraps at 320 px, no legend or label collisions; C8 the stills and the table.
- ExSight's definition of done, quality bar E1–E6.
- The stand-in (§13) run on the lecture laptop before the day: the Figure's tour, then the Plot's ten states dragged and
  read back.
