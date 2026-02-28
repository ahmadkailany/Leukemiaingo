import { NextRequest, NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

function getLeaderboardData() {
  const filePath = path.join(process.cwd(), 'data', 'leaderboard.json');
  return JSON.parse(fs.readFileSync(filePath, 'utf-8'));
}

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const type = searchParams.get('type') || 'weekly';
    const limit = parseInt(searchParams.get('limit') || '10');

    const data = getLeaderboardData();
    const board = type === 'allTime' ? data.allTime : data.weekly;
    const limited = board.slice(0, limit);

    return NextResponse.json({
      type,
      leaderboard: limited,
      lastReset: data.lastWeeklyReset,
    });
  } catch {
    return NextResponse.json({ error: 'Failed to load leaderboard' }, { status: 500 });
  }
}
