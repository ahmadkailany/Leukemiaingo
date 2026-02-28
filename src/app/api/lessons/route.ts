import { NextResponse } from 'next/server';
import { readFileSync } from 'fs';
import { join } from 'path';
import type { Lesson } from '@/types/lesson';

function getLessonsFromFile(): Lesson[] {
  const filePath = join(process.cwd(), 'data', 'lessons.json');
  const raw = readFileSync(filePath, 'utf-8');
  return JSON.parse(raw);
}

export async function GET() {
  try {
    const lessons = getLessonsFromFile();
    return NextResponse.json({ lessons });
  } catch {
    return NextResponse.json({ error: 'Failed to read lessons' }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const lessons = getLessonsFromFile();
    const newLesson: Lesson = {
      ...body,
      id: `lesson-${String(lessons.length + 1).padStart(3, '0')}`,
      order: lessons.length + 1,
    };
    // NOTE: In production, write to DB instead
    return NextResponse.json({ message: 'Lesson created', lesson: newLesson }, { status: 201 });
  } catch {
    return NextResponse.json({ error: 'Failed to create lesson' }, { status: 500 });
  }
}
