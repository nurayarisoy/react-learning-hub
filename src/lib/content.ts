import fs from "node:fs/promises";
import path from "node:path";
import { cache } from "react";
import matter from "gray-matter";
import type { Locale } from "@/lib/i18n";
import type { Difficulty, Lesson, LessonFrontmatter, LessonIndexItem } from "@/types/learning";

const contentRoot = path.join(process.cwd(), "content");
const validDifficulties: Difficulty[] = ["beginner", "intermediate", "advanced"];

function parseLessonFrontmatter(data: unknown): LessonFrontmatter | null {
  if (!data || typeof data !== "object") {
    return null;
  }

  const candidate = data as Record<string, unknown>;
  const title = candidate.title;
  const summary = candidate.summary;
  const difficulty = candidate.difficulty;
  const estimatedMinutes = candidate.estimatedMinutes;

  if (typeof title !== "string" || title.trim() === "") {
    return null;
  }

  if (typeof summary !== "string" || summary.trim() === "") {
    return null;
  }

  if (typeof difficulty !== "string" || !validDifficulties.includes(difficulty as Difficulty)) {
    return null;
  }

  if (typeof estimatedMinutes !== "number" || !Number.isFinite(estimatedMinutes) || estimatedMinutes <= 0) {
    return null;
  }

  return {
    title,
    summary,
    difficulty: difficulty as Difficulty,
    estimatedMinutes,
  };
}

export async function getLessonSlugs(locale: Locale): Promise<string[]> {
  const lessonsDir = path.join(contentRoot, locale, "lessons");
  const files = await fs.readdir(lessonsDir).catch(() => [] as string[]);
  return files
    .filter((file) => file.endsWith(".mdx"))
    .map((file) => file.replace(/\.mdx$/, ""));
}

export const getLesson = cache(async (locale: Locale, slug: string): Promise<Lesson | null> => {
  try {
    const lessonPath = path.join(contentRoot, locale, "lessons", `${slug}.mdx`);
    const file = await fs.readFile(lessonPath, "utf8");
    const { content, data } = matter(file);
    const frontmatter = parseLessonFrontmatter(data);

    if (!frontmatter) {
      return null;
    }

    return {
      locale,
      slug,
      content,
      frontmatter,
    };
  } catch {
    return null;
  }
});

export async function getLessonIndex(locale: Locale): Promise<LessonIndexItem[]> {
  const slugs = await getLessonSlugs(locale);
  const lessons = await Promise.all(slugs.map((slug) => getLesson(locale, slug)));

  return lessons
    .filter((lesson): lesson is Lesson => lesson !== null)
    .map((lesson) => ({ slug: lesson.slug, ...lesson.frontmatter }))
    .sort((a, b) => a.estimatedMinutes - b.estimatedMinutes);
}
