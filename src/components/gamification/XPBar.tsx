'use client';

import { LEVEL_THRESHOLDS } from '@/lib/constants';

interface Props {
  xp: number;
  level: number;
  compact?: boolean;
}

export default function XPBar({ xp, level, compact = false }: Props) {
  const currentThreshold = LEVEL_THRESHOLDS[level - 1] || 0;
  const nextThreshold = LEVEL_THRESHOLDS[level] || LEVEL_THRESHOLDS[LEVEL_THRESHOLDS.length - 1];
  const progress = Math.min(((xp - currentThreshold) / (nextThreshold - currentThreshold)) * 100, 100);

  if (compact) {
    return (
      <div className="flex items-center gap-2">
        <span className="text-xs font-bold text-gray-500">Lv.{level}</span>
        <div className="w-20 h-2 bg-gray-200 rounded-full overflow-hidden">
          <div
            className="h-full bg-gradient-to-r from-orange-400 to-orange-500 rounded-full transition-all duration-500"
            style={{ width: `${progress}%` }}
          />
        </div>
        <span className="text-xs text-orange-500 font-bold">{xp} XP</span>
      </div>
    );
  }

  return (
    <div className="bg-white border border-gray-200 rounded-2xl p-4">
      <div className="flex justify-between items-center mb-2">
        <span className="font-bold text-gray-700">Level {level}</span>
        <span className="text-sm text-orange-500 font-semibold">{xp} / {nextThreshold} XP</span>
      </div>
      <div className="w-full h-3 bg-gray-100 rounded-full overflow-hidden">
        <div
          className="h-full bg-gradient-to-r from-orange-400 to-orange-600 rounded-full transition-all duration-700"
          style={{ width: `${progress}%` }}
        />
      </div>
      <p className="text-xs text-gray-400 mt-1">{nextThreshold - xp} XP to Level {level + 1}</p>
    </div>
  );
}
