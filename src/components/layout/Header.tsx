'use client';

import Link from 'next/link';
import { useState } from 'react';
import { FiMenu, FiX, FiDroplet } from 'react-icons/fi';
import { MdLeaderboard } from 'react-icons/md';
import { useStore } from '@/lib/store';
import StreakDisplay from '@/components/gamification/StreakDisplay';
import XPBar from '@/components/gamification/XPBar';

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  const user = useStore((s) => s.user);

  const navLinks = [
    { href: '/lessons', label: 'Lessons' },
    { href: '/leaderboard', label: 'Leaderboard', icon: <MdLeaderboard /> },
    { href: '/profile', label: 'Profile' },
  ];

  return (
    <header className="sticky top-0 z-50 bg-white border-b border-gray-200 shadow-sm">
      <div className="max-w-6xl mx-auto px-4 h-16 flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2 font-extrabold text-xl text-orange-500">
          <FiDroplet className="text-2xl" />
          <span>Leukemiaingo</span>
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center gap-6">
          {navLinks.map((l) => (
            <Link key={l.href} href={l.href} className="flex items-center gap-1 text-gray-600 hover:text-orange-500 font-medium transition-colors">
              {l.icon}
              {l.label}
            </Link>
          ))}
        </nav>

        {/* User streak / XP pill */}
        {user && (
          <div className="hidden md:flex items-center gap-3">
            <StreakDisplay streak={user.stats.currentStreak} compact />
            <XPBar xp={user.stats.totalXP} level={user.stats.level} compact />
          </div>
        )}

        {/* Mobile toggle */}
        <button className="md:hidden text-gray-600 text-2xl" onClick={() => setMenuOpen(!menuOpen)}>
          {menuOpen ? <FiX /> : <FiMenu />}
        </button>
      </div>

      {/* Mobile Menu */}
      {menuOpen && (
        <div className="md:hidden bg-white border-t border-gray-100 px-4 pb-4">
          {navLinks.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              onClick={() => setMenuOpen(false)}
              className="flex items-center gap-2 py-3 text-gray-700 hover:text-orange-500 font-medium border-b border-gray-100 last:border-0"
            >
              {l.icon}
              {l.label}
            </Link>
          ))}
          {user && (
            <div className="flex items-center gap-3 mt-3">
              <StreakDisplay streak={user.stats.currentStreak} compact />
              <XPBar xp={user.stats.totalXP} level={user.stats.level} compact />
            </div>
          )}
        </div>
      )}
    </header>
  );
}
