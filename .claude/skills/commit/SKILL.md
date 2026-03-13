---
name: commit
description: Git 커밋 컨벤션 및 반영 절차
---

# 커밋 컨벤션

- `feat:` — 새 기능
- `fix:` — 버그 수정
- 한국어로 설명, 대시 구분 bullet points
- `Co-Authored-By: Claude Opus 4.6 <noreply@anthropic.com>`

## 규칙

- 사용자가 "반영해줘"라고 할 때만 commit + push
- 스스로 commit/push 하지 않음
- 변경된 파일만 `git add` (git add -A 사용 금지)
- `.env`, 시크릿 파일 커밋 금지

## 반영 절차

1. `git status -u` — 변경 파일 확인
2. `git diff --stat` — 변경 요약
3. `git log --oneline -3` — 최근 커밋 스타일 확인
4. 관련 파일만 `git add`
5. `git commit -m "feat/fix: 한국어 설명\n\nCo-Authored-By: ..."`
6. `git push`
