---
name: route
description: 새 라우트(페이지) 추가 워크플로우
---

# 라우트 추가

1. `app/routes/{name}.tsx` 생성
2. `app/routes.ts`에 `route("path", "routes/{name}.tsx")` 등록
3. 네비게이션에 표시하려면 `app/data/site.ts`의 `navItems`에 추가

## 라우트 파일 기본 구조

```tsx
import type { Route } from "./+types/{name}";
import { siteConfig } from "~/data/site";

export function meta(_: Route.MetaArgs) {
  return [
    { title: `페이지 제목 | ${siteConfig.title}` },
    { name: "description", content: "설명" },
  ];
}

export default function PageName() {
  return ( ... );
}
```

## 관련 파일

- `app/routes.ts` — 라우트 설정 (flat, explicit)
- `app/data/site.ts` — `navItems` 네비게이션 목록
- `app/components/layout/header.tsx` — 헤더 네비게이션 렌더링
- `app/components/layout/footer.tsx` — 푸터 네비게이션 렌더링
