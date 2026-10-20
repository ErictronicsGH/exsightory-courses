```yaml
id: D1-010-01-confidently-wrong
card: "The number is confidently wrong"
module: notes/Day01/010-mcu-reads-2047/en.md
bench: Electronics                # target: the circuit with an ADC-input block (not built: §12)
library: "cold-open: an Electronics circuit library (`cold-open.benchcircuit`: sensor output, divider, ADC-input block on CH0 with CH1 grounded, code readout, truth pane) and its firmware as a Coding Bench library (`cold-open.c`)"
dimensions: 2D
stand_in: "Draw: `cold-open.benchdrawing`, three steps, numbers computed here (§13 option 1, recommended)"
optional_benches: [Coding]        # the PLAN's ideal: the three lines of firmware run against the circuit
real_thing: "a 12-bit MCU SAR ADC input behind a 100 kΩ / 100 kΩ divider; R_on 1 kΩ and C_s 10 pF are teaching values in the class real MCUs give (STM32F103: R_ADC ≤ 1 kΩ, C_ADC 5–8 pF)"
minutes: 2.2                      # on the bench: the bench is up for the whole card (§2)
card_minutes: 2.2
status: spec-ready                # findings decided 2026-10-08; proposals F5–F7 open
learner_action: poe
predictions: [s1-ask]             # the PLAN's poe, with the bench visible and its truth hidden
seeds: [S31]                      # planted in the Flow's p3 (harvested in D1·070)
key_variable: "the code beside the truth: 2047 against ≈ 2225 for the pin's 1.793 V"
time_scale: "none (nothing moves on this card)"
steps: 4                          # s0–s3
```

The first spec on the Electronics Bench in this project. It copies the reference spec's shape
(`D1-010-03-eye-to-brain.md`) and fills the quality bar's *Electronics* and *Coding* rows. Every number is
recomputed in §8 (Python, 2026-10-08); the meter profile is read from InsightDemo's baseline library
(`libraries/baseline/profiles/dmm-budget.partprofile`).

## 1. What the room must understand

- **Statement** (verbatim): *A sensor, a divider, an ADC pin and three lines of firmware report a
  reading. The code runs, the number appears, and it is wrong by 8 %.*
- **SHOW** (verbatim from the PLAN): *(centrepiece) Electronics — the cold-open circuit (Demo #1): a
  sensor output of 3.585 V into two 100 kΩ resistors, the midpoint wired to an MCU ADC pin (12-bit, Vref
  3.3 V; R_on 1 kΩ, C_s 10 pF; the previous channel at 0 V; acquisition window ≈ 1.29 µs, about 2.5 time
  constants). Beside it, the three lines of firmware as {font=mono} paragraphs (no code block survives on
  the wall): raw = adc_read(CH0); v = raw \* 3.3 / 4096; printf("%d %.3f\n", raw, v); The code readout
  shows 2047 and the console prints "2047 1.649": two confident numbers, both wrong. The
  reading-against-truth pane is hidden. Note: the converter truncates (as D1·080's SAR does). The truth
  pane shows the ideal for the pin, ≈ 2225 (2224.9); a fully settled reading would be 2224. (Owner,
  2026-10-08.)* The printf line and the Note were changed on the owner's word (F1, F3).
- **Drive** (verbatim): *show the circuit and the code → take the ASK → switch on the truth pane at the
  pin.*
- **Look for** (verbatim): *2047 beside 2225 (1.79 V, what the pin's voltage should give), and nothing
  anywhere on the screen flagging a problem.*
- **Status** (verbatim): *needs Electronics: ADC-input block (switch R_on, sampling capacitor,
  acquisition window, code readout, truth pane) · needs Coding Bench: the three-line firmware run against
  it. Today: Draw stands in (`cold-open.benchdrawing`: the circuit, the readout, then the truth pane, with
  the numbers computed in the spec). The budget DMM cannot stand in: on this 100 kΩ divider its 10 MΩ
  input reads only 0.5 % low. (Owner, 2026-10-08.) Spec: bench-work/specs/D1-010-01-confidently-wrong.md.*
  (The *Today* sentence was changed on the owner's word, F2.)
- **Bench and library.** The **bench** is the Electronics Bench: the sheet, the solve, the views, the
  probes, the dock. The **library** is this card's circuit, `cold-open.benchcircuit`, with its firmware
  `cold-open.c` loaded into the Coding Bench. The same circuit library returns in D1·070, where its FAULT
  is played (§9) and S31 is harvested.
- **Insight**: *a converter reports a confident, plausible number even when it is 8 % wrong, and nothing
  in the code or on the screen can tell you so; only knowing what the pin should give exposes it.*
- **Kind of knowledge**: *a contrast between two states* (the reported code against the truth). Card
  test → a bench that shows a circuit and its numbers: **Electronics**, not Animation (nothing moves
  through stages here). **B17 applies**: the two numbers side by side at the reveal. B15 applies lightly
  (circuit and firmware are two subsystems, both met in s0). B18 and B19 do not (2D; no hand skill).
- **Why this bench, not a still**: the room must see a *real circuit* produce the number, with values a
  learner could check (3.585 V halved is 1.79 V), and then see the bench's own solve contradict the code.
  On the target bench the truth is computed, not written in, which is what makes the cold open honest.
- **Key variable**: the code beside the truth.

## 2. Time

The card's Flow is 99 words, all spoken: **0.76 min** at 130 wpm.

| Beat | Minutes | Source of the number |
|---|---|---|
| s0 appears with the card; the presenter names the parts (unscripted, ≈ 35 words: *"A sensor gives 3.585 volts. Two 100 k resistors halve it into a 12-bit ADC pin, 3.3-volt reference. Three lines of firmware read it and print it. It prints 2047."*) | 0.27 | estimate, 35 ÷ 130 |
| s1 the ASK: Flow p0 *"[[ask]] Here is the circuit…"* (16 words) | 0.12 | 16 ÷ 130 |
| poe answer window and the confidence question (1 to 5), then the tally read aloud (≈ 20 words) | 1.15 | estimate: 45 s to choose, 15 s for confidence, 9 s for the tally; the PLAN gives no timer |
| s2 the truth pane: Flow p2 *"[[reveal]] Let me switch on the truth…"* (34) | 0.26 | 34 ÷ 130 |
| s3 nothing flagged: Flow p3 *"The code ran…"* (27, SEED S31 inside it) | 0.21 | 27 ÷ 130 |
| s3 held: Flow p4 *"That is the whole course in one picture…"* (22) | 0.17 | 22 ÷ 130 |
| **Card total / of which on the bench** | **2.2 / 2.2** | the bench is up throughout |

No Flow paragraph is spoken over motion (nothing moves). The `[[pause]]` is the answer window.

**Module check, card by card** (U010's measure; D1·010 `targetMinutes: 15`). The module's Flow is 1,714
words, of which 31 are stage directions (card 3's `[[demo]]` line, 23; card 5's table note, 8):
**1,683 spoken = 12.9 min**.

| Card | Flow spoken | Beyond the Flow | Card | Source |
|---|---|---|---|---|
| 1 The number is confidently wrong | 0.76 | parts named 0.27, poe 1.15 | **2.2** | this spec |
| 2 A person with no senses | 2.67 (347 words) | live poll ≈ 1.0, two or three chat replies read ≈ 0.5 | **4.2** | estimate (no bench) |
| 3 Sense organ, pathway, processor | 3.08 (401 spoken) | parts, unscripted lines, ANALOGY, S2, motion ≈ 1.0 | **4.1** | `D1-010-03-eye-to-brain.md` §2 |
| 4 Three places the information can be spoiled | 1.75 | S3 0.23, traces 0.1 | **2.1** | `D1-010-04-three-places.md` §2 |
| 5 The path a measurement travels | 1.97 | arrow-by-arrow pacing 0.15 | **2.1** | `D1-010-05-measurement-path.md` §2 |
| 6 The ADC does not know what 2047 means | 1.46 | ANALOGY's break 0.31, S1 0.22 | **2.0** | `D1-010-06-adc-does-not-know.md` §2 |
| 7 A number that appears… | 1.25 | checkpoint ≈ 2.0, room's marks 0.5, S4 0.15, S30 0.13 | **4.0** | `D1-010-07-number-not-earned.md` §2 |
| **Module** | **12.9** | **7.8** | **20.7** | |

**D1·010 overruns its 15 minutes by ≈ 5.7 minutes** before any proposal (the eye spec's +0.5, card 5's
optional domain step +0.25). Reported, not cut (standing rule): the owner cuts (§14 F8).

## 3. The scene: what is on the bench

**Parts** of the circuit library (stable ids; IEC symbols drawn in EveryCircuit's look, D12.4–12.10;
placement per D12.13: source left, the divider stacked in one column, the ADC block to the right):

| id | Part | Real value | Source |
|---|---|---|---|
| `U1` | Sensor output, an ideal DC source to GND | 3.585 V, 0 Ω (labelled *ideal source*, A6) | PLAN; a real sensor's output impedance adds to the 50 kΩ (§9, F4) |
| `R1` | Upper divider resistor | 100 kΩ, 1 %, metal film, 0.25 W, E24/E96 (e.g. Yageo MFR-25FBF52-100K) | PLAN; tolerance and part are this spec's choice |
| `R2` | Lower divider resistor | 100 kΩ, as `R1` | PLAN |
| `MID` | The divider's midpoint, wired to the pin | open-circuit 1.7925 V (shown *1.793 V*); Thévenin 50 kΩ | §8 |
| `ADC1` | The MCU's ADC input, as a block with its inside drawn: pad → multiplexer switch `S_on` → C_s → converter | 12-bit, V_ref 3.3 V; R_on 1 kΩ; C_s 10 pF; acquisition 1.29 µs; **truncating** (F1) | PLAN; STM32F103 datasheet (R_ADC ≤ 1 kΩ, C_ADC 5–8 pF) |
| `CH1` | The previous channel, tied to GND | 0 V; converted just before CH0, so C_s starts each CH0 sample at 0 V | PLAN |
| `code` | Code readout on the ADC block | *raw = 2047* | §8 |
| `truth` | Truth pane (hidden until s2) | *At the pin 1.793 V → 2224.9 (≈ 2225)* · *Reported 2047 → 1.649 V* · *178 codes, 8.0 % low* | §8 |
| `fw` | The firmware (Coding Bench library `cold-open.c`), the three lines in mono | `raw = adc_read(CH0);` · `v = raw * 3.3 / 4096;` · `printf("%d %.3f\n", raw, v);` | PLAN (as changed, F3) |
| `console` | The Coding Bench's console | *2047 1.649* · status *Built · Running* | §8; F3 (decided) |

**Meet the parts** (s0, B3), one line each, in the Parts list and read in Scope: *sensor output — 3.585 V,
more than the ADC can take* · *R1 and R2 — two equal resistors halve it* · *ADC pin — samples the midpoint
and converts it to a 12-bit code* · *firmware — reads the code and prints it*.

**Values beside their element** (B14, B16, mono, ≤ 4 significant figures, D6.14): *3.585 V* at `U1`;
*100 kΩ* along `R1` and `R2`; *12-bit · V_ref 3.3 V* on `ADC1`; *raw = 2047* on the readout; in s2,
*1.793 V* on `MID` and the truth pane's three lines. **Preview plain, View locked plain until s2**
(D12.11): no node voltage, current or dot shows before the reveal, because `MID`'s voltage *is* the
answer.

**Labels** (B14): designators always on (D12.8); nothing moves, so leaders are allowed, but none are
needed: values sit along their parts.

**Colours and their second channel** (C4), roles from the bench tokens (D12.6–12.8), never hex:

| Thing | Colour role | Second channel |
|---|---|---|
| Parts and wires | the sheet's part grey | — |
| Supply and GND nets | rail-high / reference rail | the net names *3.585 V*, *GND* |
| The pin's voltage (s2) | voltage (probe A) | the chip's text *1.793 V* and a probe glyph at `MID` |
| The reported code and its voltage | ink | the word *Reported* |
| The truth | ink on a neutral card | the word *Truth* and the pane's title; **never red** (red means a wrong answer on the wall) |
| The gap | ink, bold | the words *8.0 % low* and *178 codes* |

**Key framings** (2D): *Whole* (Home: circuit, ADC block, firmware) · *Pin* (the ADC block and `MID`,
for the truth pane at 1024 × 768).

## 4. The run: step by step, as the Flow goes

### 4a. Steps

| # | id | Flow paragraph (first words) | What changes: the step's one sentence (B5; the `say`) | Overlay for the room (B13) | Presenter's control |
|---|---|---|---|---|---|
| 0 | `s0-meet` | (unscripted, before p0) | A sensor's 3.585 V is halved by two 100 kΩ resistors into a 12-bit ADC pin; three lines of firmware read it and print 2047. | *raw = 2047* | Next |
| 1 | `s1-ask` | p0 *"[[ask]] Here is the circuit and here is the code…"* | The prediction opens: is 2047 right? The bench holds still and the truth stays hidden. | — (the question is the activity's) | *Reveal* (enabled when the presenter closes the vote) |
| 2 | `s2-truth` | p2 *"[[reveal]] Let me switch on the truth…"* | The truth pane opens at the pin: 1.793 V there should give about 2225; the converter reported 2047, 8 % low. | *2047 reported · ≈ 2225 true · 8.0 % low* | Next |
| 3 | `s3-no-alarm` **Proposal (F5)** | p3 *"The code ran…"*, p4 *"That is the whole course…"* | Nothing on the screen flags a problem: the build succeeded, the program ran, the console shows 2047 1.649. | *No error. No warning.* | Next leads to card 2 |

### 4b. Motion, cues and stills per step

| # | Motion | Movers | Cue and its second channel (B6) | Hold | Under reduced motion it lands as (C3) | Still (B4) |
|---|---|---|---|---|---|---|
| 0 | none (appears) | 0 | the parts named in turn as the presenter says them (part highlight, D12.9 selection wash) | hold | the same | circuit, firmware, *raw = 2047* |
| 1 | none | 0 | the bench dims; the identity bar reads *Waiting for predictions* | hold | the same | the same, dimmed |
| 2 | none (the pane and the chip appear) | 0 | the probe glyph lands on `MID` and the pane opens beside the readout, both at once (paired cue): the two codes on one line | hold | the same | circuit with *1.793 V* and the truth pane |
| 3 | none | 0 | the build status and the console line ringed (a highlight, not a flash) | hold | the same | the same with the status ringed |

**Stills**: four, in the strip. Nothing flashes (B8); no frame once a step is painted (C7).

## 5. Pacing and interaction, by surface and view

**Who paces** (B12): on the wall, the presenter; the wall draws the bench flat (*step n of 4*, run
state), never operable. In Study Mode and Scope, the learner.

| View | Who | Controls (range, default, states) |
|---|---|---|
| Preview (in the slide) | everyone | Back · Next · *step n of 4* · *Open details*; the sheet plain; the truth pane locked hidden until s2 |
| View (details) | everyone | from s2 on: Voltage view (node chips), Probe (`MID`, `U1`), the truth pane on/off, the ADC block opened (pad, switch, C_s); Firmware tab (the three lines, the console); **locked before s2** |
| Edit (session only, whole wall) | everyone; a student's own copy | after s2: change `R1`/`R2` (E24 values 1 kΩ–1 MΩ), `U1` (0–6.6 V), see the code and the truth recompute; banner *Changes are for this session only*. **Locked in the lecture** (it would give away S31; F6) |
| Authoring (Course Studio) | authors | the circuit library, parts and profiles, the ADC block's settings, the four steps and their `say`, the plain lock, the poe binding, the truth pane's lines |

- **The presenter's strip** (B20): the next step's title and sentence; the tally when the vote closes;
  the teacher tip (§7d); keys → / PageDown next, ← back, Enter *Reveal*.
- **Study Mode and Scope**: the four steps learner-paced; the prediction first (it waits for the
  commitment); the circuit's numbers readable in the Parts and Voltage panels after s2. Explore stays
  locked until the learner has passed D1·070 (F6).
- **Phone** (C6): the sheet on top (the divider and the ADC block side by side fit 320 px at the
  framing *Pin*), then the step's sentence, the firmware's three lines, the stills row, big Back / Next;
  one finger does nothing on the sheet, two fingers pinch and pan.
- **Locked for this card**: View's numbers and the truth pane until s2; Edit for the lecture.

## 6. The frame

The Electronics Bench's View frame (D4.3–4.5, the owner's renderings D12.1): identity bar, mode
switcher, the sheet with fit / zoom / grid and the legend card, the dock, one side-panel shape.

| Tile / panel | Used? | Selected item (one large value) | List / contents |
|---|---|---|---|
| Voltage | yes, from s2 | *MID 1.793 V* | the node voltages: `U1` 3.585 V, `MID` 1.793 V, `GND` 0 V |
| Current | no (17.9 µA is not the point; dots locked off) | — | — |
| Measure / Probes | yes, from s2 | the probe's reading *1.793 V* | the probe at `MID` |
| ADC (new: the ADC-input block's panel) | yes | *raw = 2047* | V_ref 3.3 V, 12 bits, R_on 1 kΩ, C_s 10 pF, acquisition 1.29 µs, channel order CH1 → CH0 (read-only in the lecture) |
| Truth (new; or a mode of the ADC panel) | from s2 | *8.0 % low* | the three lines of §3 |
| Firmware (the Coding Bench, docked beside the sheet) | yes | the console's *2047* | the three lines; build status |
| Ask | yes, s1 | the poe and its tally | the confidence question |
| Ink | yes | — | laser, ink (M07-c) |

**Identity bar**: *The cold open · A sensor, a divider, an ADC pin · ● Holding · step n of 4*; *Waiting
for predictions* at s1. **Legend card**: rail colours, the voltage chip's role, *ideal source*, *R_on and
C_s: teaching values* (A6).

## 7. Thinking, not watching

- **7a. The PLAN's ASK** (verbatim): *poe (before the statement) — "Here is the circuit and here is the
  code. Is 2047 right?" options: right to within a count or two | right to within 1 % | off by more than
  5 % | no way to tell from what is shown · answer: off by more than 5 % · reveal: the truth pane: the pin
  should give 1.79 V → 2225; 2047 is 8 % below it. · explain: The converter reported 2047 where the true
  voltage at the pin gives 2225, and no line of the firmware had any way to notice the difference. ·
  depth: understand · practice: arguing from evidence · Pair it with a confidence question (how sure, 1
  to 5); never scored.* It fires at **s1**, with the bench visible and its truth hidden; **s2 answers
  it**.
- **7b. Prediction on the bench**: the PLAN's poe *is* the bench's prediction point (B9): the truth pane
  waits for it. Nothing added.
- **7c. After the reveal** (B10): the PLAN's explain. In Study, done = the poe committed (with its
  confidence) and s3 reached.
- **7d. Teacher tip** — **Proposal** (F7): *Some will pick "no way to tell": that is the evidence the
  room has to argue from. Ask: what is half of 3.585 V, and what code should that give?* (1.79 V →
  ≈ 2225; the room can reach the answer from what is shown.)
- **7e. Explore**: none in the lecture. **Proposal** (F6): in Study, after D1·070, the same library with
  the acquisition window (0.25–5 µs), `R1`/`R2` and the channel order unlocked, so a learner can make
  2047 come and go.

## 8. Faithfulness (the quality bar)

**Arithmetic** (recomputed 2026-10-08):

- Divider: V_MID = 3.585 × 100 / 200 = **1.7925 V** (shown *1.793 V*; the PLAN's *1.79 V*). Thévenin
  resistance 100 kΩ ∥ 100 kΩ = **50 kΩ**. Divider current 3.585 / 200 kΩ = 17.9 µA; each resistor
  dissipates 32 µW (rating 0.25 W).
- LSB = 3.3 / 4096 = **0.8057 mV**. Ideal code for the pin: 1.7925 / 0.0008057 = **2224.87**: a rounding
  converter shows 2225, a truncating one 2224 (F1).
- Charging: τ = (50 kΩ + 1 kΩ) × 10 pF = **510 ns**. Window 1.29 µs = **2.529 τ**; e^−2.529 = 0.0797.
  C_s from 0 V reaches 1.7925 × (1 − 0.0797) = **1.6496 V** = 2047.54 LSB → **2047** truncated (2048
  rounded: F1). The window that gives 2047 is 1.2885–1.2913 µs for a truncating converter and
  1.2870–1.2899 µs for a rounding one.
- Error: 1 − 2047 / 2224.87 = **7.99 %**, shown *8.0 % low*; 2224.87 − 2047 = 177.9 codes, shown *178
  codes*. The PLAN's 2047 / 2225 = 0.920, also 8.0 %.
- Reported voltage: 2047 × 3.3 / 4096 = **1.649 V**, what `v` holds (and what D1·090's S30 harvest
  says: *"1.649 V, if the reference really is 3.3 V"*).
- Settling for ½ LSB at 12 bits needs ln(2¹³) = 9.0 τ = 4.6 µs; the window gives 2.5 τ. (D1·070 teaches
  this; nothing of it is on this card.)
- The budget DMM (InsightDemo `dmm-budget`: 10 MΩ on DC volts, 3½ digits, ±0.5 % ± 2 counts) on `MID`:
  1.7925 × 10 / 10.05 = **1.784 V**, 0.50 % low; on a 1 MΩ / 1 MΩ divider (500 kΩ Thévenin): 1.707 V,
  **4.76 % low**, the PLAN's former *4.8 %* (F2).
- Back-to-back conversions on CH0 alone (the FAULT): 1.6496, 1.7811, 1.7916, 1.7924, 1.7925 V →
  codes **2047, 2210, 2223, 2224, 2224** (truncated).

**Section D, Electronics rows**
- [x] Every part a real part: 100 kΩ 1 % metal film, a named part number; the source labelled *ideal*.
- [x] Sources' internal resistance: `U1` ideal, labelled; the ADC block's R_on is the real effect.
- [x] Meters: none on the target (the truth pane is the solve, labelled *Truth: the circuit's own
  solve; no instrument in the circuit shows it*). The stand-in's meter, if used, is the `dmm-budget`
  profile (§8 above).
- [x] Every revealed effect matches a hand calculation: §8, to the digits shown.
- [x] Limits: 3.585 V is above V_ref, which is why the divider exists; `MID` stays below 3.3 V. No damage
  case on this card.
- [x] IEC symbols, EveryCircuit's look; no moving current on this card (dots locked off: nothing about
  current teaches here).

**Section D, Coding rows** (for the Coding Bench library)
- [ ] The code compiles for a named MCU with a named toolchain: **open** (F3): `adc_read(CH0)` is not
  a real API. Proposal: STM32F103 + STM32Cube HAL (GCC arm-none-eabi), `adc_read()` a six-line wrapper
  shown in View; the three lines unchanged.
- [x] The printed numbers are the real board's: `printf("%d %.3f\n", raw, v)` prints *2047 1.649* (from
  §8); `v` is now used, so no warning (F3, decided). Printing a double with `%f` on newlib-nano needs the
  link flag `-u _printf_float`, which the bench's build sets.
- [x] Integer widths: `raw` fits 16 bits (0–4095); `raw * 3.3 / 4096` is a double, 1.649.

**A1–A8**: A1 ✓ (PLAN, datasheet class values, §8); A2 partly: the ideal source and ideal converter
(no offset, no INL) are labelled, the settling error is the point, other non-ideal effects in §9; A3 ✓
(IEC, EveryCircuit's look); A4 ✓ (no instrument on the target; `dmm-budget` on the stand-in); A5 n/a
(nothing moves); A6 ✓ (*ideal source* · *R_on and C_s: teaching values in the range real MCUs give* ·
*converter shown without offset or linearity error*); **A7 ✓ after the owner's decisions: the converter
truncates and the truth pane shows the ideal ≈ 2225 (F1); the stand-in is Draw, not the meter (F2)**; A8 ✓.

## 9. Faults and non-ideal behaviour

**PLAN FAULT** (verbatim): *Converted back-to-back on one channel, the same circuit reads close to 2225
(the capacitor keeps its last charge); enable a second channel and 2047 comes back. "It changed when I
added a sensor."* On this library: channel order *CH0 only* gives 2047, 2210, 2223, 2224, 2224 (§8);
*CH1 → CH0* gives 2047 every time. **Played in D1·070, not here** (S31 keeps the cause for later; F6).

Non-ideal effects the real thing has, **Proposals** for Study or later cards:
1. **Resistor tolerance**: 1 % parts put `MID` anywhere within ±1.0 % in the worst case (1.775–1.811 V,
   ±22 codes): an order smaller than the 8 %.
2. **The sensor's own output impedance** adds to the 50 kΩ and makes τ longer (F4).
3. **The reference**: on many MCUs V_ref is the supply; a 3.3 V regulator at ±2 % moves every code by
   ±2 % (D1·090's subject).
4. **Converter offset and linearity**: a few LSB on a 12-bit MCU ADC (check the named part's datasheet
   for its total unadjusted error before quoting a number).
5. **Pin leakage** through 50 kΩ: a shift of (leakage × 50 kΩ); quote it only from the named part's
   datasheet.

## 10. Accessibility, legibility and print

- Wall (C2): the readout and the truth pane at 32 pt and 7:1; part values at the sheet's wall size (open
  point 1 in the design rules); checked at 1920 × 1080 and 1024 × 768 with the framing *Pin* (to do).
- Reduced motion (C3): nothing moves; every step is a state.
- Colour (C4): every colour paired with words (§3); the truth is never red.
- Keyboard (C5): → ← Enter, focus visible.
- Print (C8): four stills with their sentences, the circuit's values and the truth pane's three lines.

## 11. Assets to make or source

| Asset | Format | Made by | Status |
|---|---|---|---|
| `cold-open.benchcircuit`: `U1`, `R1`, `R2`, `ADC1`, `CH1`, the four steps, the plain lock, the truth pane | Electronics circuit library | the author | to make when the ADC-input block exists |
| `cold-open.c`: the three lines and the `adc_read()` wrapper | Coding Bench library | the author | to make when the Coding Bench exists (F3 first) |
| `cold-open.benchdrawing`: the stand-in (§13) | Draw library | the author | **to make for Saturday** |

## 12. Bench capabilities this needs

**Electronics Bench** (M25 / M66; *"DC only: no op-amp, switch, ADC block or scope"*, STATE):
- **Exists**: DC solve, IEC symbols, part profiles, probes, the Voltage view, reveals, the four views
  (M66 in progress), plain Preview (D12.11).
- **Missing (request it)**: an **ADC-input block**: pad → multiplexer switch with R_on → sampling
  capacitor → converter (N bits, V_ref, truncating or rounding), an acquisition window and a channel
  order, solved as one RC step per conversion (a closed form, no general transient engine needed), with
  a code readout and a truth pane. The same block serves D1·040 card 6, D1·070 and the lab's
  source-impedance fault. The proposed stage 13b (*the transient bench*) is the general route;
  the closed form is enough for the course.
- **Planned**: the View lock *plain for a prediction beat* (D12.11) is a rule; confirm it is in M66.

**Coding Bench** (planned, not carved): a library of C for a named MCU, compiled, its console's output
true to the board; *run against the circuit* means the code's `adc_read()` returns the Electronics
library's code. **Missing (request it)**: the binding between a Coding library and an Electronics
library.

**The `circuit` fence today** (read 2026-10-08): one fence is one beat, with a `predict` and at most one
`reveal` `{part, show}`. This card's poe → truth pane fits it exactly (predict, then reveal the ADC
block's truth); the four steps' `say` lines live on the presenter's strip and in the notes until a
circuit fence can hold steps (request X9).

**Not this bench's**: the cause (the capacitor charging): D1·070's Plot and Draw.

## 13. Stand-in for the lecture

Neither the ADC-input block nor the Coding Bench will exist on Saturday. Options, in order:

1. **Draw** (**decided**, owner 2026-10-08): `cold-open.benchdrawing`, the circuit in IEC symbols with the ADC
   block's inside drawn, values along the parts, *raw = 2047* on the readout. Steps: s0 the circuit and
   readout; s1 nothing new (the poe runs as a `poe` block before the statement, EAC's predict-first
   order); s2 the truth pane drawn in (text items with §8's numbers); s3 the ring on the firmware's
   status. The three firmware lines go in the reading column as `{font=mono}` paragraphs, as the PLAN
   says. **Keeps**: the whole point at its true size (8 %), B3, B4, B5, B14, B16, B17. **Loses**: the
   solve (the truth is written, computed here), probing, Edit, Explore. The drawing does not become the
   target's source (a circuit is not a drawing); its layout is copied into the circuit library.
2. **Electronics today, budget DMM on the 100 kΩ divider**: the meter reads 1.784 V against 1.793 V,
   **0.5 % low**: it does not carry *"wrong by 8 %"*, and "a few per cent" would be untrue. Not
   used.
3. **Electronics today on a 1 MΩ / 1 MΩ divider** with the budget DMM: 1.707 V, **4.8 % low** (the former
   PLAN's figure). It carries "a few per cent", but it is a different circuit from the one D1·070
   harvests (*"a 100 k divider"*) and a meter, not a converter. Not used.

The Flow needs no change.

## 14. Findings for the owner

**Owner, 2026-10-08: "go with your recommendations".** Decided: F1 (a), F2 (a), F3 (a), F4 (label
*ideal source*), F9 (label the ADC generic). The PLAN was changed for F1, F2 and F3 (a Note, the *Today*
sentence, the printf line). Still open: the proposals F5, F6, F7; F8 is the owner's to cut.

- **F1 (A7) — 2225 needs a rounding converter; 2047 needs a truncating one.** The pin's ideal code is
  2224.87: rounding gives 2225, truncation 2224. The window of 1.29 µs gives 2047.54: truncation gives
  2047, rounding 2048. D1·080's SAR card truncates (STATE Q3). Options: (a) the converter truncates
  (agreeing with the SAR card), the truth pane shows *≈ 2225 (2224.9)* as the ideal, and a settled
  reading is 2224; the Flow's *"about 2225"* already says *about* (**recommended**: no text changes);
  (b) the converter rounds and the window becomes 1.288 µs (2047.0 → 2047); the SAR card would then
  disagree; (c) leave it.
- **F2 (A7) — the stand-in's "4.8 %" is a different divider's.** The course's budget DMM is 10 MΩ
  (InsightDemo `dmm-budget`). On this card's 100 kΩ divider it reads 0.50 % low; 4.76 % is a 1 MΩ / 1 MΩ
  divider's (D1·040's own Demo #1 circuit). Options: (a) stand in with Draw, numbers written (§13 option
  1, **recommended**); (b) keep the meter and change the Status line to *0.5 %*; (c) a 1 MΩ divider on
  the stand-in only (§13 option 3).
- **F3 — the firmware.** `v` is set and never used, so a compiler with warnings on prints *"variable 'v'
  set but not used"*: a warning on screen, against the Look for's *"nothing anywhere … flagging a
  problem"*. And `adc_read(CH0)` is not a real API, which the Coding rows need. Options: (a) print both,
  `printf("%d %.3f\n", raw, v);` → *2047 1.649*: two confident numbers, both wrong (**recommended**, a
  change to the owner's code, so the owner's call); (b) keep the lines and build with warnings off
  (say so on the bench); (c) keep the warning as a red herring. And: name the MCU (proposal: STM32F103,
  HAL, `adc_read()` a wrapper shown in View).
- **F4 — the sensor is an ideal source.** A real sensor's output impedance adds to the divider's 50 kΩ.
  Label it *ideal source* on the bench (done here), or give it a value?
- **F5 — Proposal: s3, "nothing flagged"**, the build status and console ringed for the Look for's second
  half. Add it to the PLAN's Drive?
- **F6 — Proposal: the FAULT is played on this library in D1·070, not here**, and Edit and Explore stay
  locked on this card until then, so S31 keeps its cause.
- **F7 — Proposal: the teacher tip** in §7d.
- **F8 — D1·010 overruns by ≈ 5.7 min** (§2, card by card). The owner cuts.
- **F9 — the real thing.** No real MCU gives exactly these values: STM32F103's sample times are 1.5,
  7.5, 13.5, 28.5 … cycles of a ≤ 14 MHz ADC clock, so 1.29 µs is not one of them. The bench labels its
  ADC *a generic 12-bit MCU input, values in the range real parts give*. Name a real MCU instead (the
  numbers would change)?

## 15. Acceptance: how we know it is built right

- The four steps of §4a play on the wall, the presenter's window and Study Mode in order, with §8's
  numbers exactly: *3.585 V*, *100 kΩ*, *raw = 2047*, *1.793 V*, *≈ 2225 (2224.9)*, *1.649 V*, *178
  codes*, *8.0 % low*.
- The bench's own solve gives them: changing `R1`/`R2` to 1 kΩ in Edit (after the lecture) gives a code
  within 1 of 2224; *CH0 only* gives 2047, 2210, 2223, 2224.
- B1 one state per press; B2 nothing moves; B3 s0 still and named; B4 four stills; B5 each step's
  sentence on the strip; B6 the probe and the pane land together; B9 the truth waits for the poe; B10 the
  explain after, no verdict; B12 the wall's bench not operable; B13 no Flow text on the bench; B14 values
  along their parts; B16 every state readable as numbers; B17 2047 and ≈ 2225 on one line; B20 the tip on
  the strip.
- C2 legible at 1920 × 1080 and 1024 × 768 on the projector profile; C3 n/a (no motion); C4 the three
  colour-vision simulations; C5 → ← Enter from a clicker; C6 walked at 320, 768, 1200, 1440, 1920; C7 a
  step to first frame < 100 ms; C8 the print form.
- E1–E6 for the built bench.
- The stand-in (§13 option 1) checked on the lecture laptop before Saturday, both themes.
