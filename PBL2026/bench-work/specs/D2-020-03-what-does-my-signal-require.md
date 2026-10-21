```yaml
id: D2-020-03-what-does-my-signal-require
card: "Not \"which has the most bits?\""
module: notes/Day02/020-external-adcs/en.md
bench: Plot                       # card 1's plot again (the PLAN's SHOW, Status: ready); no new library, no new drawing
library: "bridge-on-two-staircases (card 1's, `D2-020-01-integrated-not-enough.md` §3): showing D, a verbatim copy of card 1's showing B — the 0–5 mV input dashed, the MCU's 12-bit 3.3 V staircase (0.806 mV steps, codes 0–6, teal) and the ADS1115's on ±0.256 V (7.8125 µV steps, 640 across 5 mV, amber); defined in this card's own `plot` block"
dimensions: 2D
stand_in: "none for the block (card 1's fields); the flash takes the wall when it opens (widget-focus), so the plot is on the statement slide for p1–p2 and the flash follows (F-c3-1 (a)); a flash that keeps the Canvas is X22, with the owner (F-c3-1 (b)); on the target (X-inset, X10) the copy is card 1's one block at its last state, the magnifier inset included (F-c3-2)"
optional_benches: []
real_thing: "card 1's: a strain-gauge bridge's few millivolts on the course's MCU converter and on a TI ADS1115 at ±0.256 V (SBAS444E Table 7-1); ideal quantizers, step size only"
minutes: 0.2                      # on the bench: the statement slide, p1–p2 (§2)
card_minutes: 1.2                 # the whole card, the flash included (§2)
status: spec-draft
learner_action: flash
predictions: []                   # the flash is the PLAN's; the plot is the evidence it is asked over
seeds: []
key_variable: "none moves: card 1's two staircases held, so the step each converter gives the same 5 mV is on the wall as the question is put"
time_scale: "none (no motion: one held plot state)"
steps: 1                          # s0
```

**Written 2026-10-21 (U020)** after the owner's choices on the U020 brief (*"Apply all recommendations"*, 2026-10-21):
**D2·020-F2** (applied: card 1's staircases are the course's truncating q·⌊x/q⌋; *"card 3 reuses it"*), **D1** (the four
parts named in this module) and **D3** (a spec for every card). The brief page's card 3 is the approved model: *"Card 1's plot
comes back on the Canvas at its last view, with both staircases and the magnifier, while the flash quiz runs. Nothing new is
drawn; the two staircases are the evidence for the answer."* Two things the bench cannot do today are named here, each with
its stand-in (§12, §13): an activity never shares the wall, and card 1's magnifier is a separate showing until X-inset.
Everything beyond the PLAN is marked **Proposal** and listed in §14 (round two, open).

**The formats** (read in source 2026-10-21, `C:\ExSightory\src\insight\packages\insight-core\src\registry\`, as card 1's
spec and `D2-010-10-logical-and-electrical.md`): a plot is shown at its **authored defaults** (`livePush: false`); the Canvas
is sticky **within a card** only (`cards.ts`), and card 2's Figure sits between, so card 1's plot cannot be recalled: the block
is written again here. `flash-quiz` is `stage: 'solo'`, **`layout: 'widget-focus'`**, `livePush: true`
(`blockRegistry.ts`): when it opens it takes the whole wall (*"a flash quiz is `widget-focus` and never shares a stage"*,
the same file's note on `measure-quiz`). A Flow fence attaches to the block before it (`flow.ts`). Identical blocks get
distinct ids by occurrence (`compiler/blockId.ts`).

## 1. What the room must understand

- **Statement** (verbatim): *The question is not "Which ADC has the most bits?" but "What does my signal require?"*
- **The PLAN's SHOW and Status** (verbatim): *Plot — the two staircases from the first card, back on the Canvas.* ·
  *Status: ready*. **Drive** and **Look for**: none in the PLAN.
- **ASK** (verbatim): §7a.
- **Bench and library.** The **bench** is the Plot Bench; the **library** is card 1's `bridge-on-two-staircases`, in a
  fourth showing (D) identical to card 1's B (the brief: *"Nothing new is drawn"*).
- **Insight**: *the signal sets the requirement: a slow few-millivolt difference needs fine steps and a differential input,
  not speed, and that picks the slowest of the three parts.*
- **Kind of knowledge**: *a picture recalled* beside a question. No card test applies; the Plot is the evidence, not a new
  relation. B2, B4 and B16 apply; B15, B17–B19 do not (B17 was card 1's).
- **Why this bench, not a still**: the plot is the one the room has just seen, and in Study still live (the readout; card 1's
  range slider if F-c1-4 is taken). A still would serve the wall equally; the block keeps Study live and needs no new asset.
- **Key variable**: none moves on the wall.

## 2. Time

The card's Flow is **45 words** (`en.md`, 2026-10-21, counted as the brief counts): p1 *"So we should not simply ask…"* 12,
p2 *"Instead, we should ask…"* 9, p3 *"[[ask]] Your signal changes slowly…"* 24 (the flash's question, counted in the
activity), p4 `[[pause]]` 0. **21 words are spoken outside the activity = 0.16 min.**

| Beat | Minutes | Source of the number |
|---|---|---|
| s0 the statement slide opens with the plot (showing D), fence 1: p1 (12), p2 (9) | 0.16 | 21 ÷ 130 |
| The PLAN's flash, fence 2: p3 the question (24), three options, the answer window, the tally (p4 `[[pause]]`), the explain read | ≈ 1.0 | the brief's figure for a flash |
| **Card total / of which on the bench** | **1.2 / 0.2** | 1.16 / 0.16 |

**Module check**: card 1's spec §2 (D2·020 ≈ 29–30 of 30 min by the U020 brief's estimate; Flow 2,045 words = 15.7 min).
This card is inside that estimate. Reported only.

## 3. The scene: what is on the bench

**The block**: card 1's showing B, copied field for field (`D2-020-01-integrated-not-enough.md` §3a, §3b): title *When the
integrated converter is not enough*, the caption, `variable: x` (mV), `domain` and `range` [0, 5], the curves `input` (azure,
dashed), `mcu` (teal) and `ads` (amber) with their labels, `readout` on, `fixedView` true, `aspect: fill`, and card 1's range
slider if F-c1-4 (a) is taken (default ±0.256 V). **The copy is kept identical to card 1's B** (F-c3-3): an authoring note
beside each, in `en.md` just before this card's `plot` block: `<!-- AUTHORING: this plot is a verbatim copy of card 1's
showing B ("When the integrated converter is not enough"); edit both together until Plot presets (X12) or X10 let one block
serve both. Specs: D2-020-01 §3, D2-020-03 §3. -->`, and its counterpart beside card 1's B. Both are HTML comments outside
the blocks, so the blocks stay identical.

**The state it returns to** (the wall shows the defaults): seven teal treads, risers at 0.806, 1.611, 2.417, 3.223, 4.028,
4.834 mV; the amber ADS1115 staircase lying on the dashed input, 640 steps of 7.8125 µV, too fine to see at this scale.

- **Meet the parts**: none new (card 1's legend).
- **Values beside their element** (B14, B16): the step sizes in the legend; the axes in mV; the readout in Study.
- **Colours and their second channel** (C4): as card 1 (hue, dash, legend words).

## 4. The run: step by step, as the Flow goes

### 4a. Steps

The order in `en.md` (F-c3-1 (a)): the statement, showing D, **fence 1** (p1–p2), the flash, **fence 2** (p3–p4).

| # | id | Flow fence and paragraph (first words) | What changes (`say`) | Block, setting | Presenter's control |
|---|---|---|---|---|---|
| 0 | `s0-what-it-requires` | **fence 1**: p1 *"So we should not simply ask…"*, p2 *"Instead, we should ask…"* | Card 1's evidence again: the same 5 mV, about six steps against 640. | showing D (card 1's B) | (the card opens) |
| — | the PLAN's flash | **fence 2**: p3 *"[[ask]] Your signal changes slowly…"*, p4 `[[pause]]` | (§7a) | the flash (widget-focus) | the activity, then Next |

Suggested words for the strip (B20): s0 *"Same signal, same two staircases. Now: what does this signal need?"*

### 4b. Motion, cues and stills

| # | Motion | Movers | Cue and its second channel | Hold | Reduced motion (C3) | Still |
|---|---|---|---|---|---|---|
| 0 | none (the slide appears) | 0 | the two staircases, named in the legend | hold | same | s0 (= card 1's s1) |

## 5. Pacing and interaction, by surface and view

**Who paces** (B12): the presenter on the wall (the plot at its defaults; the flash pushed to devices). In Study Mode and
Scope, the learner.

| View | Who | Controls |
|---|---|---|
| Preview (in the slide) | everyone | the plot |
| View (details) | everyone | the hover readout; card 1's range slider if F-c1-4 (a) |
| Edit (session only) | everyone | not specified for the Plot Bench |
| Authoring | authors | the `plot` block's YAML (a copy of card 1's B) |

- **The presenter's strip** (B20): the step's `say`, the suggested words, the teacher tip (§7d); keys Next / Back.
- **Study / Scope**: the readout; card 1's explore (§7e there) if F-c1-4 (a).
- **Phone** (C6): as card 1.
- **Locked**: nothing on the plot; the flash's answer is the activity's.

## 6. The frame

| Tile / panel | Used? | Selected item | List / contents |
|---|---|---|---|
| Legend | yes | — | card 1's three entries |
| Readout | yes (hover, Study) | x and each curve | — |
| Slider | if F-c1-4 (a) | the range index with its words | one |

## 7. Thinking, not watching

- **7a. The PLAN's ASK** (verbatim): *flash (after the statement) — "A slow signal, a few millivolts across a sensor bridge.
  Which of the three would you reach for?" · options: ATmega328P | Classic ESP32 | ADS1115 · answer: ADS1115 · explain: Its
  differential inputs read the bridge directly and its ±0.256 V range gives 7.8 µV steps, about 640 codes across 5 mV where
  a 12-bit 3.3 V SAR gives about six, and a slow bridge does not need more than 860 samples per second. · depth: understand ·
  practice: arguing from evidence.* It fires at p3 (fence 2), **after s0**; when it opens it takes the wall (F-c3-1). The
  plot is the evidence the explain cites (7.8 µV, 640, about six).
- **7b. Prediction points**: none (the flash is the commitment).
- **7c. After**: the explain, read with the tally. In Study, done means the flash answered.
- **7d. Teacher tip** (**Proposal**, F-c3-3), presenter only: *Expect "the ESP32: most bits of the two fast ones, and it is
  already on the board". Ask what the signal needs: a difference of a few millivolts read directly (the ADS1115's
  AIN0–AIN1 pair; the ATmega328P has no differential channels), steps much finer than a millivolt, and only a few readings
  a second. The ADS1115 is the slowest of the three and the only one that fits; card 2's ranking by speed was not the
  question.*
- **7e. Explore**: in Study, card 1's (if F-c1-4 (a)); none added.

## 8. Faithfulness (the quality bar)

**Arithmetic** (Node, 2026-10-21; card 1's §8 holds the full set): 3.3 V / 4096 = 0.8057 mV, 5 / 0.8057 = **6.21**, codes
0–6 (*"about six"* ✓); 0.256 V / 32768 = **7.8125 µV** (*"7.8 µV"* ✓), 5 mV / 7.8125 µV = **640** (*"about 640 codes"* ✓).

**The explain** (A4–A6): *"Its differential inputs read the bridge directly"* ✓ (AIN0–AIN1, VIN = V(AINP) − V(AINN),
SBAS444E §5.3, Table 7-3; the bridge's common mode inside GND to VDD: card 1's §8 A5); *"a 12-bit 3.3 V SAR gives about six"*
✓ — it names the course's converter, card 1's teal staircase, not the classic ESP32 at a particular attenuation, and the
answer does not change with the ESP32's range; *"a slow bridge does not need more than 860 samples per second"* ✓ (the
ADS1115's highest data rate, §5.5; the question's *"changes slowly"*). The options are the three parts of card 2; *"ADS1115"*
is the part with differential input pairs and a range down to ±0.256 V (card 2's table; SBAS444E §7.3.3, MUX[2:0]); this spec
states nothing about the ESP32's inputs (card 2's spec sources that cell, N1). The question's *"a few millivolts across a
sensor bridge"* matches card 1's 0–5 mV (A4 ✓).

**Section D, Plot rows**: as card 1's B (`D2-020-01` §8), the copy identical; the 640-step envelope exception labelled as
there.

**A1–A8** (on the owner's current text and this spec): A1 ✓ (above); A2 ✓ (card 1's model and caption, carried); A3 ✓
(card 1's edges: 0 V, 5.000 mV = code 640); A4 ✓ (the copy is card 1's B; the explain's numbers are card 1's; card 2's three
parts); A5 ✓ (the differential read and its common mode); A6 ✓ (*"about"* twice; *"does not need more than"* bounds the
need, not the part); A7 ✓ (SBAS444E §5.3, §5.5, Table 7-1, Table 7-3; the course's model); A8 ✓. **No accuracy finding on
this card.**

## 9. Faults and non-ideal behaviour

*None in the PLAN.* Card 1's non-ideal behaviour (noise, offset, the single-ended limit) is stated in the copy's caption and
applies unchanged.

## 10. Accessibility, legibility and print

As card 1's §10 (the same block). Print (C8): the still s0 with its `say`, then the flash's question, options and explain.

## 11. Assets to make or source

| Asset | Format | Made by | Status |
|---|---|---|---|
| The `plot` block, a copy of card 1's showing B (§3), EN and FR, with the authoring note beside it | YAML in `en.md` | the author | to write with card 1's blocks |
| The flash block (the PLAN's ASK) | YAML in `en.md` | the author | to write |

## 12. Bench capabilities this needs

**Plot Bench, exists**: everything card 1's showing B uses (`D2-020-01` §12).

**To confirm when written**: (a) that the copy compiles as a further occurrence (distinct id), opens on the statement slide
(the first lead block after the statement) and takes fence 1; (b) that fence 2, after the `flash` block, is that activity
slide's teleprompter (`flow.ts` reads so, as D2·010 card 10's checkpoint).

**Missing: Studio's, with the owner** (not a crossing: `pbl2026` talks to Benches only): **X22**, *an activity that keeps the
card's Canvas* (`bench-work/requests-to-exsight.md`, raised for D2·010 card 10's checkpoint, *"to the owner, to route"*).
This card is a second case, for a **flash**: the plot beside the question while the room answers, which is what the brief's
*"while the flash quiz runs"* needs. The line to add to X22's row is the lead's.

**On the target** (card 1's X-inset and X10, F-c1-3): one block for card 1 at its last state, staircases and inset together;
this card's copy is then that state, the brief's *"at its last view, with both staircases and the magnifier"*.

**Not this card's**: anything new on the Plot Bench (no new library).

## 13. Stand-in for the lecture

None needed for the block. The plot is on the statement slide while fence 1 (p1–p2) is spoken, then the flash takes the wall
with fence 2 (F-c3-1 (a)). What it loses against the brief: the plot **during** the flash (X22), and the magnifier on the
same picture (card 1's X-inset; until then card 1's magnifier is its own showing C, and this copy is B, the two staircases the
PLAN names: F-c3-2 (a)).

## 14. Findings for the owner

No **accuracy** finding on this card (§8). The items below are **Proposals**, new in this spec and **open (round two)**.

- **F-c3-1 — The flash takes the wall.** A flash is `widget-focus` and never shares the stage, so the brief's *"while the
  flash quiz runs"* cannot happen on the wall today; and the card's one Flow fence would be the flash's teleprompter, leaving
  the plot's slide without one. Options: (a) split the fence, **no word changed**: p1–p2 after the plot (the statement
  slide), p3–p4 after the flash (**recommended** for the day, as D2·010 card 10's G1 (a) and G2 (a)); (b) as (a), and add
  this card to X22 with the owner, so the flash keeps the Canvas when Studio offers it (**recommended alongside (a)**);
  (c) leave one fence (the plot slide is then silent and p1–p2 are spoken over the flash).
- **F-c3-2 — Which of card 1's showings returns, until X-inset.** The brief says *"at its last view"*; in the stand-in card
  1's last showing is C, the magnifier alone (0–60 µV), which shows the fine steps but not *"about six against 640"*.
  Options: (a) a copy of B, *"the two staircases"* the PLAN names (**recommended**: it carries the explain's 640 and six);
  (b) a copy of C (the literal last view); (c) both, B then C on two slides before the flash (+≈ 0.1 min). On the target
  the question goes away: card 1 is one block and this copy is its last state, the inset included.
- **F-c3-3 — The copy's upkeep and the teacher tip**: an authoring note beside each copy (§3) and the tip (§7d). Options:
  (a) both (**recommended**: two identical blocks drift when one is edited, as D2·010's G4); (b) the notes only; (c) neither.
- **Time** (reported only): the card **1.2 min** (0.2 on the bench).

## 15. Acceptance: how we know it is built right

- The block compiles as a copy of card 1's B (a distinct id, no warning) and opens on the wall at its defaults: at the hover
  x = 4.000 mV `mcu` 3.223, `ads` 4.000, `input` 4.000; seven teal treads; whatever was last done to card 1's plot in any
  window.
- A diff of the two blocks is empty; an authoring note stands beside each (F-c3-3 (a)).
- The plot opens on the statement slide with fence 1 (p1–p2); the flash opens after it with fence 2 (p3–p4) as its
  teleprompter, the three options in the PLAN's order and the explain after the tally (F-c3-1 (a)).
- B2 nothing changes on the wall; B4 the state is card 1's s1; B10 the explain, no verdict on the plot; B14 every curve
  labelled; B16 the readout; B20 the strip's words and tip.
- C2–C8 as card 1's; E1–E6 for the block and the flash as presented, in both themes, EN and FR.
- **Six gates (this spec, 2026-10-21)**: (1) realism: card 1's converters at their real steps (the course's model, SBAS444E
  Table 7-1) — pass. (2) science: card 1's stated model; the explain's differential read and data-rate bound checked against
  SBAS444E — pass. (3) maths: 0.8057 mV, 6.21, 7.8125 µV, 640 and the hover values recomputed in Node — pass. (4)
  visualization: the evidence the explain cites is the picture on the wall as the question is put; the plot beside the
  answer waits for X22 and the inset for X-inset, both named — pass, partial on the day as §13 says. (5) consistency: a
  verbatim copy of card 1's B with an authoring note beside each; the palette, numbers and options as cards 1 and 2 — pass.
  (6) design: card 1's — pass on paper, to check on the built block.
