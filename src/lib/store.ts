'use client';

import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { User } from '@/types/user';

interface AppStore {
  // User state
  user: User | null;
  setUser: (user: User | null) => void;
  updateUserXP: (newXP: number, newLevel: number, newStreak: number) => void;
  addCompletedLesson: (lessonId: string) => void;
  addBadge: (badgeId: string) => void;

  // UI state
  isLoading: boolean;
  setLoading: (v: boolean) => void;
  toast: { message: string; type: 'success' | 'error' | 'info' } | null;
  showToast: (message: string, type?: 'success' | 'error' | 'info') => void;
  clearToast: () => void;
}

export const useStore = create<AppStore>()(
  persist(
    (set, get) => ({
      user: {
        id: 'user-001',
        username: 'LeukemiaFighter',
        email: 'demo@leukemiaingo.com',
        avatar: 'orange',
        createdAt: '2026-01-01T10:00:00Z',
        lastActiveAt: new Date().toISOString(),
        role: 'user',
        stats: {
          totalXP: 0,
          level: 1,
          currentStreak: 0,
          longestStreak: 0,
          weeklyXP: 0,
          lessonsCompleted: [],
          badgesEarned: [],
          streakFreezeAvailable: 1,
        },
      },
      setUser: (user) => set({ user }),

      updateUserXP: (newXP, newLevel, newStreak) =>
        set((state) => ({
          user: state.user
            ? {
                ...state.user,
                stats: {
                  ...state.user.stats,
                  totalXP: newXP,
                  level: newLevel,
                  currentStreak: newStreak,
                  longestStreak: Math.max(state.user.stats.longestStreak, newStreak),
                },
              }
            : null,
        })),

      addCompletedLesson: (lessonId) =>
        set((state) => ({
          user: state.user
            ? {
                ...state.user,
                stats: {
                  ...state.user.stats,
                  lessonsCompleted: state.user.stats.lessonsCompleted.includes(lessonId)
                    ? state.user.stats.lessonsCompleted
                    : [...state.user.stats.lessonsCompleted, lessonId],
                },
              }
            : null,
        })),

      addBadge: (badgeId) =>
        set((state) => ({
          user: state.user
            ? {
                ...state.user,
                stats: {
                  ...state.user.stats,
                  badgesEarned: state.user.stats.badgesEarned.includes(badgeId)
                    ? state.user.stats.badgesEarned
                    : [...state.user.stats.badgesEarned, badgeId],
                },
              }
            : null,
        })),

      isLoading: false,
      setLoading: (v) => set({ isLoading: v }),

      toast: null,
      showToast: (message, type = 'info') => {
        set({ toast: { message, type } });
        setTimeout(() => get().clearToast(), 3000);
      },
      clearToast: () => set({ toast: null }),
    }),
    {
      name: 'leukemiaingo-store',
      partialize: (state) => ({ user: state.user }),
    }
  )
);
