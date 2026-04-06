import { type UIStrings } from './types.js';

export const fr: UIStrings = {
  // Welcome screen
  welcomeTitle: 'Bienvenue sur Tuilder',
  welcomeSubtitle: 'Apprends à utiliser le terminal et à travailler avec des agents IA comme un pro.',
  welcomeNoExperience: 'Aucune expérience requise. On y va étape par étape.',
  welcomeAskName: "Comment tu t'appelles ?",
  welcomeNameHint: 'Écris ton nom et appuie sur Entrée ↵',

  // Language picker
  langPickerTitle: 'Dans quelle langue préfères-tu apprendre ?',

  // Header
  version: 'version',

  // Lesson frame
  enterToContinue: 'Entrée pour continuer',
  escToGoBack: 'Échap pour revenir',
  yourTurn: 'À toi !',

  // Command prompt
  writeAndEnter: 'Écris {cmd} et appuie sur Entrée ↵',
  almostTryAgain: 'Presque ! Réessaie : {cmd}',
  dontWorryWriteExactly: 'Pas de souci, écris exactement : {cmd}',
  writeSomethingFirst: "Écris quelque chose d'abord",

  // Controls tutorial
  controlsStep1: 'Appuie sur Entrée pour avancer',
  controlsStep1Success: 'Super ! Tu sais avancer.',
  controlsStep2: 'Maintenant appuie sur Échap pour revenir',
  controlsStep2Success: 'Parfait ! Tu peux revenir en arrière quand tu veux.',
  controlsStep3: 'Appuie sur flèche haut ↑ puis flèche bas ↓',
  controlsStep3Success: 'Les flèches servent à naviguer dans les menus.',
  controlsStep4: 'Écris ok avec ton clavier et appuie sur Entrée',
  controlsStep4Success: 'Tu maîtrises tous les contrôles.',

  // Enter prompt
  pressEnter: 'Appuie sur',
  toContinue: 'pour continuer',

  // Completion screen
  congratulations: 'Félicitations, {nombre} !',
  completedAllLessons: 'Tu as terminé toutes les leçons.',
  youCanNow: "Tu peux maintenant utiliser le terminal et travailler avec des agents IA comme Claude Code, GitHub Copilot et d'autres.",
  showCertificate: 'Voir le certificat',

  // Certificate
  certNotGraduated: "Tu n'as pas encore terminé toutes les leçons.",
  certRunTuilder: 'Lance tuilder pour continuer à apprendre.',
  certTitle: 'Certificat Tuilder',
  certCertifies: 'Ceci certifie que {nombre}',
  certCompleted: 'a terminé le cours sur le terminal et les agents IA.',
  certReady: "Il/Elle est prêt(e) à utiliser le terminal et travailler avec des outils d'IA.",
  certDate: 'Terminé le : {date}',

  // CLI
  cliReset: 'Progression réinitialisée.',
  cliDescription: 'Apprends à utiliser le terminal depuis zéro, étape par étape.',
  cliUsage: 'Utilisation',
  cliOptReset: 'Réinitialiser la progression',
  cliOptLesson: 'Aller à une leçon spécifique',
  cliOptCert: 'Afficher ton certificat',
  cliOptLang: 'Changer la langue (es, en, fr)',

  // XP / Leveling
  levelUp: 'NIVEAU SUPÉRIEUR !',
  level: 'Nv.',

  // Streak
  streakDays: '{n}j',
  streakWelcome: 'Tu es sur une série de {n} jours',

  // Main menu
  menuContinue: 'Continuer',
  menuNewGame: 'Recommencer',
  menuModules: 'Aller à un module',
  menuChangeLang: 'Changer de langue',
  menuCertificate: 'Voir le certificat',
  menuConfirmReset: 'Tu es sûr(e) ? Toute ta progression sera effacée. Entrée = oui, Échap = non',
  menuBack: 'Retour au menu',

  approve: 'Approuver',
  reject: 'Rejeter',
  correct: 'correct',
  quizResult: '{n}/{total} correctes',
  commandNotRecognized: 'commande non reconnue',
  select: 'choisir',
  confirm: 'confirmer',
};
