export interface UserStats {
  totalXP: number;
  level: number;
  currentStreak: number;
  longestStreak: number;
  weeklyXP: number;
  lessonsCompleted: string[];
  badgesEarned: string[];
  streakFreezeAvailable: number;
}

export interface User {
  id: string;
  username: string;
  email: string;
  avatar: string;
  createdAt: string;
  lastActiveAt: string;
  role: 'user' | 'admin';
  stats: UserStats;
}
