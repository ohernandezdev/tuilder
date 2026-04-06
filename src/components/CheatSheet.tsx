import React from 'react';
import { Box, Text } from 'ink';
import { theme } from '../theme.js';
import { ui } from '../i18n/index.js';

interface CheatEntry {
  cmd: string;
  desc: () => string;
}

interface CheatSection {
  title: () => string;
  icon: string;
  entries: CheatEntry[];
}

function getSections(): CheatSection[] {
  return [
    {
      title: () => ui().cheatSheetNavigation,
      icon: '📂',
      entries: [
        { cmd: 'pwd', desc: () => ui().csPwd },
        { cmd: 'cd carpeta', desc: () => ui().csCd },
        { cmd: 'cd ..', desc: () => ui().csCdUp },
        { cmd: 'ls', desc: () => ui().csLs },
      ],
    },
    {
      title: () => ui().cheatSheetFiles,
      icon: '📄',
      entries: [
        { cmd: 'cat archivo', desc: () => ui().csCat },
        { cmd: 'mkdir nombre', desc: () => ui().csMkdir },
        { cmd: 'touch archivo', desc: () => ui().csTouch },
      ],
    },
    {
      title: () => ui().cheatSheetGit,
      icon: '🔀',
      entries: [
        { cmd: 'git init', desc: () => ui().csGitInit },
        { cmd: 'git status', desc: () => ui().csGitStatus },
        { cmd: 'git add .', desc: () => ui().csGitAdd },
        { cmd: 'git commit -m "..."', desc: () => ui().csGitCommit },
        { cmd: 'git log --oneline', desc: () => ui().csGitLog },
        { cmd: 'git branch nombre', desc: () => ui().csGitBranch },
        { cmd: 'git checkout nombre', desc: () => ui().csGitCheckout },
        { cmd: 'git diff', desc: () => ui().csGitDiff },
      ],
    },
    {
      title: () => ui().cheatSheetAI,
      icon: '🤖',
      entries: [
        { cmd: 'claude', desc: () => ui().csClaude },
        { cmd: 'Ctrl+C', desc: () => ui().csCtrlC },
      ],
    },
  ];
}

function SectionBlock({ section }: { section: CheatSection }) {
  return (
    <Box flexDirection="column">
      <Text color={theme.brand} bold>{section.icon} {section.title()}</Text>
      {section.entries.map((entry) => (
        <Text key={entry.cmd}>
          {'  '}
          <Text color={theme.commandHighlight} bold>{entry.cmd.padEnd(22)}</Text>
          <Text color={theme.textSecondary}>{entry.desc()}</Text>
        </Text>
      ))}
    </Box>
  );
}

export function CheatSheet() {
  const sections = getSections();
  const left = sections.filter((_, i) => i < 2);
  const right = sections.filter((_, i) => i >= 2);

  return (
    <Box
      flexDirection="column"
      borderStyle="double"
      borderColor={theme.brand}
      paddingX={2}
      paddingY={1}
      marginX={1}
    >
      <Box justifyContent="center" marginBottom={1}>
        <Text color={theme.brand}>{'━━━ '}</Text>
        <Text color={theme.commandHighlight} bold>{' ⌨ CHEAT SHEET '}</Text>
        <Text color={theme.brand}>{' ━━━'}</Text>
      </Box>

      <Box flexDirection="row" gap={4}>
        <Box flexDirection="column" gap={1}>
          {left.map((s, i) => <SectionBlock key={i} section={s} />)}
        </Box>
        <Box flexDirection="column" gap={1}>
          {right.map((s, i) => <SectionBlock key={i} section={s} />)}
        </Box>
      </Box>

      <Box justifyContent="center" marginTop={1}>
        <Text color={theme.textGhost}>{ui().cheatSheetClose}</Text>
      </Box>
    </Box>
  );
}
