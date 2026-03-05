export interface Experience {
  id: string;
  company: string;
  role: string;
  period: string;
  startYear: number;
  endYear: number | null;
  location: string;
  description: string;
  achievements: string[];
  tech: string[];
  logo?: string;
  current?: boolean;
}

export const experiences: Experience[] = [
  {
    id: "stripe",
    company: "Stripe",
    role: "Senior Software Engineer",
    period: "2023 – Present",
    startYear: 2023,
    endYear: null,
    location: "San Francisco, CA (Remote)",
    description:
      "Leading frontend architecture for Stripe's Dashboard platform. Focusing on design systems, component reusability, and client-side performance.",
    achievements: [
      "Architected the migration of legacy dashboard screens to a modern React App Router architecture",
      "Led the core UI team in building 'Sail', Stripe's internal highly-accessible component library",
      "Improved TTI (Time to Interactive) by 35% through bundle splitting and aggressive code-fetching optimizations",
      "Mentored 4 junior frontend engineers, running bi-weekly React architecture deep dives",
    ],
    tech: ["TypeScript", "React", "Next.js", "Framer Motion", "Tailwind CSS"],
    current: true,
  },
  {
    id: "vercel",
    company: "Vercel",
    role: "Software Engineer",
    period: "2021 – 2023",
    startYear: 2021,
    endYear: 2023,
    location: "Remote",
    description:
      "Worked on the Next.js framework core team focusing on the frontend developer experience and rendering engines.",
    achievements: [
      "Implemented early prototypes for React Server Components (RSC) streaming in Next.js",
      "Built the real-time, highly-interactive build log streaming dashboard used by 1M+ developers",
      "Optimized client-side router transitions, reducing layout shift during client-side navigation",
      "Shipped 15+ minor and 3 major Next.js framework releases",
    ],
    tech: ["TypeScript", "React", "Next.js", "SWC", "Node.js"],
  },
  {
    id: "cloudflare",
    company: "Cloudflare",
    role: "Software Engineer",
    period: "2019 – 2021",
    startYear: 2019,
    endYear: 2021,
    location: "Austin, TX",
    description:
      "Developed the Cloudflare dashboard ui and contributed to the edge-rendering ecosystem.",
    achievements: [
      "Built the highly interactive traffic analytics dashboard utilizing WebGL for rendering 10k+ data points",
      "Created the internal React framework used for all Cloudflare dashboard micro-frontends",
      "Improved component library tree-shaking, dropping base bundle size by 25%",
    ],
    tech: ["TypeScript", "React", "Redux", "WebGL", "CSS-in-JS"],
  },
  {
    id: "thoughtworks",
    company: "ThoughtWorks",
    role: "Associate Software Consultant",
    period: "2017 – 2019",
    startYear: 2017,
    endYear: 2019,
    location: "Chicago, IL",
    description:
      "Delivered full-stack and frontend-heavy client projects across fintech and healthcare.",
    achievements: [
      "Led UI development for a healthcare portal, migrating legacy jQuery to a modern React SPA",
      "Implemented comprehensive end-to-end testing with Cypress, increasing UI test coverage to 90%",
      "Ran internal workshops on modern CSS architectures and accessibility standards",
    ],
    tech: ["JavaScript", "React", "Sass", "Cypress", "Webpack"],
  },
];
