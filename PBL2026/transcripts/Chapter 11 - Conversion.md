# Conversion is a broader concept

Now that we have successfully brought the data to the microcontroller, we have the ability to perform computations on that data and relate the digital representation to the physical quantity we are actually interested in.

This is where another important concept appears: **conversion**.

The word **conversion** is used in engineering in several different ways.

It is therefore important not to assume that every “conversion” means the same thing.

Consider the following.

### Physical transduction

**Temperature → resistance**

A sensor establishes a relationship between different physical quantities.

For example, a thermistor changes its electrical resistance as its temperature changes.

This is fundamentally different from simply changing the way a number is represented. The sensor is providing a physical mechanism through which information about one quantity is represented by another.

### Signal conditioning

**5 mV → 2 V**

The signal remains in the analog domain, but its electrical characteristics have been changed to make it more suitable for another stage.

For example, an amplifier may increase a 5 mV sensor signal to 2 V so that it can make better use of the available ADC input range.

This is not a conversion from analog to digital. It is a transformation of an analog signal.

### Analog-to-digital conversion

**2.0 V → digital code**

Here, the representation crosses from the analog domain into the digital domain.

The ADC measures the analog voltage and represents that measurement using a digital code.

### Digital-to-analog conversion

**Digital code → voltage**

A DAC takes digital information and produces an analog representation of that information, such as a voltage or current.

### Unit conversion

**25 °C → 77 °F**

The physical quantity remains the same.

Only the unit used to express the quantity has changed.

The temperature has not changed from 25 °C to something physically different. We have simply expressed the same temperature using another unit.

### Scaling

**ADC count → volts**

A numerical representation is converted into another numerical representation using a known relationship.

For example, an ADC code can be mapped to the corresponding input voltage based on the ADC's reference voltage, resolution, and configuration.

### Calibration

**Raw indication → corrected measurement result**

Calibration establishes or uses a known relationship between an instrument's indication and a reference or accepted measurement standard.

For example, if a temperature measurement system consistently reads 2 °C higher than a known reference, that relationship can be used to correct its measurement.

Calibration is therefore not simply another mathematical conversion. It is about establishing how the system's indication relates to the quantity being measured.

### Encoding

**Number → binary representation**

Information is represented according to a particular coding scheme.

For example, the number 25 can be represented digitally as:

**11001**

The numerical value has not changed. Its representation has.

### Protocol conversion

**UART ↔ CAN**

Information can also be transferred from one communication representation or protocol to another.

For example, a gateway may receive information through UART and transmit equivalent information through a CAN network.

The information itself may remain conceptually the same while the way it is communicated changes.

---

These are all described as forms of **conversion** in different engineering contexts, but they are conceptually different processes.

This gives us an important lesson:

> **The word “conversion” tells us that something is being transformed or represented differently, but we must ask what exactly is being converted.**

Are we changing:

- a physical quantity into another physical representation?
- an analog signal into a digital representation?
- one numerical representation into another?
- one unit into another?
- one communication representation into another?
- or an indication into a calibrated measurement result?

The context tells us what kind of conversion is actually taking place.

---

# 18. Unit conversion is not the same as ADC conversion

This distinction deserves special attention.

Consider:

**10 m → 1,000 cm**

The physical quantity is still **length**.

Only the unit used to express it has changed.

Now consider:

**2.5 V → ADC code 3102**

That is different.

The analog voltage has been **measured and represented digitally**.

Now consider:

**Temperature → thermistor resistance**

That is different again.

The sensor establishes a relationship in which temperature is represented by electrical resistance.

Therefore:

> **Not every conversion is a unit conversion.**

And:

> **Not every change in representation is a change in the physical quantity itself.**

This distinction becomes particularly important in measurement systems because the same word — **conversion** — can describe several different stages of the measurement chain.

---

# 19. Scaling and engineering units

Suppose an ADC produces values from:

**0 to 4095**

but the application needs to display:

**0 to 100 °C**

The ADC does not directly produce degrees Celsius.

It produces a **digital code** corresponding to the electrical signal presented to its input.

The software therefore needs to know how the sensor, signal conditioning, ADC reference, ADC resolution, and other relevant system characteristics relate that digital code to the physical quantity.

Conceptually:

**ADC code**

↓

**Electrical quantity**

↓

**Sensor relationship**

↓

**Physical quantity**

↓

**Engineering unit (°C)**

For a simple linear system, this relationship may be represented by a mathematical scaling equation.

For a nonlinear sensor, however, the relationship may require a more complex equation, lookup table, polynomial, compensation algorithm, or calibration data.

This process of relating a numerical representation to the quantity and units required by the application is often referred to as **scaling** or **engineering-unit conversion**.

The important lesson is:

> **The raw number produced by an electronic system is not necessarily the quantity the engineer or user actually wants.**

A value such as:

**3102**

has little meaning by itself.

We need to know **what produced it, how it was measured, what reference and scaling were used, and how the sensor relates the electrical signal to the physical quantity**.

Only then can we turn the raw digital representation into something meaningful, such as:

**72.4 °C**

And this brings us back to the larger measurement chain:

**Physical quantity → Sensor → Electrical signal → Signal conditioning → ADC → Digital data → Processing → Engineering value**

The ADC gives us the **digital representation**.

The processing that follows allows us to turn that representation into the **meaningful engineering value** we actually want.