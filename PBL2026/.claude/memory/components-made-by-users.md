---
name: components-made-by-users
description: Owner 2026-10-12 — users may make their own components (data only, on ExSight's classes) and request others with a tracking page; AI on their tokens following ExSight's guide
metadata:
  type: project
---

Owner, 2026-10-12: *"lets give authors ability to create their own component for their own demonstrations because if 100
million people use exsight it will be difficult keeping up"*; two options: a **request** tied to the account with a
**tracking page**, and **advanced users create their own from models and data**, possibly with **their own AI tokens**
following **a full guide ExSight publishes for AI systems**.

**Why:** scale; ExSight alone cannot make every part. It reverses the product's recorded rule of 2026-09-28 (components
made in house "until we can create a tool that can make author create their own components accurately"), so the design
must supply that accuracy: checks + golden cases from the datasheet + review.

**How to apply:** the approach is `bench-work/components/01-user-made-components.md` (U1–U8, adopted 2026-10-12;
research 10; request X17): data only on trusted classes (variant / new part on a class / composite; new behaviour =
ExSight via requests), private by default, tiers up to official, every value sourced, the server's checks the only word
that counts, AI drafts never trusted on their own claim. Related: [[component-standard]], [[component-editor]],
[[model-components-first]].

**Proof built 2026-10-12:** the convention and the guide for AI systems live in `bench-work/components/convention/`
(CONVENTION C1–C17, SKILL, class and family pages, an example, experiments). Test a guide change by giving a fresh agent
only that folder and a real part (experiment 1: GL5528, valid first run; its findings drove 0.2). A rule marked V must
really be in the validator: the AI found one that was not. A body family's realism is judged on close-up renders
against the datasheet drawing (flats, band order, colours).

**Market parts are picked, not made (owner 2026-10-12, convention C21):** where the market sells standard types (CdS
photoresistors first), ExSight pre-creates every type as a read-only, locked version generated from sourced market data
(`components/market/`, `components/library/exsight/`); users choose one, the validator refuses any other CdS cell, and a
missing type is a request. Before locking anything to market data, re-read every row off the rendered datasheet page:
the first pass had printed-for-PDF pages, invented per-size times and a γ minimum read as typical. See
[[market-versions-locked]].
