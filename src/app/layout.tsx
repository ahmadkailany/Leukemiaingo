import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
});

export const metadata: Metadata = {
  title: {
    default: 'Leukemiaingo — Learn. Spread Awareness. Fight Leukemia.',
    template: '%s | Leukemiaingo',
  },
  description:
    'A Duolingo-style gamified platform for leukemia awareness. Learn through bite-sized lessons, earn badges, and climb the leaderboard.',
  keywords: ['leukemia', 'awareness', 'education', 'cancer', 'health', 'gamification'],
  openGraph: {
    title: 'Leukemiaingo',
    description: 'Learn about leukemia in a fun, gamified way.',
    type: 'website',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={inter.variable}>
      <body className="min-h-screen bg-white font-sans antialiased">
        {children}
      </body>
    </html>
  );
}
