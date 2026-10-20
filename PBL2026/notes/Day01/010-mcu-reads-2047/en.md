---
targetMinutes: 15
motivates: A sensor, a divider, an ADC pin and three lines of firmware produce 2047 — and nothing anywhere says the number is wrong.
objectives:
  - Trace a measurement from the physical quantity to a firmware variable, naming each stage it passes through.
  - Say why a number that appears is not the same as a number you have earned.
concepts: [measurement-chain]
---

# Your MCU reads 2047 — what is that?

<!-- PATH: [ QUANTITY → SENSOR → CONDITIONING → ADC → FIRMWARE → NUMBER ]  — the whole path, seen once.
     TOOL: Electronics (centrepiece: the cold-open divider into an ADC input, truth hidden — Demo #1;
           today the budget DMM stands in for the ADC) · Draw (the course path, kept all course; the
           eye's three stages laid over it) · Model (the eye, standing in for the 3D Animation Bench).
           Coding Bench (ideal: the three lines of firmware run against the circuit).
     SOURCES: transcripts/Chapter 01 - The need for sensing.md; Chapter 04 - Data domains.md;
              Chapter 06 - Data conversion.md §11; training-overview.md Day 1 Module 1. -->

## The number is confidently wrong

A sensor, a divider, an ADC pin and three lines of firmware report a reading.
The code runs, the number appears, and it is wrong by 8 %.

<!-- PLAN
SHOW (centrepiece) Electronics — the cold-open circuit (Demo #1): a sensor output of 3.585 V into two 100 kΩ
         resistors, the midpoint wired to an MCU ADC pin (12-bit, Vref 3.3 V; R_on 1 kΩ, C_s 10 pF; the
         previous channel at 0 V; acquisition window ≈ 1.29 µs, about 2.5 time constants). Beside it, the
         three lines of firmware as {font=mono} paragraphs (no code block survives on the wall):
         raw = adc_read(CH0);  v = raw * 3.3 / 4096;  printf("%d %.3f
", raw, v);
         The code readout shows 2047 and the console prints "2047 1.649": two confident numbers, both
         wrong. The reading-against-truth pane is hidden.
         Note: the converter truncates (as D1·080's SAR does). The truth pane shows the ideal for the pin,
         ≈ 2225 (2224.9); a fully settled reading would be 2224. (Owner, 2026-10-08.)
         Drive: show the circuit and the code → take the ASK → switch on the truth pane at the pin.
         Look for: 2047 beside 2225 (1.79 V, what the pin's voltage should give), and nothing anywhere on
         the screen flagging a problem.
         Status: needs Electronics: ADC-input block (switch R_on, sampling capacitor, acquisition window,
                 code readout, truth pane) · needs Coding Bench: the three-line firmware run against it.
                 Today: Draw stands in (`cold-open.benchdrawing`: the circuit, the readout, then the truth
                 pane, with the numbers computed in the spec). The budget DMM cannot stand in: on this
                 100 kΩ divider its 10 MΩ input reads only 0.5 % low. (Owner, 2026-10-08.)
                 Spec: bench-work/specs/D1-010-01-confidently-wrong.md.
ASK      poe (before the statement) — "Here is the circuit and here is the code. Is 2047 right?"
         options: right to within a count or two | right to within 1 % | off by more than 5 % |
                  no way to tell from what is shown
         answer: off by more than 5 %
         reveal: the truth pane: the pin should give 1.79 V → 2225; 2047 is 8 % below it.
         explain: The converter reported 2047 where the true voltage at the pin gives 2225, and no line of
                  the firmware had any way to notice the difference.
         depth: understand    practice: arguing from evidence
         Pair it with a confidence question (how sure, 1 to 5); never scored.
SEED     plants S31 — "I'm not going to tell you why yet. One of today's modules hands you the cause."
FAULT    Converted back-to-back on one channel, the same circuit reads close to 2225 (the capacitor keeps its
         last charge); enable a second channel and 2047 comes back. "It changed when I added a sensor."
-->

<!-- FILLED 2026-10-07: drafted from training-overview Day 1 Module 1; tutor to review -->

```flow
[[ask]] Here is the circuit and here is the code. Is 2047 right? How would you know?

[[pause]]

[[reveal]] Let me switch on the truth. The divider's midpoint should sit at 1.79 V, and on a 12-bit
converter with a 3.3 V reference that is about 2225. We got 2047: 8 % low.

The code ran. The number appeared. Nothing anywhere reported an error. I'm not going to tell you why
yet. One of today's modules hands you the cause.

That is the whole course in one picture: **a number that appears is not the same as a number you have
earned.**
```

***

## A person with no senses

Information is fundamental to how we understand and act on the world. A person with no
functioning senses could not learn from their environment, detect danger, or survive on their own.

<!-- PLAN
SHOW     none — the room's imagination is the canvas; keep the wall to the statement.
ASK      poll, live (before the statement) — "Imagine a person with no functioning sense organs. What would
         they find hardest?"
         options: learning anything new | noticing danger | looking after themselves | all of these, equally
         (no answer: experience and opinion; read two or three chat replies aloud)
         depth: understand    practice: asking questions
-->

```flow
Before we start, I need you to imagine a person without any functioning sense organs. Or, for a
moment, close your eyes and think about what would happen if humans never had eyes.

[[ask]] Imagine, for a moment, a person who has no functioning sense organs. What could you say
about the life of such a person?

One thing is for sure: **information is fundamental to how we understand and interact with the
world.** The more information we can obtain, and the better we are able to connect, interpret and
learn from it, the better we can understand and respond to our environment. This is one of the
reasons AI systems are trained on large amounts of data.

Take a human being. Our sense organs help us interact with and understand our environment. They
detect different stimuli, and the resulting signals travel through the nervous system to different
parts of the brain for processing. Some of this information also contributes, directly or
indirectly, to how we respond to situations, including our fight-or-flight response.

One thing you can be fairly certain of is that a person without functioning senses would have great
difficulty interacting with the environment, learning from it, detecting danger, and surviving
independently.

Humans have five commonly recognised senses: **sight, hearing, smell, taste and touch**, associated
primarily with the eyes, ears, nose, tongue and skin. These organs are not single-purpose. They
perform several functions, although each has functions that are more fundamental to its role.

Take the eyes. With your eyes:

1. You can see the colour of an object.
2. You can detect light and darkness.
3. You can detect motion.
4. You can detect potential danger.
5. With a trained eye, you can even read lips and get information about speech visually.
6. You can estimate the speed and direction of moving objects.

However, the fundamental role of the eye is to **detect light and give the visual system the
information carried by that light**. Many of the other things we do with vision come from how the
visual system processes and interprets this information.
```

***

## Sense organ, pathway, processor

The eye detects light. The optic nerve carries the signal. The brain interprets it. What we
"see" is the brain's interpretation of the information that light carries, not the light itself.

<!-- PLAN
SHOW     Model — the eye with named parts (cornea, lens, retina, photoreceptors, optic nerve) and the visual
         pathway to the visual cortex, toured in the Flow's order. It stands in for the 3D Animation Bench
         "Vision Library" eye-to-brain sequence (production brief below, kept for when that bench exists).
         Drive: one tour stop per Flow paragraph: light in → cornea and lens focus → retina and
         photoreceptors (section view) → optic nerve → visual cortex.
         Look for: the light stops at the retina; only signals travel on.
         Status: needs asset: eye + visual-pathway GLB with named parts and a tour (Model Bench stand-in);
                 the 3D Animation Bench is specified only (M62).
SEED     plants S2 — "Hold on to that child and the sugar. She comes back tomorrow, and this time she is
         holding a reference."
ANALOGY  The eye as a measurement system: organ → sensor, optic nerve → conditioning and wiring, cortex →
         converter and firmware, learning the word "sugar" → calibration. It breaks at the cortex: the brain
         brings memory and the other senses to every interpretation, while a converter brings nothing (S1),
         so every association has to be built into the firmware on purpose.
-->

<!-- PRODUCTION BRIEF (from the original transcript): create and save in the 3D Animations Bench as
     part of the Vision Library. Step-through mechanism so the flow of visual information can be
     sequenced; each stage keyed and pausable so it can be aligned with the slide. Realistic, with
     zooming where it does not distort the visualisation, and zoom into a selected area. Individual
     parts selectable; a selected part opens a modal that highlights it with its explanation. Overlay
     text to highlight and explain particular stages during the lesson. -->

<!-- Keep the sugar story in mind: it comes back on Day 2 (050) as calibration — associating an
     indication with what it means, against a reference. -->

```flow
The human nervous system is responsible for receiving, transmitting and processing information from
our senses. In a typical visual process:

[[demo]] 3D Animation Bench — the eye receiving light from an object, and the visual information
travelling through the visual system to the brain.

The human eye receives light from its environment as a stimulus. But this is not just ordinary
light. The light carries information about the environment.

The **cornea and lens work together to focus incoming light onto the retina**. The retina contains
specialised light-sensitive cells called **photoreceptors**, which respond to the light and start
neural signals. These signals travel through the optic nerve and other parts of the visual pathway to
the areas of the brain involved in vision, where the information is processed.

So what we see is not simply the light itself. What we experience as vision is the result of the
visual system receiving, processing and interpreting the information carried by light.

This means that defects in the eye can affect how the visual information is received. For example,
if the optical system of the eye does not focus the light properly onto the retina, or if the retina
or other parts of the eye are affected, the information the visual system produces may be altered.

But the eye is only one part of the process.

Once the brain receives visual information, it has to process it and make sense of what we are
perceiving. This processing is influenced not only by the information arriving from the eyes, but
also by previous experience, learning, memory, and information from our other senses.

Think about a child seeing sugar for the first time.

The child may see the object, but simply seeing it does not mean the child knows what it is called,
how it tastes, how it smells, or how it feels.

Learning creates these associations.

Someone tells the child, "This is called sugar," and an association begins to form between the
appearance of the object and the name **sugar**. The child can then get more information through the
other senses. How does it taste? How does it smell? How does it feel? Does it make a sound?

Over time, these different pieces of information become connected through learning and experience.
So the next time the child's eyes register a familiar object that looks like sugar, the brain can
draw on that experience to recognise it and anticipate some of its properties.

This is a simplified way of thinking about how humans interface with, and make sense of, our
environment.
```

***

## Three places the information can be spoiled

A defect in the sense organ, in the pathway, or in the processor each changes what we perceive.
The same three places exist in every electronic measurement.

<!-- PLAN
SHOW     Draw — the eye's three stages drawn left to right; the measurement path drawn beneath them; three
         brackets dropped over both rows: sensor | conditioning & wiring | ADC & firmware, each taking a
         "spoiled here" mark as the Flow names it.
         Drive: one step per Flow paragraph (organ, pathway, processor), then the electronic row.
         Look for: the two rows lining up bracket for bracket.
         Status: needs Draw: eye-over-path three-stage drawing (built on the course path drawing).
SEED     plants S3 — "Three places: the organ, the pathway, the processor. Every error we meet in the next
         three days lives in one of them, and tomorrow, in the lab, you'll say which."
-->

```flow
Three things matter here, because each can affect the quality and accuracy of the information that
eventually reaches our perception.

Ignoring for the moment everything to do with the external environment, the **sense organ itself**
can introduce problems. If the eye has a defect, the quality of the visual information reaching the
rest of the visual system can be affected.

The **transmission pathway** can also introduce problems. If there is an issue somewhere along the
nervous pathway carrying the information from the eye towards the brain, the information reaching
the processing areas can be affected.

Finally, the **processing system** can introduce problems. If there is an issue with the parts of the
brain responsible for processing visual information, the way that information is interpreted can be
affected.

Although these are biological processes, they are very like the way we get information from our
environment in order to measure and quantify physical quantities.

A problem with the sensing element can affect the information we obtain. A problem in the path the
information travels can affect what reaches the processing stage. And a problem in the processing
stage can affect the result we finally get.

The same general idea applies to electronic measurement. The components, circuits, techniques and
methods we use can all affect the quality of the information our measurements represent.

This is the business of this training.
```

***

## The path a measurement travels

Temperature → resistance → voltage → ADC code → binary data → software variable → 27.4 °C.
The quantity does not change along the way. How it is represented does, at every step.

<!-- PLAN
SHOW     Draw — the course path built arrow by arrow: Temperature → Resistance → Voltage → ADC code → Binary
         data → Software variable → 27.4 °C, each arrow flashing as a change of form (a domain boundary,
         except Resistance → Voltage, which stays analog electrical; owner, 2026-10-08). This is the
         persistent path diagram: every later module re-embeds it with a focus on its own stage.
         Drive: one step per arrow; all the boundaries flash together on "every boundary … can be spoiled".
         Look for: the quantity never changes; its representation changes at every arrow.
         Status: needs Draw: the course path drawing (course-wide asset). The domain table, if shown, has to
                 be an SVG (tables are dropped on the wall).
                 Design: forms on the nodes, stages on the arrows, one layer per lane, so every later module
                 adds a layer and a variant, never a new drawing (bench-work/specs/D1-010-05-measurement-path.md
                 §3a; owner, 2026-10-08).
-->

<!-- Time: the table is optional live; the chain above carries the idea. -->

```flow
Modern engineering systems are built by bringing different parts of the physical and technological
world together.

A temperature exists in the physical world. A sensor responds to that temperature. The sensor may
produce a small electrical signal. Another circuit may amplify and filter that signal. An
analog-to-digital converter may then turn it into a digital number. A microcontroller processes that
number, software interprets it, and eventually a display may show something such as **27.4 °C**.

Consider that temperature measurement as a path:

**Temperature → Resistance → Voltage → ADC code → Binary data → Software variable → 27.4 °C**

The information about temperature has travelled through several forms. The underlying physical
phenomenon has not changed, but the **way information about it is represented has changed** at every
step.

Each of those forms lives in what we can call a **domain**. The word *domain* has different meanings
in different contexts, but basically it refers to a jurisdiction within which something is valid. In
mathematics, it is the set of values of an independent variable for which a function is valid. In
physics, it is a region where a particular physical property has uniform characteristics.

A **data domain** is the environment or form in which information exists and is represented. An
engineering system may involve several:

(Table on the script panel: Domain · Example.)

These domains are not rigid categories. They are a useful engineering way of thinking about how
information changes form as it travels through a system — and every boundary between two of them is a
place where the information can be spoiled.
```

***

## The ADC does not know what 2047 means

The converter knows its input voltage and its configuration, nothing else. Turning 2047 into
25 °C needs the sensor, the conditioning, the reference, the calibration and the scaling.

<!-- PLAN
SHOW     Draw — the path drawing focused on the converter: "1.65 V → ADC → 2048", with the seven things it
         needs before 2048 can mean 25 °C (sensor, conditioning, reference, configuration, calibration,
         scaling, the sensor's characteristics) hung under the arrows they belong to.
         Status: needs Draw (a focus and an overlay on the path drawing).
         Note: the Flow uses 2048 (1.65 V on a 3.3 V, 12-bit converter: exact mid-scale); the heading's 2047
         is the cold-open reading. Both stand.
ANALOGY  The driver from Kumasi to Accra moves his passengers faithfully and never asks why they travel; the
         converter moves a voltage into a code the same way. It breaks where it matters: a driver might
         notice a passenger at the wrong station, but the converter carries a wrong voltage exactly as
         faithfully as a right one. Nobody checks the ticket.
SEED     plants S1 — "The ADC is the driver. It gets the voltage from Kumasi to Accra and has no idea why it
         travelled. Telling the number what it means is tomorrow's job."
-->

```flow
The ADC itself has no idea what the data it receives and outputs means. Think of a driver taking
passengers from one town to another. He does not need to know why each passenger is travelling. His
business is to move them safely from Kumasi to Accra.

Suppose an ADC gives a microcontroller **2048**. Does that mean 2048 °C? Of course not. The ADC does
not know about Celsius. It knows about its electrical input and its conversion configuration. Like
the driver, it is only concerned with getting its passengers from Kumasi to Accra.

The number has to be interpreted using information about the rest of the path:

**Temperature → temperature sensor → 1.65 V → ADC → 2048 → software → 25 °C**

The ADC has done its job when it has produced the digital representation of its electrical input.
To decide that this representation means 25 °C, we need to know about:

- the sensor
- the signal conditioning
- the ADC reference
- the ADC configuration
- calibration
- scaling
- the sensor's characteristics

This is why **a raw digital value is not automatically an engineering value.**
```

***

## A number that appears is not a number you have earned

Every stage of the path can add error, and almost none of them announce it. This course
locates each one, quantifies it, and fixes it.

<!-- PLAN
SHOW     Draw — the whole path drawing, every stage blank, waiting for the room's marks.
         Status: needs Draw (the path drawing).
ASK      checkpoint (after the statement) — "Your suspect list":
         1 write the stages of the path in order · 2 mark where you suspect the 8 % came from ·
         3 add one sentence: why there · 4 keep it — we open it again at the end of the day (090).
         depth: understand    practice: defining problems
SEED     plants S4 — "A number that appears is not a number you have earned." (Said slowly, once.)
SEED     plants S30 — "Keep that list. At five o'clock we come back to 2047, and you'll fill in every line."
-->

```flow
The objectives of this training are to:

1. Help you understand the conversion of **physical quantities into electrical quantities**.
2. Help you understand the challenges at the **physical-to-electrical conversion interface**, and how
   to reduce their influence.
3. Help you choose the right **measuring components, methods and techniques** for a given physical
   quantity.
4. Help you set up your **measurement circuits** properly to achieve good accuracy and precision.
5. Help you **interpret measurements and quantify measurement errors**.
6. Help you build **confidence in the measurements you make**.
7. Help you understand how the different stages of a **measurement system work together to produce
   information that can be trusted**.

We are no longer just asking, *"Can I detect it?"* We are asking, *"Can I get a measurement I can
trust?"*

[[transition]] So we walk the path from its very beginning, and the beginning is not the sensor. It
is the thing we want to measure, and what it would mean for our number to be *right*.
```
