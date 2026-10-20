```yaml
id: D1-090-03-reference-error
card: "Reference error is measurement error"
module: notes/Day01/090-reference/en.md
bench: Equation                   # exists: statement, symbols, highlights, examples, assumptions, characteristics, graph with hold, compare and markExamples
library: "reference-error: card 1's Equation (code = ⌊V_in / V_ref · 2^N⌋), defined in the card's own `equation` block, graphed against V_in from 0 to 3.199 V at 12 bits as a family for V_ref = 3.30 V (the rail as the firmware assumes it) and 3.20 V (the rail sagged), with 1.65 V marked on both: 2048 and 2112, evaluated exactly on their code edges"
dimensions: 2D
stand_in: "today's Equation Bench with the Flow's own formula, code = V_in / V_ref · 2^12, without ⌊ ⌋ (floating point turns ⌊2112⌋ into 2111 until X-exact-floor); codes printed 2.048 k and 2.112 k (the labels carry the digits); both lines solid; the zoom by the presenter's wheel on the wall window"
optional_benches: []
real_thing: "the course's 12-bit MCU converter referenced to its own 3.3 V supply rail, reading a fixed 1.65 V from a separate reference while the rail sags to 3.20 V"
minutes: 1.2                      # on the bench: from p2's [[demo]] to the end of the card (1.1 without the zoom, F4)
card_minutes: 2.2                 # 2.1 without the zoom
status: spec-ready
learner_action: poe
predictions: []                   # the PLAN's poe fires before the bench appears and is answered at s1
seeds: [S22]                      # planted at s3 (p4); harvested in D2·050
key_variable: "V_ref: the same 1.65 V is a bigger fraction of a smaller reference, so the code rises by the fraction the reference fell"
time_scale: "none (no motion)"
steps: 4                          # s0–s3 (s2 is the zoom Proposal)
```

The Equation's format as read on 2026-10-20 (the files and facts of `D1-090-01-code-is-a-ratio.md`'s preamble):
`compare` draws one curve per value of a held symbol and removes its slider; `markExamples` places each example at its
own values, so the 3.20 V example lands on the 3.20 V line; examples, dots, samples and the hover are evaluated by
`compile()` in IEEE doubles, `floor` being `Math.floor`. **1.65/3.2 × 4096 evaluates to 2111.9999999999995 in doubles,
in every order of the operations** (checked in Node: `V_in / V_ref * 2^N`, `V_in * 2^N / V_ref`, `(V_in / V_ref) *
2^12`), so **⌊ ⌋ prints 2111** where the exact value is 2112: the card's own reveal. This spec therefore **requires exact
evaluation on a code edge** (X-exact-floor, §12) and carries the stand-in without ⌊ ⌋ until it lands. A slider's value,
the hover, the wheel zoom and `graph.animate` are not mirrored; the pane, pin and derivation step are. One bench block per
card, so card 3 carries its own block (card 1's statement). The module's time table is in `D1-090-05` §2b.

## 1. What the room must understand

- **Statement** (verbatim): *If the reference is 1 % high, every reading is 1 % low. The error passes through
  one-for-one, at every point of the range.*
- **ASK** (verbatim from the PLAN): *poe (before the statement) — "The supply rail, which is also the reference, sags from
  3.30 V to 3.20 V. The input, 1.65 V, has not changed at all. What does the code do?" · options: falls — less supply,
  less reading | stays at 2048 — the input did not move | rises, by about 3 % | jumps to full scale · answer: rises, by
  about 3 % · reveal: the Equation, V_ref slid from 3.30 to 3.20 V: 2048 → 2112. · explain: The same 1.65 V is now a
  larger fraction of a smaller reference, 1.65/3.20 instead of 1.65/3.30, so the code rises by the 3 % the reference
  fell. · depth: understand · practice: developing models*
- **SEED** (verbatim): *plants S22 — "Reference error passes through one-for-one. Tomorrow a gain calibration will
  quietly absorb it, as long as it holds still."*
- **FAULT** (verbatim): *The firmware says 3.3 V while the regulator delivers 3.28 V: every reading about 0.6 % off, and
  no amount of averaging finds it.*
- **SHOW, Drive, Look for, Status**: *none in the PLAN beyond the reveal.*
- **Decided** (owner, 2026-10-20): D1, the PLAN's Equation Bench; D5, the converter truncates (⌊ ⌋, card 1).
- **"V_ref slid from 3.30 to 3.20 V"** becomes a `compare` family [3.30, 3.20] with both values as examples (F1): a
  slider's value does not reach the wall, a family and its examples do.
- **Bench and library.** The **bench** is the Equation Bench. The **library** is this card's equation, `reference-error`.
- **Insight**: *the converter divides the input by its reference, so a reference 3 % low makes every code about 3 % high
  (2048 → 2112 at 1.65 V), and firmware that still assumes 3.3 V reports 1.70 V for an input that never moved.*
- **Kind of knowledge**: *a contrast between two states* (the rail at 3.30 V and at 3.20 V) and *a relation between
  quantities*. Card test → **Equation**. B17 applies (both references on one V_in axis, one code scale). B15, B19 do
  not; B18's framings apply in 2D (Home, Zoom near 1.65 V).
- **Why this bench, not a still**: the two codes are evaluated, not typed; the two lines fan out from zero, so the error
  is a fixed fraction at every input (*"at every point of the range"*, *"behaves like a gain error"*): the proportional
  error is the angle between two lines, which a single number cannot show.
- **Key variable**: V_ref (the family).

## 2. Time

The Flow is 141 words (word count of `en.md`, 2026-10-20); p0's `[[ask]]` question (23) is counted in the poe: **118
spoken outside it**.

| Beat | Minutes | Source of the number |
|---|---|---|
| The PLAN's poe: p0 *"[[ask]] The supply rail sags from 3.30 V to 3.20 V…"* (23), four options, the answer window (p1 `[[pause]]`), the tally; before the bench | ≈ 1.0 | as `D1-080-03`'s poe (four options) |
| s0 the two rails: p2 *"[[demo]] On the Equation Bench: 12 bits, 1.65 V in, and the reference… slid from 3.30 V to 3.20 V."* (25), its numbers read aloud (≈ +6) | 0.24 | 31 ÷ 130 |
| s1 2048 → 2112: p3 *"[[reveal]] The code rises from 2048 to 2112, about 3 %…"* (37), its numbers read aloud (≈ +8) | 0.35 | 45 ÷ 130 |
| s2 the zoom (**Proposal**, F4): unscripted, ≈ 12 words, and the framing (≈ 3 s) | 0.14 | estimate |
| s3 one for one: p4 *"That is the rule: reference error is measurement error…"* (56) | 0.43 | 56 ÷ 130 |
| Pane and pin moves not covered by speech (3 × ≈ 1.5 s) | 0.08 | estimate |
| **Card total / of which on the bench** | **2.2 / 1.2** | 2.24 / 1.24; without s2: 2.10 / 1.10 |

The U018 brief showed ≈ 2.9 min, with ≈ 1.5 min for the poe; this spec takes `D1-080-03`'s ≈ 1.0. **Module check**:
`D1-090-05-ratiometric.md` §2b.

## 3. The scene: what is on the bench

### 3a. The equation (`reference-error`), target form

| Field | Content (EN · FR draft, for the owner's review) | Source |
|---|---|---|
| `title` | *Reference error is measurement error* · *Une erreur de référence est une erreur de mesure* | the card |
| `statement` | `code = floor(V_in / V_ref * 2^N)`, printed **code = ⌊(V_in / V_ref)·2^N⌋** (card 1's, X-floor-print) | card 1; D5 |
| `caption` | *The input did not move. A smaller reference makes it a bigger fraction, and the code rises by the fraction the reference fell.* · *L'entrée n'a pas bougé. Une référence plus petite en fait une fraction plus grande, et le code monte de la fraction dont la référence a baissé.* | p3; the explain |
| `symbols` | as card 1: `code` *Code*; `V_in` *Input voltage* (V), note *here a fixed 1.65 V from a separate reference: it does not move with the rail* · *ici 1,65 V fixes, d'une référence séparée : elle ne suit pas le rail*; `V_ref` *Reference voltage: the supply rail* (V), note *the rail references the converter; the firmware still assumes 3.3 V* · *Tension de référence : le rail d'alimentation*, *le rail sert de référence au convertisseur ; le micrologiciel suppose toujours 3,3 V*; `N` *Resolution* (bits) | the PLAN; p2 |
| `highlights` | term `V_in / V_ref` — *a bigger fraction of a smaller reference: 0.5000 on 3.30 V, 0.5156 on 3.20 V* · *une fraction plus grande d'une référence plus petite : 0,5000 sur 3,30 V, 0,5156 sur 3,20 V* (teal) | the explain |
| `source` | *An ideal truncating N-bit converter, referenced to its supply rail* · *Un convertisseur idéal de N bits qui tronque, référencé à son rail* (unbranded) | §8 |
| `derivation` | none (card 1's Proof carries the statement) | |
| `rearrangements` | none (⌊ ⌋ cannot be undone: a compile error; card 2 has the inverse) | `isolate.ts` |
| `examples` | §3b | §8 |
| `boundaries` | none (the domain stops below full scale) | |
| `assumptions` | (1) *The firmware converts with the reference it assumes, 3.3 V* · *Le micrologiciel convertit avec la référence qu'il suppose, 3,3 V* — breaksWhen *the rail is not 3.3 V: every reading is off by the same fraction. The firmware says 3.3 V while the regulator delivers 3.28 V: every reading 0.61 % high, and averaging never finds it* · *…tout le monde lit 0,61 % trop haut, et aucune moyenne ne le trouve* — limiting (the PLAN's FAULT, **Proposal**, F3). (2) *The input does not move with the rail* · *L'entrée ne suit pas le rail* — breaksWhen *the input is made from the rail itself (a divider on it): then it moves too, and the error cancels (the ratiometric card)* — limiting (**Proposal**, F3). (3) *Below full scale: V_in < V_ref. The graph stops at 3.199 V; at or above the reference the converter reports its top code, 4,095* · *Sous la pleine échelle…* — limiting (as card 1). (4) *An ideal converter: no offset, gain error or noise; 2048 and 2112 sit exactly on code edges, where a real converter gives either neighbour* · *Convertisseur idéal…* — simplifying | the PLAN; card 1; card 5 |
| `characteristics` | `show: [intercepts, limits]` (no sensitivity: zero for a floored statement) | as card 1 |
| `graph` | against `V_in`, domain [0, 3.199] V; `scale` linear; `hold` V_ref (3.2–3.6 V, default 3.3), N (8–16 bits, default 12, whole bits: X-intstep); `compare` V_ref at [3.3, 3.2] (the 3.30 V line **dashed**, the "before", as the U018 brief showed it: X-compare-style); `markExamples: true`; framings *Home* and *Zoom near 1.65 V* (X-eq-framing) | F1, F4 |
| `notes` | `include: true` | print |

**Axes.** x: *Input voltage (V)*, 0 to 3.199 V. y: *Code*, auto-scaled 0 to 4094 (3.199/3.2 × 4096 = 4094.72 → 4094 on
the 3.20 V line; 3970 on the 3.30 V line). The legend reads *V_ref = 3.3 V* and *V_ref = 3.2 V* (the bench's `compare`
label prints 3.3, not 3.30: §12 c).

**Framings**:

| Framing | x | y | Why |
|---|---|---|---|
| *Home* | 0–3.199 V | 0–4094 (auto) | the two lines fanning out from zero: the same fraction at every input (p4) |
| *Zoom near 1.65 V* (**Proposal**, F4) | 1.60–1.70 V | 1980–2180 | at Home 2048 and 2112 are 64 codes apart, 1.6 % of the axis (≈ 6 px on the wall); here a third of the height, one dot above the other at the same input |

### 3b. Worked examples (each on its own line)

| # | Label (EN · FR) | V_in | V_ref | N | code (target; stand-in today) | Note |
|---|---|---|---|---|---|---|
| E1 | *The rail at 3.30 V: code 2048* · *Le rail à 3,30 V : code 2048* | 1.65 | 3.3 | 12 | 2048 (2.048 k) | *1.65/3.30 = 0.5000 of 4,096: the firmware's 3.3 V gives back 1.650 V* · *…le 3,3 V du micrologiciel redonne 1,650 V* |
| E2 | *The rail sagged to 3.20 V: code 2112* · *Le rail tombé à 3,20 V : code 2112* | 1.65 | 3.2 | 12 | **2112, exactly** (2.112 k) | *1.65/3.20 = 0.5156 of 4,096: 3.1 % more code for 3.0 % less reference. The firmware still multiplies by 3.3 V: 2112 × 3.3/4096 = 1.702 V for an input of 1.65 V* · *…Le micrologiciel multiplie toujours par 3,3 V : 2112 × 3,3/4096 = 1,702 V pour une entrée de 1,65 V* |

**E2 must show 2112, never 2111** (the PLAN's reveal; §8). The labels carry the codes in digits until X-count.

**Values beside their element**: the Example pane with both codes and notes; on the graph the two dots at 1.65 V, one on
each line, labelled; the Symbols pane.

**Colours and their second channel** (C4): the 3.30 V line **dashed** (before), the 3.20 V line solid (after), each
labelled by the bench with its reference; the dots in the example amber, labelled; the fraction with its words.

## 4. The run: step by step, as the Flow goes

### 4a. Steps

| # | id | Flow paragraph | What changes (`say`) | Pane | Presenter's control |
|---|---|---|---|---|---|
| — | the PLAN's poe fires before the bench (p0 `[[ask]]`, p1 `[[pause]]`) | — | (§7a) | — | the activity |
| 0 | `s0-two-rails` | p2 *"[[demo]] On the Equation Bench: 12 bits, 1.65 V in, and the reference…"* | 12 bits and a fixed 1.65 V, against the rail at 3.30 V and sagged to 3.20 V. | Graph, Home, both lines and dots | pane |
| 1 | `s1-rises` | p3 *"[[reveal]] The code rises from 2048 to 2112, about 3 %…"* | The code rises from 2048 to 2112, 3.1 %; the firmware, still assuming 3.3 V, reports 1.70 V. | Example, E1 and E2 | pane |
| 2 | `s2-same-input` (**Proposal**, F4) | unscripted (§2) | Up close: the same input, two references, 64 codes apart. | Graph, *Zoom near 1.65 V* | pane, framing |
| 3 | `s3-one-for-one` | p4 *"That is the rule: reference error is measurement error, one for one…"* | The error is the same fraction at every input: the lines fan from zero, a gain error. | Graph, Home; `V_ref` pinned | framing, pin |

s1 answers the poe (the PLAN's reveal). Without s2, s3 follows s1 on the Graph at Home. p4 plants S22 (*"…tomorrow a
gain calibration can absorb it, as long as the reference holds still"*) over s3 held (B13).

Suggested words for s2 (B20; **Proposal**, F4): *"Up close: the same input, two references, sixty-four codes apart."*

### 4b. Motion, cues and stills

| # | Motion | Movers | Cue | Hold | Reduced motion (C3) | Still |
|---|---|---|---|---|---|---|
| 0 | none (pane) | 0 | the dashed 3.30 V line and the solid 3.20 V line; two dots at 1.65 V | hold | same | the graph at Home |
| 1 | none (pane) | 0 | E2's 2112 beside E1's 2048; E2's note | hold | same | the Example pane |
| 2 | the framing eases to the zoom (≈ 0.6 s) | 1 (the view) | the two dots one above the other | hold | at once | the zoomed graph |
| 3 | the framing eases back to Home | 1 | the two lines' angle; `V_ref` lit | hold | at once | the graph at Home with V_ref lit |

## 5. Pacing and interaction, by surface and view

**Who paces** (B12): the presenter on the wall (pane, pin and, with X-eq-framing, the framing mirrored); the learner in
Study and Scope.

| View | Who | Controls |
|---|---|---|
| Preview (in the slide) | everyone | the statement and the current pane |
| View (details) | everyone | every pane: Symbols, Terms, Example, Graph, Assumptions; one slider, labelled on top in words with the symbol in parentheses and the value at the right, *Resolution (N)* 8–16 bits, default 12, whole bits (V_ref is the family); the framings *Home* · *Zoom near 1.65 V*; the hover |
| Edit (session only) | everyone | not specified for the Equation Bench |
| Authoring | authors | the `equation` block's YAML |

- **The presenter's strip** (B20): pane, pin and framing; the next `say`; s2's words; the teacher tip.
- **Study / Scope**: N; the framings; the hover on both lines (§7e).
- **Phone** (C6): the statement, then the pane; at Home the two dot labels are 64 codes apart (≈ 2 % of the plot's
  height): they collide at 320, so on a phone the graph opens on the zoom framing, or the Example pane carries the values
  (to check).
- **Locked**: the bench is not shown until the poe closes (the reveal waits, B9).

## 6. The frame

The Equation's frame (the Canvas header and footer; panes as pills, D4.17). Title *Reference error is measurement
error*. The framing buttons with the graph's own controls (X-eq-framing).

| Tile / panel | Used? | Selected item | List / contents |
|---|---|---|---|
| Panes | yes | the open pane | Symbols, Terms, Example, Graph, Assumptions |
| Legend | yes | — | *V_ref = 3.3 V* (dashed), *V_ref = 3.2 V* |
| Framings | yes (X-eq-framing) | the current framing | Home · Zoom near 1.65 V |
| Readout | yes (hover) | V_in, code on each line | — |

## 7. Thinking, not watching

- **7a. The PLAN's ASK** (verbatim, §1): the poe, *"The supply rail, which is also the reference, sags from 3.30 V to
  3.20 V. The input, 1.65 V, has not changed at all. What does the code do?"* It fires at p0, **before the bench
  appears**; **s1 reveals it**.
- **7b. Prediction point**: the poe is the prediction.
- **7c. After**: the explain. In Study, done means the poe answered and the Graph pane opened.
- **7d. Teacher tip** — **Proposal** (F3): *Expect "falls: less supply, less reading" (the intuition that a weaker supply
  gives a weaker signal) and "stays at 2048". Ask: what is the code a fraction of? If the reference shrinks and the input
  does not, the fraction grows.*
- **7e. Explore** (B11): in Study, hover both lines at 3.0 V: *3723 against 3840*, the same 3.1 %; N to 10: *512 against
  528*, the same 3.1 % again.

## 8. Faithfulness (the quality bar)

**Arithmetic** (code = ⌊V_in/V_ref · 2^N⌋; recomputed in Node, 2026-10-20):
- **E1**: 1.65/3.3 × 4096 = **2048.000** → 2048 (exact in doubles too).
- **E2**: 1.65/3.20 × 4096 = 0.515625 × 4096 = **2112.000 exactly** (33/64 of 4,096) → **2112**. In doubles:
  **2111.9999999999995**, which `Math.floor` turns into **2111**: the misprint X-exact-floor removes (§12). Snapping
  within 1e-12 of an integer gives 2112 (checked). Both 2048 and 2112 lie **on a code edge** (A3): a real converter with
  any noise gives 2047|2048 and 2111|2112 there (assumption 4; D1·070's *"2047 or 2048"*).
- **The change**: 2112/2048 − 1 = **+3.125 %** (the poe's *"rises, by about 3 %"* ✓; p3's *"about 3 %"* ✓); the
  reference fell 0.10/3.30 = **3.030 %**. 3.3/3.2 − 1 = 3.125 % ✓. (The explain's *"by the 3 % the reference fell"*: F5.)
- **The firmware**: 2112 × 3.3/4096 = **1.7016 V** (p3's *"1.70 V"* ✓), **+3.125 %** on the true 1.65 V.
- **The statement**: a reference 1 % high gives readings × 1/1.01 = **0.990 % low** (*"1 % low"* ✓ to the figure given);
  the same fraction at every input, because code ∝ V_in (*"at every point of the range"* ✓, to within the one-step
  truncation).
- **The FAULT**: 3.3/3.28 − 1 = **+0.610 %** (*"about 0.6 % off"* ✓). At 1.65 V: 1.65/3.28 × 4096 = 2060.49 → **2060**,
  read as 2060 × 3.3/4096 = **1.6597 V** (+0.59 %, the truncation taking 0.02 %). Systematic, so averaging leaves it ✓.
- **The poe's options**: *falls* (wrong direction), *stays at 2048* (true only for a ratiometric input, card 5), *rises,
  by about 3 %* (✓), *jumps to full scale* (1.65 V < 3.20 V, so no): one right answer, three real misconceptions ✓.
- **The axes and zoom**: 3.199/3.2 × 4096 = **4094.72** → 4094; 3.199/3.3 × 4096 = **3970.6**; at the zoom, the 3.30 V
  line runs **1985.9–2110.1** and the 3.20 V line **2048–2176** over 1.60–1.70 V. §7e: 3.0/3.3 × 4096 = **3723.6** →
  3723, 3.0/3.2 × 4096 = **3840** (exact); 1024 × 0.5 = 512, 1024 × 0.515625 = 528.
- **S22** (A4): D2·050's harvest reads *"Reference error passes through one-for-one, we said: a reference 1 % high makes
  every reading 1 % low. That is a pure gain error, so the gain constant absorbs it."* It agrees with the statement, p4
  and the SEED ✓; *"as long as it holds still"* (the SEED) is consistent with card 4's rail that sags under load, which no
  one-time calibration absorbs ✓.

**Section D, Equation rows**
- [x] Symbols match card 1 (and card 2); V_ref labelled as the rail, as p2 says.
- [x] Every example recomputed above, exactly; E2's exact value required on the bench.
- [x] The family is the PLAN's two rail voltages; the N slider 8–16 bits; the domain stops below the lower reference, so
  no impossible code is drawn.
- [x] The graph obeys the Plot rows: two lines through zero are the law; one scale; each value on its own line.

**A1–A8**: A1 ✓ (the transfer function as card 1; a supply-referenced MCU converter, e.g. a common 8-bit MCU's AVCC
reference, card 4; cited here only); A2 ✓ (truncation, the FAULT, the rail named); A3 ✓ (both values on code edges;
full scale); A4 ✓ (S22 against D2·050; *"stays at 2048"* against card 5); A5 ✓ (the rail as reference: the code ∝ 1/V_ref);
A6 ✓ (F5); A7 ✓; A8 ✓.

## 9. Faults and non-ideal behaviour

**PLAN FAULT** (verbatim): *The firmware says 3.3 V while the regulator delivers 3.28 V: every reading about 0.6 % off,
and no amount of averaging finds it.* On the bench it is assumption 1's *breaksWhen*, with its numbers (+0.61 %; 1.65 V
reads 2060, reported as 1.660 V) (**Proposal**, F3); it is not a third line of the family (0.6 % from the 3.30 V line is
under a pixel at Home, and a third dot at 2060 would crowd the reveal). The rail's load-dependent sag is card 4's.

## 10. Accessibility, legibility and print

- Wall (C2): pane text, axis labels, legend and dot labels at the floor; at Home the two dot labels are 64 codes apart:
  check at 1920 × 1080 and 1024 × 768 that they do not collide, else the labels sit left and right of the dots (§12 d).
- Reduced motion: the framings land at once.
- Colour (C4): before dashed, after solid, both labelled; dots labelled.
- Keyboard (C5): pane, pin, step keys; Tab to the framing buttons.
- Print (C8): the notes (statement, examples with notes, assumptions, the graph at Home and zoomed).
- Languages: every label, note, caption and assumption as `{en, fr}` (§3); French drafts are ours, for the owner's review;
  numbers and units are not translated.

## 11. Assets to make or source

| Asset | Format | Made by | Status |
|---|---|---|---|
| The `equation` block (§3a, §3b), EN and FR | YAML in `en.md` | the author | to write |

## 12. Bench capabilities this needs

**Equation Bench, exists**: statement with `floor`, symbols, a term highlight, examples, assumptions, caption,
`characteristics.show`, graph with `hold`, `compare` and `markExamples`, panes and pins mirrored.

**Missing (request it)** (working names, as `D1-090-01` §12):
- **X-exact-floor** — **blocking for the target**: ⌊ ⌋ evaluated exactly on a code edge, wherever the bench evaluates
  (the Example pane, the dot, the graph's samples, the hover). Without it E2 reads **2111**, the opposite of the reveal's
  number. Until it lands the card runs on the stand-in (§13), which is exact.
- **X-count**: codes printed *2048*, *2112*, not *2.048 k*, *2.112 k*.
- **X-floor-print**: ⌊ ⌋ printed as ⌊ ⌋.
- **X-intstep**: N in whole bits.
- **X-compare-style**: a line style per value of a `compare` family (the 3.30 V "before" dashed), as the U018 brief drew it.
- **X-eq-framing**: the zoom near 1.65 V as a mirrored framing (F4).

**To confirm when written**: (a) `characteristics.show: [intercepts, limits]` hides the sensitivity bars; (b) the
example dots land on their own lines (they do: `plottedPoints` evaluates each example at its own V_ref); (c) the legend's
*V_ref = 3.3 V* drops the Flow's trailing zero (3.30): would help, a label per compare value; (d) the two dot labels at
Home (§10).

**Would help**: X15 (the family revealed one line per step: 3.30 V first, then 3.20 V, so *"slid"* is a step the room
sees); X21 (crossing 506: a vertical reference line at 1.65 V, *the input did not move*).

**Not this bench's**: the rail sagging under load (card 4, Electronics or Animation); the ratiometric input that stays at
2048 (card 5, the Plot).

## 13. Stand-in for the lecture

**Today's Equation Bench**, the same block with the statement written as the Flow's own formula, `code = V_in / V_ref *
2^12`, **without ⌊ ⌋**, and assumption 4 reading *"The converter truncates (card 1's ⌊ ⌋). Here both values sit exactly
on a code edge, 2048.000 and 2112.000, so truncation changes nothing"*. Both lines solid; the zoom by the presenter's
wheel on the wall window (to check on the lecture laptop).

- **It shows**: s0–s3 with the right numbers: E2 evaluates to 2111.9999999999995 and prints, to four figures, *2.112 k*
  (the label says *2112*); the dot sits at 2112 to within 10⁻¹² codes; the hover reads *2112.000*.
- **It loses**: ⌊ ⌋ on this card (card 1 shows it); the dashed "before" line (the legend tells the two apart); plain-digit
  codes; an exact, mirrored zoom; N in Study (2^12 is written).
- **Checks lost**: B17 partly (before and after told apart by label only), C4's dash.
- **What the Flow might say differently**: nothing.
- **Do not** put ⌊ ⌋ in the stand-in: it would print 2111 at the reveal.
- The stand-in's block becomes the target's when ⌊ ⌋ is added, so nothing is made twice.

## 14. Findings for the owner

- **F1 — "V_ref slid from 3.30 to 3.20 V": a family, not a slide.** A slider's value is not mirrored, so the room would
  not see a slide. Options: (a) `compare` V_ref [3.30, 3.20] with both values as examples, the 3.30 V line dashed as the
  "before" (X-compare-style; solid until then) (**recommended**); (b) the same, revealed one line per step when X15
  exists; (c) one line and a V_ref slider moved on the wall window (only that window shows it; the Example pane would not
  change).
- **F2 — Exact evaluation on a code edge is required** (the coordinator's and card 4's note, confirmed in source and
  Node). ⌊ ⌋ in doubles gives 2111 for the card's 2112 (and is safe for card 1's 2048 only because 0.5 × 4096 is exact).
  Options: (a) request X-exact-floor now; the card runs on the stand-in without ⌊ ⌋ until it lands (**recommended**);
  (b) keep the Flow's formula on this card for good (no ⌊ ⌋; D5 stays on card 1 only); (c) ⌊ ⌋ with V in millivolts
  (1650/3200 is exact in doubles), not workable: the bench prints *1.65 kmV*.
- **F3 — Proposals**: assumption 1 carrying the PLAN's FAULT with its numbers; assumption 2 (the input does not move with
  the rail: the bridge to card 5); the teacher tip (§7d); the explore prompts (§7e). +0 min each.
- **F4 — Proposal: s2, the zoom near 1.65 V.** At Home 2048 and 2112 are 1.6 % of the axis apart; the zoom (1.60–1.70 V)
  puts them a third of the height apart, one above the other at the same input. Options: (a) take s2 (+0.14 min; needs
  X-eq-framing, the presenter's wheel until then) (**recommended**); (b) leave it: the Example pane carries the numbers.
- **F5 — reported, not raised: "by the 3 % the reference fell".** The code rises 3.125 % while the reference falls
  3.030 %; *"one for one"* is the first-order rule (a reference 1 % high gives 0.990 % low). At the one figure the
  explain and Flow give, both are 3 %, so nothing the room takes away is false; E2's note gives *"3.1 % more code for
  3.0 % less reference"* on the bench. No change proposed.

No **accuracy** finding on this card: the statement, PLAN (ASK, SEED, FAULT) and Flow recompute (§8), and S22 agrees with
D2·050.

**Decided 2026-10-20** (owner: *"apply all recommendations"* on the U018 brief): D1, D5 as above. (The proposals and
options in this §14 are not yet decided.)

## 15. Acceptance: how we know it is built right

- The Equation compiles with the fields of §3a with no error or warning; no rearrangement; no sensitivity bars. **E1
  shows 2048 and E2 shows 2112, never 2047 or 2111**, on the Example pane, the dots and the hover (X-exact-floor; in plain
  digits with X-count). The graph runs 0–3.199 V with the 3.30 V line dashed to 3970 and the 3.20 V line solid to 4094,
  each dot on its own line; the zoom shows them 64 codes apart.
- The poe fires before s0 and s1 reveals it; the presenter's pane, pin and framing changes reach the wall.
- B1 one pane, pin or framing per beat; B5 each `say` in the notes; B6 the fraction and V_ref lit with their panes; B9 the
  reveal waits for the poe; B10 the explain; B13 statement and values only, p4 over a held state; B16 values readable;
  B17 before and after on one scale; B18 Home one press away; B20 s2's words and the tip.
- C2 legible at 1920 × 1080 and 1024 × 768, the two dot labels included; C3 framings land at once; C4 dash and labels; C5
  keys; C6 at 320 (§5); C8 the notes and both stills.
- E1–E6 on the built block: both themes; the wall at 7:1; Scope at phone width; every pane at 1920 × 1080 and 1024 × 768;
  the framing key in all four places.
- The stand-in (§13) checked on the lecture laptop: E2 reads *2.112 k* with its label *code 2112*; the statement has no
  ⌊ ⌋.
- **Six gates (this spec)**: (1) realism ≥ 95 %: the course's converter on its own rail, the PLAN's real sag and the
  FAULT's real 3.28 V, nothing branded ✓; (2) science: code ∝ V_in/V_ref, so a reference error is a gain error, the
  input's independence from the rail and full scale stated ✓; (3) maths: every number recomputed in Node; the
  floating-point 2111 found, and exact evaluation required with an exact stand-in until then ✓; (4) visualization:
  before and after on one scale, the angle between them at Home, the 64 codes in the zoom ✓; (5) consistency: card 1's
  statement, card 2's inverse (1.65 V reading 2112 → 3.20 V), card 5's ratiometric case, S22 in D2·050 agree ✓;
  (6) design: the dot labels' collision at Home and on a phone named with its check, EN and FR drafted ✓ on paper.
