```yaml
id: D1-060-09-bias-current
card: "Bias current makes another offset"
module: notes/Day01/060-conditioning/en.md
bench: Equation                   # exists: statement, symbols, derivation, examples, boundaries, graph with log x and y, simulate
library: "bias-error: an Equation (V_o = G·I_b·R_s, derived from V_e = I_b·R_s at the input), defined in the card's `equation` block, graphed against R_s from 100 Ω to 1 MΩ on log axes"
dimensions: 2D
stand_in: none
optional_benches: [Electronics]   # the PLAN's on-circuit version: the in-amp part with I_b (Electronics in development)
real_thing: "a bipolar-input instrumentation amplifier (input bias current ≈ 10 nA) at G = 500, behind a source resistance from 100 Ω to 1 MΩ"
minutes: 2.0                      # on the bench: the Equation is up for the whole card
card_minutes: 2.0
status: spec-draft
learner_action: none
predictions: []                   # F5 proposes one before s2
seeds: []
key_variable: "R_s: the resistance in front of the input turns the bias current into an offset"
time_scale: "none (the 1 k → 100 k ramp is a presenter's demonstration, not a timed process)"
steps: 4                          # s0–s3
```

The Equation's format is as in `D1-060-04-negative-feedback.md` (read 2026-10-13).

## 1. What the room must understand

- **Statement** (verbatim): *Input bias current flowing through the source's resistance is a voltage at the input, and
  it is amplified just like the offset.*
- **SHOW** (verbatim from the PLAN): *Equation — V_err = I_b·R_s at the input and G·I_b·R_s at the output, graphed
  against R_s from 100 Ω to 1 MΩ with I_b = 10 nA (a bipolar-input part, as an example) and G = 500.*
- **Drive** (verbatim): *R_s 1 kΩ → 100 kΩ.*
- **Look for** (verbatim): *the output moving from 5 mV to 0.5 V with no change in the signal.*
- **Status** (verbatim): *ready · the on-circuit version needs Electronics: in-amp with I_b.*
- **Bench and library.** The **bench** is the Equation Bench. The **library** is this card's equation, `bias-error`.
- **Insight**: *the amplifier's input current, through whatever resistance is in front of it, makes an offset of its
  own; it grows with the source's resistance, so it changes when the sensor changes.*
- **Kind of knowledge**: *a relation between quantities* (the output error against R_s). Card test → **Equation**. B15,
  B17, B18 and B19 do not apply (B17 applies if F3's family is taken).
- **Why this bench, not a still**: the ramp shows the output error climbing a hundredfold while nothing in the signal
  changes. The log axes show the error's straight-line growth across four decades of source, up to where it fills the
  converter.
- **Key variable**: R_s.

## 2. Time

The Flow is 248 words, all spoken: **1.91 min**.

| Beat | Minutes | Source of the number |
|---|---|---|
| s0 the bias current: p0 *"There is a second input error…"* (11), p1 *"Real amplifier inputs draw a small current…"* (54) | 0.50 | 65 ÷ 130 |
| s1 at 1 kΩ: p2 *"[[demo]] On the Equation Bench: 10 nA of bias current…"* to *"…5 mV at the output."* (40) | 0.31 | 40 ÷ 130 |
| s2 to 100 kΩ: p2 *"Now I take the source to 100 kΩ…"* (30), and the 8 s ramp | 0.36 | 30 ÷ 130 + 8 s |
| s3 small and equal: p3 *"That is one more reason the source impedance…"* (63) | 0.48 | 63 ÷ 130 |
| s3 held: p4 *"[[transition]] The signal is now big enough…"* (50) | 0.38 | 50 ÷ 130 |
| **Card total / of which on the bench** | **2.0 / 2.0** | +0.2 with F5 |

**Module check**: `D1-060-02-what-conditioning-does.md` §2.

## 3. The scene: what is on the bench

### 3a. The equation (`bias-error`)

| Field | Content | Source |
|---|---|---|
| `title` | *Bias current makes another offset* | the card |
| `statement` | `Vo = G * Ib * Rs` | the PLAN's G·I_b·R_s (F1 on the symbol) |
| `symbols` | `Vo` *Error at the output* (V); `G` *Gain* (V/V); `Ib` *Input bias current* (A); `Rs` *Source resistance in front of the input* (Ω); for the derivation `Ve` *Error at the input* (V) | the PLAN |
| `highlights` | term `Ib * Rs` — *the bias current through the source: a voltage at the input* (teal); symbol `Rs` — *the sensor's own resistance: change the sensor, change the offset* (amber) | the Flow's p1, p3 |
| `derivation` | 1 `Ve = Ib * Rs` — *the input draws I_b, and it flows through R_s: a voltage, in series with the signal*; 2 `Vo = G * Ve` — *amplified like the signal, and like card 8's offset*; 3 the statement | the PLAN's two forms |
| `examples` | §3b | §8 |
| `boundaries` | `Vo < 0.033` — *under 1 % of the 3.3 V range* (valid) (**Proposal**, F4) | card 8's range |
| `assumptions` | *the output is linear* — breaksWhen *G·I_b·R_s passes the rail: at 1 MΩ the formula says 5 V, a 3.3 V system's output stops at its rail* — limiting; *only one input sees R_s* — breaksWhen *both inputs see equal resistance: their bias currents make nearly equal voltages, which the in-amp rejects, leaving only the input offset current (often a tenth of I_b) times R_s* — simplifying | the graph's top end; the Flow's p3 |
| `graph` | against `Rs`, domain [100, 1.0e6] Ω; `scale` x `log`, y `log`; `hold` G (1–1000, default 500), Ib (1.0e-12–1.0e-7 A, default 1.0e-8); `markExamples: true` | the PLAN |
| `simulate` | drive `Rs`, waveform `ramp`, from 1 kΩ to 100 kΩ over `seconds: 8`, `autoplay: false`, note *nothing changes in the signal, only the resistance in front of it* | the PLAN's Drive |
| `notes` | `include: true` | print |

The y axis runs 100 nV – 10 V (log), labelled *Error at the output V_o*, low enough for F3's CMOS curve (0.5 µV at 100 Ω). The x axis runs 100 Ω to 1 MΩ with a grid line
every decade.

### 3b. Worked examples (at G = 500, each marked on the curve)

| # | Label | I_b | R_s | V_o | Note |
|---|---|---|---|---|---|
| E1 | *1 kΩ source* | 10 nA | 1 kΩ | 5.000 mV | *10 µV at the input* |
| E2 | *100 kΩ source* | 10 nA | 100 kΩ | 0.5000 V | *1 mV at the input: 15 % of a 3.3 V range* |
| E3 | *1 MΩ source* | 10 nA | 1 MΩ | 5.000 V | *more than the 3.3 V rail: the real output stops there* |
| E4 | *A CMOS input, 100 kΩ* | 10 pA | 100 kΩ | 0.5000 mV | *picoamps: a thousand times less* (**Proposal**, F3) |

**Values beside their element**: the Symbols pane with values and units; the Example pane with V_o and its note; the
simulation's live readout shows R_s and V_o; the boundary labelled on its line.

**Colours and their second channel** (C4): one curve (two with F3, each labelled at its end); the highlighted term and
symbol each with its words in the Terms pane; the boundary shaded with its label.

## 4. The run: step by step, as the Flow goes

### 4a. Steps

| # | id | Flow paragraph | What changes (`say`) | Pane | Presenter's control |
|---|---|---|---|---|---|
| 0 | `s0-bias` | p0 *"There is a second input error…"*, p1 | The input draws a tiny current; through the source's resistance, it is a voltage in series with the signal. | Proof, steps 1–3; `Ib * Rs` pinned | step, pin |
| 1 | `s1-1k` | p2 *"[[demo]] On the Equation Bench…"* to *"…5 mV at the output."* | 10 nA through 1 kΩ: 10 µV at the input, 5 mV at the output. | Graph, E1 | pane |
| 2 | `s2-100k` | p2 *"Now I take the source to 100 kΩ…"* | The same 10 nA through 100 kΩ: 1 mV at the input, half a volt at the output. Nothing changed in the signal. | Graph, the simulation played, E2 | play |
| 3 | `s3-small-equal` | p3 *"That is one more reason…"*, then p4 held | A high-impedance source makes its own offset, and it changes with the sensor: choose low bias current, or keep each input's resistance small and equal. | Assumptions; the graph held | pane |

### 4b. Motion, cues and stills

| # | Motion | Movers | Cue | Hold | Reduced motion (C3) | Still |
|---|---|---|---|---|---|---|
| 0–1 | none (derivation steps, pin, pane) | 0 | the new derivation line; the pinned term; E1's dot | hold | same | one each |
| 2 | the simulation: a marker travels the curve as R_s ramps 1 k → 100 kΩ in 8 s, the readout counting up from 5 mV to 0.5 V; it stops at the end | 1 | the marker on the curve and its readout together | hold at the end | the end state (100 kΩ, 0.5000 V) | the curve with E1 and E2 |
| 3 | none | 0 | the second assumption lit | hold | same | the graph with E1–E3 and the boundary |

On the log x axis, a linear ramp crosses 1–10 kΩ in under a second and spends most of its 8 s between 10 kΩ and 100
kΩ (as on D1·040 card 6; X19 would even it out).

## 5. Pacing and interaction, by surface and view

**Who paces** (B12): the presenter on the wall (pane, pin, derivation step and the simulation's play are mirrored); the
learner in Study Mode and Scope.

| View | Who | Controls |
|---|---|---|
| Preview (in the slide) | everyone | the statement and the current pane |
| View (details) | everyone | every pane; the graph's held sliders G and I_b; the simulation's play and pause; the hover readout |
| Edit (session only) | everyone | not specified for the Equation Bench |
| Authoring | authors | the `equation` block's YAML |

- **The presenter's strip** (B20): the pane, pin, step and play controls; the next step's `say`; the teacher tip.
- **Study / Scope**: G and I_b free on the graph (§7e).
- **Phone** (C6): the statement, then the pane, then the controls.
- **Locked**: none (no ASK on this card).

## 6. The frame

The Equation's frame (the Canvas header and footer; panes as pills, D4.17). Title *Bias current makes another offset*.

## 7. Thinking, not watching

- **7a. The PLAN's ASK**: *none on this card.*
- **7b. Prediction point** — **Proposal** (F5): before s2, ask aloud *"A hundred times the resistance: what happens to
  the 5 mV?"*, the room calling it out; s2 answers it (0.5 V). +0.2 min.
- **7c. After**: the transition to D1·070. In Study, done means the graph was opened and R_s was swept once.
- **7d. Teacher tip** — **Proposal** (F5): *Expect "the offset is the amplifier's". Ask: swap the 1 kΩ sensor for a 100
  kΩ one; did the amplifier change?*
- **7e. Explore** (B11): in Study, I_b from 1 pA to 100 nA and G from 1 to 1000. *Find the largest R_s that keeps V_o
  under 1 % of 3.3 V with a 10 nA part at G = 500* (6.6 kΩ).

## 8. Faithfulness (the quality bar)

**Arithmetic** (V_e = I_b·R_s; V_o = G·V_e):
- E1: 10 nA × 1 kΩ = **10.00 µV**; × 500 = **5.000 mV** ✓ (the PLAN's 5 mV, the Flow's 10 µV).
- E2: 10 nA × 100 kΩ = **1.000 mV**; × 500 = **0.5000 V** ✓ (the PLAN's 0.5 V, the Flow's 1 mV). 0.5 / 3.3 = **15.2 %**
  of the range.
- E3: 10 nA × 1 MΩ = 10 mV; × 500 = **5.000 V**: above a 3.3 V rail (the assumption).
- E4: 10 pA × 100 kΩ = 1 µV; × 500 = **0.5000 mV**.
- The boundary: V_o < 33 mV at G = 500, I_b = 10 nA gives R_s < 0.033 / (500 × 10⁻⁸) = **6.6 kΩ**.
- The graph's ends: 100 Ω gives 0.500 mV; 1 MΩ gives 5.00 V.
- **Real values** (cited here only): input bias current of bipolar-input in-amps is about 1–10 nA (e.g. INA128-class: 2
  nA typical, 10 nA maximum); CMOS and FET inputs are about 1–100 pA at room temperature, doubling every ≈ 10 °C. *10 nA*
  is the PLAN's *"as an example"*: a bipolar part at its maximum.

**Section D, Equation rows**
- [x] Symbols match the course: G as cards 3 and 8; R_s *source resistance* as D1·040's output impedance; I_b.
- [x] Every example recomputed above.
- [x] Slider ranges real: I_b 1 pA – 100 nA (CMOS to an older bipolar part); G 1–1000 (card 8's range).
- [x] The graph obeys the Plot rows: a straight line on log–log axes (the physics is a product); one worked value per
  decade marked.

**A1–A8**: A1 ✓; A2 ✓ (the bias current is the non-ideal; the rail and the input offset current are named in the
assumptions); A3, A4, A5 n/a; A6 ✓ (both assumptions on their pane); A7 ✓ (G = 500 and 3.3 V as card 8; R_s as D1·040);
A8 ✓.

## 9. Faults and non-ideal behaviour

**PLAN FAULT** (verbatim): *A high-impedance source on a bipolar-input amplifier: the "offset" changes when the sensor is
swapped, because it was never the amplifier's alone.* s2 is this fault's mechanism, and the wrap-up (D3·070) can reopen
the graph at E2.

**Proposal** (F6): also name, in the teacher's notes, the in-amp's need for a DC return path. A floating source (a
thermocouple, a transformer-coupled input) gives the bias current nowhere to go, and the output drifts to a rail. This is
a classic bench fault and fits the wrap-up.

## 10. Accessibility, legibility and print

- Wall (C2): the statement, the derivation's three lines and the pane text at the Canvas's wall size; the axis labels and
  the boundary label at the floor. Check at 1920 × 1080 and 1024 × 768.
- Reduced motion (C3): the simulation shows its end state.
- Colour (C4): the boundary and the curve(s) labelled.
- Keyboard (C5): pane, pin and step keys; Space plays the simulation.
- Print (C8): the Equation's notes (statement, derivation, examples, boundary, assumptions, the graph as a still).

## 11. Assets to make or source

| Asset | Format | Made by | Status |
|---|---|---|---|
| The `equation` block (§3a, §3b) | YAML in `en.md` | the author | to write |

## 12. Bench capabilities this needs

**Equation Bench**: statement, symbols, highlights, derivation, examples, boundaries, assumptions, graph with log x and
y, `markExamples`, `simulate` with a ramp, panes and pins mirrored: **all exist**.

**To confirm when written**:
- (a) the ramp's span (1 k to 100 kΩ: offset 50.5 kΩ, amplitude 49.5 kΩ, if amplitude is the half-span);
- (b) that `simulate`'s marker travels a log–log graph.

**Would help**: X19 (a logarithmic ramp), so that each decade gets equal time.

## 13. Stand-in for the lecture

None needed. The Electronics version waits for the Electronics Bench and its in-amp part.

## 14. Findings for the owner

- **F1 — The symbol V_err.** The PLAN writes *V_err = I_b·R_s at the input and G·I_b·R_s at the output*: one name for
  two quantities. This spec writes `Ve` (at the input, the derivation's first line) and `Vo` (at the output, the
  statement). Keep (**recommended**), or one statement at the input with the output as an example?
- **F2 — The PLAN's 1 MΩ end is above the rail.** At 1 MΩ the formula gives 5 V. The graph keeps the PLAN's range and
  says so in the assumption and in E3. Keep (**recommended**: it shows where the error fills the converter), or end the
  axis at 100 kΩ?
- **F3 — Proposal: a CMOS curve beside the bipolar one** (`compare` I_b at 10 nA and 10 pA). p1 says *"nanoamps for many
  bipolar parts, picoamps for many CMOS ones"*, and the curve shows it a thousand times lower. +0 min (drawn with s1).
  Take, or leave?
- **F4 — Proposal: the 1 % boundary** (*V_o < 33 mV*), which marks 6.6 kΩ as this part's limit at G = 500.
- **F5 — Proposals**: the call-out before s2 (+0.2 min) and the teacher tip (§7d).
- **F6 — Proposal**: the DC return path in the teacher's notes and the wrap-up (§9).

## 15. Acceptance: how we know it is built right

- The Equation compiles with the fields of §3a. The derivation's three steps verify. E1–E3 show 5.000 mV, 0.5000 V and
  5.000 V. The graph runs 100 Ω–1 MΩ on log axes, a straight line through E1–E3.
- The simulation plays from the presenter's window and runs on the wall in step, from 5 mV to 0.5 V. Under reduced
  motion it shows its end state.
- B1 one pane or pin per step; B2 only the marker moves; B5 each `say` in the notes; B6 the marker with its readout; B7
  one mover; B11 R_s, I_b and G in Study; B13 statement and terms only; B16 values readable; B20 the next `say` on the
  strip.
- C2 legible at 1920 × 1080 and 1024 × 768; C3 the end state; C4 labels; C5 pane keys and Space; C6 at 320; C8 the
  notes.
