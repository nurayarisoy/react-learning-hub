"use client";

import { useMemo, useState } from "react";
import { readQuizProgress, writeQuizProgress, type QuizProgress } from "@/lib/quiz-progress";
import type { LessonQuiz } from "@/types/learning";

interface QuizRunnerCopy {
  submit: string;
  next: string;
  previous: string;
  questionLabel: string;
  resultLabel: string;
  completedLabel: string;
  chooseOptionLabel: string;
}

interface QuizRunnerProps {
  quiz: LessonQuiz;
  locale: string;
  title: string;
  copy: QuizRunnerCopy;
}

export function QuizRunner({ quiz, locale, title, copy }: QuizRunnerProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [answers, setAnswers] = useState<Array<number | null>>(
    () => new Array(quiz.questions.length).fill(null),
  );
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [savedProgress, setSavedProgress] = useState<QuizProgress | null>(() =>
    readQuizProgress(locale, quiz.lessonSlug),
  );

  const currentQuestion = quiz.questions[currentIndex];

  const score = useMemo(() => {
    return quiz.questions.reduce((total, question, index) => {
      return answers[index] === question.correctIndex ? total + 1 : total;
    }, 0);
  }, [answers, quiz.questions]);

  function handleSelect(optionIndex: number) {
    setAnswers((previous) => {
      const next = [...previous];
      next[currentIndex] = optionIndex;
      return next;
    });
  }

  function handleSubmit() {
    setIsSubmitted(true);

    const progress: QuizProgress = {
      completedAt: new Date().toISOString(),
      score,
      total: quiz.questions.length,
    };

    writeQuizProgress(locale, quiz.lessonSlug, progress);
    setSavedProgress(progress);
  }

  return (
    <article className="hub-card p-5" aria-labelledby={`quiz-runner-${quiz.id}`}>
      <h2 id={`quiz-runner-${quiz.id}`} className="text-lg font-semibold">
        {title}: {quiz.title}
      </h2>

      {savedProgress ? (
        <p className="mt-2 text-xs text-[var(--muted)]">
          {copy.completedLabel}: {savedProgress.score}/{savedProgress.total}
        </p>
      ) : null}

      <div className="mt-4 rounded-lg border border-[var(--border)] bg-white p-4">
        <p className="text-xs uppercase tracking-wide text-[var(--muted)]">
          {copy.questionLabel} {currentIndex + 1}/{quiz.questions.length}
        </p>
        <p className="mt-2 text-sm font-medium">{currentQuestion.prompt}</p>

        <fieldset className="mt-3 space-y-2">
          <legend className="sr-only">{copy.chooseOptionLabel}</legend>
          {currentQuestion.options.map((option, optionIndex) => {
            const checked = answers[currentIndex] === optionIndex;
            const inputId = `${quiz.id}-${currentQuestion.id}-${optionIndex}`;

            return (
              <label
                key={inputId}
                htmlFor={inputId}
                className="flex cursor-pointer items-center gap-2 rounded-md border border-[var(--border)] px-3 py-2 text-sm"
              >
                <input
                  id={inputId}
                  type="radio"
                  name={`question-${currentQuestion.id}`}
                  checked={checked}
                  onChange={() => handleSelect(optionIndex)}
                />
                <span>{option}</span>
              </label>
            );
          })}
        </fieldset>

        {isSubmitted ? (
          <div className="mt-3 rounded-md bg-[var(--surface-strong)] px-3 py-2 text-sm">
            <p>
              {copy.resultLabel}: {score}/{quiz.questions.length}
            </p>
            <p className="mt-1 text-[var(--muted)]">{currentQuestion.explanation}</p>
          </div>
        ) : null}
      </div>

      <div className="mt-4 flex flex-wrap gap-2">
        <button
          type="button"
          onClick={() => setCurrentIndex((value) => Math.max(0, value - 1))}
          disabled={currentIndex === 0}
          className="rounded-full border border-[var(--border)] px-4 py-2 text-sm disabled:opacity-50"
        >
          {copy.previous}
        </button>

        <button
          type="button"
          onClick={() => setCurrentIndex((value) => Math.min(quiz.questions.length - 1, value + 1))}
          disabled={currentIndex === quiz.questions.length - 1}
          className="rounded-full border border-[var(--border)] px-4 py-2 text-sm disabled:opacity-50"
        >
          {copy.next}
        </button>

        <button
          type="button"
          onClick={handleSubmit}
          disabled={answers.some((answer) => answer === null)}
          className="rounded-full bg-[var(--primary)] px-4 py-2 text-sm font-semibold text-white disabled:opacity-50"
        >
          {copy.submit}
        </button>
      </div>
    </article>
  );
}
