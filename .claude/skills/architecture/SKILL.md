---
name: architecture
description: 프로젝트 구조 및 파일 역할 가이드
---

# Architecture

```
app/
├── components/
│   ├── blog/           # 블로그 전용 (code-block, TOC, reading-progress, giscus)
│   ├── layout/         # Header, Footer
│   ├── motion/         # 애니메이션 래퍼 (FadeIn, StaggerContainer)
│   └── ui/             # 범용 UI (button, card, tooltip)
├── data/               # 정적 설정 (site.ts — 사이트명, URL, 태그, 컬러)
├── lib/                # 유틸리티 (format.ts, posts.server.ts, utils.ts)
├── routes/             # React Router 라우트
│   ├── home.tsx        # / (index)
│   ├── about.tsx       # /about
│   ├── blog._index.tsx # /blog
│   ├── blog.$slug.tsx  # /blog/:slug (MDX 포스트 렌더러)
│   ├── portfolio.tsx   # /portfolio
│   └── not-found.tsx   # * (catch-all 404)
├── root.tsx            # App shell, ErrorBoundary, NProgress, Analytics
├── routes.ts           # 라우트 설정 (flat, explicit)
└── app.css             # 전역 스타일 (Obsidian Gradient 디자인 시스템)
content/
└── posts/              # MDX 블로그 포스트 (frontmatter 포함)
public/                 # 정적 파일 (favicon.svg, robots.txt)
scripts/                # 빌드 스크립트 (generate-seo.ts → sitemap + RSS)
```

## Tech Stack

| Layer | Technology |
|-------|-----------|
| Framework | React Router v7 (Framework Mode, `ssr: false`) |
| Content | MDX via `@mdx-js/rollup` + `rehype-slug` + `rehype-shiki` |
| Styling | Tailwind CSS v4 + custom CSS in `app.css` |
| Animations | `motion` (framer-motion) + CSS keyframes |
| Build | Vite, prerender (SSG) |
| Deployment | Vercel (static, `vercel.json`) |
| Comments | giscus (GitHub Discussions) |
| Analytics | Vercel Analytics + Speed Insights |
| SEO | Build-time sitemap.xml + rss.xml, JSON-LD, canonical URLs |
