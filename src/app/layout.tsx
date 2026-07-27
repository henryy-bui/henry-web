import type { Metadata, Viewport } from "next";
import "./globals.css";
import { Analytics } from "@vercel/analytics/next";
import ThemeScript from "@/components/ThemeScript";

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#fbfbfd" },
    { media: "(prefers-color-scheme: dark)", color: "#0a0a0b" },
  ],
};

export const metadata: Metadata = {
  metadataBase: new URL("https://habui.click/"),
  icons: {
    icon: [{ url: "/icon.svg", type: "image/svg+xml" }],
    apple: [{ url: "/apple-icon.svg", type: "image/svg+xml" }],
    shortcut: ["/icon.svg"],
  },
  title: {
    default: "Ha Bui — Software Engineer",
    template: "%s | Ha Bui",
  },
  description:
    "Software Engineer specializing in TypeScript, React, and distributed systems. Read my blog and explore my open-source projects.",
  keywords: [
    "software engineer",
    "typescript",
    "react",
    "next.js",
    "portfolio",
    "blog",
    "distributed systems",
  ],
  authors: [{ name: "Ha Bui" }],
  creator: "Ha Bui",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://habui.click/",
    siteName: "Ha Bui",
    title: "Ha Bui — Software Engineer",
    description:
      "Software Engineer specializing in TypeScript, React, and distributed systems.",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "Ha Bui — Software Engineer Portfolio",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Ha Bui — Software Engineer",
    description:
      "Software Engineer specializing in TypeScript, React, and distributed systems.",
    creator: "@Ha Bui",
    images: ["/og-image.png"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" data-theme="dark" suppressHydrationWarning>
      <head>
        <ThemeScript />
      </head>
      <body>
        {children}
        <Analytics />
      </body>
    </html>
  );
}
