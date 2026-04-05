import { execFile } from 'node:child_process';
import { existsSync } from 'node:fs';
import { platform } from 'node:os';

// Elegant, non-alarming system sounds for course feedback.
// Uses macOS native sounds (aiff) which are short, satisfying, and familiar.
// Silent fallback on Linux/Windows — no errors, no broken experience.

const SOUNDS_DIR = '/System/Library/Sounds';
const IS_MAC = platform() === 'darwin';

const SOUND_MAP = {
  // Lesson completed, correct command — warm, satisfying
  success: 'Tink.aiff',

  // Module completed — a bit more rewarding
  complete: 'Glass.aiff',

  // Wrong command — gentle, not alarming
  error: 'Pop.aiff',

  // Typewriter line appearing
  tick: 'Tink.aiff',

  // Graduation / certificate
  celebrate: 'Hero.aiff',

  // Navigation / Enter pressed
  advance: 'Pop.aiff',
} as const;

type SoundName = keyof typeof SOUND_MAP;

let enabled = true;

export function setSoundEnabled(value: boolean): void {
  enabled = value;
}

export function playSound(name: SoundName): void {
  if (!enabled || !IS_MAC) return;

  const file = `${SOUNDS_DIR}/${SOUND_MAP[name]}`;
  if (!existsSync(file)) return;

  // Fire and forget — never block the UI for sound
  execFile('afplay', [file], (err) => {
    // Silently ignore errors — sound is enhancement, not critical
  });
}
