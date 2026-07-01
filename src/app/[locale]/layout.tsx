import Link from "next/link";
import { notFound } from "next/navigation";
import { isLocale, localeLabels, locales, uiCopy } from "@/lib/i18n";
import { localeHomeRoute } from "@/lib/routes";

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export default async function LocaleLayout({
  children,
  params,
}: LayoutProps<"/[locale]">) {
  const { locale } = await params;

  if (!isLocale(locale)) {
    notFound();
  }

  const copy = uiCopy[locale];

  return (
    <div className="flex-1 py-6 md:py-10">
      <header className="hub-shell mb-6 flex items-center justify-between rounded-2xl border border-[var(--border)] bg-[var(--surface)] px-5 py-4 shadow-sm">
        <Link href={localeHomeRoute(locale)} className="text-lg font-semibold tracking-tight">
          React Learning Hub
        </Link>
        <nav className="flex gap-2" aria-label={copy.languageSwitcherLabel}>
          {locales.map((item) => (
            <Link
              key={item}
              href={localeHomeRoute(item)}
              aria-current={item === locale ? "page" : undefined}
              className={`rounded-full border px-3 py-1 text-sm transition ${
                item === locale
                  ? "border-[var(--primary)] bg-[var(--primary)] text-white"
                  : "border-[var(--border)] bg-white"
              }`}
            >
              {localeLabels[item]}
            </Link>
          ))}
        </nav>
      </header>
      {children}
    </div>
  );
}
