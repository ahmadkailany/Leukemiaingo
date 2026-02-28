import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';
import { theme } from './theme';
import type { User } from '@/types/user';

/** Merge Tailwind classes safely */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

/** Calculate user level from total XP */
export function getLevel(xp: number): (typeof theme.levels)[number] {
  for (let i = theme.levels.length - 1; i >= 0; i--) {
    if (xp >= theme.levels[i].minXP) {
      return theme.levels[i];
    }
  }
  return theme.levels[0];
}

/** Calculate XP progress within current level */
export function getLevelProgress(xp: number): number {
  const level = getLevel(xp);
  if (level.maxXP === Infinity) return 100;
  const range = level.maxXP - level.minXP;
  const progress = xp - level.minXP;
  return Math.round((progress / range) * 100);
}

/** Format large numbers (1200 → 1.2K) */
export function formatNumber(n: number): string {
  if (n >= 1000) return `${(n / 1000).toFixed(1)}K`;
  return n.toString();
}

/** Get rank suffix (1 → 1st, 2 → 2nd, etc.) */
export function getRankSuffix(rank: number): string {
  const s = ['th', 'st', 'nd', 'rd'];
  const v = rank % 100;
  return rank + (s[(v - 20) % 10] || s[v] || s[0]);
}

/** Get avatar gradient from color string */
export function getAvatarGradient(color: string): string {
  const gradients: Record<string, string> = {
    orange: 'from-orange-400 to-orange-600',
    blue: 'from-blue-400 to-blue-600',
    green: 'from-green-400 to-green-600',
    purple: 'from-purple-400 to-purple-600',
    red: 'from-red-400 to-red-600',
    pink: 'from-pink-400 to-pink-600',
    teal: 'from-teal-400 to-teal-600',
  };
  return gradients[color] || gradients['orange'];
}

/** Format date to readable string */
export function formatDate(dateStr: string): string {
  return new Date(dateStr).toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  });
}

/** Check if a user should receive a badge */
export function checkBadgeCondition(
  user: User,
  condition: { type: string; value: number; category?: string }
): boolean {
  switch (condition.type) {
    case 'lessons_completed':
      return user.stats.lessonsCompleted.length >= condition.value;
    case 'streak':
      return user.stats.currentStreak >= condition.value;
    case 'total_xp':
      return user.stats.totalXP >= condition.value;
    default:
      return false;
  }
}
