import fs from "fs";
import path from "path";
import matter from "gray-matter";
import { unified } from "unified";
import remarkParse from "remark-parse";
import remarkGfm from "remark-gfm";
import remarkRehype from "remark-rehype";
import rehypePrism from "rehype-prism-plus";
import rehypeStringify from "rehype-stringify";
import { defaultLocale, type Locale } from "@/i18n/config";

const POSTS_DIR = path.join(process.cwd(), "src/content/blog");

export interface BlogPost {
  slug: string;
  title: string;
  date: string;
  formattedDate: string;
  formattedDateShort: string;
  description: string;
  tags: string[];
  readingTime: number;
  content: string;
  draft?: boolean;
}

export interface BlogPostMeta extends Omit<BlogPost, "content"> {
  content?: never;
}

function estimateReadingTime(text: string): number {
  const wordsPerMinute = 200;
  const words = text.trim().split(/\s+/).length;
  return Math.ceil(words / wordsPerMinute);
}

function getPostsDirForLocale(locale: Locale): string {
  return path.join(POSTS_DIR, locale);
}

function resolveLocaleDir(locale: Locale): string {
  const localeDir = getPostsDirForLocale(locale);
  if (fs.existsSync(localeDir)) return localeDir;

  const defaultLocaleDir = getPostsDirForLocale(defaultLocale);
  if (fs.existsSync(defaultLocaleDir)) return defaultLocaleDir;

  return POSTS_DIR;
}

function formatDate(dateStr: string, locale: Locale, short = false): string {
  const dateObj = new Date(dateStr);
  const localeCode = locale === "vi" ? "vi-VN" : "en-US";

  return dateObj.toLocaleDateString(localeCode, {
    month: short ? "short" : "long",
    day: "numeric",
    year: "numeric",
    timeZone: "UTC",
  });
}

export async function getAllPosts(locale: Locale): Promise<BlogPostMeta[]> {
  const localeDir = resolveLocaleDir(locale);
  if (!fs.existsSync(localeDir)) return [];

  const files = fs
    .readdirSync(localeDir)
    .filter((f) => f.endsWith(".md") || f.endsWith(".mdx"));

  const posts = files.map((filename) => {
    const slug = filename.replace(/\.(md|mdx)$/, "");
    const filePath = path.join(localeDir, filename);
    const raw = fs.readFileSync(filePath, "utf-8");
    const { data, content } = matter(raw);

    const dateStr = data.date as string;

    return {
      slug,
      title: data.title as string,
      date: dateStr,
      formattedDate: formatDate(dateStr, locale),
      formattedDateShort: formatDate(dateStr, locale, true),
      description: data.description as string,
      tags: (data.tags as string[]) || [],
      readingTime: estimateReadingTime(content),
      draft: data.draft ?? false,
    };
  });

  return posts
    .filter((p) => !p.draft)
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
}

export async function getPostBySlug(
  locale: Locale,
  slug: string
): Promise<BlogPost | null> {
  const dirCandidates = [
    resolveLocaleDir(locale),
    resolveLocaleDir(defaultLocale),
  ];

  let resolvedPath: string | null = null;

  for (const dir of dirCandidates) {
    const filePath = path.join(dir, `${slug}.md`);
    const mdxPath = path.join(dir, `${slug}.mdx`);

    if (fs.existsSync(filePath)) {
      resolvedPath = filePath;
      break;
    }

    if (fs.existsSync(mdxPath)) {
      resolvedPath = mdxPath;
      break;
    }
  }

  if (!resolvedPath) return null;

  const raw = fs.readFileSync(resolvedPath, "utf-8");
  const { data, content } = matter(raw);

  const processedContent = await unified()
    .use(remarkParse)
    .use(remarkGfm)
    .use(remarkRehype)
    .use(rehypePrism)
    .use(rehypeStringify)
    .process(content);

  const dateStr = data.date as string;

  return {
    slug,
    title: data.title as string,
    date: dateStr,
    formattedDate: formatDate(dateStr, locale),
    formattedDateShort: formatDate(dateStr, locale, true),
    description: data.description as string,
    tags: (data.tags as string[]) || [],
    readingTime: estimateReadingTime(content),
    content: processedContent.toString(),
    draft: data.draft ?? false,
  };
}
