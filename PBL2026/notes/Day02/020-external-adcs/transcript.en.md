---
includeInExport: false
---

<!-- Restructured from: transcripts/Chapter 07 - Analog to digital converters.md ("ADCs inside common
     devices": ATmega328P, ESP32, ADS1115; "Comparing the three", with the table and the selection
     checklist); Chapter 10 - Communcation protocols.md ("Communication speed is not the same as useful data
     rate", "The interface can become part of the measurement chain"). ADS1115 internals and the INA226: no
     transcript yet (training-overview Day 3 Module 2).
     Where on the path: still the DIGITAL INTERFACE, now with the converter itself outside the chip. The
     code arrives over the bus we built in 010. -->

<!-- Lesson-level script for “External ADCs as a design choice: ADS1115 and INA226”. The words for each slide are in the ```flow
     fence under that card in en.md, and appear on the teleprompter with it. -->

## Where we are on the path

Still the DIGITAL INTERFACE, now with the converter itself outside the chip. The code arrives over the bus we built in 010.

## The arc

1. **When the integrated converter is not enough** — An external ADC earns its place when the microcontroller's built-in converter is not sufficient: when we need higher resolution, differential measurement, or precision-oriented sensor measurement.
2. **Three converters side by side** — The ATmega328P has a 10-bit SAR ADC, the classic ESP32 a 12-bit SAR, and the ADS1115 a 16-bit sigma-delta over I²C at up to 860 samples per second.
3. **Not "which has the most bits?"** — The question is not "Which ADC has the most bits?" but "What does my signal require?"
4. **The selection checklist** — ADC selection is a matter of matching the converter to the signal and the measurement objective: resolution, rate, bandwidth, accuracy, linearity, noise, reference, input range and impedance, single-ended or differential, gain, channels, multiplexing, architecture, latency, power, interface, calibration and environment.
5. **Inside the ADS1115** — The ADS1115 is a sigma-delta converter with a programmable gain amplifier in front of it.
6. **Can the bus keep up?** — The useful data rate is lower than the signalling speed, because addressing, framing and other overhead share the wire.
7. **INA226: build or buy?** — The INA226 is the build-versus-buy decision for current sensing: the shunt-and-in-amp channel we built on Day 1, offered as one part with a digital interface.

## What the wall shows

- When the integrated converter is not enough: Plot — D1·080's quantizer staircase round(x/q)·q over a 0–5 mV ramp (a bridge output), twice: q =
- Three converters side by side: Figure — the comparison table as an SVG (architecture, resolution, maximum rate, inputs, PGA,
- Not "which has the most bits?": Plot — the two staircases from the first card, back on the Canvas.
- The selection checklist: Draw — the course path drawing with the checklist's items pinned to the stages they belong to:
- Inside the ADS1115: Figure — the ADS1115 datasheet (TI SBAS444) as a tour: block diagram (AIN0–AIN3 → MUX →
- Can the bus keep up?: Equation — required bit rate = samples/s × bits per sample; then required bus clock = samples/s ×
- INA226: build or buy?: Figure — the INA226 block diagram (TI SBOS547) laid beside the Day 1 chain: external shunt (D1·050)

## Learner actions

- Three converters side by side: poe (before the statement) — "Rank the three by resolution, then by speed. Do the rankings agree?"
- Not "which has the most bits?": flash (after the statement) — "A slow signal, a few millivolts across a sensor bridge. Which of the
- The selection checklist: checkpoint (after the statement) — "In pairs: run the checklist on one sensor of your own and tick
- Inside the ADS1115: poe (before the noise table) — "As the data rate goes up, what does the noise do?"
- Inside the ADS1115: numeric (after the tour) — "At its two smallest full-scale ranges the ADS1115's differential input
- Can the bus keep up?: numeric (before the statement) — "An ADC produces 10,000 samples per second at 16 bits each. What
- Can the bus keep up?: numeric (after the reveal) — "On I²C, reading one 16-bit result takes about 27 clock cycles: an
- INA226: build or buy?: poll (after the statement) — "Build the Day 1 chain, or buy the INA226? Name one thing that would

## Reference

| Feature | ATmega328P ADC | Classic ESP32 ADC | ADS1115 |
|---|---|---|---|
| **Architecture** | SAR | SAR | Sigma-delta |
| **Resolution** | 10-bit | 12-bit | 16-bit |
| **Maximum conversion/data rate** | ~15 kSPS | Much higher-speed SAR operation; depends on operating mode/configuration | 860 SPS |
| **Inputs** | Multiplexed | Multiplexed | Multiplexed |
| **Single-ended** | Yes | Yes | 4 channels |
| **Differential** | No native differential ADC measurement | Not the same differential-input architecture as ADS1115 | 2 differential channels |
| **PGA** | No dedicated programmable gain stage | Input attenuation rather than a precision PGA | Yes |
| **Reference** | AVCC, internal 1.1 V, or external reference configuration | Internal reference with calibration/attenuation support | Internal low-drift reference |
| **Interface to CPU** | Internal | Internal | I²C |
| **Typical strength** | Simple embedded measurement | Fast, integrated embedded acquisition | Higher-resolution precision sensor measurement |
| **Typical limitation** | Lower resolution and modest speed | ADC non-idealities/calibration and device-specific limitations | Much lower sampling rate |

## Hand-off

[[transition]] Go back to the ADS1115's datasheet for a moment. It hands us a table that trades data
rate against noise, as if noise were simply a fact of life. Which raises the question we have
avoided all along: what *is* that noise, and where on the path does it come from?
