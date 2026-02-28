'use client';

import { LEVEL_NAMES } from '@/lib/constants';

interface Props {
  level: number;
}

export default function LevelIndicator({ level }: Props) {
  const levelName = LEVEL_NAMES[level - 1] || 'Champion';
  return (
    <div className="inline-flex items-center gap-2 bg-gradient-to-r from-orange-500 to-orange-600 text-white rounded-full px-4 py-1.5 shadow">
      <span className="font-bold text-sm">Lv.{level}</span>
      <span className="text-xs opacity-80">{levelName}</span>
    </div>
  );
}
