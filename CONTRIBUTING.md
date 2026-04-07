# Contributing to tuilder

## Quick Start

```bash
npm install
npm run build
node dist/index.js
```

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
- `CommandStep.acceptPattern` — optional regex for flexible validation
- Lessons per module are in `src/lessons/XX-name/index.ts`, exported as `getModuleXLessons(locale: Locale): Lesson[]`

## Adding a New Lesson

1. Add content to the module's `index.ts` in ALL 3 locales (es, en, fr)
2. Add `msg` entries for validation messages in all 3 locales
3. Wire the lesson in the factory function (`getModuleXLessons`)
4. Ensure `id` follows pattern `X.Y` (module.lesson)
5. Run `npx tsx scripts/validate-course.ts` to confirm cross-locale consistency

## Adding a New Module

1. Create `src/lessons/XX-name/index.ts`
2. Export `getModuleXLessons(locale: Locale): Lesson[]`
3. Import and register in `src/lessons/index.ts`
4. Update total lesson counts in README if needed

## Adding UI Strings

1. Add the key to `src/i18n/types.ts` (UIStrings interface)
2. Add translations in `src/i18n/es.ts`, `src/i18n/en.ts`, `src/i18n/fr.ts`
3. Use via `ui().keyName` in components

## Content Quality Checklist

When writing or editing lessons:

- [ ] `concept` explains WHAT in plain language (no jargon without explanation)
- [ ] `why` adds MOTIVATION (not a repeat of concept)
- [ ] `analogy` uses real-world comparison (optional but recommended)
- [ ] `hint1` gives a gentle nudge without the answer
- [ ] `hint2` gives the exact command/answer
- [ ] Quiz answers distributed across positions 0-3 (not all `correct: 0`)
- [ ] Same `correct` index across all 3 locales for each quiz question
- [ ] Practice steps flow logically — each challenge builds on the previous output
- [ ] Commands used in practice were taught in an earlier lesson
- [ ] `acceptPattern` used for natural language inputs and `git commit -m` commands
- [ ] No `.tsx`, "branch", "diff", "staging", "PR", "boilerplate" without prior explanation
- [ ] Simulated output is realistic for the command

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

- Don't hardcode strings in components — use `ui()` from i18n
- Don't use `saveProgress()` directly — use `mutateProgress(fn)` to prevent race conditions
- Don't add commands to practice steps that weren't taught in a previous lesson
- Don't assume the user knows what `.tsx`, "branch", "diff", "staging", or "PR" means without prior explanation

## Testing

```bash
npm run build                          # Must compile
npx tsx scripts/validate-course.ts     # Must pass (0 errors, 0 warnings)
node dist/index.js --reset && node dist/index.js  # Manual walkthrough
node dist/index.js --lesson X.Y        # Test specific lesson
```

## File Conventions

- TypeScript ESM with `.js` extensions in imports
- Components in `src/components/`, one component per file
- Lesson modules in `src/lessons/XX-name/index.ts`
- Factory function pattern: `getModuleXLessons(locale): Lesson[]`
- Locale content as `Record<Locale, Record<string, LessonText>>` objects
- Semantic color tokens from `theme.ts` — never use raw hex in components
