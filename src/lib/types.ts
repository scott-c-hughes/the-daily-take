// Question types
export type QuestionType = "open" | "ranked";
export type Category = "finance" | "sports" | "general";

export interface OpenQuestion {
  id: string;
  type: "open";
  category: Category;
  question: string;
  // Valid answers with their "rarity" scores (lower = more common = fewer points)
  answers: Record<string, number>;
}

export interface RankedQuestion {
  id: string;
  type: "ranked";
  category: Category;
  question: string;
  // Ordered list from #1 to #N
  rankedList: string[];
}

export type Question = OpenQuestion | RankedQuestion;

export interface GameState {
  currentQuestionIndex: number;
  answers: string[];
  scores: number[];
  isComplete: boolean;
}

export interface DailyGame {
  date: string;
  questions: Question[];
}
