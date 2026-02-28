import { NextResponse } from 'next/server';
import { readFileSync } from 'fs';
import { join } from 'path';
import type { Lesson } from '@/types/lesson';

function getLessonsFromFile(): Lesson[] {
  const filePath = join(process.cwd(), 'data', 'lessons.json');
  return JSON.parse(readFileSync(filePath, 'utf-8'));
}

export async function GET(
  _request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const lessons = getLessonsFromFile();
    const lesson = lessons.find((l) => l.id === id);
    if (!lesson) return NextResponse.json({ error: 'Lesson not found' }, { status: 404 });
    return NextResponse.json({ lesson });
  } catch {
    return NextResponse.json({ error: 'Failed to read lesson' }, { status: 500 });
  }
}
