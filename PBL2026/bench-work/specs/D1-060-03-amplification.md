```yaml
id: D1-060-03-amplification
card: "Amplification, and undoing it"
module: notes/Day01/060-conditioning/en.md
bench: Equation                   # exists: statement, symbols, highlights, examples, rearrangements
library: "amplifier-gain: an Equation (V_out = G·V_in), defined in the card's `equation` block, with its rearrangement for V_in (what the firmware does)"
dimensions: 2D
stand_in: none
optional_benches: []
real_thing: "a voltage amplifier of gain 400 lifting a 5 mV sensor signal to 2 V for a 3.3 V ADC"
minutes: 0.7                      # on the bench: the Equation is up for the whole card
card_minutes: 0.7
status: spec-draft
learner_action: none
predictions: []
seeds: []
key_variable: "the gain G, and its inverse, what the firmware divides by"
time_scale: "none"
steps: 3                          # s0–s2
```

This card mirrors D1·040 card 7 (`D1-040-07-attenuation.md`): the hardware's formula, then the firmware's formula
turned round. The Equation's format is as read there; `rearrangements` take a `solveFor`, and the compiler does the
algebra and checks it.

## 1. What the room must understand

- **Statement** (verbatim): *Multiply a small signal by a known gain until the next stage can use it: 5 mV becomes 2 V.
  In firmware, divide by the same gain to recover what the sensor said.*
- **SHOW** (verbatim from the PLAN): *Equation — V_out = G·V_in, rearranged to what the firmware does: V_in = V_out /
  G. Worked example: 5 mV × 400 = 2 V.*
- **Status** (verbatim): *ready.*
- **Drive / Look for**: *none in the PLAN.* Proposed (F3) Look for: *the firmware's formula is the amplifier's, turned
  round.*
- **Bench and library.** The **bench** is the Equation Bench. The **library** is this card's equation,
  `amplifier-gain`.
- **Insight**: *a known gain can always be undone; the firmware divides by the same G the hardware multiplied by.*
- **Kind of knowledge**: *a relation between quantities* (a formula and its rearrangement). Card test → **Equation**.
  B17 applies (formula and rearrangement side by side). B15, B18 and B19 do not.
- **Why this bench, not a still**: the rearrangement is the compiler's, checked against the formula, and the worked
  value is evaluated rather than typed. The presenter goes from the hardware's formula to the firmware's in one press,
  as on D1·040 card 7.
- **Key variable**: G, and dividing by it.

## 2. Time

The Flow is 76 words, all spoken: **0.58 min**.

| Beat | Minutes | Source of the number |
|---|---|---|
| s0 the statement: p0 *"In **amplification**, we take a small signal…"* (42) | 0.32 | 42 ÷ 130 |
| s1 the example: unscripted (≈ 20 words: *"Five millivolts times four hundred: two volts, well inside a 3.3 V converter's range."*) | 0.15 | estimate |
| s2 the firmware: p1 *"Once the signal reaches the microcontroller…"* (34) | 0.26 | 34 ÷ 130 |
| **Card total / of which on the bench** | **0.7 / 0.7** | |

**Module check**: `D1-060-02-what-conditioning-does.md` §2.

## 3. The scene: what is on the bench

### 3a. The equation (`amplifier-gain`)

| Field | Content | Source |
|---|---|---|
| `title` | *Amplification* | the card |
| `statement` | `Vout = G * Vin` | the PLAN |
| `symbols` | `Vout` *Amplified output* (V); `G` *Gain* (no unit; V/V); `Vin` *Input signal* (V) | the PLAN |
| `highlights` | symbol `G` — *the gain: 400 in the example; known, so it can be undone* (teal) | the statement |
| `examples` | *5 mV → 2 V*: Vin 0.005, G 400 → Vout 2.000 V, note *2.000 V sits inside a 3.3 V converter's range: 61 % of it* | §8; the PLAN's worked example |
| `rearrangements` | `solveFor: Vin`, note *What the firmware does: it reads V_out and divides by G. At 2.000 V and G = 400 that gives back 5.000 mV.* | the PLAN's rearrangement |
| `assumptions` | *G is exactly known and the amplifier adds nothing of its own* — breaksWhen *the amplifier has an input offset or bias current: cards 8 and 9, where its own errors are amplified with the signal* — limiting | the module's motivates line (F2) |
| `notes` | `include: true` | print |

No `graph`: the relation is a straight line through the origin, and card 8's Plot draws that line with its ceiling.

**Values beside their element**: the Symbols pane with values and units; the Example pane with V_out and its note; the
Rearrangements pane with the compiler's V_in formula and its note.

**Colours and their second channel** (C4): G teal, with its label in the Terms pane.

## 4. The run: step by step, as the Flow goes

### 4a. Steps

| # | id | Flow paragraph | What changes (`say`) | Pane | Presenter's control |
|---|---|---|---|---|---|
| 0 | `s0-gain` | p0 *"In **amplification**, we take a small signal…"* | The amplifier multiplies its input by a known gain, G. | Symbols, G pinned | pin |
| 1 | `s1-example` | unscripted | Five millivolts times 400 is two volts: something the converter can use. | Example | pane |
| 2 | `s2-firmware` | p1 *"Once the signal reaches the microcontroller…"* | The firmware turns the formula round: it divides what it reads by 400 to get the 5 mV back. | Rearrangements | pane |

### 4b. Motion, cues and stills

| # | Motion | Movers | Cue | Hold | Reduced motion | Still |
|---|---|---|---|---|---|---|
| 0–2 | none (pane changes) | 0 | the pinned G; the example's value; the rearranged formula | hold | same | one per step |

## 5. Pacing and interaction, by surface and view

As in `D1-040-07-attenuation.md` §5: the presenter paces on the wall (pane and pin are mirrored); the learner paces in
Study Mode and Scope. Preview shows the statement and the current pane. View offers every pane (Symbols, Terms,
Example, Rearrangements, Assumptions). Edit is not specified for the Equation Bench. Authoring is the `equation`
block's YAML. Phone: the statement, then the pane, then the controls. **Locked**: none.

## 6. The frame

The Equation's frame (the Canvas header and footer; panes as pills, D4.17). Title *Amplification*.

## 7. Thinking, not watching

- **7a. The PLAN's ASK**: *none on this card.*
- **7b. Prediction point**: none.
- **7c. After**: in Study, done means the Rearrangements pane was opened.
- **7d. Teacher tip** — **Proposal** (F3): *After D1·040 card 7, some will say "the firmware multiplies". Ask: the
  attenuator multiplied by 0.2 and the firmware by 5; the amplifier multiplies by 400, so what does the firmware do?*
- **7e. Explore**: in Study, G and V_in in the Example pane's values.

## 8. Faithfulness (the quality bar)

**Arithmetic.**
- V_out = 400 × 0.005 V = **2.000 V**; 2.000 / 3.3 = **60.6 %** of a 3.3 V range.
- The firmware: V_in = V_out / G = 2.000 / 400 = **5.000 mV**.
- Before the gain, 5 mV is 0.15 % of 3.3 V: about **6 codes** of a 12-bit converter (0.005 / 3.3 × 4096 = 6.2). After
  it, 2.000 V is **2,482 codes**. This is the reason for the gain; it goes in the teacher's notes and is not shown on
  the bench (F3).

**Section D, Equation rows**
- [x] Symbols match the course: G for the amplifier's gain, as cards 8 and 9 use it; V_in and V_out as D1·040 card 7.
  Card 4 uses G for the **open-loop** gain (F1).
- [x] The worked example is recomputed above.
- [x] No sliders (no graph).
- [x] n/a: no graph.

**A1–A8**: A1 ✓; A2 ✓ (the assumption names what cards 8 and 9 show); A3, A4, A5 n/a; A6 ✓ (the assumption sits on its
pane); A7 ✓ (the form matches D1·040 card 7; the 2.0 V and the 3.3 V range are cards 6 and 8's); A8 ✓.

## 9. Faults and non-ideal behaviour

**PLAN FAULT**: none on this card. The assumption hands the non-ideal on to cards 8 and 9.

## 10. Accessibility, legibility and print

- Wall (C2): the statement and pane text at the Canvas's wall size. Check at 1920 × 1080 and 1024 × 768.
- Reduced motion: nothing animates.
- Colour (C4): G is labelled as well as coloured.
- Keyboard (C5): the Equation's pane keys.
- Print (C8): the Equation's notes (statement, example, rearrangement, assumption).

## 11. Assets to make or source

| Asset | Format | Made by | Status |
|---|---|---|---|
| The `equation` block (§3a) | YAML in `en.md` | the author | to write |

## 12. Bench capabilities this needs

**Equation Bench**: statement, symbols, highlights, examples, rearrangements, assumptions, panes and pins mirrored:
**all exist**. **To confirm when written**: as in D1·040 card 7, that the Rearrangements pane shows the note's worked
value beside the compiler's formula.

## 13. Stand-in for the lecture

None needed.

## 14. Findings for the owner

- **F1 (A7) — G means two different gains in this module.** Cards 3, 6, 8 and 9 use G for the amplifier's gain (100,
  400, 500), which is a **closed-loop** gain. Card 4 uses G for the **open-loop** gain (10⁵) and A_cl for the
  closed-loop gain, following the transcript's G(s), H(s). The options:
  - (a) keep the owner's symbols, and label them on the bench: card 4's `G` reads *open-loop gain (the amplifier on its
    own)*, and its `Acl` reads *closed-loop gain: the G of cards 3, 8 and 9* (**recommended**: no text changes, and the
    link is made on the bench);
  - (b) rename card 4's open-loop gain to A_ol in the PLAN and the Equation (the Flow's G(s) stays the transcript's).
- **F2 — Proposal: the assumption** (*G exactly known, nothing added*) hands off to cards 8 and 9.
- **F3 — Proposals**: the Look for (§1), the teacher tip (§7d), and the codes before and after the gain (6 against
  2,482) as a second example (*why gain: 6 codes become 2,482*, +0.1 min). Take, or leave?

## 15. Acceptance: how we know it is built right

- The Equation compiles. The example shows V_out = 2.000 V. The Rearrangements pane shows the compiler's V_in = V_out /
  G, verified, with the note's 5.000 mV.
- B1 one pane per step; B5 each `say` in the notes; B6 the pinned G lit; B13 statement and terms only; B16 values
  readable; B17 formula and rearrangement side by side.
- C2 legible at 1920 × 1080 and 1024 × 768; C4 G labelled; C5 pane keys; C6 at 320; C8 the notes.
