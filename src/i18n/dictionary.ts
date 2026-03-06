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
    siteTitle: "Henry - Software Engineer",
    titleTemplate: "%s | Henry",
    siteDescription:
      "Software Engineer specializing in TypeScript, React, and distributed systems. Read my blog and explore my open-source projects.",
    ogDescription:
      "Software Engineer specializing in TypeScript, React, and distributed systems.",
  },
  nav: {
    logo: "henry.dev",
    home: "Home",
    blog: "Blog",
    projects: "Projects",
    experience: "Experience",
    contact: "Contact",
    toggleMenu: "Toggle menu",
    languageSwitchLabel: "Switch language",
  },
  footer: {
    tagline: "Building reliable systems and sharing what I learn.",
    navigate: "Navigate",
    connect: "Connect",
    email: "Email",
    copyright: "All rights reserved.",
  },
  common: {
    minRead: "min read",
    code: "Code",
    demo: "Demo",
    status: {
      active: "Active",
      wip: "WIP",
      archived: "Archived",
    },
  },
  home: {
    badge: "Available for senior roles",
    titleLine1: "I build crafted",
    titleHighlight: "user interfaces",
    subtitle:
      "Frontend Engineer specializing in React, Next.js, and complex web applications. I bridge the gap between design and solid engineering to create polished, high-performance web experiences.",
    ctaProjects: "View my work",
    ctaBlog: "Read blog",
    techLabel: "Technologies I work with",
    focusTitle: "What I focus on",
    focusAreas: [
      {
        title: "Interactive Experiences",
        description:
          "Crafting fluid animations, micro-interactions, and engaging user interfaces that feel alive.",
      },
      {
        title: "Design Systems",
        description:
          "Building scalable, accessible, and highly reusable component libraries for growing teams.",
      },
      {
        title: "Web Performance",
        description:
          "Optimizing Core Web Vitals, minimizing bundle sizes, and ensuring 60fps rendering.",
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
      "Collected thoughts on systems design, TypeScript, and engineering culture.",
    title: "Writing",
    subtitle: "{count} articles on systems, TypeScript, and engineering craft.",
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
  },
  projects: {
    metadataTitle: "Projects",
    metadataDescription:
      "Open-source tools and systems I've built. From distributed caches to type-safe libraries.",
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
      "My professional journey and technical expertise. Explore my career timeline and key achievements in front-end engineering and UI/UX architecture.",
    title: "Experience",
    subtitle:
      "4+ years building high-performance, scalable web applications with a focus on React and modern front-end architectures.",
    current: "Current",
    stats: {
      years: "Years experience",
      companies: "Major Companies",
      projects: "Projects Delivered",
      coverage: "Code Coverage",
    },
  },
};

const vi: SiteDictionary = {
  metadata: {
    siteTitle: "Henry - Kỹ sư phần mềm",
    titleTemplate: "%s | Henry",
    siteDescription:
      "Kỹ sư phần mềm tập trung vào TypeScript, React và hệ thống phân tán. Đây là nơi mình chia sẻ góc nhìn kỹ thuật và các dự án mã nguồn mở.",
    ogDescription:
      "Kỹ sư phần mềm chuyên về TypeScript, React và hệ thống phân tán.",
  },
  nav: {
    logo: "henry.dev",
    home: "Trang chủ",
    blog: "Blog",
    projects: "Dự án",
    experience: "Kinh nghiệm",
    contact: "Liên hệ",
    toggleMenu: "Mở/đóng menu",
    languageSwitchLabel: "Chuyển ngôn ngữ",
  },
  footer: {
    tagline: "Xây hệ thống đáng tin cậy và chia sẻ những gì mình học được.",
    navigate: "Điều hướng",
    connect: "Kết nối",
    email: "Email",
    copyright: "Bản quyền đã được bảo hộ.",
  },
  common: {
    minRead: "phút đọc",
    code: "Mã nguồn",
    demo: "Demo",
    status: {
      active: "Đang hoạt động",
      wip: "Đang phát triển",
      archived: "Lưu trữ",
    },
  },
  home: {
    badge: "Sẵn sàng cho vai trò Senior",
    titleLine1: "Tôi xây dựng",
    titleHighlight: "giao diện người dùng chất lượng",
    subtitle:
      "Frontend Engineer chuyên React, Next.js và các ứng dụng web phức tạp. Mình tập trung biến thiết kế thành sản phẩm chạy mượt, sạch và bền trong production.",
    ctaProjects: "Xem dự án",
    ctaBlog: "Đọc blog",
    techLabel: "Công nghệ tôi sử dụng",
    focusTitle: "Trọng tâm của tôi",
    focusAreas: [
      {
        title: "Trải nghiệm tương tác",
        description:
          "Tạo animation mượt, micro-interaction hợp lý và giao diện có chiều sâu, không rối mắt.",
      },
      {
        title: "Design System",
        description:
          "Xây dựng thư viện component nhất quán, dễ mở rộng, đảm bảo a11y và tái sử dụng tốt cho team lớn.",
      },
      {
        title: "Hiệu năng web",
        description:
          "Tối ưu Core Web Vitals, giảm bundle size và giữ rendering ổn định ở mức 60fps.",
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
      "Góc nhìn về thiết kế hệ thống, TypeScript và văn hóa kỹ thuật.",
    title: "Bài viết",
    subtitle:
      "{count} bài viết về hệ thống, TypeScript và những bài học thực chiến trong nghề.",
    searchPlaceholder: "Tìm bài viết...",
    searchAria: "Tìm bài viết",
    allTag: "Tất cả",
    noMatch: "Không tìm thấy bài viết phù hợp với từ khóa hoặc tag đang chọn.",
    clearFilters: "Xóa bộ lọc",
    read: "Đọc",
    backToBlog: "Quay lại blog",
    usefulText: "Thấy hữu ích? Hãy chia sẻ hoặc",
    onTwitter: "nhắn cho tôi trên Twitter",
    allArticles: "Tất cả bài viết",
    copyCode: "Sao chép mã",
  },
  projects: {
    metadataTitle: "Dự án",
    metadataDescription:
      "Các công cụ và hệ thống mã nguồn mở mình đã xây dựng, từ cache phân tán đến thư viện type-safe.",
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
      "Hành trình làm nghề và những cột mốc kỹ thuật của mình trong frontend engineering và kiến trúc UI/UX.",
    title: "Kinh nghiệm",
    subtitle:
      "Hơn 4 năm xây dựng ứng dụng web hiệu năng cao, dễ mở rộng, với React và kiến trúc frontend hiện đại.",
    current: "Hiện tại",
    stats: {
      years: "Năm kinh nghiệm",
      companies: "Công ty lớn",
      projects: "Dự án đã giao",
      coverage: "Độ phủ kiểm thử",
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
