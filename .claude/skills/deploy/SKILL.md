---
name: deploy
description: 빌드 및 Vercel 배포 워크플로우
---

# 빌드 & 배포

1. `npm run build` → React Router 빌드 + SEO 생성 + 404.html 복사
2. 출력: `build/client/` (정적 HTML + JS + CSS)
3. `main`에 push → Vercel 자동 배포
4. `vercel.json`: 헤더, rewrites, cleanUrls 설정

## 빌드 스크립트 상세

```
react-router build → npx tsx scripts/generate-seo.ts → cp __spa-fallback.html 404.html
```

- `scripts/generate-seo.ts`: `content/posts/*.mdx`를 읽어 `sitemap.xml`, `rss.xml` 생성
- `404.html`: SPA 폴백 복사 → Vercel이 자동으로 404 응답에 사용

## Vercel 설정 (`vercel.json`)

- `"framework": null` — 프레임워크 자동 감지 비활성화
- `"outputDirectory": "build/client"` — 정적 파일 출력 경로
- `"cleanUrls": true` — `.html` 확장자 제거
- `"rewrites"` — SPA 폴백 (`__spa-fallback.html`)
- `"headers"` — 에셋 캐싱, 보안 헤더

## 관련 파일

- `package.json` — build 스크립트
- `vercel.json` — Vercel 배포 설정
- `react-router.config.ts` — SSG 프리렌더 경로
- `scripts/generate-seo.ts` — sitemap + RSS 생성
