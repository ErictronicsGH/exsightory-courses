---
name: sound-the-physics-makes
description: Give an animation the sound its own physics makes (bench Sound switch); silent where the real thing is silent, levels and time scaling said on the stage
metadata:
  type: feedback
---

Owner, 2026-10-11: *"for animations that can actually do better with sound they naturally produce, can we include the sound
to make the experience complete?"* Built as a bench feature (prototype Animation Bench: `features.sound` in library.json → a
Sound switch in the transport, key S, on by default; `bench.audio = { ctx, out, on }`; DINKIT `run({ sound(stop, t, audio) })`).
First used in D1·030 card 2: the microphone's 1 kHz tone, the servo's motor and gears while it turns.

**Why:** hearing what the device does (a tone reaching a microphone, a servo whining as it turns) completes the picture, but a
sound the physics would not make teaches the wrong thing, like a decorative signal cue.

**How to apply:** for each view, ask what a person standing at the real bench would hear. Make only that, driven by the view's
own numbers (a speed, a frequency), louder or higher as the physics says; nothing when the real thing is silent (a 2 Hz drive is
below hearing: say so on the stage instead). Play it at a comfortable level and say so when the real level differs (94 dB SPL)
or when the picture is slowed but the sound is real time. The bench mutes it when paused, at a first frame, in reduced motion,
and for blocks not shown. Check levels with `__bench.sound()` after a real click (browsers need a gesture). Films carry no
sound. Related: [[signal-cues-only-when-needed]], [[first-class-requirements]], [[player-controls-are-the-bench]].
