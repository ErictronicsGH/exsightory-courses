---
targetMinutes: 45
motivates: The firmware returns a stable, clean number — and nothing about it says it is entirely fictitious.
objectives:
  - Bias and scale a bipolar AC signal so the whole waveform stays inside the ADC's input range.
  - Predict where a frequency component above the Nyquist limit will appear in the sampled data.
  - Size an anti-alias filter against the sample rate, and explain why aliasing cannot be fixed in software afterwards.
concepts: [ac-biasing, aliasing, anti-alias-filter]
---

# Conditioning AC for the ADC: bias, aliasing and the anti-alias filter

<!-- PATH: QUANTITY → SENSOR → SOURCE & LOADING →[ CONDITIONING → (SAMPLING) ]→ ADC INPUT → … → NUMBER
     AC pass: conditioning a moving signal for the converter, and how often the converter must look.
     TOOL: Plot (centrepiece: a sine and its sampled staircase, f and fs sliders, the alias curve and the fold; the bias
           window; the 3 and 7 kHz staircases) ·Equation (Nyquist; anti-alias attenuation in dB) · Draw (the
           folding diagram; the AAF chain; the capstone voltage path) · Figure (datasheet lines; AC doc §9.2 figure,
           assets). Electronics ideal: AC source, frequency sweep and Bode view, op-amp.
     SOURCES: AC_Metering_System_Simulation_Project.md §9 (9.1–9.4), §11;
              transcripts/Chapter 07 - Analog to digital converters.md "Input bandwidth";
              transcripts/Chapter 08 - Aliasing.md (all);
              transcripts/07_compensation_techniques.md "Filtering";
              transcripts/Chapter  03 - Signal conditioning.md "Filtering";
              training-overview.md Day 2 Module 7. -->

## An AC signal swings negative; the ADC pin does not

If the ADC accepts only positive voltages, a bipolar AC waveform cannot simply be connected to it.
Scale it to fit the range, then shift it around a bias voltage, so the entire waveform stays within the
ADC's allowable input range.

<!-- PLAN
SHOW     Plot — the conditioned ±1.0 V, 50 Hz signal as the ADC pin sees it: clamp(b + A·sin(2π·50·t), 0, 3.3),
         with the unclamped curve dashed and markers at 0 V and 3.3 V (the ADC's limits). Sliders: bias b (0 →
         3.3 V, start at 0) and amplitude A (0 → 2 V, default 1.0). Drive: b = 0 — the lower half flattens on 0 V;
         raise b to 1.65 V; then raise A past 1.65 V and watch both peaks flatten.
         Look for: at b = 1.65 V the waveform spans 0.65 V to 2.65 V, inside 0 → 3.3 V with 0.65 V to spare at
         each end. Then bring up the AC doc's §9.1 scaling (±325 V → ±1.0 V) and §9.2 level-shifting figure and
         let the room set its upper label, 2.5 V, against what they computed (see the CHECK below).
         Status: ready (Plot); needs asset: AC doc §9.1–9.2 figure as SVG, upper label either corrected or kept
                 as the room's check
ASK      numeric (after the statement) — "A ±1.0 V signal is shifted to sit around 1.65 V. Where does its upper
         peak land?"
         answer: 2.65 V ± 0.02 V
         reveal: b = 1.65 V on the Plot; the upper peak sits at 2.65 V and the lower at 0.65 V
         explain: the bias adds the same 1.65 V to every point of the waveform, so each peak moves by 1.65 V and
                  the 2 V swing from peak to peak is unchanged.
         depth: use    practice: computational thinking
SEED     plants S72 — "Remember that we added 1.65 V to get in. Somewhere further down the path, somebody has to
         take it out again."
FAULT    a bias that sits off-centre (say 1.0 V) clips the negative peaks on 0 V: the RMS reads low and the
         waveform is no longer a sine, and nothing in the code says so.
-->

<!-- CHECK: AC_Metering_System_Simulation_Project.md §9.2 figure — a ±1 V swing about 1.65 V peaks at
     2.65 V, not 2.5 V (the 0.65 V lower label is consistent with 2.65 V). The 2.5 V label looks like a
     typo; correct the figure, or use the discrepancy as the room's check. -->

```flow
The signal has come along the wires. Before it reaches the converter, it has to be made fit for it, and
an AC signal has a problem a DC signal from a battery or a thermistor never had: half of the time it is
negative.

The sensor output may first be **scaled** so that the signal fits within the ADC input range. In the
capstone meter, for example, an actual voltage of ±325 V comes out of the voltage sensor as a
conditioned signal of ±1.0 V.

But if the ADC accepts only positive voltages, a bipolar AC waveform cannot simply be connected directly
to it. The signal may therefore be **shifted around a bias voltage**. The purpose is to keep the entire
waveform within the ADC's allowable input range.

[[ask]] Take a ±1.0 V signal and shift it so that it sits around 1.65 V. Where do its two peaks land?

[[pause]]

[[reveal]] The project document's level-shifting figure shows the waveform centred on 1.65 V, with its
lower peak at 0.65 V and its upper peak labelled 2.5 V.

The project also puts a **buffer** between the sensing and conditioning stage and the ADC, so that the
ADC input does not significantly load the circuit in front of it. We met that on Day 1, and it has not
changed just because the signal moves.
```

***

## Bandwidth is not sampling rate

Bandwidth tells us about the frequency content, or how rapidly the signal can change. Sampling rate
tells us how frequently we take measurements of that signal. They are related, but they are not the
same thing.

<!-- PLAN
SHOW     Figure — an ADC datasheet's two separate lines: the sampling rate and the analog input's full-power
         bandwidth (a SAR converter whose input bandwidth is many times its sample rate). Drive: spotlight the
         sample rate, then the bandwidth, then both.
         Look for: two different promises — how fast the input can follow, and how often it is looked at.
         Status: needs asset: datasheet excerpt of a SAR ADC listing both (confirm the figures on the chosen part
                 before quoting them)
ASK      flash (after the statement) — "An ADC's analog input handles frequencies far above its sampling rate.
         Are those frequencies represented correctly in its output?"
         options: yes — the input bandwidth covers them | no — they can turn up as other frequencies | only if the
                  ADC has more bits      answer: no — they can turn up as other frequencies
         explain: the wide input lets those frequencies reach the sampling capacitor intact, which is exactly why
                  they have to be filtered out before conversion when the sample rate cannot represent them.
         depth: understand    practice: constructing explanations
-->

```flow
The bias gets the signal into range. The next question is about time. Another important term is
**bandwidth**.

When we say that a signal has a particular bandwidth, we are describing the range of frequencies that
contain significant or useful information in that signal. For example, imagine a sensor whose electrical
output changes only slowly, from DC up to **1 kHz**. We can describe the useful signal bandwidth as
approximately **1 kHz**.

The ADC itself also has an **input bandwidth**. This describes the range of frequencies over which its
analog input circuitry can accept and process a signal with the required performance.

Bandwidth and sampling rate are therefore related, but they are **not the same thing**.

**Bandwidth tells us about the frequency content, or how rapidly the signal can change.**

**Sampling rate tells us how frequently we take measurements of that signal.**

[[ask]] Suppose an ADC's analog input path can handle frequencies much higher than its final sampling
rate. Does that mean those frequencies come out correctly in the digital data?

[[pause]]

It does not. Those frequencies cannot necessarily be represented correctly in the digital output. The
sampling rate must still be appropriate for the signal, and unwanted frequency components may need to
be filtered before conversion.

This distinction becomes particularly important when we consider the frequency content of real-world
signals. A signal may contain a useful low-frequency component together with unwanted high-frequency
components or noise. We may therefore use filtering to control the frequency content presented to the
ADC.
```

***

## Sampling a signal at its own frequency

Sample a 5 kHz signal at exactly 5 kHz and every sample can land on the same point of each cycle.
The ADC sees peak → peak → peak, and the oscillating signal looks like a constant voltage.

<!-- PLAN
SHOW     Plot — a 5 kHz sine (thin) and what the ADC holds from it, sin(2π·f·floor(t·fs)/fs + φ), drawn as a
         staircase over 1 ms. Sliders: fs (1 → 50 kHz, start at 5 kHz) and the phase φ of the first sample
         (0 → 360°). Drive: fs = 5 kHz, φ = 90° — a flat line at the peak; drag φ to 0° — a flat line at 0 V; drag
         φ around — always flat; then raise fs to 50 kHz and the staircase follows the sine again.
         Look for: at fs = f every sample lands on the same point of the cycle, so the held value is a constant
         whose level depends only on where sampling started.
         Status: ready
ASK      poe (before the statement) — "A 5 kHz signal sampled at exactly 5 kHz: one sample per cycle, always at the
         same point of the cycle. What does the ADC see?"
         options: a 5 kHz sine | a constant voltage | a 2.5 kHz sine | random values      answer: a constant voltage
         reveal: the staircase lies flat; dragging φ moves the flat line between the peak and 0 V
         explain: each sample is taken exactly one period after the last, when the signal is back where it was, so
                  the samples cannot change.
         depth: understand    practice: developing models
HARVEST  S18 — "On Day 1 I said that with a still quantity, how often we sample hardly matters — today. Today has
         arrived: same converter, same code, and one sample per cycle has turned a 5 kHz sine into a DC level."
-->

```flow
When an analog signal is converted into digital data, the ADC does not continuously observe the signal.
Instead, it takes measurements of the signal at regular intervals. The number of measurements taken per
second is called the **sampling rate** or **sampling frequency**. For example, a sampling rate of
**5 kHz** means that the ADC takes **5,000 samples every second**.

The problem is that if the signal is changing faster than we are sampling it, the samples may not
contain enough information to correctly represent what the signal is actually doing. The digital system
may then interpret the signal as having a different frequency from the original signal. This is called
**aliasing**: the misrepresentation of a signal caused by sampling it too slowly.

Let's use a **5 kHz signal** to understand this. A 5 kHz signal completes **5,000 cycles every second**.
If we sample it at exactly **5 kHz**, we are taking only one sample during each cycle.

[[ask]] One sample per cycle, and suppose every sample lands at the same point of the cycle. What does
the ADC see?

[[pause]]

[[reveal]] If the first sample happens at a particular point on the waveform, and the sampling remains
perfectly in phase with the waveform, every subsequent sample can occur at that same point in each
cycle. For example, if we always happen to sample at the peak, the ADC sees:

**Peak → Peak → Peak → Peak**

It may appear as though the signal is simply a constant voltage, even though the actual signal is
continuously oscillating.

The same thing could happen if we repeatedly sampled at a zero crossing. The ADC could see:

**0 V → 0 V → 0 V → 0 V**

Again, the actual signal is changing continuously, but our sampling process has failed to capture that
change.
```

***

## We only know what we observe

If we observe something too infrequently, we may form a completely wrong picture of what is happening
between our observations. The hero has not changed; our sampling has become more frequent.

<!-- PLAN
ANALOGY  We see our heroes only in the limelight; observe them more often and the ordinary moments in between
         appear — even Superman has his Kryptonite. Maps: too few observations give a consistent picture that is
         wrong about what happens between them, and the remedy is to observe more often. Breaks: a hero's
         in-between life is not periodic, while aliasing is exact — too-slow sampling of a periodic signal shows a
         precise, different frequency, not a vague one; and with a waveform we can decide in advance what is
         allowed to reach the observer (the filter, three cards on), which has no counterpart in watching a person.
-->

```flow
This is a useful way to think about the problem:

**We only know what we observe. If we observe something too infrequently, we may form a completely wrong picture of what is happening between our observations.**

Think about how we often see our heroes. We usually see them in the **limelight**, performing their
heroic duties. If we only encounter them at those moments, we may repeatedly see the same version of
them and conclude that they are always heroic, and perhaps even perfect.

But get closer and observe them more frequently, and we begin to see the things that happen between
those heroic moments: their mistakes, weaknesses, frustrations, jokes, and ordinary human moments.

**Even Superman has his Kryptonite.**

The hero has not suddenly changed. **Our sampling has simply become more frequent, giving us a more
complete representation of who he really is.**

The same principle applies to a waveform. Sampling at the wrong rate can cause us to repeatedly observe
the same part of a waveform and completely miss what happens between those observations.
```

***

## The Nyquist limit

The Nyquist frequency is half the sampling frequency. The sampling frequency must be greater than
twice the highest frequency we want to preserve, and in practice we sample above that, with margin.

<!-- PLAN
SHOW     Equation — f_N = f_s / 2, with f_s as the slider and the worked example 10 kHz → 5 kHz; one assumption
         with its "breaks when": "a component at exactly f_N is represented" — breaks when the samples fall on its
         zero crossings (two cards back, 0 V → 0 V). Drive: the worked example, then slide f_s.
         Look for: the strict inequality, f_s > 2·f_max, and the margin practical systems add above it.
         Status: ready
ASK      flash (after the statement) — "To preserve a 5 kHz component, the sampling frequency must be…"
         options: at least 5 kHz | greater than 10 kHz | exactly 10 kHz | greater than 2.5 kHz
         answer: greater than 10 kHz
         explain: the sample rate has to exceed twice the highest frequency kept; at exactly 10 kHz a 5 kHz
                  component sits on the Nyquist frequency, where its sampled amplitude depends on where the
                  samples fall.
         depth: use    practice: computational thinking
-->

<!-- CHECK: strictly, a component exactly at f_s/2 is not uniquely represented — its sampled amplitude
     depends on where the samples fall (the zero-crossing case two cards back gives 0 V every time). The
     rule two paragraphs up ("greater than twice") is the correct one; suggest "the limit we must stay
     below" rather than "the highest frequency we can represent". -->

```flow
[[ask]] So how fast should we sample?

[[pause]]

A useful rule is that the sampling frequency must be **greater than twice the highest frequency
component that we want to preserve**. For a signal with a highest frequency of 5 kHz:

**5 kHz × 2 = 10 kHz**

The frequency equal to **half the sampling frequency** is called the **Nyquist frequency** or **Nyquist
limit**. So if our ADC samples at **10 kHz**:

**Nyquist frequency = 10 kHz ÷ 2 = 5 kHz**

This means that **5 kHz is the highest frequency we can theoretically represent at that sampling rate**.

However, this is an important distinction:

- **Sampling frequency:** how many samples we take per second.
- **Nyquist frequency:** half of the sampling frequency; the theoretical highest frequency that can be
  represented without aliasing under ideal conditions.
- **Signal frequency:** the frequency actually present in the signal.

Therefore, if we want to preserve a 5 kHz signal, a 10 kHz sampling rate places us exactly at the
Nyquist limit. In practical systems, we normally sample **above** 10 kHz and provide some margin.
```

***

## Below the Nyquist limit

At 6 kHz sampling the Nyquist frequency is 3 kHz, so a 5 kHz signal is above it. It can appear as a
1 kHz component: 6 kHz − 5 kHz = 1 kHz. Sampling has created an ambiguity, not a new signal.

<!-- PLAN
SHOW (centrepiece) Plot — a true sine sin(2π·f·t) (thin), its sampled-and-held staircase sin(2π·f·floor(t·fs)/fs),
         and a dashed alias curve sin(2π·(f − fs·round(f/fs))·t), which passes through every sample. Sliders:
         f (0 → 15 kHz, default 5 kHz) and fs (1 → 20 kHz, default 12 kHz); x from 0 to 2 ms; animate on f,
         0 → 12 kHz, bounce. Below it, a second plot: the apparent frequency against the true one,
         y = abs(x − fs·round(x/fs)), with fs as the slider and markers at fs/2 and fs — the fold.
         Drive: fs = 12 kHz (the staircase follows the sine); drag fs down through 10 and 8 to 6 kHz; switch on the
         dashed curve and read its period (1 ms); press animate at fs = 6 kHz — the apparent frequency climbs to
         3 kHz and falls back to 0 at 6 kHz; read 5 kHz → 1 kHz on the second plot.
         Look for: below fs/2 the staircase follows the sine; above it, the staircase follows a different, slower
         sine that is just as smooth and just as believable.
         Status: ready (live sampled dots or a spectrum would need a widget; not needed)
ASK      poe (before the statement) — "We sample our 5 kHz signal at 6 kHz. What frequency does the sampled data
         show?"
         options: 5 kHz | 6 kHz | 1 kHz | 11 kHz | none — it is lost      answer: 1 kHz
         reveal: drag fs down to 6 kHz; the dashed 1 kHz curve threads every step of the staircase
         explain: between samples a 5 kHz signal advances 5/6 of a cycle, which the samples cannot tell from
                  slipping back 1/6 of a cycle, and that is what a 1 kHz sine does at 6 kHz.
         depth: understand    practice: analysing data
-->

```flow
Now let us go the other way. Suppose our ADC samples at **6 kHz**. Its Nyquist frequency is:

**6 kHz ÷ 2 = 3 kHz**

Our 5 kHz signal is therefore **above the Nyquist limit**.

[[ask]] What frequency does the sampled data show? Commit to a number.

[[pause]]

[[demo]] Aliasing sandbox: 5 kHz input, drag the sample rate down to 6 kHz.

[[reveal]] It cannot be uniquely represented at this sampling rate and can appear as a different,
lower-frequency signal. In this particular case, the 5 kHz signal can appear as a **1 kHz** component:

**6 kHz − 5 kHz = 1 kHz**

The ADC has not actually changed the 5 kHz signal into a 1 kHz signal. Rather, the sampling process has
created an ambiguity in which the sampled data can no longer distinguish the original 5 kHz signal from
the lower-frequency alias.

This is the essence of **aliasing**.
```

***

## Once aliased, no software can tell

A 7 kHz component sampled at 10 kHz appears as 3 kHz, and looks like a perfectly legitimate signal.
From the samples alone we cannot tell whether it came from a real 3 kHz signal or an aliased 7 kHz one.

<!-- PLAN
SHOW     Plot — two cosines, a real 3 kHz and an unwanted 7 kHz, each with its staircase at fs = 10 kHz (cosines,
         not sines: sin(2π·7k·n/10k) = −sin(2π·3k·n/10k), so sines give mirror-image staircases and cosines
         identical ones). Drive: the 3 kHz with its staircase; then the 7 kHz with its staircase; then hide both
         continuous curves, leaving the two staircases. Then Draw — the folding diagram: a frequency axis 0 → 2·fs
         drawn flat, then folded like paper at fs/2 = 5 kHz and again at fs, so 7 kHz lands on 3 kHz (and 13 kHz
         with it).
         Look for: with the curves hidden, the two staircases are the same list of numbers.
         Status: ready (Plot); needs Draw: aliasing fold (axis, folds at fs/2 and fs, 7 → 3 kHz and 13 → 3 kHz)
ASK      poe (before the statement) — "An unwanted 7 kHz component gets in, and we sample at 10 kHz. What does the
         digital data contain?"
         options: a 7 kHz component | a 3 kHz component | a 17 kHz component | nothing — it is above Nyquist and the
                  ADC ignores it      answer: a 3 kHz component
         reveal: the two staircases, then the fold putting 7 kHz on 3 kHz
         explain: 7 kHz is 3 kHz below the 10 kHz sample rate, so its samples match those of a 3 kHz signal, and
                  after sampling nothing records which of the two was there.
         depth: use    practice: arguing from evidence
SEED     plants S71 — "Nothing about it looks wrong: a stable, clean, entirely fictitious number. Keep that
         sentence — this afternoon a meter will show you one."
FAULT    a frequency reading that is steady and wrong; the diagnostic is to change the sample rate — a real
         component stays put, an alias moves (wrap-up F4).
-->

```flow
Suppose our ADC samples at **10 kHz**. Its Nyquist frequency is therefore **5 kHz**. Any significant
frequency component above 5 kHz is outside the range that the ADC can safely represent.

[[ask]] An unwanted **7 kHz** signal gets in, and we sample at **10 kHz**. What does the digital data
contain?

[[pause]]

[[reveal]] It can appear as a **3 kHz** component in the digital data:

**10 kHz − 7 kHz = 3 kHz**

This is particularly dangerous because the resulting 3 kHz component may look like a perfectly
legitimate low-frequency signal to the digital system.

Once aliasing has occurred, we generally cannot determine from the sampled data alone whether that 3 kHz
component came from an actual 3 kHz signal or from a 7 kHz signal that aliased during sampling.

[[demo]] The sandbox, a real 3 kHz and an aliased 7 kHz side by side. Look at the samples. They are the
same.

This is why it is the most dangerous error in this course: nothing about it looks wrong. Undersample, and
your firmware returns a stable, clean, entirely fictitious result.
```

***

## The anti-alias filter goes before the ADC

Aliasing must be prevented before the ADC: an analog low-pass filter reduces the components above the
usable range of the sampling rate. Filters work well when the spectra of the signal and the
interference do not overlap.

<!-- PLAN
SHOW     Draw — Analog signal → anti-aliasing filter → ADC → digital signal, built left to right; then a ghost
         "digital filter" box after the ADC, with the 3 kHz alias already inside the band it must keep, struck
         through. Drive: one block per step, the struck-through box last.
         Look for: the only place a component can be removed before it becomes an alias is in front of the sampler.
         Status: needs Draw: AAF chain with the struck-through digital filter
HARVEST  S11 — "On Day 1 we listed five defences against interference, and I pinned one of them, filtering, to
         when the signal reaches the converter on Day 3. Here it is — and here it has a job none of the others can
         do: it has to act before the samples are taken."
-->

```flow
This is why aliasing must be prevented **before the ADC**.

We use an **anti-aliasing filter**, usually an analog low-pass filter, to reduce frequency components
that are above the usable frequency range of the chosen sampling rate. The complete idea is therefore:

**Analog signal → Anti-aliasing filter → ADC → Digital signal**

The filter reduces unwanted high-frequency components before they reach the ADC, while the sampling rate
is chosen high enough to represent the highest frequency component we want to preserve.

**Aliasing occurs when sampling makes a signal appear to contain a different frequency from the one actually present. The Nyquist limit is half the sampling frequency, and frequency components above this limit can become aliases in the sampled data.**

Filtering is also a common method for reducing interference. A filter is any device that separates
signals according to their frequency or another criterion. Filters are very effective when the
frequency spectra of the signals and the interference **do not overlap**. They can be placed at inputs
or at intermediate stages. They can be electrical, mechanical (to reduce vibrations), pneumatic, thermal
or electromagnetic; filters placed at intermediate stages are usually electric.

Think of a sensor designed to record a particular infrared wavelength within the range **800–900 nm**.
You are likely to find the sensor also picking up wavelengths from **790–799 nm, 901–910 nm**, or even a
wider range. These unwanted wavelengths become noise, and depending on their amplitude, they can affect
our measurements in an appreciable way. We need to reduce or remove these unwanted components from the
signal, and the process of doing this is called **filtering**.
```

***

## Sizing a real anti-alias filter

The filter is sized against the sample rate: we read, in dB, how much it attenuates at the frequencies
that would alias, while it keeps the band we want to preserve.

<!-- PLAN
SHOW     Equation — the attenuation of an n-th order Butterworth low-pass, A(f) = −10·log₁₀(1 + (f/f_c)^(2n)) dB,
         graphed against f from 0 to 20 kHz, with f_c (default 1 kHz) and n (1 → 6) as sliders; worked examples
         at 5 kHz and 7 kHz. Markers: f_s/2, and f_s − f_band, the lowest frequency that folds back into the band
         we keep. Drive: n = 1, read A at 5 kHz, then at 7 kHz; then raise n to 4.
         Look for: first order, f_c = 1 kHz: −14.1 dB at 5 kHz and −17.0 dB at 7 kHz, so a 100 mV, 7 kHz
         interferer still reaches the ADC as about 14 mV — some 17 LSB of a 12-bit, 3.3 V converter, all of it
         appearing at 3 kHz. Fourth order: −67.6 dB at 7 kHz, about 0.05 LSB.
         Status: ready. Ideal on-circuit version → needs Electronics: AC source with a
                 frequency sweep, a Bode view, op-amp part.
ASK      numeric (after the statement) — "A first-order RC low-pass with f_c = 1 kHz, sampling at 10 kHz. Read its
         attenuation, in dB, at the Nyquist frequency."
         answer: −14.1 dB ± 0.3 dB
         reveal: the worked example at 5 kHz; then 7 kHz, and n raised to 4
         explain: at five times the corner a first-order filter passes 1/√26 of the amplitude, 20·log₁₀(0.196) ≈
                  −14 dB, and whether that is enough depends on how large the component is against an LSB.
         depth: use    practice: computational thinking
HARVEST  S15 — "On Day 1 I said we would use decibels again for the anti-alias filter. Here they earn their keep:
         a filter's loss and an LSB, compared by subtraction instead of division."
-->

<!-- FILLED 2026-10-07: drafted from training-overview Day 2 Module 7, the AC metering doc §9.3 and standard practice; tutor to review.
     Was: GAP — no transcript yet. Needs (training-overview Day 2 Module 7): the bench supplies the anti-alias filter response so participants size a real one against their sample rate. Draw the filter's response, put the cursor on the Nyquist frequency of the chosen sample rate, and read the attenuation in dB — the ratio we learnt to write as dB = 20 log(Vout/Vin) on Day 1 (060, CMRR). Then move the sample rate and resize. In the capstone project (AC doc §9.3) the same filter attenuates unwanted high-frequency components or noise introduced on purpose, tying together signal bandwidth, sampling rate, noise and anti-aliasing. -->

```flow
So how much filter? Let us size one.

Say we sample at 10 kHz, so the Nyquist frequency is 5 kHz, and the band we want to keep runs up to about
1 kHz. The simplest anti-alias filter is a resistor and a capacitor, a first-order RC low-pass. With 1.6 kΩ and
100 nF, its corner is about 1 kHz.

[[demo]] Equation Bench — the filter's response against frequency.

The same response is on the Equation bench, attenuation in dB against frequency, with the corner and the order
as sliders. Corner at 1 kHz, first order.

On Day 1 we wrote a ratio in decibels, 20 log of V_out over V_in. That is what this curve shows.

[[ask]] Read your filter's attenuation in dB at the Nyquist frequency. Is it enough for what lies above
it?

[[pause]]

[[reveal]] About −14 dB. At five times its corner, a first-order filter passes 1/√26 of the amplitude, about
a fifth.

Is that enough? It depends on what is up there. Suppose a 100 mV interferer at 7 kHz. The filter takes 17 dB
off it, so about 14 mV reaches the ADC. On a 12-bit converter with a 3.3 V reference, one LSB is about
0.8 mV, so that is some seventeen LSB, and all of it will appear at 3 kHz looking like a real signal.

[[demo]] Raise the order to four: two second-order stages with a Butterworth response, same corner.

At 7 kHz it now takes off about 68 dB. The same interferer arrives as about 40 µV, a twentieth of an LSB.

That is the trade. Each extra order adds about 20 dB per decade above the corner, but it costs parts, and an
active filter needs an op-amp. The other lever is the sample rate: sample faster and the Nyquist frequency moves
away from your band, so a gentler filter will do.

One refinement. The frequencies that hurt most are the ones that fold back into the band you keep. At 10 kHz
with a 1 kHz band, that is 9 kHz and up. Whatever lands between 1 and 5 kHz can still be removed by a digital
filter after the ADC, because it no longer overlaps the signal.

In the capstone, this is the filter that meets the noise we inject on purpose: signal bandwidth, sampling rate,
noise and anti-aliasing, in one component.
```

***

## Filtering prepares the signal for digitization

Filtering is not simply about making a signal look cleaner; it is part of preparing it for reliable
digitization. The input amplitude must also stay within the ADC's specified range.

<!-- PLAN
SHOW     Draw — the capstone's mains voltage path, stage by stage: ±325 V → divider (to ±1.0 V) → bias to 1.65 V →
         anti-alias RC → buffer → ADC pin, with a small sketch of the waveform at each node. Drive: one stage per
         checkpoint item, after the room has written its own.
         Status: needs Draw: capstone voltage path (reused, with a current path added, in 060 "Conditioning both
                 paths")
ASK      checkpoint (after the statement) — "For the mains voltage path in the capstone: what do we bias, what do
         we scale, what do we filter, and why?"
         items: scale ±325 V to about ±1.0 V, to fit the range with headroom | bias to 1.65 V, so the waveform
                spans 0.65–2.65 V inside 0–3.3 V | low-pass before the ADC, so nothing above f_s/2 reaches the
                sampler at more than a fraction of an LSB | buffer, so the sampling capacitor does not load the
                divider (Day 1)
         depth: create    practice: designing solutions
-->

```flow
So filtering is not simply about making a signal look cleaner. It can also be an important part of
preparing the signal for reliable digitization.

For example, if we are measuring a slowly changing temperature, we may not need the measurement system to
respond to very high-frequency variations. A suitable filter can attenuate those unwanted components
while preserving the temperature information we actually need.

The input amplitude must also fall within the specified range of the ADC. Applying a signal outside this
range may produce an incorrect result or, depending on the circuit, may even damage the input.

These requirements introduce challenges that we need to solve to ensure that the digitization process
proceeds with as little unwanted distortion, noise and other error as possible. We cannot eliminate
every limitation completely, but we can design the system so that their effects are minimised,
understood and, where possible, quantified.

Therefore, sensor output signals often need to be conditioned before they are applied to the ADC.
Unfortunately, the conditioning system we use depends greatly on the nature of the sensor's output
signal.

[[ask]] For the mains voltage path in the capstone: what do we bias, what do we scale, what do we
filter, and why?

[[transition]] We now know how often the converter has to look. But "how often" is an average. The next
question is *when*, exactly, each of those samples is taken, and what happens to our number when the
answer is "not quite when we thought".
```
