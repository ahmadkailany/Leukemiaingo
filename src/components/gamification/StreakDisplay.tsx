'use client';

import { FiZap } from 'react-icons/fi';

interface Props {
  streak: number;
  compact?: boolean;
}

export default function StreakDisplay({ streak, compact = false }: Props) {
  if (compact) {
    return (
      <div className="flex items-center gap-1 bg-orange-50 border border-orange-200 rounded-full px-3 py-1">
        <FiZap className="text-orange-500 text-sm" />
        <span className="text-orange-600 font-bold text-sm">{streak}</span>
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center bg-gradient-to-b from-orange-50 to-orange-100 border border-orange-200 rounded-2xl p-4">
      <FiZap className="text-orange-500 text-4xl mb-1" />
      <span className="text-3xl font-extrabold text-orange-600">{streak}</span>
      <span className="text-xs text-orange-400 font-medium uppercase tracking-wide">Day Streak</span>
      {streak >= 7 && (
        <span className="mt-2 text-xs bg-orange-500 text-white rounded-full px-2 py-0.5">
          {streak >= 30 ? '🏆 Month Master' : streak >= 7 ? '⚡ Week Warrior' : ''}
        </span>
      )}
    </div>
  );
}
