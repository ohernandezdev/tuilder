import chalk from 'chalk';
import { loadProgress } from '../store/progress.js';
import { type Locale, setLocale, getLocale, ui, fmt } from '../i18n/index.js';
import { getLevel } from '../utils/xp.js';

export function showCertificate(): void {
  const progress = loadProgress();

  if (progress.locale) setLocale(progress.locale as Locale);
  const locale = getLocale();

  if (!progress.graduatedAt) {
    console.log('');
    console.log(chalk.hex('#FFC107')('  ' + ui().certNotGraduated));
    console.log(chalk.hex('#777777')('  ' + ui().certRunTuilder));
    console.log('');
    return;
  }

  const name = progress.userName || 'Builder';
  const dateLocale = locale === 'fr' ? 'fr-FR' : locale === 'en' ? 'en-US' : 'es-MX';
  const date = new Date(progress.graduatedAt).toLocaleDateString(dateLocale, {
    year: 'numeric', month: 'long', day: 'numeric'
  });
  const xp = progress.xp ?? 0;
  const level = getLevel(xp);
  const levelName = level.name[locale];
  const lessonsCount = progress.completedLessons.length;
  const streak = progress.streak ?? 0;

  const b = chalk.hex('#D77757');
  const g = chalk.hex('#FFD580');
  const w = chalk.hex('#EEEEEE');
  const d = chalk.hex('#555555');
  const s = chalk.hex('#4EBA65');
  const a = chalk.hex('#B1B9F9');

  const pad = (text: string, width: number) => {
    const len = text.replace(/\x1b\[[0-9;]*m/g, '').length;
    return text + ' '.repeat(Math.max(0, width - len));
  };

  const rpad = (text: string, width: number) => {
    const len = text.replace(/\x1b\[[0-9;]*m/g, '').length;
    return ' '.repeat(Math.max(0, width - len)) + text;
  };

  const WI = 56; // inner width

  console.log('');
  console.log(b('  ┌' + '─'.repeat(WI) + '┐'));
  console.log(b('  │') + ' '.repeat(WI) + b('│'));
  console.log(b('  │') + g.bold(rpad('t u i l d e r', WI - 2)) + '  ' + b('│'));
  console.log(b('  │') + ' '.repeat(WI) + b('│'));
  console.log(b('  │') + d('  ' + '·'.repeat(WI - 4) + '  ') + b('│'));
  console.log(b('  │') + ' '.repeat(WI) + b('│'));
  console.log(b('  │') + w.bold(pad('  ' + fmt(ui().certCertifies, { nombre: name }), WI)) + b('│'));
  console.log(b('  │') + w(pad('  ' + ui().certCompleted, WI)) + b('│'));
  console.log(b('  │') + ' '.repeat(WI) + b('│'));
  console.log(b('  │') + d('  ' + '·'.repeat(WI - 4) + '  ') + b('│'));
  console.log(b('  │') + ' '.repeat(WI) + b('│'));

  // Stats line
  const statsLeft = s(`  Lv.${level.id} ${levelName}`);
  const statsRight = a(`${xp} XP`);
  console.log(b('  │') + pad(statsLeft, WI - statsRight.replace(/\x1b\[[0-9;]*m/g, '').length - 2) + statsRight + '  ' + b('│'));

  const lessonsLabel = `  ${lessonsCount} ${locale === 'es' ? 'lecciones' : locale === 'fr' ? 'leçons' : 'lessons'}`;
  const streakLabel = streak >= 2 ? g(`${streak}d streak  `) : '';
  console.log(b('  │') + pad(w(lessonsLabel), WI - streakLabel.replace(/\x1b\[[0-9;]*m/g, '').length) + streakLabel + b('│'));

  console.log(b('  │') + ' '.repeat(WI) + b('│'));
  console.log(b('  │') + d('  ' + '·'.repeat(WI - 4) + '  ') + b('│'));
  console.log(b('  │') + ' '.repeat(WI) + b('│'));
  console.log(b('  │') + d(pad(`  ${fmt(ui().certDate, { date })}`, WI)) + b('│'));
  console.log(b('  │') + d(pad('  npx tuilder --cert', WI)) + b('│'));
  console.log(b('  │') + ' '.repeat(WI) + b('│'));
  console.log(b('  └' + '─'.repeat(WI) + '┘'));
  console.log('');
}
