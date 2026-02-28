// Level XP thresholds - change here to update everywhere
export const LEVEL_THRESHOLDS = [0, 500, 2000, 5000, 10000, 20000];

// Level display names
export const LEVEL_NAMES = ['Beginner', 'Fighter', 'Warrior', 'Champion', 'Legend', 'Master'];

// Lesson categories
export const CATEGORIES = [
  { value: 'basics', label: 'Basics', color: 'orange', emoji: '\uD83E\uDDA0' },
  { value: 'symptoms', label: 'Symptoms & Detection', color: 'red', emoji: '\uD83D\uDD0D' },
  { value: 'risks', label: 'Risk Factors', color: 'yellow', emoji: '\u26A0\uFE0F' },
  { value: 'treatment', label: 'Treatment', color: 'green', emoji: '\uD83D\uDC89' },
  { value: 'support', label: 'Support & Action', color: 'blue', emoji: '\uD83E\uDD1D' },
];

// XP rewards
export const XP_PER_CORRECT = 10;
export const XP_PERFECT_BONUS = 50;
export const XP_STREAK_7_BONUS = 100;
export const XP_STREAK_30_BONUS = 500;

// App info
export const APP_NAME = 'Leukemiaingo';
export const APP_DESCRIPTION = 'Learn about leukemia the Duolingo way';

// Admin key (MVP - replace with real auth later)
export const ADMIN_KEY = process.env.ADMIN_KEY || 'admin-secret-key';
