```yaml
id: D1-060-05-decibels
card: "Ratios in decibels"
module: notes/Day01/060-conditioning/en.md
bench: Equation                   # exists: statement, symbols, highlights, derivation, examples, rearrangements
library: "decibels: an Equation (G_dB = 20·log(V_out/V_in)), defined in the card's `equation` block, derived from the power form 10·log(P_out/P_in), with three worked ratios, the quiz's chain, and the way back to a gain"
dimensions: 2D
stand_in: none
optional_benches: []
real_thing: "the decibel as engineers use it: 20·log₁₀ of a voltage (or current) ratio, 10·log₁₀ of a power ratio"
minutes: 3.0                      # on the bench: the Equation is up for the whole card, the flash quiz included
card_minutes: 3.0
status: spec-draft
learner_action: flash
predictions: []                   # the flash quiz is a recall check, answered at s5
seeds: [S15]                      # planted in the Flow's last paragraph, over s5 held
key_variable: "the ratio Vout/Vin, and its logarithm: multiplying ratios becomes adding decibels"
time_scale: "none"
steps: 6                          # s0–s5
```

The Equation's format is as in `D1-060-04-negative-feedback.md` (read 2026-10-13). `log10` is in the expression
language's closed list of functions (`expr/parse.ts`), and `rearrangements` isolate through it.

## 1. What the room must understand

- **Statement** (verbatim): *A decibel is a ratio on a logarithmic scale: twenty times the log of a voltage ratio, ten
  times the log of a power ratio. Gains in a chain then add instead of multiply.*
- **SHOW** (verbatim from the PLAN): *Equation — dB = 20·log(V_out/V_in) and dB = 10·log(P_out/P_in), with worked
  examples: ×2 → +6.02 dB, ×0.5 → −6.02 dB, ×10 → +20 dB.*
- **Status** (verbatim): *ready.*
- **Drive / Look for**: *none in the PLAN.* Proposed (F4) Look for: *the ×0.5 stage is a negative number, and the
  chain's decibels simply add.*
- **Bench and library.** The **bench** is the Equation Bench. The **library** is this card's equation, `decibels`.
- **Insight**: *a decibel is the log of a ratio, so a chain's gains add, losses are negative, and the 20 against the 10
  is only because power goes as the square of voltage.*
- **Kind of knowledge**: *a relation between quantities* (a formula, its power form, and its inverse). Card test →
  **Equation**. B17 applies (the voltage and power forms in one derivation). B15, B18 and B19 do not.
- **Why this bench, not a still**: the derivation shows *why* the factor is 20 for voltage and 10 for power (one line:
  the log of a square). The examples are evaluated, not typed, and the rearrangement takes the room back from dB to a
  ratio, which is the Flow's last instruction.
- **Key variable**: the ratio and its logarithm.

## 2. Time

The Flow is 277 words, all spoken: **2.13 min**.

| Beat | Minutes | Source of the number |
|---|---|---|
| s0 the ratio: p0 *"Before we can say how well an amplifier rejects…"* (21), p1 *"The **decibel** (dB) is simply…"* (46), p2 *"To analyse gains and losses…"* (37) | 0.80 | 104 ÷ 130 |
| s1 voltage: p3 *"For voltage, as in a voltage amplifier…"* (20) | 0.15 | 20 ÷ 130 |
| s2 power: p4 *"For power we need a modified expression…"* (25) | 0.19 | 25 ÷ 130 |
| s3 the examples: unscripted (≈ 15 words: *"Times two: six decibels. A half: minus six. Ten: twenty."*), then p5 *"So why convert…"* (72) | 0.67 | 87 ÷ 130 |
| s4 the way back: p6 *"To convert back from dB to a gain…"* (12) | 0.09 | 12 ÷ 130 |
| The PLAN's flash: p7 the question (13) and the answer window | ≈ 0.75 | as a flash quiz |
| s5 the chain: unscripted (≈ 12 words: *"Twenty, minus six, plus forty: fifty-four. The same as twenty log five hundred."*) | 0.09 | estimate |
| s5 held: p9 *"We will use decibels three times…"* (31) | 0.24 | 31 ÷ 130 |
| **Card total / of which on the bench** | **3.0 / 3.0** | +0.2 with F4 |

The flash quiz's 13 words are counted in its 0.75 min. **Module check**: `D1-060-02-what-conditioning-does.md` §2.

## 3. The scene: what is on the bench

### 3a. The equation (`decibels`)

| Field | Content | Source |
|---|---|---|
| `title` | *Ratios in decibels* | the card |
| `statement` | `GdB = 20 * log10(Vout / Vin)` | the PLAN's voltage form |
| `symbols` | `GdB` *Gain in decibels* (dB); `Vout` *Output voltage* (V); `Vin` *Input voltage* (V); for the derivation `PdB` *Power gain in decibels* (dB), `Pout`, `Pin` *Output and input power* (W) | the PLAN |
| `highlights` | term `Vout / Vin` — *the ratio: the gain itself* (teal); coefficient `20` — *20 for voltage or current, because power goes as the square* (amber) | the Flow's p1, p3, p4 |
| `derivation` | 1 `PdB = 10 * log10(Pout / Pin)` — *the decibel is defined on power: ten times the log of the ratio*; 2 `Pout / Pin = (Vout / Vin)^2` — *across the same resistance, power goes as voltage squared*; 3 `PdB = 10 * log10((Vout / Vin)^2)` — *put one into the other*; 4 the statement — *the log of a square is twice the log: 10 becomes 20* | the Flow's p4 |
| `examples` | §3b | §8 |
| `rearrangements` | `solveFor: Vout`, note *Back from dB to a gain: V_out/V_in = 10^(G_dB/20). 54 dB is 10^2.7 = 501, the quiz's ×500.* | the Flow's p6 |
| `assumptions` | *V_out and V_in are across the same resistance, so 20·log of the voltage ratio is also the power ratio* — breaksWhen *the impedances differ (an amplifier's 1 MΩ input against its 1 kΩ load): 20·log still gives the voltage gain, but no longer the power gain* — simplifying | the Flow's p4 |
| `notes` | `include: true` | print |

No `graph` (F3).

### 3b. Worked examples

| # | Label | V_in | V_out | G_dB | Note |
|---|---|---|---|---|---|
| E1 | *×2* | 1.000 | 2.000 | +6.021 | *doubling: about +6 dB* |
| E2 | *×0.5* | 1.000 | 0.500 | −6.021 | *halving: a loss is a negative number* |
| E3 | *×10* | 1.000 | 10.00 | +20.00 | *each ×10 in voltage is +20 dB* |
| E4 | *×10, ×0.5, ×100 in a chain* | 1.000 | 500.0 | +53.98 | *20 − 6.02 + 40 = 53.98 dB: the same as 20·log 500* |

E4 is the flash quiz's answer and is shown only at s5 (the Example pane opens on E1–E3 at s3; F2).

**Values beside their element**: the Symbols pane with values and units; the Example pane with G_dB and its note; the
Rearrangements pane with the compiler's formula and its note.

**Colours and their second channel** (C4): the ratio teal and the 20 amber, each with its words in the Terms pane.

## 4. The run: step by step, as the Flow goes

### 4a. Steps

| # | id | Flow paragraph | What changes (`say`) | Pane | Presenter's control |
|---|---|---|---|---|---|
| 0 | `s0-ratio` | p0 *"Before we can say how well…"*, p1, p2 | A decibel is the logarithm of a ratio: the output over the input. | Symbols, `Vout / Vin` pinned | pin |
| 1 | `s1-voltage` | p3 *"For voltage, as in a voltage amplifier…"* | For voltage or current: twenty times the log of the ratio. | Symbols, `20` pinned | pin |
| 2 | `s2-power` | p4 *"For power we need a modified expression…"* | For power: ten times the log, because power goes as the square of voltage. | Proof, steps 1–4 | pane, step |
| 3 | `s3-examples` | unscripted; then p5 *"So why convert…"* | Times two is +6 dB, a half is −6 dB, times ten is +20 dB: in a chain, they add. | Example, E1–E3 | pane |
| 4 | `s4-back` | p6 *"To convert back from dB to a gain…"* | Back again: the ratio is ten to the power of the decibels over twenty. | Rearrangements | pane |
| — | the PLAN's flash fires here (p7's `[[ask]]`) | — | (§7a) | — | the activity |
| 5 | `s5-chain` | unscripted; then p9 held | Three stages, ×10, ×0.5 and ×100: 20 − 6 + 40 = 54 dB, the same as 20·log 500. | Example, E4 | pane |

### 4b. Motion, cues and stills

| # | Motion | Movers | Cue | Hold | Reduced motion | Still |
|---|---|---|---|---|---|---|
| 0–5 | none (pins, derivation steps, panes) | 0 | the pinned term or coefficient; the new derivation line; the examples' values | hold | same | one per step |

## 5. Pacing and interaction, by surface and view

As in `D1-040-07-attenuation.md` §5: the presenter paces on the wall (pane, pin and step are mirrored); the learner
paces in Study Mode and Scope. View offers every pane: Symbols, Terms, Proof, Example, Rearrangements, Assumptions.
**Locked**: E4 until the flash quiz is answered (F2).

## 6. The frame

The Equation's frame (the Canvas header and footer; panes as pills, D4.17). Title *Ratios in decibels*.

## 7. Thinking, not watching

- **7a. The PLAN's ASK** (verbatim): *flash (at the Flow's [[ask]]) — "Three stages: ×10, ×0.5 and ×100. What is the
  total gain, in dB?" · options: ≈ 27 dB | ≈ 54 dB | ≈ 66 dB | 500 dB · answer: ≈ 54 dB · explain: 20 dB − 6 dB + 40 dB =
  54 dB, the same as 20·log 500; 27 dB is what the power formula gives for that voltage ratio. · depth: use · practice:
  computational thinking.* It fires **after s4**, at p7, and **s5 answers it**.
- **7b. Prediction point**: none beyond the flash.
- **7c. After**: the explain. In Study, done means the flash was answered.
- **7d. Teacher tip** — **Proposal** (F4): *Expect 66 dB from those who add the half as +6. Ask: is the middle stage a
  gain or a loss?*
- **7e. Explore**: in Study, any V_out and V_in in the Example pane's values; the Rearrangements pane for dB back to a
  ratio.

## 8. Faithfulness (the quality bar)

**Arithmetic** (G_dB = 20·log₁₀ ratio):
- E1: 20 × log 2 = 20 × 0.30103 = **+6.021 dB** (the PLAN's +6.02 ✓). E2: 20 × log 0.5 = **−6.021 dB** ✓. E3: 20 × 1 =
  **+20.00 dB** ✓.
- E4: 20 + (−6.021) + 40 = **53.98 dB**; 20 × log 500 = 20 × 2.69897 = **53.98 dB** ✓ (the answer *≈ 54 dB*).
- The distractors: 10 × log 500 = **26.99 dB** (*≈ 27*: the power formula on a voltage ratio, as the explain says); 20 +
  6 + 40 = **66 dB** (the loss counted as a gain); *500 dB* is the ratio itself.
- The way back: 10^(53.98/20) = 10^2.699 = **500.0**; 10^(54/20) = 10^2.7 = **501.2** (the note's *501*).
- The power form: for P ∝ V² at one resistance, 10·log(V²ratio) = 20·log(V ratio) ✓.

**Section D, Equation rows**
- [x] Symbols match the course: V_in, V_out as cards 3 and 7; G_dB for a gain in dB. Card 7's CMRR is in dB and uses the
  20·log form (§3a of `D1-060-07-cmrr.md`).
- [x] Every example recomputed above, to the figures shown.
- [x] No sliders (no graph).
- [x] n/a: no graph.

**A1–A8**: A1 ✓; A2 n/a (a definition, not a device); A3, A4, A5 n/a; A6 ✓ (the assumption *same resistance* on its
pane); A7 ✓ (card 7's 80 dB = 10,000 uses this form; D1·080's ENOB and D3·020's filter use the same 20·log for voltage);
A8 ✓.

## 9. Faults and non-ideal behaviour

**PLAN FAULT**: none on this card. The common slip (the power formula on a voltage ratio) is the quiz's distractor.

## 10. Accessibility, legibility and print

- Wall (C2): the statement, the four derivation lines and the pane text at the Canvas's wall size. Check at 1920 × 1080
  and 1024 × 768. Signs are written in full (*+6.021*, *−6.021*), with a true minus sign.
- Reduced motion: nothing animates.
- Colour (C4): the ratio and the 20 are labelled as well as coloured.
- Keyboard (C5): the Equation's pane, pin and step keys.
- Print (C8): the Equation's notes (statement, derivation, examples, rearrangement, assumption).

## 11. Assets to make or source

| Asset | Format | Made by | Status |
|---|---|---|---|
| The `equation` block (§3a, §3b) | YAML in `en.md` | the author | to write |

## 12. Bench capabilities this needs

**Equation Bench**: statement, symbols, highlights (a term and a coefficient), derivation, examples, rearrangements,
assumptions, panes and pins mirrored: **all exist**.

**To confirm when written**:
- (a) that the derivation may use symbols the statement does not (`PdB`, `Pout`, `Pin`), as in card 4;
- (b) that `rearrangements` isolates `Vout` through `log10` (10^(GdB/20)·Vin);
- (c) one example hidden until the flash is answered. If that is not possible, the presenter keeps the Example pane on
  E1–E3 until s5, and E4 sits fourth in the list (F2).

## 13. Stand-in for the lecture

None needed.

## 14. Findings for the owner

- **F1 — The PLAN's two equations are one Equation here.** The Equation Bench takes one statement per block, so the power
  form is the derivation's first line and the voltage form is the statement. The derivation then shows where the 20
  comes from. Keep (**recommended**), or two `equation` blocks on the card (two panes the presenter switches between)?
- **F2 — The quiz's answer is the fourth example.** E4 (×500 → 53.98 dB) is the flash quiz's answer. It is hidden until
  the quiz is answered if the Equation allows it (§12 c); otherwise the presenter keeps to E1–E3 until s5.
- **F3 — No graph.** A graph of G_dB against the ratio on a log axis is a straight line, and adds little beside the
  examples. Leave it out (**recommended**), or add it (+0.1 min)?
- **F4 — Proposals**: the Look for (§1), the teacher tip (§7d), and a fifth example, *×0.001 → −60 dB*, which is the size
  of a loss that card 7's CMRR will name (+0.1 min).

## 15. Acceptance: how we know it is built right

- The Equation compiles. The derivation's four steps verify. E1–E4 show +6.021, −6.021, +20.00 and +53.98 dB. The
  Rearrangements pane shows V_out = V_in·10^(G_dB/20), verified, with the note's 501.
- The flash fires after s4, and E4 is shown at s5.
- B1 one pane or pin per step; B5 each `say` in the notes; B6 the pinned ratio and coefficient lit; B10 the explain; B13
  statement and terms only; B16 values readable; B17 the power and voltage forms in one derivation.
- C2 legible at 1920 × 1080 and 1024 × 768; C4 labelled highlights; C5 pane keys; C6 at 320; C8 the notes.
