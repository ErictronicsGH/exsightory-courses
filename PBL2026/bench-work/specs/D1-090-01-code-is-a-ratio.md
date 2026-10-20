```yaml
id: D1-090-01-code-is-a-ratio
card: "A code is a ratio to the reference"
module: notes/Day01/090-reference/en.md
bench: Equation                   # exists: statement, symbols, highlights, derivation, examples, assumptions, characteristics, graph with hold and markExamples
library: "code-is-a-ratio: an Equation (code = ⌊V_in / V_ref · 2^N⌋, the course's truncating converter), defined in the card's `equation` block, derived from the fraction V_in/V_ref and the 2^N levels, graphed as the code against V_in from 0 to 3.299 V at 12 bits on 3.3 V (V_ref and N held), with 1.65 V → 2048 marked and a framing near 1.65 V where the line is seen to be a staircase under the dashed ideal line"
dimensions: 2D
stand_in: "today's Equation Bench: `floor(…)` printed in words, N written as 2^12 (no slider), no dashed ideal line, codes printed with a k prefix (2.048 k), and the zoom near 1.65 V by the presenter's wheel on the wall window (§13)"
optional_benches: []
real_thing: "the course's MCU converter (12 bits, 3.3 V reference, truncating: code = ⌊V/LSB⌋, LSB = 3.3/4096 V = 0.8057 mV) reading a fixed 1.65 V"
minutes: 0.9                      # on the bench: from p2 (the formula, F2) to the end of the card (0.7 if the bench waits for p3's [[demo]])
card_minutes: 1.4
status: spec-ready
learner_action: none
predictions: []
seeds: []
key_variable: "V_in as a fraction of V_ref: half the reference gives half the levels, whatever the reference is"
time_scale: "none (no motion)"
steps: 4                          # s0–s3
```

The Equation's format as read on 2026-10-20 (`C:\ExSightory\src\insight\packages\insight-core\src\registry\equationBlock.ts`,
`expr/parse.ts`, `expr/isolate.ts`, `expr/evaluate.ts`, `expr/latex.ts`, `expr/characteristics.ts`; the viewer
`packages/canvas/src/EquationBench.vue`, `benchGraph.ts`, `PlotViewer.vue`; `insight-core/src/quantity.ts`):
**one `statement` per block**, solved for its left side; the graph draws the left side against one right-hand symbol and
**every other right-hand symbol must be on a `hold` slider** (`hold` has `name`, `min`, `max`, `default` and **no
`step`**: the slider moves in (max − min)/100, so a held N moves in fractions of a bit); `compare` draws one curve per
value (two to five) of a held symbol and removes its slider; `markExamples` places each example at its own values;
examples give right-hand values only and are evaluated by `compile()` (plain IEEE doubles, `floor` is `Math.floor`) and
printed by `formatQuantity` (four significant figures **with an SI prefix**: a code of 2048 prints **2.048 k**). `floor`,
`ceil`, `round`, `min`, `clamp` exist in the language, but **`rearrangements` cannot solve through `floor`**: `isolate`
refuses it (*"rounding cannot be undone"*) and the refusal is a **compile error**. The LaTeX printer writes `floor(x)` as
**floor(x)** in upright letters, not ⌊x⌋. The derivative of `floor` is taken as zero, so the **sensitivity** bars of a
floored statement would all read 0 (hidden here, §3a). **Mirrored to the wall**: the pane, the pinned annotation
(`focus`), the derivation step and a simulation's transport. **Not mirrored**: a slider's value, the hover readout, the
graph's wheel zoom and `graph.animate`. The module's time table is in `D1-090-05-ratiometric.md` §2b.

## 1. What the room must understand

- **Statement** (verbatim): *The ADC does not measure volts. It measures the input as a fraction of its reference, and
  spreads its levels across that range.*
- **SHOW** (verbatim from the PLAN): *Equation — code = (V_in / V_ref)·2^N, rearranged (solveFor) to V_in = code·V_ref /
  2^N, graphed as the code against V_in.*
- **Status** (verbatim): *ready.*
- **Drive / Look for**: *none in the PLAN.*
- **Decided** (owner, 2026-10-20, U018 brief): **D1**, cards 1–3 on the PLAN's Equation Bench; **D5**, the course's
  converter truncates, so *the Equation shows ⌊ ⌋ and the converter's staircase under the dashed ideal line, with a zoom
  near 1.65 V; the Flow is unchanged* (its formula has no ⌊ ⌋).
- **The PLAN's rearrangement and D5 meet head on** (F1): with ⌊ ⌋ in the statement the compiler refuses `solveFor: V_in`
  (a compile error, not a blank pane). The rearranged form, the firmware's V = code·V_ref/2^N, becomes card 2's statement,
  which is where the PLAN uses it (card 2's reveal reads a code back into volts).
- **Bench and library.** The **bench** is the Equation Bench. The **library** is this card's equation, `code-is-a-ratio`.
- **Insight**: *the converter compares the input with its reference and counts levels: 1.65 V on 3.3 V is half, so 12
  bits give 2048 of 4,096; the code says "half of the reference", not "1.65 V".*
- **Kind of knowledge**: *a relation between quantities* (the code against the input). Card test → **Equation**. B17
  applies weakly (the staircase beside the ideal line in the zoom). B15, B18, B19 do not; B18's framings apply in 2D
  (Home, Zoom near 1.65 V).
- **Why this bench, not a still**: the value is evaluated from the statement, not typed; the graph shows the code rising
  in proportion to the input, reaching the top of the levels just below the reference; the zoom shows what the straight
  line hides, the treads of a truncating converter, and 1.65 V sitting exactly on the edge between 2047 and 2048; in Study
  the learner moves V_ref and N (in whole bits, X-intstep) and sees the same 1.65 V give a different code.
- **Key variable**: V_in/V_ref (the highlighted fraction); V_in is the x axis.

## 2. Time

The Flow is 118 words (word count of `en.md`, 2026-10-20, `[[demo]]` not counted). There is no activity.

| Beat | Minutes | Source of the number |
|---|---|---|
| Before the bench: p0 *"An ADC needs a reference…"* (21), p1 *"Suppose an ADC is configured…"* (39) | 0.46 | 60 ÷ 130 |
| s0 the statement: p2 *"The code is the input as a fraction of the reference…"* (23), its formula read aloud (≈ +3: *"code equals V-in over V-ref times two to the N"*) | 0.20 | 26 ÷ 130 |
| s1 half: p3 *"[[demo]] On the Equation Bench, with 12 bits and a 3.3 V reference: 1.65 V gives 2048, half of 4,096."* (19), its numbers read aloud (≈ +8) | 0.21 | 27 ÷ 130 |
| s2 a ratio: p3 *"The converter never measured a volt. It measured a ratio: half of whatever the reference was."* (16) | 0.12 | 16 ÷ 130 |
| s3 the staircase (D5): unscripted, ≈ 31 words (§4a), and the framing (≈ 3 s) | 0.29 | estimate: 31 ÷ 130 + 3 s |
| Pane and pin moves not covered by speech (3 × ≈ 1.5 s) | 0.08 | estimate |
| **Card total / of which on the bench** | **1.4 / 0.9** | 1.36 / 0.90 |

If the bench waits for p3's `[[demo]]` (F2 option b), it is 0.7 on the bench, the card unchanged. The U018 brief showed
this card at ≈ 1.4 min.

### The module

**Module check**: the module's one time table is the centrepiece's, `D1-090-05-ratiometric.md` §2b: D1·090 uses
≈ 17.3 of its 30 minutes (cards 1.4, 2.3, 2.2, 3.7, 3.1, 4.6), leaving ≈ 12.7 unused. Reported only; nothing is trimmed.

## 3. The scene: what is on the bench

### 3a. The equation (`code-is-a-ratio`), target form

| Field | Content (EN · FR draft, for the owner's review) | Source |
|---|---|---|
| `title` | *A code is a ratio to the reference* · *Un code est un rapport à la référence* | the card |
| `statement` | `code = floor(V_in / V_ref * 2^N)`, printed **code = ⌊(V_in / V_ref)·2^N⌋** (X-floor-print; today *floor(…)*) | the PLAN; D5 |
| `caption` | *Half the reference is half the levels, whatever the reference is. The converter keeps the whole number of levels below the input.* · *La moitié de la référence, c'est la moitié des niveaux, quelle que soit la référence. Le convertisseur garde le nombre entier de niveaux sous l'entrée.* | the statement; p3; D5 |
| `symbols` | `code` *Code* (no unit), note *a whole number from 0 to 2^N − 1: the converter keeps the whole part (it truncates, ⌊ ⌋)* · *Code*, *un entier de 0 à 2^N − 1 : le convertisseur garde la partie entière (il tronque, ⌊ ⌋)*; `V_in` *Input voltage* (V), note *the voltage on the ADC pin* · *Tension d'entrée*, *la tension sur la broche du CAN*; `V_ref` *Reference voltage* (V), note *the voltage the input is measured against: 0 V to V_ref is the input range* · *Tension de référence*, *la tension à laquelle l'entrée est comparée : de 0 V à V_ref, la plage d'entrée*; `N` *Resolution* (bits), note *a whole number of bits: 4,096 levels at 12, 1,024 at 10* · *Résolution*, *un nombre entier de bits : 4 096 niveaux à 12, 1 024 à 10*; for the derivation `r` *Fraction of the reference* (no unit) · *Fraction de la référence*; `levels` *Number of levels* (no unit) · *Nombre de niveaux* | the PLAN; the Flow's p1–p3 |
| `highlights` | term `V_in / V_ref` — *the input as a fraction of the reference: 0.5 at 1.65 V on 3.3 V* · *l'entrée en fraction de la référence : 0,5 à 1,65 V sur 3,3 V* (teal); term `2^N` — *the number of levels: 4,096 at 12 bits, 1,024 at 10* · *le nombre de niveaux : 4 096 à 12 bits, 1 024 à 10* (amber) | p1, p2 |
| `source` | *The transfer function of an ideal N-bit converter that truncates* · *La fonction de transfert d'un convertisseur idéal de N bits qui tronque* (unbranded; the sources are in §8) | §8 |
| `derivation` | 1 `r = V_in / V_ref` — *the converter compares the input with its reference: 1.65 V on 3.3 V is 0.5* · *le convertisseur compare l'entrée à sa référence : 1,65 V sur 3,3 V, c'est 0,5*; 2 `levels = 2^N` — *N bits give 2^N levels across 0 V to V_ref: 4,096 at 12 bits, 1,024 at 10* · *N bits donnent 2^N niveaux de 0 V à V_ref : 4 096 à 12 bits, 1 024 à 10*; 3 the statement — *the fraction times the levels, kept whole: the converter truncates* · *la fraction fois les niveaux, gardée entière : le convertisseur tronque* (**Proposal**, F2) | p1, p2; D5 |
| `rearrangements` | **none**: `solveFor: V_in` through `floor` is refused by the compiler (F1). The firmware's inverse is card 2's statement. | `isolate.ts` |
| `examples` | §3b | §8 |
| `boundaries` | none (the domain stops below full scale instead; assumption 3) | |
| `assumptions` | (1) *An ideal converter: no offset, gain error or noise* · *Convertisseur idéal : ni décalage, ni erreur de gain, ni bruit* — breaksWhen *a real one: card 7 of the conversion module, the datasheet's accuracy table* — simplifying. (2) *The converter truncates: it keeps the whole number of levels below the input, as the course's converter does* · *Le convertisseur tronque : il garde le nombre entier de niveaux sous l'entrée* — breaksWhen *a converter that rounds: every code moves up by half a step (the conversion module's card 3)* — simplifying. (3) *Below full scale: V_in < V_ref* · *Sous la pleine échelle : V_in < V_ref* — breaksWhen *V_in reaches V_ref: the formula gives 2^N, a code N bits cannot hold; the converter reports its top code, 4,095 at 12 bits. The graph stops at 3.299 V* — limiting (F3). (4) *1.65 V on 3.3 V is exactly half: it sits on the edge between 2047 and 2048. The ideal converter gives 2048; with any noise a real one gives either (the ADC-input module)* · *1,65 V sur 3,3 V, c'est exactement la moitié : sur la limite entre 2047 et 2048…* — simplifying (**Proposal**, F4) | D5; `course-accuracy.md` §3; D1·070; D1·080 |
| `characteristics` | `show: [intercepts, limits]` (no sensitivity: the derivative of `floor` is zero, so the bars would read 0 for V_in and V_ref, the opposite of the card; no roots or turning points on a staircase) | `characteristics.ts`, `derive.ts` |
| `graph` | against `V_in`, domain [0, 3.299] V; `scale` linear; `hold` V_ref (3.3–5.0 V, default 3.3), N (8–16 bits, default 12, **whole bits**: X-intstep); `markExamples: true`; the ideal line `V_in / V_ref * 2^N` dashed, neutral ink (X11); framings *Home* and *Zoom near 1.65 V* (X-eq-framing) | D5; F3 |
| `notes` | `include: true` | print |

**Axes.** x: *Input voltage (V)*, 0 to 3.299 V (ticks every 0.5 V). y: *Code*, auto-scaled: 0 to 4094 at the defaults
(3.299/3.3 × 4096 = 4094.76 → 4094). At Home the 4,096 treads are finer than the screen (≈ 429 samples, 0.1 per tread):
the staircase and the ideal line coincide to under one pixel, and that is honest at this scale.

**Framings** (B18, named, *Home* one press away):

| Framing | x | y | Why |
|---|---|---|---|
| *Home* | 0–3.299 V | 0–4094 (auto) | the whole range: the code proportional to the input, half at 1.65 V |
| *Zoom near 1.65 V* | 1.640–1.660 V | 2035–2061 | D5: ≈ 25 treads 0.8057 mV wide and one code tall, the staircase under the dashed ideal line, touching it at each tread's left corner; 1.65 V on the riser from 2047 to 2048 (≈ 17 samples a tread, so the treads draw as treads) |

**Colours and their second channel** (C4), from the U018 brief's palette: the converter's staircase violet, solid; the
ideal line grey, **dashed**, labelled *Ideal: V_in/V_ref · 2^N*; the example dots in the bench's example amber, each
labelled. In a family the bench takes the palette in order (`compareCurves`), so the colours are to confirm on the built
block (§12).

### 3b. Worked examples (marked on the curve)

| # | Label (EN · FR) | V_in | V_ref | N | code (target; today) | Note |
|---|---|---|---|---|---|---|
| E1 | *1.65 V on 3.3 V, 12 bits: code 2048* · *1,65 V sur 3,3 V, 12 bits : code 2048* | 1.65 | 3.3 | 12 | 2048 (today *2.048 k*) | *Exactly half: 0.5 × 4,096 = 2048.000, on the edge between 2047 and 2048. On a 10-bit converter the same input is 512, half of 1,024.* · *Exactement la moitié… Sur un convertisseur de 10 bits, la même entrée donne 512, la moitié de 1 024.* |
| E2 | *The pin from this morning: 1.7925 V* · *La broche de ce matin : 1,7925 V* (**Proposal**, F4) | 1.7925 | 3.3 | 12 | 2224 (today *2.224 k*) | *1.7925/3.3 × 4,096 = 2224.87; the converter keeps 2224, the settled reading of the first module.* · *…le convertisseur garde 2224, la lecture établie du premier module.* |

The labels carry the code in digits because the bench prints *2.048 k* until X-count (§12). Both values evaluate exactly
in doubles (§8), so ⌊ ⌋ is safe on this card today.

**Values beside their element**: the Symbols pane with values and units; the Example pane with each code and note; the
dots labelled on the graph; the sliders' values (Study). 2048 is spoken (p3) and printed (E1).

## 4. The run: step by step, as the Flow goes

### 4a. Steps

| # | id | Flow paragraph | What changes (`say`) | Pane | Presenter's control |
|---|---|---|---|---|---|
| 0 | `s0-fraction` (**Proposal**, F2) | p2 *"The code is the input as a fraction of the reference, times the number of levels…"* | The converter takes the input as a fraction of its reference and multiplies by its number of levels, keeping the whole part. | Proof, steps 1 → 3; `V_in / V_ref` pinned | pane, step, pin |
| 1 | `s1-half` | p3 *"[[demo]] On the Equation Bench, with 12 bits and a 3.3 V reference: 1.65 V gives 2048, half of 4,096."* | 1.65 V on 3.3 V is half; half of 4,096 levels is code 2048. | Example, E1 (and E2) | pane |
| 2 | `s2-ratio` | p3 *"The converter never measured a volt. It measured a ratio…"* | The code rises in proportion to the input: it measures half of whatever the reference is. | Graph, Home, E1 marked; `V_in / V_ref` pinned | pane, pin |
| 3 | `s3-staircase` (D5) | unscripted (§2) | Up close the line is a staircase: one code for every input on a tread, 0.806 mV wide, kept below the ideal line. | Graph, *Zoom near 1.65 V* | framing (X-eq-framing) |

Suggested words for s3 (B20, on the strip; **Proposal**, F5): *"Up close, the straight line is a staircase. The converter
keeps the whole number of steps below the line: it truncates. And 1.65 volts sits exactly on the edge between 2047 and
2048."* (31 words.)

Without F2 the bench appears at s1 on the Example pane.

### 4b. Motion, cues and stills

| # | Motion | Movers | Cue | Hold | Reduced motion (C3) | Still |
|---|---|---|---|---|---|---|
| 0 | none (derivation steps, pin) | 0 | the new derivation line; the fraction lit | hold | same | one per derivation step (three) |
| 1 | none (pane) | 0 | E1's code | hold | same | the Example pane |
| 2 | none (pane, pin) | 0 | the line and the dot at (1.65 V, 2048); the fraction lit | hold | same | the graph at Home |
| 3 | the framing eases from Home to the zoom (≈ 0.6 s, the viewer's own) | 1 (the view) | the treads under the dashed line; the dot on the riser | hold | the zoomed view at once | the graph zoomed |

No simulation, no `graph.animate`.

## 5. Pacing and interaction, by surface and view

**Who paces** (B12): the presenter on the wall (pane, pin, derivation step and, with X-eq-framing, the framing are
mirrored); the learner in Study Mode and Scope.

| View | Who | Controls |
|---|---|---|
| Preview (in the slide) | everyone | the statement and the current pane |
| View (details) | everyone | every pane: Symbols, Terms, Proof, Example, Graph, Assumptions; two sliders in one row, each labelled on top in words with the symbol in parentheses and the value at the right: *Reference voltage (V_ref)* 3.3–5.0 V, default 3.3 V; *Resolution (N)* 8–16 bits, default 12, whole bits; the framings *Home* · *Zoom near 1.65 V* as buttons; the hover readout |
| Edit (session only) | everyone | not specified for the Equation Bench |
| Authoring | authors | the `equation` block's YAML |

- **The presenter's strip** (B20): pane, pin, step and framing; the next step's `say`; s3's suggested words; the teacher
  tip.
- **Study / Scope**: both sliders free after the guided pass; the framings; the hover (§7e).
- **Phone** (C6): the statement, then the pane, full width; the sliders one per line under the graph; the two framing
  buttons 44 px; E1's and E2's dot labels must not collide at 320 (they are 0.14 V and 176 codes apart at Home).
- **Locked**: the presenter does not move the sliders on the wall (a slider's value is not mirrored); the wall shows the
  defaults, 3.3 V and 12 bits.
- **Sliders** (`sliders-side-by-side`): one row; the bench prints the symbol's label above the slider (`PlotViewer.vue`),
  so the label is written to carry the symbol: *Reference voltage (V_ref)*, *Resolution (N)* (§12 c).

## 6. The frame

The Equation's frame (the Canvas header and footer; panes as pills, D4.17). Title *A code is a ratio to the reference*.
No inset, no graph band beyond the Graph pane's own; the two framing buttons sit with the graph's own controls
(X-eq-framing).

| Tile / panel | Used? | Selected item | List / contents |
|---|---|---|---|
| Panes | yes | the open pane | Symbols, Terms, Proof, Example, Graph, Assumptions |
| Sliders | yes (Study) | each value beside its label | V_ref, N |
| Framings | yes (X-eq-framing) | the current framing's name | Home · Zoom near 1.65 V |
| Readout | yes (hover) | V_in, code | — |

## 7. Thinking, not watching

- **7a. The PLAN's ASK**: *none on this card.*
- **7b. Prediction point**: none. (**Proposal**, not recommended, F5: before s3, ask aloud *"Is the line really straight?"*;
  +0.1 min.)
- **7c. After**: in Study, done means the Graph pane opened and the zoom framing visited.
- **7d. Teacher tip** — **Proposal** (F5): *Expect "the ADC measures volts" and "a bigger reference gives a bigger code".
  Ask: the reference doubles to 6.6 V and the input stays at 1.65 V: what code? (1024: a quarter.) The code is a fraction,
  so a bigger reference gives a smaller code.*
- **7e. Explore** (B11): in Study, slide V_ref: *1.65 V on 5.0 V is 1351*; slide N to 10: *512*; zoom anywhere and find
  the treads.

## 8. Faithfulness (the quality bar)

**Arithmetic** (code = ⌊V_in/V_ref · 2^N⌋; recomputed in Node, 2026-10-20):
- **E1**: 1.65/3.3 = **0.5** (exactly, in doubles too: 3.3 is 2 × 1.65 in binary); × 4096 = **2048.000** → **2048** (the
  Flow's *"1.65 V gives 2048, half of 4,096"* ✓; on a code edge, A3). At 10 bits: 0.5 × 1024 = **512** ✓.
- p1: 2^10 = **1,024** levels (*"A 10-bit ADC… has 1,024 possible levels"* ✓); 2^12 = **4,096** ✓.
- **E2**: 1.7925/3.3 × 4096 = **2224.87** → **2224** (D1·010's PLAN: *"the ideal for the pin, ≈ 2225 (2224.9); a fully
  settled reading would be 2224"* ✓; 1.7925 V is 3.585 V halved by the 100 k / 100 k divider ✓). The firmware's
  2224 × 3.3/4096 = **1.7918 V**.
- LSB = 3.3/4096 = **0.8057 mV** (`course-accuracy.md` §3 ✓; D1·080 card 2's 0.806 mV ✓).
- **The domain**: 3.299/3.3 × 4096 = **4094.76** → 4094; with V_ref anywhere in 3.3–5.0 V and N in 8–16, V_in < V_ref on
  the whole domain, so every drawn code exists (≤ 2^N − 1). At 5.0 V: 1.65/5 × 4096 = **1351.68** → 1351 (§7e).
  At 6.6 V: 0.25 × 4096 = **1024** (§7d).
- **The zoom**: at 1.640 V, 2035.59; at 1.660 V, 2060.41: **≈ 25 treads**; ≈ 429 samples over 20 mV is 0.0466 mV a
  sample, **17.3 samples a tread**.
- **Exact evaluation on code edges** (A3; the coordinator's note): in doubles 1.65/3.3 × 4096 is exactly 2048, so E1 is
  safe today; but the same evaluation of card 3's 1.65/3.2 × 4096 gives **2111.9999999999995**, and `Math.floor` prints
  **2111** (§12 X-exact-floor). The spec therefore requires the bench to evaluate ⌊ ⌋ exactly on a code edge: **E1 must
  show 2048 and never 2047**, on the Example pane, the dot and the hover. A sampled point of the staircase that falls
  exactly on another edge may land one code low on that sample; on a riser this is invisible.

**Section D, Equation rows**
- [x] Symbols match the course: V_in, V_ref, N, code as D1·080 and cards 2–5 of this module; units carried.
- [x] Every example recomputed above, to the figures the bench shows.
- [x] Slider ranges real: references from the course's 3.3 V to a 5 V supply (card 4's AVCC); 8–16 bits.
- [x] The graph obeys the Plot rows: the expression is the converter's law; the domain stops below full scale so no
  impossible code is drawn; a staircase stays a staircase in the zoom (17 samples a tread); one worked value marked.

**A1–A8**: A1 ✓ (the ideal truncating transfer function: W. Kester, *Data Conversion Handbook*, Analog Devices, ch. 2;
MCU datasheets state ADC = V_IN · 2^N / V_REF, e.g. the ATmega328P datasheet's ADC chapter; cited here only, never on a
teaching surface); A2 ✓ (truncation, full scale and the edge named; the ideal beside the staircase in the zoom); A3 ✓
(1.65 V on a code edge, assumption 4; full scale, assumption 3); A4 ✓ (D1·010's 2224, D1·070's *"2047 or 2048 (1.65 V
sits exactly on the edge)"*, D1·080's 0.806 mV); A5 n/a; A6 ✓ (*ideal*, *truncates*, *below full scale* on the
Assumptions pane); A7 ✓ (sources above); A8 ✓.

## 9. Faults and non-ideal behaviour

**PLAN FAULT**: *none on this card.* The non-ideal is named, not staged: truncation (the zoom), full scale (assumption 3)
and the edge at 1.65 V (assumption 4). Reference error is card 3's.

## 10. Accessibility, legibility and print

- Wall (C2): the statement, the three derivation lines and the pane text at the Canvas's wall size; axis labels, dot
  labels, the ideal line's label at the floor; check at 1920 × 1080 and 1024 × 768. In the zoom, the ideal line's label
  and the E1 dot's label sit near the same riser: check they do not collide.
- Reduced motion: the framing lands at once; nothing else moves.
- Colour (C4): staircase solid, ideal dashed and labelled; dots labelled; highlights with their words. Check violet
  against grey under protanopia.
- Keyboard (C5): pane, pin, step keys; Tab to the framing buttons; the sliders' arrow keys (one bit per press with
  X-intstep).
- Print (C8): the Equation's notes (statement, derivation, examples, assumptions, the graph at Home and zoomed as stills).
- Languages: every label, note, caption and assumption as `{en, fr}` (§3a, §3b); the French are our drafts, for the
  owner's review; numbers and units are not translated (the decimal comma in French text only, never inside a value the
  bench prints).

## 11. Assets to make or source

| Asset | Format | Made by | Status |
|---|---|---|---|
| The `equation` block (§3a, §3b), EN and FR | YAML in `en.md` | the author | to write |

## 12. Bench capabilities this needs

**Equation Bench, exists**: statement with `floor`; symbols with notes; two term highlights; derivation with symbols
outside the statement; examples; assumptions; caption; `characteristics.show`; graph with `hold` and `markExamples`;
panes, pins and derivation steps mirrored.

**Missing (request it)** (working names; each gets its number when raised as a crossing to Benches):
- **X-exact-floor**: `floor` (and `ceil`, `round`, `mod`) evaluated exactly on an integer edge, wherever the bench
  evaluates (examples, dots, graph samples, readout): a value within a few ulps of an integer is that integer (e.g.
  snap when |x − round(x)| ≤ 1e-12·max(1, |x|)), or exact decimal arithmetic. Today 1.65/3.2 × 4096 =
  2111.9999999999995 → **2111**. Card 1 is safe today (0.5 × 4096 is exact); card 3 is not (`D1-090-03` §12).
- **X-count**: a symbol declared a count (e.g. `integer: true` on the symbol) prints as a whole number, thousands grouped
  in prose, never prefixed: *2048*, not *2.048 k* (`formatQuantity` prefixes every value ≥ 1000; a unit such as *codes*
  would give *2.048 kcodes*); the hover likewise (*2048*, not *2048.000*). Cards 1–3; every code in the course.
- **X-floor-print**: `floor(x)` printed ⌊x⌋ and `ceil(x)` ⌈x⌉ (today `\operatorname{floor}`: *floor(…)*). D5.
- **X-intstep**: a `step` on a held symbol (N in whole bits). Today a hold slider moves in (max − min)/100: 0.08 bit.
- **X11** (already listed, *to raise*), **extended**: a second statement on the graph drawn **dashed** in neutral ink:
  here the ideal line `V_in / V_ref * 2^N` beside the staircase. D5.
- **X-eq-framing**: named framings (x and y windows) on the Equation's graph, one press each, **mirrored** as part of the
  Equation's view (a new view key, D13.9; as X12 extended does for the Plot, `D1-080-03` §12). Today the wheel zoom is
  local to each window.

**To confirm when written**: (a) that `characteristics.show: [intercepts, limits]` hides the sensitivity bars and reports
no root or turning point on the staircase; (b) that a derivation line containing `floor` prints and steps; (c) the slider
label carries the symbol (*Reference voltage (V_ref)*): the bench prints the symbol's label only, so the label is written
that way, or the bench adds the symbol (would help); (d) at the zoom, the hover's *V_in = 1.650* has three decimals,
coarser than a 0.806 mV tread (would help: four).

**Would help**: X-steps (`D1-080-03` §12: risers drawn vertical); X21 (crossing 506: a vertical reference at 1.65 V).

**Not this bench's**: the code against the rail voltage (card 5, the Plot); a real converter's noise at the edge (D1·070).

## 13. Stand-in for the lecture

**Today's Equation Bench**, the same block with three changes: (i) the statement is written `code = floor(V_in / V_ref *
2^12)` and the derivation's step 2 carries 2^N (no N slider, so no fractional bits; E1's 10-bit value in its note); (ii)
no ideal line; (iii) the zoom by the presenter's wheel near 1.65 V **on the wall window** (as `D1-080-03`'s stand-in; to
check on the lecture laptop that the wall window takes the wheel, else the zoom is Study's and the presenter says it).

- **It shows**: s0–s2 as §4; s3's staircase by the wheel zoom (y refits to the view).
- **It loses**: ⌊ ⌋ (printed *floor(…)*, the symbol note says *written ⌊ ⌋*); the dashed ideal line (the room sees the
  treads, not the line they fall under); an exact, mirrored framing; codes in plain digits (*2.048 k*: the labels carry
  *2048*); the N slider in Study.
- **Checks lost**: B4 (the zoomed still by hand), B17 (staircase beside ideal), C8's zoomed still.
- **What the Flow might say differently** (a proposal; the Flow is not edited): nothing; s3's unscripted line already
  names the staircase.
- The stand-in's block is the target's with fields added later, so nothing is made twice.

## 14. Findings for the owner

- **F1 — The PLAN's `solveFor` and D5's ⌊ ⌋ cannot both be on this block.** With ⌊ ⌋ the compiler refuses to solve for
  V_in (*"rounding cannot be undone"*, a compile error). The inverse is what card 2 needs, and card 2's reveal is the
  Equation read backwards. Options: (a) card 1 without a rearrangement; card 2's statement is the firmware's inverse,
  V_read = code/2^N · V_ref, derived from card 1's statement (**recommended**; `D1-090-02` F1); (b) card 1 without ⌊ ⌋
  (the Flow's formula), so the rearrangement compiles, and D5's staircase moves to card 3 (reverses D5 for this card);
  (c) the inverse as a derivation step on card 1 (it cannot be last, so it would sit before the statement and read
  backwards).
- **F2 — Proposal: the bench from p2, on the Proof.** p2 states the formula; the derivation (the fraction, the levels,
  kept whole) carries it, and nothing is given away (there is no ASK). Options: (a) the Proof at p2, three steps
  (**recommended**; 0.9 on the bench); (b) the bench at p3's `[[demo]]` (0.7).
- **F3 — Full scale: the domain stops at 3.299 V.** ⌊V_in/V_ref · 2^N⌋ gives 4096 at V_in = V_ref, a code 12 bits cannot
  hold (the converter reports 4095). Options: (a) the domain [0, 3.299] V, the V_ref slider from 3.3 V up, and assumption 3
  (*limiting*) naming the top code (**recommended**: the statement stays as D5 decided, and no slider setting draws an
  impossible code); (b) the clamp in the statement, `code = min(⌊V_in/V_ref · 2^N⌋, 2^N − 1)`, domain [0, 3.3] (the real
  converter at every setting, as `D1-080-03` F5 drew it, at the cost of a heavier formula than the Flow's); (c) a boundary
  `V_in < V_ref` shading the invalid region (the curve still drawn past 4095 there when V_ref is slid down).
- **F4 — Proposals**: assumption 4 (1.65 V on the edge between 2047 and 2048, as D1·070 says); E2, the morning's pin at
  1.7925 V → 2224, the one value on this card where ⌊ ⌋ visibly does something (2224.87 → 2224). +0 min each.
- **F5 — Proposals**: s3's suggested words; the teacher tip (§7d); the explore prompts (§7e); not recommended, a spoken
  prediction before s3 (+0.1 min).
- **F6 — reported, not raised: "1.65 V gives 2048".** True for the ideal truncating converter (0.5 × 4096 = 2048.000);
  D1·070 says a real one gives 2047 or 2048 there. Assumption 4 (F4) carries it on the bench; no change to the Flow
  proposed.

No **accuracy** finding on this card: the statement, PLAN and Flow recompute under the course's models (§8).

**Decided 2026-10-20** (owner: *"apply all recommendations"* on the U018 brief): D1, D5 as above. (The proposals and
options in this §14 are not yet decided.)

## 15. Acceptance: how we know it is built right

- The Equation compiles with the fields of §3a with no error or warning; it has no
  rearrangement; the derivation's last line is the statement; the sensitivity bars are absent. E1 shows **2048** (never
  2047, X-exact-floor; plain digits with X-count), E2 **2224**; both dots on the staircase. The graph runs 0–3.299 V,
  0–4094 at the defaults; *Zoom near 1.65 V* shows ≈ 25 treads under the dashed ideal line, 1.65 V on the riser from
  2047 to 2048.
- The presenter's pane, pin, step and framing changes reach the wall; the sliders are not moved on the wall.
- B1 one pane, pin, step or framing per beat; B5 each `say` in the notes; B6 the fraction lit with its pane; B11 V_ref and
  N in Study; B13 statement, terms and values only; B16 values readable; B17 the staircase beside the ideal line; B18 Home
  one press away; B20 s3's words and the tip on the strip.
- C2 legible at 1920 × 1080 and 1024 × 768, the zoom's labels included; C3 the framing lands at once; C4 dashed and
  labelled; C5 keys; C6 at 320; C8 the notes and both stills.
- E1–E6 (ExSight's definition of done) on the built block: driven in both themes; the wall at 7:1; Scope at phone width;
  every pane at 1920 × 1080 and 1024 × 768; the framing key added in all four places (E6).
- The stand-in (§13) checked on the lecture laptop: E1 reads 2.048 k with its label *code 2048*, and the wall window takes
  the wheel.
- **Six gates (this spec)**: (1) realism ≥ 95 %: the course's converter (12 bits, 3.3 V, truncating) and its real
  staircase, nothing branded ✓; (2) science: the ideal truncating transfer function, full scale and the edge stated ✓;
  (3) maths: every number recomputed in Node (§8); exact evaluation on code edges required (E1 2048, never 2047) ✓;
  (4) visualization: the proportion at Home, the staircase under the ideal line in the zoom, one scale each ✓;
  (5) consistency: D1·010's 2224, D1·070's edge, D1·080's LSB, card 2's inverse and card 3's family agree; the PLAN's
  rearrangement against D5 raised (F1) ✓; (6) design: sliders in one row with words and symbols, EN and FR drafted, the
  zoom's label collision named with its check (§10) ✓ on paper, to check on the built block.
