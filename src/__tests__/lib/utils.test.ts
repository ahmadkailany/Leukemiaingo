/**
 * Tests for utility functions used across the app
 */

// --- Score calculation helper ---
function calculateXPEarned(lessonXpReward: number, scorePercent: number): number {
  return Math.round(lessonXpReward * (scorePercent / 100));
}

// --- Level calculation (mirrors logic in /api/progress) ---
function calculateLevel(xp: number): number {
  if (xp < 500) return 1;
  if (xp < 2000) return 2;
  if (xp < 5000) return 3;
  if (xp < 10000) return 4;
  return 5;
}

// --- Answer validation helper ---
function isAnswerCorrect(userAnswer: string, correctAnswer: string): boolean {
  return userAnswer.trim().toLowerCase() === correctAnswer.trim().toLowerCase();
}

// --- Score percentage helper ---
function calcScorePercent(correct: number, total: number): number {
  if (total === 0) return 0;
  return Math.round((correct / total) * 100);
}

describe('XP calculation', () => {
  it('gives full XP for 100% score', () => {
    expect(calculateXPEarned(50, 100)).toBe(50);
  });

  it('gives 0 XP for 0% score', () => {
    expect(calculateXPEarned(50, 0)).toBe(0);
  });

  it('gives partial XP for partial score', () => {
    expect(calculateXPEarned(50, 60)).toBe(30);
  });

  it('rounds XP to nearest integer', () => {
    expect(calculateXPEarned(50, 33)).toBe(17);
  });
});

describe('Level calculation', () => {
  it('returns level 1 for 0 XP', () => {
    expect(calculateLevel(0)).toBe(1);
  });

  it('returns level 1 for 499 XP', () => {
    expect(calculateLevel(499)).toBe(1);
  });

  it('returns level 2 for 500 XP', () => {
    expect(calculateLevel(500)).toBe(2);
  });

  it('returns level 2 for 1999 XP', () => {
    expect(calculateLevel(1999)).toBe(2);
  });

  it('returns level 3 for 2000 XP', () => {
    expect(calculateLevel(2000)).toBe(3);
  });

  it('returns level 4 for 5000 XP', () => {
    expect(calculateLevel(5000)).toBe(4);
  });

  it('returns level 5 for 10000 XP', () => {
    expect(calculateLevel(10000)).toBe(5);
  });
});

describe('Answer validation', () => {
  it('returns true for exact match', () => {
    expect(isAnswerCorrect('bone marrow', 'bone marrow')).toBe(true);
  });

  it('is case-insensitive', () => {
    expect(isAnswerCorrect('BONE MARROW', 'bone marrow')).toBe(true);
  });

  it('trims whitespace', () => {
    expect(isAnswerCorrect('  bone marrow  ', 'bone marrow')).toBe(true);
  });

  it('returns false for wrong answer', () => {
    expect(isAnswerCorrect('heart', 'bone marrow')).toBe(false);
  });

  it('returns false for empty answer', () => {
    expect(isAnswerCorrect('', 'bone marrow')).toBe(false);
  });

  it('handles true/false answers correctly', () => {
    expect(isAnswerCorrect('true', 'true')).toBe(true);
    expect(isAnswerCorrect('false', 'true')).toBe(false);
  });
});

describe('Score percentage calculation', () => {
  it('calculates 100% for all correct', () => {
    expect(calcScorePercent(5, 5)).toBe(100);
  });

  it('calculates 0% for zero correct', () => {
    expect(calcScorePercent(0, 5)).toBe(0);
  });

  it('calculates 60% for 3 of 5 correct', () => {
    expect(calcScorePercent(3, 5)).toBe(60);
  });

  it('handles 0 total questions without crashing', () => {
    expect(calcScorePercent(0, 0)).toBe(0);
  });

  it('rounds to nearest integer', () => {
    expect(calcScorePercent(1, 3)).toBe(33);
  });
});
