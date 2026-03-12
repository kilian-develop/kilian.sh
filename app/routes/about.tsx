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
  Backend: ["Java", "Spring Boot", "Spring Framework", "JPA / Hibernate", "Spring Batch", "Spring Security"],
  "Data & Messaging": ["Kafka", "MariaDB", "MongoDB"],
  Infrastructure: ["Docker", "Git", "GitHub Actions", "Linux"],
  "Architecture & Design": ["클린 아키텍처", "DDD", "마이크로서비스", "SOLID"],
} as const;

const philosophy = [
  { title: "도메인 이해 우선", description: "기술보다 비즈니스 규칙을 먼저 이해합니다." },
  { title: "SOLID 원칙", description: "확장성 있는 설계를 지향합니다." },
  { title: "테스트 주도 개발", description: "안정적인 코드를 위해 테스트를 먼저 작성합니다." },
  { title: "지속적인 학습", description: "새로운 기술과 패턴을 꾸준히 습득합니다." },
] as const;

const blogTopics = [
  "객체지향 프로그래밍 — 설계 원칙과 패턴",
  "아키텍처 설계 — 클린 아키텍처, 마이크로서비스",
  "Spring Framework — 활용법과 Best Practice",
  "Kafka — 메시지 처리와 실시간 데이터",
  "데이터베이스 — MariaDB, MongoDB 활용",
  "개발 도구 — Claude Code, Git 등",
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
            "좋은 설계는 변화에 유연하고, 좋은 코드는 의도를 명확히 합니다."
          </p>
          <p className="animate-fade-up stagger-5 text-base text-white/55 leading-relaxed max-w-2xl mt-4">
            Java와 Spring Framework를 중심으로 백엔드 서비스를 개발하고 있습니다.
            확장 가능하고 유지보수하기 쉬운 코드를 작성하는 것을 지향합니다.
          </p>
        </div>
      </section>

      {/* Orb divider */}
      <div className="max-w-[1100px] mx-auto px-4 md:px-8">
        <div className="section-orb" />
      </div>

      {/* ===== PHILOSOPHY SECTION ===== */}
      <section className="py-16 md:py-24 px-4">
        <div className="max-w-[1100px] mx-auto px-4 md:px-8">
          <div className="animate-fade-up mb-10">
            <span className="font-mono text-[0.7rem] uppercase tracking-[0.15em] text-[rgba(139,92,246,0.5)] block mb-3">
              Philosophy
            </span>
            <h2 className="font-heading text-3xl md:text-4xl font-semibold text-white/90">
              학습 철학
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 max-w-3xl">
            {philosophy.map((item, i) => (
              <div
                key={item.title}
                className={cn(
                  "animate-fade-up glass-card p-5",
                  staggerClass(i)
                )}
              >
                <p className="font-medium text-white/85 mb-1.5">{item.title}</p>
                <p className="text-sm text-white/45 leading-relaxed">{item.description}</p>
              </div>
            ))}
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

      {/* ===== BLOG TOPICS SECTION ===== */}
      <section className="py-16 md:py-24 px-4">
        <div className="max-w-[1100px] mx-auto px-4 md:px-8">
          <div className="animate-fade-up mb-12">
            <span className="font-mono text-[0.7rem] uppercase tracking-[0.15em] text-[rgba(139,92,246,0.5)] block mb-3">
              Topics
            </span>
            <h2 className="font-heading text-3xl md:text-4xl font-semibold text-white/90">
              블로그 주제
            </h2>
          </div>

          <div className="space-y-3 max-w-3xl">
            {blogTopics.map((topic, i) => (
              <div
                key={topic}
                className={cn(
                  "animate-fade-up flex items-center gap-3 px-4 py-3 rounded-lg border border-white/[0.04] bg-white/[0.02] hover:border-[rgba(139,92,246,0.15)] hover:bg-[rgba(139,92,246,0.03)] transition-all",
                  staggerClass(i)
                )}
              >
                <div className="size-1.5 rounded-full bg-[rgba(139,92,246,0.5)] flex-shrink-0" />
                <p className="text-sm text-white/60">{topic}</p>
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
