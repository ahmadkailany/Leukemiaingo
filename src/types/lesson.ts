export type QuestionType = 'multiple-choice' | 'true-false' | 'fill-blank';

export type LessonCategory =
  | 'basics'
  | 'symptoms'
  | 'risks'
  | 'treatment'
  | 'support';

export type Difficulty = 'easy' | 'medium' | 'hard';

export interface Question {
  id: string;
  type: QuestionType;
  questionText: string;
  options?: string[];
  correctAnswer: string;
  explanation: string;
}

export interface Lesson {
  id: string;
  title: string;
  category: LessonCategory;
  description: string;
  difficulty: Difficulty;
  xpReward: number;
  order: number;
  questions: Question[];
  icon: string;
}

export interface LessonProgress {
  lessonId: string;
  score: number;
  completedAt: string;
  xpEarned: number;
}
