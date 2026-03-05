"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import { Search, Tag, Clock, ArrowRight } from "lucide-react";
import type { BlogPostMeta } from "@/lib/blog";
import styles from "./BlogClient.module.css";

interface BlogClientProps {
  posts: BlogPostMeta[];
  allTags: string[];
}

export default function BlogClient({ posts, allTags }: BlogClientProps) {
  const [search, setSearch] = useState("");
  const [activeTag, setActiveTag] = useState<string | null>(null);

  const filtered = useMemo(() => {
    return posts.filter((post) => {
      const matchesSearch =
        !search ||
        post.title.toLowerCase().includes(search.toLowerCase()) ||
        post.description.toLowerCase().includes(search.toLowerCase());
      const matchesTag = !activeTag || post.tags.includes(activeTag);
      return matchesSearch && matchesTag;
    });
  }, [posts, search, activeTag]);

  return (
    <div>
      <div className={styles.controls}>
        <div className={styles.searchWrapper}>
          <Search size={16} className={styles.searchIcon} />
          <input
            type="search"
            placeholder="Search articles..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className={styles.searchInput}
            aria-label="Search articles"
          />
        </div>
        <div className={styles.tags}>
          <button
            className={`${styles.tagBtn} ${!activeTag ? styles.tagActive : ""}`}
            onClick={() => setActiveTag(null)}
          >
            All
          </button>
          {allTags.map((tag) => (
            <button
              key={tag}
              className={`${styles.tagBtn} ${activeTag === tag ? styles.tagActive : ""}`}
              onClick={() => setActiveTag(activeTag === tag ? null : tag)}
            >
              {tag}
            </button>
          ))}
        </div>
      </div>

      {filtered.length === 0 ? (
        <div className={styles.empty}>
          <p>No articles match your search.</p>
          <button
            onClick={() => {
              setSearch("");
              setActiveTag(null);
            }}
            className={styles.clearBtn}
          >
            Clear filters
          </button>
        </div>
      ) : (
        <div className={styles.postGrid}>
          {filtered.map((post) => (
            <Link
              key={post.slug}
              href={`/blog/${post.slug}`}
              className={styles.postCard}
            >
              <div className={styles.cardMeta}>
                <time className={styles.date}>
                  {new Date(post.date).toLocaleDateString("en-US", {
                    month: "long",
                    day: "numeric",
                    year: "numeric",
                  })}
                </time>
                <span className={styles.readingTime}>
                  <Clock size={12} />
                  {post.readingTime} min
                </span>
              </div>
              <h2 className={styles.postTitle}>{post.title}</h2>
              <p className={styles.postExcerpt}>{post.description}</p>
              <div className={styles.cardFooter}>
                <div className={styles.postTags}>
                  {post.tags.slice(0, 3).map((tag) => (
                    <span key={tag} className={styles.tagChip}>
                      <Tag size={10} />
                      {tag}
                    </span>
                  ))}
                </div>
                <span className={styles.readMore}>
                  Read <ArrowRight size={13} />
                </span>
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}
