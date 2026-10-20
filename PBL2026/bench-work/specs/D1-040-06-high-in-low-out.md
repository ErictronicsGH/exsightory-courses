```yaml
id: D1-040-06-high-in-low-out
card: "High in, low out"
module: notes/Day01/040-sensor-as-source/en.md
bench: Equation                   # exists: statement, symbols, highlights, graph with log x, compare, boundaries, simulate
library: "input-loading: an Equation (V_r = V_s·R_in/(R_in + R_s)), defined in the card's `equation` block, graphed against R_s on a log axis as a family of four input impedances"
dimensions: 2D
stand_in: none                    # every field used exists today (`equationBlock.ts`, read 2026-10-08)
optional_benches: []
real_thing: "a resistive source of open-circuit voltage V_s and output impedance R_s read by an instrument of input impedance R_in: the 100 kΩ, 1 MΩ, 10 MΩ and 10 GΩ inputs of real instruments (a ×10 scope probe's 10 MΩ, a handheld DMM's 10 MΩ, a bench DMM's > 10 GΩ)"
minutes: 1.6                      # on the bench: the Equation is up for the whole card
card_minutes: 1.6
status: spec-draft
learner_action: none
predictions: []                   # card 5's predict covers the loading; F6 proposes none here
seeds: [S14]                      # in the PLAN, not in the Flow (F2)
key_variable: "R_s against R_in: the reading falls 1 % when R_s reaches R_in / 100"
time_scale: "none (the sweep in s3 is a presenter's demonstration, not a timed process)"
steps: 6                          # s0–s5
```

The Equation's format as read on 2026-10-08 (`packages/insight-core/src/registry/equationBlock.ts`,
`packages/canvas/src/EquationBench.vue`): `graph` takes `against`, `domain`, `hold` sliders, `scale` (x and
y, linear or log), `compare` (one curve per value of a held symbol, two to five), `markExamples` and
`animate`; `boundaries` shade a region by an inequality; `simulate` drives one symbol from a ramp or other
source on **main's clock**, with a marker travelling the curve and a live readout. **Mirrored to the wall**:
the pane, the pinned annotation, the derivation step and the simulation's transport (`BenchView`). **Not
mirrored**: a slider's value and the hover readout.

## 1. What the room must understand

- **Statement** (verbatim): *Instruments want a high input impedance and sources want a low output impedance.
  Then the load draws little, and the source barely notices it.*
- **SHOW** (verbatim from the PLAN): *Equation — V_read = V_s·R_in/(R_in + R_s), graphed against R_s from 100 Ω
  to 10 MΩ as a family for R_in = 100 kΩ, 1 MΩ, 10 MΩ and 10 GΩ. Replaces the Demo #1 widget sweep.*
- **Drive** (verbatim): *slide R_s up with R_in = 10 MΩ; then step through the family.*
- **Look for** (verbatim): *the knee where R_s reaches about a hundredth of R_in — a 1 % error.*
- **Status** (verbatim): *ready.*
- **Bench and library.** The **bench** is the Equation Bench. The **library** is this card's equation,
  `input-loading`.
- **Insight**: *what decides the error is the ratio of the source's impedance to the input's, and it stays
  under 1 % while R_s is under a hundredth of R_in.*
- **Kind of knowledge**: *a relation between quantities* (the reading against R_s, for four R_in). Card test →
  **Equation**. B17 applies (four curves on one axis, sharing one x). B15, B18, B19 do not.
- **Why this bench, not a still**: the sweep shows the reading holding and then falling away as R_s grows,
  and the family shows the knee moving a decade with every decade of R_in, which a single worked number
  cannot.
- **Key variable**: R_s against R_in.

## 2. Time

The Flow is 106 words; p2 *"[[demo]] Widget (#1 ADC input loading): sweep…"* (24) is a direction (F1), not
spoken: **82 spoken = 0.63 min**. The bench's steps s3–s5 are unscripted.

| Beat | Minutes | Source of the number |
|---|---|---|
| s0 the statement: p0 *"No measuring device has zero effect…"* (31) | 0.24 | 31 ÷ 130 |
| s1, s2 the two halves: p1 *"The rule: use an instrument that disturbs…"* (51) | 0.39 | 51 ÷ 130 |
| s3 the sweep: an unscripted line (≈ 20 words) and the 8 s ramp | 0.29 | 20 ÷ 130 + 8 s |
| s4 the knee: unscripted (≈ 20 words) | 0.15 | estimate |
| s5 the family, four curves walked: unscripted (≈ 45 words) | 0.35 | estimate |
| s5 held: the SEED S14 line (19 words; in the PLAN, not the Flow: F2) | 0.15 | 19 ÷ 130 |
| **Card total / of which on the bench** | **1.6 / 1.6** | +0.1 with F6 |

The unscripted lines are the presenter's; their suggested words are on the strip (§5). **Module check**:
`D1-040-01-interface.md` §2.

## 3. The scene: what is on the bench

### 3a. The equation (`input-loading`)

| Field | Content | Source |
|---|---|---|
| `title` | *High in, low out* | the card |
| `statement` | `Vr = Vs * Rin / (Rin + Rs)` | the PLAN's V_read (F3 on the symbol) |
| `symbols` | `Vr` *Reading* (V); `Vs` *Source's open-circuit voltage* (V); `Rin` *Instrument's input impedance* (Ω); `Rs` *Source's output impedance* (Ω) | the PLAN; card 4's *output impedance* |
| `highlights` | term `Rin / (Rin + Rs)` — *the share of the source's voltage that reaches the input* (teal); symbol `Rin` — *high in: the instrument* (azure); symbol `Rs` — *low out: the source* (amber) | the statement and the Flow's p1 |
| `source` | *Voltage divider; Thévenin source into a resistive load* | standard circuit theory |
| `examples` | §3b | §8 |
| `boundaries` | `Rs < Rin / 100` — *within 1 % of the true value* (valid); note *outside it, the reading is more than 1 % low* | the PLAN's Look for |
| `assumptions` | *source and input are resistive and steady (DC)* — breaksWhen *the input is a switched sampling capacitor, an ADC (D1·070)* — limiting | the S32 thread (card 8) |
| `graph` | against `Rs`, domain [100, 1.0e7] Ω; `scale` x `log`, y `linear`; `hold` Vs (0.1–10 V, default 5), Rin (1.0e5–1.0e10 Ω, default 1.0e7); `compare` Rin at [1.0e5, 1.0e6, 1.0e7, 1.0e10]; `markExamples: true` | the PLAN |
| `simulate` | drive `Rs`, waveform `ramp`, from 0 to 1 MΩ over `seconds: 8`, `autoplay: false`, note *watch the reading fall away as the source's impedance grows* | the PLAN's Drive (F4) |
| `notes` | `include: true` | print |

The y axis runs 0–5 V at V_s = 5 V (F3). The x axis: 100 Ω, 1 kΩ, 10 kΩ, 100 kΩ, 1 MΩ, 10 MΩ, one decade a
grid line.

### 3b. Worked examples (all at V_s = 5.000 V; each marked on its curve)

| # | Label | R_s | R_in | V_r | Note |
|---|---|---|---|---|---|
| E1 | *The knee, 10 MΩ input* | 100 kΩ | 10 MΩ | 4.950 V | *R_s is a hundredth of R_in: 1 % low* |
| E2 | *Card 5's divider, the handheld* | 500 kΩ | 10 MΩ | 4.762 V | *1 M / 1 M on 10 V is 5 V behind 500 kΩ: 4.76 V, as the handheld read* |
| E3 | *Card 5's divider, the bench meter* | 500 kΩ | 10 GΩ | 4.9998 V | *0.005 % low* |
| E4 | *The knee, 1 MΩ input* | 10 kΩ | 1 MΩ | 4.950 V | *a decade less input, a decade less source* |
| E5 | *The knee, 100 kΩ input* | 1 kΩ | 100 kΩ | 4.950 V | *card 3's light load: 10 V behind 1 kΩ into 100 kΩ, 9.90 V, the same 1 %* |

**Values beside their element**: the Symbols pane shows each symbol with its value and unit; the Example pane
shows V_r and the note; the simulation's live readout shows R_s and V_r; each curve is labelled with its
R_in at its right end.

**Colours and their second channel** (C4): the four curves in the Equation's series colours, each labelled
with its R_in at the curve's end (the label is the second channel); the knee region shaded with its label on
the boundary line; the highlighted symbols each with its words in the Terms pane.

## 4. The run: step by step, as the Flow goes

### 4a. Steps (the Equation; the presenter chooses panes and pins)

| # | id | Flow paragraph | What changes (`say`) | Pane | Presenter's control |
|---|---|---|---|---|---|
| 0 | `s0-statement` | p0 *"No measuring device has zero effect…"* | The reading is the source's voltage times the share that reaches the input: R_in over R_in plus R_s. | Symbols, the share pinned | pin |
| 1 | `s1-high-in` | p1 *"The rule: use an instrument…"* (to *"…the circuit's resistances"*) | High in: the bigger R_in is beside R_s, the closer the share is to one. | Terms, `Rin` pinned | pin |
| 2 | `s2-low-out` | p1 *"Put the other way round…"* | Low out: the smaller R_s is beside R_in, the less the source gives way. | Terms, `Rs` pinned | pin |
| 3 | `s3-sweep` | unscripted (the Flow's direction p2) | With a 10 MΩ input, the reading holds near 5 V and falls away as R_s grows: 2.5 V when R_s equals R_in. | Graph, the simulation played | play |
| 4 | `s4-knee` | unscripted | The knee: when R_s reaches a hundredth of R_in, the reading is 1 % low. | Graph, E1 and the shaded region | — (held) |
| 5 | `s5-family` | unscripted; then the SEED S14 | Each tenfold rise in R_in moves the knee a decade to the right; the 10 GΩ bench meter never reaches it on this axis. | Graph, the family with E2–E5 | — (held) |

Suggested unscripted words, on the strip (B20; the presenter's own): s3 *"Watch the reading as the source's
impedance climbs, with a 10 MΩ meter on it."* s4 *"Here: a source a hundredth of the meter's impedance, and
the reading is one percent low."* s5 *"Now the family. A 100 kΩ input knees at 1 kΩ, a megohm at 10 kΩ, the
handheld at 100 kΩ. The bench meter's 10 GΩ is flat across the whole axis. And there is card 5's divider:
4.76 on the handheld, 4.9998 on the bench meter."*

### 4b. Motion, cues and stills

| # | Motion | Movers | Cue | Hold | Reduced motion (C3) | Still |
|---|---|---|---|---|---|---|
| 0–2 | none (pins) | 0 | the pinned term or symbol lit in the statement | hold | same | one per step |
| 3 | the simulation: a marker travels the 10 MΩ curve as R_s ramps 0 → 1 MΩ in 8 s, the readout counting down; it stops at the end | 1 | the marker on the curve and its readout together | hold at the end | the end state shown (the marker at 1 MΩ, 4.545 V) | the curve with the marker at 1 MΩ |
| 4–5 | none | 0 | the shaded region and its label; the examples' dots | hold | same | one each |

The family is drawn from s3 onward (the `compare` field is static); s3's marker travels only the held 10 MΩ
curve, and the others stay still (B2, B7: one mover). F5 asks for a curve-by-curve reveal.

## 5. Pacing and interaction, by surface and view

**Who paces** (B12): the presenter on the wall (pane, pin, the simulation's play are mirrored from main);
the learner in Study Mode and Scope.

| View | Who | Controls |
|---|---|---|
| Preview (in the slide) | everyone | the statement and the current pane |
| View (details) | everyone | every pane; the graph's held sliders V_s and R_in; the simulation's play and pause; the hover readout |
| Edit (session only) | everyone | not specified for the Equation Bench (its sliders already vary the values) |
| Authoring | authors | the `equation` block's YAML |

- **The presenter's strip** (B20): the pane, pin and play controls; the next step's `say`; the suggested
  unscripted words (§4a); the teacher tip.
- **Study / Scope**: R_in and V_s free on the graph (§7e); the shaded region follows the slider (to confirm,
  §12).
- **Phone** (C6): the statement, then the pane, then the controls; the graph full width; the four curve
  labels must not collide at 320 (check; else a legend list under the graph).
- **Locked**: none (no ASK on this card).

## 6. The frame

The Equation's frame (the Canvas header and footer; panes as pills, D4.17). Title *High in, low out*.

## 7. Thinking, not watching

- **7a. The PLAN's ASK**: *none on this card.* Card 5's predict and card 8's numeric bracket it.
- **7b. Prediction point**: none in the PLAN. **Proposal** (F6): before s5, ask aloud *"Where will the 1 MΩ
  input's knee be?"* (answer: 10 kΩ), the room calling it out; no activity.
- **7c. After**: in Study, done means the graph opened and R_in moved once.
- **7d. Teacher tip** — **Proposal** (F6): *Learners think a "high-impedance meter" is always safe. Ask: safe
  against what? The meter's 10 MΩ is only high beside a source under 100 kΩ; card 4's thermistor (5 kΩ) is
  fine, card 5's divider (500 kΩ) is not.*
- **7e. Explore** (B11): in Study, R_in from 100 kΩ to 10 GΩ and V_s free; try card 4's thermistor, 1.65 V
  behind 5 kΩ into 10 MΩ: 1.649 V, 0.05 % low.

## 8. Faithfulness (the quality bar)

**Arithmetic** (V_r = V_s·R_in/(R_in + R_s); fraction low = R_s/(R_in + R_s)):
- E1: 5 × 10 M / 10.1 M = **4.950 V**, 0.990 % low (the *1 % error* of the Look for: R_s = R_in/100 gives
  1/101).
- E2: 5 × 10 M / 10.5 M = **4.762 V** (4.762 % low). Card 5's divider: 1 MΩ ∥ 10 MΩ = 909.1 kΩ; 10 × 909.1 /
  1909.1 = 4.762 V ✓ (the PLAN's 4.76 V).
- E3: 5 × 10 G / (10 G + 0.5 M) = **4.99975 V**, shown 4.9998 V (0.005 % low; the PLAN's 4.9998 V and
  *0.005 %* ✓).
- E4: 5 × 1 M / 1.01 M = **4.950 V**. E5: 5 × 100 k / 101 k = **4.950 V**; card 3's 10 × 100 k / 101 k = 9.901 V
  ✓ (the PLAN's 9.90 V).
- s3's end: R_s = R_in = 10 MΩ → **2.500 V**; the ramp's end at 1 MΩ → 5 × 10 / 11 = **4.545 V**.
- The family's ends at R_s = 10 MΩ: 100 kΩ → 0.0495 V; 1 MΩ → 0.4545 V; 10 MΩ → 2.500 V; 10 GΩ → 4.995 V
  (0.1 % low: the bench meter stays within 1 % across the whole axis).
- **Sources of the R_in values** (cited here only, never on a teaching surface): 10 MΩ is the standard DC-volts
  input of handheld DMMs and of ×10 oscilloscope probes; *> 10 GΩ* is the bench DMM's input on its low DC
  ranges (the class value InsightDemo's `dmm-bench` profile carries, used by card 5); 1 MΩ is an oscilloscope's
  direct input; 100 kΩ stands for a low-impedance input (an analogue moving-coil meter at 20 kΩ/V on its 5 V
  range is 100 kΩ).

**Section D, Equation rows**
- [x] Symbols match the course: R_s *output impedance* (card 4), R_in *input impedance*, V for voltages; V_r
  for the PLAN's V_read (F3).
- [x] Every example recomputed above, to the figures shown.
- [x] Slider ranges real: V_s 0.1–10 V (sensor outputs to card 5's 10 V), R_in 100 kΩ–10 GΩ (the instruments
  above).
- [x] The graph obeys the Plot rows: a smooth sigmoid on the log axis; the physics (a divider), not a lookalike;
  one worked value per curve.

**A1–A8**: A1 ✓; A2 ✓ (the loading is the non-ideal; the ideal, V_r = V_s, is the curves' flat left end); A3
n/a; A4 ✓ (the R_in values are real instruments'); A5 n/a (no time); A6 ✓ (the assumption *resistive and
steady (DC)* is on the Assumptions pane); A7 ✓ (card 3's 9.90 V, card 4's 5 kΩ and card 5's 4.76 V and 4.9998
V all land on these curves); A8 ✓.

## 9. Faults and non-ideal behaviour

**PLAN FAULT**: none on this card. The assumption names where the model breaks: an ADC's sampling input is not
a resistor (D1·070; card 8's second beat).

## 10. Accessibility, legibility and print

- Wall (C2): the statement and pane text at the Canvas's wall size; the four curve labels and the axis labels
  (*Source impedance R_s (Ω), log*, *Reading V_r (V)*) at the floor. Check at 1920 × 1080 and 1024 × 768.
- Reduced motion (C3): the simulation shows its end state; nothing else animates.
- Colour (C4): each curve labelled with its R_in, not told apart by colour alone; checked under the three
  colour-blindness simulations.
- Keyboard (C5): the Equation's pane and pin keys; Space plays the simulation.
- Print (C8): the Equation's notes (`notes: include`): the statement, symbols, examples, assumption, and the
  graph as a still.

## 11. Assets to make or source

| Asset | Format | Made by | Status |
|---|---|---|---|
| The `equation` block (§3a, §3b) | YAML in `en.md`, replacing the Widget cue (F1) | the author | to write |

## 12. Bench capabilities this needs

**Equation Bench**: statement, symbols, highlights, examples, boundaries, assumptions, graph with log x,
`compare`, `markExamples`, `simulate` with a ramp, panes and pins mirrored: **all exist**. **To confirm when
written**: (a) that `simulate`'s marker travels the curve at the held R_in when `compare` is on, and on a log
x axis; (b) how a ramp's span is set (`offset` and `amplitude`: here 0 to 1 MΩ, so offset 0.5 MΩ and amplitude
0.5 MΩ if amplitude is the half-span); (c) that the boundary `Rs < Rin / 100` follows the held R_in slider in
Study. **Missing (request it, X15)**: the family revealed one curve at a time, or one curve emphasised, as the
presenter steps (F5); until then all four are drawn from s3.

## 13. Stand-in for the lecture

None needed.

## 14. Findings for the owner

- **F1 — The Flow's cue still names the widget.** p2 reads *"[[demo]] Widget (#1 ADC input loading): sweep the
  source impedance…"*; the PLAN replaced the widget with this Equation. Rename the cue to *"[[demo]] Equation
  Bench: sweep the source impedance and watch the reading fall away from the true value at a fixed input
  impedance; then the family."* (**recommended**, as D1·020's cues were renamed on 2026-10-08), or leave?
- **F2 — SEED S14 is not in the Flow.** The PLAN plants *"High in, low out: the impedances decide who disturbs
  whom. Tomorrow you'll hear this again, in ones and zeros."*; no Flow paragraph says it. Add it as the Flow's
  last paragraph (**recommended**: it is counted in §2 already), or leave it to the presenter's notes?
- **F3 — V_s and the symbol V_r.** The PLAN gives no V_s; this spec holds it at **5.000 V**, card 5's divider
  seen as a source (5 V behind 500 kΩ), so card 5's 4.76 V and 4.9998 V fall on the curves. And V_read is
  written `Vr` (one letter and a subscript, the Equation's style). Keep both (**recommended**), or plot the
  share V_r/V_s (0–1) instead?
- **F4 — "Slide R_s up" is the x axis.** Slider values are not mirrored to the wall, and R_s is the graph's
  axis, not a slider; the slide is therefore the Equation's own simulation, a ramp of R_s from 0 to 1 MΩ in 8 s
  that the presenter plays (mirrored on main's clock). On the log axis the marker crosses the first decades
  quickly and spends most of its 8 s between 100 kΩ and 1 MΩ, where the knee is. Keep (**recommended**), or
  stop at the examples only (no motion)?
- **F5 — "Step through the family" draws all four at once.** `compare` is static, so the four curves appear
  together at s3, and the presenter walks them by their knee dots. Request X15 (a family revealed or
  emphasised one curve per step) and accept all four at once until then (**recommended**)?
- **F6 — Proposals**: the call-out prediction before s5 (§7b, +0.1 min) and the teacher tip (§7d).

## 15. Acceptance: how we know it is built right

- The Equation compiles with the fields of §3a; E1–E5 show 4.950, 4.762, 4.9998, 4.950, 4.950 V; the graph runs
  100 Ω–10 MΩ on a log axis with four labelled curves; the 10 MΩ curve passes 2.500 V at 10 MΩ; the shaded
  region ends at 100 kΩ at R_in = 10 MΩ.
- The simulation plays from the presenter's window and runs on the wall in step; under reduced motion it shows
  its end state (4.545 V at 1 MΩ).
- B1 one pin or pane per step; B2 only the marker moves; B5 each `say` in the notes; B6 the pinned symbol lit,
  the marker with its readout; B7 one mover; B11 R_in one slider away in Study; B13 statement and terms only; B16
  values readable; B17 four curves on one axis; B20 the suggested words on the strip.
- C2 legible at 1920 × 1080 and 1024 × 768; C3 the end state; C4 curves labelled; C5 pane keys and Space; C6 at
  320; C8 the notes.
