import { Question, DailyGame } from "./types";
import {
  financeRankedQuestions,
  sportsRankedQuestions,
  generalRankedQuestions,
  financeOpenQuestions,
  sportsOpenQuestions,
  generalOpenQuestions,
} from "./questionBank";
import { getDailyQuestions } from "./dailyQuestions";

// Simple hash function to convert date string to a number
function hashDate(dateString: string): number {
  let hash = 0;
  for (let i = 0; i < dateString.length; i++) {
    const char = dateString.charCodeAt(i);
    hash = (hash << 5) - hash + char;
    hash = hash & hash; // Convert to 32-bit integer
  }
  return Math.abs(hash);
}

// Seeded random number generator for consistent daily selection
function seededRandom(seed: number): () => number {
  return function () {
    seed = (seed * 1103515245 + 12345) & 0x7fffffff;
    return seed / 0x7fffffff;
  };
}

// Shuffle array with seeded random
function shuffleWithSeed<T>(array: T[], random: () => number): T[] {
  const shuffled = [...array];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
}

// Get today's game - selects 5 questions based on the date
// Everyone playing on the same day gets the same questions
export function getTodaysGame(): DailyGame {
  const today = new Date();
  const dateString = today.toISOString().split("T")[0]; // YYYY-MM-DD

  // Check for curated daily questions first
  const curatedQuestions = getDailyQuestions(dateString);
  if (curatedQuestions && curatedQuestions.length >= 5) {
    return {
      date: dateString,
      questions: curatedQuestions.slice(0, 5),
    };
  }

  // Fall back to random selection from question bank
  const seed = hashDate(dateString);
  const random = seededRandom(seed);

  // Shuffle each category
  const shuffledFinanceRanked = shuffleWithSeed(financeRankedQuestions, random);
  const shuffledSportsRanked = shuffleWithSeed(sportsRankedQuestions, random);
  const shuffledGeneralRanked = shuffleWithSeed(generalRankedQuestions, random);
  const shuffledFinanceOpen = shuffleWithSeed(financeOpenQuestions, random);
  const shuffledSportsOpen = shuffleWithSeed(sportsOpenQuestions, random);
  const shuffledGeneralOpen = shuffleWithSeed(generalOpenQuestions, random);

  // Select 5 questions with a good mix:
  // - 2 open-ended questions (one finance, one sports or general)
  // - 2 ranked questions (mix of categories)
  // - 1 wildcard (any type, any category)
  const questions: Question[] = [
    shuffledFinanceOpen[0], // Q1: Finance open
    shuffledSportsOpen[0],  // Q2: Sports open
    shuffledGeneralRanked[0], // Q3: General ranked
    shuffledFinanceRanked[0], // Q4: Finance ranked
    shuffledGeneralOpen[0], // Q5: General open
  ];

  return {
    date: dateString,
    questions,
  };
}

// Calculate score for an open question
export function scoreOpenAnswer(question: Question, answer: string): number {
  if (question.type !== "open") return 0;

  // Normalize the answer for matching
  const normalizedAnswer = answer.trim();

  // Check for exact match (case-insensitive)
  for (const [validAnswer, score] of Object.entries(question.answers)) {
    if (validAnswer.toLowerCase() === normalizedAnswer.toLowerCase()) {
      return score;
    }
  }

  return 0; // No match
}

// Calculate score for a ranked question
export function scoreRankedAnswer(question: Question, userOrder: string[]): number {
  if (question.type !== "ranked") return 0;

  const correctOrder = question.rankedList;
  let correctPositions = 0;

  // Count how many items are in the correct position
  for (let i = 0; i < userOrder.length; i++) {
    if (userOrder[i] === correctOrder[i]) {
      correctPositions++;
    }
  }

  // Score based on accuracy: 100 points for all correct, proportional for partial
  return Math.round((correctPositions / correctOrder.length) * 100);
}

// Get all valid answers for autocomplete (open questions)
export function getValidAnswers(question: Question): string[] {
  if (question.type !== "open") return [];
  return Object.keys(question.answers);
}
