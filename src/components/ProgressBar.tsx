import React from 'react';
import { Text } from 'ink';
import { theme } from '../theme.js';

interface ProgressBarProps {
  current: number;
  total: number;
  width?: number;
}

export function ProgressBar({ current, total, width = 20 }: ProgressBarProps) {
  const ratio = total > 0 ? current / total : 0;
  const filled = Math.round(ratio * width);
  const empty = width - filled;

  return (
    <Text>
      <Text color={theme.textGhost}>[</Text>
      <Text color={theme.brand}>{'━'.repeat(filled)}</Text>
      <Text color={theme.textGhost}>{'─'.repeat(empty)}</Text>
      <Text color={theme.textGhost}>]</Text>
      <Text color={theme.textSecondary}> {current}/{total}</Text>
    </Text>
  );
}
