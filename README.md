# tuilder

Interactive TUI course that teaches non-tech people (designers, POs, CEOs) to use the terminal, Git, and AI coding agents — from zero.

```
npx tuilder
```

No installation needed. Works on macOS, Linux, and WSL.

<video src="https://github.com/ohernandezdev/tuilder/raw/main/videos/tuilder-demo.mp4" controls width="600"></video>

## What you'll learn

| Module | Topic | Lessons |
|--------|-------|---------|
| 0 | Getting Started | 4 |
| 1 | Terminal Basics | 12 |
| 2 | Git Fundamentals | 11 |
| 3 | Your First AI Agent | 11 |
| 4 | Your First Real Task | 10 |
| 5 | Team Collaboration | 11 |
| 6 | Graduation | 6 |

**65 lessons** across **7 modules** in **3 languages** (English, Spanish, French).

## Features

- Step-by-step lessons with concept explanations, analogies, and interactive challenges
- Simulated terminal — practice commands without breaking anything
- AI agent simulation — learn to prompt, review diffs, approve/reject changes
- Challenge-based practice — figure out the right command from natural language prompts
- Progressive hints that unlock when you're stuck
- XP system with 5 levels
- Daily streak tracking
- End-of-module quizzes
- Graduation certificate
- Sound effects (macOS)
- Full i18n (es/en/fr)

## CLI Options

```
tuilder              # Start or continue the course
tuilder --reset      # Reset all progress
tuilder --lesson 3.1 # Jump to a specific lesson
tuilder --cert       # Show your certificate
tuilder --lang en    # Change language (es, en, fr)
```

## Requirements

- Node.js 18+
- A terminal (macOS Terminal, iTerm, Windows Terminal with WSL, etc.)

## Development

```bash
npm install
npm run build
node dist/index.js
```

```bash
npm run dev    # Watch mode
npm test       # Run tests
npx tsx scripts/validate-course.ts  # Validate all 195 lessons
```

## Architecture

```
src/
├── app.tsx              # Root component (screen flow)
├── index.tsx            # CLI entry point (meow)
├── types.ts             # Lesson interface
├── theme.ts             # Semantic color tokens
├── i18n/                # Internationalization (es/en/fr)
├── store/               # Progress persistence (~/.tuilder/)
├── components/
│   ├── LessonFrame.tsx      # Core lesson UX (learn → task phases)
│   ├── CommandPrompt.tsx    # Single command input with shake animation
│   ├── MultiCommandPrompt.tsx # Challenge-based multi-step practice
│   ├── AgentSimulation.tsx  # AI agent session simulator
│   ├── Quiz.tsx             # Multiple choice quizzes
│   ├── ControlsTutorial.tsx # Interactive controls tutorial
│   ├── TypeWriter.tsx       # Line-by-line typewriter effect
│   ├── Certificate.ts       # Chalk-based graduation certificate
│   └── ...                  # UI primitives (Logo, XpBar, etc.)
├── utils/
│   ├── colorize.ts      # Terminal output colorizer (diffs, prompts)
│   ├── sound.ts          # macOS system sounds
│   └── xp.ts            # XP/leveling calculations
└── lessons/
    ├── 00-welcome/      # Module 0: Getting Started
    ├── 01-terminal/     # Module 1: Terminal Basics
    ├── 02-git-basics/   # Module 2: Git Fundamentals
    ├── 03-claude-code-intro/ # Module 3: AI Agents
    ├── 04-first-task/   # Module 4: First Real Task
    ├── 05-collaboration/ # Module 5: Team Collaboration
    ├── 06-graduation/   # Module 6: Graduation
    └── index.ts         # Lesson registry
```

## Tech Stack

- [Ink v5](https://github.com/vadimdemedes/ink) — React for the terminal
- React 18
- TypeScript (strict, ESM)
- [meow](https://github.com/sindresorhus/meow) — CLI argument parsing
- [chalk](https://github.com/chalk/chalk) — Terminal string styling

## License

MIT
