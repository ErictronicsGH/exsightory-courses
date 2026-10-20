```yaml
id: D1-090-02-code-alone
card: "The code alone means nothing"
module: notes/Day01/090-reference/en.md
bench: Equation                   # exists: statement, symbols, highlights, derivation, rearrangements, examples, assumptions, characteristics, graph with hold, compare and markExamples
library: "code-to-voltage: an Equation (V_read = code / 2^N · V_ref, the firmware's reading of a code: card 1's equation turned round), defined in the card's `equation` block, graphed against the code from 0 to 4095 at 12 bits as a family for V_ref = 3.3 V and 1.1 V, with code 2047 marked on both lines"
dimensions: 2D
stand_in: "today's Equation Bench: N written as 2^12 (no slider), the code printed 2.047 k in the Example pane (its label carries 2047), the two references drawn at once (no step between them)"
optional_benches: []
real_thing: "the firmware's conversion of a 12-bit code to volts (v = raw × V_ref / 4096, the cold open's second line) on the course's 3.3 V reference and on an MCU's internal 1.1 V reference"
minutes: 0.9                      # on the bench: from the numeric's reveal to the end of the card
card_minutes: 2.3
status: spec-ready                # D1, D5 and round two (C2a–C2c) decided
learner_action: numeric
predictions: []                   # the numeric comes before the bench and is answered at s0
seeds: [S30]                      # S30 harvested at s2 (planted in D1·010; harvested again on card 6)
key_variable: "V_ref: the same code, the same fraction 2047/4096, three times the voltage on a reference three times larger"
time_scale: "none (no motion)"
steps: 3                          # s0–s2
```

The Equation's format as read on 2026-10-20 (the files and facts of `D1-090-01-code-is-a-ratio.md`'s preamble): one
`statement` per block, evaluated for its left side; every right-hand symbol off the x axis on a `hold` slider (no `step`:
0.01 of its range); `compare` draws one curve per value of a held symbol (two to five) and removes its slider;
`markExamples` places each example at its own values, so an example on 1.1 V lands on the 1.1 V line; **examples are
evaluated in one direction only**, right side to left, and the Rearrangements pane shows the rearranged formula with its
note but **evaluates nothing**; a rearrangement through `floor` is a compile error. `formatQuantity` prints a code of 2047
as **2.047 k** and a voltage of 0.5497 V as **549.7 mV**. Mirrored: pane, pin, derivation step, a simulation's transport.
Not mirrored: a slider's value, the hover, the wheel zoom, `graph.animate`. **One bench block per card** (EAC), so card 2
carries its own block. The module's time table is in `D1-090-05-ratiometric.md` §2b.

## 1. What the room must understand

- **Statement** (verbatim): *To turn a code back into a voltage you need the resolution, the reference, the input range
  and the configuration. Change any one of them and the same code means a different voltage.*
- **ASK** (verbatim from the PLAN): *numeric ×2 (at the Flow's [[ask]]) — "The code is 2047, from a 12-bit converter.
  What voltage is that with a 3.3 V reference? With a 1.1 V reference?" · answer: 1.649 V ± 0.002 V, then 0.550 V ±
  0.001 V · reveal: the Equation from the last card with V_ref switched between the two. · explain: The same code is the
  same fraction, 2047/4096 or about 0.4998, of whatever the reference happens to be. · depth: use · practice:
  computational thinking.*
- **HARVEST** (verbatim): *S30 — "Our 2047 from earlier today stands for 1.649 V, if the reference really is 3.3 V. The pin
  was at 1.79 V; 070 told us why."* (ACCURACY D1·090-F5, applied 2026-10-20.)
- **SHOW, Drive, Look for, Status**: *none in the PLAN beyond the reveal.*
- **Decided** (owner, 2026-10-20): D1, the PLAN's Equation Bench; D5, the course's converter truncates (card 1's ⌊ ⌋).
- **"The Equation from the last card", turned round** (F1). Card 1's statement gives the code from a voltage; the reveal
  needs the voltage from a code, and the bench evaluates a statement in one direction only, while card 1's ⌊ ⌋ forbids
  its rearrangement. So this card's statement is the PLAN's own rearrangement (card 1's SHOW: *"V_in = code·V_ref /
  2^N"*), written for what it is under truncation, the voltage the code is read as, V_read, and derived on the Proof from
  card 1's statement. **"Switched between the two"** becomes a `compare` family (both references at once), because a
  slider's value does not reach the wall.
- **Bench and library.** The **bench** is the Equation Bench. The **library** is this card's equation, `code-to-voltage`.
- **Insight**: *2047 is not a voltage: it is 2047/4096 of the reference, just under half. On 3.3 V that is 1.649 V, on
  1.1 V it is 0.550 V; to read a code you must know the reference (and the bits, the range, the configuration).*
- **Kind of knowledge**: *a relation between quantities* and *a contrast between two states* (two references). Card test →
  **Equation**. B17 applies (two references on one code axis, one volt scale). B15, B18, B19 do not.
- **Why this bench, not a still**: the two answers are evaluated, not typed; the two lines show the same code landing at
  two heights, three times apart, and every other code with it; in Study the learner moves N (whole bits) and sees the
  same code mean another voltage again: the statement's *"change any one of them"*.
- **Key variable**: V_ref (the family); the code is the x axis.

## 2. Time

The Flow is 93 words (word count of `en.md`, 2026-10-20); p1's `[[ask]]` question (18) is counted in the numeric: **75
spoken outside it**.

| Beat | Minutes | Source of the number |
|---|---|---|
| Before the bench: p0 *"This means the digital number an ADC produces has no universal meaning…"* (33) | 0.25 | 33 ÷ 130 |
| The PLAN's numeric: p1 *"[[ask]] The code is 2047, from a 12-bit converter. What voltage is that…"* (23; C2b applied) | 0.18 | 23 ÷ 130 |
| The numeric's answer window, two parts (two multiplications; p2 `[[pause]]`) | 1.0 | as the D1·080 specs (45 s for one part), + 15 s for the second, which reuses the first |
| s0 the two answers: unscripted, ≈ 25 words (§4a) | 0.19 | estimate |
| s1 one fraction, two lines: unscripted, ≈ 16 words (§4a) | 0.12 | estimate |
| s2 the HARVEST S30 line (26), its numbers read aloud (≈ +4) | 0.23 | 30 ÷ 130 |
| s2 held: p3 *"And even once we have the voltage…"* (42) | 0.32 | 42 ÷ 130 |
| Pane and pin moves not covered by speech (3 × ≈ 1.5 s) | 0.08 | estimate |
| **Card total / of which on the bench** | **2.3 / 0.9** | 2.33 / 0.94 |

The Flow has no `[[reveal]]` paragraph: after the pause it goes straight to p3, so the answers are given by the activity's
reveal and the presenter's unscripted lines (s0, s1; B20) and the PLAN's harvest (s2). The U018 brief showed ≈ 2.2 min;
the 0.1 is the harvest's numbers read aloud and s1's line. **Module check**: `D1-090-05-ratiometric.md` §2b.

## 3. The scene: what is on the bench

### 3a. The equation (`code-to-voltage`), target form

| Field | Content (EN · FR draft, for the owner's review) | Source |
|---|---|---|
| `title` | *The code alone means nothing* · *Le code seul ne veut rien dire* | the card |
| `statement` | `V_read = code / 2^N * V_ref`, printed **V_read = (code / 2^N)·V_ref** | the PLAN's rearrangement (card 1's SHOW); F1 |
| `caption` | *The same code is the same fraction of whatever the reference is.* · *Le même code est la même fraction de la référence, quelle qu'elle soit.* | the PLAN's explain |
| `symbols` | `V_read` *Voltage read from the code* (V), note *what the firmware computes: the code times one step. The converter truncated, so the input was this or up to one step more* · *Tension lue à partir du code*, *ce que calcule le micrologiciel : le code fois un pas. Le convertisseur a tronqué : l'entrée valait cela, ou jusqu'à un pas de plus*; `code` *Code* (no unit), note *a whole number, 0 to 2^N − 1* · *Code*, *un entier, de 0 à 2^N − 1*; `V_ref` *Reference voltage* (V), note *the voltage the converter measured against* · *Tension de référence*, *la tension à laquelle le convertisseur a comparé l'entrée*; `N` *Resolution* (bits) · *Résolution*; for the derivation `V_in` *Input voltage* (V) · *Tension d'entrée* | the PLAN; card 1 |
| `highlights` | term `code / 2^N` — *the fraction of the reference: 2047/4096 = 0.4998, just under half* · *la fraction de la référence : 2047/4096 = 0,4998, un peu moins de la moitié* (teal); term `V_ref` is a symbol (pinned as a symbol, amber) | the PLAN's explain |
| `source` | *An ideal N-bit converter read back by firmware* · *Un convertisseur idéal de N bits relu par le micrologiciel* (unbranded; §8) | §8 |
| `derivation` | 1 `code = floor(V_in / V_ref * 2^N)` — *the last card: the input as a fraction of the reference, times the levels, kept whole* · *la carte précédente : l'entrée en fraction de la référence, fois les niveaux, gardée entière*; 2 the statement — *turned round: the code over the levels is the fraction; times the reference, a voltage. The bottom of the code's band: the converter kept the whole part* · *retournée : le code sur les niveaux donne la fraction ; fois la référence, une tension. Le bas de la bande du code : le convertisseur a gardé la partie entière* (**Proposal**, F3) | card 1; D5 |
| `rearrangements` | `solveFor: V_ref` — *a known input and its code tell you the real reference: 1.65 V that reads 2112 means 3.20 V (the next card). Tomorrow's gain calibration does this* · *une entrée connue et son code donnent la vraie référence : 1,65 V lu 2112, c'est 3,20 V (la carte suivante)…* (**Proposal**, F3) | card 3; D2·050 |
| `examples` | §3b | §8 |
| `boundaries` | none | |
| `assumptions` | (1) *The converter truncates: the code is the whole number of steps below the input, so the input was V_read or up to one step more: 1.6492–1.6500 V for 2047 on 3.3 V, 0.5497–0.5500 V on 1.1 V* · *Le convertisseur tronque…* — simplifying. (2) *The reference really is the value the firmware uses* · *La référence vaut vraiment la valeur qu'utilise le micrologiciel* — breaksWhen *it is not: every reading is off by the same fraction (the next card)* — limiting (S30's *"if the reference really is 3.3 V"*). (3) *The input range is 0 V to V_ref, single-ended, with no gain inside the converter* · *La plage d'entrée va de 0 V à V_ref…* — breaksWhen *the range or the configuration differs (a differential input, a programmable gain, a divider in front): the same code means another voltage again* — limiting (the statement's *"input range and configuration"*). (4) *The code is a whole number; the line joins the readings of the codes* · *Le code est un entier ; la droite relie les lectures des codes* — simplifying | the statement; PLAN; D5 |
| `characteristics` | `show: [roots, intercepts, limits, monotonicity]` (no sensitivity: its bar for N, −8.3 %/%, means nothing for a whole number of bits) | `characteristics.ts` |
| `graph` | against `code`, domain [0, 4095]; `scale` linear; `hold` V_ref (1.0–5.0 V, default 3.3), N (12–16 bits, default 12, **whole bits**: X-intstep; from 12 up, so every code on the axis exists); `compare` V_ref at [3.3, 1.1]; `markExamples: true` | F1 |
| `notes` | `include: true` | print |

**Axes.** x: *Code*, 0 to 4095 (ticks every 500). y: *Voltage read from the code (V)*, auto-scaled 0 to 3.299 V. Two
straight lines through the origin: V_ref = 3.3 V to 4095 × 3.3/4096 = 3.2992 V, and V_ref = 1.1 V to 1.0997 V, one
third of its height everywhere. The legend reads *V_ref = 3.3 V* and *V_ref = 1.1 V* (the bench's `compare` label).

### 3b. Worked examples (each on its own reference's line)

| # | Label (EN · FR) | code | V_ref | N | V_read (shown, 4 s.f.) | Note |
|---|---|---|---|---|---|---|
| E1 | *Code 2047 on 3.3 V* · *Code 2047 sur 3,3 V* | 2047 | 3.3 | 12 | 1.649 V | *2047/4096 = 0.4998 of 3.3 V. What the cold open's firmware printed: "2047 1.649". On our truncating converter the input was 1.6492 to 1.6500 V* · *…Ce qu'affichait le micrologiciel au début de la journée : « 2047 1.649 »…* |
| E2 | *Code 2047 on 1.1 V* · *Code 2047 sur 1,1 V* | 2047 | 1.1 | 12 | 549.7 mV | *The same fraction of a third of the reference: 0.550 V (0.5497–0.5500 V)* · *La même fraction d'une référence trois fois plus petite : 0,550 V…* |

The bench prints E2 as **549.7 mV**; the PLAN's *0.550 V* is the same value to three figures, and the note says both (as
`D1-080-02`'s 805.7 µV and 0.806 mV). E1's and E2's given code prints *2.047 k* until X-count; the labels carry *2047*.

**Values beside their element**: the Symbols pane with values and units; the Example pane with each V_read and note; on
the graph the two dots at code 2047, one on each line, labelled.

**Colours and their second channel** (C4): the two lines in the Equation's series colours, each labelled by the bench
with its reference; the dots in the example amber, labelled; the highlighted fraction with its words. The U018 brief's
palette (references rose) is the bench's to apply if per-curve colours exist (§12).

## 4. The run: step by step, as the Flow goes

### 4a. Steps

| # | id | Flow paragraph | What changes (`say`) | Pane | Presenter's control |
|---|---|---|---|---|---|
| — | the PLAN's numeric fires before the bench (p1 `[[ask]]`, p2 `[[pause]]`) | — | (§7a) | — | the activity |
| 0 | `s0-two-answers` | unscripted (§2) | Code 2047 is 1.649 V on a 3.3 V reference and 0.550 V on 1.1 V. | Example, E1 and E2 | pane |
| 1 | `s1-one-fraction` | unscripted (§2) | Both are 2047/4096 of their reference, just under half: the same code, two lines, two voltages. | Graph, both lines, E1 and E2 marked; `code / 2^N` pinned | pane, pin |
| 2 | `s2-our-2047` | the HARVEST S30 line; then p3 *"And even once we have the voltage…"* held | Our 2047 is 1.649 V only if the reference really is 3.3 V; the pin was at 1.79 V. | Example, E1's note; `V_ref` pinned | pane, pin |

Suggested words (B20, on the strip; **Proposal**, F3): s0 *"1.649 volts on the 3.3 volt reference; 0.550 on 1.1. The
same code, two answers. Both are 2047 over 4096 of the reference."* (≈ 25 words with the numbers spoken); s1 *"Here are
the two references as two lines. Code 2047 sits on both, three times higher on 3.3 volts."* (≈ 16).

p3 (sensor, scaling, calibration; *"tomorrow's work, in the firmware"*) names no value on the bench and is spoken over s2
held (B13).

### 4b. Motion, cues and stills

| # | Motion | Movers | Cue | Hold | Reduced motion (C3) | Still |
|---|---|---|---|---|---|---|
| 0 | none (pane) | 0 | E1's 1.649 V beside E2's 549.7 mV | hold | same | the Example pane |
| 1 | none (pane, pin) | 0 | the two lines; the two dots one above the other at 2047; the fraction lit | hold | same | the graph |
| 2 | none (pane, pin) | 0 | E1's note; `V_ref` lit | hold | same | the Example pane with `V_ref` lit |

No simulation, no `graph.animate`.

## 5. Pacing and interaction, by surface and view

**Who paces** (B12): the presenter on the wall (pane, pin, derivation step mirrored); the learner in Study and Scope.

| View | Who | Controls |
|---|---|---|
| Preview (in the slide) | everyone | the statement and the current pane |
| View (details) | everyone | every pane: Symbols, Terms, Proof, Example, Rearrangements, Graph, Assumptions; one slider, labelled on top in words with the symbol in parentheses and the value at the right: *Resolution (N)* 12–16 bits, default 12, whole bits (V_ref is the family, so it has no slider); the hover readout |
| Edit (session only) | everyone | not specified for the Equation Bench |
| Authoring | authors | the `equation` block's YAML |

- **The presenter's strip** (B20): the pane and pin controls; the next `say`; s0's and s1's suggested words; the S30 line;
  the teacher tip.
- **Study / Scope**: the N slider; the hover on either line; the Rearrangements pane (§7e).
- **Phone** (C6): the statement, then the pane; the two dot labels at code 2047 sit one above the other (1.1 V apart in
  height, a third of the plot): check they do not collide at 320.
- **Locked**: the bench is not shown until the numeric closes (the PLAN's reveal is the Equation); the presenter does not
  move N on the wall.

## 6. The frame

The Equation's frame (the Canvas header and footer; panes as pills, D4.17). Title *The code alone means nothing*. No
inset, no graph band beyond the Graph pane's own.

| Tile / panel | Used? | Selected item | List / contents |
|---|---|---|---|
| Panes | yes | the open pane | Symbols, Terms, Proof, Example, Rearrangements, Graph, Assumptions |
| Legend | yes | — | *V_ref = 3.3 V*, *V_ref = 1.1 V* |
| Slider | Study | N | — |
| Readout | yes (hover) | code, V_read on each line | — |

## 7. Thinking, not watching

- **7a. The PLAN's ASK** (verbatim, §1): numeric ×2, *"The code is 2047, from a 12-bit converter. What voltage is that
  with a 3.3 V reference? With a 1.1 V reference?"*, answers *1.649 V ± 0.002 V, then 0.550 V ± 0.001 V*. It fires at
  the Flow's p1 `[[ask]]`, **before the bench appears**, and **s0 answers it**. (The spoken question omits *"from a
  12-bit converter"*: F2.)
- **7b. Prediction point**: none beyond the numeric.
- **7c. After**: the explain. In Study, done means both parts answered and the Graph pane opened.
- **7d. Teacher tip** — **Proposal** (F3): *Expect 6.597 V (2047 × 3.3/1024: ten bits assumed), 0.4998 (the fraction,
  with no reference) and 2.199 V on 1.1 V (ten bits again). All are outside the tolerances. Ask: how many levels does
  this converter have? And of what is 2047 a fraction?*
- **7e. Explore** (B11): in Study, N to 16: *2047 is now 0.103 V on 3.3 V*; the Rearrangements pane: *a known 1.65 V that
  reads 2112 means the reference is 3.20 V* (the next card).

## 8. Faithfulness (the quality bar)

**Arithmetic** (V_read = code / 2^N · V_ref; recomputed in Node, 2026-10-20):
- **E1**: 2047/4096 = **0.499756** (the explain's *"about 0.4998"* ✓); × 3.3 = **1.64919 V**, shown 1.649 V (the PLAN's
  answer ✓; D1·010's console *"2047 1.649"*: `%.3f` of 1.64919 ✓).
- **E2**: × 1.1 = **0.549731 V**, shown 549.7 mV (the PLAN's 0.550 V, to three figures ✓). 3.3/1.1 = **3** ✓.
- **The code's band on the truncating converter** (A2, A3): 2047 covers 2047·LSB to 2048·LSB: **1.649194–1.650000 V** on
  3.3 V (LSB 0.8057 mV) and **0.549731–0.550000 V** on 1.1 V (LSB 0.2686 mV); the top ends are exclusive (1.65 V and
  0.55 V give 2048). So *"stands for 1.649 V"* (S30) is the band's bottom, the firmware's reading, to four figures; 1.649
  itself (1.649/3.3 × 4096 = 2046.76) is 0.19 mV below the band, and 0.550 is the band's open top. Neither misleads at the
  precision given; assumption 1 states the band (F4).
- **The tolerances**, as `scoring.ts` compares them (both ends inside, doubles): 1.649 ± 0.002 = [1.647, 1.651] accepts
  1.6492 (exact), 1.6496 (the band's middle; also 2047/4095 × 3.3, the 2^N − 1 convention), 1.650 and 1.65 (the band's top;
  *"half of 3.3"*); rejects 6.597 (10 bits), 0.5497 (the other reference), 0.4998 (no reference). 0.550 ± 0.001 =
  [0.549, 0.551] accepts 0.5497, 0.5499 (the middle; also 2047/4095 × 1.1), 0.55 and **0.549** (the bottom to three
  decimals: checked in Node, 0.549 ≥ 0.55 − 0.001 holds in doubles); rejects 1.649, 0.5, 2.199 (10 bits) and 0.548. Each
  window holds its whole band and the other convention, and no common error ✓.
- **The axis**: 4095 × 3.3/4096 = **3.2992 V**; 4095 × 1.1/4096 = **1.0997 V**. At N = 16, 2047/65536 × 3.3 = **0.1031 V**
  (§7e).
- **The rearrangement**: V_ref = V_read · 2^N / code: 1.65 × 4096 / 2112 = **3.200 V** (card 3 ✓).
- **S30** (A4): D1·010's pin is 3.585 V halved by 100 k / 100 k = **1.7925 V** (*"1.79 V"* ✓), ideal 2224.87 (*"about
  2225"* ✓); 2047 is **8.0 %** below it (2047/2224.87 − 1 = −0.080 ✓); D1·070's cause: a 1.29 µs window, 2.53 τ, settling
  (*"070 told us why"* ✓).

**Section D, Equation rows**
- [x] Symbols match card 1 and card 3 (code, V_ref, N, V_in); V_read named for what the firmware computes; units carried.
- [x] Every example recomputed above, to the four figures the bench shows.
- [x] Slider range real: 12–16 bits, so every code 0–4095 exists; V_ref is a family of two real references (the course's
  3.3 V and a common internal 1.1 V, card 4).
- [x] The graph obeys the Plot rows: straight lines are the law's shape; both references on one scale; each example on its
  own line; the whole-number code stated (assumption 4).

**A1–A8**: A1 ✓ (firmware's v = raw × V_REF / 2^N, the cold open's second line; the ideal transfer function, Kester,
*Data Conversion Handbook*, ch. 2; the 1.1 V internal reference of a common 8-bit MCU, card 4's datasheet; sources cited
here only); A2 ✓ (truncation's band); A3 ✓ (both PLAN answers against the band, F4); A4 ✓ (S30 against D1·010 and D1·070);
A5 n/a; A6 ✓ (*"if the reference really is 3.3 V"* is assumption 2); A7 ✓ (F2 and F4); A8 ✓.

## 9. Faults and non-ideal behaviour

**PLAN FAULT**: *none on this card.* Truncation's band (assumption 1), a reference that is not what the firmware assumes
(assumption 2, the next card) and another range or configuration (assumption 3) are named on the Assumptions pane.

## 10. Accessibility, legibility and print

- Wall (C2): statement, derivation, pane text at the Canvas's wall size; axis labels, the two legend entries and dot
  labels at the floor; check at 1920 × 1080 and 1024 × 768.
- Reduced motion: nothing animates.
- Colour (C4): lines labelled by reference; dots labelled; the highlight with its words.
- Keyboard (C5): pane, pin and step keys; the N slider's arrow keys (one bit per press with X-intstep).
- Print (C8): the Equation's notes (statement, derivation, examples with notes, rearrangement, assumptions, the graph).
- Languages: every label, note, caption and assumption as `{en, fr}` (§3); French drafts are ours, for the owner's review;
  numbers and units are not translated.

## 11. Assets to make or source

| Asset | Format | Made by | Status |
|---|---|---|---|
| The `equation` block (§3a, §3b), EN and FR | YAML in `en.md` | the author | to write |

## 12. Bench capabilities this needs

**Equation Bench, exists**: statement, symbols with notes, a term highlight, derivation (with `floor` in step 1),
`rearrangements` (`solveFor: V_ref`: the target appears once, under `*`, so `isolate` peels it), examples, assumptions,
caption, `characteristics.show`, graph with `hold`, `compare` and `markExamples`, panes, pins and derivation steps
mirrored.

**Missing (request it)** (working names, as `D1-090-01` §12):
- **X-count**: the code printed *2047*, not *2.047 k*, in the Example pane's given values and the hover.
- **X-intstep**: the N slider in whole bits (today 0.04-bit steps over 12–16).

**To confirm when written**: (a) that `compare` labels its lines *V_ref = 3.3 V*, *V_ref = 1.1 V* with the symbol typeset
(today the raw name, *V_ref*, with its underscore: would help); (b) that the rearrangement prints readably
(*V_ref = V_read·2^N / code* or its equivalent); (c) that `characteristics.show` hides the sensitivity bars.

**Would help**: X15 (a `compare` family revealed one curve per step: 3.3 V first, then 1.1 V, so *"switched between the
two"* is a step on the wall); X21 (crossing 506: a vertical reference line at code 2047 through both dots).

**Not this bench's**: what the voltage means as a quantity (sensor, scaling, calibration: p3, Day 2).

## 13. Stand-in for the lecture

**Today's Equation Bench**, the same block with the statement written `V_read = code / 2^12 * V_ref` (no N slider, so no
fractional bits; the Proof's step 1 keeps 2^N) and the codes printed *2.047 k* in the Example pane (the labels say
*2047*).

- **It shows**: every step of §4.
- **It loses**: the N slider in Study (*"change the resolution and the same code means another voltage"* is then
  assumption 3's words, not a control); plain-digit codes.
- **Checks lost**: B11 partly (N in Study).
- **What the Flow might say differently**: nothing.
- The stand-in's block is the target's with one field added later, so nothing is made twice.

## 14. Findings for the owner

- **F1 — The reveal: card 1's equation, turned round, with both references at once.** The bench evaluates a statement
  from right to left only, and card 1's ⌊ ⌋ (D5) forbids its rearrangement, so the voltage of code 2047 cannot be read
  from card 1's block. A slider's value does not reach the wall, so *"V_ref switched between the two"* cannot be a slider
  move the room sees. Options: (a) this card's own block, the PLAN's rearrangement as its statement (V_read = code/2^N ·
  V_ref, derived from card 1's on the Proof), V_ref as a family [3.3, 1.1] (**recommended**); (b) card 1's block again
  with V_ref compared [3.3, 1.1], read backwards from code 2047 across to each staircase (needs X21's horizontal line at
  2047 and gives the answers only as positions, not values); (c) the family revealed one line per step (X15, not built):
  (a) now, (c) when X15 lands.
- **F2 — The Flow's question omits the resolution** (consistency, not **accuracy**: the activity's on-screen question
  says *"from a 12-bit converter"*). p1 *"[[ask]] The code is 2047. What voltage is that with a 3.3 V reference? With a
  1.1 V reference?"*, while the PLAN's question and the card's own statement say the resolution is needed. A learner
  who only hears it cannot answer. Options: (a) p1 *"[[ask]] The code is 2047, from a 12-bit converter. What voltage is
  that…"* (**recommended**, +5 words, +0.04 min); (b) keep: the screen carries it, and the presenter may use the gap
  (*"what else do you need?"*).
- **F3 — Proposals**: the derivation (step 1 card 1's statement, step 2 turned round); `solveFor: V_ref` (Study: a known
  input gives the real reference, the bridge to card 3 and D2·050's gain calibration); the four assumptions; s0's and
  s1's suggested words; the teacher tip (§7d); the explore prompts (§7e). +0 min each.
- **F4 — reported, not raised: the PLAN's answers against the code's band.** On the truncating converter 2047 covers
  1.6492–1.6500 V (3.3 V) and 0.5497–0.5500 V (1.1 V). *"1.649 V"* is the band's bottom (the firmware's reading) to four
  figures, *"0.550 V"* the same reading to three; strictly, 1.649 is 0.19 mV below the band and 0.550 its open top. Both
  tolerances hold the whole band, the 2^N − 1 convention, and reject the common errors (§8), so nothing changes;
  assumption 1 states the band on the bench. (Our U018 brief page said *"Both PLAN answers sit in their bands"*: true of
  the tolerance windows, not of the two values; corrected here.)

No **accuracy** finding on this card: the statement, PLAN, Flow and the applied S30 recompute (§8).

**Decided 2026-10-20** (owner: *"apply all recommendations"* on the U018 brief): D1, D5 as above; F5 (S30's wording),
applied. (The proposals and options in this §14 are not yet decided.)

**Decided 2026-10-20, round two** (owner: *"apply all recommendations"* on the U018 page's *specs* section): F1 (a) the reveal on this card's own block, the references compared; F2 (a) applied to `en.md`: the [[ask]] now reads *"The code is 2047, from a 12-bit converter. What voltage is that with a 3.3 V reference? With a 1.1 V reference?"* (+5 words, ≈ +0.04 min; the card stays ≈ 2.3); every **Proposal** of F3 taken. S30's *"from this morning"* is now *"from earlier today"* (D1·090-F8).

## 15. Acceptance: how we know it is built right

- The Equation compiles with the fields of §3a with no error or warning; the derivation's last line is the statement; the
  rearrangement for V_ref compiles and verifies. E1 shows **1.649 V** and E2 **549.7 mV**, each on its own line at code
  2047; the codes print *2047* (X-count). The graph runs code 0–4095 with two straight labelled lines, to 3.299 V and
  1.100 V.
- The numeric fires before s0 and s0 answers it; both parts score as §8 (0.549 and 1.651 accepted, 6.597 and 0.4998
  rejected); the presenter's pane and pin changes reach the wall.
- B1 one pane or pin per beat; B5 each `say` in the notes; B6 the fraction and V_ref lit with their panes; B10 the
  explain; B11 N and the rearrangement in Study; B13 statement and values only, p3 over a held state; B16 values
  readable; B17 two references on one scale; B20 s0's and s1's words, the S30 line and the tip on the strip.
- C2 legible at 1920 × 1080 and 1024 × 768; C4 lines and dots labelled; C5 keys; C6 at 320; C8 the notes.
- E1–E6 on the built block: driven in both themes; the wall at 7:1; Scope at phone width; every pane at 1920 × 1080 and
  1024 × 768.
- **Six gates (this spec)**: (1) realism ≥ 95 %: the course's 12-bit converter, its 3.3 V reference and a real internal
  1.1 V one, the cold open's firmware line, nothing branded ✓; (2) science: the reading is the bottom of a truncated band,
  stated; the reference and configuration named as assumptions ✓; (3) maths: every number and both tolerances recomputed
  in Node, including the scorer's edge in doubles (§8) ✓; (4) visualization: one code on two lines, a third the height,
  both values on the wall ✓; (5) consistency: card 1's statement derived into this one, S30 against D1·010 and D1·070,
  the spoken question's missing resolution raised (F2), our brief's band sentence corrected (F4) ✓; (6) design: one
  slider labelled in words and symbol, the stacked dot labels named with their check (§5), EN and FR drafted ✓ on paper.
