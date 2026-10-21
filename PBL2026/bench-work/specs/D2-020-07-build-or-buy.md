```yaml
id: D2-020-07-build-or-buy
card: "INA226: build or buy?"
module: notes/Day02/020-external-adcs/en.md
bench: Figure                     # the PLAN's bench; the asset is ours to draw (D2); the FAULT on the same figure (D4)
library: "ina226-build-or-buy: a Figure of two registered SVGs of our own, `figures/d2-020-ina226-fault.svg` (the base) and `figures/d2-020-ina226-calibrated.svg` (the `compare` overlay), identical above the seam's rest: the hand-built chain as seven glyphs tagged with their modules, laid over our redrawn INA226 block diagram (SBOS547C Figure 6-2, pins from Figure 4-1), column by column; below, five register readouts, as calibrated (10 mΩ) and as the FAULT (5 mΩ fitted, CAL still for 10 mΩ); eleven tour stops, the FAULT shown by the seam dragged down the readouts"
dimensions: 2D
stand_in: none                    # the Figure Bench and its `compare` exist; two conveniences go to Benches by crossing when the course needs them (§12, F-c7-5 decided; not raised now), neither needed on the day
optional_benches: []
real_thing: "the INA226 current and power monitor (TI SBOS547C, Aug 2026) on a 12 V high-side rail, 2 A through a 10 mΩ Kelvin-connected shunt (D1·050's and D1·060's values), CAL written for Current_LSB 100 µA and 10 mΩ, its registers read over I²C; then the same board fitted with 5 mΩ and the same CAL"
minutes: 2.5                      # on the bench: from p3 (after the poll) to the card's end, p8 held (§2)
card_minutes: 4.3
status: spec-ready                # F-c7-1 to F-c7-3 (accuracy D2·020-F9 to F11) and F-c7-4 to F-c7-6 decided 2026-10-21 (round two: all recommendations (a)) and applied; F-c7-7 reported; nothing open (the two seam conveniences, asked by crossing when needed, do not block)
learner_action: poll
predictions: []                   # the PLAN's poll has no right answer; nothing added
seeds: [S51 (plant), S58 (plant)]
key_variable: "the fitted shunt against the shunt CAL was written for (10 mΩ / 5 mΩ): every derived readout scales by their ratio, the raw shunt reading stays true"
time_scale: "none (tour stops and a two-state compare; nothing moves but the seam)"
steps: 11                         # s0 (the whole figure), s1–s10
```

**Written 2026-10-21 (U020)** after the owner's choices on the U020 brief (*"Apply all recommendations"*): **D1** (the four
named parts are an exception to real-but-unbranded for this module: *INA226* on the figure, no logo, no vendor image),
**D2** (datasheet content as our own redrawn extract, values read off SBOS547C and cited here), **D3** (specs for all seven
cards) and **D4** (*"Card 7: the FAULT shown live on the figure … a 'fitted shunt' switch"* → *"Yes, on the figure"*). The
accuracy findings **D2·020-F6** (*"eight thousand counts of signal"*, card 7 Flow and S51) and **D2·020-F7** (the Look for's
*"two of today's firmware jobs still to come"*) are applied in `en.md` and quoted as applied. The brief page's `draw7`
(`bench-work/previews/u020-preview.html`) is the approved model: the Day 1 chain in a row over the INA226's blocks, each
pair joined by a dashed leader; the shunt outside the package; the switch *Fitted 10 mΩ (as calibrated)* / *FAULT: fitted
5 mΩ, CAL still for 10 mΩ*; readouts *shunt voltage, shunt register, current, power* reading 20.00 mV, 8000, 2.000 A,
24.00 W, then 10.00 mV, 4000, 1.000 A, 12.00 W. This spec draws only what SBOS547C shows: `draw7`'s *internal reference*
block is not on the datasheet's block diagram and becomes a marked empty slot (F-c7-4, decided), and the package's outline
moves from `azure` to the module palette's `amber` (F-c7-6, decided).

**Round two, 2026-10-21** (the U020 brief's *Specs: round two*; owner, in chat: *"Apply all recommended (a)"*): every item
of §14 takes its recommended option (a), and the body below states the decided design. The three accuracy findings are
applied in `en.md` and quoted as applied: **D2·020-F9** (F-c7-1, the statement ends *"…the shunt still ours."*),
**D2·020-F10** (F-c7-2, the Look for's *"three Day 1 stages folding into one package (in-amp, ADC input, conversion; the
reference is inside too, …)"*) and **D2·020-F11** (F-c7-3, the poll's explain *"the choice of shunt and gain together"*).
Ours: the reference as an empty dashed slot with stop s5 and its ≈ 15 unscripted words (F-c7-4); the FAULT as a `compare`
of two registered pictures, the tour-step seam and the seam's keys to be asked of Benches by crossing when the course needs
them, not now (F-c7-5); all of F-c7-6's figure proposals and the teacher tip; the card's time reported (F-c7-7). No Flow
word of card 7 changed in round two.

**What the Figure Bench offers** (read 2026-10-21, read-only: `insight-core/src/registry/figureBlock.ts`,
`canvas/src/figureTypes.ts`, `canvas/src/FigureBench.vue`): as `D2-010-04-interface-not-protocol.md` (`rect`/`path`
features, the eight colours, `label`/`note` `{en, fr}`, a mirrored `tour`, `reveal: on-tour`, `labels: numbers`,
`spotlight: dim`, `zoom`), and **`compare`**: one overlay image of the base's aspect, `orientation` vertical or horizontal,
a seam the presenter drags (mirrored as `wipe`, 0–1, quantised to 0.05, **starting at 0.5**, inert on the wall); the overlay
owns everything past the seam; a feature's `on-click: compare` moves the seam to that feature's centre. **It has no state
switch, no tour step that sets the seam, no keyboard on the seam, and it computes nothing** (nor may the wall). So the live
FAULT is within its abilities only as **two drawn states and the seam between them**: §3a, §12, F-c7-5 (decided: (a)).

## 1. What the room must understand

- **Statement** (verbatim): *The INA226 is the build-versus-buy decision for current sensing: the shunt-and-in-amp channel we
  built on Day 1, offered as one part with a digital interface, the shunt still ours.* (As applied: D2·020-F9, F-c7-1 (a),
  decided 2026-10-21.)
- **SHOW** (verbatim from the PLAN): *Figure — the INA226 block diagram (TI SBOS547) laid beside the Day 1 chain: external
  shunt (D1·050) → differential input riding on a 0–36 V common mode (D1·060) → 16-bit ADC → averaging and conversion-time
  settings → calibration, current and power registers → I²C.*
- **Drive** (verbatim): *tour pairs each INA226 block with the Day 1 stage it replaces.*
- **Look for** (verbatim, as applied, F7 and D2·020-F10): *three Day 1 stages folding into one package (in-amp, ADC input,
  conversion; the reference is inside too, but the datasheet draws no block or pin for it, so its slot is shown empty), and
  two of today's firmware jobs still to come, averaging and calibration, already in its registers. Then the FAULT below,
  live on the same figure: a fitted-shunt switch (10 mΩ / 5 mΩ) and the register readouts halving.* (F-c7-2 (a), decided
  2026-10-21; on the figure the three stages are columns k1 and k2 and the empty slot is k3, §3a.)
- **Status** (verbatim): *needs asset: our own redrawn INA226 block diagram (TI SBOS547C; 2.5 µV shunt LSB, ±81.92 mV full
  scale, averaging 1–1024, confirmed on the page 2026-10-20); no vendor page images*
- **ASK, SEEDs and FAULT** (verbatim): §7a and §9.
- **Bench and library.** The **bench** is the Figure Bench. The **library** is this card's figure, `ina226-build-or-buy`:
  two registered SVGs of ours and one `figure` block (§3b).
- **Insight**: *the INA226 does, inside one package, the jobs of Day 1's conditioning, ADC input and conversion (its
  reference inside too, undrawn) and two of today's firmware jobs; the shunt and its Kelvin connection stay mine; and its calibration register is a new single point
  of failure: written for the wrong shunt, every current and power reads off by the ratio, steadily, with no flag.*
- **Kind of knowledge**: *a picture built up* (the pairing, column by column) and then *a contrast between two states* (as
  calibrated / FAULT). Card test → **Figure** (a diagram toured, two registered pictures). B15 applies (the hand-built row and
  the package, each a subsystem, then paired); B17 applies (the two states at one seam); B18, B19 do not.
- **Why this bench, not a still**: the tour lights one pair at a time as the Flow names it, so the room sees which Day 1 job
  each block took over; the seam, dragged down the readouts, shows the FAULT's cause and its effects in causal order (the
  fitted shunt, the true shunt voltage, then the wrong current and power) on the same figure, which a still of two tables
  cannot.
- **Key variable**: the fitted shunt against the shunt CAL was written for.

## 2. Time

The card's Flow is **350 words** (`en.md`, 2026-10-21; the brief's count: whitespace tokens of the fence, `[[cue]]` markers
removed, `*()` stripped, tokens with a letter or digit), **2.69 min** at 130 wpm. Per paragraph: p0 37, p1 21 (the
`[[ask]]`), p2 0 (`[[pause]]`), p3 18, p4 69, p5 40, p6 44, p7 70, p8 51. The poll's p1 is counted inside the poll's 1.5.

| Beat | Minutes | Source of the number |
|---|---|---|
| p0 *"On Day 1 we built a current channel by hand…"* (37), before the poll, on the statement's card | 0.28 | 37 ÷ 130 |
| The poll (after the statement): p1 *"[[ask]] Would you build that chain again…"* (21), the window, the spread (p2 `[[pause]]`) | 1.5 | the brief's figure for a poll |
| s0 the whole figure: p3 *"There is no single answer…"* (18) | 0.14 | 18 ÷ 130 |
| s1 shunt: p4 *"The INA226 puts most of… you choose it."* (17) | 0.13 | 17 ÷ 130 |
| s2 inputs: p4 *"Its inputs measure… with the in-amp."* (38) | 0.29 | 38 ÷ 130 |
| s3 converter: p4 *"Behind them is a 16-bit converter,"* (6) | 0.05 | 6 ÷ 130 |
| s4 I²C: p4 *"and behind that, registers you read over I²C."* (8) | 0.06 | 8 ÷ 130 |
| s5 reference (F-c7-4, decided (a)): unscripted, ≈ 15 words: *"No reference pin: the reference is inside, so one count is a fixed 2.5 microvolts."* | 0.12 | 15 ÷ 130, an estimate |
| s6 shunt register: p5 *"One count of shunt voltage is 2.5 µV…"* (40), S51 | 0.31 | 40 ÷ 130 |
| s7 averaging: p6 *"Look at two more registers. One sets averaging…"* (14) | 0.11 | 14 ÷ 130 |
| s8 calibration: p6 *"Another is a calibration register…"* (30), S58 | 0.23 | 30 ÷ 130 |
| s9 the package: p7 *"What you gain by buying… look inside each step."* (35) | 0.27 | 35 ÷ 130 |
| s10 the FAULT: p7 *"And there is a new way to fail…"* (35), the seam dragged down the five rows, and ≈ 20 unscripted words over the readouts (*"Five milliohms fitted. Shunt: four thousand, ten millivolts, which is true. Current: one amp. Power: twelve watts. No flag."*) | 0.42 | 55 ÷ 130, the 20 an estimate; the drag (≈ 5 s) is under speech |
| s10 held: p8 *"[[transition]] Go back to the ADS1115's datasheet…"* (51) | 0.39 | 51 ÷ 130 |
| **Card total / of which on the bench** | **4.3 / 2.5** | 4.30 / 2.52 (2.69 Flow + 1.34 poll window + 0.27 unscripted) |

**Module check** (targetMinutes 30): the module's Flow was 2,045 words = 15.7 min when this spec was written, and is
**2,116 words = 16.3 min** after round two (`en.md`, 2026-10-21, the same count: card 6's new I²C-clock ask and reveal
add 71; card 7's 350 unchanged); with the activities (card 2 poe 1, card 3 flash 1, card 4 checkpoint 3, card 5 poe 1 and
numeric 1, card 6 two numerics 2, this card's poll 1.5: 10.5 min) and ≈ 3 min of bench moves mostly over speech (this
card's ≈ 35 unscripted words, 0.27 min, are part of them), the module is **≈ 29.8, about 30 of 30 min** (it was ≈ 29–30 at
the brief). This card is ≈ 4.3 of it. Reported, not cut (F-c7-7). The two shortest stops, s3 and s4
(6 and 8 words), are a click each inside one sentence; the presenter may light s3 and run on (B1 holds: each is a causal
boundary of the chain).

## 3. The scene: what is on the bench

### 3a. The two SVGs (ours), registered

Artboard **1600 × 1100**, both files. **Identical above y 550**; they differ only in the readout band (y 550–1100). The
seam (`compare`, `orientation: horizontal`) starts at 0.5 = **y 550**, in the gap between the package and the band, and
its 0.05 quantum is 55 units, so its rest positions **660, 770, 880, 990, 1100** are the band's row boundaries: at every
rest the seam lies in a gap and crosses no label. The overlay owns everything **below** the seam, so the **overlay is the
calibrated picture** and the **base is the FAULT**: at the first frame (seam at 550) the band reads as calibrated; dragged
to 1100 (the bottom), the whole band is the FAULT, row by row on the way down.

IEC 60617 style throughout: ICs as rectangles with pin names inside at the edge, the resistor as a rectangle, junctions
dotted, no dot at a crossing, a converter as a box with a diagonal. **Words in the image** are the datasheet's own, kept in
English in both languages as the redrawn extract's (pin names, register names and addresses, *ADC*, *ΔΣ*, *CAL*,
*AVG*, *OVF*, *AFF*), module tags, symbols and values; every translatable name is in the features' labels and notes
`{en, fr}` (§3b). Neutral ink; colours as below. The figure says *redrawn from SBOS547C* in its caption (§3b).

**Columns.** Seven columns, 200 wide, 20 apart, x0 = 40: k0 40–240, k1 260–460, k2 480–680, k3 700–900, k4 920–1120,
k5 1140–1340, k6 1360–1560. Each column pairs one job built by hand (top row) with what does it in the INA226 (package
row), joined by a dashed vertical leader at the column's centre (y 190–240).

**Top row: built by hand** (y 70–190), each box a glyph and its module tag (the tag ≥ 64 units high, mono):

| Col | Box (outline) | Glyph | Tag |
|---|---|---|---|
| k0 | `teal`, solid | IEC resistor, four terminals (D1·050's Kelvin shunt) | *D1·050* |
| k1 | `teal`, solid | IEC amplifier triangle with + and − inputs (the in-amp) | *D1·060* |
| k2 | `teal`, solid | IEC converter box, diagonal, *A* / *#* | *D1·070–080* |
| k3 | `teal`, solid | *V_REF* | *D1·090* |
| k4 | `amber`, dashed (later today) | *x̄ = Σx / N* | *D2·040* |
| k5 | `amber`, dashed (later today) | *y = a·x + b* | *D2·050* |
| k6 | `violet`, solid | two lines *SDA*, *SCL* | *D2·010* |

**The Look for's count, on the figure** (D2·020-F10 as applied): its *"three Day 1 stages"*, *in-amp, ADC input,
conversion*, are the teal columns k1 (*D1·060*) and k2 (*D1·070–080*: the INA226 does both in one block, the two channels
taking turns at the converter's input and the ΔΣ conversion, so one column carries both tags and its label names both,
§3b feature 3); its *"the reference is inside too … so its slot is shown empty"* is k3 (*D1·090* over the empty dashed
slot). k0's shunt stays outside, as the statement now says (*"the shunt still ours"*).

**The shunt, outside the package** (k0, y 260–520): a *12.00 V* rail enters at the top; the shunt *R_SHUNT* (IEC resistor,
heavy force path) runs down to *load* (an arrow, labelled *2.000 A*). Two thin sense wires (Kelvin) leave the shunt's two
ends for the package's **IN+** (supply side) and **IN−** (load side) pins; **VBUS** is tapped from the IN− node (as
SBOS547C §6.5.1's example connects it), with a junction dot. The fitted value is **not** written here: it is the band's first
row, so the two pictures stay identical above the seam.

**The package** (amber, heavy outline, x 250–1570, y 240–510; *INA226* at its bottom-left inside, y 470–500):

| Col | Block (inside) | What it shows | Source |
|---|---|---|---|
| left edge | pins **IN+** (10) y 300, **IN−** (9) y 380, **VBUS** (8) y 460 | names inside the edge, pin numbers outside | Figure 4-1 |
| k1 | *shunt voltage channel*: IN+, IN− in; *0–36 V*, *±81.92 mV* | the shunt voltage measured as a difference, both inputs on the bus's common mode | Figure 6-2 (channel name), §3, §6.3.1, §5.5 |
| k2 | one converter box *ΔΣ ADC*, *16 bit*; two inputs: the shunt channel from k1, the bus channel from VBUS (routed along y 460 under k1) | two channels, one converter, in turn | Figure 6-2, §6.3.1, §6.4.2, §5.5 |
| k3 | **an empty slot, dashed neutral outline**, *V_REF* struck through with a short stroke: nothing drawn inside | the datasheet shows no reference and has no reference pin (F-c7-4, decided (a)) | Figure 6-2, Figure 4-1 |
| k4 | register *Config 00h*, field *AVG 1…1024*, *CT 140 µs…8.244 ms*; a dashed control line back to the ADC | the averaging and conversion-time settings, drawn as the register that sets them, beside the data path, not on it | Table 7-1, Tables 7-2 to 7-5 |
| k5 | register *CAL 05h* (R/W) and two multipliers *×* on the data line: shunt × CAL → *Current 04h*; current × bus → *Power 03h* | the internal multiplier (§3) and the two products of Figure 6-2 | Figure 6-2, §6.5 Equations 1, 3, 4 |
| k6 | *I²C* interface block; pins **SDA** (4) y 280, **SCL** (5) y 345 (`violet`), **ALERT** (3) y 410, **A0 A1** (2, 1) y 475, names inside the right edge, stubs out to x 1590; *A0, A1 → GND: 1000000* under the A0 A1 stub | the interface; the address the strapping gives; ALERT as an output pin | Figure 4-1, Table 6-2, §6.3.1.2, §6.5.5 |
| data line | y 455, k2 → k5 → k6, with taps up to the registers | results computed, averaged and held, then read over I²C | §6.3.1, §6.3.1.1 |

**VS** (6) and **GND** (7) are **not drawn**: they carry no step of the chain, and the caption says so (A6; card 9 drew its
supply once and said it was not counted). Nothing else is drawn that the datasheet does not show: no amplifier inside k1
(Figure 6-2 names a *shunt voltage channel*, not an amplifier), no reference, no oscillator.

**The readout band** (y 550–1100), five rows on a 110-unit pitch, each row's content y +12 … +98 inside its row; columns:
register name x 60–560, raw decimal x 600–900 (mono), engineering value x 940–1540 (mono). Values are the pictures', computed
in §8 (the Figure computes nothing).

| Row (y) | Register | Calibrated (overlay) | FAULT (base) |
|---|---|---|---|
| r0 550–660 | *R_SHUNT* and a two-position selector glyph *10 mΩ ▮ 5 mΩ*; right: *CAL 05h = 5120 (100 µA, 10 mΩ)* · *load 2.000 A* · *Bus 02h 9600 = 12.00 V* | 10 mΩ filled | **5 mΩ filled, `rose`**; CAL, load, bus unchanged |
| r1 660–770 | *Shunt 01h* | *8000* · *20.00 mV = 2.000 A × 10 mΩ* | *4000* · *10.00 mV = 2.000 A × 5 mΩ* (neutral ink: it is true) |
| r2 770–880 | *Current 04h* | *20000* · *2.000 A* | **`rose`**: *10000* · *1.000 A ≠ 2.000 A* |
| r3 880–990 | *Power 03h* | *9600* · *24.00 W* | **`rose`**: *4800* · *12.00 W ≠ 24.00 W* |
| r4 990–1100 | *Mask/Enable 06h* | *OVF 0 · AFF 0* | *OVF 0 · AFF 0*, and a `rose` *✗ no flag* mark |

The shunt row halves **and stays true**: half the resistance gives half the voltage, and the register reports it exactly.
Only the rows computed through CAL are wrong. That is the FAULT's whole mechanism, and the rows say it in neutral ink against
rose (A2, A5).

**Values beside their element** (B14, B16): every readout on its row; *0–36 V*, *±81.92 mV* in the input block; *16 bit* in
the converter; *AVG 1…1024* in Config; *5120* beside CAL; the address under A0 A1.

**Colours and their second channel** (C4): Day 1 boxes `teal`, solid outline, tag *D1·…*; later-today boxes `amber`,
**dashed**, tag *D2·040*, *D2·050*; the interface `violet`, tag *D2·010*, and the SDA/SCL lines by their pin names; the
package `amber`, **heavy** outline and its name *INA226*; the FAULT `rose`, with *≠* and *✗* as its glyphs and the filled
selector position; the empty reference slot by its dashed neutral outline and the struck *V_REF*.

**Meet the parts** (B3): s0 shows both rows and the band as calibrated; the tour then names each pair.

### 3b. The `figure` block

| Field | Content |
|---|---|
| `title` | EN *INA226: built by hand, or bought* · FR *INA226 : construit à la main, ou acheté* |
| `image` | `figures/d2-020-ina226-fault.svg` (the base) |
| `compare` | `image: figures/d2-020-ina226-calibrated.svg`, `orientation: horizontal`, `label`: EN *Above the seam: 5 mΩ fitted, the FAULT. Below: 10 mΩ, as calibrated. Drag down to fit 5 mΩ.* · FR *Au-dessus de la ligne : 5 mΩ monté, le défaut. En dessous : 10 mΩ, comme étalonné. Faites glisser vers le bas pour monter 5 mΩ.* (the overlay owns the part below the seam, so the calibrated picture is the overlay) |
| `alt` | EN *Seven jobs of a current channel built by hand, each tagged with the module where we met it, over the INA226's block diagram: the shunt stays outside, Kelvin-connected to IN+ and IN−; the shunt voltage channel on a 0 to 36 V common mode; one 16-bit delta-sigma converter shared with the bus voltage; no reference pin; the configuration register with averaging from 1 to 1024; the calibration register and two multipliers giving current and power; the I²C interface. Below, the registers for 2 A through a 10 mΩ shunt on a 12 V bus: shunt 8000 (20 mV), current 2.000 A, power 24.00 W. With 5 mΩ fitted and the calibration still for 10 mΩ: shunt 4000 (10 mV, true), current 1.000 A, power 12.00 W, exactly half, and no flag set.* · FR *Sept tâches d'une voie de mesure de courant construite à la main, chacune marquée du module où nous l'avons vue, au-dessus du schéma fonctionnel de l'INA226 : le shunt reste à l'extérieur, raccordé en Kelvin à IN+ et IN− ; la voie de tension de shunt sur un mode commun de 0 à 36 V ; un seul convertisseur sigma-delta 16 bits partagé avec la tension de bus ; pas de broche de référence ; le registre de configuration avec un moyennage de 1 à 1024 ; le registre d'étalonnage et deux multiplicateurs qui donnent le courant et la puissance ; l'interface I²C. En dessous, les registres pour 2 A dans un shunt de 10 mΩ sur un bus de 12 V : shunt 8000 (20 mV), courant 2.000 A, puissance 24.00 W. Avec 5 mΩ monté et l'étalonnage toujours pour 10 mΩ : shunt 4000 (10 mV, exact), courant 1.000 A, puissance 12.00 W, exactement la moitié, et aucun indicateur levé.* |
| `caption` | EN *Redrawn from TI SBOS547C (Figure 6-2, Figure 4-1, §6.5). 2 A on a 12.00 V high-side rail; Current_LSB 100 µA. Supply pins VS and GND not drawn.* · FR *Redessiné d'après TI SBOS547C (figure 6-2, figure 4-1, §6.5). 2 A sur un rail de 12.00 V côté haut ; Current_LSB 100 µA. Broches d'alimentation VS et GND non représentées.* |
| `labels` | `numbers` (badges on the figure, names and notes in the key) |
| `reveal` | `on-tour` |
| `spotlight` | `dim` |
| `zoom` | `chain` rect [0, 0, 1, 0.5]; `registers` rect [0, 0.5, 1, 0.5] (phone, §5) |

Features (fractions of 1600 × 1100; columns x = (40 + 220k)/1600, w 0.125, y 70–510 → 0.0636, h 0.4):

| # | Feature id | Geometry `rect` | Colour | Label EN · FR | Tour `note` EN · FR |
|---|---|---|---|---|---|
| 1 | `col-shunt` | [0.025, 0.0636, 0.125, 0.4] | `teal` | *shunt, outside: D1·050* · *shunt, à l'extérieur : D1·050* | *You choose it, and you still connect it Kelvin: sense wires from its two ends to IN+ and IN− (§8.4.1).* · *C'est vous qui le choisissez, et vous le raccordez toujours en Kelvin : des fils de mesure de ses deux bornes vers IN+ et IN− (§8.4.1).* |
| 2 | `col-inputs` | [0.1625, 0.0636, 0.125, 0.4] | `teal` | *differential input on a 0–36 V common mode: D1·060* · *entrée différentielle sur un mode commun de 0–36 V : D1·060* | *The voltage across the shunt, measured as a difference while both inputs sit on the bus; common-mode rejection 126 dB minimum (§5.5).* · *La tension aux bornes du shunt, mesurée comme une différence pendant que les deux entrées sont au potentiel du bus ; réjection du mode commun 126 dB au minimum (§5.5).* |
| 3 | `col-adc` | [0.3, 0.0636, 0.125, 0.4] | `teal` | *ADC input and conversion: one 16-bit ΔΣ converter, two channels: D1·070–080* · *entrée de l'ADC et conversion : un seul convertisseur ΔΣ 16 bits, deux voies : D1·070–080* | *The shunt voltage and the bus voltage take turns on one converter (§6.3.1), a delta-sigma sampling at about 500 kHz (§6.4.2).* · *La tension de shunt et la tension de bus passent à tour de rôle dans un seul convertisseur (§6.3.1), un sigma-delta échantillonnant à environ 500 kHz (§6.4.2).* |
| 4 | `col-i2c` | [0.85, 0.0636, 0.125, 0.4] | `violet` | *I²C: D2·010* · *I²C : D2·010* | *On our path the bus comes before the firmware; here the averaging and the scaling are done before the bus.* · *Sur notre chaîne, le bus vient avant le micrologiciel ; ici, le moyennage et la mise à l'échelle sont faits avant le bus.* |
| 5 | `col-ref` | [0.4375, 0.0636, 0.125, 0.4], `line: dashed` | `teal` | *no reference pin: D1·090* · *pas de broche de référence : D1·090* | *The reference is inside: one count is a fixed 2.5 µV of shunt and 1.25 mV of bus, and the datasheet specifies it only through the gain error, 0.1 % maximum (§5.5).* · *La référence est interne : un pas vaut 2.5 µV de shunt et 1.25 mV de bus, et la fiche technique ne la spécifie qu'à travers l'erreur de gain, 0.1 % au maximum (§5.5).* |
| 6 | `row-shunt` | [0.025, 0.6109, 0.95, 0.0782] | `amber` | *Shunt 01h: 2.5 µV per count* · *Shunt 01h : 2.5 µV par pas* | *2 A × 10 mΩ = 20 mV = 8000 counts. Full scale ±81.92 mV.* · *2 A × 10 mΩ = 20 mV = 8000 pas. Pleine échelle ±81.92 mV.* |
| 7 | `col-avg` | [0.575, 0.0636, 0.125, 0.4] | `amber` | *averaging: D2·040, later today* · *moyennage : D2·040, plus tard aujourd'hui* | *Configuration 00h: 1, 4, 16, 64, 128, 256, 512 or 1024 results averaged (Table 7-3).* · *Configuration 00h : 1, 4, 16, 64, 128, 256, 512 ou 1024 résultats moyennés (tableau 7-3).* |
| 8 | `col-cal` | [0.7125, 0.0636, 0.125, 0.4] | `amber` | *calibration and scaling: D2·050, later today* · *étalonnage et mise à l'échelle : D2·050, plus tard aujourd'hui* | *CAL = 0.00512 / (Current_LSB × R_SHUNT) = 5120 for 100 µA and 10 mΩ. Current = Shunt × CAL / 2048; Power = Current × Bus / 20000 (§6.5).* · *CAL = 0.00512 / (Current_LSB × R_SHUNT) = 5120 pour 100 µA et 10 mΩ. Courant = Shunt × CAL / 2048 ; Puissance = Courant × Bus / 20000 (§6.5).* |
| 9 | `package` | [0.15625, 0.2182, 0.825, 0.2455] | `amber` | *INA226: one package, specified as a whole* · *INA226 : un seul boîtier, spécifié comme un tout* | *Offset ±10 µV and gain error 0.1 %, both maximum, for the whole channel from the pins to the register (§5.5).* · *Décalage ±10 µV et erreur de gain 0.1 %, tous deux au maximum, pour toute la voie, des broches au registre (§5.5).* |
| 10 | `band` | [0.025, 0.5109, 0.95, 0.4782] | `rose` | *FAULT: CAL for 10 mΩ, 5 mΩ fitted* · *DÉFAUT : CAL pour 10 mΩ, 5 mΩ monté* | *Shunt 4000: true. Current 10000 = 1.000 A and power 4800 = 12.00 W: exactly half, and no flag is set.* · *Shunt 4000 : exact. Courant 10000 = 1.000 A et puissance 4800 = 12.00 W : exactement la moitié, et aucun indicateur n'est levé.* |

Tour order: 1, 2, 3, 4, 5, 6, 7, 8, 9, 10 (the feature numbers are the tour's; the badges follow the compiler's
`numberCallouts`, which the render confirms). FR drafts ours, for the owner's review; numbers never translated.

## 4. The run: step by step, as the Flow goes

### 4a. Steps

| # | id (tour stop) | Flow paragraph (first words) | What changes (`say`) | Presenter's control |
|---|---|---|---|---|
| — | the poll, p1–p2 (§7a) | | | the activity |
| 0 | (before the walk) | p3 *"There is no single answer, so let us read the datasheet…"* | The chain we built by hand, over the INA226's block diagram, and its registers. | (the card opens) |
| 1 | `col-shunt` | p4 *"The INA226 puts most of yesterday's chain… you choose it."* | The shunt stays outside: still ours, still Kelvin-connected. | Next |
| 2 | `col-inputs` | p4 *"Its inputs measure the voltage across the shunt as a difference…"* | The in-amp's job: a difference on a 0–36 V common mode. | Next |
| 3 | `col-adc` | p4 *"Behind them is a 16-bit converter,"* | One 16-bit ΔΣ converter, shared by the shunt and the bus. | Next |
| 4 | `col-i2c` | p4 *"and behind that, registers you read over I²C."* | The registers, read over I²C, after the averaging and scaling. | Next |
| 5 | `col-ref` (F-c7-4, decided (a)) | unscripted (§2) | No reference pin: the reference is inside. | Next |
| 6 | `row-shunt` | p5 *"One count of shunt voltage is 2.5 µV…"*, S51 | 2 A through 10 mΩ: 20 mV, 8000 counts. | Next |
| 7 | `col-avg` | p6 *"Look at two more registers. One sets averaging…"* | Averaging, 1 to 1024: D2·040's job, in a register. | Next |
| 8 | `col-cal` | p6 *"Another is a calibration register…"*, S58 | Calibration and scaling: D2·050's job, in a register. | Next |
| 9 | `package` | p7 *"What you gain by buying… look inside each step."* | One package, specified as a whole. | Next |
| 10 | `band` | p7 *"And there is a new way to fail…"*; the seam dragged from 550 to 1100; held over p8 | CAL written for 10 mΩ, 5 mΩ fitted: current and power read half. | Next, then **drag the seam down** (§5); Next leads to D2·030 |

### 4b. Motion, cues and stills

| # | Motion | Movers | Cue and its second channel | Hold | Reduced motion (C3) | Still |
|---|---|---|---|---|---|---|
| 0 | none | 0 | the whole figure; the seam at rest in the gap | hold | whole | s0 |
| 1–5, 7–9 | the column (or package) to full emphasis, the rest dimmed | 1 | the column lit, top box and block together; its key entry | hold | at once | s1, s3, s5, s8, s9 |
| 6 | the band's shunt row lit | 1 | the row lit; its key entry with 2.5 µV | hold | at once | s6 |
| 10 | the band lit; then the seam, dragged down by the presenter, rests at 660, 770, 880, 990, 1100, turning one row to the FAULT at each rest: selector, shunt, current, power, flags | 1 (the seam) | the cue travels down the causal chain (B6): the selector's filled position, then each row's values, rose where wrong | hold at 1100 | the seam's position is the state: each rest lands whole; the strip's `say` and the two stills carry it | s10a (seam at 550, calibrated), s10b (seam at 1100, FAULT) |

Eight stills (s0, s1, s3, s5, s6, s8, s9, s10a/b); s10a and s10b side by side are the print form of the FAULT (C8). Nothing
moves except the seam, under the presenter's hand.

## 5. Pacing and interaction, by surface and view

**Who paces** (B12): on the wall the presenter (the tour's `step` and the seam's `wipe`, both mirrored; the wall's seam is
inert); in Study and Scope the learner, who drags the seam (the key variable, one control: B11).

| View | Who | Controls |
|---|---|---|
| Preview (in the slide) | everyone | the figure at its current stop and seam |
| View (details) | everyone | the *Walk* pane, the key, the seam (0–1 in 0.05 steps; starts at 0.5), zoom `chain` / `registers` |
| Edit (session only) | everyone | not specified for the Figure Bench |
| Authoring | authors | the `figure` block's YAML; the two SVGs |

- **The presenter's strip** (B20): *stop n / 10*, the next stop's `say` and the Flow clause it waits for; at s5 and s10 the
  unscripted lines of §2; at s10 *"drag the seam to the bottom: five rests, one row each"*; the teacher tip.
- **Keys** (C5): the tour's keys. **The seam has no keyboard and no tour step** (read 2026-10-21): the presenter drags it in
  the presenter's window (a pointer, one gesture). Both go to Benches by crossing when the course needs them (§12, F-c7-5
  decided); not needed on the day.
- **Study / Scope**: the walk learner-paced; the seam the learner's to drag; the `band` feature's note is the reveal's
  explanation.
- **Phone** (C6): the figure full width; the zoom targets `chain` (top half) and `registers` (the band) each fill the width;
  the seam is dragged with one finger on its grip (the grip is the bench's own control, so one finger on the stage
  otherwise does nothing, C6); the key under the figure.
- **Locked**: the walk starts after the poll closes; the seam is not locked (a learner who drags early sees the FAULT the
  Flow then names; nothing is spoiled that the poll asks).

## 6. The frame

| Tile / panel | Used? | Selected item | List / contents |
|---|---|---|---|
| Figure: Walk | yes | the active stop | ten stops with notes |
| Figure: key (Parts) | yes | — | the ten features as revealed, numbered |
| Figure: compare seam | yes | the seam's rest | two pictures, labelled by `compare.label` |
| Figure: zoom | Study, Scope, phone | — | *Whole*, *chain*, *registers* |

Title *INA226: built by hand, or bought*; the caption under the figure.

## 7. Thinking, not watching

- **7a. The PLAN's ASK** (verbatim): *poll (after the statement) — "Build the Day 1 chain, or buy the INA226? Name one thing
  that would push you each way." · options: Build | Buy | It depends on … · explain: The reasons named in chat become the
  trade: cost, board area and a calibrated block on one side; the choice of shunt and gain together, bandwidth and knowing
  every stage on the other. · depth: create · practice: arguing from evidence.* It fires at p1, **after the statement and
  p0, before s0**, on the statement's card; the figure does not answer it (there is no right answer), it prices the two
  choices, and s10 adds the one cost the room is unlikely to name. (The explain's *"the choice of shunt and gain together"*
  as applied: D2·020-F11, F-c7-3 (a), decided 2026-10-21.)
- **SEEDs** (verbatim): *SEED plants S51 — "Two amps through a ten-milliohm shunt is twenty millivolts: eight thousand of the
  INA226's 2.5-microvolt counts of signal. Remember that pair: two amps, ten milliohms."* · *SEED plants S58 — "Look at two
  of its registers: averaging, and calibration. The INA226 does in silicon two jobs our firmware is about to do by hand."*
  S51 is planted by p5 at **s6** (the shunt row shows *8000* and *20.00 mV = 2.000 A × 10 mΩ*); S58 by p6 at **s7–s8**
  (Config's AVG, then CAL). Both checked against their harvests in §8 (A4).
- **7b. Prediction points**: none added. The Flow names the FAULT's result in the sentence that drives the seam; the room
  has just been told the scale chain at s8, so a learner in Study can predict the rows before dragging.
- **7c. After**: the poll's explain. In Study, done means the poll answered and the walk reached s10 with the seam at the
  bottom (the FAULT seen).
- **7d. Teacher tip** (F-c7-6, decided: taken), presenter only: *Expect "buy, obviously". Ask: what if the current has fast edges
  you must see? The fastest conversion is 140 µs (§5.5), so a shunt-only stream tops out near 7,000 readings a second, and
  there is no bandwidth to choose beyond the conversion time and averaging. And when the room says "calibrated block": the
  CAL register holds the scale, so it is only as right as the shunt value someone typed. The datasheet's own fix is a
  one-point correction against an ammeter, its Equation 5: trunc(5120 × 2.000 / 1.000) = 10240, the CAL for 5 mΩ. That is
  D2·050's job, later today, and it corrects gain, not offset. Same for the alert limits: a power limit trips at twice the
  real power, and a shunt-voltage limit worked out for 10 mΩ trips at twice the current.*
- **7e. Explore**: the seam, in Study and Scope (B11), after the walk.

## 8. Faithfulness (the quality bar)

**Arithmetic** (Node, 2026-10-21; Equations 1, 3, 4 of SBOS547C §6.5):
- Current_LSB: maximum expected current 3 A (our assumption) → Equation 2, 3 / 2¹⁵ = 91.55 µA, rounded up to **100 µA** (the
  datasheet's own practice of a round LSB, §6.5); the register then holds up to 32767 × 100 µA = 3.2767 A.
- CAL = 0.00512 / (100 µA × 10 mΩ) = **5120** (1400h) ✓ (the brief, `draw7`).
- As calibrated: V = 2.000 A × 10 mΩ = 20.00 mV; Shunt = 20 mV / 2.5 µV = **8000** (1F40h, as the datasheet's own Table 6-1);
  Current = 8000 × 5120 / 2048 = **20000** → × 100 µA = **2.000 A**; Bus = 12.00 V / 1.25 mV = **9600**; Power = 20000 × 9600 /
  20000 = **9600** → × 25 × 100 µA = 2.5 mW → **24.00 W** = 2.000 A × 12.00 V ✓.
- FAULT: V = 2.000 A × 5 mΩ = 10.00 mV; Shunt = **4000** (0FA0h), true; Current = 4000 × 5120 / 2048 = **10000** (2710h) →
  **1.000 A**; Power = 10000 × 9600 / 20000 = **4800** (12C0h) → **12.00 W**: exactly half of 2.000 A and 24.00 W ✓.
- The fix (§7d): Equation 5, trunc(5120 × 2.000 / 1.000) = **10240** = 0.00512 / (100 µA × 5 mΩ) ✓; it fits CAL's 15 bits
  (≤ 32767) ✓.
- Full scale: 32768 × 2.5 µV = 81.92 mV; the most negative reading −32767 × 2.5 µV = −81.9175 mV (§5.5's *−81.9175 … 81.92*);
  the register's most positive code 7FFFh is 81.9175 mV, so *±81.92 mV* is the datasheet's nominal full scale (§7.1.2),
  within one count. The Flow's *"about ±82 mV"* ✓. Bus register full scale 40.96 V (§6.3.1), never above 36 V applied.
- Non-ideal sizes (§9): offset ±10 µV max = **4 counts**; gain error 0.1 % of 8000 = **8 counts**; CMRR 126 dB min over
  36 V: 36 V × 10^(−126/20) = **18 µV ≈ 7 counts**; 1 / 140 µs = **7,143** conversions per second; the load current with
  5 mΩ in place of 10 mΩ in a ≈ 6 Ω path (12 V / 2 A) rises by ≈ 5 mΩ / 6 Ω = **0.08 %**, below the figure's four
  significant figures, so *load 2.000 A* holds in both pictures (A3).
- Flow p5: 2 A × 10 mΩ = 20 mV ✓; 20 mV / 2.5 µV = 8,000 ✓. p6: averaging *"from 1 up to 1024 samples"* ✓ (Table 7-3:
  1, 4, 16, 64, 128, 256, 512, 1024).
- *"Exactly half"* (A3): the derived readings scale by R_fitted / R_CAL = 5 / 10 = 0.5 exactly; the reading is half the true
  value to within the ADC's last count (at the card's values exactly: 4000 is a whole count).

**The block diagram, against SBOS547C** (read in the extracted text, 2026-10-21):
- **One converter or two?** One. Figure 6-2 draws a *Shunt Voltage Channel* and a *Bus Voltage Channel* into a single
  *ADC*; §6.3.1: the device *"continuously converts a shunt voltage reading followed by a bus voltage reading"*; Figure 6-1
  alternates them; §5.5 gives one *ADC native resolution* of 16 bits; §6.4.2: *"The internal ADC is based on a delta-sigma
  front-end"* sampling at 500 kHz ± 30 %. So one 16-bit ΔΣ converter, shared in turn. The datasheet does not use the word
  *multiplexer*; the figure says *two channels, one converter, in turn*, which is what it shows.
- **The reference.** Figure 6-2 shows **no reference**, and Figure 4-1's ten pins (A1, A0, Alert, SDA, SCL, VS, GND, VBUS,
  IN−, IN+) include **no reference pin**; the text never mentions one. The LSBs are fixed in volts (2.5 µV, 1.25 mV, §5.5),
  so a reference is necessarily inside; its accuracy appears only in the gain error (0.02 % typ, 0.1 % max) and its drift in
  the gain-error drift (10 typ, 50 max ppm/°C). That last step is our inference (no separate reference figure exists to
  contradict it), and the note says *"specifies it only through the gain error"*, which is what the datasheet does. Hence
  the empty slot, not a block (F-c7-4).
- **ALERT.** An open-drain output (§6.3.1.2): asserted when the one alert function chosen in Mask/Enable (06h) (shunt over-
  or under-limit, bus over- or under-limit, power over-limit) crosses the Alert Limit Register (07h), and optionally on
  Conversion Ready; *"can be left floating"* if unused. Mask/Enable also holds **OVF** (math overflow, set only if a current
  or power calculation overflows) and **AFF** (alert function flag). In the FAULT nothing overflows and no limit is set, so
  both read 0: the band's r4 is the datasheet's own way of saying *"nothing complains"* (A6 ✓).
- **The in-amp.** Figure 6-2 names a *shunt voltage channel*, not an amplifier: block k1 carries the datasheet's name and is
  paired with D1·060 by **job** (a difference on a 0–36 V common mode, CMRR 126 dB min, §5.5; §3 *"common-mode bus voltages
  that can vary from 0 V to 36 V, independent of the supply voltage"*), not by circuit. The PLAN's *"differential input
  riding on a 0–36 V common mode"* is exactly that ✓.
- **Averaging and calibration.** AVG and the conversion times are fields of the Configuration Register (00h, Tables 7-2 to
  7-5; POR 4127h = AVG 1, both CTs 1.1 ms, shunt and bus continuous). The datasheet computes current and power after every
  shunt and bus conversion and averages the results in an accumulator before the output registers (§6.3.1, §6.3.1.1,
  Figure 6-1). The PLAN lists *"averaging and conversion-time settings → calibration, current and power registers"*; the
  figure draws Config as the register that sets the ADC and accumulator, beside the data path, so it claims no order. Not a
  finding: the PLAN's chain is a list of what to show, and nothing the room reads states an order.
- **I²C.** SDA and SCL open-drain (§6.5.5); Fast mode to 400 kHz and high-speed to 2.94 MHz (§6.5.5.2, not on the figure);
  A0 = A1 = GND → **1000000** (Table 6-2). Registers are 16 bits, MSB first.
- **Kelvin.** §8.4.1: *"Connect the input pins (IN+ and IN−) to the sensing resistor using a Kelvin connection or a 4-wire
  connection."* The figure's sense wires.

**Pairings, checked against each module's `en.md`** (headings grepped 2026-10-21): D1·050 *A shunt turns current into
voltage*, *Low side or high side*, *Kelvin: separate the current from the measurement* (and its 10 mΩ → 2 A → 20 mV) ✓;
D1·060 *Differential gain: amplify the difference*, *CMRR decides whether high-side sensing works* (its 12 V common mode) ✓;
D1·070 *One capacitor, many inputs* (channels and multiplexing) ✓; D1·080 *Sigma-delta: fast and coarse, then filtered* ✓;
D1·090 *A code is a ratio to the reference* ✓; D2·010 the digital interface ✓; D2·040 averaging (S58's harvest) ✓; D2·050
*Scaling: from code to engineering unit* and *Calibration: compare with a known reference* ✓. Card 4's homes agree (Interface
D2·010, Calibration requirements D2·050 later today; Multiplexing and Number of channels D1·070). The Look for's stage names
as applied (*in-amp, ADC input, conversion*, and the reference) are card 4's stages *conditioning (D1·060)* (whose part is
the in-amp), *ADC input (D1·070)*, *conversion (D1·080)* and *reference (D1·090)*, and land on k1, k2 and k3 as §3a says ✓.

**Section D, Figure rows**
- [x] Our own drawing, redrawn from SBOS547C (D2), cited in the caption (*Redrawn from TI SBOS547C …*); no logo, no vendor
  image (D1).
- [x] Named parts on the right features (§3b's fractions from §3a's coordinates: 40/1600 = 0.025, 220/1600 = 0.1375 per
  column; 70/1100 = 0.0636, 440/1100 = 0.4; the rows 562/1100 = 0.5109, 672/1100 = 0.6109; 86/1100 = 0.0782; the package
  250/1600 = 0.15625, 240/1100 = 0.2182, 1320/1600 = 0.825, 270/1100 = 0.2455).
- [x] Legible: to check on the render (§10).

**A1–A8** (quality bar; on the owner's current text and on this spec): A1 ✓ (every register value, LSB and limit above,
sourced); A2 ✓ (the FAULT as the device behaves: the shunt register true, only the CAL-derived registers wrong, no flag;
offset, gain error, CMRR in §9); A3 ✓ (the INA226 package drawn to its block diagram and pins, IEC); A4 n/a (no
instrument is imitated; the registers are read as registers, decimal); A5 ✓ (no motion; time scale *none*); A6 ✓
(simplifications labelled: *VS and GND not drawn*, the reference slot struck and noted, the caption's operating point);
A7: S51 and S58 against their harvests, and three findings in the owner's text, decided 2026-10-21 and applied (below and
§14); A8 ✓ (sources: SBOS547C,
the module files).

**Course accuracy A1–A7** (on the owner's current text):
- A1, A2 ✓: 20 mV, 8,000, ±82 mV, 1–1024, *exactly half* recomputed above. The MCU's truncating model is not used on this
  card (the INA226's registers are the datasheet's).
- A3 ✓: §8's edge notes (full scale within a count; *exactly half*; the load current).
- **A4 (cross-references)**: **S51** against D2·090's harvest (`notes/Day02/090-ground/en.md` l. 95, *"Two amps through ten
  milliohms: on the INA226 this morning that was eight thousand counts of signal. Same numbers, other copper, and here every
  one of them is error."*): the pair (2 A, 10 mΩ), the 20 mV and *"eight thousand counts of signal"* are the numbers this card
  shows at s6 ✓ (F6 made them agree), and D2·090's 2 A × 10 mΩ = 20 mV of return-trace error is the same arithmetic ✓.
  **Flag only**: its *"this morning"* is **DAY23-F1**'s (open in `ACCURACY.md`, D2·090 l. 95): this module runs 12:30 GMT, and
  D2·090's own unit fixes it. **S58** against D2·040's harvest (`notes/Day02/040-oversampling/en.md` l. 38, *"The INA226 had
  an averaging register, from 1 to 1024. This is what it does."*): 1 to 1024 ✓ (Table 7-3), and D2·040's N = 1 → 4 → 16 → 64
  are the INA226's first four settings ✓. **Flag only**: *"an averaging register"* is loose (averaging is the AVG field of the
  Configuration register; this card's p6 says *"One sets averaging"*, which is exact, and the figure labels *Config 00h,
  AVG*); D2·040's unit may say *"an averaging setting"*. Day 1's values (10 mΩ, 2 A, 12 V) are this card's ✓.
- A5 ✓ against SBOS547C (above). The statement's *"offered as one part"* was F-c7-1 (D2·020-F9); as applied, *"…offered as
  one part with a digital interface, the shunt still ours."* agrees with p4 (*"The shunt stays outside: you choose it."*),
  Figure 6-2 and the figure's k0 ✓.
- A6: *"nothing complains"* ✓ (OVF, AFF); *"a channel specified as a whole"* ✓. The Look for's *"three Day 1 modules"* was
  F-c7-2 (D2·020-F10); as applied, *"three Day 1 stages … (in-amp, ADC input, conversion; the reference is inside too, but
  the datasheet draws no block or pin for it, so its slot is shown empty)"*: three stages, k1 and k2, and the reference
  named apart, k3; no block or pin for it on Figure 6-2 or Figure 4-1 ✓. The poll's explain *"choice of shunt"* was F-c7-3
  (D2·020-F11); as applied, *"the choice of shunt and gain together"*: the INA226's range fixed at ±81.92 mV, so 1 A on
  10 mΩ is 10 mV = 4,000 counts, 12.2 % of 32,768 ✓, and filling it needs 81.92 mV / 1 A ≈ 82 mΩ ✓.
- A7 ✓: every fact cited to SBOS547C's section, table or figure.

**Our own discrepancies, fixed before sending**: `draw7`'s *internal reference* block (not on Figure 6-2) → the empty slot
(F-c7-4, decided (a) 2026-10-21); `draw7`'s package outline `azure` → `amber` (the module palette: the external converter is amber;
azure is card 5's common-mode); `draw7` printed the shunt row and current rows alike, so the FAULT read as *everything
halves*: the shunt row is now neutral and marked true; a first draft of the `compare` label had its halves the wrong way
round (the overlay owns the part below the seam), fixed in §3b.

## 9. Faults and non-ideal behaviour

**PLAN FAULT** (verbatim): *The INA226's calibration register written for a 10 mΩ shunt on a board fitted with 5 mΩ: the
current reads exactly half, steadily and plausibly.* Shown at s10 (D4), as §3a's band: the shunt register halves and is
true; current and power halve and are wrong; Mask/Enable shows no flag.

Not shown, said if asked (§7d), each sized:
- **Offset** ±2.5 µV typ, ±10 µV max (4 counts) and **gain error** 0.02 % typ, 0.1 % max (8 counts at 8000) (§5.5): the
  channel's own error, the reason F6 says *"counts of signal"* and not *"all of it"*.
- **Common mode**: CMRR 126 dB min over 0–36 V moves the shunt reading by at most 18 µV (7 counts) (§5.5).
- **The shunt is still ours**: its tolerance and temperature coefficient add straight to the current (outside the
  datasheet's figures); sense wires on the force terminals (D1·050's FAULT) add the leads to R_SHUNT (§8.4.1).
- **The alert limits share the FAULT**: a power over-limit compares the halved power, so it trips at twice the real power; a
  shunt-voltage limit worked out for 10 mΩ trips at twice the intended current (§6.3.1.2).
- **No calibration, no current**: with CAL at its power-on 0, current and power read 0 (§6.5, Table 7-1 note 2), a fault that
  does complain, by reading nothing.

## 10. Accessibility, legibility and print

- Wall (C2): at the course's assumed stage (≈ 0.69 px per unit at 1600 wide, as cards 4 and 9), the module tags and block
  names at ≥ 64 units (≈ 44 px); pins at a 65–80 unit pitch (45–55 px); the band's rows 110 units (≈ 76 px) with values at
  ≥ 64 units. The block's second lines (*0–36 V*, *±81.92 mV*, *AVG 1…1024*, *CT …*) are the densest text: if the render puts
  them under the floor, they leave the image and stay in the key and notes (where §3b already carries them). Check at
  1920 × 1080 and 1024 × 768, both pictures, EN and FR keys. The seam's line rests in gaps only (§3a); no label crosses a
  wire, a leader or the seam at rest.
- Reduced motion (C3): every stop at once; the seam moves only under a hand, and each rest is a whole state.
- Colour (C4): §3a's second channels (outline, dash, tag, *≠*, *✗*, the selector's filled position).
- Keyboard (C5): the tour's keys; the seam pointer-only today (its keys to be asked of Benches by crossing, §12).
- Print (C8): s10a and s10b side by side with their rows, the key, and the caption; s6 for S51.

## 11. Assets to make or source

| Asset | Format | Made by | Status |
|---|---|---|---|
| `figures/d2-020-ina226-calibrated.svg` (§3a, the overlay) | SVG 1600 × 1100, rendered for the owner first (a visual milestone) | the author | to make |
| `figures/d2-020-ina226-fault.svg` (§3a, the base): a copy of the calibrated file with the band's FAULT values; a byte-level diff shows changes below y 550 only | SVG | the author | to make |
| The `figure` block (§3b), EN and FR | YAML in `en.md` | the author | to write |

Both files from one source drawing, the band's values filled from §8's table, so nothing is made twice.

## 12. Bench capabilities this needs

**Figure Bench**: `rect` features (with `line: dashed`), colours, `label`/`note` `{en, fr}`, mirrored `tour`, `reveal:
on-tour`, `labels: numbers`, `spotlight: dim`, `zoom`, **`compare` with `orientation: horizontal`** and the mirrored `wipe`:
**exist** (read 2026-10-21).

**Are the live FAULT readouts within its abilities?** As **two drawn states and the presenter's seam between them**, yes:
that is `compare`'s purpose (*"the board as designed against the board as built"*, `FigureBench.vue`), and its 0.05 rest
positions fall on the band's row boundaries by design (§3a). As **computed readouts behind a switch**, no: the Figure Bench
has no state, no switch and no arithmetic, and the wall computes nothing. The values are therefore computed here (§8) and
drawn.

**Missing, to request from the Benches lane as a crossing when the course needs them** (F-c7-5 (a), decided 2026-10-21:
not raised now; neither blocks the day, and the card runs on `compare` as it exists):
1. **A tour step that sets the seam** (`tour[].wipe`), so *Next* lands it at each row (the clicker drives the FAULT, B12,
   C5), and an author-set starting position (`compare.start`).
2. **Keyboard on the seam** (arrow keys by 0.05), C5.

**Not this bench's**: computing the register chain for any shunt (the Equation Bench would: CAL, Equations 3 and 4, with
R_fitted on a slider; F-c7-5's option (b), not chosen).

## 13. Stand-in for the lecture

None needed: the Figure Bench and `compare` exist, and the presenter drags the seam in the presenter's window. Without the
tour-step seam (to ask by crossing when needed, §12), s10 is one pointer gesture instead of five clicks; nothing on the
wall differs. If the render check (§10, §15) finds the seam's grip unfit on the wall at its 0.5 rest, the fallback is
F-c7-5's option (b), the Equation Bench after s9, with the same numbers (§8), put to the owner then (the decided design is
(a)). The SVGs are the target's own assets.

## 14. Findings for the owner

**Three accuracy findings in the owner's text** (F-c7-1 to F-c7-3, logged in `ACCURACY.md` as **D2·020-F9 to F11**). Then
four items of ours. **All decided 2026-10-21, round two** (owner, in chat: *"Apply all recommended (a)"*), each kept as it
was put, the decision marked, and **applied**: the three accuracy findings in `en.md` (quoted in §1 and §7a as applied), the
rest in this spec's body. Nothing is open on this card.

- **F-c7-1 (accuracy, A5/A4) — the statement's *"the shunt-and-in-amp channel we built on Day 1, offered as one part"*.**
  **Decided: (a)** (D2·020-F9, applied: the statement ends *"…offered as one part with a digital interface, the shunt still
  ours."*).
  The INA226 does not contain the shunt: IN+ and IN− connect to an external one (Figure 4-1, §6.3.1, §8.4.1), and this card's
  own p4 says *"The shunt stays outside: you choose it."*, and its figure draws it outside. Read on the wall beside that
  figure, the statement says the opposite. Options:
  - (a) *"…the shunt-and-in-amp channel we built on Day 1, offered as one part with a digital interface, the shunt still
    ours."* (+4 words; **recommended**: one clause, the card's own point);
  - (b) *"…the in-amp, converter and firmware of the channel we built on Day 1, offered as one part with a digital
    interface."* (a rewrite naming what is inside);
  - (c) keep (the *"channel"* read as the measurement electronics around a shunt).
- **F-c7-2 (accuracy, A1) — the Look for's *"three Day 1 modules folding into one package"*.** **Decided: (a)**
  (D2·020-F10). **How it was applied, and why it differs from (a)'s gloss below:** the option named the three stages as
  *"the in-amp, the converter, the reference"*; the applied text names them *"in-amp, ADC input, conversion"* and the
  reference apart (*"the reference is inside too, but the datasheet draws no block or pin for it, so its slot is shown
  empty"*), because F-c7-4 (a), decided with it, draws no reference block (the empty dashed slot), and a stage the figure
  shows as empty cannot be one of the three it pairs. The register (`ACCURACY.md`) records it so; this spec follows the
  applied text everywhere (§1, §3a, §8). Counted against the pairing the PLAN asks for and the brief drew, the package takes over the jobs of **four** Day 1 modules (D1·060 conditioning,
  D1·070 ADC input, D1·080 conversion, D1·090 reference) and D1·050's shunt stays outside; the brief's own words were *"the
  in-amp, the converter and the reference fold into the package"*, three **stages**. Options:
  - (a) *"three Day 1 stages folding into one package"* (one word; **recommended**: the in-amp, the converter, the reference);
  - (b) *"four Day 1 modules (060–090) folding into one package"*;
  - (c) keep.
- **F-c7-3 (accuracy, A4/A6) — the poll's explain, *"…choice of shunt, bandwidth and knowing every stage on the other"*.**
  **Decided: (a)** (D2·020-F11, applied: *"…the choice of shunt and gain together, bandwidth and knowing every stage on the
  other."*).
  *Choice of shunt* is given as a reason to **build**, but with the INA226 the shunt is also the designer's choice (p4). What
  building adds is the **gain** to go with it: the INA226's input range is fixed at ±81.92 mV in 2.5 µV counts, so a 1 A
  channel on 10 mΩ uses 10 mV, 4,000 counts, 12 % of the range; filling it needs ≈ 82 mΩ (82 mW at 1 A), where a built
  channel keeps 10 mΩ (10 mW) and adds a gain of 8. Options:
  - (a) *"…the choice of shunt and gain together, bandwidth and knowing every stage on the other."* (+3 words;
    **recommended**);
  - (b) *"…a gain to suit any shunt, bandwidth and knowing every stage on the other."*;
  - (c) keep.
- **F-c7-4 — Proposal: the reference, as the datasheet shows it.** **Decided: (a)** (the empty dashed slot k3, stop s5 and
  its ≈ 15 unscripted words; §2, §3a, §3b feature 5, §4a). The task and the brief pair D1·090 with an *internal
  reference*, and `draw7` drew it as a block; SBOS547C's block diagram shows none and the part has no reference pin (§8).
  Options:
  - (a) column k3 as an **empty dashed slot**, *V_REF* struck, the note *"The reference is inside … specifies it only through
    the gain error, 0.1 % maximum"*, and stop s5 with ≈ 15 unscripted words (*"No reference pin: the reference is inside, so
    one count is a fixed 2.5 microvolts."*, +0.12 min), which leads into p5 (**recommended**: true to the page, and the slot is
    itself the lesson: the reference became a specification line);
  - (b) no k3 column: D1·090's tag shares k2's top box (*D1·070–090*) and the note goes on s3 (no unscripted stop; six
    columns, as `draw7`);
  - (c) `draw7`'s *internal reference* block (not on the datasheet: against D2).
- **F-c7-5 — Proposal: how the FAULT is carried (D4).** **Decided: (a)** (the `compare` of two registered pictures, §3a,
  §3b; the tour-step seam and the seam's keys to be asked of Benches by crossing **when the course needs them, not now**,
  §12). The Figure Bench cannot switch or compute (§12). Options:
  - (a) `compare`: two registered pictures, the seam resting in the gap and dragged down the five rows (exists), with the
    tour-step seam and seam keys requested from Benches by crossing when the course needs them (**recommended**: on the same
    figure as D4 decided, and the cue travels the causal chain row by row);
  - (b) the Equation Bench after s9, the register chain live with R_fitted on a two-stop slider (exists; computes; but the
    FAULT leaves the figure);
  - (c) ask Benches for a Figure *state switch* before the day (missing; the card waits on it).
- **F-c7-6 — Proposals on the figure**: the seventh column (*I²C*, D2·010) with the note *"on our path the bus comes before
  the firmware; here the averaging and the scaling are done before the bus"*; the hand-built row as glyphs and module tags
  (language-neutral, so one picture serves EN and FR; names in the key); the package `amber` (palette; `draw7` had `azure`);
  the band's five rows with *Mask/Enable 06h: OVF 0 · AFF 0* as the evidence of *"nothing complains"*, and the shunt row
  neutral and true in the FAULT; stop s9 on the package at p7 (*"specified as a whole"*: offset and gain error); VS and GND
  not drawn, said in the caption; the teacher tip (§7d); p8 held on the figure (its *"go back to the ADS1115's datasheet"* is
  spoken; card 5's noise table is one click back in Study). Options: (a) all (**recommended**); (b) the palette, the shunt
  row and the caption only; (c) none (`draw7` as drawn, the reference as F-c7-4 decides). **Decided: (a), all** (§3a, §3b,
  §4a, §7d, §9).
- **F-c7-7 — The card's time, 4.3 min** (2.5 on the bench), with ≈ 35 unscripted words (s5, s10); the module ≈ 29–30 of 30.
  Reported only. **Reported, and taken as reported**: the card unchanged in round two; the module ≈ 29.8 of 30 after round
  two's 71 words in card 6 (§2). Nothing is cut.

**Flags, not findings on this card** (§8 A4), unchanged by round two: D2·090's S51 harvest *"on the INA226 this morning"*
is DAY23-F1's (open); D2·040's S58 harvest *"an averaging register"* is loose wording for D2·040's unit (U022).

**Decided 2026-10-21, round two (owner: *"Apply all recommended (a)"*):** F-c7-1 (a), F-c7-2 (a), F-c7-3 (a) applied in
`en.md` as D2·020-F9 to F11 (the script panel's arc synced for F9, as the register records); F-c7-4 (a) the empty reference slot and s5; F-c7-5 (a)
`compare`, the two seam conveniences to ask by crossing when needed; F-c7-6 (a) all; F-c7-7 reported. Applied in §1, §2,
§3a, §3b (feature 3's label now names *ADC input and conversion*, so the column agrees with the applied Look for), §4a, §5,
§7, §8, §10, §12, §13. **Accuracy re-run on what changed** (A1–A7, Node, 2026-10-21): the statement, the Look for and the
explain as applied against p4, SBOS547C (Figure 6-2, Figure 4-1) and the figure's columns ✓ (§8); 10 mV / 2.5 µV = 4,000
counts, 4,000 / 32,768 = 12.2 % ✓; the card's Flow 350 words, unchanged; the module's Flow 2,116 words (16.28 min) ✓. Every
register value of §8 is as before. **Nothing is open on this card**; the spec is **spec-ready**.

## 15. Acceptance: how we know it is built right

- The figure compiles with §3b's fields; the ten features land on their columns, the package and the band; the collision
  check passes on both pictures.
- A diff of the two SVGs changes nothing above y 550. With the seam at each rest (550, 660, 770, 880, 990, 1100) the seam lies
  in a gap; the rows switch in the order selector, shunt, current, power, flags.
- On the render: the shunt outside the package with two sense wires to IN+ and IN−, VBUS tapped at IN−; one ΔΣ ADC fed by two
  channels; the k3 slot empty and dashed; Config with AVG beside the data path; CAL with two multipliers; SDA and SCL violet;
  the 10 pins' names as Figure 4-1 (VS, GND absent, as captioned).
- The band reads, calibrated: 8000 / 20.00 mV, 20000 / 2.000 A, 9600 / 24.00 W, OVF 0 · AFF 0; FAULT: 4000 / 10.00 mV
  (neutral), 10000 / 1.000 A and 4800 / 12.00 W (rose), OVF 0 · AFF 0 with the *✗* mark; CAL 5120 and bus 9600 in both.
- B1 one pair per stop; B2 only the toured column and the seam change; B3 s0; B4 the eight stills; B5 each `say` on the strip;
  B6 the seam's cue down the causal chain; B10 no verdict on the poll; B11 the seam the learner's in Study; B13 names, tags
  and values only; B14 values on their rows and blocks; B15 the two rows, then the pairs; B16 picture, values, seam; B17 the
  two states at one seam; B20 the unscripted lines and the tip on the strip.
- C2 legible at 1920 × 1080 and 1024 × 768 (both pictures, EN and FR keys); C3 each rest a whole state; C4 §3a's second
  channels; C5 the tour's keys (the seam's keys to ask of Benches by crossing when needed); C6 at 320 px with `chain` and `registers`; C8 s10a and s10b.
- E1–E6, both themes, EN and FR.
- **Six gates (this spec)**: (1) realism: the INA226 drawn from its own block diagram and pins, the Kelvin shunt on Day 1's
  12 V rail, the registers as the part reports them, decimal, with its real flags ✓; (2) science: one shared ΔΣ converter,
  no drawn reference (none on the page), the FAULT's mechanism exact (the shunt reading true, only CAL-derived values wrong,
  no flag), checked against SBOS547C sections and tables ✓; (3) maths: CAL 5120, 8000, 20000, 9600, 24.00 W and the FAULT's
  4000, 10000, 4800, 12.00 W recomputed from Equations 1, 3, 4, the fix 10240 from Equation 5, every fraction from the
  drawing ✓; (4) visualization: each pair in one column, the cause before its effects down the seam, the true row set
  against the wrong ones ✓; (5) consistency: the module palette (package amber, fixed from `draw7`'s azure), Day 1's 10 mΩ,
  2 A and 12 V, card 4's homes, S51 and S58 against their harvests (two flags for other units), three accuracy findings
  raised, never fixed silently, decided by the owner and applied in `en.md` (D2·020-F9 to F11), the Look for's three stages
  agreeing with the figure's columns (§3a) ✓; (6) design: rests in gaps, labels clear of every line at rest, type at the floor by arithmetic with
  the key as the fallback for second lines, one picture for EN and FR ✓ on paper, to check on the render.
