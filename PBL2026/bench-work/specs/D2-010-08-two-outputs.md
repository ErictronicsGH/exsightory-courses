```yaml
id: D2-010-08-two-outputs
card: "Two outputs on one wire"
module: notes/Day02/010-digital-interfaces/en.md
bench: Animation                  # D1, decided 2026-10-20: an Animation Bench demonstration built by the Benches lane on one crossing; the PLAN's Draw and Figure are ours (D2)
library: "sequence `d2-010-two-outputs`, four blocks, one at a time: A `logic-io` (`config: two-outputs`, Benches; designed in D2-010-03-level-shifting §3), B `wired-and` (the PLAN's Draw: ours, a Draw Bench drawing), C `i2c-byte-ack` (the PLAN's Figure: ours, an SVG), A′ `logic-io` again (`outputs: push-pull`, the FAULT); the Benches part asked by the same crossing as cards 3, 5, 6 (crossing-d2-010-logic-io.request.md, final 2026-10-20; its id assigned when it is raised)"
dimensions: 2D
stand_in: "blocks B and C play today on the Draw and Figure benches (ours); blocks A and A′ from the words (P7 a, decided 2026-10-20)"
optional_benches: [Electronics, Draw, Figure]   # the PLAN's SHOW: Electronics (deferred), then Draw, then Figure
real_thing: "two small-signal N-MOSFET open-drain outputs (2N7000 class, TO-92) on one bus wire with a 4.7 kΩ pull-up to 3.3 V on a breadboard, the course's handheld meter on the bus, a 3.3 V MCU input as the receiver; one I²C byte as UM10204 defines it (data stable while SCL is HIGH, the ACK in the ninth clock); two push-pull 3.3 V logic outputs of the LVC class for the FAULT; drawn beside the IEC 60617 schematic"
minutes: 1.9                      # on the bench, all four blocks (§2)
card_minutes: 2.9                 # the whole card, the poe's answer window included (§2)
status: spec-ready                # D1, D2, N2 applied; P1–P8 decided 2026-10-20 (round two: all recommendations) and applied; C69 stated (§12: asked of Benches in the crossing; the design does not wait on it); nothing open
learner_action: poe
predictions: [a1-question]        # the poe is asked over a1 (the Flow's p1), answered at a2
seeds: []
key_variable: "which outputs pull: the line is HIGH only when every output lets go"
time_scale: "none for blocks A, B and A′ (steady states); block C's timing diagram is a picture of one byte, not to time scale (labelled)"
steps: 13                         # A: a0–a5 · B: b0–b1 · C: c0–c2 · A′: f0–f1
```

**Written 2026-10-20 (U019)** after the owner's choices on the U019 brief (*"apply all recommendations"*): **D1** (the
Electronics widget deferred; an Animation Bench demonstration by Benches, one scene library for cards 3, 5, 6, 8), **D2** (the
PLAN's Draw, the wired-AND construction, and Figure, the I²C byte with its ACK, are ours, specified now), **N2** (no demo
numbers). The library's layout, scale, colours, symbols, meter, gauge and shared words are **`D2-010-03-level-shifting` §3**
(*§3 of card 3*); block A extends card 6's `open-drain` configuration (`D2-010-06-open-drain` §3, *§3 of card 6*) with a second
output. The U019 brief's card-8 drawings (`draw8()`, the truth table and the byte) are the approved model.

**Round two, 2026-10-20** (the U019 brief's *Specs: round two*; owner: *"apply all recommendations"*): P1–P8 take their
recommended options, stated below as the design: one sequence of four blocks, **A → B (ours, Draw) → C (ours, Figure) → A′**
(the push-pull FAULT, *≈ 64 mA* labelled an estimate) (P1); the truth table in block A, beside the circuit, none in B (P2);
the table's convention *1 = lets go, 0 = pulls*, so the line is the AND (P3); the FAULT's LVC-class model, with the Study cases
(P4); block C's rising edges slower than its falling ones (P5); p0's cue now *"[[demo]] Animation Bench — …"* (P6, applied by
the lead); blocks B and C play today, A and A′ from the words until the library lands (P7); the teacher tip and a Study-only
prediction at f1 (P8).

**What is whose** (the task's question, answered once here and kept in §3, §4 and §11):

| Block | What it shows | The PLAN's | Built by | Format |
|---|---|---|---|---|
| **A** `logic-io` · `two-outputs` | the circuit: two N-MOSFET outputs on one pulled-up bus, the meter, the currents; the poe and its reveal; the four cases of the Drive, **the truth table written beside the circuit as each case lands** (computed from the circuit, so it must live in the scene) | *Electronics — …* (Drive) and *the truth table written beside it as each case is stepped* (P2) | **the Benches lane** | Animation Bench scene library |
| **B** `wired-and` | the construction: one pulled-up line, outputs added one at a time to three, the rule, the AND element | *Then Draw: the wired-AND construction, one pulled-up line and outputs added one at a time* | **ours** (the course) | Draw Bench drawing (`drawing` fence, `wired-and.benchdrawing`) |
| **C** `i2c-byte-ack` | one I²C byte with its ACK: SCL, SDA, who drives SDA in each clock | *then Figure: one I²C byte with its ACK…* | **ours** | SVG with named parts (`figure` fence, `i2c-byte-ack.svg`) |
| **A′** `logic-io` · `push-pull` | the FAULT: two push-pull outputs, one driving HIGH and one LOW, the contention current | *FAULT …* | **the Benches lane** | the same scene library, `params` |

## 1. What the room must understand

- **Statement** (verbatim): *Wired-AND falls out of open-drain for free: the line is high only when every output lets go, and
  any one of them can pull it low. That is why the I²C bus can share two lines among several devices.*
- **SHOW** (verbatim from the PLAN): *Electronics — `open-drain-bus` with a second MOSFET M2 (gate from V3) on the same
  pulled-up bus.*
- **Drive** (verbatim): *both released (HIGH) → M1 pulls (LOW) → M1 releases, M2 pulls (LOW) → both pull (LOW). Then Draw: the
  wired-AND construction, one pulled-up line and outputs added one at a time, the truth table written beside it as each case is
  stepped; then Figure: one I²C byte with its ACK, where the receiver pulls SDA low on a line the transmitter has released.*
- **Look for** (verbatim): *any one output wins LOW; the line is HIGH only when every output lets go.*
- **Status** (verbatim): *ready (Electronics) · needs Draw: wired-AND construction with its truth table · needs asset: I²C
  byte-and-ACK timing diagram (ours to redraw).*
  The PLAN names the Electronics Bench (written before D1); block A is the Animation Bench. The Flow's p0 cue now names it:
  *"[[demo]] Animation Bench — two open-drain outputs sharing one pulled-up line."* (P6, decided and applied 2026-10-20).
- **Decided by the owner, 2026-10-20** (applied here): **D1**, **D2** (as above), **N2**. **Round two** (2026-10-20, *"apply
  all recommendations"*): **P1–P8** as recommended (§14).
- **Insight**: *open-drain outputs on one pulled-up line compute an AND for free: any output that pulls wins, so the line is
  HIGH only when every output lets go; that is how I²C devices share a line and how a receiver acknowledges; push-pull outputs
  on one line fight instead.*
- **Kind of knowledge**: *a relation* (the line against the outputs' states) built through *a process* (cases stepped) and
  then *a picture built up* (the construction) and *a structure in time* (the byte). Card test: the circuit and the FAULT →
  **Animation** (cause and effect, D1); the construction → **Draw** (a picture built up); the byte → **Figure** (a still
  document toured). B15 applies (block A's parts met first); B17 applies (the truth table beside the circuit, linked); B18, B19
  do not.
- **Why these benches, not a still**: the AND is a relation over four states; the room must see each output's switch move and
  the line answer it, the table filling row by row, rather than read a table. The ACK is a still picture of a moment in time,
  which a Figure carries best; the FAULT needs the current to appear when the second output drives HIGH.
- **Key variable**: which outputs pull.

## 2. Time

The card's Flow, counted from en.md on 2026-10-20 (words ÷ 130 wpm; cue tags not counted; the em dash counted): **224 words**,
of which p0 (10) is a stage direction; **214 spoken = 1.65 min**. Recounted after round two (2026-10-20): still 224; p0's cue
changed *Electronics* for *Animation*, one word for one, and is a stage direction, not counted in the spoken minutes. The
minutes stand.

| # | Paragraph (first words) | Words |
|---|---|---|
| p0 | *"[[demo]] Animation Bench — two open-drain outputs sharing one pulled-up line."* (stage direction) | 10 |
| p1 | *"[[ask]] One output pulls low, the other lets go. What is the line?"* | 12 |
| p2 | *"[[pause]]"* | — |
| p3 | *"[[reveal]] Low. The output that lets go neither supplies nor draws any current…"* | 25 |
| p4 | *"[[demo]] Now step through every case. Both let go: high. Either one pulls: low. Both pull: low. Add a third output…"* | 66 |
| p5 | *"This is why I²C can share two lines among several devices…"* | 43 |
| p6 | *"You can see it in every I²C byte…"* | 35 |
| p7 | *"Compare a push-pull output, which drives high as well as low…"* | 33 |

| Beat | Minutes | Source of the number |
|---|---|---|
| a0 on the stage from p0's cue | 0 | not spoken |
| p1 (12) with a1: M1 pulls, the line's value withheld | 0.09 | 12 ÷ 130 |
| The poe's answer window and tally (p2), the bench held at a1 | 1.00 | the course's estimate for a four-option poe |
| p3 (25) at a2 (the reveal) | 0.19 | 25 ÷ 130 |
| p4 (66): a3, a4, a5 on its three short sentences (16 words), then block B at *"Add a third output"* (b0), b1 at *"That is a logical AND"* | 0.51 | 66 ÷ 130 |
| a1–a5 and b0–b1: switch moves and the hand-over to B, each ≈ 1.5–2 s, not covered | 0.15 | estimate, 7 × ≈ 1.3 s |
| p5 (43) over b1 held | 0.33 | 43 ÷ 130 |
| p6 (35): block C, c0–c2 | 0.27 | 35 ÷ 130 |
| C's hand-over and two spotlight moves, not covered | 0.07 | estimate, 3 × ≈ 1.5 s |
| p7 (33): block A′, f0 at its first sentence, f1 at the second | 0.25 | 33 ÷ 130 |
| A′'s hand-over and f1's switch, not covered | 0.06 | estimate, 2 × ≈ 2 s |
| **On the bench** (all four blocks; the answer window excluded) | **1.9** | 1.92 |
| **Card total** | **2.9** | 2.92 |

p4 drives three stops in sixteen words (*"Both let go: high. Either one pulls: low. Both pull: low."*): the presenter pauses a beat at
each full stop so each lands (counted above), and one more at the hand-over to block B. **Module check**: see
`D2-010-03-level-shifting` §2.

## 3. The scene

### 3a. Block A: `logic-io`, `config: two-outputs` (Benches)

Card 6's `open-drain` configuration (*§3 of card 6*: M1, S4, the bus, the receiver and its gauge, R1 4.7 kΩ on S6, the meter)
with a second output on the same bus, and the pull-up **on throughout** (S6 *ON*). The meter is clipped on the bus from a0
(there is no floating state on this card). Labels follow the PLAN (*M1*, *M2*, *R1*).

| id | Part | Value, and its source | Drawn as (bench · schematic) |
|---|---|---|---|
| `q1`, `s4` | **M1** and its gate switch *LET GO · PULL* | as card 6: 2N7000 class, R_DS(on) 1.8 Ω typical | as card 6 |
| `q2`, `s5` | **M2** and its gate switch *LET GO · PULL* (the PLAN's *"gate from V3"*: a second switch, as card 6's P3) | the same part and value | a second TO-92 on the breadboard, its drain on the bus row · a second IEC MOSFET in its own dashed box *output 2* |
| `bus`, `rx`, `r5`, `dmm` | the bus, the receiver, R1 4.7 kΩ, the meter | as card 6 | as card 6 |
| `tt` | **The truth table**, beside the circuit (the scene's run log in table form; P2, decided) | columns *output 1 · output 2 · line*, each output in **its own logic level: 1 = lets go, 0 = pulls** (P3, decided), the line computed; four rows in fixed places, each written when its case lands, the current row lit | a table panel right of the schematic, under the title *each output: 1 = lets go, 0 = pulls* |

**Values beside their element**:

| Chip | Where | Values (a0 → a5) |
|---|---|---|
| The meter's LCD | on the meter | 3.30 · 3.30 (a1: the line's chip withheld, the LCD covered by *?*) · 0.00 · 3.30 · 0.00 · 0.00 |
| The gauge and *the input reads* | the receiver | HIGH · ? · LOW · HIGH · LOW · LOW |
| Current through R1 | beside R1 | 0 · ? · 0.70 mA · 0 · 0.70 mA · 0.70 mA |
| Current in each output | beside M1, M2 | — · ? · M1 0.70, M2 0 · — · M1 0, M2 0.70 · 0.35 and 0.35 mA |

**Truth table** (P3, decided), columns *output 1 · output 2 · line*: *1 1 → 1 (HIGH)* written at a0 and lit again at a3; *0 1 → 0*
(M1 pulls) written at a2; *1 0 → 0* (M2 pulls) written at a4, with the *0 1* row lit again beside it (*"Either one pulls"*);
*0 0 → 0* written at a5.

### 3b. Block B: `wired-and` (ours: a Draw Bench drawing)

A clean line drawing (Draw Bench inks, IEC symbols), not the breadboard: the abstraction after the circuit.

| Step | Draws (the `say`) | Ink |
|---|---|---|
| b0 | One line, its pull-up to 3.3 V at the top; **outputs drawn as switches to ground**, labelled by what they do: output 1 and output 2 as block A left them (both pulling), then **a third added** (`trace`), all three letting go → the line HIGH; any one closed → LOW. The rule written under it: *the line is HIGH only when every output lets go; any one can pull it LOW*. | the line teal, the pull-up amber, the switches ink |
| b1 | Beside it, the **equivalent**: an IEC AND element (a rectangle with *&*) whose three inputs are the outputs' levels (1 = lets go) and whose output is the line; the words *wired-AND*. Held under p5. | ink; *&* in the element |

No truth table in block B (P2, decided): with three outputs it would be eight rows, and block A's four rows have already been written
from the circuit; B states the rule instead.

### 3c. Block C: `i2c-byte-ack` (ours: an SVG Figure, toured)

Our own drawing (*"redrawn after NXP UM10204, §3.1.3–3.1.6"*, said on it), unbranded, not to time scale (said).

| Named part | What it is | Source |
|---|---|---|
| `scl`, `sda` | two traces, HIGH and LOW levels marked; **rising edges drawn slower than falling ones** (an RC rise against a transistor's pull: card 7's edge), labelled *rise: the pull-up charging the bus* (P5, decided) | UM10204 §3.1.1 (open-drain lines, pull-ups) |
| `start` | the START condition: SDA falls while SCL is HIGH | UM10204 §3.1.4 |
| `bits` | eight data bits, **1 0 0 1 0 0 0 0** (0x90: a 7-bit address 1001000, 0x48, and the write bit 0), each changing while SCL is LOW and stable while SCL is HIGH; the controller (transmitter) drives them, teal | UM10204 §3.1.3, §3.1.5 (MSB first), §3.1.10 (address + R/W) |
| `ack` | the ninth clock: the transmitter **releases** SDA (its own drive drawn dashed at HIGH, *lets go*), the receiver **pulls** SDA low (rose), SDA LOW for the whole HIGH of SCL: **ACK** | UM10204 §3.1.6 |
| `who` | two thin rows under SDA, *transmitter* and *receiver*, each 1 (lets go) or 0 (pulls) per clock; SDA = their AND | the card's own point (block A's table) |
| `more` | after the ACK, *…the next byte, or STOP* | UM10204 §3.1.4 |

Tour stops (the Figure Bench's tour): **c0** the whole byte (*"You can see it in every I²C byte."*); **c1** the ninth clock
spotlit (*"After eight bits, the transmitter lets go of the data line and the receiver pulls it low to say 'received'."*);
**c2** the two *who* rows and SDA lit together (*"That acknowledge bit is wired-AND at work."*).

### 3d. Block A′: `logic-io`, `outputs: push-pull` (Benches; the FAULT)

The same bus, R1 and meter; M1 and M2 replaced by **two push-pull outputs**: on the breadboard two small 3.3 V logic buffers
(SOT-23-5 on breadboard adapters, unmarked), each input on its own switch *LOW · HIGH*; on the schematic, each a dashed box
*push-pull output* holding its two transistors (a P-channel to 3.3 V over an N-channel to ground, IEC symbols), drawn by their
equivalent on-resistances (§8).

| Chip | f0 (both HIGH) | f1 (output 1 LOW, output 2 HIGH) |
|---|---|---|
| Line (gauge, meter) | 3.30 V, HIGH | **≈ 1.5 V**, *not guaranteed* (the meter 1.46) |
| Current from 3.3 V through output 2's high side into output 1's low side | 0 | **≈ 64 mA (estimate)** |
| Beside it | — | *past the ±50 mA a logic output of this class may carry* |

**Words the room reads** (adds to cards 3 and 6; French drafts mine, for the owner's review):

| en | fr |
|---|---|
| output 1 · output 2 · line · *each output: 1 = lets go, 0 = pulls* | sortie 1 · sortie 2 · ligne · *chaque sortie : 1 = relâche, 0 = tire* |
| *the line is HIGH only when every output lets go; any one can pull it LOW* · wired-AND | *la ligne n'est HAUTE que si toutes les sorties relâchent ; une seule suffit à la tirer BAS* · ET câblé |
| transmitter · receiver · START · ACK · *the next byte, or STOP* · *rise: the pull-up charging the bus* | émetteur · récepteur · START · ACK · *l'octet suivant, ou STOP* · *montée : la résistance de tirage charge le bus* |
| *Redrawn after the I²C specification (UM10204); not to time scale* | *Redessiné d'après la spécification I²C (UM10204) ; pas à l'échelle du temps* |
| push-pull output · *estimate: the outputs' strength varies by part* · *past the ±50 mA a logic output of this class may carry* | sortie push-pull · *estimation : la force des sorties varie selon la pièce* · *au-delà des ±50 mA qu'une sortie logique de cette classe peut supporter* |

(UM10204 is a document's name, cited as the source on the Figure; it names no product.)

## 4. The run: step by step, as the Flow goes

### 4a. Steps

| # | id | Block | Flow clause | What changes (the `say`) | Overlay | Presenter |
|---|---|---|---|---|---|---|
| 0 | `a0-meet` | A | on the stage from p0's cue | Meet the bus: two N-MOSFET outputs, both letting go, a 4.7 kΩ pull-up to 3.3 V, a 3.3 V input and the meter. The line is HIGH, 3.30 V; the truth table's first row is written. | *both let go · 3.30 V · HIGH* | (with the card) |
| 1 | `a1-question` | A | p1 *"[[ask]] One output pulls low, the other lets go. What is the line?"*; held through p2 | Output 1 pulls, output 2 lets go. What is the line? | *output 1 pulls · output 2 lets go · line ?* | Next (the poe follows) |
| 2 | `a2-low` | A | p3 *"[[reveal]] Low. … the one transistor that conducts holds the line down against the pull-up."* | Low: the meter reads 0.00. Output 2 neither supplies nor draws current; 0.70 mA flows from 3.3 V through the pull-up into output 1. | *LOW · 0.70 mA into output 1 · none in output 2* | Next (on *[[reveal]]*) |
| 3 | `a3-both-let-go` | A | p4 *"Both let go: high."* | Both let go: nothing pulls, and the line is HIGH. | *1 1 → HIGH* | Next |
| 4 | `a4-either` | A | p4 *"Either one pulls: low."* | Output 2 pulls alone: LOW again, its current the same 0.70 mA; either one pulling wins. | *0 1 → LOW · 1 0 → LOW* | Next |
| 5 | `a5-both-pull` | A | p4 *"Both pull: low."* | Both pull: LOW, the pull-up's 0.70 mA shared, 0.35 mA each. The table is complete: HIGH only in its first row. | *0 0 → LOW · table complete* | Next |
| 6 | `b0-third` | B | p4 *"Add a third output and the rule does not change: the line is high only when every output lets go, and any one of them can pull it low."* | The circuit as a drawing: one line, its pull-up, outputs as switches to ground; a third is added, and the rule is the same: HIGH only when every output lets go. | *the rule* | Next (hand-over to B) |
| 7 | `b1-and` | B | p4 *"That is a logical AND, … It is called wired-AND."*; held under p5 | The line is the AND of the outputs' levels: an AND element drawn beside it. Wired-AND. | *wired-AND = &* | Next |
| 8 | `c0-byte` | C | p6 *"You can see it in every I²C byte."* | One I²C byte: START, eight bits sent by the transmitter, each read while the clock is HIGH. | *one byte* | Next (hand-over to C) |
| 9 | `c1-ack` | C | p6 *"After eight bits, the transmitter lets go of the data line and the receiver pulls it low to say 'received'."* | The ninth clock: the transmitter lets go of SDA, the receiver pulls it LOW: ACK. | *ninth clock · ACK* | Next |
| 10 | `c2-wired-and` | C | p6 *"That acknowledge bit is wired-AND at work."* | Transmitter 1 (lets go), receiver 0 (pulls): SDA is their AND, LOW. | *1 AND 0 = 0* | Next |
| 11 | `f0-push-pull` | A′ | p7 *"Compare a push-pull output, which drives high as well as low."* | The two outputs are now push-pull: each drives HIGH through its own upper transistor as well as LOW; both HIGH, the line is 3.30 V. | *push-pull · both HIGH* | Next (hand-over to A′) |
| 12 | `f1-contention` | A′ | p7 *"Put two of those on one wire, one driving high and the other low, and they short the supply through each other."* | Output 1 drives LOW while output 2 drives HIGH: about 64 mA runs from 3.3 V through both outputs to ground, and the line sits near 1.5 V, where neither level is guaranteed. | *≈ 64 mA (estimate) · line ≈ 1.5 V* | Next (the bench is done) |

### 4b. Motion, cues and stills per step

| # | Motion | Movers | Cue and its second channel (B6) | Hold | Reduced motion (C3) | Still (B4) |
|---|---|---|---|---|---|---|
| a0 | none (arrives whole) | 0 | the parts highlighted as the meet line names them; row *1 1* written | hold | the same | both let go, 3.30, row 1 |
| a1 | S4's lever to *PULL* (`quick`); the line's chips, the LCD and the gauge's marker covered by *?* (the poe's answer is not on the stage) | 1 | S4 and M1 lit | hold | the lever, *?* | output 1 pulls, *?* |
| a2 | the *?* covers lift; linked, the marker falls, the LCD 0.00, the current chips arrive; row *0 1* written | 1 | paired cue: M1, R1, the bus and row lit; **the current is the bench's** (§12): from the + rail through R1, along the bus into M1, to ground, 0.70 mA; **none in M2** | hold | the values, the row | LOW, 0.70 mA into M1 |
| a3 | S4 to *LET GO* (`quick`); linked, the line rises, row *1 1* lit | 1 | paired cue: S4, the line, the row | hold | as above | HIGH |
| a4 | S5 to *PULL* (`quick`); linked, the line falls, M2's current chip, row *1 0* written, row *0 1* lit with it | 1 | paired cue: S5, M2, the two *either* rows; current through M2 only | hold | as above | LOW, 0.70 mA into M2 |
| a5 | S4 to *PULL* (`quick`); linked, both current chips 0.35 mA, row *0 0* written; the whole table outlined | 1 | paired cue: both switches, both transistors, the row; current split equally | hold | as above | LOW, 0.35 + 0.35 mA, full table |
| b0 | the bench hands over to block B (a fade, the bench's); the line, the pull-up and two switches **traced** (`trace`), then the third switch traced; the three switches open → *HIGH*, then one closed → *LOW*; the rule written | 1 at a time | each element as it is traced; the rule's words arrive last | hold | the drawing complete, the rule | three outputs, the rule |
| b1 | the AND element traced beside the line, its three inputs from the switches' levels | 1 | the element and the line lit together | hold | complete | the equivalent |
| c0 | hand-over to block C; the Figure whole | 0 | the eight bits outlined | hold | the same | the byte |
| c1 | spotlight on the ninth clock (the rest dimmed) | 1 | the transmitter's dashed release and the receiver's rose pull lit together | hold | the spotlight | ACK |
| c2 | spotlight widened to the two *who* rows and SDA | 1 | paired cue: *1*, *0* and SDA's LOW | hold | the same | 1 AND 0 = 0 |
| f0 | hand-over to block A′ (the bench's fade); the push-pull boxes, both inputs *HIGH* | 0 | each push-pull box's upper transistor lit (*drives HIGH as well*) | hold | the same | both HIGH, 3.30 V |
| f1 | output 1's switch to *LOW* (`quick`); linked, the line falls to ≈ 1.5 V on the gauge (*not guaranteed*), the contention chip arrives in rose with its *past the ±50 mA…* line | 1 | paired cue: output 2's upper transistor, the line, output 1's lower transistor lit together, rose; **the current is the bench's**: from the + rail through output 2's upper transistor, along the line, through output 1's lower transistor to ground, ≈ 64 mA (90 × the open-drain case's 0.70 mA: its speed and brightness say so), plus 0.39 mA through R1 | hold | the values, rose | contention, ≈ 64 mA |

Nothing flashes; nothing loops. Block C is not to time scale (labelled); blocks A and A′ show steady states only.

## 5. Pacing and interaction, by surface and view

As **§5 of card 3**, with one sequence and four blocks, one at a time (memory `one-block-at-a-time`): the bench's transport steps
through each block's stops and on into the next; the rail shows the blocks with their stops. Controls on the hardware in Explore
(after f1, C37): block A's **S4**, **S5** (and the meter's clip); block A′'s two input switches *LOW · HIGH*. Blocks B and C have
no controls (a drawing and a figure). The library has no transport of its own.

- **Presenter's strip**: the next stop's title and "what changes"; the teacher tip (§7d); → ← R.
- **Study Mode and Scope**: the thirteen stops, learner-paced; the poe answered before a2; Explore after f1 on block A and A′
  (the learner can return to block A by the rail).
- **Phone, locked**: as card 3; block C reads in portrait with its two *who* rows under SDA.

## 6. The frame

As **§6 of card 3**. Parts' *Selected item*: *Line* with its level, *M1* / *M2* with its current, or *Contention* with **≈ 64
mA**. Explore: S4, S5; the push-pull inputs. Identity bar: *Two outputs on one wire · Holding · block n of 4 · stop n*. Legend
adds the truth table's *1 = lets go, 0 = pulls*, block C's *Redrawn after … not to time scale* and A′'s *estimate…*.

## 7. Thinking, not watching

- **7a. The PLAN's ASK** (verbatim): *poe (before the statement) — "One output pulls low, the other lets go. What is the line?"
  options: LOW | HIGH | Halfway | Undefined answer: LOW reveal: M1 on, M2 off: the DMM on the bus reads near 0 V explain: A
  released output neither supplies nor draws current, so the one transistor that conducts holds the line against the pull-up,
  and the bus computes the AND of everyone's "let go". depth: understand practice: developing models.* It fires at **p1, over
  a1**; its answer window is p2; **a2 is its reveal** (*"the DMM on the bus reads near 0 V"*: 0.00 ✓).
- **7b. Prediction points on the bench**: the poe. **Decided (P8)**, Study and Scope only: at f1, *"One push-pull output drives
  HIGH, the other LOW. What is the line?"* (HIGH · LOW · somewhere between, and a large current · undefined); not on the wall.
- **7c. After the reveal**: the explain. In Study, done = the poe answered and the thirteen stops seen.
- **7d. Teacher tip** (decided, P8): *Learners expect the line to be "half" when one pulls and one lets go (the poe's
  *Halfway*). Ask: how much current does an output that has let go supply?*
- **7e. Explore** (C37, after f1): S4, S5 (block A); the push-pull inputs (block A′). Blocks B and C: none.

## 8. Faithfulness (the quality bar)

**Block A's model** (recomputed in Node, 2026-10-20, `nums.mjs` in the session scratchpad): the bus with R1 = 4.7 kΩ to 3.3 V;
each output 1.8 Ω to ground when pulling (2N7000 class, card 6 §8), open when letting go; the meter 10 MΩ.

| Outputs (1 = lets go) | Line | Meter | Current in R1 | In M1 / M2 |
|---|---|---|---|---|
| 1 1 | 3.3 × 10 MΩ / (10 MΩ + 4.7 kΩ) = **3.2984 V** | 3.30 | 0.33 µA (the meter) | 0 / 0 |
| 0 1 (M1 pulls) | **1.26 mV** | 0.00 | **0.7019 mA** | 0.70 / 0 |
| 1 0 (M2 pulls) | 1.26 mV | 0.00 | 0.7019 mA | 0 / 0.70 |
| 0 0 (both) | 3.3 × 0.9 / 4700.9 = **0.63 mV** | 0.00 | **0.7020 mA** | **0.351** / **0.351** |

- **The AND** (A5): with 1 = lets go, line = output 1 AND output 2 (the table above) ✓; the PLAN's explain says it in the same
  terms (*"the AND of everyone's 'let go'"*) ✓; p4's *"That is a logical AND"* ✓. **P3**: the U019 brief's table labelled *1 =
  pulls*, under which the same line column is a NOR of the pull signals, beside the word AND; ours to fix, not the owner's text.
- **"No current flows except through the pull-up"** (p5): in every case the only DC path is 3.3 V → R1 → the pulling
  transistor(s) → ground; at most 0.70 mA ✓. **"Two devices can never fight"** ✓ (no output ever drives HIGH).
- **The byte (A7).** NXP UM10204, *I²C-bus specification and user manual*, Rev. 7.0 (1 October 2021): §3.1.3 data valid while
  SCL is HIGH, changes while LOW; §3.1.4 START (SDA falls while SCL is HIGH) and STOP; §3.1.5 bytes of eight bits, MSB first;
  §3.1.6 *"the transmitter releases the SDA line during the acknowledge clock pulse so the receiver can pull the SDA line LOW
  and it remains stable LOW during the HIGH period of this clock pulse"* (the ACK, the ninth clock); §3.1.10 the first byte, a
  7-bit address and the R/W bit. Our byte: address 1001000 (0x48) + W (0) = **1001 0000 = 0x90** ✓ (recomputed). p6's
  *"After eight bits, the transmitter lets go of the data line and the receiver pulls it low to say 'received'"* ✓; *"That
  acknowledge bit is wired-AND at work"* ✓ (the transmitter's 1 AND the receiver's 0 = 0).
- **The FAULT's numbers (A1, A2, A6; P4, decided (a)).** A push-pull 3.3 V logic output of the LVC class, from its **guaranteed** drive (TI
  SN74LVC1G125 datasheet, SCES223, cited here only): at V_CC = 3.0 V, V_OH ≥ 2.3 V at I_OH = −24 mA and V_OL ≤ 0.55 V at I_OL =
  24 mA, so its equivalent on-resistances are at most **29.2 Ω** (high side: (3.0 − 2.3) / 0.024) and **22.9 Ω** (low side:
  0.55 / 0.024); continuous output current **±50 mA** absolute maximum. Two such outputs, one HIGH and one LOW, with R1 on the
  line: the node gives **V_line = 1.457 V**, **63.6 mA** into the low side (63.2 mA from the high side, 0.39 mA through R1).
  From the 16 mA points (V_OH ≥ 2.4 V, V_OL ≤ 0.4 V: 37.5 Ω and 25.0 Ω) the same node, R1 included, gives **53.1 mA** into the
  low side, the line at 1.33 V (52.8 mA in the two on-resistances alone; round one wrote 52.8 for the node's figure, corrected
  2026-10-20, ours). So: *about 50–65 mA from the rated drive*,
  more with typical parts (which drive harder than their guarantee), and the linear model ignores the transistors' saturation:
  hence **"≈ 64 mA (estimate)"** and the label *"estimate: the outputs' strength varies by part"*; past the ±50 mA rating ✓.
  The line, ≈ 1.5 V, is inside the *not guaranteed* band (0.825–2.475 V) ✓. Dissipation ≈ 116 mW in the high side and 93 mW in
  the low side of two small packages. *"They short the supply through each other"* (p7): a low-resistance path from the rail to
  ground through the two on-transistors ✓ (a "short" in the engineering sense: tens of ohms, not zero; A6 acceptable).
  With one push-pull HIGH against an open-drain 2N7000 (the PLAN's FAULT wording, *"another pulls LOW"*): 107 mA, the line at
  0.19 V, reading LOW (the fault hidden by a correct-looking level): Study only (P4).
- **Cross-references (A4).** Card 6's bus, part, pull-up and 0.70 mA; card 7's pull-up trade (block C's slow rising edges);
  card 5's *not guaranteed* band (f1's line). D2·010 card 10 later names *"pull-ups, input capacitance and rise times"*.

**Section D**
- *Animation* (blocks A, A′): [x] mechanism at every stop (switches to ground, a pull-up, Kirchhoff; the push-pull pair's
  on-resistances); [x] no time shown; [x] every stop matches its Flow clause; [x] simplifications labelled (*MOSFET modelled by
  its on-resistance…*, *estimate: the outputs' strength varies by part*).
- *Draw* (block B): [x] IEC symbols; not to scale (a diagram); [x] every step's `say` matches its clause; no construction line
  left after b1; no number on it.
- *Figure* (block C): [x] our own redraw, *"Redrawn after the I²C specification (UM10204); not to time scale"*; [x] the named
  parts land on the right features (START, bits, the ninth clock); legible at 1920 × 1080 at each tour stop.

**A1–A8**: A1 ✓; A2 ✓ (contention, on-resistance, edges; §9); A3 ✓ (part classes, unbranded; the specification cited as a
document); A4 ✓; A5 ✓ (block C not to time scale, said); A6 ✓; A7 ✓ (no finding in card 8's text: statement, PLAN, the poe and
its explain, the FAULT, Flow p0–p7); A8 ✓.

## 9. Faults and non-ideal behaviour

**PLAN FAULT** (verbatim): *One device with a push-pull output on the shared line drives HIGH while another pulls LOW: the two
outputs short the rail through each other. Needs Electronics: P-MOSFET profile or a push-pull output part, to show the
contention current.* On this library: **block A′** (f0–f1), on the wall, because p7 speaks it. The Electronics Bench's need
(a P-MOSFET or push-pull part) stays the Electronics Bench's (deferred); the Animation library draws the push-pull pair by its
equivalent resistances (§8).

Non-ideal effects (**decided**, P4; Study only): one push-pull against an open-drain output (107 mA, the line reading LOW, the
fault hidden); a NACK (the receiver does not pull: SDA HIGH in the ninth clock) in block C as a second Study tour stop;
R_DS(on) spread (as card 6).

## 10. Accessibility, legibility and print

As **§10 of card 3**. The truth table at 32 pt beside the schematic: check it against the schematic's M2 label at 1920 × 1080
and 1024 × 768. Block C's bit digits and *ACK* at 32 pt at each tour stop (zoomed). Print: the thirteen stills with their
sentences, the table and the byte.

## 11. Assets to make or source

| Asset | Format | Made by | Status |
|---|---|---|---|
| `two-outputs` configuration of `logic-io` (M2, S5, the truth table) and `outputs: push-pull` (the two push-pull boxes and their input switches) | in the `logic-io` library | the Benches lane | to request by crossing (the same crossing as cards 3, 5, 6) |
| `wired-and` drawing (b0–b1) | Draw Bench drawing (`drawing` fence in en.md, `wired-and.benchdrawing`) | **the author (this project)** | to draw (D2) |
| `i2c-byte-ack` figure (c0–c2) | SVG with named parts (`figure` fence) | **the author (this project)** | to draw (D2) |
| The card's sequence `d2-010-two-outputs`: blocks A, B, C, A′ with the thirteen stops of §4a; B and C imported (C69) | sequence library | the Benches lane, with B and C from the course (read from the course folder, copied into the sequence as units; C69 asked in the crossing, §12) | with the above |

**Reuse first**: card 6's configuration for block A (the same M1, R1, bus, receiver, meter); card 5's *not guaranteed* band
for f1; card 7's edge for block C's slow rise (the look, not a number); `oled-module` (an I²C device, *GND VDD SCK SDA*) is
**not** used: block C is a timing picture, not a device.

## 12. Bench capabilities this needs

As **§12 of card 3**, plus: **sequences of several blocks** (exist: sequence libraries, bench contract 4), one at a time with the
bench's hand-over; **C69 Import** of a Draw Bench drawing (block B) and of an SVG (block C) as sequence units. **How it stands
(2026-10-20)**: the Animation Bench's capability list (`C:\ExSightory\src\exsight-benches\benches\animation\capabilities.md`,
§5.10) has C69 at priority 1, its sources including *"animated SVG; a Draw Bench drawing"*; it does not say C69 is built, and
this project cannot confirm it from here. So the crossing asks Benches to say whether C69 carries a `.benchdrawing` with its
trace steps (block B) and a static SVG with named parts toured as three stops (block C). The decided design (P1 a) does not
wait on the answer: B and C play today on their own benches (P7). If Benches answers that C69 cannot carry them, the fallback
(B and C as their own blocks on the card, which needs Studio's multi-block card) is a new question for the owner, who routes
it; it is not open today. **Moving current** (to confirm): a2, a4 0.70 mA through R1
into the pulling transistor, none in the other; a5 split 0.35 / 0.35 mA; f1 ≈ 64 mA through output 2's upper and output 1's
lower transistor, its speed and brightness following its size (90 × a2's), and 0.39 mA in R1; none into the receiver or the
meter.

**Not this bench's**: blocks B and C are the Draw and Figure benches' formats, authored by the course; the Animation Bench only
plays them in the sequence.

**Block C on the Figure Bench, a stop that lights several parts** (2026-10-20): c1 lights the transmitter's release and the
receiver's pull together, and c2 the two *who* rows with SDA; today's Figure tour names one feature per stop. The Figure
crossing raised for D2·010 card 2's cumulative tour (`D2-010-02-both-digital.md` §12) names this stop as a second user if
Benches builds it as *a stop that may name several features*. Until then, c1 and c2 each light one named group drawn as a
single feature in the SVG (the ninth-clock column; the two rows with SDA), so the design does not wait on it.

## 13. Stand-in for the lecture

**Decided (P7 a, round two)**: blocks B and C are ours and play today (the Draw Bench traces `wired-and`; the Figure Bench tours
`i2c-byte-ack`); blocks A and A′ are carried by the words and the poe until the library lands. When it lands, the same B and C
files become the sequence's units (C69, §12), so nothing is made twice. (The option not taken: none.)

## 14. Findings for the owner

No **accuracy** finding in card 8's text (A1–A7 run on 2026-10-20: statement, PLAN SHOW / Drive / Look for / Status, the poe and
its explain, the FAULT, Flow p0–p7; §8). One correction to **our own** brief (P3).

The proposals of round one, **all decided 2026-10-20 in round two** (each kept as it was put; the decision marked):

- **P1 — Proposal: the card as one sequence of four blocks.** **Decided: (a)** (C69: §12). Options: **(a)** one Animation Bench sequence, `d2-010-two-outputs`,
  blocks A (Benches) → B (ours, Draw) → C (ours, Figure) → A′ (Benches, the FAULT), one at a time, following p1–p7
  (**recommended**: EAC's one block per card, the Flow's order, B and C imported unchanged); (b) the Draw and the Figure as
  separate blocks on the card beside the Animation (needs Studio's multi-block card, as D2·010 card 7's D4: to the owner, to
  route); (c) the FAULT left to Study (p7 spoken over block C).
- **P2 — Proposal: where the truth table lives.** **Decided: (a).** The PLAN puts it in the Draw (*"the truth table written beside it as each
  case is stepped"*) after the circuit has already stepped the same four cases. Options: **(a)** the table in block A, beside the
  circuit, each row written as its case lands and computed from the outputs (it must agree with the meter: memories
  `input-drives-every-output`, `drawing-and-numbers-agree`), as the approved U019 brief drew it; block B keeps the construction
  (outputs added one at a time to three, the rule, the AND element) and writes no second table (**recommended**: one walk of the
  four cases, one table, linked to the circuit); (b) as the PLAN: the circuit steps the cases with the meter only, then the Draw
  steps them again with its table (two walks of the same cases); (c) everything in block A (the third output and the AND element
  too), no Draw.
- **P3 — Proposal (our correction): the table's convention.** **Decided: (a).** The U019 brief labelled the table *1 = pulls*; under that label
  the line column is a NOR of the pull signals, shown beside the word AND. Options: **(a)** each output in its own logic level,
  *1 = lets go, 0 = pulls*, so the line column is the AND of the columns (**recommended**: matches p4's *"That is a logical AND"*
  and the PLAN's explain, *"the AND of everyone's 'let go'"*); (b) keep *1 = pulls* and say NOR (contradicts the card's words).
- **P4 — Proposal: the FAULT's model and its Study cases.** **Decided: (a)**, with the Study cases. Options: **(a)** two push-pull outputs of the 3.3 V LVC logic class,
  their equivalent on-resistances from the guaranteed drive (29.2 Ω and 22.9 Ω), *"≈ 64 mA (estimate)"* and the line ≈ 1.5 V,
  labelled as an estimate (**recommended**: matches p7's *"two of those"*; sourced; honest about its precision); with the
  one-push-pull-against-open-drain case (107 mA, the line reading LOW) and a NACK tour stop in Study only; (b) discrete
  complementary MOSFETs (no class has an on-resistance specified at a 3.3 V gate drive for the P-channel: unsourced, not
  recommended); (c) no number: *"a large current"* only.
- **P5 — Proposal: block C's edges.** **Decided: (a).** Options: **(a)** rising edges drawn slower than falling ones, labelled *rise: the pull-up
  charging the bus* (**recommended**: true of every open-drain bus, card 7's subject, gate 1); (b) square edges, the usual
  textbook picture.
- **P6 — Proposal: the Flow's demo cues.** **Decided: (a)**, applied to en.md by the lead. p0 read (round one) *"[[demo]] Electronics Bench — two open-drain outputs sharing one pulled-up
  line."* Options: **(a)** *"[[demo]] Animation Bench — two open-drain outputs sharing one pulled-up line."* (**recommended**, as
  D1·090's P9); (b) keep.
- **P7 — Proposal: the stand-in** (§13). **(a)** B and C today, A and A′ from the words (**recommended**); (b) none. **Decided:
  (a).**
- **P8 — Proposal: the teacher tip (§7d) and a Study-only prediction at f1.** Take both (**recommended**), the tip only, or
  neither? **Decided: both.**
- **Reported**: 2.9 min (1.9 on the bench), unchanged in round two; the module ≈ 31.6 of 30 min at round one, ≈ 0.15 min more
  after round two's edits to cards 2, 4 and 10 (D5; `D2-010-07` §2b). Nothing is cut.

Decided 2026-10-20 (owner: *"apply all recommendations"* on the U019 brief): D1 (an Animation Bench demonstration by Benches, one
scene library for cards 3, 5, 6, 8, one crossing), D2 (the PLAN's Draw and Figure on this card are ours, specified now), N1 (no
product name), N2 (no demo numbers in the cues).

**Decided 2026-10-20, round two (owner: *"apply all recommendations"*):** P1 (a) one sequence, A (Benches) → B `wired-and`
(ours, Draw) → C `i2c-byte-ack` (ours, Figure) → A′ (Benches, the push-pull FAULT, *≈ 64 mA (estimate)*); P2 (a) the truth
table in block A, written row by row from the circuit, none in B; P3 (a) *1 = lets go, 0 = pulls*; P4 (a) the LVC-class
equivalents, with the one-push-pull-against-open-drain case (107 mA) and a NACK tour stop in Study only; P5 (a) slower rising
edges in C; P6 (a) p0's cue *"[[demo]] Animation Bench — two open-drain outputs sharing one pulled-up line."* (applied to
en.md); P7 (a) B and C play today; P8 the tip and the Study-only prediction at f1. **C69** (to confirm at round one): stated in
§12; the crossing asks Benches; the design does not wait on it and nothing is open for the owner. **Accuracy re-run on what
changed** (A1–A7, Node, 2026-10-20, `nums.mjs` in the session scratchpad): block A 0.7019 mA (one pulling), 0.7020 mA and
0.3510 mA each (both), 1.263 / 0.632 mV, the released HIGH 3.2984 V; A′ 29.17 Ω / 22.92 Ω, the line **1.457 V** (meter 1.46),
**63.6 mA** into the low side (63.2 mA from the high side, 0.39 mA in R1), 116 / 93 mW, 90.6 × the open-drain 0.70 mA; the
Study case, push-pull HIGH against an open-drain 2N7000 LOW, **107 mA**, the line **0.19 V**; 0x90 = 1001 0000 (address 0x48 +
W). **One correction of ours**: the 16 mA-point figure is **53.1 mA** with R1 in the node (round one's 52.8 mA was the two
on-resistances alone), fixed in §8 and §15. The Flow (224 words) changed only in p0's cue. **Nothing is open on this card**;
the spec is **spec-ready**.

**Raised 2026-10-20:** crossing **516** (the `logic-io` library: blocks A and A′, and the C69 question; `C:\ExSightory\lanes\pbl2026-x\.claude\crossing\open\516-pbl2026-to-benches-d2-010-logic-io-one-scene-library-for-cards-3-5-6-8.request.md`, raised and pushed 2026-10-20, open); crossing **518** (the Figure tour; block C's c1–c2 named as a second user; `C:\ExSightory\lanes\pbl2026-x\.claude\crossing\open\518-pbl2026-to-benches-figure-bench-a-cumulative-tour-for-d2-010-card-2.request.md`, raised and pushed 2026-10-20, open).

## 15. Acceptance: how we know it is built right

- The thirteen stops of §4a play on the wall, the presenter's window and Study Mode in order, one block at a time, each arriving
  at its first frame and holding at its end, with §8's values: line 3.30 · ? · 0.00 · 3.30 · 0.00 · 0.00 (meter); currents
  0.70 mA into M1 (a2), M2 (a4), 0.35 + 0.35 mA (a5); the table *1 1 → 1, 1 0 → 0, 0 1 → 0, 0 0 → 0*, each row written at its
  case; f1 ≈ 64 mA (estimate), the line ≈ 1.5 V (meter 1.46), *not guaranteed*.
- a1's first frame withholds the line's value (the poe's answer); a2 reveals it.
- Every block A / A′ value computed from the node (memory `input-drives-every-output`): in Explore, every S4 × S5 state writes its
  own row; changing R1 or R_DS(on) recomputes the currents; the push-pull equivalents set to the 16 mA points give 53.1 mA (the line 1.33 V).
- Block B: the third output added, the rule and the AND element; no number; no table. Block C: 1 0 0 1 0 0 0 0, START, the ACK in
  the ninth clock, data changing only while SCL is LOW, *Redrawn after … not to time scale* on it.
- B1 one change per press; B2 only the switches, the levels, the table rows and the currents change; B3 a0 still; B4 thirteen
  stills; B5 each `say`; B6 the paired cues (a2–a5, c1–c2, f1); B7 one mover; B8 nothing flashes; B9 the poe before a2; B10 the
  explain; B11 Explore after f1; B12 the wall's controls not operable; B13 no Flow on the stage; B14 values beside their
  elements, the table beside the circuit; B15 a0's parts met before anything moves; B16 every state as numbers; B17 the table
  linked to the circuit; B20 the strip.
- C2–C8, E1–E6; the six gates reported by Benches with the stills (EN and FR); blocks B and C checked by the author on the
  lecture laptop in both themes.
- **Six gates (this spec)**: (1) realism: real part classes on a breadboard, the course's meter and MCU input, the I²C byte as
  the specification defines it, rising edges as an RC; nothing branded ✓; (2) science: wired-AND from open-drain, the ACK as
  UM10204 states it, contention through two on-transistors as an estimate from rated drive, labelled ✓; (3) maths: 0.7019 /
  0.7020 mA, 0.351 mA, 1.26 / 0.63 mV, 3.2984 V, 0x90, 29.2 / 22.9 Ω, 1.457 V, 63.6 mA (53.1 mA from the 16 mA points, corrected from round one's 52.8)
  recomputed ✓; (4) visualization: one case per press with its row lit, the AND drawn as an element, the ACK as two drivers'
  rows ANDed, the contention current 90 × the open-drain one ✓; (5) consistency: card 6's configuration, card 5's band, card 7's
  edge, the PLAN's explain's *"let go"* AND; our brief's *1 = pulls* table corrected (P3), the PLAN's two walks of the cases
  reconciled (P2), both decided and named, the PLAN's words kept ✓; (6) design: as card 3; blocks B and C in the course's Draw and Figure looks; no
  departure from ExSight's rules (*≈ 64 mA* at two figures, *estimate* said). No accuracy finding in the owner's text; nothing in
  it was edited.
