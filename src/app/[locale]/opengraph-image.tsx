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

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          background: "linear-gradient(135deg, #0a0a0b 0%, #111827 55%, #0f172a 100%)",
          color: "#f8fafc",
          padding: "56px",
          fontFamily: "Inter, sans-serif",
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
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
              border: "1px solid rgba(148, 163, 184, 0.4)",
              borderRadius: 999,
              padding: "8px 16px",
              fontSize: 24,
              color: "#cbd5e1",
            }}
          >
            {typedLocale.toUpperCase()}
          </div>
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: "18px" }}>
          <div
            style={{
              fontSize: 66,
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
              fontSize: 30,
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
            fontSize: 24,
            color: "#94a3b8",
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
