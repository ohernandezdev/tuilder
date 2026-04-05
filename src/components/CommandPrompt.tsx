import React, { useState, useEffect } from 'react';
import { Box, Text, useInput } from 'ink';
import TextInput from 'ink-text-input';
import { theme } from '../theme.js';
import { ui, fmt } from '../i18n/index.js';
import { playSound } from '../utils/sound.js';
import { TypeWriter } from './TypeWriter.js';
import { EnterPrompt } from './EnterPrompt.js';

interface CommandPromptProps {
  expectedCommand: string;
  onComplete: () => void;
  hint?: string;
  onBack?: () => void;
  simulateLines?: string[];
  simulateDelay?: number;
}

export function CommandPrompt({ expectedCommand, onComplete, hint, onBack, simulateLines, simulateDelay }: CommandPromptProps) {
  const [value, setValue] = useState('');
  const [error, setError] = useState('');
  const [showHint, setShowHint] = useState(false);
  const [attempts, setAttempts] = useState(0);
  const [shakeOffset, setShakeOffset] = useState(0);
  const [shakeCount, setShakeCount] = useState(0);

  // After success: show output inline
  const [succeeded, setSucceeded] = useState(false);
  const [outputDone, setOutputDone] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setShowHint(true), 8000);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (shakeCount === 0) return;
    const sequence = [3, -3, 2, -2, 1, 0];
    let step = 0;
    setShakeOffset(sequence[0]!);
    const interval = setInterval(() => {
      step++;
      if (step >= sequence.length) {
        clearInterval(interval);
        setShakeOffset(0);
        return;
      }
      setShakeOffset(sequence[step]!);
    }, 50);
    return () => clearInterval(interval);
  }, [shakeCount]);

  const triggerShake = () => setShakeCount(prev => prev + 1);

  // Handle Enter after output is shown
  useInput((_input, key) => {
    if (key.escape && onBack && !succeeded) onBack();
    if (key.return && succeeded && outputDone) onComplete();
  });

  const handleSubmit = (input: string) => {
    const trimmed = input.trim();
    if (trimmed.toLowerCase() === expectedCommand.toLowerCase()) {
      setError('');
      playSound('success');
      if (simulateLines && simulateLines.length > 0) {
        setSucceeded(true);
      } else {
        onComplete();
      }
    } else if (trimmed === '') {
      setError(ui().writeSomethingFirst);
      playSound('error');
      triggerShake();
    } else {
      setAttempts(prev => prev + 1);
      playSound('error');
      triggerShake();
      if (attempts >= 1) {
        setError(fmt(ui().dontWorryWriteExactly, { cmd: expectedCommand }));
        setShowHint(true);
      } else {
        setError(fmt(ui().almostTryAgain, { cmd: expectedCommand }));
      }
      setValue('');
    }
  };

  const leftPad = Math.max(0, 2 + shakeOffset);

  // ── After success: show command + output inline ──
  if (succeeded) {
    return (
      <Box flexDirection="column" gap={1}>
        {/* The command the user typed (frozen) */}
        <Box paddingLeft={2}>
          <Text color={theme.brand} bold>{'> '}</Text>
          <Text color={theme.text}>{expectedCommand}</Text>
        </Box>

        {/* Simulated output — appears line by line */}
        {simulateLines && (
          <Box paddingLeft={2} flexDirection="column">
            <TypeWriter
              lines={simulateLines}
              delay={simulateDelay ?? 400}
              onDone={() => setOutputDone(true)}
              color={theme.textSecondary}
            />
          </Box>
        )}

        {outputDone && <EnterPrompt />}
      </Box>
    );
  }

  // ── Input mode ──
  return (
    <Box flexDirection="column" gap={1}>
      <Box paddingLeft={leftPad}>
        <Text color={theme.brand} bold>{'> '}</Text>
        <TextInput value={value} onChange={setValue} onSubmit={handleSubmit} />
      </Box>

      {error && (
        <Text color={theme.warning}>{'    '}{error}</Text>
      )}

      {showHint && hint && !error && (
        <Text color={theme.info}>{'    '}{hint}</Text>
      )}

      <Text color={theme.textMuted}>
        {'    '}
        {ui().writeAndEnter.split('{cmd}')[0]}
        <Text color={theme.commandHighlight} bold>{expectedCommand}</Text>
        {ui().writeAndEnter.split('{cmd}')[1] ?? ''}
      </Text>
    </Box>
  );
}
