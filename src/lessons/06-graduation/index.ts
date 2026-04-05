import { type Lesson } from '../../types.js';
import { type Locale } from '../../i18n/types.js';

interface LessonText {
  title: string;
  module: string;
  concept: string;
  analogy?: string;
  why: string;
  task: string;
  hint?: string;
  simulateLines?: string[];
  simulateDelay?: number;
}

const msg = {
  es: {
    '6.1': { ok: 'Gran recorrido.' },
    '6.2': { ok: 'Terminal dominada.' },
    '6.3': { ok: 'Git dominado.' },
    '6.4': { ok: 'Agente dominado.' },
    '6.5': { ok: 'Felicidades.' },
    '6.6': { ok: 'A volar.' },
  },
  en: {
    '6.1': { ok: 'Great journey.' },
    '6.2': { ok: 'Terminal mastered.' },
    '6.3': { ok: 'Git mastered.' },
    '6.4': { ok: 'Agent mastered.' },
    '6.5': { ok: 'Congratulations.' },
    '6.6': { ok: 'Go fly.' },
  },
  fr: {
    '6.1': { ok: 'Beau parcours.' },
    '6.2': { ok: 'Terminal ma\u00eetris\u00e9.' },
    '6.3': { ok: 'Git ma\u00eetris\u00e9.' },
    '6.4': { ok: 'Agent ma\u00eetris\u00e9.' },
    '6.5': { ok: 'F\u00e9licitations.' },
    '6.6': { ok: 'En avant.' },
  },
} as const;

const content: Record<Locale, Record<string, LessonText>> = {
  es: {
    '6.1': {
      title: 'Lo que aprendiste',
      module: 'Graduaci\u00f3n',
      concept: 'Repasemos todo lo que aprendiste:\n\n  \u2022 Terminal \u2014 pwd, ls, cd, cat, mkdir, clear, which\n  \u2022 Git \u2014 status, add, commit, checkout, push\n  \u2022 Agentes de AI \u2014 dar instrucciones, revisar diffs, aprobar/rechazar\n  \u2022 Colaboraci\u00f3n \u2014 ramas, PRs, code review, cu\u00e1ndo pedir ayuda\n\nEmpezaste sin saber nada de terminal. Ahora puedes trabajar con c\u00f3digo.',
      why: 'Todo lo que aprendiste son habilidades reales que se usan todos los días en equipos de tecnología.',
      task: 'Presiona Enter para continuar',
      simulateLines: [
        '',
        '  \u2705 M\u00f3dulo 1: La Terminal Sin Miedo',
        '  \u2705 M\u00f3dulo 2: Git Sin Miedo',
        '  \u2705 M\u00f3dulo 3: Tu Primer Agente de AI',
        '  \u2705 M\u00f3dulo 4: Tu Primera Tarea Real',
        '  \u2705 M\u00f3dulo 5: Colaborar con el Equipo',
        '  \u2705 M\u00f3dulo 6: Graduaci\u00f3n',
      ],
      simulateDelay: 200,
    },
    '6.2': {
      title: 'Desaf\u00edo final \u2014 Terminal',
      module: 'Graduaci\u00f3n',
      concept: 'Demuestra lo que sabes sobre la terminal.',
      why: 'Te doy instrucciones, t\u00fa decides qu\u00e9 comando usar.',
      task: '',
    },
    '6.3': {
      title: 'Desaf\u00edo final \u2014 Git',
      module: 'Graduaci\u00f3n',
      concept: 'Demuestra lo que sabes sobre Git.',
      why: 'Te doy instrucciones, t\u00fa decides qu\u00e9 comando usar.',
      task: '',
    },
    '6.4': {
      title: 'Desaf\u00edo final \u2014 Agente de AI',
      module: 'Graduaci\u00f3n',
      concept: 'Un agente de AI va a hacer un cambio. T\u00fa decides si est\u00e1 bien.',
      why: 'Revisar el trabajo del agente es tu responsabilidad m\u00e1s importante.',
      task: 'Revisa el diff y decide si apruebas o rechazas',
    },
    '6.5': {
      title: 'Tu certificado',
      module: 'Graduaci\u00f3n',
      concept: '\u00a1Felicidades! Completaste todos los m\u00f3dulos de tuilder.\n\nPara ver tu certificado, ejecuta:\n\n  npx tuilder --cert\n\nTe lo ganaste. Comp\u00e1rtelo con tu equipo.',
      why: 'Puedes compartirlo para demostrar tus nuevas habilidades.',
      task: 'Presiona Enter para continuar',
    },
    '6.6': {
      title: 'Pr\u00f3ximos pasos',
      module: 'Graduaci\u00f3n',
      concept: 'Qu\u00e9 hacer ahora:\n\n  \u2022 Practica en repos reales de tu equipo\n  \u2022 Trabaja en pareja con un dev de tu equipo\n  \u2022 Empieza con cambios peque\u00f1os: textos, colores, copy\n  \u2022 Cada semana, intenta algo un poco m\u00e1s complejo\n\nYa est\u00e1s listo. El c\u00f3digo ya no es territorio prohibido.',
      why: 'La pr\u00e1ctica constante es lo que convierte conocimiento en habilidad.',
      task: 'Presiona Enter para terminar',
    },
  },
  en: {
    '6.1': {
      title: 'What you learned',
      module: 'Graduation',
      concept: 'Let\u2019s review everything you learned:\n\n  \u2022 Terminal \u2014 pwd, ls, cd, cat, mkdir, clear, which\n  \u2022 Git \u2014 status, add, commit, checkout, push\n  \u2022 AI Agents \u2014 giving instructions, reviewing diffs, approving/rejecting\n  \u2022 Collaboration \u2014 branches, PRs, code review, when to ask for help\n\nYou started knowing nothing about the terminal. Now you can work with code.',
      why: 'Everything you learned are real skills used every day in tech teams.',
      task: 'Press Enter to continue',
      simulateLines: [
        '',
        '  \u2705 Module 1: The Terminal Without Fear',
        '  \u2705 Module 2: Git Without Fear',
        '  \u2705 Module 3: Your First AI Agent',
        '  \u2705 Module 4: Your First Real Task',
        '  \u2705 Module 5: Collaborate with Your Team',
        '  \u2705 Module 6: Graduation',
      ],
      simulateDelay: 200,
    },
    '6.2': {
      title: 'Final challenge \u2014 Terminal',
      module: 'Graduation',
      concept: 'Show what you know about the terminal.',
      why: 'I\u2019ll give you instructions, you decide which command to use.',
      task: '',
    },
    '6.3': {
      title: 'Final challenge \u2014 Git',
      module: 'Graduation',
      concept: 'Show what you know about Git.',
      why: 'I\u2019ll give you instructions, you decide which command to use.',
      task: '',
    },
    '6.4': {
      title: 'Final challenge \u2014 AI Agent',
      module: 'Graduation',
      concept: 'An AI agent is going to make a change. You decide if it\u2019s correct.',
      why: 'Reviewing the agent\u2019s work is your most important responsibility.',
      task: 'Review the diff and decide if you approve or reject',
    },
    '6.5': {
      title: 'Your certificate',
      module: 'Graduation',
      concept: 'Congratulations! You completed all tuilder modules.\n\nTo see your certificate, run:\n\n  npx tuilder --cert\n\nYou earned it. Share it with your team.',
      why: 'You can share it to show your new skills.',
      task: 'Press Enter to continue',
    },
    '6.6': {
      title: 'Next steps',
      module: 'Graduation',
      concept: 'What to do now:\n\n  \u2022 Practice on real repos from your team\n  \u2022 Pair with a dev on your team\n  \u2022 Start with small changes: text, colors, copy\n  \u2022 Each week, try something a little more complex\n\nYou\u2019re ready. Code is no longer forbidden territory.',
      why: 'Consistent practice is what turns knowledge into skill.',
      task: 'Press Enter to finish',
    },
  },
  fr: {
    '6.1': {
      title: 'Ce que tu as appris',
      module: 'Remise de dipl\u00f4me',
      concept: 'R\u00e9capitulatif de tout ce que tu as appris :\n\n  \u2022 Terminal \u2014 pwd, ls, cd, cat, mkdir, clear, which\n  \u2022 Git \u2014 status, add, commit, checkout, push\n  \u2022 Agents IA \u2014 donner des instructions, revoir les diffs, approuver/rejeter\n  \u2022 Collaboration \u2014 branches, PRs, code review, quand demander de l\u2019aide\n\nTu as commenc\u00e9 sans rien conna\u00eetre du terminal. Maintenant tu peux travailler avec du code.',
      why: 'Tout ce que tu as appris sont des compétences réelles utilisées chaque jour dans les équipes tech.',
      task: 'Appuie sur Entr\u00e9e pour continuer',
      simulateLines: [
        '',
        '  \u2705 Module 1 : Le Terminal Sans Peur',
        '  \u2705 Module 2 : Git Sans Peur',
        '  \u2705 Module 3 : Ton Premier Agent IA',
        '  \u2705 Module 4 : Ta Premi\u00e8re Vraie T\u00e2che',
        '  \u2705 Module 5 : Collaborer avec ton \u00c9quipe',
        '  \u2705 Module 6 : Remise de Dipl\u00f4me',
      ],
      simulateDelay: 200,
    },
    '6.2': {
      title: 'D\u00e9fi final \u2014 Terminal',
      module: 'Remise de dipl\u00f4me',
      concept: 'Montre ce que tu sais sur le terminal.',
      why: 'Je te donne des instructions, tu d\u00e9cides quelle commande utiliser.',
      task: '',
    },
    '6.3': {
      title: 'D\u00e9fi final \u2014 Git',
      module: 'Remise de dipl\u00f4me',
      concept: 'Montre ce que tu sais sur Git.',
      why: 'Je te donne des instructions, tu d\u00e9cides quelle commande utiliser.',
      task: '',
    },
    '6.4': {
      title: 'D\u00e9fi final \u2014 Agent IA',
      module: 'Remise de dipl\u00f4me',
      concept: 'Un agent IA va faire un changement. Tu d\u00e9cides si c\u2019est correct.',
      why: 'V\u00e9rifier le travail de l\u2019agent est ta responsabilit\u00e9 la plus importante.',
      task: 'V\u00e9rifie le diff et d\u00e9cide si tu approuves ou rejettes',
    },
    '6.5': {
      title: 'Ton certificat',
      module: 'Remise de dipl\u00f4me',
      concept: 'F\u00e9licitations ! Tu as termin\u00e9 tous les modules de tuilder.\n\nPour voir ton certificat, ex\u00e9cute :\n\n  npx tuilder --cert\n\nTu l\u2019as m\u00e9rit\u00e9. Partage-le avec ton \u00e9quipe.',
      why: 'Tu peux le partager pour montrer tes nouvelles compétences.',
      task: 'Appuie sur Entr\u00e9e pour continuer',
    },
    '6.6': {
      title: 'Prochaines \u00e9tapes',
      module: 'Remise de dipl\u00f4me',
      concept: 'Que faire maintenant :\n\n  \u2022 Pratique sur de vrais repos de ton \u00e9quipe\n  \u2022 Travaille en bin\u00f4me avec un dev de ton \u00e9quipe\n  \u2022 Commence par de petits changements : textes, couleurs, copy\n  \u2022 Chaque semaine, essaie quelque chose d\u2019un peu plus complexe\n\nTu es pr\u00eat. Le code n\u2019est plus un territoire interdit.',
      why: 'La pratique r\u00e9guli\u00e8re est ce qui transforme la connaissance en comp\u00e9tence.',
      task: 'Appuie sur Entr\u00e9e pour terminer',
    },
  },
};

import { type CommandStep } from '../../components/MultiCommandPrompt.js';

const practiceTerminal: Record<Locale, CommandStep[]> = {
  es: [
    { challenge: 'Estás perdido. Averigua dónde estás', command: 'pwd', output: ['/home/usuario/proyectos'], hint1: 'Un comando de 3 letras...', hint2: 'El comando es pwd' },
    { challenge: 'Mira qué hay en esta carpeta', command: 'ls', output: ['docs/  src/  README.md  package.json'], hint1: 'Un comando de 2 letras...', hint2: 'El comando es ls' },
    { challenge: 'Lee el README para entender el proyecto', command: 'cat README.md', output: ['# Mi Proyecto', 'App web con código en src/'], hint1: 'El comando para leer archivos...', hint2: 'El comando es cat README.md' },
    { challenge: 'Entra a la carpeta donde está el código', command: 'cd src', output: [], hint1: 'El comando para entrar a carpetas...', hint2: 'El comando es cd src' },
  ],
  en: [
    { challenge: 'You are lost. Find out where you are', command: 'pwd', output: ['/home/user/projects'], hint1: 'A 3-letter command...', hint2: 'The command is pwd' },
    { challenge: 'See what is in this folder', command: 'ls', output: ['docs/  src/  README.md  package.json'], hint1: 'A 2-letter command...', hint2: 'The command is ls' },
    { challenge: 'Read the README to understand the project', command: 'cat README.md', output: ['# My Project', 'Web app with code in src/'], hint1: 'The command to read files...', hint2: 'The command is cat README.md' },
    { challenge: 'Enter the folder where the code is', command: 'cd src', output: [], hint1: 'The command to enter folders...', hint2: 'The command is cd src' },
  ],
  fr: [
    { challenge: 'Tu es perdu. Découvre où tu es', command: 'pwd', output: ['/home/utilisateur/projets'], hint1: 'Une commande de 3 lettres...', hint2: 'La commande est pwd' },
    { challenge: 'Regarde ce qu\u2019il y a dans ce dossier', command: 'ls', output: ['docs/  src/  README.md  package.json'], hint1: 'Une commande de 2 lettres...', hint2: 'La commande est ls' },
    { challenge: 'Lis le README pour comprendre le projet', command: 'cat README.md', output: ['# Mon Projet', 'App web avec le code dans src/'], hint1: 'La commande pour lire des fichiers...', hint2: 'La commande est cat README.md' },
    { challenge: 'Entre dans le dossier où se trouve le code', command: 'cd src', output: [], hint1: 'La commande pour entrer dans les dossiers...', hint2: 'La commande est cd src' },
  ],
};

const practiceGit: Record<Locale, CommandStep[]> = {
  es: [
    { challenge: 'Revisa el estado del repositorio', command: 'git status', output: ['On branch main', 'nothing to commit, working tree clean'], hint1: 'git + estado...', hint2: 'El comando es git status' },
    { challenge: 'Crea una rama para tu cambio', command: 'git checkout -b fix-footer', output: ["Switched to a new branch 'fix-footer'"], hint1: 'git checkout -b + nombre...', hint2: 'El comando es git checkout -b fix-footer' },
    { challenge: 'Prepara todos los archivos', command: 'git add .', output: [], hint1: 'git add + todo...', hint2: 'El comando es git add .' },
    { challenge: 'Guarda con un mensaje descriptivo', command: 'git commit -m "fix footer year"', acceptPattern: 'git commit -m .+', output: ['[fix-footer abc1234] fix footer year', ' 1 file changed'], hint1: 'git commit -m seguido de tu mensaje entre comillas "..."', hint2: 'El comando es git commit -m "fix footer year"' },
  ],
  en: [
    { challenge: 'Check the repository status', command: 'git status', output: ['On branch main', 'nothing to commit, working tree clean'], hint1: 'git + status...', hint2: 'The command is git status' },
    { challenge: 'Create a branch for your change', command: 'git checkout -b fix-footer', output: ["Switched to a new branch 'fix-footer'"], hint1: 'git checkout -b + name...', hint2: 'The command is git checkout -b fix-footer' },
    { challenge: 'Stage all files', command: 'git add .', output: [], hint1: 'git add + everything...', hint2: 'The command is git add .' },
    { challenge: 'Save with a descriptive message', command: 'git commit -m "fix footer year"', acceptPattern: 'git commit -m .+', output: ['[fix-footer abc1234] fix footer year', ' 1 file changed'], hint1: 'git commit -m + message in "quotes"...', hint2: 'The command is git commit -m "fix footer year"' },
  ],
  fr: [
    { challenge: 'Vérifie l\u2019état du dépôt', command: 'git status', output: ['On branch main', 'nothing to commit, working tree clean'], hint1: 'git + statut...', hint2: 'La commande est git status' },
    { challenge: 'Crée une branche pour ton changement', command: 'git checkout -b fix-footer', output: ["Switched to a new branch 'fix-footer'"], hint1: 'git checkout -b + nom...', hint2: 'La commande est git checkout -b fix-footer' },
    { challenge: 'Prépare tous les fichiers', command: 'git add .', output: [], hint1: 'git add + tout...', hint2: 'La commande est git add .' },
    { challenge: 'Sauvegarde avec un message descriptif', command: 'git commit -m "fix footer year"', acceptPattern: 'git commit -m .+', output: ['[fix-footer abc1234] fix footer year', ' 1 file changed'], hint1: 'git commit -m + message entre guillemets "..."', hint2: 'La commande est git commit -m "fix footer year"' },
  ],
};

const agentSimData: Record<Locale, Lesson['agentSimulation']> = {
  es: {
    scenario: 'Hay un footer en src/Footer.tsx que dice "\u00a9 2024". Actual\u00edzalo a "\u00a9 2026".',
    promptHint: 'Actualiza el a\u00f1o del copyright en el footer',
    acceptedPatterns: ['footer|pie|bas', 'year|año|année|2026|2024', 'copyright|update|actualiz|change|cambiar|changer|mettre'],
    agentResponse: [
      'Encontr\u00e9 src/Footer.tsx con el copyright desactualizado.',
      'Cambi\u00e9 "\u00a9 2024" a "\u00a9 2026".',
      'El cambio est\u00e1 listo para tu revisi\u00f3n.',
    ],
    diffLines: [
      '--- a/src/Footer.tsx',
      '+++ b/src/Footer.tsx',
      '@@ -3,7 +3,7 @@',
      ' export function Footer() {',
      '   return (',
      '     <footer>',
      '-      <p>\u00a9 2024 Mi Empresa</p>',
      '+      <p>\u00a9 2026 Mi Empresa</p>',
      '     </footer>',
      '   );',
      ' }',
    ],
    approveIsCorrect: true,
    explanation: '\u00a1Perfecto! Revisaste el diff y aprobaste el cambio correcto. El agente solo cambi\u00f3 el a\u00f1o, exactamente lo que ped\u00edamos.',
  },
  en: {
    scenario: 'There\u2019s a footer in src/Footer.tsx that says "\u00a9 2024". Update it to "\u00a9 2026".',
    promptHint: 'Update the copyright year in the footer',
    acceptedPatterns: ['footer|pie|bas', 'year|año|année|2026|2024', 'copyright|update|actualiz|change|cambiar|changer|mettre'],
    agentResponse: [
      'Found src/Footer.tsx with the outdated copyright.',
      'Changed "\u00a9 2024" to "\u00a9 2026".',
      'The change is ready for your review.',
    ],
    diffLines: [
      '--- a/src/Footer.tsx',
      '+++ b/src/Footer.tsx',
      '@@ -3,7 +3,7 @@',
      ' export function Footer() {',
      '   return (',
      '     <footer>',
      '-      <p>\u00a9 2024 My Company</p>',
      '+      <p>\u00a9 2026 My Company</p>',
      '     </footer>',
      '   );',
      ' }',
    ],
    approveIsCorrect: true,
    explanation: 'Perfect! You reviewed the diff and approved the correct change. The agent only changed the year, exactly what we asked for.',
  },
  fr: {
    scenario: 'Il y a un footer dans src/Footer.tsx qui dit "\u00a9 2024". Mets-le \u00e0 jour vers "\u00a9 2026".',
    promptHint: 'Mets \u00e0 jour l\u2019ann\u00e9e du copyright dans le footer',
    acceptedPatterns: ['footer|pie|bas', 'year|año|année|2026|2024', 'copyright|update|actualiz|change|cambiar|changer|mettre'],
    agentResponse: [
      'J\u2019ai trouv\u00e9 src/Footer.tsx avec le copyright obsol\u00e8te.',
      'J\u2019ai chang\u00e9 "\u00a9 2024" en "\u00a9 2026".',
      'Le changement est pr\u00eat pour ta r\u00e9vision.',
    ],
    diffLines: [
      '--- a/src/Footer.tsx',
      '+++ b/src/Footer.tsx',
      '@@ -3,7 +3,7 @@',
      ' export function Footer() {',
      '   return (',
      '     <footer>',
      '-      <p>\u00a9 2024 Mon Entreprise</p>',
      '+      <p>\u00a9 2026 Mon Entreprise</p>',
      '     </footer>',
      '   );',
      ' }',
    ],
    approveIsCorrect: true,
    explanation: 'Parfait ! Tu as v\u00e9rifi\u00e9 le diff et approuv\u00e9 le bon changement. L\u2019agent n\u2019a chang\u00e9 que l\u2019ann\u00e9e, exactement ce qu\u2019on demandait.',
  },
};

function buildSimulate(c: LessonText) {
  if (!c.simulateLines) return undefined;
  return { lines: c.simulateLines, delay: c.simulateDelay };
}

export function getModule6Lessons(locale: Locale): Lesson[] {
  const c = content[locale];
  const m = msg[locale];

  return [
    {
      id: '6.1',
      ...c['6.1']!,
      validate: () => ({ valid: true, message: m['6.1'].ok }),
      simulate: buildSimulate(c['6.1']!),
    },
    {
      id: '6.2',
      ...c['6.2']!,
      validate: () => ({ valid: true, message: m['6.2'].ok }),
      practiceSteps: practiceTerminal[locale],
    },
    {
      id: '6.3',
      ...c['6.3']!,
      validate: () => ({ valid: true, message: m['6.3'].ok }),
      practiceSteps: practiceGit[locale],
    },
    {
      id: '6.4',
      ...c['6.4']!,
      interactive: 'agent-simulation',
      validate: () => ({ valid: true, message: m['6.4'].ok }),
      agentSimulation: agentSimData[locale],
    },
    {
      id: '6.5',
      ...c['6.5']!,
      validate: () => ({ valid: true, message: m['6.5'].ok }),
      simulate: buildSimulate(c['6.5']!),
    },
    {
      id: '6.6',
      ...c['6.6']!,
      validate: () => ({ valid: true, message: m['6.6'].ok }),
      simulate: buildSimulate(c['6.6']!),
    },
  ];
}
