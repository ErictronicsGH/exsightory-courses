---
targetMinutes: 35
motivates: The probe shows rounded edges and ringing — is that the circuit, or something we added by connecting to it?
objectives:
  - Explain probe compensation as a frequency-dependent divider, and recognise an under-compensated, an over-compensated and a flat response.
  - Predict how cable capacitance and lead inductance change what a measurement connection shows, with loop area as the parameter you control.
concepts: [parasitics]
---

# Parasitic C and L: what probes and wiring add

<!-- PATH: QUANTITY → SENSOR → SOURCE & LOADING →[ PROBES & WIRING ]→ CONDITIONING → ADC INPUT → … → NUMBER
     AC pass, still on the path between sensor and converter: what the connections themselves add,
     beside ground (Day 2 · 090).
     TOOL: Plot (centrepiece: the ×10 probe as a compensated divider; the cable-C edge; lead-L ringing) · Equation
           (reactance of the wiring against f) · Draw (a wire redrawn as R, L and C) · Figure (scope screenshot, asset).
           Electronics, ideal on-circuit version: needs a square/step source, a scope, probe tip and C_comp, cable C and
           an inductor class.
     SOURCES: training-overview.md Day 2 Module 2 and "Everything here is simulated";
              transcripts/Chapter 07 - Analog to digital converters.md (opening paragraphs, impedance). -->

## Every connection is a circuit you added

Every measurement connection — the probe, the cable, the leads — is a circuit you have added to the
one you are measuring, and it acts on the signal.

<!-- PLAN
SHOW     Figure — a scope screenshot of a square wave with a rounded leading corner, a spike and a few cycles of
         ringing at each edge; nothing labelled. Drive: put it up during the cold open; spotlight the corner, then
         the ringing; leave it on while the room's answers are sorted.
         Look for: the motivates question made visible — is that shape in the circuit, or did we bring it?
         Status: needs asset: scope screenshot of a 1 kHz square through a mis-compensated ×10 probe with a
                 15 cm ground lead
ASK      poll (after the statement) — "When you clip a probe onto a node, what have you added to the circuit?"
         options: nothing that matters | a resistance | a capacitance | an inductance | a small circuit of all three
         reveal: none; the answers are sorted live into "resistance", "capacitance" and "inductance" and stay on
                 the wall for the module
         depth: understand    practice: asking questions
SEED     plants S70 — "Keep this list. By the end of the hour every word on it will have a waveform next to it."
-->

<!-- FILLED 2026-10-07: drafted from training-overview Day 2 Module 2; tutor to review.
     Was: GAP — no transcript yet. Needs (training-overview Day 2 Module 2): every measurement connection is a circuit you added. The probe, the cable and the leads bring their own capacitance and inductance, and they act on the signal you are trying to observe. Sort the room's answers into "resistance", "capacitance" and "inductance" and keep them on screen for the rest of the module. -->

```flow
Yesterday we finished on ground, and we found that the copper we think of as "zero" is an impedance with
current flowing in it. This morning we stay on the path a little longer, because ground is not the only
wire in the measurement.

[[demo]] The scope screenshot. A square wave as the screen shows it: a rounded corner here, a spike there, a
few cycles of ringing after every edge.

Is that shape in the circuit? Or did we bring it with us when we connected the probe?

[[ask]] When you clip a probe onto a node, what exactly have you added to the circuit?

[[pause]]

Let me sort what you said into three columns: **resistance**, **capacitance** and **inductance**. This list
stays on the screen. By the end of the hour, every word on it will have a waveform next to it.

One thing to say plainly to the room: we are not going to teach you to operate an oscilloscope.
Triggering, volts per division and the probe's attenuation switch are instrument controls, and there is
nothing to simulate in them. What we keep is the part that is a circuit: probe compensation, cable
capacitance and lead inductance. Today we put all of them on the benches, where you can move them yourself.
```

***

## Impedance has R, L and C — and so does the wiring

Impedance is the effective opposition a circuit presents to a changing electrical signal, and it can
involve resistance, inductance and capacitance. With DC only the resistance showed. Once the signal
moves, the wiring's L and C take part too.

<!-- PLAN
SHOW     Draw — a length of wire drawn as a line, then redrawn as what the model says it is: series R, series L,
         and C to its surroundings (dashed, to a ground plane); then the same three drawn into a probe and its
         cable. Drive: one element per sentence of the Flow — R first ("all DC ever showed us"), then L, then C.
         Then Equation — X_L = 2πfL and X_C = 1/(2πfC), graphed against f (10 Hz → 100 MHz), with L and C as
         sliders (defaults 150 nH, 100 pF).
         Look for: at DC the two reactances are 0 and ∞ and drop out of the circuit, which is why Day 1 never saw
         them; 100 pF is about 1.6 kΩ at 1 MHz, low enough to load a divider of the size we built on Day 1.
         Status: needs Draw: wire-as-RLC (wire → R, L, C → probe + cable); Equation ready
-->

```flow
On Day 1 we met loading. Every signal source has an **output impedance**. Impedance is the effective
opposition a circuit presents to a changing electrical signal and can involve **resistance, inductance
and capacitance**.

On the DC pass we only ever needed the resistance, because nothing was changing. Now the signal moves,
and the inductance and capacitance of the wiring are no longer invisible.
```

***

## Probe compensation is a frequency-dependent divider

A probe and the instrument input form a divider whose ratio depends on frequency. Adjusted correctly
it is flat; under-compensated or over-compensated, the waveform on the screen is partly the probe's
doing, not the circuit's.

<!-- PLAN
SHOW (centrepiece) Plot — the ×10 probe and the scope input as a compensated divider: 9 MΩ ∥ C_comp in the
         tip, 1 MΩ ∥ C_in (input plus cable, a few tens of pF; the plot uses 20 pF as an example) at the instrument, driven by a 1 kHz square. One curve, the trace
         as displayed (×10 restored): sq(t)·[1 + 2(a − 1)·exp(−mod(t, T/2)/τ)], with
         sq = 2·step(T/2 − mod(t, T)) − 1, a = 10r/(r + 9), τ ≈ 20 µs (held fixed; it moves a little with C_comp),
         and the slider r = R_tip·C_comp / (R_in·C_in), from 0.3 to 3, flat at 1.
         Drive: open on three still copies at r = 0.5, 1 and 2, unlabelled (A, B, C) for the ASK; reveal by
         dragging r slowly 0.5 → 1 → 2 on one curve; finish with animate on r, bounce.
         Look for: the edge is set by the capacitor ratio and the flat top by the resistor ratio, and only at
         r = 1 do they agree. At r = 2 the edge jumps to about 2.6× the settled level and droops back; at
         r = 0.5 it starts near zero and creeps up.
         Status: ready. Ideal on-circuit version → needs Electronics: square-wave source, oscilloscope instrument
                 with C_in, probe class with tip capacitance and a C_comp trimmer dial (probe-x10 today has only
                 r_series), transient solve. Optional needs asset: real scope screenshots of the three cases for a
                 Figure compare.
ASK      poe (after the statement) — "One of these is flat. Which one? And what is wrong with the other two?"
         (A has a rounded leading corner, B is square, C spikes at each edge and droops.)
         options: B is flat; A's C_comp is too small and C's too large | B is flat; A's C_comp is too large and
                  C's too small | A is flat; B and C are over-compensated | C is flat; its spike is the circuit's
                  own overshoot
         answer: B is flat; A's C_comp is too small and C's too large
         reveal: drag r from 1 to 2 on the Plot — the spike and droop of C grow out of the flat trace; drag to 0.5
                 and A's rounded corner appears
         explain: the capacitive half of the divider sets how much of a fast edge gets through and the resistive
                  half sets where it settles, so a large C_comp passes the edge at more than a tenth and then
                  relaxes to the tenth.
         depth: understand    practice: developing models
FAULT    an over-compensated probe adds an overshoot the circuit does not have (or an under-compensated one hides
         a real one under a rounded corner) — "is this the circuit or the probe?" (wrap-up reserve; checklist
         line 19).
-->

<!-- FILLED 2026-10-07: drafted from training-overview Day 2 Module 2 and standard practice; tutor to review.
     Was: GAP — no transcript yet. Needs (training-overview Day 2 Module 2): probe compensation as a frequency-dependent divider, shown under-compensated, over-compensated and flat. Build the probe and the instrument input as a divider, drive it with a square wave, and step the compensation. -->

```flow
Start with the probe itself. A ×10 probe is not just a wire with a clip on it. In the tip there is a 9 MΩ
resistor, and at the other end of the cable is the instrument's input, 1 MΩ. Nine parts to one: that is where
the ×10 comes from.

But the instrument's input also has capacitance, and so does the cable: a few tens of picofarads together. So
the probe carries a small adjustable capacitor as well, C_comp. Now there are two dividers on top of each
other, a resistive one and a capacitive one.

For a slow signal, the resistors decide the ratio. For a fast edge, the capacitors decide it. When the two
ratios agree, every frequency is divided by exactly ten, and the probe is flat. That adjustment is called
**compensation**, and it is what the little screw on the probe is for.

[[demo]] Plot Bench — the three responses, unlabelled.

[[ask]] One of these is flat. Which one? And what is wrong with the other two?

[[pause]]

[[reveal]] Step the compensation capacitor through its three settings and name each trace.

On the Plot bench the same divider has the compensation ratio as a slider. At 1, the trace is flat: that is B.
Drag it up to 2, and a spike and a droop grow out of the flat trace: that is C, over-compensated. Drag it down
to 0.5, and the edge starts low and creeps up to its level: that is A, under-compensated.

The edge is set by the capacitor ratio, and the flat top by the resistor ratio. With too much C_comp, the fast
edge gets through at more than a tenth, then relaxes to a tenth. With too little, it gets through at less than
a tenth, then climbs.

None of that is in the circuit. It is the probe. And the awkward case is when you cannot tell: an
over-compensated probe adds an overshoot your circuit does not have, and an under-compensated one can round
off one that it does.
```

***

## Cable capacitance loads the node

A cable's capacitance hangs on the node you measure. It loads that node and slows genuine edges, so a
fast edge in the circuit arrives slower at the instrument.

<!-- PLAN
SHOW     Plot — a genuine 0 → 1 edge at a node of source resistance R_s, before and after the cable's capacitance
         hangs on it: v = 1 − exp(−t/(R_s·C)), the ideal step dashed; R_s (100 Ω → 100 kΩ, default 10 kΩ) and
         C (0 → 300 pF, default 100 pF, about a metre of coax) as sliders; markers at 10 % and 90 %.
         Drive: C = 0 (the ideal edge), then C = 100 pF; then R_s from 100 Ω to 10 kΩ to 100 kΩ.
         Look for: t_r = 2.2·R_s·C — 22 ns behind a 100 Ω driver, 2.2 µs behind a 10 kΩ divider, 22 µs behind
         100 kΩ. The same cable is harmless on a stiff node and dominant on a high-impedance one: Day 1's loading,
         now with time in it. Then the ADC-pin case, told over the same plot: a probe on a high-impedance divider
         feeding the ADC adds its C to the charge the sampling capacitor draws on and its R to the divider's
         load, so the code can move when the probe goes on.
         Status: ready. Ideal on-circuit version → needs Electronics: step/square source, a scope with a time
                 trace, cable capacitance on a net class or a probe-cable C parameter; the ADC-pin case also needs
                 the switch and sampling capacitor of the Day 1 · 070 ADC input.
ASK      poe (after the statement) — "I am going to add the cable's capacitance to this node. What happens to the
         genuine edge?"
         options: nothing — the cable only carries it | it arrives slower | it arrives faster, with overshoot |
                  it arrives later, with the same shape      answer: it arrives slower
         reveal: raise C from 0 to 100 pF on the Plot; then raise R_s and watch the edge stretch further
         explain: the cable's capacitance has to be charged through the node's own source resistance, so the edge
                  takes a time set by their product, about 2.2·R_s·C from 10 % to 90 %.
         depth: understand    practice: developing models
FAULT    "the reading is right only while the probe is on the ADC pin" — the probe's capacitance helps a
         high-impedance source charge the sampling capacitor (Day 1 · 070); take the probe off and the code drops.
-->

<!-- FILLED 2026-10-07: drafted from training-overview Day 2 Module 2 (Demo #6, ADC-pin probing) and standard practice; tutor to review.
     Was: GAP — no transcript yet. Needs (training-overview Day 2 Module 2): cable capacitance loading the node and slowing genuine edges. Add the cable's C to the ideal node and compare the edge before and after. Then the ADC-pin probing case from Demo #6: the probe on the ADC input is part of the circuit at that pin. -->

```flow
The probe is not the only thing with capacitance. The cable that carries the signal to the instrument has
it too, typically around 100 pF for a metre of coax. And it hangs straight on the node you are measuring.

[[demo]] Plot — a genuine edge at a node whose source resistance is 10 kΩ, about what one of our Day 1
dividers looks like from outside. The dashed line is the ideal edge. Cable capacitance: zero, for now.

[[ask]] I am going to add the cable's capacitance to this node. What happens to the genuine edge?

[[pause]]

[[demo]] Run it.

The capacitance goes from zero to 100 pF.

[[reveal]] The edge arrives slower. The cable's capacitance has to be charged, and the only thing charging it
is the node's own source resistance. From 10 % to 90 % takes about 2.2 × R × C: here, 2.2 µs.

Now change only the source. Behind 100 Ω, the same cable costs 22 ns, and you would hardly notice. Behind
100 kΩ it costs 22 µs. Same cable, same capacitance. What decides whether it matters is the impedance of the
node. That is Day 1's loading again, with time in it.

One case deserves its own sentence: the ADC pin. Our high-impedance divider feeds a sampling capacitor it can
barely charge in time. Clip a probe on that pin, and the probe's capacitance becomes a small reservoir for the
sampling capacitor to draw on, while its resistance loads the divider. So the code can change when the probe
goes on. The probe on the ADC input is part of the circuit at that pin.
```

***

## Lead inductance rings on fast transitions

Lead inductance rings on fast transitions. The area of the loop the leads enclose is the parameter we
sweep.

<!-- PLAN
SHOW     Plot — a fast edge seen through the probe's ground-lead loop: the loop's L with the probe's tip
         capacitance (10 pF) and a small damping R (20 Ω): v = 1 − exp(−αt)·[cos(ω_d·t) + (α/ω_d)·sin(ω_d·t)],
         α = R/(2L), ω_d = √(1/(LC) − α²). The slider is L, labelled by loop: spring tip ≈ 15 nH, 15 cm ground
         lead ≈ 150 nH, 30 cm ≈ 300 nH (roughly 1 nH per mm of lead). Drive: spring tip first, then animate L up
         to the long lead.
         Look for: the ring frequency 1/(2π√(LC)) falls, about 410 MHz → 130 MHz, and the ringing swings further
         and lasts longer, because the damping ratio (R/2)·√(C/L) falls as L grows (0.26 → 0.08).
         Status: ready. Ideal on-circuit version → needs Electronics: inductor class, a ground-lead L on the
                 probe set by loop area, fast step source, scope.
ASK      poe (after the statement) — "As the loop area grows, which way does the ringing move?"
         options: higher in frequency, and it dies sooner | lower in frequency, and it lasts longer | unchanged — it
                  belongs to the circuit | it disappears      answer: lower in frequency, and it lasts longer
         reveal: animate L from the spring tip to the 30 cm lead
         explain: the loop's inductance and the probe's capacitance form a resonant circuit, so more area means
                  more L, a lower resonant frequency and less damping from the same resistance.
         depth: understand    practice: analysing data
-->

<!-- FILLED 2026-10-07: drafted from training-overview Day 2 Module 2 and standard practice; tutor to review.
     Was: GAP — no transcript yet. Needs (training-overview Day 2 Module 2): lead inductance ringing on fast transitions, with loop area as the swept parameter. Put the lead L in the probe path and `.step` the loop area. -->

```flow
The last connection is the ground lead, the short wire with the crocodile clip. With the probe tip it
encloses a loop, and a loop has inductance: as a rough guide, about a nanohenry per millimetre of lead.

That inductance sits in series with the probe's tip capacitance, typically around 10 pF. An inductor and a
capacitor together make a resonant circuit, and a fast edge sets it ringing.

[[demo]] Plot — a fast edge seen through the loop, starting with a spring tip to ground: about 15 nH.

[[ask]] As the loop area grows, which way does the ringing move?

[[pause]]

[[demo]] Run the sweep.

From the spring tip, to a 15 cm lead, to 30 cm.

[[reveal]] The ringing drops in frequency, swings further and lasts longer. Its frequency is 1 / (2π√(LC)):
about 410 MHz with the spring tip, about 130 MHz with 15 cm of lead. More area, more L, a lower frequency.
And the same small resistance damps a larger L less, so the ringing dies more slowly.

So when a fast edge rings at a hundred-odd megahertz, the first question is not about the circuit. It is: how
long is my ground lead? The fix is a small loop: the spring tip, or a ground connection right beside the point
you are probing.
```

***

## An ideal simulation has no parasitics until you put them there

All of it is the same story: parasitic C and L that an ideal simulation does not contain until you
put them there. The model shows what you measure only when it contains what you connected.

<!-- PLAN
SHOW     Draw — the wire-as-RLC drawing from the second card, completed: the node, the probe's tip C and C_comp,
         the cable C and the ground-lead L, each tagged with the waveform it produced (corner or spike, slow edge,
         ringing). Drive: one tag per item as the room reads its list back.
         Status: needs Draw: wire-as-RLC, final state with tags
ASK      checkpoint (after the statement) — "List the parasitic elements you added to your ideal model, and what
         each one did to the waveform."
         items: C_comp against the instrument's C → edge shape, rounded or spiked | cable C against the node's
                source resistance → slower edge, t_r ≈ 2.2·R_s·C | ground-lead L with the tip C → ringing, lower and
                longer as the loop grows | the probe on the ADC pin → a different code at that pin
         depth: understand    practice: developing models
HARVEST  S70 — "Here is the list you made at the start. Capacitance, inductance, resistance — each one now has a
         waveform beside it, and none of them was in the circuit until we connected to it."
-->

<!-- FILLED 2026-10-07: drafted from training-overview Day 2 Module 2; tutor to review.
     Was: GAP — no transcript yet. Needs (training-overview Day 2 Module 2): the closing point that all of it is the same story — parasitic C and L that an ideal simulation does not contain until you put them there. Go back to the room's list from the first card and tick off what we added. -->

```flow
Go back to the list you made at the start: resistance, capacitance, inductance.

[[demo]] The drawing, completed: the probe's compensation, the cable's capacitance and the ground lead's
inductance, each tagged with what it did.

[[ask]] List the parasitic elements you added to your ideal model, and what each one did to the
waveform.

[[pause]]

The compensation capacitor decided the shape of the edge. The cable capacitance, against the node's source
resistance, decided how fast it could rise. The ground-lead inductance, against the tip capacitance, rang.
And at the ADC pin, the probe changed the reading it was there to observe.

It is all the same story. An ideal simulation of your circuit contains none of these until you put them
there. The model shows what you measure only when it contains what you connected.

[[transition]] So the signal has made it along the wires, carrying a little more than it started with.
The next thing it meets is the conditioning in front of the converter, and an AC signal has two
problems there that a DC signal never had: it swings negative, and it may contain frequencies the
converter cannot honestly represent.
```
