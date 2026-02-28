'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { Lesson } from '@/types/lesson';
import { useStore } from '@/lib/store';
import QuizQuestion from '@/components/lessons/QuizQuestion';
import PointsAnimation from '@/components/gamification/PointsAnimation';
import { FiArrowLeft, FiCheckCircle, FiXCircle, FiAward } from 'react-icons/fi';
import Link from 'next/link';

type Phase = 'loading' | 'intro' | 'quiz' | 'result';

export default function LessonQuizClient({ lessonId }: { lessonId: string }) {
  const router = useRouter();
  const [lesson, setLesson] = useState<Lesson | null>(null);
  const [phase, setPhase] = useState<Phase>('loading');
  const [currentQ, setCurrentQ] = useState(0);
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [score, setScore] = useState(0);
  const [showXP, setShowXP] = useState(false);
  const [xpEarned, setXpEarned] = useState(0);
  const [newBadges, setNewBadges] = useState<string[]>([]);
  const user = useStore((s) => s.user);
  const updateUserXP = useStore((s) => s.updateUserXP);

  useEffect(() => {
    fetch(`/api/lessons/${lessonId}`)
      .then((r) => r.json())
      .then((d) => { setLesson(d); setPhase('intro'); });
  }, [lessonId]);

  const handleAnswer = (questionId: string, answer: string) => {
    setAnswers((prev) => ({ ...prev, [questionId]: answer }));
  };

  const handleNext = () => {
    if (!lesson) return;
    if (currentQ < lesson.questions.length - 1) {
      setCurrentQ((p) => p + 1);
    } else {
      finishQuiz();
    }
  };

  const finishQuiz = async () => {
    if (!lesson) return;
    let correct = 0;
    for (const q of lesson.questions) {
      if ((answers[q.id] || '').trim().toLowerCase() === q.correctAnswer.toLowerCase()) correct++;
    }
    const pct = Math.round((correct / lesson.questions.length) * 100);
    setScore(pct);

    const earned = Math.round(lesson.xpReward * (pct / 100));
    setXpEarned(earned);

    if (user) {
      const res = await fetch('/api/progress', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ userId: user.id, lessonId: lesson.id, score: pct, xpEarned: earned }),
      });
      const data = await res.json();
      if (data.badgesEarned?.length) setNewBadges(data.badgesEarned);
      updateUserXP(data.newXP, data.newLevel, data.newStreak);
    }

    setPhase('result');
    setShowXP(true);
    setTimeout(() => setShowXP(false), 2000);
  };

  if (phase === 'loading' || !lesson) {
    return <div className="flex justify-center items-center min-h-96"><div className="animate-spin rounded-full h-12 w-12 border-4 border-orange-500 border-t-transparent" /></div>;
  }

  if (phase === 'intro') {
    return (
      <div className="max-w-xl mx-auto px-4 py-16 text-center">
        <div className="bg-gradient-to-br from-orange-500 to-orange-600 text-white rounded-3xl p-10 shadow-xl">
          <div className="text-5xl mb-4">🦠</div>
          <h1 className="text-3xl font-extrabold mb-2">{lesson.title}</h1>
          <p className="text-orange-100 mb-6">{lesson.description}</p>
          <div className="flex justify-center gap-6 mb-8 text-sm">
            <span className="bg-white bg-opacity-20 rounded-full px-3 py-1">{lesson.questions.length} Questions</span>
            <span className="bg-white bg-opacity-20 rounded-full px-3 py-1">{lesson.xpReward} XP</span>
            <span className="bg-white bg-opacity-20 rounded-full px-3 py-1 capitalize">{lesson.difficulty}</span>
          </div>
          <button
            onClick={() => setPhase('quiz')}
            className="bg-white text-orange-600 font-extrabold px-10 py-4 rounded-full shadow hover:scale-105 transition-all text-lg"
          >
            Start Lesson →
          </button>
        </div>
        <Link href="/lessons" className="mt-6 inline-flex items-center gap-2 text-gray-500 hover:text-orange-500">
          <FiArrowLeft /> Back to Lessons
        </Link>
      </div>
    );
  }

  if (phase === 'quiz') {
    const q = lesson.questions[currentQ];
    const progress = ((currentQ) / lesson.questions.length) * 100;
    return (
      <div className="max-w-xl mx-auto px-4 py-8">
        {/* Progress bar */}
        <div className="flex items-center gap-3 mb-6">
          <Link href="/lessons" className="text-gray-400 hover:text-orange-500"><FiArrowLeft className="text-xl" /></Link>
          <div className="flex-1 h-3 bg-gray-200 rounded-full overflow-hidden">
            <div className="h-full bg-gradient-to-r from-orange-400 to-orange-500 rounded-full transition-all duration-500" style={{ width: `${progress}%` }} />
          </div>
          <span className="text-sm text-gray-500 font-medium">{currentQ + 1}/{lesson.questions.length}</span>
        </div>

        <QuizQuestion
          question={q}
          selectedAnswer={answers[q.id]}
          onAnswer={(a) => handleAnswer(q.id, a)}
          onNext={handleNext}
        />
      </div>
    );
  }

  if (phase === 'result') {
    const isPerfect = score === 100;
    return (
      <div className="max-w-xl mx-auto px-4 py-16 text-center">
        <PointsAnimation points={xpEarned} show={showXP} />
        <div className={`rounded-3xl p-10 shadow-xl text-white ${ isPerfect ? 'bg-gradient-to-br from-green-500 to-green-600' : score >= 60 ? 'bg-gradient-to-br from-orange-500 to-orange-600' : 'bg-gradient-to-br from-red-500 to-red-600'}`}>
          <div className="text-6xl mb-4">{isPerfect ? '🌟' : score >= 60 ? '👍' : '💪'}</div>
          <h2 className="text-3xl font-extrabold mb-1">{isPerfect ? 'Perfect!' : score >= 60 ? 'Great Job!' : 'Keep Going!'}</h2>
          <p className="opacity-80 mb-6">{lesson.title}</p>

          <div className="flex justify-center gap-6 mb-6">
            <div className="text-center">
              <div className="text-4xl font-extrabold">{score}%</div>
              <div className="text-xs opacity-70">Score</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-extrabold">+{xpEarned}</div>
              <div className="text-xs opacity-70">XP Earned</div>
            </div>
          </div>

          {newBadges.length > 0 && (
            <div className="bg-white bg-opacity-20 rounded-2xl p-4 mb-4">
              <FiAward className="text-2xl mx-auto mb-1" />
              <p className="font-bold">New Badge{newBadges.length > 1 ? 's' : ''} Unlocked!</p>
              {newBadges.map((b) => <p key={b} className="text-sm opacity-80">{b}</p>)}
            </div>
          )}

          <div className="flex gap-3 justify-center">
            <button
              onClick={() => { setCurrentQ(0); setAnswers({}); setPhase('intro'); }}
              className="bg-white bg-opacity-20 border-2 border-white text-white font-bold px-6 py-3 rounded-full hover:bg-opacity-30 transition-all"
            >
              Try Again
            </button>
            <Link
              href="/lessons"
              className="bg-white text-orange-600 font-bold px-6 py-3 rounded-full hover:scale-105 transition-all"
            >
              Next Lesson
            </Link>
          </div>
        </div>

        {/* Answer review */}
        <div className="mt-8 text-left space-y-4">
          <h3 className="font-extrabold text-gray-700 text-lg">Review Answers</h3>
          {lesson.questions.map((q) => {
            const correct = (answers[q.id] || '').trim().toLowerCase() === q.correctAnswer.toLowerCase();
            return (
              <div key={q.id} className={`rounded-xl p-4 border-2 ${correct ? 'border-green-200 bg-green-50' : 'border-red-200 bg-red-50'}`}>
                <div className="flex items-start gap-2">
                  {correct ? <FiCheckCircle className="text-green-500 mt-0.5 flex-shrink-0" /> : <FiXCircle className="text-red-500 mt-0.5 flex-shrink-0" />}
                  <div>
                    <p className="font-semibold text-gray-800 text-sm">{q.questionText}</p>
                    {!correct && <p className="text-xs text-red-600 mt-1">Your answer: {answers[q.id] || 'Not answered'}</p>}
                    <p className={`text-xs mt-1 ${correct ? 'text-green-600' : 'text-gray-600'}`}>✅ {q.correctAnswer}</p>
                    <p className="text-xs text-gray-500 mt-1 italic">{q.explanation}</p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    );
  }

  return null;
}
