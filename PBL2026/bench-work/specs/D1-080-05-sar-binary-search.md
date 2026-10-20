```yaml
id: D1-080-05-sar-binary-search
card: "SAR: a binary search"
module: notes/Day01/080-adc-conversion/en.md
bench: Animation
library: "sar-binary-search: a 2D Animation library (asked of the Benches lane by crossing when the course needs it), imported from the Draw stand-in's `sar-binary-search.benchdrawing` (C69)"
dimensions: 2D
stand_in: Draw (stepped, `sar-binary-search.benchdrawing`)
optional_benches: [Coding]        # the PLAN's optional SAR step-through for any input the room calls out
real_thing: "a 12-bit MCU SAR converter on a 3.3 V reference (the course's converter: truncating, 1 µs of conversion), shown at 4 bits; drawn in IEC 60617 symbols, unbranded"
minutes: 2.0                      # on the bench, the prediction at s2 included (F3 decided); 1.5 without it (§2)
card_minutes: 3.1                 # the whole card; 2.6 without the prediction (§2)
status: spec-draft                # revised 2026-10-20 by U017
learner_action: numeric
predictions: [s2]                 # F3, decided 2026-10-20
seeds: []
key_variable: the trial level against the held input, and the window it leaves
time_scale: "slowed ≈ 2 × 10⁷ ×: the course's converter decides one bit in ≈ 83 ns (1 µs ÷ 12); each bit's motion plays in 1.6 s at 1× (1.92 × 10⁷)"
steps: 6
```

**Revised 2026-10-20 by U017** (owner: *"go with your recommendations"*, D3, N1, N2). The dry run of the U002 template
(2026-10-08) paced this card at one product's 10-bit converter (8 µs a bit); it now follows the course's converter: 12
bits, 3.3 V, truncating, 1 µs of conversion, ≈ 83 ns a bit, slowed ≈ 2 × 10⁷ ×. No product is named outside §8. The Flow
quotes follow the current en.md (N1, N2); the truncation is labelled (F1); the step closes on card 1's 2693 (F7); the
dry run's findings F1–F6 are decided; *clear* became the PLAN's *drop*; IEC symbols, the Symbols switch and the French
words were added; the minutes were recounted.

## 1. What the room must understand

- **Statement** (verbatim): *A successive-approximation converter compares the held voltage with a
  trial level, keeps or drops each bit, and narrows the range until every bit is decided.*
- **SHOW** (verbatim from the PLAN): *Draw — SAR's binary search for a 4-bit converter, Vref 3.3 V, input 2.17 V: trial
  1000 (1.650 V) keep; 1100 (2.475 V) drop; 1010 (2.063 V) keep; 1011 (2.269 V) drop → 1010, code 10 (2.063 V). Each step
  draws the trial level as a line on a 0–3.3 V bar beside the input's marker and writes the bit.*
  The PLAN names Draw (written before the card test chose the Animation Bench); Draw is the stand-in (§13), and the
  Flow's cue now names the target (N1).
- **Drive** (verbatim): *one step per bit.*
- **Look for** (verbatim): *the window halving each time, closing on the input from below.*
- **Status** (verbatim): *needs Draw: the SAR binary-search drawing · optional needs Coding Bench: a SAR step-through
  for any input the room calls out (replaces the SAR half of the old visualiser widget).*
- **Insight**: a SAR converter finds the code by asking one yes-or-no question per bit, most
  significant first, so N bits take N comparisons and each one halves the window; it keeps a bit when
  the trial is at or below the input, so it ends on the level at or below the input.
- **Kind of knowledge**: a process through stages (a loop run four times). Card test → **Animation
  Bench** (its capability list §7 carries this card); the Draw Bench stands in. B15 applies (comparator, DAC
  and register are subsystems, met in step 0 before the loop runs); B17, B18, B19 do not (no contrast
  pair, 2D, no hand skill).
- **Why this bench, not a still**: the point is the *sequence* (try, compare, keep or drop, shrink),
  and the room must see the window halve four times in order; a still shows only the result. Motion is
  limited to the trial line and the window (B2).
- **Key variable**: the trial level against the held input, and the window it leaves.

## 2. Time

The card's Flow, recounted from en.md on 2026-10-20 (words ÷ 130 wpm; `[[ask]]`, `[[pause]]`, `[[demo]]` not counted):

| Beat | Minutes | Source |
|---|---|---|
| Flow p1 *"Different ADCs use different internal techniques…"* (10 words) | 0.08 | 10 ÷ 130 |
| The ASK: the question *"A converter decides one bit per comparison…"* (15 words) | 0.12 | 15 ÷ 130 |
| The ASK's answer window on Scope, the answer and the explain | 0.90 | estimate: ≈ 45 s to answer, the 20-word explain, the tally; the PLAN gives no timer |
| Step 0 appears; Flow p4 *"A **successive-approximation register (SAR)** ADC…"* (40 words) spoken over it, held | 0.31 | 40 ÷ 130 |
| Steps 1–4: the presenter's unscripted line per bit (≈ 15 words, e.g. *"Try 1000: 1.65 volts. The input is above it: keep."*, 6.9 s), motion 1.6 s, hold ≈ 3 s | 0.77 | 4 × (6.9 + 1.6 + 3) s = 46 s |
| The prediction at s2 (F3): the question on Scope, ≈ 20 s to answer, the tally and the reveal | 0.50 | estimate, ≈ 30 s |
| Step 5, the result: the presenter's line (≈ 25 words, tying it to card 1's 2693, F7) and the result's motion (1.5 s) | 0.22 | 25 ÷ 130 = 11.5 s, + 1.5 s |
| Flow p6 *"SAR ADCs are widely used…"* (33 words), over step 5 held | 0.25 | 33 ÷ 130 |
| **Card total** / **on the bench** | **3.1 / 2.0** | 3.14 / 2.05; without the prediction **2.6 / 1.5** (2.64 / 1.55) |

The Flow's *"[[demo]] Animation Bench: a SAR conversion, one comparison per bit."* is a stage direction (9 words, not
spoken). No Flow paragraph is spoken over steps 1–4 (p5 is the cue), so the presenter speaks unscripted lines over
steps 1–5: named above and estimated. Both long Flow paragraphs (p4, p6) fall on held states (B13). The card's Flow has
98 spoken words (0.75 min).

**Module check**: in `D1-080-03-quantization-floor.md` §2 (the module's balance against its `targetMinutes: 30` is kept
there, in one place). This card's share is 3.1 min, 2.4 of it beyond its Flow.

## 3. The scene: what is on the bench

**Parts** (2D, left to right; ids stable):

| id | Part | Value | Source |
|---|---|---|---|
| `hold` | Held input (D1·070's sampling capacitor, holding), its value in a chip | V_in = 2.170 V, constant through the run (assumed settled in D1·070's 1 µs window) | PLAN; course model |
| `comparator` | Comparator, IEC 60617 amplifier rectangle with ▷; + input from `hold`, − input from `dac`; output chip *keep* (V_DAC at or below V_in) / *drop* (V_DAC above) | ideal: decides in its share of the 83 ns bit time | PLAN; MT-021; §8 |
| `dac` | 4-bit D/A converter, IEC 60617 rectangle with `#/∩`, its output in a chip | V_DAC = code × LSB, LSB = 3.3 V ÷ 16 = 206.25 mV | §8 |
| `register` | SAR register: four bit cells b3 b2 b1 b0, MSB left | each cell: *untried* (blank) · *trying* (1, outlined) · *kept* (1, filled) · *dropped* (0, hollow) | PLAN |
| `bar` | Vertical voltage bar 0–3.300 V: 17 ticks, the 16 levels (codes 0–15, 0 to 3.094 V) and the range's top, 3.300 V (16 × LSB, not a code); labelled every 4 (0, 0.825, 1.650, 2.475, 3.300 V) | — | §8 |
| `vin-marker` | The input's marker on the bar at 2.170 V | — | PLAN |
| `trial` | The trial level, a line across the bar | moves to V_DAC each step | PLAN |
| `window` | The search window, a tinted band on the bar | starts 0–3.300 V; halves each step | PLAN *Look for* |
| `loop` | The loop path register → DAC → comparator → register (for the bench's path-trace cue) | — | R12 |

**Meet the parts** (step 0, B3), one line each: *held input — the voltage to convert, frozen* ·
*comparator — says keep if the trial is at or below the input, drop if above* · *D/A converter — turns the trial code
into a voltage* · *register — holds the bits decided so far* · *bar — the converter's range, 0 to 3.3 V, in 16 steps*.

**Values beside their element** (B14, B16): `V_in = 2.170 V` beside `hold`; `V_DAC` beside `dac`
(mono, 3 decimals: 1.650, 2.475, 2.063, 2.269 V; exact values in §8); the comparator's word; the code in binary
and decimal under `register`; the window's two edges beside the bar.

**Labels**: on stills only, so leaders are allowed (D6.3); no part moves except `trial` and `window`,
which carry their own value chips.

**Symbols**: IEC 60617 by default; the bench's **Symbols IEC | US** switch redraws the comparator as a triangle and
the D/A converter as a *DAC* box (owner, 2026-10-20). The library holds both sets; the switch is the bench's.

**Colours and second channel** (C4), from the annotation palette, roles not hex, as card 5's stepper on the U017
brief page:

| Thing | Colour role | Second channel |
|---|---|---|
| Input (`hold`, `vin-marker`) | azure | solid line, label *V_in* |
| Trial (`dac`, `trial`) | amber | dashed line, label *V_DAC*; earlier trials stay as faint thin lines |
| Window | faint teal tint | hatched edges, the two edge values written |
| Kept / dropped bit | ink | filled cell with *1* and the word *keep* / hollow cell with *0* and *drop* (never green against red) |

**Words the room reads** (every visible word as `{en, fr}` in the library's data; French drafts mine, for the owner's
review; numbers and units never translated):

| en | fr |
|---|---|
| held input · comparator · D/A converter · register | entrée maintenue · comparateur · convertisseur N/A · registre |
| keep · drop | garder · rejeter |
| *4 bits · V_ref = 3.3 V · 1 step = 206.3 mV* | *4 bits · V_ref = 3.3 V · 1 pas = 206.3 mV* |
| *4 bits for teaching: the 12-bit converter decides all 12 the same way, in 1 µs* | *4 bits pour l'enseignement : le convertisseur 12 bits décide les 12 de la même façon, en 1 µs* |
| *Comparator, D/A converter and register drawn apart for teaching: in a typical MCU converter, the D/A converter's capacitors also hold the sample* | *Comparateur, convertisseur N/A et registre dessinés séparément pour l'enseignement : dans un convertisseur de MCU typique, les condensateurs du convertisseur N/A retiennent aussi l'échantillon* |
| *Trial levels at whole codes: this converter truncates (it keeps the level at or below the input)* | *Niveaux d'essai sur des codes entiers : ce convertisseur tronque (il garde le niveau égal ou inférieur à l'entrée)* |
| *Slowed ≈ 2 × 10⁷ ×: one bit is decided in ≈ 83 ns* | *Ralenti ≈ 2 × 10⁷ × : un bit est décidé en ≈ 83 ns* |
| *Keep or drop this bit?* | *Garder ou rejeter ce bit ?* |

**Key framings** (2D): *Whole* (Home: converter and bar) · *Bar* (the bar alone, for the window's last
two steps, where it is 0.4125 V and then 0.20625 V tall).

## 4. The run: step by step, as the Flow goes

### 4a. Steps

| # | id | Flow paragraph | What changes (the `say`) | Overlay for the room | Presenter's control |
|---|---|---|---|---|---|
| 0 | `s0-meet` | p4 *"A **successive-approximation register (SAR)** ADC essentially performs…"* | Meet the converter: the held input, the comparator, the D/A converter, the register and the 0 to 3.3 V bar; the window is the whole range. | *4 bits · V_ref = 3.3 V · 1 step = 206.3 mV* | Next (appears with the paragraph) |
| 1 | `s1-try-1000` | after p5's cue *"[[demo]] Animation Bench: a SAR conversion, one comparison per bit."* (unscripted per bit) | Try 1000: the D/A converter gives 1.650 V, at or below the input, so bit 3 is kept and the window becomes the upper half, 1.650 to 3.300 V. | *1000 → 1.650 V · keep* | Next |
| 2 | `s2-try-1100` | (same) | Try 1100: the D/A converter gives 2.475 V, above the input, so bit 2 is dropped and the window becomes 1.650 to 2.475 V. | *1100 → 2.475 V · drop* | Next; the prediction (§7b) holds the comparator's word |
| 3 | `s3-try-1010` | (same) | Try 1010: the D/A converter gives 2.063 V, at or below the input, so bit 1 is kept and the window becomes 2.063 to 2.475 V. | *1010 → 2.063 V · keep* | Next; framing *Bar* |
| 4 | `s4-try-1011` | (same) | Try 1011: the D/A converter gives 2.269 V, above the input, so bit 0 is dropped and the window is one step wide, 2.063 to 2.269 V. | *1011 → 2.269 V · drop* | Next |
| 5 | `s5-result` | (same), then p6 *"SAR ADCs are widely used…"* | Four comparisons, four bits: the code is 1010, ten, which stands for 2.063 V, the level at or below the input. The same 2.17 V on the 12-bit converter takes twelve comparisons and gives 2693. | *1010 = 10 → 2.063 V · 4 bits, 4 comparisons* · *12 bits: 2.17 V → 2693, 12 comparisons* | Next; framing *Whole* |

### 4b. Motion, cues and stills per step

| # | Motion | Movers | Cue and second channel | Hold | Under reduced motion it lands as | Still |
|---|---|---|---|---|---|---|
| 0 | none (appears) | 0 | each part's label in turn as the paragraph names it | hold | the same, whole | the labelled converter, window full |
| 1–4 | (a) the bit cell turns *trying* and `trial` rises or falls to V_DAC, linked, `normal` pace (one progress, 0.8 s); (b) the comparator's word appears (at s2 only after the prediction's reveal); (c) the cell turns *kept* or *dropped* and `window` shrinks to its new half, linked, `normal` (0.8 s) | 1 at a time (a and c are each one linked motion) | the bench's path trace round `loop` (register → D/A converter → comparator → register) in step with a–c; the comparator's word in bold ink with its relation (*V_DAC ≤ V_in · keep* / *V_DAC > V_in · drop*; no tick or cross, nothing reads as right or wrong) | hold | the step's end state whole: the cell's final mark, `trial` at its level, `window` at its new size, the overlay | that end state, its overlay as the caption |
| 5 | `window` and `trial` fade out; the code's cell row lights (1.5 s) | 1 | the four cells lit together with the code in binary and decimal; the result level marked on the bar beside the input; the 12-bit line appears under the overlay | hold | the same, whole | the result |

Time scale on the identity bar and the legend card for steps 1–4 (A5): one bit's motion (a + c, 1.6 s at 1×) stands for
the 83 ns the course's converter gives one decision, so *slowed ≈ 2 × 10⁷ ×*; the badge follows the bench's speed
(at 2× a bit plays in 0.8 s, ≈ 1 × 10⁷ ×; at 0.25× in 6.4 s, ≈ 8 × 10⁷ ×; shown to one significant figure). Holds are stopped time, not slowed
time. Step 5's fade is not timed (no real event). Nothing flashes (B8); no loop (nothing here is cyclic).

## 5. Pacing and interaction, by surface and view

**Who paces**: on the wall, the presenter, one press per step; the wall draws the bench's transport flat
(*step n of 6*, holding). In Study Mode and Scope, the learner, step by step.

| View | Who | Controls |
|---|---|---|
| Preview (in the slide) | everyone | Previous · Next · *step n of 6* · the step's title · *Open details* |
| View (details) | everyone | the bench's transport: Previous, Play, Replay this step, Reset, Next, the scrubber (snaps to the six steps), then Speed 0.25×–2× (default 1×), Autoplay (off), Symbols IEC \| US (IEC), EN \| FR (hidden when hosted); Stops tile (list / stills); Parts tile; Cues tile (*path trace* on/off); Ask tile (the s2 prediction); Ink |
| Edit (session only) | everyone; a student's own copy | ink on the bar; a temporary note on a step |
| Authoring | authors | the six stops, their `say`, overlays, the cue track, the time-scale note, the prediction, the `{en, fr}` words |

The library has no controls of its own: every control above is the bench's (owner, 2026-10-08).

- **Presenter's strip**: the next step's title and "what changes" as text; the teacher tip (§7d); keys
  → / PageDown next, ← back, R replay.
- **Study Mode and Scope**: the same six steps, learner-paced; the stills strip under the bench; the
  numbers in the Stops panel; the prediction at s2 asks for a commitment before the comparator's word. No explore
  here (§7e).
- **Phone**: the bench on top (the bar beside the converter, both legible at 320 px), then the step's
  title and sentence, the stills row, big Previous / Next; one finger does nothing on the stage, two pinch
  and pan.
- **Locked**: Next at s2 until the prediction is revealed (Study and Scope; the presenter reveals on the wall).

## 6. The frame

| Tile / panel | Used? | Selected item | List / contents |
|---|---|---|---|
| Stops | yes | the current step's title and "what changes" | the six steps; *Stills* mode |
| Views | no (2D; two framings from the stage's zoom buttons) | — | — |
| Parts | yes | the pinned part, e.g. *D/A converter* with V_DAC as the one large value | the six parts with badges |
| Section | no (2D) | — | — |
| Cues | yes | — | *Path trace* on/off; legend: input solid azure, trial dashed amber, window hatched teal |
| Compare | no | — | — |
| Explore | no (see §7e) | — | — |
| Ink | yes | — | laser, ink |
| Ask | yes (s2) | the prediction and its tally | *keep* · *drop* |

Identity bar: *SAR: a binary search · Holding · step n of 6 · Slowed ≈ 2 × 10⁷ ×*. Legend card: the
three colours with their second channels, the time scale (*one bit is decided in ≈ 83 ns*) and the three
simplification labels (§8).

## 7. Thinking, not watching

- **7a. The PLAN's ASK** (verbatim): *numeric (at the Flow's [[ask]]) — "A converter decides one bit per comparison.
  How many comparisons does a 12-bit conversion need?" answer: 12 ± 0 · explain: Each comparison halves the remaining
  range, and twelve halvings take 4,096 possibilities down to one. · depth: use · practice: computational thinking.*
  It fires **before step 0**, before the bench appears. The bench then shows the same idea at 4 bits, and step 5's
  overlay closes it twice: *4 bits, 4 comparisons*, and the course's own 12-bit converter, *2.17 V → 2693, 12
  comparisons* (F7).
- **7b. Prediction on the bench** (F3, **decided 2026-10-20**; not in the PLAN, which this spec does not edit): at `s2`,
  after the trial line reaches 2.475 V and before the comparator's word appears, *"Keep or drop this bit?"* (keep ·
  drop); answer *drop* (2.475 V is above 2.170 V); the reveal is the comparator's word, then (c).
- **7c. After**: the ASK's explain covers it. In Study, done = the numeric answered, the s2 prediction committed and the
  six steps seen.
- **7d. Teacher tip** (F5, **decided 2026-10-20**): *Learners expect the converter to "measure" the voltage directly.
  Ask: does the comparator ever know the input's value, or only "at or below" / "above"?*
- **7e. Explore**: none on the Animation Bench: an arbitrary input means computing a new search, which
  an authored animation does not do. The PLAN's optional Coding Bench SAR step-through covers *"any
  input the room calls out"*.

## 8. Faithfulness (the quality bar)

**The model** (the course's, `course-accuracy.md` §3): 12 bits, 3.3 V reference, truncating (code = ⌊V / LSB⌋); 1 µs
of conversion after D1·070's 1 µs window. The bench shows the same converter at 4 bits: LSB = 3.3 V ÷ 16.

**Arithmetic** (recomputed in Node, 2026-10-20). LSB = 3.3 V ÷ 2⁴ = 0.20625 V. The rule: keep the bit when the trial
is at or below the input (V_DAC ≤ V_in), which makes the result ⌊V_in / LSB⌋. Trial levels (code × LSB):
1000 = 8 × 0.20625 = 1.650 V; 1100 = 12 × = 2.475 V; 1010 = 10 × = 2.0625 V (shown 2.063); 1011 = 11 × = 2.26875 V
(shown 2.269). Against 2.170 V: at or below, above, at or below, above → keep, drop, keep, drop → 1010 = 10 =
⌊2.170 / 0.20625⌋ = ⌊10.52⌋ ✓. Windows: 0–3.300 → 1.650–3.300 → 1.650–2.475 → 2.0625–2.475 → 2.0625–2.26875 V; heights
3.3, 1.65, 0.825, 0.4125, 0.20625 V, each half the last ✓; the last is 1 LSB and contains 2.170 ✓. Error of the
result: 2.170 − 2.0625 = 0.1075 V = 0.52 LSB, below the input: inside truncation's 0 to −1 LSB band (card 3) ✓. Bar:
codes 0–15 sit at 0 to 15 × 0.20625 = 3.09375 V; 3.300 V is 16 × LSB, the range's top, not a code ✓. All match the
PLAN.

**At 12 bits** (card 1, F7). LSB = 3.3 / 4096 = 0.80566 mV; 2.170 / LSB = 2693.43 → **2693** = 1010 1000 0101, level
2.16965 V, 0.35 mV (0.43 LSB) below the input ✓ (card 1's *"2693 (on a 12-bit, 3.3 V converter)"*). The SAR's twelve
decisions: keep, drop, keep, drop, keep, drop, drop, drop, drop, keep, drop, keep. Its first four are the 4-bit run's
(1010…, trials 1.650, 2.475, 2.0625, 2.26875 V), so the bench is literally the first third of the real search. Twelve
comparisons, as the ASK answers. Edge case (A3): the closest trial to the input is the eleventh, 2.170459 V, 0.46 mV
(0.57 LSB) above it; no trial falls on the input.

**Time scale.** The course's model gives the conversion 1 µs for 12 bits: 1 µs ÷ 12 = **83.3 ns per bit decision**.
The bench plays one bit's motion in 1.6 s at 1× (§4b a + c): 1.6 s ÷ 83.33 ns = 1.92 × 10⁷, shown *≈ 2 × 10⁷ ×*.
The extra clocks a real converter spends are folded in, not shown: acquisition is D1·070's 1 µs window, before step 1
(not on this bench); a real converter of this class spends 12.5 ADC clocks on 12 bits, about one a bit (0.89 µs at a
14 MHz ADC clock, 71 ns a clock), which the course's model rounds up to 1 µs and spreads
evenly over the 12 decisions. The 4 bits shown would take 4 × 83.3 = 333 ns. Source of the class's numbers (cited here
only, A3): STMicroelectronics RM0008, STM32F10x reference manual, ADC chapter (total conversion time =
sampling time + 12.5 ADC clock cycles), 1 µs at ADCCLK = 14 MHz with a 1.5-cycle sample (the converter class D1·070's §8 cites).

**Section D, Animation rows**
- [x] Mechanism checked: successive approximation, MSB first, one comparison per bit, trial = bits
  kept so far plus the bit under test; charge-redistribution D/A converter that also samples (Analog Devices MT-021,
  *ADC Architectures II: Successive Approximation ADCs*; Horowitz & Hill, *The Art of Electronics*, 3rd ed., the ADC
  chapter).
- [x] Time scale shown, with the real duration and its source (above).
- [x] Every stop matches the Flow (p4 over s0; one unscripted line per bit after p5's cue; p6 over s5; the PLAN's
  sequence matched).
- [x] Values recomputed (above).
- [x] Simplifications labelled (A6), the words on the bench (§3's table): *"4 bits for teaching: the 12-bit converter
  decides all 12 the same way, in 1 µs"*; *"Comparator, D/A converter and register drawn apart for teaching: in a
  typical MCU converter, the D/A converter's capacitors also hold the sample"*; *"Trial levels at whole codes: this
  converter truncates (it keeps the level at or below the input)"* (F1).

**Stand-in (Draw) rows**: proportions: the bar to scale in volts, the converter block diagram not to
scale (says so); IEC 60617 symbols (amplifier rectangle with ▷ for the comparator, `#/∩` for the D/A converter); numbers
recomputed above; every step's `say` = §4a.

**A1–A8**: A1 ✓ (PLAN, the course's model, RM0008, MT-021); A2 partly: ideal comparator and D/A converter, non-ideal
effects in §9 for Study Mode; A3 ✓ (unbranded: *a 12-bit MCU SAR converter*; the product is cited in this section
only) and the block diagram is labelled *not to scale*; A4 n/a (no instrument); A5 ✓ (≈ 2 × 10⁷ ×, ≈ 83 ns); A6 ✓;
A7 ✓ (truncating, as the course's converter, card 1's 2693 and card 3's 0 to −1 LSB band; F1 decided); A8 ✓.

## 9. Faults and non-ideal behaviour

**PLAN FAULT**: none on this card. The module's FAULT on *Quantization error is a floor* names
*"Truncating instead of rounding: a steady −½ LSB offset"*: this card's converter truncates by design, as the
course's does, and says so on the bench (F1).

Non-ideal effects a real SAR shows (F6, **decided 2026-10-20**: for Study Mode or a later card, not the lecture):
1. **The input moves during the search** (no hold): the bits already decided no longer fit, and the
   code can be wrong by many LSB. The reason for D1·070's sample-and-hold, shown from this side.
2. **The D/A converter has not settled** when the comparator decides (clock too fast): a wrong keep or drop.
   At the course's 83 ns a bit, the capacitor array must settle within its share of each bit; this is why MCU
   datasheets cap the ADC clock for full resolution (§8's source gives 14 MHz).
3. **Comparator noise near a level**: an input within noise of a trial level gives a different last
   bit from one conversion to the next (the *"last two bits never sit still"* of the module's
   `motivates`). At 12 bits the eleventh trial is 0.57 LSB from 2.17 V (§8).

## 10. Accessibility, legibility and print

- Wall: overlays and value chips at 32 pt, 7:1; the bar's tick labels every 4 levels (16 labels would
  collide at 1920 × 1080).
- Reduced motion: every §4b row lands whole and reads from its still, overlay and sentence.
- Colour: input and trial differ by line style and label as well as hue; keep / drop by fill, digit,
  glyph and word.
- Languages: every word in §3's table as `{en, fr}`; French type fits (the longest label, the D/A converter
  simplification, wraps rather than shrinks).
- Print: six stills, each with its sentence and values, in the viewer's language.

## 11. Assets to make or source

| Asset | Format | Made by | Status |
|---|---|---|---|
| `sar-binary-search.benchdrawing`: the six steps, `say` per step (`{en, fr}`), trace / appear entries, linked motion for `trial` and `window`, IEC and US symbol sets | Draw Bench file | the Benches lane, from this spec | to make, when the course needs it (§13); serves the stand-in now and the Animation Bench later (C69) |
| `sar-binary-search` library: overlays, cue track, time-scale note, stops, the s2 prediction | Animation Bench library in `C:\ExSightory\src\exsight-benches\benches\animation\libraries\` | the Benches lane | to be requested by crossing (§12) |

## 12. Bench capabilities this needs

**Animation Bench** (the Benches lane's, milestone M62; the status of each as its capability list marks it): C1 next
and hold · C2 back · C5 stop list · C6 scrubber · C7 speed · C8 time-scale badge · C10 replay · C13 keys · C15 stop
restores its scene · C16 stills · C17 meet the parts · C18 "what changes" · C19 overlay · C20 values
beside their element · C21 teacher tip · C23 print · C35 labels · C38 highlight · C40 path trace · C44 no
flashing · C45 prediction point (s2) · C52 presenter strip · C60 wall profile · C64 reduced
motion · C65 colour never alone · C66 phone · C69 import a Draw Bench drawing · C72 stop inspector ·
C75 checks · the EN | FR switch (hidden when hosted) · **the Symbols IEC | US switch** (owner, 2026-10-20; ask for it
in the crossing if the capability list does not carry it).

**The library is asked of the Benches lane by crossing** when the course needs it (`CLAUDE.md`, *Talking to the
Benches lane*); this spec is what the request points at. The crossing should also say that the capability list's §7
sample for this card (stop words with *clear*, the badge *"slowed ≈ 200 000 ×"* with a product name) is replaced by
§4a and §6 here. No crossing is written by this revision.

**Not this bench's**: a search for any input the room calls out (computing) → **Coding Bench** (planned),
as the PLAN says. The path trace is the bench's cue (C40); the library draws no signal effects of its own (no
charge dots, no glows).

**Draw Bench (stand-in)**: steps, `say`, `trace` / `appear` entries **exist** (M59m, M59d); the wall plays
traces only, so the linked motion of `trial` and `window` shows as each step's end state until **M59n
(not built)**.

## 13. Stand-in for the lecture

**Draw Bench**, `sar-binary-search.benchdrawing`, six steps as §4a. On the wall each step's new lines
trace in and its text appears; `trial` and `window` jump to their new positions instead of moving (until
M59n). Keeps: B1, B3, B4 (the step strip), B5, B14, B16, A5 (the time scale as a text item), the three simplification
labels. Loses: the path-trace cue round the loop (B6 weakens to the bit cell and comparator word lighting), the moving
window (the *Look for* is still visible step to step), the prediction point (the presenter asks it aloud: *"Keep or
drop this bit?"*), the Symbols switch (IEC only) and French (unless the Draw format carries `{en, fr}` by then). The
same file becomes the Animation Bench's source (C69), so nothing is drawn twice.

Flow: the cue *"[[demo]] Animation Bench: a SAR conversion, one comparison per bit."* names the target. It is a stage
direction, not spoken, so the room hears nothing false when the Draw stand-in carries the day.

## 14. Findings for the owner

- **F1 (A7) — truncation here, rounding elsewhere in the module. Decided 2026-10-20** (owner: *"go with your
  recommendations"*): **(a)**, as recommended. The dry run found: this card's trial levels sit at whole codes
  (code × LSB), so the converter truncates: 2.170 V → 1010 (10, 2.063 V), 0.52 LSB below; the module's centrepiece Plot
  rounds, q·round(x/q): 2.170 ÷ 0.20625 = 10.52 → 11 (2.269 V); the module's own FAULT calls truncation a fault. A
  converter whose first transition sits at ½ LSB (how some MCU datasheets define the ideal transition) tries 1.547,
  2.372, 1.959, 2.166 V and returns 1011, 4 mV from a knife edge. Options were (a) keep the numbers and label the bench
  *"trial levels at whole codes: this converter truncates"* (**recommended**); (b) change the input to 2.10 V;
  (c) make this SAR a rounding one and end on 1011. Since then the module has settled the same way: the course's
  converter truncates (`course-accuracy.md` §3), card 1 says *"the nearest, or the one just below, depending on the
  converter"* and gives 2693 for 2.17 V at 12 bits, card 3 states truncation's 0 to −1 LSB band (D1·080-F2, F5).
  **Applied**: the label is in §3 and §8; the PLAN's numbers stand.
- **F2 — the Flow's demo cue named the retired widget. Decided 2026-10-20** (U017's N1): the Flow now reads
  *"[[demo]] Animation Bench: a SAR conversion, one comparison per bit."* Quoted in §2, §4a and §13.
- **F3 — Proposal: a prediction at step 2**, *"Keep or drop this bit?"*, +0.5 min. **Decided 2026-10-20**: taken on the
  bench (§7b, `predictions: [s2]`); the minutes include it (2.0 / 3.1; 1.5 / 2.6 without). The PLAN is the owner's and
  is not edited here; adding an ASK line for it there is the owner's call.
- **F4 — Proposal: the time-scale badge. Decided 2026-10-20** (U017's D3), revised to the course's converter:
  *"Slowed ≈ 2 × 10⁷ ×: one bit is decided in ≈ 83 ns"* (1 µs ÷ 12, played in 1.6 s; §8). The dry run's badge, based
  on one product's 10-bit converter at 8 µs a bit, is withdrawn, with the product name.
- **F5 — Proposal: the teacher tip** in §7d. **Decided 2026-10-20**: taken.
- **F6 — Proposal: the three non-ideal effects** in §9, for Study Mode, not the lecture. **Decided 2026-10-20**: taken.
- **F7 — Proposal (new, U017): close on card 1's 2693.** Step 5's overlay adds *"12 bits: 2.17 V → 2693, 12
  comparisons"*, and the presenter's line says the same; the first four of the twelve decisions are the four shown
  (§8). It ties card 5 to card 1 and answers the ASK on the course's own converter. Applied in §4a with this revision
  (its words are in §2's step 5 row); the owner may remove it.
- **N2 — applied in the Flow (U017)**: p6 now ends *"Most microcontrollers' built-in converters are SAR ADCs."*; no
  product is named on this card. Quoted in §2.

No accuracy finding in the owner's text of this card (A1–A7 run on 2026-10-20 against the current en.md). Two faults
in our own earlier spec were fixed here before sending: the per-bit time and the product name (D3), and the bar's
3.300 V tick, which is the range's top and not a code (§3).

## 15. Acceptance: how we know it is built right

- The six steps of §4a play on the wall, the presenter's window and Study Mode in order, each holding
  at its end, with the values of §8 exactly (1.650, 2.475, 2.063, 2.269 V; code 1010 = 10; 2693 at 12 bits).
- B1: each press lands one bit's try, compare, decide. B2: only `trial` and `window` move. B3: step 0
  is still and labelled. B4: six stills, current lit, each a jump. B5: every step's sentence on the
  presenter's strip and read aloud in Scope. B6: the bench's path trace runs round the loop on each of steps
  1–4. B7: one mover at a time. B8: nothing flashes. B9: at s2 the comparator's word waits for the prediction's
  reveal. B12: the wall's transport is not operable. B13: no Flow text on the bench. B14: values beside `dac`,
  `hold`, `register`. B16: the code and voltages readable as text. B20: the next step's sentence and the tip on the
  presenter's strip.
- A5: the badge reads *≈ 2 × 10⁷ ×* at 1× and follows the speed (§4b); A6: the three labels of §3 are on the bench.
- The Symbols switch redraws the comparator and the D/A converter (IEC ↔ US) on every step; EN | FR swaps every word of
  §3's table without a reload, numbers unchanged.
- C2: legible from the back row at 1920 × 1080 and 1024 × 768. C3: under reduced motion every step
  lands whole. C4: checked under the three colour-vision simulations. C5: → ← R work from a clicker.
  C6: walked at 320 px. C7: < 100 ms from a press to the first frame on the lecture laptop. C8: the
  print form shows six stills with sentences.
- E1–E6 for the built bench; the six gates reported by the Benches lane with the library.
- The Draw stand-in checked on the lecture laptop before Saturday, both themes, with the time scale
  and the simplification labels visible.
