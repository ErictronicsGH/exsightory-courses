```yaml
id: D1-090-04-vdd-reference
card: "VDD: the default, and usually the worst"
module: notes/Day01/090-reference/en.md
bench: Animation                  # D2, decided 2026-10-20: an Animation Bench demonstration built by the Benches lane on a crossing
library: "vdd-reference: a 2D scene library (the board and its IEC schematic, linked; the live code and the firmware's reading; a run log), played by a sequence for this card; asked of the Benches lane by crossing (draft: crossing-d1-090-04.request.md)"
dimensions: 2D
stand_in: "Plot (`rail-sag-code`: the code for the fixed 1.65 V against the load current, 50 mΩ and 99.1 mΩ, markers at 10 and 200 mA), P6; the Electronics Bench widget the PLAN names stays deferred"
optional_benches: [Electronics]   # the PLAN's SHOW (deferred: the Electronics Bench is in development)
real_thing: "a small 3.3 V MCU board, our own unbranded design: a 5 V input, a 1117-class 3.3 V LDO in SOT-223, a 12-bit MCU whose ADC is referenced to its own supply pin, a precision reference IC (REF20xx class) holding the ADC's input at 1.65 V, a load switch, and a jumper that routes the rail directly or through 50 mm of 0.5 mm, 1 oz copper track; drawn beside its IEC 60617 schematic"
minutes: 1.8                      # on the bench, s0 held under p1–p2 included (§2)
card_minutes: 3.7                 # the whole card, the poll included (§2)
status: spec-ready                # D2, D3, F1, F2, N2 and round two (P1–P9) decided
learner_action: poll
predictions: []                   # none in the PLAN; card 3's poe already asked this card's question (P8 proposes one for Study only)
seeds: []
key_variable: "the reference (the rail at the MCU's pin) moving under the load while the input stays at 1.65 V, and the code following it"
time_scale: "none: steady DC states, one per step; the rail's microsecond transient after a load step is not shown (labelled, §8)"
steps: 6                          # s0–s5
```

**Written 2026-10-20 (U018)** after the owner's choices on the U018 brief (*"apply all recommendations"*): D2 (this card's
demonstration is an Animation Bench library built by Benches on a crossing), D3 (the trace is 50 mm long), F1 (the 50 mΩ
is the rail's source resistance, not the bench supply's), F2 (the poll's explain adds the clipping case), N2 (no chip
name on a teaching surface). The PLAN's Electronics Bench widget stays **deferred** (memory
`electronics-bench-in-development`); the card still gets its demonstration. The Flow quoted here is en.md as edited with
those decisions. The U018 brief's card-4 schematic (`bench-work/previews/u018-preview.html`, `draw4()`) previewed the
numbers; this spec is what the Benches lane builds from.

## 1. What the room must understand

- **Statement** (verbatim): *Using the supply as the reference is convenient, and the supply is usually the noisiest,
  least accurate voltage on the board to measure against.*
- **SHOW** (verbatim from the PLAN): *Electronics — a 3.3 V rail that feeds the MCU's own load and references the ADC,
  with a fixed 1.65 V input from a separate reference; reveal the rail's source resistance (50 mΩ: the regulator and its
  wiring, as the MCU's pin sees them), then output_drift.*
  The PLAN names the Electronics Bench (written before D2); that widget is deferred, and the target is the Animation
  Bench (D2). The Flow's demo cue still names the Electronics Bench (P9).
- **Drive** (verbatim): *load from 10 mA to 200 mA; add a PCB trace (trace-cu-0r5mm) in the rail and repeat.*
- **Look for** (verbatim): *the rail drooping 10 mV and the fixed input's code climbing about 6 counts; more with the
  trace.*
- **Status** (verbatim): *needs Electronics: ADC-input block with a selectable reference (VDD / internal / external), a
  stepped load (a switch) and a precision-reference source part.*
- **Decided by the owner, 2026-10-20** (applied here, not re-asked): **D2** the Animation demonstration by Benches; **D3**
  the trace is `trace-cu-0r5mm`, 0.5 mm wide, 1 oz (35 µm) copper, **50 mm long**, 49.1 mΩ at 20 °C; **F1** the 50 mΩ is
  the rail's source resistance (*"the regulator and its wiring, as the MCU's pin sees them"*), so the course's bench supply
  (sw3005, ≈ 2.7 mΩ) is **not** drawn as the 50 mΩ: the scene draws an on-board regulator, unbranded, with its wiring;
  **F2** the poll's explain adds *"on a part near 1.0 V the top of the signal reaches full scale"*; **N2** *"A common 8-bit
  MCU…"*, no chip named on the teaching surface (the ATmega328P datasheet is cited in §8 as a source only).
- **Bench and library.** The **bench** is the Animation Bench (M62, the Benches lane's, served from
  `C:\ExSightory\src\exsight-benches\benches\animation\`). The **library** is a new scene library, `vdd-reference` (one
  board and its schematic, linked, with the live code), played by a short sequence for this card (memories
  `scene-libraries-and-assemblies`, `one-block-at-a-time`). It is built to be reused: card 5's on-circuit ratiometric
  version (the PLAN's *"needs Electronics: ADC-input block referenced to the same supply"*) can load the same scene with the
  thermistor divider in place of the 1.65 V reference (§12, a `params` choice; not built for this card).
- **Insight**: *the ADC's reference is whatever voltage reaches the MCU's pin; when the board draws current, that voltage
  sags through the rail's resistance, and the code for an input that never moved climbs with it.*
- **Kind of knowledge**: *a contrast between two states* (load low and high, without and with the trace) on *a picture
  built up* (the board and its schematic). Card test → **Animation**, as D2 decided: the cause (a switch on the board) and
  the effect (the code) must change together in front of the room. B15 applies (the board and the schematic met in s0
  before anything is switched); B17 applies (the board, the schematic and the readouts visible together, one state; the run
  log keeps the earlier states beside the current one); B18 and B19 do not (2D; no hand skill).
- **Why this bench, not a still**: the point is cause and effect. The room must see a switch on the board flip and, in the
  same moment, the drop across R_s grow, the rail at the pin fall and the code climb, with the input's 1.65 V standing still
  beside them; a still shows two numbers with no cause. Card 3's Equation already showed the arithmetic (V_ref slid from
  3.30 to 3.20 V); this card shows the circuit that makes the reference slide.
- **Key variable**: the rail at the MCU's pin, which is the reference.

## 2. Time

The card's Flow, counted from en.md on 2026-10-20 (words ÷ 130 wpm; `[[ask]]`, `[[pause]]` and `[[demo]]` tags not
counted): **338 words**, of which p0 (17) is a stage direction, not spoken; **321 spoken words = 2.47 min**.

| # | Paragraph (first words) | Words |
|---|---|---|
| p0 | *"[[demo]] Animation Bench: the supply rail with load steps…"* (stage direction; P9 applied) | 17 |
| p1 | *"Most MCU projects use the supply rail as the ADC's reference…"* | 27 |
| p2 | *"It is also usually the worst voltage on the board to measure against…"* | 47 |
| p3 | *"On the bench: a 3.3 V rail that feeds the MCU's own load…"* (two sentences, 27 + 29) | 56 |
| p4 | *"The rail drops about 10 mV, and the code for the fixed input climbs by about 6…"* (17 + 20 + 5) | 42 |
| p5 | *"Most MCUs offer alternatives…"* | 36 |
| p6 | *"[[ask]] An 8-bit MCU on 5 V reads a 0 to 1 V signal…"* | 29 |
| p7 | *"[[pause]]"* | — |
| p8 | *"There is no single answer…"* | 84 |

| Beat | Minutes | Source of the number |
|---|---|---|
| s0 appears at the card's start (p0 cue) and holds while p1 and p2 are spoken | 0.57 | 74 ÷ 130 |
| p3 sentence 1, *"On the bench: a 3.3 V rail…"* (27), over s0: each part's label cued as it is named | 0.21 | 27 ÷ 130 |
| p3 sentence 2, *"Switch on the rail's source resistance, 50 mΩ…"* (29), s1 at its first clause, s2 at *"and step the load…"* | 0.22 | 29 ÷ 130 |
| s1, s2: R_s appearing and the load switch moving, values landing, not covered by speech | 0.07 | estimate, 2 × ≈ 2 s |
| p4 sentence 1, *"The rail drops about 10 mV…"* (17), over s2 held | 0.13 | 17 ÷ 130 |
| p4 sentence 2, *"Put a thin PCB trace in the rail and do it again…"* (20): s3 at its first clause, s4 at *"and do it again"* | 0.15 | 20 ÷ 130 |
| s3, s4: the jumper moving, the load switch moving twice, values landing, not covered by speech | 0.10 | estimate, 2 × ≈ 3 s |
| p4 sentence 3, *"Nothing changed at the input."* (5): s5 | 0.04 | 5 ÷ 130 |
| p5 *"Most MCUs offer alternatives…"* (36), over s5 held | 0.28 | 36 ÷ 130 |
| **On the bench** (p0 to the end of p5) | **1.8** | 1.77 |
| The poll: p6, the question (29) | 0.22 | 29 ÷ 130 |
| The poll's answer window on Scope and the tally (p7) | 1.00 | estimate: a three-option poll with no single answer; the PLAN gives no timer |
| p8, the explain (84) | 0.65 | 84 ÷ 130 |
| **Card total** / **on the bench** | **3.7 / 1.8** | 3.64 / 1.77 |

The long Flow paragraphs (p1–p2, p5, p8) fall on held states (B13). p3 and p4 each drive two steps inside one sentence; the
presenter pauses a beat at the comma (≈ 2–3 s, counted above) so each step lands before the next clause. The U018 brief put
this card at ≈ 4.7 min with a 1.5-min allowance per activity; counted here it is 3.7 (the Flow grew from 306 to 338 words
with F1, F2 and N2).

**Module check**: `targetMinutes: 30`; the module's Flow is now **1,058 words (8.1 min)** (cards 118, 93, 141, 338, 262,
106; the brief counted 1,041 before the decided edits). The brief put the module at ≈ 20 of 30 min; this card's share is
3.7 min. The module's time table is kept in one place, the centrepiece spec (card 5), when U018 writes it.

## 3. The scene: what is on the bench

**Layout** (stage 1920 × 1080; memory `one-scale-per-scene`): the **board** on the left at one stated scale, **1 mm =
10 px** (a 70 × 45 mm board is 700 × 450 px), drawn as a top view; its **IEC schematic** on the right (a schematic, not to
scale, and labelled as such), the values beside its elements; the **run log** under both. Selecting a part on one
highlights the same part on the other (C62, linked representations). The board's look follows the accepted D1·010
`ldr-chain` boards (their solder mask, silkscreen and copper inks) so the course keeps one board style.

**The board** (our own design, unbranded; memory `real-but-unbranded`). Part ids are shared by the board and the schematic.

| id | Part | Value, and its source | Drawn as (board · schematic) |
|---|---|---|---|
| `board` | Two-layer FR-4 board, 1.6 mm, 70 × 45 mm, solder mask and white silkscreen, ground pour on the bottom | our design | top view at 1 mm = 10 px · — |
| `pwr-in` | 5 V input, 2-pin header (2.54 mm pitch), silkscreen *5V GND* | context: feeds the regulator and the reference; nothing on this card changes it | header · a terminal pair *5 V in* |
| `ldo` | 3.3 V regulator, SOT-223 (body 6.5 × 3.5 mm), its 10 µF input and output capacitors (0805); no marking | 3.300 V nominal; initial tolerance ±1 % at 25 °C, wider over load, line and temperature; ±1.5 to ±2 % for many of the class's second sources (1117-class LDO, §8); 5 V − 3.3 V = 1.7 V of headroom over the class's ≈ 1.2 V dropout | package and capacitors · IEC voltage source (circle, its line along the wire) *3.3 V* |
| `rs` | **The rail's source resistance**, R_s | **50 mΩ** (F1, decided): *the regulator and its wiring, as the MCU's pin sees them*, lumped; nothing on the board is drawn as "the 50 mΩ" (P5) | — · IEC resistor (rectangle) *R_s 50 mΩ*, between `ldo` and the rail; hidden until s1 |
| `jumper` | Rail jumper, 3-pin header with a shunt, silkscreen *DIRECT · TRACE* | the board's own control (memory `controls-built-into-the-hardware`); the shunt's two contacts carry the rail in both positions, so their resistance is part of the lumped 50 mΩ, not of the trace | header and shunt · IEC change-over switch *S2* |
| `direct` | The direct path: a short copper pour from the jumper to the MCU | ≈ 0 (a pour of ≈ 5 × 3 mm, well under 1 mΩ), modelled 0 | pour · wire |
| `trace` | **`trace-cu-0r5mm`**: 0.5 mm wide, 35 µm (1 oz) copper, **50.0 mm** long along its centre line, a meander of five 9 mm legs | **49.1 mΩ** at 20 °C: ρ_Cu 1.72 × 10⁻⁸ Ω·m ÷ (0.5 mm × 35 µm) = **0.983 mΩ per mm** × 50 mm (§8; D3) | the meander drawn at its true length, 5 px wide · IEC resistor *trace 49.1 mΩ* |
| `rail` | The rail node at the MCU's supply pin (VDD, VDDA): **the ADC's reference** | 3.3 V − I·(R_s + R_trace) | — · node dot, *V_DD = V_REF* |
| `mcu` | 12-bit MCU, LQFP-48 (7 × 7 mm body, 0.5 mm pitch); no marking | the course's converter: 12 bits, reference = its own supply pin, truncating (`course-accuracy.md` §3) | package · *MCU* box holding *ADC, 12 bits* with *V_REF* tied to `rail` and *IN* from `vref` |
| `load` | **The MCU's load**, set by the board's **LOAD** slide switch (silkscreen *LOAD 10 mA · 200 mA*) | **10 mA** or **200 mA**, drawn as a constant current (P4) | slide switch beside the MCU · IEC current source (circle, its line across the wire) with its direction arrow and *10 mA* / *200 mA* |
| `vref` | Precision reference IC, SOT-23-5, powered from `pwr-in` (5 V), its half-voltage output to the ADC input; no marking | **1.650 V**, held: a REF20xx-class dual-output reference (V_REF 3.3 V, V_BIAS = V_REF/2 = 1.65 V; ±0.05 % initial, 8 ppm/°C max, §8); its own error is not this card's and is held at 1.6500 V | package and its 1 µF capacitor · IEC voltage source *1.65 V, separate reference* |
| `gnd` | Ground | ideal (labelled, §8) | pour · IEC earth |

**Meet the parts** (s0, B3), one line each, cued as p3's first sentence names them: *regulator — makes the 3.3 V rail* ·
*rail — powers the MCU, and is its ADC's reference* · *MCU — its own load draws current from the rail* · *separate
reference — holds the ADC's input at 1.65 V* · *LOAD and DIRECT · TRACE — the board's two switches* · *code — what the
ADC reports; the firmware multiplies it by 3.3 / 4096*.

**Values beside their element** (B14, B16; C20), mono, with units:

| Chip | Where | Format | Values through the run |
|---|---|---|---|
| Drop across R_s | beside `rs` | mV, 2 decimals below 1 mV, 1 above | 0.50 mV · 10.0 mV |
| Drop across the trace | beside `trace` (schematic) and along the meander (board) | the same | 0.49 mV · 9.83 mV |
| Load | beside `load` | mA, integer | 10 mA · 200 mA |
| Rail at the pin (V_REF) | beside `rail` | V, **4 decimals** (P7) | 3.3000 · 3.2995 · 3.2900 · 3.2990 · 3.2802 V |
| Input | beside `vref` and *IN* | V, 4 decimals | 1.6500 V, every step |
| **Code** | in the ADC box, large | integer | 2048 · 2054 · 2060 |
| Firmware's reading | under the MCU: `code × 3.3 / 4096 =` | V, 4 decimals (what `printf("%.4f")` prints) | 1.6500 · 1.6548 · 1.6597 V |

**The run log** (the library's own, under the stage; B4, B17): one row per settled state, added as it lands and kept:
*rail path · load · rail at the pin · code · change from 10 mA*. Rows: *direct · 10 mA · 3.2995 V · 2048 · —*;
*direct · 200 mA · 3.2900 V · 2054 · +6*; *trace · 10 mA · 3.2990 V · 2048 · —*; *trace · 200 mA · 3.2802 V · 2060 ·
+12*. The input column is not repeated: the log's header carries *input 1.6500 V throughout*.

**Labels** (B14): nothing moves except the two switches' levers and the jumper's shunt, which are on stills by the time
they are read; leaders are allowed on the board (D6.3); the schematic's labels sit on their elements.

**Symbols**: IEC 60617 by default (resistor a rectangle, voltage source a circle with its line along the wire, current
source a circle with its line across, change-over switch, IEC earth); the bench's **Symbols IEC | US** switch redraws the
schematic in the US set (zigzag, circle with + and −, circle with an arrow) (memory `iec-symbols-us-switch`). The board is
the board in both.

**Colours and their second channel** (C4), annotation palette roles, not hex:

| Thing | Colour role | Second channel |
|---|---|---|
| The rail and the reference it is (`rail`, *V_REF*) | rose (as the brief) | the label *V_DD = V_REF*, the rail drawn thicker |
| R_s and its drop | rose, outlined | the label *R_s* and its value |
| The trace and its drop | copper ink | the meander's shape, the label *trace* |
| The input (`vref`, *IN*) | azure | solid line, the label *1.65 V* |
| The load and the LOAD switch | amber | the arrow, the value in mA |
| The code | contrast ink | large mono digits |

**Words the room reads** (every visible word as `{en, fr}` in the library's data; French drafts mine, for the owner's
review; numbers, units and silkscreen markings never translated; memory `languages-follow-the-parent-app`):

| en | fr |
|---|---|
| 3.3 V regulator · rail · MCU · separate reference · load | régulateur 3.3 V · rail · MCU · référence séparée · charge |
| *V_DD = V_REF: the rail is the ADC's reference* | *V_DD = V_REF : le rail est la référence du CAN* |
| *R_s 50 mΩ: the regulator and its wiring, as the MCU's pin sees them* | *R_s 50 mΩ : le régulateur et son câblage, vus de la broche du MCU* |
| *trace 0.5 mm × 50 mm, 35 µm copper: 49.1 mΩ* | *piste 0.5 mm × 50 mm, cuivre 35 µm : 49.1 mΩ* |
| rail at the pin · input · code · the firmware reads | rail à la broche · entrée · code · le firmware lit |
| change from 10 mA · input 1.6500 V throughout | écart depuis 10 mA · entrée 1.6500 V tout du long |
| *Ideal rail: source resistance off* | *Rail idéal : résistance de source désactivée* |
| *Lumped: a model value; boards differ* | *Regroupée : valeur de modèle ; chaque carte diffère* |
| *Steady states only: the rail's transient after a load step (microseconds) is not shown* | *Régimes établis seulement : le transitoire du rail après un échelon de charge (quelques microsecondes) n'est pas montré* |
| *Load drawn as a constant current* | *Charge représentée comme un courant constant* |
| *Ground drawn ideal: the returns' own drops are D2·090's* | *Masse idéale : les chutes dans les retours sont pour D2·090* |
| *Ideal converter: 12 bits, truncating, no noise* | *Convertisseur idéal : 12 bits, tronqué, sans bruit* |
| *Schematic not to scale; board 1 mm = 10 px* | *Schéma sans échelle ; carte 1 mm = 10 px* |

Silkscreen stays as printed (*5V GND*, *LOAD 10 mA · 200 mA*, *DIRECT · TRACE*).

**Key framings** (2D): *Whole* (Home: board, schematic and log) · *Schematic* (the schematic and its chips, for s1–s2) ·
*Board* (the jumper and the meander, for s3).

## 4. The run: step by step, as the Flow goes

### 4a. Steps

| # | id | Flow paragraph | What changes (the `say`) | Overlay for the room | Presenter's control |
|---|---|---|---|---|---|
| 0 | `s0-meet` | appears at p0's cue; held under p1, p2; labels cued under p3 sentence 1 *"On the bench: a 3.3 V rail that feeds the MCU's own load and references the ADC, and a fixed 1.65 V input from a separate reference."* | Meet the board: a 3.3 V regulator makes the rail, the rail powers the MCU and is its ADC's reference, and a separate reference holds the input at 1.65 V. With an ideal rail the code is 2048, half of 4096. | *rail = reference · input 1.65 V · code 2048* | (on the stage with the card) |
| 1 | `s1-source-resistance` | p3 *"Switch on the rail's source resistance, 50 mΩ: the regulator and its wiring, as the MCU's pin sees them,"* | The rail's source resistance appears, 50 mΩ: at 10 mA it drops 0.5 mV, the rail at the pin is 3.2995 V, and the code is still 2048. | *R_s 50 mΩ · 10 mA → 0.50 mV · code 2048* | Next; framing *Schematic* |
| 2 | `s2-load-step` | p3 *"…and step the load from 10 mA to 200 mA."*, then p4 *"The rail drops about 10 mV, and the code for the fixed input climbs by about 6."* | The LOAD switch steps the MCU's load from 10 to 200 mA: R_s now drops 10.0 mV, the rail at the pin falls 9.5 mV to 3.2900 V, and the code for the same 1.65 V climbs from 2048 to 2054. | *10 → 200 mA · rail −9.5 mV · code 2048 → 2054* | Next (the step moves the switch) |
| 3 | `s3-trace-in` | p4 *"Put a thin PCB trace in the rail"* | Back at 10 mA, the jumper routes the rail through 50 mm of 0.5 mm track, 49.1 mΩ: the rail at the pin is 3.2990 V and the code is 2048. | *+ trace 49.1 mΩ · 10 mA · code 2048* | Next; framing *Board* |
| 4 | `s4-trace-load-step` | p4 *"…and do it again: the drop grows, and so does the error."* | The load steps again: through 99.1 mΩ the rail falls 18.8 mV to 3.2802 V, and the code climbs 12, to 2060; the firmware reports 1.6597 V. | *10 → 200 mA · rail −18.8 mV · code 2048 → 2060* | Next; framing *Whole* |
| 5 | `s5-input-unchanged` | p4 *"Nothing changed at the input."*; held under p5 | Nothing changed at the input, 1.65 V throughout: the reference moved, 9.5 mV and then 18.8 mV, and the code followed it, +6 and then +12. | *input unchanged · +6 · +12* | Next (the bench is done; the poll card follows) |

### 4b. Motion, cues and stills per step

| # | Motion | Movers | Cue and its second channel (B6) | Hold | Under reduced motion it lands as (C3) | Still (B4) |
|---|---|---|---|---|---|---|
| 0 | none (appears whole at its first frame, memory `views-arrive-at-first-frame`) | 0 | each part highlighted (C38) as p3 sentence 1 names it, its label arriving | hold | the same, whole | the labelled board and schematic, ideal rail, code 2048 |
| 1 | R_s fades in on the schematic (`appear`, `normal`); its drop chip and the rail chip update with it | 1 | R_s highlighted; paired cue (C41): R_s and the rail chip lit together | hold | R_s present, chips at their values | R_s 50 mΩ, 0.50 mV, 3.2995 V, 2048; log row 1 |
| 2 | the LOAD lever slides to *200 mA* (`move`, `quick`); then, linked, the load's arrow thickens, the drop and rail chips and the code take their new values (`normal`) | 1 (one linked motion) | paired cue (C41): the switch, R_s's drop, the rail and the code lit together, cause to effect; if the bench draws moving current (§12), the rail's current from `ldo` through R_s to `load` and back, ×20, none into *IN* or *V_REF* | hold | the lever at 200 mA, the new values, the log row | 200 mA, 10.0 mV, 3.2900 V, 2054 (+6); log row 2 |
| 3 | (a) the LOAD lever back to *10 mA* (`quick`); (b) the jumper's shunt lifts and re-seats on *TRACE* (`move`, `normal`); (c) a path trace runs once along the meander, regulator to MCU (C40) | 1 at a time (a, b, c in order) | the shunt and the meander highlighted; the trace chip arrives on the schematic as the meander lights | hold | the shunt on TRACE, the meander and its chip, the values | trace in, 10 mA, 3.2990 V, 2048; log row 3 |
| 4 | the LOAD lever to *200 mA* (`quick`); linked, the chips and the code take their new values (`normal`) | 1 | as s2, the trace's drop lit with R_s's | hold | as s2 | 200 mA, 10.0 + 9.83 mV, 3.2802 V, 2060 (+12), 1.6597 V; log row 4 |
| 5 | none | 0 | the input chip (1.6500 V) and the log's two changes (+6, +12) highlighted together (C38) | hold | the same | the log, the two changes and the unchanged input |

No time scale is shown (A5): every step is a steady DC state, and the label *"Steady states only…"* (§3) says what is
left out. Nothing flashes (B8); nothing loops.

## 5. Pacing and interaction, by surface and view

**Who paces**: on the wall the presenter, one press per step; the wall draws the bench's transport flat (*step n of 6*,
holding) and the board's switches as state, not operable (B12). In Study Mode and Scope, the learner.

| View | Who | Controls (range, default, states) |
|---|---|---|
| Preview (in the slide) | everyone | Previous · Next · *step n of 6* · the step's title · *Open details* |
| View (details) | everyone | the bench's transport (Previous, Play, Replay, Reset, Next, then Speed and Autoplay); Symbols IEC \| US (IEC); EN \| FR (hidden when hosted); Stops tile; Parts tile; Cues tile; Ink. After s5 (Explore, C37): the board's **LOAD** switch (10 mA \| 200 mA) and **DIRECT · TRACE** jumper, operated on the board itself; every chip, the code and the log follow (memory `input-drives-every-output`) |
| Edit (session only) | everyone; a student's own copy | ink on the board and the schematic; a temporary note on a step |
| Authoring | authors | the six stops, their `say`, overlays, cue track, the library's `params` (R_s, the trace's length, the two load currents, the input), the `{en, fr}` words |

The library has no transport of its own; its only controls are the board's two switches (memories
`player-controls-are-the-bench`, `controls-built-into-the-hardware`).

- **Presenter's strip** (B20): the next step's title and "what changes"; the teacher tip (§7d); keys → / PageDown next,
  ← back, R replay.
- **Study Mode and Scope**: the same six steps, learner-paced; the stills strip; the numbers in the Stops panel; Explore
  opens after s5 (B11): the learner flips LOAD and the jumper and reads the code.
- **Phone** (C6): portrait, the schematic and the code on top (the board below it, its switches 44 px targets), then the
  step's title and sentence, the stills row, big Previous / Next; one finger does nothing on the stage, two pinch and pan.
- **Locked**: the board's switches during the guided pass (s0–s5) in Study and Scope; they open with Explore.

## 6. The frame

| Tile / panel | Used? | Selected item (one large value) | List / contents |
|---|---|---|---|
| Stops | yes | the current step's title and "what changes" | the six steps; *Stills* mode |
| Views | no (2D; the three framings from the stage's zoom buttons) | — | — |
| Parts | yes | the pinned part, e.g. *Rail at the pin* with **3.2900 V**, or *Code* with **2054** | the parts of §3 with their values |
| Section | no (2D) | — | — |
| Cues | yes | — | highlight and path trace on/off; legend: rail rose, input azure, load amber, trace copper |
| Compare | no (the run log carries the comparison) | — | — |
| Explore | yes, after s5 | — | LOAD and the jumper, on the board |
| Ink | yes | — | laser, ink |
| Ask | no on the bench (the poll is the card's own activity) | — | — |

Identity bar: *VDD: the default, and usually the worst · Holding · step n of 6*. Legend card: the four colours with their
second channels and the labels of §3 (*Lumped…*, *Steady states only…*, *Load drawn as a constant current*, *Ground drawn
ideal…*, *Ideal converter…*, *Schematic not to scale; board 1 mm = 10 px*).

## 7. Thinking, not watching

- **7a. The PLAN's ASK** (verbatim): *poll (after the SHOW) — "An 8-bit MCU on 5 V reads a 0–1 V signal. Which reference
  would you use: AVCC, the internal 1.1 V, or an external 2.5 V reference?" options: AVCC | internal 1.1 V | external
  2.5 V (no single answer: AVCC uses a fifth of the range and moves with the supply; the internal 1.1 V uses 91 % of it
  and is stable, but its datasheet value can sit anywhere from about 1.0 to 1.2 V, so it needs calibrating, and on a part
  near 1.0 V the top of the signal reaches full scale; an external 2.5 V is accurate and uses 40 %) depth: create
  practice: designing solutions.* It fires **after s5**, on its own card (EAC: an activity gets a card), at p6; p8 is the
  explain. The bench is not driven during it.
- **7b. Prediction points on the bench**: none in the PLAN. Card 3's poe has just asked this card's question (the rail
  sags, the input does not move: what does the code do?), and this card shows it happening on a circuit. **P8** proposes
  one for Study and Scope only (s4, *"With the trace, how far does the code climb now?"*); not on the wall.
- **7c. After the reveal**: the poll's explain (p8). In Study, done = the six steps seen and the poll answered.
- **7d. Teacher tip** (**Proposal**, P8): *Learners read the code's rise as the input rising, or expect "less supply, less
  reading". Ask: which voltage moved, the input or the ruler it is measured against?*
- **7e. Explore** (C37, after s5): the board's LOAD switch and jumper, four states, the log filling as they are tried. No
  other variable: the drift is not modelled (P3), the reference selector is not drawn (P2).

## 8. Faithfulness (the quality bar)

**The model** (`course-accuracy.md` §3): the course's converter, 12 bits, truncating, codes exact: code =
⌊V_IN / V_REF × 4096⌋, V_REF = the rail at the MCU's pin. The rail: V_REF = 3.3 V − I·R, R = R_s (50 mΩ) or R_s +
R_trace (99.14 mΩ), I the load current (constant). The input: 1.6500 V. Steady DC states; ground ideal.

**Arithmetic** (recomputed in Node, 2026-10-20):

| State | V_REF | 1.65 / V_REF × 4096 | Code | Firmware (× 3.3 / 4096) |
|---|---|---|---|---|
| ideal rail (s0) | 3.300000 V | 2048.000 | **2048** | 1.6500 V |
| R_s, 10 mA (s1) | 3.3 − 0.010 × 0.050 = **3.299500 V** | 2048.310 | **2048** | 1.6500 V |
| R_s, 200 mA (s2) | 3.3 − 0.200 × 0.050 = **3.290000 V** | 2054.225 | **2054** (+6) | 2054 × 3.3 / 4096 = **1.65483 → 1.6548 V** |
| R_s + trace, 10 mA (s3) | 3.3 − 0.010 × 0.099143 = **3.299009 V** | 2048.615 | **2048** | 1.6500 V |
| R_s + trace, 200 mA (s4) | 3.3 − 0.200 × 0.099143 = **3.280171 V** | 2060.380 | **2060** (+12) | 2060 × 3.3 / 4096 = **1.65967 → 1.6597 V** |

- The trace (D3): R = ρ·L / (w·t) = 1.72 × 10⁻⁸ × 0.050 / (0.5 × 10⁻³ × 35 × 10⁻⁶) = **0.049143 Ω**; per mm 0.98286 mΩ
  (shown *0.983 mΩ per mm*, *49.1 mΩ*). ρ_Cu at 20 °C, annealed copper (IEC 60028: 1.7241 × 10⁻⁸ Ω·m; 1.72 to three
  figures); 1 oz/ft² = 34.8 µm, taken as 35 µm (IPC-2221's 1 oz). R_s + R_trace = 99.143 mΩ (shown *99.1 mΩ*).
- Drops 10 → 200 mA: 0.190 A × 50 mΩ = **9.5 mV** (*"about 10 mV"* ✓; from no load it is 10.0 mV); with the trace
  0.190 × 99.143 mΩ = **18.84 mV**, shown 18.8 mV (the drop grows ✓, ×1.98). Code changes **+6** (*"about 6"* ✓) and
  **+12** (*"so does the error"* ✓).
- **Edge cases (A3).** The ideal state, 1.65 / 3.3 × 4096 = **2048.000, exactly on the 2047 | 2048 transition**: under the
  course's exact model the code is 2048, which is what cards 1 and 3 say (*"1.65 V gives 2048"*). The library must compute
  it exactly (integers, or ⌊x + 10⁻⁹⌋): in IEEE doubles 1.65 / 3.3 × 4096 happens to give 2048, but the same expression for
  card 3's 3.20 V gives 2111.9999… → 2111 instead of 2112 (noted for card 3's spec). The other four states sit 0.31, 0.23,
  0.62 and 0.38 LSB above their transitions; the rail would have to move 0.36 mV (2054) or 0.61 mV (2060) to change a code.
  The trace at 25 °C instead of 20 °C (copper +0.39 %/°C) is 50.1 mΩ: s4's code is still 2060 (2060.49). With ρ =
  1.7241 × 10⁻⁸ it is 49.26 mΩ: still 2060.
- **Cross-references (A4).** Card 3's FAULT, *"The firmware says 3.3 V while the regulator delivers 3.28 V: every reading
  about 0.6 % off"*: s4's rail is 3.2802 V and the firmware reads 1.6597 V for 1.6500 V, **+0.59 %** ✓. Card 3's reveal
  (3.30 → 3.20 V, 2048 → 2112) is the same law at a larger sag ✓. D2·090 sizes the same part, *"about 10 mm of 0.5 mm,
  1 oz track"* for ≈ 10 mΩ: 10 × 0.983 = 9.83 mΩ ✓ (one copper law across the course); its rating there, 1.3 A, leaves
  200 mA far inside (the trace dissipates 0.04 × 0.0491 = 2.0 mW).
- **The 50 mΩ (F1, decided).** The course's bench supply is not it: the sw3005 holds 0.1 % + 10 mV
  (`C:\ExSightory\src\exsight-benches\benches\breadboard\libraries\supplies\sw3005\component.json`, `loadRegulation`), (3.3
  + 10) mV ÷ 5 A ≈ **2.7 mΩ**, 0.53 mV at 200 mA, no code change. The 1117 class's own load regulation is at most 0.4 %
  over 10 mA–800 mA (National/TI LM1117 datasheet, SNOS412, front page): 13.2 mV ÷ 0.79 A ≈ **17 mΩ** at most; the rest of
  the 50 mΩ is the path to the pin (pours, vias, the jumper's contacts, a connector or filter), which varies board to
  board. Hence *lumped, a model value* on the stage (P5).
- **"An initial tolerance, often a percent or two"** (p2, A7): LM1117-3.3, ±1 % at 25 °C (3.267–3.333 V), widening over
  load, line and temperature (National/TI LM1117 datasheet SNOS412: *"output voltage accuracy to within ±1%"*); the many
  1117-class second sources state ±1.5 % to ±2 %. ✓. For scale (not on the stage): ±1 % moves the fixed input's code
  2027–2068, ±2 % 2007–2089.
- **"It drifts with temperature"** (p2, A7): true of the class. A typical value: one 1117-class 3.3 V second source
  specifies ΔV_OUT 30 mV over 20–120 °C at 10 mA (≈ 0.9 %, ≈ 90 ppm/°C), which would move the fixed input's code by about
  18. The PLAN's *output_drift* reveal is not in the Flow's bench paragraphs; P3 recommends leaving it off the stage, so no
  drift number reaches a learner from this library. If P3 (b) is chosen, the value is confirmed against a named datasheet
  first.
- **The fixed input**: REF20xx-class dual-output reference (TI REF20xx datasheet, SBOS600: V_BIAS = V_REF / 2, initial
  accuracy ±0.05 % max, 8 ppm/°C max, the two outputs tracking within 6–7 ppm/°C); powered from the 5 V input, above its
  dropout. Held at 1.6500 V on the stage: its own error is not this card's.
- **The poll** (§7a; A1, A7): a common 8-bit MCU's 10-bit converter. AVCC 5 V: 1 / 5 = **20 %** (*"a fifth"* ✓; the code at
  1 V: 204; LSB 4.88 mV). Internal 1.1 V nominal: 1 / 1.1 = **90.9 %** (*"91 %"* ✓; 930; 1.07 mV); over the datasheet's
  1.0 / 1.1 / 1.2 V (min / typ / max): **83.3 %–100 %**; at 1.0 V, 1.0 / 1.0 × 1024 = 1024 → **clamps at 1023** (*"on a
  part near 1.0 V the top of the signal reaches full scale"* ✓, F2). External 2.5 V: 1 / 2.5 = **40 %** ✓ (409; 2.44 mV).
  Source (cited here only, N2): Microchip ATmega328P datasheet, ADC characteristics: V_INT 1.0 / 1.1 / 1.2 V; AREF 1.0 V to
  AV_CC; AV_CC within V_CC ± 0.3 V. *"Accurate from the start"* for a good external 2.5 V: series references of the class
  give ±0.05 % to ±0.2 % initial (TI REF20xx ±0.05 %; REF30xx class ±0.2 %) ✓.

**Section D, Animation rows**
- [x] Mechanism checked at every stop: a source with internal resistance under load (Ohm's law, Thévenin); the ADC's ratio
  to its reference (card 1's law); copper resistance from ρ·L / A (IEC 60028; IPC-2221).
- [x] Motion timing: no physical time is shown; every step is a steady state, labelled (*"Steady states only…"*): the real
  rail recovers from a load step in microseconds (the LDO's loop and its output capacitor), which this card does not
  need.
- [x] Every stop matches its Flow clause (§4a); every value at a stop recomputed (above).
- [x] Simplifications labelled (A6), in the words of §3: *lumped, a model value*; *steady states only*; *load drawn as a
  constant current*; *ground drawn ideal*; *ideal converter: 12 bits, truncating, no noise*; *schematic not to scale; board
  1 mm = 10 px*; *ideal rail: source resistance off* (s0).
- n/a (3D).

**A1–A8**: A1 ✓ (every value sourced or computed above); A2 partly: the non-ideal effect of the card (source resistance,
the trace) is the point, the others are named in §9 and labelled; A3 ✓ (our own board, unbranded; class values; the
products are cited in this section only; one scale, stated); A4 ✓ (no instrument: the readouts are the model's and the
firmware's, labelled so; P7); A5 ✓ (no time shown, said); A6 ✓; A7 ✓ (card 3's FAULT and reveal, D2·090's trace agree; no
finding in card 4's text); A8 ✓.

## 9. Faults and non-ideal behaviour

**PLAN FAULT**: none on this card. The module's FAULT on card 3 (*"The firmware says 3.3 V while the regulator delivers
3.28 V"*) is what s4 produces (3.2802 V, +0.59 %), §8.

Non-ideal effects the real board shows (**Proposal**, P3 and §14: for Study or later cards, not the lecture):
1. **Initial tolerance**: a 1117-class 3.3 V regulator is ±1 % at 25 °C (±1.5 to ±2 % for many second sources): the fixed
   input's code anywhere from 2027 to 2068 at ±1 % (2007 to 2089 at ±2 %) before any load is applied.
2. **Drift with temperature**: tens of ppm/°C for the class (§8); p2 says it, the stage does not show it (P3).
3. **The load transient**: a load step makes the rail dip for microseconds before the regulator recovers; a conversion
   that samples in the dip reads higher still. Not shown (labelled).
4. **Ground drop**: the 200 mA returns through ground too; if the reference's ground and the MCU's ground part company,
   that drop adds to the error. Drawn ideal here; it is D2·090's subject.
5. **Converter noise**: a real 12-bit converter's last count or two wander (D1·080). The code here is exact (labelled).

## 10. Accessibility, legibility and print

- Wall: overlays and chips at 32 pt, 7:1; the code at ≥ 64 pt; the board's silkscreen is decoration at true scale (≈ 1 mm
  letters, 10 px) and is never the only place a word is read: the schematic and the chips carry every value. Check the
  rail chip's 4 decimals and the R_s / trace chips for collisions at 1920 × 1080 and 1024 × 768 (the schematic's rail run
  is the crowded place: R_s, the switch and the trace in a row).
- Reduced motion: every §4b row lands whole and reads from its still, overlay and sentence.
- Colour: the rail, input, load and trace differ by label, line weight and shape as well as hue (§3).
- Keyboard: → ← R from a clicker; in Explore, the two switches reachable by Tab, toggled by Space.
- Languages: every word of §3's table as `{en, fr}`; the longest labels (*Steady states only…*, the R_s label) wrap, never
  shrink.
- Print (C8): six stills, each with its sentence and values, and the full run log.

## 11. Assets to make or source

| Asset | Format | Made by | Status |
|---|---|---|---|
| The board's top view (70 × 45 mm at 1 mm = 10 px: SOT-223 LDO, LQFP-48 MCU, SOT-23-5 reference, 0805 capacitors, 2.54 mm headers, a slide switch, the 50 mm meander), unbranded | the Benches lane's 2D drawing (SVG or its kits) | the Benches lane, from §3; package outlines from JEDEC (SOT-223 TO-261AA, LQFP-48 MS-026, SOT-23-5 MO-178) | to make |
| The IEC schematic and its US set | the same | the Benches lane | to make |
| `vdd-reference` scene library: parts, the model of §8, the chips, the run log, the two switches, `params`, words `{en, fr}` | Animation Bench library in `C:\ExSightory\src\exsight-benches\benches\animation\libraries\vdd-reference\` | the Benches lane | to request by crossing (draft written, U018) |
| The card's sequence: the six stops of §4a with their `say`, overlays, cues | sequence library | the Benches lane | with the above |
| `rail-sag-code` Plot block (the stand-in, §13) | `plot` fence in en.md | the author (this project), if P6 (a) is chosen | to decide |

**Reuse first** (memory `reuse-done-scenes`), in `C:\ExSightory\src\exsight-benches\benches\animation\libraries\`:
`ldr-chain` (and `bare-input`, its sibling): the course's MCU board look and its *ADC & firmware* stage, which already
computes the 12-bit truncating code on 3.3 V (`chain.js`, `Math.floor(v / VCC * 4096)`) and draws the firmware's rows: use
its board style and its firmware rows, not a new design; `dinkit` / `svgkit` (the kits). **Not used**: `bench-supply`,
`supply-rheostat` and the Breadboard Bench's `sw3005` (F1: the supply is not the 50 mΩ, and the 5 V input is context
only); `arduino-uno` (a branded 5 V, 10-bit board, not the course's 12-bit 3.3 V MCU); `error-on-a-reference` (its DC
voltage reference is a bench instrument at 1 V; this card's 1.65 V comes from an IC on the board).

## 12. Bench capabilities this needs

**Animation Bench** (M62; as its capability list, `benches/animation/capabilities.md`, names them): C1 next and hold · C2
back · C5 stop list · C6 scrubber · C10 replay · C13 keys · C15 a stop restores its scene · C16 stills · C17 meet the parts ·
C18 "what changes" · C19 overlay · C20 values beside their element · C21 teacher tip · C23 print · C30–C31 select a part
and its card · C35 labels · C37 Explore (the board's switches) · C38 highlight · C40 path trace (the meander, s3) · C41
paired cue (switch, drop, rail, code) · C44 no flashing · C52 presenter strip · C60 wall profile · C62 linked
representations (the board and the schematic) · C64 reduced motion · C65 colour never alone · C66 phone · C72 stop
inspector · C75 checks · the EN | FR switch (exists, bench v21; hidden when hosted) · controls on the library's hardware
(exist: `ldr-chain`'s lamp and board controls) · **missing (request): the Symbols IEC | US switch** (no bench carries it
yet; memory `iec-symbols-us-switch`) · **to confirm with Benches: moving current** on a circuit drawn in an Animation
library: if the bench draws it (memory `circuit-effects-are-the-benchs`), the rail's current is shown from the regulator
through R_s (and the trace) to the load and back, its speed and brightness ×20 from s1 to s2, and **none** into the ADC's
*IN* or *V_REF* pins (high impedance: a steady level, not a flow; memory `signal-cues-only-when-needed`); if not, the
amber arrow and its mA value carry it and nothing is drawn by the library.

**Not this bench's**: the reference selector the PLAN's Status names (VDD / internal / external) is the Electronics
Bench's ADC-input block (X1, deferred) and the poll's subject; it is not drawn here (P2). Charge dots and glows are the
bench's, never the library's.

**The library is asked of the Benches lane by crossing** (draft: the session scratchpad's
`crossing-d1-090-04.request.md`; the caller takes the id and pushes it).

## 13. Stand-in for the lecture

The live run (10–12 Oct 2026) is past; the stand-in is for the published course until the library lands.

**Proposed (P6 a): a Plot block**, `rail-sag-code`, ready today (the Plot Bench has `floor` and sliders): the code for the
fixed 1.65 V against the load current I from 0 to 250 mA, two curves, *y = floor(1.65 / (3.3 − x·0.050) × 4096)* (rail
alone) and *y = floor(1.65 / (3.3 − x·0.09914) × 4096)* (with the trace), markers at 10 and 200 mA reading 2048 → 2054
and 2048 → 2060; y axis 2040–2070 codes. It keeps the *Look for* (the code climbing about 6, then 12) and the numbers; it
loses the circuit (the cause), the board's switches, the run log's states held side by side, B3, B6's paired cue and the
Symbols switch. The Flow needs no change: p3 and p4 describe a circuit the Plot does not draw, so the presenter says
*"Here are its numbers"* over it (an unscripted line, not a Flow edit). (b) No stand-in: the card plays from its words, as
D1·050's Electronics cards do. The Plot cannot be imported as the library's source; nothing is drawn twice either way.

## 14. Findings for the owner

No **accuracy** finding in card 4's text (A1–A7 run on 2026-10-20 against the current en.md, the decided edits included:
statement, PLAN, Flow p0–p8, the poll and its explain; §8). One cross-check for another card: card 3's 3.20 V reveal is
exactly on a transition (2112.000), and floating-point code gives 2111: card 3's spec should ask for exact arithmetic (§8;
not a fault in the owner's text). D1·040-F1 (the bench supply's 50 mΩ on D1·040 card 1) stays open in `ACCURACY.md` for the
D1·010–060 sweep; this card no longer depends on it.

New proposals (each a question; nothing here is pre-decided):

- **P1 — Proposal: the board beside the schematic.** The brief previewed the schematic alone. This spec draws the board too
  (a top view at one scale, our own design), linked to the schematic, because the two controls the owner's rule puts *on
  the hardware* (LOAD, the trace jumper) and the trace itself (a real 50 mm meander, 0.5 mm wide) are seen on a board, and
  gate 1 asks for the real object. Options: **(a)** board + schematic, linked (**recommended**); (b) the schematic alone,
  the two controls as IEC switches on it, the trace as a resistor.
- **P2 — Proposal: no reference selector on this card.** The PLAN's Status asks for an ADC block with a selectable
  reference (VDD / internal / external); p5 talks about another chip (an 8-bit MCU) and the poll asks the question.
  Options: **(a)** not drawn; the scene's `params` leave room for a later card (**recommended**: the poll is the card's
  activity, and our 12-bit MCU's own internal references would be a fourth set of numbers); (b) an Explore-only jumper
  *V_REF: RAIL · EXT* on the board, the reference IC's 3.3 V output as the external reference: the code stays at 2048 at any
  load.
- **P3 — Proposal: output_drift.** The PLAN's SHOW ends *"then output_drift"*; the Flow's bench paragraphs (p3–p4) never
  use it (p2 says *"It drifts with temperature"* before the bench is driven). Options: **(a)** leave drift off the stage
  (**recommended**: no stop, no control, nothing unspoken drawn; p2's sentence is true and sourced, §8); (b) a line in the
  regulator's Parts card in Study, *"drifts with temperature: tens of ppm/°C, typical of the class"*, its number confirmed
  against a named datasheet first; (c) an Explore control for the board's temperature (no real board carries one: not
  recommended).
- **P4 — Proposal: what LOAD is.** The Flow says *"the MCU's own load"* and *"step the load from 10 mA to 200 mA"*; p2 names
  a radio, a motor and an LED as examples. Options: **(a)** a slide switch on the board marked *LOAD 10 mA · 200 mA*, the
  MCU's draw drawn as one constant current, labelled *"Load drawn as a constant current"* (**recommended**: the Flow's own
  words); (b) the switch makes the MCU's radio transmit (200 mA): more concrete, but D1·050 card 6 gives a Wi-Fi burst as
  ≈ 300 mA (crossing 495), and two radios with two currents would need saying.
- **P5 — Proposal: the 50 mΩ, lumped and labelled.** The regulator class contributes at most ≈ 17 mΩ (§8); the rest is the
  path to the pin and varies by board. Options: **(a)** one R_s on the schematic, *"the regulator and its wiring, as the
  MCU's pin sees them"* (the Flow's words), with the label *"Lumped: a model value; boards differ"*, and nothing on the
  board drawn as "the 50 mΩ" (**recommended**); (b) split it into the regulator (≈ 15 mΩ) and named wiring elements, each
  sourced: more to check, nothing more learned on this card.
- **P6 — Proposal: the stand-in.** Options: **(a)** the Plot block `rail-sag-code` of §13 (**recommended**: ready today,
  it carries the *Look for* and the numbers); (b) none, the card plays from its words.
- **P7 — Proposal: the rail's readout to 0.1 mV (5 significant figures).** ExSight's design rules ask for ≤ 4 significant
  figures (D6.14). The card's effect is 0.5 to 19 mV on 3.3 V: at 4 figures, s1's 3.2995 V would round to 3.300 V (a
  half-way case) and hide the step. Options: **(a)** four decimals on the rail and the firmware's reading, the drop chips
  in mV beside R_s and the trace (**recommended**; the firmware's four decimals are what its `printf` prints); (b) three
  decimals on the rail, the drop chips carrying the millivolts. (a) is a departure from D6.14 and is named in the crossing.
- **P8 — Proposal: the teacher tip (§7d) and a Study-only prediction at s4**, *"With the trace, how far does the code climb
  now?"* (about 6 · about 12 · about 24; answer about 12); the wall skips it (no wall minutes). Take both
  (**recommended**), the tip only, or neither?
- **P9 — Proposal: the Flow's demo cue.** p0 reads *"[[demo]] Electronics Bench: the supply rail with load steps…"*: a
  stage direction on the teleprompter, never on the wall, so the room hears nothing false; but the bench is now the
  Animation Bench (D2). Options: **(a)** *"[[demo]] Animation Bench: the supply rail with load steps, and the reading of a
  fixed input following it."* (**recommended**, as D1·080's N1 did); (b) keep.
- **Reported**: the card counts 3.7 min (the brief's estimate was ≈ 4.7); the module is ≈ 20 of 30 min (§2). Nothing is cut.

Decided 2026-10-20 (owner: *"apply all recommendations"* on the U018 brief): D2, D3, F1, F2, N2 as above.

**Decided 2026-10-20, round two** (owner: *"apply all recommendations"* on the U018 page's *specs* section): P1 (a) board and schematic, linked; P2 (a) no reference selector; P3 (a) output_drift off the stage; P4 (a) a slide switch, constant current; P5 (a) one lumped 50 mΩ labelled *"a model value; boards differ"*; P6 (a) the Plot stand-in `rail-sag-code`; P7 (a) four decimals on the rail and the firmware's reading (the departure from D6.14 named in the crossing); P8 taken; P9 (a) applied to `en.md`: p0 *"[[demo]] Animation Bench: the supply rail with load steps, and the reading of a fixed input following it."* The demonstration is asked of Benches by crossing.

## 15. Acceptance: how we know it is built right

- The six steps of §4a play on the wall, the presenter's window and Study Mode in order, each arriving at its first frame
  and holding at its end, with the values of §8 exactly: rail 3.3000, 3.2995, 3.2900, 3.2990, 3.2802 V; codes 2048, 2048,
  2054, 2048, 2060; firmware 1.6500, 1.6548, 1.6597 V; drops 0.50 / 10.0 mV (R_s), 0.49 / 9.83 mV (trace); the run log's
  four rows, +6 and +12.
- The code is computed, never typed (memory `input-drives-every-output`): in Explore, each of the four switch states gives
  its row of §8, and the ideal state gives **2048**, not 2047 (exact arithmetic, §8 A3). Changing `params` (R_s, the
  trace's length, the loads) recomputes every chip, the code and the log.
- The trace is drawn 50.0 mm along its centre line (500 px at 1 mm = 10 px) and 0.5 mm (5 px) wide; every part on the board
  at the one scale; the schematic labelled *not to scale*.
- No sw3005, no product name, logo or part number anywhere on the stage (F1, N2); silkscreen only as in §3.
- IEC symbols by default; the Symbols switch redraws the schematic (IEC ↔ US) at every step; EN | FR swaps every word of
  §3's table without a reload, numbers and silkscreen unchanged.
- B1 one change per press; B2 only the switches, the shunt and the values change; B3 s0 still and labelled; B4 six stills
  and the run log; B5 each `say` on the strip and read in Scope; B6 the paired cue at s2 and s4 and the path trace at s3;
  B7 one mover at a time; B8 nothing flashes; B9 none on the wall (card 3's poe precedes; P8 in Study); B10 the poll and its
  explain; B11 Explore after s5; B12 the wall's switches not operable; B13 no Flow on the stage; B14 values beside their
  elements; B15 board and schematic met before anything switches; B16 every state readable as numbers; B17 the log keeps the
  states side by side; B20 the next step and the tip on the strip.
- A6: the seven labels of §8 on the stage or its legend card.
- C2 legible from the back row at 1920 × 1080 and 1024 × 768, both languages; C3 every step whole under reduced motion; C4
  greyscale and the three colour-vision simulations; C5 → ← R and Tab/Space for the switches; C6 walked at 320, 768, 1200,
  1440, 1920; C7 < 100 ms from a press to the first frame on the lecture laptop; C8 the print form.
- E1–E6 for the built library; the six gates reported by the Benches lane with the library and its stills (EN and FR).
- The stand-in (§13, if P6 (a)) checked on the lecture laptop, both themes, its markers reading 2054 and 2060.
- **Six gates (this spec)**: (1) realism: our own board at one stated scale (1 mm = 10 px) with real packages, a real
  50 mm meander and the two controls on it; class values sourced (1117-class LDO, REF20xx-class reference, the course's
  converter); the sw3005 not drawn as the 50 mΩ (F1); nothing branded on the stage ✓; (2) science: a source with internal
  resistance, the converter's ratio law, copper's ρ·L/A; every model assumption labelled on the stage (lumped R_s, steady
  states, constant-current load, ideal ground, ideal converter); the 50 mΩ's plausibility shown against the class's ≤ 17 mΩ
  and called a model value ✓; (3) maths: every number recomputed in Node to the figures shown (§8), the 2048.000 edge and
  the margins of the other codes stated, card 3's 2112 float trap found and reported ✓; (4) visualization: the cause (a
  switch on the board) and the effect (the code) lit together, the input's 1.65 V standing still beside them, the run log
  holding +6 against +12 ✓; (5) consistency: card 3's FAULT (3.28 V, 0.6 %) and reveal, card 1's 2048, D2·090's 0.983 mΩ/mm,
  the U018 brief's numbers all agree; the PLAN's Electronics wording and the Flow's demo cue named (P9), not changed ✓;
  (6) design: one departure from ExSight's rules named for the owner (P7, four decimals), the crowded rail run named with
  its check (§10); French drafted for every label. No accuracy finding in the owner's text; nothing in it was edited.
