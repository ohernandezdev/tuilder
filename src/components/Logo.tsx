import React from 'react';
import { Box, Text } from 'ink';
import { theme } from '../theme.js';

const LOGO = `  _         _ _     _
 | |_ _   _(_) | __| | ___ _ __
 | __| | | | | |/ _\` |/ _ \\ '__|
 | |_| |_| | | | (_| |  __/ |
  \\__|\\__,_|_|_|\\__,_|\\___|_|`;

const LOGO_LINES = LOGO.split('\n');

export function Logo({ compact }: { compact?: boolean }) {
  if (compact) {
    return <Text color={theme.brand} bold>tuilder</Text>;
  }

  return (
    <Box flexDirection="column">
      {LOGO_LINES.map((line, i) => (
        <Text key={i} color={theme.brand} bold>{line}</Text>
      ))}
    </Box>
  );
}
