import Link from "next/link";
import { defaultLocale } from "@/lib/i18n";

export default function LocaleNotFound() {
  return (
    <main id="main-content" className="hub-shell">
      <section className="hub-card p-6">
        <h1 className="text-2xl font-bold">Page not found</h1>
        <p className="mt-2 text-sm text-[var(--muted)]">
          The requested page does not exist for this locale.
        </p>
        <Link
          href={`/${defaultLocale}`}
          className="mt-4 inline-flex rounded-full bg-[var(--primary)] px-4 py-2 text-sm font-semibold text-white transition hover:bg-[var(--primary-strong)]"
        >
          Go to home
        </Link>
      </section>
    </main>
  );
}
