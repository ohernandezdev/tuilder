import React, { useState, useEffect } from 'react';
import { Box, Text } from 'ink';
import { theme } from '../theme.js';
import { ui } from '../i18n/index.js';

interface EnterPromptProps {
  label?: string;
}

export function EnterPrompt({ label }: EnterPromptProps) {
  const [bright, setBright] = useState(true);

  useEffect(() => {
    const interval = setInterval(() => {
      setBright(prev => !prev);
    }, 1200);
    return () => clearInterval(interval);
  }, []);

  return (
    <Box marginTop={1}>
      <Text color={bright ? theme.brand : theme.brandDim}>
        {'  ▸ '}{label ?? ui().pressEnter}{' '}
      </Text>
      <Text color={bright ? theme.inputText : theme.textSecondary} bold inverse>
        {' Enter '}
      </Text>
      <Text color={bright ? theme.brand : theme.brandDim}>
        {' '}{ui().toContinue}
      </Text>
    </Box>
  );
}
