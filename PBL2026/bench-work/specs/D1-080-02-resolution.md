```yaml
id: D1-080-02-resolution
card: "Resolution: how many levels"
module: notes/Day01/080-adc-conversion/en.md
bench: Equation                   # exists: statement, symbols, highlights, derivation, rearrangements, examples, assumptions, graph with log y, compare and markExamples
library: "lsb-size: an Equation (LSB = range / 2^N), defined in the card's `equation` block, derived from levels = 2^N, graphed against N from 4 to 16 bits on a log y axis as a family for range = 3.3 V and 10 V, with the PLAN's two worked values and one bit more marked"
dimensions: 2D
stand_in: none
optional_benches: []
real_thing: "the code width of an ideal N-bit converter: the PLAN's 8 bits on 0–10 V, and the course's 12-bit MCU converter on a 3.3 V reference (one LSB = 0.806 mV)"
minutes: 0.8                      # on the bench: from p5 (after the numeric) to the end of the card
card_minutes: 2.5
status: spec-draft
learner_action: numeric
predictions: []                   # the numeric comes before the bench and is answered at s0
seeds: []
key_variable: "N: each extra bit doubles the levels and halves the step"
time_scale: "none (no motion)"
steps: 3                          # s0–s2
```

The Equation's format as read on 2026-10-20 (`C:\ExSightory\src\insight\packages\insight-core\src\registry\equationBlock.ts`):
**one `statement` per block**, solved for its left side; the graph draws the left side against one right-hand symbol,
every other right-hand symbol on a `hold` slider; `scale` x and y take `linear` or `log` (a log x must not touch zero);
`compare` draws one curve per value of a held symbol (two to five) and **removes that symbol's slider**; `markExamples`
places each example at its own values, so an example on 10 V lands on the 10 V curve; `rearrangements` (`solveFor`) has
the compiler solve the statement for another symbol and check it numerically; examples give right-hand values only, and
the Example pane lists them all at once. The expression language has `log2`, `log10`, `sqrt`, `floor` (`expr/parse.ts`).
**Mirrored to the wall**: the pane, the pinned annotation (`focus`), the derivation step and a simulation's transport.
**Not mirrored**: a slider's value, the hover readout and `graph.animate`'s sweep (as `D1-070-06-max-source-impedance.md`
records). So the PLAN's *"N slider"* would move nothing the room sees (F1).

## 1. What the room must understand

- **Statement** (verbatim): *An n-bit converter has 2ⁿ levels spread across its input range. One step — one LSB — is
  the range divided by the number of levels.*
- **SHOW** (verbatim from the PLAN): *Equation — LSB = range / 2^N, with an N slider; worked examples: 8 bits on 10 V →
  39.06 mV; 12 bits on 3.3 V → 0.806 mV.*
- **Status** (verbatim): *ready.*
- **Drive / Look for**: *none in the PLAN.* The explain's *"every extra bit halves it"* is what the graph shows (F1).
- **Bench and library.** The **bench** is the Equation Bench (owner decision D1, 2026-10-20: the PLAN's Plot and
  Equation benches, ready today). The **library** is this card's equation, `lsb-size`.
- **Insight**: *one step is the range shared among 2^N levels, so every extra bit halves it: 39.06 mV at 8 bits on 10 V,
  0.806 mV at 12 bits on our 3.3 V converter.*
- **Kind of knowledge**: *a relation between quantities* (the step against the number of bits, for two ranges). Card test
  → **Equation**. B17 applies (two ranges on one N axis and one y scale). B15, B18, B19 do not.
- **Why this bench, not a still**: the worked values are evaluated, not typed; on a log y axis *"every extra bit halves
  it"* is a straight line falling one equal step per bit, the same on both ranges; in Study the hover reads the step at
  any N, and the rearrangement answers the reverse question (how many bits for a given step).
- **Key variable**: N (the graph's x axis; F1).

## 2. Time

The Flow is 176 words (word count of `en.md`, 2026-10-20); p3's `[[ask]]` question (17) is counted in the numeric:
**159 spoken outside the numeric**.

| Beat | Minutes | Source of the number |
|---|---|---|
| Before the bench: p0 *"The number of available levels…"* (18), p1 the four bullets (28), p2 *"The higher the resolution…"* (47) | 0.72 | 93 ÷ 130 |
| p1's powers read aloud (*"two to the eight, two hundred and fifty-six"*: ≈ 4 more words per bullet) | 0.12 | estimate (+16 words) |
| The PLAN's numeric: p3 *"[[ask]] If 8 bits are used to represent a range of 0–10 V…"* (17) | 0.13 | 17 ÷ 130 |
| The numeric's answer window (one division; p4 `[[pause]]`) | 0.75 | as the model specs (45 s) |
| s0 the answer: p5 *"If 8 bits represent 0–10 V, the resolution is about 39 mV per step."* (13) | 0.10 | 13 ÷ 130 |
| s1 one LSB: p5 *"This is often specified as the 1-LSB resolution…"* (16) | 0.12 | 16 ÷ 130 |
| s2 every bit halves it: unscripted (≈ 24 words: *"Nine bits: 19.5 millivolts, half. Every extra bit halves the step. Twelve bits on our 3.3 volt converter: 0.806 millivolts."*) | 0.18 | estimate |
| s2 held: p6 *"Digital instruments use the binary number system…"* (37) | 0.28 | 37 ÷ 130 |
| Pane and pin moves not covered by speech (3 × ≈ 1.5 s) | 0.08 | estimate |
| **Card total / of which on the bench** | **2.5 / 0.8** | 2.48 / 0.76 |

The U017 preview showed this card at ≈ 2.1 min; the 0.4 difference is p1's powers read aloud, s2's unscripted line and
the pane moves. Without s2's line (F1 option c) the card is 2.3 min.

**Module check**: `D1-080-03-quantization-floor.md` §2.

## 3. The scene: what is on the bench

### 3a. The equation (`lsb-size`)

| Field | Content | Source |
|---|---|---|
| `title` | *Resolution: how many levels* | the card |
| `statement` | `LSB = range / 2^N` | the PLAN |
| `caption` | *Every extra bit doubles the levels and halves the step.* | the PLAN's explain |
| `symbols` | `LSB` *One step: the value of the least significant bit* (V), note *the 1-LSB resolution (p5); the smallest change in the input the code can show*; `range` *Input range: the span the levels share* (V), note *0 V to the reference on our converter: 3.3 V*; `N` *Resolution* (bits), note *a whole number*; `levels` *Number of levels* (no unit), for the derivation | the PLAN; the Flow's p1, p5 |
| `highlights` | term `2^N` — *the number of levels: 256 at 8 bits, 4,096 at 12* (teal) | the Flow's p1 |
| `source` | *The code width of an ideal N-bit converter* (unbranded) | §8 |
| `derivation` | 1 `levels = 2^N` — *each bit doubles the number of codes: 256 at 8 bits, 4,096 at 12, 65,536 at 16 (the list we just read)*; 2 `LSB = range / levels` — *the range is shared equally among the levels*; 3 the statement — *one step: the range over 2^N* (**Proposal**, F4) | the statement; the Flow's p1 |
| `rearrangements` | `solveFor: N` — *the bits a given step needs: 1 mV on 3.3 V needs log₂ 3300 = 11.7, so 12 bits* (**Proposal**, F4) | §8 |
| `examples` | §3b | §8 |
| `boundaries` | none | |
| `assumptions` | (1) *One LSB is the range divided by 2^N levels* — breaksWhen *a datasheet or firmware divides by 2^N − 1 (255 at 8 bits): 10 V ÷ 255 = 39.22 mV, 0.39 % larger. Either convention works alone; mixing them is a gain error (the next card's fault)* — simplifying (F2). (2) *The range is the span the converter's levels cover, set by its reference: 0 to 3.3 V on ours* — breaksWhen *the reference is off: every step moves with it, by the same fraction (card 4; D1·090)* — limiting. (3) *N is a whole number of bits; on the log axis the line through the whole values is straight, so it is drawn through them* — simplifying | the PLAN's explain; card 3's FAULT; card 4 |
| `graph` | against `N`, domain [4, 16]; `scale` x `linear`, y `log`; `hold` range (1–10 V, default 3.3); `compare` range at [3.3, 10]; `markExamples: true` | F1 |
| `notes` | `include: true` | print |

**Axes.** x: *Resolution N (bits)*, linear, 4 to 16, a grid line every bit (to confirm, §12). y: *One step LSB (V), log*,
auto-scaled by the bench to the curves: from 50.35 µV (16 bits on 3.3 V) to 625.0 mV (4 bits on 10 V). On a log y axis
each range is a straight line falling by a factor of two per bit (0.301 of a decade): *"every extra bit halves it"* is
the line's equal steps, and the two ranges are parallel lines 0.48 of a decade apart (10/3.3 = 3.03).

**The two curves** (`compare`, labelled by the bench *range = 3.3 V* and *range = 10 V* in the Equation's series colours,
in palette order).

### 3b. Worked examples (each marked on its own range's line)

| # | Label | N | range | LSB (shown, 4 s.f.) | Note |
|---|---|---|---|---|---|
| E1 | *8 bits on 10 V* | 8 | 10 | 39.06 mV | *256 levels: 10 V ÷ 256. A datasheet that divides by 255 gives 39.22 mV (assumption 1)* |
| E2 | *9 bits on 10 V* | 9 | 10 | 19.53 mV | *one more bit: twice the levels, half the step* (**Proposal**, F1) |
| E3 | *12 bits on 3.3 V: the course's converter* | 12 | 3.3 | 805.7 µV | *4,096 levels: 3.3 V ÷ 4096 = 0.806 mV* |

The bench prints four significant figures with its own prefix (`formatQuantity`), so E3 may read *805.7 µV*; the PLAN's
*0.806 mV* is the same value rounded (§8). Its note says *0.806 mV* so the two forms sit side by side.

**Values beside their element**: the Symbols pane with values and units; the Example pane with LSB and each note; on the
graph the three example dots, each labelled with its example's label.

**Colours and their second channel** (C4): each line labelled with its range by the bench (the label is the second
channel); the example dots in the bench's example amber, each labelled; the highlighted `2^N` with its words in the Terms
pane.

## 4. The run: step by step, as the Flow goes

### 4a. Steps

| # | id | Flow paragraph | What changes (`say`) | Pane | Presenter's control |
|---|---|---|---|---|---|
| — | the PLAN's numeric fires before the bench (p3 `[[ask]]`, p4 `[[pause]]`) | — | (§7a) | — | the activity |
| 0 | `s0-answer` | p5 *"If 8 bits represent 0–10 V, the resolution is about 39 mV per step."* | 8 bits give 256 levels; 10 V shared among them is 39.06 mV a step. | Example, E1–E3 listed, `2^N` pinned | pane, pin |
| 1 | `s1-one-lsb` | p5 *"This is often specified as the **1-LSB resolution**…"* | That step is the 1-LSB resolution: the range over 2^N levels. | Proof, steps 1 → 3; `LSB` pinned | pane, step, pin |
| 2 | `s2-halves` | unscripted (§2); then p6 *"Digital instruments use the binary number system…"* held | Every extra bit halves the step: 39.06 mV at 8 bits, 19.53 mV at 9; 0.806 mV at 12 bits on 3.3 V. | Graph, both lines, E1–E3 marked | pane |

s0 answers the numeric (the PLAN's reveal: *"the Equation below"*). p6 (binary words) is spoken over s2 held: it names
no value on the bench, so nothing changes under it (B13).

Suggested words for s2 (B20, on the strip): *"Nine bits: 19.5 millivolts, half. Every extra bit halves the step. Twelve
bits on our 3.3 volt converter: 0.806 millivolts."*

### 4b. Motion, cues and stills

| # | Motion | Movers | Cue | Hold | Reduced motion (C3) | Still |
|---|---|---|---|---|---|---|
| 0 | none (pane, pin) | 0 | E1's value; `2^N` lit in the statement | hold | same | the Example pane |
| 1 | none (derivation steps, pin) | 0 | the new derivation line; `LSB` lit | hold | same | one per derivation step (three) |
| 2 | none (pane) | 0 | the two labelled lines and the three dots | hold | same | the graph |

No simulation and no `graph.animate`: N is the axis, not a sweep, and neither a slider's value nor `animate` reaches the
wall.

## 5. Pacing and interaction, by surface and view

**Who paces** (B12): the presenter on the wall (pane, pin and derivation step are mirrored); the learner in Study Mode
and Scope.

| View | Who | Controls |
|---|---|---|
| Preview (in the slide) | everyone | the statement and the current pane |
| View (details) | everyone | every pane: Symbols, Terms, Proof, Example, Rearrangements, Graph, Assumptions; no slider (N is the axis, range is the family); the hover readout on the graph |
| Edit (session only) | everyone | not specified for the Equation Bench |
| Authoring | authors | the `equation` block's YAML |

- **The presenter's strip** (B20): the pane, pin and step controls; the next step's `say`; s2's suggested words; the
  teacher tip.
- **Study / Scope**: the hover on either line; the Rearrangements pane (§7e).
- **Phone** (C6): the statement, then the pane, full width; the two line labels and three dot labels must not collide at
  320 (check; else the Example pane carries the values).
- **Locked**: the bench is not shown until the numeric closes (the PLAN's reveal is the Equation), so nothing needs
  locking.
- **Sliders** (owner, 2026-10-20, `sliders-side-by-side`): this graph has none. If the owner keeps an N slider (F1
  option b), it sits on one row with its label above in words and the symbol in parentheses, *Resolution (N, bits)*, the
  value at the label's right.

## 6. The frame

The Equation's frame (the Canvas header and footer; panes as pills, D4.17). Title *Resolution: how many levels*. No
inset, no graph band beyond the Graph pane's own.

## 7. Thinking, not watching

- **7a. The PLAN's ASK** (verbatim): *numeric (at the Flow's [[ask]]) — "8 bits represent 0 to 10 V. How big is each
  step, in mV?" · answer: 39.1 mV ± 0.3 mV · reveal: the Equation below. · explain: 10 V spread over 256 levels is 39.06
  mV a step (a datasheet that divides by 255 gives 39.2 mV); every extra bit halves it. · depth: use · practice:
  computational thinking.* It fires **before s0** (the Flow's p3), and **s0 answers it**.
- **7b. Prediction point**: none beyond the numeric.
- **7c. After**: the explain. In Study, done means the numeric was answered and the Graph pane opened.
- **7d. Teacher tip** — **Proposal** (F4): *Expect 1.25 V (10 V ÷ 8: dividing by the bits, not the levels) and 3.9 mV
  (a slipped decimal). Ask: how many levels do 8 bits give? Then: 39.2 mV is also right, by the 255 convention; just never
  mix the two in one program (the next card's fault).*
- **7e. Explore** (B11): in Study, hover either line: *16 bits on 3.3 V is 50.35 µV*. The Rearrangements pane: *a 1 mV
  step on 3.3 V needs log₂ 3300 = 11.69 bits, so 12*.

## 8. Faithfulness (the quality bar)

**Arithmetic** (LSB = range / 2^N; recomputed in Node, 2026-10-20):
- E1: 10 ÷ 256 = **0.0390625 V**, shown 39.06 mV (the PLAN's 39.06 mV ✓; the Flow's *"about 39 mV"* ✓; the numeric's
  answer 39.1 ✓).
- The 255 convention: 10 ÷ 255 = **39.216 mV** (the PLAN's *"39.2 mV"* ✓; the preview's 39.22 ✓); 39.216 / 39.0625 − 1 =
  **0.392 %** (card 3's FAULT, *"0.39 % at 8 bits"* ✓).
- E2: 10 ÷ 512 = **19.53 mV**, exactly half of E1 ✓.
- E3: 3.3 ÷ 4096 = **0.00080566 V**, shown 805.7 µV (the PLAN's 0.806 mV ✓; the course's model, `course-accuracy.md` §3:
  LSB = 3.3/4096 V ✓; D1-050-02's *0.806 mV* ✓).
- The numeric's tolerance, 39.1 ± 0.3 mV (38.8–39.4 mV): accepts 39.06 (exact), 39.0 and 39.1 (rounded) and 39.22 (the
  255 convention); rejects 1.25 V (÷ 8), 3.9 mV and 390 mV ✓.
- The Flow's p1: 2⁸ = **256**, 2¹⁰ = **1,024**, 2¹² = **4,096**, 2¹⁶ = **65,536** ✓. p6: binary 0001 = 1, 1001 = 8 + 1 =
  **9** ✓ (ACCURACY D1·080-F3, applied).
- The axis: at N = 4, 10/16 = **625.0 mV** and 3.3/16 = **206.3 mV**; at N = 16, 10/65536 = **152.6 µV** and 3.3/65536 =
  **50.35 µV**. Factor of two per bit = log₁₀ 2 = **0.301 decade**; the two lines 10/3.3 = 3.03× apart = **0.482 decade**.
- §7e: log₂(3.3 / 0.001) = log₂ 3300 = **11.69** → 12 bits.

**Section D, Equation rows**
- [x] Symbols match the course: N as card 3's centrepiece and D1·070; LSB as card 3; *range* as the PLAN. The statement
  writes *n* (F3).
- [x] Every example recomputed above, to the four figures the bench shows.
- [x] No slider (the range is a family of two real ranges: the PLAN's 10 V and the course's 3.3 V).
- [x] The graph obeys the Plot rows: a straight line on a log y axis is the law's true shape (LSB halves each bit); both
  ranges on one scale; each worked value on its own line; the whole-number N stated (assumption 3).

**A1–A8**: A1 ✓ (§8; the definition is the standard ideal code width, e.g. Analog Devices' *Data Conversion Handbook*,
ch. 2, and every MCU datasheet's *1 LSB = V_REF / 2^N*; cited here only); A2 ✓ (the 255 convention and the reference named
in the assumptions); A3–A5 n/a (no object, no motion); A6 ✓ (the three assumptions on their pane, the whole-number N
included); A7 ✓ (card 3's 39.06 mV and its FAULT, card 4's reference, D1-050-02's 0.806 mV agree); A8 ✓.

## 9. Faults and non-ideal behaviour

**PLAN FAULT**: *none on this card.* The 255 convention is named in assumption 1 and E1's note, and its consequence
(mixing the two) is card 3's FAULT. The reference that sets the range is named in assumption 2 (card 4).

## 10. Accessibility, legibility and print

- Wall (C2): the statement, the three derivation lines and the pane text at the Canvas's wall size; the axis labels, the
  two line labels and three dot labels at the floor. Check at 1920 × 1080 and 1024 × 768. E1 and E2 sit one bit apart on
  the same line (0.30 decade of a ≈ 4.1-decade axis, ≈ 7 % of its height): check their labels do not collide.
- Reduced motion: nothing animates.
- Colour (C4): lines labelled with their range; dots labelled; the highlight with its words.
- Keyboard (C5): the Equation's pane, pin and step keys.
- Print (C8): the Equation's notes (statement, derivation, examples with notes, rearrangement, assumptions, the graph as a
  still).
- Languages: every label, note, caption and assumption as `{en, fr}`; French drafts are ours, marked for the owner's
  review; numbers and units are not translated.

## 11. Assets to make or source

| Asset | Format | Made by | Status |
|---|---|---|---|
| The `equation` block (§3a, §3b), EN and FR | YAML in `en.md` | the author | to write |

## 12. Bench capabilities this needs

**Equation Bench**: statement, symbols with notes, a term highlight, derivation, rearrangements (`solveFor`), examples,
assumptions, caption, graph with log y, `hold`, `compare` and `markExamples`, panes, pins and derivation steps mirrored:
**all exist**.

**To confirm when written**:
- (a) that `solveFor: N` isolates an exponent (`isolate` handles `^` through a logarithm, as D1-070-06 records) and prints
  readably (`N = log2(range / LSB)` or its equivalent);
- (b) that the x axis's ticks fall on whole bits (4, 6, … 16, or every bit), so no tick reads *8.5 bits*;
- (c) the E1 and E2 labels one bit apart (§10);
- (d) that `compare` labels its lines with the unit (*range = 10 V*), not the bare number.

**Missing**: none. **Would help**: X15 (a `compare` family revealed one curve per step), so s2 could open on the 10 V line
of the numeric and add the course's 3.3 V line after.

**Not this bench's**: the staircase and its error (card 3, the centrepiece Plot); the slider that moves N on a staircase
the room watches is card 3's.

## 13. Stand-in for the lecture

None needed: every field it uses exists.

## 14. Findings for the owner

- **F1 — "with an N slider": N becomes the graph's axis.** A slider's value is not mirrored to the wall, so an N slider
  would move nothing the room sees, and *"every extra bit halves it"* would be words only. With N on the x axis and a
  log y axis, the halving is a straight line falling one equal step per bit, and with the range as a `compare` family the
  PLAN's two worked values sit on their own lines (10 V and 3.3 V). **Proposal**: a third example, *9 bits on 10 V →
  19.53 mV*, one bit beside the numeric's, so the halving is a number as well as a slope. Options: (a) N on the axis, the
  range family, E2 added (**recommended**); (b) the PLAN's N slider with range held (Study only; on the wall the presenter
  steps the examples); (c) examples only, no graph (E1, E2, E3; −0.2 min, the unscripted line goes).
- **F2 — The explain's "a datasheet that divides by 255 gives 39.2 mV".** It is right (10 ÷ 255 = 39.216 mV) and it is
  the convention card 3's FAULT warns against mixing. On the bench it goes in two places: assumption 1 (*one LSB is the
  range over 2^N … breaks when a datasheet or firmware divides by 2^N − 1 …*) and E1's note. Options: (a) both
  (**recommended**); (b) a fourth example evaluating 10/255 (it would need a second statement: the Equation evaluates only
  range/2^N); (c) the explain only, nothing on the bench.
- **F3 — The statement writes n, the PLAN and the bench write N.** *"An n-bit converter has 2ⁿ levels"* against *LSB =
  range / 2^N* on the bench, card 3's *N slider* and card 8's *"A perfect N-bit converter"*. Not an accuracy error (gate 5,
  consistency). Options: (a) the statement becomes *"An N-bit converter has 2ᴺ levels…"* (**recommended**); (b) keep.
- **F4 — Proposals**: derivation (levels = 2^N, then the range shared among them; it carries s1 and Study); the
  rearrangement `solveFor: N` (the reverse question, Study only); the teacher tip (§7d); the explore prompts (§7e). +0 min
  each. Take, or leave?

No accuracy finding on this card: the statement, PLAN, Flow and the decided F3 (binary 1001 = 9) recompute (§8).

## 15. Acceptance: how we know it is built right

- The Equation compiles with the fields of §3a with no warning; the derivation's last line is the statement; the
  rearrangement for N compiles and verifies. E1–E3 show 39.06 mV, 19.53 mV and 805.7 µV (or 0.8057 mV). The graph runs
  N = 4–16 on a linear x and log y axis with two straight, labelled lines, the 10 V line through 39.06 mV at 8 and 19.53
  mV at 9, the 3.3 V line through 0.8057 mV at 12, each example on its own line.
- The numeric fires before s0 and s0 answers it; the presenter's pane, pin and step changes reach the wall.
- B1 one pane, pin or step per beat; B5 each `say` in the notes; B6 the pinned term lit with its pane; B10 the explain;
  B11 the hover and rearrangement in Study; B13 statement and terms only, p6 over a held state; B16 values readable; B17
  two ranges on one scale; B20 s2's suggested words on the strip.
- C2 legible at 1920 × 1080 and 1024 × 768, E1 and E2's labels included; C4 lines and dots labelled; C5 pane, pin and
  step keys; C6 at 320; C8 the notes.
- E1–E6 (ExSight's definition of done) on the built block: driven in both themes; the wall at 7:1; Scope at phone width;
  every pane rendered at 1920 × 1080 and 1024 × 768.
- **Six gates (this spec)**: (1) realism: the course's converter (12 bits, 3.3 V) and the PLAN's 8-bit, 10 V example;
  nothing branded ✓; (2) science: the ideal code width, the 255 convention and the reference named as assumptions ✓;
  (3) maths: every number recomputed in Node to the figures shown (§8) ✓; (4) visualization: the halving is a straight
  line on a log axis, both ranges on one scale, the numeric's case and the course's converter each on its own line ✓;
  (5) consistency: card 3's 39.06 mV and 0.39 %, D1-050-02's 0.806 mV agree; *n* against *N* raised (F3) ✓;
  (6) design: the two labels one bit apart named with their check (§10).
