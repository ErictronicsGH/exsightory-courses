```yaml
id: D1-010-07-number-not-earned
card: "A number that appears is not a number you have earned"
module: notes/Day01/010-mcu-reads-2047/en.md
bench: Draw                       # the target, and it exists (M59)
library: "course-path (`D1-010-05-measurement-path.md` §3a), played here as its variant `course-path-010-blank.benchdrawing`: layers `stage-blanks`, `forms` (thin), and `stages` for the optional s1"
dimensions: 2D
stand_in: none                    # the drawing plays today; the room's marks are live ink (M07-c), which exists
optional_benches: []
real_thing: "the course path of card 5, every stage left blank; not to scale"
minutes: 4.0                      # on the bench: the drawing is up for the whole card, the checkpoint included
card_minutes: 4.0
status: spec-draft
learner_action: checkpoint
predictions: []
seeds: [S4, S30]                  # S4 said with the statement; S30 after the checkpoint
key_variable: "the stage each learner suspects: where did the 8 % come from?"
time_scale: "none (no motion)"
steps: 2                          # s0, and s1 (optional proposal)
```

Reuses the course path library (`D1-010-05-measurement-path.md` §3a). The PLAN's *"waiting for the
room's marks"* is met with live ink over the drawing (M07-c, done), not with drawn steps, because nobody
knows the room's marks in advance (`draw-bench-status.md` §3C).

## 1. What the room must understand

- **Statement** (verbatim): *Every stage of the path can add error, and almost none of them announce it.
  This course locates each one, quantifies it, and fixes it.*
- **SHOW** (verbatim from the PLAN): *Draw — the whole path drawing, every stage blank, waiting for the
  room's marks.*
- **Status** (verbatim): *needs Draw (the path drawing).*
- **Drive / Look for**: *none in the PLAN.* This spec proposes them (§4, F3).
- **Bench and library.** The **bench** is the Draw Bench (with the presenter's ink over the Canvas). The
  **library** is the course path drawing, loaded as the variant `course-path-010-blank`.
- **Insight**: *I can name the stages a reading passes through, and I have a suspect for where the cold
  open's 8 % came from, which the day will test.*
- **Kind of knowledge**: *a picture built up*, by the learner (the stages written in). Card test →
  **Draw**. B17, B18, B19 do not apply.
- **Why this bench, not a still**: the drawing is the frame for the room's own marks: the presenter inks
  the suspects the room names onto the stages, live. The drawing itself is still.
- **Key variable**: the suspected stage.

## 2. Time

The Flow is 163 words, all spoken: **1.25 min**. The PLAN fires the checkpoint *after the statement*;
the Flow has no `[[ask]]` cue for it, so this spec places it (F3).

| Beat | Minutes | Source of the number |
|---|---|---|
| s0 appears with the statement; SEED S4 said slowly, once (10 words, at about half pace) | 0.15 | estimate, 10 ÷ 65 |
| The checkpoint *"Your suspect list"*, four parts, on Scope | 2.00 | estimate: six stages written, one mark, one sentence; the PLAN gives no timer |
| The room's suspects inked on the stages (the presenter reads three or four answers, ≈ 60 words) | 0.50 | estimate |
| SEED S30 (17 words) | 0.13 | 17 ÷ 130 |
| Flow p0 *"The objectives of this training…"* (7), p1 the seven objectives (100), p2 *"We are no longer just asking…"* (21) | 0.98 | 128 ÷ 130 |
| Flow p3 *"[[transition]] So we walk the path…"* (35) | 0.27 | 35 ÷ 130 |
| **Card total / of which on the bench** | **4.0 / 4.0** | + 0.25 with s1 (the stage names written in, ≈ 30 words) |

**Module check**: D1·010 overruns by ≈ 5.7 min (`D1-010-01-confidently-wrong.md` §2); this card's
checkpoint is the largest single activity in the module (2.0 min, an estimate).

## 3. The scene: what is on the bench

**Parts** (the master's layers; ids stable):

| id | Item | Drawn as | Source |
|---|---|---|---|
| `sb-quantity` … `sb-number` | The six stage boxes, **blank** | `outline`, no text | PLAN (*every stage blank*); the module's PATH: QUANTITY → SENSOR → CONDITIONING → ADC → FIRMWARE → NUMBER |
| `f-*`, `a1`–`a6` | The forms lane from card 5, under the stages | `thin` ink (lighter than the blanks), labels as card 5 | card 5's chain |
| `t-2047` **Proposal** (F4) | *2047*, tagged on ADC code: the reading under suspicion | mono, `amber` | card 1 |
| `s-*` (s1, optional) | The six stage names written into the boxes | `label` | PATH |

**Meet the parts** (B3): the room met these stages on card 4 and the forms on card 5; the blanks are
meant to be filled, so there is nothing to introduce.

**Values beside their element**: *2047* on ADC code (if F4); nothing else.

**Labels**: none on the blanks (that is the task).

**Colours and their second channel** (C4):

| Thing | Ink | Second channel |
|---|---|---|
| Blank stages | `contrast` | `outline` weight |
| Forms lane | `contrast` | `thin` line type (lighter) |
| *2047* (proposal) | `amber` | mono digits and its position on ADC code |
| The presenter's ink | the ink tool's colour | it is hand-drawn on the stage the room named; the stage's position carries it |

## 4. The run: step by step, as the Flow goes

### 4a. Steps

| # | id | Flow paragraph (first words) | What changes: the step's one sentence (`say`) | Overlay | Presenter's control |
|---|---|---|---|---|---|
| 0 | `s0-blank` | (the statement; S4; the checkpoint; the room's marks; S30; p0–p2) | The whole path, every stage blank: write the stages in order and mark where you suspect the 8 % came from. | — | Ink (pinned), then Next |
| 1 | `s1-stages-named` **Proposal, optional** (F5) | p3 *"[[transition]] So we walk the path…"* | The six stages named: quantity, sensor, conditioning, ADC, firmware, number. We walk them from the beginning. | — | Next leads to D1·020 |

**The room's marks** are not steps: the presenter inks them on the wall with the ink tool (M07-c) as the
room calls out suspects, **pinned** so they survive until the card is left (M07's `InkLedger` clears ink
per beat unless pinned).

### 4b. Motion, cues and stills per step

| # | Motion | Movers | Cue and its second channel | Hold | Reduced motion | Still |
|---|---|---|---|---|---|---|
| 0 | the blanks and the forms lane trace in (`enter: trace`) | 1 | the trace | hold | whole | the blank path |
| 1 | the six names fade in together (`enter: fade`) | 1 (one linked fade) | the names in their boxes | hold | whole | the named path |

Two stills (B4 asks for 3–7 *for a sequence*; this is not one). Nothing flashes.

## 5. Pacing and interaction, by surface and view

**Who paces**: the presenter on the wall; in Study and Scope, the learner (who also writes the
checkpoint).

| View | Who | Controls |
|---|---|---|
| Preview (in the slide) | everyone | Back · Next · *step n of 2* |
| View (details) | everyone | the step list, zoom (Study, Scope) |
| Edit (session only, whole wall) | everyone; **a student's own copy** | **Proposal** (F6): a learner pins a mark on the stage they suspect in their own copy, as part 2 of the checkpoint; session only, so the checkpoint's text is what D1·090 reopens |
| Authoring (Course Studio) | authors | the variant's steps |

- **The presenter's strip**: the checkpoint's progress (how many have submitted); the next step's `say`;
  the teacher tip (§7d); the ink tool, *Pin ink* on.
- **Study Mode and Scope**: the checkpoint beside the drawing; the learner's answers kept for D1·090
  (capability to confirm, §12).
- **Phone**: the drawing on top (two rows, card 5's F4), then the checkpoint's four parts; one finger does
  nothing on the drawing.
- **Locked**: s1 waits until the checkpoint is closed (it would give away part 1).

## 6. The frame

As card 5's §6, plus the ink tile (laser, ink, *pin*, clear). Identity bar: *A number that appears is
not a number you have earned · ● Holding*; *Checkpoint open* while it runs.

## 7. Thinking, not watching

- **7a. The PLAN's ASK** (verbatim): *checkpoint (after the statement) — "Your suspect list": 1 write the
  stages of the path in order · 2 mark where you suspect the 8 % came from · 3 add one sentence: why there
  · 4 keep it — we open it again at the end of the day (090). · depth: understand · practice: defining
  problems.* It fires at **s0**, after the statement and S4 (F3).
- **7b. Prediction point**: the checkpoint's part 2 *is* a prediction (a suspect, tested by the day:
  D1·070 harvests S31 with the cause; D1·090 harvests S30 with this list). Nothing added.
- **7c. After**: in Study, done = the checkpoint submitted. Nothing renders a verdict (B10): the room's
  suspects are inked as said, not ticked or crossed.
- **7d. Teacher tip** — **Proposal** (F7): *Do not confirm or rule out any suspect: the cause is D1·070's
  (S31). Expect "the ADC" and "the resistors"; ask "what would you measure to find out?"*
- **7e. Explore**: none.

## 8. Faithfulness (the quality bar)

**Section D, Draw rows**
- [x] Proportions: *not to scale* (card 5's).
- [x] Line types: `outline` for the blanks, `thin` for the forms lane; no construction.
- [x] Curves: none.
- [x] Every `say` matches the card (§4a).
- [x] Numbers: *2047* (if F4), card 1's reading.

**Where the 8 % came from** (for the presenter, never on the wall): the ADC input's sampling capacitor
not settling through the divider's 50 kΩ (card 1 §8; D1·070). On this drawing it sits on the boundary
between CONDITIONING (the divider's output impedance) and ADC (its input): a learner who marks either,
or the arrow between them, is close. Recorded so the presenter can recognise good suspects without
saying so.

**A1–A8**: A1 ✓; A2 n/a; A3 ✓; A4, A5 n/a; A6 ✓ (*not to scale*); A7: one repetition reported (F2); A8 ✓.

## 9. Faults and non-ideal behaviour

**PLAN FAULT**: none on this card. The card's subject is the room's suspects for card 1's fault; nothing
is shown.

## 10. Accessibility, legibility and print

- Wall (C2): the blanks large enough for ink to be read from the back row (box height ≥ 1/8 of the
  Canvas); the forms' labels at the floor (card 5's check).
- Reduced motion (C3): both steps whole; ink is drawn by hand and is not animation.
- Colour (C4): the ink's meaning is its position, not its colour.
- Keyboard (C5): → ←; the ink tool's keys (M07-c).
- Print (C8): the blank path (as a worksheet) and the named path.

## 11. Assets to make or source

| Asset | Format | Made by | Status |
|---|---|---|---|
| The `stage-blanks` layer in `course-path.benchdrawing` | Draw library (master) | the author | to make for Saturday |
| `course-path-010-blank.benchdrawing`, the variant with two steps | Draw library | the author | to make for Saturday |

## 12. Bench capabilities this needs

- **Draw Bench**: **exists**: traces, `enter: fade`, steps (M59d). **Missing (request it)**: the fence's
  `steps:` / `layers:` (card 5's F7).
- **Ink** (M07-c): **exists**: ink and laser over the Canvas in both windows, auto-cleared per beat
  unless pinned.
- **Checkpoint**: the answers kept and shown again at D1·090 (*"keep it — we open it again"*): **to
  confirm** in ExSight's `checkpoint` activity (whether Scope keeps a learner's answers across modules
  and can show them later); if not, the learners keep the list on paper.
- **Draw Bench Edit view** (a student's own copy with a pinned mark): **not specified** in M59 (F6).

## 13. Stand-in for the lecture

None needed: the drawing plays today and the ink exists. If the checkpoint's answers cannot be shown
again at D1·090, the presenter asks the room to keep the list on paper (part 4 says *keep it*).

## 14. Findings for the owner

**Owner, 2026-10-08: "go with your recommendations".** Decided: F1 (a) (the stages blank, the forms
shown lightly). Still open: F2, F3 (questions with no recommendation), F4–F7 (proposals), F8 (an
estimate).

- **F1 — *Every stage blank*, and the forms.** This spec leaves the stage boxes blank and shows card 5's
  forms (Temperature, Resistance, …) lightly underneath, as a scaffold. Options: (a) as specified
  (**recommended**: the task is the stages, and the forms help the room find them); (b) blank the forms
  too.
- **F2 — S4 is said twice.** Card 1's Flow p4 already says *"a number that appears is not the same as a
  number you have earned"* (bold); the PLAN here plants S4 *"Said slowly, once."* Keep both (card 1
  introduces it, card 7 plants it), or let card 7's be the only time?
- **F3 — Where the checkpoint fires.** The Flow has no `[[ask]]` cue for it. This spec places it after
  the statement and S4, before the objectives (§2). Alternatively after p2 (*"Can I get a measurement I
  can trust?"*), before the transition. Add an `[[ask]]` to the Flow at the chosen place?
- **F4 — Proposal: *2047* on ADC code**, so the room marks suspects on the path that produced that
  number.
- **F5 — Proposal: s1, the stage names written in** after the checkpoint closes (+0.25 min). It lets
  learners check part 1; D1·090 asks again with more stages.
- **F6 — Proposal: a learner's own pinned mark** in Edit (their copy) as the checkpoint's part 2; needs
  the Draw Bench's Edit view (not specified).
- **F7 — Proposal: the teacher tip** in §7d (do not confirm a suspect).
- **F8 — The checkpoint's time** (2.0 min) is an estimate; with six stages, a mark and a sentence it may
  run to 3. The module already overruns by ≈ 5.7 min.

## 15. Acceptance: how we know it is built right

- s0 shows six blank stage boxes over the forms lane (and *2047* if F4); s1 (if F5) fills the six names;
  both on the wall, the presenter's window and Study Mode.
- The presenter's ink lands on the wall within M07-c's measured 7–20 ms and stays pinned until the card
  is left.
- The checkpoint's four parts open beside the drawing in Scope; its answers are retrievable at D1·090 (or
  the paper fallback is in the presenter's notes).
- B10 no verdict on the room's marks; B12 the wall's strip not operable; B13 no Flow text on the
  drawing; B20 the tip on the strip.
- C2 blanks inkable and readable at 1920 × 1080 and 1024 × 768; C3 whole; C4 position, not colour; C5 →
  ←; C6 walked at 320 px with the checkpoint below; C8 the blank path prints as a worksheet.
- E1–E6 for the drawing as presented; checked on the lecture laptop before Saturday, both themes.
