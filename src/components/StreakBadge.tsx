import React from 'react';
import { Text } from 'ink';
import { theme } from '../theme.js';
import { ui, fmt } from '../i18n/index.js';

interface StreakBadgeProps {
  streak: number;
}

export function StreakBadge({ streak }: StreakBadgeProps) {
  if (streak < 2) return null;

  const color = streak >= 7 ? theme.brand : theme.warning;
  const label = fmt(ui().streakDays, { n: String(streak) });

  return <Text color={color} bold>{label}</Text>;
}
