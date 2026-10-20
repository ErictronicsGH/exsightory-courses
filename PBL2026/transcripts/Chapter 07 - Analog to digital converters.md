# Analog to Digital Converters

Conversion of data from the **analog domain to the digital domain** is handled by a class of electronic devices known as **Analog-to-Digital Converters (ADCs)**.

This is a very important step in a measurement system because the ADC provides the bridge that allows information represented as an analog signal to be represented as digital data, where it can be processed, stored, transmitted, displayed, or used for further decision-making.

The goal is to perform this conversion while introducing as little **loss, distortion, and error** as reasonably possible.

Before the signal is interfaced with the ADC, one of the things we need to ensure through **signal conditioning** is that the ADC does not significantly disturb the signal we are trying to measure. This is related to **loading**.

Every signal source has an **output impedance**. Impedance is the effective opposition a circuit presents to a changing electrical signal and can involve resistance, inductance, and capacitance. The ADC input also has its own input characteristics, including its input impedance.

If the interaction between the source and the ADC input causes the signal voltage to change significantly, the ADC will not be converting the signal we intended to measure. It will be converting a signal that has already been altered by the interface.

This is one reason **buffering** is often used before an ADC. A buffer can present a suitable load to the signal source while providing an output that can drive the ADC input without significantly disturbing the original signal.

## What an ADC actually does

At the simplest level, an ADC takes an analog voltage and produces a digital number that represents that voltage.

However, this conversion involves two important ideas:

**Sampling** and **quantization**.

### Sampling

The analog signal can change continuously with time. An ADC cannot normally record every instant of that continuous signal. Instead, it takes measurements at particular points in time.

The number of measurements taken per second is called the **sampling rate** or **sampling frequency**.

For example, an ADC with a sampling rate of **10 kS/s** takes 10,000 samples every second.

Sampling therefore answers the question:

> **“How often do we observe the analog signal?”**

The sampling rate is particularly important when the signal is changing rapidly. The ADC must sample frequently enough to represent the changes we are interested in. The consequences of sampling too slowly are discussed separately in the **Aliasing** chapter.

### Input bandwidth

Another important term is **bandwidth**.

When we say that a signal has a particular bandwidth, we are describing the range of frequencies that contain significant or useful information in that signal.

For example, imagine a sensor whose electrical output changes only slowly, from DC up to **1 kHz**. We can describe the useful signal bandwidth as approximately **1 kHz**.

The ADC itself also has an **input bandwidth**. This describes the range of frequencies over which its analog input circuitry can accept and process a signal with the required performance.

Bandwidth and sampling rate are therefore related, but they are **not the same thing**.

**Bandwidth tells us about the frequency content or how rapidly the signal can change.**

**Sampling rate tells us how frequently we take measurements of that signal.**

For example, an ADC may have an analog input path capable of handling frequencies much higher than the final sampling rate. This does not mean that those frequencies can necessarily be represented correctly in the digital output. The sampling rate must still be appropriate for the signal, and unwanted frequency components may need to be filtered before conversion.

This distinction becomes particularly important when we consider the frequency content of real-world signals. A signal may contain a useful low-frequency component together with unwanted high-frequency components or noise. We may therefore use filtering to control the frequency content presented to the ADC.

## Quantization

Sampling tells us **when** the ADC measures the signal. We now have another problem: **what value should we assign to the voltage that was measured?**

An analog voltage can theoretically have infinitely many possible values within its range.

For example, between 0 V and 1 V, the voltage could be:

**0.1 V, 0.1001 V, 0.10001 V, 0.100001 V...**

A digital system cannot represent an infinite number of possible voltage values. The ADC therefore divides its input range into a finite number of levels and assigns the measured voltage to the closest available digital level.

This process is called **quantization**.

So:

> **Sampling converts continuous time into discrete measurement points, while quantization converts the continuously varying amplitude into discrete levels.**

These two processes together are fundamental to how an ADC converts an analog signal into digital data.

### Resolution

The number of available quantization levels is determined primarily by the **resolution** of the ADC, normally specified in **bits**.

An **8-bit ADC** has:

**2⁸ = 256**

possible digital levels.

A **10-bit ADC** has:

**2¹⁰ = 1,024**

levels.

A **12-bit ADC** has:

**2¹² = 4,096**

levels.

And a **16-bit ADC** has:

**2¹⁶ = 65,536**

levels.

The higher the resolution, the more finely the ADC can represent differences in the input voltage.

However, more bits do not automatically mean more accurate measurements. Noise, reference-voltage accuracy, linearity, temperature effects, input circuitry, and other characteristics also affect the actual quality of the measurement.

### Reference voltage and input range

An ADC needs a reference against which it interprets the input voltage. This is commonly called the **reference voltage**, or **Vref**.

Suppose an ADC is configured to represent an input range from **0 V to 3.3 V**. Its available digital levels are distributed across that range.

A 10-bit ADC, for example, has 1,024 possible levels across its configured input range.

This means that the digital number produced by an ADC does not have a universal meaning by itself. To interpret it as a voltage, we need to know things such as the ADC's **resolution, reference voltage, input range, and configuration**.

And even after determining the voltage, we may still need information about the sensor, scaling, and calibration before we can interpret the result as an engineering quantity such as temperature, pressure, force, or light intensity.

## How the ADC performs the conversion

Different ADCs use different internal techniques to perform the conversion. Some of the most common architectures are:

### Successive Approximation Register — SAR

A **SAR ADC** essentially performs a controlled binary search.

It makes a comparison, decides whether the input is above or below a particular level, and then progressively narrows down the possible value until it determines the digital result.

SAR ADCs are widely used in microcontrollers and general-purpose data acquisition because they provide a useful combination of **speed, resolution, power efficiency, and relatively simple implementation**.

The ATmega328P and classic ESP32 are examples of microcontrollers using SAR ADCs.

### Flash ADC

A **flash ADC** uses many comparators operating in parallel to determine the input level very quickly.

Because many comparisons happen simultaneously, flash ADCs can be extremely fast. The disadvantage is that the number of comparators required grows rapidly as resolution increases.

Flash ADCs are therefore particularly useful where **very high speed** is more important than having very high resolution.

### Sigma-Delta (Σ-Δ) ADC

A **sigma-delta ADC** takes a different approach. It internally samples and processes the signal at a much higher rate than its final output data rate. It uses oversampling, noise shaping, and digital filtering to obtain high-resolution results.

This architecture is particularly attractive for **precision measurement and relatively low-bandwidth signals**, such as many sensor applications.

The ADS1115 is an example of a 16-bit sigma-delta ADC.

### Pipeline ADC

A **pipeline ADC** divides the conversion process into multiple stages, allowing different stages to work on different samples simultaneously.

This makes pipeline ADCs suitable for **high-speed data acquisition**, including applications such as imaging, communications, and high-speed instrumentation.

There are other ADC architectures, including **integrating or dual-slope ADCs**, but SAR, flash, sigma-delta, and pipeline architectures cover many of the ADCs encountered in modern electronic systems.

## Multiplexed inputs

Many ADCs have more than one analog input but do not necessarily contain a separate ADC for every input.

Instead, they may use an **analog multiplexer**, usually called a **MUX**.

A multiplexer is essentially an electronically controlled selector. It allows the ADC to choose **which input is connected to the conversion circuitry at a particular moment**.

Imagine we have four sensors:

```text
Sensor 1 ───┐
Sensor 2 ───┤
Sensor 3 ───┼──► Analog MUX ───► ADC ───► Digital data
Sensor 4 ───┘
```

The ADC can select Sensor 1, perform a conversion, then select Sensor 2, perform another conversion, and so on.

It is therefore more accurate to think of a four-channel multiplexed ADC as:

> **One conversion system that can be connected to four different inputs at different times.**

rather than:

> **Four ADCs converting four signals simultaneously.**

This distinction becomes important when considering **sampling rate**.

Suppose an ADC can perform 10,000 conversions per second and has four multiplexed inputs. If it shares those conversions equally among the four inputs, we cannot simply claim that each sensor is being sampled at 10,000 samples per second.

Instead, the available conversion time must be shared between the channels.

For example, an idealized arrangement might provide roughly:

**10,000 conversions/s ÷ 4 channels = 2,500 samples/s per channel**

The actual rate depends on how the ADC and software configure the multiplexer and whether every channel is sampled equally.

Some ADCs can also provide **differential inputs** through the multiplexer. Instead of measuring one input relative to ground, the ADC measures the voltage difference between two selected inputs.

This is particularly useful for small sensor signals and situations where the difference between two voltages is more important than either voltage relative to ground.

The ADS1115 is a good example: its input multiplexer can select **four single-ended inputs or two differential input pairs**.

## ADCs inside common devices

An important thing to understand is that an ADC does not have to be a separate component. Many microcontrollers already contain one.

### ATmega328P

The **ATmega328P**, used in the classic Arduino Uno, contains a **10-bit SAR ADC** with multiplexed analog inputs. Its ADC can achieve up to approximately **15 kSPS** under the specified conditions.

It provides selectable reference options, including AVCC and a nominal internal **1.1 V** reference, and includes a sample-and-hold circuit so that the input voltage is held while the conversion takes place.

This makes it very convenient for relatively slow measurements such as:

- potentiometers
- light sensors
- temperature sensors
- battery-voltage monitoring
- slowly changing analog signals

The ADC is already inside the microcontroller, so an external ADC is not required for many simple applications.

### ESP32

The **classic ESP32** contains two SAR ADC units with multiple multiplexed analog channels. Its raw ADC result is normally 12 bits, providing **4,096 levels**.

The ESP32 also provides configurable input attenuation, allowing the ADC to accommodate input voltages above its nominal internal reference range. It supports both **one-shot** and **continuous** conversion modes.

One particularly important practical consideration is that the classic ESP32's **ADC2 is shared with the Wi-Fi subsystem**, which can affect its availability when Wi-Fi is active. ADC1 is therefore often preferred when continuous analog measurement is required alongside Wi-Fi.

The ESP32 provides substantially more ADC capability than the basic ATmega328P, but its ADC is not automatically a precision instrument. Calibration and the actual characteristics of the ADC need to be considered when accurate voltage measurements are required.

### ADS1115

The **ADS1115** is an example of a dedicated external ADC. Unlike the ADCs built into the ATmega328P and ESP32, it is a separate integrated circuit that communicates with the microcontroller through **I²C**.

It provides **16-bit resolution** and a maximum data rate of **860 samples per second**. It has an input multiplexer that supports **four single-ended inputs or two differential inputs**, as well as a programmable gain amplifier (PGA).

This makes it particularly interesting for applications where the microcontroller's built-in ADC is not sufficient, especially when we need **higher resolution, differential measurement, or precision-oriented sensor measurement**.

## Comparing the three

We can therefore use these three devices to see how different ADC characteristics affect their usefulness:

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
| **Typical limitation** | Lower resolution and modest speed | ADC nonidealities/calibration and device-specific limitations | Much lower sampling rate |

The numbers alone tell an interesting story.

The **ADS1115 has the highest nominal resolution**, but it is also by far the slowest of these three. The **ATmega328P has the lowest resolution**, but its ADC is fast enough for many ordinary embedded measurements. The **ESP32 sits between them in nominal resolution while offering a much faster SAR-based acquisition system**.

So we should not simply ask:

> **“Which ADC has the most bits?”**

Instead, we should ask:

> **“What does my signal require?”**

Among the important ADC characteristics to consider are:

- **Resolution** — How finely can the input amplitude be represented?
- **Sampling rate** — How frequently can the signal be measured?
- **Bandwidth** — What frequency content can the analog input path handle?
- **Accuracy** — How close is the result to the actual input?
- **Linearity** — Does the ADC represent equal changes in input equally well across its range?
- **Noise** — How much unwanted variation is introduced or present in the conversion?
- **Reference accuracy and stability** — How reliable is the voltage against which the input is measured?
- **Input range** — What voltages can safely and usefully be measured?
- **Input impedance and loading** — How much does the ADC disturb the signal source?
- **Single-ended or differential input** — Is the signal measured relative to ground or as a difference between two inputs?
- **Gain/PGA** — Can small signals be amplified before conversion to make better use of the ADC's available levels?
- **Number of channels** — How many signals can the ADC accept?
- **Multiplexing** — Are those channels measured simultaneously or shared through one conversion path?
- **Conversion architecture** — SAR, sigma-delta, flash, pipeline, etc., each with different trade-offs.
- **Latency** — How long does it take before a measured input becomes available as digital data?
- **Power consumption** — Important for battery-powered systems.
- **Interface** — For an external ADC, how does the digital result reach the microcontroller?
- **Calibration requirements** — Does the ADC need correction to produce useful voltage measurements?
- **Operating environment** — Temperature range, supply variation, electromagnetic interference, and other conditions can affect performance.

This is why ADC selection is really a matter of **matching the converter to the signal and the measurement objective**.

### From analog signal to digital data

Putting the major ideas together:

**Analog signal**

↓

**Signal conditioning**

↓

**Sampling — deciding when to measure**

↓

**Quantization — deciding which discrete level represents each measurement**

↓

**Encoding — representing that level as a digital code**

↓

**Digital data**

The digital code produced by the ADC is still only a **representation of the electrical signal**.

To turn that representation into a meaningful engineering measurement, we may still need **scaling, calibration, conversion, and interpretation**.

This is why the ADC should be viewed as an important **bridge between the analog and digital domains**, rather than as the final stage of measurement.