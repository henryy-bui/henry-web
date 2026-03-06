import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { getDictionary } from "@/i18n/dictionary";
import { isLocale, locales, type Locale } from "@/i18n/config";
import { buildLocalizedMetadata } from "@/i18n/seo";

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

  return {
    ...buildLocalizedMetadata({
      locale,
      path: "/",
      title: dict.metadata.siteTitle,
      description: dict.metadata.ogDescription,
      keywords: ["software engineer", "react", "next.js", "typescript"],
      imagePath: `/${locale}/opengraph-image`,
    }),
    title: {
      default: dict.metadata.siteTitle,
      template: dict.metadata.titleTemplate,
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
    <div className={`locale-shell locale-${locale}`}>
      <Navbar locale={locale as Locale} dictionary={dict} />
      <main lang={locale}>{children}</main>
      <Footer locale={locale as Locale} dictionary={dict} />
    </div>
  );
}
