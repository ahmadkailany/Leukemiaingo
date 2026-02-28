import { cn } from '@/lib/utils';

interface CardProps {
  children: React.ReactNode;
  className?: string;
  hover?: boolean;
  padding?: 'sm' | 'md' | 'lg' | 'none';
  gradient?: boolean;
}

export default function Card({
  children,
  className,
  hover = false,
  padding = 'md',
  gradient = false,
}: CardProps) {
  const paddings = {
    none: '',
    sm: 'p-4',
    md: 'p-6',
    lg: 'p-8',
  };

  return (
    <div
      className={cn(
        'bg-white rounded-2xl border border-gray-100 shadow-sm',
        paddings[padding],
        hover && 'transition-all duration-300 hover:shadow-md hover:-translate-y-0.5 cursor-pointer',
        gradient && 'bg-gradient-to-br from-white to-orange-50',
        className
      )}
    >
      {children}
    </div>
  );
}
