'use client';

import { cn } from '@/lib/utils';
import { FiCheckCircle, FiXCircle } from 'react-icons/fi';

interface MultipleChoiceProps {
  options: string[];
  correctAnswer: string;
  answered: boolean;
  selectedAnswer: string | null;
  onSelect: (answer: string) => void;
}

export default function MultipleChoice({
  options,
  correctAnswer,
  answered,
  selectedAnswer,
  onSelect,
}: MultipleChoiceProps) {
  return (
    <div className="space-y-3">
      {options.map((option) => {
        const isSelected = selectedAnswer === option;
        const isCorrect = option.toLowerCase() === correctAnswer.toLowerCase();

        return (
          <button
            key={option}
            onClick={() => onSelect(option)}
            disabled={answered}
            className={cn(
              'w-full flex items-center justify-between gap-3 p-4 rounded-2xl border-2 text-left font-semibold transition-all duration-200',
              !answered && 'hover:border-orange-300 hover:bg-orange-50 cursor-pointer active:scale-99',
              answered && isCorrect && 'bg-green-50 border-green-500 text-green-800',
              answered && isSelected && !isCorrect && 'bg-red-50 border-red-400 text-red-700',
              answered && !isSelected && !isCorrect && 'opacity-50 border-gray-200 bg-gray-50',
              !answered && 'border-gray-200 bg-white hover:shadow-sm'
            )}
          >
            <span>{option}</span>
            {answered && isCorrect && <FiCheckCircle className="w-5 h-5 text-green-600 flex-shrink-0" />}
            {answered && isSelected && !isCorrect && <FiXCircle className="w-5 h-5 text-red-500 flex-shrink-0" />}
          </button>
        );
      })}
    </div>
  );
}
