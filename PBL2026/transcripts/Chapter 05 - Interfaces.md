# INTERFACES, DATA DOMAINS, AND CONVERSIONS - INERFACES

# 4. What is an interface?
The conversion from say a physical quanty such as temperature to an equivalent signal or effect resistance occurs through a boundry or interaction. This boundary is refered to an an interface. Think of your computer. The computer is in it own world/domain but through the keyboard and mouse, you are able to interract with the computer and it also gives you response through its display, speakser etc. This is why we call application frontends as User Interface.

An **interface** is the boundary through which two systems, components, or domains interact.

A simple engineering definition is:
*An interface is the point at which two parts of a system meet and the means by which information, energy, or signals are transferred between them.*

Examples include:
- sensor ↔ signal conditioner
- signal conditioner ↔ ADC
- ADC ↔ microcontroller
- microcontroller ↔ display
- microcontroller ↔ motor controller
- sensor ↔ industrial controller
- controller ↔ CAN bus
- embedded system ↔ Ethernet network

An interface does not necessarily mean a physical connector. It can consist of:
- wires
- connectors
- amplifiers
- filters
- buffers
- level shifters
- isolation circuits
- ADCs
- DACs
- communication protocols
- timing signals
- software drivers
- data formats

Therefore, when an engineer asks:

"What is the interface between these two devices?" the question is really:
*How does information get from one side to the other, and what does each side expect?*

---

# 5. Interfaces exist because systems are not automatically compatible

Consider a sensor that produces: *0–100 mV* and an ADC whose useful input range is: *0–3.3 V*. Both devices deal with voltage. It might therefore appear that they can simply be connected. But they are not necessarily compatible.

The sensor's output may be too small to use the ADC's available range effectively. The sensor may also have an output impedance that is unsuitable for the ADC, or its signal may contain noise that should be filtered before conversion.
The interface may therefore require:
- amplification
- filtering
- buffering
- protection
- impedance management
- level shifting

This illustrates a fundamental engineering principle: *An interface makes two systems capable of working together.*
The interface must satisfy the requirements of both sides.

---

# 6. The analog domain

An analog signal represents information using a continuously varying physical quantity. For example, a voltage may vary over a range: *0 V → 0.1 V → 0.2 V → 0.21 V → 0.211 V → ...* Within the physical limits of the system, there can be continuously varying values.

Examples of analog signals include:
- thermocouple voltage
- microphone output
- sensor voltage
- amplifier output
- photodiode current
- audio signals

However, it is important to remember: *Analog does not mean accurate.* An analog signal can contain:
- noise
- interference
- distortion
- offset
- drift
- nonlinearities

An analog signal is simply information represented by a continuously varying physical quantity.

---

# 7. The digital domain

Digital systems represent information using discrete states or numerical codes. At the electrical level, a digital signal may be represented by logic states such as: *LOW / HIGH* or *0 / 1*. At a higher level, these bits can form:
- bytes
- integers
- words
- floating-point values
- sensor readings
- commands
- packets

This gives us an important distinction. A *digital signal* is an electrical representation of digital information. *Digital data* is the information represented using a digital encoding. For example, an ADC may produce a digital number. That number may then be transmitted across an SPI interface as a sequence of electrical signals. The electrical signals and the data they represent are related, but they are not the same thing.
