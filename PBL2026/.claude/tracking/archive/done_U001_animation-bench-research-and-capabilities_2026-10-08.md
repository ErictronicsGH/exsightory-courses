---
id: U001
title: Animation Bench — research what a teacher needs, then list the capabilities for the UI renders
status: done
depends_on: []
refs:
  - D:\@Projects\2026\InsightDemo\.claude\implementation\milestones\M62-animation-bench.md
  - D:\@Projects\2026\InsightDemo\.claude\memory\every-bench-has-four-views.md
  - D:\@Projects\2026\InsightDemo\Education Research\PEDAGOGICAL-CHARTER.md
  - notes/Day01/010-mcu-reads-2047/en.md (card 3's production brief)
---

## Goal

Owner, 2026-10-08: *"first you have to research what will be needed when a teacher is teaching with
an interactive animation bench … the animation can be 2D or 3D … the controls, pauses, stepping
animation for process flow etc. then you list the capabilities that we need so that i will give the
data chatgpt to render the ui."*

So the unit ends with two files:

1. `bench-work/research/animation-bench-teaching-research.md`: what the evidence and the existing
   tools say a teacher (presenting) and a student (self-study) need from an interactive animation
   bench, in 2D and 3D, with sources.
2. `bench-work/animation-bench-capabilities.md`: the capability list, organised so the owner can
   hand it to ChatGPT to render the UI: surfaces, the four views, every control and its states, and
   sample data (the eye-to-brain sequence) to draw it with.

## Why now

The eye-to-brain card (D1·010 card 3) was going to be prototyped on the Model Bench. The owner
corrected that (2026-10-08): **the 3D Bench is for modelling; animation goes to the Animation Bench**
(M62, noted and not carved), and the bench's features come from research first. The capability list
is also what M62 §5's six open questions need before it can be sized.

## Acceptance criteria

- [x] Learning-science evidence on instructional animation gathered (segmenting, pacing, cueing,
      transient information, 3D and spatial ability, predict–observe–explain), each finding tied to
      a bench feature, with sources.
- [x] Existing tools surveyed (3D anatomy viewers, PowerPoint/Keynote, Rive/Lottie, PhET, H5P,
      mozaWeb and others) for their teacher- and student-facing features.
- [x] ExSight's own rules applied: four views, the wall computes nothing, the presenter owns a
      presented bench, reduced motion, budgets, the pedagogical charter.
- [x] The capability list covers 2D and 3D, presenting and self-study, and is grouped by surface
      and view, with every control's states, ready to paste into ChatGPT.
- [x] This course's animation needs are listed against the capabilities, so nothing it asks for is missing.
- [x] ExSight's bench design rules are digested into `.claude/standards/bench-design-rules.md`, and
      the capability list obeys them from the start (owner, 2026-10-08: *"also check the bench design
      rules so we can integrate from the start"*).

## Out of scope

Building the bench or the eye prototype (U003). Carving M62 in InsightDemo (that is the product's
Core lane, and the owner's call).

## Progress

- 2026-10-08: three research agents launched (learning science; product survey; ExSight's
  constraints and this course's animation needs). Synthesis follows when they report.
- 2026-10-08: a fourth agent is digesting ExSight's design guidelines and bench standards into
  `.claude/standards/bench-design-rules.md` (owner asked for the design rules from the start).
- 2026-10-08: saved `bench-work/research/01-learning-science.md` (45 requirements) and
  `02-product-survey.md` (36 ideas, 14 gaps). Waiting on the constraints agent (→ `03-exsight-constraints.md`)
  and the design-rules agent; then write the synthesis and `bench-work/animation-bench-capabilities.md`.
- 2026-10-08: all four in. Saved `research/03-exsight-constraints.md`; the design agent wrote
  `.claude/standards/bench-design-rules.md` (~205 rules, 12 open points). Wrote
  `bench-work/animation-bench-capabilities.md`: brief + design rules to paste (§0, §0a), surfaces (§2),
  four views and **the frame on the Electronics Bench's shape** (§3a: mode switcher, identity bar,
  stage, player bar, dock tiles Stops/Views/Parts/Section/Cues/Compare/Explore/Ink/Ask, one side-panel
  shape), content model (§4), 77 capabilities with priorities (§5), 13 screens (§6), sample data for the
  eye and SAR (§7), exact labels (§8), 13 owner decisions (§9). Design corrections taken from the repo
  over the research: the wall draws the bench's controls flat (not operable); the presenter window draws
  no bench picture; part card in the side panel, not a modal; badges not leaders on moving parts; one
  finger does nothing on a phone stage.
- 2026-10-08: owner settled §9: *"one bench for 2D and 3D, go with your proposals"*. §9 rewritten as decisions, with the six course cards that now target the Animation Bench.

## Handoff notes

**What changed.** Three research files and a design digest now back the Animation Bench:
`bench-work/research/01-learning-science.md`, `02-product-survey.md`, `03-exsight-constraints.md`,
`.claude/standards/bench-design-rules.md`, and the capability list
`bench-work/animation-bench-capabilities.md` (77 capabilities, 13 screens, sample data, decisions).

**Decisions taken** (DECISIONS 2026-10-08): one Animation Bench for 2D and 3D; ExSight's rules win over
the research where they disagree; all §9 proposals adopted. The card test: a process moving through
stages → Animation Bench; a picture built up → Draw Bench. Six cards moved (the eye, mux, SAR, phasor,
alias fold, power triangle).

**Deviations.** The planned single research file became three (one per research strand) under
`bench-work/research/`. The list was drafted before the design digest landed and then rewritten on the
Electronics Bench frame; four research suggestions were overruled by the repository (wall chrome,
presenter thumbnails, modal part card, leaders). The research's open questions (learner vs teacher
pacing, reverse playback, captions) are settled as proposals, not by evidence.

**What the next units need.**
- U002 (template + quality bar): fold in the research requirements that apply to every bench
  (segments with a required description, stills beside motion, cueing with a second channel, predict
  before reveal, key views first, reduced motion lands whole, phone behaviour) and the design digest's
  definition of done (D13). Add a *frame* section to the template (which dock tiles and panels a
  bench activity uses) and a *time scale* field.
- U003 (the eye): target bench **Animation**; use §7.1's ten stops as the starting structure; the
  prototype must use only the capability list's C-numbers, in the §3a frame.
- Module units (U010+): six cards now target the Animation Bench (capability list §9).
- Still waiting on the owner: the UI renders from ChatGPT; STATE open questions 1–2 (the eye card's
  PLAN text, Saturday's stand-in).
