import { NextResponse } from 'next/server';
import { readFileSync } from 'fs';
import { join } from 'path';
import type { User } from '@/types/user';

function getUsersFromFile(): User[] {
  const filePath = join(process.cwd(), 'data', 'users.json');
  return JSON.parse(readFileSync(filePath, 'utf-8'));
}

export async function GET(
  _request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const users = getUsersFromFile();
    const user = users.find((u) => u.id === id);
    if (!user) return NextResponse.json({ error: 'User not found' }, { status: 404 });
    return NextResponse.json({ user });
  } catch {
    return NextResponse.json({ error: 'Failed to read user' }, { status: 500 });
  }
}
