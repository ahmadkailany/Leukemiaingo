import { Badge } from '@/types/badge';
import { User } from '@/types/user';

/**
 * Badge checking logic (mirrors /api/progress route.ts)
 */
function checkBadges(
  user: User,
  allBadges: Badge[],
  allLessons: { id: string; category: string }[]
): string[] {
  const newBadges: string[] = [];
  for (const badge of allBadges) {
    if (user.stats.badgesEarned.includes(badge.id)) continue;
    const { type, value } = badge.condition;
    if (type === 'lessons_completed' && user.stats.lessonsCompleted.length >= (value as number))
      newBadges.push(badge.id);
    if (type === 'streak' && user.stats.currentStreak >= (value as number))
      newBadges.push(badge.id);
    if (type === 'all_lessons' && user.stats.lessonsCompleted.length >= allLessons.length)
      newBadges.push(badge.id);
    if (type === 'category_completed') {
      const catLessons = allLessons.filter((l) => l.category === value).map((l) => l.id);
      if (catLessons.every((id) => user.stats.lessonsCompleted.includes(id)))
        newBadges.push(badge.id);
    }
  }
  return newBadges;
}

const MOCK_LESSONS = [
  { id: 'lesson-001', category: 'basics' },
  { id: 'lesson-002', category: 'basics' },
  { id: 'lesson-003', category: 'symptoms' },
];

const MOCK_BADGES: Badge[] = [
  { id: 'first-steps', name: 'First Steps', description: '', icon: 'FiTarget', color: 'orange', condition: { type: 'lessons_completed', value: 1 }, xpBonus: 25 },
  { id: 'week-warrior', name: 'Week Warrior', description: '', icon: 'FiZap', color: 'orange', condition: { type: 'streak', value: 7 }, xpBonus: 100 },
  { id: 'basics-master', name: 'Basics Master', description: '', icon: 'FiBook', color: 'blue', condition: { type: 'category_completed', value: 'basics' }, xpBonus: 75 },
  { id: 'knowledge-champion', name: 'Knowledge Champion', description: '', icon: 'FiAward', color: 'purple', condition: { type: 'all_lessons', value: true }, xpBonus: 500 },
];

function makeUser(overrides: Partial<User['stats']> = {}): User {
  return {
    id: 'u1', username: 'Tester', email: 'x@x.com', avatar: 'orange',
    createdAt: '', lastActiveAt: '', role: 'user',
    stats: {
      totalXP: 0, level: 1, currentStreak: 0, longestStreak: 0,
      weeklyXP: 0, lessonsCompleted: [], badgesEarned: [],
      streakFreezeAvailable: 0, ...overrides,
    },
  };
}

describe('Badge Logic', () => {
  describe('first-steps badge', () => {
    it('awards badge when user completes first lesson', () => {
      const user = makeUser({ lessonsCompleted: ['lesson-001'] });
      const result = checkBadges(user, MOCK_BADGES, MOCK_LESSONS);
      expect(result).toContain('first-steps');
    });

    it('does NOT award badge when no lessons completed', () => {
      const user = makeUser({ lessonsCompleted: [] });
      const result = checkBadges(user, MOCK_BADGES, MOCK_LESSONS);
      expect(result).not.toContain('first-steps');
    });

    it('does NOT re-award already earned badge', () => {
      const user = makeUser({ lessonsCompleted: ['lesson-001'], badgesEarned: ['first-steps'] });
      const result = checkBadges(user, MOCK_BADGES, MOCK_LESSONS);
      expect(result).not.toContain('first-steps');
    });
  });

  describe('week-warrior badge (streak)', () => {
    it('awards badge when streak reaches 7', () => {
      const user = makeUser({ currentStreak: 7 });
      const result = checkBadges(user, MOCK_BADGES, MOCK_LESSONS);
      expect(result).toContain('week-warrior');
    });

    it('awards badge when streak exceeds 7', () => {
      const user = makeUser({ currentStreak: 14 });
      const result = checkBadges(user, MOCK_BADGES, MOCK_LESSONS);
      expect(result).toContain('week-warrior');
    });

    it('does NOT award badge when streak is 6', () => {
      const user = makeUser({ currentStreak: 6 });
      const result = checkBadges(user, MOCK_BADGES, MOCK_LESSONS);
      expect(result).not.toContain('week-warrior');
    });
  });

  describe('basics-master badge (category_completed)', () => {
    it('awards badge when all basics lessons are completed', () => {
      const user = makeUser({ lessonsCompleted: ['lesson-001', 'lesson-002'] });
      const result = checkBadges(user, MOCK_BADGES, MOCK_LESSONS);
      expect(result).toContain('basics-master');
    });

    it('does NOT award badge when only one basics lesson is done', () => {
      const user = makeUser({ lessonsCompleted: ['lesson-001'] });
      const result = checkBadges(user, MOCK_BADGES, MOCK_LESSONS);
      expect(result).not.toContain('basics-master');
    });
  });

  describe('knowledge-champion badge (all_lessons)', () => {
    it('awards badge when all lessons completed', () => {
      const user = makeUser({ lessonsCompleted: ['lesson-001', 'lesson-002', 'lesson-003'] });
      const result = checkBadges(user, MOCK_BADGES, MOCK_LESSONS);
      expect(result).toContain('knowledge-champion');
    });

    it('does NOT award badge when not all lessons completed', () => {
      const user = makeUser({ lessonsCompleted: ['lesson-001', 'lesson-002'] });
      const result = checkBadges(user, MOCK_BADGES, MOCK_LESSONS);
      expect(result).not.toContain('knowledge-champion');
    });
  });

  it('can award multiple badges at once', () => {
    const user = makeUser({
      lessonsCompleted: ['lesson-001', 'lesson-002', 'lesson-003'],
      currentStreak: 7,
    });
    const result = checkBadges(user, MOCK_BADGES, MOCK_LESSONS);
    expect(result).toContain('first-steps');
    expect(result).toContain('week-warrior');
    expect(result).toContain('basics-master');
    expect(result).toContain('knowledge-champion');
  });
});
