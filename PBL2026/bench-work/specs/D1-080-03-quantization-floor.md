```yaml
id: D1-080-03-quantization-floor
card: "Quantization error is a floor"
module: notes/Day01/080-adc-conversion/en.md
bench: Plot                       # exists; the module's centrepiece (owner D1, 2026-10-20: the PLAN's Plot, specified now)
library: "quantizer-staircase: a Plot of an 8-bit (N = 4–12) quantizer over 0–10 V: the staircase with the input dashed and the band of inputs that share 8.540 V's code above; the error, level minus input, in mV with its band edges below; sliders N and a Rounding | Truncating quantizer; framings Home, Zoom and Fine; defined in the card's `plot` block"
dimensions: 2D
stand_in: "today's Plot in one band: the staircase, the input and the band's edges in volts (no error curve until X-band); the presenter drags the sliders and wheel-zooms near 8.540 V on the wall window until X12"
optional_benches: []
real_thing: "an ideal 8-bit converter over 0–10 V digitizing a weight sensor's 8.540 V (rounding, as the Flow says; truncating by the switch, as the course's MCU converter does); N = 12 is the course's resolution at another range"
minutes: 1.4                      # on the bench: from the Flow's [[demo]] to the card's end (§2)
card_minutes: 3.0
status: spec-ready
learner_action: poe
predictions: []                   # the PLAN's poe fires before the bench appears and is answered at s1
seeds: []
key_variable: "the band of inputs that share one code: its width (one LSB, set by N) and where it sits against its level (rounding or truncating)"
time_scale: "none (slider states and framings)"
steps: 5                          # s0, s1, s2a–i, s3, s4
```

The Plot's format as read for card 1 (`D1-080-01-when-and-which-level.md`, preamble): one plot has one y axis, sliders are
local to each window, markers sit at fixed numbers, the viewer samples about 429 points across the visible domain and
joins them, its wheel zooms x (and y refits when `range` is omitted), and a non-finite value is not drawn. **One bench
block per card** (EAC; `one-block-at-a-time`), so a second plot block cannot carry the zoom or the error on this card:
the target needs a second band in the same plot (X-band) and framings in the presets (X12). **This spec also holds D1·080's
time table** (§2).

**Six gates** (this spec, 2026-10-20): (1) realism: an ideal quantizer with its real top code, the course's truncation by
the switch — pass. (2) science: the quantizer law and its edges (first and last code) — pass, with F5 raised. (3) maths:
every value in §3b and §8 recomputed in Node — pass; two of the owner's figures raised as **accuracy** (F3, F4). (4)
visualization: one scale through the N sweep and a close-up for "never zero" (§4); the Plot's sampling limits named
(X-steps) — pass for the target, partial for the stand-in (§13). (5) consistency: 39.06 mV and 8 bits on 0–10 V as card 2;
the error's sign is **raised** (F3: the plot and the statement disagree today), and the preview's own mismatch is fixed
here (F10). (6) design: sliders in one row with words and symbols; band edges labelled; EN and FR drafted — pass on
paper, to be checked on the built plot.

## 1. What the room must understand

- **Statement** (verbatim): *Every voltage between two levels is reported as one of them. That error, a band one LSB
  wide (±½ LSB when the converter rounds, 0 to −1 LSB when it truncates), is built into every conversion, and no circuit
  removes it from a single conversion.*
- **SHOW (centrepiece)** (verbatim from the PLAN): *Plot — the quantizer staircase q·round(x/q) and its error sawtooth
  q·round(x/q) − x, x from 0 to 10 V, q = 10/2^N with an N slider (4 to 12), a marker at 8.540 V and ±½ LSB lines on the
  error.*
- **Drive** (verbatim): *N = 8, zoom near 8.5 V (code 219 covers about 8.535 to 8.574 V); then N from 4 to 12.*
- **Look for** (verbatim): *the sawtooth staying inside ±½ LSB at every N below full scale, shrinking, its height never
  reaching zero.*
- **Status** (verbatim): *ready.* **Note** (verbatim): *resolved 2026-10-20 (ACCURACY D1·080-F4): the Flow now says "a
  band one step wide"; the reveal gives about 8.535 to 8.574 V (ACCURACY F13).*
- **FAULT** (verbatim): *Firmware that divides by 2^N in one place and by 2^N − 1 in another: a gain error of one part in
  2^N (0.39 % at 8 bits). Truncating instead of rounding: a steady −½ LSB offset.*
- **Bench and library.** The **bench** is the Plot Bench (the viewer, sliders, legend, readout, framings). The
  **library** is this card's plot, `quantizer-staircase`.
- **Insight**: *a code does not stand for one voltage but for a band one LSB wide; more bits narrow the band, halving it
  with each bit, but no number of bits closes it.*
- **Kind of knowledge**: *a relation between quantities* (input against level, and against error) and *a contrast between
  two states* (rounding against truncating). Card test → **Plot**. B17 applies (the staircase and its error share one
  x axis, one above the other; the input dashed beside the staircase). B15, B18, B19 do not. B18's framings apply in 2D
  (Home, Zoom, Fine).
- **Why this bench, not a still**: the floor is a claim about *every* N. The room has to watch the sawtooth halve as N
  climbs and still be there at 12 bits, then watch the band slide (not shrink) when the converter truncates. Each is a
  change of one picture.
- **Key variable**: the band of inputs that share a code (width set by N, place set by the quantizer).

## 2. Time

The card's Flow is **258 words**. The `[[ask]]` question (p1, 29) is counted in the poe. The `[[demo]]` paragraph (p4, 33)
is spoken (*"I'll zoom in…"*). **229 words are spoken = 1.76 min** (counted from en.md 2026-10-20, words ÷ 130 wpm).

| Beat | Minutes | Source of the number |
|---|---|---|
| p0 *"For a digital system, we must add…"* (28), before the bench | 0.22 | 28 ÷ 130 |
| The PLAN's poe: p1 the question, four options, the answer window, the tally (before the bench) | ≈ 1.0 | as D1·060's numerics; four options |
| p3 *"With 8 bits over 0–10 V…"* (54), after the pause, before the bench | 0.42 | 54 ÷ 130 |
| s0 Home, N 8: p4 *"[[demo]] On the Plot Bench: the staircase for 8 bits…"* (27) | 0.21 | 27 ÷ 130 |
| s1 Zoom: p4 *"I'll zoom in near 8.5 V."* (6) and the framing (≈ 3 s); p5 *"[[reveal]] 8.540 V is 218.6 steps…"* (50) held | 0.48 | 56 ÷ 130 + 3 s |
| s2a–i the sweep, N 4 → 12: p6 *"Now slide N from 4 bits to 12…"* (20) and nine settings (≈ 13 s, ≈ 6 s of it under the words) | 0.27 | 20 ÷ 130 + 7 s, estimate |
| s3 Fine, N 12 (**Proposal**, F8): p6 *"That ±½ LSB is the floor…"* (25) and the framing (≈ 3 s) | 0.24 | 25 ÷ 130 + 3 s |
| s4 truncating at N 8, Zoom: p6 *"A converter that truncates…"* (19) and the preset (≈ 3 s) | 0.20 | 19 ÷ 130 + 3 s |
| **Card total / of which on the bench** | **3.0 / 1.4** | Without s3 (F8) the 25 words are spoken over s2i: −0.05, still 3.0 / 1.4 |

The U017 brief estimated ≈ 3.0 min. p5 (50 words) is spoken over the held zoom (B13).

### The module, card by card (U017's measure; D1·080 `targetMinutes: 30`)

The Flow is **1,771 words** (13.6 min at 130 wpm; the brief's preview counted 1,781 with a different tokenizer). Five
`[[ask]]` questions (cards 2, 3, 5, 7, 8: 91 words) are counted in their activities. Two `[[demo]]` lines are directions
and are not spoken: card 5's *"Animation Bench: a SAR conversion, one comparison per bit."* (9) and card 6's *"Plot
Bench: the same input through a sigma-delta modulator."* (9). Card 3's and card 7's `[[demo]]` lines are spoken. That
leaves **1,662 words spoken outside the activities = 12.8 min.**

| Card | Flow spoken | Beyond the Flow | Card | Source |
|---|---|---|---|---|
| 1 When, and which level | 3.58 | the HARVEST S12 line 0.11; slider moves 0.12; the prediction aloud before s2 0.1 | **3.9** | `D1-080-01-when-and-which-level.md` §2 |
| 2 Resolution: how many levels | 1.22 | numeric ≈ 0.75 (its question included); the powers read aloud, s2's line and pane moves ≈ 0.5 | **2.5** | `D1-080-02-resolution.md` §2 |
| 3 Quantization error is a floor | 1.76 | poe ≈ 1.0; framings and the sweep 0.25 | **3.0** | this spec |
| 4 More bits are not more accuracy | 0.45 | flash ≈ 0.75 (its question is not in the Flow) | **≈ 1.2** | estimate (no bench; owner D4) |
| 5 SAR: a binary search | 0.64 | numeric ≈ 0.75; the four bits' motion and the step-2 prediction ≈ 1.7 | **3.1** | `D1-080-05-sar-binary-search.md` §2 (2.6 without the prediction) |
| 6 Sigma-delta: fast and coarse, then filtered | 1.24 | the presenter's unscripted lines over the two plots and their moves ≈ 1.2; the prediction at s1 0.5 | **2.9** | `D1-080-06-sigma-delta.md` §2 |
| 7 The table everyone scrolls past | 1.63 | multi-select ≈ 0.9 (its question included); the table's tour and the slider moves ≈ 0.9 | **3.5** | `D1-080-07-datasheet-table.md` §2 |
| 8 ENOB: the honest number of bits | 2.25 | numeric ≈ 0.75 (its question included); pane moves ≈ 0.4; the Proof before the numeric 0.05 | **3.5** | `D1-080-08-enob.md` §2 |
| **Module** | **12.8** | **10.8** | **23.6** | |

**D1·080 uses ≈ 24 of its 30 minutes, leaving ≈ 6 min unused** (F11). Reported only; the owner cuts or adds, nothing is
trimmed here. The cards' own figures replaced the brief's estimates on 2026-10-20 (the brief said ≈ 20), with the
proposals the owner took the same day (card 1 +0.1, card 6 +0.5, card 8 +0.05).

## 3. The scene: what is on the bench

### 3a. The plot (`quantizer-staircase`), target form (two bands sharing x: X-band)

| Field | Content | Source |
|---|---|---|
| `title` | *Quantization error is a floor* · FR *L'erreur de quantification est un plancher* | the card's heading |
| `caption` | *One code stands for every input in its band, one step wide. More bits narrow the band; none closes it. An ideal converter: no noise, no offset.* · FR *Un code représente toutes les entrées de sa bande, large d'un pas. Plus de bits la rétrécissent ; aucun ne la ferme. Convertisseur idéal : ni bruit ni décalage.* | the statement; the last sentence is the A6 label (**Proposal**, F9) |
| `variable` | `x` (the input, V) | the PLAN |
| `xLabel` | *Input (V)* · FR *Entrée (V)* | the PLAN |
| upper band `yLabel` | *Level given (V)* · FR *Niveau attribué (V)* | the PLAN |
| lower band `yLabel` | *Error = level − input (mV)* · FR *Erreur = niveau − entrée (mV)* | F3 (a), pending (**accuracy**) |
| `domain` (Home) | [0, 10] | the PLAN |
| `parameters` (one row, side by side) | `N` *Resolution (N, bits)* 4–12, default 8, step 1, unit *bits*; `trunc` *Quantizer (0 rounding · 1 truncating)* 0–1, default 0, step 1 · FR *Résolution (N, bits)*, *Quantificateur (0 arrondi · 1 troncature)* | the PLAN; the switch accepted (F1) |
| `markers` | x = 8.540, *8.540 V: the sensor's output* · FR *8.540 V : la sortie du capteur* | the PLAN |
| `readout` | on: x, the level, the error at the hover | the Plot's default |
| `fixedView` | false (framings are presets, §3c) | F2 |

**Curves.** Write L for the level, `10/2^N * min(floor(x*2^N/10 + (1 - trunc)/2), 2^N - 1)`, and C for 8.540 V's code,
`min(floor(8.54*2^N/10 + (1 - trunc)/2), 2^N - 1)`; the block spells both out in full.

| id | Band | Expression | Label (EN · FR) | Colour, line |
|---|---|---|---|---|
| `input` | upper | `x` | *The input itself* · *L'entrée elle-même* | azure, `dashed` |
| `level` | upper | L | *Level given: the staircase* · *Niveau attribué : l'escalier* | amber, solid |
| `band` | upper | `10/2^N*C + 0*sqrt((x - 10/2^N*(C - (1 - trunc)/2)) * (10/2^N*(C + (1 + trunc)/2) - x))`, `fill` | *Inputs that share 8.540 V's code* · *Entrées qui partagent le code de 8.540 V* | teal, fill |
| `error` | lower | `1000*(L - x)` | *Error: level − input* · *Erreur : niveau − entrée* | violet, solid |
| `edge_hi` | lower | `5000/2^N*(1 - trunc)` | *Band's upper edge (+½ LSB rounding, 0 truncating)* · *Bord supérieur (+½ LSB arrondi, 0 troncature)* | rose, `dashed` |
| `edge_lo` | lower | `-5000/2^N*(1 + trunc)` | *Band's lower edge (−½ LSB rounding, −1 LSB truncating)* · *Bord inférieur (−½ LSB arrondi, −1 LSB troncature)* | rose, `dashed` |

- L is the PLAN's q·round(x/q) with q = 10/2^N, plus the switch (as card 1: `floor(u + ½)` is the viewer's `round`) and the
  top code 2^N − 1 (F5).
- `error` is **level − input** (F3 recommends it; the PLAN writes x − q·round(x/q)). With rounding the two differ only
  in sign and the picture is symmetric; with truncating, level − input gives the statement's *0 to −1 LSB*.
- `band` is not drawn outside 8.540 V's band: the square root of a negative number is not finite, and the viewer drops
  non-finite samples. Inside the band it is the code's level, filled down to the band's floor: a lit column under the
  tread 8.540 V lands on.
- `edge_hi` and `edge_lo` never use `x`, so the compiler warns that they draw as flat lines; that is deliberate (as
  D1·030 card 3's level curve) until X13 gives a line by expression with its value.

### 3b. The states the presenter sets

| State | Framing | N | Quantizer | 8.540 V's code, level | Its band | Error at 8.540 V | Band edges |
|---|---|---|---|---|---|---|---|
| s0 | Home | 8 | rounding | 219, 8.5547 V | 8.5352–8.5742 V | +14.69 mV | ±19.53 mV |
| s1 | Zoom | 8 | rounding | 219, 8.5547 V | 8.5352–8.5742 V | +14.69 mV | ±19.53 mV |
| s2a | Zoom, sweep scale | 4 | rounding | 14, 8.7500 V | 8.4375–9.0625 V | +210.0 mV | ±312.5 mV |
| s2b | ″ | 5 | ″ | 27, 8.4375 V | 8.2813–8.5938 V | −102.5 mV | ±156.25 mV |
| s2c | ″ | 6 | ″ | 55, 8.5938 V | 8.5156–8.6719 V | +53.75 mV | ±78.13 mV |
| s2d | ″ | 7 | ″ | 109, 8.5156 V | 8.4766–8.5547 V | −24.38 mV | ±39.06 mV |
| s2e | ″ | 8 | ″ | 219, 8.5547 V | 8.5352–8.5742 V | +14.69 mV | ±19.53 mV |
| s2f | ″ | 9 | ″ | 437, 8.5352 V | 8.5254–8.5449 V | −4.84 mV | ±9.77 mV |
| s2g | ″ | 10 | ″ | 874, 8.5352 V | 8.5303–8.5400 V | −4.84 mV | ±4.88 mV |
| s2h | ″ | 11 | ″ | 1749, 8.5400 V | 8.5376–8.5425 V | +0.04 mV | ±2.44 mV |
| s2i | ″ | 12 | ″ | 3498, 8.5400 V | 8.5388–8.5413 V | +0.04 mV | ±1.22 mV |
| s3 | Fine | 12 | rounding | 3498, 8.5400 V | 8.5388–8.5413 V | +0.04 mV | ±1.22 mV |
| s4 | Zoom | 8 | truncating | 218, 8.5156 V | 8.5156–8.5547 V | −24.38 mV | 0 and −39.06 mV |

The error at 8.540 V moves about inside its band from one N to the next (it depends on where 8.540 V falls); the band
edges halve with each bit. That is the Look for: the error stays inside the edges, the edges shrink, and they never meet.

### 3c. Framings (named, with *Home*; carried by the presets, X12)

| Framing | x | Upper band (V) | Lower band (mV) | Why |
|---|---|---|---|---|
| *Home* | 0–10 V | 0–10 | −45 to +45 | the PLAN's x range; the error band at N = 8 (±19.53) with room for truncation's −39.06 |
| *Zoom near 8.5 V* | 8.40–8.70 V | 8.10–8.80 | −45 to +45 | the PLAN's zoom: seven whole treads of code 216–222 (transitions at 8.4180 … 8.6914 V); holds N = 4's levels 8.125 and 8.75 V for the sweep |
| *Zoom, sweep scale* | 8.40–8.70 V | 8.10–8.80 | −350 to +350 | one scale for the whole sweep, N = 4's ±312.5 mV inside it (**Proposal**, F7) |
| *Fine* | 8.50–8.60 V | 8.50–8.60 | −3 to +3 | 41 teeth of 2.44 mV at N = 12, ±1.22 mV filling the band: the floor up close (**Proposal**, F8) |

**Values beside their element**: the slider values; the marker's label; the readout at the hover (x, level, error).
219, 8.555 V, 8.535–8.574 V and ±19.5 mV are spoken (p5), not written on the plot (B13), until X13 can pin a live value
(the code and band of 8.540 V; the edges' values in mV).

**Colours and their second channel** (C4): input azure **dashed**; staircase amber; band teal **filled**; error violet,
alone in the lower band; edges rose **dashed** with their words. Each is told apart by band, dash, fill and label as well
as hue.

## 4. The run: step by step, as the Flow goes

### 4a. Steps (presets; until X12 the presenter sets them on the wall window, §13)

| # | id | Flow paragraph (first words) | What changes (`say`) | Setting | Presenter's control |
|---|---|---|---|---|---|
| — | the PLAN's poe fires before the bench (p1 `[[ask]]`); p3 is spoken after the pause | — | (§7a) | — | the activity |
| 0 | `s0-staircase` | p4 *"[[demo]] On the Plot Bench: the staircase for 8 bits…"* | 8 bits over 0 to 10 V: 256 levels on a staircase, and under it the error, inside a band ±19.5 mV wide. | Home, N 8, rounding | (the plot opens) |
| 1 | `s1-one-code-one-band` | p4 *"I'll zoom in near 8.5 V."*, then p5 *"[[reveal]] 8.540 V is 218.6 steps…"* held | 8.540 V lands on level 219, 8.5547 V; every input in the lit band, 8.5352 to 8.5742 V, gets the same code. | Zoom | preset (framing) |
| 2 | `s2-sweep` (a–i) | p6 *"Now slide N from 4 bits to 12…"* | One scale, one bit at a time: the band halves with each bit, from ±312 mV at 4 bits to ±1.2 mV at 12. | sweep scale, N 4 → 12 | preset, then N one step per press |
| 3 | `s3-floor-up-close` (**Proposal**) | p6 *"That ±½ LSB is the floor of every conversion…"* | Twelve bits up close: the teeth are 2.4 mV wide and the error still ±1.2 mV. It never reaches zero. | Fine, N 12 | preset (framing) |
| 4 | `s4-truncating` | p6 *"A converter that truncates instead of rounding…"* | Truncating: code 218, 8.516 V; the band is 0 to −1 LSB, the same width, shifted. | Zoom, N 8, truncating | preset |

### 4b. Motion, cues and stills

| # | Motion | Movers | Cue and its second channel | Hold | Reduced motion (C3) | Still |
|---|---|---|---|---|---|---|
| 0 | none | 0 | the staircase, then the error band below it | hold | same | s0 |
| 1 | the framing eases from Home to Zoom (≈ 0.6 s, the viewer's own) | 1 (the view) | the marker at 8.540 V and the lit band beneath its tread | hold | the zoomed view at once | s1 |
| 2a–i | the lower band rescales to ±350 mV (a); each press of N redraws the staircase, the band and the error | 1 at a time | the edges closing in, step by step | hold at each | each state at once | s2a, s2e, s2i |
| 3 | the framing eases to Fine | 1 | the 41 teeth filling the error band | hold | at once | s3 |
| 4 | the framing eases back to Zoom at N 8; then the quantizer switches | 1 | the band column slides left under the lower tread; the sawtooth drops below zero | hold | at once | s4 |

There are six stills (s0, s1, s2a, s2e, s2i, s4), seven with s3 (the Proposal). No `animate` block: N must change in
whole bits on the presenter's press (an `animate` sweep would pass through fractional N, which has no meaning).

## 5. Pacing and interaction, by surface and view

**Who paces** (B12): the presenter on the wall; the learner in Study Mode and Scope. **Until X12**, sliders and the
view are local to each window and the presenter works them on the wall window (§13).

| View | Who | Controls |
|---|---|---|
| Preview (in the slide) | everyone | the plot at Home, N 8, rounding; the two sliders in one row |
| View (details) | everyone | the two sliders, each with its words above and the symbol in parentheses, its value at the label's right (`sliders-side-by-side`); the framings Home · Zoom near 8.5 V · Fine as buttons (X12); the hover readout |
| Edit (session only) | everyone | not specified for the Plot Bench |
| Authoring | authors | the `plot` block's YAML |

- **The presenter's strip** (B20): the states of §3b in order, with the next `say`; the teacher tip (§7d).
- **Study / Scope**: both sliders and the framings free after the guided pass (§7e).
- **Phone** (C6): the two bands full width, one above the other; the sliders under them, one per line; the framings as
  three buttons (44 px); the edges' long labels wrap in the legend.
- **Locked**: the plot opens only after the poe is answered (the reveal waits, B9).

## 6. The frame

The Plot's viewer frame (the Canvas header and footer, D4.10–4.12): the title, the legend (six entries, grouped by band),
the two bands sharing one x axis (X-band), the sliders in one row, the framing buttons (X12), the readout. No dock, no
panels.

| Tile / panel | Used? | Selected item | List / contents |
|---|---|---|---|
| Legend | yes | — | upper: input, level, band; lower: error, the two edges |
| Sliders | yes | the value beside each label | N, quantizer |
| Framings | yes (X12) | the current framing's name | Home · Zoom near 8.5 V · Fine |
| Readout | yes (hover) | x, level, error | — |

## 7. Thinking, not watching

- **7a. The PLAN's ASK** (verbatim): *poe (at the Flow's [[ask]]) — "A sensor gives 8.540 V into the 8-bit, 0–10 V
  converter. Which voltages could the resulting code stand for?" · options: exactly 8.540 V | any voltage in a band one
  step (39 mV) wide | any voltage within ±39 mV of 8.540 V | anything from 8.41 to 8.88 V · answer: any voltage in a band
  one step (39 mV) wide · reveal: the centrepiece Plot at N = 8, zoomed near 8.5 V. · explain: With rounding, 8.540 V lands
  on level 219 (8.555 V), and every input from about 8.535 to 8.574 V gives that same code: ±½ LSB, ±19.5 mV. · depth:
  understand · practice: analysing data.* It fires at p1, **before the bench appears**; **s1 reveals it**.
- **7b. Prediction point**: the poe is the prediction. **Proposal** (F9): before s4, ask aloud *"If this converter
  truncated, would the band get narrower?"* (no: the same width, shifted); +0.1 min.
- **7c. After**: the explain. In Study, done means the poe was answered and N was moved through at least four values.
- **7d. Teacher tip** — **Proposal** (F9): *Expect "a 12-bit converter is exact" and "the error is ±1 LSB around the
  input". Ask: which inputs give exactly code 219, and how wide is that set?*
- **7e. Explore** (B11): in Study, N 4–12, the quantizer, the three framings. *Find the N at which 8.540 V's band is
  narrower than 5 mV* (N = 11: 4.88 mV wide).

## 8. Faithfulness (the quality bar)

**Arithmetic** (Node, 2026-10-20; q = 10/2^N, code = round or floor of x/q, top code 2^N − 1):
- q at N = 8: 10/256 = **39.0625 mV** (✓ p3's 39.06 mV; card 2's answer 39.1 mV ± 0.3). ½ LSB = **19.53 mV** (✓ p5's
  ±19.5 mV).
- 8.540/0.0390625 = **218.624** (✓ p5's 218.6) → rounded **219**, level 219 × 0.0390625 = **8.5547 V** (✓ 8.555 V); band
  218.5q to 219.5q = **8.53516 to 8.57422 V**, 39.06 mV wide. 8.535 V itself is 218.496 steps and rounds to **218** (F4,
  **accuracy**). Truncated: **218**, 8.5156 V, band **8.5156 to 8.5547 V**.
- The sweep (§3b): q/2 from 312.5 mV (N = 4) halving each bit to **1.2207 mV** (N = 12); never zero for any finite N.
- The course's converter for comparison (card 1, card 5): 3.3/4096 = 0.8057 mV; 2.17 V → 2693.
- The FAULT: 2^N/(2^N − 1) − 1 = 1/255 = 0.392 % at 8 bits (or 1/256 = 0.391 % taken the other way): **0.39 %** ✓.
  Truncating's mean error is −q/2: **−½ LSB** ✓ (with error = level − input, F3).
- The top code (F5): with rounding, code 255 covers 254.5q to 10 V = **9.9414 to 10 V**, 1½ LSB wide; above 255.5q =
  9.9805 V the error passes −½ LSB and reaches **−39.06 mV (−1 LSB) at 10 V**.
- The poe's options: 8.41 and 8.88 V are 3.3 and 8.7 steps from 8.540 V; ±39 mV is ±1 LSB, twice the rounded band's
  half-width: both distractors are false as intended.

**Sampling against the steps** (the viewer: ≈ 429 samples across the visible x): a staircase or sawtooth is drawn
faithfully when one step spans ≥ 8 samples. Samples per step: Home 429/2^N (N 4: 26.8, 5: 13.4, 6: 6.7, 7: 3.4, 8: 1.7);
Zoom (0.30 V) 429·q/0.30 (N 8: 55.9, 9: 27.9, 10: 14.0, 11: 7.0, 12: 3.5); Fine (0.10 V) at N 12: 10.5. Under the
sweep scale (±350 mV) the error at N = 11 and 12 is ±2.44 and ±1.22 mV, under one pixel on a band under 280 px tall, so
their under-sampling cannot be seen. At Home, N = 8, the error's 256 teeth are finer than the screen: the target draws
their envelope (X-steps); s3 shows the teeth themselves up close.

**Section D, Plot rows**
- [x] The expression is the physics: an ideal uniform quantizer with 2^N codes over 0–10 V, rounding (mid-tread, first
  code ½ LSB wide, last code 1½ LSB wide) or truncating, the course's model (`course-accuracy.md` §3).
- [x] Axis and slider ranges real: 0–10 V and N 4–12 (the PLAN); 12 bits is the course's converter's resolution.
- [x] One worked value: at x = 8.540, N = 8, rounding, the readout gives level 8.5547 V and error +14.69 mV.
- [ ] No artefacts: **only with X-steps** at Home for N ≥ 6 (the steps chosen avoid the rest, above). The stand-in (§13) is
  ragged at Home for N = 8 (1.7 samples a step), labelled.

**A1–A8**: A1 ✓; A2 ✓ (truncation, the top code and the FAULT's offset are the non-ideal; rounding beside them); A3 ✓
with F4 and F5 raised (a band's end on a transition; full scale); A4 n/a; A5 n/a; A6 ✓ (*an ideal converter: no noise,
no offset*, the caption's last sentence, F9); A7 ✓ with F3 raised (the error's sign against the statement);
A8 ✓.

## 9. Faults and non-ideal behaviour

**PLAN FAULT** (verbatim): *Firmware that divides by 2^N in one place and by 2^N − 1 in another: a gain error of one part
in 2^N (0.39 % at 8 bits). Truncating instead of rounding: a steady −½ LSB offset.* The second half is s4: the band
slides by ½ LSB and the error's middle sits at −½ LSB. The first half is card 2's (39.06 against 39.22 mV) and is not
drawn here.

Also: the top code is 1½ LSB wide (F5), drawn as it is. A real converter adds noise, offset, gain error, INL and DNL on
top of this floor (card 7, card 8); here the quantizer is ideal, so the floor is all the room sees.

## 10. Accessibility, legibility and print

- Wall (C2): axis labels, band labels, slider values, legend and the marker's label at the Plot's wall size. Check at
  1920 × 1080 and 1024 × 768 that the marker's label and the band column do not collide with the legend.
- Reduced motion (C3): the framings land at once; each N lands whole.
- Colour (C4): band, dash, fill and words (§3); check teal fill against amber under deuteranopia.
- Keyboard (C5): the sliders' arrow keys (one bit per press); Tab to the framing buttons.
- Print (C8): the stills of §4b, each with its `say` and its row of §3b.

## 11. Assets to make or source

| Asset | Format | Made by | Status |
|---|---|---|---|
| The `plot` block (§3a), EN and FR | YAML in `en.md` | the author (FR drafts for the owner's review) | to write |

## 12. Bench capabilities this needs

**Plot Bench, exists**: `variable`, `domain`, `parameters`, `curves` with `floor`, `min`, `sqrt`, `dashed`, `fill`;
`markers` on x; `readout`; the viewer's wheel zoom on x with y refitted when `range` is omitted; non-finite samples
dropped.

**Missing (request it)**:
- **X-band** (**proposed**; its number is given when it is raised as a crossing to Benches; the working names X-band, X-steps and X-switch avoid the X22 that the card 6 spec uses for another need): a second band under the plot sharing its x axis, with its
  own y label and range, and each curve assigned to a band. Here: the error in mV under the staircase in V (the PLAN's
  *"and under it the error"*). Without it: §13.
- **X12** (already listed), **extended**: a preset carries a *framing* (the domain and each band's range) as well as
  slider values, mirrored to the wall and devices; the framings of §3c are presets with their names on buttons.
- **X13** (already listed): a line or label whose value is an expression: the edges' values (±19.53 mV …), 8.540 V's code
  and band. Today the edges are flat curves (a compiler warning, expected) and the values are spoken.
- **X-steps** (**proposed**): step-faithful sampling: a curve built on `floor`, `round` or `mod` is sampled at its jumps (risers
  vertical), and where its steps are finer than the screen the viewer draws its envelope with a label (*steps finer than
  the screen*). Today ≈ 429 samples, joined.
- **X-switch** (**proposed**, as card 1): a two-state parameter drawn as a labelled switch; a curve's stroke weight.

**Not possible, and not needed**: the plot computing the code as a number; the Flow says it.

**Second plot block for the zoom**: not available on this card (one bench block per card), so the zoom is a framing
(X12) and not a second plot.

## 13. Stand-in for the lecture

**Today's Plot, one band** (no X-band, X12, X13, X-steps): the same `plot` block without the lower band, `range` omitted (so the
y axis refits to the view) and `fixedView: false`. Curves: `input`, `level`, `band` as §3a, and the band's edges in volts
around the staircase, `L - 10/2^N*(1 - trunc)/2` and `L + 10/2^N*(1 + trunc)/2` (rose, dashed: *the inputs that get this
level lie between these*). The dashed input always runs between them; the error is the gap from the input to the amber
tread.

- **It shows**: s0 at Home; s1 by the presenter's wheel zoom near the marker on the wall window (the y axis refits);
  s2 by the N slider, one press per bit, at that zoom; s3 by zooming further in at N = 12; s4 by the quantizer slider.
- **It loses**: the sawtooth itself and the ±½ LSB lines on it (the PLAN's error curve); one scale through the sweep (the
  y axis refits at each N, so the halving is read on the axis, not seen); exact framings (the wheel is approximate); the
  mirrored state (the room watches the wall window). At Home, N = 8, the staircase is drawn from 1.7 samples a step and
  looks ragged, not stepped: say *"the steps are too fine to see at this scale"* and zoom.
- **Checks lost**: B2 partly (the axis moves with N), B4 (stills by hand), B16 the error's values, D Plot *no artefacts*
  at Home.
- **What the Flow might say differently** (a proposal; the Flow is not edited): p4's *"and under it the error, the input
  minus the level it was given"* becomes, on the day, *"and around it the band of inputs that get each level"*.
- The stand-in's block is the target's upper band, so nothing is made twice.

## 14. Findings for the owner

- **F1 — The Rounding | Truncating switch** (**accepted**, owner 2026-10-20). The 8-bit, 0–10 V converter rounds, as
  the Flow says; s4 shows truncation, the course's converter's rule.
- **F2 — The zoom near 8.5 V** (**accepted**, owner 2026-10-20). Within the Plot it needs **X12 extended with framings**
  (a second plot block is not possible on one card). Today: the presenter's wheel zoom (§13).
- **F3 (accuracy; proposed D1·080-F10) — The error's sign.** The statement (*"0 to −1 LSB when it truncates"*) and p6
  (*"a band from 0 to −1 LSB"*) take error = level − input, as D1·020 defines error (*"the difference between the
  indicated value and the true value"*) and as the FAULT's *"−½ LSB offset"* does. The PLAN's SHOW (*"x − q·round(x/q)"*)
  and p4 (*"the error, the input minus the level it was given"*) take input − level. With the accepted switch, a plot
  of input − level shows truncation's band at **0 to +1 LSB** while the room is told 0 to −1 LSB. The options:
  - (a) error = level − input on the plot; the PLAN's SHOW reads *"q·round(x/q) − x"* and p4 *"…and under it the error,
    the level it was given minus the input."* (**recommended**: one definition of error across D1·020 and D1·080);
  - (b) keep input − level and change the statement and p6 to *"0 to +1 LSB"* (contradicts D1·020's definition and the
    FAULT's −½ LSB);
  - (c) keep both and label the plot's axis *input − level*, leaving the statement's band upside down on the plot.
- **F4 (accuracy; proposed D1·080-F11) — The band's lower end, 8.535 V.** The PLAN's Drive and explain and p5 say
  *"every input from 8.535 V to 8.574 V gives that same code"*. 8.535 V is 218.496 steps and rounds to code **218**; the
  band is 8.53516 to 8.57422 V. A learner who checks 8.535 gets the other code. The options:
  - (a) *"from about 8.535 V to 8.574 V"* in p5 and the PLAN, the plot's readout giving 8.5352–8.5742 V (**recommended**:
    one word);
  - (b) *"from 8.536 V to 8.574 V"* (true at both ends, 1 mV inside the band);
  - (c) four decimals, *"8.5352 to 8.5742 V"*.
- **F5 (accuracy, minor; proposed D1·080-F12) — Full scale.** A real 8-bit converter has codes 0 to 255; with rounding the
  top code covers 9.9414–10 V (1½ LSB), so above 9.9805 V the error passes −½ LSB and reaches −1 LSB at 10 V. The PLAN's
  q·round(x/q) has no top code and would draw a level 256 (10.000 V) that 8 bits cannot hold. The Look for says *"inside
  ±½ LSB at every N"*. The statement and the Flow stay true (*"between two levels"*; a floor is a minimum). The options:
  - (a) draw the real top code (`min(…, 2^N − 1)`, as §3a) and read the Look for as *"…inside ±½ LSB at every N below
    full scale"* (**recommended**: the bench shows the real converter; nothing the room hears changes);
  - (b) draw the PLAN's formula unclamped (a code that does not exist: not allowed under the accuracy rule);
  - (c) end the domain at 9.98 V (hides the end rather than showing it).
- **F6 (accuracy; proposed D1·080-F13) — "add to the resolution error a quantization error"** (p0). Card 2 has just
  defined resolution as the converter's 1-LSB step, so the room can hear two converter errors to be added (±1 LSB and
  ±½ LSB), when quantization error *is* the error of finite resolution. D1·020 lists "resolution error" among an
  instrument's characteristic errors, which is what the source meant. The options:
  - (a) *"For a digital system, we must add to the instrument's other errors a **quantization error**…"*
    (**recommended**);
  - (b) *"…add to the errors of the analog chain…"*;
  - (c) leave it.
- **F7 — Proposal: the error's scale per step.** (a) ±45 mV for Home, the reveal and truncation; ±350 mV for the sweep,
  so the halving is seen on one scale; then the Fine close-up (**recommended**); (b) the error rescaled at every N to ±1.2
  LSB, as the preview you saw (the shape always visible, the shrink read only on the axis); (c) one scale, ±350 mV,
  throughout (the reveal's ±19.5 mV would be 6 % of the band).
- **F8 — Proposal: the sweep on the zoom, then the Fine close-up (s3).** The PLAN's Drive sweeps after the zoom; this
  spec keeps that order. At Home the teeth are finer than the screen from N = 6; at the zoom, N = 12's 1.2 mV is under a
  pixel on the sweep scale, so s3 frames 8.50–8.60 V at ±3 mV to show that the floor is still there. +0.05 min.
- **F9 — Proposals**: the caption (§3a), the band column and dashed input (§3a), the prediction aloud before s4 (+0.1
  min), the teacher tip (§7d), the explore task (§7e), the FR drafts, and the new requests X-band, X-steps and X-switch (to raise by
  crossing when the course needs them).
- **F10 — Our preview's error panel** (`u017-preview.html`, `draw3`) drew input − level while labelling the truncated
  band 0 to −1 LSB, so its truncated sawtooth sat above zero under a "−1 LSB" line. Our error: this spec draws level −
  input (F3 (a)); the preview is corrected with F3's decision.
- **F11 — The module runs ≈ 9 min short of its 30** (§2). Reported only.

**Decided 2026-10-20** (owner, in the course's chat: *"go with the recommendations"* on the brief's findings, F10–F18 and the specs' proposals): every **Proposal** in this spec and every option marked **recommended** in this §14 is taken; options marked *not recommended* are not. Its accuracy findings F3–F6 are ACCURACY D1·080-F12–F15, **applied** to en.md (level − input; *"from about 8.535 V"*; *"below full scale"*; *"the instrument's other errors"*); the plot draws level − input and the real top code. Minutes unchanged (1.4 / 3.0); the module table above is updated.

## 15. Acceptance: how we know it is built right

- The plot compiles with the fields of §3a (the two flat-line warnings on `edge_hi` and `edge_lo` are expected). At each
  state of §3b the hover readout at x = 8.540 gives the level and error listed (s1: 8.5547 V, +14.69 mV; s4: 8.5156 V,
  −24.38 mV), and the band column spans the band listed.
- The poe fires before the plot opens; s1 reveals it.
- B1 one setting per step; B2 only the variable that teaches moves (N, or the quantizer, or the framing); B4 the stills;
  B5 each `say` on the strip; B6 the edges and the band column move with N; B7 one mover; B9 the reveal waits; B10 the
  explain; B11 N one control away in Study; B13 no narration on the plot; B16 values in the readout and on the sliders;
  B17 staircase and error on one x axis; B18 the framings named, *Home* one press away; B20 the states on the strip.
- C2 legible at 1920 × 1080 and 1024 × 768; C3 each state at once; C4 dash, fill, band and words; C5 slider keys and
  framing buttons; C6 at 320 with the bands stacked; C8 the stills.
- D Plot: no ragged step drawn as a slope wherever a step spans fewer than 8 samples (X-steps), checked at Home at N = 8.
- The stand-in (§13) checked on the lecture laptop before the day, by zooming on the wall window to 8.40–8.70 V.
- E1–E6 for the plot as presented, in both themes, EN and FR.
