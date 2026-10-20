---
targetMinutes: 35
motivates: The firmware holds a steady code, but 3102 is not a temperature — and the arithmetic that turns it into one can quietly lose the precision we fought for.
objectives:
  - Scale a raw code to an engineering value through the electrical quantity and the sensor relationship, and tell the different kinds of "conversion" apart.
  - Calibrate offset and gain in firmware with two points against a reference, and say why INL and DNL cannot be calibrated out the same way.
  - Write the conversion arithmetic without throwing away bits: order of operations, intermediate overflow, floating point without an FPU.
concepts: [scaling, calibration, fixed-point-maths]
---

# Scaling, calibration and the maths that loses your precision

<!-- PATH: [ … → DIGITAL INTERFACE → FIRMWARE: filter → **calibrate → scale** → **NUMBER** ]
     TOOL: Plot (centrepiece: the calibration table with a linear fit and its residuals; the NTC curve) ·
           Coding Bench (`two-point`, `four-ways`) · Equation (the scaling chain) · Draw (the path's firmware
           stage; the calibration chain) · Figure (kinds of conversion; code → indication → result).
     SOURCES: transcripts/Chapter 11 - Conversion.md (opening, the kinds of conversion, §18, §19);
              Chapter 12 - Calibration.md; Chapter 03 - Signal conditioning.md "Linearization";
              07_compensation_techniques.md "Mathematical correction"; 08_static_characteristics (static
              calibration, the calibration curve); Chapter 01 (the sugar story, as a bridge);
              training-overview.md Day 2 Module 4. -->

## The code has arrived

Now that the data has reached the microcontroller, we can compute on it, and relate the digital
representation to the physical quantity we are actually interested in.

<!-- PLAN
SHOW     Draw — the course path drawing with FIRMWARE lit and split into its three boxes, filter → calibrate
         → scale, the filtered code from 040 arriving at "calibrate". Look for: the code one stage from being
         a number.
         Status: needs Draw: path drawing, firmware stage split into three steps (reuse)
-->

```flow
The code has come a long way. It left the converter, crossed the bus, and the firmware has filtered
it into something steady. Now it has to become a number with a unit.

Now that we have successfully brought the data to the microcontroller, we have the ability to perform
computations on that data and relate the digital representation to the physical quantity we are
actually interested in.

This is where another important concept appears: **conversion**.
```

***

## "Conversion" means many things

Transduction, signal conditioning, ADC, DAC, unit conversion, scaling, calibration, encoding and
protocol conversion are all called "conversion", and they are conceptually different processes. We
must ask what exactly is being converted.

<!-- PLAN
SHOW     Figure — nine small cards, one per kind of conversion (transduction, conditioning, ADC, DAC, unit,
         scaling, calibration, encoding, protocol), each with its example, toured in the Flow's order.
         Status: needs asset: nine-card SVG (ours to draw)
ASK      poll (before the statement) — "Temperature → resistance. 5 mV → 2 V. 25 °C → 77 °F. ADC count →
         volts. Are these the same kind of conversion?"
         options: All the same kind | All different | Some are the same
         explain: The Figure's nine cards give each its own name; the vote shows how loosely the word is used.
         depth: understand    practice: asking questions
-->

```flow
The word **conversion** is used in engineering in several different ways. It is therefore important
not to assume that every "conversion" means the same thing.

[[ask]] Temperature → resistance. 5 mV → 2 V. 25 °C → 77 °F. ADC count → volts. We call every one of
these a "conversion". Are they the same kind of thing?

[[pause]]

Consider the following.

**Physical transduction: temperature → resistance.** A sensor establishes a relationship between
different physical quantities. For example, a thermistor changes its electrical resistance as its
temperature changes. This is fundamentally different from simply changing the way a number is
represented. The sensor provides a physical mechanism through which information about one quantity is
represented by another.

**Signal conditioning: 5 mV → 2 V.** The signal remains in the analog domain, but its electrical
characteristics have been changed to make it more suitable for another stage. For example, an
amplifier may increase a 5 mV sensor signal to 2 V so that it can make better use of the available
ADC input range. This is not a conversion from analog to digital. It is a transformation of an
analog signal.

**Analog-to-digital conversion: 2.0 V → digital code.** Here, the representation crosses from the
analog domain into the digital domain. The ADC measures the analog voltage and represents that
measurement using a digital code.

**Digital-to-analog conversion: digital code → voltage.** A DAC takes digital information and
produces an analog representation of that information, such as a voltage or current.

**Unit conversion: 25 °C → 77 °F.** The physical quantity remains the same. Only the unit used to
express the quantity has changed. The temperature has not changed from 25 °C to something physically
different. We have simply expressed the same temperature using another unit.

**Scaling: ADC count → volts.** A numerical representation is converted into another numerical
representation using a known relationship. For example, an ADC code can be mapped to the
corresponding input voltage based on the ADC's reference voltage, resolution and configuration.

**Calibration: raw indication → corrected measurement result.** Calibration establishes or uses a
known relationship between an instrument's indication and a reference or accepted measurement
standard. For example, if a temperature measurement system consistently reads 2 °C higher than a
known reference, that relationship can be used to correct its measurement. Calibration is therefore
not simply another mathematical conversion. It is about establishing how the system's indication
relates to the quantity being measured.

**Encoding: number → binary representation.** Information is represented according to a particular
coding scheme. For example, the number 25 can be represented digitally as **11001**. The numerical
value has not changed. Its representation has.

**Protocol conversion: UART ↔ CAN.** Information can also be transferred from one communication
representation or protocol to another. For example, a gateway may receive information through UART
and transmit equivalent information through a CAN network. The information itself may remain
conceptually the same while the way it is communicated changes.

These are all described as forms of **conversion** in different engineering contexts, but they are
conceptually different processes. This gives us an important lesson:

**The word "conversion" tells us that something is being transformed or represented differently, but we must ask what exactly is being converted.**

Are we changing a physical quantity into another physical representation? An analog signal into a
digital representation? One numerical representation into another? One unit into another? One
communication representation into another? Or an indication into a calibrated measurement result?
The context tells us what kind of conversion is actually taking place.
```

***

## Unit conversion is not ADC conversion

10 m → 1,000 cm changes only the unit. 2.5 V → code 3102 is a measurement represented digitally.
Temperature → thermistor resistance is a sensor relationship. Not every conversion is a unit
conversion.

<!-- PLAN
SHOW     None: the three examples are the card.
-->

```flow
This distinction deserves special attention.

Consider **10 m → 1,000 cm**. The physical quantity is still **length**. Only the unit used to express
it has changed.

Now consider **2.5 V → ADC code 3102**. That is different. The analog voltage has been **measured and
represented digitally**.

Now consider **temperature → thermistor resistance**. That is different again. The sensor establishes
a relationship in which temperature is represented by electrical resistance.

Therefore: **not every conversion is a unit conversion.** And: **not every change in representation
is a change in the physical quantity itself.**

This distinction becomes particularly important in measurement systems, because the same word —
**conversion** — can describe several different stages of the measurement chain.
```

***

## Scaling: from code to engineering unit

A raw code means nothing until the software relates it, through the electrical quantity and the
sensor relationship, to the physical quantity and its unit. For a simple linear system that is a
scaling equation.

<!-- PLAN
SHOW     Equation — the scaling chain with each stage coloured to its place on the path: V = code × V_ref /
         4096, then T = (V − V₀) / S. Worked example: a linear sensor with V₀ = 500 mV at 0 °C and S =
         10 mV/°C on a 3.3 V, 12-bit converter: code 1241 → 1.000 V → 50.0 °C. Drive: change V_ref from 3.3 V
         to 3.0 V and watch the same code become a different temperature.
         Look for: the code meaning nothing until every stage's constant is known.
         Status: ready
HARVEST  S1 — "On Day 1 the driver from Kumasi to Accra never asked why his passengers travelled. Here is who
         does ask: the scaling equation is where the code finally learns what it means."
-->

```flow
Suppose an ADC produces values from **0 to 4095**, but the application needs to display **0 to
100 °C**. The ADC does not directly produce degrees Celsius. It produces a **digital code**
corresponding to the electrical signal presented to its input.

Remember the driver from Kumasi to Accra on Day 1: the ADC never knew what its passengers meant.
Somebody else has to.

The software therefore needs to know how the sensor, signal conditioning, ADC reference, ADC
resolution and other relevant system characteristics relate that digital code to the physical
quantity. Conceptually:

**ADC code → Electrical quantity → Sensor relationship → Physical quantity → Engineering unit (°C)**

For a simple linear system, this relationship may be represented by a mathematical scaling equation.
This process of relating a numerical representation to the quantity and units required by the
application is often referred to as **scaling** or **engineering-unit conversion**.

The important lesson is: **the raw number produced by an electronic system is not necessarily the
quantity the engineer or user actually wants.**

A value such as **3102** has little meaning by itself. We need to know **what produced it, how it was
measured, what reference and scaling were used, and how the sensor relates the electrical signal to
the physical quantity**. Only then can we turn the raw digital representation into something
meaningful, such as **72.4 °C**.

And this brings us back to the larger measurement chain:

**Physical quantity → Sensor → Electrical signal → Signal conditioning → ADC → Digital data →
Processing → Engineering value**

The ADC gives us the **digital representation**. The processing that follows allows us to turn that
representation into the **meaningful engineering value** we actually want.
```

***

## Nonlinear sensors: compensate, don't straighten

A nonlinear sensor needs a lookup table, polynomial, compensation algorithm or calibration data.
Linearisation does not make the sensor itself linear; it compensates so that the whole system gives
a predictable result.

<!-- PLAN
SHOW     Plot — a 10 kΩ NTC (β = 3950) in a divider with 10 kΩ from 3.3 V, the divider voltage against
         temperature from 0 to 100 °C as data points every 10 °C, with a linear fit and then a quadratic fit;
         the straight line through the end points as a curve. Look for: the curve bowing away from the line
         and the quadratic following it much more closely: firmware fits the system, not the sensor.
         Status: ready
HARVEST  S11 — "On Day 1 the last of the five defences against interference was mathematical correction:
         measure the interfering variable, compensate in firmware, the smart sensor's trick. This is where it
         lives."
-->

```flow
For a nonlinear sensor, the relationship may require a more complex equation, a lookup table, a
polynomial, a compensation algorithm or calibration data.

Ideally, we would like the output of a sensor to change proportionally with the physical quantity we
are measuring. For example, if a temperature sensor produces **1 V at 10 °C**, we might expect it to
produce **2 V at 20 °C** and **3 V at 30 °C**. In a perfectly linear sensor, equal changes in the
measured quantity would produce equal changes in the output.

In practice, however, many sensors do not behave this way. The relationship between the physical
quantity and the sensor's output may change at different points in the measurement range. This is
known as **nonlinear behaviour**. For example, a sensor may produce an output that increases rapidly
in one part of its range but more slowly in another. If we directly interpret this output as though
the relationship were perfectly linear, the resulting measurement will contain an error.

**Linearisation** is the process of compensating for this nonlinear behaviour so that the sensor's
output can be interpreted more closely as a linear relationship with the quantity being measured.
This can be achieved using **analog circuits**, specialised components, or **digital processing** in
a microcontroller or other processing system.

The important idea is that linearisation does not necessarily make the physical sensor itself
linear. Rather, we compensate for its nonlinear behaviour so that the overall measurement system
produces a more useful and predictable result.

The same digital approach works against interference. When the mathematical relationship between an
interfering input and the sensor output is known, the interference can be compensated by digital
calculation after measuring the magnitude of the interfering variable — for example, temperature in a
pressure sensor. This method is common in smart sensors.
```

***

## Real systems are never ideal

The sensor, the amplifier, the reference and the ADC each depart from their nominal behaviour, so the
theoretical relationship from quantity to code may not match what the real system does.

<!-- PLAN
SHOW     Draw — the course path drawing, each departure the room names pinned to its stage as it is called
         out. Status: needs Draw: path drawing (reuse)
ASK      checkpoint (after the statement) — "Name one way the real part departs from nominal at each stage."
         items: sensor | conditioning | ADC input | conversion | reference
         depth: understand    practice: constructing explanations
HARVEST  S10 — "Analog does not mean accurate, we said on Day 1. Digital does not either: every one of these
         departures is already inside the code before the firmware sees it."
-->

```flow
Real measurement systems are never perfectly ideal.

A sensor may vary from its nominal characteristics. An amplifier may have **offset and gain errors**.
A reference voltage may have some tolerance or drift. An ADC may introduce its own errors.
Temperature can affect the behaviour of components. Even the relationships we use in our calculations
may therefore differ from the behaviour of the actual physical system.

For example, we may theoretically expect a sensor to produce a particular electrical output at a
given temperature. In reality, the sensor may produce a slightly different value. This means that a
theoretical relationship such as **Temperature → Sensor output → ADC code** may not exactly match
what we observe in the real system.

[[ask]] Go back along the path we walked yesterday. At each stage, name one way the real part
departs from its nominal behaviour.

[[pause]]
```

***

## Calibration: compare with a known reference

Calibration establishes or verifies the relationship between an instrument's indication and a known
reference, repeated at several points across the range. Plotted against the inputs, the results form
the calibration curve.

<!-- PLAN
SHOW (centrepiece) Plot — the calibration table as a data series, reference 0, 25, 50, 75 °C against
         indication 1.8, 26.2, 51.1, 76.5 °C, with the ideal line y = x as a curve, then a linear fit with R²,
         then the residuals (indication − fit) as a second series on their own axis.
         Drive: points → ideal line (every point above it) → linear fit (offset 1.55 °C, slope 0.996,
         R² = 0.9999) → residuals (+0.25, −0.25, −0.25, +0.25 °C).
         Look for: offset and gain read straight off the fitted line, and a bow left over that no straight
         line can take out.
         Status: ready
ASK      poe (before the fit is drawn) — "Work out the error on each row. Is it a constant offset, or does it
         change across the range?"
         options: A constant offset | It grows steadily across the range | It changes, but not steadily |
         There is no real error
         answer: It changes, but not steadily
         reveal: the linear fit, then its residuals
         explain: The errors are +1.8, +1.2, +1.1 and +1.5 °C; a straight line takes out about 1.55 °C of
         offset and a −0.4 % gain error and leaves ±0.25 °C that bends, which is nonlinearity.
         depth: understand    practice: analysing data
HARVEST  S2 — "On Day 1 the child saw sugar, and someone said 'this is called sugar'. Recognition was learnt by
         association. Each row of this table is that moment for our system: what it indicates, paired with
         what a reference says it is."
-->

```flow
Do you remember the child seeing sugar for the first time, on Day 1? Seeing it was not enough. Someone
had to say, "This is called sugar," and the association between what was seen and what it meant was
learnt. Calibration is that same step for a measurement system: learning what an indication means,
against a reference.

**Calibration establishes or verifies the relationship between an instrument's indication and a
known reference.**

For example, suppose we have built a temperature measurement system. We can expose the system to a
known reference temperature and compare the system's indication with that reference. We might then
repeat the process at several known temperatures:

(Table on the script panel: Reference temperature · System indication.)

[[ask]] Work out the error on each row. Is it a constant offset, or does it change across the range?

[[pause]]

The differences between the reference values and the system's indications tell us something about
how the actual system behaves. We can then use this information to establish a more accurate
relationship between the system's indication and the quantity being measured. That relationship may
subsequently be used by the measurement system to **compensate or correct its readings**. For
example, the system may determine that its readings consistently contain an offset, or that the error
changes across the measurement range. The software or hardware can then apply an appropriate
correction.

Done carefully, this is **static calibration**: we keep all the sensor's inputs constant except the
one being studied, and change that input slowly, so that it takes successive constant values along
the measurement range, recording the results each time. Plotted against the input values, those
results form the **calibration curve**. A sensor's accuracy is determined through static calibration.

Calibration may therefore involve determining:

- **Offset errors**
- **Gain or sensitivity errors**
- **Nonlinearity**
- **Temperature-dependent behaviour**
- **Other systematic measurement errors**

The exact calibration process depends on the instrument and the quantity being measured.
```

***

## What two points can fix

Offset and gain errors are separately correctable; INL and DNL are not. Two-point calibration
measures offset and gain, and the firmware stores the constants.

<!-- PLAN
SHOW     Coding Bench — `two-point`: a modelled temperature channel whose raw indication follows the table
         (offset, a −0.4 % gain error, a small bow), plus a V_ref setting; the program takes two reference
         points, computes and stores offset and gain, and prints corrected readings at 0, 25, 50 and 75 °C with
         their errors. Drive: points at 0 and 75 °C (errors 0, −0.5, −0.5, 0 °C) → points at 25 and 50 °C
         instead (+0.5, 0, 0, +0.5 °C) → V_ref set 1 % high: every raw voltage 1 % low → recalibrate: back.
         Look for: two constants removing the line's errors wherever the points are put, and the bow moving
         to wherever they are not.
         Status: needs Coding Bench: `two-point`
ASK      poe (before the statement) — "How many known reference points do you need to correct an offset? And
         an offset and a gain error?"
         options: 1, then 2 | 2, then 2 | 1, then 3 | 2, then 4
         answer: 1, then 2
         reveal: the program solving for its constants
         explain: An offset is one unknown and needs one known point, and a gain error adds a slope, so the
         straight line needs two.
         depth: understand    practice: developing models
ASK      numeric (after the demo) — "Calibrate at 0 °C and 75 °C, where the system indicated 1.8 and 76.5 °C.
         What does the corrected system read at the 50 °C reference, where it indicated 51.1 °C?"
         answer: 49.5 °C ± 0.05 °C
         reveal: the program's corrected column
         explain: Gain = (76.5 − 1.8) / 75 = 0.996 with offset 1.8, so (51.1 − 1.8) / 0.996 ≈ 49.5 °C, and the
         0.5 °C left over is the bend that two points cannot straighten.
         depth: use    practice: computational thinking
HARVEST  S21 — "Yesterday: offset and gain shift and tilt the line, INL and DNL bend it. Two points put the
         line back. The bow left behind is this system's INL, and no pair of constants removes it."
HARVEST  S22 — "Reference error passes through one-for-one, we said: a reference 1 % high makes every reading
         1 % low. That is a pure gain error, so the gain constant absorbs it."
SEED     plants S55 — "Keep this card's question for the lab: which of the errors we inject can two points
         remove, and which will still be there afterwards?"
-->

<!-- FILLED 2026-10-07: drafted from training-overview Day 2 Module 4; tutor to review -->

```flow
[[ask]] How many known reference points do you need to correct an offset? And an offset *and* a gain
error?

[[pause]]

[[demo]] Firmware sandbox — two reference points in, two constants out, and the corrected readings
across the whole range.

[[reveal]] One point for an offset. Two for an offset and a gain. A straight line has two unknowns,
where it starts and how steeply it rises, so it needs two known points.

Here the program measured two references, 0 °C and 75 °C, solved for the offset and the gain, and
stored the two constants. Every reading after that is corrected with them.

[[ask]] At 50 °C the system indicated 51.1. What does the corrected system read?

[[pause]]

The gain is 76.5 minus 1.8, over 75: about 0.996. The offset is 1.8. So 51.1 minus 1.8, divided by
0.996, is about 49.5 °C. Two points put the line back, and half a degree is left in the middle.

[[demo]] Move the two points to 25 and 50 °C, and the half degree moves to the ends instead. That
leftover is the bend we saw on the plot, and two constants cannot straighten a bend.

Yesterday we read an ADC's error table: offset and gain shift and tilt the line; INL and DNL bend it
and make its steps unequal. Offset and gain are separately correctable. INL and DNL are what remains.

[[demo]] One more. Set the reference 1 % high, and every raw voltage reads 1 % low: reference error,
passing through one-for-one. Recalibrate, and the gain constant absorbs it.

Keep this question for the lab: which of the errors we inject can two points remove, and which will
still be there afterwards?
```

***

## Calibration is not correction

Calibration establishes how the instrument behaves relative to a reference; correction uses that
knowledge to compensate. A calibrated system has not made every error disappear.

<!-- PLAN
SHOW     Draw — Reference → Compare → Characterise error → Establish relationship → Apply correction, five
         boxes drawn left to right, the last arrow dashed (if required).
         Status: needs Draw: calibration chain, five boxes, last arrow dashed
ANALOGY  A watch you find is three minutes fast. Finding that out is calibration; adding three minutes in your
         head, or setting the watch, is correction, and you might do neither. It maps the separation; it breaks
         because a watch's error is a pure offset, with no gain and no bend.
-->

```flow
Calibration is not simply "making the reading correct". It is useful to distinguish **calibration**
from **correction**.

Calibration establishes or verifies how the instrument behaves relative to a reference. Correction
uses that established information to compensate for the observed behaviour. In other words:

**Reference → Compare → Characterise error → Establish relationship → Apply correction, if required**

A calibrated system therefore does not necessarily mean that every error has magically disappeared.
Rather, we have gained a better understanding of the relationship between the instrument's indication
and the quantity being measured, and we can use that information to improve the measurement result.
```

***

## Code, indication, corrected value, result

ADC code 3102 → calculated indication 72.4 °C → calibration correction → measurement result 71.8 °C.
The number from the ADC is not automatically the final measurement.

<!-- PLAN
SHOW     Figure — the chain 3102 → 72.4 °C → calibration correction → 71.8 °C, with numbered labels (code,
         indication, corrected result) hidden until after the prediction.
         Status: needs asset: chain SVG with three hidden labels (ours to draw)
ASK      poe (before the labels appear) — "3102, 72.4 °C, 71.8 °C: which one is the measurement result?"
         options: 3102 | 72.4 °C | 71.8 °C
         answer: 71.8 °C
         reveal: the Figure's labels
         explain: 3102 is the code, 72.4 °C the indication scaling computes from it, and 71.8 °C what remains
         after the calibration correction is applied.
         depth: use    practice: constructing explanations
-->

```flow
This is one reason we must distinguish between the **raw signal**, the **raw digital code**, the
**indication**, the **corrected value** and the **calibrated measurement result**. They are not
necessarily interchangeable terms.

[[ask]] Here is a chain of numbers from one measurement. Before I label them: which one is the code,
which is the indication, and which is the result?

[[pause]]

**Sensor output → electrical signal → ADC code: 3102 → calculated indication: 72.4 °C → calibration
correction → measurement result: 71.8 °C**

The exact sequence will depend on the measurement system, but the important idea is that the number
coming directly from the ADC is not automatically the final measurement. The ADC gives us a **digital
representation of the electrical signal**. The processing system then interprets that representation
using the sensor characteristics, system configuration, scaling information and calibration
information to produce a meaningful measurement result.

Therefore: **calibration helps establish how the real measurement system relates its indication to
the quantity we are trying to measure.** And this is another important part of the journey from:

**Physical quantity → Sensor → Electrical signal → Signal conditioning → ADC → Digital code →
Processing → Measurement result**
```

***

## Four ways to write one conversion

The conversion arithmetic itself throws bits away: dividing before multiplying, intermediate
overflow, and floating point on a part with no FPU.

<!-- PLAN
SHOW     Coding Bench — `four-ways`: one conversion, code → millivolts at 3.3 V and 12 bits, written four ways
         and run on a modelled 8-bit target with 16-bit `int` and no FPU:
         (A) `code / 4096 * 3300`  (B) `code * 3300 / 4096` in 16-bit `int`
         (C) `(uint32_t)code * 3300 / 4096`, and its no-divide twin `((uint32_t)code * 52800) >> 16`
         (D) `code * 3.3f / 4096.0f * 1000.0f`
         each with its result for code 3102, the exact 2499.17 mV, the error and a cycle count.
         Drive: the four listings → the prediction → live results → sweep the code from 0 to 4095 and plot each
         version's error. Look for: A gives 0 for every code; B gives 3 mV (the product, 10,236,600, wrapped at
         65,536); C gives 2499 mV, within 1 mV, at integer cost; D gives 2499.17 mV at many times C's cycles.
         Status: needs Coding Bench: `four-ways` (16-bit `int` target model, software float, cycle counts,
                 error sweep)
ASK      multi-select (before the live errors) — "Which of the four return 2499 mV for code 3102, to within
         1 mV?"
         options: A | B | C | D
         answer: C | D
         reveal: the live results column
         explain: A divides first and the integer 3102 / 4096 is 0, B's product does not fit in 16 bits, C keeps
         it in 32 bits and D in floating point, which a part with no FPU pays for in cycles.
         depth: understand    practice: computational thinking
HARVEST  S54 — "In oversampling, 256 samples needed a twenty-bit sum. Here is the same trap in the conversion: a
         product that outgrows its variable, silently."
FAULT    Version B in production: small, plausible readings (3 mV) and no error flag anywhere; found by
         checking one code by hand.
-->

<!-- FILLED 2026-10-07: drafted from training-overview Day 2 Module 4; standard C integer-arithmetic behaviour on a 16-bit-int target; tutor to review -->

```flow
There is one more place the number can be spoilt, and it is the last place anyone looks: the
arithmetic.

[[demo]] Fixed-point precision-loss sandbox — the same conversion written four ways.

[[ask]] Which of these four loses precision, and which is exact? Commit before I switch on the live
error.

[[pause]]

[[reveal]] Two of the four give 2499 mV. Look at why the other two do not.

Version A divides first. In integer arithmetic, 3102 divided by 4096 is zero, so the answer is zero,
for every code the converter can produce.

Version B multiplies first, which is the right order, but on an 8-bit part an `int` is 16 bits.
3102 × 3300 is 10,236,600, and a 16-bit variable holds at most 65,535. The product wraps round and
the answer comes out as 3 mV. No error, no warning: just a small, plausible number.

Version C does the same multiplication in 32 bits: 2499 mV, within a millivolt, for the cost of one
integer multiply and one divide. Because 3300 / 4096 × 65,536 is exactly 52,800, you can even replace
the divide with a multiply by 52,800 and a shift right by sixteen.

Version D uses floating point: 2499.17 mV, more digits than the converter supports. But on a part
with no FPU every float operation is a software routine. [[demo]] Look at the cycle counts.

So the rules are short. **Multiply before you divide. Make the intermediate big enough to hold the
product. Use floating point on a part without an FPU only when you can afford the cycles.** In
oversampling, 256 samples needed a twenty-bit sum. Here is the same trap: a product outgrowing its
variable, silently.

[[transition]] That is every stage of the DC path, from the quantity to a number with a unit, checked
against a reference. We have walked it one stage at a time. Now we walk it end to end, in one go,
and see whether the number we earn lands where Day 1's uncertainty budget said it would.
```
