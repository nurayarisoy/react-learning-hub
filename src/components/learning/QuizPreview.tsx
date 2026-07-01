import type { QuizQuestion } from "@/types/learning";

interface QuizPreviewProps {
  quiz: QuizQuestion;
  title: string;
  answerLabel: string;
}

export function QuizPreview({ quiz, title, answerLabel }: QuizPreviewProps) {
  return (
    <article className="hub-card p-5" aria-labelledby={`quiz-${quiz.id}`}>
      <h2 id={`quiz-${quiz.id}`} className="text-lg font-semibold">
        {title}
      </h2>
      <p className="mt-2 text-sm text-[var(--muted)]">{quiz.prompt}</p>
      <ul className="mt-3 list-inside list-disc space-y-1 text-sm">
        {quiz.options.map((option) => (
          <li key={option}>{option}</li>
        ))}
      </ul>
      <p className="mt-3 text-xs text-[var(--muted)]">
        {answerLabel}: {quiz.correctIndex + 1}
      </p>
    </article>
  );
}
