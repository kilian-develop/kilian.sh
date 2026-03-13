# kilian.sh Blog

React Router v7 + MDX 기술 블로그. Obsidian Gradient 다크 테마.

## 프로젝트 스킬 참조

작업 전 반드시 관련 스킬 파일을 읽고 작업할 것:

- `.claude/skills/architecture/SKILL.md` — 프로젝트 구조, 파일 역할, 기술 스택
- `.claude/skills/design-system/SKILL.md` — Obsidian Gradient 테마, 컬러, 폰트, CSS 컨벤션
- `.claude/skills/patterns/SKILL.md` — MDX 파이프라인, 성능, SSR 안전, Vercel 배포 패턴
- `.claude/skills/post/SKILL.md` — 블로그 포스트 추가/수정
- `.claude/skills/route/SKILL.md` — 새 라우트(페이지) 추가
- `.claude/skills/style/SKILL.md` — CSS/스타일 수정 및 주의사항
- `.claude/skills/deploy/SKILL.md` — 빌드 및 Vercel 배포
- `.claude/skills/commit/SKILL.md` — Git 커밋 컨벤션 및 반영 절차

## 핵심 규칙

- 한국어로 응답
- git commit/push는 명시적으로 요청받을 때만
- CSS 수정 시 Tailwind v4 특이성 주의 (`app.css` 커스텀 CSS > Tailwind 유틸리티)
- `document`/`window` 접근 시 SSR 가드 필수
- 다이어그램은 인라인 JSX (mermaid 사용 금지)
- 디자인은 Obsidian Gradient 테마 유지 (보라색 `#8b5cf6` 액센트)

## 스킬 실시간 업데이트

작업 중 다음 상황이 발생하면 해당 스킬 파일을 즉시 업데이트할 것:

- **새로운 패턴 발견**: 버그 수정이나 구현 과정에서 알게 된 주의사항/패턴을 `patterns.md`에 추가
- **구조 변경**: 파일/폴더 추가·삭제·이동 시 `architecture.md` 반영
- **디자인 변경**: 새 컬러, 컴포넌트 스타일, CSS 클래스 추가 시 `design-system.md` 반영
- **워크플로우 변경**: 빌드 스크립트, 배포 설정, 새 워크플로우 추가 시 `workflows.md` 반영
- **새 스킬 필요**: 기존 파일에 맞지 않는 새 영역이면 `.claude/skills/{name}/SKILL.md` 신규 생성 후 이 목록에 추가

## 스킬 생성 규칙

새로운 기술/도구/영역을 프로젝트에 도입할 때 자동으로 스킬 파일을 생성할 것:

1. `.claude/skills/{name}/SKILL.md` 파일 생성 (frontmatter: name, description)
2. 위 "프로젝트 스킬 참조" 목록에 항목 추가
3. 스킬 파일에는 다음을 포함:
   - 해당 기술의 프로젝트 내 사용 방식
   - 설정 위치와 주요 옵션
   - 주의사항/삽질 방지 노트
   - 관련 파일 경로

### 스킬 생성 트리거

- 새 라이브러리/패키지 도입 시
- 새로운 인프라 설정 추가 시 (CI/CD, Docker, 모니터링 등)
- 외부 서비스 연동 시 (API, OAuth, 결제 등)
- 복잡한 버그를 해결한 후 재발 방지 지식이 필요할 때
- 사용자가 "이거 기억해" 또는 "스킬로 저장해"라고 요청할 때
