import fs from "fs";
import path from "path";
import matter from "gray-matter";
import { unified } from "unified";
import remarkParse from "remark-parse";
import remarkGfm from "remark-gfm";
import remarkRehype from "remark-rehype";
import rehypePrism from "rehype-prism-plus";
import rehypeStringify from "rehype-stringify";

const POSTS_DIR = path.join(process.cwd(), "src/content/blog");

export interface BlogPost {
  slug: string;
  title: string;
  date: string;
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

export async function getAllPosts(): Promise<BlogPostMeta[]> {
  if (!fs.existsSync(POSTS_DIR)) return [];

  const files = fs
    .readdirSync(POSTS_DIR)
    .filter((f) => f.endsWith(".md") || f.endsWith(".mdx"));

  const posts = files.map((filename) => {
    const slug = filename.replace(/\.(md|mdx)$/, "");
    const filePath = path.join(POSTS_DIR, filename);
    const raw = fs.readFileSync(filePath, "utf-8");
    const { data, content } = matter(raw);

    return {
      slug,
      title: data.title as string,
      date: data.date as string,
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

export async function getPostBySlug(slug: string): Promise<BlogPost | null> {
  const filePath = path.join(POSTS_DIR, `${slug}.md`);
  const mdxPath = path.join(POSTS_DIR, `${slug}.mdx`);
  const resolvedPath = fs.existsSync(filePath)
    ? filePath
    : fs.existsSync(mdxPath)
      ? mdxPath
      : null;

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

  return {
    slug,
    title: data.title as string,
    date: data.date as string,
    description: data.description as string,
    tags: (data.tags as string[]) || [],
    readingTime: estimateReadingTime(content),
    content: processedContent.toString(),
    draft: data.draft ?? false,
  };
}
