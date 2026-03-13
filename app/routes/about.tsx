import { GraduationCap, Award, Building2, Calendar } from "lucide-react";
import { Image } from "@unpic/react";
import type { Route } from "./+types/about";
import { cn, staggerClass } from "~/lib/utils";
import { siteConfig, buildMeta } from "~/data/site";
import { ContactCTA } from "~/components/shared/contact-cta";

export function meta(_: Route.MetaArgs) {
  return buildMeta(
    "소개",
    "백엔드 개발자 박명규의 소개 페이지입니다. 확장성과 지속 가능성을 중심으로 서비스를 개발합니다.",
    "/about",
  );
}

const skills = {
  Backend: ["Java", "Spring Boot", "Spring MVC", "Spring Security", "Spring Batch", "JPA / Hibernate"],
  "Data & Messaging": ["Kafka", "MariaDB", "MongoDB", "Redis"],
  Infrastructure: ["Docker", "Git", "GitHub Actions", "Linux"],
  "Architecture & Design": ["클린 아키텍처", "DDD", "이벤트 기반 아키텍처", "SOLID"],
} as const;

const career = [
  {
    company: "무하유",
    role: "백엔드 개발자",
    period: "2023.07 ~ 현재",
    highlights: [
      "카피킬러 표절검사 서비스 운영 및 개선",
      "GPT Killer 서비스 개발 및 운영",
      "문서 전처리 파이프라인 이벤트 기반 아키텍처 재설계",
      "2억건+ 데이터 마이그레이션 설계 및 수행",
    ],
  },
  {
    company: "커먼컴퓨터",
    role: "인턴",
    period: "2021.06 ~ 2021.08",
    highlights: [
      "AI를 활용한 검색엔진 서비스 개발",
      "Jina AI Framework 워크샵 발표",
    ],
  },
] as const;

const philosophy = [
  { title: "흔들리지 않는 기반", description: "코드부터 설계까지, 안정적이고 유지보수하기 쉬운 서비스를 만듭니다." },
  { title: "확장 가능한 구조", description: "변화에 유연하게 대응할 수 있는 아키텍처를 지향합니다." },
  { title: "문제 해결 중심", description: "기술 선택의 근거와 트레이드오프를 고민합니다." },
  { title: "지속적인 성장", description: "경험을 글로 정리하며 깊이 있는 이해를 추구합니다." },
] as const;

export default function About() {
  return (
    <div className="min-h-screen">
      {/* ===== HERO SECTION ===== */}
      <section className="pt-24 pb-16 md:pt-36 md:pb-24 px-4">
        <div className="max-w-page mx-auto px-4 md:px-8">
          <div className="animate-fade-up mb-10">
            <span className="font-mono text-[0.7rem] uppercase tracking-[0.15em] text-accent/50">
              About Me
            </span>
          </div>

          <div className="flex flex-col sm:flex-row items-start gap-6 md:gap-10 mb-8">
            {/* Profile Image */}
            <div className="animate-fade-up stagger-1 flex-shrink-0">
              <div className="relative size-24 md:size-32 rounded-2xl bg-white/[0.03] border border-white/[0.06] backdrop-blur-[10px] overflow-hidden">
                <Image
                  src="/images/profile.jpg"
                  alt="박명규 프로필"
                  width={128}
                  height={128}
                  layout="fullWidth"
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 ring-1 ring-inset ring-white/[0.08] rounded-2xl" />
              </div>
            </div>

            <div>
              <h1 className="animate-fade-up stagger-2 font-heading text-4xl md:text-6xl font-semibold leading-tight tracking-tight text-white/90 mb-2">
                박명규
              </h1>
              <p className="animate-fade-up stagger-3 text-lg font-mono text-accent/70 mb-3">
                Backend Developer
              </p>
              <div className="animate-fade-up stagger-4 flex flex-wrap gap-x-4 gap-y-1 text-sm text-white/40">
                <span className="flex items-center gap-1.5">
                  <GraduationCap className="size-3.5" />
                  강원대학교 컴퓨터공학과
                </span>
                <span className="flex items-center gap-1.5">
                  <Award className="size-3.5" />
                  정보처리기사
                </span>
              </div>
            </div>
          </div>

          <p className="animate-fade-up stagger-5 text-lg md:text-xl text-white/75 leading-relaxed max-w-2xl text-balance">
            "흔들리지 않는 기반을 만듭니다."
          </p>
          <p className="animate-fade-up stagger-6 text-base text-white/55 leading-relaxed max-w-2xl mt-4">
            확장성과 지속 가능성을 중심에 두고 서비스 개발을 해온 백엔드 개발자입니다.
            <br />
            코드부터 소프트웨어 설계까지 안정적이고 유지보수하기 쉬운 서비스를 만들기 위한 고민을 바탕으로 구현하는 데 강점을 가지고 있습니다.
          </p>
        </div>
      </section>

      {/* Orb divider */}
      <div className="max-w-page mx-auto px-4 md:px-8">
        <div className="section-orb" />
      </div>

      {/* ===== CAREER SECTION ===== */}
      <section className="py-16 md:py-24 px-4">
        <div className="max-w-page mx-auto px-4 md:px-8">
          <div className="animate-fade-up mb-12">
            <span className="font-mono text-[0.7rem] uppercase tracking-[0.15em] text-accent/50 block mb-3">
              Career
            </span>
            <h2 className="font-heading text-3xl md:text-4xl font-semibold text-white/90">
              경력
            </h2>
          </div>

          <div className="space-y-6 max-w-3xl">
            {career.map((item, i) => (
              <div
                key={item.company}
                className={cn(
                  "animate-fade-up glass-card p-6 md:p-8",
                  staggerClass(i)
                )}
              >
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 mb-4">
                  <div className="flex items-center gap-3">
                    <Building2 className="size-5 text-accent/60" />
                    <h3 className="font-heading text-lg font-semibold text-white/90">
                      {item.company}
                    </h3>
                    <span className="text-sm text-white/45">{item.role}</span>
                  </div>
                  <span className="flex items-center gap-1.5 font-mono text-xs text-white/35">
                    <Calendar className="size-3.5" />
                    {item.period}
                  </span>
                </div>
                <ul className="space-y-2">
                  {item.highlights.map((highlight) => (
                    <li key={highlight} className="flex items-start gap-2.5 text-sm text-white/55 leading-relaxed">
                      <div className="size-1.5 rounded-full bg-accent/40 mt-1.5 flex-shrink-0" />
                      {highlight}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Orb divider */}
      <div className="max-w-page mx-auto px-4 md:px-8">
        <div className="section-orb" />
      </div>

      {/* ===== PHILOSOPHY SECTION ===== */}
      <section className="py-16 md:py-24 px-4">
        <div className="max-w-page mx-auto px-4 md:px-8">
          <div className="animate-fade-up mb-10">
            <span className="font-mono text-[0.7rem] uppercase tracking-[0.15em] text-accent/50 block mb-3">
              Philosophy
            </span>
            <h2 className="font-heading text-3xl md:text-4xl font-semibold text-white/90">
              개발 철학
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
      <div className="max-w-page mx-auto px-4 md:px-8">
        <div className="section-orb" />
      </div>

      {/* ===== SKILLS / TECH STACK SECTION ===== */}
      <section className="py-16 md:py-24 px-4">
        <div className="max-w-page mx-auto px-4 md:px-8">
          <div className="animate-fade-up mb-12">
            <span className="font-mono text-[0.7rem] uppercase tracking-[0.15em] text-accent/50 block mb-3">
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
                        className="font-mono text-[0.65rem] px-3 py-1.5 rounded-md bg-white/[0.03] border border-white/[0.06] text-white/35 hover:border-accent/20 hover:text-white/55 hover:bg-accent/5 transition-all cursor-default"
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
      <div className="max-w-page mx-auto px-4 md:px-8">
        <div className="section-orb" />
      </div>

      {/* ===== CONTACT SECTION ===== */}
      <ContactCTA
        title="연락하기"
        description="함께 고민하고 싶은 주제가 있거나, 피드백이 있다면 언제든지 연락 주세요. 이야기 나누는 것을 좋아합니다."
        showLinkedin
        showBlogLink
      />
    </div>
  );
}
