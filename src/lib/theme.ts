/**
 * GLOBAL THEME CONFIGURATION
 * Change colors, fonts, and styles from here — affects the entire app.
 */

export const theme = {
  colors: {
    // --- Primary Brand Colors (Leukemia Awareness Orange) ---
    primary: '#FF6600',
    primaryLight: '#FF9944',
    primaryDark: '#CC5500',
    primaryGlow: 'rgba(255, 102, 0, 0.15)',

    // --- Secondary / Background Colors ---
    secondary: '#FFE5CC',
    accent: '#FFCC99',
    accentDark: '#FFA855',

    // --- Neutral Colors ---
    background: '#FFFFFF',
    surface: '#F9FAFB',
    surfaceAlt: '#F3F4F6',
    border: '#E5E7EB',
    borderDark: '#D1D5DB',

    // --- Text Colors ---
    textPrimary: '#111827',
    textSecondary: '#6B7280',
    textMuted: '#9CA3AF',
    textInverse: '#FFFFFF',

    // --- Status Colors ---
    success: '#10B981',
    successLight: '#D1FAE5',
    warning: '#F59E0B',
    warningLight: '#FEF3C7',
    error: '#EF4444',
    errorLight: '#FEE2E2',
    info: '#3B82F6',
    infoLight: '#DBEAFE',

    // --- Gamification Colors ---
    xpGold: '#F59E0B',
    streakFire: '#EF4444',
    levelGreen: '#10B981',
    badgePurple: '#8B5CF6',
    rankGold: '#F59E0B',
    rankSilver: '#9CA3AF',
    rankBronze: '#B45309',
  },

  // --- Category Colors ---
  categoryColors: {
    basics: { bg: '#DBEAFE', text: '#1D4ED8', border: '#93C5FD' },
    symptoms: { bg: '#FEE2E2', text: '#DC2626', border: '#FCA5A5' },
    risks: { bg: '#FEF3C7', text: '#D97706', border: '#FCD34D' },
    treatment: { bg: '#D1FAE5', text: '#059669', border: '#6EE7B7' },
    support: { bg: '#EDE9FE', text: '#7C3AED', border: '#C4B5FD' },
  },

  // --- Difficulty Colors ---
  difficultyColors: {
    easy: { bg: '#D1FAE5', text: '#059669' },
    medium: { bg: '#FEF3C7', text: '#D97706' },
    hard: { bg: '#FEE2E2', text: '#DC2626' },
  },

  // --- Typography ---
  fonts: {
    sans: 'Inter, system-ui, sans-serif',
    mono: 'JetBrains Mono, monospace',
  },

  // --- Border Radius ---
  radius: {
    sm: '0.375rem',
    md: '0.5rem',
    lg: '0.75rem',
    xl: '1rem',
    '2xl': '1.5rem',
    full: '9999px',
  },

  // --- Levels Config ---
  levels: [
    { level: 1, name: 'Newcomer', minXP: 0, maxXP: 500, color: '#9CA3AF' },
    { level: 2, name: 'Fighter', minXP: 500, maxXP: 1500, color: '#3B82F6' },
    { level: 3, name: 'Warrior', minXP: 1500, maxXP: 3000, color: '#8B5CF6' },
    { level: 4, name: 'Champion', minXP: 3000, maxXP: 6000, color: '#F59E0B' },
    { level: 5, name: 'Legend', minXP: 6000, maxXP: Infinity, color: '#EF4444' },
  ],

  // --- App Meta ---
  app: {
    name: 'Leukemiaingo',
    tagline: 'Learn · Spread Awareness · Fight Leukemia',
    description: 'A Duolingo-style gamified platform for leukemia awareness and education.',
    primaryColor: '#FF6600',
    locale: 'en',
  },
} as const;

export type Theme = typeof theme;
