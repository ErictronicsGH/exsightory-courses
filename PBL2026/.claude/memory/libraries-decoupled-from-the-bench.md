---
name: libraries-decoupled-from-the-bench
description: A library is a self-describing folder (library.json) loaded into a bench; the bench holds no list of libraries and takes every name, title and setting from the library's metadata
metadata:
  type: feedback
---

Owner, 2026-10-08, on the first Animation Bench prototype (which listed its libraries in a registry inside the bench
and kept them in the bench's folder): *"you are not to couple the libraries to the bench. we should be able to load a
library in a bench and the metadata to configure the bench should come from the library like the name, title, etc."*

**Why:** the bench is built once by ExSight and serves every course; a library is made by an author for a card. If the
bench names its libraries, every new card means editing the bench.

**How to apply:**
- A library is its own folder (here `bench-work/libraries/<id>/`), outside the bench, with a `library.json`: id, name,
  title, card, course, kind, version, description, the bench type and contract it targets, its features (Explore,
  Cards), its key hint, and its files (css, scripts in order).
- The bench has no registry: it loads a library from a location (`?lib=`) or a folder the user opens, reads the
  manifest, checks the bench type and contract, configures its frame from it (title, name, card, which switches
  show), then runs the library's code, which only registers its behaviour (stops, scene, hooks).
- The bench may remember what was loaded (per viewer) but never ships a list. Related: [[player-controls-are-the-bench]],
  [[bench-versus-library]].
