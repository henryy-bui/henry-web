"use client";

import { useEffect } from "react";
import { Moon, Sun } from "lucide-react";
import styles from "./ThemeToggle.module.css";

type ThemeToggleProps = {
  label: string;
  className?: string;
};

type Theme = "light" | "dark";

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

export default function ThemeToggle({ label, className }: ThemeToggleProps) {
  // No stored preference: keep following the OS while the page is open.
  useEffect(() => {
    const media = window.matchMedia("(prefers-color-scheme: light)");

    const onSystemChange = (event: MediaQueryListEvent) => {
      try {
        if (localStorage.getItem(STORAGE_KEY)) return;
      } catch {
        return;
      }
      commitTheme(event.matches ? "light" : "dark");
    };

    media.addEventListener("change", onSystemChange);
    return () => media.removeEventListener("change", onSystemChange);
  }, []);

  // The theme swaps in one paint. The circular reveal this used to run was
  // half a second of full-screen motion for a preference toggle.
  const toggleTheme = () => {
    const root = document.documentElement;
    const next: Theme =
      root.getAttribute("data-theme") === "light" ? "dark" : "light";

    try {
      localStorage.setItem(STORAGE_KEY, next);
    } catch {
      // Storage unavailable (private mode) — the theme still applies for this page.
    }

    commitTheme(next);
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
      <Sun size={16} className={styles.sun} aria-hidden="true" />
      <Moon size={16} className={styles.moon} aria-hidden="true" />
    </button>
  );
}
