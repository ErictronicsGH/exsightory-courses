# INTERFACES, DATA DOMAINS, AND CONVERSIONS  -DOMAINS

## Introduction

Modern engineering systems are built by bringing different parts of the physical and technological world together.

A temperature exists in the physical world. A sensor responds to that temperature. The sensor may produce a small electrical signal. Another circuit may amplify and filter that signal. An analog-to-digital converter may then turn it into a digital number. A microcontroller processes that number, software interprets it, and eventually a display may show something such as **27.4 °C**.


## What is a data domain?

The word *domain* can have different meaning in different context but basically it refers to a jurisdiction within which something is valid. In mathematics, if refers to the set of values of an independent variable for which a function is valid. In physics it refers to a region where a particular physical property has a uniform characteristics.

A *data domain* is the environment or form in which information exists and is represented. An engineering system may involve several domains.

For example:

| Domain | Example |
|---|---|
| Physical domain | temperature, pressure, force, light |
| Mechanical domain | displacement, rotation, vibration |
| Analog electrical domain | voltage, current, resistance |
| Digital electrical domain | logic HIGH and LOW |
| Digital data domain | numbers, bits, bytes, words |
| Communication domain | packets, frames, protocols |
| Software/application domain | 27.4 °C, 101.3 kPa |

These domains are not necessarily rigid categories. They are a useful engineering way of thinking about how information changes form as it travels through a system.

Consider a temperature measurement:

**Temperature**

↓

**Resistance**

↓

**Voltage**

↓

**ADC code**

↓

**Binary data**

↓

**Software variable**

↓

**27.4 °C**

So in this case, you can see that the information about temperature has travelled through several domains. The underlying physical phenomenon has not necessarily changed, but the **way in which information about it is represented has changed**.

---

# 3. The sensor is an interface to the physical world
A sensor provides one of the first important interfaces in a measurement system. It allows an engineering system to obtain information about something happening in the physical world, an object, event or another system.

Conceptually:
**Physical quantity → sensor → usable signal**

A sensor may respond to a physical quantity by producing a related electrical quantity.

For example:

### Temperature → resistance
A thermistor changes resistance as temperature changes.

### Temperature → voltage
A thermocouple produces a small electrical voltage related to temperature.

### Pressure → electrical signal
A pressure sensor may produce a voltage or current related to pressure.

### Light → current
A photodiode produces electrical current in response to incident light.

### Motion → electrical signal
An accelerometer produces an electrical output related to acceleration. This process is generally called **transduction**.
It is important not to confuse transduction with ordinary unit conversion. A thermocouple is not simply performing:
**°C → volts**

in the same sense that we perform:
**metres → feet**.

Instead, the sensor responds to a physical phenomenon and produces another physical quantity whose behavior is related to the quantity being measured. That distinction becomes important when we later discuss conversions.
