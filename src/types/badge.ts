export interface BadgeCondition {
  type: 'lessons_completed' | 'streak' | 'all_lessons' | 'category_completed' | 'perfect_lesson';
  value: number | string | boolean;
}

export interface Badge {
  id: string;
  name: string;
  description: string;
  icon: string;
  color: string;
  condition: BadgeCondition;
  xpBonus: number;
}
