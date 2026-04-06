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
    '2.3': {
      ok: 'Ya sabes preguntar qu\u00e9 cambi\u00f3.',
      failNoSpace: 'Necesitas un espacio entre git y status',
      failMissing: 'Falta la palabra git al inicio. Escribe: git status',
      fail: 'Escribe git status (con espacio)',
    },
    '2.4': { ok: 'Ya puedes ver el historial.', fail: 'Escribe git log (con espacio)' },
    '2.5': { ok: 'Ya sabes ver tus ramas.', fail: 'Escribe git branch (con espacio)' },
    '2.6': { ok: 'Nunca apruebes sin ver el diff.', fail: 'Escribe git diff (con espacio)' },
    '2.7': {
      ok: 'Rama creada.',
      failMissing: 'Falta -b y el nombre. Escribe: git checkout -b mi-cambio',
      fail: 'Escribe git checkout -b mi-cambio',
    },
    '2.8': {
      ok: 'Archivos listos para guardar.',
      failMissing: 'Falta el punto al final. Escribe: git add .',
      fail: 'Escribe git add . (con punto al final)',
    },
    '2.9': {
      ok: 'Proyecto clonado.',
      failMissing: 'Falta el URL. Escribe: git clone https://github.com/equipo/proyecto.git',
      fail: 'Escribe git clone seguido del URL',
    },
    '2.10': { ok: 'Flujo dominado.', fail: 'Escribe git status' },
  },
  en: {
    '2.3': {
      ok: 'Now you know how to ask what changed.',
      failNoSpace: 'You need a space between git and status',
      failMissing: 'Missing the word git at the start. Type: git status',
      fail: 'Type git status (with a space)',
    },
    '2.4': { ok: 'Now you can see the history.', fail: 'Type git log (with a space)' },
    '2.5': { ok: 'Now you know how to see your branches.', fail: 'Type git branch (with a space)' },
    '2.6': { ok: 'Never approve without seeing the diff.', fail: 'Type git diff (with a space)' },
    '2.7': {
      ok: 'Branch created.',
      failMissing: 'Missing -b and the name. Type: git checkout -b mi-cambio',
      fail: 'Type git checkout -b mi-cambio',
    },
    '2.8': {
      ok: 'Files ready to save.',
      failMissing: 'Missing the dot at the end. Type: git add .',
      fail: 'Type git add . (with a dot at the end)',
    },
    '2.9': {
      ok: 'Project cloned.',
      failMissing: 'Missing the URL. Type: git clone https://github.com/equipo/proyecto.git',
      fail: 'Type git clone followed by the URL',
    },
    '2.10': { ok: 'Flow mastered.', fail: 'Type git status' },
  },
  fr: {
    '2.3': {
      ok: 'Maintenant tu sais demander ce qui a chang\u00e9.',
      failNoSpace: 'Il faut un espace entre git et status',
      failMissing: 'Il manque le mot git au d\u00e9but. Tape : git status',
      fail: 'Tape git status (avec un espace)',
    },
    '2.4': { ok: 'Maintenant tu peux voir l\u2019historique.', fail: 'Tape git log (avec un espace)' },
    '2.5': { ok: 'Maintenant tu sais voir tes branches.', fail: 'Tape git branch (avec un espace)' },
    '2.6': { ok: 'N\u2019approuve jamais sans voir le diff.', fail: 'Tape git diff (avec un espace)' },
    '2.7': {
      ok: 'Branche cr\u00e9\u00e9e.',
      failMissing: 'Il manque -b et le nom. Tape : git checkout -b mi-cambio',
      fail: 'Tape git checkout -b mi-cambio',
    },
    '2.8': {
      ok: 'Fichiers pr\u00eats \u00e0 sauvegarder.',
      failMissing: 'Il manque le point \u00e0 la fin. Tape : git add .',
      fail: 'Tape git add . (avec un point \u00e0 la fin)',
    },
    '2.9': {
      ok: 'Projet clon\u00e9.',
      failMissing: 'Il manque l\u2019URL. Tape : git clone https://github.com/equipo/proyecto.git',
      fail: 'Tape git clone suivi de l\u2019URL',
    },
    '2.10': { ok: 'Flux ma\u00eetris\u00e9.', fail: 'Tape git status' },
  },
} as const;

const content: Record<Locale, Record<string, LessonText>> = {
  es: {
    '2.1': {
      title: 'Qu\u00e9 es Git',
      module: 'Git para Humanos',
      concept: 'Git es un sistema que guarda el historial de cambios de un proyecto. Cada vez que alguien hace un cambio y lo "guarda" en Git, queda registrado para siempre.\n\nEs como un Google Docs pero mucho m\u00e1s potente: puedes ver qui\u00e9n cambi\u00f3 qu\u00e9, cu\u00e1ndo, y por qu\u00e9. Y puedes volver atr\u00e1s a cualquier momento.',
      analogy: 'Imagina que escribes un documento y cada vez que guardas, se crea una foto instant\u00e1nea de TODO el proyecto. Git es esa c\u00e1mara. Puedes volver a ver cualquier foto del pasado.',
      why: 'Todo equipo de tecnolog\u00eda usa Git. Si entiendes Git, puedes ver qu\u00e9 cambi\u00f3, qui\u00e9n lo cambi\u00f3 y por qu\u00e9.',
      task: '',
    },
    '2.2': {
      title: 'Qu\u00e9 es un repositorio',
      module: 'Git para Humanos',
      concept: 'Un repositorio (o "repo") es una carpeta que tiene Git activado. Es la carpeta de tu proyecto + todo su historial de cambios.\n\nCuando alguien te dice "clona el repo", te est\u00e1 diciendo "baja una copia del proyecto con todo su historial".',
      analogy: 'Un repo es como un Google Drive compartido, pero con superpoderes: historial infinito, ramas paralelas, y funciona sin internet.',
      why: 'Todo el c\u00f3digo de tu equipo vive en un repo. Es lo primero que necesitas para empezar a trabajar.',
      task: '',
    },
    '2.3': {
      title: 'git status \u2014 La pregunta m\u00e1s importante',
      module: 'Git para Humanos',
      concept: 'Antes de hacer cualquier cosa en un proyecto, necesitas saber qu\u00e9 est\u00e1 pasando.\n\ngit status te dice:\n\n  - Qu\u00e9 archivos cambiaron\n  - Qu\u00e9 archivos son nuevos\n  - Qu\u00e9 est\u00e1 listo para guardarse\n  - En qu\u00e9 rama est\u00e1s',
      analogy: 'Como el panel de Historial de Versiones en Figma \u2014 te dice qu\u00e9 cambi\u00f3 y cu\u00e1ndo.',
      why: 'SIEMPRE ejecuta git status antes de hacer cualquier cosa. Es la primera pregunta que debes hacerle al proyecto.',
      task: 'Revisa el estado del proyecto',
      hint: 'Escribe git, espacio, status. Luego Enter \u21b5',
      simulateLines: [
        'On branch main',
        'Changes not staged for commit:',
        '  modified:   src/app.tsx',
        '',
        'Untracked files:',
        '  src/components/Header.tsx',
      ],
      simulateDelay: 200,
    },
    '2.4': {
      title: 'git log \u2014 Qu\u00e9 pas\u00f3 antes que yo',
      module: 'Git para Humanos',
      concept: 'Cuando llegas a un proyecto, quieres saber qu\u00e9 pas\u00f3 antes que t\u00fa.\n\ngit log te muestra el historial de cambios. Cada entrada tiene qui\u00e9n hizo el cambio, cu\u00e1ndo, y un mensaje describiendo qu\u00e9 cambi\u00f3.',
      analogy: 'Como la pestaña de Actividad en Notion — ves quién hizo qué, cuándo y por qué.',
      why: 'Cuando llegas a un proyecto, git log te da contexto. Puedes ver qu\u00e9 se hizo recientemente y por qu\u00e9.',
      task: 'Mira el historial de cambios',
      hint: 'Escribe git, espacio, log. Luego Enter \u21b5',
      simulateLines: [
        'a3f2b1c fix: corregir color del boton de login',
        '8d4e5f7 feat: agregar pagina de perfil',
        'c1a9d3e refactor: extraer componente Header',
      ],
      simulateDelay: 200,
    },
    '2.5': {
      title: 'git branch \u2014 En qu\u00e9 universo estoy',
      module: 'Git para Humanos',
      concept: 'Las ramas (branches) son versiones paralelas del proyecto. La rama principal se llama "main".\n\nCuando quieres hacer cambios sin afectar lo que funciona, creas una rama nueva. Es como hacer una copia del documento para experimentar sin miedo.',
      analogy: 'main es el documento oficial. Una rama es una copia donde puedes editar libremente. Si te gusta, lo fusionas. Si no, lo descartas.',
      why: 'Todos en el equipo trabajan en ramas separadas. As\u00ed nadie rompe el c\u00f3digo principal mientras experimenta.',
      task: 'Mira en qué rama estás',
      hint: 'Escribe git, espacio, branch. Luego Enter \u21b5',
      simulateLines: [
        '* main',
        '  feature/nueva-pagina',
        '  fix/color-boton',
      ],
      simulateDelay: 200,
    },
    '2.6': {
      title: 'git diff \u2014 Ver exactamente qu\u00e9 cambi\u00f3',
      module: 'Git para Humanos',
      concept: 'Antes de aprobar cualquier cambio, necesitas ver exactamente qu\u00e9 se modific\u00f3.\n\ngit diff te muestra los cambios exactos en los archivos. L\u00edneas verdes = agregadas. L\u00edneas rojas = quitadas.\n\nNunca apruebes un cambio de un agente de AI sin ver el diff primero. Es tu protecci\u00f3n.\n\nEn un diff: las l\u00edneas con - (rojo) se eliminaron. Las l\u00edneas con + (verde) se agregaron.',
      why: 'El diff es tu escudo. Te muestra exactamente qu\u00e9 se modific\u00f3, l\u00ednea por l\u00ednea. Si algo se ve raro, lo paras.',
      task: 'Mira exactamente qué cambió',
      hint: 'Escribe git, espacio, diff. Luego Enter \u21b5',
      simulateLines: [
        'diff --git a/src/app.tsx b/src/app.tsx',
        '--- a/src/app.tsx',
        '+++ b/src/app.tsx',
        '@@ -12,7 +12,7 @@',
        '-  backgroundColor: "blue",',
        '+  backgroundColor: "red",',
      ],
      simulateDelay: 200,
    },
    '2.7': {
      title: 'Crear una rama nueva',
      module: 'Git para Humanos',
      concept: 'Antes de hacer cambios, crea una rama nueva:\n\n  git checkout -b nombre-de-tu-rama\n\nEl -b significa "branch nueva". El nombre puede ser descriptivo de lo que vas a hacer.',
      why: 'REGLA DE ORO: nunca trabajes directo en main. Siempre crea una rama. Si algo sale mal, main sigue intacto.',
      task: 'Crea una rama nueva para tu cambio',
      hint: 'Escribe git checkout -b seguido del nombre de tu rama (ej: mi-cambio)',
      simulateLines: [
        'Switched to a new branch \'mi-cambio\'',
      ],
      simulateDelay: 200,
    },
    '2.8': {
      title: 'Guardar cambios \u2014 add y commit',
      module: 'Git para Humanos',
      concept: 'En Git, "guardar" se llama "commit". Primero seleccionas qu\u00e9 archivos incluir con git add, luego los guardas con git commit -m "mensaje".\n\n\u00bfPor qu\u00e9 dos pasos? Porque a veces editas 5 archivos pero solo quieres guardar 2. "add" selecciona cu\u00e1les. "commit" los guarda juntos.\n\nCuando git add funciona, no muestra nada. Eso es normal \u2014 silencio = \u00e9xito.',
      analogy: 'git add es poner cosas en una caja. git commit es cerrar la caja y ponerle etiqueta.',
      why: 'Git no guarda autom\u00e1ticamente. T\u00fa decides qu\u00e9 guardar y cu\u00e1ndo, con un mensaje que explique por qu\u00e9.',
      task: 'Prepara todos tus archivos para guardar',
      hint: 'Escribe git, espacio, add, espacio, punto. Luego Enter \u21b5',
      simulateLines: [
        '  $',
      ],
      simulateDelay: 150,
    },
    '2.9': {
      title: 'git clone \u2014 Bajar un proyecto',
      module: 'Git para Humanos',
      concept: 'Cuando necesitas trabajar con un proyecto existente, lo "clonas". git clone baja una copia completa con todo su historial.\n\nTu equipo te da un link del repositorio. T\u00fa lo clonas y listo.',
      why: 'La primera vez que trabajas con el c\u00f3digo de tu equipo, necesitas clonarlo. Es el primer paso.',
      task: 'Descarga una copia del proyecto',
      hint: 'Escribe: git clone https://github.com/equipo/proyecto.git y Enter \u21b5',
      simulateLines: [
        'Cloning into \'proyecto\'...',
        'remote: Enumerating objects: 47, done.',
        'remote: Counting objects: 100% (47/47), done.',
        'remote: Compressing objects: 100% (32/32), done.',
        'Receiving objects: 100% (47/47), 12.34 KiB | 6.17 MiB/s, done.',
        'Resolving deltas: 100% (18/18), done.',
      ],
      simulateDelay: 300,
    },
    '2.10': {
      title: 'El flujo completo de Git',
      module: 'Git para Humanos',
      concept: 'Imagina que acabas de llegar a un proyecto nuevo. Tu lead te dice: "revisa el estado, crea una rama, y prepara tus cambios". Hazlo paso a paso.',
      why: 'Te doy instrucciones, t\u00fa decides qu\u00e9 comando usar.',
      task: 'Haz el flujo completo: status, rama, diff, add, commit y status final',
    },
    '2.11': {
      title: 'Quiz \u2014 Git para Humanos',
      module: 'Git para Humanos',
      concept: 'Vamos a ver cu\u00e1nto aprendiste de Git. 5 preguntas r\u00e1pidas.',
      why: 'Responder preguntas refuerza lo que aprendiste. No te preocupes si fallas alguna \u2014 es parte del proceso.',
      task: 'Usa \u2191\u2193 para moverte y Enter para seleccionar',
    },
  },
  en: {
    '2.1': {
      title: 'What is Git',
      module: 'Git for Humans',
      concept: 'Git is a system that saves the history of changes in a project. Every time someone makes a change and "saves" it in Git, it\u2019s recorded forever.\n\nIt\u2019s like Google Docs but much more powerful: you can see who changed what, when, and why. And you can go back to any point in time.',
      analogy: 'Imagine you write a document and every time you save, a snapshot of the ENTIRE project is created. Git is that camera. You can go back and see any snapshot from the past.',
      why: 'Every tech team uses Git. If you understand Git, you can see what changed, who changed it, and why.',
      task: '',
    },
    '2.2': {
      title: 'What is a repository',
      module: 'Git for Humans',
      concept: 'A repository (or "repo") is a folder with Git enabled. It\u2019s your project folder + its entire history of changes.\n\nWhen someone says "clone the repo", they\u2019re saying "download a copy of the project with all its history".',
      analogy: 'A repo is like a shared Google Drive, but with superpowers: infinite history, parallel branches, and it works offline.',
      why: 'All your team\'s code lives in a repo. It\'s the first thing you need to start working.',
      task: '',
    },
    '2.3': {
      title: 'git status \u2014 The most important question',
      module: 'Git for Humans',
      concept: 'Before doing anything in a project, you need to know what\u2019s happening.\n\ngit status tells you:\n\n  - What files changed\n  - What files are new\n  - What\u2019s ready to be saved\n  - Which branch you\u2019re on',
      analogy: 'Like the Version History panel in Figma \u2014 tells you what changed and when.',
      why: 'ALWAYS run git status before doing anything. It\u2019s the first question you should ask the project.',
      task: 'Check the project status',
      hint: 'Type git, space, status. Then Enter \u21b5',
      simulateLines: [
        'On branch main',
        'Changes not staged for commit:',
        '  modified:   src/app.tsx',
        '',
        'Untracked files:',
        '  src/components/Header.tsx',
      ],
      simulateDelay: 200,
    },
    '2.4': {
      title: 'git log \u2014 What happened before me',
      module: 'Git for Humans',
      concept: 'When you arrive at a project, you want to know what happened before you.\n\ngit log shows you the change history. Each entry has who made the change, when, and a message describing what changed.',
      analogy: 'Like the Activity tab in Notion — see who did what, when, and why.',
      why: 'When you arrive at a project, git log gives you context. You can see what was done recently and why.',
      task: 'Look at the change history',
      hint: 'Type git, space, log. Then Enter \u21b5',
      simulateLines: [
        'a3f2b1c fix: correct login button color',
        '8d4e5f7 feat: add profile page',
        'c1a9d3e refactor: extract Header component',
      ],
      simulateDelay: 200,
    },
    '2.5': {
      title: 'git branch \u2014 Which universe am I in',
      module: 'Git for Humans',
      concept: 'Branches are parallel versions of the project. The main branch is called "main".\n\nWhen you want to make changes without affecting what works, you create a new branch. It\u2019s like making a copy of the document to experiment fearlessly.',
      analogy: 'main is the official document. A branch is a copy where you can edit freely. If you like it, you merge it. If not, you discard it.',
      why: 'Everyone on the team works on separate branches. That way nobody breaks the main code while experimenting.',
      task: 'See which branch you\'re on',
      hint: 'Type git, space, branch. Then Enter \u21b5',
      simulateLines: [
        '* main',
        '  feature/new-page',
        '  fix/button-color',
      ],
      simulateDelay: 200,
    },
    '2.6': {
      title: 'git diff \u2014 See exactly what changed',
      module: 'Git for Humans',
      concept: 'Before approving any change, you need to see exactly what was modified.\n\ngit diff shows you the exact changes in files. Green lines = added. Red lines = removed.\n\nNever approve a change from an AI agent without seeing the diff first. It\u2019s your protection.\n\nIn a diff: lines with - (red) were removed. Lines with + (green) were added.',
      why: 'The diff is your shield. It shows you exactly what was modified, line by line. If something looks off, you stop it.',
      task: 'See exactly what changed',
      hint: 'Type git, space, diff. Then Enter \u21b5',
      simulateLines: [
        'diff --git a/src/app.tsx b/src/app.tsx',
        '--- a/src/app.tsx',
        '+++ b/src/app.tsx',
        '@@ -12,7 +12,7 @@',
        '-  backgroundColor: "blue",',
        '+  backgroundColor: "red",',
      ],
      simulateDelay: 200,
    },
    '2.7': {
      title: 'Create a new branch',
      module: 'Git for Humans',
      concept: 'Before making changes, create a new branch:\n\n  git checkout -b your-branch-name\n\nThe -b means "new branch". The name can describe what you\u2019re going to do.',
      why: 'GOLDEN RULE: never work directly on main. Always create a branch. If something goes wrong, main stays intact.',
      task: 'Create a new branch for your change',
      hint: 'Type git checkout -b followed by your branch name (e.g., mi-cambio)',
      simulateLines: [
        'Switched to a new branch \'mi-cambio\'',
      ],
      simulateDelay: 200,
    },
    '2.8': {
      title: 'Save changes \u2014 add and commit',
      module: 'Git for Humans',
      concept: 'In Git, "save" is called "commit". First you select which files to include with git add, then save them with git commit -m "message".\n\nWhy two steps? Because sometimes you edit 5 files but only want to save 2. "add" selects which. "commit" saves them together.\n\nWhen git add works, it shows nothing. That\'s normal \u2014 silence = success.',
      analogy: 'git add is putting things in a box. git commit is closing the box and labeling it.',
      why: 'Git doesn\'t save automatically. You decide what to save and when, with a message explaining why.',
      task: 'Stage all your files to save',
      hint: 'Type git, space, add, space, dot. Then Enter \u21b5',
      simulateLines: [
        '  $',
      ],
      simulateDelay: 150,
    },
    '2.9': {
      title: 'git clone \u2014 Download a project',
      module: 'Git for Humans',
      concept: 'When you need to work with an existing project, you "clone" it. git clone downloads a complete copy with all its history.\n\nYour team gives you a repository link. You clone it and you\u2019re set.',
      why: 'The first time you work with your team\u2019s code, you need to clone it. It\u2019s the first step.',
      task: 'Download a copy of the project',
      hint: 'Type: git clone https://github.com/equipo/proyecto.git and Enter \u21b5',
      simulateLines: [
        'Cloning into \'proyecto\'...',
        'remote: Enumerating objects: 47, done.',
        'remote: Counting objects: 100% (47/47), done.',
        'remote: Compressing objects: 100% (32/32), done.',
        'Receiving objects: 100% (47/47), 12.34 KiB | 6.17 MiB/s, done.',
        'Resolving deltas: 100% (18/18), done.',
      ],
      simulateDelay: 300,
    },
    '2.10': {
      title: 'The complete Git flow',
      module: 'Git for Humans',
      concept: 'Imagine you just arrived at a new project. Your lead says: "check the status, create a branch, and prepare your changes." Do it step by step.',
      why: 'I\u2019ll give instructions, you decide which command to use.',
      task: 'Do the full flow: status, branch, diff, add, commit, and final status',
    },
    '2.11': {
      title: 'Quiz \u2014 Git for Humans',
      module: 'Git for Humans',
      concept: "Let\u2019s see how much you learned about Git. 5 quick questions.",
      why: "Answering questions reinforces what you learned. Don\u2019t worry if you miss some \u2014 it\u2019s part of the process.",
      task: 'Use \u2191\u2193 to navigate and Enter to select',
    },
  },
  fr: {
    '2.1': {
      title: 'Qu\u2019est-ce que Git',
      module: 'Git pour les Humains',
      concept: 'Git est un syst\u00e8me qui sauvegarde l\u2019historique des changements d\u2019un projet. Chaque fois que quelqu\u2019un fait un changement et le "sauvegarde" dans Git, c\u2019est enregistr\u00e9 pour toujours.\n\nC\u2019est comme Google Docs mais beaucoup plus puissant : tu peux voir qui a chang\u00e9 quoi, quand, et pourquoi. Et tu peux revenir en arri\u00e8re \u00e0 tout moment.',
      analogy: 'Imagine que tu \u00e9cris un document et que chaque fois que tu sauvegardes, une photo instantan\u00e9e de TOUT le projet est cr\u00e9\u00e9e. Git est cet appareil photo. Tu peux revoir n\u2019importe quelle photo du pass\u00e9.',
      why: 'Chaque \u00e9quipe tech utilise Git. Si tu comprends Git, tu peux voir ce qui a chang\u00e9, qui l\'a chang\u00e9 et pourquoi.',
      task: '',
    },
    '2.2': {
      title: 'Qu\u2019est-ce qu\u2019un d\u00e9p\u00f4t',
      module: 'Git pour les Humains',
      concept: 'Un d\u00e9p\u00f4t (ou "repo") est un dossier avec Git activ\u00e9. C\u2019est le dossier de ton projet + tout son historique de changements.\n\nQuand quelqu\u2019un te dit "clone le repo", il te dit "t\u00e9l\u00e9charge une copie du projet avec tout son historique".',
      analogy: 'Un repo c\u2019est comme un Google Drive partag\u00e9, mais avec des superpouvoirs : historique infini, branches parall\u00e8les, et \u00e7a fonctionne hors ligne.',
      why: 'Tout le code de ton \u00e9quipe vit dans un repo. C\'est la premi\u00e8re chose dont tu as besoin pour commencer \u00e0 travailler.',
      task: '',
    },
    '2.3': {
      title: 'git status \u2014 La question la plus importante',
      module: 'Git pour les Humains',
      concept: 'Avant de faire quoi que ce soit dans un projet, tu dois savoir ce qui se passe.\n\ngit status te dit :\n\n  - Quels fichiers ont chang\u00e9\n  - Quels fichiers sont nouveaux\n  - Ce qui est pr\u00eat \u00e0 \u00eatre sauvegard\u00e9\n  - Sur quelle branche tu es',
      analogy: 'Comme le panneau Historique des versions dans Figma \u2014 te dit ce qui a chang\u00e9 et quand.',
      why: 'TOUJOURS ex\u00e9cuter git status avant de faire quoi que ce soit. C\u2019est la premi\u00e8re question que tu dois poser au projet.',
      task: 'Vérifie l\'état du projet',
      hint: 'Tape git, espace, status. Puis Entr\u00e9e \u21b5',
      simulateLines: [
        'On branch main',
        'Changes not staged for commit:',
        '  modified:   src/app.tsx',
        '',
        'Untracked files:',
        '  src/components/Header.tsx',
      ],
      simulateDelay: 200,
    },
    '2.4': {
      title: 'git log \u2014 Ce qui s\u2019est pass\u00e9 avant moi',
      module: 'Git pour les Humains',
      concept: 'Quand tu arrives sur un projet, tu veux savoir ce qui s\u2019est pass\u00e9 avant toi.\n\ngit log te montre l\u2019historique des changements. Chaque entr\u00e9e a qui a fait le changement, quand, et un message d\u00e9crivant ce qui a chang\u00e9.',
      analogy: 'Comme l\u2019onglet Activité dans Notion — tu vois qui a fait quoi, quand et pourquoi.',
      why: 'Quand tu arrives sur un projet, git log te donne du contexte. Tu peux voir ce qui a \u00e9t\u00e9 fait r\u00e9cemment et pourquoi.',
      task: 'Regarde l\'historique des changements',
      hint: 'Tape git, espace, log. Puis Entr\u00e9e \u21b5',
      simulateLines: [
        'a3f2b1c fix: corriger la couleur du bouton de login',
        '8d4e5f7 feat: ajouter la page de profil',
        'c1a9d3e refactor: extraire le composant Header',
      ],
      simulateDelay: 200,
    },
    '2.5': {
      title: 'git branch \u2014 Dans quel univers suis-je',
      module: 'Git pour les Humains',
      concept: 'Les branches sont des versions parall\u00e8les du projet. La branche principale s\u2019appelle "main".\n\nQuand tu veux faire des changements sans affecter ce qui fonctionne, tu cr\u00e9es une nouvelle branche. C\u2019est comme faire une copie du document pour exp\u00e9rimenter sans peur.',
      analogy: 'main est le document officiel. Une branche est une copie o\u00f9 tu peux \u00e9diter librement. Si \u00e7a te pla\u00eet, tu fusionne. Sinon, tu jettes.',
      why: 'Tout le monde dans l\'\u00e9quipe travaille sur des branches s\u00e9par\u00e9es. Comme \u00e7a personne ne casse le code principal en exp\u00e9rimentant.',
      task: 'Regarde sur quelle branche tu es',
      hint: 'Tape git, espace, branch. Puis Entr\u00e9e \u21b5',
      simulateLines: [
        '* main',
        '  feature/nouvelle-page',
        '  fix/couleur-bouton',
      ],
      simulateDelay: 200,
    },
    '2.6': {
      title: 'git diff \u2014 Voir exactement ce qui a chang\u00e9',
      module: 'Git pour les Humains',
      concept: 'Avant d\u2019approuver un changement, tu dois voir exactement ce qui a \u00e9t\u00e9 modifi\u00e9.\n\ngit diff te montre les changements exacts dans les fichiers. Lignes vertes = ajout\u00e9es. Lignes rouges = supprim\u00e9es.\n\nN\u2019approuve jamais un changement d\u2019un agent IA sans voir le diff d\u2019abord. C\u2019est ta protection.\n\nDans un diff : les lignes avec - (rouge) ont \u00e9t\u00e9 supprim\u00e9es. Les lignes avec + (vert) ont \u00e9t\u00e9 ajout\u00e9es.',
      why: 'Le diff est ton bouclier. Il te montre exactement ce qui a \u00e9t\u00e9 modifi\u00e9, ligne par ligne. Si quelque chose semble bizarre, tu arr\u00eates.',
      task: 'Regarde exactement ce qui a changé',
      hint: 'Tape git, espace, diff. Puis Entr\u00e9e \u21b5',
      simulateLines: [
        'diff --git a/src/app.tsx b/src/app.tsx',
        '--- a/src/app.tsx',
        '+++ b/src/app.tsx',
        '@@ -12,7 +12,7 @@',
        '-  backgroundColor: "blue",',
        '+  backgroundColor: "red",',
      ],
      simulateDelay: 200,
    },
    '2.7': {
      title: 'Cr\u00e9er une nouvelle branche',
      module: 'Git pour les Humains',
      concept: 'Avant de faire des changements, cr\u00e9e une nouvelle branche :\n\n  git checkout -b nom-de-ta-branche\n\nLe -b signifie "nouvelle branche". Le nom peut d\u00e9crire ce que tu vas faire.',
      why: 'R\u00c8GLE D\u2019OR : ne travaille jamais directement sur main. Cr\u00e9e toujours une branche. Si quelque chose tourne mal, main reste intact.',
      task: 'Crée une nouvelle branche pour ton changement',
      hint: 'Tape git checkout -b suivi du nom de ta branche (ex : mi-cambio)',
      simulateLines: [
        'Switched to a new branch \'mi-cambio\'',
      ],
      simulateDelay: 200,
    },
    '2.8': {
      title: 'Sauvegarder les changements \u2014 add et commit',
      module: 'Git pour les Humains',
      concept: 'En Git, "sauvegarder" s\u2019appelle "commit". D\u2019abord tu s\u00e9lectionnes les fichiers avec git add, puis tu les sauvegardes avec git commit -m "message".\n\nPourquoi deux \u00e9tapes ? Parce que parfois tu modifies 5 fichiers mais tu veux n\u2019en sauvegarder que 2. "add" s\u00e9lectionne lesquels. "commit" les sauvegarde ensemble.\n\nQuand git add fonctionne, il n\'affiche rien. C\'est normal \u2014 silence = succ\u00e8s.',
      analogy: 'git add c\u2019est mettre des choses dans une bo\u00eete. git commit c\u2019est fermer la bo\u00eete et mettre une \u00e9tiquette.',
      why: 'Git ne sauvegarde pas automatiquement. Tu d\u00e9cides quoi sauvegarder et quand, avec un message expliquant pourquoi.',
      task: 'Prépare tous tes fichiers pour sauvegarder',
      hint: 'Tape git, espace, add, espace, point. Puis Entr\u00e9e \u21b5',
      simulateLines: [
        '  $',
      ],
      simulateDelay: 150,
    },
    '2.9': {
      title: 'git clone \u2014 T\u00e9l\u00e9charger un projet',
      module: 'Git pour les Humains',
      concept: 'Quand tu as besoin de travailler avec un projet existant, tu le "clones". git clone t\u00e9l\u00e9charge une copie compl\u00e8te avec tout son historique.\n\nTon \u00e9quipe te donne un lien du d\u00e9p\u00f4t. Tu le clones et c\u2019est parti.',
      why: 'La premi\u00e8re fois que tu travailles avec le code de ton \u00e9quipe, tu dois le cloner. C\u2019est la premi\u00e8re \u00e9tape.',
      task: 'Télécharge une copie du projet',
      hint: 'Tape : git clone https://github.com/equipo/proyecto.git et Entr\u00e9e \u21b5',
      simulateLines: [
        'Cloning into \'proyecto\'...',
        'remote: Enumerating objects: 47, done.',
        'remote: Counting objects: 100% (47/47), done.',
        'remote: Compressing objects: 100% (32/32), done.',
        'Receiving objects: 100% (47/47), 12.34 KiB | 6.17 MiB/s, done.',
        'Resolving deltas: 100% (18/18), done.',
      ],
      simulateDelay: 300,
    },
    '2.10': {
      title: 'Le flux complet de Git',
      module: 'Git pour les Humains',
      concept: 'Imagine que tu viens d\'arriver sur un nouveau projet. Ton lead te dit : "vérifie l\'état, crée une branche et prépare tes changements." Fais-le étape par étape.',
      why: 'Je te donne les instructions, tu d\u00e9cides quelle commande utiliser.',
      task: 'Fais le flux complet : status, branche, diff, add, commit et status final',
    },
    '2.11': {
      title: 'Quiz \u2014 Git pour les Humains',
      module: 'Git pour les Humains',
      concept: 'Voyons combien tu as appris sur Git. 5 questions rapides.',
      why: "R\u00e9pondre \u00e0 des questions renforce ce que tu as appris. Ne t\u2019inqui\u00e8te pas si tu en rates \u2014 \u00e7a fait partie du processus.",
      task: 'Utilise \u2191\u2193 pour naviguer et Entr\u00e9e pour s\u00e9lectionner',
    },
  },
};

import { type CommandStep } from '../../components/MultiCommandPrompt.js';

interface QuizQuestionData {
  question: string;
  options: string[];
  correct: number;
  explanation: string;
}

const quizModule2: Record<Locale, QuizQuestionData[]> = {
  es: [
    { question: '\u00bfCu\u00e1l es el PRIMER comando que debes ejecutar al llegar a un proyecto?', options: ['git log', 'git diff', 'git status', 'git branch'], correct: 2, explanation: 'git status te dice el estado actual. Siempre primero.' },
    { question: '\u00bfQu\u00e9 muestra git diff?', options: ['Los archivos nuevos', 'Las diferencias exactas en el c\u00f3digo', 'El historial de commits', 'Las ramas del proyecto'], correct: 1, explanation: 'git diff muestra l\u00ednea por l\u00ednea qu\u00e9 cambi\u00f3.' },
    { question: '\u00bfPor qu\u00e9 NUNCA debes trabajar directo en main?', options: ['Es m\u00e1s lento', 'Puede romper lo que funciona', 'No se puede', 'Es ilegal'], correct: 1, explanation: 'main es la versi\u00f3n estable. Siempre crea una rama para tus cambios.' },
    { question: '\u00bfQu\u00e9 hace git add .?', options: ['Borra todos los archivos', 'Selecciona todos los archivos para guardar', 'Crea una rama nueva', 'Sube los cambios al servidor'], correct: 1, explanation: 'git add . selecciona TODO para el pr\u00f3ximo commit.' },
    { question: '\u00bfQu\u00e9 es un commit?', options: ['Un archivo nuevo', 'Una copia del proyecto guardada con mensaje', 'Un comando para borrar', 'Una rama paralela'], correct: 1, explanation: 'Un commit es una foto del proyecto en un momento espec\u00edfico, con una descripci\u00f3n.' },
  ],
  en: [
    { question: 'What is the FIRST command you should run when arriving at a project?', options: ['git log', 'git diff', 'git status', 'git branch'], correct: 2, explanation: 'git status tells you the current state. Always first.' },
    { question: 'What does git diff show?', options: ['New files', 'The exact differences in the code', 'The commit history', 'The project branches'], correct: 1, explanation: 'git diff shows line by line what changed.' },
    { question: 'Why should you NEVER work directly on main?', options: ['It is slower', 'It can break what works', 'You cannot', 'It is illegal'], correct: 1, explanation: 'main is the stable version. Always create a branch for your changes.' },
    { question: 'What does git add . do?', options: ['Deletes all files', 'Stages all files for saving', 'Creates a new branch', 'Pushes changes to the server'], correct: 1, explanation: 'git add . stages EVERYTHING for the next commit.' },
    { question: 'What is a commit?', options: ['A new file', 'A saved snapshot of the project with a message', 'A delete command', 'A parallel branch'], correct: 1, explanation: 'A commit is a snapshot of the project at a specific moment, with a description.' },
  ],
  fr: [
    { question: 'Quelle est la PREMI\u00c8RE commande \u00e0 ex\u00e9cuter en arrivant sur un projet ?', options: ['git log', 'git diff', 'git status', 'git branch'], correct: 2, explanation: 'git status te dit l\u2019\u00e9tat actuel. Toujours en premier.' },
    { question: 'Que montre git diff ?', options: ['Les fichiers nouveaux', 'Les diff\u00e9rences exactes dans le code', 'L\u2019historique des commits', 'Les branches du projet'], correct: 1, explanation: 'git diff montre ligne par ligne ce qui a chang\u00e9.' },
    { question: 'Pourquoi ne faut-il JAMAIS travailler directement sur main ?', options: ['C\u2019est plus lent', '\u00c7a peut casser ce qui fonctionne', 'On ne peut pas', 'C\u2019est ill\u00e9gal'], correct: 1, explanation: 'main est la version stable. Cr\u00e9e toujours une branche pour tes changements.' },
    { question: 'Que fait git add . ?', options: ['Supprime tous les fichiers', 'S\u00e9lectionne tous les fichiers \u00e0 sauvegarder', 'Cr\u00e9e une nouvelle branche', 'Envoie les changements au serveur'], correct: 1, explanation: 'git add . s\u00e9lectionne TOUT pour le prochain commit.' },
    { question: 'Qu\u2019est-ce qu\u2019un commit ?', options: ['Un nouveau fichier', 'Une copie du projet sauvegard\u00e9e avec un message', 'Une commande pour supprimer', 'Une branche parall\u00e8le'], correct: 1, explanation: 'Un commit est une photo du projet \u00e0 un moment pr\u00e9cis, avec une description.' },
  ],
};

const practiceModule2: Record<Locale, CommandStep[]> = {
  es: [
    { challenge: 'Revisa el estado actual del proyecto', command: 'git status', output: ['On branch main', 'nothing to commit, working tree clean'], hint1: 'Es el comando más importante de git...', hint2: 'El comando es git status' },
    { challenge: 'Crea una rama nueva llamada mi-feature', command: 'git checkout -b mi-feature', output: ["Switched to a new branch 'mi-feature'"], hint1: 'Necesitas checkout con -b y el nombre...', hint2: 'El comando es git checkout -b mi-feature' },
    { challenge: 'Revisa qué cambió en los archivos', command: 'git diff', output: ['diff --git a/src/app.tsx b/src/app.tsx', '--- a/src/app.tsx', '+++ b/src/app.tsx', '-  color: "blue"', '+  color: "red"'], hint1: 'El comando que muestra diferencias...', hint2: 'El comando es git diff' },
    { challenge: 'Selecciona todos los archivos para guardar', command: 'git add .', output: [], hint1: 'El comando para agregar + un punto (todo)...', hint2: 'El comando es git add .' },
    { challenge: 'Guarda los cambios con un mensaje', command: 'git commit -m "change button color"', acceptPattern: 'git commit -m .+', output: ['[mi-feature abc1234] change button color', ' 1 file changed, 1 insertion(+), 1 deletion(-)'], hint1: 'git commit -m seguido de un mensaje entre comillas "..."', hint2: 'El comando es git commit -m "change button color"' },
    { challenge: 'Revisa el estado una última vez', command: 'git status', output: ['On branch mi-feature', 'nothing to commit, working tree clean'], hint1: 'El mismo comando de siempre...', hint2: 'El comando es git status' },
  ],
  en: [
    { challenge: 'Check the current state of the project', command: 'git status', output: ['On branch main', 'nothing to commit, working tree clean'], hint1: "It's the most important git command...", hint2: 'The command is git status' },
    { challenge: 'Create a new branch called mi-feature', command: 'git checkout -b mi-feature', output: ["Switched to a new branch 'mi-feature'"], hint1: 'You need checkout with -b and the name...', hint2: 'The command is git checkout -b mi-feature' },
    { challenge: 'See what changed in the files', command: 'git diff', output: ['diff --git a/src/app.tsx b/src/app.tsx', '--- a/src/app.tsx', '+++ b/src/app.tsx', '-  color: "blue"', '+  color: "red"'], hint1: 'The command that shows differences...', hint2: 'The command is git diff' },
    { challenge: 'Stage all files for saving', command: 'git add .', output: [], hint1: 'The add command + a dot (everything)...', hint2: 'The command is git add .' },
    { challenge: 'Save the changes with a message', command: 'git commit -m "change button color"', acceptPattern: 'git commit -m .+', output: ['[mi-feature abc1234] change button color', ' 1 file changed, 1 insertion(+), 1 deletion(-)'], hint1: 'git commit -m followed by a message in "quotes"', hint2: 'The command is git commit -m "change button color"' },
    { challenge: 'Check the status one last time', command: 'git status', output: ['On branch mi-feature', 'nothing to commit, working tree clean'], hint1: 'Same command as always...', hint2: 'The command is git status' },
  ],
  fr: [
    { challenge: "Vérifie l'état actuel du projet", command: 'git status', output: ['On branch main', 'nothing to commit, working tree clean'], hint1: "C'est la commande git la plus importante...", hint2: 'La commande est git status' },
    { challenge: 'Crée une nouvelle branche appelée mi-feature', command: 'git checkout -b mi-feature', output: ["Switched to a new branch 'mi-feature'"], hint1: 'Tu as besoin de checkout avec -b et le nom...', hint2: 'La commande est git checkout -b mi-feature' },
    { challenge: 'Regarde ce qui a changé dans les fichiers', command: 'git diff', output: ['diff --git a/src/app.tsx b/src/app.tsx', '--- a/src/app.tsx', '+++ b/src/app.tsx', '-  color: "blue"', '+  color: "red"'], hint1: 'La commande qui montre les différences...', hint2: 'La commande est git diff' },
    { challenge: 'Sélectionne tous les fichiers à sauvegarder', command: 'git add .', output: [], hint1: 'La commande pour ajouter + un point (tout)...', hint2: 'La commande est git add .' },
    { challenge: 'Sauvegarde les changements avec un message', command: 'git commit -m "change button color"', acceptPattern: 'git commit -m .+', output: ['[mi-feature abc1234] change button color', ' 1 file changed, 1 insertion(+), 1 deletion(-)'], hint1: 'git commit -m suivi d\'un message entre guillemets "..."', hint2: 'La commande est git commit -m "change button color"' },
    { challenge: "Vérifie l'état une dernière fois", command: 'git status', output: ['On branch mi-feature', 'nothing to commit, working tree clean'], hint1: 'La même commande que toujours...', hint2: 'La commande est git status' },
  ],
};

function buildSimulate(c: LessonText) {
  if (!c.simulateLines) return undefined;
  return { lines: c.simulateLines, delay: c.simulateDelay };
}

export function getModule2Lessons(locale: Locale): Lesson[] {
  const c = content[locale];
  const m = msg[locale];

  return [
    {
      id: '2.1',
      ...c['2.1']!,
      validate: () => ({ valid: true, message: '' }),
    },
    {
      id: '2.2',
      ...c['2.2']!,
      validate: () => ({ valid: true, message: '' }),
    },
    {
      id: '2.3',
      ...c['2.3']!,
      prompt: '~/mi-app $',
      command: 'git status',
      validate: (input: string) => {
        const t = input.trim().toLowerCase();
        if (t === 'git status') return { valid: true, message: m['2.3'].ok };
        if (t === 'gitstatus') return { valid: false, message: (m['2.3'] as any).failNoSpace };
        if (t === 'status') return { valid: false, message: (m['2.3'] as any).failMissing };
        return { valid: false, message: m['2.3'].fail };
      },
      simulate: buildSimulate(c['2.3']!),
    },
    {
      id: '2.4',
      ...c['2.4']!,
      prompt: '~/mi-app $',
      command: 'git log',
      validate: (input: string) => {
        const t = input.trim().toLowerCase();
        if (t === 'git log') return { valid: true, message: m['2.4'].ok };
        return { valid: false, message: m['2.4'].fail };
      },
      simulate: buildSimulate(c['2.4']!),
    },
    {
      id: '2.5',
      ...c['2.5']!,
      prompt: '~/mi-app $',
      command: 'git branch',
      validate: (input: string) => {
        const t = input.trim().toLowerCase();
        if (t === 'git branch') return { valid: true, message: m['2.5'].ok };
        return { valid: false, message: m['2.5'].fail };
      },
      simulate: buildSimulate(c['2.5']!),
    },
    {
      id: '2.6',
      ...c['2.6']!,
      prompt: '~/mi-app $',
      command: 'git diff',
      validate: (input: string) => {
        const t = input.trim().toLowerCase();
        if (t === 'git diff') return { valid: true, message: m['2.6'].ok };
        return { valid: false, message: m['2.6'].fail };
      },
      simulate: buildSimulate(c['2.6']!),
    },
    {
      id: '2.7',
      ...c['2.7']!,
      prompt: '~/mi-app $',
      command: 'git checkout -b mi-cambio',
      validate: (input: string) => {
        const t = input.trim().toLowerCase();
        if (t === 'git checkout -b mi-cambio') return { valid: true, message: m['2.7'].ok };
        if (t.startsWith('git checkout -b ') && t.length > 16) return { valid: true, message: m['2.7'].ok };
        if (t === 'git checkout') return { valid: false, message: (m['2.7'] as any).failMissing };
        return { valid: false, message: m['2.7'].fail };
      },
      simulate: buildSimulate(c['2.7']!),
    },
    {
      id: '2.8',
      ...c['2.8']!,
      prompt: '~/mi-app $',
      validate: () => ({ valid: true, message: m['2.8'].ok }),
      practiceSteps: [
        {
          challenge: locale === 'es' ? 'Selecciona todos los archivos para guardar'
            : locale === 'fr' ? 'Sélectionne tous les fichiers à sauvegarder'
            : 'Select all files to save',
          command: 'git add .',
          output: [],
          hint1: locale === 'es' ? 'git add + algo que signifique "todo"...'
            : locale === 'fr' ? 'git add + quelque chose qui signifie "tout"...'
            : 'git add + something that means "everything"...',
          hint2: locale === 'es' ? 'El comando es git add .'
            : locale === 'fr' ? 'La commande est git add .'
            : 'The command is git add .',
        },
        {
          challenge: locale === 'es' ? 'Ahora guarda con un mensaje que diga qué cambiaste'
            : locale === 'fr' ? 'Maintenant sauvegarde avec un message décrivant ce que tu as changé'
            : 'Now save with a message describing what you changed',
          command: 'git commit -m "update styles"',
          acceptPattern: 'git commit -m .+',
          output: locale === 'es'
            ? ['[mi-cambio abc1234] update styles', ' 1 file changed, 2 insertions(+)']
            : locale === 'fr'
              ? ['[mon-changement abc1234] update styles', ' 1 file changed, 2 insertions(+)']
              : ['[my-change abc1234] update styles', ' 1 file changed, 2 insertions(+)'],
          hint1: locale === 'es' ? 'git commit -m seguido de tu mensaje entre comillas "..."'
            : locale === 'fr' ? 'git commit -m suivi de ton message entre guillemets "..."'
            : 'git commit -m followed by your message in "quotes"',
          hint2: locale === 'es' ? 'El comando es git commit -m "update styles"'
            : locale === 'fr' ? 'La commande est git commit -m "update styles"'
            : 'The command is git commit -m "update styles"',
        },
      ],
    },
    {
      id: '2.9',
      ...c['2.9']!,
      prompt: '~/mi-app $',
      command: 'git clone https://github.com/equipo/proyecto.git',
      validate: (input: string) => {
        const t = input.trim().toLowerCase();
        if (t.startsWith('git clone ') && t.length > 11) return { valid: true, message: m['2.9'].ok };
        if (t === 'git clone') return { valid: false, message: (m['2.9'] as any).failMissing };
        return { valid: false, message: m['2.9'].fail };
      },
      simulate: buildSimulate(c['2.9']!),
    },
    {
      id: '2.10',
      ...c['2.10']!,
      prompt: '~/mi-app $',
      validate: () => ({ valid: true, message: m['2.10'].ok }),
      practiceSteps: practiceModule2[locale],
    },
    {
      id: '2.11',
      ...c['2.11']!,
      validate: () => ({ valid: true, message: '' }),
      quizQuestions: quizModule2[locale],
    },
  ];
}
