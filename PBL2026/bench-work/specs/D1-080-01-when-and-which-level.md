```yaml
id: D1-080-01-when-and-which-level
card: "When, and which level"
module: notes/Day01/080-adc-conversion/en.md
bench: Plot                       # exists; the PLAN's SHOW (owner D1, 2026-10-20: the PLAN's Plot and Equation benches, specified now)
library: "sampled-and-quantized: a Plot of one slow signal against time (0–2 s, 0–3.3 V), its sampled-and-held version and the held value quantized by the converter, with sliders f_s, N and a Rounding | Truncating quantizer, defined in the card's `plot` block"
dimensions: 2D
stand_in: "the presenter drags the sliders on the wall window until X12 (named presets, mirrored); the quantizer is a 0–1 slider until X-switch (a labelled switch)"
optional_benches: []
real_thing: "a 12-bit MCU converter on a 3.3 V reference (the course's: truncating) sampling a slow sensor signal, shown at 2–8 bits and 2–40 S/s so that both kinds of step can be seen"
minutes: 3.9                      # on the bench: the plot is on the Canvas for the whole card (§2)
card_minutes: 3.9
status: spec-ready
learner_action: none
predictions: []
seeds: [S12 (harvest), S18 (plant)]
key_variable: "f_s against N: each moves the steps along one axis only (time, or amplitude)"
time_scale: "none (slider states; the t axis is real seconds, the signal a slow 0.5 Hz illustration)"
steps: 5                          # s0–s4
```

The Plot's format, read 2026-10-20 (`C:\ExSightory\src\insight\packages\insight-core\src\registry\plotBlock.ts`, `expr/evaluate.ts`,
`canvas/src/PlotViewer.vue`, `canvas/src/plotModel.ts`): `variable`, `domain`, `range`, `parameters` (sliders: `min`, `max`,
`default`, `step`, `unit`, `label`), `curves` (an expression of the variable and the parameters; `label`, `colour` from
the six series colours teal · amber · violet · rose · azure · lime, `dashed`, `fill`), `markers` (at a fixed x or y),
`animate` (one parameter swept), `readout`, `fixedView`, `aspect`. Functions include `floor`, `round`, `min`, `max`,
`clamp`, `mod`, `step`, `sin`; constants `pi`, `tau`. One plot has one y axis. A plot's sliders are local to each window
and not mirrored (`livePush: false`). The viewer samples each curve at about 429 points across the visible domain (644 px
of plot ÷ 1.5) and joins them, so a jump is drawn as a riser one sample wide.

**Six gates** (this spec, 2026-10-20): (1) realism: the course's 3.3 V converter and real S/H behaviour; low N and f_s
labelled as teaching values (A6) — pass. (2) science: sample-and-hold then quantization, as a converter does — pass.
(3) maths: every value of §3b and §8 recomputed in Node — pass. (4) visualization: one slider moves one axis of the steps
(§4) — pass, with C4 partial until X-switch (§10). (5) consistency: 2693, 0.806 mV, 3.3 V, truncation as D1·070 and card 5 —
pass. (6) design: sliders in one row, labels in words with symbols (`sliders-side-by-side`); EN and FR labels drafted
(FR for the owner's review) — pass on paper, to be checked on the built plot.

## 1. What the room must understand

- **Statement** (verbatim): *Sampling decides when the converter looks: it divides time into observation points.
  Quantization decides what it records: it divides amplitude into representable levels.*
- **SHOW** (verbatim from the PLAN): *Plot — one slow waveform with its sampled-and-held version v(floor(t·f_s)/f_s) and
  its quantized version q·round(v/q); sliders f_s and N.*
- **Drive** (verbatim): *lower f_s (the steps widen in time); lower N (the steps coarsen in amplitude).*
- **Look for** (verbatim): *two independent kinds of coarseness, one on each axis.*
- **Status** (verbatim): *ready.* **Note** (verbatim): *resolved 2026-10-20 (ACCURACY D1·080-F1): the Flow now says 2693,
  the 12-bit, 3.3 V code for 2.17 V.*
- **HARVEST** (verbatim): *S12 — "Detect or quantify, from the sensor module: to quantify, we digitize. Here it is."*
- **SEED** (verbatim): *plants S18 — "With today's still quantity, how often we sample hardly matters. Today. On Day 3 it
  becomes the most dangerous question in the course."*
- **Bench and library.** The **bench** is the Plot Bench (the viewer, its sliders, legend and readout). The **library**
  is this card's plot, `sampled-and-quantized`.
- **Insight**: *a converter's output is coarse in two separate ways: how often it looks (the sampling rate sets the
  width of the steps in time) and how finely it can record (the bits set the height of the steps), and each can be made
  coarser without touching the other.*
- **Kind of knowledge**: *a relation between quantities* (f_s and N against the steps' width and height) and *a
  contrast between two states* (the signal against what the converter delivers). Card test → **Plot**. B17 applies (the
  input dashed behind the two stepped versions, on one axis). B15, B18, B19 do not.
- **Why this bench, not a still**: the Look for is about independence. Lower f_s and only the steps' timing changes;
  lower N and only their heights change, while the held (teal) curve does not move at all. A still shows one setting;
  the room has to see each slider act on one axis alone.
- **Key variable**: f_s against N.

## 2. Time

The card's Flow is **466 words, all spoken** (counted from en.md 2026-10-20: words ÷ 130 wpm; the card has no `[[ask]]`
or `[[demo]]`). The HARVEST S12 line is not in the Flow and is counted as an added line (as D1·060 card 1's harvest).

| Beat | Minutes | Source of the number |
|---|---|---|
| s0 the plot at f_s 40, N 8: the HARVEST S12 line (14 words, not in the Flow) | 0.11 | 14 ÷ 130 |
| s0 held: p0 *"When we want to give a physical quantity a numerical value…"* (35), p1 *"Converting data from the **analog domain…"* (77), p2 *"Once an interface exists…"* (29), p3 *"At the simplest level…"* (47), p4 *"But an ADC does not simply…"* (18) | 1.58 | 206 ÷ 130 |
| s1 f_s 40 → 4: p5 *"**Sampling.** An analog signal can vary…"* (132) | 1.02 | 132 ÷ 130 |
| s2 N 8 → 3: p6 *"**Quantization.** Sampling tells us *when*…"* to *"…one of the available levels:"* (85) | 0.65 | 85 ÷ 130 |
| s3 the quantizer to truncating: p6 *"the nearest, or the one just below…"* to the paragraph's end (27) | 0.21 | 27 ÷ 130 |
| s4 held: p7 *"A useful mental model:"* (4), p8 *"**Sampling divides time…"* (12) | 0.12 | 16 ÷ 130 |
| Slider moves not covered by speech (three moves: ≈ 3 s, 3 s, 1 s) | 0.12 | estimate |
| **Card total / of which on the bench** | **3.8 / 3.8** | the plot is on the Canvas for the whole card |

p0–p4 (1.58 min) are spoken over the held s0: a long paragraph over a held state (B13), not over motion. The U017 brief
estimated ≈ 3.7 min; the HARVEST line and the three moves bring it to 3.8.

**Module check**: `D1-080-03-quantization-floor.md` §2.

## 3. The scene: what is on the bench

### 3a. The plot (`sampled-and-quantized`)

| Field | Content | Source |
|---|---|---|
| `title` | *When, and which level* · FR *Quand, et à quel niveau* | the card's heading |
| `caption` | *One slow signal, sampled (teal) and quantized (amber). The low resolutions are for teaching: the course's converter has 12 bits, one level every 0.806 mV, far finer than this line.* · FR *Un signal lent, échantillonné (sarcelle) puis quantifié (ambre). Les faibles résolutions servent à l'enseignement : le convertisseur du cours a 12 bits, un niveau tous les 0.806 mV, bien plus fin que ce trait.* | A6 (**Proposal**, F3) |
| `variable` | `t` (time, s) | the PLAN |
| `xLabel` / `yLabel` | *Time (s)* / *Voltage (V), converter range 0–3.3 V* · FR *Temps (s)* / *Tension (V), plage du convertisseur 0–3.3 V* | the PLAN |
| `domain` | [0, 2] | one period of the 0.5 Hz signal (owner, 2026-10-20) |
| `range` | [0, 3.3], `fixedView: true` | the converter's range; the framing is the point |
| `parameters` (one row, side by side) | `fs` *Sampling rate (f_s)* 2–40, default 40, step 1, unit *S/s*; `N` *Resolution (N, bits)* 2–8, default 8, step 1, unit *bits*; `trunc` *Quantizer (0 rounding · 1 truncating)* 0–1, default 0, step 1 · FR *Fréquence d'échantillonnage (f_s)*, *Résolution (N, bits)*, *Quantificateur (0 arrondi · 1 troncature)* | ranges: owner 2026-10-20; the switch: accepted Proposal (F1); defaults: **Proposal** (F2) |
| `curves` | see below | the PLAN |
| `markers` | none | — |
| `readout` | on: t and the three curves' values at the hover | the Plot's default |

**Curves**:

| id | Expression | Label (EN · FR) | Colour, line |
|---|---|---|---|
| `input` | `1.65 + 1.2*sin(tau*0.5*t)` | *Signal at the converter's input* · *Signal à l'entrée du convertisseur* | azure, `dashed` |
| `held` | `1.65 + 1.2*sin(tau*0.5*floor(t*fs)/fs)` | *Sampled and held: f_s times a second* · *Échantillonné et bloqué : f_s fois par seconde* | teal, solid |
| `quantized` | `3.3/2^N * min(floor((1.65 + 1.2*sin(tau*0.5*floor(t*fs)/fs))*2^N/3.3 + (1 - trunc)/2), 2^N - 1)` | *Quantized: what the converter records* · *Quantifié : ce que le convertisseur enregistre* | amber, solid |

- `held` is the PLAN's v(floor(t·f_s)/f_s), written out.
- `quantized` is the PLAN's q·round(v/q) applied to the held value (what a converter delivers; F4), with q = 3.3/2^N.
  `floor(u + (1 − trunc)/2)` is `round(u)` when `trunc` = 0 (the viewer's `round` is `Math.round`, which is
  `floor(u + 0.5)`) and `floor(u)`, the course's truncation, when `trunc` = 1. `min(…, 2^N − 1)` is the top code. It
  never binds for this signal (2.85 V at N = 2 is 3.45 steps, below the top code's 3.5).
- Write the multiplication before the division (`…*2^N/3.3`): 1.65·2^N/3.3 is then exactly 2^(N−1) in floating point,
  so mid-scale truncates to its own level, not the one below (A3, §8).

### 3b. The states the presenter sets

| State | f_s | N | Quantizer | What the room sees |
|---|---|---|---|---|
| s0 | 40 S/s | 8 | rounding | 80 samples in 2 s, treads 25 ms wide; 256 levels of 12.89 mV; the teal and amber hug the dashed input |
| s1 | 4 S/s | 8 | rounding | 8 samples, treads 250 ms wide: the teal is a coarse staircase in time; the amber still sits on it |
| s2 | 4 S/s | 3 | rounding | 8 levels of 412.5 mV: the amber jumps to levels; the teal **does not move** |
| s3 | 4 S/s | 3 | truncating | three of the eight samples drop one level (0.5 s, 1.25 s, 1.75 s): never above the input |
| s4 | 4 S/s | 3 | truncating | held: coarse in time and coarse in amplitude, each set by its own slider |

Held values at f_s = 4 S/s (t = 0, 0.25 … 1.75 s): 1.6500, 2.4985, 2.8500, 2.4985, 1.6500, 0.8015, 0.4500, 0.8015 V.
At N = 3 (q = 0.4125 V), rounded codes 4, 6, 7, 6, 4, 2, 1, 2 (1.6500, 2.4750, **2.8875**, 2.4750, 1.6500, 0.8250, 0.4125,
0.8250 V); truncated codes 4, 6, **6**, 6, 4, **1**, 1, **1** (2.4750 at 0.5 s; 0.4125 at 1.25 and 1.75 s). Rounding
puts 2.85 V on 2.8875 V, above the input: *the nearest* can be above; *the one just below* never is.

**Values beside their element**: the slider values beside the sliders (*40 S/s*, *8 bits*, *0*); the hover readout. No
numbers are written on the plot (B13): 2693 and 2.17 V are spoken (p3), not drawn.

**Colours and their second channel** (C4): the input azure and **dashed**; the held value teal; the quantized value
amber. Teal and amber are both solid, so the second channel today is the legend's words and the shapes (the teal tread
starts on the input at each sample; the amber tread sits on a level). A heavier amber line needs a stroke weight the
Plot does not have (X-switch, §12).

**Key views or framings**: one, fixed (`fixedView`), 0–2 s by 0–3.3 V.

## 4. The run: step by step, as the Flow goes

### 4a. Steps (slider states; until X12 the presenter drags them on the wall window)

| # | id | Flow paragraph (first words) | What changes (`say`) | Overlay | Presenter's control |
|---|---|---|---|---|---|
| 0 | `s0-digitized` | the HARVEST S12 line, then p0 *"When we want to give…"* to p4 *"But an ADC does not simply…"*, held | One slow signal, and what a converter makes of it at 40 samples a second and 8 bits: steps so fine they hug the line. | — | (the plot opens at its defaults) |
| 1 | `s1-sampling` | p5 *"**Sampling.** An analog signal can vary…"* | Fewer samples a second: the steps widen in time. Between samples the converter does not look. | — | `fs` 40 → 4 |
| 2 | `s2-quantization` | p6 *"**Quantization.** Sampling tells us *when*…"* | Fewer bits: the steps coarsen in amplitude. The sampled curve has not moved. | — | `N` 8 → 3 |
| 3 | `s3-just-below` | p6 *"the nearest, or the one just below, depending on the converter…"* | A truncating converter takes the level just below: three samples drop one level, none sits above the input. | — | `trunc` 0 → 1 |
| 4 | `s4-two-axes` | p7 *"A useful mental model:"*, p8 *"**Sampling divides time…"*, held | Two kinds of coarseness, one on each axis: time from the sampling rate, amplitude from the bits. | — | (Next leads to card 2) |

### 4b. Motion, cues and stills

| # | Motion | Movers | Cue and its second channel | Hold | Reduced motion (C3) | Still |
|---|---|---|---|---|---|---|
| 0 | none | 0 | the three curves and their legend | hold | same | s0 |
| 1 | the teal and amber treads widen as `fs` is dragged (≈ 3 s) | 1 (amber follows teal: linked) | the treads' width; the slider's value | hold | the end state at once | s1 |
| 2 | the amber treads jump to fewer levels as `N` is dragged (≈ 3 s); the teal stays still | 1 | the amber's heights; the teal unmoved beside it | hold | at once | s2 |
| 3 | three amber treads drop one level | 1 | the dropped treads below the dashed input | hold | at once | s3 |
| 4 | none | 0 | — | hold | same | s4 (the card's summary) |

There are five stills (s0–s4). No `animate` block: a sweep would move without the presenter (B1).

## 5. Pacing and interaction, by surface and view

**Who paces** (B12): the presenter on the wall; the learner in Study Mode and Scope. **Until X12** the sliders are local
to each window: the presenter drags them on the wall window and the states of §3b are on the presenter's strip (as
D1·020 card 5 and D1·060 card 8).

| View | Who | Controls |
|---|---|---|
| Preview (in the slide) | everyone | the plot at its defaults (f_s 40, N 8, rounding); the three sliders in one row |
| View (details) | everyone | the three sliders, each with its words above it and the symbol in parentheses, its value at the label's right (`sliders-side-by-side`); the hover readout |
| Edit (session only) | everyone | not specified for the Plot Bench (its sliders already vary the values) |
| Authoring | authors | the `plot` block's YAML |

- **The presenter's strip** (B20): the five states of §3b in order with the next `say`; the teacher tip (§7d).
- **Study / Scope**: all three sliders free after the guided pass (§7e).
- **Phone** (C6): the plot full width; the sliders under it, one per line; the legend's three labels wrap, never shrink.
- **Locked**: nothing (no prediction on this card).

## 6. The frame

The Plot's viewer frame (the Canvas header and footer, D4.10–4.12): the title *When, and which level*, the legend (input
dashed azure, held teal, quantized amber), the sliders under the plot in one row, the readout. There is no dock and
there are no panels on the Plot today.

| Tile / panel | Used? | Selected item | List / contents |
|---|---|---|---|
| Legend | yes | — | the three curves' labels |
| Sliders | yes | the value beside each label | f_s, N, quantizer |
| Readout | yes (hover) | t and the three values | — |

## 7. Thinking, not watching

- **7a. The PLAN's ASK**: *none on this card.* Card 2's numeric follows.
- **7b. Prediction point**: none in the PLAN. **Proposal** (F5): before s2, ask aloud *"I'm about to lower the bits.
  Which curve will change?"* (the amber only); +0.1 min.
- **7c. After**: card 2 counts the levels. In Study, done means all three sliders were moved.
- **7d. Teacher tip** — **Proposal** (F5): *Learners expect more samples to fix coarse levels, or more bits to fix
  missing instants. Ask: at 40 S/s and 2 bits, is the picture good?* (No: fast and coarse.)
- **7e. Explore** (B11): in Study, f_s 2–40, N 2–8, the quantizer. *Find a setting that is fine in time and coarse in
  amplitude, and one that is the reverse* (e.g. 40 S/s, 2 bits; 2 S/s, 8 bits).

## 8. Faithfulness (the quality bar)

**Arithmetic** (Node, 2026-10-20):
- The signal 1.65 + 1.2·sin(2π·0.5·t) V spans **0.45 to 2.85 V**, inside 0–3.3 V; its period is 2 s, one period on the
  axis.
- f_s from 2 to 40 S/s gives 4 to 80 samples a period. The lowest, 2 S/s, is still twice the Nyquist rate of 1 S/s for
  0.5 Hz, so nothing on this card aliases (aliasing is Day 3's, the seed S18).
- q = 3.3/2^N: N 2 → 825 mV, 3 → 412.5, 4 → 206.25, 5 → 103.13, 6 → 51.56, 7 → 25.78, 8 → **12.89 mV**. At 12 bits,
  3.3/4096 = **0.8057 mV** (the caption's 0.806 mV; card 2's worked example).
- p3: 2.17 V ÷ 0.80566 mV = **2693.43 → 2693**, rounding or truncating (✓ the Flow's 2693); code 2693 is 2.16965 V.
- The states of §3b are recomputed above. At N = 2 the highest held value, 2.85 V, is 3.4545 steps (rounds to 3 = 2^N − 1),
  so the top code never clips.

**Section D, Plot rows**
- [x] The expression is the physics: a sample-and-hold (the value at the last sampling instant, held until the next) and
  a uniform quantizer of 2^N levels on a 3.3 V reference, rounding or truncating (the course's model: truncating,
  `course-accuracy.md` §3).
- [x] Axis and slider ranges real: 0–3.3 V is the course's converter; the low N and f_s are teaching values, labelled
  (A6).
- [x] One worked value: at s3, t = 0.6 s: held 2.85 V (the sample at 0.5 s), truncated level 6 × 0.4125 = 2.4750 V.
- [x] No artefacts: about 429 samples across 2 s (4.7 ms each). The narrowest tread (25 ms at 40 S/s) spans ≈ 5 samples,
  so each riser is drawn one sample (≈ 1.5 px) wide, near vertical.

**A1–A8**: A1 ✓ (the course's converter; values computed); A2 ✓ (the converter's own steps, both kinds, and truncation
by the switch); A3 ✓ (edge cases: mid-scale 1.65 V is exactly level 2^(N−1), a truncation transition; computed exactly as
§3a writes it; the top code never binds; the lowest f_s stays above Nyquist); A4 n/a; A5 ✓ (t in real seconds; the
signal is slow by choice, not a slowed real one); A6 ✓ (the caption: *the low resolutions are for teaching*); A7 ✓ (3.3 V,
12 bits, 0.806 mV and truncation as D1·070 and card 5; 2693 as card 5's closing value); A8 ✓.

## 9. Faults and non-ideal behaviour

**PLAN FAULT**: none on this card. The quantizer switch shows the course's truncation (card 3's FAULT names its offset).
Aperture jitter, droop of the held value and the input's settling are not drawn (the sample-and-hold is ideal here; D1·070
is the input's card).

## 10. Accessibility, legibility and print

- Wall (C2): the axis labels, slider labels and values, and the legend at the Plot's wall size. Check at 1920 × 1080
  and 1024 × 768.
- Reduced motion (C3): each setting lands at once; the stills carry the steps.
- Colour (C4): the input is dashed; held and quantized differ by colour, the legend's words and their shapes. **Partial
  until X-switch** (a stroke weight to make the amber heavier). Check under deuteranopia that teal and amber stay apart.
- Keyboard (C5): the sliders' arrow keys (one sample a second, one bit, one quantizer step per press); Tab between them.
- Print (C8): the five stills of §4b with their `say` and the row of §3b.

## 11. Assets to make or source

| Asset | Format | Made by | Status |
|---|---|---|---|
| The `plot` block (§3a), EN and FR labels | YAML in `en.md` | the author (FR drafts for the owner's review) | to write |

## 12. Bench capabilities this needs

**Plot Bench**: `variable`, `domain`, `range` with `fixedView`, `parameters` (three), `curves` with `floor`, `min`, `sin`,
`tau` and `dashed`, `readout`: **all exist**.

**Missing (request it)**:
- **X12** (already listed): named presets the presenter steps through, mirrored to the wall and devices. The five
  states of §3b are this card's presets.
- **X-switch** (**proposed**; its number is given when it is raised as a crossing to Benches, as X21 was): Plot presentation options:
  (a) a two-state parameter drawn as a labelled switch (*Rounding | Truncating*) instead of a 0–1 slider, and (b) a
  curve's stroke weight (and a dotted pattern) as a second channel beside colour. Today: the 0–1 slider with its label;
  colour plus the legend.
- **Check on the built viewer**: that the sliders sit side by side in one row with their labels above
  (`sliders-side-by-side`); if they stack, it goes into X-switch.

**Not possible, and not needed**: dots at the sampling instants (the Plot draws no computed points); the teal treads'
risers mark the instants. Grid lines at the quantization levels (markers sit at fixed numbers and cannot follow N); the
amber treads show the levels.

## 13. Stand-in for the lecture

Until X12 and X-switch, the presenter drags `fs`, `N` and `trunc` on the wall window to the states on the strip (as D1·020
card 5). The room sees the drags, which carry the motion of §4b. The quantizer reads as a two-position slider. Nothing
else is lost.

## 14. Findings for the owner

No new accuracy finding on this card: 2693 (p3) and *"the nearest, or the one just below"* (p6) agree with the course's
converter (D1·080-F1, F2, applied).

- **F1 — The Rounding | Truncating switch** (**accepted**, owner 2026-10-20): `trunc` 0 rounding (the PLAN's
  q·round(v/q)), 1 truncating (the course's converter). Default rounding (the PLAN); s3 shows truncation at the Flow's
  *"the one just below"*.
- **F2 — The waveform and ranges** (**accepted**, owner 2026-10-20): 1.65 + 1.2·sin(2π·0.5 Hz·t) V on 0–3.3 V over
  0–2 s, f_s 2–40 S/s, N 2–8. **New (Proposal)**: the defaults (f_s 40, N 8) and the five states of §3b. Options:
  (a) as §3b (**recommended**: start fine, lower one slider at a time, as the Drive says); (b) start coarse (the
  preview's 8 S/s, 3 bits) and raise; (c) your values.
- **F3 — Caption and labels** (**Proposal**): the caption of §3a (the A6 label for the low resolutions) and the FR drafts.
- **F4 — What the amber curve quantizes.** The PLAN's *"its quantized version q·round(v/q)"* can be read as quantizing
  the continuous signal (steps in amplitude only) or the held value (steps in both). The options:
  - (a) the held value, as the preview you saw (**recommended**: it is what a converter delivers; N still moves only
    the amber, and the teal stays still at s2, so the independence is seen);
  - (b) the continuous signal (amplitude steps only, no sampling): independence is starker, but no converter outputs it;
  - (c) both, four curves (more than two movers at s1, B7).
- **F5 — Proposals**: the prediction aloud before s2 (+0.1 min), the teacher tip (§7d), the explore task (§7e).
- **F6 — Colour.** The preview drew the input grey; the Plot's six series colours have no grey, so the input is azure
  and dashed. The same input colour and dash are used on card 3.

**Decided 2026-10-20** (owner, in the course's chat: *"go with the recommendations"* on the brief's findings, F10–F18 and the specs' proposals): every **Proposal** in this spec and every option marked **recommended** in this §14 is taken; options marked *not recommended* are not. F5's prediction aloud before s2 adds 0.1 min: **the card is 3.9 min, all on the bench.**

## 15. Acceptance: how we know it is built right

- The plot compiles with the fields of §3a. At each state of §3b the hover readout gives the held and quantized values
  listed there (e.g. s3 at t = 0.6 s: 2.85 V held, 2.4750 V quantized; s2 at the same t: 2.8875 V).
- At s2 the teal curve is identical to s1 (only `N` moved); at s1 only the treads' width changed.
- B1 one setting per step; B2 only the variable that teaches moves; B4 five stills; B5 each `say` on the strip; B6 the
  slider and its curve move together; B7 one mover (amber linked to teal at s1); B11 each slider one axis; B13 no
  narration on the plot; B16 values at the sliders and in the readout; B17 the input dashed behind both versions; B20
  the states on the strip.
- C2 legible at 1920 × 1080 and 1024 × 768; C3 each setting at once; C4 partial until X-switch; C5 slider keys; C6 at 320
  with the sliders one per line; C8 the stills.
- E1–E6 for the plot as presented, in both themes, EN and FR.
