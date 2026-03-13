export const siteConfig = {
  name: "kilian",
  title: "kilian.sh",
  url: "https://kilian.sh",
  description:
    "kilian의 기술 블로그 — Java, Spring, 클린 아키텍처 그리고 개발 이야기",
  role: "Backend Developer",
  github: "https://github.com/kilian-develop",
  linkedin: "https://www.linkedin.com/in/%EB%AA%85%EA%B7%9C-%EB%B0%95-405917313/",
  email: "audrb96@gmail.com",
} as const;

export const navItems = [
  { to: "/", label: "홈" },
  { to: "/blog", label: "블로그" },
  { to: "/about", label: "소개" },
  { to: "/portfolio", label: "포트폴리오" },
] as const;

/**
 * Accent tag color variants — purple / blue / teal.
 * Used across post cards, tag pills, and skill badges.
 */
const TAG_COLORS = [
  "bg-accent/10 text-accent-light/70 border-accent/[0.12]",
  "bg-accent-blue/[0.08] text-accent-blue/70 border-accent-blue/10",
  "bg-accent-teal/[0.06] text-accent-teal/[0.65] border-accent-teal/10",
] as const;

export function getTagColor(index: number): string {
  return TAG_COLORS[index % TAG_COLORS.length];
}

export function buildMeta(title: string, description: string, path: string) {
  return [
    { title: `${title} | ${siteConfig.title}` },
    { name: "description", content: description },
    { property: "og:title", content: `${title} | ${siteConfig.title}` },
    { property: "og:description", content: description },
    { tagName: "link", rel: "canonical", href: `${siteConfig.url}${path}` },
  ];
}

/** Giscus comment widget configuration */
export const giscusConfig = {
  repo: "kilian-develop/kilian.sh",
  repoId: "R_kgDORk-6Gg",
  category: "General",
  categoryId: "DIC_kwDORk-6Gs4C4N0s",
  mapping: "pathname",
  strict: "0",
  reactionsEnabled: "1",
  emitMetadata: "0",
  inputPosition: "top",
  theme: "transparent_dark",
  lang: "ko",
  loading: "lazy",
} as const;

export const techTags = [
  "Java",
  "Spring Boot",
  "JPA",
  "Kafka",
  "Clean Architecture",
  "DDD",
  "MariaDB",
  "MongoDB",
] as const;
