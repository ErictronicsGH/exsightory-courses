---
name: drawing-and-numbers-agree
description: Values shown must be computed from where the drawing places things, and a drawn mechanism and its hand control share one law; instruments are never exactly perfect
metadata:
  type: feedback
---

Every value on a stage is computed from the picture as drawn: a strain "at the gauges" is the mean over the gauges' drawn
grids (not the plate's extreme at a point no gauge can sit on); a drawn handwheel, its spindle and the hand's control turn
by one law (4 bar a turn), never two. Instruments carry a small, realistic error inside their stated accuracy (a reading
that is exact every time looks fake), displays refresh a few times a second, and past a material's limit the elastic
formulas are withdrawn, not printed.

**Why:** owner's review request 2026-10-10 (card 6: "correctness, consistency, reality > 95 %, accuracy, physics,
mathematics"): the review found the chain's strains taken at the clamp while the gauges were drawn at 0.875a (bridge
2.08 vs 1.55 mV/V), the wheel drawn on a square-root law while the hand turned at 4 bar a turn, every trial reading +0.00,
and 1200 MPa printed past yield.

**How to apply:** before sending any motion, recompute each shown number from the drawing's own geometry and check every
hand control against the part it moves; give instruments a stated, in-spec error. Related: [[visual-accuracy-same-scale]],
[[instruments-read-live]], [[reference-designs-set-the-look]].
