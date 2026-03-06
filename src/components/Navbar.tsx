"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { Menu, X, Terminal } from "lucide-react";
import {
  getLocaleDisplayName,
  getOtherLocale,
  isLocale,
  type Locale,
} from "@/i18n/config";
import type { SiteDictionary } from "@/i18n/dictionary";
import styles from "./Navbar.module.css";

type NavbarProps = {
  locale: Locale;
  dictionary: SiteDictionary;
};

function withLocale(locale: Locale, path: string) {
  return `/${locale}${path}`;
}

function toSwitchedLocalePath(pathname: string, nextLocale: Locale) {
  const segments = pathname.split("/").filter(Boolean);

  if (segments.length > 0 && isLocale(segments[0])) {
    segments[0] = nextLocale;
    return `/${segments.join("/")}`;
  }

  return `/${nextLocale}${pathname}`;
}

export default function Navbar({ locale, dictionary }: NavbarProps) {
  const NAV_LINKS = [
    { href: withLocale(locale, "/"), label: dictionary.nav.home },
    { href: withLocale(locale, "/blog"), label: dictionary.nav.blog },
    { href: withLocale(locale, "/projects"), label: dictionary.nav.projects },
    {
      href: withLocale(locale, "/experience"),
      label: dictionary.nav.experience,
    },
  ];

  const pathname = usePathname();
  const [menuOpen, setMenuOpen] = useState(false);
  const nextLocale = getOtherLocale(locale);
  const switchPath = toSwitchedLocalePath(pathname, nextLocale);
  const currentLocaleLabel = getLocaleDisplayName(locale, locale);
  const nextLocaleLabel = getLocaleDisplayName(nextLocale, locale);

  const isActive = (href: string) =>
    pathname === href ||
    (href !== `/${locale}/` && pathname.startsWith(`${href}/`));

  return (
    <header className={styles.header}>
      <div className={styles.inner}>
        <Link href={withLocale(locale, "/")} className={styles.logo}>
          <Terminal size={18} />
          <span>{dictionary.nav.logo}</span>
        </Link>

        <nav className={styles.nav}>
          {NAV_LINKS.map(({ href, label }) => (
            <Link
              key={href}
              href={href}
              className={`${styles.navLink} ${
                isActive(href) ? styles.active : ""
              }`}
            >
              {label}
            </Link>
          ))}
        </nav>

        <Link
          href={switchPath}
          className={`${styles.navLink} ${styles.localeSwitch}`}
          aria-label={dictionary.nav.languageSwitchLabel}
          title={`${dictionary.nav.languageSwitchLabel}: ${nextLocaleLabel}`}
        >
          <span className={styles.currentLocale}>{currentLocaleLabel}</span>
          <span className={styles.switchArrow}>/</span>
          <span>{nextLocaleLabel}</span>
        </Link>

        <a href="mailto:buiha.dev@gmail.com" className={styles.cta}>
          {dictionary.nav.contact}
        </a>

        <button
          className={styles.menuBtn}
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label={dictionary.nav.toggleMenu}
        >
          {menuOpen ? <X size={20} /> : <Menu size={20} />}
        </button>
      </div>

      {menuOpen && (
        <div className={styles.mobileMenu}>
          {NAV_LINKS.map(({ href, label }) => (
            <Link
              key={href}
              href={href}
              className={`${styles.mobileLink} ${
                isActive(href) ? styles.active : ""
              }`}
              onClick={() => setMenuOpen(false)}
            >
              {label}
            </Link>
          ))}
          <Link
            href={switchPath}
            className={`${styles.mobileLink} ${styles.mobileLocaleSwitch}`}
            onClick={() => setMenuOpen(false)}
            aria-label={dictionary.nav.languageSwitchLabel}
          >
            {currentLocaleLabel} / {nextLocaleLabel}
          </Link>
          <a href="mailto:buiha.dev@gmail.com" className={styles.mobileCta}>
            {dictionary.nav.contact}
          </a>
        </div>
      )}
    </header>
  );
}
