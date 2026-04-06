export type Locale = 'es' | 'en' | 'fr';

// UI strings used by components (NOT lesson content — that's separate)
export interface UIStrings {
  // Welcome screen
  welcomeTitle: string;
  welcomeSubtitle: string;
  welcomeNoExperience: string;
  welcomeAskName: string;
  welcomeNameHint: string;

  // Language picker
  langPickerTitle: string;

  // Header
  version: string;

  // Lesson frame
  enterToContinue: string;
  escToGoBack: string;
  yourTurn: string;

  // Command prompt
  writeAndEnter: string;
  almostTryAgain: string;
  dontWorryWriteExactly: string;
  writeSomethingFirst: string;

  // Controls tutorial
  controlsStep1: string;
  controlsStep1Success: string;
  controlsStep2: string;
  controlsStep2Success: string;
  controlsStep3: string;   // arrows
  controlsStep3Success: string;
  controlsStep4: string;   // type
  controlsStep4Success: string;

  // Enter prompt
  pressEnter: string;
  toContinue: string;

  // Completion screen
  congratulations: string;
  completedAllLessons: string;
  youCanNow: string;
  showCertificate: string;

  // Certificate (non-Ink, chalk)
  certNotGraduated: string;
  certRunTuilder: string;
  certTitle: string;
  certCertifies: string;
  certCompleted: string;
  certReady: string;
  certDate: string;

  // CLI
  cliReset: string;
  cliDescription: string;
  cliUsage: string;
  cliOptReset: string;
  cliOptLesson: string;
  cliOptCert: string;
  cliOptLang: string;

  // XP / Leveling
  levelUp: string;
  level: string;

  // Streak
  streakDays: string;
  streakWelcome: string;

  // Agent simulation
  approve: string;
  reject: string;

  // Quiz
  correct: string;
  quizResult: string; // "{n}/{total} correct"

  // Main menu
  menuContinue: string;
  menuStart: string;
  menuNewGame: string;
  menuModules: string;
  menuChangeLang: string;
  menuCertificate: string;
  menuConfirmReset: string;
  menuBack: string;

  // Misc
  commandNotRecognized: string;
  select: string;
  confirm: string;

  // Cheat sheet
  cheatSheetTitle: string;
  cheatSheetHint: string;
  cheatSheetClose: string;
  cheatSheetNavigation: string;
  cheatSheetFiles: string;
  cheatSheetGit: string;
  cheatSheetAI: string;
  // Cheat sheet descriptions
  csPwd: string;
  csCd: string;
  csCdUp: string;
  csLs: string;
  csCat: string;
  csMkdir: string;
  csTouch: string;
  csGitInit: string;
  csGitStatus: string;
  csGitAdd: string;
  csGitCommit: string;
  csGitLog: string;
  csGitBranch: string;
  csGitCheckout: string;
  csGitDiff: string;
  csClaude: string;
  csCtrlC: string;
}
