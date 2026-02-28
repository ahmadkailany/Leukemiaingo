export interface ApiResponse<T> {
  data?: T;
  error?: string;
  message?: string;
}

export interface PaginationMeta {
  total: number;
  page: number;
  limit: number;
  totalPages: number;
}

export interface LeaderboardEntry {
  userId: string;
  username: string;
  xp: number;
  rank: number;
  avatar: string;
  streak: number;
}

export interface ProgressPayload {
  userId: string;
  lessonId: string;
  score: number;
  xpEarned: number;
}

export interface ProgressResponse {
  success: boolean;
  score: number;
  newXP: number;
  newLevel: number;
  newStreak: number;
  badgesEarned: string[];
}
