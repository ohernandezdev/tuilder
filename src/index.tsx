#!/usr/bin/env node
import React from 'react';
import { render } from 'ink';
import meow from 'meow';
import { App } from './app.js';
import { resetProgress, loadProgress } from './store/progress.js';
import { showCertificate } from './components/Certificate.js';
import { type Locale, setLocale } from './i18n/index.js';

const cli = meow(`
  Usage / Uso / Utilisation
    $ npx tuilder

  Options
    --reset     Start from scratch / Empezar de cero
    --lesson    Jump to a lesson (e.g. --lesson 1.2)
    --cert      Show your certificate
    --lang      Set language: es, en, fr
`, {
  importMeta: import.meta,
  flags: {
    reset: { type: 'boolean', default: false },
    lesson: { type: 'string' },
    cert: { type: 'boolean', default: false },
    lang: { type: 'string' },
  },
});

// Apply saved or CLI locale
const progress = loadProgress();
if (cli.flags.lang) {
  setLocale(cli.flags.lang as Locale);
} else if (progress.locale) {
  setLocale(progress.locale as Locale);
}

if (cli.flags.reset) {
  resetProgress();
  console.log('✓ Progress reset / Progreso borrado / Progression effacée');
  process.exit(0);
}

if (cli.flags.cert) {
  showCertificate();
  process.exit(0);
}

render(<App startLesson={cli.flags.lesson} />);
