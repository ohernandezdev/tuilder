import { type Lesson } from '../../types.js';
import { type Locale } from '../../i18n/types.js';
import { type CommandStep } from '../../components/MultiCommandPrompt.js';

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
    '4.1': { ok: 'Contexto claro. Vamos a trabajar.' },
    '4.2': { ok: 'Proyecto clonado.', fail: 'Escribe git clone https://github.com/equipo/landing.git' },
    '4.3': { ok: 'Estás dentro del proyecto.', fail: 'Escribe cd landing' },
    '4.4': { ok: 'Ya conoces el proyecto.' },
    '4.5': { ok: 'Branch creado.', fail: 'Escribe git checkout -b cambiar-titulo' },
    '4.6': { ok: 'El agente hizo el cambio.' },
    '4.7': { ok: 'Revisaste los cambios.', fail: 'Escribe git diff' },
    '4.8': { ok: 'Cambios guardados.' },
    '4.9': { ok: 'Pull Request creado.', fail: 'Escribe el comando gh pr create con --title y --body' },
    '4.10': { ok: 'Completaste el Módulo 4.' },
  },
  en: {
    '4.1': { ok: 'Context clear. Let\'s get to work.' },
    '4.2': { ok: 'Project cloned.', fail: 'Type git clone https://github.com/equipo/landing.git' },
    '4.3': { ok: 'You\'re inside the project.', fail: 'Type cd landing' },
    '4.4': { ok: 'You know the project now.' },
    '4.5': { ok: 'Branch created.', fail: 'Type git checkout -b cambiar-titulo' },
    '4.6': { ok: 'The agent made the change.' },
    '4.7': { ok: 'You reviewed the changes.', fail: 'Type git diff' },
    '4.8': { ok: 'Changes saved.' },
    '4.9': { ok: 'Pull Request created.', fail: 'Type the gh pr create command with --title and --body' },
    '4.10': { ok: 'You completed Module 4.' },
  },
  fr: {
    '4.1': { ok: 'Contexte clair. Allons travailler.' },
    '4.2': { ok: 'Projet cloné.', fail: 'Tape git clone https://github.com/equipo/landing.git' },
    '4.3': { ok: 'Tu es dans le projet.', fail: 'Tape cd landing' },
    '4.4': { ok: 'Tu connais le projet maintenant.' },
    '4.5': { ok: 'Branche créée.', fail: 'Tape git checkout -b cambiar-titulo' },
    '4.6': { ok: 'L\'agent a fait le changement.' },
    '4.7': { ok: 'Tu as vérifié les changements.', fail: 'Tape git diff' },
    '4.8': { ok: 'Changements sauvegardés.' },
    '4.9': { ok: 'Pull Request créé.', fail: 'Tape la commande gh pr create avec --title et --body' },
    '4.10': { ok: 'Tu as complété le Module 4.' },
  },
};

const content: Record<Locale, Record<string, LessonText>> = {
  es: {
    '4.1': {
      title: 'El escenario',
      module: 'Tu primera tarea real',
      concept: 'Acabas de unirte a un equipo que tiene una landing page. Tu primera tarea: cambiar el título de "Welcome to our app" a "Build something amazing".\n\nEl repositorio está en GitHub. Vamos a hacer todo el flujo: clonar, explorar, crear branch, pedir el cambio al agente, revisar, guardar y crear un Pull Request.',
      why: 'Así es como funciona el trabajo real. No importa si es tu primer día — el flujo siempre es el mismo.',
      task: '',
    },
    '4.2': {
      title: 'Clonar el proyecto',
      module: 'Tu primera tarea real',
      concept: 'Lo primero es traer el proyecto a tu máquina. git clone descarga una copia completa del repositorio.\n\n(Esta URL es un ejemplo. En tu trabajo real, tu equipo te dará la URL del repositorio.)',
      why: 'No puedes trabajar en algo que no tienes. Clonar es siempre el primer paso.',
      task: 'Descarga el proyecto del equipo',
      hint: 'Escribe el comando completo: git clone https://github.com/equipo/landing.git',
      simulateLines: [
        'Cloning into \'landing\'...',
        'remote: Enumerating objects: 47, done.',
        'remote: Counting objects: 100% (47/47), done.',
        'remote: Compressing objects: 100% (31/31), done.',
        'remote: Total 47 (delta 12), reused 47 (delta 12), pack-reused 0',
        'Receiving objects: 100% (47/47), 8.12 KiB | 4.06 MiB/s, done.',
        'Resolving deltas: 100% (12/12), done.',
      ],
      simulateDelay: 120,
    },
    '4.3': {
      title: 'Entrar al proyecto',
      module: 'Tu primera tarea real',
      concept: 'El proyecto se descargó en una carpeta llamada "landing". Necesitas entrar en ella para trabajar.\n\nCuando cd funciona, no muestra ningún mensaje — eso es normal. Silencio = éxito.',
      why: 'Todos los comandos que ejecutes afectan la carpeta donde estás. Si no entras, estarás trabajando en el lugar equivocado.',
      task: 'Entra al proyecto que acabas de descargar',
      hint: 'Escribe cd landing',
    },
    '4.4': {
      title: 'Explorar los archivos',
      module: 'Tu primera tarea real',
      concept: 'Antes de cambiar algo, necesitas entender qué hay en el proyecto. Primero mira los archivos, luego lee el que necesitas modificar.',
      why: 'Nunca pidas un cambio a ciegas. Explora primero para saber qué hay y dónde está.',
      task: 'Explora el proyecto antes de hacer cambios',
    },
    '4.5': {
      title: 'Crear tu branch',
      module: 'Tu primera tarea real',
      concept: 'Nunca trabajes directo en main. Crea una rama (branch) con un nombre descriptivo para tu cambio.',
      analogy: 'Como crear un borrador en Notion antes de publicar. Si algo sale mal, el documento principal no se toca.',
      why: 'Las ramas protegen el código principal. Si algo sale mal, main sigue intacto.',
      task: 'Crea una rama para tu cambio',
      hint: 'Escribe git checkout -b cambiar-titulo',
      simulateLines: [
        'Switched to a new branch \'cambiar-titulo\'',
      ],
      simulateDelay: 100,
    },
    '4.6': {
      title: 'Pedir el cambio al agente',
      module: 'Tu primera tarea real',
      concept: 'Ya exploraste el proyecto y sabes qué cambiar. Ahora le pides al agente IA que haga el cambio por ti.\n\nLe describes qué archivo, qué dice ahora, y qué debe decir después.',
      why: 'Describir bien el cambio es la habilidad más importante. Si le dices exactamente qué hacer, el agente lo hace bien.',
      task: 'Describe el cambio al agente',
    },
    '4.7': {
      title: 'Revisar el resultado',
      module: 'Tu primera tarea real',
      concept: 'El agente hizo el cambio. Ahora necesitas verificar que lo hizo correctamente con git diff.',
      why: 'Siempre revisa antes de guardar. El agente puede equivocarse, y tú eres el responsable.',
      task: 'Revisa qué cambió el agente',
      hint: 'Escribe git diff para ver qué cambió',
      simulateLines: [
        'diff --git a/src/App.tsx b/src/App.tsx',
        'index 3a1f2c4..7b2e9d1 100644',
        '--- a/src/App.tsx',
        '+++ b/src/App.tsx',
        '@@ -4,7 +4,7 @@ function App() {',
        '   return (',
        '     <div className="App">',
        '-      <h1>Welcome to our app</h1>',
        '+      <h1>Build something amazing</h1>',
        '       <p>Start building today</p>',
        '     </div>',
        '   );',
      ],
      simulateDelay: 80,
    },
    '4.8': {
      title: 'Guardar tus cambios',
      module: 'Tu primera tarea real',
      concept: 'Un commit guarda tus cambios con un mensaje que describe qué hiciste.\n\nBuen mensaje: "update landing title" — corto, claro, dice qué cambió.\nMal mensaje: "cambios" — no dice nada útil.\n\ngit add . selecciona todo. git commit -m "mensaje" lo guarda.',
      why: 'Git no guarda automáticamente. Tú decides qué guardar y cuándo, con un mensaje que explique por qué.',
      task: 'Guarda tus cambios con git add y git commit',
    },
    '4.9': {
      title: 'Crear un Pull Request',
      module: 'Tu primera tarea real',
      concept: 'El último paso: crear un Pull Request para que tu equipo revise tus cambios antes de aprobarlos.\n\nUsamos la herramienta gh (GitHub CLI) para crearlo desde la terminal.\n\n--title es el título del PR (qué cambiaste). --body es la descripción (por qué lo cambiaste).',
      analogy: 'Como pedir aprobación en Google Docs antes de enviar a los stakeholders. Tu equipo revisa antes de publicar.',
      why: 'Un Pull Request es cómo el equipo revisa tu trabajo. Nadie debería subir cambios sin revisión.',
      task: 'Crea un Pull Request para que tu equipo revise',
      hint: 'Escribe el comando gh pr create con --title y --body',
      simulateLines: [
        '',
        'Creating pull request for cambiar-titulo into main in equipo/landing',
        '',
        'https://github.com/equipo/landing/pull/42',
      ],
      simulateDelay: 150,
    },
    '4.10': {
      title: 'Quiz — Tu primera tarea real',
      module: 'Tu primera tarea real',
      concept: 'Completaste un flujo real de trabajo. Veamos cuánto aprendiste.',
      why: 'Responder preguntas refuerza lo que aprendiste. No te preocupes si fallas alguna — es parte del proceso.',
      task: 'Usa ↑↓ para navegar y Enter para seleccionar',
    },
  },
  en: {
    '4.1': {
      title: 'The scenario',
      module: 'Your first real task',
      concept: 'You just joined a team that has a landing page. Your first task: change the title from "Welcome to our app" to "Build something amazing".\n\nThe repo is on GitHub. We\'ll go through the full flow: clone, explore, create branch, ask the agent to make the change, review, save, and create a Pull Request.',
      why: 'This is how real work happens. It doesn\'t matter if it\'s your first day — the flow is always the same.',
      task: '',
    },
    '4.2': {
      title: 'Clone the project',
      module: 'Your first real task',
      concept: 'First thing is to bring the project to your machine. git clone downloads a complete copy of the repository.\n\n(This URL is an example. In your real job, your team will give you the repository URL.)',
      why: 'You can\'t work on something you don\'t have. Cloning is always the first step.',
      task: 'Download the team\'s project',
      hint: 'Type the full command: git clone https://github.com/equipo/landing.git',
      simulateLines: [
        'Cloning into \'landing\'...',
        'remote: Enumerating objects: 47, done.',
        'remote: Counting objects: 100% (47/47), done.',
        'remote: Compressing objects: 100% (31/31), done.',
        'remote: Total 47 (delta 12), reused 47 (delta 12), pack-reused 0',
        'Receiving objects: 100% (47/47), 8.12 KiB | 4.06 MiB/s, done.',
        'Resolving deltas: 100% (12/12), done.',
      ],
      simulateDelay: 120,
    },
    '4.3': {
      title: 'Enter the project',
      module: 'Your first real task',
      concept: 'The project was downloaded into a folder called "landing". You need to enter it to work.\n\nWhen cd works, it shows no message — that\'s normal. Silence = success.',
      why: 'Every command you run affects the folder you\'re in. If you don\'t enter it, you\'ll be working in the wrong place.',
      task: 'Go into the project you just downloaded',
      hint: 'Type cd landing',
    },
    '4.4': {
      title: 'Explore the files',
      module: 'Your first real task',
      concept: 'Before changing anything, you need to understand what\'s in the project. First look at the files, then read the one you need to modify.',
      why: 'Never ask for a change blindly. Explore first to know what\'s there and where it is.',
      task: 'Explore the project before making changes',
    },
    '4.5': {
      title: 'Create your branch',
      module: 'Your first real task',
      concept: 'Never work directly on main. Create a branch with a descriptive name for your change.',
      analogy: 'Like creating a draft in Notion before publishing. If something goes wrong, the main document stays clean.',
      why: 'Branches protect the main code. If something goes wrong, main stays intact.',
      task: 'Create a branch for your change',
      hint: 'Type git checkout -b cambiar-titulo',
      simulateLines: [
        'Switched to a new branch \'cambiar-titulo\'',
      ],
      simulateDelay: 100,
    },
    '4.6': {
      title: 'Ask the agent to make the change',
      module: 'Your first real task',
      concept: 'You\'ve explored the project and know what to change. Now you ask the AI agent to make the change for you.\n\nDescribe which file, what it says now, and what it should say after.',
      why: 'Describing the change well is the most important skill. If you tell it exactly what to do, the agent does it right.',
      task: 'Describe the change to the agent',
    },
    '4.7': {
      title: 'Review the result',
      module: 'Your first real task',
      concept: 'The agent made the change. Now you need to verify it was done correctly with git diff.',
      why: 'Always review before saving. The agent can make mistakes, and you are responsible.',
      task: 'Check what the agent changed',
      hint: 'Type git diff to see what changed',
      simulateLines: [
        'diff --git a/src/App.tsx b/src/App.tsx',
        'index 3a1f2c4..7b2e9d1 100644',
        '--- a/src/App.tsx',
        '+++ b/src/App.tsx',
        '@@ -4,7 +4,7 @@ function App() {',
        '   return (',
        '     <div className="App">',
        '-      <h1>Welcome to our app</h1>',
        '+      <h1>Build something amazing</h1>',
        '       <p>Start building today</p>',
        '     </div>',
        '   );',
      ],
      simulateDelay: 80,
    },
    '4.8': {
      title: 'Save your changes',
      module: 'Your first real task',
      concept: 'A commit saves your changes with a message describing what you did.\n\nGood message: "update landing title" — short, clear, says what changed.\nBad message: "changes" — says nothing useful.\n\ngit add . selects everything. git commit -m "message" saves it.',
      why: 'Git doesn\'t save automatically. You decide what to save and when, with a message that explains why.',
      task: 'Save your changes with git add and git commit',
    },
    '4.9': {
      title: 'Create a Pull Request',
      module: 'Your first real task',
      concept: 'The final step: create a Pull Request so your team can review your changes before approving them.\n\nWe use the gh tool (GitHub CLI) to create it from the terminal.\n\n--title is the PR title (what you changed). --body is the description (why you changed it).',
      analogy: 'Like requesting approval in Google Docs before sending to stakeholders. Your team reviews before publishing.',
      why: 'A Pull Request is how the team reviews your work. Nobody should push changes without review.',
      task: 'Create a Pull Request for your team to review',
      hint: 'Type the gh pr create command with --title and --body',
      simulateLines: [
        '',
        'Creating pull request for cambiar-titulo into main in equipo/landing',
        '',
        'https://github.com/equipo/landing/pull/42',
      ],
      simulateDelay: 150,
    },
    '4.10': {
      title: 'Quiz — Your first real task',
      module: 'Your first real task',
      concept: 'You completed a real work flow. Let\'s see how much you learned.',
      why: 'Answering questions reinforces what you learned. Don\'t worry if you miss some — it\'s part of the process.',
      task: 'Use ↑↓ to navigate and Enter to select',
    },
  },
  fr: {
    '4.1': {
      title: 'Le scénario',
      module: 'Ta première vraie tâche',
      concept: 'Tu viens de rejoindre une équipe qui a une landing page. Ta première tâche : changer le titre de "Welcome to our app" à "Build something amazing".\n\nLe dépôt est sur GitHub. On va faire tout le flux : cloner, explorer, créer une branche, demander le changement à l\'agent, vérifier, sauvegarder et créer un Pull Request.',
      why: 'C\'est comme ça que le vrai travail fonctionne. Peu importe si c\'est ton premier jour — le flux est toujours le même.',
      task: '',
    },
    '4.2': {
      title: 'Cloner le projet',
      module: 'Ta première vraie tâche',
      concept: 'La première chose est d\'amener le projet sur ta machine. git clone télécharge une copie complète du dépôt.\n\n(Cette URL est un exemple. Dans ton travail réel, ton équipe te donnera l\'URL du dépôt.)',
      why: 'Tu ne peux pas travailler sur quelque chose que tu n\'as pas. Cloner est toujours la première étape.',
      task: 'Télécharge le projet de l\'équipe',
      hint: 'Tape la commande complète : git clone https://github.com/equipo/landing.git',
      simulateLines: [
        'Cloning into \'landing\'...',
        'remote: Enumerating objects: 47, done.',
        'remote: Counting objects: 100% (47/47), done.',
        'remote: Compressing objects: 100% (31/31), done.',
        'remote: Total 47 (delta 12), reused 47 (delta 12), pack-reused 0',
        'Receiving objects: 100% (47/47), 8.12 KiB | 4.06 MiB/s, done.',
        'Resolving deltas: 100% (12/12), done.',
      ],
      simulateDelay: 120,
    },
    '4.3': {
      title: 'Entrer dans le projet',
      module: 'Ta première vraie tâche',
      concept: 'Le projet a été téléchargé dans un dossier appelé "landing". Tu dois y entrer pour travailler.\n\nQuand cd fonctionne, il n\'affiche aucun message — c\'est normal. Silence = succès.',
      why: 'Chaque commande que tu exécutes affecte le dossier où tu es. Si tu n\'y entres pas, tu travailleras au mauvais endroit.',
      task: 'Entre dans le projet que tu viens de télécharger',
      hint: 'Tape cd landing',
    },
    '4.4': {
      title: 'Explorer les fichiers',
      module: 'Ta première vraie tâche',
      concept: 'Avant de changer quoi que ce soit, tu dois comprendre ce qu\'il y a dans le projet. D\'abord regarde les fichiers, puis lis celui que tu dois modifier.',
      why: 'Ne demande jamais un changement à l\'aveugle. Explore d\'abord pour savoir ce qu\'il y a et où c\'est.',
      task: 'Explore le projet avant de faire des changements',
    },
    '4.5': {
      title: 'Créer ta branche',
      module: 'Ta première vraie tâche',
      concept: 'Ne travaille jamais directement sur main. Crée une branche avec un nom descriptif pour ton changement.',
      analogy: 'Comme créer un brouillon dans Notion avant de publier. Si quelque chose ne va pas, le document principal reste intact.',
      why: 'Les branches protègent le code principal. Si quelque chose va mal, main reste intact.',
      task: 'Crée une branche pour ton changement',
      hint: 'Tape git checkout -b cambiar-titulo',
      simulateLines: [
        'Switched to a new branch \'cambiar-titulo\'',
      ],
      simulateDelay: 100,
    },
    '4.6': {
      title: 'Demander le changement à l\'agent',
      module: 'Ta première vraie tâche',
      concept: 'Tu as exploré le projet et tu sais quoi changer. Maintenant tu demandes à l\'agent IA de faire le changement pour toi.\n\nDécris quel fichier, ce qu\'il dit maintenant, et ce qu\'il devrait dire après.',
      why: 'Bien décrire le changement est la compétence la plus importante. Si tu lui dis exactement quoi faire, l\'agent le fait bien.',
      task: 'Décris le changement à l\'agent',
    },
    '4.7': {
      title: 'Vérifier le résultat',
      module: 'Ta première vraie tâche',
      concept: 'L\'agent a fait le changement. Maintenant tu dois vérifier qu\'il l\'a fait correctement avec git diff.',
      why: 'Vérifie toujours avant de sauvegarder. L\'agent peut se tromper, et c\'est toi le responsable.',
      task: 'Vérifie ce que l\'agent a changé',
      hint: 'Tape git diff pour voir ce qui a changé',
      simulateLines: [
        'diff --git a/src/App.tsx b/src/App.tsx',
        'index 3a1f2c4..7b2e9d1 100644',
        '--- a/src/App.tsx',
        '+++ b/src/App.tsx',
        '@@ -4,7 +4,7 @@ function App() {',
        '   return (',
        '     <div className="App">',
        '-      <h1>Welcome to our app</h1>',
        '+      <h1>Build something amazing</h1>',
        '       <p>Start building today</p>',
        '     </div>',
        '   );',
      ],
      simulateDelay: 80,
    },
    '4.8': {
      title: 'Sauvegarder tes changements',
      module: 'Ta première vraie tâche',
      concept: 'Un commit sauvegarde tes changements avec un message décrivant ce que tu as fait.\n\nBon message : "update landing title" — court, clair, dit ce qui a changé.\nMauvais message : "changes" — ne dit rien d\'utile.\n\ngit add . sélectionne tout. git commit -m "message" le sauvegarde.',
      why: 'Git ne sauvegarde pas automatiquement. C\'est toi qui décides quoi sauvegarder et quand, avec un message qui explique pourquoi.',
      task: 'Sauvegarde tes changements avec git add et git commit',
    },
    '4.9': {
      title: 'Créer un Pull Request',
      module: 'Ta première vraie tâche',
      concept: 'La dernière étape : créer un Pull Request pour que ton équipe puisse réviser tes changements avant de les approuver.\n\nOn utilise l\'outil gh (GitHub CLI) pour le créer depuis le terminal.\n\n--title est le titre du PR (ce que tu as changé). --body est la description (pourquoi tu l\'as changé).',
      analogy: 'Comme demander une approbation dans Google Docs avant d\'envoyer aux parties prenantes. Ton équipe vérifie avant de publier.',
      why: 'Un Pull Request c\'est comment l\'équipe révise ton travail. Personne ne devrait pousser des changements sans révision.',
      task: 'Crée un Pull Request pour que ton équipe vérifie',
      hint: 'Tape la commande gh pr create avec --title et --body',
      simulateLines: [
        '',
        'Creating pull request for cambiar-titulo into main in equipo/landing',
        '',
        'https://github.com/equipo/landing/pull/42',
      ],
      simulateDelay: 150,
    },
    '4.10': {
      title: 'Quiz — Ta première vraie tâche',
      module: 'Ta première vraie tâche',
      concept: 'Tu as complété un vrai flux de travail. Voyons combien tu as appris.',
      why: 'Répondre à des questions renforce ce que tu as appris. Ne t\'inquiète pas si tu en rates — ça fait partie du processus.',
      task: 'Utilise ↑↓ pour naviguer et Entrée pour sélectionner',
    },
  },
};

interface QuizQuestionData {
  question: string;
  options: string[];
  correct: number;
  explanation: string;
}

const quizModule4: Record<Locale, QuizQuestionData[]> = {
  es: [
    { question: '¿Qué haces ANTES de crear una rama en un proyecto nuevo?', options: ['Clonar el proyecto y explorar los archivos', 'Editar archivos directamente', 'Push a main', 'Borrar el repo'], correct: 0, explanation: 'Primero necesitas tener el proyecto (git clone) y entender qué hay (ls, cat). Luego creas tu rama.' },
    { question: '¿Qué comando crea una nueva rama?', options: ['git branch -d', 'git merge', 'git checkout -b', 'git push'], correct: 2, explanation: 'git checkout -b crea una rama nueva y te mueve a ella al mismo tiempo.' },
    { question: 'Antes de pedir algo al agente, ¿qué deberías hacer?', options: ['Push a producción', 'Explorar los archivos para entender el proyecto', 'Borrar ramas viejas', 'Nada'], correct: 1, explanation: 'Explorar primero te permite describir el cambio con precisión.' },
    { question: 'Después de que el agente hace cambios, ¿qué revisas?', options: ['git push', 'git clone', 'git init', 'git diff'], correct: 3, explanation: 'git diff te muestra exactamente qué líneas cambiaron.' },
    { question: '¿Qué es un Pull Request?', options: ['Una forma de borrar archivos', 'Una solicitud para que tu equipo revise tus cambios', 'Un tipo de rama', 'Un lenguaje de programación'], correct: 1, explanation: 'Un Pull Request le dice al equipo: "Hice estos cambios, revísenlos antes de aprobarlos".' },
  ],
  en: [
    { question: 'What do you do BEFORE creating a branch in a new project?', options: ['Clone the project and explore the files', 'Edit files directly', 'Push to main', 'Delete the repo'], correct: 0, explanation: 'First you need to have the project (git clone) and understand what\'s there (ls, cat). Then you create your branch.' },
    { question: 'What command creates a new branch?', options: ['git branch -d', 'git merge', 'git checkout -b', 'git push'], correct: 2, explanation: 'git checkout -b creates a new branch and moves you to it at the same time.' },
    { question: 'Before asking the agent, what should you do?', options: ['Push to production', 'Explore the files to understand the project', 'Delete old branches', 'Nothing'], correct: 1, explanation: 'Exploring first lets you describe the change precisely.' },
    { question: 'After the agent makes changes, what do you check?', options: ['git push', 'git clone', 'git init', 'git diff'], correct: 3, explanation: 'git diff shows you exactly which lines changed.' },
    { question: 'What is a Pull Request?', options: ['A way to delete files', 'A request for your team to review your changes', 'A type of branch', 'A programming language'], correct: 1, explanation: 'A Pull Request tells the team: "I made these changes, review them before approving".' },
  ],
  fr: [
    { question: 'Que fais-tu AVANT de créer une branche dans un nouveau projet ?', options: ['Cloner le projet et explorer les fichiers', 'Modifier les fichiers directement', 'Push sur main', 'Supprimer le dépôt'], correct: 0, explanation: 'D\'abord tu dois avoir le projet (git clone) et comprendre ce qu\'il contient (ls, cat). Ensuite tu crées ta branche.' },
    { question: 'Quelle commande crée une nouvelle branche ?', options: ['git branch -d', 'git merge', 'git checkout -b', 'git push'], correct: 2, explanation: 'git checkout -b crée une nouvelle branche et t\'y déplace en même temps.' },
    { question: 'Avant de demander quelque chose à l\'agent, que dois-tu faire ?', options: ['Push en production', 'Explorer les fichiers pour comprendre le projet', 'Supprimer les vieilles branches', 'Rien'], correct: 1, explanation: 'Explorer d\'abord te permet de décrire le changement avec précision.' },
    { question: 'Après que l\'agent fait des changements, que vérifies-tu ?', options: ['git push', 'git clone', 'git init', 'git diff'], correct: 3, explanation: 'git diff te montre exactement quelles lignes ont changé.' },
    { question: 'Qu\'est-ce qu\'un Pull Request ?', options: ['Un moyen de supprimer des fichiers', 'Une demande pour que ton équipe révise tes changements', 'Un type de branche', 'Un langage de programmation'], correct: 1, explanation: 'Un Pull Request dit à l\'équipe : "J\'ai fait ces changements, révisez-les avant de les approuver".' },
  ],
};

const practiceModule4_4: Record<Locale, CommandStep[]> = {
  es: [
    { challenge: 'Mira qué archivos hay en este proyecto', command: 'ls', output: ['README.md  package.json  src/  public/  node_modules/'], hint1: 'Un comando de 2 letras...', hint2: 'El comando es ls' },
    { challenge: 'Hay un README.md — léelo para entender el proyecto', command: 'cat README.md', output: ['# Landing Page', '', 'Página de bienvenida del equipo.', 'El archivo principal está en src/App.tsx (un archivo de código)'], hint1: 'El comando para leer archivos es cat...', hint2: 'El comando es cat README.md' },
    { challenge: 'El README dice que el archivo principal está en src/App.tsx — léelo', command: 'cat src/App.tsx', output: ['import React from "react";', '', 'function App() {', '  return (', '    <div className="App">', '      <h1>Welcome to our app</h1>', '      <p>Start building today</p>', '    </div>', '  );', '}', '', 'export default App;'], hint1: 'Usa cat con la ruta que viste en el README...', hint2: 'El comando es cat src/App.tsx' },
  ],
  en: [
    { challenge: 'See what files are in this project', command: 'ls', output: ['README.md  package.json  src/  public/  node_modules/'], hint1: 'A 2-letter command...', hint2: 'The command is ls' },
    { challenge: 'There\'s a README.md — read it to understand the project', command: 'cat README.md', output: ['# Landing Page', '', 'Team welcome page.', 'The main file is in src/App.tsx (a code file)'], hint1: 'The command to read files is cat...', hint2: 'The command is cat README.md' },
    { challenge: 'The README says the main file is in src/App.tsx — read it', command: 'cat src/App.tsx', output: ['import React from "react";', '', 'function App() {', '  return (', '    <div className="App">', '      <h1>Welcome to our app</h1>', '      <p>Start building today</p>', '    </div>', '  );', '}', '', 'export default App;'], hint1: 'Use cat with the path from the README...', hint2: 'The command is cat src/App.tsx' },
  ],
  fr: [
    { challenge: 'Regarde quels fichiers il y a dans ce projet', command: 'ls', output: ['README.md  package.json  src/  public/  node_modules/'], hint1: 'Une commande de 2 lettres...', hint2: 'La commande est ls' },
    { challenge: 'Il y a un README.md — lis-le pour comprendre le projet', command: 'cat README.md', output: ['# Landing Page', '', 'Page d\'accueil de l\'équipe.', 'Le fichier principal est dans src/App.tsx (un fichier de code)'], hint1: 'La commande pour lire des fichiers est cat...', hint2: 'La commande est cat README.md' },
    { challenge: 'Le README dit que le fichier principal est dans src/App.tsx — lis-le', command: 'cat src/App.tsx', output: ['import React from "react";', '', 'function App() {', '  return (', '    <div className="App">', '      <h1>Welcome to our app</h1>', '      <p>Start building today</p>', '    </div>', '  );', '}', '', 'export default App;'], hint1: 'Utilise cat avec le chemin du README...', hint2: 'La commande est cat src/App.tsx' },
  ],
};

const practiceModule4_8: Record<Locale, CommandStep[]> = {
  es: [
    { challenge: 'Selecciona todos los archivos para guardar', command: 'git add .', output: [], hint1: 'git add + algo que signifique "todo"', hint2: 'El comando es git add .' },
    { challenge: 'Guarda con un mensaje descriptivo', command: 'git commit -m "change landing title"', acceptPattern: 'git commit -m .+', output: ['[cambiar-titulo abc1234] change landing title', ' 1 file changed, 1 insertion(+), 1 deletion(-)'], hint1: 'git commit -m seguido de tu mensaje entre comillas "..."', hint2: 'El comando es git commit -m "change landing title"' },
  ],
  en: [
    { challenge: 'Select all files to save', command: 'git add .', output: [], hint1: 'git add + something that means "everything"', hint2: 'The command is git add .' },
    { challenge: 'Save with a descriptive message', command: 'git commit -m "change landing title"', acceptPattern: 'git commit -m .+', output: ['[cambiar-titulo abc1234] change landing title', ' 1 file changed, 1 insertion(+), 1 deletion(-)'], hint1: 'git commit -m followed by your message in "quotes"', hint2: 'The command is git commit -m "change landing title"' },
  ],
  fr: [
    { challenge: 'Sélectionne tous les fichiers à sauvegarder', command: 'git add .', output: [], hint1: 'git add + quelque chose qui signifie "tout"', hint2: 'La commande est git add .' },
    { challenge: 'Sauvegarde avec un message descriptif', command: 'git commit -m "change landing title"', acceptPattern: 'git commit -m .+', output: ['[cambiar-titulo abc1234] change landing title', ' 1 file changed, 1 insertion(+), 1 deletion(-)'], hint1: 'git commit -m suivi de ton message entre guillemets "..."', hint2: 'La commande est git commit -m "change landing title"' },
  ],
};

function buildSimulate(c: LessonText) {
  if (!c.simulateLines) return undefined;
  return { lines: c.simulateLines, delay: c.simulateDelay };
}

export function getModule4Lessons(locale: Locale): Lesson[] {
  const c = content[locale];
  const m = msg[locale];

  return [
    // 4.1 — The scenario (concept-only)
    {
      id: '4.1',
      ...c['4.1']!,
      validate: () => ({ valid: true, message: m['4.1'].ok }),
    },
    // 4.2 — Clone the project
    {
      id: '4.2',
      ...c['4.2']!,
      prompt: '~ $',
      command: 'git clone https://github.com/equipo/landing.git',
      validate: (input: string) => {
        const t = input.trim();
        if (/^git\s+clone\s+https?:\/\/\S+/.test(t)) return { valid: true, message: m['4.2'].ok };
        return { valid: false, message: (m['4.2'] as any).fail };
      },
      simulate: buildSimulate(c['4.2']!),
    },
    // 4.3 — Enter the project
    {
      id: '4.3',
      ...c['4.3']!,
      prompt: '~/landing $',
      command: 'cd landing',
      validate: (input: string) => {
        const t = input.trim().toLowerCase();
        if (t === 'cd landing') return { valid: true, message: m['4.3'].ok };
        return { valid: false, message: (m['4.3'] as any).fail };
      },
      simulate: buildSimulate(c['4.3']!),
    },
    // 4.4 — Explore the files (practiceSteps)
    {
      id: '4.4',
      ...c['4.4']!,
      prompt: '~/landing $',
      validate: () => ({ valid: true, message: m['4.4'].ok }),
      practiceSteps: practiceModule4_4[locale],
    },
    // 4.5 — Create your branch
    {
      id: '4.5',
      ...c['4.5']!,
      prompt: '~/landing $',
      command: 'git checkout -b cambiar-titulo',
      validate: (input: string) => {
        const t = input.trim();
        if (t === 'git checkout -b cambiar-titulo') return { valid: true, message: m['4.5'].ok };
        return { valid: false, message: (m['4.5'] as any).fail };
      },
      simulate: buildSimulate(c['4.5']!),
    },
    // 4.6 — Ask the agent (agent-simulation)
    {
      id: '4.6',
      ...c['4.6']!,
      prompt: '~/landing $',
      interactive: 'agent-simulation',
      validate: () => ({ valid: true, message: m['4.6'].ok }),
      agentSimulation: {
        scenario: locale === 'es'
          ? 'Acabas de ver que el título de la página dice "Welcome to our app". Quieres que diga "Build something amazing". Pídele al agente que lo cambie.'
          : locale === 'fr'
            ? 'Tu viens de voir que le titre de la page dit "Welcome to our app". Tu veux qu\'il dise "Build something amazing". Demande à l\'agent de le changer.'
            : 'You just saw that the page title says "Welcome to our app". You want it to say "Build something amazing". Ask the agent to change it.',
        promptHint: locale === 'es'
          ? 'Describe lo que quieres cambiar, como si hablaras con alguien'
          : locale === 'fr'
            ? 'Décris ce que tu veux changer, comme si tu parlais à quelqu\'un'
            : 'Describe what you want to change, like talking to someone',
        acceptedPatterns: ['title|titulo|titre|heading', 'Build something|amazing|asombroso|extraordinaire|cambiar|change|changer'],
        agentResponse: locale === 'es'
          ? [
              '  Voy a actualizar el título en src/App.tsx.',
              '',
              '  Cambié <h1>Welcome to our app</h1>',
              '  a      <h1>Build something amazing</h1>',
              '',
              '  ✓ Archivo guardado.',
            ]
          : locale === 'fr'
            ? [
                '  Je vais mettre à jour le titre dans src/App.tsx.',
                '',
                '  Changé <h1>Welcome to our app</h1>',
                '  en     <h1>Build something amazing</h1>',
                '',
                '  ✓ Fichier sauvegardé.',
              ]
            : [
                '  I\'ll update the title in src/App.tsx.',
                '',
                '  Changed <h1>Welcome to our app</h1>',
                '  to      <h1>Build something amazing</h1>',
                '',
                '  ✓ File saved.',
              ],
        diffLines: [
          'diff --git a/src/App.tsx b/src/App.tsx',
          '--- a/src/App.tsx',
          '+++ b/src/App.tsx',
          '-      <h1>Welcome to our app</h1>',
          '+      <h1>Build something amazing</h1>',
        ],
        approveIsCorrect: true,
        explanation: locale === 'es'
          ? 'El agente cambió exactamente lo que pediste. El diff muestra solo la línea del título modificada.'
          : locale === 'fr'
            ? 'L\'agent a changé exactement ce que tu as demandé. Le diff montre seulement la ligne du titre modifiée.'
            : 'The agent changed exactly what you asked. The diff shows only the title line modified.',
      },
    },
    // 4.7 — Review the result
    {
      id: '4.7',
      ...c['4.7']!,
      prompt: '~/landing $',
      command: 'git diff',
      validate: (input: string) => {
        const t = input.trim().toLowerCase();
        if (t === 'git diff') return { valid: true, message: m['4.7'].ok };
        return { valid: false, message: (m['4.7'] as any).fail };
      },
      simulate: buildSimulate(c['4.7']!),
    },
    // 4.8 — Save your changes (practiceSteps)
    {
      id: '4.8',
      ...c['4.8']!,
      prompt: '~/landing $',
      validate: () => ({ valid: true, message: m['4.8'].ok }),
      practiceSteps: practiceModule4_8[locale],
    },
    // 4.9 — Create a Pull Request
    {
      id: '4.9',
      ...c['4.9']!,
      prompt: '~/landing $',
      command: 'gh pr create --title "Update landing title" --body "Changed title to Build something amazing"',
      validate: (input: string) => {
        const t = input.trim();
        if (/^gh\s+pr\s+create\b/.test(t) && /--title\s/.test(t) && /--body\s/.test(t)) return { valid: true, message: m['4.9'].ok };
        return { valid: false, message: (m['4.9'] as any).fail };
      },
      simulate: buildSimulate(c['4.9']!),
    },
    // 4.10 — Quiz
    {
      id: '4.10',
      ...c['4.10']!,
      validate: () => ({ valid: true, message: m['4.10'].ok }),
      quizQuestions: quizModule4[locale],
    },
  ];
}
