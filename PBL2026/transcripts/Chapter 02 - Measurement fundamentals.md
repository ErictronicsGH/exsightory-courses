# The Quantity We Want to Measure

Before we can measure, there should be something—a property, a quantity, a condition, or an event—that we want to quantify or detect.

The function of a measurement system is essentially to obtain information about a property or quantity of interest and, where appropriate, express that information as a numerical result.

We will mostly refer to this as the **physical quantity**. It could be the amount of light an object emits, the colour of the light, the weight of an object, how fast an object is moving, how hot something is, etc. The approach, technique, instrument, and method used depend greatly on the nature of the quantity we want to measure.

The science of measurement is called **metrology**. The objective of a measurement can be for many reasons, such as:

- Process monitoring, e.g. monitoring the temperature of a system.
- Process control, e.g. controlling the water level in a tank.
- Experimentally verifying a theory.
- Verifying the results of computer simulations.
- Characterising a system or component.
- Comparing the performance of different systems.

This means that the results from a measurement should be **objective, based on a defined method, and reproducible** under specified conditions. The result should not depend simply on who happened to perform the measurement.

For instance, imagine that we assign a value to the saltiness of a pot of seawater based on people tasting it. This would not give us a sufficiently objective measurement because each observer would assign a value based on their own perception of taste. Person A from the coastal areas of Ghana may assign a different value from someone who lives in the Savannah regions.

So, a better approach would be to develop a scientific method or procedure that is **standardised, reproducible, and capable of quantifying the salinity of the water** in a way that produces comparable results regardless of who performs the measurement.

Depending on the nature of the quantity to be measured, the measurement can be **direct or indirect**.

A measurement is direct when the quantity we want is obtained directly from the indication of the measuring instrument. In other words, the instrument is designed to provide an indication corresponding directly to the quantity being measured.

For instance, if you connect a voltmeter across a resistor and it displays **5.1 V**, then the voltage is obtained directly from the instrument's indication.

For indirect measurement, you do not determine the desired quantity directly. Instead, you measure one or more quantities that are related to it and use that relationship to determine the quantity of interest.

For instance, suppose you want to measure current. Instead of using an ammeter, you could measure the voltage across a known resistance and compute the current using Ohm's law:

**I = V/R**

In any measurement, the specific quantity intended to be measured is called the **measurand**.

It is the quantity we intend to determine through the measurement, rather than simply the numerical value displayed by the instrument.

For example, if we want to determine the electrical resistance of a copper wire under specified conditions, the **resistance of the copper wire under those conditions** is the measurand.

In electronics, measurements mostly begin with **sensing**.

Unfortunately, most of the physical quantities we would want to measure are not directly available to our electronic circuits as electrical quantities. Since we want to perform the measurement using electronic systems, we therefore need a way of obtaining an electrical representation of the physical quantity.

A device that converts information from one physical domain into a corresponding signal in another physical domain is generally called a **transducer**.

Transducers are commonly described as devices that convert one form of physical quantity or energy into another. For example, a device may convert mechanical motion into an electrical signal, or an electrical signal into mechanical motion.

A special group of transducers that we use to obtain information about physical quantities are **sensors**.

Note that *sensor* and *transducer* are sometimes used interchangeably in engineering. The exact distinction between the two terms also varies between fields and applications. For this training, however, we will use the term **sensor** specifically for a device or sensing element that detects a physical quantity and provides a useful electrical representation of it.

A transducer does not necessarily mean that energy is simply being converted from one form to another. What matters to us is that a physical input is converted into a corresponding output signal that carries information about that input.

For example, a change in pressure may produce a mechanical deformation, which may then produce a change in electrical resistance. The important thing is that information about the pressure has been transferred into a form that our electronic system can work with.

Based on the direction of conversion when dealing with electronics, we can broadly categorise transducers into **INPUT** and **OUTPUT** transducers.

**Input transducers** convert a physical input into an electrical output and are commonly referred to as **sensors**. For radiation-related applications, the sensing device may also be referred to as a detector.

**Output transducers** convert an electrical signal into a corresponding physical effect and are commonly referred to as **actuators** or, in some applications, effectors.

Sensors are primarily intended to **acquire information** about the physical world, while actuators are primarily intended to **produce an effect or perform an action** in the physical world.

Electronic measurement systems have several advantages that have contributed to their wide adoption:

1. By selecting appropriate sensing materials and structures, sensors can be created for many non-electrical quantities by exploiting relationships between changes in the physical quantity and changes in measurable electrical properties.

2. Many sensors can produce electrical signals in response to the quantity being measured, and these signals can often be amplified and processed. However, this does **not** mean that measurement is completely free from energy transfer or that the measurement system cannot influence the system being measured.

3. Sensors can integrate electronics for conditioning, compensation, conversion, or other signal-processing functions into a single package.

4. There are many options for recording and displaying information electronically. These allow us to handle numerical data as well as text, graphics, diagrams, and other forms of information.

5. Electrical signals are relatively versatile for transmission, allowing measurement information to be transferred over wires or through wireless communication systems and then processed at another location.

Sometimes the transduction process is not a one-stage activity. It may go through a series of transduction stages before we finally obtain the desired electrical signal.

For example, a pressure difference may cause a **diaphragm to deform**. That deformation can produce strain in a sensing element, and a **strain gauge** can convert the resulting strain into a change in electrical resistance. Additional circuitry can then convert that resistance change into a voltage suitable for the measurement system.

So, conceptually, we could have:

**Pressure → Deformation → Strain → Resistance Change → Voltage**

For a packaged sensor, several of these stages may be combined into a single physical unit, making the entire process appear much simpler from the outside.

In this training, whenever we use the word **sensor**, the intended output will generally be an electrical signal that represents the physical quantity being sensed.

Sensors can produce different kinds of electrical outputs, including **voltage, current, resistance, capacitance, frequency, charge, or other electrical characteristics**. For simplicity, we will often encounter sensors whose output is ultimately represented as a voltage or current.

Physical quantities can often vary continuously. When a sensor produces a corresponding continuously varying electrical signal, that signal is described as **analog**.

An analog signal can take a continuous range of values within its specified limits.

This is the nature of many sensor outputs. In situations where we do not need numerical computation or do not need to interface with a microcontroller or other computing unit, we can sometimes work directly with the analog output.

For instance, let's say we want to detect when the light level falls below a certain value and then switch on a light.

In such a situation, we are primarily interested in **detection** rather than obtaining an exact numerical measurement. We can use the analog sensor signal with a comparator or similar circuit to determine whether the light level has crossed the desired threshold, without necessarily requiring a microcontroller.

However, in many situations in electronics, we want to quantify the physical quantity and assign a numerical value to it for display, recording, communication, or further computation.

When this happens, we need to **digitize** the analog signal so that a digital system can represent and process it.

An analog-to-digital converter, or **ADC**, performs this conversion by sampling the analog signal and representing its values as discrete digital numbers, which can then be processed by a microcontroller or other digital system.

A lot can go wrong at the **physical-to-electronics interface**.

For instance, the physical quantity we intend to measure may be accompanied by other physical influences that also affect the sensor. These unwanted contributions can become part of the signal we obtain.

We commonly refer to unwanted variations or disturbances in a measurement signal as **noise**, although not every unwanted influence is technically noise. Interference, environmental influences, sensor characteristics, and other error sources may also affect the measurement.

For instance, if we intend to measure a particular infrared wavelength being produced by a device we have built during the day, there is a possibility that infrared radiation from sunlight will also reach the sensor.

The sensor may therefore respond to both the infrared radiation we are interested in and the infrared radiation coming from the environment.

The question now becomes:

**How do we properly quantify the infrared radiation of interest?**

**How do we reduce the influence of unwanted infrared radiation from the environment?**

Also, the sensors we use for measurements have their own limitations and can themselves influence the quantity being measured. Their sensitivity, range, linearity, response time, noise, temperature dependence, and other characteristics can all affect the result we obtain.

Finally, before the measurement information gets to the microcontroller, there are many other things that could go wrong.

These could be due to the sensor itself, signal transmission, environmental influence on the transmitted signal, electrical interference, signal conditioning, sampling, quantization, digitization errors, and other limitations in the measurement system.

Therefore, it is very important to properly **condition and prepare the signals we detect** so that unwanted effects are reduced as much as reasonably possible and the remaining limitations can be understood, characterised, and accounted for before the information reaches the microcontroller.

And this is where the measurement system becomes more than simply a sensor.

We are no longer just asking:

**“Can I detect it?”**

We are beginning to ask:

**“Can I obtain a measurement that I can trust?”**