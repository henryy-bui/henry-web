"use client";

import { ArrowUp } from "lucide-react";
import { useEffect, useState, type CSSProperties } from "react";
import styles from "./ScrollToTopButton.module.css";

type ScrollToTopButtonProps = {
  label: string;
};

const SHOW_THRESHOLD = 420;
const HUE_START = 212;
const HUE_END = 95;
const SAT_START = 88;
const SAT_END = 92;
const LIGHT_START = 64;
const LIGHT_END = 60;

export default function ScrollToTopButton({ label }: ScrollToTopButtonProps) {
  const [visible, setVisible] = useState(false);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const onScroll = () => {
      const scrollTop = window.scrollY;
      const documentHeight =
        document.documentElement.scrollHeight - window.innerHeight;
      const nextProgress =
        documentHeight > 0
          ? Math.min(1, Math.max(0, scrollTop / documentHeight))
          : 0;

      setVisible(scrollTop > SHOW_THRESHOLD);
      setProgress(nextProgress);
    };

    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });

    return () => {
      window.removeEventListener("scroll", onScroll);
    };
  }, []);

  const hue = HUE_START + (HUE_END - HUE_START) * progress;
  const saturation = SAT_START + (SAT_END - SAT_START) * progress;
  const lightness = LIGHT_START + (LIGHT_END - LIGHT_START) * progress;
  const dynamicStyle = {
    "--progress-hue": `${hue}`,
    "--progress-color": `hsl(${hue} ${saturation}% ${lightness}%)`,
    "--progress-ratio": `${progress}`,
  } as CSSProperties;

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
      style={dynamicStyle}
      onClick={handleScrollTop}
      aria-label={label}
      title={label}
    >
      <span className={styles.fill} aria-hidden="true" />
      <span className={styles.wave} aria-hidden="true" />
      <span className={`${styles.wave} ${styles.wave2}`} aria-hidden="true" />
      <span className={styles.iconWrap}>
        <ArrowUp size={25} />
      </span>
    </button>
  );
}
