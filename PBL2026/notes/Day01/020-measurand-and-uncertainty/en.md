---
targetMinutes: 30
motivates: Two instruments disagree about the same voltage, and neither tells you which one to believe.
objectives:
  - Name the measurand of a measurement, and say whether the measurement is direct, indirect or null.
  - Tell accuracy from precision, and decode a meter specification such as ±(0.5 % of reading + 3 counts).
  - Combine the tolerances along a chain as a worst case and as a root-sum-of-squares.
concepts: [measurand, measurement-error, uncertainty-budget]
---

# The measurand, and what "right" means

<!-- PATH: [ QUANTITY ] → sensor → conditioning → ADC → firmware → number
     TOOL: Plot (centrepiece: two instruments' readings as bell curves against a hidden true value) ·
           Equation (the meter-spec band; RSS against worst case — replaces the tolerance stack-up
           widget) · Electronics (bridge-null, for a null measurement) · Draw (four targets; the error
           categories pinned on the path) · Figure (a DMM front panel and its spec page).
     SOURCES: transcripts/Chapter 02 - Measurement fundamentals.md (first half);
              categories_of_measurement.md; Chapter 13 - factors_in_making_measurements.md;
              Chapter 15 - measurement_errors.md; 08_static_characteristics_of_mesurement_systems.md;
              Chapter 14 - what_is_average.md (RSS); training-overview.md Day 1 Module 2. -->

## The measurand

Before we can measure, there has to be something to measure. The measurand is the quantity we
intend to determine, not the number the instrument happens to display.

<!-- PLAN
SHOW     none — the question does the work, and the statement lands after it.
ASK      flash (before the statement) — "You want the electrical resistance of a copper wire. What exactly is
         the quantity you are trying to determine?"
         options: the number the ohmmeter displays | the resistance of the wire | the resistance of the wire,
                  at a stated temperature and between stated points | the resistivity of copper
         answer: the resistance of the wire, at a stated temperature and between stated points
         explain: Copper's resistance changes by about 0.4 % per °C, and with where you clamp it, so the
                  quantity is not defined until its conditions are.
         depth: understand    practice: defining problems
-->

```flow
Before we can measure, there has to be something — a property, a quantity, a condition or an
event — that we want to quantify or detect.

The function of a measurement system is essentially to get information about a property or quantity
of interest and, where appropriate, express that information as a numerical result.

We will mostly call this the **physical quantity**. It could be the amount of light an object emits,
the colour of the light, the weight of an object, how fast it is moving, how hot something is. The
approach, technique, instrument and method we use depend greatly on the nature of the quantity we
want to measure.

The science of measurement is called **metrology**. We measure for many reasons, such as:

- process monitoring, e.g. monitoring the temperature of a system;
- process control, e.g. controlling the water level in a tank;
- experimentally verifying a theory;
- verifying the results of computer simulations;
- characterising a system or component;
- comparing the performance of different systems.

[[ask]] Suppose we want to determine the electrical resistance of a copper wire. What exactly is the
quantity we are trying to determine?

[[pause]]

In any measurement, the specific quantity we intend to measure is called the **measurand**. It is the
quantity we intend to determine through the measurement, rather than simply the number the instrument
displays.

If we want to determine the electrical resistance of a copper wire under specified conditions, the
**resistance of the copper wire under those conditions** is the measurand.
```

***

## A measurement must not depend on who made it

A result should be objective, follow a defined method, and be reproducible. When a method is
widely accepted, it becomes a standard.

<!-- PLAN
SHOW     none — the analogy carries it.
ANALOGY  Tasting seawater for saltiness: the coastal taster and the Savannah taster disagree, and an
         operational definition takes the taster out of the result. Where it breaks: a standard method
         removes the observer, not the instrument. Two meters following the same standard still disagree by
         their specifications (the meter-spec card, later in this module).
-->

```flow
The results of a measurement should be **objective, based on a defined method, and reproducible**
under specified conditions. The result should not depend simply on who happened to perform the
measurement.

Imagine that we assign a value to the saltiness of a pot of seawater by having people taste it. That
would not give us an objective measurement, because each observer would assign a value based on their
own perception of taste. Someone from the coastal areas of Ghana may assign a different value from
someone who lives in the Savannah regions.

A better approach is to develop a scientific method or procedure that is **standardised,
reproducible, and able to quantify the salinity of the water** in a way that gives comparable results
whoever performs the measurement.

This is what an **operational definition** does: it standardises a measurement clearly and precisely,
so that it stays consistent across many trials. Operational definitions are used throughout science
and technology. When one becomes widely accepted, or is published by a recognised authority, it
becomes a **standard**. You may see a procedure listed as "performed in accordance with NIST
XXXX.XXX" or "ANSI Standard XXX". That notation means whoever made the measurement followed a
published standard.
```

***

## Direct, indirect and null

Direct: read the quantity from the instrument. Indirect: measure something related and calculate.
Null: adjust a known reference until the difference reads zero.

<!-- PLAN
ASK      flash (before the statement) — "A voltmeter across a resistor. The voltage across a known resistor,
         divided by its resistance. A potentiometer balanced until a galvanometer reads zero. Which kind of
         measurement is each?"
         options: direct, indirect, null | indirect, direct, null | direct, null, indirect |
                  null, indirect, direct
         answer: direct, indirect, null
         explain: The voltmeter's indication is the quantity; the current is calculated from a voltage and a
                  known resistance; the potentiometer's setting is read at the point where a difference
                  reads zero.
         depth: use    practice: constructing explanations
SHOW     Electronics — bridge-null: two divider arms on 10 V, a meter across the midpoints, R4 at 1k2 against
         three 1 kΩ arms.
         Drive: read the imbalance; take R4 back to 1 kΩ.
         Look for: the meter going to zero, and R4's setting being the answer — a null measurement.
         Status: ready (bridge-null fixture).
SEED     plants S37 — "Indirect: a voltage across a known resistance, and Ohm's law. That is a current sensor,
         and after the break it gets a module of its own."
-->

```flow
Depending on the nature of the quantity, a measurement can be **direct**, **indirect** or **null**.
Electronic instruments exist in all three categories.

[[ask]] I connect a voltmeter across a resistor. I measure the voltage across a known resistor and
divide by its resistance. I balance a calibrated potentiometer against an unknown voltage until a
galvanometer reads zero. Which kind is each?

[[pause]]

A measurement is **direct** when the quantity we want is obtained directly from the instrument's
indication. The instrument is designed to give an indication corresponding directly to the quantity
being measured. If you connect a voltmeter across a resistor and it displays **5.1 V**, the voltage
comes directly from the instrument. A metre rule held against an object is the classic example: the
measurand is compared directly with a calibrated standard.

In an **indirect** measurement you do not determine the quantity directly. You measure one or more
quantities that are related to it and use that relationship to determine the quantity of interest.
To measure current, instead of using an ammeter you could measure the voltage across a known
resistance and compute the current using Ohm's law, I = V/R.

Indirect methods are often considered "second best" for accuracy, but they are used when a direct
measurement is difficult or dangerous. You might measure the temperature of a point on the outside
wall of a furnace melting metal, knowing that the outside temperature is related to the inside one by
a certain factor. The most common example is human blood pressure measured with a cuff around the arm,
a process called sphygmomanometry. Direct blood-pressure measurement may be more accurate, but it is
an invasive surgical procedure.

**Null** measurements compare a calibrated source with the unknown measurand, then adjust one or the
other until the difference between them is zero. An electrical potentiometer is such an instrument: an
adjustable, calibrated voltage source and a comparison meter, a zero-centre galvanometer. The reference
voltage is applied to one side of the galvanometer (or one input of a difference-measuring voltmeter)
and the unknown to the other. The potentiometer is adjusted until the meter reads zero difference. The
potentiometer's setting at the null is then the unknown voltage.
```

***

## Error is not a mistake

Error is the difference between the indicated value and the true value. Every measurement has
some, and it is no one's fault. The true value itself can never be known exactly.

<!-- PLAN
SHOW     none — the words carry it; the next card's Plot shows readings clustering round a central value.
-->

```flow
The "goodness" of a measurement involves several important concepts. The most significant are
**error, validity, reliability, repeatability, accuracy, precision and resolution**. We take them in
that spirit — as the vocabulary of trust — over the next few minutes, and resolution when we reach the
converter.

They are part of what are called the **static characteristics** of a measurement system. In some
measurement systems, the quantity changes so slowly that we only need to know the static
characteristics of the sensors. The static characteristics also influence the dynamic behaviour — the
behaviour when the measured quantity changes with time — but describing the two together
mathematically is complex, so static and dynamic behaviour are studied separately. These concepts are
not exclusive to sensors: they are common to all measuring instruments.

In all measurements there is a certain degree of error present. Error, in this context, refers to
random variation, and in no way to "mistakes".

No measurement is perfect, and measurement apparatus is never ideal, so there will always be some
error. An **error** is the deviation between the actual value of a measurand and the value indicated
by the sensor or instrument.

Error is inherent. It is **not** the fault of the person making the measurement, and it is not the
same as a mistake. Understanding error can greatly improve how effectively we measure.

The true, exact or ideal value is the value a perfect measurement would give, and exact values are by
nature indeterminate. In practice we use a **conventional true value**: the value attributed to a
quantity, and accepted by convention as having an uncertainty appropriate for the purpose.

If repeated measurements are made of a parameter that is truly unchanging — or with different
instruments or operators — they tend to cluster around a central value. The error is the difference
between the measured value and the true value. Assuming that the central value of a series of
measurements is the true value is only valid when the error is small.

Error can be expressed in **absolute** terms, such as X ± x cm, or on a **relative** scale, such as
X ± 1 %.
```

***

## Accuracy is not precision

An accurate measurement has its mean close to the true value. A precise one has a small spread
under repeated trials. You can have either without the other.

<!-- PLAN
ASK      multi-select (before the statement) — four targets on the wall, A to D. "Which of these show precise
         shooting?"
         options: A, a tight group on the bull | B, a tight group off to one side | C, a wide scatter centred
                  on the bull | D, a wide scatter off to one side
         answer: A and B
         reveal: the Plot below, moved through the same four cases.
         explain: Precision is the spread alone, so both tight groups are precise whether or not they sit on
                  the bull; accuracy is where the middle of the group sits.
         depth: understand    practice: analysing data
SHOW (centrepiece) Plot — two instruments' readings of one voltage as bell curves exp(−(x−μ)²/2σ²), labelled
         "handheld" and "bench", with the true-value marker hidden at first. Sliders: μ and σ for each.
         Drive: the motivates line first — two curves, no truth: "which do you believe?"; reveal the true
         value (the narrow curve sits off it); then walk one curve through A → B → C → D.
         Look for: moving μ changes accuracy and leaves the width alone; moving σ does the reverse.
         Status: ready (Plot) · needs Draw: the four targets (or an SVG figure).
         Values (owner, 2026-10-08): true value 1.0000 V; handheld μ 1.0010 V, σ 2.0 mV; bench μ 1.0040 V,
                 σ 0.15 mV, labelled "out of calibration"; axis 0.985–1.015 V. The Plot cannot yet hide a
                 marker, so the truth is a slider-scaled curve held at zero until the reveal.
                 Spec: bench-work/specs/D1-020-05-accuracy-precision.md.
-->

<!-- Resolution, the third word that gets confused with these two, is met at the converter (080),
     where the number of bits sets it. -->

```flow
[[ask]] Look at these four targets. Which of them show accurate shooting, and which show precise
shooting?

[[pause]]

The **accuracy** of a measurement refers to its freedom from error, or the degree of conformance
between the measurand and the standard: how close the measured results are to the true value.

**Precision**, on the other hand, refers to the exactness of successive measurements — how tightly
they agree with each other. Accuracy and precision are often confused, and the words are often wrongly
used interchangeably.

One way to state the difference: a precise measurement has a small standard deviation and variance
under repeated trials, while in an accurate measurement the mean of the distribution is close to the
true value. The standard deviation, the square root of the variance, is a good indication of a
measurement's precision.

[[demo]] Plot Bench: move the mean and the spread independently against the true value.

A good measurement has both good accuracy and good precision.

There are practical techniques that reduce the effect of error on a measurement. Make the measurement
several times using different instruments, if possible. When using instruments such as rulers or
analog meters, make successive measurements on different parts of the scale. And make the measurement
a large number of times and average the results — a technique the firmware will do for us on Day 2.
```

***

## Repeatable is not the same as right

An instrument can return the same value every time and still be wrong. Validity asks whether it
measures what it claims to, and over what range.

<!-- PLAN
SHOW     Plot — the same Plot, one curve narrowed to a spike and parked well off the true value: every trial
         identical, every trial off.
         Look for: a reading repeatable to the last digit, in the wrong place.
         Status: ready.
-->

```flow
**Repeatability** is the ability of an instrument to return the same value when it is repeatedly
exposed to exactly the same stimulus.

**Reliability** is the consistency of a measurement across different trials, when the measurand may
take very different values. Take a pressure sensor built on a diaphragm: a deformation of the
diaphragm may change its characteristics enough to alter future measurements of the same pressure.

Neither reliability nor repeatability is the same as accuracy. A measurement can be both reliable and
repeatable while being quite wrong.

**Validity** is how well an instrument actually measures what it claims to measure. An electronic
pressure sensor may actually be measuring the deflection of a thin metal diaphragm of known area,
which is in turn measured by the strain on a strain gauge cemented to the diaphragm. What decides the
validity of the measurement is how well that deflection relates to the applied pressure — and over
what range, and under what conditions. Many devices give readings that are meaningful only under
specified conditions or over a specified range.
```

***

## Where error comes from

Theoretical, static, dynamic, and insertion errors. Each of them has a home on the path, and the
course meets each one where it happens.

<!-- PLAN
SHOW     Draw — the path drawing with the four categories pinned where the course meets them: theoretical
         (the sensor's model; linearization, Day 2·050), static (reading, environmental, characteristic:
         offset and gain at 060 and 080), dynamic (the ADC input, 070), insertion (040 and 050); plus
         quantization (080) and the bobbling last digit (Day 2·030).
         Drive: one pin per Flow paragraph.
         Status: needs Draw (pins over the path drawing).
SEED     plants S6 — "Insertion error: the act of measuring changes the measurand. After the break it bites
         twice, once at the sensor's output and once in the ammeter."
SEED     plants S7 — "And the last digit on a digital display, the one that won't sit still: keep an eye on
         it. Tomorrow it turns out to be noise, and then something we can use."
-->

```flow
There are four general categories of error: **theoretical**, **static**, **dynamic**, and
**instrument insertion** error.

**Theoretical error.** Every measurement is based on some measurement theory that predicts how a value
will behave when a certain measurement procedure is applied. That theory is usually based on a
theoretical model of the phenomenon being measured — an intellectual construct that tells us something
of how the phenomenon works. Often the model is valid only over a specified range. A nonlinear
phenomenon — quadratic, cubic or exponential — can be treated as a straight line over small, carefully
selected sections of its range, and electronic sensor outputs often fall into this class. Alternatively,
the actual phenomenon may be terribly complex, or even chaotic under the right conditions, so the model
is simplified for practical measurements. The equation used as the basis of a measurement theory may be
only a first-order approximation of the actual situation.

**Static errors** stay even in an unchanging system; they are not functions of time or frequency.
They include:

- **Reading errors**, from misreading the display. Reading an analog meter's pointer from an angle
  instead of straight on gives a parallax error. Guessing the value between two marks gives an
  interpolation error. A pointer too broad for the scale covers several marks at once.
- **Environmental errors**: temperature, pressure, electromagnetic fields and radiation can affect a
  sensor's output.
- **Characteristic errors**, which belong to the instrument or process itself: zero offset, gain
  error, processing error, linearity error, hysteresis, repeatability error, resolution error — and
  deficiencies of design or manufacture.

**Dynamic errors** arise when the measurand changes during the measurement, and **insertion errors**
when the act of measuring changes what is measured.

We will not study these as a list. Each of them lives at a particular stage of the path, and we meet
each one where it happens: insertion error when the sensor meets its load (040) and when an ammeter
is put in a circuit (050); dynamic error at the ADC's input (070); quantization error at the converter
(080); the bobbling last digit when the code reaches the firmware (Day 2).
```

***

## Reading a meter's specification

±(0.5 % of reading + 3 counts) is two errors added: one that scales with the reading, and one fixed
at the last digit. Near the bottom of a range, the counts dominate.

<!-- PLAN
ASK      numeric (before the reveal) — "A 3½-digit meter on its 2 V range reads 1.000 V. Its specification is
         ±(0.5 % of reading + 3 counts). How far either side of the reading does the band reach, in mV?"
         answer: 8 mV ± 0.5 mV    (the band is 0.992 V to 1.008 V)
         reveal: the Equation below, evaluated at 1.000 V, then dragged down the range.
         explain: 0.5 % of 1.000 V is 5 mV; one count on a 1999-count 2 V range is 1 mV, so three counts
                  add 3 mV.
         depth: use    practice: computational thinking
SHOW     Equation — U = p·reading + n·count, with p = 0.5 %, n = 3 and one count = 1 mV, graphed as U/reading
         against the reading from 0.05 V to 1.999 V.
         Drive: evaluate at 1.000 V (±8 mV, 0.8 %); slide to 0.100 V (±3.5 mV, 3.5 % of the reading).
         Look for: the curve climbing toward the bottom of the range, where the counts take over.
         Status: ready. Then Figure — a handheld DMM's front panel and its spec page, toured: needs asset
                 (photo + spec-sheet page). Do not mix in the Electronics budget-DMM profile: it is
                 ±(0.5 % + 2 counts), a different meter.
                 The meter (owner, 2026-10-08): our own design of a 3½-digit handheld, no brand or model
                 name: 1999 counts, DC 200 mV / 2 V / 20 V / 200 V / 600 V, ±(0.5 % + 3), values of the real
                 class (the spec cites their source). The Equation adds a third example, 0.100 V on its
                 200 mV range (±0.8 mV, 0.8 %). The Figure goes on a card of its own straight after this one
                 (a card holds one Canvas block), toured without new Flow; that card is still to write.
                 Spec: bench-work/specs/D1-020-08-meter-specification.md.
SEED     plants S36 — "The meter you check your MCU against has a band of its own. When the two disagree, the
         first question is whose band you are standing in."
-->

<!-- FILLED 2026-10-07: drafted from training-overview Day 1 Module 2 and standard DMM-specification practice; tutor to review -->

```flow
[[ask]] A 3½-digit meter on its 2 V range reads 1.000 V. Its specification is ±(0.5 % of reading + 3
counts). What is the band the true value lies in?

[[pause]]

[[demo]] Let's take the specification apart on the Equation Bench. It is two errors added together.

The first scales with the reading: 0.5 % of 1.000 V is 5 mV.

The second is fixed, in counts of the last digit. On a 3½-digit meter's 2 V range the display runs up to
1.999, so one count is 1 mV, and three counts are 3 mV.

[[reveal]] Add them: ±8 mV. The true value lies somewhere between 0.992 V and 1.008 V, and the meter
cannot tell you where.

Now slide the reading down to 0.100 V. The percentage part shrinks to half a millivolt, but the counts
stay at 3 mV. The band is ±3.5 mV — 3.5 % of the reading. Near the bottom of a range the counts
dominate, which is why you choose the lowest range that still holds the reading.

Remember this meter. It is the instrument you will check your microcontroller against, it has an
uncertainty of its own, and you can calculate it. When the two disagree, the first question is whose
band you are standing in.
```

***

## Stacking tolerances along the chain

Worst case assumes every error lines up in one direction. If the errors are independent and
random, they combine as the root of the sum of the squares. The error budget shares out what
the purpose can afford.

<!-- PLAN
SHOW     Equation — worst case Σ|eᵢ| beside RSS √(Σeᵢ²), with a worked example on the Day 1 path: sensor
         ±0.5 %, divider ±1 %, reference ±1 %, ADC gain ±0.5 %; then graphed against the number of equal terms
         N (N·e against √N·e). Replaces the tolerance stack-up widget.
         Drive: add the four stages one at a time; then the N graph.
         Note (owner, 2026-10-08): one Equation graphs one statement, so the N graph is carried by the
                 derivation's running totals (worst case beside RSS at each stage).
                 Spec: bench-work/specs/D1-020-09-stacking-tolerances.md.
         Look for: worst case ±3.0 % against RSS ±1.58 %, the gap widening as stages are added.
         Status: ready.
ASK      numeric (before the worked example evaluates) — "Four independent errors: ±0.5 %, ±1 %, ±1 % and
         ±0.5 %. What do they combine to as a root-sum-of-squares?"
         answer: 1.58 % ± 0.05 %
         reveal: the worked example evaluates.
         explain: The squares are 0.25 + 1 + 1 + 0.25 = 2.5, and the root of 2.5 is 1.58; independent errors
                  rarely line up, so the RSS sits near half the worst case of 3.0 %.
         depth: use    practice: computational thinking
ASK      checkpoint (after the reveal) — "Your budget": 1 take the stages from your 010 suspect list ·
         2 give each an allowance · 3 combine them worst case and RSS · 4 save it — the DC lab (Day 2·060)
         has to land inside it.
         depth: create    practice: planning investigations
SEED     plants S5 — "Keep this budget. Tomorrow the lab walks the whole path, and its final error has to land
         inside the window you just drew."
-->

```flow
An **error contribution analysis** identifies and quantifies every source of error in a system. We
then decide which errors are random and make a **worst-case** analysis.

In the worst case, you assume that all the component errors are biased in one direction and at their
maximum. Then you ask what that would mean for the purpose of the measurement if the errors did line
up like that, even if it is unlikely. Do the worst case on both the positive and the negative side of
the nominal value.

Then you create an **error budget**: you allocate an allowable error to each part of the measurement
system, so that the overall error is not too high for the intended use.

If the errors are independent of each other, random rather than biased in one direction, and of the
same order of magnitude, you can take the **root of the sum of the squares (RSS)** and use it as a
composite error term in planning the measurement system. RSS is how data that are in no way correlated
are combined into a single number. Independent error terms, like independent noise sources, cannot
simply be added; they combine as RSS. The RSS term is a reasonable estimate of the combined effect of
the individual error components.

[[demo]] Equation Bench: add each stage of the path and watch the worst-case band and the
RSS band grow.

Keep the budget you build here. On Day 2, the DC lab walks the whole path and its final error has to
land inside this window.

[[transition]] We know what we want to measure and what "right" would mean. But the quantity is
temperature, or pressure, or light, and our circuits only understand electricity. Remember the eye:
before the brain could interpret anything, a sense organ had to turn light into signals. Our
measurement system needs its own sense organ — the sensor.
```
