export interface Question {
  id: string;
  type: 'multiple-choice' | 'true-false' | 'fill-blank';
  questionText: string;
  options?: string[];
  correctAnswer: string;
  explanation: string;
}

export interface Lesson {
  id: string;
  title: string;
  category: 'basics' | 'symptoms' | 'risks' | 'treatment' | 'support';
  description: string;
  difficulty: 'easy' | 'medium' | 'hard';
  xpReward: number;
  order: number;
  icon: string;
  color: string;
  questions: Question[];
}

export type LessonLight = Omit<Lesson, 'questions'>;
