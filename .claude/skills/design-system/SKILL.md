---
name: design-system
description: Obsidian Gradient 디자인 시스템 — 컬러, 폰트, 컴포넌트 스타일 가이드
---

# Design System: "Obsidian Gradient"

## Theme

- **Dark-only** 테마, ambient mesh gradients, glass morphism, aurora accents
- 모든 커스텀 스타일은 `app.css`에 정의 (Tailwind config 오버라이드 없음)

## Colors

| Role | Value |
|------|-------|
| Primary accent | purple `#8b5cf6` / `rgba(139, 92, 246, ...)` |
| Secondary | blue `#60a5fa` |
| Tertiary | teal `#5eead4` |
| Active text | `#a78bfa` / `rgba(167, 139, 250, ...)` |
| Background | `oklch(0.0 0 0)` (pure black) |
| Text | `white/90`, `white/55`, `white/30` (opacity 단계) |

## Fonts

| Usage | Font |
|-------|------|
| Headings | `Sora` (`--font-heading`) |
| Body | `Inter` (`--font-sans`) |
| Code | `JetBrains Mono` (`--font-mono`) |

## Component Patterns

- **Glass card**: `bg-white/[0.02] border-white/[0.06] backdrop-blur`
- **Tag pill**: `getTagColor(i)` — purple/blue/teal 순환
- **Mono label**: `font-mono text-[0.7rem] uppercase tracking-widest text-[rgba(139,92,246,0.5)]`
- **Hover accent**: `hover:text-[rgba(167,139,250,0.8)]`
- **Button (CTA)**: `border-[rgba(139,92,246,0.3)] bg-white/[0.03] hover:shadow-[0_0_20px_rgba(139,92,246,0.15)]`

## CSS Class Convention

| Class | Purpose |
|-------|---------|
| `.prose-blog` | 블로그 본문 스타일 (h1~h3, p, a, blockquote, table, code) |
| `.glass-card` | 유리 효과 카드 |
| `.code-block-*` | 코드 블록 래퍼, 헤더, 언어 라벨, 복사 버튼 |
| `.toc-sidebar` | 목차 사이드바 |
| `.aurora-text` | 그라데이션 텍스트 효과 |
| `.ambient-bg` | 배경 메쉬 그라데이션 |

## CSS Specificity 주의사항

Tailwind v4 유틸리티는 `@layer utilities` (낮은 특이성). `app.css`의 커스텀 CSS가 더 높은 특이성을 가짐.
컴포넌트에 Tailwind 클래스와 커스텀 CSS가 동시에 적용될 때, 커스텀 CSS 셀렉터로 오버라이드해야 함.
예: `.toc-sidebar .toc-link.active { color: #a78bfa; }` (Tailwind `text-[#a78bfa]`는 덮어씌워짐)
