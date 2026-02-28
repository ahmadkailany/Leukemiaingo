'use client';

import { cn } from '@/lib/utils';

interface ProgressProps {
  value: number; // 0-100
  className?: string;
  barClassName?: string;
  showLabel?: boolean;
  size?: 'sm' | 'md' | 'lg';
  color?: 'orange' | 'green' | 'blue' | 'red' | 'gold';
  animated?: boolean;
}

const colorClasses = {
  orange: 'bg-gradient-to-r from-orange-400 to-orange-600',
  green: 'bg-gradient-to-r from-green-400 to-green-600',
  blue: 'bg-gradient-to-r from-blue-400 to-blue-600',
  red: 'bg-gradient-to-r from-red-400 to-red-600',
  gold: 'bg-gradient-to-r from-amber-400 to-amber-600',
};

const sizeClasses = {
  sm: 'h-1.5',
  md: 'h-2.5',
  lg: 'h-4',
};

export default function Progress({
  value,
  className,
  barClassName,
  showLabel = false,
  size = 'md',
  color = 'orange',
  animated = false,
}: ProgressProps) {
  const clamped = Math.min(100, Math.max(0, value));

  return (
    <div className={cn('w-full', className)}>
      {showLabel && (
        <div className="flex justify-between text-xs text-gray-500 mb-1">
          <span>Progress</span>
          <span>{clamped}%</span>
        </div>
      )}
      <div className={cn('w-full bg-gray-100 rounded-full overflow-hidden', sizeClasses[size])}>
        <div
          className={cn(
            'h-full rounded-full transition-all duration-700 ease-out',
            colorClasses[color],
            animated && 'xp-progress-bar',
            barClassName
          )}
          style={{ width: `${clamped}%` }}
        />
      </div>
    </div>
  );
}
