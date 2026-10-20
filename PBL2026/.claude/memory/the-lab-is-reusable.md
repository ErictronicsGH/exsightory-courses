---
name: the-lab-is-reusable
description: The ExSight Laboratory room is one reusable module for every lab-type bench; a bench loads it naming its active station (the only workable one); all other stations static; every station has its sign "ExSight Laboratory / <bench>"
metadata:
  type: project
---

Owner, 2026-10-11: *"we will use this room to build all other benches in time so the room design should be … reusable"*,
*"not just 5 but we will integrate almost all lab-like benches in it"*, *"when used for any bench, the rest of the benches should
be static but all benches should have their signage"*, and the sign format *"ExSight Laboratory / Electronics Bench"* (a PCB
bench's: "ExSight Laboratory / PCB Bench"), all signs the same size, *"only the active bench signage should turn on"* (others
light as they come into view on the tour).

**Why:** each bench (Electronics, PCB, 3DDev, Coding, Mechatronics, and later more) is designed in turn; the room, furnishings,
lights, tour and views must not be rebuilt each time.

**How to apply:** bench-work/prototypes/breadboard-bench/src/lab/ (`createLab({ active, plugin })`, `config.js` = the stations);
a new bench = a station module + a config entry (+ a plug-in in src/benches/<id>/ when it becomes workable). Doc:
bench-work/breadboard-bench/03-the-reusable-lab.md. Dark mode = the room painted dark with its lights on (not lights off).
Related: [[benches-load-in-studio-as-widgets]], [[worktop-is-the-reference-plane]].
