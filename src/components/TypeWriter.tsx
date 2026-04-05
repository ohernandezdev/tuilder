import React, { useState, useEffect, useRef } from 'react';
import { Box, Text } from 'ink';
import { theme } from '../theme.js';
import { colorize } from '../utils/colorize.js';

interface TypeWriterProps {
  lines: string[];
  delay?: number;
  onDone: () => void;
  color?: string;
}

export function TypeWriter({ lines, delay = 50, onDone, color }: TypeWriterProps) {
  const [visibleCount, setVisibleCount] = useState(0);
  const onDoneRef = useRef(onDone);
  onDoneRef.current = onDone;

  useEffect(() => {
    if (visibleCount >= lines.length) {
      const timer = setTimeout(() => onDoneRef.current(), 800);
      return () => clearTimeout(timer);
    }

    const timer = setTimeout(() => {
      setVisibleCount(prev => prev + 1);
    }, delay);

    return () => clearTimeout(timer);
  }, [visibleCount, lines.length, delay]);

  return (
    <Box flexDirection="column">
      {lines.slice(0, visibleCount).map((line, i) => (
        <Box key={i}>{color ? <Text color={color}>{line}</Text> : colorize(line, theme)}</Box>
      ))}
    </Box>
  );
}
