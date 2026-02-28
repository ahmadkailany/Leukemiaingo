import Link from 'next/link';
import { FiDroplet, FiHeart } from 'react-icons/fi';

export default function Footer() {
  return (
    <footer className="bg-gray-50 border-t border-gray-200 mt-auto">
      <div className="max-w-6xl mx-auto px-4 py-8">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2 text-orange-500 font-bold text-lg">
            <FiDroplet />
            <span>Leukemiaingo</span>
          </div>
          <p className="text-sm text-gray-500 flex items-center gap-1">
            Made with <FiHeart className="text-red-400" /> to spread leukemia awareness
          </p>
          <nav className="flex gap-4 text-sm text-gray-500">
            <Link href="/about" className="hover:text-orange-500 transition-colors">About</Link>
            <Link href="/lessons" className="hover:text-orange-500 transition-colors">Lessons</Link>
            <Link href="/leaderboard" className="hover:text-orange-500 transition-colors">Leaderboard</Link>
          </nav>
        </div>
        <p className="text-center text-xs text-gray-400 mt-4">
          Information sourced from Mayo Clinic, American Cancer Society & Cleveland Clinic. Always consult a doctor.
        </p>
      </div>
    </footer>
  );
}
