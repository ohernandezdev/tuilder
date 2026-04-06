import React, { useState, useEffect, useCallback } from 'react';
import { Box, Text, useInput } from 'ink';
import { theme, spacing } from '../theme.js';
import { ui } from '../i18n/index.js';
import { type Lesson } from '../types.js';
import { CommandPrompt } from './CommandPrompt.js';
import { TypeWriter } from './TypeWriter.js';
import { EnterPrompt } from './EnterPrompt.js';
import { playSound } from '../utils/sound.js';
import { ControlsTutorial } from './ControlsTutorial.js';
import { MultiCommandPrompt } from './MultiCommandPrompt.js';
import { Quiz } from './Quiz.js';
import { addXp } from '../store/progress.js';
import { XP_PER_QUIZ_CORRECT } from '../utils/xp.js';
import { AgentSimulation } from './AgentSimulation.js';

// Only 2 phases now: learn the concept, then do the task (with inline output)
type Phase = 'learn' | 'task';

interface LessonFrameProps {
  lesson: Lesson;
  onComplete: () => void;
  onBack?: () => void;
  userName?: string;
}

function getPhases(lesson: Lesson): Phase[] {
  const phases: Phase[] = ['learn'];
  if (lesson.command || lesson.interactive || lesson.simulate || lesson.practiceSteps || lesson.quizQuestions || lesson.agentSimulation) phases.push('task');
  return phases;
}

function PhaseProgress({ phases, currentIndex }: { phases: Phase[]; currentIndex: number }) {
  return (
    <Box>
      {phases.map((_, i) => (
        <Text key={i} color={i <= currentIndex ? theme.brand : theme.textGhost}>
          {i <= currentIndex ? '━━' : '──'}
        </Text>
      ))}
    </Box>
  );
}

export function LessonFrame({ lesson, onComplete, onBack, userName }: LessonFrameProps) {
  const t = (text: string) => userName ? text.replace(/\{nombre\}/g, userName) : text;

  const phases = getPhases(lesson);
  const [phaseIndex, setPhaseIndex] = useState(0);
  const [showHint, setShowHint] = useState(false);
  // For lessons without command but with simulate (Enter-to-continue lessons with output)
  const [simDone, setSimDone] = useState(false);
  const currentPhase = phases[phaseIndex]!;

  useEffect(() => {
    setPhaseIndex(0);
    setShowHint(false);
    setSimDone(false);
  }, [lesson.id]);

  useEffect(() => {
    if (currentPhase !== 'task') return;
    setShowHint(false);
    const timer = setTimeout(() => setShowHint(true), 8000);
    return () => clearTimeout(timer);
  }, [currentPhase]);

  const finish = useCallback(() => {
    const isModuleEnd = lesson.id.endsWith('.10') || lesson.id.endsWith('.11') || lesson.id.endsWith('.12');
    playSound(isModuleEnd ? 'complete' : 'success');
    onComplete();
  }, [onComplete, lesson.id]);

  const advance = useCallback(() => {
    if (phaseIndex < phases.length - 1) {
      playSound('advance');
      setPhaseIndex(prev => prev + 1);
    } else {
      finish();
    }
  }, [phaseIndex, phases.length, finish]);

  const goBack = useCallback(() => {
    if (phaseIndex > 0) {
      setPhaseIndex(prev => prev - 1);
    } else if (onBack) {
      onBack();
    }
  }, [phaseIndex, onBack]);

  useInput((_input, key) => {
    if (key.return) {
      if (currentPhase === 'learn') advance();
      // No-command lessons: Enter on task phase either waits for sim or advances
      if (currentPhase === 'task' && !lesson.command && !lesson.interactive && !lesson.practiceSteps && !lesson.quizQuestions && !lesson.agentSimulation) {
        if (!lesson.simulate || simDone) finish();
      }
    }
    if ((key.leftArrow || key.escape) && currentPhase !== 'task') {
      goBack();
    }
  });

  return (
    <Box flexDirection="column" paddingX={spacing.md}>
      {/* Header */}
      <Box flexDirection="column" gap={spacing.xs}>
        <PhaseProgress phases={phases} currentIndex={phaseIndex} />
        <Text color={theme.brand} bold>{t(lesson.title)}</Text>
      </Box>

      <Text>{' '}</Text>

      {/* ── LEARN ── */}
      {currentPhase === 'learn' && (
        <Box flexDirection="column" gap={spacing.sm}>
          {lesson.concept.split('\n\n').map((paragraph, i) => (
            <Text key={i} color={theme.text}>{t(paragraph)}</Text>
          ))}

          {lesson.analogy && (
            <Box borderStyle="round" borderColor={theme.borderDim} paddingX={1}>
              <Text color={theme.info}>{t(lesson.analogy)}</Text>
            </Box>
          )}

          <Text color={theme.textSecondary}>{t(lesson.why)}</Text>

          <EnterPrompt />
        </Box>
      )}

      {/* ── TASK ── */}
      {currentPhase === 'task' && (
        <Box flexDirection="column" gap={spacing.sm}>
          {/* Quiz */}
          {lesson.quizQuestions ? (
            <Quiz
              questions={lesson.quizQuestions}
              onComplete={(correctCount) => {
                addXp(correctCount * XP_PER_QUIZ_CORRECT);
                finish();
              }}
            />
          ) : lesson.interactive === 'controls-tutorial' ? (
            <ControlsTutorial onComplete={finish} />
          ) : lesson.interactive === 'agent-simulation' && lesson.agentSimulation ? (
            <AgentSimulation
              simulation={lesson.agentSimulation}
              onComplete={finish}
              onBack={goBack}
            />
          ) : lesson.practiceSteps ? (
            /* Multi-command practice */
            <>
              <Text color={theme.brand} bold>{'  '}{ui().yourTurn}</Text>
              <Text color={theme.text}>{t(lesson.task)}</Text>
              <MultiCommandPrompt
                steps={lesson.practiceSteps}
                onComplete={finish}
                onBack={goBack}
              />
            </>
          ) : lesson.command ? (
            /* Command input with inline output */
            <>
              <Text color={theme.brand} bold>{'  '}{ui().yourTurn}</Text>
              <Text color={theme.text}>{t(lesson.task)}</Text>
              <CommandPrompt
                expectedCommand={lesson.command}
                onComplete={finish}
                hint={lesson.hint}
                onBack={goBack}
                simulateLines={lesson.simulate?.lines}
                simulateDelay={lesson.simulate?.delay}
              />
            </>
          ) : lesson.simulate ? (
            /* No command, but has simulate output (e.g. recap screens) */
            <Box flexDirection="column" gap={spacing.sm}>
              <TypeWriter
                lines={lesson.simulate.lines}
                delay={lesson.simulate.delay}
                onDone={() => setSimDone(true)}
                color={theme.success}
              />
              {simDone && <EnterPrompt />}
            </Box>
          ) : (
            <EnterPrompt />
          )}
        </Box>
      )}

      {/* ── Nav hint ── */}
      <Box marginTop={1}>
        <Text color={theme.textGhost}>{'  '}{ui().escToGoBack}</Text>
      </Box>
    </Box>
  );
}
