# From Sensor to Number — Course Organization (pass 1)

This is the first pass: the **organization** of the training. It reorders the modules of
[training-overview.md](training-overview.md) along the path a measurement travels, and redistributes
the material in [transcripts/](transcripts/) into the module folders under [notes/](notes/), in the
ExSightory (EAC) course format. The prose has been moved and lightly copy-edited, not rewritten;
the wall content and learner activities are the next pass.

---

## 1. The spine: the path a measurement travels

Every module sits at one point on this path, and the modules come in the order the signal
reaches those points:

```
 QUANTITY → SENSOR → SOURCE & LOADING → CONDITIONING → ADC INPUT → CONVERSION → REFERENCE
   → DIGITAL INTERFACE → FIRMWARE (filter · calibrate · scale) → NUMBER
```

The eye analogy that opens the course (Chapter 01) already maps onto this path. Each of its stages
is a place where information can be degraded, and the course follows those same stages:

| The eye | The measurement system | Where the course teaches it |
|---|---|---|
| Sense organ (eye) | Sensor / transduction | Day 1 · 030–050 |
| Transmission pathway (optic nerve) | Loading, conditioning, wiring, ground | Day 1 · 040–060, Day 2 · 090, Day 3 · 010 |
| Processing (visual cortex) | ADC + firmware | Day 1 · 070–090, Day 2 · 010–050 |
| Learning by association ("this is called sugar") | Calibration: linking an indication to a reference | Day 2 · 050 |

### Two passes along the path: still, then moving

The path is walked **twice**, and the second walk is deliberate:

1. **The DC pass** (Day 1 → Day 2, until the lab). The quantity stands still, so time doesn't
   matter, and the room can focus on *where* error enters. The pass ends with the DC lab, which
   walks the whole path to a firmware number and checks the final error against the uncertainty
   budget from Day 1 · 020.
2. **The AC pass** (Day 2 afternoon → Day 3). The quantity now moves, so the path is walked again
   from the quantity inwards: what number describes a moving quantity (RMS), getting at it safely
   (isolation), what the wiring adds (ground, parasitics), conditioning it for the converter (bias,
   anti-alias), *when* the converter looks (jitter), what the firmware computes (true RMS, power).
   It ends with the capstone, which is that whole AC path built as one meter.

Each module's transcript opens by saying where on the path we are, and closes with a
`[[transition]]` cue that hands the signal to the next stage.

---

## 2. The reorganized schedule

All times GMT. Each day is 300 min of content plus two 15-min breaks, and every day's targets
add up to exactly 300 (`scheduledMinutes` in [course.yaml](course.yaml)).

### Day 1 — From quantity to code (Sat 10 Oct)

| # | Folder | Module | Start | Min | Path stage | Tool |
|---|---|---|---|---|---|---|
| 1 | `010-mcu-reads-2047` | Your MCU reads 2047 — what is that? | 12:00 | 15 | whole path | Electronics + Draw |
| 2 | `020-measurand-and-uncertainty` | The measurand, and what "right" means | 12:15 | 30 | quantity | Plot + Equation |
| 3 | `030-sensing` | Sensing: from physical quantity to electrical signal | 12:45 | 25 | sensor | Electronics + Draw |
| — | | *Break* | 13:10 | 15 | | |
| 4 | `040-sensor-as-source` | The sensor as a source: impedance, dividers and loading | 13:25 | 45 | source & loading | **Electronics** + Equation |
| 5 | `050-current-sensing` | Current as the quantity: shunts, Kelvin and burden voltage | 14:10 | 40 | sensor (I→V) | Electronics |
| 6 | `060-conditioning` | Signal conditioning: in-amps, gain, offset and bias current | 14:50 | 40 | conditioning | Plot + Equation |
| — | | *Break* | 15:30 | 15 | | |
| 7 | `070-adc-input` | The ADC input: sample-and-hold and acquisition time | 15:45 | 45 | ADC input | **Plot** + Equation + Draw |
| 8 | `080-adc-conversion` | Conversion: sampling, quantization, architecture and ENOB | 16:30 | 30 | conversion | Plot + Draw |
| 9 | `090-reference` | The reference voltage, and ratiometric measurement | 17:00 | 30 | reference | Plot + Equation |

### Day 2 — From code to number, then time enters (Sun 11 Oct)

| # | Folder | Module | Start | Min | Path stage | Tool |
|---|---|---|---|---|---|---|
| 1 | `010-digital-interfaces` | The code leaves the converter: open-drain, pull-ups and I²C | 12:00 | 30 | digital interface | **Plot** + Draw |
| 2 | `020-external-adcs` | External ADCs as a design choice: ADS1115 and INA226 | 12:30 | 30 | digital interface | Figure + Equation |
| 3 | `030-noise` | Noise: thermal, coupled and self-inflicted | 13:00 | 35 | firmware sees it; traced back | Equation + Coding Bench |
| — | | *Break* | 13:35 | 15 | | |
| 4 | `040-oversampling` | Oversampling, dither and digital filtering | 13:50 | 40 | firmware: filter | **Coding Bench** |
| 5 | `050-calibration-and-maths` | Scaling, calibration and the maths that loses your precision | 14:30 | 35 | firmware: calibrate, scale → number | Plot + **Coding Bench** |
| 6 | `060-dc-lab` | Lab: the DC chain end to end, ideal vs non-ideal | 15:05 | 25 | whole DC path | **Electronics** + Coding Bench |
| — | | *Break* | 15:30 | 15 | | |
| 7 | `070-ac-quantity` | AC as the quantity: RMS and crest factor | 15:45 | 30 | quantity (AC pass) | Plot + Draw |
| 8 | `080-isolation-and-safety` | Isolation and electrical safety | 16:15 | 35 | sensor at the mains | *Discussion-led* + Electronics |
| 9 | `090-ground` | Ground as an impedance: returns, loops and differential sensing | 16:50 | 40 | path | Electronics + Equation |

### Day 3 — The AC chain, power, and the capstone (Mon 12 Oct)

| # | Folder | Module | Start | Min | Path stage | Tool |
|---|---|---|---|---|---|---|
| 1 | `010-parasitics` | Parasitic C and L: what probes and wiring add | 12:00 | 35 | path | **Plot** + Figure |
| 2 | `020-ac-conditioning-and-aliasing` | Conditioning AC for the ADC: bias, aliasing and the anti-alias filter | 12:35 | 45 | conditioning → sampling | Plot + Equation + Draw |
| — | | *Break* | 13:20 | 15 | | |
| 3 | `030-sampling-instants` | Sampling instants: timing and jitter | 13:35 | 30 | conversion (when) | Plot + Coding Bench |
| 4 | `040-true-rms` | True RMS on an MCU vs on a meter | 14:05 | 40 | firmware → number | Plot + Coding Bench |
| 5 | `050-power` | Power on an MCU: real, reactive, and the phase-error trap | 14:45 | 45 | firmware, two channels | Plot + Equation + Coding Bench |
| — | | *Break* | 15:30 | 15 | | |
| 6 | `060-capstone` | Capstone: build an AC power meter | 15:45 | 70 | whole AC path | **Coding Bench** |
| 7 | `070-wrap-up` | Wrap-up: staged faults, the checklist and Q&A | 16:55 | 35 | whole path | The benches already used |

---

## 3. What changed from training-overview.md, and why

| Change | Why |
|---|---|
| **New module: Day 1 · 030 Sensing** (25 min) | The overview goes straight from uncertainty to impedance, so the first stage of the path, the sensor, is never taught. The transcripts have the most material on exactly this (Ch02, Ch04, sensor classification, compensation techniques). |
| **Current sensing and in-amps moved before the ADC** (were Day 1 · 7–8, after the ADC modules) | A shunt is a transducer (current → voltage) and the in-amp conditions its output. Both come *before* the converter on the path. |
| **Datasheet INL/DNL/offset/gain moved from Day 1 · 2 into Day 1 · 080 Conversion** | You read an ADC's error table at the converter, not before the room knows what a code is. Day 1 · 020 keeps the DMM spec and the tolerance stack-up, because they are about the measurand and the meter thread. |
| **I²C and external ADCs moved from Day 3 · 1–2 to Day 2 · 010–020** | They are the stage straight after conversion: the code leaving the converter. Firmware can't come before the code arrives. They also follow Day 1's impedance argument while it is still fresh (open-drain is "the digital face of impedance"). |
| **Noise moved to just before oversampling** (Day 2 · 030) | Noise is met where the room *sees* it, in the flickering last digits of the code, and then traced back up the path. It is also the precondition for oversampling (≥ 1 LSB of noise), which follows straight after. |
| **The DC lab moved from Day 1 end to Day 2 · 060** | The lab can now walk the *whole* DC path to a firmware number, not stop at an ADC code. It closes the DC pass. |
| **The AC pass reordered from the quantity inwards** | The quantity first (RMS), then getting at it safely (isolation), then the path (ground, parasitics), then conditioning and the converter (bias, aliasing, jitter), then firmware (true RMS, power). In the overview, aliasing and jitter came before isolation and ground. |
| **"Bias it into range" given a home** in Day 3 · 020 | Learning outcome 7 promises it, but no module taught it. It is the first thing an AC signal needs at the conditioning stage, so it opens the aliasing module. |
| **Isolation & safety moved from Day 3 to Day 2 · 080** | Isolation is how you get the sensor near the mains in the first place, so it comes right after the AC quantity is defined. |
| **Parasitic C and L moved from Day 2 · 2 to Day 3 · 010** | Its effects depend on frequency. With DC they are invisible, so they belong to the AC pass, beside ground. |
| **Five modules trimmed by 5 min** (ground, isolation, parasitics, true RMS, power) | To make room for the Sensing module without overrunning a day. |
| **Session 0** | Unchanged and not in the notes (setup only). |

### Inconsistencies found in training-overview.md (not yet fixed there)

- **Dates.** The header says *Saturday 9 – Monday 11 October*, but the schedule says Sat 10, Sun 11,
  Mon 12. 10 October 2026 is the Saturday, so the header is wrong.
- **The demo-coverage table doesn't match the module tables.** It numbers Day 1 as 10 modules
  (including "7 · Voltage & divider design", which has no module) against 9 in the schedule. Its
  Day 2 and Day 3 rows also use different names and numbering ("Scoping the chain", "Layout &
  grounding", "External ADCs & I²C" as one module).
- The overview itself still shows the **old** order. If this organization is accepted, the overview
  tables are the next thing to update.

---

## 4. Where every transcript went

| Transcript | Goes to |
|---|---|
| `Chapter 01 - The need for sensing` | D1·010 (eye analogy, the three places information degrades, course objectives). The sugar/association passage is reused as the bridge into D2·050 calibration. |
| `Chapter 02 - Measurement fundamentals` | D1·020 (measurand, metrology, why measure, objectivity/salinity, direct vs indirect). D1·030 (transducer/sensor/actuator, transduction chains, output types, analog signal, detection vs quantification, interfering inputs, "can I detect it → can I trust it"). The ADC paragraph goes to D1·080. |
| `categories_of_measurement` | D1·020 (direct, indirect, null). |
| `05_sensor_classification` | D1·030 (modulating vs self-generating, analog/digital/quasi-digital, classification by electrical quantity). Deflection vs null, and sensor order, are parked in D1·030 as optional depth. |
| `07_compensation_techniques` | D1·030 (insensitive design, opposing inputs, the list of defences). Negative feedback → D1·060. Filtering → D3·020. Mathematical correction → D2·050. |
| `08_static_characteristics` | D1·020 (true value, conventional true value). Static calibration and the calibration curve → D2·050. |
| `Chapter 03 - Signal conditioning` | D1·060 (why conditioning, the list of functions, amplification). Attenuation and buffering → D1·040. Level shifting → D2·010. Isolation → D2·080. Filtering → D3·020. Linearization → D2·050. |
| `Chapter 04 - Data domains` | D1·010 (the chain of representations: temperature → … → 27.4 °C). "The sensor is an interface" and "transduction is not unit conversion" → D1·030. |
| `Chapter 05 - Interfaces` | D1·040 (what an interface is; the 0–100 mV sensor vs 0–3.3 V ADC). "Analog does not mean accurate" → D1·030. The digital domain, and signal vs data → D2·010. |
| `Chapter 06 - Data conversion` | D1·080 (sampling and quantization). "The ADC doesn't know what the measurement means" (the driver) → D1·010 cold open, and again at D2·050 scaling. |
| `Chapter 07 - Analog to digital converters` | Loading/buffering → D1·070. Sampling, bandwidth, quantization, resolution, architectures → D1·080. Reference and input range → D1·090. ATmega328P/ESP32/ADS1115 comparison and the selection checklist → D2·020. Multiplexed inputs → D1·070 (one S/H shared) and D3·050 (the sequential-sampling trap). Bandwidth vs sampling rate → D3·020. |
| `Chapter 08 - Aliasing` | D3·020. |
| `Chapter 08 - Digital Interface` | D2·010. |
| `Chapter 10 - Communication protocols` | D2·010 (protocols, choosing an interface, electrical requirements). The data-rate budget (10 kS/s × 16 bit) → D2·020. |
| `Chapter 11 - Conversion` | D2·050 (the kinds of conversion, scaling and engineering units). |
| `Chapter 12 - Calibration` | D2·050. |
| `Chapter 13 - factors_in_making_measurements` | D1·020 (error, validity, reliability, repeatability, accuracy vs precision, the bell-curve demo, error-reduction techniques). Resolution and 1 LSB → D1·080. "Average many readings" is taught in depth at D2·040. |
| `Chapter 14 - what_is_average` | Mean, median, mode → D2·040 (moving-average vs median filters). Integrated average → D3·040 (average-responding meters). RMS → D2·070. RSS → D1·020 (error budget) and D2·030 (independent noise sources). Geometric and harmonic mean → parked (appendix in D2·040). |
| `Chapter 15 - measurement_errors` | D1·020 (error vs mistake, categories, worst case, RSS and the error budget, operational definitions). Insertion error → D1·040 and D1·050. Quantization error → D1·080. Last-digit bobble → D2·030. Ground loop → D2·090. Dynamic error → D1·070. |
| `Chapter 16 - logarithmic_representations_decibels` | D1·060, at first use (CMRR in dB). It is reused by ENOB (D1·080) and the anti-alias filter (D3·020). The special scales (dBm, VU, dBmV) are parked as an appendix. |
| `AC_Metering_System_Simulation_Project.md` | D3·060 capstone (and threaded through the AC pass). |

---

## 5. Gaps: modules with little or no transcript yet

Every module has a `transcript.en.md`. Where the transcripts had nothing for a knowledge point, the
file says so with a `> GAP —` note naming what is needed, taken from the overview. In rough order of
how much is missing:

- **No transcript material at all:** D1·050 current sensing, D1·070 ADC input/S&H (the centrepiece),
  D1·090 ratiometric, D2·030 noise, D2·060 DC lab, D2·080 isolation & safety (except the
  optocoupler paragraph), D3·010 parasitics, D3·030 jitter, D3·050 power, D3·070 wrap-up.
- **Partial:** D1·040 impedance (has loading, buffering, attenuation; no Thevenin or divider
  design), D1·060 (has the conditioning catalogue and dB; no in-amp/CMRR/offset), D1·080 (has
  sampling/quantization/architectures; no ENOB or INL/DNL), D2·040 (has averages; no 4ⁿ rule or
  dither), D2·050 (has conversion/scaling/calibration; no fixed-point maths), D2·070 (has the RMS
  definition only), D3·040 (has the integrated average only).
- **Well covered:** D1·010, D1·020, D1·030, D2·010, D2·020, D3·020, D3·060 (from the AC metering
  project).

---

## 6. How a module folder is laid out (EAC format)

```
notes/DayNN/
  transcript.en.md          ← the day's arc, for the presenter (chapter-level transcript)
  NNN-slug/
    en.md                   ← the wall (cards), each card's ```flow (the teleprompter) and its PLAN
    transcript.en.md        ← the lesson-level script panel: arc, assets, actions, hand-off
```

*Updated 7 October:* the card-by-card prose moved from `transcript.en.md` into a ` ```flow ` fence
under each card. The plan for each card's visual, questions and thoughtseeds is a `<!-- PLAN -->`
block in the card ([course-plan.md](course-plan.md)). The bullets below describe the original pass.

- **`en.md` frontmatter** carries `targetMinutes`, `motivates` (the problem this module answers),
  `objectives` and `concepts` (ids from [course.yaml](course.yaml)).
- **Cards** are `##` headings separated by `***` dividers, one primary knowledge point each (EAC 01 §4).
  Each card has a one- or two-sentence statement of its idea, taken from the transcript wording
  where possible. Planned learner actions, demos and sources are HTML comments
  (`<!-- ACTION: … -->`, `<!-- DEMO: … -->`), so the file compiles while those blocks are still to
  be written.
- **`transcript.en.md`** uses the **same `##` headings** as the cards, so the script lines up with
  the wall. The cues are `[[ask]]`, `[[pause]]`, `[[demo]]`, `[[reveal]]` and `[[transition]]`.
