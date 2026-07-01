import type { Locale } from "@/lib/i18n";
import { exercisesByLocale } from "@/data/exercises";
import { quizByLocale } from "@/data/quiz";
import type { Exercise, LessonQuiz, QuizQuestion } from "@/types/learning";

export function getFeaturedQuiz(locale: Locale): QuizQuestion | null {
  return quizByLocale[locale][0]?.questions[0] ?? null;
}

export function getFeaturedExercise(locale: Locale): Exercise | null {
  return exercisesByLocale[locale][0] ?? null;
}

export function getLessonQuiz(locale: Locale, lessonSlug: string): LessonQuiz | null {
  return quizByLocale[locale].find((quiz) => quiz.lessonSlug === lessonSlug) ?? null;
}

export function getLessonExercise(locale: Locale, lessonSlug: string): Exercise | null {
  return exercisesByLocale[locale].find((exercise) => exercise.lessonSlug === lessonSlug) ?? null;
}
