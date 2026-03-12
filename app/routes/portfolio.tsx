import { Github, ArrowUpRight, Mail } from "lucide-react";
import type { Route } from "./+types/portfolio";
import { cn } from "~/lib/utils";
import { siteConfig } from "~/data/site";

export function meta(_: Route.MetaArgs) {
  const description = `${siteConfig.name}의 프로젝트 포트폴리오입니다.`;
  return [
    { title: `포트폴리오 | ${siteConfig.title}` },
    { name: "description", content: description },
    { property: "og:title", content: `포트폴리오 | ${siteConfig.title}` },
    { property: "og:description", content: description },
    { tagName: "link", rel: "canonical", href: `${siteConfig.url}/portfolio` },
  ];
}

const projects = [
  {
    title: "면접 준비 플랫폼",
    description:
      "기술 면접 준비를 위한 학습 도구. 도메인별 문제 세트와 스스로 답변을 작성하고 복습할 수 있는 구조로 설계했습니다. Spring Boot 기반의 클린 아키텍처를 직접 적용해본 프로젝트입니다.",
    tags: ["Spring Boot", "Java", "JPA", "PostgreSQL", "React"],
    href: null as string | null,
  },
  {
    title: "개인 블로그",
    description:
      "React Router v7 기반의 정적 블로그. MDX 파일로 글을 작성하고, Tailwind v4와 shadcn/ui로 에디토리얼 감성의 UI를 구성했습니다. 직접 운영하면서 프론트엔드 경험도 쌓고 있습니다.",
    tags: ["React Router v7", "TypeScript", "Tailwind CSS", "MDX"],
    href: null as string | null,
  },
  {
    title: "클린 아키텍처 템플릿",
    description:
      "Spring Boot 기반 DDD 템플릿. 계층 분리, Port & Adapter 패턴, 정보전문가 패턴을 실제 코드 구조로 표현한 보일러플레이트입니다. 새 프로젝트 시작 시 빠르게 아키텍처 뼈대를 잡기 위해 만들었습니다.",
    tags: ["Spring Boot", "Java", "DDD", "Clean Architecture"],
    href: null as string | null,
  },
];

const staggerClass = (i: number) =>
  `stagger-${Math.min(i + 1, 8)}` as const;

export default function Portfolio() {
  return (
    <div className="min-h-screen">
      {/* ===== HERO SECTION ===== */}
      <section className="pt-24 pb-16 md:pt-36 md:pb-24 px-4">
        <div className="max-w-[1100px] mx-auto px-4 md:px-8">
          <div className="animate-fade-up mb-10">
            <span className="font-mono text-[0.7rem] uppercase tracking-[0.15em] text-[rgba(139,92,246,0.5)]">
              Portfolio
            </span>
          </div>

          <h1 className="animate-fade-up stagger-1 font-heading text-4xl md:text-6xl font-semibold leading-tight tracking-tight text-white/90 mb-4">
            프로젝트
          </h1>

          <p className="animate-fade-up stagger-2 text-lg md:text-xl text-white/75 leading-relaxed max-w-2xl text-balance">
            직접 설계하고 구현한 프로젝트들입니다. 구현 자체보다 아키텍처와
            설계 판단의 근거를 중요하게 생각합니다.
          </p>
        </div>
      </section>

      {/* Orb divider */}
      <div className="max-w-[1100px] mx-auto px-4 md:px-8">
        <div className="section-orb" />
      </div>

      {/* ===== PROJECTS GRID ===== */}
      <section className="py-16 md:py-24 px-4">
        <div className="max-w-[1100px] mx-auto px-4 md:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {projects.map((project, i) => (
              <div
                key={project.title}
                className={cn(
                  "animate-fade-up group relative",
                  staggerClass(i),
                  /* If odd count, last item spans full width */
                  i === projects.length - 1 && projects.length % 2 !== 0
                    ? "md:col-span-2"
                    : ""
                )}
              >
                {/* Gradient border glow on hover */}
                <div className="absolute -inset-px rounded-2xl bg-gradient-to-br from-[rgba(139,92,246,0.15)] via-[rgba(59,130,246,0.1)] to-[rgba(94,234,212,0.08)] opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />

                <div className="relative h-full rounded-2xl bg-white/[0.03] border border-white/[0.06] backdrop-blur-[10px] p-6 md:p-8 transition-all duration-300 group-hover:border-white/[0.1] group-hover:bg-white/[0.04]">
                  {/* Header row: title + link icon */}
                  <div className="flex items-start justify-between gap-4 mb-4">
                    <h3 className="font-heading text-lg font-semibold text-white/90">
                      {project.title}
                    </h3>
                    {project.href && (
                      <a
                        href={project.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex-shrink-0 text-white/25 hover:text-[rgba(139,92,246,0.7)] transition-colors"
                        aria-label={`${project.title} 외부 링크`}
                      >
                        <ArrowUpRight className="size-5" />
                      </a>
                    )}
                  </div>

                  {/* Description */}
                  <p className="text-sm text-white/45 leading-relaxed mb-6">
                    {project.description}
                  </p>

                  {/* Tags */}
                  <div className="flex flex-wrap gap-2">
                    {project.tags.map((tag) => (
                      <span
                        key={tag}
                        className="font-mono text-[0.65rem] px-3 py-1.5 rounded-md bg-white/[0.03] border border-white/[0.06] text-white/35 hover:border-[rgba(139,92,246,0.2)] hover:text-white/55 hover:bg-[rgba(139,92,246,0.05)] transition-all cursor-default"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Orb divider */}
      <div className="max-w-[1100px] mx-auto px-4 md:px-8">
        <div className="section-orb" />
      </div>

      {/* ===== CONTACT CTA ===== */}
      <section className="py-16 md:py-24 px-4">
        <div className="max-w-[1100px] mx-auto px-4 md:px-8 text-center">
          <div className="animate-fade-up">
            <h2 className="font-heading text-2xl md:text-3xl font-semibold text-white/90 mb-4">
              함께 작업하고 싶다면
            </h2>
            <p className="text-white/45 leading-relaxed max-w-md mx-auto mb-8">
              프로젝트에 대한 이야기나, 기술적인 고민을 나누고 싶다면
              편하게 연락해주세요.
            </p>
          </div>

          <div className="animate-fade-up stagger-2 flex flex-wrap justify-center gap-3">
            <a
              href={siteConfig.github}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full border border-white/[0.08] text-sm text-white/55 hover:text-white/85 hover:border-[rgba(139,92,246,0.3)] hover:bg-[rgba(139,92,246,0.06)] transition-all"
            >
              <Github className="size-4" />
              GitHub
            </a>

            <a
              href={`mailto:${siteConfig.email}`}
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full border border-white/[0.08] text-sm text-white/55 hover:text-white/85 hover:border-[rgba(139,92,246,0.3)] hover:bg-[rgba(139,92,246,0.06)] transition-all"
            >
              <Mail className="size-4" />
              Email
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}
