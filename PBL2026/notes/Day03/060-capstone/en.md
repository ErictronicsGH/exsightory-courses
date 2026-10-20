---
targetMinutes: 70
motivates: Every stage works on its own — but can the whole path turn v(t) and i(t) into 230 V, 4.2 A and 0.86 PF that you can defend?
objectives:
  - Build a simulated AC power meter that reports RMS voltage, RMS current, real power, apparent power, power factor and frequency from sampled waveforms.
  - Explain where every final number came from, and what happened to the information at every stage of the path.
concepts: [ac-biasing, aliasing, true-rms, ac-power, mux-phase-error, calibration]
---

# Capstone: build an AC power meter

<!-- PATH: [ QUANTITY → SENSOR → SOURCE & LOADING → CONDITIONING → ADC INPUT → CONVERSION → REFERENCE
         → DIGITAL INTERFACE → FIRMWARE → NUMBER ] — the whole AC path, built as one instrument.
     TOOL: Coding Bench (centrepiece: the ac-meter program — source and load, sensors, conditioning, ADC and channel
           timing, the firmware path codes → V, A → RMS → P, S, PF → Hz, calibration; scenario selector 1–8; the six
           views) · Plot and Equation (re-used from 020, 040, 050, and Day 2 · 050's calibration fit) · Draw (the
           capstone architecture) · Figure (meter face, milestone bar, interface diagrams; assets).
     SOURCES: AC_Metering_System_Simulation_Project.md (all; §29 milestones are the build sequence). -->

## From v(t) and i(t) to 230 V, 4.2 A and 0.86 PF

The quantities we want are not digital numbers; they are a continuously varying voltage and current.
The meter builds a chain of representations that a microcontroller can process, and you must be able
to say where every final number came from.

<!-- PLAN
SHOW     Figure — the AC doc §30 meter face, numbers only, waveforms hidden: 230.4 V, 3.21 A, 50.02 Hz, 612 W,
         739 VA, PF 0.828. Drive: put it up, say nothing about it, move on.
         Look for: the motivates question — every one of these numbers will have to be defended by the end.
         Status: needs asset: meter face as SVG (from AC doc §30; reused at Milestone 12)
ASK      checkpoint (after the statement) — "Before you touch the simulator: write down the path from the mains to
         the display as a chain of stages. Keep it."
         items: one stage per line, from the quantity to the display | for each, the form the information takes
                there (volts, ±1 V, codes, samples, V², W…)
         depth: understand    practice: developing models
SEED     plants S75 — "Keep the chain you have just written. At the end of the afternoon you will hold it against
         the one you built."
-->

```flow
Welcome back. This is the project that has been running underneath the whole course, and this afternoon
we build it.

The theme: design and simulate an AC metering system capable of measuring **voltage, current, real
power, apparent power, power factor and frequency**. It is fully simulated. There is no mains wiring and
no hardware. The core of it is **voltage + current + power factor**, with real power, apparent power and
frequency supporting them; reactive power, energy, harmonics and the rest are extensions for whoever
finishes early.

But the purpose is not simply to produce an AC meter. The deeper purpose is to follow the complete
journey of a physical quantity from the real world into a digital system, and finally into a meaningful
engineering value.

Assume an AC electrical system supplying a load. The quantities of interest are not digital numbers at
first. They exist as physical, electrical phenomena: an AC voltage v(t) and an AC current i(t). The goal
is to obtain meaningful engineering values such as **230 V**, **4.2 A** and **0.86 PF** from those
continuously varying quantities. So the system has to create a chain of representations that a
microcontroller can eventually process.

By the end of this session you should be able to explain not only **what** the final numbers are, but
**where they came from and what happened to the information at every stage**.

[[ask]] Before you touch the simulator: write down the path from the mains to the display as a chain of
stages. Keep it. You will check it at the end.
```

***

## The architecture: two paths, one processor

Voltage and current each have a sensor and a conditioning path. Both reach the ADC, cross a digital
interface to the microcontroller, are processed into RMS, power and frequency, are calibrated, and
become engineering values.

<!-- PLAN
SHOW     Draw — the AC doc §4 architecture, built stage by stage on the Day 1 path diagram: the system splits into
         voltage and current, each with a sensor and a conditioning path, merging at the ADC; then the interface,
         the MCU, RMS / power / frequency, calibration, engineering values. Then the six views (AC doc §27) pinned
         on it as numbered eyes: 1 source, 2 sensor output, 3 conditioned signals, 4 ADC, 5 digital processing,
         6 final measurement. Drive: one stage per sentence of the Flow, the six eyes last.
         Look for: two paths, one processor — and six places to look at the signal on its way.
         Status: needs Draw: capstone architecture with the six view markers (extends the Day 1 path drawing)
-->

```flow
[[demo]] The architecture diagram.

The AC electrical system splits into a **voltage** and a **current**. Each has its own sensor. Both go
through signal conditioning, along a voltage path and a current path. They reach the ADC, cross the
digital interface into the microcontroller, and are processed into RMS, power and frequency. Those are
calibrated, and become the engineering values on the display: voltage, current, power factor.

The model gives you six places to look at the signal as it travels: **the source**, **the sensor
output**, **the conditioned signals**, **the ADC** with its sampling points and codes, **the digital
processing** with the samples, the instantaneous power and the RMS calculations, and **the final
measurement**. Those six views let you literally follow **signal → number → meaning**.
```

***

## The build, in twelve milestones

Observe the quantities; add sensing; condition; digitize; transfer the data; recover volts and amperes;
calculate RMS; calculate power; calculate apparent power and PF; calibrate; stress the system; produce
the final meter.

<!-- PLAN
SHOW     Figure — the twelve milestones (AC doc §29) as a progress bar laid along the path, each milestone under the
         stage it builds: M1 source and load, M2 sensors, M3 conditioning, M4 ADC, M5 interface, M6 codes to units,
         M7 RMS, M8 power, M9 S and PF, M10 calibration, M11 stress, M12 the meter. It stays on the wall; each later
         card spotlights its milestones.
         Status: needs asset: milestone bar (SVG, M1–M12 as named parts for spotlighting)
-->

```flow
The project grows in twelve milestones, and they are the spine of this lab. They follow the path:

1. **Observe the physical quantities** — simulate the voltage and current waveforms.
2. **Add sensing** — voltage and current sensor models.
3. **Condition the signals** — scaling, filtering, amplification and level shifting.
4. **Digitize** — ADC sampling and quantization.
5. **Transfer the data** — the digital interface between ADC and MCU.
6. **Recover engineering quantities** — ADC codes into volts and amperes.
7. **Calculate RMS** — RMS voltage and current.
8. **Calculate power** — instantaneous and real power.
9. **Calculate apparent power and PF** — S = V_RMS · I_RMS and PF = P / S.
10. **Calibrate** — introduce errors and develop calibration corrections.
11. **Stress the measurement system** — noise, distortion, sampling limits and sensor errors.
12. **Produce the final meter** — present the final engineering values.

Every one of these is a stage we have already taught. The progress bar on the wall tells you where the
room is.
```

***

## The source and the load

The source is a nominal 230 V RMS, 50 Hz sinusoid, about 325 V peak. The load is configurable:
resistive, inductive, capacitive or nonlinear, each with a different relationship between voltage and
current.

<!-- PLAN
SHOW     Plot — View 1: v(t) = 325.3·sin(2π·50·t) and i(t) = I_pk·sin(2π·50·t − φ), with φ (resistive 0°,
         inductive +40°, capacitive −40°) and I_pk as sliders. Then the same source in the Coding Bench ac-meter
         program with its load selector (resistive, inductive, capacitive, nonlinear). Drive: resistive, inductive,
         capacitive, in that order.
         Look for: Scenarios 1–3 at the source, before anything measures them — current in phase, lagging, leading.
         Status: ready (Plot); needs Coding Bench: ac-meter (source and load, View 1). Ideal on-circuit version →
                 needs Electronics: 230 V 50 Hz AC source, inductor class, scope.
ASK      checkpoint (after the statement) — "Milestone 1. Simulate the voltage and current for the resistive and
         the inductive load, and put them on one plot."
         items: V_peak = 325.3 V for 230 V RMS | resistive: i in phase | inductive: i lagging by the angle set
         depth: use    practice: developing models
FAULT    Scenarios 1–3 (resistive, inductive, capacitive) are set here and re-run under channel skew at the timing
         card.
-->

```flow
The simulation begins with an AC source. For the initial model, use a nominal sinusoidal supply: **230 V
RMS, 50 Hz, phase 0°**. The instantaneous voltage is

**v(t) = V_peak sin(2πft)**

and for a 230 V RMS sinusoidal supply,

**V_peak = 230 √2 ≈ 325.3 V**

Treat this as the original electrical quantity from which the measurement system obtains its
information.

The load is configurable. Start with a simple impedance, then change its type. With a **resistive** load,
voltage and current are approximately in phase, and we expect PF ≈ 1. With an **inductive** load,
current lags voltage, and PF < 1. With a **capacitive** load, current leads voltage, and PF < 1. With a
**nonlinear** load, the current waveform may become distorted rather than simply being a shifted copy of
the voltage. That one is there to show that power factor is not merely a matter of looking at two sine
waves and measuring their phase angle.

[[ask]] Milestone 1. Simulate the voltage and current for the resistive and the inductive load, and put
them on one plot.
```

***

## Sensing voltage and current

The voltage sensor scales the high-voltage waveform into a small signal, for example ±1.0 V; the current
sensor turns 5 A into, for example, ±0.8 V. The ADC does not measure the physical current; it measures
the signal the current-sensing system produces.

<!-- PLAN
SHOW     Equation — the two sensor scales: k_V = 1.0 V / 325.3 V ≈ 3.07 mV per volt, and k_I = 0.8 V / I_pk. The AC
         doc's "5 A → ±0.8 V" does not say whether 5 A is RMS or peak: 0.113 V/A if RMS (7.07 A peak), 0.16 V/A if
         peak — put both on the wall and have the room choose and state theirs. Then View 2 in the ac-meter
         program: both sensor outputs.
         Look for: the ADC will never see 230 V or 5 A, only these two small signals.
         Status: ready (Equation); needs Coding Bench: ac-meter (sensor stage: ratio, offset, gain error,
                 nonlinearity; View 2)
ASK      checkpoint (after the statement) — "Milestone 2. Build both sensor models, with the scaling ratios as
         parameters."
         items: voltage ratio set and stated | current ratio set, with "5 A" stated as RMS or peak | View 2 shows
                about ±1.0 V and ±0.8 V
         depth: use    practice: developing models
FAULT    Scenario 5 (sensor offset) and Scenario 6 (sensor gain error) live here, as the sensor model's offset and
         gain parameters; they stay at zero until Milestone 10.
-->

```flow
The voltage path is AC voltage → voltage transducer → signal conditioning → ADC input. The voltage sensor
scales the high-voltage AC waveform into a small electrical signal suitable for the ADC: conceptually,
**230 V AC → voltage sensing → ±1.0 V**. The exact ratio is configurable.

The current path follows the same idea: AC current → current transducer → signal conditioning → ADC
input. For example, **5 A AC → current sensing → ±0.8 V**. Again, the relationship is configurable.

And the distinction to keep clear: **the ADC does not directly measure the physical current.** It
measures an electrical signal produced by the current-sensing system.

[[ask]] Milestone 2. Build both sensor models, with the scaling ratios as parameters.
```

***

## Conditioning both paths

Each path is scaled to fit the ADC range, level-shifted around a bias so the whole waveform stays within
the ADC's allowable input range, filtered against unwanted high-frequency components, and buffered so
the ADC does not load it. Isolation is a conceptual system boundary.

<!-- PLAN
SHOW     Draw — the capstone voltage path from 020's last card, now with the current path beside it. Then View 3 in
         the ac-meter program: both conditioned signals against the ADC's 0 → 3.3 V window, with bias, scale and
         anti-alias corner as parameters.
         Look for: both waveforms inside the window with headroom (0.65–2.65 V for the voltage, 0.85–2.45 V for the
         current); then Scenario 4 — noise injected ahead of the filter, and how much of it the filter leaves.
         Status: needs Draw: capstone voltage path with the current path added; needs Coding Bench: ac-meter
                 (conditioning stage, View 3).
ASK      checkpoint (after the statement) — "Milestone 3. Add scaling, filtering, amplification and level shifting.
         Then look at View 3: does the whole waveform sit inside the ADC input range?"
         items: bias at mid-range | both peaks inside 0–3.3 V with margin | anti-alias corner chosen against the
                sample rate of Milestone 4 | a buffer in front of the ADC
         depth: create    practice: designing solutions
FAULT    Scenario 4 (noisy measurement): noise added before the filter; with the filter removed, the noise above
         f_s/2 folds into the band (020).
-->

```flow
Both paths now get the treatment from this morning. **Scaling**, so the signal fits within the ADC input
range: ±325 V becomes ±1.0 V. **Level shifting**: if the ADC accepts only positive voltages, the bipolar
waveform is shifted around a bias voltage, to keep the entire waveform within the ADC's allowable input
range. **Filtering**: unwanted high-frequency components or noise are introduced in the model and then
attenuated, which ties together signal bandwidth, sampling rate, noise and anti-aliasing. **Buffering**,
between the conditioning and the ADC, so the ADC input does not significantly load the circuit before
it. And **isolation**, as a conceptual system boundary, as we discussed on Day 2.

[[ask]] Milestone 3. Add scaling, filtering, amplification and level shifting. Then look at View 3: does
the whole waveform sit inside the ADC input range?
```

***

## Digitizing: the ADC and sampling

The ADC turns each conditioned waveform into a sequence of samples: v₁ v₂ v₃ … and i₁ i₂ i₃ … Its
resolution, reference, sampling rate, input range, channel architecture, offset, gain error and noise
are all settings you can change.

<!-- PLAN
SHOW     Coding Bench — View 4 of the ac-meter program: sampling points and codes for both channels, with
         resolution, reference and sampling rate as parameters; the 020 staircase Plot beside it if the picture is
         needed again. Drive: a sensible rate first (5 kS/s, 100 samples per cycle), then down to 60 S/s.
         Look for: Scenario 7 — at 60 S/s the 50 Hz waveform appears as a smooth 10 Hz one, and the frequency
         reading says 10 Hz, steadily.
         Status: needs Coding Bench: ac-meter (ADC stage, View 4)
ASK      poe (after the statement) — "Milestone 4. Add sampling and quantization. Then drop the sampling rate to 60
         samples per second. What will the frequency reading show?"
         options: 50 Hz | 60 Hz | 10 Hz | nothing sensible      answer: 10 Hz
         reveal: the run at 60 S/s; View 4 shows a slow, clean sine and the reading settles on 10 Hz
         explain: 50 Hz sampled at 60 S/s lies 10 Hz below the sample rate, so its samples are those of a 10 Hz
                  signal.
         depth: use    practice: analysing data
HARVEST  S71 — "This morning I promised you a meter that would show a stable, clean, entirely fictitious number.
         Here it is: 10 Hz, rock steady, on a 50 Hz supply."
FAULT    Scenario 7 (insufficient sampling).
-->

```flow
The conditioned voltage and current are digitized by the ADC. In the model you can change its
resolution, reference voltage, sampling rate, input range, number of channels, channel architecture,
offset, gain error, quantization and noise. A 16-bit ADC, for example, has 2¹⁶ = 65,536 possible digital
levels.

The waveforms are continuous in time. The ADC does not observe every instant; it takes samples at
discrete intervals, v₁ v₂ v₃ … and i₁ i₂ i₃ … The sampling rate must be high enough for the measurement
objectives, and the model lets you test different rates: adequate sampling, undersampling, aliasing,
anti-alias filtering, and sampling synchronisation.

[[ask]] Milestone 4. Add sampling and quantization. Then lower the sampling rate and tell me what
happens to the waveform in View 4.
```

***

## Voltage and current need a known timing relationship

Because p_n = v_n · i_n, each voltage sample must belong with its current sample. Sequential sampling
through one conversion engine and simultaneous sampling with independent engines give different
answers.

<!-- PLAN
SHOW     Coding Bench — the ac-meter program on the inductive load (φ = 60°, PF 0.50), its channel architecture
         switched from simultaneous to sequential (100 µs between V and I); then the capacitive load. The 050 Plot
         (PF against f with Δt) beside it.
         Look for: V_RMS, I_RMS and S do not move; P and PF do — PF 0.500 → 0.527 on the inductive load and
         → 0.473 on the capacitive: Scenario 3's "the direction of the phase shift matters", here twice over.
         Status: needs Coding Bench: ac-meter (channel architecture: simultaneous, or sequential with Δt)
ASK      poe (after the statement) — "Take the inductive load and switch from simultaneous to sequential sampling.
         Which number on the meter moves?"
         options: V_RMS and I_RMS | P and PF only | every number | none of them      answer: P and PF only
         reveal: the switch in the run; only the P and PF readings change
         explain: each RMS uses one channel alone and does not care when the other was sampled; only the products
                  v_n·i_n depend on the two belonging to the same instant.
         depth: understand    practice: arguing from evidence
FAULT    Scenarios 2 and 3 (inductive, capacitive) under channel skew — the 050 trap inside the meter.
-->

```flow
This is a particularly important part of the project. Real power depends on the relationship between
voltage and current at corresponding points in time: p(t) = v(t) i(t), so in the digital system
p_n = v_n i_n. The voltage and current samples must therefore have a **known timing relationship**.

The model lets you choose between **sequential sampling** — voltage sample, current sample, voltage
sample, current sample — and **simultaneous sampling**, where both are taken at the same measurement
instant. A multiplexed ADC with one conversion engine may acquire the channels sequentially; an ADC
system with independent conversion engines may allow simultaneous acquisition. This is why ADC
architecture matters.

[[ask]] Take the inductive load and switch from simultaneous to sequential sampling. Which number on the
meter moves?

[[pause]]

[[demo]] Run it.
```

***

## Transfer and processing: the interface and the MCU

The ADC produces the data, the interface determines how it is transferred, and the protocol defines the
rules. The microcontroller then turns digital code into engineering value: offset removal, calibration,
scaling, RMS, power, power factor and frequency.

<!-- PLAN
SHOW     Figure — ADC ⇄ SPI ⇄ Microcontroller, then Digital code → Numerical processing → Engineering value, with
         the three labels the Flow keeps apart: the ADC produces the data, the interface moves it, the protocol sets
         the rules. Then the data-rate check on the Equation bench: 2 channels × 16 bits × 5 kS/s = 160 kbit/s of
         payload, against an SPI clock of a few MHz.
         Status: needs asset: the two block diagrams (SVG); Equation ready
ASK      checkpoint (after the statement) — "Milestone 5. Put the digital interface between the ADC and the MCU in
         your model."
         items: interface named (SPI) | payload rate computed and set against the bus | where a lost or late transfer
                would show up in the samples
         depth: use    practice: computational thinking
-->

```flow
If the ADC is treated as an external device, the samples must be transferred to the microcontroller.
SPI, I²C or a parallel interface would all do; for the core project, use **SPI**: ADC ⇄ SPI ⇄
microcontroller. Three things to keep separate: **the ADC produces the digital data; the interface
determines how that data is transferred; the protocol defines the communication rules governing the
transfer.** The interface is part of the measurement system, not an unrelated communication topic.

The microcontroller then receives the samples and processes them: removing ADC offset, applying
calibration coefficients, converting codes into electrical quantities, calculating RMS voltage and
current, instantaneous power, average real power, apparent power, power factor, frequency, and
optionally energy. The conceptual transition is **digital code → numerical processing → engineering
value**.

[[ask]] Milestone 5. Put the digital interface between the ADC and the MCU in your model.
```

***

## Codes to volts and amperes, then RMS

A raw code is not a voltage: code → ADC voltage → conditioning scale → sensor scale → measured value.
Then square each sample, average the squares and take the root, for voltage and for current.

<!-- PLAN
SHOW     Coding Bench — View 5 of the ac-meter program: code → ADC volts → minus the bias → ÷ conditioning scale →
         ÷ sensor scale, then the true-rms routine from 040 on both channels. Drive: one stage at a time on the
         first sample, then the whole window.
         Look for: 230 V and the load current coming back, within what the quantization and the window allow; then
         Scenario 5 — a sensor offset hardly moves the RMS at full load (it adds in quadrature: 50 mV under
         0.707 V RMS raises it by about 0.25 %), but at a light load the current's offset is a large share of the
         signal.
         Status: needs Coding Bench: ac-meter (conversion chain and RMS, View 5)
ASK      checkpoint (after the statement) — "Milestones 6 and 7. Convert the codes into volts and amperes, then
         compute V_RMS and I_RMS. Does the voltage come back as 230?"
         items: code → volts with the bias removed | volts → mains volts and amperes through both scales | RMS over
                whole cycles | 230 V within the quantization and window error
         depth: use    practice: computational thinking
FAULT    Scenario 5 (sensor offset): the RMS hides it at full load and shows it at light load.
-->

```flow
The ADC gives a raw code, say 3102. That does not mean 3102 V or 3102 A. For a simple ADC,
V_ADC ≈ (Code / Code_max) × V_ref, and the system then applies the scaling of the sensing circuit: ADC
code → ADC voltage → conditioning scale → sensor scale → measured voltage. The same principle applies to
current.

Then RMS, with every intermediate stage visible: samples → square each sample → average the squares →
square root. V_RMS = √((1/N) Σ v_n²), in volts; I_RMS = √((1/N) Σ i_n²), in amperes.

[[ask]] Milestones 6 and 7. Convert the codes into volts and amperes, then compute V_RMS and I_RMS. Does
the voltage come back as 230?
```

***

## Power, power factor and frequency

Instantaneous power p_n = v_n · i_n; real power is its average; apparent power is V_RMS · I_RMS; power
factor is P / S. Frequency is estimated from the sampled waveform — zero crossings, period or signal
processing.

<!-- PLAN
SHOW     Coding Bench — the power stage of the ac-meter program: p_n = v_n·i_n as View 5's instantaneous power, P as
         its mean, S = V_RMS·I_RMS, PF = P/S; then frequency by zero crossings. Drive: resistive, inductive,
         capacitive and distorted loads; then the source moved from 50 to 49.5 Hz, first with the RMS window fixed
         at 20 ms, then with the window following the measured period.
         Look for: Scenario 8 (distorted current) gives a PF below cos φ, as in 050; with a fixed 20 ms window on a
         49.5 Hz supply, the RMS and P readings ripple from window to window, and steady again once the window
         tracks the measured period.
         Status: needs Coding Bench: ac-meter (power, PF, frequency; fixed or tracking window)
ASK      checkpoint (after the statement) — "Milestones 8 and 9. Instantaneous and real power, then S and PF. Then
         change the source frequency: does your frequency reading follow it?"
         items: P from the mean of v_n·i_n | S and PF | PF ≈ 1 resistive, below 1 inductive and capacitive |
                the frequency follows the source | the window length tied to the measured period
         depth: use    practice: analysing data
HARVEST  S74 — "In the RMS module I said that to hold whole cycles the firmware has to know how long a cycle is.
         That is why the meter measures frequency: not only to display it, but to set its own window."
FAULT    Scenario 8 (distorted current); and a fixed window on a drifting frequency.
-->

```flow
For each corresponding pair of samples, p_n = v_n i_n. That gives the instantaneous power waveform, and
it is worth plotting, because it shows that power itself varies with time.

Real power is the average: P = (1/N) Σ v_n i_n, in watts. For a purely resistive sinusoidal load,
P ≈ V_RMS I_RMS; below unity power factor, P < V_RMS I_RMS. Apparent power is S = V_RMS I_RMS, in
volt-amperes. Power factor is PF = P / S = P / (V_RMS I_RMS), between 0 and 1 for the load conditions in
this project. For an ideal sinusoidal system with a linear load, PF = cos φ. But for distorted
waveforms the current may contain harmonics, cos φ no longer tells the whole story, and the
sampled-waveform method stays the general one.

Finally, frequency, estimated from the sampled waveform by zero-crossing detection, period measurement
or digital signal processing. For a nominal 50 Hz, T = 1/f = 20 ms.

[[ask]] Milestones 8 and 9. Instantaneous and real power, then S and PF. Then change the source
frequency: does your frequency reading follow it?
```

***

## Calibration and engineering units

First run the meter without calibration. Then compare against a known reference, determine the error,
and apply calibration coefficients. The theoretical measurement relationship and the real measurement
system are not necessarily identical.

<!-- PLAN
SHOW     Plot — the Day 2 · 050 calibration view re-used: known DC levels applied to the sensor model as the
         reference (−300, −150, 0, +150, +300 V) against the codes the meter reads, as data with a linear fit;
         offset and gain read off the fit. Then the ac-meter program with the coefficients applied.
         Look for: Scenario 6 (a +2 % sensor gain error) is the slope, Scenario 5 (offset) the intercept, and two
         points fix both; what calibration cannot fix shows in the fit's residuals (nonlinearity), and the channel
         skew of the timing card is neither a gain nor an offset.
         Status: ready (Plot, with the room's readings pasted as series); needs Coding Bench: ac-meter (error
                 parameters, calibration coefficients)
ASK      checkpoint (after the statement) — "Milestone 10. Introduce errors on both paths, then derive and apply
         your corrections."
         items: run uncalibrated and record | apply the known references | derive offset and gain per channel |
                apply the corrections and record what remains
         depth: use    practice: analysing data
FAULT    Scenarios 5 and 6 (sensor offset, sensor gain error).
-->

```flow
Now make it real. The model can introduce sensor gain error and offset, amplifier gain error and offset,
ADC reference error, ADC offset and gain error, noise, temperature-dependent error and nonlinearity.

Run the meter **without calibration** first, and look at what it reports. Then calibrate: known
reference → measurement system → compare → determine error → calibration coefficients → corrected
measurement. The point is that **the theoretical measurement relationship and the real measurement
system are not necessarily identical.**

And keep the transformations visible all the way to the unit: ADC code → ADC voltage → sensor and
conditioning relationship → electrical quantity → calibration correction → engineering value. Code →
volts; code → amperes; voltage and current → watts; real over apparent → PF. **A raw number is not
necessarily an engineering value.**

[[ask]] Milestone 10. Introduce errors on both paths, then derive and apply your corrections.
```

***

## Stress the meter

Switch on controlled imperfections — sensor, analog, ADC and timing errors, and changed signal
conditions — and run the core scenarios. Watch how an error introduced early in the chain propagates
into the final engineering value.

<!-- PLAN
SHOW (centrepiece) Coding Bench — the whole ac-meter program: front end (source and load; sensors with offset,
         gain error and nonlinearity; bias; anti-alias filter; noise), ADC (resolution, reference, rate,
         quantization, channel architecture and skew, jitter), and the firmware path (codes → V, A → RMS → P, S,
         PF → Hz, calibration), with a scenario selector 1–8 and the six views as tabs. Drive: for each scenario
         the room writes its prediction, then the presenter switches it on and opens the view where it shows:
         1–3 View 1 and View 6; 4 View 3; 5 and 6 View 5 and the calibration; 7 View 4; 8 View 5's instantaneous
         power.
         Look for: the stage each error enters at, and which final numbers it reaches — an error early in the
         chain arriving, transformed, at the display.
         Status: needs Coding Bench: ac-meter (full program, scenario selector, six views).
ASK      poe (after the statement) — "Scenario 1, a resistive load. Scenario 2, inductive. Scenario 3, capacitive.
         What will PF do, and how will real power compare with apparent power?"
         options: PF ≈ 1 for all three | PF ≈ 1 for the resistive load, below 1 for the other two, with P < S |
                  below 1 for the inductive load, above 1 for the capacitive
         answer: PF ≈ 1 for the resistive load, below 1 for the other two, with P < S
         reveal: the three loads run in turn, View 6, then View 1 for the sign of the shift
         explain: only the part of the current in phase with the voltage carries average power, and a lead loses
                  that part just as a lag does; the direction shows in View 1, not in the PF.
         depth: use    practice: analysing data
ASK      checkpoint (after the statement; predictions written before each run) — "Scenario 4, noise. 5, a sensor
         offset. 6, a sensor gain error. 7, a reduced sampling rate. 8, a distorted current. Which numbers move,
         and which stage would you fix?"
         items: 4 → RMS and P scatter; the filter and the averaging | 5 → small in RMS at full load, larger at light
                load; calibration | 6 → V or I, P and S off by the same fraction, PF unchanged; calibration |
                7 → waveform, frequency and everything after; sample rate and anti-alias filter | 8 → PF below
                cos φ; nothing to repair — PF measured as P/S
         depth: understand    practice: arguing from evidence
-->

```flow
To make it educational rather than ideal, switch on controlled imperfections: **sensor errors** (offset,
gain error, nonlinearity), **analog errors** (amplifier offset, gain error, noise, filter effects), **ADC
errors** (quantization, offset, gain error, reference variation, noise), **timing errors** (sampling-rate
variation, channel skew, sampling jitter), and **signal conditions** (frequency, voltage and current
variation, phase shift, harmonic distortion, noise). Watch how errors introduced early in the chain
propagate into the final engineering value.

Then the eight core scenarios. For each one, predict before you run it.

[[ask]] Scenario 1, a resistive load. Scenario 2, inductive. Scenario 3, capacitive. What will PF do, and
how will real power compare with apparent power?

[[pause]]

[[reveal]] Resistive: voltage and current approximately in phase, PF close to 1, real power close to
apparent. Inductive: current lags, PF below 1, real power less than apparent. Capacitive: current leads,
PF below 1, real power less than apparent — the direction of phase shift matters.

[[ask]] Scenario 4, noise on the voltage and current. Scenario 5, a sensor offset. Scenario 6, a sensor
gain error. Scenario 7, a reduced sampling rate. Scenario 8, a distorted current. Which numbers move, and
which stage would you fix?

[[pause]]

[[reveal]] Noise shows filtering, ADC noise, measurement uncertainty and its effect on RMS and power.
The offset shows why calibration is necessary; the gain error shows gain calibration. Insufficient
sampling shows poor waveform representation, aliasing and wrong results. And the distorted current is
where PF = cos φ stops being enough, and PF = P / (V_RMS I_RMS) becomes the meaningful calculation.

[[ask]] That is Milestone 11.
```

***

## The final meter

The display shows voltage, current, frequency, real power, apparent power and power factor. The display
is the final layer; the real value is everything that happened before those numbers appeared.

<!-- PLAN
SHOW     Figure — the AC doc §30 meter face from the first card, now with both waveforms; beside it, the room's own
         View 6. Drive: compare face with face, number by number.
         Look for: the face is self-consistent — 230.4 V × 3.21 A = 739.6 VA, and 612 W / 739 VA = 0.828 — and no
         digit on it is finer than the chain behind it supports.
         Status: needs asset: meter face SVG (as in the first card, waveforms shown)
ASK      checkpoint (after the statement) — "Milestone 12. Present your final engineering values."
         items: V, A, Hz, W, VA and PF from your own run | S = V_RMS·I_RMS and PF = P/S checked on your own face |
                no more digits than your chain supports
         depth: use    practice: analysing data
HARVEST  S4 — "On Day 1 I said a number that appears is not a number you have earned. Six numbers have just
         appeared. The difference this afternoon is that you can say what every one of them went through to get
         here."
-->

```flow
Milestone 12. The final application presents something like this:

[[demo]] The meter face: Voltage 230.4 V RMS. Current 3.21 A RMS. Frequency 50.02 Hz. Real power
612 W. Apparent power 739 VA. Power factor 0.828. Both waveforms underneath.

The display is the final layer. The real educational value is everything that happened **before** those
numbers appeared: the physical world, the AC voltage and current, transduction, sensor outputs, signal
conditioning — filtering, scaling, amplification, level shifting, buffering, isolation — the ADC with its
sampling, quantization and encoding, the digital interface, the microcontroller's scaling, calibration,
RMS, power, power factor and frequency, and finally V, A, W, VA, PF and Hz: meaningful information.
```

***

## Where did every number come from?

The lesson is not how to build an AC meter. It is how information about a physical quantity travels
through a measurement system and is transformed, stage by stage, into a meaningful digital number.

<!-- PLAN
SHOW     Draw — the capstone architecture from the second card, stepped backwards from the display to the mains as
         the pairs report, each stage lighting as a pair names what it did to their number; then the room's opening
         chains beside it.
         Status: needs Draw: capstone architecture, reverse walk (same drawing, steps in reverse)
ASK      checkpoint (after the statement) — "In pairs: pick one number on your meter and walk it back to the mains,
         answering the project's questions (AC doc §32) at each stage it passed. Then compare with the chain you
         wrote at the start."
         items: the number and its unit | each stage it passed, and what happened to it there | the error each
                stage could add | what your opening chain left out
         depth: create    practice: constructing explanations
HARVEST  S75 — "Now take out the chain you wrote before you touched the simulator. What did it leave out?"
-->

```flow
So, pick one number on your meter.

[[ask]] In pairs: walk that number back to the mains. At each stage it passed, answer the project's
questions. What physical quantity are we measuring? How does the sensor represent it electrically? Why
does the signal need conditioning? What happens if it is too large for the ADC, or too small? Why filter,
why level-shift, why buffer, why isolate? What does the ADC actually measure? How fast should we sample,
and what happens when we sample too slowly? How does the code become volts or amperes? Why do voltage
and current need a known timing relationship? Why RMS? Why is apparent power different from real power,
and why isn't power factor always cos φ? Why does calibration matter, and how do the sensor and ADC
errors reach the final result? How does the final number relate back to the original physical quantity?

[[pause]]

Now compare with the chain you wrote at the start. At the end of this project you should be able to say
the whole journey: we started with an AC electrical system. We sensed voltage and current. We
conditioned the resulting signals. We sampled and digitized them with an ADC. We transferred the digital
data to a microcontroller. We converted the raw codes into meaningful electrical quantities. We processed
the sampled waveforms to calculate RMS values and power. We calibrated the system to account for
real-world errors. And we finally produced engineering values: volts, amperes, watts, VA, power factor
and frequency.

The ultimate lesson is not how to build an AC meter. It is **how information about a physical quantity
travels through a measurement system and is progressively transformed from a physical phenomenon into a
meaningful digital number.** That is the essence of *From Sensor to Number*.

[[transition]] You have just built a meter that works. For the last half hour, I am going to break some
— and you are going to find out where.
```
