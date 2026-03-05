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
      "Building core infrastructure for Stripe's payments platform. Focus on reliability, distributed systems, and developer experience.",
    achievements: [
      "Led redesign of the idempotency subsystem, reducing duplicate payment incidents by 94%",
      "Built a gRPC-based internal routing layer serving 500k+ requests per minute",
      "Mentored 4 junior engineers, running bi-weekly technical deep dives",
      "Contributed to open-source Stripe API client libraries (Go, TypeScript)",
    ],
    tech: ["Go", "gRPC", "PostgreSQL", "Kafka", "TypeScript", "React"],
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
      "Worked on the Next.js framework core team and developer platform tooling.",
    achievements: [
      "Implemented RSC (React Server Components) streaming infrastructure in Next.js",
      "Reduced cold boot times by 40% through Edge Runtime optimizations",
      "Built the real-time build log streaming feature used by 1M+ developers",
      "Shipped 15+ minor and 3 major Next.js releases",
    ],
    tech: ["TypeScript", "React", "Next.js", "Rust", "Node.js", "Redis"],
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
      "Developed Workers platform features and contributed to edge network tooling.",
    achievements: [
      "Built the Durable Objects consistency model prototype (shipped in 2022)",
      "Improved Workers KV read latency by 25% through cache coalescing",
      "Developed automated load testing framework for edge functions",
    ],
    tech: ["Rust", "TypeScript", "V8", "C++", "Python"],
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
      "Delivered full-stack consulting projects across fintech and healthcare clients.",
    achievements: [
      "Led a team of 5 to rebuild a legacy fintech platform serving 200k users",
      "Introduced CI/CD pipelines reducing deployment time from 2 days to 45 minutes",
      "Ran internal workshops on TDD and agile practices",
    ],
    tech: ["Java", "Spring Boot", "React", "PostgreSQL", "AWS", "Terraform"],
  },
];
