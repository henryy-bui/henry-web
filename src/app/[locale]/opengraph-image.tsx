import { ImageResponse } from "next/og";
import { getDictionary } from "@/i18n/dictionary";
import { isLocale, type Locale } from "@/i18n/config";

export const runtime = "nodejs";
export const size = {
  width: 1200,
  height: 630,
};
export const contentType = "image/png";

// One neutral palette, no per-locale hue — the card matches the site's
// monochrome dark theme.
const BG = "#0c0c0d";
const TEXT = "#ededee";
const MUTED = "#9c9ca2";
const DIM = "#6a6a70";
const BORDER = "#262629";

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
            <span>{"</>"}</span>
            <span>habui.click</span>
          </div>
          <div
            style={{
              display: "flex",
              alignItems: "center",
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
              fontSize: 64,
              fontWeight: 600,
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
          <span>habui.click/{typedLocale}</span>
        </div>
      </div>
    ),
    size
  );
}
