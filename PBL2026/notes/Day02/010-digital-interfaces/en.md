---
targetMinutes: 30
motivates: The ADC has produced its code, but the code is still inside the converter — and "they are both digital" turns out not to be enough to get it across.
objectives:
  - Explain why two digital devices are not automatically compatible, naming the electrical and logical things they must agree on.
  - Explain why an open-drain output needs a pull-up, and choose the pull-up value as a trade between edge rate and drive current.
  - Say why wired-AND makes a shared I²C bus work, and choose between SPI and I²C for a given system.
concepts: [digital-interface, open-drain, i2c]
---

# The code leaves the converter: open-drain, pull-ups and I²C

<!-- PATH: [ QUANTITY → SENSOR → SOURCE & LOADING → CONDITIONING → ADC INPUT → CONVERSION → REFERENCE
           → **DIGITAL INTERFACE** → FIRMWARE → NUMBER ]  — the code leaves the converter.
     TOOL: Plot (centrepiece: bus rise time against pull-up and bus capacitance) · Electronics (new fixtures
           `level-shift` and `open-drain-bus` from existing parts) · Draw (the path's digital-interface leg;
           wired-AND) · Figure (nine-point checklist, SPI, I²C byte with ACK).
     SOURCES: transcripts/Chapter 05 - Interfaces.md §7; Chapter 08 - Digital Interface.md;
              Chapter 03 - Signal conditioning.md "Level shifting"; Chapter 10 - Communcation protocols.md
              (opening, "Choosing a communication interface", "The interface has a cost", "Digital interfaces
              also have electrical requirements"); training-overview.md Day 3 Module 1. -->

## The code has to travel

Once an ADC has produced digital data, that data still has to reach the processor. A digital
signal is the electrical representation; digital data is the information it carries. They are
related, but they are not the same thing.

<!-- PLAN
SHOW     Draw — the course path drawing from D1·010, with the code's own leg added: ADC → Digital data →
         DIGITAL INTERFACE → Processor → Engineering value. Drive: retrace the Day 1 stages quickly (the room
         knows them), stop on the ADC with nothing after it, then draw the new leg one box at a time and
         light DIGITAL INTERFACE amber. Look for: the code sitting at the ADC with a gap after it; the path
         is not finished when the converter is.
         Status: needs Draw: the D1·010 path drawing with three more steps (digital data, interface, processor)
-->

```flow
Yesterday we walked the path from the quantity all the way to the converter's reference. By the end
of Day 1 the ADC had produced a code, and we knew what that code was a ratio to. So the code exists.
But it is still sitting inside the converter.

Once an ADC has produced digital data, that data still needs to reach the processor or whatever
system is going to use it. For example, when the ADC is a separate chip, **ADC → microcontroller** may
communicate through interfaces such as:

- **SPI**
- **I²C**
- **parallel digital interfaces**
- **UART or other serial interfaces**
- **device-specific interfaces**

Digital systems represent information using discrete states or numerical codes. At the electrical
level, a digital signal may be represented by logic states such as *LOW / HIGH* or *0 / 1*. At a
higher level, these bits can form bytes, integers, words, floating-point values, sensor readings,
commands and packets.

This gives us an important distinction. A *digital signal* is an electrical representation of
digital information. *Digital data* is the information represented using a digital encoding. For
example, an ADC may produce a digital number. That number may then be transmitted across an SPI
interface as a sequence of electrical signals. The electrical signals and the data they represent are
related, but they are not the same thing.

So the measurement chain does not end when the ADC produces a digital number. We can think of the
complete path as:

**Physical quantity → Sensor → Electrical signal → Signal conditioning → ADC → Digital data → Digital
interface → Processor → Engineering value**

The ADC solves the problem of converting the signal from the **analog domain into the digital
domain**. The digital interface then solves another problem: **how do we reliably move that digital
information from one device to another?**
```

***

## Both digital — so compatible?

Digital does not automatically mean compatible. Two digital devices can still disagree about
voltage levels, timing, clocking, bit order, word size, protocol, framing, direction and electrical
characteristics.

<!-- PLAN
SHOW     Figure — two chips facing each other, nine labelled lines between them: voltage levels, timing,
         clocking, bit order, word size, protocol, framing, direction, electrical characteristics.
         Drive: after the poll, light "3.3 V logic" teal (the one they agree on), then the other eight amber,
         one per Flow bullet. Look for: one agreement and eight open questions.
         Status: needs asset: nine-point checklist SVG (ours to draw)
ASK      poll (before the statement) — "An ADC and a microcontroller both run on 3.3 V logic. Wire them
         together: will they talk?"
         options: Yes, same logic level | Only if they share a protocol | Only if protocol, timing and
         electrical needs all match | Can't tell yet
         explain: The poll records what the room assumes; the nine lines on the Figure are what the
         assumption has to survive.
         depth: understand    practice: asking questions
-->

```flow
[[ask]] Suppose an ADC and a microcontroller both run on 3.3 V logic. Can you simply wire them
together and expect them to talk?

[[pause]]

It is tempting to think: *"They are both digital, so they are compatible."* But being digital does
not automatically make two devices compatible.

Think about it this way: the ADC has converted the analog signal into a sequence of digital values,
but those values still need a **language and a physical way of travelling** from one device to
another.

Two devices may both use digital signals and still disagree about:

- **Voltage levels** — for example, 5 V logic versus 3.3 V logic
- **Timing** — when data should be sampled or considered valid
- **Clocking** — whether a shared clock is used and how it is interpreted
- **Bit order** — whether the most significant bit or least significant bit is sent first
- **Word size** — whether the data is transferred as 8-bit, 12-bit, 16-bit, 24-bit words, etc.
- **Protocol** — the rules governing how the devices communicate
- **Framing** — how the beginning and end of a data transmission are identified
- **Communication direction** — whether communication is one-way, two-way on separate lines, or two-way
  on one shared line
- **Electrical characteristics** — such as drive capability, pull-up requirements, impedance, and
  signal integrity

For example, an ADC may produce a **16-bit digital result**, but that does not tell us how the 16
bits will reach the microcontroller. The ADC might send those bits using **SPI**, where a clock and
data lines coordinate the transfer. Another device might use **I²C**, where devices communicate using
a different signalling and addressing scheme.

Even if both devices use 3.3 V logic, an SPI device cannot simply be connected to an I²C interface
and expected to communicate. The voltage may be compatible, but the **communication protocol is
different**.

This brings us back to an important idea from signal conditioning: **an interface is not only about
what information is being represented. It is also about how that information is physically and
logically transferred.**

Therefore: **digital does not automatically mean compatible.** Digital interfaces still have
**electrical, timing and communication requirements** that must be satisfied before two digital
devices can communicate correctly.
```

***

## Level shifting: 5 V logic into a 3.3 V pin

A 5 V digital output wired straight to a 3.3 V microcontroller's GPIO may damage the input. The signal has to be
shifted to the 3.3 V logic level first, with resistors, diodes, transistors or a level-shifter IC.

<!-- PLAN
SHOW     Electronics — new fixture `level-shift`: a 5 V supply V1 behind R1 (47 Ω, the module output's own
         resistance) wired to the GPIO, modelled as a 1N4148 clamp diode D1 from the pin to a 3.3 V rail V2 (carrying the MCU's own load, so the clamp
         current has somewhere to go);
         a DMM on the pin; current overlay on. Drive: (1) direct connection: watch D1 and V2 carry current;
         (2) insert the divider R2 10 kΩ over R3 20 kΩ: the clamp current falls to nothing, the pin sits at
         3.33 V. Look for: direct: the pin at about 4.0 V, a diode-drop above its own rail, and about 21 mA
         into it; with the divider, 3.33 V and almost nothing. The meter shows the pin above its rail; the
         current overlay shows the harm.
         Status: ready (fixture from existing parts: supply-bench ×2, resistor-typical, diode-1n4148,
                 dmm-budget) · ideal: needs Electronics: logic-input part with clamp diodes and an
                 injection-current limit
ASK      poe (before the statement) — "A 5 V output is wired straight to a 3.3 V GPIO. Where does the extra
         1.7 V go?"
         options: The pin just reads HIGH | The input's clamp diode conducts and current flows into the 3.3 V
         rail | The 5 V output sags to 3.3 V by itself | Nothing flows: inputs are high impedance
         answer: The input's clamp diode conducts and current flows into the 3.3 V rail
         reveal: current overlay through D1 into V2, then the divider inserted
         explain: A CMOS input is high impedance only between its rails; above the rail its protection diode
         conducts, and about (5 − 3.3 − 0.7) V across 47 Ω pushes some 21 mA into the pin and the 3.3 V rail.
         depth: understand    practice: constructing explanations
FAULT    The divider's resistors swapped (20 kΩ over 10 kΩ): the pin sits at about 1.66 V, inside the band between
         V_IL and V_IH, and reads HIGH, LOW or both.
-->

```flow
Two devices may use the same protocol but operate at different electrical levels. In that case, we
may need **level shifting** before connecting them. Level shifting moves a signal to a different
operating range.

For instance, moving a digital signal from a **5 V logic range** to a **3.3 V logic range**. Imagine
you are using a sensor with a digital output that is already mounted on a module and operates at
**5 V**. Unfortunately, we want to connect its output to a **3.3 V microcontroller**, whose GPIOs
operate at **3.3 V** and are not designed to tolerate a 5 V signal.

If we connect the sensor output directly to the microcontroller's digital pin, the voltage may be too high and
could damage the input. We therefore need to shift the sensor's output from the **5 V logic level to
the 3.3 V logic level** before connecting it to the microcontroller.

We can achieve this using discrete components such as **resistors, diodes or transistors**, or by
using an integrated **level-shifter IC** designed for this purpose.
```

***

## An interface is not a protocol

The bits alone are not enough. An interface describes how devices connect and exchange signals; a
protocol is the set of rules governing that exchange: who sends, when data is valid, where a
transfer begins and ends, and which bit comes first.

<!-- PLAN
SHOW     Figure — SPI between ADC and MCU: SCLK, MOSI, MISO, CS/SS, with a timing strip of 10110110 on MISO
         against SCLK. Drive: tour CS → SCLK → MISO; then relabel the same strip read MSB-first (182) and
         LSB-first (109). Look for: one set of wires, one set of edges, two different numbers.
         Status: needs asset: SPI connection and timing SVG (ours to draw)
ASK      multi-select (before the statement) — "One device sends 10110110. Which of these must the receiver
         know before those bits mean anything?"
         options: Which bit comes first | When each bit is valid (the clock edge) | Where the transfer starts
         and ends | The logic voltage levels | Whether the sender's ADC is SAR or sigma-delta
         answer: Which bit comes first | When each bit is valid | Where the transfer starts and ends | The
         logic voltage levels
         reveal: the Figure's two readings of the same strip
         explain: Read MSB-first the byte is 182 and LSB-first it is 109, while the converter's architecture
         changes nothing about how the bits travel.
         depth: understand    practice: asking questions
-->

```flow
Consider two devices exchanging digital data. Imagine that one device sends:

**10110110**

[[ask]] What does the receiving device need to know before those eight bits mean anything at all?

[[pause]]

The bits themselves are not enough. The receiving device needs to know what those bits mean and,
more importantly, **how they are supposed to arrive**. The devices therefore need to agree on things
such as:

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

For example, an ADC may communicate with a microcontroller using **SPI**. The ADC produces digital
information, while SPI provides the signalling arrangement and communication rules used to transfer
that information between the two devices. SPI commonly uses:

- **SCLK** — clock
- **MOSI** — data from the controller to the peripheral
- **MISO** — data from the peripheral to the controller
- **CS/SS** — chip select

It also involves communication details such as **clocking, timing, data sampling and bit ordering**,
which both devices must set the same way.

This is why SPI is commonly referred to as a **serial communication interface**, and is sometimes
loosely called a **protocol**. The important distinction is that an **interface** describes how
devices connect and exchange signals, while a **protocol** describes the rules governing that
exchange.
```

***

## What does a floating input read?

A floating input is undefined, not low. An input pin must be pulled to a known level.

<!-- PLAN
SHOW     Electronics — a logic input (the pin node) with nothing driving it and a DMM on it; then R1 10 kΩ to
         3.3 V as a pull-up; then R1 moved to ground as a pull-down. Drive: floating → pull-up → pull-down.
         Look for: the floating node has no source at all; the DMM reads 0 V on it only because the meter's
         own input resistance is the one thing connecting it to anything (Day 1's insertion error). Swap in
         another 10 MΩ meter and it still reads 0 V: the meter is the pull-down.
         Status: needs Electronics: logic-input part (V_IL/V_IH bands, leakage, an "undefined" state for a
                 node with no DC path) · today the DMM-only version runs on existing parts
ASK      poe (before the statement) — "Nothing is driving this pin. What level does it read?"
         options: LOW, 0 V | HIGH | Undefined: it can read either, and change | Exactly half the supply
         answer: Undefined: it can read either, and change
         reveal: the logic-input part shows the undefined band; the pull-up, then the pull-down, settle it
         explain: A CMOS input draws almost no current, so with no source connected nothing sets its voltage;
         leakage, stray charge, a finger nearby, or the meter you connect, decide it instead.
         depth: understand    practice: constructing explanations
FAULT    A button input with its pull-up left off: reads HIGH on the bench every time, and at random in the
         field.
-->

<!-- FILLED 2026-10-07: drafted from training-overview Day 3 Module 1; tutor to review -->

```flow
[[demo]] Animation Bench — a logic input with nothing connected to it.

[[ask]] Nothing is driving this pin. What level does it read: high, low, or something else?

[[pause]]

[[reveal]] It reads neither, reliably. With nothing connected, nothing holds the pin at any level: it
may sit between a guaranteed low and a guaranteed high, or drift to either, and it can change while you
watch.

A CMOS input draws almost no current. So with no source connected, nothing sets its voltage. Leakage,
stray charge, even your finger near the pin will decide it, and it can change while you watch.

Here is the trap. Put a multimeter on that pin and it reads 0 V, quite steadily. Why? Because the
meter's own input resistance is now the only thing connecting the pin to anything. The meter has
become the pull-down. That is Day 1's insertion error, in a digital costume.

[[demo]] Now add a pull-up resistor to 3.3 V. The pin goes high and stays there. Move the resistor to
ground as a pull-down, and the pin goes low and stays there.

So: **a floating input is undefined, not low.** An input pin must be driven, or pulled to a known
level. On Day 1 we would have said it this way: a node with no source has no defined voltage.
```

***

## Open-drain: pull low or let go

An open-drain output can only pull the line low or let it go, which is exactly why it needs a
pull-up. It is the digital face of Day 1's impedance argument.

<!-- PLAN
SHOW     Electronics — new fixture `open-drain-bus`: an N-MOSFET M1 (mosfet-typical) as the open-drain
         output, drain to the bus node, source to ground, gate from a second supply V2 (0 V or 5 V) standing
         in for the chip's internal driver; a DMM on the bus; pull-up R1 4.7 kΩ to 3.3 V added last.
         Drive: V2 = 5 V (bus near 0 V) → V2 = 0 V with no R1 (nothing defines the bus) → add R1 (bus rises to
         3.3 V) → V2 = 5 V again with the current overlay: 0.7 mA through R1 into M1.
         Look for: the transistor can only sink; the HIGH comes from R1 and nowhere else.
         Status: ready (fixture from existing parts; the floating state shows as the meter's 0 V until the
                 logic-input part exists)
ASK      poe (before the pull-up is added) — "The output transistor has let go. What decides the voltage on
         the line now?"
         options: The transistor's off-state voltage | Nothing yet: it floats until something pulls it | The
         receiver's input | The supply, directly
         answer: Nothing yet: it floats until something pulls it
         reveal: V2 to 0 V with no R1, then R1 added and the bus rising
         explain: An off transistor is an open switch with no voltage of its own, so the pull-up is the only
         source of the HIGH level and its resistance is that level's output impedance.
         depth: understand    practice: developing models
HARVEST  S14 — "Yesterday: high in, low out; impedance decides who disturbs whom. Here is the same argument
         in a digital costume. The pull-up is the source impedance of the HIGH, and every input and every
         centimetre of wire on the bus is its load."
ANALOGY  A door on a spring: anyone holding it can pull it shut (LOW), and the spring opens it only when
         everyone lets go (HIGH). A stiffer spring opens it faster and is harder to hold shut, which is the
         pull-up trade. It breaks on the open: a door has no capacitance, and a bus edge is an RC charge, not
         a swing.
-->

<!-- FILLED 2026-10-07: drafted from training-overview Day 3 Module 1; tutor to review -->

```flow
[[demo]] Animation Bench — an open-drain output, first with no pull-up.

[[ask]] The output transistor has let go. What decides the voltage on the line now?

[[pause]]

[[reveal]] Nothing does. The transistor is either on, connecting the line to ground, or off: an open
switch with no voltage of its own. When it lets go, the line floats, exactly like the input we just
met.

[[demo]] Now add a pull-up resistor from the line to 3.3 V. Transistor off: the line rises to 3.3 V.
Transistor on: it pulls the line down, and a small current, about 0.7 mA through 4.7 kΩ, flows
through the pull-up into the transistor.

So an **open-drain output can only pull low or let go**, and that is exactly why it needs the pull-up.
The high level does not come from the output at all. It comes from the resistor.

Now remember Day 1: high in, low out. Every source has an output impedance, and it decides how much
its load disturbs it. Here the pull-up *is* the source impedance of the high level, and every input
and every centimetre of wire on the bus is its load. It is Day 1's impedance argument, in digital
clothes.
```

***

## Choosing the pull-up value

The pull-up's value is a real trade between edge rate and drive current. There is no value that
wins both.

<!-- PLAN
SHOW (centrepiece) Plot — the bus voltage after release, v = 3.3·(1 − 0.7·exp(−t/(R·C))), t in ns from the
         30 % crossing (I²C times the rise from 30 % to 70 %); sliders R
         (0.5–20 kΩ) and C (50–400 pF); horizontal markers at 0.3 and 0.7 of 3.3 V (I²C's rise-time
         thresholds); vertical markers at 300 ns (Fast-mode limit) and 1000 ns (Standard-mode limit).
         In the same frame, the sink current (3.3 V − 0.4 V)/R as a column against the 3 mA Fast-mode limit;
         then, after the numeric, an Equation: sink current = (3.3 V − 0.4 V)/R, with the 3 mA limit marked.
         Drive: C = 200 pF throughout; R = 10 kΩ (30→70 % takes 1.69 µs, misses both limits) → 4.7 kΩ
         (0.80 µs, meets Standard, misses Fast) → 1.5 kΩ (254 ns, meets Fast, sinks 1.9 mA) → 820 Ω (139 ns,
         but sinks 3.5 mA, past what a Fast-mode output must guarantee).
         Look for: the edge and the current moving in opposite directions under one slider.
         Status: ready · on-circuit edges need Electronics: transient solve with bus capacitance
ASK      poe (before the statement) — "Make the pull-up ten times smaller. What happens to the rising edge,
         and to the current the output must sink?"
         options: Edge 10× faster, sink current 10× larger | Edge faster, current unchanged | Edge
         unchanged, current larger | Edge slower, current smaller
         answer: Edge 10× faster, sink current 10× larger
         reveal: R divided by ten on the Plot; the sink column ten times taller
         explain: The rise time is set by R·C and the low-level current by (3.3 − V_OL)/R, so one resistor
         sets both, in opposite directions.
         depth: understand    practice: developing models
ASK      numeric (after the statement) — "A Fast-mode bus must rise from 30 % to 70 % in 300 ns. It has
         200 pF of capacitance at 3.3 V. What is the largest pull-up that still meets the rise time?"
         answer: 1.77 kΩ ± 0.1 kΩ
         reveal: R slider set to 1.77 kΩ: the 70 % crossing lands on the 300 ns marker
         explain: 30 %→70 % takes R·C·ln(0.7/0.3) ≈ 0.847·R·C, so R ≤ 300 ns / (0.847 × 200 pF) ≈ 1.77 kΩ,
         and the 3 mA sink limit sets the floor at (3.3 − 0.4) V / 3 mA ≈ 0.97 kΩ: a window of about
         1.0–1.8 kΩ.
         depth: create    practice: designing solutions
FAULT    A 10 kΩ pull-up carried over from a 100 kHz design onto a 400 kHz bus: the edge has not reached
         0.7·VDD when the clock samples, and the bus fails only sometimes.
-->

<!-- FILLED 2026-10-07: drafted from training-overview Day 3 Module 1; I²C rise-time and sink-current limits as commonly specified (Standard mode 1000 ns, Fast mode 300 ns, 3 mA at 0.4 V); tutor to review -->

```flow
[[ask]] Make the pull-up ten times smaller. What happens to the rising edge? And what happens to the
current the output has to sink when it pulls the line low?

[[pause]]
```

```flow
[[demo]] Plot Bench — sweep the pull-up value and watch the edge and the current together.

[[reveal]] Both change, and in opposite directions.

When the output lets go, the line does not jump to 3.3 V. The bus has capacitance, from every input on
it and from the wiring itself, and the pull-up has to charge it. That is an RC charge, the same
exponential we met at the ADC's sampling capacitor yesterday. Make the resistor ten times smaller and
the edge is ten times faster.

But when the output pulls low, it has to sink the current through that same resistor: 3.3 V minus the
0.4 V low level, divided by R. Ten times smaller, ten times more current.

Let us put numbers on it. I²C measures the rise from 30 % to 70 % of the supply, which takes about
0.85 × R × C. Fast mode, at 400 kHz, allows 300 ns, and its outputs only have to be able to sink 3 mA.
```

```flow
[[ask]] With 200 pF of bus capacitance at 3.3 V, what is the largest pull-up that still meets 300 ns?

[[pause]]
```

```flow
300 ns divided by 0.85 × 200 pF is about 1.8 kΩ. And the 3 mA limit says no smaller than about
1 kΩ. So the window is roughly 1 to 1.8 kΩ. A 10 kΩ pull-up copied from a slower design is far outside
it: on this bus its edge would take about 1.7 µs.
```

```flow
That is the trade: **a fast edge needs a small resistor, a weak driver needs a large one, and no value
wins both.**
```

***

## Two outputs on one wire

Wired-AND falls out of open-drain for free: the line is high only when every output lets go, and
any one of them can pull it low. That is why the I²C bus can share two lines among several devices.

<!-- PLAN
SHOW     Electronics — `open-drain-bus` with a second MOSFET M2 (gate from V3) on the same pulled-up bus.
         Drive: both released (HIGH) → M1 pulls (LOW) → M1 releases, M2 pulls (LOW) → both pull (LOW).
         Then Draw: the wired-AND construction, one pulled-up line and outputs added one at a time, the truth
         table written beside it as each case is stepped; then Figure: one I²C byte with its ACK, where the
         receiver pulls SDA low on a line the transmitter has released.
         Look for: any one output wins LOW; the line is HIGH only when every output lets go.
         Status: ready (Electronics) · needs Draw: wired-AND construction with its truth table · needs asset:
                 I²C byte-and-ACK timing diagram (ours to redraw)
ASK      poe (before the statement) — "One output pulls low, the other lets go. What is the line?"
         options: LOW | HIGH | Halfway | Undefined
         answer: LOW
         reveal: M1 on, M2 off: the DMM on the bus reads near 0 V
         explain: A released output neither supplies nor draws current, so the one transistor that conducts
         holds the line against the pull-up, and the bus computes the AND of everyone's "let go".
         depth: understand    practice: developing models
FAULT    One device with a push-pull output on the shared line drives HIGH while another pulls LOW: the two
         outputs short the rail through each other. Needs Electronics: P-MOSFET profile or a push-pull output
         part, to show the contention current.
-->

<!-- FILLED 2026-10-07: drafted from training-overview Day 3 Module 1; tutor to review -->

```flow
[[demo]] Animation Bench — two open-drain outputs sharing one pulled-up line.

[[ask]] One output pulls low, the other lets go. What is the line?

[[pause]]

[[reveal]] Low. The output that lets go neither supplies nor draws any current, so the one transistor
that conducts holds the line down against the pull-up.

[[demo]] Now step through every case. Both let go: high. Either one pulls: low. Both pull: low. Add a
third output and the rule does not change: **the line is high only when every output lets go, and any
one of them can pull it low.** That is a logical AND, and we got it for free, just by wiring open-drain
outputs together. It is called wired-AND.

This is why I²C can share two lines among several devices. Nobody ever drives the line high, so two
devices can never fight. If one pulls low while another lets go, the low simply wins, and no current
flows except through the pull-up.

You can see it in every I²C byte. After eight bits, the transmitter lets go of the data line and the
receiver pulls it low to say "received". That acknowledge bit is wired-AND at work.

Compare a push-pull output, which drives high as well as low. Put two of those on one wire, one
driving high and the other low, and they short the supply through each other.
```

***

## There is no best interface, only a suited one

There is no universally best digital interface. SPI suits high-speed, predictable transfers when
you can afford the extra lines; I²C suits several devices on two shared lines when its data rate is
enough. Every interface costs pins, wires, power, processing time and bandwidth.

<!-- PLAN
ASK      poll (before the statement) — "An ADC must send its readings to a microcontroller. SPI or I²C?"
         options: SPI | I²C | I need to know more first
         explain: The follow-up "what would you need to know?" is taken in chat, and the room's list becomes
         the Flow's list.
         depth: understand    practice: defining problems
SEED     plants S50 — "One question on that list comes back with numbers in the very next module: how much
         data, how quickly? Can the wire keep up?"
-->

```flow
[[ask]] Suppose we have an ADC that needs to send measurement data to a microcontroller. SPI or I²C?
And what would you need to know before you could answer?

[[pause]]

The fact that two devices can communicate digitally does not mean that every digital interface is
suitable for the application. As engineers, we choose an interface based on the requirements of the
system. Some of the questions we may need to ask include:

- **How much data needs to be transferred?**
- **How quickly does the data need to be transferred?**
- **How many devices need to communicate?**
- **How far apart are the devices?**
- **How many physical wires or pins can we afford to use?**
- **Does communication need to be one-way or two-way?**
- **Does the system need a shared clock?**
- **Does each device need to be individually addressed?**
- **How important are timing and latency?**
- **How much processing overhead can the microcontroller handle?**
- **How much power can the interface consume?**
- **How resistant must the communication be to electrical noise?**
- **Does the interface already exist on the devices we are connecting?**
- **What voltage levels and electrical characteristics are required?**

There is therefore no universally **"best"** digital interface. The best interface is the one that
satisfies the requirements of the particular system.

We might choose **SPI** when we want relatively high-speed communication, predictable timing and a
simple high-throughput connection, and we can afford the additional signal lines.

We might choose **I²C** when we want to connect several devices using only two shared signal lines
and the available data rate is sufficient for the application.

So the choice is not simply *"Which interface is better?"* It is *"Which interface is better suited
to what we are trying to achieve?"* This is an important engineering principle.

And communication interfaces are not free. They consume some combination of **pins, wires, PCB
space, power, processing time, communication bandwidth and design complexity**.

For example, a parallel interface may transfer many bits simultaneously and therefore provide high
data throughput, but it may require many physical signal lines. SPI can provide high-speed serial
communication, but each peripheral may require its own chip-select line in a typical configuration.
I²C uses only two main signal lines and allows multiple devices to share the bus, but it has
different speed, addressing and electrical requirements. UART can be very simple for point-to-point
communication, but it does not provide the same shared-bus structure as I²C.

The engineer therefore has to balance **performance, complexity, cost, wiring, power and system
requirements**.
```

***

## A logical problem and an electrical one

A communication interface is both a logical and an electrical problem. The devices must agree on
what the bits mean and when they move, and the signals carrying them must suit both devices.

<!-- PLAN
SHOW     Plot — the centrepiece rise-time Plot back on the Canvas while the room ticks its list, so three of
         the requirements (pull-ups, input capacitance, rise times) are visibly the ones that fought.
         Status: ready
ASK      checkpoint (after the statement) — "Tick each electrical requirement you would check on an I²C
         datasheet."
         items: logic voltage | input and output thresholds | maximum clock | output drive | pull-up
         requirement | input capacitance | rise and fall times | maximum length | noise environment
         depth: use    practice: planning investigations
-->

```flow
Even when two devices use the same communication standard, we still need to verify that their
electrical characteristics are compatible. For example:

- **Logic voltage**
- **Input and output voltage thresholds**
- **Maximum clock frequency**
- **Output drive capability**
- **Pull-up requirements**
- **Input capacitance**
- **Signal rise and fall times**
- **Maximum cable or trace length**
- **Noise environment**

You have just watched three of those — pull-ups, input capacitance and rise times — fight each other
on the benches.

This is why a communication interface is both a **logical** and an **electrical** problem. The
devices must not only agree on **what the bits mean and when they are transferred**; the electrical
signals carrying those bits must also be suitable for both devices.
```

```flow
[[transition]] So far, in the course's own example, the code has come from the converter inside the
microcontroller, and travelled a few millimetres. But what if that converter is not good enough for the
signal? Then the converter itself moves out of the chip, and the bus we have just built becomes the road
its codes travel on. That is a design choice, and it is the next stop.
```
