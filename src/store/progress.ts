import { existsSync, mkdirSync, readFileSync, writeFileSync } from 'node:fs';
import { homedir } from 'node:os';
import { join } from 'node:path';

const DIR = join(homedir(), '.tuilder');
const FILE = join(DIR, 'progress.json');

export interface Progress {
  userName: string;
  startedAt: string;
  completedLessons: string[];
  graduatedAt?: string;
  locale?: string;
  xp: number;
  lastActiveDate?: string;
  streak?: number;
}

function defaultProgress(): Progress {
  return {
    userName: '',
    startedAt: new Date().toISOString(),
    completedLessons: [],
    xp: 0,
  };
}

export function loadProgress(): Progress {
  try {
    if (existsSync(FILE)) {
      return JSON.parse(readFileSync(FILE, 'utf-8'));
    }
  } catch {
    // corrupted file, start fresh
  }
  return defaultProgress();
}

export function saveProgress(progress: Progress): void {
  if (!existsSync(DIR)) {
    mkdirSync(DIR, { recursive: true });
  }
  writeFileSync(FILE, JSON.stringify(progress, null, 2));
}

export function resetProgress(): void {
  if (!existsSync(DIR)) {
    mkdirSync(DIR, { recursive: true });
  }
  writeFileSync(FILE, JSON.stringify(defaultProgress(), null, 2));
}

// Single-transaction mutation: load → mutate → save → return
// Prevents race conditions between concurrent load/save cycles
export function mutateProgress(fn: (p: Progress) => void): Progress {
  const progress = loadProgress();
  fn(progress);
  saveProgress(progress);
  return progress;
}

export function completeLesson(lessonId: string): void {
  mutateProgress(p => {
    if (!p.completedLessons.includes(lessonId)) {
      p.completedLessons.push(lessonId);
    }
  });
}

export function addXp(amount: number): number {
  let newXp = 0;
  mutateProgress(p => {
    p.xp = (p.xp ?? 0) + amount;
    newXp = p.xp;
  });
  return newXp;
}

export function updateStreak(): { streak: number; isNewDay: boolean } {
  const today = new Date().toISOString().split('T')[0]!;
  const progress = loadProgress();
  const last = progress.lastActiveDate;

  if (last === today) {
    return { streak: progress.streak ?? 1, isNewDay: false };
  }

  const yesterday = new Date(Date.now() - 86400000).toISOString().split('T')[0]!;
  const newStreak = last === yesterday ? (progress.streak ?? 0) + 1 : 1;

  mutateProgress(p => {
    p.lastActiveDate = today;
    p.streak = newStreak;
  });

  return { streak: newStreak, isNewDay: true };
}

// Combined lesson complete + XP in one transaction
export function completeLessonWithXp(lessonId: string, xpAmount: number): { xp: number } {
  let newXp = 0;
  mutateProgress(p => {
    if (!p.completedLessons.includes(lessonId)) {
      p.completedLessons.push(lessonId);
    }
    p.xp = (p.xp ?? 0) + xpAmount;
    newXp = p.xp;
  });
  return { xp: newXp };
}
