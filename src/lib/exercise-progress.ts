export interface ExerciseProgress {
  completedAt: string;
  passed: boolean;
  missingChecks: string[];
}

function makeExerciseProgressKey(locale: string, lessonSlug: string): string {
  return `rlh:exercise-progress:${locale}:${lessonSlug}`;
}

export function readExerciseProgress(locale: string, lessonSlug: string): ExerciseProgress | null {
  if (typeof window === "undefined") {
    return null;
  }

  const raw = window.localStorage.getItem(makeExerciseProgressKey(locale, lessonSlug));

  if (!raw) {
    return null;
  }

  try {
    const parsed = JSON.parse(raw) as ExerciseProgress & { missingSnippets?: string[] };
    const missingChecks = Array.isArray(parsed.missingChecks)
      ? parsed.missingChecks
      : Array.isArray(parsed.missingSnippets)
        ? parsed.missingSnippets
        : null;

    if (
      typeof parsed.completedAt !== "string" ||
      typeof parsed.passed !== "boolean" ||
      missingChecks === null
    ) {
      return null;
    }

    return {
      completedAt: parsed.completedAt,
      passed: parsed.passed,
      missingChecks,
    };
  } catch {
    return null;
  }
}

export function writeExerciseProgress(
  locale: string,
  lessonSlug: string,
  progress: ExerciseProgress,
): void {
  if (typeof window === "undefined") {
    return;
  }

  window.localStorage.setItem(makeExerciseProgressKey(locale, lessonSlug), JSON.stringify(progress));
}
