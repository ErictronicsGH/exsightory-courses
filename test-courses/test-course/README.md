# The bench-supply test course

A wholly invented course, written to exercise the player.

Nothing here is teaching material for any real delivery. It exists so the app is
developed against something with the shape of a real course — three chapters,
eight subsections, every block type, every canvas kind — without any test
depending on content the owner has yet to write. `generic.test.ts` in
`@insight/core` fails the build if course-specific terms leak into product
source, and this course is deliberately on the other side of that line.

## What it covers

| | |
|---|---|
| Block types | every renderable kind, including POE, checkpoints, polls, flash and short quizzes, a numeric question with a tolerance, a multiple-select, and an exit survey |
| Canvas kinds | image, SVG, PDF, video, sandboxed widget, 3D model — all six |
| Glossary | all three supported shapes: bare string, titled object, localized definition |
| Assets | local per-subsection and shared (the widget) |
| Bench works | a `bench` block with a work (`02-regulation/020-current-limit`, a `.breadboard` copied from Benches' example) and one without (`03-build/020-bench-test`); `bench-catalogue.json` beside `course.yaml` holds the Breadboard's catalogue entry, so the fixture compiles with no `--benches` |
| Transcripts | a subsection script with all three cue tokens and `includeInExport: true`, plus a chapter-level one its sibling falls back to |
| Model pipeline | ships an **STL**, so the compiler's mesh-conversion path is exercised end to end and the app loads the resulting GLB |
| Text style | a `theme.yaml`, a heading and inline spans styled in `01-raw-dc/010-transformer` |

## Building it

```sh
# From src/insight/
node packages/insight-core/bin/insight-compile.js ../test-course/src --out ../../.tmp-out/bench-psu.insightcourse
```

Then install it through the app's **Install a course…** button, or copy the
package into `%APPDATA%/ExSight Studio/courses/`.

## Text style

Authors set size, colour and face by name. There are no numbers and no hex
values in the syntax — see `registry/textStyle.ts` for why — and a misspelt key
or value is a compile error rather than silence.

```markdown
# Why the wall is the wrong voltage {size=huge color=primary}

A bench supply gives you a voltage you [chose]{color=amber}, at a current you
[set]{color=amber}, from a socket that offers neither. {size=large}
```

A group at the **end of a block** styles the block; a group after a
**[bracketed span]** styles those words. Braces anywhere else are prose, so a
set, a formula and a line of C are all safe.

| key | values |
|---|---|
| `size` | `small` `normal` `large` `huge` — steps, relative to whatever the surface set |
| `color` | `body` `primary` `muted` `amber` `teal` — the app's own semantic palette |
| `font` | `sans` `mono` `serif` |

**Subscripts and superscripts** are written in any text, not only prose — a
heading, a quiz question, an option, an analogy — as `~sub~` and `^super^`:

```markdown
Water is H~2~O, so V~out~ ≈ V~peak~ − 2V~F~, and the winding loses I^2^R.
```

The text between the marks has no spaces in it, which is what keeps
`about ~5 V to ~12 V` and `2^10` as written. Write `\~` or `\^` in a fence for
the character itself; in prose, put a literal `x^2^` in backticks. A single
tilde is no longer strikethrough — `~~this~~` still is. The rectifier
(`01-raw-dc/020-rectifier`) carries both kinds, in prose and in a flash quiz.

`theme.yaml` sets a course-wide default per block type, and a block that styles
itself wins field by field:

```yaml
heading:
  size: large
analogy:
  font: serif
```

## Regenerating the assets

Every binary asset is synthesised from code, deterministically. Nothing was
downloaded, so nothing here is anyone else's work, and any of it can be changed
by editing a generator rather than an image editor.

```sh
python tools/gen-assets.py    # plots, diagrams, the STL, the PDF, the avatar
python tools/gen-video.py     # the MP4
```

`gen-video.py` is the odd one. There is no ffmpeg on the build machine and a
video is the one canvas kind a placeholder cannot fake — the player has to
actually decode it — so it writes H.264 directly, using **I_PCM macroblocks**:
H.264 lets a macroblock carry raw samples instead of transformed, predicted,
entropy-coded residuals, which skips almost all of an encoder. The result is
large for its duration and every frame is an IDR, which also makes it trivially
seekable. Chromium decodes it, and the app plays it.

## Watching the app render it

From `src/insight/apps/desktop/`:

```sh
npm run build
npm run drive          # walks the course and writes tools/shots/*.png
```

The steps live in `tools/drive-script.json`.
