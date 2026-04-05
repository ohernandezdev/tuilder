import { type Locale, type UIStrings } from './types.js';
import { es } from './es.js';
import { en } from './en.js';
import { fr } from './fr.js';

const locales: Record<Locale, UIStrings> = { es, en, fr };

let currentLocale: Locale = 'es';

export function setLocale(locale: Locale): void {
  currentLocale = locale;
}

export function getLocale(): Locale {
  return currentLocale;
}

export function ui(): UIStrings {
  return locales[currentLocale];
}

// Template helper: replaces {key} placeholders
export function fmt(template: string, vars: Record<string, string>): string {
  return template.replace(/\{(\w+)\}/g, (_, key) => vars[key] ?? `{${key}}`);
}

export type { Locale, UIStrings };
