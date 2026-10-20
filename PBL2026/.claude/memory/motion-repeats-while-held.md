---
name: motion-repeats-while-held
description: A view showing a continuing process (a control loop, a machine) keeps cycling after its words while the presenter holds it, never a one-time run that freezes
metadata:
  type: feedback
---

Owner, 2026-10-11, on D1·030 card 2's servo view: *"the stepper motor animation should repeat not a one time and the physics and
electronics should be accurate"* (the "stepper" is the micro servo). Done: after the words the lamp goes down and up every 12 s
and the shade turns out and in with it, for as long as the view is held (the bench's clock runs on while holding).

**Why:** a still loop after one run looks like the device stopped; a process that keeps acting shows the behaviour, and gives
the presenter time to talk over it.

**How to apply:** when a view's subject is a process that would keep running, drive it from the view's time with a cycle
after the narrated part (keep the narrated part as written so labels and cards stay true; the cards' text follows the state:
e.g. regulating / turning out / at rest). Put the cycle's phase so the settled view (t 99, captures and reduced motion) lands
in the representative state. Model the real device's limits (speed, dead band, response) so the repeated motion is honest.
Related: [[views-arrive-at-first-frame]], [[instruments-read-live]], [[drawing-and-numbers-agree]].
