# The six gates (first-class requirements for every animation)

Owner, 2026-10-10: *"Realism >= 95%, scientific facts 100% accuracy, mathematical facts 100% accuracy, visualization and
intuition 100%, consistency and coherence, professional design. all these should be treated as first class requirements
in the animation"*. Memory: `.claude/memory/first-class-requirements.md`.

Every still, motion, film and library passes all six **before** it is sent to the owner, and the report says it did
(and names anything that failed and how it was fixed). They are requirements, not a review to be asked for.

| # | Gate | Check before sending |
|---|---|---|
| 1 | **Realism ≥ 95 %** | Each object is the real thing drawn as it is: proportions to one stated scale, materials, markings, how it stands and is held. A simplified glyph where a real object belongs fails. Real behaviour, including the non-ideal. |
| 2 | **Science 100 %** | Every mechanism is physically right and its size honest. A model's assumptions are stated on the stage (estimate, illustrative, not to scale). An effect too small or too design-dependent to show honestly is replaced and reported, never exaggerated. |
| 3 | **Maths 100 %** | Every number is recomputed (Node) from the drawing's own geometry and the stated model: volumes from the drawn vessel, readings from the drawn position, sums that add up. Text, panels, captions, displays and the README agree to the last digit, including rounding (a reading shows what its display would show). |
| 4 | **Visualization and intuition 100 %** | The picture makes the idea obvious: compared things on one scale, cause before effect, a contrast where the effect is small (e.g. the same probe in a 5 mL vial), labels on what they name, motion that follows the Flow. |
| 5 | **Consistency and coherence** | The same values, units, colours, letters and names across the views, blocks and cards, in EN and FR; nothing contradicts an earlier card or another view (e.g. a hot plate's readout and its label agree; a model shown as wrong is not then labelled as the truth). |
| 6 | **Professional design** | Nothing overlaps, runs off its panel or shrinks below legibility (wrap, don't shrink); type fits in EN and FR; a clean hierarchy; the course's look. Checked on the rendered stills of every view, both languages. |

Also before sending: every unit passes `node --check` (and the kit copies); the walk of every view reports no errors, NaN
or `undefined`; every hand control is dragged and every number it drives is read back.
