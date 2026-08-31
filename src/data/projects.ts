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
      "An imperative animation orchestrator for React, built on the Web Animations API.",
    longDescription:
      "Animations run outside the React render path: the orchestrator drives them through WAAPI and requestAnimationFrame, and only touches composited properties, so a running animation does not trigger layout. Built mainly to understand where the cost in existing animation libraries actually comes from.",
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
      "A type-safe router for React with no code generation step.",
    longDescription:
      "Route params, search params, and navigation are typed from a single route definition using template literal types, so the types cannot drift from the routes. What ships at runtime is a small matcher; the rest is erased at build time.",
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
      "An infinite canvas for diagramming, rendered with WebGL.",
    longDescription:
      "Nodes render in WebGL through a custom render loop, while text and inputs stay as DOM overlays positioned from the same transform. Zoom and pan run on the GPU, which keeps the canvas responsive as the node count grows.",
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
      "A CLI for the setup work at the start of a project.",
    longDescription:
      "Scaffolds projects, manages local secrets, brings up local infra with Docker, and standardizes PR templates. Opinionated on purpose: it encodes one team's conventions rather than trying to fit every team.",
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
      "A collaborative text editor built on CRDTs and WebSockets.",
    longDescription:
      "Text is stored as a CRDT, so edits made offline merge back without a central lock, and cursors sync across clients. Archived: the merge logic held up, but the presence layer needed more attention than a side project could give it.",
    tech: ["TypeScript", "CRDT", "WebSockets", "React", "Node.js"],
    github: "https://github.com",
    featured: false,
    year: 2023,
    status: "archived",
  },
  {
    slug: "zero-runtime-css",
    title: "StyleExtract",
    description: "A Vite plugin that extracts CSS-in-JS at build time.",
    longDescription:
      "Statically analyzes CSS-in-JS syntax during the build and emits atomic CSS files, so the styling runtime never reaches the client. Archived once the ecosystem settled on similar tools with more maintainers behind them.",
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
      "Bộ điều phối animation kiểu imperative cho React, dựng trên Web Animations API.",
    longDescription:
      "Animation chạy ngoài luồng render của React: bộ điều phối đẩy chúng qua WAAPI và requestAnimationFrame, chỉ đụng vào các thuộc tính được composite nên animation đang chạy không kéo theo layout. Mình làm chủ yếu để hiểu chi phí trong các thư viện animation hiện có đến từ đâu.",
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
      "Router type-safe cho React, không cần bước code generation.",
    longDescription:
      "Route params, search params và navigation đều lấy kiểu từ một định nghĩa route duy nhất bằng template literal types, nên kiểu không thể lệch khỏi route. Thứ thật sự chạy ở runtime chỉ là một matcher nhỏ, phần còn lại bị xóa lúc build.",
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
      "Infinite canvas để vẽ sơ đồ, render bằng WebGL.",
    longDescription:
      "Node được render bằng WebGL qua một vòng lặp render tự viết, còn text và input vẫn là DOM overlay đặt theo cùng một transform. Zoom và pan chạy trên GPU nên canvas vẫn mượt khi số lượng node tăng lên.",
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
    description: "CLI lo phần dựng khung lúc mới bắt đầu dự án.",
    longDescription:
      "Scaffold dự án, quản lý secrets ở local, dựng hạ tầng local bằng Docker và chuẩn hóa template PR. Opinionated là chủ ý: nó gói quy ước của một team cụ thể, không cố vừa với mọi team.",
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
      "Trình soạn thảo cộng tác dựng trên CRDT và WebSockets.",
    longDescription:
      "Văn bản được lưu dưới dạng CRDT nên các chỉnh sửa lúc offline merge lại được mà không cần khóa tập trung, con trỏ cũng đồng bộ giữa các client. Đã lưu trữ: phần merge chạy ổn, nhưng lớp presence cần nhiều thời gian hơn mức một dự án phụ có thể dành ra.",
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
      "Plugin Vite trích xuất CSS-in-JS ngay lúc build.",
    longDescription:
      "Phân tích tĩnh cú pháp CSS-in-JS khi build rồi xuất ra các file CSS atomic, nhờ vậy styling runtime không bao giờ tới client. Đã lưu trữ khi hệ sinh thái đã có những công cụ tương tự với đội ngũ duy trì đông hơn.",
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
