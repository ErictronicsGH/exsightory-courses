---
name: iec-symbols-us-switch
description: Owner 2026-10-20 — schematic symbols are IEC 60617 by default everywhere; the US (ANSI) set is an option on a bench-level switch
metadata:
  type: feedback
---

Owner, 2026-10-20: *"stick to the use of IEC symbols. with the US version as an option to switch in the bench"*.

**Why:** the course is international (EN and FR); IEC 60617 is the standard its audience learns. The first U016 page had
mixed US zigzags and triangles.

**How to apply:** every circuit drawing, preview and spec draws IEC by default: resistor as a rectangle, amplifier as a
rectangle with ▷ (∞ for an op-amp), D/A converter `#/∩`, voltage source as a circle with its line, IEC earth. The US
set (zigzag, triangle amplifier, "DAC" box, circle with + −) is one **bench-level** switch (Symbols IEC | US) beside
Speed and Autoplay, redrawing every scene; it is the viewer's setting, remembered per viewer. Specs name the switch as a
bench capability so the Benches lane builds it (Draw, Electronics and Breadboard benches). Related:
[[player-controls-are-the-bench]], [[circuit-effects-are-the-benchs]].
