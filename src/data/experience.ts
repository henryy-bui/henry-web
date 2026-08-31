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
      "Front-end lead on a team of four: code review, technical onboarding, and the architecture calls that stay around after a feature ships.",
    achievements: [
      "Built the shared component library the product teams work from, with typed props, keyboard and screen-reader support, and Storybook docs",
      "Brought the initial bundle down by about 40% with route-level code-splitting and lazy-loading the heaviest screens",
      "Worked with the NestJS back end on Firebase Cloud Messaging and the surrounding Firebase integration",
      "Set up the testing strategy along Testing Trophy lines with Jest and React Testing Library, holding around 85% coverage",
      "Ran requirement and solution discussions with clients in English",
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
      "Front-end work across client projects, usually sitting in the same team as back end and design rather than handing work over a wall.",
    achievements: [
      "Built product interfaces in React against the team's back-end services",
      "Moved state onto Redux Toolkit, which cut the boilerplate and made the async flows easier to follow",
      "Introduced TypeScript to the codebase, which caught most prop-shape mistakes before review",
      "Wrote the Jest and React Testing Library suites, starting with the flows that broke most often",
      "Documented components in Storybook so designers could review states without running a build",
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
      "Phụ trách front-end cho team bốn người: review code, onboard kỹ thuật và những quyết định kiến trúc còn ở lại sau khi tính năng đã lên.",
    achievements: [
      "Xây thư viện component dùng chung cho các team sản phẩm: props có kiểu rõ ràng, hỗ trợ bàn phím và screen reader, tài liệu bằng Storybook",
      "Giảm khoảng 40% bundle ban đầu bằng code-splitting theo route và lazy-load những màn hình nặng nhất",
      "Làm việc với back end NestJS cho Firebase Cloud Messaging và phần tích hợp Firebase liên quan",
      "Dựng chiến lược test theo hướng Testing Trophy với Jest và React Testing Library, giữ độ phủ quanh mức 85%",
      "Trao đổi yêu cầu và phương án trực tiếp với khách hàng bằng tiếng Anh",
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
      "Làm front-end cho các dự án khách hàng, thường ngồi chung team với back end và design thay vì bàn giao qua lại.",
    achievements: [
      "Dựng giao diện sản phẩm bằng React, làm việc trực tiếp với các service back end của team",
      "Chuyển state sang Redux Toolkit, giảm boilerplate và làm luồng async dễ theo dõi hơn",
      "Đưa TypeScript vào codebase, bắt được phần lớn lỗi sai shape của props trước khi review",
      "Viết bộ test bằng Jest và React Testing Library, bắt đầu từ những luồng hay hỏng nhất",
      "Tài liệu hóa component bằng Storybook để designer xem được các state mà không cần chạy build",
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
