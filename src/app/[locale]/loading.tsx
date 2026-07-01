export default function LocaleLoading() {
  return (
    <main id="main-content" className="hub-shell" aria-busy="true" aria-live="polite">
      <section className="hub-card p-6">
        <div className="h-6 w-40 animate-pulse rounded bg-[var(--surface-strong)]" />
        <div className="mt-4 h-4 w-full animate-pulse rounded bg-[var(--surface-strong)]" />
        <div className="mt-2 h-4 w-3/4 animate-pulse rounded bg-[var(--surface-strong)]" />
      </section>
    </main>
  );
}
