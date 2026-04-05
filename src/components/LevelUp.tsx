import React, { useEffect } from 'react';
import { Box, Text } from 'ink';
import { theme } from '../theme.js';
import { type Level } from '../utils/xp.js';
import { type Locale } from '../i18n/types.js';
import { ui } from '../i18n/index.js';
import { playSound } from '../utils/sound.js';

interface LevelUpProps {
  level: Level;
  locale: Locale;
  onDone: () => void;
}

export function LevelUp({ level, locale, onDone }: LevelUpProps) {
  useEffect(() => {
    playSound('celebrate');
    const timer = setTimeout(onDone, 2000);
    return () => clearTimeout(timer);
  }, [onDone]);

  const title = `${ui().levelUp}  →  ${ui().level}${level.id}`;
  const name = level.name[locale];
  const width = Math.max(title.length, name.length) + 6;
  const pad = (s: string) => {
    const total = width - 4;
    const left = Math.floor((total - s.length) / 2);
    const right = total - s.length - left;
    return ' '.repeat(left) + s + ' '.repeat(right);
  };

  return (
    <Box flexDirection="column" alignItems="center" paddingY={1}>
      <Text color={theme.brand}>{'╔' + '═'.repeat(width - 2) + '╗'}</Text>
      <Text color={theme.brand}>{'║ '}<Text color={theme.success} bold>{pad(title)}</Text>{' ║'}</Text>
      <Text color={theme.brand}>{'║ '}<Text color={theme.text}>{pad(name)}</Text>{' ║'}</Text>
      <Text color={theme.brand}>{'╚' + '═'.repeat(width - 2) + '╝'}</Text>
    </Box>
  );
}
