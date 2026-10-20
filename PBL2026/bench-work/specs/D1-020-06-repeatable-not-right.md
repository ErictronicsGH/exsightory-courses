```yaml
id: D1-020-06-repeatable-not-right
card: "Repeatable is not the same as right"
module: notes/Day01/020-measurand-and-uncertainty/en.md
bench: Plot                       # exists
library: "two-instruments (card 5's Plot, `D1-020-05-accuracy-precision.md` §3a), loaded with the handheld narrowed to a spike at 1.004 V"
dimensions: 2D
stand_in: none                    # the truth is shown from the start here, so a plain marker does (§13)
optional_benches: []
real_thing: "a 3½-digit handheld reading a 1.0000 V source as 1.004 V every time: σ 0.1 mV, so the last digit never changes"
minutes: 0.4                      # on the bench: the one state, spoken over p0 and p2
card_minutes: 1.5
status: spec-ready                # card 5's values decided 2026-10-08; F1–F2 proposals
learner_action: none
predictions: []
seeds: []
key_variable: "σ near zero (every trial identical) with μ off the truth"
time_scale: "none"
steps: 1                          # s0
```

Reuses card 5's Plot definition. One state, so the spec is short; every section is filled.

## 1. What the room must understand

- **Statement** (verbatim): *An instrument can return the same value every time and still be wrong.
  Validity asks whether it measures what it claims to, and over what range.*
- **SHOW** (verbatim from the PLAN): *Plot — the same Plot, one curve narrowed to a spike and parked well
  off the true value: every trial identical, every trial off.*
- **Look for** (verbatim): *a reading repeatable to the last digit, in the wrong place.*
- **Status** (verbatim): *ready.*
- **Drive**: *none in the PLAN*; one state (§4).
- **Bench and library.** The **bench** is the Plot Bench; the **library** is card 5's plot definition with
  new defaults.
- **Insight**: *a reading that never changes can still be wrong: repeatability is not accuracy.*
- **Kind of knowledge**: *a contrast between two states* (the spike and the truth). Card test → **Plot**.
  B17 applies (both on one axis).
- **Why this bench, not a still**: in the lecture it is a still; in Study the learner can widen the spike
  and move it, the same sliders as card 5 (B11).
- **Key variable**: σ near zero, μ off the truth.

## 2. Time

The Flow is 176 words, all spoken: **1.35 min**.

| Beat | Minutes | Source |
|---|---|---|
| s0 on the Canvas; Flow p0 *"Repeatability is the ability…"* (22) | 0.17 | 22 ÷ 130 |
| p1 reliability (44), p2 *"Neither reliability nor repeatability…"* (21), p3 validity (89), s0 held | 1.18 | 154 ÷ 130 |
| The presenter points at the spike and the truth (unscripted, ≈ 20 words: *"Every reading 1.004. Every reading 4 mV off."*) | 0.15 | estimate |
| **Card total / of which on the bench** | **1.5 / 0.4** | the spike is the subject of p0 and p2 (0.32) plus the pointing (0.15) |

**Module check**: `D1-020-03-direct-indirect-null.md` §2 (≈ 28.9 min against 30).

## 3. The scene: what is on the bench

| id | Item | Value | Source |
|---|---|---|---|
| `handheld` | curve, teal solid | μ_h **1.0040 V**, σ_h **0.1 mV** | §8 |
| `bench` | — | not in this card's block | the PLAN: *"one curve"* |
| `truth` | marker at 1.0000 V, *True value* | always drawn (a plain marker: no reveal on this card) | card 5 |
| axes | as card 5 | 0.985–1.015 V; *How often (peak = 1)* | card 5 |
| sliders | `mh`, `sh` | defaults above | card 5 |

**Meet the parts**: the room met the plot on card 5. **Values beside their element**: *μ 1.0040 V*, *σ
0.1 mV* on the sliders; the truth's label. **Colours**: as card 5 (solid teal, the truth in contrast ink,
labelled).

## 4. The run

### 4a. Steps

| # | id | Flow paragraph | What changes (`say`) | Overlay | Control |
|---|---|---|---|---|---|
| 0 | `s0-spike` | p0 *"Repeatability is…"*, held through p3 | One meter, narrowed to a spike at 1.004 V: every reading the same, every reading 4 mV off the truth. | — | (the Canvas is up) |

### 4b. Motion, cues and stills

| # | Motion | Movers | Cue | Hold | Reduced motion | Still |
|---|---|---|---|---|---|---|
| 0 | none | 0 | the presenter's pointer (laser) on the spike, then the truth | hold | same | the spike and the truth |

## 5. Pacing and interaction, by surface and view

As card 5 (`D1-020-05-accuracy-precision.md` §5): the presenter on the wall; in Study the learner has `mh`
and `sh`. Preview: the plot and its two sliders; View: the same, zoom; Edit: not specified for the Plot;
Authoring: the `plot` block. Phone: plot, then sliders. **Locked**: nothing.

## 6. The frame

As card 5's §6; title *Repeatable, and wrong*.

## 7. Thinking, not watching

- **7a. The PLAN's ASK**: *none on this card.*
- **7b. Prediction point** — **Proposal** (F2): *"This meter shows 1.004 on every one of ten readings. How
  sure are you that the voltage is 1.004 V?"* (confidence 1–5, never scored), before the truth's marker is
  pointed at. +0.3 min.
- **7c. After**: none beyond the Flow.
- **7d. Teacher tip** — **Proposal** (F2): *Ask: what would you do to find out whether a steady reading is
  right?* (Compare with a reference: the calibration thread, D2·050.)
- **7e. Explore**: `mh` and `sh` in Study.

## 8. Faithfulness (the quality bar)

- A 3½-digit display on its 2 V range shows the reading rounded to 1 mV. With μ 1.0040 V and σ 0.1 mV the
  display changes only if a reading strays 0.5 mV, which is 5 σ: the chance is 2 × Q(5) = **5.7 × 10⁻⁷**
  per reading. So *"repeatable to the last digit"* holds exactly: 1.004, every time.
- 4.0 mV off at 1.000 V, against the card-8 meter's band ±(0.5 % × 1.000 V + 3 × 1 mV) = **±8 mV**: this
  reading is wrong **and inside its own specification** (F1).
- **Plot rows**: the same expression as card 5 (labelled *each curve scaled to the same height*); the spike
  is 0.3 % of the axis wide: check it draws smoothly (card 5 §8).
- **A1–A8**: A1 ✓ (the arithmetic); A2 ✓; A3 ✓; A4 n/a; A5 n/a; A6 ✓; A7 ✓ (card 5 and card 8 agree);
  A8 ✓.

## 9. Faults and non-ideal behaviour

**PLAN FAULT**: none. The spike is the card's fault (an offset, steady); the Flow's validity example (the
diaphragm) is not drawn.

## 10. Accessibility, legibility and print

As card 5's §10. Print: one still with its sentence.

## 11. Assets to make or source

| Asset | Format | Made by | Status |
|---|---|---|---|
| The `plot` block: the handheld curve with these defaults, the truth as a marker | YAML in `en.md` | the author | to write |

## 12. Bench capabilities this needs

**Plot Bench**: curves, sliders, a marker: **all exist**. Nothing new.

## 13. Stand-in for the lecture

None needed: the truth is shown from the start, so a plain `marker` does it.

## 14. Findings for the owner

- **F1 — A thread to card 8**: 1.004 V is inside the card-8 meter's ±8 mV band. Proposal: one line at
  card 8 (*"remember the meter that read 1.004 every time: it was within its specification"*), in the
  presenter's notes, not the Flow.
- **F2 — Proposals**: the confidence question (§7b, +0.3 min) and the teacher tip (§7d).

## 15. Acceptance: how we know it is built right

- The plot shows the spike at 1.0040 V (readout: y = 1 at 1.0040 V, y = 0.607 at 1.0041 V) and the truth
  at 1.0000 V; no bench curve.
- B2 nothing moves; B13 labels only; B16 μ and σ as numbers; B17 the spike and the truth on one axis.
- C2 the spike and the marker distinguishable at 1024 × 768; C4 the truth labelled; C6 at 320; C8 the still.
