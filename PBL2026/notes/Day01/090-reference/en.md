---
targetMinutes: 30
motivates: The sensor has not changed and the input has not changed, but the reading moves whenever the supply rail does.
objectives:
  - Explain why an ADC's reference error becomes measurement error one-for-one.
  - Say why VDD is the default reference and usually the worst choice.
  - Arrange a resistive sensor ratiometrically, so that reference error cancels.
concepts: [voltage-reference, ratiometric]
---

# The reference voltage, and ratiometric measurement

<!-- PATH: quantity → sensor → loading → conditioning → ADC input → conversion → [ REFERENCE ] → firmware → number
     TOOL: Plot (centrepiece: the code against the rail voltage for an absolute and a ratiometric input —
           one line moves, the other stays flat) · Equation (code = V_in/V_ref × 2^N; the ratiometric
           algebra collapsing) · Electronics (the thermistor divider on the supply dial; ideal: a
           rail-referenced ADC block, a load step and a precision reference).
     SOURCES: transcripts/Chapter 07 - Analog to digital converters.md (Reference voltage and input
              range); training-overview.md Day 1 Module 6. -->

## A code is a ratio to the reference

The ADC does not measure volts. It measures the input as a fraction of its reference, and spreads
its levels across that range.

<!-- PLAN
SHOW     Equation — code = (V_in / V_ref)·2^N, rearranged (solveFor) to V_in = code·V_ref / 2^N, graphed as
         the code against V_in.
         Status: ready.
-->

<!-- FILLED 2026-10-07: drafted from training-overview Day 1 Module 6 and standard reference/ratiometric practice; tutor to review -->

```flow
An ADC needs a reference against which it interprets the input voltage. This is commonly called the
**reference voltage**, or **V_ref**.

Suppose an ADC is configured to represent an input range from **0 V to 3.3 V**. Its available digital
levels are distributed across that range. A 10-bit ADC, for example, has 1,024 possible levels across
its configured input range.

The code is the input as a fraction of the reference, times the number of levels:
code = (V_in / V_ref) × 2^N.

[[demo]] On the Equation Bench, with 12 bits and a 3.3 V reference: 1.65 V gives 2048, half of 4,096.
The converter never measured a volt. It measured a ratio: half of whatever the reference was.
```

***

## The code alone means nothing

To turn a code back into a voltage you need the resolution, the reference, the input range and the
configuration. Change any one of them and the same code means a different voltage.

<!-- PLAN
ASK      numeric ×2 (at the Flow's [[ask]]) — "The code is 2047, from a 12-bit converter. What voltage is that
         with a 3.3 V reference? With a 1.1 V reference?"
         answer: 1.649 V ± 0.002 V, then 0.550 V ± 0.001 V
         reveal: the Equation from the last card with V_ref switched between the two.
         explain: The same code is the same fraction, 2047/4096 or about 0.4998, of whatever the reference
                  happens to be.
         depth: use    practice: computational thinking
HARVEST  S30 — "Our 2047 from earlier today stands for 1.649 V, if the reference really is 3.3 V. The pin was at
         1.79 V; 070 told us why."
-->

```flow
This means the digital number an ADC produces has no universal meaning by itself. To interpret it as a
voltage, we need to know the ADC's **resolution, reference voltage, input range and configuration**.

[[ask]] The code is 2047, from a 12-bit converter. What voltage is that with a 3.3 V reference? With a
1.1 V reference?

[[pause]]

And even once we have the voltage, we may still need information about the sensor, the scaling and the
calibration before we can interpret it as an engineering quantity — temperature, pressure, force or
light. That is tomorrow's work, in the firmware.
```

***

## Reference error is measurement error

If the reference is 1 % high, every reading is 1 % low. The error passes through one-for-one, at every
point of the range.

<!-- PLAN
ASK      poe (before the statement) — "The supply rail, which is also the reference, sags from 3.30 V to
         3.20 V. The input, 1.65 V, has not changed at all. What does the code do?"
         options: falls — less supply, less reading | stays at 2048 — the input did not move | rises, by
                  about 3 % | jumps to full scale
         answer: rises, by about 3 %
         reveal: the Equation, V_ref slid from 3.30 to 3.20 V: 2048 → 2112.
         explain: The same 1.65 V is now a larger fraction of a smaller reference, 1.65/3.20 instead of
                  1.65/3.30, so the code rises by the 3 % the reference fell.
         depth: understand    practice: developing models
SEED     plants S22 — "Reference error passes through one-for-one. Tomorrow a gain calibration will quietly
         absorb it, as long as it holds still."
FAULT    The firmware says 3.3 V while the regulator delivers 3.28 V: every reading about 0.6 % off, and no
         amount of averaging finds it.
-->

<!-- FILLED 2026-10-07: drafted from training-overview Day 1 Module 6 and standard reference/ratiometric practice; tutor to review -->

```flow
[[ask]] The supply rail sags from 3.30 V to 3.20 V. The input voltage has not changed at all. What does
the code do?

[[pause]]

[[demo]] On the Equation Bench: 12 bits, 1.65 V in, and the reference, which here is the supply rail,
slid from 3.30 V to 3.20 V.

[[reveal]] The code rises from 2048 to 2112, about 3 %. The input did not move. It just became a bigger
fraction of a smaller reference. The firmware still multiplies by 3.3 V, so it reports 1.70 V.

That is the rule: reference error is measurement error, one for one. A reference 1 % high makes every
reading 1 % low, at every point of the range. Because it is proportional, it behaves like a gain error,
which is why tomorrow a gain calibration can absorb it, as long as the reference holds still.
```

***

## VDD: the default, and usually the worst

Using the supply as the reference is convenient, and the supply is usually the noisiest, least accurate
voltage on the board to measure against.

<!-- PLAN
SHOW     Electronics — a 3.3 V rail that feeds the MCU's own load and references the ADC, with a fixed 1.65 V
         input from a separate reference; reveal the rail's source resistance (50 mΩ: the regulator and its
         wiring, as the MCU's pin sees them), then output_drift.
         Drive: load from 10 mA to 200 mA; add a PCB trace (trace-cu-0r5mm) in the rail and repeat.
         Look for: the rail drooping 10 mV and the fixed input's code climbing about 6 counts; more with the
         trace.
         Status: needs Electronics: ADC-input block with a selectable reference (VDD / internal / external),
                 a stepped load (a switch) and a precision-reference source part.
ASK      poll (after the SHOW) — "An 8-bit MCU on 5 V reads a 0–1 V signal. Which reference would you use:
         AVCC, the internal 1.1 V, or an external 2.5 V reference?"
         options: AVCC | internal 1.1 V | external 2.5 V
         (no single answer: AVCC uses a fifth of the range and moves with the supply; the internal 1.1 V
         uses 91 % of it and is stable, but its datasheet value can sit anywhere from about 1.0 to 1.2 V, so
         it needs calibrating, and on a part near 1.0 V the top of the signal reaches full scale; an external
         2.5 V is accurate and uses 40 %)
         depth: create    practice: designing solutions
-->

<!-- FILLED 2026-10-07: drafted from training-overview Day 1 Module 6 and standard reference/ratiometric practice; tutor to review -->

```flow
[[demo]] Animation Bench: the supply rail with load steps, and the reading of a fixed input following it.

Most MCU projects use the supply rail as the ADC's reference. It is the default, it needs no extra part,
and it covers the whole input range.

It is also usually the worst voltage on the board to measure against. A regulator's output has an
initial tolerance, often a percent or two. It drifts with temperature. And it sags whenever the board
draws current: the radio transmits, a motor starts, an LED comes on.

On the bench: a 3.3 V rail that feeds the MCU's own load and references the ADC, and a fixed 1.65 V input
from a separate reference. Switch on the rail's source resistance, 50 mΩ: the regulator and its wiring, as
the MCU's pin sees them, and step the load from 10 mA to 200 mA.

The rail drops about 10 mV, and the code for the fixed input climbs by about 6. Put a thin PCB trace in
the rail and do it again: the drop grows, and so does the error. Nothing changed at the input.

Most MCUs offer alternatives. A common 8-bit MCU, for example, can use its analog supply (AVCC), an
internal reference of nominally 1.1 V, or an external one on its AREF pin. Look up what yours offers.

[[ask]] An 8-bit MCU on 5 V reads a 0 to 1 V signal. Which reference would you use: AVCC, the internal
1.1 V, or an external 2.5 V reference?

[[pause]]

There is no single answer. AVCC uses only a fifth of the range, and moves with the supply. The internal
1.1 V uses 91 % of it and is stable, but its datasheet allows its actual value to sit anywhere from about
1.0 to 1.2 V, so it needs calibrating once, and on a part near 1.0 V the top of the signal reaches full
scale. A good external 2.5 V reference is accurate from the start, and uses 40 % of the range.
```

***

## Ratiometric: let the error cancel

Excite a resistive sensor from the same rail that references the converter. The rail appears in both
the input and the reference, so it divides out.

<!-- PLAN
ASK      poe (before the reveal) — "Now the thermistor divider, the 10 k NTC under 10 kΩ, is powered from the
         same rail that references the ADC. At 25 °C the rail moves from 3.0 V to 3.6 V. What does the code
         do?"
         options: rises as the rail falls, like before | falls as the rail falls | stays put | wanders
         answer: stays put
         reveal: the centrepiece Plot, rail swept.
         explain: The rail multiplies the sensor's voltage and the reference alike, so it divides out of the
                  code; only the resistance ratio, which is the temperature, is left.
         depth: understand    practice: developing models
SHOW (centrepiece) Plot — the code against the rail voltage V_dd from 3.0 to 3.6 V for two inputs: an absolute
         one, a fixed 1.65 V (code = 1.65/V_dd·4096: falls from 2252 to 1877), and the ratiometric
         thermistor divider (code = R_T/(R_T + 10 kΩ)·4096: flat at 2048 at 25 °C); sliders: temperature,
         and the rail (animate).
         Drive: animate the rail; then move the temperature.
         Look for: one line moving with the rail and the other flat — and the flat one still moving with
         temperature. Then the Equation: code = (V_dd·k)/V_dd·2^N, V_dd struck out, leaving k·2^N.
         Status: ready (Plot, Equation) · the on-circuit version needs Electronics: ADC-input block referenced
                 to the same supply (today the thermistor divider on the supply dial shows the volts moving,
                 not the code standing still); replaces the reference-drift widget.
HARVEST  S35 — "It's our thermistor divider from 040 again: 1.65 V behind 5 kΩ, settling fine, and now deaf to
         the rail."
FAULT    The sensor is excited from 5 V while the ADC references 3.3 V: ratiometric in name only.
FAULT    A filter resistor between the rail and the divider that is not in the reference path: the two no
         longer see the same rail under load.
-->

<!-- FILLED 2026-10-07: drafted from training-overview Day 1 Module 6 and standard reference/ratiometric practice; tutor to review -->

```flow
There is an escape, and it is the excitation from the sensing module.

[[ask]] Power the thermistor divider, the 10 k NTC under a 10 kΩ resistor, from the same rail that
references the ADC. At 25 °C the rail moves from 3.0 V to 3.6 V. What does the code do?

[[pause]]

[[demo]] On the Plot Bench: the code against the rail voltage, for two inputs. The falling line is a
fixed 1.65 V measured against the rail: about 2252 at 3.0 V, down to about 1877 at 3.6 V. The other is
the thermistor divider, powered from that same rail. I'll sweep the rail.

[[reveal]] The thermistor's code stays put at 2048. The rail moves; the code does not.
```

```flow
Here is the algebra. The divider's output is the rail times a ratio, k = R_T / (R_T + R_F). The code is
that output divided by the reference, times 2^N. But the reference is the rail. So the rail appears on
the top and on the bottom, and divides out: code = k × 2^N. All that is left is the resistance ratio,
and that is the temperature.
```

```flow
[[demo]] Now I move the temperature. The flat line moves with it. It ignores the rail, not the
measurement. It is our thermistor divider from the impedance module: 1.65 V behind 5 kΩ, settling fine,
and now deaf to the rail.

This is **ratiometric** measurement. It works only if the sensor's excitation and the ADC's reference
really are the same voltage: from the same rail, with nothing in between that one sees and the other
does not.
```

***

## Back to the sensor

The excitation of a modulating sensor, from earlier today, and the converter's reference turn out to
be one design decision, not two.

<!-- PLAN
ASK      checkpoint (at the Flow's [[ask]]) — "Back to 2047": 1 name every stage it passed through · 2 for
         each, one way it could have spoiled the number · 3 mark the one you now suspect · 4 compare with your
         list from 010.
         depth: understand    practice: arguing from evidence
HARVEST  S9 — "Earlier today we chose the excitation for sensitivity. Now the excitation and the converter's
         reference turn out to be one design decision."
HARVEST  S30 — "Look back at the 2047 we started the day with. Name every stage it passed through."
-->

```flow
Earlier today we met the modulating sensor: one that needs an excitation before it can say anything. We
chose its excitation as a matter of sensitivity. Now we see that the excitation and the converter's
reference are really one design decision. Make them the same voltage, and the reference's error, sag
and drift included, stops mattering for that sensor.

[[ask]] Look back at the 2047 we started the day with. Name every stage it passed through. Which one do
you now suspect?

[[pause]]

[[transition]] Today the quantity became a code. Tomorrow the code leaves the converter, and the
firmware has to earn the right to call it a number.
```
