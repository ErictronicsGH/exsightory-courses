---
targetMinutes: 30
motivates: The converter inside the microcontroller is not good enough for this signal — so which external one, and how do we choose without being seduced by the bit count?
objectives:
  - Compare an integrated and an external ADC against what the signal requires, using a selection checklist rather than the number of bits.
  - Read an ADS1115 datasheet for its PGA, gain-dependent input impedance and data-rate-versus-noise trade, and check that the bus can carry the data.
  - Decide between building a shunt-and-in-amp current channel and buying it as an INA226.
concepts: [external-adc]
---

# External ADCs as a design choice: ADS1115 and INA226

<!-- PATH: [ … → CONVERSION → REFERENCE → **DIGITAL INTERFACE** → FIRMWARE → NUMBER ]  — the converter moves
     outside the chip, and its code arrives over the bus.
     TOOL: Figure (centrepiece: the ADS1115 datasheet as a tour; INA226 block diagram; the three-converter
           table) · Equation (data-rate and I²C clock budget; the loaded divider) · Plot (a 5 mV signal on two
           quantizer staircases). Neither part has a simulation model — say so to the room.
     SOURCES: transcripts/Chapter 07 - Analog to digital converters.md ("ADCs inside common devices",
              "Comparing the three", the selection checklist); Chapter 10 - Communcation protocols.md
              ("Communication speed is not the same as useful data rate", "The interface can become part of
              the measurement chain"); training-overview.md Day 3 Module 2. -->

## When the integrated converter is not enough

An external ADC earns its place when the microcontroller's built-in converter is not sufficient:
when we need higher resolution, differential measurement, or precision-oriented sensor measurement.

<!-- PLAN
SHOW     Plot — D1·080's quantizer staircase round(x/q)·q over a 0–5 mV ramp (a bridge output), twice: q =
         3.3 V/4096 ≈ 0.81 mV (the MCU's 12-bit SAR) and q = 0.256 V/32768 ≈ 7.8 µV (the ADS1115 at ±0.256 V).
         Drive: the MCU staircase first, then the second curve. Look for: about six steps across the whole
         signal against about 640.
         Status: ready
-->

<!-- Say plainly: neither part in this module has a simulation model. It is a datasheet-reading exercise
     and a design decision, not a demo. -->

<!-- FILLED 2026-10-07: drafted from training-overview Day 3 Module 2; tutor to review -->

```flow
In the last module the code left the converter and travelled over a bus. Now we ask a harder
question: what if the converter inside the microcontroller is not the one this signal needs?

An ADC does not have to be a separate component. Many microcontrollers already contain one, and for
many simple applications an external ADC is not required. But a dedicated external ADC such as the
ADS1115 becomes particularly interesting for applications where the microcontroller's built-in ADC
is not sufficient, especially when we need **higher resolution, differential measurement, or
precision-oriented sensor measurement**.

Here is a signal from yesterday that makes the point. A strain-gauge bridge gives a few millivolts at
full load. On a 12-bit converter with a 3.3 V reference, one step is about 0.8 mV, so 5 mV of signal
spans about six codes. That is barely a measurement at all.

The ADS1115, on its most sensitive range, ±0.256 V, has steps of about 7.8 µV. The same 5 mV spans
about 640 codes, and it can read the bridge's two outputs directly as a difference.

I want to say something plainly before we start: neither of the two parts in this module, the
ADS1115 and the INA226, has a simulation model. So this module is not a demo. It is a
datasheet-reading exercise and a design decision, and that is a skill in its own right.
```

***

## Three converters side by side

The ATmega328P has a 10-bit SAR ADC, the classic ESP32 a 12-bit SAR, and the ADS1115 a 16-bit
sigma-delta over I²C at up to 860 samples per second. The highest nominal resolution is also by far
the slowest.

<!-- PLAN
SHOW     Figure — the comparison table as an SVG (architecture, resolution, maximum rate, inputs, PGA,
         reference, interface, strength, limitation) for the ATmega328P (10-bit SAR, ~15 kSPS), the classic
         ESP32 (12-bit SAR) and the ADS1115 (16-bit ΔΣ, 860 SPS). Drive: spotlight the resolution row, then
         the rate row. Look for: the two rows ordered in opposite directions.
         Status: needs asset: comparison table SVG, values checked against the three datasheets
ASK      poe (before the statement) — "Rank the three by resolution, then by speed. Do the rankings agree?"
         options: Same order both times | Roughly reversed | No relation between them
         answer: Roughly reversed
         reveal: the two rows spotlighted in turn
         explain: The ADS1115 reaches 16 bits by sampling far faster inside than it outputs and filtering,
         which spends time, while a SAR decides one bit per comparison and is done quickly.
         depth: understand    practice: analysing data
-->

```flow
[[ask]] Here are three converters we meet every day: the ATmega328P, the classic ESP32 and the
ADS1115. Rank them by resolution. Now rank them by speed. Do the two rankings agree?

[[pause]]

The **ATmega328P**, used in the classic Arduino Uno, contains a **10-bit SAR ADC** with multiplexed
analog inputs. Its ADC can achieve up to approximately **15 kSPS** under the specified conditions. It
provides selectable reference options, including AVCC and a nominal internal **1.1 V** reference, and
includes a sample-and-hold circuit so that the input voltage is held while the conversion takes
place. This makes it very convenient for relatively slow measurements such as potentiometers, light
sensors, temperature sensors, battery-voltage monitoring and slowly changing analog signals. The ADC
is already inside the microcontroller, so an external ADC is not required for many simple
applications.

The **classic ESP32** contains two SAR ADC units with multiple multiplexed analog channels. Its raw
ADC result is normally 12 bits, providing **4,096 levels**. The ESP32 also provides configurable input
attenuation, allowing the ADC to accommodate input voltages above its nominal internal reference
range. It supports both **one-shot** and **continuous** conversion modes.

One particularly important practical consideration is that the classic ESP32's **ADC2 is shared with
the Wi-Fi subsystem**, which can affect its availability when Wi-Fi is active. ADC1 is therefore
often preferred when continuous analog measurement is required alongside Wi-Fi.

The ESP32 provides substantially more ADC capability than the basic ATmega328P, but its ADC is not
automatically a precision instrument. Calibration and the actual characteristics of the ADC need to
be considered when accurate voltage measurements are required.

The **ADS1115** is an example of a dedicated external ADC. Unlike the ADCs built into the ATmega328P
and ESP32, it is a separate integrated circuit that communicates with the microcontroller through
**I²C**. It provides **16-bit resolution** and a maximum data rate of **860 samples per second**. It
has an input multiplexer that supports **four single-ended inputs or two differential inputs**, as
well as a programmable gain amplifier (PGA).

We can use these three devices to see how different ADC characteristics affect their usefulness:

(Table on the script panel: Feature · ATmega328P ADC · Classic ESP32 ADC · ADS1115.)

[[reveal]] The numbers alone tell an interesting story. The **ADS1115 has the highest nominal
resolution**, but it is also by far the slowest of the three. The **ATmega328P has the lowest
resolution**, but its ADC is fast enough for many ordinary embedded measurements. The **ESP32 sits
between them in nominal resolution while offering a much faster SAR-based acquisition system**.
```

***

## Not "which has the most bits?"

The question is not "Which ADC has the most bits?" but "What does my signal require?"

<!-- PLAN
SHOW     Plot — the two staircases from the first card, back on the Canvas.
         Status: ready
ASK      flash (after the statement) — "A slow signal, a few millivolts across a sensor bridge. Which of the
         three would you reach for?"
         options: ATmega328P | Classic ESP32 | ADS1115
         answer: ADS1115
         explain: Its differential inputs read the bridge directly and its ±0.256 V range gives 7.8 µV steps,
         about 640 codes across 5 mV where a 12-bit 3.3 V SAR gives about six, and a slow bridge does not
         need more than 860 samples per second.
         depth: understand    practice: arguing from evidence
-->

```flow
So we should not simply ask: **"Which ADC has the most bits?"**

Instead, we should ask: **"What does my signal require?"**

[[ask]] Your signal changes slowly and is only a few millivolts across a sensor bridge. Which of the
three would you reach for, and why?

[[pause]]
```

***

## The selection checklist

ADC selection is a matter of matching the converter to the signal and the measurement objective:
resolution, rate, bandwidth, accuracy, linearity, noise, reference, input range and impedance,
single-ended or differential, gain, channels, multiplexing, architecture, latency, power, interface,
calibration and environment.

<!-- PLAN
SHOW     Draw — the course path drawing with the checklist's items pinned to the stages they belong to:
         input impedance → source and loading (D1·040), differential and gain → conditioning (D1·060),
         acquisition → ADC input (D1·070), resolution, noise, linearity → conversion (D1·080), reference →
         reference (D1·090), interface → digital interface (D2·010). Look for: almost no item without a home.
         Status: needs Draw: path drawing with checklist pins (reuse the course path drawing)
ASK      checkpoint (after the statement) — "In pairs: run the checklist on one sensor of your own and tick
         the two items that decide it."
         items: sensor named | signal size and bandwidth written | two deciding items ticked | the converter
         that follows from them named
         depth: create    practice: defining problems
-->

```flow
Among the important ADC characteristics to consider are:

- **Resolution** — How finely can the input amplitude be represented?
- **Sampling rate** — How frequently can the signal be measured?
- **Bandwidth** — What frequency content can the analog input path handle?
- **Accuracy** — How close is the result to the actual input?
- **Linearity** — Does the ADC represent equal changes in input equally well across its range?
- **Noise** — How much unwanted variation is introduced or present in the conversion?
- **Reference accuracy and stability** — How reliable is the voltage against which the input is
  measured?
- **Input range** — What voltages can safely and usefully be measured?
- **Input impedance and loading** — How much does the ADC disturb the signal source?
- **Single-ended or differential input** — Is the signal measured relative to ground or as a
  difference between two inputs?
- **Gain/PGA** — Can small signals be amplified before conversion to make better use of the ADC's
  available levels?
- **Number of channels** — How many signals can the ADC accept?
- **Multiplexing** — Are those channels measured simultaneously or shared through one conversion
  path?
- **Conversion architecture** — SAR, sigma-delta, flash, pipeline, etc., each with different
  trade-offs.
- **Latency** — How long does it take before a measured input becomes available as digital data?
- **Power consumption** — Important for battery-powered systems.
- **Interface** — For an external ADC, how does the digital result reach the microcontroller?
- **Calibration requirements** — Does the ADC need correction to produce useful voltage
  measurements?
- **Operating environment** — Temperature range, supply variation, electromagnetic interference and
  other conditions can affect performance.

This is why ADC selection is really a matter of **matching the converter to the signal and the
measurement objective**.

Almost every line of that list is a stage of the path we walked yesterday, seen from the converter's
side.
```

***

## Inside the ADS1115

The ADS1115 is a sigma-delta converter with a programmable gain amplifier in front of it. Its input
impedance changes with the gain setting, and its datasheet trades data rate against noise in a table.

<!-- PLAN
SHOW (centrepiece) Figure — the ADS1115 datasheet (TI SBAS444) as a tour: block diagram (AIN0–AIN3 → MUX →
         PGA → ΔΣ modulator → digital filter → I²C, internal reference and oscillator) → MUX pairs (AIN0–AIN1,
         AIN2–AIN3) → the PGA full-scale ranges (±6.144 V … ±0.256 V; LSB = FSR/2¹⁵: 187.5 µV … 7.8 µV) →
         input impedance against full-scale range → the noise table against data rate, last.
         Drive: in that order; spotlight one column at a time; compare the 8 SPS and 860 SPS rows.
         Look for: the noise growing with data rate, and the input impedance falling as the gain rises.
         Status: needs asset: ADS1115 datasheet PDF, page numbers fixed at build; every value read off the
                 page on the day, not from memory
ASK      poe (before the noise table) — "As the data rate goes up, what does the noise do?"
         options: It rises | It falls | It stays the same
         answer: It rises
         reveal: spotlight on the noise table, 8 SPS row to 860 SPS row
         explain: Each output is the digital filter's average over the modulator's samples, and a faster
         output rate averages fewer of them over a wider bandwidth, so more noise gets through.
         depth: understand    practice: analysing data
ASK      numeric (after the tour) — "At its two smallest full-scale ranges the ADS1115's differential input
         impedance is about 710 kΩ (confirm on the page). A 10 kΩ bridge drives it. What loading error is
         that, in per cent?"
         answer: 1.4 % ± 0.2 %
         reveal: Equation — the loaded divider from D1·040, input impedance on its slider, stepped through the
         datasheet's values for each range
         explain: Source and input form a divider, 10 k / (10 k + 710 k) ≈ 1.4 %, and because the input
         impedance falls as the gain rises, the range that resolves the bridge best also loads it hardest.
         depth: use    practice: computational thinking
HARVEST  S20 — "Yesterday: more bits are not more accuracy, and ENOB is the honest number. Here is a datasheet
         saying so itself: sixteen bits on the cover, and a table inside showing how many of them are noise
         at each data rate."
HARVEST  S16 — "The multiplexer pairs its inputs, AIN0 against AIN1. That is yesterday's in-amp idea built into
         the converter: measure the difference, ignore what both inputs share."
SEED     plants S52 — "Keep this table in mind: noise that grows with data rate. In half an hour we find out
         why speed costs noise."
-->

<!-- FILLED 2026-10-07: drafted from training-overview Day 3 Module 2 and the ADS1115 datasheet (TI SBAS444); input-impedance value to be confirmed on the page; tutor to review -->

```flow
We met sigma-delta conversion at the converter on Day 1 (080). Now we open the ADS1115's datasheet
and read what that architecture means for us as users.

[[ask]] Find the table that sets data rate against noise. Before you read across it: as the data
rate goes up, what do you expect the noise to do?

[[pause]]

[[reveal]] The noise rises with the data rate. Let us see why, by walking the datasheet.

[[demo]] The block diagram first: four inputs into a multiplexer, then a programmable gain amplifier,
then the sigma-delta modulator, a digital filter, and the I²C interface. The reference and the clock
are inside the chip.

The multiplexer can pair its inputs: AIN0 against AIN1, AIN2 against AIN3. That is a differential
measurement, yesterday's in-amp idea built into the converter. Measure the difference, ignore what
both inputs share.

The PGA sets the full-scale range, from ±6.144 V down to ±0.256 V. The result is 16 bits and signed,
so one count is the range divided by 32,768: 187.5 µV on the widest range, about 7.8 µV on the
narrowest.

Now the input impedance. It is not one number. It changes with the gain setting, and it is lowest on
the most sensitive ranges. Read the values off the page: on the smallest ranges it is of the order of
700 kΩ. So the ADS1115 is a load, just like the meter on Day 1, and how heavy a load depends on the
range you choose.

[[ask]] If a 10 kΩ bridge drives an input of about 710 kΩ, what loading error is that?

[[pause]]

About 10 k out of 720 k: 1.4 %. The range that resolves the bridge best also loads it hardest.

Finally, the noise table. Remember what a sigma-delta does: it samples far faster than it reports,
and the digital filter averages. Ask it for results more often, and each result averages fewer samples
over a wider bandwidth, so more noise gets through.

Sixteen bits on the cover, and a table inside showing how many of them are noise at each data rate.
Yesterday we said ENOB is the honest number. Here is a datasheet saying so itself.
```

***

## Can the bus keep up?

The useful data rate is lower than the signalling speed, because addressing, framing and other
overhead share the wire. 10,000 samples/s × 16 bits is 160 kbit/s before any overhead, and the
interface must carry it without becoming the bottleneck.

<!-- PLAN
SHOW     Equation — required bit rate = samples/s × bits per sample; then required bus clock = samples/s ×
         clocks per sample, solved for samples/s at 100 kHz and 400 kHz. Worked examples: 10 kS/s × 16 bit =
         160 kbit/s; on I²C one 16-bit read is an address byte and two data bytes, each 8 bits plus ACK, about
         27 clocks, so 10 kS/s needs about 270 kHz; the ADS1115 at its 860 SPS needs about 23 kHz.
         Drive: payload term first, then switch on the overhead term, with markers at 100 kHz and 400 kHz.
         Look for: the 160 kbit/s payload growing to a 270 kHz clock once the bus's own bits are counted.
         Status: ready
ASK      numeric (before the statement) — "An ADC produces 10,000 samples per second at 16 bits each. What
         bit rate does the raw data alone need, in kbit/s?"
         answer: 160 kbit/s ± 1
         reveal: the Equation's payload term
         explain: 10,000 × 16 = 160,000 bit/s, before a single address, ACK or start bit is counted.
         depth: use    practice: computational thinking
ASK      numeric (after the reveal) — "On I²C, reading one 16-bit result takes about 27 clock cycles: an
         address byte and two data bytes, each 8 bits plus an ACK. What bus clock does 10,000 samples per
         second need, in kHz?"
         answer: 270 kHz ± 10 kHz
         reveal: the Equation's overhead term switched on, against the 100 kHz and 400 kHz markers
         explain: 27 × 10,000 = 270,000 clocks a second, about 70 % more than the payload, so a 100 kHz bus
         tops out near 3,700 reads a second and a 400 kHz bus near 14,800, before start, stop and the gaps
         between transactions.
         depth: create    practice: computational thinking
HARVEST  S50 — "In the last module 'how much data, how quickly?' was a question on a list. Here it is with
         numbers."
-->

```flow
An external ADC brings back the question from the last module: can the interface carry what the
converter produces?

A useful distinction is between the **signalling speed** of an interface and the amount of useful
application data that can actually be transferred. An interface may operate at a particular clock or
symbol rate, but some of that communication may be used for addressing, commands, headers,
start/stop conditions, framing, error checking and other protocol overhead. Therefore, the useful
data rate available to the application may be lower than the raw signalling rate.

This becomes important when deciding whether an interface can keep up with an ADC.

[[ask]] Suppose an ADC is producing **10,000 samples per second**, and each sample requires **16
bits**. What bit rate does the raw measurement data alone need?

[[pause]]

[[reveal]] The raw measurement data alone requires **10,000 × 16 = 160,000 bits/second**, or
approximately **160 kbit/s**. But the actual communication requirement may be higher once protocol
overhead and other transferred information are included. The interface therefore needs sufficient
capacity to move the data **without becoming the bottleneck**.

This is particularly important in measurement systems. We can now extend our measurement chain:

**Physical quantity → Sensor → Electrical signal → Signal conditioning → ADC → Digital data → Digital
interface → Processor → Engineering value**

Each stage can affect the final result. The ADC may accurately convert the signal, but if the
communication interface is too slow, incorrectly configured, electrically incompatible, or unable to
reliably transfer the data, the processor may still receive incorrect or incomplete information.

Therefore, the communication interface is not merely an afterthought after the ADC. It is part of the
**measurement system**. This gives us another useful distinction:

**The ADC determines how the analog signal becomes digital data.** **The communication interface determines how that digital data is transferred to another device.**

And the choice of that interface is an engineering decision based on the requirements of the system.
Two digital devices must agree on both the **electrical characteristics** and the **communication
rules** required to exchange information reliably.
```

***

## INA226: build or buy?

The INA226 is the build-versus-buy decision for current sensing: the shunt-and-in-amp channel we
built on Day 1, offered as one part with a digital interface.

<!-- PLAN
SHOW     Figure — the INA226 block diagram (TI SBOS547) laid beside the Day 1 chain: external shunt (D1·050)
         → differential input riding on a 0–36 V common mode (D1·060) → 16-bit ADC → averaging and
         conversion-time settings → calibration, current and power registers → I²C. Drive: tour pairs each
         INA226 block with the Day 1 stage it replaces. Look for: three Day 1 modules folding into one
         package, and two of this morning's firmware jobs, averaging and calibration, already in its
         registers.
         Status: needs asset: INA226 datasheet PDF (block diagram; 2.5 µV shunt LSB, ±81.92 mV full scale,
                 averaging 1–1024) — confirm the values on the page
ASK      poll (after the statement) — "Build the Day 1 chain, or buy the INA226? Name one thing that would
         push you each way."
         options: Build | Buy | It depends on …
         explain: The reasons named in chat become the trade: cost, board area and a calibrated block on one
         side; choice of shunt, bandwidth and knowing every stage on the other.
         depth: create    practice: arguing from evidence
SEED     plants S51 — "Two amps through a ten-milliohm shunt is twenty millivolts: eight thousand of the
         INA226's 2.5-microvolt counts, every one of them signal. Remember that pair: two amps, ten milliohms."
SEED     plants S58 — "Look at two of its registers: averaging, and calibration. The INA226 does in silicon two
         jobs our firmware is about to do by hand."
FAULT    The INA226's calibration register written for a 10 mΩ shunt on a board fitted with 5 mΩ: the current
         reads exactly half, steadily and plausibly.
-->

<!-- FILLED 2026-10-07: drafted from training-overview Day 3 Module 2 and the INA226 datasheet (TI SBOS547); tutor to review -->

```flow
On Day 1 we built a current channel by hand: a shunt to turn current into a voltage (050), and an
in-amp to lift that small voltage off its common mode and into the converter's range (060).

[[ask]] Would you build that chain again, or buy it as one part? Name one thing that would push you
each way.

[[pause]]

There is no single answer, so let us read the datasheet the same way we read the ADS1115's.

The INA226 puts most of yesterday's chain into one package. The shunt stays outside: you choose it.
Its inputs measure the voltage across the shunt as a difference, while both of them ride on a bus that
can sit anywhere from 0 to 36 V. That is the common-mode problem we met with the in-amp. Behind them
is a 16-bit converter, and behind that, registers you read over I²C.

One count of shunt voltage is 2.5 µV, and the full scale is about ±82 mV. Two amps through a 10 mΩ
shunt is 20 mV: eight thousand counts, all of it signal. Remember that pair of numbers: two amps,
ten milliohms.

Look at two more registers. One sets **averaging**, from 1 up to 1024 samples. Another is a
**calibration** register, so that the part can report current and power directly. Those are two jobs
our own firmware is going to do by hand later today.

What you gain by buying: board space, design time, and a channel specified as a whole. What you give
up: the choice of every stage, the bandwidth, and the ability to look inside each step. And there is a
new way to fail. Write the calibration register for a 10 mΩ shunt on a board fitted with 5 mΩ, and
every current reads exactly half: steadily, plausibly, and nothing complains.

[[transition]] Go back to the ADS1115's datasheet for a moment. It hands us a table that trades data
rate against noise, as if noise were simply a fact of life. Which raises the question we have
avoided all along: what *is* that noise, and where on the path does it come from?
```
