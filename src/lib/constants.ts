export const APP_NAME = 'Leukemiaingo';
export const APP_TAGLINE = 'Learn · Spread Awareness · Fight Leukemia';

export const XP_PER_CORRECT_ANSWER = 10;
export const XP_PERFECT_LESSON_BONUS = 50;
export const QUESTIONS_PER_LESSON = 5;

export const STREAK_FREEZE_MAX = 2;

export const LEADERBOARD_TOP_N = 10;

export const CATEGORY_LABELS: Record<string, string> = {
  basics: 'The Basics',
  symptoms: 'Symptoms & Detection',
  risks: 'Risk Factors',
  treatment: 'Treatment',
  support: 'Support & Action',
};

export const CATEGORY_DESCRIPTIONS: Record<string, string> = {
  basics: 'Understand what leukemia is and how it affects the body.',
  symptoms: 'Learn to recognize the warning signs early.',
  risks: 'Discover who is at risk and why.',
  treatment: 'Explore modern treatment options and what to expect.',
  support: 'Learn how to help yourself or others affected by leukemia.',
};

export const CATEGORY_ICONS: Record<string, string> = {
  basics: 'MdScience',
  symptoms: 'MdSearch',
  risks: 'MdWarning',
  treatment: 'MdLocalHospital',
  support: 'MdFavorite',
};

export const DIFFICULTY_LABELS: Record<string, string> = {
  easy: 'Easy',
  medium: 'Medium',
  hard: 'Hard',
};

export const LEVEL_NAMES = [
  'Newcomer',
  'Fighter',
  'Warrior',
  'Champion',
  'Legend',
];

export const MOCK_CURRENT_USER_ID = 'user-001';
