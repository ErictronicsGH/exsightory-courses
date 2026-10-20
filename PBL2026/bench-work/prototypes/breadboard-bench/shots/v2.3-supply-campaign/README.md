# v2.3: the supply tested in all its capabilities and views (2026-10-12)

Made by `tests/supply-campaign.js` run through `.claude/tools/drive-bench.js` (InsightDemo's electron.exe, hidden
window, 1680 × 1050). Every control is operated with real mouse input at the place it is drawn (press, drag round the
knob, wheel notches through the DevTools input protocol), and every number is checked against the class's law and the
glass within ±(0.5 % + 2 counts). **241 checks, 0 failed.** Re-run:

    electron.exe .claude/tools/drive-bench.js bench-work/prototypes/breadboard-bench/tests/supply-campaign.js <outdir>
    (SECTIONS=A,B… for a part; the "breadboard-bench" server on 127.0.0.1:8770)

- **A, every control (3D close-up, View, dark, EN):** off, self-test, standby; V-COARSE ±, V-FINE by drag and wheel,
  A-COARSE, A-FINE past a turn; V-FINE pushed = mute; OUTPUT; CV into 68 Ω, CC into 10 Ω; OCP trip; OVP level set on the
  V knob and the OVP trip. `A00`–`A11`.
- **B, protection and faults (Edit, faults planted from the pane's Faults tab):** over-temperature at 150 W with the vents
  blocked (79.7 °C at 9 min, OtP by 11 min, OUTPUT refused hot, back below 60 °C with the fan); loose post (4.17 V at the
  posts); calibration drift (glass 3 % high); mains fuse; the USB ports (5/9/12 V asks, cuts, one-second retry). `B00`–`B04`.
- **C, the lesson's cap and lock, the turn scales:** V capped at 12 V (holds, blinks, LOCK flashes), I locked at 0.1 A;
  turn scales range, vernier, angle, off, captured mid-drag. `C01`–`C05`.
- **D, every camera profile and projection:** room and bench focus in persp/ortho/iso, 2D plan, 2.5D, 3D Free in
  persp/ortho/iso, Custom (its projection locked, as authored); a real click on OUTPUT wherever it is on the stage. In
  3D Free's own framing the supply (on the shelf) is off the top of the stage; within the profile's limits the camera
  can be brought onto it and it works (checked by hand in the browser pane). `D01`–`D12`.
- **E, the four bench views, the card and the labels, dark EN and light FR:** Preview ignores the pointer; View, Edit,
  Authoring operate; a click on the body opens the card (its voltage = the glass at the same moment); the labels button
  shows 19 numbered tags with their key; the same in 2D and 2.5D. `E-*`.
- **F, the Component Editor, EN dark and FR light:** all 19 sections open on a real click with no console error; Try it:
  OUTPUT by a real click, the posts = the law, V-COARSE by a real drag; golden 15/15 on the law and on a unit. `F-*`.
- `S1-studio-sandbox.png`: the bench in Studio's widget sandbox (origin null, storage and fetch blocked, WebGL read-back ok).

## Defects found and fixed

1. **A click on V-FINE to mute could also turn it** by 0.01 V: near a knob's centre a pixel of jitter is tens of degrees.
   A 10 px dead zone round the centre now reads no turn (`component.js`, `DEAD`).
2. **In Edit, the first click on a control of an unselected part was lost**: the click selects the part, the pane opens,
   the stage reflows and the key is no longer under the pointer on release. A press that began on a key and did not move
   now counts (a drag off it still cancels).
3. **A quick turn on a busy frame was lost or misread**: the browser merges the frame's pointer moves into one; the knob
   now reads every merged sample (`getCoalescedEvents`). Seen in the Component Editor's Try it.
4. **3D Free + orthographic drew a black stage**: the profile's distance limit, set for the perspective camera, pulled the
   orthographic eye inside its own near plane. The limits now let go before the switch and come back for the new camera,
   as a flight already did (`lab.js` setProjection).
5. **A console warning on every 2D/2.5D view** (`PCFSoftShadowMap` is gone from three.js r185 and fell back to
   `PCFShadowMap`): the plain type is named; nothing drawn changes. Soft shadows in the layouts would come from the
   lights' `shadow.radius`: a change of look left to the owner.
