#!/usr/bin/env python3
"""Validate source study data and build the browser-ready dataset."""
from __future__ import annotations
import json
from collections import Counter
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
SOURCE = ROOT / "data" / "questions.json"
OUT_DIR = ROOT / "generated"
OUT = OUT_DIR / "study-data.json"

REQUIRED = {"id", "topic", "difficulty", "prompt", "options", "correct", "explanation"}

def main() -> None:
    questions = json.loads(SOURCE.read_text(encoding="utf-8"))
    if not isinstance(questions, list) or not questions:
        raise SystemExit("questions.json must contain a non-empty list")

    seen = set()
    for i, item in enumerate(questions, start=1):
        missing = REQUIRED - item.keys()
        if missing:
            raise SystemExit(f"Question {i} missing: {sorted(missing)}")
        if item["id"] in seen:
            raise SystemExit(f"Duplicate id: {item['id']}")
        seen.add(item["id"])
        if len(item["options"]) != 4:
            raise SystemExit(f"{item['id']}: exactly four options required")
        if not 0 <= int(item["correct"]) < len(item["options"]):
            raise SystemExit(f"{item['id']}: invalid correct index")
        if item["difficulty"] not in {"easy", "medium", "hard"}:
            raise SystemExit(f"{item['id']}: invalid difficulty")

    counts = Counter(q["topic"] for q in questions)
    payload = {
        "version": "2.0.0",
        "subject": "English Communicative",
        "generated_by": "tools/build_study_data.py",
        "question_count": len(questions),
        "topic_counts": dict(sorted(counts.items())),
        "questions": questions,
    }

    OUT_DIR.mkdir(parents=True, exist_ok=True)
    OUT.write_text(json.dumps(payload, indent=2, ensure_ascii=False) + "\n", encoding="utf-8")
    print(f"Built {OUT.relative_to(ROOT)} with {len(questions)} validated questions.")

if __name__ == "__main__":
    main()
