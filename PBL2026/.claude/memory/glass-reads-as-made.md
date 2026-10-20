---
name: glass-reads-as-made
description: A drawn display shows what its real glass can show — a 3½-digit LCD's half digit is only ever a 1 (0.100 V on 2 V reads " .100"), full digits keep their zeros, the bargraph's full scale is the range, settled captures hold still
metadata:
  type: feedback
---

Card 8 (2026-10-10), under the six gates' realism ([[first-class-requirements]]): the course's handheld first drew
0.100 V on its 2 V range as "0.100", a 0 in the half-digit cell that cannot show one.

**Why:** a 3½-digit glass has a half digit with only the "1" segments; drawing a 0 there is a display that does not exist,
and the room has these meters in their hands.

**How to apply:** format a reading by counts and the range's point (speckit `lcdStr`): half digit 1 or blank, the three
full digits with their zeros (200 mV range: "05.3"), "OL" past 1999 counts; the bargraph scaled to the range; a dial
switching blanks the display until the new range converts. The settled view (t 99: reduced motion, captures) holds the
last digit still; it wanders only while live ([[instruments-read-live]]).
