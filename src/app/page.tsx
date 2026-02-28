import Link from 'next/link';
import { FiDroplet, FiZap, FiAward, FiUsers, FiArrowRight, FiBook, FiShield, FiHeart } from 'react-icons/fi';
import { MdLeaderboard } from 'react-icons/md';

const CATEGORY_CARDS = [
  { icon: <FiBook className="text-2xl" />, label: 'Basics', color: 'from-orange-400 to-orange-500', href: '/lessons?category=basics', desc: 'What is leukemia and how does it work?' },
  { icon: <FiZap className="text-2xl" />, label: 'Symptoms', color: 'from-red-400 to-red-500', href: '/lessons?category=symptoms', desc: 'Recognize warning signs early' },
  { icon: <FiShield className="text-2xl" />, label: 'Risk Factors', color: 'from-yellow-400 to-yellow-500', href: '/lessons?category=risks', desc: 'Know what increases your risk' },
  { icon: <FiHeart className="text-2xl" />, label: 'Treatment', color: 'from-green-400 to-green-500', href: '/lessons?category=treatment', desc: 'Explore modern treatment options' },
];

const STATS = [
  { icon: <FiBook className="text-3xl text-orange-500" />, value: '17', label: 'Lessons' },
  { icon: <FiUsers className="text-3xl text-orange-500" />, value: '500+', label: 'Learners' },
  { icon: <MdLeaderboard className="text-3xl text-orange-500" />, value: 'Top 10', label: 'Leaderboard' },
  { icon: <FiAward className="text-3xl text-orange-500" />, value: '9', label: 'Badges' },
];

export default function HomePage() {
  return (
    <main className="min-h-screen">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-orange-500 via-orange-400 to-amber-400 text-white py-20 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <div className="flex justify-center mb-4">
            <FiDroplet className="text-6xl opacity-90" />
          </div>
          <h1 className="text-4xl md:text-6xl font-extrabold mb-4 tracking-tight">
            Learn. Fight. <span className="text-orange-100">Spread Awareness.</span>
          </h1>
          <p className="text-lg md:text-xl text-orange-100 mb-8 max-w-2xl mx-auto">
            Master leukemia knowledge through bite-sized lessons, earn badges, and climb the leaderboard — Duolingo style.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/lessons"
              className="inline-flex items-center gap-2 bg-white text-orange-600 font-bold px-8 py-4 rounded-full shadow-lg hover:shadow-xl hover:scale-105 transition-all"
            >
              Start Learning <FiArrowRight />
            </Link>
            <Link
              href="/leaderboard"
              className="inline-flex items-center gap-2 bg-orange-600 bg-opacity-40 border-2 border-white text-white font-bold px-8 py-4 rounded-full hover:bg-opacity-60 transition-all"
            >
              <MdLeaderboard /> Leaderboard
            </Link>
          </div>
        </div>
      </section>

      {/* Stats Bar */}
      <section className="bg-white border-b border-gray-100 py-6 px-4">
        <div className="max-w-4xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-4">
          {STATS.map((s) => (
            <div key={s.label} className="flex flex-col items-center gap-1">
              {s.icon}
              <span className="text-2xl font-extrabold text-gray-800">{s.value}</span>
              <span className="text-xs text-gray-500 uppercase tracking-wide">{s.label}</span>
            </div>
          ))}
        </div>
      </section>

      {/* Category Cards */}
      <section className="py-16 px-4 bg-gray-50">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-2xl md:text-3xl font-extrabold text-gray-800 text-center mb-2">What will you learn today?</h2>
          <p className="text-center text-gray-500 mb-10">Pick a category and start your journey</p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            {CATEGORY_CARDS.map((c) => (
              <Link
                key={c.label}
                href={c.href}
                className={`bg-gradient-to-r ${c.color} text-white p-6 rounded-2xl shadow-md hover:shadow-xl hover:scale-[1.02] transition-all flex items-center gap-4`}
              >
                <div className="bg-white bg-opacity-20 rounded-xl p-3">{c.icon}</div>
                <div>
                  <h3 className="font-extrabold text-lg">{c.label}</h3>
                  <p className="text-sm opacity-80">{c.desc}</p>
                </div>
                <FiArrowRight className="ml-auto text-xl opacity-70" />
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* How it works */}
      <section className="py-16 px-4 bg-white">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-2xl md:text-3xl font-extrabold text-gray-800 mb-10">How Leukemiaingo Works</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { step: '1', icon: <FiBook className="text-3xl text-orange-500" />, title: 'Complete Lessons', desc: 'Short 5-minute lessons with interactive quizzes on leukemia topics' },
              { step: '2', icon: <FiZap className="text-3xl text-orange-500" />, title: 'Earn XP & Badges', desc: 'Gain experience points, maintain streaks, and unlock achievement badges' },
              { step: '3', icon: <MdLeaderboard className="text-3xl text-orange-500" />, title: 'Climb the Board', desc: 'Compete with others on weekly and all-time leaderboards' },
            ].map((item) => (
              <div key={item.step} className="flex flex-col items-center gap-3 p-6 rounded-2xl bg-gray-50 border border-gray-100">
                <div className="w-10 h-10 rounded-full bg-orange-500 text-white flex items-center justify-center font-extrabold text-lg">{item.step}</div>
                {item.icon}
                <h3 className="font-extrabold text-gray-800">{item.title}</h3>
                <p className="text-sm text-gray-500 text-center">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-gradient-to-r from-orange-500 to-orange-600 text-white py-16 px-4 text-center">
        <h2 className="text-3xl font-extrabold mb-3">Ready to make a difference?</h2>
        <p className="text-orange-100 mb-6">Join hundreds of learners spreading leukemia awareness</p>
        <Link
          href="/lessons"
          className="inline-flex items-center gap-2 bg-white text-orange-600 font-bold px-8 py-4 rounded-full shadow-lg hover:scale-105 transition-all"
        >
          Start for Free <FiArrowRight />
        </Link>
      </section>
    </main>
  );
}
