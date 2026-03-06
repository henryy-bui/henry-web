import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getAllPosts } from "@/lib/blog";
import BlogClient from "../../blog/BlogClient";
import { getDictionary } from "@/i18n/dictionary";
import { isLocale, type Locale } from "@/i18n/config";
import styles from "../../blog/page.module.css";

interface PageProps {
  params: Promise<{ locale: string }>;
}

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { locale } = await params;
  if (!isLocale(locale)) return {};
  const dict = getDictionary(locale as Locale);

  return {
    title: dict.blog.metadataTitle,
    description: dict.blog.metadataDescription,
  };
}

export default async function BlogPage({ params }: PageProps) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();

  const typedLocale = locale as Locale;
  const dict = getDictionary(typedLocale);
  const posts = await getAllPosts(typedLocale);
  const allTags = [...new Set(posts.flatMap((p) => p.tags))].sort();
  const subtitle = dict.blog.subtitle.replace("{count}", String(posts.length));

  return (
    <div className="section">
      <div className="container">
        <div className={styles.header}>
          <h1 className={styles.title}>{dict.blog.title}</h1>
          <p className={styles.subtitle}>{subtitle}</p>
        </div>
        <BlogClient
          locale={typedLocale}
          dictionary={dict}
          posts={posts}
          allTags={allTags}
        />
      </div>
    </div>
  );
}
