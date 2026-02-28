'use client';

import { MdLocalFireDepartment } from 'react-icons/md';
import { cn } from '@/lib/utils';

interface StreakDisplayProps {
  streak: number;
  size?: 'sm' | 'md' | 'lg';
  className?: string;
}

export default function StreakDisplay({ streak, size = 'md', className }: StreakDisplayProps) {
  const sizes = {
    sm: { container: 'px-3 py-1.5', icon: 'w-4 h-4', text: 'text-sm' },
    md: { container: 'px-4 py-2', icon: 'w-5 h-5', text: 'text-base' },
    lg: { container: 'px-6 py-3', icon: 'w-7 h-7', text: 'text-xl' },
  };

  const s = sizes[size];

  return (
    <div
      className={cn(
        'flex items-center gap-2 bg-gradient-to-r from-red-50 to-orange-50 rounded-2xl border border-red-100',
        s.container,
        className
      )}
    >
      <MdLocalFireDepartment
        className={cn(s.icon, 'text-red-500', streak > 0 && 'animate-pulse')}
      />
      <div>
        <p className={cn('font-extrabold text-gray-900', s.text)}>{streak}</p>
        <p className="text-xs text-gray-500">day streak</p>
      </div>
    </div>
  );
}
