'use client';

import { Badge } from '@/types/badge';
import {
  FiTarget, FiSearch, FiShield, FiHeart, FiZap, FiAward, FiStar, FiBook
} from 'react-icons/fi';

const ICON_MAP: Record<string, React.ReactNode> = {
  FiTarget: <FiTarget />,
  FiSearch: <FiSearch />,
  FiShield: <FiShield />,
  FiHeart: <FiHeart />,
  FiZap: <FiZap />,
  FiAward: <FiAward />,
  FiStar: <FiStar />,
  FiBook: <FiBook />,
};

const COLOR_MAP: Record<string, string> = {
  orange: 'bg-orange-100 text-orange-600 border-orange-200',
  red: 'bg-red-100 text-red-600 border-red-200',
  yellow: 'bg-yellow-100 text-yellow-600 border-yellow-200',
  green: 'bg-green-100 text-green-600 border-green-200',
  blue: 'bg-blue-100 text-blue-600 border-blue-200',
  purple: 'bg-purple-100 text-purple-600 border-purple-200',
  gold: 'bg-amber-100 text-amber-600 border-amber-200',
};

interface Props {
  badges: Badge[];
  earnedIds: string[];
}

export default function BadgeGrid({ badges, earnedIds }: Props) {
  return (
    <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 gap-3">
      {badges.map((badge) => {
        const earned = earnedIds.includes(badge.id);
        const colorClass = earned ? COLOR_MAP[badge.color] || COLOR_MAP.orange : 'bg-gray-100 text-gray-400 border-gray-200';
        return (
          <div
            key={badge.id}
            title={`${badge.name}: ${badge.description}`}
            className={`flex flex-col items-center gap-1 p-3 rounded-xl border-2 transition-all ${
              earned ? colorClass + ' shadow-md' : 'opacity-40 ' + colorClass
            }`}
          >
            <div className="text-2xl">{ICON_MAP[badge.icon] || <FiAward />}</div>
            <span className="text-xs font-semibold text-center leading-tight">{badge.name}</span>
            {earned && <span className="text-[10px] text-green-500 font-bold">✓ Earned</span>}
          </div>
        );
      })}
    </div>
  );
}
