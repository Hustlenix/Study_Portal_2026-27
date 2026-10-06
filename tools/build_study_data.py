#!/usr/bin/env python3
"""Build and validate the Study Portal English data bundle."""
from __future__ import annotations
import json
from collections import Counter
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
QUESTION_SOURCE = ROOT / "data" / "questions.json"
CONTENT_SOURCE = ROOT / "data" / "study_content.json"
OUT_DIR = ROOT / "generated"
OUT = OUT_DIR / "study-data.json"

QUESTION_REQUIRED = {"id","topic","difficulty","prompt","options","correct","explanation"}

def fail(message: str) -> None:
    raise SystemExit(message)

def validate_questions(questions: list[dict]) -> None:
    if not questions:
        fail("Question bank is empty")
    seen=set()
    for i,item in enumerate(questions,1):
        missing=QUESTION_REQUIRED-item.keys()
        if missing:
            fail(f"Question {i} missing {sorted(missing)}")
        if item["id"] in seen:
            fail(f"Duplicate question id: {item['id']}")
        seen.add(item["id"])
        if item["difficulty"] not in {"easy","medium","hard"}:
            fail(f"{item['id']}: invalid difficulty")
        if not isinstance(item["options"],list) or len(item["options"]) != 4:
            fail(f"{item['id']}: exactly four options required")
        if not 0 <= int(item["correct"]) < 4:
            fail(f"{item['id']}: invalid answer index")
        if len(item["prompt"].strip()) < 8 or len(item["explanation"].strip()) < 8:
            fail(f"{item['id']}: prompt/explanation too short")

def validate_topics(topics: dict) -> None:
    if not topics:
        fail("No study topics found")
    for key,t in topics.items():
        for field in ("title","category","lesson","flashcards","short_answers","viva"):
            if field not in t:
                fail(f"{key}: missing {field}")
        lesson=t["lesson"]
        for field in ("summary","recall","themes","keywords","answer_frame"):
            if field not in lesson:
                fail(f"{key}.lesson: missing {field}")
        if len(t["flashcards"]) < 3:
            fail(f"{key}: needs at least 3 flashcards")
        for card in t["flashcards"]:
            if not card.get("front") or not card.get("back"):
                fail(f"{key}: invalid flashcard")
        for item in t["short_answers"]:
            if not item.get("q") or not item.get("points") or not item.get("model"):
                fail(f"{key}: invalid short answer")
        for item in t["viva"]:
            if not item.get("q") or not item.get("keywords") or not item.get("answer"):
                fail(f"{key}: invalid viva item")

def main() -> None:
    questions=json.loads(QUESTION_SOURCE.read_text(encoding="utf-8"))
    content=json.loads(CONTENT_SOURCE.read_text(encoding="utf-8"))
    topics=content.get("topics",{})
    validate_questions(questions)
    validate_topics(topics)

    unknown=sorted({q["topic"] for q in questions} - set(topics))
    # Cross-topic questions deliberately inherit the closest syllabus topic.
    if unknown:
        fail(f"Questions reference missing topics: {unknown}")

    q_counts=Counter(q["topic"] for q in questions)
    content_counts={
        "flashcards":sum(len(t["flashcards"]) for t in topics.values()),
        "short_answers":sum(len(t["short_answers"]) for t in topics.values()),
        "viva":sum(len(t["viva"]) for t in topics.values()),
    }
    total=len(questions)+sum(content_counts.values())

    payload={
        "version":"3.0.0",
        "subject":"English Communicative",
        "generated_by":"tools/build_study_data.py",
        "question_count":len(questions),
        "topic_counts":dict(sorted(q_counts.items())),
        "content_counts":content_counts,
        "total_study_items":total,
        "questions":questions,
        "topics":topics,
    }
    OUT_DIR.mkdir(parents=True,exist_ok=True)
    OUT.write_text(json.dumps(payload,indent=2,ensure_ascii=False)+"\n",encoding="utf-8")
    print(f"Built {OUT.relative_to(ROOT)}: {len(questions)} MCQs + {sum(content_counts.values())} study items = {total} total prompts.")

if __name__ == "__main__":
    main()
