```yaml
id: D2-020-05-inside-the-ads1115
card: "Inside the ADS1115"
module: notes/Day02/020-external-adcs/en.md
bench: Figure                     # the PLAN's centrepiece; the asset is ours to draw (D2: our own redrawn extracts)
library: "ads1115-datasheet: a Figure of our own SVG, `figures/d2-020-ads1115-datasheet.svg`: six cells redrawn from TI SBAS444E (the cover's title, the block diagram with its input multiplexer, the full-scale ranges and step sizes, the input impedances by range, the noise tables, the two resolution definitions), shown three times under the card's Flow (s0; s1–s5; s6–s8); and ads1115-loading: an Equation, D1·040's loaded divider with the ADS1115's differential input impedance as the load, its six ranges marked"
dimensions: 2D
stand_in: none                    # the Figure and Equation Benches exist; the SVG is to make (§11)
optional_benches: [Equation]      # the PLAN's reveal for the numeric
real_thing: "the ADS1115's datasheet, TI SBAS444E (May 2009, revised December 2024): Figure 7-1, §7.3.1 and §8.1.3 (MUX[2:0]), Table 7-1, §5.5 (input impedances), Tables 6-1 and 6-2 with §6.1's Equations 1 and 2, all typical at VDD = 3.3 V and 25 °C; and a bridge of 10 kΩ arms (10 kΩ between its outputs) driving the differential input"
minutes: 3.1                      # on the bench: the three showings and the Equation, the two activities excluded (§2)
card_minutes: 5.1                 # the whole card, the poe and the numeric included (§2)
status: spec-ready                # D2·020-F1, F4, D1, D2, D3, N2 applied; F-c5-1 to F-c5-8 decided 2026-10-21 (round two: all recommended (a)) and applied (F-c5-2, F-c5-3 in en.md); D2·020-F12, F13 closed by them; nothing open (the SVG not yet drawn does not block)
learner_action: poe, numeric      # the PLAN's two ASKs
predictions: []                   # the poe is the prediction; nothing added
seeds: [S16 (harvest, s3), S20 (harvest, s7–s8), S52 (plant, s8 held)]
key_variable: "the full-scale range: each step down shrinks the count (187.5 → 7.8125 µV), lowers the differential input impedance (22 MΩ → 710 kΩ) and, at speed, costs noise-free bits (14.8 → 13.8 at 860 SPS); the data rate is the noise table's other axis"
time_scale: "none (tour stops; nothing moves)"
steps: 10                         # s0–s8 on the Figure (three showings), e1 on the Equation
```

**Written 2026-10-21 (U020)** after the owner's choices on the U020 brief (*"Apply all recommendations"*, 2026-10-21):
**D2·020-F1** (applied: the noise table is read in the **±0.256 V column, peak-to-peak**; the POE's explain names the RMS
column; the close reads *"…how many of them stay free of noise… under its own name: noise-free resolution, read from the
peak-to-peak noise"*; the RMS column and the 1.79-bit offset go in **this spec's teacher tip**), **D2·020-F4** (applied: *"the
differential input impedance, the load between the two inputs"*; the common-mode row is drawn apart), **D1** (the ADS1115
named, an exception to real-but-unbranded for this module; no logos), **D2** (the datasheet shown as **our own redrawn
extracts** in the course style, every value read off SBAS444E and cited here; never the vendor's page images), **D3**
(specs for all seven cards) and **N2** (the figure labels the bridge *"a bridge of 10 kΩ arms (10 kΩ between its outputs)"*;
the Flow unchanged). The brief page's `draw5` and `upd5` (`bench-work/previews/u020-preview.html`) are the approved visuals:
five stops (block diagram, MUX pairs, PGA ranges, input impedance with the differential and common-mode rows apart, the noise
table last with an *RMS · peak-to-peak · noise-free bits* view, rose = above one count), and the loaded divider stepped
through 22, 15, 4.9 and 2.4 MΩ and 710 kΩ twice. One correction of ours to `draw5` is named in §3a and the six-gate report
(the unpaired inputs were `violet`, the bus's hue). Everything beyond the PLAN was marked **Proposal** and listed in §14
(round two): **all decided by the owner 2026-10-21** (*"Apply all recommended (a)"*) and applied here; F-c5-2 (the SEED S52)
and F-c5-3 (six Flow fences; the PLAN's *"numeric (after the impedance stop)"*) are applied in `en.md`.

**The benches, as read in source on 2026-10-21** (read-only, `C:\ExSightory\src\insight\packages\`):

- **Figure** (`insight-core/src/registry/figureBlock.ts`, `figure/style.ts`): **one image** per block; `features` with
  `rect` (fractions [x, y, w, h]) and other geometry, `colour` from teal · amber · violet · lime · rose · azure · orange ·
  magenta, `line` solid · dashed · dotted, `label` and `note` `{en, fr}`; a mirrored `tour` (one `feature` per stop, an
  optional `zoom` target, a `note`); `zoom` targets by `rect` or by a feature's bounds; `reveal` shown · hidden · on-tour;
  `labels` numbers · callouts · on-figure · none; a figure-wide `spotlight` none · dim · blur · desaturate · blur-dim;
  `compare` (one overlay image and a seam). **No layers and no view switch**: the brief's *RMS · peak-to-peak · noise-free
  bits* radio becomes features on one drawn table (§3b). A block with no feature and no `compare` is refused.
- **Equation** (`registry/equationBlock.ts`; `canvas/src/EquationBench.vue`): as `D2-010-07` read it (statement, symbols,
  highlights, derivation, examples, rearrangements, boundaries, assumptions, graph with `against`, `domain`, `hold`, `scale`
  log, `compare` of **two to five** values of a held symbol, `markExamples`). **Mirrored to the wall**: the pane, the pinned
  annotation, the derivation step; **not** a hold slider's value. Values print through `formatQuantity` (4 significant
  figures, SI prefixes); a unit `%` is **not** treated as a percentage (`quantity.ts`: only the `percent` option is, and the
  Equation does not set it), so 0.0454 % would print *45.4 m%*: the Equation graphs volts, as D1·040's does (§3c).
- **Cards** (as `D2-010-07` read them): `figure` and `equation` are lead blocks; `poe` and `numeric` are `widget-focus` (an
  activity never shares the wall); **a Flow fence attaches to the block before it**.

## 1. What the room must understand

- **Statement** (verbatim): *The ADS1115 is a sigma-delta converter with a programmable gain amplifier in front of it. Its
  input impedance changes with the gain setting, and its datasheet trades data rate against noise in a table.*
- **SHOW** (verbatim from the PLAN): *(centrepiece) Figure — the ADS1115 datasheet (TI SBAS444) as a tour: block diagram
  (AIN0–AIN3 → MUX → PGA → ΔΣ modulator → digital filter → I²C, internal reference and oscillator) → MUX pairs (AIN0–AIN1,
  AIN2–AIN3) → the PGA full-scale ranges (±6.144 V … ±0.256 V; LSB = FSR/2¹⁵: 187.5 µV … 7.8 µV) → input impedance against
  full-scale range → the noise table against data rate, last.*
- **Drive** (verbatim): *in that order; spotlight one column at a time; compare the 8 SPS and 860 SPS rows of the ±0.256 V
  column, in its peak-to-peak figures.*
- **Look for** (verbatim): *the peak-to-peak noise growing with data rate (7.81 → 35.83 µV on ±0.256 V), and the
  differential input impedance falling as the gain rises.*
- **Status** (verbatim): *needs asset: our own redrawn extracts of the datasheet (TI SBAS444E), every value read off the
  page, not from memory; no vendor page images (decided 2026-10-21)*
- **ASK** ×2, **HARVEST** ×2, **SEED** (verbatim): §7a.
- **Bench and library.** The **bench** is the Figure Bench, with the Equation Bench for the numeric's reveal. The
  **libraries** are `ads1115-datasheet` (our SVG and its three `figure` blocks) and `ads1115-loading` (the `equation` block).
- **Insight**: *one 16-bit part is three trades set by one choice: a finer range gives a smaller count but a heavier load on
  the source, and a faster data rate lets more of the noise through, so that at 860 SPS on the finest range about two of the
  sixteen bits are noise.*
- **Kind of knowledge**: *a picture built up* (a document read stop by stop) and *a relation between quantities* (noise
  against rate, load against range). Card test → **Figure** for the tour, **Equation** for the load. B17 applies twice (the
  differential and common-mode rows side by side; the RMS and peak-to-peak sub-columns side by side). B15 applies (the
  chip's subsystems one per stop before the tables that depend on them). B18, B19 do not.
- **Why this bench, not a still**: a datasheet page arrives whole and every number looks equally important. The tour lights
  the one block, the one pair, the one column the Flow is naming, zoomed to wall size; a still of the six cells would be
  unreadable at 3 m (§10) and would not say which column answers the POE.
- **Key variable**: the full-scale range (the yaml), with the data rate as the noise table's second axis.

## 2. Time

The card's Flow is **396 words** (`en.md`, 2026-10-21; the brief's rule: whitespace tokens of the fence, cue markers
removed, tokens with a letter or digit; recounted with Node ✓). Per paragraph: p0 27, p1 28 (the POE's `[[ask]]`), p2 0
(`[[pause]]`), p3 19 (`[[reveal]]`), p4 34 (`[[demo]]`), p5 32, p6 41, p7 73, p8 17 (the numeric's `[[ask]]`), p9 0, p10 19,
p11 42, p12 64. p1 and p8 are counted in their activities. **351 words are spoken outside them = 2.70 min.** Two lines are
spoken that are not in the Flow: the presenter's unscripted line on the Equation (≈ 25 words, on the strip, §4a) and the
SEED S52 (27 words, the PLAN's, as reworded by F-c5-2 (a), decided 2026-10-21; it was 22; recounted with Node ✓).

| Beat | Minutes | Source of the number |
|---|---|---|
| s0 the sheet, showing 1: p0 *"We met sigma-delta conversion…"* (27) | 0.21 | 27 ÷ 130 |
| The POE: p1 the question (28), the window, the tally (p2 `[[pause]]`); its explain is read on the widget | ≈ 1.0 | the U020 brief's figure for a poe, question included |
| s1 the reveal, showing 2: p3 *"[[reveal]] The noise rises…"* (19) | 0.15 | 19 ÷ 130 |
| s2 the block diagram: p4 *"[[demo]] The block diagram first…"* (34) | 0.26 | 34 ÷ 130 |
| s3 the MUX pairs: p5 *"The multiplexer can pair its inputs…"* (32; HARVEST S16) | 0.25 | 32 ÷ 130 |
| s4 the PGA: p6 *"The PGA sets the full-scale range…"* (41) | 0.32 | 41 ÷ 130 |
| s5 the impedance: p7 *"Now the differential input impedance…"* (73) | 0.56 | 73 ÷ 130 |
| The numeric: p8 the question (17), the window, the tally (p9) | ≈ 1.0 | the brief's figure for a numeric |
| e1 the Equation: p10 *"About 10 k out of 720 k…"* (19) and the strip's line over the six dots (≈ 25, estimate) | 0.34 | 44 ÷ 130 |
| s6 the noise table, showing 3: p11 *"Finally, the noise table…"* (42) | 0.32 | 42 ÷ 130 |
| s7–s8 the cover, then the resolution table: p12 *"Sixteen bits on the cover…"* (64; HARVEST S20) | 0.49 | 64 ÷ 130 |
| s8 held: the SEED S52 (27, not in the Flow) | 0.21 | 27 ÷ 130 |
| **Card total / of which on the bench** | **5.1 / 3.1** | 5.10 / 3.10 |

Views arrive at their first frame (stills), so the five slide changes cost no time beyond the presses. p7 (73 words, the
card's longest) is spoken over a **held** stop (B13). s7 and s8 are two presses inside p12, at *"Sixteen bits on the
cover,"* and at *"and a table inside"*: the strip names both clauses (§5).

**Module check** (D2·020 `targetMinutes: 30`, 12:30–13:00 GMT): the Flow is **2,045 words = 15.7 min** (cards 231, 414, 45,
278, 396, 331, 350); the U020 brief estimated **≈ 29–30 of 30 min** with the activities and ≈ 3 min of bench moves mostly
over speech (card 1's spec §2). This card adds **0.40 min** beyond its Flow and activities (the Equation's line and the S52
seed, 52 words; 0.36 min and 47 words before F-c5-2's rewording added 5): inside that estimate if counted in the moves,
**≈ 29.6 of 30** if not (29.64). With card 4 (its 3-minute checkpoint and 2.1 min of Flow) this is one of the module's two
longest cards. **After round two** (`en.md`, 2026-10-21, recounted with Node): the module's Flow is **2,116 words = 16.3 min**
(cards 231, 414, 45, 278, 396, **402**, 350): card 6's Flow gained 71 words (its I²C clock ask and reveal), which that
card's spec counts; this card's Flow is unchanged at 396. Reported only; nothing trimmed.

## 3. The scene: what is on the bench

### 3a. The SVG (`figures/d2-020-ads1115-datasheet.svg`), ours

Artboard **3200 × 2700**: six **cells of 1600 × 900** (16:9, so each zoom fills the stage), two across and three down, read
left to right and top to bottom in the tour's order. Course style (D2): our type, our neutral ink, IEC 60617 where a symbol
is drawn; **no logo, no vendor typeface, no page furniture**; each cell carries its source in small type at its foot
(*"Redrawn from SBAS444E, Table 7-1"*). Colours (the U020 palette, gate 5): the ADS1115 `amber`, the bus `violet`, the
common-mode impedance `azure`, a value above one count `rose` **and bold**, our own computed columns in *italics* with the
mark *(ours)*. Every number below is the page's, as printed; our arithmetic is in §8.

| Cell | Place | What is drawn | Source |
|---|---|---|---|
| C1 the cover | x 0–1600, y 0–900 | The document's title set in our type: *ADS111x Ultra-Small, Low-Power, I²C-Compatible, 860SPS, 16-Bit ADCs with Internal Reference, Oscillator, and Programmable Comparator*; under it *SBAS444E · May 2009 · revised December 2024*. *16-Bit* and *860SPS* in amber | SBAS444E p. 1 |
| C2 the block diagram | x 1600–3200, y 0–900 | The chip outline (amber), VDD and GND pins; AIN0–AIN3 → **MUX** → **PGA** → **ΔΣ modulator** *(250 kHz)* → **digital filter** → **I²C interface** → SCL, SDA (violet), ADDR; **voltage reference** and **oscillator** *(1 MHz)* inside, dashed to the modulator; **comparator** → ALERT/RDY (thin, not toured). The two input pairs bracketed: AIN0–AIN1 amber solid, AIN2–AIN3 amber **dashed** (F-c5-4 (a), decided 2026-10-21: our fix, `draw5` drew the unpaired inputs `violet`, the bus's hue). Caption: *the 16-bit ΔΣ ADC of Figure 7-1 drawn as §7.1 describes it, a modulator and a digital filter* | Figure 7-1; §7.1; §7.3.2 (fMOD = 1 MHz ÷ 4); §7.3.4–7.3.5 |
| C3 the ranges | x 0–1600, y 900–1800 | Table 7-1, three columns: **FSR** (±6.144, ±4.096, ±2.048, ±1.024, ±0.512, ±0.256 V), **LSB size** (187.5, 125, 62.5, 31.25, 15.625, 7.8125 µV), and *5 mV spans (ours)* (*≈ 27*, *40*, *80*, *160*, *320*, *640 counts*); the ±0.256 V row ruled in amber. Beside it: *16 bits, signed: one count = 0.256 V / 32,768 = 0.512 V / 65,536* (Eq. 4: *LSB = FSR / 2¹⁶*, FSR the full span) and the page's footnote *±6.144 V and ±4.096 V: no input beyond VDD + 0.3 V; at VDD = 3.3 V their full codes are not reached* | Table 7-1; Eq. 4; §7.3.3 |
| C4 the impedances | x 1600–3200, y 900–1800 | Two **bands** sharing one row of range labels (±6.144 … ±0.256 V, *gain rises →*): **differential** (amber bars, log axis 100 kΩ – 100 MΩ) *22 MΩ, 15 MΩ, 4.9 MΩ, 2.4 MΩ, 710 kΩ, 710 kΩ*; **common-mode** (azure bars, hatched, same axis) *10 MΩ, 6 MΩ, 6 MΩ, 3 MΩ, 100 MΩ, 100 MΩ*. Each value printed above its bar: the two rows of the §5.5 table, drawn as bars (caption: *bars ours, from the table's values; typical*) | §5.5; §7.3.2, Figure 7-5 |
| C5 the noise tables | x 0–1600, y 1800–2700 | **Table 6-1** (top half) *Noise in µV RMS (µV peak-to-peak) at VDD = 3.3 V*: rows 8, 16, 32, 64, 128, 250, 475, 860 SPS; each range a column of two sub-columns, RMS and (pp), as the page sets them in one cell; **Table 6-2** (bottom half) *Effective resolution from RMS noise (noise-free resolution from peak-to-peak noise), bits*, the same grid. Every figure **above one count** (pp > RMS; noise-free < 16) rose and bold. The data-rate column **repeated at the right** of each table, and beside Table 6-1's an *OSR (ours)* column: *31,250 · 15,625 · 7,813 · 3,906 · 1,953 · 1,000 · 526 · 291* (F-c5-4 (a), decided 2026-10-21: the zoom of §3b needs the rate beside the ±0.256 V column; the OSR is p11's *"fewer samples"* in numbers) | Tables 6-1, 6-2; §6.1; §7.3.2 |
| C6 how to read it | x 1600–3200, y 1800–2700 | *Effective resolution = log₂(FSR / V_RMS)* (Eq. 1) · *Noise-free resolution = log₂(FSR / V_PP)* (Eq. 2) · *FSR is the full span: 0.512 V on ±0.256 V* · *typical, 25 °C, inputs shorted together* (not toured; Study, and the sheet at s0) | §6.1, Eqs. 1–2 |

**Noise cell, fixed for the zoom** (cell-local units; the render is the check): rate column x 25–125; six range columns of
205 (RMS 90 + pp 115) at x 125–1355, so **±0.256 V at x 1150–1355**; the repeated rate x 1355–1455; OSR x 1455–1575.
Table 6-1: title y 20–55, range header 55–100, sub-header *RMS (pp)* 100–135, rows 135–439 (8 × 38). Table 6-2: title
465–500, headers 500–585, rows 585–889. Body type **31 units**, tabular figures.

**Values beside their element**: every value is printed in its own cell or above its own bar; units in the column heads.
**Labels** (B14): the figure is still; features are numbered badges with names in the key (`labels: numbers`).

### 3b. The `figure` blocks: one image, three showings (F-c5-3 (a), decided 2026-10-21)

Common to all three: `image` `figures/d2-020-ads1115-datasheet.svg`; `spotlight: dim`; `labels: numbers`.

| Field | Content |
|---|---|
| `title` | EN *Inside the ADS1115: its datasheet, redrawn* · FR *Dans l'ADS1115 : sa fiche technique, redessinée* |
| `caption` | EN *Our own redrawn extracts, not the maker's pages. Values from TI SBAS444E (May 2009, revised December 2024): Figure 7-1, §7.3.1 and §8.1.3, Table 7-1, §5.5, Tables 6-1 and 6-2, §6.1. Typical values at VDD = 3.3 V and 25 °C; the noise measured with the inputs shorted together.* · FR *Nos propres extraits redessinés, pas les pages du fabricant. Valeurs tirées de TI SBAS444E (mai 2009, révisée en décembre 2024) : figure 7-1, §7.3.1 et §8.1.3, tableau 7-1, §5.5, tableaux 6-1 et 6-2, §6.1. Valeurs typiques à VDD = 3.3 V et 25 °C ; bruit mesuré entrées court-circuitées.* |
| `alt` | EN *Six panels redrawn from the ADS1115 datasheet. The title: a 16-bit, 860 samples-per-second I²C converter. The block diagram: four inputs, a multiplexer that pairs them, a programmable gain amplifier, a sigma-delta modulator and digital filter, an I²C interface, with the reference and oscillator inside. Six full-scale ranges from ±6.144 V to ±0.256 V, one count from 187.5 µV to 7.8125 µV. The differential input impedance falls from 22 MΩ to 710 kΩ as the range narrows, while the common-mode impedance is highest, 100 MΩ, on the two finest ranges. The noise tables: on ±0.256 V the RMS noise is 7.81 µV, one count, at every data rate, and the peak-to-peak noise rises from 7.81 µV at 8 samples a second to 35.83 µV at 860, where 13.8 of the 16 bits are free of noise.* · FR *Six panneaux redessinés d'après la fiche technique de l'ADS1115. Le titre : un convertisseur I²C de 16 bits, 860 échantillons par seconde. Le schéma : quatre entrées, un multiplexeur qui les apparie, un amplificateur à gain programmable, un modulateur sigma-delta et un filtre numérique, une interface I²C, avec la référence et l'oscillateur intégrés. Six pleines échelles de ±6.144 V à ±0.256 V, un pas de 187.5 µV à 7.8125 µV. L'impédance d'entrée différentielle baisse de 22 MΩ à 710 kΩ quand la gamme se resserre, alors que l'impédance de mode commun est la plus haute, 100 MΩ, sur les deux gammes les plus fines. Les tableaux de bruit : sur ±0.256 V, le bruit efficace vaut 7.81 µV, un pas, à tous les débits, et le bruit crête à crête passe de 7.81 µV à 8 échantillons par seconde à 35.83 µV à 860, où 13.8 des 16 bits sont exempts de bruit.* |
| `zoom` | `z-cover` [0, 0, 0.5, 0.3333] · `z-block` [0.5, 0, 0.5, 0.3333] · `z-pga` [0, 0.3333, 0.5, 0.3333] · `z-imp` [0.5, 0.3333, 0.5, 0.3333] · `z-noise` [0, 0.6667, 0.5, 0.3333] · `z-0256-61` [0.2938, 0.6704, 0.2, 0.1611] · `z-0256-62` [0.2938, 0.8370, 0.2, 0.1611] · `z-defs` [0.5, 0.6667, 0.5, 0.3333] |

**Showing 1** (`reveal: shown`, no tour): the six cells as features, each `rect` = its cell, `line: dotted`, `fill: none`.

| # | id | Label EN · FR | Note EN · FR |
|---|---|---|---|
| 1 | `cell-cover` | *The cover* · *La couverture* | *What the part promises: 16 bits, 860 samples a second, I²C.* · *Ce que promet le composant : 16 bits, 860 échantillons par seconde, I²C.* |
| 2 | `cell-block` | *Block diagram and multiplexer* · *Schéma fonctionnel et multiplexeur* | *Figure 7-1 and §7.3.1.* · *Figure 7-1 et §7.3.1.* |
| 3 | `cell-pga` | *Ranges and step size* · *Gammes et pas* | *Table 7-1.* · *Tableau 7-1.* |
| 4 | `cell-imp` | *Input impedance by range* · *Impédance d'entrée selon la gamme* | *§5.5.* · *§5.5.* |
| 5 | `cell-noise` | *Noise against data rate* · *Bruit selon le débit* | *Tables 6-1 and 6-2.* · *Tableaux 6-1 et 6-2.* |
| 6 | `cell-defs` | *How the noise table is read* · *Comment lire le tableau de bruit* | *§6.1, Equations 1 and 2.* · *§6.1, équations 1 et 2.* |

**Showings 2 and 3** (`reveal: on-tour`): the detail features (fractions of the artboard; regions inside C2 and C3 fixed on
the render; C5's from §3a's grid).

| # | id | `rect` | Colour | Label EN · FR | Note EN · FR |
|---|---|---|---|---|---|
| 1 | `col-0256-61` | [0.3594, 0.6870, 0.0641, 0.1444] | `amber` | *±0.256 V: RMS (peak-to-peak), µV* · *±0.256 V : efficace (crête à crête), µV* | *RMS: 7.81 µV, one count, at every rate. Peak-to-peak: 7.81 µV up to 64 SPS, then 12.35, 18.53, 25.95 and 35.83 µV at 860 SPS, × 4.6.* · *Efficace : 7.81 µV, un pas, à tous les débits. Crête à crête : 7.81 µV jusqu'à 64 SPS, puis 12.35, 18.53, 25.95 et 35.83 µV à 860 SPS, × 4.6.* |
| 2 | `block-chain` | [0.5125, 0.0444, 0.475, 0.1481] | `amber` | *AIN0–AIN3 → MUX → PGA → ΔΣ modulator → digital filter → I²C* · *AIN0–AIN3 → MUX → PGA → modulateur ΔΣ → filtre numérique → I²C* | *The modulator samples at 250 kHz (the 1 MHz oscillator ÷ 4); the filter averages. Reference and oscillator are inside: neither can be supplied from outside.* · *Le modulateur échantillonne à 250 kHz (l'oscillateur de 1 MHz ÷ 4) ; le filtre moyenne. Référence et oscillateur sont intégrés : aucun des deux ne peut venir de l'extérieur.* |
| 3 | `mux-pairs` | [0.5125, 0.0370, 0.1188, 0.1704] | `amber` | *MUX: AIN0–AIN1 and AIN2–AIN3, read as differences* · *MUX : AIN0–AIN1 et AIN2–AIN3, lues en différence* | *Also AIN0–AIN3, AIN1–AIN3, or any input against GND (MUX[2:0]). What both inputs share is rejected, as long as each input stays between GND and VDD: 0 to 3.3 V here.* (F-c5-1 (a), decided 2026-10-21: the limit stated here, on the wall at s3 while p5 is spoken, and in the teacher tip, §7d; D2·020-F12) · *Aussi AIN0–AIN3, AIN1–AIN3, ou toute entrée contre GND (MUX[2:0]). Ce que les deux entrées partagent est rejeté, tant que chaque entrée reste entre GND et VDD : 0 à 3.3 V ici.* |
| 4 | `pga-table` | [0.0125, 0.3556, 0.3, 0.2963] | `amber` | *PGA: six ranges; one count = range / 32,768* · *PGA : six gammes ; un pas = gamme / 32,768* | *187.5 µV on ±6.144 V, 7.8125 µV on ±0.256 V. 5 mV spans 640 counts on the finest range.* · *187.5 µV sur ±6.144 V, 7.8125 µV sur ±0.256 V. 5 mV couvrent 640 pas sur la gamme la plus fine.* |
| 5 | `zdiff` | [0.5125, 0.3926, 0.475, 0.1185] | `amber` | *Differential: 22 MΩ down to 710 kΩ* · *Différentielle : de 22 MΩ à 710 kΩ* | *The load between the two inputs, lowest on the finest ranges. A bridge of 10 kΩ arms (10 kΩ between its outputs) on 710 kΩ reads 1.39 % low.* (N2) · *La charge entre les deux entrées, la plus basse sur les gammes les plus fines. Un pont de bras de 10 kΩ (10 kΩ entre ses sorties) sur 710 kΩ lit 1.39 % trop bas.* |
| 6 | `zcm` | [0.5125, 0.5407, 0.475, 0.1185] | `azure` | *Common-mode: 3 MΩ to 100 MΩ* · *Mode commun : de 3 MΩ à 100 MΩ* | *From each input to the chip's own level; highest, 100 MΩ, where the differential is lowest.* · *De chaque entrée au niveau interne de la puce ; la plus haute, 100 MΩ, là où la différentielle est la plus basse.* |
| 7 | `rate-osr` | [0.4234, 0.6870, 0.0688, 0.1444] | `lime` | *Data rate, and modulator samples per result (OSR, ours)* · *Débit, et échantillons du modulateur par résultat (OSR, calculé)* | *250 kHz ÷ data rate: 31,250 samples averaged at 8 SPS, 291 at 860 SPS.* · *250 kHz ÷ débit : 31,250 échantillons moyennés à 8 SPS, 291 à 860 SPS.* |
| 8 | `cover-16bit` | [0.0625, 0.0926, 0.375, 0.0630] | `amber` | *On the cover: 16 bits* · *En couverture : 16 bits* | — |
| 9 | `col-0256-62` | [0.3594, 0.8537, 0.0641, 0.1444] | `amber` | *±0.256 V: effective (noise-free) resolution, bits* · *±0.256 V : résolution effective (sans bruit), bits* | *Effective, from RMS (Eq. 1): 16 at every rate. Noise-free, from peak-to-peak (Eq. 2): 16 up to 64 SPS, then 15.33, 14.75, 14.26 and 13.8 at 860 SPS.* · *Effective, d'après l'efficace (éq. 1) : 16 à tous les débits. Sans bruit, d'après le crête à crête (éq. 2) : 16 jusqu'à 64 SPS, puis 15.33, 14.75, 14.26 et 13.8 à 860 SPS.* |
| 10 | `rms-0256` | [0.3594, 0.6870, 0.0281, 0.1444] | `amber`, dashed | *RMS* · *Efficace* | *One count at every rate: the table never reports less.* · *Un pas à tous les débits : le tableau ne donne jamais moins.* |
| 11 | `pp-0256` | [0.3875, 0.6870, 0.0359, 0.1444] | `rose` | *Peak-to-peak* · *Crête à crête* | *Where the growth shows.* · *Là où la croissance se voit.* |
| 12 | `eff-0256` | [0.3594, 0.8537, 0.0281, 0.1444] | `amber`, dashed | *Effective resolution* · *Résolution effective* | *log₂(FSR / V_RMS): 16 everywhere.* · *log₂(FSR / V_RMS) : 16 partout.* |
| 13 | `nf-0256` | [0.3875, 0.8537, 0.0359, 0.1444] | `rose` | *Noise-free resolution* · *Résolution sans bruit* | *log₂(FSR / V_PP): 16 down to 13.8.* · *log₂(FSR / V_PP) : de 16 à 13.8.* |

Features 10–13 are the brief's *RMS · peak-to-peak · noise-free bits* view, as the Figure Bench can carry it: clickable in
Study and Scope (one press each), not toured on the wall, where features 1 and 9 show both sub-columns at once (B17).
FR drafts ours, for the owner's review; numbers and units never translated.

**Meet the parts** (B3): s0, the whole sheet with the six cells labelled, at p0 (*"Now we open the ADS1115's datasheet"*),
before anything is asked.

**Colours and their second channel** (C4): amber and azure bars also by their band's label and the azure hatch; rose
figures also **bold**; the dashed pair also by its bracket label *AIN2–AIN3*; our columns also by *italics* and *(ours)*;
SCL and SDA by their pin names.

### 3c. The equation (`ads1115-loading`), D1·040's form

| Field | Content | Source |
|---|---|---|
| `title` | EN *The ADS1115 as a load* · FR *L'ADS1115 comme charge* | the card |
| `statement` | `Vr = Vs * Rin / (Rin + Rs)` | D1·040 card 6's `input-loading`, verbatim (`D1-040-06-high-in-low-out.md` §3a) |
| `caption` | EN *Yesterday's loaded divider, with the ADS1115's differential input impedance as the load. Each dot is one full-scale range.* · FR *Le diviseur chargé d'hier, avec l'impédance d'entrée différentielle de l'ADS1115 comme charge. Chaque point est une pleine échelle.* | p7, p10 |
| `symbols` | `Vr` *Reading* (V), note *what the converter sees between its inputs* · `Vs` *Bridge's open-circuit output* (V), note *5 mV here, the size of card 1's signal* · `Rin` *Differential input impedance, Z_diff* (Ω), note *SBAS444E §5.5, by range* (amber) · `Rs` *Bridge's output impedance* (Ω), note *a bridge of 10 kΩ arms: 10 kΩ between its outputs* (lime) · `I` *Current through the input* (A) | D1·040 symbols; N2. Colours: this module's palette (amber = the ADS1115), so R_in is amber here where D1·040 drew it azure |
| `highlights` | term `Rin / (Rin + Rs)` — EN *the share of the bridge's signal that reaches the converter: 98.61 % on the finest ranges* · FR *la part du signal du pont qui atteint le convertisseur : 98.61 % sur les gammes les plus fines* | §8 |
| `derivation` | (1) `I = Vs / (Rs + Rin)`, note *the bridge's output impedance and the converter's input are in series* · (2) `Vr = I * Rin`, note *the converter reads the drop across its own input* · (3) the statement, note *D1·040's loaded divider* | Ohm's law |
| `examples` | Rs 10000, Vs 0.005 throughout: **E1** *±6.144 V* Rin 22e6 → **4.998 mV**, note *0.045 % low, 0.01 count*; **E2** *±4.096 V* 15e6 → **4.997 mV**, *0.067 %*; **E3** *±2.048 V* 4.9e6 → **4.99 mV**, *0.20 %, 0.16 count*; **E4** *±1.024 V* 2.4e6 → **4.979 mV**, *0.41 %, 0.66 count*; **E5** *±0.512 V* 710e3 → **4.931 mV**, *1.39 %, 4.4 counts*; **E6** *±0.256 V* 710e3 → **4.931 mV**, *1.39 % low: 69 µV, 8.9 counts of this range*; **E7** *A 350 Ω strain-gauge bridge on ±0.256 V* Rs 350, Rin 710e3 → **4.998 mV**, *0.049 %* (F-c5-5 (a), decided 2026-10-21; N2) | §8 |
| `boundaries` | `Rs < Rin / 100`, EN *Within 1 % (D1·040's knee)* · FR *À moins de 1 % (le coude de D1·040)*, kind valid | D1·040 card 6's boundary, reused |
| `assumptions` | (1) *The input is a resistor* — breaksWhen *it is a switched capacitor whose average current looks resistive (SBAS444E §7.3.2); the value drifts with the oscillator* — simplifying · (2) *Only the differential impedance loads the bridge* — breaksWhen *its two outputs see unequal resistances: each output's 5 kΩ against the 100 MΩ common-mode impedance is a 0.005 % effect* — simplifying · (3) *Typical values* — breaksWhen *§5.5 gives no minimum: a real part may load more* — limiting | §7.3.2, §5.5 |
| `graph` | `against: Rin`, `domain: [1.0e5, 1.0e8]` Ω, `scale` x `log`, y linear; `hold` Rs (100–1.0e5 Ω, default 1.0e4), Vs (0.001–0.1 V, default 0.005); `compare` Rs at [350, 10000]; `markExamples: true` (F-c5-5 (a), decided 2026-10-21) | the PLAN's *"input impedance … stepped through the datasheet's values for each range"* |
| `notes` | `include: true` | print |

## 4. The run: step by step, as the Flow goes

### 4a. Steps (F-c5-3 (a), decided 2026-10-21 and applied in `en.md`: six fences, p0 · p1–p2 · p3–p7 · p8–p9 · p10 · p11–p12, no word changed)

The PLAN's tour order is block diagram → MUX → PGA → impedance → noise table; the Flow asks about noise **first** (p1),
reveals in the noise table (p3), walks the chip (p4–p7), asks the numeric **inside** the walk (p8) and comes back to the noise
table **last** (p11–p12). The steps follow the Flow, paragraph by paragraph:

| # | Block · id (tour stop, zoom) | Flow paragraph (first words) | What changes (`say`) | Presenter's control |
|---|---|---|---|---|
| 0 | showing 1 · the sheet (no tour) | p0 *"We met sigma-delta conversion…"* | Six pages of the ADS1115's datasheet, redrawn: the chip, its ranges, its load, its noise. | (the card opens) |
| — | the POE (§7a) | p1 *"[[ask]] Find the table…"*, p2 | | the activity |
| 1 | showing 2 · `col-0256-61`, `z-0256-61` | p3 *"[[reveal]] The noise rises with the data rate, in the peak-to-peak figures…"* | On ±0.256 V the RMS column stays at one count; the peak-to-peak figures grow from 7.81 to 35.83 µV. | (the showing opens here) |
| 2 | `block-chain`, `z-block` | p4 *"[[demo]] The block diagram first…"* | Four inputs, a multiplexer, a gain stage, a sigma-delta modulator and filter, I²C: reference and clock inside. | Next |
| 3 | `mux-pairs`, `z-block` | p5 *"The multiplexer can pair its inputs…"* (HARVEST S16) | The multiplexer reads AIN0 against AIN1, AIN2 against AIN3: a difference. | Next |
| 4 | `pga-table`, `z-pga` | p6 *"The PGA sets the full-scale range…"* | Six ranges; one count is the range over 32,768: 187.5 µV down to 7.8 µV. | Next |
| 5 | `zdiff`, `z-imp` | p7 *"Now the differential input impedance…"*; held to its end | The differential impedance falls from 22 MΩ to 710 kΩ as the range narrows. | Next |
| — | the numeric (§7a) | p8 *"[[ask]] If a 10 kΩ bridge…"*, p9 | | the activity |
| e1 | the Equation, Graph pane, E6 pinned | p10 *"About 10 k out of 720 k: 1.4 %…"*; the strip's line | Each range is a dot on yesterday's divider: the finest two read 1.39 % low. | pane, pin |
| 6 | showing 3 · `rate-osr`, `z-0256-61` | p11 *"Finally, the noise table…"* | The faster the rate, the fewer modulator samples each result averages: 31,250 at 8 SPS, 291 at 860. | (the showing opens here) |
| 7 | `cover-16bit`, `z-cover` | p12 *"Sixteen bits on the cover,"* | The cover promises 16 bits. | Next |
| 8 | `col-0256-62`, `z-0256-62` | p12 *"…and a table inside showing how many of them stay free of noise…"* (HARVEST S20); held over the SEED S52 | All 16 noise-free at 8 SPS, 13.8 at 860 on ±0.256 V. | Next leads to card 6 |

**The strip's line at e1** (the presenter's, ≈ 25 words; F-c5-5 (a), decided 2026-10-21): *"Each dot is a range. The wide ranges barely
touch the bridge; the two finest take 1.4 %, nearly nine of their own counts, at 5 mV."*

### 4b. Motion, cues and stills

| # | Motion | Movers | Cue and its second channel | Hold | Reduced motion (C3) | Still |
|---|---|---|---|---|---|---|
| 0 | none | 0 | the six cells, labelled | hold | whole | s0 |
| 1–8 | the zoom to the stop's target (the bench's own, `quick`) and the feature at full emphasis, the rest dimmed | 1 | the region lit, its badge and key entry; rose values bold | hold | the zoomed view at once | s1–s8 |
| e1 | none (the pane and the pin) | 0 | E6's dot and its row in the Example pane | hold | same | e1 |

Ten stills. Nothing moves but the zoom.

## 5. Pacing and interaction, by surface and view

**Who paces** (B12): the presenter on the wall (the tour's step, the zoom, the Equation's pane and pin are mirrored); the
learner in Study and Scope.

| View | Who | Controls |
|---|---|---|
| Preview (in the slide) | everyone | the figure at its current stop; the Equation's current pane |
| View (details) | everyone | the *Walk* pane and key; the eight zoom targets; features 10–13 (*RMS · peak-to-peak · effective · noise-free*) one press each; on the Equation, Rs and Vs held sliders |
| Edit (session only) | everyone | not specified for either bench |
| Authoring | authors | the three `figure` blocks and the `equation` block's YAML; the SVG |

- **The presenter's strip** (B20): *stop n*, the next `say` and the clause it waits for (s7 *"Sixteen bits on the cover,"*;
  s8 *"and a table inside"*); e1's line; the S52 seed's words at s8; the teacher tip (§7d).
- **Study and Scope**: the walk learner-paced; after it, the four noise features and the common-mode band (`zcm`) by click;
  the Equation's sliders: the room's own source resistance against the six ranges.
- **Phone** (C6): each cell fills the width at its zoom; the noise cell opens at `z-0256-61` (the full tables pan with two
  fingers); the key under the figure.
- **Locked**: showing 2 opens after the POE closes; the Equation after the numeric closes.

## 6. The frame

| Tile / panel | Used? | Selected item | List / contents |
|---|---|---|---|
| Figure: Walk | yes (showings 2, 3) | the active stop | s1–s5; s6–s8, with notes |
| Figure: key | yes | — | the features as revealed |
| Figure: zoom | yes, per stop; Study, phone | — | *Whole*, the eight targets of §3b |
| Equation: Graph, Example, Proof, Terms | yes | E6 pinned (1.39 %) | E1–E7; the three derivation steps; the highlighted share |

## 7. Thinking, not watching

- **7a. The PLAN's ASKs, HARVESTs and SEED** (verbatim):
  - *ASK poe (before the noise table) — "As the data rate goes up, what does the noise do?" · options: It rises | It falls |
    It stays the same · answer: It rises · reveal: spotlight on the noise table's ±0.256 V column, peak-to-peak, 8 SPS row to
    860 SPS row (7.81 → 35.83 µV) · explain: Each output is the digital filter's average over the modulator's samples, and a
    faster output rate averages fewer of them over a wider bandwidth, so more noise gets through. The RMS column stays at one
    count, 7.81 µV, at every rate: the table never reports less than one count. The peak-to-peak figures in brackets show the
    growth. · depth: understand · practice: analysing data.* Fires at p1, **after s0 and before showing 2**; s1 is its reveal.
  - *ASK numeric (after the impedance stop) — "At its two smallest full-scale ranges the ADS1115's differential input impedance is
    about 710 kΩ (confirm on the page). A 10 kΩ bridge drives it. What loading error is that, in per cent?" · answer: 1.4 % ±
    0.2 % · reveal: Equation — the loaded divider from D1·040, input impedance on its slider, stepped through the datasheet's
    values for each range · explain: Source and input form a divider, 10 k / (10 k + 710 k) ≈ 1.4 %, and because the input
    impedance falls as the gain rises, the range that resolves the bridge best also loads it hardest. · depth: use · practice:
    computational thinking.* Fires at p8, **after s5** (the Flow asks it inside the walk; the PLAN read *"after the tour"*
    until F-c5-3 (a), decided 2026-10-21 and applied in `en.md`); e1 is its reveal.
  - *HARVEST S20 — "Yesterday: more bits are not more accuracy, and ENOB is the honest number. Here is a datasheet saying so
    itself: sixteen bits on the cover, and a table inside showing how many of them stay free of noise at each data rate."*
    Spoken as p12 at **s7–s8**.
  - *HARVEST S16 — "The multiplexer pairs its inputs, AIN0 against AIN1. That is yesterday's in-amp idea built into the
    converter: measure the difference, ignore what both inputs share."* Spoken as p5 at **s3**; the input range it leaves unstated is on the figure at s3 (`mux-pairs`) and in
    the teacher tip (F-c5-1 (a), decided 2026-10-21; D2·020-F12).
  - *SEED plants S52 — "Keep this table in mind: noise that grows with data rate. In the next module we find out how fast it
    grows, and where noise comes from."* Spoken at **s8, held**, after p12 (F-c5-2 (a), decided 2026-10-21 and applied in
    `en.md`; D2·020-F13).
- **7b. Prediction points**: none added (the POE is the prediction; the numeric is computed).
- **7c. After the reveals**: the PLAN's two explains. In Study, done means both answered and the walk reached s8.
- **7d. Teacher tip** (F-c5-6 (a), decided 2026-10-21, as written; its last sentences F-c5-1 (a); presenter only): *Expect someone to read the RMS column: "7.81 µV at every rate,
  the noise did not rise." True: the RMS column is one count at every rate **and every range**, so the table's effective
  resolution, log₂(FSR / V_RMS), is 16 bits everywhere; the table never reports less than one count. The growth is in the
  peak-to-peak figures, and the noise-free resolution is read from those. Expect also someone to set the table's 16 beside
  yesterday's ENOB: not the same formula. For the same noise, log₂(FSR / σ) reads **1.79 bits above** (SINAD − 1.76) / 6.02
  (log₂ 2√3 = 1.79; D1·080 card 8, F7), and the noise-free figure reads lower still: 2.2 bits under the effective one at
  860 SPS here (log₂(35.83 / 7.81)). Ask: which of the three would you quote for a reading you must trust every time? (The
  noise-free one.) If someone looks at ±2.048 V: 84.03 µV at 250 SPS, 79.08 at 475, typical data from one measurement, not
  a law. And sixteen noise-free bits are not sixteen accurate ones: at ±2.048 V the offset is up to ±3 counts and the gain
  error up to 0.15 % (§5.5); the 10 kΩ bridge's own loading, 1.39 %, is nine times that, and it drifts with the chip's
  oscillator. That error is a gain error: calibration, later today, takes most of it out. At s3, expect someone to take
  "yesterday's in-amp idea built into the converter" at its word and wire yesterday's 12 V shunt straight to AIN0 and AIN1.
  It rejects what both inputs share only as long as each input stays between GND and VDD: 0 to 3.3 V here (§5.3; beyond
  GND − 0.3 V or VDD + 0.3 V its protection diodes conduct, §7.3.1). Yesterday's in-amp had both inputs near 12 V; the
  INA226 of card 7 is the part built for a 0–36 V common mode.*
- **7e. Explore** (Study and Scope, after the walk): the four noise features; the common-mode band; on the Equation, Rs
  from 100 Ω to 100 kΩ against the six dots (where does the finest range cross the 1 % line? at Rs = 7.1 kΩ).

## 8. Faithfulness (the quality bar)

**Every number, recomputed (Node, 2026-10-21)**, against SBAS444E as extracted (`scratchpad/ds/ads1115.txt`):

- **Steps** (Table 7-1, Eq. 4): 6.144 / 32,768 = **187.5 µV**; 4.096 → 125; 2.048 → 62.5; 1.024 → 31.25; 0.512 → 15.625;
  0.256 / 32,768 = **7.8125 µV** = 0.512 / 65,536 ✓ (Eq. 4's FSR is the full span; the Flow's *"the range divided by
  32,768"* takes the ± value: the same number, and C3 prints both forms). The PLAN's *"LSB = FSR/2¹⁵"* uses the ± value ✓.
- **5 mV spans** (our column): 5 / 0.1875 = **26.7** (*≈ 27*), 40, 80, 160, 320, **640** counts ✓ (card 1's 640).
- **Differential impedance and loading** (§5.5; R_s = 10 kΩ): 10/(10 + 22,000) = **0.045 %**; 15 MΩ **0.067 %**; 4.9 MΩ
  **0.204 %**; 2.4 MΩ **0.415 %**; 710 kΩ **1.389 %** (10/720) ✓ the Flow's *"About 10 k out of 720 k: 1.4 %"* and the
  numeric's 1.4 % ± 0.2 % (10/710 = 1.408 % also inside). The bridge: four 10 kΩ arms, each output 10 k ∥ 10 k = 5 kΩ, so
  5 + 5 = **10 kΩ between the outputs** ✓ N2. E1–E7 at V_s = 5 mV: V_r = **4.9977, 4.9967, 4.9898, 4.9793, 4.9306, 4.9306,
  4.9975 mV**, printed by `formatQuantity` (4 significant figures, zeros dropped) as *4.998, 4.997, 4.99, 4.979, 4.931,
  4.931, 4.998 mV*; the shortfall at 710 kΩ is **69.44 µV = 8.89 counts** of ±0.256 V (4.44 of ±0.512 V); at 2.4 MΩ
  20.75 µV = 0.66 count of ±1.024 V; at 4.9 MΩ 0.16 count; at 22 MΩ 0.012. The 350 Ω bridge on 710 kΩ: **0.049 %**.
  The share at 710 kΩ: 710/720 = **98.61 %**. The 1 % line on 710 kΩ: R_s = 7.1 kΩ.
- **Common-mode** (§5.5): 10, 6, 6, 3, 100, 100 MΩ ✓; each output's 5 kΩ on 100 MΩ = **0.005 %**.
- **Noise** (Tables 6-1, 6-2): RMS = one LSB at every rate and range (187.5, 125, 62.5, 31.25, 15.62, 7.81 µV as printed) →
  log₂(FSR / V_RMS) = **16.000** on every range ✓. ±0.256 V peak-to-peak 7.81 ×4, 12.35, 18.53, 25.95, **35.83 µV**: 35.83 /
  7.81 = **× 4.59**. Noise-free bits from Eq. 2 recomputed: ±0.256 V 16, 16, 16, 16, 15.34, 14.75, 14.27, **13.80**; the page
  prints 15.33, 14.75, 14.26, 13.8, and on other ranges 15.13, 15.07, 14.95, 14.61, 14.9 where Node gives 15.14, 15.08, 14.96,
  14.62, 14.91: **the page truncates to two decimals** (seven cells differ by 0.01). The figure prints the page's figures (D2);
  *"under fourteen at 860"* holds either way (13.80) ✓; *"all sixteen at 8 samples a second"* ✓ (16 on every range at 8 SPS).
- **OSR** (§7.3.2: fMOD = 1 MHz / 4 = 250 kHz): 250,000 / 8 = **31,250**; /16 15,625; /32 7,812.5 (*7,813*); /64 3,906.25
  (*3,906*); /128 1,953.1 (*1,953*); /250 **1,000**; /475 526.3 (*526*); /860 **290.7** (*291*) ✓.
- **1.79 bits**: log₂(2√2 · √1.5) = log₂ 2√3 = **1.7925** ✓ (D1·080 card 8 §14 F7). log₂(35.83/7.81) = **2.20** = 16 − 13.80 ✓.
- **Gain error against loading**: 1.389 / 0.15 = **9.26** (§5.5: 0.15 % max at ±2.048 V, 25 °C; offset ±3 LSB max).
- **S52's √bandwidth** (for §14 F-c5-7): ±0.256 V pp 860/250 = ×1.934 against √3.44 = 1.855; 475→860 ×1.381 against
  1.346; 128→860 ×2.901 against 2.592; 8→860 ×4.588 against √107.5 = **10.37**.

**Section D, Figure rows**
- [x] **Redrawn, cited**: our own drawing of six extracts, each cell's source at its foot, the caption naming SBAS444E (D2);
  no vendor image, no logo. *Redrawn from …* on every cell ✓.
- [x] Named parts on the right features: C5's fractions from §3a's grid; C2's and C3's fixed on the render.
- [x] Legible at 1920 × 1080 when zoomed to its targets: §10 (the noise tables only through `z-0256-61` and `-62`).
- [x] Nothing cropped that the point depends on: both sub-columns in every ±0.256 V feature; the rate column beside them.

**Section D, Equation rows**: symbols as D1·040's (V_r, V_s, R_in, R_s) ✓; units carried (V, Ω) ✓; E1–E7 recomputed above to
the printed figures ✓; slider ranges real (R_s 100 Ω – 100 kΩ covers a 350 Ω gauge to a 100 kΩ potentiometer source) ✓.

**A1–A8** (on the owner's current text and on this spec): **A1** ✓ every number above. **A2** ✓ D2·020-F1's reading (the
±0.256 V column in peak-to-peak; the RMS column flat) and F4's (differential named) hold on every surface; the MCU model is
not used on this card. **A3** ✓ *"under fourteen at 860"* (13.80); *"lowest on the most sensitive ranges"* (a tie, 710 kΩ on
±0.512 and ±0.256 V: *"loads it hardest"* still true, none loads harder); ±6.144 V unreachable at 3.3 V (footnote drawn).
**A4**: S16 against D1·060's seed ✓ the words; D1·060's in-amp sat at 12 V, so the ADS1115's 0–3.3 V input range is stated
on the figure at s3 and in the tip (F-c5-1 (a), decided 2026-10-21; D2·020-F12) ✓; S20 against D1·080's seed ✓
(*"a real noise table in bits"*); *"the meter on Day 1"* against D1·040 card 5 (10 MΩ handheld) ✓; *"We met sigma-delta …
(080)"* against D1·080 card 6 ✓; the Equation is D1·040 card 6's form and boundary ✓; S52 against D2·030 ✓ as reworded (F-c5-2 (a): *"In the next module"* is
D2·030, the next on the path; *"how fast it grows"* is its √bandwidth, which p11's *"why"* does not already give), and the
harvests at D2·030 and D2·040 flagged (F-c5-7). **A5** ✓ the mechanism of p11 (§6.1: *"the input-referred noise drops when reducing the output
data rate because more samples of the internal modulator are averaged"*); the switched-capacitor input as an average
resistance (§7.3.2) stated as assumption 1; *"The reference and the clock are inside the chip"* (§7.3.4: *"An external
reference cannot be used"*; §7.3.5: *"No external clock can be applied"*) ✓. **A6**: *"ignore what both inputs share"*
✓ with its unstated limit now on the figure and in the tip (F-c5-1 (a)); *"In half an hour"* (≈ 17–22 min) replaced in
`en.md` by *"In the next module"* (F-c5-2 (a), D2·020-F13) ✓; *"of the order of 700 kΩ"* ✓; the explain's *"the table never reports less than one
count"* ✓ (minimum 7.81 µV = one LSB). **A7** ✓ every value cited to its table or section above. **A8** ✓ section D.

**Simplifications and their on-bench labels** (A6): *"Our own redrawn extracts, not the maker's pages … Typical values"*
(caption); *"bars ours, from the table's values; typical"* (C4); *"(ours)"* on the two computed columns; *"drawn as §7.1
describes it, a modulator and a digital filter"* (C2); the Equation's three assumptions.

## 9. Faults and non-ideal behaviour

**PLAN FAULT**: none. Non-ideal behaviour the card shows or carries: the **loading** (1.39 % on the finest ranges, e1); the
**typical** status of every impedance and noise figure (no minimum, assumption 3); the impedance's **drift** with the
oscillator (§7.3.2, assumption 1); the unreachable codes on ±6.144 and ±4.096 V at 3.3 V (C3's footnote); the
**non-monotonic** ±2.048 V peak-to-peak (84.03 → 79.08 µV, 250 → 475 SPS; teacher tip); offset, gain error and INL that
noise-free bits do not include (teacher tip); the input range, GND to VDD (F-c5-1 (a): the `mux-pairs` note at s3 and the
teacher tip). Not shown: aliasing around fMOD (§9.1.4; D2·040's).

## 10. Accessibility, legibility and print

- **Wall (C2)**: the Figure stage draws a 1600-unit width at **≈ 0.69 px per unit** at 1920 × 1080 (as measured for
  `D2-010-09` §10), so a cell zoomed whole needs **62 units** for the 43 px floor (32 pt). C1–C4 and C6 are laid out to it:
  box names in C2 at 62 units (*ΔΣ modulator* and *digital filter* on two lines, boxes 330 and 270 wide), Table 7-1 at 62
  units in 100-unit rows, C4's range and value labels at 62 units over 233-unit columns (*710 kΩ* ≈ 204). **C5 cannot carry
  two 8 × 12 tables at 62 units**: its body is 31 units (≈ 21 px, read in Study), and the wall reads it **only through
  `z-0256-61` and `z-0256-62`** (cell-local 640 × 435), which magnify it 900 / 435 = **2.07 ×**: 31 × 2.07 × 0.69 = **44 px**
  ✓, with the ±0.512 V column beside for comparison. *430.06* at 31 units ≈ 102 units in a 115-unit sub-column ✓. Check at
  1920 × 1080 and 1024 × 768, EN and FR (FR labels on two lines where longer). Fallback if a cell misses: the cell as its own
  image (the same layout), one `figure` block per cell.
- **Reduced motion (C3)**: the zoom lands at once; every stop is a still.
- **Colour (C4)**: §3b's second channels; checked under the three simulations on both themes' grounds.
- **Keyboard (C5)**: the tour's keys; the Equation's pane and pin keys.
- **Print (C8)**: s0 (the sheet), s1, s5, e1 (the graph and Example pane with E1–E7), s8, each with its `say`; the caption,
  the alt and C6's two definitions.

## 11. Assets to make or source

| Asset | Format | Made by | Status |
|---|---|---|---|
| `figures/d2-020-ads1115-datasheet.svg` (§3a), every value off SBAS444E | SVG, rendered for the owner first (a visual milestone) | the author | to make |
| The three `figure` blocks (§3b), EN and FR | YAML in `en.md` | the author | to write |
| The `equation` block `ads1115-loading` (§3c), EN and FR | YAML in `en.md` | the author | to write |
| SBAS444E itself | PDF, cited only, not shown (D2) | TI | read 2026-10-20 |

## 12. Bench capabilities this needs

**Figure Bench, exists** (read 2026-10-21): `rect` features, colours, `line: dashed`, `label`/`note` `{en, fr}`, mirrored
`tour` with a `zoom` per stop, `zoom` targets by `rect`, `reveal: shown | on-tour`, `labels: numbers`, `spotlight: dim`.
**Equation Bench, exists**: statement, symbols, highlights, derivation, examples, boundaries, assumptions, graph with log x,
`hold`, `compare` (two values), `markExamples`; pane, pin and step mirrored.

**To confirm when written**: (a) **three `figure` blocks on one image under one heading**, with an activity, an `equation`
and six Flow fences between them, compile in that order, each opening at its own first stop (D2-010-07 relies on the same rule for two showings
of one plot: occurrence ids, `compiler/blockId.ts`); (b) under `reveal: on-tour`, the untoured features 10–13 and `zcm` are clickable in Study after the walk; (c)
a zoom on a 640 × 435-unit rect fits the stage by height (the 2.07 × of §10); (d) the Equation's y axis scales to the data
(4.5–5 mV) so the six dots separate (at 1e5 Ω, 10 kΩ gives 4.545 mV).

**Missing**: none for this card. **Would help, not asked**: a Figure *views* switch (the brief's radio) would let one table
show RMS, peak-to-peak or noise-free bits in turn; features 10–13 carry it today. **Not this card's**: an ADS1115 simulation
(*"Neither part has a simulation model"*, the module's PATH note); aliasing (D2·040).

## 13. Stand-in for the lecture

None needed: both benches exist. If the SVG is late, the brief page's `draw5` (approved) exported as five stills carries
s2–s5 and the noise view, and `upd5` as stills carries e1; they lose the cover and C6, the zooms (the stills are already
cropped) and the bilingual key. The SVG is new work either way; `draw5`'s geometry is its starting layout.

## 14. Findings for the owner

Round two, **all decided by the owner 2026-10-21** (*"Apply all recommended (a)"*) and applied (each kept as it was put; the
decision marked). The two **accuracy** items were registered as **D2·020-F12** (F-c5-1) and **D2·020-F13** (F-c5-2) and are
closed by these decisions; one item flags other units' text and is carried there.

- **F-c5-1 — accuracy (A4, A6): S16 and p5, *"ignore what both inputs share"*, with no input range.** **Decided: (a).** D1·060's in-amp, which
  S16 harvests, had both inputs near **12 V** (*"both inputs near 12 V and the output at 2.0 V"*). The ADS1115 rejects what
  both inputs share (CMRR 105 dB at ±0.256 V, §5.5) **only while each input stays between GND and VDD** (§5.3: V(AINx) from
  GND to VDD; §7.3.1, Eq. 3: beyond GND − 0.3 V or VDD + 0.3 V the protection diodes conduct): 0 to 3.3 V here. A learner told *"yesterday's in-amp idea built into the
  converter"* can conclude it reads yesterday's 12 V shunt directly; card 7 then credits the INA226 with the 0–36 V common
  mode without saying the ADS1115 lacks it. Options: (a) the limit on the figure at s3 (`mux-pairs` note: *"…as long as each
  input stays between GND and VDD: 0 to 3.3 V here"*) and in the teacher tip; the Flow unchanged (**recommended**: the room
  reads it while p5 is spoken, 0 words); (b) (a) and p5 *"…ignore what both inputs share, as long as both stay between
  ground and the supply."* (+10 words, 0.08 min); (c) keep (not recommended).
- **F-c5-2 — accuracy (A3, A4): the SEED S52, *"In half an hour we find out why speed costs noise."*** **Decided: (a)**, applied in `en.md` (the recount gives
  27 words, +5, not +4 as put: §2). (i) The harvest is
  D2·030 card 3 (*Thermal noise*), about **13:05–13:10**: this card ends ≈ 12:48 (cards 1–4 ≈ 13 min with activities: 2.0, 4.2,
  1.35, 5.3; this card 5.1; from 12:30), so **≈ 17–22 min**, not half an hour. (ii) p11, two paragraphs earlier, has just told the room why
  (*"each result averages fewer samples over a wider bandwidth"*); D2·030 adds **how fast**: √bandwidth. Options: (a) *"Keep
  this table in mind: noise that grows with data rate. In the next module we find out how fast it grows, and where noise
  comes from."* (+4 words; **recommended**); (b) *"…In twenty minutes we find out why speed costs noise."* (the time only);
  (c) keep (not recommended).
- **F-c5-3 — The card's structure: six fences, three showings** (Proposal). **Decided: (a)**, applied in `en.md` (six fences, no word changed; the PLAN's
  *"numeric (after the impedance stop)"*). The Flow's order (POE on noise first, the walk,
  the numeric inside it, the noise table last) needs the figure before the POE, again after it, and again after the
  Equation. Options: (a) **figure (s0) · p0 · poe · p1–p2 · figure (s1–s5) · p3–p7 · numeric · p8–p9 · equation · p10 · figure
  (s6–s8) · p11–p12**, no word changed, and the PLAN's *"numeric (after the tour)"* read *"numeric (after the impedance
  stop)"* (**recommended**: s0 lets the POE's *"Find the table"* point at a sheet the room has just seen; as D2-010-07 F1);
  (b) five fences: p0 over the POE, the sheet first at p3 (the POE's *"Find the table"* then has nothing to find); (c) one
  fence as now (the Equation and the Figure cannot both follow the Flow).
- **F-c5-4 — Additions to the figure** (Proposals). **Decided: (a), all.** The cover cell and its stop s7 (p12's *"on the cover"*); the comparator,
  ALERT/RDY and ADDR drawn as on Figure 7-1 (not toured); the ADC drawn as modulator and filter (§7.1); the *5 mV spans* and
  *OSR* columns *(ours)*; the rate column repeated beside ±0.256 V (for the zoom); C6's two definitions; the pairs amber
  solid and dashed (our fix of `draw5`'s violet). Options: (a) all (**recommended**); (b) without the cover stop and the OSR
  column (the Flow's own words only); (c) a plain redraw of the five extracts.
- **F-c5-5 — The Equation as built** (Proposal). **Decided: (a).** The PLAN wants *"input impedance on its slider, stepped through the
  datasheet's values"*; a hold slider is **not mirrored** to the wall, so stepping it shows the room nothing. Options: (a)
  **graph against R_in (log), the six ranges as example dots, R_s compared at 10 kΩ and 350 Ω, D1·040's 1 % boundary, and the
  strip's line at e1** (**recommended**: the six values on the wall at once, and N2's two bridges side by side); (b) as the
  PLAN: graph against R_s with R_in compared at the five datasheet values (five curves on the wall; the stepping in Study
  only); (c) ask Benches for a stepped, mirrored slider (a crossing; not needed for the day).
- **F-c5-6 — The teacher tip** (Proposal, §7d). **Decided: (a), as written** (with F-c5-1's input range added). The RMS column (one count everywhere, effective resolution 16), the 1.79
  bits to D1·080 card 8's ENOB, the 2.2 bits to the noise-free figure, the ±2.048 V dip, and noise-free against accurate.
  Options: (a) as written (**recommended**); (b) the RMS column and the 1.79 bits only (D2·020-F1's minimum).
- **F-c5-7 — Flag, not this unit's to fix: the harvests downstream, against what this card now says.** **Kept as flags**, carried to the units that own the text:
  - **D2·030 (U021), HARVEST S52** *"The ADS1115's table, explained: a faster data rate means a wider bandwidth, and noise
    grows as the square root of bandwidth."* This card now shows the **RMS column flat** at one count and only the
    peak-to-peak figures growing. √bandwidth fits those figures **where they are above one count** (860/250 SPS: × 1.93
    against √3.44 = 1.85; 475 → 860: × 1.38 against 1.35) but not the table as a whole (8 → 860 SPS: × 4.59 against
    √107.5 = 10.4, the low rates floored at one count). The U020 brief's ✓ on S52 checked only 860/250. Suggested for U021:
    *"The ADS1115's peak-to-peak figures, explained: … noise grows as the square root of bandwidth, wherever it is above one
    count."* **Carried**: logged as **D2·030-F1** for unit U021. S52's reworded seed (*"how fast it grows"*, F-c5-2) makes
    that harvest's answer the one the room waits for, so the flag matters more now.
  - **D2·040 (U022), HARVEST S20** *"And these are real bits, unlike the sixteen printed on a box"* (and its Flow's *"unlike
    the ones printed on a box"*): this card has just shown the datasheet's own table giving **all sixteen noise-free at
    8–64 SPS** on every range, and 16 effective bits everywhere. **Carried**: already logged under D2·020-F1 for U022; this card's figures
    confirm it.
- **F-c5-8 — Time**: 5.1 min for the card (3.1 on the bench), 0.36 beyond its Flow and activities; module ≈ 29.6 of 30 if the
  brief's 3 min of moves do not absorb it. Reported only. **After round two**: still **5.1 / 3.1** (5.10 / 3.10; S52 now 27
  words, 0.21 min), **0.40** beyond its Flow and activities, module ≈ 29.6 of 30 on this card's account (29.64); card 6's
  round-two Flow (+71 words) is counted in its own spec (§2). Nothing is cut.

**Decided 2026-10-21, round two (owner: *"Apply all recommended (a)"*):** F-c5-1 (a) the input range on the `mux-pairs` note
at s3 and in the teacher tip, the Flow unchanged (D2·020-F12); F-c5-2 (a) S52 reworded in `en.md` (D2·020-F13); F-c5-3 (a)
six fences and the PLAN's *"numeric (after the impedance stop)"*, in `en.md`; F-c5-4 (a) all the figure's additions; F-c5-5
(a) the Equation against R_in with the six ranges as dots, 10 kΩ and 350 Ω compared, the strip's line; F-c5-6 (a) the tip as
written; F-c5-7 flags carried (D2·030-F1 for U021; D2·020-F1 for U022); F-c5-8 reported. Applied in the yaml, §2, §3a–§3c,
§4a, §7a, §7d, §8, §9 and §15. **Accuracy re-run on what changed** (A1–A7, Node, 2026-10-21, against the current `en.md`):
card 5's six fences hold the same 396 words (27 · 28, 0 · 19, 34, 32, 41, 73 · 17, 0 · 19 · 42, 64), so §2 and §4a stand;
the PLAN's quotes in §7a match `en.md` verbatim (the numeric *"after the impedance stop"*, S52 as reworded); S52 is 27
words, 0.21 min; *"the next module"* is D2·030 (*Noise*), whose card 3 harvests it ≈ 17–22 min later; the tip's range (GND to
VDD, 0 to 3.3 V; ± 0.3 V before the diodes conduct) is §5.3 and §7.3.1's; every other number as in §8, unchanged. **Nothing is
open on this card**; the spec is **spec-ready** (the SVG not yet drawn does not block).

## 15. Acceptance: how we know it is built right

- The three `figure` blocks and the `equation` compile with §3b–§3c's fields, in F-c5-3's order; the collision check passes.
- On the render: every value in C2–C6 matches SBAS444E as printed (Table 7-1, §5.5, Tables 6-1 and 6-2, Eqs. 1–2), checked
  cell by cell against the extracted text; values above one count rose and bold; the pairs amber solid and dashed, SCL and
  SDA violet, nothing else violet; the two computed columns italic and marked *(ours)*; every cell's source at its foot.
- s1 shows the ±0.256 V column with both sub-columns, 7.81 flat and 7.81 → 35.83 growing; s5 the differential band with the
  common-mode band beside it; s8 16 → 13.8; e1 six dots (two coincident at 710 kΩ) on the 10 kΩ curve, E6 pinned at
  4.931 mV, the 350 Ω curve beside, the 1 % boundary at 1 MΩ.
- B1 one region per stop; B2 only the toured region and its zoom change; B3 s0 the labelled sheet; B4 ten stills; B5 each
  `say` on the strip; B6 the lit region and its key; B9 the POE before s1, the numeric before e1; B10 no verdict on either;
  B13 key values only, p7 over a held stop; B14 badges and key; B15 the chip's blocks before the tables; B16 picture, values,
  sliders (Study); B17 the two impedance bands and the two sub-columns side by side; B20 the tip and the clause cues.
- C2 at 1920 × 1080 and 1024 × 768, EN and FR, through the zooms (§10); C3 at once; C4 second channels; C5 the tour's keys;
  C6 at 320 px from the zoom targets; C8 the print of §10.
- E1–E6, both themes, EN and FR.
- **Six gates (this spec)**: (1) **realism**: the real document's figures and structure, redrawn in the course style (D2),
  the block diagram as Figure 7-1 (comparator and pins included), the noise tables in the page's own RMS (pp) form, every
  value as printed and cited ✓. (2) **science**: the ΔΣ averaging (§6.1) and the switched-capacitor input as an average
  resistance (§7.3.2) stated; the RMS column shown flat and the growth placed in the peak-to-peak figures (F1); differential
  and common-mode drawn apart (F4); the input-range limit stated on the figure at s3 and in the tip (F-c5-1 (a), decided; D2·020-F12) and S52's time and
claim corrected in `en.md` (F-c5-2 (a), applied; D2·020-F13) ✓. (3)
  **maths**: every number recomputed in Node (§8), including the page's two-decimal truncation of the noise-free bits, which
  the figure keeps as printed ✓. (4) **visualization**: one sheet walked in the Flow's order, the column the POE asks about
  zoomed to wall size, the load as six dots on yesterday's divider, both impedances on one axis of ranges ✓. (5)
  **consistency**: the U020 palette (amber the ADS1115, violet only the bus: **our fix** of `draw5`'s violet inputs, now amber
  dashed), D1·040's symbols, statement and boundary, card 1's 640 and 5 mV, N2's label, D1·080's ENOB in the tip; R_in amber
  here where D1·040 drew it azure (this module's palette, stated) ✓; the downstream harvests flagged (F-c5-7). (6)
  **design**: cells at the 62-unit floor by arithmetic, the noise tables read through two 2.07 × zooms, FR on two lines where
  needed, a per-cell fallback ✓ on paper, to check on the render. **Open**: nothing; F-c5-1 and F-c5-2 (accuracy) were
  decided 2026-10-21 and applied (§14).
