```yaml
id: D2-010-02-both-digital
card: "Both digital — so compatible?"
module: notes/Day02/010-digital-interfaces/en.md
bench: Figure                     # the PLAN's bench (D2, 2026-10-20); the asset is ours to draw
library: "nine-agreements: a Figure of our own SVG, `figures/d2-010-nine-agreements.svg`: two chips facing each other (an ADC and a microcontroller, both marked 3.3 V), nine labelled agreement lines between them; nine features, one per line, toured one per Flow bullet: the first teal (the one they agree on), the other eight amber"
dimensions: 2D
stand_in: none                    # the Figure Bench exists; the PLAN's lit-so-far look needs a cumulative tour, asked of Benches by crossing (F-c2-4 (a)); until it lands the one-at-a-time tour carries the card (§13)
optional_benches: []
real_thing: "the compatibility questions an engineer checks before wiring two digital devices (an external ADC and a 3.3 V microcontroller), as a labelled diagram: not to scale; the lines are agreements, not wires"
minutes: 2.7                      # on the bench: from p2 (after the poll) to the card's end (§2); 2.6 before F10's +7 words
card_minutes: 3.7
status: spec-ready                # round two decided 2026-10-20: F10 (F-c2-1) applied and re-checked, F-c2-2 right as it stands, proposals taken; nothing open; the cumulative tour asked of Benches, not built (§12, §13)
learner_action: poll
predictions: []                   # the PLAN's poll is the prediction; it fires before the Figure
seeds: []
key_variable: "how many of the nine things the two devices agree on: one (3.3 V logic) against eight still open"
time_scale: "none (tour stops)"
steps: 10                         # s0 (the figure, unlit), s1–s9 (one per Flow bullet)
```

**Written 2026-10-20 (U019)** after the owner's choices on the U019 brief (*"apply all recommendations"*): **D2** (cards 1, 2
and 4 on the PLAN's benches; card 2 a Figure, ours to draw) and **N1** (no product names on teaching surfaces: *"a 3.3 V
microcontroller"*). The brief page's `draw2` (`bench-work/previews/u019-preview.html`) is the approved model: ADC left, MCU
right, nine lines; before the poll unlit; then *"voltage levels: 3.3 V logic"* teal; then eight amber, one at a time.
**Round two decided 2026-10-20** (owner: *"apply all recommendations"* on the U019 brief's *Specs: round two*, F10 and C2):
bullet 8 now reads as F-c2-1 (a) recommended, applied to `en.md` by the lead; the Figure is kept and Benches is asked for a
cumulative tour; *"from signal conditioning"* stands; the proposals are taken (§14).

**What the Figure Bench offers** (read 2026-10-20, read-only, `C:\ExSightory\src\insight\packages\insight-core\src\registry\figureBlock.ts`,
`figure/style.ts`, `canvas/src/figureTypes.ts`, `canvas/src/FigureBench.vue`): an `image` (SVG) with `features` (stable ids;
`path`, `rect`, `arrow` … geometry as fractions), each with `label`, `note`, `colour` (`teal`, `amber`, `violet`, `lime`,
`rose`, `azure`, `orange`, `magenta`), `weight` (`hairline`, `normal`, `heavy`), `line`; a `tour` (each stop names one
`feature`, an optional `zoom` and a `note`), its `step` mirrored; `reveal: on-tour` (*"the marks stay and the names go"*: a
name is shown once the walk has reached it, `nameShown`); `labels` (`numbers`, `callouts`, `on-figure`, `none`) with a
compile-time label-collision check at projector size; `spotlight` (`dim` …). **A tour lights one feature at a time**: the
active one at full emphasis, the others drawn *quiet* in their own colour (stroke-opacity 0.16–0.34 in `FigureBench.vue`).
There is no mode in which earlier stops **stay lit**: it is asked of Benches by crossing (F-c2-4 (a), §12).

## 1. What the room must understand

- **Statement** (verbatim): *Digital does not automatically mean compatible. Two digital devices can still disagree about
  voltage levels, timing, clocking, bit order, word size, protocol, framing, direction and electrical characteristics.*
- **SHOW** (verbatim from the PLAN): *Figure — two chips facing each other, nine labelled lines between them: voltage levels,
  timing, clocking, bit order, word size, protocol, framing, direction, electrical characteristics.*
- **Drive** (verbatim): *after the poll, light "3.3 V logic" teal (the one they agree on), then the other eight amber, one
  per Flow bullet.*
- **Look for** (verbatim): *one agreement and eight open questions.*
- **Status** (verbatim): *needs asset: nine-point checklist SVG (ours to draw)*
- **Bench and library.** The **bench** is the Figure Bench (M20/M23). The **library** is this card's figure,
  `nine-agreements`: our SVG and its `figure` block.
- **Insight**: *two devices that share a logic voltage have settled one question of nine; timing, clocking, bit order, word
  size, protocol, framing, direction and electrical characteristics are still open.*
- **Kind of knowledge**: *a picture built up* (a checklist lit item by item) over *a contrast between two states* (agreed
  against open). Card test → Draw or Figure; the PLAN and D2 chose **Figure** (an SVG in our hands, toured). B17 applies
  (one teal against eight amber); B15, B18, B19 do not.
- **Why this bench, not a still**: the room has just voted on *"will they talk?"*. Each line lights as its bullet is spoken,
  so the room counts the open questions growing, one teal against more and more amber. A still gives all nine at once and
  the count is not felt.
- **Key variable**: the count of open questions.

## 2. Time

The card's Flow is **370 words** (`en.md`, recounted 2026-10-20 after F10 applied, +7 words in bullet 8; whitespace tokens, cue
markers removed, list markers counted, as the U019 brief counts them; it was 363). p0, the `[[ask]]` (23 words), is counted in
the poll. **347 words are spoken outside it = 2.67 min.**

| Beat | Minutes | Source of the number |
|---|---|---|
| The poll (its own card, before the statement): p0 *"[[ask]] Suppose an ADC and a microcontroller…"* (23), the answer window, the spread (p1 `[[pause]]`) | 1.0 | the task's figure for a poll |
| s0 the figure, unlit: p2 *"It is tempting to think…"* (23), p3 *"Think about it this way…"* (36), p4 *"Two devices may both use digital signals…"* (11) | 0.54 | 70 ÷ 130 |
| s1–s9 one stop per bullet of p5 (*"Voltage levels…"* to *"Electrical characteristics…"*, 126 words) | 0.97 | 126 ÷ 130 |
| s9 held: p6 *"For example, an ADC may produce a 16-bit…"* (56), p7 *"Even if both devices use 3.3 V logic…"* (34), p8 *"This brings us back…"* (34), p9 *"Therefore: digital does not…"* (27) | 1.16 | 151 ÷ 130 |
| Stops not covered by speech | 0 | each stop is a press as its bullet begins; the emphasis is `quick` (no wait) |
| **Card total / of which on the bench** | **3.7 / 2.7** | 3.67 / 2.67 (3.62 / 2.62 before F10) |

**Module check**: `D2-010-07-choosing-the-pull-up.md` §2b (≈ 31.6 of 30 min before round two's Flow changes; F10, F11 and F9
add 20 words, 0.15 min: ≈ 31.8). Reported only.

## 3. The scene: what is on the bench

### 3a. The SVG (`figures/d2-010-nine-agreements.svg`), ours

Artboard **1600 × 900** (16:9). Drawn in the course's diagram look: neutral ink on the Figure's ground, no colour in the
image itself (the colours are the features', so they can be toured). Unbranded (N1).

| Element | Geometry (artboard units) | What | Source |
|---|---|---|---|
| ADC block | x 60–330, y 60–860, corner 12 | an IEC-style IC rectangle; *ADC* (role label) and *3.3 V* under it | the poll's premise |
| MCU block | x 1270–1540, y 60–860 | *MCU* and *3.3 V* under it (*MCU*: the class, not a product, N1) | the poll's premise |
| Nine agreement lines | from x 330 to x 1270, at y = 100 + 90 i (i = 0…8: 100 … 820) | thin, **dotted**, neutral: agreements, not wires (F-c2-3 (a), decided); no pins drawn where they meet the blocks | the PLAN's nine; the statement's order |
| No labels in the image | — | the nine names are the features' labels, so `reveal: on-tour` can hold them back | `figureTypes.ts` `nameShown` |

The ADC is on the left and the MCU on the right, as the brief drew it and as card 4 does: data flows left to right, as on the
course path (card 1).

### 3b. The `figure` block

| Field | Content |
|---|---|
| `title` | EN *Both digital: what must they agree on?* · FR *Tous deux numériques : sur quoi doivent-ils s'accorder ?* |
| `image` | `figures/d2-010-nine-agreements.svg` |
| `alt` | EN *An ADC and a microcontroller, both on 3.3 V logic, with nine lines between them naming what they must agree on: voltage levels, timing, clocking, bit order, word size, protocol, framing, communication direction and electrical characteristics.* · FR *Un CAN et un microcontrôleur, tous deux en logique 3.3 V, reliés par neuf lignes qui nomment ce sur quoi ils doivent s'accorder : niveaux de tension, temporisation, horloge, ordre des bits, taille des mots, protocole, tramage, sens de la communication et caractéristiques électriques.* |
| `caption` (F-c2-3 (a), decided) | EN *Nine things two digital devices must agree on. They are not nine wires.* · FR *Neuf points sur lesquels deux composants numériques doivent s'accorder. Ce ne sont pas neuf fils.* |
| `labels` | `on-figure` (each name centred above its line); fallback `numbers` if the compiler's collision check warns (§10) |
| `reveal` | `on-tour` (F-c2-3 (a), decided): the nine marks are there from s0, each name arrives with its bullet |
| tour mode (**requested**, F-c2-4 (a); the field's name is Benches') | **cumulative**: a line reached stays at full emphasis when the walk moves on, so s9 shows one teal and eight amber together. Until the Figure Bench has it, the field is left out and the tour lights one stop at a time (§13) |
| `spotlight` | `none` (the quiet lines stay readable) |
| `motion` | `quick` |
| `features` / `tour` | the table below, in this order |

| # | Feature id | Geometry (`path`, fractions) | Colour, weight | Label EN · FR | Tour `note` (EN, the Flow's own words after the dash) · FR |
|---|---|---|---|---|---|
| 1 | `agree-voltage` | [[0.206, 0.111], [0.794, 0.111]] | `teal`, `heavy` | *voltage levels: both 3.3 V logic* · *niveaux de tension : logique 3.3 V des deux côtés* | *for example, 5 V logic versus 3.3 V logic. Here both are 3.3 V: this one they agree on.* (the second sentence ours, F-c2-5 (a), decided) · *par exemple, logique 5 V contre logique 3.3 V. Ici, les deux sont en 3.3 V : sur ce point, ils sont d'accord.* |
| 2 | `q-timing` | y 0.211 | `amber`, `heavy` | *timing* · *temporisation* | *when data should be sampled or considered valid* · *quand les données doivent être échantillonnées ou considérées comme valides* |
| 3 | `q-clocking` | y 0.311 | `amber` | *clocking* · *horloge* | *whether a shared clock is used and how it is interpreted* · *si une horloge commune est utilisée, et comment elle est interprétée* |
| 4 | `q-bit-order` | y 0.411 | `amber` | *bit order* · *ordre des bits* | *whether the most significant bit or least significant bit is sent first* · *si le bit de poids fort ou le bit de poids faible est envoyé en premier* |
| 5 | `q-word-size` | y 0.511 | `amber` | *word size* · *taille des mots* | *whether the data is transferred as 8-bit, 12-bit, 16-bit, 24-bit words, etc.* · *si les données sont transférées en mots de 8, 12, 16 ou 24 bits, etc.* |
| 6 | `q-protocol` | y 0.611 | `amber` | *protocol* · *protocole* | *the rules governing how the devices communicate* · *les règles qui régissent la communication entre les composants* |
| 7 | `q-framing` | y 0.711 | `amber` | *framing* · *tramage* | *how the beginning and end of a data transmission are identified* · *comment le début et la fin d'une transmission sont repérés* |
| 8 | `q-direction` | y 0.811 | `amber` | *communication direction* · *sens de la communication* | *whether communication is one-way, two-way on separate lines, or two-way on one shared line* (F10 applied) · *si la communication est unidirectionnelle, bidirectionnelle sur des lignes séparées, ou bidirectionnelle sur une seule ligne partagée* |
| 9 | `q-electrical` | y 0.911 | `amber` | *electrical characteristics* · *caractéristiques électriques* | *such as drive capability, pull-up requirements, impedance, and signal integrity* · *comme la capacité de commande, les résistances de tirage, l'impédance et l'intégrité du signal* |

Every path runs x 0.206 → 0.794 (330 → 1270 of 1600); y = (100 + 90 i)/900. Numbers in FR keep the '.' decimal (*3.3 V*):
numbers and units are never translated (`languages-follow-the-parent-app`). All FR drafts ours, for the owner's review.

**Meet the parts** (B3): the two chips and their *3.3 V*, at s0, are the poll's premise; the lines are introduced one by one.

**Values beside their element**: *3.3 V* under each chip; the word sizes in note 5 (the Flow's).

**Colours and their second channel** (C4):

| Thing | Ink | Second channel |
|---|---|---|
| The two chips, the dotted lines | neutral (the SVG) | shape and words |
| The agreed line | `teal` | its label *both 3.3 V logic*, first in the list |
| The eight open lines | `amber` | their labels; position in the list |
| The lines reached so far | their colour, at full emphasis (cumulative tour; today only the active one) | weight (`heavy`) and their names, against the quiet, unnamed lines still to come |

## 4. The run: step by step, as the Flow goes

### 4a. Steps

| # | id (tour stop) | Flow paragraph (first words) | What changes (`say`, the stop's strip line) | Presenter's control |
|---|---|---|---|---|
| — | the poll, p0–p1 (§7a) | | | the activity |
| 0 | (before the walk) | p2 *"It is tempting to think…"*, p3, p4 *"Two devices may both use digital signals and still disagree about:"* | Two 3.3 V chips and nine questions between them, not yet named. | (the card opens) |
| 1 | `agree-voltage` | p5 bullet 1 *"Voltage levels…"* | Voltage levels: both run on 3.3 V logic. The one they agree on. | Next |
| 2 | `q-timing` | bullet 2 *"Timing…"* | Timing: when is the data valid? Open. | Next |
| 3 | `q-clocking` | bullet 3 *"Clocking…"* | Clocking: a shared clock, and how it is read? Open. | Next |
| 4 | `q-bit-order` | bullet 4 *"Bit order…"* | Bit order: which bit comes first? Open. | Next |
| 5 | `q-word-size` | bullet 5 *"Word size…"* | Word size: 8, 12, 16 or 24 bits? Open. | Next |
| 6 | `q-protocol` | bullet 6 *"Protocol…"* | Protocol: the rules of the exchange. Open. | Next |
| 7 | `q-framing` | bullet 7 *"Framing…"* | Framing: where a transfer begins and ends. Open. | Next |
| 8 | `q-direction` | bullet 8 *"Communication direction…"* | Direction: one way, or both, on separate lines or one shared? Open. | Next |
| 9 | `q-electrical` | bullet 9 *"Electrical characteristics…"*; held over p6–p9 | Electrical characteristics: drive, pull-ups, impedance, signal integrity. One agreed, eight open. | Next leads to card 3 |

### 4b. Motion, cues and stills

| # | Motion | Movers | Cue and its second channel | Hold | Reduced motion (C3) | Still |
|---|---|---|---|---|---|---|
| 0 | none (the figure appears with the card) | 0 | the nine quiet marks, unnamed | hold | whole | s0 |
| 1 | the teal line comes to full emphasis; its name appears (`motion: quick`) | 1 | teal, heavy; the name | hold | at once | s1 |
| 2–9 | the next line to full emphasis in amber, the earlier ones staying lit (cumulative tour; until it lands, the previous one goes back to quiet); its name appears and stays | 1 | amber, heavy; the name arriving | hold | at once | s5, s9 |

Four stills (s0, s1, s5, s9). Nothing flashes (B8). With the cumulative tour (F-c2-4 (a)), s9 shows every name and all nine
lines at full emphasis, one teal and eight amber: the PLAN's *"one agreement and eight open questions"*. Until it lands, s9
shows every name with line 9 active and the other eight quiet in their colours (§13).

## 5. Pacing and interaction, by surface and view

**Who paces** (B12): the presenter on the wall (the tour's `step` is mirrored); the learner in Study and Scope.

| View | Who | Controls |
|---|---|---|
| Preview (in the slide) | everyone | the figure; the current stop |
| View (details) | everyone | the *Walk* pane (the nine stops with their notes), the *Parts* pane, zoom |
| Edit (session only) | everyone | not specified for the Figure Bench |
| Authoring | authors | the `figure` block's YAML; the SVG |

- **The presenter's strip** (B20): *stop n / 9*, the next stop's `say` and note; the teacher tip (§7d); keys → ←.
- **Study / Scope**: the walk learner-paced; any line tapped shows its note (`on-click: note`, the default).
- **Phone** (C6): the figure full width; at 320 px the labels go to `numbers` with the key under the figure.
- **Locked**: the walk starts after the poll closes (the figure's card follows the poll's card).

## 6. The frame

| Tile / panel | Used? | Selected item | List / contents |
|---|---|---|---|
| Figure: Walk | yes | the active stop's name | the nine stops and notes |
| Figure: Parts | yes | — | the nine names (as revealed) |
| Figure: zoom | Study, Scope | — | Fit |

Title *Both digital: what must they agree on?*; the caption under the figure. Nothing is drawn over the stage.

## 7. Thinking, not watching

- **7a. The PLAN's ASK** (verbatim): *poll (before the statement) — "An ADC and a microcontroller both run on 3.3 V logic.
  Wire them together: will they talk?" · options: Yes, same logic level | Only if they share a protocol | Only if protocol,
  timing and electrical needs all match | Can't tell yet · explain: The poll records what the room assumes; the nine lines
  on the Figure are what the assumption has to survive. · depth: understand · practice: asking questions.* It fires at p0,
  **before s0**, on its own card; s1–s9 answer it.
- **7b. Prediction point**: the poll is the prediction; nothing added.
- **7c. After**: the explain. In Study, done means the poll answered and the walk reached s9. A poll has no right answer on
  the wall (B10).
- **7d. Teacher tip** (F-c2-5 (a), decided), presenter only: *Expect "Yes, same logic level". Ask: does "both 3.3 V"
  settle even the voltage question? Not entirely: thresholds belong to the ninth line. A 3.3 V output of the LVTTL class
  guarantees only V_OH ≥ 2.4 V; an input that needs 0.7·V_DD = 2.31 V accepts it, an input that needs 0.8·V_DD = 2.64 V does
  not. Card 10 lists "input and output voltage thresholds" for that reason.*
- **7e. Explore**: none.

## 8. Faithfulness (the quality bar)

**Numbers**: 3.3 V (the poll's premise); 0.7 × 3.3 = **2.31 V**, 0.8 × 3.3 = **2.64 V**, LVTTL V_OH ≥ **2.4 V** (the tip only;
JEDEC JESD8C, LVTTL/LVCMOS 3.3 V class levels; the 0.7·V_DD and 0.8·V_DD input thresholds as MCU datasheets of the class give
them, cited here only). Word sizes 8, 12, 16, 24 bits are the Flow's and real (ADC result widths of the class).

**Section D, Figure rows**
- [x] Our own drawing: no licence, nothing redrawn from a source; nothing on it names a maker or part (N1).
- [x] Named parts on the right features: each path on its dotted line (§3b, fractions recomputed from §3a's y = 100 + 90 i).
- [x] Legible at 1920 × 1080: to check on the render (§10).

**A1–A8** (on the owner's text and this spec):
- A1 ✓ (no computed number in the owner's text; the tip's three recomputed above).
- A2 ✓: *"Even if both devices use 3.3 V logic, an SPI device cannot simply be connected to an I²C interface"* — true
  (different lines, signalling and addressing).
- A3 ✓ (no edge cases on this card).
- A4 ✓ (**F-c2-2 resolved: right as it stands**, round two): p8 *"This brings us back to an important idea from signal
  conditioning"*. D1·060 card 2, *What conditioning does*, says *"Signal conditioning is not simply "extra circuitry". It is
  often what makes the interface between the sensor and the measurement system practical at all."*, and places level
  shifting *"where the code crosses between logic families on Day 2"*, which is card 3, next. The room did meet the idea of
  an interface first at D1·040 (*"Connecting anything makes an interface"*), but the sentence's claim, that the idea came up
  in signal conditioning, is true. No change.
- A5 ✓: the nine are real compatibility questions; the figure draws them as agreements, not wires (F-c2-3).
- A6 ✓ (**F-c2-1, register D2·010-F10, applied and re-checked**, round two): bullet 8 now reads *"**Communication
  direction** — whether communication is one-way, two-way on separate lines, or two-way on one shared line"*. Each case is
  real and the module shows two of them: SPI's MOSI and MISO are separate lines that carry the two directions at once (card
  4; Motorola *SPI Block User Guide* S12SPIV2/D V02.07, §4.4: data *"is transmitted (shifted out serially) and received
  (shifted in serially) simultaneously"*); I²C's SDA is one line both directions share (card 8; NXP UM10204 Rev. 7.0, §3.1.1:
  SDA and SCL are *"bidirectional lines"*); one-way is a transmit-only link (a UART's TX alone, or an SPI ADC with no MOSI).
  The bullet lists cases with *"whether"* and does not claim they are the only ones (A6 ✓). The tour note (row 8, §3b)
  quotes the new words and its FR follows; the `say` (§4a) asks the same question. The poll's *"Yes, same logic level"* option and the teal line's *"both 3.3 V logic"* are true as the
  premise states them; the tip covers what they leave out.
- A7 ✓: the tip's levels sourced above; bullet 8's two cases sourced in A6. A8 ✓.
- **Consistency with card 3** (A4, round two): the tip's *"an input that needs 0.8·V_DD = 2.64 V does not"* accept a
  guaranteed 2.4 V; the course's own MCU input (card 3's gauge, HIGH above 0.75·V_DD = 2.475 V) does not either
  (2.4 < 2.475). The tip does not name the course's MCU, so nothing contradicts; the presenter may say so if asked.

## 9. Faults and non-ideal behaviour

**PLAN FAULT**: none on this card. The figure names the faults the module then shows (level shifting, card 3; pull-ups and
drive, cards 6–8). Not shown: anything electrical.

## 10. Accessibility, legibility and print

- Wall (C2): nine labels at 90-unit spacing. On a Canvas about 1100 px wide (0.69 px a unit) the spacing is ≈ 62 px against
  a 32 pt (≈ 43 px) label: it fits with ≈ 19 px between rows. The longest label, *voltage levels: both 3.3 V logic*
  (FR *niveaux de tension : logique 3.3 V des deux côtés*, ≈ 50 % longer), must fit 940 units (≈ 650 px): check EN and FR at
  1920 × 1080 and 1024 × 768; if the compiler's collision check or the floor fails, `labels: numbers` (badges 1–9 on the
  lines, names in the key beside).
- Reduced motion (C3): every stop lands at once.
- Colour (C4): teal against amber also by the label (*both 3.3 V logic*) and its place first; the active line by weight.
- Keyboard (C5): the tour's keys.
- Print (C8): s9 with all nine names, the teal and amber shown, and each note; the poll's question beside it.

## 11. Assets to make or source

| Asset | Format | Made by | Status |
|---|---|---|---|
| `figures/d2-010-nine-agreements.svg` (§3a), neutral ink, no text but the chips' names | SVG (rendered for the owner first, a visual milestone) | the author | to make |
| The `figure` block (§3b), EN and FR | YAML in `en.md` | the author | to write |

## 12. Bench capabilities this needs

**Figure Bench**: `image` (SVG), `features` with `path` geometry, `colour` `teal` and `amber`, `weight: heavy`, `label` and
`note` `{en, fr}`, `tour` mirrored, `reveal: on-tour`, `labels: on-figure` with the collision check, `motion: quick`:
**exist** (read 2026-10-20, the note above §1).

**Missing (requested, F-c2-4 (a))**:
- **A tour whose earlier stops stay lit** (a figure-level `tour-mode: cumulative`, or a stop that names several features:
  the form is Benches' choice), so the walk ends with one teal and eight amber at full emphasis, the PLAN's *"one agreement
  and eight open questions"*. A Figure capability, asked of Benches by a crossing (drafted 2026-10-20 for the lead, its id to
  be assigned). What it must do: a stop brings its feature to full emphasis and leaves the features of earlier stops at full
  emphasis too, in their own colours and weights; Back takes the last one back to quiet; the step stays mirrored; reduced
  motion lands each stop at once; the compile-time collision check counts every lit label. Today the earlier lines are drawn
  *quiet* in their colours, names kept (§13). Cards 4 and 9 do not need it: their tours point at one part at a time, with
  `spotlight: dim`, on purpose (their specs §4).
- **To check**: how the Figure Bench themes an SVG image in light and dark (the neutral ink must read on both grounds); if
  it does not, two exports of the SVG.

**Not this bench's**: nothing; the figure computes nothing.

## 13. Stand-in for the lecture

None needed: the tour as specified runs on today's Figure Bench. Until the cumulative tour lands (F-c2-4 (a)), the end state
shows the nine names, line 9 active and the other eight quiet in their colours: the count *one teal, eight amber* is still
readable, at lower contrast. The Flow is unchanged. When it lands, the `figure` block gains the one field (§3b) and nothing
else changes.

## 14. Findings for the owner

Round two decided every item below (2026-10-20; the paragraph after the list). **F-c2-1 was an accuracy finding (register
D2·010-F10): decided, applied to `en.md` by the lead and re-checked here (§8 A6); nothing on this card is open.**

- **F-c2-1 (accuracy; register D2·010-F10) — bullet 8, *"Communication direction — whether communication is one-way, two-way, or
  bidirectional"*.** *Two-way* and *bidirectional* mean the same in ordinary use, so the room hears three cases and can
  find only two. What the line can usefully separate is whether the two directions use separate lines (SPI's MOSI and MISO,
  card 4) or share one (I²C's SDA, card 8). Options:
  - (a) *"…whether communication is one-way, two-way on separate lines, or two-way on one shared line"* (+8 words;
    **recommended**: each case is real, and cards 4 and 8 show one of each);
  - (b) *"…whether communication is one-way, two-way one direction at a time, or two-way both at once"* (simplex,
    half-duplex, full-duplex);
  - (c) keep.
  **Decided: (a), applied** (+7 words by the count of §2, not the +8 estimated here).
- **F-c2-2 (not an accuracy finding: D1·060 says conditioning "is often what makes the interface … practical at all"; a wording choice) — p8, *"This brings us back to an important idea from signal conditioning"*.** The idea the sentence
  states (*"an interface is not only about what information is being represented. It is also about how that information is
  physically and logically transferred"*) is D1·040's, *"Connecting anything makes an interface"*, with its *"how does
  information get from one side to the other, and what does each side expect?"*, in *The sensor as a source* at 13:25;
  *signal conditioning* is D1·060. Options:
  - (a) *"This brings us back to an important idea from yesterday, when we first met the interface:"* (+5 words;
    **recommended**: true to D1·040 and needs no module name);
  - (b) *"…an important idea from the sensor as a source:"*;
  - (c) keep (D1·060 does say conditioning *"is often what makes the interface … practical"*, but the room met the idea
    itself at D1·040).
  **Decided: (c), right as it stands** (round two, C2: *"Separately, 'an idea from signal conditioning' is right as it
  stands"*); no change (§8 A4).
- **F-c2-3 — Proposals: agreements, not wires.** The PLAN's *"nine labelled lines"* between two chips can read as nine
  wires. Options: (a) the lines dotted and pinless, the caption *"Nine things two digital devices must agree on. They are
  not nine wires."*, and each name arriving with its bullet (`reveal: on-tour`) (**recommended**); (b) the caption only, all
  names shown from s0; (c) as the brief drew it. **Decided: (a).**
- **F-c2-4 — The lit-so-far end state.** The tour lights one line at a time. Options: (a) the Figure as decided (D2), with
  the earlier lines quiet in their colours, and a crossing to Benches for a cumulative tour (**recommended**: the asset
  stays in our hands, the card runs today); (b) the same picture as a Draw Bench drawing, whose steps accumulate natively
  (a Benches build, and a departure from D2); (c) the Figure, no request. **Decided: (a).**
- **F-c2-5 — Proposals**: the teal note's second sentence (*"Here both are 3.3 V: this one they agree on."*) and the
  teacher tip (§7d). Options: (a) both (**recommended**); (b) the note only; (c) neither. **Decided: (a).**
- **F-c2-6 — The card's time, 3.6 min** (2.6 on the bench); the module ≈ 31.6 of 30 (`D2-010-01` §2). Reported only. **Now
  3.7 min (2.7 on the bench)** with F10's words; still reported only (D5).

**Decided 2026-10-20 (owner: *"apply all recommendations"* on the U019 brief):** **D2** — card 2 on the PLAN's bench, a
Figure, the asset ours to draw (this spec: `nine-agreements`); **N1** — no product names on teaching surfaces (*"a 3.3 V
microcontroller"*; the chips here are *ADC* and *MCU*, classes). F-c2-1 to F-c2-6 above were new and open after that
round; F-c2-1 was the one **accuracy** finding (F-c2-2 was raised as a wording choice, not an accuracy finding, as its own
heading says).

**Decided 2026-10-20, round two (owner: *"apply all recommendations"* on the U019 brief's *Specs: round two*, F10 and C2:
*"Keep the Figure and ask Benches for a tour whose earlier stops stay lit; keep 'from signal conditioning'; take the
proposals"*):** **F-c2-1 (a)** (accuracy, register D2·010-F10) — bullet 8 reads *"**Communication direction** — whether
communication is one-way, two-way on separate lines, or two-way on one shared line"*, applied to `en.md` by the lead,
re-checked against SPI (separate lines) and I²C's SDA (one shared line) (§8 A6 ✓), the tour note and `say` updated (§3b,
§4a), the card's time recomputed (§2: 370 words, 3.7 / 2.7 min); **F-c2-2 (c)** — *"from signal conditioning"* right as it
stands, no change (§8 A4 ✓); **F-c2-3 (a)** — dotted, pinless lines, the caption *"Nine things two digital devices must
agree on. They are not nine wires."*, `reveal: on-tour` (§3a, §3b); **F-c2-4 (a)** — the Figure kept (D2) and Benches asked
by crossing for a cumulative tour, earlier stops staying lit, so s9 shows one agreement and eight open questions at full
strength (§3b, §4b, §12; the one-at-a-time tour stands in, §13); **F-c2-5 (a)** — the teal note's second sentence and the
teacher tip (§3b, §7d); **F-c2-6** — the time, reported only. **Re-checked (A1–A7)** on everything that changed (§8): no
finding. **Nothing on this card is open**: the spec is **spec-ready**; the cumulative tour is requested, not built.

**Raised 2026-10-20:** crossing **518** (the cumulative tour; `C:\ExSightory\lanes\pbl2026-x\.claude\crossing\open\518-pbl2026-to-benches-figure-bench-a-cumulative-tour-for-d2-010-card-2.request.md`, raised and pushed 2026-10-20, open).

## 15. Acceptance: how we know it is built right

- The figure compiles with §3b's fields; its nine features land on the nine dotted lines; the collision check passes (or
  `labels: numbers` is set and passes).
- s0 shows the two chips with *3.3 V* and nine quiet, unnamed lines; s1 lights the first teal with its name; s2–s9 each
  light the next amber and add its name; with the cumulative tour, every line reached stays at full emphasis and s9 shows
  one teal and eight amber together (until it lands, the earlier lines quiet, §13); on the wall, the presenter's window and
  Study.
- The tour waits for the poll (the figure's card follows the poll's).
- B1 one line per stop; B2 only the newly reached line changes; B4 four stills; B5 each stop's `say` on the strip; B9 the poll
  before the reveal; B10 no verdict on the poll; B13 names only; B17 one teal against eight amber; B20 the tip on the strip.
- C2 legible at 1920 × 1080 and 1024 × 768, EN and FR; C3 every stop at once; C4 labels and position as well as hue; C5
  the tour's keys; C6 at 320 px with numbers and key; C8 the s9 print with notes.
- E1–E6, both themes (the SVG's ink checked on both grounds), EN and FR.
- **Six gates (this spec)**: (1) realism: the real compatibility checks between an external ADC and a 3.3 V MCU, a labelled
  diagram, *not nine wires* ✓; (2) science: each line is a real disagreement; the tip's threshold numbers are the class's
  (JESD8C, MCU datasheets) ✓; (3) maths: 2.31 and 2.64 V recomputed ✓; (4) visualization: the open questions counted as
  they are spoken, one teal against amber ✓ (the lit-so-far end state needs the cumulative tour, requested, F-c2-4 (a));
  (5) consistency: ADC left and MCU right as cards 1 and 4; the Flow's words in every note, bullet 8 as applied (F10);
  F-c2-1 decided and applied, F-c2-2 resolved as it stands, both re-checked; the tip consistent with card 3's thresholds ✓;
  (6) design: nine labels at the floor checked by arithmetic, the fallback named, EN and FR ✓ on paper, to check
  on the render.
