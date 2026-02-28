'use client';

interface Props {
  value: string;
  onChange: (v: string) => void;
  submitted: boolean;
  correctAnswer: string;
}

export default function FillBlank({ value, onChange, submitted, correctAnswer }: Props) {
  const isCorrect = value.trim().toLowerCase() === correctAnswer.toLowerCase();
  return (
    <div>
      <input
        type="text"
        value={value}
        onChange={(e) => !submitted && onChange(e.target.value)}
        disabled={submitted}
        placeholder="Type your answer..."
        className={`w-full px-5 py-4 text-lg rounded-2xl border-2 outline-none transition-all ${
          submitted
            ? isCorrect
              ? 'border-green-400 bg-green-50 text-green-800'
              : 'border-red-400 bg-red-50 text-red-800'
            : 'border-gray-200 focus:border-orange-400 focus:bg-orange-50'
        }`}
      />
      {submitted && !isCorrect && (
        <p className="text-sm text-gray-500 mt-2">Correct answer: <span className="font-bold text-green-700">{correctAnswer}</span></p>
      )}
    </div>
  );
}
