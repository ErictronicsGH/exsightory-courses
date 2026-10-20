```yaml
id: D1-010-05-measurement-path
card: "The path a measurement travels"
module: notes/Day01/010-mcu-reads-2047/en.md
bench: Draw                       # the target, and it exists (M59): a picture built up step by step
library: "course-path: the course path drawing (`course-path.benchdrawing`, the master), played here as its variant `course-path-010-build.benchdrawing` (§3, §13)"
dimensions: 2D
stand_in: none                    # the Draw Bench exists; everything this card needs plays on the wall today (§12)
optional_benches: []
real_thing: "a temperature measurement chain (thermistor, divider, ADC, MCU, firmware, display) as a block diagram: not to scale, labelled so"
minutes: 2.1                      # on the bench: the drawing is up for the whole card
card_minutes: 2.1                 # +0.25 with the optional domain step (s8, §14 F3)
status: spec-ready                # decided 2026-10-08; F3–F5 open
learner_action: none
predictions: []
seeds: []
key_variable: "the form the information takes at each arrow, while the quantity stays the same"
time_scale: "none (traces only; nothing in the real thing is being timed)"
steps: 10                         # s0–s9; s7 and s8 are proposals
```

This spec also carries the **design of the course path library**, the most-used drawing in the course
(the cards that reuse it: `draw-bench-status.md` §3C). Cards 4, 6 and 7 of this module play variants of
it (`D1-010-04-three-places.md`, `D1-010-06-adc-does-not-know.md`, `D1-010-07-number-not-earned.md`).

## 1. What the room must understand

- **Statement** (verbatim): *Temperature → resistance → voltage → ADC code → binary data → software
  variable → 27.4 °C. The quantity does not change along the way. How it is represented does, at every
  step.*
- **SHOW** (verbatim from the PLAN): *Draw — the course path built arrow by arrow: Temperature →
  Resistance → Voltage → ADC code → Binary data → Software variable → 27.4 °C, each arrow flashing as a
  change of form (a domain boundary, except Resistance → Voltage, which stays analog electrical; owner,
  2026-10-08). This is the persistent path diagram: every later module re-embeds it with a focus on
  its own stage.*
- **Drive** (verbatim): *one step per arrow; all the boundaries flash together on "every boundary … can
  be spoiled".*
- **Look for** (verbatim): *the quantity never changes; its representation changes at every arrow.*
- **Status** (verbatim): *needs Draw: the course path drawing (course-wide asset). The domain table, if
  shown, has to be an SVG (tables are dropped on the wall).* And the card's note: *Time: the table is
  optional live; the chain above carries the idea.*
- **Bench and library.** The **bench** is the Draw Bench (M59: the viewer on the wall, Study Mode and
  Scope, steps with `say`, traces, zoom, the editor). The **library** is the course path drawing; this
  card loads its variant `course-path-010-build`.
- **Insight**: *one temperature takes seven forms on its way to the screen, and every change of form is a
  place where the information can be spoiled.*
- **Kind of knowledge**: *a picture built up* (a chain, arrow by arrow). Card test → **Draw**. B15 does not
  apply (one chain, not subsystems); B17, B18, B19 do not.
- **Why this bench, not a still**: the chain is built one arrow per spoken word, so the room meets each
  form once, in order, and sees the whole chain only after it has been walked. A still shows all seven
  at once and the order is lost.
- **Key variable**: the form at each arrow.

## 2. Time

The Flow is 264 words; p7 *"(Table on the script panel: Domain · Example.)"* (8) is a direction, not
spoken: **256 spoken = 1.97 min**.

| Beat | Minutes | Source of the number |
|---|---|---|
| s0 *Temperature* appears; Flow p0–p2 (16 + 59 + 7 = 82 words) | 0.63 | 82 ÷ 130 |
| s1–s6, one press per arrow, over Flow p3 *"Temperature → Resistance → …"* (17 words), spoken one form per press | 0.28 | 17 ÷ 130 = 0.13, plus ≈ 1.5 s per press waiting on its trace (6 × 1.5 s) |
| s7 (proposal) held: Flow p4 *"The information about temperature…"* (29) | 0.22 | 29 ÷ 130 |
| s8 (optional proposal) or s6/s7 held: Flow p5 *"Each of those forms…"* (65), p6 *"A data domain…"* (21) | 0.66 | 86 ÷ 130 |
| s8's domain names read (optional, ≈ 30 words) | (+0.25) | estimate |
| s9 *every boundary*: Flow p8 *"These domains are not rigid…"* (42) | 0.32 | 42 ÷ 130 |
| **Card total / of which on the bench** | **2.1 / 2.1** | +0.25 with s8 |

The long paragraphs (p1, p5–p6, p8) all fall on held states (B13). **Module check**: D1·010 overruns
its 15 min by ≈ 5.7 min (card-by-card table in `D1-010-01-confidently-wrong.md` §2). This card's share is
its Flow plus 0.12 min.

## 3. The scene: what is on the bench

### 3a. The course path library (`course-path.benchdrawing`, the master)

One drawing, several **lanes**, each on its own layer, so every module can show the lanes it needs.
**Forms** are nodes; **stages** are what turns one form into the next, so they sit on the arrows. The
two views the course uses (card 5's chain of forms; the PATH comments' chain of stages) are then one
drawing (§14 F1).

Artboard **1600 × 900** drawing units (16:9). Ink names from the Draw palette (D12.15), never hex.

| Layer | Items (stable ids) | What | Used by |
|---|---|---|---|
| `forms` | `f-temperature`, `f-resistance`, `f-voltage`, `f-code`, `f-binary`, `f-variable`, `f-number`; arrows `a1`–`a6` | seven rounded boxes (170 × 110, corner 16, `contrast` outline, `faint` fill), left edges at x = 40 + 225 i, centred at y = 560; labels in role `label`, at most two lines (*Software / variable*); arrows `outline` with an `arrow` end between them | card 5; 6 (with values); 7 (ghosted) |
| `boundaries` | `b1`–`b6` | a short `hidden` (dashed) tick across each arrow, 150 tall | card 5 |
| `boundaries-lit` | `bl1`–`bl6` | the same ticks in `amber`, `outline` weight, with one label `bl-say`: *every boundary: a place to spoil it* | card 5 s9 |
| `invariant` (proposal) | `inv`, `inv-say` | a thin bracket over all seven nodes, label *one temperature, seven forms* | card 5 s7 |
| `domains` (proposal) | `d1`–`d7` | the domain under each node, role `note` (the script panel's table, drawn: §8) | card 5 s8 |
| `stages` | `s-quantity`, `s-sensor`, `s-conditioning`, `s-adc`, `s-firmware`, `s-number`; leaders `sl-*` | six stage boxes **evenly spaced in their own lane** (230 wide, pitch 260, from x = 35), with arrows between them; a `thin` dashed leader from each stage to what it acts on in the forms lane: QUANTITY → `f-temperature`, SENSOR → `a1`, CONDITIONING → `a2`, ADC → `a3`, FIRMWARE → `a4`, `a5`, `a6`, NUMBER → `f-number` (revised after the render, 2026-10-08: stages placed *over* their arrows collide, QUANTITY with SENSOR and FIRMWARE with NUMBER) | cards 4, 6, 7; every later module (it grows: §3c) |
| `stage-blanks` | `sb-*` | the six stage boxes empty (outline only, no text) | card 7 |
| `eye` | `e-object`, `e-eye`, `e-nerve`, `e-brain`, `e-seen` | the eye's stages as line art on a lane above the stage lane, each over its stage box: the jar over QUANTITY, the eye over SENSOR, the nerve over CONDITIONING, the brain over ADC + FIRMWARE, *what we see* over NUMBER | card 4 |
| `brackets` | `k-organ`, `k-pathway`, `k-processor` + labels | three brackets spanning the eye lane and the stage lane: organ ↔ sensor, pathway ↔ conditioning & wiring, processor ↔ ADC & firmware | card 4 |
| `spoiled` | `x-organ`, `x-pathway`, `x-processor`, `x-sensor`, `x-wiring`, `x-converter` | a neutral card with the words *Spoiled here* and a ⚠ glyph, one per stage; **never red** | card 4 |
| `values-010` | `v-temp-25`, `v-volt`, `v-code`, `v-number-25`, `n-1`–`n-7` | 25 °C, 1.65 V, 2048, 25 °C on the forms; the seven things the converter needs, hung under the arrows they belong to | card 6 |
| `ghost` | `g-*` | `construction`-type copies of the forms lane (thin, faint), for focus and for the blank | cards 6, 7 |

At most **two lanes are shown at once** (eye + stages; stages + forms; forms + values), so each lane gets
half the artboard's height and its labels stay at the wall's size. **To check when drawn**: every label
reaches the wall's type floor at 1920 × 1080 and 1024 × 768 (the compiler warns, D12.16). If the
seven-node row cannot reach it, the forms lane wraps after `f-code` (a two-row path, the arrow `a4`
turning down), and §14 F4 asks the owner first.

### 3b. What this card shows (`course-path-010-build`)

Layers `forms`, `boundaries`, `boundaries-lit` (and `invariant`, `domains` if F2, F3 are accepted).
Nothing from the stage, eye or value lanes.

**Meet the parts** (B3): a chain has no parts to meet before it is built; s0 is the first node alone, and
each step introduces one form as it is drawn (the `say` names it).

**Values beside their element**: only *27.4 °C* (in `f-number`). No other number on this card.

**Labels**: the node's own text; no leaders (nothing moves).

**Colours and their second channel** (C4):

| Thing | Ink | Second channel |
|---|---|---|
| Forms and arrows | `contrast` | — |
| Boundary ticks | `contrast` | `hidden` (dashed) line type |
| Boundaries lit (s9) | `amber` | `outline` weight (thicker) and the label *every boundary: a place to spoil it* |
| Invariant bracket (proposal) | `teal` | `thin` line and its label |
| Domain names (proposal) | `contrast` | role `note`, under the node |

### 3c. How the library grows through the course (from the PATH comments)

D1·040 adds SOURCE & LOADING between SENSOR and CONDITIONING; D1·070–090 split ADC into ADC INPUT,
CONVERSION, REFERENCE; D2·010 adds DIGITAL INTERFACE over `a4` (exactly where *ADC code → Binary data*
crosses the chip's boundary); D2·040–050 split FIRMWARE into *filter → calibrate → scale* over `a5`–`a6`;
D2·090 and D3·010 put *wiring and returns* and *probes & wiring* on the arrows. Each is a new item in the
`stages` layer, so earlier variants never change. **Adding a stage re-spaces the stage lane** in that
module's variant (six boxes fit 1600 units at pitch 260; eleven need pitch ≈ 140 or two rows), so later
variants carry their own spacing; the forms lane and every leader's target stay where they are. The
render (`bench-work/previews/`) is the check: each later module's variant is rendered before it is made.

## 4. The run: step by step, as the Flow goes

### 4a. Steps

| # | id | Flow paragraph (first words) | What changes: the step's one sentence (B5; the `say`) | Overlay | Presenter's control |
|---|---|---|---|---|---|
| 0 | `s0-temperature` | p0 *"Modern engineering systems…"*, p1, p2 | A temperature, in the physical world: where the path begins. | — | Next appears the bench |
| 1 | `s1-resistance` | p3 *"Temperature → Resistance"* | A sensor turns the temperature into a resistance: the first change of form. | — | Next |
| 2 | `s2-voltage` | p3 *"→ Voltage"* | A circuit turns the resistance into a voltage. | — | Next |
| 3 | `s3-code` | p3 *"→ ADC code"* | The converter turns the voltage into a code. | — | Next |
| 4 | `s4-binary` | p3 *"→ Binary data"* | The code leaves the converter as binary data. | — | Next |
| 5 | `s5-variable` | p3 *"→ Software variable"* | Firmware reads the data into a variable. | — | Next |
| 6 | `s6-number` | p3 *"→ 27.4 °C"* | Software turns the variable into 27.4 °C on a display. | — | Next |
| 7 | `s7-same` **Proposal** | p4 *"The information about temperature…"* | One temperature throughout; seven forms on its way. | *one temperature, seven forms* | Next |
| 8 | `s8-domains` **Proposal, optional** | p5 *"Each of those forms…"*, p6 | Each form lives in a domain: physical, analog electrical, digital data, digital electrical, software. | the seven domain names | Next (skippable) |
| 9 | `s9-every-boundary` | p8 *"These domains are not rigid…"* | Every boundary between two forms is lit together: each is a place where the information can be spoiled. | *every boundary: a place to spoil it* | Next leads to card 6 |

The `say` lines for s1–s5 name the stage that does the change (*a sensor*, *a circuit*, *the converter*,
*firmware*), from the Flow's own p1 (*"A sensor responds… Another circuit… An analog-to-digital converter
… A microcontroller… software"*). Nothing is drawn for the stages on this card.

### 4b. Motion, cues and stills per step

| # | Motion (the Draw Bench's entries, M59m) | Movers | Cue and its second channel (B6) | Hold | Under reduced motion it lands as (C3) | Still (B4) |
|---|---|---|---|---|---|---|
| 0 | `f-temperature` traces (`enter: trace`) | 1 | the trace itself | hold | the node whole | *Temperature* |
| 1–6 | (a) the arrow traces from the last node, (b) its boundary tick fades in (`enter: fade`, once), (c) the next node traces; in order | 1 at a time | the arrow's trace leads the eye to the new form (B6: the cue travels along the chain); the tick is the "flash" of the PLAN, as one fade, never a blink (B8) | hold | arrow, tick and node whole | the chain so far |
| 7 | `inv` traces over the seven nodes | 1 | the bracket and its label | hold | whole | the chain under its bracket |
| 8 | the seven domain names fade in together | 1 (one linked fade) | the names | hold | whole | the chain with its domains |
| 9 | the six `bl*` ticks fade in together over the dashed ones | 1 (one linked fade) | amber, thicker, and the label | hold | whole | the chain, every boundary lit |

Seven stills (s0, s3, s6, s7, s8, s9 and the chain after s1–s2) would exceed B4's 3–7 if every step had
one; the strip keeps **s0, s3, s6, s7, s9** (and s8 if used): five or six, each a jump target.

## 5. Pacing and interaction, by surface and view

**Who paces** (B12): on the wall, the presenter; the wall draws the step strip flat (*step n of 10*). In
Study Mode and Scope, the learner.

| View | Who | Controls (range, default, states) |
|---|---|---|
| Preview (in the slide) | everyone | Back · Next · *step n of 10* · Replay · *Open details* (M59d's `DrawingControls`) |
| View (details) | everyone | the step list with each `say`; zoom and pan (M59e-iii, Study and Scope); *Stills*; Print (when M59k lands) |
| Edit (session only, whole wall) | everyone; a student's own copy | ink over the drawing (M07-c); hide or fade an item; a temporary note. Not specified for the Draw Bench in M59 yet (§12) |
| Authoring (Course Studio) | authors | the drawing editor (M59e: select, move, duplicate, delete, reorder, undo, zoom; Import SVG); steps written in the file by hand until M59k |

- **The presenter's strip** (B20): the next step's `say` as text (M59d); the teacher tip (§7d); keys → ←,
  R replay.
- **Study Mode and Scope**: the same steps learner-paced; zoom and pan; the `say` read aloud in Scope.
- **Phone** (C6): the drawing on top (at 320 px the seven-node row is too small to read: the phone
  shows the two-row form of §3a, or the learner zooms), then the step's `say`, the stills, big Back /
  Next; one finger does nothing on the drawing, two pinch and pan (M59e-iii).
- **Locked**: none.

## 6. The frame

The Draw Bench's View frame is not designed to the renderings yet (the Electronics Bench sets the shape,
D12.3). Tools this activity needs, in the frame's terms:

| Tile / panel | Used? | Selected item | List / contents |
|---|---|---|---|
| Steps | yes | the current step's `say` | the ten steps; *Stills* |
| Layers | in View, for Study (proposal) | — | *forms*, *boundaries*, *domains* on/off |
| Ink | yes | — | laser, ink (M07-c) |
| Zoom | yes (Study, Scope) | *Whole* / zoomed % | Fit, −, + |

Identity bar: *The path a measurement travels · ● Holding · step n of 10*. Legend card: *dashed tick: a
change of form*; *not to scale*.

## 7. Thinking, not watching

- **7a. The PLAN's ASK**: *none on this card.* The module's activities are on cards 1, 2 and 7; card 7's
  checkpoint asks the room to write this path's stages.
- **7b. Prediction point** — **Proposal** (F5): before s1, *"What form does the temperature take
  first?"* (a voltage · a resistance · a number · it depends on the sensor). Answer: *it depends on the
  sensor*; this chain's thermistor gives a resistance. +0.5 min. The Draw Bench has no native prediction
  (M59 §3.2: a drawing declares `commitment: 'none'`); it would be a `poe` block before the card.
- **7c. After**: card 7's checkpoint is the check.
- **7d. Teacher tip** — **Proposal** (F5): *Learners often think the sensor "measures" the temperature.
  Ask: at which arrow does the temperature stop being a temperature?* (At the first: from there on it is
  a resistance, a voltage, a code.)
- **7e. Explore**: none.

## 8. Faithfulness (the quality bar)

**Section D, Draw rows**
- [x] Proportions: a block diagram; the drawing says *not to scale* in the legend card.
- [x] Line types used correctly: `outline` for boxes and arrows, `hidden` for the boundary ticks (a
  dashed line marks an edge you cannot see), `thin` for leaders, `construction` for the ghost lane
  (rubbed out before each variant's last step, D12.16).
- [x] Curves from equations: none on this card.
- [x] Every step's `say` matches its Flow paragraph (§4a).
- [x] Numbers on the drawing: *27.4 °C* only (the Flow's). If values are ever written on this chain
  (they are on card 6), they must be one circuit's: with a 10 kΩ NTC (B = 3950 K, InsightDemo's
  `thermistor-ntc-10k`) under a 10 kΩ resistor on 3.3 V, 25 °C gives 10.00 kΩ → **1.650 V** → 2048, and
  27.4 °C gives 8.996 kΩ → 1.563 V → 1939 (truncated). Card 6 uses 25 °C; this card writes only 27.4 °C
  (§14 F6).

**The domains** (the script panel's table, `transcript.en.md`), placed on the forms (s8, proposal):
Temperature → *physical* · Resistance → *analog electrical* · Voltage → *analog electrical* · ADC code →
*digital data* · Binary data → *digital electrical* (logic HIGH and LOW on the wires) · Software variable
→ *digital data* · 27.4 °C → *software / application*. **Resistance → Voltage stays inside one domain**
(analog electrical), so one arrow of six is a change of form but not a domain boundary (§14 F2).

**A1–A8**: A1 ✓ (the Flow's own chain); A2 n/a (no behaviour; card 4 and 7 carry what goes wrong); A3 ✓
(*not to scale*); A4 n/a; A5 n/a; A6 ✓ (*not to scale*; *one temperature sensor's path; others differ*);
**A7: one inconsistency reported (F2), one coherence check written (F6)**; A8 ✓.

## 9. Faults and non-ideal behaviour

**PLAN FAULT**: none on this card. The faults live on cards 1, 4 and 7. **Proposal**: none here; the
boundary ticks *are* the card's statement of where faults enter.

## 10. Accessibility, legibility and print

- Wall (C2): labels at the wall's type floor on the drawing (the compiler's warning, D12.16); strokes
  ≥ 2 device px at 1024 × 768. **Check when drawn** (§3a; F4).
- Reduced motion (C3): every step lands whole (M59d: a step appears whole under
  `prefers-reduced-motion`).
- Colour (C4): the lit boundaries are amber *and* thicker *and* labelled; the dashed ticks are a line
  type, not a colour.
- Keyboard (C5): → ← R.
- Print (C8): the stills strip with each `say` (M59k's print rendering, when built; until then the
  stills exported as PNG, M59e-ii).

## 11. Assets to make or source

| Asset | Format | Made by | Status |
|---|---|---|---|
| `course-path.benchdrawing`, the master, every layer of §3a | Draw library, written as a file (M59 §3.1) or drawn in CorelDraw / LibreOffice and imported (M59b) | the author | **to make for Saturday** (the most-used drawing in the course) |
| `course-path-010-build.benchdrawing` (this card) | variant: layers `forms`, `boundaries`, `boundaries-lit` (+ `invariant`, `domains`), ten steps | the author | to make for Saturday |
| `eye-over-path`, `course-path-010-converter`, `course-path-010-blank` | variants for cards 4, 6, 7 | the author | to make for Saturday (their specs) |
| A variant generator (copies the master's layers into a variant and writes its steps), so the 13+ variants stay in step | a small script in `bench-work/` | the author | **Proposal** (F7); until then variants are copied by hand |

## 12. Bench capabilities this needs

**Draw Bench** (M59):
- **Exists**: the format (M59a); the viewer on the wall, Study and Scope (M59c); steps with `say` and
  traces on the wall (M59d); `enter: trace`, `enter: fade`, `exit: fade`, `exit: erase` painted on the
  wall today (M59d's `CHANGE_PAINTERS`); zoom and pan in Study and Scope (M59e-iii); the editor shell and
  SVG import (M59e, M59b); ink over the Canvas (M07-c). **Everything this card needs plays today.**
- **Missing (request it)**: the `drawing` fence cannot start at a step, play a range of steps, show
  chosen layers or focus a region (`draw-bench-status.md` §3C option 2). One master would then serve all
  13+ uses with `steps:`, `layers:` and `focus:` instead of copied variants (F7).
- **Planned**: M59k (steps in the editor, print); M59n (other entries and motions on the wall: not
  needed here).
- **Not specified yet**: the Draw Bench's Edit view (session-only) and its View frame to the renderings.

## 13. Stand-in for the lecture

None needed: the Draw Bench is the target and it plays every step of §4 on the wall today. On Saturday
the variant file is the library; when the fence feature lands (F7), the variant is replaced by the
master with `steps: s0..s9` and `layers:`, and nothing is redrawn.

## 14. Findings for the owner

**Render, 2026-10-08** (`bench-work/previews/u010-u011-preview.html`): the stage lane is now evenly spaced
with leaders to the forms lane (§3a), because stage boxes placed over their arrows collided. The forms
lane's seven nodes read at 1600 units; their legibility on the wall is still F4's check.

**Owner, 2026-10-08: "go with your recommendations".** Decided: F1 (the library's design, as §3a), F2
(a) (the PLAN's SHOW now says *a change of form*), F6 (keep both temperatures), F7 (the fence feature
requested: `bench-work/requests-to-exsight.md` X2; variants copied by hand for Saturday). The PLAN's
Status now points at §3a. Still open: F3, F5 (proposals) and F4 (measured when the drawing is made).

- **F1 — Two chains, one drawing.** Card 5's chain is of **forms** (Temperature → Resistance → Voltage →
  …); the PATH comments and cards 4 and 7 use **stages** (QUANTITY → SENSOR → CONDITIONING → ADC →
  FIRMWARE → NUMBER), and later modules add stages. The library puts forms on nodes and stages on the
  arrows between them (§3a), so both read from one drawing and every later module's focus lands on a
  stage. Accept this design?
- **F2 (A7) — "each arrow flashing as a domain boundary".** By the script panel's own table, Resistance →
  Voltage stays in the analog electrical domain. Options: (a) every arrow gets a tick as *a change of
  form*, and s9 says *every boundary* (the Flow's words; **recommended**: the Flow's *"the way
  information … is represented has changed at every step"* is true of all six); (b) ticks only on the
  five domain boundaries; (c) leave it.
- **F3 — Proposal: s8, the domain table drawn on the chain** (the PLAN says the table, if shown, must be
  an SVG; drawing the domain names under the forms is that SVG and keeps them beside their forms).
  Optional, +0.25 min.
- **F4 — Legibility.** Seven nodes in one row may not reach the wall's type floor on the Canvas beside the
  reading column (open point 1 in the design rules). If not, the forms lane wraps into two rows. Measure
  when drawn; the owner chooses between two rows and a full-width Canvas for this card.
- **F5 — Proposals**: the prediction before s1 (§7b, +0.5 min) and the teacher tip (§7d).
- **F6 — Two example temperatures.** This card ends at 27.4 °C; card 6, three minutes later, uses 25 °C
  (1.65 V → 2048). Both are coherent for a 10 kΩ NTC on a 10 kΩ divider (§8). Keep both (**recommended**:
  different examples, the Flow's), or use one?
- **F7 — The fence cannot show part of a drawing.** 13+ uses of this library need 13+ copied variant
  files today. Request `steps:` / `layers:` / `focus:` on the `drawing` fence from ExSight (**recommended**),
  and meanwhile the variant generator (proposal, §11)?

## 15. Acceptance: how we know it is built right

- The ten steps of §4a play on the wall, the presenter's window and Study Mode in order, one form per
  press, each holding; the `say` lines exactly as §4a.
- B1 one form per press; B2 only the new arrow, tick and node draw; B4 five or six stills; B5 every
  `say` on the strip and read in Scope; B6 the arrow's trace leads to the new form; B8 the ticks fade
  once, never blink; B12 the wall's strip not operable; B13 only node names and two short labels on the
  drawing; B14 labels in their nodes; B16 the chain readable as text (the `say` list); B20 the next
  `say` and the tip on the strip.
- C2 every label at the floor at 1920 × 1080 and 1024 × 768, no stroke under 2 device px (the compiler's
  warnings clean); C3 each step whole under reduced motion; C4 lit boundaries readable in greyscale; C5
  → ← R from a clicker; C6 walked at 320, 768, 1200, 1440, 1920; C7 a step to first frame < 100 ms (M59d
  measures `drawing:step`); C8 the stills with their `say`.
- The master's layers and ids as §3a, so cards 4, 6, 7 and every later module's variant reuse them.
- E1–E6 for the drawing as presented.
