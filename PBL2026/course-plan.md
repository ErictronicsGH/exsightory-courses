# From Sensor to Number — Teaching Plan (pass 3)

What each card **shows**, what the room **does**, and what it **plants** for later. The plan lives
in each card of `notes/DayNN/NNN-slug/en.md` as a `<!-- PLAN … -->` block, where it will be built.
This file holds the format, the vocabulary, the seed register, and (§6) the index of every module's
plan and the bench work it needs.

The order is settled ([course-organization.md](course-organization.md)), and the words are in Flow.
This pass decides the visual, the interaction and the connective tissue of every card. The benches
then get built as and when the plan needs them.

---

## 1. The PLAN block

One per card, replacing the old `ACTION / DEMO / FIGURE / EQUATION / ANALOGY` comments. Lines are
optional except that **every module has one centrepiece SHOW** and **at least one ASK**. Fewer,
better: a card with nothing to show needs no SHOW.

```
<!-- PLAN
SHOW     <Bench> — <what is on the Canvas>. Drive: <what the presenter moves, in order>.
         Look for: <the moment the idea lands>.
         Status: ready | needs Electronics: <part or feature> | needs Draw: <drawing to make>
                 | needs Coding Bench: <program> | needs asset: <photo / GLB / PDF / screenshot>
ASK      <type> (<before|after> the statement) — "<prompt>"
         options: <a> | <b> | <c>        answer: <b>      (poe, flash, multi-select)
         answer: <number> <unit> ± <tolerance>             (numeric)
         reveal: <what the SHOW does that settles it>
         explain: <one sentence for after the reveal — never a verdict on anyone>
         depth: use | understand | create    practice: <one of §2.3>
SEED     plants S<n> — "<the line the presenter says, as they would say it>"
HARVEST  S<n> — "<the callback line>"
ANALOGY  <the comparison, where it maps, and where it breaks>
FAULT    <a staged fault this card's SHOW could host — for the labs and the wrap-up>
-->
```

**Where the ASK goes.** If the card's statement gives the answer away, the ASK comes *before* the
statement (it becomes its own card, just ahead). Predict, then show, then explain.

---

## 2. Vocabulary

### 2.1 Learner actions (Studio fences)

| Type | Use it when | Notes |
|---|---|---|
| `poe` | The room can commit to an outcome before a SHOW reveals it. **The default.** | Never scored. Explanation goes after the reveal. |
| `circuit` + `predict` | The SHOW is an Electronics Bench circuit with a `reveal`. | Required before any circuit reveal. |
| `circuit` + `measure` | "Where would you put the probe?" | Moves the bench probe. |
| `numeric` | A calculation with one answer: LSB size, settling time, counts of error. | Give tolerance and unit. |
| `flash` | A quick classification or recall, 20–45 s. | Not before a reveal; use `poe` there. |
| `multi-select` | More than one right answer ("which of these can calibration fix?"). | All-or-nothing. |
| `poll` | Experience or opinion, no right answer. | Good for cold opens. |
| `checkpoint` | A worked procedure the room does step by step. | Labs, budgets. |
| `qa` | Open the floor; at each break. | |

**Not authored:** the reflection that closes each subsection is emitted by the compiler (pedagogical
invariant IX). Do not write "what surprised you?" yourself.

### 2.2 Depth (invariant III)

`use` — apply a rule. `understand` — explain why it holds. `create` — design something new with it.
Aim for a course that is not 90% `use`.

### 2.3 Practice (invariant IV)

asking questions · defining problems · developing models · planning investigations · analysing data ·
computational thinking · constructing explanations · designing solutions · arguing from evidence

### 2.4 Rules the room is held to

- **The room commits before it is shown** (invariant V). Every reveal has a prediction in front of it.
- **Nothing renders a verdict** (VI). Explanations say what happened and why, never who was right.
- **A prediction is never scored** (VIII). A confidence question beside a prediction is welcome.
- **The instrument is honest** (VII). No more digits than the inputs support.
- **The failure is the artefact** (XI). A staged fault is diagnosed by measurement — the FAULT lines
  feed the DC lab, the capstone and the wrap-up.

---

## 3. Bench status

| Bench | State | Plan against it as |
|---|---|---|
| Equation, Plot, Figure, Model | Ready | ready |
| Draw | Almost done | `needs Draw: <the drawing>` — the bench is there, the drawing is ours to make |
| Electronics | Being worked on. Today DC only; no op-amp/in-amp, switch, clock, ADC, AC source, scope, transformer | Plan the **ideal** demo on the circuit, and name the part or feature it needs. Those lines become the bench's backlog. |
| **Coding Bench** | Planned, for all kinds of coding | `needs Coding Bench: <program>` — every firmware demo (oversampling, calibration maths, true RMS, power, the capstone's firmware) |
| Widget | Available (sandboxed HTML/JS, not in Study) | Only where no bench will ever fit |

Live activities are taken as available for the online cohort (owner, 2026-10-07).

---

## 4. Thoughtseeds: the seed register

A **thoughtseed** is a question, an observation or an image planted in one card and harvested in a
later one, so the course pays off its own setups. It is the organic order made audible. Each seed is
planted once and harvested at least once. The presenter says the planting line lightly — the room
should only half-notice it, until it comes back.

| ID | Planted | The seed | Harvested |
|---|---|---|---|
| S1 | D1·010 | The ADC doesn't know what 2047 means — the driver doesn't know why the passengers travel. | D2·050 (scaling gives the code its meaning) |
| S2 | D1·010 | The child and the sugar: recognition is learned by association. | D2·050 (calibration is that association, against a reference) |
| S3 | D1·010 | Three places information is spoiled: organ, pathway, processor. | D2·060 (the lab attributes each error to a place); D3·070 (staged faults, the checklist) |
| S4 | D1·010 | "A number that appears is not a number you have earned." | D2·060; D3·060; D3·070 (closing line) |
| S5 | D1·020 | The uncertainty budget, built and kept. | D2·060 (does the final error land inside it?) |
| S6 | D1·020 | Insertion error: measuring changes the measurand. | D1·040 (the voltmeter, the ADC input); D1·050 (burden voltage) |
| S7 | D1·020 | The last digit that will not sit still (reading error). | D2·030 (it is noise); D2·040 (and it is useful — dither) |
| S8 | D1·030 | "Measurement is not free of energy transfer." | D1·040 (loading) |
| S9 | D1·030 | The modulating sensor's excitation is the designer's choice. | D1·090 (make it the reference — ratiometric) |
| S10 | D1·030 | "Analog does not mean accurate." | D2·030 (noise); D2·050 (calibration) |
| S11 | D1·030 | The five defences against interference. | D1·060 (negative feedback); D2·050 (mathematical correction); D3·020 (filtering) |
| S12 | D1·030 | Detect, or quantify? | D1·080 (to quantify, digitize) |
| S13 | D1·040 | The buffer: keeps the voltage, supplies the current. | D1·070 (fix two for the sampling capacitor) |
| S14 | D1·040 | High in, low out — impedance decides who disturbs whom. | D2·010 (open-drain and the pull-up are the same argument, digitally) |
| S15 | D1·060 | Decibels: a ratio you can add. | D1·080 (ENOB); D3·020 (filter attenuation) |
| S16 | D1·060 | Differential gain ignores what both inputs share (CMRR). | D2·020 (the ADS1115's paired inputs); D2·090 (differential sensing beats a ground loop) |
| S17 | D1·070 | One capacitor, many inputs — converted at *different times*. | D3·030 (sampling instants); D3·050 (sequential V and I sampling is a phase error) |
| S18 | D1·080 | "With a still quantity, how often we sample hardly matters — today." | D3·020 (aliasing) |
| S19 | D1·080 | A sigma-delta oversamples inside itself. | D2·040 (oversampling in firmware is the same trick) |
| S20 | D1·080 | More bits are not more accuracy; ENOB is the honest number. | D2·020 (the ADS1115 noise table); D2·040 (buying bits with time) |
| S21 | D1·080 | Offset and gain shift the line; INL and DNL bend it. | D2·050 (two points fix the first, nothing fixes the second) |
| S22 | D1·090 | Reference error passes through one-for-one. | D2·050 (a gain calibration absorbs it) |
| S23 | D2·030 | Return current makes a voltage in the ground path. | D2·090 (ground as an impedance) |
| S24 | D2·040 | Mean, median, mode: which "average"? | D2·070 (RMS is another average); D3·040 (an average-responding meter) |
| S25 | D2·070 | 0.707 belongs to the sine only. | D3·040 (the meter that assumes a sine) |
| S26 | D2·070 | Equal heating is the definition of RMS. | D3·040 (true RMS computed in firmware); D3·050 (real power is average power) |

Agents planning a day may add seeds that start and end inside their own day (numbered from S30 for
Day 1, S50 for Day 2, S70 for Day 3), and list them in their report.

---

## 5. What each module's plan must achieve

- **One centrepiece SHOW** that carries the module's main idea, preferring a bench the room can
  drive over a picture.
- **The motivates line made visible** in the first card: the room feels the problem before the
  answer arrives.
- **At least one ASK**, ideally one for every two or three cards, with a spread of depth — not all
  `use`.
- **Every seed in §4 planted or harvested where the register says**, with the actual line.
- **The non-ideal beside the ideal**: the overview's promise that every module pairs a clean view
  with a deliberately non-ideal one, because the gap is the teaching moment.
- **Honest status**: every SHOW names what it needs, so §6 becomes the bench backlog.

---

## 6. Index

*Generated from the PLAN blocks.*

| Module | Centrepiece | ASKs | Depth |
|---|---|---|---|
| **1·010** Your MCU reads 2047 — what is that? | Electronics — the cold-open circuit (Demo #1): a sensor output of 3.585 V into two 100 kΩ | 1 poe, 1 poll, 1 checkpoint | 3 understand |
| **1·020** The measurand, and what "right" means | Plot — two instruments' readings of one voltage as bell curves exp(−(x−μ)²/2σ²), labelled | 2 flash, 2 numeric, 1 multi-select, 1 checkpoint | 3 use, 2 understand, 1 create |
| **1·030** Sensing: from physical quantity to electrical signal | Electronics — a 10 k NTC (thermistor-ntc-10k, B = 3950 K) under a 10 kΩ resistor from the bench | 1 poe, 1 flash, 1 circuit, 1 multi-select, 1 poll | 2 understand, 2 use, 1 create |
| **1·040** The sensor as a source: impedance, dividers and loading | Electronics — divider-loading (Demo #1): 10 V across R1 and R2, 1 MΩ each; probe VP1 on MID; | 2 numeric, 1 multi-select, 1 circuit, 1 checkpoint | 3 understand, 1 use, 1 create |
| **1·050** Current as the quantity: shunts, Kelvin and burden voltage | Electronics — four-wire-sensing: a precision 1 mA source into a Pt100, two metres of AWG 24 | 3 circuit, 1 numeric, 1 flash | 3 understand, 2 use |
| **1·060** Signal conditioning: in-amps, gain, offset and bias current | Plot — the ADC's view of the in-amp: y = clamp(G·(x + V_os), 0, 3.3) against x = V_in from 0 | 2 poe, 1 multi-select, 1 flash, 1 numeric | 3 understand, 2 use |
| **1·070** The ADC input: sample-and-hold and acquisition time | Plot — Demo #2, the switched-capacitor sampler, as two linked plots. (a) v_C(t) = | 3 poe, 2 numeric, 1 multi-select | 3 understand, 2 use, 1 create |
| **1·080** Conversion: sampling, quantization, architecture and ENOB | Plot — the quantizer staircase q·round(x/q) and its error sawtooth x − q·round(x/q), x from | 3 numeric, 1 poe, 1 flash, 1 multi-select | 3 use, 3 understand |
| **1·090** The reference voltage, and ratiometric measurement | Plot — the code against the rail voltage V_dd from 3.0 to 3.6 V for two inputs: an absolute | 2 poe, 1 numeric, 1 poll, 1 checkpoint | 3 understand, 1 use, 1 create |
| **2·010** The code leaves the converter: open-drain, pull-ups and I²C | Plot — the bus voltage after release, v = 3.3·(1 − exp(−t/(R·C))), t in ns; sliders R | 5 poe, 2 poll, 1 multi-select, 1 numeric, 1 checkpoint | 8 understand, 1 create, 1 use |
| **2·020** External ADCs as a design choice: ADS1115 and INA226 | Figure — the ADS1115 datasheet (TI SBAS444) as a tour: block diagram (AIN0–AIN3 → MUX → | 3 numeric, 2 poe, 1 flash, 1 checkpoint, 1 poll | 3 understand, 3 create, 2 use |
| **2·030** Noise: thermal, coupled and self-inflicted | Equation — v_n = √(4kTRB), T, R and B on dials, k fixed; graphed against R on log axes | 4 poe, 2 numeric, 1 circuit | 5 understand, 2 use |
| **2·040** Oversampling, dither and digital filtering | Coding Bench — `oversample`: input 2047.4 LSB, N = 256, result printed to 1/100 LSB | 5 poe, 2 numeric, 1 flash | 6 understand, 2 use |
| **2·050** Scaling, calibration and the maths that loses your precision | Plot — the calibration table as a data series, reference 0, 25, 50, 75 °C against | 3 poe, 1 poll, 1 checkpoint, 1 numeric, 1 multi-select | 5 understand, 2 use |
| **2·060** Lab: the DC chain end to end, ideal vs non-ideal | Electronics + Plot — inject in order, one row each, every row keeping the ones before: | 2 checkpoint, 2 poe, 1 flash, 1 multi-select | 5 understand, 1 use |
| **2·070** AC as the quantity: RMS and crest factor | Plot — v(t) = 325.3·sin(2π·50·t) over two cycles; v²(t) on a second axis with its area | 3 poe | 3 understand |
| **2·080** Isolation and electrical safety | Electronics — `overpower` (existing): V1 across R1 (470 Ω) in series with R2 (2.2 kΩ), | 2 poll, 2 numeric, 1 flash, 1 poe, 1 circuit | 3 understand, 3 use, 1 create |
| **2·090** Ground as an impedance: returns, loops and differential sensing | Equation + Electronics — Equation first: 2 A × 10 mΩ = 20 mV; 1 LSB = 3.3 V / 4096 ≈ | 2 circuit, 1 numeric, 1 checkpoint | 3 understand, 1 use |
| **3·010** Parasitic C and L: what probes and wiring add | Plot — the ×10 probe and the scope input as a compensated divider: 9 MΩ ∥ C_comp in the | 3 poe, 1 poll, 1 checkpoint | 5 understand |
| **3·020** Conditioning AC for the ADC: bias, aliasing and the anti-alias filter | Plot — a true sine sin(2π·f·t) (thin), its sampled-and-held staircase sin(2π·f·floor(t·fs)/fs), | 3 poe, 2 numeric, 2 flash, 1 checkpoint | 4 use, 3 understand, 1 create |
| **3·030** Sampling instants: timing and jitter | Plot — a 50 Hz, 1 V sine sampled at fs = 2 kHz, two staircases: at the intended instants, | 2 poe, 1 poll, 1 checkpoint | 3 understand, 1 create |
| **3·040** True RMS on an MCU vs on a meter | Plot — a 0/V PWM wave (V = 1) in two views. Top: the waveform over two periods, | 3 poe, 1 numeric, 1 flash, 1 checkpoint | 4 understand, 2 use |
| **3·050** Power on an MCU: real, reactive, and the phase-error trap | Plot — the power factor a sequential (V, then I) sampler reports, against frequency f | 3 poe, 2 numeric, 1 checkpoint | 3 understand, 2 use, 1 create |
| **3·060** Capstone: build an AC power meter | Coding Bench — the whole ac-meter program: front end (source and load; sensors with offset, | 11 checkpoint, 3 poe | 9 use, 3 understand, 2 create |
| **3·070** Wrap-up: staged faults, the checklist and Q&A | Five staged faults, each rebuilt on the bench where it was taught, shown with only the setup and | 2 checkpoint, 1 poe, 1 poll, 1 qa | 2 understand, 1 use, 1 ?, 1 create |

**Totals:** 154 ASKs — 53 poe, 29 numeric, 28 checkpoint, 13 flash, 12 poll, 9 multi-select, 9 circuit, 1 qa; depth 89 understand, 48 use, 16 create, 1 ?.

### Seeds as planned

| Seed | Planted | Harvested |
|---|---|---|
| S1 | 1·010 | 2·050 |
| S2 | 1·010 | 2·050 |
| S3 | 1·010 | 2·060, 3·070, 3·070 |
| S4 | 1·010 | 2·060, 3·060, 3·070 |
| S5 | 1·020 | 2·060 |
| S6 | 1·020 | 1·040, 1·050 |
| S7 | 1·020 | 2·030, 2·040 |
| S8 | 1·030 | 1·040 |
| S9 | 1·030 | 1·090 |
| S10 | 1·030 | 2·030, 2·050 |
| S11 | 1·030 | 1·060, 2·050, 3·020 |
| S12 | 1·030 | 1·080 |
| S13 | 1·040 | 1·070 |
| S14 | 1·040 | 2·010, 2·080 |
| S15 | 1·060 | 1·080, 3·020 |
| S16 | 1·060 | 2·020, 2·090 |
| S17 | 1·070 | 3·030, 3·050 |
| S18 | 1·080 | 3·020 |
| S19 | 1·080 | 2·040 |
| S20 | 1·080 | 2·020, 2·040 |
| S21 | 1·080 | 2·050 |
| S22 | 1·090 | 2·050 |
| S23 | 2·030 | 2·090 |
| S24 | 2·040 | 2·070, 3·040 |
| S25 | 2·070 | 3·040 |
| S26 | 2·070 | 3·040, 3·050 |
| S30 | 1·010 | 1·090, 1·090 |
| S31 | 1·010 | 1·070 |
| S32 | 1·040 | 1·070 |
| S33 | 1·050 | 1·060 |
| S34 | 1·080 | 1·080 |
| S35 | 1·040 | 1·070, 1·090 |
| S36 | 1·020 | 1·040, 1·050 |
| S37 | 1·020 | 1·050 |
| S50 | 2·010 | 2·020 |
| S51 | 2·020 | 2·090 |
| S52 | 2·020 | 2·030 |
| S53 | 2·030 | 2·040 |
| S54 | 2·040 | 2·050 |
| S55 | 2·050 | 2·060 |
| S56 | 2·070 | 2·080 |
| S57 | 2·080 | 2·090 |
| S58 | 2·020 | 2·040 |
| S70 | 3·010 | 3·010 |
| S71 | 3·020 | 3·060 |
| S72 | 3·020 | 3·040 |
| S73 | 3·030 | 3·050 |
| S74 | 3·040 | 3·060 |
| S75 | 3·060 | 3·060 |

---

## 7. Bench backlog — what the plan asks the benches for

Merged from the three days' PLAN blocks, grouped by bench, roughly in the order the course first needs
each item. The card-level detail (what is driven, what the room should see) is in each `Status:` line.

### Electronics Bench

Parts and features the course needs, in the order they first appear:

1. **ADC-input block** — analog switch with R_on, sampling capacitor, acquisition window, multiplexer,
   selectable reference, code readout. First needed D1·010 (the cold open's 8 % needs it; until it exists a Draw
   drawing with computed numbers stands in, since the 10 MΩ DMM reads that divider only 0.5 % low), and it is the centrepiece of D1·070. It also serves D1·090, D2·060, D2·090.
2. **Time-domain view** — a scope trace, with C_in; a clock/pulse source and step/square sources. Needed
   for D1·070, D2·010 (bus edges), D3·010.
3. **Op-amp follower and in-amp** (V_os, I_b, CMRR). Needed for D1·040 and D1·070 (buffer), D1·060,
   D2·060.
4. **Resistor value dials** (bridges, gain resistors, dividers). D1·030, D1·040, D2·080.
5. **Sensors and loads** — thermocouple (self-generating), milliohm four-terminal shunt, an MCU load with
   a brown-out threshold, a switched load step, a precision reference source. D1·030, D1·050, D1·090.
6. **Digital input part** with V_IL/V_IH and an undefined state; P-MOSFET or push-pull output;
   optocoupler. D2·010, D2·080.
7. **Resistor thermal noise** and separate reference nets. D2·030, D2·090.
8. **AC sources** (50 Hz; thermal averaging), a **v·i trace**, **DMM profiles** (AC/DC coupling,
   average-responding vs true RMS), an **inductor class**, a **frequency sweep / Bode view**. D2·070,
   D3·010, D3·040, D3·050.
9. **Probe tip capacitance and a C_comp dial** (probe-x10 has only r_series today), cable C, ground-lead
   L, and a scope input C. D3·010.

New fixtures to build from **existing** parts: `level-shift`, `open-drain-bus`, `ground-return`,
`ground-loop`, the DC-lab chain (rows 1–2 work today with tolerance and lead resistance).

### Draw Bench — drawings to make

- **The course path drawing** — the single most reused asset. It is built stage by stage in D1·010 and
  returns in most modules with a focus, overlay or pins: the digital leg, the firmware split, checklist
  pins, the AC pass, the final state.
- **Day 1:** the eye laid over the path; a redraw of `image-3.png`; the pressure → voltage chain; the
  five defences; four targets (accuracy vs precision); the Thévenin redraw; the S/H inside the pin with
  its timing; the mux timeline; a 4-bit SAR search.
- **Day 2:** wired-AND; the calibration chain; the optocoupler barrier; three barrier positions; the
  ground loop.
- **Day 3:**
  - the wire as R, L and C (two states);
  - the aliasing fold;
  - the anti-alias filter chain;
  - the capstone's voltage and current paths;
  - loop-paced vs timer-paced timeline;
  - the power triangle (extending the existing `waveform-construction`);
  - the capstone architecture with six view markers, plus a reverse walk.
- **Existing and reused:** `waveform-construction` (a phasor drawing a sine), `half-wave-mean`.

### Coding Bench — programs

| Program | Module | What the room sees change |
|---|---|---|
| cold-open firmware | D1·010 | three lines that turn a code into a confident, wrong number |
| sigma-delta modulator (first-order) · SAR step-through (optional) | D1·080 | the bitstream and its average; one comparison per bit |
| `bobble`, `threshold` | D2·030 | the last digit dancing; a relay chattering at a threshold |
| `oversample` (noisy / too quiet / dithered), `filters` (moving average, IIR, median) | D2·040 | bits bought with time, and the latency each filter costs |
| `two-point`, `four-ways` | D2·050 | calibration constants; one conversion written four ways with its live error |
| `dc-lab` | D2·060 | the whole DC path to a number, fault by fault |
| `jitter-rms` | D3·030 | random vs signal-dependent timing, averaging on and off |
| `true-rms` | D3·040 | whole-cycle windows, offsets, the meter's error |
| `power` (mux delay, correction, distorted load) | D3·050 | the reported power factor drifting with frequency, then corrected |
| `ac-meter` (full) | D3·060 | the capstone: scenarios 1–8 through six views |

### Assets to source or make

- **Models:** an eye GLB.
- **Datasheets (PDF):**
  - an MCU ADC table (offset, gain, INL, DNL);
  - the ADS1115 (TI SBAS444) and INA226 (TI SBOS547);
  - a datasheet showing input bandwidth against sample rate;
  - a true-RMS AC meter specification.
- **Photos and screenshots:** a DMM front panel and its spec page; meter CAT labels; scope screenshots
  of probe compensation (under, flat, over).
- **SVGs:**
  - the nine-point checklist and the one-page course checklist;
  - SPI, and the I²C byte with ACK;
  - the converter comparison table; the kinds of conversion; the code → result chain;
  - single-ended vs differential; the body current path; CAT locations;
  - the MUX timeline; a meter face; the capstone milestone bar.
- **Figures from source documents:** the AC metering doc §9.2 figure (see its CHECK on the 2.5 V
  label); the IEC 61010-1 transient table.


### To confirm before delivery

- The ADS1115 input impedance (~710 kΩ at the highest PGA gains) against the datasheet table.
- The ATmega328P internal reference range and its ≈10 kΩ source recommendation.
- The CAT transient figures against IEC 61010-1.
- The AC doc's current sensor "5 A → ±0.8 V": RMS or peak? (0.113 vs 0.16 V/A)
- `net-sizing`'s caption ("25 mΩ per 100 mm") against ρ/(w·t) ≈ 0.96 Ω/m — read the trace value off the
  bench.
- D1·080's Flow still carries the source's errors (8.502 / 8.41 / 8.880 V; binary 1001 = 5;
  2.17 V → 2714, which is 2693 at 12 bits on 3.3 V). They are flagged CHECK, not changed.
