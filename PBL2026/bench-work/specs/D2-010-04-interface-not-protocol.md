```yaml
id: D2-010-04-interface-not-protocol
card: "An interface is not a protocol"
module: notes/Day02/010-digital-interfaces/en.md
bench: Figure                     # the PLAN's bench (D2, 2026-10-20); the asset is ours to draw
library: "spi-one-byte: a Figure of our own SVG, `figures/d2-010-spi-one-byte.svg`: an ADC (peripheral) and an MCU (controller) wired by SPI (SCLK, MOSI, MISO, CS/SS, and a shared ground), and under them a timing strip of one byte, 10110110 on MISO against SCLK in SPI mode 0, framed by CS; the same eight bits weighed MSB-first (182) and LSB-first (109); nine features toured"
dimensions: 2D
stand_in: none                    # the Figure Bench exists
optional_benches: []
real_thing: "an SPI read of one byte from an external ADC by a 3.3 V microcontroller, in mode 0 (CPOL 0, CPHA 0), as a connection diagram and a timing diagram drawn to one time scale; MOSI unused during the read is not drawn on the strip"
minutes: 2.1                      # on the bench: from p4 (after the multi-select) to the card's end (§2); F11's +8 words leave it at 2.1 (2.14)
card_minutes: 3.2                 # 3.23 with F11 (3.17 before)
status: spec-ready                # round two decided 2026-10-20: F11 (F-c4-1) applied and re-checked, the proposals taken, the two sources confirmed (§8); nothing open
learner_action: multi-select
predictions: []                   # the PLAN's multi-select is the prediction; it fires before the Figure; s8–s9 reveal it
seeds: []
key_variable: "which bit the receiver takes as the most significant, on one unchanged set of wires and edges"
time_scale: "none (a timing diagram, no motion; bit time not given: an SPI clock of the class runs at 1–20 MHz)"
steps: 10                         # s0, s1–s4 (the four lines, F-c4-5 (a)), s5–s9 (the PLAN's tour and the two readings)
```

**Written 2026-10-20 (U019)** after the owner's choices on the U019 brief (*"apply all recommendations"*): **D2** (card 4 a
Figure, ours to draw) and **N1** (no product names: the MCU is *a 3.3 V microcontroller*). The brief page's `draw4`
(`bench-work/previews/u019-preview.html`) is the approved model: rows CS, SCLK, MISO; SCLK idling low, each bit sampled on
the rising edge (dotted) while CS is low; the radio *MSB first | LSB first* giving 182 and 109. This spec states the mode
the brief drew (mode 0) and completes the strip so it is physically right at every instant (§3a, §8). **Round two decided
2026-10-20** (owner: *"apply all recommendations"* on the U019 brief's *Specs: round two*, F11 and C4): p9 now reads as F-c4-1
(a) recommended, applied to `en.md` by the lead; mode 0 named in the caption, the GND line drawn, the names in a key, the four
lines lit as p8 names them and then the PLAN's tour; the two sources marked *to confirm* are confirmed (§8).

**What the Figure Bench offers** (read 2026-10-20, read-only, `insight-core/src/registry/figureBlock.ts`, `figure/style.ts`,
`canvas/src/figureTypes.ts`, `canvas/src/FigureBench.vue`): `features` with `path` and `rect` geometry (fractions; `rect` is
[x, y, w, h]), `colour` from `teal`, `amber`, `violet`, `lime`, `rose`, `azure`, `orange`, `magenta`, `label` and `note`
`{en, fr}`; a mirrored `tour` (one `feature` per stop, optional `zoom`, `note`), one feature active at a time; `reveal:
on-tour`; `labels: numbers` (badges on the figure, names in the key, the default) or `on-figure`; `zoom` targets.

## 1. What the room must understand

- **Statement** (verbatim): *The bits alone are not enough. An interface describes how devices connect and exchange signals; a
  protocol is the set of rules governing that exchange: who sends, when data is valid, where a transfer begins and ends, and
  which bit comes first.*
- **SHOW** (verbatim from the PLAN): *Figure — SPI between ADC and MCU: SCLK, MOSI, MISO, CS/SS, with a timing strip of
  10110110 on MISO against SCLK.*
- **Drive** (verbatim): *tour CS → SCLK → MISO; then relabel the same strip read MSB-first (182) and LSB-first (109).*
- **Look for** (verbatim): *one set of wires, one set of edges, two different numbers.*
- **Status** (verbatim): *needs asset: SPI connection and timing SVG (ours to draw)*
- **Bench and library.** The **bench** is the Figure Bench. The **library** is this card's figure, `spi-one-byte`: our SVG
  and its `figure` block.
- **Insight**: *the same eight bits on the same wires, read on the same edges, are 182 to a receiver that takes the first
  bit as the most significant and 109 to one that takes it as the least: the wiring is the interface, the agreement on what
  the bits mean is the protocol.*
- **Kind of knowledge**: *a contrast between two states* (two readings of one strip) on *a spatial structure* (the wires and
  the timing). Card test → **Figure** (a diagram toured). B17 applies (both readings shown together); B15, B18, B19 do not.
- **Why this bench, not a still**: the tour walks the order in which a transfer happens (select, clock, data), then lays the
  two weight rows under one strip. A still gives everything at once and the room cannot tell which part answers which
  question of the multi-select.
- **Key variable**: the bit order.

## 2. Time

The card's Flow is **266 words** (`en.md`, recounted 2026-10-20 after F11 applied, +8 words in p9; whitespace tokens, cue
markers removed, list markers counted, as the U019 brief counts them; it was 258). p2, the `[[ask]]` (16 words), is counted
in the multi-select. **250 words are spoken outside it = 1.92 min**; with ≈ 40 unscripted words over the PLAN's tour,
**2.23 min** of speech.

| Beat | Minutes | Source of the number |
|---|---|---|
| p0 *"Consider two devices exchanging digital data…"* (11), p1 *"10110110"* (1), on the multi-select's card | 0.09 | 12 ÷ 130 |
| The multi-select (before the statement): p2 the question (16), the answer window, the spread (p3 `[[pause]]`) | 1.0 | the task's figure for a multi-select |
| s0 the figure, unlit: p4 *"The bits themselves are not enough…"* (35), p5 the nine rules (64), p6 *"These rules form part of…"* (8) | 0.82 | 107 ÷ 130 |
| s1–s4 (F-c4-5 (a)): p7 *"For example, an ADC may communicate…"* (37), p8 the four lines (29), one stop per line as named | 0.51 | 66 ÷ 130 |
| s5–s9, the PLAN's tour and the two readings: p9 *"It also involves communication details…"* (22) and the presenter's unscripted lines over the five stops (≈ 40 words: *"CS goes low: the transfer begins. Eight rising edges: the controller reads a bit on each. The ADC changes MISO on the falling edges. Read the first bit as the most significant: 182. As the least: 109."*) | 0.48 | 62 ÷ 130, the 40 an estimate |
| s9 held: p10 *"This is why SPI is commonly referred to…"* (43) | 0.33 | 43 ÷ 130 |
| **Card total / of which on the bench** | **3.2 / 2.1** | 3.23 / 2.14 (3.17 / 2.08 before F11) |

**Module check**: `D2-010-07-choosing-the-pull-up.md` §2b (≈ 31.6 of 30 min before round two's Flow changes; F10, F11 and F9
add 20 words, 0.15 min: ≈ 31.8). This card's minutes round as before. Reported only.

## 3. The scene: what is on the bench

### 3a. The SVG (`figures/d2-010-spi-one-byte.svg`), ours

Artboard **1600 × 900**. Neutral ink in the image; the colours are the features'. IEC style: each chip a rectangle with its
pin names inside at its edge (IEC 60617 binary-logic element convention); wires as plain lines with an arrowhead at the
receiving end (direction); no junctions. Unbranded (N1).

**Connection band** (y 40–330):

| Element | Geometry | What |
|---|---|---|
| ADC block | x 60–360, y 40–330 | *ADC* · *(peripheral)*; pins SCLK, MOSI, MISO, CS/SS, GND at its right edge |
| MCU block | x 1240–1540, y 40–330 | *MCU* · *(controller)*; the same five pins at its left edge |
| SCLK | y 80, arrowhead at the ADC | the controller drives the clock |
| MOSI | y 150, arrowhead at the ADC | data from the controller to the peripheral |
| MISO | y 220, arrowhead at the MCU | data from the peripheral to the controller |
| CS/SS | y 290, arrowhead at the ADC | chip select, active low |
| GND (F-c4-3 (a), decided) | y 320, hairline, no arrow | *GND (shared)*: both chips need it; not one of SPI's four |

ADC left, MCU right, as cards 1 and 2 (data flows left to right). Rows 70 units apart (≈ 48 px on the wall, above the 43 px
floor).

**Timing strip** (y 380–870), one time scale. Time t in half-bits, **x(t) = 320 + 70·t**, drawn for t = −1 … 18 (x 250 … 1580);
the row names in a column at x 40–230.

| Row | Levels (y) | Waveform | Why (mode 0) |
|---|---|---|---|
| CS/SS | high 400, low 450 | high until t = 0 (x 320), **low from t = 0 to t = 17** (x 320–1510), high after | active low: the transfer is the low span (framing) |
| SCLK | high 500, low 550 | low (idle, **CPOL 0**) until t = 1; **rising edges at t = 1, 3 … 15** (x 390, 530, 670, 810, 950, 1090, 1230, 1370), **falling at t = 2, 4 … 16** (x 460 … 1440); low after | eight clock cycles, one per bit |
| MISO | '1' 600, '0' 650, released 625 | **released** (high impedance: a dashed line at mid-level, *released*) before t = 0; **bit k from t = 2(k − 1) to 2k** (cell k at x 320 + 140(k − 1) to 320 + 140k): 1, 0, 1, 1, 0, 1, 1, 0; bit 1 driven from CS's fall; **not defined** (hatched, neutral) from t = 16 to 17 (x 1440–1510); released after CS rises | **CPHA 0**: the first bit must be on the line before the first edge, so the peripheral drives it when CS falls; each later bit changes on a falling edge; a deselected peripheral lets go of MISO |
| Sampling marks | dotted verticals at the eight rising edges, y 490–660 | the receiver reads each bit here, mid-cell | mode 0: sampled on the rising edge |
| Bit digits | y 700, mono, at each cell's centre (= its rising edge) | 1 0 1 1 0 1 1 0 | |
| Weights, MSB first | y 760, under each cell: 2⁷ 2⁶ 2⁵ 2⁴ 2³ 2² 2¹ 2⁰; row name *MSB first* | the first bit worth 128 | |
| Weights, LSB first | y 830: 2⁰ 2¹ 2² 2³ 2⁴ 2⁵ 2⁶ 2⁷; row name *LSB first* | the first bit worth 1 | |

The sums are **not** in the image: *= 182* and *= 109* are the two reading features' labels, held back by `reveal: on-tour`
until s8 and s9. The strip's cells are 140 units (≈ 97 px) wide: the digits and weights fit at the wall's floor.

### 3b. The `figure` block

| Field | Content |
|---|---|
| `title` | EN *SPI: one byte from the ADC* · FR *SPI : un octet venu du CAN* |
| `image` | `figures/d2-010-spi-one-byte.svg` |
| `alt` | EN *An ADC and a microcontroller joined by four SPI lines, SCLK, MOSI, MISO and chip select, and a shared ground. Below, a timing diagram: chip select goes low, the clock gives eight pulses, and the ADC puts the bits 1 0 1 1 0 1 1 0 on MISO, each read on a rising clock edge. Read with the first bit as the most significant, the byte is 182; with the first bit as the least significant, 109.* · FR *Un CAN et un microcontrôleur reliés par quatre lignes SPI, SCLK, MOSI, MISO et la sélection de boîtier, et une masse commune. En dessous, un chronogramme : la sélection passe à l'état bas, l'horloge donne huit impulsions et le CAN place les bits 1 0 1 1 0 1 1 0 sur MISO, chacun lu sur un front montant. Lu avec le premier bit comme bit de poids fort, l'octet vaut 182 ; comme bit de poids faible, 109.* |
| `caption` (F-c4-2 (a), decided) | EN *SPI mode 0 (CPOL 0, CPHA 0): the clock idles low; the first bit appears when CS falls, each later bit changes on a falling edge, and the receiver reads each bit on a rising edge (dotted). One byte of the transfer is shown.* · FR *SPI mode 0 (CPOL 0, CPHA 0) : l'horloge est au repos à l'état bas ; le premier bit apparaît quand CS descend, chaque bit suivant change sur un front descendant, et le récepteur lit chaque bit sur un front montant (pointillés). Un octet du transfert est représenté.* |
| `labels` | `numbers` (badges on the figure, names and notes in the key; collision-safe on the dense strip; F-c4-4 (a), decided) |
| `reveal` | `on-tour` |
| `spotlight` | `dim` (the strip's other rows dimmed while one is toured) |
| `motion` | `quick` |

| # | Feature id | Geometry (fractions of 1600 × 900) | Colour | Label EN · FR | Tour `note` EN · FR |
|---|---|---|---|---|---|
| 1 | `line-sclk` | path [[0.225, 0.089], [0.775, 0.089]] | `violet` | *SCLK: clock* · *SCLK : horloge* | *clock* (Flow p8) · *horloge* |
| 2 | `line-mosi` | path y 0.167 | `lime` | *MOSI: controller → peripheral* · *MOSI : contrôleur → périphérique* | *data from the controller to the peripheral* · *données du contrôleur vers le périphérique* |
| 3 | `line-miso` | path y 0.244 | `teal` | *MISO: peripheral → controller* · *MISO : périphérique → contrôleur* | *data from the peripheral to the controller* · *données du périphérique vers le contrôleur* |
| 4 | `line-cs` | path y 0.322 | `azure` | *CS/SS: chip select* · *CS/SS : sélection de boîtier* | *chip select* · *sélection de boîtier* |
| 5 | `strip-cs` | rect [0.156, 0.433, 0.831, 0.078] | `azure` | *CS low: the transfer* · *CS bas : le transfert* | *CS falls: the transfer begins. CS rises: it ends.* · *CS descend : le transfert commence. CS remonte : il se termine.* |
| 6 | `strip-sclk` | rect [0.156, 0.544, 0.831, 0.078] | `violet` | *8 rising edges: read* · *8 fronts montants : lecture* | *The controller reads one bit on each rising edge.* · *Le contrôleur lit un bit à chaque front montant.* |
| 7 | `strip-miso` | rect [0.156, 0.656, 0.831, 0.133] | `teal` | *MISO: 1 0 1 1 0 1 1 0* · *MISO : 1 0 1 1 0 1 1 0* | *The ADC puts each bit on the line; it changes on the falling edges.* · *Le CAN place chaque bit sur la ligne ; il change sur les fronts descendants.* |
| 8 | `read-msb` | rect [0.156, 0.817, 0.831, 0.056] | `amber` | *MSB first: 182* · *MSB en premier : 182* | *128 + 32 + 16 + 4 + 2 = 182* |
| 9 | `read-lsb` | rect [0.156, 0.894, 0.831, 0.056] | `magenta` | *LSB first: 109* · *LSB en premier : 109* | *1 + 4 + 8 + 32 + 64 = 109* |

Colours are one meaning per line, kept on card 9: clock `violet`, data `teal`, select `azure`, MOSI `lime`. FR drafts ours,
for the owner's review; numbers never translated.

**Meet the parts** (B3): s0 shows both chips with their pin names; s1–s4 introduce the four lines as the Flow names them.

**Values beside their element**: the bit digits under MISO; the weights under each bit; 182 and 109 in the reading rows'
key entries.

**Colours and their second channel** (C4): each line also by its name (pin names in the blocks, the key); the two readings
by their row names *MSB first*, *LSB first*; the strip's states by line type (solid driven, dashed released, hatched not
defined).

## 4. The run: step by step, as the Flow goes

### 4a. Steps

| # | id (tour stop) | Flow paragraph (first words) | What changes (`say`) | Presenter's control |
|---|---|---|---|---|
| — | the multi-select, p0–p3 (§7a) | | | the activity |
| 0 | (before the walk) | p4 *"The bits themselves are not enough…"*, p5, p6 | An ADC and a microcontroller, wired by SPI, and one byte on the wires. | (the card opens) |
| 1 | `line-sclk` | p8 *"SCLK — clock"* | SCLK: the controller's clock. | Next |
| 2 | `line-mosi` | p8 *"MOSI — data from the controller…"* | MOSI: data from the controller to the peripheral. | Next |
| 3 | `line-miso` | p8 *"MISO — data from the peripheral…"* | MISO: data from the peripheral to the controller. | Next |
| 4 | `line-cs` | p8 *"CS/SS — chip select"* | CS/SS: chip select, low to choose this peripheral. | Next |
| 5 | `strip-cs` | p9 *"It also involves communication details such as clocking…"*, then unscripted | CS goes low: the transfer begins; it ends when CS goes high. | Next |
| 6 | `strip-sclk` | unscripted | Eight rising edges: the controller reads one bit on each. | Next |
| 7 | `strip-miso` | unscripted | The ADC's eight bits, 1 0 1 1 0 1 1 0, each changed on a falling edge. | Next |
| 8 | `read-msb` | unscripted (*"…bit ordering"*) | Read with the first bit as the most significant: 182. | Next |
| 9 | `read-lsb` | unscripted; held over p10 | The same wires and edges, the first bit as the least significant: 109. | Next leads to card 5 |

### 4b. Motion, cues and stills

| # | Motion | Movers | Cue and its second channel | Hold | Reduced motion (C3) | Still |
|---|---|---|---|---|---|---|
| 0 | none | 0 | the whole figure, no badge named | hold | whole | s0 |
| 1–4 | the line to full emphasis; its key entry appears | 1 | its colour, heavy; the name | hold | at once | s4 |
| 5–7 | the row to full emphasis, the others dimmed | 1 | the row lit, the strip dimmed around it | hold | at once | s5, s7 |
| 8–9 | the weight row lit; its sum appears in the key | 1 | the row and its number | hold | at once | s8, s9 |

Five stills (s0, s4, s5, s7, s9; s8 too for print). Nothing moves on the strip: it is a timing diagram, read, not played.

## 5. Pacing and interaction, by surface and view

**Who paces** (B12): the presenter on the wall (the tour's `step` mirrored); the learner in Study and Scope.

| View | Who | Controls |
|---|---|---|
| Preview (in the slide) | everyone | the figure; the current stop |
| View (details) | everyone | the *Walk* pane, the *Parts* pane (the key), zoom to the strip |
| Edit (session only) | everyone | not specified for the Figure Bench |
| Authoring | authors | the `figure` block's YAML; the SVG |

- **The presenter's strip** (B20): *stop n / 9*, the next stop's `say` and its unscripted line (§2); the teacher tip; keys.
- **Study / Scope**: the walk learner-paced; tapping a row shows its note.
- **Phone** (C6): the figure full width; a `zoom` target `strip` (rect [0.0, 0.41, 1.0, 0.59]) so the strip can fill the
  phone's width; the key under the figure.
- **Locked**: the walk starts after the multi-select closes (the figure's card follows it).

## 6. The frame

| Tile / panel | Used? | Selected item | List / contents |
|---|---|---|---|
| Figure: Walk | yes | the active stop | nine stops with notes |
| Figure: key | yes | — | the numbered features as revealed |
| Figure: zoom | Study, Scope, phone | — | *Whole*, *strip* |

Title *SPI: one byte from the ADC*; the caption (mode 0) under the figure.

## 7. Thinking, not watching

- **7a. The PLAN's ASK** (verbatim): *multi-select (before the statement) — "One device sends 10110110. Which of these must the
  receiver know before those bits mean anything?" · options: Which bit comes first | When each bit is valid (the clock edge)
  | Where the transfer starts and ends | The logic voltage levels | Whether the sender's ADC is SAR or sigma-delta · answer:
  Which bit comes first | When each bit is valid | Where the transfer starts and ends | The logic voltage levels · reveal: the
  Figure's two readings of the same strip · explain: Read MSB-first the byte is 182 and LSB-first it is 109, while the
  converter's architecture changes nothing about how the bits travel. · depth: understand · practice: asking questions.* It
  fires at p2, **before s0**, on its own card; **s8–s9 reveal it**, and s5–s7 show the other three answers (where the
  transfer starts and ends: CS; when each bit is valid: the rising edges).
- **7b. Prediction point**: the multi-select is the prediction. The reveal comes ≈ 1.5 min after the question (p4–p9:
  0.82 + 0.51 + 0.17), at s8–s9 (F-c4-5 (a), decided; the earlier reveal, option (c), was not taken).
- **7c. After**: the explain. In Study, done means the multi-select answered and the walk reached s9.
- **7d. Teacher tip** (F-c4-6 (a), decided), presenter only: *Expect "SAR or sigma-delta" ticked by those who think the
  converter decides the format. Ask: on this strip, where would you see whether it was a SAR? Nowhere: the wires carry
  bits, not the method that found them. Most SPI ADCs send MSB first; the controller's SPI peripheral usually has a bit
  that chooses the order, which is exactly why both sides must agree.*
- **7e. Explore**: none.

## 8. Faithfulness (the quality bar)

**Arithmetic** (Node, 2026-10-20):
- MSB first: 1·128 + 0·64 + 1·32 + 1·16 + 0·8 + 1·4 + 1·2 + 0·1 = **182** = `parseInt('10110110', 2)` ✓.
- LSB first: the first bit weighs 1, so the value is the reversed string 01101101 = 1 + 4 + 8 + 32 + 64 = **109** ✓.
- Geometry: x(t) = 320 + 70t; rising edges at t odd = each cell's centre ✓ (cell k spans 2k − 2 … 2k); CS low spans
  t = 0 … 17 and contains all sixteen edges ✓; the first rising edge (t = 1) is half a bit after CS falls, so bit 1 is
  valid before it is read ✓ (CPHA 0); no edge falls while CS is high ✓.

**SPI facts, against sources** (cited here only; nothing on a teaching surface names a maker or part):
- Mode 0 = CPOL 0, CPHA 0: the clock idles low; data sampled on the rising edge and shifted out on the falling edge —
  Piyu Dhaker (Analog Devices), *Introduction to SPI Interface*, Analog Dialogue volume 52, number 3 (52-09, September
  2018): **Table 1**, the mode-0 row (CPOL 0, CPHA 0, idle *"Logic low"*, *"Data sampled on rising edge and shifted out on the
  falling edge"*), and **Figure 2**, *"SPI Mode 0, CPOL = 0, CPHA = 0: CLK idle state = low, data sampled on rising edge and
  shifted on falling edge."* **Confirmed 2026-10-20** against the article's full text as republished under the same title and
  author on embeddedcomputing.com (*Introduction to the SPI Interface*); analog.com itself still timed out from this
  machine, so the issue number and date are from analog.com's own media path (`analog-dialogue/volume-52/number-3/`) and
  its Chinese edition's listing (52-09, September 2018), read through a search. Cited for mode 0 only: as republished, its
  rows for modes 2 and 3 pair CPOL and CPHA differently from the usual numbering, and the card uses neither.
- CPHA 0: the first data bit is output as soon as the peripheral is selected, before the first clock edge; the bit order is
  a setting, not fixed by SPI; a deselected peripheral releases MISO — **confirmed 2026-10-20** in Motorola, *SPI Block User
  Guide*, S12SPIV2/D, V02.07 (original release 21 Jan 2000, revised 11 Dec 2002), read in full:
  - §3.3.1, SPI Control Register 1 (SPICR1): **CPOL** *"0 = Active-high clocks selected; SCK idles low"*; **CPHA** *"0 =
    The first SCK edge is issued one-half cycle into the 8-cycle transfer operation"*; **LSBFE** (*"SPI LSB-First
    Enable"*): *"1 = Data is transferred least significant bit first. 0 = Data is transferred most significant bit
    first."* The bit order is the controller's setting.
  - §4.3, Slave Mode: *"if SS is high (not selected), the serial data output pin is high impedance, and, if SS is low the
    first bit in the SPI data register is driven out of the serial data output pin"*; and *"When CPHA is clear and the SS
    input is low (slave selected), the first bit of the SPI data is driven out of the serial data output pin."*
  - §4.4.1, Clock Phase and Polarity Controls: *"Clock phase and polarity should be identical for the master SPI device and
    the communicating slave device."* (with §3.3.1's *"the SPI modules must have identical CPOL values"*): the agreement
    F11's *"which both devices must set the same way"* states.
  - §4.4.2, CPHA = 0 Transfer Format, and Figure 4-2 (*SPI Clock Format 0*): data latched on the odd-numbered edges (with
    CPOL 0, the rising ones) and shifted on the even ones, sixteen edges for eight bits; the figure's two bit rows, *"MSB
    first (LSBFE = 0)"* and *"LSB first (LSBFE = 1)"*, are this card's two readings.
  The AVR SPCR's **DORD** (data order) bit and the CPHA = 0 definition in the AMD AXI Quad SPI guide (PG153) say the same
  and are kept as further references, not re-read here.
- A deselected peripheral releases MISO (high impedance), which is what lets several share it (card 9) — S12SPIV2 §4.3
  above; §4.4: *"slave devices that are not selected do not interfere with SPI bus activities"*.
- An SPI clock of the class runs at about 1–20 MHz (MCU SPI peripherals and SPI ADCs); no bit time is printed on the strip.

**Section D, Figure rows**
- [x] Our own drawing; nothing redrawn; nothing branded.
- [x] Named parts on the right features (§3b's fractions from §3a's coordinates: 80/900 = 0.089, 150/900 = 0.167,
  220/900 = 0.244, 290/900 = 0.322; strip rows 390/900 = 0.433, 490/900 = 0.544, 590/900 = 0.656, 735/900 = 0.817,
  805/900 = 0.894; x 250/1600 = 0.156, width 1330/1600 = 0.831).
- [x] Legible: to check on the render (§10).

**A1–A8**: A1 ✓ (182, 109 recomputed; the explain's numbers match); A2 ✓ (mode 0 drawn exactly; released and not-defined
states drawn rather than guessed); A3 ✓ (the edges at CS's fall and rise; the half bit after the last falling edge); A4 ✓
(card 2's *bit order* and *framing* lines are what s5 and s8–s9 show; card 8's *lets go* is MISO's release); A5 ✓; A6 ✓
(**F-c4-1, register D2·010-F11, applied and re-checked**, round two: p9 now reads *"It also involves communication details
such as **clocking, timing, data sampling and bit ordering**, which both devices must set the same way."* SPI's modes fix
the clocking and sampling, which both ends must match (S12SPIV2 §4.4.1); the bit order is a setting (LSBFE, §3.3.1; DORD);
*"involves"* no longer says SPI defines the order, and *"must set the same way"* is the card's own point, 182 or 109 on the
same wires. Where a peripheral's order is fixed by its design, the controller is the side that is set to match: the two
still agree, as the sentence requires, and the teacher tip (§7d) says the controller's peripheral usually has the bit); the
multi-select's *"The logic voltage levels"* as a thing to know is consistent with card 2 ✓; A7 ✓ (sources above, both
confirmed 2026-10-20); A8 ✓. **No finding open.**

## 9. Faults and non-ideal behaviour

**PLAN FAULT**: none on this card. The figure itself is the fault case: a receiver set to the other bit order reads 109 for
182 and reports no error. Not shown (said if asked): the wrong SPI mode, which samples each bit at its change and reads
garbage or a one-bit shift.

## 10. Accessibility, legibility and print

- Wall (C2): connection rows 70 units apart (≈ 48 px); strip cells 140 units (≈ 97 px) wide, the digits and weights at the
  floor; the key (numbers) holds the longer names. Check at 1920 × 1080 and 1024 × 768, EN and FR (*MOSI : contrôleur →
  périphérique* ≈ 30 % longer).
- Reduced motion (C3): every stop lands at once.
- Colour (C4): line names, row names and line types carry everything colour does.
- Keyboard (C5): the tour's keys.
- Print (C8): s9 with the key (both readings), and the caption's mode statement.

## 11. Assets to make or source

| Asset | Format | Made by | Status |
|---|---|---|---|
| `figures/d2-010-spi-one-byte.svg` (§3a), neutral ink | SVG (rendered for the owner first, a visual milestone) | the author | to make |
| The `figure` block (§3b), EN and FR | YAML in `en.md` | the author | to write |

## 12. Bench capabilities this needs

**Figure Bench**: `path` and `rect` features, colours, `label`/`note` `{en, fr}`, mirrored `tour`, `reveal: on-tour`,
`labels: numbers`, `spotlight: dim`, `zoom`: **exist** (read 2026-10-20).

**Missing**: none for this card. **To check**: the SVG's neutral ink on both themes' grounds (as card 2).

**Not this bench's**: playing the transfer in time (an Animation would; the PLAN asks for a strip to read, and a timing
diagram is how the real thing is documented).

## 13. Stand-in for the lecture

None needed.

## 14. Findings for the owner

Round two decided every item below (2026-10-20; the paragraph after the list). **F-c4-1 was an accuracy finding (register
D2·010-F11): decided, applied to `en.md` by the lead and re-checked here (§8 A6); nothing on this card is open.**

- **F-c4-1 (accuracy; register D2·010-F11) — p9, *"It also defines communication details such as **clocking, timing, data sampling and bit
  ordering**."*** SPI (a de facto standard, with no governing document) fixes the clocking and sampling through its four
  modes (CPOL, CPHA), but **not** the bit order or the word length: those are each device's, and controllers make the order
  a setting (LSBFE on the Motorola SPI, DORD on the AVR). The card's own Figure shows it: the same SPI strip reads 182 or 109.
  Options:
  - (a) *"It also involves communication details such as **clocking, timing, data sampling and bit ordering**, which both
    devices must set the same way."* (+8 words; **recommended**: true, and it is the card's point);
  - (b) *"Its clock modes define when data is sampled; the bit order and word length are left to the devices, and both must
    match."* (a fuller rewrite);
  - (c) keep.
  **Decided: (a), applied** (+8 words, as estimated; §2 recounted).
- **F-c4-2 — Proposal: the mode, stated.** The brief drew mode 0 without naming it. Options: (a) SPI mode 0 (CPOL 0,
  CPHA 0) in the caption (§3b), the strip drawn to it exactly, MISO released outside CS and *not defined* after the last
  falling edge (**recommended**); (b) the caption without CPOL/CPHA (*"the clock idles low; each bit is read on a rising
  edge"*); (c) as the brief drew it, unnamed. **Decided: (a).**
- **F-c4-3 — Proposal: a shared ground drawn.** A real SPI link has a common ground besides the four lines. Options: (a) a
  hairline *GND (shared)* under the four (**recommended**: realism; card 9 counts signal lines and says the same); (b) not
  drawn. **Decided: (a).**
- **F-c4-4 — Proposal: names in the key (`labels: numbers`).** Options: (a) badges on the figure and names in the key,
  collision-safe on the strip (**recommended**); (b) `labels: on-figure`, 182 and 109 written beside their rows (more
  direct; the strip's rows then need ≈ 20 % more height to pass the collision check). **Decided: (a).**
- **F-c4-5 — Proposal: the four lines toured as p8 names them (s1–s4), and the reveal's timing.** The PLAN's tour starts at
  CS; p8 names SCLK, MOSI, MISO, CS first. Options: (a) s1–s4 on p8, then the PLAN's tour s5–s9 (**recommended**: the
  figure follows the Flow; the reveal lands at p9's *"bit ordering"*); (b) the PLAN's tour only, at p8, and the readings on
  p9 (no stops for the lines; 0.1 min shorter); (c) the two readings first, at p4, straight after the multi-select, and the
  tour after (the reveal immediate, the order of the transfer second). **Decided: (a).**
- **F-c4-6 — Proposals**: the caption (F-c4-2), the teacher tip (§7d), the zoom target `strip` for phones. Options: (a) all
  (**recommended**); (b) none. **Decided: (a).**
- **F-c4-7 — The card's time, 3.2 min** (2.1 on the bench), with ≈ 40 unscripted words over the PLAN's tour. Reported only.
  With F11's words, 3.23 / 2.14: the same 3.2 / 2.1; still reported only (D5).

**Decided 2026-10-20 (owner: *"apply all recommendations"* on the U019 brief):** **D2** — card 4 on the PLAN's bench, a
Figure, the asset ours to draw (this spec: `spi-one-byte`); **N1** — no product names on teaching surfaces (the chips here
are *ADC* and *MCU*, classes; sources cited in §8 only). F-c4-1 to F-c4-7 above were new and open after that round; F-c4-1
was an **accuracy** finding.

**Decided 2026-10-20, round two (owner: *"apply all recommendations"* on the U019 brief's *Specs: round two*, F11 and C4:
*"Take them; confirm the two sources"*):** **F-c4-1 (a)** (accuracy, register D2·010-F11) — p9 reads *"It also involves
communication details such as **clocking, timing, data sampling and bit ordering**, which both devices must set the same
way."*, applied to `en.md` by the lead, re-checked against the SPI sources (§8 A6 ✓), the card's time recomputed (§2: 266
words, 3.2 / 2.1 min, unchanged by rounding); **F-c4-2 (a)** — SPI mode 0 (CPOL 0, CPHA 0) named in the caption, the strip
drawn to it, MISO released outside CS and *not defined* after the last falling edge (§3a, §3b); **F-c4-3 (a)** — the hairline
*GND (shared)* under the four lines (§3a); **F-c4-4 (a)** — `labels: numbers`, the names in the key (§3b); **F-c4-5 (a)** —
the four lines lit as p8 names them (s1–s4), then the PLAN's tour CS → SCLK → MISO → 182 → 109 (s5–s9) (§4a; the reveal
≈ 1.5 min after the question, §7b); **F-c4-6 (a)** — the caption, the teacher tip (§7d) and the phone's `strip` zoom (§5);
**F-c4-7** — the time, reported only. **The two sources marked *to confirm* are confirmed** (§8): the mode-0 table row and
Figure 2 of the Analog Dialogue article, read in its republished full text (analog.com itself unreachable from this machine:
the issue's number and date from analog.com's media path and a search listing), and the Motorola *SPI Block User Guide*
S12SPIV2/D V02.07, read in full (§3.3.1 CPOL, CPHA, LSBFE; §4.3; §4.4.1; §4.4.2 and Figure 4-2). **Re-checked (A1–A7)** on
everything that changed (§8): no finding. **Nothing on this card is open**: the spec is **spec-ready**.

## 15. Acceptance: how we know it is built right

- The figure compiles with §3b's fields; the nine features land on their lines and rows.
- The strip, measured on the render: SCLK low outside the eight pulses; eight rising edges at the cells' centres, all inside
  CS's low span; MISO driven from CS's fall, changing only at falling edges, released outside CS; the digits read
  1 0 1 1 0 1 1 0 left to right.
- s8's key shows *MSB first: 182*, s9's *LSB first: 109*, neither before its stop.
- B1 one feature per stop; B2 only the toured part changes; B4 the stills of §4b; B5 each `say` on the strip; B9 the
  multi-select before the reveal; B10 the explain, no verdict on the wall; B13 names and values only; B17 both readings
  under one strip; B20 the unscripted lines and the tip on the strip.
- C2 legible at 1920 × 1080 and 1024 × 768, EN and FR; C3 every stop at once; C4 names and line types; C5 the tour's keys;
  C6 at 320 px with the `strip` zoom; C8 the s9 print.
- E1–E6, both themes, EN and FR.
- **Six gates (this spec)**: (1) realism: a real SPI mode-0 read, IEC IC rectangles, the shared ground, released and
  not-defined states drawn ✓; (2) science: CPOL 0 and CPHA 0 exactly (first bit at CS's fall, change on falling, read on
  rising), MISO released when deselected, bit order a setting (F-c4-1 decided and applied), against two confirmed sources ✓; (3) maths: 182 and 109 recomputed, every
  edge's position computed from one time scale ✓; (4) visualization: one strip, two weight rows, two numbers; the tour in
  the order of a transfer ✓; (5) consistency: ADC left as cards 1–2; one colour per line meaning, kept on card 9; p9 as
  applied (F11) quoted in §2 and §4a; F-c4-1 decided, applied and re-checked ✓; (6) design: rows and cells at the floor by arithmetic, the key for long
  names, EN and FR ✓ on paper, to check on the render.
