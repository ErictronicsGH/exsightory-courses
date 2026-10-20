# Courses in development

Profesir's personal course-development repository (`ErictronicsGH/exsightory-courses`): the courses he authors for
ExSightory, while they are being written. **It is not ExSightory's and is not tied to it** (owner, 2026-10-20).
A course reaches ExSightory only when it is published, to the ExSightory platform's own destination for published
courses.

**Every course lives in its own folder at the top of this repository, and nothing else does.** A folder is one course,
whole: its `course.yaml`, its notes, its specs and its own `.claude/`. Nothing at the top level but this file and
`.gitignore`.

| Folder | Course |
|---|---|
| [`PBL2026/`](PBL2026/) | *From Sensor to Number*, Profesir's Birthday Lectures 2026 |

## Working on a course

- The working clone is the author's own folder (here `C:\@Profesir\MyBirthdayLectures`), and each course is worked on
  from its folder, by a session of its own, which reads that folder's `CLAUDE.md` first.
- **Name the paths** in every commit (`git commit -m "…" -- PBL2026/…`); never `git add -A` or `git add .`. Prefix the
  message with the course: `PBL2026: …`. One commit touches one course.
- **Not committed** (`.gitignore`): each course's `resoureces/` or `resources/` (source material such as the owner's STEP
  models, used to make bench libraries and never loaded by a bench), film frames (`film/`; stills only, owner
  2026-10-11), and `_decoupled-*` / `_moved-*` staging folders. They stay on disk.
