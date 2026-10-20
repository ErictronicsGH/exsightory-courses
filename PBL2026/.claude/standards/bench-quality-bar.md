# The bench quality bar

**Revised 2026-10-08 (U002)** from the Animation Bench research (`bench-work/research/01–03`) and
ExSight's design rules (`.claude/standards/bench-design-rules.md`, cited **D**n.n). Research
requirements are cited **R**n (`01-learning-science.md`), product ideas **P**n (`02-product-survey.md`
§3), the capability list **C**n (`bench-work/animation-bench-capabilities.md`). Where the research and
the design rules disagree, the design rules win (DECISIONS 2026-10-08).

The owner's words (2026-10-08): bench activities are *"intended for quality visualization and learning
purposes so it must always be implemented the best way that will foster interactivity, intuition,
insight and understanding and also they should look nicer, and great. The target is to capture above
95 % reality in the visualization so that our virtual benches are not much different from the real
world."*

"95 % reality" cannot be measured with a meter, so this file turns it into checks. A spec passes when
every applicable check is ticked in its §8 and §15, or its exception is written down with a reason.
A check marked *(if …)* applies only when its condition holds; say *n/a* and why when it does not.

## A. Faithful to the real thing

1. **Real values, real units, sourced.** Every number on the bench is the real part's or the real
   phenomenon's (a datasheet, a standard, a textbook, a measurement), and the spec names the source.
   Values carry unit, SI prefix and honest precision, ≤ 4 significant figures (D6.14).
2. **Real behaviour, including the non-ideal.** Tolerances, loading, offsets, noise, saturation,
   settling and failure behave as the real thing does. A bench that only shows the ideal case is not
   faithful. The ideal case is shown beside the real one, never instead of it.
3. **Real proportions and appearance.** Shapes, sizes, materials and colours match the real object or
   instrument. **Real, not branded** (owner, 2026-10-08): nothing the room sees names a maker, product or
   part number; our own design of an instrument or part, drawn to its class's look and behaving to its
   class's specification, counts as real. The spec cites the product or datasheet its values come from.
4. **Real instruments read like real instruments.** A meter shows the digits, ranges and resolution
   its real counterpart shows, and loads the circuit the way it does.
5. **Real time.** Durations are true, or the time scale is on the bench for as long as the motion is
   (*"slowed 10⁶ ×: a real conversion takes 2 µs"*) (R7, C8).
6. **Every simplification is labelled on the bench, in the words the room will read** (*"4 bits for
   teaching; the real converter decides 10 the same way"*, *"colour-coded for teaching"*, *"not to
   scale"*). An unlabelled simplification is a fault.
7. **Consistent with the rest of the course.** The bench's numbers agree with every other card that
   uses the same quantity (the same converter, the same input, the same rounding). A disagreement
   found in the owner's text is reported in the spec's §14, never fixed silently.
8. **Checked against sources** for the bench kind (section D), listed in the spec.

## B. Built the best way for understanding

| # | Check | From |
|---|---|---|
| B1 | **One idea per step, and steps end at causal boundaries**, never at fixed intervals. Each step holds at its end until the presenter (or learner) moves on. | R4 (Rey et al. 2019; Spanjers 2010; Mayer & Chandler 2001), C1 |
| B2 | **Only the change that teaches moves; everything else is still.** No decorative motion, idle loops, music or eye candy. The spec names the one variable that carries the insight. | R1 (Tversky et al. 2002; Ploetzner 2020), R20, D7.9, D7.14 |
| B3 | **Meet the parts first**: step 0 is still and labelled, one line of function per part, before anything moves or is asked. | R18 (Mayer, Mathias & Wetzell 2002), C17 |
| B4 | **The previous state stays visible**: a still per step (3–7 for a sequence), on the bench or a strip beside it, current one lit, each a jump target, and printable. | R2 (Arguel & Jamet 2009; Hegarty et al. 2003), C16, C23 |
| B5 | **Each step has a written "what changes" sentence**: the step's name on the presenter's strip, read aloud in Scope, the text form for print and screen readers. It is the Draw Bench's `say`. | R42, D10.7, M59 `say` |
| B6 | **The eye is led.** What changes is cued at the moment it changes (highlight, spotlight with the rest dimmed, a label arriving), and where there is a causal chain the cue **travels along it** (path trace; cause and effect lit together). Arrows alone are not enough. | R11 (Schneider et al. 2018, g = 0.53 retention), R12 (Boucheix & Lowe 2010; de Koning 2009), C38–C41 |
| B7 | **The most relevant thing is the most salient.** No more than **two independent movers at once** (linked motion counts as one); more needs a reason in the spec. Secondary motion is quieted. *(Our working threshold; the research says "flag more than N".)* | R13 (Lowe 2003), C42, C75 |
| B8 | **Nothing flashes.** Over 3 flashes a second is refused; pulses stay under 1 Hz and low. | R15 (Schneider 2018: flashing g = −0.56), WCAG 2.3.1, D7.12 |
| B9 | **Predict before the reveal** wherever there is something to discover; the reveal waits for the commitment. A bench that shows a result never declares `commitment: none`. | R25 (Crouch et al. 2004), invariant V, C45 |
| B10 | **Thinking, not watching**: an explain prompt or a check after the reveal; in Study, done means answered, not watched. Nothing renders a verdict. | R26, R28 (Paik & Schraw 2013), invariant VI, C46–C47 |
| B11 | **The learner can drive the variable that carries the insight**, one control away (one slider and one question beats five sliders), and what-if exploring opens **after** the guided pass, not instead of it. | R29 (Schnotz & Rasch 2005; Lowe 2004), C37 |
| B12 | **Who paces**: on the wall the presenter paces, and the wall draws the bench's state flat, never operable; in Study Mode and Scope the learner paces with simple controls (step first, more behind *More*). | R5 (Hasler et al. 2007), R6 (Berney & Bétrancourt 2016), R38, D8.1–D8.3 |
| B13 | **Words on the bench are key terms and values only.** The narration (Flow) is never put on screen while it is spoken; captions are a per-viewer choice, off on the wall. A long Flow paragraph is spoken over a held state, not over motion. | R10 (Leahy & Sweller 2011), R21 (redundancy), C22 |
| B14 | **Labels sit on or beside their part at the moment of the event; values sit beside their element.** No separate legend for names. On anything that moves: numbered badges and a list that does not move; leaders only on stills. | R19 (contiguity), D6.3–D6.7, C20, C35 |
| B15 | **Build compositionally** *(if the scene has more than one subsystem)*: each subsystem alone first, then together. | R14 (Lowe & Boucheix 2016) |
| B16 | **Three representations**: the picture, its values as text, and the controls that change it; the current state is readable as numbers. | D10.7, R8 |
| B17 | **Side by side or linked** *(if the insight is a contrast between two states or a relation between two representations)*: both visible at once, sharing one clock or cursor. | R23 (Ploetzner & Lowe 2014), R24, C61–C62 |
| B18 | **The right view** *(if 3D)*: 3D only where spatial relations are the goal; named key views first, each one press, *Home* always one press away; free rotation secondary and constrained (no roll, limited pitch, snaps back); orientation always visible; a cut or section where the inside matters. | R31 (Yammine & Violato 2015), R32 (Levinson 2007), R33–R35, R37, C24–C26, C34 |
| B19 | **Procedures shown as procedures** *(if the card teaches a hand skill: probing, wiring)*: the hands or tool in view, first-person. | R3 (Höffler & Leutner 2007, d = 1.06) |
| B20 | **The presenter has what they need without looking at the bench**: the next step's title and "what changes" as text, a teacher tip naming the misconception, keys on the clicker. | P17, P18, C21, C52, D8.1 |

## C. Finished, and works everywhere

| # | Check | From |
|---|---|---|
| C1 | **Designed to ExSight's rules**: the bench's frame (D4.3–4.5), tokens and roles never hex, both themes, ES-UI components, an icon on every control. | D2, D4, D5, D13.6 |
| C2 | **Legible on the wall**: anything the room reads at 32 pt and 7:1 (10:1 high contrast), flat on a projector profile, rendered at 1920 × 1080 and 1024 × 768; no label collision at 1920 × 1080. | R40, D10.1, D4.7, D6.17, C60 |
| C3 | **Reduced motion**: nothing starts without a visible pause; under `prefers-reduced-motion` each step **lands whole** and is still understood from the stills, values and "what changes" alone; view moves become fades. | R41, WCAG 2.2.2, D7.5, D7.7, C64 |
| C4 | **Colour is never the only signal**: every colour in the legend names its second channel (outline, dash, pattern, glyph, label), checked under protanopia, deuteranopia and tritanopia. | R43, D10.3–D10.4, C65 |
| C5 | **Keyboard and clicker**: every control reachable; Space, arrows, Page Up/Down at least; keys shown in tooltips; visible focus. | R44, D10.6, C13 |
| C6 | **Phone**: portrait first (bench, then the step's title and description, then the stills, then big Back / Next); 44 px targets; **one finger does nothing on the stage**, two fingers pinch and pan; hover hides nothing; a fallback to stills where the bench cannot run. Walked at 320, 768, 1200, 1440, 1920. | R45, D9.4–D9.10, C66–C67 |
| C7 | **Within budget on the weakest lecture machine**: step to first frame < 100 ms p95; frame cost on the wall < 4 ms; no frame once a step is finished; no infinite animation on the presenter's window; assets within their limits (GLB ≤ 20 MB, first frame < 2 s). | D11.1–D11.5, D7.9 |
| C8 | **A print form**: a re-layout (stills plus their descriptions and values), not a screenshot. | D4.24, C23 |

## D. Faithfulness checklist, by bench kind

Each spec fills the rows for its target bench (and its stand-in, if the stand-in shows numbers).

**Electronics**
- Every part is a real part: value from its E-series, tolerance, power rating, package; the source names
  a part number or datasheet.
- Sources have their internal resistance; supplies and references their tolerance and drift.
- Meters use a real meter's profile: counts, ranges, resolution, accuracy ±(% + digits), input
  impedance (e.g. 10 MΩ on DC volts), burden voltage per current range.
- Every revealed effect (loading, burden, self-heating, offset) matches a hand calculation written in
  the spec, to the digits the meter shows.
- Damage and limits come from absolute maximum ratings.
- Drawn in IEC symbols, EveryCircuit's look (D12.4–D12.10); moving current's speed and brightness
  follow its size.

**Draw**
- Proportions come from the real object or a cited diagram; otherwise the drawing says *not to scale*.
- Engineering line types used correctly (outline, thin, hidden, centre, construction); IEC symbols.
- Curves are drawn from their equation (`function`), never by hand, and the equation is in the spec.
- Every step's `say` matches its Flow paragraph; no construction line left after the last step.
- Numbers written on the drawing are recomputed in the spec.

**Plot**
- The expression is the physics (named, with its source), not a lookalike.
- Axis ranges, units and slider ranges are real (they cover the parts this course uses).
- One worked value is checked at a stated point in the spec.
- The plot itself adds no artefacts: enough points that a step stays a step and a sine stays smooth;
  a discontinuity is drawn as a jump, not a slope.

**Equation**
- Symbols match the course glossary and the other cards; units carried through every line.
- Every worked example is recomputed in the spec to the significant figures shown.
- Slider ranges real; a graph beside it obeys the Plot rows.

**Figure**
- The real document or photograph, cited, licence noted; legible at 1920 × 1080 when zoomed to its
  named targets.
- Named parts land on the right features; nothing the point depends on is cropped away.
- A redrawn figure says *redrawn from …*.

**Coding**
- The code compiles for the named MCU with a named toolchain version.
- The numbers it prints are what the real board prints (a recorded run, or the arithmetic shown in the
  spec), including integer widths and overflow true to the target (`int` is 16 bits on AVR).
- Timing (loop rate, conversion time) from the datasheet; register and peripheral names real.

**Animation**
- The mechanism at every stop is checked against a named source.
- Motion timing is true, or the time scale is shown for each segment, with the real duration and its
  source.
- Every stop matches its Flow paragraph; every value at a stop is recomputed in the spec.
- What is simplified (fewer bits, fewer fibres, colour-coded signals) is labelled on the bench (A6).
- *(3D)* proportions and dimensions from a cited source; materials read as the real tissue or part.

**3D (modelling)**
- Dimensions from drawings or datasheets (package outlines, mechanical drawings); a scale shown.
- Materials and finishes as the real object.
- Joints have the real degree of freedom and its limits; the explode order is the real assembly order.

## E. Done when built (ExSight's definition of done, D13)

A spec's §15 lists these for the built activity, with the checks above:

1. Driven in the built app with somebody pressing the controls, in both themes (D13.1, D13.4).
2. The wall checked at 7:1 on projector and screen profiles, both themes; beat advance within budget
   with encryption and recording on; driven in two windows and with one display (D13.2).
3. The bench's controls on the bench, none in the rail (D13.2).
4. Scope driven at phone width and desktop; no verdict on a teaching surface (D13.3).
5. Rendered at 1920 × 1080 and 1024 × 768, every pane; walked and measured at 320, 768, 1200, 1440,
   1920 with no horizontal scroll (D13.4–D13.5).
6. Any new mirrored view key added in all four places (D13.9).

## Where each research requirement went

The research's 45 requirements, sorted: those that apply to any bench are checks here and fields in
the template (`bench-spec-template.md`, cited T§n); those specific to the Animation Bench or the
platform stay in the capability list.

| R | Requirement | Applies to | Here | Template |
|---|---|---|---|---|
| R1 | Animate only the change that teaches | any bench | B2 | yaml `key_variable`; §1, §4b |
| R2 | Stills beside the motion | any stepped bench | B4 | §4b *Still*; §10 |
| R3 | Procedures first-person | if a hand skill | B19 | §1 *Kind of knowledge* |
| R4 | Segments at causal boundaries | any bench | B1 | §4a |
| R5 | Learner sets the pace in self-study | any bench | B12 | §5 |
| R6 | Teacher sets the pace on the wall | any bench | B12 | §5 |
| R7 | Speed and a stated time scale | any bench with motion | A5 | yaml `time_scale`; §4b |
| R8 | Frame and logical stepping; state as numbers | any bench | B16 | §3 *Values*; §5 |
| R9 | Loop and replay a segment | Animation, Draw (Replay) | — | §4b *Hold* (C9, C10) |
| R10 | Short narration per segment | any bench | B13 | §2, §4a |
| R11 | Cueing layer | any bench | B6 | §4b *Cue* |
| R12 | Cues along the causal path | any bench | B6 | §4b *Cue* |
| R13 | Salience; few movers | any bench | B7 | §4b *Movers* |
| R14 | Compose subsystems | if several subsystems | B15 | §4a |
| R15 | No flashing | any bench | B8 | §4b |
| R16 | Live pointing and ink | platform (presenter tools) | — | §6 (Ink tile) |
| R17 | Record the pointer trace | Animation (C59) | — | — |
| R18 | Meet the parts | any bench | B3 | §3, §4a step 0 |
| R19 | Labels at the part, at the moment | any bench | B14 | §3 *Labels* |
| R20 | Coherence | any bench | B2 | §4b |
| R21 | No full narration on screen | any bench | B13 | §4a *Overlay* |
| R22 | Guided and expert modes | Animation (C50) | — | — |
| R23 | Side by side | if a contrast | B17 | §1 |
| R24 | Linked representations | if a relation | B17 | §1, §6 |
| R25 | Predict before reveal | any bench | B9 | §7 |
| R26 | Self-explanation | any bench | B10 | §7 |
| R27 | Learners sketch | Animation (C51), Study | — | — |
| R28 | Check understanding | any bench | B10 | §7 |
| R29 | What-if after the guided pass | any bench | B11 | §5, §7 |
| R30 | Worked examples with fading | Animation (C49) | — | — |
| R31 | 3D where spatial | 3D | B18 | §1 *Why this bench* |
| R32 | Key views | 3D (framings in 2D) | B18 | §3 *Key views* |
| R33 | Constrained rotation | 3D | B18 | §5 |
| R34 | Orientation visible | 3D | B18 | §6 |
| R35 | Sections linked to 2D | 3D | B18, D 3D | §3 |
| R36 | Depth cues | 3D | D 3D/Animation | §8 |
| R37 | Low-spatial support | 3D | B18 | §3 *Key views* |
| R38 | Presenter screen beside a clean wall | any bench | B12, B20 | §5 |
| R39 | Devices follow the teacher | platform (C56–C57) | — | §5 *Scope* |
| R40 | Wall legibility | any bench | C2 | §10 |
| R41 | Reduced motion | any bench | C3 | §4b *Reduced motion*; §10 |
| R42 | A description per segment | any bench | B5 | §4a *What changes* |
| R43 | Colour-blind safe | any bench | C4 | §3 *Colours*; §10 |
| R44 | Keyboard and clicker | any bench | C5 | §5 |
| R45 | Phone | any bench | C6 | §5 *Phone* |
