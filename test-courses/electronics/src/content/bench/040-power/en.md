---
targetMinutes: 10
objectives:
  - Read a resistor’s wattage as a thermal limit, and find which part gives first.
---

# Power, heat, and the limit

A wattage on a resistor is a thermal statement, not an electrical one — which is
why two parts working equally hard can be sixty degrees apart. Run the clock on
the second circuit and something eventually gives.

## Four resistors, one rail, four different lives {#package-heat}

```circuit
title: Four resistors, one rail, four different lives
circuit: shared/circuits/package-heat.benchcircuit
libraries:
  - shared/parts/baseline/library.json
alt: A ten-volt rail feeding four separate resistor branches - a pair in series, two single resistors of different values, and a fifty-ohm power resistor in a TO-220 package on a heatsink.
caption: Every one of these is a resistor across the same rail. Ask which is hottest before you switch to IR view.
# The author's choice (M25-14): this beat is about heat, so it offers the two
# thermal analyses and the power behind them, and not the four that are not.
analyses: [heat, ir, power]
# The prediction the IR view answers (M64h-iv): until the reveal fires, no part is drawn past
# its limit, so the room guesses from the temperatures and the scale alone. R5 is the hottest
# and well inside its 5 W; R1 dissipates 100 mW of a 62.5 mW rating.
question: Which of these resistors gives first?
reveal: { part: R1, show: overpower }
predict:
  prompt: Five resistors on one ten-volt rail. Which one is past its limit?
  options:
    - R5, the 50 Ω power resistor - it runs hottest
    - R1, the 1 kΩ
    - R4, the 10 kΩ
    - None of them
  correct: 1
```

## Turn it up until something gives {#overpower}

```circuit
title: Turn it up until something gives
circuit: shared/circuits/overpower.benchcircuit
libraries:
  - shared/parts/baseline/library.json
alt: A bench supply across a 470 ohm resistor in series with a 2.2 kilohm resistor, with the divider output taken from the junction between them.
caption: Run the clock and take the supply up. The 2k2 is the one paying for it, and its profile says how long it has.
```

## The most this supply could ever give {#power-transfer}

```circuit
title: The most this supply could ever give
circuit: shared/circuits/power-transfer.benchcircuit
libraries:
  - shared/parts/baseline/library.json
alt: A ten-volt bench supply driving a single five-ohm twenty-five-watt aluminium-clad load resistor, with the supply's negative terminal as the circuit reference.
caption: Open it plain and the supply is ideal - no output resistance, so no maximum, and the readout says so. Switch on its output impedance and the theorem has terms.
```

Every source is a voltage behind a resistance. At maximum power transfer, half
of everything the source produces is burnt inside the source — always, for every
source there has ever been — which is why a bench supply is deliberately,
enormously unmatched.
