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
  nodeRed,
  nodeGreen,
  arrowText,
  sectionLabel,
  problemDot,
  solutionDot,
} from "~/components/portfolio/diagram-primitives";

export function meta() {
  return buildMeta(
    "문서 전처리 서비스 마이그레이션",
    "MariaDB 2억건+ 데이터를 MongoDB로 무중단 마이그레이션한 프로젝트입니다.",
    "/portfolio/migration",
  );
}

/* ─── Before/After State Diagram ─── */
function MigrationStateDiagram() {
  return (
    <div className="glass-card p-5 md:p-6">
      <p className={sectionLabel}>시스템 구조 변화</p>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div className="rounded-xl border border-accent-red/[0.12] bg-accent-red/[0.02] p-4">
          <p className="text-[0.6rem] font-mono text-accent-red/50 mb-3 text-center">
            Before — 이중 구조
          </p>
          <div className="flex flex-col items-center gap-2">
            <div className={nodeDefault}>클라이언트</div>
            <div className="flex items-center gap-2 text-[0.55rem] text-white/25 font-mono">
              <span>1. 조회</span>
              <span>2. 없으면</span>
              <span>3. 재조회</span>
            </div>
            <div className="flex gap-3">
              <div className={nodeRed}>레거시 (MariaDB 2억건+)</div>
              <div className={nodeBlue}>신규 (MongoDB)</div>
            </div>
          </div>
        </div>

        <div className="rounded-xl border border-accent-green/[0.12] bg-accent-green/[0.02] p-4">
          <p className="text-[0.6rem] font-mono text-accent-green/50 mb-3 text-center">
            After — 단일 구조
          </p>
          <div className="flex flex-col items-center gap-2">
            <div className={nodeDefault}>클라이언트</div>
            <Arrow />
            <div className={nodeGreen}>MongoDB (통합)</div>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ─── Migration Flow Diagram ─── */
function MigrationFlowDiagram() {
  return (
    <div className="glass-card p-5 md:p-6">
      <p className={sectionLabel}>마이그레이션 파이프라인</p>
      <div className="flex flex-col items-center gap-3">
        <div className="rounded-xl border border-accent-red/[0.12] bg-accent-red/[0.02] p-4 w-full">
          <p className="text-[0.6rem] font-mono text-accent-red/40 mb-2 text-center">
            데이터 수집
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-2">
            <div className={nodeRed}>MariaDB 2억건+</div>
            <div className="flex items-center gap-1">
              <span className={arrowText}>binlog</span>
              <Arrow horizontal />
            </div>
            <div className={nodeBlue}>Kafka Connect CDC</div>
            <div className="flex items-center gap-1">
              <span className={arrowText}>증분 적재</span>
              <Arrow horizontal />
            </div>
            <div className={nodePurple}>Kafka Topic</div>
          </div>
        </div>

        <Arrow />

        <div className="rounded-xl border border-accent-green/[0.12] bg-accent-green/[0.02] p-4 w-full">
          <p className="text-[0.6rem] font-mono text-accent-green/40 mb-2 text-center">
            Spring Batch 처리
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-2">
            <div className={nodeGreen}>Reader (Kafka 소비)</div>
            <Arrow horizontal />
            <div className={nodeGreen}>Writer (RxJava 병렬 조회 + Bulk Insert)</div>
          </div>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3 mt-3">
            <div className="flex items-center gap-1.5">
              <span className={arrowText}>성공</span>
              <Arrow horizontal />
              <div className={nodeTeal}>MongoDB</div>
            </div>
            <div className="flex items-center gap-1.5">
              <span className={arrowText}>16MB 초과 Skip</span>
              <Arrow horizontal />
              <div className={nodePurple}>GridFS</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function MigrationProject() {
  return (
    <div className="min-h-screen">
      {/* ===== HEADER ===== */}
      <ProjectHeader
        number="#02"
        title="문서 전처리 서비스 마이그레이션"
        tags={["Spring Batch", "Kafka Connect", "RxJava", "MariaDB", "MongoDB", "GridFS"]}
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
            <p className="text-sm text-white/55 leading-relaxed mb-4 break-keep">
              이전 아키텍처 변경 이후, 레거시 데이터베이스에 저장되어 있는 2억건 이상의 데이터를
              완전히 걷어내지 못하고 있었습니다. MongoDB를 먼저 조회하고, 없는 경우 MariaDB를
              조회하도록 Fallback 처리가 되어있어 기존/신규 시스템 병행으로 운영 복잡도가 증가했습니다.
              프로세스를 단일화하기 위해 MariaDB의 2억건 이상의 문장 데이터를 MongoDB로 이관해야 했습니다.
            </p>
            <MigrationStateDiagram />
          </div>

          {/* Problem & Solution */}
          <div className="animate-fade-up stagger-1 glass-card p-6">
            <h2 className="font-heading text-base font-semibold text-white/80 mb-3">문제 상황 및 해결 과정</h2>
            <div className="space-y-5 text-sm text-white/55 leading-relaxed">
              {/* Issue 1 */}
              <div>
                <p className="font-medium text-white/70 mb-2">1. 마이그레이션 대상 테이블 적재 문제</p>
                <ul className="space-y-1.5 mb-3">
                  <li className="flex items-start gap-2.5"><div className={problemDot} />2억 건 이상의 데이터를 한 번에 조회 시 레거시 DB 부하 우려</li>
                  <li className="flex items-start gap-2.5"><div className={problemDot} />운영 서비스 성능 저하 가능성, 신규 유입 데이터 누락 위험</li>
                </ul>
                <p className="font-medium text-white/70 mb-2">해결: Kafka Connect CDC 도입</p>
                <ul className="space-y-1.5">
                  <li className="flex items-start gap-2.5"><div className={solutionDot} />binlog 기반으로 운영 DB 부하 없이 실시간 변경 감지</li>
                  <li className="flex items-start gap-2.5"><div className={solutionDot} />Incremental Snapshot으로 대용량 테이블도 청크 단위 처리</li>
                  <li className="flex items-start gap-2.5"><div className={solutionDot} />offset 자동 관리로 적재 위치 별도 기록 불필요</li>
                </ul>
              </div>

              {/* Issue 2 */}
              <div>
                <p className="font-medium text-white/70 mb-2">2. 과도한 I/O Blocking 부하</p>
                <ul className="space-y-1.5 mb-3">
                  <li className="flex items-start gap-2.5"><div className={problemDot} />Processor에서 API를 통해 문장 데이터를 단건씩 조회하여 2억건 처리 시 과도한 네트워크 I/O</li>
                  <li className="flex items-start gap-2.5"><div className={problemDot} />동기 호출로 스레드 블로킹, 처리 속도 저하</li>
                </ul>
                <p className="font-medium text-white/70 mb-2">해결: Processor 제거 후 Writer에서 RxJava 병렬 조회</p>
                <ul className="space-y-1.5">
                  <li className="flex items-start gap-2.5"><div className={solutionDot} />JavaRx Scheduler.io로 멀티쓰레드 병렬 조회, 처리량 대폭 향상</li>
                  <li className="flex items-start gap-2.5"><div className={solutionDot} />단건 조회 유지로 응답 크기 예측 가능, 네트워크 안정성 확보</li>
                </ul>
              </div>

              {/* Issue 3 */}
              <div>
                <p className="font-medium text-white/70 mb-2">3. MongoDB 16MB 제한</p>
                <ul className="space-y-1.5 mb-3">
                  <li className="flex items-start gap-2.5"><div className={problemDot} />Bulk Insert 시 BsonMaximumSizeExceededException 예외 발생</li>
                </ul>
                <p className="font-medium text-white/70 mb-2">해결: Spring Batch ItemWriter Skip 전략 + GridFS</p>
                <ul className="space-y-1.5">
                  <li className="flex items-start gap-2.5"><div className={solutionDot} />Skip 발생 시 Chunk Size가 1이 되는 특성을 활용하여 16MB 초과 문서를 GridFS로 저장</li>
                  <li className="flex items-start gap-2.5"><div className={solutionDot} />별도의 후처리 작업 없이 Skip 전략으로 문제 문서 특정 가능</li>
                </ul>
              </div>
            </div>
          </div>

          {/* Migration Flow Diagram */}
          <div className="animate-fade-up stagger-2">
            <MigrationFlowDiagram />
          </div>

          {/* Impact */}
          <div className="animate-fade-up stagger-3">
            <ImpactCard
              items={[
                { metric: "2억건+ 무중단 마이그레이션", detail: "운영 서비스 영향 zero" },
                { metric: "인프라 비용 절감", detail: "레거시 시스템 완전 제거 (MariaDB 인스턴스, 레거시 API 서버 등)" },
                { metric: "운영 복잡도 감소", detail: "관리 포인트가 2개 시스템에서 1개로" },
                { metric: "안정적 이관", detail: "기존 레거시를 사용하던 서비스들의 안정적인 신규 시스템 이관 가능" },
              ]}
            />
          </div>

          {/* Back */}
          <div className="animate-fade-up stagger-4 pt-8">
            <BackLink to="/portfolio" label="포트폴리오로 돌아가기" />
          </div>
        </div>
      </section>
    </div>
  );
}
