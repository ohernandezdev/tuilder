import React, { useState } from 'react';
import { Box, Text, useInput } from 'ink';
import TextInput from 'ink-text-input';
import { theme } from '../theme.js';
import { ui } from '../i18n/index.js';
import { playSound } from '../utils/sound.js';

// Interactive tutorial — user practices each control one by one.
// Steps: Enter → Esc → ↑↓ arrows → type text

type WaitFor = 'enter' | 'escape' | 'arrows' | 'type';

interface Step {
  getInstruction: () => string;
  waitFor: WaitFor;
  typeTarget?: string;
  getSuccess: () => string;
}

function getSteps(): Step[] {
  return [
    {
      getInstruction: () => ui().controlsStep1,
      waitFor: 'enter',
      getSuccess: () => ui().controlsStep1Success,
    },
    {
      getInstruction: () => ui().controlsStep2,
      waitFor: 'escape',
      getSuccess: () => ui().controlsStep2Success,
    },
    {
      getInstruction: () => ui().controlsStep3,
      waitFor: 'arrows',
      getSuccess: () => ui().controlsStep3Success,
    },
    {
      getInstruction: () => ui().controlsStep4,
      waitFor: 'type',
      typeTarget: 'ok',
      getSuccess: () => ui().controlsStep4Success,
    },
  ];
}

interface ControlsTutorialProps {
  onComplete: () => void;
}

export function ControlsTutorial({ onComplete }: ControlsTutorialProps) {
  const steps = getSteps();
  const [stepIndex, setStepIndex] = useState(0);
  const [showSuccess, setShowSuccess] = useState(false);
  const [typedValue, setTypedValue] = useState('');
  // For arrows step: need both up and down
  const [pressedUp, setPressedUp] = useState(false);
  const [pressedDown, setPressedDown] = useState(false);

  const step = steps[stepIndex];
  const isLast = stepIndex >= steps.length - 1;

  const completeStep = () => {
    playSound('success');
    setShowSuccess(true);
    setTimeout(() => {
      setShowSuccess(false);
      setTypedValue('');
      setPressedUp(false);
      setPressedDown(false);
      if (isLast) {
        onComplete();
      } else {
        setStepIndex(prev => prev + 1);
      }
    }, 1000);
  };

  useInput((_input, key) => {
    if (showSuccess) return;

    if (step?.waitFor === 'enter' && key.return) {
      completeStep();
    }
    if (step?.waitFor === 'escape' && key.escape) {
      completeStep();
    }
    if (step?.waitFor === 'arrows') {
      if (key.upArrow) setPressedUp(true);
      if (key.downArrow) setPressedDown(true);
      // Complete when both pressed
      if ((pressedUp && key.downArrow) || (pressedDown && key.upArrow)) {
        completeStep();
      }
    }
  });

  const handleTextChange = (value: string) => {
    if (showSuccess) return;
    setTypedValue(value);
    if (step?.waitFor === 'type' && step.typeTarget &&
        value.trim().toLowerCase() === step.typeTarget.toLowerCase()) {
      completeStep();
    }
  };

  if (!step) return null;

  return (
    <Box flexDirection="column" gap={1}>
      {/* Progress */}
      <Box gap={1}>
        {steps.map((_, i) => (
          <Text key={i} color={i < stepIndex ? theme.success : i === stepIndex ? theme.brand : theme.textGhost}>
            {i < stepIndex ? '●' : i === stepIndex ? '◉' : '○'}
          </Text>
        ))}
      </Box>

      {showSuccess ? (
        <Text color={theme.success} bold>{'  ✓ '}{step.getSuccess()}</Text>
      ) : (
        <Box flexDirection="column" gap={1}>
          <Text color={theme.text} bold>{'  '}{step.getInstruction()}</Text>

          {/* Enter — show pulsing key */}
          {step.waitFor === 'enter' && (
            <Box marginTop={1}>
              <Text color={theme.brand}>{'  ▸ '}<Text bold inverse>{' Enter '}</Text></Text>
            </Box>
          )}

          {/* Escape — show key */}
          {step.waitFor === 'escape' && (
            <Box marginTop={1}>
              <Text color={theme.brand}>{'  ▸ '}<Text bold inverse>{' Esc '}</Text></Text>
            </Box>
          )}

          {/* Arrows — show which ones have been pressed */}
          {step.waitFor === 'arrows' && (
            <Box marginTop={1} gap={2}>
              <Text color={pressedUp ? theme.success : theme.brand}>
                {'  '}{pressedUp ? '✓' : '▸'}{' '}
                <Text bold inverse>{' ↑ '}</Text>
              </Text>
              <Text color={pressedDown ? theme.success : theme.brand}>
                {pressedDown ? '✓' : '▸'}{' '}
                <Text bold inverse>{' ↓ '}</Text>
              </Text>
            </Box>
          )}

          {/* Type — text input */}
          {step.waitFor === 'type' && (
            <Box marginTop={1}>
              <Text color={theme.brand} bold>{'    > '}</Text>
              <TextInput value={typedValue} onChange={handleTextChange} />
            </Box>
          )}
        </Box>
      )}
    </Box>
  );
}
