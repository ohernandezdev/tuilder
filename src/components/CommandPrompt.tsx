import React, { useState, useEffect } from 'react';
import { Box, Text, useInput } from 'ink';
import TextInput from 'ink-text-input';
import { theme } from '../theme.js';
import { ui, fmt } from '../i18n/index.js';
import { playSound } from '../utils/sound.js';
import { colorize } from '../utils/colorize.js';
import { TypeWriter } from './TypeWriter.js';
import { EnterPrompt } from './EnterPrompt.js';

interface CommandPromptProps {
  expectedCommand: string;
  onComplete: () => void;
  hint?: string;
  onBack?: () => void;
  simulateLines?: string[];
  simulateDelay?: number;
  prompt?: string;
  prefillLines?: string[]; // lines shown inside terminal BEFORE the input (e.g. previous commands)
}

export function CommandPrompt({ expectedCommand, onComplete, hint, onBack, simulateLines, simulateDelay, prompt, prefillLines }: CommandPromptProps) {
  const [value, setValue] = useState('');
  const [error, setError] = useState('');
  const [showHint, setShowHint] = useState(false);
  const [attempts, setAttempts] = useState(0);
  const [shakeOffset, setShakeOffset] = useState(0);
  const [shakeCount, setShakeCount] = useState(0);

  // After success: show output inline
  const [succeeded, setSucceeded] = useState(false);
  const [outputDone, setOutputDone] = useState(false);

  // CommandPrompt is for LEARNING — always show the command immediately.
  // Only practiceSteps (MultiCommandPrompt) use progressive hints.
  useEffect(() => {
    setShowHint(true);
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
        <Box>
          <Text color={theme.success}>{(prompt ?? '$') + ' '}</Text>
          <Text color={theme.text}>{expectedCommand}</Text>
        </Box>

        {/* Simulated output — appears line by line */}
        {simulateLines && (
          <Box flexDirection="column">
            <TypeWriter
              lines={simulateLines}
              delay={simulateDelay ?? 400}
              onDone={() => setOutputDone(true)}
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
      {/* Prefill: previous terminal content */}
      {prefillLines && prefillLines.length > 0 && (
        <Box flexDirection="column">
          {prefillLines.map((line, i) => (
            <Box key={i}>{colorize(line, theme)}</Box>
          ))}
        </Box>
      )}
      <Box marginLeft={shakeOffset}>
        <Text color={theme.success}>{(prompt ?? '$') + ' '}</Text>
        <TextInput value={value} onChange={setValue} onSubmit={handleSubmit} />
      </Box>

      {error && (
        <Text color={theme.warning}>{'  '}{error}</Text>
      )}

      {showHint && hint && !error && (
        <Text color={theme.info}>{'  '}{hint}</Text>
      )}

      <Text color={theme.textMuted}>
        {'  '}
        {ui().writeAndEnter.split('{cmd}')[0]}
        <Text color={theme.commandHighlight} bold>{expectedCommand}</Text>
        {ui().writeAndEnter.split('{cmd}')[1] ?? ''}
      </Text>
    </Box>
  );
}
