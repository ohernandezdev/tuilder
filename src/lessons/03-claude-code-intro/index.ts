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

interface AgentSimText {
  scenario: string;
  promptHint: string;
  agentResponse: string[];
  diffLines: string[];
  explanation: string;
}

// ---------------------------------------------------------------------------
// Validation messages
// ---------------------------------------------------------------------------
const msg = {
  es: {
    '3.1': { ok: 'Ahora sabes qué es un agente de AI.' },
    '3.2': { ok: 'Conoces los límites. Eso te hace más efectivo.' },
    '3.3': { ok: 'Ya sabes hablarle al agente.' },
    '3.4': { ok: 'Diste tu primera instrucción.' },
    '3.5': { ok: 'Revisaste el diff correctamente.' },
    '3.6': { ok: 'Bien rechazado. El archivo era incorrecto.' },
    '3.7': { ok: 'Entiendes el sistema de permisos.' },
    '3.8': { ok: 'Instrucciones complejas completadas.' },
    '3.9': { ok: 'Sabes cuándo pedir ayuda humana.' },
    '3.10': { ok: 'Sesión práctica completada.' },
    '3.11': { ok: 'Completaste el Módulo 3.' },
  },
  en: {
    '3.1': { ok: 'Now you know what an AI agent is.' },
    '3.2': { ok: 'Knowing the limits makes you more effective.' },
    '3.3': { ok: 'You know how to talk to the agent.' },
    '3.4': { ok: 'You gave your first instruction.' },
    '3.5': { ok: 'You reviewed the diff correctly.' },
    '3.6': { ok: 'Good rejection. The file was wrong.' },
    '3.7': { ok: 'You understand the permission system.' },
    '3.8': { ok: 'Complex instructions completed.' },
    '3.9': { ok: 'You know when to call a human.' },
    '3.10': { ok: 'Practice session completed.' },
    '3.11': { ok: 'You completed Module 3.' },
  },
  fr: {
    '3.1': { ok: 'Maintenant tu sais ce qu\'est un agent IA.' },
    '3.2': { ok: 'Connaître les limites te rend plus efficace.' },
    '3.3': { ok: 'Tu sais parler à l\'agent.' },
    '3.4': { ok: 'Tu as donné ta première instruction.' },
    '3.5': { ok: 'Tu as bien vérifié le diff.' },
    '3.6': { ok: 'Bien rejeté. Le fichier était incorrect.' },
    '3.7': { ok: 'Tu comprends le système de permissions.' },
    '3.8': { ok: 'Instructions complexes complétées.' },
    '3.9': { ok: 'Tu sais quand demander de l\'aide humaine.' },
    '3.10': { ok: 'Session pratique complétée.' },
    '3.11': { ok: 'Tu as complété le Module 3.' },
  },
} as const;

// ---------------------------------------------------------------------------
// Agent simulation content per locale
// ---------------------------------------------------------------------------
const agentSims: Record<Locale, Record<string, AgentSimText>> = {
  es: {
    '3.4': {
      scenario: 'Hay un botón en src/Button.tsx que dice "Click me". Quieres que diga "Empezar".',
      promptHint: 'Intenta pedir que cambie el texto del botón',
      agentResponse: ['Leyendo src/Button.tsx...', 'Voy a cambiar el texto del botón.', 'Escribiendo cambios...'],
      diffLines: ['--- a/src/Button.tsx', '+++ b/src/Button.tsx', '-  <button>Click me</button>', '+  <button>Empezar</button>'],
      explanation: 'El cambio es exactamente lo que pediste. El diff muestra que solo cambió el texto del botón.',
    },
    '3.5': {
      scenario: 'Le pediste al agente cambiar el color de fondo de una tarjeta de gris a azul.',
      promptHint: 'Escribe algo como: cambia el color de la card a azul',
      agentResponse: ['Leyendo src/Card.tsx...', 'Cambiaré el color de fondo.', 'Escribiendo cambios...'],
      diffLines: ['--- a/src/Card.tsx', '+++ b/src/Card.tsx', '-  background-color: gray;', '+  background-color: blue;'],
      explanation: 'Siempre verifica que el diff coincida con lo que pediste. Aquí el cambio es correcto.',
    },
    '3.6': {
      scenario: 'Pediste cambiar el título de la página de inicio. Pero el agente modificó el archivo EQUIVOCADO (src/Dashboard.tsx en vez de src/Home.tsx).',
      promptHint: 'Escribe algo como: cambia el titulo de inicio',
      agentResponse: ['Leyendo src/Dashboard.tsx...', 'Cambiaré el título.', 'Escribiendo cambios...'],
      diffLines: ['--- a/src/Dashboard.tsx', '+++ b/src/Dashboard.tsx', '-  <h1>Dashboard</h1>', '+  <h1>Bienvenido</h1>'],
      explanation: '¡El agente editó el archivo equivocado! Fíjate siempre en el nombre del archivo en el encabezado del diff.',
    },
    '3.8': {
      scenario: 'Pide cambiar el título de la página Y ponerlo en negritas. El agente hace ambos correctamente.',
      promptHint: 'Escribe algo como: cambia el titulo y ponlo en negritas',
      agentResponse: ['Leyendo src/Home.tsx...', 'Cambiaré el título y lo pondré en negritas.', 'Escribiendo cambios...'],
      diffLines: ['--- a/src/Home.tsx', '+++ b/src/Home.tsx', '-  <h1>Hello</h1>', '+  <h1><strong>Bienvenido</strong></h1>'],
      explanation: 'Puedes pedir múltiples cosas a la vez. Verifica que TODOS los cambios estén en el diff.',
    },
  },
  en: {
    '3.4': {
      scenario: 'There\'s a button in src/Button.tsx that says "Click me". You want it to say "Get started".',
      promptHint: 'Try asking to change the button text',
      agentResponse: ['Reading src/Button.tsx...', 'I\'ll change the button text.', 'Writing changes...'],
      diffLines: ['--- a/src/Button.tsx', '+++ b/src/Button.tsx', '-  <button>Click me</button>', '+  <button>Get started</button>'],
      explanation: 'The change is exactly what you asked for. The diff shows only the button text changed.',
    },
    '3.5': {
      scenario: 'You asked the agent to change the background color of a card from gray to blue.',
      promptHint: 'Try: change the card color to blue',
      agentResponse: ['Reading src/Card.tsx...', 'I\'ll change the background color.', 'Writing changes...'],
      diffLines: ['--- a/src/Card.tsx', '+++ b/src/Card.tsx', '-  background-color: gray;', '+  background-color: blue;'],
      explanation: 'Always check that the diff matches what you asked. Here the change is correct.',
    },
    '3.6': {
      scenario: 'You asked to change the title on the homepage. But the agent modified the WRONG FILE (src/Dashboard.tsx instead of src/Home.tsx).',
      promptHint: 'Try: change the home title',
      agentResponse: ['Reading src/Dashboard.tsx...', 'I\'ll change the title.', 'Writing changes...'],
      diffLines: ['--- a/src/Dashboard.tsx', '+++ b/src/Dashboard.tsx', '-  <h1>Dashboard</h1>', '+  <h1>Welcome</h1>'],
      explanation: 'The agent edited the wrong file! Always check the filename in the diff header.',
    },
    '3.8': {
      scenario: 'Ask to change the page title AND make it bold. The agent does both correctly.',
      promptHint: 'Try: change the title and make it bold',
      agentResponse: ['Reading src/Home.tsx...', 'I\'ll change the title and make it bold.', 'Writing changes...'],
      diffLines: ['--- a/src/Home.tsx', '+++ b/src/Home.tsx', '-  <h1>Hello</h1>', '+  <h1><strong>Welcome</strong></h1>'],
      explanation: 'You can ask for multiple things at once. Check that ALL changes are in the diff.',
    },
  },
  fr: {
    '3.4': {
      scenario: 'Il y a un bouton dans src/Button.tsx qui dit "Click me". Tu veux qu\'il dise "Commencer".',
      promptHint: 'Essaie de demander de changer le texte du bouton',
      agentResponse: ['Lecture de src/Button.tsx...', 'Je vais changer le texte du bouton.', 'Écriture des changements...'],
      diffLines: ['--- a/src/Button.tsx', '+++ b/src/Button.tsx', '-  <button>Click me</button>', '+  <button>Commencer</button>'],
      explanation: 'Le changement est exactement ce que tu as demandé. Le diff montre que seul le texte du bouton a changé.',
    },
    '3.5': {
      scenario: 'Tu as demandé à l\'agent de changer la couleur de fond d\'une carte de gris à bleu.',
      promptHint: 'Essaie: change la couleur de la carte en bleu',
      agentResponse: ['Lecture de src/Card.tsx...', 'Je vais changer la couleur de fond.', 'Écriture des changements...'],
      diffLines: ['--- a/src/Card.tsx', '+++ b/src/Card.tsx', '-  background-color: gray;', '+  background-color: blue;'],
      explanation: 'Vérifie toujours que le diff correspond à ce que tu as demandé. Ici le changement est correct.',
    },
    '3.6': {
      scenario: 'Tu as demandé de changer le titre de la page d\'accueil. Mais l\'agent a modifié le MAUVAIS FICHIER (src/Dashboard.tsx au lieu de src/Home.tsx).',
      promptHint: 'Essaie: change le titre d\'accueil',
      agentResponse: ['Lecture de src/Dashboard.tsx...', 'Je vais changer le titre.', 'Écriture des changements...'],
      diffLines: ['--- a/src/Dashboard.tsx', '+++ b/src/Dashboard.tsx', '-  <h1>Dashboard</h1>', '+  <h1>Bienvenue</h1>'],
      explanation: 'L\'agent a modifié le mauvais fichier ! Vérifie toujours le nom du fichier dans l\'en-tête du diff.',
    },
    '3.8': {
      scenario: 'Demande de changer le titre de la page ET de le mettre en gras. L\'agent fait les deux correctement.',
      promptHint: 'Essaie: change le titre et mets-le en gras',
      agentResponse: ['Lecture de src/Home.tsx...', 'Je vais changer le titre et le mettre en gras.', 'Écriture des changements...'],
      diffLines: ['--- a/src/Home.tsx', '+++ b/src/Home.tsx', '-  <h1>Hello</h1>', '+  <h1><strong>Bienvenue</strong></h1>'],
      explanation: 'Tu peux demander plusieurs choses à la fois. Vérifie que TOUS les changements sont dans le diff.',
    },
  },
};

// ---------------------------------------------------------------------------
// Lesson content per locale
// ---------------------------------------------------------------------------
const content: Record<Locale, Record<string, LessonText>> = {
  es: {
    '3.1': {
      title: 'Qué es un agente de AI',
      module: 'Tu Primer Agente de AI',
      concept: 'Los agentes de AI son software que lee tu código, entiende lo que quieres, y propone cambios. Son como un desarrollador junior muy rápido.\n\nNo te reemplazan — trabajan PARA ti. Ejemplos: Claude Code, GitHub Copilot, Codex.\n\nTú das la instrucción, ellos ejecutan. Tú revisas, tú apruebas.',
      analogy: 'Imagina un asistente que escribe muy rápido pero necesita que le digas exactamente qué hacer. Tú eres el jefe, él es el que teclea.',
      why: 'Entender qué son te ayuda a usarlos de forma efectiva sin miedo.',
      task: 'Presiona Enter para continuar',
    },
    '3.2': {
      title: 'Qué pueden y qué NO pueden hacer',
      module: 'Tu Primer Agente de AI',
      concept: 'Buenos para:\n  ✓ Cambios repetitivos (renombrar, reorganizar código existente)\n  ✓ Generar código repetitivo (ej: la estructura inicial de un proyecto)\n  ✓ Explicar código existente\n  ✓ Encontrar y corregir bugs\n\nMalos para:\n  ✗ Decisiones de negocio\n  ✗ Gusto de diseño\n  ✗ Conocer TU contexto específico\n  ✗ Decisiones de seguridad/autenticación\n\nCometen errores — por eso TÚ revisas todo.',
      why: 'Conocer los límites previene decepciones y errores.',
      task: 'Presiona Enter para continuar',
    },
    '3.3': {
      title: 'Cómo hablarle al agente',
      module: 'Tu Primer Agente de AI',
      concept: 'Sé específico. Da contexto. Di qué archivo.\n\nBuen prompt:\n  "En src/App.tsx, cambia el título de \'Hola\' a \'Bienvenido\'"\n\nMal prompt:\n  "hazlo mejor"\n\nEntre más contexto, mejor resultado.',
      why: 'La calidad de tu instrucción = la calidad del resultado.',
      task: 'Presiona Enter para continuar',
      simulateLines: [
        '❌ Prompt malo:  "arregla esto"',
        '   Resultado:   El agente no sabe qué arreglar.',
        '',
        '✅ Prompt bueno: "En src/App.tsx, cambia el color del botón de rojo a azul"',
        '   Resultado:   El agente cambia exactamente esa línea.',
      ],
      simulateDelay: 400,
    },
    '3.4': {
      title: 'Tu primera instrucción',
      module: 'Tu Primer Agente de AI',
      concept: 'Es hora de dar tu primera instrucción a un agente de AI. Vas a ver un escenario y tendrás que escribir qué le pedirías.\n\nEl agente te mostrará lo que haría y tú decidirás si aprobar o rechazar.',
      why: 'La práctica es la mejor forma de aprender. Equivocarse aquí es gratis.',
      task: 'Escribe tu instrucción para el agente',
    },
    '3.5': {
      title: 'Revisar el diff',
      module: 'Tu Primer Agente de AI',
      concept: 'Antes de aprobar cualquier cambio, SIEMPRE revisa el diff. Verifica:\n\n  1. ¿El archivo correcto fue modificado?\n  2. ¿Los cambios son lo que pediste?\n  3. ¿No se cambió nada extra?\n\nEn un diff: las líneas con "-" se eliminaron. Las líneas con "+" se agregaron. Así puedes ver exactamente qué cambió.',
      why: 'El diff es tu escudo. Nunca apruebes sin leerlo.',
      task: 'Revisa el diff y decide si aprobarlo',
    },
    '3.6': {
      title: 'Cuándo rechazar',
      module: 'Tu Primer Agente de AI',
      concept: 'A veces el agente se equivoca. Señales para rechazar:\n\n  - Editó el archivo equivocado\n  - Cambió más de lo que pediste\n  - El resultado no es lo que esperabas\n\nRechazar es NORMAL. Es parte del flujo.',
      why: 'Saber rechazar es tan importante como saber aprobar.',
      task: 'Revisa el diff y decide si aprobarlo o rechazarlo',
    },
    '3.7': {
      title: 'El sistema de permisos',
      module: 'Tu Primer Agente de AI',
      concept: 'Cada cambio que el agente propone, tú tienes que aprobar o rechazar. Tú eres el guardián.\n\nEl agente PREGUNTA antes de escribir. Nunca apruebes sin leer el diff.\n\nEsto es tu red de seguridad. Incluso los mejores agentes cometen errores.',
      why: 'Sin este control, un error del agente podría llegar directo a producción.',
      task: 'Presiona Enter para continuar',
    },
    '3.8': {
      title: 'Instrucciones complejas',
      module: 'Tu Primer Agente de AI',
      concept: 'Puedes pedir múltiples cosas en una sola instrucción. El agente intentará hacer todo.\n\nPero OJO: entre más pides, más tienes que verificar en el diff que TODO se hizo correctamente.',
      why: 'Las instrucciones complejas ahorran tiempo, pero requieren revisión más cuidadosa.',
      task: 'Revisa el diff con múltiples cambios',
    },
    '3.9': {
      title: 'Cuándo llamar a un humano',
      module: 'Tu Primer Agente de AI',
      concept: 'Señales de alerta:\n\n  🔴 El agente está confundido después de 2 intentos\n  🔴 Los cambios se ven incorrectos\n  🔴 No entiendes el diff\n  🔴 Cualquier cosa con seguridad/pagos/autenticación/base de datos\n\nCuando tengas duda, pregúntale a un desarrollador.',
      why: 'Saber cuándo parar es tan importante como saber empezar.',
      task: 'Presiona Enter para continuar',
    },
    '3.10': {
      title: 'Práctica: sesión completa',
      module: 'Tu Primer Agente de AI',
      concept: 'Vamos a simular una sesión completa con un agente. Tú das las instrucciones.',
      why: 'La repetición construye confianza.',
      task: '',
    },
    '3.11': {
      title: 'Quiz — Tu Primer Agente de AI',
      module: 'Tu Primer Agente de AI',
      concept: 'Veamos cuánto aprendiste sobre agentes de AI. 5 preguntas rápidas.',
      why: 'Responder preguntas refuerza lo aprendido. No te preocupes si fallas — es parte del proceso.',
      task: 'Usa ↑↓ para navegar y Enter para seleccionar',
    },
  },
  en: {
    '3.1': {
      title: 'What is an AI agent',
      module: 'Your First AI Agent',
      concept: 'AI agents are software that reads your code, understands what you want, and proposes changes. They\'re like a very fast junior developer.\n\nThey don\'t replace you — they work FOR you. Examples: Claude Code, GitHub Copilot, Codex.\n\nYou give the instruction, they execute. You review, you approve.',
      analogy: 'Imagine an assistant who types very fast but needs you to tell them exactly what to do. You\'re the boss, they\'re the one typing.',
      why: 'Understanding what they are helps you use them effectively without fear.',
      task: 'Press Enter to continue',
    },
    '3.2': {
      title: 'What they CAN and CAN\'T do',
      module: 'Your First AI Agent',
      concept: 'Good at:\n  ✓ Repetitive changes (rename, reorganize existing code)\n  ✓ Generating repetitive code (e.g., initial project structure)\n  ✓ Explaining existing code\n  ✓ Finding and fixing bugs\n\nBad at:\n  ✗ Business decisions\n  ✗ Design taste\n  ✗ Knowing YOUR specific context\n  ✗ Security/auth decisions\n\nThey make mistakes — that\'s why YOU review everything.',
      why: 'Knowing limitations prevents disappointment and mistakes.',
      task: 'Press Enter to continue',
    },
    '3.3': {
      title: 'How to talk to the agent',
      module: 'Your First AI Agent',
      concept: 'Be specific. Give context. Say which file.\n\nGood prompt:\n  "In src/App.tsx, change the title from \'Hello\' to \'Welcome\'"\n\nBad prompt:\n  "make it better"\n\nThe more context, the better the result.',
      why: 'The quality of your instruction = the quality of the result.',
      task: 'Press Enter to continue',
      simulateLines: [
        '❌ Bad prompt:  "fix this"',
        '   Result:     The agent doesn\'t know what to fix.',
        '',
        '✅ Good prompt: "In src/App.tsx, change the button color from red to blue"',
        '   Result:     The agent changes exactly that line.',
      ],
      simulateDelay: 400,
    },
    '3.4': {
      title: 'Your first instruction',
      module: 'Your First AI Agent',
      concept: 'It\'s time to give your first instruction to an AI agent. You\'ll see a scenario and you\'ll have to write what you\'d ask.\n\nThe agent will show you what it would do and you\'ll decide whether to approve or reject.',
      why: 'Practice is the best way to learn. Making mistakes here is free.',
      task: 'Write your instruction for the agent',
    },
    '3.5': {
      title: 'Review the diff',
      module: 'Your First AI Agent',
      concept: 'Before approving any change, ALWAYS review the diff. Check:\n\n  1. Was the correct file modified?\n  2. Are the changes what you asked for?\n  3. Was nothing extra changed?\n\nIn a diff: lines starting with "-" were removed. Lines with "+" were added. This shows you exactly what changed.',
      why: 'The diff is your shield. Never approve without reading it.',
      task: 'Review the diff and decide whether to approve',
    },
    '3.6': {
      title: 'When to reject',
      module: 'Your First AI Agent',
      concept: 'Sometimes the agent makes mistakes. Signs to reject:\n\n  - It edited the wrong file\n  - It changed more than you asked\n  - The result isn\'t what you expected\n\nRejecting is NORMAL. It\'s part of the flow.',
      why: 'Knowing when to reject is as important as knowing when to approve.',
      task: 'Review the diff and decide whether to approve or reject',
    },
    '3.7': {
      title: 'The permission system',
      module: 'Your First AI Agent',
      concept: 'Every change the agent proposes, you have to approve or reject. You are the gatekeeper.\n\nThe agent ASKS before writing. Never approve without reading the diff.\n\nThis is your safety net. Even the best agents make mistakes.',
      why: 'Without this control, an agent mistake could go straight to production.',
      task: 'Press Enter to continue',
    },
    '3.8': {
      title: 'Complex instructions',
      module: 'Your First AI Agent',
      concept: 'You can ask for multiple things in a single instruction. The agent will try to do everything.\n\nBut watch out: the more you ask, the more you need to verify in the diff that EVERYTHING was done correctly.',
      why: 'Complex instructions save time, but require more careful review.',
      task: 'Review the diff with multiple changes',
    },
    '3.9': {
      title: 'When to call a human',
      module: 'Your First AI Agent',
      concept: 'Red flags:\n\n  🔴 The agent is confused after 2 tries\n  🔴 The changes look wrong\n  🔴 You don\'t understand the diff\n  🔴 Anything involving security/payments/auth/database\n\nWhen in doubt, ask a developer.',
      why: 'Knowing when to stop is as important as knowing how to start.',
      task: 'Press Enter to continue',
    },
    '3.10': {
      title: 'Practice: full session',
      module: 'Your First AI Agent',
      concept: 'Let\'s simulate a full session with an agent. You give the instructions.',
      why: 'Repetition builds confidence.',
      task: '',
    },
    '3.11': {
      title: 'Quiz — Your First AI Agent',
      module: 'Your First AI Agent',
      concept: 'Let\'s see how much you learned about AI agents. 5 quick questions.',
      why: 'Answering questions reinforces what you learned. Don\'t worry if you miss some — it\'s part of the process.',
      task: 'Use ↑↓ to navigate and Enter to select',
    },
  },
  fr: {
    '3.1': {
      title: 'Qu\'est-ce qu\'un agent IA',
      module: 'Ton Premier Agent IA',
      concept: 'Les agents IA sont des logiciels qui lisent ton code, comprennent ce que tu veux, et proposent des changements. C\'est comme un développeur junior très rapide.\n\nIls ne te remplacent pas — ils travaillent POUR toi. Exemples : Claude Code, GitHub Copilot, Codex.\n\nTu donnes l\'instruction, ils exécutent. Tu vérifies, tu approuves.',
      analogy: 'Imagine un assistant qui tape très vite mais a besoin que tu lui dises exactement quoi faire. Tu es le chef, lui c\'est celui qui tape.',
      why: 'Comprendre ce qu\'ils sont t\'aide à les utiliser efficacement sans peur.',
      task: 'Appuie sur Entrée pour continuer',
    },
    '3.2': {
      title: 'Ce qu\'ils PEUVENT et NE PEUVENT PAS faire',
      module: 'Ton Premier Agent IA',
      concept: 'Bons pour :\n  ✓ Changements répétitifs (renommer, réorganiser du code existant)\n  ✓ Générer du code répétitif (ex : la structure initiale d\'un projet)\n  ✓ Expliquer du code existant\n  ✓ Trouver et corriger des bugs\n\nMauvais pour :\n  ✗ Décisions business\n  ✗ Goût du design\n  ✗ Connaître TON contexte spécifique\n  ✗ Décisions de sécurité/authentification\n\nIls font des erreurs — c\'est pourquoi TU vérifies tout.',
      why: 'Connaître les limites évite les déceptions et les erreurs.',
      task: 'Appuie sur Entrée pour continuer',
    },
    '3.3': {
      title: 'Comment parler à l\'agent',
      module: 'Ton Premier Agent IA',
      concept: 'Sois spécifique. Donne du contexte. Dis quel fichier.\n\nBon prompt :\n  "Dans src/App.tsx, change le titre de \'Bonjour\' à \'Bienvenue\'"\n\nMauvais prompt :\n  "améliore ça"\n\nPlus tu donnes de contexte, meilleur sera le résultat.',
      why: 'La qualité de ton instruction = la qualité du résultat.',
      task: 'Appuie sur Entrée pour continuer',
      simulateLines: [
        '❌ Mauvais prompt : "corrige ça"',
        '   Résultat :      L\'agent ne sait pas quoi corriger.',
        '',
        '✅ Bon prompt :     "Dans src/App.tsx, change la couleur du bouton de rouge à bleu"',
        '   Résultat :      L\'agent change exactement cette ligne.',
      ],
      simulateDelay: 400,
    },
    '3.4': {
      title: 'Ta première instruction',
      module: 'Ton Premier Agent IA',
      concept: 'C\'est le moment de donner ta première instruction à un agent IA. Tu vas voir un scénario et tu devras écrire ce que tu demanderais.\n\nL\'agent te montrera ce qu\'il ferait et tu décideras d\'approuver ou de rejeter.',
      why: 'La pratique est la meilleure façon d\'apprendre. Se tromper ici est gratuit.',
      task: 'Écris ton instruction pour l\'agent',
    },
    '3.5': {
      title: 'Vérifier le diff',
      module: 'Ton Premier Agent IA',
      concept: 'Avant d\'approuver un changement, TOUJOURS vérifier le diff. Vérifie :\n\n  1. Le bon fichier a-t-il été modifié ?\n  2. Les changements sont-ils ce que tu as demandé ?\n  3. Rien d\'extra n\'a été changé ?\n\nDans un diff : les lignes commençant par "-" ont été supprimées. Celles avec "+" ont été ajoutées. Tu vois exactement ce qui a changé.',
      why: 'Le diff est ton bouclier. N\'approuve jamais sans le lire.',
      task: 'Vérifie le diff et décide si tu approuves',
    },
    '3.6': {
      title: 'Quand rejeter',
      module: 'Ton Premier Agent IA',
      concept: 'Parfois l\'agent se trompe. Signes pour rejeter :\n\n  - Il a modifié le mauvais fichier\n  - Il a changé plus que ce que tu as demandé\n  - Le résultat n\'est pas ce que tu attendais\n\nRejeter est NORMAL. Ça fait partie du flux.',
      why: 'Savoir rejeter est aussi important que savoir approuver.',
      task: 'Vérifie le diff et décide si tu approuves ou rejettes',
    },
    '3.7': {
      title: 'Le système de permissions',
      module: 'Ton Premier Agent IA',
      concept: 'Chaque changement que l\'agent propose, tu dois approuver ou rejeter. Tu es le gardien.\n\nL\'agent DEMANDE avant d\'écrire. N\'approuve jamais sans lire le diff.\n\nC\'est ton filet de sécurité. Même les meilleurs agents font des erreurs.',
      why: 'Sans ce contrôle, une erreur de l\'agent pourrait aller directement en production.',
      task: 'Appuie sur Entrée pour continuer',
    },
    '3.8': {
      title: 'Instructions complexes',
      module: 'Ton Premier Agent IA',
      concept: 'Tu peux demander plusieurs choses en une seule instruction. L\'agent essaiera de tout faire.\n\nMais attention : plus tu demandes, plus tu dois vérifier dans le diff que TOUT a été fait correctement.',
      why: 'Les instructions complexes font gagner du temps, mais demandent une vérification plus attentive.',
      task: 'Vérifie le diff avec plusieurs changements',
    },
    '3.9': {
      title: 'Quand appeler un humain',
      module: 'Ton Premier Agent IA',
      concept: 'Signaux d\'alerte :\n\n  🔴 L\'agent est confus après 2 tentatives\n  🔴 Les changements semblent incorrects\n  🔴 Tu ne comprends pas le diff\n  🔴 Tout ce qui touche à la sécurité/paiements/authentification/base de données\n\nEn cas de doute, demande à un développeur.',
      why: 'Savoir quand s\'arrêter est aussi important que savoir commencer.',
      task: 'Appuie sur Entrée pour continuer',
    },
    '3.10': {
      title: 'Pratique : session complète',
      module: 'Ton Premier Agent IA',
      concept: 'Simulons une session complète avec un agent. Tu donnes les instructions.',
      why: 'La répétition construit la confiance.',
      task: '',
    },
    '3.11': {
      title: 'Quiz — Ton Premier Agent IA',
      module: 'Ton Premier Agent IA',
      concept: 'Voyons combien tu as appris sur les agents IA. 5 questions rapides.',
      why: 'Répondre à des questions renforce ce que tu as appris. Ne t\'inquiète pas si tu en rates — ça fait partie du processus.',
      task: 'Utilise ↑↓ pour naviguer et Entrée pour sélectionner',
    },
  },
};

// ---------------------------------------------------------------------------
// Quiz
// ---------------------------------------------------------------------------
interface QuizQuestionData {
  question: string;
  options: string[];
  correct: number;
  explanation: string;
}

const quizModule3: Record<Locale, QuizQuestionData[]> = {
  es: [
    { question: '¿Qué debe incluir un buen prompt?', options: ['El archivo específico + qué cambiar', 'Solo "arréglalo"', '"Hazlo mejor"', 'El agente lo adivinará'], correct: 0, explanation: 'Entre más específico seas con el archivo y el cambio, mejor resultado obtienes.' },
    { question: '¿Cuándo debes rechazar un cambio?', options: ['Cuando el cambio es muy pequeño', 'Siempre', 'Cuando el agente editó el archivo equivocado', 'Nunca'], correct: 2, explanation: 'Si el archivo es incorrecto, el cambio es incorrecto. Siempre verifica el nombre del archivo.' },
    { question: '¿Qué NO pueden hacer bien los agentes de AI?', options: ['Escribir código', 'Tomar decisiones de negocio', 'Leer archivos', 'Explicar código'], correct: 1, explanation: 'Los agentes no conocen tu negocio ni tus usuarios. Esas decisiones son tuyas.' },
    { question: '¿Qué debes hacer SIEMPRE antes de aprobar?', options: ['Confiar en el agente', 'Cerrar la terminal', 'Ejecutar git push', 'Leer el diff'], correct: 3, explanation: 'El diff es tu protección. Nunca apruebes sin revisarlo.' },
    { question: '¿Cuándo debes llamar a un desarrollador humano?', options: ['Para cada cambio', 'Cuando el agente está confundido después de 2 intentos', 'Solo los viernes', 'Nunca'], correct: 1, explanation: 'Si el agente no puede resolverlo en 2 intentos, probablemente necesitas ayuda humana.' },
  ],
  en: [
    { question: 'What should a good prompt include?', options: ['Specific file + what to change', 'Just "fix it"', '"Make it better"', 'The agent will figure it out'], correct: 0, explanation: 'The more specific you are with the file and the change, the better the result.' },
    { question: 'When should you reject a change?', options: ['When the change is too small', 'Always', 'When the agent edited the wrong file', 'Never'], correct: 2, explanation: 'If the file is wrong, the change is wrong. Always check the filename.' },
    { question: 'What can AI agents NOT do well?', options: ['Write code', 'Make business decisions', 'Read files', 'Explain code'], correct: 1, explanation: 'Agents don\'t know your business or your users. Those decisions are yours.' },
    { question: 'What should you always do before approving?', options: ['Trust the agent', 'Close the terminal', 'Run git push', 'Read the diff'], correct: 3, explanation: 'The diff is your protection. Never approve without reviewing it.' },
    { question: 'When should you call a human developer?', options: ['For every change', 'When the agent is confused after 2 tries', 'Only on Fridays', 'Never'], correct: 1, explanation: 'If the agent can\'t solve it in 2 tries, you probably need human help.' },
  ],
  fr: [
    { question: 'Que doit inclure un bon prompt ?', options: ['Le fichier spécifique + quoi changer', 'Juste "corrige ça"', '"Améliore ça"', 'L\'agent devinera'], correct: 0, explanation: 'Plus tu es spécifique avec le fichier et le changement, meilleur sera le résultat.' },
    { question: 'Quand dois-tu rejeter un changement ?', options: ['Quand le changement est trop petit', 'Toujours', 'Quand l\'agent a modifié le mauvais fichier', 'Jamais'], correct: 2, explanation: 'Si le fichier est incorrect, le changement est incorrect. Vérifie toujours le nom du fichier.' },
    { question: 'Que NE PEUVENT PAS bien faire les agents IA ?', options: ['Écrire du code', 'Prendre des décisions business', 'Lire des fichiers', 'Expliquer du code'], correct: 1, explanation: 'Les agents ne connaissent pas ton business ni tes utilisateurs. Ces décisions sont les tiennes.' },
    { question: 'Que dois-tu TOUJOURS faire avant d\'approuver ?', options: ['Faire confiance à l\'agent', 'Fermer le terminal', 'Exécuter git push', 'Lire le diff'], correct: 3, explanation: 'Le diff est ta protection. N\'approuve jamais sans le vérifier.' },
    { question: 'Quand dois-tu appeler un développeur humain ?', options: ['Pour chaque changement', 'Quand l\'agent est confus après 2 tentatives', 'Seulement le vendredi', 'Jamais'], correct: 1, explanation: 'Si l\'agent ne peut pas le résoudre en 2 tentatives, tu as probablement besoin d\'aide humaine.' },
  ],
};

// ---------------------------------------------------------------------------
// Practice steps
// ---------------------------------------------------------------------------
const practiceModule3: Record<Locale, CommandStep[]> = {
  es: [
    { challenge: 'Pídele al agente que cambie un color', command: 'cambiar color', acceptPattern: 'cambia|color|change', output: ['El agente propone el cambio...', 'Cambio aplicado.'], hint1: 'Escribe una instrucción natural, como si hablaras con alguien...', hint2: 'Ejemplo: cambia el color del botón a azul' },
    { challenge: 'Revisa qué cambió el agente', command: 'git diff', output: ['diff --git a/src/Button.tsx b/src/Button.tsx', '-  color: red;', '+  color: blue;'], hint1: 'El comando que muestra diferencias exactas...', hint2: 'El comando es git diff' },
    { challenge: 'Guarda los cambios', command: 'git add .', output: ['Archivos preparados para commit.'], hint1: 'El comando para agregar todos los archivos...', hint2: 'El comando es git add .' },
  ],
  en: [
    { challenge: 'Ask the agent to change a color', command: 'change color', acceptPattern: 'change|color|cambia', output: ['The agent proposes the change...', 'Change applied.'], hint1: 'Write a natural instruction, like talking to someone...', hint2: 'Example: change the button color to blue' },
    { challenge: 'Check what the agent changed', command: 'git diff', output: ['diff --git a/src/Button.tsx b/src/Button.tsx', '-  color: red;', '+  color: blue;'], hint1: 'The command that shows exact differences...', hint2: 'The command is git diff' },
    { challenge: 'Save the changes', command: 'git add .', output: ['Files staged for commit.'], hint1: 'The command to add all files...', hint2: 'The command is git add .' },
  ],
  fr: [
    { challenge: 'Demande à l\'agent de changer une couleur', command: 'changer couleur', acceptPattern: 'change|couleur|color', output: ['L\'agent propose le changement...', 'Changement appliqué.'], hint1: 'Écris une instruction naturelle, comme si tu parlais à quelqu\'un...', hint2: 'Exemple : change la couleur du bouton en bleu' },
    { challenge: 'Vérifie ce que l\'agent a changé', command: 'git diff', output: ['diff --git a/src/Button.tsx b/src/Button.tsx', '-  color: red;', '+  color: blue;'], hint1: 'La commande qui montre les différences exactes...', hint2: 'La commande est git diff' },
    { challenge: 'Sauvegarde les changements', command: 'git add .', output: ['Fichiers préparés pour le commit.'], hint1: 'La commande pour ajouter tous les fichiers...', hint2: 'La commande est git add .' },
  ],
};

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------
function buildSimulate(c: LessonText) {
  if (!c.simulateLines) return undefined;
  return { lines: c.simulateLines, delay: c.simulateDelay };
}

// ---------------------------------------------------------------------------
// Factory
// ---------------------------------------------------------------------------
export function getModule3Lessons(locale: Locale): Lesson[] {
  const c = content[locale];
  const m = msg[locale];
  const a = agentSims[locale];

  return [
    // 3.1 — concept only
    {
      id: '3.1',
      ...c['3.1']!,
      validate: () => ({ valid: true, message: '' }),
    },
    // 3.2 — concept only
    {
      id: '3.2',
      ...c['3.2']!,
      validate: () => ({ valid: true, message: '' }),
    },
    // 3.3 — concept + simulate
    {
      id: '3.3',
      ...c['3.3']!,
      validate: () => ({ valid: true, message: m['3.3'].ok }),
      simulate: buildSimulate(c['3.3']!),
    },
    // 3.4 — agent simulation
    {
      id: '3.4',
      ...c['3.4']!,
      interactive: 'agent-simulation',
      validate: () => ({ valid: true, message: m['3.4'].ok }),
      agentSimulation: {
        scenario: a['3.4']!.scenario,
        promptHint: a['3.4']!.promptHint,
        acceptedPatterns: ['button', 'text', 'get started|empezar|commencer'],
        agentResponse: a['3.4']!.agentResponse,
        diffLines: a['3.4']!.diffLines,
        approveIsCorrect: true,
        explanation: a['3.4']!.explanation,
      },
    },
    // 3.5 — agent simulation
    {
      id: '3.5',
      ...c['3.5']!,
      interactive: 'agent-simulation',
      validate: () => ({ valid: true, message: m['3.5'].ok }),
      agentSimulation: {
        scenario: a['3.5']!.scenario,
        promptHint: a['3.5']!.promptHint,
        acceptedPatterns: ['color', 'background', 'card', 'blue|azul|bleu'],
        agentResponse: a['3.5']!.agentResponse,
        diffLines: a['3.5']!.diffLines,
        approveIsCorrect: true,
        explanation: a['3.5']!.explanation,
      },
    },
    // 3.6 — agent simulation (reject)
    {
      id: '3.6',
      ...c['3.6']!,
      interactive: 'agent-simulation',
      validate: () => ({ valid: true, message: m['3.6'].ok }),
      agentSimulation: {
        scenario: a['3.6']!.scenario,
        promptHint: a['3.6']!.promptHint,
        acceptedPatterns: ['title', 'titulo|titre', 'home|inicio|accueil'],
        agentResponse: a['3.6']!.agentResponse,
        diffLines: a['3.6']!.diffLines,
        approveIsCorrect: false,
        explanation: a['3.6']!.explanation,
      },
    },
    // 3.7 — concept only
    {
      id: '3.7',
      ...c['3.7']!,
      validate: () => ({ valid: true, message: '' }),
    },
    // 3.8 — agent simulation
    {
      id: '3.8',
      ...c['3.8']!,
      interactive: 'agent-simulation',
      validate: () => ({ valid: true, message: m['3.8'].ok }),
      agentSimulation: {
        scenario: a['3.8']!.scenario,
        promptHint: a['3.8']!.promptHint,
        acceptedPatterns: ['title', 'bold|negritas|gras', 'change|cambiar|changer'],
        agentResponse: a['3.8']!.agentResponse,
        diffLines: a['3.8']!.diffLines,
        approveIsCorrect: true,
        explanation: a['3.8']!.explanation,
      },
    },
    // 3.9 — concept only
    {
      id: '3.9',
      ...c['3.9']!,
      validate: () => ({ valid: true, message: '' }),
    },
    // 3.10 — practice steps
    {
      id: '3.10',
      ...c['3.10']!,
      validate: () => ({ valid: true, message: m['3.10'].ok }),
      practiceSteps: practiceModule3[locale],
    },
    // 3.11 — quiz
    {
      id: '3.11',
      ...c['3.11']!,
      validate: () => ({ valid: true, message: '' }),
      quizQuestions: quizModule3[locale],
    },
  ];
}
