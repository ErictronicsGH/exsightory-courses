```yaml
id: D1-070-06-max-source-impedance
card: "The maximum source impedance"
module: notes/Day01/070-adc-input/en.md
bench: Equation                   # exists: statement, symbols, highlights, derivation, rearrangements, examples, boundaries, assumptions, graph with compare and markExamples
library: "max-source-impedance: an Equation (R_s = t_acq/(C_s·ln 2^(N+1)) − R_on, derived from the PLAN's t_acq = (R_s + R_on)·C_s·ln(2^(N+1))), defined in the card's `equation` block, graphed against t_acq from 0.2 µs to 5 µs on linear axes as a family for N = 10, 12 and 16, with the three worked values at 1 µs marked"
dimensions: 2D
stand_in: "none for the Equation; the thermistor's 5 kΩ reference line (missing, F7) is read off the y axis in words until it lands"
optional_benches: []
real_thing: "a 12-bit MCU converter's sample-and-hold input (switch on-resistance 1 kΩ, sampling capacitor 10 pF, 1 µs acquisition window) fed by a resistive source, and the source-impedance limits MCU datasheets state (about 10 kΩ, or a formula or table against the sample time)"
minutes: 1.4                      # on the bench: from the [[reveal]] (p2) to the end of the card
card_minutes: 2.3
status: spec-draft
learner_action: numeric
predictions: []                   # the numeric comes before the bench and is answered at s1
seeds: [S35]                      # harvested at s4
key_variable: "N and t_acq: the window must hold ln 2^(N+1) time constants, so more bits shrink the largest source and a longer window grows it"
time_scale: "none (no motion)"
steps: 5                          # s0–s4
```

The Equation's format as read on 2026-10-20 (`C:\ExSightory\src\insight\packages\insight-core\src\registry\equationBlock.ts`;
`packages\canvas\src\benchGraph.ts`; the mirrored view `apps\desktop\src\shared\presentation.ts`, `CanvasView`):
**one `statement` per block**; the graph draws the statement's **left-hand side** against one right-hand symbol, every
other right-hand symbol on a `hold` slider; `scale` x and y take `linear` or `log`; `compare` draws one curve per value
of a held symbol (two to five) and **removes that symbol's slider**; `markExamples` places each example at its own
values, so an example with N = 10 lands on the N = 10 curve; `rearrangements` (`solveFor`) has the compiler solve the
statement for another symbol and check it numerically; `boundaries` are resolved to x ranges **at compile time, from the
held defaults**; examples give right-hand values only, and the Example pane lists them all at once. **Mirrored to the
wall** (`CanvasView`): the pane, the pinned annotation (`focus`), the derivation step and a simulation's transport.
**Not mirrored**: a slider's value, the hover readout and `graph.animate`'s sweep. There is no authored reference line
and no y range on the Equation's graph.

## 1. What the room must understand

- **Statement** (verbatim): *Given the sampling capacitance, the switch resistance, the acquisition time and the
  accuracy you want, you can compute the largest source impedance that still settles.*
- **SHOW** (verbatim from the PLAN): *Equation — t_acq = (R_s + R_on)·C_s·ln(2^(N+1)), solved for R_s and graphed
  against t_acq; worked examples for N = 10 (12.1 kΩ), 12 (10.1 kΩ) and 16 (7.5 kΩ) at 1 µs.*
- **Look for** (verbatim): *more bits want a smaller source, and a longer window allows a larger one.*
- **Status** (verbatim): *ready.*
- **HARVEST** (verbatim): *S35 — "Our thermistor divider from 040: five kilohms. Inside ten. It settles."*
- **Drive**: *none in the PLAN.* The Flow's *"Slide N."* is walked by the `compare` family and the three examples (F2).
- **Bench and library.** The **bench** is the Equation Bench. The **library** is this card's equation,
  `max-source-impedance`.
- **Insight**: *the acquisition window has to hold ln 2^(N+1) time constants, so the largest source a converter can take
  is set by its window, its capacitor, its switch and its resolution: about 10 kΩ for this 12-bit converter at 1 µs,
  less at more bits, more with a longer window.*
- **Kind of knowledge**: *a relation between quantities* (the largest source against the window, for three
  resolutions). Card test → **Equation**. B17 applies (three resolutions on one axis, sharing one x and one y). B15, B18,
  B19 do not.
- **Why this bench, not a still**: the derivation is the Flow's own working (*"Solve for the total resistance … Take away
  the switch's own 1 kΩ"*), stepped line by line with the 12-bit numbers evaluated, not typed; the family shows both
  halves of the Look for at once, the lines lower for more bits and rising with the window; in Study, C_s and R_on are
  one slider away.
- **Key variable**: N and t_acq (the family and the axis).

## 2. Time

The Flow is 187 words, all spoken: **1.44 min** at 130 wpm. p0's `[[ask]]` question (19) comes before the bench.

| Beat | Minutes | Source of the number |
|---|---|---|
| The PLAN's numeric: p0 the question *"[[ask]] For a 12-bit ADC with a 1 µs acquisition window…"* (20) | 0.15 | 19 ÷ 130 |
| The numeric's answer window (a calculation with a logarithm; p1 `[[pause]]`) | 0.75 | estimate (45 s) |
| s0 the window: p2 *"[[reveal]] Let's work it on the Equation Bench…"* (21), p3 the equation line (9) | 0.23 | 30 ÷ 130 |
| s0 the equation read aloud: its 9 tokens are spoken as ≈ 16 words (*"t acq equals R s plus R on…"*) | 0.05 | estimate (+7 words) |
| s1 the limit: p4 *"For 12 bits, ln(2^13) = ln 8192…"* (48) | 0.37 | 48 ÷ 130 |
| s1 held: p5 *"That ten kilohms is no coincidence…"* (40) | 0.31 | 40 ÷ 130 |
| s2 the resolutions: p6 *"Slide N. At 10 bits…"* (21) | 0.16 | 21 ÷ 130 |
| s3 the window: p6 *"More bits ask for a smaller source…"* (15) | 0.12 | 15 ÷ 130 |
| s4 the thermistor: p7 *"And our thermistor divider…"* (14) | 0.11 | 14 ÷ 130 |
| Pane and pin moves not covered by speech (4 × ≈ 1.5 s) | 0.1 | estimate |
| **Card total / of which on the bench** | **2.3 / 1.4** | 2.34 / 1.44 |

The U016 preview showed this card at ≈ 2.2 min; the 0.1 difference is the equation read aloud and the pane moves.

**Module check**: `D1-070-02-charge-in-time.md` §2. (The module runs about 21 of its 45 minutes; reported, not changed.)

## 3. The scene: what is on the bench

### 3a. The equation (`max-source-impedance`)

| Field | Content | Source |
|---|---|---|
| `title` | *The maximum source impedance* | the card |
| `statement` | `Rs = tacq / (Cs * ln(2^(N+1))) - Ron` | the PLAN's *"solved for R_s"* (F1) |
| `caption` | *More bits want a smaller source, and a longer window allows a larger one.* | the PLAN's Look for |
| `symbols` | `Rs` *Largest source impedance that still settles* (Ω), note *the source's own output impedance (D1·040); above it, the capacitor is still short when the switch opens*; `tacq` *Acquisition window* (s); `Cs` *Sampling capacitance* (F); `Ron` *Switch on-resistance* (Ω), note *the switch's own share of the time constant, taken away: 1 kΩ*; `N` *Resolution* (bits) | the PLAN; cards 1–2 |
| `highlights` | term `ln(2^(N+1))` — *time constants needed to settle to ½ LSB after a full-scale step: ln 8192 ≈ 9.0 at 12 bits* (teal); term `tacq / (Cs * ln(2^(N+1)))` — *the largest total resistance the window allows: 11.1 kΩ at 12 bits and 1 µs* (azure) | the Flow's p4; the PLAN's explain |
| `source` | *Single-pole RC settling of a sampling input to ½ LSB, as MCU converter datasheets give it* (unbranded; the datasheets are cited in §8 only) | §8 |
| `derivation` | 1 `2^(-(N+1)) = exp(-tacq / ((Rs + Ron) * Cs))` — *settled to ½ LSB after a full-scale step: what is left of the step, e^(−t/τ), is one part in 2^(N+1) (card 2)* (**Proposal**, F8); 2 `tacq = (Rs + Ron) * Cs * ln(2^(N+1))` — *take logarithms: the window must hold ln 2^(N+1) time constants*; 3 `Rs + Ron = tacq / (Cs * ln(2^(N+1)))` — *solve for the total resistance: 1 µs ÷ 9.0 ÷ 10 pF ≈ 11.1 kΩ at 12 bits*; 4 the statement — *take away the switch's own 1 kΩ: about 10.1 kΩ* | the PLAN's form (step 2) and the Flow's p4 (steps 3, 4) |
| `rearrangements` | `solveFor: tacq` — *the window a given source needs (card 7: 50 kΩ needs 4.6 µs)* (**Proposal**, F8) | card 7's PLAN *"the Equation solved for t_acq"* |
| `examples` | §3b | §8 |
| `boundaries` | `tacq < Ron * Cs * ln(2^(N+1))` — kind `invalid`, label *too short for any source: the switch alone cannot settle*, note *here the formula's R_s is negative: no source settles, however low its impedance* (**Proposal**, F3) | §8 |
| `assumptions` | (1) *The capacitor starts a full-scale step away: at 0 V, with a 3.3 V input* — breaksWhen *the step is smaller: a smaller step settles sooner; a half-scale step (0 V to 1.65 V) needs ln 4096 ≈ 8.3 time constants, not 9.0* — simplifying (F7 of the review, 2026-10-20). (2) *The source is a steady resistance, with nothing else at the pin* — breaksWhen *a capacitor sits at the pin and shares its charge, or the source is an op-amp that must recover from the capacitor's kick (card 8)* — limiting. (3) *R_on and C_s are this course's converter's for every N* — breaksWhen *the converter is a real 10- or 16-bit part: use its own R_on and C_s from its datasheet* — simplifying | F7; card 8; §8 |
| `graph` | against `tacq`, domain [2.0e-7, 5.0e-6] s; `scale` x `linear`, y `linear`; `hold` Cs (2.0e-12–2.0e-11 F, default 1.0e-11), Ron (200–3000 Ω, default 1000), N (10–16, default 12); `compare` N at [10, 12, 16]; `markExamples: true` | the PLAN (F2, F3) |
| `notes` | `include: true` | print |

**Axes.** x: *Acquisition window t_acq (s)*, linear, 0.2 µs to 5 µs, a grid line every 1 µs. y: *Largest source impedance
that still settles R_s (Ω)*, linear, auto-scaled by the bench to the curves: from 0.70 kΩ (16 bits at 0.2 µs) to 64.6 kΩ
(10 bits at 5 µs). On linear axes each resolution is a straight line, R_s rising in proportion to the window and crossing
zero at t₀ = R_on·C_s·ln 2^(N+1) (76, 90 and 118 ns, all left of the axis): *"a longer window allows a larger one"* is
the slope, and *"more bits want a smaller source"* is the order of the three lines (F3).

**The three curves** (`compare`, labelled by the bench `N = 10 bits`, `N = 12 bits`, `N = 16 bits` in the Equation's
series colours, in palette order): one quantity at three resolutions, on one scale.

### 3b. Worked examples (all at t_acq = 1 µs, C_s = 10 pF, R_on = 1 kΩ; each marked on its own curve)

| # | Label | N | R_s (shown, 4 s.f.) | Note |
|---|---|---|---|---|
| E1 | *10 bits* | 10 | 12.12 kΩ | *ln 2048 ≈ 7.6 time constants: the limit rises to about 12.1 kΩ* |
| E2 | *12 bits: the course's converter* | 12 | 10.10 kΩ | *ln 8192 ≈ 9.0 time constants: 11.1 kΩ in total, less the switch's 1 kΩ* |
| E3 | *16 bits* | 16 | 7.486 kΩ | *ln 131 072 ≈ 11.8 time constants: the limit falls to about 7.5 kΩ* |

The bench shows four significant figures (`formatQuantity`); the PLAN and the Flow say 12.1, 10.1 and 7.5 kΩ, the same
values rounded (§8).

**Values beside their element**: the Symbols pane with values and units; the Example pane with R_s and each note; on the
graph the three example dots, stacked at 1 µs, each labelled with its example's label.

**Colours and their second channel** (C4): each curve labelled with its N by the bench (the label is the second
channel); the example dots in the bench's example amber, each labelled; the two highlighted terms each with its words in
the Terms pane; the boundary (F3) with its label on the line.

## 4. The run: step by step, as the Flow goes

### 4a. Steps

| # | id | Flow paragraph | What changes (`say`) | Pane | Presenter's control |
|---|---|---|---|---|---|
| — | the PLAN's numeric fires before the bench (p0 `[[ask]]`, p1 `[[pause]]`) | — | (§7a) | — | the activity |
| 0 | `s0-window` | p2 *"[[reveal]] Let's work it on the Equation Bench…"*, p3 *"t_acq = (R_s + R_on) × C_s × ln(2^(N+1))"* | The window has to hold enough time constants for a full-scale step to settle to half an LSB: ln 2^(N+1) of them. | Proof, steps 1 → 2; `ln(2^(N+1))` pinned | step, pin |
| 1 | `s1-ten-k` | p4 *"For 12 bits, ln(2^13) = ln 8192…"*; p5 *"That ten kilohms is no coincidence…"* held | At 12 bits, ln 8192 ≈ 9.0: 1 µs holds 9.0 time constants of 11.1 kΩ × 10 pF; less the switch's 1 kΩ, the source can be at most about 10.1 kΩ. | Proof, steps 3 → 4; the total term pinned, then `Ron` | step, pin |
| 2 | `s2-bits` | p6 *"Slide N. At 10 bits the limit rises…"* | The same window: 12.1 kΩ at 10 bits, 10.1 kΩ at 12, 7.5 kΩ at 16. | Example, E1–E3 | pane |
| 3 | `s3-window` | p6 *"More bits ask for a smaller source…"* | Each resolution is a straight line: more bits sit lower, and a longer window allows a larger source. | Graph, the family with E1–E3 marked | pane |
| 4 | `s4-thermistor` | p7 *"And our thermistor divider from the impedance module…"* | The thermistor divider's 5 kΩ sits well under the 12-bit line at 1 µs: it settles. | Graph held (the 5 kΩ line when it exists, F7) | — (held) |

s1 answers the numeric (the PLAN's reveal: *"the Equation below, solved for R_s"*). Suggested words for s4 if the
reference line is not there yet (B20, on the strip): *"Find 5 kΩ on the left-hand scale: half of our 12-bit limit at
1 µs."*

### 4b. Motion, cues and stills

| # | Motion | Movers | Cue | Hold | Reduced motion (C3) | Still |
|---|---|---|---|---|---|---|
| 0–1 | none (derivation steps and pins) | 0 | the new derivation line and the pinned term lit in the statement | hold | same | one per derivation step (four) |
| 2 | none (pane) | 0 | the three examples listed, E2 named the course's converter | hold | same | the Example pane |
| 3–4 | none (pane) | 0 | the three labelled lines and the three dots stacked at 1 µs | hold | same | the graph (and with the 5 kΩ line, F7) |

No simulation and no `graph.animate`: N is a family, not a sweep (F2), and neither a slider's value nor `animate` reaches
the wall.

## 5. Pacing and interaction, by surface and view

**Who paces** (B12): the presenter on the wall (pane, pin and derivation step are mirrored); the learner in Study Mode
and Scope.

| View | Who | Controls |
|---|---|---|
| Preview (in the slide) | everyone | the statement and the current pane |
| View (details) | everyone | every pane: Symbols, Terms, Proof, Example, Graph, Assumptions, Boundaries; the graph's held sliders C_s (2–20 pF, default 10 pF) and R_on (0.2–3 kΩ, default 1 kΩ), side by side on one row, each with its label above in words and the symbol in parentheses (*Sampling capacitance (C_s)*, *Switch on-resistance (R_on)*), the value at the label's right; N has no slider (it is the family); the hover readout |
| Edit (session only) | everyone | not specified for the Equation Bench (its sliders already vary the values) |
| Authoring | authors | the `equation` block's YAML |

- **The presenter's strip** (B20): the pane, pin and step controls; the next step's `say`; s4's suggested words; the
  teacher tip.
- **Study / Scope**: C_s and R_on free on the graph (§7e); the three resolutions stay drawn.
- **Phone** (C6): the statement (a fraction; check that it wraps at 320 rather than shrinks), then the pane, then the
  two sliders one per line; the three curve labels and the three stacked dot labels must not collide at 320 (check;
  else the Example pane carries the values).
- **Locked**: the bench is not shown until the numeric closes (the PLAN's reveal is the Equation), so nothing needs
  locking.

## 6. The frame

The Equation's frame (the Canvas header and footer; panes as pills, D4.17). Title *The maximum source impedance*. No
inset, no graph band beyond the Graph pane's own.

## 7. Thinking, not watching

- **7a. The PLAN's ASK** (verbatim): *numeric (at the Flow's [[ask]]) — "12 bits, C_s = 10 pF, R_on = 1 kΩ, a 1 µs
  window, settling to ½ LSB after a full-scale step. What is the largest source impedance?" · answer: 10.1 kΩ ± 0.3 kΩ ·
  reveal: the Equation below, solved for R_s. · explain: ½ LSB of 12 bits is one part in 8,192, which takes ln 8192 ≈
  9.0 time constants; 1 µs ÷ 9.0 ÷ 10 pF is 11.1 kΩ in total, less the switch's 1 kΩ. · depth: use · practice:
  computational thinking.* It fires **before s0** (the Flow's p0), and **s1 answers it**.
- **7b. Prediction point**: none beyond the numeric.
- **7c. After**: the explain. In Study, done means the numeric was answered and the Graph pane opened.
- **7d. Teacher tip** — **Proposal** (F8): *Two answers to expect: 11.1 kΩ (the switch's 1 kΩ forgotten) and about
  11.0 kΩ (ln 4096, a half-scale step). Both are outside the tolerance. Ask: what else is in series with the source? And
  how far does the capacitor have to go in the worst case? Then: the thermistor divider's impedance is 10 kΩ in parallel
  with the NTC, so however cold it gets it never passes 10 kΩ, and at 12 bits and 1 µs it always settles.*
- **7e. Explore** (B11): in Study, C_s from 2 to 20 pF and R_on from 0.2 to 3 kΩ. *Halve the window, or double C_s: the
  12-bit limit is 4.55 kΩ either way* (card 4's 0.5 µs; only t_acq/C_s enters the first term). *At 4.6 µs the 12-bit
  line reads 50.0 kΩ*: card 7's divider.

## 8. Faithfulness (the quality bar)

**Arithmetic** (R_s = t_acq/(C_s·ln 2^(N+1)) − R_on; C_s = 10 pF, R_on = 1 kΩ; recomputed in Node):
- ln 2^(N+1): N = 10, ln 2048 = **7.6246**; N = 12, ln 8192 = **9.0109**; N = 16, ln 131 072 = **11.7835**.
- E2: 1 µs ÷ 9.0109 ÷ 10 pF = **11.098 kΩ** total; − 1 kΩ = **10.098 kΩ**, shown 10.10 kΩ (the PLAN's and the Flow's
  10.1 kΩ ✓; the Flow's *"about 11.1 kΩ"* total ✓; with the Flow's rounded 9.0: 11.11 − 1 = 10.11 kΩ ✓).
- E1: 1 µs ÷ 7.6246 ÷ 10 pF = 13.115 kΩ; − 1 kΩ = **12.115 kΩ**, shown 12.12 kΩ (the PLAN's 12.1 kΩ, the Flow's *"about
  12.1 kΩ"* ✓).
- E3: 1 µs ÷ 11.7835 ÷ 10 pF = 8.486 kΩ; − 1 kΩ = **7.486 kΩ**, shown 7.486 kΩ (the PLAN's 7.5 kΩ, the Flow's *"about
  7.5 kΩ"* ✓).
- **The numeric's tolerance**, 10.1 ± 0.3 kΩ (9.8–10.4 kΩ, ± 3.0 %): it accepts 10.10 (exact), 10.11 (9.0 τ) and 9.99
  (13 × 0.7 = 9.1 τ); it rejects 11.10 kΩ (R_on forgotten) and 11.02 kΩ (a half-scale step, ln 4096 = 8.318) ✓.
- **The zero crossings** t₀ = R_on·C_s·ln 2^(N+1): **76.2 ns** (10 bits), **90.1 ns** (12), **117.8 ns** (16). Below t₀
  the formula's R_s is negative. At 0.1 µs (the centrepiece's slider start) the 16-bit line is **−151 Ω**; at 0.2 µs, the
  axis start chosen here, the three lines read **1.623 kΩ, 1.220 kΩ and 0.697 kΩ**, all positive (F3). In Study the
  crossing moves right: at R_on = 3 kΩ, C_s = 20 pF and 16 bits it is **707 ns**, inside the axis (the boundary and
  assumption 1's limits, F3).
- **The axis's top**: at 5 µs, **64.58 kΩ** (10 bits), **54.49 kΩ** (12), **41.43 kΩ** (16).
- **Card 7 on this line**: at 4.6 µs the 12-bit limit is **50.05 kΩ**, and the rearrangement gives 51 kΩ × 10 pF × 9.0109
  = **4.596 µs** for card 7's 50 kΩ source (its *"about 4.6 µs"* ✓).
- **Card 4 on this line**: at 0.5 µs the 12-bit limit is **4.549 kΩ**: card 4's 10 kΩ source is over it (its 22 LSB
  short ✓ in kind). §7e's 20 pF at 1 µs gives the same 4.549 kΩ.
- **Card 2 on this line**: 10 kΩ at 1 µs is under 10.10 kΩ, only just: 1 µs ÷ 110 ns = 9.09 τ against 9.01 needed; the
  full-scale shortfall is 4096·e^(−9.09) = **0.46 LSB** (card 2's *"Only just"*, read on the full-scale ghost ✓).
- **The thermistor (S35)**: D1·040 card 4's divider (a 10 k NTC under a 10 kΩ resistor on 3.3 V) is **1.65 V behind 5 kΩ
  at 25 °C** (10 k ∥ 10 k; its numeric's answer, 5 kΩ ± 0.1 kΩ) ✓. τ = (5 + 1) kΩ × 10 pF = **60 ns**; 1 µs holds
  **16.7 τ** against the 9.01 needed, leaving 4096·e^(−16.67) = **0.00024 LSB** of a full-scale step: it settles, by a
  wide margin ✓. 5 kΩ is under all three limits at 1 µs, 7.486 kΩ included. As the NTC cools its resistance rises, but
  the divider's impedance is R_NTC ∥ 10 kΩ, which never reaches 10 kΩ, so at 12 bits and 1 µs it settles at every
  temperature (§7d).
- **The step size (ACCURACY F7, decided 2026-10-20)**: the ½-LSB rule, ln 2^(N+1), is for a **full-scale** step. A
  half-scale step (0 V to 1.65 V) needs ln 4096 = **8.318 τ**, and its limit at 12 bits and 1 µs is **11.02 kΩ**. The full
  scale is the worst case on a 0–3.3 V input, so the card's 10.1 kΩ is safe for every step; assumption 1 says which case
  the bench computes (F5).
- **The datasheets** (p5; cited here only, never on a teaching surface; section numbers to check against the current
  revisions before publishing, A7): the 8-bit AVR family's datasheets (e.g. ATmega328P, *Analog Input Circuitry*) say
  the ADC *"is optimized for analog signals with an output impedance of approximately 10 kΩ or less"*; Microchip's PIC16
  and PIC18 datasheets (*A/D Acquisition Requirements*) give *the maximum recommended impedance for analog sources* as
  10 kΩ, beside an acquisition-time equation; ST's STM32F1 datasheets give a formula for R_AIN,max against the sample time
  (with ln 2^(N+2), a ¼-LSB margin) and a table of it; TI's MSP430 family user's guides (*Sample Timing Considerations*,
  ADC10 and ADC12) give t_sample > (R_S + R_I)·ln(2^(N+1))·C_I, the card's formula. So *"several MCU datasheets recommend
  … about 10 kΩ or less"* ✓ and *"some give a formula or a table against the sample time"* ✓. *"That ten kilohms is no
  coincidence … for exactly this reason"*: the datasheets' limits come from the same sample-and-hold settling, with their
  own R, C and window ✓ (A6: not an over-claim).
- **Slider ranges** (sources for A1): C_s 2–20 pF is the centrepiece's (card 2) range; MCU sampling capacitors run from a
  few pF to about 14 pF (AVR, 14 pF; STM32F1, 8 pF), with some parts higher (MSP430 ADC10 27 pF, ADC12 40 pF). R_on 0.2–3
  kΩ covers MCU switch resistances from a few hundred ohms to about 2 kΩ (STM32F1 R_ADC ≤ 1 kΩ; MSP430 ADC10 R_I ≤ 2 kΩ).

**Section D, Equation rows**
- [x] Symbols match the course: R_s, R_on, C_s and t_acq as the centrepiece's sliders (card 2); N as D1·080; units
  carried through every derivation line (s = Ω·F).
- [x] Every example recomputed above, to the four figures the bench shows.
- [x] Slider ranges real (above); N's three values are real converter resolutions.
- [x] The graph obeys the Plot rows: straight lines on linear axes are the law's true shape (R_s is linear in t_acq); the
  three resolutions on one scale; one worked value per curve at 1 µs; the negative region kept off the default axis and
  named where it can appear.

**A1–A8**: A1 ✓ (§8; sources cited); A2 ✓ (the switch's own resistance is subtracted, the step size and the pin's other
loads are named in the assumptions); A3 n/a (no object drawn); A4 n/a; A5 n/a (no motion); A6 ✓ (the three assumptions on
their pane, assumption 1 the full-scale step); A7 ✓ (cards 2, 4 and 7 and D1·040's 5 kΩ land on these lines; F5 and F6
are the two places where the Flow's words could be read otherwise); A8 ✓.

## 9. Faults and non-ideal behaviour

**PLAN FAULT**: *none on this card.* The non-ideal effects named on the bench: the switch's own resistance (R_on,
subtracted at step 4), the step size (assumption 1), and what else at the pin changes the picture (assumption 2: a
capacitor sharing charge; an op-amp that must recover, card 8's FAULT). The 16-bit line shows that a converter's datasheet
limit belongs to that converter (assumption 3).

## 10. Accessibility, legibility and print

- Wall (C2): the statement, the four derivation lines and the pane text at the Canvas's wall size; the axis labels, the
  three curve labels and the three example labels at the floor. **The three dots sit at 1 µs only 2.0 kΩ and 2.6 kΩ
  apart** on a y axis of about 65 kΩ (≈ 3–4 % of the graph's height each): check at 1920 × 1080 and 1024 × 768 that their
  labels do not collide; if they do, keep the labels short (*10 bits*, *12 bits*, *16 bits*) and let the Example pane
  (s2) carry the values (F3's alternative range also eases it).
- Reduced motion: nothing animates.
- Colour (C4): curves labelled with N; dots labelled; highlights with their words; checked under the three colour-blindness
  simulations.
- Keyboard (C5): the Equation's pane, pin and step keys.
- Print (C8): the Equation's notes (statement, derivation, examples with notes, assumptions, boundary, the graph as a
  still).
- Languages: every label, note, caption and assumption as `{en, fr}`; French drafts are ours, marked for the owner's
  review; numbers and units are not translated.

## 11. Assets to make or source

| Asset | Format | Made by | Status |
|---|---|---|---|
| The `equation` block (§3a, §3b), EN and FR | YAML in `en.md` | the author | to write |
| The thermistor's 5 kΩ reference line (F7) | a bench capability, then one line in the block | ExSight's Benches lane, by crossing | missing (request it) |

## 12. Bench capabilities this needs

**Equation Bench**: statement, symbols with notes, highlights (terms), derivation, rearrangements (`solveFor`, verified
by the compiler; `isolate` handles `ln`, `exp` and `^`), examples, boundaries, assumptions, caption, graph on linear axes
with `hold`, `compare` and `markExamples`, panes, pins and derivation steps mirrored: **all exist**. Confirmed in the code
(2026-10-20): `markExamples` places each dot from its example's own values, so E1–E3 land on their own N's curve; the
compared symbol's slider is removed; the Example pane lists every example.

**To confirm when written**:
- (a) that derivation step 1 (`2^(-(N+1)) = exp(...)`, a unary minus inside an exponent) prints cleanly on the wall;
- (b) the three stacked example labels at 1 µs (§10);
- (c) that the boundary (F3) is resolved from the held defaults only (it is, in `analyse`): at the defaults its region
  (t < 90 ns) is off the axis, so it shows in the Boundaries pane as a sentence, and is shaded only if the bench
  re-evaluates it as C_s and R_on move in Study;
- (d) that the Equation's sliders can sit side by side on one row with their labels above (the owner's rule,
  2026-10-20), or that the bench's own slider layout already does so.

**Missing (request it)**: **an authored reference line on an Equation graph** (a level on y or a position on x, labelled:
here *thermistor divider, 5 kΩ*). The plot underneath already draws y-level markers for derived asymptotes
(`benchGraph.ts`, `derivedMarkers`); the Equation block has no field to author one. No X id yet; it would go to Benches by
crossing (F7). Until then, s4 reads 5 kΩ off the y axis in words.

**Would help**: **X15** (a `compare` family revealed or emphasised one curve per step), so s3 could open on the 12-bit
line alone and add 10 and 16 bits, as the U016 preview did (F4).

**Not this bench's**: the settling curve itself and the ½-LSB zoom (the centrepiece Plot, card 2); the sample-and-hold in
the pin (Draw, card 1; Electronics, X1).

## 13. Stand-in for the lecture

None needed for the Equation: every field it uses exists. The thermistor's reference line (F7) is the one thing the day
may lack; the presenter reads 5 kΩ off the y axis, half the 12-bit line's height at 1 µs, with s4's suggested words.

## 14. Findings for the owner

- **F1 — The statement is written solved for R_s; the PLAN's form is derivation step 2.** The Equation draws and
  evaluates its left-hand side, so for R_s to be *"graphed against t_acq"* and the examples to give 12.1, 10.1 and 7.5
  kΩ, the statement is `Rs = tacq / (Cs * ln(2^(N+1))) - Ron`. The PLAN's `t_acq = (R_s + R_on)·C_s·ln(2^(N+1))`, the
  Flow's p3 line, is derivation step 2, and steps 3 and 4 are the Flow's p4 (*"Solve for the total resistance … Take away
  the switch's own 1 kΩ"*). Keep (**recommended**), or the statement in t_acq form (then the graph draws t_acq against
  R_s and the examples evaluate windows, not the PLAN's resistances)?
- **F2 — "Slide N" is a family of three, not a slider.** A slider's value is not mirrored to the wall, and neither is
  `graph.animate`; N would also slide through 12.5 bits. So N is `compare` at [10, 12, 16]: three labelled lines, with the
  PLAN's three worked values marked at 1 µs (s2 the values, s3 the lines). Keep (**recommended**), or a held N slider
  (Study only; the wall sees nothing move)?
- **F3 — The graph: linear axes, t_acq from 0.2 µs to 5 µs; and a Proposal, the boundary.** Linear because the law is
  linear in t_acq and *"a longer window allows a larger one"* is then a slope. From 0.2 µs because below t₀ = R_on·C_s·ln
  2^(N+1) (76, 90, 118 ns) the formula gives a negative R_s, and at the centrepiece's 0.1 µs the 16-bit line is already
  −151 Ω; to 5 µs to match the centrepiece's window slider and hold card 7's 4.6 µs, 50 kΩ point. **Proposal**: the
  boundary *"too short for any source: the switch alone cannot settle"* (`tacq < Ron * Cs * ln(2^(N+1))`), which names the
  negative region in the Boundaries pane and wherever Study's sliders bring it on the axis (707 ns at 3 kΩ, 20 pF, 16
  bits). Options: (a) 0.2–5 µs with the boundary (**recommended**); (b) 0.2–2 µs (the y axis to about 25 kΩ, more room
  between the three dots, card 7's point off the axis); (c) 0.2–5 µs without the boundary.
- **F4 — Where the graph opens.** This spec opens the Proof at p2 and keeps it through p5 (the Flow works the derivation
  aloud), then the Example pane at p6 and the Graph at its last sentence. The U016 preview the owner saw drew the 12-bit
  line at p2–p3 and added 10 and 16 bits at p6; on the Equation Bench `compare` draws all three at once, so opening the
  Graph at s0 would show the 10- and 16-bit lines before the Flow reaches them. Keep the Proof first (**recommended**;
  with X15 the 12-bit line could open alone), or the Graph from s0 with all three lines?
- **F5 — accuracy: p2 says "half an LSB" without "a full-scale step".** p2 reads *"The window has to hold enough time
  constants to settle to half an LSB:"*. The ASK on screen says *"after a full-scale step"*, and ln 2^(N+1) is the
  full-scale case (ACCURACY F7, decided 2026-10-20); a half-scale step needs ln 4096 = 8.318 τ, and its 12-bit limit at
  1 µs is 11.02 kΩ, not 10.10. The spoken line does not state the case it computes, and card 2's centrepiece runs a
  half-scale step. The 10.1 kΩ is safe (the full scale is the worst case on a 0–3.3 V input), so nothing the room is told
  to build is wrong, but the rule is heard without its condition. Options: (a) p2 becomes *"…to settle to half an LSB
  after a full-scale step:"* (+4 words, +0.03 min) (**recommended**, as the ASK already says it); (b) leave p2, and let
  assumption 1 and the on-screen ASK carry it.
- **F6 — accuracy: p0's "this acquisition window" was last 0.5 µs.** p0 asks *"For a 12-bit ADC with this acquisition
  window, what is the largest source impedance that still settles in time?"*. The window the room last saw on the
  centrepiece was card 4's 0.5 µs (*"I halve it to 0.5 µs"*); card 5 does not reset it. At 0.5 µs the answer is 4.55 kΩ,
  outside the tolerance. The numeric's text on screen states *"a 1 µs window"*, so a learner who reads it answers right.
  Options: (a) p0 says *"with a 1 µs acquisition window"* (+1 word) (**recommended**); (b) leave, the on-screen question
  being the one answered; (c) the presenter sets the centrepiece back to 1 µs before the card (a stage direction, no
  words).
- **F7 — The thermistor's 5 kΩ line is missing on the Equation Bench.** The U016 preview drew a dashed line at 5 kΩ for
  S35 (*"inside the limit"*); the Equation has no authored reference line (§12). Request it of Benches by crossing, the
  presenter reading 5 kΩ off the y axis until it lands (**recommended**), or words only for good?
- **F8 — Proposals**: derivation step 1, the ½-LSB condition after a full-scale step (it states the case F5 is about, on
  the bench); the rearrangement `solveFor: tacq` (one block serves card 7's *"the Equation solved for t_acq"*, compiled
  and checked rather than typed); the teacher tip (§7d, which also says why the thermistor settles at any temperature);
  the explore prompts (§7e). +0 min each. Take, or leave?

**Decided 2026-10-20** (owner, in the course's chat; ACCURACY D1·070-F9, F10): **F5 (a)** p2 now reads *"…The window has to hold enough time constants to settle to half an LSB after a full-scale step:"* (+4 words); **F6 (a)** p0 now reads *"For a 12-bit ADC with a 1 µs acquisition window, what is the largest source impedance that still settles in time?"* (+1 word). The card gains ≈ 0.04 min. The other findings and proposals here are open for the owner; none blocks.

## 15. Acceptance: how we know it is built right

- The Equation compiles with the fields of §3a with no warning; the derivation's last line is the statement; the
  rearrangement for t_acq compiles and reads `tacq = (Rs + Ron) * Cs * ln(2^(N+1))` or its equivalent. E1–E3 show 12.12,
  10.10 and 7.486 kΩ. The graph runs 0.2–5 µs on linear axes with three straight, labelled lines, the 12-bit line passing
  10.10 kΩ at 1 µs and 50.05 kΩ at 4.6 µs, and E1–E3 each on its own line.
- The numeric fires before s0 and s1 answers it; the presenter's pane, pin and step changes reach the wall.
- B1 one pane, pin or step per beat; B5 each `say` in the notes; B6 the derivation line and the pinned term lit together;
  B10 the explain; B11 C_s and R_on in Study; B13 statements and terms only; B16 values readable; B17 three resolutions on
  one scale; B20 s4's suggested words on the strip.
- C2 legible at 1920 × 1080 and 1024 × 768, the three stacked labels included; C4 lines and dots labelled; C5 pane, pin
  and step keys; C6 at 320; C8 the notes.
- **Six gates (this spec)**: (1) realism: the converter's values are the course's model, R_on and C_s ranges sourced (§8),
  nothing branded on the bench ✓; (2) science: single-pole RC settling, the full-scale case stated (assumption 1) and the
  pin's other loads named ✓; (3) maths: every number recomputed in Node to the figures shown (§8) ✓; (4) visualization:
  three resolutions on one linear scale, the law's true shape, the negative region off the default axis and named ✓;
  (5) consistency: cards 2, 4 and 7 and D1·040's 5 kΩ land on these lines; two places in the Flow raised as accuracy
  findings (F5, F6), not changed ✓; (6) design: the label crowding at 1 µs is named with its check and fallback (§10).
