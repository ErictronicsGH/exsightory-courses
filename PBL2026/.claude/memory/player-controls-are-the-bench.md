---
name: player-controls-are-the-bench
description: Every demonstration is a library loaded into the Animation Bench; Play, Previous, Reset, Next, speed and Explore are the bench's controls, and only the library's own controls stay in the library
metadata:
  type: feedback
---

Owner, 2026-10-08, opening D1·020's demonstrations: *"each demonstration will act like a library that will be loaded
in the animation bench. so the play, previous, reset, next, speed, explore buttons should be bench level controls.
then the library specific ones would stay in the library"*.

**Why:** the eye and the LDR chain were each built as a standalone app with its own player, so every new card would
have re-made the transport. The bench is built once and plays every card; a library is the card's content
([[bench-versus-library]]). It is also the capability list's C1–C7, C37 and C78 (code source as a pure function of
stop and progress on the bench's clock).

**How to apply:**
- Prototype the Animation Bench once (player bar, stop rail, caption bar, speed, Explore, Reset, keyboard) and load each
  demonstration into it as a library; port the accepted ones (LDR chain, eye) rather than leave them standalone.
- The bench owns the clock, the transport and the Explore switch (shown only when the library declares an Explore).
- The library holds its scene, its stops and captions as data, and its own controls: the ones built into its hardware
  ([[controls-built-into-the-hardware]]) and its own context panels (e.g. the eye band).
- The bench's own controls sit together in the transport (top right): Previous, Play, Replay, Reset, Next, then the
  modes after a rule, Speed and Autoplay (owner, 2026-10-10: Autoplay "a bench command", then "the speed selector … is
  also a bench control"; bench v21). Don't leave a bench control in the bottom bar.
- A control whose home is unclear (Cards, a context-panel toggle) is named in the brief and the owner decides.
  Related: [[animation-player-controls]], [[visualize-every-card-in-lecture-order]].
