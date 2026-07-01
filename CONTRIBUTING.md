# Contributing to React Learning Hub

Thanks for contributing.

## Project Goals

- Build a multilingual, open-source React learning platform.
- Keep content quality high across EN, TR, and DE.
- Prioritize readability, accessibility, and maintainability.

## Getting Started

1. Clone the repository.
2. Install dependencies with npm install.
3. Run the app with npm run dev.

## Branching and Commits

- Create a feature branch from main.
- Use clear commit messages (example: feat: add forms lesson quiz set).
- Keep pull requests focused and small when possible.

## Content Rules

- Add lesson files under content/{locale}/lessons.
- Keep lesson slugs aligned across locales.
- Use required frontmatter fields:
  - title
  - summary
  - difficulty
  - estimatedMinutes

## Quiz and Exercise Rules

- Keep quiz IDs and exercise IDs aligned across locales.
- Ensure lessonSlug references a real lesson file in the same locale.
- For exercises, include valid validationRules and at least one hint.

## Quality Gate (Required Before PR)

Run all checks locally:

- npm run content:validate
- npm run lint
- npm run typecheck
- npm run build

## Pull Request Checklist

- I ran the full quality gate locally.
- I updated content in all required locales (or documented why not).
- I kept IDs/slugs aligned across locale datasets.
- I added or updated tests/checks when needed.
- I updated docs when behavior changed.

## Review Expectations

Maintainers focus on:

- correctness and regressions
- architecture and scalability
- accessibility and performance
- clarity of naming and structure

Thank you for helping improve React Learning Hub.
