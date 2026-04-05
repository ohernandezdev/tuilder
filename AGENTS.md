# AGENTS.md

Instructions for AI agents working on this codebase.

## Before Making Changes

1. Run `npm run build` to verify the project compiles
2. Read the relevant lesson file(s) before editing
3. After changes, run `npx tsx scripts/validate-course.ts` to check all 195 lessons

## Adding a New Lesson

1. Add content to the module's `index.ts` in ALL 3 locales (es, en, fr)
2. Add `msg` entries for validation messages in all 3 locales
3. Wire the lesson in the factory function (`getModuleXLessons`)
4. Ensure `id` follows pattern `X.Y` (module.lesson)
5. Run validation script to confirm cross-locale consistency

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
