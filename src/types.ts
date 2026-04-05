export interface ValidationResult {
  valid: boolean;
  message: string;
}

export interface SimulatedOutput {
  lines: string[];
  delay?: number;  // ms between lines for typewriter effect
}

export interface Lesson {
  id: string;
  title: string;
  module: string;

  // Content
  concept: string;
  analogy?: string;
  why: string;

  // Action
  task: string;
  command?: string;
  hint?: string;

  // Validation
  validate: (input: string) => ValidationResult;

  // Simulation
  simulate?: SimulatedOutput;

  // Special interactive mode
  interactive?: 'controls-tutorial' | 'agent-simulation';

  // Agent simulation data (used with interactive: 'agent-simulation')
  agentSimulation?: {
    scenario: string;
    promptHint: string;
    acceptedPatterns: string[];
    agentResponse: string[];
    diffLines: string[];
    approveIsCorrect: boolean;
    explanation: string;
  };

  // Multi-command practice — challenge-based, user figures out the command
  practiceSteps?: { challenge: string; command: string; acceptPattern?: string; output: string[]; hint1?: string; hint2?: string }[];

  // Quiz questions for end-of-module quizzes
  quizQuestions?: { question: string; options: string[]; correct: number; explanation: string }[];
}
