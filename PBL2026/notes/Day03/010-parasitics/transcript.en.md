---
includeInExport: false
---

<!-- Restructured from: transcripts/Chapter 07 - Analog to digital converters.md (opening paragraphs:
     loading and impedance, one sentence); training-overview.md Day 2 Module 2 and "Everything here is
     simulated" (GAP notes).
     Where on the path: the AC pass, between the sensor and the conditioning. Yesterday ended on ground,
     the return half of the wiring. Today opens on the rest of it: the probes, cables and leads we connect
     to the circuit, and the C and L they bring with them. -->

<!-- Lesson-level script for “Parasitic C and L: what probes and wiring add”. The words for each slide are in the ```flow
     fence under that card in en.md, and appear on the teleprompter with it. -->

## Where we are on the path

The AC pass, between the sensor and the conditioning. Yesterday ended on ground, the return half of the wiring. Today opens on the rest of it: the probes, cables and leads we connect to the circuit, and the C and L they bring with them.

## The arc

1. **Every connection is a circuit you added** — Every measurement connection — the probe, the cable, the leads — is a circuit you have added to the one you are measuring, and it acts on the signal.
2. **Impedance has R, L and C — and so does the wiring** — Impedance is the effective opposition a circuit presents to a changing electrical signal, and it can involve resistance, inductance and capacitance.
3. **Probe compensation is a frequency-dependent divider** — A probe and the instrument input form a divider whose ratio depends on frequency.
4. **Cable capacitance loads the node** — A cable's capacitance hangs on the node you measure.
5. **Lead inductance rings on fast transitions** — Lead inductance rings on fast transitions.
6. **An ideal simulation has no parasitics until you put them there** — All of it is the same story: parasitic C and L that an ideal simulation does not contain until you put them there.

## What the wall shows

- Every connection is a circuit you added: Figure — a scope screenshot of a square wave with a rounded leading corner, a spike and a few cycles of
- Impedance has R, L and C — and so does the wiring: Draw — a length of wire drawn as a line, then redrawn as what the model says it is: series R, series L,
- Probe compensation is a frequency-dependent divider: Plot — the ×10 probe and the scope input as a compensated divider: 9 MΩ ∥ C_comp in the
- Cable capacitance loads the node: Plot — a genuine 0 → 1 edge at a node of source resistance R_s, before and after the cable's capacitance
- Lead inductance rings on fast transitions: Plot — a fast edge seen through the probe's ground-lead loop: the loop's L with the probe's tip
- An ideal simulation has no parasitics until you put them there: Draw — the wire-as-RLC drawing from the second card, completed: the node, the probe's tip C and C_comp,

## Learner actions

- Every connection is a circuit you added: poll (after the statement) — "When you clip a probe onto a node, what have you added to the circuit?"
- Probe compensation is a frequency-dependent divider: poe (after the statement) — "One of these is flat. Which one? And what is wrong with the other two?"
- Cable capacitance loads the node: poe (after the statement) — "I am going to add the cable's capacitance to this node. What happens to the
- Lead inductance rings on fast transitions: poe (after the statement) — "As the loop area grows, which way does the ringing move?"
- An ideal simulation has no parasitics until you put them there: checkpoint (after the statement) — "List the parasitic elements you added to your ideal model, and what

## Hand-off

[[transition]] So the signal has made it along the wires, carrying a little more than it started with.
The next thing it meets is the conditioning in front of the converter, and an AC signal has two
problems there that a DC signal never had: it swings negative, and it may contain frequencies the
converter cannot honestly represent.
