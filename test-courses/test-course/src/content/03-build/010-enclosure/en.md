---
targetMinutes: 30
linearDeflection: 0.1
---

# The enclosure, and why it is not an afterthought

The mechanical design of a bench supply is thermal design wearing a different
hat. The heatsink is the reason the box is the size it is.

```canvas
kind: model3d
src: heatsink-bracket.stl
alt: The pass-transistor heatsink bracket, a finned block with two mounting ears and a transistor pad
caption: The heatsink bracket. Drag to rotate; the parts list is on the right.
```

Three constraints fight each other in this part:

- The pass transistor needs **contact area** and a short thermal path to the fins
- The fins need **air**, which means clearance and an orientation that lets
  convection work
- The bracket has to **hold the transistor flat** against the pad, because a
  gap filled with air is a thermal insulator no amount of fin area will rescue

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
