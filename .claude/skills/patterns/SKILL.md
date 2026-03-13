---
name: patterns
description: MDX 파이프라인, 성능 최적화, SSR 안전, Vercel 배포 패턴
---

# Key Patterns

## MDX Processing Pipeline

```
MDX → remark-gfm → remark-frontmatter → rehype-mark → rehype-slug → rehype-shiki (Tokyo Night) → React component
```

- `mdx-components.tsx`에서 `pre`, `a`, `mark` 컴포넌트 오버라이드
- Shiki transformer(`transformerLanguageAttr`)가 `<code>`에 `dataLanguage` 속성 주입
- `mdxComponents`에서 `codeProps?.dataLanguage`로 언어 추출 (camelCase 주의)
- `rehype-mark` (`app/lib/rehype-mark.ts`): `==텍스트==` → `<mark>` 자동 변환 플러그인

## MDX 마크다운 주의사항

- **이미지 경로 공백 금지**: MDX 파서가 `![alt](url)` 에서 URL의 공백을 처리하지 못함
  - Bad: `![설명](/images/posts/파일 이름.png)` → `<img>` 변환 실패, 텍스트 그대로 출력
  - Good: `![설명](/images/posts/파일%20이름.png)` → 공백을 `%20`으로 인코딩
  - Good: `![설명](/images/posts/파일-이름.png)` → 애초에 공백 없는 파일명 사용
  - 한글 파일명은 자동 percent-encoding 됨 (공백만 문제)
  - `npm run lint:images`로 빌드 전 검증 가능

- **볼드+따옴표 패턴**: `**"텍스트"**` 뒤에 한글이 바로 오면 CommonMark 파서가 닫는 `**`를 인식 못함
  - Bad: `**"텍스트"**가` → 리터럴 `**` 출력
  - Good: `"**텍스트**"가` → 따옴표를 볼드 바깥으로 이동
  - 원인: 닫는 `**` 앞에 구두점(`"`) + 뒤에 비구두점 한글 → right-flanking delimiter 조건 실패

- **코드블록 밖 `<` 문자 JSX 파싱 에러**: MDX는 `<`를 JSX 태그 시작으로 해석함
  - Bad: `소규모(<16MB)` → `<16MB>`를 JSX 태그로 파싱 시도 → 빌드 에러
  - Good: `` 소규모(`<16MB`) `` → 백틱으로 감싸서 인라인 코드 처리
  - Bad: `<객체지향의 사실과 오해>` → `<객체지향의>`를 JSX 태그로 파싱 → 빌드 에러
  - Good: `&lt;객체지향의 사실과 오해&gt;` → HTML 엔티티로 이스케이프
  - 규칙: 코드블록 밖의 `<`는 반드시 백틱(`` ` ``), HTML 엔티티(`&lt;`), 또는 유효한 JSX여야 함

## Performance Patterns

- **프로그래스바**: `transform: scaleX()` + `will-change: transform` (GPU 가속, `width` 사용 금지)
- **스크롤 애니메이션**: `useRef` + 직접 DOM 조작 (React 리렌더링 방지)
- **스크롤 핸들러**: `requestAnimationFrame`으로 스로틀링
- **이벤트 리스너**: `{ passive: true }` 옵션 사용
- **동적 DOM 대기**: `MutationObserver`로 MDX 하이드레이션 완료 감지

## SSR Safety

- `document`/`window` 접근은 `useState` 마운트 체크 또는 `useEffect` 내에서만
- `createPortal` 사용 시 마운트 가드 필수: `if (!mounted) return null`
- `import.meta.glob`은 `eager: true`로 빌드타임 MDX 로딩

## Vercel Static Deployment

- `ssr: false` + prerender → SSG
- `404.html`은 `__spa-fallback.html`에서 복사 (Vercel 자동 404 처리)
- `cleanUrls: true` → `.html` 확장자 제거
- 에셋 캐싱: `/assets/*`에 `max-age=31536000, immutable`
- `vercel.json`의 `"framework": null` 설정 (프레임워크 자동 감지 비활성화)

## TOC (Table of Contents) Pattern

- DOM에서 `.prose-blog h2[id]`를 읽어 heading 목록 구성
- `MutationObserver`로 MDX 렌더링 완료 후 heading 감지
- `scroll` 이벤트 + `getBoundingClientRect().top <= offset`으로 활성 heading 추적
- CSS `.toc-link.active` 클래스로 하이라이팅 (Tailwind 유틸리티로는 특이성 부족)
