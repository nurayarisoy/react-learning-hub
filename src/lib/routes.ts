import type { Route } from "next";
import type { Locale } from "@/lib/i18n";

export function localeHomeRoute(locale: Locale): Route {
  return `/${locale}` as Route;
}

export function lessonsRoute(locale: Locale): Route {
  return `/${locale}/lessons` as Route;
}

export function lessonDetailRoute(locale: Locale, slug: string): Route {
  return `/${locale}/lessons/${slug}` as Route;
}