```yaml
id: D1-010-03-eye-to-brain
card: "Sense organ, pathway, processor"
module: notes/Day01/010-mcu-reads-2047/en.md
bench: Animation
library: "eye-to-brain: a three.js code library (src/anatomy.js, optics.js, stops.js; capability list C78, made safe by C79)"
dimensions: 3D
stand_in: "the stills as a Figure tour, or the prototype shared in its own window (§13; STATE Q2 waits on the owner)"
optional_benches: [Draw]          # card 4's eye-over-path drawing follows this card; the PLAN keeps it on Draw
real_thing: "the human eye and visual pathway, at their measured sizes, with the Le Grand schematic eye's optics"
minutes: 4.0                      # on the bench; 4.5 with the proposed prediction point (§7b)
card_minutes: 4.1                 # the whole card; 4.6 with the prediction point
status: spec-draft
learner_action: none              # the PLAN has no ASK on this card; §7b and §7c are proposals
predictions: []                   # [s2-focus] if the owner accepts §14 F4
seeds: [S2]                       # planted at s8 (the PLAN's SEED)
key_variable: "where the information is, and in what form: light as far as the retina, signals after it"
time_scale: "per segment: light slowed ≈ 2 × 10⁹ × and ≈ 2 × 10¹⁰ ×; signals slowed ≈ 100 × in the retina and ≈ 1000 × along the nerve; learning compressed"
steps: 10                         # s0–s9 for this card; s10–s12 are a proposal for card 4 (§14 F5)
prototype: bench-work/prototypes/eye-to-brain/index.html
```

The reference spec (U003, 2026-10-08): every later spec copies its shape. It is the first to fill the 3D
rows of the quality bar (B18, section D *Animation (3D)*, §6's Views, Section and Parts tiles). The
prototype beside it (`bench-work/prototypes/eye-to-brain/`) shows the quality this spec asks for and
uses only capabilities the Animation Bench's list names (§12). Every anatomical and optical number is
checked in `bench-work/research/04-eye-anatomy-optics-sources.md`, cited here as **[S n]** (its
reference numbers).

## 1. What the room must understand

- **Statement** (verbatim): *The eye detects light. The optic nerve carries the signal. The brain
  interprets it. What we "see" is the brain's interpretation of the information that light carries, not
  the light itself.*
- **SHOW** (verbatim from the PLAN): *Model — the eye with named parts (cornea, lens, retina,
  photoreceptors, optic nerve) and the visual pathway to the visual cortex, toured in the Flow's order. It
  stands in for the 3D Animation Bench "Vision Library" eye-to-brain sequence (production brief below,
  kept for when that bench exists).*
- **Drive** (verbatim): *one tour stop per Flow paragraph: light in → cornea and lens focus → retina and
  photoreceptors (section view) → optic nerve → visual cortex.*
- **Status** (verbatim): *needs asset: eye + visual-pathway GLB with named parts and a tour (Model Bench
  stand-in); the 3D Animation Bench is specified only (M62).*
- **Production brief** (verbatim, the PLAN's comment): *create and save in the 3D Animations Bench as
  part of the Vision Library. Step-through mechanism so the flow of visual information can be
  sequenced; each stage keyed and pausable so it can be aligned with the slide. Realistic, with zooming
  where it does not distort the visualisation, and zoom into a selected area. Individual parts
  selectable; a selected part opens a modal that highlights it with its explanation. Overlay text to
  highlight and explain particular stages during the lesson.*
- **The PLAN names the Model Bench**, written before the owner's decision that the 3D Bench models and
  the Animation Bench animates (DECISIONS 2026-10-08). This spec's target is the **Animation Bench**;
  the stand-in is a Figure tour of the stills or the prototype itself (§13); the 3D Bench is for CAD
  models (owner, 2026-10-08) and is no longer proposed. The PLAN text is unchanged (§14 F1).
- **Insight**: *light only gets as far as the retina; from there on the information travels as
  electrical signals, and what we see is the brain's interpretation of them, shaped by what it has
  learned.*
- **Look for** (verbatim): *the light stops at the retina; only signals travel on.*
- **Kind of knowledge**: *a process through stages* (light → focus → transduction → transmission →
  interpretation → association), in a *spatial structure* that matters (the section of the eye; the
  crossing at the chiasm). Card test → **Animation Bench**, 3D. Conditional checks: **B15 applies**
  (eye, retina, pathway and cortex are subsystems: each is met in its own stop before the next joins);
  **B18 applies** (3D); B17 applies only to the proposed card-4 faults (normal vs faulty, compared
  stop to stop); B19 does not (no hand skill).
- **Why this bench, not a still**: the point is *where the information is and what form it takes* at
  each moment, and a still shows only one moment. Motion is limited to what carries that: the rays
  travelling and bending (s1–s2), the light being absorbed and the signal leaving (s4), spikes along the
  pathway (s5–s6), links forming (s8). **Why 3D (R31)**: the section through the eye (where the cornea,
  lens and retina sit relative to each other and the rays), the view from inside onto the retina, and
  the chiasm's crossing seen from above are spatial relations a flat drawing distorts or hides.
- **Key variable**: where the information is, and in what form (light, then signal).

## 2. Time

The Flow has 14 paragraphs (p0–p13), 424 words, of which the `[[demo]]` stage direction (23 words, p1)
is not spoken: **401 words = 3.08 min** at 130 wpm. Counted with the script in §8.

| Beat | Minutes | Source of the number |
|---|---|---|
| Flow before the bench: p0 *"The human nervous system…"* (20 words) | 0.15 | 20 ÷ 130 |
| s0 appears (still); the presenter names the six labelled parts (unscripted, ≈ 30 words; the Flow has only the `[[demo]]` cue here) | 0.23 | estimate, 30 ÷ 130 |
| s1 *Light carries information*: p2 (25 words) over 2.6 s of motion and the hold | 0.19 | 25 ÷ 130 |
| s2–s6: p3 (58 words) spoken in three pieces, one per sentence: s2 on sentence 1 (13 words), s4 on sentence 2 (16), s5–s6 on sentence 3 (29); s3 on an unscripted line (≈ 12 words, *"From inside: the jar, upside down."*) | 0.54 | 58 + 12 = 70 ÷ 130 |
| s6 held: p4 (31) and p5 (54) | 0.65 | 85 ÷ 130 |
| s7 *Seeing is not knowing*: p6–p9 (10 + 45 + 10 + 30 = 95) | 0.73 | 95 ÷ 130 |
| s8 *Learning links the senses*: p10–p12 (4 + 52 + 44 = 100) over 6 s of links forming, then held | 0.77 | 100 ÷ 130 |
| SEED S2 at the end of s8 (20 words, *"Hold on to that child and the sugar…"*) | 0.15 | 20 ÷ 130 |
| s9 *The eye as a measurement system*: p13 (18) and the PLAN's ANALOGY spoken (unscripted, ≈ 50 words) | 0.52 | 68 ÷ 130 |
| Waiting on motion not covered by speech (camera moves and the s4/s5 segments overrun their sentences by a few seconds) | 0.17 | estimate ≈ 10 s, from the segment lengths in §4b |
| **Card total / of which on the bench** | **4.1 / 4.0** | |
| Proposed prediction at s2 (§7b): question, answer window, reveal | + 0.5 | estimate |

No step speaks a long Flow paragraph over motion (B13): p4–p5, p6–p9 and p10–p12 fall on held states
(s6, s7, s8 after its links have formed). p3 is spoken a sentence at a time, each over the stop it names.

**Module check.** D1·010 `targetMinutes: 15`. Its Flow is 1,714 words (≈ 1,690 spoken) = **13.0 min**,
leaving 2.0 min for every activity in the module: card 1's prediction with its confidence question
(≈ 1.5 min), card 2's live poll (≈ 1.0), card 7's checkpoint (≈ 2.0), this card's 1.0 min beyond its
Flow (+0.5 with the prediction), and the Draw steps of cards 4–7. **The module overruns by roughly
4–5 minutes before this card's prediction is added.** Reported, not cut (standing rule); U010 measures
it card by card (§14 F9).

## 3. The scene: what is on the bench

**Parts** (stable ids; the prototype's `src/anatomy.js` builds them from these numbers). World units mm.

| id | Part | Real value | Source |
|---|---|---|---|
| `jar` | Jar of sugar, red lid, paper label *SUGAR*; the measurand | 102 mm lid to base, 70 mm wide, **0.30 m** from the cornea | chosen (a kitchen jar); the distance needs 3.3 D of accommodation |
| `cornea` | Clear front window, one solid between two spheres | radii 7.8 / 6.5 mm, 0.55 mm thick, n 1.3771; 11.6 mm across where it meets the sclera | Le Grand [S1–S3]; diameter 11.7 mm measured [S11] |
| `iris` / `pupil` | Brown iris, textured (fibres, crypts, collarette); black pupil | pupil **3.0 mm** (room light); range ≈ 2–8 mm | [S4–S6] |
| `lens` | Crystalline lens, biconvex, equator rounded | relaxed: radii 10.2 / −6.0 mm, 4.0 mm thick, n 1.42, front 3.6 mm behind the apex; accommodated: 6.0 / −5.5, 4.5 mm, n 1.427, front at 3.2 mm; shown at the jar's 0.59 of the way | [S1–S3]; the fraction computed (§8) |
| `ciliary` | Ciliary body with ≈ 70 processes; zonule fibres to the lens equator | — | anatomy texts; drawn, not measured (A6 label) |
| `sclera` | Porcelain-white coat with faint episcleral vessels | outer 24.2 mm across; 0.4–1.0 mm thick | [S9] [S10] |
| `choroid` | Vascular layer under the retina | — | drawn, no number shown |
| `retina` | Orange-red fundus seen from inside: macula darker, vessels from the disc | inner radius 11.0 mm; 0.1–0.3 mm thick | radius chosen so the outer globe is 24.2 mm and the cornea meets it at 11.6 mm (§8); thickness [S12] [S13] |
| `fovea` | Darker pit on the optical axis | ≈ 1.5 mm across | [S13] |
| `disc` | Optic disc (blind spot), pale with a cup | ≈ 1.8 mm across, 15.5° nasal and 1.5° up from the fovea | [S15] [S16] [S17] |
| `vitreous` | Clear gel (pick only; no surface drawn) | n 1.336 | [S1–S3] |
| `rods`, `cones`, `bipolar`, `ganglion`, `rpe` | The retina under the microscope (s4): a strip 0.13 mm wide, light arriving from the vitreous side | layers for the parafovea: RPE 0–12 µm, outer segments 12–40, inner segments 40–70, nuclei 70–140, … nerve-fibre layer 276–292 µm; rod outer segment 25 × 2 µm | [S12] [S13] [S18]; layer depths drawn from Webvision's figures (A6 label: *cells thinned out*) |
| `nerve` | Optic nerve, one per eye, leaving at the disc | ≈ 3.2 mm across, ≈ 50 mm to the chiasm, ≈ 1.2 million fibres | [S27] [S33] |
| `chiasm` | Optic chiasm | ≈ 13 mm wide, 8 mm front to back; ≈ 53 % of fibres cross (from the nasal half of each retina) | [S30] [S36] [S37] |
| `tract`, `lgn`, `radiations`, `v1` | Optic tracts; lateral geniculate nuclei (6 layers); radiations, three paths drawn incl. Meyer's loop; V1 along the calcarine sulcus | — | [S24] [S39] [S40] |
| `brain` | Ghost outline of the two hemispheres, for orientation only | ≈ 170 mm front to back | approximate; labelled *schematic* |
| `recognition`, `memory`, `hearing`, `taste`, `smell`, `touch` | Areas the association links reach (left hemisphere) | — | [S48] [S49] [S24] [S25]; positions approximate (A6 label) |

**Meet the parts** (s0, B3), one line each, shown in the Parts list and read in Scope: *cornea — the clear
front window that does most of the focusing* · *iris and pupil — the opening that sets how much light
gets in* · *lens — fine focus, changes shape* · *sclera — the tough white coat* · *retina — the
light-sensitive lining at the back* · *optic nerve — carries the signals to the brain*. Each part's full
card (C31) is in §6.

**Values beside their element** (B14, B16, C20), mono with units, each computed (§8):
*Cornea 42.4 D of 63.7 D* and *Lens 26.2 D, focused at 0.30 m* (s2) · *5.47 mm tall, lid to base, on
the retina* (s3) · *Rod: −40 mV → ≈ −65 mV, graded, not spikes* and *Spikes → to the optic disc* (s4) ·
the electronic twins as tags (s9) · in Explore, *Out of focus n.nn D, blur ≈ n.nnn mm on the retina*.

**Labels** (B14, D6.5–D6.7): numbered badges on the parts, the names in the Parts list that does not
move; no leaders anywhere (the subject moves). Badges are nudged apart so none collide; a badge whose
anchor faces away fades to 35 % and keeps its place. Numbering is frozen per stop.

**Colours and their second channel** (C4, C65):

| Thing | Colour role | Second channel |
|---|---|---|
| Light from the jar's lid | red ray ink | solid line |
| Light from the jar's base | gold ray ink | dashed line |
| Signals from the right eye | teal | solid trace, round pulses |
| Signals from the left eye | violet | dashed trace, long (capsule) pulses |
| Links made by learning | warm ink | dashed line |
| The pinned part | teal glow on the part | its badge ringed in amber, its name in the panel |
| *Spoiled here* (card-4 proposal) | neutral card | the words *Spoiled here* and the stage name; never red (red means a wrong answer on the wall) |

**Key views** (B18, C24), one press each, *Home* = the current stop's view:

| Key | View | Scene | Used at |
|---|---|---|---|
| 1 | Front (the right eye, face on) | eye | s0 |
| 2 | Light path (from the person's right: jar and eye) | eye + jar | s1 |
| 3 | Section (the right eye cut through its vertical meridian, seen from the nasal side, light from the left) | eye | s2, s10 |
| 4 | Inside the eye (from behind the lens onto the retina) | eye | s3 |
| 5 | Retina close-up (microscopic) | retina | s4 |
| 6 | From above (from behind and above, both eyes at the top) | pathway | s5, s9, s11 |
| 7 | Along the pathway (front-right, above, looking back) | pathway | s6 |
| 8 | Left side (left hemisphere) | brain | s7, s8, s12 |

## 4. The run: step by step, as the Flow goes

### 4a. Steps

| # | id | Flow paragraph (first words) | What changes: the step's one sentence (B5; the `say`) | Overlay for the room (B13) | Presenter's control |
|---|---|---|---|---|---|
| 0 | `s0-meet` | p1 `[[demo]]` (stage direction) | Still and labelled: the cornea, iris and pupil, lens, sclera, and behind them the retina and the optic nerve. | — | Next appears the bench |
| 1 | `s1-light` | p2 *"The human eye receives light…"* | Light from the jar travels to the eye: red rays from the lid, gold rays from the base. Only the light that reaches the pupil is used. | *Each ray carries the jar's shape and colour* | Next |
| 2 | `s2-focus` | p3 s.1 *"The cornea and lens work together…"* | The eye opens in section. Rays bend most at the cornea, again at the lens, and meet on the retina, the lid's rays at the bottom. | *The cornea does about two-thirds of the bending* | Next (holds for the prediction if F4) |
| 3 | `s3-image` | (unscripted) | Inside the eye: the jar's image lies on the back wall, turned upside down, across the fovea. The optic disc beside it has no receptors: the blind spot. | *SUGAR, upside down* | Next |
| 4 | `s4-transduce` | p3 s.2 *"The retina contains specialised light-sensitive cells…"* | Close up, light passes through the clear inner layers and is absorbed by the rods and cones at the back. Their voltage changes, and the signal passes to bipolar cells, then to ganglion cells. | ***The light stops here. Only signals travel on.*** | Next |
| 5 | `s5-nerve` | p3 s.3 *"These signals travel through the optic nerve…"* | Seen from above: spikes leave each eye along the optic nerve. At the chiasm the fibres from the nasal half of each retina cross, so each side of the brain gets the opposite half of the scene. | *About a million fibres in each nerve* | Next; Loop this step (optional) |
| 6 | `s6-cortex` | p3 end, p4 *"So what we see…"*, p5 *"This means that defects…"* | From the LGN the optic radiations fan out to the primary visual cortex at the back of the brain. The Perception panel shows what is seen: the jar, upright. | *What we see is the brain's interpretation* | Next; Loop (optional) |
| 7 | `s7-unknown` | p6–p9 *"But the eye is only one part…"* | The child sees the jar, but the image alone carries no name, no taste, no smell and no feel. The areas that will hold them are still unlinked. | *Seen, but not yet known* | Next |
| 8 | `s8-associate` | p10–p12 *"Learning creates these associations…"* | The name arrives through hearing and links to the image. Taste, smell and touch add their links, and memory keeps them, so the next sight of sugar recalls them all. | *"This is called sugar."* | Next (SEED S2 spoken here) |
| 9 | `s9-analogy` | p13 *"This is a simplified way…"* + the ANALOGY | Each stage gets its electronic twin: the eye is the sensor, the optic nerve the conditioning and wiring, the cortex the converter and firmware, and learning the word "sugar" is calibration. | *Where the analogy breaks: the brain brings memory; a converter brings nothing* | Next leads to card 4 |
| 10 | `s10-organ` **Proposal** | card 4, *"…the sense organ itself…"* | A cloudy lens (a cataract) scatters the light, so the image on the retina is dim and blurred before any signal starts. | *Organ: a cloudy lens* | Next |
| 11 | `s11-pathway` **Proposal** | card 4, *"The transmission pathway…"* | Damage to part of the optic nerve stops some of the signals: a patch of the scene goes missing, though the eye still forms a good image. | *Pathway: a damaged nerve* | Next |
| 12 | `s12-processor` **Proposal** | card 4, *"Finally, the processing system…"* | With the eye and nerve working, a fault in the processing areas changes the interpretation: the jar is seen clearly but not recognised. | *Processor: seen, but not recognised* | Next |

**Keyed points** (shown as the playhead passes; dots on the scrubber): s2 at 0.42 *The cornea meets
air: the biggest change in refractive index*; s2 at 0.56 *The iris sets the pupil: the eye's automatic
gain control*; s4 at 0.06 *Zooming into the retina near the fovea: a strip 0.13 mm wide*; s4 at 0.50
*Absorbed in the outer segments*; s4 at 0.72 *Graded voltage → bipolar → ganglion: spikes*; s5 at 0.62
*Optic chiasm: the nasal fibres cross here*; s6 at 0.30 *Optic radiations, some looping through the
temporal lobe (Meyer's loop)*; s8 at 0.10 / 0.30 / 0.48 / 0.66 / 0.84 *Hearing: the name "sugar"* ·
*Taste: sweet* · *Smell: faint* · *Touch: grainy* · *Memory keeps the links*.

### 4b. Motion, cues and stills per step

Segment lengths at 1× (measured in the prototype by stepping its clock): s1 2.6 s · s2 4.2 · s3 2.6 ·
s4 6.0 · s5 5.0 · s6 4.0 · s7 2.0 · s8 6.0 · s9 2.4 · s10 2.6 · s11 3.0 · s12 2.4 s.

| # | Motion (what moves, how, named pace) | Movers (≤ 2, B7) | Cue and its second channel (B6) | Hold | Under reduced motion it lands as (C3) | Still (B4) |
|---|---|---|---|---|---|---|
| 0 | none | 0 | the six badges | hold | the same | the labelled eye, face on |
| 1 | camera eases to *Light path* (0–0.38); then the rays grow from the jar to the cornea, all at one speed, `normal` | 1, then 1 | the ray fans themselves (red solid, gold dashed); badges on jar, cornea, pupil at the end | hold | rays whole, jar to cornea; overlay | jar, eye and the two fans |
| 2 | camera to *Section* and the cut opens (0–0.34); the rays continue through cornea, iris plane and lens to the retina (0.38–0.95), `normal`; the iris stops the outer rays (drawn fainter) | 1 (camera + section are one linked move), then 1 | keyed points at the cornea and the iris; value chips on cornea and lens at the end | hold | the section open, rays whole to the retina, chips, overlay | the cut eye with converging rays |
| 3 | the cut closes and the camera moves inside (0–0.38); the rays fade out (0–0.4); the image fades in on the retina (0.5–0.85) | 1, then 1 | the image itself; badges on fovea, disc, retina; value chip *5.47 mm* | hold | inside view, image whole, chip, overlay | the fundus with the inverted jar |
| 4 | camera dives to the retina near the fovea (0–0.25), a fade (0.18–0.36) into the microscope view; light falls through the layers (0.32–0.52); outer segments light where it is absorbed (0.46–0.62); the signal trace climbs cone → bipolar → ganglion → axon (0.58–0.9); spikes run along the axon (0.8–1) | ≤ 2 (light + absorption glow; then trace + spikes, linked) | path trace (C40) teal along the chain; the voltage chip appears as the outer segments light; keyed points | hold | the microscope view with outer segments lit, the trace whole, both chips, overlay; no falling light, no spikes | the retina strip with the lit chain |
| 5 | fade from the microscope; camera to *From above* (0.08–0.38) as the brain outline fades in; pulse trains leave both discs and run to the LGNs, nasal fibres crossing (0.35–1), slowed ≈ 1000 × | 1 (all pulses on one clock: linked) | path traces teal solid / violet dashed, left behind by the pulses; the chiasm glows as they cross | hold, or loop on request (C9) | traces whole, no pulses, overlay | both eyes to the LGNs with the four traces |
| 6 | camera to *Along the pathway* (0–0.38); LGN glows; pulses fan out along the radiations to V1 (0.3–0.92); V1 glows (0.8–1); Perception shows the jar (0.85–1) | 1 | traces along the radiations, both eyes' colours; V1 glow; the Perception inset | hold / loop | traces whole, V1 lit, Perception whole | the radiations and V1 lit |
| 7 | camera to *Left side* (0–0.38); the association areas appear faint (0.35–0.9); the V1 → recognition link draws (0.2–0.7) | 1 | the link; Perception shows the jar with *?* | hold | areas and link whole | areas unlinked, jar with *?* |
| 8 | five links draw from recognition to hearing, taste, smell, touch and memory, one per keyed point, each area brightening as its link lands | 1 at a time | each link and its area together (paired cue, C41 *proposed*); the word arriving in Perception | hold | all links and areas whole; Perception lists all five | all five links |
| 9 | camera to *From above*; the twin tags appear one after another (0.1, 0.3, 0.5, 0.7) | 0 (tags appear) | tags on eye, nerve, V1, memory | hold | all four tags | the pathway with the four twins |
| 10 | (proposal) the lens clouds (0.05–0.6); stray light scatters from the lens across the retina (0.35–0.8); Perception blurs and dims | 1 | *Spoiled here* on the lens | hold | cloudy lens, scattered rays, blurred Perception | — |
| 11 | (proposal) pulses run as in s5 but one fibre's stop at the damage; a patch goes dark in Perception | 1 | *Spoiled here* on the nerve; the stopped trace | hold | traces whole, one cut short; the patch | — |
| 12 | (proposal) the recognition area is marked; Perception: *seen, not recognised* | 0 | *Spoiled here* on the area | hold | the same | — |

**Stills**: one per stop, generated from each stop's end state when the bench loads (C16); in the strip
they are grouped *Eye* (s0–s3) · *Signal* (s4–s6) · *Meaning* (s7–s9) · *Card 4* (s10–s12), so each
group stays inside B4's 3–7. Nothing flashes (B8): every glow and pulse is a one-way change or a moving
dot, none blinks; no segment loops unless the presenter turns *Loop this step* on (s5, s6 only), and no
frame is drawn once a step has finished (the prototype renders on demand).

## 5. Pacing and interaction, by surface and view

**Who paces** (B12): on the wall, the presenter; the wall draws the player bar flat (*stop n of 9*, run
state) and is never operated. In Study Mode and Scope, the learner.

| View | Who | Controls (range, default, states) |
|---|---|---|
| Preview (in the slide) | everyone | Back · Next · *stop n of 9* · Home · *Open details* |
| View (details) | everyone | player bar: Back, Play/Pause, Next, Replay, Loop this step (s5, s6), the scrubber (diamonds at stops, dots at keyed points, snaps on release), time, speed 0.1–4× (1× recommended), Stills; stage: Fit, Zoom −/+, Home, the orientation gizmo, *Whole view / Zoomed N %*, *Return to stop* after a live move (C58); dock: Stops, Views, Parts, Section, Cues, Compare, Explore, Ink, Ask |
| Edit (session only, whole wall) | everyone; a student's own copy | hide or fade a part, ink on the stage, a temporary note; banner *Changes are for this session only* (not in the prototype) |
| Authoring (Course Studio) | authors | the code source's import (C78), part names, the thirteen stops with their `say`, overlays, keyed points, cue tracks, key views, the prediction (not in the prototype) |

**Camera** (B18, C24–C27): named views first, one press each. Rotation is local, *Off / Turntable /
Free*; free rotation keeps pitch within 14°–166° from straight up and never rolls; no inertia; *Snap to
key view* on release (off by default). Zoom is a dolly toward the point under the pointer (the field
of view never changes, so nothing distorts); double-click zooms into the clicked spot; the part card's
*Focus* fits the camera to that part. Only a named view travels to the wall.

- **The presenter's strip** (B20, C52): the stop list as text with the current stop in the gold wash;
  the next stop's title and its "what changes"; Back / Play / Next (Next the teal fill; *Reveal* while
  a prediction is open); the eight key views; Home, Labels, Cues, Loop; the teacher tip; the lesson
  timer; the stop's Flow cue on the teleprompter card. No picture of the bench (D8.1). Keys: → or
  PageDown next, ← or PageUp back, Space play/pause, R replay, 1–8 key views, H home, L labels, F fit,
  S stills, Esc unpin.
- **Study Mode and Scope**: the same stops, learner-paced; the stills strip; the step's sentence under
  the stage; Explore unlocks at s9 (the end of the guided pass) or when the teacher unlocks it (B11).
- **Phone** (C6, C66): portrait: the stage on top (56 % of the height), then the stop's title and
  sentence, the stills row, big Back / Next; one finger does nothing on the stage, two fingers pinch
  and pan; value chips and overlays scale down. Fallback where WebGL cannot run: the stills with their
  sentences (C67).
- **Locked**: Explore during the guided pass (until s9 or the teacher unlocks it); the scrubber and
  Next while a prediction waits.

## 6. The frame

| Tile / panel | Used? | Selected item (one large value) | List / contents |
|---|---|---|---|
| Stops | yes | the current stop's title and "what changes" | the stops with numbers, titles, ticks; card 4's proposals set apart; *List / Stills* |
| Views | yes | the current view's name (*Moved view* after a drag) | the eight key views with their keys; *Rotate: Off / Turntable / Free*; *Snap to key view*; *Home view* |
| Parts | yes | the pinned part's card: name, the large value (e.g. *Cornea 42.4 D*, *Optic nerve ≈ 1.2 million fibres*), what it does, *In a measurement:* its twin, *Focus*, *Unpin* | the stop's parts first, numbered as their badges; each with *Shown → Faded → Hidden*; *Labels*, *Isolate*, *X-ray*, *Show all*; *All / By group* |
| Section | yes | the slice (*Side cut through the right eye, 0 mm*) | Section on/off; plane *Side / Top / Front*; depth in five stops (−6, −3, 0, +3, +6 mm) |
| Cues | yes | — | *Cues*, *Spotlight*, *Path trace*; the legend of colours with their second channels |
| Compare | no (priority 2): the faults (s10–s12) against s6's normal state would use it (C61) | — | — |
| Explore | yes, in Study (§7e) | the focus error in dioptres | object distance (25 cm, 30 cm, 50 cm, 1 m, 2 m, 6 m); light level → pupil (2, 3, 4, 5, 7 mm); accommodation On / Off |
| Ink | yes | — | *Laser*, *Ink*, *Clear ink* (ink anchored to a part, C54, is priority 2) |
| Ask | if F4 / F11 | the prediction or the check, and the learner's answer | — |

**Identity bar**: *The eye and the visual pathway · From light to perception · ● Holding · stop n of 9*
(amber), *Playing to stop n*, *Looping stop n*, *Waiting for predictions*, *At the last stop* (green,
s9 only); the segment's time scale beside it.

**Legend card** (bottom left): the colours present at this stop with their line styles; the time scale
for this segment; the stop's simplification in italics (A6).

**Inset — Perception** (C63, bottom right, solid): what the brain has at this moment: *Nothing yet*
(s0–s3), *Signals on their way* (s4–s5), the jar upright (s6), the jar with *?* (s7), the jar with
*sugar · sweet · faint smell · grainy · remembered* arriving with the links (s8–s9); in the proposals,
blurred and dim (s10), a patch missing (s11), *seen, not recognised* (s12). It can be minimised.

## 7. Thinking, not watching

- **7a. The PLAN's ASK**: *none on this card.* The card's thinking is carried by the stops and the
  ANALOGY; the module's activities are on cards 1, 2 and 7.
- **7b. Prediction point** — **Proposal** (F4): at `s2-focus`, 0.70 of the segment, when the rays have
  left the lens and before they reach the retina: *"Where does the image of the red lid land on the
  retina?"* (Top · Bottom · Centre · Nowhere: it is blurred). Answer: **Bottom** (the optics invert
  the image: the lid at +51 mm lands at −2.735 mm, §8). The reveal is the rest of the segment. The
  bench freezes and dims, the identity bar reads *Waiting for predictions*, Next is disabled; the
  presenter has *Reveal*; a learner has *Commit*. Not scored.
- **7c. After the reveal** — **Proposal** (F11): the explain prompt *"Why does the lid's light land at
  the bottom?"* in the Ask panel, free text, never marked. At s4 a pick-the-part check (C47, priority
  2): *"Pick the part where light becomes an electrical signal"* (answer: the rods and cones); the pick
  is recorded and nothing renders a verdict. In Study, done = the ten stops seen and, if F4, the
  prediction committed.
- **7d. Teacher tip** — **Proposal** (F11), on s4: *Learners often think the light itself travels to the
  brain. Ask: what crosses the optic nerve, light or something else?*
- **7e. Explore** (C37, priority 2) — **Proposal** (F11): in Study and Scope after s9, the eye in
  section with the optics recomputed for the learner's settings: distance 25 cm–6 m, pupil 2–7 mm,
  accommodation on/off. Shows: the lens reshaping, the rays re-traced, *Out of focus 4.00 D, blur ≈
  0.200 mm* at 25 cm with the lens relaxed. The Animation Bench computes nothing on the wall; Explore is
  a local Study/Scope feature (C37's surfaces), so the rule holds.

## 8. Faithfulness (the quality bar)

**Arithmetic** (recomputed by the prototype's `src/optics.js`, an exact vector ray trace with Snell's
law through four spherical surfaces; every value below printed by it):

- Le Grand relaxed: cornea **42.36 D**, lens **21.78 D**, eye **59.94 D**; accommodated (lens n 1.427):
  lens 30.70 D, eye **67.68 D** — the published values [S2] [S3] to the last digit.
- Jar at 0.300 m: the bisection finds the lens at **0.590** of the way to the accommodated model;
  eye 63.70 D, lens 26.15 D (shown *26.2 D*), cornea 42.36 D (*42.4 D of 63.7 D*). Power added 3.76 D
  for a vergence of 1 / 0.30 m = 3.33 D (the difference is the principal planes' offset from the
  cornea).
- Cornea's share: 42.36 / 59.94 = **70.7 %** relaxed, 42.36 / 63.70 = 66.5 % focused on the jar:
  *"about two-thirds"* holds for both (overlay of s2).
- Image on the retina: the lid's top (+51 mm) lands at **−2.735 mm**, the base (−51 mm) at +2.735 mm:
  **5.47 mm** lid to base, inverted (s3 chip; the prediction's answer). Magnification 0.0536.
- Biggest bend: at the front of the cornea (Δn = 0.377; the other steps −0.040, +0.083, −0.084 [S3]);
  for a ray entering 1.1 mm off the axis the front corneal surface bends it 2.3°, the back of the lens
  0.7°, the front of the lens 0.3°, the back of the cornea 0.2°.
- Light crossing the eye: optical path 0.55 × 1.3771 + 3.05 × 1.3374 + 4.0 × 1.42 + 16.597 × 1.336 =
  32.69 mm → **0.109 ns** (sources file, §A2–A6). Jar to cornea, 0.300 m in air: 1.00 ns.
- Time scales: s1 shows 1.0 ns in ≈ 2.4 s → ≈ 2.4 × 10⁹, shown *≈ 2 × 10⁹ ×*; s2 shows 0.109 ns in
  ≈ 2.4 s → ≈ 2.2 × 10¹⁰, shown *≈ 2 × 10¹⁰ ×*. Light to V1 ≈ 55 ms [S41]; most of it in the retina and
  at synapses, since the nerve at tens of m/s [S45] [S46] crosses 50 mm in ≈ 2.5 ms: s4's signal
  (≈ 40 ms of retina) in ≈ 4 s → *≈ 100 ×*; s5's nerve-to-LGN conduction (≈ 3 ms) in ≈ 3.4 s →
  *≈ 1000 ×*. Two scales, each on the bench while its motion plays (A5); the contrast is itself the
  teaching point (*the wire is fast, the sensor and its synapses are slow*).
- Geometry: retina inner radius 11.0 mm, centre 13.197 mm behind the apex (24.197 − 11.0); outer sclera
  12.1 mm → 24.2 mm across [S9]; the cornea (R 7.8, centre 5.397 mm in front of the globe's centre)
  meets the sclera where x² + z² = 146.41 and x² + (z − 5.397)² = 60.84 → z = 10.626, x = 5.79 mm:
  corneal diameter **11.6 mm** [S11: 11.7 ± 0.4], corneal bulge 2.57 mm. Disc 15.5° nasal on an 11 mm
  sphere = 2.98 mm of arc from the fovea (the measured 4.76 mm [S15] is along a larger real globe; the
  angle is the measured one [S16]).
- Explore's blur: geometric defocus blur ≈ nodal distance × pupil × focus error, nodal distance
  1000 / 59.94 = 16.68 mm: 3 mm × 4.00 D → 16.68 × 3 × 4 / 1000 = **0.200 mm** (25 cm, lens relaxed);
  3.33 D → 0.167 mm (30 cm); 1 D → 0.050 mm; 0.17 D → 0.008 mm (6 m). The ray spread is *not* shown as
  blur: the schematic eye's spherical surfaces give far more spherical aberration than a real eye's
  aspheric cornea (the relaxed eye at 1 m traced a smaller spread than the focused one), so it would
  mislead.

**Section D, Animation rows**
- [x] Mechanism at every stop checked against a named source: optics [S1–S3]; inverted retina and
  layer order [S12]; graded potentials vs spikes [S24] [S25]; ≈ 1.2 million axons [S27]; 53 % crossing,
  nasal fibres [S30] [S32]; LGN 6 layers, radiations and Meyer's loop [S24] [S39]; V1 on the calcarine
  sulcus [S40]; recognition in inferior temporal cortex [S48]; memory [S49]; taste, smell, touch [S24].
- [x] Motion timing true or its time scale shown per segment (above).
- [x] Every stop matches its Flow paragraph (§4a); every value recomputed (above).
- [x] Simplifications labelled on the bench (A6), the exact words, one per stop in the legend card:
  *Eyelids, muscles and the orbit not shown* · *Two points of the jar, rays in one plane, one eye* ·
  *Rays drawn in one plane; optics: Le Grand schematic eye, focused at 0.30 m* · *The image drawn at
  full brightness; the eye's own image is dimmer and slightly blurred* · *Cells thinned out to show
  them; horizontal, amacrine and glial cells not shown* · *Each nerve drawn as two fibres of about a
  million; brain outline schematic* · *Three paths of the radiations drawn; V1 shown as a strip along
  the calcarine sulcus* · *Areas placed approximately, on the left hemisphere only* · *Links drawn as
  lines between areas; real associations are spread across networks* · *An analogy: it breaks at the
  cortex*.
- [x] *(3D)* Proportions and dimensions from cited sources (§3); materials read as tissue: textured
  brown iris, porcelain sclera with episcleral vessels, clear cornea with a catchlight, amber lens in
  section, orange fundus with arcade vessels, a pale disc with its cup.

**3D view rows (B18)**: named key views first, each one press; *Home* one press (and the stage's home
button, and H); rotation local, constrained (no roll, limited pitch, no inertia, optional snap);
orientation always visible (the gizmo names *Up · Front · Left*, the view name under it; *Vitreous ↑*
in the microscope); a section where the inside matters (s2, s10, and the Section tile).

**A1–A8**: A1 ✓ (§3, [S]); A2 partly: the ideal eye is shown, its non-ideal behaviour is proposed for
card 4 (s10–s12) and Explore's defocus; A3 ✓ (proportions from sources; the brain outline is labelled
schematic); A4 n/a (no instrument); A5 ✓ (per segment); A6 ✓ (above); **A7: one inconsistency found and
fixed in our own capability list, two in the owner's text reported (§14 F6, F7)**; A8 ✓ (this section).

**Checked numbers that must not go on screen** (unverified in [S]): the blind spot's size, the vertical
corneal diameter, peripheral cone outer-segment sizes, the sheathed nerve's diameter, the eyes-to-
occipital-pole distance. None is shown.

## 9. Faults and non-ideal behaviour

**PLAN FAULT**: none on this card. Card 4's PLAN draws the three places on the Draw Bench.

Non-ideal behaviour the bench can show (all **Proposals**):
1. **The three faults of card 4 on the eye itself** (s10–s12, F5): a cataract scattering light [S50]
   [S52]; damage to part of the optic nerve leaving a patch missing (glaucoma, optic neuritis) [S51]
   [S53]; a processing fault in which the object is seen but not recognised (visual agnosia) [S54].
   Each changes Perception; each is the eye-side twin of a measurement fault (sensor, wiring,
   converter and firmware).
2. **Focus error** (Explore): the near jar with the lens relaxed, 4.00 D out of focus.
3. **Light level**: the pupil from 2 to 7 mm changes which rays reach the retina and how far a focus
   error blurs.

## 10. Accessibility, legibility and print

- Wall (C2): overlays 36 px, at the top of the stage on the wall surface (clear of the legend and
  Perception); keyed points 26 px; chips and badges at the stage's scale; the reading column at the
  card's own wall sizes. **Check at 1920 × 1080 and 1024 × 768 on the projector profile before the
  day** (not yet done).
- Reduced motion (C3): every row of §4b lands whole (the prototype's *Motion: Reduced* setting, or the
  system's): no rays travelling, no falling light, no pulses; camera moves become a fade; each stop is
  read from its still, its overlay, its chips and its sentence.
- Colour (C4): every colour has a line style or shape (§3); the pinned part is also named in the panel;
  card-4 marks use words, not red.
- Keyboard (C5): §5's keys; every control reachable; focus rings on buttons and rows.
- Print (C8): the stills with their sentences and values (C23 *Export stills*, not in the prototype).

## 11. Assets to make or source

| Asset | Format | Made by | Status |
|---|---|---|---|
| The eye, both eyes and the pathway, built from the cited numbers | procedural three.js (`src/anatomy.js`) | the author (this project) | **made** (prototype) |
| The prototype's scene as the Animation Bench's code source (C78) | three.js module: `src/anatomy.js`, `src/optics.js`, `src/stops.js` | the author | **made**; a GLB export (C69 clip) remains possible if a clip is preferred |
| A higher-fidelity eye and brain model | GLB from an anatomical source with a licence that allows teaching use (e.g. BodyParts3D, Z-Anatomy; both CC BY-SA, attribution required) | outside source | optional, owner's decision (§14 F2) |
| The ray fans, the retinal image, the micro retina, the links | computed in the bench (prototype) or baked into the GLB as named parts per stop | the author | made (prototype) |
| Stills, one per stop | PNG, generated from the stops | the bench (C16) | made at load in the prototype |
| The thirteen stops, `say`, overlays, keyed points, key views, cue tracks | Animation Bench authoring | the author | written here; the prototype's `src/stops.js` holds them as data |

## 12. Bench capabilities this needs

From the Animation Bench's list (`bench-work/animation-bench-capabilities.md`), all **planned (M62,
noted, not carved)**. Shown working in the prototype unless marked:

- Transport and stepping: **C1** next and hold · **C2** back, landing whole · **C3** play/pause · **C5** stop
  list · **C6** scrubber snapping to stops and keyed points · **C7** speed · **C8** time-scale badge ·
  **C9** loop (s5, s6) · **C10** replay · **C13** keys.
- Stops and stills: **C15** a stop restores its scene · **C16** stills · **C17** meet the parts · **C18**
  what changes · **C19** overlay · **C20** values beside their element · **C21** teacher tip.
- Camera: **C24** key views · **C25** constrained rotation · **C26** orientation gizmo · **C27** zoom into a
  selected area (dolly, never FOV).
- Parts: **C30** select · **C31** part card in the panel (the brief's "modal", decided in the capability
  list §9.3) · **C32** shown → faded → hidden, Isolate, X-ray, Show all · **C34** section · **C35**
  badges + list · **C37** Explore (priority 2).
- Cues: **C38** highlight · **C39** spotlight · **C40** path trace · **C43** cues on/off · **C44** no
  flashing.
- Teaching beats: **C45** prediction point (if F4) · **C46** explain prompt (if F11) · **C47** pick the part
  (if F11).
- Teacher: **C52** presenter strip · **C53** laser · **C54** ink (not anchored to a part in the prototype)
  · **C58** live pause with *Return to stop* · **C60** wall profile (a *Wall* surface in the prototype).
- Comparing: **C63** output panel (*Perception*).
- Accessibility: **C64** reduced motion · **C65** colour never alone · **C66** phone (portrait layout in
  the prototype; touch untested).
- **Not in the prototype**, needed for the card: **C23** print · **C67** phone fallback to stills ·
  **C68** preflight · **C69–C77** authoring (the prototype's stops are code) · **C56–C57** devices
  following the teacher · Edit mode.
- **A capability the card uses that the list should name**: computed content inside a stop (the
  prototype's rays are traced from the optics; a GLB would bake them as parts). **Missing (request
  it)**: either C73's light keyframing extended to *line drawing along a path* (rays and traces as
  animated polylines), or the rule that such lines are baked into the clip in Blender. The prototype
  shows the first is cheap (Line2 with a growing instance count).

**Not this bench's**: modelling the eye (the 3D Bench, M24, if a better model is built); the
eye-over-path drawing of card 4 (the Draw Bench, as its PLAN says).

## 13. Stand-in for the lecture

**The target's source already exists.** The prototype's three.js scene is written to the code-source
contract (capability list C78): it draws everything as a pure function of (stop, progress), declares
its stops, parts, key views and `say` lines as data (`src/stops.js`), and keeps its own timers out of
the picture. When M62 lands, `src/anatomy.js`, `src/optics.js` and `src/stops.js` are the source; the
frame in `src/main.js` is the bench's job and is replaced by it. Owner, 2026-10-08: the Animation Bench
holds anything built with an animation library (three.js, Manim, …); STEP and CAD belong to the 3D
Bench, so the 3D Bench is **not** proposed for this card any more.

The Animation Bench will not exist on Saturday. STATE Q2 waits on the owner; the options, in order of
recommendation:

1. **The ten stills as a Figure tour** (Figure: named parts, spotlight, tour, zoom), from `shots/` or
   regenerated at 1920 × 1080 without the frame. In Studio, mirrored, presenter-driven, safe.
   **Keeps**: B1, B3, B4, B5 (the `say` as the tour's text), B14 (named parts on each still), B16.
   **Loses**: all motion (each stop is its reduced-motion form from §4b, which is still understood from
   its still and text), B18 (no turning, no live section; the section is in the still), keyed points
   (say them), the prediction (ask it aloud before showing stop 2's still).
2. **The prototype in a presenter-shared window outside Studio** (shared on the call as its own
   window). Full motion, every stop, the prediction, Explore. Not mirrored by Studio, so the presenter
   switches windows for this card and back; nothing in Studio computes. The owner's call.
3. **The prototype in a canvas widget inside Studio**: not recommended: a widget is not mirrored (the
   wall would run its own copy and not follow the presenter), it is not in Study, and the wall would
   compute.

(Dropped: a Model Bench tour of a GLB exported from the prototype. The 3D Bench is for CAD models,
owner 2026-10-08.)

The Flow needs no change for any of them; on a stand-in the presenter speaks each stop's overlay.

## 14. Findings for the owner

- **F1 — The PLAN's SHOW names the Model Bench** (STATE Q1), and its Status asks for a GLB for it. With
  the 3D Bench for CAD only, options: (a) change SHOW to *Animation (target; the prototype is its code
  source) — stills as a Figure tour stand in* (**recommended**); (b) leave the PLAN and keep the decision
  in this spec only.
- **F2 — What stands in on Saturday** (STATE Q2): §13's option 1 (**recommended**), 2 or 3. And: keep the
  prototype's procedural eye, or bring in a CC BY-SA anatomical model (e.g. for the brain, attribution
  on the slide) inside the same three.js source?
- **F3 — The production brief's "modal"** is met by the part card in the side panel plus the part's
  highlight (decided, capability list §9.3). No action; noted so the brief and the spec agree.
- **F4 — Proposal: a prediction at s2** (*"Where does the image of the red lid land on the retina?"*,
  answer Bottom), +0.5 min. Add an ASK to the PLAN?
- **F5 — Proposal: card 4's three faults on the Animation Bench** (s10–s12) as well as, or instead of,
  its Draw drawing. They show the faults happening to the eye just toured, which the Draw drawing then
  maps onto the measurement path. Options: (a) keep card 4 on Draw only (the PLAN as written); (b) run
  s10–s12 first, then the Draw drawing (+≈ 0.5 min on card 4); (c) the faults on the Animation Bench only.
- **F6 — Our capability list's sample data disagreed with the arithmetic** (A7): it said *"Light:
  slowed 10¹² ×"* and *"Nerve impulses: slowed 50 ×"*. Computed: ≈ 2 × 10⁹ × (jar to eye) and
  ≈ 2 × 10¹⁰ × (through the eye); ≈ 100 × in the retina and ≈ 1000 × along the nerve (§8). Our own
  file, so it is corrected to match (`animation-bench-capabilities.md` §3a, §4, §7.1).
- **F7 — Our capability list's stop 9 said the faulty processor *"names the sugar salt"***. A processing
  fault of this kind (visual agnosia) means the object is seen but not recognised [S54]; misnaming is a
  different thing. This spec uses *seen, not recognised*; the capability list is corrected.
- **F8 — "The brain turns the image upright."** The Flow does not say it, and nothing on the bench does:
  Perception says *upright* for what is seen, and the sources file's caution 11 is respected. If the presenter is asked, the safe line is: *"The brain's map is laid out so that we see
  the world the right way up."*
- **F9 — D1·010 overruns** its 15 minutes by roughly 4–5 minutes before any proposal (§2). The owner
  cuts; U010 measures it card by card.
- **F10 — Accommodation**: the schematic eye accommodates ≈ 7 D (near point ≈ 14 cm); a 20-year-old has
  ≈ 10 D or more [S7]. The jar at 0.30 m needs 3.3 D, well inside both; Explore's 25 cm needs 4 D. No
  number of the model's range is shown on the wall. Noted for anyone who extends Explore below 15 cm.
- **F11 — Proposals**: the teacher tip (§7d), the explain prompt and the pick-the-part check (§7c), and
  Explore in Study (§7e). Add any to the PLAN?

## 15. Acceptance: how we know it is built right

- The ten stops of §4a (thirteen with F5) play on the wall, the presenter's strip and Study Mode in
  order, each holding at its end, with the values of §8 exactly: *42.4 D of 63.7 D*, *26.2 D, focused
  at 0.30 m*, *5.47 mm*, *−40 mV → ≈ −65 mV*, the four twin tags.
- B1: each press lands one stage. B2: only the rays, the absorbed light, the signals and the links move;
  the camera moves only between stops. B3: s0 still and labelled. B4: a still per stop, grouped 4 / 3 /
  3 / 3, current lit, each a jump. B5: every stop's sentence on the strip and under the stage in Study.
  B6: the path trace runs with the signal (s4, s5, s6); keyed points name what changes as it changes.
  B7: ≤ 2 movers. B8: nothing flashes. B9: if F4, the rays wait for the commitment. B10: if F11, the
  explain prompt after s2's reveal; no verdict. B11: Explore opens only after the guided pass. B12: the
  wall's player bar is drawn, not operable. B13: no Flow text on the bench; overlays are key terms.
  B14: badges and list, no leaders, nothing colliding at 1920 × 1080. B15: eye (s0–s3), retina (s4),
  pathway (s5–s6), cortex and associations (s7–s9) met in turn. B16: the values readable as numbers.
  B18: key views first, Home one press, rotation constrained, orientation always shown, the section at
  s2. B20: the next stop's sentence and the tip on the strip.
- C2: legible from the back row at 1920 × 1080 and 1024 × 768 on the projector profile (to check). C3:
  under reduced motion every stop lands whole and reads. C4: checked under the three colour-vision
  simulations (to check). C5: → ← Space R 1–8 H L F S Esc from a clicker. C6: walked at 320, 768,
  1200, 1440, 1920 (the prototype walked at 390 and 1920 only). **C7: a step to its first frame
  < 100 ms; frame cost < 4 ms on the wall; no frame once a step is finished** — the prototype measured
  **0.8–2.7 ms per frame** for every stop (render + `gl.finish`, median of 15, 1542 × 780 canvas,
  GeForce GTX 1050 under ANGLE/D3D11, three.js 0.185.1); it renders only while something moves. **To
  repeat on the lecture laptop.** C8: the print form.
- E1–E6 for the built bench.
- The stand-in (§13) checked on the lecture laptop before Saturday, both themes, with the overlays'
  words in the presenter's notes.
