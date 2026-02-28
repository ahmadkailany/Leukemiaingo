import { NextResponse } from 'next/server';
import { readFileSync } from 'fs';
import { join } from 'path';

export async function GET() {
  try {
    const filePath = join(process.cwd(), 'data', 'badges.json');
    const badges = JSON.parse(readFileSync(filePath, 'utf-8'));
    return NextResponse.json({ badges });
  } catch {
    return NextResponse.json({ error: 'Failed to read badges' }, { status: 500 });
  }
}
