import { type Locale } from '../i18n/types.js';

export interface Level {
  id: number;
  name: Record<Locale, string>;
  minXp: number;
}

export const LEVELS: Level[] = [
  { id: 1, name: { es: 'Novato Terminal', en: 'Terminal Newbie', fr: 'Débutant Terminal' }, minXp: 0 },
  { id: 2, name: { es: 'Explorador', en: 'Explorer', fr: 'Explorateur' }, minXp: 100 },
  { id: 3, name: { es: 'Navegante Git', en: 'Git Navigator', fr: 'Navigateur Git' }, minXp: 300 },
  { id: 4, name: { es: 'Builder AI', en: 'AI Builder', fr: 'Builder IA' }, minXp: 600 },
  { id: 5, name: { es: 'Graduado', en: 'Graduate', fr: 'Diplômé' }, minXp: 1000 },
];

export const XP_PER_LESSON = 15;
export const XP_PER_PRACTICE_COMMAND = 5;
export const XP_PER_QUIZ_CORRECT = 20;
export const XP_MODULE_BONUS = 50;

export function getLevel(xp: number): Level {
  let current = LEVELS[0]!;
  for (const level of LEVELS) {
    if (xp >= level.minXp) {
      current = level;
    }
  }
  return current;
}

export function getNextLevel(xp: number): Level | undefined {
  const current = getLevel(xp);
  return LEVELS.find(l => l.minXp > current.minXp);
}

export function getLevelProgress(xp: number): { current: Level; next: Level | undefined; progress: number } {
  const current = getLevel(xp);
  const next = getNextLevel(xp);
  if (!next) {
    return { current, next: undefined, progress: 1 };
  }
  const range = next.minXp - current.minXp;
  const progress = range > 0 ? (xp - current.minXp) / range : 1;
  return { current, next, progress };
}
