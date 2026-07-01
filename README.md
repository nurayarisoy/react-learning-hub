# React Learning Hub

Portfolio-grade, open-source React learning platform built with Next.js.

## Scope

- React learning documentation
- Interactive education platform foundations
- Multilingual structure: TR / EN / DE
- MDX-driven lesson content
- Quiz + exercise architecture

## Tech Stack

- Next.js App Router + TypeScript
- Tailwind CSS v4
- MDX rendering with next-mdx-remote
- gray-matter for lesson frontmatter
- App Router metadata files (robots + sitemap)
- Proxy-based locale redirection

## Project Structure

- `src/app/[locale]` locale-first routes
- `src/lib/content.ts` MDX lesson loading
- `src/lib/learning.ts` featured quiz/exercise selectors
- `src/lib/i18n.ts` language and copy configuration
- `src/data/quiz.ts` sample quiz model/data
- `src/data/exercises.ts` sample exercise model/data
- `src/components/learning/*` reusable learning UI building blocks
- `content/{tr,en,de}/lessons` multilingual lesson content
- `scripts/validate-content.ts` content checks

## Scripts

- `npm run dev` start development server
- `npm run build` production build
- `npm run start` start production server
- `npm run lint` lint source files
- `npm run typecheck` run TypeScript checks
- `npm run format` format code with Prettier
- `npm run format:check` verify formatting
- `npm run content:validate` validate lesson structure

## Getting Started

```bash
npm install
npm run content:validate
npm run dev
```

Open `http://localhost:3000`.

## Runtime Notes

- Recommended Node.js: `22.x` (see `.nvmrc`).
- Default development command uses webpack mode for stability: `npm run dev`.
- Optional Turbopack mode is available with `npm run dev:turbo`.

## Roadmap

- Auth and progress tracking
- Persistent quiz engine and scoring
- Interactive in-browser coding exercises
- Search and full docs navigation
- Contributor workflows and CI automation

## Contribution

1. Create or update lesson content under `content/{locale}/lessons`.
2. Keep frontmatter fields aligned across locales.
3. Run `npm run lint && npm run typecheck && npm run content:validate && npm run build` before PR.
