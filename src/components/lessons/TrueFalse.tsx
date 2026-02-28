'use client';

import { FiCheck, FiX } from 'react-icons/fi';

interface Props {
  selected: string;
  onSelect: (v: string) => void;
  submitted: boolean;
  correctAnswer: string;
}

export default function TrueFalse({ selected, onSelect, submitted, correctAnswer }: Props) {
  const options = ['true', 'false'];
  return (
    <div className="grid grid-cols-2 gap-4">
      {options.map((opt) => {
        const isSelected = selected === opt;
        const isCorrect = opt === correctAnswer;
        let style = 'border-gray-200 bg-white text-gray-700 hover:border-orange-300';
        if (submitted) {
          if (isCorrect) style = 'border-green-400 bg-green-50 text-green-800';
          else if (isSelected && !isCorrect) style = 'border-red-400 bg-red-50 text-red-800';
          else style = 'border-gray-100 bg-gray-50 text-gray-400';
        } else if (isSelected) {
          style = 'border-orange-400 bg-orange-50 text-orange-700';
        }
        return (
          <button
            key={opt}
            onClick={() => !submitted && onSelect(opt)}
            disabled={submitted}
            className={`flex flex-col items-center justify-center gap-2 py-8 rounded-2xl border-2 transition-all font-extrabold text-lg capitalize ${style}`}
          >
            <span className="text-3xl">{opt === 'true' ? '✅' : '❌'}</span>
            {opt}
            {submitted && isCorrect && <FiCheck className="text-green-600" />}
            {submitted && isSelected && !isCorrect && <FiX className="text-red-600" />}
          </button>
        );
      })}
    </div>
  );
}
