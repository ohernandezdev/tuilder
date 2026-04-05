import React, { useState, useCallback } from 'react';
import { Box, Text, useInput } from 'ink';
import TextInput from 'ink-text-input';
import { theme } from '../theme.js';
import { ui } from '../i18n/index.js';
import { playSound } from '../utils/sound.js';
import { TypeWriter } from './TypeWriter.js';
import { colorize } from '../utils/colorize.js';
import { EnterPrompt } from './EnterPrompt.js';

// Simulates an AI agent session: user gives instruction → agent responds → shows diff → user approves/rejects

interface AgentSimulationProps {
  simulation: {
    scenario: string;
    promptHint: string;
    acceptedPatterns: string[];
    agentResponse: string[];
    diffLines: string[];
    approveIsCorrect: boolean;
    explanation: string;
  };
  onComplete: () => void;
  onBack?: () => void;
}

type Phase = 'scenario' | 'prompt' | 'thinking' | 'diff' | 'decision' | 'result';

export function AgentSimulation({ simulation, onComplete, onBack }: AgentSimulationProps) {
  const [phase, setPhase] = useState<Phase>('scenario');
  const [promptValue, setPromptValue] = useState('');
  const [promptError, setPromptError] = useState('');
  const [selectedChoice, setSelectedChoice] = useState(0); // 0=approve, 1=reject
  const [wasCorrect, setWasCorrect] = useState(false);
  const [thinkingDone, setThinkingDone] = useState(false);

  const handlePromptSubmit = useCallback((input: string) => {
    const trimmed = input.trim().toLowerCase();
    if (!trimmed) {
      setPromptError(ui().writeSomethingFirst);
      return;
    }
    const matches = simulation.acceptedPatterns.some(pattern =>
      new RegExp(pattern, 'i').test(trimmed)
    );
    if (matches) {
      playSound('success');
      setPromptError('');
      setPhase('thinking');
    } else {
      playSound('error');
      setPromptError(simulation.promptHint);
      setPromptValue('');
    }
  }, [simulation]);

  const handleDecision = useCallback(() => {
    const userApproved = selectedChoice === 0;
    const correct = userApproved === simulation.approveIsCorrect;
    setWasCorrect(correct);
    playSound(correct ? 'success' : 'error');
    setPhase('result');
  }, [selectedChoice, simulation.approveIsCorrect]);

  useInput((_input, key) => {
    if (key.escape && onBack && phase === 'scenario') {
      onBack();
    }
    if (key.return) {
      if (phase === 'scenario') setPhase('prompt');
      if (phase === 'diff') setPhase('decision');
      if (phase === 'result') onComplete();
    }
    if (phase === 'thinking' && thinkingDone) {
      if (key.return) setPhase('diff');
    }
    if (phase === 'decision') {
      if (key.upArrow || key.downArrow) {
        setSelectedChoice(prev => prev === 0 ? 1 : 0);
      }
      if (key.return) handleDecision();
    }
  });

  return (
    <Box flexDirection="column" gap={1}>
      {/* Scenario */}
      {phase === 'scenario' && (
        <Box flexDirection="column" gap={1}>
          <Text color={theme.info} bold>{'  '}{simulation.scenario}</Text>
          <EnterPrompt />
        </Box>
      )}

      {/* Prompt — user types instruction */}
      {phase === 'prompt' && (
        <Box flexDirection="column" gap={1}>
          <Text color={theme.textSecondary}>{'  '}{simulation.scenario}</Text>
          <Text>{' '}</Text>
          <Text color={theme.brand} bold>{'  '}{ui().yourTurn}</Text>
          <Box paddingLeft={2}>
            <Text color={theme.brand} bold>{'> '}</Text>
            <TextInput value={promptValue} onChange={setPromptValue} onSubmit={handlePromptSubmit} />
          </Box>
          {promptError && (
            <Text color={theme.warning}>{'    '}{promptError}</Text>
          )}
          <Text color={theme.textMuted}>{'    '}{simulation.promptHint}</Text>
        </Box>
      )}

      {/* Thinking — agent response typewriter */}
      {phase === 'thinking' && (
        <Box flexDirection="column" gap={1}>
          <Box paddingLeft={2}>
            <Text color={theme.brand} bold>{'> '}</Text>
            <Text color={theme.text}>{promptValue}</Text>
          </Box>
          <Text>{' '}</Text>
          <Box paddingLeft={2} flexDirection="column">
            <TypeWriter
              lines={simulation.agentResponse}
              delay={200}
              onDone={() => setThinkingDone(true)}
              color={theme.textSecondary}
            />
          </Box>
          {thinkingDone && <EnterPrompt />}
        </Box>
      )}

      {/* Diff display */}
      {phase === 'diff' && (
        <Box flexDirection="column" gap={1}>
          <Text color={theme.textMuted}>{'  diff:'}</Text>
          <Box flexDirection="column" paddingLeft={2}>
            {simulation.diffLines.map((line, i) => (
              <Box key={i}>{colorize(line, theme)}</Box>
            ))}
          </Box>
          <EnterPrompt />
        </Box>
      )}

      {/* Decision — approve or reject */}
      {phase === 'decision' && (
        <Box flexDirection="column" gap={1}>
          <Box flexDirection="column" paddingLeft={2}>
            {simulation.diffLines.map((line, i) => (
              <Box key={i}>{colorize(line, theme)}</Box>
            ))}
          </Box>
          <Text>{' '}</Text>
          <Text color={theme.brand} bold>{'  '}{ui().yourTurn}</Text>
          <Box flexDirection="column" paddingLeft={2}>
            <Text color={selectedChoice === 0 ? theme.success : theme.textSecondary}>
              {selectedChoice === 0 ? '  ▸ ' : '    '}{ui().approve}
            </Text>
            <Text color={selectedChoice === 1 ? theme.error : theme.textSecondary}>
              {selectedChoice === 1 ? '  ▸ ' : '    '}{ui().reject}
            </Text>
          </Box>
          <Text color={theme.textMuted}>{'    ↑↓ + Enter'}</Text>
        </Box>
      )}

      {/* Result */}
      {phase === 'result' && (
        <Box flexDirection="column" gap={1}>
          {wasCorrect ? (
            <Text color={theme.success} bold>{'  ✓ '}{simulation.explanation}</Text>
          ) : (
            <Box flexDirection="column">
              <Text color={theme.error} bold>{'  ✗ '}{simulation.explanation}</Text>
            </Box>
          )}
          <EnterPrompt />
        </Box>
      )}
    </Box>
  );
}
