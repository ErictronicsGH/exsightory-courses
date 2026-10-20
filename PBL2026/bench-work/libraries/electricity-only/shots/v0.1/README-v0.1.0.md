# D1·030 card 1: Our circuits only understand electricity (sequence `electricity-only`)

Owner, 2026-10-10: *"proceed with all your recommendations"* on card 1's brief (Q1 D1·010's lamp + LDR + 2.2 kΩ; Q2 the
bare lead that ignores the dimmer, then the sensor that follows it; Q3 temperature and pressure as fixed example insets;
Q4 the five advantages one at a time; Q5 S8 shown with the divider's current and the cell's heat). Mid-turn: *"remember the
6 gates. realism is important"* (the bench was redrawn to one scale, below).

Open: `http://localhost:8769/prototypes/animation-bench/?lib=../../libraries/electricity-only/` (launch entry
`animation-bench-b`). **v0.1.0: stills** (each view settled; motion after the owner's comments). Stills in `shots/`:
`en-*.png`, `fr-*.png`, `contact-sheet-en.jpg`, `contact-sheet-fr.jpg`.

Kit master `libraries/sense-kit/senkit.js` (numbers and drawing); manifests and kit copies from `sense-kit/manifests.py`
(`python manifests.py`). Built on svgkit, dinkit and srckit (the hot plate and mug, the path strip). Block 1 reuses D1·010's
`ldr-chain` drawing files. The first block-1 draft (`eye-and-sensor`, a new eye-over-bench picture; owner: *"the electronic
measurement lacks prominence … why not use it instead of recreating"*) is archived in `libraries/_archive/eye-and-sensor-v0.1.0/`;
`sense-kit/make_head.py` and `assets/head.svg` stay for the record.

## Blocks (four reusable units, one block at a time; the lamp's dimmer, `dim`, shared by all)

| Key | Unit | Flow | What it shows |
|---|---|---|---|
| 1 | `eye-and-chain` | ¶0 (21.0 s) | **D1·010 card 4's opening screen, reused** (owner: *"we already designed a screen that compared the eye operation with light operation in the first chapter … use that"*): its eye still above (organ → pathway → processor), its LDR measurement chain below (sensor → conditioning & wiring → ADC & firmware), each part of the eye ringed and linked to its bracket; the brackets named (no "spoiled" marks: that was card 4's ¶5); the brain never handles light itself; the signals flow on "the same arrangement"; the sensor board framed, SENSING. Files `eye-static.js` and `chain.js` copied unchanged from `libraries/ldr-chain/` (byte-identical); the unit places them as card 4's opening does (0.8 × at (280, 300)), drives the chain's lamp from the shared dimmer, and swaps the screen's words for FR (`tr1…tr20`, `atLux`) |
| 2 | `bare-input` | ¶1 (18.9 s) | Light, temperature (63.2 °C water) and pressure (2.0 bar air line) are not electrical; the MCU takes in only a voltage on A0 (0 … 3.3 V). A bare lead from A0 lies in the lamp's light: the pin floats, its code wanders (1100 … 3040) whatever the dimmer does; the chart shows the light (turned down a decade, up half a decade, back) and the code over the view (correlation 0.02); A0 through a magnifier; "we need an electrical representation" |
| 3a | `usable-signal` | ¶2 (16.7 s) | The LDR board in the bare lead's place (CdS cell over 2.2 kΩ from 3.3 V, OUT to A0): 300 lux → 1.39 kΩ → 2.02 V → code 2512 = 2.024 V; the same turn of the dimmer, now the code follows the light; the sensor (through a magnifier) on the boundary between the physical world and the electronic system |
| 3b | 〃 | ¶3 (2.1 s, held 6.0) | The course path with QUANTITY and sensor lit; *Physical quantity → sensor → usable signal* with this bench's values (light 300 lux · LDR over 2.2 kΩ · 2.02 V on OUT); each word's part marked in its colour (the light's pool amber, the sensor ringed, the OUT lead glowing teal) |
| 4a | `five-advantages` | ¶4 + item 1 (19.7 s) | The five advantages as five marks; item 1: five real sensing elements, quantity → property, a typical value each: CdS cell (live, the bench's), Pt100 film (100 Ω at 0 °C, +0.385 Ω/°C), capacitive humidity element (≈ 180 pF at 55 %RH, ≈ 0.3 pF/%RH), piezo disc (≈ 0.4 nC/N, PZT), linear Hall sensor (≈ 25 mV/mT). Card 5's four (thermistor, thermocouple, photodiode, strain gauge) are left for its question |
| 4b | 〃 | item 2, S8 (19.7 s) | Amplified: a non-inverting amplifier, gain 1 + 99 kΩ / 1 kΩ = 100, 20.0 mV → 2.00 V (input illustrative). Not free: the bench's divider draws 0.92 mA through the cell, I²R = 1.17 mW heats it, the cell absorbs light it measures; "comes back in D1·040" |
| 4c | 〃 | item 3 (8.0 s) | A digital ambient-light sensor opened up (≈ 2 × 2 mm): photodiode → amplifier (conditioning) ← compensation (temperature, dark current) → ADC (conversion) → I²C (a number out); its result register reads the bench's 300 lux |
| 4d | 〃 | item 4 (8.0 s) | One reading (code 2512 → 300 lux in the firmware) as a number (seven segments), text (16 × 2 LCD), a graphic (log bar 1 … 2000 lux), a diagram (the last minute, logged once a second) |
| 4e | 〃 | item 5 (9.0 s) | The board sends it over USB to a laptop's serial monitor and by a 2.4 GHz radio module on its header to a phone |

Timings at 140 words a minute from the Flow's word counts (¶0 49, ¶1 44, ¶2 39, ¶3 5, ¶4 13, items 33/46/16/17/19).

## The bench (views 2, 3a, 3b; one scale: 1 mm = 5 px)

Owner, 2026-10-10: *"the electronics setup you have done for 2 and 3a is very ugly and unrealistic … a setup that include
arduino UNO board the sensor and the screen nicely laid out on a full size bread board … neatly done and realistic and should
maintain accuracy"*. Rebuilt (sense-kit `bench`), seen from about 65° above (depths × 0.90, heights × 0.43), to one scale:
- **The breadboard is D1·020 card 3's** (dinkit `breadboard`, reused; its kit now exports `setBoard` so a user can size it),
  set to full size: 830 points, 63 columns, 165.1 × 54.6 × 9.5 mm. Near rails + 3.3 V and − GND, bridged to the far rails at
  the right end.
- **The board is the UNO form, unbranded** (standing rule *real but unbranded*): 68.6 × 53.3 mm, its outline, the UNO's header
  positions (far: SCL SDA AREF GND 13 … 8, 7 … 0; near: IOREF RESET 3.3V 5V GND GND VIN, A0 … A5), USB-C, DC jack, a 64-pin
  MCU, ICSP, reset, LEDs, its print; no maker's name or logo. **Its ADC reads 12 bits against 3.3 V on AREF** (as the
  12-bit-ADC versions of the UNO form can: AREF wired to the 3.3 V rail), so the code is D1·010's: 2512 at 300 lux.
- **The divider:** + rail → column 10, the 5 mm CdS cell 10 → 13 (row d), a ¼ W 2.2 kΩ 13 → 18 (row b; dinkit's resistor,
  new kind `2k2`: red red red gold), 18 → − rail; the middle (13) carried along row e by a flat jumper to column 54, a Dupont
  lead from there to A0. View 2: no divider; the yellow lead from A0 lies loose in the light, 6 mm of copper bared.
- **The display:** a 1.3" I²C OLED (35.4 × 33.5 mm, 128 × 64 dots on 29.4 × 14.7 mm) lying flat on its 4 pins in row f
  (columns 40–43), fed from the far rails under it; SCL and SDA brought out under its edge to columns 50, 51 and on to the
  board's SCL and SDA. It shows the code and the firmware's volts (code × 3.3 / 4096).
- **The leads:** solid jumpers lying on the breadboard; male–male Dupont leads (2.5 × 14 mm shells) to the board.
- **The lamp:** its head off the top-left corner, aimed at the cell; the light's pool on the bench (half-width 36 mm).
  **The dimmer** (on the lamp's cord, off the picture) is shown in a card at 0.6 × (stated); its wheel is the card's input.
- Print too small to read: A0 seen from above through a lens (×1.8, view 2); the divider through a lens (×2.6, view 3a).
- View 4e shows the same UNO-type board (1.5 ×) with a 2.4 GHz radio module on its far header.

## Numbers (kit `SENKIT`; checked in Node)

- LDR: R = 15 kΩ · (E / 10 lux)^−0.70 (dark ≥ 1 MΩ), over 2.2 kΩ from 3.3 V; 12-bit ADC on 3.3 V: code = ⌊V / 3.3 · 4096⌋;
  the firmware: V = code · 3.3 / 4096, lux back from the code. D1·010 card 4's numbers.
- 300 lux (wheel 0.7504 of a log taper 1 … 2000 lux: 299.98 lux): 1.387 kΩ, 2.0239 V, code 2512 = 2.024 V, 299.9 lux back
  (shown 300); divider current 0.920 mA, I²R in the cell 1.174 mW.
- Dragged (browser pane, real pointer, view 3a): 34 lux → 6.35 kΩ, OUT 0.85 V, code 1054 = 0.849 V; every block read the
  same (shared `dim`); Reset → 300 lux. Range: 1 lux → 75.2 kΩ, 0.094 V; 2000 lux → 368 Ω, 2.83 V.
- The floating input: 10 readings a second, a 2.3 s and a 0.9 s wander and a random part (illustrative of a floating pin);
  correlation with the walk's light 0.02.
- Pt100 α 0.00385 /°C (IEC 60751); humidity element 180 pF at 55 %RH, 0.34 pF/%RH (a typical polymer element); PZT d33
  ≈ 374 … 590 pC/N; linear Hall ≈ 25 mV/mT (2.5 mV/G class). Labelled *typical*.

## The six gates (`.claude/standards/six-gates.md`)

1. **Realism.** One stated scale for the bench (1 mm = 5 px); real parts at real size: a full-size breadboard (D1·020's
   drawing), the UNO form with its headers where the UNO has them, a 5 mm CdS cell, a ¼ W 2.2 kΩ (red red red gold), a 1.3"
   OLED on its 4 pins, solid jumpers and Dupont leads with their shells, the lamp's light only within its shade's cone; the
   display's last digit wanders a count or two; settled captures hold still; view 1 is D1·010's own screen. The dimmer card
   states its scale (×0.6), the lenses theirs (×1.8, ×2.6).
2. **Science.** Light on copper gives no voltage (visible photons 1.6 … 3.3 eV, copper's work function ≈ 4.7 eV); a floating
   input reads whatever it picks up, never the light; the LDR's divider and the ADC as on D1·010; the sensor takes energy
   (current, heat) and absorbs light it measures (S8); the amplifier's gain from its resistors; typical values labelled;
   illustrative input and the floating model said on the stage or here.
3. **Maths.** Every value from `SENKIT` (above), the same in the OLED, the callouts, the table, the 3b line, 4a, 4b, 4c, 4d,
   4e (callouts quote the true code 2512, the glass may wander); the gain 1 + 99/1 = 100; 20.0 mV × 100 = 2.00 V.
4. **Visualization and intuition.** The same arrangement made literal in view 1 (D1·010's screen: each part of the eye linked to
   its bracket on the chain, the electronics given the lower half of the stage);
   the contrast of blocks 2 and 3: the same turn of the dimmer, the code ignoring it, then following it, on the same chart;
   the boundary between the two worlds through the sensor; one advantage at a time.
5. **Consistency and coherence.** View 1 is D1·010's own screen (reused, not redrawn); D1·010's lamp/LDR numbers; D1·020's hot water at 63.2 °C, the course strip; one
   input shared by all blocks; the role colours the same in pictures and table; EN and FR throughout (numbers and
   markings untranslated).
6. **Professional design.** Every view checked on full-size captures EN and FR; fixed on the way: the inset mug outside its
   card, leads looping too high, board print hidden by the pins and later by the socket strip, the OLED text under the
   faded bench (layer order), labels crossed by the bench label and by the magnifier's cone, 3b's diagonal ties replaced by
   colour marks, block 4's ADC/I²C blocks touching, "lux" over the last digit, notes against the caption bar, the phone's
   text overflowing, the radio module floating (now seated on the header).

**Reuse (owner, 2026-10-10, a standing rule: memory `reuse-done-scenes`):** view 1 is D1·010's screen. Views 2–3 use this
card's UNO-type bench on D1·020's breadboard (owner: not D1·010's chain for 3a), its lamp head D1·020 card 1's, its numbers
D1·010's.

**Checked (v0.1.0):** `node --check` on every unit and kit copy; 9 views × every 0.25 s × EN + FR (801 frames each): no NaN,
undefined or Infinity, no console errors; the real drag above; Reset.

## Departures and notes (reported)

- U012's spec `D1-030-01-electricity-only.md` planned a Draw focus on the course path; the owner's brief direction made it an
  Animation Bench demonstration; the spec's path focus survives as view 3b. The spec is unchanged.
- View keys are 4a–4e (the brief said 5a–5e): the rail numbers blocks.
- When the presenter takes the dimmer during views 2/3a, the chart shows the light held at its new value for the whole
  view (no history is kept: the library draws from the bench's state). To settle in the motion pass.
- The chart's light uses a log axis (1 … 2000 lux), the code a linear one.

## Next

The owner's comments on the stills; then card 1's motion brief.
