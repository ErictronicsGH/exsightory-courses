```yaml
id: D1-020-08-meter-specification
card: "Reading a meter's specification"
module: notes/Day01/020-measurand-and-uncertainty/en.md
bench: Equation                   # exists; then Figure (exists) for the meter itself
library: "meter-band: an Equation (u = (p·V + n·q)/V, derived from U = p·V + n·q, two examples, the graph against V), defined in the card's `equation` block; plus `handheld-meter`: a Figure of our own meter design (its face and its specification table), no brand"
dimensions: 2D
stand_in: none                    # both benches exist; the Figure's photo needs a licence or the owner's own (§11)
optional_benches: [Figure]
real_thing: "a 3½-digit handheld multimeter of the common class: 1999 counts, DC 200 mV–600 V, ±(0.5 % + 3); our own unbranded design (owner, 2026-10-08)"
minutes: 1.7                      # on the bench: p2–p7 over the Equation (1.3) and the Figure tour (0.4)
card_minutes: 3.0
status: spec-ready                # decided 2026-10-08; the meter photo and the Figure card to make
learner_action: numeric
predictions: []                   # the PLAN's numeric is the prediction (it fires before the reveal)
seeds: [S36]                      # inside the Flow's p7
key_variable: "the reading V: the counts' share n·q/V grows as V falls"
time_scale: "none"
steps: 6                          # s0–s5 on the Equation; the Figure's tour after (§13 on where it goes)
```

The first Equation spec. The Equation Bench's format was read on 2026-10-08 (`equationBlock.ts`): a
statement, declared symbols, highlights, a derivation the presenter steps, examples, boundaries, a graph
with held sliders, and panes the presenter chooses on the wall (Symbols, Terms, Example, Graph, Proof),
all mirrored from main.

## 1. What the room must understand

- **Statement** (verbatim): *±(0.5 % of reading + 3 counts) is two errors added: one that scales with the
  reading, and one fixed at the last digit. Near the bottom of a range, the counts dominate.*
- **SHOW** (verbatim from the PLAN): *Equation — U = p·reading + n·count, with p = 0.5 %, n = 3 and one
  count = 1 mV, graphed as U/reading against the reading from 0.05 V to 1.999 V.*
- **Drive** (verbatim): *evaluate at 1.000 V (±8 mV, 0.8 %); slide to 0.100 V (±3.5 mV, 3.5 % of the
  reading).*
- **Look for** (verbatim): *the curve climbing toward the bottom of the range, where the counts take
  over.*
- **Status** (verbatim): *ready. Then Figure — a handheld DMM's front panel and its spec page, toured:
  needs asset (photo + spec-sheet page). Do not mix in the Electronics budget-DMM profile: it is ±(0.5 % +
  2 counts), a different meter.*
- **Bench and library.** The **benches** are the Equation Bench and the Figure Bench. The **libraries**
  are this card's equation (`meter-band`) and the meter's figure (`handheld-meter`, our own design).
- **Insight**: *a meter's band is a percentage of the reading plus a fixed number of counts, so the same
  meter is good to 0.8 % at full scale and only 3.5 % near the bottom of the range.*
- **Kind of knowledge**: *a relation between quantities* (the band against the reading). Card test →
  **Equation** (a formula taken apart and graphed). B17 applies (the two terms, side by side in the
  Terms pane). B15, B18, B19 do not.
- **Why this bench, not a still**: the two terms are taken apart one at a time, then the graph shows the
  whole range at once, which a single worked number cannot.
- **Key variable**: the reading V.

## 2. Time

The Flow is 211 words, all spoken (p2's *"[[demo]] Let's take the specification apart…"* is spoken):
**1.62 min**.

| Beat | Minutes | Source |
|---|---|---|
| Flow p0 *"[[ask]] A 3½-digit meter…"* (30) | 0.23 | 30 ÷ 130 |
| numeric answer window and the spread of answers | 1.00 | estimate: a typed number |
| s0–s2: p2 (15), p3 (14), p4 (35) | 0.49 | 64 ÷ 130 |
| s3: p5 *"[[reveal]] Add them…"* (22) | 0.17 | 22 ÷ 130 |
| s4: p6 *"Now slide the reading down…"* (56) | 0.43 | 56 ÷ 130 |
| s5 held: p7 *"Remember this meter…"* (39, S36 inside it) | 0.30 | 39 ÷ 130 |
| The Figure: the meter's front and its specification row toured (unscripted, ≈ 50 words) | 0.38 | estimate |
| **Card total / of which on the bench** | **3.0 / 1.7** | |

**Module check**: `D1-020-03-direct-indirect-null.md` §2.

## 3. The scene: what is on the bench

### 3a. The equation (`meter-band`)

| Field | Content | Source |
|---|---|---|
| `statement` | `u = (p * V + n * q) / V` | the PLAN's U/reading |
| `symbols` | `u` *Band, as a fraction of the reading* (no unit); `p` *Percentage of reading* (0.005); `V` *Reading* (V); `n` *Counts* (3); `q` *One count* (V; 1 mV on the 2 V range) | the PLAN; the meter (§3b) |
| `highlights` | term `p` — *scales with the reading* (teal); term `n * q / V` — *fixed in counts: grows as the reading falls* (amber) | the statement's two halves |
| `derivation` | 1 `U = p * V + n * q` — *the specification as written: ±(0.5 % of reading + 3 counts)*; 2 `u = U / V` — *as a fraction of the reading*; 3 the statement | the PLAN |
| `examples` | *1.000 V on the 2 V range*: V 1.000, p 0.005, n 3, q 0.001 → u 0.008, note *U = 8 mV: the band is 0.992–1.008 V*; *0.100 V on the 2 V range*: V 0.100 → u 0.035, note *U = 3.5 mV*; *0.100 V on a 200 mV range* (decided, F2): V 0.100, q 0.0001 → u 0.008, note *U = 0.8 mV: why you choose the lowest range that holds the reading (this meter has none below 2 V)* | §8 |
| `boundaries` | `V > 1.999`, *over range: the meter moves to its 20 V range* (invalid) | the meter's 1999 counts |
| `graph` | against `V`, domain [0.05, 1.999]; `hold` p (0.001–0.02, default 0.005), n (0–10, default 3); `markExamples: true` | the PLAN |
| `assumptions` | *the meter is within its calibration period and temperature range* (the spec's own conditions), breaksWhen *outside 18–28 °C or past its calibration date* — limiting | how meter specs are stated (F3) |

### 3b. The meter (`handheld-meter`, a Figure of our own design)

Our own realistic handheld, drawn to the class's look (owner, 2026-10-08: real, but no brand): a
1999-count LCD (*1.000*, unit *V*), a rotary range switch with **200 mV · 2 V · 20 V · 200 V · 600 V** on DC
volts (plus the usual Ω, A and AC positions), COM and VΩ jacks, a rubber holster. No logo, maker or model
name anywhere; the face carries only function and range markings. Its specification table is our own
layout: *DC voltage · 200 mV / 2 V / 20 V / 200 V / 600 V · ±(0.5 % of reading + 3 counts)*.

| Feature id | What | Geometry |
|---|---|---|
| `display` | the display reading *1.000* | rect on the display |
| `range` | the range switch at *2 V* (and the *200 mV* position beside it) | rect |
| `spec-row` | the specification table's row *DC voltage · 200 mV … 600 V · ±(0.5 % + 3)* | rect on the table |
| `counts` | *1999 counts* on the panel or in the table | rect |

Tour: `display` (*1.000 V: four digits, the last is one count, 1 mV*) → `range` (*the 2 V range: 1999
counts*) → `spec-row` (*±(0.5 % + 3): the band you just computed*). `labels: numbers`, `spotlight: dim`.

**Values beside their element**: the Equation's panes show symbols with values and units; the Example
pane shows u and its note; the graph's readout gives V and u.

**Colours and their second channel** (C4): the two highlighted terms teal and amber, each with its label
in the Terms pane; the graph's curve in the Equation's first colour, its examples marked with dots and
labels.

## 4. The run: step by step, as the Flow goes

### 4a. Steps (the Equation; the presenter chooses panes and steps)

| # | id | Flow paragraph | What changes (`say`) | Pane | Presenter's control |
|---|---|---|---|---|---|
| 0 | `s0-two-errors` | p2 *"[[demo]] Let's take the specification apart…"* | The specification as written: a part that scales with the reading, and a part in counts. | Proof, step 1 | pane, step |
| 1 | `s1-percent` | p3 *"The first scales with the reading…"* | 0.5 % of 1.000 V is 5 mV. | Terms, `p` pinned | pin |
| 2 | `s2-counts` | p4 *"The second is fixed…"* | One count is 1 mV on the 2 V range; three counts are 3 mV. | Terms, `n * q / V` pinned | pin |
| 3 | `s3-at-1V` | p5 *"[[reveal]] Add them…"* | At 1.000 V the band is ±8 mV: 0.8 % of the reading. | Example 1 | example |
| 4 | `s4-at-100mV` | p6 *"Now slide the reading down…"* | At 0.100 V the counts still give 3 mV: ±3.5 mV, 3.5 % of the reading. The curve climbs at the bottom of the range. | Graph, both examples marked | pane |
| 5 | `s5-this-meter` | p7 *"Remember this meter…"* | This is the meter you will check your microcontroller against. | Graph held; then the Figure (§13) | — |

### 4b. Motion, cues and stills

| # | Motion | Movers | Cue | Hold | Reduced motion | Still |
|---|---|---|---|---|---|---|
| 0–5 | none (pane changes) | 0 | the pinned term's highlight; the example's dot on the graph | hold | same | one per step |

## 5. Pacing and interaction, by surface and view

**Who paces**: the presenter (the Equation is `drivable`: pane, pinned term, derivation step, example are
mirrored from main). Study and Scope: the learner.

| View | Who | Controls |
|---|---|---|
| Preview (in the slide) | everyone | the statement and the current pane |
| View (details) | everyone | every pane; the graph's held sliders p and n; the readout |
| Edit (session only) | everyone | not specified for the Equation Bench (its sliders already vary the values) |
| Authoring | authors | the `equation` block's YAML |

- **The presenter's strip** (B20): the Equation's controls (pane, *step n / N*, pins); the next step's
  `say` in the notes; the teacher tip.
- **Study / Scope**: p and n free on the graph (§7e).
- **Phone**: the statement, then the pane, then the controls; the graph full width.
- **Locked**: the Example and Graph panes until the numeric closes (the presenter simply does not open
  them; the Equation has no lock).

## 6. The frame

The Equation's frame (the Canvas header and footer; panes as pills, D4.17). Title *Two errors added*.

## 7. Thinking, not watching

- **7a. The PLAN's ASK** (verbatim): *numeric (before the reveal) — "A 3½-digit meter on its 2 V range reads
  1.000 V. Its specification is ±(0.5 % of reading + 3 counts). How far either side of the reading does
  the band reach, in mV?" answer: 8 mV ± 0.5 mV (the band is 0.992 V to 1.008 V) · reveal: the Equation
  below, evaluated at 1.000 V, then dragged down the range. · explain: 0.5 % of 1.000 V is 5 mV; one count
  on a 1999-count 2 V range is 1 mV, so three counts add 3 mV. · depth: use · practice: computational
  thinking.* It fires at p0, **before s0**; **s3 reveals it**.
- **7b.** The numeric is the prediction.
- **7c. After**: the explain. Study done = the numeric answered and the graph opened.
- **7d. Teacher tip** — **Proposal** (F4): *Expect "5 mV" (the percentage alone). Ask: what does the last
  digit cost?*
- **7e. Explore**: p and n on the graph in Study: a 6½-digit bench meter's ±(0.0035 % + 5 counts) on a
  1 µV count (InsightDemo `dmm-bench`) gives u = 0.004 % at 1 V.

## 8. Faithfulness (the quality bar)

**Arithmetic.**
- 1.000 V: U = 0.005 × 1.000 + 3 × 0.001 = 0.008 V = **±8 mV**; u = **0.8 %**; band 0.992–1.008 V.
- 0.100 V: U = 0.0005 + 0.003 = **3.5 mV**; u = **3.5 %**.
- The graph's ends: 0.05 V → 3.25 mV, **6.5 %**; 1.999 V → 13.0 mV, **0.65 %**.
- The meter is our own design (unbranded); its specification is the real class's. **Source of the class
  value** (cited here only, never on a teaching surface): a 1999-count pocket meter specified at *DC voltage
  2V/20V/200V/600V ±(0.5%+3)* (RS PRO datasheet, document VA2X-VA26A000000RS, 2025-03). One count on the 2 V
  range = 1 mV. Our design adds the **200 mV range** that manual-range 3½-digit meters commonly have.
- On the 200 mV range (one count 0.1 mV), 0.100 V reads ±(0.5 + 0.3) = **±0.8 mV, 0.8 %**: the third example.

**Section D, Equation rows**
- [x] Symbols match the course: V for the reading; the PLAN's p, n and "count" (q here, F1).
- [x] Every example recomputed above, to the figures shown.
- [x] Slider ranges real: p 0.1–2 %, n 0–10 (handhelds' specs fall inside).
- [x] The graph obeys the Plot rows: u = p + n·q/V is a hyperbola, smooth on [0.05, 1.999].

**Section D, Figure rows**
- [x] Our own drawing, so no licence is needed; the class's values are cited in §8 (owner, 2026-10-08:
  realistic, unbranded designs count as real).
- [x] Named parts on the right features (§3b).
- [x] Nothing on the figure names a maker or model.

**A1–A8**: A1 ✓ (the class's values, cited in the spec); A2 ✓ (the band is the non-ideal); A3 ✓ (drawn to the
class's look: display, switch, jacks, holster); A4 ✓ (1999 counts, 1 mV, ±(0.5 % + 3)); A5 n/a; A6 ✓; A7 ✓ (the budget-DMM profile kept apart, as
the PLAN says; card 6's 1.004 V is inside this band); A8 ✓.

## 9. Faults and non-ideal behaviour

**PLAN FAULT**: none. **Proposal**: in Study, the 20 V range for the same 1.000 V reading (one count 10 mV:
U = 5 + 30 = 35 mV, 3.5 %): what autoranging protects you from.

## 10. Accessibility, legibility and print

- Wall (C2): the statement and pane text at the Canvas's wall size; the graph's labels; check at 1920 ×
  1080 and 1024 × 768.
- Reduced motion: nothing animates.
- Colour (C4): terms labelled as well as coloured.
- Keyboard (C5): the Equation's pane and step keys.
- Print (C8): the Equation's notes (`notes: include`) and the Figure's picture with its key.

## 11. Assets to make or source

| Asset | Format | Made by | Status |
|---|---|---|---|
| The `equation` block (§3a) | YAML in `en.md` | the author | to write |
| The meter's face, our own design | SVG (rendered for the owner first, a visual milestone) | the author | to make |
| The specification table, our own layout | SVG | the author | to make |
| The `figure` block (§3b) | YAML in `en.md` | the author | to write |

## 12. Bench capabilities this needs

**Equation Bench**: statement, symbols, highlights, derivation, examples, boundaries, graph with held
sliders and marked examples, presenter panes: **all exist**. **Figure Bench**: features, tour, spotlight:
**exist**. **To confirm**: two Canvas blocks (Equation, then Figure) on one card (F6).

## 13. Stand-in for the lecture

None needed. Where the Figure goes depends on F6.

## 14. Findings for the owner

**Owner, 2026-10-08: "go with your recommendations".** Decided: F2 (the third example, §3a, now on the meter's
own 200 mV range); F5 replaced by the owner's later word: **our own realistic meter, no brand** (no purchase,
no photo, no licence); F6 (b) (the Figure on a card of its own straight after, toured with no new
Flow; the card is still to write). All three are noted in the PLAN. Still open: F1 (symbol letters), F3, F4
(proposals).

- **F1 — "one count" as a symbol.** The PLAN writes *U = p·reading + n·count*; the Equation needs one-letter
  symbols, so *reading* is `V` and *one count* is `q`. Keep, or other letters?
- **F2 — The real meter has no 200 mV range.** *(Superseded 2026-10-08: our own meter has one.)* RS PRO 296568's lowest DC range is 2 V, so the Flow's *"choose
  the lowest range that still holds the reading"* cannot be shown on it. Options: (a) keep this meter and add
  a third example *0.100 V on a 200 mV range: ±0.8 mV, 0.8 %* as a proposal in the Equation, no Flow change
  (**recommended**); (b) choose a manual-range meter with a 200 mV range and the same ±(0.5 % + 3); (c) leave
  it.
- **F3 — Proposal: the assumption** (*within its calibration period and temperature range*): every real spec
  carries those conditions.
- **F4 — Proposal: the teacher tip** (§7d).
- **F5 — The photo.** *(Superseded 2026-10-08: our own unbranded design, no photo.)* RS's product images are RS's. Options: (a) buy an RS PRO 296568 (RS stock 296568) and
  photograph it (**recommended**: the photo, the table and the Equation then describe one real meter); (b) RS's
  image with permission; (c) a redrawn front panel labelled *redrawn*.
- **F6 — Two blocks on one card.** The PLAN puts the Equation and then the Figure on this card; a card holds
  one Canvas block. Options: (a) the Figure on its own card straight after, toured over p7's last sentences
  moved there (a Flow move: the owner's); (b) the Figure on its own card with an unscripted tour, p7 unchanged
  (**recommended**: +0.4 min, already counted, no text moved); (c) the Figure only in Study.

## 15. Acceptance: how we know it is built right

- The Equation compiles with the symbols of §3a; Example 1 shows u = 0.008 (U = 8 mV), Example 2 u = 0.035
  (U = 3.5 mV); the graph runs 0.05–1.999 V with the two examples marked, u = 0.065 at 0.05 V.
- B1 one pane or term per step; B5 each `say` in the notes; B6 the pinned term lit; B9 the Example waits for
  the numeric; B13 the statement and terms only; B16 values readable; B17 the two terms side by side.
- C2 legible at 1920 × 1080 and 1024 × 768; C4 terms labelled; C5 pane keys; C6 at 320; C8 the notes.
- The Figure's features land on the meter's display, range and the table row.
