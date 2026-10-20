---
name: market-versions-locked
description: Owner 2026-10-12 — parts sold in standard types (LDRs first) ship as ExSight's ready-made, locked market versions that users pick; never typed values
metadata:
  type: project
---

Owner, 2026-10-12: *"for something like the LDr since there are standard versions already on the market we can just
precreate the available market versions for user to select instead of allowing use to supply parameters. the
precreated will then be locked to their specific values"*.

**Why:** values a user types drift off the market; a fixed set of real types is simpler to choose from and keeps every
part true to a datasheet (gates 1–3).

**How to apply:** convention C21. Market data (`bench-work/components/market/<part>.json`, sourced, PDF pages) →
generator (`make-<part>-catalogue.mjs`, browser-safe builder `cds-versions.mjs` so the bench builds the same manifests in
memory) → `components/library/exsight/<id>/component.json`, `readOnly`, `identity.market`; the validator's
`checkLocked` refuses any difference and any cell that is not a version; `--check` and the market tests prove the
files equal the data. The bench library shows a version list under the tile; the editor shows the lock and opens other
versions. A new type = add a sourced row (re-read on the rendered page), regenerate, validate. Related:
[[components-made-by-users]], [[component-standard]], [[model-components-first]].

**Cells on a board:** a cell's leads are formed to the front (family `leadForm: "front"`) so the 2D plan shows them, and
its leads bend toward each other at the base to the widest whole 2.54 mm pitch that fits the front flat, then run forward onto a grid line (the owner rejected splaying them outward on the Φ12) (owner, 2026-10-12). A CdS
cell's flats are parallel to its leads; check any new body family against the datasheet drawing's plan view.
