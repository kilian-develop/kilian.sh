import { useEffect } from "react";
import {
  isRouteErrorResponse,
  Links,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
  useNavigation,
} from "react-router";
import NProgress from "nprogress";

import { Toaster } from "sonner";
import { Analytics as VercelAnalytics } from "@vercel/analytics/react";
import { SpeedInsights } from "@vercel/speed-insights/react";
import type { Route } from "./+types/root";
import { Header } from "~/components/layout/header";
import { Footer } from "~/components/layout/footer";
import { Analytics as GAAnalytics } from "~/components/analytics";
import { siteConfig } from "~/data/site";
import "./app.css";

NProgress.configure({ showSpinner: false, speed: 300, minimum: 0.2 });

export const links: Route.LinksFunction = () => [
  { rel: "icon", type: "image/svg+xml", href: "/favicon.svg" },
  { rel: "alternate", type: "application/rss+xml", title: "kilian.sh RSS", href: "/rss.xml" },
  { rel: "preconnect", href: "https://fonts.googleapis.com" },
  {
    rel: "preconnect",
    href: "https://fonts.gstatic.com",
    crossOrigin: "anonymous",
  },
  {
    rel: "stylesheet",
    href: "https://fonts.googleapis.com/css2?family=Sora:wght@300;400;500;600;700&family=JetBrains+Mono:wght@400;500&display=swap",
  },
];

export const meta: Route.MetaFunction = () => [
  { title: siteConfig.title },
  { name: "description", content: siteConfig.description },
  { property: "og:site_name", content: siteConfig.title },
  { property: "og:locale", content: "ko_KR" },
  { name: "twitter:card", content: "summary" },
];

const themeScript = `
(function () {
  document.documentElement.classList.add('dark');
  try { localStorage.setItem('theme', 'dark'); } catch (e) {}
})();
`.trim();

export function Layout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ko">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <Meta />
        <Links />
        <GAAnalytics />
      </head>
      <body className="">
        <VercelAnalytics />
        <SpeedInsights />
        <script dangerouslySetInnerHTML={{ __html: themeScript }} />
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-[100] focus:px-4 focus:py-2 focus:rounded-lg focus:bg-accent/90 focus:text-white focus:text-sm focus:font-medium"
        >
          본문으로 건너뛰기
        </a>
        <div className="ambient-bg" aria-hidden="true" />
        <div className="particles" aria-hidden="true">
          {Array.from({ length: 12 }).map((_, i) => (
            <div key={i} className="particle" />
          ))}
        </div>
        <div className="noise-overlay" aria-hidden="true" />
        {children}
        <Toaster
          theme="dark"
          position="bottom-right"
          toastOptions={{
            style: {
              background: "rgba(10, 10, 20, 0.9)",
              border: "1px solid rgba(255, 255, 255, 0.08)",
              color: "rgba(255, 255, 255, 0.85)",
              backdropFilter: "blur(12px)",
            },
          }}
        />
        <ScrollRestoration />
        <Scripts />
      </body>
    </html>
  );
}

export default function App() {
  const navigation = useNavigation();

  useEffect(() => {
    if (navigation.state !== "idle") {
      NProgress.start();
    } else {
      NProgress.done();
    }
  }, [navigation.state]);

  return (
    <>
      <Header />
      <main id="main-content" className="relative z-10">
        <Outlet />
      </main>
      <Footer />
    </>
  );
}

export function ErrorBoundary({ error }: Route.ErrorBoundaryProps) {
  const is404 = isRouteErrorResponse(error) && error.status === 404;

  if (is404) {
    return (
      <div className="min-h-[80dvh] flex items-center justify-center px-8">
        <div className="max-w-lg w-full text-center">
          <div className="relative mb-8">
            <span className="block font-heading text-[8rem] md:text-[10rem] font-bold leading-none tracking-tighter select-none bg-gradient-to-b from-white/[0.08] to-transparent bg-clip-text text-transparent">
              404
            </span>
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="size-16 rounded-full bg-accent/[0.08] border border-accent/15 flex items-center justify-center backdrop-blur-sm">
                <span className="text-2xl text-accent-light/60">?</span>
              </div>
            </div>
          </div>

          <h1 className="font-heading font-semibold text-xl md:text-2xl text-white/90 mb-3">
            페이지를 찾을 수 없습니다
          </h1>
          <p className="text-sm text-white/40 leading-relaxed mb-8 max-w-sm mx-auto">
            요청하신 페이지가 존재하지 않거나 이동되었을 수 있습니다.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
            <a
              href="/"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full border border-accent/25 bg-accent/[0.08] text-accent-light/90 text-sm font-medium transition-all duration-200 hover:bg-accent/15 hover:border-accent/40"
            >
              홈으로 돌아가기
            </a>
            <a
              href="/blog"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full border border-white/[0.06] bg-white/[0.02] text-white/50 text-sm font-medium transition-all duration-200 hover:border-white/[0.12] hover:text-white/70"
            >
              블로그 둘러보기
            </a>
          </div>
        </div>
      </div>
    );
  }

  // Non-404 errors
  let statusCode = "";
  let message = "예상치 못한 오류가 발생했습니다.";
  let stack: string | undefined;

  if (isRouteErrorResponse(error)) {
    statusCode = String(error.status);
    message = error.statusText || message;
  } else if (error instanceof Error) {
    message = import.meta.env.DEV ? error.message : message;
    stack = import.meta.env.DEV ? error.stack : undefined;
  }

  return (
    <div className="min-h-[80dvh] flex items-center justify-center px-8">
      <div className="max-w-lg w-full text-center">
        <div className="relative mb-8">
          <span className="block font-heading text-[8rem] md:text-[10rem] font-bold leading-none tracking-tighter select-none bg-gradient-to-b from-white/[0.08] to-transparent bg-clip-text text-transparent">
            {statusCode || "Oops"}
          </span>
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="size-16 rounded-full bg-[rgba(244,63,94,0.08)] border border-[rgba(244,63,94,0.15)] flex items-center justify-center backdrop-blur-sm">
              <span className="text-2xl text-[rgba(251,113,133,0.7)]">!</span>
            </div>
          </div>
        </div>

        <h1 className="font-heading font-semibold text-xl md:text-2xl text-white/90 mb-3">
          오류가 발생했습니다
        </h1>
        <p className="text-sm text-white/40 leading-relaxed mb-8 max-w-sm mx-auto">
          {message}
        </p>

        {stack && (
          <pre className="mx-auto max-w-2xl overflow-x-auto rounded-lg border border-white/[0.06] bg-white/[0.02] p-4 text-left text-xs text-white/40 mb-8">
            <code>{stack}</code>
          </pre>
        )}

        <a
          href="/"
          className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full border border-accent/25 bg-accent/[0.08] text-accent-light/90 text-sm font-medium transition-all duration-200 hover:bg-accent/15 hover:border-accent/40"
        >
          홈으로 돌아가기
        </a>
      </div>
    </div>
  );
}
