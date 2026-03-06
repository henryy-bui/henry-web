import Link from "next/link";
import { Terminal } from "lucide-react";
import type { Locale } from "@/i18n/config";
import type { SiteDictionary } from "@/i18n/dictionary";
import Github from "./icons/Github";
import Linkedin from "./icons/Linkedin";
import Facebook from "./icons/Facebook";
import styles from "./Footer.module.css";

type FooterProps = {
  locale: Locale;
  dictionary: SiteDictionary;
};

function withLocale(locale: Locale, path: string) {
  return `/${locale}${path}`;
}

export default function Footer({ locale, dictionary }: FooterProps) {
  const year = new Date().getFullYear();

  return (
    <footer className={styles.footer}>
      <div className={styles.inner}>
        <div className={styles.brand}>
          <Link href={withLocale(locale, "/")} className={styles.logo}>
            <Terminal size={16} />
            <span>{dictionary.nav.logo}</span>
          </Link>
          <p className={styles.tagline}>{dictionary.footer.tagline}</p>
        </div>

        <div className={styles.links}>
          <div className={styles.linkGroup}>
            <span className={styles.groupLabel}>
              {dictionary.footer.navigate}
            </span>
            <Link href={withLocale(locale, "/")} className={styles.link}>
              {dictionary.nav.home}
            </Link>
            <Link href={withLocale(locale, "/blog")} className={styles.link}>
              {dictionary.nav.blog}
            </Link>
            <Link
              href={withLocale(locale, "/projects")}
              className={styles.link}
            >
              {dictionary.nav.projects}
            </Link>
            <Link
              href={withLocale(locale, "/experience")}
              className={styles.link}
            >
              {dictionary.nav.experience}
            </Link>
          </div>
          <div className={styles.linkGroup}>
            <span className={styles.groupLabel}>
              {dictionary.footer.connect}
            </span>
            <a
              href="https://github.com/henryy-bui"
              target="_blank"
              rel="noopener noreferrer"
              className={styles.link}
            >
              GitHub
            </a>
            <a
              href="https://www.facebook.com/iamhabv/"
              target="_blank"
              rel="noopener noreferrer"
              className={styles.link}
            >
              Facebook
            </a>
            <a
              href="https://www.linkedin.com/in/henryy-bui/"
              target="_blank"
              rel="noopener noreferrer"
              className={styles.link}
            >
              LinkedIn
            </a>
            <a href="mailto:buiha.dev@gmail.com" className={styles.link}>
              {dictionary.footer.email}
            </a>
          </div>
        </div>

        <div className={styles.social}>
          <a
            href="https://github.com/henryy-bui"
            target="_blank"
            rel="noopener noreferrer"
            className={styles.socialBtn}
            aria-label="GitHub"
          >
            <Github size={18} />
          </a>
          <a
            href="https://www.facebook.com/iamhabv/"
            target="_blank"
            rel="noopener noreferrer"
            className={styles.socialBtn}
            aria-label="Facebook"
          >
            <Facebook size={18} />
          </a>
          <a
            href="https://www.linkedin.com/in/henryy-bui/"
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
        <span>
          © {year} Henry. {dictionary.footer.copyright}
        </span>
      </div>
    </footer>
  );
}
