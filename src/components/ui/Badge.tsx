import { cn } from '@/lib/utils';

type BadgeVariant = 'default' | 'success' | 'warning' | 'error' | 'info' | 'xp' | 'streak' | 'level';
type BadgeSize = 'sm' | 'md' | 'lg';

interface BadgeProps {
  children: React.ReactNode;
  variant?: BadgeVariant;
  size?: BadgeSize;
  className?: string;
  icon?: React.ReactNode;
}

const variantClasses: Record<BadgeVariant, string> = {
  default: 'bg-gray-100 text-gray-700 border border-gray-200',
  success: 'bg-green-100 text-green-700 border border-green-200',
  warning: 'bg-amber-100 text-amber-700 border border-amber-200',
  error: 'bg-red-100 text-red-700 border border-red-200',
  info: 'bg-blue-100 text-blue-700 border border-blue-200',
  xp: 'bg-amber-100 text-amber-700 border border-amber-200',
  streak: 'bg-red-100 text-red-600 border border-red-200',
  level: 'bg-orange-100 text-orange-700 border border-orange-200',
};

const sizeClasses: Record<BadgeSize, string> = {
  sm: 'px-2 py-0.5 text-xs rounded-md gap-1',
  md: 'px-3 py-1 text-sm rounded-lg gap-1.5',
  lg: 'px-4 py-1.5 text-base rounded-xl gap-2',
};

export default function Badge({
  children,
  variant = 'default',
  size = 'md',
  className,
  icon,
}: BadgeProps) {
  return (
    <span
      className={cn(
        'inline-flex items-center font-semibold',
        variantClasses[variant],
        sizeClasses[size],
        className
      )}
    >
      {icon && <span className="flex-shrink-0">{icon}</span>}
      {children}
    </span>
  );
}
