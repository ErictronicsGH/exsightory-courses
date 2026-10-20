---
includeInExport: false
---

<!-- Chapter-level script for the presenter: the arc of Day 2 (Sun 11 Oct, 12:00–17:30 GMT). -->

Open by putting the path back on the wall and recapping where Day 1 left the signal. We started at
the quantity, went through the sensor, its loading, the conditioning and the ADC input, and ended
at the reference: the converter has produced a code, and we know what that code is a ratio to. The
code exists. Today it has to become a number we can trust, and then the quantity starts to move.

Day 2 has two halves.

**The first half takes the code from the converter to a number.** At 12:00 the code leaves the
converter: open-drain, pull-ups and I²C (010). At 12:30 the converter moves outside the chip as a
design choice, with the ADS1115 and INA226 (020). At 13:00 we meet noise where the room actually sees
it, in the flickering last digit, and trace it back up the path (030). **Break at 13:35.** At 13:50
the firmware filters: oversampling, dither, and the mean and median as filters (040). At 14:30 it
scales and calibrates, without losing precision in the arithmetic (050). At 15:05 the DC lab walks the
whole path end to end and checks the final error against the Day 1 budget (060). That closes the DC
pass. **Break at 15:30.**

**The second half is where time enters.** We walk the path again, from the quantity inwards. At 15:45
we ask what number describes a quantity that moves: RMS and crest factor (070). At 16:15 we ask how we
get at the mains safely: isolation and safety (080). At 16:50 we look at the first thing the wiring
adds, the ground return (090). We finish at 17:30, with the signal handed to Day 3 at the probes and
wiring.
