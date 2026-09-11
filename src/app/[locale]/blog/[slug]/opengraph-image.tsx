import { ImageResponse } from "next/og";
import { getPostBySlug } from "@/lib/blog";
import { isLocale, type Locale } from "@/i18n/config";
import { getBlogTheme } from "@/lib/blog-theme";

export const runtime = "nodejs";
export const size = {
  width: 1200,
  height: 630,
};
export const contentType = "image/png";

// Same neutral palette as the site-level card.
const BG = "#faf9f5";
const SURFACE = "#f0eee6";
const TEXT = "#1f1e1d";
const MUTED = "#56544d";
const DIM = "#7a7770";
const BORDER = "#e2ded2";
const ACCENT = "#b8543a";

interface Props {
  params: Promise<{ locale: string; slug: string }>;
}

function trimTitle(title: string, max = 90) {
  if (title.length <= max) {
    return title;
  }

  return `${title.slice(0, max - 1)}...`;
}

function splitTitleIntoLines(title: string): string[] {
  const words = title.trim().split(/\s+/);
  if (words.length <= 4) {
    return [title];
  }

  const midpoint = Math.ceil(words.length / 2);
  const line1 = words.slice(0, midpoint).join(" ");
  const line2 = words.slice(midpoint).join(" ");

  if (line1.length > 44 && words.length >= 6) {
    const rebalancePoint = Math.max(3, Math.floor(words.length * 0.45));
    return [
      words.slice(0, rebalancePoint).join(" "),
      words.slice(rebalancePoint).join(" "),
    ];
  }

  return [line1, line2];
}

function getTitleFontSize(titleLength: number): number {
  if (titleLength <= 45) return 62;
  if (titleLength <= 70) return 56;
  return 50;
}

export default async function Image({ params }: Props) {
  const { locale, slug } = await params;
  const typedLocale: Locale = isLocale(locale) ? locale : "en";
  const post = await getPostBySlug(typedLocale, slug);

  const title = post ? trimTitle(post.title, 92) : "Blog Post";
  const titleLines = splitTitleIntoLines(title);
  const titleFontSize = getTitleFontSize(title.length);
  const description =
    post?.description ??
    "Engineering notes on systems and frontend architecture.";
  const tags = post?.tags?.slice(0, 3) ?? [];
  const theme = getBlogTheme(tags, typedLocale, slug);
  const localeLabel = typedLocale === "vi" ? "Bài Viết" : "Article";

  const chipStyle = {
    display: "flex",
    alignItems: "center",
    fontSize: 22,
    color: MUTED,
    background: SURFACE,
    border: `1px solid ${BORDER}`,
    borderRadius: 999,
    padding: "8px 16px",
  } as const;

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
        padding: "60px",
        fontFamily: "Inter, sans-serif",
      }}
    >
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <div
          style={{
            ...chipStyle,
            fontSize: 24,
            color: ACCENT,
            borderColor: "transparent",
          }}
        >
          {typedLocale.toUpperCase()} · {localeLabel}
        </div>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            fontSize: 22,
            color: DIM,
          }}
        >
          habui.tech/{typedLocale}/blog/{slug}
        </div>
      </div>

      <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
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
            display: "flex",
            flexDirection: "column",
            gap: 6,
            fontSize: titleFontSize,
            fontWeight: 600,
            lineHeight: 1.12,
            letterSpacing: "-0.02em",
            maxWidth: "95%",
          }}
        >
          {titleLines.map((line, index) => (
            <div key={`${index}-${line}`} style={{ display: "flex" }}>
              {line}
            </div>
          ))}
        </div>
        <div
          style={{
            fontSize: 28,
            lineHeight: 1.35,
            color: MUTED,
            maxWidth: "92%",
          }}
        >
          {description}
        </div>
      </div>

      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          borderTop: `1px solid ${BORDER}`,
          paddingTop: "26px",
        }}
      >
        <div style={{ display: "flex", gap: 10 }}>
          <div style={chipStyle}>{theme.label}</div>
          {tags.map((tag) => (
            <div key={tag} style={chipStyle}>
              #{tag}
            </div>
          ))}
        </div>
        <div style={{ fontSize: 22, color: DIM }}>habui.tech</div>
      </div>
    </div>,
    size,
  );
}
