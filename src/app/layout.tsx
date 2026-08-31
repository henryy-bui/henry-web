import type { Metadata, Viewport } from "next";
import "./globals.css";
import { Analytics } from "@vercel/analytics/next";
import ThemeScript from "@/components/ThemeScript";

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#fcfcfd" },
    { media: "(prefers-color-scheme: dark)", color: "#0c0c0d" },
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
    default: "Hà Bùi — Software Engineer",
    template: "%s | Hà Bùi",
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
  authors: [{ name: "Hà Bùi" }],
  creator: "Hà Bùi",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://habui.click/",
    siteName: "Hà Bùi",
    title: "Hà Bùi — Software Engineer",
    description:
      "Software Engineer specializing in TypeScript, React, and distributed systems.",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "Hà Bùi — Software Engineer Portfolio",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Hà Bùi — Software Engineer",
    description:
      "Software Engineer specializing in TypeScript, React, and distributed systems.",
    creator: "@Hà Bùi",
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
