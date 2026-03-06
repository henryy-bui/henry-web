import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, Clock, Tag, Calendar } from "lucide-react";
import { getAllPosts, getPostBySlug } from "@/lib/blog";
import BlogContent from "@/components/BlogContent";
import { getDictionary } from "@/i18n/dictionary";
import { isLocale, locales, type Locale } from "@/i18n/config";
import { getLocalizedPath, getLocalizedUrl } from "@/i18n/seo";
import { getBlogTheme } from "@/lib/blog-theme";
import styles from "../../../blog/[slug]/page.module.css";

interface Props {
  params: Promise<{ locale: string; slug: string }>;
}

export async function generateStaticParams() {
  const result: Array<{ locale: Locale; slug: string }> = [];

  for (const locale of locales) {
    const posts = await getAllPosts(locale);
    result.push(...posts.map((p) => ({ locale, slug: p.slug })));
  }

  return result;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale, slug } = await params;
  if (!isLocale(locale)) return {};

  const typedLocale = locale as Locale;

  const post = await getPostBySlug(typedLocale, slug);
  if (!post) return {};
  const theme = getBlogTheme(post.tags, typedLocale);

  const availablePosts = await Promise.all(
    locales.map(async (candidateLocale) => ({
      locale: candidateLocale,
      post: await getPostBySlug(candidateLocale, slug),
    }))
  );

  const alternatesLanguages = Object.fromEntries(
    availablePosts
      .filter((entry) => Boolean(entry.post))
      .map((entry) => [
        entry.locale,
        getLocalizedPath(entry.locale, `/blog/${slug}`),
      ])
  ) as Record<string, string>;

  alternatesLanguages["x-default"] = getLocalizedPath("en", `/blog/${slug}`);

  return {
    title: post.title,
    description: post.description,
    keywords: post.tags,
    alternates: {
      canonical: getLocalizedPath(typedLocale, `/blog/${slug}`),
      languages: alternatesLanguages,
    },
    openGraph: {
      url: getLocalizedUrl(typedLocale, `/blog/${slug}`),
      title: post.title,
      description: post.description,
      type: "article",
      section: theme.label,
      locale: typedLocale === "vi" ? "vi_VN" : "en_US",
      publishedTime: post.date,
      modifiedTime: post.date,
      tags: post.tags,
      authors: ["Henry"],
      images: [
        {
          url: getLocalizedUrl(typedLocale, `/blog/${slug}/opengraph-image`),
          width: 1200,
          height: 630,
          alt:
            typedLocale === "vi"
              ? `Bài viết: ${post.title}`
              : `Article: ${post.title}`,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: post.title,
      description: post.description,
      images: [
        {
          url: getLocalizedUrl(typedLocale, `/blog/${slug}/opengraph-image`),
          alt:
            typedLocale === "vi"
              ? `Ảnh chia sẻ cho bài viết ${post.title}`
              : `Social share image for article ${post.title}`,
        },
      ],
    },
  };
}

export default async function BlogPostPage({ params }: Props) {
  const { locale, slug } = await params;
  if (!isLocale(locale)) notFound();

  const typedLocale = locale as Locale;
  const dict = getDictionary(typedLocale);
  const post = await getPostBySlug(typedLocale, slug);
  if (!post) notFound();

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: post.title,
    inLanguage: typedLocale,
    mainEntityOfPage: getLocalizedUrl(typedLocale, `/blog/${slug}`),
    datePublished: new Date(post.date).toISOString(),
    dateModified: new Date(post.date).toISOString(),
    description: post.description,
    keywords: post.tags.join(", "),
    author: [
      {
        "@type": "Person",
        name: "Henry",
        url: "https://habui.click/",
      },
    ],
  };

  return (
    <article
      className={`section ${typedLocale === "vi" ? styles.localeVi : ""}`}
    >
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <div className="container">
        <Link href={`/${typedLocale}/blog`} className={styles.back}>
          <ArrowLeft size={16} /> {dict.blog.backToBlog}
        </Link>

        <header className={styles.header}>
          <div className={styles.postMeta}>
            <span className={styles.metaItem}>
              <Calendar size={13} />
              {post.formattedDate}
            </span>
            <span className={styles.metaItem}>
              <Clock size={13} />
              {post.readingTime} {dict.common.minRead}
            </span>
          </div>

          <h1 className={styles.title}>{post.title}</h1>
          <p className={styles.description}>{post.description}</p>

          <div className={styles.tags}>
            {post.tags.map((tag) => (
              <span key={tag} className={styles.tag}>
                <Tag size={11} />
                {tag}
              </span>
            ))}
          </div>
        </header>

        <hr className={styles.divider} />

        <BlogContent
          html={post.content}
          copyLabel={dict.blog.copyCode}
          copiedLabel={dict.blog.copiedCode}
        />

        <hr className={styles.divider} />

        <footer className={styles.footer}>
          <p className={styles.footerText}>
            {dict.blog.usefulText}{" "}
            <a
              href="https://twitter.com"
              target="_blank"
              rel="noopener noreferrer"
            >
              {dict.blog.onTwitter}
            </a>
            .
          </p>
          <Link href={`/${typedLocale}/blog`} className={styles.backLink}>
            <ArrowLeft size={14} /> {dict.blog.allArticles}
          </Link>
        </footer>
      </div>
    </article>
  );
}
