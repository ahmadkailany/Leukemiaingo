import { NextResponse } from 'next/server';
import { readFileSync } from 'fs';
import { join } from 'path';
import type { User } from '@/types/user';

function getUsersFromFile(): User[] {
  const filePath = join(process.cwd(), 'data', 'users.json');
  return JSON.parse(readFileSync(filePath, 'utf-8'));
}

export async function GET() {
  try {
    const users = getUsersFromFile();
    // Strip sensitive data
    const safeUsers = users.map(({ email: _email, ...u }) => u);
    return NextResponse.json({ users: safeUsers });
  } catch {
    return NextResponse.json({ error: 'Failed to read users' }, { status: 500 });
  }
}
