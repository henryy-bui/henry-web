import type { Locale } from "@/i18n/config";

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

const enExperiences: Experience[] = [
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

const viExperiences: Experience[] = [
  {
    id: "gem",
    company: "GEM Corporation",
    role: "Middle Front-end Engineer",
    period: "Tháng 12/2024 - Hiện tại",
    startYear: 2024,
    endYear: null,
    location: "Hà Nội, Việt Nam",
    description:
      "Dẫn dắt và mentoring nhóm 4 lập trình viên, review code và tổ chức các buổi chia sẻ kỹ thuật để giữ chất lượng chung của team.",
    achievements: [
      "Thiết kế kiến trúc thư viện UI component tái sử dụng, chú trọng a11y, giúp giảm 30% thời gian phát triển tính năng mới",
      "Tối ưu hiệu năng bằng code-splitting và lazy loading, giảm 40% kích thước bundle ban đầu",
      "Phối hợp cùng team backend (NestJS) triển khai các tính năng liên quan đến FCM và Firebase",
      "Xây dựng chiến lược kiểm thử theo Testing Trophy, đạt 85% độ phủ với Jest và React Testing Library",
      "Trao đổi trực tiếp với khách hàng bằng tiếng Anh để chốt giải pháp và hướng triển khai",
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
    period: "Tháng 01/2021 - Tháng 12/2024",
    startYear: 2021,
    endYear: 2024,
    location: "Hà Nội, Việt Nam",
    description:
      "Phối hợp cùng các nhóm đa chức năng để xây dựng giải pháp frontend cho ứng dụng web, tập trung vào tính dễ dùng, hiệu năng và khả năng mở rộng.",
    achievements: [
      "Xây dựng giao diện tương tác bằng React.js, tích hợp mượt với dịch vụ backend",
      "Triển khai quản lý state với Redux Toolkit, nâng cao độ ổn định và khả năng bảo trì",
      "Ứng dụng TypeScript để cải thiện chất lượng code và tăng năng suất phát triển",
      "Xây dựng bộ test với Jest và React Testing Library để tăng độ tin cậy khi release",
      "Tài liệu hóa component và workflow bằng Storybook, giúp tăng tốc hợp tác và tái sử dụng giữa các dự án",
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

export function getExperiences(locale: Locale): Experience[] {
  return locale === "vi" ? viExperiences : enExperiences;
}
