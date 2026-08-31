"use client";

import { ArrowUp } from "lucide-react";
import { useEffect, useState } from "react";
import styles from "./ScrollToTopButton.module.css";

type ScrollToTopButtonProps = {
  label: string;
};

const SHOW_THRESHOLD = 420;

export default function ScrollToTopButton({ label }: ScrollToTopButtonProps) {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > SHOW_THRESHOLD);

    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });

    return () => {
      window.removeEventListener("scroll", onScroll);
    };
  }, []);

  const handleScrollTop = () => {
    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    window.scrollTo({
      top: 0,
      behavior: prefersReducedMotion ? "auto" : "smooth",
    });
  };

  return (
    <button
      type="button"
      className={`${styles.button} ${visible ? styles.visible : ""}`}
      onClick={handleScrollTop}
      aria-label={label}
      title={label}
    >
      <ArrowUp size={16} />
    </button>
  );
}
