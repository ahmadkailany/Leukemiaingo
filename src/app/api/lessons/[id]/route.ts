import { NextRequest, NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';
import { Lesson } from '@/types/lesson';

function getLessonsData(): Lesson[] {
  const filePath = path.join(process.cwd(), 'data', 'lessons.json');
  return JSON.parse(fs.readFileSync(filePath, 'utf-8'));
}

function saveLessonsData(lessons: Lesson[]) {
  const filePath = path.join(process.cwd(), 'data', 'lessons.json');
  fs.writeFileSync(filePath, JSON.stringify(lessons, null, 2));
}

export async function GET(_req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await params;
    const lessons = getLessonsData();
    const lesson = lessons.find((l) => l.id === id);
    if (!lesson) return NextResponse.json({ error: 'Lesson not found' }, { status: 404 });
    return NextResponse.json(lesson);
  } catch {
    return NextResponse.json({ error: 'Failed to load lesson' }, { status: 500 });
  }
}

export async function PUT(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await params;
    const body = await req.json();
    const lessons = getLessonsData();
    const idx = lessons.findIndex((l) => l.id === id);
    if (idx === -1) return NextResponse.json({ error: 'Lesson not found' }, { status: 404 });
    lessons[idx] = { ...lessons[idx], ...body };
    saveLessonsData(lessons);
    return NextResponse.json({ message: 'Lesson updated', lesson: lessons[idx] });
  } catch {
    return NextResponse.json({ error: 'Failed to update lesson' }, { status: 500 });
  }
}

export async function DELETE(_req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await params;
    const lessons = getLessonsData();
    const filtered = lessons.filter((l) => l.id !== id);
    if (filtered.length === lessons.length) return NextResponse.json({ error: 'Lesson not found' }, { status: 404 });
    saveLessonsData(filtered);
    return NextResponse.json({ message: 'Lesson deleted' });
  } catch {
    return NextResponse.json({ error: 'Failed to delete lesson' }, { status: 500 });
  }
}
