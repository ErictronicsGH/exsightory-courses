# ExSight test courses

The courses ExSight Studio, ExSight Scope and the benches are tested and driven against. **They are content, not code**:
nothing here is built, packaged or imported. A player loads one as it loads any course, from its folder (or the
`.insightcourse` compiled from it), when a test, a drive or a person asks for it.

Owner's decision, 2026-10-22: *"if it is a test course then it has to be decoupled from the code base and moved into a
different folder outside of the application src just like PBL2026, then the scope and studio can load them as required"*.
So they live at `C:\ExSightory\courses\`, inside the project and outside `src/`, in this repository of their own, as the
benches have theirs. ExSightory's git ignores this folder.

| Folder | What it is | Committed by |
|---|---|---|
| `electronics/` | The Electronics Bench's driving course: 20 stamped circuits in seven sections, and its `bench-catalogue.json` | Benches |
| `draw/` | The Draw Bench's driving course | Benches |
| `test-course/` | The **format** fixture: one of every block type and canvas kind (arriving from ExSightory's `src/test-course`, Core's) | Core |

Each course is its `src/` (what a compile reads) with its README and CHANGELOG. The npm packages they were published as
until 2026-10-22 (`@erictronicsgh/course-electronics`, `@erictronicsgh/course-draw`, `@insight/test-course`) are retired:
a player reads the folder, never a package.

## Finding a course

A test, a drive or a tool finds this folder by **`EXSIGHT_COURSES`** if it is set, and otherwise by walking up from
where it runs until a folder holds `courses/README.md` with this title. Every checkout of the project, a lane's worktree
under `lanes\` included, sits inside `C:\ExSightory`, so the walk finds it. Each repository writes that ten-line helper
itself; there is no package to share it through.

```sh
# from src/insight (Core's compiler); zero warnings is correct for electronics
node packages/insight-core/bin/insight-compile.js ../../courses/electronics/src --out ../../.tmp-out/bench-electronics.insightcourse
```

## Rules

- **Commit by named paths, prefixed with the course**: `electronics: …`, `draw: …`, `test-course: …`. A lane commits only
  the courses it owns (the table above); a change another lane needs is asked by crossing in ExSightory's
  `.claude/crossing/`.
- **A circuit's facts come from its stamp.** After editing a circuit, stamp it again with the benches' stamping tool, or
  it compiles without its dials and probes.
- **No code here**: no `package.json`, no scripts, no tests. A check of a course lives in the repository that runs it.
