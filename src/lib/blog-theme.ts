import type { Locale } from "@/i18n/config";

export type BlogCategory = "systems" | "frontend" | "typescript" | "general";

export type BlogTheme = {
  category: BlogCategory;
  accent: string;
  gradient: string;
  glow: string;
  label: string;
};

function normalizeTag(tag: string): string {
  return tag
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "");
}

function detectCategory(tags: string[]): BlogCategory {
  const normalizedTags = tags.map(normalizeTag);

  const matches = (keywords: string[]) =>
    normalizedTags.some((tag) =>
      keywords.some((keyword) => tag.includes(keyword))
    );

  if (
    matches([
      "distributed",
      "he thong phan tan",
      "caching",
      "bo nho dem",
      "raft",
      "system",
      "infrastructure",
    ])
  ) {
    return "systems";
  }

  if (
    matches([
      "react",
      "next",
      "hieu nang web",
      "web performance",
      "kien truc",
      "architecture",
      "ui",
      "frontend",
    ])
  ) {
    return "frontend";
  }

  if (
    matches([
      "typescript",
      "type",
      "he thong kieu",
      "lap trinh meta",
      "meta-programming",
    ])
  ) {
    return "typescript";
  }

  return "general";
}

export function getBlogTheme(tags: string[], locale: Locale): BlogTheme {
  const category = detectCategory(tags);

  const themeByCategory: Record<
    BlogCategory,
    Omit<BlogTheme, "category" | "label">
  > = {
    systems: {
      accent: "#34d399",
      gradient:
        "linear-gradient(145deg, #041015 0%, #052e16 48%, #042f2e 100%)",
      glow: "rgba(52, 211, 153, 0.18)",
    },
    frontend: {
      accent: "#60a5fa",
      gradient:
        "linear-gradient(145deg, #0b1120 0%, #0f172a 48%, #1e3a8a 100%)",
      glow: "rgba(96, 165, 250, 0.18)",
    },
    typescript: {
      accent: "#a78bfa",
      gradient:
        "linear-gradient(145deg, #1a1330 0%, #1e1b4b 48%, #312e81 100%)",
      glow: "rgba(167, 139, 250, 0.2)",
    },
    general: {
      accent: "#f59e0b",
      gradient:
        "linear-gradient(145deg, #1f1505 0%, #3b2f12 48%, #1f2937 100%)",
      glow: "rgba(245, 158, 11, 0.18)",
    },
  };

  const labelByCategory: Record<BlogCategory, Record<Locale, string>> = {
    systems: { en: "Systems", vi: "Hệ thống" },
    frontend: { en: "Frontend", vi: "Frontend" },
    typescript: { en: "TypeScript", vi: "TypeScript" },
    general: { en: "Engineering", vi: "Kỹ thuật" },
  };

  return {
    category,
    ...themeByCategory[category],
    label: labelByCategory[category][locale],
  };
}
