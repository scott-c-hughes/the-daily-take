/**
 * DAILY QUESTIONS
 *
 * Add curated questions here for specific dates.
 * These take priority over the random question bank.
 *
 * Workflow:
 * 1. Use Claude to generate questions from today's news/data
 * 2. Paste the questions below under today's date
 * 3. Push to deploy
 */

import { Question } from "./types";

// Questions organized by date (YYYY-MM-DD)
export const dailyQuestions: Record<string, Question[]> = {
  // ============================================
  // EXAMPLE - Replace with real questions
  // ============================================
  "2025-01-09": [
    {
      id: "daily-2025-01-09-1",
      type: "open",
      category: "finance",
      question: "Name a company in the 'Magnificent Seven' tech stocks",
      answers: {
        "Apple": 15,
        "Microsoft": 15,
        "Google": 20,
        "Alphabet": 20,
        "Amazon": 15,
        "Meta": 25,
        "Nvidia": 15,
        "Tesla": 25,
      },
    },
    {
      id: "daily-2025-01-09-2",
      type: "open",
      category: "sports",
      question: "Name an NFL team that clinched a playoff spot in 2024",
      answers: {
        "Chiefs": 15,
        "Kansas City Chiefs": 15,
        "Lions": 15,
        "Detroit Lions": 15,
        "Bills": 20,
        "Buffalo Bills": 20,
        "Eagles": 25,
        "Philadelphia Eagles": 25,
        "Ravens": 25,
        "Baltimore Ravens": 25,
        "Vikings": 30,
        "Texans": 35,
        "Chargers": 40,
        "Steelers": 35,
        "Broncos": 45,
        "Packers": 40,
        "Commanders": 50,
        "Buccaneers": 45,
        "Rams": 50,
      },
    },
    {
      id: "daily-2025-01-09-3",
      type: "ranked",
      category: "finance",
      question: "Rank these by 2024 stock performance (best to worst): Nvidia, Apple, Tesla, Microsoft",
      rankedList: ["Nvidia", "Tesla", "Apple", "Microsoft"],
    },
    {
      id: "daily-2025-01-09-4",
      type: "ranked",
      category: "sports",
      question: "Rank these NFL teams by 2024 regular season wins: Chiefs, Lions, Vikings, Eagles",
      rankedList: ["Lions", "Chiefs", "Vikings", "Eagles"],
    },
    {
      id: "daily-2025-01-09-5",
      type: "open",
      category: "general",
      question: "Name a world leader who resigned or was removed from office in 2024",
      answers: {
        "Justin Trudeau": 30,
        "Trudeau": 30,
        "Joe Biden": 15,
        "Biden": 15,
        "Rishi Sunak": 35,
        "Sunak": 35,
        "Fumio Kishida": 50,
        "Kishida": 50,
        "Yoon Suk Yeol": 45,
        "Olaf Scholz": 55,
        "Emmanuel Macron": 40,
        "Pedro Sanchez": 60,
      },
    },
  ],

  // ============================================
  // ADD NEW DATES BELOW
  // ============================================

  "2025-01-10": [
    {
      id: "daily-2025-01-10-1",
      type: "open",
      category: "finance",
      question: "Name one of the 'Magnificent Seven' tech stocks",
      answers: {
        "Apple": 15,
        "Microsoft": 15,
        "Nvidia": 15,
        "Amazon": 20,
        "Alphabet": 25,
        "Google": 25,
        "Meta": 30,
        "Tesla": 30,
      },
    },
    {
      id: "daily-2025-01-10-2",
      type: "open",
      category: "sports",
      question: "Name one of the 14 teams in the 2025 NFL Playoffs",
      answers: {
        "Chiefs": 15,
        "Kansas City Chiefs": 15,
        "Bills": 15,
        "Buffalo Bills": 15,
        "Ravens": 20,
        "Baltimore Ravens": 20,
        "Lions": 15,
        "Detroit Lions": 15,
        "Eagles": 20,
        "Philadelphia Eagles": 20,
        "Texans": 30,
        "Houston Texans": 30,
        "Steelers": 35,
        "Pittsburgh Steelers": 35,
        "Chargers": 40,
        "Los Angeles Chargers": 40,
        "Broncos": 45,
        "Denver Broncos": 45,
        "Vikings": 25,
        "Minnesota Vikings": 25,
        "Packers": 35,
        "Green Bay Packers": 35,
        "Commanders": 50,
        "Washington Commanders": 50,
        "Rams": 40,
        "Los Angeles Rams": 40,
        "Buccaneers": 45,
        "Tampa Bay Buccaneers": 45,
      },
    },
    {
      id: "daily-2025-01-10-3",
      type: "ranked",
      category: "general",
      question: "Rank these LA-area wildfires by acres burned (most to least): Palisades, Eaton, Kenneth, Hurst",
      rankedList: ["Palisades", "Eaton", "Hurst", "Kenneth"],
    },
    {
      id: "daily-2025-01-10-4",
      type: "ranked",
      category: "sports",
      question: "Rank these NFL quarterbacks by 2024 regular season passing yards: Josh Allen, Lamar Jackson, Jared Goff, Joe Burrow",
      rankedList: ["Joe Burrow", "Jared Goff", "Josh Allen", "Lamar Jackson"],
    },
    {
      id: "daily-2025-01-10-5",
      type: "open",
      category: "general",
      question: "Name a living former U.S. President who attended Jimmy Carter's funeral",
      answers: {
        "Joe Biden": 15,
        "Biden": 15,
        "Donald Trump": 20,
        "Trump": 20,
        "Barack Obama": 25,
        "Obama": 25,
        "George W. Bush": 35,
        "Bush": 35,
        "Bill Clinton": 40,
        "Clinton": 40,
      },
    },
  ],
};

/**
 * Get questions for a specific date
 * Returns null if no curated questions exist for that date
 */
export function getDailyQuestions(date: string): Question[] | null {
  return dailyQuestions[date] || null;
}

/**
 * Check if we have curated questions for a date
 */
export function hasDailyQuestions(date: string): boolean {
  return date in dailyQuestions;
}
