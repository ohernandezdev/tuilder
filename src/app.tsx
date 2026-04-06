import React, { useState, useCallback, useMemo } from 'react';
import { Box, Text, useInput } from 'ink';
import TextInput from 'ink-text-input';
import { theme, spacing } from './theme.js';
import { getAllLessons } from './lessons/index.js';
import { type Locale, setLocale, getLocale, ui, fmt } from './i18n/index.js';
import { loadProgress, saveProgress, resetProgress, completeLesson, addXp, updateStreak } from './store/progress.js';
import { LessonFrame } from './components/LessonFrame.js';
import { ProgressBar } from './components/ProgressBar.js';
import { XpBar } from './components/XpBar.js';
import { StreakBadge } from './components/StreakBadge.js';
import { LevelUp } from './components/LevelUp.js';
import { SplashScreen } from './components/SplashScreen.js';
import { Logo } from './components/Logo.js';
import { playSound } from './utils/sound.js';
import { getLevel, XP_PER_LESSON, type Level } from './utils/xp.js';
import { CheatSheet } from './components/CheatSheet.js';

type Screen = 'splash' | 'lang' | 'welcome' | 'menu' | 'modules' | 'confirmReset' | 'lesson' | 'complete';

interface AppProps {
  startLesson?: string;
}

const LANG_OPTIONS: { locale: Locale; label: string }[] = [
  { locale: 'es', label: 'Español' },
  { locale: 'en', label: 'English' },
  { locale: 'fr', label: 'Français' },
];

const MODULE_INFO = [
  { id: '0', startLesson: '0.1' },
  { id: '1', startLesson: '1.1' },
  { id: '2', startLesson: '2.1' },
  { id: '3', startLesson: '3.1' },
  { id: '4', startLesson: '4.1' },
  { id: '5', startLesson: '5.1' },
  { id: '6', startLesson: '6.1' },
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

// ── Language picker ──
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

// ── Main Menu ──
function MainMenu({ hasProgress, isGraduated, onSelect }: {
  hasProgress: boolean;
  isGraduated: boolean;
  onSelect: (action: 'continue' | 'newgame' | 'modules' | 'lang' | 'cert') => void;
}) {
  const options: { key: string; label: string; action: 'continue' | 'newgame' | 'modules' | 'lang' | 'cert' }[] = [];
  if (hasProgress) options.push({ key: 'continue', label: ui().menuContinue, action: 'continue' });
  options.push({ key: 'newgame', label: hasProgress ? ui().menuNewGame : ui().menuStart, action: 'newgame' });
  if (hasProgress) options.push({ key: 'modules', label: ui().menuModules, action: 'modules' });
  options.push({ key: 'lang', label: ui().menuChangeLang, action: 'lang' });
  if (isGraduated) options.push({ key: 'cert', label: ui().menuCertificate, action: 'cert' });

  const [selected, setSelected] = useState(0);

  useInput((_input, key) => {
    if (key.upArrow && selected > 0) setSelected(prev => prev - 1);
    if (key.downArrow && selected < options.length - 1) setSelected(prev => prev + 1);
    if (key.return) {
      playSound('advance');
      onSelect(options[selected]!.action);
    }
  });

  return (
    <Box flexDirection="column" gap={spacing.sm}>
      {options.map((opt, i) => (
        <Text key={opt.key} color={i === selected ? theme.brand : theme.textSecondary}>
          {i === selected ? '  ▸ ' : '    '}{opt.label}
        </Text>
      ))}
      <Text>{' '}</Text>
      <Text color={theme.textMuted}>{'  ↑↓ + Enter'}</Text>
    </Box>
  );
}

// ── Module Picker ──
function ModulePicker({ lessons, completedLessons, onSelect, onBack }: {
  lessons: ReturnType<typeof getAllLessons>;
  completedLessons: string[];
  onSelect: (lessonId: string) => void;
  onBack: () => void;
}) {
  const modules = useMemo(() => {
    const map = new Map<string, { name: string; firstId: string; total: number; completed: number }>();
    for (const l of lessons) {
      const modId = l.id.split('.')[0]!;
      if (!map.has(modId)) {
        map.set(modId, { name: l.module, firstId: l.id, total: 0, completed: 0 });
      }
      const m = map.get(modId)!;
      m.total++;
      if (completedLessons.includes(l.id)) m.completed++;
    }
    return Array.from(map.entries()).map(([id, info]) => ({ id, ...info }));
  }, [lessons, completedLessons]);

  const [selected, setSelected] = useState(0);

  useInput((_input, key) => {
    if (key.upArrow && selected > 0) setSelected(prev => prev - 1);
    if (key.downArrow && selected < modules.length - 1) setSelected(prev => prev + 1);
    if (key.return) {
      playSound('advance');
      onSelect(modules[selected]!.firstId);
    }
    if (key.escape) onBack();
  });

  return (
    <Box flexDirection="column" gap={spacing.sm}>
      {modules.map((mod, i) => {
        const done = mod.completed === mod.total;
        const progress = `${mod.completed}/${mod.total}`;
        return (
          <Text key={mod.id} color={i === selected ? theme.brand : theme.textSecondary}>
            {i === selected ? '  ▸ ' : '    '}
            <Text color={done ? theme.success : (i === selected ? theme.brand : theme.textSecondary)}>
              {done ? '✓ ' : '  '}{mod.name}
            </Text>
            <Text color={theme.textMuted}> ({progress})</Text>
          </Text>
        );
      })}
      <Text>{' '}</Text>
      <Text color={theme.textMuted}>{'  ↑↓ + Enter    '}{ui().escToGoBack}</Text>
    </Box>
  );
}

// ── Main App ─────────────────────────────────────
export function App({ startLesson }: AppProps) {
  const [progress, setProgress] = useState(() => loadProgress());
  const [streakInfo] = useState(() => updateStreak());
  const [name, setName] = useState('');

  // Set locale once from saved progress
  const [_localeSet] = useState(() => {
    if (progress.locale) setLocale(progress.locale as Locale);
    return true;
  });

  const allLessons = useMemo(() => getAllLessons(getLocale()), [progress.locale]);
  const needsLang = !progress.locale;
  const needsName = !progress.userName;
  const hasProgress = progress.completedLessons.length > 0;
  const isGraduated = !!progress.graduatedAt;

  // If startLesson is provided via CLI, skip menu
  const [screen, setScreen] = useState<Screen>('splash');
  const [lessonIndex, setLessonIndex] = useState(() =>
    getInitialIndex(allLessons, startLesson, progress.completedLessons)
  );
  const [levelUpInfo, setLevelUpInfo] = useState<Level | null>(null);
  const [pendingNextIndex, setPendingNextIndex] = useState<number | null>(null);
  const [showCheatSheet, setShowCheatSheet] = useState(false);

  const currentLesson = allLessons[lessonIndex];

  const handleSplashDone = useCallback(() => {
    if (startLesson) {
      // CLI --lesson flag: skip menu, go straight to lesson
      if (!progress.locale) { setScreen('lang'); return; }
      if (!progress.userName) { setScreen('welcome'); return; }
      setScreen('lesson');
      return;
    }
    if (!progress.locale) { setScreen('lang'); return; }
    if (!progress.userName) { setScreen('welcome'); return; }
    setScreen('menu');
  }, [progress, startLesson]);

  const handleLangSelect = (locale: Locale) => {
    setLocale(locale);
    const updated = { ...progress, locale };
    saveProgress(updated);
    setProgress(updated);
    if (needsName) {
      setScreen('welcome');
    } else {
      setScreen('menu');
    }
  };

  const handleNameSubmit = (value: string) => {
    const trimmed = value.trim();
    if (!trimmed) return;
    const updated = { ...progress, userName: trimmed };
    saveProgress(updated);
    setProgress(updated);
    playSound('advance');
    setScreen('menu');
  };

  const handleMenuSelect = (action: 'continue' | 'newgame' | 'modules' | 'lang' | 'cert') => {
    if (action === 'continue') {
      const idx = getInitialIndex(allLessons, undefined, progress.completedLessons);
      if (idx >= allLessons.length) {
        setScreen('complete');
      } else {
        setLessonIndex(idx);
        setScreen('lesson');
      }
    } else if (action === 'newgame') {
      if (hasProgress) {
        setScreen('confirmReset');
      } else {
        // No progress — just start lesson 0.1
        setLessonIndex(0);
        setScreen('lesson');
      }
    } else if (action === 'modules') {
      setScreen('modules');
    } else if (action === 'lang') {
      setScreen('lang');
    } else if (action === 'cert') {
      setScreen('complete');
    }
  };

  const handleModuleSelect = (lessonId: string) => {
    const idx = allLessons.findIndex(l => l.id === lessonId);
    if (idx !== -1) {
      setLessonIndex(idx);
      setScreen('lesson');
    }
  };

  const handleConfirmReset = useCallback(() => {
    resetProgress();
    const fresh = loadProgress();
    // Keep locale and name
    fresh.locale = progress.locale;
    fresh.userName = progress.userName;
    saveProgress(fresh);
    setProgress(fresh);
    setLessonIndex(0);
    playSound('advance');
    setScreen('lesson');
  }, [progress.locale, progress.userName]);

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

  const isMenuScreen = screen === 'lang' || screen === 'welcome' || screen === 'complete' || screen === 'menu' || screen === 'modules' || screen === 'confirmReset';

  // Global Tab toggle for cheat sheet — any key closes it
  useInput((_input, key) => {
    if (showCheatSheet) {
      setShowCheatSheet(false);
    } else if (key.tab) {
      setShowCheatSheet(true);
    }
  });

  // Confirm reset screen input
  const ConfirmReset = () => {
    useInput((_input, key) => {
      if (key.return) handleConfirmReset();
      if (key.escape) setScreen('menu');
    });
    return (
      <Box flexDirection="column" gap={spacing.sm}>
        <Text color={theme.warning} bold>{'  '}{ui().menuConfirmReset}</Text>
      </Box>
    );
  };

  return (
    <Box flexDirection="column" minHeight={16}>

      {/* ── SPLASH: animated logo, full screen ── */}
      {screen === 'splash' && (
        <SplashScreen onDone={handleSplashDone} />
      )}

      {/* ── MENU SCREENS: logo header + content ── */}
      {isMenuScreen && !showCheatSheet && (
        <Box flexDirection="column">
          <Box paddingX={spacing.md} paddingTop={1} paddingBottom={1} flexDirection="column">
            <Logo />
            {progress.userName && (
              <Box paddingTop={1} gap={2}>
                <Text color={theme.textMuted}>{progress.userName}</Text>
                {hasProgress && (
                  <>
                    <Text color={theme.textGhost}>|</Text>
                    <XpBar xp={progress.xp ?? 0} locale={getLocale()} />
                    <Text color={theme.textGhost}>|</Text>
                    <ProgressBar current={progress.completedLessons.length} total={allLessons.length} />
                  </>
                )}
                {streakInfo.streak >= 2 && (
                  <>
                    <Text color={theme.textGhost}>|</Text>
                    <StreakBadge streak={streakInfo.streak} />
                  </>
                )}
              </Box>
            )}
          </Box>

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

            {screen === 'menu' && (
              <MainMenu
                hasProgress={hasProgress}
                isGraduated={isGraduated}
                onSelect={handleMenuSelect}
              />
            )}

            {screen === 'modules' && (
              <ModulePicker
                lessons={allLessons}
                completedLessons={progress.completedLessons}
                onSelect={handleModuleSelect}
                onBack={() => setScreen('menu')}
              />
            )}

            {screen === 'confirmReset' && <ConfirmReset />}

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

      {/* ── CHEAT SHEET OVERLAY ── */}
      {showCheatSheet && screen !== 'splash' && (
        <CheatSheet />
      )}

      {/* ── LESSON SCREEN: compact header + lesson ── */}
      {screen === 'lesson' && !showCheatSheet && (
        <Box flexDirection="column">
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

          {levelUpInfo && (
            <Box paddingY={1}>
              <LevelUp level={levelUpInfo} locale={getLocale()} onDone={handleLevelUpDone} />
            </Box>
          )}

          {streakInfo.isNewDay && streakInfo.streak >= 2 && !levelUpInfo && (
            <Box paddingX={spacing.md} paddingTop={1}>
              <Text color={theme.warning}>{fmt(ui().streakWelcome, { n: String(streakInfo.streak) })}</Text>
            </Box>
          )}

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

      {/* ── Global Tab hint ── */}
      {screen !== 'splash' && !showCheatSheet && (
        <Box justifyContent="flex-end" paddingX={2} marginTop={1}>
          <Text color={theme.textGhost}>{ui().cheatSheetHint}</Text>
        </Box>
      )}
    </Box>
  );
}
