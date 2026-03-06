import { MetadataRoute } from "next";
import { getAllPosts } from "@/lib/blog";
import { locales } from "@/i18n/config";
import { getLocalizedPath } from "@/i18n/seo";

const baseUrl = "https://habui.click";

function getStaticRouteSeo(route: string) {
  switch (route) {
    case "":
      return { changeFrequency: "daily" as const, priority: 1 };
    case "/blog":
      return { changeFrequency: "daily" as const, priority: 0.9 };
    case "/projects":
      return { changeFrequency: "weekly" as const, priority: 0.82 };
    case "/experience":
      return { changeFrequency: "monthly" as const, priority: 0.76 };
    default:
      return { changeFrequency: "weekly" as const, priority: 0.7 };
  }
}

function getPostPriority(date: string) {
  const ageInDays =
    (Date.now() - new Date(date).getTime()) / (1000 * 60 * 60 * 24);

  if (ageInDays <= 30) return { changeFrequency: "weekly" as const, priority: 0.8 };
  if (ageInDays <= 180) return { changeFrequency: "monthly" as const, priority: 0.68 };
  return { changeFrequency: "yearly" as const, priority: 0.54 };
}

function buildLocaleAlternates(
  path: string,
  availableLocales: ReadonlyArray<(typeof locales)[number]> = locales
) {
  const languages = Object.fromEntries(
    availableLocales.map((locale) => [
      locale,
      `${baseUrl}${getLocalizedPath(locale, path)}`,
    ])
  );

  return {
    ...languages,
    "x-default": `${baseUrl}${getLocalizedPath("en", path)}`,
  };
}

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const staticRoutes = ["", "/blog", "/projects", "/experience"];
  const routes: MetadataRoute.Sitemap = [];

  const postsByLocale = new Map(
    await Promise.all(
      locales.map(async (locale) => {
        const posts = await getAllPosts(locale);
        return [locale, posts] as const;
      })
    )
  );

  const localeBySlug = new Map<string, Set<(typeof locales)[number]>>();

  for (const locale of locales) {
    const posts = postsByLocale.get(locale) ?? [];
    for (const post of posts) {
      if (!localeBySlug.has(post.slug)) {
        localeBySlug.set(post.slug, new Set());
      }
      localeBySlug.get(post.slug)?.add(locale);
    }
  }

  for (const locale of locales) {
    routes.push(
      ...staticRoutes.map((route) => ({
        url: `${baseUrl}/${locale}${route}`,
        lastModified: new Date().toISOString(),
        ...getStaticRouteSeo(route),
        alternates: {
          languages: buildLocaleAlternates(route || "/"),
        },
      }))
    );

    const posts = postsByLocale.get(locale) ?? [];
    routes.push(
      ...posts.map((post) => ({
        url: `${baseUrl}/${locale}/blog/${post.slug}`,
        lastModified: new Date(post.date).toISOString(),
        ...getPostPriority(post.date),
        alternates: {
          languages: buildLocaleAlternates(
            `/blog/${post.slug}`,
            Array.from(localeBySlug.get(post.slug) ?? [locale])
          ),
        },
      }))
    );
  }

  return routes;
}
