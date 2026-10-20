---
name: languages-follow-the-parent-app
description: Bench libraries are bilingual from the start the way InsightDemo is: every visible text as {en, fr}, English required, fallback to English, numbers and units never translated, a bench-level EN|FR switch
metadata:
  type: feedback
---

Owner, 2026-10-08: *"lets add the language switch outright. check the parent application to see how they handle
language and ensure that languages can be switch efficiently without recoding"*; then "go with your recommendations".

What the parent application does (researched 2026-10-08 in `D:\@Projects\2026\InsightDemo`): content text is
`LocalizedText { en: string; fr?: string }` per field (`insight-core/src/registry/types.ts`), looked up with
`localize(value, lang)` (`packages/blocks/src/useLocalized.ts`): the asked language if present, else English, never a
blank; a plain string means the same in every language. Codes are `en` and `fr` only. Benches take the language from
the host. Units and numbers are never translated (`formatQuantity`, a '.' decimal). One string with `{placeholder}`s,
never fragments; leave 30–50 % room for longer labels. insight-web keeps the viewer's choice in localStorage
`ex-locale`. The desktop is still fixed at English, and sandboxed HTML widgets receive no language yet.

**How to apply:** every word a library shows lives in its data as `{en, fr}` (library.json fields and a `strings`
table), never in code; the bench resolves it with the same rule and re-renders on a switch without a reload; the
bench's own frame words sit in one catalogue; `?lang=` and a per-viewer memory choose the language; markings printed on
instruments (POWER, HOLD, TARE, TYPE K) stay as on the real hardware; French drafts are mine, marked for the owner's
review. **Hosted, the switch hides** (owner, 2026-10-10: *"since the bench will be integrated into the parent … the language
selector should be something that will hide in the main app as the main app already has it"*): `?host=<app>`, a host
message `{ type: 'bench:lang', lang }` or `AnimationBench.setLanguage(l)` hides EN | FR and the host's language rules;
standalone it stays (bench v21). Any new bench chrome that the main app already provides follows the same pattern.
Related: [[real-but-unbranded]], [[libraries-decoupled-from-the-bench]].
