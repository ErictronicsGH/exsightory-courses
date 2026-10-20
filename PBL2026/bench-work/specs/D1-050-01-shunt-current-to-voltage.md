```yaml
id: D1-050-01-shunt-current-to-voltage
card: "A shunt turns current into voltage"
module: notes/Day01/050-current-sensing/en.md
bench: Equation                   # exists: statement, symbols, highlights, examples, rearrangements, assumptions
library: "shunt-law: an Equation (I = V_sh/R_sh), defined in the card's `equation` block, with the worked example 20 mV across 10 mΩ → 2 A and its rearrangement for V_sh (card 2's V = I·R)"
dimensions: 2D
stand_in: none
optional_benches: []
real_thing: "a 10 mΩ current-sense resistor (a four-terminal metal-element shunt, 1 % class) carrying 2 A"
minutes: 0.7                      # on the bench: the Equation is up for the whole card
card_minutes: 0.7
status: spec-draft
learner_action: none
predictions: []
seeds: [S37]                      # HARVEST, in the PLAN; the Flow's p0 says it in other words (F2)
key_variable: "R_sh, the known resistance that turns a measured voltage into a current"
time_scale: "none"
steps: 3                          # s0–s2
```

The Equation's format is as read for D1·060 (`D1-060-03-amplification.md`, `D1-060-05-decibels.md`) and checked again on
2026-10-20 in `C:\ExSightory\src\insight\packages\insight-core\src\registry\equationBlock.ts`: one `statement` per block;
`examples` give values for the right-hand side only; `rearrangements` take a `solveFor`, and the compiler does the
algebra and checks it.

**This spec holds D1·050's time table** (§2), as `D1-060-02` does for D1·060.

## 1. What the room must understand

- **Statement** (verbatim): *Measure the voltage across a known resistance, and Ohm's law gives the current. The shunt
  is a transducer, and the measurement is an indirect one.*
- **SHOW** (verbatim from the PLAN): *Equation — I = V_sh / R_sh, with a worked example: 20 mV across 10 mΩ → 2 A.*
- **Status** (verbatim): *ready.*
- **Drive / Look for**: *none in the PLAN.* Proposed (F3) Look for: *the current is never measured; a voltage is, and
  the known R_sh does the rest.*
- **Bench and library.** The **bench** is the Equation Bench. The **library** is this card's equation, `shunt-law`.
- **Insight**: *a shunt measures current indirectly: it turns the current into a voltage through a known resistance,
  and Ohm's law turns it back.*
- **Kind of knowledge**: *a relation between quantities* (a formula and its rearrangement). Card test → **Equation**.
  B17 applies (formula and rearrangement in one block). B15, B18 and B19 do not.
- **Why this bench, not a still**: the symbols carry their meaning on the bench (V_sh *the measured voltage*, R_sh *the
  known resistance*), the example is evaluated, not typed, and the rearrangement hands the room card 2's V = I·R in one
  press.
- **Key variable**: R_sh, the known resistance.

## 2. Time

The card's Flow is 67 words, all spoken: **0.52 min**.

| Beat | Minutes | Source of the number |
|---|---|---|
| s0 the law: p0 *"In the measurand module we met indirect measurement…"* (38) | 0.29 | 38 ÷ 130 |
| s1 the shunt: p1 *"That known resistance is a **shunt**…"* (29) | 0.22 | 29 ÷ 130 |
| s2 the example: unscripted (≈ 12 words: *"Twenty millivolts across ten milliohms: two amps. We measured a voltage."*) | 0.09 | estimate |
| s2 held: the HARVEST S37 line (16 words; in the PLAN, not the Flow: F2) | 0.12 | 16 ÷ 130 |
| **Card total / of which on the bench** | **0.7 / 0.7** | |

### The module, card by card (U014's measure; D1·050 `targetMinutes: 40`)

The Flow is 1,261 words. Two `[[demo]]` lines are directions and are not spoken: card 5's *"Electronics Bench: 2-wire
and 4-wire measurements of the same shunt, side by side."* (13) and card 6's *"Electronics Bench: increase the meter's
shunt resistance until the circuit under test browns out."* (14). The five `[[ask]]` questions (cards 2–6: 93 words)
are counted in their activities. The other `[[demo]]` lines are spoken sentences (*"Two equations on the bench…"*,
*"Switch on the burden voltage, and probe the load."*). That leaves **1,141 words spoken outside the activities =
8.8 min.**

| Card | Flow spoken | Beyond the Flow | Card | Source |
|---|---|---|---|---|
| 1 A shunt turns current into voltage | 0.52 | the example read 0.09; the HARVEST S37 line 0.12 | **0.7** | this spec |
| 2 Sizing a shunt: signal against disturbance | 1.51 | numeric ×2 ≈ 1.5 (their question included); moves between the two equations and the examples 0.1 | **3.1** | `D1-050-02-shunt-signal-and-power.md` §2 |
| 3 Low side or high side | 1.59 | the drive (probe both shunts, then the load's lower terminal) ≈ 0.8; flash quiz ≈ 0.75 | **3.1** | estimate (**Electronics widget deferred**; demonstration asked of Benches, crossing 493) |
| 4 The leads are part of the shunt | 1.31 | circuit predict ≈ 1.0; switching on the lead resistance ≈ 0.3 | **2.6** | estimate (**Electronics widget deferred**; crossing 494) |
| 5 Kelvin: separate the current from the measurement | 1.56 | circuit predict ≈ 1.0; the drive (2 m → 10 m, the breadboard contact) ≈ 0.6 | **3.2** | estimate (**Electronics widget deferred**; crossing 494) |
| 6 Burden voltage: the drop your ammeter inserts | 2.29 | circuit predict ≈ 1.0; the drive (10 mΩ → 10 Ω, burden on, probe, 0.1 Ω) ≈ 0.8; the HARVEST S36 question not in the Flow (*"Whose band are you standing in?"*) 0.04 | **4.1** | estimate (**Electronics widget deferred**; crossing 495) |
| **Module** | **8.8** | **8.1** | **16.9** | |

**D1·050 uses ≈ 17 of its 40 minutes, leaving ≈ 23 min unused** (F4). That is the pattern of D1·040 and D1·060 (≈ 21
min unused each). The owner cuts or adds; nothing is trimmed here. The Electronics estimates belong to those cards'
specs when the widgets are written, and live circuit demos tend to run long. This module's proposals add ≈ +0.2 min if
all are taken (card 1 F3 +0.05; card 2 F5 +0.15).

## 3. The scene: what is on the bench

### 3a. The equation (`shunt-law`)

| Field | Content | Source |
|---|---|---|
| `title` | *A shunt turns current into voltage* | the card |
| `statement` | `I = Vsh / Rsh` | the PLAN |
| `symbols` | `I` *Current through the shunt* (A); `Vsh` *Voltage measured across the shunt* (V); `Rsh` *Shunt resistance, known* (Ω) | the PLAN |
| `highlights` | symbol `Vsh` — *what is actually measured: a voltage* (azure); symbol `Rsh` — *the known resistance: the transducer, current in, voltage out* (teal) | the statement; the Flow's p1 |
| `source` | *Ohm's law* | standard circuit theory |
| `examples` | §3b | §8 |
| `rearrangements` | `solveFor: Vsh`, note *The same law the other way round, as the shunt does it: V_sh = I·R_sh. 2 A through 10 mΩ gives 20 mV; the next card sizes R_sh with it.* | the hand-off to card 2 (**Proposal**, F3) |
| `assumptions` | *R_sh is known and constant, and V_sh is read at the shunt's own terminals* — breaksWhen *the shunt heats (its value drifts with its temperature coefficient), or the voltage is read through the leads that carry the current: cards 4 and 5* — limiting | cards 4–5; the power of card 2 |
| `notes` | `include: true` | print |

No `graph`: the relation is a straight line through the origin, and card 2 graphs its two consequences.

### 3b. Worked examples

| # | Label | V_sh | R_sh | I | Note |
|---|---|---|---|---|---|
| E1 | *20 mV across 10 mΩ* | 0.020 V | 0.010 Ω | 2.000 A | *we measured 20 mV; the known 10 mΩ makes it 2 A* |

**Values beside their element**: the Symbols pane with values and units (shown with their prefixes: 20 mV, 10 mΩ,
2.000 A); the Example pane with I and its note; the Rearrangements pane with the compiler's formula and its note.

**Colours and their second channel** (C4): V_sh azure and R_sh teal, each with its words in the Terms pane.

## 4. The run: step by step, as the Flow goes

### 4a. Steps

| # | id | Flow paragraph | What changes (`say`) | Pane | Presenter's control |
|---|---|---|---|---|---|
| 0 | `s0-law` | p0 *"In the measurand module we met indirect measurement…"* | Measure the voltage across a known resistance; Ohm's law gives the current. | Symbols, `Vsh` pinned | pin |
| 1 | `s1-shunt` | p1 *"That known resistance is a **shunt**…"* | The known resistance is the shunt: a transducer from current to voltage. | Terms, `Rsh` pinned | pin |
| 2 | `s2-example` | unscripted; then the HARVEST S37 line | 20 mV across 10 mΩ is 2 A: we measured a voltage, and the shunt's value did the rest. | Example, E1 | pane |

### 4b. Motion, cues and stills

| # | Motion | Movers | Cue | Hold | Reduced motion | Still |
|---|---|---|---|---|---|---|
| 0–2 | none (pins and panes) | 0 | the pinned symbol lit in the statement; the example's value | hold | same | one per step |

## 5. Pacing and interaction, by surface and view

As in `D1-040-07-attenuation.md` §5: the presenter paces on the wall (pane and pin are mirrored); the learner paces in
Study Mode and Scope. Preview shows the statement and the current pane. View offers every pane (Symbols, Terms,
Example, Rearrangements, Assumptions). Edit is not specified for the Equation Bench. Authoring is the `equation`
block's YAML. Phone: the statement, then the pane, then the controls. **Locked**: none.

## 6. The frame

The Equation's frame (the Canvas header and footer; panes as pills, D4.17). Title *A shunt turns current into
voltage*.

## 7. Thinking, not watching

- **7a. The PLAN's ASK**: *none on this card.* Card 2's numeric follows at once.
- **7b. Prediction point**: none.
- **7c. After**: in Study, done means the Example pane was opened.
- **7d. Teacher tip** — **Proposal** (F3): *Some will hear "a shunt measures current". Ask: what does the meter across
  it actually read? A voltage; the current is computed.*
- **7e. Explore**: in Study, V_sh and R_sh in the Example pane's values (a 75 mV, 50 A panel shunt: 1.5 mΩ).

## 8. Faithfulness (the quality bar)

**Arithmetic.**
- I = V_sh / R_sh = 0.020 V / 0.010 Ω = **2.000 A** (the PLAN's 2 A ✓).
- The rearrangement: V_sh = I·R_sh = 2.000 × 0.010 = **0.020 V** ✓.
- Consistent with card 3 and D1·060 cards 1, 6, 7: 12 V across 6 Ω + 10 mΩ gives 12 / 6.010 = **1.997 A** and
  1.997 × 0.010 = **19.97 mV**, which this card rounds to 2 A and 20 mV. The same numbers, rounded (A7 ✓).
- §7e's panel shunt: 0.075 V / 50 A = **1.5 mΩ** (the 75 mV full-scale panel shunt is a standard class: shunts are
  sold by rated current at 50, 60, 75 or 100 mV).
- **Source of the real thing** (cited here only, never on a teaching surface): metal-element current-sense resistors,
  10 mΩ, 1 %, four-terminal, 1–3 W in a 2512 or similar package (Vishay WSL, Bourns CSS, Isabellenhütte BVR class
  datasheets).

**Section D, Equation rows**
- [x] Symbols match the course: V_sh and R_sh as the PLAN writes them; I for the current, as card 2's V = I·R.
- [x] The worked example is recomputed above.
- [x] No sliders (no graph).
- [x] n/a: no graph.

**A1–A8**: A1 ✓; A2 ✓ (the assumption names the non-ideal that cards 2, 4 and 5 show: heat and the leads); A3, A4, A5
n/a; A6 ✓ (the assumption on its pane); A7 ✓ (the rounding to card 3's 1.997 A and 19.97 mV, above); A8 ✓.

## 9. Faults and non-ideal behaviour

**PLAN FAULT**: none on this card. The assumption hands the non-ideal on: the shunt's self-heating (card 2's power)
and the leads in series with it (cards 4 and 5).

## 10. Accessibility, legibility and print

- Wall (C2): the statement and pane text at the Canvas's wall size. Check at 1920 × 1080 and 1024 × 768.
- Reduced motion: nothing animates.
- Colour (C4): V_sh and R_sh are labelled as well as coloured.
- Keyboard (C5): the Equation's pane and pin keys.
- Print (C8): the Equation's notes (statement, example, rearrangement, assumption).

## 11. Assets to make or source

| Asset | Format | Made by | Status |
|---|---|---|---|
| The `equation` block (§3a, §3b) | YAML in `en.md` | the author | to write |

## 12. Bench capabilities this needs

**Equation Bench**: statement, symbols, highlights, examples, rearrangements, assumptions, panes and pins mirrored:
**all exist**. **To confirm when written**: that symbols display with their SI prefix (20 mV, 10 mΩ) when given in
base units, as D6.14 asks; if not, the values are written in base units and the notes carry the prefixed forms.

## 13. Stand-in for the lecture

None needed.

## 14. Findings for the owner

- **F1 — The symbols.** The PLAN writes V_sh and R_sh; card 2's Flow writes V = I·R without subscripts. This card keeps
  `Vsh`, `Rsh` (the Equation's one letter and a subscript); card 2's spec uses the same symbols, so the two cards agree
  on the bench while the Flow keeps its spoken V = I·R. Keep (**recommended**), or drop the subscripts on both cards?
- **F2 — HARVEST S37 is not in the Flow word for word.** The PLAN's line is *"This is the indirect measurement from
  this morning: a voltage, a known resistance, and Ohm's law."*; the Flow's p0 says the same in other words (*"In the
  measurand module we met indirect measurement…"*). Counted in §2 as said over s2 (+0.12 min). Keep both
  (**recommended**: the line closes the card and points at the bench), or let p0 stand for it?
- **F3 — Proposals**: the rearrangement for V_sh (§3a), which hands the room card 2's V = I·R; the Look for (§1); the
  teacher tip (§7d). Take, or leave?
- **F4 — The module runs short (A7 of the schedule, not of the physics).** D1·050 uses ≈ 17 of its 40 minutes (§2),
  ≈ 23 min unused, as D1·040 and D1·060. Reported; nothing is trimmed or added here.

### Findings on the module's Electronics cards (3–6)

Their widgets are deferred (Electronics in development), so they have no spec; their numbers were checked here, and
their demonstrations are asked of Benches by crossings 493–495, which carry these findings. Nothing in `en.md` is
changed until the owner answers.

- **F5 — Card 3: the 6 Ω load runs at 96 % of a 25 W rating.** 12 V across 6.010 Ω is 1.997 A, and 1.997² × 6 =
  **23.93 W** in the PLAN's `resistor-power-25`. An aluminium-housed 25 W resistor reaches 25 W only on its specified
  heatsink; in free air it is rated far lower. Options: (a) draw it on its heatsink plate, as a real bench would
  (**recommended**: no number changes, gate 1 kept); (b) a 50 W part; (c) leave it. The shunt itself burns 1.997² ×
  0.010 = 39.9 mW (card 2's 40 mW ✓).
- **F6 — Card 4: 100.33 Ω against 100.34 Ω.** AWG 24 copper is 84.2 mΩ/m at 20 °C; two 2 m force leads are 4 m = 0.337 Ω,
  so the two-wire meter reads **100.34 Ω**, not the PLAN's 100.33 Ω. The Flow's *"a third of an ohm"* is right either
  way. Recommended: 100.34 Ω in the PLAN's reveal (one digit). The other numbers agree: 10 cm of AWG 24 is 8.42 mΩ, so
  the two-wire 10 mΩ shunt reads 10 + 2 × 8.42 = **26.8 mΩ**, 2.7 × (the Flow's *"near 27 mΩ: nearly three times"* ✓);
  10 m leads give 20 × 0.0842 = 1.684 Ω, **101.68 Ω** (*"about 101.7 Ω"* ✓).
- **F7 — Card 5: "the same shunt" is a Pt100.** The Flow's direction p0 reads *"Electronics Bench: 2-wire and 4-wire
  measurements of the same shunt, side by side."*, while the fixture measures a Pt100 at 1 mA. Options: (a) *"of the same
  sensor"* (**recommended**); (b) the demonstration shows both, the Pt100 and the 10 mΩ shunt (crossing 494 offers it),
  and the line stands.
- **F8 — Card 5: 10 V through 10 kΩ is 0.990 mA, not 1 mA.** 10 / (10 000 + 100 + 0.34) = **0.9900 mA**. If the meters
  show ohms as the voltage they read divided by a fixed 1 mA, they read 1 % low (99.0 Ω for the four-wire). The
  physics is right if the current is a precision 1.000 mA source, or if each reading is divided by the measured current.
  Recommended: a precision 1 mA source in the demonstration (the Flow's *"The same 1 mA flows"* then holds exactly);
  the PLAN's *"10 V through 10 kΩ"* would read *"a 1 mA source"*. The owner's call.
- **F9 — Card 6: 10 Ω does not brown out a 66 Ω load** (the brief of 2026-10-20, F3; the owner took the
  recommendation): the load sits at 2.866 V, above 2.7 V. The demonstration keeps 10 Ω as the reveal, and the brown-out
  comes from a radio burst: at 10 Ω any draw above (3.3 − 2.7) / 10 = **60 mA** takes the rail below 2.7 V.
- **F10 — Card 6: a handheld's 200 mA range is ≈ 1–2 Ω, not 10 Ω** (gate 2). A 3½-digit handheld measures current as
  the drop on a 200 mV full scale, so its 200 mA range uses a **1 Ω** shunt (plus its fuse and leads, ≈ 1.5–3 Ω in all;
  datasheets give the burden as ≈ 1–2 mV per mA on the 200–400 mA ranges). **10 Ω is its 20 mA range**, which a 50 mA
  load would overrange. The Flow's *"I turn it to 10 Ω, which is about what a handheld meter puts in circuit on its
  200 mA range"* is therefore not right as worded. Options:
  - (a) keep every number, and reword the comparison: *"10 Ω, which is what a handheld puts in circuit on its 20 mA
    range"* — but 50 mA is off that range's scale, so the meter would show an overload, not 43.4 mA;
  - (b) keep the words, and use the real ≈ 2 Ω: the resistor load then loses 3.3 × 2 / 68 = 0.097 V and 2.9 % of its
    current (48.5 mA), and the brown-out still happens with the microcontroller: a 300 mA Wi-Fi transmit burst (the
    class's datasheets give ≈ 250–350 mA peaks) through 2.5 Ω of shunt, fuse and leads drops 0.75 V, taking 3.3 V to
    2.55 V, below 2.7 V (**recommended**: true to the instrument, and the Flow's brown-out story is exactly what
    happens on real boards; the board's decoupling capacitors soften only the shortest bursts);
  - (c) keep 10 Ω and call it *"a cheap meter on its 200 mA range with its fuse and thin leads"* — not supported by the
    class's datasheets.

  Taking (b) changes the card's numbers (43.4 mA, 2.87 V, 13 %, the predict's options); they are the owner's to
  change. Crossing 495 asks Benches to build after the owner's choice.

## 15. Acceptance: how we know it is built right

- The Equation compiles. E1 shows I = 2.000 A. The Rearrangements pane shows the compiler's V_sh = I·R_sh, verified,
  with the note's 20 mV.
- B1 one pane or pin per step; B5 each `say` in the notes; B6 the pinned V_sh and R_sh lit; B13 statement and terms
  only; B16 values readable; B17 formula and rearrangement in one block.
- C2 legible at 1920 × 1080 and 1024 × 768; C4 V_sh and R_sh labelled; C5 pane keys; C6 at 320; C8 the notes.
