```yaml
id: D1-050-02-shunt-signal-and-power
card: "Sizing a shunt: signal against disturbance"
module: notes/Day01/050-current-sensing/en.md
bench: Equation                   # exists: statement, symbols, highlights, examples, graph with log axes, hold sliders
library: "two Equations on one card: shunt-signal (V_sh = I·R_sh) and shunt-power (P = I²·R_sh), each graphed against R_sh from 1 mΩ to 100 mΩ on log–log axes at I = 2 A, with the same four shunts marked (1, 10, 50, 100 mΩ) and the signal in 12-bit codes on 3.3 V in its notes"
dimensions: 2D
stand_in: none                    # the codes on a second axis wait for X20; until then they are in the examples' notes
optional_benches: []
real_thing: "a current-sense resistor from 1 mΩ to 100 mΩ carrying 2 A, read by a microcontroller's 12-bit ADC on a 3.3 V reference"
minutes: 3.3                      # on the bench: the Equations are up for the whole card, the two numerics included
card_minutes: 3.3
status: spec-draft
learner_action: numeric
predictions: []                   # the two numerics come before the bench and are answered at s1
seeds: []
key_variable: "R_sh: signal and heat both grow in step with it, and the signal is the voltage the circuit loses"
time_scale: "none"
steps: 5                          # s0–s4
```

The Equation's format as read on 2026-10-20 (`C:\ExSightory\src\insight\packages\insight-core\src\registry\equationBlock.ts`):
**one `statement` per block, one y axis per graph** (the graph draws what the statement solves for, against one symbol,
with every other right-hand symbol on a `hold` slider); `scale` x and y take `linear` or `log`, and a log axis must not
touch zero; `examples` give right-hand values only; `markExamples` puts each example on its curve. **Mirrored to the
wall**: the pane, the pinned annotation, the derivation step and a simulation's transport. **Not mirrored**: a slider's
value and the hover readout (as `D1-040-06-high-in-low-out.md` records).

## 1. What the room must understand

- **Statement** (verbatim): *A larger shunt gives more signal, and takes more voltage and power from the circuit it
  measures. Its value is a trade, not a default.*
- **SHOW** (verbatim from the PLAN): *Equation — V = I·R and P = I²·R, graphed against R from 1 mΩ to 100 mΩ at I = 2 A,
  with the signal also shown in codes at 12 bits on 3.3 V.*
- **Look for** (verbatim): *20 mV is about 25 codes — measurable, and nowhere near the ADC's range (the problem 060
  solves).*
- **Status** (verbatim): *ready.*
- **Drive**: *none in the PLAN.* The Flow's *"Now slide the shunt up. At 50 mΩ … Slide it down to 1 mΩ…"* is walked by
  the marked examples (F2).
- **Bench and library.** The **bench** is the Equation Bench. The **library** is two equations on the card,
  `shunt-signal` and `shunt-power` (F1).
- **Insight**: *at a fixed current the signal and the heat both grow in step with the shunt, and the signal is itself
  the voltage the circuit loses; so the shunt's value is chosen, from how much drop the circuit can spare.*
- **Kind of knowledge**: *a relation between quantities* (two quantities against one variable). Card test →
  **Equation**. B17 applies (signal and power side by side, sharing one R axis and the same four shunts). B15, B18, B19
  do not.
- **Why this bench, not a still**: the two graphs side by side make *"five times the signal, five times the heat"*
  visible as two lines climbing together; the four marked shunts are evaluated, not typed; in Study the current is one
  slider away.
- **Key variable**: R_sh.

## 2. Time

The Flow is 217 words; p0's `[[ask]]` question (21) is counted in the numerics: **196 spoken = 1.51 min**.

| Beat | Minutes | Source of the number |
|---|---|---|
| The PLAN's numeric ×2: p0 the question (21), *"How much signal?"* then *"How much power?"*, two answer windows | ≈ 1.5 | as two numerics, ≈ 0.75 each |
| s0 the pair: p2 *"[[demo]] Two equations on the bench…"* (23) | 0.18 | 23 ÷ 130 |
| s1 10 mΩ, the reveal: p3 *"[[reveal]] 2 A times 10 mΩ is 20 mV…"* (23) | 0.18 | 23 ÷ 130 |
| s2 50 mΩ: p4 *"Now slide the shunt up…"* (to *"…100 mV of its supply."*, 35) | 0.27 | 35 ÷ 130 |
| s3 1 mΩ: p4 *"Slide it down to 1 mΩ…"* (20) | 0.15 | 20 ÷ 130 |
| s4 the trade: p5 *"That is the trade…"* (42) | 0.32 | 42 ÷ 130 |
| s4 held: p6 *"So a shunt's value is a decision…"* (53) | 0.41 | 53 ÷ 130 |
| Moves between the two equations' panes, not covered by speech (4 × ≈ 1.5 s) | 0.1 | estimate |
| s4 the two boundaries named (F5, decided): unscripted (≈ 20 words: *"Shaded: the 100 mV this circuit can spare, and half of a 1 W part's rating. 10 mΩ sits inside both."*) | 0.15 | estimate |
| **Card total / of which on the bench** | **3.3 / 3.3** | |

**Module check**: `D1-050-01-shunt-current-to-voltage.md` §2.

## 3. The scene: what is on the bench

Two `equation` blocks on the card, side by side on the Canvas, signal left and power right (F1). Both use the same
symbols for I and R_sh as card 1 (`D1-050-01` F1), the same R axis and the same four examples, so a shunt picked on one
is the same shunt on the other.

### 3a. The signal (`shunt-signal`)

| Field | Content | Source |
|---|---|---|
| `title` | *The signal* | the Flow's p2 |
| `statement` | `Vsh = I * Rsh` | the PLAN's V = I·R |
| `symbols` | `Vsh` *Signal: the voltage across the shunt* (V); `I` *Current being measured* (A); `Rsh` *Shunt resistance* (Ω) | the PLAN; card 1 |
| `highlights` | symbol `Rsh` — *the choice: more R, more signal* (teal); symbol `Vsh` — *the signal, and also the voltage the circuit under test loses* (amber) | the Flow's p4 |
| `source` | *Ohm's law* | |
| `examples` | §3c, the V_sh column | §8 |
| `boundaries` | `I * Rsh < 0.1` — *within the 100 mV this circuit can spare* (valid); note *above it, the circuit loses more than it can give* (F5, decided 2026-10-20) | the Flow's p6 |
| `assumptions` | *the ADC reads 0 to 3.3 V in 4096 codes, 0.806 mV each* — breaksWhen *the reference or the resolution differ: the codes in the notes scale with them (D1·090)* — simplifying | the PLAN's *12 bits on 3.3 V* |
| `graph` | against `Rsh`, domain [0.001, 0.1] Ω; `scale` x `log`, y `log`; `hold` I (0.1–5 A, default 2); `markExamples: true` | the PLAN |
| `notes` | `include: true` | print |

### 3b. The power (`shunt-power`)

| Field | Content | Source |
|---|---|---|
| `title` | *The heat* | the Flow's p2, p3 |
| `statement` | `P = I^2 * Rsh` | the PLAN's P = I²·R |
| `symbols` | `P` *Power the shunt burns* (W); `I`, `Rsh` as §3a | the PLAN |
| `highlights` | term `I^2` — *the current squared: double the current, four times the heat* (azure); symbol `Rsh` as §3a (teal) | the Flow's p3 |
| `source` | *Joule heating, P = I²R* | |
| `examples` | §3c, the P column | §8 |
| `boundaries` | `I^2 * Rsh < 0.5` — *within half of a 1 W part's rating* (valid); note *above it, choose a part rated higher* (F5, decided 2026-10-20) | the Flow's p6 |
| `assumptions` | *the shunt holds its value as it warms* — breaksWhen *it runs near its rating: its resistance drifts with its temperature coefficient, and the reading with it* — limiting | the Flow's p6 *"check its power rating with a margin"* |
| `graph` | as §3a: against `Rsh`, [0.001, 0.1] Ω, log–log, `hold` I (0.1–5 A, default 2), `markExamples: true` | the PLAN |
| `notes` | `include: true` | print |

**Axes.** x: *Shunt resistance R_sh (Ω), log*, ticks at 1 mΩ, 10 mΩ, 100 mΩ. y on the signal: *Signal V_sh (V), log*,
2 mV to 200 mV at 2 A. y on the power: *Power P (W), log*, 4 mW to 400 mW at 2 A. On log–log axes both are straight lines
of slope 1 at a fixed current, so *"five times the signal, five times the heat"* reads as two lines climbing together,
and each decade of R gets the same width (F2).

### 3c. Worked examples (all at I = 2.000 A; the same four on both equations, each marked on its curve)

| # | Label | R_sh | V_sh | P | Note on the signal | Note on the power |
|---|---|---|---|---|---|---|
| E1 | *1 mΩ* | 0.001 Ω | 2.000 mV | 4.000 mW | *kind to the circuit, hard to measure: about 2.5 codes* | *4 mW: barely warm* |
| E2 | *10 mΩ* | 0.010 Ω | 20.00 mV | 40.00 mW | *about 25 codes of 4096: measurable, and nowhere near the ADC's range* | *40 mW* |
| E3 | *50 mΩ* | 0.050 Ω | 100.0 mV | 200.0 mW | *five times the signal, and the circuit loses 100 mV of its supply* | *five times the heat* |
| E4 | *100 mΩ* | 0.100 Ω | 200.0 mV | 400.0 mW | *about 248 codes; the circuit loses 200 mV* | *400 mW: a part rated for it, with a margin* |

E4 ends the PLAN's range and is not named in the Flow; it is marked on the curves and not stepped to.

**Values beside their element**: the Symbols pane with values and units; the Example pane with V_sh (or P) and its
note; on the graph each marked example labelled with its R_sh.

**Colours and their second channel** (C4): the highlighted symbols each with its words in the Terms pane; each marked
example labelled with its R_sh (the label is the second channel); one curve per graph, so no curve is told apart by
colour.

## 4. The run: step by step, as the Flow goes

### 4a. Steps (the presenter moves both equations' panes together)

| # | id | Flow paragraph | What changes (`say`) | Pane (both equations) | Presenter's control |
|---|---|---|---|---|---|
| — | the PLAN's numerics fire before the bench (p0's `[[ask]]`, then `[[pause]]`) | — | (§7a) | — | the activity |
| 0 | `s0-pair` | p2 *"[[demo]] Two equations on the bench…"* | The signal is the current times the shunt; the heat is the current squared times the shunt. | Graph | pane |
| 1 | `s1-ten` | p3 *"[[reveal]] 2 A times 10 mΩ is 20 mV…"* | At 10 mΩ: 20 mV of signal and 40 mW of heat. | Example, E2 | pane, example |
| 2 | `s2-fifty` | p4 *"Now slide the shunt up…"* | At 50 mΩ: five times the signal, five times the heat, and 100 mV taken from the circuit. | Example, E3 | example |
| 3 | `s3-one` | p4 *"Slide it down to 1 mΩ…"* | At 1 mΩ: the circuit barely notices, and only 2 mV is left to measure. | Example, E1 | example |
| 4 | `s4-trade` | p5 *"That is the trade…"*; p6 held | Both climb in step with the shunt: 20 mV is about 25 codes, measurable and far below the ADC's range; 10 mΩ sits inside what the circuit can spare and what the part can burn. | Graph, E2's dot pinned on the signal; the two boundaries shaded | pane, pin |

### 4b. Motion, cues and stills

| # | Motion | Movers | Cue | Hold | Reduced motion | Still |
|---|---|---|---|---|---|---|
| 0–4 | none (panes, examples, a pin) | 0 | the selected example's values on both equations at once; at s4 the two straight lines and E2's dot | hold | same | one per step (both equations in each) |

No simulation: the four shunts are the Flow's stops, and a linear ramp across two decades would cross the first in a
tenth of its time (X19). See F2.

## 5. Pacing and interaction, by surface and view

**Who paces** (B12): the presenter on the wall (pane, example and pin are mirrored); the learner in Study Mode and
Scope.

| View | Who | Controls |
|---|---|---|
| Preview (in the slide) | everyone | both statements and the current pane |
| View (details) | everyone | every pane on each equation: Symbols, Terms, Example, Graph, Assumptions; the held slider I (0.1–5 A, default 2 A) on each graph; the hover readout |
| Edit (session only) | everyone | not specified for the Equation Bench (its sliders already vary the values) |
| Authoring | authors | the two `equation` blocks' YAML |

- **The presenter's strip** (B20): the next step's `say`; the teacher tip; the pane controls of both equations.
- **Study / Scope**: I free on each graph (one slider; the two graphs do not share it, F1); try 5 A on 10 mΩ: 50 mV and
  250 mW.
- **Phone** (C6): the two equations stacked, signal first, each its statement, then its pane, full width.
- **Locked**: the Example pane until the numerics are answered, if the activity can lock it (§12); otherwise the
  presenter opens the Graph pane first, as §4a does.

## 6. The frame

The Equation's frame, twice (the Canvas header and footer; panes as pills, D4.17). Titles *The signal* and *The heat*.

## 7. Thinking, not watching

- **7a. The PLAN's ASK** (verbatim): *numeric ×2 (at the Flow's [[ask]]) — "Two amps through a 10 mΩ shunt. How much
  signal do you get?" then "How much power does the shunt burn?" · answer: 20 mV ± 1 mV, then 40 mW ± 2 mW · reveal: the
  Equation pair below, at R = 10 mΩ. · explain: V = I·R = 2 A × 10 mΩ = 20 mV and P = I²·R = 4 A² × 10 mΩ = 40 mW; at a
  fixed current both grow in step with the shunt, so every extra millivolt of signal costs the circuit voltage and heat.
  · depth: use · practice: computational thinking.* Both fire **before s0** (the Flow's p0), and **s1 answers them**.
- **7b. Prediction point**: none beyond the numerics.
- **7c. After**: the explain. In Study, done means both numerics were answered.
- **7d. Teacher tip** (F5, decided 2026-10-20): *Some will treat the signal and the circuit's loss as two different things.
  Ask: the 20 mV the ADC reads, where did it come from? The same 20 mV the load no longer gets.*
- **7e. Explore** (B11): in Study, the current on either graph; 5 A on 10 mΩ is 50 mV and 250 mW; 0.5 A is 5 mV and
  2.5 mW: the power falls four times faster than the signal.

## 8. Faithfulness (the quality bar)

**Arithmetic** (V_sh = I·R_sh; P = I²·R_sh; one code = 3.3 V / 4096 = 0.8057 mV):
- E1: 2 × 0.001 = **2.000 mV**, 2.000 / 0.8057 = **2.48 codes** (*about 2.5*); 4 × 0.001 = **4.000 mW**.
- E2: 2 × 0.010 = **20.00 mV**, 20.00 / 0.8057 = **24.82 codes** (the PLAN's and the Flow's *about 25* ✓); 4 × 0.010 =
  **40.00 mW** (the PLAN's 40 mW ✓). 20 mV is 0.61 % of 3.3 V: *nowhere near the ADC's range* ✓.
- E3: 2 × 0.050 = **100.0 mV** (*five times the signal* ✓; the Flow's *loses 100 mV of its supply* ✓, since the shunt's
  drop is the signal); 4 × 0.050 = **200.0 mW** (*five times the heat* ✓).
- E4: 2 × 0.100 = **200.0 mV**, **248.2 codes**; 4 × 0.100 = **400.0 mW**.
- The Flow's *"Slide it down to 1 mΩ … left with 2 mV"* = E1 ✓.
- The numerics' tolerances: 20 mV ± 1 mV and 40 mW ± 2 mW are both ± 5 %.
- §7e: 5 × 0.010 = 50 mV, 25 × 0.010 = 250 mW; 0.5 × 0.010 = 5 mV, 0.25 × 0.010 = 2.5 mW ✓.
- Card 3 and D1·060 use 1.997 A and 19.97 mV (12 V across 6.010 Ω); this card's 2 A and 20 mV are the same, rounded, as
  the PLAN states them (A7 ✓).
- **Sources** (cited here only): 12-bit SAR ADCs on a 3.3 V reference are the common microcontroller class (D1·010's and
  D1·080's converter); 1 mΩ–100 mΩ current-sense resistors at 1–3 W are the 2512-class datasheets cited in
  `D1-050-01` §8.

**Section D, Equation rows**
- [x] Symbols match the course: `Vsh`, `Rsh`, `I` as card 1; P for power.
- [x] Every example recomputed above, to the figures shown.
- [x] Slider range real: I from 0.1 A to 5 A (a sensor board to a motor drive).
- [x] The graph obeys the Plot rows: straight lines on log–log axes are the true shape of a linear law; one worked
  value per marked shunt; axes labelled with quantity, unit and *log*.

**A1–A8**: A1 ✓; A2 ✓ (the heat and the voltage lost are the non-ideal; the power's assumption names the drift with
temperature); A3, A4, A5 n/a; A6 ✓ (the ADC's 4096 codes on 3.3 V on the signal's Assumptions pane); A7 ✓ (2 A and 20 mV
as card 1, card 3 and D1·060, rounded); A8 ✓.

## 9. Faults and non-ideal behaviour

**PLAN FAULT**: none on this card. Two non-ideal effects are named on the bench: the voltage the circuit loses (E3's
note) and the shunt's drift as it warms (the power's assumption). The two boundaries (F5, decided) turn the Flow's last
paragraph into shaded regions: 10 mΩ at 2 A is inside both (20 mV < 100 mV; 40 mW < 0.5 W); 100 mΩ is outside the
signal's (200 mV) and inside the power's (400 mW).

## 10. Accessibility, legibility and print

- Wall (C2): both statements and pane text at the Canvas's wall size, two equations side by side; the axis labels and
  the four example labels at the floor. Check at 1920 × 1080 and 1024 × 768 (two graphs at 1024 wide may need the
  stacked layout: check).
- Reduced motion: nothing animates.
- Colour (C4): highlights labelled; example dots labelled with R_sh.
- Keyboard (C5): the Equation's pane and pin keys, on each equation.
- Print (C8): both equations' notes (statements, examples with their notes, assumptions, the two graphs as stills).

## 11. Assets to make or source

| Asset | Format | Made by | Status |
|---|---|---|---|
| The two `equation` blocks (§3a, §3b, §3c) | YAML in `en.md` | the author | to write |

## 12. Bench capabilities this needs

**Equation Bench**: statement, symbols, highlights (a symbol and a term), examples, boundaries, assumptions, graph with
log x and log y, `hold`, `markExamples`, panes and pins mirrored: **all exist**. To confirm: that a boundary shades its
region on a log y axis.

**To confirm when written**:
- (a) **two `equation` blocks on one card**, shown side by side on the Canvas, each with its own panes. If the Canvas
  shows one block at a time, the presenter switches between them at each step (B17 is lost; the steps stay the same).
- (b) that selecting an example is mirrored to the wall (§4a s1–s3); if not, the presenter keeps the Graph pane and
  points at the marked dots, which carry the same values.
- (c) that the Example pane can stay locked until the numerics are answered; if not, §4a opens on the Graph pane, which
  shows the dots but not the 10 mΩ values until s1.

**Missing (request it, X20)**: **a second y axis that is a linear rescale of the first** (here *codes = V_sh × 4096 /
3.3*, labelled *12-bit codes on 3.3 V*), so the PLAN's *"the signal also shown in codes"* is drawn on the graph. Until
then, the codes are in the examples' notes and the assumption.

**Not this bench's**: the shunt drawn in its circuit and the voltage it takes from the load are card 3's and card 6's
(the Electronics widgets, deferred; their demonstrations are asked of Benches by crossings 493 and 495).

## 13. Stand-in for the lecture

None needed. Without X20 the codes are read from the notes (E1, E2, E4).

## 14. Findings for the owner

- **F1 — The PLAN's two equations are two Equations here.** The Equation Bench takes one statement per block and draws
  one y axis per graph, and V and P have different units, so the pair is two `equation` blocks side by side, sharing
  the same R axis and the same four shunts. Keep (**recommended**, as the brief of 2026-10-20 proposed), or one block
  (the signal) with the power in its examples' notes only (no power graph)?
- **F2 — "Slide the shunt up" is the x axis, walked by four marked shunts.** R_sh is the graph's axis, not a slider, and
  a slider's value is not mirrored to the wall in any case. The Flow's three stops (10, 50, 1 mΩ) are examples E2, E3, E1,
  marked on both curves and stepped by the presenter; E4 (100 mΩ) closes the PLAN's range. Log–log axes give each decade
  the same width and make both laws straight lines. Keep (**recommended**), or linear axes (1 mΩ and 10 mΩ crowd the
  origin)?
- **F3 — The codes wait for X20.** A second y axis in codes is not in the Equation Bench; until it lands, the codes are in
  the notes. Raise X20 (**recommended**; it serves any card that shows a voltage and the codes it becomes: D1·060 card 3,
  D1·080, D2·050), or keep the codes in the notes for good?
- **F4 — The Flow's p6 closes on a rule** (*"Decide how much voltage the circuit can spare at full-scale current, choose
  the shunt that drops that much, and check its power rating with a margin"*) that the bench can show only as words
  unless F5 is taken.
- **F5 — Proposals**: the teacher tip (§7d); and two `boundaries`, shown at s4 (+0.15 min): on the signal, `I * Rsh <
  0.1` — *within the 100 mV this circuit can spare*; on the power, `I^2 * Rsh < 0.5` — *within half of a 1 W part's
  rating*. Both values are illustrations the presenter names; the owner picks them or leaves the boundaries out.

**Decided 2026-10-20** (owner: *"go with your recommendations on the findings"*): F1 two Equations; F2 log–log with
the four marked shunts; F3 X20 raised (crossing 496 to Benches); F4 reported; F5 taken: the teacher tip and both
boundaries (§3a, §3b, §4a s4; +0.15 min).

## 15. Acceptance: how we know it is built right

- Both Equations compile. At I = 2 A, E1–E4 show 2.000, 20.00, 100.0 and 200.0 mV on the signal and 4.000, 40.00, 200.0
  and 400.0 mW on the power, each marked on its curve; both graphs run 1 mΩ–100 mΩ on log–log axes and are straight
  lines of slope 1; the notes give about 2.5, 25 and 248 codes; at 2 A the signal's boundary ends at 50 mΩ and the
  power's at 125 mΩ (off the axis: the whole range is inside it).
- The numerics fire before s0 and s1 answers them; the presenter's pane and example changes reach the wall.
- B1 one pane or example per step; B5 each `say` in the notes; B6 the selected example on both equations at once; B10
  the explain; B11 the current one slider away in Study; B13 statements and terms only; B16 values readable; B17 the two
  equations side by side, same axis, same shunts.
- C2 legible at 1920 × 1080 and 1024 × 768; C4 dots and highlights labelled; C5 pane keys; C6 stacked at 320; C8 the
  notes.
