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
import { TooltipProvider } from "~/components/ui/tooltip";
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
        <div className="ambient-bg" aria-hidden="true" />
        <div className="particles" aria-hidden="true">
          {Array.from({ length: 12 }).map((_, i) => (
            <div key={i} className="particle" />
          ))}
        </div>
        <div className="noise-overlay" aria-hidden="true" />
        <TooltipProvider>{children}</TooltipProvider>
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
      <main className="relative z-10">
        <Outlet />
      </main>
      <Footer />
    </>
  );
}

export function ErrorBoundary({ error }: Route.ErrorBoundaryProps) {
  let message = "오류가 발생했습니다";
  let details = "예상치 못한 오류가 발생했습니다.";
  let stack: string | undefined;

  if (isRouteErrorResponse(error)) {
    message = error.status === 404 ? "404" : `${error.status} 오류`;
    details =
      error.status === 404
        ? "요청하신 페이지를 찾을 수 없습니다."
        : error.statusText || details;
  } else if (import.meta.env.DEV && error && error instanceof Error) {
    details = error.message;
    stack = error.stack;
  }

  return (
    <div className="mx-auto max-w-6xl px-4 py-24 text-center md:px-6 lg:px-8">
      <h1 className="font-serif mb-4 text-6xl font-semibold tracking-tight text-primary">
        {message}
      </h1>
      <p className="mb-8 text-lg text-muted-foreground">{details}</p>
      {stack && (
        <pre className="mx-auto max-w-2xl overflow-x-auto rounded-lg border border-border bg-muted p-4 text-left text-xs text-muted-foreground">
          <code>{stack}</code>
        </pre>
      )}
    </div>
  );
}
