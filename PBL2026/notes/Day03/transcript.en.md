---
includeInExport: false
---

<!-- Chapter-level presenter notes for Day 3, Monday 12 October. All times GMT. -->

Day 3 continues the AC pass from where Day 2 left it. Yesterday afternoon the quantity started to move:
we said what number describes it (RMS and crest factor), how to get near the mains safely (isolation),
and what the return wiring does to it (ground, loops, differential sensing). Today we keep walking
inwards along the same path until the moving quantity becomes a number in firmware, and then we build
the whole path as one instrument.

The order is the path itself:

- **12:00 · Parasitic C and L** (35 min): what probes, cables and leads add.
- **12:35 · Conditioning AC and aliasing** (45 min): bias into range, how often to sample, the
  anti-alias filter.
- **13:20 · Break** (15 min).
- **13:35 · Sampling instants** (30 min): not how often, but exactly when.
- **14:05 · True RMS** (40 min): the firmware computes the number, and we settle the argument with the
  multimeter.
- **14:45 · Power** (45 min): a second channel, and the sequential-sampling phase trap.
- **15:30 · Break** (15 min).
- **15:45 · Capstone** (70 min): the AC power meter, milestone by milestone along the whole path.
- **16:55 · Wrap-up** (35 min): staged faults, the checklist and Q&A. We finish at 17:30.

Keep the path diagram on the wall and point to the stage at every transition. The capstone is where the
two passes meet: every stage from Day 1 and Day 2 reappears in one instrument, and learners must say
where every number came from. The wrap-up then turns the course around. The room follows a wrong number
backwards, one checklist line per module, and we close where Day 1 opened: your MCU reads 2047, and now
you can say what that is, and how much of it to believe.
