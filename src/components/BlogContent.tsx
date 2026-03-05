"use client";

import { useEffect, useRef } from "react";
import styles from "./BlogContent.module.css";

interface Props {
  html: string;
}

export default function BlogContent({ html }: Props) {
  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!contentRef.current) return;

    const preElements = contentRef.current.querySelectorAll("pre");

    preElements.forEach((pre) => {
      // Avoid duplicate buttons
      if (pre.querySelector(`.${styles.copyButton}`)) return;

      // Wrap pre in a container for positioning
      const wrapper = document.createElement("div");
      wrapper.className = styles.codeWrapper;
      pre.parentNode?.insertBefore(wrapper, pre);
      wrapper.appendChild(pre);

      const button = document.createElement("button");
      button.className = styles.copyButton;
      button.setAttribute("aria-label", "Copy code");
      button.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect width="14" height="14" x="8" y="8" rx="2" ry="2"/><path d="M4 16c-1.1 0-2-.9-2-2V4c0-1.1.9-2 2-2h10c1.1 0 2 .9 2 2"/></svg>`;

      button.onclick = async () => {
        const code = pre.querySelector("code")?.innerText || pre.innerText;
        try {
          await navigator.clipboard.writeText(code);
          button.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M20 6 9 17l-5-5"/></svg>`;
          button.classList.add(styles.copied);

          setTimeout(() => {
            button.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect width="14" height="14" x="8" y="8" rx="2" ry="2"/><path d="M4 16c-1.1 0-2-.9-2-2V4c0-1.1.9-2 2-2h10c1.1 0 2 .9 2 2"/></svg>`;
            button.classList.remove(styles.copied);
          }, 2000);
        } catch (err) {
          console.error("Failed to copy!", err);
        }
      };

      wrapper.appendChild(button);
    });
  }, [html]);

  return (
    <div
      ref={contentRef}
      className="prose"
      dangerouslySetInnerHTML={{ __html: html }}
    />
  );
}
