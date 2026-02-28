import { NextRequest, NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';
import { User } from '@/types/user';
import { Badge } from '@/types/badge';

function getUsersData(): User[] {
  return JSON.parse(fs.readFileSync(path.join(process.cwd(), 'data', 'users.json'), 'utf-8'));
}
function saveUsersData(users: User[]) {
  fs.writeFileSync(path.join(process.cwd(), 'data', 'users.json'), JSON.stringify(users, null, 2));
}
function getBadgesData(): Badge[] {
  return JSON.parse(fs.readFileSync(path.join(process.cwd(), 'data', 'badges.json'), 'utf-8'));
}
function getLessonsData() {
  return JSON.parse(fs.readFileSync(path.join(process.cwd(), 'data', 'lessons.json'), 'utf-8'));
}

function calculateLevel(xp: number): number {
  if (xp < 500) return 1;
  if (xp < 2000) return 2;
  if (xp < 5000) return 3;
  if (xp < 10000) return 4;
  return 5;
}

function checkBadges(user: User, allBadges: Badge[], allLessons: { id: string; category: string }[]): string[] {
  const newBadges: string[] = [];
  for (const badge of allBadges) {
    if (user.stats.badgesEarned.includes(badge.id)) continue;
    const { type, value } = badge.condition;
    if (type === 'lessons_completed' && user.stats.lessonsCompleted.length >= value) newBadges.push(badge.id);
    if (type === 'streak' && user.stats.currentStreak >= value) newBadges.push(badge.id);
    if (type === 'all_lessons' && user.stats.lessonsCompleted.length >= allLessons.length) newBadges.push(badge.id);
    if (type === 'category_completed') {
      const catLessons = allLessons.filter((l) => l.category === value).map((l) => l.id);
      if (catLessons.every((id) => user.stats.lessonsCompleted.includes(id))) newBadges.push(badge.id);
    }
  }
  return newBadges;
}

export async function POST(req: NextRequest) {
  try {
    const { userId, lessonId, score, xpEarned } = await req.json();
    const users = getUsersData();
    const allBadges = getBadgesData();
    const allLessons = getLessonsData();
    const idx = users.findIndex((u) => u.id === userId);
    if (idx === -1) return NextResponse.json({ error: 'User not found' }, { status: 404 });

    const user = users[idx];

    // Update XP
    user.stats.totalXP += xpEarned;
    user.stats.weeklyXP = (user.stats.weeklyXP || 0) + xpEarned;

    // Update level
    user.stats.level = calculateLevel(user.stats.totalXP);

    // Update lessons completed
    if (!user.stats.lessonsCompleted.includes(lessonId)) {
      user.stats.lessonsCompleted.push(lessonId);
    }

    // Update streak
    const today = new Date().toDateString();
    const lastActive = new Date(user.lastActiveAt).toDateString();
    const yesterday = new Date(Date.now() - 86400000).toDateString();
    if (lastActive !== today) {
      if (lastActive === yesterday) {
        user.stats.currentStreak += 1;
      } else {
        user.stats.currentStreak = 1;
      }
      if (user.stats.currentStreak > user.stats.longestStreak) {
        user.stats.longestStreak = user.stats.currentStreak;
      }
    }
    user.lastActiveAt = new Date().toISOString();

    // Check for new badges
    const newBadges = checkBadges(user, allBadges, allLessons);
    if (newBadges.length > 0) {
      user.stats.badgesEarned.push(...newBadges);
      // Bonus XP for badges
      const bonusXP = newBadges.reduce((acc, bid) => {
        const b = allBadges.find((b) => b.id === bid);
        return acc + (b?.xpBonus || 0);
      }, 0);
      user.stats.totalXP += bonusXP;
      user.stats.weeklyXP += bonusXP;
    }

    users[idx] = user;
    saveUsersData(users);

    return NextResponse.json({
      success: true,
      score,
      newXP: user.stats.totalXP,
      newLevel: user.stats.level,
      newStreak: user.stats.currentStreak,
      badgesEarned: newBadges,
    });
  } catch (e) {
    console.error(e);
    return NextResponse.json({ error: 'Failed to update progress' }, { status: 500 });
  }
}
