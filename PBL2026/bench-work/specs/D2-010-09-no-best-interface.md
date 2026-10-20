```yaml
id: D2-010-09-no-best-interface
card: "There is no best interface, only a suited one"
module: notes/Day02/010-digital-interfaces/en.md
bench: Figure                     # owner D3, 2026-10-20: the PLAN has only a poll; a wiring Figure added
library: "spi-vs-i2c-wiring: a Figure of our own SVG, `figures/d2-010-spi-vs-i2c-wiring.svg`: one MCU and the same three peripherals (an ADC, a temperature sensor, an EEPROM) wired by SPI (SCLK, MOSI, MISO shared, one CS each: 6 signal lines) beside I²C (SDA and SCL shared, two pull-ups to 3.3 V, each device at its own 7-bit address: 2 signal lines); five features toured, the cost counted in lines"
dimensions: 2D
stand_in: none                    # the Figure Bench exists
optional_benches: []
real_thing: "an MCU with three peripherals of classes made in both SPI and I²C versions, wired each way as a schematic would draw them (IEC), the signal lines counted; supply and ground drawn once and not counted"
minutes: 3.0                      # on the bench: from p2 (after the poll) to the card's end (§2)
card_minutes: 4.0
status: spec-draft                # D3 decided; the figure's details are proposals (F-c9-1 to F-c9-5)
learner_action: poll
predictions: []                   # the PLAN's poll is the room's choice; nothing added
seeds: [S50 (plant)]              # the PLAN's SEED; the figure keeps speeds off so S50's numbers arrive in D2·020
key_variable: "the number of signal lines each interface costs for the same three peripherals: 3 + N against 2"
time_scale: "none (tour stops)"
steps: 6                          # s0 (the whole figure), s1–s5
```

**Written 2026-10-20 (U019)** after the owner's choices on the U019 brief (*"apply all recommendations"*): **D3** (*"Card 9: a
demonstration for the poll card. The PLAN gives it none. Proposed: the SPI and I²C wiring compared for three peripherals (6
lines against 2)"* → *"The wiring Figure"*) and **N1** (no product names). The brief page's `draw9`
(`bench-work/previews/u019-preview.html`) is the approved model: MCU and *peripheral 1–3* on each side; *SPI: 6 lines (3
shared + one CS each)*; *I²C: 2 lines + two pull-ups, addressed*. **Everything on this card beyond the PLAN's poll and seed is
D3's (decided) or a Proposal of this spec**, each marked.

**What the Figure Bench offers**: as `D2-010-04-interface-not-protocol.md` (read 2026-10-20): `rect` features, colours,
`label`/`note` `{en, fr}`, a mirrored `tour`, `reveal: on-tour`, `labels: numbers`, `spotlight: dim`, `zoom`.

## 1. What the room must understand

- **Statement** (verbatim): *There is no universally best digital interface. SPI suits high-speed, predictable transfers when
  you can afford the extra lines; I²C suits several devices on two shared lines when its data rate is enough. Every
  interface costs pins, wires, power, processing time and bandwidth.*
- **SHOW**: *none in the PLAN* (the PLAN has only the poll and a seed). Owner decision **D3**: *"The wiring Figure"*.
- **ASK** and **SEED** (verbatim): §7a.
- **Bench and library.** The **bench** is the Figure Bench. The **library** is this card's figure, `spi-vs-i2c-wiring`: our
  SVG and its `figure` block (D3).
- **Insight**: *for the same three devices SPI costs six signal lines and I²C two; SPI's extra lines buy a dedicated select
  and separate data directions, I²C's saving is paid in addresses and pull-ups. Which is better depends on what the system
  needs.*
- **Kind of knowledge**: *a contrast between two states* (two wirings of one system). Card test → **Figure** (D3). B17
  applies (both wirings side by side, the same devices); B15, B18, B19 do not.
- **Why this bench, not a still**: the Flow's cost is abstract (*"pins, wires, PCB space…"*); the figure counts it on one
  system, and the tour points at what each side pays (the CS lines; the addresses and pull-ups) as the Flow names it.
- **Key variable**: the line count.

## 2. Time

The card's Flow is **423 words** (`en.md`, 2026-10-20; whitespace tokens, cue markers removed, list markers counted, as the
U019 brief counts them). p0, the `[[ask]]` (28 words), is counted in the poll. **395 words are spoken outside it = 3.04 min.**

| Beat | Minutes | Source of the number |
|---|---|---|
| The poll (its own card, before the statement): p0 *"[[ask]] Suppose we have an ADC…"* (28), the window, the spread (p1 `[[pause]]`); the chat follow-up (*"what would you need to know?"*) is read back through p2–p3 | 1.0 | the task's figure for a poll; the follow-up rides on p3 |
| s0 the whole figure: p2 *"The fact that two devices can communicate…"* (43), p3 the fourteen questions (125), p4 *"There is therefore no universally best…"* (22) | 1.46 | 190 ÷ 130 |
| s1 SPI: p5 *"We might choose SPI…"* (25) | 0.19 | 25 ÷ 130 |
| s2 I²C: p6 *"We might choose I²C…"* (27) | 0.21 | 27 ÷ 130 |
| s2 held: p7 *"So the choice is not simply…"* (30), p8 *"And communication interfaces are not free…"* (23) | 0.41 | 53 ÷ 130 |
| s3–s5: p9 *"For example, a parallel interface…"* (86), one stop per clause (CS lines; addresses; pull-ups) | 0.66 | 86 ÷ 130 |
| s5 held: p10 *"The engineer therefore has to balance…"* (14) | 0.11 | 14 ÷ 130 |
| **Card total / of which on the bench** | **4.0 / 3.0** | 4.04 / 3.04 |

If the room's chat list runs long, the poll's beat can reach ≈ 1.5 min (the PLAN's follow-up is open-ended): reported, not
counted. **Module check**: `D2-010-07-choosing-the-pull-up.md` §2b (≈ 31.6 of 30 min). This is the module's longest card.

## 3. The scene: what is on the bench

### 3a. The SVG (`figures/d2-010-spi-vs-i2c-wiring.svg`), ours

Artboard **1600 × 900**, two panels **side by side**, each 780 × 860 (SPI x 0–780, I²C x 820–1600), a thin divider at
x 800. IEC 60617 schematic style: ICs as rectangles with pin names inside; resistors as rectangles; a junction is a dot, a
crossing without a dot is no connection; wires end in no arrowhead (the lines are buses; direction is card 4's). Unbranded
(N1). In each panel the **MCU on the left** and the three peripherals stacked on the right, the classic bus drawing (cards
2 and 4 are point-to-point and put the MCU on the right; F-c9-2).

**Wire colours** are part of the image (they are fixed meanings, not toured), the same hues as card 4's features: clock
`violet`, data `teal`, select `azure`, MOSI `lime`; pull-ups `amber` (the HIGH's source, as the U019 brief's palette). The SVG
uses the course palette's values for those names, checked on both grounds (§12).

| Panel | Element | What |
|---|---|---|
| SPI | MCU block, x 20–200, y 120–860 | *MCU*; six pins on its right edge, 90 units apart: SCLK, MOSI, MISO, CS1, CS2, CS3 |
| SPI | three peripheral blocks, x 560–760: y 120–330, 385–595, 650–860 | *ADC*, *temperature sensor*, *EEPROM* (**Proposal**, F-c9-3); each with four pins (SCLK, MOSI, MISO, CS) on its left edge, unlabelled (the wire colour names them) |
| SPI | SCLK, MOSI, MISO | one vertical riser each (x 300, 340, 380) from the MCU's pins, with a junction dot and a stub to each peripheral: **3 shared lines** |
| SPI | CS1, CS2, CS3 | one line each, MCU pin to one peripheral's CS: **3 lines, one per peripheral** |
| SPI | note (**Proposal**, F-c9-4) | *each releases MISO while not selected* (role note, under the risers) |
| I²C | MCU block, x 840–1020, y 120–860 | *MCU*; two pins: SDA, SCL |
| I²C | SDA, SCL | one riser each (x 1180, 1220) with a junction and a stub to each peripheral: **2 shared lines** |
| I²C | two pull-ups | IEC resistors from a *3.3 V* rail (y 60) down to the SDA and SCL risers, `amber`; one label *pull-ups to 3.3 V* |
| I²C | three peripheral blocks, x 1380–1580, as the SPI side | *ADC*, *temperature sensor*, *EEPROM*, each with its 7-bit address under its name: *1001000*, *1001001*, *1010000* (**Proposal**, F-c9-3) |
| both | supply and ground | drawn once per panel as a rail and an IEC earth along the bottom, thin; caption: not counted |

The exact routing (where a CS line meets a riser's stubs) is fixed on the render, which is the check: labels never cross a
wire (`labels-never-cross`), every crossing is dot-free and every junction dotted.

### 3b. The `figure` block

| Field | Content |
|---|---|
| `title` | EN *The same three devices: SPI or I²C* · FR *Les trois mêmes composants : SPI ou I²C* |
| `image` | `figures/d2-010-spi-vs-i2c-wiring.svg` |
| `alt` | EN *A microcontroller and three peripherals, an ADC, a temperature sensor and an EEPROM, wired two ways. With SPI, the clock and both data lines are shared and each peripheral has its own chip-select line: six signal lines. With I²C, two shared lines, data and clock, each pulled up to 3.3 V, and each peripheral answers to its own address: two signal lines.* · FR *Un microcontrôleur et trois périphériques, un CAN, un capteur de température et une EEPROM, câblés de deux façons. En SPI, l'horloge et les deux lignes de données sont partagées et chaque périphérique a sa propre ligne de sélection : six lignes de signal. En I²C, deux lignes partagées, données et horloge, chacune tirée à 3.3 V, et chaque périphérique répond à sa propre adresse : deux lignes de signal.* |
| `caption` (**Proposal**, F-c9-4) | EN *Signal lines counted; supply and ground, needed by both, are not.* · FR *Lignes de signal comptées ; l'alimentation et la masse, nécessaires aux deux, ne le sont pas.* |
| `labels` | `numbers` (badges, names in the key) |
| `reveal` | `on-tour` (the counts arrive with the Flow) |
| `spotlight` | `dim` |

| # | Feature id | Geometry (`rect`, fractions [x, y, w, h]) | Colour | Label EN · FR | Tour `note` EN · FR |
|---|---|---|---|---|---|
| 1 | `spi-panel` | [0, 0, 0.4875, 1] | `azure` | *SPI: 6 signal lines (3 shared + one CS each)* · *SPI : 6 lignes de signal (3 partagées + une CS chacun)* | *SCLK, MOSI and MISO go to every peripheral; each also has its own chip select.* · *SCLK, MOSI et MISO vont à chaque périphérique ; chacun a aussi sa propre sélection.* |
| 2 | `i2c-panel` | [0.5125, 0, 0.4875, 1] | `teal` | *I²C: 2 signal lines, shared* · *I²C : 2 lignes de signal, partagées* | *SDA and SCL go to every device.* · *SDA et SCL vont à chaque composant.* |
| 3 | `spi-cs` | the three CS lines' region, [0.10, 0.50, 0.30, 0.25] (fixed on the render) | `azure` | *one CS per peripheral* · *une CS par périphérique* | *A fourth peripheral needs a seventh line: 3 + N lines for N peripherals.* · *Un quatrième périphérique demande une septième ligne : 3 + N lignes pour N périphériques.* |
| 4 | `i2c-addresses` | the three address lines, [0.86, 0.10, 0.13, 0.85] | `violet` | *each device at its own 7-bit address* · *chaque composant à sa propre adresse de 7 bits* | *The controller names the device in every transfer; two devices may not share an address.* · *Le contrôleur nomme le composant à chaque transfert ; deux composants ne peuvent pas partager une adresse.* |
| 5 | `i2c-pullups` | the two resistors and the rail, [0.66, 0.02, 0.14, 0.20] | `amber` | *pull-ups: the HIGH on both lines* · *résistances de tirage : le niveau haut des deux lignes* | *Open-drain outputs and their pull-ups: cards 6 to 8.* · *Sorties à drain ouvert et leurs résistances de tirage : cartes 6 à 8.* |

FR drafts ours, for the owner's review; numbers never translated.

**Meet the parts** (B3): s0, the whole figure: the same MCU and devices twice. The counts arrive at s1–s2.

**Values beside their element**: the 7-bit addresses under the I²C devices; *3.3 V* on the pull-up rail; the counts in the
key. **No speeds and no pull-up values** (F-c9-5): S50 brings the rates next module, and card 7 chose the pull-up.

**Colours and their second channel** (C4): every wire also by the MCU's pin name; the pull-ups by the IEC resistor shape and
their label; the panels by the titles *SPI* and *I²C*.

## 4. The run: step by step, as the Flow goes

### 4a. Steps (D3; each stop's placement a **Proposal**, F-c9-1)

| # | id (tour stop) | Flow paragraph (first words) | What changes (`say`) | Presenter's control |
|---|---|---|---|---|
| — | the poll, p0–p1 (§7a) | | | the activity |
| 0 | (before the walk) | p2 *"The fact that two devices can communicate…"*, p3, p4 | One microcontroller and the same three devices, wired two ways. | (the card opens) |
| 1 | `spi-panel` | p5 *"We might choose SPI…"* | SPI: six signal lines for three peripherals. | Next |
| 2 | `i2c-panel` | p6 *"We might choose I²C…"*; held over p7–p8 | I²C: two signal lines, shared by all three. | Next |
| 3 | `spi-cs` | p9 *"…SPI can provide high-speed serial communication, but each peripheral may require its own chip-select line…"* | The cost of SPI: one more line for every peripheral. | Next |
| 4 | `i2c-addresses` | p9 *"I²C uses only two main signal lines … different speed, addressing…"* | The cost of I²C, first: every device needs its own address. | Next |
| 5 | `i2c-pullups` | p9 *"…and electrical requirements."*; held over p10 | And pull-ups: the electrical requirement the bus brings. | Next leads to card 10 |

### 4b. Motion, cues and stills

| # | Motion | Movers | Cue and its second channel | Hold | Reduced motion (C3) | Still |
|---|---|---|---|---|---|---|
| 0 | none | 0 | the whole figure | hold | whole | s0 |
| 1–2 | the panel at full emphasis, the other dimmed; its count in the key | 1 | the panel lit, its count | hold | at once | s1, s2 |
| 3–5 | the region at full emphasis | 1 | the region lit, its key entry | hold | at once | s3, s5 |

Five stills. Nothing moves.

## 5. Pacing and interaction, by surface and view

**Who paces** (B12): the presenter on the wall (the tour's `step` mirrored); the learner in Study and Scope.

| View | Who | Controls |
|---|---|---|
| Preview (in the slide) | everyone | the figure; the current stop |
| View (details) | everyone | the *Walk* pane, the key, zoom to either panel |
| Edit (session only) | everyone | not specified for the Figure Bench |
| Authoring | authors | the `figure` block's YAML; the SVG |

- **The presenter's strip** (B20): *stop n / 5*, the next stop's `say` and the p9 clause it waits for; the teacher tip.
- **Study / Scope**: the walk learner-paced; zoom targets `spi` and `i2c` (each panel).
- **Phone** (C6): the two panels stacked (the `spi` and `i2c` zoom targets each fill the width), the key under them.
- **Locked**: the walk starts after the poll closes.

## 6. The frame

| Tile / panel | Used? | Selected item | List / contents |
|---|---|---|---|
| Figure: Walk | yes | the active stop | five stops with notes |
| Figure: key | yes | — | the five features as revealed |
| Figure: zoom | Study, Scope, phone | — | *Whole*, *spi*, *i2c* |

## 7. Thinking, not watching

- **7a. The PLAN's ASK and SEED** (verbatim): *poll (before the statement) — "An ADC must send its readings to a
  microcontroller. SPI or I²C?" · options: SPI | I²C | I need to know more first · explain: The follow-up "what would you need
  to know?" is taken in chat, and the room's list becomes the Flow's list. · depth: understand · practice: defining
  problems.* · *SEED plants S50 — "One question on that list comes back with numbers in the very next module: how much data,
  how quickly? Can the wire keep up?"* The poll fires at p0, **before s0**, on its own card; the figure does not answer it
  (there is no right answer), it prices the two choices.
- **7b. Prediction point**: none added.
- **7c. After**: the explain. In Study, done means the poll answered and the walk reached s5.
- **7d. Teacher tip** — **Proposal** (F-c9-4), presenter only: *Expect "I²C, fewer wires". Ask: what does the ADC need? If it
  must stream readings fast with predictable timing, the extra lines buy that; if it is one of several slow sensors, two
  wires win. And three devices on I²C means three different addresses: the temperature sensor here was strapped to
  1001001 because the ADC's class already answers at 1001000. The rate question waits for the next module (S50).*
- **7e. Explore**: none.

## 8. Faithfulness (the quality bar)

**Counts** (recomputed): SPI signal lines = 3 shared + N chip selects = **3 + N**; N = 3 → **6** ✓ (the brief's *"6 lines"*);
N = 4 → 7 (s3's note). I²C = **2** for any N (within addressing and the bus capacitance limit) ✓. MCU pins: 6 against 2.

**I²C facts, against NXP UM10204** (*I²C-bus specification and user manual*, Rev. 7.0, 1 October 2021; cited here only):
two lines, SDA and SCL, carry information between devices, each recognised by a unique address (§3.1); both lines are
bidirectional and connected to the positive supply through a current source or **pull-up resistor**, and outputs are
open-drain (§3.1.1); 7-bit addresses, with **0000 XXX and 1111 XXX reserved** (§3.1.12): 1001000, 1001001 and 1010000 are
outside both ✓; Standard-mode 100 kbit/s, Fast-mode 400 kbit/s, Fast-mode Plus 1 Mbit/s (not on the figure); bus capacitance
≤ 400 pF in Standard and Fast mode (the limit on *"several devices"*). Rev. 7.0 calls the roles controller and target; the
card says *device* and *peripheral*, which is consistent.

**Address classes** (cited here only, unbranded on the figure): I²C ADCs of the 16-bit delta-sigma class answer at 10010xx
(0x48–0x4B) by an address pin; digital temperature sensors of the LM75 class at 1001xxx (0x48–0x4F) by address pins; serial
EEPROMs of the 24C class at 1010xxx (0x50–0x57). So the ADC at **1001000** (0x48), the sensor strapped to **1001001** (0x49)
and the EEPROM at **1010000** (0x50) are a real, conflict-free set. The ADC's 1001000 is the address in card 8's byte
(0x90 = 1001000 + the write bit, the U019 brief's `draw8b`): card 8's byte is then this MCU writing to this ADC (to keep
when card 8's spec is written).

**SPI facts**: shared SCLK, MOSI, MISO and one CS per peripheral is the typical configuration (the Flow's own *"in a
typical configuration"*; daisy-chaining exists and is not drawn); a deselected peripheral releases MISO (card 4 §8's
sources). All three device classes exist in SPI and in I²C versions.

**Section D, Figure rows**
- [x] Our own drawing; nothing branded or redrawn.
- [x] Named parts on the right features (fractions from §3a; `spi-cs`, `i2c-addresses` and `i2c-pullups` fixed on the
  render).
- [x] Legible: §10.

**A1–A8** (on the owner's text and this spec): A1 ✓ (6 and 2); A2 ✓ (the typical SPI configuration and I²C as UM10204);
A3 ✓ (N = 4 in the note); A4 ✓ (S50 against D2·020's harvest, checked in the U019 brief ✓; card 7's pull-up and card 8's
wired-AND pointed at, not repeated); A5 ✓: the statement, p5, p6, p9 and p10 read true against the sources: *"I²C uses only
two main signal lines and allows multiple devices to share the bus, but it has different speed, addressing and electrical
requirements"* ✓; *"UART … does not provide the same shared-bus structure as I²C"* ✓; *"a parallel interface may transfer
many bits simultaneously … but it may require many physical signal lines"* ✓; A6 ✓ (*"may require"*, *"typical
configuration"*, *"when its data rate is enough"* hedge correctly); A7 ✓ (sources above); A8 ✓. **No accuracy finding on
this card.**

## 9. Faults and non-ideal behaviour

**PLAN FAULT**: none. Said if asked (§7d): two I²C devices at one address both answer and corrupt each other; a peripheral
that does not release MISO blocks the others on a shared SPI bus.

## 10. Accessibility, legibility and print

- Wall (C2): MCU pin names 90 units apart (≈ 62 px against the 43 px floor); the device names in 200-unit blocks (≈ 138 px:
  *temperature sensor* on two lines, FR *capteur de température* on two); the addresses in mono under the names. The
  peripherals' own pins are unlabelled (the wire colours name them) so the right edge stays legible. Check at
  1920 × 1080 and 1024 × 768, EN and FR. A zoom to one panel does not magnify it on the wall (each panel is already full
  height); if the full figure misses the floor, the fallback is two images of the same layout, each panel drawn full width,
  shown by the Figure's `compare` (SPI the base, I²C the overlay, the seam moved at s2).
- Reduced motion (C3): every stop at once.
- Colour (C4): each wire also by its MCU pin name; the panels by title; the pull-ups by shape.
- Keyboard (C5): the tour's keys.
- Print (C8): s5 with the key (both counts and the three costs) and the caption.

## 11. Assets to make or source

| Asset | Format | Made by | Status |
|---|---|---|---|
| `figures/d2-010-spi-vs-i2c-wiring.svg` (§3a) | SVG (rendered for the owner first, a visual milestone) | the author | to make |
| The `figure` block (§3b), EN and FR | YAML in `en.md` | the author | to write |

## 12. Bench capabilities this needs

**Figure Bench**: `rect` features, colours, `label`/`note` `{en, fr}`, mirrored `tour`, `reveal: on-tour`, `labels:
numbers`, `spotlight: dim`, `zoom`: **exist**. **Missing**: none. **To check**: the SVG's coloured wires and neutral ink on
both themes' grounds (as cards 2 and 4).

**Not this bench's**: comparing data rates (S50's, D2·020).

## 13. Stand-in for the lecture

None needed.

## 14. Findings for the owner

No **accuracy** finding on this card (§8). Everything below is a **Proposal**, inside D3.

- **F-c9-1 — The stops' placement.** Options: (a) the figure up from p2 (after the poll), the SPI panel at p5, I²C at p6,
  and p9's three clauses each pointing at its cost (CS lines, addresses, pull-ups) (**recommended**: the figure follows the
  Flow's own pairing); (b) two stops only, at p5 and p6; (c) the figure only at p9.
- **F-c9-2 — MCU on the left here, on the right on cards 2 and 4.** A bus is drawn with the controller at one end and the
  devices along it; cards 2 and 4 are one link each, drawn in the path's direction. Options: (a) as specified, the classic
  bus drawing (**recommended**); (b) MCU on the right here too, for one convention across the module.
- **F-c9-3 — Named classes and real addresses.** The brief had *peripheral 1–3*. Options: (a) *ADC*, *temperature sensor*,
  *EEPROM* (classes made in both SPI and I²C versions), with the I²C addresses *1001000*, *1001001* (strapped), *1010000*,
  the ADC's matching card 8's byte (**recommended**: realism, and the poll's ADC is on the bus); (b) the classes, no
  addresses (the *"addressed"* claim then unshown); (c) *peripheral 1–3*, as the brief.
- **F-c9-4 — Proposals**: the caption (*signal lines counted; supply and ground … are not*), the note *each releases MISO
  while not selected*, the supply and ground drawn once, s3's note (*3 + N*), and the teacher tip (§7d). Options: (a) all
  (**recommended**); (b) the caption and s3's note only; (c) none.
- **F-c9-5 — No speeds, no pull-up values on the figure.** Rates are S50's, in the next module, and the pull-up was card 7's
  choice. Options: (a) keep them off (**recommended**); (b) add Standard / Fast-mode rates and an SPI clock range (pre-empts
  S50's *"comes back with numbers in the very next module"*).
- **F-c9-6 — The card's time, 4.0 min** (3.0 on the bench), the module's longest; the chat follow-up may add ≈ 0.5.
  Reported only.

**Decided 2026-10-20 (owner: *"apply all recommendations"* on the U019 brief):** **D3** — card 9 gets the wiring Figure: the
same MCU and three peripherals by SPI (6 lines) and by I²C (2 lines + two pull-ups, addressed), the cost counted in lines
(this spec: `spi-vs-i2c-wiring`); **N1** — no product names on teaching surfaces (the devices are classes; the sources of the
address ranges are cited in §8 only). F-c9-1 to F-c9-6 above are new and **open**.

## 15. Acceptance: how we know it is built right

- The figure compiles with §3b's fields; the five features land on their regions; the collision check passes.
- On the render: SPI shows six MCU signal pins, three shared risers with a dotted junction to each peripheral, and one CS
  line to each; I²C shows two MCU signal pins, two shared risers to all three devices, two amber pull-ups to a 3.3 V rail, and
  the three addresses; no label crosses a wire; every crossing is dot-free.
- s1 and s2 put *6 signal lines* and *2 signal lines* in the key; s3–s5 light the CS lines, the addresses and the pull-ups.
- B1 one region per stop; B2 only the toured region changes; B4 five stills; B5 each `say` on the strip; B10 no verdict on
  the poll; B13 names and counts only; B17 the two wirings side by side; B20 the tip on the strip.
- C2 legible at 1920 × 1080 and 1024 × 768, EN and FR; C3 at once; C4 pin names, titles, shapes; C5 the tour's keys; C6 at
  320 px with the panel zooms; C8 the s5 print.
- E1–E6, both themes, EN and FR.
- **Six gates (this spec)**: (1) realism: a real MCU with three device classes made in both versions, IEC schematic,
  conflict-free real addresses, supply and ground drawn ✓; (2) science: the typical SPI bus with MISO released, I²C as
  UM10204 (shared bidirectional lines, pull-ups, unique 7-bit addresses outside the reserved ranges) ✓; (3) maths: 3 + N and
  2 recomputed (6, 7, 2) ✓; (4) visualization: one system wired twice, the cost counted and each side's price pointed at ✓;
  (5) consistency: card 4's line colours, card 8's address, card 7's pull-ups, S50's numbers left to D2·020 ✓; (6) design:
  pin names at the floor by arithmetic, a `compare` of two full-width panels as the fallback, EN and FR ✓ on paper, to check on the render.
