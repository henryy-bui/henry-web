import Link from "next/link";
import { Github, Twitter, Linkedin, Terminal } from "lucide-react";
import styles from "./Footer.module.css";

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className={styles.footer}>
      <div className={styles.inner}>
        <div className={styles.brand}>
          <Link href="/" className={styles.logo}>
            <Terminal size={16} />
            <span>henry.dev</span>
          </Link>
          <p className={styles.tagline}>
            Building reliable systems and sharing what I learn.
          </p>
        </div>

        <div className={styles.links}>
          <div className={styles.linkGroup}>
            <span className={styles.groupLabel}>Navigate</span>
            <Link href="/" className={styles.link}>
              Home
            </Link>
            <Link href="/blog" className={styles.link}>
              Blog
            </Link>
            <Link href="/projects" className={styles.link}>
              Projects
            </Link>
            <Link href="/experience" className={styles.link}>
              Experience
            </Link>
          </div>
          <div className={styles.linkGroup}>
            <span className={styles.groupLabel}>Connect</span>
            <a
              href="https://github.com"
              target="_blank"
              rel="noopener noreferrer"
              className={styles.link}
            >
              GitHub
            </a>
            <a
              href="https://twitter.com"
              target="_blank"
              rel="noopener noreferrer"
              className={styles.link}
            >
              Twitter
            </a>
            <a
              href="https://linkedin.com"
              target="_blank"
              rel="noopener noreferrer"
              className={styles.link}
            >
              LinkedIn
            </a>
            <a href="mailto:henry@example.com" className={styles.link}>
              Email
            </a>
          </div>
        </div>

        <div className={styles.social}>
          <a
            href="https://github.com"
            target="_blank"
            rel="noopener noreferrer"
            className={styles.socialBtn}
            aria-label="GitHub"
          >
            <Github size={18} />
          </a>
          <a
            href="https://twitter.com"
            target="_blank"
            rel="noopener noreferrer"
            className={styles.socialBtn}
            aria-label="Twitter"
          >
            <Twitter size={18} />
          </a>
          <a
            href="https://linkedin.com"
            target="_blank"
            rel="noopener noreferrer"
            className={styles.socialBtn}
            aria-label="LinkedIn"
          >
            <Linkedin size={18} />
          </a>
        </div>
      </div>

      <div className={styles.bottom}>
        <span>© {year} Henry. All rights reserved.</span>
      </div>
    </footer>
  );
}
