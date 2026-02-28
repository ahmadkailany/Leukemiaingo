'use client';

import { useState } from 'react';
import { Question } from '@/types/lesson';
import MultipleChoice from './MultipleChoice';
import TrueFalse from './TrueFalse';
import FillBlank from './FillBlank';
import { FiArrowRight, FiCheckCircle, FiXCircle } from 'react-icons/fi';

interface Props {
  question: Question;
  selectedAnswer?: string;
  onAnswer: (answer: string) => void;
  onNext: () => void;
}

export default function QuizQuestion({ question, selectedAnswer, onAnswer, onNext }: Props) {
  const [submitted, setSubmitted] = useState(false);
  const [localAnswer, setLocalAnswer] = useState(selectedAnswer || '');

  const isCorrect = localAnswer.trim().toLowerCase() === question.correctAnswer.toLowerCase();

  const handleSubmit = () => {
    if (!localAnswer) return;
    onAnswer(localAnswer);
    setSubmitted(true);
  };

  const handleNext = () => {
    setSubmitted(false);
    setLocalAnswer('');
    onNext();
  };

  return (
    <div className="bg-white rounded-3xl p-6 shadow-md border border-gray-100">
      {/* Question */}
      <p className="text-xl font-bold text-gray-800 mb-6 leading-snug">{question.questionText}</p>

      {/* Question type */}
      {question.type === 'multiple-choice' && (
        <MultipleChoice
          options={question.options || []}
          selected={localAnswer}
          onSelect={setLocalAnswer}
          submitted={submitted}
          correctAnswer={question.correctAnswer}
        />
      )}
      {question.type === 'true-false' && (
        <TrueFalse
          selected={localAnswer}
          onSelect={setLocalAnswer}
          submitted={submitted}
          correctAnswer={question.correctAnswer}
        />
      )}
      {question.type === 'fill-blank' && (
        <FillBlank
          value={localAnswer}
          onChange={setLocalAnswer}
          submitted={submitted}
          correctAnswer={question.correctAnswer}
        />
      )}

      {/* Feedback */}
      {submitted && (
        <div className={`mt-5 p-4 rounded-2xl flex items-start gap-3 ${
          isCorrect ? 'bg-green-50 border border-green-200' : 'bg-red-50 border border-red-200'
        }`}>
          {isCorrect
            ? <FiCheckCircle className="text-green-500 text-xl flex-shrink-0 mt-0.5" />
            : <FiXCircle className="text-red-500 text-xl flex-shrink-0 mt-0.5" />}
          <div>
            <p className={`font-bold text-sm ${isCorrect ? 'text-green-700' : 'text-red-700'}`}>
              {isCorrect ? 'Correct! ⚡' : `Incorrect. Answer: ${question.correctAnswer}`}
            </p>
            <p className="text-sm text-gray-600 mt-1">{question.explanation}</p>
          </div>
        </div>
      )}

      {/* Action button */}
      <div className="mt-6">
        {!submitted ? (
          <button
            onClick={handleSubmit}
            disabled={!localAnswer}
            className="w-full bg-orange-500 hover:bg-orange-600 disabled:bg-gray-200 disabled:text-gray-400 text-white font-bold py-4 rounded-2xl transition-all text-lg"
          >
            Check Answer
          </button>
        ) : (
          <button
            onClick={handleNext}
            className={`w-full font-bold py-4 rounded-2xl transition-all text-lg flex items-center justify-center gap-2 ${
              isCorrect ? 'bg-green-500 hover:bg-green-600 text-white' : 'bg-orange-500 hover:bg-orange-600 text-white'
            }`}
          >
            Continue <FiArrowRight />
          </button>
        )}
      </div>
    </div>
  );
}
