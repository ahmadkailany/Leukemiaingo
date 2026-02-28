import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

export async function GET() {
  try {
    const filePath = path.join(process.cwd(), 'data', 'badges.json');
    const badges = JSON.parse(fs.readFileSync(filePath, 'utf-8'));
    return NextResponse.json({ badges });
  } catch {
    return NextResponse.json({ error: 'Failed to load badges' }, { status: 500 });
  }
}
