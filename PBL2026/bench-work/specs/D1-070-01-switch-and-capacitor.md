```yaml
id: D1-070-01-switch-and-capacitor
card: "The ADC input is a switch and a capacitor"
module: notes/Day01/070-adc-input/en.md
bench: Draw                       # the target, and it exists (M59): traces, steps with `say`, function curves
library: "adc-input-inside-the-pin (`adc-input-inside-the-pin.benchdrawing`): the source seen from the board's pin, then the inside of the pin built one element per step (pad, MUX and sample switch, R_on 1 kΩ, C_s 10 pF, comparator), and under it the timing strip of one sample: switch closed (acquire), open (hold and convert), closed again"
dimensions: 2D
stand_in: none                    # traces and steps play on the wall today; what is lost without trace-by-x, the Symbols switch and French is in §13
optional_benches: []
real_thing: "the analog input of a 12-bit MCU SAR converter on a 3.3 V reference (a sampling switch of about 1 kΩ, a sampling capacitor of about 10 pF, a 1 µs acquisition window and 1 µs of conversion, 500 kS/s), drawn in IEC 60617 symbols, unbranded"
minutes: 1.4                      # on the bench: s0 at p4 to s10 under p7 (§2)
card_minutes: 3.0                 # the whole card, the poe and the Flow before the bench included (§2)
status: spec-draft
learner_action: poe
predictions: []                   # the PLAN's poe is the prediction (it fires before the bench; s6 reveals it)
seeds: []
key_variable: "the switch's state: closed, the capacitor charges towards the input; open, it holds what it has"
time_scale: "none for the build (s0–s6); the strip (s7–s9) has a real time axis, 0–3 µs, traced slowed about 1.5 × 10⁶ × (1 µs in ≈ 1.5 s, stated on the strip; the exact factor is the one the bench plays, §15)"
steps: 11                         # s0–s10
```

The Draw format as read on 2026-10-20 (`C:\ExSightory\src\insight\packages\insight-core\src\registry\drawingBlock.ts` and
`…\src\drawing\schema.ts`, `animation.ts`): the `drawing` fence carries `title`, `src`, `alt`, `caption` (each `{en, fr}`
where marked `i18n`); the `.benchdrawing` holds an artboard in drawing units, layers, items (line, polyline, rect, ellipse,
polygon, path, text, function), groups and **steps**, each with a required `say` and cumulative `draw` / `hide` lists. Text
roles are `label`, `note` and `title`; inks are `teal`, `amber`, `violet`, `lime`, `rose`, `azure`, `orange`, `magenta` and
`contrast`; line types `outline`, `thin`, `hidden`, `centre`, `construction`. Item text and `say` are **plain strings**
(no `{en, fr}`), and maths in a label (subscripts) waits (the schema's own note, M59 spec §6). A trace may be measured
`by: x` (§11.8 of M59), stored and checked since M59m; what the wall plays beyond a trace by length is M59n.

## 1. What the room must understand

- **Statement** (verbatim): *To convert a voltage, the ADC first holds it still. A switch connects a small sampling
  capacitor to the input, then opens, and the conversion works on the voltage the capacitor kept.*
- **SHOW** (verbatim from the PLAN): *Draw — inside the pin: pad → multiplexer switch → R_on (1 kΩ) → C_s (10 pF) →
  comparator; under it the timing strip: switch closed (acquire), open (hold and convert), closed again.*
- **Drive** (verbatim): *one step per element, then the timing strip.*
- **Status** (verbatim): *needs Draw: the S/H-inside-the-pin drawing with its timing.*
- **Look for**: *none in the PLAN.*
- **Decided by the owner, 2026-10-20** (applied here, not re-asked): F1, the card names the class, *"A 12-bit MCU converter,
  like most, includes a sample-and-hold…"*, and the module's converter is 12-bit, 3.3 V, truncating; F4, card 1 is drawn as
  an IEC schematic inside the chip (pad, MUX switch, R_on 1 kΩ, C_s 10 pF, comparator) with the board's pin shown as
  context; F3, about 21 of the module's 45 minutes are used: reported, left.
- **Bench and library.** The **bench** is the Draw Bench (M59). The **library** is a new drawing,
  `adc-input-inside-the-pin`, built for this card. Card 5 (*One capacitor, many inputs*) draws the same MUX, capacitor and
  converter with four sensors; with X2 (layers on the fence) it can reuse this file's layers, otherwise it is its own file.
- **Insight**: *to whatever drives it, an ADC input is a small capacitor behind a switch: connected for a short window to
  charge towards the input, then let go while the converter works on what it kept.*
- **Kind of knowledge**: *a picture built up* (the inside of the pin, element by element), then *a process through stages*
  held as a picture (the strip's three phases, one per step). Card test → **Draw**: the strip is three held states, each a
  sentence of the Flow, and the Draw Bench traces each on. B15 applies (the board side first, then the chip's inside, then
  the strip under it); B17 applies (the switch and the strip visible together, the switch's state matching the strip's
  phase at every step). B18, B19 do not.
- **Why this bench, not a still**: the reveal has to land after the poe and element by element as the Flow names them (a
  still gives the answer away before the question); the strip has to show the switch's state changing in step with the
  capacitor's voltage, which a still can only show all at once. The approved preview's last stop played card 2's Plot (the
  shortfall in LSB); here that stays card 2's, and card 1 ends on the drawing (§4a s10).
- **Key variable**: the switch's state.

## 2. Time

The Flow is 252 words, 22 of them the `[[ask]]` question (p2), p3 a `[[pause]]`: **252 words = 1.94 min** at 130 wpm.
Paragraph word counts (spoken words, `[[tags]]` removed): p0 64, p1 23, p2 22, p3 —, p4 56, p5 18, p6 43, p7 26.

| Beat | Minutes | Source of the number |
|---|---|---|
| Before the bench: p0 *"Before the signal reaches the ADC…"* (64), p1 *"A 12-bit MCU converter, like most, includes a **sample-and-hold**…"* (23) | 0.67 | 87 ÷ 130 |
| The PLAN's poe (before the statement): p2 *"[[ask]] So, to your divider, what does that input look like?…"* (22) | 0.17 | 22 ÷ 130 |
| The poe's answer window and the spread of answers (p3 *[[pause]]*) | 0.75 | estimate: a four-option poe, as the other cards' single questions |
| s0 the source and the pin: the presenter names the source before drawing (≈ 13 words, *"Here is your source, seen from the pin: 1.65 V behind 10 kΩ."*) | 0.10 | estimate, unscripted |
| s0–s5 the build: p4 *"[[demo]] Let me draw what is inside the pin…"* (56) | 0.43 | 56 ÷ 130 |
| Waiting on the build's traces not covered by speech (6 steps, ≈ 1 s each) | 0.10 | estimate |
| s6 the reveal: p5 *"[[reveal]] To your divider, the ADC input is a small capacitor…"* (18) | 0.14 | 18 ÷ 130 |
| s7–s9 the strip: p6 *"Now the timing strip underneath…"* (43) | 0.33 | 43 ÷ 130 |
| Waiting on the strip's traces not covered by speech (3 segments, ≈ 1.5 s each, mostly under p6's sentences) | 0.10 | estimate |
| s10 the charging path: p7 *"So the source is not feeding a steady resistance…"* (26) | 0.20 | 26 ÷ 130 |
| **Card total / of which on the bench** | **3.0 / 1.4** | 1.59 before the bench + 1.40 on it |

p4 is one paragraph over six steps (s0–s5): each step lands on its own sentence or clause (§4a), so the Flow is spoken
over the traces as they run, one element per clause; each trace is short (≤ 1.5 s, the bench's `DRAW_ON.maxMs`). p6's
three sentences each own a step and are spoken over the strip's segment as it traces, then held (B13). If the Canvas can
show s0 beside the poe card (§12, F9), the drawing is up for the whole card and its bench minutes become 3.0.

**Module check**: `D1-070-02-charge-in-time.md` §2.

## 3. The scene: what is on the bench

Artboard **1200 × 860** drawing units, two bands that stay up once drawn (B4, B17): the **circuit** (y 0–320) and the
**strip** (y 340–860), the strip's time axis under the switch it describes. Coordinates are the approved preview's
(`bench-work/previews/u016-preview.src.html`, card 1, `drawCircuit` and `drawPlot` in `timeline` mode, circuit wire at
y 110), the strip moved down by 340. Drawn in **IEC 60617** by default (resistor a rectangle 64 × 18; capacitor two plates;
the ideal voltage source a circle with its line along the wire; IEC earth; comparator a rectangle with ▷; D/A a rectangle
marked `#/∩` with *D/A* under it); the **US set** (zigzag, triangle, *DAC* box, circle with + and −) is the bench-level
Symbols switch's (§12). Inks are the Draw palette's names, never hex. Text roles `label` (part names and values) and
`note` (simplifications, context).

**The circuit band** (layer `circuit`; the chip's inside on layer `inside`):

| id | Item | Value, and its source | Drawn as |
|---|---|---|---|
| `src` | the source on the board: circle at (90, 190), r 24; wire up to y 110, earth at (90, 262) | 1.65 V: the module's input (card 2 p2, card 3) | `outline`, `contrast`; *1.65 V* `label`, `azure`, left of it |
| `rs` | its output resistance, body on (140–250, 110) | 10 kΩ: card 2's *"Now 10 kΩ"* case (a 20 kΩ / 20 kΩ divider on 3.3 V seen from its midpoint, F5) | `outline`; *Rₛ 10 kΩ* `label` at (195, 86) |
| `src-note` | *the source, seen from the pin* | **Proposal** (F5) | `note`, under the source, at (150, 300) |
| `pin` | the board's pin: rect x 300–350, y 103–117 | context (F4, decided) | `outline`, fill `contrast` `faint`; *pin* `label` at (325, 144) |
| `chip` | the chip's outline: rounded rect x 360–1170, y 20–306 | — | `hidden` (dashed), `contrast`; *inside the MCU* `note` at (1160, 42), right-aligned |
| `bond` | bond wire, pin to pad: path M350 110 Q362 94 375 110 | — | `thin` |
| `pad` | the pad: rect x 375–401, y 97–123 | — | `outline`, fill `contrast` `half`; *pad* `label` at (388, 144) |
| `sw-contacts` | wire 401 → 430; two contacts, circles r 5 at (436, 110) and (496, 110); wire 501 → 540; junction dot (520, 110) | — | `outline` |
| `sw-open` | the blade, open: (440, 107) → (486, 78) | the switch open: hold (or idle) | `outline`, `amber` (geometry is the second channel) |
| `sw-closed` | the blade, closed: (441, 110) → (491, 110) | the switch closed: acquire | `outline`, `teal` |
| `mux-others` | three other channels at y 150, 176, 202: each a lead, two contacts and an open blade, joined by a bus at x 520 to the junction | context: the MUX (p4 *"the multiplexer and the sample switch"*) | `thin`, `contrast`; *other channels* `note` at (466, 238) |
| `sw-label` | *MUX + sample switch* | p4 | `label` at (466, 62) |
| `ron` | the switch's on-resistance, body on (540–650, 110) | 1 kΩ (PLAN; the course's model, `course-accuracy.md` §3) | `outline`; *Rₒₙ 1 kΩ* `label` at (595, 86) |
| `cs` | wire 650 → 820 at y 110; node dot (700, 110); 700, 110 → 165; plates at y 165 and 179, x 672–728; 700, 179 → 262; earth at (700, 262) | 10 pF (PLAN; the course's model) | `outline` (plates heavier); *Cₛ 10 pF* `label` at (742, 152) |
| `cmp` | the comparator: rect (820, 90) 80 × 90 with ▷; + input at (820, 110) from the C_s node | the PLAN's *→ comparator* | `outline`; *comparator* `label` at (860, 78) |
| `conv` | its − input from a D/A: box (800, 214) 64 × 36, marked `#/∩`, *D/A* under; output 900, 135 → *SAR logic* box (930–1030, 115–155) → back to the D/A; an arrow 1030 → 1100 at y 135, *code* | **Proposal** (F4): context, so the comparator is not drawn with one input | `thin`, `contrast`; *the conversion: D1·080* `note` at (980, 190) |
| `omit-note` | *protection diodes and pin capacitance omitted* | the simplification label (A6) | `note` at (1160, 298), right-aligned |
| `reveal-frame` | dashed frames round the switch (426–506 × 95–125) and round C_s (664–736 × 152–192); words *10 pF, through a switch* at (700, 296) | **Proposal** (F6): the reveal's cue | `hidden`, `violet`; words `label`, `violet` |
| `path-frames` | dashed frames round Rₛ and round Rₒₙ; words *charged through 10 kΩ + 1 kΩ* at (395, 296) | **Proposal** (F6): p7's cue | `hidden`, `violet`; words `label`, `violet` |

**The strip band** (layer `strip`). Time axis x = 110 + 346.67·t (t in µs), 0 to 3 µs across x 110–1150; voltage axis
y = 780 − 170·v (v in V), 0 to 2 V across y 780–440.

| id | Item | Value, and its source | Drawn as |
|---|---|---|---|
| `axes` | voltage axis x 110, y 440–780, gridlines and labels at 0, 0.5, 1.0, 1.5, 2.0 V; time axis y 780, ticks at 0, 0.5 … 3 µs (labels y 836); *time, µs* | — | `thin`, `contrast`; labels `note` |
| `axis-title` | *capacitor voltage (solid) · input (dashed)* at (110, 428) | — | `note` |
| `slow-note` | *time slowed about 1 500 000 ×* at (1150, 854), right-aligned | A5; the factor the bench plays (§15) | `note` |
| `input` | the input, y 499.5 (1.65 V), x 110–1150 | 1.65 V | `hidden` (dashed), `azure`; *input 1.65 V* `label` at (1150, 490), right-aligned |
| `band-acq1` | rect x 110–456.7, y 368–404 | 0–1 µs: the 1 µs window (card 2 p2) | `thin`, `teal`, fill `teal` `faint`; *switch closed · acquire* `label`, `teal` |
| `vc-acq1` | function y(x) = 780 − 170·1.65·(1 − e^(−(x − 110)/38.13)), x 110–456.7 | v_C(t) = 1.65 V·(1 − e^(−t/τ)), τ = 110 ns (§8) | `function`, `outline`, `teal`, traced `by: x` |
| `band-hold1` | rect x 456.7–803.3, y 368–404 | 1–2 µs: 1 µs of conversion (card 7 p5) | `thin`, `amber`, fill `amber` `faint`; *switch open · hold and convert* `label`, `amber` |
| `vc-hold1` | line (456.7, 499.53) → (803.3, 499.53) | held 1.649814 V (§8): 0.03 units under the input line, so it reads as on it; the 0.23 LSB is card 2's zoom | `outline`, `amber`, traced `by: x` |
| `band-acq2` | rect x 803.3–1150, y 368–404 | 2–3 µs: the next window opening | `thin`, `teal`, fill `teal` `faint`; *closed again · next sample* `label`, `teal` |
| `now-line` | a vertical at x 803.3, y 362–780 | the instant the switch closes again | `thin`, `teal` |

The strip stops at t = 2 µs, as the switch closes again (the PLAN's *closed again*); the next sample's curve is not drawn
(F1). No code is written on the strip (F3).

**Meet the parts** (B3): s0 is the source, its 10 kΩ, the pin and the closed chip, each labelled; the chip's inside is
then met one element per step (s1–s5), each labelled as it lands with its value.

**Values beside their element** (B14, B16): every value on its part (*1.65 V*, *Rₛ 10 kΩ*, *Rₒₙ 1 kΩ*, *Cₛ 10 pF*); the
strip's values on its axes and its phases in words on their bands. No table.

**Labels**: on or beside their parts; nothing moves except traces, so leaders are allowed (none are needed). Subscripts
are Unicode where they exist (Rₛ, Rₒₙ, Cₛ) until Draw labels take maths (§12); the capacitor's voltage is named in words
(*capacitor voltage*), since there is no subscript capital C.

**Colours and their second channel** (C4):

| Thing | Ink | Second channel |
|---|---|---|
| Switch closed, acquiring | `teal` | the blade lies on the contacts; the band's words *switch closed · acquire* |
| Switch open, holding | `amber` | the blade raised; the band's words *switch open · hold and convert* |
| The input voltage | `azure` | dashed; *input 1.65 V* written on it |
| What the source sees (reveal, path) | `violet` | dashed frames; the words *10 pF, through a switch*, *charged through 10 kΩ + 1 kΩ* |
| Everything else | `contrast` | — |

One meaning per colour across the card (the approved preview used amber also for the emphasis; violet takes it here, F6).

**Strings, `{en, fr}`** (French drafts, for the owner's review; numbers and units untranslated, '.' decimal):

| en | fr |
|---|---|
| inside the MCU | à l'intérieur du microcontrôleur |
| pin · pad | broche · plot |
| MUX + sample switch | MUX + interrupteur d'échantillonnage |
| other channels | autres voies |
| comparator | comparateur |
| the conversion: D1·080 | la conversion : D1·080 |
| protection diodes and pin capacitance omitted | diodes de protection et capacité de la broche omises |
| the source, seen from the pin | la source, vue de la broche |
| switch closed · acquire | interrupteur fermé · acquisition |
| switch open · hold and convert | interrupteur ouvert · maintien et conversion |
| closed again · next sample | à nouveau fermé · échantillon suivant |
| capacitor voltage (solid) · input (dashed) | tension du condensateur (trait plein) · entrée (tirets) |
| time, µs · time slowed about 1 500 000 × | temps, µs · temps ralenti environ 1 500 000 × |
| input 1.65 V | entrée 1.65 V |
| 10 pF, through a switch | 10 pF, à travers un interrupteur |
| charged through 10 kΩ + 1 kΩ | chargé à travers 10 kΩ + 1 kΩ |

The eleven `say` lines (§4a) get their French with the file.

**Key views**: *Home* (both bands); framings `inside` (x 290–1170, y 20–306: the pin and the chip) and `strip` (y 340–860)
for Study's zoom and the phone (§5).

## 4. The run: step by step, as the Flow goes

### 4a. Steps

| # | id | Flow paragraph (first words) | What changes: the step's one sentence (B5; the `say`) | Overlay | Presenter's control |
|---|---|---|---|---|---|
| — | the PLAN's poe, before the bench | p0, p1, then p2 *"[[ask]] So, to your divider…"*, p3 *[[pause]]* | (§7a) | — | the activity |
| 0 | `s0-source-and-pin` | p4 *"[[demo]] Let me draw what is inside the pin."* (and the unscripted line, §2) | The source, 1.65 V behind 10 kΩ, wired to the MCU's pin; the chip is still closed. | *1.65 V · Rₛ 10 kΩ* | (the Canvas is up) |
| 1 | `s1-pad` | p4 *"First the pad."* | Inside the pin, a bond wire leads to the pad on the chip. | *pad* | Next |
| 2 | `s2-switch` | p4 *"Then a switch: the multiplexer and the sample switch,"* | From the pad, a switch: the multiplexer and the sample switch, open, with the other channels beside it. | *MUX + sample switch* | Next |
| 3 | `s3-ron` | p4 *"…with a real on-resistance, typically somewhere around a kilohm."* | The switch has a real on-resistance: 1 kΩ. | *Rₒₙ 1 kΩ* | Next |
| 4 | `s4-cs` | p4 *"Then a small capacitor to ground, the sampling capacitor…"* | A small capacitor to ground, the sampling capacitor: 10 pF. | *Cₛ 10 pF* | Next |
| 5 | `s5-comparator` | p4 *"Behind it, the comparator that does the conversion."* | Behind the capacitor, the comparator that does the conversion. | *comparator* | Next |
| 6 | `s6-reveal` | p5 *"[[reveal]] To your divider, the ADC input is a small capacitor…"* | To the source, the input is a 10 pF capacitor, connected through a switch. | *10 pF, through a switch* | Next |
| 7 | `s7-acquire` | p6 *"Now the timing strip underneath. The switch closes…"* | The switch closes: for the 1 µs acquisition window the capacitor charges towards the input. | *switch closed · acquire* | Next |
| 8 | `s8-hold` | p6 *"The switch opens: the capacitor holds that voltage…"* | The switch opens: the capacitor holds its voltage for the 1 µs the converter works on it. | *switch open · hold and convert* | Next |
| 9 | `s9-closes-again` | p6 *"Then the switch closes again for the next sample."* | The switch closes again: the next sample's window opens. | *closed again · next sample* | Next |
| 10 | `s10-charging-path` | p7 *"So the source is not feeding a steady resistance…"* | The source charges the capacitor through its own 10 kΩ and the switch's 1 kΩ. | *charged through 10 kΩ + 1 kΩ* | Next leads to card 2 |

s3 lands on a clause of p4's second sentence: the PLAN's *one step per element* puts R_on on its own step, and the Flow
names it in the same sentence as the switch. The presenter presses Next at the comma.

### 4b. Motion, cues and stills per step

| # | Motion (Draw entries, M59d) | Movers | Cue and its second channel (B6) | Hold | Reduced motion (C3) | Still (B4) |
|---|---|---|---|---|---|---|
| 0 | `src`, `rs`, the wires and `pin` trace (supply first, round to the pin); `chip` traces; labels arrive | 1 at a time | the trace runs from the source to the pin, then the chip's outline | hold | whole | the source at the pin |
| 1 | `bond`, `pad` trace; *pad* arrives | 1 | the bond wire ends on the pad | hold | whole | the pad |
| 2 | `sw-contacts`, `sw-open`, `mux-others` (thin) trace; labels arrive | 1, then 1 | the main switch first, the faint channels after it | hold | whole | the switch |
| 3 | `ron` traces; its label arrives | 1 | the body drawn in line after the switch | hold | whole | R_on |
| 4 | `cs` traces: wire, node, plates, earth; its label arrives | 1 | the trace turns down from the node to the plates | hold | whole | C_s |
| 5 | `cmp` traces; `conv` traces thin; labels arrive | 1, then 1 | the comparator's + input traced from the C_s node | hold | whole | the inside of the pin, whole |
| 6 | `reveal-frame` traces; its words arrive | 1 | the frames close round the switch and C_s together | hold | whole | the reveal |
| 7 | `axes`, `axis-title`, `slow-note`, `input` trace; `sw-open` hidden, `sw-closed` drawn; `band-acq1` wipes in (or appears); `vc-acq1` traces `by: x` | 2 (the blade, the curve) | the blade closes as the curve starts; the band's words name it | hold | whole | acquire |
| 8 | `sw-closed` hidden, `sw-open` drawn; `band-hold1` appears; `vc-hold1` traces `by: x` | 2 | the blade lifts as the flat line starts | hold | whole | hold and convert |
| 9 | `sw-open` hidden, `sw-closed` drawn; `band-acq2` and `now-line` appear | 1 | the blade closes again; the band's words | hold | whole | closed again |
| 10 | `path-frames` trace; their words arrive | 1 | the frames round Rₛ and Rₒₙ, with C_s's still up | hold | whole | the charging path |

Eleven stills, one per step (more than B4's 3–7: the PLAN's *one step per element* sets five of them; print groups them,
§10). Nothing flashes. The blade's swap is a `hide` and a `draw` at the step's start (instant without M59n's exits; §12).
Time scale: s7 and s8 trace 1 µs each in the same time, the strip's *slowed* note giving the factor (A5).

## 5. Pacing and interaction, by surface and view

**Who paces** (B12): the presenter on the wall; the learner in Study Mode and Scope.

| View | Who | Controls |
|---|---|---|
| Preview (in the slide) | everyone | Back · Next · *step n of 11* · Replay |
| View (details) | everyone | the step list with each `say`; zoom to `inside`, `strip`; *Home*; the Symbols switch (IEC \| US, §12) |
| Edit (session only) | everyone | ink, a pinned note (X6; not yet specified for the Draw Bench) |
| Authoring | authors | the Draw editor; the steps and `say` lines in the file |

- **The presenter's strip** (B20): the next step's `say`; at s0 the reminder *the poe has closed; s6 is its reveal*; at s3
  *Next at the comma: R_on is a clause of the switch's sentence*; the teacher tip (§7d).
- **Study and Scope**: the learner steps; the poe is answered before the statement card, so the drawing needs no lock.
- **Phone** (C6): portrait, the two framings stacked, `inside` above `strip`, each fit to the width; the step's `say`
  under them; two fingers zoom and pan, one finger does nothing on the stage. If the viewer cannot stack framings, the
  whole artboard at the width with two-finger zoom (§12).
- **Locked**: nothing on the drawing. No sliders on this card (the Draw Bench has none; card 2's Plot carries the
  sliders, side by side as the owner's rule asks).

## 6. The frame

The Draw Bench's frame (M59). Identity bar: *The ADC input is a switch and a capacitor · ● Holding · step n of 11*. Legend
card: *teal: switch closed, acquiring · amber: switch open, holding · azure: the input · violet: what the source sees*;
*IEC symbols · a model of the input: protection diodes and pin capacitance omitted · time slowed about 1 500 000 × on the
strip*. Tools used: steps, zoom, *Home*, the step list.

| Tile / panel | Used? | Selected item (one large value) | List / contents |
|---|---|---|---|
| Steps | yes | *step n of 11* | the eleven `say` lines |
| Views | yes | *Home* | `inside`, `strip` |
| Symbols (bench-level) | yes, once built (§12) | *IEC* | IEC · US |
| Others (Parts, Section, Cues, Compare, Explore, Ask) | no | — | Draw has none of them; the poe is the card's activity |

## 7. Thinking, not watching

- **7a. The PLAN's ASK** (verbatim): *poe (before the statement) — "To your divider, what does an MCU's ADC input look
  like?" options: nothing — it draws no current | a large resistor, like a meter | a small capacitor, connected for a
  moment and then let go | a current source · answer: a small capacitor, connected for a moment and then let go · reveal:
  the Draw sequence below. · explain: The converter holds its sample on a capacitor of a few picofarads, connected through a
  switch for a short window, and the source has to charge it to the input every time, from wherever it was last left. · depth: understand · practice: developing
  models.* It fires at p2, **before the bench** (the poe card sits before the statement card); the build s0–s5 leads to it,
  and **s6 reveals it** with p5's `[[reveal]]`, as the PLAN's *reveal: the Draw sequence below* and the Flow agree.
- **7b. Prediction points on the bench**: none beyond the poe.
- **7c. After the reveal**: the PLAN's explain. In Study, done means the poe answered and s10 reached.
- **7d. Teacher tip** — **Proposal** (F8): *Expect "nothing — it draws no current": a CMOS input draws almost nothing at
  DC, and a meter's 10 MΩ trained the room to think of inputs as resistances. Ask: when the switch closes on an empty
  10 pF through 11 kΩ, what current flows at that instant? 1.65 V ÷ 11 kΩ = 150 µA, for a few hundred nanoseconds, every
  time the capacitor starts from somewhere else.*
- **7e. Explore** (B11): none on the drawing; the learner varies R_s, C_s and the window on card 2's Plot.

## 8. Faithfulness (the quality bar)

**Arithmetic** (the course's models, `course-accuracy.md` §3: 12 bits, 3.3 V, truncating, code = ⌊V / LSB⌋; R_on 1 kΩ;
C_s 10 pF; 1 µs window; 1 µs of conversion; the capacitor starts at 0 V when unstated and keeps its charge):
- LSB = 3.3 / 4096 = **0.8057 mV**. The input: 1.65 / 0.8057 mV = 1.65 × 4096 / 3.3 = **2048.000 LSB**: exactly on the
  2047|2048 edge (ACCURACY D1·070-F5).
- τ = (R_s + R_on)·C_s = (10 kΩ + 1 kΩ) × 10 pF = **110 ns**. The window: 1 µs / 110 ns = **9.09 τ**; e^(−9.091) =
  **1.127 × 10⁻⁴**.
- s7, one sample from 0 V: held v_C = 1.65 × (1 − 1.127 × 10⁻⁴) = **1.649814 V**; shortfall 1.65 × 1.127 × 10⁻⁴ =
  **0.186 mV = 0.231 LSB** (2048 × 1.127 × 10⁻⁴); 2048 − 0.231 = 2047.769, truncating to **2047** (not shown, F3). Card 2's
  *"0.23 LSB short"* at 10 kΩ ✓ (its PLAN, F7).
- On the strip: 1 µs = 346.67 units, τ = 38.13 units; the curve reaches 63.2 % at 1 τ (x 148), 99.3 % at 5 τ (x 301), and
  98.9 % at 0.5 µs (x 283). The held line sits 0.231 LSB × 0.8057 mV × 170 units/V = **0.03 units** under the input line:
  drawn true, it reads as on it, which is the card's honest picture (*connected for a moment* is enough to look settled);
  the shortfall is card 2's zoom.
- The cycle: 1 µs + 1 µs = 2 µs a sample, **500 kS/s** (card 7 p5 ✓).
- s10 and the teacher tip: the charge to fill the capacitor from 0 V, Q = C·V = 10 pF × 1.65 V = **16.5 pC**; the current at
  the instant the switch closes, 1.65 V / 11 kΩ = **150 µA** (the approved preview's gate report ✓), falling by e each
  110 ns.
- **The approved preview's run (F1, option b)**: three samples of the one channel, the capacitor keeping its charge.
  Sample 1 as above (2047). Sample 2 starts at 1.649814 V: shortfall 0.231 × 1.127 × 10⁻⁴ = **2.6 × 10⁻⁵ LSB**, 2047.99997,
  on the edge (*2047 or 2048*, F5's wording; strictly ⌊·⌋ = 2047); the source supplies 10 pF × 0.186 mV = **1.9 fC** instead of
  16.5 pC. Sample 3: **2.9 × 10⁻⁹ LSB** short, on the edge.
- **Option c (F1)**: a grounded channel sampled between: τ = 1 kΩ × 10 pF = 10 ns, 100 τ in 1 µs, v_C = 1.649814 ×
  e^(−100) = **6 × 10⁻⁴⁴ V**, code 0; the channel's next sample starts from 0 V and repeats sample 1 (2047).

**Sources** (cited here only; nothing branded on the bench): a 12-bit MCU SAR converter's input of about 1 kΩ and 8 pF and
a 1 µs conversion at a 14 MHz ADC clock (STM32F103 datasheet, ADC characteristics, R_ADC ≤ 1 kΩ, C_ADC ≤ 8 pF); a sample-
and-hold capacitor of 14 pF behind 1–100 kΩ (ATmega328P datasheet, *Analog input circuitry*). *"Like most"* (p1): a SAR
converter samples on a capacitor by construction (in most, the capacitor array of its D/A); a microcontroller converter
without a sample-and-hold is not a current class.

**A6 checks on the Flow's words** (not raised): *"typically somewhere around a kilohm"* (1 kΩ class above ✓); *"a few
picofarads, and we will use 10 pF"* (8 pF and 14 pF above: 10 pF sits between; *a few* is loose and the model value follows
at once); *"connected for a moment"* (1 µs; at the full 500 kS/s that is half of every 2 µs, still a moment to the room).
*"we met it in 040 with a voltmeter"* ✓ (D1·040, *Loading: the measurement changes the measurand*).

**Section D, Draw rows**
- [x] Proportions: a schematic, no scale; IEC 60617 symbols (D12.4–D12.10); the chip and the board side are context, not
  to scale (a schematic says so by its kind; no part is drawn as an object).
- [x] Line types: `outline` for conductors and parts, `thin` for context (other channels, the conversion), `hidden` for the
  chip's outline, the input line and the frames; no construction layer.
- [x] Curves: `vc-acq1` from its equation, v_C(t) = 1.65·(1 − e^(−t / 110 ns)), as a `function`; `vc-hold1` a line.
- [x] Every `say` matches its Flow paragraph (§4a).
- [x] Numbers on the drawing recomputed above: 1.65 V, 10 kΩ, 1 kΩ, 10 pF, the 0–3 µs and 0–2 V axes, the held line.

**Section D, Electronics rows** (the drawing shows a circuit's values): the source is ideal behind 10 kΩ and labelled as
seen from the pin; the switch, R_on and C_s are the course's model values (sourced above); the comparator's other input is
drawn (F4), so the circuit is complete at block level; omissions labelled (*protection diodes and pin capacitance
omitted*).

**A1–A8**: A1 ✓ (values sourced above); A2 ✓ in part: the shortfall exists and is drawn true (invisible at this scale,
card 2 zooms it); the non-ideal effects of §9 are labelled omissions; A3 ✓ (IEC symbols; a schematic); A4 n/a (no
instrument); A5 ✓ (a real µs axis and the slowing stated on the strip); A6 ✓ (*protection diodes and pin capacitance
omitted*; *MUX + sample switch* as one switch with one R_on; *the source, seen from the pin*; the legend's *a model of the
input*); A7 — two findings (F1, F2), open; A8 ✓.

**Six gates, this spec** (`.claude/standards/six-gates.md`): (1) realism: pass at schematic level, stated (IEC, real model
values, sourced); (2) science: pass, with F1 and F2 open for the owner; (3) maths: pass, every number recomputed in Node
above; (4) visualization: pass, the switch's state and the strip's phase change together on every step, one scale per band,
the true (invisible) shortfall left to card 2's zoom; (5) consistency: one meaning per colour (amber no longer doubles as
emphasis), values as cards 2, 3 and 7; F1 and F2 are the consistency findings; (6) design: label positions from the
approved preview, checked for collisions on paper; French drafted, to be checked rendered (§10).

## 9. Faults and non-ideal behaviour

**PLAN FAULT**: none on this card (card 2's PLAN carries the back-to-back fault). What the real input does that the drawing
leaves out, each labelled or left to a later card:

- **Protection diodes and pin capacitance**: omitted and labelled (*protection diodes and pin capacitance omitted*); no
  number on this card depends on them.
- **Charge injection and kickback**: when the switch closes, the capacitor's charge kicks the pin; card 8 (the buffer's
  recovery) names it. Not drawn here.
- **R_on varies with the input voltage** (a CMOS switch): modelled as a fixed 1 kΩ, as the course's model; the label says
  *Rₒₙ 1 kΩ*, the model's value.
- **Droop while holding**: with 100 pA of switch leakage (illustrative), 100 pA × 1 µs / 10 pF = 10 µV = 0.012 LSB in the
  1 µs of conversion: negligible, not drawn.
- **The capacitor as the converter's own D/A array**: in many converters the sampling capacitor is the D/A's capacitor
  array, not a separate part beside the comparator; the drawing shows the textbook separate sample-and-hold. **Proposal**
  (F7): say so on the legend (*a model of the input*).
- **Signal effects** (the current into C_s, its direction and decay): not drawn here (a drawing shows state; circuit
  signal effects are the bench's, owner 2026-10-20). Stated as the need for the Electronics version (X1): 150 µA into C_s
  at the instant the switch closes from 0 V, falling with τ = 110 ns, zero while holding.

## 10. Accessibility, legibility and print

- Wall (C2): labels in role `label`, notes in role `note`, at the Canvas's floor, 7:1. Check at 1920 × 1080 and
  1024 × 768 that *MUX + sample switch* clears the open blade's tip (label baseline y 62, blade top y 78), that *pin* and
  *pad* stay apart (centres 63 units apart), that *the conversion: D1·080* clears the SAR logic box and *D/A*, that the
  violet words at y 296 clear *other channels* (y 238) and the omission note (right half, y 298), and that the band words
  fit inside their 346-unit bands in French (*interrupteur ouvert · maintien et conversion* is the longest; wrap, never
  shrink).
- Reduced motion (C3): every step lands whole; the switch's state and the strip's phase are read from the still and its
  `say`.
- Colour (C4): teal and amber each carry geometry and words; azure is dashed and labelled; violet frames are dashed and
  labelled; the drawing reads in greyscale.
- Keyboard (C5): → ← R.
- Print (C8): four stills with their `say` lines: s0 (the source at the pin), s5 (the inside, whole, with s1–s5's `say`
  listed), s6 (the reveal), s9 (the strip, with s7–s9's `say` listed); s10's `say` under s9.

## 11. Assets to make or source

| Asset | Format | Made by | Status |
|---|---|---|---|
| `adc-input-inside-the-pin.benchdrawing`: two bands, eleven steps (§3, §4), IEC set; the US set as a second group per symbol when the Symbols switch exists | Draw library | the author (written as a file or imported from SVG, `draw-bench-status.md` §4) | to make for Saturday |
| `vc-acq1` as a `function` item from §3's equation | inside the library | the author (`insight-draw shape`) | to make |
| The French strings (§3) and the eleven `say` lines | inside the library, once Draw text takes `{en, fr}` (§12) | the author (drafts), the owner (review) | drafted (§3) |
| The `drawing` block on the statement card (title, `alt`, `caption`, `{en, fr}`) | `en.md` | the author | to write |

## 12. Bench capabilities this needs

**Draw Bench**:
- **exists**: the format (M59a); steps with `say`, cumulative `draw` / `hide` (M59a); traces on the wall in sync (M59d);
  `function` shapes (M59p); zoom and pan in Study and Scope (M59e-iii); Import SVG (M59b).
- **to confirm**: (a) that a `hide` at a step's start removes the open blade on the wall (an instant change; exits are
  M59n); (b) that a trace measured `by: x` plays on the wall (stored since M59m; if only *by length* plays, the curve's
  steep start takes most of its trace time and misstates the time axis: then trace the 0–1 µs curve as two items, the rise
  to 5 τ and the flat remainder, each timed to its share of the µs); (c) that s7 and s8 can be given the same trace
  duration per µs, so one slowing factor holds (A5); (d) whether the Canvas can show s0 while the poe card is up (F9);
  (e) a stacked portrait layout of two framings on a phone; if not, the whole artboard with two-finger zoom.
- **planned (M59n)**: `wipe` entries for the bands (until then they appear); exits for the blade's swap.
- **missing (request it)**: **text in `{en, fr}` inside a `.benchdrawing`** (item text and `say`): today plain strings,
  so the library is English only; every library is bilingual from the start (owner, 2026-10-08). New: goes to Benches as
  a crossing when the course needs it.
- **missing (request it)**: **the bench-level Symbols switch (IEC | US)** (owner, 2026-10-20): the viewer's setting,
  remembered per viewer, choosing which of a drawing's two symbol groups shows; one switch for the Draw, Electronics and
  Breadboard benches. New: a crossing to Benches.
- **planned (M59 spec §6)**: maths in a label (subscripts R_on, C_s, R_s, v_C); until then Unicode subscripts and words
  (§3).
- **requested (X2)**: `steps:`, `layers:` and `focus:` on the fence, so card 5 can reuse this file's MUX, capacitor and
  converter layers; **(X6)** the Edit view.

**Not this bench's**: the live circuit (the switch closing on a clock, the current into C_s, the code) is the Electronics
Bench's ADC-input block (**X1**, to raise), and its signal effects are that bench's to draw; the shortfall in LSB and the
sliders are card 2's Plot.

## 13. Stand-in for the lecture

None needed: the drawing plays all eleven steps today. What is lost until §12's items land: without `by: x`, the curve's
trace timing (fixed by the two-item fallback in §12 b); without the Symbols switch, IEC only (the default, so nothing the
room needs); without `{en, fr}` text, English only (French is required before the library ships, gate 6). The approved
preview (`bench-work/previews/u016-preview.html`, card 1) can be shown in its place if the drawing is not made in time; it
plays the three-sample run of F1 (b), so the presenter stops it after its first sample.

## 14. Findings for the owner

- **F1 — accuracy (the approved preview's strip against p7).** The preview runs three samples of one channel from a steady
  1.65 V, the capacitor keeping its charge (the course's model). Samples 2 and 3 then start almost on the input: they need
  1.9 fC instead of 16.5 pC and end 2.6 × 10⁻⁵ and 2.9 × 10⁻⁹ LSB short (§8), so the curve lies flat. The very next words
  the room hears (p7) are *"Every sample, it has to fill a capacitor"*, over a strip that shows two samples needing none; and
  the flat second sample is card 3's last point (*"the capacitor starts each sample from the last one, so the error nearly
  disappears"*), shown three cards early and unexplained. This spec's §4 therefore stops the strip where the PLAN does:
  *closed (acquire), open (hold and convert), closed again*, ending as the next window opens. Options: **(a)** the PLAN's
  strip, one sample and the next window opening (**recommended**; §3–§4 written so; nothing contradicts p7, and card 3 keeps
  its point); **(b)** the approved three-sample run, with p7 reworded (F2 b); **(c)** a grounded channel sampled between
  (A0, then A1 at 0 V, then A0 again from 0 V): every A0 sample fills from 0 V, matching p7 and card 2's *"the previous
  channel was at ground"*, at the cost of the MUX's selection (card 5's idea) arriving early, a strip of 6 µs, and an
  unscripted line (+0.1 min).
- **F2 — accuracy (the owner's text: p7 and the PLAN's explain).** p7's *"Every sample, it has to fill a capacitor"* and the
  explain's *"the source has to charge it every time"* hold when the capacitor arrives from another voltage (another
  channel, as card 2's start from ground), but under the course's own model (the capacitor keeps its charge) a channel
  converted back-to-back at a steady input needs almost no charge, which card 3 p5 then says. Options: **(a)** keep: card 3
  qualifies it three cards later, and *fill* reads as *top up* (the owner rules it not misleading); **(b)** reword p7, e.g.
  *"Every sample, it has to charge that capacitor to the input, from wherever it was left, through the switch and through
  its own output impedance."*, and the explain to match (**recommended**: card 3's back-to-back case then follows from card 1
  instead of correcting it); **(c)** add *"whenever another channel was sampled in between"* to p7.
- **F3 — Proposal: no code on card 1's strip.** The preview wrote the codes after each conversion (2047, then 2047|2048
  twice). Under F1 (a) there is one conversion, and its code would be 2047 for an input of exactly 2048.000 LSB (0.231 LSB
  short, truncating): true, but the Flow says nothing of codes here, and why it is 2047 is cards 2 and 3's. Leave codes off
  (**recommended**; the strip's hold band says *hold and convert*), or show *2047* in the code box after s8?
- **F4 — Proposal: the conversion as thin context.** The PLAN ends at *→ comparator*; a comparator drawn with one input is an
  incomplete circuit (A5). This spec draws its − input from a D/A and the SAR logic, `thin`, with *the conversion: D1·080*,
  and no code box. Keep (**recommended**), the comparator alone with its − input labelled *from the converter's D/A*, or the
  preview's full-ink chain with the code box?
- **F5 — Proposal: the source on the board.** Drawn as its Thévenin equivalent, 1.65 V behind 10 kΩ, labelled *the source,
  seen from the pin* rather than *your divider*: 10 kΩ is card 2's case (a 20 kΩ / 20 kΩ divider on 3.3 V), while D1·040's
  thermistor divider is 5 kΩ and card 3's are 0.5 kΩ and 50 kΩ. Keep (**recommended**: the same source card 2 runs next),
  draw the 20 kΩ / 20 kΩ divider itself, or use the thermistor's 5 kΩ?
- **F6 — Proposal: two cues beyond the PLAN's Drive, in violet.** s6 frames the switch and C_s with *10 pF, through a switch*
  (the reveal's cue); s10 frames Rₛ and Rₒₙ with *charged through 10 kΩ + 1 kΩ* (p7's path, a static cue, not a current
  display). Violet replaces the preview's amber for emphasis so amber means only *open, holding*. Keep both
  (**recommended**), or hold s5 and s9 instead (9 steps)?
- **F7 — Proposal: the legend's model label**, *a model of the input: in many converters the sampling capacitor is the
  converter's own capacitor array* (§9). Take (**recommended**: D1·080's SAR uses the classic picture, and this keeps the
  drawing honest for those who know the charge-redistribution converter), or leave it to D1·080?
- **F8 — Proposal: the teacher tip** (§7d).
- **F9 — To decide with the product: s0 during the poe.** The preview showed the source, the pin and the closed chip from
  p0, beside the question. In the EAC the poe before the statement is its own card, so here the drawing starts at p4. If the
  Canvas can hold s0 beside the poe card (§12 d), show it from p0 (**recommended**: the question is then asked of the drawn
  pin), and the card's bench minutes become 3.0.
- **Reported (F3 of the brief, decided: leave it).** This card is 3.0 min (the preview's estimate was 3.3); the module's
  total is `D1-070-02-charge-in-time.md` §2. Eleven steps exceed B4's 3–7 stills: the PLAN's one step per element sets five;
  print groups them into four (§10).

**Decided 2026-10-20** (owner, in the course's chat; ACCURACY D1·070-F11): **F1 (a)** the strip as the PLAN draws it: one sample from 0 V, then the switch closing again (§3–§4 as written); the page's three samples of one channel are withdrawn. **F2 (b)**: p7 is now *"Every sample, it has to charge that capacitor to the input, from wherever it was last left, through the switch and through its own output impedance."* and the PLAN's explain *"…the source has to charge it to the input every time, from wherever it was last left."* p7 is now 26 → 31 words (+0.04 min). F3–F9 (proposals) are open for the owner; nothing in them blocks.

## 15. Acceptance: how we know it is built right

- The eleven steps of §4a play on the wall, the presenter's window and Study Mode, each holding, with the values of §3 and
  §8; the switch's blade is open at s2–s6 and s8, closed at s7 and s9–s10; the strip's band words and the blade agree at
  every step.
- The strip: the time axis 0–3 µs at 346.67 units per µs, the voltage axis 0–2 V at 170 units per V; `vc-acq1` passes
  63.2 % of 1.65 V (1.043 V, y 602.7) at x 148.1 and 99.3 % at x 300.7; `vc-hold1` at y 499.53 from x 456.7 to 803.3; the
  strip ends at x 803.3 with the switch closed. The *slowed* note states the factor the bench plays (a 1 µs segment traced
  in t s reads *slowed about t × 10⁶ ×*), the same for s7 and s8.
- No code on the strip (unless F3 decides otherwise); no charge dots or glows anywhere.
- B1 one element or phase per press; B2 only the new element traces; B3 s0 labelled, each element labelled as it lands; B4
  eleven stills, four printed; B5 each `say` on the strip; B6 each trace ends on the element the Flow names, the blade and the
  curve change together at s7 and s8; B7 at most two movers (s7, s8); B8 nothing flashes; B9 the poe fires before s0 and s6
  reveals it; B10 the explain after s6; B13 key terms and values only; B14 values beside their parts; B15 board, then chip,
  then strip; B16 values readable as text; B17 switch and strip visible together from s7; B20 the strip's reminders and
  tip.
- C2 legible at 1920 × 1080 and 1024 × 768, both languages, the collisions of §10 checked; C3 whole steps; C4 greyscale and
  the three colour-blind simulations; C5 → ← R; C6 the framings at 320, 768, 1200, 1440, 1920; C8 the four stills with their
  `say`.
- IEC by default; the US set on the Symbols switch once it exists, every label clear in both sets; English and French both
  rendered once Draw text takes `{en, fr}`.
- E1–E6 for the drawing as presented; checked on the lecture laptop before Saturday, both themes.
