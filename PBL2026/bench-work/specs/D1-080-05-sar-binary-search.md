```yaml
id: D1-080-05-sar-binary-search
card: "SAR: a binary search"
module: notes/Day01/080-adc-conversion/en.md
bench: Animation
library: "sar-binary-search: a 2D library imported from the Draw stand-in's `sar-binary-search.benchdrawing` (C69)"
dimensions: 2D
stand_in: Draw (stepped, `sar-binary-search.benchdrawing`)
optional_benches: [Coding]        # the PLAN's optional SAR step-through for any input the room calls out
real_thing: "the ATmega328P's 10-bit SAR ADC (named in the Flow), shown at 4 bits"
minutes: 1.6                      # on the bench; 2.1 with the proposed prediction point (§7b)
card_minutes: 2.7                 # the whole card; 3.2 with the prediction point
status: spec-draft
learner_action: numeric
predictions: []                   # [s2] if the owner accepts §14 F3
seeds: []
key_variable: the trial level against the held input, and the window it leaves
time_scale: "slowed ≈ 200 000 ×: the ATmega328P decides one bit in ≈ 8 µs"
steps: 6
```

Dry run of the U002 template (2026-10-08). Written ahead of U017, which owns D1·080 and will review it.

## 1. What the room must understand

- **Statement** (verbatim): *A successive-approximation converter compares the held voltage with a
  trial level, keeps or drops each bit, and narrows the range until every bit is decided.*
- **SHOW** (verbatim from the PLAN): *Draw — SAR's binary search for a 4-bit converter, Vref 3.3 V,
  input 2.17 V: trial 1000 (1.650 V) keep; 1100 (2.475 V) drop; 1010 (2.063 V) keep; 1011 (2.269 V)
  drop → 1010, code 10 (2.063 V). Each step draws the trial level as a line on a 0–3.3 V bar beside the
  input's marker and writes the bit.*
- **Drive** (verbatim): *one step per bit.*
- **Look for** (verbatim): *the window halving each time, closing on the input from below.*
- **Status** (verbatim): *needs Draw: the SAR binary-search drawing · optional needs Coding Bench: a SAR
  step-through for any input the room calls out (replaces the SAR half of the old visualiser widget).*
- **Insight**: a SAR converter finds the code by asking one yes-or-no question per bit, most
  significant first, so N bits take N comparisons and each one halves the window.
- **Kind of knowledge**: a process through stages (a loop run four times). Card test → **Animation
  Bench** (capability list §9 lists this card); the Draw Bench stands in. B15 applies (comparator, DAC
  and register are subsystems, met in step 0 before the loop runs); B17, B18, B19 do not (no contrast
  pair, 2D, no hand skill).
- **Why this bench, not a still**: the point is the *sequence* (try, compare, keep or clear, shrink),
  and the room must see the window halve four times in order; a still shows only the result. Motion is
  limited to the trial line and the window (B2).
- **Key variable**: the trial level against the held input, and the window it leaves.

## 2. Time

| Beat | Minutes | Source |
|---|---|---|
| Flow before the bench: *"Different ADCs use…"* (10 words) | 0.1 | 10 ÷ 130 |
| ASK numeric, answer window and the explain | 1.0 | estimate: a numeric answer typed on Scope plus the one-sentence explain; the PLAN gives no timer |
| Step 0 appears; Flow *"A successive-approximation register (SAR)…"* (40 words) spoken over it, held | 0.3 | 40 ÷ 130 |
| Steps 1–4: the presenter's unscripted line per bit (≈ 15 words, e.g. *"Try 1000: 1.65 volts. The input is above it: keep."*), motion ≈ 1.5 s, hold ≈ 3 s | 0.8 | 4 × (7 s + 1.5 s + 3 s) ≈ 46 s |
| Step 5, the result | 0.2 | ≈ 10 s |
| Flow *"SAR ADCs are widely used…"* (36 words), over step 5 held | 0.3 | 36 ÷ 130 |
| **Card total** / **on the bench** | **2.7 / 1.6** | + 0.5 each with the proposed prediction at s2 (§7b) |

The Flow's *"[[demo]] Widget: a SAR conversion animated…"* is a stage direction (10 words, not spoken).
One Flow paragraph drives steps 1–5, so the presenter speaks unscripted lines there: named above and
estimated. Both long Flow paragraphs fall on held states (B13).

**Module check**: D1·080 `targetMinutes: 30`; its Flow totals 1,799 words = 13.8 min at 130 wpm, leaving
16.2 min for eight cards' activities and bench time. This card's 2.7 min (1.3 of it beyond its Flow) is
small; U017 balances the module.

## 3. The scene: what is on the bench

**Parts** (2D, left to right; ids stable):

| id | Part | Value | Source |
|---|---|---|---|
| `hold` | Held input (the S/H capacitor from D1·070), its value in a chip | V_in = 2.170 V, constant through the run | PLAN |
| `comparator` | Comparator, IEC triangle; + input from `hold`, − input from `dac`; output chip *above* / *below* | — | PLAN; MT-021 |
| `dac` | 4-bit DAC, its output in a chip | V_DAC = code × LSB, LSB = 3.3 V ÷ 16 = 206.25 mV | §8 |
| `register` | SAR register: four bit cells b3 b2 b1 b0, MSB left | each cell: *untried* (blank) · *trying* (1, outlined) · *kept* (1, filled) · *cleared* (0, hollow) | PLAN |
| `bar` | Vertical voltage bar 0–3.300 V, 16 level ticks, labelled every 4 (0, 0.825, 1.650, 2.475, 3.300 V) | — | §8 |
| `vin-marker` | The input's marker on the bar at 2.170 V | — | PLAN |
| `trial` | The trial level, a line across the bar | moves to V_DAC each step | PLAN |
| `window` | The search window, a tinted band on the bar | starts 0–3.300 V; halves each step | PLAN *Look for* |
| `loop` | The loop path register → DAC → comparator → register (for the path-trace cue) | — | R12 |

**Meet the parts** (step 0, B3), one line each: *held input — the voltage to convert, frozen* ·
*comparator — says whether the input is above or below the trial* · *DAC — turns the trial code into a
voltage* · *register — holds the bits decided so far* · *bar — the converter's range, 0 to 3.3 V, in 16
steps*.

**Values beside their element** (B14, B16): `V_in = 2.170 V` beside `hold`; `V_DAC` beside `dac`
(mono, 4 significant figures: 1.650, 2.475, 2.063, 2.269 V); the comparator's word; the code in binary
and decimal under `register`; the window's two edges beside the bar.

**Labels**: on stills only, so leaders are allowed (D6.3); no part moves except `trial` and `window`,
which carry their own value chips.

**Colours and second channel** (C4), from the annotation palette, roles not hex:

| Thing | Colour role | Second channel |
|---|---|---|
| Input (`hold`, `vin-marker`) | annotation 1 (teal) | solid line, label *V_in* |
| Trial (`dac`, `trial`) | annotation 2 (amber) | dashed line, label *V_DAC* |
| Window | faint tint of the ink | hatched edges, the two edge values written |
| Kept / cleared bit | ink | filled cell with *1* and the word *keep* / hollow cell with *0* and *clear* (never green against red) |

**Key framings** (2D): *Whole* (Home: converter and bar) · *Bar* (the bar alone, for the window's last
two steps, where it is 0.4 V and then 0.2 V tall).

## 4. The run: step by step, as the Flow goes

### 4a. Steps

| # | id | Flow paragraph | What changes (the `say`) | Overlay for the room | Presenter's control |
|---|---|---|---|---|---|
| 0 | `s0-meet` | *"A successive-approximation register (SAR)…"* | Meet the converter: the held input, the comparator, the DAC, the register and the 0 to 3.3 V bar; the window is the whole range. | *4 bits · V_ref = 3.3 V · 1 step = 206.3 mV* | Next (appears with the paragraph) |
| 1 | `s1-try-1000` | *"[[demo]]…"* (unscripted per bit) | Try 1000: the DAC gives 1.650 V, below the input, so bit 3 is kept and the window becomes the upper half, 1.650 to 3.300 V. | *1000 → 1.650 V · below · keep* | Next |
| 2 | `s2-try-1100` | (same) | Try 1100: the DAC gives 2.475 V, above the input, so bit 2 is cleared and the window becomes 1.650 to 2.475 V. | *1100 → 2.475 V · above · clear* | Next |
| 3 | `s3-try-1010` | (same) | Try 1010: the DAC gives 2.063 V, below the input, so bit 1 is kept and the window becomes 2.063 to 2.475 V. | *1010 → 2.063 V · below · keep* | Next; framing *Bar* |
| 4 | `s4-try-1011` | (same) | Try 1011: the DAC gives 2.269 V, above the input, so bit 0 is cleared and the window is one step wide, 2.063 to 2.269 V. | *1011 → 2.269 V · above · clear* | Next |
| 5 | `s5-result` | (same), then *"SAR ADCs are widely used…"* | Four comparisons, four bits: the code is 1010, ten, which stands for 2.063 V, just below the input. | *1010 = 10 → 2.063 V · 4 bits, 4 comparisons* | Next; framing *Whole* |

### 4b. Motion, cues and stills per step

| # | Motion | Movers | Cue and second channel | Hold | Under reduced motion it lands as | Still |
|---|---|---|---|---|---|---|
| 0 | none (appears) | 0 | each part's label in turn as the paragraph names it | hold | the same, whole | the labelled converter, window full |
| 1–4 | (a) the bit cell turns *trying* and `trial` rises or falls to V_DAC, linked, `normal` pace (one progress, 0.8 s); (b) the comparator's word appears; (c) the cell turns *kept* or *cleared* and `window` shrinks to its new half, linked, `normal` | 1 at a time (a and c are each one linked motion) | path trace round `loop` (register → DAC → comparator → register) in step with a–c; the comparator's word in bold ink with its glyph (↑ *above* / ↓ *below*) | hold | the step's end state whole: the cell's final mark, `trial` at its level, `window` at its new size, the overlay | that end state, its overlay as the caption |
| 5 | `window` and `trial` fade out; the code's cell row lights | 1 | the four cells lit together with the code in binary and decimal; the result level marked on the bar beside the input | hold | the same, whole | the result |

Time scale on the identity bar and the legend card for steps 1–4 (A5). Nothing flashes (B8); no loop
(nothing here is cyclic).

## 5. Pacing and interaction, by surface and view

**Who paces**: on the wall, the presenter, one press per step; the wall draws the player bar flat
(*step n of 6*, holding). In Study Mode and Scope, the learner, step by step.

| View | Who | Controls |
|---|---|---|
| Preview (in the slide) | everyone | Back · Next · *step n of 6* · the step's title · *Open details* |
| View (details) | everyone | player bar: Back, Next, Replay this step, the scrubber (snaps to the six steps), speed 0.25×–2× (recommended 1×); Stops tile (list / stills); Parts tile; Cues tile (*path trace* on/off); Ask tile (if F3); Ink |
| Edit (session only) | everyone; a student's own copy | ink on the bar; a temporary note on a step |
| Authoring | authors | the six stops, their `say`, overlays, the cue track, the time-scale note, the prediction (if F3) |

- **Presenter's strip**: the next step's title and "what changes" as text; the teacher tip (§7d); keys
  → / PageDown next, ← back, R replay.
- **Study Mode and Scope**: the same six steps, learner-paced; the stills strip under the bench; the
  numbers in the Stops panel. No explore here (§7e).
- **Phone**: the bench on top (the bar beside the converter, both legible at 320 px), then the step's
  title and sentence, the stills row, big Back / Next; one finger does nothing on the stage, two pinch
  and pan.
- **Locked**: none.

## 6. The frame

| Tile / panel | Used? | Selected item | List / contents |
|---|---|---|---|
| Stops | yes | the current step's title and "what changes" | the six steps; *Stills* mode |
| Views | no (2D; two framings from the stage's zoom buttons) | — | — |
| Parts | yes | the pinned part, e.g. *DAC* with V_DAC as the one large value | the six parts with badges |
| Section | no (2D) | — | — |
| Cues | yes | — | *Path trace* on/off; legend: input solid teal, trial dashed amber, window hatched |
| Compare | no | — | — |
| Explore | no (see §7e) | — | — |
| Ink | yes | — | laser, ink |
| Ask | only if F3 | the prediction and its tally | — |

Identity bar: *SAR: a binary search · Holding · step n of 6 · Slowed ≈ 200 000 ×*. Legend card: the
three colours with their second channels and the time scale.

## 7. Thinking, not watching

- **7a. The PLAN's ASK** (verbatim): *numeric (at the Flow's [[ask]]) — "A converter decides one bit
  per comparison. How many comparisons does a 12-bit conversion need?" answer: 12 ± 0 · explain: Each
  comparison halves the remaining range, and twelve halvings take 4,096 possibilities down to one. ·
  depth: use · practice: computational thinking.* It fires **before step 0**, before the bench
  appears. The bench then shows the same idea at 4 bits, so step 5's overlay closes it (*4 bits, 4
  comparisons*).
- **7b. Prediction on the bench** — **Proposal** (F3): at `s2`, before the comparator's word appears,
  *"Keep or clear this bit?"* (keep · clear); answer *clear* (2.475 V is above 2.170 V); the reveal is
  the comparator's word. Not in the PLAN.
- **7c. After**: the ASK's explain covers it. In Study, done = the numeric answered and the six steps
  seen.
- **7d. Teacher tip** — **Proposal**: *Learners expect the converter to "measure" the voltage directly.
  Ask: does the comparator ever know the input's value, or only above / below?*
- **7e. Explore**: none on the Animation Bench: an arbitrary input means computing a new search, which
  an authored animation does not do. The PLAN's optional Coding Bench SAR step-through covers *"any
  input the room calls out"*.

## 8. Faithfulness (the quality bar)

**Arithmetic.** LSB = 3.3 V ÷ 2⁴ = 0.20625 V. Trial levels (code × LSB): 1000 = 8 × 0.20625 = 1.650 V;
1100 = 12 × = 2.475 V; 1010 = 10 × = 2.0625 V (shown 2.063); 1011 = 11 × = 2.26875 V (shown 2.269).
Decisions against 2.170 V: below, above, below, above → keep, clear, keep, clear → 1010 = 10. Windows:
0–3.300 → 1.650–3.300 → 1.650–2.475 → 2.063–2.475 → 2.063–2.269 V (0.206 V = 1 LSB, containing 2.170).
Error of the result: 2.170 − 2.0625 = 0.1075 V = 0.52 LSB, below the input (truncation; see F1). All
match the PLAN.

**Section D, Animation rows**
- [x] Mechanism checked: successive approximation, MSB first, one comparison per bit, trial = bits
  kept so far plus the bit under test (Analog Devices MT-021, *ADC Architectures II: Successive
  Approximation ADCs*; Horowitz & Hill, *The Art of Electronics*, 3rd ed., the ADC chapter).
- [x] Time scale shown: ATmega328P, a normal conversion takes 13 ADC clocks, ADC clock 50–200 kHz for
  full resolution, so at 125 kHz (16 MHz ÷ 128) ≈ 104 µs per 10-bit conversion, ≈ 8 µs per bit. One step
  ≈ 1.5 s → ≈ 1.9 × 10⁵, shown as *≈ 200 000 ×*. **Check the datasheet's ADC timing table before
  building.**
- [x] Every stop matches the Flow (one paragraph drives steps 1–5; the PLAN's sequence matched).
- [x] Values recomputed (above).
- [x] Simplifications labelled (A6), the words on the bench: *"4 bits for teaching: the ATmega328P
  decides 10 the same way"*; *"Comparator, DAC and register drawn apart for teaching: in the chip, the
  DAC's capacitors also hold the sample."*

**Stand-in (Draw) rows**: proportions: the bar to scale in volts, the converter block diagram not to
scale (says so); IEC comparator triangle; numbers recomputed above; every step's `say` = §4a.

**A1–A8**: A1 ✓ (PLAN, datasheet); A2 partly: ideal comparator and DAC, non-ideal effects proposed in §9;
A3 n/a (a block diagram, labelled); A4 n/a (no instrument); A5 ✓; A6 ✓; **A7 ✗: conflicts with the
module's own rounding (F1)**; A8 ✓.

## 9. Faults and non-ideal behaviour

**PLAN FAULT**: none on this card. The module's FAULT on *Quantization error is a floor* names
*"Truncating instead of rounding: a steady −½ LSB offset"*, which this card's numbers do (F1).

Non-ideal effects a real SAR shows — **Proposals**, for Study Mode or a later card, not the lecture:
1. **The input moves during the search** (no hold): the bits already decided no longer fit, and the
   code can be wrong by many LSB. The reason for D1·070's sample-and-hold, shown from this side.
2. **The DAC has not settled** when the comparator decides (clock too fast): a wrong keep or clear,
   which is why the ATmega328P's ADC clock is capped at 200 kHz for full resolution.
3. **Comparator noise near a level**: an input within noise of a trial level gives a different last
   bit from one conversion to the next (the *"last two bits never sit still"* of the module's
   `motivates`).

## 10. Accessibility, legibility and print

- Wall: overlays and value chips at 32 pt, 7:1; the bar's tick labels every 4 levels (16 labels would
  collide at 1920 × 1080).
- Reduced motion: every §4b row lands whole and reads from its still, overlay and sentence.
- Colour: input and trial differ by line style and label as well as hue; keep / clear by fill, digit
  and word.
- Print: six stills, each with its sentence and values.

## 11. Assets to make or source

| Asset | Format | Made by | Status |
|---|---|---|---|
| `sar-binary-search.benchdrawing`: the six steps, `say` per step, trace / appear entries, linked motion for `trial` and `window` | Draw Bench file | the author (this project) | to make; serves the stand-in now and the Animation Bench later (C69) |
| Overlays, cue track, time-scale note, stops | Animation Bench authoring | the author | when M62 exists |

## 12. Bench capabilities this needs

**Animation Bench** (capability list, all **planned (M62, noted, not carved)**): C1 next and hold · C2
back · C5 stop list · C6 scrubber · C7 speed · C8 time-scale badge · C10 replay · C13 keys · C15 stop
restores its scene · C16 stills · C17 meet the parts · C18 "what changes" · C19 overlay · C20 values
beside their element · C21 teacher tip · C23 print · C35 labels · C38 highlight · C40 path trace · C44 no
flashing · C45 prediction point (only if F3) · C52 presenter strip · C60 wall profile · C64 reduced
motion · C65 colour never alone · C66 phone · C69 import a Draw Bench drawing · C72 stop inspector ·
C75 checks.

**Not this bench's**: a search for any input the room calls out (computing) → **Coding Bench** (planned),
as the PLAN says.

**Draw Bench (stand-in)**: steps, `say`, `trace` / `appear` entries **exist** (M59m, M59d); the wall plays
traces only, so the linked motion of `trial` and `window` shows as each step's end state until **M59n
(not built)**.

## 13. Stand-in for the lecture

**Draw Bench**, `sar-binary-search.benchdrawing`, six steps as §4a. On the wall each step's new lines
trace in and its text appears; `trial` and `window` jump to their new positions instead of moving (until
M59n). Keeps: B1, B3, B4 (the step strip), B5, B14, B16, A5 (the time scale as a text item). Loses: the
path-trace cue round the loop (B6 weakens to the bit cell and comparator word lighting), the moving
window (the *Look for* is still visible step to step), the prediction point (the presenter can ask it
aloud). The same file becomes the Animation Bench's source (C69), so nothing is drawn twice.

Flow: the stage direction *"[[demo]] Widget: a SAR conversion animated, one comparison per bit."*
names the retired widget (F2).

## 14. Findings for the owner

- **F1 (A7) — truncation here, rounding elsewhere in the module.** This card's trial levels sit at
  whole codes (code × LSB), so the converter truncates: 2.170 V → 1010 (10, 2.063 V), 0.52 LSB below.
  The module's centrepiece Plot rounds, q·round(x/q): 2.170 ÷ 0.20625 = 10.52 → **11** (2.269 V). The
  module's own FAULT calls truncation a fault (*"a steady −½ LSB offset"*). A converter whose first
  transition sits at ½ LSB (how the ATmega328P datasheet defines its ideal transition) tries 1.547,
  2.372, 1.959, 2.166 V and returns **1011**; 2.170 V is only 4 mV above its last trial, so this input
  sits on a knife edge for such a converter. Options:
  (a) keep the numbers and label the bench *"trial levels at whole codes: this converter truncates"*,
  tying it to the module's FAULT (**recommended**: keeps 2.17 V, used across the module, and the *Look
  for*'s *"from below"*);
  (b) keep truncation and change the input to 2.10 V, which gives 1010 either way (trials keep, clear,
  keep, clear in both conventions), but breaks the 2.17 V thread;
  (c) make this SAR a rounding one (trials offset by half a step) and end on 1011; the *Look for*'s
  *"from below"* would then change.
- **F2 — the Flow's demo cue names the retired widget.** *"[[demo]] Widget: a SAR conversion animated,
  one comparison per bit."* The PLAN says Draw (target: the Animation Bench). Update the cue? (The U001
  research noted this too.)
- **F3 — Proposal: a prediction at step 2**, *"Keep or clear this bit?"*, +0.5 min. Add it to the PLAN?
- **F4 — Proposal: the time-scale badge** *"Slowed ≈ 200 000 ×: the ATmega328P decides one bit in ≈ 8
  µs"* (the Flow names that chip; the capability list's render sample said *"10⁶ ×, 2 µs"* for a
  generic fast SAR and has been aligned to this).
- **F5 — Proposal: the teacher tip** in §7d.
- **F6 — Proposal: the three non-ideal effects** in §9, for Study Mode, not the lecture.

## 15. Acceptance: how we know it is built right

- The six steps of §4a play on the wall, the presenter's window and Study Mode in order, each holding
  at its end, with the values of §8 exactly (1.650, 2.475, 2.063, 2.269 V; code 1010 = 10).
- B1: each press lands one bit's try, compare, decide. B2: only `trial` and `window` move. B3: step 0
  is still and labelled. B4: six stills, current lit, each a jump. B5: every step's sentence on the
  presenter's strip and read aloud in Scope. B6: the path trace runs round the loop on each of steps
  1–4 (Animation Bench). B7: one mover at a time. B8: nothing flashes. B9: if F3 is accepted, the
  comparator's word waits for the tally. B12: the wall's player bar is not operable. B13: no Flow text
  on the bench. B14: values beside `dac`, `hold`, `register`. B16: the code and voltages readable as
  text. B20: the next step's sentence and the tip on the presenter's strip.
- C2: legible from the back row at 1920 × 1080 and 1024 × 768. C3: under reduced motion every step
  lands whole. C4: checked under the three colour-vision simulations. C5: → ← R work from a clicker.
  C6: walked at 320 px. C7: < 100 ms from a press to the first frame on the lecture laptop. C8: the
  print form shows six stills with sentences.
- E1–E6 for the built bench.
- The Draw stand-in checked on the lecture laptop before Saturday, both themes, with the time scale
  and the simplification labels visible.
