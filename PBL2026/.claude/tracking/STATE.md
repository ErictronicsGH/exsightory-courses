# PBL2026 — state

Cross-unit facts: dates, budgets, standing rules, open questions. Consulted, not read every session.

## Dates

- **Course:** Sat 10 – Mon 12 Oct 2026, live online, 12:00 GMT start; each day 300 min of content
  plus two 15-min breaks (`scheduledMinutes` in `course.yaml`). `training-overview.md`'s header
  says 9–11; 10–12 is correct.
- **ExSightory registration opens** 2026-10-09 (InsightDemo memory).
- Today's work started 2026-10-08.

## Budgets

- Module minutes are the `targetMinutes` in each `en.md`; day totals are exactly 300.
- A bench spec's minutes come out of its module's budget and say where they come from (the card's
  share of the Flow, the demo's drive steps, the learner action's time).

## Bench status (as recorded 2026-10-07/08; verify before relying on it)

| Bench | State | Notes |
|---|---|---|
| Electronics | in progress (M25, redesign 2026-10-07) | DC only today: no op-amp, switch, ADC block or scope |
| Draw | nearly done (M59) | Wall plays trace only; other animations wait for M59n. See `draw-bench-status.md` |
| Equation, Plot, Figure | exist | |
| 3D Bench (M24) | exists | **For modelling**, not animation |
| Animation (M62) | noted, not sized, not carved | One bench for 2D and 3D (owner, 2026-10-08). Capabilities: `bench-work/animation-bench-capabilities.md`. Six course cards target it |
| Coding | planned | For all firmware demos |
| Signal Bench | noted | ADC sampling and quantization (owner's working name "process bench") |

## Standing rules

1. Never trim the owner's content; report overruns.
2. Natural order along the measurement path; every module hands off to the next.
3. Every bench has four views: Preview, View, Edit, Authoring (InsightDemo, 2026-10-07).
4. The wall computes nothing; a presented bench is the presenter's to drive.
5. Animation (2D or 3D) is the Animation Bench's, one bench for both; the 3D Bench models. A process
   moving through stages → Animation Bench; a picture built up step by step → Draw Bench.
   The Animation Bench takes anything built with an animation library (three.js, Manim, …); STEP files
   and CAD are the 3D Bench's (owner, 2026-10-08).
6. Research the teaching need before listing a bench's features.
7. Quality bar: `standards/bench-quality-bar.md`.

## Open questions

1. **D1·010 card 3's PLAN** says `SHOW Model — the eye … stands in for the 3D Animation Bench`, and
   `elements-by-section.md` counts it as *Model Bench ×1*. With the owner's correction, should the
   PLAN name the Animation Bench as its target (keeping a still or a Model stand-in only for
   Saturday if M62 is not built)? The text was not changed. Recommendation and options:
   `bench-work/specs/D1-010-03-eye-to-brain.md` §14 F1.
2. **What stands in for the eye on Saturday** if the Animation Bench is not ready: a canvas embed of
   the prototype, stills, or the Draw Bench's three-stage drawing alone. The spec (§13, §14 F2)
   recommends the stills as a Figure tour, or the prototype shared in its own window (the owner's
   call); a canvas widget is not mirrored and would make the wall compute. The 3D Bench is for CAD
   and is no longer proposed (owner, 2026-10-08).
3. **D1·080 card 5 (SAR) truncates; the module's Plot rounds.** The SAR's trial levels at whole codes
   give 2.17 V → 1010 (2.063 V); the centrepiece Plot's q·round(x/q) gives 11 (2.269 V); the module's
   FAULT calls truncation a −½ LSB offset. Options and arithmetic in
   `bench-work/specs/D1-080-05-sar-binary-search.md` §14 F1 (recommended: keep the numbers, label the
   bench *"this converter truncates"*). The text was not changed.
4. **D1·080 card 5's Flow** still says *"[[demo]] Widget: a SAR conversion animated…"*; the PLAN says
   Draw (target Animation). Update the cue? Same spec, §14 F2; proposals F3–F6 there too.
5. **D1·010 card 3's proposals** (spec `D1-010-03-eye-to-brain.md` §14): F4 a prediction at s2 (+0.5 min);
   F5 card 4's three faults also on the Animation Bench (s10–s12); F11 the teacher tip, explain prompt,
   pick-the-part check and Explore. And F9: D1·010 overruns its 15 min by ≈ 4–5 min before any of them.
6. **Pre-course checks on the lecture laptop** (before Sat 10 Oct): the eye prototype's frame rate and
   the chosen stand-in for D1·010 card 3 (spec `D1-010-03-eye-to-brain.md` §15); both themes; the wall
   at 1920 × 1080 and 1024 × 768.
7. **Raise with ExSight (InsightDemo): code libraries on the Animation Bench.** The owner decided
   (2026-10-08) that three.js and other animation libraries are code, made safe by the layers in the
   capability list's C79 (built in the bench, inspected, sandboxed, deterministic, digest-pinned,
   watched). InsightDemo's standing rule since 2026-09-01 is *"a library is data and never code"*, and
   its 2026-10-03 decisions refuse a downloadable plugin. This project does not edit InsightDemo; the
   departure goes to ExSight as the owner's decision when M62 is carved.
8. **D1·010's other bench cards (U010).** **Decided 2026-10-08** as recommended (DECISIONS): card 1's
   F1–F4, F9; card 5's F1, F2, F6, F7; card 4's F4; card 7's F1. **Still open**, in each spec's §14:
   the proposals (teacher tips, predictions, card 1's s3 and FAULT-in-070, card 5's invariant and domain
   steps, card 6's Drive/Look for, card 7's 2047 tag, named stages, own marks); card 5 F4 (measure the
   row's legibility when drawn); card 7 F2 (S4 said twice) and F3 (where the checkpoint fires).
   **D1·010 runs 20.7 min against 15** (card 1's §2): the owner cuts.
9. **D1·020's bench cards (U011).** **Decided 2026-10-08** as recommended (DECISIONS): card 5's values and
   cue, card 8's meter, third example and separate Figure card, card 9's cue and no N graph. **To do**: design
   our own realistic, unbranded meter face and spec table (render it first); write the Figure card after card 8 (heading, statement, `figure` block);
   confirm in Studio that card 5's targets show during the multi-select. **Still open**: card 7 F1
   (environmental error pinned at SENSOR only?), card 8 F1 (symbol letters V and q), and every spec's
   proposals. Card 3 (Electronics) deferred. D1·020 ≈ 28.9 min against 30.
10. **The 2D eye animation, accepted (U035, 2026-10-08), with small items left open**: stop 13's analogy card
    covers the *You are here* title; stop 7's note describes short sight with long sight selected; stops 9c–12's
    radiations run through the *Hearing* and *Recognition* labels; stop 8's inset label sits on the jar; the help
    line overlaps the eye at stops 3, 7, 8; the glances (B2) undecided; `D1-010-03-eye-to-brain.md` not yet
    rewritten for the 2D animation. Details: `archive/done_U035_…`.
11. **D1·040's specs (U013) await the owner**: card 1 F1–F5 (SOURCE & LOADING as a band; the module ≈ 21 min
    short of 45; PLAN lines missing from the Flow), card 4 F1–F4, card 6 F1–F6, card 7 F1–F5. Previews:
    `bench-work/previews/u013-preview.html`.
12. **D1·060's specs (U015) await the owner**: card 2 F1–F5 (isolation's place; the module ≈ 21 min short of 40), card 3
    F1–F3 (G open-loop vs closed-loop), card 4 F1–F5 (no `[[ask]]` for its POE, the S11 line, "warms up" tenfold), card 5
    F1–F4, card 7 F1–F5 (80 dB low for an in-amp at G = 100), card 8 F1–F4 (**"a third" vs 30 %**), card 9 F1–F6. Card 6's
    Electronics widget deferred. Previews: `bench-work/previews/u015-preview.html`. X19 to raise.
13. **D2·010 card 8's blocks B and C (crossing 516's answer, 2026-10-21)**: the Animation Bench's import (C69) is not
    built, so a sequence cannot hold card 8's Draw drawing (B) and Figure tour (C). Benches asks the owner to take the
    fallback now: B and C as their own blocks on the card (a Studio multi-block card), with A and A′ as the `logic-io`
    sequence's units either side; B058 builds A and A′ either way. Spec `D2-010-08-two-outputs.md` to follow the answer.
