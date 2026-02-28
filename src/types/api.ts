export interface ApiResponse<T> {
  data?: T;
  error?: string;
  message?: string;
}

export interface PaginatedResponse<T> extends ApiResponse<T[]> {
  pagination: {
    total: number;
    page: number;
    limit: number;
    totalPages: number;
  };
}

export interface ProgressUpdate {
  userId: string;
  lessonId: string;
  score: number;
  xpEarned: number;
}

export interface ProgressResponse {
  success: boolean;
  newXP: number;
  newLevel: number;
  badgesEarned: string[];
  streakUpdated: boolean;
  leveledUp: boolean;
}
