# ExSight test courses

The courses ExSight Studio, ExSight Scope and the benches are tested and driven against. **They are content, not code**:
nothing here is built, packaged or imported. A player loads one as it loads any course, from its folder (or the
`.insightcourse` compiled from it), when a test, a drive or a person asks for it.

Owner's decision, 2026-10-22: *"if it is a test course then it has to be decoupled from the code base and moved into a
different folder outside of the application src just like PBL2026, then the scope and studio can load them as required"*.
So they are this folder, `test-courses/`, of the owner's course repository `ErictronicsGH/exsightory-courses`, beside
`PBL2026/` (the owner: they are pushed into a sub folder of it, not to its root). ExSightory reads them from
**`C:\ExSightory\courses\`**, a sparse checkout of that repository holding only this folder (and the root's README and
`.gitignore`), inside the project and outside `src/`. ExSightory's git ignores that folder.

| Folder | What it is | Committed by |
|---|---|---|
| `electronics/` | The Electronics Bench's driving course: 20 stamped circuits in seven sections, and its `bench-catalogue.json` | Benches |
| `draw/` | The Draw Bench's driving course | Benches |
| `test-course/` | The **format** fixture: one of every block type and canvas kind, from ExSightory's `src/test-course` with its history (2026-10-22, crossing 697); `tools/` holds the two Python generators its binaries are made by, its sources as `draw/`'s `svg/` are, run by hand and by nothing else | Core |
| `rail-long/` | Study's contents rail (crossing 1022): three parts, the middle one of seven sections with a two-line title and a nine-slide section; text and checkpoints only | Core |
| `rail-parts/` | Study's contents rail (crossing 1022): nine parts, most of one section, so the folded headings fill the rail | Core |

Each course is its `src/` (what a compile reads) with its README and CHANGELOG. The npm packages they were published as
until 2026-10-22 (`@erictronicsgh/course-electronics`, `@erictronicsgh/course-draw`, `@insight/test-course`) are retired:
a player reads the folder, never a package.

## Finding a course

A test, a drive or a tool finds this folder by **`EXSIGHT_COURSES`** if it is set (the path of this `test-courses/`
folder), and otherwise by walking up from where it runs until a folder holds `courses/test-courses/README.md` beginning
with this title; a course is then `courses/test-courses/<name>/src`. Every checkout of the project, a lane's worktree under
`lanes\` included, sits inside `C:\ExSightory`, so the walk finds it. Each repository writes that ten-line helper itself;
there is no package to share it through.

```sh
# from src/insight (Core's compiler); zero warnings is correct for electronics. The course path is absolute:
# ../../courses is right from the root's src/insight and wrong from a lane worktree's (lanes/<lane>/courses)
node packages/insight-core/bin/insight-compile.js C:/ExSightory/courses/test-courses/electronics/src --out ../../.tmp-out/bench-electronics.insightcourse
```

## Rules

- **The repository's rules hold** (its root `README.md`): name the paths in every commit, never `git add -A`; a commit
  touches this folder only, prefixed **`test-courses: <course>: …`** (`test-courses: electronics: …`). A lane commits
  only the courses it owns (the table above); a change another lane needs is asked by crossing in ExSightory's
  `.claude/crossing/`. Push from `C:\ExSightory\courses` (`git pull --rebase` first: PBL2026's session pushes to the same
  `main`).
- **A circuit's facts come from its stamp.** After editing a circuit, stamp it again with the benches' stamping tool, or
  it compiles without its dials and probes.
- **No code here**: no `package.json`, no scripts, no tests (a course's asset generators, like `test-course/tools/`, are its sources, not code anything runs). A check of a course lives in the repository that runs it.
