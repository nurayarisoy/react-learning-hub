"use client";

import { useEffect } from "react";

export default function LocaleError({
  error,
  unstable_retry,
}: {
  error: Error & { digest?: string };
  unstable_retry: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <main id="main-content" className="hub-shell">
      <section className="hub-card p-6">
        <h1 className="text-2xl font-bold">Something went wrong</h1>
        <p className="mt-2 text-sm text-[var(--muted)]">
          Please try again. If the issue persists, open an issue with the error digest.
        </p>
        {error.digest ? (
          <p className="mt-2 text-xs text-[var(--muted)]">Digest: {error.digest}</p>
        ) : null}
        <button
          type="button"
          onClick={() => unstable_retry()}
          className="mt-4 rounded-full bg-[var(--primary)] px-4 py-2 text-sm font-semibold text-white transition hover:bg-[var(--primary-strong)]"
        >
          Try again
        </button>
      </section>
    </main>
  );
}
