# A course cannot misinform

Owner, 2026-10-20, after the D1·070 review found the module teaching round-to-nearest codes on a truncating converter,
a "that's our 2047" harvest whose own demo shows 1760, and a ½-LSB rule applied to the wrong step: *"ensure this kind of
errors never appears in a course so add a rule to enforce this. a course cannot misinform"*.

**The rule.** Nothing a learner can see or hear may be false, contradict another part of the course, or rest on an
unstated assumption that changes the answer. That covers the owner's text (statements, Flow, PLAN answers and explains,
harvests and seeds, staged faults), every number on a bench, every preview, spec, still and animation.

## 1. The accuracy check: every module, before its unit is done

Run it at the **start** of every unit (before the brief) and again on everything the unit produces. Record the result in
`.claude/tracking/ACCURACY.md`.

| # | Check | How |
|---|---|---|
| A1 | **Every number recomputed** | Node, from the module's stated model, to the digit the text gives. A number that rounds differently from the text is a finding. |
| A2 | **The course's models applied** | The models in §3 below hold everywhere: a value computed under another model (round-to-nearest on the truncating converter, a full-scale rule on a half-scale step) is a finding even when the arithmetic is right. |
| A3 | **Edge cases** | Values on a code transition, at a limit, at zero, at full scale; "settles", "just", "only just", "exactly", "never" checked against the numbers. |
| A4 | **Cross-references** | Every harvest, seed, "as we saw in 040", "our 2047" checked against the cited module's own numbers and circuit. Same cause is not enough: the numbers the room is told to recognise must be the ones it saw. |
| A5 | **Physics and electronics** | Each mechanism is physically right; circuits are complete and correct (feedback, returns, references, polarities); device facts (bit depth, ranges, behaviour) match the named device or the device is unnamed. |
| A6 | **Words that over- or under-claim** | "always", "never", "nothing reports an error", "about", "typically" checked; a rule of thumb is stated as one. |
| A7 | **Sources** | A fact that is not computed is sourced (datasheet, standard, textbook) in the spec or the register. |

## 2. Findings block

- A discrepancy in the owner's text is an **accuracy finding**. It is **never fixed silently** (the owner's words are
  the owner's: `feedback-no-trimming`); it goes to the owner with the numbers, the options and a recommendation, marked
  **accuracy**, and into `ACCURACY.md` as **open**.
- **An open accuracy finding blocks**: the unit cannot be marked done, the module cannot be called ready, and the course
  cannot be published while any finding on it is open. "Decided" means the owner chose; "applied" means the text or
  spec now says it and has been re-checked (A1–A7 again).
- A discrepancy in **our** work (a preview, a spec, a still) is fixed before it is sent, and named in that item's
  six-gate report.

## 3. The course's models (the facts every module computes under)

Add a line whenever the owner decides one; a new line triggers a sweep of every module that uses it.

| Model | Value | Decided |
|---|---|---|
| The MCU's converter | 12 bits, 3.3 V reference, **truncating** (code = ⌊V/LSB⌋), LSB = 3.3/4096 V | 2026-10-08 (D1·010 card 1 note; D1·080's SAR) |
| ADC input | R_on 1 kΩ, C_s 10 pF, 1 µs window, 1 µs of conversion unless the card says otherwise; the capacitor starts at the previous channel's voltage (0 V when unstated) and keeps its charge | D1·010, D1·070 |
| Settling to ½ LSB | (N + 1)·ln 2 time constants for a **full-scale** step; N·ln 2 for a half-scale step | D1·070 review, 2026-10-20 |

## 4. Where it is enforced

- `CLAUDE.md` standing rules (every session reads it).
- `.claude/standards/six-gates.md`: gates 2, 3 and 5 include the accuracy check; every page, preview, spec and still
  sent to the owner carries its six-gate report.
- Every unit's acceptance criteria (`tracking/backlog/TEMPLATE.md`): *"Accuracy check A1–A7 run; no open accuracy
  finding on this module in ACCURACY.md."*
- The publish checklist: the course is published only when `ACCURACY.md` has no open finding.
