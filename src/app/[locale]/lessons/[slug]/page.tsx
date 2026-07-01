import Link from "next/link";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { MDXRemote } from "next-mdx-remote/rsc";
import remarkGfm from "remark-gfm";
import { EmptyState } from "@/components/learning/EmptyState";
import { ExerciseRunner } from "@/components/learning/ExerciseRunner";
import { QuizRunner } from "@/components/learning/QuizRunner";
import { getLesson, getLessonSlugs } from "@/lib/content";
import { getLessonExercise, getLessonQuiz } from "@/lib/learning";
import { isLocale, locales, uiCopy } from "@/lib/i18n";
import { lessonsRoute } from "@/lib/routes";

export async function generateStaticParams() {
  const all = await Promise.all(
    locales.map(async (locale) => {
      const slugs = await getLessonSlugs(locale);
      return slugs.map((slug) => ({ locale, slug }));
    }),
  );

  return all.flat();
}

export async function generateMetadata({
  params,
}: {
  params: PageProps<"/[locale]/lessons/[slug]">["params"];
}): Promise<Metadata> {
  const { locale, slug } = await params;

  if (!isLocale(locale)) {
    return {
      title: "Not Found",
    };
  }

  const lesson = await getLesson(locale, slug);

  if (!lesson) {
    return {
      title: "Lesson Not Found",
    };
  }

  return {
    title: `${lesson.frontmatter.title} | ${uiCopy[locale].title}`,
    description: lesson.frontmatter.summary,
  };
}

export default async function LessonPage({
  params,
}: {
  params: PageProps<"/[locale]/lessons/[slug]">["params"];
}) {
  const { locale, slug } = await params;

  if (!isLocale(locale)) {
    notFound();
  }

  const lesson = await getLesson(locale, slug);

  if (!lesson) {
    notFound();
  }

  const copy = uiCopy[locale];
  const quiz = getLessonQuiz(locale, slug);
  const exercise = getLessonExercise(locale, slug);

  return (
    <main id="main-content" className="hub-shell space-y-6">
      <section className="hub-card p-6">
        <Link href={lessonsRoute(locale)} className="text-sm text-[var(--muted)]">
          {copy.backToLessons}
        </Link>
        <h1 className="mt-3 text-3xl font-bold">{lesson.frontmatter.title}</h1>
        <p className="mt-2 text-[var(--muted)]">{lesson.frontmatter.summary}</p>
        <p className="mt-3 text-xs uppercase tracking-wide text-[var(--muted)]">
          {lesson.frontmatter.difficulty} - {lesson.frontmatter.estimatedMinutes} {copy.lessonDurationSuffix}
        </p>
      </section>

      <article className="hub-card prose prose-zinc max-w-none p-6 prose-headings:font-semibold">
        <MDXRemote source={lesson.content} options={{ mdxOptions: { remarkPlugins: [remarkGfm] } }} />
      </article>

      {quiz || exercise ? (
        <section className="hub-grid">
          {quiz ? (
            <QuizRunner
              quiz={quiz}
              locale={locale}
              title={copy.quizTitle}
              copy={{
                submit: copy.quizSubmit,
                next: copy.quizNext,
                previous: copy.quizPrevious,
                questionLabel: copy.quizQuestionLabel,
                resultLabel: copy.quizResultLabel,
                completedLabel: copy.quizCompletedLabel,
                chooseOptionLabel: copy.quizChooseOptionLabel,
              }}
            />
          ) : null}
          {exercise ? (
            <ExerciseRunner
              exercise={exercise}
              locale={locale}
              title={copy.exerciseTitle}
              expectedOutcomeLabel={copy.expectedOutcomeLabel}
              copy={{
                yourSolution: copy.exerciseYourSolution,
                checkSolution: copy.exerciseCheckSolution,
                resetCode: copy.exerciseResetCode,
                hintsLabel: copy.exerciseHintsLabel,
                passedLabel: copy.exercisePassedLabel,
                failedLabel: copy.exerciseFailedLabel,
                missingLabel: copy.exerciseMissingLabel,
                completedLabel: copy.exerciseCompletedLabel,
                editorLabel: copy.exerciseEditorLabel,
              }}
            />
          ) : null}
        </section>
      ) : (
        <EmptyState title={copy.noActivityTitle} description={copy.noActivityDescription} />
      )}
    </main>
  );
}
