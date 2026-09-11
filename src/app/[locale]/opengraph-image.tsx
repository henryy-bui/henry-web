import { ImageResponse } from "next/og";
import { getDictionary } from "@/i18n/dictionary";
import { isLocale, type Locale } from "@/i18n/config";

export const runtime = "nodejs";
export const size = {
  width: 1200,
  height: 630,
};
export const contentType = "image/png";

// The ivory ground and clay accent of the site, so a shared link previews
// as the same page it opens.
const BG = "#faf9f5";
const SURFACE = "#f0eee6";
const TEXT = "#1f1e1d";
const MUTED = "#56544d";
const DIM = "#7a7770";
const BORDER = "#e2ded2";
const ACCENT = "#b8543a";

interface Props {
  params: Promise<{ locale: string }>;
}

export default async function Image({ params }: Props) {
  const { locale } = await params;
  const typedLocale: Locale = isLocale(locale) ? locale : "en";
  const dict = getDictionary(typedLocale);

  return new ImageResponse(
    <div
      style={{
        width: "100%",
        height: "100%",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        background: BG,
        color: TEXT,
        padding: "64px",
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
            fontSize: 28,
            color: MUTED,
          }}
        >
          <span style={{ color: ACCENT }}>{"</>"}</span>
          <span>habui</span>
        </div>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            background: SURFACE,
            border: `1px solid ${BORDER}`,
            borderRadius: 999,
            padding: "8px 18px",
            fontSize: 22,
            color: MUTED,
          }}
        >
          {typedLocale.toUpperCase()}
        </div>
      </div>

      <div
        style={{
          display: "flex",
          flexDirection: "column",
          gap: "20px",
        }}
      >
        <div
          style={{
            display: "flex",
            width: 56,
            height: 4,
            borderRadius: 999,
            background: ACCENT,
          }}
        />
        <div
          style={{
            fontSize: 64,
            fontWeight: 600,
            letterSpacing: "-0.02em",
            lineHeight: 1.1,
            maxWidth: "90%",
          }}
        >
          {dict.metadata.siteTitle}
        </div>
        <div
          style={{
            fontSize: 29,
            color: MUTED,
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
          color: DIM,
          borderTop: `1px solid ${BORDER}`,
          paddingTop: "26px",
        }}
      >
        <span>TypeScript • React • Next.js</span>
        <span>habui.tech/{typedLocale}</span>
      </div>
    </div>,
    size,
  );
}
