import type { Metadata, Viewport } from "next";
import "./globals.css";
import { Analytics } from "@vercel/analytics/next";
import ThemeScript from "@/components/ThemeScript";

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#faf9f5" },
    { media: "(prefers-color-scheme: dark)", color: "#1f1e1d" },
  ],
};

export const metadata: Metadata = {
  metadataBase: new URL("https://habui.tech/"),
  icons: {
    icon: [{ url: "/icon.svg", type: "image/svg+xml" }],
    apple: [{ url: "/apple-icon.svg", type: "image/svg+xml" }],
    shortcut: ["/icon.svg"],
  },
  title: {
    default: "Hà Bùi — Front-end Engineer",
    template: "%s | Hà Bùi",
  },
  description:
    "Front-end engineer working in React, TypeScript, and Next.js. Projects I have built, and notes on the problems behind them.",
  keywords: [
    "front-end engineer",
    "typescript",
    "react",
    "next.js",
    "portfolio",
    "blog",
  ],
  authors: [{ name: "Hà Bùi" }],
  creator: "Hà Bùi",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://habui.tech/",
    siteName: "Hà Bùi",
    title: "Hà Bùi — Front-end Engineer",
    description:
      "Front-end engineer working in React, TypeScript, and Next.js.",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "Hà Bùi — Front-end Engineer",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Hà Bùi — Front-end Engineer",
    description:
      "Front-end engineer working in React, TypeScript, and Next.js.",
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
        {/* The three families come in through one @import in globals.css;
            opening the connections early keeps that from serializing. */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin=""
        />
        <ThemeScript />
      </head>
      <body>
        {children}
        <Analytics />
      </body>
    </html>
  );
}
