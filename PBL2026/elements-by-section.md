# From Sensor to Number — Sections and the ExSightory Elements They Use

Generated from the `<!-- PLAN -->` block of every card in `notes/`. Every card also has its wall text (heading + statement) and its **Flow** (the teleprompter); those are not repeated in each row. ★ marks the module's centrepiece. Detail for any row is in that card's PLAN.

## Day 1: From quantity to code
## Summary by section

| Section | Title | Min | Elements used (count of cards) |
|---|---|---|---|
| 1·010 | Your MCU reads 2047 — what is that? | 15 | Draw Bench ×4, Analogy ×2, Electronics Bench ×1, Predict–observe–explain ×1, Poll ×1, Model Bench ×1, Checkpoint ×1 |
| 1·020 | The measurand, and what "right" means | 30 | Flash quiz ×2, Plot Bench ×2, Numeric answer ×2, Equation Bench ×2, Analogy ×1, Electronics Bench ×1, Multi-select ×1, Draw Bench ×1, Checkpoint ×1 |
| 1·030 | Sensing: from physical quantity to electrical signal | 25 | Draw Bench ×4, Predict–observe–explain ×1, Plot Bench ×1, Flash quiz ×1, Electronics Bench ×1, Circuit predict ×1, Multi-select ×1, Poll ×1 |
| 1·040 | The sensor as a source: impedance, dividers and loading | 45 | Electronics Bench ×4, Draw Bench ×2, Numeric answer ×2, Equation Bench ×2, Multi-select ×1, Circuit predict ×1, Checkpoint ×1 |
| 1·050 | Current as the quantity: shunts, Kelvin and burden voltage | 40 | Electronics Bench ×4, Circuit predict ×3, Equation Bench ×2, Numeric answer ×1, Flash quiz ×1 |
| 1·060 | Signal conditioning: in-amps, gain, offset and bias current | 40 | Equation Bench ×5, Predict–observe–explain ×2, Multi-select ×1, Draw Bench ×1, Flash quiz ×1, Electronics Bench ×1, Numeric answer ×1, Plot Bench ×1 |
| 1·070 | The ADC input: sample-and-hold and acquisition time | 45 | Plot Bench ×4, Predict–observe–explain ×3, Draw Bench ×2, Numeric answer ×2, Equation Bench ×2, Analogy ×1, Electronics Bench ×1, Multi-select ×1 |
| 1·080 | Conversion: sampling, quantization, architecture and ENOB | 30 | Numeric answer ×3, Plot Bench ×2, Equation Bench ×2, Predict–observe–explain ×1, Flash quiz ×1, Draw Bench ×1, Coding Bench ×1, Figure Bench ×1, Multi-select ×1 |
| 1·090 | The reference voltage, and ratiometric measurement | 30 | Predict–observe–explain ×2, Equation Bench ×1, Numeric answer ×1, Electronics Bench ×1, Poll ×1, Plot Bench ×1, Checkpoint ×1 |
| 2·010 | The code leaves the converter: open-drain, pull-ups and I²C | 30 | Predict–observe–explain ×5, Electronics Bench ×4, Figure Bench ×2, Poll ×2, Plot Bench ×2, Draw Bench ×1, Multi-select ×1, Analogy ×1, Numeric answer ×1, Checkpoint ×1 |
| 2·020 | External ADCs as a design choice: ADS1115 and INA226 | 30 | Figure Bench ×3, Numeric answer ×3, Plot Bench ×2, Predict–observe–explain ×2, Flash quiz ×1, Draw Bench ×1, Checkpoint ×1, Equation Bench ×1, Poll ×1 |
| 2·030 | Noise: thermal, coupled and self-inflicted | 35 | Predict–observe–explain ×4, Equation Bench ×3, Coding Bench ×2, Numeric answer ×2, Electronics Bench ×2, Circuit predict ×1 |
| 2·040 | Oversampling, dither and digital filtering | 40 | Coding Bench ×6, Predict–observe–explain ×5, Numeric answer ×2, Flash quiz ×1, Equation Bench ×1, Analogy ×1 |
| 2·050 | Scaling, calibration and the maths that loses your precision | 35 | Draw Bench ×3, Predict–observe–explain ×3, Figure Bench ×2, Plot Bench ×2, Coding Bench ×2, Poll ×1, Equation Bench ×1, Checkpoint ×1, Numeric answer ×1, Analogy ×1, Multi-select ×1 |
| 2·060 | Lab: the DC chain end to end, ideal vs non-ideal | 25 | Electronics Bench ×2, Checkpoint ×2, Plot Bench ×2, Predict–observe–explain ×2, Flash quiz ×1, Coding Bench ×1, Multi-select ×1, Draw Bench ×1 |
| 2·070 | AC as the quantity: RMS and crest factor | 30 | Predict–observe–explain ×3, Plot Bench ×2, Draw Bench ×1, Equation Bench ×1 |
| 2·080 | Isolation and electrical safety | 35 | Poll ×2, Draw Bench ×2, Numeric answer ×2, Equation Bench ×1, Analogy ×1, Flash quiz ×1, Figure Bench ×1, Predict–observe–explain ×1, Electronics Bench ×1, Circuit predict ×1 |
| 2·090 | Ground as an impedance: returns, loops and differential sensing | 40 | Electronics Bench ×4, Circuit predict ×2, Equation Bench ×1, Numeric answer ×1, Draw Bench ×1, Checkpoint ×1 |
| 3·010 | Parasitic C and L: what probes and wiring add | 35 | Plot Bench ×3, Predict–observe–explain ×3, Draw Bench ×2, Figure Bench ×1, Poll ×1, Checkpoint ×1 |
| 3·020 | Conditioning AC for the ADC: bias, aliasing and the anti-alias filter | 45 | Plot Bench ×4, Predict–observe–explain ×3, Numeric answer ×2, Flash quiz ×2, Equation Bench ×2, Draw Bench ×2, Figure Bench ×1, Analogy ×1, Checkpoint ×1 |
| 3·030 | Sampling instants: timing and jitter | 30 | Predict–observe–explain ×2, Draw Bench ×1, Plot Bench ×1, Poll ×1, Coding Bench ×1, Equation Bench ×1, Checkpoint ×1 |
| 3·040 | True RMS on an MCU vs on a meter | 40 | Predict–observe–explain ×3, Plot Bench ×2, Equation Bench ×2, Coding Bench ×1, Numeric answer ×1, Draw Bench ×1, Flash quiz ×1, Figure Bench ×1, Checkpoint ×1 |
| 3·050 | Power on an MCU: real, reactive, and the phase-error trap | 45 | Plot Bench ×3, Predict–observe–explain ×3, Numeric answer ×2, Draw Bench ×1, Figure Bench ×1, Coding Bench ×1, Checkpoint ×1 |
| 3·060 | Capstone: build an AC power meter | 70 | Checkpoint ×11, Coding Bench ×5, Figure Bench ×4, Draw Bench ×3, Predict–observe–explain ×3, Plot Bench ×2, Equation Bench ×1 |
| 3·070 | Wrap-up: staged faults, the checklist and Q&A | 35 | Figure Bench ×2, Checkpoint ×2, Benches already used ×1, Predict–observe–explain ×1, Poll ×1, Q&A ×1, Draw Bench ×1 |

## Totals across the course

| Element | Cards |
|---|---|
| Predict–observe–explain | 53 |
| Draw Bench | 36 |
| Plot Bench | 36 |
| Equation Bench | 31 |
| Numeric answer | 29 |
| Checkpoint | 28 |
| Electronics Bench | 27 |
| Coding Bench | 20 |
| Figure Bench | 19 |
| Flash quiz | 13 |
| Poll | 12 |
| Analogy | 9 |
| Multi-select | 9 |
| Circuit predict | 9 |
| Model Bench | 1 |
| Benches already used | 1 |
| Q&A | 1 |

Plus on every card: wall text and **Flow**. Not authored, because the compiler emits it: the reflection beat that closes each section.


### 1·010 Your MCU reads 2047 — what is that? · 15 min

**Elements:** Draw Bench ×4, Analogy ×2, Electronics Bench ×1, Predict–observe–explain ×1, Poll ×1, Model Bench ×1, Checkpoint ×1.

| # | Card | What the wall shows (bench) | Learner action | Also |
|---|---|---|---|---|
| 1 | The number is confidently wrong | ★ Electronics Bench: the cold-open circuit (Demo #1): a sensor output of 3.585 V into two 100 kΩ resistors, the midpoint wired to a… | Predict–observe–explain | S31, Staged fault |
| 2 | A person with no senses | Show: the room's imagination is the canvas; | Poll |  |
| 3 | Sense organ, pathway, processor | Model Bench: the eye with named parts (cornea, lens, retina, photoreceptors, optic nerve) and the visual pathway to the vis… | — | S2, Analogy |
| 4 | Three places the information can be spoiled | Draw Bench: the eye's three stages drawn left to right; | — | S3 |
| 5 | The path a measurement travels | Draw Bench: the course path built arrow by arrow: Temperature → Resistance → Voltage → ADC code → Binary data → Software v… | — |  |
| 6 | The ADC does not know what 2047 means | Draw Bench: the path drawing focused on the converter: "1.65 V → ADC → 2048", with the seven things it needs before 2048 c… | — | Analogy, S1 |
| 7 | A number that appears is not a number you have earned | Draw Bench: the whole path drawing, every stage blank, waiting for the room's marks. | Checkpoint | S4, S30 |

### 1·020 The measurand, and what "right" means · 30 min

**Elements:** Flash quiz ×2, Plot Bench ×2, Numeric answer ×2, Equation Bench ×2, Analogy ×1, Electronics Bench ×1, Multi-select ×1, Draw Bench ×1, Checkpoint ×1.

| # | Card | What the wall shows (bench) | Learner action | Also |
|---|---|---|---|---|
| 1 | The measurand | Show: the question does the work, and the statement lands after it. | Flash quiz |  |
| 2 | A measurement must not depend on who made it | Show: the analogy carries it. | — | Analogy |
| 3 | Direct, indirect and null | Electronics Bench: bridge-null: two divider arms on 10 V, a meter across the midpoints, R4 at 1k2 against three 1 kΩ arms. | Flash quiz | S37 |
| 4 | Error is not a mistake | Show: the words carry it; | — |  |
| 5 | Accuracy is not precision | ★ Plot Bench: two instruments' readings of one voltage as bell curves exp(−(x−μ)²/2σ²), labelled "handheld" and "bench", wit… | Multi-select |  |
| 6 | Repeatable is not the same as right | Plot Bench: the same Plot, one curve narrowed to a spike and parked well off the true value: every trial identical, every … | — |  |
| 7 | Where error comes from | Draw Bench: the path drawing with the four categories pinned where the course meets them: theoretical (the sensor's model; | — | S6, S7 |
| 8 | Reading a meter's specification | Equation Bench: U = p·reading + n·count, with p = 0.5 %, n = 3 and one count = 1 mV, graphed as U/reading against the reading … | Numeric answer | S36 |
| 9 | Stacking tolerances along the chain | Equation Bench: worst case Σ|eᵢ| beside RSS √(Σeᵢ²), with a worked example on the Day 1 path: sensor ±0.5 %, divider ±1 %, ref… | Numeric answer, Checkpoint | S5 |

### 1·030 Sensing: from physical quantity to electrical signal · 25 min

**Elements:** Draw Bench ×4, Predict–observe–explain ×1, Plot Bench ×1, Flash quiz ×1, Electronics Bench ×1, Circuit predict ×1, Multi-select ×1, Poll ×1.

| # | Card | What the wall shows (bench) | Learner action | Also |
|---|---|---|---|---|
| 1 | Our circuits only understand electricity | Draw Bench: the path drawing focused on its first arrow, QUANTITY → SENSOR, with the eye's organ from 010 ghosted above it… | — | S8 |
| 2 | Transducer, sensor, actuator | Draw Bench: input transducer → electronics → output transducer, a sensor and an actuator labelled, the data flowing left t… | — |  |
| 3 | Transduction is not unit conversion | Plot Bench: thermocouple output V = S·(T_hot − T_cold) with S ≈ 41 µV/°C (type K near room temperature; | Predict–observe–explain |  |
| 4 | Transduction can take several stages | Draw Bench: the pressure chain stage by stage: the diaphragm deforms → strain → the gauge's resistance changes → a bridge … | — |  |
| 5 | What a sensor hands you | — | Flash quiz | S10 |
| 6 | Modulating or self-generating | ★ Electronics Bench: a 10 k NTC (thermistor-ntc-10k, B = 3950 K) under a 10 kΩ resistor from the bench supply, a DMM across the NTC… | Circuit predict | S9, Staged fault, Staged fault |
| 7 | Detect, or quantify? | — | Multi-select | S12 |
| 8 | The quantity never arrives alone | Show: the room's answers are the material for the next card. | Poll |  |
| 9 | Defending the sensor against interference | Draw Bench: the five defences pinned on the path where the course teaches them: insensitive design and opposing inputs at … | — | S11 |

### 1·040 The sensor as a source: impedance, dividers and loading · 45 min

**Elements:** Electronics Bench ×4, Draw Bench ×2, Numeric answer ×2, Equation Bench ×2, Multi-select ×1, Circuit predict ×1, Checkpoint ×1.

| # | Card | What the wall shows (bench) | Learner action | Also |
|---|---|---|---|---|
| 1 | Connecting anything makes an interface | Draw Bench: the path drawing focused on the boundary after SENSOR, labelled "interface: what does each side expect?". | — |  |
| 2 | Two voltages are not automatically compatible | Show: none. | Multi-select |  |
| 3 | What impedance means | Electronics Bench: a 10 V supply behind a 1 kΩ resistor standing in for a source's own impedance, driving a load R_L; | — |  |
| 4 | Every source has an output impedance | Draw Bench: the 10 k NTC and its 10 kΩ excitation resistor from 030, redrawn step by step: the supply and the two resistor… | Numeric answer | S35 |
| 5 | Loading: the measurement changes the measurand | ★ Electronics Bench: divider-loading (Demo #1): 10 V across R1 and R2, 1 MΩ each; | Circuit predict | S6, S8, S36, Staged fault |
| 6 | High in, low out | Equation Bench: V_read = V_s·R_in/(R_in + R_s), graphed against R_s from 100 Ω to 10 MΩ as a family for R_in = 100 kΩ, 1 MΩ, 1… | — | S14 |
| 7 | Attenuation: making a large signal smaller | Equation Bench: V_out = V_in·R2/(R1 + R2), rearranged to what the firmware does: V_in = V_out·(R1 + R2)/R2. | — |  |
| 8 | A divider that does not lie to the ADC | Electronics Bench: three dividers of the same ratio on 12 V: 2.7 k/1 k, 27 k/10 k and 270 k/100 k, each with a budget DMM standin… | Numeric answer, Checkpoint | S32, Staged fault |
| 9 | Buffering: drive without disturbing | Electronics Bench: the loaded divider from the loading card (1 M/1 M on 10 V, the 10 MΩ handheld), then a voltage follower insert… | — | S13, Staged fault |

### 1·050 Current as the quantity: shunts, Kelvin and burden voltage · 40 min

**Elements:** Electronics Bench ×4, Circuit predict ×3, Equation Bench ×2, Numeric answer ×1, Flash quiz ×1.

| # | Card | What the wall shows (bench) | Learner action | Also |
|---|---|---|---|---|
| 1 | A shunt turns current into voltage | Equation Bench: I = V_sh / R_sh, with a worked example: 20 mV across 10 mΩ → 2 A. | — | S37 |
| 2 | Sizing a shunt: signal against disturbance | Equation Bench: V = I·R and P = I²·R, graphed against R from 1 mΩ to 100 mΩ at I = 2 A, with the signal also shown in codes at… | Numeric answer |  |
| 3 | Low side or high side | Electronics Bench: two copies of a 12 V supply driving a 6 Ω load (resistor-power-25, on its heatsink plate) through a 10 mΩ shunt: at the bottom in one… | Flash quiz | S33 |
| 4 | The leads are part of the shunt | Electronics Bench: four-wire-sensing (the same fixture as the next card), opened on the two-wire meter. | Circuit predict |  |
| 5 | Kelvin: separate the current from the measurement | ★ Electronics Bench: four-wire-sensing: a precision 1 mA source into a Pt100, two metres of AWG 24 in each force lead; | Circuit predict | Staged fault, Staged fault |
| 6 | Burden voltage: the drop your ammeter inserts | Electronics Bench: branch-current re-valued: V1 = 3.3 V, R1 = 66 Ω (a load drawing 50 mA), ammeter A1 on its shunt dial, clamp CP… | Circuit predict | S6, S36, Staged fault |

### 1·060 Signal conditioning: in-amps, gain, offset and bias current · 40 min

**Elements:** Equation Bench ×5, Predict–observe–explain ×2, Multi-select ×1, Draw Bench ×1, Flash quiz ×1, Electronics Bench ×1, Numeric answer ×1, Plot Bench ×1.

| # | Card | What the wall shows (bench) | Learner action | Also |
|---|---|---|---|---|
| 1 | The sensor's output is rarely ready | — | Multi-select | S33 |
| 2 | What conditioning does | Draw Bench: the conditioning functions pinned on the path where the course meets them: attenuation and buffering (040), am… | — |  |
| 3 | Amplification, and undoing it | Equation Bench: V_out = G·V_in, rearranged to what the firmware does: V_in = V_out / G. | — |  |
| 4 | Negative feedback sets the gain | Equation Bench: A_cl = G / (1 + G·H), graphed against G from 10² to 10⁶ with H = 0.01, and a family for H = 0.1, 0.01 and 0.00… | Predict–observe–explain | S11 |
| 5 | Ratios in decibels | Equation Bench: dB = 20·log(V_out/V_in) and dB = 10·log(P_out/P_in), with worked examples: ×2 → +6.02 dB, ×0.5 → −6.02 dB, ×10… | Flash quiz | S15 |
| 6 | Differential gain: amplify the difference | Electronics Bench: the high-side shunt from 050 (12 V, 10 mΩ, 6 Ω load, 2 A) with an instrumentation amplifier across it at G = 1… | — | S16 |
| 7 | CMRR decides whether high-side sensing works | Equation Bench: input-referred error = V_cm / 10^(CMRR/20), graphed against CMRR from 40 to 120 dB at V_cm = 12 V, beside the … | Predict–observe–explain | Staged fault |
| 8 | Offset is amplified exactly like the signal | ★ Plot Bench: the ADC's view of the in-amp: y = clamp(G·(x + V_os), 0, 3.3) against x = V_in from 0 to 7 mV, with the ideal … | Numeric answer | Staged fault |
| 9 | Bias current makes another offset | Equation Bench: V_err = I_b·R_s at the input and G·I_b·R_s at the output, graphed against R_s from 100 Ω to 1 MΩ with I_b = 10… | — | Staged fault |

### 1·070 The ADC input: sample-and-hold and acquisition time · 45 min

**Elements:** Plot Bench ×4, Predict–observe–explain ×3, Draw Bench ×2, Numeric answer ×2, Equation Bench ×2, Analogy ×1, Electronics Bench ×1, Multi-select ×1.

| # | Card | What the wall shows (bench) | Learner action | Also |
|---|---|---|---|---|
| 1 | The ADC input is a switch and a capacitor | Draw Bench: inside the pin: pad → multiplexer switch → R_on (1 kΩ) → C_s (10 pF) → comparator; | Predict–observe–explain |  |
| 2 | The capacitor has to charge in time | ★ Plot Bench: Demo #2, the switched-capacitor sampler, as two linked plots. | — | Analogy, Staged fault |
| 3 | A source that cannot settle reads low | Plot Bench: the centrepiece, at the two divider impedances. | Predict–observe–explain | S31, S32, Staged fault |
| 4 | Faster makes it worse | Plot Bench: the centrepiece, window slider only. | Predict–observe–explain | Staged fault |
| 5 | One capacitor, many inputs | Draw Bench: four sensors → analog MUX → one S/H → one converter; | — | S17, Staged fault |
| 6 | The maximum source impedance | Equation Bench: t_acq = (R_s + R_on)·C_s·ln(2^(N+1)), solved for R_s and graphed against t_acq; | Numeric answer | S35 |
| 7 | Fix one: a longer acquisition time | Plot Bench + Equation Bench: as above. | Numeric answer |  |
| 8 | Fix two: a buffer | Electronics Bench: the 100 k / 100 k divider → op-amp follower → ADC-input block at the full rate (1 µs window); | Multi-select | S13, Staged fault |

### 1·080 Conversion: sampling, quantization, architecture and ENOB · 30 min

**Elements:** Numeric answer ×3, Plot Bench ×2, Equation Bench ×2, Predict–observe–explain ×1, Flash quiz ×1, Draw Bench ×1, Coding Bench ×1, Figure Bench ×1, Multi-select ×1.

| # | Card | What the wall shows (bench) | Learner action | Also |
|---|---|---|---|---|
| 1 | When, and which level | Plot Bench: one slow waveform with its sampled-and-held version v(floor(t·f_s)/f_s) and its quantized version q·round(v/q)… | — | S12, S18 |
| 2 | Resolution: how many levels | Equation Bench: LSB = range / 2^N, with an N slider; | Numeric answer |  |
| 3 | Quantization error is a floor | ★ Plot Bench: the quantizer staircase q·round(x/q) and its error sawtooth x − q·round(x/q), x from 0 to 10 V, q = 10/2^N wit… | Predict–observe–explain | Staged fault |
| 4 | More bits are not more accuracy | — | Flash quiz | S34 |
| 5 | SAR: a binary search | Draw Bench: SAR's binary search for a 4-bit converter, Vref 3.3 V, input 2.17 V: trial 1000 (1.650 V) keep; | Numeric answer |  |
| 6 | Sigma-delta: fast and coarse, then filtered | Coding Bench: a first-order sigma-delta modulator: an input (say 0.30 of full scale) in, the 1-bit stream out, and a running… | — | S19 |
| 7 | The table everyone scrolls past | Figure Bench: the ADC accuracy table from a real MCU datasheet (offset error, gain error, INL, DNL, absolute accuracy, in LS… | Multi-select | S21 |
| 8 | ENOB: the honest number of bits | Equation Bench: ENOB = (SINAD − 1.76 dB) / 6.02 dB, graphed against SINAD; | Numeric answer | S15, S34, S20 |

### 1·090 The reference voltage, and ratiometric measurement · 30 min

**Elements:** Predict–observe–explain ×2, Equation Bench ×1, Numeric answer ×1, Electronics Bench ×1, Poll ×1, Plot Bench ×1, Checkpoint ×1.

| # | Card | What the wall shows (bench) | Learner action | Also |
|---|---|---|---|---|
| 1 | A code is a ratio to the reference | Equation Bench: code = (V_in / V_ref)·2^N, rearranged (solveFor) to V_in = code·V_ref / 2^N, graphed as the code against V_in. | — |  |
| 2 | The code alone means nothing | — | Numeric answer | S30 |
| 3 | Reference error is measurement error | — | Predict–observe–explain | S22, Staged fault |
| 4 | VDD: the default, and usually the worst | Electronics Bench: the bench supply as a 3.3 V rail that feeds the MCU's own load and references the ADC, with a fixed 1.65 V inp… | Poll |  |
| 5 | Ratiometric: let the error cancel | ★ Plot Bench: the code against the rail voltage V_dd from 3.0 to 3.6 V for two inputs: an absolute one, a fixed 1.65 V (code… | Predict–observe–explain | S35, Staged fault, Staged fault |
| 6 | Back to the sensor | — | Checkpoint | S9, S30 |

## Day 2: From code to number — then time enters

### 2·010 The code leaves the converter: open-drain, pull-ups and I²C · 30 min

**Elements:** Predict–observe–explain ×5, Electronics Bench ×4, Figure Bench ×2, Poll ×2, Plot Bench ×2, Draw Bench ×1, Multi-select ×1, Analogy ×1, Numeric answer ×1, Checkpoint ×1.

| # | Card | What the wall shows (bench) | Learner action | Also |
|---|---|---|---|---|
| 1 | The code has to travel | Draw Bench: the course path drawing from D1·010, with the code's own leg added: ADC → Digital data → DIGITAL INTERFACE → P… | — |  |
| 2 | Both digital — so compatible? | Figure Bench: two chips facing each other, nine labelled lines between them: voltage levels, timing, clocking, bit order, wo… | Poll |  |
| 3 | Level shifting: 5 V logic into a 3.3 V pin | Electronics Bench: new fixture `level-shift`: a 5 V supply V1 behind R1 (47 Ω, the module output's own resistance) wired to the G… | Predict–observe–explain | Staged fault |
| 4 | An interface is not a protocol | Figure Bench: SPI between ADC and MCU: SCLK, MOSI, MISO, CS/SS, with a timing strip of 10110110 on MISO against SCLK. | Multi-select |  |
| 5 | What does a floating input read? | Electronics Bench: a logic input (the pin node) with nothing driving it and a DMM on it; | Predict–observe–explain | Staged fault |
| 6 | Open-drain: pull low or let go | Electronics Bench: new fixture `open-drain-bus`: an N-MOSFET M1 (mosfet-typical) as the open-drain output, drain to the bus node,… | Predict–observe–explain | S14, Analogy |
| 7 | Choosing the pull-up value | ★ Plot Bench: the bus voltage after release, v = 3.3·(1 − exp(−t/(R·C))), t in ns; | Predict–observe–explain, Numeric answer | Staged fault |
| 8 | Two outputs on one wire | Electronics Bench: `open-drain-bus` with a second MOSFET M2 (gate from V3) on the same pulled-up bus. | Predict–observe–explain | Staged fault |
| 9 | There is no best interface, only a suited one | — | Poll | S50 |
| 10 | A logical problem and an electrical one | Plot Bench: the centrepiece rise-time Plot back on the Canvas while the room ticks its list, so three of the requirements … | Checkpoint |  |

### 2·020 External ADCs as a design choice: ADS1115 and INA226 · 30 min

**Elements:** Figure Bench ×3, Numeric answer ×3, Plot Bench ×2, Predict–observe–explain ×2, Flash quiz ×1, Draw Bench ×1, Checkpoint ×1, Equation Bench ×1, Poll ×1.

| # | Card | What the wall shows (bench) | Learner action | Also |
|---|---|---|---|---|
| 1 | When the integrated converter is not enough | Plot Bench: D1·080's quantizer staircase round(x/q)·q over a 0–5 mV ramp (a bridge output), twice: q = 3.3 V/4096 ≈ 0.81 m… | — |  |
| 2 | Three converters side by side | Figure Bench: the comparison table as an SVG (architecture, resolution, maximum rate, inputs, PGA, reference, interface, str… | Predict–observe–explain |  |
| 3 | Not "which has the most bits?" | Plot Bench: the two staircases from the first card, back on the Canvas. | Flash quiz |  |
| 4 | The selection checklist | Draw Bench: the course path drawing with the checklist's items pinned to the stages they belong to: input impedance → sour… | Checkpoint |  |
| 5 | Inside the ADS1115 | ★ Figure Bench: the ADS1115 datasheet (TI SBAS444) as a tour: block diagram (AIN0–AIN3 → MUX → PGA → ΔΣ modulator → digital fi… | Predict–observe–explain, Numeric answer | S20, S16, S52 |
| 6 | Can the bus keep up? | Equation Bench: required bit rate = samples/s × bits per sample; | Numeric answer, Numeric answer | S50 |
| 7 | INA226: build or buy? | Figure Bench: the INA226 block diagram (TI SBOS547) laid beside the Day 1 chain: external shunt (D1·050) → differential inpu… | Poll | S51, S58, Staged fault |

### 2·030 Noise: thermal, coupled and self-inflicted · 35 min

**Elements:** Predict–observe–explain ×4, Equation Bench ×3, Coding Bench ×2, Numeric answer ×2, Electronics Bench ×2, Circuit predict ×1.

| # | Card | What the wall shows (bench) | Learner action | Also |
|---|---|---|---|---|
| 1 | The last digit will not stand still | Coding Bench: `bobble`: a modelled 12-bit converter reading a perfectly steady input set at 2047.4 LSB, with seeded Gaussian… | Predict–observe–explain | S7 |
| 2 | Bobble at a threshold | Coding Bench: `threshold`: the `bobble` stream (input 2047.4 LSB, σ = 0.3 LSB, 1,000 samples a second) into `if (code >= 204… | Predict–observe–explain | S53 |
| 3 | Thermal noise: a floor set by resistance and bandwidth | ★ Equation Bench: v_n = √(4kTRB), T, R and B on dials, k fixed; | Predict–observe–explain, Numeric answer | S52, S10 |
| 4 | The cost of high impedance | Equation Bench: the centrepiece Equation with R stepped from 10 kΩ to 1 MΩ, beside D1·040's loaded divider and D1·070's settli… | Numeric answer |  |
| 5 | Independent noise adds as root-sum-of-squares | Equation Bench: v_total = √(v₁² + v₂²) with two dials (D1·020's RSS card, reused). | Predict–observe–explain |  |
| 6 | Self-inflicted: switching noise through shared impedance | Electronics Bench: new fixture `ground-return` (also 090's centrepiece): a 10 V supply V1; | Circuit predict | Staged fault |
| 7 | Return current makes voltage in the ground path | Electronics Bench: the same `ground-return` fixture with the Voltage overlay on and TR's `ir_drop` reveal, the drop drawn along a… | — | S23 |

### 2·040 Oversampling, dither and digital filtering · 40 min

**Elements:** Coding Bench ×6, Predict–observe–explain ×5, Numeric answer ×2, Flash quiz ×1, Equation Bench ×1, Analogy ×1.

| # | Card | What the wall shows (bench) | Learner action | Also |
|---|---|---|---|---|
| 1 | Measure many times and average | Coding Bench: `oversample`, first pass: the `bobble` converter at 2047.4 LSB with σ = 1 LSB; | Flash quiz | S58 |
| 2 | Buying resolution with time | Equation Bench: n extra bits = log₄ N, derived in three steps on the card: averaging N independent samples divides the noise b… | Predict–observe–explain, Numeric answer | S19, S20, S54 |
| 3 | What if the signal is too quiet? | ★ Coding Bench: `oversample`: input 2047.4 LSB, N = 256, result printed to 1/100 LSB beside the true value and the error; | Predict–observe–explain | Staged fault |
| 4 | Dither: adding noise on purpose | Coding Bench: `oversample` with its dither switch: σ = 0 input plus deliberate dither, first uniform ±½ LSB, then Gaussian 1… | Predict–observe–explain | S7, Analogy |
| 5 | Which average? | Coding Bench: `filters`, first screen: seven codes, 2046, 2047, 2047, 2048, 2047, 2049, 2048, with mean, median and mode hid… | Numeric answer | S24 |
| 6 | When the mean misleads | Coding Bench: `filters`: a stream of codes round 2047 with one spike to 3900, through a moving average of 8 and a median of … | Predict–observe–explain |  |
| 7 | What each filter costs in latency | Coding Bench: `filters`: a clean step of 100 counts through a moving average of 8, an IIR with α = 1/8 and a median of 5, dr… | Predict–observe–explain | S53 |

### 2·050 Scaling, calibration and the maths that loses your precision · 35 min

**Elements:** Draw Bench ×3, Predict–observe–explain ×3, Figure Bench ×2, Plot Bench ×2, Coding Bench ×2, Poll ×1, Equation Bench ×1, Checkpoint ×1, Numeric answer ×1, Analogy ×1, Multi-select ×1.

| # | Card | What the wall shows (bench) | Learner action | Also |
|---|---|---|---|---|
| 1 | The code has arrived | Draw Bench: the course path drawing with FIRMWARE lit and split into its three boxes, filter → calibrate → scale, the filt… | — |  |
| 2 | "Conversion" means many things | Figure Bench: nine small cards, one per kind of conversion (transduction, conditioning, ADC, DAC, unit, scaling, calibration… | Poll |  |
| 3 | Unit conversion is not ADC conversion | Show: None: the three examples are the card. | — |  |
| 4 | Scaling: from code to engineering unit | Equation Bench: the scaling chain with each stage coloured to its place on the path: V = code × V_ref / 4096, then T = (V − V₀… | — | S1 |
| 5 | Nonlinear sensors: compensate, don't straighten | Plot Bench: a 10 kΩ NTC (β = 3950) in a divider with 10 kΩ from 3.3 V, the divider voltage against temperature from 0 to 1… | — | S11 |
| 6 | Real systems are never ideal | Draw Bench: the course path drawing, each departure the room names pinned to its stage as it is called out. | Checkpoint | S10 |
| 7 | Calibration: compare with a known reference | ★ Plot Bench: the calibration table as a data series, reference 0, 25, 50, 75 °C against indication 1.8, 26.2, 51.1, 76.5 °C… | Predict–observe–explain | S2 |
| 8 | What two points can fix | Coding Bench: `two-point`: a modelled temperature channel whose raw indication follows the table (offset, a −0.4 % gain erro… | Predict–observe–explain, Numeric answer | S21, S22, S55 |
| 9 | Calibration is not correction | Draw Bench: Reference → Compare → Characterise error → Establish relationship → Apply correction, five boxes drawn left to… | — | Analogy |
| 10 | Code, indication, corrected value, result | Figure Bench: the chain 3102 → 72.4 °C → calibration correction → 71.8 °C, with numbered labels (code, indication, corrected… | Predict–observe–explain |  |
| 11 | Four ways to write one conversion | Coding Bench: `four-ways`: one conversion, code → millivolts at 3.3 V and 12 bits, written four ways and run on a modelled 8… | Multi-select | S54, Staged fault |

### 2·060 Lab: the DC chain end to end, ideal vs non-ideal · 25 min

**Elements:** Electronics Bench ×2, Checkpoint ×2, Plot Bench ×2, Predict–observe–explain ×2, Flash quiz ×1, Coding Bench ×1, Multi-select ×1, Draw Bench ×1.

| # | Card | What the wall shows (bench) | Learner action | Also |
|---|---|---|---|---|
| 1 | Build the chain ideal | Electronics Bench: the lab chain, built stage by stage as the Flow names it: supply and load set to 1.000 A (a bench ammeter as t… | Checkpoint |  |
| 2 | One non-ideality at a time | ★ Electronics Bench + Plot Bench: inject in order, one row each, every row keeping the ones before: (1) R_S at +1 % (10.1 mΩ) → code 1253, 1.009… | Predict–observe–explain, Flash quiz | S3, Staged fault, Staged fault, Staged fault, Staged fault, Staged fault, Staged fault |
| 3 | Through the firmware to a number | Coding Bench: `dc-lab`: row 5's code scaled by the 050 equation (1.0345 A), then a two-point calibration taken through the w… | Multi-select | S55 |
| 4 | Checking against the Day 1 budget | Plot Bench: the D1·020 budget for this chain as two bands round 1.000 A: worst case ±4.6 % (1 + 1 + 1 + 0.5 + 1 % plus one… | Predict–observe–explain | S5 |
| 5 | The DC pass, closed | Draw Bench: the course path drawing complete, each stage lit with the row number that entered there, and the thesis writte… | Checkpoint | S4 |

### 2·070 AC as the quantity: RMS and crest factor · 30 min

**Elements:** Predict–observe–explain ×3, Plot Bench ×2, Draw Bench ×1, Equation Bench ×1.

| # | Card | What the wall shows (bench) | Learner action | Also |
|---|---|---|---|---|
| 1 | The quantity starts to move | Draw Bench: `waveform-construction` (existing): the phasor turning and drawing v(t) = V_peak·sin(2πft), labelled 230 V RMS… | — |  |
| 2 | 230 V of what? | ★ Plot Bench: v(t) = 325.3·sin(2π·50·t) over two cycles; | Predict–observe–explain | S26, S24 |
| 3 | Is 0.707 universal? | Equation Bench: V_RMS = √(mean of v²) with `simulate` driving v as a sine, then a square, then a triangle, all with a 1 V peak… | Predict–observe–explain | S25 |
| 4 | Crest factor | Plot Bench: the three waveforms at the same RMS, 230 V: square peak 230 V, sine 325 V, triangle 398 V, each with its crest… | Predict–observe–explain | S56 |

### 2·080 Isolation and electrical safety · 35 min

**Elements:** Poll ×2, Draw Bench ×2, Numeric answer ×2, Equation Bench ×1, Analogy ×1, Flash quiz ×1, Figure Bench ×1, Predict–observe–explain ×1, Electronics Bench ×1, Circuit predict ×1.

| # | Card | What the wall shows (bench) | Learner action | Also |
|---|---|---|---|---|
| 1 | What actually injures? | Equation Bench: body current = V / R_path, with V and R_path on dials, and a Figure beside it of two paths through the body (h… | Poll | Analogy |
| 2 | Isolation: information crosses, the path does not | Draw Bench: an optocoupler across an isolation barrier: the input circuit and its LED on the left with its own ground symb… | — | S57 |
| 3 | Isolation is not buffering | — | Flash quiz |  |
| 4 | Where galvanic isolation belongs | Draw Bench: the capstone meter's blocks, sensor → signal conditioning → ADC → digital interface → processing, with a dashe… | Poll | Staged fault |
| 5 | Two meters at the distribution panel | Figure Bench: an installation drawn as CAT IV (origin of supply, service entrance), CAT III (distribution panel, fixed wirin… | Predict–observe–explain, Numeric answer | S14, S56 |
| 6 | Past the rating | ★ Electronics Bench: `overpower` (existing): V1 across R1 (470 Ω) in series with R2 (2.2 kΩ), and R3 (10 kΩ) across V1; | Circuit predict, Numeric answer | Staged fault |

### 2·090 Ground as an impedance: returns, loops and differential sensing · 40 min

**Elements:** Electronics Bench ×4, Circuit predict ×2, Equation Bench ×1, Numeric answer ×1, Draw Bench ×1, Checkpoint ×1.

| # | Card | What the wall shows (bench) | Learner action | Also |
|---|---|---|---|---|
| 1 | What is 0 V? | Electronics Bench: `ground-return` (first met in 030): a DMM between the supply's ground and the far end of the return trace TR, … | Circuit predict | S23 |
| 2 | How much is ten milliohms worth? | ★ Electronics Bench + Equation Bench: Equation first: 2 A × 10 mΩ = 20 mV; | Numeric answer | S51, Staged fault |
| 3 | Ground loops | Electronics Bench + Draw Bench: Draw first: two instruments, each bonded to earth through its own mains lead, joined by a signal cable whose s… | Circuit predict | S57 |
| 4 | Differential sensing: the structural fix | Electronics Bench: `ground-return` again with the DMM replaced by a differential probe (as in `divider-differential`): tip on the… | Checkpoint | S16, Staged fault |

## Day 3: The AC chain, power, and the capstone

### 3·010 Parasitic C and L: what probes and wiring add · 35 min

**Elements:** Plot Bench ×3, Predict–observe–explain ×3, Draw Bench ×2, Figure Bench ×1, Poll ×1, Checkpoint ×1.

| # | Card | What the wall shows (bench) | Learner action | Also |
|---|---|---|---|---|
| 1 | Every connection is a circuit you added | Figure Bench: a scope screenshot of a square wave with a rounded leading corner, a spike and a few cycles of ringing at each… | Poll | S70 |
| 2 | Impedance has R, L and C — and so does the wiring | Draw Bench: a length of wire drawn as a line, then redrawn as what the model says it is: series R, series L, and C to its … | — |  |
| 3 | Probe compensation is a frequency-dependent divider | ★ Plot Bench: the ×10 probe and the scope input as a compensated divider: 9 MΩ ∥ C_comp in the tip, 1 MΩ ∥ C_in (input plus … | Predict–observe–explain | Staged fault |
| 4 | Cable capacitance loads the node | Plot Bench: a genuine 0 → 1 edge at a node of source resistance R_s, before and after the cable's capacitance hangs on it:… | Predict–observe–explain | Staged fault |
| 5 | Lead inductance rings on fast transitions | Plot Bench: a fast edge seen through the probe's ground-lead loop: the loop's L with the probe's tip capacitance (10 pF) a… | Predict–observe–explain |  |
| 6 | An ideal simulation has no parasitics until you put them there | Draw Bench: the wire-as-RLC drawing from the second card, completed: the node, the probe's tip C and C_comp, the cable C a… | Checkpoint | S70 |

### 3·020 Conditioning AC for the ADC: bias, aliasing and the anti-alias filter · 45 min

**Elements:** Plot Bench ×4, Predict–observe–explain ×3, Numeric answer ×2, Flash quiz ×2, Equation Bench ×2, Draw Bench ×2, Figure Bench ×1, Analogy ×1, Checkpoint ×1.

| # | Card | What the wall shows (bench) | Learner action | Also |
|---|---|---|---|---|
| 1 | An AC signal swings negative; the ADC pin does not | Plot Bench: the conditioned ±1.0 V, 50 Hz signal as the ADC pin sees it: clamp(b + A·sin(2π·50·t), 0, 3.3), with the uncla… | Numeric answer | S72, Staged fault |
| 2 | Bandwidth is not sampling rate | Figure Bench: an ADC datasheet's two separate lines: the sampling rate and the analog input's full-power bandwidth (a SAR co… | Flash quiz |  |
| 3 | Sampling a signal at its own frequency | Plot Bench: a 5 kHz sine (thin) and what the ADC holds from it, sin(2π·f·floor(t·fs)/fs + φ), drawn as a staircase over 1 … | Predict–observe–explain | S18 |
| 4 | We only know what we observe | — | — | Analogy |
| 5 | The Nyquist limit | Equation Bench: f_N = f_s / 2, with f_s as the slider and the worked example 10 kHz → 5 kHz; | Flash quiz |  |
| 6 | Below the Nyquist limit | ★ Plot Bench: a true sine sin(2π·f·t) (thin), its sampled-and-held staircase sin(2π·f·floor(t·fs)/fs), and a dashed alias cu… | Predict–observe–explain |  |
| 7 | Once aliased, no software can tell | Plot Bench: two cosines, a real 3 kHz and an unwanted 7 kHz, each with its staircase at fs = 10 kHz (cosines, not sines: s… | Predict–observe–explain | S71, Staged fault |
| 8 | The anti-alias filter goes before the ADC | Draw Bench: Analog signal → anti-aliasing filter → ADC → digital signal, built left to right; | — | S11 |
| 9 | Sizing a real anti-alias filter | Equation Bench: the attenuation of an n-th order Butterworth low-pass, A(f) = −10·log₁₀(1 + (f/f_c)^(2n)) dB, graphed against … | Numeric answer | S15 |
| 10 | Filtering prepares the signal for digitization | Draw Bench: the capstone's mains voltage path, stage by stage: ±325 V → divider (to ±1.0 V) → bias to 1.65 V → anti-alias … | Checkpoint |  |

### 3·030 Sampling instants: timing and jitter · 30 min

**Elements:** Predict–observe–explain ×2, Draw Bench ×1, Plot Bench ×1, Poll ×1, Coding Bench ×1, Equation Bench ×1, Checkpoint ×1.

| # | Card | What the wall shows (bench) | Learner action | Also |
|---|---|---|---|---|
| 1 | When you sample matters as much as what you sample | Draw Bench: a timeline of the loop: "read ADC", "print", "check button" as blocks of different widths (the print's width c… | Predict–observe–explain | S17 |
| 2 | Uneven spacing looks like noise | ★ Plot Bench: a 50 Hz, 1 V sine sampled at fs = 2 kHz, two staircases: at the intended instants, sin(2π·50·n/fs), and at the… | Poll |  |
| 3 | Jitter error and averaging | Coding Bench: a sampling loop on a simulated 50 Hz, 1 V sine at a nominal 200 µs interval, computing RMS over 500 samples pe… | Predict–observe–explain |  |
| 4 | Hardware-paced conversion is the fix | Equation Bench: error ≈ 2πf·A·Δt, the worst-case error of a sample taken Δt late, at the zero crossing; | Checkpoint | S73 |

### 3·040 True RMS on an MCU vs on a meter · 40 min

**Elements:** Predict–observe–explain ×3, Plot Bench ×2, Equation Bench ×2, Coding Bench ×1, Numeric answer ×1, Draw Bench ×1, Flash quiz ×1, Figure Bench ×1, Checkpoint ×1.

| # | Card | What the wall shows (bench) | Learner action | Also |
|---|---|---|---|---|
| 1 | Accumulate squares, divide, root | Coding Bench: the true-RMS routine on a buffer of 12-bit codes from the capstone's voltage path (3.3 V reference, bias at co… | Numeric answer | S26 |
| 2 | Over a whole number of cycles | Plot Bench: the RMS a firmware window reports, against the window's length W in cycles (0.5 → 3), for v = b + A·sin(2π·t +… | Predict–observe–explain | S74 |
| 3 | The integrated average | Draw Bench: the existing half-wave-mean drawing: half a sine, the area under it, and that area as a rectangle of the same … | — | S24 |
| 4 | An average-responding meter assumes a sine | Equation Bench: the meter's reading = 1.11 × rectified mean, beside the form factor FF = V_RMS / rectified mean, with `simulat… | Flash quiz | S25 |
| 5 | On PWM, the meter is wrong by a predictable amount | ★ Plot Bench: a 0/V PWM wave (V = 1) in two views. | Predict–observe–explain | Staged fault |
| 6 | Coupling and DC offset | Equation Bench: V_RMS = √(V_DC² + V_AC,RMS²), with V_DC as the slider (0 → 1.65 V) and V_AC,RMS = 0.707 V; | Predict–observe–explain | S72 |
| 7 | Your firmware can be more accurate than your multimeter | Figure Bench: two handheld meters' front panels, one marked TRUE RMS and one not; | Checkpoint |  |

### 3·050 Power on an MCU: real, reactive, and the phase-error trap · 45 min

**Elements:** Plot Bench ×3, Predict–observe–explain ×3, Numeric answer ×2, Draw Bench ×1, Figure Bench ×1, Coding Bench ×1, Checkpoint ×1.

| # | Card | What the wall shows (bench) | Learner action | Also |
|---|---|---|---|---|
| 1 | Why V × I stops being power once phase enters | Plot Bench: v(t) = √2·sin(ωt) and i(t) = √2·sin(ωt − φ) (1 V and 1 A RMS) over two cycles of 50 Hz, and p(t) = v·i with fi… | Predict–observe–explain | S26 |
| 2 | Real, reactive and apparent power | Draw Bench: start from the existing waveform-construction drawing (a phasor drawing a sine); | — |  |
| 3 | Power factor is P / S — and only sometimes cos φ | Plot Bench: v = √2·sin(ωt) and a distorted current i = √2·(sin(ωt) + h·sin(3ωt))/√(1 + h²) (1 A RMS for every h), with p =… | Predict–observe–explain |  |
| 4 | One converter, many inputs, at different times | Figure Bench: Day 1's four sensors → MUX → one sample-and-hold → ADC, re-embedded, with a timeline under it: conversions 1, … | Numeric answer |  |
| 5 | Sequential sampling is a phase error | ★ Plot Bench: the power factor a sequential (V, then I) sampler reports, against frequency f (0 → 1 kHz): cos(φ − 360°·f·Δt)… | Numeric answer, Predict–observe–explain | S17, S73, Staged fault |
| 6 | The fixes: sample together, or correct for the delay | Coding Bench: the power program on the inductive load with the mux delay on (PF 0.527); | Checkpoint |  |

### 3·060 Capstone: build an AC power meter · 70 min

**Elements:** Checkpoint ×11, Coding Bench ×5, Figure Bench ×4, Draw Bench ×3, Predict–observe–explain ×3, Plot Bench ×2, Equation Bench ×1.

| # | Card | What the wall shows (bench) | Learner action | Also |
|---|---|---|---|---|
| 1 | From v(t) and i(t) to 230 V, 4.2 A and 0.86 PF | Figure Bench: the AC doc §30 meter face, numbers only, waveforms hidden: 230.4 V, 3.21 A, 50.02 Hz, 612 W, 739 VA, PF 0.828. | Checkpoint | S75 |
| 2 | The architecture: two paths, one processor | Draw Bench: the AC doc §4 architecture, built stage by stage on the Day 1 path diagram: the system splits into voltage and… | — |  |
| 3 | The build, in twelve milestones | Figure Bench: the twelve milestones (AC doc §29) as a progress bar laid along the path, each milestone under the stage it bu… | — |  |
| 4 | The source and the load | Plot Bench: View 1: v(t) = 325.3·sin(2π·50·t) and i(t) = I_pk·sin(2π·50·t − φ), with φ (resistive 0°, inductive +40°, capa… | Checkpoint | Staged fault |
| 5 | Sensing voltage and current | Equation Bench: the two sensor scales: k_V = 1.0 V / 325.3 V ≈ 3.07 mV per volt, and k_I = 0.8 V / I_pk. | Checkpoint | Staged fault |
| 6 | Conditioning both paths | Draw Bench: the capstone voltage path from 020's last card, now with the current path beside it. | Checkpoint | Staged fault |
| 7 | Digitizing: the ADC and sampling | Coding Bench: View 4 of the ac-meter program: sampling points and codes for both channels, with resolution, reference and sa… | Predict–observe–explain | S71, Staged fault |
| 8 | Voltage and current need a known timing relationship | Coding Bench: the ac-meter program on the inductive load (φ = 60°, PF 0.50), its channel architecture switched from simultan… | Predict–observe–explain | Staged fault |
| 9 | Transfer and processing: the interface and the MCU | Figure Bench: ADC ⇄ SPI ⇄ Microcontroller, then Digital code → Numerical processing → Engineering value, with the three labe… | Checkpoint |  |
| 10 | Codes to volts and amperes, then RMS | Coding Bench: View 5 of the ac-meter program: code → ADC volts → minus the bias → ÷ conditioning scale → ÷ sensor scale, the… | Checkpoint | Staged fault |
| 11 | Power, power factor and frequency | Coding Bench: the power stage of the ac-meter program: p_n = v_n·i_n as View 5's instantaneous power, P as its mean, S = V_R… | Checkpoint | S74, Staged fault |
| 12 | Calibration and engineering units | Plot Bench: the Day 2 · 050 calibration view re-used: known DC levels applied to the sensor model as the reference (−300, … | Checkpoint | Staged fault |
| 13 | Stress the meter | ★ Coding Bench: the whole ac-meter program: front end (source and load; | Predict–observe–explain, Checkpoint |  |
| 14 | The final meter | Figure Bench: the AC doc §30 meter face from the first card, now with both waveforms; | Checkpoint | S4 |
| 15 | Where did every number come from? | Draw Bench: the capstone architecture from the second card, stepped backwards from the display to the mains as the pairs r… | Checkpoint | S75 |

### 3·070 Wrap-up: staged faults, the checklist and Q&A · 35 min

**Elements:** Figure Bench ×2, Checkpoint ×2, Benches already used ×1, Predict–observe–explain ×1, Poll ×1, Q&A ×1, Draw Bench ×1.

| # | Card | What the wall shows (bench) | Learner action | Also |
|---|---|---|---|---|
| 1 | Staged faults, presented cold | ★ Benches already used: swap the profile 10 MΩ → 10 GΩ and it reads 5.00 V. | Predict–observe–explain | S3 |
| 2 | The diagnostic checklist | Figure Bench: the one-page checklist (the 23 lines in the Flow), with a tour that spotlights, for each staged fault just sol… | Checkpoint | S3 |
| 3 | Questions, including the parked list | Figure Bench: the parked-questions list kept across the three days, one named part per question, so the chosen one is spotli… | Poll, Q&A |  |
| 4 | A number that appears is not a number you have earned | Draw Bench: the Day 1 path diagram (Day 1 · 010, "The path a measurement travels") drawn once more, each stage now carryin… | Checkpoint | S4 |
