'use client';

import { useState } from 'react';
import MultipleChoice from './MultipleChoice';
import TrueFalse from './TrueFalse';
import FillBlank from './FillBlank';
import type { Question } from '@/types/lesson';

interface QuizQuestionProps {
  question: Question;
  questionNumber: number;
  totalQuestions: number;
  onAnswer: (correct: boolean) => void;
}

export default function QuizQuestion({
  question,
  questionNumber,
  totalQuestions,
  onAnswer,
}: QuizQuestionProps) {
  const [answered, setAnswered] = useState(false);
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);

  const handleAnswer = (answer: string) => {
    if (answered) return;
    setSelectedAnswer(answer);
    setAnswered(true);
    const isCorrect = answer.toLowerCase() === question.correctAnswer.toLowerCase();
    onAnswer(isCorrect);
  };

  return (
    <div className="animate-slide-up">
      {/* Progress indicator */}
      <div className="flex items-center gap-2 mb-6">
        {Array.from({ length: totalQuestions }).map((_, i) => (
          <div
            key={i}
            className={`h-2 flex-1 rounded-full transition-all duration-300 ${
              i < questionNumber - 1
                ? 'bg-orange-500'
                : i === questionNumber - 1
                ? 'bg-orange-300'
                : 'bg-gray-200'
            }`}
          />
        ))}
      </div>

      {/* Question text */}
      <p className="text-sm font-semibold text-orange-600 uppercase tracking-wide mb-2">
        Question {questionNumber} of {totalQuestions}
      </p>
      <h2 className="text-xl sm:text-2xl font-bold text-gray-900 mb-6 leading-snug">
        {question.questionText}
      </h2>

      {/* Question type */}
      {question.type === 'multiple-choice' && (
        <MultipleChoice
          options={question.options || []}
          correctAnswer={question.correctAnswer}
          answered={answered}
          selectedAnswer={selectedAnswer}
          onSelect={handleAnswer}
        />
      )}
      {question.type === 'true-false' && (
        <TrueFalse
          correctAnswer={question.correctAnswer}
          answered={answered}
          selectedAnswer={selectedAnswer}
          onSelect={handleAnswer}
        />
      )}
      {question.type === 'fill-blank' && (
        <FillBlank
          correctAnswer={question.correctAnswer}
          answered={answered}
          onSubmit={handleAnswer}
        />
      )}

      {/* Explanation */}
      {answered && (
        <div
          className={`mt-6 p-4 rounded-2xl border-l-4 animate-slide-up ${
            selectedAnswer?.toLowerCase() === question.correctAnswer.toLowerCase()
              ? 'bg-green-50 border-green-500'
              : 'bg-red-50 border-red-500'
          }`}
        >
          <p className="font-bold mb-1">
            {selectedAnswer?.toLowerCase() === question.correctAnswer.toLowerCase()
              ? '✅ Correct!'
              : `❌ The answer is: ${question.correctAnswer}`}
          </p>
          <p className="text-sm text-gray-600">{question.explanation}</p>
        </div>
      )}
    </div>
  );
}
