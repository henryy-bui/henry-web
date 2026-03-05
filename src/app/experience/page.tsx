import type { Metadata } from "next";
import { experiences } from "@/data/experience";
import styles from "./page.module.css";

export const metadata: Metadata = {
  title: "Experience",
  description:
    "My professional journey and technical expertise. Explore my career timeline and key achievements in distributed systems and developer tooling.",
};

export default function ExperiencePage() {
  return (
    <div className="section">
      <div className="container">
        <div className={styles.header}>
          <h1 className={styles.title}>Experience</h1>
          <p className={styles.subtitle}>
            8+ years building distributed systems and developer tooling at
            high-growth companies.
          </p>
        </div>

        <div className={styles.timeline}>
          {experiences.map((exp, index) => (
            <div key={exp.id} className={styles.item}>
              {/* Timeline indicator */}
              <div className={styles.indicator}>
                <div
                  className={`${styles.dot} ${exp.current ? styles.dotCurrent : ""}`}
                />
                {index < experiences.length - 1 && (
                  <div className={styles.line} />
                )}
              </div>

              {/* Content */}
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
                    <span className={styles.currentBadge}>Current</span>
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

        {/* Summary stats */}
        <div className={styles.stats}>
          <div className={styles.stat}>
            <span className={styles.statValue}>8+</span>
            <span className={styles.statLabel}>Years experience</span>
          </div>
          <div className={styles.stat}>
            <span className={styles.statValue}>4</span>
            <span className={styles.statLabel}>Companies</span>
          </div>
          <div className={styles.stat}>
            <span className={styles.statValue}>∞</span>
            <span className={styles.statLabel}>Lines of code</span>
          </div>
          <div className={styles.stat}>
            <span className={styles.statValue}>15+</span>
            <span className={styles.statLabel}>Open source contributions</span>
          </div>
        </div>
      </div>
    </div>
  );
}
