# INTERFACES, DATA DOMAINS, AND CONVERSIONS - CONVERSION

## The ADC: crossing from analog to digital
One an interface is created between two domains, the next step will be to convert data/signals between the domains. Mostly this would likely be a unidirectional process depending on the type of device. 

One of the most important converters in a modern measurement system is the **analog-to-digital converter**, or ADC. Its basic purpose is: *To represent an analog signal as digital data.* For example: *2.17 V* may be represented by a digital code such as: *2714* depending on the ADC's configuration, reference, resolution, and input range. The ADC therefore provides a bridge between the analog and digital domains.

Conceptually:
*Analog signal → ADC → digital representation*
However, an ADC does not simply "turn voltage into binary. Two fundamental processes are involved:
1. *sampling*
2. *quantization*

---

# 9. Sampling
An analog signal can vary continuously with time. An ADC does not normally observe every possible instant. Instead, it takes measurements at particular points in time.

Conceptually:

```text
Analog signal

        /\
       /  \        /\
______/    \______/  \____

       ↑ ↑ ↑ ↑ ↑
       sample points
```

The process of observing the signal at discrete points in time is called *sampling*. The number of samples taken per second is the *sampling rate*. For example: 1,000 samples per second = 1 kS/s

Sampling rate matters because a rapidly changing signal requires sufficiently frequent observations to represent its behavior. This is why sampling is a fundamental consideration in data acquisition and digital signal processing.

---

# 10. Quantization

Sampling deals with time. Quantization deals with amplitude. An ADC has a finite number of output codes.
For example:
- 8-bit ADC → 256 possible codes
- 10-bit ADC → 1,024 possible codes
- 12-bit ADC → 4,096 possible codes
- 16-bit ADC → 65,536 possible codes

Therefore, the ADC cannot represent an unlimited number of possible voltage levels. It assigns the measured signal to one of its available digital levels. That process is called **quantization**. That is the process of constraining a continous set of values to a discrete set. A useful mental model is:

InsightTag:
Sampling divides time into observation points.  
Quantization divides amplitude into representable levels.


---

# 11. The ADC does not know what the measurement means

One thing to understand is that the ADC itself has no idea what the data it receives and output means. Think of a driver who drives passengers from one town to another. He doesnt have to know why each passenger is travelling. His business is to move them from town Kumasi say Accra.

Suppose an ADC gives a microcontroller: 2048
Does that mean: 2048 °C?
Of course not. The ADC does not inherently know about Celsius. The ADC knows about its electrical input and its conversion configuration. Just like the driver, he is only concerned about driving the car safely from kumasi to Accra.

The number must be interpreted using information about the rest of the signal chain. For example:

**Temperature**

↓

**Temperature sensor**

↓

**1.65 V**

↓

**ADC**

↓

**2048**

↓

**software**

↓

**25 °C**

The ADC has performed its job when it produced the digital representation of the electrical input. To determine that this representation corresponds to  25 °C  requires additional knowledge about:

- the sensor
- the signal conditioning
- the ADC reference
- the ADC configuration
- calibration
- scaling
- the sensor's characteristics

This is why A raw digital value is not automatically an engineering value.
