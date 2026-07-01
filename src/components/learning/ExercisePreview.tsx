import type { Exercise } from "@/types/learning";

interface ExercisePreviewProps {
  exercise: Exercise;
  title: string;
  expectedOutcomeLabel: string;
}

export function ExercisePreview({
  exercise,
  title,
  expectedOutcomeLabel,
}: ExercisePreviewProps) {
  return (
    <article className="hub-card p-5" aria-labelledby={`exercise-${exercise.id}`}>
      <h2 id={`exercise-${exercise.id}`} className="text-lg font-semibold">
        {title}
      </h2>
      <p className="mt-2 text-sm text-[var(--muted)]">{exercise.instructions}</p>
      <pre className="mt-3 overflow-x-auto rounded-lg bg-[#1a1a1a] p-3 text-xs text-[#f7f7f7]">
        <code>{exercise.starterCode}</code>
      </pre>
      <p className="mt-3 text-xs text-[var(--muted)]">
        {expectedOutcomeLabel}: {exercise.expectedOutcome}
      </p>
    </article>
  );
}
