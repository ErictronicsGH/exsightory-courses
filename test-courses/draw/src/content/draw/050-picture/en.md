---
targetMinutes: 4
objectives:
  - Read a moving-coil meter's dial to a fifth of a division.
---

# A picture behind the drawing

A drawing may hold a picture, painted where its box is, with sharp lines drawn
over it. The picture travels beside the drawing, in `images/`.

## Reading the dial

```bench
title: A meter's dial with its pointer drawn over it
package: "@exsight/bench-draw@0.1.49"
work: shared/drawings/meter-dial.benchdrawing
alt: A photographed meter dial on cream card. A curved scale runs from 0 on the left to 10 on the right, each whole volt marked by a long tick and numbered, with fifty divisions in all. A silvered mirror strip curves under the scale, and the unit V stands below it. A drawn pointer rises from a pivot at the bottom centre and stands two divisions past 6, labelled reads 6.4 V.
caption: Each division is a fifth of a volt, so the pointer two divisions past 6 reads 6.4 V.
```

## Your own reading

```checkpoint
instructions: |
  Read the dial yourself before the label says it.
items:
  - Count the divisions between two numbered ticks
  - Work out what one division is worth
  - Count the divisions from 6 to the pointer, and add them
```
