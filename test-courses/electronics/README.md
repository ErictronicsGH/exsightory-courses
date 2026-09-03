# The Electronics Bench's driving course

Not teaching material. This exists so that driving one circuit loads one circuit's worth of
course — five subsections, thirteen demonstrations, and nothing else.

The convention it is the first instance of is
[`.claude/implementation/standards/bench-fixture-courses.md`](../../../.claude/implementation/standards/bench-fixture-courses.md).
Read that before adding a bench course; this file is only the local map.

## Layout

| Subsection | id | Circuits |
|---|---|---|
| What the instrument costs the circuit | `bench-measuring` | `divider-loading`, `divider-differential` |
| Reading a current, and moving what reads it | `bench-current` | `branch-current`, `probe-walk`, `clamp-walk` |
| The part is not the symbol | `bench-devices` | `leakage`, `recovery` |
| Power, heat, and the limit | `bench-power` | `package-heat`, `overpower`, `power-transfer` |
| The wire is a component | `bench-nets` | `four-wire-sensing`, `net-sizing`, `controlled-impedance` |

Every circuit and the whole component library live in `src/shared-assets/`, so a subsection
file is prose and fences only, and the library is vendored **once** rather than per
subsection.

## Compile and install

```sh
cd Application/insight
node packages/insight-core/bin/insight-compile.js ../bench-courses/electronics/src \
  --out ../../.tmp-out/bench-electronics.insightcourse
rm -rf "$APPDATA/INSIGHT/courses/bench-electronics"
cp -r ../../.tmp-out/bench-electronics.insightcourse "$APPDATA/INSIGHT/courses/bench-electronics"
```

Zero warnings is correct.

## Driving it

```sh
cd apps/desktop && npm run build
node tools/drive.mjs tools/shots-<name> tools/drive-circuit-<stage>.json
```

A script names a beat rather than searching for one:

```json
{ "name": "the four-wire rig", "beat": { "subsection": "bench-nets", "circuit": "four-wire-sensing" } }
```

`test/driverBeats.test.ts` checks every one of those against this course's source, so a
renamed circuit fails a suite rather than a screenshot.

## When the baseline library changes

`src/shared-assets/parts/baseline/` is a **copy**, and the version gate is exact equality — a
patch bump to `libraries/baseline/` sweeps every `.benchcircuit` pin here too. Re-copy it:

```sh
rm -rf Application/bench-courses/electronics/src/shared-assets/parts/baseline
cp -r Application/insight/libraries/baseline \
      Application/bench-courses/electronics/src/shared-assets/parts/baseline
```
