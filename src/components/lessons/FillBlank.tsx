'use client';

import { useState } from 'react';
import { FiSend } from 'react-icons/fi';

interface FillBlankProps {
  correctAnswer: string;
  answered: boolean;
  onSubmit: (answer: string) => void;
}

export default function FillBlank({ correctAnswer, answered, onSubmit }: FillBlankProps) {
  const [value, setValue] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!value.trim() || answered) return;
    onSubmit(value.trim());
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="relative">
        <input
          type="text"
          value={value}
          onChange={(e) => setValue(e.target.value)}
          disabled={answered}
          placeholder="Type your answer..."
          className="w-full px-5 py-4 rounded-2xl border-2 border-gray-200 text-gray-900 font-semibold text-lg focus:outline-none focus:border-orange-400 focus:ring-2 focus:ring-orange-100 transition-all disabled:bg-gray-50 disabled:text-gray-500"
          autoFocus
        />
      </div>
      {!answered && (
        <button
          type="submit"
          disabled={!value.trim()}
          className="flex items-center gap-2 bg-orange-500 hover:bg-orange-600 text-white font-bold px-6 py-3 rounded-xl disabled:opacity-40 transition-all active:scale-95"
        >
          <FiSend className="w-4 h-4" />
          Submit Answer
        </button>
      )}
    </form>
  );
}
