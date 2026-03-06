import type { Metadata } from "next";
import { ExternalLink, ArrowUpRight } from "lucide-react";
import { notFound } from "next/navigation";
import Github from "@/components/icons/Github";
import { getProjects } from "@/data/projects";
import { getDictionary } from "@/i18n/dictionary";
import { isLocale, type Locale } from "@/i18n/config";
import { buildLocalizedMetadata } from "@/i18n/seo";
import styles from "../../projects/page.module.css";

interface PageProps {
  params: Promise<{ locale: string }>;
}

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { locale } = await params;
  if (!isLocale(locale)) return {};
  const dict = getDictionary(locale as Locale);

  return buildLocalizedMetadata({
    locale: locale as Locale,
    path: "/projects",
    title: dict.projects.metadataTitle,
    description: dict.projects.metadataDescription,
    keywords:
      locale === "vi"
        ? ["du an phan mem", "ma nguon mo", "react"]
        : ["software projects", "open source", "react"],
    imagePath: `/${locale}/opengraph-image`,
    imageAlt:
      locale === "vi"
        ? "Các dự án nổi bật của Henry, gồm sản phẩm mã nguồn mở và dự án production"
        : "Featured projects by Henry, including open-source tools and production systems",
  });
}

export default async function ProjectsPage({ params }: PageProps) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();

  const typedLocale = locale as Locale;
  const dict = getDictionary(typedLocale);
  const projects = getProjects(typedLocale);
  const featured = projects.filter((p) => p.featured);
  const others = projects.filter((p) => !p.featured);

  return (
    <div className="section">
      <div className="container">
        <div className={styles.header}>
          <h1 className={styles.title}>{dict.projects.title}</h1>
          <p className={styles.subtitle}>{dict.projects.subtitle}</p>
        </div>

        <section className={styles.featuredSection}>
          <h2 className={styles.sectionLabel}>{dict.projects.featured}</h2>
          <div className={styles.featuredGrid}>
            {featured.map((project, i) => (
              <article
                key={project.slug}
                className={`${styles.featuredCard} ${
                  i === 0 ? styles.wide : ""
                }`}
              >
                <div className={styles.cardTop}>
                  <div className={styles.cardMeta}>
                    <span className={styles.year}>{project.year}</span>
                    <span
                      className={`${styles.status} ${styles[project.status]}`}
                    >
                      {dict.common.status[project.status]}
                    </span>
                  </div>
                  <div className={styles.cardActions}>
                    {project.github && (
                      <a
                        href={project.github}
                        target="_blank"
                        rel="noopener noreferrer"
                        className={styles.cardAction}
                        aria-label={dict.projects.ariaGithub}
                      >
                        <Github size={16} />
                      </a>
                    )}
                    {project.demo && (
                      <a
                        href={project.demo}
                        target="_blank"
                        rel="noopener noreferrer"
                        className={styles.cardAction}
                        aria-label={dict.projects.ariaDemo}
                      >
                        <ExternalLink size={16} />
                      </a>
                    )}
                  </div>
                </div>
                <h3 className={styles.cardTitle}>{project.title}</h3>
                <p className={styles.cardDesc}>{project.longDescription}</p>
                <div className={styles.techList}>
                  {project.tech.map((t) => (
                    <span key={t} className={styles.techBadge}>
                      {t}
                    </span>
                  ))}
                </div>
              </article>
            ))}
          </div>
        </section>

        <section className={styles.otherSection}>
          <h2 className={styles.sectionLabel}>{dict.projects.otherWork}</h2>
          <div className={styles.otherGrid}>
            {others.map((project) => (
              <article key={project.slug} className={styles.otherCard}>
                <div className={styles.otherHeader}>
                  <h3 className={styles.otherTitle}>{project.title}</h3>
                  <div className={styles.otherActions}>
                    {project.github && (
                      <a
                        href={project.github}
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label={dict.projects.ariaGithub}
                      >
                        <ArrowUpRight size={16} />
                      </a>
                    )}
                  </div>
                </div>
                <p className={styles.otherDesc}>{project.description}</p>
                <div className={styles.otherFooter}>
                  <div className={styles.techList}>
                    {project.tech.slice(0, 3).map((t) => (
                      <span key={t} className={styles.techBadge}>
                        {t}
                      </span>
                    ))}
                  </div>
                  <span
                    className={`${styles.statusSmall} ${
                      styles[project.status]
                    }`}
                  >
                    {dict.common.status[project.status]}
                  </span>
                </div>
              </article>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}
