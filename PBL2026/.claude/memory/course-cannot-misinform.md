---
name: course-cannot-misinform
description: Owner 2026-10-20 — a course cannot misinform; accuracy check A1–A7 on every module before its brief, findings logged in ACCURACY.md, an open one blocks the unit and publishing
metadata:
  type: feedback
---

Owner, 2026-10-20: *"ensure this kind of errors never appears in a course so add a rule to enforce this. a course cannot
misinform"*, after the D1·070 review found the text teaching round-to-nearest codes on the course's truncating converter
(F5), a "that's our 2047" harvest whose own demo shows 1760 (F6), and a full-scale ½-LSB rule applied to a half-scale step
(F7). The same review found nine faults in my own first brief page (an unreal input, a follower with no feedback, an
off-scale curve drawn as data…).

**Why:** the arithmetic in the Flow was right; the errors were in the model behind it (rounding, step size), in
cross-references between modules, and in my drawings. A plain recompute misses those, so the owner wants a check that
cannot be skipped.

**How to apply:** run `.claude/standards/course-accuracy.md` A1–A7 at the start of every unit (before the brief) and on
everything it produces; compute under the course's models (§3 there: 12-bit, 3.3 V, truncating; R_on 1 kΩ, C_s 10 pF…);
check every harvest/seed against the cited module's numbers. Never fix the owner's text silently: raise an **accuracy**
finding with numbers and options, log it in `.claude/tracking/ACCURACY.md`; an open one blocks the unit, the module and
publishing. Everything I send passes [[first-class-requirements]] with the report in it. Related: [[feedback-no-trimming]],
[[drawing-and-numbers-agree]], [[render-what-you-are-doing]].
