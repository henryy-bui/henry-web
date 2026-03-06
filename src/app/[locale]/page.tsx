import Link from "next/link";
import type { Metadata } from "next";
import {
  ArrowRight,
  ExternalLink,
  Zap,
  MonitorPlay,
  Layers,
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

const TECH_STACK = [
  { name: "TypeScript", icon: "x", color: "#3178c6" },
  { name: "React", icon: "x", color: "#61dafb" },
  { name: "Next.js", icon: "x", color: "#ffffff" },
  { name: "Tailwind CSS", icon: "x", color: "#38bdf8" },
  { name: "Framer Motion", icon: "x", color: "#e11d48" },
  { name: "Zustand", icon: "x", color: "#fbd38d" },
  { name: "Node.js", icon: "x", color: "#339933" },
  { name: "Figma", icon: "x", color: "#f24e1e" },
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
        ? ["ky su phan mem", "react", "next.js", "typescript", "blog cong nghe"]
        : [
            "software engineer",
            "react",
            "next.js",
            "typescript",
            "engineering blog",
          ],
    imagePath: `/${typedLocale}/opengraph-image`,
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
    name: "Henry",
    url: getLocalizedUrl(typedLocale, "/"),
    inLanguage: typedLocale,
    jobTitle: dict.metadata.siteTitle,
    sameAs: [
      "https://github.com/henryy-bui",
      "https://www.facebook.com/iamhabv/",
      "https://www.linkedin.com/in/henryy-bui/",
    ],
  };

  const focusIcons = [MonitorPlay, Layers, Zap];

  return (
    <div>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <section className={styles.hero}>
        <div className="container">
          <div className={styles.heroBadge + " animate-fade-in-up delay-1"}>
            <span className={styles.dot} />
            {dict.home.badge}
          </div>
          <h1 className={styles.heroTitle + " animate-fade-in-up delay-2"}>
            {dict.home.titleLine1}
            <br />
            <span className={styles.heroGradient}>
              {dict.home.titleHighlight}
            </span>
          </h1>
          <p className={styles.heroSubtitle + " animate-fade-in-up delay-3"}>
            {dict.home.subtitle}
          </p>
          <div className={styles.heroActions + " animate-fade-in-up delay-4"}>
            <Link
              href={`/${typedLocale}/projects`}
              className={styles.btnPrimary}
            >
              {dict.home.ctaProjects} <ArrowRight size={16} />
            </Link>
            <Link href={`/${typedLocale}/blog`} className={styles.btnSecondary}>
              {dict.home.ctaBlog}
            </Link>
          </div>
          <div className={styles.heroSocial + " animate-fade-in-up delay-5"}>
            <a
              href="https://github.com/henryy-bui"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="GitHub"
            >
              <Github size={20} />
            </a>
            <a
              href="https://www.facebook.com/iamhabv/"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Facebook"
            >
              <Facebook size={20} />
            </a>
            <a
              href="https://www.linkedin.com/in/henryy-bui/"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="LinkedIn"
            >
              <Linkedin size={20} />
            </a>
          </div>
        </div>
      </section>

      <section className={styles.techSection}>
        <div className="container">
          <p className={styles.techLabel}>{dict.home.techLabel}</p>
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

      <section className={`${styles.focusSection} section`}>
        <div className="container">
          <div className={styles.sectionHeader}>
            <h2 className={styles.sectionTitle}>{dict.home.focusTitle}</h2>
          </div>
          <div className={styles.focusGrid}>
            {dict.home.focusAreas.map(({ title, description }, idx) => {
              const Icon = focusIcons[idx] ?? Zap;
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

      <section className={`${styles.featuredSection} section`}>
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
        <section className={`${styles.postsSection} section`}>
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
