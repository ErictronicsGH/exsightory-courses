COMPENSATION TECHNIQUES
- Low Interference Sensitive Systems:
    - The effects of interfering and modifying inputs can be reduced by changing the system design or by adding new elements to it.
    - The best approach is to design sytems insensitive to interference and that responds only to the designed signals.
    - This includes selecting the best sensor that is suitable for the environment of the system such that interference can be reduced. for instance using a strain guage with low temperature coefficient. Selecting components such as metal-film resistors and NP0 capacitors which are less sensitive to temperature.
    - However this method is not always possible for obvious practical reasons..

- Negative Feedback
    - Negative feedback is a common method to reduce the effect of modifying inputs, and it is the method used in null measurement systems.

    ![Negative feedback method to reduce the e¨ect of internal perturbations. Block H may be insensitive to those perturbations because it handles lower power than block G.](image-7.png)

    - It assumes that the meausrement system and the feedback are linear and can be described by their respective transfer functions G(S) and H(S). The input-putput relation is ![Input-Output relation](image-8.png)

    - where the approximation is valid when G(s)H(s) >> 1

    - If the negative feedback is insensitive to the modifying input, and it has been designed so that the system remains stable, then the output signal is not affected by the modifying input.

    - The advantage of such a solution stems from the different physical characteristics of the elements described by G(s) and H(s). 
    - The probable insensitivity of H to a modifying input is a consequence of its lower power-handling capacity than G.
    - This also results in higher accuracy and linearity for H. Moreover,
    negative feedback results in less energy extracted from the measured system
    because G is designed very large.


- Filtering:
    - This is also a common method for interference reduction.
    - A filter is any device that separates signals according to thier frequency or another criterion.
    - Filters are very effective when the frequency spectra of the signals and interference do not overlap.
    - Filters can be placed at inputs or at intermediate stages.
    -  They can be electrical, mechanical (to reduce vibrations), pneumatic, theraml or electromagnetic.
    - Filters placed at intermediate stages are usually electric.

- Opposing Inputs Technique:
    - It is  often used to compensate for temperature variations. For instance a gain that depends on a resistor having a positive temperature coefficient changes due to a temperature change, another resistor can be placed in series with the affected resistor. If the added resistor has a negative temperatire coefficent, it is possible to keep the gain constant inspite of the temperature changes.

- Mathematical Correction:
    -  When the mathematical relationshio between the interference and the sensor output is known, interference can be compensated by digital calculations after measuring the magnitude of the interfereing variable.. E.g. temperature in a pressure sensor. This method is common in smart sensors.