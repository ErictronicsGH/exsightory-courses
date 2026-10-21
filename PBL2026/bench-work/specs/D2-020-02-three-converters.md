```yaml
id: D2-020-02-three-converters
card: "Three converters side by side"
module: notes/Day02/020-external-adcs/en.md
bench: Figure                     # the PLAN's bench; the asset is ours to draw (D2: our own figure, values cited)
library: "three-converters: a Figure of our own SVG, `figures/d2-020-three-converters.en.svg` (and `.fr.svg`): the owner's comparison table (script panel § Reference), eleven rows in the owner's order and wording, the ATmega328P's ADC, the classic ESP32's ADC and the ADS1115 as columns, drawn as four stacked panels with the header repeated (F-c2-2), rank chips in the resolution and rate rows (F-c2-4); eight states, s0–s7, the three columns lit as the Flow names each part, then the resolution row, the rate row and both together"
dimensions: 2D
stand_in: none                    # the Figure Bench exists
optional_benches: []
real_thing: "the three parts as their own documents give them: ATmega328P (Atmel-42735B, 11/2016, §28 and Table 32-11), classic ESP32 (Espressif datasheet v5.3, 2026-07, §4.9.1, Tables 4-3 and 4-4; Technical Reference Manual v5.8 §31.3; ESP-IDF ADC documentation), ADS1115 (TI SBAS444E, Dec 2024); every cell of the owner's table checked against them (§8)"
minutes: 3.0                      # on the bench: from p2 (after the POE) to the card's end (§2)
card_minutes: 4.0                 # the POE included
status: spec-draft
learner_action: poe
predictions: []                   # the PLAN's POE is the prediction; it fires before the figure (p0); s5–s7 reveal it
seeds: []                         # none planted or harvested on this card (S19's sigma-delta is consistent with the explain, §8)
key_variable: "each part's rank in the resolution row against its rank in the rate row: by bits ADS1115, ESP32, ATmega328P (1-2-3); by speed ESP32, ATmega328P, ADS1115"
time_scale: "none (tour stops; nothing moves)"
steps: 8                          # s0 (the whole table, after the POE), s1–s7
```

**Written 2026-10-21 (U020)** after the owner's choices on the U020 brief (*"Apply all recommendations"*, 2026-10-21):
**D2·020-F3** (applied: the Look for reads *"the most bits on by far the slowest part, while between the two SARs the finer one
is also the faster"*, and the explain adds the SAR sentence), **D1** (the ATmega328P, the classic ESP32 and the ADS1115 keep
their names on this figure: an exception to real-but-unbranded for this module; no logos, no vendor page images), **D2** (the
figure is ours, in the course style, every value cited to the parts' own documents) and **N1** (*the table's cells stay the
owner's; the spec sources each cell, and offers wording in §14 where a cell is weak*). The brief page's `draw2`
(`bench-work/previews/u020-preview.html`) is the approved visual: the table, then *Spotlight: resolution*, then *Spotlight:
rate*, each with rank chips (*1st* in lime). Three corrections of ours to that drawing are named in §3 and the six-gate report:
the cells carry the owner's full wording (draw2 abridged them, e.g. *"see N1"*); the table is split into four legible panels
(draw2's 13 px type would be ≈ 7 px on the wall); the spotlight outline is `lime`, not `amber` (amber is the external
converter's colour in this module). **One accuracy finding** in the owner's table (F-c2-1, the ESP32's differential cell);
everything beyond the PLAN is marked **Proposal** and listed in §14 (round two, open).

**What the Figure Bench offers**, read in source on 2026-10-21 (read-only, `C:\ExSightory\src\insight\packages\`:
`insight-core/src/registry/figureBlock.ts`, `insight-core/src/figure/style.ts`, `canvas/src/figureTypes.ts`,
`canvas/src/FigureBench.vue`), with what `D2-010-04-interface-not-protocol.md` already found: `features` with `rect` geometry
(fractions [x, y, w, h]), `colour` from teal · amber · violet · lime · rose · azure · orange · magenta, `label` and `note`
`{en, fr}`; a mirrored `tour`, **one `feature` per stop**, each stop with an optional `zoom` target and `note`; `zoom` targets
by `rect` or `feature`; `spotlight: dim` (a 0.62 wash over everything but the active part); `labels: numbers | callouts |
on-figure | none` (**the key's gutter, 170–420 px, exists only for `numbers` and `callouts`**, so with `none` the picture takes
the stage's full width); `reveal: shown | hidden | on-tour` (names only: *"the marks stay and the names go"*). **Every
feature's mark and every part layer is drawn at all times**; nothing in the picture can wait for a stop (F-c2-4). **`image` is
one asset, not `{en, fr}`** (`figureBlock.ts`, `image: { type: 'asset' }`): the French SVG is the French notes' block's own
image (§12).

## 1. What the room must understand

- **Statement** (verbatim): *The ATmega328P has a 10-bit SAR ADC, the classic ESP32 a 12-bit SAR, and the ADS1115 a 16-bit
  sigma-delta over I²C at up to 860 samples per second. The highest nominal resolution is also by far the slowest.*
- **SHOW** (verbatim): *Figure — the comparison table as an SVG (architecture, resolution, maximum rate, inputs, PGA,
  reference, interface, strength, limitation) for the ATmega328P (10-bit SAR, ~15 kSPS), the classic ESP32 (12-bit SAR) and
  the ADS1115 (16-bit ΔΣ, 860 SPS).*
- **Drive** (verbatim): *spotlight the resolution row, then the rate row.*
- **Look for** (verbatim): *the most bits on by far the slowest part, while between the two SARs the finer one is also the
  faster.*
- **Status** (verbatim): *needs asset: comparison table SVG, values checked against the three datasheets*
- **ASK** (verbatim): §7a.
- **Bench and library.** The **bench** is the Figure Bench. The **library** is this card's figure, `three-converters`: our
  SVG (EN and FR) and its `figure` block.
- **Insight**: *ranked by bits the order is ADS1115, ESP32, ATmega328P; ranked by speed it is ESP32, ATmega328P, ADS1115. The
  sigma-delta buys its bits with time, but more bits did not cost the ESP32 any speed: architecture, not bit count, sets the
  rate.*
- **Kind of knowledge**: *a contrast between two states* (one table read along two rows) on *a relation between quantities*
  (rank against rank). Card test → **Figure** (a table toured). B17 applies (the two rows in one table, and s7 lights both at
  once); B15, B18, B19 do not.
- **Why this bench, not a still**: a still table gives eleven rows at once and the room cannot tell which two answer the POE.
  The tour lights each part as its paragraph names it, then the two rows the POE asked about, one after the other, then both
  together, so the room compares the rankings it predicted against the two the table holds.
- **Key variable**: the rank, row against row.

## 2. Time

The card's Flow is **414 words** (`en.md`, 2026-10-21; whitespace tokens of the fence, `[[cue]]` markers removed, `*()`
stripped, tokens with a letter or digit, as the U020 brief counts). Per paragraph: p0 the `[[ask]]` **30**, p1 `[[pause]]` 0,
p2 the ATmega328P **102**, p3 the ESP32 **52**, p4 ADC2 and Wi-Fi **39**, p5 *"not automatically a precision instrument"*
**38**, p6 the ADS1115 **68**, p7 *"We can use these three devices…"* **15**, p8 *"(Table on the script panel…)"* **12**, p9 the
`[[reveal]]` **58** (14 + 11 + 33 over s5, s6, s7). p0 is counted in the POE; p8 is a stage direction for the presenter, not
speech (F-c2-6). **372 words are spoken outside the POE = 2.86 min.**

| Beat | Minutes | Source of the number |
|---|---|---|
| The POE (its own card, before the statement): p0 *"[[ask]] Here are three converters we meet every day…"* (30), the answer window, the spread (p1 `[[pause]]`) | 1.0 | the brief's figure for a poe |
| s0 the whole table, overview, as the POE's spread closes | 0.03 | one Next and a breath (≈ 2 s), estimated |
| s1 the ATmega328P column: p2 *"The ATmega328P, used in the classic Arduino Uno…"* (102) | 0.78 | 102 ÷ 130 |
| s2 the ESP32 column: p3 *"The classic ESP32 contains two SAR ADC units…"* (52), p4 *"One particularly important practical consideration…"* (39), p5 *"The ESP32 provides substantially more ADC capability…"* (38) | 0.99 | 129 ÷ 130 |
| s3 the ADS1115 column: p6 *"The ADS1115 is an example of a dedicated external ADC…"* (68) | 0.52 | 68 ÷ 130 |
| s4 the whole table: p7 *"We can use these three devices…"* (15); p8 seen on the teleprompter, not read | 0.12 | 15 ÷ 130 |
| s5 resolution row: p9 *"[[reveal]] The numbers alone tell an interesting story. The ADS1115 has the highest nominal resolution,"* (14) | 0.11 | 14 ÷ 130 |
| s6 rate row: p9 *"but it is also by far the slowest of the three."* (11) | 0.08 | 11 ÷ 130 |
| s7 both rows: p9 *"The ATmega328P has the lowest resolution… much faster SAR-based acquisition system."* (33) | 0.25 | 33 ÷ 130 |
| Bench moves not covered by speech: eight Next presses with their zooms (≈ 0.5 s each) and a beat at s5 and s6 for the room to read the chips (≈ 3 s each) | 0.17 | estimated |
| **Card total / of which on the bench** | **4.0 / 3.0** | 4.04 / 3.04 (p8 read aloud: + 0.09) |

**Module check** (the U020 brief, 2026-10-21): the Flow is 2,045 words = 15.7 min at 130 wpm; the eight activities ≈ 10.5
min (two poe, the flash and three numerics ≈ 1 min each, the poll ≈ 1.5, the checkpoint ≈ 3); bench moves ≈ 3 min, most of
them over speech: **≈ 29–30 of the 30 `targetMinutes`**. This card's 4.0 min is its share (its 414 words are the module's
largest Flow); the eight stops add ≈ 0.17 min of their own, inside the brief's ≈ 3 min of bench moves. Reported, not cut.

## 3. The scene: what is on the bench

### 3a. The SVG (`figures/d2-020-three-converters.en.svg`, `.fr.svg`), ours

**Why four panels (F-c2-2).** The room's floor is 32 pt ≈ 43 px (C2). The owner's longest cells are 72 characters (the
ESP32's rate), 62 (its limitation), 57 (the ATmega328P's reference). At 43 px a 400-unit column holds about 16 characters a
line, so the eleven rows and the header wrap to **33 lines in English and 38 in French** (greedy wrap, Node, 2026-10-21, at 44-unit type,
0.5 em a character). At 55 units a line that is ≥ 1,700 units of table, ≈ 1,800 px on a 1,080 px wall: **the whole table
cannot be read at the floor on one screen, in any layout**. So it is drawn as four stacked panels in the owner's row order,
each with the header repeated, each a 16:9-or-wider zoom target that the room reads at the floor; the whole table (s0, s4) is
the overview, its type ≈ 14 px, there to show the shape, not to be read.

Artboard **1600 × 2940**, neutral ink on the bench's ground; text **44 units** (≈ 49 px at 1.11 px/unit, the band zoom on a
1,800 × 950 px stage; ≥ 43 px whenever the stage is ≥ 1,564 × 836 px, to check on the render), line 55 units, cell padding 24,
inset 16; text **wraps, never shrinks**. Row heights are laid out to the **French** wrap so one geometry (and one set of feature
fractions) serves both languages; English rows then have spare room. *"1.1 V"* is set with a no-break space.

**Columns** (x): *Feature* 20–320 (muted ink, the owner's row names); **ATmega328P ADC** 320–720; **Classic ESP32 ADC** 720–1200
(the widest, for the longest cells); **ADS1115** 1200–1580. Header names in their converter's colour: the two integrated
converters `teal`, the external one `amber` (the module palette); hairline rules between rows; no vertical rules.

**Panels** (y; header 134 = two French lines; each row's height = its lines × 55 + 24):

| Panel (zoom target) | Rows (the owner's order) | y | Height | Aspect |
|---|---|---|---|---|
| A `band-a` *Architecture, resolution, rate* | header 20–154; Architecture 154–233; Resolution 233–367; Maximum conversion/data rate 367–721 | 20–721 | 701 | 2.28 |
| B `band-b` *Inputs and gain* | header 761–895; Inputs 895–974; Single-ended 974–1053; Differential 1053–1352; PGA 1352–1596 | 761–1596 | 835 | 1.92 |
| C `band-c` *Reference and interface* | header 1636–1770; Reference 1770–2069; Interface to CPU 2069–2203 | 1636–2203 | 567 | 2.82 |
| D `band-d` *Strength and limitation* | header 2243–2377; Typical strength 2377–2676; Typical limitation 2676–2920 | 2243–2920 | 677 | 2.36 |

40-unit gaps between panels. English heights for the same rows (for the render check): A 591, B 670, C 512, D 567.

**The cells** (verbatim from `transcript.en.md` § Reference, the owner's table; F-c2-1 is the one open question on a cell):

| Feature | ATmega328P ADC | Classic ESP32 ADC | ADS1115 |
|---|---|---|---|
| Architecture | SAR | SAR | Sigma-delta |
| Resolution | 10-bit | 12-bit | 16-bit |
| Maximum conversion/data rate | ~15 kSPS | Much higher-speed SAR operation; depends on operating mode/configuration | 860 SPS |
| Inputs | Multiplexed | Multiplexed | Multiplexed |
| Single-ended | Yes | Yes | 4 channels |
| Differential | No native differential ADC measurement | Not the same differential-input architecture as ADS1115 (**F-c2-1, accuracy**) | 2 differential channels |
| PGA | No dedicated programmable gain stage | Input attenuation rather than a precision PGA | Yes |
| Reference | AVCC, internal 1.1 V, or external reference configuration | Internal reference with calibration/attenuation support | Internal low-drift reference |
| Interface to CPU | Internal | Internal | I²C |
| Typical strength | Simple embedded measurement | Fast, integrated embedded acquisition | Higher-resolution precision sensor measurement |
| Typical limitation | Lower resolution and modest speed | ADC non-idealities/calibration and device-specific limitations | Much lower sampling rate |

The owner's bold row names are drawn in the *Feature* column's weight, not bold (the whole column is one style).

**French cells** (our drafts for the owner's review; numbers and units never translated): header *Caractéristique* · *CAN de
l’ATmega328P* · *CAN de l’ESP32 classique* · *ADS1115*; *Architecture*: SAR · SAR · Sigma-delta; *Résolution*: 10 bits · 12
bits · 16 bits; *Débit maximal de conversion/de données*: ~15 kSPS · *Fonctionnement SAR bien plus rapide ; dépend du mode de
fonctionnement/de la configuration* · 860 SPS; *Entrées*: Multiplexées ×3; *Asymétriques*: Oui · Oui · 4 voies;
*Différentielles*: *Pas de mesure différentielle native par le CAN* · *Pas la même architecture d’entrée différentielle que
l’ADS1115* (F-c2-1) · *2 voies différentielles*; *PGA*: *Pas d’étage de gain programmable dédié* · *Atténuation d’entrée plutôt
qu’un PGA de précision* · Oui; *Référence*: *AVCC, 1.1 V interne, ou configuration avec référence externe* · *Référence interne
avec prise en charge de l’étalonnage/de l’atténuation* · *Référence interne à faible dérive*; *Interface avec le CPU*: Interne ·
Interne · I²C; *Point fort typique*: *Mesure embarquée simple* · *Acquisition embarquée rapide et intégrée* · *Mesure de
capteurs de précision à plus haute résolution*; *Limite typique*: *Résolution plus faible et vitesse modeste* · *Non-idéalités
du CAN/étalonnage et limites propres au composant* · *Fréquence d’échantillonnage bien plus faible*.

**Rank chips** (F-c2-4), in panel A only, on their own line under the cell's text (counted in the heights above): rounded
rectangles 110 × 52 units, 44-unit text. Resolution row: ATmega328P *3rd*, ESP32 *2nd*, ADS1115 *1st*. Rate row: ATmega328P
*2nd*, ESP32 *1st*, ADS1115 *3rd*. *1st* outlined in `lime` and set bold; *2nd* and *3rd* hairline neutral. FR *1er*, *2e*, *3e*.
They are in the image, so they show from s0 on, after the POE has closed (§7b); the spotlight makes them read at s5–s7.

### 3b. The `figure` block

| Field | Content |
|---|---|
| `title` | EN *Three converters side by side* · FR *Trois convertisseurs côte à côte* |
| `image` | `figures/d2-020-three-converters.en.svg` (the French notes' block: `.fr.svg`, §12) |
| `alt` | EN *A table comparing three analog-to-digital converters: the ATmega328P's, the classic ESP32's and the ADS1115. Architecture: SAR, SAR, sigma-delta. Resolution: 10, 12 and 16 bits. Maximum rate: about 15 kSPS; much higher, depending on the operating mode; 860 SPS. Then their inputs, gain stage, reference, interface, typical strength and typical limitation. Ranked by resolution the ADS1115 is first and the ATmega328P third; ranked by speed the ESP32 is first and the ADS1115 third.* · FR *Un tableau qui compare trois convertisseurs analogique-numérique : celui de l’ATmega328P, celui de l’ESP32 classique et l’ADS1115. Architecture : SAR, SAR, sigma-delta. Résolution : 10, 12 et 16 bits. Débit maximal : environ 15 kSPS ; bien plus, selon le mode de fonctionnement ; 860 SPS. Puis leurs entrées, leur étage de gain, leur référence, leur interface, leur point fort et leur limite typiques. Classé par résolution, l’ADS1115 est premier et l’ATmega328P troisième ; classé par vitesse, l’ESP32 est premier et l’ADS1115 troisième.* |
| `caption` (F-c2-5) | EN *Values from the parts’ own documents: the ATmega328P datasheet (Atmel-42735B), the ESP32 datasheet v5.3 and Technical Reference Manual v5.8, and the ADS1115 datasheet (TI SBAS444E). Read in four bands; the whole table is the overview.* · FR *Valeurs tirées des documents des composants : fiche technique de l’ATmega328P (Atmel-42735B), fiche technique v5.3 et manuel de référence technique v5.8 de l’ESP32, fiche technique de l’ADS1115 (TI SBAS444E). À lire en quatre bandes ; le tableau entier en donne la vue d’ensemble.* |
| `labels` | `none` (the table writes its own names; no key gutter, so the picture takes the stage's width, §3a) |
| `reveal` | `shown` |
| `spotlight` | `dim` |
| `zoom` | `whole` (rect [0, 0, 1, 1]); `band-a` [0, 0.0034, 1, 0.2452]; `band-b` [0, 0.2554, 1, 0.2908]; `band-c` [0, 0.5531, 1, 0.1997]; `band-d` [0, 0.7595, 1, 0.2371], labelled EN *Architecture, resolution, rate* · *Inputs and gain* · *Reference and interface* · *Strength and limitation*; FR *Architecture, résolution, débit* · *Entrées et gain* · *Référence et interface* · *Point fort et limite* |

| # | Feature id | Geometry (`rect`, fractions of 1600 × 2940) | Colour | Label EN · FR | Tour `note` EN · FR |
|---|---|---|---|---|---|
| 1 | `col-atmega` | [0.2, 0.0068, 0.25, 0.9864] (x 320–720, all panels) | `teal` | *ATmega328P: a 10-bit SAR inside the MCU* · *ATmega328P : un SAR de 10 bits dans le MCU* | *Up to 15 kSPS at full resolution; reference AVCC, the internal 1.1 V or AREF.* · *Jusqu’à 15 kSPS à pleine résolution ; référence AVCC, 1.1 V interne ou AREF.* |
| 2 | `col-esp32` | [0.45, 0.0068, 0.3, 0.9864] (x 720–1200) | `teal` | *Classic ESP32: two 12-bit SAR units* · *ESP32 classique : deux unités SAR de 12 bits* | *ADC1 has 8 channels, ADC2 has 10; ADC2 is shared with Wi-Fi.* · *ADC1 a 8 voies, ADC2 en a 10 ; ADC2 est partagé avec le Wi-Fi.* |
| 3 | `col-ads1115` | [0.75, 0.0068, 0.2375, 0.9864] (x 1200–1580) | `amber` | *ADS1115: a separate 16-bit sigma-delta on I²C* · *ADS1115 : un sigma-delta de 16 bits séparé, sur I²C* | *8 to 860 SPS; a PGA from ±6.144 V to ±0.256 V; four single-ended or two differential inputs.* · *8 à 860 SPS ; un PGA de ±6.144 V à ±0.256 V ; quatre entrées asymétriques ou deux différentielles.* |
| 4 | `table` | [0.0063, 0.0034, 0.9875, 0.9932] | `orange` | *The whole comparison* · *La comparaison entière* | *Eleven features, read in four bands.* · *Onze caractéristiques, lues en quatre bandes.* |
| 5 | `row-resolution` | [0.0125, 0.0793, 0.975, 0.0456] (y 233–367) | `lime` | *Resolution: ADS1115, ESP32, ATmega328P* · *Résolution : ADS1115, ESP32, ATmega328P* | *16, 12 and 10 bits: 65,536, 4,096 and 1,024 levels.* · *16, 12 et 10 bits : 65,536, 4,096 et 1,024 niveaux.* |
| 6 | `row-rate` | [0.0125, 0.1248, 0.975, 0.1204] (y 367–721) | `lime` | *Rate: ESP32, ATmega328P, ADS1115* · *Débit : ESP32, ATmega328P, ADS1115* | (F-c2-5) *ATmega328P: up to 15 kSPS at 10 bits, 76.9 kSPS at lower resolution. ESP32: datasheet maxima of 200 kSPS (RTC controller) and 2 MSPS (DIG controller, with DMA); what a program reaches depends on the mode. ADS1115: 8 to 860 SPS.* · *ATmega328P : jusqu’à 15 kSPS à 10 bits, 76.9 kSPS à résolution réduite. ESP32 : maxima de la fiche technique, 200 kSPS (contrôleur RTC) et 2 MSPS (contrôleur DIG, avec DMA) ; ce qu’un programme atteint dépend du mode. ADS1115 : 8 à 860 SPS.* |
| 7 | `rows-res-rate` | [0.0125, 0.0793, 0.975, 0.166] (y 233–721) | `lime` | *Resolution against rate* · *Résolution contre débit* | *The most bits on by far the slowest part; between the two SARs, the finer one is also the faster.* · *Le plus de bits sur la pièce de loin la plus lente ; entre les deux SAR, le plus fin est aussi le plus rapide.* |

FR drafts ours, for the owner's review; numbers never translated.

**Meet the parts** (B3): s0, the whole table, still, after the POE: three columns named in their colours, eleven rows named.
s1–s3 then meet each part in turn, at a legible zoom.

**Values beside their element** (B14, B16): every value is in its cell; the levels (65,536, 4,096, 1,024) and the sourced
rates in the row stops' notes.

**Colours and their second channel** (C4): the columns by their header names (the two `teal` columns differ by name only, and
need nothing else: they are both the MCU's own converter, the module's meaning of teal); the compared rows by position and
their row names; *1st* by its word and its weight as well as its `lime` outline; the overview frame `orange` is a frame only.

**Key views** (2D framings): *Home* = `whole`; `band-a` to `band-d`.

## 4. The run: step by step, as the Flow goes

### 4a. Steps (the stops' placement: F-c2-3)

| # | id (tour stop) | Flow paragraph (first words) | What changes (`say`) | Overlay | Presenter's control |
|---|---|---|---|---|---|
| — | the POE, p0–p1 (§7a) | *"[[ask]] Here are three converters we meet every day…"* | | | the activity |
| 0 | (before the walk), `whole` | the POE's spread | Three converters in one table: two inside a microcontroller, one on its own. | none | (the card opens after the POE) |
| 1 | `col-atmega`, zoom `band-a` | p2 *"The ATmega328P, used in the classic Arduino Uno…"* | The ATmega328P: a 10-bit SAR inside the microcontroller. | its column lit | Next |
| 2 | `col-esp32`, zoom `band-a` | p3 *"The classic ESP32 contains two SAR ADC units…"*; held over p4–p5 | The classic ESP32: two 12-bit SAR units inside the chip. | its column lit | Next |
| 3 | `col-ads1115`, zoom `band-a` | p6 *"The ADS1115 is an example of a dedicated external ADC…"* | The ADS1115: a separate 16-bit sigma-delta, on I²C. | its column lit | Next |
| 4 | `table`, zoom `whole` | p7 *"We can use these three devices…"*; p8 on the teleprompter | All eleven features of the three, side by side. | none | Next |
| 5 | `row-resolution`, zoom `band-a` | p9 *"[[reveal]] The numbers alone tell an interesting story. The ADS1115 has the highest nominal resolution,"* | Ranked by resolution: ADS1115, ESP32, ATmega328P. | the row lit, its chips | Next |
| 6 | `row-rate`, zoom `band-a` | p9 *"but it is also by far the slowest of the three."* | Ranked by rate: ESP32, ATmega328P, ADS1115. | the row lit, its chips | Next |
| 7 | `rows-res-rate`, zoom `band-a` | p9 *"The ATmega328P has the lowest resolution… much faster SAR-based acquisition system."* | The most bits sit on the slowest part; of the two SARs, the finer is the faster. | both rows lit | Next leads to card 3 |

### 4b. Motion, cues and stills

| # | Motion | Movers | Cue and its second channel | Hold | Reduced motion (C3) | Still |
|---|---|---|---|---|---|---|
| 0 | none | 0 | the whole table | hold | whole | s0 |
| 1–3 | the view zooms to panel A (`quick`); the column to full emphasis, the rest under the 0.62 wash | 1 | the column lit; its name in the header | hold | the zoom becomes a cut; the column lit at once | s1, s2, s3 |
| 4 | the view returns to the whole table | 1 | the table framed | hold | a cut | s4 (= s0 framed) |
| 5–7 | the view to panel A; the row (or both rows) at full emphasis | 1 | the row lit; its chips readable; its name | hold | at once | s5, s6, s7 |

Eight stills (s0–s7; s4 prints as s0). Nothing moves inside the picture: only the view and the wash.

## 5. Pacing and interaction, by surface and view

**Who paces** (B12): the presenter on the wall (the tour's `step` mirrored); the learner in Study and Scope.

| View | Who | Controls |
|---|---|---|
| Preview (in the slide) | everyone | the figure at its current stop |
| View (details) | everyone | the *Walk* pane (seven stops, notes); the zoom list (*Whole*, the four bands) |
| Edit (session only) | everyone | not specified for the Figure Bench |
| Authoring | authors | the `figure` block's YAML; the two SVGs |

- **The presenter's strip** (B20): *stop n / 7*, the next stop's `say` and the Flow words it waits for (§4a: s5 and s6 split one
  sentence at *"…highest nominal resolution, | but it is also…"*); the teacher tip (§7d); keys.
- **Study / Scope**: the walk learner-paced; panels B, C and D, which the scripted walk shows only in the overview, are one
  press away in the zoom list (*Inputs and gain*, *Reference and interface*, *Strength and limitation*). Explore unlocks after
  the POE is answered.
- **Phone** (C6): portrait, a panel zoom fills the width at ≈ 9 px type (320 px ÷ 1600 × 44): legible only by two-finger
  pinch (one finger does nothing on the stage). The fallback is the print form (§10): the owner's table as text, which the
  `alt` summarises. To walk at 320, 768, 1200, 1440, 1920.
- **Locked**: the walk starts after the POE closes (the figure is not on screen during it, §7a).

## 6. The frame

| Tile / panel | Used? | Selected item | List / contents |
|---|---|---|---|
| Figure: Walk | yes | the active stop | seven stops with notes (s1–s7) |
| Figure: key | no | — | `labels: none`: the table names its own rows and columns |
| Figure: zoom | yes (the tour's zooms; Study, Scope, phone) | — | *Whole*, *Architecture, resolution, rate*, *Inputs and gain*, *Reference and interface*, *Strength and limitation* |
| Note line (under the figure) | yes | the active stop's label and note | — |

Title *Three converters side by side*; the caption (sources, *read in four bands*) under the figure.

## 7. Thinking, not watching

- **7a. The PLAN's ASK** (verbatim): *poe (before the statement) — "Rank the three by resolution, then by speed. Do the rankings
  agree?" · options: Same order both times | Roughly reversed | No relation between them · answer: Roughly reversed · reveal:
  the two rows spotlighted in turn · explain: The ADS1115 reaches 16 bits by sampling far faster inside than it outputs and
  filtering, which spends time, while a SAR decides one bit per comparison and is done quickly. Between the two SARs, more bits
  did not cost speed: the ESP32 is both finer and faster than the ATmega328P. · depth: understand · practice: analysing data.*
  It fires at p0, **before s0**, on its own card, with the three names only (the table would show the answer). **s5 and s6
  reveal it** (the two rows in turn, as the PLAN says); s7 holds both for the explain.
- **7b. Prediction point**: the POE is the prediction. The reveal comes ≈ 2.5 min after the window closes (p2–p8: 0.78 + 0.99 +
  0.52 + 0.12 + the moves). The chips are in the image from s0 (F-c2-4): the room can read its answer early only at s1–s3,
  after it has committed.
- **7c. After the reveal**: the explain, then card 3's flash. In Study, done means the POE answered and the walk reached s7.
- **7d. Teacher tip** (Proposal, F-c2-5), presenter only: *Expect "Same order both times" from those who think a newer, finer
  part is better at everything, and "No relation" from those who spot the two SARs. Ask: why is the ADS1115 slow? Each result
  is the filter's average over the modulator's samples: 250 kHz inside, 31,250 samples a result at 8 SPS, about 291 at 860
  (SBAS444E §7.3.2: the 1 MHz oscillator divided by 4 gives f_MOD = 250 kHz; §7.3.6). Then ask: why is the ESP32 both finer and faster than the ATmega328P? A
  SAR's speed is set by its clock, not its bit count: the ATmega328P's converter wants at most a 200 kHz clock for full
  resolution and takes 13 clocks a conversion (15 kSPS), while the ESP32's digital controllers run a much faster clock. If
  asked: the classic ESP32 has no differential input at all, each channel is read against ground (F-c2-1); and the ADS1115's
  16 bits span ±FSR, so a single-ended input, 0 to +FS, uses codes 0 to 32,767 (SBAS444E §9.1.2).*
- **7e. Explore**: in Study and Scope, the four panels by the zoom list (§5). Nothing to drive: a table has no variable.

## 8. Faithfulness (the quality bar)

**Arithmetic** (Node, 2026-10-21):
- Levels: 2¹⁰ = **1,024**, 2¹² = **4,096** (the Flow's *"4,096 levels"* ✓), 2¹⁶ = **65,536**; single-ended ADS1115 2¹⁵ = 32,768
  codes (0–32,767).
- ATmega328P rate: a normal conversion is 13 ADC clocks (§28.4); full resolution needs an ADC clock of 50–200 kHz (§28.4), so
  200 kHz ÷ 13 = **15,385 SPS** (*"Up to 15kSPS at Maximum Resolution"*, §28.1 ✓, the cell's *"~15 kSPS"* ✓); the 1 MHz
  maximum clock (Table 32-11) ÷ 13 = **76,923 SPS** (*"Up to 76.9kSPS"* ✓); 13 clocks at 1 MHz = 13 µs and at 50 kHz = 260 µs
  (*"13 - 260µs Conversion Time"* ✓).
- Ranks: resolution ADS1115 1, ESP32 2, ATmega328P 3; rate ESP32 1, ATmega328P 2, ADS1115 3; Σd² = 4 + 1 + 1 = 6; Spearman
  ρ = 1 − 6·6 / (3·8) = **−0.5** (D2·020-F3 ✓: *"roughly"* reversed, not reversed).
- *"By far the slowest"*: 15,385 / 860 = **17.9×** slower than the ATmega328P at full resolution; against the ESP32's RTC
  controller maximum 200,000 / 860 = **233×** ✓.
- *"Between the two SARs the finer one is also the faster"*: the ESP32's lowest stated rate in continuous mode, 20 kSPS
  (ESP-IDF, below), exceeds the ATmega328P's 15.4 kSPS at full resolution, and its datasheet's RTC maximum (200 kSPS) exceeds
  even the ATmega328P's 76.9 kSPS at reduced resolution ✓.
- ADS1115 modulator 250 kHz: 250,000 / 8 = **31,250** samples a result, 250,000 / 860 = **290.7** (§7d) ✓; 1 / 860 SPS =
  1.163 ms a conversion (§7.3.6, *"the conversion time is equal to 1 / DR"*).
- Geometry: the fractions of §3b recomputed from §3a's coordinates (e.g. `row-rate` y 367/2940 = 0.1248, h 354/2940 = 0.1204;
  `band-b` h 855/2940 = 0.2908, aspect 1600/855 = 1.87) ✓; type 44 units × 1.11 px/unit = 48.9 px ≥ 43 ✓ (§10).

**Every cell against its source** (D, Figure rows: the real documents, cited; nothing redrawn from a vendor page).
*ATmega328P*: Atmel-42735B-ATmega328/P_Datasheet_Complete-11/2016, read in full text 2026-10-21. *ESP32*: Espressif, *ESP32
Series Datasheet* v5.3 (2026-07), §4.9.1; *ESP32 Technical Reference Manual* v5.8, §31.3; ESP-IDF Programming Guide (v6.1,
ESP32): *ADC Oneshot Mode Driver*, *ADC Continuous Mode Driver*, *ADC Calibration Driver*
(`docs.espressif.com/projects/esp-idf/en/stable/esp32/api-reference/peripherals/adc/…`); ESP-IDF v4.4 *Analog to Digital
Converter (ADC)* page; `components/soc/esp32/include/soc/soc_caps.h` (ESP-IDF `release/v5.3` and `master`), and
`components/hal/include/hal/adc_types.h` (`release/v5.3`), read 2026-10-21. *ADS1115*: TI SBAS444E (May 2009, revised Dec
2024).

| Row | ATmega328P | Classic ESP32 | ADS1115 |
|---|---|---|---|
| Architecture | *SAR* ✓ §28.2: *"a 10-bit successive approximation ADC"* | *SAR* ✓ datasheet §4.9.1: *"two 12-bit SAR ADCs"*; TRM §31.3.1 | *Sigma-delta* ✓ §7.1: *"16-bit, delta-sigma (ΔΣ)"* |
| Resolution | *10-bit* ✓ §28.1 | *12-bit* ✓ §4.9.1; TRM §31.3.2: *"12-bit, 11-bit, 10-bit, 9-bit configurable resolution"* (the Flow's *"normally 12 bits"* ✓) | *16-bit* ✓ §5.5: *Resolution (no missing codes) 16 Bits* |
| Max rate | *~15 kSPS* ✓ §28.1 (at maximum resolution; 76.9 kSPS at lower resolution, F-c2-5's note) | *Much higher-speed …; depends on operating mode/configuration* ✓ **supported** (below) | *860 SPS* ✓ §7.3.6: DR 8 … 860 SPS; §5.5 data-rate variation ±10 % |
| Inputs | *Multiplexed* ✓ §28.2: *"an 8-channel Analog Multiplexer"* | *Multiplexed* ✓ TRM Table 31.3-1 (ADC1 channels 0–7, ADC2 0–9), §31.3.5 pattern-table scanning; `SOC_ADC_CHANNEL_NUM` 8 and 10 | *Multiplexed* ✓ §7.3.1 |
| Single-ended | *Yes* ✓ §28.1: six multiplexed single-ended channels (eight on TQFP and VFQFN); §28.2 *"refer to 0V (GND)"* | *Yes* ✓ one pad per channel (TRM Table 31.3-1; IDF V_out = D_out × V_max / D_max, a voltage against ground) | *4 channels* ✓ §7.3.1, §9.1.2 |
| Differential | *No native differential ADC measurement* ✓ §28.9 Table 28-4: MUX[3:0] lists single-ended inputs only (ADC0–7, the temperature sensor, 1.1 V V_BG, 0 V) | *Not the same differential-input architecture as ADS1115*: **not supported as worded, F-c2-1** (below) | *2 differential channels* ✓ §7.3.1: AIN0–AIN1, AIN2–AIN3 (and AIN0, AIN1, AIN2 against AIN3: MUX[2:0] 000–011) |
| PGA | *No dedicated programmable gain stage* ✓ Table 28-4 (no gain setting; the 328P has no gain channels) | *Input attenuation rather than a precision PGA* ✓ four attenuations (`SOC_ADC_ATTEN_NUM` 4: 0, 2.5, 6, 12 dB, `ADC_ATTEN_DB_11` now *"deprecated, … the same as ADC_ATTEN_DB_12"*); no gain stage in TRM §31.3 | *Yes* ✓ §7.3.3: ±6.144 V … ±0.256 V |
| Reference | *AVCC, internal 1.1 V, or external reference configuration* ✓ §28.5.2, Table 28-3 (REFS 00 AREF, 01 AVCC, 11 internal 1.1 V); V_INT 1.0 / 1.1 / 1.2 V min/typ/max (Table 32-11) | *Internal reference with calibration/attenuation support* ✓ IDF *ADC Calibration Driver*: *"By design, the ADC reference voltage for ESP32 is 1100 mV"*, the true value 1000–1200 mV between chips, eFuse Vref and Two Point calibration; datasheet §4.9.1: *"±6% differences in measured results between chips"*, Table 4-4 ranges per attenuation | *Internal low-drift reference* ✓ §1, §7.3.4 (*"An external reference cannot be used"*) |
| Interface to CPU | *Internal* ✓ (on-chip, ADCL/ADCH registers §28.2) | *Internal* ✓ (on-chip; DMA through I2S0 in continuous mode) | *I²C* ✓ §7.5.1 (Standard, Fast and Hs modes, §7.5.1.3) |
| Typical strength | *Simple embedded measurement* ✓ (the Flow's own case) | *Fast, integrated embedded acquisition* ✓ (rates below) | *Higher-resolution precision sensor measurement* ✓ §3: *"precision, low-power, 16-bit"*, *"sensor measurement applications"* |
| Typical limitation | *Lower resolution and modest speed* ✓ | *ADC non-idealities/calibration and device-specific limitations* ✓ datasheet Table 4-3: DNL ±7 LSB, INL ±12 LSB; accuracy worse above ≈ 2450 mV at atten 3; ±6 % chip to chip uncalibrated; ADC2 and Wi-Fi (TRM §31.3.1 note) | *Much lower sampling rate* ✓ (860 against 15,385 SPS) |

**The two cells N1 asks about.**
- **The ESP32's rate cell is supported.** ESP32 datasheet v5.3 Table 4-3, *Sampling rate*: *RTC controller* max **200 ksps**,
  *DIG controller* max **2 Msps**; ESP-IDF `release/v5.3` `soc_caps.h`: `SOC_ADC_SAMPLE_FREQ_THRES_HIGH (2*1000*1000)`,
  `SOC_ADC_SAMPLE_FREQ_THRES_LOW (20*1000)` (the continuous-mode range, 20 kHz–2 MHz), with *"only support ADC1 using DMA
  mode"* (`SOC_ADC_PATT_LEN_MAX`'s comment; `SOC_ADC_DIG_SUPPORTED_UNIT` 1 for unit 0 only); ESP-IDF v4.4's digital
  controller took *"611Hz ~ 83333Hz"*. So the rate does depend on the controller, the mode and the driver, exactly as the cell
  says, and every documented figure is above the ATmega328P's 15 kSPS: *"much higher-speed"* ✓. It is weak only in giving no
  number where its neighbours do: F-c2-5 puts the sourced figures in the rate stop's note, the cell unchanged (N1).
- **The ESP32's differential cell is not supported as worded.** No Espressif document for the classic ESP32 describes a
  differential input: the datasheet (§4.9.1) and the TRM (§31.3: features, Table 31.3-1 one pad per channel, the controllers
  and their pattern table of channel, width and attenuation) give single pads only; ESP-IDF's `soc_caps.h` for the ESP32 has no
  `SOC_ADC_DIFF_SUPPORTED`, the capability its drivers test before their differential notes (*"N-side channels can be used in
  single-ended mode…"*, for chips that have them); the conversion the docs give, V_out = D_out × V_max / D_max, is a voltage
  against ground. *"Not the same differential-input architecture as ADS1115"* reads as *it has one, of another kind*. **A
  learner would be misinformed**, and on the very property cards 1 and 3 turn on (*"read the bridge's two outputs directly as
  a difference"*; the flash's *"Its differential inputs read the bridge directly"*): **accuracy, F-c2-1**.

**The owner's other text on this card** (A5): the statement ✓; p2 *"up to approximately 15 kSPS under the specified
conditions"* ✓ (at full resolution), *"a nominal internal 1.1 V reference"* ✓ (1.0–1.2 V), *"a sample-and-hold circuit"* ✓
(§28.2); p3 *"two SAR ADC units with multiple multiplexed analog channels"* ✓, *"normally 12 bits, providing 4,096 levels"* ✓,
*"configurable input attenuation, allowing the ADC to accommodate input voltages above its nominal internal reference range"*
✓ (1100 mV reference; 150–2450 mV at the highest attenuation, Table 4-4), *"one-shot and continuous"* ✓ (the two IDF drivers);
p4 *"ADC2 is shared with the Wi-Fi subsystem"* ✓ (TRM §31.3.1 note: *"If Wi-Fi module is using the SAR ADC2, users can not
measure the analog signal from the pins using SAR ADC2"*), *"ADC1 is therefore often preferred"* ✓ (and only ADC1 has DMA,
`soc_caps.h`); p5 *"not automatically a precision instrument"* ✓ (Table 4-3, ±6 %); p6 ✓ (§1, §7.3.1, §7.3.3); p9 ✓ (ranks
above). The explain's *"sampling far faster inside than it outputs and filtering"* ✓ (§7.1) and agrees with D1·080's S19 and
D1·080 p. 288 (*"The ADS1115, which we meet on Day 2, is a 16-bit sigma-delta ADC"*) (A4).

**Section D, Figure rows**
- [x] Our own drawing of the owner's table; every value from the cited documents; nothing branded beyond D1's names; no vendor
  page image. The caption names the documents (F-c2-5).
- [x] Named parts on the right features (§3b's fractions from §3a's coordinates; the band zooms frame whole panels).
- [x] Legible at 1920 × 1080 when zoomed to its named targets (§10); the overview is labelled as one (caption).

**A1–A8** (the owner's current text and this spec): A1 ✓ (1,024, 4,096, 65,536; 15,385 and 76,923 SPS; ρ = −0.5; 17.9× and
233×; 31,250 and 290.7); A2 ✓ (each part's own datasheet; the course's MCU model is not used on this card, which compares named
parts); A3 ✓ (*"~15 kSPS"* is the full-resolution figure, the 76.9 kSPS edge named in F-c2-5's note; *"by far"* checked at both
ends); A4 ✓ (S19, D1·080 p. 288, F3 as applied, cards 1 and 3's differential claim, which F-c2-1 protects); A5: **one finding,
F-c2-1** (the ESP32 differential cell); every other cell ✓ (table above); A6 ✓ (*"roughly reversed"*, *"normally 12 bits"*,
*"often preferred"*, *"under the specified conditions"* hedge correctly; *"much higher-speed"* holds against every documented
ESP32 rate); A7 ✓ (sources above, all read 2026-10-21); A8 ✓. **Our own discrepancies, fixed before sending**: draw2's
abridged cells (*"see N1"*, *"~15 kSPS (at 10 bits)"*) replaced by the owner's wording; draw2's `amber` row outline (the
external converter's colour) made `lime`; draw2's single 1100 × 470 table (13 px type) split into four panels at the floor.

## 9. Faults and non-ideal behaviour

**PLAN FAULT**: none on this card. The table's own non-ideal content is the point of three cells (the ESP32's limitation and
reference; the ADS1115's rate). Not on the figure, said if asked (§7d), each sourced in §8: the ESP32's DNL ±7 LSB and INL
±12 LSB, its ±6 % chip-to-chip spread before calibration, and its worse accuracy above ≈ 2450 mV at the highest attenuation;
the ATmega328P's ±2 LSB absolute accuracy (§28.1); the ADS1115's ±10 % data-rate variation (§5.5) and its single-ended inputs
using half its codes (§9.1.2).

## 10. Accessibility, legibility and print

- **Wall (C2)**: at a band zoom the 44-unit type is ≈ 49 px on a 1,800 × 950 px stage (1.11 px/unit) and stays ≥ 43 px down to
  a 1,564 × 836 px stage; the chips' text likewise; contrast 7:1 on both themes' grounds (ink, muted ink for the row names,
  the `teal` and `amber` headers to check). The whole table (s0, s4) is ≈ 14 px: the overview, labelled by the caption, never
  the place the room must read. **French**: the geometry is laid out to the French wrap (38 lines), so French fits by
  construction; English has spare room. Check at 1920 × 1080 and 1024 × 768, EN and FR; no label collision (the chips sit on
  their own line).
- **Reduced motion (C3)**: the zooms become cuts; every stop lands whole and reads from its still, its `say` and its note.
- **Colour (C4)**: header names, row names, *1st* by word and weight; checked under protanopia, deuteranopia and tritanopia
  (the `lime` chip against `teal` headers is not relied on).
- **Keyboard (C5)**: the tour's keys; the zoom list.
- **Print (C8)**: the owner's table as a table (a re-layout, not the picture), the rank chips as a column of ordinals, with s5,
  s6 and s7's `say` sentences and the caption's sources.

## 11. Assets to make or source

| Asset | Format | Made by | Status |
|---|---|---|---|
| `figures/d2-020-three-converters.en.svg` (§3a) | SVG, rendered for the owner first (a visual milestone) | the author | to make |
| `figures/d2-020-three-converters.fr.svg` (§3a, the same geometry, French cells) | SVG | the author | to make, after the owner's review of the FR drafts |
| The `figure` block (§3b), EN and FR | YAML in `en.md` (and the French notes') | the author | to write |
| The print form (§10) | the table as text | the author | to write |

## 12. Bench capabilities this needs

**Figure Bench**: `rect` features, colours, `label`/`note` `{en, fr}`, mirrored `tour` with a `zoom` per stop, `zoom` targets,
`spotlight: dim`, `labels: none` (no gutter), `reveal: shown`: **exist** (read 2026-10-21; the opening note).

**Missing, not needed for the lecture**: (i) a part's mark or layer held back until its tour stop, so the rank chips could
arrive with s5 and s6 as the brief page drew them (F-c2-4 (b): every mark and part layer is drawn at all times today); (ii) a
per-language `image` (`image` is one asset): the French SVG is referenced from the French notes' own `figure` block, which
needs nothing new if the course's French notes carry their own blocks. Either would go to the Benches lane by crossing, and
neither blocks this card.

**To check on the render**: the stage size the Canvas gives a figure with `labels: none` on the wall (§10's 1,564 × 836 px);
the tour's `zoom` on a full-width band fits the band, not more.

**Not this bench's**: a sortable or live table (nothing here is computed; the ranks are the owner's facts).

## 13. Stand-in for the lecture

None needed.

## 14. Findings for the owner

One **accuracy** finding (F-c2-1); the rest are Proposals. **All open, for round two**; nothing in the course files changes
until the owner answers.

- **F-c2-1 (accuracy) — the classic ESP32's *Differential* cell, *"Not the same differential-input architecture as
  ADS1115"*** (`transcript.en.md` § Reference; the figure). The classic ESP32's SAR ADCs have **no differential input**: every
  channel is one pad read against ground (datasheet v5.3 §4.9.1; TRM v5.8 §31.3, Table 31.3-1; ESP-IDF `soc_caps.h` has no
  `SOC_ADC_DIFF_SUPPORTED` for the ESP32; §8). The cell says it has one of another kind, and a learner would carry that into
  card 3's flash, whose answer rests on the ADS1115 being the one that reads a bridge as a difference. Options:
  - (a) *"No native differential ADC measurement"*, the owner's own words from the ATmega328P's cell in the same row, so the
    row reads *no · no · 2 differential channels* (**recommended**: true, the owner's wording, parallel);
  - (b) *"No differential input (single-ended channels only)"*;
  - (c) keep (not recommended: it misinforms).
  No Flow word changes (the Flow never mentions the ESP32's differential input): the time is unchanged. The lead logs it in
  `ACCURACY.md` (suggested id D2·020-F8).
- **F-c2-2 — Proposal: which rows, and how they are drawn.** The PLAN lists nine (architecture, resolution, maximum rate,
  inputs, PGA, reference, interface, strength, limitation); the owner's table has eleven (single-ended and differential
  besides). At the 32 pt floor no single screen holds either (33 English lines for eleven rows and the header, 28 for nine; ≈ 1,800 and
  ≈ 1,550 px against 1,080). Options:
  - (a) **all eleven rows** in the owner's order and wording, in four panels with the header repeated, each a zoom target,
    the whole table as the overview (**recommended**: the owner's table whole; the differential row is cards 1 and 3's point);
  - (b) the PLAN's nine, in three panels (drops single-ended and differential, and with them F-c2-1's cell);
  - (c) one 16:9 table at a smaller type (below the floor: fails C2 and gate 6).
- **F-c2-3 — Proposal: the stops.** The PLAN's Drive is the two rows. Options:
  - (a) s0 the overview after the POE; s1–s3 each part's column at panel A as p2, p3 and p6 name it; s4 the whole table at
    p7; s5 the resolution row at the reveal's first sentence, s6 the rate row at *"but it is also by far the slowest"*, s7 both
    rows over the last two sentences, which compare both (**recommended**: the figure follows the Flow, and s7 is the Look for);
  - (b) the brief page's three states only: the table, then the two rows (the PLAN exactly; the room reads nothing legible
    during p2–p7, ≈ 2.4 min);
  - (c) (a) without s7 (the rate row held to the end).
- **F-c2-4 — Proposal: the rank chips.** The Figure Bench draws every mark at all times (§12). Options:
  - (a) the chips in the image, readable from s1 on, after the POE has closed; the spotlight carries the reveal at s5–s6
    (**recommended**: works today, and the commitment came first);
  - (b) as (a) for the lecture, and ask the Benches lane (crossing) for a part held back until its stop, so the chips arrive
    with s5 and s6 as the brief page drew them;
  - (c) no chips: the order in the stops' labels only.
- **F-c2-5 — Proposals: the words around the table.** The caption naming the three documents and *"read in four bands"*; the
  rate stop's note with the sourced figures (*"ATmega328P: up to 15 kSPS at 10 bits, 76.9 kSPS at lower resolution. ESP32:
  datasheet maxima of 200 kSPS (RTC controller) and 2 MSPS (DIG controller, with DMA); what a program reaches depends on the
  mode. ADS1115: 8 to 860 SPS."*), which gives the ESP32's cell its numbers without changing it (N1); the other notes and the
  teacher tip (§7d). Options: (a) all (**recommended**); (b) the caption and the tip only (the rate note without numbers);
  (c) none.
- **F-c2-6 — Reported: the time and the stage direction.** 4.0 min for the card, 3.0 on the bench (§2). p8, *"(Table on the
  script panel: Feature · ATmega328P ADC · Classic ESP32 ADC · ADS1115.)"*, sits in the Flow fence: the teleprompter shows it,
  and it is counted in the module's 2,045 words, but it is a stage direction, not speech; s4 is where the figure answers it. If
  it is meant to be read aloud, + 0.09 min. Nothing to decide unless the owner wants it moved out of the fence.

## 15. Acceptance: how we know it is built right

- The figure compiles with §3b's fields; the seven features land on their columns, rows and frame; every cell on the render
  reads as §3a's table, word for word (EN), and as the reviewed FR.
- Measured on the render: four panels in the owner's row order, each with its header; at each band zoom the type is ≥ 43 px on
  the wall's stage; no text crosses a rule or a chip; the chips read *3rd 2nd 1st* (resolution) and *2nd 1st 3rd* (rate).
- s1–s3 light one column each at panel A; s4 returns to the whole; s5 and s6 light one row each; s7 both; the notes as §3b.
- B1 one region per stop; B2 only the view and the wash change; B3 s0 still, before anything is lit; B4 eight stills; B5 each
  `say` on the strip; B6 the lit region with the dim; B9 the POE before the figure, its reveal at s5–s6; B10 the explain, no
  verdict on the wall; B13 cell words and values only, no narration; B14 values in their cells; B16 the table, the notes'
  values, the stops; B17 both rows in one table, lit together at s7; B20 the stop titles, the split sentence and the tip on the
  strip.
- C2 legible at 1920 × 1080 and 1024 × 768 at the band zooms, EN and FR; C3 cuts and whole stops; C4 names, words and
  weights; C5 the tour's keys; C6 walked at 320, 768, 1200, 1440, 1920 with pinch and the text fallback; C8 the print table.
- E1–E6, both themes, EN and FR.
- **Six gates (this spec)**: (1) realism: the three parts' own documents, cell by cell, with the document numbers in the
  caption; the owner's table whole ✓; (2) science: every cell sourced (§8), the ESP32's rate cell supported and given its
  numbers in a note, its differential cell raised as **accuracy** (F-c2-1, open) rather than drawn as if true ✓ on our side, the
  finding open on the owner's; (3) maths: levels, 15,385 and 76,923 SPS, ρ = −0.5, 17.9× and 233×, 31,250 and 290.7, the
  fractions and the type size recomputed ✓; (4) visualization: one table, each part met as it is named, then the two rows the
  POE asked about and both together, the ranks on chips ✓; (5) consistency: the module palette (MCU converters `teal`, the
  external `amber`; draw2's `amber` row outline moved to `lime`, fixed), F3 as applied, S19 and D1·080's sigma-delta, cards 1
  and 3's differential claim (protected by F-c2-1) ✓; (6) design: the floor by arithmetic at the band zooms, French laid out
  first, text wrapped never shrunk, the overview labelled as one ✓ on paper, to check on the render.
