```yaml
id: D1-040-07-attenuation
card: "Attenuation: making a large signal smaller"
module: notes/Day01/040-sensor-as-source/en.md
bench: Equation                   # exists: statement, symbols, highlights, examples, rearrangements
library: "attenuator: an Equation (V_out = V_in·R2/(R1 + R2)), defined in the card's `equation` block, with its rearrangement for V_in (what the firmware does)"
dimensions: 2D
stand_in: none
optional_benches: []
real_thing: "a two-resistor attenuator of 1 % E24 metal-film resistors, 12 kΩ over 3.0 kΩ, dividing 10 V to 2 V"
minutes: 0.8                      # on the bench: the Equation is up for the whole card
card_minutes: 0.8
status: spec-draft
learner_action: none
predictions: []
seeds: []
key_variable: "the ratio R2/(R1 + R2), and its inverse, the factor the firmware multiplies by"
time_scale: "none"
steps: 3                          # s0–s2
```

The Equation's format as in `D1-040-06-high-in-low-out.md` (read 2026-10-08): `rearrangements` take a
`solveFor`, and the compiler does the algebra and checks it numerically, so the firmware's formula is
derived, never typed.

## 1. What the room must understand

- **Statement** (verbatim): *A signal too large for the next stage is scaled down by a known factor, and the
  firmware multiplies that factor back in later.*
- **SHOW** (verbatim from the PLAN): *Equation — V_out = V_in·R2/(R1 + R2), rearranged to what the firmware does:
  V_in = V_out·(R1 + R2)/R2. Worked example: 10 V → 2 V with a ratio of 0.2.*
- **Drive**: *none in the PLAN.*
- **Look for**: *none in the PLAN.* Proposed (F5): *the firmware's formula is the divider's, turned round.*
- **Status** (verbatim): *ready. (The next card builds it as a circuit.)*
- **Bench and library.** The **bench** is the Equation Bench. The **library** is this card's equation,
  `attenuator`.
- **Insight**: *an attenuator multiplies by a known ratio, so the firmware gets the original back by dividing
  by the same ratio.*
- **Kind of knowledge**: *a relation between quantities* (a formula and its rearrangement). Card test →
  **Equation**. B17 applies (the formula and its rearrangement side by side in the Rearrangements pane). B15,
  B18, B19 do not.
- **Why this bench, not a still**: the rearrangement is the compiler's, checked against the formula, and the
  worked value is evaluated rather than typed; the presenter moves from the hardware's formula to the
  firmware's in one press.
- **Key variable**: the ratio, and its inverse.

## 2. Time

The Flow is 78 words, all spoken: **0.60 min**.

| Beat | Minutes | Source of the number |
|---|---|---|
| s0 the statement: p0 *"**Attenuation** makes a large signal smaller…"* (33) | 0.25 | 33 ÷ 130 |
| s1 the example: unscripted (≈ 25 words: *"12 k over 3 k: a ratio of 0.2, so 10 V comes out as 2 V"*) | 0.19 | estimate |
| s2 the firmware: p1 *"Just as with amplification…"* (45) | 0.35 | 45 ÷ 130 |
| **Card total / of which on the bench** | **0.8 / 0.8** | +0.1 with F4 |

**Module check**: `D1-040-01-interface.md` §2.

## 3. The scene: what is on the bench

### 3a. The equation (`attenuator`)

| Field | Content | Source |
|---|---|---|
| `title` | *Attenuation* | the card |
| `statement` | `Vout = Vin * R2 / (R1 + R2)` | the PLAN |
| `symbols` | `Vout` *Attenuated output* (V); `Vin` *Input signal* (V); `R1` *Upper resistor* (Ω); `R2` *Lower resistor* (Ω) | the PLAN |
| `highlights` | term `R2 / (R1 + R2)` — *the ratio: 0.2 in the example* (teal) | the PLAN's *ratio of 0.2* |
| `derivation` | 1 `I = Vin / (R1 + R2)` — *one current through both resistors (nothing else draws on the midpoint)*; 2 `Vout = I * R2` — *the output is the drop across R2*; 3 the statement | Ohm's law; series resistors |
| `examples` | *10 V → 2 V*: Vin 10, R1 12000, R2 3000 → Vout 2.000 V, note *R2/(R1 + R2) = 3 k / 15 k = 0.2* | §8; the PLAN's worked example |
| `rearrangements` | `solveFor: Vin`, note *What the firmware does: it reads V_out and multiplies by (R1 + R2)/R2, here 15 k / 3 k = 5. At 2.000 V that gives back 10.00 V.* | the PLAN's rearrangement |
| `assumptions` | *nothing draws current from the midpoint* — breaksWhen *the next stage loads the divider: card 8, and the ADC's input (D1·070)* — limiting | the derivation's step 1 (F3) |
| `notes` | `include: true` | print |

No `graph` (F4).

**Values beside their element**: the Symbols pane with values and units; the Example pane with V_out and its
note; the Rearrangements pane with the compiler's V_in formula and its note.

**Colours and their second channel** (C4): the ratio teal, with its label in the Terms pane.

## 4. The run: step by step, as the Flow goes

### 4a. Steps

| # | id | Flow paragraph | What changes (`say`) | Pane | Presenter's control |
|---|---|---|---|---|---|
| 0 | `s0-ratio` | p0 *"**Attenuation** makes a large signal smaller…"* | The divider scales its input by a fixed ratio, R2 over R1 plus R2. | Symbols, the ratio pinned | pin |
| 1 | `s1-example` | unscripted | 12 kΩ over 3 kΩ is a ratio of 0.2: 10 V comes out as 2 V. | Example | pane |
| 2 | `s2-firmware` | p1 *"Just as with amplification…"* | The firmware turns the formula round: it multiplies what it reads by 5 to get the 10 V back. | Rearrangements | pane |

### 4b. Motion, cues and stills

| # | Motion | Movers | Cue | Hold | Reduced motion | Still |
|---|---|---|---|---|---|---|
| 0–2 | none (pane changes) | 0 | the pinned ratio; the example's value; the rearranged formula | hold | same | one per step |

## 5. Pacing and interaction, by surface and view

**Who paces** (B12): the presenter on the wall (pane and pin mirrored); the learner in Study Mode and Scope.

| View | Who | Controls |
|---|---|---|
| Preview (in the slide) | everyone | the statement and the current pane |
| View (details) | everyone | every pane: Symbols, Terms, Proof (the derivation), Example, Rearrangements, Assumptions |
| Edit (session only) | everyone | not specified for the Equation Bench |
| Authoring | authors | the `equation` block's YAML |

- **The presenter's strip** (B20): the pane and pin controls; the next step's `say`; the suggested words for
  s1; the teacher tip.
- **Study / Scope**: every pane; the derivation stepped.
- **Phone** (C6): the statement, then the pane, then the controls.
- **Locked**: none.

## 6. The frame

The Equation's frame (the Canvas header and footer; panes as pills, D4.17). Title *Attenuation*.

## 7. Thinking, not watching

- **7a. The PLAN's ASK**: *none on this card.* Card 8's numeric (the ratio for 12 V into 3.3 V) uses it straight
  away.
- **7b. Prediction point**: none.
- **7c. After**: card 8's numeric. Study done = the Rearrangements pane opened.
- **7d. Teacher tip** — **Proposal** (F5): *Expect the firmware to "multiply by 0.2". Ask: the divider already
  multiplied by 0.2; what undoes it?*
- **7e. Explore**: none (the next card varies the values).

## 8. Faithfulness (the quality bar)

**Arithmetic.**
- Ratio: 3.0 k / (12 k + 3.0 k) = 3 / 15 = **0.200**; V_out = 10 × 0.2 = **2.000 V**.
- The firmware's factor: (R1 + R2)/R2 = 15 / 3 = **5.00**; 2.000 × 5 = **10.00 V** (F4's second example: 1.234 V
  × 5 = **6.170 V**).
- The divider's standing current: 10 V / 15 kΩ = **0.667 mA**; its output impedance R1 ∥ R2 = 12 × 3 / 15 =
  **2.40 kΩ** (card 8 picks this up; not shown here).
- **Why 12 k and 3.0 k**: both are E24 values (E24 lists 1.2 and 3.0), and they give 0.2 exactly; the PLAN gives
  only the ratio (F2). 1 % parts leave the ratio within ±1.6 % worst case (each resistor's 1 % enters the ratio
  scaled by R1/(R1 + R2) = 0.8: 2 × 0.8 × 1 %), a point for D1·020's error budget, not this card.

**Section D, Equation rows**
- [x] Symbols match the course: R1 upper, R2 lower, as card 8's *R2/(R1 + R2)*; V_in, V_out.
- [x] The worked example recomputed above.
- [x] No sliders (no graph).
- [x] n/a: no graph.

**A1–A8**: A1 ✓ (E24 values, the arithmetic); A2 ✓ (the assumption names the loading this card ignores); A3, A4,
A5 n/a; A6 ✓ (the assumption on its pane); A7 ✓ (R1 over R2 and the ratio's form are card 8's; card 8's 0.275
and 27 k / 10 k use the same formula); A8 ✓.

## 9. Faults and non-ideal behaviour

**PLAN FAULT**: none on this card. The non-ideal (the next stage loading the divider) is named in the
assumption and is card 8's subject.

## 10. Accessibility, legibility and print

- Wall (C2): the statement and pane text at the Canvas's wall size. Check at 1920 × 1080 and 1024 × 768.
- Reduced motion: nothing animates.
- Colour (C4): the ratio labelled as well as coloured.
- Keyboard (C5): the Equation's pane keys.
- Print (C8): the Equation's notes: statement, derivation, example, rearrangement, assumption.

## 11. Assets to make or source

| Asset | Format | Made by | Status |
|---|---|---|---|
| The `equation` block (§3a) | YAML in `en.md` | the author | to write |

## 12. Bench capabilities this needs

**Equation Bench**: statement, symbols, highlights, derivation, examples, rearrangements, assumptions, panes and
pins mirrored: **all exist**. **To confirm when written**: that the Rearrangements pane shows the note's worked
value beside the compiler's formula (the examples are for the statement's right-hand side only).

## 13. Stand-in for the lecture

None needed.

## 14. Findings for the owner

- **F1 — "Multiplies by the attenuation factor."** The divider multiplies by the ratio, 0.2; the firmware
  multiplies by its inverse, 5. The Flow's p1 is right if *attenuation factor* means 5 (V_in/V_out), and reads
  wrong if it means the ratio the card has just named (0.2). This spec writes both numbers on the bench (*the
  ratio 0.2*; *multiplies by 5*). Leave the Flow (**recommended**: the bench disambiguates), or change p1 to
  *"it multiplies by the inverse of the ratio, 5"*?
- **F2 — The resistor values.** The PLAN gives the ratio only; the Equation needs R1 and R2. This spec uses
  **12 kΩ over 3.0 kΩ** (E24, exactly 0.2). Keep (**recommended**), or another pair (39 k / 10 k gives 0.204,
  2.04 V)?
- **F3 — Proposal: the assumption** (*nothing draws current from the midpoint; breaks when the next stage loads
  it*): the handoff to card 8.
- **F4 — Proposal: no graph, and a second firmware value.** A graph of V_out against V_in with R1, R2 sliders
  would hand card 8's numeric away; this spec leaves it out (**recommended**). A second rearrangement value, *the
  ADC reads 1.234 V: the firmware reports 6.170 V*, makes the firmware's job concrete (+0.1 min). Take, or leave?
- **F5 — Proposals**: the Look for (§1) and the teacher tip (§7d).

## 15. Acceptance: how we know it is built right

- The Equation compiles; the example shows V_out = 2.000 V; the Rearrangements pane shows the compiler's
  V_in = V_out·(R1 + R2)/R2, verified, with the note's 10.00 V.
- B1 one pane per step; B5 each `say` in the notes; B6 the pinned ratio lit; B13 statement and terms only; B16
  values readable; B17 formula and rearrangement side by side.
- C2 legible at 1920 × 1080 and 1024 × 768; C4 the ratio labelled; C5 pane keys; C6 at 320; C8 the notes.
