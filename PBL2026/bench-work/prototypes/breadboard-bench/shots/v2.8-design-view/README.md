# v2.8 · The design view (2026-10-12)

Taken by `tests/design-view.js` (real mouse input, `.claude/tools/drive-bench.js`), 47/47 checks.

The bench's activity names the view its circuit is placed and wired in (`design: { view, others }`: 2D, 2.5D or 3D;
3D covers 3D, Custom and the room). The other views the author lets students open are look-only: the camera alone.
The instruments still work there (the supply's knobs turn through its 2D picture): they are run, not built.

| Still | What it shows |
|---|---|
| D1-2d-look-only-wires | Designed in 3D, seen in 2D: the banner *Look only: this bench is built in 3D · Go to 3D*; TL1 drawn from the + post's picture (supply on the shelf band, face-on) to the front + rail (board, from above). A drag on the board, a library drop and the wire tile do nothing. |
| D2-design-menu | Authoring: the identity row's *Design view* chip and its menu: the view the circuit is built in, the views students may also look in (look only), and what that means. |
| D3-2d-first-end | Designed in 2D, zoomed on the board: the jumper tool's first end g30 (gold ring) clicked on the board's picture; W1 (violet, made earlier in 3D) drawn in the board's own picture; TL1's pin plug in front+3. |
| D4-2d-designed-wires | Designed in 2D: TL2 made by clicks (the − post on the supply's front picture, then back−3); TL1 selected by a click on its drawn line (teal halo): nothing passes through anything, length kept, the pin plug's rating unstated (said so). |
| D4b-ratings-over-limit | Ratings (research 14): TL1's pane with its rated row (19 A · 1000 V CAT III) and insulation rating (silicone, −50 … 90 °C, wall 0.8 mm); the supply's limit raised to 3 A: the rule check says it is above the weakest rating on the path, 2 A (the breadboard's contacts), and that the pin plug's maker states none. |
| D5-3d-look-only | Designed in 2D, seen in 3D: look only; the wires as they are in the room. |
| D6-25d-look-only | 2.5D, look only: both leads drawn from the supply's front picture down to the board. |
| D7-fr-light-25d, D8-fr-light-2d | The same in French, light. |

**How wires are drawn in 2D and 2.5D.** Each part there is drawn in its own preset view (the supply face-on, the board
from above), so no single camera can show a wire. A **jumper** lies on its board: the real one is drawn through the
board's picture (anything standing over it hides it, as on the bench). A **test lead** joins parts seen from different
angles: it is drawn simply, over the layout, from the picture of one plug to the picture of the other, at its true
width and colour, bowed across its line by its slack (gently: at most 0.12 × its span + 8 mm), the plugs end-on.

**Found and fixed on the way.** Two test leads from neighbouring posts went *through each other* in 3D: the drape kept
each cable's points off other cables but not its links, so two 10 mm links could cross in an X with every point clear.
`components/conductors/drape.mjs` now keeps every link off every cable near it (nearest points, both ends moved by their
share; the near list refreshed every 8 steps). The rule check had also read a lead through every second point (its
chords cut corners): it now reads the cable as drawn. The tool's first-end ring showed teal (hover) over gold.
Unit tests: `conductors/wires.test.mjs` 35/35 (a lead beside another, a lead across another); rules
`components/schema/design.test.mjs` 11/11.

**Known limit.** A lead plugged in right beside another lead's cable (7.6 mm apart at the board) cannot push the first
one aside: its last link gives about 0.1 mm (1 %) rather than pass through it.

Not yet: shaping a 2D route by hand (so changing the design view loses nothing yet: every route is derived); a lead's
2D drawing may cross another lead's.
