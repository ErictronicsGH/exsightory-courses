```yaml
id: D1-020-09-stacking-tolerances
card: "Stacking tolerances along the chain"
module: notes/Day01/020-measurand-and-uncertainty/en.md
bench: Equation                   # exists
library: "error-budget: an Equation (E = √(e_s² + e_d² + e_r² + e_a²), derived stage by stage with the worst case beside it, one worked example), defined in the card's `equation` block"
dimensions: 2D
stand_in: none                    # the Equation Bench does all but the N graph (§13)
optional_benches: [Plot]          # the N graph, if the owner wants it on a card of its own (F2)
real_thing: "the Day 1 path's four stages with tolerances of real parts: sensor ±0.5 %, a divider of two ±1 % resistors (ratio ±1.0 %), a 3.3 V reference ±1 %, ADC gain ±0.5 %"
minutes: 1.6                      # on the bench: the derivation, the numeric and the example
card_minutes: 6.7                 # the checkpoint (≈ 3.0) included
status: spec-ready                # decided 2026-10-08; F3–F4 proposals open
learner_action: numeric           # then a checkpoint
predictions: []                   # the PLAN's numeric fires before the example evaluates
seeds: [S5]                       # inside the Flow's p5
key_variable: "the number of stages: worst case adds them, RSS adds their squares, and the gap widens"
time_scale: "none"
steps: 6                          # s0–s5
```

The Equation's format as read for card 8 (`D1-020-08-meter-specification.md`). This card's PLAN asks for a
second graph (N·e against √N·e) that one Equation cannot draw today (§12, X11); the derivation's running
totals carry the same Look for (§4).

## 1. What the room must understand

- **Statement** (verbatim): *Worst case assumes every error lines up in one direction. If the errors are
  independent and random, they combine as the root of the sum of the squares. The error budget shares out
  what the purpose can afford.*
- **SHOW** (verbatim from the PLAN): *Equation — worst case Σ|eᵢ| beside RSS √(Σeᵢ²), with a worked
  example on the Day 1 path: sensor ±0.5 %, divider ±1 %, reference ±1 %, ADC gain ±0.5 %; then graphed
  against the number of equal terms N (N·e against √N·e). Replaces the tolerance stack-up widget.*
- **Drive** (verbatim): *add the four stages one at a time; then the N graph.*
- **Look for** (verbatim): *worst case ±3.0 % against RSS ±1.58 %, the gap widening as stages are added.*
- **Status** (verbatim): *ready.*
- **Bench and library.** The **bench** is the Equation Bench; the **library** is this card's equation,
  `error-budget`.
- **Insight**: *independent errors rarely line up, so they combine to much less than their sum; the more
  stages, the bigger the difference, and a budget shares the allowable error between them.*
- **Kind of knowledge**: *a relation between quantities* (the totals against the terms), built stage by
  stage. Card test → **Equation**. B17 applies (worst case beside RSS at every step).
- **Why this bench, not a still**: the stages are added one at a time, so the room watches the two totals
  part company; a single worked number hides the widening.
- **Key variable**: the number of stages.

## 2. Time

The Flow is 314 words; p4 *"[[demo]] Tolerance stack-up widget: …"* (19) is a direction naming a retired
widget (F1): **295 spoken = 2.27 min**.

| Beat | Minutes | Source |
|---|---|---|
| p0 (26), p1 worst case (62), p2 error budget (31), p3 RSS (94) | 1.64 | 213 ÷ 130 |
| s0–s4: the stages added one at a time (unscripted, ≈ 50 words: *"The sensor alone: half a per cent either way. Add the divider: worst case 1.5, RSS 1.1 …"*) | 0.38 | estimate |
| the numeric (before the example evaluates): answer window and spread | 1.00 | estimate |
| s5 the example evaluates | 0.05 | ≈ 3 s |
| p5 *"Keep the budget…"* (26; S5) | 0.20 | 26 ÷ 130 |
| the checkpoint *"Your budget"*, four parts | 3.00 | estimate (create depth: stages, allowances, two sums) |
| p6 *"[[transition]] We know what we want…"* (56) | 0.43 | 56 ÷ 130 |
| **Card total / of which on the bench** | **6.7 / 1.6** | the bench driven for s0–s5 and the numeric |

**Module check**: D1·020 ≈ 28.9 min against 30 (`D1-020-03-direct-indirect-null.md` §2). The checkpoint's
3.0 min is the module's largest estimate.

## 3. The scene: what is on the bench

| Field | Content | Source |
|---|---|---|
| `statement` | `E = sqrt(e_s^2 + e_d^2 + e_r^2 + e_a^2)` | the PLAN's √(Σeᵢ²) |
| `symbols` | `E` *Combined error (RSS)* %; `e_s` *Sensor* %; `e_d` *Divider* %; `e_r` *Reference* %; `e_a` *ADC gain* % | the PLAN |
| `derivation` | 1 `E = sqrt(e_s^2)` — *the sensor alone: RSS ±0.5 %, worst case ±0.5 %*; 2 `E = sqrt(e_s^2 + e_d^2)` — *+ the divider: RSS ±1.12 %, worst case ±1.5 %*; 3 `E = sqrt(e_s^2 + e_d^2 + e_r^2)` — *+ the reference: RSS ±1.50 %, worst case ±2.5 %*; 4 the statement — *+ the ADC gain: worst case ±3.0 %* (the RSS left for the numeric) | §8 |
| `examples` | *The Day 1 path*: e_s 0.5, e_d 1, e_r 1, e_a 0.5 → E = 1.58, note *worst case Σ|eᵢ| = 3.0 %: the RSS is about half* | §8 |
| `assumptions` | *the errors are independent and random* — breaksWhen *they share a cause (one reference feeding two stages; one temperature drifting them all)*, limiting; *errors of similar size* — breaksWhen *one dominates: then the RSS is nearly that one*, simplifying | the Flow's p3 |
| `highlights` | the four squared terms, one colour each (teal, amber, violet, rose) with the stage's name | — |
| `graph` (Proposal, F3) | against `e_d`, domain [0, 3] %, `hold` e_s, e_r, e_a (0–3 %, defaults as the example) | — |

**Values beside their element**: symbols with values and units in the Symbols pane; each derivation step's
note gives both running totals; the Example pane shows E and its note.

**Colours** (C4): each stage's term in its colour **and** its name in the Terms pane.

## 4. The run: step by step, as the Flow goes

| # | id | Flow paragraph | What changes (`say`) | Pane | Presenter's control |
|---|---|---|---|---|---|
| 0 | `s0-sensor` | after p3 (unscripted) | The sensor alone: ±0.5 % either way, worst case and RSS the same. | Proof, step 1 | step |
| 1 | `s1-divider` | (unscripted) | Add the divider: worst case ±1.5 %, RSS ±1.12 %. They part company. | Proof, step 2 | step |
| 2 | `s2-reference` | (unscripted) | Add the reference: worst case ±2.5 %, RSS ±1.50 %. | Proof, step 3 | step |
| 3 | `s3-adc` | (unscripted) | Add the ADC gain: worst case ±3.0 %. What is the RSS? | Proof, step 4 | step; the numeric opens |
| 4 | `s4-wait` | — | (the numeric runs) | Proof held | — |
| 5 | `s5-example` | (unscripted), then p5 | The four combine to ±1.58 %: about half the worst case. Keep this budget. | Example | example; then the checkpoint |

The Look for (*the gap widening as stages are added*) is read off the notes: 0 → 0.38 → 1.0 → 1.42
percentage points between the two totals.

## 5. Pacing and interaction, by surface and view

As card 8's §5 (the Equation is drivable: panes, derivation steps, examples, mirrored from main). In Study
the learner steps the derivation and (if F3) moves the held sliders. Phone: the statement, then the pane.
**Locked**: the Example pane until the numeric closes (by the presenter's order; no lock exists).

## 6. The frame

The Equation's frame; title *Worst case and RSS*.

## 7. Thinking, not watching

- **7a. The PLAN's ASKs** (verbatim): *numeric (before the worked example evaluates) — "Four independent
  errors: ±0.5 %, ±1 %, ±1 % and ±0.5 %. What do they combine to as a root-sum-of-squares?" answer: 1.58 %
  ± 0.05 % · reveal: the worked example evaluates. · explain: The squares are 0.25 + 1 + 1 + 0.25 = 2.5,
  and the root of 2.5 is 1.58; independent errors rarely line up, so the RSS sits near half the worst case
  of 3.0 %. · depth: use · practice: computational thinking.* Fires at **s3**; **s5 reveals it**.
  *checkpoint (after the reveal) — "Your budget": 1 take the stages from your 010 suspect list · 2 give
  each an allowance · 3 combine them worst case and RSS · 4 save it — the DC lab (Day 2·060) has to land
  inside it. · depth: create · practice: planning investigations.* After s5.
- **7b.** The numeric is the prediction.
- **7c. After**: the checkpoint. Study done = both answered (the budget kept for D2·060: request X5).
- **7d. Teacher tip** — **Proposal** (F4): *Expect the plain sum (3 %) or the average. Ask: if each error is
  as likely to be + as −, how often do all four land on the same side?* (1 in 8 for the signs alone.)
- **7e. Explore** (F3): the held sliders in Study.

## 8. Faithfulness (the quality bar)

**Arithmetic.** Worst case 0.5 + 1 + 1 + 0.5 = **3.0 %**. RSS √(0.25 + 1 + 1 + 0.25) = √2.5 = **1.58 %**.
Running totals: 0.5 / 0.5; 1.5 / 1.118; 2.5 / 1.500; 3.0 / 1.581. Ratio RSS / worst: 1.00, 0.75, 0.60,
0.53. For N equal terms e: worst N·e, RSS √N·e (N = 4: 4e against 2e; N = 9: 9e against 3e).

**The parts' tolerances** (A1, A7): the divider of two ±1 % resistors changes its ratio by at most
(1 − k)(ΔR₂/R₂ − ΔR₁/R₁) = 0.5 × 2 % = **±1.0 %** for k = 0.5, so *divider ±1 %* is right for such a divider.
*(Corrected 2026-10-10: this had said "card 1's 100 kΩ pair". The course's chain, as cards 7 and 9 draw it, is an NTC
10 kΩ under one 10 kΩ 1 % resistor from 3.3 V; that resistor moves the divider's output by 0.82 % at 63.2 °C, inside
its ±1 % allowance. Card 9 states every term as an allowance on the reading, and has the ADC convert against its own
reference so the reference term does not cancel: DECISIONS 2026-10-10, README `libraries/error-budget/`.)* A 3.3 V reference or regulator at ±1 % is typical; ADC gain ±0.5 % and sensor ±0.5 % are
class values (labelled *typical tolerances for illustration*).

**RSS of limits** (A6): the GUM combines standard uncertainties, not limits; adding limits in quadrature is
the planning shortcut the Flow describes (*"a reasonable estimate"*), valid when the errors are independent
and of similar distribution. The bench's assumption says so.

**Section D, Equation rows**: symbols consistent with the module; every value recomputed above; slider
ranges real (0–3 %); the graph (if F3) is the statement against e_d, smooth.

**A1–A8**: A1 ✓ (class values, labelled); A2 ✓; A3 n/a; A4 n/a; A5 n/a; A6 ✓; A7 ✓ (card 1's divider
agrees); A8 ✓.

## 9. Faults and non-ideal behaviour

**PLAN FAULT**: none. The assumption's *breaksWhen* is the card's non-ideal case (correlated errors).
**Proposal**: in Study, a fifth stage with a correlated error (the same reference used by the sensor's
excitation and the ADC: they cancel in a ratiometric design, D1·090).

## 10. Accessibility, legibility and print

As card 8's §10. Print: the derivation with its notes and the example (`notes: include`).

## 11. Assets to make or source

| Asset | Format | Made by | Status |
|---|---|---|---|
| The `equation` block (§3) | YAML in `en.md` | the author | to write |
| (if F2 b) a `plot` block: N·e and √N·e against N, e a slider | YAML in `en.md`, on a card of its own | the author | owner's choice |

## 12. Bench capabilities this needs

**Equation Bench**: statement, symbols, derivation steps with notes, examples, assumptions, graph with held
sliders: **all exist**. **Missing (request it)**: graphing two statements together, for the N graph
(X11). **Plot Bench** could draw the N graph today (two curves, one slider) on a card of its own (F2).

## 13. Stand-in for the lecture

None needed for the card's main beat. The N graph: see F2.

## 14. Findings for the owner

**Owner, 2026-10-08: "go with your recommendations".** Decided: F1 (the Flow's cue now reads *"[[demo]]
Equation Bench: …"*), F2 (a) (no N graph; the derivation's running totals carry the widening gap; noted in the
PLAN). Still open: F3, F4 (proposals).

- **F1 — The Flow's `[[demo]]` names a retired widget**: *"Tolerance stack-up widget: add each stage of the
  path and watch the worst-case band and the RSS band grow."* The PLAN replaces it with the Equation. Update
  the cue to *"[[demo]] Equation Bench: add each stage of the path…"*?
- **F2 — The N graph.** One Equation draws one statement. Options: (a) let the derivation's running totals
  carry the widening gap and drop the N graph (**recommended**: the Look for is met, no extra card, the
  module stays within 30 min); (b) a Plot of N·e and √N·e on a card of its own (+≈ 0.5 min and a new card:
  the owner's text); (c) wait for X11.
- **F3 — Proposal**: the graph against e_d with the other three held, for Study.
- **F4 — Proposal**: the teacher tip (§7d).

## 15. Acceptance: how we know it is built right

- The derivation steps 1–4 with the notes of §3; the Example shows E = 1.58 (to 3 significant figures)
  and its note *3.0 %*.
- B1 one stage per step; B5 each `say` in the notes; B9 the Example waits for the numeric; B13 the
  statement and notes only; B16 every total readable; B17 worst case beside RSS at each step.
- C2 legible at 1920 × 1080 and 1024 × 768; C5 the Equation's keys; C6 at 320; C8 the notes printed.
