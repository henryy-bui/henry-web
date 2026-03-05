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
    slug: "distributed-cache",
    title: "DistCache",
    description:
      "A high-performance distributed caching layer with consistent hashing and automatic failover.",
    longDescription:
      "Built a distributed caching system from scratch supporting 150k+ req/s using consistent hashing with virtual nodes, LRU eviction, and Raft consensus for leader election. Achieved sub-millisecond p99 latency.",
    tech: ["Go", "gRPC", "Raft", "LRU", "Docker"],
    github: "https://github.com",
    demo: undefined,
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
    slug: "ml-pipeline",
    title: "DataFlux",
    description:
      "A visual no-code ML pipeline builder with real-time execution and reproducible experiments.",
    longDescription:
      "Drag-and-drop ML pipeline builder with automatic data versioning via DVC, reproducible experiment tracking with MLflow, and real-time node execution feedback.",
    tech: ["Python", "FastAPI", "React", "DVC", "MLflow"],
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
    slug: "query-builder",
    title: "FluentQuery",
    description:
      "SQL query builder with type inference and migration tracking for TypeScript.",
    longDescription:
      "A TypeScript-first SQL query builder that infers column types from your schema and provides type-safe queries without any ORM overhead.",
    tech: ["TypeScript", "PostgreSQL", "SQLite"],
    github: "https://github.com",
    featured: false,
    year: 2022,
    status: "archived",
  },
];
