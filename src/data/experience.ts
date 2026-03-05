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
    id: "gem",
    company: "GEM Corporation",
    role: "Middle Front-end Engineer",
    period: "Dec 2024 – Present",
    startYear: 2024,
    endYear: null,
    location: "Ha Noi, Vietnam",
    description:
      "Leading and mentoring a team of 4 developers, conducting code reviews and technical training sessions to ensure code quality and best practices.",
    achievements: [
      "Architected a reusable UI component library focusing on Accessibility (a11y), reducing development time by 30% for new features",
      "Optimized application performance by implementing code-splitting and lazy loading, resulting in a 40% reduction in initial bundle size",
      "Collaborated with NestJS to handle various features of FCM and Firebase",
      "Established a robust testing strategy following the Testing Trophy principle, achieving 85% code coverage using Jest and React Testing Library",
      "Communicated with clients to get solutions and ideas in English",
    ],
    tech: [
      "ReactJS",
      "TypeScript",
      "TanStack Query",
      "Zod",
      "NestJS",
      "Firebase",
      "Jest",
      "React Testing Library",
    ],
    current: true,
  },
  {
    id: "monstarlab",
    company: "Monstarlab Vietnam",
    role: "Front-end Engineer",
    period: "Jan 2021 – Dec 2024",
    startYear: 2021,
    endYear: 2024,
    location: "Ha Noi, Vietnam",
    description:
      "Collaborated with cross-functional teams to develop and implement innovative front-end solutions for web applications, focusing on usability, performance, and scalability.",
    achievements: [
      "Utilized React.js to architect and develop interactive user interfaces, ensuring seamless integration with back-end services",
      "Implemented state management using Redux Toolkit, enhancing application stability and maintainability",
      "Leveraged TypeScript to improve code quality and developer productivity, ensuring type safety and scalability",
      "Established comprehensive test suites using Jest and React Testing Library, ensuring robust code coverage and reliability",
      "Documented components and workflows using Storybook, facilitating collaboration and code reuse across projects",
    ],
    tech: [
      "TypeScript",
      "ReactJS",
      "Redux Toolkit",
      "Jest",
      "React Testing Library",
      "Storybook",
    ],
  },
];
