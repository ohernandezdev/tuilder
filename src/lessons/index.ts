import { type Lesson } from '../types.js';
import { type Locale } from '../i18n/types.js';
import { getModule0Lessons } from './00-welcome/index.js';
import { getModule1Lessons } from './01-terminal/index.js';
import { getModule2Lessons } from './02-git-basics/index.js';
import { getModule3Lessons } from './03-claude-code-intro/index.js';
import { getModule4Lessons } from './04-first-task/index.js';
import { getModule5Lessons } from './05-collaboration/index.js';
import { getModule6Lessons } from './06-graduation/index.js';

export function getAllLessons(locale: Locale): Lesson[] {
  return [
    ...getModule0Lessons(locale),
    ...getModule1Lessons(locale),
    ...getModule2Lessons(locale),
    ...getModule3Lessons(locale),
    ...getModule4Lessons(locale),
    ...getModule5Lessons(locale),
    ...getModule6Lessons(locale),
  ];
}

export function getLessonById(id: string, locale: Locale): Lesson | undefined {
  return getAllLessons(locale).find(l => l.id === id);
}

export function getNextLesson(currentId: string, locale: Locale): Lesson | undefined {
  const lessons = getAllLessons(locale);
  const idx = lessons.findIndex(l => l.id === currentId);
  if (idx === -1 || idx === lessons.length - 1) return undefined;
  return lessons[idx + 1];
}
