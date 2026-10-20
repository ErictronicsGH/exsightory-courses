# v2.6 — Shape mode (stage 2a), magnetic mounting, click to connect, half breadboard (2026-10-12)

Made by `tests/shape-mode.js` with real mouse and keys (`.claude/tools/drive-bench.js`, 1920 × 1080): **50/50 checks**.

| Still | What it shows |
|---|---|
| S0-mounted-from-library | the full board and an LDR dragged from the library; set down 0.8 mm off, the leads were drawn into d32 · d33 and the part seated 6.4 mm deep |
| S1-shape-mode | Shape mode from the pane's *Shape leads…*: the cage (1 mm ticks, 5 mm labels, origin midway between the leads), handles, banner, key bar; the Shape pane (class, bends, connect, presets, rule check, router) |
| S2-dragging-15deg | lead b's tip held: the run turns about its bend in the bend's plane, 15° steps, the protractor reads 15°, the length kept |
| S3-connect-mapping | click to connect: lead a mapped to b30 (gold, lettered), lead b waiting for its hole; nothing moves until every lead has its hole |
| S4-connected | both mapped: formed and seated together (a → b30, b → b34), lengths kept, rule check clear |
| S5-breach-lit-red | a crossing mapping was refused in words; a breach made by hand (Alt, free) is lit red on both leads and named in the rule check |
| S6-fr-light | the same in French, light |
| S7-moved-and-reseated | the shaped part dragged along the board: it comes out and its leads lock into two new holes |
| S8-half-board | the half-size board (BB400 grid: 400 points, 84.0 × 54.3 mm) chosen under the tile and placed |

Found and fixed while testing: a held lead jumped to a nearer neighbouring hole before the release radius (the grip now
wins); click to connect had made crossing leads and only then flagged them (now refused, never made); messages and the
banner kept the old language after a switch; the pane said *Worktop* for a part standing in a board; the lab's cursor
readouts and the labels button cluttered the stage while shaping (hidden there).

Numbers and sources: insertion depth 6.4 mm (no maker states it: the jumper strip length 1/4 in, Global Specialties via
TestEquity, an analog); holes take 0.4–0.7 mm (BusBoard BB830 and BB400 datasheets, Rev 7); BB400 84.0 × 54.3 × 8.5 mm
(its sheet's "0.03 in" thickness is a misprint for 0.33 in); capture 1.2 mm (under half the 2.54 mm pitch), release
2.2 mm, lift 4 mm (our design values).
