import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getExperiences } from "@/data/experience";
import { getDictionary } from "@/i18n/dictionary";
import { isLocale, type Locale } from "@/i18n/config";
import { buildLocalizedMetadata } from "@/i18n/seo";
import styles from "../../experience/page.module.css";

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
    path: "/experience",
    title: dict.experience.metadataTitle,
    description: dict.experience.metadataDescription,
    keywords:
      locale === "vi"
        ? ["kinh nghiem frontend", "react engineer", "ui ux"]
        : ["frontend experience", "react engineer", "ui architecture"],
    imagePath: `/${locale}/opengraph-image`,
    imageAlt:
      locale === "vi"
        ? "Kinh nghiệm làm việc và thành tựu kỹ thuật của Henry trong frontend engineering"
        : "Henry's professional experience and technical achievements in frontend engineering",
  });
}

export default async function ExperiencePage({ params }: PageProps) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();

  const typedLocale = locale as Locale;
  const dict = getDictionary(typedLocale);
  const experiences = getExperiences(typedLocale);

  return (
    <div className="section">
      <div className="container">
        <div className={styles.header}>
          <h1 className={styles.title}>{dict.experience.title}</h1>
          <p className={styles.subtitle}>{dict.experience.subtitle}</p>
        </div>

        <div className={styles.timeline}>
          {experiences.map((exp, index) => (
            <div key={exp.id} className={styles.item}>
              <div className={styles.indicator}>
                <div
                  className={`${styles.dot} ${
                    exp.current ? styles.dotCurrent : ""
                  }`}
                />
                {index < experiences.length - 1 && (
                  <div className={styles.line} />
                )}
              </div>

              <div className={styles.content}>
                <div className={styles.contentHeader}>
                  <div>
                    <div className={styles.period}>{exp.period}</div>
                    <h2 className={styles.role}>{exp.role}</h2>
                    <div className={styles.company}>
                      {exp.company}
                      <span className={styles.location}>{exp.location}</span>
                    </div>
                  </div>
                  {exp.current && (
                    <span className={styles.currentBadge}>
                      {dict.experience.current}
                    </span>
                  )}
                </div>

                <p className={styles.description}>{exp.description}</p>

                <ul className={styles.achievements}>
                  {exp.achievements.map((a, i) => (
                    <li key={i} className={styles.achievement}>
                      <span className={styles.achievementDot} />
                      {a}
                    </li>
                  ))}
                </ul>

                <div className={styles.techStack}>
                  {exp.tech.map((t) => (
                    <span key={t} className={styles.tech}>
                      {t}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className={styles.stats}>
          <div className={styles.stat}>
            <span className={styles.statValue}>4+</span>
            <span className={styles.statLabel}>
              {dict.experience.stats.years}
            </span>
          </div>
          <div className={styles.stat}>
            <span className={styles.statValue}>2</span>
            <span className={styles.statLabel}>
              {dict.experience.stats.companies}
            </span>
          </div>
          <div className={styles.stat}>
            <span className={styles.statValue}>10+</span>
            <span className={styles.statLabel}>
              {dict.experience.stats.projects}
            </span>
          </div>
          <div className={styles.stat}>
            <span className={styles.statValue}>85%</span>
            <span className={styles.statLabel}>
              {dict.experience.stats.coverage}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
