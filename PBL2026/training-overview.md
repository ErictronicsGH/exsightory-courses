# From Sensor to Number — Trustworthy DC & AC Measurement with ADCs and Microcontrollers

**Profesir's Birthday Lectures 2026**

| | |
|---|---|
| **Format** | Fully online — live, instructor-led |
| **Dates** | Saturday 10 – Monday 12 October 2026 |
| **Time** | 12:00 noon – 5:30 PM **GMT** (Accra time), all three days |
| **Contact hours** | 15 hours across 3 days, plus an optional 1-hour setup session |
| **Fee** | GHS 299 |
| **Tutor** | Profesir — Eric Obeng |
| **Organizer** | Profesir |
| **Sponsors & Partners** | TECH Foundation Africa · Erictronics Systems |
| **You will need** | A computer, tablet or phone with a stable internet connection — no lab equipment, no test gear, no components |

---

## Purpose

Your microcontroller reads `2047`. What is that actually?

This program targets a specific, diagnosed gap: engineers and students who can wire a sensor to an ADC and print a number, but cannot say how much of that number to believe. The chain from a physical quantity to a value in a variable has a dozen places to lose accuracy — source impedance, acquisition time, reference drift, offset, noise, sampling jitter, firmware maths — and almost none of them announce themselves. The code runs. The number appears. It is wrong by 8% and nothing anywhere reports an error.

The course teaches that chain end to end: **sensor → conditioning → ADC → firmware → number**, with every error source located, quantified, and fixed.

Running alongside it is a second thread. When you check your MCU's reading against a multimeter and they disagree, which one is wrong? Often the meter — and knowing *how* meters lie (input impedance, burden voltage, average-responding RMS, coupling, bandwidth) is what lets you use one as a trustworthy reference instead of an argument.

The thesis in one sentence: **a number that appears is not the same as a number you have earned.**

Every module pairs a clean, idealized simulation with a deliberately non-ideal one, so the gap between "the datasheet says X" and "your firmware reports Y" is the actual teaching moment. Reproduced entirely in software — no hardware, no component sourcing, no shipping. The course runs identically for every participant regardless of location or bench access.

## Who this is for

Embedded and firmware developers, electronics and EE students, hardware engineers, technicians and makers who are building — or want to build — measurement into their own systems. If you have ever put an analog sensor on an ADC pin and quietly hoped the number was right, this is aimed at you.

**Prerequisites:** Ohm's law, series/parallel circuits, ability to read a basic schematic, and familiarity with reading C-style code. You will need a computer, tablet or phone with a stable internet connection — a phone can join from its browser — to join the live sessions in ExSight and take part in the live questions — there is nothing to install for the simulations, because every demonstration runs on ExSight Studio's benches. No prior simulation experience needed — Session 0 covers joining and taking part. You do not need to be fluent in any specific MCU family; examples are drawn from STM32, ESP32, AVR and RP2040 and the principles are common to all.

## What you will be able to do afterwards

1. Trace a measurement from physical quantity to firmware variable and name the error contributed at every stage.
2. Size a source impedance against your ADC's acquisition time, instead of discovering the mismatch as a mystery offset.
3. Say what your ADC's *effective* resolution is, as distinct from the bit count in its marketing.
4. Choose a voltage reference deliberately, and know when ratiometric measurement makes reference accuracy irrelevant.
5. Gain real resolution through oversampling — and know why it silently fails on a too-quiet signal.
6. Calibrate offset and gain in firmware, and do the conversion maths without throwing away the precision you fought for.
7. Sample AC correctly on an MCU: bias it into range, anti-alias it, and compute true RMS and real power in firmware.
8. Explain why muxed sequential V and I sampling corrupts a power-factor measurement, and fix it.
9. Use a multimeter and oscilloscope as reference instruments while knowing exactly how each of them misleads.
10. Diagnose a wrong reading systematically instead of by guesswork.

---

## Schedule at a glance

| Day | Date | Time (GMT) | Focus |
|---|---|---|---|
| **0** | Sat, 3 Oct | 4:00 – 5:00 PM | *Optional* — joining ExSight, and a tour of the benches (recorded) |
| **1** | Sat, 10 Oct | 12:00 – 5:30 PM | The DC measurement chain, from quantity to code: sensor → loading → conditioning → ADC |
| **2** | Sun, 11 Oct | 12:00 – 5:30 PM | From code to number — interfaces, noise, firmware, the DC lab — then AC begins |
| **3** | Mon, 12 Oct | 12:00 – 5:30 PM | The AC chain: probes, aliasing, timing, true RMS, power, and the capstone |

Each day is 330 minutes: **300 minutes of content plus two 15-minute breaks**, placed at natural module boundaries and published in advance so participants can plan around them.

The modules follow the path a measurement travels — quantity → sensor → loading → conditioning → ADC → reference → digital interface → firmware → number — and the path is walked twice: first with a quantity that stands still (DC, Day 1 and Day 2 up to the lab), then with one that moves (AC, the rest of Day 2 and Day 3), where time enters and the errors DC could not show appear.

### Everything here is simulated

This is a hard constraint on the syllabus, not a footnote. Every module below is delivered on the benches of **ExSight Studio** — the Electronics, Plot, Equation, Draw, Figure and Coding benches listed at the end. Each module names the benches that carry it.

Topics that cannot be demonstrated on those benches have been cut or reframed rather than lectured at:

- **Oscilloscope operation** — triggering, volts/div, probe attenuation switches — is instrument UI with nothing to simulate. What survives is the part that is a circuit: probe compensation, cable capacitance and lead inductance, all of which are modelled on the benches.
- **DMA setup, interrupt priorities, register configuration** are firmware plumbing with nothing to show. What survives is the observable consequence — uneven sample spacing and the error it produces — on the Plot and Coding benches.
- **PCB layout** needs a layout tool. What survives is ground as a lumped impedance in the return path, which the Electronics Bench models directly.
- **The ADS1115 and INA226** have no simulation models. They are taught as a datasheet-reading exercise and a design decision, not as a demo. The I²C bus itself *is* demonstrable — open-drain and pull-ups behave correctly on the benches.
- **Isolation and electrical safety** is the one module with no simulation behind it. It is marked *discussion-led* below, and it is included because leaving it out of a measurement course would be worse than teaching it without a demo.

---

## Session 0 — Joining & Orientation (Sat, 3 Oct · 60 min · optional, recorded)

Held a week ahead so nobody loses Day 1 time to joining problems.

- Joining a session with a code — from the ExSight Scope app on a computer, or from the browser on any phone, tablet or computer
- A tour of the benches you will see — Electronics, Plot, Equation, Draw, Figure and Coding — and what each one shows
- How live questions and predictions reach you, and how to answer them
- Meeting platform, audio/screen-share check, and how questions are handled live

---

## Day 1 — The DC Measurement Chain: From Quantity to Code (Sat, 10 Oct)

Building the chain in the order the signal travels — quantity, sensor, loading, conditioning, converter — and locating every DC error source in it.

| # | Module | Time (GMT) | Length | Demonstrated with |
|---|---|---|---|---|
| 1 | Your MCU reads 2047 — what is that? | 12:00 | 15 min | Electronics + Draw |
| 2 | Measurement uncertainty: the measurand and what "right" means | 12:15 | 30 min | Plot + Equation |
| 3 | Sensing: from physical quantity to electrical signal | 12:45 | 25 min | Electronics + Draw |
| — | *Break* | 13:10 | 15 min | |
| 4 | Impedance, dividers, and why your ADC input is not infinite | 13:25 | 45 min | **Electronics** + Equation |
| 5 | Current measurement: shunts, topology and burden voltage | 14:10 | 40 min | Electronics |
| 6 | Signal conditioning: in-amps, gain, offset and bias current | 14:50 | 40 min | Plot + Equation |
| — | *Break* | 15:30 | 15 min | |
| 7 | The ADC input model: sample-and-hold and acquisition time | 15:45 | 45 min | **Plot** + Equation + Draw |
| 8 | ADC architecture, datasheet errors and the resolution/ENOB gap | 16:30 | 30 min | Plot + Draw |
| 9 | The reference voltage, and ratiometric measurement | 17:00 | 30 min | Plot + Equation |

**1. Your MCU reads 2047 — what is that?** *(Electronics + Draw)* — Cold open. A sensor, a divider, an ADC pin and three lines of firmware produce a number that is confidently wrong. Participants explain why before any theory. Establishes the thesis and the chain diagram every later module points back to.

**2. Measurement uncertainty: the measurand and what "right" means** *(Plot + Equation)* — Before any sensor: what exactly is being measured, and what would it mean for the number to be right? Accuracy, precision and resolution are not synonyms. Decoding a DMM spec such as ±(0.5% of reading + 3 counts). Tolerances stacked along a chain, drawn as the combined uncertainty band — the budget the DC lab on Day 2 has to land inside.

**3. Sensing: from physical quantity to electrical signal** *(Electronics + Draw)* — The first stage of the chain: the system's sense organ. Transduction as a chain of stages — pressure → deformation → strain → resistance → voltage — and not a unit conversion. Modulating sensors, which need an excitation the designer chooses, against self-generating ones, which give what they give; that choice returns at the end of the day in Module 9. The quantity never arrives alone: interfering inputs, and the defences against them, each taught later at the place on the chain where it acts.

**4. Impedance, dividers, and why your ADC input is not infinite** *(Electronics + Equation)* — The load-bearing concept. What impedance means physically, why instruments want high input impedance and sources want low output impedance, and how to design a divider that feeds an ADC without lying to it. The Electronics Bench carries the live circuit and sweeps source impedance against the reading.

**5. Current measurement: shunts, topology and burden voltage** *(Electronics)* — Shunt sizing as a trade between signal and disturbance. High-side versus low-side and what each gives up. Kelvin connection to remove lead and contact resistance, shown as a 2-wire and 4-wire measurement side by side on the Electronics Bench. Burden voltage — the drop your own ammeter inserts — modelled on the bench until the circuit under test browns out.

**6. Signal conditioning: in-amps, gain, offset and bias current** *(Plot + Equation)* — Getting tens of millivolts of shunt signal, riding on a large common-mode voltage, into an ADC's range. Differential gain and why CMRR decides whether high-side sensing works. Then the punchline, driven live on the Plot Bench: input offset voltage is amplified by exactly the same gain as your signal, so at a gain of 500 a 2 mV offset consumes a third of your ADC range before the signal arrives.

**7. The ADC input model: sample-and-hold and acquisition time** *(Plot + Equation + Draw)* — The most important MCU-specific module in the course, and one the benches model exactly: a switch with real on-resistance charging a sampling capacitor inside a finite acquisition window. If your source cannot settle in that window you read low — and speeding the ADC up makes it worse. Computing the maximum source impedance your acquisition time permits, and the two fixes: longer acquisition, or an op-amp buffer.

**8. ADC architecture, datasheet errors and the resolution/ENOB gap** *(Plot + Draw)* — Successive-approximation versus sigma-delta, animated so the conversion process is visible. Quantization error as an unavoidable ±½ LSB floor, and Effective Number of Bits as the honest specification — why a 12-bit converter delivers closer to ten useful bits once real noise is present. And the analog section of a real MCU datasheet — INL, DNL, offset error, gain error — the table everyone scrolls past, read here because this is where a code first exists.

**9. The reference voltage, and ratiometric measurement** *(Plot + Equation)* — An ADC measures a ratio to its reference, so reference error is measurement error one-for-one. VDD as reference and why it is the default and usually the worst choice. Then the escape: power a resistive sensor from the same rail that references the converter and the error cancels exactly — shown as the algebra collapsing, and as a rail-voltage slider that moves one reading and not the other. It closes the day by reaching back to Module 3: the sensor's excitation and the converter's reference turn out to be one design decision.

---

## Day 2 — From Code to Number, Then Time Enters (Sun, 11 Oct)

Day 1 built the hardware chain. Day 2 is where firmware either rescues the measurement or quietly ruins it — and where AC arrives. The morning takes the code out of the converter and lets the firmware earn the number; the DC lab closes the first pass along the chain. The afternoon walks the chain again with a quantity that moves, starting from the quantity itself.

| # | Module | Time (GMT) | Length | Demonstrated with |
|---|---|---|---|---|
| 1 | Open-drain, pull-ups and the I²C bus | 12:00 | 30 min | **Plot** + Draw |
| 2 | External ADCs as a design choice: ADS1115 and INA226 | 12:30 | 30 min | Figure + Equation |
| 3 | Noise: thermal, coupled, and self-inflicted | 13:00 | 35 min | Equation + Coding Bench |
| — | *Break* | 13:35 | 15 min | |
| 4 | Oversampling, dither and digital filtering | 13:50 | 40 min | **Coding Bench** |
| 5 | Calibration, and the maths that loses your precision | 14:30 | 35 min | Plot + **Coding Bench** |
| 6 | Lab: the DC chain, ideal vs non-ideal | 15:05 | 25 min | **Electronics** + Coding Bench |
| — | *Break* | 15:30 | 15 min | |
| 7 | AC fundamentals: RMS and crest factor | 15:45 | 30 min | Plot + Draw |
| 8 | Isolation and electrical safety | 16:15 | 35 min | *Discussion-led* + Electronics |
| 9 | Ground as an impedance: returns, loops and differential sensing | 16:50 | 40 min | Electronics + Equation |

**1. Open-drain, pull-ups and the I²C bus** *(Plot + Draw)* — The digital face of Day 1's impedance argument, and it models well on the benches. A floating input is undefined, not low. An open-drain output can only pull low or let go, which is exactly why it needs the pull-up. Resistor value as a real trade between edge rate and drive current. Wired-AND falls out for free, and is why the bus works at all.

**2. External ADCs as a design choice: ADS1115 and INA226** *(Figure + Equation)* — When the integrated converter is not enough. Walked as a datasheet-reading exercise rather than a demo, because neither part has a simulation model — and that is said plainly to the room. The ADS1115's sigma-delta architecture, its programmable gain amplifier, its input impedance varying with gain setting, its data-rate versus noise table. The INA226 as the build-versus-buy decision for current sensing.

**3. Noise: thermal, coupled, and self-inflicted** *(Equation + Coding Bench)* — Where the unstable last digits come from: met where it shows up, in the code, and traced back up the chain. Thermal noise as a floor set by resistance and bandwidth, derived on the Equation Bench rather than asserted — which makes high-Z nodes noisy by physics, one more cost of Day 1's choices. Then the self-inflicted category: switching noise coupled through shared impedance, and return current making voltage in the ground path, both modelled as lumped elements.

**4. Oversampling, dither and digital filtering** *(Coding Bench)* — Buying resolution with time. The four-samples-per-extra-bit rule derived rather than asserted, then the condition nobody mentions: oversampling only works if at least an LSB of noise is present. Participants watch it fail on a too-quiet signal on the Coding Bench, then add deliberate dither and watch it work. Moving average, IIR and median compared for what each costs in latency.

**5. Calibration, and the maths that loses your precision** *(Plot + Coding Bench)* — Offset and gain error as separately correctable, unlike INL and DNL. Two-point calibration and storing the constants. Then the half that surprises people: the conversion arithmetic itself throws away bits. Dividing before multiplying, intermediate overflow, floating point on a part with no FPU. The same conversion is written four ways on the Coding Bench with the live error on each.

**6. Lab: the DC chain, ideal vs non-ideal** *(Electronics + Coding Bench)* — Participants build the full sensor → shunt → in-amp → ADC chain, run it ideal, then inject non-idealities one at a time in attributable order — shunt tolerance, lead resistance, in-amp offset, source impedance against acquisition time, reference drift — recording the reading after each, and carry the codes through the firmware of Modules 4 and 5 to a calibrated number. The final error should land inside the uncertainty window they computed in Day 1 Module 2.

**7. AC fundamentals: RMS and crest factor** *(Plot + Draw)* — RMS rebuilt as what it actually is: the DC value delivering equal heating power. Why 0.707 is a sine-only constant — flagged hard, because Day 3 Module 4 turns on that hinge. Crest factor as the shape descriptor that decides what copes with what.

**8. Isolation and electrical safety** *(discussion-led + Electronics)* — The one module with no simulation behind it, and that is stated to the room rather than papered over. What actually injures is current path through the body, not voltage alone. Galvanic isolation and where it belongs. CAT II/III/IV ratings, and why a CAT II 1000 V meter is more dangerous at a distribution panel than a CAT III 600 V one. It closes with the one thing that can be shown — a component driven past its rated dissipation until it fails, at exactly the point the maths predicted.

**9. Ground as an impedance: returns, loops and differential sensing** *(Electronics + Equation)* — Ground is a chosen reference, not a physical zero, and copper has resistance and inductance. Two amps through ten milliohms of return trace is twenty millivolts, which at 12 bits on 3.3 V is twenty-five counts of pure error in every reading — computed, then modelled. Ground loops as two paths to earth forming a closed circuit, and differential sensing as the structural fix, including why an external ADC's paired inputs exist.

---

## Day 3 — The AC Chain, Power & Capstone (Mon, 12 Oct)

The second pass along the chain continues inwards: what the wiring adds, conditioning a moving signal for the converter, when exactly the samples are taken, and what the firmware computes from them — true RMS, then real power. The capstone builds that whole AC chain as one meter.

| # | Module | Time (GMT) | Length | Demonstrated with |
|---|---|---|---|---|
| 1 | Parasitic C and L: what probes and wiring add | 12:00 | 35 min | **Plot** + Figure |
| 2 | Biasing AC into range, aliasing and anti-alias filtering | 12:35 | 45 min | Plot + Equation + Draw |
| — | *Break* | 13:20 | 15 min | |
| 3 | Sampling instants: timing and jitter | 13:35 | 30 min | Plot + Coding Bench |
| 4 | True RMS on an MCU vs on a meter | 14:05 | 40 min | Plot + Coding Bench |
| 5 | Power on an MCU: real, reactive, and the phase-error trap | 14:45 | 45 min | Plot + Equation + Coding Bench |
| — | *Break* | 15:30 | 15 min | |
| 6 | Capstone: build an AC power meter | 15:45 | 70 min | **Coding Bench** |
| 7 | Wrap-up: staged faults, the checklist and Q&A | 16:55 | 35 min | The benches already used |

**1. Parasitic C and L: what probes and wiring add** *(Plot + Figure)* — Every measurement connection is a circuit you added. Probe compensation as a frequency-dependent divider, shown under-compensated, over-compensated and flat. Cable capacitance loading the node and slowing genuine edges. Lead inductance ringing on fast transitions, with loop area as the swept parameter. All of it is the same story: parasitic C and L that an ideal simulation does not contain until you put them there.

**2. Biasing AC into range, aliasing and anti-alias filtering** *(Plot + Equation + Draw)* — First the step an AC signal needs before any converter will take it: it swings negative and the ADC pin does not, so it is scaled and biased into range. Then the most dangerous error in the course, because nothing about it looks wrong: undersample and your firmware returns a stable, clean, entirely fictitious result. The Plot Bench folds a signal in real time and draws the anti-alias filter's response, so participants size a real one against their sample rate. Why it cannot be fixed in software after the fact.

**3. Sampling instants: timing and jitter** *(Plot + Coding Bench)* — When you sample matters as much as what you sample. A sample interval that varies with whatever else the loop is doing produces error indistinguishable from noise — and worse, signal-dependent, so it does not average away. The Coding Bench sweeps jitter magnitude against RMS error. Hardware-paced conversion is presented as the fix; its register-level setup is named but not simulated, because there would be nothing to see.

**4. True RMS on an MCU vs on a meter** *(Plot + Coding Bench)* — Computing true RMS on-chip: accumulate squares, divide, root, over a whole number of cycles. Then the reconciliation — an average-responding meter rectifies, averages and scales by a constant that assumes a sine, so on the PWM and switch-mode waveforms embedded work is full of, it is simply wrong by a predictable amount. Your firmware can be more accurate than your multimeter, and now you can prove which to trust.

**5. Power on an MCU: real, reactive, and the phase-error trap** *(Plot + Equation + Coding Bench)* — Why V × I stops being power once phase enters. Real, reactive and apparent power derived together; power factor as cos φ, plus distortion power factor for the non-sinusoidal loads embedded work actually meets. Then the MCU-specific trap and the best lesson of Day 3: a muxed ADC samples voltage and current *sequentially*, and the microseconds between them are a phase error that grows with frequency. Computed live, then swept on the Plot Bench.

**6. Capstone: build an AC power meter** *(Coding Bench)* — Detailed below.

**7. Wrap-up: staged faults, the checklist and Q&A** *(the benches already used)* — Four or five broken measurements presented cold across the benches already used, diagnosed live by the room with the tutor driving the bench and answering only direct questions. Then the diagnostic checklist, built one line per module across three days and now read through whole, and closing Q&A including the parked-questions list.

---

## Demo & module coverage

Every module maps to at least one demo. Numbered demos refer to the companion document *Simulation Demos Overview*; the MCU-focused reframe adds several new builds, marked *(new)*.

| Day | Module | Supporting demos | Format |
|---|---|---|---|
| 1 | 1 · Framing | #1 ADC input loading ✅ | Electronics + Draw |
| 1 | 2 · Uncertainty | Tolerance stack-up *(new)* | Plot + Equation |
| 1 | 3 · Sensing | Sensor excitation and self-heating *(new)* | Electronics |
| 1 | 4 · Impedance & divider design | #1 ✅ · #1b Output impedance | Electronics |
| 1 | 5 · Current measurement | #3 Kelvin sensing · Burden voltage *(new)* | Electronics |
| 1 | 6 · Signal conditioning | #3b Op-amp input offset | Plot + Equation |
| 1 | 7 · ADC input model | #2 Switched-cap sampling — **promoted to centrepiece** | Plot + Equation + Draw |
| 1 | 8 · Architecture & ENOB | SAR vs sigma-delta visualiser *(new)* | Plot + Draw |
| 1 | 9 · Reference & ratiometric | Reference drift / ratiometric *(new)* | Plot + Equation |
| 2 | 1 · I²C | #1d Pull-up/pull-down · #1e Open-drain | Plot + Electronics + Draw |
| 2 | 2 · External ADCs | Datasheet study (no simulation model) | Figure + Equation |
| 2 | 3 · Noise | Noise & averaging *(new)* | Equation + Coding Bench |
| 2 | 4 · Oversampling & filtering | Oversampling and dither *(new)* | Coding Bench |
| 2 | 5 · Calibration & maths | Fixed-point precision loss *(new)* | Coding Bench |
| 2 | 6 · Lab | Guided build of the DC chain, carried to a number in firmware | Electronics + Coding Bench |
| 2 | 7 · AC fundamentals | RMS geometry | Plot + Draw |
| 2 | 8 · Isolation & safety | Overload / burnout showcase *(new)* | Electronics |
| 2 | 9 · Ground | #8 Ground loops (parts 1 and 2) | Electronics + Draw |
| 3 | 1 · Parasitics & scoping | #6 Probe comp & parasitic C/L + ADC-pin probing | Plot + Figure |
| 3 | 2 · Biasing & aliasing | Aliasing *(new)* | Plot + Draw |
| 3 | 3 · Timing & jitter | Sampling jitter *(new)* | Plot + Coding Bench |
| 3 | 4 · True RMS on an MCU | #5 True-RMS vs average-responding · #7 Coupling & DC offset | Plot + Coding Bench |
| 3 | 5 · Power on an MCU | #9 Power factor + muxed-sampling phase error *(new)* | Plot + Coding Bench |
| 3 | 6 · Capstone | AC power meter | Coding Bench |
| 3 | 7 · Troubleshooting | Staged faults across existing demos | The benches already used |

Three previously deferred demos — #5, #8 and #9 — now each carry a full module and are **required builds, not optional depth**. Demo #2 (switched-capacitor sampling) is promoted from a supporting simulation to the centrepiece of Day 1 Module 7 and needs a full interactive treatment.

---

## Tooling

The course is presented in **ExSight Studio**, and every demonstration runs on one of its benches:

- **Electronics Bench** — real circuits solved live: meters that load what they measure, burden voltage, Kelvin sensing, IR drop in a return path, parts driven past their ratings.
- **Plot Bench** — live graphs with sliders: settling inside an acquisition window, quantization, sampling and aliasing, RMS and power.
- **Equation Bench** — formulas the room can drive: derivations, worked examples, assumptions and where they break.
- **Draw Bench** — constructions drawn step by step: the measurement chain, the sample-and-hold, phasors, the geometry of RMS.
- **Figure Bench** — datasheets, meters and real hardware, with guided tours.
- **Coding Bench** — the firmware modules (oversampling, dither, filtering, calibration and conversion maths, true RMS and power): change the code and watch the reported number change.

Participants join through **ExSight Scope** — the app on a computer, or the browser on a phone or tablet — where the live predictions and questions arrive and where they can ask their own.

## Format & delivery

Fully software and simulation based. No physical hardware, no course PCB, no bench BOM. Every demonstration, lab, and the capstone run on ExSight Studio's benches.

This removes component sourcing, shipping and customs risk entirely, and means the course runs identically for every participant regardless of location or access to a bench.

**Participants receive:** live instruction across all three days, session recordings, access to the course and its benches in ExSight for revision, annotated firmware reference snippets for oversampling, calibration, true-RMS and real-power computation, and the one-page measurement diagnostic checklist.
