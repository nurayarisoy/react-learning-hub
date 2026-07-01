"use client";

import { useMemo, useState } from "react";
import type { Exercise } from "@/types/learning";
import { evaluateExerciseSolution } from "@/lib/exercise-evaluator";
import {
  readExerciseProgress,
  writeExerciseProgress,
  type ExerciseProgress,
} from "@/lib/exercise-progress";

interface ExerciseRunnerCopy {
  yourSolution: string;
  checkSolution: string;
  resetCode: string;
  hintsLabel: string;
  passedLabel: string;
  failedLabel: string;
  missingLabel: string;
  completedLabel: string;
  editorLabel: string;
}

interface ExerciseRunnerProps {
  exercise: Exercise;
  locale: string;
  title: string;
  expectedOutcomeLabel: string;
  copy: ExerciseRunnerCopy;
}

export function ExerciseRunner({
  exercise,
  locale,
  title,
  expectedOutcomeLabel,
  copy,
}: ExerciseRunnerProps) {
  const [code, setCode] = useState(exercise.starterCode);
  const [result, setResult] = useState<ExerciseProgress | null>(null);
  const [savedProgress, setSavedProgress] = useState<ExerciseProgress | null>(() =>
    readExerciseProgress(locale, exercise.lessonSlug),
  );

  const missingChecks = useMemo(() => {
    return evaluateExerciseSolution(code, exercise.validationRules).missingChecks;
  }, [code, exercise.validationRules]);

  function handleCheckSolution() {
    const progress: ExerciseProgress = {
      completedAt: new Date().toISOString(),
      passed: missingChecks.length === 0,
      missingChecks,
    };

    setResult(progress);
    setSavedProgress(progress);
    writeExerciseProgress(locale, exercise.lessonSlug, progress);
  }

  function handleResetCode() {
    setCode(exercise.starterCode);
    setResult(null);
  }

  return (
    <article className="hub-card p-5" aria-labelledby={`exercise-runner-${exercise.id}`}>
      <h2 id={`exercise-runner-${exercise.id}`} className="text-lg font-semibold">
        {title}: {exercise.title}
      </h2>

      {savedProgress ? (
        <p className="mt-2 text-xs text-[var(--muted)]">
          {copy.completedLabel}: {savedProgress.passed ? copy.passedLabel : copy.failedLabel}
        </p>
      ) : null}

      <p className="mt-2 text-sm text-[var(--muted)]">{exercise.instructions}</p>

      <div className="mt-3 rounded-lg border border-[var(--border)] bg-white p-3">
        <p className="text-sm font-medium">{copy.yourSolution}</p>
        <label htmlFor={`exercise-editor-${exercise.id}`} className="text-sm font-medium">
          {copy.editorLabel}
        </label>
        <textarea
          id={`exercise-editor-${exercise.id}`}
          value={code}
          onChange={(event) => setCode(event.target.value)}
          className="mt-2 h-56 w-full rounded-md border border-[var(--border)] bg-[#171717] p-3 font-mono text-xs text-white"
          spellCheck={false}
        />
      </div>

      <div className="mt-4 flex flex-wrap gap-2">
        <button
          type="button"
          onClick={handleCheckSolution}
          className="rounded-full bg-[var(--primary)] px-4 py-2 text-sm font-semibold text-white"
        >
          {copy.checkSolution}
        </button>
        <button
          type="button"
          onClick={handleResetCode}
          className="rounded-full border border-[var(--border)] px-4 py-2 text-sm"
        >
          {copy.resetCode}
        </button>
      </div>

      <p className="mt-4 text-xs text-[var(--muted)]">
        {expectedOutcomeLabel}: {exercise.expectedOutcome}
      </p>

      <div className="mt-4 rounded-lg bg-[var(--surface-strong)] p-3">
        <p className="text-sm font-medium">{copy.hintsLabel}</p>
        <ul className="mt-2 list-inside list-disc text-sm text-[var(--muted)]">
          {exercise.hints.map((hint) => (
            <li key={hint}>{hint}</li>
          ))}
        </ul>
      </div>

      {result ? (
        <div className="mt-4 rounded-lg border border-[var(--border)] bg-white p-3 text-sm">
          <p className="font-medium">{result.passed ? copy.passedLabel : copy.failedLabel}</p>
          {result.missingChecks.length > 0 ? (
            <p className="mt-1 text-[var(--muted)]">
              {copy.missingLabel}: {result.missingChecks.join(", ")}
            </p>
          ) : null}
        </div>
      ) : null}
    </article>
  );
}
