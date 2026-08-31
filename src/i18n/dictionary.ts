import { defaultLocale, type Locale } from "./config";

export type SiteDictionary = {
  metadata: {
    siteTitle: string;
    titleTemplate: string;
    siteDescription: string;
    ogDescription: string;
  };
  nav: {
    logo: string;
    home: string;
    blog: string;
    projects: string;
    experience: string;
    contact: string;
    toggleMenu: string;
    languageSwitchLabel: string;
    themeSwitchLabel: string;
  };
  footer: {
    tagline: string;
    navigate: string;
    connect: string;
    email: string;
    copyright: string;
  };
  common: {
    minRead: string;
    code: string;
    demo: string;
    scrollToTop: string;
    status: Record<"active" | "wip" | "archived", string>;
  };
  home: {
    badge: string;
    titleLine1: string;
    titleHighlight: string;
    subtitle: string;
    ctaProjects: string;
    ctaBlog: string;
    techLabel: string;
    focusTitle: string;
    focusAreas: Array<{ title: string; description: string }>;
    featuredTitle: string;
    seeAll: string;
    recentTitle: string;
    allPosts: string;
  };
  blog: {
    metadataTitle: string;
    metadataDescription: string;
    title: string;
    subtitle: string;
    searchPlaceholder: string;
    searchAria: string;
    allTag: string;
    noMatch: string;
    clearFilters: string;
    read: string;
    backToBlog: string;
    usefulText: string;
    onTwitter: string;
    allArticles: string;
    copyCode: string;
    copiedCode: string;
    relatedArticles: string;
    recentArticles: string;
    narrowerLayout: string;
  };
  projects: {
    metadataTitle: string;
    metadataDescription: string;
    title: string;
    subtitle: string;
    featured: string;
    otherWork: string;
    ariaGithub: string;
    ariaDemo: string;
  };
  experience: {
    metadataTitle: string;
    metadataDescription: string;
    title: string;
    subtitle: string;
    current: string;
    stats: {
      years: string;
      companies: string;
      projects: string;
      coverage: string;
    };
  };
};

const en: SiteDictionary = {
  metadata: {
    siteTitle: "Ha Bui - Front-end Engineer",
    titleTemplate: "%s | Ha Bui",
    siteDescription:
      "Front-end engineer working in React, TypeScript, and Next.js. Projects I have built, and notes on the problems behind them.",
    ogDescription:
      "Front-end engineer working in React, TypeScript, and Next.js.",
  },
  nav: {
    logo: "habui.click",
    home: "Home",
    blog: "Blog",
    projects: "Projects",
    experience: "Experience",
    contact: "Contact",
    toggleMenu: "Toggle menu",
    languageSwitchLabel: "Switch language",
    themeSwitchLabel: "Switch theme",
  },
  footer: {
    tagline:
      "Front-end engineer in Hanoi. Notes on the work, mostly React and TypeScript.",
    navigate: "Navigate",
    connect: "Connect",
    email: "Email",
    copyright: "All rights reserved.",
  },
  common: {
    minRead: "min read",
    code: "Code",
    demo: "Demo",
    scrollToTop: "Scroll to top",
    status: {
      active: "Active",
      wip: "WIP",
      archived: "Archived",
    },
  },
  home: {
    badge: "Open to new work",
    titleLine1: "Hello.",
    titleHighlight: "I'm Ha Bui, a front-end engineer",
    subtitle:
      "I build web applications with React, TypeScript, and Next.js. Day to day that means component libraries, data-fetching and state layers, and the performance and accessibility work that follows a release.",
    ctaProjects: "View my work",
    ctaBlog: "Read blog",
    techLabel: "Technologies I work with",
    focusTitle: "What I focus on",
    focusAreas: [
      {
        title: "Component libraries",
        description:
          "Shared UI kept as a versioned package: typed props, keyboard and screen-reader support, and Storybook docs so another team can adopt it without a handover.",
      },
      {
        title: "State and data flow",
        description:
          "Server state in TanStack Query, validation at the boundary with Zod, local state kept small. Most UI bugs turn out to be state bugs, so this is where the time goes.",
      },
      {
        title: "Performance and accessibility",
        description:
          "Measure first with bundle analysis, the React Profiler, and Lighthouse. Then code-splitting, narrowing re-renders, and fixing what an a11y audit turns up.",
      },
    ],
    featuredTitle: "Featured Projects",
    seeAll: "See all",
    recentTitle: "Recent Writing",
    allPosts: "All posts",
  },
  blog: {
    metadataTitle: "Blog",
    metadataDescription:
      "Notes on React, TypeScript, and how the browser actually runs them.",
    title: "Writing",
    subtitle: "{count} posts on React, TypeScript, and the browser.",
    searchPlaceholder: "Search articles...",
    searchAria: "Search articles",
    allTag: "All",
    noMatch: "No articles match your search.",
    clearFilters: "Clear filters",
    read: "Read",
    backToBlog: "Back to blog",
    usefulText: "Found this useful? Share it or",
    onTwitter: "let me know on Twitter",
    allArticles: "All articles",
    copyCode: "Copy code",
    copiedCode: "Copied",
    relatedArticles: "Related articles",
    recentArticles: "Recent articles",
    narrowerLayout: "Narrower",
  },
  projects: {
    metadataTitle: "Projects",
    metadataDescription:
      "Tools and libraries I have built, and the reasoning behind each one.",
    title: "Projects",
    subtitle:
      "Things I've built. Mostly open-source. Some in production, some experiments.",
    featured: "Featured",
    otherWork: "Other work",
    ariaGithub: "GitHub",
    ariaDemo: "Demo",
  },
  experience: {
    metadataTitle: "Experience",
    metadataDescription:
      "Where I have worked, what I built there, and the stack I used.",
    title: "Experience",
    subtitle:
      "React front ends, mostly in long-lived product codebases rather than greenfield.",
    current: "Current",
    stats: {
      years: "Years experience",
      companies: "Companies",
      projects: "Projects shipped",
      coverage: "Test coverage, current team",
    },
  },
};

const vi: SiteDictionary = {
  metadata: {
    siteTitle: "Hà Bùi - Kỹ sư front-end",
    titleTemplate: "%s | Hà Bùi",
    siteDescription:
      "Kỹ sư front-end làm việc với React, TypeScript và Next.js. Đây là các dự án mình đã làm và ghi chép về những vấn đề đằng sau chúng.",
    ogDescription: "Kỹ sư front-end làm việc với React, TypeScript và Next.js.",
  },
  nav: {
    logo: "habui.click",
    home: "Trang chủ",
    blog: "Blog",
    projects: "Dự án",
    experience: "Kinh nghiệm",
    contact: "Liên hệ",
    toggleMenu: "Mở/đóng menu",
    languageSwitchLabel: "Chuyển ngôn ngữ",
    themeSwitchLabel: "Đổi giao diện sáng/tối",
  },
  footer: {
    tagline:
      "Kỹ sư front-end tại Hà Nội. Ghi chép về công việc, chủ yếu là React và TypeScript.",
    navigate: "Điều hướng",
    connect: "Kết nối",
    email: "Email",
    copyright: "Bản quyền đã được bảo hộ.",
  },
  common: {
    minRead: "phút đọc",
    code: "Mã nguồn",
    demo: "Demo",
    scrollToTop: "Lên đầu trang",
    status: {
      active: "Đang hoạt động",
      wip: "Đang phát triển",
      archived: "Lưu trữ",
    },
  },
  home: {
    badge: "Sẵn sàng nhận dự án mới",
    titleLine1: "Xin chào.",
    titleHighlight: "Mình là Hà Bùi, kỹ sư front-end",
    subtitle:
      "Mình làm ứng dụng web với React, TypeScript và Next.js. Công việc hằng ngày xoay quanh thư viện component, lớp state và data-fetching, cùng phần tối ưu hiệu năng và a11y sau mỗi lần release.",
    ctaProjects: "Xem dự án",
    ctaBlog: "Đọc blog",
    techLabel: "Công nghệ mình dùng",
    focusTitle: "Mình tập trung vào",
    focusAreas: [
      {
        title: "Thư viện component",
        description:
          "UI dùng chung được đóng thành package có version: props có kiểu rõ ràng, hỗ trợ bàn phím và screen reader, tài liệu bằng Storybook để team khác dùng được mà không cần bàn giao.",
      },
      {
        title: "State và luồng dữ liệu",
        description:
          "Server state để TanStack Query lo, validate ở biên bằng Zod, local state giữ càng nhỏ càng tốt. Phần lớn bug giao diện thật ra là bug state, nên đây là chỗ mình dành nhiều thời gian nhất.",
      },
      {
        title: "Hiệu năng và a11y",
        description:
          "Đo trước đã: phân tích bundle, React Profiler, Lighthouse. Sau đó mới code-splitting, thu hẹp phạm vi re-render và xử lý những lỗi a11y mà bản audit chỉ ra.",
      },
    ],
    featuredTitle: "Dự án nổi bật",
    seeAll: "Xem tất cả",
    recentTitle: "Bài viết mới",
    allPosts: "Tất cả bài viết",
  },
  blog: {
    metadataTitle: "Blog",
    metadataDescription:
      "Ghi chép về React, TypeScript và cách trình duyệt thật sự chạy chúng.",
    title: "Bài viết",
    subtitle: "{count} bài viết về React, TypeScript và trình duyệt.",
    searchPlaceholder: "Tìm bài viết...",
    searchAria: "Tìm bài viết",
    allTag: "Tất cả",
    noMatch: "Không tìm thấy bài viết phù hợp với từ khóa hoặc tag đang chọn.",
    clearFilters: "Xóa bộ lọc",
    read: "Đọc",
    backToBlog: "Quay lại blog",
    usefulText: "Thấy hữu ích? Hãy chia sẻ hoặc",
    onTwitter: "nhắn cho mình trên Twitter",
    allArticles: "Tất cả bài viết",
    copyCode: "Sao chép mã",
    copiedCode: "Đã sao chép",
    relatedArticles: "Bài viết liên quan",
    recentArticles: "Bài viết gần đây",
    narrowerLayout: "Hẹp hơn",
  },
  projects: {
    metadataTitle: "Dự án",
    metadataDescription:
      "Các công cụ và thư viện mình đã xây, kèm lý do đằng sau từng cái.",
    title: "Dự án",
    subtitle:
      "Những thứ mình đã build. Đa phần là mã nguồn mở; có dự án đang chạy production, cũng có thứ để thử nghiệm ý tưởng mới.",
    featured: "Nổi bật",
    otherWork: "Dự án khác",
    ariaGithub: "GitHub",
    ariaDemo: "Demo",
  },
  experience: {
    metadataTitle: "Kinh nghiệm",
    metadataDescription:
      "Những nơi mình đã làm, đã xây gì ở đó và dùng stack nào.",
    title: "Kinh nghiệm",
    subtitle:
      "Làm front-end với React, chủ yếu trên các codebase sản phẩm chạy lâu dài chứ không phải dự án dựng mới.",
    current: "Hiện tại",
    stats: {
      years: "Năm kinh nghiệm",
      companies: "Công ty",
      projects: "Dự án đã giao",
      coverage: "Độ phủ test, team hiện tại",
    },
  },
};

const dictionaries: Record<Locale, SiteDictionary> = {
  en,
  vi,
};

export function getDictionary(locale: Locale): SiteDictionary {
  return dictionaries[locale] ?? dictionaries[defaultLocale];
}
