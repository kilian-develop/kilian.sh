---
name: style
description: CSS/스타일 수정 워크플로우 및 주의사항
---

# 스타일 수정

1. `app/app.css` 편집 — 모든 테마 스타일이 여기에
2. CSS 특이성: 커스텀 CSS > Tailwind 유틸리티 (Tailwind v4 `@layer`)
3. 블로그 콘텐츠는 `.prose-blog` 접두사 사용
4. 투명도는 `rgba()` 사용 (컴포넌트 스타일에서 `oklch` 사용하지 않음)

## 주의사항

- Tailwind v4 유틸리티 클래스는 `@layer utilities` 안에서 동작 → 일반 CSS보다 특이성 낮음
- 컴포넌트에 Tailwind + 커스텀 CSS가 동시 적용될 때, 커스텀 CSS 셀렉터가 우선
- 해결법: 전용 클래스명(`.toc-link`, `.code-block-lang` 등)을 부여하고 CSS에서 제어

## 관련 파일

- `app/app.css` — 전역 스타일 (디자인 시스템 전체)
- `design-system.md` 스킬 — 컬러, 폰트, 컴포넌트 스타일 상세
