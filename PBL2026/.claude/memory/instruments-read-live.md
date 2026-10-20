---
name: instruments-read-live
description: Instruments on a bench show active readings: the last digit wanders by a count or two a few times a second (as a real meter's does), steam rises as curling vapour; steady instruments (scales, calipers) stay steady
metadata:
  type: feedback
---

Owner, 2026-10-08, on the animated D1·020 card 1: *"the boiling water needs nice vapor effect"* and *"at least the values
on the meter should show active reading (changes)"*.

**Why:** a frozen number reads as a picture of a meter, not a meter measuring; a real 4½-digit meter's last digit moves
with noise and drift, and a bath controller's actual temperature hunts around its set point. Realism is the bar
([[bench-quality-bar]]).

**How to apply:**
- Every live display wanders in counts of its last digit (`K.counts(a, rate, salt, max)`: mostly 0, sometimes ±1,
  rarely ±2, updated 1–3 times a second, from the bench's time so a replay is identical). Keep the size physical (e.g.
  ±0.1 mΩ on a 3.3759 Ω four-wire reading; ±0.1 °C on a regulated bath). Scales and calipers stay steady.
- Text that quotes a live value says "≈" or "reads about".
- Steam and vapour: many small puffs rising from the water's surface, widening and thinning, bent by a fixed turbulence
  field (`K.steam`, filter `vapor`), kept below titles.
- Live displays sit in the moving layer, not the painted-once scene (performance, [[prototype-capture]]).
Related: [[input-drives-every-output]], [[reference-designs-set-the-look]].
