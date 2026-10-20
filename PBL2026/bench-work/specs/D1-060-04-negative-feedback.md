```yaml
id: D1-060-04-negative-feedback
card: "Negative feedback sets the gain"
module: notes/Day01/060-conditioning/en.md
bench: Equation                   # exists: statement, symbols, derivation, examples, graph with log x and y, compare, characteristics
library: "closed-loop-gain: an Equation (A_cl = G/(1 + G·H)), defined in the card's `equation` block, derived from the loop, graphed against G on log axes as a family of three feedback fractions"
dimensions: 2D
stand_in: none                    # every field used exists; the four-decade sweep is walked by examples until X19 (§12)
optional_benches: []
real_thing: "an op-amp of DC open-loop gain 10⁵ (100 dB, typical of general-purpose parts) with a resistive feedback network of fraction H = 0.01 (a non-inverting gain of 100)"
minutes: 2.6                      # on the bench: the Equation is up for the whole card, the predict–observe–explain included
card_minutes: 2.6
status: spec-draft
learner_action: poe
predictions: [s2]                 # the PLAN's poe, answered at s2
seeds: [S11]                      # harvested at s0 (the HARVEST line is not in the Flow: F3)
key_variable: "the loop gain G·H: once it is large, A_cl is 1/H and G stops mattering"
time_scale: "none (no motion; the sweep is walked by examples)"
steps: 5                          # s0–s4
```

The Equation's format is as read for D1·040 card 6 and checked again on 2026-10-13
(`packages/insight-core/src/registry/equationBlock.ts`). `graph.scale` takes `log` on x and y; `compare` draws two to
five curves; the characteristics `asymptotes` and `sensitivity` are computed by the compiler
(`expr/characteristics.ts`); `simulate` offers `ramp` but only a **linear** one (§12).

## 1. What the room must understand

- **Statement** (verbatim): *With enough loop gain, the gain is set by the feedback network, not by the amplifier. The
  feedback part handles little power, so it can be made accurate and stable.*
- **SHOW** (verbatim from the PLAN): *Equation — A_cl = G / (1 + G·H), graphed against G from 10² to 10⁶ with H = 0.01,
  and a family for H = 0.1, 0.01 and 0.001. It stands in for the missing image-7 and image-8 figures.*
- **Drive** (verbatim): *slide G across four decades.*
- **Look for** (verbatim): *the curve flattening onto 1/H; the amplifier's own gain stops mattering.*
- **Status** (verbatim): *ready.*
- **Bench and library.** The **bench** is the Equation Bench. The **library** is this card's equation,
  `closed-loop-gain`.
- **Insight**: *with G·H large, the closed-loop gain is 1/H: a tenfold change in the amplifier's own gain moves the
  result by under 1 %, so a modifying input that acts on the amplifier is defeated.*
- **Kind of knowledge**: *a relation between quantities* (A_cl against G, for three H). Card test → **Equation**. B17
  applies (three curves on one axis). B15, B18 and B19 do not.
- **Why this bench, not a still**: the derivation stands in for the missing block diagram (image-7) as algebra the room
  can follow; the graph shows each curve leaving G behind and settling onto its own 1/H, decade by decade, and the
  family shows that H alone chooses the level.
- **Key variable**: G·H.

## 2. Time

The Flow is 142 words, all spoken: **1.09 min**.

| Beat | Minutes | Source of the number |
|---|---|---|
| s0 the HARVEST S11 line (17 words; in the PLAN, not the Flow: F3), then p0 *"Negative feedback is a common way…"* (23) | 0.31 | 40 ÷ 130 |
| s1 the closed loop: p1 *"It assumes that the measurement system and the feedback are linear…"* (37) | 0.28 | 37 ÷ 130 |
| The PLAN's poe: question, vote, the room's count | ≈ 1.0 | as D1·040's predicts |
| s2 the reveal: unscripted (≈ 15 words: *"99.90 before, 99.01 after: ten times less amplifier, under one percent less gain."*) | 0.12 | estimate |
| s3 the curve walked, decade by decade: unscripted (≈ 25 words) | 0.19 | estimate |
| s4 the family: unscripted (≈ 12 words) | 0.09 | estimate |
| s4 held: p2 *"If the feedback is insensitive…"* (27), p3 *"The advantage comes from…"* (55) | 0.63 | 82 ÷ 130 |
| **Card total / of which on the bench** | **2.6 / 2.6** | +0.1 with F5 |

**Module check**: `D1-060-02-what-conditioning-does.md` §2.

## 3. The scene: what is on the bench

### 3a. The equation (`closed-loop-gain`)

| Field | Content | Source |
|---|---|---|
| `title` | *Negative feedback sets the gain* | the card |
| `statement` | `Acl = G / (1 + G * H)` | the PLAN |
| `symbols` | `Acl` *Closed-loop gain: the G of cards 3, 8 and 9* (V/V); `G` *Open-loop gain: the amplifier on its own* (V/V); `H` *Feedback fraction: the share of the output fed back* (V/V); for the derivation `Vin` *Input* (V), `Vout` *Output* (V), `Ve` *What the amplifier sees: input minus feedback* (V) | the PLAN; the Flow's G(s), H(s); F1 of `D1-060-03-amplification.md` |
| `highlights` | term `G * H` — *the loop gain: when it is large, A_cl is 1/H* (teal); symbol `H` — *set by resistors: accurate and stable* (azure); symbol `G` — *the amplifier's own gain: large, but it drifts* (amber) | the Flow's p1, p3 |
| `derivation` | 1 `Vout = G * Ve` — *the amplifier multiplies what it sees*; 2 `Ve = Vin - H * Vout` — *the feedback subtracts a fraction H of the output from the input: the loop of the missing image-7*; 3 `Vout = G * (Vin - H * Vout)` — *put one into the other*; 4 `Acl = Vout / Vin` — *the closed-loop gain is what the whole loop does*; 5 the statement — *solve step 3 for Vout / Vin* | the Flow's p1; the block diagram the original notes show as image-7 |
| `examples` | §3b | §8 |
| `characteristics` | `asymptotes` (A_cl → 1/H as G → ∞: 10, 100, 1000 for the three H); `sensitivity` of A_cl to G (relative: 1/(1 + G·H), so 1/1001 at G = 10⁵, H = 0.01) | the PLAN's Look for |
| `assumptions` | *G and H are steady gains (DC, or one frequency)* — breaksWhen *the signal's frequency rises: G falls by ten for every decade past its corner, and the loop gain with it* — limiting; *the loop is stable* — breaksWhen *the loop's phase shift reaches 180° with G·H still above 1: it oscillates (the Flow's "designed to remain stable")* — limiting | the Flow's p1, p2 |
| `graph` | against `G`, domain [100, 1.0e6]; `scale` x `log`, y `log`; `hold` H (1.0e-4–0.5, default 0.01); `compare` H at [0.1, 0.01, 0.001]; `markExamples: true` | the PLAN |
| `notes` | `include: true` | print |

The y axis runs 1–2,000 (log), so that H = 0.1's level of 10 and H = 0.001's level of 1,000 both sit clear of the
frame. The x axis runs 10², 10³, 10⁴, 10⁵, 10⁶, with one decade per grid line.

### 3b. Worked examples (each marked on its curve)

| # | Label | G | H | A_cl | Note |
|---|---|---|---|---|---|
| E1 | *The amplifier, cool* | 1.0e5 | 0.01 | 99.90 | *G·H = 1000: within 0.1 % of 1/H = 100* |
| E2 | *The amplifier, warm* | 1.0e4 | 0.01 | 99.01 | *G ten times smaller; A_cl 0.89 % smaller* |
| E3 | *Too little loop gain* | 100 | 0.01 | 50.00 | *G·H = 1: half the gain lost* |
| E4 | *One decade more* | 1000 | 0.01 | 90.91 | *G·H = 10: 9 % short* |
| E5 | *Four decades in* | 1.0e6 | 0.01 | 99.99 | *G·H = 10,000: 0.01 % short* |

E1 and E2 are the PLAN's reveal. E3, E4, E1 and E5 walk the four decades (§4a s3) in place of the slide (F2).

**Values beside their element**: the Symbols pane shows each symbol with its value and unit; the Example pane shows
A_cl and the note; each curve is labelled with its H and its level 1/H at the right end.

**Colours and their second channel** (C4): the three curves in the Equation's series colours, each labelled *H = 0.1 →
10*, *H = 0.01 → 100*, *H = 0.001 → 1000* at the curve's end (the label is the second channel); the highlighted
symbols each have their words in the Terms pane.

## 4. The run: step by step, as the Flow goes

### 4a. Steps (the Equation; the presenter chooses panes and pins)

| # | id | Flow paragraph | What changes (`say`) | Pane | Presenter's control |
|---|---|---|---|---|---|
| 0 | `s0-loop` | the HARVEST S11 line; p0 *"Negative feedback is a common way…"* | The loop: the amplifier sees the input minus a fraction H of its own output. | Proof, steps 1–2 | pane, step |
| 1 | `s1-closed-loop` | p1 *"It assumes that the measurement system…"* | Solved, the loop's gain is G over 1 plus G·H, and with G·H large that is 1/H. | Proof, steps 3–5; then Symbols, `G * H` pinned | step, pin |
| — | the PLAN's poe fires here | — | (§7a) | — | the activity |
| 2 | `s2-reveal` | unscripted | A tenfold fall in G, from 10⁵ to 10⁴, moves A_cl from 99.90 to 99.01: under 1 %. | Example, E1 then E2 | pane |
| 3 | `s3-decades` | unscripted | Across four decades of G, the curve flattens onto 100: the amplifier's own gain stops mattering. | Graph at H = 0.01, E3 → E4 → E1 → E5 | pane |
| 4 | `s4-family` | unscripted; then p2, p3 held | Each H sets its own level, 1/H: 10, 100, 1000. Only the feedback chooses. | Graph, the family | — (held) |

Suggested unscripted words, on the strip (B20; the presenter's own):
- s3: *"Fifty at a hundred. Ninety-one at a thousand. Ninety-nine point nine at a hundred thousand. The curve is giving up
  on G."*
- s4: *"And the level is whatever the feedback says: ten, a hundred, a thousand."*

### 4b. Motion, cues and stills

| # | Motion | Movers | Cue | Hold | Reduced motion (C3) | Still |
|---|---|---|---|---|---|---|
| 0–2 | none (derivation steps, pins and panes) | 0 | the step's new line lit; the pinned term; the example's value | hold | same | one per step |
| 3 | none: the examples' dots are walked by the presenter's pointer | 0 | each example's dot and value as it is named | hold | same | the H = 0.01 curve with E3, E4, E1, E5 |
| 4 | none | 0 | the three curve labels with their levels | hold | same | the family |

Nothing moves on this card. The PLAN's *slide G* becomes a walk through the decades, because a linear ramp over four
decades would cross the first three in a blink (F2).

## 5. Pacing and interaction, by surface and view

**Who paces** (B12): the presenter on the wall (pane, pin and derivation step are mirrored from main); the learner in
Study Mode and Scope.

| View | Who | Controls |
|---|---|---|
| Preview (in the slide) | everyone | the statement and the current pane |
| View (details) | everyone | every pane; the graph's held slider H; the hover readout along each curve |
| Edit (session only) | everyone | not specified for the Equation Bench |
| Authoring | authors | the `equation` block's YAML |

- **The presenter's strip** (B20): the pane, pin and step controls; the next step's `say`; the suggested words; the
  teacher tip.
- **Study / Scope**: H free on the graph (§7e); the Characteristics pane (the asymptote and the sensitivity).
- **Phone** (C6): the statement, then the pane, then the controls; the three curve labels must not collide at 320
  (check; otherwise a legend list goes under the graph).
- **Locked**: the Example and Graph panes until the poe is answered (the reveal waits for the commitment, B9).

## 6. The frame

The Equation's frame (the Canvas header and footer; panes as pills, D4.17). Title *Negative feedback sets the gain*.

## 7. Thinking, not watching

- **7a. The PLAN's ASK** (verbatim): *poe (before the graph) — "An amplifier with an open-loop gain of 100,000 is set by
  feedback to a gain of 100. It warms up, and its open-loop gain falls to 10,000. What is the gain now?" · options:
  about 10 | about 99 | exactly 100 still | about 1,000 · answer: about 99 · reveal: the Equation at G = 10⁵ (99.90) and
  at G = 10⁴ (99.01). · explain: With G·H still at 100 the loop takes up almost all of the change, so a tenfold fall in G
  moves the result by under 1 %. · depth: understand · practice: developing models.* It fires **after s1**, and **s2
  reveals it**. The Flow has no `[[ask]]` cue for it (F3).
- **7b. Prediction point**: the PLAN's poe is the prediction.
- **7c. After**: the explain. In Study, done means the poe was answered and H was moved once.
- **7d. Teacher tip** — **Proposal** (F5): *Expect "about 10" from those who scale everything by G. Ask: which part
  sets the 100 in the first place?*
- **7e. Explore** (B11): in Study, H from 10⁻⁴ to 0.5. With H = 0.5 (a gain of 2), the same tenfold fall in G moves
  A_cl by only 0.02 %.

## 8. Faithfulness (the quality bar)

**Arithmetic** (A_cl = G/(1 + G·H)):
- E1: 10⁵ / (1 + 1000) = 10⁵ / 1001 = **99.90**. E2: 10⁴ / (1 + 100) = 10⁴ / 101 = **99.01**. The change is 99.01 /
  99.90 − 1 = **−0.89 %**: *under 1 %* ✓ (the PLAN's explain).
- **The explain's "G·H still at 100".** At G = 10⁴, H = 0.01, G·H = 100 ✓. Before the fall it was 1000.
- E3: 100 / 2 = **50.00**. E4: 1000 / 11 = **90.91**. E5: 10⁶ / 10,001 = **99.99**.
- The family at the axis's ends: H = 0.1 gives 100/11 = **9.091** and 10⁶/100,001 = **9.9999**; H = 0.001 gives 100/1.1
  = **90.91** and 10⁶/1001 = **999.0**. Each tends to 1/H: 10, 100, 1000.
- **The sensitivity** (relative): (dA_cl/A_cl)/(dG/G) = 1/(1 + G·H) = **1/1001** at E1. A 1 % change in G gives a
  0.001 % change in A_cl.
- **The poe's options**: *about 10* is 10⁴ scaled by 100/10⁵, the room scaling everything by G; *about 1,000* is 10⁵/100
  inverted. Both are distractors with a reason. *Exactly 100 still* is the ideal 1/H.
- **Real values** (cited here only, never on a teaching surface): a general-purpose op-amp's DC open-loop gain is about
  100 dB (10⁵) typical. The PLAN's tenfold fall is within the datasheet spread for its class (an LM358-class part gives
  100 V/mV typical and 15 V/mV minimum over temperature), though warming alone usually moves it by less (F4).

**Section D, Equation rows**
- [x] Symbols match the course: A_cl and G as the PLAN; their labels tie A_cl to the G of cards 3, 8 and 9
  (`D1-060-03-amplification.md` F1).
- [x] Every example recomputed above.
- [x] Slider ranges real: H from 10⁻⁴ (a gain of 10,000) to 0.5 (a gain of 2).
- [x] The graph obeys the Plot rows: the physics (the loop), on log axes so that every decade gets its share; one worked
  value per decade.

**A1–A8**: A1 ✓; A2 ✓ (finite G is the non-ideal, beside the ideal 1/H); A3 n/a; A4 n/a; A5 n/a (no time); A6 ✓ (the
assumptions *DC or one frequency* and *stable* sit on their pane); A7 ✓ (A_cl = 100 is card 6's in-amp gain; the
symbols are reconciled, F1 of card 3); A8 ✓.

## 9. Faults and non-ideal behaviour

**PLAN FAULT**: none on this card. The assumptions name where the model breaks: the loop gain falls with frequency, and
a loop with too much phase shift oscillates.

## 10. Accessibility, legibility and print

- Wall (C2): the statement, the derivation's five lines and the pane text at the Canvas's wall size; the curve labels
  and the axis labels (*Open-loop gain G (log)*, *Closed-loop gain A_cl (log)*) at the floor. Check at 1920 × 1080 and
  1024 × 768.
- Reduced motion (C3): nothing animates.
- Colour (C4): each curve is labelled with its H and level, so none is told apart by colour alone; checked under the
  three colour-blindness simulations.
- Keyboard (C5): the Equation's pane, pin and step keys.
- Print (C8): the Equation's notes (statement, derivation, examples, characteristics, assumptions, the graph as a
  still).

## 11. Assets to make or source

| Asset | Format | Made by | Status |
|---|---|---|---|
| The `equation` block (§3a, §3b) | YAML in `en.md` | the author | to write |

## 12. Bench capabilities this needs

**Equation Bench**: statement, symbols, highlights, derivation, examples, characteristics, assumptions, graph with log x
and log y, `compare`, `markExamples`, panes and pins mirrored: **all exist**.

**To confirm when written**:
- (a) that the derivation may use symbols (`Vin`, `Vout`, `Ve`) that the statement does not;
- (b) that `asymptotes` reports A_cl → 1/H for the held H, and per curve under `compare`;
- (c) a pane lock until the poe is answered (as on D1·020 card 5).

**Missing (request it)**:
- **X19**: a logarithmic ramp for `simulate` (or a ramp that is linear in the axis's own scale), so that *slide G across
  four decades* gives each decade equal time. Until then, the examples walk the decades (F2).
- **X15** (already requested): the family revealed one curve per step. Until then, the three curves are drawn from s3,
  and the presenter names H = 0.01's first.

## 13. Stand-in for the lecture

None needed: the walk through E3, E4, E1 and E5 carries the Drive until X19.

## 14. Findings for the owner

- **F1 — The symbols G and A_cl** are labelled on the bench as *open-loop* and *closed-loop: the G of cards 3, 8 and 9*
  (`D1-060-03-amplification.md` F1, **recommended** (a)).
- **F2 — "Slide G across four decades" becomes a walk.** G is the graph's x axis, not a slider. The Equation's only
  sweep is `simulate`'s linear ramp, which from 100 to 10⁶ in 8 s would cross the first three decades in under 0.1 s.
  The options:
  - (a) walk the four decades by examples E3 → E4 → E1 → E5, and request X19 (**recommended**);
  - (b) a linear ramp anyway;
  - (c) a ramp of the last decade only (10⁵ to 10⁶), which misses the knee.
- **F3 — Two PLAN lines are not in the Flow.** The poe has no `[[ask]]` cue (the PLAN says *before the graph*; this spec
  fires it after p1), and the HARVEST S11 line (*"Remember the five defences from the sensor? This is the one we left
  for here: negative feedback."*) is not spoken anywhere. The options:
  - (a) add `[[ask]]` with the question after p1, and the S11 line as the Flow's first paragraph (**recommended**: both
    are counted in §2 already);
  - (b) leave both to the presenter's notes.
- **F4 (scientific accuracy) — "It warms up, and its open-loop gain falls to 10,000."** A tenfold fall is real for the
  class over its whole datasheet spread (typical against minimum over temperature), but warming alone typically moves an
  op-amp's open-loop gain by tens of percent to a few times. The options:
  - (a) keep it, since the number is within the class's datasheet range and the lesson does not depend on the cause;
  - (b) change *"It warms up"* to *"Over temperature, and from part to part"* (**recommended**: true for any part,
    same numbers);
  - (c) *"The signal's frequency rises a decade"*, which is also exactly tenfold past the open-loop corner, but belongs
    to Day 3.
- **F5 — Proposals**: the teacher tip (§7d, +0.1 min with its question asked aloud).

## 15. Acceptance: how we know it is built right

- The Equation compiles with the fields of §3a. The derivation's five steps verify. E1–E5 show 99.90, 99.01, 50.00,
  90.91 and 99.99. The graph runs 10²–10⁶ on log axes with three labelled curves levelling at 10, 100 and 1000. The
  Characteristics pane gives the asymptote 1/H and the sensitivity 1/(1 + G·H).
- The poe fires after s1. The Example and Graph panes stay closed until it is answered, and s2 reveals 99.90 and 99.01.
- B1 one pane or pin per step; B2 nothing moves; B5 each `say` in the notes; B6 the new derivation line lit, the pinned
  loop gain, each example's dot named; B9 the reveal waits; B10 the explain; B11 H one slider away in Study; B13
  statement and terms only; B16 values readable; B17 three curves on one axis; B20 the suggested words on the strip.
- C2 legible at 1920 × 1080 and 1024 × 768; C3 nothing animates; C4 curves labelled; C5 pane keys; C6 at 320; C8 the
  notes.
