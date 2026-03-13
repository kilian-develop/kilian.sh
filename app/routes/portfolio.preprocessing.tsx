import { cn } from "~/lib/utils";
import { siteConfig, buildMeta } from "~/data/site";
import { BackLink } from "~/components/shared/back-link";
import { ProjectHeader } from "~/components/portfolio/project-header";
import {
  Arrow,
  ImpactCard,
  nodeDefault,
  nodePurple,
  nodeBlue,
  nodeTeal,
  nodeGreen,
  arrowText,
  sectionLabel,
  problemDot,
  analysisDot,
  solutionDot,
} from "~/components/portfolio/diagram-primitives";

export function meta() {
  return buildMeta(
    "문서 전처리 서비스",
    "카피킬러 문서 전처리 파이프라인을 이벤트 기반 아키텍처로 재설계한 프로젝트입니다.",
    "/portfolio/preprocessing",
  );
}

/* ─── Pipeline Diagram ─── */
function PipelineDiagram() {
  return (
    <div className="glass-card p-5 md:p-6">
      <p className={sectionLabel}>문서 전처리 파이프라인</p>
      <div className="flex flex-wrap items-center justify-center gap-2">
        {[
          { label: "문서 업로드", sub: "PDF, HWP, DOCX", color: nodeDefault },
          { label: "텍스트 추출", sub: "", color: nodeBlue },
          { label: "OCR 처리", sub: "이미지 내 텍스트", color: nodePurple },
          { label: "문장 분할", sub: "", color: nodeTeal },
          { label: "저장", sub: "", color: nodeDefault },
          { label: "표절 검사", sub: "100억+ 문서 비교", color: nodeGreen },
        ].map((step, i, arr) => (
          <div key={step.label} className="flex items-center gap-2">
            <div className={cn(step.color, "text-center")}>
              <div>{step.label}</div>
              {step.sub && (
                <div className="text-[0.55rem] opacity-60 mt-0.5">{step.sub}</div>
              )}
            </div>
            {i < arr.length - 1 && <Arrow horizontal />}
          </div>
        ))}
      </div>
    </div>
  );
}

/* ─── Before Architecture ─── */
function BeforeArchDiagram() {
  return (
    <div className="glass-card p-5 md:p-6">
      <p className={sectionLabel}>Before — 동기 처리</p>
      <div className="flex flex-col items-center gap-3">
        <div className={nodeDefault}>클라이언트 요청</div>
        <Arrow />
        <div className="rounded-xl border border-accent-red/15 bg-accent-red/[0.03] p-4 w-full">
          <p className="text-[0.6rem] font-mono text-accent-red/50 mb-3 text-center">
            단일 API (동기 처리)
          </p>
          <div className="flex flex-col items-center gap-2.5">
            <div className={nodeDefault}>문서 업로드</div>
            <Arrow />
            <div className={nodeDefault}>텍스트 추출</div>
            <Arrow />
            <div className={nodeDefault}>OCR 처리</div>
            <Arrow />
            <div className={nodeDefault}>문장 분할</div>
            <Arrow />
            <div className={nodeDefault}>DB 저장</div>
          </div>
        </div>
        <Arrow />
        <div className={nodeDefault}>응답 대기...</div>
        <div className="flex flex-wrap justify-center gap-2 mt-2">
          {["Read Timeout", "I/O 과부하", "처리량 병목", "SPOF"].map((p) => (
            <span
              key={p}
              className="text-[0.6rem] px-2 py-1 rounded-md bg-accent-red/[0.06] border border-accent-red/[0.12] text-accent-red/60 font-mono"
            >
              {p}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}

/* ─── After Architecture ─── */
function AfterArchDiagram() {
  return (
    <div className="glass-card p-5 md:p-6">
      <p className={sectionLabel}>After — 이벤트 기반 아키텍처</p>
      <div className="flex flex-col items-center gap-3">
        <div className={nodeDefault}>클라이언트</div>
        <div className="flex items-center gap-2">
          <span className={arrowText}>요청</span>
          <Arrow />
          <span className={arrowText}>조회/콜백</span>
        </div>

        <div className="rounded-xl border border-accent-blue/15 bg-accent-blue/[0.03] p-4 w-full">
          <p className="text-[0.6rem] font-mono text-accent-blue/50 mb-2 text-center">API</p>
          <div className="flex flex-wrap justify-center gap-2">
            <div className={nodeBlue}>전처리 요청 수신</div>
            <div className={nodeBlue}>문장 데이터 조회</div>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <span className={arrowText}>Outbox 저장</span>
          <Arrow />
        </div>

        <div className={nodePurple}>MariaDB</div>

        <div className="flex items-center gap-3">
          <Arrow />
          <span className={arrowText}>이벤트 발행</span>
        </div>

        <div className="rounded-xl border border-accent/15 bg-accent/[0.03] p-4 w-full">
          <p className="text-[0.6rem] font-mono text-accent/50 mb-2 text-center">Batch</p>
          <div className="flex flex-wrap justify-center gap-2">
            <div className={nodePurple}>Outbox 조회</div>
            <Arrow horizontal />
            <div className={nodePurple}>이벤트 발행</div>
          </div>
        </div>

        <Arrow />

        <div className="rounded-xl border border-accent-teal/15 bg-accent-teal/[0.03] p-4 w-full">
          <p className="text-[0.6rem] font-mono text-accent-teal/50 mb-2 text-center">
            Worker (Kafka Consumer)
          </p>
          <div className="flex flex-wrap justify-center gap-2">
            <div className={nodeTeal}>텍스트 추출</div>
            <Arrow horizontal />
            <div className={nodeTeal}>OCR</div>
            <Arrow horizontal />
            <div className={nodeTeal}>문장 분할</div>
          </div>
        </div>

        <Arrow />
        <div className={nodeTeal}>MongoDB (텍스트/문장 데이터)</div>
      </div>
    </div>
  );
}

/* ─── Performance Table ─── */
function PerformanceTable() {
  const data = [
    { sentences: "1,000", before: "8,890ms", after: "1,182ms" },
    { sentences: "2,000", before: "16,214ms", after: "2,059ms" },
    { sentences: "3,000", before: "23,637ms", after: "3,788ms" },
    { sentences: "4,000", before: "29,010ms", after: "4,049ms" },
    { sentences: "5,000", before: "37,391ms", after: "5,155ms" },
  ];
  return (
    <div className="glass-card p-5 md:p-6 overflow-x-auto">
      <p className={sectionLabel}>JdbcTemplate batchUpdate 적용 성능 비교</p>
      <table className="w-full text-sm">
        <thead>
          <tr className="border-b border-white/[0.06]">
            <th className="font-mono text-[0.65rem] text-white/35 py-2 text-left pr-4" />
            {data.map((d) => (
              <th key={d.sentences} className="font-mono text-[0.65rem] text-white/35 py-2 text-center px-2">
                {d.sentences}문장
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          <tr className="border-b border-white/[0.04]">
            <td className="font-mono text-[0.65rem] text-accent-red/60 py-2.5 pr-4">적용 전</td>
            {data.map((d) => (
              <td key={d.sentences} className="font-mono text-[0.65rem] text-white/45 py-2.5 text-center px-2">
                {d.before}
              </td>
            ))}
          </tr>
          <tr>
            <td className="font-mono text-[0.65rem] text-accent-green/60 py-2.5 pr-4">적용 후</td>
            {data.map((d) => (
              <td key={d.sentences} className="font-mono text-[0.65rem] text-white/45 py-2.5 text-center px-2">
                {d.after}
              </td>
            ))}
          </tr>
        </tbody>
      </table>
    </div>
  );
}

export default function PreprocessingProject() {
  return (
    <div className="min-h-screen">
      {/* ===== HEADER ===== */}
      <ProjectHeader
        number="#01"
        title="문서 전처리 서비스"
        tags={["Spring Boot", "Kafka", "Spring Batch", "MariaDB", "MongoDB"]}
      />

      <div className="max-w-page mx-auto px-4 md:px-8">
        <div className="section-orb" />
      </div>

      {/* ===== CONTENT ===== */}
      <section className="py-16 md:py-24 px-4">
        <div className="max-w-page mx-auto px-4 md:px-8 space-y-6">
          {/* Overview */}
          <div className="animate-fade-up glass-card p-6">
            <h2 className="font-heading text-base font-semibold text-white/80 mb-3">개요</h2>
            <p className="text-sm text-white/55 leading-relaxed mb-3 break-keep">
              사용자의 문서(PDF, HWP, DOCX 등)를 받아 100억건 이상의 다른 문서들과
              비교하여 표절을 측정하는 서비스인 "카피킬러"를 운영하고 있습니다.
              이 서비스에서 표절을 측정하기 전, 문서를 "전처리"하는 과정이 필수적이며
              이 전처리 파이프라인을 이벤트 기반 아키텍처로 재설계하여 안정성과 확장성을 개선했습니다.
            </p>
            <PipelineDiagram />
          </div>

          {/* Problem */}
          <div className="animate-fade-up stagger-1 glass-card p-6">
            <h2 className="font-heading text-base font-semibold text-white/80 mb-3">문제 상황</h2>
            <ul className="space-y-2 text-sm text-white/55 leading-relaxed">
              <li className="flex items-start gap-2.5"><div className={problemDot} />기존에는 모든 전처리 과정을 하나의 동기 API로 처리하고 있었습니다.</li>
              <li className="flex items-start gap-2.5"><div className={problemDot} />대용량 문서 처리 시 빈번한 Read Timeout 발생</li>
              <li className="flex items-start gap-2.5"><div className={problemDot} />문서당 평균 N개 문장의 개별 DB 쓰기로 과도한 I/O 부하</li>
              <li className="flex items-start gap-2.5"><div className={problemDot} />하나의 과정이라도 실패 시 전체 프로세스 재시작 필요 (SPOF)</li>
            </ul>
          </div>

          {/* Solution */}
          <div className="animate-fade-up stagger-2 glass-card p-6">
            <h2 className="font-heading text-base font-semibold text-white/80 mb-3">해결 과정</h2>
            <div className="space-y-4 text-sm text-white/55 leading-relaxed">
              <div>
                <p className="font-medium text-white/70 mb-2">원인 분석</p>
                <ul className="space-y-1.5">
                  <li className="flex items-start gap-2.5"><div className={analysisDot} />문서 전처리 각 과정들의 강한 "의존성"</li>
                  <li className="flex items-start gap-2.5"><div className={analysisDot} />클라이언트가 전처리 요청 후 모든 과정이 완료될 때까지 대기</li>
                  <li className="flex items-start gap-2.5"><div className={analysisDot} />대용량 문서의 경우 N천~N만 건의 데이터를 문장당 한 Row 저장하여 I/O 부하</li>
                </ul>
              </div>
              <div>
                <p className="font-medium text-white/70 mb-2">해결 방안</p>
                <ul className="space-y-1.5">
                  <li className="flex items-start gap-2.5"><div className={solutionDot} />Kafka를 활용하여 각 과정의 의존성 분리 (이벤트 유실 방지를 위해 Kafka 선택)</li>
                  <li className="flex items-start gap-2.5"><div className={solutionDot} />API 모듈과 Worker 모듈 분리, 완료 후 Callback 처리</li>
                  <li className="flex items-start gap-2.5"><div className={solutionDot} />문장 데이터 조회 특성상 NoSQL이 적절하다고 판단, MongoDB 채택</li>
                  <li className="flex items-start gap-2.5"><div className={solutionDot} />JdbcTemplate batchUpdate로 N번 쓰기를 1번의 배치 작업으로 통합</li>
                </ul>
              </div>
            </div>
          </div>

          {/* Architecture Diagrams */}
          <div className="animate-fade-up stagger-3 grid grid-cols-1 lg:grid-cols-2 gap-5">
            <BeforeArchDiagram />
            <AfterArchDiagram />
          </div>

          {/* Performance */}
          <div className="animate-fade-up stagger-4">
            <PerformanceTable />
          </div>

          {/* Impact */}
          <div className="animate-fade-up stagger-5">
            <ImpactCard
              items={[
                { metric: "83% 단축", detail: "평균 문서 처리 시간: 18초 → 3초" },
                { metric: "93% 감소", detail: "주평균 장애: 28건 → 2건 (이벤트 기반 아키텍처 전환)" },
                { metric: "CS 문의 급감", detail: "대용량 문서 관련 고객 문의 대폭 감소" },
                { metric: "부분 장애 대응", detail: "각 과정 중 부분 장애 발생 시 유연한 대처 가능" },
              ]}
            />
          </div>

          {/* Back */}
          <div className="animate-fade-up stagger-6 pt-8">
            <BackLink to="/portfolio" label="포트폴리오로 돌아가기" />
          </div>
        </div>
      </section>
    </div>
  );
}
