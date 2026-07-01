export interface QuizProgress {
  completedAt: string;
  score: number;
  total: number;
}

function makeProgressKey(locale: string, lessonSlug: string): string {
  return `rlh:quiz-progress:${locale}:${lessonSlug}`;
}

export function readQuizProgress(locale: string, lessonSlug: string): QuizProgress | null {
  if (typeof window === "undefined") {
    return null;
  }

  const raw = window.localStorage.getItem(makeProgressKey(locale, lessonSlug));

  if (!raw) {
    return null;
  }

  try {
    const parsed = JSON.parse(raw) as QuizProgress;

    if (
      typeof parsed.completedAt !== "string" ||
      typeof parsed.score !== "number" ||
      typeof parsed.total !== "number"
    ) {
      return null;
    }

    return parsed;
  } catch {
    return null;
  }
}

export function writeQuizProgress(
  locale: string,
  lessonSlug: string,
  progress: QuizProgress,
): void {
  if (typeof window === "undefined") {
    return;
  }

  window.localStorage.setItem(makeProgressKey(locale, lessonSlug), JSON.stringify(progress));
}
