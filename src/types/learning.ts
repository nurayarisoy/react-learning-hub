import type { Locale } from "@/lib/i18n";

export type Difficulty = "beginner" | "intermediate" | "advanced";

export interface QuizQuestion {
  id: string;
  prompt: string;
  options: string[];
  correctIndex: number;
  explanation: string;
}

export interface LessonQuiz {
  id: string;
  lessonSlug: string;
  title: string;
  questions: QuizQuestion[];
}

export type ExerciseValidationRule =
  | {
      type: "usesHook";
      hookName: string;
      label: string;
    }
  | {
      type: "callsFunction";
      functionName: string;
      label: string;
    }
  | {
      type: "hasIncrementUpdate";
      setterName: string;
      label: string;
    }
  | {
      type: "hasDecrementUpdate";
      setterName: string;
      label: string;
    }
  | {
      type: "hasOnClickIncrement";
      setterName: string;
      label: string;
    }
  | {
      type: "hasOnClickDecrement";
      setterName: string;
      label: string;
    };

export interface Exercise {
  id: string;
  lessonSlug: string;
  title: string;
  instructions: string;
  starterCode: string;
  expectedOutcome: string;
  validationRules: ExerciseValidationRule[];
  hints: string[];
}

export interface LessonFrontmatter {
  title: string;
  summary: string;
  difficulty: Difficulty;
  estimatedMinutes: number;
}

export interface LessonIndexItem extends LessonFrontmatter {
  slug: string;
}

export interface Lesson {
  locale: Locale;
  slug: string;
  frontmatter: LessonFrontmatter;
  content: string;
}
