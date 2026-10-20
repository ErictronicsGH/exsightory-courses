# 15. Digital interfaces are still interfaces

Once an ADC has produced digital data, that data still needs to reach the processor or whatever system is going to use it.

For example:

**ADC → microcontroller**

may communicate through interfaces such as:

- **SPI**
- **I²C**
- **parallel digital interfaces**
- **UART or other serial interfaces**
- **device-specific interfaces**

It is tempting to think:

> **“They are both digital, so they are compatible.”**

But being digital does not automatically make two devices compatible.

Think about it this way: the ADC has converted the analog signal into a sequence of digital values, but those values still need a **language and a physical way of travelling** from one device to another.

Two devices may both use digital signals and still disagree about:

- **Voltage levels** — for example, 5 V logic versus 3.3 V logic
- **Timing** — when data should be sampled or considered valid
- **Clocking** — whether a shared clock is used and how it is interpreted
- **Bit order** — whether the most significant bit or least significant bit is sent first
- **Word size** — whether the data is transferred as 8-bit, 12-bit, 16-bit, 24-bit words, etc.
- **Protocol** — the rules governing how the devices communicate
- **Framing** — how the beginning and end of a data transmission are identified
- **Communication direction** — whether communication is one-way, two-way, or bidirectional
- **Electrical characteristics** — such as drive capability, pull-up requirements, impedance, and signal integrity

For example, an ADC may produce a **16-bit digital result**, but that does not tell us how the 16 bits will reach the microcontroller.

The ADC might send those bits using **SPI**, where a clock and data lines coordinate the transfer. Another device might use **I²C**, where devices communicate using a different signalling and addressing scheme.

Even if both devices use 3.3 V logic, an SPI device cannot simply be connected to an I²C interface and expected to communicate. The voltage may be compatible, but the **communication protocol is different**.

Likewise, two devices may use the same protocol but operate at different electrical levels. In that case, we may need **level shifting** before connecting them.

This brings us back to an important idea from signal conditioning:

> **An interface is not only about what information is being represented. It is also about how that information is physically and logically transferred.**

So the measurement chain does not end when the ADC produces a digital number.

We can think of the complete path as:

**Physical quantity → Sensor → Electrical signal → Signal conditioning → ADC → Digital data → Digital interface → Processor → Engineering value**

The ADC solves the problem of converting the signal from the **analog domain into the digital domain**.

The digital interface then solves another problem:

> **How do we reliably move that digital information from one device to another?**

Therefore:

> **Digital does not automatically mean compatible.**

Digital interfaces still have **electrical, timing, and communication requirements** that must be satisfied before two digital devices can communicate correctly.