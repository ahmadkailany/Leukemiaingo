'use client';

import { cn } from '@/lib/utils';
import { FiCheckCircle, FiXCircle } from 'react-icons/fi';

interface TrueFalseProps {
  correctAnswer: string;
  answered: boolean;
  selectedAnswer: string | null;
  onSelect: (answer: string) => void;
}

export default function TrueFalse({
  correctAnswer,
  answered,
  selectedAnswer,
  onSelect,
}: TrueFalseProps) {
  const options = ['True', 'False'];

  return (
    <div className="grid grid-cols-2 gap-4">
      {options.map((option) => {
        const isSelected = selectedAnswer === option;
        const isCorrect = option.toLowerCase() === correctAnswer.toLowerCase();

        return (
          <button
            key={option}
            onClick={() => onSelect(option)}
            disabled={answered}
            className={cn(
              'flex flex-col items-center justify-center gap-3 p-6 rounded-2xl border-2 font-bold text-lg transition-all duration-200',
              !answered && 'hover:scale-105 cursor-pointer',
              option === 'True'
                ? !answered
                  ? 'border-green-200 bg-green-50 text-green-700 hover:bg-green-100 hover:border-green-400'
                  : isCorrect
                  ? 'bg-green-100 border-green-500 text-green-800'
                  : isSelected
                  ? 'bg-red-100 border-red-400 text-red-700'
                  : 'opacity-40 border-gray-200 bg-gray-50'
                : !answered
                ? 'border-red-200 bg-red-50 text-red-700 hover:bg-red-100 hover:border-red-400'
                : isCorrect
                ? 'bg-green-100 border-green-500 text-green-800'
                : isSelected
                ? 'bg-red-100 border-red-400 text-red-700'
                : 'opacity-40 border-gray-200 bg-gray-50'
            )}
          >
            {answered && isCorrect ? (
              <FiCheckCircle className="w-8 h-8 text-green-600" />
            ) : answered && isSelected && !isCorrect ? (
              <FiXCircle className="w-8 h-8 text-red-500" />
            ) : (
              <span className="text-3xl">{option === 'True' ? '✅' : '❌'}</span>
            )}
            {option}
          </button>
        );
      })}
    </div>
  );
}
