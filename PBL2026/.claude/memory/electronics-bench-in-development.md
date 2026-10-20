---
name: electronics-bench-in-development
description: The Electronics Bench is being built now (2026-10-08); don't spend spec effort on its gaps or stand-ins — defer Electronics cards, focus on the other benches
metadata:
  type: feedback
---

Owner, 2026-10-08, during U011: *"electronics workbench is under development right now so focus on other
things"*. Said after D1·020 card 3's spec found that R4 could not be set live and proposed a Draw
stand-in.

**Why:** ExSight is building the Electronics Bench now (M66: the knob, edit live, the analysis panels…),
so gaps found today may close before the course, and stand-ins for it are wasted work.

**How to apply:**
- In a module unit, write specs for the **other** benches' cards first (Draw, Plot, Equation, Figure,
  Animation, Coding). List each Electronics card in the unit's progress and in `bench-work/README.md` as
  **deferred (Electronics in development)**, with no spec, unless the owner asks.
- Do not propose Draw or other stand-ins for Electronics cards, and do not hunt its missing capabilities.
  Specs already written (D1·010 card 1, D1·020 card 3) stay; their stand-in and gap findings are parked.
- **Deferred means the Electronics Bench widget, not the card.** The card still gets its demonstration on another bench
  ([[visualize-every-card-in-lecture-order]]): D1·020 card 3's PLAN widget (the bridge) is deferred, but its
  demonstration `direct-indirect-null` was built and accepted (2026-10-08/09). Never report such a card as "deferred"
  (2026-10-10: I did, and the owner had to ask why).
- Numbers an Electronics card shares with other cards (the cold open's 2047, the bridge's readings) are
  still checked where those other cards use them. Related: [[authoring-first-specs-per-activity]].
