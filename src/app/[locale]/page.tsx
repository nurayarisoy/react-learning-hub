import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { EmptyState } from "@/components/learning/EmptyState";
import { ExercisePreview } from "@/components/learning/ExercisePreview";
import { LessonCard } from "@/components/learning/LessonCard";
import { QuizPreview } from "@/components/learning/QuizPreview";
import { getLessonIndex } from "@/lib/content";
import { getFeaturedExercise, getFeaturedQuiz } from "@/lib/learning";
import { isLocale, uiCopy } from "@/lib/i18n";
import { lessonDetailRoute, lessonsRoute } from "@/lib/routes";

export async function generateMetadata({
  params,
}: {
  params: PageProps<"/[locale]">["params"];
}): Promise<Metadata> {
  const { locale } = await params;

  if (!isLocale(locale)) {
    return {
      title: "Not Found",
    };
  }

  return {
    title: `${uiCopy[locale].title} | Home`,
    description: uiCopy[locale].subtitle,
  };
}

export default async function LocaleHome({
  params,
}: {
  params: PageProps<"/[locale]">["params"];
}) {
  const { locale } = await params;

  if (!isLocale(locale)) {
    notFound();
  }

  const copy = uiCopy[locale];
  const lessons = await getLessonIndex(locale);
  const sampleQuiz = getFeaturedQuiz(locale);
  const sampleExercise = getFeaturedExercise(locale);

  return (
    <main id="main-content" className="hub-shell space-y-6">
      <section className="hub-card p-6 md:p-8">
        <p className="mb-2 inline-flex rounded-full bg-[var(--surface-strong)] px-3 py-1 text-sm font-medium text-[var(--muted)]">
          Next.js + MDX + i18n
        </p>
        <h1 className="text-3xl font-bold leading-tight md:text-5xl">{copy.title}</h1>
        <p className="mt-4 max-w-2xl text-base text-[var(--muted)] md:text-lg">{copy.subtitle}</p>
        <div className="mt-6 flex flex-wrap gap-3">
          <Link
              href={lessonsRoute(locale)}
            className="rounded-full bg-[var(--primary)] px-5 py-2.5 font-semibold text-white transition hover:bg-[var(--primary-strong)]"
          >
            {copy.lessonsCta}
          </Link>
        </div>
        <p className="mt-4 text-sm text-[var(--muted)]">{copy.openSourceNote}</p>
      </section>

      {sampleQuiz && sampleExercise ? (
        <section className="hub-grid">
          <QuizPreview quiz={sampleQuiz} title={copy.quizTitle} answerLabel={copy.quizAnswerLabel} />
          <ExercisePreview
            exercise={sampleExercise}
            title={copy.exerciseTitle}
            expectedOutcomeLabel={copy.expectedOutcomeLabel}
          />
        </section>
      ) : null}

      <section className="hub-card p-6">
        <h2 className="mb-4 text-xl font-semibold">{copy.lessonsTitle}</h2>
        {lessons.length === 0 ? (
          <EmptyState title={copy.noLessonsTitle} description={copy.noLessonsDescription} />
        ) : (
          <ul className="space-y-3">
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
