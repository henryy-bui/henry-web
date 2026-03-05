import type { Metadata } from "next";
import { getAllPosts } from "@/lib/blog";
import BlogClient from "./BlogClient";
import styles from "./page.module.css";

export const metadata: Metadata = {
  title: "Blog",
  description:
    "Collected thoughts on systems design, TypeScript, and engineering culture.",
};

export default async function BlogPage() {
  const posts = await getAllPosts();
  const allTags = [...new Set(posts.flatMap((p) => p.tags))].sort();

  return (
    <div className="section">
      <div className="container">
        <div className={styles.header}>
          <h1 className={styles.title}>Writing</h1>
          <p className={styles.subtitle}>
            {posts.length} articles on systems, TypeScript, and engineering
            craft.
          </p>
        </div>
        <BlogClient posts={posts} allTags={allTags} />
      </div>
    </div>
  );
}
