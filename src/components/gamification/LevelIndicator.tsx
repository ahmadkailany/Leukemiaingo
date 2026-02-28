import { getLevel } from '@/lib/utils';

interface LevelIndicatorProps {
  xp: number;
  size?: 'sm' | 'md' | 'lg';
}

export default function LevelIndicator({ xp, size = 'md' }: LevelIndicatorProps) {
  const level = getLevel(xp);
  const sizes = {
    sm: 'w-8 h-8 text-sm',
    md: 'w-11 h-11 text-base',
    lg: 'w-14 h-14 text-xl',
  };

  return (
    <div
      className={`${sizes[size]} rounded-2xl flex flex-col items-center justify-center text-white font-extrabold shadow-md`}
      style={{ backgroundColor: level.color }}
      title={`Level ${level.level}: ${level.name}`}
    >
      <span className="leading-none">{level.level}</span>
      {size === 'lg' && <span className="text-xs font-semibold opacity-80 mt-0.5">{level.name}</span>}
    </div>
  );
}
