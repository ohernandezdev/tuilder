// Design system inspired by Claude Code's dark theme palette
// Semantic token architecture: every color has ONE job

export const theme = {
  // ── Brand ──────────────────────────────────────
  brand: '#D77757',          // Claude orange — primary brand, headers, logo
  brandDim: '#A85C42',       // Muted brand — secondary brand uses

  // ── Semantic ───────────────────────────────────
  success: '#4EBA65',        // Confirmations, completions
  error: '#FF6B80',          // Errors, destructive
  warning: '#FFC107',        // Caution, gentle corrections
  info: '#B1B9F9',           // Informational, analogies, accents

  // ── Text hierarchy ─────────────────────────────
  text: '#EEEEEE',           // Primary text (not pure white — reduces eye strain)
  textSecondary: '#AAAAAA',  // Secondary text, explanations
  textMuted: '#777777',      // Tertiary: hints, instructions, metadata
  textGhost: '#444444',      // Ghost: decorative, phase dots inactive

  // ── Interactive ────────────────────────────────
  prompt: '#D77757',         // Input prompt indicator (brand-colored)
  inputText: '#FFFFFF',      // User input text (brightest = most important)

  // ── Structure ──────────────────────────────────
  border: '#555555',         // Primary borders
  borderDim: '#333333',      // Subtle separators
  divider: '#2A2A2A',        // Background dividers

  // ── Special ────────────────────────────────────
  commandHighlight: '#FFD580', // Command names when referenced in text (warm, readable)
} as const;

// ── Spacing constants (4px grid) ─────────────────
export const spacing = {
  xs: 0,     // Ink gap=0
  sm: 1,     // Ink gap=1 (≈ 1 line / 1 char)
  md: 2,     // Ink paddingX=2
  lg: 3,     // Section breaks
} as const;
