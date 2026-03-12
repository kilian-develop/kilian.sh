import { Link } from "react-router";
import { ArrowLeft, Search } from "lucide-react";
import { siteConfig } from "~/data/site";

export function meta() {
  return [
    { title: `페이지를 찾을 수 없습니다 | ${siteConfig.title}` },
    { name: "robots", content: "noindex" },
  ];
}

export default function NotFound() {
  return (
    <div className="min-h-[80dvh] flex items-center justify-center px-8">
      <div className="max-w-lg w-full text-center">
        {/* 404 Number */}
        <div className="relative mb-8">
          <span className="block font-heading text-[8rem] md:text-[10rem] font-bold leading-none tracking-tighter select-none bg-gradient-to-b from-white/[0.08] to-transparent bg-clip-text text-transparent">
            404
          </span>
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="size-16 rounded-full bg-[rgba(139,92,246,0.08)] border border-[rgba(139,92,246,0.15)] flex items-center justify-center backdrop-blur-sm">
              <Search className="size-6 text-[rgba(167,139,250,0.6)]" />
            </div>
          </div>
        </div>

        {/* Message */}
        <h1 className="font-heading font-semibold text-xl md:text-2xl text-white/90 mb-3">
          페이지를 찾을 수 없습니다
        </h1>
        <p className="text-sm text-white/40 leading-relaxed mb-8 max-w-sm mx-auto">
          요청하신 페이지가 존재하지 않거나 이동되었을 수 있습니다.
          <br />
          주소를 다시 확인해 주세요.
        </p>

        {/* Actions */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
          <Link
            to="/"
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full border border-[rgba(139,92,246,0.25)] bg-[rgba(139,92,246,0.08)] text-[rgba(167,139,250,0.9)] text-sm font-medium transition-all duration-200 hover:bg-[rgba(139,92,246,0.15)] hover:border-[rgba(139,92,246,0.4)] hover:shadow-[0_0_20px_rgba(139,92,246,0.15)]"
          >
            <ArrowLeft className="size-3.5" />
            홈으로 돌아가기
          </Link>
          <Link
            to="/blog"
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full border border-white/[0.06] bg-white/[0.02] text-white/50 text-sm font-medium transition-all duration-200 hover:border-white/[0.12] hover:text-white/70"
          >
            블로그 둘러보기
          </Link>
        </div>
      </div>
    </div>
  );
}
