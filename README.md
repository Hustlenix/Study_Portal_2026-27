# Study Portal 2026–27

## Mathematics — complete revision studio

The Maths revision site is now available at [Study Portal / Maths](https://hustlenix.github.io/Study_Portal_2026-27/maths/) with ten included chapters, 30 concept guides, 20 fully solved examples, 70 written-response questions, 30 auto-marked MCQs, formula sheets, an interactive maths playground and a saved mistake notebook.

Its excluded chapters are Real Numbers, Some Applications of Trigonometry, Circles and Areas Related to Circles. The older English and SST courses remain in the same portal.

See [maths/README.md](maths/README.md) for usage and source details.



A focused, app-like study dashboard for Class 10 revision.

## Current subject: English Communicative

The first release is built around the exact English portion:

### Literature Reader
- F.3 — The Letter
- F.4 — A Shady Plot
- F.5 — Patol Babu, Film Star
- P.8 — Not Marble, nor the Gilded Monuments
- P.9 — Ozymandias
- P.10 — The Rime of the Ancient Mariner
- P.11 — Snake
- D.12 — The Dear Departed

### Writing skills
- Email
- Leave application
- Formal complaint letter
- Letter to the editor
- Article writing
- Factual description

### Main Course Book
- Units 2, 3 and 4

## Features
- Clean responsive exam dashboard
- Compact revision notes for every literature text
- Scoring ideas + closed-book recall chains
- Writing-format vault
- Syllabus progress saved with localStorage
- 25-minute focus timer
- Randomized 10-question rapid tests
- No framework, build step or backend required

## Run locally
Open `index.html` directly, or serve the folder with any static server.

## Live site
GitHub Pages is intended to publish from the root of `main`.

https://hustlenix.github.io/Study_Portal_2026-27/


## Study Engine 3.0

The portal now uses a mixed stack intentionally:

- **Python** (`tools/build_study_data.py`) validates the question bank and builds browser-ready study data.
- **C++** (`cpp/adaptive_engine.cpp`) is compiled to **WebAssembly** and scores topic priority/mastery for adaptive drills.
- **JavaScript** owns the UI, local progress state, browser speech synthesis and speech recognition.
- **Voice study** can read questions and chapter summaries aloud and, where the browser supports it, accepts spoken A/B/C/D answers.
- **96-question English MCQ bank** is stored in `data/questions.json`, with difficulty, topic, answer and explanation metadata.
- **190 total study prompts**: 96 MCQs + 50 flashcards + 22 written-answer tasks + 22 voice-viva prompts.
- **GitHub Actions** rebuilds the Python data and C++ WASM, then deploys the generated site to GitHub Pages.

The browser falls back to the JavaScript adaptive formula if WebAssembly has not loaded, so the study experience still works on limited browsers.


### Study Lab

The front end now has four dedicated learning modes:

- **Learn** — concise chapter lesson, recall chain, themes, scoring keywords and answer frame.
- **Flashcards** — fast retrieval practice with local progress.
- **Written practice** — type an exam-style response, compare against scoring points and a model answer.
- **Voice viva** — the browser reads the question, listens to the spoken answer, then scores key-idea coverage. It scores content coverage, not accent.

The C++ WebAssembly module now also calculates review intervals, oral-viva coverage scores and written-practice scores. Python validates both the MCQ bank and structured study content before every deployment.
