MEASUREMENT ERRORS
- No measurement is perfect, and measurement apparatus are never ideal so there will alwaysn be some error in all forms of measurement. An error is a deviation between the actual value of a measurand and the indicated value produced by the sensor or instrument used to measure the value.

- Error is inherent and is NOT the fault of the person making the measurement. Error is not the same as mistake.

- Understanding error can greatly improve our effectiveness in making measurement.

- Error can be expressed either in "absolute" terms or by a relative scale. An absolute error would be expressed in terms of X +/- x cm or some other such unit while a relative error would be expressed as X+/-x 1%.


CATEGORIES OF ERRORS
- There are 4 general cateogries of error
    - theoretical error
    - static error
    - dynamic error
    - instrument insertion error

- Theoretical Error
    - All measurements are based on some measurement theory that predicts how a value will behave when a certain measurement procedure is applied.

    - The measurement theory is usually based on some theoritical model of the phenomenon beng measured, that is, an intellectual construct that tells us something of how that phenemenon works.

    -  Often the theoretical model is valid only over a specified range of the phenomenon. For instance a non linear phenomenon that has a quadratic, cubic or exponential functin can be treaded as a straight-line  function over a small carefully selected sections of the range.

    - Electronics sensor outputs often fall into the class.
    - Alternatively, the actual phenomenn may be terribly complex or even chaotic under the right conditions so the model is therefore simplified for many practival measurements.

    - An equation that is used for the basis for a measurement theory may be only a first-order approximation of the actual situation.


- Static Error
    - This includes a number of different subclasses that are all related in that they always stay even in unchanging systems.
    - These errors are not function of time or frequency variations.

    - Reading Static Errors:
        - These errors result from misreading the display output of the sensor system. An analog meter uses a pointer to indicate the measured value. If the pointer is read at an angle other than a straight on then a parallax reading error occurs.
        - Another reading error is interpolation error that is an error made in guessing the correct value between two calibrated marks on the meter scale.
        - Another reading error occurs if the pointer on the meter scale is tto broad and covers serveral marks at once
        - A related error seen in digital readouts is the last-digit bobble error. On digital displays the least significant digit on the display will ofetn flip back and forth between two values. This phenomenon occurs when the actual voltage is midway between the two indicated voltages.
        - bobbling is of significant concern in a case where some action is taken when a value changes above or below a certain amount and the digital display bobbles above and below the critical threshold.

    - Environmental Static Errors
        - The environment of a sensor or instrument sometimes affects the output states. Factors such as temperature, pressure, electromagnetic filds and radiation must be considered in some electronic sensor systems.

    - Characteristic Static Errors
        - This error as a function of  the measurement instrument or the process itself. This includes zero offset error, gain error, processing error, lineraity error, hysteresis error, repeatability error, resolution errorand so forth.

        - Also design or manufacturing deficiencies than lead to errors falls under this error category.

        - for a digital system once must add to the resolution error a quantization error that emerges from the gact that the output data can take on only certain discrete values. For instance in an 8-bit resolution used to represent data from 0-10V will be broken into discrete values in 39.0vmV steps. A potential that is between to of these steps is assigned to one or the other according to the rounding protocol used in the measurement process. An example is the weight sensor that outputs 8.540V on a 10V scale to represent a certain weight. The actual 8-bit digitized value may represent 8.502, 8.41 or 8.880V because of the +/- 0.039V quantization error.

    - Dynamic Errors
        - Dynamic errors arise when the measurand is changing or in motion during the measurement process. Examples of dynamic errors include the inertia of mechanical indicating devices such as analog meters when measuring rapidly changing parameters.

        - A number of limitations in electronics instrumentation fall into this category especially cases where a fequency, phase or slew rate limitation is present.

    - Instrument Insertion Errors
        - A fundamental rule of making engineering and scientific measurements is that the measurement process should not signifcantly alter the phoenomenon being measured. Otherwise the measurand is actually the altered situation not the original situation that is of true interest.

        - For instance voltmeters tend to introduce some resistance in to the the signal being measured. Hence a voltmeter with low input impedance of its won could alter the resistance ratios in an electrical circuit and produce a false reading.

        - This problem is common when cheap instruments are used. 
        - This type of error can usually be minimized by good instrument design and good practices. 
        - No measurement device has zero effect on the system being measured, but one can reduce the error to a very small value by appropriate slection of methods and devices.

DEALING WITH MEASUREMENT ERRORS
 - Rubric Proceedure
    - One can find methods that will reduce or even minimize, error contributions to the final result. For instance use a voltmeter that has a very high imput impedance compared with the circuit resistances. That is use an instrument that least disturbs the thing being measured.

    - A significant source of measurement error in some electronic circuits is ground loop voltage drop and ground plane noise. ** this needs modern touch


ERROR CONTRIBUTIONS ANALYSIS
    - An error analysis should be performed in order to tidentify and quantify all contributing sources of error in a system. A determination is then made regarding the randomness of those errors and a worst-case analysis is made. 
    - Under the worst case, you assume that all of the components errors are biased in a single direction and are maximized. You then attempt to determine the consequences to your purpise for making the measurement if these errors line up in taht manner even if such an alignment is improbable.
    - The worst case analysis shoul be done on both the positive and the negative side of the nominal value.
    - Then you create an error budget to allocate an allowable error to each individual component of the measurement system in order to ensure that all the overall error is not too high for the intended use of the system.
    - If errr are independent of each other, are random rather than biased in one direction, and are of the same order of magnitude, then one can fine the root of the sum of the squares (RSS) value of the errors and use it as a composite error term in planning a measurement system.
    - The RSS term is a reasonable estimate or approximation of the combined effects of the individual error components.


OPERATIONAL DEFINITIONS IN MEASUREMENT
 - This is a way to standardize a measurement in a clear and precise way so that the measurement remains consistent across numerous trials. Operational definitions are used extensively in science and technology. When widely accepted or promulgated by a recognized authority, they are called standards.

 - When an operational definition becomes widely accepted and us used throught an industry, it may become part of a formal standard or test procedure. You may for example see a procedure listed as "performed in accordance with NIST XXXX.XXX" or "ANSI Standard XXX." These notations means that whoever made the measurement followed a published standard.