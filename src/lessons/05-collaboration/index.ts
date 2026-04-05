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
    '5.1': { ok: 'Entendido.' },
    '5.2': { ok: 'Buenos nombres, mejor equipo.' },
    '5.3': { ok: 'Tus cambios ya están en el servidor.', fail: 'Escribe git push y presiona Enter' },
    '5.4': { ok: 'Entendido.' },
    '5.5': { ok: 'PR creado.', fail: 'Escribe el comando completo de gh pr create' },
    '5.6': { ok: 'Entendido.' },
    '5.7': { ok: 'Entendido.' },
    '5.8': { ok: 'Entendido.' },
    '5.9': { ok: 'Entendido.' },
    '5.10': { ok: 'Flujo completo.' },
    '5.11': { ok: 'Completaste el Módulo 5.' },
  },
  en: {
    '5.1': { ok: 'Got it.' },
    '5.2': { ok: 'Good names, better teamwork.' },
    '5.3': { ok: 'Your changes are now on the server.', fail: 'Type git push and press Enter' },
    '5.4': { ok: 'Got it.' },
    '5.5': { ok: 'PR created.', fail: 'Type the full gh pr create command' },
    '5.6': { ok: 'Got it.' },
    '5.7': { ok: 'Got it.' },
    '5.8': { ok: 'Got it.' },
    '5.9': { ok: 'Got it.' },
    '5.10': { ok: 'Flow completed.' },
    '5.11': { ok: 'You completed Module 5.' },
  },
  fr: {
    '5.1': { ok: 'Compris.' },
    '5.2': { ok: 'Bons noms, meilleure équipe.' },
    '5.3': { ok: 'Tes changements sont maintenant sur le serveur.', fail: 'Tape git push et appuie sur Entrée' },
    '5.4': { ok: 'Compris.' },
    '5.5': { ok: 'PR créé.', fail: 'Tape la commande complète de gh pr create' },
    '5.6': { ok: 'Compris.' },
    '5.7': { ok: 'Compris.' },
    '5.8': { ok: 'Compris.' },
    '5.9': { ok: 'Compris.' },
    '5.10': { ok: 'Flux terminé.' },
    '5.11': { ok: 'Tu as terminé le Module 5.' },
  },
} as const;

const content: Record<Locale, Record<string, LessonText>> = {
  es: {
    '5.1': {
      title: 'Trabajar con otros',
      module: 'Colaborar con el equipo',
      concept: 'Tu código afecta a otros. Cuando trabajas en equipo, cada cambio que haces puede impactar el trabajo de tus compañeros.\n\nPor eso siempre trabajamos en ramas (branches) y creamos PRs antes de mezclar con main.',
      analogy: 'Es como escribir en un borrador antes de publicar. No editas directamente el periódico — primero revisas.',
      why: 'Si todos editan main directamente, los cambios se pisan entre sí y nadie sabe quién rompió qué.',
      task: 'Presiona Enter para continuar',
    },
    '5.2': {
      title: 'Buenos nombres de rama',
      module: 'Colaborar con el equipo',
      concept: 'Las ramas tienen convenciones de nombres:\n\n  feature/add-login     — nueva funcionalidad\n  fix/broken-button     — arreglar un bug\n  docs/update-readme    — documentación\n\nMalos ejemplos: mi-rama, asdf, test123, main2',
      why: 'Un buen nombre le dice a tu equipo QUÉ estás haciendo sin tener que preguntar.',
      task: 'Presiona Enter para continuar',
      simulateLines: [
        '',
        '  ✓ feature/add-login',
        '  ✓ fix/broken-button',
        '  ✓ docs/update-readme',
        '',
        '  ✗ mi-rama',
        '  ✗ asdf',
        '  ✗ test123',
      ],
      simulateDelay: 150,
    },
    '5.3': {
      title: 'git push — Subir tus cambios',
      module: 'Colaborar con el equipo',
      concept: 'git push sube tu rama al servidor (GitHub, GitLab, etc.).\n\nHasta que no haces push, tus cambios solo existen en tu computadora. Tu equipo no puede verlos.',
      why: 'Si tu computadora se rompe y no hiciste push, perdiste todo. Push = respaldo + colaboración.',
      task: 'Escribe git push y presiona Enter',
      hint: 'El opuesto de pull...',
      simulateLines: [
        'Enumerating objects: 5, done.',
        'Counting objects: 100% (5/5), done.',
        'Writing objects: 100% (3/3), 312 bytes | 312.00 KiB/s, done.',
        'Total 3 (delta 1), reused 0 (delta 0)',
        'remote: Resolving deltas: 100% (1/1), completed with 1 local object.',
        'To https://github.com/tu-equipo/mi-app.git',
        '   a1b2c3d..e4f5g6h  feature/update-copy -> feature/update-copy',
      ],
      simulateDelay: 120,
    },
    '5.4': {
      title: '¿Qué es un PR?',
      module: 'Colaborar con el equipo',
      concept: 'PR = Pull Request. Es decirle a tu equipo: "Hey, revisen mis cambios antes de que vayan a main."\n\nUn PR muestra exactamente qué líneas cambiaste, y tu equipo puede comentar, aprobar o pedir cambios.',
      analogy: 'Es como mostrar tu borrador a un colega antes de publicar. "¿Se ve bien? ¿Me faltó algo?"',
      why: 'Los PRs evitan que errores lleguen a producción. Dos ojos ven más que uno.',
      task: 'Presiona Enter para continuar',
    },
    '5.5': {
      title: 'Crear un PR con gh',
      module: 'Colaborar con el equipo',
      concept: 'gh es la herramienta de GitHub para la terminal. Con un solo comando creas un PR sin abrir el navegador.\n\nEl título dice QUÉ hiciste. El body dice POR QUÉ y CÓMO probarlo.',
      why: 'Crear PRs desde la terminal es más rápido y te mantiene en el flujo de trabajo.',
      task: 'Escribe el comando para crear un PR',
      hint: 'gh pr create --title "..." --body "..."',
      simulateLines: [
        '',
        'Creating pull request for feature/update-copy into main in tu-equipo/mi-app',
        '',
        'https://github.com/tu-equipo/mi-app/pull/42',
      ],
      simulateDelay: 200,
    },
    '5.6': {
      title: 'Buenas descripciones de PR',
      module: 'Colaborar con el equipo',
      concept: 'Un buen PR describe:\n\n  • Qué cambió — "Actualicé el título y subtítulo del homepage"\n  • Por qué — "El equipo de marketing pidió nuevo copy"\n  • Cómo probarlo — "Abrir / y verificar el texto"\n\nMantén la descripción corta y clara. No escribas un ensayo.',
      why: 'Si tu reviewer no entiende el PR en 30 segundos, algo anda mal.',
      task: 'Presiona Enter para continuar',
    },
    '5.7': {
      title: 'Code review básico',
      module: 'Colaborar con el equipo',
      concept: 'Cuando revisas un PR, busca:\n\n  • ¿El diff coincide con la descripción?\n  • ¿Hay errores obvios?\n  • ¿El cambio es pequeño y enfocado?\n\nNo necesitas ser experto para revisar. Si algo no se ve bien, pregunta.',
      why: 'El code review no es para criticar — es para proteger al equipo de errores.',
      task: 'Presiona Enter para continuar',
    },
    '5.8': {
      title: 'Cuándo NO usar el agente',
      module: 'Colaborar con el equipo',
      concept: 'No uses un agente de AI para:\n\n  • Seguridad y autenticación\n  • Pagos y facturación\n  • Migraciones de base de datos\n  • Deploys a producción\n\nCuando las consecuencias son grandes, un humano debe decidir.',
      why: 'Los agentes son increíbles para tareas repetitivas, pero no entienden las consecuencias de negocio.',
      task: 'Presiona Enter para continuar',
    },
    '5.9': {
      title: 'Cuándo pedir ayuda',
      module: 'Colaborar con el equipo',
      concept: 'Pide ayuda a un developer cuando:\n\n  • Un error no se resuelve después de 2 intentos\n  • El agente sigue fallando\n  • Cualquier cosa que toque producción\n  • Te sientes inseguro sobre un cambio\n\nPedir ayuda no es debilidad — es profesionalismo.',
      why: 'Es mejor preguntar y aprender que romper algo y tener que arreglarlo a las 3am.',
      task: 'Presiona Enter para continuar',
    },
    '5.10': {
      title: 'Práctica — Flujo completo',
      module: 'Colaborar con el equipo',
      concept: 'Vamos a practicar el flujo completo: crear rama, seleccionar archivos, guardar y subir.',
      why: 'Te voy a dar instrucciones y tú decides qué comando usar.',
      task: '',
    },
    '5.11': {
      title: 'Quiz — Colaborar con el equipo',
      module: 'Colaborar con el equipo',
      concept: 'Veamos cuánto aprendiste. 5 preguntas rápidas sobre lo que practicaste.',
      why: 'Responder preguntas refuerza lo que aprendiste. No te preocupes si fallas alguna — es parte del proceso.',
      task: 'Usa ↑↓ para navegar y Enter para seleccionar',
    },
  },
  en: {
    '5.1': {
      title: 'Working with others',
      module: 'Collaborate with your team',
      concept: 'Your code affects others. When you work on a team, every change you make can impact your teammates\u2019 work.\n\nThat\u2019s why we always work on branches and create PRs before merging into main.',
      analogy: 'It\u2019s like writing on a draft before publishing. You don\u2019t edit the newspaper directly \u2014 you review first.',
      why: 'If everyone edits main directly, changes overwrite each other and nobody knows who broke what.',
      task: 'Press Enter to continue',
    },
    '5.2': {
      title: 'Good branch names',
      module: 'Collaborate with your team',
      concept: 'Branches follow naming conventions:\n\n  feature/add-login     \u2014 new feature\n  fix/broken-button     \u2014 fixing a bug\n  docs/update-readme    \u2014 documentation\n\nBad examples: my-branch, asdf, test123, main2',
      why: 'A good name tells your team WHAT you\u2019re doing without having to ask.',
      task: 'Press Enter to continue',
      simulateLines: [
        '',
        '  \u2713 feature/add-login',
        '  \u2713 fix/broken-button',
        '  \u2713 docs/update-readme',
        '',
        '  \u2717 my-branch',
        '  \u2717 asdf',
        '  \u2717 test123',
      ],
      simulateDelay: 150,
    },
    '5.3': {
      title: 'git push \u2014 Upload your changes',
      module: 'Collaborate with your team',
      concept: 'git push uploads your branch to the server (GitHub, GitLab, etc.).\n\nUntil you push, your changes only exist on your computer. Your team can\u2019t see them.',
      why: 'If your computer breaks and you didn\u2019t push, you lost everything. Push = backup + collaboration.',
      task: 'Type git push and press Enter',
      hint: 'The opposite of pull...',
      simulateLines: [
        'Enumerating objects: 5, done.',
        'Counting objects: 100% (5/5), done.',
        'Writing objects: 100% (3/3), 312 bytes | 312.00 KiB/s, done.',
        'Total 3 (delta 1), reused 0 (delta 0)',
        'remote: Resolving deltas: 100% (1/1), completed with 1 local object.',
        'To https://github.com/your-team/my-app.git',
        '   a1b2c3d..e4f5g6h  feature/update-copy -> feature/update-copy',
      ],
      simulateDelay: 120,
    },
    '5.4': {
      title: 'What is a PR?',
      module: 'Collaborate with your team',
      concept: 'PR = Pull Request. It\u2019s telling your team: "Hey, review my changes before they go to main."\n\nA PR shows exactly which lines you changed, and your team can comment, approve, or request changes.',
      analogy: 'It\u2019s like showing your draft to a colleague before publishing. "Does this look good? Did I miss anything?"',
      why: 'PRs prevent bugs from reaching production. Two eyes see more than one.',
      task: 'Press Enter to continue',
    },
    '5.5': {
      title: 'Create a PR with gh',
      module: 'Collaborate with your team',
      concept: 'gh is GitHub\u2019s terminal tool. With one command you create a PR without opening a browser.\n\nThe title says WHAT you did. The body says WHY and HOW to test it.',
      why: 'Creating PRs from the terminal is faster and keeps you in the workflow.',
      task: 'Type the command to create a PR',
      hint: 'gh pr create --title "..." --body "..."',
      simulateLines: [
        '',
        'Creating pull request for feature/update-copy into main in your-team/my-app',
        '',
        'https://github.com/your-team/my-app/pull/42',
      ],
      simulateDelay: 200,
    },
    '5.6': {
      title: 'Good PR descriptions',
      module: 'Collaborate with your team',
      concept: 'A good PR describes:\n\n  \u2022 What changed \u2014 "Updated the homepage title and subtitle"\n  \u2022 Why \u2014 "Marketing team requested new copy"\n  \u2022 How to test \u2014 "Open / and verify the text"\n\nKeep the description short and clear. Don\u2019t write an essay.',
      why: 'If your reviewer doesn\u2019t understand the PR in 30 seconds, something is wrong.',
      task: 'Press Enter to continue',
    },
    '5.7': {
      title: 'Basic code review',
      module: 'Collaborate with your team',
      concept: 'When you review a PR, look for:\n\n  \u2022 Does the diff match the description?\n  \u2022 Any obvious errors?\n  \u2022 Is the change small and focused?\n\nYou don\u2019t need to be an expert to review. If something doesn\u2019t look right, ask.',
      why: 'Code review isn\u2019t about criticizing \u2014 it\u2019s about protecting the team from mistakes.',
      task: 'Press Enter to continue',
    },
    '5.8': {
      title: 'When NOT to use the agent',
      module: 'Collaborate with your team',
      concept: 'Don\u2019t use an AI agent for:\n\n  \u2022 Security and authentication\n  \u2022 Payments and billing\n  \u2022 Database migrations\n  \u2022 Production deploys\n\nWhen the stakes are high, a human should decide.',
      why: 'Agents are amazing for repetitive tasks, but they don\u2019t understand business consequences.',
      task: 'Press Enter to continue',
    },
    '5.9': {
      title: 'When to ask for help',
      module: 'Collaborate with your team',
      concept: 'Ask a developer for help when:\n\n  \u2022 An error doesn\u2019t resolve after 2 tries\n  \u2022 The agent keeps failing\n  \u2022 Anything that touches production\n  \u2022 You feel unsure about a change\n\nAsking for help isn\u2019t weakness \u2014 it\u2019s professionalism.',
      why: 'It\u2019s better to ask and learn than to break something and have to fix it at 3am.',
      task: 'Press Enter to continue',
    },
    '5.10': {
      title: 'Practice \u2014 Full flow',
      module: 'Collaborate with your team',
      concept: 'Let\u2019s practice the full flow: create a branch, select files, save, and upload.',
      why: 'I\u2019ll give you instructions and you decide which command to use.',
      task: '',
    },
    '5.11': {
      title: 'Quiz \u2014 Collaborate with your team',
      module: 'Collaborate with your team',
      concept: 'Let\u2019s see how much you learned. 5 quick questions about what you practiced.',
      why: 'Answering questions reinforces what you learned. Don\u2019t worry if you miss some \u2014 it\u2019s part of the process.',
      task: 'Use \u2191\u2193 to navigate and Enter to select',
    },
  },
  fr: {
    '5.1': {
      title: 'Travailler avec les autres',
      module: 'Collaborer avec ton \u00e9quipe',
      concept: 'Ton code affecte les autres. Quand tu travailles en \u00e9quipe, chaque changement que tu fais peut impacter le travail de tes coll\u00e8gues.\n\nC\u2019est pourquoi on travaille toujours sur des branches et on cr\u00e9e des PRs avant de fusionner avec main.',
      analogy: 'C\u2019est comme \u00e9crire un brouillon avant de publier. Tu ne modifies pas directement le journal \u2014 tu relis d\u2019abord.',
      why: 'Si tout le monde modifie main directement, les changements s\u2019\u00e9crasent et personne ne sait qui a cass\u00e9 quoi.',
      task: 'Appuie sur Entr\u00e9e pour continuer',
    },
    '5.2': {
      title: 'Bons noms de branche',
      module: 'Collaborer avec ton \u00e9quipe',
      concept: 'Les branches suivent des conventions de nommage :\n\n  feature/add-login     \u2014 nouvelle fonctionnalit\u00e9\n  fix/broken-button     \u2014 corriger un bug\n  docs/update-readme    \u2014 documentation\n\nMauvais exemples : ma-branche, asdf, test123, main2',
      why: 'Un bon nom dit \u00e0 ton \u00e9quipe CE QUE tu fais sans avoir \u00e0 demander.',
      task: 'Appuie sur Entr\u00e9e pour continuer',
      simulateLines: [
        '',
        '  \u2713 feature/add-login',
        '  \u2713 fix/broken-button',
        '  \u2713 docs/update-readme',
        '',
        '  \u2717 ma-branche',
        '  \u2717 asdf',
        '  \u2717 test123',
      ],
      simulateDelay: 150,
    },
    '5.3': {
      title: 'git push \u2014 Envoyer tes changements',
      module: 'Collaborer avec ton \u00e9quipe',
      concept: 'git push envoie ta branche au serveur (GitHub, GitLab, etc.).\n\nTant que tu ne fais pas push, tes changements n\u2019existent que sur ton ordinateur. Ton \u00e9quipe ne peut pas les voir.',
      why: 'Si ton ordinateur tombe en panne et que tu n\u2019as pas fait push, tu as tout perdu. Push = sauvegarde + collaboration.',
      task: 'Tape git push et appuie sur Entr\u00e9e',
      hint: 'L\'opposé de pull...',
      simulateLines: [
        'Enumerating objects: 5, done.',
        'Counting objects: 100% (5/5), done.',
        'Writing objects: 100% (3/3), 312 bytes | 312.00 KiB/s, done.',
        'Total 3 (delta 1), reused 0 (delta 0)',
        'remote: Resolving deltas: 100% (1/1), completed with 1 local object.',
        'To https://github.com/ton-equipe/mon-app.git',
        '   a1b2c3d..e4f5g6h  feature/update-copy -> feature/update-copy',
      ],
      simulateDelay: 120,
    },
    '5.4': {
      title: 'C\u2019est quoi un PR ?',
      module: 'Collaborer avec ton \u00e9quipe',
      concept: 'PR = Pull Request. C\u2019est dire \u00e0 ton \u00e9quipe : "H\u00e9, v\u00e9rifiez mes changements avant qu\u2019ils aillent dans main."\n\nUn PR montre exactement quelles lignes tu as chang\u00e9es, et ton \u00e9quipe peut commenter, approuver ou demander des modifications.',
      analogy: 'C\u2019est comme montrer ton brouillon \u00e0 un coll\u00e8gue avant de publier. "\u00c7a a l\u2019air bien ? J\u2019ai oubli\u00e9 quelque chose ?"',
      why: 'Les PRs emp\u00eachent les bugs d\u2019arriver en production. Deux yeux voient plus qu\u2019un seul.',
      task: 'Appuie sur Entr\u00e9e pour continuer',
    },
    '5.5': {
      title: 'Cr\u00e9er un PR avec gh',
      module: 'Collaborer avec ton \u00e9quipe',
      concept: 'gh est l\u2019outil GitHub pour le terminal. Avec une seule commande tu cr\u00e9es un PR sans ouvrir le navigateur.\n\nLe titre dit CE QUE tu as fait. Le body dit POURQUOI et COMMENT le tester.',
      why: 'Cr\u00e9er des PRs depuis le terminal est plus rapide et te garde dans le flux de travail.',
      task: 'Tape la commande pour cr\u00e9er un PR',
      hint: 'gh pr create --title "..." --body "..."',
      simulateLines: [
        '',
        'Creating pull request for feature/update-copy into main in ton-equipe/mon-app',
        '',
        'https://github.com/ton-equipe/mon-app/pull/42',
      ],
      simulateDelay: 200,
    },
    '5.6': {
      title: 'Bonnes descriptions de PR',
      module: 'Collaborer avec ton \u00e9quipe',
      concept: 'Un bon PR d\u00e9crit :\n\n  \u2022 Ce qui a chang\u00e9 \u2014 "Mis \u00e0 jour le titre et sous-titre de la page d\u2019accueil"\n  \u2022 Pourquoi \u2014 "L\u2019\u00e9quipe marketing a demand\u00e9 un nouveau texte"\n  \u2022 Comment tester \u2014 "Ouvrir / et v\u00e9rifier le texte"\n\nGarde la description courte et claire. N\u2019\u00e9cris pas un roman.',
      why: 'Si ton reviewer ne comprend pas le PR en 30 secondes, quelque chose ne va pas.',
      task: 'Appuie sur Entr\u00e9e pour continuer',
    },
    '5.7': {
      title: 'Code review basique',
      module: 'Collaborer avec ton \u00e9quipe',
      concept: 'Quand tu rev\u00e9rifies un PR, cherche :\n\n  \u2022 Le diff correspond-il \u00e0 la description ?\n  \u2022 Des erreurs \u00e9videntes ?\n  \u2022 Le changement est-il petit et cibl\u00e9 ?\n\nTu n\u2019as pas besoin d\u2019\u00eatre expert pour reviewer. Si quelque chose ne semble pas correct, demande.',
      why: 'Le code review ne sert pas \u00e0 critiquer \u2014 c\u2019est pour prot\u00e9ger l\u2019\u00e9quipe des erreurs.',
      task: 'Appuie sur Entr\u00e9e pour continuer',
    },
    '5.8': {
      title: 'Quand NE PAS utiliser l\u2019agent',
      module: 'Collaborer avec ton \u00e9quipe',
      concept: 'N\u2019utilise pas un agent IA pour :\n\n  \u2022 S\u00e9curit\u00e9 et authentification\n  \u2022 Paiements et facturation\n  \u2022 Migrations de base de donn\u00e9es\n  \u2022 D\u00e9ploiements en production\n\nQuand les enjeux sont \u00e9lev\u00e9s, un humain doit d\u00e9cider.',
      why: 'Les agents sont incroyables pour les t\u00e2ches r\u00e9p\u00e9titives, mais ils ne comprennent pas les cons\u00e9quences m\u00e9tier.',
      task: 'Appuie sur Entr\u00e9e pour continuer',
    },
    '5.9': {
      title: 'Quand demander de l\u2019aide',
      module: 'Collaborer avec ton \u00e9quipe',
      concept: 'Demande de l\u2019aide \u00e0 un d\u00e9veloppeur quand :\n\n  \u2022 Une erreur ne se r\u00e9sout pas apr\u00e8s 2 essais\n  \u2022 L\u2019agent continue d\u2019\u00e9chouer\n  \u2022 Tout ce qui touche la production\n  \u2022 Tu te sens pas s\u00fbr d\u2019un changement\n\nDemander de l\u2019aide n\u2019est pas une faiblesse \u2014 c\u2019est du professionnalisme.',
      why: 'Mieux vaut demander et apprendre que casser quelque chose et devoir le r\u00e9parer \u00e0 3h du matin.',
      task: 'Appuie sur Entr\u00e9e pour continuer',
    },
    '5.10': {
      title: 'Pratique \u2014 Flux complet',
      module: 'Collaborer avec ton \u00e9quipe',
      concept: 'Pratiquons le flux complet : cr\u00e9er une branche, s\u00e9lectionner les fichiers, sauvegarder et envoyer.',
      why: 'Je vais te donner des instructions et tu d\u00e9cides quelle commande utiliser.',
      task: '',
    },
    '5.11': {
      title: 'Quiz \u2014 Collaborer avec ton \u00e9quipe',
      module: 'Collaborer avec ton \u00e9quipe',
      concept: 'Voyons combien tu as appris. 5 questions rapides sur ce que tu as pratiqu\u00e9.',
      why: 'R\u00e9pondre \u00e0 des questions renforce ce que tu as appris. Ne t\u2019inqui\u00e8te pas si tu en rates \u2014 \u00e7a fait partie du processus.',
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

const quizModule5: Record<Locale, QuizQuestionData[]> = {
  es: [
    { question: '¿Buen nombre de rama para arreglar un bug?', options: ['fix/login-error', 'my-branch', 'asdf', 'main'], correct: 0, explanation: 'fix/ indica que estás arreglando un bug. El nombre describe qué arreglas.' },
    { question: '¿Qué hace git push?', options: ['Borra archivos', 'Crea una rama', 'Sube tu rama al servidor', 'Fusiona código'], correct: 2, explanation: 'git push sube tus commits al servidor remoto.' },
    { question: '¿Qué debe incluir la descripción de un PR?', options: ['Tu historia de vida', 'Qué cambió, por qué y cómo probarlo', 'Nada', 'Todo el código'], correct: 1, explanation: 'Un buen PR dice qué cambió, por qué y cómo probarlo.' },
    { question: '¿Cuándo NO deberías usar un agente de AI?', options: ['Para cambiar texto', 'Para arreglar typos', 'Para agregar comentarios', 'Para código de seguridad y pagos'], correct: 3, explanation: 'Seguridad, pagos y producción requieren decisión humana.' },
    { question: '¿Cuándo deberías pedir ayuda a un developer?', options: ['Nunca', 'Cuando no entiendes un error después de 2 intentos', 'Para cada cambio', 'Solo los viernes'], correct: 1, explanation: 'Si después de 2 intentos no se resuelve, pide ayuda. Es lo profesional.' },
  ],
  en: [
    { question: 'Good branch name for fixing a bug?', options: ['fix/login-error', 'my-branch', 'asdf', 'main'], correct: 0, explanation: 'fix/ indicates you\u2019re fixing a bug. The name describes what you\u2019re fixing.' },
    { question: 'What does git push do?', options: ['Deletes files', 'Creates a branch', 'Uploads your branch to the server', 'Merges code'], correct: 2, explanation: 'git push uploads your commits to the remote server.' },
    { question: 'What should a PR description include?', options: ['Your life story', 'What changed, why, and how to test', 'Nothing', 'The entire codebase'], correct: 1, explanation: 'A good PR says what changed, why, and how to test it.' },
    { question: 'When should you NOT use an AI agent?', options: ['For changing text', 'For fixing typos', 'For adding comments', 'For security and payment code'], correct: 3, explanation: 'Security, payments, and production require human decisions.' },
    { question: 'When should you ask a developer for help?', options: ['Never', 'When you don\u2019t understand an error after 2 tries', 'For every change', 'Only on weekdays'], correct: 1, explanation: 'If after 2 tries it\u2019s not resolved, ask for help. That\u2019s professional.' },
  ],
  fr: [
    { question: 'Bon nom de branche pour corriger un bug ?', options: ['fix/login-error', 'ma-branche', 'asdf', 'main'], correct: 0, explanation: 'fix/ indique que tu corriges un bug. Le nom d\u00e9crit ce que tu corriges.' },
    { question: 'Que fait git push ?', options: ['Supprime des fichiers', 'Cr\u00e9e une branche', 'Envoie ta branche au serveur', 'Fusionne du code'], correct: 2, explanation: 'git push envoie tes commits au serveur distant.' },
    { question: 'Que doit inclure la description d\u2019un PR ?', options: ['Ton histoire de vie', 'Ce qui a changé, pourquoi et comment le tester', 'Rien', 'Tout le code'], correct: 1, explanation: 'Un bon PR dit ce qui a chang\u00e9, pourquoi et comment le tester.' },
    { question: 'Quand ne devrais-tu PAS utiliser un agent IA ?', options: ['Pour changer du texte', 'Pour corriger des fautes', 'Pour ajouter des commentaires', 'Pour le code de s\u00e9curit\u00e9 et de paiement'], correct: 3, explanation: 'S\u00e9curit\u00e9, paiements et production n\u00e9cessitent une d\u00e9cision humaine.' },
    { question: 'Quand devrais-tu demander de l\u2019aide \u00e0 un d\u00e9veloppeur ?', options: ['Jamais', 'Quand tu ne comprends pas une erreur apr\u00e8s 2 essais', 'Pour chaque changement', 'Seulement en semaine'], correct: 1, explanation: 'Si apr\u00e8s 2 essais ce n\u2019est pas r\u00e9solu, demande de l\u2019aide. C\u2019est professionnel.' },
  ],
};

const practiceModule5: Record<Locale, CommandStep[]> = {
  es: [
    { challenge: 'Crea una rama para actualizar el copy', command: 'git checkout -b feature/update-copy', output: ["Switched to a new branch 'feature/update-copy'"], hint1: 'git checkout -b + nombre de rama...', hint2: 'El comando es git checkout -b feature/update-copy' },
    { challenge: 'Selecciona todos los archivos', command: 'git add .', output: [], hint1: 'git add + algo que signifique "todo"...', hint2: 'El comando es git add .' },
    { challenge: 'Guarda con un mensaje', command: 'git commit -m "update copy"', acceptPattern: 'git commit -m .+', output: ['[feature/update-copy a1b2c3d] update copy', ' 2 files changed, 4 insertions(+), 2 deletions(-)'], hint1: 'git commit -m seguido de tu mensaje entre comillas "..."', hint2: 'El comando es git commit -m "update copy"' },
    { challenge: 'Sube tus cambios', command: 'git push', output: ['To https://github.com/tu-equipo/mi-app.git', '   a1b2c3d..e4f5g6h  feature/update-copy -> feature/update-copy'], hint1: 'Dos palabras: git ...', hint2: 'El comando es git push' },
  ],
  en: [
    { challenge: 'Create a branch for updating the copy', command: 'git checkout -b feature/update-copy', output: ["Switched to a new branch 'feature/update-copy'"], hint1: 'git checkout -b + branch name...', hint2: 'The command is git checkout -b feature/update-copy' },
    { challenge: 'Select all files', command: 'git add .', output: [], hint1: 'git add + something that means "everything"...', hint2: 'The command is git add .' },
    { challenge: 'Save with a message', command: 'git commit -m "update copy"', acceptPattern: 'git commit -m .+', output: ['[feature/update-copy a1b2c3d] update copy', ' 2 files changed, 4 insertions(+), 2 deletions(-)'], hint1: 'git commit -m + your message in "quotes"', hint2: 'The command is git commit -m "update copy"' },
    { challenge: 'Upload your changes', command: 'git push', output: ['To https://github.com/your-team/my-app.git', '   a1b2c3d..e4f5g6h  feature/update-copy -> feature/update-copy'], hint1: 'Two words: git ...', hint2: 'The command is git push' },
  ],
  fr: [
    { challenge: 'Cr\u00e9e une branche pour mettre \u00e0 jour le texte', command: 'git checkout -b feature/update-copy', output: ["Switched to a new branch 'feature/update-copy'"], hint1: 'git checkout -b + nom de branche...', hint2: 'La commande est git checkout -b feature/update-copy' },
    { challenge: 'S\u00e9lectionne tous les fichiers', command: 'git add .', output: [], hint1: 'git add + quelque chose qui signifie "tout"...', hint2: 'La commande est git add .' },
    { challenge: 'Sauvegarde avec un message', command: 'git commit -m "update copy"', acceptPattern: 'git commit -m .+', output: ['[feature/update-copy a1b2c3d] update copy', ' 2 files changed, 4 insertions(+), 2 deletions(-)'], hint1: 'git commit -m + message entre guillemets "..."', hint2: 'La commande est git commit -m "update copy"' },
    { challenge: 'Envoie tes changements', command: 'git push', output: ['To https://github.com/ton-equipe/mon-app.git', '   a1b2c3d..e4f5g6h  feature/update-copy -> feature/update-copy'], hint1: 'Deux mots : git ...', hint2: 'La commande est git push' },
  ],
};

function buildSimulate(c: LessonText) {
  if (!c.simulateLines) return undefined;
  return { lines: c.simulateLines, delay: c.simulateDelay };
}

export function getModule5Lessons(locale: Locale): Lesson[] {
  const c = content[locale];
  const m = msg[locale];

  return [
    {
      id: '5.1',
      ...c['5.1']!,
      validate: () => ({ valid: true, message: m['5.1'].ok }),
      simulate: buildSimulate(c['5.1']!),
    },
    {
      id: '5.2',
      ...c['5.2']!,
      validate: () => ({ valid: true, message: m['5.2'].ok }),
      simulate: buildSimulate(c['5.2']!),
    },
    {
      id: '5.3',
      ...c['5.3']!,
      command: 'git push',
      validate: (input: string) => {
        if (input.trim().toLowerCase() === 'git push') return { valid: true, message: m['5.3'].ok };
        return { valid: false, message: (m['5.3'] as any).fail };
      },
      simulate: buildSimulate(c['5.3']!),
    },
    {
      id: '5.4',
      ...c['5.4']!,
      validate: () => ({ valid: true, message: m['5.4'].ok }),
      simulate: buildSimulate(c['5.4']!),
    },
    {
      id: '5.5',
      ...c['5.5']!,
      command: 'gh pr create --title "Update homepage copy" --body "Changed the title and subtitle"',
      validate: (input: string) => {
        const t = input.trim();
        if (t.startsWith('gh pr create') && t.includes('--title') && t.includes('--body')) {
          return { valid: true, message: m['5.5'].ok };
        }
        return { valid: false, message: (m['5.5'] as any).fail };
      },
      simulate: buildSimulate(c['5.5']!),
    },
    {
      id: '5.6',
      ...c['5.6']!,
      validate: () => ({ valid: true, message: m['5.6'].ok }),
      simulate: buildSimulate(c['5.6']!),
    },
    {
      id: '5.7',
      ...c['5.7']!,
      validate: () => ({ valid: true, message: m['5.7'].ok }),
      simulate: buildSimulate(c['5.7']!),
    },
    {
      id: '5.8',
      ...c['5.8']!,
      validate: () => ({ valid: true, message: m['5.8'].ok }),
      simulate: buildSimulate(c['5.8']!),
    },
    {
      id: '5.9',
      ...c['5.9']!,
      validate: () => ({ valid: true, message: m['5.9'].ok }),
      simulate: buildSimulate(c['5.9']!),
    },
    {
      id: '5.10',
      ...c['5.10']!,
      validate: () => ({ valid: true, message: m['5.10'].ok }),
      practiceSteps: practiceModule5[locale],
    },
    {
      id: '5.11',
      ...c['5.11']!,
      validate: () => ({ valid: true, message: m['5.11'].ok }),
      quizQuestions: quizModule5[locale],
    },
  ];
}
