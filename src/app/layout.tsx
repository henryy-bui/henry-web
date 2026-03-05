import type { Metadata } from "next";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Analytics } from "@vercel/analytics/next";
import "prismjs/themes/prism-tomorrow.css";

export const metadata: Metadata = {
  metadataBase: new URL("https://habui.click/"),
  title: {
    default: "Henry — Software Engineer",
    template: "%s | Henry",
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
  authors: [{ name: "Henry" }],
  creator: "Henry",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://habui.click/",
    siteName: "Henry",
    title: "Henry — Software Engineer",
    description:
      "Software Engineer specializing in TypeScript, React, and distributed systems.",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "Henry — Software Engineer Portfolio",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Henry — Software Engineer",
    description:
      "Software Engineer specializing in TypeScript, React, and distributed systems.",
    creator: "@henry",
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
    <html lang="en">
      <body>
        <Navbar />
        <main>{children}</main>
        <Footer />
        <Analytics />
      </body>
    </html>
  );
}
