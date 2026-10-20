---
targetMinutes: 25
motivates: Temperature, pressure and light are not voltages, and an ADC accepts nothing else.
objectives:
  - Describe a sensor as a chain of transduction stages ending in an electrical quantity.
  - Tell a modulating sensor from a self-generating one, and say what each asks of the circuit after it.
  - Name the interfering inputs that reach a sensor alongside the quantity, and the ways of defending against them.
concepts: [transduction, sensor-classes, interfering-inputs]
---

# Sensing: from physical quantity to electrical signal

<!-- PATH: quantity → [ SENSOR ] → conditioning → ADC → firmware → number
     TOOL: Electronics (centrepiece: a 10 k NTC thermistor divider — the excitation dial sets the
           sensitivity, and self-heating as a reveal; ideal: a thermocouple beside it) · Plot (a
           thermocouple's voltage against both junctions) · Draw (the transducer data flow, redrawn from
           image-3.png; the pressure chain; the five defences on the path).
     SOURCES: transcripts/Chapter 02 - Measurement fundamentals.md (second half);
              Chapter 04 - Data domains.md §3; Chapter 05 - Interfaces.md §6;
              05_sensor_classification.md; 07_compensation_techniques.md.
     NEW MODULE — not in training-overview.md; see course-organization.md §3. -->

## Our circuits only understand electricity

Most of the quantities we want to measure are not electrical. Like the eye for the brain, a
sensor has to give the electronic system a representation it can work with: an electrical one.

<!-- PLAN
SHOW     Draw — the path drawing focused on its first arrow, QUANTITY → SENSOR, with the eye's organ from 010
         ghosted above it.
         Status: needs Draw (a focus on the path drawing).
SEED     plants S8 — "This does not mean that measurement is free of energy transfer. Hold on to that — it
         comes back in the next module."
-->

```flow
At the start of the day, the eye turned light into neural signals the brain could work with. The
brain never handles light itself; it handles what the sense organ made of it. An electronic
measurement system has the same arrangement. In electronics, measurements mostly begin with
**sensing**.

Unfortunately, most of the physical quantities we want to measure are not directly available to our
electronic circuits as electrical quantities. Since we want to perform the measurement with electronic
systems, we need a way of getting an electrical representation of the physical quantity.

A sensor provides one of the first and most important interfaces in a measurement system. It allows an
engineering system to get information about something happening in the physical world — an object, an
event, or another system. Conceptually:

**Physical quantity → sensor → usable signal**

Electronic measurement systems have several advantages that have led to their wide adoption:

1. By choosing suitable sensing materials and structures, we can build sensors for many non-electrical
   quantities, by exploiting the relationship between changes in the physical quantity and changes in a
   measurable electrical property.
2. Many sensors produce electrical signals that can be amplified and processed. This does **not** mean
   that measurement is free of energy transfer, or that the measurement system cannot influence the
   system being measured. (Hold on to that — it comes back in the next module.)
3. Sensors can integrate electronics for conditioning, compensation, conversion or other processing
   into a single package.
4. There are many options for recording and displaying information electronically, as numbers, text,
   graphics and diagrams.
5. Electrical signals are versatile for transmission, over wires or wirelessly, so measurement
   information can be processed somewhere else.
```

***

## Transducer, sensor, actuator

A transducer carries information from one physical domain into another. A sensor is an input
transducer: physical in, electrical out. An actuator goes the other way.

<!-- PLAN
SHOW     Draw — input transducer → electronics → output transducer, a sensor and an actuator labelled, the
         data flowing left to right. A redraw of transcripts/image-3.png ("Figure 1.1 Functions and data flow
         in a measurement and control system", a textbook figure: redraw it for the course, do not
         reproduce it).
         Drive: the sensor, then the electronics, then the actuator.
         Status: needs Draw: the transducer data-flow drawing (redraw of image-3.png).
-->

```flow
A device that converts information from one physical domain into a corresponding signal in another is
generally called a **transducer**. Transducers are commonly described as devices that convert one form
of physical quantity or energy into another — mechanical motion into an electrical signal, or an
electrical signal into mechanical motion.

Based on the direction of conversion, we can broadly divide transducers into **input** and **output**
transducers.

**Input transducers** convert a physical input into an electrical output, and are commonly called
**sensors**. In radiation-related applications the sensing device may also be called a detector.

**Output transducers** convert an electrical signal into a corresponding physical effect, and are
commonly called **actuators** or, in some applications, effectors.

Sensors are mainly intended to **acquire information** about the physical world. Actuators are mainly
intended to **produce an effect or perform an action** in it.

*Sensor* and *transducer* are sometimes used interchangeably, and the exact distinction varies between
fields. In this training we use **sensor** for a device or sensing element that detects a physical
quantity and provides a useful electrical representation of it.
```

***

## Transduction is not unit conversion

A thermocouple is not doing °C → volts the way we do metres → feet. It responds to a physical
phenomenon with another physical quantity that is related to it.

<!-- PLAN
ASK      poe (before the statement) — "When a thermocouple turns a temperature into a voltage, is it
         converting units, the way we convert metres into feet?"
         options: yes — a fixed factor turns °C into millivolts | no — it makes a different quantity, which
                  depends on more than the temperature we meant
         answer: no
         reveal: the Plot below, with the hot junction held at 100 °C while the cold junction moves.
         explain: A unit conversion depends only on the number being converted; this voltage changed while
                  the temperature we meant to measure stood still, because a thermocouple responds to the
                  difference between two junctions.
         depth: understand    practice: constructing explanations
SHOW     Plot — thermocouple output V = S·(T_hot − T_cold) with S ≈ 41 µV/°C (type K near room temperature;
         a linear approximation, and say so), sliders T_hot and T_cold.
         Drive: T_hot = 100 °C, T_cold = 25 °C (≈3.08 mV); move T_cold to 35 °C (≈2.67 mV).
         Look for: the output moving with nothing changed at the end we care about.
         Status: ready.
-->

```flow
[[ask]] When a thermocouple turns a temperature into a voltage, is it converting units — the way we
convert metres into feet?

[[pause]]

A sensor responds to a physical quantity by producing a related electrical quantity:

- **Temperature → resistance.** A thermistor changes its resistance as temperature changes.
- **Temperature → voltage.** A thermocouple produces a small voltage related to temperature.
- **Pressure → electrical signal.** A pressure sensor may produce a voltage or current related to
  pressure.
- **Light → current.** A photodiode produces a current in response to incident light.
- **Motion → electrical signal.** An accelerometer produces an output related to acceleration.

This process is called **transduction**. Do not confuse it with ordinary unit conversion. A
thermocouple is not simply performing °C → volts in the same sense that we perform metres → feet. The
sensor responds to a physical phenomenon and produces another physical quantity whose behaviour is
related to the quantity being measured. That distinction becomes important on Day 2, when we discuss
conversions in firmware.

A transducer is not necessarily just converting energy from one form to another. What matters to us is
that a physical input is converted into an output signal that carries information about that input.
```

***

## Transduction can take several stages

Pressure → deformation → strain → resistance change → voltage. A packaged sensor hides the
stages inside one body, but each stage is still there.

<!-- PLAN
SHOW     Draw — the pressure chain stage by stage: the diaphragm deforms → strain → the gauge's resistance
         changes → a bridge gives a voltage; then the package outline drawn round all of it, and the stages
         faded behind the package wall.
         Look for: the package hiding the stages, and every stage still there.
         Status: needs Draw: the pressure-chain drawing with its package.
-->

```flow
Sometimes transduction is not a single step. It may go through a series of stages before we finally get
the electrical signal we want.

A pressure difference may cause a **diaphragm to deform**. That deformation produces strain in a sensing
element, and a **strain gauge** converts the strain into a change of electrical resistance. Further
circuitry then converts that resistance change into a voltage the measurement system can use.

**Pressure → Deformation → Strain → Resistance change → Voltage**

In a packaged sensor, several of these stages may be combined in one physical unit, which makes the
process look much simpler from the outside. The important thing is that information about the pressure
has been carried into a form our electronic system can work with.
```

***

## What a sensor hands you

Voltage, current, resistance, capacitance, frequency or charge. The electrical quantity it
produces, more than what it measures, decides the circuit that comes next.

<!-- PLAN
ASK      flash (at the Flow's [[ask]]) — "A thermistor, a thermocouple, a photodiode, a strain gauge. Which
         electrical quantity does each one hand you?"
         options: resistance, voltage, current, resistance | voltage, voltage, voltage, resistance |
                  resistance, voltage, voltage, capacitance | current, voltage, current, resistance
         answer: resistance, voltage, current, resistance
         explain: Two of them only change a resistance and need an excitation before they say anything; the
                  thermocouple makes a voltage and the photodiode a current.
         depth: use    practice: constructing explanations
SEED     plants S10 — "Remember: analog does not mean accurate. Continuous is not the same as correct."
-->

```flow
In this training, whenever we say **sensor**, the intended output is an electrical signal that
represents the physical quantity.

Sensors can produce different kinds of electrical output: **voltage, current, resistance,
capacitance, frequency, charge**, or other electrical characteristics. For simplicity, we will often
meet sensors whose output ends up as a voltage or current.

[[ask]] A thermistor, a thermocouple, a photodiode, a strain gauge. Which electrical quantity does each
one hand you?

[[pause]]

We can classify sensors in many different ways, according to our interest. Engineers prefer to
classify them by this **variable electrical quantity** — resistive,
capacitive, inductive; sensors that generate voltage, charge or current; p-n junction and
radiation-based sensors. This reduces the number of groups and leads directly to the signal
conditioning each group needs. We can also classify sensors by measurand — temperature, pressure,
flow, level, humidity, pH, chemical composition — but that list can hardly be exhaustive, because the
number of measurable quantities is almost unlimited.

Physical quantities often vary continuously. When a sensor produces a correspondingly continuous
electrical signal, the signal is **analog**: its output changes in a continuous way at a macroscopic
level, and it can take a continuous range of values within its limits — 0 V → 0.1 V → 0.2 V → 0.21 V → 0.211 V… Thermocouple voltages, microphone outputs, amplifier
outputs and photodiode currents are all analog signals. The information is usually carried in the
amplitude, although sensors whose output is in the time domain are also usually considered analog.
Sensors whose output is a variable frequency are called **quasi-digital**, because it is very easy to
get a digital value from them: count the cycles for a set time.

Remember: **analog does not mean accurate.** An analog signal can contain noise, interference,
distortion, offset, drift and nonlinearity. It is simply information represented by a continuously
varying physical quantity.

A **digital** sensor's output takes discrete steps or states. Digital sensors do not need an ADC, their
output is easier to transmit, and they are often more repeatable, reliable and accurate. Unfortunately,
there are many physical quantities they cannot measure.
```

***

## Modulating or self-generating

A modulating sensor only changes how an existing supply flows, so you choose its excitation and
its sensitivity. A self-generating one makes its own output from the quantity, and gives what it gives.

<!-- PLAN
SHOW (centrepiece) Electronics — a 10 k NTC (thermistor-ntc-10k, B = 3950 K) under a 10 kΩ resistor from the bench
         supply, a DMM across the NTC, the ambient set by the bench environment. Beside it (ideal) a
         thermocouple into a second DMM, with no supply at all.
         Drive: 1 supply at 0 V — the thermistor says nothing, the thermocouple already reads · 2 supply to
         3.3 V — 1.65 V at 25 °C · 3 ambient 25 → 35 °C — 1.65 → 1.30 V · 4 supply to 10 V and repeat the
         step — 5.00 → 3.94 V, three times the change · 5 take the ASK, then reveal self_heating_error at
         3.3 V and at 10 V.
         Look for: the excitation knob setting the sensitivity; then the heat overlay on the bead.
         Status: ready for the thermistor half (NTC profile, supply dial, ambient, self_heating_error
                 reveal) · needs Electronics: thermocouple (a self-generating source) for the comparison.
ASK      circuit + predict (before step 5's reveal) — "The excitation goes from 3.3 V to 10 V. How much does
         the thermistor's self-heating error grow?"
         options: it doesn't heat — it is a sensor | about ×3, like the signal | about ×9 | about ×30
         answer: about ×9
         reveal: self_heating_error at 3.3 V (≈0.14 °C), then at 10 V (≈1.2 °C), at 500 °C/W.
         explain: The heat is the power in the bead, V²/R, so tripling the voltage across it multiplies the
                  heating by nine while the signal only triples.
         depth: understand    practice: developing models
SEED     plants S9 — "With a modulating sensor, the excitation is yours to choose. It comes back at the end of
         today, when we meet the reference voltage."
FAULT    An NTC driven past its power rating long enough to latch damage shifts to 10.8 kΩ at 25 °C and keeps
         reading — about 1.7 °C low, permanently, with nothing to say so (the profile's damage mode).
FAULT    Excitation raised "for more signal": a self-heating offset that looks exactly like a calibration
         error.
-->

<!-- CHECK: the source notes say the resistance "responds proportionally" and the current is
     "proportional to the quantity being measured". For a thermistor (NTC) the resistance–temperature
     relation is strongly nonlinear, so this text says "responds to" / "tells us" instead. Confirm the
     wording; linearization is taken up on Day 2·050. -->

```flow
We can also classify sensors by whether they need an external power supply.

**Modulating sensors** — loosely called "active" by some — need an external supply to work. The
measured quantity does not produce the output signal directly; it modulates, or gates, a supply that is
already there. A strain gauge and a thermistor are just variable resistors whose resistance responds to
the physical quantity. We apply a voltage across one, and the current that flows tells us the quantity.
Because the designer supplies the excitation energy, these sensors give better control of sensitivity:
you can tune the sensor's overall gain by adjusting the supply voltage or current.

**Self-generating sensors** produce their output power from the measured quantity itself, with no
auxiliary supply. A thermocouple generates its own voltage from a temperature difference, and a solar
cell does something similar. The energy of the input is converted directly into the electrical output.
These give you what they give you: you cannot turn up their excitation, because there isn't one.

[[demo]] Electronics Bench: a thermistor that needs a supply before it can say anything, beside a self-generating
sensor that needs none.

The difference matters for everything that follows. A modulating sensor needs an excitation, and the
circuit that excites it is a source with its own impedance — which is exactly where the next module
begins. And the excitation itself will come back at the end of today, when we meet the reference
voltage.
```

***

## Detect, or quantify?

To act when light falls below a threshold, a comparator on the analog signal is enough. To give the
quantity a number, the signal has to be digitized.

<!-- PLAN
ASK      multi-select (before the statement) — "Which of these need the sensor's signal digitized?"
         options: a dusk-to-dawn light switch | a logger recording the light level every minute | an
                  over-temperature cut-out | a thermometer with a display
         answer: the logger and the thermometer with a display
         explain: The switch and the cut-out only need to know which side of a threshold the signal is on,
                  which a comparator decides; the logger and the display need a number.
         depth: use    practice: defining problems
SEED     plants S12 — "Detect, or quantify? A comparator detects. To give the quantity a number we digitize,
         and that is where today ends up."
-->

```flow
Sometimes we can work with the analog output directly, without a microcontroller.

Say we want to switch on a light when the light level falls below a certain value. Here we are mainly
interested in **detection**, not an exact numerical measurement. We can feed the analog sensor signal to
a comparator, or a similar circuit, to decide whether the light level has crossed the threshold.

In many situations, however, we want to quantify the physical quantity and give it a numerical value —
to display it, record it, communicate it or compute with it. Then we need to **digitize** the analog
signal so that a digital system can represent and process it. That is the converter's job, and we reach
it later today, once the signal has been made fit to meet it.
```

***

## The quantity never arrives alone

A sensor responds to everything that affects it, not only to what we intend. Sunlight's infrared
reaches the sensor meant for your device's infrared.

<!-- PLAN
SHOW     none — the room's answers are the material for the next card.
ASK      poll (at the Flow's [[ask]]) — "Sunlight's infrared reaches the sensor too. How would you measure only
         your device's infrared?"
         options: an optical filter for our wavelength | switch our source on and off and take the
                  difference | a second, shaded sensor measuring the sunlight, subtracted | shade the sensor
                  from the sun
         (no answer: every option is a real defence; the next card names which defence each one is)
         depth: create    practice: designing solutions
-->

```flow
A lot can go wrong at the **physical-to-electronic interface**.

The physical quantity we want to measure may be accompanied by other physical influences that also
affect the sensor. Those unwanted contributions become part of the signal we get.

Suppose that, during the day, we want to measure a particular infrared wavelength produced by a device
we have built. Infrared from sunlight may also reach the sensor. The sensor will then respond both to
the infrared we are interested in and to the infrared from the environment.

[[ask]] How do we quantify only the infrared we care about? How do we reduce the influence of the
infrared coming from the environment?

[[pause]]

We commonly call unwanted variations or disturbances in a measurement signal **noise**, although not
every unwanted influence is technically noise. Interference, environmental influences, sensor
characteristics and other error sources can also affect the measurement.

The sensors themselves also have limitations, and can influence the quantity being measured. Their
sensitivity, range, linearity, response time, noise, temperature dependence and other characteristics
all affect the result.
```

***

## Defending the sensor against interference

Choose sensors and parts that are insensitive to the interference. Oppose one effect with an equal
and opposite one. Filter it, feed it back, or correct for it mathematically.

<!-- PLAN
SHOW     Draw — the five defences pinned on the path where the course teaches them: insensitive design and
         opposing inputs at the sensor (here), negative feedback at conditioning (060), filtering at the
         sampler (Day 3·020), mathematical correction in firmware (Day 2·050). Then the poll's four answers
         dropped onto them (the filter → filtering; on/off difference and the second sensor → correction;
         shading → insensitive design).
         Status: needs Draw (pins over the path drawing).
SEED     plants S11 — "Five defences. Two of them live here at the sensor; the other three are waiting for us
         further down the path."
-->

```flow
The effects of interfering and modifying inputs can be reduced by changing the system's design, or by
adding new elements to it.

The best approach is to design systems that are **insensitive to interference** and respond only to the
intended signal. That includes choosing the sensor best suited to its environment — a strain gauge with
a low temperature coefficient, for example — and choosing components that are less sensitive to
temperature, such as metal-film resistors and NP0 capacitors. For obvious practical reasons, this is not
always possible.

The **opposing-inputs** technique is often used to compensate for temperature. If a gain depends on a
resistor with a positive temperature coefficient, a second resistor with a negative temperature
coefficient can be placed in series with it, so that the gain stays constant despite temperature
changes.

Three more defences belong further along the path, and we will meet each of them there:

- **negative feedback**, in the conditioning module (060);
- **filtering**, when the signal reaches the converter on Day 3;
- **mathematical correction** — measuring the interfering variable and compensating digitally, as a
  smart pressure sensor does for temperature — when the code reaches the firmware on Day 2.

And the sensor is only the beginning. Before the measurement information gets to the microcontroller,
there are many other things that could go wrong: the sensor itself, signal transmission, environmental
influence on the transmitted signal, electrical interference, signal conditioning, sampling,
quantization, digitization errors, and other limitations of the measurement system.

So it is very important to **condition and prepare the signals we detect** properly, so that unwanted
effects are reduced as much as reasonably possible, and the remaining limitations can be understood,
characterised and accounted for before the information reaches the microcontroller.

This is where the measurement system becomes more than simply a sensor.

[[transition]] The quantity is now electrical — a voltage, a current, or a resistance waiting to be
excited. But the moment we connect anything to that sensor, we have made a circuit, and the circuit can
change what the sensor says. After the break: the sensor as a source.
```
