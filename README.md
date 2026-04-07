<p align="center">
  <img src="https://img.shields.io/npm/v/tuilder?color=d97757&label=npm&style=flat-square" alt="npm version">
  <img src="https://img.shields.io/npm/dm/tuilder?color=4eba65&style=flat-square" alt="downloads">
  <img src="https://img.shields.io/github/license/ohernandezdev/tuilder?color=87867f&style=flat-square" alt="license">
  <img src="https://img.shields.io/badge/languages-es%20%7C%20en%20%7C%20fr-d97757?style=flat-square" alt="languages">
  <img src="https://img.shields.io/badge/lessons-65-ffd580?style=flat-square" alt="lessons">
  <a href="https://ko-fi.com/ohernandez"><img src="https://img.shields.io/badge/support-Ko--fi-ff5e5b?style=flat-square&logo=ko-fi&logoColor=white" alt="Ko-fi"></a>
</p>

<h1 align="center">
  <br>
  <code>tuilder</code>
  <br>
</h1>

<h3 align="center">
  Learn the terminal, Git &amp; AI agents — from zero.<br>
  <sub>An interactive course in your terminal for designers, POs, CEOs &mdash; anyone who isn't a developer (yet).</sub>
</h3>

<br>

<p align="center">
  <video src="https://github.com/ohernandezdev/tuilder/raw/main/videos/tuilder-demo.mp4" controls width="600"></video>
</p>

<p align="center">
  <a href="https://ohernandezdev.github.io/tuilder/">Website</a> &bull;
  <a href="#-quick-start">Quick Start</a> &bull;
  <a href="#-what-youll-learn">Modules</a> &bull;
  <a href="#-features">Features</a> &bull;
  <a href="#-contributing">Contributing</a>
</p>

---

## :rocket: Quick Start

```bash
npx tuilder
```

That's it. No installation needed. Works on macOS, Linux, and WSL.

> [!TIP]
> You only need **Node.js 18+** and a terminal. If you can read this, you can do it.

---

## :book: What you'll learn

From *"what is a terminal?"* to *collaborating on real projects with AI agents*.

| | Module | What you'll learn | Lessons |
|:---:|--------|-------------------|:-------:|
| :wave: | **Getting Started** | Why you're here, what the terminal is, course controls | 4 |
| :computer: | **Terminal Basics** | Navigate folders, read files, create directories | 12 |
| :twisted_rightwards_arrows: | **Git Fundamentals** | Save versions, create branches, understand the workflow | 11 |
| :robot: | **Your First AI Agent** | Prompt AI, review diffs, approve or reject changes | 11 |
| :hammer_and_wrench: | **Your First Real Task** | Navigate a real project and make changes with AI help | 10 |
| :people_holding_hands: | **Team Collaboration** | Pull requests, code review, merge conflicts | 11 |
| :mortar_board: | **Graduation** | Final quiz, review everything, earn your certificate | 6 |

---

## :sparkles: Features

<table>
<tr>
<td width="50%">

**:video_game: Interactive challenges**<br>
Type real commands in a safe simulated terminal. Nothing you do can break anything.

**:robot: AI agent simulation**<br>
Practice prompting AI, reviewing diffs, and approving or rejecting changes.

**:bulb: Progressive hints**<br>
Stuck? Get a gentle nudge. Still stuck? Get the exact answer. No shame.

</td>
<td width="50%">

**:star2: XP & levels**<br>
Earn experience points, level up through 5 ranks, track your daily streak.

**:earth_americas: 3 languages**<br>
English, Spanish, and French. Choose at the start.

**:mortar_board: Certificate**<br>
Complete all 65 lessons and earn a terminal-rendered graduation certificate.

</td>
</tr>
</table>

> [!NOTE]
> **Press `Tab` at any time** during the course to open the Cheat Sheet with all commands you've learned.

---

## :wrench: CLI Options

```bash
tuilder              # Start or continue the course
tuilder --reset      # Reset all progress
tuilder --lesson 3.1 # Jump to a specific lesson
tuilder --cert       # Show your graduation certificate
tuilder --lang en    # Change language (es, en, fr)
```

---

## :building_construction: Architecture

```
src/
├── app.tsx              # Root component (screen flow)
├── index.tsx            # CLI entry point
├── types.ts             # Lesson interface
├── theme.ts             # Color tokens
├── i18n/                # Internationalization (es/en/fr)
├── store/               # Progress persistence (~/.tuilder/)
├── components/          # Ink React components
│   ├── LessonFrame      # Core lesson UX (learn → task)
│   ├── CommandPrompt    # Command input with shake animation
│   ├── MultiCommandPrompt # Multi-step practice
│   ├── AgentSimulation  # AI agent session simulator
│   ├── CheatSheet       # Tab-toggled command reference
│   ├── Quiz             # Multiple choice quizzes
│   └── ...              # UI primitives
├── utils/               # Colorize, sound, XP calculations
└── lessons/             # 7 modules × 65 lessons
```

**Built with:** [Ink v5](https://github.com/vadimdemedes/ink) (React for the terminal) &bull; React 18 &bull; TypeScript (strict, ESM) &bull; [meow](https://github.com/sindresorhus/meow)

---

## :handshake: Contributing

See [CONTRIBUTING.md](CONTRIBUTING.md) for guidelines on adding lessons, modules, and UI strings.

```bash
npm install
npm run build
node dist/index.js
npx tsx scripts/validate-course.ts  # Validate all 195 lessons
```

---

## :page_facing_up: License

[MIT](LICENSE) — Made with care by [Omar Hernandez](https://github.com/ohernandezdev)
