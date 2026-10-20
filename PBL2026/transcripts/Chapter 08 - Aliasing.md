# Aliasing

**The misrepresentation of a signal caused by sampling it too slowly.**

When an analog signal is converted into digital data, the ADC does not continuously observe the signal. Instead, it takes measurements of the signal at regular intervals. The number of measurements taken per second is called the **sampling rate** or **sampling frequency**.

For example, a sampling rate of **5 kHz** means that the ADC takes **5,000 samples every second**.

The problem is that if the signal is changing faster than we are sampling it, the samples may not contain enough information to correctly represent what the signal is actually doing. The digital system may then interpret the signal as having a different frequency from the original signal. This is called **aliasing**.

Let's use a **5 kHz signal** to understand this.

A 5 kHz signal completes **5,000 cycles every second**. If we sample it at exactly **5 kHz**, we are taking only one sample during each cycle.

If the first sample happens at a particular point on the waveform, and the sampling remains perfectly in phase with the waveform, every subsequent sample can occur at that same point in each cycle.

For example, if we always happen to sample at the peak:

```text
        ●             ●             ●
       / \           / \           / \
      /   \         /   \         /   \
-----/-----\-------/-----\-------/-----\----
```

The ADC therefore sees:

**Peak → Peak → Peak → Peak**

It may appear as though the signal is simply a constant voltage, even though the actual signal is continuously oscillating.

The same thing could happen if we repeatedly sampled at a zero crossing. The ADC could see:

**0 V → 0 V → 0 V → 0 V**

Again, the actual signal is changing continuously, but our sampling process has failed to capture that change.

This is a useful way to think about the problem:

> **We only know what we observe. If we observe something too infrequently, we may form a completely wrong picture of what is happening between our observations.**

Think about how we often see our heroes. We usually see them in the **limelight**, performing their heroic duties. If we only encounter them at those moments, we may repeatedly see the same version of them and conclude that they are always heroic and perhaps even perfect.

But get closer and observe them more frequently, and we begin to see the things that happen between those heroic moments—their mistakes, weaknesses, frustrations, jokes, and ordinary human moments.

**Even Superman has his Kryptonite.** 😂

The hero has not suddenly changed. **Our sampling has simply become more frequent, giving us a more complete representation of who he really is.**

The same principle applies to a waveform. Sampling at the wrong rate can cause us to repeatedly observe the same part of a waveform and completely miss what happens between those observations.

### The Nyquist Limit

So how fast should we sample?

A useful rule is that the sampling frequency must be **greater than twice the highest frequency component that we want to preserve**.

For a signal with a highest frequency of 5 kHz:

**5 kHz × 2 = 10 kHz**

The frequency equal to **half the sampling frequency** is called the **Nyquist frequency** or **Nyquist limit**.

So if our ADC samples at **10 kHz**:

**Nyquist frequency = 10 kHz ÷ 2 = 5 kHz**

This means that **5 kHz is the highest frequency we can theoretically represent at that sampling rate**.

However, this is an important distinction:

- **Sampling frequency:** how many samples we take per second.
- **Nyquist frequency:** half of the sampling frequency; the theoretical highest frequency that can be represented without aliasing under ideal conditions.
- **Signal frequency:** the frequency actually present in the signal.

Therefore, if we want to preserve a 5 kHz signal, a 10 kHz sampling rate places us exactly at the Nyquist limit. In practical systems, we normally sample **above** 10 kHz and provide some margin.

### What happens below the Nyquist limit?

Suppose our ADC samples at **6 kHz**.

Its Nyquist frequency is:

**6 kHz ÷ 2 = 3 kHz**

Our 5 kHz signal is therefore **above the Nyquist limit**.

It cannot be uniquely represented at this sampling rate and can appear as a different, lower-frequency signal. In this particular case, the 5 kHz signal can appear as a **1 kHz** component:

**6 kHz − 5 kHz = 1 kHz**

The ADC has not actually changed the 5 kHz signal into a 1 kHz signal. Rather, the sampling process has created an ambiguity in which the sampled data can no longer distinguish the original 5 kHz signal from the lower-frequency alias.

This is the essence of **aliasing**.

### Frequencies above the Nyquist limit

Suppose our ADC samples at **10 kHz**. Its Nyquist frequency is therefore **5 kHz**.

Any significant frequency component above 5 kHz is outside the range that the ADC can safely represent.

For example, a **7 kHz** unwanted signal sampled at **10 kHz** can appear as a **3 kHz** component in the digital data:

**10 kHz − 7 kHz = 3 kHz**

This is particularly dangerous because the resulting 3 kHz component may look like a perfectly legitimate low-frequency signal to the digital system.

Once aliasing has occurred, we generally cannot determine from the sampled data alone whether that 3 kHz component came from an actual 3 kHz signal or from a 7 kHz signal that aliased during sampling.

This is why aliasing must be prevented **before the ADC**.

We use an **anti-aliasing filter**, usually an analog low-pass filter, to reduce frequency components that are above the usable frequency range of the chosen sampling rate.

The complete idea is therefore:

**Analog signal → Anti-aliasing filter → ADC → Digital signal**

The filter reduces unwanted high-frequency components before they reach the ADC, while the sampling rate is chosen high enough to represent the highest frequency component we want to preserve.

> **Aliasing occurs when sampling makes a signal appear to contain a different frequency from the one actually present. The Nyquist limit is half the sampling frequency, and frequency components above this limit can become aliases in the sampled data.**



So filtering is not simply about making a signal look cleaner. It can also be an important part of preparing the signal for reliable digitization.

For example, if we are measuring a slowly changing temperature, we may not need the measurement system to respond to very high-frequency variations. A suitable filter can attenuate those unwanted components while preserving the temperature information we actually need.

The input amplitude must also fall within the specified range of the ADC. Applying a signal outside this range may produce an incorrect result or, depending on the circuit, may even damage the input.

These requirements introduce challenges that we need to solve to ensure that the digitization process proceeds with as little unwanted distortion, noise, and other error as possible.

We cannot eliminate every limitation completely, but we can design the system so that their effects are minimized, understood, and, where possible, quantified.

Therefore, sensor output signals often need to be conditioned before they are applied to the ADC.

Unfortunately, the conditioning system we use depends greatly on the nature of the sensor's output signal.
