```yaml
id: D2-020-01-integrated-not-enough
card: "When the integrated converter is not enough"
module: notes/Day02/020-external-adcs/en.md
bench: Plot                       # exists; the PLAN's SHOW (Status: ready); the magnifier needs X-inset (missing, §12; requested in crossing 524)
library: "bridge-on-two-staircases: a Plot of a 0–5 mV bridge output on two ideal truncating quantizers, q·⌊x/q⌋: the MCU's 12-bit SAR on 3.3 V (q = 0.8057 mV, codes 0–6, teal) and the ADS1115 on ±0.256 V (q = 7.8125 µV, 640 steps, amber), the input dashed; then a magnifier on the bottom 60 µV (the ADS1115's 7 steps, the MCU still at code 0); defined in the card's `plot` blocks"
dimensions: 2D
stand_in: "three showings of one plot, each its own slide (A: the MCU alone; B: both staircases, the PGA slider in Study; C: the bottom 60 µV, magnified 83×), the card's Flow in four fences with no word changed (F-c1-1 (a), applied in en.md); until X-inset and X10 (crossing 524, F-c1-3 (a)) let one block carry all three states with the magnifier as an inset (§12)"
optional_benches: []
real_thing: "a strain-gauge bridge's few millivolts (D1·030's pressure chain) offered to two converters: the course's MCU converter (12 bits, 3.3 V reference, truncating) and a TI ADS1115 on its ±0.256 V range (SBAS444E, Table 7-1: LSB 7.8125 µV); ideal quantizers, step size only"
minutes: 1.3                      # on the bench: showings A, B and C, from p3 to the card's end (§2)
card_minutes: 2.0                 # the whole card: the statement slide (p1–p2) and the three showings (§2)
status: spec-ready                # D2·020-F2, D1, D2 applied; F-c1-1–F-c1-4 decided 2026-10-21 (round two: all recommended (a)) and applied; nothing open (crossing 524 unanswered does not block)
learner_action: none              # card 1 has no ASK
predictions: []
seeds: []
key_variable: "the step size q of each converter against the same 5 mV: 0.8057 mV (about six codes) against 7.8125 µV (640 codes), 103 times finer"
time_scale: "none (no motion: three held plot states)"
steps: 3                          # s0 (showing A), s1 (showing B), s2 (showing C)
```

**Written 2026-10-21 (U020)** after the owner's choices on the U020 brief (*"Apply all recommendations"*, 2026-10-21):
**D2·020-F2** (applied: the PLAN's staircase is the course's truncating q·⌊x/q⌋, *"D1·080 drew q·round(x/q)"*), **D1** (the
ADS1115 named: an exception to real-but-unbranded for this module, no logos, no vendor images) and **D2** (datasheet values
are ours, cited to SBAS444E). The brief page's `draw1` (`bench-work/previews/u020-preview.html`) is the approved visual: the
MCU staircase alone, then the ADS1115's drawn over it, then a magnifier on the bottom 60 µV labelled *"MCU still at code 0"*,
with the note *"The MCU can't take the bridge's two outputs as a difference. The card says so in its last line, and the plot
shows only step size."* Two corrections of ours to that drawing are named in §3c and the six-gate report (the inset moved off
the staircases; its frame in neutral ink). Everything beyond the PLAN was put as a proposal in §14 (round two); the owner
decided every item at its recommended (a) on 2026-10-21 (*"Apply all recommended (a)"*), and the body below states the
decided design.

**The Plot Bench, as read in source on 2026-10-21** (read-only, `C:\ExSightory\src\insight\packages\`), with what
`D2-010-07-choosing-the-pull-up.md` and `D1-080-03-quantization-floor.md` already found:

- **The block** (`insight-core/src/registry/plotBlock.ts`): `title`, `caption`, `variable`, `xLabel`, `yLabel`, `domain`,
  `range`, `parameters`, `curves` (`expression`, `label`, `colour` from teal · amber · violet · rose · azure · lime,
  `dashed`, `fill`), `series`, `markers`, `readout`, `fixedView`, `aspect`. **One y axis, one domain. No inset, no second
  band, no curve hidden until a step.** `livePush: false`: the wall shows the block at its authored defaults.
- **The sampling** (`canvas/src/PlotViewer.vue`, `plotModel.ts`): the viewBox is 720 units wide, the plot area
  720 − 58 − 18 = **644 units**, and every curve is sampled at **644 / 1.5 = 429 points** across the visible domain and
  joined (`sampleCurve`), whatever the screen. A jump is drawn across one sample interval (a riser leans by 1.5 units), and a
  step narrower than about 8 samples is not drawn as a step (D1·080 card 3's measure).
- **Ticks** (`niceTicks`): x to about 8 ticks, y to about 6, at 1, 2 or 5 × a power of ten.
- **Expressions** (`insight-core/src/expr/evaluate.ts`): `floor`, `min`, `max`, `step(a, b)` = 1 when b ≥ a.
- **Cards** (`registry/cards.ts`): `plot` is `stage: 'lead'`; a lead block that does not follow the heading directly opens
  its own slide; a Flow fence attaches to the block before it (`registry/flow.ts`); identical blocks get distinct ids by
  occurrence (`compiler/blockId.ts`).

So the PLAN's three moves (*"the MCU staircase first, then the second curve, then a magnifier"*) cannot be one block on the
wall today: the second curve cannot wait for a step, and the magnifier needs a second domain inside the frame. **Can the
Plot draw a 640-step staircase? Yes and no**: it draws `q·⌊x/q⌋` correctly, but at 429 samples across 5 mV it has
**0.67 samples per ADS1115 step**, so the 640 steps are drawn as a line that wanders within one step (7.8 µV, 0.54 units)
under the input. That is honest at this scale, because each real step is 1.01 units wide and 0.54 units tall: finer than the
screen. It is the PLAN's point (a straight line that is really a staircase), and the magnifier is what shows it. **Can it
draw a magnifier inset? No** (§12): the stand-in is a third showing of the same plot over 0–60 µV, on its own slide.

## 1. What the room must understand

- **Statement** (verbatim): *An external ADC earns its place when the microcontroller's built-in converter is not sufficient:
  when we need higher resolution, differential measurement, or precision-oriented sensor measurement.*
- **The PLAN's SHOW, Drive and Status** (verbatim): *Plot — the quantizer staircase q·⌊x/q⌋ (the course's truncating
  converter; D1·080 drew q·round(x/q)) over a 0–5 mV ramp (a bridge output), twice: q = 3.3 V/4096 ≈ 0.81 mV (the MCU's
  12-bit SAR) and q = 0.256 V/32768 ≈ 7.8 µV (the ADS1115 at ±0.256 V). Drive: the MCU staircase first, then the second
  curve, then a magnifier on the bottom 60 µV.* · *Status: ready*
- **Look for** (verbatim): *about six steps across the whole signal against about 640.*
- **The module's note** (verbatim, after the PLAN): *Say plainly: neither part in this module has a simulation model. It is a
  datasheet-reading exercise and a design decision, not a demo.* The plot is therefore labelled as ideal quantizers at each
  part's step size, **not a model of either part** (§3a caption, A6).
- **ASK**: none (card 1 has no activity). **FAULT**: none in the PLAN.
- **Bench and library.** The **bench** is the Plot Bench (viewer, legend, readout). The **library** is this card's plot,
  `bridge-on-two-staircases`, in three showings until X-inset and X10 (§12, crossing 524).
- **Insight**: *the same 5 mV is about six codes to the MCU's converter and 640 to the ADS1115 on ±0.256 V, because the step
  is the range over the number of codes: 3.3 V over 4,096 against 0.512 V over 65,536, a step 103 times finer.*
- **Kind of knowledge**: *a contrast between two states* (one signal, two quantizers) and *a picture built up* (MCU, then
  ADS1115, then the close-up). Card test → **Plot** (the PLAN). B17 applies (both staircases over one input, on one pair of
  axes); B15, B18, B19 do not. B18's framings apply in 2D as the magnifier (a named close-up).
- **Why this bench, not a still**: a still would serve the wall (nothing moves); the plot is the PLAN's and keeps the readout
  live in Study (any input, both levels), and the same block returns on card 3.
- **Key variable**: the step size q against a fixed 5 mV (one staircase, then the other, then the close-up).

## 2. Time

The card's Flow is **231 words** (`en.md`, 2026-10-21, counted as the brief counts: whitespace tokens, cue markers removed,
`*()` stripped, tokens with a letter or digit): p1 *"In the last module…"* 34, p2 *"An ADC does not have to be a separate
component…"* 60, p3 *"Here is a signal from yesterday…"* 51, p4 *"The ADS1115, on its most sensitive range…"* 35, p5 *"I want to
say something plainly…"* 51. No activity; all of it is spoken. 231 ÷ 130 = 1.78 min. The four fences (F-c1-1 (a), applied in `en.md`)
change no word.

| Beat | Minutes | Source of the number |
|---|---|---|
| The statement slide, fence 1: p1 (34), p2 (60), before the bench | 0.72 | 94 ÷ 130 |
| s0 showing A opens (≈ 2 s), fence 2: p3 *"Here is a signal from yesterday…"* (51) | 0.43 | 51 ÷ 130 + 2 s |
| s1 showing B opens (≈ 2 s), fence 3: p4 *"The ADS1115, on its most sensitive range…"* (35) | 0.30 | 35 ÷ 130 + 2 s |
| s2 showing C opens (≈ 2 s); the presenter's unscripted line (≈ 20 words, estimate: *"The bottom 60 µV, magnified 83 times: the ADS1115's line is a staircase too, and the MCU has not left code 0."*) | 0.19 | 20 ÷ 130 + 2 s, estimate |
| s2 held, fence 4: p5 *"I want to say something plainly…"* (51) | 0.39 | 51 ÷ 130 |
| **Card total / of which on the bench** | **2.0 / 1.3** | 2.03 / 1.31 |

p5 is spoken over the held magnifier (B13); it is the module's no-simulation note, which the caption backs (§1).

**Module check** (D2·020 `targetMinutes: 30`, 12:30–13:00 GMT): the Flow is **2,045 words = 15.7 min** (cards 231, 414,
45, 278, 396, 331, 350); the U020 brief estimated **≈ 29–30 of 30 min** with the activities (poe, flash and numerics
≈ 1 min each, the poll 1.5, the checkpoint 3) and ≈ 3 min of bench moves, mostly over speech. This card adds ≈ 0.25 min
beyond its Flow (three slide changes and one unscripted line): inside that estimate. Reported only; nothing trimmed.

## 3. The scene: what is on the bench

### 3a. The plot (`bridge-on-two-staircases`): the target, one block in three states

On the target (X10 and X-inset, §12) one block carries the card: state s0 the MCU staircase; s1 the ADS1115's revealed over
it; s2 the magnifier inset revealed in the plot's empty lower right. Until then the same fields are written as three showings
(§3b).

| Field | Content | Source |
|---|---|---|
| `title` | *When the integrated converter is not enough* · FR *Quand le convertisseur intégré ne suffit pas* | the card's heading |
| `caption` (decided, F-c1-2 (a)) | *The same 0–5 mV from a strain-gauge bridge, offered to two converters. Each staircase is an ideal quantizer at that part's step, drawn truncating as the course's converter: step size only, not a model of either part. Noise, offset and gain error are not drawn, and the microcontroller's single-ended input could not take the bridge's difference without an in-amp in front (D1·060).* · FR *Les mêmes 0–5 mV d'un pont de jauges, présentés à deux convertisseurs. Chaque escalier est un quantificateur idéal au pas de ce composant, tracé par troncature comme le convertisseur du cours : la taille du pas seulement, pas un modèle de l'un ou l'autre composant. Le bruit, le décalage et l'erreur de gain ne sont pas tracés, et l'entrée asymétrique du microcontrôleur ne pourrait pas prendre la différence du pont sans amplificateur d'instrumentation en amont (D1·060).* | the PLAN; the module's no-simulation note; the brief's note (the MCU cannot take the difference); A6 labels |
| `variable` | `x`, the bridge output in **mV** (µV on showing C) | the PLAN's 0–5 mV ramp |
| `xLabel` | *Bridge output, the converter's input (mV)* · FR *Sortie du pont, entrée du convertisseur (mV)* | `draw1` |
| `yLabel` | *Level given: code × step (mV)* · FR *Niveau attribué : code × pas (mV)* | `draw1`'s *code × step*; D1·080 card 3's *Level given* |
| `domain` / `range` | [0, 5] / [0, 5] (ticks 0, 1 … 5 on both) | the PLAN; `niceTicks` gives step 1 on both |
| `readout` | on (Study: x and each curve at the hover, 3 decimals) | the Plot's default |
| `fixedView` | true (the framing is the point; the magnifier is the close-up) | as D2·010 card 7 |
| `aspect` | `fill` (the Canvas pane) | `PlotViewer.vue`: *"fill is the one the Canvas wants"* |
| `parameters` (decided, F-c1-4 (a); showing B only) | `g` *ADS1115 range (PGA): 0 = ±6.144 V … 5 = ±0.256 V* · FR *Gamme de l'ADS1115 (PGA) : 0 = ±6.144 V … 5 = ±0.256 V*, 0–5, default **5**, step 1, no unit | SBAS444E §7.3.3, Table 7-1 |

**Curves** (x in mV; the step q in mV; `+ 1e-9` makes an input exactly on a transition take the upper code, the guard D1·090
card 5 uses until X-exact-floor, crossing 512 item 1):

| id | Expression | Label (EN · FR) | Colour, line |
|---|---|---|---|
| `input` | `x` | *The bridge output itself* · *La sortie du pont elle-même* | azure, `dashed` (D1·080 card 3's input) |
| `mcu` | `(3300/4096)*floor(x/(3300/4096) + 1e-9)` | *MCU, 12 bits on 3.3 V: 0.806 mV steps* · *MCU, 12 bits sur 3.3 V : pas de 0.806 mV* | teal, solid |
| `ads` (s1 on) | `q_g*floor(x/q_g + 1e-9)`, q_g = `(6144*(1 - step(1, g)) + 8192/2^g*step(1, g))/32768`, spelled out in full (F-c1-4 (a)); at the default g = 5 it is `(256/32768)*floor(x/(256/32768) + 1e-9)` | *ADS1115: one step is its range ÷ 32,768 (at the default ±0.256 V, 7.81 µV, too fine to see at this scale)* · *ADS1115 : un pas vaut sa gamme ÷ 32 768 (à ±0.256 V par défaut, 7.81 µV, trop fin pour être vu à cette échelle)* | amber, solid |

- 3300/4096 = 0.8056640625 mV and 256/32768 = 0.0078125 mV are both exact in binary, so the steps are exact.
- q_g gives 6144, 4096, 2048, 1024, 512, 256 mV over 32,768 for g = 0 … 5 (§8): the six ranges of Table 7-1 and no other.
- Within 0–5 mV no top code is reached (MCU code 6 of 4,095; ADS1115 code 640 of 32,767), so no clamp is needed (A3).

### 3b. The three showings (the stand-in for X10 and X-inset)

| Showing | Slide, fence | Curves | Domain / range | Parameters | What it is |
|---|---|---|---|---|---|
| **A** `mcu-only` | its own slide after the statement, fence 2 (p3) | `input`, `mcu` | [0, 5] / [0, 5] mV | none | the MCU's seven treads, codes 0–6, under the dashed input |
| **B** `both` | its own slide, fence 3 (p4) | `input`, `mcu`, `ads` | [0, 5] / [0, 5] mV | `g` (F-c1-4 (a)) | the ADS1115's 640 steps lying on the input, the MCU's treads beside them |
| **C** `magnified` | its own slide, fence 4 (p5) | the same three in µV: `input` `x`; `mcu` `(3300000/4096)*floor(x/(3300000/4096) + 1e-9)`; `ads` `7.8125*floor(x/7.8125 + 1e-9)` | [0, 60] / [0, 60] µV (ticks 0, 10 … 60) | none | the ADS1115's eight treads (codes 0–7); the MCU flat at code 0 |

Showing C's `title` *The bottom 60 µV, magnified 83 times* · FR *Les 60 µV du bas, grossis 83 fois*; `xLabel` *Bridge
output (µV)* · FR *Sortie du pont (µV)*; `yLabel` *Level given: code × step (µV)* · FR *Niveau attribué : code × pas (µV)*;
`mcu` label *MCU: still at code 0 (its first step is at 805.7 µV)* · FR *MCU : toujours au code 0 (son premier pas est à
805.7 µV)*; `ads` label *ADS1115, ±0.256 V: 7.8125 µV steps* · FR *ADS1115, ±0.256 V : pas de 7.8125 µV*; the caption's first
sentence replaced by *The first 60 µV of the plot before, both axes magnified 83 times.* · FR *Les 60 premiers µV du graphique
précédent, les deux axes grossis 83 fois.* (the rest as §3a). The three blocks share everything else.

### 3c. The magnifier on the target (X-inset)

| Item | Content |
|---|---|
| Region marked on the main plot | the square 0–60 µV × 0–60 µV at the origin (7.7 × 4.1 units), outlined in neutral ink, a thin leader to the inset |
| The inset | data box **x 2.9–4.9 mV, y 0.25–2.05 mV** of the main plot (257.6 × 123.8 units; fractions [0.58, 0.05, 0.40, 0.36]); its own axes 0–60 µV with ticks 0, 20, 40, 60 µV; the same three curves resampled over 0–60 µV; title *Bottom 60 µV, magnified 83 ×* · FR *Les 60 µV du bas, grossis 83 ×*; the MCU's tread labelled *still at code 0* · FR *toujours au code 0* |
| Why there (our fix to `draw1`, decided F-c1-2 (a)) | the brief's inset sat at x 2.76–4.29 mV, y 1.82–4.68 mV, **over** both staircases (the input crosses that box from 2.76 to 4.29 mV, and two MCU risers, 3.22 and 4.03 mV, were hidden). The lower-right box is empty: the MCU's lowest tread there is 2.417 mV, 0.367 mV (25 units) above the inset's top; nothing is drawn over a curve |
| Frame ink (our fix, decided F-c1-2 (a)) | neutral ink, not amber: amber is the external converter's colour in this module (gate 5) |

- **Meet the parts** (B3): s0 names the input (dashed) and the MCU staircase in the legend; s1 adds the ADS1115; s2 the
  close-up. Each arrives with the Flow that names it.
- **Values beside their element** (B14, B16): the step sizes in the legend labels; the axes in mV (µV on C); in Study the
  hover readout. *About six* and *about 640* are **spoken** (p3, p4), not written on the plot (B13); the counts are read off
  the treads (A) and the legend (B).
- **Colours and their second channel** (C4): the MCU teal, the ADS1115 amber (the brief's palette, gate 5), each named in the
  legend with its step; the input azure **dashed**; on C the MCU's flat tread also carries its label.
- **Key views** (B18, 2D): *Home* (0–5 mV) and *Bottom 60 µV* (the magnifier).

## 4. The run: step by step, as the Flow goes

### 4a. Steps

The order in `en.md` (F-c1-1 (a)): the statement, **fence 1** (p1–p2, the statement slide), showing A, **fence 2** (p3),
showing B, **fence 3** (p4), showing C, **fence 4** (p5).

| # | id | Flow fence and paragraph (first words) | What changes (`say`) | Setting | Presenter's control |
|---|---|---|---|---|---|
| — | the statement slide | **fence 1**: p1 *"In the last module the code left the converter…"*, p2 *"An ADC does not have to be a separate component…"* | — | — | (the card opens) |
| 0 | `s0-mcu` | **fence 2**: p3 *"Here is a signal from yesterday that makes the point…"* | 5 mV on the MCU's converter: steps of 0.806 mV, codes 0 to 6, about six. | showing A | Next |
| 1 | `s1-ads1115` | **fence 3**: p4 *"The ADS1115, on its most sensitive range, ±0.256 V…"* | The ADS1115 on ±0.256 V: steps of 7.8 µV, 640 across the same 5 mV, so fine they lie on the input. | showing B | Next |
| 2 | `s2-magnified` | the presenter's line; **fence 4**: p5 *"I want to say something plainly…"* held | The bottom 60 µV: the ADS1115 takes seven steps, and the MCU has not left code 0. | showing C | Next leads to card 2 |

Suggested words for the strip (B20): s0 *"Count the treads: seven levels, six steps, for the whole signal."*; s1 *"The amber
staircase is there: its steps are a hundred times smaller than the teal ones."*; s2 the unscripted line of §2.

### 4b. Motion, cues and stills

| # | Motion | Movers | Cue and its second channel | Hold | Reduced motion (C3) | Still |
|---|---|---|---|---|---|---|
| 0 | none (the slide appears) | 0 | the teal treads under the dashed input, named in the legend | hold | same | s0 |
| 1 | none (the slide appears; on the target the amber curve fades in, ≈ 0.3 s) | 0 (1 on the target) | the amber curve on the input; its legend entry with *7.81 µV steps* | hold | at once | s1 |
| 2 | none (the slide appears; on the target the inset fades in) | 0 (1 on the target) | the eight amber treads against the flat teal one, each labelled | hold | at once | s2 |

Three stills. No `animate`.

## 5. Pacing and interaction, by surface and view

**Who paces** (B12): on the wall the presenter (Next between the showings; each at its defaults). In Study Mode and Scope,
the learner.

| View | Who | Controls |
|---|---|---|
| Preview (in the slide) | everyone | the plot of the current showing |
| View (details) | everyone | the hover readout; on B the range slider *ADS1115 range (PGA)* (F-c1-4 (a)), its words above, the value at its right (`sliders-side-by-side`, one row) |
| Edit (session only) | everyone | not specified for the Plot Bench |
| Authoring | authors | the three `plot` blocks' YAML |

- **The presenter's strip** (B20): each step's `say`, the suggested words, the teacher tip (§7d); keys Next / Back.
- **Study / Scope**: the readout on all three showings; on B the PGA slider (§7e).
- **Phone** (C6): the plot full width, the legend under it (the long labels wrap), the slider under the legend on B.
- **Locked**: nothing.

## 6. The frame

The Plot's viewer frame (the Canvas header and footer, D4.10–4.12): title, legend, readout. No dock, no panels.

| Tile / panel | Used? | Selected item | List / contents |
|---|---|---|---|
| Legend | yes | — | A: input, MCU · B: input, MCU, ADS1115 · C: the same three, µV labels |
| Slider | B only (F-c1-4 (a)) | the range index with its words | one |
| Readout | yes (hover, Study) | x and each curve | — |
| Inset | the target only (X-inset) | — | §3c |

## 7. Thinking, not watching

- **7a. The PLAN's ASK**: none on this card. Card 3's flash (*"Which of the three would you reach for?"*) is this card's check,
  over a copy of showing B, its PGA slider and the ADS1115's default-naming label included (F-c1-4 (a);
  `D2-020-03-what-does-my-signal-require.md`).
- **7b. Prediction points**: none added (the card is the module's opening; card 2 opens with a poe).
- **7c. After**: none on the wall. In Study, done means the three showings viewed.
- **7d. Teacher tip** (decided, F-c1-2 (a)), presenter only: *Expect "640 codes, so 640 trustworthy levels". On ±0.256 V
  the ADS1115's noise is about one count RMS at every data rate (SBAS444E Table 6-1, 7.81 µV), and peak to peak from 7.81 µV
  at 8 SPS (about 640 distinguishable levels across 5 mV) to 35.83 µV at 860 SPS (4.6 counts: about 140): card 5 reads that
  table. Expect "the MCU just needs more bits": the step is the range over the codes, so the reference matters as much; the
  ATmega328P on its internal 1.1 V reference has 1.07 mV steps, 4.7 codes across 5 mV. Expect "the MCU can read the bridge
  directly": each output of a balanced bridge sits near half its excitation (about 1.65 V on 3.3 V), so a single-ended input
  reads one side near code 2048, not the 5 mV between them; D1·060's in-amp, or a differential input like the ADS1115's
  AIN0–AIN1, takes the difference.*
- **7e. Explore** (B11; decided, F-c1-4 (a)): in Study, on showing B, the range slider from ±6.144 V to ±0.256 V: *How many
  codes does 5 mV span on each range?* (26.7, 40, 80, 160, 320, 640: §8).

## 8. Faithfulness (the quality bar)

**Arithmetic** (Node, 2026-10-21):
- MCU: q = 3.3 V / 4096 = **0.8056640625 mV** (p3 *"about 0.8 mV"* ✓; the PLAN's *"≈ 0.81 mV"* ✓). 5 / 0.80566 = **6.206**:
  transitions at 0.8057, 1.6113, 2.4170, 3.2227, 4.0283, 4.8340 mV, so **six steps, codes 0–6** inside 5 mV (p3 *"about six
  codes"* ✓, the Look for ✓; rounding would give the same count, D2·020-F2). Level at 5 mV: 6 × 0.80566 = 4.834 mV.
- ADS1115: q = 0.256 V / 32768 = 0.512 V / 65536 = **7.8125 µV** (SBAS444E §7.3.3, Eq. 4, Table 7-1 ✓; p4 *"about 7.8 µV"*
  ✓). 5 mV / 7.8125 µV = **640 exactly**: 640 transitions, the last at exactly 5.000 mV, where the code is 640 (Table 7-3:
  ideal code k at k·LSB) (p4 *"about 640 codes"* ✓). Step ratio 0.80566 / 0.0078125 = **103.1**.
- The magnifier: 60 µV / 7.8125 µV = 7.68: transitions at 7.8125, 15.625, 23.4375, 31.25, 39.0625, 46.875, 54.6875 µV:
  **seven steps, codes 0–7**; the MCU's first transition is at 805.66 µV, so 60 µV is 7.4 % of its first step: **code 0
  throughout** ✓ (`draw1`'s label). Magnification 5 mV / 60 µV = **83.3** (both axes).
- The PGA (F-c1-4 (a)): q_g = 187.5, 125, 62.5, 31.25, 15.625, 7.8125 µV for g = 0 … 5 (Table 7-1 ✓); 5 mV spans **26.7, 40,
  80, 160, 320, 640** codes.
- The tip: 1.1 V / 1024 = 1.074 mV, 5 / 1.074 = 4.65 codes; noise pp 7.81 / 7.8125 = 1.00 count (5000 / 7.81 = 640
  levels), 35.83 / 7.8125 = 4.59 counts (5000 / 35.83 = 140 levels) (Table 6-1 ✓, the brief's values).
- **Sampling and pixels** (429 samples, 644 × 344 units at the default height): MCU **69 samples a step** (a step); riser
  lean one sample interval, 5/428 mV = 11.7 µV = **1.5 units** (reads vertical; exact with X-steps); ADS1115 **0.67 samples a
  step**, each real step 1.01 × 0.54 units (finer than the screen: drawn as the input, within 0.54 units); showing C
  **55.9 samples a step** (a staircase); the target's inset over its 257.6 units: 0.4 × 429 = 172 samples, 22 a step.
- Hover values (one worked value each): A and B at x = 4.000 mV: `mcu` **3.223** (code 4), `ads` **4.000** (code 512),
  `input` 4.000; C at x = 50 µV: `ads` **46.875** (code 6), `mcu` **0.000**.

**Section D, Plot rows**
- [x] The expression is the physics: the ideal uniform quantizer q·⌊x/q⌋, the course's model (`course-accuracy.md` §3) for
  the MCU, and the ADS1115's ideal codes (Table 7-3, *"excludes the effects of noise, INL, offset, and gain errors"*), drawn
  truncating; the caption says so.
- [x] Axis ranges real: 0–5 mV is p3's *"5 mV of signal"*, inside a strain-gauge bridge's *"few millivolts"* (D1·030's
  pressure chain; a 2 mV/V bridge on 3.3 V gives 6.6 mV at full load); the slider's six ranges are Table 7-1's.
- [x] One worked value: above.
- [ ] No artefacts: the MCU staircase is a staircase (69 samples a step, risers 1.5 units off vertical); **the ADS1115's
  640 steps are finer than the screen** and are drawn as their envelope, which the legend label says (*"too fine to see at
  this scale"*) and showing C shows close up. Exact risers and a drawn envelope need X-steps (§12).

**A1–A8** (on the owner's current text and this spec): A1 ✓ (every number above). A2 ✓: the course's truncating model for
both (D2·020-F2, applied); noise, offset, gain error and the single-ended input stated on the bench (caption) and sized in
the tip, not drawn (an effect drawn on 60 µV would be the ADS1115's noise at one count, which is card 5's). A3 ✓: 0 V gives
code 0 on both; 5.000 mV is exactly code 640 (the guard keeps it there); no full-scale clamp reached. A4 ✓: *"a signal from
yesterday"* is D1·030's strain gauge and bridge (*"a bridge gives a voltage"*, its PLAN); *"yesterday's in-amp"* is D1·060's
*Differential gain*; the MCU model is Day 1's; card 3 reuses B and card 5's PGA ranges are §8's. A5 ✓: p4 *"it can read the
bridge's two outputs directly as a difference"* — AIN0–AIN1 is the default MUX pair (Config register, MUX[2:0] = 000b), VIN =
V(AINP) − V(AINN) (§5.3, Table 7-3), and the bridge's ≈ 1.65 V common mode on a 3.3 V supply is inside the inputs' absolute
range, GND to VDD (§5.3; Table 7-1's note: *"Do not apply more than VDD + 0.3V"*); the MCU cannot (the caption, the tip). A6 ✓: *"about six"*, *"about 640"*,
*"about 0.8 mV"*, *"about 7.8 µV"*; p3's *"barely a measurement at all"* is a judgement on six codes, fair. A7 ✓: SBAS444E (December 2024)
§5.3, §5.5, §7.3.3 Table 7-1, §7.5.4 Table 7-3, Table 6-1; the course's model. A8 ✓. **No accuracy finding on this card.**

**Simplifications and their on-bench labels** (A6): the caption's *"an ideal quantizer at that part's step, drawn truncating
as the course's converter: step size only, not a model of either part. Noise, offset and gain error are not drawn…"*; the
ADS1115's label *"too fine to see at this scale"*; showing C's *"both axes magnified 83 times"*.

## 9. Faults and non-ideal behaviour

**PLAN FAULT**: none. Non-ideal behaviour, stated and not drawn (A2): the ADS1115's noise (one count RMS on ±0.256 V at every
rate, 1 to 4.6 counts peak to peak from 8 to 860 SPS, Table 6-1), its offset (±1 LSB typical, ±3 maximum, differential, at
±2.048 V, §5.5; *"the ADS111x can still output negative codes"* near 0 V, the note to Figure 7-12), which would blur showing
C's bottom treads; the MCU's own noise and offset (Day 1's). Drawing them is card 5's and D2·030's business; here the card
compares steps.

## 10. Accessibility, legibility and print

- Wall (C2): axis labels, the tick labels 0–5 (0–60 on C), the legend's three entries (the longest, the ADS1115's, wraps in
  the legend, EN and FR), the slider row on B. Check at 1920 × 1080 and 1024 × 768 that the legend clears the plot area and
  that C's eight treads read apart (each 80 units wide, 45 units tall).
- Reduced motion (C3): nothing animates; each showing is a slide.
- Colour (C4): teal against amber under deuteranopia and protanopia, with the legend's words and the input's dash; on C the
  flat MCU tread is also named.
- Keyboard (C5): Next / Back; on B the slider's arrow keys (one range a press).
- Print (C8): s0, s1, s2 with their `say` and the caption.
- Languages: every label and caption `{en, fr}`; the FR drafts are ours for the owner's review; numbers and units are not
  translated.

## 11. Assets to make or source

| Asset | Format | Made by | Status |
|---|---|---|---|
| The three `plot` blocks (§3a, §3b), EN and FR | YAML in `en.md` | the author (FR drafts for the owner's review) | to write (the fences are already split, F-c1-1 (a), in `en.md`) |

No image, no datasheet extract on this card (D2: the extracts are card 5's).

## 12. Bench capabilities this needs

**Plot Bench, exists**: `variable`, `domain`, `range`, `curves` with `floor` and `step`, `dashed`, a `parameters` slider
with `step` 1, `readout`, `fixedView`, `aspect: fill`, `caption`.

**To confirm when written**: (a) that a fence after the statement is the statement slide's teleprompter and that each of the
three plot blocks opens its own slide with the fence after it (as D2·010 card 7's five fences); (b) that a curve may hold
the parameter-free expression `x` with no warning (it uses x ✓).

**Missing (requested: one crossing to Benches, 524, this card as the case; F-c1-3 (a))**:
- **X-inset** (new; working name until Benches numbers it): a magnifier in a plot: an `insets` entry with its own domain and
  range (here 0–60 µV on both axes, with a unit scale so its ticks read in µV), its place in the frame (§3c: the empty
  lower right), the region outlined on the main plot with a leader, the block's curves resampled over the inset's domain,
  its own title, hover readout in the inset's own units; part of the block (defaults on the wall, live in Study). **Not
  X-band** (D1·080 card 3's proposal): a band shares the main plot's x, and a magnifier has its own.
- **X10** (listed in `requests-to-exsight.md`, *to raise*; its extension to insets raised in 524), extended: a curve
  **and an inset** hidden until a step, the step mirrored, so s0 → s1 → s2 is one block on one slide (fences unsplit).
- **X-steps** (proposed in D1·080 card 3, raised in 524): a curve built on `floor` sampled at its jumps (exact risers), and
  where its steps are finer than the screen an envelope with a label. Here: the MCU's risers vertical; the ADS1115's 640
  steps drawn as an envelope labelled by the bench rather than by our legend words.

**Would help**: X12 (presets mirrored, listed): the PGA slider's ranges as presets on the wall.

**Considered and not proposed**: an inset faked from curves mapped into a corner of the main plot. It would draw, but with
no axes of its own, and the hover readout would print the mapped values as mV of the main plot: a number the room could
misread. A course cannot misinform, so the stand-in is a third showing.

**Not this bench's**: the bridge itself (D1·030's Draw drawing); the noise table (card 5's Figure).

## 13. Stand-in for the lecture

**Three showings of one plot** (§3b), each its own slide, the fence split in four (F-c1-1 (a)), no word changed. It shows
every step of §4a; it loses (1) the magnifier **beside** the full view (C is a separate slide, so the room does not see the
60 µV region on the 0–5 mV axes; C's title and caption say which part it is), (2) the build-up on one picture (three slides,
the same axes on A and B so the eye compares them), (3) exact risers (1.5 units of lean) and a drawn envelope for the 640
steps (the legend's words say it). Checks lost: B17 partly for the magnifier (not side by side). What the Flow might say
differently: nothing; the presenter's line at s2 already names the 60 µV. Crossing 524 asks Benches for X-inset, X10
extended and X-steps (F-c1-3 (a)); the request never blocks, and the three showings stand in until it is answered. When
X-inset and X10 land, showing B with the inset and two steps replaces the three blocks, and the fences may be joined again;
the curves are the same, so nothing is made twice.

## 14. Findings for the owner

No **accuracy** finding on this card (§8; re-run 2026-10-21 on the current `en.md`, its four fences included: the Flow
231 words, 34 · 60 · 51 · 35 · 51, no word changed; every quote in this spec verbatim; no number changed by round two).

The proposals of this spec, **all decided 2026-10-21 in round two** (owner: *"Apply all recommended (a)"*) and applied
(each kept as it was put; the decision marked):

- **F-c1-1 — The PLAN's three moves as three slides, the fence split** (no word changed). **Decided: (a)** (the four
  fences applied in `en.md`; showings A, B, C as written). The Plot shows a block at its
  defaults and cannot hold a curve back for a step, and a Flow fence belongs to the block before it. Options: (a) fence 1
  p1–p2 on the statement slide, then showing A with p3 (*"Here is a signal…"* as it opens), B with p4, C with p5
  (**recommended**: each curve arrives as the Flow names it); (b) showing A on the statement slide with p1–p3, then B (p4)
  and C (p5): one slide fewer, the staircase up before it is introduced; (c) one showing with both staircases and C after
  it (two plot slides): loses *"the MCU staircase first"*.
- **F-c1-2 — The caption, the labels and the teacher tip** (§3a, §3b, §7d), and **our two fixes to `draw1`**: the inset in
  the empty lower right instead of over the staircases, its frame in neutral ink instead of amber (§3c). **Decided: (a).**
  Options: (a) all as
  written (**recommended**: the caption carries the A6 labels and the brief's *"step size only"* note, the module's
  no-simulation note is backed on the plot); (b) the caption's first two sentences only (the single-ended limit then rests on
  the Flow and the tip); (c) the fixes only.
- **F-c1-3 — One crossing to Benches** for X-inset (new), X10 extended to insets, and X-steps (§12), with this card as the
  case. **Decided: (a)**: raised as crossing **524** (`524-pbl2026-to-benches-…`). Options: (a) raise it now, the three
  showings standing in (**recommended**: the stand-in is honest, and the request never blocks); (b) X-inset only; (c) none
  (the three showings stay).
- **F-c1-4 — A range slider on showing B for Study** (B11): *ADS1115 range (PGA)*, the six ranges of Table 7-1 by index,
  default ±0.256 V, so a learner sees 27 → 640 codes across the same 5 mV (card 5's PGA). **Decided: (a)** (the ADS1115's
  label names the default; card 3's copy of B carries the slider and the label). Options: (a) as written
  (**recommended**: the key variable one control away, and only real ranges); (b) no slider (B11 excepted: the step is shown
  by the two staircases and spoken). With (a) the ADS1115's label names the default (*"±0.256 V at the default"*) so it stays
  true when the slider moves; card 3's copy of B carries it too.
- **Time** (reported only): the card **2.0 min** (1.3 on the bench), unchanged by round two; the module ≈ 29–30 of 30 by
  the brief's estimate. Nothing is cut.

**Decided 2026-10-21, round two (owner: *"Apply all recommended (a)"*):** F-c1-1 (a) four fences, showings A, B, C;
F-c1-2 (a) the caption, the labels, the teacher tip and the two fixes to `draw1`; F-c1-3 (a) one crossing to Benches, 524,
for X-inset, X10 extended to insets and X-steps, this card as the case; F-c1-4 (a) the PGA slider on showing B in Study,
the ADS1115's label naming the default, card 3's copy of B carrying both. Applied in the header, §2, §3, §5, §6, §7, §8,
§11, §12, §13 and §15. Nothing open.

## 15. Acceptance: how we know it is built right

- The three blocks compile (no warning). On A and B at the hover x = 4.000 mV: `mcu` 3.223, `input` 4.000; on B `ads`
  4.000 (code 512), and at x = 5.000 `ads` 5.000 (code 640). On C at x = 50 µV: `ads` 46.875, `mcu` 0.000. A shows seven
  teal treads with six risers at 0.806, 1.611, 2.417, 3.223, 4.028, 4.834 mV; C shows eight amber treads with risers every
  7.8125 µV and a flat teal tread.
- The PGA slider (F-c1-4 (a)): at 0 … 5 it gives `ads` steps of 187.5 … 7.8125 µV (readout at x = 5: 4.875, 5.000, 5.000,
  5.000, 5.000, 5.000 mV).
- The statement slide carries fence 1; A, B, C each open their own slide with fences 2, 3, 4 (F-c1-1 (a)).
- B1 one change per slide; B2 only the curve that teaches is added; B3 parts named in the legend as they arrive; B4 three
  stills; B5 each `say` on the strip; B11 the slider in Study (F-c1-4 (a)); B13 counts spoken, not written; B14 every curve
  labelled; B16 the readout; B17 the two staircases on one input and one pair of axes; B20 the strip's words and tip.
- C2 legible at 1920 × 1080 and 1024 × 768, EN and FR; C3 nothing animates; C4 hue, dash and words; C5 keys; C6 at 320 px;
  C8 the print form.
- D Plot rows as §8 (the envelope exception labelled).
- E1–E6 for the blocks as presented, in both themes, EN and FR. On the target (X-inset, X10): one block, the inset in the
  lower right clearing every curve, the region outlined at the origin.
- **Six gates (this spec, 2026-10-21)**: (1) realism ≥ 95 %: the course's MCU converter and the ADS1115's real ±0.256 V step
  (Table 7-1), a real bridge's few millivolts; ideal quantizers stated as such — pass. (2) science: the quantizer law, the
  ADS1115's ideal codes (Table 7-3), the differential input and its common-mode range checked; noise, offset and the
  single-ended limit stated on the bench and sized in the tip — pass. (3) maths: every step, count, transition, ratio,
  sample density and hover value recomputed in Node (§8) — pass. (4) visualization: one signal on two staircases on the same
  axes, the finer one shown to be a staircase by the close-up, the MCU flat at code 0 beside it — pass, the magnifier beside
  the full view only on the target (X-inset). (5) consistency: the brief's palette (MCU teal, ADS1115 amber), D1·080 card 3's
  dashed azure input, D2·020-F2's truncating model, card 3's copy, card 5's PGA ranges — pass; one discrepancy of ours fixed
  (`draw1`'s inset frame amber → neutral ink). (6) design: `draw1`'s inset hid part of both staircases (our error, fixed: the
  inset moved to the empty lower right, 25 units clear of the nearest tread); labels in the legend, wrapping in FR; one
  slider row — pass on paper, to check on the built blocks. Re-checked 2026-10-21 after round two (the four fences, the
  decided items): no change to any gate.
