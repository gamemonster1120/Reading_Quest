
export interface User {
  name: string;
  level: number;
  xp: number;
  xpToNextLevel: number;
  points: number;
  rank: string;
  rankPosition: number;
  profileImage: string;
  title: string;
  items: string[]; // List of item IDs
  appBackground: string;
}

export interface Plan {
  bookTitle: string;
  author: string;
  goalType: 'pages' | 'time';
  goal: number;
  currentProgress: number;
  useAiQuiz: boolean;
  useShortFormLock: boolean;
  estimatedReward: {
    points: number;
    xp: number;
  };
}

export interface RankItem {
  rank: number;
  name: string;
  points: number;
  profileImage: string;
}

export enum ShopCategory {
  COSMETICS = '치장 아이템',
  BENEFITS = '혜택',
  TITLES = '칭호',
}

export interface ShopItem {
  id: string;
  name: string;
  description: string;
  price: number;
  category: ShopCategory;
  image: string;
  effect?: {
    type: 'BACKGROUND_CHANGE';
    value: string;
  };
}

export interface QuizQuestion {
  question: string;
  options: string[];
  correctAnswer: string;
}

export interface Friend extends RankItem {}
