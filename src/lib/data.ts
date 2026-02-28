import type { Lesson } from '@/types/lesson';
import type { User } from '@/types/user';
import type { Badge } from '@/types/badge';

// ============================================================
// DATA ACCESS LAYER
// Swap these functions to use a real database in production.
// ============================================================

export async function getLessons(): Promise<Lesson[]> {
  const res = await fetch('/api/lessons', { cache: 'no-store' });
  if (!res.ok) throw new Error('Failed to fetch lessons');
  const data = await res.json();
  return data.lessons;
}

export async function getLessonById(id: string): Promise<Lesson | null> {
  const res = await fetch(`/api/lessons/${id}`, { cache: 'no-store' });
  if (!res.ok) return null;
  const data = await res.json();
  return data.lesson;
}

export async function getUsers(): Promise<User[]> {
  const res = await fetch('/api/users', { cache: 'no-store' });
  if (!res.ok) throw new Error('Failed to fetch users');
  const data = await res.json();
  return data.users;
}

export async function getUserById(id: string): Promise<User | null> {
  const res = await fetch(`/api/users/${id}`, { cache: 'no-store' });
  if (!res.ok) return null;
  const data = await res.json();
  return data.user;
}

export async function getBadges(): Promise<Badge[]> {
  const res = await fetch('/api/badges', { cache: 'no-store' });
  if (!res.ok) throw new Error('Failed to fetch badges');
  const data = await res.json();
  return data.badges;
}

export async function getLeaderboard(type: 'weekly' | 'allTime' = 'weekly') {
  const res = await fetch(`/api/leaderboard?type=${type}`, { cache: 'no-store' });
  if (!res.ok) throw new Error('Failed to fetch leaderboard');
  const data = await res.json();
  return data.leaderboard;
}

export async function submitProgress(payload: {
  userId: string;
  lessonId: string;
  score: number;
  xpEarned: number;
}) {
  const res = await fetch('/api/progress', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload),
  });
  if (!res.ok) throw new Error('Failed to submit progress');
  return res.json();
}
