```yaml
id: D2-010-10-logical-and-electrical
card: "A logical problem and an electrical one"
module: notes/Day02/010-digital-interfaces/en.md
bench: Plot                       # card 7's centrepiece again (owner D2, 2026-10-20: the PLAN's benches); no new library
library: "pullup-rise (card 7's, `D2-010-07-choosing-the-pull-up.md` §3a): showing C, a verbatim copy of card 7's showing B — R_p 1.77 kΩ, C_b 200 pF, the 10 kΩ edge dashed, the 30 % and 70 % levels, the 300 ns and 1000 ns markers, the sink columns (1.638 and 0.290 mA) against 3 mA; defined in this card's own `plot` block"
dimensions: 2D
stand_in: "none for the block (card 7's fields); the checkpoint takes the wall when it opens (widget-focus), so the plot is on the statement slide for p1–p4 and the checkpoint follows (G1 (a), decided); an activity that keeps the Canvas is asked of Studio through the owner (G1 (c))"
optional_benches: []
real_thing: "the same I²C bus as card 7: 3.3 V, 200 pF, a 1.77 kΩ pull-up, UM10204's Fast-mode limits"
minutes: 0.9                      # on the bench: the statement slide, p1–p4 (§2)
card_minutes: 3.9                 # the whole card, the checkpoint and the transition included (§2: 3.94 after F9's five words)
status: spec-ready                # round two decided 2026-10-20 (owner: "apply all recommendations"): G5 (accuracy, D2·010-F9) decided (a) and applied in en.md; G1–G4, G6 decided; nothing open
learner_action: checkpoint
predictions: []
seeds: []                         # card 9 plants S50; nothing is harvested here
key_variable: "none moves: the state card 7 ended on, held, so the three requirements that fought (pull-up, capacitance, rise time) are on the wall while they are named"
time_scale: "none (no motion: one held plot state)"
steps: 1                          # s0
```

**Written 2026-10-20 (U019)** after the owner's choices on the U019 brief (*"apply all recommendations"*). **D2·010's module
time table is in `D2-010-07-choosing-the-pull-up.md` §2b**; this card's row there is this spec's §2. **Round two decided
2026-10-20** (owner: *"apply all recommendations"* on the U019 brief's *Specs: round two*): every finding of §14 takes its
recommended option; G5's clause and G2's second fence are in `en.md`.

**The formats, as read in source on 2026-10-20** (read-only, `C:\ExSightory\src\insight\packages\insight-core\src\`): the Plot
block is `livePush: false` and **not drivable**: its sliders and view are local to each window, and the wall shows a block
at its **authored defaults** (`registry/plotBlock.ts`). The Canvas is sticky **within a card** only (`registry/cards.ts`), and
card 9 sits between card 7 and this card, so card 7's last plot is not on the Canvas when this card opens and cannot be
recalled by reference: the block is written again here. Two identical blocks in one subsection get distinct ids by
occurrence (`compiler/blockId.ts`), so a verbatim copy compiles. `checkpoint` is `stage: 'solo'`, **`layout:
'widget-focus'`** and pushed to devices (`registry/blockRegistry.ts`): when it opens it takes the whole wall, and *"a quiz
never shares the stage"* (`resolveStageLayout`). A Flow fence attaches to the block before it, an activity included
(`registry/flow.ts`).

So *"the centrepiece rise-time Plot back on the Canvas"* is done by authoring card 7's showing B again, which guarantees
the exact state (a block's defaults are what the wall shows, whatever the presenter or a learner last dragged), and
*"while the room ticks its list"* is not possible on the wall today: the plot is on the statement slide while p1–p4 are
spoken, then the checkpoint takes the wall (G1 (a), decided), and an activity that keeps the Canvas is asked of Studio
through the owner (G1 (c), decided).

**Six gates** (this spec, 2026-10-20, round two re-checked): (1) realism: card 7's bus and UM10204's limits, nothing
branded — pass. (2) science: card 7's model and its stated assumptions, unchanged — pass (card 7's F-a (a) and F-b (a),
decided, are on the copy: its caption and limit label). (3) maths: the state's numbers recomputed (§8) — pass. (4)
visualization: the three requirements the Flow names are each on the picture (the R_p slider and the dashed 10 kΩ edge, the
C_b slider at 200 pF, the edges against the 300 and 1000 ns lines); capacitance is named as the load the pull-up charges,
held as on card 7 (G3 (a), decided: no 400 pF edge) — pass. (5) consistency: a verbatim copy of card 7's B with an authoring
note beside each (G4 (a)); the transition now says which code (*"in the course's own example"*: G5 (a), decided and applied)
and agrees with cards 1, 2, 4, 9 — pass. (6) design: card 7's — pass on paper.

## 1. What the room must understand

- **Statement** (verbatim): *A communication interface is both a logical and an electrical problem. The devices must agree
  on what the bits mean and when they move, and the signals carrying them must suit both devices.*
- **SHOW** (verbatim from the PLAN): *Plot — the centrepiece rise-time Plot back on the Canvas while the room ticks its
  list, so three of the requirements (pull-ups, input capacitance, rise times) are visibly the ones that fought.*
- **Drive**: none in the PLAN. **Look for**: none in the PLAN beyond the SHOW's *"visibly the ones that fought"*.
- **Status** (verbatim): *ready*
- **Bench and library.** The **bench** is the Plot Bench; the **library** is card 7's `pullup-rise`, in a third showing (C)
  identical to card 7's B (D2: the PLAN's benches; the brief: *"No new library"*).
- **Insight**: *the checklist is not abstract: three of its lines (pull-ups, input capacitance, rise times) are the
  quantities that fought on card 7, and the bits only arrive if every line is met.*
- **Kind of knowledge**: *a picture recalled* beside *a list*. No bench card test applies; the Plot is a reminder, not a
  new relation. B2, B4 and B16 apply; B15, B17–B19 do not.
- **Why this bench, not a still**: the plot is the one the room just drove (and, in Study, still can): the same picture
  keeps the three requirements tied to the window they set. A still would serve the wall equally (G3 (c), not taken); the
  block keeps it live in Study.
- **Key variable**: none moves on the wall; in Study R_p and C_b.

## 2. Time

The card's Flow is **181 words** counted as words (cue words not counted; re-counted from `en.md` after round two,
2026-10-20: G5's clause *"in the course's own example,"* adds 5); the brief's count is 192 (it counts the list's dashes
and markers; 187 before). It is **two fences** since G2 (a): **fence 1** p1–p4, after the plot (the statement slide);
**fence 2** p5, the transition, after the checkpoint. There is no activity question in the Flow; all of it is spoken.

| Beat | Minutes | Source of the number |
|---|---|---|
| s0 the statement slide opens with the plot (showing C), fence 1: p1 *"Even when two devices use the same communication standard…"* (22) and the nine-line list (29) | 0.39 | 51 ÷ 130 |
| fence 1: p3 *"You have just watched three of those…"* (19), the laser on the R_p slider and the dashed edge, the C_b slider, the 70 % crossings (mirrored ink, ≈ 3 s) | 0.20 | 19 ÷ 130 + 3 s |
| fence 1: p4 *"This is why a communication interface is both…"* (43), held | 0.33 | 43 ÷ 130 |
| The PLAN's checkpoint: nine items ticked on the devices, the tally read (the wall shows the checkpoint) | ≈ 2.5 | as D1·010's checkpoint (≈ 2.0) plus the reading of nine lines; estimate |
| fence 2, after the checkpoint (G2 (a)): p5 *"[[transition]] So far, in the course's own example, the code has come from the converter inside the microcontroller…"* (68; 63 before G5) | 0.52 | 68 ÷ 130 |
| **Card total / of which on the bench** | **3.9 / 0.9** | 3.94 / 0.92 (3.90 before G5's 5 words: + 5 ÷ 130 = 0.04; by the brief's 192 words, without the laser: 3.98) |

**Module**: D2·010 ≈ 31.7 of 30 min after round two (`D2-010-07-choosing-the-pull-up.md` §2b, with the rule for a Flow
change; D5, reported only).

## 3. The scene: what is on the bench

**The block**: card 7's showing B, copied field for field (`D2-010-07-choosing-the-pull-up.md` §3a): title *Choosing the
pull-up value*, the caption, `variable: t`, `domain` [0, 2400], `range` [0, 6], the sliders *Pull-up (R_p)* 0.5–20 kΩ
default **1.77** step 0.01 and *Bus capacitance (C_b)* 50–400 pF default **200** step 5 (one row), the markers at 300, 1000
and 2020, the curves `edge`, `edge10k`, `v30`, `v70`, `sink10k`, `sink`, `limit3` with their labels, colours and dashes,
`readout` on, `fixedView` true, no `animate`. **The copy must be kept identical to card 7's B**: an edit to one is made to
both. **The authoring note beside each copy** (G4 (a), decided), in `en.md` just before this card's `plot` block:
`<!-- AUTHORING: this plot is a verbatim copy of card 7's plot B ("Choosing the pull-up value"); edit both together until
Plot presets (X12) let one block serve both. Specs: D2-010-07 §3a, D2-010-10 §3. -->` (card 7's note, beside B, names
this card; `D2-010-07` §3a). The note is an HTML comment outside the block, so the two blocks stay identical.

**The state it returns to** (what the wall shows, by the defaults): the 1.77 kΩ edge (teal, solid) reaching 70 % at
**299.9 ns**, on the Fast-mode line; the 10 kΩ edge (teal, dashed) reaching it at **1694.6 ns**, past both lines; the right
column **1.638 mA** and the left **0.290 mA**, under the 3 mA line; the sliders reading *1.77 kΩ* and *200 pF*.

- **Meet the parts**: none new; the presenter's laser names the three requirements on the picture as p3 is spoken.
- **Colours and their second channel** (C4): as card 7 (dash, position, labels).
- **Values beside their element** (B14, B16): the slider values with their units, the axes, the marker labels.

**Not taken** (G3 (b)): a 400 pF edge beside the copy. The copy is card 7's B and nothing more (G3 (a), decided).

## 4. The run: step by step, as the Flow goes

### 4a. Steps

The order in `en.md`: the statement, plot C, **fence 1** (p1–p4), the checkpoint, **fence 2** (p5); each fence is the
teleprompter of the block before it (G1 (a) and G2 (a), decided; the split applied in `en.md`).

| # | id | Flow fence and paragraph (first words) | What changes (`say`) | Block, setting | Presenter's control |
|---|---|---|---|---|---|
| 0 | `s0-what-fought` | **fence 1**: p1 *"Even when two devices use the same communication standard…"*, the list, p3 *"You have just watched three of those…"*, p4 held | The pull-up, the bus capacitance and the rise time from card 7, beside the checklist they belong to. | plot C (card 7's B), R_p 1.77 kΩ, C_b 200 pF | (the slide opens); the laser on R_p, C_b and the edges at p3 |
| — | the PLAN's checkpoint | opens after p4 (§7a); **fence 2**: p5 *"[[transition]] So far, in the course's own example, …"*, spoken once the tally is read (G2 (a)) | (§7a) | the checkpoint (widget-focus) | the activity, then Next |

Suggested words for the strip (B20): s0 *"Pull-up: this slider. Capacitance: this one. Rise time: where each edge crosses the
70 % line."*

### 4b. Motion, cues and stills

| # | Motion | Movers | Cue and its second channel | Hold | Reduced motion (C3) | Still |
|---|---|---|---|---|---|---|
| 0 | the presenter's laser at p3 (≈ 3 s) | 1 (the laser) | the dot on each slider, then on the two 70 % crossings | hold | the laser is the presenter's hand; the still carries the state | s0 (= card 7's s3 picture) |

## 5. Pacing and interaction, by surface and view

**Who paces** (B12): on the wall the presenter (the plot at its defaults; the laser mirrored). In Study Mode and Scope, the
learner.

| View | Who | Controls |
|---|---|---|
| Preview (in the slide) | everyone | the plot with its two sliders |
| View (details) | everyone | the sliders *Pull-up (R_p)* and *Bus capacitance (C_b)* side by side on one row, each with its label above in words, the symbol in parentheses and the value with its unit at the label's right (`sliders-side-by-side`); the hover readout |
| Edit (session only) | everyone | not specified for the Plot Bench |
| Authoring | authors | the `plot` block's YAML (a copy of card 7's B) |

- **The presenter's strip** (B20): the step's `say`, the suggested words, the teacher tip (§7d); keys Next / Back, the laser.
- **Study / Scope**: R_p and C_b free; card 7's explore task (§7e there) again: at 400 pF no pull-up meets Fast mode.
- **Phone** (C6): as card 7.
- **Locked**: nothing.

## 6. The frame

| Tile / panel | Used? | Selected item | List / contents |
|---|---|---|---|
| Plot legend | yes | — | card 7's seven entries |
| Plot sliders | yes | R_p and C_b with their units | two, one row |
| Plot readout | yes (hover, Study) | t and each finite curve | — |
| Ink (laser) | yes (p3) | — | the laser over the plot |

## 7. Thinking, not watching

- **7a. The PLAN's ASK** (verbatim): *checkpoint (after the statement) — "Tick each electrical requirement you would check
  on an I²C datasheet." · items: logic voltage | input and output thresholds | maximum clock | output drive | pull-up
  requirement | input capacitance | rise and fall times | maximum length | noise environment · depth: use · practice:
  planning investigations.* It opens after p4; the nine items are the Flow's nine lines, in the same order ✓. When it opens
  it takes the wall (G1 (a), decided); fence 2, the transition, follows it (G2 (a)).
- **7b. Prediction points**: none.
- **7c. After**: the tally read; in Study, done means the checkpoint acknowledged.
- **7d. Teacher tip** (G6 (a), decided: the tip says where each item is found): *Where each is found. On a part's
  datasheet: the logic voltage (its supply and I/O voltage range); the input and output thresholds (V_IL, V_IH, V_OL in the
  DC characteristics); the maximum clock (f_SCL in the I²C timing table: 400 kHz for Fast mode); the output drive (I_OL at
  V_OL: 3 mA at 0.4 V); the input capacitance (C_i per pin: at most 10 pF in UM10204, Table 10); the rise and fall times
  (t_r and t_f limits in the timing table: 300 ns rise in Fast mode). One line needs the bus as well as the part: the
  pull-up requirement is sized for the bus from V_DD, the drivers' I_OL and the bus capacitance (UM10204 §7.1; card 7), and
  a datasheet may only recommend a value; the rise time the bus actually makes is set by that pull-up and the capacitance,
  not by the clock. Two are the system's, on no part's datasheet: the maximum length follows from the 400 pF bus
  capacitance limit (each device and each centimetre of wire adds to it), and the noise environment is checked against the
  noise margins (UM10204, Table 11: 0.1·V_DD low, 0.2·V_DD high). If the room says "rise time is the master's problem":
  card 7's 10 kΩ edge is the answer: the pull-up and the bus set it, not the clock.*
- **7e. Explore** (B11): in Study, as card 7's §7e.

## 8. Faithfulness (the quality bar)

**Arithmetic** (Node, 2026-10-20; card 7's §8 holds the full table): at 200 pF, 1.77 kΩ: R_p·C_b = 354 ns, 30 → 70 % =
0.84730 × 354 = **299.9 ns**; sink (3.3 − 0.4)/1.77 = **1.638 mA**. 10 kΩ: 2000 ns, **1694.6 ns**, **0.290 mA**. For Study's explore (card 7's §7e):
the largest pull-up for 300 ns at 400 pF is 300/(0.8473 × 400) = **0.885 kΩ**, under the 0.967 kΩ floor. (G3 (b)'s 400 pF
edge, 599.9 ns at 1.77 kΩ, is not taken.)

**The Flow's claims** (A4, A6):
- p3 *"You have just watched three of those — pull-ups, input capacitance and rise times — fight each other on the
  benches."*: on card 7 the room saw three pull-ups (10 kΩ dashed, 1 kΩ, 1.77 kΩ) and their rise times against the 300 and
  1000 ns lines; the capacitance was held at 200 pF, named in card 7's p5 (*"The bus has capacitance, from every input on
  it…"*) and in the numeric, and is in the rise time it sets. The sentence holds as the load the pull-up charges, on its
  slider at 200 pF (G3 (a), decided; no finding).
- The checkpoint's nine items equal the Flow's nine lines ✓; *"on an I²C datasheet"* against *maximum length* and *noise
  environment*: G6 (not an accuracy finding: a checkpoint states nothing); G6 (a), decided: the teacher tip (§7d) says
  where each of the nine is found.
- p5, round one: *"So far the code has come from the converter inside the microcontroller, and travelled a few
  millimetres."*: the course's own converter (Day 1) is the MCU's 12-bit ADC; but this module's cards 1, 2, 4 and 9 framed the
  code's journey as a separate ADC talking to a microcontroller (card 1 *"when the ADC is a separate chip, ADC → microcontroller may
  communicate through…"*; card 2 *"an ADC and a microcontroller both run on 3.3 V logic"*; card 4 *"an ADC may communicate
  with a microcontroller using SPI"*; card 9 *"an ADC that needs to send measurement data to a microcontroller"*). The
  transition then said the code had not yet left the chip: **G5 (accuracy)**. **Applied** (G5 (a), round two): p5 now
  reads *"[[transition]] So far, in the course's own example, the code has come from the converter inside the
  microcontroller, and travelled a few millimetres. But what if that converter is not good enough for the signal? Then the
  converter itself moves out of the chip, and the bus we have just built becomes the road its codes travel on. That is a
  design choice, and it is the next stop."* Re-checked (A4, A6): *"the course's own example"* is Day 1's MCU with its
  12-bit ADC, whose codes cross only the chip (a few millimetres ✓); cards 1, 2, 4 and 9's separate-ADC cases are other
  examples, which the clause no longer contradicts; *"the bus we have just built"* is cards 6–8's open-drain I²C bus ✓. No
  finding.

**Section D, Plot rows**: as card 7's B (`D2-010-07` §8), the copy identical.

**A1–A8** (round one): A1 ✓ (Node); A2 ✓ (card 7's model, its F-a and F-b carried); A3 ✓ (299.9 ns on the line); A4 ✓ with
G5 raised (the transition against cards 1, 2, 4, 9) and p3 checked against card 7; A5 ✓; A6 ✓ (p3's *"watched … fight"*
checked; G6 for the checkpoint's wording); A7 ✓ (UM10204, as card 7; its noise margins for the tip); A8 ✓.

**Round two re-check** (2026-10-20, A1–A7 on what changed): A1 the state's numbers recomputed in Node (0.84730 × 354 =
299.9 ns, × 2000 = 1694.6 ns; 2.9/1.77 = 1.638 mA, 2.9/10 = 0.290 mA; 300/(0.84730 × 400) = 0.885 kΩ); §2's minutes
(68 ÷ 130 = 0.52; the card 3.94; 192 ÷ 130 + 2.5 = 3.98). A2 card 7's stated model, now on the copy's caption and limit
label. A3 unchanged. A4 G5's clause checked against cards 1, 2, 4, 9 (above); the two fences against §4a. A5 the tip's
physics (the pull-up sized for the bus; the edge set by R_p·C_b, not the clock). A6 the tip's *"on no part's datasheet"*
for length and noise, *"may only recommend"* for the pull-up. A7 UM10204 Rev. 7.0 (1 October 2021) re-read: C_i ≤ 10 pF and
I_OL in Table 10; f_SCL, t_r, C_b 400 pF and the noise margins V_nL 0.1·V_DD, V_nH 0.2·V_DD in Table 11; R_p sizing in
§7.1. No finding.

## 9. Faults and non-ideal behaviour

*None in the PLAN.* Card 7's FAULT (the 10 kΩ copied onto a 400 kHz bus) is on the picture as the dashed edge; card 7's
non-ideal effects (F-a, F-b, input leakage) are stated in its caption and Equation and apply here unchanged.

## 10. Accessibility, legibility and print

As card 7's §10 (the same block). The wall check is the same frame at 1920 × 1080 and 1024 × 768. Print (C8): the still s0 with its `say`.

## 11. Assets to make or source

| Asset | Format | Made by | Status |
|---|---|---|---|
| The `plot` block, a copy of card 7's showing B (§3), EN and FR | YAML in `en.md` | the author | to write with card 7's blocks |

## 12. Bench capabilities this needs

**Plot Bench, exists**: everything card 7's showing B uses (`D2-010-07` §12).

**To confirm when written**: (a) that the copy compiles as a second occurrence (distinct id), opens on the statement
slide (the first lead block after the statement) and takes fence 1; (b) G2 (a): that fence 2, after the `checkpoint`
block, is that activity slide's teleprompter (`flow.ts` reads so). (G1 (b), stepping Back to the plot while the devices
keep the checkpoint, is not taken, so it needs no check.)

**Missing: asked of Studio through the owner** (G1 (c), decided 2026-10-20, round two; not a crossing: `pbl2026` talks to
Benches only, and this is Studio's):
- **An activity that keeps the card's Canvas**: a checkpoint (or poll) laid out `split` beside the Canvas the card put up,
  instead of `widget-focus`, so the plot stays on the wall while the room ticks on its devices. It is what the PLAN's
  *"while the room ticks its list"* needs, and the brief's D4 note (*"two blocks side by side is Studio's"*) is the same
  family of request. Its row for `bench-work/requests-to-exsight.md` is the lead's to add (the line is in the round-two
  report).

**Would help**: X12 (presets mirrored: one block for cards 7 and 10, the state named by a preset instead of a copy; G4 (b)
once it lands). Card 7's crossing for X-plot-gauge and X-curve-domain covers this copy too (`D2-010-07` §12).

**Not this card's**: anything new on the Plot Bench (no new library).

## 13. Stand-in for the lecture

None needed for the block. The plot is on the statement slide while fence 1 (p1–p4) is spoken, the checkpoint then takes
the wall, and fence 2 (the transition) follows it (G1 (a), G2 (a), decided). When Studio's activity that keeps the Canvas
lands (G1 (c)), the checkpoint sits beside the plot, as the PLAN's SHOW asks.

## 14. Findings for the owner

- **G5 (accuracy; register D2·010-F9) — the transition's "So far the code has come from the converter inside the
  microcontroller, and travelled a few millimetres."** True of the course's own converter (Day 1's 12-bit MCU ADC), but this
  module framed the journey four times as a separate ADC talking to a microcontroller over SPI or I²C (cards 1, 2, 4, 9,
  quoted in §8), and then says the converter only now moves out of the chip. A learner hears two stories. Options:
  - (a) the owner adds a clause naming which code, e.g. *"So far, in the course's own example, the code has come from the
    converter inside the microcontroller…"* (**recommended**: one clause, the rest of the transition unchanged, and it
    agrees with cards 1–9);
  - (b) the transition unchanged, the presenter's strip carrying the distinction (the room still hears it unqualified);
  - (c) the owner rewrites the transition around the module's ADC-chip examples (*"…and the buses we have just built are the
    roads its codes travel on…"*).
  **Decided: (a), applied** in `en.md` by the lead (*"[[transition]] So far, in the course's own example, the code has come
  from the converter inside the microcontroller, and travelled a few millimetres. …"*); re-checked, no finding (§8).
- **G1 — The checkpoint takes the wall.** An activity is `widget-focus` and never shares the stage, so *"the Plot back on the
  Canvas while the room ticks its list"* cannot happen on the wall today. Options: (a) the plot on the statement slide while
  p1–p4 are spoken, the laser naming the three; then the checkpoint (**recommended** for the day); (b) as (a), and the
  presenter steps Back to the plot while the devices keep the checkpoint (if §12 (b) confirms it); (c) ask Studio for an
  activity that keeps the Canvas (§12; to you, to route) (**recommended alongside (a)**). **Decided: (a) and (c)**: the plot
  on the statement slide for p1–p4, then the checkpoint (§4a, §13); the Studio request goes to the owner, to route (§12). (b)
  is not taken, so round one's check of it is dropped from §12.
- **G2 — The transition comes before the checkpoint in the Flow.** p5 *"[[transition]] So far the code has come…"* is in the
  statement slide's fence, so it would be spoken before the checkpoint card. Options: (a) split the fence, **no word
  changed**: p1–p4 after the plot, p5 after the checkpoint block (**recommended**: the room ticks, then the presenter moves
  on); (b) move the checkpoint before the statement (the PLAN says *"after the statement"*); (c) leave it (the transition
  spoken, then the list ticked: the hand-off is lost). **Decided: (a), applied** in `en.md`: p1–p4 in the statement
  slide's fence, p5 in its own fence after the checkpoint (§2, §4a).
- **G3 — Which state the plot returns to, and how.** Plot sliders are not mirrored, so the state is set by the block's
  defaults, not recalled. Options: (a) a verbatim copy of card 7's B (1.77 kΩ, 200 pF, the 10 kΩ edge dashed): the picture
  the room last saw, no new content (**recommended**: the brief's *"No new library"*); (b) as (a) plus the same R_p on
  400 pF (azure dashed, 599.9 ns past the Fast line), so the capacitance is seen fighting as p3 says (one more curve, one
  unscripted line, +0.1 min); (c) a still of card 7's s3 as a Figure (nothing live in Study). **Decided: (a)**: the verbatim
  copy of card 7's B (§3); the 400 pF edge of (b) is not taken.
- **G4 — The copy's upkeep.** Two identical blocks drift when one is edited. Options: (a) an authoring note beside each
  (**recommended** until X12); (b) one block with presets once X12 lands. **Decided: (a)**: the two notes' wording in §3 here
  and `D2-010-07` §3a, for the lead to place in `en.md` with the blocks.
- **G6 — The checkpoint's "on an I²C datasheet"** against *maximum length* and *noise environment*, which are the system's
  (length follows from the 400 pF limit; noise is checked against the noise margins). Not an accuracy finding (a checkpoint
  asserts nothing). Options: (a) the teacher tip (§7d) says where each is found (**recommended**); (b) the owner rewords the
  prompt, e.g. *"…you would check before connecting a device to an I²C bus."*; (c) leave it. **Decided: (a)**: the tip
  (§7d) says where each of the nine is found; the prompt unchanged.

**Decided 2026-10-20 (owner: *"apply all recommendations"* on the U019 brief):** **D2** — card 10 on the PLAN's bench, card
7's Plot again, no new library (§3); **D4** — card 7's plot carries the sink current as a column in the same frame, so the
copy does too; **F4** — the time axis from the 30 % crossing, so the copy's 70 % crossing is on 300 ns; **D5** — the module
≈ 3 min over, reported only (`D2-010-07` §2b). The findings above (G1–G6) were new after round one, and G5, an
**accuracy** finding, blocked the module until decided.

**Decided 2026-10-20, round two (owner: *"apply all recommendations"*):** every finding takes its recommended option.
**G5** (D2·010-F9, accuracy) → (a), applied in `en.md`: *"[[transition]] So far, in the course's own example, the code has
come from the converter inside the microcontroller, and travelled a few millimetres. …"*. **G1** → (a) and (c): the plot on
the statement slide for p1–p4, then the checkpoint; an activity that keeps the Canvas asked of Studio, **to the owner, to
route** (not a crossing). **G2** → (a), applied in `en.md`: p5 in its own fence after the checkpoint. **G3** → (a): the
verbatim copy of card 7's B (no 400 pF edge). **G4** → (a): an authoring note beside each copy. **G6** → (a): the teacher tip
says where each item is found. Re-checked A1–A7 on everything that changed (§8, *Round two re-check*): no new finding; the
card is 3.94 min (3.9), the module ≈ 31.7 of 30 (`D2-010-07` §2b). **Nothing is open on this spec.**

**Raised 2026-10-20:** crossing **519** (X-plot-gauge and X-curve-domain, for card 7's plot and this copy; `C:\ExSightory\lanes\pbl2026-x\.claude\crossing\open\519-pbl2026-to-benches-plot-bench-a-gauge-beside-the-plot-and-a-curve-domain-for-d2-010-cards-7-10.request.md`, raised and pushed 2026-10-20, open); the Studio item (an activity that keeps the Canvas, G1 (c)) to the owner, to route: `bench-work/requests-to-exsight.md` **X22**.

## 15. Acceptance: how we know it is built right

- The block compiles as a copy of card 7's B (a distinct id, no warning) and opens on the wall at R_p 1.77 kΩ and C_b
  200 pF: at the hover `edge` 2.310 V at t = 299.9, `edge10k` 2.310 V at t = 1694.6, `sink` 1.638, `sink10k` 0.290, whatever
  was last dragged on card 7 in any window.
- A diff of the two blocks is empty (G3 (a)); an authoring note stands beside each (G4 (a)).
- The plot opens on the statement slide with fence 1 (p1–p4) as its teleprompter; the checkpoint opens after p4 with the
  nine items in the Flow's order; fence 2 (p5) is the checkpoint slide's teleprompter, spoken after the tally (G2 (a)).
- B2 nothing changes on the wall; B4 the state is card 7's last; B14 every curve labelled; B16 the values on the sliders and
  axes; B20 the strip's words and tip.
- C2–C8 as card 7's; E1–E6 for the block as presented, in both themes, EN and FR.
- **Six gates (this spec, round two re-checked 2026-10-20)**: (1) realism: card 7's bus and limits ✓; (2) science: card 7's
  model with its stated assumptions (its F-a (a) and F-b (a), decided, on the copy) ✓; (3) maths: the state's numbers and
  the card's minutes recomputed (§2, §8) ✓; (4) visualization: the three named requirements each on the picture, the
  capacitance as the load on its slider at 200 pF (G3 (a)) ✓; (5) consistency: a verbatim copy of card 7's B with an
  authoring note beside each; the transition now says which code (G5 (a), applied) and agrees with cards 1, 2, 4, 9; the two
  fences match §4a ✓; (6) design: card 7's frame and slider row ✓ on paper.
