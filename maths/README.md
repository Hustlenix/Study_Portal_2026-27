# Maths Revision Studio · CBSE Class 10

A dedicated maths learning workspace inside [Study Portal 2026–27](https://github.com/Hustlenix/Study_Portal_2026-27).

**Website:** https://hustlenix.github.io/Study_Portal_2026-27/maths/

## What was missing in the first version

The original 20-minute revision page gave only high-level summaries and allowed a chapter to be marked understood without assessment. It had no hints, no scheduled review, no written exam mode, no diagnostic feedback, and no automated way to collect wrong quiz answers. Its checks were limited, and GitHub Pages availability was not independently verified.

## The upgraded learning experience

- **10 included chapters**, each with a learning objective, prerequisites, an analogy, 3 concept explanations, 2 worked examples and 7 written questions.
- **70 written questions** with an initial conceptual hint, a second technique hint, and full worked solution.
- **30 MCQs** with instant scoring and explanations, sampled into 10-, 20- and 30-question mixed tests.
- **Chapter checks:** a three-question diagnostic per chapter. Demonstrated MCQ proficiency is tracked separately from self-marked chapter review.
- **Written practice exam:** a 30-mark, 10-question original mixed paper, optional 60-minute suggested duration, printable with a worked marking guide.
- **Mistake notebook:** manually flag difficult problems; wrong MCQ answers are automatically added.
- **Spaced-repetition review:** solutions marked as independently solved return on a 1, 3, 7, 14, 30 and 60 local-calendar-day schedule. Difficult questions are due immediately.
- **Formula library:** all included chapter formulas and standard trig values.
- **Maths playground:** interactive quadratic graph/discriminant, AP sequence builder and right-triangle trigonometry explorer.
- **Listen:** optional browser text-to-speech reads chapter explanations where supported.
- **Offline-friendly PWA:** installable in supported browsers after the first successful visit; the service worker caches the key assets.
- **Accessibility:** responsive layout, keyboard-operated buttons, visible focus indicators, skip link, readable answer feedback and print layouts.

Everything works without a login, tracking pixels, paid services or third-party JavaScript libraries. Progress and test history stay in localStorage on that browser only; there is no cross-device account sync.

## Included portion

Polynomials; Pair of Linear Equations in Two Variables; Quadratic Equations; Arithmetic Progressions; Triangles; Introduction to Trigonometry; Coordinate Geometry; Surface Areas and Volumes; Statistics; Probability.

**Excluded by the specified school portion:** Real Numbers; Some Applications of Trigonometry; Circles; Areas Related to Circles.

## Use it

1. Choose a chapter, read its objective and prerequisite.
2. Understand the analogy and three concept explanations; work through both examples.
3. Attempt written questions in a rough notebook; request a hint only when stuck.
4. Reveal the worked solution and mark **Solved independently** or **Need more practice**.
5. Run the three-question chapter check to test understanding; revisit incorrect answers in the mistake notebook.
6. Take a mixed quiz or print the written paper. Check Due for Review in subsequent sessions.

The site labels **Reviewed** (manual completion) separately from **MCQ proficiency** (distinct correct diagnostic answers), because reading a page is not the same as mastering a topic.

## Source structure

```
maths/
  index.html            Entry page
  styles.css            Responsive design + print
  app.js                Interactive learning interface
  data.js               10 base lesson records
  enrichment.js         30 deeper concepts, worked examples, question bank, MCQs
  coach-data.js         70 pairs of hints, prerequisites and objectives
  manifest.webmanifest  Installable app settings
  sw.js                 Offline asset caching
  icon.svg              Application icon
  tests/
    content.test.cjs    Maths/content regression checks
    app.test.cjs        Mock-DOM app interaction tests
```

### Development checks

```bash
node --check maths/app.js
node --check maths/sw.js
node maths/tests/content.test.cjs
node maths/tests/app.test.cjs
```

The repository's Pages workflow runs these checks before its existing English content build and deployment. The tests simulate critical flows and check structural content; they do **not** replace a real multi-browser end-to-end test or human checking of every answer.

### Scope / limitations

This is original syllabus-aligned educational practice, not official CBSE past-paper content. Difficulty labels are editorial, not calibrated psychometrically. Written answers are self-assessed, not automatically graded; MCQ results show accuracy in this small question bank and should not be treated as a formal prediction of board marks. Some browsers might not support all voice or PWA features.
