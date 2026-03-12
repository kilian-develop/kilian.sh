/**
 * Google Analytics 4 integration.
 * Activate by setting VITE_GA_MEASUREMENT_ID in your environment.
 * When the env var is absent, nothing is rendered.
 */
export function Analytics() {
  const gaId =
    typeof import.meta.env !== "undefined"
      ? import.meta.env.VITE_GA_MEASUREMENT_ID
      : undefined;

  if (!gaId) return null;

  return (
    <>
      <script
        async
        src={`https://www.googletagmanager.com/gtag/js?id=${gaId}`}
      />
      <script
        dangerouslySetInnerHTML={{
          __html: `
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', '${gaId}');
          `,
        }}
      />
    </>
  );
}
