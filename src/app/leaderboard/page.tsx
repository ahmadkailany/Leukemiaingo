'use client';

import { useEffect, useState } from 'react';
import { LeaderboardEntry } from '@/types/api';
import { MdLeaderboard } from 'react-icons/md';
import { FiZap } from 'react-icons/fi';

const AVATAR_COLORS: Record<string, string> = {
  orange: 'bg-orange-400',
  blue: 'bg-blue-400',
  purple: 'bg-purple-400',
  green: 'bg-green-400',
  red: 'bg-red-400',
};

const RANK_MEDALS = ['\uD83E\uDD47', '\uD83E\uDD48', '\uD83E\uDD49'];

export default function LeaderboardPage() {
  const [tab, setTab] = useState<'weekly' | 'allTime'>('weekly');
  const [data, setData] = useState<LeaderboardEntry[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    fetch(`/api/leaderboard?type=${tab}&limit=10`)
      .then((r) => r.json())
      .then((d) => setData(d.leaderboard || []))
      .finally(() => setLoading(false));
  }, [tab]);

  return (
    <div className="max-w-2xl mx-auto px-4 py-10">
      <div className="flex items-center gap-3 mb-6">
        <MdLeaderboard className="text-4xl text-orange-500" />
        <div>
          <h1 className="text-3xl font-extrabold text-gray-800">Leaderboard</h1>
          <p className="text-gray-500 text-sm">Compete with learners worldwide</p>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex gap-2 mb-6">
        {(['weekly', 'allTime'] as const).map((t) => (
          <button
            key={t}
            onClick={() => setTab(t)}
            className={`px-5 py-2 rounded-full font-semibold text-sm transition-all ${
              tab === t ? 'bg-orange-500 text-white' : 'bg-gray-100 text-gray-600 hover:bg-orange-50'
            }`}
          >
            {t === 'weekly' ? 'This Week' : 'All Time'}
          </button>
        ))}
      </div>

      {loading ? (
        <div className="flex justify-center py-20">
          <div className="animate-spin rounded-full h-12 w-12 border-4 border-orange-500 border-t-transparent" />
        </div>
      ) : (
        <div className="space-y-3">
          {data.map((entry, i) => (
            <div
              key={entry.userId}
              className={`flex items-center gap-4 p-4 rounded-2xl border-2 transition-all ${
                i === 0 ? 'border-amber-300 bg-amber-50' : i === 1 ? 'border-gray-300 bg-gray-50' : i === 2 ? 'border-orange-200 bg-orange-50' : 'border-gray-100 bg-white'
              }`}
            >
              <span className="text-2xl w-8 text-center">{RANK_MEDALS[i] || `#${i + 1}`}</span>
              <div className={`w-10 h-10 rounded-full flex items-center justify-center text-white font-bold ${AVATAR_COLORS[entry.avatar] || 'bg-gray-400'}`}>
                {entry.username[0].toUpperCase()}
              </div>
              <div className="flex-1">
                <p className="font-bold text-gray-800">{entry.username}</p>
                <div className="flex items-center gap-1 text-xs text-gray-500">
                  <FiZap className="text-orange-400" />
                  <span>{entry.streak} day streak</span>
                </div>
              </div>
              <div className="text-right">
                <p className="font-extrabold text-orange-600">{entry.xp.toLocaleString()}</p>
                <p className="text-xs text-gray-400">XP</p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
