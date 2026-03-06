import type { Metadata } from "next";
import { defaultLocale, locales, type Locale } from "./config";

export const SITE_URL = "https://habui.click";

const OG_LOCALE: Record<Locale, string> = {
  en: "en_US",
  vi: "vi_VN",
};

function normalizePath(path: string) {
  if (!path) {
    return "/";
  }

  return path.startsWith("/") ? path : `/${path}`;
}

export function getLocalizedPath(locale: Locale, path = "/") {
  const normalized = normalizePath(path);
  return normalized === "/" ? `/${locale}` : `/${locale}${normalized}`;
}

export function getLocalizedUrl(locale: Locale, path = "/") {
  return `${SITE_URL}${getLocalizedPath(locale, path)}`;
}

export function getLocaleAlternates(path = "/") {
  const languages: Record<string, string> = {};

  for (const locale of locales) {
    languages[locale] = getLocalizedPath(locale, path);
  }

  languages["x-default"] = getLocalizedPath(defaultLocale, path);

  return languages;
}

interface PageMetadataOptions {
  locale: Locale;
  path: string;
  title: string;
  description: string;
  keywords?: string[];
  type?: "website" | "article";
  imagePath?: string;
  imageAlt?: string;
}

function toAbsoluteUrl(urlOrPath: string): string {
  if (urlOrPath.startsWith("http://") || urlOrPath.startsWith("https://")) {
    return urlOrPath;
  }

  const normalized = urlOrPath.startsWith("/") ? urlOrPath : `/${urlOrPath}`;
  return `${SITE_URL}${normalized}`;
}

export function buildLocalizedMetadata({
  locale,
  path,
  title,
  description,
  keywords,
  type = "website",
  imagePath = "/og-image.png",
  imageAlt = "Henry - Software Engineer Portfolio",
}: PageMetadataOptions): Metadata {
  const localeAlternates = getLocaleAlternates(path);
  const imageUrl = toAbsoluteUrl(imagePath);

  return {
    title,
    description,
    keywords,
    alternates: {
      canonical: getLocalizedPath(locale, path),
      languages: localeAlternates,
    },
    openGraph: {
      type,
      url: getLocalizedUrl(locale, path),
      locale: OG_LOCALE[locale],
      alternateLocale: locales
        .filter((availableLocale) => availableLocale !== locale)
        .map((availableLocale) => OG_LOCALE[availableLocale]),
      siteName: "Henry",
      title,
      description,
      images: [
        {
          url: imageUrl,
          width: 1200,
          height: 630,
          alt: imageAlt,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      creator: "@henry",
      images: [
        {
          url: imageUrl,
          alt: imageAlt,
        },
      ],
    },
  };
}
