import type { Locale } from "@/i18n/config";

export interface Project {
  slug: string;
  title: string;
  description: string;
  longDescription: string;
  tech: string[];
  github?: string;
  demo?: string;
  featured: boolean;
  year: number;
  status: "active" | "wip" | "archived";
}

const enProjects: Project[] = [
  {
    slug: "motion-spectre",
    title: "Motion Spectre",
    description:
      "A high-performance animation library for React targeting 120fps fluid transitions.",
    longDescription:
      "Built an imperative animation orchestrator for React from scratch utilizing Web Animations API and requestAnimationFrame. Achieved zero layout thrashing and sub-millisecond JS execution per frame.",
    tech: ["TypeScript", "React", "WAAPI", "Framer Motion"],
    github: "https://github.com",
    demo: "https://example.com",
    featured: true,
    year: 2024,
    status: "active",
  },
  {
    slug: "type-safe-router",
    title: "tsRouter",
    description:
      "Fully type-safe routing library for React with zero-overhead runtime cost.",
    longDescription:
      "Type-level router for React applications. Route params, search params, and navigation are fully type-safe without any code generation. Achieved 100% tree-shaking and near-zero bundle overhead.",
    tech: ["TypeScript", "React", "Vite", "ESBuild"],
    github: "https://github.com",
    demo: "https://example.com",
    featured: true,
    year: 2024,
    status: "active",
  },
  {
    slug: "canvas-flow",
    title: "CanvasFlow",
    description:
      "A fully web-based infinite canvas tool for spatial reasoning and diagramming.",
    longDescription:
      "Engineered an infinite canvas utilizing WebGL and custom render loops for extreme performance. Features smooth zooming, hardware-accelerated panning, and interactive DOM overlays.",
    tech: ["TypeScript", "WebGL", "React", "Zustand"],
    github: "https://github.com",
    demo: "https://example.com",
    featured: true,
    year: 2023,
    status: "active",
  },
  {
    slug: "cli-toolkit",
    title: "devkit-cli",
    description:
      "A batteries-included CLI toolkit for modern web development workflows.",
    longDescription:
      "Opinionated CLI for scaffolding projects, managing secrets, running local infra, and standardizing PR workflows across a team.",
    tech: ["Node.js", "TypeScript", "Commander.js", "Docker"],
    github: "https://github.com",
    featured: false,
    year: 2023,
    status: "active",
  },
  {
    slug: "realtime-collab",
    title: "Collab-Editor",
    description:
      "Real-time collaborative text editor using CRDTs and WebSockets.",
    longDescription:
      "Conflict-free replicated data type (CRDT) based text editor supporting real-time collaboration. Handles offline edits, conflict resolution, and cursor syncing for up to 50 concurrent users.",
    tech: ["TypeScript", "CRDT", "WebSockets", "React", "Node.js"],
    github: "https://github.com",
    featured: false,
    year: 2023,
    status: "archived",
  },
  {
    slug: "zero-runtime-css",
    title: "StyleExtract",
    description: "A zero-runtime CSS-in-JS extractor built natively for Vite.",
    longDescription:
      "A Vite plugin that statically analyzes CSS-in-JS syntax during the build step and extracts it into optimized, atomic CSS files. Reduces client-side JS bundle by completely removing the styling runtime.",
    tech: ["TypeScript", "Vite", "AST", "PostCSS"],
    github: "https://github.com",
    featured: false,
    year: 2022,
    status: "archived",
  },
];

const viProjects: Project[] = [
  {
    slug: "motion-spectre",
    title: "Motion Spectre",
    description:
      "Thư viện animation hiệu năng cao cho React, hướng đến chuyển động mượt ở ngưỡng 120fps.",
    longDescription:
      "Tự xây bộ điều phối animation kiểu imperative cho React với Web Animations API và requestAnimationFrame. Mục tiêu là triệt tiêu layout thrashing và giữ thời gian JS mỗi frame dưới 1ms.",
    tech: ["TypeScript", "React", "WAAPI", "Framer Motion"],
    github: "https://github.com",
    demo: "https://example.com",
    featured: true,
    year: 2024,
    status: "active",
  },
  {
    slug: "type-safe-router",
    title: "tsRouter",
    description:
      "Thư viện định tuyến type-safe cho React với chi phí runtime gần như bằng 0.",
    longDescription:
      "Router type-level cho ứng dụng React. Route params, search params và navigation đều được kiểm tra kiểu đầy đủ mà không cần code generation. Hỗ trợ tree-shaking tốt và gần như không tăng overhead bundle.",
    tech: ["TypeScript", "React", "Vite", "ESBuild"],
    github: "https://github.com",
    demo: "https://example.com",
    featured: true,
    year: 2024,
    status: "active",
  },
  {
    slug: "canvas-flow",
    title: "CanvasFlow",
    description:
      "Công cụ infinite canvas chạy trên web phục vụ tư duy không gian và vẽ sơ đồ.",
    longDescription:
      "Xây dựng infinite canvas với WebGL và vòng lặp render tùy chỉnh để tối ưu hiệu năng. Hỗ trợ zoom mượt, pan tăng tốc phần cứng và lớp DOM overlay tương tác.",
    tech: ["TypeScript", "WebGL", "React", "Zustand"],
    github: "https://github.com",
    demo: "https://example.com",
    featured: true,
    year: 2023,
    status: "active",
  },
  {
    slug: "cli-toolkit",
    title: "devkit-cli",
    description: "CLI toolkit đầy đủ cho quy trình phát triển web hiện đại.",
    longDescription:
      "CLI theo hướng opinionated để scaffold dự án, quản lý secrets, chạy hạ tầng local và chuẩn hóa workflow PR trong team.",
    tech: ["Node.js", "TypeScript", "Commander.js", "Docker"],
    github: "https://github.com",
    featured: false,
    year: 2023,
    status: "active",
  },
  {
    slug: "realtime-collab",
    title: "Collab-Editor",
    description:
      "Trình soạn thảo cộng tác thời gian thực dựa trên CRDT và WebSockets.",
    longDescription:
      "Trình soạn thảo dựa trên CRDT, hỗ trợ cộng tác thời gian thực. Xử lý chỉnh sửa offline, tự hòa giải xung đột và đồng bộ con trỏ cho tối đa 50 người dùng đồng thời.",
    tech: ["TypeScript", "CRDT", "WebSockets", "React", "Node.js"],
    github: "https://github.com",
    featured: false,
    year: 2023,
    status: "archived",
  },
  {
    slug: "zero-runtime-css",
    title: "StyleExtract",
    description:
      "Bộ trích xuất CSS-in-JS zero-runtime, xây dựng native cho Vite.",
    longDescription:
      "Plugin Vite phân tích tĩnh cú pháp CSS-in-JS khi build và trích xuất thành các file CSS atomic tối ưu. Nhờ loại bỏ hoàn toàn styling runtime, JS bundle phía client giảm đáng kể.",
    tech: ["TypeScript", "Vite", "AST", "PostCSS"],
    github: "https://github.com",
    featured: false,
    year: 2022,
    status: "archived",
  },
];

export function getProjects(locale: Locale): Project[] {
  return locale === "vi" ? viProjects : enProjects;
}
