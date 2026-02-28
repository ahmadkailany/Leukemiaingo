'use client';

import { useEffect, useState } from 'react';
import { useSearchParams } from 'next/navigation';
import { LessonLight } from '@/types/lesson';
import LessonCard from '@/components/lessons/LessonCard';
import { FiFilter } from 'react-icons/fi';
import { useStore } from '@/lib/store';

const CATEGORIES = [
  { value: '', label: 'All' },
  { value: 'basics', label: 'Basics' },
  { value: 'symptoms', label: 'Symptoms' },
  { value: 'risks', label: 'Risk Factors' },
  { value: 'treatment', label: 'Treatment' },
  { value: 'support', label: 'Support' },
];

export default function LessonsClient() {
  const searchParams = useSearchParams();
  const [lessons, setLessons] = useState<LessonLight[]>([]);
  const [category, setCategory] = useState(searchParams.get('category') || '');
  const [loading, setLoading] = useState(true);
  const user = useStore((s) => s.user);

  useEffect(() => {
    setLoading(true);
    const url = category ? `/api/lessons?category=${category}` : '/api/lessons';
    fetch(url)
      .then((r) => r.json())
      .then((d) => setLessons(d.lessons || []))
      .finally(() => setLoading(false));
  }, [category]);

  return (
    <div className="max-w-4xl mx-auto px-4 py-10">
      <h1 className="text-3xl font-extrabold text-gray-800 mb-2">Lessons</h1>
      <p className="text-gray-500 mb-6">Complete lessons to earn XP and unlock badges</p>

      {/* Category Filter */}
      <div className="flex items-center gap-2 flex-wrap mb-8">
        <FiFilter className="text-gray-400" />
        {CATEGORIES.map((c) => (
          <button
            key={c.value}
            onClick={() => setCategory(c.value)}
            className={`px-4 py-1.5 rounded-full text-sm font-semibold border transition-all ${
              category === c.value
                ? 'bg-orange-500 text-white border-orange-500'
                : 'bg-white text-gray-600 border-gray-200 hover:border-orange-300'
            }`}
          >
            {c.label}
          </button>
        ))}
      </div>

      {/* Lessons Grid */}
      {loading ? (
        <div className="flex justify-center py-20">
          <div className="animate-spin rounded-full h-12 w-12 border-4 border-orange-500 border-t-transparent" />
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
          {lessons.map((lesson) => (
            <LessonCard
              key={lesson.id}
              lesson={lesson}
              completed={user?.stats.lessonsCompleted.includes(lesson.id) || false}
            />
          ))}
        </div>
      )}
    </div>
  );
}
