'use client';

import { FiCheck, FiX } from 'react-icons/fi';

interface Props {
  options: string[];
  selected: string;
  onSelect: (v: string) => void;
  submitted: boolean;
  correctAnswer: string;
}

export default function MultipleChoice({ options, selected, onSelect, submitted, correctAnswer }: Props) {
  return (
    <div className="space-y-3">
      {options.map((opt) => {
        const isSelected = selected === opt;
        const isCorrect = opt === correctAnswer;
        let style = 'border-gray-200 bg-white text-gray-700 hover:border-orange-300 hover:bg-orange-50';
        if (submitted) {
          if (isCorrect) style = 'border-green-400 bg-green-50 text-green-800';
          else if (isSelected && !isCorrect) style = 'border-red-400 bg-red-50 text-red-800';
          else style = 'border-gray-100 bg-gray-50 text-gray-400';
        } else if (isSelected) {
          style = 'border-orange-400 bg-orange-50 text-orange-700 font-bold';
        }
        return (
          <button
            key={opt}
            onClick={() => !submitted && onSelect(opt)}
            disabled={submitted}
            className={`w-full text-left px-5 py-4 rounded-2xl border-2 transition-all flex items-center justify-between ${style}`}
          >
            <span>{opt}</span>
            {submitted && isCorrect && <FiCheck className="text-green-600 text-lg" />}
            {submitted && isSelected && !isCorrect && <FiX className="text-red-600 text-lg" />}
          </button>
        );
      })}
    </div>
  );
}
