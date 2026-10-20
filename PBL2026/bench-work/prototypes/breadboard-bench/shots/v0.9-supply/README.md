# v0.9: the bench supply as a live 3D component (U040, 2026-10-11)

The supply on the Electronics Bench's first shelf, built from its manifest
(`bench-work/components/bench-supply/component.json`, `exsight.supply.sw3005` 0.2.0) by
`src/components/supply/` (model.js, glass.js, component.js), its firmware the class file
`bench-work/components/classes/dc-supply-switching.mjs`.

- `00-modes.png`: the twelve modes (m01–m12), the same states as the preview stills
  (`bench-work/previews/supply-modes/`). The 3D readings carry this unit's in-spec error
  (V × 1.0008; I × 0.998 + 0.5 mA), so W can differ by a count from the rounded V × A.
- `00-views.png`: front, side, back, back three-quarter, ports and posts, knobs, the bench in French (markings stay as
  printed on the hardware), and the compiled widget running in Studio's sandbox (`s1-studio-sandbox.png`).
- `t1-after-drag.png`: after the real-pointer checks (a quarter turn = 5 detents; wheel; OUTPUT click; V-FINE press
  mutes; a locked knob changes nothing; the camera never moves).

Captured with `.claude/tools/shoot-prototype.js` (plans in the session scratchpad: `__mode(k)` sets a state,
`__aim(az, el, dist, fov)` frames the supply in its own frame), sheets by `tools/sheet_supply.py`, the sandbox by
`.claude/tools/studio-sandbox-check.js`.
