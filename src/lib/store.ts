'use client';

import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import type { User } from '@/types/user';
import type { Lesson } from '@/types/lesson';
import type { LeaderboardEntry } from '@/types/user';
import { getLevel } from './utils';

interface AppStore {
  // --- Current User ---
  currentUser: User | null;
  setCurrentUser: (user: User) => void;
  updateUserXP: (xp: number) => void;
  completeLesson: (lessonId: string, xpEarned: number) => void;
  earnBadge: (badgeId: string) => void;

  // --- Lessons ---
  lessons: Lesson[];
  setLessons: (lessons: Lesson[]) => void;

  // --- Leaderboard ---
  leaderboard: LeaderboardEntry[];
  setLeaderboard: (entries: LeaderboardEntry[]) => void;

  // --- UI State ---
  isLoading: boolean;
  setIsLoading: (v: boolean) => void;
  activeTab: 'weekly' | 'allTime';
  setActiveTab: (tab: 'weekly' | 'allTime') => void;
}

export const useAppStore = create<AppStore>()(
  persist(
    (set, get) => ({
      // --- User ---
      currentUser: null,
      setCurrentUser: (user) => set({ currentUser: user }),

      updateUserXP: (xp) => {
        const user = get().currentUser;
        if (!user) return;
        const newXP = user.stats.totalXP + xp;
        const newLevel = getLevel(newXP).level;
        set({
          currentUser: {
            ...user,
            stats: {
              ...user.stats,
              totalXP: newXP,
              weeklyXP: user.stats.weeklyXP + xp,
              level: newLevel,
            },
          },
        });
      },

      completeLesson: (lessonId, xpEarned) => {
        const user = get().currentUser;
        if (!user) return;
        if (user.stats.lessonsCompleted.includes(lessonId)) return;
        const newXP = user.stats.totalXP + xpEarned;
        const newLevel = getLevel(newXP).level;
        set({
          currentUser: {
            ...user,
            stats: {
              ...user.stats,
              totalXP: newXP,
              weeklyXP: user.stats.weeklyXP + xpEarned,
              level: newLevel,
              lessonsCompleted: [...user.stats.lessonsCompleted, lessonId],
            },
          },
        });
      },

      earnBadge: (badgeId) => {
        const user = get().currentUser;
        if (!user) return;
        if (user.stats.badgesEarned.includes(badgeId)) return;
        set({
          currentUser: {
            ...user,
            stats: {
              ...user.stats,
              badgesEarned: [...user.stats.badgesEarned, badgeId],
            },
          },
        });
      },

      // --- Lessons ---
      lessons: [],
      setLessons: (lessons) => set({ lessons }),

      // --- Leaderboard ---
      leaderboard: [],
      setLeaderboard: (entries) => set({ leaderboard: entries }),

      // --- UI ---
      isLoading: false,
      setIsLoading: (v) => set({ isLoading: v }),
      activeTab: 'weekly',
      setActiveTab: (tab) => set({ activeTab: tab }),
    }),
    {
      name: 'leukemiaingo-storage',
      storage: createJSONStorage(() => localStorage),
      partialize: (state) => ({ currentUser: state.currentUser }),
    }
  )
);
