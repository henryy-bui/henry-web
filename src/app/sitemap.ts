import { MetadataRoute } from "next";
import { getAllPosts } from "@/lib/blog";
import { locales } from "@/i18n/config";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = "https://habui.click";

  const staticRoutes = ["", "/blog", "/projects", "/experience"];
  const routes: MetadataRoute.Sitemap = [];

  for (const locale of locales) {
    routes.push(
      ...staticRoutes.map((route) => ({
        url: `${baseUrl}/${locale}${route}`,
        lastModified: new Date().toISOString(),
        changeFrequency: "weekly" as const,
        priority: route === "" ? 1 : 0.8,
      }))
    );

    const posts = await getAllPosts(locale);
    routes.push(
      ...posts.map((post) => ({
        url: `${baseUrl}/${locale}/blog/${post.slug}`,
        lastModified: new Date(post.date).toISOString(),
        changeFrequency: "monthly" as const,
        priority: 0.6,
      }))
    );
  }

  return routes;
}
