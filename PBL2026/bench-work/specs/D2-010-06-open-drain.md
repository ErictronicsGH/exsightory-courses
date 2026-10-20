```yaml
id: D2-010-06-open-drain
card: "Open-drain: pull low or let go"
module: notes/Day02/010-digital-interfaces/en.md
bench: Animation                  # D1, decided 2026-10-20: an Animation Bench demonstration built by the Benches lane on one crossing
library: "logic-io (the scene library designed in D2-010-03-level-shifting §3), loaded with params `config: open-drain` by this card's sequence `d2-010-open-drain`; asked of the Benches lane by the same crossing as cards 3, 5, 8 (draft: crossing-d2-010-logic-io.request.md)"
dimensions: 2D
stand_in: "none proposed (P6): the card plays from its words, its poe and its analogy until the library lands; the PLAN's Electronics fixture `open-drain-bus` stays deferred"
optional_benches: [Electronics]   # the PLAN's SHOW (deferred: the Electronics Bench is in development)
real_thing: "an open-drain output on a breadboard: a small-signal N-MOSFET in TO-92 (2N7000 class) with its source to ground, its drain on a bus wire to a GPIO of the course's unbranded 3.3 V MCU board (the receiver), its gate switched between 0 V and the board's 5 V; a 4.7 kΩ pull-up to 3.3 V switched in last; the course's handheld meter on the bus; drawn beside its IEC 60617 schematic"
minutes: 1.6                      # on the bench (§2)
card_minutes: 2.6                 # the whole card, the poe's answer window included; the analogy card not counted (§2)
status: spec-draft                # D1, N2 applied; proposals P1–P7 open
learner_action: poe
predictions: [s1-let-go]          # the poe is asked over s1 (the Flow's p1), answered at s2
seeds: [S14]                      # harvested at p6 (s5)
key_variable: "the gate (pull or let go) and the pull-up (absent or present): what, if anything, sets the bus's HIGH"
time_scale: "none: steady DC states; s2's wander is illustrative, not timed (labelled)"
steps: 6                          # s0–s5
```

**Written 2026-10-20 (U019)** after the owner's choices on the U019 brief (*"apply all recommendations"*): **D1** (one
Animation Bench scene library for cards 3, 5, 6, 8, built by Benches on one crossing), **N2** (no demo numbers). The PLAN's
Electronics fixture `open-drain-bus` stays **deferred**; the card still gets its demonstration. The library's layout, scale,
colours, symbols, meter, gauge and shared words are **`D2-010-03-level-shifting` §3** (*§3 of card 3* below); card 8
(`D2-010-08-two-outputs`) adds a second output to this configuration. The U019 brief's card-6 drawing (`draw6()`) is the
approved model.

## 1. What the room must understand

- **Statement** (verbatim): *An open-drain output can only pull the line low or let it go, which is exactly why it needs a
  pull-up. It is the digital face of Day 1's impedance argument.*
- **SHOW** (verbatim from the PLAN): *Electronics — new fixture `open-drain-bus`: an N-MOSFET M1 (mosfet-typical) as the
  open-drain output, drain to the bus node, source to ground, gate from a second supply V2 (0 V or 5 V) standing in for the
  chip's internal driver; a DMM on the bus; pull-up R1 4.7 kΩ to 3.3 V added last.* The PLAN names the Electronics Bench
  (written before D1); the target is the Animation Bench. The Flow's p0 cue still names the Electronics Bench (P5).
- **Drive** (verbatim): *V2 = 5 V (bus near 0 V) → V2 = 0 V with no R1 (nothing defines the bus) → add R1 (bus rises to 3.3 V)
  → V2 = 5 V again with the current overlay: 0.7 mA through R1 into M1.*
- **Look for** (verbatim): *the transistor can only sink; the HIGH comes from R1 and nowhere else.*
- **Status** (verbatim): *ready (fixture from existing parts; the floating state shows as the meter's 0 V until the
  logic-input part exists).* In the Animation library the floating state is shown on the receiver's gauge, as card 5 (P2).
- **Decided by the owner, 2026-10-20** (applied here): **D1**; **N2** p0 *"[[demo]] Electronics Bench — …"* without its old
  number.
- **Insight**: *an open-drain output has no HIGH of its own: on, it ties the line to ground; off, it is an open switch and the
  line floats; the pull-up is the only source of the HIGH, and its 4.7 kΩ is that HIGH's output impedance.*
- **Kind of knowledge**: *a process through stages* (on, let go, pull-up added, on again) building *a model* (the HIGH's
  source). Card test → **Animation**, as D1 decided. B15 applies (the output, the bus and the receiver met before the pull-up
  arrives); B17 applies (the run log; s5's equivalent beside the circuit); B18, B19 do not.
- **Why this bench, not a still**: the point is what is *missing*. The room must see the gate let go and the line lose its
  level (the same wander as card 5's pin), then the pull-up arrive and the HIGH appear from it, then the transistor pull and a
  current flow through the pull-up that was not there before.
- **Key variable**: the gate and the pull-up.

## 2. Time

The card's Flow, counted from en.md on 2026-10-20 (words ÷ 130 wpm; cue tags not counted; the em dash counted): **197 words**,
of which p0 (10) is a stage direction; **187 spoken = 1.44 min**.

| # | Paragraph (first words) | Words |
|---|---|---|
| p0 | *"[[demo]] Electronics Bench — an open-drain output, first with no pull-up."* (stage direction) | 10 |
| p1 | *"[[ask]] The output transistor has let go. What decides the voltage on the line now?"* | 14 |
| p2 | *"[[pause]]"* | — |
| p3 | *"[[reveal]] Nothing does. The transistor is either on…"* (2 + 21 + 14) | 37 |
| p4 | *"[[demo]] Now add a pull-up resistor from the line to 3.3 V…"* (11 + 8 + 24) | 43 |
| p5 | *"So an open-drain output can only pull low or let go…"* | 36 |
| p6 | *"Now remember Day 1: high in, low out…"* (8 + 15 + 25 + 9) | 57 |

| Beat | Minutes | Source of the number |
|---|---|---|
| s0 on the stage from p0's cue (the output on, the bus held low) | 0 | the cue is not spoken; s0 is met as s1 lands |
| p1 (14) with s1: the gate lets go at *"has let go"* | 0.11 | 14 ÷ 130 |
| s1's motion, not covered | 0.03 | estimate, ≈ 2 s |
| The poe's answer window and tally (p2), the bench held at s1 | 1.00 | the course's estimate for a four-option poe |
| p3 (37) at s2: the wander appears on the receiver's gauge | 0.28 | 37 ÷ 130 |
| s2's arrival, not covered | 0.02 | estimate |
| p4 (43): s3 at its first sentence (the pull-up; the line rises), s4 at *"Transistor on"* | 0.33 | 43 ÷ 130 |
| s3, s4 motions, not covered | 0.08 | estimate, ≈ 3 + 2 s |
| p5 (36) over s4 held | 0.28 | 36 ÷ 130 |
| p6 (57) at s5 (the HIGH's equivalent: the harvest) | 0.44 | 57 ÷ 130 |
| s5's arrival, not covered | 0.03 | estimate |
| **On the bench** (the answer window excluded) | **1.6** | 1.60 |
| **Card total** | **2.6** | 2.60 |

The ANALOGY is its own card (EAC: an `analogy` block gets a card); it has no Flow words and is not on the bench. **Module
check**: see `D2-010-07-choosing-the-pull-up.md` §2b.

## 3. The scene: `logic-io`, `config: open-drain`

Layout (bench top view at 1 mm = 4 px beside the IEC schematic, linked; the gauge; the run log), colours, symbols, the meter and
the shared words: **§3 of card 3**. The bus is teal; the pull-up amber (*what sets the HIGH*); the meter azure. Labels follow
the PLAN's designators (*M1*, *R1*) on this card.

| id | Part | Value, and its source | Drawn as (bench · schematic) |
|---|---|---|---|
| `q1` | **M1, the open-drain output**: an N-channel enhancement MOSFET, small-signal, TO-92 (2N7000 class; P4) | **R_DS(on) 1.8 Ω** typical (5.3 Ω max) at V_GS 4.5 V, I_D 75 mA (onsemi 2N7000 / 2N7002 / NDS7002A datasheet, §8), modelled as 1.8 Ω with its gate at 5 V; off: open (its off-state leakage ≤ 1 µA at 48 V, ≈ 0 here) | TO-92 body (4.8 × 3.7 mm) on the breadboard, its three legs in three rows · IEC 60617 N-channel enhancement MOSFET (broken channel, arrow toward the channel), inside a dashed box *open-drain output (stands in for a chip's driver)* |
| `s4` | **Slide switch LET GO · PULL** on M1's gate: the gate to ground or to the board's *5V* pin | the bench's own control (memory `controls-built-into-the-hardware`); P3 | slide switch · IEC change-over switch *S4*, its positions *let go* (0 V) and *pull* (5 V) |
| `bus` | **The bus**: a jumper wire from M1's drain row to the receiver's GPIO row (≈ 60 mm) | ideal wire (its capacitance is card 7's) | jumper (DINKIT `jumper`) · teal line *bus* |
| `rx` | **The receiver**: a GPIO of the course's 3.3 V MCU board, its gauge (§3 of card 3) | V_IL 0.825 V, V_IH 2.475 V, leakage 0.4 nA (card 3, card 5) | the board's header pin · the chip outline with its buffer and *reads*; the gauge beside it |
| `r5` | **R1, the pull-up**: 4.7 kΩ, 1 % metal film, 0.25 W, axial, from the bus to 3.3 V | E24; added last | on the breadboard · IEC resistor *R1 4.7 kΩ* (amber) |
| `s6` | **Slide switch PULL-UP OFF · ON**: R1's top lead to the + rail or open | the bench's own control | slide switch · IEC switch *S6* |
| `dmm` | The course's handheld (§3c of card 3), 20 V range, 10 MΩ; its red clip *parked* or *on the bus* | P2 | as card 5 |

**Meet the parts** (s0, B3), cued as p0 appears: *M1 — an N-MOSFET: the open-drain output* · *S4 — its gate: let go (0 V) or
pull (5 V)* · *bus — to the receiver's input* · *receiver — a 3.3 V MCU's input, its thresholds on the gauge* · *R1 4.7 kΩ — a
pull-up, switched off for now* · *meter — parked*.

**Values beside their element** (B14, B16):

| Chip | Where | Values through the run |
|---|---|---|
| The gauge's marker | beside the receiver's gauge | s0 *0 V* · s1 *?* · s2 *no defined value* · s3 *3.298 V* · s4 *1.3 mV* · s5 *3.298 V* |
| The meter's LCD | on the meter | parked (s0–s2); **3.30** (s3, s5); **0.00** (s4) |
| *the input reads* | under the gauge | LOW · ? · not guaranteed · HIGH · LOW · HIGH |
| Current through R1 into M1 | beside R1 and M1 | s4 **0.70 mA** (none otherwise) |
| *what sets the level* | beside the bus | *M1 to ground* · *?* · *nothing: the line floats* · *R1: the HIGH comes from the pull-up* · *M1 sinks R1's current* · *3.3 V behind 4.7 kΩ* |

**The run log**: *gate · pull-up · bus · reads · current*. Rows: *pull · off · 0 V · LOW · 0*; *let go · off · floating · not
guaranteed · 0*; *let go · on · 3.30 V · HIGH · 0*; *pull · on · 0.00 V · LOW · 0.70 mA*.

**s5's inset: the HIGH as a source** (**Proposal** P1; the harvest's picture): beside the bus, the HIGH redrawn as its
Thévenin equivalent, *3.3 V behind 4.7 kΩ* (an IEC voltage source and resistor), its loads hung on it: *the receiver's input*,
*the meter 10 MΩ*, *the wire* (drawn as a capacitor, *its capacitance: card 7*), the bus's 3.298 V beside it. Drawn in the look
of D1·040 card 4's Thévenin redraw (`D1-040-04-thevenin-redraw`, *1.65 V behind 5 kΩ with a load*), so the room sees Day 1's
picture.

**Words the room reads** (adds to card 3's table; French drafts mine, for the owner's review):

| en | fr |
|---|---|
| open-drain output (stands in for a chip's driver) · gate · let go · pull · bus · receiver · pull-up | sortie à drain ouvert (tient lieu de l'étage de sortie d'une puce) · grille · relâche · tire · bus · récepteur · résistance de tirage |
| *what sets the level* · *nothing: the line floats* · *the HIGH comes from the pull-up* · *M1 sinks R1's current* | *ce qui fixe le niveau* · *rien : la ligne flotte* · *le niveau HAUT vient de la résistance de tirage* · *M1 absorbe le courant de R1* |
| *the HIGH: 3.3 V behind 4.7 kΩ* · *its loads: every input and every centimetre of wire* | *le HAUT : 3.3 V derrière 4.7 kΩ* · *ses charges : chaque entrée et chaque centimètre de fil* |
| *MOSFET modelled by its on-resistance (1.8 Ω, typical of its class)* | *MOSFET modélisé par sa résistance à l'état passant (1.8 Ω, typique de sa classe)* |

**Key framings**: *Whole* (Home) · *Output* (M1, S4, R1, S6) · *Receiver* (the gauge, for s1–s2) · *Source* (s5's inset).

## 4. The run: step by step, as the Flow goes

### 4a. Steps

| # | id | Flow paragraph | What changes (the `say`) | Overlay for the room | Presenter's control |
|---|---|---|---|---|---|
| 0 | `s0-meet` | on the stage from p0's cue *"an open-drain output, first with no pull-up"* | Meet the output: an N-MOSFET whose gate is pulled to 5 V, so it ties the bus to ground; the bus runs to a 3.3 V input; no pull-up yet. | *M1 on · bus 0 V · no pull-up* | (on the stage with the card) |
| 1 | `s1-let-go` | p1 *"[[ask]] The output transistor has let go. What decides the voltage on the line now?"*; held through p2 | S4 lets M1's gate go to 0 V: the transistor turns off. What sets the bus now? | *M1 off · bus ?* | Next (the poe follows) |
| 2 | `s2-floats` | p3 *"[[reveal]] Nothing does. … When it lets go, the line floats, exactly like the input we just met."* | Nothing does: an off transistor is an open switch with no voltage of its own, and the bus floats, its level wandering as card 5's pin did. | *nothing: the line floats* | Next (on *[[reveal]]*); framing *Receiver* |
| 3 | `s3-pull-up` | p4 *"[[demo]] Now add a pull-up resistor from the line to 3.3 V. Transistor off: the line rises to 3.3 V."* | S6 connects R1, 4.7 kΩ, from the bus to 3.3 V: the bus rises to 3.30 V and the input reads HIGH. The meter, clipped on, reads 3.30. | *R1 4.7 kΩ · 3.30 V · HIGH* | Next; framing *Whole* |
| 4 | `s4-pull` | p4 *"Transistor on: it pulls the line down, and a small current, about 0.7 mA through 4.7 kΩ, flows through the pull-up into the transistor."*; held under p5 | S4 pulls M1's gate to 5 V again: the bus falls to 1.3 mV, and 0.70 mA flows from 3.3 V through R1 into M1. | *0.00 V · 0.70 mA through R1 into M1* | Next |
| 5 | `s5-source` | p6 *"Here the pull-up is the source impedance of the high level, and every input and every centimetre of wire on the bus is its load."* | M1 lets go: the HIGH is 3.3 V behind 4.7 kΩ, and the receiver, the meter and the wire are its loads: high in, low out. | *the HIGH: 3.3 V behind 4.7 kΩ · its loads* | Next (the bench is done); framing *Source* |

### 4b. Motion, cues and stills per step

| # | Motion | Movers | Cue and its second channel (B6) | Hold | Under reduced motion (C3) | Still (B4) |
|---|---|---|---|---|---|---|
| 0 | none (arrives whole) | 0 | each part highlighted as named in the meet line | hold | the same | M1 on, bus 0 V, LOW |
| 1 | S4's lever to *LET GO* (`quick`); M1's channel line on the schematic drawn open; the gauge's marker removed (*?*) | 1 | S4 and M1 lit together (C41) | hold | the lever at LET GO, the gauge *?* | M1 off, *?* |
| 2 | the receiver's marker appears and wanders (card 5's wander, the same look and pace) | 1 | the bus, M1's open channel and *nothing: the line floats* highlighted; the label *Illustrative…* (card 5's) | **loop** | a shaded range 0–3.3 V, *no defined value* | the shaded gauge, *not guaranteed* |
| 3 | (a) S6's lever to *ON* (`quick`); linked, the wander stops and the marker rises to 3.298 V; (b) the meter's red clip to the bus (`normal`), its LCD 3.30 | 1 at a time (a, then b) | paired cue: S6, R1 and the marker lit together (cause to effect); *the HIGH comes from the pull-up* arriving beside R1; no current drawn (0.33 µA into the meter and receiver: memory `signal-cues-only-when-needed`) | hold | R1 on, the meter on, the values | 3.30 V, HIGH; log rows 1–3 |
| 4 | S4's lever to *PULL* (`quick`); linked, M1's channel closes, the marker falls to the bottom, the meter 0.00, the current chip 0.70 mA arrives | 1 | paired cue: S4, M1, R1 and the current chip; **the current is the bench's** (§12): from the + rail through R1, along the bus into M1's drain and out of its source to ground, 0.70 mA; none into the receiver's input or the meter (high impedance) | hold | as above | 0.00 V, 0.70 mA; log row 4 |
| 5 | S4 back to *LET GO* (`quick`); the inset fades in beside the bus (`appear`, `normal`), its value 3.298 V | 1 at a time | the inset's source and resistor and R1 on the circuit lit together (C62, linked); then its three loads, one after another, as p6's clause names them | hold | the inset present | the inset with its loads; the full log |

Nothing flashes; nothing but s2's wander loops. No time is shown (the edge's RC is card 7's, said on the inset's wire:
*its capacitance: card 7*).

## 5. Pacing and interaction, by surface and view

As **§5 of card 3**, with these controls: in View after s5 (Explore, C37), **S4** (*LET GO · PULL*), **S6** (*PULL-UP OFF ·
ON*) and **the meter's clip**, on the hardware; every chip, the gauge, the meter, the inset's value and the log follow (with
the pull-up off and the meter on, the meter reads 0.00 and *what sets the level* says *the meter's 10 MΩ: it is the pull-down*,
card 5's lesson). The library has no transport of its own.

- **Presenter's strip**: the next step's title and "what changes"; the teacher tip (§7d); → ← R.
- **Study Mode and Scope**: the six steps, learner-paced; the poe answered before s2; Explore after s5.
- **Phone, locked**: as card 3.

## 6. The frame

As **§6 of card 3**; Parts' *Selected item*: *Bus* with its level, or *R1* with **0.70 mA**. Explore: S4, S6, the clip.
Identity bar: *Open-drain: pull low or let go · Holding · step n of 6*. Legend adds *MOSFET modelled by its on-resistance…*.

## 7. Thinking, not watching

- **7a. The PLAN's ASK** (verbatim): *poe (before the pull-up is added) — "The output transistor has let go. What decides the
  voltage on the line now?" options: The transistor's off-state voltage | Nothing yet: it floats until something pulls it | The
  receiver's input | The supply, directly answer: Nothing yet: it floats until something pulls it reveal: V2 to 0 V with no
  R1, then R1 added and the bus rising explain: An off transistor is an open switch with no voltage of its own, so the pull-up
  is the only source of the HIGH level and its resistance is that level's output impedance. depth: understand practice:
  developing models.* It fires at **p1, over s1**; its answer window is p2; **s2 and s3 are its reveal** (the PLAN's *"V2 to 0
  V with no R1, then R1 added and the bus rising"*).
- **7b. Prediction points on the bench**: the poe (above).
- **7c. After the reveal**: the explain; in Study, done = the poe answered and the six steps seen.
- **7d. Teacher tip** (**Proposal**, P7): *Learners think "output 1" means the output drives 3.3 V. Ask: with R1 removed and the
  transistor off, where would a HIGH come from?*
- **7e. Explore** (C37, after s5): S4, S6 and the clip.
- **HARVEST S14** (verbatim): *"Yesterday: high in, low out; impedance decides who disturbs whom. Here is the same argument in a
  digital costume. The pull-up is the source impedance of the HIGH, and every input and every centimetre of wire on the bus is
  its load."* Spoken at p6 (the Flow's own words), drawn at s5. Checked against D1·040's seed (`notes/Day01/040-sensor-as-source/en.md`,
  PLAN SEED: *"High in, low out: the impedances decide who disturbs whom. Tomorrow you'll hear this again, in ones and zeros."*)
  and the register (`course-plan.md`, S14: *"High in, low out — impedance decides who disturbs whom."*): the same idea, the
  same words in substance ✓ (*"the impedances decide"* against *"impedance decides"*: wording only).
- **ANALOGY** (verbatim): *A door on a spring: anyone holding it can pull it shut (LOW), and the spring opens it only when
  everyone lets go (HIGH). A stiffer spring opens it faster and is harder to hold shut, which is the pull-up trade. It breaks
  on the open: a door has no capacitance, and a bus edge is an RC charge, not a swing.* On its own card; nothing on the bench.
  Checked: *"anyone holding it"* is card 8's wired-AND ✓; *"stiffer … faster … harder to hold shut"* is card 7's trade (a smaller
  R: a faster RC edge, more sink current) ✓.

## 8. Faithfulness (the quality bar)

**The model** (recomputed in Node, 2026-10-20, `nums.mjs` in the session scratchpad). The bus node: R1 = 4.7 kΩ to 3.3 V (when
S6 is on); M1 as R_DS(on) = 1.8 Ω to ground (gate at 5 V) or open (gate at 0 V); the meter's 10 MΩ (when clipped on); the
receiver's leakage 0.4 nA (negligible at every state below).

| State | Bus | Meter | Reads | Current in R1 / M1 |
|---|---|---|---|---|
| s0: gate 5 V, no R1 | **0 V** (no source: M1 holds it at ground) | (parked) | LOW | 0 |
| s1–s2: gate 0 V, no R1 | **no DC path: undefined** (floating, as card 5) | (parked) | not guaranteed | 0 |
| s3, s5: gate 0 V, R1, meter on | 3.3 × 10 MΩ / (10 MΩ + 4.7 kΩ) = **3.2984 V** (1.55 mV below 3.3 V: the meter's load on the HIGH) | **3.30** | HIGH | 0.33 µA (into the meter) |
| s4: gate 5 V, R1 | 3.3 × 1.8 / (4700 + 1.8) = **1.26 mV** (3.7 mV with R_DS(on) at its 5.3 Ω max) | **0.00** | LOW | 3.3 / 4701.8 = **0.7019 mA** |

- **"About 0.7 mA through 4.7 kΩ"** (p4, the PLAN's Drive): 0.702 mA ✓ (3.3 / 4.7 kΩ = 0.7021 mA; the transistor's 1.8 Ω changes
  the fourth figure). **"The line rises to 3.3 V"** ✓ (3.298 V, the meter 3.30).
- **The MOSFET class (A7; P4).** 2N7000, onsemi datasheet *2N7000 / 2N7002 / NDS7002A* (formerly Fairchild): R_DS(on) 1.8 Ω typical, 5.3 Ω maximum at V_GS = 4.5 V,
  I_D = 75 mA (Diotec's 2N7000 gives 6 Ω max at the same point); V_GS(th) 0.8 / 2.1 / 3 V, so 5 V is well on and 0 V off; I_D(on) ≥ 75 mA at V_GS 4.5 V. At its 5 V gate it
  is at least as good. The PLAN's `mosfet-typical` (Studio's profile: R_DS(on) 45 mΩ at V_GS 10 V, I_D 5 A) is a power MOSFET;
  the bus values do not change with it (0.7021 mA, 32 µV), but a 5 A part is not what drives a logic line (gate 1): P4. The
  BSS138 class (SOT-23; onsemi BSS138: 1.0 Ω typ, 6.0 Ω max at V_GS 4.5 V, 0.22 A) would give the same picture.
- **"An open switch with no voltage of its own"** (p3, A5): the off MOSFET's channel conducts only its leakage (I_DSS ≤ 1 µA at
  V_DS = 48 V for the class; far less at 3.3 V): ✓, drawn as open.
- **The harvest (S14; A4).** The HIGH's Thévenin equivalent is 3.3 V behind 4.7 kΩ (the inset). Its loads: the meter's 10 MΩ
  takes **1.55 mV** (0.047 %), below the meter's 10 mV count; the receiver's leakage 0.4 nA × 4.7 kΩ = 1.9 µV; the wire's
  capacitance slows the edge (card 7's subject). *"High in, low out"*: 10 MΩ ≫ 4.7 kΩ, so the disturbance is small; it is the
  same law as D1·040 card 4's *1.65 V behind 5 kΩ* ✓.
- **The Status's *"the meter's 0 V"*** (A6): with the meter on a released bus and no pull-up, it reads 0.00 because it is the
  only path (card 5). The stops keep the meter parked until s3 so that p3's *"the line floats"* is what the stage shows (P2).
- **Cross-references (A4).** Card 5 (the wander, the gauge, the meter as the pull-down); card 7: at 4.7 kΩ its Equation gives
  (3.3 − 0.4) / 4.7 kΩ = **0.62 mA**, the current at I²C's maximum low level (V_OL 0.4 V), while this card shows **0.70 mA**
  at the transistor's actual 1.3 mV: both right under their stated conditions (card 7's Flow says *"3.3 V minus the 0.4 V low
  level"*); noted for card 7's spec, not a finding. Card 8 adds M2 to this bus.

**Section D, Animation rows**
- [x] Mechanism at every stop: a MOSFET switch (on-resistance, open when off), a pull-up, a floating node, Thévenin's equivalent.
- [x] Motion timing: none physical; s2's wander labelled illustrative; the RC edge said to be card 7's.
- [x] Every stop matches its Flow clause (§4a); every value recomputed (above).
- [x] Simplifications labelled (A6): *MOSFET modelled by its on-resistance…*; *open-drain output (stands in for a chip's
  driver)*; card 5's *Illustrative…*; card 3's labels.

**A1–A8**: A1 ✓; A2 ✓ (on-resistance, the meter's load on the HIGH, leakage; §9); A3 ✓ (a real small-signal part class, our own
board, unbranded); A4 ✓; A5 ✓; A6 ✓; A7 ✓ (no finding in card 6's text: statement, PLAN, the poe and its explain, the HARVEST,
the ANALOGY, Flow p0–p6); A8 ✓.

## 9. Faults and non-ideal behaviour

**PLAN FAULT**: none on this card. Card 7's FAULT (a 10 kΩ pull-up on a 400 kHz bus) and card 8's (push-pull contention) live on
those cards.

Non-ideal effects the real thing shows (**Proposal**, P7; Study only): R_DS(on) spread (1.8 Ω typical to 5.3 Ω maximum: the low
level 1.3 to 3.7 mV, invisible on the meter); the gate's own charge (the MOSFET switches in nanoseconds, not shown); a real chip's
open-drain output is its own internal transistor, with a stated V_OL at a stated sink current (card 7's 0.4 V at 3 mA).

## 10. Accessibility, legibility and print

As **§10 of card 3**. Check the inset (s5) and the current chip (s4) for collisions with R1's label at 1920 × 1080 and
1024 × 768. Print: the six stills with their sentences, the inset and the log.

## 11. Assets to make or source

| Asset | Format | Made by | Status |
|---|---|---|---|
| `open-drain` configuration of `logic-io`: M1 (TO-92, IEC MOSFET), S4, S6, R1, the bus to the receiver, the inset | in the `logic-io` library | the Benches lane | to request by crossing (the same crossing as cards 3, 5, 8) |
| The card's sequence `d2-010-open-drain`: the six stops of §4a | sequence library | the Benches lane | with the above |

**Reuse first**: everything in `logic-io` (card 3's §11 list); card 5's wander for s2 (one picture of floating); the look of
D1·040 card 4's Thévenin redraw (`D1-040-04-thevenin-redraw`, a Draw Bench drawing) for s5's inset, so the harvest shows the
room Day 1's picture.

## 12. Bench capabilities this needs

As **§12 of card 3**, plus C9 loop while held (s2) and C62 linked representations for the inset. **To confirm with Benches:
moving current**: at s4 only, 0.70 mA from the + rail through R1, along the bus into M1 and to ground; **none** into the
receiver's input or the meter; nothing at the other stops (memories `circuit-effects-are-the-benchs`,
`signal-cues-only-when-needed`). If the bench does not draw it, the 0.70 mA chip carries it.

## 13. Stand-in for the lecture

**Proposed (P6 a): none**: the card plays from its words, its poe and its analogy. (b) Not recommended: a still.

## 14. Findings for the owner

No **accuracy** finding in card 6's text (A1–A7 run on 2026-10-20: statement, PLAN SHOW / Drive / Look for / Status, the poe and
its explain, the HARVEST S14 against D1·040's seed, the ANALOGY, Flow p0–p6; §8).

New proposals (each a question; nothing here is pre-decided):

- **P1 — Proposal: s5, the HIGH drawn as its source** (the inset, §3), at p6. Options: **(a)** take it (**recommended**: the
  harvest says *"the pull-up is the source impedance of the HIGH"*; drawing it in D1·040's Thévenin look makes the
  cross-reference visible); (b) hold s4 under p6 (the harvest spoken over the circuit only).
- **P2 — Proposal: the meter parked until s3, the floating bus on the receiver's gauge.** The PLAN has *"a DMM on the bus"*
  throughout and the Status accepts *"the meter's 0 V"* for the floating state. Options: **(a)** the meter parked at s0–s2, the
  floating bus shown on the receiver's gauge with card 5's wander, the meter clipped on at s3 (**recommended**: with the meter on,
  the stage would show the meter, not *"nothing"*, setting the line, and p3's *"the line floats, exactly like the input we just
  met"* would be contradicted by card 5's own lesson); (b) the meter on throughout, s2 reading 0.00 with *"the meter's 10 MΩ is
  the only path"*, as the U019 brief drew it.
- **P3 — Proposal: the gate's drive.** The PLAN's V2 is a second supply (0 V or 5 V). Options: **(a)** a slide switch *LET GO ·
  PULL* on the breadboard tying the gate to ground or to the board's *5V* pin (**recommended**: the control on the hardware, no
  second instrument on the bench); (b) a second bench supply as V2.
- **P4 — Proposal: the MOSFET class.** Options: **(a)** a small-signal TO-92 N-MOSFET of the 2N7000 class, R_DS(on) 1.8 Ω typical
  (**recommended**: a part that really drives logic lines, breadboard-mounted); (b) a SOT-23 BSS138 class on an adapter (1.0 Ω
  typ); (c) the PLAN's `mosfet-typical` (a 5 A power MOSFET: same numbers, wrong object).
- **P5 — Proposal: the Flow's demo cues.** p0 *"[[demo]] Electronics Bench — an open-drain output, first with no pull-up."* and
  p4's *"[[demo]] Now add…"* (unchanged). Options: **(a)** p0 → *"[[demo]] Animation Bench — an open-drain output, first with no
  pull-up."* (**recommended**, as D1·090's P9); (b) keep.
- **P6 — Proposal: the stand-in.** **(a)** none (**recommended**); (b) a still.
- **P7 — Proposal: the teacher tip (§7d) and §9's non-ideal notes** in Study (the Parts cards). Take both (**recommended**), the
  tip only, or neither?
- **Reported**: 2.6 min (1.6 on the bench), the analogy card besides; the module ≈ 31.6 of 30 min (D5; `D2-010-07` §2b). Nothing is cut.

Decided 2026-10-20 (owner: *"apply all recommendations"* on the U019 brief): D1 (an Animation Bench demonstration by Benches,
one scene library for cards 3, 5, 6, 8, one crossing), N1 (no product name), N2 (no demo numbers in the cues).

## 15. Acceptance: how we know it is built right

- The six steps of §4a play on the wall, the presenter's window and Study Mode in order, each arriving at its first frame and
  holding at its end (s2 looping), with §8's values: gauge 0 V · ? · no defined value · 3.298 V · 1.3 mV · 3.298 V; meter parked ·
  parked · parked · 3.30 · 0.00 · 3.30; current 0.70 mA at s4 only; the log's four rows; the inset's *3.3 V behind 4.7 kΩ* and
  3.298 V.
- Every value computed from the node (memory `input-drives-every-output`): in Explore, every S4 × S6 × clip state gives its
  value; R_DS(on) set to 5.3 Ω gives 3.7 mV, the meter still 0.00; R1 changed recomputes the current and the inset.
- Card 5's wander is the same component, look and pace (one picture of floating).
- B1–B20 as card 3's §15, with B6's paired cue at s3, s4, s5; B9 the poe at s1, the reveal at s2–s3; B17 the log and the inset
  beside the circuit.
- C2–C8, E1–E6; the six gates reported by Benches with the stills (EN and FR).
- **Six gates (this spec)**: (1) realism: a real small-signal MOSFET class on a breadboard, its gate on a switch on the board,
  the receiver the course's MCU input, the course's handheld; nothing branded ✓; (2) science: an off MOSFET as an open switch, a
  floating bus, the pull-up as the only HIGH, the HIGH's Thévenin equivalent and its loads ✓; (3) maths: 0.7019 mA, 1.26 mV
  (3.7 at the maximum), 3.2984 V, 1.55 mV recomputed; card 7's 0.62 mA reconciled ✓; (4) visualization: the HIGH vanishes when
  the gate lets go, and appears with R1; the current flows only when M1 pulls against R1; the harvest drawn as Day 1's
  picture ✓; (5) consistency: card 5's gauge, wander and meter lesson; card 3's library and palette; D1·040's seed and Thévenin
  look; the PLAN's meter-on-the-bus and the Flow's *"the line floats"* reconciled by P2, named, not changed ✓; (6) design: as
  card 3; no departure from ExSight's rules. No accuracy finding in the owner's text; nothing in it was edited.
