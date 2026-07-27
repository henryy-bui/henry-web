"use client";

import { useEffect, useRef, type MouseEvent } from "react";
import { Moon, Sun } from "lucide-react";
import styles from "./ThemeToggle.module.css";

type ThemeToggleProps = {
  label: string;
  className?: string;
};

type Theme = "light" | "dark";

type DocumentWithViewTransition = Document & {
  startViewTransition?: (updateCallback: () => void) => {
    finished: Promise<void>;
  };
};

const STORAGE_KEY = "theme";

// Swap every themed value in a single paint, with transitions muted, so no
// property can animate out of step with the ones that jump.
function commitTheme(next: Theme) {
  const root = document.documentElement;

  root.classList.add("theme-changing");
  root.setAttribute("data-theme", next);
  root.style.colorScheme = next;

  // Force a style flush while transitions are still disabled, so the new
  // colors are committed before the class comes back off.
  window.getComputedStyle(root).getPropertyValue("background-color");

  window.setTimeout(() => root.classList.remove("theme-changing"), 1);
}

// Circle big enough to cover the viewport from the given origin.
function coverRadius(x: number, y: number) {
  return Math.hypot(
    Math.max(x, window.innerWidth - x),
    Math.max(y, window.innerHeight - y),
  );
}

export default function ThemeToggle({ label, className }: ThemeToggleProps) {
  const isTransitioningRef = useRef(false);

  // No stored preference: keep following the OS while the page is open.
  useEffect(() => {
    const media = window.matchMedia("(prefers-color-scheme: light)");

    const onSystemChange = (event: MediaQueryListEvent) => {
      try {
        if (localStorage.getItem(STORAGE_KEY)) return;
      } catch {
        return;
      }
      // Not a click on this page — swap quietly, without the reveal.
      commitTheme(event.matches ? "light" : "dark");
    };

    media.addEventListener("change", onSystemChange);
    return () => media.removeEventListener("change", onSystemChange);
  }, []);

  const toggleTheme = (event: MouseEvent<HTMLButtonElement>) => {
    const root = document.documentElement;
    const next: Theme =
      root.getAttribute("data-theme") === "light" ? "dark" : "light";

    try {
      localStorage.setItem(STORAGE_KEY, next);
    } catch {
      // Storage unavailable (private mode) — the theme still applies for this page.
    }

    const doc = document as DocumentWithViewTransition;
    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;

    if (
      !doc.startViewTransition ||
      prefersReducedMotion ||
      isTransitioningRef.current
    ) {
      commitTheme(next);
      return;
    }

    const rect = event.currentTarget.getBoundingClientRect();
    const originX = rect.left + rect.width / 2;
    const originY = rect.top + rect.height / 2;

    root.style.setProperty("--theme-origin-x", `${originX}px`);
    root.style.setProperty("--theme-origin-y", `${originY}px`);
    root.style.setProperty(
      "--theme-origin-r",
      `${coverRadius(originX, originY)}px`,
    );
    root.classList.add("theme-vt");
    isTransitioningRef.current = true;

    const transition = doc.startViewTransition(() => {
      commitTheme(next);
    });

    const cleanup = () => {
      isTransitioningRef.current = false;
      root.classList.remove("theme-vt");
    };

    // `finished` rejects when the transition is skipped (e.g. tab hidden).
    transition.finished.then(cleanup, cleanup);
  };

  return (
    <button
      type="button"
      onClick={toggleTheme}
      className={`${styles.toggle} ${className ?? ""}`}
      aria-label={label}
      title={label}
    >
      {/* Which icon shows is driven by CSS off [data-theme], so there is
          nothing to hydrate and no first-paint mismatch. */}
      <Sun size={17} className={styles.sun} data-theme-icon aria-hidden="true" />
      <Moon
        size={17}
        className={styles.moon}
        data-theme-icon
        aria-hidden="true"
      />
    </button>
  );
}
