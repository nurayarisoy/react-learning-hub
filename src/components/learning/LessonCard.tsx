import Link from "next/link";
import type { Route } from "next";
import type { LessonIndexItem } from "@/types/learning";

interface LessonCardProps {
  href: Route;
  lesson: LessonIndexItem;
  durationLabel: string;
}

export function LessonCard({ href, lesson, durationLabel }: LessonCardProps) {
  return (
    <Link
      href={href}
      className="block rounded-xl border border-[var(--border)] bg-white p-4 transition hover:border-[var(--primary)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--primary)]"
    >
      <div className="font-semibold">{lesson.title}</div>
      <p className="text-sm text-[var(--muted)]">{lesson.summary}</p>
      <div className="mt-2 text-xs uppercase tracking-wide text-[var(--muted)]">
        {lesson.difficulty} - {lesson.estimatedMinutes} {durationLabel}
      </div>
    </Link>
  );
}
