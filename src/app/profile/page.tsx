'use client';

import { useStore } from '@/lib/store';
import { useEffect, useState } from 'react';
import { Badge } from '@/types/badge';
import BadgeGrid from '@/components/gamification/BadgeGrid';
import XPBar from '@/components/gamification/XPBar';
import StreakDisplay from '@/components/gamification/StreakDisplay';
import LevelIndicator from '@/components/gamification/LevelIndicator';
import { FiUser, FiBook, FiZap } from 'react-icons/fi';

export default function ProfilePage() {
  const user = useStore((s) => s.user);
  const [badges, setBadges] = useState<Badge[]>([]);

  useEffect(() => {
    fetch('/api/badges').then((r) => r.json()).then((d) => setBadges(d.badges || []));
  }, []);

  if (!user) {
    return (
      <div className="max-w-xl mx-auto px-4 py-20 text-center">
        <FiUser className="text-6xl text-gray-300 mx-auto mb-4" />
        <h2 className="text-2xl font-bold text-gray-600">No profile yet</h2>
        <p className="text-gray-400">Complete a lesson to start your profile</p>
      </div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto px-4 py-10">
      {/* Profile Header */}
      <div className="bg-gradient-to-r from-orange-500 to-orange-600 text-white rounded-3xl p-8 mb-6 flex items-center gap-6">
        <div className="w-20 h-20 rounded-full bg-white bg-opacity-20 flex items-center justify-center text-4xl font-extrabold">
          {user.username[0].toUpperCase()}
        </div>
        <div>
          <h1 className="text-2xl font-extrabold">{user.username}</h1>
          <LevelIndicator level={user.stats.level} />
          <p className="text-orange-100 text-sm mt-1">Member since {new Date(user.createdAt).toLocaleDateString()}</p>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
        {[
          { icon: <FiZap className="text-orange-500" />, value: user.stats.totalXP, label: 'Total XP' },
          { icon: <FiBook className="text-orange-500" />, value: user.stats.lessonsCompleted.length, label: 'Lessons Done' },
          { icon: <FiZap className="text-orange-500" />, value: user.stats.currentStreak, label: 'Day Streak' },
          { icon: <FiZap className="text-orange-500" />, value: user.stats.longestStreak, label: 'Best Streak' },
        ].map((s) => (
          <div key={s.label} className="bg-white border border-gray-100 rounded-2xl p-4 text-center shadow-sm">
            <div className="flex justify-center mb-1">{s.icon}</div>
            <div className="text-2xl font-extrabold text-gray-800">{s.value}</div>
            <div className="text-xs text-gray-500">{s.label}</div>
          </div>
        ))}
      </div>

      {/* XP Progress */}
      <div className="mb-6">
        <h2 className="font-extrabold text-gray-700 mb-3">XP Progress</h2>
        <XPBar xp={user.stats.totalXP} level={user.stats.level} />
      </div>

      {/* Streak */}
      <div className="mb-6 flex gap-4">
        <div className="flex-1">
          <h2 className="font-extrabold text-gray-700 mb-3">Current Streak</h2>
          <StreakDisplay streak={user.stats.currentStreak} />
        </div>
      </div>

      {/* Badges */}
      <div>
        <h2 className="font-extrabold text-gray-700 mb-3">Badges ({user.stats.badgesEarned.length}/{badges.length})</h2>
        <BadgeGrid badges={badges} earnedIds={user.stats.badgesEarned} />
      </div>
    </div>
  );
}
