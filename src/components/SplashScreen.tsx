import React, { useState, useEffect, useRef } from 'react';
import { Box, Text } from 'ink';
import { theme } from '../theme.js';
import { ui } from '../i18n/index.js';
import { playSound } from '../utils/sound.js';

const LOGO = `  _         _ _     _
 | |_ _   _(_) | __| | ___ _ __
 | __| | | | | |/ _\` |/ _ \\ '__|
 | |_| |_| | | | (_| |  __/ |
  \\__|\\__,_|_|_|\\__,_|\\___|_|   `;

const LOGO_LINES = LOGO.split('\n');
const TOTAL_CHARS = LOGO.length;

// ~8ms per char so the whole logo takes about 1-1.3s
const CHAR_DELAY_MS = 8;
const TAGLINE_DELAY_MS = 2000; // tagline fade-in after logo
const DONE_DELAY_MS = 2500;    // total before calling onDone

interface SplashScreenProps {
  onDone: () => void;
}

export function SplashScreen({ onDone }: SplashScreenProps) {
  const [revealedCount, setRevealedCount] = useState(0);
  const [showTagline, setShowTagline] = useState(false);
  const logoFinished = revealedCount >= TOTAL_CHARS;
  const celebrateFired = useRef(false);

  // Typewriter reveal
  useEffect(() => {
    if (logoFinished) return;
    const timer = setTimeout(() => {
      setRevealedCount((c) => c + 1);
    }, CHAR_DELAY_MS);
    return () => clearTimeout(timer);
  }, [revealedCount, logoFinished]);

  // Play sound when logo finishes
  useEffect(() => {
    if (logoFinished && !celebrateFired.current) {
      celebrateFired.current = true;
      playSound('celebrate');
    }
  }, [logoFinished]);

  // Show tagline after a delay
  useEffect(() => {
    const timer = setTimeout(() => setShowTagline(true), TAGLINE_DELAY_MS);
    return () => clearTimeout(timer);
  }, []);

  // Call onDone after total duration
  useEffect(() => {
    const timer = setTimeout(onDone, DONE_DELAY_MS);
    return () => clearTimeout(timer);
  }, [onDone]);

  // Build the revealed text, character by character across all lines
  let remaining = revealedCount;
  const renderedLines = LOGO_LINES.map((line) => {
    if (remaining <= 0) return '';
    if (remaining >= line.length) {
      remaining -= line.length;
      // account for the newline separator
      remaining -= 1;
      return line;
    }
    const partial = line.slice(0, remaining);
    remaining = 0;
    return partial;
  });

  return (
    <Box flexDirection="column" alignItems="center" justifyContent="center" minHeight={12} paddingY={2}>
      <Box flexDirection="column">
        {renderedLines.map((line, i) => (
          <Text key={i} color={theme.brand} bold>
            {line}
          </Text>
        ))}
      </Box>

      {showTagline && (
        <Box marginTop={1}>
          <Text color={theme.textSecondary}>{ui().welcomeSubtitle}</Text>
        </Box>
      )}
    </Box>
  );
}
