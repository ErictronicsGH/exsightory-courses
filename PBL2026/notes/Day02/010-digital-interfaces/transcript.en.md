---
includeInExport: false
---

<!-- Restructured from: transcripts/Chapter 05 - Interfaces.md §7 (the digital domain; signal vs data);
     Chapter 08 - Digital Interface.md (all); Chapter 03 - Signal conditioning.md "Level shifting";
     Chapter 10 - Communcation protocols.md (opening "Protocols are part of interfaces", "Choosing a
     communication interface", "The interface has a cost", "Digital interfaces also have electrical
     requirements"). Open-drain, pull-ups and wired-AND: no transcript yet (training-overview Day 3 Module 1).
     Where on the path: DIGITAL INTERFACE. Day 1 ended at the reference: the converter has produced a code
     that is a ratio to its reference. The code exists. Now it has to leave the converter. -->

<!-- Lesson-level script for “The code leaves the converter: open-drain, pull-ups and I²C”. The words for each slide are in the ```flow
     fence under that card in en.md, and appear on the teleprompter with it. -->

## Where we are on the path

DIGITAL INTERFACE. Day 1 ended at the reference: the converter has produced a code that is a ratio to its reference. The code exists. Now it has to leave the converter.

## The arc

1. **The code has to travel** — Once an ADC has produced digital data, that data still has to reach the processor.
2. **Both digital — so compatible?** — Digital does not automatically mean compatible.
3. **Level shifting: 5 V logic into a 3.3 V pin** — A 5 V digital output wired straight to a 3.3 V microcontroller's GPIO may damage the input.
4. **An interface is not a protocol** — The bits alone are not enough.
5. **What does a floating input read?** — A floating input is undefined, not low.
6. **Open-drain: pull low or let go** — An open-drain output can only pull the line low or let it go, which is exactly why it needs a pull-up.
7. **Choosing the pull-up value** — The pull-up's value is a real trade between edge rate and drive current.
8. **Two outputs on one wire** — Wired-AND falls out of open-drain for free: the line is high only when every output lets go, and any one of them can pull it low.
9. **There is no best interface, only a suited one** — There is no universally best digital interface.
10. **A logical problem and an electrical one** — A communication interface is both a logical and an electrical problem.

## What the wall shows

- The code has to travel: Draw — the course path drawing from D1·010, with the code's own leg added: ADC → Digital data →
- Both digital — so compatible?: Figure — two chips facing each other, nine labelled lines between them: voltage levels, timing,
- Level shifting: 5 V logic into a 3.3 V pin: Electronics — new fixture `level-shift`: a 5 V supply V1 behind R1 (47 Ω, the module output's own
- An interface is not a protocol: Figure — SPI between ADC and MCU: SCLK, MOSI, MISO, CS/SS, with a timing strip of 10110110 on MISO
- What does a floating input read?: Electronics — a logic input (the pin node) with nothing driving it and a DMM on it; then R1 10 kΩ to
- Open-drain: pull low or let go: Electronics — new fixture `open-drain-bus`: an N-MOSFET M1 (mosfet-typical) as the open-drain
- Choosing the pull-up value: Plot — the bus voltage after release, v = 3.3·(1 − 0.7·exp(−t/(R·C))), t in ns from the
- Two outputs on one wire: Electronics — `open-drain-bus` with a second MOSFET M2 (gate from V3) on the same pulled-up bus.
- A logical problem and an electrical one: Plot — the centrepiece rise-time Plot back on the Canvas while the room ticks its list, so three of

## Learner actions

- Both digital — so compatible?: poll (before the statement) — "An ADC and a microcontroller both run on 3.3 V logic. Wire them
- Level shifting: 5 V logic into a 3.3 V pin: poe (before the statement) — "A 5 V output is wired straight to a 3.3 V GPIO. Where does the extra
- An interface is not a protocol: multi-select (before the statement) — "One device sends 10110110. Which of these must the receiver
- What does a floating input read?: poe (before the statement) — "Nothing is driving this pin. What level does it read?"
- Open-drain: pull low or let go: poe (before the pull-up is added) — "The output transistor has let go. What decides the voltage on
- Choosing the pull-up value: poe (before the statement) — "Make the pull-up ten times smaller. What happens to the rising edge,
- Choosing the pull-up value: numeric (after the statement) — "A Fast-mode bus must rise from 30 % to 70 % in 300 ns. It has
- Two outputs on one wire: poe (before the statement) — "One output pulls low, the other lets go. What is the line?"
- There is no best interface, only a suited one: poll (before the statement) — "An ADC must send its readings to a microcontroller. SPI or I²C?"
- A logical problem and an electrical one: checkpoint (after the statement) — "Tick each electrical requirement you would check on an I²C

## Hand-off

[[transition]] So far, in the course's own example, the code has come from the converter inside the
microcontroller, and travelled a few millimetres. But what if that converter is not good enough for the
signal? Then the converter itself moves out of the chip, and the bus we have just built becomes the road
its codes travel on. That is a design choice, and it is the next stop.
