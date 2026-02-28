export type BadgeConditionType =
  | 'lessons_completed'
  | 'streak'
  | 'perfect_score'
  | 'category_complete'
  | 'total_xp';

export interface BadgeCondition {
  type: BadgeConditionType;
  value: number;
  category?: string;
}

export interface Badge {
  id: string;
  name: string;
  description: string;
  icon: string;
  condition: BadgeCondition;
  xpBonus: number;
  color: string;
}

export interface EarnedBadge extends Badge {
  earnedAt: string;
  earned: boolean;
}
