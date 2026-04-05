import React from 'react';
import { Text } from 'ink';
import { theme } from '../theme.js';
import { type Locale } from '../i18n/types.js';
import { getLevelProgress } from '../utils/xp.js';

interface XpBarProps {
  xp: number;
  locale: Locale;
  width?: number;
}

export function XpBar({ xp, locale, width = 10 }: XpBarProps) {
  const { current, next, progress } = getLevelProgress(xp);
  const filled = Math.round(progress * width);
  const empty = width - filled;

  const label = next
    ? `${xp}/${next.minXp}`
    : `${xp} MAX`;

  return (
    <Text>
      <Text color={theme.brand} bold>Lv.{current.id}</Text>
      <Text color={theme.textSecondary}> {current.name[locale]} </Text>
      <Text color={theme.textGhost}>[</Text>
      <Text color={theme.brand}>{'━'.repeat(filled)}</Text>
      <Text color={theme.textGhost}>{'─'.repeat(empty)}</Text>
      <Text color={theme.textGhost}>]</Text>
      <Text color={theme.textSecondary}> {label}</Text>
    </Text>
  );
}
