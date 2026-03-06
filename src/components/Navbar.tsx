"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";
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
  const router = useRouter();
  const [menuOpen, setMenuOpen] = useState(false);
  const isSwitchingLocaleRef = useRef(false);
  const nextLocale = getOtherLocale(locale);
  const switchPath = toSwitchedLocalePath(pathname, nextLocale);
  const currentLocaleLabel = getLocaleDisplayName(locale, locale);
  const nextLocaleLabel = getLocaleDisplayName(nextLocale, locale);

  const isActive = (href: string) =>
    pathname === href ||
    (href !== `/${locale}/` && pathname.startsWith(`${href}/`));

  useEffect(() => {
    router.prefetch(switchPath);
  }, [router, switchPath]);

  useEffect(() => {
    // Route changed: clear fallback class and unlock switch control.
    document.documentElement.classList.remove("locale-switching");
    isSwitchingLocaleRef.current = false;
  }, [pathname]);

  const navigateWithLocaleAnimation = () => {
    if (isSwitchingLocaleRef.current) return;

    isSwitchingLocaleRef.current = true;
    setMenuOpen(false);

    const html = document.documentElement;
    const docWithTransition = document as Document & {
      startViewTransition?: (updateCallback: () => void) => {
        finished: Promise<void>;
      };
    };

    router.prefetch(switchPath);

    if (docWithTransition.startViewTransition) {
      const transition = docWithTransition.startViewTransition(() => {
        router.push(switchPath);
      });

      transition.finished.finally(() => {
        isSwitchingLocaleRef.current = false;
      });
      return;
    }

    html.classList.add("locale-switching");
    window.setTimeout(() => {
      router.push(switchPath);
    }, 120);
  };

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
          onClick={(event) => {
            event.preventDefault();
            navigateWithLocaleAnimation();
          }}
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
            onClick={(event) => {
              event.preventDefault();
              navigateWithLocaleAnimation();
            }}
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
