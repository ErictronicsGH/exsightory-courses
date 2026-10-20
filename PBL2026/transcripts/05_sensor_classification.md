SENSOR CLASSIFICATION
- We can classify sensors in many different ways according to our interest:
    - Interms of whether or not the sensor needs externall power supply:
        - Modulating Sensors: 
            - Also loosely called "ACTIVE" sensors by some, are sensors that need an external power supply in order to function.
            - The physical quantity being measured does not produce the output signal directly -- it just modulates or gates a power source that's already there. For instance a strain guage, a thermistor, etc. These are just variable resistors whose resistance responds proportionally to changes in the physical quantity. So we apply voltage across it and the amount of current that flows is proportional to the quantity being measured.
            - They have better sensitivity control as the energy for controlling the excitation is supplied by the designer. You can tune the sensor's overall gain/sensitivity by adjusting the supply voltage or current.
        - Self-Generating Sensors:
            - The measured quantity itself produces the output power -- no auxilliary supply needed. For instance a thermocouple generates its own voltage from the temperature gradient. A Solar cell also does similar.
            - In this category the energy of the input is directly converted into electrical output.
            - These guys give you what they give you, you cant turn up its excitation because there isnt one. 

    - Interms of Signal Output Type:
        - Analog:
            - The output changes in a continuous way at a macroscopic level.
            - The information is usually obtained from the amplitude, although sensors with output in the time domain are usually considered as analog. 
            - Sensors whose output is variable frequency are called quasi-digital because it is very easy to obtain a digital output from them (by counting for a time).


        - Digital:
            - Their output takes the form of discrete steps or states. 
            - Digital sensors do not require an ADC, and their output is easier to transmit than that of analog sensors.
            - It is more repeatable and reliable and often more accurate.
            - Unfortunately digital sensors cannot measure many physical quantities.

    - Operating Mode:
        - Deflection Sensors:
            - The measured quantity produces a physical effect that generates in some part of the instrument a similar but opposing effect that is related to some useful variable. Example a dynamometer to measure force is a sonsor where the force to be measured deflects a spring to the point where the force it exerts, proportional to its deformation balances the applied force.

        - Null-Type Sensrs:
            -  This attempts to prevent deflection from the null point by applying a known effect that opposes that produced by the quantity being measured.
            - This is basically an imbalance detector and a means to restore balance. For instance in a weighing scale, known masses are constantly added to the other side to ensure no imbalance is detected by the pointer.
            - This type of measurements are usually more accurate because the opposing known effect can be calibrated against a high-precision standard or a reference quantity.
            - They only measure near zero; therefore they can be very sensitive and does not require any calibration.
            - Nevertheless, null measurements are slow; and despite attempts at automation using a servomecahnism, their response time is usually not as short as that of deflection systems.
    
    ![Sensor classifications according to different exhaustive criteria](image-5.png)

    - Input-Output Relationship:
        - Sensors can be classified as zero, first, second or higher order. The order is related to the number of independent energy-storing elements present in the sensor, and this affects its accuracy and speed. This classification is important when the sensor is part of a closd-loop control system because excessive delay may lead to oscillation.

    - Classificatin based on Measurand:
        - We sometimes also classify sensors according to the measurand. In this case we say things like temperature sensors, pressure, flow, level, humidity and moisture, pH, chemical composition etc.
        - This classification however can hardly be exhaustive because of the seemingly unlimited number of measurable quantities.

    - Classification Based on the Variable Electrical Quantity:
        - Engineers prefer to classify sensors according to the variable electrical quantity such as resistance, capacitance, inductance. Also sensors generating voltage, charge, or current, p-n junctions and radiation -based sensors. This approach reduces the number of groups and enabled the direct study of the associated signal conditioners.

        