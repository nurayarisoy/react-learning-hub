import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { EmptyState } from "@/components/learning/EmptyState";
import { LessonCard } from "@/components/learning/LessonCard";
import { getLessonIndex } from "@/lib/content";
import { isLocale, uiCopy } from "@/lib/i18n";
import { lessonDetailRoute } from "@/lib/routes";

export async function generateMetadata({
  params,
}: {
  params: PageProps<"/[locale]/lessons">["params"];
}): Promise<Metadata> {
  const { locale } = await params;

  if (!isLocale(locale)) {
    return {
      title: "Not Found",
    };
  }

  return {
    title: `${uiCopy[locale].lessonsTitle} | ${uiCopy[locale].title}`,
    description: uiCopy[locale].subtitle,
  };
}

export default async function LessonListPage({
  params,
}: {
  params: PageProps<"/[locale]/lessons">["params"];
}) {
  const { locale } = await params;

  if (!isLocale(locale)) {
    notFound();
  }

  const lessons = await getLessonIndex(locale);
  const copy = uiCopy[locale];

  return (
    <main id="main-content" className="hub-shell">
      <section className="hub-card p-6">
        <h1 className="text-2xl font-bold">{copy.lessonIndexTitle}</h1>
        {lessons.length === 0 ? (
          <div className="mt-4">
            <EmptyState title={copy.noLessonsTitle} description={copy.noLessonsDescription} />
          </div>
        ) : (
          <ul className="mt-4 space-y-3">
            {lessons.map((lesson) => (
              <li key={lesson.slug}>
                <LessonCard
                  href={lessonDetailRoute(locale, lesson.slug)}
                  lesson={lesson}
                  durationLabel={copy.lessonDurationSuffix}
                />
              </li>
            ))}
          </ul>
        )}
      </section>
    </main>
  );
}
