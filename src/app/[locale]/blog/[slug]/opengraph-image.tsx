import { ImageResponse } from "next/og";
import { getPostBySlug } from "@/lib/blog";
import { isLocale, type Locale } from "@/i18n/config";

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
  const description = post?.description ?? "Engineering notes on systems and frontend architecture.";
  const tags = post?.tags?.slice(0, 3) ?? [];

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          background: "linear-gradient(145deg, #020617 0%, #111827 50%, #1e1b4b 100%)",
          color: "#f8fafc",
          padding: "52px",
          fontFamily: "Inter, sans-serif",
        }}
      >
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <div
            style={{
              fontSize: 26,
              color: "#c4b5fd",
              border: "1px solid rgba(196, 181, 253, 0.4)",
              borderRadius: 999,
              padding: "8px 16px",
            }}
          >
            {typedLocale.toUpperCase()} BLOG
          </div>
          <div style={{ fontSize: 24, color: "#94a3b8" }}>habui.click/{typedLocale}/blog/{slug}</div>
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: 18 }}>
          <div style={{ fontSize: 56, fontWeight: 700, lineHeight: 1.12, letterSpacing: "-0.03em" }}>
            {title}
          </div>
          <div style={{ fontSize: 28, lineHeight: 1.35, color: "#cbd5e1", maxWidth: "92%" }}>
            {description}
          </div>
        </div>

        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <div style={{ display: "flex", gap: 10 }}>
            {tags.map((tag) => (
              <div
                key={tag}
                style={{
                  fontSize: 22,
                  color: "#a5b4fc",
                  border: "1px solid rgba(165, 180, 252, 0.35)",
                  borderRadius: 999,
                  padding: "8px 14px",
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
