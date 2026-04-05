import React, { useState, useCallback, useMemo } from 'react';
import { Box, Text, useInput } from 'ink';
import TextInput from 'ink-text-input';
import { theme, spacing } from './theme.js';
import { getAllLessons } from './lessons/index.js';
import { type Locale, setLocale, getLocale, ui, fmt } from './i18n/index.js';
import { loadProgress, saveProgress, completeLesson, addXp, updateStreak } from './store/progress.js';
import { LessonFrame } from './components/LessonFrame.js';
import { ProgressBar } from './components/ProgressBar.js';
import { XpBar } from './components/XpBar.js';
import { StreakBadge } from './components/StreakBadge.js';
import { LevelUp } from './components/LevelUp.js';
import { SplashScreen } from './components/SplashScreen.js';
import { Logo } from './components/Logo.js';
import { playSound } from './utils/sound.js';
import { getLevel, XP_PER_LESSON, type Level } from './utils/xp.js';

type Screen = 'splash' | 'lang' | 'welcome' | 'lesson' | 'complete';

interface AppProps {
  startLesson?: string;
}

const LANG_OPTIONS: { locale: Locale; label: string }[] = [
  { locale: 'es', label: 'Español' },
  { locale: 'en', label: 'English' },
  { locale: 'fr', label: 'Français' },
];

function getInitialIndex(lessons: ReturnType<typeof getAllLessons>, startLesson?: string, completedIds: string[] = []): number {
  if (startLesson) {
    const idx = lessons.findIndex(l => l.id === startLesson);
    if (idx !== -1) return idx;
  }
  for (let i = 0; i < lessons.length; i++) {
    if (!completedIds.includes(lessons[i]!.id)) return i;
  }
  return lessons.length;
}

// ── Language picker (no logo — parent shows it) ──
function LanguagePicker({ onSelect }: { onSelect: (locale: Locale) => void }) {
  const [selected, setSelected] = useState(0);

  useInput((_input, key) => {
    if (key.upArrow && selected > 0) setSelected(prev => prev - 1);
    if (key.downArrow && selected < LANG_OPTIONS.length - 1) setSelected(prev => prev + 1);
    if (key.return) {
      playSound('advance');
      onSelect(LANG_OPTIONS[selected]!.locale);
    }
  });

  return (
    <Box flexDirection="column" gap={spacing.sm}>
      <Text color={theme.text}>Choose your language / Elige tu idioma / Choisis ta langue:</Text>
      <Text>{' '}</Text>
      {LANG_OPTIONS.map((opt, i) => (
        <Text key={opt.locale} color={i === selected ? theme.brand : theme.textSecondary}>
          {i === selected ? '  ▸ ' : '    '}{opt.label}
        </Text>
      ))}
      <Text>{' '}</Text>
      <Text color={theme.textMuted}>{'  ↑↓ '}<Text color={theme.textSecondary}>elegir/select/choisir</Text>{'   Enter '}<Text color={theme.textSecondary}>confirmar/confirm/confirmer</Text></Text>
    </Box>
  );
}

// ── Main App ─────────────────────────────────────
export function App({ startLesson }: AppProps) {
  const [progress, setProgress] = useState(() => loadProgress());
  const [streakInfo] = useState(() => updateStreak());
  const [name, setName] = useState('');

  // Set locale once from saved progress (not on every render)
  const [localeSet] = useState(() => {
    if (progress.locale) setLocale(progress.locale as Locale);
    return true;
  });

  const allLessons = useMemo(() => getAllLessons(getLocale()), [progress.locale]);
  const needsLang = !progress.locale;
  const needsName = !progress.userName;

  const [screen, setScreen] = useState<Screen>('splash');
  const [lessonIndex, setLessonIndex] = useState(() =>
    getInitialIndex(allLessons, startLesson, progress.completedLessons)
  );
  const [levelUpInfo, setLevelUpInfo] = useState<Level | null>(null);
  const [pendingNextIndex, setPendingNextIndex] = useState<number | null>(null);

  const currentLesson = allLessons[lessonIndex];

  const handleSplashDone = useCallback(() => {
    // Compute next screen at call time, not at mount time
    if (!progress.locale) { setScreen('lang'); return; }
    if (!progress.userName) { setScreen('welcome'); return; }
    if (getInitialIndex(allLessons, startLesson, progress.completedLessons) >= allLessons.length) { setScreen('complete'); return; }
    setScreen('lesson');
  }, [progress, allLessons, startLesson]);

  const handleLangSelect = (locale: Locale) => {
    setLocale(locale);
    const updated = { ...progress, locale };
    saveProgress(updated);
    setProgress(updated);
    setScreen(needsName ? 'welcome' : 'lesson');
  };

  const handleNameSubmit = (value: string) => {
    const trimmed = value.trim();
    if (!trimmed) return;
    const updated = { ...progress, userName: trimmed };
    saveProgress(updated);
    setProgress(updated);
    playSound('advance');
    setScreen('lesson');
  };

  const handleLessonComplete = useCallback(() => {
    if (!currentLesson) return;
    completeLesson(currentLesson.id);

    const prevXp = progress.xp ?? 0;
    const prevLevel = getLevel(prevXp);
    const newXp = addXp(XP_PER_LESSON);
    const newLevel = getLevel(newXp);

    const nextIndex = lessonIndex + 1;
    const didLevelUp = newLevel.id > prevLevel.id;

    if (nextIndex >= allLessons.length) {
      const updated = loadProgress();
      updated.graduatedAt = new Date().toISOString();
      saveProgress(updated);
      setProgress(updated);
      playSound('celebrate');
      setScreen('complete');
    } else if (didLevelUp) {
      setProgress(loadProgress());
      setLevelUpInfo(newLevel);
      setPendingNextIndex(nextIndex);
    } else {
      setProgress(loadProgress());
      setLessonIndex(nextIndex);
    }
  }, [currentLesson, lessonIndex, allLessons.length, progress.xp]);

  const handleLevelUpDone = useCallback(() => {
    setLevelUpInfo(null);
    if (pendingNextIndex !== null) {
      setLessonIndex(pendingNextIndex);
      setPendingNextIndex(null);
    }
  }, [pendingNextIndex]);

  const isMenuScreen = screen === 'lang' || screen === 'welcome' || screen === 'complete';

  return (
    <Box flexDirection="column" minHeight={16}>

      {/* ── SPLASH: animated logo, full screen ── */}
      {screen === 'splash' && (
        <SplashScreen onDone={handleSplashDone} />
      )}

      {/* ── MENU SCREENS: logo header + content ── */}
      {isMenuScreen && (
        <Box flexDirection="column">
          {/* ASCII logo as persistent header */}
          <Box paddingX={spacing.md} paddingTop={1} paddingBottom={1} flexDirection="column">
            <Logo />
          </Box>

          {/* Content below logo */}
          <Box flexDirection="column" paddingX={spacing.md}>
            {screen === 'lang' && (
              <LanguagePicker onSelect={handleLangSelect} />
            )}

            {screen === 'welcome' && (
              <Box flexDirection="column" gap={spacing.sm}>
                <Text color={theme.text}>{ui().welcomeSubtitle}</Text>
                <Text color={theme.textSecondary}>{ui().welcomeNoExperience}</Text>
                <Text>{' '}</Text>
                <Text color={theme.text}>{ui().welcomeAskName}</Text>
                <Box>
                  <Text color={theme.brand} bold>{'  > '}</Text>
                  <TextInput value={name} onChange={setName} onSubmit={handleNameSubmit} />
                </Box>
                <Text color={theme.textMuted}>{'  '}{ui().welcomeNameHint}</Text>
              </Box>
            )}

            {screen === 'complete' && (
              <Box flexDirection="column" gap={spacing.sm}>
                <Text color={theme.success} bold>
                  {fmt(ui().congratulations, { nombre: progress.userName })}
                </Text>
                <Text color={theme.text}>{ui().completedAllLessons}</Text>
                <Text color={theme.textSecondary}>{ui().youCanNow}</Text>
                <Text>{' '}</Text>
                <Text color={theme.textMuted}>
                  {ui().showCertificate}{' '}
                  <Text color={theme.brand}>npx tuilder --cert</Text>
                </Text>
              </Box>
            )}
          </Box>
        </Box>
      )}

      {/* ── LESSON SCREEN: compact header + lesson ── */}
      {screen === 'lesson' && (
        <Box flexDirection="column">
          {/* Compact header bar */}
          <Box
            borderStyle="single"
            borderColor={theme.border}
            paddingX={1}
            justifyContent="space-between"
          >
            <Logo compact />
            {currentLesson && (
              <Box gap={spacing.md}>
                <Text color={theme.textMuted}>{progress.userName}</Text>
                <Text color={theme.textGhost}>|</Text>
                <Text color={theme.textSecondary}>{currentLesson.module}</Text>
                <Text color={theme.textGhost}>|</Text>
                <ProgressBar
                  current={progress.completedLessons.length}
                  total={allLessons.length}
                />
                <Text color={theme.textGhost}>|</Text>
                <XpBar xp={progress.xp ?? 0} locale={getLocale()} />
                {streakInfo.streak >= 2 && (
                  <>
                    <Text color={theme.textGhost}>|</Text>
                    <StreakBadge streak={streakInfo.streak} />
                  </>
                )}
              </Box>
            )}
          </Box>

          {/* Level up celebration */}
          {levelUpInfo && (
            <Box paddingY={1}>
              <LevelUp level={levelUpInfo} locale={getLocale()} onDone={handleLevelUpDone} />
            </Box>
          )}

          {/* Streak welcome */}
          {streakInfo.isNewDay && streakInfo.streak >= 2 && !levelUpInfo && (
            <Box paddingX={spacing.md} paddingTop={1}>
              <Text color={theme.warning}>{fmt(ui().streakWelcome, { n: String(streakInfo.streak) })}</Text>
            </Box>
          )}

          {/* Lesson content */}
          {currentLesson && !levelUpInfo && (
            <Box paddingTop={1}>
              <LessonFrame
                key={currentLesson.id}
                lesson={currentLesson}
                onComplete={handleLessonComplete}
                onBack={lessonIndex > 0 ? () => setLessonIndex(prev => prev - 1) : undefined}
                userName={progress.userName}
              />
            </Box>
          )}
        </Box>
      )}
    </Box>
  );
}
