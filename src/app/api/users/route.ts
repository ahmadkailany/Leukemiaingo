import { NextRequest, NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';
import { User } from '@/types/user';

function getUsersData(): User[] {
  const filePath = path.join(process.cwd(), 'data', 'users.json');
  return JSON.parse(fs.readFileSync(filePath, 'utf-8'));
}

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const page = parseInt(searchParams.get('page') || '1');
    const limit = parseInt(searchParams.get('limit') || '20');
    const search = searchParams.get('search') || '';

    let users = getUsersData();
    if (search) {
      users = users.filter((u) => u.username.toLowerCase().includes(search.toLowerCase()));
    }
    // Remove sensitive fields
    const safe = users.map(({ email: _e, ...rest }) => rest);
    const start = (page - 1) * limit;
    const paginated = safe.slice(start, start + limit);

    return NextResponse.json({
      users: paginated,
      pagination: { total: users.length, page, limit, totalPages: Math.ceil(users.length / limit) },
    });
  } catch {
    return NextResponse.json({ error: 'Failed to load users' }, { status: 500 });
  }
}
