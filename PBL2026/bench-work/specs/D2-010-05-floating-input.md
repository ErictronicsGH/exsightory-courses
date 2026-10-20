```yaml
id: D2-010-05-floating-input
card: "What does a floating input read?"
module: notes/Day02/010-digital-interfaces/en.md
bench: Animation                  # D1, decided 2026-10-20: an Animation Bench demonstration built by the Benches lane on one crossing
library: "logic-io (the scene library designed in D2-010-03-level-shifting §3), loaded with params `config: floating-input` by this card's sequence `d2-010-floating-input`; asked of the Benches lane by the same crossing as cards 3, 6, 8 (draft: crossing-d2-010-logic-io.request.md)"
dimensions: 2D
stand_in: "none proposed (P6): the card plays from its words and its poe until the library lands; the PLAN's Electronics widget stays deferred"
optional_benches: [Electronics]   # the PLAN's SHOW (deferred: the Electronics Bench is in development)
real_thing: "a GPIO of the course's unbranded 3.3 V MCU board with nothing connected, on a 400-point breadboard; the course's handheld meter (10 MΩ) clipped on, then a 10 kΩ resistor to 3.3 V, then to ground; the input's thresholds 0.25 and 0.75 of V_DD; drawn beside its IEC 60617 schematic"
minutes: 1.7                      # on the bench (§2)
card_minutes: 2.7                 # the whole card, the poe's answer window included (§2)
status: spec-draft                # D1, F2, N2 applied; **F6 (accuracy) open**; proposals P1–P7 open
learner_action: poe
predictions: [s0-meet]            # the poe is asked over s0 (the Flow's p1), answered at s1
seeds: []
key_variable: "what holds the pin: nothing, the meter, the pull-up, the pull-down; and with it the pin's level against the input's thresholds"
time_scale: "none: steady DC states; s1's wander is illustrative, not timed (labelled)"
steps: 5                          # s0–s4; the FAULT in Explore (§9)
```

**Written 2026-10-20 (U019)** after the owner's choices on the U019 brief (*"apply all recommendations"*): **D1** (one
Animation Bench scene library for cards 3, 5, 6, 8, built by Benches on one crossing), **F2** (p3's wording), **N2** (no
demo numbers). The PLAN's Electronics widget stays **deferred**; the card still gets its demonstration. The library, its
layout, parts, colours, symbols, words and model are designed in **`D2-010-03-level-shifting` §3** (cited below as *§3 of
card 3*); this spec adds only the `floating-input` configuration. The U019 brief's card-5 drawing (`draw5()`, `lvl5()`) is the
approved model.

## 1. What the room must understand

- **Statement** (verbatim): *A floating input is undefined, not low. An input pin must be pulled to a known level.*
- **SHOW** (verbatim from the PLAN): *Electronics — a logic input (the pin node) with nothing driving it and a DMM on it; then
  R1 10 kΩ to 3.3 V as a pull-up; then R1 moved to ground as a pull-down.* The PLAN names the Electronics Bench (written before
  D1); the target is the Animation Bench (D1). The Flow's p0 cue still names the Electronics Bench (P5).
- **Drive** (verbatim): *floating → pull-up → pull-down.*
- **Look for** (verbatim): *the floating node has no source at all; the DMM reads 0 V on it only because the meter's own input
  resistance is the one thing connecting it to anything (Day 1's insertion error). Swap the meter profile and it still reads
  0 V: the meter is the pull-down.* (The second sentence is **F6**, §14.)
- **Status** (verbatim): *needs Electronics: logic-input part (V_IL/V_IH bands, leakage, an "undefined" state for a node with
  no DC path) · today the DMM-only version runs on existing parts.* The `logic-io` gauge (§3 of card 3) carries the bands, the
  leakage and the *not guaranteed* state in the Animation library.
- **Decided by the owner, 2026-10-20** (applied here): **D1**; **F2** p3 *"With nothing connected, nothing holds the pin at any
  level: it may sit between a guaranteed low and a guaranteed high, or drift to either, and it can change while you watch."*;
  **N2** p0 *"[[demo]] Electronics Bench — …"* without its old number.
- **Insight**: *an input with nothing connected has no defined voltage; whatever touches it (leakage, a finger, the meter)
  decides it, so a meter's steady 0 V is the meter's, not the pin's; a pull-up or a pull-down gives the pin a source and a
  level.*
- **Kind of knowledge**: *a contrast between states* (nothing, the meter, the pull-up, the pull-down) on the same pin. Card
  test → **Animation**, as D1 decided. B15 applies (the pin, the gauge and the meter met in s0 before anything is attached);
  B17 applies (the run log keeps the four states side by side); B18, B19 do not.
- **Why this bench, not a still**: the point is that the floating pin's level is *not a value*: it sits, drifts and changes.
  A still can only draw one level, which is the misconception. The room must see the marker wander through the *not
  guaranteed* band, then see the meter clip on and the wander stop at 0.00, and understand the meter did that.
- **Key variable**: what holds the pin.

## 2. Time

The card's Flow, counted from en.md on 2026-10-20 (words ÷ 130 wpm; cue tags not counted; the em dash counted as the
caller's count does): **217 words**, of which p0 (11) is a stage direction; **206 spoken = 1.58 min**.

| # | Paragraph (first words) | Words |
|---|---|---|
| p0 | *"[[demo]] Electronics Bench — a logic input with nothing connected to it."* (stage direction) | 11 |
| p1 | *"[[ask]] Nothing is driving this pin. What level does it read…"* | 15 |
| p2 | *"[[pause]]"* (the poe's answer window) | — |
| p3 | *"[[reveal]] It reads neither, reliably. With nothing connected…"* | 36 |
| p4 | *"A CMOS input draws almost no current…"* | 35 |
| p5 | *"Here is the trap. Put a multimeter on that pin…"* | 50 |
| p6 | *"[[demo]] Now add a pull-up resistor to 3.3 V…"* (8 + 7 + 16) | 31 |
| p7 | *"So: a floating input is undefined, not low…"* | 39 |

| Beat | Minutes | Source of the number |
|---|---|---|
| s0 on the stage from p0's cue; p1, the question (15) | 0.12 | 15 ÷ 130 |
| The poe's answer window and tally (p2), the bench held at s0 | 1.00 | the course's estimate for a four-option poe |
| p3 (36) at s1: the marker appears and wanders | 0.28 | 36 ÷ 130 |
| s1's arrival, not covered by speech | 0.03 | estimate, ≈ 2 s |
| p4 (35) over s1 held (the wander continues) | 0.27 | 35 ÷ 130 |
| p5 (50): s2 at *"Put a multimeter on that pin"* | 0.38 | 50 ÷ 130 |
| s2's motion (the clip moving to the pin, the wander settling), not covered | 0.05 | estimate, ≈ 3 s |
| p6 (31): s3 at its first sentence, s4 at *"Move the resistor to ground"* | 0.24 | 31 ÷ 130 |
| s3, s4 motions, not covered | 0.06 | estimate, 2 × ≈ 2 s |
| p7 (39) over s4 held | 0.30 | 39 ÷ 130 |
| **On the bench** (s0 to the end of p7, the answer window excluded) | **1.7** | 1.73 |
| **Card total** | **2.7** | 2.73 |

**Module check**: see `D2-010-07-choosing-the-pull-up.md` §2b (2,643 words, 20.3 min of Flow; ≈ 31.6 of 30 min, D5, reported).

## 3. The scene: `logic-io`, `config: floating-input`

Layout, scale (1 mm = 4 px), colours, symbols, the meter, the gauge, the run log and the shared words: **§3 of card 3**.
What this configuration puts on the breadboard:

| id | Part | Value, and its source | Drawn as (bench · schematic) |
|---|---|---|---|
| `mcu-board`, `rail`, `pin`, `in-buf`, `d-up`, `d-down` | as in §3c of card 3 | V_IL 0.825 V, V_IH 2.475 V; leakage **0.4 nA** from V_DD into the pin (a model value, inside the datasheet's ≤ 50 nA, §8); input capacitance with the wiring **5 pF** (a model value: a few pF of pin and a few of breadboard row) | as card 3; the GPIO's breadboard row otherwise empty |
| `r4` | **R1 10 kΩ** (labelled as the PLAN names it), 1 % metal film, 0.25 W, axial | E24 | on the breadboard, one lead in the pin's row, the other on S3's common · IEC resistor *R1 10 kΩ* |
| `s3` | **Slide switch UP · OFF · DOWN** (SP3T): R1's free end to the + rail (3.3 V), open, or the − rail (ground) | the bench's own control (memory `controls-built-into-the-hardware`): the real gesture is moving R1's lead from one rail to the other; a switch keeps it one press | slide switch · IEC three-position switch *S3* |
| `dmm` | The course's handheld (§3c of card 3), 20 V range, 10 MΩ | its **red clip is the meter's control**: *parked* (on its lead, off the board) or *on the pin's row*; black clip on GND throughout | the meter, its clip moving · IEC voltmeter with its 10 MΩ to ground, drawn faint while parked |
| `sw1` | **Push button** (6 × 6 mm tactile, breadboard pins), pin to ground | Explore only: the FAULT (§9) | the button · IEC push-button (make) contact *SW1* |

**Meet the parts** (s0, B3), cued as p0 appears: *GPIO — a 3.3 V MCU's input, nothing connected* · *the input reads — LOW below
0.825 V, HIGH above 2.475 V, not guaranteed between* · *R1 10 kΩ — on S3, off for now* · *meter — parked*.

**Values beside their element** (B14, B16):

| Chip | Where | Values through the run |
|---|---|---|
| The gauge's marker and its value | beside the gauge | s0 none (*?*); s1 none: *no defined value*; s2 *4 mV*; s3 *3.297 V*; s4 *0 V* |
| The meter's LCD | on the meter | parked: blank (s0, s1); **0.00** (s2); **3.30** (s3); **0.00** (s4) |
| *the input reads* | under the gauge | *?* · *not guaranteed: HIGH or LOW* · LOW · HIGH · LOW |
| *what holds the pin* | beside the pin | *?* · *nothing* · *the meter's 10 MΩ: it is the pull-down* · *R1 to 3.3 V: a pull-up* · *R1 to ground: a pull-down* |

**The run log**: *what holds the pin · the meter · reads*. Rows: *nothing · (parked) · not guaranteed*; *the meter's 10 MΩ ·
0.00 V · LOW*; *pull-up 10 kΩ · 3.30 V · HIGH*; *pull-down 10 kΩ · 0.00 V · LOW*.

**Words the room reads** (adds to card 3's table; French drafts mine, for the owner's review):

| en | fr |
|---|---|
| *what holds the pin* · nothing · *the meter's 10 MΩ: it is the pull-down* | *ce qui tient la broche* · rien · *les 10 MΩ du multimètre : c'est lui le tirage vers le bas* |
| pull-up · pull-down · parked | résistance de tirage vers le haut · vers le bas · rangé |
| *no defined value* | *aucune valeur définie* |
| *Illustrative: nothing holds the pin, so it may sit, drift to either rail, or change* | *Illustratif : rien ne tient la broche ; elle peut rester, dériver vers un rail, ou changer* |
| *Leakage: a model value (0.4 nA, within the datasheet's 50 nA)* | *Fuite : valeur de modèle (0.4 nA, sous les 50 nA de la fiche technique)* |

**Key framings**: *Whole* (Home) · *Gauge* (the pin, the gauge and *what holds the pin*, for s1) · *Bench* (the meter's clip
and S3, for s2–s4).

## 4. The run: step by step, as the Flow goes

### 4a. Steps

| # | id | Flow paragraph | What changes (the `say`) | Overlay for the room | Presenter's control |
|---|---|---|---|---|---|
| 0 | `s0-meet` | on the stage from p0's cue; the poe asked at p1 *"Nothing is driving this pin. What level does it read: high, low, or something else?"*, held through p2 | Meet the pin: a 3.3 V MCU's input with nothing connected, its thresholds on the gauge, a 10 kΩ resistor switched off, the meter parked. What does it read? | *nothing connected · reads ?* | (on the stage with the card) |
| 1 | `s1-floating` | p3 *"[[reveal]] It reads neither, reliably. With nothing connected, nothing holds the pin at any level…"*; held under p4 | Nothing holds the pin: its level sits, drifts and changes, in and out of the band where the input is not guaranteed to read either level. | *nothing holds it · not guaranteed* | Next (the presenter's press on *[[reveal]]*) |
| 2 | `s2-meter` | p5 *"Put a multimeter on that pin and it reads 0 V, quite steadily."*; held through p5 | The meter's clip goes on the pin: its 10 MΩ is now the pin's only path, the level settles at a few millivolts, and the meter reads 0.00 V. The meter has become the pull-down. | *meter 10 MΩ = the pull-down · 0.00 V* | Next; framing *Bench* |
| 3 | `s3-pull-up` | p6 *"[[demo]] Now add a pull-up resistor to 3.3 V. The pin goes high and stays there."* | S3 connects R1 to 3.3 V: the pin is held at 3.30 V and reads HIGH. | *R1 10 kΩ to 3.3 V · 3.30 V · HIGH* | Next |
| 4 | `s4-pull-down` | p6 *"Move the resistor to ground as a pull-down, and the pin goes low and stays there."*; held under p7 | S3 moves R1 to ground: the pin is held at 0 V and reads LOW. Each state is in the log. | *R1 10 kΩ to ground · 0.00 V · LOW* | Next (the bench is done); framing *Whole* |

The PLAN's SHOW has *"a DMM on it"* from the start; the Flow puts the meter on at p5 (*"Put a multimeter on that pin"*). The
stops follow the Flow (memory `animation-follows-the-flow`): the meter is parked until s2, so s1 can show the pin floating,
which a clipped-on meter would prevent (**P2**).

### 4b. Motion, cues and stills per step

| # | Motion | Movers | Cue and its second channel (B6) | Hold | Under reduced motion (C3) | Still (B4) |
|---|---|---|---|---|---|---|
| 0 | none (arrives whole; the gauge has no marker, *?*) | 0 | each part highlighted as named in the meet line | hold | the same | the labelled pin, gauge, R1 off, meter parked |
| 1 | the marker appears on the gauge and **wanders** slowly (illustrative, below 0.2 Hz in its fastest component): it sits, crosses the *not guaranteed* band, nears a rail, comes back; *the input reads* shows *not guaranteed: HIGH or LOW*; no value chip | 1 | the gauge's three bands and *what holds the pin: nothing* highlighted (C38); the label *Illustrative…* arrives with the marker | **loop** (the wander continues while held, from the bench's clock, so a replay is identical) | the marker drawn as a shaded range from 0 to 3.3 V, labelled *no defined value* | the gauge with the shaded range, *not guaranteed* |
| 2 | the meter's red clip travels from its parked place to the pin's row (`move`, `normal`); linked, the wander stops and the marker settles at 4 mV, the meter's LCD shows 0.00 | 1 (one linked motion) | paired cue (C41): the clip, the meter's 10 MΩ on the schematic and the marker lit together; *what holds the pin: the meter's 10 MΩ: it is the pull-down*; **no current is drawn** (0.4 nA; memory `signal-cues-only-when-needed`) | hold | the clip on, the marker at 4 mV, 0.00 | 0.00 V, LOW; log rows 1–2 |
| 3 | S3's lever to *UP* (`quick`); linked, the marker climbs to 3.297 V, the meter reads 3.30 | 1 | paired cue: S3, R1 and the marker; if the bench draws current, 0.33 µA through R1 and the meter (too small to move: drawn as none) | hold | as above | 3.30, HIGH; log row 3 |
| 4 | S3's lever to *DOWN* (`quick`); linked, the marker falls to 0, the meter 0.00 | 1 | paired cue: S3, R1 and the marker; the log's four rows highlighted together at the end of p6 | hold | as above | 0.00, LOW; the full log |

## 5. Pacing and interaction, by surface and view

As **§5 of card 3**, with these controls: in View after s4 (Explore, C37), **S3** (*UP · OFF · DOWN*), **the meter's red
clip** (*parked · on the pin*) and **SW1** (press and hold), all on the hardware itself; every chip, the gauge, the meter
and the log follow. The library has no transport of its own.

- **Presenter's strip**: the next step's title and "what changes"; the teacher tip (§7d); → ← R.
- **Study Mode and Scope**: the five steps learner-paced; the poe answered before s1 (the reveal waits, B9); Explore after s4,
  with the FAULT (§9).
- **Phone**: as card 3; the gauge on top (it carries this card), the bench below.
- **Locked**: the clip, S3 and SW1 during the guided pass in Study and Scope.

## 6. The frame

As **§6 of card 3**; Parts' *Selected item*: *GPIO* with its level (*no defined value* at s1), or *Meter* with **0.00 V**.
Explore: S3, the clip, SW1. Identity bar: *What does a floating input read? · Holding · step n of 5*. Legend card adds
*Illustrative: nothing holds the pin…* and *Leakage: a model value…*.

## 7. Thinking, not watching

- **7a. The PLAN's ASK** (verbatim): *poe (before the statement) — "Nothing is driving this pin. What level does it read?"
  options: LOW, 0 V | HIGH | Undefined: it can read either, and change | Exactly half the supply answer: Undefined: it can read
  either, and change reveal: the logic-input part shows the undefined band; the pull-up, then the pull-down, settle it
  explain: A CMOS input draws almost no current, so with no source connected nothing sets its voltage; leakage, stray charge, a
  finger nearby, or the meter you connect, decide it instead. depth: understand practice: constructing explanations.* It
  fires at **p1, over s0** (the Flow's *[[ask]]*); its answer window is p2; **s1 is its reveal** (the gauge's band and the
  wander), s3–s4 the PLAN's *"the pull-up, then the pull-down, settle it"*.
- **7b. Prediction points on the bench**: the poe at s0 (above). **Proposal P4** (Study and Scope only): at s2, *"The meter
  goes on the floating pin. What will it read?"* (0 V · 3.3 V · it will wander · half the supply); not on the wall.
- **7c. After the reveal**: the explain. In Study, done = the poe answered and the five steps seen.
- **7d. Teacher tip** (**Proposal**, P4): *Learners trust the meter's 0.00 V as "the pin is low". Ask: before the meter was
  clipped on, what connected the pin to ground?*
- **7e. Explore** (C37, after s4): S3, the clip, SW1; the log fills as they are tried.

## 8. Faithfulness (the quality bar)

**The model** (recomputed in Node, 2026-10-20, `nums.mjs` in the session scratchpad). The pin's node: leakage I_L = 0.4 nA
from V_DD into the pin; R_m = 10 MΩ (meter, when clipped on); R1 = 10 kΩ to 3.3 V or to ground (S3), or open.

| State | Pin level | Meter (20 V range) | Reads |
|---|---|---|---|
| floating, meter parked | **no DC path: undefined** (with the model's leakage it would charge the pin's 5 pF toward V_DD at 0.4 nA / 5 pF = **80 V/s**, reaching the rail in ≈ 40 ms; real pins also take charge, coupling and a finger's field) | — | not guaranteed |
| floating, meter on | I_L · R_m = 0.4 nA × 10 MΩ = **4.0 mV** (≤ 50 nA × 10 MΩ = **0.50 V** at the datasheet's maximum) | **0.00** (0.50 at the maximum) | LOW in both (< 0.825 V) |
| pull-up 10 kΩ, meter on | 3.3 × 10 MΩ / (10 MΩ + 10 kΩ) + I_L · (10 kΩ ∥ 10 MΩ) = 3.29670 + 0.000004 = **3.2967 V** | **3.30** | HIGH |
| pull-down 10 kΩ, meter on | I_L · (10 kΩ ∥ 10 MΩ) = **4.0 µV** | **0.00** | LOW |

- **"It reads neither, reliably"** and p3 (F2, A5): a floating CMOS input has no DC path; its level is set by leakage (sign and
  size part-dependent: ≤ 50 nA either way at the datasheet's limits), stored charge and capacitive coupling. It can sit in the
  band, drift to a rail and stay (the FAULT's *"reads HIGH on the bench every time"*), or follow a nearby field. The stage
  draws a wander labelled **illustrative**: no single computed level would be honest.
- **"Put a multimeter on that pin and it reads 0 V, quite steadily"** (p5, A1, A3): 4 mV at the model's leakage, below the
  20 V range's 10 mV count → **0.00** ✓; at the guaranteed maximum leakage it would be 0.50 V (still LOW); real leakage at
  room temperature is typically far below the maximum. **"The meter has become the pull-down"** ✓: 10 MΩ is the node's only
  resistive path.
- **Thresholds and leakage** (A7): V_IL ≤ 0.25 · V_DD, V_IH ≥ 0.75 · V_DD, I_IH and I_IL ≤ 50 nA: Espressif ESP32 datasheet,
  *DC Characteristics (3.3 V, 25 °C)*, cited here only (N1). The 0.4 nA is a model value, labelled.
- **The pull-up's level** (A1): 3.297 V reads 3.30 on the 20 V range; the meter's 10 MΩ against R1's 10 kΩ costs 0.1 % (3.3 mV):
  *"high in, low out"* (S14) in miniature, below the meter's count.
- **Edge cases (A3).** *"Exactly half the supply"* (the poe's distractor): nothing in the model or the real pin sets 1.65 V ✓
  (a distractor). With R1 and no meter, the pin is 3.3 − 0.4 nA × 10 kΩ ≈ 3.300 V; the meter does not change the reading's
  digits.
- **Cross-references (A4).** D1·040's insertion error (*"Day 1's insertion error, in a digital costume"*, p5): D1·040 card 5
  loaded a divider with a 10 MΩ meter (4.762 V against 5 V); here the same 10 MΩ is the only load and sets the level: the
  same mechanism ✓. Card 6's released bus without a pull-up is *"exactly like the input we just met"* (card 6 p3): card 6's
  spec shows it with the same gauge and wander (`D2-010-06-open-drain` P2). The FAULT agrees with p3 (F2, decided).
- **The PLAN's Look for, second sentence** (A2, A6): **F6**, §14: *"Swap the meter profile and it still reads 0 V"* holds only
  for meters of about 10 MΩ; with Studio's own bench-meter profile (`dmm-bench.partprofile`: `r_in_v_mode` **10 GΩ** on ≤ 10 V
  DC) the same 0.4 nA gives 0.4 nA × 10 GΩ = **4 V**, above the rail: the leakage, not the meter, then sets the level (the pin
  clamps near its rail). The meter decides the reading in both cases, but the claim *"it still reads 0 V"* is false for a
  high-impedance meter.

**Section D, Animation rows**
- [x] Mechanism at every stop: a node with no DC path; a resistive load as the only path (Ohm's law); pull resistors.
- [x] Motion timing: none physical; s1's wander labelled illustrative.
- [x] Every stop matches its Flow clause (§4a); every value recomputed (above).
- [x] Simplifications labelled (A6): *Illustrative: nothing holds the pin…*; *Leakage: a model value…*; card 3's labels
  (*Thresholds…*, *Schematic not to scale…*).

**A1–A8**: A1 ✓; A2 ✓ (leakage, the meter's load, the FAULT; §9); A3 ✓ (the course's handheld, unbranded board); A4 ✓ (the
meter's 10 MΩ and 20 V range); A5 ✓ (no time shown; the wander labelled); A6 ✓; A7: **F6 open** (the Look for's swap
sentence); otherwise ✓; A8 ✓.

## 9. Faults and non-ideal behaviour

**PLAN FAULT** (verbatim): *A button input with its pull-up left off: reads HIGH on the bench every time, and at random in the
field.* On this library: Explore (Study, Scope, the labs and the wrap-up), not the wall's guided pass (the Flow does not speak
it): S3 *OFF*, the meter parked, SW1 present. **Released**: the marker drifts up and settles near the rail, *reads HIGH*
(the bench case, from the model's leakage toward V_DD); **pressed**: 0 V, LOW. The field case is named in words on the stage,
not simulated: *"in the field, a long wire picks up hum and interference: the same released button can read either"*
(**Proposal** P3: a 50 Hz-coupled wander in Study, labelled illustrative).

Non-ideal effects named (**Proposal**, P3, Study only): the leakage's sign and size vary by part and with temperature (≤ 50 nA
at the limits); MCUs offer internal pull-ups (tens of kΩ) that do the same job as R1 (a line in R1's Parts card).

## 10. Accessibility, legibility and print

As **§10 of card 3**. The gauge carries this card: its band words (*LOW*, *not guaranteed*, *HIGH*) at 32 pt; under reduced
motion s1 is a shaded range with *no defined value*, never a moving marker. Print: the five stills with their sentences and
the log.

## 11. Assets to make or source

| Asset | Format | Made by | Status |
|---|---|---|---|
| `floating-input` configuration of `logic-io` (R1, S3, the meter's clip as a control, SW1, the wander) | in the `logic-io` library | the Benches lane | to request by crossing (the same crossing as cards 3, 6, 8) |
| The card's sequence `d2-010-floating-input`: the five stops of §4a | sequence library | the Benches lane | with the above |

**Reuse first**: everything in `logic-io` (card 3's §11 list: DINKIT's breadboard, `dmm`, `axialResistor`, the course's
board); `bare-input` (D1·030 card 1: *"the pin floats and its code wanders"*) already draws a floating ADC pin's wander:
its wander's look and pace should be the same here (one picture of "floating" in the course). **Not used**: `arduino-uno`.

## 12. Bench capabilities this needs

As **§12 of card 3** (C1, C2, C5, C6, C10, C13, C15–C23, C30–C31, C35, C37, C38, C41, C44, C52, C60, C62, C64–C66, C72, C75; EN
| FR; the Symbols IEC | US switch, missing), and **C9 loop while held** for s1's wander (from the bench's clock, a replay
identical). Moving current: **none** on this card (0.4 nA and 0.33 µA are not drawn as flow; memory
`signal-cues-only-when-needed`).

## 13. Stand-in for the lecture

**Proposed (P6 a): none**: the card plays from its words and its poe. (b) Not recommended: a still cannot show a pin with no
value.

## 14. Findings for the owner

- **F6 — accuracy** (register **D2·010-F6**; card 5, PLAN Look for, second sentence: *"Swap the meter profile and
  it still reads 0 V: the meter is the pull-down."*). True for a meter of about 10 MΩ (every handheld's DC volts); false for a
  high-impedance meter: the Electronics Bench's own `dmm-bench` profile is 10 GΩ on ≤ 10 V DC, and a pin leaking 0.4 nA into
  10 GΩ would sit at 4 V, i.e. clamped near its rail, not at 0 V (at the datasheet's 50 nA, far more so). The sentence drives
  what a bench shows (it is not spoken; the Flow never swaps the meter). Options: **(a)** *"Swap in another 10 MΩ meter and it
  still reads 0 V: the meter is the pull-down."* (**recommended**: true, and keeps the PLAN's point); (b) turn it into the
  contrast: *"Swap the 10 MΩ handheld for a 10 GΩ bench meter and the reading moves: whatever you connect decides it."* (true,
  but the 10 GΩ reading is leakage-set and cannot be given as one number; Study only); (c) drop the sentence. Until decided,
  the library builds no meter swap; this finding is open and **blocks** the module (`course-accuracy.md` §2).
- **P1 — Proposal: the bench beside the schematic**, as card 3's P1 (one decision for the library).
- **P2 — Proposal: the meter parked until s2.** The PLAN's SHOW has the DMM on the pin from the start; the Flow clips it on at
  p5. Options: **(a)** follow the Flow: parked at s0–s1, clipped on at s2 (**recommended**: with the meter on, s1 could not
  show a floating pin, and p3's reveal would be contradicted by the stage); (b) on from the start, as the PLAN, s1 then reading
  0.00 V.
- **P3 — Proposal: the FAULT's field case and the non-ideal notes** (§9) in Study only. Take (**recommended**: the field case in
  words, the leakage and internal-pull-up notes in the Parts cards), add the 50 Hz wander, or neither?
- **P4 — Proposal: the teacher tip (§7d) and a Study-only prediction at s2.** Take both (**recommended**), the tip only, or
  neither?
- **P5 — Proposal: the Flow's demo cue.** p0 reads *"[[demo]] Electronics Bench — a logic input with nothing connected to
  it."*: a stage direction, never on the wall; the bench is now the Animation Bench (D1). Options: **(a)** *"[[demo]] Animation
  Bench — a logic input with nothing connected to it."* (**recommended**, as D1·090's P9 did); (b) keep.
- **P6 — Proposal: the stand-in.** **(a)** none (**recommended**); (b) a still (not recommended).
- **P7 — Reported (style, not accuracy): one phrase twice.** p3 ends *"…and it can change while you watch."* (F2's decided
  wording) and p4 ends *"…will decide it, and it can change while you watch."*: the same clause in consecutive paragraphs. Both
  are true. Options: (a) keep both; (b) the owner trims one (nothing is cut by me). No recommendation: it is the owner's voice.
- **Reported**: 2.7 min (1.7 on the bench); the module ≈ 31.6 of 30 min (D5; `D2-010-07` §2b). Nothing is cut.

Decided 2026-10-20 (owner: *"apply all recommendations"* on the U019 brief): D1 (an Animation Bench demonstration by Benches,
one scene library for cards 3, 5, 6, 8, one crossing), F2 (p3: *"With nothing connected, nothing holds the pin at any level:
it may sit between a guaranteed low and a guaranteed high, or drift to either, and it can change while you watch."*), N1 (no
product name), N2 (no demo numbers in the cues).

## 15. Acceptance: how we know it is built right

- The five steps of §4a play on the wall, the presenter's window and Study Mode in order, each arriving at its first frame and
  holding at its end (s1 looping its wander), with §8's values: meter blank · blank · 0.00 · 3.30 · 0.00; gauge *?* · *no
  defined value* · 4 mV · 3.297 V · 0 V; *reads* ? · not guaranteed · LOW · HIGH · LOW; the log's four rows.
- s0's first frame shows no level (memory `views-arrive-at-first-frame`): the poe's answer is not on the stage before s1.
- The levels are computed from the node (memory `input-drives-every-output`): in Explore, every S3 × clip × SW1 state gives its
  value; with `leakage` set to 50 nA the clipped meter reads 0.50; the wander is driven by the bench's clock (a replay
  identical) and appears only when the node has no DC path.
- No meter swap is built until F6 is decided.
- B1 one change per press; B2 only the clip, S3 and the marker change; B3 s0 still; B4 five stills and the log; B5 each `say`;
  B6 the paired cue at s2–s4; B7 one mover; B8 nothing flashes (the wander's fastest component below 0.2 Hz); B9 the poe
  before the reveal; B10 the explain; B11 Explore after s4; B12 the wall's controls not operable; B13 no Flow on the stage; B14
  values beside their elements; B15 the pin, gauge and meter met before anything is attached; B16 every state as numbers (s1:
  *no defined value*); B17 the log; B20 the strip.
- C2–C8 as card 3's §15; E1–E6; the six gates reported by Benches with the stills (EN and FR).
- **Six gates (this spec)**: (1) realism: the course's board and handheld at one scale, R1 moved between the rails by a switch
  on the board, the meter's clip as the meter's control ✓; (2) science: a node with no DC path drawn as having no value
  (illustrative wander, labelled), the meter as the only path, leakage within the datasheet's limit; F6 found (a high-impedance
  meter does not read 0 V) ✓; (3) maths: 4.0 mV, 0.50 V at the limit, 3.2967 V, 4.0 µV, 80 V/s recomputed; the meter's rounding
  on its 20 V range stated ✓; (4) visualization: the wander stops the moment the meter clips on, which is the trap made
  visible; the gauge's bands carry *undefined, not low* ✓; (5) consistency: card 3's library, gauge, meter and palette; card 6's
  floating bus the same wander; D1·040's 10 MΩ and D1·030's floating pin agree; the PLAN's meter-from-start and the Flow's
  meter-at-p5 named (P2), not changed ✓; (6) design: as card 3; no departure from ExSight's rules. **One accuracy finding (F6)
  open in the owner's text; nothing in it was edited.**
