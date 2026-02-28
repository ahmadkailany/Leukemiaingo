import { NextResponse } from 'next/server';
import { readFileSync } from 'fs';
import { join } from 'path';

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const type = searchParams.get('type') || 'weekly';
    const filePath = join(process.cwd(), 'data', 'leaderboard.json');
    const data = JSON.parse(readFileSync(filePath, 'utf-8'));
    const leaderboard = type === 'allTime' ? data.allTime : data.weekly;
    return NextResponse.json({ leaderboard, lastReset: data.lastWeeklyReset });
  } catch {
    return NextResponse.json({ error: 'Failed to read leaderboard' }, { status: 500 });
  }
}
