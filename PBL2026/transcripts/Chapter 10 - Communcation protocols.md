# Protocols are part of interfaces

Consider two devices exchanging digital data.

The bits themselves are not enough.

Imagine that one device sends:

**10110110**

The receiving device needs to know what those bits mean and, more importantly, **how they are supposed to arrive**.

The devices therefore need to agree on things such as:

- **Who sends and who receives**
- **When data is valid**
- **When a transfer begins and ends**
- **How many bits are sent**
- **How the bits are arranged**
- **Which bit is sent first**
- **How devices are selected or addressed**
- **How the receiver knows where one piece of data ends and another begins**
- **How errors are detected, where applicable**

These rules form part of the **communication protocol**.

For example, an ADC may communicate with a microcontroller using **SPI**.

**ADC ⇄ Microcontroller**  
**Communication interface: SPI**

The ADC produces digital information, while SPI provides the signalling arrangement and communication rules used to transfer that information between the two devices.

For example, SPI commonly uses:

- **SCLK** — clock
- **MOSI** — data from the controller to the peripheral
- **MISO** — data from the peripheral to the controller
- **CS/SS** — chip select

It also defines communication details such as **clocking, timing, data sampling, and bit ordering**.

This is why SPI is commonly referred to as a **serial communication interface**, and is sometimes loosely called a **protocol**. The important distinction is that an **interface** describes how devices connect and exchange signals, while a **protocol** describes the rules governing that exchange.

## Choosing a communication interface

The fact that two devices can communicate digitally does not mean that every digital interface is suitable for the application.

As engineers, we choose an interface based on the requirements of the system.

Some of the questions we may need to ask include:

- **How much data needs to be transferred?**
- **How quickly does the data need to be transferred?**
- **How many devices need to communicate?**
- **How far apart are the devices?**
- **How many physical wires or pins can we afford to use?**
- **Does communication need to be one-way or two-way?**
- **Does the system need a shared clock?**
- **Does each device need to be individually addressed?**
- **How important is timing and latency?**
- **How much processing overhead can the microcontroller handle?**
- **How much power can the interface consume?**
- **How resistant must the communication be to electrical noise?**
- **Does the interface already exist on the devices we are connecting?**
- **What voltage levels and electrical characteristics are required?**

There is therefore no universally **“best”** digital interface.

The best interface is the one that satisfies the requirements of the particular system.

### For example: SPI versus I²C

Suppose we have an ADC that needs to send measurement data to a microcontroller.

We might choose **SPI** when we want relatively high-speed communication, predictable timing, and a simple high-throughput connection, and we can afford the additional signal lines.

We might choose **I²C** when we want to connect several devices using only two shared signal lines and the available data rate is sufficient for the application.

So the choice is not simply:

> **“Which interface is better?”**

It is:

> **“Which interface is better suited to what we are trying to achieve?”**

This is an important engineering principle.

## The interface has a cost

Communication interfaces are not free.

They consume some combination of:

- **Pins**
- **Wires**
- **PCB space**
- **Power**
- **Processing time**
- **Communication bandwidth**
- **Design complexity**

For example, a parallel interface may transfer many bits simultaneously and therefore provide high data throughput, but it may require many physical signal lines.

SPI can provide high-speed serial communication, but each peripheral may require its own chip-select line in a typical configuration.

I²C uses only two main signal lines and allows multiple devices to share the bus, but it has different speed, addressing, and electrical requirements.

UART can be very simple for point-to-point communication, but it does not provide the same shared-bus structure as I²C.

The engineer therefore has to balance **performance, complexity, cost, wiring, power, and system requirements**.

## Digital interfaces also have electrical requirements

Even when two devices use the same communication standard, we still need to verify that their electrical characteristics are compatible.

For example:

- **Logic voltage**
- **Input and output voltage thresholds**
- **Maximum clock frequency**
- **Output drive capability**
- **Pull-up requirements**
- **Input capacitance**
- **Signal rise and fall times**
- **Maximum cable or trace length**
- **Noise environment**

This is why a communication interface is both a **logical** and an **electrical** problem.

The devices must not only agree on **what the bits mean and when they are transferred**; the electrical signals carrying those bits must also be suitable for both devices.

## Communication speed is not the same as useful data rate

Another useful distinction is between the **signalling speed** of an interface and the amount of useful application data that can actually be transferred.

An interface may operate at a particular clock or symbol rate, but some of that communication may be used for:

- Addressing
- Commands
- Headers
- Start/stop conditions
- Framing
- Error checking
- Other protocol overhead

Therefore, the useful data rate available to the application may be lower than the raw signalling rate.

This becomes important when deciding whether an interface can keep up with an ADC.

For example, if an ADC is producing:

**10,000 samples/second**

and each sample requires:

**16 bits**

then the raw measurement data alone requires:

**10,000 × 16 = 160,000 bits/second**

or approximately:

**160 kbit/s**

But the actual communication requirement may be higher once protocol overhead and other transferred information are included.

The interface therefore needs sufficient capacity to move the data **without becoming the bottleneck**.

## The interface can become part of the measurement chain

This is particularly important in measurement systems.

We can now extend our measurement chain:

**Physical quantity → Sensor → Electrical signal → Signal conditioning → ADC → Digital data → Digital interface → Processor → Engineering value**

Each stage can affect the final result.

The ADC may accurately convert the signal, but if the communication interface is too slow, incorrectly configured, electrically incompatible, or unable to reliably transfer the data, the processor may still receive incorrect or incomplete information.

Therefore, the communication interface is not merely an afterthought after the ADC.

It is part of the **measurement system**.

This gives us another useful distinction:

> **The ADC determines how the analog signal becomes digital data.**  
> **The communication interface determines how that digital data is transferred to another device.**

And the choice of that interface is an engineering decision based on the requirements of the system.

Finally:

> **Digital does not automatically mean compatible.**

Two digital devices must agree on both the **electrical characteristics** and the **communication rules** required to exchange information reliably.