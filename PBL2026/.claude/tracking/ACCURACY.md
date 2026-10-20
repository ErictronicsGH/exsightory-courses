# Accuracy register

Every accuracy finding on the course (rule: `.claude/standards/course-accuracy.md`). **Open blocks**: a unit is not done,
a module not ready and the course not published while any row on it is open. Statuses: open → decided (the owner chose)
→ applied (the text or spec says it and was re-checked).

## Modules checked

| Module | Checked | By unit | Open findings |
|---|---|---|---|
| D1·070 | 2026-10-20 (A1–A7) | U016 | none (F1, F5–F11 decided and applied 2026-10-20; F6/F7 re-checked in the card-2, 3, 7 specs when written) |
| D1·010 – D1·060, D1·080 | not yet under this rule (written before 2026-10-20) | sweep proposed | unknown |

## Findings

| Id | Module · card | Finding | Status | Decision |
|---|---|---|---|---|
| D1·070-F1 | card 1 (and card 7) | The ATmega328P is named as the example; every number is the cold open's 12-bit, 3.3 V converter; that chip converts 10 bits. | applied | Owner 2026-10-20: name the class. Card 1 p1 now *"A 12-bit MCU converter, like most, includes a sample-and-hold…"*; card 7 p0 *"On parts without that setting, a slower ADC clock is the lever."*; card 7 PLAN *"on parts without one"*. The chip stays in SOURCES only. Re-checked: no number depended on the name. |
| D1·070-F5 | cards 3, 8 | 1.65 V is exactly 2048.000 LSB: on the course's truncating converter any shortfall reads 2047; settled cases sit on the 2047/2048 edge; 50 kΩ reads 1759. The Flow's "2048" and "about 1760" are round-to-nearest. | applied (text) | Owner 2026-10-20: say it sits on the edge. Card 3 reveal and PLAN, card 8 Flow p2 and PLAN now *"2047 or 2048"*; 50 kΩ stays *"about 1760"* (1759, PLAN). Re-checked 1.5 kΩ × 10 pF = 15 ns; 1 µs / 510 ns = 1.96 τ, e^−1.96 = 14.1 %; 2048 × 0.859 = 1759.3 → 1759; 289 codes apart (*nearly 300* ✓). |
| D1·070-F6 | card 3 | "That's our 2047 … a 100 k divider": the card's own 100 k demo gives ≈1760 (3.3 V, 1 µs); the cold open's 2047 came from 3.585 V and a 1.29 µs window (2.53 τ, 177 LSB short, ideal 2225). | decided → applied in card 3's PLAN | Owner 2026-10-20: add the cold-open run to card 3. PLAN reveal now names it: 3.585 V into 100 k / 100 k (1.7925 V), 1.29 µs (2.53 τ), 177 LSB short, 2047 of an ideal 2224. The harvest's words stay. To check in the card-3 spec. |
| D1·070-F7 | cards 2, 7 | The 9 τ rule and card 6's 10.1 kΩ assume a full-scale step; the Plot is a half-scale step (needs 8.3 τ): at 10 kΩ the shortfall is 0.23 LSB ("only just" overstates it), and in card 7 the curve crosses ½ LSB at 4.24 µs, not as the window closes at 4.6 µs. | decided → applied in card 2's PLAN | Owner 2026-10-20: show both. The zoom carries the full-scale step (0 → 3.3 V) dashed; *"only just"* (0.46 LSB at 10 kΩ) and card 7's crossing at 4.6 µs are read on it; the half-scale curve gives 0.23 LSB and crosses at 4.24 µs. Flow unchanged. To check in the card-2 and card-7 specs. |
| D1·070-F8 | card 3 | "The same voltage on a meter": a 10 MΩ meter on the 2 V range reads the 1 k divider 1.650 V and the 100 k divider 1.642 V (0.5 % loading, as D1·010 notes). Close, not the same. | applied | Owner 2026-10-20: *"Nearly the same voltage on a meter."* (card 3 p4). 1.650 V and 1.642 V on a 10 MΩ meter. |
| D1·070-F9 | card 6 p2 | *"The window has to hold enough time constants to settle to half an LSB"* omits *after a full-scale step*: ln 2^(N+1) is the full-scale case; a half-scale step needs ln 4096 = 8.32 τ and allows 11.02 kΩ, not 10.10. 10.1 kΩ is the safe (worst-case) answer, but the condition is unstated. Spec `D1-070-06` §14 F5. | applied | Owner 2026-10-20: p2 *"…to settle to half an LSB after a full-scale step:"*. |
| D1·070-F10 | card 6 p0 | *"For a 12-bit ADC with this acquisition window"*: the last window on the stage was card 4's 0.5 µs (answer 4.55 kΩ); the PLAN's on-screen question says 1 µs. Spec `D1-070-06` §14 F6. | applied | Owner 2026-10-20: p0 *"For a 12-bit ADC with a 1 µs acquisition window…"*. |
| D1·070-F11 | card 1 p7 (and its PLAN explain) against card 3 p6 | *"Every sample, it has to fill a capacitor"* / *"the source has to charge it every time"*: under the course's model (the capacitor keeps its charge) and card 3 p6's own words, one channel converted back-to-back at a steady input needs almost no charge after the first sample. True when another channel (or ground) was sampled in between. The U016 page's card-1 strip (three samples of one channel, flat after the first) shows the contradiction. Spec `D1-070-01` §14 F1, F2. | applied | Owner 2026-10-20: p7 *"Every sample, it has to charge that capacitor to the input, from wherever it was last left, through the switch and through its own output impedance."*; the PLAN's explain likewise; card 1's strip is one sample from 0 V, then the switch closing again. |
