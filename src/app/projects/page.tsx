import type { Metadata } from "next";
import { Github, ExternalLink, ArrowUpRight } from "lucide-react";
import { projects } from "@/data/projects";
import styles from "./page.module.css";

export const metadata: Metadata = {
  title: "Projects",
  description:
    "Open-source tools and systems I've built. From distributed caches to type-safe libraries.",
};

export default function ProjectsPage() {
  const featured = projects.filter((p) => p.featured);
  const others = projects.filter((p) => !p.featured);

  return (
    <div className="section">
      <div className="container">
        <div className={styles.header}>
          <h1 className={styles.title}>Projects</h1>
          <p className={styles.subtitle}>
            Things I&apos;ve built. Mostly open-source. Some in production, some
            experiments.
          </p>
        </div>

        {/* Featured */}
        <section className={styles.featuredSection}>
          <h2 className={styles.sectionLabel}>Featured</h2>
          <div className={styles.featuredGrid}>
            {featured.map((project, i) => (
              <article
                key={project.slug}
                className={`${styles.featuredCard} ${i === 0 ? styles.wide : ""}`}
              >
                <div className={styles.cardTop}>
                  <div className={styles.cardMeta}>
                    <span className={styles.year}>{project.year}</span>
                    <span
                      className={`${styles.status} ${styles[project.status]}`}
                    >
                      {project.status}
                    </span>
                  </div>
                  <div className={styles.cardActions}>
                    {project.github && (
                      <a
                        href={project.github}
                        target="_blank"
                        rel="noopener noreferrer"
                        className={styles.cardAction}
                        aria-label="GitHub"
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
                        aria-label="Demo"
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

        {/* Other Projects */}
        <section className={styles.otherSection}>
          <h2 className={styles.sectionLabel}>Other work</h2>
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
                        aria-label="GitHub"
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
                    className={`${styles.statusSmall} ${styles[project.status]}`}
                  >
                    {project.status}
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
