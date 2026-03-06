import { ImageResponse } from "next/og";
import { getDictionary } from "@/i18n/dictionary";
import { isLocale, type Locale } from "@/i18n/config";

export const runtime = "nodejs";
export const size = {
  width: 1200,
  height: 630,
};
export const contentType = "image/png";

interface Props {
  params: Promise<{ locale: string }>;
}

export default async function Image({ params }: Props) {
  const { locale } = await params;
  const typedLocale: Locale = isLocale(locale) ? locale : "en";
  const dict = getDictionary(typedLocale);
  const isVietnamese = typedLocale === "vi";

  const gradient = isVietnamese
    ? "linear-gradient(130deg, #0f172a 0%, #052e16 48%, #042f2e 100%)"
    : "linear-gradient(130deg, #0f172a 0%, #1e1b4b 50%, #1f2937 100%)";
  const accent = isVietnamese ? "#34d399" : "#a78bfa";
  const softAccent = isVietnamese
    ? "rgba(52, 211, 153, 0.16)"
    : "rgba(167, 139, 250, 0.18)";
  const localeLabel = isVietnamese ? "🇻🇳 VI" : "🏴󠁧󠁢󠁥󠁮󠁧󠁿 EN";

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          background: gradient,
          color: "#f8fafc",
          padding: "56px",
          fontFamily: "Inter, sans-serif",
          position: "relative",
          overflow: "hidden",
        }}
      >
        <div
          style={{
            position: "absolute",
            right: "-130px",
            top: "-90px",
            width: "360px",
            height: "360px",
            borderRadius: "999px",
            background: softAccent,
            border: `1px solid ${accent}40`,
          }}
        />
        <div
          style={{
            position: "absolute",
            left: "-120px",
            bottom: "-170px",
            width: "420px",
            height: "420px",
            borderRadius: "999px",
            background: isVietnamese
              ? "rgba(20, 184, 166, 0.12)"
              : "rgba(59, 130, 246, 0.11)",
            border: "1px solid rgba(255,255,255,0.09)",
          }}
        />
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            position: "relative",
          }}
        >
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "12px",
              fontSize: 30,
              color: "#93c5fd",
            }}
          >
            <span>{"</>"}</span>
            <span>henry.dev</span>
          </div>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "10px",
              border: "1px solid rgba(148, 163, 184, 0.4)",
              borderRadius: 999,
              padding: "8px 16px",
              fontSize: 22,
              color: "#cbd5e1",
              background: "rgba(15, 23, 42, 0.4)",
            }}
          >
            {typedLocale.toUpperCase()} · {localeLabel}
          </div>
        </div>

        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: "18px",
            position: "relative",
          }}
        >
          <div
            style={{
              fontSize: 64,
              fontWeight: 700,
              letterSpacing: "-0.03em",
              lineHeight: 1.1,
              maxWidth: "90%",
            }}
          >
            {dict.metadata.siteTitle}
          </div>
          <div
            style={{
              fontSize: 29,
              color: "#cbd5e1",
              lineHeight: 1.35,
              maxWidth: "88%",
            }}
          >
            {dict.metadata.siteDescription}
          </div>
        </div>

        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            fontSize: 23,
            color: "#94a3b8",
            position: "relative",
          }}
        >
          <span>TypeScript • React • Next.js</span>
          <span>habui.click/{typedLocale}</span>
        </div>
      </div>
    ),
    size
  );
}
