```yaml
id: D2-010-03-level-shifting
card: "Level shifting: 5 V logic into a 3.3 V pin"
module: notes/Day02/010-digital-interfaces/en.md
bench: Animation                  # D1, decided 2026-10-20: an Animation Bench demonstration built by the Benches lane on one crossing
library: "logic-io: a 2D scene library (the bench top view and its IEC schematic, linked; a 3.3 V MCU input with its clamp diodes inside the chip outline; the input's threshold gauge; the course's handheld meter), loaded with params `config: level-shift` by this card's sequence `d2-010-level-shifting`; designed in §3 of this spec for cards 3, 5, 6 and 8; asked of the Benches lane by one crossing (crossing-d2-010-logic-io.request.md, final 2026-10-20; its id assigned when it is raised)"
dimensions: 2D
stand_in: "none (P8 a, decided 2026-10-20): the card plays from its words and its poe until the library lands; the PLAN's Electronics fixture `level-shift` stays deferred"
optional_benches: [Electronics]   # the PLAN's SHOW (deferred: the Electronics Bench is in development)
real_thing: "a 5 V sensor module's digital output (our own unbranded module, VCC GND OUT) wired on a 400-point breadboard to a GPIO of the course's unbranded 3.3 V MCU board, whose input has protection (clamp) diodes to its 3.3 V rail; the module powered from the board's 5 V pin; a 10 kΩ over 20 kΩ divider switched in; the course's handheld meter on the pin; drawn beside its IEC 60617 schematic"
minutes: 1.5                      # on the bench (§2)
card_minutes: 2.5                 # the whole card, the poe included (§2)
status: spec-ready                # D1, F1, F5, N1 applied; P1–P8 decided 2026-10-20 (round two: all recommendations) and applied; nothing open (the library not yet built does not block)
learner_action: poe
predictions: []                   # the PLAN's poe fires before s0 (§7a); no prediction on the bench
seeds: []
key_variable: "the connection between the 5 V output and the pin (direct or through the divider), and with it the clamp diode's current into the 3.3 V rail"
time_scale: "none: steady DC states, one per step"
steps: 3                          # s0–s2 in the lecture; the FAULT state in Explore (§7e, §9)
```

**Written 2026-10-20 (U019)** after the owner's choices on the U019 brief (*"apply all recommendations"*): **D1** (cards 3, 5,
6 and 8 get Animation Bench demonstrations built by the Benches lane, one scene library, one crossing), **F1** (the PLAN's
SHOW and Look for: the rail carries the MCU's own load; the pin sits a diode-drop above its rail), **F5** (the FAULT at
*"about 1.66 V"*), **N1** (no product name on a teaching surface). The PLAN's Electronics fixture `level-shift` stays
**deferred** (memory `electronics-bench-in-development`); the card still gets its demonstration. **This spec designs the
`logic-io` scene library (§3) for all four cards**; the specs for cards 5, 6 and 8 (`D2-010-05-floating-input`,
`D2-010-06-open-drain`, `D2-010-08-two-outputs`) reference §3 and add only their own configurations. The U019 brief's card-3
schematic (`bench-work/previews/u019-preview.html`, `draw3()`, `solve3()`) previewed the numbers; this spec is what the
Benches lane builds from.

**Round two, 2026-10-20** (the U019 brief's *Specs: round two*; owner: *"apply all recommendations"*): every proposal of §14
(P1–P8) takes its recommended option, and the body below states the decided design: the bench beside the schematic (P1);
S1 with a third position, *OPEN*, so the first frame does not answer (P2); the MCU's 50 mA labelled a model value (P3); the
non-ideal cases in Study only (P4); V1 held at 5.000 V (P5); the teacher tip (P6); no demo cue added to the Flow (P7); no
stand-in (P8). No Flow or PLAN word of card 3 changed in round two.

## 1. What the room must understand

- **Statement** (verbatim): *A 5 V digital output wired straight to a 3.3 V microcontroller's GPIO may damage the input.
  The signal has to be shifted to the 3.3 V logic level first, with resistors, diodes, transistors or a level-shifter IC.*
- **SHOW** (verbatim from the PLAN): *Electronics — new fixture `level-shift`: a 5 V supply V1 behind R1 (47 Ω, the module
  output's own resistance) wired to the GPIO, modelled as a 1N4148 clamp diode D1 from the pin to a 3.3 V rail V2 (carrying
  the MCU's own load, so the clamp current has somewhere to go); a DMM on the pin; current overlay on.*
  The PLAN names the Electronics Bench (written before D1); that widget is deferred, and the target is the Animation Bench
  (D1). The Flow has no `[[demo]]` cue on this card, and none is added (P7, decided): the stops fall on the Flow's own
  clauses and the presenter's strip carries the step titles.
- **Drive** (verbatim): *(1) direct connection: watch D1 and V2 carry current; (2) insert the divider R2 10 kΩ over R3
  20 kΩ: the clamp current falls to nothing, the pin sits at 3.33 V.*
- **Look for** (verbatim): *direct: the pin at about 4.0 V, a diode-drop above its own rail, and about 21 mA into it; with
  the divider, 3.33 V and almost nothing. The meter shows the pin above its rail; the current overlay shows the harm.*
- **Status** (verbatim): *ready (fixture from existing parts: supply-bench ×2, resistor-typical, diode-1n4148, dmm-budget)
  · ideal: needs Electronics: logic-input part with clamp diodes and an injection-current limit.*
- **Decided by the owner, 2026-10-20** (applied here, not re-asked): **D1** the Animation demonstration by Benches, one
  library for cards 3, 5, 6, 8; **F1** the rail carries the MCU's load and the Look for above; the demonstration uses the
  **typical (SPICE) 1N4148 model**, not Studio's `diode-1n4148` profile (§8); **F5** the FAULT's *"about 1.66 V"*; **N1**
  *"a 3.3 V microcontroller"*, no product named (the ESP32 datasheet is cited in §8 as a source only). **Round two**
  (2026-10-20, *"apply all recommendations"*): **P1–P8** as their recommended options (§14), applied in §3–§13.
- **Bench and library.** The **bench** is the Animation Bench (M62, the Benches lane's, served from
  `C:\ExSightory\src\exsight-benches\benches\animation\`). The **library** is a new scene library, `logic-io` (§3), loaded
  by a short sequence per card with that card's `params` (memories `scene-libraries-and-assemblies`, `one-block-at-a-time`).
  This card's sequence is `d2-010-level-shifting`, one block, `config: level-shift`.
- **Insight**: *a CMOS input is high impedance only between its rails: wire 5 V to a 3.3 V pin and its protection diode
  conducts, holding the pin about 0.7 V above its own supply and pushing some 21 mA into the 3.3 V rail; a divider brings the
  pin to 3.33 V and the current to nothing.*
- **Kind of knowledge**: *a contrast between two states* (direct, divider) on *a picture built up* (the bench and the
  schematic). Card test → **Animation**, as D1 decided: the cause (the connection changed on the breadboard) and the effect
  (the pin's level, the diode's current) must change together in front of the room. B15 applies (the bench and the schematic
  met in s0 before anything is switched); B17 applies (bench, schematic, gauge and meter visible together; the run log keeps
  the earlier state beside the current one); B18 and B19 do not (2D; no hand skill).
- **Why this bench, not a still**: the harm is invisible on the outside. The meter alone shows a pin *above its own rail*,
  which a learner reads as "high, fine"; only the current through the clamp diode into the rail shows the harm. The room must
  see the diode inside the chip start to carry current the moment the wire goes direct, and stop when the divider goes in.
- **Key variable**: the connection (direct or divider), and with it the clamp diode's current.

## 2. Time

The card's Flow, counted from en.md on 2026-10-20 (words ÷ 130 wpm; cue tags not counted): **175 words = 1.35 min**, all
spoken. It has no `[[demo]]`, `[[ask]]` or `[[reveal]]` cue: the poe is the PLAN's, on its own card before the statement.
Recounted after round two (2026-10-20): unchanged, 175 words (P7 added no cue); the minutes stand.

| # | Paragraph (first words) | Words |
|---|---|---|
| p0 | *"Two devices may use the same protocol but operate at different electrical levels…"* | 34 |
| p1 | *"For instance, moving a digital signal from a 5 V logic range…"* | 68 |
| p2 | *"If we connect the sensor output directly to the microcontroller's digital pin…"* | 49 |
| p3 | *"We can achieve this using discrete components such as resistors, diodes or transistors…"* | 24 |

| Beat | Minutes | Source of the number |
|---|---|---|
| The poe, on its own card before the statement: the question read, the answer window, the tally | 1.00 | the course's estimate for a four-option poe (no timer in the PLAN) |
| s0 appears with the statement card and holds under p0 and p1; each part's label cued as p1 names it | 0.78 | 102 ÷ 130 |
| p2 (49) over s1: the connection goes direct at its first clause; the diode's current and the meter land | 0.38 | 49 ÷ 130 |
| s1's motion: the switch, then the current and the values landing, not covered by speech | 0.05 | estimate, ≈ 3 s |
| p3 (24) over s2: the divider switched in at *"resistors"*; the current falls to nothing | 0.18 | 24 ÷ 130 |
| s2's motion, not covered by speech | 0.05 | estimate, ≈ 3 s |
| **On the bench** (s0 to the end of p3) | **1.5** | 1.44 |
| **Card total** (the poe included) | **2.5** | 2.44 |

The long paragraph (p1) falls on the held s0 (B13). The poe's reveal (*"current overlay through D1 into V2, then the divider
inserted"*) is s1 and s2, so the reveal waits for the commitment (B9).

**Module check**: `targetMinutes: 30`; the module's Flow was **2,643 words (20.3 min)** at round one (cards 307, 363, 175,
258, 217, 197, 292, 224, 423, 187). Recounted on 2026-10-20 after the round-two edits to en.md: **2,663 words (20.5 min)**
(cards 307, **370**, 175, **266**, 217, 197, 292, 224, 423, **192**: card 2's direction bullet +7, card 4's SPI sentence +8,
card 10's transition +5; the demo cues of cards 5, 6 and 8 changed one word for one). The module was ≈ 31.6 of 30 min at
round one (`D2-010-07` §2b; the brief said ≈ 33) (D5, reported, nothing trimmed); the 20 added words are ≈ 0.15 min more,
which card 7's §2b carries. This card is 2.5 min. The module's time table is kept in one place, the centrepiece spec (card 7).

## 3. The scene: the `logic-io` library (cards 3, 5, 6 and 8)

### 3a. One library, four configurations

`logic-io` is **one scene library** (`kind: "scene"`) with one stage and one model; each card's sequence loads it with its
own `params` (memory `scene-libraries-and-assemblies`). Nothing is drawn twice across the four cards: the same board, the
same pin, the same meter, the same gauge, the same symbols and colours.

| `config` | Card | What is on the breadboard | Spec |
|---|---|---|---|
| `level-shift` | 3 | the 5 V module's OUT to the MCU's GPIO, open, directly or through R2/R3; S1 *OPEN · DIRECT · DIVIDER* (P2), S2 *NORMAL · SWAPPED* (Explore) | this spec |
| `floating-input` | 5 | the GPIO alone; R4 10 kΩ on S3 *UP · OFF · DOWN*; a push button SW1 to ground (Explore, the FAULT) | `D2-010-05-floating-input` |
| `open-drain` | 6 | one 2N7000-class N-MOSFET Q1 with its drain on the bus; S4 *LET GO · PULL* on its gate; R5 4.7 kΩ pull-up on S6 *OFF · ON* | `D2-010-06-open-drain` |
| `two-outputs` | 8 | Q1 and Q2 on one bus (S4, S5), R5 on; `outputs: push-pull` swaps both for push-pull logic outputs (the FAULT) | `D2-010-08-two-outputs` |

Declared `params` (each with its default, its range and its words): `config`; `connection` (`open` | `direct` | `divider`; default `open`, P2);
`dividerOrder` (`normal` | `swapped`); `pinPull` (`up` | `off` | `down`); `meter` (`on` | `parked`); `button`
(`absent` | `released` | `pressed`); `gate1`, `gate2` (`let-go` | `pull`); `pullUp` (`off` | `on`); `outputs`
(`open-drain` | `push-pull`); `mcuLoad` (A, default 0.050); `leakage` (A, default 0.4 × 10⁻⁹); the model constants of §8.
Every value on the stage is computed from these (memory `input-drives-every-output`), never typed.

### 3b. Layout

Stage 1920 × 1080 (memory `one-scale-per-scene`):

- **Left, the bench**, a top view at **one stated scale, 1 mm = 4 px**: a 400-point solderless breadboard (82.5 × 54.5 mm →
  330 × 218 px; DINKIT's `breadboard`, reused), the course's 3.3 V MCU board beside it (the D1·010 `ldr-chain` board look:
  its solder mask, silkscreen and copper inks), jumper wires (DINKIT's `jumper`), and the course's handheld meter (DINKIT's
  `dmm`, its probes' clips on the measured node), all at that scale. A magnifier (D.zoomBubble) over the GPIO header pin,
  marked *×4*, links the pin to the schematic's chip outline (*inside the pin*).
- **Right, the IEC schematic** of the same circuit, *not to scale* (said), the values beside their elements. The MCU is a
  **dashed chip outline** with the GPIO pin on its edge; inside it, the pin's two protection diodes (to V_DD and to ground)
  and the input buffer, its output labelled *reads*. Selecting a part on one highlights it on the other (C62).
- **Beside the pin on the schematic, the input's gauge**: a vertical bar from 0 to 5 V (card 3) or 0 to 3.3 V (cards 5, 6,
  8), with three bands: **LOW** below V_IL = 0.825 V, **not guaranteed** between 0.825 and 2.475 V, **HIGH** above V_IH =
  2.475 V; the rail (3.3 V) drawn as a line across it; the pin's level a marker on it, its value beside it. Under it, *the
  input reads*: **LOW**, **HIGH**, or **not guaranteed: HIGH or LOW**.
- **Under both, the run log** (the library's own, B4, B17): one row per settled state, kept.

### 3c. Parts (all configurations; card 3's in bold)

Our own designs, unbranded (memory `real-but-unbranded`); class values sourced in §8. Part ids are shared by the bench and
the schematic.

| id | Part | Value, and its source | Drawn as (bench · schematic) |
|---|---|---|---|
| **`bb`** | 400-point solderless breadboard, 2.54 mm pitch, two power-rail pairs | DINKIT's `breadboard` | top view at 1 mm = 4 px · — |
| **`mcu-board`** | The course's 3.3 V MCU board (unbranded): USB 5 V in, an on-board 3.3 V regulator, a 3.3 V MCU, header pins *5V*, *3V3*, *GND*, *IO* (silkscreen) | the course's board (D1·010 `ldr-chain` style) | board top view, its pins wired to the breadboard's rails and rows · — |
| **`rail`** | The MCU's **3.3 V rail** (V2): the board's regulator | **3.300 V**, held: the regulator sources current only | — · IEC voltage source *3.3 V rail* |
| **`mcu-load`** | **The MCU's own draw** from the rail | **50 mA**, a model value (P3, decided: labelled *"MCU draw: a model value"*), drawn as a constant current; F1: it is what absorbs the clamp current | — · IEC current source *MCU 50 mA*, inside the chip outline |
| **`pin`** | The **GPIO** pin (header *IO*), the node the card is about | its level V_pin, computed (§8) | header pin, magnified · node dot on the chip outline, *GPIO* |
| **`d-up`** | **Protection (clamp) diode, pin → V_DD**, inside the MCU | modelled as a **1N4148, typical (SPICE) model**: I_S 2.52 nA, n 1.752, R_S 0.568 Ω (F1, §8) | — (inside the chip) · IEC diode, anode at the pin, cathode at V_DD |
| `d-down` | Protection diode, ground → pin, inside the MCU | the same model; conducts only below 0 V (never in these cards) | — · IEC diode, drawn faint |
| **`in-buf`** | The input buffer | V_IL 0.25 · V_DD = **0.825 V**, V_IH 0.75 · V_DD = **2.475 V**; leakage **0.4 nA** (model, ≤ 50 nA max) (§8) | — · IEC buffer (rectangle with *1*), its output to *reads* |
| **`mod5`** | **5 V sensor module** (our design, unbranded): a small board 32 × 14 mm, 3-pin header *VCC GND OUT* (silkscreen) | powered from the board's *5V* pin (USB 5 V); its output a 5 V CMOS stage | board top view at 1 mm = 4 px · a dashed outline *5 V module* |
| **`v1`** | **The module's 5 V output stage, HIGH** (V1) | **5.000 V** (the USB rail, held, no control; P5, decided) | — · IEC voltage source *5 V* |
| **`r1`** | **The module output's own resistance** (R1) | **47 Ω** (the PLAN; plausibility §8) | — · IEC resistor *R1 47 Ω (the output's own)*, inside the module outline |
| **`r2`**, **`r3`** | **The divider**: R2 10 kΩ (top), R3 20 kΩ (bottom), 1 % metal film, 0.25 W, axial | E24 values; 6.3 mm bodies (DINKIT's `axialResistor`) | on the breadboard · IEC resistors *R2 10 kΩ*, *R3 20 kΩ* |
| **`s1`** | **Slide switch OPEN · DIRECT · DIVIDER** (three positions, breadboard pins; P2, decided): the module's OUT to nothing, to the pin, or to the divider's top | the bench's own control (memory `controls-built-into-the-hardware`) | slide switch on the breadboard · IEC three-position switch *S1* |
| **`s2`** | **Slide switch NORMAL · SWAPPED** (DPDT): exchanges R2 and R3 | Explore only: the FAULT (§9); precedent: D1·010's divider swap switch on the sensor board | slide switch · IEC two-pole change-over *S2* |
| **`dmm`** | **The course's handheld meter** (DINKIT's `dmm`): 3½ digits (1999 counts), DC volts, **20 V range** (10 mV a count), **10 MΩ input**, ±(0.5 % + 3) | the course's handheld (D1·020 cards 3–8; `handheld-meter` library: *"Input impedance: 10 MΩ on every DC range"*) | the meter at 1 mm = 4 px, its red clip on the pin's row, black on GND · IEC voltmeter (circle *V*) with its *10 MΩ* drawn as a resistor in a dashed box |
| `gnd` | Ground | ideal (labelled) | the breadboard's − rail · IEC earth |
| `r4` · `s3` · `sw1` | card 5's pull resistor, its switch, the button | `D2-010-05-floating-input` §3 | |
| `q1` · `q2` · `s4` · `s5` · `r5` · `s6` · `bus` | cards 6 and 8's outputs, their switches, the pull-up, the bus | `D2-010-06-open-drain` §3, `D2-010-08-two-outputs` §3 | |

**Meet the parts** (s0, B3), one line each, cued as p1 names them: *5 V module — its OUT drives 0 or 5 V* · *3.3 V MCU — its
GPIO is not designed to tolerate 5 V* · *clamp diode — inside the chip, from the pin to its own 3.3 V rail* · *3.3 V rail —
the MCU's supply; the MCU's own 50 mA draw* · *S1 — OPEN for now; DIRECT, or through the divider* · *meter — on the pin, 20 V range*.

**Values beside their element** (B14, B16; C20), mono, with units (≤ 4 significant figures, D6.14):

| Chip | Where | Values through the run |
|---|---|---|
| The meter's LCD | on the meter (bench) | **0.00** (s0, open) · **4.03** · **3.33** (· **1.66** in Explore, FAULT); its last digit wanders a count at times (memory `instruments-read-live`) |
| Pin level on the gauge | beside the gauge's marker | 4 mV (s0: the meter's 10 MΩ its only path) · 4.033 V · 3.326 V (· 1.663 V) |
| *above its rail by* | beside the gauge, only when V_pin > 3.3 V | 0.73 V |
| Clamp diode current | beside `d-up` | **20.6 mA** · ≈ **2 nA** (· 0) |
| Rail currents | beside `rail` and `mcu-load` | *regulator 29.4 mA · clamp 20.6 mA · MCU 50 mA* (direct); *regulator 50.0 mA · clamp 0 · MCU 50 mA* (divider) |
| Module output current | beside `r1` | 20.6 mA · 0.167 mA |
| *the input reads* | under the gauge | LOW (s0) · HIGH (with the pin above its rail) · HIGH (· not guaranteed: HIGH or LOW) |

**The run log** (one row per settled state, kept): *connection · pin (meter) · clamp current · reads*. Rows: *direct · 4.03 V
· 20.6 mA · HIGH, pin above its rail*; *divider 10 k / 20 k · 3.33 V · ≈ 2 nA · HIGH*; in Explore *swapped 20 k / 10 k ·
1.66 V · 0 · not guaranteed*.

**Labels** (B14): part labels on the part's own round, icon-only button and numbered tags with a key (memory
`components-standalone-labels-on-a-button`); nothing moves except the switches' levers, which are still when read.

**Symbols**: IEC 60617 by default (resistor a rectangle, diode a triangle and bar, voltage source a circle with its line along
the wire, current source a circle with its line across, change-over switches, the voltmeter a circle with *V*, buffer a
rectangle with *1*, IEC earth); the bench's **Symbols IEC | US** switch redraws the schematic in the US set (memory
`iec-symbols-us-switch`). The bench top view is the bench in both.

**Colours and their second channel** (C4), annotation palette roles, not hex (the U019 brief's palette, gate 5):

| Thing | Colour role | Second channel |
|---|---|---|
| The pin, the line or bus (cards 5, 6, 8) | teal | drawn thicker; the label *GPIO* / *bus* |
| What sets the HIGH: the 5 V output, the pull-ups | amber | the label and its value |
| Harm: the clamp current, the FAULT | rose | the value chip in mA and the word *clamp* |
| The meter and its leads | azure | the meter itself, the label *meter 10 MΩ* |
| The MCU and its chip outline | violet | the dashed outline, the label *3.3 V MCU* |
| Gauge bands | LOW azure-tint, not guaranteed rose-tint, HIGH lime-tint | the words *LOW*, *not guaranteed*, *HIGH* in each band, and the threshold values |

**Words the room reads** (every visible word as `{en, fr}` in the library's data; French drafts mine, for the owner's review;
numbers, units and silkscreen never translated; memory `languages-follow-the-parent-app`):

| en | fr |
|---|---|
| 5 V module · 3.3 V MCU · clamp diode · 3.3 V rail · MCU's own draw · divider · meter | module 5 V · MCU 3.3 V · diode de protection · rail 3.3 V · consommation propre du MCU · diviseur · multimètre |
| *the input reads* · LOW · HIGH · not guaranteed: HIGH or LOW | *l'entrée lit* · BAS · HAUT · non garanti : HAUT ou BAS |
| *above its rail by* | *au-dessus de son rail de* |
| *clamp current into the rail* | *courant de la diode vers le rail* |
| *R1 47 Ω: the output's own resistance* | *R1 47 Ω : résistance propre de la sortie* |
| *Clamp diode modelled as a small-signal silicon diode (typical); real MCUs' differ* | *Diode de protection modélisée comme une diode silicium petit signal (typique) ; celles des MCU réels diffèrent* |
| *MCU draw: a model value* | *Consommation du MCU : valeur de modèle* |
| *Thresholds: 0.25 and 0.75 of V_DD* | *Seuils : 0.25 et 0.75 de V_DD* |
| *Steady states only* | *Régimes établis seulement* |
| *Schematic not to scale; bench 1 mm = 4 px* | *Schéma sans échelle ; banc 1 mm = 4 px* |

(Numbers keep the '.' decimal in both languages, as the parent app's `formatQuantity` does.) Silkscreen stays as printed
(*VCC GND OUT*, *5V 3V3 GND IO*); the slide switches carry no silkscreen (breadboard parts): their positions are named by
the stage labels *DIRECT · DIVIDER*, *NORMAL · SWAPPED*.

**Key framings** (2D): *Whole* (Home) · *Schematic* (the chip outline, the diode, the gauge) · *Bench* (the breadboard,
the module, the meter).

## 4. The run: step by step, as the Flow goes

### 4a. Steps

| # | id | Flow paragraph | What changes (the `say`) | Overlay for the room | Presenter's control |
|---|---|---|---|---|---|
| 0 | `s0-meet` | appears with the statement card, after the poe; held under p0, p1; labels cued as p1 names the module and the MCU | Meet the bench: a 5 V module's output, a 3.3 V MCU's input with its clamp diode to its own rail, and a switch that wires them directly or through a divider. Nothing is connected yet: the pin reads 0.00 V. | *5 V out · 3.3 V input · clamp to the rail* | (on the stage with the card) |
| 1 | `s1-direct` | p2 *"If we connect the sensor output directly to the microcontroller's digital pin, the voltage may be too high and could damage the input."* | Wired directly, the pin rises past its rail until the clamp diode conducts: the pin sits at 4.03 V, 0.73 V above its own 3.3 V supply, and 20.6 mA flows through the diode into the rail. | *4.03 V, 0.73 V above the rail · 20.6 mA into the rail* | Next; framing *Schematic* |
| 2 | `s2-divider` | p3 *"We can achieve this using discrete components such as resistors, diodes or transistors…"* | Through the 10 kΩ over 20 kΩ divider the pin sits at 3.33 V, below its rail: the diode carries about 2 nA, and the input still reads HIGH. | *3.33 V · ≈ 2 nA · reads HIGH* | Next; framing *Whole* (the bench is done) |

s0's *"Nothing is connected yet"*: **decided (P2, round two)**, S1 is a three-position slide switch *OPEN · DIRECT ·
DIVIDER* and s0 stands at *OPEN*, so the first frame does not show the poe's answer (memory `views-arrive-at-first-frame`).
At *OPEN* the meter's 10 MΩ is the pin's only path: the pin sits at 0.4 nA × 10 MΩ = 4 mV (meter **0.00**, *reads* LOW, no
current), which is card 5's lesson met early and true; card 3's stage says nothing more about it.

### 4b. Motion, cues and stills per step

| # | Motion | Movers | Cue and its second channel (B6) | Hold | Under reduced motion (C3) | Still (B4) |
|---|---|---|---|---|---|---|
| 0 | none (arrives whole at its first frame) | 0 | each part highlighted (C38) as p1 names it, its label arriving | hold | the same | the labelled bench and schematic, S1 open, meter 0.00 |
| 1 | S1's lever slides to *DIRECT* (`move`, `quick`); then, linked, the pin's marker climbs the gauge past the rail line, the meter's digits settle at 4.03, the diode's and the rail's current chips arrive (`normal`) | 1 (one linked motion) | paired cue (C41): S1, the pin, `d-up` and the rail lit together; the rail line on the gauge highlighted with *above its rail by 0.73 V*; **the current is the bench's** (memory `circuit-effects-are-the-benchs`, §12): from `v1` through R1, the pin, `d-up` into the rail node, and on through the MCU's draw to ground, 20.6 mA; none into the buffer's input | hold | S1 at DIRECT, the values and the log row | 4.03, 20.6 mA; log row 1 |
| 2 | S1's lever slides to *DIVIDER* (`quick`); linked, the marker falls below the rail line to 3.33 V, the diode chip to ≈ 2 nA, the rail chips (`normal`) | 1 | paired cue: S1, R2, R3, the pin and `d-up` lit together; if the bench draws current, 0.167 mA through R1, R2, R3 to ground, none through `d-up` (≈ 2 nA does not move) | hold | as above | 3.33, ≈ 2 nA; log row 2 |

Nothing flashes (B8); nothing loops. No time is shown: the clamp's response is nanoseconds, and every step is a steady state
(labelled *"Steady states only"*).

## 5. Pacing and interaction, by surface and view

**Who paces**: on the wall the presenter, one press per step; the wall draws the bench's transport flat (*step n of 3*,
holding) and the breadboard's switches as state, not operable (B12). In Study Mode and Scope, the learner.

| View | Who | Controls (range, default, states) |
|---|---|---|
| Preview (in the slide) | everyone | Previous · Next · *step n of 3* · the step's title · *Open details* |
| View (details) | everyone | the bench's transport (Previous, Play, Replay, Reset, Next, then Speed and Autoplay); Symbols IEC \| US (IEC); EN \| FR (hidden when hosted); Stops, Parts, Cues tiles; Ink. After s2 (Explore, C37): **S1** *OPEN · DIRECT · DIVIDER* and **S2** *NORMAL · SWAPPED* on the breadboard itself; the meter, the gauge, every chip and the log follow |
| Edit (session only) | everyone; a student's own copy | ink on the bench and the schematic; a temporary note on a step |
| Authoring | authors | the stops, their `say`, overlays, cue track; the library's `params` (§3a); the `{en, fr}` words |

The library has no transport of its own; its only controls are the breadboard's switches (memories
`player-controls-are-the-bench`, `controls-built-into-the-hardware`).

- **Presenter's strip** (B20): the next step's title and "what changes"; the teacher tip (§7d); keys → / PageDown next, ← back,
  R replay.
- **Study Mode and Scope**: the same three steps, learner-paced; the stills strip; Explore after s2 (B11), with the FAULT
  (S2 *SWAPPED*).
- **Phone** (C6): portrait, the schematic with the gauge on top, the bench below it (its switches 44 px targets), then the
  step's title and sentence, the stills row, big Previous / Next; one finger does nothing on the stage, two pinch and pan.
- **Locked**: the switches during the guided pass in Study and Scope; they open with Explore.

## 6. The frame

| Tile / panel | Used? | Selected item (one large value) | List / contents |
|---|---|---|---|
| Stops | yes | the step's title and "what changes" | the three steps; *Stills* mode |
| Views | no (2D; the framings from the stage's zoom buttons) | — | — |
| Parts | yes | the pinned part, e.g. *Clamp diode* with **20.6 mA**, or *GPIO* with **4.033 V** | the parts of §3c with their values |
| Section | no (2D) | — | — |
| Cues | yes | — | highlight on/off; legend of §3c's colours |
| Compare | no (the run log carries it) | — | — |
| Explore | yes, after s2 | — | S1, S2 on the breadboard |
| Ink | yes | — | laser, ink |
| Ask | no on the bench (the poe is the card's own activity) | — | — |

Identity bar: *Level shifting: 5 V logic into a 3.3 V pin · Holding · step n of 3*. Legend card: the colours and their second
channels; the labels *Clamp diode modelled as…*, *MCU draw: a model value*, *Thresholds: 0.25 and 0.75 of V_DD*, *Steady
states only*, *Schematic not to scale; bench 1 mm = 4 px*.

## 7. Thinking, not watching

- **7a. The PLAN's ASK** (verbatim): *poe (before the statement) — "A 5 V output is wired straight to a 3.3 V GPIO. Where
  does the extra 1.7 V go?" options: The pin just reads HIGH | The input's clamp diode conducts and current flows into the
  3.3 V rail | The 5 V output sags to 3.3 V by itself | Nothing flows: inputs are high impedance answer: The input's clamp
  diode conducts and current flows into the 3.3 V rail reveal: current overlay through D1 into V2, then the divider inserted
  explain: A CMOS input is high impedance only between its rails; above the rail its protection diode conducts, and about
  (5 − 3.3 − 0.7) V across 47 Ω pushes some 21 mA into the pin and the 3.3 V rail. depth: understand practice: constructing
  explanations.* It fires **before s0**, on its own card (EAC: an activity gets a card); **s1 and s2 are its reveal**.
- **7b. Prediction points on the bench**: none beyond the poe.
- **7c. After the reveal**: the poe's explain (in Scope and on the presenter's strip). In Study, done = the poe answered and
  the three steps seen.
- **7d. Teacher tip** (decided, P6): *Learners read 4.03 V as "a strong HIGH" and the 3.33 V as "weaker". Ask: what is
  the pin's own supply, and where does current go when a pin sits above it?*
- **7e. Explore** (C37, after s2): S1 (three positions) and S2 (the FAULT, §9); the log fills as they are tried. No other
  variable on the wall; in Study, `mcuLoad` stays hidden (P3) except in §9's item 1 (P4, decided).

## 8. Faithfulness (the quality bar)

**The model** (recomputed in Node, 2026-10-20; script in the session scratchpad, `nums.mjs`). One node, the pin, solved by
bisection to 10⁻¹² V:

(5 − V) / (R1 + R_top) = V / (R_bot ∥ R_m) + I_D(V − 3.3), with R1 = 47 Ω, R_m = 10 MΩ (the meter), R_top / R_bot = 0 / ∞
(direct) or 10 k / 20 k (divider) or 20 k / 10 k (swapped), and the diode I_D(v) from v = n·V_T·ln(I/I_S + 1) + I·R_S, I_S
2.52 nA, n 1.752, R_S 0.568 Ω, V_T 25.852 mV (27 °C); the rail ideal at 3.300 V (sourcing only; the MCU's 50 mA draw
absorbs the clamp current, F1).

| State | V_pin (with the meter) | V_pin (without) | I_D (clamp) | Module current | Meter (20 V range) | Reads |
|---|---|---|---|---|---|---|
| open (s0, P2) | **4.0 mV** (0.4 nA leakage × 10 MΩ) | no DC path: undefined (card 5) | −2.52 nA (reverse) | 0 | **0.00** | LOW (held by the meter) |
| direct | **4.0326 V** | 4.0326 V | **20.58 mA** | 20.58 mA | **4.03** | HIGH, 0.733 V above the rail |
| divider 10 k / 20 k | **3.3259 V** | 3.3281 V | **1.94 nA** | 0.1666 mA | **3.33** | HIGH (> 2.475 V) |
| swapped 20 k / 10 k (FAULT) | **1.6630 V** | 1.6641 V | −2.52 nA (reverse: the diode's I_S) | 0.1665 mA | **1.66** | not guaranteed (0.825 < V < 2.475) |

- **Look for** (F1, A1): *"the pin at about 4.0 V, a diode-drop above its own rail"*: 4.033 − 3.3 = **0.733 V** ✓; *"about
  21 mA into it"*: 20.6 mA ✓; *"with the divider, 3.33 V and almost nothing"*: 3.326 V → 3.33 ✓, 1.9 nA ✓. The poe's explain,
  (5 − 3.3 − 0.7) / 47 = **21.3 mA** (*"some 21 mA"*) ✓: the solved diode drop is 0.733 V, the 47 Ω drops 0.967 V.
- **The diode model (F1, decided).** Studio's `diode-1n4148` profile
  (`C:\ExSightory\src\bench-courses\electronics\src\shared-assets\parts\baseline\profiles\diode-1n4148.partprofile`) is
  derived from the datasheet's guaranteed points (V_F ≤ 1 V at 10 mA, I_R ≤ 25 nA at 20 V: I_S 25 nA, n 3.017, its own note
  calling it *"a bounding envelope rather than a physical model"*); under it the direct state gives **14.3 mA and 4.33 V**
  (recomputed: 14.31 mA, 4.328 V at its V_T 25.693 mV), not the Look for's 21 mA and 4.0 V. The demonstration uses the widely
  published typical SPICE model of the 1N4148 (I_S 2.52 nA, N 1.752, R_S 0.568 Ω), which gives V_F ≈ 0.73 V at 20 mA,
  inside the datasheet's ≤ 1 V. Labelled on the stage: *"Clamp diode modelled as a small-signal silicon diode (typical); real
  MCUs' differ"*.
- **The thresholds (N1; A7).** V_IL ≤ 0.25 · V_DD = 0.825 V and V_IH ≥ 0.75 · V_DD = 2.475 V: Espressif ESP32 datasheet, *DC
  Characteristics (3.3 V, 25 °C)* (cited here only, N1). The same datasheet gives the input leakage (I_IH, I_IL ≤ 50 nA) used
  in cards 5 and 6, and the GPIOs are not 5 V-tolerant (Espressif's own guidance): the Flow's *"not designed to tolerate a 5 V
  signal"* ✓. On the stage: *"a 3.3 V MCU"*, *"Thresholds: 0.25 and 0.75 of V_DD"*.
- **R1 47 Ω (A7).** The PLAN's value for the module output's own resistance. Plausible for a 5 V CMOS output: a 74HC-class
  output at V_CC 4.5 V delivering 4 mA typically sits ≈ 0.2 V below its rail (a few tens of ohms); **to confirm against a named
  datasheet when Benches builds** (no learner-facing number depends on it beyond R1's own label). At 20.6 mA the module's
  output drops 0.97 V across it; the model treats R1 as a linear resistance, as the PLAN does (labelled as the output's own
  resistance, a model value).
- **The rail (F1; A5).** The clamp current must go into the 3.3 V rail; a regulator sources but cannot sink. With the MCU
  drawing 50 mA, the regulator supplies 50 − 20.6 = **29.4 mA** and the rail stays at 3.300 V (Kirchhoff at the rail node, on
  the stage). Below 20.6 mA of MCU draw the rail would rise (§9).
- **Power (A3).** R1 dissipates 20.6² × 47 = **19.9 mW**, the diode 0.733 × 20.6 = **15.1 mW**: no part overheats; the harm
  is the injected current, not heat in R1.
- **The FAULT (F5).** 1.663 V with the meter, 1.664 V without (*"about 1.66 V"* ✓); the divider alone would give 1.667. Inside
  0.825–2.475 V ✓ (*"inside the band between V_IL and V_IH"*).
- **The meter (A4).** The course's handheld, 10 MΩ: on the pin it draws 0.40 µA at 4 V (no visible effect: 4.0326 V with and
  without). On the 20 V range one count is 10 mV, so 4.0326 → 4.03, 3.3259 → 3.33, 1.6630 → 1.66; its ±(0.5 % + 3) is ±0.05 V
  at 4 V, so the wandering last digit stays inside its stated accuracy (memory `drawing-and-numbers-agree`).
- **Edge cases (A3).** The divider state sits 26 mV below the rail: the diode's forward bias is 26 mV and it carries 1.9 nA,
  ≈ the leakage scale, so *"almost nothing"* is honest. Across USB's ±5 % (4.75–5.25 V) the direct state gives 4.017 V /
  15.6 mA to 4.045 V / 25.6 mA: the pin moves only 28 mV (the diode holds it), the current ±25 %; the card's *"about 4.0 V"* and
  *"some 21 mA"* hold at the nominal 5.000 V, which the scene holds (P5).
- **Cross-references (A4).** D2·010 card 5 (`floating-input`) uses the same pin, thresholds, meter and gauge; cards 6 and 8 the
  same meter and bus colours. D1·020's handheld (10 MΩ, 3½ digits) is the same instrument. D1·040's *"high in, low out"*: the
  pin is high impedance only between its rails, which this card shows breaking.

**Section D, Animation rows**
- [x] Mechanism checked at every stop: Kirchhoff's current law at the pin, the Shockley diode with series resistance, the
  divider (Ohm's law), a regulator that only sources.
- [x] Motion timing: no physical time shown; every step a steady state, labelled.
- [x] Every stop matches its Flow clause (§4a); every value at a stop recomputed (above).
- [x] Simplifications labelled (A6): *Clamp diode modelled as a small-signal silicon diode (typical); real MCUs' differ*;
  *MCU draw: a model value*; *Thresholds: 0.25 and 0.75 of V_DD*; *Steady states only*; *Schematic not to scale; bench 1 mm =
  4 px*; ground ideal.
- n/a (3D).

**A1–A8**: A1 ✓ (every value sourced or computed above; R1's plausibility to confirm, flagged); A2 ✓ (the non-ideal effect is
the card's point; the others in §9); A3 ✓ (our own module and board, unbranded; class values; one scale, stated); A4 ✓ (the
course's handheld, its range, resolution and input resistance); A5 ✓ (no time shown, said); A6 ✓; A7 ✓ (F1, F5 applied; no
open finding in card 3's text); A8 ✓.

## 9. Faults and non-ideal behaviour

**PLAN FAULT** (verbatim): *The divider's resistors swapped (20 kΩ over 10 kΩ): the pin sits at about 1.66 V, inside the band
between V_IL and V_IH, and reads HIGH, LOW or both.* On this library: **S2 *SWAPPED*** in Explore (Study, Scope, the labs and
the wrap-up), never on the wall's guided pass (the Flow does not speak it): pin 1.663 V, meter 1.66, the gauge's marker in the
*not guaranteed* band, *the input reads: not guaranteed: HIGH or LOW*. *"Or both"*: drawn as the *reads* output toggling
between HIGH and LOW irregularly, below 1 Hz (B8), labelled *illustrative: a pin held between the thresholds may read either,
and change*.

Non-ideal effects the real thing shows (**decided**, P4: item 1 in Study as described, items 2–3 in the Parts card's words;
never on the wall):
1. **No MCU load**: in deep sleep an MCU draws microamps; the 20.6 mA then has nowhere to go and lifts the whole 3.3 V rail
   (the regulator cannot sink), over-volting every part on it. Shown in Study with `mcuLoad` at 0.01 mA: the rail chip turns
   rose and the stage says *"the rail rises: nothing on it absorbs the clamp current"* (no rail voltage computed: it depends
   on what else is on the rail).
2. **Mid-band input current**: a CMOS input held between its thresholds partly turns on both its transistors and draws extra
   supply current (design-dependent; named in words only).
3. **The divider's speed**: the divider's 6.7 kΩ source resistance and the pin's few pF slow the edges (≈ 6.7 kΩ × 5 pF ≈
   33 ns time constant): fine for slow signals, not for fast buses; that is why the Flow also names transistors and
   level-shifter ICs. In words, card 7 shows the RC itself.

## 10. Accessibility, legibility and print

- Wall: overlays and chips at 32 pt, 7:1; the meter's LCD is decoration at its true scale and is never the only place a value
  is read: the gauge's chip carries it. Check the gauge's chips (*4.033 V*, *above its rail by 0.73 V*) and the rail's three
  current chips for collisions at 1920 × 1080 and 1024 × 768.
- Reduced motion: every §4b row lands whole and reads from its still, overlay and sentence.
- Colour: bands, harm and the meter differ by word, outline and shape as well as hue (§3c).
- Keyboard: → ← R; in Explore, S1 and S2 reachable by Tab, moved by Space / arrows.
- Languages: §3c's table as `{en, fr}`; the longest labels wrap, never shrink.
- Print (C8): the three stills (and the FAULT state), each with its sentence and values, and the run log.

## 11. Assets to make or source

| Asset | Format | Made by | Status |
|---|---|---|---|
| The bench top view at 1 mm = 4 px: the 400-point breadboard (DINKIT), the course's 3.3 V MCU board (`ldr-chain` style), the 5 V module (32 × 14 mm, unbranded), the slide switches, the divider, the jumpers, the course's handheld (DINKIT `dmm`) | the Benches lane's 2D drawing (SVG or its kits) | the Benches lane, from §3 | to make |
| The IEC schematic (chip outline, clamp diodes, buffer, gauge) and its US set | the same | the Benches lane | to make |
| `logic-io` scene library: parts, the model of §8 (one node solver for all configurations), the gauge, the chips, the run log, the switches, `params`, words `{en, fr}` | Animation Bench library in `C:\ExSightory\src\exsight-benches\benches\animation\libraries\logic-io\` | the Benches lane | to request by crossing (final 2026-10-20, U019; raised by the lead) |
| The card's sequence `d2-010-level-shifting`: the three stops of §4a | sequence library | the Benches lane | with the above |

**Reuse first** (memory `reuse-done-scenes`), in `C:\ExSightory\src\exsight-benches\benches\animation\libraries\`: DINKIT's
`breadboard`, `jumper`, `axialResistor`, `dmm` / `dmmReading` (the course's handheld; never remodelled), `partButton`,
`callout`; the `ldr-chain` / `bare-input` board style (the course's MCU board); `handheld-meter` for the meter's specification
words (*10 MΩ on every DC range*). **Not used**: `arduino-uno` (branded, a 5 V board: this card's MCU is 3.3 V), `bench-supply`
and `sw3005` (the 5 V comes from the board's USB pin; the rail is the board's own regulator, F1), `vdd-reference` (D1·090
card 4's, not built yet; a different board).

## 12. Bench capabilities this needs

**Animation Bench** (M62; as its capability list, `benches/animation/capabilities.md`, names them): C1 next and hold · C2
back · C5 stop list · C6 scrubber · C10 replay · C13 keys · C15 a stop restores its scene · C16 stills · C17 meet the parts ·
C18 "what changes" · C19 overlay · C20 values beside their element · C21 teacher tip · C23 print · C30–C31 select a part and
its card · C35 labels · C37 Explore (the breadboard's switches) · C38 highlight · C41 paired cue · C44 no flashing · C52
presenter strip · C60 wall profile · C62 linked representations (the bench and the schematic) · C64 reduced motion · C65
colour never alone · C66 phone · C72 stop inspector · C75 checks · the EN | FR switch (exists, bench v21; hidden when hosted) ·
controls on the library's hardware (exist: `ldr-chain`'s) · sequences with `params` (exist, bench contract 4) · **missing
(request): the Symbols IEC | US switch** (memory `iec-symbols-us-switch`; asked once for all benches in crossing 510) · **to
confirm with Benches: moving current** on a circuit drawn in an Animation library (memory `circuit-effects-are-the-benchs`):
if the bench draws it, the clamp current runs from the module's 5 V through R1, the pin and the clamp diode into the rail
node and on through the MCU's draw to ground, its speed and brightness following 20.6 mA, and **nothing into the input
buffer** (high impedance: a level, not a flow; memory `signal-cues-only-when-needed`); with the divider, 0.167 mA through
R1–R2–R3 and none through the diode; if not, the rose mA chips carry it and nothing is drawn by the library.

**Not this bench's**: the Electronics Bench's logic-input part with an injection-current limit (the PLAN's *ideal*) stays
the Electronics Bench's (deferred). Charge dots and glows are the bench's, never the library's.

## 13. Stand-in for the lecture

The live run (10–12 Oct 2026) is past; the stand-in is for the published course until the library lands. **Decided (P8 a,
round two): none**: the card plays from its words, and its poe carries the question and its explain (*"some 21 mA"*), as
D1·050's Electronics cards do; nothing is made that the library would replace. (The option not taken: the U019 brief's
card-3 schematic as a still Figure, a second drawing of the same circuit, memory `reuse-done-scenes`.)

## 14. Findings for the owner

No **accuracy** finding in card 3's text (A1–A7 run on 2026-10-20 against the current en.md, the decided edits included:
statement, PLAN SHOW / Drive / Look for / Status, the poe and its explain, the FAULT, Flow p0–p3; §8). F1 and F5 are applied
and re-checked (4.033 V, 20.6 mA; 3.326 V, 1.9 nA; 1.663 V).

The proposals of round one, **all decided 2026-10-20 in round two** (each kept as it was put; the decision marked):

- **P1 — Proposal: the bench beside the schematic.** **Decided: (a).** Options: **(a)** the bench top view (breadboard, the course's MCU
  board, the 5 V module, the meter) at 1 mm = 4 px, linked to the IEC schematic with the chip outline and the gauge, as D1·090
  card 4's decided P1 (**recommended**: the switches the owner's rule puts on the hardware, and the meter, are seen on a real
  bench; the clamp diode is inside the chip, so the schematic is needed too); (b) the schematic alone, as the U019 brief
  drew it, the switches as IEC switches on it.
- **P2 — Proposal: a first frame that does not answer.** **Decided: (a).** Options: **(a)** S1 a three-position slide switch *OPEN · DIRECT ·
  DIVIDER*, s0 at *OPEN* (meter 0.00, the pin's marker at 0 V) (**recommended**, memory `views-arrive-at-first-frame`); (b)
  s0 already direct (the poe's answer on the stage before the reveal step: not recommended).
- **P3 — Proposal: the MCU's draw, 50 mA.** **Decided: (a).** A model value large enough to absorb the clamp current (F1). Options: **(a)** 50
  mA, a constant current inside the chip outline, labelled *"MCU draw: a model value"*, the regulator supplying 29.4 mA
  (**recommended**); (b) unlabelled; (c) a different value (any above 20.6 mA gives the same pin and diode values).
- **P4 — Proposal: the non-ideal cases of §9** (no MCU load lifting the rail; mid-band current; the divider's speed) for
  Study only, not on the wall. Take (**recommended**: item 1 in Study as described, items 2–3 in the Parts card's words), or
  none? **Decided: take, as recommended.**
- **P5 — Proposal: V1 held at 5.000 V.** The board's USB 5 V varies by ±5 % (4.75–5.25 V); the card does not need it.
  Options: **(a)** held at 5.000 V, no control (**recommended**); (b) an Explore control for the USB voltage. **Decided: (a).**
- **P6 — Proposal: the teacher tip (§7d).** Take it (**recommended**) or not? **Decided: taken.**
- **P7 — Proposal: a demo cue in the Flow.** **Decided: (a)**, the Flow unchanged. The Flow has no `[[demo]]` cue; the bench lands on p2 and p3 (§4a) from the
  presenter's press. Options: **(a)** leave the Flow as it is; the presenter's strip carries the step titles (**recommended**:
  the stops already fall on the Flow's own clauses); (b) add *"[[demo]] Animation Bench: the 5 V output wired straight to a
  3.3 V pin, then through a divider."* at the start of p2 (a Flow edit, the owner's).
- **P8 — Proposal: the stand-in** (§13). **(a)** none (**recommended**); (b) the brief's schematic as a still. **Decided: (a).**
- **Reported**: the card counts 2.5 min (1.5 on the bench), unchanged in round two; the module was ≈ 31.6 of 30 min at round
  one, ≈ 0.15 min more after round two's edits to cards 2, 4 and 10 (§2; card 7's §2b carries it) (D5, the owner cuts if
  needed). Nothing is cut.

Decided 2026-10-20 (owner: *"apply all recommendations"* on the U019 brief): D1 (an Animation Bench demonstration by Benches,
one scene library for cards 3, 5, 6, 8, one crossing), F1 (the rail carries the MCU's load; the Look for as quoted; the
typical SPICE 1N4148 model), F5 (*"about 1.66 V"*), N1 (*"a 3.3 V microcontroller"*), N2 (no demo numbers); N3 and D2–D5
belong to other cards.

**Decided 2026-10-20, round two (owner: *"apply all recommendations"*):** P1 (a) the bench top view beside the linked IEC
schematic; P2 (a) S1 *OPEN · DIRECT · DIVIDER*, s0 at *OPEN*; P3 (a) the MCU's 50 mA drawn as a constant current, labelled
*"MCU draw: a model value"*; P4 the non-ideal cases in Study only (item 1 as described, items 2–3 in words); P5 (a) V1 held
at 5.000 V; P6 the teacher tip; P7 (a) no demo cue added (the Flow unchanged); P8 (a) no stand-in. Applied in §1, §3, §4a,
§7, §9 and §13. **Accuracy re-run on what changed** (A1–A7, Node, 2026-10-20, `nums.mjs` in the session scratchpad): the new
*OPEN* state, 0.4 nA × 10 MΩ = 4.0 mV, meter 0.00, *reads* LOW (true: the meter holds the pin, card 5's mechanism, and
no current); direct 4.0326 V, 20.58 mA, 0.733 V above the rail, regulator 29.42 mA, R1 19.9 mW, diode 15.1 mW; divider
3.3259 V (3.3281 V without the meter), 1.94 nA, 0.1666 mA; swapped 1.6630 V (1.6641 V without); the poe's estimate
(5 − 3.3 − 0.7) / 47 = 21.28 mA: all as before, to the digit. The Flow (175 words) and the PLAN of card 3 did not change in
round two. **Nothing is open on this card**; the spec is **spec-ready**. Ours, not blocking: R1 47 Ω's plausibility against
a named 5 V CMOS datasheet (§8) is still to be confirmed when Benches builds (no learner-facing number depends on it beyond
R1's own label).

**Raised 2026-10-20:** crossing **516** (the `logic-io` library, cards 3, 5, 6, 8; `C:\ExSightory\lanes\pbl2026-x\.claude\crossing\open\516-pbl2026-to-benches-d2-010-logic-io-one-scene-library-for-cards-3-5-6-8.request.md`, raised and pushed 2026-10-20, open).

## 15. Acceptance: how we know it is built right

- The three steps of §4a play on the wall, the presenter's window and Study Mode in order, each arriving at its first frame
  and holding at its end, with the values of §8: meter 0.00 · 4.03 · 3.33; gauge 4.033 · 3.326 V; clamp 20.6 mA · ≈ 2 nA;
  *above its rail by 0.73 V*; rail chips 29.4 / 20.6 / 50 mA and 50.0 / 0 / 50 mA; the run log's two rows.
- Every value is computed by the one node solver (memory `input-drives-every-output`): in Explore, S1 and S2's states give
  §8's rows (the FAULT 1.663 V, meter 1.66, *not guaranteed*); changing `params` (the diode constants, R1, the divider, the
  MCU draw) recomputes every chip, the gauge, the meter and the log; with the Studio envelope constants (I_S 25 nA, n 3.017,
  R_S 0) the direct state gives 4.33 V and 14.3 mA (the check that the model is the one named).
- The meter is DINKIT's `dmm` unchanged, on its 20 V range, its last digit wandering inside ±(0.5 % + 3); its 10 MΩ is in the
  solve (4.0326 V with and without it; 3.3259 against 3.3281 V for the divider).
- Every part at the one scale (the breadboard 330 × 218 px, the module 128 × 56 px, 2.54 mm = 10.16 px); the schematic
  labelled *not to scale*. No product name, logo or part number on the stage (N1); silkscreen only as in §3c.
- IEC symbols by default; the Symbols switch redraws the schematic at every step; EN | FR swaps every word of §3c without a
  reload, numbers and silkscreen unchanged.
- B1 one change per press; B2 only S1, the marker, the meter's digits and the chips change; B3 s0 still and labelled, S1
  at *OPEN* (P2), meter 0.00; B4 three stills and the log; B5 each `say` on the strip and read in Scope; B6 the paired cue at s1 and s2; B7 one
  mover at a time; B8 nothing flashes (the FAULT's toggling below 1 Hz); B9 the poe before s0, the reveal at s1–s2; B10 the
  explain; B11 Explore after s2; B12 the wall's switches not operable; B13 no Flow on the stage; B14 values beside their
  elements; B15 bench and schematic met before anything switches; B16 every state readable as numbers; B17 the log keeps
  both states; B20 the next step and the tip on the strip.
- A6: the labels of §8 on the stage or its legend card.
- C2 legible from the back row at 1920 × 1080 and 1024 × 768, both languages; C3 every step whole under reduced motion; C4
  greyscale and the three colour-vision simulations; C5 → ← R and Tab/Space for the switches; C6 walked at 320, 768, 1200,
  1440, 1920; C7 < 100 ms from a press to the first frame on the lecture laptop; C8 the print form.
- E1–E6 for the built library; the six gates reported by the Benches lane with the library and its stills (EN and FR).
- **Six gates (this spec)**: (1) realism: a real bench at one stated scale (breadboard, the course's MCU board, an unbranded
  5 V module, the course's handheld), the clamp diode where it really is (inside the chip, by the magnifier and the outline),
  the rail with the MCU's own draw; nothing branded ✓; (2) science: the clamp's forward conduction above the rail, a regulator
  that only sources, the divider; the diode model named and labelled, and Studio's envelope profile shown to be the wrong
  model for typical behaviour (F1) ✓; (3) maths: every number solved in Node to the digits shown (4.0326 V, 20.58 mA,
  3.3259 V, 1.94 nA, 1.6630 V, 29.4 mA, 19.9 and 15.1 mW), the meter's rounding on its 20 V range stated ✓; (4)
  visualization: the meter alone says "4.03, a HIGH"; the gauge's rail line, the *above its rail* chip and the diode's
  current show the harm in the same moment (cause and effect lit together) ✓; (5) consistency: one library, one palette, one
  meter and one gauge for cards 3, 5, 6, 8; the Look for, the explain, the FAULT and the U019 brief agree to the digit; the
  PLAN's Electronics wording named and kept, and no demo cue added (P7, decided) ✓; (6) design: one breadboard style (DINKIT),
  the crowded places named with their checks (§10), French drafted for every label; no departure from ExSight's design rules
  (every value ≤ 4 significant figures). No accuracy finding in the owner's text; nothing in it was edited.
