import Link from "next/link";
import {
  ArrowRight,
  Github,
  Twitter,
  Linkedin,
  ExternalLink,
  Code2,
  Server,
  Zap,
} from "lucide-react";
import { getAllPosts } from "@/lib/blog";
import { projects } from "@/data/projects";
import styles from "./page.module.css";

const TECH_STACK = [
  { name: "TypeScript", icon: "⬡", color: "#3178c6" },
  { name: "Go", icon: "⬡", color: "#00add8" },
  { name: "React", icon: "⬡", color: "#61dafb" },
  { name: "Next.js", icon: "⬡", color: "#ffffff" },
  { name: "PostgreSQL", icon: "⬡", color: "#336791" },
  { name: "Rust", icon: "⬡", color: "#ce412b" },
  { name: "Kafka", icon: "⬡", color: "#231f20" },
  { name: "Docker", icon: "⬡", color: "#2496ed" },
];

const FOCUS_AREAS = [
  {
    icon: Server,
    title: "Distributed Systems",
    description:
      "Designing reliable, scalable backends with a focus on consistency and fault tolerance.",
  },
  {
    icon: Code2,
    title: "Developer Experience",
    description:
      "Building tools, libraries, and APIs that make engineers more productive.",
  },
  {
    icon: Zap,
    title: "Performance Engineering",
    description:
      "Profiling, benchmarking, and optimizing systems at the millisecond level.",
  },
];

export default async function HomePage() {
  const posts = await getAllPosts();
  const featuredProjects = projects.filter((p) => p.featured).slice(0, 3);
  const recentPosts = posts.slice(0, 3);

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Person",
    name: "Henry",
    url: "https://habui.click/",
    jobTitle: "Software Engineer",
    sameAs: [
      "https://github.com",
      "https://twitter.com",
      "https://linkedin.com",
    ],
  };

  return (
    <div>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      {/* Hero */}
      <section className={styles.hero}>
        <div className="container">
          <div className={styles.heroBadge + " animate-fade-in-up delay-1"}>
            <span className={styles.dot} />
            Available for senior roles
          </div>
          <h1 className={styles.heroTitle + " animate-fade-in-up delay-2"}>
            I build reliable
            <br />
            <span className={styles.heroGradient}>distributed systems</span>
          </h1>
          <p className={styles.heroSubtitle + " animate-fade-in-up delay-3"}>
            Software Engineer with 8+ years of experience shipping production
            systems at Stripe, Vercel, and Cloudflare. I write about systems,
            TypeScript, and engineering culture.
          </p>
          <div className={styles.heroActions + " animate-fade-in-up delay-4"}>
            <Link href="/projects" className={styles.btnPrimary}>
              View my work <ArrowRight size={16} />
            </Link>
            <Link href="/blog" className={styles.btnSecondary}>
              Read blog
            </Link>
          </div>
          <div className={styles.heroSocial + " animate-fade-in-up delay-5"}>
            <a
              href="https://github.com"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="GitHub"
            >
              <Github size={20} />
            </a>
            <a
              href="https://twitter.com"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Twitter"
            >
              <Twitter size={20} />
            </a>
            <a
              href="https://linkedin.com"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="LinkedIn"
            >
              <Linkedin size={20} />
            </a>
          </div>
        </div>
      </section>

      {/* Tech Stack */}
      <section className={styles.techSection}>
        <div className="container">
          <p className={styles.techLabel}>Technologies I work with</p>
          <div className={styles.techGrid}>
            {TECH_STACK.map((tech) => (
              <div key={tech.name} className={styles.techPill}>
                <span
                  className={styles.techDot}
                  style={{ background: tech.color }}
                />
                {tech.name}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Focus Areas */}
      <section className={`${styles.focusSection} section`}>
        <div className="container">
          <div className={styles.sectionHeader}>
            <h2 className={styles.sectionTitle}>What I focus on</h2>
          </div>
          <div className={styles.focusGrid}>
            {FOCUS_AREAS.map(({ icon: Icon, title, description }) => (
              <div key={title} className={styles.focusCard}>
                <div className={styles.focusIcon}>
                  <Icon size={22} />
                </div>
                <h3>{title}</h3>
                <p>{description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Projects */}
      <section className={`${styles.featuredSection} section`}>
        <div className="container">
          <div className={styles.sectionHeader}>
            <h2 className={styles.sectionTitle}>Featured Projects</h2>
            <Link href="/projects" className={styles.seeAll}>
              See all <ArrowRight size={14} />
            </Link>
          </div>
          <div className={styles.projectGrid}>
            {featuredProjects.map((project) => (
              <article key={project.slug} className={styles.projectCard}>
                <div className={styles.projectMeta}>
                  <span className={styles.projectYear}>{project.year}</span>
                  <span
                    className={`${styles.status} ${styles[project.status]}`}
                  >
                    {project.status}
                  </span>
                </div>
                <h3 className={styles.projectTitle}>{project.title}</h3>
                <p className={styles.projectDesc}>{project.description}</p>
                <div className={styles.projectTech}>
                  {project.tech.slice(0, 4).map((t) => (
                    <span key={t} className={styles.techTag}>
                      {t}
                    </span>
                  ))}
                </div>
                <div className={styles.projectLinks}>
                  {project.github && (
                    <a
                      href={project.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={styles.projectLink}
                    >
                      <Github size={14} /> Code
                    </a>
                  )}
                  {project.demo && (
                    <a
                      href={project.demo}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={styles.projectLink}
                    >
                      <ExternalLink size={14} /> Demo
                    </a>
                  )}
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* Recent Posts */}
      {recentPosts.length > 0 && (
        <section className={`${styles.postsSection} section`}>
          <div className="container">
            <div className={styles.sectionHeader}>
              <h2 className={styles.sectionTitle}>Recent Writing</h2>
              <Link href="/blog" className={styles.seeAll}>
                All posts <ArrowRight size={14} />
              </Link>
            </div>
            <div className={styles.postList}>
              {recentPosts.map((post) => (
                <Link
                  key={post.slug}
                  href={`/blog/${post.slug}`}
                  className={styles.postItem}
                >
                  <div className={styles.postMeta}>
                    <time>{post.formattedDateShort}</time>
                    <span>{post.readingTime} min read</span>
                  </div>
                  <h3 className={styles.postTitle}>{post.title}</h3>
                  <p className={styles.postExcerpt}>{post.description}</p>
                  <div className={styles.postTags}>
                    {post.tags.slice(0, 3).map((tag) => (
                      <span key={tag} className={styles.tag}>
                        {tag}
                      </span>
                    ))}
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}
    </div>
  );
}
