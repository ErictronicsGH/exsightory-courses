```yaml
id: D2-010-07-choosing-the-pull-up
card: "Choosing the pull-up value"
module: notes/Day02/010-digital-interfaces/en.md
bench: Plot                       # the module's centrepiece (owner D2, 2026-10-20: the PLAN's benches); the Equation is the card's second block (D4: on its own slide after the numeric)
library: "pullup-rise: a Plot of the bus voltage after the output lets go, v = 3.3·(1 − 0.7·exp(−t/(R_p·C_b))), t in ns from the 30 % crossing (F4), sliders R_p 0.5–20 kΩ and C_b 50–400 pF, the 30 % and 70 % levels, markers at 300 ns (Fast) and 1000 ns (Standard), a 10 kΩ edge dashed; at the right of the same frame the sink current (3.3 − 0.4) V / R_p as a column in mA against Fast mode's 3 mA (D4); shown twice, A at R_p = 1 kΩ (the poe's ten times smaller) and B at 1.77 kΩ (the numeric's answer) · pullup-sink: an Equation, I_sink = (V_DD − V_OL)/R_p, three lines, four examples (10 kΩ, 1.77 kΩ, 966.7 Ω, 820 Ω), the 3 mA limit as a boundary on its graph against R_p; all defined in the card's `plot` and `equation` blocks"
dimensions: 2D
stand_in: "none for the blocks (every field of §3 exists): the column shares the y numbers (1 V ↔ 1 mA) and the curves are confined to their zones by `step()` until X-plot-gauge and X-curve-domain (asked of Benches in one crossing, F2 (d)); the PLAN's Drive (10, 4.7, 1.5 kΩ, 820 Ω) is in Study and on the presenter's strip, not on the wall, until X12's presets (F3 (a))"
optional_benches: [Electronics]   # the PLAN's Status: on-circuit edges need a transient solve with bus capacitance (not built; not this card's)
real_thing: "an I²C bus at 3.3 V with 200 pF of bus capacitance (inputs and wiring), an open-drain output that lets go, a resistor pull-up to 3.3 V; the limits of NXP UM10204 (I²C-bus specification): t_r ≤ 1000 ns Standard, ≤ 300 ns Fast, measured from 0.3·V_DD to 0.7·V_DD; V_OL ≤ 0.4 V at 3 mA; C_b ≤ 400 pF"
minutes: 2.1                      # on the bench: plot A from p3, plot B, the Equation (§2a; 2.06, corrected in round two from 2.0)
card_minutes: 3.8                 # the whole card, the poe and the numeric included (§2a)
status: spec-ready                # round two decided 2026-10-20 (owner: "apply all recommendations"): F-a, F-b (accuracy, D2·010-F7, F8) decided (a) and applied on the bench; F1–F8 decided; nothing open
learner_action: poe               # and numeric (two activities)
predictions: []                   # both ASKs are the PLAN's and fire before the slide that answers them (§7a)
seeds: []                         # the module's HARVEST S14 is card 6's; the Flow's "the same exponential we met at the ADC's sampling capacitor" points at D1·070 (§8)
key_variable: "the pull-up R_p (one slider): the edge's 30 → 70 % time and the sink column move in opposite directions; C_b is held at 200 pF on the wall"
time_scale: "real time on the axis (ns); no motion: two plot states and one equation"
steps: 5                          # s0, s1, s2 (plot A), s3 (plot B), s4 (the Equation)
```

**Written 2026-10-20 (U019)** after the owner's choices on the U019 brief (*"apply all recommendations"*). **This spec holds
D2·010's module time table** (§2b), as `D1-090-05-ratiometric.md` holds D1·090's. Every card's row in §2b is its own
spec's figure (reconciled 2026-10-20). **Round two decided 2026-10-20** (owner: *"apply all recommendations"* on the U019
brief's *Specs: round two*): every finding of §14 takes its recommended option; the Flow is now five fences (F1), the PLAN's
SHOW and the poe's reveal read as built (F4), and §2b carries the Flow changes of cards 2, 4 and 10 (F10, F11, F9).

**The formats, as read in source on 2026-10-20** (read-only, `C:\ExSightory\src\insight\packages\`):

- **Plot block** (`insight-core/src/registry/plotBlock.ts`): `title`, `caption`, `variable`, `xLabel`, `yLabel`, `domain`,
  `range`, `parameters` (`name`, `label`, `min`, `max`, `default`, `step`, `unit`), `curves` (`expression`, `label`,
  `colour` from teal · amber · violet · rose · azure · lime, `dashed`, `fill`, `derivative`, `tangent`), `series`, `markers`
  (`at`, `label`, `axis` x or y), `animate`, `grid`, `readout`, `fixedView`, `aspect`. **One y axis.** No `points`,
  `regions` or `scale` on the block (the viewer, `canvas/src/PlotViewer.vue`, has them for the Equation's graph only). No
  `compare`. A curve that never uses the variable warns *"will draw as a flat line"*. `livePush: false`, **not drivable**:
  slider values, the view and `animate` are local to each window; the wall shows a block at its authored defaults.
- **The viewer** (`PlotViewer.vue`, `plotModel.ts`): a non-finite sample ends a segment (nothing drawn), and `fill` closes
  each segment down to y = 0, so a curve can be confined to part of the axis by dividing it by `step()` (Infinity outside).
  No clip path: a sample above `range` draws above the frame. x ticks `niceTicks(domain, 8)`, y ticks `niceTicks(range, 6)`.
  A slider's value prints `toFixed` to the step's decimals with the authored unit after it (**no SI prefix**: R_p in kΩ
  with step 0.01 prints *1.77 kΩ*, *10.00 kΩ*; C_b step 5 prints *200 pF*). The hover readout prints each finite curve to
  3 decimals. Markers have no colour of their own; an x marker's label sits at its top, a y marker's at the left edge.
- **Expression language** (`insight-core/src/expr/evaluate.ts`): `exp`, `ln`, `sqrt`, `min`, `max`, `clamp`, `floor`,
  `step(a, b)` = 1 when b ≥ a, else 0.
- **Equation block** (`registry/equationBlock.ts`): `statement`, `symbols` (with `unit`, `note`, `colour`), `highlights`
  (a term of the statement), `derivation` (the last line checked against the statement), `examples` (right-hand values,
  SI base units), `rearrangements` (`solveFor`, checked by the compiler), `boundaries` (`when` an inequality in declared
  symbols, `kind` valid · invalid; resolved on 601 linear samples of the graph's domain, every non-axis symbol held),
  `assumptions` (`simplifying` · `limiting`, `breaksWhen`), `graph` (`against`, `domain`, `hold`, `scale`, `compare`,
  `markExamples`, `animate`). `drivable: true`: **pane, pinned annotation and derivation step are mirrored to the wall**;
  hold sliders, the hover and `graph.animate` are not. Values print through `formatQuantity` (4 significant figures,
  trailing zeros dropped, SI prefixes): 0.00029 A prints **290 µA**, 0.0016384 A **1.638 mA**, 966.7 Ω **966.7 Ω**, 1770 Ω
  **1.77 kΩ**, 3 × 10⁻⁷ s **300 ns**, 2 × 10⁻¹⁰ F **200 pF**.
- **Cards** (`registry/cards.ts`, `blockRegistry.ts`): `plot` and `equation` are `stage: 'lead'`; a lead block that does not
  follow the heading directly opens its own slide; the Canvas is sticky within a card. `poe`, `numeric` and `checkpoint`
  are `layout: 'widget-focus'` (an activity never shares the wall). A Flow fence attaches to **the block before it**
  (`registry/flow.ts`), activities included. Two identical blocks in one subsection get distinct ids by occurrence
  (`compiler/blockId.ts`), so a verbatim second showing compiles.

So the PLAN's *"sliders R … and C …"* and its four-value Drive would move nothing the room sees on the wall, and the
PLAN's first *"Beside it an Equation"* was two blocks side by side, which is Studio's (D4); the PLAN now reads as built
(F4, decided). Here the poe's *ten times smaller* and the numeric's *1.77 kΩ* are **two showings of one plot**, each opened
at its own R_p with the 10 kΩ edge dashed for comparison, the sink current is a **column in the same frame** (D4), and the
Equation follows the numeric on its own slide (D4). The card is **five slides with five Flow fences** (F1, decided and
applied in `en.md`): poe · plot A · numeric · plot B · Equation, each fence after its block.

**Six gates** (this spec, 2026-10-20, round two re-checked): (1) realism: I²C's own limits and model (UM10204), a 3.3 V bus
at 200 pF, real resistor values; nothing branded — pass. (2) science: the RC rise from 30 % to 70 % is exactly
0.8473·R_p·C_b; the sink formula is UM10204's design rule, exact at its 3 mA limit and a model elsewhere, **stated on the
bench** (the caption, the Equation's assumption 1, the teacher tip: F-a (a), decided); the 3 mA is Fast mode's figure at the
0.4 V low level, **said by the limit line and assumption 2** (6 mA at 0.6 V, UM10204 Table 10: F-b (a), decided) — pass.
(3) maths: every number recomputed in Node (§8), round two's included — pass. (4) visualization: the edge and the current on
one frame under one slider, the 10 kΩ edge dashed beside the live one, the two limits on the same picture — pass, with the
shared y numbers stated on the frame until X-plot-gauge (asked, F2 (d)). (5) consistency: the brief's palette (the line teal, limits rose, thresholds violet, the pull-up's
current amber), the PLAN's numbers, D1·070's RC charge — pass. (6) design: one slider row, words on top with the symbol in
parentheses; every curve labelled; clearances named with their checks (§10); EN and FR drafted — pass on paper, to check on
the built blocks.

## 1. What the room must understand

- **Statement** (verbatim): *The pull-up's value is a real trade between edge rate and drive current. There is no value that
  wins both.*
- **SHOW (centrepiece)** (verbatim from the PLAN): *Plot — the bus voltage after release, v = 3.3·(1 − 0.7·exp(−t/(R·C))), t
  in ns from the 30 % crossing (I²C times the rise from 30 % to 70 %); sliders R (0.5–20 kΩ) and C (50–400 pF); horizontal
  markers at 0.3 and 0.7 of 3.3 V (I²C's rise-time thresholds); vertical markers at 300 ns (Fast-mode limit) and 1000 ns
  (Standard-mode limit). In the same frame, the sink current (3.3 V − 0.4 V)/R as a column against the 3 mA Fast-mode limit;
  then, after the numeric, an Equation: sink current = (3.3 V − 0.4 V)/R, with the 3 mA limit marked.* (F4, decided: the
  owner's update of 2026-10-20.)
- **Drive** (verbatim): *C = 200 pF throughout; R = 10 kΩ (30→70 % takes 1.69 µs, misses both limits) → 4.7 kΩ (0.80 µs,
  meets Standard, misses Fast) → 1.5 kΩ (254 ns, meets Fast, sinks 1.9 mA) → 820 Ω (139 ns, but sinks 3.5 mA, past what a
  Fast-mode output must guarantee).*
- **Look for** (verbatim): *the edge and the current moving in opposite directions under one slider.*
- **Status** (verbatim): *ready · on-circuit edges need Electronics: transient solve with bus capacitance*
- **FAULT** (verbatim): *A 10 kΩ pull-up carried over from a 100 kHz design onto a 400 kHz bus: the edge has not reached
  0.7·VDD when the clock samples, and the bus fails only sometimes.*
- **Bench and library.** The **benches** are the Plot Bench (the centrepiece) and the Equation Bench (owner D2, the PLAN's
  benches; D4, the sink current a column of the plot and the Equation on its own slide after the numeric). The **libraries** are `pullup-rise` (the plot, shown twice
  here, A and B, and a third time on card 10: `D2-010-10-logical-and-electrical.md`) and `pullup-sink` (the equation).
- **Insight**: *one resistor sets both the rising edge (through R_p·C_b) and the current the output must sink (through
  (V_DD − V_OL)/R_p), in opposite directions, so the bus's capacitance and its drivers fix a window: at 200 pF in Fast mode,
  about 1 to 1.8 kΩ.*
- **Kind of knowledge**: *a relation between quantities* (v against t, with R_p and C_b as parameters; I against R_p) and
  *a contrast between two states* (10 kΩ against ten times smaller). Card test → **Plot**, then **Equation**. B17 applies
  (both edges on one time axis, both columns on one current scale). B15, B18, B19 do not.
- **Why these benches, not a still**: the claim is that one value moves two things the opposite way; the room sees both on
  one frame at two values of R_p (and in Study drags it), and the window is read off the same picture (the edge on the
  300 ns line, the column under the 3 mA line). The Equation names the second law in the room's symbols and draws the floor.
- **Key variable**: R_p.

## 2. Time

### 2a. This card

The card's Flow is **286 words** counted as words (cue words not counted; counted from `en.md` 2026-10-20, after the split);
the brief's count is 292 (it counts the dashes). The split into five fences (F1) changed no word. The fences: **fence 1**
p1–p2 (the poe's ask and pause), **fence 2** p3–p7 (the demo direction to *"…sink 3 mA."*), **fence 3** p8–p9 (the
numeric's ask and pause), **fence 4** p10 (*"300 ns divided…"*), **fence 5** p11 (*"That is the trade…"*). The poe's question
(p1, 29) and the numeric's (p8, 19) are counted in their activities. p3 *"[[demo]] Plot Bench — sweep the pull-up value
and watch the edge and the current together."* (14) is a direction, not spoken (N2). **224 words are spoken outside the
activities = 1.72 min** at 130 wpm.

| Beat | Minutes | Source of the number |
|---|---|---|
| The PLAN's poe, fence 1: p1 the question (29), four options, the answer window, the tally (p2 `[[pause]]`), before the bench | ≈ 1.0 | as D1·080's and D1·090's poe |
| s0 plot A opens, fence 2 (p3, a direction): the presenter's orientation line, unscripted (≈ 15 words: *"Dashed, 10 kΩ; solid, the same pull-up ten times smaller; both on 200 pF."*) | 0.12 | estimate, 15 ÷ 130 |
| s1 the reveal, fence 2: p4 *"[[reveal]] Both change, and in opposite directions."* (6), p5 *"When the output lets go…"* (63), p6 *"But when the output pulls low…"* (34), the laser on the two 70 % crossings and the two columns (mirrored ink, ≈ 3 s) | 0.85 | 103 ÷ 130 + 3 s |
| s2 the limits, fence 2: p7 *"Let us put numbers on it…"* (43), the laser on the 300 ns line and the 3 mA line (≈ 3 s) | 0.38 | 43 ÷ 130 + 3 s |
| The PLAN's numeric, fence 3: p8 the question (19), the answer window, the tally (p9 `[[pause]]`) | ≈ 0.75 | as D1·080's numerics, question included |
| s3 plot B opens (≈ 2 s), fence 4: p10 *"300 ns divided by 0.85 × 200 pF…"* (55) | 0.46 | 55 ÷ 130 + 2 s |
| s4 the Equation opens (≈ 2 s), the Example pane (≈ 3 s), fence 5: p11 *"That is the trade…"* (23) | 0.26 | 23 ÷ 130 + 5 s |
| **Card total / of which on the bench** | **3.8 / 2.1** | 3.81 / 2.06 (round one printed 3.75 / 2.01, a sum slip: corrected 2026-10-20, the card unchanged at 3.8); the Drive is in Study and on the strip (F3 (a), decided), so it adds nothing on the wall |

The U019 brief counted card 7 inside its ≈ 33-minute module. p5 (63 words) is spoken over a held state (B13).

### 2b. The module, card by card (D2·010 `targetMinutes: 30`)

The Flow is **2,663 words = 20.48 min** at 130 wpm (the brief's count, whitespace tokens with the cue markers removed,
re-counted from `en.md` after round two, 2026-10-20: cards 307, 370, 175, 266, 217, 197, 292, 224, 423, 192; round one's
2,643 + 7 (card 2, F10) + 8 (card 4, F11) + 5 (card 10, F9)). The seven activity questions in the Flow (cards 2, 4, 5, 6, 7 ×2, 8, 9: 156 words) are counted in their
activities; the four `[[demo]]` directions (cards 5, 6, 7, 8: *"Animation Bench — …"*, *"Plot Bench — …"*: 42 words, unchanged by
round two) are not spoken. That leaves **2,465 words spoken outside the activities = 18.96 min.** Activities as D1·080's and D1·090's
tables: a poll ≈ 1.0, a poe ≈ 1.0, a multi-select ≈ 0.9, a numeric ≈ 0.75, each with its question; the nine-item checkpoint
≈ 2.5.

| Card | Flow spoken outside the activity (words) | Activity | Beyond the Flow (estimate) | Card | Source |
|---|---|---|---|---|---|
| 1 The code has to travel | 2.36 (307) | none | the path drawn one box at a time ≈ 0.3 | **2.4** | `D2-010-01-code-has-to-travel.md` §2 |
| 2 Both digital — so compatible? | 2.67 (347) | poll ≈ 1.0 | the nine lines lit ≈ 0.2 | **3.7** | `D2-010-02-both-digital.md` §2: 3.62 + 7 ÷ 130 = 3.67 (F10) |
| 3 Level shifting | 1.35 (175) | poe ≈ 1.0 (its question is not in the Flow) | the demonstration's two states ≈ 0.4 | **2.5** | `D2-010-03-level-shifting.md` §2 |
| 4 An interface is not a protocol | 1.92 (250) | multi-select ≈ 0.9 | the timing tour and the two readings ≈ 0.3 | **3.2** | `D2-010-04-interface-not-protocol.md` §2: 3.17 + 8 ÷ 130 = 3.23 (F11) |
| 5 What does a floating input read? | 1.48 (192) | poe ≈ 1.0 | floating → meter → pull-up → pull-down ≈ 0.3 | **2.7** | `D2-010-05-floating-input.md` §2 |
| 6 Open-drain: pull low or let go | 1.34 (174) | poe ≈ 1.0 | four moves ≈ 0.3 | **2.6** | `D2-010-06-open-drain.md` §2 |
| 7 Choosing the pull-up value | 1.77 (230) | poe ≈ 1.0, numeric ≈ 0.75 | orientation line, laser, two slide changes, a pane move ≈ 0.28 | **3.8** | this spec, §2a (1.72 by the word count; the same 3.8) |
| 8 Two outputs on one wire | 1.56 (203) | poe ≈ 1.0 | four cases, the wired-AND drawing, the byte and ACK ≈ 0.6 | **2.9** | `D2-010-08-two-outputs.md` §2 |
| 9 There is no best interface | 3.04 (395) | poll ≈ 1.0 | the chat follow-up *"what would you need to know?"* ≈ 0.5; the wiring Figure (D3) ≈ 0.2 | **4.0** | `D2-010-09-no-best-interface.md` §2 |
| 10 A logical problem and an electrical one | 1.48 (192) | checkpoint ≈ 2.5 | the plot reopened (part of the card) | **3.9** | `D2-010-10-logical-and-electrical.md` §2: 3.90 + 5 ÷ 130 = 3.94 (F9) |
| **Module** | **19.0** | **≈ 11.2** | | **≈ 31.7** | every card its own spec's figure (reconciled 2026-10-20, U019; round two's Flow changes added) |

**D2·010 runs ≈ 31.7 of its 30 minutes, ≈ 1.7 min over** (D5, decided: reported only; the owner cuts if needed; nothing is
trimmed here). The U019 brief estimated ≈ 33; round one's table ≈ 31.6; round two's three Flow changes (20 words) add
0.15 min.

**The rule for a Flow change** (round two, so that every spec computes the same): the words a change adds are counted as
whitespace tokens with the cue markers removed (as the brief counts them), and are spoken outside the activities; they add
**words ÷ 130 min** to the card's **unrounded** figure in its own spec (card 2 3.62, card 4 3.17, card 10 3.90), no other beat
changes, and the result is rounded to 0.1 min. The module is the **sum of the cards' rounded figures** (2.4 + 3.7 + 2.5 +
3.2 + 2.7 + 2.6 + 3.8 + 2.9 + 4.0 + 3.9 = 31.7). This is the module's one time table; every card's figure is its own spec's (the
*Beyond the Flow* column holds this spec's first estimates, superseded by the specs), and card 10's spec points here.

## 3. The scene: what is on the bench

### 3a. The plot (`pullup-rise`), shown twice

The same block, written twice: **A** (s0–s2) opens at R_p = **1 kΩ**, ten times smaller than the dashed 10 kΩ; **B** (s3)
opens at R_p = **1.77 kΩ**. Everything else is identical (a third, verbatim copy of B is card 10's: its G3 (a), decided).
**Beside B in `en.md`, an authoring note** (card 10's G4 (a), decided), the counterpart of the one beside card 10's
copy (`D2-010-10` §3), just before B's `plot` block; an HTML comment outside the block, so the two blocks stay identical:
`<!-- AUTHORING: this plot is copied verbatim as card 10's plot ("A logical problem and an electrical one"); edit both
together until Plot presets (X12) let one block serve both. Specs: D2-010-07 §3a, D2-010-10 §3. -->`

| Field | Content | Source |
|---|---|---|
| `title` | *Choosing the pull-up value* · FR *Choisir la résistance de rappel* | the card's heading |
| `caption` | *The bus after the output lets go, timed from 30 % of 3.3 V; I²C's rise time ends at 70 %. Dashed: a 10 kΩ pull-up; solid: the slider's. At right, in mA on the same numbers: the current the output sinks while it holds the line low, (3.3 − 0.4) V / R_p. Ideal bus: one capacitance, no leakage; the low level taken as 0.4 V.* · FR *Le bus après que la sortie relâche la ligne, compté depuis 30 % de 3.3 V ; le temps de montée I²C s'arrête à 70 %. En tirets : une résistance de rappel de 10 kΩ ; en trait plein : celle du curseur. À droite, en mA sur les mêmes graduations : le courant que la sortie absorbe quand elle tient la ligne basse, (3.3 − 0.4) V / R_p. Bus idéal : une seule capacité, pas de fuite ; niveau bas pris à 0.4 V.* | the PLAN; D4; the last sentence is the A6 label (F-a (a), decided: the bench states the model). 62 words: with the 22-word statement under the 110-word card budget |
| `variable` | `t` (ns from the 30 % crossing) | F4 (decided) |
| `xLabel` | *Time from the 30 % crossing (ns)* · FR *Temps depuis le passage à 30 % (ns)* | F4 (decided) |
| `yLabel` | *Bus voltage (V) · at right, sink current (mA)* · FR *Tension du bus (V) · à droite, courant absorbé (mA)* | D4 (F2 (a), decided) |
| `domain` | [0, 2400]: time 0–2000 ns, the column zone 2000–2400 | F2 (a), decided; x ticks 0, 500 … 2000 (step 500; none under the columns) |
| `range` | [0, 6] (y ticks 0, 1 … 6) | F2 (a), decided: holds the live column at the slider's 0.5 kΩ (5.8 mA) inside the frame |
| `parameters` (one row) | `Rp` *Pull-up (R_p)*, 0.5–20, default **1** (A) / **1.77** (B), step 0.01, unit *kΩ* · FR *Résistance de rappel (R_p)*; `Cb` *Bus capacitance (C_b)*, 50–400, default **200**, step 5, unit *pF* · FR *Capacité du bus (C_b)* | the PLAN's sliders; kΩ × pF = ns, so the expressions need no powers of ten |
| `markers` (x) | 300 *Fast mode: 300 ns* (FR *Mode rapide : 300 ns*) · 1000 *Standard mode: 1000 ns* (FR *Mode standard : 1000 ns*) · 2020 *Sink current (mA)* (FR *Courant absorbé (mA)*), the zone's divider | the PLAN; the divider is F2 (a), decided |
| `readout` | on (Study: t and every finite curve at the hover) | the Plot's default |
| `fixedView` | true (the framing is the point) | as D1·090 |
| `animate` | none (not mirrored; each state is its own showing: F1 (a)) | F1 (a), decided |

**Curves** (`Rp` in kΩ, `Cb` in pF, `t` in ns; R_p·C_b is in ns). `/ step(t, 2000)` ends a curve at 2000 ns;
`/ (step(a, t) * step(t, b))` draws it only for a ≤ t ≤ b (F2).

| id | Expression | Label (EN · FR) | Colour, line |
|---|---|---|---|
| `edge` | `3.3*(1 - 0.7*exp(-t/(Rp*Cb))) / step(t, 2000)` | *Bus voltage, pull-up R_p* · *Tension du bus, rappel R_p* | teal, solid |
| `edge10k` | `3.3*(1 - 0.7*exp(-t/(10*Cb))) / step(t, 2000)` | *Bus voltage, a 10 kΩ pull-up* · *Tension du bus, rappel de 10 kΩ* | teal, `dashed` |
| `v30` | `0.3*3.3 / step(t, 2000)` | *30 % of 3.3 V (0.99 V): the rise time starts* · *30 % de 3.3 V (0.99 V) : début du temps de montée* | violet, `dashed` |
| `v70` | `0.7*3.3 / step(t, 2000)` | *70 % of 3.3 V (2.31 V): the rise time ends* · *70 % de 3.3 V (2.31 V) : fin du temps de montée* | violet, `dashed` |
| `sink10k` | `(3.3 - 0.4)/10 / (step(2100, t) * step(t, 2200))` | *Sink current, 10 kΩ (left column)* · *Courant absorbé, 10 kΩ (colonne de gauche)* | amber, `dashed`, `fill` |
| `sink` | `(3.3 - 0.4)/Rp / (step(2250, t) * step(t, 2350))` | *Sink current, R_p (right column)* · *Courant absorbé, R_p (colonne de droite)* | amber, solid, `fill` |
| `limit3` | `3 / (step(2075, t) * step(t, 2375))` | *3 mA: what a Fast-mode output must sink at 0.4 V* · *3 mA : ce qu'une sortie en mode rapide doit absorber à 0.4 V* | rose, `dashed` |

- `edge` is the PLAN's v = 3.3·(1 − 0.7·exp(−t/(R·C))) with t = 0 at the 30 % crossing (F4): at t = 0 it is 0.99 V, and
  it reaches 2.31 V at t = R_p·C_b·ln(7/3) = 0.8473·R_p·C_b, the I²C rise time. The 30 % and 70 % levels are drawn as
  level curves over the time zone rather than full-width y markers, so they do not cross the columns (F2 (a), decided).
- `limit3`'s label names the low level (F-b (a), decided): the 3 mA is what a Fast-mode output must sink **at 0.4 V**;
  the 6 mA at 0.6 V is the Equation's assumption 2.
- The sink columns are (3.3 − 0.4)/R_p in **mA** when R_p is in kΩ: the PLAN's formula. They are drawn on the same y
  numbers as the volts (1 V ↔ 1 mA), which the y label, the divider marker and the caption say (F2).
- Every curve uses `t`, so there is no flat-line warning; outside its zone a curve is Infinity, which the viewer skips and
  the readout filters out.

### 3b. The equation (`pullup-sink`)

| Field | Content | Source |
|---|---|---|
| `title` | *The sink current sets the floor* · FR *Le courant absorbé fixe le plancher* | p10 *"the 3 mA limit says no smaller than about 1 kΩ"* |
| `statement` | `I_sink = (V_DD - V_OL) / R_p` | the PLAN's *"sink current = (3.3 V − 0.4 V)/R"*; p6 |
| `caption` | *While the output holds the line low, the pull-up has the supply at one end and the low level at the other, and all its current goes into the output. A smaller pull-up means a faster edge and more current to sink.* · FR *Quand la sortie tient la ligne basse, la résistance de rappel a l'alimentation à un bout et le niveau bas à l'autre, et tout son courant entre dans la sortie. Une résistance plus petite donne un front plus rapide et plus de courant à absorber.* | p6, p11 |
| `symbols` | `I_sink` *Sink current* (A), note *what the output must sink while it holds the line low* (amber) · `V_DD` *Supply* (V), note *3.3 V* · `V_OL` *Low level* (V), note *0.4 V: the most a Fast-mode output may show while sinking 3 mA (UM10204, Table 10)* · `V_R` *Voltage across the pull-up* (V) · `R_p` *Pull-up* (Ω) (teal) | p6; UM10204 |
| `highlights` | term `V_DD - V_OL` *the 2.9 V across the pull-up while the output holds the line low* · FR *les 2.9 V aux bornes de la résistance de rappel quand la sortie tient la ligne basse* | p6 |
| `source` | *NXP UM10204, I²C-bus specification and user manual (Rev. 7.0, 2021), §7.1: R_p(min) = (V_DD − V_OL(max)) / I_OL* | A7 (re-read 2026-10-20) |
| `derivation` | (1) `V_R = V_DD - V_OL`, note *with the output low, the pull-up has 3.3 V at one end and 0.4 V at the other*; (2) `I_sink = V_R / R_p`, note *Ohm's law: all of the pull-up's current goes into the output*; (3) the statement, note *the floor: at 3 mA, R_p = 2.9 V / 3 mA = 966.7 Ω* | p6 |
| `examples` | E1 *A 10 kΩ pull-up* V_DD 3.3, V_OL 0.4, R_p 10000 → **290 µA**, note *well inside 3 mA; its edge takes 1.69 µs at 200 pF*; E2 *The largest for Fast mode at 200 pF* R_p 1770 → **1.638 mA**; E3 *The floor* R_p 966.7 → **3 mA**, note *the smallest pull-up Fast mode allows on 3.3 V (UM10204 sizes it at the supply's maximum: 1.067 kΩ at 3.6 V)*; E4 *820 Ω* R_p 820 → **3.537 mA**, note *past 3 mA: the 0.4 V low level is no longer guaranteed* (F6, taken) | §8 |
| `rearrangements` | `solveFor: R_p`, note *the floor: R_p = (V_DD − V_OL) / I_sink, 966.7 Ω at 3 mA* | UM10204's R_p(min) |
| `boundaries` | `when: (V_DD - V_OL) / R_p <= 0.003`, label *Within Fast mode's 3 mA* (FR *Dans les 3 mA du mode rapide*), kind valid, note *below about 967 Ω the output may not hold the line at 0.4 V* | the PLAN's *"the 3 mA Fast-mode limit marked"* |
| `graph` | `against: R_p`, `domain: [500, 10200]` (Ω), `hold`: V_DD 3.0–3.6 default 3.3, V_OL 0–0.6 default 0.4; `markExamples: true` | §8 (the domain puts E1 inside the frame and a sample within 2.2 Ω of 966.7 Ω) |
| `assumptions` | (1) *The low level is 0.4 V whatever the current* — breaksWhen *a real output pulls lower at smaller currents, so it sinks a little more than shown: at 10 kΩ about 0.33 mA, not 0.29 (up to 14 %); the formula is exact at the 3 mA limit, where it is used* — simplifying (F-a (a), decided). (2) *3 mA is Fast mode's figure at the 0.4 V low level* — breaksWhen *Fast-mode outputs are also specified to sink 6 mA at 0.6 V (UM10204, Table 10), so past 3 mA the line still goes low, but the low level and its noise margin are no longer guaranteed* — limiting (F-b (a), decided). (3) *The output is fully off when it lets go, and no input leaks* — breaksWhen *input leakage on a crowded bus lowers the HIGH level and slows the end of the edge* — simplifying | F-a (a), F-b (a), decided; UM10204 Rev. 7.0, Table 10 |
| `notes` | `include: true` | print |

**Colours and their second channel** (C4): the line teal, the 10 kΩ edge teal **dashed**; the thresholds violet dashed with
their labels; the columns amber, the 10 kΩ one dashed, and **left / right** in the legend; the limit rose dashed and
labelled; on the Equation, I_sink amber and R_p teal, each with its label in the Symbols pane.

**Values beside their element** (B14, B16): the two slider values with their units; the x markers' labels; the y ticks; in
Study the hover readout. The times and currents (1694.6 and 169.5 ns; 0.29 and 2.9 mA; 300 ns at 1.77 kΩ) are **spoken** or
read off the axes, not written on the plot (B13), until X13 can label a live value. On the Equation, the Example pane.

## 4. The run: step by step, as the Flow goes

### 4a. Steps

The five slides in the order the Flow reaches them, each with the fence that follows its block (F1 (a), decided and
applied: the five fences are in `en.md`).

| # | id | Flow fence and paragraph (first words) | What changes (`say`) | Block, setting | Presenter's control |
|---|---|---|---|---|---|
| — | the PLAN's poe | **fence 1**: p1 `[[ask]]` *"Make the pull-up ten times smaller…"*, p2 `[[pause]]` | (§7a) | the poe (widget-focus) | the activity |
| 0 | `s0-ten-times` | **fence 2**: p3 (a direction: the plot opens) | Two pull-ups on one 200 pF bus: 10 kΩ dashed, and ten times smaller, 1 kΩ, solid. | plot A, R_p 1 kΩ, C_b 200 pF | (the slide opens) |
| 1 | `s1-both-change` | fence 2: p4 *"[[reveal]] Both change, and in opposite directions."*, p5 *"When the output lets go…"*, p6 *"But when the output pulls low…"* | Ten times smaller: the edge reaches 70 % ten times sooner, and the column is ten times taller. | plot A held | the laser on the two 70 % crossings, then the two columns (mirrored ink, M07-c) |
| 2 | `s2-the-limits` | fence 2: p7 *"Let us put numbers on it…"* to *"…sink 3 mA."* | Fast mode allows 300 ns from 30 % to 70 %, and asks its outputs to sink 3 mA. | plot A held | the laser on the 300 ns line, then the 3 mA line |
| — | the PLAN's numeric | **fence 3**: p8 `[[ask]]` *"With 200 pF of bus capacitance…"*, p9 `[[pause]]` | (§7a) | the numeric (widget-focus) | the activity |
| 3 | `s3-largest` | **fence 4**: p10 *"300 ns divided by 0.85 × 200 pF is about 1.8 kΩ…"* | At 1.77 kΩ the edge reaches 70 % on the 300 ns line, and sinks 1.64 mA, under 3 mA. | plot B, R_p 1.77 kΩ | (the slide opens) |
| 4 | `s4-floor` | **fence 5**: p11 *"That is the trade…"* | The sink current is the 2.9 V across the pull-up over R_p: 3 mA at 966.7 Ω, the floor. | Equation, Example pane (E1–E4), the graph with the shaded valid region | (the slide opens), pane |

Suggested words for the strip (B20): s1 *"Watch where each edge crosses the upper dashed line, then compare the two columns."*;
s3 *"The solid edge meets 70 % right on the Fast-mode line; the dashed 10 kΩ gets there only at 1.7 µs, past the
Standard line too."*

**The PLAN's Drive, for the strip** (F3 (a), decided; on the wall when X12's presets land), C_b 200 pF: *10 kΩ: 1695 ns,
misses both · 4.7 kΩ: 796 ns, Standard only · 1.5 kΩ: 254 ns, Fast, sinks 1.93 mA · 820 Ω: 139 ns, but sinks 3.54 mA, past
3 mA.* It is the presenter's reference for questions and the Study explore (§7e); the Flow does not speak it, and it is not
dragged on the wall window (F3 (b), not taken), so it adds no time.

### 4b. Motion, cues and stills

| # | Motion | Movers | Cue and its second channel | Hold | Reduced motion (C3) | Still |
|---|---|---|---|---|---|---|
| 0 | none (the slide appears) | 0 | two labelled edges, solid and dashed; two columns, left and right | hold | same | s0 |
| 1 | the presenter's laser (hand-paced, ≈ 3 s) | 1 (the laser) | the dot on each 70 % crossing, then on each column top | hold | the laser is the presenter's hand; the still carries the state | s1 (= s0's picture with its `say`) |
| 2 | the laser (≈ 3 s) | 1 | the dot on the 300 ns line and on the 3 mA line | hold | same | s2 |
| 3 | none (the slide appears) | 0 | the solid edge meeting the 70 % level on the 300 ns line | hold | same | s3 |
| 4 | none (the slide appears; one pane press) | 0 | the Example pane's four rows; the shaded region's edge at 967 Ω | hold | same | s4 |

Three wall stills (s0, s3, s4) plus the Equation's print form. No `animate` (F1).

## 5. Pacing and interaction, by surface and view

**Who paces** (B12): on the wall the presenter (the Equation's pane and step are mirrored; the plot's state is its defaults;
the laser is mirrored ink). In Study Mode and Scope, the learner.

| View | Who | Controls |
|---|---|---|
| Preview (in the slide) | everyone | the plot with its two sliders; the equation and its current pane |
| View (details) | everyone | plot: the sliders *Pull-up (R_p)* and *Bus capacitance (C_b)* **side by side on one row**, each with its label above in words, the symbol in parentheses and the value with its unit at the label's right (`sliders-side-by-side`); the hover readout. Equation: every pane (Symbols, Terms, Proof, Example, Rearrangements, Assumptions) and the graph's hold sliders (V_DD, V_OL), one row |
| Edit (session only) | everyone | not specified for the Plot or Equation Bench |
| Authoring | authors | the `plot` and `equation` blocks' YAML |

- **The presenter's strip** (B20): the steps of §4a with their `say`, the suggested words, the PLAN's Drive (§4a, F3 (a)),
  the teacher tip (§7d); keys: Next /
  Back for the slides, the laser key (M07-c), the Equation's pane keys.
- **Study / Scope**: R_p and C_b free on both plots; the readout; the Equation's examples, rearrangement and boundary; the
  explore task (§7e).
- **Phone** (C6): the plot full width, the two sliders one per line under it (the row wraps); the legend under the
  sliders; the equation then its pane, full width. At 320 px the column zone is ≈ 40 px wide: the two columns ≈ 10 px each
  (check they stay apart, §10).
- **Locked**: plot A opens only after the poe is answered and plot B only after the numeric (B9): each is the slide after
  its activity.

## 6. The frame

| Tile / panel | Used? | Selected item | List / contents |
|---|---|---|---|
| Plot legend | yes | — | edge, edge10k, v30, v70, sink10k, sink, limit3 |
| Plot sliders | yes | R_p and C_b with their units | two, one row |
| Plot readout | yes (hover, Study) | t and each finite curve | — |
| Equation panes | yes | the pinned symbol or term with its note | Symbols, Terms, Proof, Example, Rearrangements, Assumptions |
| Equation graph | yes | — | I_sink against R_p, the valid region, the four example dots |
| Ink (laser) | yes (s1, s2) | — | the laser over the plot |

The Canvas header and footer of each bench (D4.10–4.12); no inset. The column zone is the stand-in for a gauge (F2).

## 7. Thinking, not watching

- **7a. The PLAN's ASKs** (verbatim):
  - *poe (before the statement) — "Make the pull-up ten times smaller. What happens to the rising edge, and to the current
    the output must sink?" · options: Edge 10× faster, sink current 10× larger | Edge faster, current unchanged | Edge
    unchanged, current larger | Edge slower, current smaller · answer: Edge 10× faster, sink current 10× larger · reveal: R
    divided by ten on the Plot; the sink column ten times taller · explain: The rise time is set by R·C
    and the low-level current by (3.3 − V_OL)/R, so one resistor sets both, in opposite directions. · depth: understand ·
    practice: developing models.* It fires at p1 (fence 1), **before the bench appears**; **s0–s1 reveal it** (plot A: 1 kΩ beside the
    dashed 10 kΩ, the 1 kΩ column ten times the 10 kΩ one: the reveal as the PLAN now words it, F4 (a), decided).
  - *numeric (after the statement) — "A Fast-mode bus must rise from 30 % to 70 % in 300 ns. It has 200 pF of capacitance
    at 3.3 V. What is the largest pull-up that still meets the rise time?" · answer: 1.77 kΩ ± 0.1 kΩ · reveal: R slider
    set to 1.77 kΩ: the 70 % crossing lands on the 300 ns marker · explain: 30 %→70 % takes R·C·ln(0.7/0.3) ≈ 0.847·R·C, so
    R ≤ 300 ns / (0.847 × 200 pF) ≈ 1.77 kΩ, and the 3 mA sink limit sets the floor at (3.3 − 0.4) V / 3 mA ≈ 0.97 kΩ: a
    window of about 1.0–1.8 kΩ. · depth: create · practice: designing solutions.* It fires at p8 (fence 3), after s2; **s3 reveals it**
    (plot B at 1.77 kΩ) and s4 shows the floor.
- **7b. Prediction points on the bench**: none beyond the two ASKs.
- **7c. After**: the explains, as above. In Study, done means both activities answered and R_p moved on either plot.
- **7d. Teacher tip** (F6, taken; with F-a (a) and F-b (a), decided): *Expect "edge faster, current unchanged" (the current thought of as the load's,
  not the pull-up's) and "edge slower, current smaller" (a smaller resistor read as "less"). Ask: what does the pull-up
  charge, and what is across it when the line is held low? For the FAULT: a 10 kΩ pull-up is fine in Fast mode only below
  about 35 pF (300 ns / (0.8473 × 10 kΩ)); on this 200 pF bus its edge takes 1.7 µs. It fails "only sometimes" because a
  real input's threshold sits somewhere between 0.3 and 0.7·V_DD and moves with the part, the temperature and noise, so a
  slow edge that is short of 0.7·V_DD when the clock samples is read HIGH on some bits and LOW on others; only the bits where
  SDA rises just before SCL are at risk. The model behind "ten times more current": the low level held at 0.4 V, UM10204's
  design rule, exact at the 3 mA limit where it sets the floor. A real output pulls lower at small currents, so at 10 kΩ one
  sinks about 0.33 mA rather than 0.29, and the 10 kΩ → 1 kΩ step is about 9×, not exactly 10×. And 3 mA is Fast mode's
  figure at that 0.4 V; its outputs must also sink 6 mA at 0.6 V, so at 820 Ω (3.5 mA) the line still goes low, with less
  noise margin.*
- **7e. Explore** (B11; F6, taken; the Drive here by F3 (a), decided): in Study, (1) the PLAN's Drive: R_p at 10, 4.7, 1.5 and 0.82 kΩ, C_b at 200 pF
  (misses both; Standard only; Fast; Fast but past 3 mA); (2) *at 400 pF, the most a bus may carry, find the largest pull-up
  for Fast mode* (885 Ω, under the 967 Ω floor: no resistor meets both at 400 pF).

## 8. Faithfulness (the quality bar)

**Arithmetic** (Node, 2026-10-20). The rise from 30 % to 70 % of V_DD: 0.3 = 1 − e^(−t₃₀/RC), 0.7 = 1 − e^(−t₇₀/RC), so
t₇₀ − t₃₀ = RC·ln(0.7/0.3) = RC·ln(7/3) = **0.84730·RC** (✓ UM10204's 0.8473; the Flow's *"about 0.85 × R × C"* ✓). With t
from the 30 % crossing, v = 3.3·(1 − 0.7·e^(−t/RC)): v(0) = **0.99 V** ✓, v(0.8473·RC) = **2.31 V** ✓ (F4). From the
release the crossings are at 0.35667·RC and 1.20397·RC (126 and 426 ns at 1.77 kΩ, 200 pF: the brief's ✓).

| R_p at 200 pF | R_p·C_b (ns) | 30 → 70 % (ns) | Standard ≤ 1000 | Fast ≤ 300 | (3.3 − 0.4)/R_p | v at 2000 ns |
|---|---|---|---|---|---|---|
| 10 kΩ | 2000 | **1694.6** (✓ PLAN 1.69 µs, Flow *"about 1.7 µs"*) | misses | misses | **0.290 mA** (Equation: 290 µA) | 2.450 V |
| 4.7 kΩ | 940 | **796.5** (✓ PLAN 0.80 µs) | meets | misses | 0.617 mA | 3.025 V |
| 1.77 kΩ | 354 | **299.9** (✓ lands on 300 ns) | meets | meets | **1.638 mA** | 3.292 V |
| 1.5 kΩ | 300 | **254.2** (✓ PLAN 254 ns) | meets | meets | **1.933 mA** (✓ PLAN 1.9) | 3.297 V |
| 1 kΩ | 200 | **169.5** | meets | meets | **2.900 mA** | 3.300 V |
| 966.7 Ω | 193.3 | 163.8 | meets | meets | **3.000 mA** | 3.300 V |
| 820 Ω | 164 | **139.0** (✓ PLAN 139 ns) | meets | meets | **3.537 mA** (✓ PLAN 3.5, past 3) | 3.300 V |

- **The window** (✓ the numeric, the explain, p10): R_max = 300 ns / (0.84730 × 200 pF) = **1.7703 kΩ** (the numeric's
  1.77 kΩ ± 0.1 ✓; with the Flow's 0.85, 300 / 170 = 1.765 kΩ, *"about 1.8 kΩ"* ✓, inside the tolerance); R_min =
  2.9 V / 3 mA = **0.9667 kΩ** (*"about 1 kΩ"* ✓, the explain's *"≈ 0.97 kΩ"* ✓). Window ≈ 1.0–1.8 kΩ ✓.
- **The poe** (A3): ten times smaller, the rise time is exactly ten times shorter (1694.6 → 169.5 ns) and, with the low
  level held at 0.4 V, the current exactly ten times larger (0.290 → 2.900 mA). With a real output the ratio is less than
  ten (F-a, below).
- **Slider extremes** (A3): R_p 20 kΩ, C_b 400 pF: R_p·C_b = 8000 ns, v(2000) = 1.50 V (the edge still under 70 % at the
  zone's end, drawn correctly); R_p 0.5 kΩ, C_b 50 pF: 21.2 ns, the edge near-vertical at t = 0; the column at 0.5 kΩ is
  5.80 mA, inside `range` [0, 6]. At 50 pF a 10 kΩ pull-up meets Standard (423.6 ns); at 400 pF, R_max = **885 Ω < 967 Ω**:
  no resistor meets both (§7e).
- **The FAULT** (A5): a 10 kΩ pull-up meets Fast mode's 300 ns only for C_b ≤ 300/(0.8473 × 10) = **35.4 pF**, and
  Standard's 1000 ns for C_b ≤ 118 pF, so a 100 kHz design with ≤ 118 pF works and the same resistor on a busier 400 kHz bus
  does not. From the release, the 10 kΩ, 200 pF edge reaches 0.7·V_DD after 1.204 × 2000 = 2408 ns, more than a Fast-mode
  SCL low period (≥ 1.3 µs). *"Only sometimes"* ✓: the guaranteed V_IH is 0.7·V_DD but a real input switches somewhere
  between 0.3 and 0.7·V_DD and the slow edge crosses that band slowly, so the read depends on the part, temperature, noise
  and the bit pattern (only SDA rising just before SCL is at risk), and a master that waits for SCL to rise (clock
  synchronisation) adds time on some bits. No finding.
- **A real output's low level** (F-a, **accuracy**): an output that just meets 0.4 V at 3 mA is ≈ 133 Ω on; with it the
  current is 3.3 V/(R_p + 133 Ω): **0.326 mA** at 10 kΩ (the formula gives 0.290, −11 %), 1.734 mA at 1.77 kΩ (1.638,
  −6 %), **3.000 mA at 966.7 Ω** (exact), and an ideal switch would sink 0.330 mA at 10 kΩ (−12 %; up to 14 % more than shown
  is the bound with the low level at 0 V: 3.3/2.9 = 1.138). The 10 kΩ → 1 kΩ ratio is **8.9×** for the 133 Ω output, 10×
  only with a fixed low level. The formula is UM10204's design rule and exact at the limit it is used for.
- **Fast mode's 3 mA** (F-b, **accuracy**, decided (a)): UM10204 specifies I_OL ≥ 3 mA at V_OL = 0.4 V for Standard and Fast
  mode, and for Fast mode also I_OL ≥ 6 mA at V_OL = 0.6 V (**Table 10**, *Characteristics of the SDA and SCL I/O stages*, of
  Rev. 7.0, 1 October 2021, re-read 2026-10-20; round one's *Table 9* is that edition's *mixed-speed bit rates*; its note: *6 mA I_OL is required at 0.6 V V_OL* to
  drive full bus load at 400 kHz). t_r (1000 ns Standard, 300 ns Fast), C_b (400 pF), f_SCL and the noise margins are in
  Table 11 (the bus lines); 0.8473·RC and R_p(min) in §7.1. V_IL =
  0.3·V_DD = 0.99 V: the low-level noise margin is 0.59 V at 0.4 V and 0.39 V at 0.6 V. At 820 Ω, (3.3 − 0.6)/820 = 3.29 mA:
  within 6 mA, so the line still goes low, with less margin.
- **D1·070** (A4): *"the same exponential we met at the ADC's sampling capacitor yesterday"*: D1·070's R_on 1 kΩ and C_s
  10 pF charge as 1 − e^(−t/RC) (the course's ADC-input model) ✓.
- **The Equation's examples**: 2.9/10000 = 2.90 × 10⁻⁴ A → *290 µA*; 2.9/1770 = 1.6384 mA → *1.638 mA*; 2.9/966.7 =
  2.99990 mA → 4 figures *3.000* → *3 mA*; 2.9/820 = 3.5366 mA → *3.537 mA*. The boundary is sampled on 601 points over
  [500, 10200] Ω (16.17 Ω apart): the first valid sample is **968.8 Ω**, 2.2 Ω (0.14 px on a 600 px graph) from 966.7 Ω.
- **Pixels** (`range` [0, 6] over ≈ 344 px of the default frame; `domain` 2400 ns over 644 px): 1 V or 1 mA ≈ 57 px; the
  1 kΩ column (2.90 mA) stands ≈ 6 px under the 3 mA line (visible); 1 ns ≈ 0.27 px, so 299.9 ns sits 0.03 px from the
  300 ns line; each column is 100 ns ≈ 27 px wide, 50 ns (13 px) apart.

**Section D, Plot rows**
- [x] The expression is the physics: an RC charge from the 30 % crossing (F4), the PLAN's formula, UM10204's thresholds.
- [x] Axis and slider ranges real: 0.5–20 kΩ and 50–400 pF (the PLAN; 400 pF is UM10204's C_b max); 0–2000 ns covers the
  Drive's slowest edge (1694.6 ns).
- [x] One worked value: plot A at the hover t = 169.5 gives `edge` 2.310 V; t = 1694.6 gives `edge10k` 2.310 V; the columns
  read 2.900 and 0.290. Plot B at t = 299.9 gives `edge` 2.310 V and the column 1.638.
- [x] No artefacts: the curves stop at their zone edges; nothing above `range`.

**Section D, Equation rows**
- [x] Symbols as the course and UM10204: V_DD, V_OL, R_p; I_sink as p6's *"the current … sink"*.
- [x] Every example recomputed above to the digits shown.
- [x] The graph's boundary edge within 2.2 Ω of the floor.

**Round two re-check** (2026-10-20, A1–A7 on what changed): A1 every number touched recomputed in Node:
3.3·(1 − 0.7·e^0) = 0.990 V, 3.3·(1 − 0.7·e^(−ln 7/3)) = 2.310 V; ln(7/3) = 0.84730; 0.84730 × 354 = 299.9 ns,
× 2000 = 1694.6 ns; 2.9/1.77 = 1.638 mA, 2.9/10 = 0.290 mA; 2.9 V/3 mA = 966.7 Ω; (3.3 − 0.6)/820 = 3.29 mA, under
6 mA; 0.99 − 0.4 = 0.59 V and 0.99 − 0.6 = 0.39 V; the strip's Drive 1695, 796, 254, 139 ns (796.46) and 1.93, 3.54 mA; the tip's
0.33 mA and 9× (0.326 and 8.94); E3's note (3.6 − 0.4)/3 mA = 1.067 kΩ; §2a's beats 3.81 / 2.06 min (round one printed
3.75 / 2.01: our slip, corrected; the card stays 3.8). A2 the fixed low level and Fast mode's 3 mA at 0.4 V are now stated on
the bench (caption, limit label, assumptions 1 and 2, the tip). A3 the slider ends and the 299.9 ns crossing unchanged.
A4 the PLAN's new SHOW and reveal quoted from `en.md` and matched to §3a and §4a; the five fences match §4a. A5 no physics
changed. A6 the tip's *"about 9×"* and *"about 0.33 mA"* are sized; E3's *"the smallest … on 3.3 V"* says which supply.
A7 UM10204 Rev. 7.0 re-read: Table 10 (V_OL, I_OL 3 mA at 0.4 V, 6 mA at 0.6 V, C_i), Table 11 (t_r, C_b, f_SCL, V_nL,
V_nH), §7.1 (0.8473·RC, R_p(min)). No finding.

**A1–A8** (round one): A1 ✓ (Node, above); A2 ✓ with F-a raised (the fixed low level is the course's only modelling choice here, now
stated); A3 ✓ (the poe's ten times exact under the model, 8.9× for a real output; 299.9 ns on the line; the slider ends);
A4 ✓ (D1·070's RC charge; card 6's 4.7 kΩ and 0.7 mA are a different, 3.3 V/4.7 kΩ case and not contradicted); A5 ✓ (an
open-drain output off when it lets go; the pull-up's current all into the output when low; the FAULT's physics); A6 ✓ with
F-a and F-b raised (*"ten times more current"*, *"only have to be able to sink 3 mA"*); A7 ✓ (UM10204 for t_r, the 30–70 %
definition, V_OL and I_OL, C_b, R_p(max) and R_p(min); the 6 mA at 0.6 V re-read in round two: Table 10 of Rev. 7.0); A8 ✓.

## 9. Faults and non-ideal behaviour

**PLAN FAULT** (verbatim): *A 10 kΩ pull-up carried over from a 100 kHz design onto a 400 kHz bus: the edge has not reached
0.7·VDD when the clock samples, and the bus fails only sometimes.* On the bench it is the dashed `edge10k` on every showing:
at 200 pF it crosses 70 % at 1694.6 ns, past both markers. The *"only sometimes"* is in the teacher tip (§7d), checked in §8.

Also, beside the ideal (A2): a real output's low level falls with current (F-a: up to 14 % more current than shown at
10 kΩ); past 3 mA the low level rises toward 0.6 V (F-b); input leakage on a crowded bus (the Equation's assumption 3); the
on-circuit edge with the driver's own fall, which needs the Electronics transient solve (the PLAN's Status; not this card).

## 10. Accessibility, legibility and print

- Wall (C2): axis labels, the seven legend entries, the two slider rows, the three marker labels, the Equation's panes at
  the benches' wall sizes. Check at 1920 × 1080 and 1024 × 768 that (1) the *Fast mode: 300 ns* label clears the
  *Standard mode: 1000 ns* label (≈ 190 px apart at 720 px); (2) the divider's label *Sink current (mA)* (FR *Courant
  absorbé (mA)*) fits between x = 2020 and the frame's right edge (≈ 100 px at 720 px): if it does not, it becomes *mA* in
  both languages; (3) the two columns and the limit line read apart from the edges (the time curves end at 2000 ns, the
  divider at 2020).
- Reduced motion (C3): nothing animates; the laser is the presenter's hand; the stills carry each state.
- Colour (C4): dash, position (left / right, solid / dashed) and labels as well as hue; check teal against violet and amber
  against rose under deuteranopia.
- Keyboard (C5): Next / Back; each slider's arrow keys (10 Ω and 5 pF a press); the Equation's pane keys; the laser key.
- Print (C8): the stills s0, s3, s4 with their `say`; the derivation with its notes; the examples and assumptions.
- Languages: every label, note, caption and assumption `{en, fr}`; the French drafts are ours, for the owner's review;
  numbers and units are not translated.

## 11. Assets to make or source

| Asset | Format | Made by | Status |
|---|---|---|---|
| The two `plot` blocks (§3a, A and B), EN and FR | YAML in `en.md` | the author (FR drafts for the owner's review) | to write (F1 decided: the five fences are in `en.md`; plot A goes before fence 2, plot B before fence 4; the authoring note beside B, §3a) |
| The `equation` block (§3b), EN and FR | YAML in `en.md` | the author | to write (before fence 5) |

## 12. Bench capabilities this needs

**Plot Bench, exists**: `variable`, `domain`, `range`, `parameters` with `unit` and `step`, `curves` with `exp` and `step`,
`dashed`, `fill`; `markers` on x; `readout`; `fixedView`; `caption`; the viewer's gaps at non-finite samples.

**Equation Bench, exists**: statement, symbols, a term highlight, derivation, examples, a rearrangement, a boundary on the
graph, assumptions, `markExamples`; pane and step mirrored.

**Ink**: the laser, mirrored (M07-c) — exists.

**To confirm when written**:
- (a) that **four lead blocks and two activities under one heading** compile in the order poe → plot A → numeric → plot B →
  equation, each lead block opening its own slide with the Flow fence after it (F1 (a), decided: the fences are split in
  `en.md`);
- (b) that a `fill` on a curve confined by `step()` shades only its segment (`fillPathFor` closes each segment: the code
  reads so);
- (c) that a curve may repeat another's colour (teal twice, violet twice, amber twice);
- (d) that the boundary with V_DD and V_OL held shades from 968.8 Ω and the four example dots draw;
- (e) where the block's card in the reading column is shown: it lists every curve's expression in `code`
  (`apps/desktop/.../blocks/Plot.vue`, read 2026-10-20), so the `step()` terms are visible wherever the text is (Study,
  Scope, and the wall if it shows the reading column). This is why X-curve-domain is asked for **before D2·010 is
  presented**, not after.

**Missing: asked of Benches in one crossing** (F2 (d) and F7, decided 2026-10-20, round two; raised as crossing **519**, 2026-10-20;
working names until Benches numbers them):
- **X-plot-gauge**: a Plot `gauges` field: a value that is an expression of the parameters (not of x), drawn
  as a bar beside the plot area on **its own axis** (unit, range, label), with labelled limit lines, part of the block (so
  it is at its defaults on the wall, and live in Study). Here: *Sink current (mA)*, 0–6 mA, the 3 mA line, the 10 kΩ bar
  dashed. It returns the plot's y axis to volts only, [0, 3.6], as the brief drew. Until then: the column zone (F2).
- **X-curve-domain**: a curve's own `from` / `to` on x, so a level or a column is drawn over part of the axis
  without `step()` terms in its expression. Until then: `/ step(…)`.

**Would help (already listed in `bench-work/requests-to-exsight.md`, still *to raise*)**: **X12** (Plot presets mirrored:
the PLAN's Drive, 10 → 4.7 → 1.5 → 0.82 kΩ, on the wall, and the 1 kΩ and 1.77 kΩ showings and card 10's copy as presets
of one block; F3 (a): later); **X13** (a point whose position
is an expression: an amber dot on each 70 % crossing, as the brief drew); **X10** (a curve hidden until a reveal); **X21**
(crossing 506: a reference line on the Equation's graph at 3 mA on y).

**Not this card's**: the on-circuit edge (the PLAN's Status: Electronics, a transient solve with bus capacitance; the
Electronics Bench is in development, D1). Two blocks side by side (the PLAN's first *"Beside it"*, now reworded, F4) is Studio's, not a bench's (D4).

## 13. Stand-in for the lecture

None needed for the blocks: every field of §3 exists. What stands in for the target is named in §12: the column zone and
its shared numbers for X-plot-gauge, `step()` for X-curve-domain (both asked, one crossing), two showings and the Drive in
Study and on the strip for X12. The Flow is split (F1 (a), decided and applied), so each reveal waits for its activity
and nothing depends on the presenter dragging a slider on the wall window.

## 14. Findings for the owner

- **F-a (accuracy; register D2·010-F7) — "Ten times smaller, ten times more current" and the columns' (3.3 − 0.4)/R.**
  p6 and the poe's answer are exact only with the low level held at 0.4 V whatever the current. A real output pulls lower
  at small currents: one that just meets 0.4 V at 3 mA (≈ 133 Ω) sinks **0.326 mA** at 10 kΩ, not 0.29 (an ideal switch
  0.33 mA; up to 14 % more than the formula), and the 10 kΩ → 1 kΩ step is **8.9×**, not 10×. The formula is UM10204's design
  rule and **exact at the 3 mA limit** where the course uses it (966.7 Ω). The answer *"Edge 10× faster, sink current 10×
  larger"* stays the best option. Options:
  - (a) the Flow unchanged; the bench states the model: the caption's *"the low level taken as 0.4 V"*, the Equation's
    assumption 1 with the sizes, the teacher tip (**recommended**: the room hears the course's model, the bench states it);
  - (b) as (a), and p6 reads *"…Ten times smaller, about ten times more current."* (the owner's words);
  - (c) model the output as a resistance on the bench (3.3 V/(R_p + 133 Ω)): the columns would no longer be the PLAN's or
    UM10204's formula (not recommended).
  **Decided: (a), applied** (round two): the caption, assumption 1 and the teacher tip state the model (§3a, §3b, §7d).
- **F-b (accuracy; register D2·010-F8) — "its outputs only have to be able to sink 3 mA"** (p7) and the PLAN's *"past what a
  Fast-mode output must guarantee"*. UM10204 gives Fast mode **3 mA at V_OL 0.4 V and 6 mA at V_OL 0.6 V**; the 3 mA is
  the figure at the 0.4 V low level p6 has just named, and the one R_p(min) uses. At 820 Ω (3.5 mA) the bus still goes low,
  with its low level no longer guaranteed at 0.4 V (noise margin 0.59 → 0.39 V at 0.6 V). Options:
  - (a) the Flow unchanged; the limit line reads *"3 mA: what a Fast-mode output must sink at 0.4 V"*, the Equation's
    assumption 2 names the 6 mA at 0.6 V (**recommended**: p7 follows p6's *"the 0.4 V low level"*, and the bench says
    which low level);
  - (b) p7 reads *"…and its outputs only have to be able to sink 3 mA at that 0.4 V low level."*;
  - (c) no change anywhere (not recommended: a learner reading UM10204 finds 6 mA).
  **Decided: (a), applied** (round two): `limit3` and assumption 2 as (a), the 6 mA sourced to UM10204 Rev. 7.0 Table 10
  (§3a, §3b, §8).
- **F1 — The card as five slides, the Flow fence split.** Each lead block opens its own slide, an activity takes the wall,
  and a Flow fence belongs to the block before it. So the card's one fence becomes five, **no word changed**: p1–p2 after
  the poe, p3–p7 after plot A, p8–p9 after the numeric, p10 after plot B, p11 after the equation. Without the split the
  numeric's answer (p10) would be on the same slide as its question, before the numeric card. Options: (a) split
  (**recommended**: each block as the Flow reaches it, each reveal after its activity, the decided D4 order); (b) one plot,
  the presenter dragging R_p on the wall window, the numeric placed after p11 (its answer spoken first: not recommended);
  (c) as (a) without plot B, the numeric's reveal spoken over the Equation (loses *"lands on the 300 ns marker"*).
  **Decided: (a), applied** in `en.md` by the lead (five fences, no word changed; §2a, §4a).
- **F2 — Proposal: the sink current as a column in the same frame** (D4, *"as drawn"*). With one y axis, the columns stand
  at the right of the time axis (2000–2400 ns, past the last tick) on the same numbers as the volts (1 V ↔ 1 mA), said by
  the y label, a divider marker and the caption; `range` [0, 6] keeps the slider's 5.8 mA in the frame (the bus's 3.3 V uses
  55 % of the height); the 30 % and 70 % levels become dashed level curves over the time zone so they do not cross the
  columns (the PLAN says *"horizontal markers"*: same look, labels in the legend). Options: (a) as specified
  (**recommended** until X-plot-gauge); (b) the thresholds as full-width y markers labelled on the plot (they then cross
  the columns at 0.99 and 2.31); (c) `range` [0, 4] with the column clipped at the frame: not available (no clip path; it
  would draw above the frame); (d) ask Benches for X-plot-gauge now (§12; **recommended alongside (a)**, one crossing with
  X-curve-domain). **Decided: (a) and (d)**: the column zone as specified (§3a), and the crossing for X-plot-gauge and
  X-curve-domain drafted (§12).
- **F3 — The PLAN's Drive (10 → 4.7 → 1.5 → 0.82 kΩ) is not on the wall today.** Plot sliders are not mirrored. The Flow does
  not speak the four values; it needs 10 kΩ, ten times smaller (1 kΩ) and 1.77 kΩ, which the showings carry. Options: (a)
  the Drive in Study (§7e) and on the strip, and as X12 presets when they land (**recommended**); (b) the presenter drags
  R_p through the four on the wall window over p5 (+0.3 min, not mirrored to devices); (c) a family plot of the four (seven
  more legend entries: not recommended). **Decided: (a)**: the Drive in Study (§7e) and on the strip (§4a); X12's presets
  later (§12).
- **F4 — The PLAN's wording after D4.** SHOW still reads *"Beside it an Equation"* and the poe's reveal *"the Equation's
  sink current multiplied by ten"*; under D4 the sink current is the plot's column and the Equation follows the numeric.
  Options: (a) the owner updates the two lines (e.g. *"…in the same Plot, a sink-current column … then, after the numeric,
  an Equation…"*; *"reveal: R divided by ten on the Plot; the sink column ten times taller"*) (**recommended**: the PLAN
  says what is built); (b) leave the PLAN as it is, this spec being the record. **Decided: (a), applied** in `en.md`: SHOW
  *"In the same frame, the sink current (3.3 V − 0.4 V)/R as a column against the 3 mA Fast-mode limit; then, after the
  numeric, an Equation: sink current = (3.3 V − 0.4 V)/R, with the 3 mA limit marked."*, the reveal *"R divided by ten on
  the Plot; the sink column ten times taller"* (§1, §7a).
- **F5 — The FAULT** (*"…the bus fails only sometimes"*): physics checked (§8): a 10 kΩ pull-up suits ≤ 35 pF in Fast mode,
  ≤ 118 pF in Standard; on 200 pF it is 1.7 µs; *"only sometimes"* because the real threshold lies between 0.3 and 0.7·V_DD
  and the slow edge crosses it slowly. ✓, no finding; the explanation goes in the teacher tip. **Noted** (round two; the tip
  as §7d).
- **F6 — Proposals**: the two showings at 1 kΩ and 1.77 kΩ with the 10 kΩ edge dashed on both; the caption and labels;
  the column zone's layout (F2); the Equation's derivation, examples E1–E4, rearrangement, boundary and assumptions; the
  graph's domain [500, 10200] Ω; the strip's suggested words; the teacher tip (§7d); the explore tasks (§7e); the FR
  drafts. **Decided: taken** (round two), as written.
- **F7 — Requests**: X-plot-gauge and X-curve-domain to Benches in one crossing (§12); X12 and X13 already listed.
  **Decided: the crossing** (round two): raised as crossing **519**.
- **F8 — The module runs ≈ 31.6 of 30 min** (§2b; D5 decided: reported only). **Reported** (round two): now **≈ 31.7**
  with the Flow changes of cards 2, 4 and 10 (§2b); nothing trimmed.

**Decided 2026-10-20 (owner: *"apply all recommendations"* on the U019 brief):** **F4** (the brief's, applied to `en.md`) —
t = 0 at the 30 % crossing, v = 3.3·(1 − 0.7·exp(−t/(R·C))), the axis *"time from the 30 % crossing (ns)"*, so the 70 %
crossing lands on 300 ns at 1.77 kΩ, 200 pF (§3a, §8); **D2** — the PLAN's benches: the Plot and the sink-current Equation;
**D4** — the sink current in the same Plot as a second band or gauge, the Equation on its own slide after the numeric (§3,
F2); **D5** — the module ≈ 3 min over, reported only (§2b); **N2** (applied) — the demo numbers removed (*"[[demo]] Plot
Bench — sweep the pull-up value…"*). The findings and proposals above (F-a, F-b, F1–F8) were new after round one, and
F-a and F-b, as **accuracy** findings, blocked the module until decided.

**Decided 2026-10-20, round two (owner: *"apply all recommendations"*):** every finding takes its recommended option.
**F-a** (D2·010-F7, accuracy) → (a): the Flow unchanged; the bench states the model (the caption's *"the low level taken as
0.4 V"*, the Equation's assumption 1 with the sizes, the teacher tip). **F-b** (D2·010-F8, accuracy) → (a): the Flow
unchanged; the limit line *"3 mA: what a Fast-mode output must sink at 0.4 V"*, assumption 2 naming 6 mA at 0.6 V
(UM10204 Rev. 7.0, Table 10). **F1** → (a): the five fences, applied in `en.md`. **F2** → (a) and (d): the column zone,
and X-plot-gauge asked now with X-curve-domain in one crossing. **F3** → (a): the Drive in Study and on the strip, X12's
presets later. **F4** → (a): the PLAN's SHOW and the poe's reveal reworded in `en.md`. **F5**: no finding. **F6**: the
proposals taken. **F7**: the crossing (raised: 519). **F8**: reported, ≈ 31.7 of 30 min. Re-checked A1–A7 on everything that
changed (§8, *Round two re-check*): no new finding. Two corrections of **our** work made before sending: §2a's sum
(3.81 / 2.06, not 3.75 / 2.01; `minutes` 2.0 → 2.1, the card still 3.8) and UM10204's table (Table 10 of Rev. 7.0, not
Table 9); one wording of ours made exact: E3's note says the floor is on 3.3 V (UM10204 sizes R_p(min) at the supply's
maximum: 1.067 kΩ at 3.6 V). **Nothing is open on this spec.**

**Raised 2026-10-20:** crossing **519** (X-plot-gauge and X-curve-domain; `C:\ExSightory\lanes\pbl2026-x\.claude\crossing\open\519-pbl2026-to-benches-plot-bench-a-gauge-beside-the-plot-and-a-curve-domain-for-d2-010-cards-7-10.request.md`, raised and pushed 2026-10-20, open).

## 15. Acceptance: how we know it is built right

- Plot A compiles with the fields of §3a (no warning) and shows, at the hover, `edge` 0.990 V at t = 0 and 2.310 V at
  t = 169.5, `edge10k` 2.310 V at t = 1694.6, `sink` 2.900 and `sink10k` 0.290 in the column zone, `limit3` 3.000; plot B
  the same with `edge` 2.310 V at t = 299.9 and `sink` 1.638. R_p at 0.5 kΩ: `sink` 5.800, inside the frame. Nothing is
  drawn past t = 2000 except the columns, the limit and the divider.
- The Equation compiles with no warning; the derivation's last line is the statement; the rearrangement for R_p checks;
  E1–E4 print 290 µA, 1.638 mA, 3 mA, 3.537 mA; the valid region starts at 968.8 Ω; pane and step reach the wall.
- The poe fires before plot A opens and s0–s1 reveal it; the numeric fires before plot B and s3 reveals it; each of the five fences is the
  teleprompter of the slide its block opens (fence 1 the poe, 2 plot A, 3 the numeric, 4 plot B, 5 the Equation: F1).
- B1 one change per slide; B2 only R_p changes between the showings; B4 the 10 kΩ edge dashed beside the live one; B5 each
  `say` on the strip; B6 the laser's dot on each crossing and column; B9 the reveals wait; B10 the explains; B11 R_p and C_b
  one control away in Study; B13 values spoken, not written; B14 every curve labelled; B16 values on the axes, sliders and
  readout; B17 both edges on one time axis, both columns on one scale; B20 the strip's words and tip.
- C2 at 1920 × 1080 and 1024 × 768, labels clear (§10); C3 nothing animates; C4 dash, position and labels; C5 keys; C6 at
  320 px, the two columns apart; C8 the print form.
- D Plot and D Equation rows as §8.
- E1–E6 for both blocks as presented, in both themes, EN and FR.
- **Six gates (this spec, round two re-checked 2026-10-20)**: (1) realism: UM10204's limits and definitions, a 3.3 V,
  200 pF bus, resistor values a designer would pick, nothing branded ✓; (2) science: the RC rise and its 0.8473 exact; the
  fixed low level and Fast mode's two current figures named, sized and **stated on the bench** (F-a (a), F-b (a), decided and
  applied) ✓; (3) maths: every time, current, window bound, pixel and printed value recomputed in Node (§8, round one and
  round two; §2a's sum corrected) ✓; (4) visualization: the edge and the current on one frame under one slider, the
  comparison dashed, both window bounds on the picture; the gauge on its own axis waits for X-plot-gauge (asked) ✓;
  (5) consistency: the PLAN's Drive numbers, the PLAN's reworded SHOW and reveal (F4), the five fences against §4a, the
  brief's palette and F4 axis, D1·070's RC charge, card 10's showing a copy of B with the same authoring note ✓; (6) design: one slider row with words and symbol, every curve labelled, clearances named with their checks and a
  fallback (§10) ✓ on paper.
