import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, Clock, Tag, Calendar } from "lucide-react";
import { getAllPosts, getPostBySlug } from "@/lib/blog";
import styles from "./page.module.css";

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  const posts = await getAllPosts();
  return posts.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const post = await getPostBySlug(slug);
  if (!post) return {};
  return {
    title: post.title,
    description: post.description,
    openGraph: {
      title: post.title,
      description: post.description,
      type: "article",
      publishedTime: post.date,
    },
  };
}

export default async function BlogPostPage({ params }: Props) {
  const { slug } = await params;
  const post = await getPostBySlug(slug);
  if (!post) notFound();

  return (
    <article className="section">
      <div className="container">
        <Link href="/blog" className={styles.back}>
          <ArrowLeft size={16} /> Back to blog
        </Link>

        <header className={styles.header}>
          <div className={styles.postMeta}>
            <span className={styles.metaItem}>
              <Calendar size={13} />
              {new Date(post.date).toLocaleDateString("en-US", {
                month: "long",
                day: "numeric",
                year: "numeric",
              })}
            </span>
            <span className={styles.metaItem}>
              <Clock size={13} />
              {post.readingTime} min read
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

        <div
          className={`prose ${styles.content}`}
          dangerouslySetInnerHTML={{ __html: post.content }}
        />

        <hr className={styles.divider} />

        <footer className={styles.footer}>
          <p className={styles.footerText}>
            Found this useful? Share it or{" "}
            <a
              href="https://twitter.com"
              target="_blank"
              rel="noopener noreferrer"
            >
              let me know on Twitter
            </a>
            .
          </p>
          <Link href="/blog" className={styles.backLink}>
            <ArrowLeft size={14} /> All articles
          </Link>
        </footer>
      </div>
    </article>
  );
}
