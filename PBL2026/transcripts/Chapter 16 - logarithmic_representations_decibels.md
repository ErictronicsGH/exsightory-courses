LOGARITHMIC REPRESENTATIONS - DECIBEL
- The decibel (dB) is simply a means of logarithmically expressing the ratio between two signal levels, for example the "output over input" signal ratio (ie gain) of an amplifier. 

- Becaise te decibel is a ratio, it is also dimensionless, despite the fact that dB looks like a dimension to some people.

- In order to analyze system gains and losses using simple addition and subtraction rather than multiplication and division, a little math tric is used on the ratio.

- We take the base-10 logarithm of the ratio and multiply it by scaling factor (either 10 or 20).

- For voltage systems such as a voltage amplifier, the expression becomes
dB = 20 log(Vout/Vin)

- Therefore a decibel is nonetheless nothing more than a means for expressing a ratio.

- The same formula is true for current amplifiers
- For power measurements we need  a modified expression to account for the fact that power is proportional to the square of the voltage or current. dB = 10 log(Po/Pin)

- So why bother converting seemingly easy-to-handle, dimensionless numbers like voltage or power gains to dB? The answer is that it makes calculating signal strengths in a system easier. Say we have a 3 multistage ampliffication, the net gain is the product of the gains whereas when converted to dB the netgain is the sum of the dB values.

- Once convenience of the devibel schem is that gains are expressed as positvie numbers and losses as negative numbers. Conceptually it seems easier to understand a loss of -6.02dB than a loss represented as a gain of +0.50

CONVERTING BETWEEN dB NOTATION AND GAIN NOTATION
- Reverse the log operation

SPECIAL dB SCALES
- Various user groups have defined special dB-based scales taht meet their own needs. They make a special scale by defining a certain signal level as "0 dB" and refrencing all other signal levels to the defined 0-dB point.

- In the dimensionless dB scale, 0dB corresponds to a gain of unity (log(1) = 0). But if we define 0dB as a particular signal level, then we obtain one of the special scales.

- Several such scales commonly used in electronics are as followes:
    - dBm: Use in RF measurements, this scale defines 0dBm as 1mW of RF signal dissipation in a 50R rsistive load. 
    - Volume Unit (VU).  The VU scale, used in audio work define 0VU as 1mW of 1000Hz audio signal dissipated in a 600R resistive load.
    - dB (now obsolete): This scale once used in telephone work defined 0dB as 6mW of 1000Hz audio signal dissipated in 500R of load, another source listed 400Hz as the reference frequency

    - dBmv: Used in television antenna coaxial cable systems with 75R reistive impedance. The dBmV systems uses 1000uV across a 75R resistive load as the 0dBmV reference point.

    - 