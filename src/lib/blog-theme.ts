import type { Locale } from "@/i18n/config";

export type BlogCategory = "systems" | "frontend" | "typescript" | "general";

// Category drives the label only. The per-category accent, gradient, and glow
// are gone: share cards use one neutral treatment, same as the site.
export type BlogTheme = {
  category: BlogCategory;
  label: string;
};

function normalizeTag(tag: string): string {
  return tag
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "");
}

function detectCategoryFromSlug(slug?: string): BlogCategory | null {
  if (!slug) {
    return null;
  }

  const normalized = normalizeTag(slug.replace(/-/g, " "));

  const includesAny = (keywords: string[]) =>
    keywords.some((keyword) => normalized.includes(keyword));

  if (
    includesAny([
      "distributed",
      "cache",
      "caching",
      "raft",
      "system",
      "he thong",
    ])
  ) {
    return "systems";
  }

  if (includesAny(["react", "rsc", "next", "frontend", "ui", "performance"])) {
    return "frontend";
  }

  if (
    includesAny([
      "typescript",
      "type-level",
      "type level",
      "meta-programming",
      "programming",
      "kieu",
    ])
  ) {
    return "typescript";
  }

  return null;
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

export function getBlogTheme(
  tags: string[],
  locale: Locale,
  slug?: string
): BlogTheme {
  const category = detectCategoryFromSlug(slug) ?? detectCategory(tags);

  const labelByCategory: Record<BlogCategory, Record<Locale, string>> = {
    systems: { en: "Systems", vi: "Hệ thống" },
    frontend: { en: "Frontend", vi: "Frontend" },
    typescript: { en: "TypeScript", vi: "TypeScript" },
    general: { en: "Engineering", vi: "Kỹ thuật" },
  };

  return {
    category,
    label: labelByCategory[category][locale],
  };
}
