import Link from "next/link";
import type { Metadata } from "next";
import {
  ArrowRight,
  ExternalLink,
  Gauge,
  Layers,
  Workflow,
} from "lucide-react";
import Github from "@/components/icons/Github";
import Linkedin from "@/components/icons/Linkedin";
import Facebook from "@/components/icons/Facebook";
import { getAllPosts } from "@/lib/blog";
import { getProjects } from "@/data/projects";
import { getDictionary } from "@/i18n/dictionary";
import { isLocale, type Locale } from "@/i18n/config";
import { buildLocalizedMetadata, getLocalizedUrl } from "@/i18n/seo";
import { notFound } from "next/navigation";
import styles from "../page.module.css";

// Kept in step with src/data/experience.ts — everything here is something
// used on a real project, grouped core / data / testing / backend-adjacent.
const TECH_STACK = [
  "TypeScript",
  "React",
  "Next.js",
  "TanStack Query",
  "Redux Toolkit",
  "Zod",
  "Jest",
  "React Testing Library",
  "Storybook",
  "Node.js",
  "NestJS",
  "Firebase",
];

interface PageProps {
  params: Promise<{ locale: string }>;
}

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { locale } = await params;
  if (!isLocale(locale)) return {};

  const typedLocale = locale as Locale;
  const dict = getDictionary(typedLocale);

  return buildLocalizedMetadata({
    locale: typedLocale,
    path: "/",
    title: dict.metadata.siteTitle,
    description: dict.metadata.siteDescription,
    keywords:
      typedLocale === "vi"
        ? ["ky su front-end", "react", "next.js", "typescript", "blog cong nghe"]
        : [
            "front-end engineer",
            "react",
            "next.js",
            "typescript",
            "engineering blog",
          ],
    imagePath: `/${typedLocale}/opengraph-image`,
    imageAlt:
      typedLocale === "vi"
        ? "Hà Bùi - Kỹ sư front-end, trang cá nhân và blog kỹ thuật"
        : "Ha Bui - Front-end engineer, portfolio and engineering blog",
  });
}

export default async function HomePage({ params }: PageProps) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();

  const typedLocale = locale as Locale;
  const dict = getDictionary(typedLocale);
  const posts = await getAllPosts(typedLocale);
  const projects = getProjects(typedLocale);
  const featuredProjects = projects.filter((p) => p.featured).slice(0, 3);
  const recentPosts = posts.slice(0, 3);

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Person",
    name: "Ha Bui",
    url: getLocalizedUrl(typedLocale, "/"),
    inLanguage: typedLocale,
    jobTitle: dict.metadata.siteTitle,
    sameAs: [
      "https://github.com/HaBuiy-bui",
      "https://www.facebook.com/iamhabv/",
      "https://www.linkedin.com/in/HaBuiy-bui/",
    ],
  };

  const focusIcons = [Layers, Workflow, Gauge];

  return (
    <div>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <section className={styles.hero}>
        <div className="container">
          <div className={styles.heroInner}>
            <div className={styles.heroBadge}>
              <span className={styles.dot} />
              {dict.home.badge}
            </div>
            <p className={styles.heroGreeting}>
              {dict.home.titleLine1}
            </p>
            <h1 className={styles.heroTitle}>
              {dict.home.titleHighlight}
            </h1>
            <p className={styles.heroSubtitle}>
              {dict.home.subtitle}
            </p>
            <div className={styles.heroActions}>
              <Link
                href={`/${typedLocale}/projects`}
                className={styles.btnPrimary}
              >
                {dict.home.ctaProjects}
                <ArrowRight size={16} />
              </Link>
              <Link
                href={`/${typedLocale}/blog`}
                className={styles.btnSecondary}
              >
                {dict.home.ctaBlog}
              </Link>
              <span className={styles.heroDivider} aria-hidden="true" />
              <div className={styles.heroSocial}>
                <a
                  href="https://github.com/HaBuiy-bui"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="GitHub"
                >
                  <Github size={18} />
                </a>
                <a
                  href="https://www.facebook.com/iamhabv/"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Facebook"
                >
                  <Facebook size={18} />
                </a>
                <a
                  href="https://www.linkedin.com/in/HaBuiy-bui/"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="LinkedIn"
                >
                  <Linkedin size={18} />
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className={styles.techSection}>
        <div className="container">
          <p className={styles.techLabel}>{dict.home.techLabel}</p>
          <div className={styles.techGrid}>
            {TECH_STACK.map((tech) => (
              <div key={tech} className={styles.techPill}>
                {tech}
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className={`${styles.focusSection} section`}>
        <div className="container">
          <div className={styles.sectionHeader}>
            <h2 className={styles.sectionTitle}>{dict.home.focusTitle}</h2>
          </div>
          <div className={styles.focusGrid}>
            {dict.home.focusAreas.map(({ title, description }, idx) => {
              const Icon = focusIcons[idx] ?? Layers;
              return (
                <div key={title} className={styles.focusCard}>
                  <div className={styles.focusIcon}>
                    <Icon size={22} />
                  </div>
                  <h3>{title}</h3>
                  <p>{description}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <div className={styles.sectionHeader}>
            <h2 className={styles.sectionTitle}>{dict.home.featuredTitle}</h2>
            <Link href={`/${typedLocale}/projects`} className={styles.seeAll}>
              {dict.home.seeAll} <ArrowRight size={14} />
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
                    {dict.common.status[project.status]}
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
                      <Github size={14} /> {dict.common.code}
                    </a>
                  )}
                  {project.demo && (
                    <a
                      href={project.demo}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={styles.projectLink}
                    >
                      <ExternalLink size={14} /> {dict.common.demo}
                    </a>
                  )}
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {recentPosts.length > 0 && (
        <section className="section">
          <div className="container">
            <div className={styles.sectionHeader}>
              <h2 className={styles.sectionTitle}>{dict.home.recentTitle}</h2>
              <Link href={`/${typedLocale}/blog`} className={styles.seeAll}>
                {dict.home.allPosts} <ArrowRight size={14} />
              </Link>
            </div>
            <div className={styles.postList}>
              {recentPosts.map((post) => (
                <Link
                  key={post.slug}
                  href={`/${typedLocale}/blog/${post.slug}`}
                  className={styles.postItem}
                >
                  <div className={styles.postMeta}>
                    <time>{post.formattedDateShort}</time>
                    <span>
                      {post.readingTime} {dict.common.minRead}
                    </span>
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
