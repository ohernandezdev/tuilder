import { type Lesson } from '../../types.js';
import { type Locale } from '../../i18n/types.js';

const content: Record<Locale, Record<string, { title: string; module: string; concept: string; analogy?: string; why: string; task: string; hint?: string; simulateLines?: string[]; simulateDelay?: number }>> = {
  es: {
    '0.1': {
      title: 'Por qu\u00e9 est\u00e1s aqu\u00ed',
      module: 'Inicio',
      concept:
        '{nombre}, este curso te va a convertir en alguien que puede colaborar directamente con desarrolladores usando agentes de AI como Claude Code, Copilot CLI o Codex.\n\nNo vas a ser programador \u2014 vas a ser un builder. Alguien que puede hacer cambios reales y contribuir directamente al producto.\n\nNo necesitas saber nada de tecnolog\u00eda.',
      analogy:
        'Es como aprender a manejar un auto. No necesitas saber c\u00f3mo funciona el motor. Solo necesitas saber d\u00f3nde est\u00e1 el volante, el freno y las se\u00f1ales de tr\u00e1nsito.',
      why: 'Tu equipo ya usa agentes de AI. Si t\u00fa tambi\u00e9n puedes usarlos, van a avanzar mucho m\u00e1s r\u00e1pido. T\u00fa conoces el producto mejor que nadie \u2014 eso es tu superpoder.',
      task: '',
    },
    '0.2': {
      title: 'Qu\u00e9 es la terminal',
      module: 'Inicio',
      concept:
        'La terminal es una forma de hablarle a tu computadora usando texto.\n\nEn vez de hacer clic en \u00edconos, escribes palabras cortas. Es como enviarle un mensaje de texto a tu computadora en vez de se\u00f1alarle cosas con el dedo.',
      analogy:
        'Imagina que tu computadora es un restaurante. El mouse es como se\u00f1alar los platos en la vitrina. La terminal es como hablarle directamente al chef.',
      why: 'Los agentes de AI viven en la terminal. Para usarlos, necesitas sentirte c\u00f3modo aqu\u00ed. Este curso te lleva paso a paso.',
      task: '',
    },
    '0.3': {
      title: 'Los controles',
      module: 'Inicio',
      concept:
        'Antes de empezar, vamos a practicar los controles. Como en un videojuego, primero aprendes los botones.\n\nTe voy a pedir que presiones cada tecla, una por una.',
      why: 'Son solo 4 controles. Si los dominas, puedes completar todo el curso.',
      task: '',
      simulateLines: [
        '  Controles dominados.',
        '',
        '  Enter = avanzar    Esc = volver',
        '  Teclado = escribir  Backspace = borrar',
        '',
        '  Ya est\u00e1s listo.',
      ],
      simulateDelay: 400,
    },
    '0.4': {
      title: 'C\u00f3mo funciona este curso',
      module: 'Inicio',
      concept:
        'El curso tiene lecciones cortas. Cada una tiene una explicaci\u00f3n y un ejercicio.\n\nVas a escribir comandos reales en un entorno seguro. Nada de lo que hagas aqu\u00ed puede romper nada.\n\nPuedes salir cuando quieras \u2014 tu progreso se guarda solo.',
      why: 'Aprender haciendo es la \u00fanica forma que funciona. Cada lecci\u00f3n te pide hacer algo concreto, no solo leer.',
      task: '',
      simulateLines: [
        '  Tu progreso se guarda autom\u00e1ticamente',
        '  Puedes salir y volver cuando quieras',
        '  Nada de lo que hagas aqu\u00ed puede romper nada',
        '',
        '  Vamos.',
      ],
      simulateDelay: 500,
    },
  },
  en: {
    '0.1': {
      title: 'Why you are here',
      module: 'Getting Started',
      concept:
        '{nombre}, this course will turn you into someone who can collaborate directly with developers using AI agents like Claude Code, Copilot CLI, or Codex.\n\nYou won\'t become a programmer \u2014 you\'ll become a builder. Someone who can make real changes and contribute directly to the product.\n\nYou don\'t need to know anything about technology.',
      analogy:
        'It\'s like learning to drive a car. You don\'t need to know how the engine works. You just need to know where the steering wheel, the brake, and the traffic signs are.',
      why: 'Your team already uses AI agents. If you can use them too, everyone moves much faster. You know the product better than anyone \u2014 that\'s your superpower.',
      task: '',
    },
    '0.2': {
      title: 'What is the terminal',
      module: 'Getting Started',
      concept:
        'The terminal is a way to talk to your computer using text.\n\nInstead of clicking on icons, you type short words. It\'s like sending a text message to your computer instead of pointing at things.',
      analogy:
        'Imagine your computer is a restaurant. The mouse is like pointing at dishes in the display case. The terminal is like talking directly to the chef.',
      why: 'AI agents live in the terminal. To use them, you need to feel comfortable here. This course takes you step by step.',
      task: '',
    },
    '0.3': {
      title: 'The controls',
      module: 'Getting Started',
      concept:
        'Before we start, let\'s practice the controls. Like in a video game, first you learn the buttons.\n\nI\'ll ask you to press each key, one by one.',
      why: 'There are only 4 controls. Master them and you can complete the entire course.',
      task: '',
      simulateLines: [
        '  Controls mastered.',
        '',
        '  Enter = go forward    Esc = go back',
        '  Keyboard = type       Backspace = delete',
        '',
        '  You\'re ready.',
      ],
      simulateDelay: 400,
    },
    '0.4': {
      title: 'How this course works',
      module: 'Getting Started',
      concept:
        'The course has short lessons. Each one has an explanation and an exercise.\n\nYou\'ll type real commands in a safe environment. Nothing you do here can break anything.\n\nYou can leave whenever you want \u2014 your progress is saved automatically.',
      why: 'Learning by doing is the only way that works. Each lesson asks you to do something concrete, not just read.',
      task: '',
      simulateLines: [
        '  Your progress is saved automatically',
        '  You can leave and come back anytime',
        '  Nothing you do here can break anything',
        '',
        '  Let\'s go.',
      ],
      simulateDelay: 500,
    },
  },
  fr: {
    '0.1': {
      title: 'Pourquoi tu es ici',
      module: 'D\u00e9marrage',
      concept:
        '{nombre}, ce cours va te transformer en quelqu\'un qui peut collaborer directement avec les d\u00e9veloppeurs en utilisant des agents IA comme Claude Code, Copilot CLI ou Codex.\n\nTu ne vas pas devenir programmeur \u2014 tu vas devenir un builder. Quelqu\'un qui peut faire des changements r\u00e9els et contribuer directement au produit.\n\nTu n\'as besoin d\'aucune connaissance technique.',
      analogy:
        'C\'est comme apprendre \u00e0 conduire une voiture. Tu n\'as pas besoin de savoir comment fonctionne le moteur. Tu as juste besoin de savoir o\u00f9 sont le volant, le frein et les panneaux de signalisation.',
      why: 'Ton \u00e9quipe utilise d\u00e9j\u00e0 des agents IA. Si toi aussi tu peux les utiliser, tout le monde avancera beaucoup plus vite. Tu connais le produit mieux que personne \u2014 c\'est ton superpouvoir.',
      task: '',
    },
    '0.2': {
      title: 'Qu\'est-ce que le terminal',
      module: 'D\u00e9marrage',
      concept:
        'Le terminal est une fa\u00e7on de parler \u00e0 ton ordinateur en utilisant du texte.\n\nAu lieu de cliquer sur des ic\u00f4nes, tu tapes des mots courts. C\'est comme envoyer un SMS \u00e0 ton ordinateur au lieu de lui montrer des choses du doigt.',
      analogy:
        'Imagine que ton ordinateur est un restaurant. La souris, c\'est comme montrer les plats dans la vitrine. Le terminal, c\'est comme parler directement au chef.',
      why: 'Les agents IA vivent dans le terminal. Pour les utiliser, tu dois te sentir \u00e0 l\'aise ici. Ce cours te guide pas \u00e0 pas.',
      task: '',
    },
    '0.3': {
      title: 'Les contr\u00f4les',
      module: 'D\u00e9marrage',
      concept:
        'Avant de commencer, on va pratiquer les contr\u00f4les. Comme dans un jeu vid\u00e9o, d\'abord tu apprends les boutons.\n\nJe vais te demander d\'appuyer sur chaque touche, une par une.',
      why: 'Il n\'y a que 4 contr\u00f4les. Ma\u00eetrise-les et tu peux terminer tout le cours.',
      task: '',
      simulateLines: [
        '  Contr\u00f4les ma\u00eetris\u00e9s.',
        '',
        '  Enter = avancer      Esc = revenir',
        '  Clavier = \u00e9crire     Backspace = effacer',
        '',
        '  Tu es pr\u00eat.',
      ],
      simulateDelay: 400,
    },
    '0.4': {
      title: 'Comment fonctionne ce cours',
      module: 'D\u00e9marrage',
      concept:
        'Le cours a des le\u00e7ons courtes. Chacune a une explication et un exercice.\n\nTu vas taper de vraies commandes dans un environnement s\u00fbr. Rien de ce que tu fais ici ne peut casser quoi que ce soit.\n\nTu peux partir quand tu veux \u2014 ta progression est sauvegard\u00e9e automatiquement.',
      why: 'Apprendre en faisant est la seule m\u00e9thode qui marche. Chaque le\u00e7on te demande de faire quelque chose de concret, pas juste de lire.',
      task: '',
      simulateLines: [
        '  Ta progression est sauvegard\u00e9e automatiquement',
        '  Tu peux partir et revenir quand tu veux',
        '  Rien de ce que tu fais ici ne peut casser quoi que ce soit',
        '',
        '  C\'est parti.',
      ],
      simulateDelay: 500,
    },
  },
};

export function getModule0Lessons(locale: Locale): Lesson[] {
  const c = content[locale];
  return [
    {
      id: '0.1',
      ...c['0.1']!,
      validate: () => ({ valid: true, message: '' }),
    },
    {
      id: '0.2',
      ...c['0.2']!,
      validate: () => ({ valid: true, message: '' }),
    },
    {
      id: '0.3',
      ...c['0.3']!,
      interactive: 'controls-tutorial' as const,
      validate: () => ({ valid: true, message: '' }),
      simulate: c['0.3']!.simulateLines
        ? { lines: c['0.3']!.simulateLines, delay: c['0.3']!.simulateDelay }
        : undefined,
    },
    {
      id: '0.4',
      ...c['0.4']!,
      validate: () => ({ valid: true, message: '' }),
      simulate: c['0.4']!.simulateLines
        ? { lines: c['0.4']!.simulateLines, delay: c['0.4']!.simulateDelay }
        : undefined,
    },
  ];
}
