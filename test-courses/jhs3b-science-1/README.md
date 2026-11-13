# The format fixture's test

A class's rehearsal of BECE Integrated Science, Paper 1: **`kind: idt`**, Exams only, `keys: withheld`, one attempt,
45 minutes, one section of 40 single-choice questions. It is the `.idt` that IDT1's compiler builds, kept beside
`../test-course/` (the format fixture for courses and books), and the first IDT input any lane has.

**Its source is generated** by the Benches lane (`exsight-benches` `tools/idt-sources.mjs`, from the exam engine), and
copied here unedited, except the `licence:` at the foot of `course.yaml`, which Core added because the source came without
one (crossing 1767). When Benches regenerates it, copy the three files again.

It has **no chapters**: a test with withheld keys and no Self-Paced has no remediation or solution pages, so
`course.yaml` names none (crossing 1767). Each question is a `quiz` of one in `questions.yaml`'s bank.

## Building it

With Core's compiler, as `../test-course/` is: zero errors and zero warnings is correct, and the 40 keys are withheld.

```bash
insight-compile src --out <package-dir> --withheld <file>
```
