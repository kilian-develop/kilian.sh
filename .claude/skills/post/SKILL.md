---
name: post
description: 블로그 포스트 추가/수정 워크플로우
---

# 블로그 포스트 추가

1. `content/posts/{slug}.mdx` 생성 (frontmatter 필수)
   ```yaml
   ---
   title: "제목"
   date: "YYYY-MM-DD"
   tags: ["Tag1", "Tag2"]
   excerpt: "요약 설명"
   ---
   ```
2. 포스트는 `lib/posts.server.ts`가 파일시스템 glob으로 자동 감지
3. 프리렌더 경로는 `react-router.config.ts`의 `getBlogSlugs()`가 자동 처리
4. 다이어그램은 인라인 JSX로 작성 (mermaid 사용하지 않음)
5. 코드 블록은 fenced syntax + 언어 식별자 (Shiki가 하이라이트)
6. 이미지 경로에 공백 금지 — 공백이 있으면 `%20`으로 인코딩하거나 파일명에서 공백 제거

## 관련 파일

- `content/posts/*.mdx` — 포스트 원본
- `app/lib/posts.server.ts` — 포스트 목록/상세 조회
- `app/routes/blog.$slug.tsx` — 포스트 렌더러
- `app/components/blog/mdx-components.tsx` — MDX 컴포넌트 오버라이드
- `react-router.config.ts` — 프리렌더 경로 자동 생성
