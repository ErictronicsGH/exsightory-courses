```yaml
id: D2-020-06-can-the-bus-keep-up
card: "Can the bus keep up?"
module: notes/Day02/020-external-adcs/en.md
bench: Equation                   # the PLAN's bench; the approved log–log picture (the brief page's draw6) is the Equation's own graph, no Plot beside it (§1, F-c6-3)
library: "bus-payload: an Equation, R_b = f_s · N_d (the raw data's bit rate), graphed log–log against f_s over 100–100,000 S/s, examples 10 kS/s × 16 bit = 160 kbit/s and the ADS1115 at 860 SPS = 13.76 kbit/s · bus-clock: an Equation, f_SCL = f_s · (N_d + N_o) (the I²C clock a stream of 16-bit reads needs), the same log–log axes, the family N_o = 0 (payload only) and N_o = 11 (the address byte and the acknowledges: 27 clocks a read), solved for f_s at 100 kHz and 400 kHz (3,704 and 14,815 reads a second), the ADS1115's 860 SPS at 23.22 kHz; both defined in the card's two `equation` blocks"
dimensions: 2D
stand_in: "none for the blocks (every field of §3 exists); the PLAN's markers at 100 kHz and 400 kHz are drawn as two labelled boundaries (shaded 'keeps up' regions ending near 3.6 and 14.8 kS/s) until X21's reference lines (crossing 506) land (F-c6-4)"
optional_benches: []              # the Plot Bench was weighed and not used: it has no log axis (§1, §12)
real_thing: "an I²C bus at 100 kHz (Standard mode) and 400 kHz (Fast mode), NXP UM10204, reading 16-bit results two bytes at a time: a 16-bit converter streaming 10,000 samples a second, and the ADS1115 (TI SBAS444E) in continuous-conversion mode at 860 SPS with its address pointer left on the Conversion register (§7.5.3, Figure 7-9)"
minutes: 2.1                      # on the bench: Equation A from p6, Equation B from the second numeric's reveal to the card's end (§2)
card_minutes: 4.9                 # the whole card, both numerics included (§2)
status: spec-draft
learner_action: numeric           # two numerics: before the statement (160 kbit/s) and after the reveal (270 kHz)
predictions: []                   # both ASKs are the PLAN's and fire before the slide that answers them (§7a)
seeds: [S50 (harvest)]            # planted by D2·010 card 9; spoken in this card's p1
key_variable: "samples per second (f_s) against the bus clock they need: the payload line, then the 27-clock line one overhead term higher, read against 100 kHz and 400 kHz"
time_scale: "none (no motion): two equation slides and their panes"
steps: 4                          # s0 (Equation A), s1–s3 (Equation B)
```

**Written 2026-10-21 (U020)** after the owner's choices on the U020 brief (*"Apply all recommendations"*): **D1** (the four
named parts keep their names in this module: the ADS1115 is named on the Equation's example and its label, no logo),
**D3** (specs for all seven cards; this card is the PLAN's Equation Bench) and **F5** (applied: the Flow's chain line now
reads *"Recall our measurement chain from the last module:"*, checked word for word in §8). D2 does not reach this card: no
datasheet page is shown; the ADS1115's I²C sequence is read off SBAS444E and cited here, and drawn only as numbers. The
brief page's `draw6` (`bench-work/previews/u020-preview.html`, card 6) is the approved visual: a log–log line plot of the
required clock against samples per second, 100 to 100,000 S/s, the payload f_s × 16 in teal, the I²C line f_s × 27 in
amber switched on second, violet dashed levels at *100 kHz (Standard mode)* and *400 kHz (Fast mode)*, and the ADS1115's
point at 860 SPS, *23 kHz*. **Everything on this card beyond the PLAN is a Proposal**, marked, and open in §14 (round two).

**What the Equation Bench offers, as read in source on 2026-10-21** (read-only, `C:\ExSightory\src\insight\packages\`,
`insight-core/src/registry/equationBlock.ts` and `quantity.ts`, last changed 2026-10-17; the fields D2-010-07 lists, plus):

- **`graph.scale`**: `x` and `y` each `linear` or `log` (l. 1884–1892); a log x domain that touches zero is refused.
- **`graph.compare`**: one curve per value of a **held** symbol, 2 to 5 values, all drawn at once (l. 1901–1923).
- **`graph.markExamples`** (default on): a dot on the curve at each worked example (l. 1933).
- **`boundaries`** are resolved on **601 linear samples** of the domain (l. 1401–1407), **also on a log x axis**.
- **`hold`** sliders have `min`, `max`, `default` and **no `step`**; every right-hand symbol other than `against` must be held.
- **`formatQuantity`** prefixes any unit that is not a degree (l. 162–187), 4 significant figures, trailing zeros dropped:
  160,000 bit/s prints **160 kbit/s**, 270,000 Hz **270 kHz**, 23,220 Hz **23.22 kHz**, 3,703.7 S/s **3.704 kS/s**.
- The **Plot block** (`plotBlock.ts`) has **no `scale`** (no log axis; grep for `scale` and `log`: none), which decides the
  bench (§1).

## 1. What the room must understand

- **Statement** (verbatim): *The useful data rate is lower than the signalling speed, because addressing, framing and other
  overhead share the wire. 10,000 samples/s × 16 bits is 160 kbit/s before any overhead, and the interface must carry it
  without becoming the bottleneck.*
- **SHOW** (verbatim from the PLAN): *Equation — required bit rate = samples/s × bits per sample; then required bus clock =
  samples/s × clocks per sample, solved for samples/s at 100 kHz and 400 kHz. Worked examples: 10 kS/s × 16 bit = 160
  kbit/s; on I²C one 16-bit read is an address byte and two data bytes, each 8 bits plus ACK, about 27 clocks, so 10 kS/s
  needs about 270 kHz; the ADS1115 at its 860 SPS needs about 23 kHz.*
- **Drive** (verbatim): *payload term first, then switch on the overhead term, with markers at 100 kHz and 400 kHz.*
- **Look for** (verbatim): *the 160 kbit/s payload growing to a 270 kHz clock once the bus's own bits are counted.*
- **Status** (verbatim): *ready*
- **HARVEST** (verbatim): *S50 — "In the last module 'how much data, how quickly?' was a question on a list. Here it is with
  numbers."*
- **Bench and library.** The **bench** is the Equation Bench. The **libraries** are this card's two `equation` blocks:
  `bus-payload` (the PLAN's *"required bit rate = samples/s × bits per sample"*) and `bus-clock` (its *"then required bus
  clock = samples/s × clocks per sample"*), each on its own slide, the first after the first numeric, the second after the
  second (F-c6-3).
- **Insight**: *the bus has to carry more than the data: on I²C a 16-bit reading costs 27 clocks, not 16, so 10,000
  readings a second need a 270 kHz clock, past a 100 kHz bus and inside a 400 kHz one, while the ADS1115's own 860 a second
  need only 23 kHz.*
- **Kind of knowledge**: *a relation between quantities* (the clock against the sample rate, with the overhead as a
  parameter) and *a contrast between two states* (payload only, overhead on). Card test → **Equation**. B17 applies (both
  lines on one pair of axes; A and B on identical axes). B15, B18, B19 do not.
- **Why this bench, not a still, and not the Plot Bench.** The claim is one law with one term switched on: the Equation
  names the term (N_o, the bus's own clocks), derives 27 = 16 + 11, prints the four answers in the room's units, solves for
  f_s at each bus speed (its Rearrangements pane), and draws **its own** graph, which cannot drift from the formula. The
  approved picture is log–log, and must be: over 100–100,000 S/s on a linear axis the ADS1115's 860 S/s sits 0.76 % from
  the left edge (≈ 5 px of 600) and its 23 kHz is lost under a 2.7 MHz top. The Equation's graph has `scale: log` on both
  axes; the **Plot block has none**, so a Plot beside the Equation could not draw draw6 at all. D2-010-07 split the work
  because its picture was a **different function** from its law (the edge v(t), an RC charge in time, beside the sink law
  I = (V_DD − V_OL)/R_p, which the Equation graphed against R_p); here the picture **is** the law's graph against f_s, so a
  Plot would only be a second copy of the same formula without log axes. **Equation only** (F-c6-3).
- **Key variable**: f_s, read against the two lines and the two bus speeds; N_o is the term switched on.

## 2. Time

The card's Flow is **331 words** (counted from `en.md` 2026-10-21 by the brief's rule: whitespace tokens of the fence,
cue markers removed, tokens with a letter or digit; the arrows of p8 are not words). Per paragraph: p1 19, p2 72, p3 14,
p4 25 (the `[[ask]]`), p5 0 (`[[pause]]`), p6 45 (`[[reveal]]`), p7 15, p8 15 (the chain), p9 42, p10 25, p11 23, p12 36.
p4 is the first numeric's question, counted in the activity. **306 words are spoken outside the activities = 2.35 min.**
The second numeric has **no words in the Flow** (F-c6-2): its question is on its widget, and its reveal is spoken
unscripted from the strip, or in two short paragraphs the owner may add (F-c6-2 (a): an ask of 31 words, counted in the
activity, and a reveal of 40, 0.31 min). The table counts the reveal either way: it is spoken.

| Beat | Minutes | Source of the number |
|---|---|---|
| The first numeric's card (before the statement): p1–p3 (105), spoken with the question card up, before its window opens | 0.81 | 105 ÷ 130 |
| The first numeric: p4 the question (25), the answer window, the tally (p5 `[[pause]]`) | ≈ 1.0 | the U020 brief's figure for a numeric, question included |
| s0 Equation A opens (≈ 2 s), p6 *"[[reveal]] The raw measurement data alone…"* (45), the Example pane (≈ 3 s) | 0.43 | 45 ÷ 130 + 5 s |
| The second numeric: its question on the widget (F-c6-2 (a): 31 words in the Flow), the window, the tally | ≈ 1.0 | as the first |
| s1–s2 Equation B opens (≈ 2 s), the reveal (40 words, F-c6-2 (a), or the strip's line of the same length), the Proof step and the Rearrangements pane (≈ 3 s), the laser on the two shaded edges (≈ 3 s) | 0.44 | 40 ÷ 130 + 8 s |
| s3 held: p7 *"This is particularly important…"* to p12 *"…exchange information reliably."* (156), the laser on the ADS1115's dot at p7 (≈ 2 s) | 1.23 | 156 ÷ 130 + 2 s |
| **Card total / of which on the bench** | **4.9 / 2.1** | 4.91 / 2.10 |

p7–p12 (156 words, 1.2 min) are spoken over a **held** state (B13): Equation B with both lines, the shaded edges and the
ADS1115's dot. Without F-c6-2 (a) the card is the same 4.9 min, the reveal being the presenter's own words.

**Module check** (D2·020 `targetMinutes: 30`). The Flow is **2,045 words = 15.7 min** (cards 231, 414, 45, 278, 396, 331,
350; recounted 2026-10-21 with this spec's script: ✓ the brief). The U020 brief estimated **≈ 29–30 of 30 min** with the
activities (poe, flash and numerics ≈ 1 min each, poll 1.5, checkpoint 3) and ≈ 3 min of bench moves mostly over speech.
This card's figure (4.9) is inside that estimate if its unscripted reveal (0.31 min) is counted in the ≈ 3 min of moves; if
it is not, F-c6-2's 40 words add **0.31 min**, so the module is **≈ 29.3–30.3 of 30**. Reported, not trimmed (standing
rule); the owner cuts if needed. The module's one time table belongs to whichever D2·020 spec the lead names (as D2-010-07
§2b for D2·010); this card's row is **4.9 (2.1 on the bench)**.

## 3. The scene: what is on the bench

Both blocks share **identical axes** (the same `against`, `domain` and `scale`), so the slide change from A to B reads as
*the overhead line switched on* over the same payload line (B17; the PLAN's Drive). Colours as the approved draw6 (gate 5):
the payload **teal**, the I²C read line **amber** (the external converter's read; the ADS1115's dot lies on it), the bus
speeds **violet**.

### 3a. Equation A (`bus-payload`), after the first numeric

| Field | Content | Source |
|---|---|---|
| `title` | *The raw data alone* · FR *Les données brutes seules* | p6 *"The raw measurement data alone…"* |
| `statement` | `R_b = f_s * N_d` | the PLAN's *"required bit rate = samples/s × bits per sample"* |
| `caption` (Proposal) | *The raw data alone: samples per second times the bits each sample sends. A 12-bit result usually travels as two bytes, 16 bits.* · FR *Les données brutes seules : échantillons par seconde fois les bits que chaque échantillon envoie. Un résultat de 12 bits voyage en général sur deux octets, soit 16 bits.* | 23 words; with the 39-word statement, under the 110-word card budget |
| `symbols` | `R_b` *Bit rate of the raw data* (bit/s, teal), note *before any address, acknowledge or START* · `f_s` *Samples per second* (S/s) · `N_d` *Data bits per sample, as sent* (bit, teal), note *16: one 16-bit result, two bytes* · FR *Débit des données brutes* · *Échantillons par seconde* · *Bits de données par échantillon, tels qu'envoyés*, notes *avant toute adresse, tout acquittement ou START* · *16 : un résultat de 16 bits, deux octets* | the PLAN; numeric 1's explain |
| `derivation` | none (one line: the statement is its own derivation) | — |
| `examples` | E1 *A 16-bit ADC at 10,000 samples a second* (FR *Un CAN de 16 bits à 10 000 échantillons par seconde*) f_s 10000, N_d 16 → **160 kbit/s**, note *the first numeric's answer* · E2 *The ADS1115 at 860 SPS* (FR *L'ADS1115 à 860 SPS*) f_s 860, N_d 16 → **13.76 kbit/s** | §8 |
| `assumptions` | (1) *Every bit counted is a data bit* — breaksWhen *the bus adds its own: addresses, acknowledges, START and STOP. The next equation counts them.* — simplifying · FR *Chaque bit compté est un bit de données* — *le bus ajoute les siens : adresses, acquittements, START et STOP. L'équation suivante les compte.* | the statement; p6 |
| `graph` | `against: f_s`, `domain: [100, 100000]` (S/s), `scale: {x: log, y: log}`, `hold`: N_d 8–32, default 16; `markExamples: true` | draw6's axes (100 to 100k S/s, three decades) |
| `notes` | `include: true` | print |

### 3b. Equation B (`bus-clock`), after the second numeric

| Field | Content | Source |
|---|---|---|
| `title` | *The clock the bus needs* · FR *L'horloge dont le bus a besoin* | the PLAN's *"required bus clock"* |
| `statement` | `f_SCL = f_s * (N_d + N_o)` | the PLAN's *"required bus clock = samples/s × clocks per sample"*, the clocks per sample split into the payload and the overhead term the Drive switches on |
| `caption` (Proposal) | *On I²C every bit takes one clock, and a read also clocks the address byte and the acknowledges: 27 clocks for 16 bits, with the converter already pointing at its result register. START, STOP and the gaps between reads come on top.* · FR *En I²C chaque bit prend un coup d'horloge, et une lecture cadence aussi l'octet d'adresse et les acquittements : 27 coups d'horloge pour 16 bits, le convertisseur pointant déjà sur son registre de résultat. START, STOP et les intervalles entre lectures s'y ajoutent.* | the A6 label (F-c6-1); 42 words, with the statement 81 |
| `symbols` | `f_SCL` *Bus clock needed* (Hz, amber), note *I²C: Standard mode up to 100 kHz, Fast mode up to 400 kHz (UM10204)* · `f_s` *Samples per second* (S/s) · `N_d` *Data bits per read* (bit, teal), note *16: two data bytes* · `N_o` *Clocks of the bus's own per read* (clock, amber), note *11: the address byte (8 + ACK) and one ACK after each data byte* · `n_clk` *Clocks per read* (clock), note *27 for a 16-bit read* · FR *Horloge de bus nécessaire* · *Échantillons par seconde* · *Bits de données par lecture* · *Coups d'horloge propres au bus par lecture* · *Coups d'horloge par lecture*, notes *I²C : mode standard jusqu'à 100 kHz, mode rapide jusqu'à 400 kHz (UM10204)* · *16 : deux octets de données* · *11 : l'octet d'adresse (8 + ACK) et un ACK après chaque octet de données* · *27 pour une lecture de 16 bits* | SBAS444E §7.5.2.2, Figure 7-9; UM10204 |
| `highlights` | term `N_o` *the overhead term: the clocks that carry no data* · FR *le terme de surcoût : les coups d'horloge qui ne portent aucune donnée*; term `N_d` *the payload: 16 data bits* · FR *la charge utile : 16 bits de données* | the PLAN's *"switch on the overhead term"* |
| `source` | *TI SBAS444E (Dec 2024) §7.5.3 and Figure 7-9, the read from the ADS111x; NXP UM10204 (I²C-bus specification, Rev. 7.0, 2021) for the bus speeds* | A7 |
| `derivation` | (1) `n_clk = N_d + N_o`, note *one read: the address byte, 8 bits and an ACK, 9 clocks; two data bytes, 9 clocks each; 27 = 16 data bits + 11 clocks of the bus's own* · FR *une lecture : l'octet d'adresse, 8 bits et un ACK, 9 coups ; deux octets de données, 9 coups chacun ; 27 = 16 bits de données + 11 coups propres au bus*; (2) `f_SCL = f_s * n_clk`, note *I²C moves one bit per SCL clock, so the clock must run at least as fast as the clocks a second the reads need* · FR *l'I²C transfère un bit par coup d'horloge SCL : l'horloge doit aller au moins aussi vite que les coups par seconde dont les lectures ont besoin*; (3) the statement, note *with N_o = 0, the payload alone: 160 kHz at 10 kS/s; with N_o = 11, 270 kHz* · FR *avec N_o = 0, la charge utile seule : 160 kHz à 10 kS/s ; avec N_o = 11, 270 kHz* | Figure 7-9; §8 |
| `examples` | E1 *Payload only, 10,000 a second* f_s 10000, N_d 16, N_o 0 → **160 kHz** · E2 *With the bus's own clocks* f_s 10000, N_d 16, N_o 11 → **270 kHz**, note *the second numeric's answer: past 100 kHz, inside 400 kHz* · E3 *The ADS1115 at 860 SPS, continuous mode* f_s 860, N_d 16, N_o 11 → **23.22 kHz** · E4 *The most a 100 kHz bus reads* f_s 3703.7, N_d 16, N_o 11 → **100 kHz**, note *3,704 reads a second* · E5 *The most a 400 kHz bus reads* f_s 14814.8, N_d 16, N_o 11 → **400 kHz**, note *14,815 reads a second* (FR: *Charge utile seule, 10 000 par seconde* · *Avec les coups d'horloge propres au bus* · *L'ADS1115 à 860 SPS, mode continu* · *Le plus qu'un bus à 100 kHz lit* · *Le plus qu'un bus à 400 kHz lit*; notes *la réponse au second exercice : au-delà de 100 kHz, dans 400 kHz* · *3 704 lectures par seconde* · *14 815 lectures par seconde*) | §8 |
| `rearrangements` | `solveFor: f_s`, note *the reads a bus can carry: f_s = f_SCL / (N_d + N_o), 3,704 a second at 100 kHz and 14,815 at 400 kHz* · FR *les lectures qu'un bus peut porter : 3 704 par seconde à 100 kHz et 14 815 à 400 kHz* | the PLAN's *"solved for samples/s at 100 kHz and 400 kHz"* |
| `boundaries` (stand-in for the markers, F-c6-4) | B1 `when: f_s * (N_d + N_o) <= 100000`, kind valid, label *Standard mode (100 kHz) keeps up* · FR *Le mode standard (100 kHz) suit*; B2 `when: f_s * (N_d + N_o) <= 400000`, kind valid, label *Fast mode (400 kHz) keeps up* · FR *Le mode rapide (400 kHz) suit*; resolved at the held N_o = 11: edges at **3.597** and **14.75 kS/s** (§8) | the PLAN's *"markers at 100 kHz and 400 kHz"* |
| `assumptions` | (1) *Each read is an address byte and two data bytes, 9 clocks each* — breaksWhen *the converter's register pointer must be written first, as in single-shot mode or after reading another register: 18 more clocks, 45 a read, and 10,000 a second need 450 kHz. A single-shot ADS1115 reading costs 81 clocks (its configuration write 36, the pointer 18, the read 27) and the conversion itself.* — limiting (F-c6-1) · (2) *Only the clock pulses are counted* — breaksWhen *START, STOP and the free time between reads add time: at the bus's minimum timings about one clock's worth a read, so a 400 kHz bus reads about 14,290 a second, not 14,815* — simplifying · (3) *The clock runs at its nominal rate* — breaksWhen *a controller's SCL often runs below its nominal rate, and some targets stretch the clock (the ADS1115 never drives SCL)* — simplifying · FR (1) *Chaque lecture est un octet d'adresse et deux octets de données, 9 coups chacun* — *il faut d'abord écrire le pointeur de registre du convertisseur, comme en mode coup par coup ou après la lecture d'un autre registre : 18 coups de plus, 45 par lecture, et 10 000 par seconde demandent 450 kHz. Une lecture d'ADS1115 en mode coup par coup coûte 81 coups (l'écriture de configuration 36, le pointeur 18, la lecture 27) plus la conversion elle-même.* (2) *Seuls les coups d'horloge sont comptés* — *START, STOP et le temps libre entre lectures ajoutent du temps : aux minima du bus, environ un coup par lecture, si bien qu'un bus à 400 kHz lit environ 14 290 fois par seconde, et non 14 815* (3) *L'horloge tourne à sa fréquence nominale* — *l'horloge SCL d'un contrôleur tourne souvent sous sa valeur nominale, et certaines cibles étirent l'horloge (l'ADS1115 ne pilote jamais SCL)* | SBAS444E §7.4.2, §7.5.1, §7.5.3, Figures 7-9, 7-10, §9.1.7; UM10204 Table 11 (§8) |
| `graph` | `against: f_s`, `domain: [100, 100000]`, `scale: {x: log, y: log}`, `hold`: N_d 8–32 default 16, N_o 0–70 default 11; `compare: {name: N_o, values: [0, 11]}`; `markExamples: true` | draw6; §7e (70 covers the 65 of a single-shot read) |
| `notes` | `include: true` | print |

**Meet the parts** (B3): s0 is Equation A alone (one line, one dot at 10 kS/s and one at 860); B adds one line, one term and
the two bus speeds, nothing else.

**Values beside their element** (B14, B16): the Example pane's printed values (160 kbit/s; 160, 270, 23.22, 100, 400 kHz);
the dots on the curves (`markExamples`); the boundary labels at their edges; in Study the hover readout and the hold
sliders' values. The 3,704 and 14,815 are in the Rearrangement's note and E4–E5's notes; nothing else is written on the
graph (B13).

**Colours and their second channel** (C4): payload teal and the read line amber, also told apart by their **position** (the
read line always 0.227 decades higher, ≈ 24 px on a 340 px graph) and by the compare legend (*N_o = 0*, *N_o = 11*); the
shaded regions by their labels on the boundary line; the symbols by their names in the Symbols pane. Whether the compare
family can also be dashed is to confirm (§12 (b)).

## 4. The run: step by step, as the Flow goes

### 4a. Steps

The card as **four slides with four Flow fences** (F-c6-3, Proposal; no word of the owner's changed): the first numeric
(fence 1: p1–p5) · Equation A (fence 2: p6) · the second numeric (fence 3: empty today, or the ask of F-c6-2 (a)) ·
Equation B (fence 4: the reveal of F-c6-2 (a) and p7–p12).

| # | id | Flow fence and paragraph (first words) | What changes (`say`) | Block, setting | Presenter's control |
|---|---|---|---|---|---|
| — | the first numeric | **fence 1**: p1 *"An external ADC brings back the question…"* (S50's harvest), p2, p3, p4 `[[ask]]` *"Suppose an ADC is producing…"*, p5 `[[pause]]` | (§7a) | the numeric (widget-focus), before the statement | the activity |
| 0 | `s0-payload` | **fence 2**: p6 *"[[reveal]] The raw measurement data alone requires…"* | The raw data alone: 10,000 samples a second × 16 bits = 160 kbit/s. | Equation A, Example pane (E1, E2) | (the slide opens), pane |
| — | the second numeric | **fence 3**: none in the Flow today; F-c6-2 (a): *"[[ask]] On I²C, reading one 16-bit result…"* and `[[pause]]` | (§7a) | the numeric (widget-focus) | the activity |
| 1 | `s1-overhead-on` | **fence 4**: F-c6-2 (a) *"[[reveal]] About 270 kHz: 27 clocks for every 16 bits…"* (first sentence), or the strip's line | The bus's own clocks switched on: 27 a read, not 16, so 10,000 a second need 270 kHz. | Equation B, Proof at step 3, Example pane (E1, E2) | (the slide opens), the Proof step, pane |
| 2 | `s2-limits` | fence 4: *"A 100 kHz bus cannot carry it; a 400 kHz bus can."* (F-c6-2 (a)) | Solved for samples per second: 3,704 reads a second at 100 kHz, 14,815 at 400 kHz. | B held, Rearrangements pane; the two shaded edges | pane; the laser on the 3.6k and 14.8k edges |
| 3 | `s3-ads1115` | fence 4: *"The ADS1115 itself, at 860 samples a second…"* (F-c6-2 (a)), then p7 *"This is particularly important…"* to p12 | The ADS1115 at its fastest, 860 a second, needs only 23 kHz: the bus is not its bottleneck. | B held, Example pane at E3 | the laser on the E3 dot; held over p7–p12 |

Suggested words for the strip (B20), the reveal if F-c6-2 (a) is not taken: s1 *"270 kHz: 27 clocks for every 16 bits, 70 %
more than the payload."*; s2 *"A 100 kHz bus stops at about 3,700 reads a second; a 400 kHz bus at about 14,800."*; s3
*"And the ADS1115 itself, at 860 a second, needs 23 kHz."*

### 4b. Motion, cues and stills

| # | Motion | Movers | Cue and its second channel | Hold | Reduced motion (C3) | Still |
|---|---|---|---|---|---|---|
| 0 | none (the slide appears) | 0 | one teal line; the E1 dot at 10 kS/s and the E2 dot at 860; the Example pane | hold | same | s0 |
| 1 | none (the slide appears; one Proof step) | 0 | the amber line above the teal; the N_o term highlighted; E2's dot at 270 kHz | hold | same | s1 |
| 2 | the laser (hand-paced, ≈ 3 s) | 1 | the two shaded regions with their labels at their edges; the dot on each edge | hold | the still carries the state | s2 |
| 3 | the laser (≈ 2 s) | 1 | the E3 dot at 860 S/s, 23.22 kHz, and its row in the pane | hold | same | s3 |

Four wall stills plus each Equation's print form. No `animate`.

## 5. Pacing and interaction, by surface and view

**Who paces** (B12): on the wall the presenter (the slides, the Equation's pane and Proof step mirrored; the hold sliders
and the hover are not; the laser is mirrored ink, M07-c). In Study Mode and Scope, the learner.

| View | Who | Controls |
|---|---|---|
| Preview (in the slide) | everyone | the equation, its current pane, the graph at its defaults |
| View (details) | everyone | every pane (Symbols, Terms, Proof, Example, Rearrangements, Assumptions); the graph's hold sliders on one row, each labelled on top in words with the symbol in parentheses and the value at the right: A *Data bits per sample (N_d)*; B *Data bits per read (N_d)* and *Clocks of the bus's own (N_o)*; the hover readout |
| Edit (session only) | everyone | not specified for the Equation Bench |
| Authoring | authors | the two `equation` blocks' YAML |

- **The presenter's strip** (B20): the steps of §4a with their `say`, the suggested words, the teacher tip (§7d); keys: Next /
  Back for the slides, the Equation's pane and step keys, the laser key.
- **Study / Scope**: the hold sliders free; the five examples; the rearrangement; the explore tasks (§7e).
- **Phone** (C6): the equation, then the graph full width, the sliders one per line under it, then the pane. At 320 px the
  graph is ≈ 280 px wide: ≈ 93 px a decade, the two lines ≈ 20 px apart (check, §10).
- **Locked**: Equation A opens only after the first numeric is answered, Equation B only after the second (B9).

## 6. The frame

| Tile / panel | Used? | Selected item | List / contents |
|---|---|---|---|
| Equation panes | yes | the pinned term (N_o) or example with its note | Symbols, Terms, Proof, Example, Rearrangements, Assumptions |
| Equation graph | yes | — | A: one line and two dots; B: the compare family (N_o = 0, 11), two shaded regions, five dots |
| Ink (laser) | yes (s2, s3) | — | the laser over the graph |

The Canvas header and footer (D4.10–4.12); no inset, no second bench.

## 7. Thinking, not watching

- **7a. The PLAN's ASKs** (verbatim):
  - *numeric (before the statement) — "An ADC produces 10,000 samples per second at 16 bits each. What bit rate does the raw
    data alone need, in kbit/s?" · answer: 160 kbit/s ± 1 · reveal: the Equation's payload term · explain: 10,000 × 16 =
    160,000 bit/s, before a single address, ACK or start bit is counted. · depth: use · practice: computational thinking.*
    It fires at p4 (fence 1), **before the statement** (the statement holds its answer); **s0 reveals it** (Equation A, E1).
  - *numeric (after the reveal) — "On I²C, reading one 16-bit result takes about 27 clock cycles: an address byte and two
    data bytes, each 8 bits plus an ACK. What bus clock does 10,000 samples per second need, in kHz?" · answer: 270 kHz ±
    10 kHz · reveal: the Equation's overhead term switched on, against the 100 kHz and 400 kHz markers · explain: 27 ×
    10,000 = 270,000 clocks a second, about 70 % more than the payload, so a 100 kHz bus tops out near 3,700 reads a second
    and a 400 kHz bus near 14,800, before start, stop and the gaps between transactions. · depth: create · practice:
    computational thinking.* It fires after s0 (fence 3); **s1–s2 reveal it** (Equation B: E2 at 270 kHz, the 100 kHz and
    400 kHz edges standing in for the markers, F-c6-4).
  - *HARVEST S50* (§1): spoken in p1, *"An external ADC brings back the question from the last module: can the interface
    carry what the converter produces?"*
- **7b. Prediction points on the bench**: none beyond the two ASKs.
- **7c. After**: the explains (with F-c6-1's sentence if taken). In Study, done means both numerics answered and N_o moved
  on Equation B.
- **7d. Teacher tip** (Proposal, F-c6-5): *Expect "a 400 kHz bus carries 400 kbit/s of data" (the clock read as the
  payload) and "a 12-bit converter sends 12 bits" (it sends two bytes). Ask: what else crosses the wire with each reading?
  The 27 holds only while the converter already points at its result register: the ADS1115 keeps its pointer until the next
  write (SBAS444E §7.5.3), so in continuous mode one pointer write is followed by 27-clock reads. Write the pointer before
  every read and it is 45 clocks (450 kHz for 10 kS/s, past Fast mode). Single-shot mode costs 81 clocks a reading (the
  configuration write 36, the pointer 18, the read 27) plus about 25 µs of power-up and 1/DR of conversion: at 860 SPS
  about 719 readings a second on a 400 kHz bus, 501 on 100 kHz, so the ADS1115's 860 SPS is a continuous-mode figure.
  Reading faster than the converter converts returns the same result again: the ADS1115's ALERT/RDY pin pulses about 8 µs
  at each new result (§7.3.8). And the ADS1115 also speaks Hs mode, up to 3.4 MHz (§7.5.1.3); the card's two speeds are
  the common ones.*
- **7e. Explore** (B11; Proposal, F-c6-5), in Study on Equation B: (1) *N_o to 29: the pointer written before every read
  (45 clocks). Can a 400 kHz bus still carry 10,000 a second?* (No: 450 kHz; it tops out at 8,889); (2) *N_o to 65: a
  single-shot read (81 clocks), before the conversion wait* (10 kS/s would need 810 kHz); (3) *N_d to 24 and N_o to 12: a
  24-bit converter, three data bytes* (36 clocks, 360 kHz at 10 kS/s). The sliders have no step (§12 (e)): the task names
  the value.

## 8. Faithfulness (the quality bar)

**Arithmetic** (Node, 2026-10-21; scripts in the session scratchpad):

- **Payload** (the statement, the first numeric, p6, E1 of A): 10,000 × 16 = **160,000 bit/s = 160 kbit/s** ✓ (exact; the
  Flow's *"approximately 160 kbit/s"* is a harmless hedge: no finding). ADS1115: 860 × 16 = **13,760 bit/s = 13.76 kbit/s**.
- **The 27 clocks** (the PLAN, the second numeric): the address byte 8 + ACK = 9, data byte 1 (D15–D8) 8 + ACK = 9, data
  byte 2 (D7–D0) 8 + ACK or NACK = 9: **27** ✓ (SBAS444E Figure 7-9, frames 3–5; §7.5.2.2). Payload 16 + overhead **11**;
  27/16 = **1.6875**: *"about 70 % more than the payload"* ✓ (68.75 %).
- **The clock** (the second numeric, E2): 10,000 × 27 = **270,000 Hz = 270 kHz** ✓ (± 10 kHz ✓). E1 of B (N_o = 0):
  **160 kHz**. With the minimum START, STOP and bus-free times counted (below), 10 kS/s needs 27 / (100 µs − 2.5 µs) =
  **276.9 kHz**: still inside the numeric's tolerance ✓.
- **Solved for f_s** (the PLAN, the explain, the rearrangement, E4–E5): 100,000 / 27 = **3,703.7** (*"near 3,700"* ✓;
  prints *3.704 kS/s*); 400,000 / 27 = **14,814.8** (*"near 14,800"* ✓; prints *14.81 kS/s*). E4: 3,703.7 × 27 = 99,999.9 →
  *100 kHz* ✓; E5: 14,814.8 × 27 = 399,999.6 → *400 kHz* ✓. The payload alone would allow 6,250 and 25,000.
- **The ADS1115** (the PLAN, E3): 860 × 27 = **23,220 Hz = 23.22 kHz** (*"about 23 kHz"* ✓). With the data rate's ±10 %
  (SBAS444E §5.5, *Data rate variation*): 20.9–25.5 kHz, still far under 100 kHz.
- **Gaps between reads** (the explain's *"before start, stop and the gaps"*): UM10204 Rev. 7.0 Table 11 minima, Fast mode
  t_HD;STA 0.6 µs + t_SU;STO 0.6 µs + t_BUF 1.3 µs = **2.5 µs** a read, one 400 kHz clock period: 67.5 + 2.5 = 70.0 µs →
  **14,286 reads a second** (assumption 2's *"about 14,290"*); Standard mode 4.0 + 4.0 + 4.7 = 12.7 µs: 270 + 12.7 = 282.7 µs
  → **3,537**. (The ADS1115's own requirement is looser, 600 ns each in Fast mode, SBAS444E §5.6: 14,430 a second. The UM10204
  figures are the specification's, the edition D2-010-07 read; re-read on the page when the blocks are written.)
- **When 27 holds, and what a single-shot reading costs** (the brief's question; SBAS444E §7.5.3, Figures 7-9 and 7-10,
  §7.4.2, §9.1.7):
  - The read is **27 clocks** when the Address Pointer's P[1:0] already holds **00b** (the Conversion register, Table 8-1):
    the part *"store[s] the value of P[1:0] until modified by a write operation"*, so repeated reads need no pointer
    (§7.5.3). The pointer resets to 00b (Table 8-1), but the part powers up in single-shot mode (Config reset 8583h, MODE = 1,
    §8.1.3), so **continuous mode starts with a configuration write**, which leaves the pointer on 01b (Config): one pointer
    write (18 clocks) then puts it on the Conversion register, and every read after it is 27. That is exactly §9.1.7's
    quick-start sequence (*write Config, 4 bytes; write the pointer, 2 bytes; read, 3 bytes*): 36 + 18 + 27 = 81 clocks
    once, then 27 a reading. START and STOP are not clock pulses and are not in the 27.
  - **Pointer written before every read** (a different register read in between, or a driver that always writes it): 18 +
    27 = **45 clocks** (one transaction with a repeated START, or two with STOP and START): 10 kS/s needs **450 kHz** (past
    Fast mode); 400 kHz carries **8,889** a second, 100 kHz **2,222**.
  - **Single-shot reading**: the configuration write with OS = 1 (address, pointer 01b, MSB, LSB: Figure 7-10, **36**
    clocks), the wait (power-up ≈ **25 µs**, §7.4.2.1, then the conversion, **1/DR**, §7.3.6: 1.1628 ms at 860 SPS, 1.057 to
    1.292 ms with ±10 %), the pointer write to 00b (**18**), the read (**27**): **81 clocks** plus the wait. Nominal, at
    400 kHz: 0.2025 + 1.1628 + 0.025 = 1.390 ms → **719 readings a second**; at 100 kHz: 0.81 + 1.1628 + 0.025 = 1.998 ms →
    **501**. Waiting out the slowest conversion (1.292 ms): **658** and **470**. Polling the OS bit adds 27 clocks a poll
    (the pointer is on Config after the write); the ALERT/RDY pin costs no clocks (§7.3.8). The datasheet's own *"a
    conversion at 860SPS only requires approximately 1.2ms"* (§7.4.3) ✓ 1.1628 + 0.025 = 1.188 ms.
  - So the PLAN's *"the ADS1115 at its 860 SPS needs about 23 kHz"* is right as written: 860 SPS is reachable only in
    continuous mode, where 27 holds. The second numeric's *"On I²C, reading one 16-bit result takes about 27 clock cycles"*
    states what it counts, but not the condition, and the condition changes the explain's verdict for a 400 kHz bus:
    **F-c6-1 (accuracy)**.
- **Our own wording fixed before sending**: the brief page's note said 27 clocks hold *"as it does in continuous mode"*, as if
  the mode set the pointer; the controller sets it, once (above). This spec says *"already pointing at its result
  register"*.
- **Boundaries** (stand-in, F-c6-4): 601 linear samples over [100, 100,000] are 166.5 S/s apart; at N_o = 11 the last valid
  sample under 100 kHz is **3,596.5** S/s (0.0128 decades short of 3,703.7: ≈ 2.6 px at 200 px a decade) and under 400 kHz
  **14,752** (0.0018 decades, ≈ 0.4 px). Both edges read as 3.6k and 14.8k.
- **The graph**: y from 100 × 16 = 1,600 to 100,000 × 27 = 2.7 × 10⁶, **3.23 decades**; the two lines 0.227 decades apart
  (≈ 24 px on 340 px); on draw6's frame (940 px over 3 decades) 860 S/s sits at x = 293 px, 10 kS/s at 627, 3,704 at 492,
  14,815 at 680.

**F5 and the chain** (A4): p7 now reads *"This is particularly important in measurement systems. Recall our measurement chain
from the last module:"* (F5 applied ✓). The chain p8, compared by script with whitespace collapsed, is **identical** to
D2·010 card 1's (*The code has to travel*, `notes/Day02/010-digital-interfaces/en.md` l. 67–68, after *"We can think of the
complete path as:"*): **Physical quantity → Sensor → Electrical signal → Signal conditioning → ADC → Digital data →
Digital interface → Processor → Engineering value** ✓, and D2·010 is the module just before this one (12:00–12:30) ✓. *Not
this card's*: D2·050 shows two shorter chains (*"… → Digital data → Processing → Engineering value"*, l. 208; *"… → Digital
code → Processing → Measurement result"*, l. 522), for D2·050's own check.

**S50** (A4): D2·010 card 9's seed (*"One question on that list comes back with numbers in the very next module: how much
data, how quickly? Can the wire keep up?"*) points at that card's list, whose first two questions are *"How much data needs
to be transferred?"* and *"How quickly does the data need to be transferred?"*; the harvest pairs them as the seed does ✓,
and p1 answers the seed's *"Can the wire keep up?"* ✓. D2·010 card 9 kept rates off its figure so they arrive here (its
F-c9-5) ✓; UM10204 names the modes by bit rate (100 kbit/s, 400 kbit/s) and their f_SCL maxima (100 kHz, 400 kHz): one bit a
clock, so both namings agree ✓.

**Section D, Equation rows**
- [x] Symbols as the course and UM10204: f_SCL (SCL, UM10204's name for the clock line), f_s, N_d, N_o; units bit/s, Hz, S/s
  carried through; *"kS/s"* as the PLAN, *"SPS"* in the ADS1115's labels as its datasheet.
- [x] Every example recomputed above to the digits shown (160 kbit/s, 13.76 kbit/s; 160, 270, 23.22, 100, 400 kHz).
- [x] Slider ranges real: N_d 8–32 (one to four bytes); N_o 0–70 (0 payload, 11 parked pointer, 29 pointer every read, 65
  single-shot); the domain 100–100,000 S/s covers the ADS1115's slowest useful rate to past Fast mode.
- [x] The graph obeys the Plot rows: the expression is the law itself; log axes over real ranges; one worked value at a
  stated point (E2: 10,000 S/s → 270 kHz); no artefacts (straight lines on log–log, both of slope 1).

**A1–A8** (on the owner's current text and on this spec): A1 ✓ (Node, above; every number of the statement, the PLAN, both
ASKs and the Flow); A2 ✓ (I²C one bit a clock, nine clocks a byte; no converter model is involved: the 16 bits are the bits
sent, not the course's 12-bit SAR); A3 ✓ (the edges at 3,704 and 14,815; the ±10 % rate; 276.9 kHz with the gaps still in
the tolerance; N_o = 0 gives the payload); A4 ✓ (F5's chain word for word; S50 against D2·010 card 9; D2·010 card 7's
100/400 kHz modes; card 2 and card 5 of this module: the ADS1115's 860 SPS ✓); A5 ✓ with **F-c6-1** raised (the 27-clock read
holds only with the pointer parked; the ADS1115's sequence as SBAS444E §7.5.3); A6 ✓ (*"about 27"*, *"about 70 %"*, *"near
3,700"*, *"before start, stop and the gaps"* hedge correctly; *"approximately 160 kbit/s"* under-claims an exact figure,
harmlessly; the explain's *"start bit"* is generic overhead, I²C having a START condition instead, read with p2's
*"start/stop conditions"*: no finding); A7 ✓ (SBAS444E §5.5, §5.6, §7.3.6, §7.3.8, §7.4.2, §7.4.3, §7.5.1.3, §7.5.2.2, §7.5.3,
Figures 7-9 and 7-10, Table 8-1, §8.1.3, §9.1.7; UM10204 Rev. 7.0 Table 11); A8 ✓ (Section D above).

**Simplifications and their on-bench labels** (A6): B's caption (*"…with the converter already pointing at its result
register. START, STOP and the gaps between reads come on top."*), B's assumptions 1–3, A's assumption 1, E3's *"continuous
mode"*.

## 9. Faults and non-ideal behaviour

**PLAN FAULT**: none in the PLAN. Beside the ideal (A2), the bench states (assumptions, tip, explore): the pointer written
before every read (45 clocks, F-c6-1); single-shot mode (81 clocks and the conversion wait: ≈ 719 a second at 400 kHz); the
START, STOP and bus-free gaps (≈ one clock a read at the minima); an SCL below nominal or a stretched clock; the data rate's
±10 %; reading faster than the converter converts (the same result again, §7.3.8). Said if asked: a bus shared with other
devices divides its reads between them.

## 10. Accessibility, legibility and print

- Wall (C2): the statements, the pane rows and the boundary labels at the benches' wall sizes. Check at 1920 × 1080 and
  1024 × 768 that (1) the two boundary labels, *Standard mode (100 kHz) keeps up* and *Fast mode (400 kHz) keeps up* (FR
  *Le mode standard (100 kHz) suit*, *Le mode rapide (400 kHz) suit*), clear each other: their edges are log10(14,752 /
  3,596.5) = 0.61 decades apart, ≈ 123 px at 200 px a decade; if they collide the labels become *100 kHz* and *400 kHz*
  in both languages; (2) the E3 dot's label clears the payload line (the dots sit 0.227 decades apart vertically at a given
  f_s; E3 at 860 and E2 at 10,000 are 1.07 decades apart horizontally); (3) the five-row Example pane fits without scrolling.
- Reduced motion (C3): nothing animates; the laser is the presenter's hand; each still carries its state.
- Colour (C4): position (the read line always above), the compare legend, the boundary labels and the symbol names as well
  as hue; check teal against amber and the violet labels under deuteranopia.
- Keyboard (C5): Next / Back; the pane and step keys; each hold slider's arrow keys.
- Print (C8): s0–s3 with their `say`; both statements, B's derivation with its notes, the examples, the rearrangement and the
  assumptions.
- Languages: every title, caption, symbol, note, example, boundary and assumption `{en, fr}`; the French drafts are ours, for
  the owner's review; numbers and units are not translated (*kS/s*, *kHz*, *SPS*).

## 11. Assets to make or source

| Asset | Format | Made by | Status |
|---|---|---|---|
| Equation A `bus-payload` (§3a), EN and FR | YAML in `en.md`, after the first numeric | the author (FR drafts for the owner's review) | to write once F-c6-3 is decided |
| Equation B `bus-clock` (§3b), EN and FR | YAML in `en.md`, after the second numeric | the author | to write |
| The two numerics as `numeric` blocks (the PLAN's ASKs) | YAML in `en.md`, the first before the statement | the author | to write |

No SVG, no datasheet image (D2 does not reach this card).

## 12. Bench capabilities this needs

**Equation Bench, exists** (source read 2026-10-21): statement, symbols with units and colours, term highlights, derivation
(mirrored step), examples (4 significant figures, SI prefixes on any unit), a rearrangement, boundaries, assumptions,
`graph` with `scale` log on x and y, `hold`, `compare` (2–5 values of a held symbol), `markExamples`; pane and step mirrored.
**Ink**: the laser, mirrored (M07-c) — exists.

**To confirm when written**:
- (a) that **two lead blocks and two activities under one heading** compile in the order numeric (before the statement) →
  Equation A → numeric → Equation B, each lead block opening its own slide with the Flow fence after it (F-c6-3; as D2-010-07
  §12 (a));
- (b) how the `compare` family is drawn: if only by hue, C4 rests on position and the legend; a dash on the second value
  would help;
- (c) that `markExamples` puts each example's dot on the compare curve of its own N_o (E1 on N_o = 0, E2–E5 on N_o = 11),
  or on the curve of the held default only;
- (d) that boundaries on a log x axis are sampled linearly (they are, l. 1407: the edges land 2.6 px and 0.4 px early, §8),
  and that two nested valid regions read as two (§10);
- (e) the hold sliders have no `step`: N_d and N_o take fractional values in Study (the explore tasks name the value);
- (f) the y range on a log axis is set from the curves (1,600 to 2.7 × 10⁶ here) with the 100 kHz and 400 kHz levels inside.

**Missing: X21, already asked** (crossing **506**, open, raised 2026-10-20 for D1·070 card 6: *"an authored reference line on
an Equation graph"*, `graph.references` with `axis: y`, `at`, `label`, dashed, neutral ink). This card needs it for the
PLAN's markers: two y levels, **100 kHz** *Standard mode* and **400 kHz** *Fast mode*, violet (the bus) as draw6, on a
**log** y axis (506 already asks that a log axis gets a positive value). Until it lands: B1 and B2 (F-c6-4).

**Would help**: a `step` on hold sliders (whole bytes for N_d, whole clocks for N_o; a request to raise only if the owner
wants it, F-c6-5).

**Not this card's**: a Plot beside the Equation (the Plot block has no log axis, and the picture is the Equation's own
graph: §1); an I²C timing diagram of the 27 clocks (a Figure or Draw drawing; D2·010 card 4's timing tour is the course's
I²C waveform, and card 8 its byte and ACK).

## 13. Stand-in for the lecture

None needed for the blocks: every field of §3 exists today. What stands in for the target is the two boundaries for X21's
reference lines (F-c6-4): the PLAN's *"markers at 100 kHz and 400 kHz"* become *"keeps up"* regions whose edges are the
solved f_s at each speed, which the PLAN also asks for (*"solved for samples/s at 100 kHz and 400 kHz"*). When X21 lands,
the two levels are added and the boundaries stay (they then answer the same question twice, from y and from x). Nothing is
made twice.

## 14. Findings for the owner

Open, round two: every item below is new in this spec, decided by nobody yet. **F-c6-1 is an accuracy finding**
(proposed register row **D2·020-F8**): it blocks the card and the module until decided.

- **F-c6-1 (accuracy) — the 27 clocks hold only while the converter already points at its result register.** The second
  numeric says *"On I²C, reading one 16-bit result takes about 27 clock cycles: an address byte and two data bytes, each 8
  bits plus an ACK"*, and its explain concludes *"a 400 kHz bus near 14,800"* reads a second. That is true when the register
  pointer is parked on the result (the ADS1115 in continuous mode after one pointer write: SBAS444E §7.5.3, Figure 7-9). When
  the pointer must be written before each read (many I²C sensors and drivers do, and the ADS1115 in single-shot mode
  must), a read is **45 clocks**: 10,000 a second then need **450 kHz**, past Fast mode, and a 400 kHz bus carries **8,889**,
  not 14,800. A single-shot ADS1115 reading is **81 clocks** plus its conversion (≈ 719 a second at 400 kHz). The condition
  is unstated and it changes the verdict, which is the rule's *"unstated assumption that changes the answer"*. The answer
  270 kHz stands (the question defines its 27). Options:
  - (a) the explain gains one sentence, *"That assumes the converter already points at its result register, as an ADS1115 in
    continuous mode does once set; writing the pointer before every read makes it 45 clocks, and 450 kHz, past Fast mode."*
    (35 words, shown, not spoken), and the bench states the condition (B's caption and assumption 1, §3b) (**recommended**:
    the question and the Flow unchanged, the room reads the condition with the answer, as D2·010-F7 was settled);
  - (b) the question names it: *"On I²C, reading one 16-bit result from a converter already pointing at its result register
    takes about 27 clock cycles…"* (+9 words in the widget), and the bench as (a);
  - (c) the bench only (caption and assumption), the PLAN's text unchanged (not recommended: the explain shown to every
    learner still states 14,800 as a property of a 400 kHz bus).
- **F-c6-2 — The second numeric and the overhead term have no words in the Flow.** The Flow's only `[[ask]]` is the first
  numeric's; after p6 it goes to the measurement chain. Nothing scripts the second numeric's ask, its reveal (*"the
  Equation's overhead term switched on, against the 100 kHz and 400 kHz markers"*) or the PLAN's Look for (*"the 160 kbit/s
  payload growing to a 270 kHz clock"*), and the 270 kHz, the two bus speeds and the ADS1115's 23 kHz are never spoken.
  Options:
  - (a) the owner adds two short paragraphs after p6, drafts for the owner's own words: *"[[ask]] On I²C, reading one 16-bit
    result takes about 27 clock cycles: an address byte and two data bytes, each with its acknowledge. What bus clock do
    10,000 samples a second need?"* · `[[pause]]` · *"[[reveal]] About 270 kHz: 27 clocks for every 16 bits, about 70 % more
    than the payload. A 100 kHz bus cannot carry it; a 400 kHz bus can. The ADS1115 itself, at 860 samples a second, needs
    only about 23 kHz."* (31 words in the activity, 40 spoken: **+0.31 min**, §2) (**recommended**: the card's key number is
    scripted, and each sentence of the reveal is one step of §4a);
  - (b) no Flow change: the widget carries the question and the explain; the presenter speaks the strip's suggested words
    (§4a), the same length, unscripted;
  - (c) the second numeric in Study only (the wall goes from Equation A to p7): saves ≈ 1.4 min but loses the PLAN's Look for
    on the wall; it is the owner's to cut, not ours (listed, not recommended).
- **F-c6-3 — The card as four slides, two Equation blocks, the Equation's own log–log graph (no Plot).** An activity takes the
  wall, a lead block opens its own slide and a Flow fence belongs to the block before it, so the card's one fence becomes four
  (**no word changed**): p1–p5 after the first numeric, p6 after Equation A, the second numeric's ask (F-c6-2 (a)) after it,
  the reveal and p7–p12 after Equation B. The PLAN's two formulas become two blocks on identical log–log axes, so the
  payload line stays put and the overhead line appears beside it (the Drive), and neither reveal shows before its numeric
  (B9). Options: (a) as specified (**recommended**); (b) one block (B only), opened after the second numeric, with the first
  numeric revealed by p6 alone (the payload term then has no picture of its own, and the PLAN's *"reveal: the Equation's
  payload term"* is lost); (c) a Plot beside the Equation as D2-010-07 (not possible: the Plot block has no log axis, and on
  linear axes the ADS1115's point is ≈ 5 px from the edge; and the picture here is the law's own graph, not a second
  function: §1).
- **F-c6-4 — The 100 kHz and 400 kHz markers.** The Equation's graph has no authored reference line yet (X21). Options:
  (a) the two boundaries now (shaded *"keeps up"* regions ending at 3.6k and 14.8k S/s), and **this card added to crossing 506
  as a second user** (the two levels on a log y axis), by the lead (**recommended**: the PLAN's *"solved for samples/s"* is
  shown today, its markers when 506 lands); (b) boundaries only, no request; (c) wait for 506 and show no limits (the
  second numeric's reveal then has nothing to point at).
- **F-c6-5 — Proposals**: both captions; the symbols, notes and FR drafts; B's derivation, five examples, rearrangement and
  three assumptions; A's two examples and assumption; the strip's suggested words (§4a); the teacher tip (§7d); the three
  explore tasks (§7e); the colours as draw6. Options: (a) all (**recommended**); (b) all but the explore and the tip's
  single-shot figures (the tip then names only the parked pointer); (c) none. A `step` on hold sliders is not requested
  unless the owner wants it.
- **F-c6-6 — Time, reported only**: the card **4.9 min, 2.1 on the bench** (§2); with F-c6-2 (a) the module is ≈ 29.3–30.3 of
  30 min. Nothing trimmed.

## 15. Acceptance: how we know it is built right

- Equation A compiles with no warning, prints E1 **160 kbit/s** and E2 **13.76 kbit/s**, and draws one line from (100 S/s,
  1.6 kbit/s) to (100 kS/s, 1.6 Mbit/s) on log–log axes with two dots.
- Equation B compiles with no warning; the derivation's last line is the statement; the rearrangement for f_s checks; E1–E5
  print **160 kHz, 270 kHz, 23.22 kHz, 100 kHz, 400 kHz**; the compare family draws N_o = 0 and 11, the second 0.227 decades
  above the first; B1 shades to **3,596.5 S/s** and B2 to **14,752 S/s** at N_o = 11; at the hover, f_s 10,000 reads 160 and
  270 kHz. N_o at 29 moves the read line to 450 kHz at 10 kS/s and the B2 edge to 8,758 S/s (the last sample under 8,888.9).
- A and B share `against`, `domain` and `scale`: switching slides moves nothing but the added line, term and regions.
- The first numeric fires before the statement and s0 reveals it; the second fires before Equation B and s1–s2 reveal it;
  each of the four fences is the teleprompter of the slide its block opens (F-c6-3).
- B1 one change per slide; B2 only the overhead term changes between A and B; B3 s0 alone first; B4 four stills; B5 each
  `say` on the strip; B6 the laser on the edges and the E3 dot; B9 both reveals wait; B10 the explains; B11 N_o one slider
  away in Study; B13 values in the pane, not on the graph; B14 the boundary labels on their edges; B16 the pane, the dots and
  the readout; B17 both lines on one pair of axes; B20 the strip's words and tip.
- C2 at 1920 × 1080 and 1024 × 768, the boundary labels clear (§10); C3 nothing animates; C4 position, legend and labels;
  C5 keys; C6 at 320 px the two lines apart; C8 the print form.
- D Equation rows as §8. E1–E6 for both blocks as presented, in both themes, EN and FR.
- **Six gates (this spec, 2026-10-21)**: (1) realism: I²C's real speeds (UM10204), the ADS1115's real read sequence and
  rate (SBAS444E Figure 7-9, §7.5.3), a real 16-bit stream; the part named under D1, no logo ✓; (2) science: one bit a clock,
  nine clocks a byte, the 27 read's condition stated on the bench and raised for the owner's text (**F-c6-1, accuracy, open**),
  single-shot and the gaps sized in the assumptions ✓ on the bench, the owner's text pending F-c6-1; (3) maths: 160,000;
  270,000; 27/16 = 1.6875; 3,703.7; 14,814.8; 23,220; 45 and 81 clocks; 450 kHz; 8,889; 719 and 501; 14,286 and 3,537; 276.9
  kHz; the boundary samples and pixels, recomputed in Node (§8) ✓; (4) visualization: the payload and the read on one
  log–log frame, the overhead switched on over an unchanged payload line, the limits as the solved rates, the ADS1115's
  point well under both (23 kHz against 100 and 400 kHz) ✓, the limits as levels waiting for 506 (F-c6-4); (5) consistency: the PLAN's
  numbers to the digit, draw6's axes and colours (payload teal, read amber, bus speeds violet), F5's chain word for word
  with D2·010 card 1, S50 with D2·010 card 9, the 100/400 kHz modes with D2·010 card 7; our own slip fixed (the brief page's
  *"as it does in continuous mode"*, §8) ✓; (6) design: one slider row with words, symbol and value, labels on their edges
  with a fallback (§10), a five-row pane, EN and FR drafted ✓ on paper, to check on the built blocks. **Not yet
  spec-ready**: F-c6-1 (accuracy) and F-c6-2 to F-c6-5 are open.
