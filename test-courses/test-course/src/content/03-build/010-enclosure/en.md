---
targetMinutes: 30
linearDeflection: 0.1
---

# The enclosure, and why it is not an afterthought

The mechanical design of a bench supply is thermal design wearing a different
hat. The heatsink is the reason the box is the size it is.

```model
title: The heatsink bracket
src: heatsink-bracket.stl
alt: The pass-transistor heatsink bracket, a finned block with two mounting ears and a transistor pad.
caption: The heatsink bracket. Every dimension below is measured off the model, not typed.
units: mm
parts:
  - id: bracket
    name: Bracket
    note: One folded part. The fins, the pad and the ears are all the same piece of aluminium.
views:
  - id: pad
    name: The transistor pad
    from: [0.2, 0.8, 0.6]
    target: bracket
    zoom: 1.6
  - id: fins
    name: Along the fins
    from: [1, 0.05, 0]
measures:
  - id: height
    name: Fin stack height
    part: bracket
    of: height
  - id: envelope
    name: Overall envelope
    part: bracket
    of: bbox
tour:
  - view: iso
    note: Start here. Ask them which way up it goes before you tell them.
  - view: fins
    note: The fins have to be vertical, or the chimney does not work.
  - view: pad
    note: And this face has to be flat. A gap filled with air is an insulator.
```

Three constraints fight each other in this part:

- The pass transistor needs **contact area** and a short thermal path to the fins
- The fins need **air**, which means clearance and an orientation that lets
  convection work
- The bracket has to **hold the transistor flat** against the pad, because a
  gap filled with air is a thermal insulator no amount of fin area will rescue

Before it is taken apart, here it is shut, as it arrives: a mesh and nothing
else, to turn over.

```canvas
kind: model3d
src: enclosure.glb
alt: The closed sheet-metal enclosure, with nothing named on it - a model to turn over before it is opened.
caption: Shut, and unannotated. Turn it round; there is nothing on the outside to tell you what is inside.
```

```model
title: The enclosure, opened
src: enclosure.glb
alt: A sheet-metal enclosure whose lid hinges back to reveal the board inside, standing on four standoffs above the floor.
caption: Pointing at a sealed box teaches nothing. Opening it is the lesson.
units: mm
ghost: true
parts:
  - id: body
    name: Body
    match:
      - node: Enclosure/Body
      - near: [60, 30, 40]
        within: 0.05
  - id: lid
    name: Lid
    colour: amber
    note: It carries nothing, which is why it can be 3 mm and hinged rather than bolted.
    match:
      - node: Enclosure/Lid
      - near: [60, 61.5, 40]
        within: 0.05
  - id: board
    name: Board
    colour: teal
    note: The thing the lid was hiding, and the only part in here that gets warm.
    match:
      - node: Enclosure/PCB
      - near: [60, 14.8, 40]
        within: 0.05
  - id: standoffs
    name: Standoffs
    colour: orange
    note: Eleven millimetres of air under the board, which is the only cooling path it has.
    match:
      - node: Standoff
        all: true
views:
  - id: inside
    name: Inside
    from: [0.35, 0.8, 0.5]
  - id: end-on
    name: End on
    from: [1, 0.08, 0]
joints:
  - id: lid-hinge
    type: hinge
    name: Lid
    parts: [lid]
    axis: [-1, 0, 0]
    origin: [0, 60, 0]
    range: [0, 110]
    home: 0
poses:
  - id: closed
    name: Closed
    joints:
      lid-hinge: 0
  - id: open
    name: Open
    joints:
      lid-hinge: 110
explode:
  groups:
    - id: board-stack
      parts: [board, standoffs]
section:
  axis: z
  offset: 0.5
measures:
  - id: standoff-air
    name: Air under the board
    from: [16, 3, 16]
    to: [16, 14, 16]
  - id: wall
    name: Wall thickness
    from: [0, 30, 40]
    to: [3, 30, 40]
tour:
  - pose: closed
    view: iso
    note: This is what it looks like on the bench. Nothing to see, which is the point.
  - pose: open
    view: inside
    note: A hundred and ten degrees, which is as far as it goes before the lid fouls the cable gland.
  - pose: open
    part: board
    note: And there is the board. Ask them what is holding it off the floor before you show them.
  - pose: open
    part: standoffs
    note: Eleven millimetres. That gap is the entire cooling path on the underside.
  - pose: open
    explode: 0.5
    note: Take it apart. The board and the standoffs leave together, because the gap is a fact about the pair - not about either one.
  - view: end-on
    section:
      axis: z
      offset: 0.5
    note: Cut through it. Three millimetres of wall everywhere, and you can see the air gap in section.
```

## Moving something, precisely

The bench supply has one moving part worth talking about, and it is not in the
enclosure: it is the wiper on the coarse adjustment. So here is the general
case, on a linear stage — because a leadscrew is the only mechanism in the kit
that turns one number into two motions at once.

```model
title: A linear stage
src: stage.glb
alt: A linear stage - a leadscrew turning in two bearings, a carriage riding it on twin rails, and a probe on the carriage.
caption: One control, two motions. Turn the screw and the carriage travels; the probe goes with it.
units: mm
parts:
  - id: base
    name: Base
    match:
      - node: Stage/Base
      - near: [80, 4, 30]
        within: 0.05
  - id: rails
    name: Rails
    note: Two of them, and the exporter has already made their names different.
    match:
      - node: Rail
        all: true
  - id: screw
    name: Leadscrew
    colour: amber
    note: Four millimetres of travel per turn, which is the whole of the coupling.
    match:
      - node: Stage/Leadscrew
      - near: [80, 20, 30]
        within: 0.05
  - id: carriage
    name: Carriage
    colour: teal
    note: It rides the screw. Nothing here is driven except the screw itself.
    match:
      - node: Stage/Carriage
      - near: [46, 22, 30]
        within: 0.05
  - id: probe
    name: Probe
    colour: orange
    note: And it rides the carriage - a chain three deep, so the probe moves because the screw turned.
    match:
      - node: Stage/Probe
      - near: [46, 46, 30]
        within: 0.05
views:
  - id: along
    name: Along the screw
    from: [0.95, 0.2, 0.24]
  - id: over
    name: From above
    from: [0.25, 0.9, 0.35]
joints:
  - id: screw-turn
    type: screw
    name: Feed screw
    parts: [screw]
    axis: [1, 0, 0]
    origin: [6, 20, 30]
    range: [0, 1080]
    home: 0
    lead: 4
  - id: carriage-ride
    type: slider
    name: Carriage
    parts: [carriage]
    axis: [1, 0, 0]
    range: [0, 12]
  - id: probe-ride
    type: fixed
    name: Probe
    parts: [probe]
    on: carriage-ride
poses:
  - id: home
    name: Home
    joints:
      screw-turn: 0
      carriage-ride: 0
  - id: three-turns
    name: Three turns
    joints:
      screw-turn: 1080
      carriage-ride: 12
measures:
  - id: travel
    name: Rail length
    part: rails
    of: width
  - id: stack
    name: Overall height
    part: base
    of: bbox
section:
  axis: x
  offset: 0.3
tour:
  - view: iso
    pose: home
    note: Ask them how far the carriage moves for one turn before you tell them.
  - view: along
    pose: three-turns
    note: Three turns, four millimetres each. Twelve millimetres, and the probe went with it.
  - view: over
    part: probe
    note: The probe never touches the screw. It rides the carriage, which rides the screw.
```

A `screw` is the only joint in this format that does two things from one number,
and that is not a convenience: it is what a bolt does. The `lead` is the travel
per revolution - the number stamped on the part - so three turns at 4 mm a turn
advances the screw twelve millimetres, and the carriage goes the same distance.

The probe has no control of its own. It is `fixed` **on** the carriage, so it
moves because the carriage did, which is what a chain is for.

```analogy
A heatsink is not a sponge that soaks heat up. It is a chimney.

Heat arrives at the base and must leave through moving air, which means the fins
need somewhere for hot air to go and somewhere for cool air to come from. A
heatsink mounted with its fins horizontal is a chimney lying on its side, and it
performs about as well as that sounds.
```

## Sizing it honestly

We established the worst case in Part 2: **30 W** at the low end of the output
range. The thermal path runs transistor junction to case, case to bracket,
bracket to air, and each hop has a resistance in °C per watt.

If the total is 2 °C/W and the room is 25 °C, the junction sits at
25 + (30 × 2) = **85 °C** — inside spec for most parts, with very little margin
for a warm room or a blocked vent.

```flash
question: The same 30 W through a heatsink of 1.2 C/W, in a 25 C room. Roughly what junction temperature?
options:
  - About 36 C
  - About 61 C
  - About 90 C
correct: 1
timerSeconds: 40
```

```checkpoint
instructions: |
  Check the bracket against the transistor you actually have, before anything
  is cut. Measure - do not trust the drawing.
items:
  - Confirm the mounting hole spacing matches your transistor package
  - Check the pad is flat, and deburr it if it is not
  - Confirm the fins will sit vertical in the finished orientation
  - Leave at least 20 mm of clearance above and below the fin stack
  - Plan the insulating washer - the tab is usually at collector potential
```
