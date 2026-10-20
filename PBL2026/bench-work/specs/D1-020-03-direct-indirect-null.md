```yaml
id: D1-020-03-direct-indirect-null
card: "Direct, indirect and null"
module: notes/Day01/020-measurand-and-uncertainty/en.md
bench: Electronics                # exists (DC solve, profiles, editable values)
library: "bridge-null: an Electronics circuit library (`bridge-null.benchcircuit`, InsightDemo's fixture: V1 10 V, R1–R3 1 kΩ, R4 1.2 kΩ editable, M1 a budget DMM across the midpoints)"
dimensions: 2D
stand_in: "Draw: `bridge-null.benchdrawing`, one step per R4 setting with the bench's readings computed (§13); R4 cannot be set live today"
optional_benches: []
real_thing: "a Wheatstone bridge on a 10 V bench supply, ±1 % thick-film arms, a 3½-digit handheld DMM (10 MΩ) as the null detector"
minutes: 1.3                      # on the bench: s0 held through p0–p5 is not counted; s1–s3 with p6 and the unscripted lines
card_minutes: 4.1
status: deferred                  # Electronics in development (owner, 2026-10-08)
learner_action: flash             # the PLAN's ASK fires before the statement, before the bench is driven
predictions: []
seeds: [S37]                      # planted after the indirect paragraphs, before the bench is driven
key_variable: "R4's setting against the meter's reading: the difference goes to zero, and the setting is the answer"
time_scale: "none (DC; the reading follows the dial at once)"
steps: 4                          # s0–s3
```

**Deferred (owner, 2026-10-08: the Electronics Bench is under development).** Written before that word;
its stand-in (§13) and the live-R4 finding (F6) are **parked**: the bench may have its knob before the
course. Kept for its numbers (§8) and the module's time table (§2).

The first D1·020 spec, so it holds the module's card-by-card time table (§2). Every number is the bench's
own solve, recomputed here (§8) from the fixture's values and InsightDemo's part profiles
(`resistor-typical` ±1 %, `dmm-budget` 10 MΩ, `supply-bench` 0.05 Ω).

## 1. What the room must understand

- **Statement** (verbatim): *Direct: read the quantity from the instrument. Indirect: measure something
  related and calculate. Null: adjust a known reference until the difference reads zero.*
- **SHOW** (verbatim from the PLAN): *Electronics — bridge-null: two divider arms on 10 V, a meter across
  the midpoints, R4 at 1k2 against three 1 kΩ arms.*
- **Drive** (verbatim): *read the imbalance; take R4 back to 1 kΩ.*
- **Look for** (verbatim): *the meter going to zero, and R4's setting being the answer — a null
  measurement.*
- **Status** (verbatim): *ready (bridge-null fixture).*
- **Bench and library.** The **bench** is the Electronics Bench; the **library** is the fixture
  `bridge-null.benchcircuit` (in InsightDemo's `bench-electronics` sample course), loaded unchanged.
- **Insight**: *at the null the meter only has to say "zero", so its own gain error drops out; the answer
  is the setting of a known reference, and it is as good as that reference.*
- **Kind of knowledge**: *a relation between quantities* (the setting and the reading), driven to a
  special point. Card test → **Electronics** (a circuit and its numbers). B17 applies lightly (the dial
  and the reading, linked). B15, B18, B19 do not.
- **Why this bench, not a still**: the room must see the reading *fall* as the known arm is adjusted and
  stop at zero; the null is a process of adjustment, which a still cannot show. The bench solves every
  setting, so the presenter can stop anywhere.
- **Key variable**: R4's setting.

## 2. Time

The card's Flow is 363 words, all spoken: **2.79 min**. The bench is on the card's Canvas from the start
(s0, still) but driven only in p6.

| Beat | Minutes | Source of the number |
|---|---|---|
| Flow p0 *"Depending on the nature…"* (22) and the ASK p1 (38) | 0.46 | 60 ÷ 130 |
| flash answer window and tally | 0.75 | estimate: a timed single choice of three items |
| p3 direct (71), p4 indirect (59), p5 indirect examples (86); SEED S37 after p4 (27 words) | 1.87 | 243 ÷ 130 |
| s1–s3: p6 *"Null measurements compare…"* (87) spoken over s1, held; then the unscripted lines over s2–s3 (≈ 45 words: *"The meter reads minus 0.454 V. I bring R4 down… 1.05 k, 1.01 k… zero. R4 now reads 1 kΩ: that setting is the answer."*) | 1.02 | 132 ÷ 130 |
| **Card total / of which the bench is driven** | **4.1 / 1.3** | the bench is visible for the whole card; driven for s1–s3 |

### The module, card by card (U011's measure; D1·020 `targetMinutes: 30`)

The Flow is 2,453 words; the `[[demo]]` lines naming retired widgets on cards 5 (13 words) and 9 (19)
are directions, not spoken: **2,421 spoken = 18.6 min**.

| Card | Flow spoken | Beyond the Flow | Card | Source |
|---|---|---|---|---|
| 1 The measurand | 1.95 | flash ≈ 0.75 | **2.7** | estimate (no bench) |
| 2 A measurement must not depend on who made it | 1.55 | the ANALOGY's break (≈ 35 words) 0.27 | **1.8** | estimate (no bench) |
| 3 Direct, indirect and null | 2.79 | flash 0.75, S37 0.21, bench lines 0.35 | **4.1** | this spec |
| 4 Error is not a mistake | 2.76 | — | **2.8** | no bench |
| 5 Accuracy is not precision | 1.62 | multi-select ≈ 0.9, the Plot driven ≈ 0.6 | **3.1** | `D1-020-05-accuracy-precision.md` §2 |
| 6 Repeatable is not the same as right | 1.35 | the Plot's one step 0.15 | **1.5** | `D1-020-06-repeatable-not-right.md` §2 |
| 7 Where error comes from | 2.71 | S6 0.2, S7 0.2, traces 0.08 | **3.2** | `D1-020-07-where-error-comes-from.md` §2 |
| 8 Reading a meter's specification | 1.62 | numeric ≈ 1.0, the Figure tour ≈ 0.4 | **3.0** | `D1-020-08-meter-specification.md` §2 |
| 9 Stacking tolerances along the chain | 2.27 | numeric ≈ 1.0, the Equation driven ≈ 0.4, checkpoint ≈ 3.0 | **6.7** | `D1-020-09-stacking-tolerances.md` §2 |
| **Module** | **18.6** | **10.3** | **28.9** | |

**D1·020 fits its 30 minutes with ≈ 1.1 min to spare**, before any proposal. The checkpoint's 3.0 min is the
largest estimate and the likeliest to run over.

## 3. The scene: what is on the bench

**Parts** (the fixture, unchanged; placement is the fixture's: V1 left, two divider columns, M1 between):

| id | Part | Value | Source |
|---|---|---|---|
| `V1` | Bench supply | 10 V, 0.05 Ω output | fixture; `supply-bench` |
| `R1`, `R2` | Left arm (top, bottom) | 1 kΩ each, ±1 %, 100 ppm/°C | fixture; `resistor-typical` |
| `R3` | Right arm, top | 1 kΩ, ±1 % | fixture |
| `R4` | Right arm, bottom: **the adjustable known** (editable) | 1.2 kΩ at s0–s1; 1 kΩ at the null | fixture (`editable.values: ["R4"]`) |
| `M1` | Budget DMM, differential, `hi` on node `a`, `lo` on node `b` | 10 MΩ, 3½ digits (1999 counts), ±(0.5 % + 2 counts) | fixture; `dmm-budget` |
| `a`, `b` | The midpoints | a: 5.000 V; b: 5.455 V at R4 = 1.2 kΩ | §8 |

**Meet the parts** (s0, B3): *the supply — 10 V across both arms* · *left arm — two equal resistors,
5 V at the middle* · *right arm — a fixed resistor over the one we can set* · *the meter — reads the
difference between the two middles*.

**Values beside their element** (B14, B16): *10 V* at V1; *1 kΩ* along R1–R3; R4's value along it,
updating as it is set; the meter's display in its own digits (*−0.454*, 3½-digit format, V); in View,
node chips *a 5.000 V*, *b 5.455 V*.

**Labels**: designators always on (D12.8).

**Colours and their second channel** (C4): the bench's own (D12.6–12.8): rails in rail colours with net
names; the meter's display in its own face; the editable R4 marked by the bench's *editable* affordance
(a dial glyph) and its value, not by colour alone.

**Key framings**: *Whole* (Home).

## 4. The run: step by step, as the Flow goes

### 4a. Steps

| # | id | Flow paragraph (first words) | What changes: the step's one sentence (`say`) | Overlay | Presenter's control |
|---|---|---|---|---|---|
| 0 | `s0-meet` | (on the Canvas from the card's start; p0–p5 spoken over it) | A bridge: two arms on 10 V and a meter across their middles. R4, bottom right, is the one we can set. | — | Next |
| 1 | `s1-imbalance` | p6 *"Null measurements compare…"* | With R4 at 1.2 kΩ the middles differ: the meter reads −0.454 V. | — | Next |
| 2 | `s2-null` | (unscripted) | R4 comes down step by step; the reading falls with it and reaches 0.000 V at 1 kΩ. | — | R4: 1.2 → 1.1 → 1.05 → 1.01 → 1.00 kΩ (the presenter sets it; §5) |
| 3 | `s3-answer` | (unscripted) | At the null the meter says only "zero": the answer is R4's setting, 1 kΩ. | *At the null, the setting is the answer* | Next leads to card 4 |

### 4b. Motion, cues and stills per step

| # | Motion | Movers | Cue and its second channel | Hold | Reduced motion | Still |
|---|---|---|---|---|---|---|
| 0 | none | 0 | parts named in turn (selection wash) | hold | same | the bridge, meter blank (plain, D12.11) |
| 1 | none (the meter's display appears) | 0 | the meter's display | hold | same | *−0.454* |
| 2 | R4's value and the display change together at each setting (no tween: a DC solve is instant) | 1 (linked: setting and reading) | R4's value and the display lit together at each change | hold at each setting | same | *−0.122* at 1.05 kΩ and *0.000* at 1.00 kΩ |
| 3 | none | 0 | the overlay; R4's value ringed | hold | same | the null with R4 ringed |

Current dots off (the lesson is the difference voltage, not the current; Preview plain). Nothing flashes.

## 5. Pacing and interaction, by surface and view

**Who paces** (B12): on the wall, the presenter (a presented bench is the presenter's to drive). In Study
and Scope, the learner sets R4.

| View | Who | Controls (range, default, states) |
|---|---|---|
| Preview (in the slide) | everyone | Back · Next · *step n of 4*; R4's value (presenter-set on the wall) |
| View (details) | everyone | Voltage view (node chips a, b); the meter's panel (reading, range, its ±(0.5 % + 2) band); R4's setting; Probes |
| Edit (session only, whole wall) | everyone; a student's own copy | (needs the knob, M66b-ii-b-iv, or resistor `adjust`: §12) R4 from 900 Ω to 1.3 kΩ; swap M1 for the bench DMM (`dmm-bench`, the fixture's substitute interaction) |
| Authoring (Course Studio) | authors | the fixture's parts and profiles, `editable`, the four steps and their `say`, the plain lock |

- **The presenter's strip** (B20): the next step's sentence; R4's next setting; the teacher tip (§7d).
- **Study Mode and Scope**: R4 free in its range after s3; the meter's band shown; Explore (§7e).
- **Phone** (C6): the bridge fits portrait (two columns); R4's control below the sheet, 44 px; one finger
  does nothing on the sheet.
- **Locked**: R4 before s2 (the room should see the imbalance first).

## 6. The frame

The Electronics Bench's View frame (D4.3–4.5, D12.1):

| Tile / panel | Used? | Selected item (one large value) | List / contents |
|---|---|---|---|
| Voltage | yes, from s1 | *a − b = −0.454 V* | node voltages a, b |
| Measure / Probes | yes | M1's reading | M1, its profile, its band |
| Parts | yes | *R4 1.200 kΩ* (the editable part) | R1–R4, V1, M1 with profiles |
| Current, Power, Thermal | no | — | — |
| Ink | yes | — | laser, ink |

Identity bar: *A bridge, and the circuit the bench had never been shown* (the fixture's title) — **Proposal**
(F4): *Bridge null: adjust the known until the difference is zero*. Legend card: rails; *R4: the
adjustable known*.

## 7. Thinking, not watching

- **7a. The PLAN's ASK** (verbatim): *flash (before the statement) — "A voltmeter across a resistor. The
  voltage across a known resistor, divided by its resistance. A potentiometer balanced until a
  galvanometer reads zero. Which kind of measurement is each?" options: direct, indirect, null |
  indirect, direct, null | direct, null, indirect | null, indirect, direct · answer: direct, indirect,
  null · explain: The voltmeter's indication is the quantity; the current is calculated from a voltage
  and a known resistance; the potentiometer's setting is read at the point where a difference reads zero.
  · depth: use · practice: constructing explanations.* It fires at the Flow's `[[ask]]` (p1), **before
  s1**; the bench then shows the third case as a bridge (F2).
- **7b. Prediction point** — **Proposal** (F3): before s2, *"I bring R4 down from 1.2 kΩ. At what setting
  will the meter read zero?"* (1.0 kΩ · 1.1 kΩ · 1.2 kΩ · it never will); answer *1.0 kΩ*. A `numeric`
  or `flash` before the drive, +0.5 min.
- **7c. After**: in Study, done = R4 set to the null and the explain read.
- **7d. Teacher tip** — **Proposal** (F3): *Ask: the meter is only good to 0.5 % — does that matter at the
  null?* (No: 0.5 % of zero is zero; only its last counts matter, so a cheap meter makes a good null
  detector.)
- **7e. Explore** — **Proposal** (F3): in Study, R4 free, and M1 swappable for the bench DMM: the null's
  sharpness changes (one count is 0.4 Ω on the budget meter's 2 V range, §8), the null's setting does not.

## 8. Faithfulness (the quality bar)

**Arithmetic** (the bench's DC solve, recomputed):
- Node a: 10 × 1 / 2 = **5.000 V**. Node b at R4 = 1.2 kΩ: 10 × 1.2 / 2.2 = **5.455 V**. Difference
  −0.4545 V.
- Meter loading: the two arms' Thévenin resistances in series, 500 Ω + 545.5 Ω = 1045 Ω, against 10 MΩ:
  −0.4545 × 10 / 10.001 = **−0.454498 V** → the 3½-digit display on 2 V reads **−0.454**. Its band:
  ±(0.5 % × 0.454 + 2 × 1 mV) = ±4.3 mV.
- On the way down: R4 = 1.1 kΩ → −0.238; 1.05 kΩ → −0.122; 1.01 kΩ → −0.025; 1.00 kΩ → **0.000**.
- Sensitivity at the null: dV/dR4 = 10 × R3 / (R3 + R4)² = 10 × 1000 / 2000² = **2.5 mV per Ω**; one
  count (1 mV on the 2 V range) is **0.4 Ω**, 0.04 % of 1 kΩ. The null resolves R4 to ±0.4 Ω although the
  meter's own accuracy is only 0.5 %.
- Currents: 5.0 mA in the left arm, 4.55 mA in the right; R4 dissipates 24.8 mW at 1.2 kΩ (a 0.25 W part).
- With ±1 % arms the null is not at exactly 1 kΩ: R4_null = R2 × R3 / R1 lies between 970 Ω and 1030 Ω in
  the worst case (R1 1.01 k, R2 and R3 0.99 k, and the reverse). The bench solves the nominal values
  unless its tolerance spread (M66h) is on; the label says *nominal values* (A6).

**Section D, Electronics rows**
- [x] Real parts: 1 kΩ ±1 % thick film (`resistor-typical`), 10 V bench supply, a 3½-digit handheld.
- [x] Source resistance: V1 0.05 Ω (negligible here).
- [x] Meter profile: `dmm-budget`, 10 MΩ, 1999 counts, ±(0.5 % + 2 counts).
- [x] Every revealed effect matches a hand calculation (above, to the display's digits).
- [x] Limits: 25 mW in a 0.25 W resistor; nothing near damage.
- [x] IEC symbols, EveryCircuit's look; current dots off.

**A1–A8**: A1 ✓; A2 partly: the meter's loading is in the solve (0.01 %), tolerances shown only as a label
and in Edit (M66h, planned); A3 ✓; A4 ✓ (the meter reads as the profile says); A5 n/a; A6 ✓ (*nominal
values*; *the meter stands in for a galvanometer*); A7 ✓ with one mismatch reported (F2); A8 ✓.

## 9. Faults and non-ideal behaviour

**PLAN FAULT**: none on this card. Non-ideal effects the real bridge has, **Proposals** for Study:
1. **Arm tolerance**: the null lands at R2·R3/R1, not at 1 kΩ (970–1030 Ω worst case): the null measures
   a *ratio*, and is only as good as the known arms.
2. **Self-heating**: 100 ppm/°C and 25 mW shift R4 by a few tenths of an ohm, comparable to one count
   (0.4 Ω): the null drifts while you watch (the bench's thermal loop, if on).
3. **Meter offset**: a null detector with an offset of a few counts nulls at the wrong setting; real null
   detectors are zeroed first.

## 10. Accessibility, legibility and print

- Wall (C2): the meter's digits and R4's value at 32 pt; the sheet at the wall's size; checked at 1920 ×
  1080 and 1024 × 768 (to do).
- Reduced motion (C3): nothing tweens; each setting is a state.
- Colour (C4): readings are digits; R4 marked by a glyph and its value.
- Keyboard (C5): → ← for steps; R4's control reachable and stepped by arrow keys in Study.
- Print (C8): four stills with their sentences and the readings at each R4 setting (a table: 1.2, 1.1,
  1.05, 1.01, 1.00 kΩ → −0.454, −0.238, −0.122, −0.025, 0.000 V).

## 11. Assets to make or source

| Asset | Format | Made by | Status |
|---|---|---|---|
| `bridge-null.benchcircuit` | Electronics library | ExSight (the bench's sample course) | **exists**; copy into this course's assets |
| The four steps, their `say`, the plain lock, R4's settings per step | the `circuit` block in `en.md` (the reveal) and the presenter's notes (the drive) | the author | to write |
| `bridge-null.benchdrawing`, the stand-in (§13 option 1) | Draw library | the author | **to make for Saturday** |

## 12. Bench capabilities this needs

**Electronics Bench** (read 2026-10-08):
- **Exists**: DC solve, profiles, the differential DMM, the meter substitution (`substitute` on
  `dmm-budget`), Preview plain (D12.11); the `circuit` fence with `predict` and one `reveal`.
- **Does not exist, needed by this card**: changing **R4** live. `editable.values` gives a part a stepper
  only if its class declares `capabilities.adjust`, and only `supply` and `ammeter` do; the resistor's
  knob is **planned** as M66b-ii-b-iv (*the parameter card and the knob*, ExSight backlog). Request X8.
- **Does not exist**: steps with a `say` on a `circuit` fence (one fence is one beat with at most one
  reveal). The run of §4 is the presenter's drive, written on the presenter's strip and in the notes, not
  in the fence. Request X9.
- **Planned**: tolerance spread (M66h) for §9's first effect.
- **Not this bench's**: the potentiometer-and-galvanometer of the Flow (F2).

## 13. Stand-in for the lecture

The fixture solves today, but **R4 cannot be set live** (§12), so the Drive's *"take R4 back to 1 kΩ"* has
no control on Saturday. Options, in order:

1. **Draw** (**recommended**): `bridge-null.benchdrawing`, the bridge in IEC symbols with the meter's
   face, one step per R4 setting (1.2, 1.1, 1.05, 1.01, 1.00 kΩ) with §8's readings written on the face
   (−0.454, −0.238, −0.122, −0.025, 0.000 V). **Keeps** B1, B3, B4, B5, B14, B16, B17 and every number.
   **Loses** the live solve and Explore (§7e). The layout is copied into the circuit library's placement
   later; the drawing does not become its source.
2. **Electronics, the fixture as it is**: shows the imbalance (−0.454 V) live, and the presenter *says*
   what happens at 1 kΩ. Loses the null itself (the card's point).
3. **Two copies of the fixture** (R4 1.2 kΩ and 1.0 kΩ) on two cards: needs a new card (the owner's text).

When the knob lands, the fixture replaces the drawing with no change to the Flow.

## 14. Findings for the owner

- **F1 — Which arm is the unknown?** The PLAN says *"R4's setting being the answer"*, but all four arms
  are known 1 kΩ parts, so the null measures nothing unknown. Options: (a) label R3 *R_x (unknown)* and keep
  its value hidden until s3, which then reads *R_x = R4 = 1.00 kΩ* (**recommended**: one label, the fixture
  unchanged); (b) leave it as a demonstration of balance.
- **F2 — The Flow's null example is a potentiometer and galvanometer; the bench shows a bridge.** Both are
  null methods. Proposal: the presenter bridges them in one line (*"the same idea: adjust a known until the
  difference reads zero"*); no text change.
- **F3 — Proposals**: the prediction before s2 (§7b, +0.5 min), the teacher tip (§7d), Explore (§7e).
- **F4 — The fixture's title** (*"A bridge, and the circuit the bench had never been shown"*) is the sample
  course's, not this card's. Retitle it in the identity bar (an author's override), as §6?
- **F6 — The PLAN says *"Status: ready"*, but R4 cannot be set live today** (§12): only supplies and
  ammeters have a stepper; the resistor's knob is ExSight's M66b-ii-b-iv (backlog). Options: Draw stands in
  (§13 option 1, **recommended**); the fixture without the null (option 2); two cards (option 3). And
  change the Status line to *"needs Electronics: a live R4 (the knob); today Draw stands in"*?
- **F5 — The module fits**: D1·020 is ≈ 29 min against 30 (§2), so the proposals across its specs (each
  +0.5 min) cannot all be taken.

## 15. Acceptance: how we know it is built right

- The four steps of §4a on the wall, the presenter's window and Study Mode, with the readings of §8 at
  each R4 setting: −0.454, −0.238, −0.122, −0.025, 0.000 V.
- B1 one state per press or setting; B2 only R4's value and the reading change; B3 s0 named; B4 the stills
  of §4b; B5 each step's sentence on the strip; B6 the setting and the reading lit together; B11 R4 one
  control away in Study; B12 the wall's bench not operable; B13 one overlay; B14 values along their parts;
  B16 every state readable as numbers; B17 the setting and the reading side by side; B20 the tip on the
  strip.
- C2 the meter's digits legible from the back row at 1920 × 1080 and 1024 × 768; C3 n/a; C4 n/a beyond
  the bench's rules; C5 → ← and R4 by keys; C6 walked at 320, 768, 1200, 1440, 1920; C7 a setting to its
  first frame < 100 ms; C8 the print table.
- E1–E6 for the bench as presented.
