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

interface Props {
  params: Promise<{ locale: string; slug: string }>;
}

function trimTitle(title: string, max = 90) {
  if (title.length <= max) {
    return title;
  }

  return `${title.slice(0, max - 1)}...`;
}

export default async function Image({ params }: Props) {
  const { locale, slug } = await params;
  const typedLocale: Locale = isLocale(locale) ? locale : "en";
  const post = await getPostBySlug(typedLocale, slug);

  const title = post ? trimTitle(post.title, 92) : "Blog Post";
  const description =
    post?.description ??
    "Engineering notes on systems and frontend architecture.";
  const tags = post?.tags?.slice(0, 3) ?? [];
  const theme = getBlogTheme(tags, typedLocale);
  const accent = theme.accent;
  const localeLabel = typedLocale === "vi" ? "Bài Viết" : "Article";

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          background: theme.gradient,
          color: "#f8fafc",
          padding: "52px",
          fontFamily: "Inter, sans-serif",
          position: "relative",
          overflow: "hidden",
        }}
      >
        <div
          style={{
            position: "absolute",
            right: "-140px",
            top: "-120px",
            width: "360px",
            height: "360px",
            borderRadius: "999px",
            background: theme.glow,
            border: `1px solid ${accent}55`,
          }}
        />
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: 10,
              fontSize: 26,
              color: accent,
              border: `1px solid ${accent}66`,
              borderRadius: 999,
              padding: "8px 16px",
              background: "rgba(15, 23, 42, 0.5)",
            }}
          >
            {typedLocale.toUpperCase()} BLOG · {localeLabel}
          </div>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              fontSize: 24,
              color: "#94a3b8",
            }}
          >
            habui.click/{typedLocale}/blog/{slug}
          </div>
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: 18 }}>
          <div
            style={{
              fontSize: 56,
              fontWeight: 700,
              lineHeight: 1.12,
              letterSpacing: "-0.03em",
              maxWidth: "95%",
            }}
          >
            {title}
          </div>
          <div
            style={{
              fontSize: 28,
              lineHeight: 1.35,
              color: "#cbd5e1",
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
          }}
        >
          <div style={{ display: "flex", gap: 10 }}>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                fontSize: 22,
                color: accent,
                border: `1px solid ${accent}66`,
                borderRadius: 999,
                padding: "8px 14px",
                background: "rgba(15, 23, 42, 0.45)",
              }}
            >
              {theme.label}
            </div>
            {tags.map((tag) => (
              <div
                key={tag}
                style={{
                  display: "flex",
                  alignItems: "center",
                  fontSize: 22,
                  color: accent,
                  border: `1px solid ${accent}66`,
                  borderRadius: 999,
                  padding: "8px 14px",
                  background: "rgba(15, 23, 42, 0.45)",
                }}
              >
                #{tag}
              </div>
            ))}
          </div>
          <div style={{ fontSize: 24, color: "#94a3b8" }}>henry.dev</div>
        </div>
      </div>
    ),
    size
  );
}
