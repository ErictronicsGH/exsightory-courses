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
| Transcripts | a subsection script with all three cue tokens and `includeInExport: true`, plus a chapter-level one its sibling falls back to |
| Model pipeline | ships an **STL**, so the compiler's mesh-conversion path is exercised end to end and the app loads the resulting GLB |

## Building it

```sh
# From Application/insight/
node packages/insight-core/bin/insight-compile.js ../test-course/src --out ../../.tmp-out/bench-psu.insightcourse
```

Then install it through the app's **Install a course…** button, or copy the
package into `%APPDATA%/INSIGHT/courses/`.

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

From `Application/insight/apps/desktop/`:

```sh
npm run build
npm run drive          # walks the course and writes tools/shots/*.png
```

The steps live in `tools/drive-script.json`.
