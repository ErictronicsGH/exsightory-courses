---
includeInExport: false
---

<!-- Restructured from: transcripts/Chapter 03 - Signal conditioning.md "Isolation" (all four paragraphs);
     AC_Metering_System_Simulation_Project.md §9 (isolation listed as "a conceptual system boundary").
     Injury and current path, where galvanic isolation belongs, CAT ratings and the overload showcase: no
     transcript yet (training-overview Day 3 Module 4).
     Where on the path: the SENSOR, at the mains. We know what number we want from the AC quantity (070);
     now we have to get a sensor near it without bringing the mains along. -->

<!-- Lesson-level script for “Isolation and electrical safety”. The words for each slide are in the ```flow
     fence under that card in en.md, and appear on the teleprompter with it. -->

## Where we are on the path

The SENSOR, at the mains. We know what number we want from the AC quantity (070); now we have to get a sensor near it without bringing the mains along.

## The arc

1. **What actually injures?** — What injures is the current path through the body, not voltage alone.
2. **Isolation: information crosses, the path does not** — Isolation lets the information pass while preventing an unwanted direct electrical connection.
3. **Isolation is not buffering** — Buffering keeps the electrical connection while preventing the source from being loaded.
4. **Where galvanic isolation belongs** — Galvanic isolation is a boundary in the measurement system, and where it is placed is a design decision.
5. **Two meters at the distribution panel** — The voltage printed on a meter is not the whole of its rating.
6. **Past the rating** — A component driven past its rated dissipation fails at exactly the point the maths predicted.

## What the wall shows

- What actually injures?: Equation — body current = V / R_path, with V and R_path on dials, and a Figure beside it of two paths
- Isolation: information crosses, the path does not: Draw — an optocoupler across an isolation barrier: the input circuit and its LED on the left with
- Where galvanic isolation belongs: Draw — the capstone meter's blocks, sensor → signal conditioning → ADC → digital interface →
- Two meters at the distribution panel: Figure — an installation drawn as CAT IV (origin of supply, service entrance), CAT III (distribution
- Past the rating: Electronics — `overpower` (existing): V1 across R1 (470 Ω) in series with R2 (2.2 kΩ),

## Learner actions

- What actually injures?: poll (before the statement) — "Which is dangerous: high voltage, or high current?"
- Isolation is not buffering: flash (after the statement, four short rounds) — "Buffer, or isolator?"
- Where galvanic isolation belongs: poll (after the statement) — "Where would you draw the isolation boundary?"
- Two meters at the distribution panel: poe (before the statement) — "At a distribution panel: a CAT II 1000 V meter, or a CAT III 600 V
- Two meters at the distribution panel: numeric (after the reveal) — "A 6 kV transient from a 12 Ω source, and the same from a 2 Ω source.
- Past the rating: circuit + predict (before the clock runs) — "As V1 rises, which part fails first?"
- Past the rating: numeric (before the clock runs) — "R2 is rated 62.5 mW. At what supply voltage does it reach its

## Hand-off

[[transition]] Isolation breaks the electrical path on purpose. Everything that stays connected
still has a path, and every path has a return. We have been drawing the end of that return as a
little symbol called "ground", as if it were nothing at all. Next, we find out what it really is.
