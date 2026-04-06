import { type UIStrings } from './types.js';

export const en: UIStrings = {
  // Welcome screen
  welcomeTitle: 'Welcome to Tuilder',
  welcomeSubtitle: 'Learn to use the terminal and work with AI agents like a pro.',
  welcomeNoExperience: "No experience needed. We'll go step by step.",
  welcomeAskName: "What's your name?",
  welcomeNameHint: 'Type your name and press Enter ↵',

  // Language picker
  langPickerTitle: 'Which language do you prefer?',

  // Header
  version: 'version',

  // Lesson frame
  enterToContinue: 'Enter to continue',
  escToGoBack: 'Esc to go back',
  yourTurn: 'Your turn!',

  // Command prompt
  writeAndEnter: 'Type {cmd} and press Enter ↵',
  almostTryAgain: 'Almost! Try again: {cmd}',
  dontWorryWriteExactly: 'No worries, type exactly: {cmd}',
  writeSomethingFirst: 'Type something first',

  // Controls tutorial
  controlsStep1: 'Press Enter to advance',
  controlsStep1Success: 'Great! You know how to move forward.',
  controlsStep2: 'Now press Esc to go back',
  controlsStep2Success: 'Perfect! You can go back anytime.',
  controlsStep3: 'Press arrow up ↑ then arrow down ↓',
  controlsStep3Success: 'Arrows are for navigating menus and options.',
  controlsStep4: 'Type ok with your keyboard and press Enter',
  controlsStep4Success: "You've mastered all the controls.",

  // Enter prompt
  pressEnter: 'Press',
  toContinue: 'to continue',

  // Completion screen
  congratulations: 'Congratulations, {nombre}!',
  completedAllLessons: 'You completed all the lessons.',
  youCanNow: 'You can now use the terminal and work with AI agents like Claude Code, GitHub Copilot, and more.',
  showCertificate: 'View certificate',

  // Certificate
  certNotGraduated: "You haven't completed all the lessons yet.",
  certRunTuilder: 'Run tuilder to keep learning.',
  certTitle: 'Tuilder Certificate',
  certCertifies: 'This certifies that {nombre}',
  certCompleted: 'completed the terminal and AI agents course.',
  certReady: 'They are ready to use the terminal and work with AI tools.',
  certDate: 'Completed: {date}',

  // CLI
  cliReset: 'Progress reset.',
  cliDescription: 'Learn to use the terminal from scratch, step by step.',
  cliUsage: 'Usage',
  cliOptReset: 'Reset progress',
  cliOptLesson: 'Jump to a specific lesson',
  cliOptCert: 'Show your certificate',
  cliOptLang: 'Change language (es, en, fr)',

  // XP / Leveling
  levelUp: 'LEVEL UP!',
  level: 'Lv.',

  // Streak
  streakDays: '{n}d',
  streakWelcome: "You're on a {n} day streak",

  // Main menu
  menuContinue: 'Continue',
  menuStart: 'Start',
  menuNewGame: 'Start over',
  menuModules: 'Go to a module',
  menuChangeLang: 'Change language',
  menuCertificate: 'View certificate',
  menuConfirmReset: 'Are you sure? All progress will be erased. Enter = yes, Esc = no',
  menuBack: 'Back to menu',

  approve: 'Approve',
  reject: 'Reject',
  correct: 'correct',
  quizResult: '{n}/{total} correct',
  commandNotRecognized: 'command not recognized',
  select: 'select',
  confirm: 'confirm',

  // Cheat sheet
  cheatSheetTitle: 'Cheat Sheet',
  cheatSheetHint: 'Tab = cheat sheet',
  cheatSheetClose: 'any key to close',
  cheatSheetNavigation: 'Navigation',
  cheatSheetFiles: 'Files',
  cheatSheetGit: 'Git',
  cheatSheetAI: 'AI Agents',
  csPwd: 'what folder am I in?',
  csCd: 'go into a folder',
  csCdUp: 'go back up',
  csLs: 'see what\'s here',
  csCat: 'read a file',
  csMkdir: 'create a new folder',
  csTouch: 'create an empty file',
  csGitInit: 'start saving versions',
  csGitStatus: 'what did I change?',
  csGitAdd: 'select my changes',
  csGitCommit: 'save with a message',
  csGitLog: 'see what\'s been saved',
  csGitBranch: 'create a copy to experiment',
  csGitCheckout: 'switch to another copy',
  csGitDiff: 'see what\'s different',
  csClaude: 'open the AI agent',
  csCtrlC: 'stop what\'s running',
};
