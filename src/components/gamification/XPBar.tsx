'use client';

import { FiZap } from 'react-icons/fi';
import Progress from '@/components/ui/Progress';
import { getLevelProgress, getLevel, formatNumber } from '@/lib/utils';

interface XPBarProps {
  xp: number;
  showNumbers?: boolean;
  className?: string;
}

export default function XPBar({ xp, showNumbers = true, className }: XPBarProps) {
  const level = getLevel(xp);
  const progress = getLevelProgress(xp);
  const nextLevel = level.level < 5 ? level.level + 1 : null;

  return (
    <div className={className}>
      <div className="flex items-center justify-between mb-2">
        <div className="flex items-center gap-1.5">
          <div
            className="w-6 h-6 rounded-lg flex items-center justify-center text-white text-xs font-bold"
            style={{ backgroundColor: level.color }}
          >
            {level.level}
          </div>
          <span className="text-sm font-semibold text-gray-700">{level.name}</span>
        </div>
        {showNumbers && (
          <div className="flex items-center gap-1 text-xs text-amber-600 font-semibold">
            <FiZap className="w-3.5 h-3.5" />
            <span>{formatNumber(xp)} XP</span>
          </div>
        )}
      </div>
      <Progress value={progress} color="orange" size="md" animated />
      {nextLevel && showNumbers && (
        <p className="text-xs text-gray-400 mt-1 text-right">
          {formatNumber(level.maxXP - xp)} XP to Level {nextLevel}
        </p>
      )}
    </div>
  );
}
