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

export const projects: Project[] = [
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
