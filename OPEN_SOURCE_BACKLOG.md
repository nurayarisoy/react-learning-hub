# Open Source Backlog

This backlog is designed for community contributions with clear scopes and acceptance criteria.

## Labels Convention

- `good first issue`: beginner-friendly tasks
- `help wanted`: tasks open for contributors
- `documentation`: docs/content improvements
- `feature`: user-facing functionality
- `enhancement`: quality/performance improvements
- `a11y`: accessibility-focused tasks
- `i18n`: localization-related tasks

## 1) Add Lesson Navigation (Prev/Next)

- Suggested labels: `good first issue`, `feature`
- Scope: Add previous and next lesson links on lesson detail pages.
- Acceptance criteria:
  - Previous/next links appear when available.
  - Links respect locale and lesson order.
  - Works for EN/TR/DE.

## 2) Add Search Input for Lesson List

- Suggested labels: `good first issue`, `feature`
- Scope: Add client-side search by lesson title and summary on lesson index page.
- Acceptance criteria:
  - Search filters lessons in real time.
  - Empty-result state is shown.
  - No regressions in static rendering.

## 3) Add Difficulty Filter Chips

- Suggested labels: `good first issue`, `enhancement`
- Scope: Filter lesson cards by difficulty (beginner/intermediate/advanced).
- Acceptance criteria:
  - Filter chips are keyboard-accessible.
  - Combined use with search works correctly.

## 4) Add ARIA Improvements to Interactive Runners

- Suggested labels: `help wanted`, `a11y`
- Scope: Improve ARIA announcements for quiz/exercise result feedback.
- Acceptance criteria:
  - Screen readers announce pass/fail and score changes.
  - No accessibility lint warnings.

## 5) Add Lesson Completion Badge on Lesson Cards

- Suggested labels: `good first issue`, `feature`
- Scope: Show completion state using existing local progress keys.
- Acceptance criteria:
  - Completed lessons display a visual badge.
  - Badge updates after finishing quiz/exercise.

## 6) Add Progress Summary Widget on Home

- Suggested labels: `help wanted`, `feature`
- Scope: Show completed lessons and recent activity on locale home page.
- Acceptance criteria:
  - Reads progress from local storage.
  - Handles no-progress state gracefully.

## 7) Add i18n Copy for Error/Not Found States

- Suggested labels: `good first issue`, `i18n`
- Scope: Localize route error and not-found messages via locale dictionaries.
- Acceptance criteria:
  - Error and not-found texts are localized for EN/TR/DE.
  - Fallback behavior remains safe.

## 8) Add Dynamic Sitemap Entries for Lesson Slugs

- Suggested labels: `help wanted`, `enhancement`
- Scope: Include all lesson detail URLs in sitemap generation.
- Acceptance criteria:
  - Sitemap includes each locale lesson slug route.
  - Build remains static and passes validation.

## 9) Add CI Workflow for Quality Gate

- Suggested labels: `help wanted`, `enhancement`
- Scope: Add GitHub Actions workflow running validate, lint, typecheck, build.
- Acceptance criteria:
  - CI runs on push and PR.
  - Fails on any quality gate failure.

## 10) Add Contributor Guide for Content Writing Standards

- Suggested labels: `documentation`, `good first issue`
- Scope: Extend contribution docs with style and pedagogy standards for lessons.
- Acceptance criteria:
  - Defines writing tone, structure, and examples.
  - Includes translation parity guidance.

## How to Pick a Task

1. Start with issues labeled `good first issue`.
2. Comment on the issue to claim it.
3. Open a small focused PR.
4. Ensure all quality checks pass before requesting review.
