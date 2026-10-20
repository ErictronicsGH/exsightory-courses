# Bench spec template

**Revised 2026-10-08 (U002)** from the Animation Bench research and ExSight's design rules; dry-run on
D1·080 card 5 (`bench-work/specs/D1-080-05-sar-binary-search.md`). Fixed after the dry run: the
PLAN's SHOW, Drive and Status lines quoted in §1; `real_thing`, `optional_benches` and `card_minutes`
in the yaml; an ASK that fires before the bench appears (§7a); repeated steps may share a §4b row; the
stand-in's asset reused as the target's source (§13). Check ids (A1, B6, C3 …) are the
quality bar's (`.claude/standards/bench-quality-bar.md`); **R**n, **D**n.n and **C**n as cited there.

Copy everything below the line into `bench-work/specs/D<day>-<module>-<card>-<slug>.md` and add a row
to `bench-work/README.md`. Rules for filling it:

- **Fill every section.** Write *none* or *n/a* with the reason where a section does not apply; never
  delete one.
- **Quote the owner's text verbatim** (statement, PLAN, Flow); never reword or trim it. Where it looks
  wrong, say so in §14.
- **Mark what you add.** Anything not in the owner's PLAN (a prediction point, an overlay, a teacher
  tip, an explore control) is labelled **Proposal** and listed in §14 for the owner.
- **Name the target bench and the stand-in separately.** §3–§12 describe the activity on the target
  bench; §13 says what the stand-in carries on the day and what it loses.
- **Name the bench and the library separately** (owner, 2026-10-08). The bench is the platform: its
  interface and the controls that manipulate libraries. A library is one unit of content loaded into
  it to be played or viewed (the eye-to-brain animation, the cold-open circuit, the course path
  drawing). §3–§4 and §11 describe the library; §5, §6 and §12 describe what the bench must offer.
- **Write for someone who never saw this conversation.** Every number has its source and its
  arithmetic.

---

```yaml
id: D1-080-05-sar-binary-search   # D<day>-<module>-<card>-<slug>; stable, never renumbered
card: "SAR: a binary search"      # the card's heading, verbatim
module: notes/Day01/080-adc-conversion/en.md
bench: Animation                  # TARGET bench (the platform: interface and controls): Electronics · Draw · Plot · Equation · Figure · 3D · Animation · Coding · Signal
library: "sar-binary-search (2D Animation library, imported from the Draw stand-in)"   # the unit of content the bench loads and plays (owner, 2026-10-08)
dimensions: 2D                    # 2D · 3D · n/a
stand_in: Draw (stepped, `sar-binary-search.benchdrawing`)   # bench and library that carry it until the target exists, or "none"
optional_benches: [Coding]        # other benches the PLAN names for this card (optional or fallback), or []
real_thing: "the ATmega328P's 10-bit SAR ADC, shown at 4 bits"   # what the ≥ 95 % is measured against
minutes: 1.6                      # time ON THE BENCH in the lecture (§2)
card_minutes: 2.7                 # the whole card, Flow and activity included (§2)
status: spec-draft                # spec-draft · spec-ready · built · verified
learner_action: numeric           # the PLAN's ASK kind, or none
predictions: []                   # step ids holding a prediction point (§7b), or []
seeds: []                         # thoughtseeds planted or harvested on this card
key_variable: the trial level against the held input   # the ONE variable that carries the insight (B2, B11)
time_scale: "slowed ≈ 200 000 ×: one bit takes ≈ 8 µs"  # or "real time", or "none (no motion)"
steps: 6                          # number of steps including step 0
```

## 1. What the room must understand

- **Statement** (verbatim):
- **The PLAN's SHOW, Drive and Status lines** (verbatim): the owner's own description of the bench
  activity. If the PLAN names a different bench from the target (a stand-in written before the
  decision), say so.
- **Insight**: one sentence a learner can say afterwards that they could not say before.
- **Look for** (verbatim from the PLAN):
- **Kind of knowledge**: *a process through stages* · *a picture built up* · *a relation between
  quantities* · *a spatial structure* · *a procedure (hands)* · *a contrast between two states*. This
  decides the bench (card test: a process through stages → Animation; a picture built up → Draw) and
  which conditional checks apply (B15, B17, B18, B19).
- **Why this bench**, and why not a still: what motion or interaction shows that a still cannot (R1).
  For 3D, which spatial relation needs it (R31).
- **Key variable**: the one thing the learner should watch or drive (B2, B11).

## 2. Time

| Beat | Minutes | Source of the number |
|---|---|---|
| Flow spoken before the bench is driven | | words ÷ 130 wpm |
| Set-up on the wall (the bench appears, step 0, orientation) | | |
| Each step (one row per step, or per group of steps under one Flow paragraph) | | Flow words ÷ 130 wpm, or the presenter's unscripted line per step (estimate it and say so), plus the motion's own duration |
| Learner action (question, answer window, reveal) | | the activity's timer or the PLAN |
| Flow spoken after | | words ÷ 130 wpm |
| **Total for the card** / **of which on the bench** | | |

Then the module check: the module's `targetMinutes`, its Flow total at 130 wpm, and whether this card's
share fits. Report an overrun; never cut (standing rule).

Where one Flow paragraph drives several steps, the presenter speaks unscripted lines over them: name
that, estimate it, and keep long Flow paragraphs over **held** states, not over motion (B13).

## 3. The scene: what is on the bench

- **Parts**: every object with its stable id, real value or dimension and unit, and the source of each
  number. For a circuit: part, value, tolerance, profile. For a drawing: item, layer, ink, line type.
  For an animation: part, material, how it moves.
- **Meet the parts** (step 0, B3): what is labelled, with one line of function per part.
- **Values beside their element** (B14, B16): which readouts sit where, with units and precision.
- **Labels** (B14): badges + list on anything that moves; leaders only on stills.
- **Colours and their second channel** (C4): every colour in the legend and what else carries it.
- **Key views or framings** (B18): named, with *Home*. In 2D, the framings the zoom targets name.

## 4. The run: step by step, as the Flow goes

### 4a. Steps

One row per step, in order. Step 0 is *meet the parts*, still. Each step ends at a causal boundary (B1).

| # | id | Flow paragraph (first words) | What changes: the step's one sentence (B5; the `say`) | Overlay for the room (key terms and values only, B13) | Presenter's control |
|---|---|---|---|---|---|

### 4b. Motion, cues and stills per step

| # | Motion (what moves, how, named pace) | Movers (≤ 2, B7) | Cue and its second channel (B6) | Hold at the end (hold · loop) | Under reduced motion it lands as (C3) | Still (B4) |
|---|---|---|---|---|---|---|

Write *none* in *Motion* for a step that only appears; it still needs its cue and still. Steps that
repeat one pattern (one row per bit, per stage) may share a row, sub-steps lettered (a), (b), (c).
The time scale is the yaml's; name it in *Motion* only where a step's differs (A5).

## 5. Pacing and interaction, by surface and view

**Who paces** (B12): on the wall the presenter; in Study Mode and Scope the learner. What the wall
draws of the bench's controls (flat, as state).

| View | Who | Controls (each with its range, default and states) |
|---|---|---|
| Preview (in the slide) | everyone | |
| View (details) | everyone | |
| Edit (session only, whole wall) | everyone; a student's own copy | |
| Authoring (Course Studio) | authors | |

- **The presenter's strip** (B20): what it shows as text (the next step's title and "what changes", the
  teacher tip), and the keys (C5).
- **Study Mode and Scope**: what the learner can do that the wall does not show; when explore unlocks
  (B11).
- **Phone** (C6): the portrait layout, what one finger and two fingers do, the fallback.
- **Locked for this card**: any control the author locks (e.g. explore during the prediction).

## 6. The frame

Which parts of the bench's frame this activity uses (D4.3–4.5): for the Animation Bench, the dock
tiles and side panels of the capability list §3a (Stops, Views, Parts, Section, Cues, Compare,
Explore, Ink, Ask); for other benches, their own frame (Electronics: the renderings, D12.1). For each
tile used: what its panel's *Selected item* shows (one large value) and its list. Also: the identity
bar's run states, the legend card's contents, any inset or graph band (under the stage, never over
it, D4.9). If the bench's frame is not designed yet, list the tools the activity needs instead.

| Tile / panel | Used? | Selected item (one large value) | List / contents |
|---|---|---|---|

## 7. Thinking, not watching

- **7a. The PLAN's ASK**, verbatim (question, options, answer, reveal, explain, depth, practice), and
  exactly when it fires: at a step of §4, or before step 0 when the question comes before the bench
  appears (then say which step answers or closes it).
- **7b. Prediction points on the bench** (B9): the step, the question, the options, what the reveal
  shows; the reveal waits for it. Mark **Proposal** if the PLAN does not have it.
- **7c. After the reveal** (B10): the explain prompt or check question, and in Study what counts as done.
- **7d. Teacher tip** (B20): the misconception to expect and what to ask. Presenter only.
- **7e. Explore** (B11): what the learner may vary after the guided pass, and on which bench, or *none*.

## 8. Faithfulness (the quality bar)

- The rows of quality bar section D for the target bench (and the stand-in, if it shows numbers),
  each ticked with its source.
- A1–A8, each ticked or excepted with a reason.
- **Every number recomputed here**, with the arithmetic.
- **Simplifications and their on-bench labels** (A6): the exact words the room reads.

## 9. Faults and non-ideal behaviour

The FAULT line from the PLAN (verbatim, or *none in the PLAN*), and every non-ideal effect the bench
should be able to show (A2): what goes wrong in the real thing, its size, and how it looks on the bench.
Mark additions **Proposal**.

## 10. Accessibility, legibility and print

- Wall: type sizes and contrast for everything the room reads (C2).
- Reduced motion (C3): confirm every row of §4b lands whole and is understood from its still and text.
- Colour (C4), keyboard (C5).
- Print (C8): the stills with their "what changes" sentences and values.

## 11. Assets to make or source

| Asset | Format | Made by (ExSight · the author · an outside source with licence) | Status |
|---|---|---|---|

## 12. Bench capabilities this needs

Each capability, named exactly as the bench's capability list names it (the Animation Bench's C-numbers;
other benches' milestones), marked **exists** · **planned (milestone)** · **missing (request it)**.
Name anything the card asks for that the target bench should *not* do, and which bench does it instead.

## 13. Stand-in for the lecture

If the target bench is not ready on the day: what carries the card (bench, file, steps), which §4 rows
it can and cannot show, which quality-bar checks it loses, and what the Flow might say differently (a
proposal; the Flow is not edited). Say whether the stand-in's asset can become the target's source
(a Draw Bench drawing imports into the Animation Bench, C69), so nothing is made twice.

## 14. Findings for the owner

Everything this spec found in the owner's text that looks wrong or inconsistent (A7), with the
arithmetic, and every **Proposal** made above, each as a question with options. Nothing here is
changed in the course files until the owner answers.

## 15. Acceptance: how we know it is built right

Checkable statements, specific to this card:

- The run matches §4 on the wall, the presenter's window and Study Mode, step for step, with the
  numbers of §3 and §8.
- The quality bar's B and C checks that apply, by id, each with how it is checked here.
- ExSight's definition of done (quality bar E1–E6).
- The stand-in (§13) checked on the lecture laptop before the day.
