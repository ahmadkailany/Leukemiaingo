'use client';

import Link from 'next/link';
import { FiLock, FiCheckCircle, FiChevronRight } from 'react-icons/fi';
import { MdScience, MdSearch, MdWarning, MdLocalHospital, MdFavorite, MdBloodtype, MdCategory, MdMedication } from 'react-icons/md';
import { cn } from '@/lib/utils';
import { CATEGORY_LABELS } from '@/lib/constants';
import type { Lesson } from '@/types/lesson';

const iconMap: Record<string, React.ComponentType<{ className?: string }>> = {
  MdScience,
  MdSearch,
  MdWarning,
  MdLocalHospital,
  MdFavorite,
  MdBloodtype,
  MdCategory,
  MdMedication,
};

const categoryGradients: Record<string, string> = {
  basics: 'from-blue-400 to-blue-600',
  symptoms: 'from-red-400 to-red-600',
  risks: 'from-amber-400 to-amber-600',
  treatment: 'from-green-400 to-green-600',
  support: 'from-purple-400 to-purple-600',
};

const categoryBg: Record<string, string> = {
  basics: 'bg-blue-50 border-blue-100',
  symptoms: 'bg-red-50 border-red-100',
  risks: 'bg-amber-50 border-amber-100',
  treatment: 'bg-green-50 border-green-100',
  support: 'bg-purple-50 border-purple-100',
};

interface LessonCardProps {
  lesson: Lesson;
  completed?: boolean;
  locked?: boolean;
}

export default function LessonCard({ lesson, completed = false, locked = false }: LessonCardProps) {
  const IconComponent = iconMap[lesson.icon] || MdScience;
  const gradient = categoryGradients[lesson.category] || categoryGradients['basics'];
  const bgClass = categoryBg[lesson.category] || categoryBg['basics'];

  const difficultyColors = {
    easy: 'bg-green-100 text-green-700',
    medium: 'bg-amber-100 text-amber-700',
    hard: 'bg-red-100 text-red-700',
  };

  const CardContent = (
    <div
      className={cn(
        'relative flex items-center gap-4 p-4 rounded-2xl border-2 transition-all duration-300 group',
        completed
          ? 'bg-green-50 border-green-200 hover:shadow-md'
          : locked
          ? 'bg-gray-50 border-gray-100 opacity-60 cursor-not-allowed'
          : `${bgClass} hover:shadow-md hover:-translate-y-0.5 cursor-pointer`
      )}
    >
      {/* Icon */}
      <div
        className={cn(
          'w-14 h-14 rounded-2xl flex items-center justify-center flex-shrink-0 shadow-md',
          locked
            ? 'bg-gray-200'
            : completed
            ? 'bg-gradient-to-br from-green-400 to-green-600'
            : `bg-gradient-to-br ${gradient}`
        )}
      >
        {locked ? (
          <FiLock className="w-6 h-6 text-gray-400" />
        ) : completed ? (
          <FiCheckCircle className="w-6 h-6 text-white" />
        ) : (
          <IconComponent className="w-6 h-6 text-white" />
        )}
      </div>

      {/* Content */}
      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-2 mb-0.5">
          <span className="text-xs text-gray-500 font-medium">
            {CATEGORY_LABELS[lesson.category]}
          </span>
          <span
            className={cn(
              'px-2 py-0.5 text-xs rounded-md font-semibold',
              difficultyColors[lesson.difficulty]
            )}
          >
            {lesson.difficulty}
          </span>
        </div>
        <h3 className="font-bold text-gray-900 truncate">{lesson.title}</h3>
        <p className="text-sm text-gray-500 truncate mt-0.5">{lesson.description}</p>
        <div className="flex items-center gap-3 mt-1.5">
          <span className="text-xs font-semibold text-amber-600">
            +{lesson.xpReward} XP
          </span>
          <span className="text-xs text-gray-400">
            {lesson.questions.length} questions
          </span>
        </div>
      </div>

      {/* Arrow */}
      {!locked && (
        <FiChevronRight className="w-5 h-5 text-gray-400 flex-shrink-0 group-hover:translate-x-1 transition-transform" />
      )}

      {/* Completed check */}
      {completed && (
        <div className="absolute -top-2 -right-2 w-6 h-6 bg-green-500 rounded-full flex items-center justify-center">
          <FiCheckCircle className="w-4 h-4 text-white" />
        </div>
      )}
    </div>
  );

  if (locked) return CardContent;
  return <Link href={`/lessons/${lesson.id}`}>{CardContent}</Link>;
}
