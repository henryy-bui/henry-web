import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { getDictionary } from "@/i18n/dictionary";
import { isLocale, locales, type Locale } from "@/i18n/config";

interface LocaleLayoutProps {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export async function generateMetadata({
  params,
}: Omit<LocaleLayoutProps, "children">): Promise<Metadata> {
  const { locale } = await params;
  if (!isLocale(locale)) {
    return {};
  }

  const dict = getDictionary(locale);
  const localeTag = locale === "vi" ? "vi_VN" : "en_US";

  return {
    title: {
      default: dict.metadata.siteTitle,
      template: dict.metadata.titleTemplate,
    },
    description: dict.metadata.siteDescription,
    alternates: {
      languages: {
        en: "/en",
        vi: "/vi",
      },
    },
    openGraph: {
      type: "website",
      locale: localeTag,
      siteName: "Henry",
      title: dict.metadata.siteTitle,
      description: dict.metadata.ogDescription,
      images: [
        {
          url: "/og-image.png",
          width: 1200,
          height: 630,
          alt: "Henry - Software Engineer Portfolio",
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: dict.metadata.siteTitle,
      description: dict.metadata.ogDescription,
      creator: "@henry",
      images: ["/og-image.png"],
    },
  };
}

export default async function LocaleLayout({
  children,
  params,
}: LocaleLayoutProps) {
  const { locale } = await params;

  if (!isLocale(locale)) {
    notFound();
  }

  const dict = getDictionary(locale as Locale);

  return (
    <>
      <Navbar locale={locale as Locale} dictionary={dict} />
      <main>{children}</main>
      <Footer locale={locale as Locale} dictionary={dict} />
    </>
  );
}
