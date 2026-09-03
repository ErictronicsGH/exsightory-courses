# Drawing a symbol

The rules the shipped symbols are drawn to, written down because they are the
difference between a set of drawings and one diagram. A library author — or
Circuit Studio's symbol editor at stage 15 — has to be able to add a part that
does not look like it came from somewhere else.

`make-symbols.py` beside this file generated **eighteen** of the twenty-two
symbols here. It is an authoring aid rather than part of any build: nothing runs
it, and stage 15 supersedes it. It is checked in because it is where the
proportions below are actually expressed, and a rule that lives only in prose
drifts from the files it describes.

**`ammeter`, `current-clamp`, `probe` and `test-point` it does not write.** They
were drawn by hand in stages 11d and 11e, their prose is the record of six owner
corrections, and `write()` cannot carry it — a clamp is one `evenodd` outline and
a test point has no thermal layer at all. That seam has leaked once already:
stage 12h added `data-upright` marks to five symbols and updated the generator
for one of them. What keeps all twenty-two honest about the grid regardless is
`parts-symbol-off-pitch`, which is checked on the files themselves.

## The grid, and what a unit is

**One unit is 0.1 mm**, and **the schematic grid is 1.27 mm — 12.7 units.**

The second follows from the first rather than being a separate choice: 0.05 inch
is what every schematic capture tool defaults to, and the owner's amendment on
2026-09-03 was that it is *the only* spacing. It is stated in
`packages/insight-core/src/electronics/pitch.ts`, which the background, the snap
and the library check all read, so there is nowhere for a second one to live.

- **Every terminal is a multiple of 12.7.** Checked by `insight-parts.js` with
  its own code, so a bought library that is off the grid says so at authoring
  time rather than drawing half a pitch out on a wall. It binds *every*
  terminal, including ones no net is ever routed to.
- A **lead is nominally 2.54 mm** — 25.4 units, 0.1 inch, the pitch every
  through-hole part, every breadboard and every piece of stripboard is built on.
  **Nominally**, because the grid binds and the body keeps the standard's
  proportions, so the lead is what gives: it runs from about 20 to 31 units.

  Before stage 12k every terminal was `body_half + 25.4` exactly, so the leads
  were already two pitches and it was the **bodies** that were off the grid. The
  alternative — moving the bodies instead — fails on the capacitor, whose plates
  sit ±5 units apart: the nearest multiple of the pitch is zero, and forcing 12.7
  opens a 2.54 mm gap across a 3.6 mm plate, which reads as two unrelated lines.

  What the flat 25.4 was claiming is not lost. What a student can lay on
  stripboard is fixed by **terminal spacing**, and the old library failed that
  test — a resistor was 9.48 mm pin to pin, which is 3.73 × 2.54 and fits
  nothing. On the grid it is 10.16 mm, exactly four.
- The **origin is the part's own centre**, so placing an instance is a translate
  with nothing to subtract, and rotating one is a rotate about its own middle.
- A two-terminal part is `viewBox="-52 -26 104 52"` with its anchors at
  `(∓50.8, 0)` for a body around 44 units wide, or `(∓38.1, 0)` for a narrower
  one. A three-terminal part declares its own box — a MOSFET is as tall as it is
  wide, and padding every symbol to the largest would make a row of resistors
  look sparse.

## Proportions are the standard's, not a guess

IEC 60617 draws a resistor as a plain rectangle of about **3:1** with the leads
meeting its short edges. The first version here was nearly 2:1, which reads as a
box rather than as a resistor.

Two standards ship where the drawing actually differs, and only there:

| | |
|---|---|
| `iec/` | IEC 60617. **The default** — a rectangle survives a projector and a compressed stream where a six-peak zigzag becomes a smudge |
| `ansi/` | The American form, IEEE Std 315. A student reading a US datasheet or almost any online schematic meets it |

A capacitor, a diode and a MOSFET are the same shape in both, so they are drawn
once. Shipping a duplicate to say "identical" is a second copy of one drawing
that can drift from the first.

## The five layers

In paint order, and the order is part of the contract:

| Layer | What it is |
|---|---|
| `thermal` | **Where the part is** — its body, not its leads. Never painted: the bench reads its extent and draws the heat glow over it, and every marking that belongs *on the part* is placed from it |
| `flow` | The conduction path, under the body. Current density fills it |
| `body` | The part. **Opaque**, and that is not optional — see below |
| `annotation` | What a reveal writes on. Usually absent |
| `hitbox` | The click target: the whole box, transparent, drawn last |

`body` and `hitbox` are required. A symbol with no terminal anchors is refused.

## Three colours and three strokes

Three roles, three colours, and the split is semantic rather than decorative.
A symbol paints in **`var(--bench-symbol)` and nothing else** — the validator
refuses a hard-coded colour, a gradient, a filter and a `style` attribute — so
the bench can recolour a part that is past a limit or has failed by setting one
property.

| | |
|---|---|
| `var(--bench-symbol)` | the component. The subject, and the brightest thing on the sheet |
| `var(--bench-terminal)` | a terminal anchor. Where a wire meets a part |
| `var(--bench-sheet)` | **the body's fill.** Opaque, so a wire passing behind a part is occluded |

Strokes are a scale rather than three numbers picked one at a time, and they are
written as custom properties so a *state* can weight them:

| | |
|---|---|
| `var(--bench-stroke-mark, 1.6)` | a marking inside a symbol — a needle, a display window, the non-linear stroke |
| `var(--bench-stroke, 2.4)` | the symbol's outline |
| (1.8, in the stylesheet) | a wire. Lighter than a symbol, so a schematic reads as parts joined by wires rather than as a mesh |

## A mark is read; a body is turned

A part rotates and everything drawn in it rotates with it, which is right for a
body and wrong for the `A` inside an ammeter's circle. There is no *stop
rotating the text* available here — a symbol carries no text, so the `A` is a
polyline and a line — so the symbol says which of its shapes are a **mark**:

```svg
<g data-upright="0 0">
  <polyline points="-8,9 0,-10 8,9" … />
  <line x1="-4.2" y1="1.5" x2="4.2" y2="1.5" … />
</g>
```

A `<g>` inside a layer is a mark and nothing else; there is no plain grouping.
The two numbers are **the point the mark is read about, in this symbol's own
coordinates**, and they are required rather than defaulting to the origin —
because a mark belongs to a place on the part. A supply's `+` sits beside
terminal `p`; anchored at the origin it would stay on the left while `p` went to
the top, and the drawing would say the wrong pin is positive. Anchored at its
own place it travels round with the terminal and stays the right way up on it,
which is two statements and both are needed.

**A terminal may not be inside a mark.** A terminal held still while the body
turned would land on a different node, and the net would re-route — a topology
change wearing the clothes of a drawing change.

### The audit, 2026-09-03

Every mark in this library was looked at once, and the call recorded. A symbol
that grows a letter later joins this table or fails the check in
`electronicsSymbol.test.ts` that names the three.

| Symbol | Mark | Call |
|---|---|---|
| `iec/ammeter` | the `A` | **upright**, about `0 0`. The owner's own instance: a letter on its side is not a letter |
| `iec/supply` | `+` and `−` | **upright**, about `-11 0` and `11 0`. A minus turned a quarter turn is a vertical bar, which is read as a minus anyway; and each has to arrive beside the terminal it is about |
| `iec/capacitor-polarised` | `+` | **upright**, about `-24 -25`. Right by symmetry at 90°, and wrong at 45° — symmetry is not an argument |
| `iec/dmm` | the needle | **upright**, about `0 0` (owner, 2026-09-03). A face is a thing you read, and a meter stood on end with its pointer leaning the other way reads as broken rather than turned |
| `iec/dmm-bench` | the display window and the buttons | **upright**, about `0 0`, as **one mark**. The arrangement is part of what the face says: given a mark each, the screen would arrive beside the buttons rather than above them |
| `iec/led` | the two emission arrows | **turns.** They point away from the junction, and that direction is the statement |
| `iec/mosfet-n`, `iec/mosfet-p` | the body-diode arrow | **turns.** Which way it points is which device this is |
| `iec/diode-zener`, `iec/diode-schottky` | the ticks on the cathode bar | **turns.** They are drawn onto the bar and mean nothing away from it |
| `iec/thermistor`, `ansi/thermistor` | the variability slash | **turns.** It crosses the body diagonally; held still it would cross nothing |
| `iec/current-clamp` | the jaw gaps, the trigger | **turns.** Where the jaw opens is geometry of the tool |
| `iec/probe` | the finger guard | **turns.** Same |
| `iec/contact` | the two arcs | **turns.** They face each other across the gap |

The pattern in the right-hand column is one line: **what is read is held, and
everything whose meaning is a direction relative to the part is not.**

And the two anchors in the table are two different kinds of statement, which is
why the point is stated rather than defaulted:

- a **face** is read about the centre of the body it is set into, and everything
  on it moves as one, because the arrangement is part of what it says;
- a **polarity mark** is read about its own place, because it is bound to a
  terminal and has to travel round with that pin.

## The one that is easy to get wrong

**A body is opaque and the current stops at its edge.**

The first version drew a resistor as an unfilled rectangle over a flow stroke
that ran its whole width. The current showed straight through the body and the
part came out looking like a **fuse** — which is a different component. A line
crossing a symbol is a different claim from a line joining it, and a symbol that
cannot make that distinction is not a symbol.

A conductor is the exception, because a wire *is* the path.
