---
includeInExport: false
---

<!-- Restructured from: transcripts/Chapter 15 - measurement_errors.md ("Dealing with measurement errors":
     the ground-loop note, tidied from note form). Everything else: no transcript yet (training-overview
     Day 3 Module 3, which carries the 2 A × 10 mΩ example).
     Where on the path: the PATH between the sensor and the converter — the wiring, and first of all its
     return. We met "return current makes voltage in the ground path" as a forward pointer in 030; this is
     where it is paid off. -->

<!-- Lesson-level script for “Ground as an impedance: returns, loops and differential sensing”. The words for each slide are in the ```flow
     fence under that card in en.md, and appear on the teleprompter with it. -->

## Where we are on the path

The PATH between the sensor and the converter — the wiring, and first of all its return. We met "return current makes voltage in the ground path" as a forward pointer in 030; this is where it is paid off.

## The arc

1. **What is 0 V?** — Ground is a chosen reference, not a physical zero.
2. **How much is ten milliohms worth?** — Two amps through ten milliohms of return trace is twenty millivolts.
3. **Ground loops** — A ground loop is two paths to earth forming a closed circuit.
4. **Differential sensing: the structural fix** — Differential sensing measures the difference between two inputs rather than one input against ground, so the ground difference is rejected rather than read.

## What the wall shows

- What is 0 V?: Electronics — `ground-return` (first met in 030): a DMM between the supply's ground and the far end
- How much is ten milliohms worth?: Equation + Electronics — Equation first: 2 A × 10 mΩ = 20 mV; 1 LSB = 3.3 V / 4096 ≈
- Ground loops: Draw + Electronics — Draw first: two instruments, each bonded to earth through its own mains lead,
- Differential sensing: the structural fix: Electronics — `ground-return` again with the DMM replaced by a differential probe (as in

## Learner actions

- What is 0 V?: circuit + predict (before the load switches on) — "Ground right at the ADC, and ground at the far end
- How much is ten milliohms worth?: numeric (before the reveal) — "2 A of return current through 10 mΩ of return trace. How many counts
- Ground loops: circuit + predict (before the second ground connection) — "I am adding one wire: a second
- Differential sensing: the structural fix: checkpoint (before the statement's explanation) — "Where on the path have we already met a difference

## Hand-off

[[transition]] So ground is not nothing: it is a piece of wire with resistance and inductance, and it
is on the path whether we draw it or not. Tomorrow we keep walking that same stretch of the path,
because the return is not the only thing the wiring adds. The probes and leads themselves bring
capacitance and inductance, and with a quantity that moves, those start to matter.
