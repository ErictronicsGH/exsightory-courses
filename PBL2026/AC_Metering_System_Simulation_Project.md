# AC Metering System — Simulation Project

## From Sensor to Number Training Project

### Project Theme

**Design and simulate an AC metering system capable of measuring voltage, current, real power, apparent power, power factor, and frequency.**

The project runs alongside the *From Sensor to Number* training and serves as the practical thread connecting the concepts taught throughout the course.

The system will be **fully simulated**. No physical mains wiring or hardware construction is required.

---

# 1. Project Purpose

The purpose of this project is not simply to produce an AC meter.

The deeper purpose is to allow the learner to follow the complete journey of a physical quantity from the real world into a digital system and finally into a meaningful engineering value.

The project should demonstrate the complete chain:

**Physical quantity → Sensor/transduction → Electrical signal → Signal conditioning → ADC → Digital data → Digital interface → Processing → Calibration → Engineering value**

By the end of the project, the learner should be able to explain not only **what** the final numbers are, but **where they came from and what happened to the information at every stage**.

---

# 2. Project Objectives

The simulated system should be capable of determining:

- AC voltage
- AC current
- RMS voltage
- RMS current
- Real power
- Apparent power
- Power factor
- AC frequency

The project may be extended to include:

- Reactive power
- Energy consumption
- Harmonic analysis
- Peak voltage/current
- Power-quality indicators
- Waveform visualization
- Measurement alarms
- Data logging

The core project, however, should focus on:

> **Voltage + Current + Power Factor**

with real power, apparent power, and frequency supporting those measurements.

---

# 3. The Measurement Problem

Assume an AC electrical system supplying a load.

The quantities of interest are not initially digital numbers.

They exist as physical/electrical phenomena.

For example:

**AC voltage**

\[
v(t)
\]

and:

**AC current**

\[
i(t)
\]

The goal is to obtain meaningful engineering values such as:

**230 V**

**4.2 A**

**0.86 PF**

from those continuously varying electrical quantities.

The system therefore needs to create a chain of representations that can eventually be processed by a microcontroller.

---

# 4. Overall System Architecture

The simulated system should follow this conceptual architecture:

```text
                         AC ELECTRICAL SYSTEM
                                  │
                   ┌──────────────┴──────────────┐
                   │                             │
               VOLTAGE                         CURRENT
                   │                             │
            Voltage Sensor                Current Sensor
                   │                             │
                   └──────────────┬──────────────┘
                                  │
                         SIGNAL CONDITIONING
                                  │
                   ┌──────────────┴──────────────┐
                   │                             │
              Voltage Path                 Current Path
                   │                             │
                   └──────────────┬──────────────┘
                                  │
                                 ADC
                                  │
                         DIGITAL INTERFACE
                                  │
                           MICROCONTROLLER
                                  │
                         DIGITAL PROCESSING
                                  │
                   ┌──────────────┼──────────────┐
                   │              │              │
                  RMS          POWER         FREQUENCY
                   │              │              │
                   └──────────────┼──────────────┘
                                  │
                              CALIBRATION
                                  │
                         ENGINEERING VALUES
                                  │
             ┌────────────────────┼────────────────────┐
             │                    │                    │
           Voltage              Current          Power Factor
             │                    │                    │
             └────────────────────┼────────────────────┘
                                  │
                       DISPLAY / DATA OUTPUT
```

---

# 5. The AC Source

The simulation begins with an AC source.

For the initial model, use a nominal sinusoidal supply.

For example:

- RMS voltage: **230 V**
- Frequency: **50 Hz**
- Phase: **0°**

The instantaneous voltage can be represented as:

\[
v(t)=V_{peak}\sin(2\pi ft)
\]

where:

- \(V_{peak}\) is the peak voltage
- \(f\) is the AC frequency
- \(t\) is time

For a 230 V RMS sinusoidal supply:

\[
V_{peak}=230\sqrt{2}\approx325.3V
\]

The simulation should treat this as the original electrical quantity from which the measurement system obtains information.

---

# 6. The Load

The simulation should include a configurable load.

The initial load may be represented as a simple impedance.

Later, different load types can be introduced:

### Resistive load

Voltage and current are approximately in phase.

Expected:

\[
PF\approx1
\]

### Inductive load

Current lags voltage.

Expected:

\[
PF<1
\]

### Capacitive load

Current leads voltage.

Expected:

\[
PF<1
\]

### Nonlinear load

The current waveform may become distorted rather than simply being a shifted version of the voltage waveform.

This allows the project to demonstrate that power factor is not merely a matter of looking at two sine waves and measuring their phase angle.

---

# 7. Voltage Measurement Path

The simulated voltage measurement path should represent a real sensing system without requiring physical hardware.

Conceptually:

```text
AC Voltage
    ↓
Voltage Transducer
    ↓
Signal Conditioning
    ↓
ADC Input
```

The voltage sensor should scale the high-voltage AC waveform into a small electrical signal suitable for the ADC.

For example, conceptually:

**230 V AC**

↓

**Voltage sensing**

↓

**±1.0 V signal**

The exact simulated scaling ratio should be configurable.

---

# 8. Current Measurement Path

The current path follows the same general concept.

```text
AC Current
    ↓
Current Transducer
    ↓
Signal Conditioning
    ↓
ADC Input
```

For example:

**5 A AC**

↓

**Current sensing**

↓

**±0.8 V signal**

Again, the exact relationship should be configurable.

The simulation should make the distinction clear:

> The ADC does not directly measure the physical current.

It measures an electrical signal produced by the current-sensing system.

---

# 9. Signal Conditioning

The simulated measurement paths should include signal-conditioning stages.

Possible stages include:

- Scaling
- Amplification
- Filtering
- Level shifting
- Buffering
- Offset/biasing
- Isolation as a conceptual system boundary

## 9.1 Scaling

The sensor output may be scaled so that the signal fits within the ADC input range.

For example:

```text
Actual voltage:       ±325 V
        ↓
Voltage sensor
        ↓
Conditioned signal:   ±1.0 V
```

## 9.2 Level shifting

If the ADC accepts only positive voltages, a bipolar AC waveform cannot simply be connected directly to it.

The simulated signal may therefore be shifted around a bias voltage.

For example:

```text
Original signal:

      +1 V
        │
        │    /\
        │   /  \
   0 V ─┼──/────\────
        │ /      \
        │
      -1 V


After level shifting:

      2.5 V ─────────────
        │
        │    /\
        │   /  \
      1.65 V
        │ /      \
        │
      0.65 V
```

The purpose is to keep the entire waveform within the ADC's allowable input range.

## 9.3 Filtering

The simulation should allow unwanted high-frequency components or noise to be introduced and subsequently attenuated by filtering.

This connects directly to the discussion of:

- Signal bandwidth
- Sampling rate
- Noise
- Anti-aliasing

## 9.4 Buffering

The simulated system may include a buffer between the sensing/conditioning stage and the ADC.

The purpose is to prevent the ADC input from significantly loading the preceding circuit.

---

# 10. ADC

The conditioned voltage and current signals are digitized using an ADC.

The simulation should make the following ADC properties configurable:

- Resolution
- Reference voltage
- Sampling rate
- Input range
- Number of channels
- Channel architecture
- Offset
- Gain error
- Quantization
- Noise

For example:

**16-bit ADC**

\[
2^{16}=65536
\]

possible digital levels.

The ADC therefore converts the conditioned analog waveform into a sequence of digital samples.

---

# 11. Sampling

The voltage and current waveforms are continuous in time.

The ADC does not observe every instant.

Instead, it takes samples at discrete time intervals.

For example:

```text
Continuous waveform
       ↓
ADC sampling
       ↓
v₁ v₂ v₃ v₄ v₅ v₆ ...
```

and:

```text
i₁ i₂ i₃ i₄ i₅ i₆ ...
```

The sampling rate must be high enough for the measurement objectives.

The project should allow different sampling rates to be tested.

This provides an opportunity to demonstrate:

- Adequate sampling
- Undersampling
- Aliasing
- Anti-aliasing filtering
- Sampling synchronization

Aliasing should be treated as its own concept in the training, but the project should provide a practical environment in which the learner can observe its consequences.

---

# 12. Voltage and Current Sampling Relationship

This is a particularly important part of the project.

Real power depends on the relationship between voltage and current at corresponding points in time.

The instantaneous power is:

\[
p(t)=v(t)i(t)
\]

Therefore, in the digital system:

\[
p_n=v_n i_n
\]

The voltage and current samples must therefore have a known timing relationship.

The project should explicitly demonstrate the difference between:

### Sequential sampling

```text
Voltage sample
      ↓
Current sample
      ↓
Voltage sample
      ↓
Current sample
```

and:

### Simultaneous sampling

```text
Voltage sample ──┐
                 ├── same measurement instant
Current sample ──┘
```

This allows the learner to understand why ADC architecture matters.

A multiplexed ADC with one conversion engine may acquire multiple channels sequentially.

An ADC system with independent conversion engines may allow simultaneous acquisition.

---

# 13. Digital Interface

If the ADC is treated as an external device, the digital samples must be transferred to the microcontroller.

Possible simulated interfaces include:

- SPI
- I²C
- Parallel interface

For the core project, **SPI** may be used as the primary example.

Conceptually:

```text
ADC ⇄ SPI ⇄ Microcontroller
```

The simulation should make it clear that:

> The ADC produces the digital data.

> The interface determines how that data is transferred.

> The protocol defines the communication rules governing the transfer.

The interface should therefore be treated as part of the measurement system rather than as an unrelated communication topic.

---

# 14. Microcontroller

The microcontroller receives the digital samples and processes them.

The MCU should perform computations such as:

- Removing ADC offset
- Applying calibration coefficients
- Converting ADC codes into electrical quantities
- Calculating RMS voltage
- Calculating RMS current
- Calculating instantaneous power
- Calculating average real power
- Calculating apparent power
- Calculating power factor
- Calculating frequency
- Optionally calculating energy

The important conceptual transition is:

```text
Digital code
     ↓
Numerical processing
     ↓
Engineering value
```

---

# 15. Converting ADC Codes to Electrical Values

The ADC initially gives us a raw digital code.

For example:

```text
ADC code = 3102
```

That number does not automatically mean:

```text
3102 V
```

or:

```text
3102 A
```

We must know the ADC configuration and the measurement-path relationship.

For a simple ADC:

\[
V_{ADC}
\approx
\frac{Code}{Code_{max}}V_{ref}
\]

The measurement system then applies the scaling relationship of the sensing circuit.

For example:

```text
ADC code
   ↓
ADC voltage
   ↓
Conditioning scale
   ↓
Sensor scale
   ↓
Measured voltage
```

The same principle applies to current.

---

# 16. RMS Voltage

For sampled voltage values:

\[
V_{RMS}
=
\sqrt{
\frac{1}{N}
\sum_{n=1}^{N}v_n^2
}
\]

The simulation should show the intermediate stages:

```text
Voltage samples
      ↓
Square each sample
      ↓
Average the squares
      ↓
Square root
      ↓
RMS voltage
```

The final result should be expressed in volts.

---

# 17. RMS Current

Similarly:

\[
I_{RMS}
=
\sqrt{
\frac{1}{N}
\sum_{n=1}^{N}i_n^2
}
\]

The simulation should show:

```text
Current samples
      ↓
Square each sample
      ↓
Average the squares
      ↓
Square root
      ↓
RMS current
```

The final result should be expressed in amperes.

---

# 18. Instantaneous Power

For each corresponding pair of samples:

\[
p_n=v_n i_n
\]

This produces a sequence of instantaneous power values.

```text
Voltage samples ──┐
                  ×
Current samples ──┘
                  ↓
          Instantaneous power
```

The instantaneous power waveform can be visualized.

This is particularly useful for helping the learner understand that **power itself can vary with time**.

---

# 19. Real Power

The real power is obtained from the average of instantaneous power:

\[
P=
\frac{1}{N}
\sum_{n=1}^{N}v_n i_n
\]

The result is expressed in **watts (W)**.

For a purely resistive sinusoidal load:

\[
P\approx V_{RMS}I_{RMS}
\]

For loads with a power factor below unity:

\[
P<V_{RMS}I_{RMS}
\]

---

# 20. Apparent Power

Apparent power is:

\[
S=V_{RMS}I_{RMS}
\]

It is expressed in **volt-amperes (VA)**.

It represents the product of RMS voltage and RMS current.

---

# 21. Power Factor

Power factor is:

\[
PF=\frac{P}{S}
\]

Therefore:

\[
PF=
\frac{P}
{V_{RMS}I_{RMS}}
\]

For a system where the calculated real power and apparent power are positive:

\[
0\leq PF\leq1
\]

for the common load conditions considered in the project.

The simulation should allow the learner to observe how power factor changes when the load changes.

---

# 22. Phase Relationship

For an ideal sinusoidal system with a linear load:

\[
PF=\cos(\phi)
\]

where \(\phi\) is the phase difference between voltage and current.

The project should use this relationship as a conceptual bridge, but should also demonstrate that:

> **Power factor is more general than simply phase angle.**

For distorted waveforms, the current may contain harmonics and the simple \(\cos(\phi)\) interpretation may no longer fully describe the true power factor.

The sampled-waveform method:

\[
PF=
\frac{P}{V_{RMS}I_{RMS}}
\]

remains the more general measurement approach used by the project.

---

# 23. Frequency

The system should estimate AC frequency from the sampled waveform.

Possible methods include:

- Zero-crossing detection
- Period measurement
- Digital signal processing

For a nominal 50 Hz waveform:

\[
T=\frac{1}{f}=20\,ms
\]

The project should demonstrate how changing the source frequency affects the measured result.

---

# 24. Calibration

The simulation must include non-ideal behavior.

The voltage and current measurement paths should be capable of introducing configurable errors such as:

- Sensor gain error
- Sensor offset
- Amplifier gain error
- Amplifier offset
- ADC reference error
- ADC offset
- ADC gain error
- Noise
- Temperature-dependent error
- Nonlinearity

The learner should first observe the measurement system **without calibration**.

Then calibration coefficients should be introduced.

For example:

```text
Known reference
      ↓
Measurement system
      ↓
Compare
      ↓
Determine error
      ↓
Calibration coefficients
      ↓
Corrected measurement
```

The purpose is to demonstrate that:

> **The theoretical measurement relationship and the real measurement system are not necessarily identical.**

---

# 25. Scaling and Engineering Units

The raw ADC code is not the final measurement.

The processing chain should make the transformations visible:

```text
ADC code
   ↓
ADC voltage
   ↓
Sensor/conditioning relationship
   ↓
Electrical quantity
   ↓
Calibration correction
   ↓
Engineering value
```

For voltage:

```text
ADC code → volts
```

For current:

```text
ADC code → amperes
```

For power:

```text
Voltage + Current → watts
```

For power factor:

```text
Real power / apparent power → PF
```

This reinforces one of the central lessons of the training:

> **A raw number is not necessarily an engineering value.**

---

# 26. Simulation Non-Idealities

To make the project educational rather than simply ideal, the simulation should allow controlled imperfections.

The learner should be able to enable or adjust:

### Sensor errors

- Offset
- Gain error
- Nonlinearity

### Analog errors

- Amplifier offset
- Gain error
- Noise
- Filter effects

### ADC errors

- Quantization
- Offset
- Gain error
- Reference variation
- Noise

### Timing errors

- Sampling-rate variation
- Channel skew
- Sampling jitter

### Signal conditions

- Frequency variation
- Voltage variation
- Current variation
- Phase shift
- Harmonic distortion
- Noise

This allows the learner to observe how errors introduced early in the measurement chain propagate into the final engineering value.

---

# 27. Required Simulation Views

The simulation should provide a way to observe the system at different points in the measurement chain.

At minimum:

## View 1 — Source

Display:

- AC voltage waveform
- AC current waveform
- Frequency
- Load characteristics

## View 2 — Sensor output

Display:

- Voltage sensor output
- Current sensor output

## View 3 — Conditioned signals

Display:

- Amplified/attenuated signals
- Filtered signals
- Offset/bias
- ADC input range

## View 4 — ADC

Display:

- Sampling points
- Quantized waveform
- ADC codes
- Sampling rate
- Resolution

## View 5 — Digital processing

Display:

- Voltage samples
- Current samples
- Instantaneous power
- RMS calculations
- Averaging

## View 6 — Final measurement

Display:

- Voltage
- Current
- Real power
- Apparent power
- Power factor
- Frequency
- Optional energy

This progression allows the learner to literally follow:

**Signal → Number → Meaning**

---

# 28. Core Measurement Scenarios

The simulation should include several predefined test cases.

## Scenario 1 — Resistive load

Expected characteristics:

- Voltage and current approximately in phase
- PF close to 1
- Real power close to apparent power

Purpose:

Demonstrate the simplest relationship between voltage, current, and power.

---

## Scenario 2 — Inductive load

Expected characteristics:

- Current lags voltage
- PF below 1
- Real power less than apparent power

Purpose:

Demonstrate phase relationship and power factor.

---

## Scenario 3 — Capacitive load

Expected characteristics:

- Current leads voltage
- PF below 1
- Real power less than apparent power

Purpose:

Demonstrate that the direction of phase shift matters.

---

## Scenario 4 — Noisy measurement

Introduce noise into the voltage and/or current measurement.

Purpose:

Demonstrate:

- Filtering
- ADC noise
- Measurement uncertainty
- Effect of noise on RMS and power calculations

---

## Scenario 5 — Sensor offset

Introduce an offset into the sensor output.

Purpose:

Demonstrate why calibration is necessary.

---

## Scenario 6 — Sensor gain error

Make the sensor output slightly larger or smaller than expected.

Purpose:

Demonstrate gain calibration.

---

## Scenario 7 — Insufficient sampling

Reduce the sampling rate.

Purpose:

Demonstrate:

- Poor waveform representation
- Aliasing
- Incorrect measurement results

---

## Scenario 8 — Distorted current

Introduce harmonics or a nonlinear current waveform.

Purpose:

Demonstrate why:

\[
PF=\cos(\phi)
\]

is not always sufficient for real-world power-factor measurement.

The sampled-waveform calculation:

\[
PF=\frac{P}{V_{RMS}I_{RMS}}
\]

should then become particularly meaningful.

---

# 29. Learning Milestones

The project should grow progressively with the training.

### Milestone 1 — Observe the physical quantities

Simulate voltage and current waveforms.

### Milestone 2 — Add sensing

Create voltage and current sensor models.

### Milestone 3 — Condition the signals

Add scaling, filtering, amplification, and level shifting.

### Milestone 4 — Digitize

Add ADC sampling and quantization.

### Milestone 5 — Transfer the data

Introduce the digital interface between ADC and MCU.

### Milestone 6 — Recover engineering quantities

Convert ADC codes into volts and amperes.

### Milestone 7 — Calculate RMS

Calculate RMS voltage and current.

### Milestone 8 — Calculate power

Calculate instantaneous and real power.

### Milestone 9 — Calculate apparent power and PF

Calculate:

\[
S=V_{RMS}I_{RMS}
\]

and:

\[
PF=\frac{P}{S}
\]

### Milestone 10 — Calibrate

Introduce errors and develop calibration corrections.

### Milestone 11 — Stress the measurement system

Test noise, distortion, sampling limitations, and sensor errors.

### Milestone 12 — Produce the final meter

Present the final engineering values through a simulated meter interface.

---

# 30. Final Simulated Meter

The final application should present something similar to:

```text
┌─────────────────────────────────────────────┐
│              AC POWER METER                 │
├─────────────────────────────────────────────┤
│                                             │
│  Voltage          230.4 V RMS              │
│  Current            3.21 A RMS             │
│  Frequency         50.02 Hz                │
│                                             │
│  Real Power        612 W                   │
│  Apparent Power    739 VA                  │
│  Power Factor      0.828                   │
│                                             │
│  ───────────── WAVEFORMS ─────────────      │
│                                             │
│       Voltage      ~~~~~~~~                 │
│       Current      ~~~~~~~~                 │
│                                             │
└─────────────────────────────────────────────┘
```

The display is the final layer.

The real educational value is everything that happened **before** those numbers appeared.

---

# 31. Final Measurement Chain

The complete project should ultimately demonstrate:

```text
PHYSICAL WORLD
      │
      ▼
AC Voltage / Current
      │
      ▼
TRANSDUCTION
      │
      ▼
Sensor Outputs
      │
      ▼
SIGNAL CONDITIONING
      │
      ├── Filtering
      ├── Scaling
      ├── Amplification
      ├── Level Shifting
      ├── Buffering
      └── Isolation
      │
      ▼
ADC
      │
      ├── Sampling
      ├── Quantization
      └── Encoding
      │
      ▼
DIGITAL INTERFACE
      │
      └── SPI / I²C / etc.
      │
      ▼
MICROCONTROLLER
      │
      ├── Scaling
      ├── Calibration
      ├── RMS
      ├── Instantaneous Power
      ├── Real Power
      ├── Apparent Power
      ├── Power Factor
      └── Frequency
      │
      ▼
ENGINEERING VALUES
      │
      ├── V
      ├── A
      ├── W
      ├── VA
      ├── PF
      └── Hz
      │
      ▼
MEANINGFUL INFORMATION
```

---

# 32. Core Engineering Questions

Throughout the project, the learner should repeatedly be challenged with questions such as:

1. **What physical quantity are we trying to measure?**
2. **How does the sensor represent that quantity electrically?**
3. **Why does the signal need conditioning?**
4. **What happens if the signal is too large for the ADC?**
5. **What happens if the signal is too small?**
6. **Why do we need filtering?**
7. **Why do we need level shifting?**
8. **Why might buffering be necessary?**
9. **Why is isolation important?**
10. **What does the ADC actually measure?**
11. **What determines ADC resolution?**
12. **How fast should we sample?**
13. **What happens when we sample too slowly?**
14. **How does the ADC code become volts or amperes?**
15. **Why does the raw ADC code not directly represent the physical quantity?**
16. **Why do voltage and current need a known timing relationship?**
17. **Why do we calculate RMS?**
18. **How do voltage and current produce real power?**
19. **Why is apparent power different from real power?**
20. **What does power factor actually tell us?**
21. **Why isn't power factor always simply \(\cos(\phi)\)?**
22. **Why does calibration matter?**
23. **How do sensor and ADC errors affect the final result?**
24. **What happens when the measurement system is noisy?**
25. **How does the final number relate back to the original physical quantity?**

---

# 33. Final Project Outcome

At the completion of the project, the learner should be able to explain the complete journey:

> **We started with an AC electrical system.**
>
> **We sensed voltage and current.**
>
> **We conditioned the resulting signals.**
>
> **We sampled and digitized them using an ADC.**
>
> **We transferred the digital data to a microcontroller.**
>
> **We converted the raw codes into meaningful electrical quantities.**
>
> **We processed the sampled waveforms to calculate RMS values and power.**
>
> **We calibrated the system to account for real-world errors.**
>
> **We finally produced engineering values such as volts, amperes, watts, VA, power factor, and frequency.**

The ultimate lesson of the project is therefore not simply how to build an AC meter.

It is:

> **How information about a physical quantity travels through a measurement system and is progressively transformed from a physical phenomenon into a meaningful digital number.**

That is the essence of **From Sensor to Number**.
