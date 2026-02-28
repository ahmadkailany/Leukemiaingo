import { NextRequest, NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';
import { User } from '@/types/user';

function getUsersData(): User[] {
  const filePath = path.join(process.cwd(), 'data', 'users.json');
  return JSON.parse(fs.readFileSync(filePath, 'utf-8'));
}

function saveUsersData(users: User[]) {
  const filePath = path.join(process.cwd(), 'data', 'users.json');
  fs.writeFileSync(filePath, JSON.stringify(users, null, 2));
}

export async function GET(_req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await params;
    const users = getUsersData();
    const user = users.find((u) => u.id === id);
    if (!user) return NextResponse.json({ error: 'User not found' }, { status: 404 });
    const { email: _e, ...safe } = user;
    return NextResponse.json(safe);
  } catch {
    return NextResponse.json({ error: 'Failed to load user' }, { status: 500 });
  }
}

export async function PUT(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await params;
    const body = await req.json();
    const users = getUsersData();
    const idx = users.findIndex((u) => u.id === id);
    if (idx === -1) return NextResponse.json({ error: 'User not found' }, { status: 404 });
    users[idx] = { ...users[idx], ...body, id };
    saveUsersData(users);
    const { email: _e, ...safe } = users[idx];
    return NextResponse.json({ message: 'User updated', user: safe });
  } catch {
    return NextResponse.json({ error: 'Failed to update user' }, { status: 500 });
  }
}
