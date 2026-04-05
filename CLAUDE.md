# CLAUDE.md

## Project

tuilder — Interactive TUI course teaching non-tech people to use the terminal, Git, and AI coding agents. Built with Ink v5 + React 18 + TypeScript ESM.

## Commands

```bash
npm run build          # Compile TypeScript
npm run dev            # Watch mode
npm test               # Run tests (vitest)
node dist/index.js     # Run the app
node dist/index.js --reset   # Reset progress
node dist/index.js --lesson 3.1  # Jump to lesson
npx tsx scripts/validate-course.ts  # Validate all 195 lessons across 3 locales
```

## Architecture

- **Ink v5** with React 18 — all UI is React components rendered to terminal
- **ESM only** — all imports use `.js` extensions (TypeScript convention for ESM)
- **i18n** — 3 locales (es/en/fr). UI strings in `src/i18n/`, lesson content in each module's `index.ts` via factory functions `getModuleXLessons(locale)`
- **Progress** stored in `~/.tuilder/progress.json`. Use `mutateProgress(fn)` for atomic read-mutate-write
- **Lessons** are data-driven: each lesson is a `Lesson` object with content fields + a `validate()` function
- **Interactive types**: `command` (single input), `practiceSteps` (multi-step challenges), `quizQuestions`, `agent-simulation`, `controls-tutorial`

## Key Patterns

- `ui()` returns current locale's UI strings. `fmt(template, vars)` for interpolation
- `colorize(line, theme)` renders terminal-like output (diffs, prompts, folders)
- `playSound(name)` plays macOS system sounds, no-op elsewhere
- `addXp()`, `completeLesson()` via `mutateProgress()` — never call `saveProgress()` directly
- `CommandStep.acceptPattern` — optional regex for flexible validation (used for natural language inputs and `git commit -m`)
- Lessons per module are in `src/lessons/XX-name/index.ts`, exported as `getModuleXLessons(locale: Locale): Lesson[]`

## Content Rules

- Target audience: non-tech (designers, POs, CEOs). NO jargon without explanation
- Every concept needs `concept` (what), `why` (motivation), and optionally `analogy`
- `why` must NOT repeat `concept` — it should add new information
- Quiz answers must vary positions (not all `correct: 0`)
- Practice step challenges should guide logically from previous step's output
- `hint2` must ALWAYS give the exact answer to unblock the user
- `git commit -m` steps should use `acceptPattern: 'git commit -m .+'` (accept any message)
- All 3 locales must have same lesson count, same IDs, same `correct` indices, same `interactive` types

## Don'ts

- Don't hardcode Spanish/English strings in components — use `ui()` from i18n
- Don't use `saveProgress()` directly — use `mutateProgress(fn)` to prevent race conditions
- Don't add commands to practice steps that weren't taught in a previous lesson
- Don't assume the user knows what `.tsx`, "branch", "diff", "staging", or "PR" means without prior explanation
