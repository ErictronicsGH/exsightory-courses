---
name: signal-cues-only-when-needed
description: Don't add signal or flow indications (pulses, dots along leads) unless the card needs them; any drawn flow must run in the physically right direction
metadata:
  type: feedback
---

Owner, 2026-10-09, on 3a's cyan pulse running from the multimeter along its leads to the resistor: *"first of all that
signal indication is not needed and even if we keep the direction of the movement is wrong. so just disable the signal"*.
Earlier the same day the current dots in 1a were also dropped in favour of the instruments changing.

**Why:** decorative flows add motion that competes with the readings, and a flow in the wrong direction teaches the wrong
physics. A voltmeter takes its reading from the circuit; nothing travels from the meter to the part.

**How to apply:** show what a measurement does through the instruments themselves (readings, needles, lamps, knobs)
rather than drawn signals. Propose a flow cue only when the card's point is the flow itself, and check its direction
(from the measured quantity to the instrument; conventional current from + through the load to −). Related:
[[instruments-read-live]], [[input-drives-every-output]], [[design-direction-before-building]].

**When a signal's path is the point (owner, 2026-10-10, D1·030 card 1):** the glow follows the signal's *whole* way, from the
sensor itself (3b: the cell's leg, its strip, the solid-core wire, the lead, the pin), in **the wire's own colour**, a brighter
stretch running the way the signal goes. To show amplification, the same glow is weak and thin on the input and strong and
thick on the output (4b). Each domain is drawn as itself (photons, charge flow, a lit voltage level, a count building up,
bits on SDA/SCL), and processes run **continuously and varying**, not once (4c: a reading a cycle, counts varying).

**Voltage is not current (owner, 2026-10-10, 4b):** a glow that *moves* reads as current. Where a node has a voltage but
draws no current (an op amp's + and − inputs, a high-impedance ADC input, an unloaded output), draw it as a steady glow at
its level, nothing moving in; show moving charge only where current really flows (the feedback divider, output → ground, the
same rate through series parts), and label it (I = V / R). Check every flow against the circuit's physics before sending.
