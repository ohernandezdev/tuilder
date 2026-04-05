import React from 'react';
import { Text } from 'ink';
import { theme } from '../theme.js';

type ThemeType = typeof theme;

export function colorize(line: string, t: ThemeType): React.ReactNode {
  // Lines starting with $ or > → prompt/brand color
  if (/^\s*[$>]/.test(line)) {
    return React.createElement(Text, { color: t.brand, bold: true }, line);
  }

  // Diff headers: diff --git, ---, +++, @@
  if (/^diff --git/.test(line) || /^---/.test(line) || /^\+\+\+/.test(line) || /^@@/.test(line)) {
    return React.createElement(Text, { color: t.textMuted }, line);
  }

  // Diff added (must come after +++ check)
  if (/^\+/.test(line)) {
    return React.createElement(Text, { color: t.success }, line);
  }

  // Diff removed (but not ---)
  if (/^-/.test(line)) {
    return React.createElement(Text, { color: t.error }, line);
  }

  // Git branch current line
  if (/^\*/.test(line)) {
    return React.createElement(Text, { color: t.success, bold: true }, line);
  }

  // modified: or new file:
  if (/modified:|new file:/.test(line)) {
    return React.createElement(Text, { color: t.warning }, line);
  }

  // Switched to
  if (/Switched to/.test(line)) {
    return React.createElement(Text, { color: t.success }, line);
  }

  // Cloning, Receiving, remote:
  if (/Cloning|Receiving|remote:/.test(line)) {
    return React.createElement(Text, { color: t.textMuted }, line);
  }

  // Folder names ending in / (ls-style output)
  if (/\S+\/\s*$/.test(line) && !/^\//.test(line.trim())) {
    return React.createElement(Text, { color: t.info }, line);
  }

  // Path-like strings starting with /Users/ or ~/
  if (/^\/Users\/|^~\//.test(line.trim())) {
    return React.createElement(Text, { color: t.textMuted }, line);
  }

  // Default
  return React.createElement(Text, { color: t.textSecondary }, line);
}
