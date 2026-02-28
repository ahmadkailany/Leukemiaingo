import { useStore } from '@/lib/store';

// Reset Zustand store before each test
beforeEach(() => {
  useStore.setState({
    user: {
      id: 'user-test',
      username: 'Tester',
      email: 'test@test.com',
      avatar: 'orange',
      createdAt: '2026-01-01T00:00:00Z',
      lastActiveAt: '2026-01-01T00:00:00Z',
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
  });
});

describe('Zustand Store', () => {
  describe('updateUserXP', () => {
    it('updates totalXP correctly', () => {
      useStore.getState().updateUserXP(500, 2, 5);
      expect(useStore.getState().user?.stats.totalXP).toBe(500);
    });

    it('updates level correctly', () => {
      useStore.getState().updateUserXP(500, 2, 5);
      expect(useStore.getState().user?.stats.level).toBe(2);
    });

    it('updates currentStreak correctly', () => {
      useStore.getState().updateUserXP(100, 1, 7);
      expect(useStore.getState().user?.stats.currentStreak).toBe(7);
    });

    it('updates longestStreak if new streak is higher', () => {
      useStore.setState((s) => ({
        user: s.user ? { ...s.user, stats: { ...s.user.stats, longestStreak: 3 } } : null,
      }));
      useStore.getState().updateUserXP(100, 1, 10);
      expect(useStore.getState().user?.stats.longestStreak).toBe(10);
    });

    it('does NOT lower longestStreak if new streak is lower', () => {
      useStore.setState((s) => ({
        user: s.user ? { ...s.user, stats: { ...s.user.stats, longestStreak: 20 } } : null,
      }));
      useStore.getState().updateUserXP(100, 1, 5);
      expect(useStore.getState().user?.stats.longestStreak).toBe(20);
    });
  });

  describe('addCompletedLesson', () => {
    it('adds a lesson ID to lessonsCompleted', () => {
      useStore.getState().addCompletedLesson('lesson-001');
      expect(useStore.getState().user?.stats.lessonsCompleted).toContain('lesson-001');
    });

    it('does not duplicate lesson IDs', () => {
      useStore.getState().addCompletedLesson('lesson-001');
      useStore.getState().addCompletedLesson('lesson-001');
      const completed = useStore.getState().user?.stats.lessonsCompleted;
      expect(completed?.filter((id) => id === 'lesson-001')).toHaveLength(1);
    });

    it('can add multiple different lessons', () => {
      useStore.getState().addCompletedLesson('lesson-001');
      useStore.getState().addCompletedLesson('lesson-002');
      const completed = useStore.getState().user?.stats.lessonsCompleted;
      expect(completed).toHaveLength(2);
    });
  });

  describe('addBadge', () => {
    it('adds a badge ID to badgesEarned', () => {
      useStore.getState().addBadge('first-steps');
      expect(useStore.getState().user?.stats.badgesEarned).toContain('first-steps');
    });

    it('does not duplicate badge IDs', () => {
      useStore.getState().addBadge('first-steps');
      useStore.getState().addBadge('first-steps');
      const badges = useStore.getState().user?.stats.badgesEarned;
      expect(badges?.filter((id) => id === 'first-steps')).toHaveLength(1);
    });
  });

  describe('setUser', () => {
    it('sets user to null correctly', () => {
      useStore.getState().setUser(null);
      expect(useStore.getState().user).toBeNull();
    });

    it('replaces user object entirely', () => {
      const newUser = {
        id: 'user-new',
        username: 'NewUser',
        email: 'new@test.com',
        avatar: 'blue',
        createdAt: '2026-01-01T00:00:00Z',
        lastActiveAt: '2026-01-01T00:00:00Z',
        role: 'user' as const,
        stats: {
          totalXP: 9999,
          level: 5,
          currentStreak: 100,
          longestStreak: 100,
          weeklyXP: 999,
          lessonsCompleted: ['lesson-001'],
          badgesEarned: ['first-steps'],
          streakFreezeAvailable: 2,
        },
      };
      useStore.getState().setUser(newUser);
      expect(useStore.getState().user?.username).toBe('NewUser');
      expect(useStore.getState().user?.stats.totalXP).toBe(9999);
    });
  });

  describe('toast', () => {
    it('sets toast message and type', () => {
      useStore.getState().showToast('Test message', 'success');
      expect(useStore.getState().toast?.message).toBe('Test message');
      expect(useStore.getState().toast?.type).toBe('success');
    });

    it('clears toast', () => {
      useStore.getState().showToast('Test', 'info');
      useStore.getState().clearToast();
      expect(useStore.getState().toast).toBeNull();
    });
  });
});
