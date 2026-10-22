# The Electronics Bench's driving course

Not teaching material. This exists so that driving one circuit loads one circuit's worth of
course — five subsections, thirteen demonstrations, and nothing else.

The convention it is the first instance of is
[`.claude/commons/standards/bench-fixture-courses.md`](https://github.com/ErictronicsGH/insight-course-player/blob/main/.claude/commons/standards/bench-fixture-courses.md)
in ExSightory. Read that before adding a bench course; this file is only the local map.

**It lives in `exsight-benches` since B018 (2026-10-22)**, as `@exsight/course-electronics`, published as
`@erictronicsgh/course-electronics` with `src/` and this file. ExSightory's `src/bench-courses/electronics/` came
here with its history and is frozen until it is removed: the course is edited here, released, and the players move
their pin.

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
cd src/insight          # ExSightory's, beside this checkout at src/exsight-benches
node packages/insight-core/bin/insight-compile.js ../exsight-benches/courses/electronics/src \
  --out ../../.tmp-out/bench-electronics.insightcourse
rm -rf "$APPDATA/ExSight Studio/courses/bench-electronics"
cp -r ../../.tmp-out/bench-electronics.insightcourse "$APPDATA/ExSight Studio/courses/bench-electronics"
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
rm -rf courses/electronics/src/shared-assets/parts/baseline
cp -r ../insight/libraries/baseline \
      courses/electronics/src/shared-assets/parts/baseline   # ExSightory's, until B011 gives the library its home
```
