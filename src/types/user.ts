export type UserRole = 'user' | 'admin';

export interface UserStats {
  totalXP: number;
  level: number;
  currentStreak: number;
  longestStreak: number;
  lessonsCompleted: string[];
  badgesEarned: string[];
  streakFreezeAvailable: number;
  weeklyXP: number;
}

export interface User {
  id: string;
  username: string;
  email: string;
  avatar: string;
  role: UserRole;
  createdAt: string;
  lastActiveAt: string;
  stats: UserStats;
}

export interface LeaderboardEntry {
  rank: number;
  userId: string;
  username: string;
  xp: number;
  avatar: string;
  currentStreak: number;
}
