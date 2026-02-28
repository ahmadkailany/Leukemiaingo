'use client';

import Link from 'next/link';
import { LessonLight } from '@/types/lesson';
import { FiCheckCircle, FiLock, FiZap, FiArrowRight } from 'react-icons/fi';

const DIFFICULTY_COLORS: Record<string, string> = {
  easy: 'bg-green-100 text-green-700',
  medium: 'bg-yellow-100 text-yellow-700',
  hard: 'bg-red-100 text-red-700',
};

const CATEGORY_GRADIENTS: Record<string, string> = {
  basics: 'from-orange-400 to-orange-500',
  symptoms: 'from-red-400 to-red-500',
  risks: 'from-yellow-400 to-yellow-500',
  treatment: 'from-green-400 to-green-500',
  support: 'from-blue-400 to-blue-500',
};

interface Props {
  lesson: LessonLight;
  completed: boolean;
  locked?: boolean;
}

export default function LessonCard({ lesson, completed, locked = false }: Props) {
  const gradient = CATEGORY_GRADIENTS[lesson.category] || 'from-orange-400 to-orange-500';

  return (
    <div className={`relative rounded-2xl overflow-hidden border-2 transition-all ${
      completed ? 'border-green-400' : locked ? 'border-gray-200 opacity-60' : 'border-transparent hover:border-orange-300 hover:shadow-lg hover:-translate-y-1'
    }`}>
      {/* Top gradient bar */}
      <div className={`h-2 bg-gradient-to-r ${gradient}`} />

      <div className="bg-white p-5">
        <div className="flex items-start justify-between gap-3">
          <div className="flex-1">
            <div className="flex items-center gap-2 mb-1">
              <span className={`text-xs font-semibold px-2 py-0.5 rounded-full ${DIFFICULTY_COLORS[lesson.difficulty]}`}>
                {lesson.difficulty}
              </span>
              <span className="text-xs text-gray-400 capitalize">{lesson.category}</span>
            </div>
            <h3 className="font-extrabold text-gray-800 text-lg leading-tight">{lesson.title}</h3>
            <p className="text-sm text-gray-500 mt-1 line-clamp-2">{lesson.description}</p>
          </div>
          <div className="flex-shrink-0 mt-1">
            {completed ? (
              <FiCheckCircle className="text-3xl text-green-500" />
            ) : locked ? (
              <FiLock className="text-3xl text-gray-300" />
            ) : (
              <div className={`w-12 h-12 rounded-full bg-gradient-to-br ${gradient} flex items-center justify-center text-white text-xl shadow`}>
                🦠
              </div>
            )}
          </div>
        </div>

        <div className="flex items-center justify-between mt-4">
          <div className="flex items-center gap-1 text-orange-500">
            <FiZap className="text-sm" />
            <span className="text-sm font-bold">{lesson.xpReward} XP</span>
          </div>
          {!locked && (
            <Link
              href={`/lessons/${lesson.id}`}
              className={`flex items-center gap-1 text-sm font-bold px-4 py-2 rounded-full transition-all ${
                completed
                  ? 'bg-green-100 text-green-700 hover:bg-green-200'
                  : 'bg-orange-500 text-white hover:bg-orange-600'
              }`}
            >
              {completed ? 'Redo' : 'Start'} <FiArrowRight />
            </Link>
          )}
        </div>
      </div>
    </div>
  );
}
