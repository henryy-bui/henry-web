import type { Metadata } from "next";
import { experiences } from "@/data/experience";
import styles from "./page.module.css";

export const metadata: Metadata = {
  title: "Experience",
  description:
    "My professional journey and technical expertise. Explore my career timeline and key achievements in front-end engineering and UI/UX architecture.",
};

export default function ExperiencePage() {
  return (
    <div className="section">
      <div className="container">
        <div className={styles.header}>
          <h1 className={styles.title}>Experience</h1>
          <p className={styles.subtitle}>
            4+ years building high-performance, scalable web applications with a
            focus on React and modern front-end architectures.
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
            <span className={styles.statValue}>4+</span>
            <span className={styles.statLabel}>Years experience</span>
          </div>
          <div className={styles.stat}>
            <span className={styles.statValue}>2</span>
            <span className={styles.statLabel}>Major Companies</span>
          </div>
          <div className={styles.stat}>
            <span className={styles.statValue}>10+</span>
            <span className={styles.statLabel}>Projects Delivered</span>
          </div>
          <div className={styles.stat}>
            <span className={styles.statValue}>85%</span>
            <span className={styles.statLabel}>Code Coverage</span>
          </div>
        </div>
      </div>
    </div>
  );
}
