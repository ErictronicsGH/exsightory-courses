# PBL2026 — every unit and its status

One line each. Status: `done` · `in-progress` · `paused` · `not-started` · `blocked` · `moved` (bench work handed to exsight-benches, 2026-10-13). The unit in flight is in
[MEMORY.md](MEMORY.md); finished units are in [archive/](archive/INDEX.md).

| Id | Unit | Status | Depends on |
|---|---|---|---|
| U000 | Set up the local `.claude/` (tracking, memory, standards), modelled on InsightDemo | done | — |
| U001 | Animation Bench: research what a teacher needs, list the capabilities for the UI renders | done | — |
| U002 | Finish the bench-spec template and the quality bar from U001's findings | done | U001 |
| U003 | The reference spec: D1·010 card 3, the eye to the brain (Animation Bench), with a prototype | done | U001, U002 |
| U010 | Bench specs, D1·010 Your MCU reads 2047 — what is that? (15 min) | done | U002, U003 |
| U011 | Bench specs, D1·020 The measurand, and what "right" means (30 min) | done | U002, U003 |
| U012 | Bench specs, D1·030 Sensing: from physical quantity to electrical signal (25 min) | done | U002, U003 |
| U013 | Bench specs, D1·040 The sensor as a source: impedance, dividers and loading (45 min) | done | U002, U003 |
| U014 | Bench specs, D1·050 Current as the quantity: shunts, Kelvin and burden voltage (40 min) | done | U002, U003 |
| U015 | Bench specs, D1·060 Signal conditioning: in-amps, gain, offset and bias current (40 min) | done | U002, U003 |
| U016 | Bench specs, D1·070 The ADC input: sample-and-hold and acquisition time (45 min) | blocked (crossing 505; specs 01, 05, 06 done; in backlog/016) | U002, U003 |
| U017 | Bench specs, D1·080 Conversion: sampling, quantization, architecture and ENOB (30 min) | in-progress | U002, U003 |
| U018 | Bench specs, D1·090 The reference voltage, and ratiometric measurement (30 min) | not-started | U002, U003 |
| U019 | Bench specs, D2·010 The code leaves the converter: open-drain, pull-ups and I²C (30 min) | not-started | U002, U003 |
| U020 | Bench specs, D2·020 External ADCs as a design choice: ADS1115 and INA226 (30 min) | not-started | U002, U003 |
| U021 | Bench specs, D2·030 Noise: thermal, coupled and self-inflicted (35 min) | not-started | U002, U003 |
| U022 | Bench specs, D2·040 Oversampling, dither and digital filtering (40 min) | not-started | U002, U003 |
| U023 | Bench specs, D2·050 Scaling, calibration and the maths that loses your precision (35 min) | not-started | U002, U003 |
| U024 | Bench specs, D2·060 Lab: the DC chain end to end, ideal vs non-ideal (25 min) | not-started | U002, U003 |
| U025 | Bench specs, D2·070 AC as the quantity: RMS and crest factor (30 min) | not-started | U002, U003 |
| U026 | Bench specs, D2·080 Isolation and electrical safety (35 min) | not-started | U002, U003 |
| U027 | Bench specs, D2·090 Ground as an impedance: returns, loops and differential sensing (40 min) | not-started | U002, U003 |
| U028 | Bench specs, D3·010 Parasitic C and L: what probes and wiring add (35 min) | not-started | U002, U003 |
| U029 | Bench specs, D3·020 Conditioning AC for the ADC: bias, aliasing and the anti-alias filter (45 min) | not-started | U002, U003 |
| U030 | Bench specs, D3·030 Sampling instants: timing and jitter (30 min) | not-started | U002, U003 |
| U031 | Bench specs, D3·040 True RMS on an MCU vs on a meter (40 min) | not-started | U002, U003 |
| U032 | Bench specs, D3·050 Power on an MCU: real, reactive, and the phase-error trap (45 min) | not-started | U002, U003 |
| U033 | Bench specs, D3·060 Capstone: build an AC power meter (70 min) | not-started | U002, U003 |
| U034 | Bench specs, D3·070 Wrap-up: staged faults, the checklist and Q&A (35 min) | not-started | U002, U003 |
| U035 | The eye-to-brain 2D animation (D1·010 cards 2–4): the owner's review, then the fixes | done | U003 |
| U036 | The LDR chain animation, D1·010 card 4: eye still intro, zoomed steps, Explore | done | U035 |
| U037 | Visualizations for D1·020 The measurand, and what "right" means, in lecture order | done | U036 |
| U038 | Visualizations for D1·030 Sensing: from physical quantity to electrical signal, in lecture order | moved (exsight-benches B006) | U037 |
| U039 | Breadboard Bench (M49) design: the room and the bench, then the locked 2D/2.5D cameras, then the controls per surface | moved (exsight-benches; its last item met under U040) | — |
| U040 | The component standard (manifest) for bench components, starting with the bench power supply | moved (exsight-benches B005) | — |
