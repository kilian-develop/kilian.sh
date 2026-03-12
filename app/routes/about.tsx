import { Link } from "react-router";
import { Github, Mail, Linkedin, ArrowRight } from "lucide-react";
import type { Route } from "./+types/about";
import { cn } from "~/lib/utils";
import { siteConfig } from "~/data/site";

export function meta(_: Route.MetaArgs) {
  const description = `백엔드 개발자 ${siteConfig.name}의 소개 페이지입니다. 클린 아키텍처, DDD, Spring/Java 개발을 탐구합니다.`;
  return [
    { title: `소개 | ${siteConfig.title}` },
    { name: "description", content: description },
    { property: "og:title", content: `소개 | ${siteConfig.title}` },
    { property: "og:description", content: description },
    { tagName: "link", rel: "canonical", href: `${siteConfig.url}/about` },
  ];
}

const skills = {
  Backend: ["Java", "Spring Boot", "JPA", "Kotlin", "Spring Security"],
  Frontend: ["React", "TypeScript", "Tailwind CSS", "React Router"],
  Infrastructure: ["Docker", "AWS", "GitHub Actions", "Linux"],
  Database: ["PostgreSQL", "Redis", "MongoDB", "MySQL"],
} as const;

const experiences = [
  {
    role: "Backend Developer",
    company: "스타트업 N",
    period: "2023 — 현재",
    description:
      "Spring Boot 기반 서비스 설계 및 운영. 도메인 주도 설계와 테스트 가능한 아키텍처 도입을 주도했습니다.",
  },
  {
    role: "Junior Backend Developer",
    company: "스타트업 K",
    period: "2021 — 2023",
    description:
      "REST API 개발 및 기존 레거시 코드 리팩토링. 처음으로 대용량 트래픽을 다루며 성능 최적화를 경험했습니다.",
  },
] as const;

const staggerClass = (i: number) =>
  `stagger-${Math.min(i + 1, 8)}` as const;

export default function About() {
  return (
    <div className="min-h-screen">
      {/* ===== HERO SECTION ===== */}
      <section className="pt-24 pb-16 md:pt-36 md:pb-24 px-4">
        <div className="max-w-[1100px] mx-auto px-4 md:px-8">
          {/* Section label */}
          <div className="animate-fade-up mb-10">
            <span className="font-mono text-[0.7rem] uppercase tracking-[0.15em] text-[rgba(139,92,246,0.5)]">
              About Me
            </span>
          </div>

          <div className="flex items-start gap-6 md:gap-10 mb-8">
            {/* Avatar */}
            <div className="animate-fade-up stagger-1 flex-shrink-0">
              <div className="relative size-16 md:size-20 rounded-2xl bg-white/[0.03] border border-white/[0.06] backdrop-blur-[10px] overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-br from-[rgba(139,92,246,0.3)] via-[rgba(59,130,246,0.2)] to-[rgba(94,234,212,0.15)]" />
                <div className="relative flex items-center justify-center h-full">
                  <span className="font-heading text-xl md:text-2xl font-semibold text-white/90">
                    K
                  </span>
                </div>
              </div>
            </div>

            <div>
              <h1 className="animate-fade-up stagger-2 font-heading text-4xl md:text-6xl font-semibold leading-tight tracking-tight text-white/90 mb-2">
                kilian
              </h1>
              <p className="animate-fade-up stagger-3 text-lg font-mono text-[rgba(139,92,246,0.7)]">
                Backend Developer
              </p>
            </div>
          </div>

          <p className="animate-fade-up stagger-4 text-lg md:text-xl text-white/75 leading-relaxed max-w-2xl text-balance">
            좋은 코드가 무엇인지 꾸준히 고민하는 백엔드 개발자입니다. 기술보다
            설계를, 구현보다 왜(Why)를 먼저 생각합니다.
          </p>
        </div>
      </section>

      {/* Orb divider */}
      <div className="max-w-[1100px] mx-auto px-4 md:px-8">
        <div className="section-orb" />
      </div>

      {/* ===== STORY SECTION ===== */}
      <section className="py-16 md:py-24 px-4">
        <div className="max-w-[1100px] mx-auto px-4 md:px-8">
          <div className="animate-fade-up mb-10">
            <span className="font-mono text-[0.7rem] uppercase tracking-[0.15em] text-[rgba(139,92,246,0.5)] block mb-3">
              Story
            </span>
            <h2 className="font-heading text-3xl md:text-4xl font-semibold text-white/90">
              저에 대해
            </h2>
          </div>

          <div className="animate-fade-up stagger-2 space-y-5 text-white/75 leading-relaxed max-w-3xl">
            <p>
              개발을 시작한 지 얼마 되지 않았을 때, 저는 "동작하는 코드"를
              만드는 데만 집중했습니다. 그런데 코드가 쌓일수록 뭔가 잘못됐다는
              느낌이 들기 시작했어요. 고치기 어렵고, 테스트하기도 힘들고,
              같이 일하는 동료도 이해하기 어려운 코드였습니다.
            </p>
            <p>
              그 이후로 클린 아키텍처, 도메인 주도 설계(DDD), SOLID 원칙을
              공부하면서 설계의 중요성을 깨달았습니다. 지금은 "왜 이 계층에
              이 로직이 있어야 하는가", "이 책임은 누가 져야 하는가"를
              먼저 생각하며 코드를 작성합니다.
            </p>
            <p>
              이 블로그는 그 고민의 흔적입니다. 정답을 제시하기보다는 제가
              부딪힌 문제와 선택의 과정을 솔직하게 공유하고 싶습니다.
            </p>
          </div>
        </div>
      </section>

      {/* Orb divider */}
      <div className="max-w-[1100px] mx-auto px-4 md:px-8">
        <div className="section-orb" />
      </div>

      {/* ===== SKILLS / TECH STACK SECTION ===== */}
      <section className="py-16 md:py-24 px-4">
        <div className="max-w-[1100px] mx-auto px-4 md:px-8">
          <div className="animate-fade-up mb-12">
            <span className="font-mono text-[0.7rem] uppercase tracking-[0.15em] text-[rgba(139,92,246,0.5)] block mb-3">
              Tech Stack
            </span>
            <h2 className="font-heading text-3xl md:text-4xl font-semibold text-white/90">
              기술 스택
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
            {(Object.entries(skills) as [string, readonly string[]][]).map(
              ([category, items], i) => (
                <div
                  key={category}
                  className={cn("animate-fade-up", staggerClass(i))}
                >
                  <p className="font-mono text-[0.7rem] uppercase tracking-[0.15em] text-white/45 mb-3">
                    {category}
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {items.map((skill) => (
                      <span
                        key={skill}
                        className="font-mono text-[0.65rem] px-3 py-1.5 rounded-md bg-white/[0.03] border border-white/[0.06] text-white/35 hover:border-[rgba(139,92,246,0.2)] hover:text-white/55 hover:bg-[rgba(139,92,246,0.05)] transition-all cursor-default"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>
              )
            )}
          </div>
        </div>
      </section>

      {/* Orb divider */}
      <div className="max-w-[1100px] mx-auto px-4 md:px-8">
        <div className="section-orb" />
      </div>

      {/* ===== EXPERIENCE TIMELINE SECTION ===== */}
      <section className="py-16 md:py-24 px-4">
        <div className="max-w-[1100px] mx-auto px-4 md:px-8">
          <div className="animate-fade-up mb-12">
            <span className="font-mono text-[0.7rem] uppercase tracking-[0.15em] text-[rgba(139,92,246,0.5)] block mb-3">
              Experience
            </span>
            <h2 className="font-heading text-3xl md:text-4xl font-semibold text-white/90">
              경력
            </h2>
          </div>

          <div className="relative space-y-0 max-w-3xl">
            {/* Vertical timeline line */}
            <div className="absolute left-[7px] top-2 bottom-2 w-px bg-white/[0.06]" />

            {experiences.map((exp, i) => (
              <div
                key={`${exp.company}-${exp.period}`}
                className={cn(
                  "animate-fade-up relative pl-8 pb-10 last:pb-0",
                  staggerClass(i)
                )}
              >
                {/* Timeline dot */}
                <div className="absolute left-0 top-1.5 size-3.5 rounded-full border-2 border-[rgba(139,92,246,0.5)] bg-black" />

                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-1 mb-2">
                  <div>
                    <p className="font-medium text-white/90">{exp.role}</p>
                    <p className="text-sm text-[rgba(139,92,246,0.7)]">
                      {exp.company}
                    </p>
                  </div>
                  <span className="font-mono text-xs text-white/25">
                    {exp.period}
                  </span>
                </div>
                <p className="text-sm text-white/45 leading-relaxed">
                  {exp.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Orb divider */}
      <div className="max-w-[1100px] mx-auto px-4 md:px-8">
        <div className="section-orb" />
      </div>

      {/* ===== CONTACT SECTION ===== */}
      <section className="py-16 md:py-24 px-4">
        <div className="max-w-[1100px] mx-auto px-4 md:px-8">
          <div className="animate-fade-up mb-10">
            <span className="font-mono text-[0.7rem] uppercase tracking-[0.15em] text-[rgba(139,92,246,0.5)] block mb-3">
              Contact
            </span>
            <h2 className="font-heading text-3xl md:text-4xl font-semibold text-white/90 mb-4">
              연락하기
            </h2>
            <p className="text-white/75 leading-relaxed max-w-lg">
              함께 고민하고 싶은 주제가 있거나, 피드백이 있다면 언제든지
              연락 주세요. 이야기 나누는 것을 좋아합니다.
            </p>
          </div>

          <div className="animate-fade-up stagger-2 flex flex-wrap gap-3">
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

            <a
              href={siteConfig.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full border border-white/[0.08] text-sm text-white/55 hover:text-white/85 hover:border-[rgba(139,92,246,0.3)] hover:bg-[rgba(139,92,246,0.06)] transition-all"
            >
              <Linkedin className="size-4" />
              LinkedIn
            </a>
          </div>

          <div className="animate-fade-up stagger-3 mt-12 pt-8 border-t border-white/[0.06]">
            <p className="text-sm text-white/25 mb-4">
              블로그 글도 함께 읽어보세요
            </p>
            <Link
              to="/blog"
              className="inline-flex items-center gap-2 text-sm text-white/55 hover:text-white/85 transition-colors"
            >
              모든 글 보기
              <ArrowRight className="size-4" />
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
