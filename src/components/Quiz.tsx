import React, { useState, useCallback, useEffect } from 'react';
import { Box, Text, useInput } from 'ink';
import { theme, spacing } from '../theme.js';
import { ui, fmt } from '../i18n/index.js';
import { playSound } from '../utils/sound.js';
import { XP_PER_QUIZ_CORRECT } from '../utils/xp.js';

export interface QuizQuestion {
  question: string;
  options: string[];     // 4 options
  correct: number;       // index of correct answer (0-3)
  explanation: string;   // shown after answering
}

interface QuizProps {
  questions: QuizQuestion[];
  onComplete: (correctCount: number) => void;
}

type QuizState = 'choosing' | 'answered';

export function Quiz({ questions, onComplete }: QuizProps) {
  const [questionIndex, setQuestionIndex] = useState(0);
  const [selected, setSelected] = useState(0);
  const [state, setState] = useState<QuizState>('choosing');
  const [chosenAnswer, setChosenAnswer] = useState(-1);
  const [correctCount, setCorrectCount] = useState(0);
  const [finished, setFinished] = useState(false);

  const current = questions[questionIndex];

  // Auto-advance after answering
  useEffect(() => {
    if (state !== 'answered') return;
    const timer = setTimeout(() => {
      const nextIndex = questionIndex + 1;
      if (nextIndex >= questions.length) {
        setFinished(true);
      } else {
        setQuestionIndex(nextIndex);
        setSelected(0);
        setState('choosing');
        setChosenAnswer(-1);
      }
    }, 1200);
    return () => clearTimeout(timer);
  }, [state, questionIndex, questions.length]);

  const handleSelect = useCallback(() => {
    if (state !== 'choosing' || !current) return;
    setChosenAnswer(selected);
    const isCorrect = selected === current.correct;
    if (isCorrect) {
      playSound('success');
      setCorrectCount(prev => prev + 1);
    } else {
      playSound('error');
    }
    setState('answered');
  }, [state, selected, current]);

  useInput((_input, key) => {
    if (finished) {
      if (key.return) {
        onComplete(correctCount);
      }
      return;
    }
    if (state === 'choosing' && current) {
      if (key.upArrow) {
        setSelected(prev => (prev > 0 ? prev - 1 : current.options.length - 1));
      }
      if (key.downArrow) {
        setSelected(prev => (prev < current.options.length - 1 ? prev + 1 : 0));
      }
      if (key.return) {
        handleSelect();
      }
    }
  });

  if (finished) {
    const xpEarned = correctCount * XP_PER_QUIZ_CORRECT;
    return (
      <Box flexDirection="column" paddingX={spacing.md} gap={spacing.sm}>
        <Text color={theme.brand} bold>{fmt(ui().quizResult, { n: String(correctCount), total: String(questions.length) })}</Text>
        <Text color={theme.success}>+{xpEarned} XP</Text>
        <Text color={theme.textMuted}>{ui().pressEnter} Enter {ui().toContinue}</Text>
      </Box>
    );
  }

  if (!current) return null;

  return (
    <Box flexDirection="column" paddingX={spacing.md} gap={spacing.sm}>
      {/* Progress */}
      <Text color={theme.textSecondary}>{questionIndex + 1} <Text color={theme.textMuted}>/ {questions.length}</Text></Text>

      {/* Question */}
      <Text color={theme.text} bold>{current.question}</Text>

      {/* Options */}
      <Box flexDirection="column">
        {current.options.map((option, i) => {
          let color: string = theme.textSecondary;
          let prefix = '  ';

          if (state === 'answered') {
            if (i === current.correct) {
              color = theme.success;
            } else if (i === chosenAnswer && chosenAnswer !== current.correct) {
              color = theme.error;
            }
            prefix = i === chosenAnswer ? '▸ ' : '  ';
          } else {
            prefix = i === selected ? '▸ ' : '  ';
            if (i === selected) color = theme.text;
          }

          return (
            <Text key={i} color={color}>
              {prefix}{option}
            </Text>
          );
        })}
      </Box>

      {/* Explanation after answering */}
      {state === 'answered' && (
        <Box borderStyle="round" borderColor={theme.borderDim} paddingX={1}>
          <Text color={theme.info}>{current.explanation}</Text>
        </Box>
      )}
    </Box>
  );
}
