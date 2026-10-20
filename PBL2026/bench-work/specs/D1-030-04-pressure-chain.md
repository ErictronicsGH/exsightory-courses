```yaml
id: D1-030-04-pressure-chain
card: "Transduction can take several stages"
module: notes/Day01/030-sensing/en.md
bench: Draw                       # the target, and it exists (M59)
library: "pressure-chain.benchdrawing (new): a 10 bar foil-gauge pressure sensor in section, stage by stage, then its package drawn round it"
dimensions: 2D
stand_in: none                    # every step plays today; the stages "faded behind the package" are a translucent package fill until M59n's ink motion
optional_benches: [Animation]     # only if the owner wants the diaphragm to bow continuously (F5); the PLAN asks for Draw
real_thing: "a flush-diaphragm foil-strain-gauge pressure transducer, 0–10 bar gauge: a 17-4PH stainless diaphragm Ø 12 mm × 0.3 mm, four 350 Ω gauges in a full bridge on 5 V, ≈ 2.1 mV/V at full scale; section not to scale, deflection exaggerated ×50"
minutes: 1.4                      # on the bench: the drawing is up for the whole card
card_minutes: 1.4
status: spec-draft
learner_action: none
predictions: []
seeds: []
key_variable: "the form the information about the pressure takes at each stage (force → shape → strain → resistance → voltage)"
time_scale: "none (traces only; the bowing is drawn, not timed)"
steps: 8                          # s0–s7
```

## 1. What the room must understand

- **Statement** (verbatim): *Pressure → deformation → strain → resistance change → voltage. A packaged sensor
  hides the stages inside one body, but each stage is still there.*
- **SHOW** (verbatim from the PLAN): *Draw — the pressure chain stage by stage: the diaphragm deforms →
  strain → the gauge's resistance changes → a bridge gives a voltage; then the package outline drawn round
  all of it, and the stages faded behind the package wall.*
- **Drive**: *none in the PLAN* beyond the SHOW's order, which the steps follow.
- **Look for** (verbatim): *the package hiding the stages, and every stage still there.*
- **Status** (verbatim): *needs Draw: the pressure-chain drawing with its package.*
- **Bench and library.** The **bench** is the Draw Bench. The **library** is a new drawing, `pressure-chain`.
  `draw-bench-status.md` §3A said *reuse `strain-gauge-beam`*; that drawing is a cantilever beam, not a
  diaphragm, so only its idea (a gauge bonded to a bending face) carries over (§14 F1).
- **Insight**: *one sensor can hold a chain of transductions; the package shows you only the first input and
  the last output, and every stage in between can still go wrong.*
- **Kind of knowledge**: *a process through stages*, drawn as *a picture built up* (each stage is a state,
  added, not a motion to watch). Card test → **Draw**, as the PLAN says; the Animation Bench is optional only
  if the bowing itself should move (F5). **B15 applies**: the mechanical part (diaphragm, strain) and the
  electrical part (gauges, bridge) are built separately, then joined by the gauges, then packaged. B17, B18,
  B19 do not apply.
- **Why this bench, not a still**: the chain has five stages and the card's point is the order and the
  hiding. Built one stage per clause, each form of the information is met before the next; the package then
  arrives over a drawing the room has just understood, which is what *hides* means. A still of the packaged
  sensor shows nothing; a still of the open one shows everything at once.
- **Key variable**: the form at each stage.

## 2. Time

The card's Flow is 125 words, all spoken: **0.96 min**.

| Beat | Minutes | Source of the number |
|---|---|---|
| s0 the diaphragm in its port: Flow p0 *"Sometimes transduction is not a single step…"* (24) | 0.18 | 24 ÷ 130 |
| s1–s5: p1 *"A pressure difference may cause a diaphragm to deform…"* (45), one clause per step, and the values read aloud (≈ 35 words, unscripted: *"ten bar; the centre lifts forty microns; seven hundred microstrain stretched at the centre, fourteen hundred squeezed at the rim; half an ohm on three hundred and fifty; about ten millivolts"*) | 0.62 | 80 ÷ 130 |
| s6 the chain written out: p2 *"Pressure → Deformation → Strain → Resistance change → Voltage"* (10) | 0.08 | 10 ÷ 130 |
| s7 the package: p3 *"In a packaged sensor, several of these stages…"* (46) | 0.35 | 46 ÷ 130 |
| Waiting on traces not covered by speech (8 steps, ≈ 1 s each) | 0.13 | estimate |
| **Card total / of which on the bench** | **1.4 / 1.4** | (1.3 without the values read aloud, F4) |

p1 carries five steps: it is three sentences, and each step lands at a clause boundary (*"…to deform."* s1,
s2; *"…strain in a sensing element,"* s3; *"…a change of electrical resistance."* s4; *"…a voltage the
measurement system can use."* s5), with the presenter pausing for each trace. B13 is met by holding at each
clause, not by speaking over motion. **Module check**: `D1-030-01-electricity-only.md` §2 (23.4 of 25 min).

## 3. The scene: what is on the bench

### 3a. The real sensor this is drawn from

A flush-diaphragm pressure transducer of the common foil-gauge class: a stainless steel port whose end is
machined into a thin circular diaphragm, four foil strain gauges bonded to the diaphragm's dry face, wired as
a full Wheatstone bridge, the bridge's four wires brought out through the body. No product is named on the
bench (real but unbranded); the values below are this class's, computed here.

| Quantity | Value | Source |
|---|---|---|
| Full scale | 10 bar gauge = **1.0 MPa** | chosen: a common industrial range |
| Diaphragm | 17-4PH stainless, **E = 197 GPa, ν = 0.27**; radius **a = 6.0 mm** (Ø 12 mm), thickness **t = 0.30 mm**, clamped edge | material: 17-4PH datasheet values (E ≈ 196–197 GPa, ν ≈ 0.27); size chosen to give the class's ≈ 2 mV/V (§8) |
| Gauges | four constantan foil gauges, **350 Ω**, gauge factor **GF = 2.0** | the standard foil gauge (GF ≈ 2.0–2.1 for constantan) |
| Excitation | **5.0 V** across the bridge | a common transducer excitation |

### 3b. Parts (artboard **1600 × 900**; inks from the Draw palette, never hex)

Layout as rendered in `bench-work/previews/d1-030-04-pressure-chain-open.svg` (s5) and
`d1-030-04-pressure-chain.svg` (s7). The section is drawn at **30 units per mm** for the diaphragm (a = 180
units), so the port, the diaphragm's width and the gauges' places are to scale; the deflection is
exaggerated ×50 and the bridge is a schematic.

| Layer | id | Item | Drawn as |
|---|---|---|---|
| `port` | `p-wall-l`, `p-wall-r` | the port's walls in section, either side of the diaphragm, with section hatching | `outline`, fill `contrast` at `faint`; hatch `thin` |
| `port` | `d-rest` | the diaphragm at rest, 360 × 9 units (12 × 0.3 mm), centre (560, 470) | fill `contrast` at `faint`; after s2, kept as the rest position in `hidden` line |
| `pressure` | `pr-1`…`pr-5`, `pr-say` | five arrows up the bore into the diaphragm; *pressure, up to 10 bar* | `outline`, `rose`, `arrow` end; role `note` |
| `deform` | `d-bent` | the deflected diaphragm, top and bottom faces as **function curves** w(r) = w₀(1 − r²/a²)², w₀ = 42.4 µm × 50 = 64 units at the centre | `function` (M59p), `azure`, fill `azure` at `faint` |
| `deform` | `d-exag` | *deflection exaggerated ×50* | role `note`, faint |
| `strain` | `s-axis`, `s-curve` | radial strain on the top face, a **function curve** εr(r) = K(a² − 3r²) over r = −a…a, drawn above the diaphragm (+706 µε up at the centre, −1412 µε down at the rim) | `function`, `violet`; axis `thin` |
| `strain` | `s-plus`, `s-minus`, `s-say` | *+706 µε (stretched)* · *−1412 µε (squeezed)* · *strain on the top face* | role `note`, `violet` |
| `gauges` | `g1`, `g3` (centre), `g2`, `g4` (rim) | four gauges on the top face, 32 × 8 units, following the bent face; names *G1*–*G4* | fill `amber`; role `note` |
| `resistance` **Proposal** (values, F4) | `r-say` | *350 Ω: +0.49 Ω at the centre · −0.99 Ω at the rim* | role `note`, `amber` |
| `bridge` | `b-ring`, `b-g1`…`b-g4`, `b-exc`, `b-0v`, `b-out` | a Wheatstone bridge as a diamond, half-diagonal 150, centre (1200, 400): G1 (+) and G3 (+) in opposite arms, G2 (−) and G4 (−) in the other two; *+5 V excitation* top, *0 V* bottom; *V_out* across the middle | `outline`, IEC resistor boxes in `amber`; V_out `hidden`, `teal` |
| `bridge` | `b-value` **Proposal** (values, F4) | *10.6 mV* beside V_out | role `label`, `teal` |
| `badges` | `n1`…`n5` | numbered badges 1–5 beside each stage's part: 1 pressure, 2 diaphragm, 3 strain curve, 4 gauges (on the diaphragm and on the bridge), 5 V_out | filled circles in the stage's ink, white numeral |
| `chain` | `c-1`…`c-5`, `c-a1`…`c-a4` | *① Pressure → ② Deformation → ③ Strain → ④ Resistance change → ⑤ Voltage*, along the bottom (y = 835) | role `label`, badges as above, arrows `thin` |
| `package` | `pk-body`, `pk-conn`, `pk-wires`, `pk-say` | the transducer's body drawn round port, diaphragm and bridge, open only at the port; a connector on its side with four wires out; *the package: one body, the stages inside it (not to scale)* | `outline` at heavy weight, `contrast`; fill `paper` (the stage's ground) at ≈ 60 % so the stages read faded behind it |

**Meet the parts** (B3, B15): s0 shows the port and the flat diaphragm, named; each later part arrives with
its badge and name. The mechanical half (s1–s3) is built before the electrical half (s4–s5), and the gauges
are the part that joins them.

**Values beside their element** (B14, B16; Proposal F4): each stage's value beside its part (§8).

**Labels**: on or beside their parts; nothing moves, so leaders are allowed; the badges and the chain row
are the list (B14).

**Colours and their second channel** (C4):

| Stage | Ink | Second channel |
|---|---|---|
| 1 Pressure | `rose` | badge **1**, arrows' shape, the word *pressure* |
| 2 Deformation | `azure` | badge **2**, the bowed shape, *diaphragm* |
| 3 Strain | `violet` | badge **3**, the curve, *µε* |
| 4 Resistance change | `amber` | badge **4**, the gauge shapes, *G1–G4*, Ω |
| 5 Voltage | `teal` | badge **5**, *V_out*, mV |

## 4. The run: step by step, as the Flow goes

### 4a. Steps

| # | id | Flow (first words) | What changes: the step's one sentence (`say`) | Overlay (values: Proposal F4) | Presenter's control |
|---|---|---|---|---|---|
| 0 | `s0-port` | p0 *"Sometimes transduction is not a single step…"* | A thin steel diaphragm closes the end of a pressure port. | — | (the Canvas is up) |
| 1 | `s1-pressure` | p1 *"A pressure difference may cause…"* | Pressure pushes on the diaphragm from the port. | *up to 10 bar* | Next |
| 2 | `s2-deform` | p1 *"…a diaphragm to deform."* | The diaphragm bows: the pressure has become a change of shape. | *centre lifts 42 µm (×50)* | Next |
| 3 | `s3-strain` | p1 *"That deformation produces strain in a sensing element,"* | Its top face stretches at the centre and is squeezed at the rim: strain. | *+706 µε · −1412 µε* | Next |
| 4 | `s4-resistance` | p1 *"…and a strain gauge converts the strain into a change of electrical resistance."* | Four gauges on that face change their resistance with the strain: two up, two down. | *350 Ω: +0.49 Ω · −0.99 Ω* | Next |
| 5 | `s5-voltage` | p1 *"Further circuitry then converts that resistance change into a voltage…"* | Wired as a bridge on 5 V, the four changes give a voltage. | *V_out 10.6 mV* | Next |
| 6 | `s6-chain` | p2 *"Pressure → Deformation → Strain → Resistance change → Voltage"* | Five stages, one after another: pressure, deformation, strain, resistance change, voltage. | — | Next |
| 7 | `s7-package` | p3 *"In a packaged sensor, several of these stages…"* | The package closes round all of it: pressure in, four wires out, and every stage still inside. | *the package* | Next leads to card 5 |

### 4b. Motion, cues and stills per step

| # | Motion (Draw entries) | Movers | Cue and its second channel (B6) | Hold | Reduced motion (C3) | Still (B4) |
|---|---|---|---|---|---|---|
| 0 | the port walls and the flat diaphragm trace | 1 | the trace | hold | whole | the port |
| 1 | the five pressure arrows trace up the bore (one linked entry), badge 1 fades in | 1 | the arrows lead to the diaphragm | hold | whole | — |
| 2 | `d-bent` traces over the rest position, which turns to a `hidden` outline (exit fade of the fill, then the hidden line enters); badge 2 | 1 | the bowed face appears where the arrows end | hold | whole | the bowed diaphragm |
| 3 | `s-curve` traces from rim to rim, its labels fade in, the gauges G1–G4 fade in where the curve peaks and dips; badge 3 | 1 at a time | the curve is drawn straight above the face it describes | hold | whole | — |
| 4 | the four gauges go from outline to amber fill (one fade), the resistance note fades in; badge 4 | 1 | the gauges light where the strain is | hold | whole | — |
| 5 | the bridge traces, its four arms named as the gauges; V_out's dashed line and value fade in; badges 4 (on the bridge) and 5 | 1 at a time | the arms carry the gauges' names (cause and effect lit together, B6) | hold | whole | the open sensor, every stage |
| 6 | the chain row traces left to right, its badges matching the drawing's | 1 | the row's badges match the parts' | hold | whole | the chain named |
| 7 | the package body traces round everything, then its translucent fill fades in over the stages (they read faded behind the wall); connector and wires trace | 1 at a time | the outline closes round what the room has just seen | hold | whole | the packaged sensor |

Five stills (s0, s2, s5, s6, s7). Nothing flashes.

## 5. Pacing and interaction, by surface and view

As `D1-010-05-measurement-path.md` §5: the presenter paces on the wall; Preview Back · Next · *step n of 8* ·
Replay; View the step list and zoom (Study, Scope); Edit ink, hide or fade an item, a note (session only,
request X6); Authoring the editor and the steps in the file. **Proposal** (F6): in View, a *Package* toggle
(the `package` layer on and off), so a learner can open and close the sensor (part of X2's `layers:`).
Phone: the section on top, the bridge under it (the artboard's two halves stacked), the chain row last; two
fingers zoom. **Locked**: none.

## 6. The frame

As `D1-010-05-measurement-path.md` §6. Identity bar: *Transduction can take several stages · ● Holding · step
n of 8*. Legend card: the five stages with inks and badges; *not to scale; deflection exaggerated ×50; the
bridge drawn as a schematic*.

## 7. Thinking, not watching

- **7a. The PLAN's ASK**: *none on this card.*
- **7b. Prediction point** — **Proposal** (F4): before s3, *"Where on the diaphragm's top face is it
  stretched, and where squeezed?"* (all stretched · stretched at the centre, squeezed at the rim · squeezed
  at the centre). Answer: *stretched at the centre, squeezed at the rim*; s3's curve reveals it. Asked aloud;
  +0.3 min.
- **7c. After**: card 5's flash (*which electrical quantity does each sensor hand you?*) has the strain gauge
  as *resistance*; this card shows why the bridge after it is needed.
- **7d. Teacher tip** — **Proposal** (F4): *Learners think a pressure sensor "measures pressure". Ask: if the
  diaphragm's steel softened with heat, which stage would be wrong, and would the package tell you?* (Stage
  2; no: the hidden stages are why D2·050 corrects for temperature.)
- **7e. Explore**: the package toggle in Study (F6), none else.

## 8. Faithfulness (the quality bar)

**The mechanics** (a clamped circular plate under uniform pressure, small deflection; Timoshenko &
Woinowsky-Krieger, *Theory of Plates and Shells*, §62):

- Plate constant: K = 3P(1 − ν²) / (8Et²) = 3 × 1.0 × 10⁶ × (1 − 0.0729) / (8 × 197 × 10⁹ × 9.0 × 10⁻⁸) =
  2.781 × 10⁶ / 1.4184 × 10⁵ = **19.61 m⁻²** (strain per m² of r).
- Centre deflection: w₀ = 3P(1 − ν²)a⁴ / (16Et³) = 2.781 × 10⁶ × 1.296 × 10⁻⁹ / (16 × 197 × 10⁹ × 2.7 × 10⁻¹¹)
  = 3.604 × 10⁻³ / 85.10 = **42.4 µm**. w₀/t = 0.14: inside small-deflection theory (w₀ well under t/2).
- Deflected shape: w(r) = w₀(1 − r²/a²)², drawn from the equation (×50: 2.12 mm = 64 units at the centre).
- Radial strain on the top face: εr(r) = K(a² − 3r²); tangential εt(r) = K(a² − r²).
  - Centre: εr = εt = 19.61 × 36 × 10⁻⁶ = **+706 µε**.
  - Rim (r = a): εr = 19.61 × (36 − 108) × 10⁻⁶ = **−1412 µε**; εt = 0.
  - εr changes sign at r = a/√3 = **3.46 mm**.
- Rim stress: σr = 3Pa² / (4t²) = 3 × 10⁶ × 36 × 10⁻⁶ / (4 × 9 × 10⁻⁸) = **300 MPa**, well inside 17-4PH's
  yield (≈ 1 GPa in its usual hardened condition): the diaphragm springs back.

**The gauges and the bridge**:
- ΔR = GF × ε × R: centre 2.0 × 706 × 10⁻⁶ × 350 = **+0.494 Ω**; rim 2.0 × (−1412 × 10⁻⁶) × 350 = **−0.988 Ω**.
- Full bridge with like signs in opposite arms: V_out / V_ex = (GF/4)(ε₁ − ε₂ + ε₃ − ε₄) = 0.5 × (706 + 1412 +
  706 + 1412) × 10⁻⁶ = **2.118 mV/V**; on 5 V, **10.59 mV** (10.6 mV on the drawing). Solving the bridge
  exactly with the four resistances gives 10.596 mV: the linear form holds.
- Against the class: foil-gauge pressure transducers are commonly rated near **2 mV/V** at full scale; this
  geometry gives 2.1 mV/V **from point strains**. Real gauges average the strain over their grid (and a
  centre gauge sees less than the peak), so a real sensor of this size gives somewhat less; the
  simplification is labelled (A6: *strains at a point; a real gauge averages over its grid*).

**Section D, Draw rows**
- [x] Proportions: the diaphragm, port and gauge places to scale (30 units per mm); the deflection
  exaggerated ×50 and labelled; the bridge a schematic; the package *not to scale*.
- [x] Line types: `outline` parts, `thin` hatching and axis, `hidden` for the rest position and V_out, IEC
  resistor boxes in the bridge.
- [x] Curves from equations: `d-bent` from w(r) = w₀(1 − r²/a²)², `s-curve` from εr(r) = K(a² − 3r²) (both
  `function` items, M59p).
- [x] Every `say` matches its Flow clause (§4a).
- [x] Numbers on the drawing recomputed above: 10 bar, 42 µm, +706 / −1412 µε, +0.49 / −0.99 Ω, 10.6 mV.

**A1–A8**: A1 ✓ (every value computed from named material and geometry); A2 ✓ partly: the non-ideal (the
gauges' averaging, temperature) is named in the labels and the tip, not drawn; A3 ✓ (to scale where it
matters, the rest labelled); A4 n/a; A5 n/a; A6 ✓ (*deflection exaggerated ×50*; *strains at a point*; *not to
scale*); A7 ✓ (card 5's flash: the strain gauge hands you a resistance; card 9's *a strain gauge with a low
temperature coefficient* is this gauge); A8 ✓ (plate theory, gauge factor, bridge arithmetic).

## 9. Faults and non-ideal behaviour

**PLAN FAULT**: none on this card. **Proposal** (named, not drawn): temperature acts on every hidden stage
(the steel's modulus, the gauges' resistance, the bridge's balance), which is why smart pressure sensors
measure temperature and correct for it (card 9's *mathematical correction*, D2·050).

## 10. Accessibility, legibility and print

- Wall (C2): the badge numerals and the chain row at the floor and 7:1; the strain labels and values at the
  `note` role's floor; the faded stages behind the package are deliberately lower contrast (they are the
  point, *still there*), but their outlines stay visible at 3:1 at least. Check at 1920 × 1080 and
  1024 × 768.
- Reduced motion (C3): each step whole.
- Colour (C4): five inks, each with its badge numeral and its own shape; checked in greyscale by numeral.
- Keyboard (C5): → ← R.
- Print (C8): five stills with their `say` and values.

## 11. Assets to make or source

| Asset | Format | Made by | Status |
|---|---|---|---|
| `pressure-chain.benchdrawing`: layers of §3b, eight steps, the two curves as `function` items (`insight-draw shape`) | Draw library | the author | to make for Saturday |

## 12. Bench capabilities this needs

**Draw Bench**: **exists**: traces, `enter: fade`, `exit: fade`, function curves (M59p), fills with a tint,
steps, `say`, zoom in Study. **Planned (M59n)**: the stages *fading* behind the package as an `ink` motion
(dim and hold) is M59n's; `draw-bench-status.md` §2 already lists it as optional for this card. Until then
the package's translucent fill does it (§13). **Check when drawn**: that a fill at ≈ 60 % opacity over the
stages is possible in the format (a tint on the stage's ground) and reads as *faded behind the wall* on both
themes. **Missing (request it)**: the View *Package* toggle (F6) is X2's `layers:`.

## 13. Stand-in for the lecture

None needed. The package step uses a translucent fill drawn over the stages instead of M59n's ink motion;
when M59n lands, s7 can dim the stages and keep the package outline clear, with no redraw.

## 14. Findings for the owner

- **F1 — `strain-gauge-beam` is not the pressure chain.** `draw-bench-status.md` says to reuse InsightDemo's
  `strain-gauge-beam` here. That drawing is a beam held at one end, not a diaphragm, and its gauge's long
  legs run across the beam although its step says *"its grid along the beam"* (a gauge reads the strain
  along its legs). This card gets its own drawing; the beam drawing's grid is reported to ExSight (X14).
- **F2 — The PLAN gives no values.** This spec makes the sensor real: 10 bar, a 17-4PH diaphragm 12 mm ×
  0.3 mm, four 350 Ω gauges on 5 V, 10.6 mV at full scale (§8). Accept these, or change the range or
  excitation? (On 3.3 V, the course's supply, the output would be 6.99 mV.)
- **F3 — "A bridge gives a voltage" before the bridge is taught.** The Wheatstone bridge was met in D1·020
  card 3 (the null measurement); this card uses it as a box that turns four resistance changes into a
  voltage, without its arithmetic. Fine as is, or a word in the Flow? (The Flow is not edited without you.)
- **F4 — Proposals**: the values layer (each stage's number beside it, +0.27 min read aloud, or shown and not
  read); the prediction before s3 (+0.3 min); the teacher tip (§7d).
- **F5 — Draw, not Animation.** A diaphragm that bows smoothly as the pressure rises would be the Animation
  Bench's (M62). The PLAN asks for Draw, and the stages are states, so this spec keeps Draw. Agreed?
- **F6 — Proposal**: a *Package* toggle in View so learners can open and close the sensor in Study.

## 15. Acceptance: how we know it is built right

- The eight steps of §4a play on the wall, the presenter's window and Study Mode, each holding, with the
  values of §8 where shown.
- The two curves are `function` items with the equations of §8; the rendered centre deflection is 64 units
  (×50) and the strain curve crosses zero at r = ±3.46 mm (±104 units from the centre).
- B1 one stage per press; B2 only the new stage draws; B4 five stills; B5 each `say` on the strip and read in
  Scope; B6 each stage appears where the previous one ends; B8 nothing blinks; B12 the wall's strip not
  operable; B13 terms and values only; B14 badges and the chain row as the list; B15 mechanical half, then
  electrical, joined by the gauges; B16 each stage's value as text; B20 the next `say` and the tip on the
  strip.
- C2 numerals and chain row at the floor at 1920 × 1080 and 1024 × 768, the faded stages' outlines ≥ 3:1;
  C3 each step whole; C4 five stages told apart in greyscale by numeral; C5 → ← R; C6 walked at 320, 768,
  1200, 1440, 1920; C7 < 100 ms to first frame; C8 the stills with their `say` and values.
- No brand or part number anywhere on the drawing.
- E1–E6 for the drawing as presented; checked on the lecture laptop before Saturday, both themes.
