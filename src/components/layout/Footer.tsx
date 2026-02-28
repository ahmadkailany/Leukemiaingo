import Link from 'next/link';
import { GiDna1 } from 'react-icons/gi';
import { FiHeart, FiGithub } from 'react-icons/fi';

export default function Footer() {
  return (
    <footer className="bg-gray-50 border-t border-gray-100 mt-auto">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-10">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Brand */}
          <div>
            <div className="flex items-center gap-2 mb-3">
              <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-orange-400 to-orange-600 flex items-center justify-center">
                <GiDna1 className="w-4 h-4 text-white" />
              </div>
              <span className="font-extrabold text-lg">
                Leukemia<span className="text-orange-500">ingo</span>
              </span>
            </div>
            <p className="text-sm text-gray-500 leading-relaxed">
              Spreading leukemia awareness through education, one lesson at a time.
            </p>
          </div>

          {/* Links */}
          <div>
            <h4 className="font-bold text-gray-800 mb-3">Learn</h4>
            <ul className="space-y-2 text-sm text-gray-500">
              <li><Link href="/lessons" className="hover:text-orange-600 transition-colors">All Lessons</Link></li>
              <li><Link href="/leaderboard" className="hover:text-orange-600 transition-colors">Leaderboard</Link></li>
              <li><Link href="/profile" className="hover:text-orange-600 transition-colors">My Profile</Link></li>
              <li><Link href="/about" className="hover:text-orange-600 transition-colors">About Leukemia</Link></li>
            </ul>
          </div>

          {/* Info */}
          <div>
            <h4 className="font-bold text-gray-800 mb-3">Resources</h4>
            <ul className="space-y-2 text-sm text-gray-500">
              <li><a href="https://www.lls.org" target="_blank" rel="noopener noreferrer" className="hover:text-orange-600 transition-colors">Leukemia & Lymphoma Society</a></li>
              <li><a href="https://www.cancer.org" target="_blank" rel="noopener noreferrer" className="hover:text-orange-600 transition-colors">American Cancer Society</a></li>
              <li><a href="https://www.mayoclinic.org" target="_blank" rel="noopener noreferrer" className="hover:text-orange-600 transition-colors">Mayo Clinic</a></li>
            </ul>
          </div>
        </div>

        <div className="mt-8 pt-6 border-t border-gray-200 flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="text-sm text-gray-400">
            Made with <FiHeart className="inline w-3.5 h-3.5 text-red-400 mx-0.5" /> to spread awareness
          </p>
          <p className="text-sm text-gray-400">
            &copy; {new Date().getFullYear()} Leukemiaingo. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
