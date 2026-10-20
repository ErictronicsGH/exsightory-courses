# 20. Calibration

Real measurement systems are never perfectly ideal.

A sensor may vary from its nominal characteristics.

An amplifier may have **offset and gain errors**.

A reference voltage may have some tolerance or drift.

An ADC may introduce its own errors.

Temperature can affect the behavior of components.

Even the relationships we use in our calculations may therefore differ from the behavior of the actual physical system.

For example, we may theoretically expect a sensor to produce a particular electrical output at a given temperature. In reality, the sensor may produce a slightly different value.

This means that a theoretical relationship such as:

**Temperature → Sensor output → ADC code**

may not exactly match what we observe in the real system.

## What is calibration?

**Calibration establishes or verifies the relationship between an instrument's indication and a known reference.**

For example, suppose we have built a temperature measurement system.

We can expose the system to a known reference temperature and compare the system's indication with that reference.

We might then repeat the process at several known temperatures.

For example:

| Reference temperature | System indication |
|---:|---:|
| 0 °C | 1.8 °C |
| 25 °C | 26.2 °C |
| 50 °C | 51.1 °C |
| 75 °C | 76.5 °C |

The differences between the reference values and the system's indications tell us something about how the actual system behaves.

We can then use this information to establish a more accurate relationship between the system's indication and the quantity being measured.

That relationship may subsequently be used by the measurement system to **compensate or correct its readings**.

For example, the system may determine that its readings consistently contain an offset, or that the error changes across the measurement range. The software or hardware can then apply an appropriate correction.

Calibration may therefore involve determining:

- **Offset errors**
- **Gain or sensitivity errors**
- **Nonlinearity**
- **Temperature-dependent behavior**
- **Other systematic measurement errors**

The exact calibration process depends on the instrument and the quantity being measured.

## Calibration is not simply “making the reading correct”

It is useful to distinguish **calibration** from **correction**.

Calibration establishes or verifies how the instrument behaves relative to a reference.

Correction uses that established information to compensate for the observed behavior.

In other words:

**Reference → Compare → Characterize error → Establish relationship → Apply correction, if required**

A calibrated system therefore does not necessarily mean that every error has magically disappeared. Rather, we have gained a better understanding of the relationship between the instrument's indication and the quantity being measured, and we can use that information to improve the measurement result.

## Different representations in the measurement chain

This is one reason we must distinguish between:

- **Raw signal**
- **Raw digital code**
- **Indication**
- **Corrected value**
- **Calibrated measurement result**

They are not necessarily interchangeable terms.

For example:

**Sensor output**

→ electrical signal

→ **ADC code: 3102**

→ **calculated indication: 72.4 °C**

→ **calibration correction**

→ **measurement result: 71.8 °C**

The exact sequence will depend on the measurement system, but the important idea is that the number coming directly from the ADC is not automatically the final measurement.

The ADC gives us a **digital representation of the electrical signal**.

The processing system then interprets that representation using the sensor characteristics, system configuration, scaling information, and calibration information to produce a meaningful measurement result.

Therefore:

> **Calibration helps establish how the real measurement system relates its indication to the quantity we are trying to measure.**

And this is another important part of the journey from:

**Physical quantity → Sensor → Electrical signal → Signal conditioning → ADC → Digital code → Processing → Measurement result**