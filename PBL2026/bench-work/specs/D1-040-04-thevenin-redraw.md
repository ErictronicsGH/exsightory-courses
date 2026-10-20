```yaml
id: D1-040-04-thevenin-redraw
card: "Every source has an output impedance"
module: notes/Day01/040-sensor-as-source/en.md
bench: Draw                       # the target, and it exists (M59)
library: "thermistor-thevenin (`thermistor-thevenin.benchdrawing`): D1·030 card 6's NTC divider redrawn in three panels, the divider, the view looking back, the Thévenin source with its load"
dimensions: 2D
stand_in: none                    # traces, fades and steps play on the wall today
optional_benches: []
real_thing: "a 10 kΩ NTC thermistor (B25/85 = 3950 K) under a 10 kΩ 1 % resistor on a 3.3 V supply, the same circuit as D1·030 card 6; drawn in IEC symbols"
minutes: 2.7                      # on the bench: the drawing is up for the whole card, the numeric included
card_minutes: 2.7
status: spec-draft
learner_action: numeric
predictions: []                   # the PLAN's numeric is the prediction (it fires after s1, before the reveal)
seeds: [S35]                      # planted in the Flow's last paragraph, over s4 held
key_variable: "the resistance seen looking back into the midpoint: 10 kΩ ∥ 10 kΩ = 5 kΩ at 25 °C"
time_scale: "none (traces only)"
steps: 5                          # s0–s4
```

## 1. What the room must understand

- **Statement** (verbatim): *A sensor and its excitation behave like an ideal source behind an output
  impedance. Whatever you connect becomes the bottom half of a divider with it.*
- **SHOW** (verbatim from the PLAN): *Draw — the 10 k NTC and its 10 kΩ excitation resistor from 030, redrawn
  step by step: the supply and the two resistors → a Thévenin source, 1.65 V behind 5 kΩ at 25 °C → a load
  hung beneath it, visibly the bottom half of a new divider.*
- **Drive**: *none in the PLAN*; the steps follow the Flow.
- **Look for** (verbatim): *the thermistor circuit turning into "a voltage behind a resistance".*
- **Status** (verbatim): *needs Draw: Thévenin redraw of the thermistor divider.*
- **Bench and library.** The **bench** is the Draw Bench (M59). The **library** is a new drawing,
  `thermistor-thevenin`, built for this card.
- **Insight**: *seen from its output, the thermistor circuit is just 1.65 V behind 5 kΩ, so anything I
  connect makes a new divider with that 5 kΩ.*
- **Kind of knowledge**: *a picture built up* (a circuit redrawn into its equivalent). Card test → **Draw**.
  B17 applies loosely (the circuit and its equivalent side by side: all three panels stay up). B15, B18, B19
  do not.
- **Why this bench, not a still**: the equivalence is a sequence (look back, short the supply, see the
  parallel pair, collapse it to one source and one resistor, then hang a load), and the numeric has to
  fire between the looking and the answer. A still gives the answer away.
- **Key variable**: the resistance seen looking back into the midpoint.

## 2. Time

The Flow is 205 words, all spoken (p2's *"[[demo]] Let me redraw it…"* is spoken): **1.58 min**.

| Beat | Minutes | Source of the number |
|---|---|---|
| s0 the divider: p0 *"Every signal source has an **output impedance**…"* (20), p1 *"Take the thermistor circuit…"* (29) | 0.38 | 49 ÷ 130 |
| s1 looking back: p2 *"[[demo]] Let me redraw it…"* (40) | 0.31 | 40 ÷ 130 |
| the ASK: p3 *"[[ask]] At 25 °C, what output impedance…"* (15) | 0.12 | 15 ÷ 130 |
| numeric answer window and the spread of answers | 1.00 | estimate: a typed number |
| s2, s3 the reveal: p5 *"[[reveal]] Looking back into the midpoint…"* (49) | 0.38 | 49 ÷ 130 |
| s4 the load: p6 *"Now hang a load beneath it…"* (31) | 0.24 | 31 ÷ 130 |
| s4 held: p7 *"Write down five kilohms…"* (21, SEED S35) | 0.16 | 21 ÷ 130 |
| Waiting on traces not covered by speech (5 steps, ≈ 1.2 s each) | 0.10 | estimate |
| **Card total / of which on the bench** | **2.7 / 2.7** | +0.2 with F2 and F3 |

p5 is long and spans two steps: s2 lands on its first sentence, s3 on *"The thermistor circuit is a 1.65 V
source behind 5 kΩ"*. **Module check**: `D1-040-01-interface.md` §2.

## 3. The scene: what is on the bench

Artboard **1600 × 900** drawing units. Three panels left to right, each with a header in role `note`; all
stay up once drawn (B4, B17). Drawn in IEC symbols (resistor a rectangle 44 × 130; the NTC the resistor with
the IEC thermistor's diagonal and foot, and *−t°*; the supply a circle marked + and −). Ink names from the
Draw palette (D12.15), never hex.

**Panel A, the divider (x 80–520)**, header *the thermistor divider (D1·030)*:

| id | Item | Value, and its source | Drawn as |
|---|---|---|---|
| `a-supply` | the supply, circle at (130, 450), r 40 | 3.3 V (D1·030 card 6's excitation; the Flow's p1) | `outline`, `contrast`; *3.3 V* in role `value` beside it |
| `a-r1` | the excitation resistor, body (330, 215–345) | 10 kΩ, 1 % (D1·030 card 6) | `outline`; *10 kΩ* beside |
| `a-ntc` | the NTC, body (330, 555–685) | 10.00 kΩ at 25 °C, B25/85 = 3950 K (InsightDemo part `thermistor-ntc-10k`, as D1·030 card 6) | `outline`; *NTC 10 kΩ at 25 °C* beside |
| `a-wires` | top rail y 170, bottom rail y 730, ground at x 230 | — | `outline` |
| `a-mid` | the midpoint node (330, 450), a wire to the output terminals at x 500 (y 450 and 730) | 1.65 V = 3.3 × 10 / (10 + 10) | dot and open terminals; *MID 1.65 V* in role `value` |
| `a-look` | an arrow pointing left between the terminals into the circuit, x 630 → 510, y 590 | — | `outline`, `amber`, `arrow` end; *looking back in* and *a voltage · a resistance* in role `note`, `amber` |

**Panel B, looking back for changes (x 640–1000)**, header *looking back, for changes*:

| id | Item | Value | Drawn as |
|---|---|---|---|
| `b-pair` | the two resistors side by side between a top wire (MID, y 330) and the bottom wire (y 640): R1 at x 730, the NTC at x 870 | 10 kΩ and 10 kΩ | `outline`, `contrast`; values beside |
| `b-terms` | the output terminals at x 960 | — | open terminals |
| `b-par` | *10 kΩ ∥ 10 kΩ = 5 kΩ* under the pair | 5.00 kΩ (§8) | role `value`, `teal` |
| `b-short` | *an ideal supply is a short for any change* | the Flow's p5 | role `note` (the simplification label, A6) |

**Panel C, the Thévenin source and its load (x 1080–1540)**, header *one source behind one resistance*:

| id | Item | Value | Drawn as |
|---|---|---|---|
| `c-source` | the Thévenin source, circle at (1130, 450) | 1.65 V | `outline`, `teal`; *1.65 V* beside |
| `c-rth` | its output resistance, body (1330, 215–345) | 5 kΩ at 25 °C | `outline`, `teal`; *5 kΩ at 25 °C* beside |
| `c-out` | the output node (1330, 450), terminals at x 1470; rails as panel A | — | dot and terminals |
| `c-load` | the load, body (1330, 555–685), from the output node to the bottom rail | none: *R_L, whatever you connect* | `outline`, `amber`; label in role `label` |
| `c-bracket` | a bracket left of the two resistors (x 1260, y 215–685) | — | `thin`, `amber`; *a new divider: the load is its bottom half* in role `note`, centred under the load |

Panel C is drawn in the same positions as panel A (source, top resistor, node at y 450, bottom resistor),
so the new divider *looks* like the old one: the eye compares them across the artboard. The preview
(`bench-work/previews/d1-040-04-thevenin.svg`) is the layout check.

**Meet the parts** (B3): s0 is panel A alone, every part labelled with its value; the room met this circuit
in D1·030 card 6.

**Values beside their element** (B14, B16): each value beside its part, in role `value`; no table.

**Labels**: on their parts; nothing moves, so leaders are allowed (none are needed).

**Colours and their second channel** (C4):

| Thing | Ink | Second channel |
|---|---|---|
| The original circuit | `contrast` | — |
| The looking-back arrow and the load (what you add) | `amber` | the arrow's head; the label *R_L*; the bracket's words |
| The equivalent (the 5 kΩ, the Thévenin source) | `teal` | the values *5 kΩ*, *1.65 V* written on them |

**Key views**: *Home* (all three panels); framings `divider` (panel A), `equivalent` (panels B and C) for
Study's zoom.

## 4. The run: step by step, as the Flow goes

### 4a. Steps

| # | id | Flow paragraph (first words) | What changes: the step's one sentence (B5; the `say`) | Overlay | Presenter's control |
|---|---|---|---|---|---|
| 0 | `s0-divider` | p0 *"Every signal source…"*, p1 *"Take the thermistor circuit…"* | The thermistor divider: a 10 k NTC under 10 kΩ on 3.3 V; at 25 °C the midpoint sits at 1.65 V. | *MID 1.65 V* | (the Canvas is up) |
| 1 | `s1-looking-back` | p2 *"[[demo]] Let me redraw it…"*; then the ASK | Whatever we connect to the midpoint sees a voltage, and a resistance looking back into the circuit. | *looking back in* | Next; then the numeric opens |
| 2 | `s2-for-changes` | p5 *"[[reveal]] Looking back into the midpoint…"* (first sentence) | For any change the supply is a short, so the two 10 kΩ resistors sit in parallel: 5 kΩ. | *10 kΩ ∥ 10 kΩ = 5 kΩ* | Next, after the numeric closes |
| 3 | `s3-thevenin` | p5 *"…The thermistor circuit is a 1.65 V source behind 5 kΩ…"* | The thermistor circuit is one source, 1.65 V, behind one resistance, 5 kΩ, which changes with temperature. | *1.65 V · 5 kΩ* | Next |
| 4 | `s4-load` | p6 *"Now hang a load beneath it…"*; held through p7 | A load hung beneath it makes a new divider, and the load is its bottom half. | *a new divider* | Next leads to card 5 |

### 4b. Motion, cues and stills per step

| # | Motion (Draw entries, M59d) | Movers | Cue and its second channel (B6) | Hold | Reduced motion (C3) | Still (B4) |
|---|---|---|---|---|---|---|
| 0 | panel A traces: rails, supply, R1, NTC, then the node and terminals; values fade in | 1 at a time | the trace runs round the loop, supply first | hold | whole | the divider |
| 1 | `a-look` traces right to left into the terminals; its words fade in | 1 | the arrow's head ends at the midpoint | hold | whole | looking back |
| 2 | panel B traces: the pair, then the terminals; `b-par` and `b-short` fade in | 1 at a time | the two resistors drawn side by side, then their sum | hold | whole | the parallel pair |
| 3 | panel C's source, rails, `c-rth`, node and terminals trace; values fade in | 1 at a time | the trace ends on the 5 kΩ | hold | whole | the equivalent |
| 4 | `c-load` traces down from the node; `c-bracket` and its words fade in | 1 | the load drawn hanging under the 5 kΩ | hold | whole | the new divider (the whole card) |

Five stills, one per step. Nothing flashes.

## 5. Pacing and interaction, by surface and view

**Who paces** (B12): the presenter on the wall; the learner in Study Mode and Scope.

| View | Who | Controls |
|---|---|---|
| Preview (in the slide) | everyone | Back · Next · *step n of 5* · Replay |
| View (details) | everyone | the step list with each `say`; zoom to `divider`, `equivalent`; *Home* |
| Edit (session only) | everyone | ink, a pinned note (request X6; not yet specified for the Draw Bench) |
| Authoring | authors | the Draw editor; the steps and `say` lines in the file |

- **The presenter's strip** (B20): the next step's `say`; at s1 the reminder *the numeric fires now; s2 is
  the reveal*; the teacher tip.
- **Study and Scope**: the learner steps; s2 waits until their numeric is answered (§7a).
- **Phone** (C6): portrait, the three panels stacked A, B, C; the step's `say` under them; two fingers zoom.
- **Locked**: s2–s4 until the numeric closes (the presenter does not press Next; in Study the step waits on
  the answer, a Draw Bench capability to confirm, §12).

## 6. The frame

The Draw Bench's frame (M59). Identity bar: *Every source has an output impedance · ● Holding · step n of
5*. Legend card: *amber: what you connect · teal: the equivalent*; *IEC symbols; an ideal supply*.

## 7. Thinking, not watching

- **7a. The PLAN's ASK** (verbatim): *numeric (before the drawing's last step) — "At 25 °C, what output
  impedance does the 10 k thermistor with its 10 kΩ resistor present?" answer: 5 kΩ ± 0.1 kΩ · reveal: the
  drawing's last step. · explain: Looking back into the midpoint, the supply is a short for changes, so the
  two 10 kΩ resistors appear in parallel: 5 kΩ. · depth: understand · practice: developing models.* It fires
  at p3, **after s1**; **s2 and s3 reveal it** (the Flow's `[[reveal]]`), not the last step (F1).
- **7b.** The numeric is the prediction.
- **7c. After**: the explain. Study done = the numeric answered and s4 reached.
- **7d. Teacher tip** — **Proposal** (F4): *Expect 20 kΩ (the two in series, as the supply sees them) and 10 kΩ
  (the NTC alone). Ask: from the midpoint, where does a change of current go? Up through R1 into the supply,
  and down through the NTC: two paths, so parallel.*
- **7e. Explore**: none on the drawing; card 6's Equation is where the load is varied.

## 8. Faithfulness (the quality bar)

**Arithmetic** (B25/85 = 3950 K, R25 = 10.00 kΩ; R(T) = R25·exp(B·(1/T − 1/298.15 K))):
- 25 °C: NTC 10.00 kΩ; MID = 3.3 × 10 / 20 = **1.65 V**; R_th = 10 × 10 / 20 = **5.00 kΩ**.
- The Flow's *"as the temperature changes … so does that 5 kΩ"* (F2's values): 0 °C: NTC 33.62 kΩ → **2.54 V
  behind 7.71 kΩ**; 35 °C: NTC 6.506 kΩ → **1.30 V behind 3.94 kΩ** (the 1.30 V is D1·030 card 6's, ✓); 50 °C:
  NTC 3.588 kΩ → **0.871 V behind 2.64 kΩ**.
- S35's harvest (later today): into a 10 MΩ input, 1.65 × 10 M / (10 M + 5 k) = 1.649 V, 0.05 % low; the ADC's
  sampling input is D1·070's.

**Section D, Draw rows**
- [x] Proportions: a schematic, no scale; IEC symbols (D12.4–D12.10).
- [x] Line types: `outline` for conductors and parts, `thin` for the bracket; no construction left.
- [x] Curves: none.
- [x] Every `say` matches its Flow paragraph (§4a).
- [x] Numbers on the drawing recomputed above: 3.3 V, 10 kΩ, 1.65 V, 5 kΩ.

**Section D, Electronics rows** (the drawing shows a circuit's values): every part a real part (the NTC's B
value and R25 from the class: 10 kΩ ± 1 %, B 3950 K ± 1 %, the same part D1·030 card 6 uses); the supply is
drawn ideal and **labelled so** (`b-short`, A6); no meter, no loading shown here (the load is symbolic).

**A1–A8**: A1 ✓; A2 n/a (the ideal equivalent is the card's point; the next card shows the non-ideal meter);
A3 ✓ (IEC symbols); A4, A5 n/a; A6 ✓ (*an ideal supply is a short for any change*; *IEC symbols; an ideal
supply* on the legend); A7 ✓ (3.3 V, 10 kΩ, 1.65 V at 25 °C and the 35 °C value agree with D1·030 card 6); A8 ✓.

## 9. Faults and non-ideal behaviour

**PLAN FAULT**: none on this card. The supply's own impedance (card 3: ≈ 50 mΩ) is negligible beside 5 kΩ, so
calling it a short is honest at these values; the label says *ideal*.

## 10. Accessibility, legibility and print

- Wall (C2): values and labels at 7:1 and the floor; the three panels' headers in role `note`. Check at
  1920 × 1080 and 1024 × 768 that panel A's *looking back in* clears the NTC's label and panel B's left
  resistor (the preview's closest pair).
- Reduced motion (C3): each step lands whole.
- Colour (C4): amber and teal each carry words; the circuit reads in greyscale.
- Keyboard (C5): → ← R.
- Print (C8): the five stills with their `say` lines.

## 11. Assets to make or source

| Asset | Format | Made by | Status |
|---|---|---|---|
| `thermistor-thevenin.benchdrawing`: three panels, five steps (§3, §4) | Draw library | the author | to make for Saturday |
| The `drawing` block on the card, the numeric before s2 | `en.md` | the author | to write |

## 12. Bench capabilities this needs

**Draw Bench**: **exists**: traces, `enter: fade`, steps with `say`, IEC symbols from the part library, zoom
in Study (M59a–e). **To confirm**: that a step can wait on a card's activity in Study (the numeric before
s2); if not, the learner is trusted, and the order is kept by the card (the numeric sits before the drawing's
reveal in the Flow). **Not needed**: no live values (this is a drawing, not a circuit).

## 13. Stand-in for the lecture

None needed: the drawing plays all five steps today.

## 14. Findings for the owner

- **F1 — The reveal is s2–s3, not the drawing's last step.** The PLAN's ASK says *reveal: the drawing's last
  step*, but the Flow's `[[reveal]]` gives the 5 kΩ and only then hangs the load (p6). This spec reveals at s2
  and s3 and keeps the load as s4, as the Flow runs. Change the PLAN's *reveal:* to *the Thévenin step (s2–s3)*
  (**recommended**), or move the load before the reveal (a Flow move: the owner's)?
- **F2 — Proposal: the 5 kΩ at two more temperatures.** The Flow says *"so does that 5 kΩ"*; a note under
  panel C, *0 °C: 2.54 V behind 7.71 kΩ · 50 °C: 0.871 V behind 2.64 kΩ*, shows it (+0.1 min to read). Take, or
  leave it spoken only (**recommended**: leave; it is a value list on a card already full)?
- **F3 — Proposal: the new divider's equation on s4**, *V = 1.65 V · R_L / (5 kΩ + R_L)*, under the bracket: a
  handoff to card 6's Equation (+0.1 min). Take (**recommended**), or leave?
- **F4 — Proposal: the teacher tip** (§7d).

## 15. Acceptance: how we know it is built right

- The five steps of §4a play on the wall, the presenter's window and Study Mode, each holding, with the values
  of §3 and §8; panel C sits in panel A's positions.
- B1 one change per press; B2 only the new panel or item draws; B3 s0 is the circuit, every part labelled; B4
  five stills; B5 each `say` on the strip; B6 each trace ends on the item the Flow names; B9 the numeric fires
  before s2 and s2 waits for it; B10 the explain after; B13 values and terms only; B14 values beside their
  parts; B16 every value readable as text; B17 all three panels visible at s4; B20 the strip's reminder and tip.
- C2 legible at 1920 × 1080 and 1024 × 768; C3 whole steps; C4 greyscale; C5 → ← R; C6 the panels stacked at
  320; C8 the stills with their `say`.
- E1–E6 for the drawing as presented; checked on the lecture laptop before Saturday, both themes.
