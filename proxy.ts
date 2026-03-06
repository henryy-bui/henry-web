import { NextRequest, NextResponse } from "next/server";
import {
  defaultLocale,
  isLocale,
  localeCookieName,
  locales,
  type Locale,
} from "@/i18n/config";

function detectLocale(request: NextRequest): Locale {
  const cookieLocale = request.cookies.get(localeCookieName)?.value;
  if (cookieLocale && isLocale(cookieLocale)) {
    return cookieLocale;
  }

  const acceptLanguage = request.headers.get("accept-language") ?? "";
  const normalized = acceptLanguage.toLowerCase();

  if (normalized.includes("vi")) {
    return "vi";
  }

  return defaultLocale;
}

export function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const segment = pathname.split("/").filter(Boolean)[0];

  const hasLocalePrefix = locales.some(
    (locale) => pathname === `/${locale}` || pathname.startsWith(`/${locale}/`)
  );

  if (hasLocalePrefix) {
    const response = NextResponse.next();
    if (segment && isLocale(segment)) {
      response.cookies.set(localeCookieName, segment, {
        path: "/",
        sameSite: "lax",
      });
    }
    return response;
  }

  const locale = detectLocale(request);
  const url = request.nextUrl.clone();
  url.pathname = `/${locale}${pathname}`;

  const response = NextResponse.redirect(url);
  response.cookies.set(localeCookieName, locale, {
    path: "/",
    sameSite: "lax",
  });

  return response;
}

export const config = {
  matcher: [
    "/((?!api|_next/static|_next/image|favicon.ico|sitemap.xml|robots.txt|.*\\..*).*)",
  ],
};
