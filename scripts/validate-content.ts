import fs from "node:fs/promises";
import path from "node:path";
import matter from "gray-matter";
import { locales } from "../src/lib/i18n";
import { quizByLocale } from "../src/data/quiz";
import { exercisesByLocale } from "../src/data/exercises";
import type { Exercise, ExerciseValidationRule, LessonQuiz } from "../src/types/learning";

const requiredFrontmatter = ["title", "summary", "difficulty", "estimatedMinutes"];
const validDifficulties = new Set(["beginner", "intermediate", "advanced"]);

function isNonEmptyString(value: unknown): value is string {
  return typeof value === "string" && value.trim().length > 0;
}

function validateQuizQuestions(locale: string, quiz: LessonQuiz, errors: string[]) {
  if (!isNonEmptyString(quiz.id)) {
    errors.push(`[${locale}] Quiz id must be a non-empty string`);
  }

  if (!isNonEmptyString(quiz.lessonSlug)) {
    errors.push(`[${locale}] Quiz ${quiz.id} lessonSlug must be a non-empty string`);
  }

  if (!isNonEmptyString(quiz.title)) {
    errors.push(`[${locale}] Quiz ${quiz.id} title must be a non-empty string`);
  }

  if (!Array.isArray(quiz.questions) || quiz.questions.length === 0) {
    errors.push(`[${locale}] Quiz ${quiz.id} must contain at least one question`);
    return;
  }

  const questionIds = new Set<string>();

  for (const question of quiz.questions) {
    if (!isNonEmptyString(question.id)) {
      errors.push(`[${locale}] Quiz ${quiz.id} contains a question with empty id`);
      continue;
    }

    if (questionIds.has(question.id)) {
      errors.push(`[${locale}] Quiz ${quiz.id} has duplicate question id: ${question.id}`);
    }
    questionIds.add(question.id);

    if (!isNonEmptyString(question.prompt)) {
      errors.push(`[${locale}] Quiz ${quiz.id}/${question.id} prompt must be non-empty`);
    }

    if (!Array.isArray(question.options) || question.options.length < 2) {
      errors.push(`[${locale}] Quiz ${quiz.id}/${question.id} must have at least two options`);
    }

    if (
      typeof question.correctIndex !== "number" ||
      !Number.isInteger(question.correctIndex) ||
      question.correctIndex < 0 ||
      question.correctIndex >= question.options.length
    ) {
      errors.push(
        `[${locale}] Quiz ${quiz.id}/${question.id} correctIndex is out of option range`,
      );
    }

    if (!isNonEmptyString(question.explanation)) {
      errors.push(`[${locale}] Quiz ${quiz.id}/${question.id} explanation must be non-empty`);
    }
  }
}

function isRuleValid(rule: ExerciseValidationRule): boolean {
  if (!isNonEmptyString(rule.label)) {
    return false;
  }

  if (rule.type === "usesHook") {
    return isNonEmptyString(rule.hookName);
  }

  if (rule.type === "callsFunction") {
    return isNonEmptyString(rule.functionName);
  }

  return isNonEmptyString(rule.setterName);
}

function validateExercise(locale: string, exercise: Exercise, errors: string[]) {
  if (!isNonEmptyString(exercise.id)) {
    errors.push(`[${locale}] Exercise id must be a non-empty string`);
  }

  if (!isNonEmptyString(exercise.lessonSlug)) {
    errors.push(`[${locale}] Exercise ${exercise.id} lessonSlug must be a non-empty string`);
  }

  if (!isNonEmptyString(exercise.title)) {
    errors.push(`[${locale}] Exercise ${exercise.id} title must be non-empty`);
  }

  if (!isNonEmptyString(exercise.instructions)) {
    errors.push(`[${locale}] Exercise ${exercise.id} instructions must be non-empty`);
  }

  if (!isNonEmptyString(exercise.starterCode)) {
    errors.push(`[${locale}] Exercise ${exercise.id} starterCode must be non-empty`);
  }

  if (!isNonEmptyString(exercise.expectedOutcome)) {
    errors.push(`[${locale}] Exercise ${exercise.id} expectedOutcome must be non-empty`);
  }

  if (!Array.isArray(exercise.validationRules) || exercise.validationRules.length === 0) {
    errors.push(`[${locale}] Exercise ${exercise.id} must define at least one validation rule`);
  } else {
    for (const rule of exercise.validationRules) {
      if (!isRuleValid(rule)) {
        errors.push(`[${locale}] Exercise ${exercise.id} has invalid validation rule`);
      }
    }
  }

  if (!Array.isArray(exercise.hints) || exercise.hints.length === 0) {
    errors.push(`[${locale}] Exercise ${exercise.id} must define at least one hint`);
  } else if (exercise.hints.some((hint) => !isNonEmptyString(hint))) {
    errors.push(`[${locale}] Exercise ${exercise.id} contains an empty hint`);
  }
}

async function getLessonFiles(locale: string) {
  const lessonsDir = path.join(process.cwd(), "content", locale, "lessons");
  const entries = await fs.readdir(lessonsDir).catch(() => [] as string[]);
  return entries.filter((entry) => entry.endsWith(".mdx"));
}

async function run() {
  const errors: string[] = [];
  const localeFiles = new Map<string, string[]>();
  const localeLessonSlugs = new Map<string, string[]>();

  for (const locale of locales) {
    const files = await getLessonFiles(locale);
    localeFiles.set(locale, files);
    localeLessonSlugs.set(
      locale,
      files.map((file) => file.replace(/\.mdx$/, "")),
    );

    if (files.length === 0) {
      errors.push(`[${locale}] No lesson files found in content/${locale}/lessons`);
      continue;
    }

    for (const file of files) {
      const fullPath = path.join(process.cwd(), "content", locale, "lessons", file);
      const source = await fs.readFile(fullPath, "utf8");
      const { data } = matter(source);

      for (const field of requiredFrontmatter) {
        if (!data[field]) {
          errors.push(`[${locale}] ${file} is missing frontmatter field: ${field}`);
        }
      }

      if (!isNonEmptyString(data.title)) {
        errors.push(`[${locale}] ${file} title must be a non-empty string`);
      }

      if (!isNonEmptyString(data.summary)) {
        errors.push(`[${locale}] ${file} summary must be a non-empty string`);
      }

      if (typeof data.estimatedMinutes !== "number" || data.estimatedMinutes <= 0) {
        errors.push(`[${locale}] ${file} estimatedMinutes must be a positive number`);
      }

      if (!isNonEmptyString(data.difficulty) || !validDifficulties.has(data.difficulty)) {
        errors.push(
          `[${locale}] ${file} difficulty must be one of: beginner, intermediate, advanced`,
        );
      }
    }
  }

  const base = localeFiles.get("en") ?? [];
  const baseQuizIds = new Set((quizByLocale.en ?? []).map((quiz) => quiz.id));
  const baseExerciseIds = new Set((exercisesByLocale.en ?? []).map((exercise) => exercise.id));

  for (const locale of locales) {
    const files = localeFiles.get(locale) ?? [];
    const missing = base.filter((entry) => !files.includes(entry));
    if (missing.length > 0) {
      errors.push(`[${locale}] Missing lesson files to match en: ${missing.join(", ")}`);
    }

    const quizzes = quizByLocale[locale] ?? [];
    const quizIds = new Set<string>();
    const lessonSlugs = new Set(localeLessonSlugs.get(locale) ?? []);

    if (quizzes.length === 0) {
      errors.push(`[${locale}] No quizzes found in src/data/quiz.ts`);
    }

    for (const quiz of quizzes) {
      if (quizIds.has(quiz.id)) {
        errors.push(`[${locale}] Duplicate quiz id: ${quiz.id}`);
      }
      quizIds.add(quiz.id);

      validateQuizQuestions(locale, quiz, errors);

      if (!lessonSlugs.has(quiz.lessonSlug)) {
        errors.push(
          `[${locale}] Quiz ${quiz.id} references missing lesson slug: ${quiz.lessonSlug}`,
        );
      }
    }

    if (locale !== "en") {
      const missingQuizIds = [...baseQuizIds].filter((id) => !quizIds.has(id));
      if (missingQuizIds.length > 0) {
        errors.push(`[${locale}] Missing quizzes to match en: ${missingQuizIds.join(", ")}`);
      }
    }

    const exercises = exercisesByLocale[locale] ?? [];
    const exerciseIds = new Set<string>();

    if (exercises.length === 0) {
      errors.push(`[${locale}] No exercises found in src/data/exercises.ts`);
    }

    for (const exercise of exercises) {
      if (exerciseIds.has(exercise.id)) {
        errors.push(`[${locale}] Duplicate exercise id: ${exercise.id}`);
      }
      exerciseIds.add(exercise.id);

      validateExercise(locale, exercise, errors);

      if (!lessonSlugs.has(exercise.lessonSlug)) {
        errors.push(
          `[${locale}] Exercise ${exercise.id} references missing lesson slug: ${exercise.lessonSlug}`,
        );
      }
    }

    if (locale !== "en") {
      const missingExerciseIds = [...baseExerciseIds].filter((id) => !exerciseIds.has(id));
      if (missingExerciseIds.length > 0) {
        errors.push(
          `[${locale}] Missing exercises to match en: ${missingExerciseIds.join(", ")}`,
        );
      }
    }
  }

  if (errors.length > 0) {
    console.error("Content validation failed:\n");
    for (const error of errors) {
      console.error(`- ${error}`);
    }
    process.exit(1);
  }

  console.log("Content validation passed.");
}

run().catch((error) => {
  console.error(error);
  process.exit(1);
});
