```yaml
id: D1-080-06-sigma-delta
card: "Sigma-delta: fast and coarse, then filtered"
module: notes/Day01/080-adc-conversion/en.md
bench: Plot                       # carries the card (owner, 2026-10-20, D2): the PLAN's own fallback
library: "sigma-delta: two Plots in the card's two `plot` blocks, precomputed inline series. `sd-stream`: the first 64 bits of a first-order modulator's 1-bit stream and the share of 1s in the last 16 bits. `sd-averages`: the share of 1s in the last 16, 64 and 256 bits over 512 bits"
dimensions: 2D
stand_in: "none: the Plot carries the card; the Coding Bench is the later target (§12, §13)"
optional_benches: [Coding]        # the PLAN's own target: a first-order modulator with its bitstream and an averaging decimator
real_thing: "a first-order sigma-delta modulator (integrator, 1-bit quantizer, 1-bit feedback DAC) with a moving-average (sinc¹) decimator, on a steady 2.17 V input with a 3.3 V reference; a real 16-bit sigma-delta reports 8 to 860 samples per second"
minutes: 1.2                      # on the bench (§2); 1.5 with F3 (b) driven, 1.7 with the F4 prediction
card_minutes: 2.4                 # the whole card, Flow and bench
status: spec-draft
learner_action: none              # the PLAN has no ASK on this card; a prediction is proposed (§7b, F4)
predictions: []                   # [s1-density] if the owner accepts F4
seeds: [S19]                      # planted here; harvested in D2·040 (see F1)
key_variable: "the averaging length K: the share of 1s over the last K bits, and the step 1/K it can resolve"
time_scale: "none (a precomputed record; one x unit = one modulator clock)"
steps: 3                          # s0, s1, s2
```

The Plot's format, read 2026-10-20 (`C:\ExSightory\src\insight\packages\insight-core\src\registry\plotBlock.ts` and
`packages\canvas\src\PlotViewer.vue`, read-only): `series` take inline `points` (*"x, y"* per line) or `src` (a CSV
asset), style `points`, `line` or `both`, a label and a colour, and **no dash and no visibility switch**; curves are
expressions (`floor`, `step`, `sqrt` and `clamp` exist in `expr/evaluate.ts`, scientific notation parses); markers sit
at a fixed x or y; one y axis; `animate` sweeps one parameter; sliders are local to each window, not mirrored (X12).
Two things the viewer does today that this card depends on:

- **`src` is validated but not drawn.** `PlotViewer.vue` builds a series from `one.points` only (`const points =
  one.points ? parsePoints(one.points) : []`), so a series given as a CSV draws nothing. The precomputed data must be
  inline `points` (§11, F10).
- **The hover readout reads curves only** (`readout.entries` maps `curves`), so on a plot made of series the readout
  gives x and no values. The values are spoken (§4a) unless F3 (b) is taken.

## 1. What the room must understand

- **Statement** (verbatim): *A sigma-delta converter samples far faster than its output rate, shapes its noise, and
  filters digitally to reach high resolution for slow signals.*
- **SHOW** (verbatim from the PLAN): *Coding Bench — a first-order sigma-delta modulator: card 5's input (2.17 V, 0.658
  of full scale) in, the 1-bit stream out, and a running average over the last 16, 64 and 256 bits converging on 0.658.
  Decided 2026-10-20: the Plot fallback (a precomputed series) carries it until a Coding Bench exists.*
- **Drive** (verbatim): *run; change the input; change the averaging length.*
- **Look for** (verbatim): *the density of 1s is the value, and the resolution comes from how many bits you average.*
- **Status** (verbatim): *needs Coding Bench: first-order sigma-delta modulator with its bitstream and an averaging
  decimator (replaces the old visualiser widget); fallback: Plot with a precomputed series.*
- **SEED** (verbatim): *plants S19 — "A sigma-delta oversamples inside itself: it trades speed for resolution. Tomorrow
  you'll do the same trick in firmware, on purpose."*
- **Flow** (verbatim, the card's whole `flow` block):
  > A **sigma-delta (Σ-Δ) ADC** takes a different approach. It samples and processes the signal internally
  > at a much higher rate than its final output data rate, and uses oversampling, noise shaping and digital
  > filtering to reach high resolution. This makes it attractive for **precision measurement of relatively
  > low-bandwidth signals**, such as many sensor applications. The ADS1115, which we meet on Day 2, is a
  > 16-bit sigma-delta ADC.
  >
  > [[demo]] Plot Bench: the same input through a sigma-delta modulator.
  >
  > Two other architectures complete the common picture. A **flash ADC** uses many comparators in parallel
  > to find the input level very quickly; because the number of comparators grows rapidly with resolution,
  > flash converters suit applications where **very high speed** matters more than high resolution. A
  > **pipeline ADC** divides the conversion into stages that work on different samples at the same time,
  > which suits **high-speed acquisition** such as imaging, communications and high-speed instrumentation.
  > There are others, including integrating or dual-slope ADCs, but SAR, flash, sigma-delta and pipeline
  > cover many of the converters in modern electronic systems.
- **Bench and library.** The PLAN names the Coding Bench, which is not built; the owner decided on 2026-10-20 (D2) that
  the PLAN's own fallback, a Plot with a precomputed series, carries the card. The **bench** is the Plot Bench. The
  **library** is the card's two plots, `sd-stream` and `sd-averages`. The Coding Bench stays the later target (§12, §13).
- **Insight**: *a sigma-delta's bits are each only 0 or 1, but how often the 1s come is the input; averaging K bits
  reads that share in steps of 1/K, so the more bits you average (the more clocks you spend), the finer the result.*
- **Kind of knowledge**: *a relation between quantities* (the averaging length against the step it resolves) and *a
  picture built up* (a coarse stream turned into a fine number). Card test → **Plot** (a precomputed record; the process
  through stages, the loop running clock by clock, is the Coding Bench's, §13). B17 applies (the stream and its average
  on one axis; the three averages on one axis). B15, B18, B19 do not.
- **Why this bench, not a still**: the PLAN's Drive (*change the input; change the averaging length*) is interactive,
  and a still of three noisy lines does not show that the band each one lives in is one step of 1/K wide. On the
  decided version the interaction is the presenter's pointer and the move from the stream to the averages; F3 (b)
  restores the input slider.
- **Key variable**: the averaging length K (16, 64, 256), and the band of width 1/K each average stays in.

## 2. Time

The Flow is 172 words. p1 *"[[demo]] Plot Bench: the same input through a sigma-delta modulator."* (10) is a direction
and is not spoken. **162 words are spoken: p0 (67) before the bench, p2 (95) after it.** The Flow has no words for the
bench itself, so the presenter speaks unscripted lines over s0–s2: drafted in §4a (**Proposal**, F6), **129 words**.

| Beat | Minutes | Source of the number |
|---|---|---|
| Flow before the bench: p0 *"A sigma-delta (Σ-Δ) ADC takes a different approach…"* (67) | 0.52 | 67 ÷ 130 |
| s0 the stream appears; orientation (≈ 5 s) and the presenter's line (32 words) | 0.33 | 32 ÷ 130 + 5 s (estimate) |
| s1 the density: the pointer on the first 16 bits (≈ 3 s) and the line (36 words) | 0.33 | 36 ÷ 130 + 3 s (estimate) |
| s2 the second plot opens (≈ 3 s) and the line (61 words) | 0.52 | 61 ÷ 130 + 3 s (estimate) |
| Flow after: p2 *"Two other architectures complete the common picture…"* (95), the bench closed (no bench, as briefed) | 0.73 | 95 ÷ 130 |
| **Card total / of which on the bench** | **2.4 / 1.2** | 0.52 + 1.18 + 0.73 = 2.42; on the bench 129 ÷ 130 + 11 s = 1.18 |

With F3 (b) (the input moved to 0.99 V and back, about 25 words and two slider moves): +0.3 min. With the F4 prediction
at s1: +0.5 min.

**Module check**: `D1-080-03-quantization-floor.md` §2. For reference: the module's Flow is now 1,817 words = 14.0 min at
130 wpm against `targetMinutes: 30`. This card's 2.4 min is its Flow (1.25) plus 1.2 on the bench. The brief page
(`u017-preview.html`) estimated ≈ 1.8 min for the card; the difference is the unscripted lines, which the Flow does not
carry. No cut proposed (standing rule).

## 3. The scene: what is on the bench

Two plot blocks, because the room needs two y scales and the Plot has one y axis. The 1-bit stream is 0 or 1, so it
needs an axis from 0 to 1. The averages differ in steps of 1/256 = 0.0039, which is 0.4 % of that axis, too small to
see. A single plot with domain 0–512 zoomed to 0–64 for the stream fails for the same reason: at 512 bits the stream is
a solid block from 0 to 1 that buries the averages' 0.60–0.72 band.

### 3a. Plot A, `sd-stream` (s0, s1)

| Field | Content | Source |
|---|---|---|
| `title` | *One bit per clock* | the PLAN (*the 1-bit stream out*) |
| `caption` | *A first-order sigma-delta modulator with a steady input of 2.17 V on a 3.3 V reference: 0.658 of full scale. Each clock gives one bit, 0 or 1. The amber line is the share of 1s in the last 16 bits. Simplest form: a 1 feeds back the full 3.3 V, a 0 feeds back nothing.* | the PLAN; F8 (2026-10-20); the A6 label (§8) |
| `variable` | `n` (modulator clocks, bits so far) | — |
| `xLabel` / `yLabel` | *Modulator clocks (bits so far)* / *Bit, and share of 1s* | — |
| `domain` | [0, 64] | 64 bits, 10 px a bit on the 644 px plot area (`PlotViewer.vue`: width 720 − padding 76) |
| `range` | [−0.05, 1.10], `fixedView: true` | 0 and 1 visible with room for the marker's label |
| `series` `stream` | label *The 1-bit stream*, colour `azure`, style `line`, 128 points: each bit held from x = i to x = i + 1, so the stream draws as a square wave with vertical edges | the generator (§11) |
| `series` `avg16` | label *Share of 1s, last 16 bits*, colour `amber`, style `line`, 97 points from n = 16 to 64, each value held from n to n + 1 (a step stays a step, quality bar D Plot) | the generator |
| `markers` | y = 0.65758, axis `y`, label *Input: 2.17 V = 0.658 of full scale* | 2.17 / 3.3 = 0.657576 (§8) |
| `readout` | on (today: x only, the series are not read; F3) | `PlotViewer.vue` |

The first lines of each series, as the generator writes them:

```yaml
series:
  - label: The 1-bit stream
    colour: azure
    style: line
    points: |
      0, 1
      1, 1
      1, 1
      2, 1
      2, 0
      3, 0
      # … 128 lines in all (sd-stream.csv)
  - label: Share of 1s, last 16 bits
    colour: amber
    style: line
    points: |
      16, 0.6875
      17, 0.6875
      17, 0.6875
      18, 0.6875
      18, 0.625
      # … 97 lines in all (sd-avg16a.csv)
```

### 3b. Plot B, `sd-averages` (s2)

| Field | Content | Source |
|---|---|---|
| `title` | *Average more bits, finer steps* | the PLAN's Look for |
| `caption` | *The same stream over 512 clocks. Each line is the share of 1s in the last 16, 64 or 256 bits: a running average, the simplest digital filter. An average of K bits moves in steps of 1/K, and each stays within one of its own steps of the input.* | the PLAN; §8 |
| `variable` | `n` | — |
| `xLabel` / `yLabel` | *Modulator clocks (bits so far)* / *Share of 1s (axis zoomed: 0.60 to 0.72)* | A6: the zoomed axis said in its label |
| `domain` | [0, 512] | the brief page's 512 bits (`u017-preview.html`, `draw6`) |
| `range` | [0.60, 0.72], `fixedView: true` | holds every value the three averages take (0.625 to 0.6875, §8) with the marker clear of both edges |
| `series` `avg16` | label *Last 16 bits: steps of 1/16 = 0.0625*, `amber`, `line`, 497 points (n = 16 … 512) | the generator |
| `series` `avg64` | label *Last 64 bits: steps of 1/64 = 0.0156*, `teal`, `line`, 449 points (n = 64 … 512) | the generator |
| `series` `avg256` | label *Last 256 bits: steps of 1/256 = 0.0039*, `violet`, `line`, 257 points (n = 256 … 512) | the generator |
| `markers` | y = 0.65758, axis `y`, label *Input 0.658* | §8 |
| `readout` | on (x only today) | — |

On Plot B the averages are joined point to point, one point per bit: at 512 bits on 644 px a bit is 1.26 px, so a jump
and a one-bit slope cannot be told apart. Stepping them (as on Plot A) would double the data to 2,406 lines for no
visible difference; this exception to the Plot row *"a discontinuity is drawn as a jump"* is recorded in §8.

**Meet the parts** (s0, B3), in the presenter's words: *the stream, one bit per clock, only 0 or 1* · *the level line,
the input: 2.17 V, 0.658 of full scale* · *the amber line, the share of 1s in the last 16 bits*.

**Values beside their element** (B14, B16): the marker's label carries the input's value on its line; the legend
carries each window's step (1/16, 1/64, 1/256). The averages' values (0.6875, 0.625, 0.65625 …) are spoken, not written
(B13), until the readout reads series or F3 (b) makes them curves.

**Labels**: legend labels on the series; the marker labelled on its line. Nothing moves, so no badges.

**Colours and their second channel** (C4): the stream `azure`, a square wave between 0 and 1 (its shape is its second
channel); the 16-bit average `amber` on both plots (the same colour for the same thing, gate 5); 64 `teal`; 256
`violet`. On Plot B the three averages differ by the width of the band each one toggles in (0.0625, 0.0156, 0.0039 tall)
and by their legend labels, not by dash: a series has no `dashed` today (§12). The marker in the Plot's neutral ink.

**Key framings**: *Home* = each plot's authored domain; `fixedView` on both (the framing is the point).

## 4. The run: step by step, as the Flow goes

### 4a. Steps

The Plot has no steps. These are the presenter's views; each `say` is for the presenter's notes (no Plot strip, X12).

| # | id | Flow paragraph | What changes (`say`) | Presenter's unscripted line (**Proposal**, F6) | Presenter's control |
|---|---|---|---|---|---|
| — | p0 spoken before the bench | *"A sigma-delta (Σ-Δ) ADC takes a different approach…"* | — | — | the card |
| 0 | `s0-stream` | p1 *"[[demo]] Plot Bench: the same input through a sigma-delta modulator."* | The modulator's output: one bit per clock, 0 or 1, never near the input's 0.658. | *"This is the modulator's output, one bit per clock: only 1 or 0. The level line is the input, 2.17 volts, 0.658 of full scale. No single bit is anywhere near it."* (32) | Plot A opens |
| 1 | `s1-density` | (same, unscripted) | Eleven of the first 16 bits are 1: 11/16 = 0.6875. The share of 1s over the last 16 bits stays beside the input all the way along. | *"Count the 1s. Eleven of the first sixteen bits are 1: eleven sixteenths, 0.6875. The amber line is that share, over the last sixteen bits, all the way along. The density of 1s is the value."* (36) | pointer (laser) on bits 0–15, then along the amber line |
| 2 | `s2-windows` | (same, unscripted); then the bench closes for p2 | Averaging 16 bits gives steps of 1/16, 64 bits 1/64, 256 bits 1/256: each average stays within one of its own steps of 0.658. | *"Now average longer. Sixteen bits can only say sixteenths, so the amber line jumps between 0.625 and 0.6875. Sixty-four bits say sixty-fourths; two hundred and fifty-six bits, steps of 0.004. Each average stays within one of its own steps of 0.658. The resolution comes from how many bits you average, and every bit costs a clock: it trades speed for resolution."* (61) | Plot B opens |
| — | p2 spoken after the bench | *"Two other architectures complete the common picture…"* | — | — | back to the card (no bench, as briefed) |

The last sentence of s2 plants **S19** (*"it trades speed for resolution"*). Optional, for the presenter who wants the
thread to card 5 (**Proposal**, F6): *"Sixteenths of 3.3 volts are card 5's four-bit steps: the amber line jumps between
2.06 and 2.27 volts, the two codes the SAR ended between."*

### 4b. Motion, cues and stills

| # | Motion | Movers | Cue and its second channel | Hold | Reduced motion (C3) | Still (B4) |
|---|---|---|---|---|---|---|
| 0 | none (the plot appears) | 0 | the level line's label, read aloud | hold | the same | Plot A |
| 1 | none (the presenter's pointer) | 0 (the pointer) | the laser on the first 16 bits, then along the amber line; the eleven 1s are the high parts of the square wave | hold | the same | Plot A (the same still; its print caption is s1's `say`) |
| 2 | none (Plot B replaces Plot A) | 0 | the three bands, widest to narrowest, named in the line in that order | hold | the same | Plot B |

No `animate` block: a sweep would move without the presenter (B1), and the data is fixed. Nothing flashes (B8).

## 5. Pacing and interaction, by surface and view

**Who paces** (B12): the presenter on the wall; the learner in Study Mode and Scope. A plot is not pushed to devices
(`livePush: false`) and has no sliders here, so the wall and the presenter's window show the same picture.

| View | Who | Controls |
|---|---|---|
| Preview (in the slide) | everyone | each plot at its authored framing; the legend |
| View (details) | everyone | the same, larger; the readout's crosshair (x only today); `fixedView` holds the framing |
| Edit (session only) | everyone | not specified for the Plot Bench |
| Authoring | authors | the two `plot` blocks' YAML; the points pasted from the generator (§11) |

- **The presenter's strip** (B20): missing on the Plot (X12). The three `say`s, the unscripted lines and the teacher tip
  go in the presenter's notes.
- **Study Mode and Scope**: the two plots, the captions and the legend. Nothing to drive on the decided version (§7e).
- **Phone** (C6): each plot full width, the legend under it, then the caption. At 320 px Plot A's 64 bits are about 4 px
  each: still a readable square wave. Plot B's three legend labels wrap under the plot.
- **Locked**: `fixedView` on both plots.

## 6. The frame

The Plot's viewer frame (the Canvas header and footer, D4.10–4.12) for each plot: the title, the legend (Plot A: stream
azure, last 16 amber; Plot B: 16 amber, 64 teal, 256 violet), the caption, the readout. No sliders on the decided
version. No dock, no panels on the Plot today.

| Tile / panel | Used? | Selected item | List / contents |
|---|---|---|---|
| Plot header | yes | the title | — |
| Legend | yes | — | the series with their colours and labels |
| Sliders | no (F3 (b) adds `vin`) | — | — |
| Readout | on | x (values only with F3 (b)) | — |

## 7. Thinking, not watching

- **7a. The PLAN's ASK**: *none in the PLAN.* The card has no activity.
- **7b. Prediction point** — **Proposal** (F4): at s1, before the presenter counts, Plot A on the wall: *"The input is
  0.658 of full scale. Over many clocks, what share of the bits will be 1?"* · options: *about half, whatever the input*
  | *about 0.658 of them* | *all of them, because the input is above half* | *it changes at random* · answer: *about 0.658
  of them* · reveal: s1's count (11 of 16) and the amber line · explain: *the loop adds the input and takes away 1 for
  every 1 it sends, so to stay balanced it must send 1s exactly as often as the input asks.* +0.5 min.
- **7c. After**: s2's line is the explain (*the resolution comes from how many bits you average*). In Study, done = both
  plots seen (and F4 answered, if accepted).
- **7d. Teacher tip** — **Proposal** (F5): *Expect "a 1-bit converter can only say high or low". Ask: if every bit is 0
  or 1, where is the 0.658 kept? (In how often the 1s come.) Then: what does the 256-bit average cost? (256 clocks per
  answer: the S19 seed.)*
- **7e. Explore** (B11): none on the decided version: the series are fixed at 2.17 V and at K = 16, 64, 256. F3 (b)
  gives the input slider (*"change the input"*), and the Coding Bench gives any input and any K (§13).

## 8. Faithfulness (the quality bar)

**The model.** The first-order modulator of the brief page's `sd()` (`u017-preview.html`): the integrator starts at
u = 0 with the last bit y = 0; each clock, u ← u + x − y, then y = 1 if u ≥ 0, else 0. x = 2.17 / 3.3 = 217/330 =
0.6575757… of full scale (F8). The generator runs it in integers (u scaled by 330: u ← u + 217 − 330·y), because the
loop lands exactly on **u = 0 at bit index 329** (n = 330: 330 × 217/330 = 217, a whole number), where the `≥` decides
the bit; floating point could fall either side. (The brief page's floating-point run happens to agree bit for bit, and
so does x = 0.65758; checked.)

**Every number, recomputed** (Node, 2026-10-20, from the integer run):

- **The first 32 bits**: `11011011011011011011011011011011` (22 ones). The first 64:
  `1101101101101101101101101101101101101011011011011011011011011011` (43 ones). The pattern is mostly *110* (2/3 =
  0.667), with a *10* slipped in where the running count would get ahead of 0.658.
- **Ones so far**: 11 of 16, 22 of 32, 43 of 64, 169 of 256, **337 of 512** (0.658203, 0.00063 above the input). In
  closed form the count after n ≥ 1 clocks is ⌊n·x⌋ + 1 (proved below; matches all 512).
- **Each running average** (the share of 1s in the last K bits, at n bits so far), and its error against 0.657576
  (against 0.65758 the errors are the same to 5 decimals):

| K (step 1/K) | at n = 16 | at n = 64 | at n = 256 | at n = 512 | values it ever takes (n = K … 512) | largest error |
|---|---|---|---|---|---|---|
| 16 (0.0625) | 11/16 = 0.6875 (+0.02992) | 0.6875 (+0.02992) | 0.6875 (+0.02992) | 10/16 = 0.625 (−0.03258) | 10/16 (235 times), 11/16 (262 times) | 0.03258 = 0.52 step |
| 64 (0.015625) | — | 43/64 = 0.671875 (+0.01430) | 42/64 = 0.65625 (−0.00133) | 0.65625 (−0.00133) | 42/64 (408), 43/64 (41) | 0.01430 = 0.92 step |
| 256 (0.00390625) | — | — | 169/256 = 0.66015625 (+0.00258) | 168/256 = 0.65625 (−0.00133) | 168/256 (169), 169/256 (88) | 0.00258 = 0.66 step |

- **Why each stays within one step**: K·x = 10.52, 42.08 and 168.34, so the only whole counts of 1s within one of K·x
  are 10 or 11, 42 or 43, 168 or 169, and the averages take exactly those. In volts: 0.625 and 0.6875 are 2.0625 and
  2.26875 V (card 5's codes 1010 and 1011 at 4 bits, LSB 206.25 mV ✓, A4); 42/64 and 43/64 are 2.1656 and 2.2172 V
  (step 51.6 mV); 168/256 and 169/256 are 2.1656 and 2.1785 V (step 12.9 mV).
- **The bound, proved**: S_n = ⌊n·x⌋ + 1 for n ≥ 1 (S_0 = 0), for 0 ≤ x < 1. By induction: S_1 = 1 (u = x ≥ 0); and
  bit n is 1 exactly when (n + 1)·x − S_n ≥ 0, i.e. when ⌊(n + 1)·x⌋ ≥ ⌊n·x⌋ + 1, which keeps S_{n+1} = ⌊(n + 1)·x⌋ + 1
  (x < 1, so the floor rises by at most one). Hence the average over bits n−K … n−1 is (⌊n·x⌋ − ⌊(n−K)·x⌋)/K (plus 1/K
  when n = K, the start-up 1), always ⌊K·x⌋/K or ⌈K·x⌉/K: **its error is under 1/K**. This is the first-order loop's
  noise shaping seen in time: the integrator carries each bit's error into the next, so the error of an average does
  not grow with K. Averaging K independent noisy samples instead closes in only as 1/√K (F1).
- **Means over the plotted span** (a check, not shown): 0.65795 (K = 16), 0.65768 (64), 0.65759 (256).
- **Data sizes**: Plot A 128 + 97 = 225 point lines (3.6 kB of YAML); Plot B 497 + 449 + 257 = 1,203 point lines
  (24.8 kB of YAML). The golden table `sd-golden.csv`: 513 lines, 14,409 bytes, SHA-256
  `3ffbf0aa8a81c69be79948e6c6924f0595d2b5d8c8a52681410d9e3700494dda` (LF line endings).

**The Flow's claims, checked (A5, A6, A7)**:

- *"samples and processes the signal internally at a much higher rate than its final output data rate"* ✓: the
  modulator runs at the oversampling ratio times the output rate; a 16-bit part's noise falls as its data rate is
  lowered from 860 to 8 samples per second *because more modulator samples are averaged per result* (TI SBAS444E,
  ADS111x datasheet, noise tables and §7.3). Not a sample-and-hold at a high rate in the SAR sense, but a modulator
  clock; "samples" is the standard word (Analog Devices MT-022).
- *"uses oversampling, noise shaping and digital filtering"* ✓ (MT-022; Schreier & Temes, *Understanding Delta-Sigma
  Data Converters*, Wiley-IEEE 2005, ch. 2: a first-order modulator's in-band quantization noise falls 9 dB per doubling
  of the oversampling ratio, against 3 dB for oversampling alone).
- *"precision measurement of relatively low-bandwidth signals, such as many sensor applications"* ✓ (*relatively* and
  *many* keep it a rule of thumb; wide-band audio sigma-deltas exist and are not contradicted).
- *"The ADS1115 … is a 16-bit sigma-delta ADC"* ✓ (TI SBAS444E: 16-bit delta-sigma, 8, 16, 32, 64, 128, 250, 475 and
  860 SPS). The product name on a learner surface is the owner's N3 decision (F8).
- Flash: *"many comparators in parallel … the number of comparators grows rapidly with resolution"* ✓: an N-bit flash
  needs 2^N − 1 comparators (8 bits: 255; 10 bits: 1,023; 12 bits: 4,095), doubling with every bit (Analog Devices
  MT-020, *ADC Architectures I: The Flash Converter*).
- Pipeline: *"divides the conversion into stages that work on different samples at the same time"* ✓: each stage
  resolves a few bits of its sample, passes the amplified residue on and takes the next sample, so the stages hold
  successive samples at once, at the cost of a latency of several clocks (Analog Devices MT-024, *ADC Architectures V:
  Pipelined Subranging ADCs*).
- *"integrating or dual-slope ADCs"* ✓; *"SAR, flash, sigma-delta and pipeline cover many of the converters"* ✓
  (*many*, a hedge; Horowitz & Hill, *The Art of Electronics*, 3rd ed., ch. 13).
- The statement ✓ (as MT-022). The card's title *"fast and coarse, then filtered"* ✓ (a 1-bit quantizer run fast).
- **Not on any surface, and not a learner claim**: the PLAN's *"converging on 0.658"* (F2).

**Section D, Plot rows**
- [x] The expression is the physics: the series are the first-order modulator's own output, computed by its loop (MT-022
  fig. 1; Schreier & Temes ch. 2) and checked against the closed form above.
- [x] Axis ranges real: x in modulator clocks; Plot A 0–1 holds the bits; Plot B 0.60–0.72 holds every value taken
  (0.625 to 0.6875), labelled *zoomed*.
- [x] One worked value: Plot A at n = 16, the amber line at 0.6875 (11 of the first 16 bits); Plot B at n = 256, the
  violet line at 0.66015625.
- [x] / exception: no artefacts on Plot A (the stream and the 16-bit average are held per bit, so every step is a
  vertical jump). Plot B joins one point per bit, 1.26 px apart: a jump and a slope are indistinguishable at that
  width (recorded, §3b).

**A1–A8 (quality bar)**: A1 ✓ (the input is card 5's; the 8–860 S/s and the mechanism are sourced; the bench names no
product); A2 partly: the stream is the real loop's, but the ideal loop (no comparator noise, no integrator leak), the
non-ideal in §9; A3 ✓ (a plot, nothing branded); A4 n/a (no instrument face); A5 ✓: no motion, the x axis is in clocks,
and a real modulator clock is far faster (the brief page and this spec do not name a rate on the surface); **A6 ✓ with
three labels** (the caption's *"Simplest form: a 1 feeds back the full 3.3 V, a 0 feeds back nothing"*, Plot B's
*"a running average, the simplest digital filter"* and *"axis zoomed: 0.60 to 0.72"*); A7 ✓ (2.17 V and 3.3 V as card 5;
the 16-bit average's two levels are card 5's 1010 and 1011), with F1 on D2·040; A8 ✓ (sources above).

**The course's accuracy check (A1–A7, `course-accuracy.md`)**: A1 every number recomputed (above); A2 the course's
models: the truncating MCU converter is not this converter, and nothing here computes under it (the averages straddle
two codes, neither truncated nor rounded); A3 edge cases: u = 0 exactly at bit index 329, decided by `≥` in integer
arithmetic; x = 1 breaks the closed form (S_n = n, not n + 1), so F3 (b)'s slider stops at 3.27 V; A4 cross-references:
S19's harvest in D2·040 (F1); card 5's 2.17 V and its 4-bit codes ✓; A5 physics ✓ (above); A6 *"exactly"* in D2·040
(F1); *"converging"* in the PLAN (F2); A7 sources above.

**Simplifications and their on-bench labels** (A6): the three labels above, in the room's words.

## 9. Faults and non-ideal behaviour

**PLAN FAULT**: none in the PLAN.

Non-ideal effects of a real modulator (**Proposals**, for the Coding Bench, not the lecture):
1. **Idle tones**: a first-order loop with a steady input repeats a pattern (here *110* with a *10* slipped in), so its
   error is a tone, not noise. Real parts use higher-order loops or dither. Visible in this stream; not said on the card.
2. **Bipolar feedback**: real modulators feed back ±V_ref, so the density of 1s is (1 + V_in/V_ref)/2, not V_in/V_ref
   (labelled in the caption, §8 A6).
3. **Better decimators**: a running average is sinc¹; real converters use sinc³ or longer filters, which settle over
   several output periods after a step (why a sigma-delta's first reading after a channel switch can be wrong).
4. **Integrator leak and comparator noise**: small, and shaped out of band like the quantization noise.

## 10. Accessibility, legibility and print

- Wall (C2): titles, legend labels, axis labels and the marker label at the Plot's wall size; Plot B's three legend
  labels must not collide at 1920 × 1080 and 1024 × 768 (they are long; wrap if needed). The amber line over the azure
  square wave on Plot A must read on the projector profile.
- Reduced motion (C3): nothing moves; each plot lands whole.
- Colour (C4): Plot A by shape (square wave against a held line); Plot B by band width and legend only, no dash: checked
  under the three colour-vision simulations (amber, teal, violet are the Plot's checked palette); a `dashed` series
  would make it a full pass (§12).
- Keyboard (C5): nothing to operate on the decided version.
- Print (C8): two stills (Plot A, Plot B) with s0–s2's `say`s and the numbers of §8's table.
- Labels are i18n fields: the French labels are written with the English when the blocks are authored (gate 5).

## 11. Assets to make or source

| Asset | Format | Made by | Status |
|---|---|---|---|
| The generator, `d1-080-06-sigma-delta.mjs` (below) | Node script, no dependencies | the author (text here; F7 on where it lives) | written and run 2026-10-20 |
| `sd-golden.csv` (n, bit, ones so far, avg16, avg64, avg256; 513 lines, 14.4 kB) | CSV | the generator | acceptance data (§15); the Coding Bench's check later |
| `sd-stream.csv`, `sd-avg16a.csv`, `sd-avg16.csv`, `sd-avg64.csv`, `sd-avg256.csv` | CSV, `x,y` | the generator | for `src` when the viewer draws it (F10) |
| `sd-points-plotA.yaml.txt`, `sd-points-plotB.yaml.txt` (229 and 1,209 lines) | the inline `points:` blocks, indented for the fences | the generator | pasted into the two `plot` blocks |
| The two `plot` blocks (§3a, §3b) | YAML in `en.md` | the author | to write after the owner's answers (F3) |

The generator. Run `node d1-080-06-sigma-delta.mjs <outdir>`; it prints `first 32 bits 11011011011011011011011011011011
| ones in 512: 337` and writes the eight files. Deterministic: integers only, no randomness, no dependencies.

```js
// d1-080-06-sigma-delta.mjs: the first-order sigma-delta data for D1·080 card 6.
// Deterministic: integer arithmetic only (the input is 217/330 = 2.17 V / 3.3 V exactly).
// Run: node d1-080-06-sigma-delta.mjs <outdir>
import { writeFileSync, mkdirSync } from 'node:fs'
import { join } from 'node:path'
const P = 217, Q = 330          // input = P/Q of full scale (2.17 V on a 3.3 V reference)
const N = 512                   // modulator clocks (bits) drawn
const WINDOWS = [16, 64, 256]   // averaging lengths, in bits
const STREAM_SHOWN = 64         // bits drawn on the stream plot
const out = process.argv[2] ?? '.'
mkdirSync(out, { recursive: true })
// The modulator: integrator u += x - y (scaled by Q so it stays an integer); y = 1 if u >= 0 else 0.
const bits = []
let u = 0, y = 0
for (let i = 0; i < N; i++) { u += P - Q * y; y = u >= 0 ? 1 : 0; bits.push(y) }
const S = [0]                    // S[n] = number of 1s in bits 0..n-1
for (let i = 0; i < N; i++) S.push(S[i] + bits[i])
const avg = (K, n) => (S[n] - S[n - K]) / K   // exact: K is a power of two
// golden table: n, bit (bit n-1, the one just produced), ones so far, and each running average once defined
const golden = ['n,bit,ones,avg16,avg64,avg256']
for (let n = 1; n <= N; n++) golden.push([n, bits[n - 1], S[n], ...WINDOWS.map((K) => (n >= K ? avg(K, n) : ''))].join(','))
writeFileSync(join(out, 'sd-golden.csv'), golden.join('\n') + '\n')
// series: the stream as a square wave (bit i held from x = i to x = i + 1), and each running average at x = n
const stream = []
for (let i = 0; i < STREAM_SHOWN; i++) stream.push(`${i}, ${bits[i]}`, `${i + 1}, ${bits[i]}`)
const series = { stream }
for (const K of WINDOWS) { const pts = []; for (let n = K; n <= N; n++) pts.push(`${n}, ${avg(K, n)}`); series['avg' + K] = pts }
const a16 = []; for (let n = 16; n < STREAM_SHOWN; n++) a16.push(`${n}, ${avg(16, n)}`, `${n + 1}, ${avg(16, n)}`); a16.push(`${STREAM_SHOWN}, ${avg(16, STREAM_SHOWN)}`)
series.avg16a = a16   // plot A: the last-16 average, held from bit n to bit n + 1 (a step stays a step)
for (const [name, pts] of Object.entries(series)) writeFileSync(join(out, `sd-${name}.csv`), 'x,y\n' + pts.join('\n') + '\n')
// the inline `points:` blocks for the two plot fences, indented for YAML
const block = (pts) => '      points: |\n' + pts.map((l) => '        ' + l).join('\n') + '\n'
writeFileSync(join(out, 'sd-points-plotA.yaml.txt'), '# stream\n' + block(series.stream) + '# avg16 (plot A)\n' + block(series.avg16a))
writeFileSync(join(out, 'sd-points-plotB.yaml.txt'), WINDOWS.map((K) => `# avg${K}\n` + block(series['avg' + K])).join(''))
console.log('first 32 bits', bits.slice(0, 32).join(''), '| ones in 512:', S[N])
```

## 12. Bench capabilities this needs

**Plot Bench** (read 2026-10-20): `series` with inline `points` and `style: line`, labels and colours from the six;
`markers` on the y axis; `range` with `fixedView`; two `plot` blocks on one card (to confirm in Studio, F9): **exist**.

**Missing (request it; since 2026-10-20 a request is a crossing to Benches, raised when the course needs it)**:
- **`src` drawn by the viewer** (would be X22): `plotBlock.ts` accepts a CSV `src`; `PlotViewer.vue` draws only
  `points`. Without it Plot B carries 1,203 inline lines in `en.md` (F10). Not needed if F3 (b) is taken.
- **The readout reading series** (with X22): today it reads curves only, so the averages' values cannot be read off the
  plot by hover. Not needed if F3 (b) is taken.
- **A `dashed` (or line-style) field on a series**: the second channel C4 asks for on Plot B. Curves have it.
- **X10** (already listed): a series hidden until a step, so the three averages could arrive one at a time (16, then 64,
  then 256) on Plot B, one idea per step (B1).
- **X12** (already listed): a Plot strip with the steps' `say`s; with F3 (b), named slider presets mirrored to the wall.

**Coding Bench** (the PLAN's target; **not built**, no milestone known to this project): a first-order sigma-delta
modulator library: the input as a slider (0 to 3.3 V), *run* / *step* one clock, the integrator's value and the bit
shown per clock, the 1-bit stream scrolling, and an averaging decimator with K chosen (16, 64, 256, any power of two),
its output and its step 1/K shown live. Its first check is `sd-golden.csv` (the same input must give the same 512 bits).
This is the PLAN's Status line, unchanged.

**Not this bench's**: the loop running clock by clock (a process through stages) is the Coding Bench's; the Plot shows
its record.

## 13. Stand-in for the lecture

The Plot is not a stand-in: it carries the card (D2). What it loses against the **Coding Bench**, the later target:

| PLAN Drive | Plot (decided, series) | Plot with F3 (b) (curves) | Coding Bench |
|---|---|---|---|
| *run* | lost: the record is shown whole; the presenter's pointer walks it | the same | the loop runs, one clock at a time |
| *change the input* | lost: fixed at 2.17 V | **kept**: slider `vin`, 0.03–3.27 V, step 0.01 V | kept, any value |
| *change the averaging length* | partly: three fixed lengths side by side (16, 64, 256) | the same (and any K with an optional K slider, F3) | kept, any K |
| the values (B16) | spoken only | read off the readout | shown live |

Quality-bar checks lost on the decided version: B11 (the learner cannot drive the key variable), B16 partly (values
spoken, not shown), B1 partly on Plot B (the three averages arrive together, X10), C4 partly (no dash). The Flow's cue
already says *"Plot Bench"* (F8, 2026-10-20); no change. Nothing is made twice: `sd-golden.csv` becomes the Coding
Bench library's acceptance data.

## 14. Findings for the owner

- **F1 — accuracy (A4, A6): D2·040's harvest of S19 says the sigma-delta did *"exactly"* what firmware oversampling
  does.** D2·040's Flow: *"Yesterday's sigma-delta did exactly this inside itself: sample far faster than it reports, then
  filter."* Its HARVEST S19: *"This is the same trick in our own firmware."* Its numeric teaches that 16 samples buy 2
  extra bits (4ⁿ: averaging independent noisy samples narrows the error as 1/√K). This card's Plot shows 16 modulator
  bits giving steps of 1/16, with the error always under 1/16 (§8): 4 bits' worth from 16, because the loop carries each
  bit's error into the next (noise shaping), so its error closes in as 1/K. A learner who puts the two cards side by
  side gets two different answers for *"the same trick"*. The trade (speed for resolution) is the same; the mechanism and
  the rate are not. This card's own seed (*"it trades speed for resolution … the same trick in firmware"*) is true at
  the level of the trade. Options:
  - (a) D2·040's Flow says *"did the same kind of thing inside itself"* and adds one sentence: *"It does better than we
    can: its loop carries each bit's error into the next. Ours relies on the noise to do that."* (**recommended**: keeps
    the thread, removes the contradiction);
  - (b) drop *"exactly"* in D2·040 and leave the difference to a teacher tip;
  - (c) leave it (not recommended: the numbers the room saw here contradict it).
  To log in `ACCURACY.md` as **open** (this spec does not edit it).
- **F2 — PLAN wording (not on a learner surface): *"a running average … converging on 0.658"*.** A running average of
  fixed length does not converge in time: the 16-bit one toggles between 0.625 and 0.6875 for as long as it runs. It
  *settles within one step (1/K)* of 0.658, and the steps shrink as K grows. The captions (§3) say so. Change the PLAN to
  *"each settling within one step (1/K) of 0.658"*? (**recommended**; the presenter reads the PLAN.)
- **F3 — Proposal: the Drive's *"change the input"* on a Plot.** On precomputed series the input cannot change (a series
  has no parameter and cannot be hidden), and the readout cannot read the values. But for a steady input the modulator
  has an exact closed form (§8), so the same plots can be **curves** with an input slider, with no data at all:
  - Plot A stream: `floor((floor(n)+1)*vin/3.3 + 1e-9) - floor(floor(n)*vin/3.3 + 1e-9) + 1 - step(1, floor(n))`
  - the last-K average (K = 16, 64, 256, one curve each): `(floor(floor(n)*vin/3.3 + 1e-9) - floor((floor(n)-K)*vin/3.3
    + 1e-9) + 1 - step(1, floor(n)-K))/K + 0*sqrt(floor(n)-K)` (the `sqrt` blanks n < K; the `1e-9` keeps whole-number
    products from falling a hair below; without it 33 counts went wrong in the check).
  - slider `vin`, *Input*, 0.03 to 3.27 V, step 0.01, default 2.17, unit V (x < 1 is the closed form's condition).
  Checked in Node against the integer modulator for all 325 slider settings, each both as a typed value and as
  min + k·step: **0 mismatches** in 512 bits and in every 16-, 64- and 256-bit average. At 0.99 V (0.30 of full scale,
  the PLAN's old input) the stream starts `10010010010001001001000100100100` and the averages take 4/16 or 5/16, 19/64 or
  20/64, 76/256 or 77/256. Options:
  - (a) the decided series only (Drive's *change the input* lost; values spoken);
  - (b) **curves with the `vin` slider on both plots** (**recommended**: restores *change the input*, the readout reads
    0.6875 at n = 16, nothing inline in `en.md`, the dash becomes available for C4; `sd-golden.csv` stays as the
    acceptance check; +0.3 min if driven in the lecture; the column card shows the `floor` expressions, which are true
    but opaque, so the caption carries the meaning). Optionally a fourth curve with a K slider (2–256) for Study;
  - (c) series in the lecture, a third plot with the curves for Study only.
- **F4 — Proposal: a prediction at s1** (§7b), *"what share of the bits will be 1?"*, +0.5 min. Add it to the PLAN?
- **F5 — Proposal: the teacher tip** (§7d).
- **F6 — Proposal: the presenter's unscripted lines** (§4a, 129 words), which plant S19 in s2's last sentence, and the
  optional line tying the 16-bit average to card 5's codes 1010 and 1011 (2.06 and 2.27 V). Without them the bench has
  no words: the Flow's only line for it is the stage direction.
- **F7 — Where the generator lives.** No bench tool is kept or run here (`CLAUDE.md`), and this is the course's own
  data, not a bench tool. Options: (a) its text stays in this spec only (§11) and the author runs a copy from a scratch
  folder (**recommended**: nothing new in the project); (b) save it as `bench-work/data/d1-080-06-sigma-delta.mjs` with its
  outputs. Moot for the plotted data if F3 (b) is taken; `sd-golden.csv` is still wanted for acceptance.
- **F8 — Note: *"The ADS1115, which we meet on Day 2"* (Flow p0).** Kept for now; to be decided with D2·020 (owner
  decision N3, 2026-10-20). No change. The bench names no product (quality bar A3).
- **F9 — Two `plot` blocks on one card.** Confirm in Studio that a card shows two plots and that the presenter can open
  the second (as `D1-020-05-accuracy-precision` F5 for its two libraries). Otherwise Plot B goes on the wall from the
  reading column.
- **F10 — Note: `src` is not drawn.** On the decided version Plot B's 1,203 point lines (24.8 kB) go inline in
  `en.md`, because the viewer draws only `points` (§12, would be X22). F3 (b) removes the need.

## 15. Acceptance: how we know it is built right

- The generator prints `first 32 bits 11011011011011011011011011011011 | ones in 512: 337`; `sd-golden.csv` hashes to
  `3ffbf0aa…0494dda` (§8).
- Plot A compiles with §3a's fields: 128 + 97 points; at n = 16 the amber line sits at 0.6875; the square wave's high
  parts in bits 0–15 number eleven; every edge is vertical. Plot B compiles with §3b's fields: 497, 449 and 257 points;
  at n = 256 the three lines read 0.6875, 0.65625 and 0.66015625; at n = 512, 0.625, 0.65625 and 0.65625 (checked by
  the hover readout if F3 (b), against `sd-golden.csv` otherwise).
- If F3 (b): at `vin` = 2.17 every curve equals `sd-golden.csv` at every integer n; at `vin` = 0.99 the stream's first
  32 bits are `10010010010001001001000100100100`.
- B2 nothing moves but what the presenter points at; B3 s0 names the stream, the input and the amber line; B4 two stills;
  B5 each `say` in the notes; B6 the pointer on the first 16 bits; B7 no movers; B8 nothing flashes; B13 legend, labels
  and values only, the Flow never on the plot; B14 the marker labelled on its line; B16 values spoken (shown with F3
  (b)); B17 the stream and its average on one axis, the three averages on one axis; B11 only with F3 (b).
- C2 legible at 1920 × 1080 and 1024 × 768, Plot B's legend not colliding; C3 nothing moves; C4 checked under the three
  simulations; C6 at 320; C8 the two stills with their `say`s.
- E1–E6 for the built plots.
- Both plots opened on the lecture laptop before Saturday, both themes.
- **Six-gate report for this spec**: (1) realism: the stream is the real first-order loop's output, labelled where it is
  simplified (unipolar feedback, a running-average filter, a zoomed axis) ✓; (2) science: every Flow claim checked and
  sourced in §8, F1 raised on D2·040 ✓; (3) maths: every number recomputed in Node from the integer loop and the proved
  closed form; the knife edge at bit 329 handled ✓; (4) visualization: two plots because one y axis cannot hold both
  scales; the density shown on the stream itself; the bands narrowing with K ✓ (B11 needs F3 (b)); (5) consistency:
  2.17 V and 3.3 V as card 5, 0.6875/0.625 = card 5's 1011/1010, amber = the 16-bit average on both plots ✓; (6) design:
  to check on the rendered plots (Plot B's legend at wall size) when the blocks are written.
