'use client';

import { FiTarget, FiEye, FiShield, FiHeart, FiZap, FiAward, FiStar, FiBookOpen, FiTrendingUp } from 'react-icons/fi';
import { cn } from '@/lib/utils';
import type { Badge } from '@/types/badge';

const iconMap: Record<string, React.ComponentType<{ className?: string }>> = {
  FiTarget,
  FiEye,
  FiShield,
  FiHeart,
  FiZap,
  FiAward,
  FiStar,
  FiBookOpen,
  FiTrendingUp,
};

const colorMap: Record<string, string> = {
  orange: 'from-orange-400 to-orange-600',
  red: 'from-red-400 to-red-600',
  yellow: 'from-amber-400 to-amber-600',
  green: 'from-green-400 to-green-600',
  blue: 'from-blue-400 to-blue-600',
  purple: 'from-purple-400 to-purple-600',
  gold: 'from-yellow-400 to-amber-500',
};

interface BadgeGridProps {
  badges: Badge[];
  earnedIds: string[];
  size?: 'sm' | 'md' | 'lg';
}

export default function BadgeGrid({ badges, earnedIds, size = 'md' }: BadgeGridProps) {
  const sizePx = { sm: 'w-12 h-12', md: 'w-16 h-16', lg: 'w-20 h-20' };
  const iconPx = { sm: 'w-5 h-5', md: 'w-7 h-7', lg: 'w-9 h-9' };

  return (
    <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 gap-4">
      {badges.map((badge) => {
        const earned = earnedIds.includes(badge.id);
        const IconComponent = iconMap[badge.icon] || FiAward;
        const gradient = colorMap[badge.color] || colorMap['orange'];

        return (
          <div key={badge.id} className="flex flex-col items-center gap-2 group">
            <div
              className={cn(
                sizePx[size],
                'rounded-2xl flex items-center justify-center transition-all duration-300',
                earned
                  ? `bg-gradient-to-br ${gradient} shadow-md group-hover:shadow-lg group-hover:scale-105`
                  : 'bg-gray-100 border-2 border-dashed border-gray-200 opacity-40'
              )}
              title={badge.description}
            >
              <IconComponent
                className={cn(iconPx[size], earned ? 'text-white' : 'text-gray-400')}
              />
            </div>
            <p className={cn(
              'text-xs text-center font-medium leading-tight max-w-[60px]',
              earned ? 'text-gray-700' : 'text-gray-400'
            )}>
              {badge.name}
            </p>
          </div>
        );
      })}
    </div>
  );
}
