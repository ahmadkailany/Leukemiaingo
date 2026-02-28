'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { FiZap, FiAward, FiUser, FiMenu, FiX } from 'react-icons/fi';
import { MdFlame } from 'react-icons/md';
import { GiDna1 } from 'react-icons/gi';
import { useState } from 'react';
import { cn } from '@/lib/utils';
import { useAppStore } from '@/lib/store';
import { formatNumber } from '@/lib/utils';

const navLinks = [
  { href: '/lessons', label: 'Lessons' },
  { href: '/leaderboard', label: 'Leaderboard' },
  { href: '/about', label: 'About' },
];

export default function Header() {
  const pathname = usePathname();
  const [mobileOpen, setMobileOpen] = useState(false);
  const currentUser = useAppStore((s) => s.currentUser);

  return (
    <header className="sticky top-0 z-40 bg-white/90 backdrop-blur-md border-b border-gray-100 shadow-sm">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2 group">
            <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-orange-400 to-orange-600 flex items-center justify-center shadow-md group-hover:scale-105 transition-transform">
              <GiDna1 className="w-5 h-5 text-white" />
            </div>
            <span className="font-extrabold text-xl text-gray-900">
              Leukemia<span className="text-orange-500">ingo</span>
            </span>
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center gap-1">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={cn(
                  'px-4 py-2 rounded-xl text-sm font-semibold transition-all',
                  pathname.startsWith(link.href)
                    ? 'bg-orange-100 text-orange-600'
                    : 'text-gray-600 hover:bg-gray-100 hover:text-gray-900'
                )}
              >
                {link.label}
              </Link>
            ))}
          </nav>

          {/* User Stats + Profile */}
          <div className="flex items-center gap-3">
            {currentUser && (
              <div className="hidden sm:flex items-center gap-3">
                {/* Streak */}
                <div className="flex items-center gap-1.5 bg-red-50 px-3 py-1.5 rounded-full">
                  <MdFlame className="w-4 h-4 text-red-500" />
                  <span className="text-sm font-bold text-red-600">{currentUser.stats.currentStreak}</span>
                </div>
                {/* XP */}
                <div className="flex items-center gap-1.5 bg-amber-50 px-3 py-1.5 rounded-full">
                  <FiZap className="w-4 h-4 text-amber-500" />
                  <span className="text-sm font-bold text-amber-600">{formatNumber(currentUser.stats.totalXP)}</span>
                </div>
              </div>
            )}

            {/* Profile */}
            <Link
              href="/profile"
              className="w-9 h-9 rounded-xl bg-gradient-to-br from-orange-400 to-orange-600 flex items-center justify-center hover:shadow-md transition-shadow"
            >
              <FiUser className="w-4 h-4 text-white" />
            </Link>

            {/* Mobile menu toggle */}
            <button
              className="md:hidden p-2 rounded-xl hover:bg-gray-100"
              onClick={() => setMobileOpen(!mobileOpen)}
            >
              {mobileOpen ? <FiX className="w-5 h-5" /> : <FiMenu className="w-5 h-5" />}
            </button>
          </div>
        </div>

        {/* Mobile Nav */}
        {mobileOpen && (
          <div className="md:hidden py-4 border-t border-gray-100 animate-slide-up">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setMobileOpen(false)}
                className={cn(
                  'block px-4 py-3 rounded-xl text-sm font-semibold mb-1 transition-colors',
                  pathname.startsWith(link.href)
                    ? 'bg-orange-100 text-orange-600'
                    : 'text-gray-700 hover:bg-gray-100'
                )}
              >
                {link.label}
              </Link>
            ))}
            {currentUser && (
              <div className="flex items-center gap-3 px-4 py-3 mt-2 border-t border-gray-100">
                <div className="flex items-center gap-1.5">
                  <MdFlame className="w-4 h-4 text-red-500" />
                  <span className="text-sm font-bold text-red-600">{currentUser.stats.currentStreak} day streak</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <FiZap className="w-4 h-4 text-amber-500" />
                  <span className="text-sm font-bold text-amber-600">{formatNumber(currentUser.stats.totalXP)} XP</span>
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </header>
  );
}
