/**
 * Course validation script — checks all lessons across all locales for inconsistencies.
 * Run: npx tsx scripts/validate-course.ts
 */
import { getAllLessons } from '../src/lessons/index.js';
import { type Locale } from '../src/i18n/types.js';

const LOCALES: Locale[] = ['es', 'en', 'fr'];
let errors: string[] = [];
let warnings: string[] = [];

function err(msg: string) { errors.push(`❌ ${msg}`); }
function warn(msg: string) { warnings.push(`⚠️  ${msg}`); }

// ─── Load all lessons ───
const lessonsByLocale = Object.fromEntries(
  LOCALES.map(l => [l, getAllLessons(l)])
) as Record<Locale, ReturnType<typeof getAllLessons>>;

const esLessons = lessonsByLocale.es;
const enLessons = lessonsByLocale.en;
const frLessons = lessonsByLocale.fr;

// ─── 1. Same number of lessons per locale ───
if (esLessons.length !== enLessons.length || esLessons.length !== frLessons.length) {
  err(`Lesson count mismatch: ES=${esLessons.length} EN=${enLessons.length} FR=${frLessons.length}`);
}

// ─── 2. IDs match across locales ───
for (let i = 0; i < esLessons.length; i++) {
  const esId = esLessons[i]?.id;
  const enId = enLessons[i]?.id;
  const frId = frLessons[i]?.id;
  if (esId !== enId || esId !== frId) {
    err(`ID mismatch at index ${i}: ES=${esId} EN=${enId} FR=${frId}`);
  }
}

// ─── Per-lesson checks ───
for (const locale of LOCALES) {
  const lessons = lessonsByLocale[locale];

  for (const lesson of lessons) {
    const prefix = `[${locale}] ${lesson.id}`;

    // 3. Required fields not empty
    if (!lesson.title) err(`${prefix}: empty title`);
    if (!lesson.concept) err(`${prefix}: empty concept`);
    if (!lesson.why) err(`${prefix}: empty why`);
    if (!lesson.module) err(`${prefix}: empty module`);

    // 4. Concept/why duplication
    if (lesson.concept && lesson.why) {
      const conceptEnd = lesson.concept.slice(-60).toLowerCase().trim();
      const whyStart = lesson.why.slice(0, 60).toLowerCase().trim();
      // Check if why is substring of concept or vice versa
      if (lesson.concept.toLowerCase().includes(lesson.why.toLowerCase()) && lesson.why.length > 20) {
        err(`${prefix}: why is contained inside concept: "${lesson.why.slice(0, 50)}..."`);
      }
      // Check for high similarity (shared words)
      const conceptWords = new Set(lesson.concept.toLowerCase().split(/\s+/));
      const whyWords = lesson.why.toLowerCase().split(/\s+/);
      const overlap = whyWords.filter(w => w.length > 3 && conceptWords.has(w));
      if (whyWords.length > 0 && overlap.length / whyWords.length > 0.7) {
        warn(`${prefix}: why has >70% word overlap with concept`);
      }
    }

    // 5. Task should exist if there's a command
    if (lesson.command && !lesson.task) {
      warn(`${prefix}: has command but empty task`);
    }

    // 6. Command lessons should have hint
    if (lesson.command && !lesson.hint && !lesson.practiceSteps) {
      warn(`${prefix}: has command but no hint`);
    }

    // 7. Validate function should work for command lessons
    if (lesson.command) {
      const result = lesson.validate(lesson.command);
      if (!result.valid) {
        err(`${prefix}: validate() rejects its own command "${lesson.command}"`);
      }
    }

    // 8. Quiz checks
    if (lesson.quizQuestions) {
      const qs = lesson.quizQuestions;
      if (qs.length === 0) err(`${prefix}: empty quiz`);

      for (let qi = 0; qi < qs.length; qi++) {
        const q = qs[qi]!;
        if (q.options.length < 2) err(`${prefix} Q${qi+1}: less than 2 options`);
        if (q.correct < 0 || q.correct >= q.options.length) {
          err(`${prefix} Q${qi+1}: correct index ${q.correct} out of range (${q.options.length} options)`);
        }
        if (!q.question) err(`${prefix} Q${qi+1}: empty question`);
        if (!q.explanation) err(`${prefix} Q${qi+1}: empty explanation`);
        // Duplicate options
        const unique = new Set(q.options.map(o => o.toLowerCase()));
        if (unique.size !== q.options.length) {
          err(`${prefix} Q${qi+1}: duplicate options`);
        }
      }

      // Check answer distribution
      const answers = qs.map(q => q.correct);
      const allSame = answers.every(a => a === answers[0]);
      if (allSame && qs.length >= 3) {
        err(`${prefix}: ALL ${qs.length} quiz answers are index ${answers[0]} — too predictable`);
      }
    }

    // 9. Agent simulation checks
    if (lesson.interactive === 'agent-simulation') {
      if (!lesson.agentSimulation) {
        err(`${prefix}: interactive=agent-simulation but no agentSimulation data`);
      } else {
        const sim = lesson.agentSimulation;
        if (!sim.scenario) err(`${prefix}: empty scenario`);
        if (!sim.promptHint) err(`${prefix}: empty promptHint`);
        if (sim.acceptedPatterns.length === 0) err(`${prefix}: empty acceptedPatterns`);
        if (sim.agentResponse.length === 0) err(`${prefix}: empty agentResponse`);
        if (sim.diffLines.length === 0) err(`${prefix}: empty diffLines`);
        if (!sim.explanation) err(`${prefix}: empty explanation`);
      }
    }

    // 10. Practice steps checks
    if (lesson.practiceSteps) {
      if (lesson.practiceSteps.length === 0) {
        err(`${prefix}: empty practiceSteps`);
      }
      for (let si = 0; si < lesson.practiceSteps.length; si++) {
        const step = lesson.practiceSteps[si]!;
        if (!step.challenge) err(`${prefix} step${si+1}: empty challenge`);
        if (!step.command) err(`${prefix} step${si+1}: empty command`);
      }
    }

    // 11. Lesson with no interactive content at all (concept-only is fine if it has concept+why)
    if (!lesson.command && !lesson.interactive && !lesson.practiceSteps && !lesson.quizQuestions && !lesson.simulate && !lesson.task && !lesson.concept) {
      warn(`${prefix}: no content at all (no concept, command, interactive, practiceSteps, quiz, simulate, or task)`);
    }
  }
}

// ─── Cross-locale consistency ───
for (let i = 0; i < esLessons.length; i++) {
  const es = esLessons[i]!;
  const en = enLessons[i]!;
  const fr = frLessons[i]!;
  const id = es.id;

  // 12. Same interactive type
  if (es.interactive !== en.interactive || es.interactive !== fr.interactive) {
    err(`${id}: interactive type mismatch: ES=${es.interactive} EN=${en.interactive} FR=${fr.interactive}`);
  }

  // 13. Same number of quiz questions
  if ((es.quizQuestions?.length ?? 0) !== (en.quizQuestions?.length ?? 0) ||
      (es.quizQuestions?.length ?? 0) !== (fr.quizQuestions?.length ?? 0)) {
    err(`${id}: quiz question count mismatch`);
  }

  // 14. Same correct answers across locales
  if (es.quizQuestions && en.quizQuestions && fr.quizQuestions) {
    for (let qi = 0; qi < es.quizQuestions.length; qi++) {
      const esC = es.quizQuestions[qi]?.correct;
      const enC = en.quizQuestions[qi]?.correct;
      const frC = fr.quizQuestions[qi]?.correct;
      if (esC !== enC || esC !== frC) {
        err(`${id} Q${qi+1}: correct index mismatch: ES=${esC} EN=${enC} FR=${frC}`);
      }
    }
  }

  // 15. Same number of practice steps
  if ((es.practiceSteps?.length ?? 0) !== (en.practiceSteps?.length ?? 0) ||
      (es.practiceSteps?.length ?? 0) !== (fr.practiceSteps?.length ?? 0)) {
    err(`${id}: practiceSteps count mismatch: ES=${es.practiceSteps?.length} EN=${en.practiceSteps?.length} FR=${fr.practiceSteps?.length}`);
  }

  // 16. Same commands in practice steps
  if (es.practiceSteps && en.practiceSteps && fr.practiceSteps) {
    for (let si = 0; si < es.practiceSteps.length; si++) {
      const esCmd = es.practiceSteps[si]?.command;
      const enCmd = en.practiceSteps[si]?.command;
      const frCmd = fr.practiceSteps[si]?.command;
      if (esCmd !== enCmd || esCmd !== frCmd) {
        // Some commands are locale-specific (natural language ones), skip those
        if (!es.practiceSteps[si]?.acceptPattern) {
          warn(`${id} step${si+1}: command mismatch: ES="${esCmd}" EN="${enCmd}" FR="${frCmd}"`);
        }
      }
    }
  }

  // 17. Same approveIsCorrect across locales
  if (es.agentSimulation && en.agentSimulation && fr.agentSimulation) {
    if (es.agentSimulation.approveIsCorrect !== en.agentSimulation.approveIsCorrect ||
        es.agentSimulation.approveIsCorrect !== fr.agentSimulation.approveIsCorrect) {
      err(`${id}: approveIsCorrect mismatch across locales`);
    }
  }

  // 18. Has command in one locale but not another
  if ((!!es.command) !== (!!en.command) || (!!es.command) !== (!!fr.command)) {
    err(`${id}: command presence mismatch: ES=${!!es.command} EN=${!!en.command} FR=${!!fr.command}`);
  }
}

// ─── Report ───
console.log('\n═══════════════════════════════════════');
console.log('  TUILDER COURSE VALIDATION REPORT');
console.log('═══════════════════════════════════════\n');
console.log(`Lessons: ${esLessons.length} per locale × ${LOCALES.length} locales = ${esLessons.length * LOCALES.length} total\n`);

if (errors.length === 0 && warnings.length === 0) {
  console.log('✅ All checks passed!\n');
} else {
  if (errors.length > 0) {
    console.log(`ERRORS (${errors.length}):`);
    errors.forEach(e => console.log(`  ${e}`));
    console.log();
  }
  if (warnings.length > 0) {
    console.log(`WARNINGS (${warnings.length}):`);
    warnings.forEach(w => console.log(`  ${w}`));
    console.log();
  }
}

process.exit(errors.length > 0 ? 1 : 0);
