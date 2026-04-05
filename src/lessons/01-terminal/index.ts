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

// Validation messages per locale
const msg = {
  es: {
    '1.1': { ok: 'Acabas de dar tu primer comando.', fail: 'Escribe hola (solo esas cuatro letras)' },
    '1.2': { ok: 'Ya sabes ver d\u00f3nde est\u00e1s.', fail: 'Escribe pwd y presiona Enter' },
    '1.3': { ok: 'Ahora puedes ver qu\u00e9 hay en cualquier carpeta.', fail: 'Escribe ls y presiona Enter' },
    '1.4': {
      ok: 'Ahora est\u00e1s dentro de la carpeta src.',
      failMissing: 'Falta decirle A D\u00d3NDE ir. Escribe: cd src',
      failNoSpace: 'Necesitas un espacio entre cd y src',
      fail: 'Escribe cd src (con espacio entre cd y src)',
    },
    '1.5': {
      ok: 'Volviste a la carpeta anterior.',
      failNoSpace: 'Necesitas un espacio entre cd y los puntos. Escribe: cd ..',
      fail: 'Escribe cd .. (cd, espacio, dos puntos)',
    },
    '1.6': { ok: 'Pantalla limpia.', fail: 'Escribe clear y presiona Enter' },
    '1.7': {
      ok: 'Ahora puedes leer cualquier archivo.',
      failMissing: 'Falta decirle QU\u00c9 archivo leer. Escribe: cat README.md',
      fail: 'Escribe cat README.md (con espacio entre cat y el nombre del archivo)',
    },
    '1.8': {
      ok: 'Carpeta creada.',
      failMissing: 'Falta el nombre de la carpeta. Escribe: mkdir docs',
      fail: 'Escribe mkdir docs (con espacio entre mkdir y docs)',
    },
    '1.9': {
      ok: 'Ahora sabes verificar instalaciones.',
      failMissing: 'Falta decirle QU\u00c9 buscar. Escribe: which node',
      fail: 'Escribe which node (con espacio)',
    },
    '1.10': { ok: 'Flujo completado.', fail: 'Escribe pwd para empezar la exploraci\u00f3n' },
    '1.11': { ok: 'Completaste el M\u00f3dulo 1.' },
  },
  en: {
    '1.1': { ok: 'You just gave your first command.', fail: 'Type hola (just those four letters)' },
    '1.2': { ok: 'Now you know how to see where you are.', fail: 'Type pwd and press Enter' },
    '1.3': { ok: 'Now you can see what\u2019s in any folder.', fail: 'Type ls and press Enter' },
    '1.4': {
      ok: 'You\u2019re now inside the src folder.',
      failMissing: 'You need to say WHERE to go. Type: cd src',
      failNoSpace: 'You need a space between cd and src',
      fail: 'Type cd src (with a space between cd and src)',
    },
    '1.5': {
      ok: 'You went back to the previous folder.',
      failNoSpace: 'You need a space between cd and the dots. Type: cd ..',
      fail: 'Type cd .. (cd, space, two dots)',
    },
    '1.6': { ok: 'Screen cleared.', fail: 'Type clear and press Enter' },
    '1.7': {
      ok: 'Now you can read any file.',
      failMissing: 'You need to say WHICH file to read. Type: cat README.md',
      fail: 'Type cat README.md (with a space between cat and the file name)',
    },
    '1.8': {
      ok: 'Folder created.',
      failMissing: 'Missing the folder name. Type: mkdir docs',
      fail: 'Type mkdir docs (with a space between mkdir and docs)',
    },
    '1.9': {
      ok: 'Now you know how to check installations.',
      failMissing: 'You need to say WHAT to look for. Type: which node',
      fail: 'Type which node (with a space)',
    },
    '1.10': { ok: 'Flow completed.', fail: 'Type pwd to start exploring' },
    '1.11': { ok: 'You completed Module 1.' },
  },
  fr: {
    '1.1': { ok: 'Tu viens de donner ta premi\u00e8re commande.', fail: 'Tape hola (juste ces quatre lettres)' },
    '1.2': { ok: 'Maintenant tu sais voir o\u00f9 tu es.', fail: 'Tape pwd et appuie sur Entr\u00e9e' },
    '1.3': { ok: 'Maintenant tu peux voir ce qu\u2019il y a dans n\u2019importe quel dossier.', fail: 'Tape ls et appuie sur Entr\u00e9e' },
    '1.4': {
      ok: 'Tu es maintenant dans le dossier src.',
      failMissing: 'Il faut dire O\u00d9 aller. Tape : cd src',
      failNoSpace: 'Il faut un espace entre cd et src',
      fail: 'Tape cd src (avec un espace entre cd et src)',
    },
    '1.5': {
      ok: 'Tu es revenu au dossier pr\u00e9c\u00e9dent.',
      failNoSpace: 'Il faut un espace entre cd et les points. Tape : cd ..',
      fail: 'Tape cd .. (cd, espace, deux points)',
    },
    '1.6': { ok: '\u00c9cran nettoy\u00e9.', fail: 'Tape clear et appuie sur Entr\u00e9e' },
    '1.7': {
      ok: 'Maintenant tu peux lire n\u2019importe quel fichier.',
      failMissing: 'Il faut dire QUEL fichier lire. Tape : cat README.md',
      fail: 'Tape cat README.md (avec un espace entre cat et le nom du fichier)',
    },
    '1.8': {
      ok: 'Dossier cr\u00e9\u00e9.',
      failMissing: 'Il manque le nom du dossier. Tape : mkdir docs',
      fail: 'Tape mkdir docs (avec un espace entre mkdir et docs)',
    },
    '1.9': {
      ok: 'Maintenant tu sais v\u00e9rifier les installations.',
      failMissing: 'Il faut dire QUOI chercher. Tape : which node',
      fail: 'Tape which node (avec un espace)',
    },
    '1.10': { ok: 'Flux termin\u00e9.', fail: 'Tape pwd pour commencer l\u2019exploration' },
    '1.11': { ok: 'Tu as termin\u00e9 le Module 1.' },
  },
} as const;

const content: Record<Locale, Record<string, LessonText>> = {
  es: {
    '1.1': {
      title: 'Tu primera vez en la terminal',
      module: 'La Terminal Sin Miedo',
      concept: 'Est\u00e1s dentro de la terminal ahora mismo. Este curso ES una terminal.\n\nYa lo lograste \u2014 ya est\u00e1s aqu\u00ed. Lo que ves es texto, y t\u00fa le respondes con texto. No hay botones, no hay men\u00fas.',
      analogy: 'Es como un chat de WhatsApp con tu computadora. T\u00fa escribes, ella responde.',
      why: 'El primer paso es perderle el miedo. Y adivina qu\u00e9: ya lo est\u00e1s usando.',
      task: 'Escribe hola y presiona Enter',
      hint: 'Escribe la palabra hola y presiona la tecla Enter \u21b5',
      simulateLines: [
        'hola!',
      ],
      simulateDelay: 150,
    },
    '1.2': {
      title: 'pwd \u2014 D\u00f3nde estoy',
      module: 'La Terminal Sin Miedo',
      concept: 'Tu computadora tiene carpetas dentro de carpetas. Cuando abres la terminal, est\u00e1s "parado" dentro de una.\n\nEl comando pwd te dice en cu\u00e1l est\u00e1s. Tres letras y ya sabes tu ubicaci\u00f3n.',
      analogy: 'Es como el "Usted est\u00e1 aqu\u00ed" del mapa de un centro comercial.',
      why: 'Si est\u00e1s en la carpeta equivocada, los agentes de AI editar\u00e1n archivos equivocados. Siempre revisa d\u00f3nde est\u00e1s.',
      task: 'Escribe pwd y presiona Enter',
      hint: 'Tres letras juntas: p, w, d y luego Enter \u21b5',
      simulateLines: [
        '/Users/tu-nombre/proyectos/mi-app',
      ],
      simulateDelay: 150,
    },
    '1.3': {
      title: 'ls \u2014 Qu\u00e9 hay aqu\u00ed',
      module: 'La Terminal Sin Miedo',
      concept: 'Ya sabes d\u00f3nde est\u00e1s. Ahora necesitas ver qu\u00e9 hay en esa carpeta.\n\nEl comando ls te muestra todo lo que hay donde est\u00e1s parado.',
      analogy: 'Si pwd es "d\u00f3nde estoy", ls es "qu\u00e9 hay aqu\u00ed". Como encender la luz de un cuarto.',
      why: 'Antes de pedirle algo a un agente de AI, necesitas saber qu\u00e9 archivos existen. No puedes editar algo que no ves.',
      task: 'Escribe ls y presiona Enter',
      hint: 'Dos letras: l (ele) y s (ese), juntas. Luego Enter \u21b5',
      simulateLines: [
        'README.md     package.json  src/          public/',
      ],
      simulateDelay: 150,
    },
    '1.4': {
      title: 'cd \u2014 Moverse entre carpetas',
      module: 'La Terminal Sin Miedo',
      concept: 'Ya sabes d\u00f3nde est\u00e1s y qu\u00e9 hay. Ahora necesitas moverte.\n\nEl comando cd te lleva a otra carpeta. Escribes cd seguido del nombre de la carpeta.',
      analogy: 'Es como caminar por un pasillo de oficinas. cd src es entrar a la oficina que dice "src". cd .. es salir y volver al pasillo.',
      why: 'Los proyectos tienen archivos en carpetas. Necesitas moverte entre ellas para encontrar lo que buscas.',
      task: 'Escribe cd src (con un espacio en medio)',
      hint: 'Escribe cd, luego un espacio, luego src. Luego Enter \u21b5',
      simulateLines: [
        '~/proyectos/mi-app/src $',
      ],
      simulateDelay: 150,
    },
    '1.5': {
      title: 'cd .. \u2014 Volver atr\u00e1s',
      module: 'La Terminal Sin Miedo',
      concept: 'Acabas de entrar a src. Ahora vuelve a salir.\n\ncd .. te lleva a la carpeta de arriba. Los dos puntos (..) siempre significan "un nivel arriba".',
      why: 'Te vas a mover mucho entre carpetas. Saber volver atr\u00e1s es tan importante como saber avanzar.',
      task: 'Escribe cd .. (cd, espacio, punto, punto)',
      hint: 'Escribe cd luego espacio luego dos puntos seguidos (..) y Enter \u21b5',
      simulateLines: [
        '~/proyectos/mi-app $',
      ],
      simulateDelay: 150,
    },
    '1.6': {
      title: 'clear \u2014 Limpiar la pantalla',
      module: 'La Terminal Sin Miedo',
      concept: 'A veces la terminal se llena de texto y se vuelve dif\u00edcil de leer.\n\nEl comando clear limpia todo y te deja una pantalla nueva. No borra nada de verdad \u2014 solo limpia lo que ves.',
      why: 'Cuando est\u00e9s usando agentes de AI, la pantalla se va a llenar r\u00e1pido. clear es tu mejor amigo para mantener la calma.',
      task: 'Escribe clear y presiona Enter',
      hint: 'Cinco letras: c, l, e, a, r. Luego Enter \u21b5',
      simulateLines: [
        '',
        '',
        '  ~ $',
      ],
      simulateDelay: 150,
    },
    '1.7': {
      title: 'cat \u2014 Leer un archivo',
      module: 'La Terminal Sin Miedo',
      concept: 'Ya sabes ver qu\u00e9 archivos hay con ls. Ahora necesitas ver qu\u00e9 dice un archivo por dentro.\n\nEl comando cat seguido del nombre del archivo te muestra su contenido. cat README.md te muestra lo que dice el README.',
      analogy: 'ls es ver los t\u00edtulos de los libros en un estante. cat es abrir un libro y leerlo.',
      why: 'Cuando un agente de AI haga un cambio, vas a querer ver el archivo para asegurarte de que est\u00e1 bien. cat te deja ver sin abrir ning\u00fan otro programa.',
      task: 'Escribe cat README.md',
      hint: 'Escribe cat, espacio, README.md (tal cual, con may\u00fasculas). Luego Enter \u21b5',
      simulateLines: [
        '# Mi App',
        '',
        'Una aplicacion para gestionar tareas.',
        '',
        '## Instalacion',
        '```',
        'npm install',
        '```',
      ],
      simulateDelay: 100,
    },
    '1.8': {
      title: 'mkdir \u2014 Crear una carpeta',
      module: 'La Terminal Sin Miedo',
      concept: 'A veces necesitas crear una carpeta nueva. mkdir (make directory) crea una carpeta con el nombre que le des.\n\nmkdir docs crea una carpeta que se llama "docs".',
      why: 'Cuando trabajes con agentes de AI y tu equipo, van a necesitar organizar archivos en carpetas nuevas. Esto es algo que har\u00e1s seguido.',
      task: 'Escribe mkdir docs',
      hint: 'Escribe mkdir, espacio, docs. Luego Enter \u21b5',
      simulateLines: [
        '  $',
      ],
      simulateDelay: 150,
    },
    '1.9': {
      title: 'which \u2014 Revisar si algo est\u00e1 instalado',
      module: 'La Terminal Sin Miedo',
      concept: 'Antes de usar una herramienta (como un agente de AI, Node, o Git), necesitas saber si est\u00e1 instalada.\n\nEl comando which te dice d\u00f3nde est\u00e1 instalado algo. Si no aparece nada, es que no est\u00e1 instalado.',
      why: 'Antes de usar cualquier herramienta, necesitas saber si est\u00e1 instalada en tu computadora.',
      task: 'Escribe which node',
      hint: 'Escribe which, espacio, node. Luego Enter \u21b5',
      simulateLines: [
        '/usr/local/bin/node',
      ],
      simulateDelay: 150,
    },
    '1.10': {
      title: 'Pr\u00e1ctica \u2014 Combinar comandos',
      module: 'La Terminal Sin Miedo',
      concept: 'Acabas de llegar a un proyecto nuevo. Explora usando lo que aprendiste.',
      why: 'Te voy a dar instrucciones y t\u00fa decides qu\u00e9 comando usar.',
      task: '',
    },
    '1.11': {
      title: 'Ya no le tienes miedo',
      module: 'La Terminal Sin Miedo',
      concept: 'Ya dominas los comandos esenciales de la terminal:\n\n  pwd     \u2014 d\u00f3nde estoy\n  ls      \u2014 qu\u00e9 hay aqu\u00ed\n  cd      \u2014 ir a otra carpeta\n  cd ..   \u2014 volver atr\u00e1s\n  clear   \u2014 limpiar la pantalla\n  cat     \u2014 leer un archivo\n  mkdir   \u2014 crear una carpeta\n  which   \u2014 verificar si algo est\u00e1 instalado',
      why: 'Estos 8 comandos cubren el 90% de lo que necesitas para trabajar con agentes de AI. Todo lo dem\u00e1s lo aprender\u00e1s naturalmente sobre la marcha.',
      task: 'Presiona Enter para completar el M\u00f3dulo 1',
      simulateLines: [
        '',
        'Modulo 1 completado',
        '',
        'pwd  ls  cd  cd ..  clear  cat  mkdir  which',
      ],
      simulateDelay: 200,
    },
    '1.12': {
      title: 'Quiz — La Terminal Sin Miedo',
      module: 'La Terminal Sin Miedo',
      concept: 'Vamos a ver cuánto aprendiste. 5 preguntas rápidas sobre lo que practicaste.',
      why: 'Responder preguntas refuerza lo que aprendiste. No te preocupes si fallas alguna — es parte del proceso.',
      task: 'Usa ↑↓ para moverte y Enter para seleccionar',
    },
  },
  en: {
    '1.1': {
      title: 'Your first time in the terminal',
      module: 'The Terminal Without Fear',
      concept: 'You\u2019re inside the terminal right now. This course IS a terminal.\n\nYou already made it \u2014 you\u2019re here. What you see is text, and you respond with text. No buttons, no menus.',
      analogy: 'It\u2019s like a WhatsApp chat with your computer. You type, it responds.',
      why: 'The first step is losing the fear. And guess what: you\u2019re already using it.',
      task: 'Type hola and press Enter',
      hint: 'Type the word hola and press the Enter key \u21b5',
      simulateLines: [
        'hola!',
      ],
      simulateDelay: 150,
    },
    '1.2': {
      title: 'pwd \u2014 Where am I',
      module: 'The Terminal Without Fear',
      concept: 'Your computer has folders inside folders. When you open the terminal, you\u2019re "standing" inside one.\n\nThe command pwd tells you which one. Three letters and you know your location.',
      analogy: 'It\u2019s like the "You are here" dot on a mall map.',
      why: 'If you\u2019re in the wrong folder, AI agents will edit the wrong files. Always check where you are.',
      task: 'Type pwd and press Enter',
      hint: 'Three letters together: p, w, d then Enter \u21b5',
      simulateLines: [
        '/Users/your-name/projects/my-app',
      ],
      simulateDelay: 150,
    },
    '1.3': {
      title: 'ls \u2014 What\u2019s here',
      module: 'The Terminal Without Fear',
      concept: 'You know where you are. Now you need to see what\u2019s in that folder.\n\nThe command ls shows you everything where you\u2019re standing.',
      analogy: 'If pwd is "where am I", ls is "what\u2019s here". Like turning on the light in a room.',
      why: 'Before asking an AI agent for something, you need to know what files exist. You can\u2019t edit something you can\u2019t see.',
      task: 'Type ls and press Enter',
      hint: 'Two letters: l and s, together. Then Enter \u21b5',
      simulateLines: [
        'README.md     package.json  src/          public/',
      ],
      simulateDelay: 150,
    },
    '1.4': {
      title: 'cd \u2014 Move between folders',
      module: 'The Terminal Without Fear',
      concept: 'You know where you are and what\u2019s here. Now you need to move.\n\nThe command cd takes you to another folder. You type cd followed by the folder name.',
      analogy: 'It\u2019s like walking down an office hallway. cd src is entering the office labeled "src". cd .. is going back to the hallway.',
      why: 'Projects have files in folders. You need to move between them to find what you\u2019re looking for.',
      task: 'Type cd src (with a space in between)',
      hint: 'Type cd, then a space, then src. Then Enter \u21b5',
      simulateLines: [
        '~/projects/my-app/src $',
      ],
      simulateDelay: 150,
    },
    '1.5': {
      title: 'cd .. \u2014 Go back',
      module: 'The Terminal Without Fear',
      concept: 'You just entered src. Now go back out.\n\ncd .. takes you to the parent folder. The two dots (..) always mean "one level up".',
      why: 'You\u2019ll move between folders a lot. Knowing how to go back is as important as knowing how to go forward.',
      task: 'Type cd .. (cd, space, dot, dot)',
      hint: 'Type cd then space then two dots (..) and Enter \u21b5',
      simulateLines: [
        '~/projects/my-app $',
      ],
      simulateDelay: 150,
    },
    '1.6': {
      title: 'clear \u2014 Clean the screen',
      module: 'The Terminal Without Fear',
      concept: 'Sometimes the terminal fills up with text and becomes hard to read.\n\nThe command clear cleans everything and gives you a fresh screen. It doesn\u2019t delete anything \u2014 it just cleans what you see.',
      why: 'When you\u2019re using AI agents, the screen will fill up fast. clear is your best friend to stay calm.',
      task: 'Type clear and press Enter',
      hint: 'Five letters: c, l, e, a, r. Then Enter \u21b5',
      simulateLines: [
        '',
        '',
        '  ~ $',
      ],
      simulateDelay: 150,
    },
    '1.7': {
      title: 'cat \u2014 Read a file',
      module: 'The Terminal Without Fear',
      concept: 'You know how to see what files are there with ls. Now you need to see what a file says inside.\n\nThe command cat followed by the file name shows you its content. cat README.md shows you what the README says.',
      analogy: 'ls is seeing book titles on a shelf. cat is opening a book and reading it.',
      why: 'When an AI agent makes a change, you\u2019ll want to see the file to make sure it\u2019s right. cat lets you look without opening any other program.',
      task: 'Type cat README.md',
      hint: 'Type cat, space, README.md (exactly like that, with capitals). Then Enter \u21b5',
      simulateLines: [
        '# My App',
        '',
        'A simple task management application.',
        '',
        '## Installation',
        '```',
        'npm install',
        '```',
      ],
      simulateDelay: 100,
    },
    '1.8': {
      title: 'mkdir \u2014 Create a folder',
      module: 'The Terminal Without Fear',
      concept: 'Sometimes you need to create a new folder. mkdir (make directory) creates a folder with the name you give it.\n\nmkdir docs creates a folder called "docs".',
      why: 'When you work with AI agents and your team, you\u2019ll need to organize files into new folders. This is something you\u2019ll do often.',
      task: 'Type mkdir docs',
      hint: 'Type mkdir, space, docs. Then Enter \u21b5',
      simulateLines: [
        '  $',
      ],
      simulateDelay: 150,
    },
    '1.9': {
      title: 'which \u2014 Check if something is installed',
      module: 'The Terminal Without Fear',
      concept: 'Before using a tool (like an AI agent, Node, or Git), you need to know if it\u2019s installed.\n\nThe command which tells you where something is installed. If nothing appears, it\u2019s not installed.',
      why: 'Before using any tool, you need to know if it\u2019s installed on your computer.',
      task: 'Type which node',
      hint: 'Type which, space, node. Then Enter \u21b5',
      simulateLines: [
        '/usr/local/bin/node',
      ],
      simulateDelay: 150,
    },
    '1.10': {
      title: 'Practice \u2014 Combining commands',
      module: 'The Terminal Without Fear',
      concept: 'You just arrived at a new project. Explore it using what you learned.',
      why: 'I\u2019ll give you instructions and you decide which command to use.',
      task: '',
    },
    '1.11': {
      title: 'You\u2019re not afraid anymore',
      module: 'The Terminal Without Fear',
      concept: 'You\u2019ve mastered the essential terminal commands:\n\n  pwd     \u2014 where am I\n  ls      \u2014 what\u2019s here\n  cd      \u2014 go to another folder\n  cd ..   \u2014 go back\n  clear   \u2014 clean the screen\n  cat     \u2014 read a file\n  mkdir   \u2014 create a folder\n  which   \u2014 check if something is installed',
      why: 'These 8 commands cover 90% of what you need to work with AI agents. Everything else you\u2019ll learn naturally along the way.',
      task: 'Press Enter to complete Module 1',
      simulateLines: [
        '',
        'Module 1 completed',
        '',
        'pwd  ls  cd  cd ..  clear  cat  mkdir  which',
      ],
      simulateDelay: 200,
    },
    '1.12': {
      title: 'Quiz \u2014 The Terminal Without Fear',
      module: 'The Terminal Without Fear',
      concept: "Let\u2019s see how much you learned. 5 quick questions about what you practiced.",
      why: "Answering questions reinforces what you learned. Don\u2019t worry if you miss some \u2014 it\u2019s part of the process.",
      task: 'Use \u2191\u2193 to navigate and Enter to select',
    },
  },
  fr: {
    '1.1': {
      title: 'Ta premi\u00e8re fois dans le terminal',
      module: 'Le Terminal Sans Peur',
      concept: 'Tu es dans le terminal en ce moment. Ce cours EST un terminal.\n\nTu y es d\u00e9j\u00e0 \u2014 tu as r\u00e9ussi. Ce que tu vois c\u2019est du texte, et tu r\u00e9ponds avec du texte. Pas de boutons, pas de menus.',
      analogy: 'C\u2019est comme un chat WhatsApp avec ton ordinateur. Tu \u00e9cris, il r\u00e9pond.',
      why: 'La premi\u00e8re \u00e9tape c\u2019est de ne plus avoir peur. Et devine quoi : tu l\u2019utilises d\u00e9j\u00e0.',
      task: 'Tape hola et appuie sur Entr\u00e9e',
      hint: 'Tape le mot hola et appuie sur la touche Entr\u00e9e \u21b5',
      simulateLines: [
        'hola!',
      ],
      simulateDelay: 150,
    },
    '1.2': {
      title: 'pwd \u2014 O\u00f9 suis-je',
      module: 'Le Terminal Sans Peur',
      concept: 'Ton ordinateur a des dossiers dans des dossiers. Quand tu ouvres le terminal, tu es "debout" dans l\u2019un d\u2019eux.\n\nLa commande pwd te dit dans lequel tu es. Trois lettres et tu connais ta position.',
      analogy: 'C\u2019est comme le "Vous \u00eates ici" sur le plan d\u2019un centre commercial.',
      why: 'Si tu es dans le mauvais dossier, les agents IA modifieront les mauvais fichiers. V\u00e9rifie toujours o\u00f9 tu es.',
      task: 'Tape pwd et appuie sur Entr\u00e9e',
      hint: 'Trois lettres ensemble : p, w, d puis Entr\u00e9e \u21b5',
      simulateLines: [
        '/Users/ton-nom/projets/mon-app',
      ],
      simulateDelay: 150,
    },
    '1.3': {
      title: 'ls \u2014 Qu\u2019est-ce qu\u2019il y a ici',
      module: 'Le Terminal Sans Peur',
      concept: 'Tu sais o\u00f9 tu es. Maintenant tu dois voir ce qu\u2019il y a dans ce dossier.\n\nLa commande ls te montre tout ce qu\u2019il y a l\u00e0 o\u00f9 tu es.',
      analogy: 'Si pwd c\u2019est "o\u00f9 suis-je", ls c\u2019est "qu\u2019est-ce qu\u2019il y a ici". Comme allumer la lumi\u00e8re dans une pi\u00e8ce.',
      why: 'Avant de demander quelque chose \u00e0 un agent IA, tu dois savoir quels fichiers existent. Tu ne peux pas modifier ce que tu ne vois pas.',
      task: 'Tape ls et appuie sur Entr\u00e9e',
      hint: 'Deux lettres : l et s, ensemble. Puis Entr\u00e9e \u21b5',
      simulateLines: [
        'README.md     package.json  src/          public/',
      ],
      simulateDelay: 150,
    },
    '1.4': {
      title: 'cd \u2014 Se d\u00e9placer entre les dossiers',
      module: 'Le Terminal Sans Peur',
      concept: 'Tu sais o\u00f9 tu es et ce qu\u2019il y a. Maintenant tu dois te d\u00e9placer.\n\nLa commande cd t\u2019emm\u00e8ne dans un autre dossier. Tu tapes cd suivi du nom du dossier.',
      analogy: 'C\u2019est comme marcher dans un couloir de bureaux. cd src c\u2019est entrer dans le bureau marqu\u00e9 "src". cd .. c\u2019est sortir et revenir dans le couloir.',
      why: 'Les projets ont des fichiers dans des dossiers. Tu dois te d\u00e9placer entre eux pour trouver ce que tu cherches.',
      task: 'Tape cd src (avec un espace au milieu)',
      hint: 'Tape cd, puis un espace, puis src. Puis Entr\u00e9e \u21b5',
      simulateLines: [
        '~/projets/mon-app/src $',
      ],
      simulateDelay: 150,
    },
    '1.5': {
      title: 'cd .. \u2014 Revenir en arri\u00e8re',
      module: 'Le Terminal Sans Peur',
      concept: 'Tu viens d\u2019entrer dans src. Maintenant ressors.\n\ncd .. t\u2019emm\u00e8ne au dossier parent. Les deux points (..) signifient toujours "un niveau au-dessus".',
      why: 'Tu vas beaucoup te d\u00e9placer entre les dossiers. Savoir revenir est aussi important que savoir avancer.',
      task: 'Tape cd .. (cd, espace, point, point)',
      hint: 'Tape cd puis espace puis deux points (..) et Entr\u00e9e \u21b5',
      simulateLines: [
        '~/projets/mon-app $',
      ],
      simulateDelay: 150,
    },
    '1.6': {
      title: 'clear \u2014 Nettoyer l\u2019\u00e9cran',
      module: 'Le Terminal Sans Peur',
      concept: 'Parfois le terminal se remplit de texte et devient difficile \u00e0 lire.\n\nLa commande clear nettoie tout et te donne un \u00e9cran neuf. \u00c7a n\u2019efface rien pour de vrai \u2014 \u00e7a nettoie juste ce que tu vois.',
      why: 'Quand tu utilises des agents IA, l\u2019\u00e9cran se remplit vite. clear est ton meilleur ami pour garder ton calme.',
      task: 'Tape clear et appuie sur Entr\u00e9e',
      hint: 'Cinq lettres : c, l, e, a, r. Puis Entr\u00e9e \u21b5',
      simulateLines: [
        '',
        '',
        '  ~ $',
      ],
      simulateDelay: 150,
    },
    '1.7': {
      title: 'cat \u2014 Lire un fichier',
      module: 'Le Terminal Sans Peur',
      concept: 'Tu sais voir quels fichiers il y a avec ls. Maintenant tu dois voir ce qu\u2019un fichier dit \u00e0 l\u2019int\u00e9rieur.\n\nLa commande cat suivie du nom du fichier te montre son contenu. cat README.md te montre ce que dit le README.',
      analogy: 'ls c\u2019est voir les titres des livres sur une \u00e9tag\u00e8re. cat c\u2019est ouvrir un livre et le lire.',
      why: 'Quand un agent IA fait un changement, tu vas vouloir voir le fichier pour t\u2019assurer que c\u2019est correct. cat te permet de regarder sans ouvrir un autre programme.',
      task: 'Tape cat README.md',
      hint: 'Tape cat, espace, README.md (tel quel, avec les majuscules). Puis Entr\u00e9e \u21b5',
      simulateLines: [
        '# Mon App',
        '',
        'Une application de gestion de taches.',
        '',
        '## Installation',
        '```',
        'npm install',
        '```',
      ],
      simulateDelay: 100,
    },
    '1.8': {
      title: 'mkdir \u2014 Cr\u00e9er un dossier',
      module: 'Le Terminal Sans Peur',
      concept: 'Parfois tu as besoin de cr\u00e9er un nouveau dossier. mkdir (make directory) cr\u00e9e un dossier avec le nom que tu lui donnes.\n\nmkdir docs cr\u00e9e un dossier qui s\u2019appelle "docs".',
      why: 'Quand tu travailles avec des agents IA et ton \u00e9quipe, vous aurez besoin d\u2019organiser les fichiers dans de nouveaux dossiers. C\u2019est quelque chose que tu feras souvent.',
      task: 'Tape mkdir docs',
      hint: 'Tape mkdir, espace, docs. Puis Entr\u00e9e \u21b5',
      simulateLines: [
        '  $',
      ],
      simulateDelay: 150,
    },
    '1.9': {
      title: 'which \u2014 V\u00e9rifier si quelque chose est install\u00e9',
      module: 'Le Terminal Sans Peur',
      concept: 'Avant d\u2019utiliser un outil (comme un agent IA, Node, ou Git), tu dois savoir s\u2019il est install\u00e9.\n\nLa commande which te dit o\u00f9 quelque chose est install\u00e9. Si rien n\u2019appara\u00eet, c\u2019est que ce n\u2019est pas install\u00e9.',
      why: 'Avant d\u2019utiliser un outil, tu dois savoir s\u2019il est install\u00e9 sur ton ordinateur.',
      task: 'Tape which node',
      hint: 'Tape which, espace, node. Puis Entr\u00e9e \u21b5',
      simulateLines: [
        '/usr/local/bin/node',
      ],
      simulateDelay: 150,
    },
    '1.10': {
      title: 'Pratique \u2014 Combiner les commandes',
      module: 'Le Terminal Sans Peur',
      concept: 'Tu viens d\u2019arriver sur un nouveau projet. Explore-le avec ce que tu as appris.',
      why: 'Je vais te donner des instructions et tu d\u00e9cides quelle commande utiliser.',
      task: '',
    },
    '1.11': {
      title: 'Tu n\u2019as plus peur',
      module: 'Le Terminal Sans Peur',
      concept: 'Tu ma\u00eetrises les commandes essentielles du terminal :\n\n  pwd     \u2014 o\u00f9 suis-je\n  ls      \u2014 qu\u2019est-ce qu\u2019il y a ici\n  cd      \u2014 aller dans un autre dossier\n  cd ..   \u2014 revenir en arri\u00e8re\n  clear   \u2014 nettoyer l\u2019\u00e9cran\n  cat     \u2014 lire un fichier\n  mkdir   \u2014 cr\u00e9er un dossier\n  which   \u2014 v\u00e9rifier si quelque chose est install\u00e9',
      why: 'Ces 8 commandes couvrent 90% de ce dont tu as besoin pour travailler avec des agents IA. Tout le reste tu l\u2019apprendras naturellement en chemin.',
      task: 'Appuie sur Entr\u00e9e pour terminer le Module 1',
      simulateLines: [
        '',
        'Module 1 terminé',
        '',
        'pwd  ls  cd  cd ..  clear  cat  mkdir  which',
      ],
      simulateDelay: 200,
    },
    '1.12': {
      title: 'Quiz \u2014 Le Terminal Sans Peur',
      module: 'Le Terminal Sans Peur',
      concept: 'Voyons combien tu as appris. 5 questions rapides sur ce que tu as pratiqu\u00e9.',
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

const quizModule1: Record<Locale, QuizQuestionData[]> = {
  es: [
    { question: '\u00bfQu\u00e9 comando te dice en qu\u00e9 carpeta est\u00e1s?', options: ['pwd', 'ls', 'cd', 'cat'], correct: 0, explanation: 'pwd = print working directory. Te dice tu ubicaci\u00f3n.' },
    { question: '\u00bfQu\u00e9 comando muestra los archivos de una carpeta?', options: ['pwd', 'mkdir', 'ls', 'cat'], correct: 2, explanation: 'ls = list. Te muestra qu\u00e9 hay donde est\u00e1s.' },
    { question: '\u00bfC\u00f3mo entras a una carpeta llamada docs?', options: ['ls docs', 'cd docs', 'cat docs', 'mkdir docs'], correct: 1, explanation: 'cd = change directory. cd docs te lleva a la carpeta docs.' },
    { question: '\u00bfQu\u00e9 pasa cuando un comando no muestra nada?', options: ['Error', 'Nada funcion\u00f3', 'Funcion\u00f3 correctamente', 'Hay que repetirlo'], correct: 2, explanation: 'En la terminal, silencio = \u00e9xito.' },
    { question: '\u00bfC\u00f3mo vuelves a la carpeta de arriba?', options: ['cd back', 'cd ..', 'cd up', 'cd -'], correct: 1, explanation: "cd .. = ir un nivel arriba. Los dos puntos siempre significan 'la carpeta padre'." },
  ],
  en: [
    { question: 'Which command tells you what folder you are in?', options: ['pwd', 'ls', 'cd', 'cat'], correct: 0, explanation: 'pwd = print working directory. It tells you your location.' },
    { question: 'Which command shows the files in a folder?', options: ['pwd', 'mkdir', 'ls', 'cat'], correct: 2, explanation: 'ls = list. It shows you what is where you are.' },
    { question: 'How do you enter a folder called docs?', options: ['ls docs', 'cd docs', 'cat docs', 'mkdir docs'], correct: 1, explanation: 'cd = change directory. cd docs takes you into the docs folder.' },
    { question: 'What happens when a command shows no output?', options: ['Error', 'Nothing worked', 'It worked correctly', 'You need to repeat it'], correct: 2, explanation: 'In the terminal, silence = success.' },
    { question: 'How do you go back to the parent folder?', options: ['cd back', 'cd ..', 'cd up', 'cd -'], correct: 1, explanation: "cd .. = go one level up. The two dots always mean 'the parent folder'." },
  ],
  fr: [
    { question: 'Quelle commande te dit dans quel dossier tu es ?', options: ['pwd', 'ls', 'cd', 'cat'], correct: 0, explanation: 'pwd = print working directory. \u00c7a te dit ta position.' },
    { question: 'Quelle commande montre les fichiers d\u2019un dossier ?', options: ['pwd', 'mkdir', 'ls', 'cat'], correct: 2, explanation: 'ls = list. \u00c7a te montre ce qu\u2019il y a o\u00f9 tu es.' },
    { question: 'Comment entres-tu dans un dossier appel\u00e9 docs ?', options: ['ls docs', 'cd docs', 'cat docs', 'mkdir docs'], correct: 1, explanation: 'cd = change directory. cd docs t\u2019emm\u00e8ne dans le dossier docs.' },
    { question: 'Que se passe-t-il quand une commande n\u2019affiche rien ?', options: ['Erreur', 'Rien n\u2019a fonctionn\u00e9', '\u00c7a a fonctionn\u00e9 correctement', 'Il faut r\u00e9p\u00e9ter'], correct: 2, explanation: 'Dans le terminal, silence = succ\u00e8s.' },
    { question: 'Comment reviens-tu au dossier parent ?', options: ['cd back', 'cd ..', 'cd up', 'cd -'], correct: 1, explanation: "cd .. = remonter d\u2019un niveau. Les deux points signifient toujours 'le dossier parent'." },
  ],
};

const practiceModule1: Record<Locale, CommandStep[]> = {
  es: [
    { challenge: 'Averigua en qué carpeta estás', command: 'pwd', output: ['/Users/tu-nombre/proyectos/mi-app'], hint1: 'Son 3 letras...', hint2: 'El comando es pwd' },
    { challenge: 'Mira qué archivos hay en esta carpeta', command: 'ls', output: ['README.md  package.json  src/  public/'], hint1: 'Son 2 letras...', hint2: 'El comando es ls' },
    { challenge: 'Entra a la carpeta src', command: 'cd src', output: [], hint1: 'Necesitas el comando para moverte + el nombre de la carpeta', hint2: 'El comando es cd src' },
    { challenge: 'Revisa qué hay dentro de src', command: 'ls', output: ['index.tsx  app.tsx  components/'], hint1: 'Ya usaste este comando antes...', hint2: 'El comando es ls' },
    { challenge: 'Lee el contenido del archivo index.tsx', command: 'cat index.tsx', output: ['import { App } from "./app";', 'export default App;'], hint1: 'El comando para leer archivos + el nombre del archivo', hint2: 'El comando es cat index.tsx' },
    { challenge: 'Crea una carpeta nueva llamada utils', command: 'mkdir utils', output: [], hint1: 'El comando para crear carpetas + el nombre', hint2: 'El comando es mkdir utils' },
    { challenge: 'Vuelve a la carpeta de arriba', command: 'cd ..', output: [], hint1: 'Dos puntos significan "arriba"...', hint2: 'El comando es cd ..' },
  ],
  en: [
    { challenge: 'Find out which folder you are in', command: 'pwd', output: ['/Users/your-name/projects/my-app'], hint1: "It's 3 letters...", hint2: 'The command is pwd' },
    { challenge: 'See what files are in this folder', command: 'ls', output: ['README.md  package.json  src/  public/'], hint1: "It's 2 letters...", hint2: 'The command is ls' },
    { challenge: 'Go into the src folder', command: 'cd src', output: [], hint1: 'You need the move command + the folder name', hint2: 'The command is cd src' },
    { challenge: 'Check what is inside src', command: 'ls', output: ['index.tsx  app.tsx  components/'], hint1: 'You used this command before...', hint2: 'The command is ls' },
    { challenge: 'Read the contents of index.tsx', command: 'cat index.tsx', output: ['import { App } from "./app";', 'export default App;'], hint1: 'The command to read files + the filename', hint2: 'The command is cat index.tsx' },
    { challenge: 'Create a new folder called utils', command: 'mkdir utils', output: [], hint1: 'The command to create folders + the name', hint2: 'The command is mkdir utils' },
    { challenge: 'Go back to the parent folder', command: 'cd ..', output: [], hint1: 'Two dots mean "up"...', hint2: 'The command is cd ..' },
  ],
  fr: [
    { challenge: 'Trouve dans quel dossier tu es', command: 'pwd', output: ['/Users/ton-nom/projets/mon-app'], hint1: "C'est 3 lettres...", hint2: 'La commande est pwd' },
    { challenge: 'Regarde quels fichiers il y a dans ce dossier', command: 'ls', output: ['README.md  package.json  src/  public/'], hint1: "C'est 2 lettres...", hint2: 'La commande est ls' },
    { challenge: 'Entre dans le dossier src', command: 'cd src', output: [], hint1: 'Tu as besoin de la commande pour te déplacer + le nom du dossier', hint2: 'La commande est cd src' },
    { challenge: 'Vérifie ce qu\'il y a dans src', command: 'ls', output: ['index.tsx  app.tsx  components/'], hint1: 'Tu as déjà utilisé cette commande...', hint2: 'La commande est ls' },
    { challenge: 'Lis le contenu du fichier index.tsx', command: 'cat index.tsx', output: ['import { App } from "./app";', 'export default App;'], hint1: 'La commande pour lire des fichiers + le nom', hint2: 'La commande est cat index.tsx' },
    { challenge: 'Crée un nouveau dossier appelé utils', command: 'mkdir utils', output: [], hint1: 'La commande pour créer des dossiers + le nom', hint2: 'La commande est mkdir utils' },
    { challenge: 'Reviens au dossier parent', command: 'cd ..', output: [], hint1: 'Deux points signifient "au-dessus"...', hint2: 'La commande est cd ..' },
  ],
};

function buildSimulate(c: LessonText) {
  if (!c.simulateLines) return undefined;
  return { lines: c.simulateLines, delay: c.simulateDelay };
}

export function getModule1Lessons(locale: Locale): Lesson[] {
  const c = content[locale];
  const m = msg[locale];

  return [
    {
      id: '1.1',
      ...c['1.1']!,
      command: 'hola',
      validate: (input: string) => {
        if (input.trim().toLowerCase() === 'hola') return { valid: true, message: m['1.1'].ok };
        return { valid: false, message: m['1.1'].fail };
      },
      simulate: buildSimulate(c['1.1']!),
    },
    {
      id: '1.2',
      ...c['1.2']!,
      command: 'pwd',
      validate: (input: string) => {
        if (input.trim().toLowerCase() === 'pwd') return { valid: true, message: m['1.2'].ok };
        return { valid: false, message: m['1.2'].fail };
      },
      simulate: buildSimulate(c['1.2']!),
    },
    {
      id: '1.3',
      ...c['1.3']!,
      command: 'ls',
      validate: (input: string) => {
        if (input.trim().toLowerCase() === 'ls') return { valid: true, message: m['1.3'].ok };
        return { valid: false, message: m['1.3'].fail };
      },
      simulate: buildSimulate(c['1.3']!),
    },
    {
      id: '1.4',
      ...c['1.4']!,
      command: 'cd src',
      validate: (input: string) => {
        const t = input.trim().toLowerCase();
        if (t === 'cd src') return { valid: true, message: m['1.4'].ok };
        if (t === 'cd') return { valid: false, message: (m['1.4'] as any).failMissing };
        if (t === 'cdsrc') return { valid: false, message: (m['1.4'] as any).failNoSpace };
        return { valid: false, message: m['1.4'].fail };
      },
      simulate: buildSimulate(c['1.4']!),
    },
    {
      id: '1.5',
      ...c['1.5']!,
      command: 'cd ..',
      validate: (input: string) => {
        const t = input.trim().toLowerCase();
        if (t === 'cd ..') return { valid: true, message: m['1.5'].ok };
        if (t === 'cd..' || t === 'cd..') return { valid: false, message: (m['1.5'] as any).failNoSpace };
        return { valid: false, message: m['1.5'].fail };
      },
      simulate: buildSimulate(c['1.5']!),
    },
    {
      id: '1.6',
      ...c['1.6']!,
      command: 'clear',
      validate: (input: string) => {
        if (input.trim().toLowerCase() === 'clear') return { valid: true, message: m['1.6'].ok };
        return { valid: false, message: m['1.6'].fail };
      },
      simulate: buildSimulate(c['1.6']!),
    },
    {
      id: '1.7',
      ...c['1.7']!,
      command: 'cat README.md',
      validate: (input: string) => {
        const t = input.trim();
        if (t.toLowerCase() === 'cat readme.md') return { valid: true, message: m['1.7'].ok };
        if (t.toLowerCase() === 'cat') return { valid: false, message: (m['1.7'] as any).failMissing };
        return { valid: false, message: m['1.7'].fail };
      },
      simulate: buildSimulate(c['1.7']!),
    },
    {
      id: '1.8',
      ...c['1.8']!,
      command: 'mkdir docs',
      validate: (input: string) => {
        const t = input.trim().toLowerCase();
        if (t === 'mkdir docs') return { valid: true, message: m['1.8'].ok };
        if (t === 'mkdir') return { valid: false, message: (m['1.8'] as any).failMissing };
        return { valid: false, message: m['1.8'].fail };
      },
      simulate: buildSimulate(c['1.8']!),
    },
    {
      id: '1.9',
      ...c['1.9']!,
      command: 'which node',
      validate: (input: string) => {
        const t = input.trim().toLowerCase();
        if (t === 'which node') return { valid: true, message: m['1.9'].ok };
        if (t === 'which') return { valid: false, message: (m['1.9'] as any).failMissing };
        return { valid: false, message: m['1.9'].fail };
      },
      simulate: buildSimulate(c['1.9']!),
    },
    {
      id: '1.10',
      ...c['1.10']!,
      validate: () => ({ valid: true, message: m['1.10'].ok }),
      practiceSteps: practiceModule1[locale],
    },
    {
      id: '1.11',
      ...c['1.11']!,
      validate: () => ({ valid: true, message: m['1.11'].ok }),
      simulate: buildSimulate(c['1.11']!),
    },
    {
      id: '1.12',
      ...c['1.12']!,
      validate: () => ({ valid: true, message: '' }),
      quizQuestions: quizModule1[locale],
    },
  ];
}
