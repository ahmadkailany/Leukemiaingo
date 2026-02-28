import { NextRequest, NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';
import { Lesson } from '@/types/lesson';

function getLessonsData(): Lesson[] {
  const filePath = path.join(process.cwd(), 'data', 'lessons.json');
  const raw = fs.readFileSync(filePath, 'utf-8');
  return JSON.parse(raw);
}

function saveLessonsData(lessons: Lesson[]) {
  const filePath = path.join(process.cwd(), 'data', 'lessons.json');
  fs.writeFileSync(filePath, JSON.stringify(lessons, null, 2));
}

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const category = searchParams.get('category');
    const page = parseInt(searchParams.get('page') || '1');
    const limit = parseInt(searchParams.get('limit') || '20');

    let lessons = getLessonsData();

    if (category) {
      lessons = lessons.filter((l) => l.category === category);
    }

    // Strip questions for list view (lighter payload)
    const lightLessons = lessons.map(({ questions: _q, ...rest }) => rest);
    const start = (page - 1) * limit;
    const paginated = lightLessons.slice(start, start + limit);

    return NextResponse.json({
      lessons: paginated,
      pagination: { total: lessons.length, page, limit, totalPages: Math.ceil(lessons.length / limit) },
    });
  } catch {
    return NextResponse.json({ error: 'Failed to load lessons' }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const lessons = getLessonsData();
    const newLesson: Lesson = {
      ...body,
      id: `lesson-${String(lessons.length + 1).padStart(3, '0')}`,
    };
    lessons.push(newLesson);
    saveLessonsData(lessons);
    return NextResponse.json({ message: 'Lesson created', lessonId: newLesson.id }, { status: 201 });
  } catch {
    return NextResponse.json({ error: 'Failed to create lesson' }, { status: 500 });
  }
}
