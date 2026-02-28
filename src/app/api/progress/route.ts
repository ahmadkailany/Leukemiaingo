import { NextResponse } from 'next/server';
import { readFileSync, writeFileSync } from 'fs';
import { join } from 'path';
import type { User } from '@/types/user';
import { getLevel } from '@/lib/utils';

export async function POST(request: Request) {
  try {
    const { userId, lessonId, score, xpEarned } = await request.json();

    const usersPath = join(process.cwd(), 'data', 'users.json');
    const users: User[] = JSON.parse(readFileSync(usersPath, 'utf-8'));
    const userIndex = users.findIndex((u) => u.id === userId);

    if (userIndex === -1) {
      return NextResponse.json({ error: 'User not found' }, { status: 404 });
    }

    const user = users[userIndex];
    const alreadyCompleted = user.stats.lessonsCompleted.includes(lessonId);

    if (!alreadyCompleted) {
      const newXP = user.stats.totalXP + xpEarned;
      const oldLevel = user.stats.level;
      const newLevel = getLevel(newXP).level;

      users[userIndex] = {
        ...user,
        lastActiveAt: new Date().toISOString(),
        stats: {
          ...user.stats,
          totalXP: newXP,
          weeklyXP: user.stats.weeklyXP + xpEarned,
          level: newLevel,
          currentStreak: user.stats.currentStreak,
          lessonsCompleted: [...user.stats.lessonsCompleted, lessonId],
        },
      };

      // Persist to JSON file
      writeFileSync(usersPath, JSON.stringify(users, null, 2));

      return NextResponse.json({
        success: true,
        newXP,
        newLevel,
        leveledUp: newLevel > oldLevel,
        badgesEarned: [],
        streakUpdated: true,
        score,
      });
    }

    return NextResponse.json({ success: true, alreadyCompleted: true });
  } catch {
    return NextResponse.json({ error: 'Failed to update progress' }, { status: 500 });
  }
}
