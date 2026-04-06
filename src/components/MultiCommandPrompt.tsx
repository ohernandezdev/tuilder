import React, { useState, useEffect } from 'react';
import { Box, Text, useInput } from 'ink';
import TextInput from 'ink-text-input';
import { theme } from '../theme.js';
import { ui } from '../i18n/index.js';
import { playSound } from '../utils/sound.js';
import { EnterPrompt } from './EnterPrompt.js';
import { colorize } from '../utils/colorize.js';

// Challenge-based practice. Shows a goal in natural language,
// user has to figure out the right command. Hints reveal progressively.

export interface CommandStep {
  challenge: string;   // "Averigua en qué carpeta estás"
  command: string;     // "pwd" — the correct answer
  acceptPattern?: string; // optional regex for flexible matching (e.g. natural language steps)
  output: string[];    // simulated terminal output
  hint1?: string;      // gentle nudge: "Recuerda el comando de 3 letras..."
  hint2?: string;      // direct: "El comando es pwd"
}

interface MultiCommandPromptProps {
  steps: CommandStep[];
  onComplete: () => void;
  onBack?: () => void;
  prompt?: string;
}

export function MultiCommandPrompt({ steps, onComplete, onBack, prompt }: MultiCommandPromptProps) {
  const [currentStep, setCurrentStep] = useState(0);
  const [value, setValue] = useState('');
  const [error, setError] = useState('');
  const [history, setHistory] = useState<{ command: string; output: string[] }[]>([]);
  const [done, setDone] = useState(false);
  const [attempts, setAttempts] = useState(0);
  const [showHint1, setShowHint1] = useState(false);
  const [showHint2, setShowHint2] = useState(false);
  const [shakeCount, setShakeCount] = useState(0);
  const [shakeOffset, setShakeOffset] = useState(0);

  const step = steps[currentStep];

  // Auto-show hint1 after 10s, hint2 after 20s
  useEffect(() => {
    setShowHint1(false);
    setShowHint2(false);
    setAttempts(0);
    const t1 = setTimeout(() => setShowHint1(true), 10000);
    const t2 = setTimeout(() => setShowHint2(true), 20000);
    return () => { clearTimeout(t1); clearTimeout(t2); };
  }, [currentStep]);

  // Show hints earlier on failed attempts
  useEffect(() => {
    if (attempts >= 2) setShowHint1(true);
    if (attempts >= 4) setShowHint2(true);
  }, [attempts]);

  // Shake
  React.useEffect(() => {
    if (shakeCount === 0) return;
    const seq = [3, -3, 2, -2, 1, 0];
    let s = 0;
    setShakeOffset(seq[0]!);
    const interval = setInterval(() => {
      s++;
      if (s >= seq.length) { clearInterval(interval); setShakeOffset(0); return; }
      setShakeOffset(seq[s]!);
    }, 50);
    return () => clearInterval(interval);
  }, [shakeCount]);

  useInput((_input, key) => {
    if (key.escape && onBack) onBack();
    if (key.return && done) onComplete();
  });

  const handleSubmit = (input: string) => {
    if (!step) return;
    const trimmed = input.trim();

    const matches = step.acceptPattern
      ? new RegExp(step.acceptPattern, 'i').test(trimmed)
      : trimmed.toLowerCase() === step.command.toLowerCase();
    if (matches) {
      playSound('success');
      setError('');
      setValue('');
      const newHistory = [...history, { command: step.command, output: step.output }];
      setHistory(newHistory);
      if (currentStep >= steps.length - 1) {
        setDone(true);
      } else {
        setCurrentStep(prev => prev + 1);
      }
    } else if (trimmed === '') {
      setError(ui().writeSomethingFirst);
      playSound('error');
      setShakeCount(prev => prev + 1);
    } else {
      setAttempts(prev => prev + 1);
      playSound('error');
      setShakeCount(prev => prev + 1);
      setError(trimmed);
      setValue('');
    }
  };

  const leftPad = Math.max(0, 2 + shakeOffset);

  return (
    <Box flexDirection="column" gap={0}>
      {/* History */}
      {history.map((entry, i) => (
        <Box key={i} flexDirection="column">
          <Box>
            <Text color={theme.success}>{(prompt ?? '$') + ' '}</Text>
            <Text color={theme.text}>{entry.command}</Text>
          </Box>
          {entry.output.map((line, j) => (
            <Box key={j} paddingLeft={2}>{colorize(line, theme)}</Box>
          ))}
        </Box>
      ))}

      {done ? (
        <Box flexDirection="column" marginTop={1}>
          <EnterPrompt />
        </Box>
      ) : step ? (
        <Box flexDirection="column" marginTop={history.length > 0 ? 1 : 0}>
          {/* Step progress */}
          <Text color={theme.textMuted}>{currentStep + 1}/{steps.length}</Text>

          {/* Challenge text */}
          <Text color={theme.info} bold>{step.challenge}</Text>

          {/* Input */}
          <Box marginLeft={shakeOffset} marginTop={1}>
            <Text color={theme.success}>{(prompt ?? '$') + ' '}</Text>
            <TextInput value={value} onChange={setValue} onSubmit={handleSubmit} />
          </Box>

          {/* Error — show what they typed */}
          {error && error !== ui().writeSomethingFirst && (
            <Text color={theme.warning}>{'  '}{error}: {ui().commandNotRecognized}</Text>
          )}
          {error === ui().writeSomethingFirst && (
            <Text color={theme.warning}>{'  '}{error}</Text>
          )}

          {/* Progressive hints */}
          {showHint1 && step.hint1 && !showHint2 && (
            <Text color={theme.textMuted}>{'  💡 '}{step.hint1}</Text>
          )}
          {showHint2 && step.hint2 && (
            <Text color={theme.commandHighlight}>{'  → '}{step.hint2}</Text>
          )}
        </Box>
      ) : null}
    </Box>
  );
}
