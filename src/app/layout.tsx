import type { Metadata } from "next";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import "prismjs/themes/prism-tomorrow.css";

export const metadata: Metadata = {
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
  ],
  authors: [{ name: "Henry" }],
  openGraph: {
    type: "website",
    locale: "en_US",
    siteName: "Henry",
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
      </body>
    </html>
  );
}
