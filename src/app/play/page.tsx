"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { getTodaysGame, scoreOpenAnswer, scoreRankedAnswer, getValidAnswers } from "@/lib/questions";
import { Question, GameState, DailyGame } from "@/lib/types";

export default function PlayPage() {
  const router = useRouter();
  const [game, setGame] = useState<DailyGame | null>(null);
  const [gameState, setGameState] = useState<GameState>({
    currentQuestionIndex: 0,
    answers: [],
    scores: [],
    isComplete: false,
  });

  // For open questions
  const [textAnswer, setTextAnswer] = useState("");
  const [suggestions, setSuggestions] = useState<string[]>([]);

  // For ranked questions
  const [rankedOrder, setRankedOrder] = useState<string[]>([]);

  // Load today's game
  useEffect(() => {
    const todaysGame = getTodaysGame();
    setGame(todaysGame);
  }, []);

  // Initialize ranked order when question changes
  useEffect(() => {
    if (!game) return;
    const currentQuestion = game.questions[gameState.currentQuestionIndex];
    if (currentQuestion?.type === "ranked") {
      // Shuffle the list for the user to reorder
      const shuffled = [...currentQuestion.rankedList].sort(() => Math.random() - 0.5);
      setRankedOrder(shuffled);
    }
  }, [game, gameState.currentQuestionIndex]);

  if (!game) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-slate-900 to-slate-800 text-white flex items-center justify-center">
        <p>Loading...</p>
      </div>
    );
  }

  const currentQuestion = game.questions[gameState.currentQuestionIndex];
  const questionNumber = gameState.currentQuestionIndex + 1;
  const totalQuestions = game.questions.length;

  // Handle text input for open questions
  const handleTextChange = (value: string) => {
    setTextAnswer(value);

    // Filter suggestions
    if (value.length >= 1 && currentQuestion.type === "open") {
      const validAnswers = getValidAnswers(currentQuestion);
      const filtered = validAnswers.filter((answer) =>
        answer.toLowerCase().includes(value.toLowerCase())
      );
      setSuggestions(filtered.slice(0, 5));
    } else {
      setSuggestions([]);
    }
  };

  // Submit answer for open question
  const submitOpenAnswer = (answer: string) => {
    const score = scoreOpenAnswer(currentQuestion, answer);
    advanceGame(answer, score);
  };

  // Submit answer for ranked question
  const submitRankedAnswer = () => {
    const score = scoreRankedAnswer(currentQuestion, rankedOrder);
    advanceGame(rankedOrder.join(", "), score);
  };

  // Move to next question or finish game
  const advanceGame = (answer: string, score: number) => {
    const newAnswers = [...gameState.answers, answer];
    const newScores = [...gameState.scores, score];

    if (gameState.currentQuestionIndex + 1 >= totalQuestions) {
      // Game complete - save to localStorage and redirect
      const finalState = {
        ...gameState,
        answers: newAnswers,
        scores: newScores,
        isComplete: true,
      };
      localStorage.setItem("lastGameResults", JSON.stringify({
        date: game.date,
        answers: newAnswers,
        scores: newScores,
        questions: game.questions.map(q => q.question),
      }));
      router.push("/results");
    } else {
      // Move to next question
      setGameState({
        ...gameState,
        currentQuestionIndex: gameState.currentQuestionIndex + 1,
        answers: newAnswers,
        scores: newScores,
      });
      setTextAnswer("");
      setSuggestions([]);
    }
  };

  // Move item in ranked list
  const moveItem = (index: number, direction: "up" | "down") => {
    const newOrder = [...rankedOrder];
    const newIndex = direction === "up" ? index - 1 : index + 1;
    if (newIndex < 0 || newIndex >= newOrder.length) return;

    [newOrder[index], newOrder[newIndex]] = [newOrder[newIndex], newOrder[index]];
    setRankedOrder(newOrder);
  };

  // Get category badge color
  const getCategoryColor = (category: string) => {
    switch (category) {
      case "finance":
        return "bg-emerald-500";
      case "sports":
        return "bg-blue-500";
      case "general":
        return "bg-purple-500";
      default:
        return "bg-slate-500";
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-900 to-slate-800 text-white">
      <div className="max-w-2xl mx-auto px-4 py-8">
        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-2xl font-bold bg-gradient-to-r from-amber-400 to-orange-500 bg-clip-text text-transparent">
            The Daily Take
          </h1>
          <div className="text-slate-400">
            Question {questionNumber} of {totalQuestions}
          </div>
        </div>

        {/* Progress bar */}
        <div className="h-2 bg-slate-700 rounded-full mb-8 overflow-hidden">
          <div
            className="h-full bg-gradient-to-r from-amber-500 to-orange-500 transition-all duration-300"
            style={{ width: `${(questionNumber / totalQuestions) * 100}%` }}
          />
        </div>

        {/* Question card */}
        <div className="bg-slate-800/50 rounded-2xl p-6 border border-slate-700 mb-6">
          {/* Category badge */}
          <span
            className={`inline-block px-3 py-1 rounded-full text-xs font-semibold text-white mb-4 ${getCategoryColor(
              currentQuestion.category
            )}`}
          >
            {currentQuestion.category.charAt(0).toUpperCase() + currentQuestion.category.slice(1)}
          </span>

          {/* Question text */}
          <h2 className="text-xl md:text-2xl font-semibold mb-6">
            {currentQuestion.question}
          </h2>

          {/* Answer input based on question type */}
          {currentQuestion.type === "open" ? (
            <div className="space-y-4">
              <div className="relative">
                <input
                  type="text"
                  value={textAnswer}
                  onChange={(e) => handleTextChange(e.target.value)}
                  placeholder="Type your answer..."
                  className="w-full bg-slate-700 border border-slate-600 rounded-xl px-4 py-3 text-white placeholder-slate-400 focus:outline-none focus:border-amber-500 transition-colors"
                  onKeyDown={(e) => {
                    if (e.key === "Enter" && textAnswer.trim()) {
                      submitOpenAnswer(textAnswer);
                    }
                  }}
                />

                {/* Autocomplete suggestions */}
                {suggestions.length > 0 && (
                  <div className="absolute top-full left-0 right-0 mt-2 bg-slate-700 border border-slate-600 rounded-xl overflow-hidden z-10">
                    {suggestions.map((suggestion, index) => (
                      <button
                        key={index}
                        onClick={() => {
                          setTextAnswer(suggestion);
                          setSuggestions([]);
                        }}
                        className="w-full px-4 py-2 text-left hover:bg-slate-600 transition-colors"
                      >
                        {suggestion}
                      </button>
                    ))}
                  </div>
                )}
              </div>

              <button
                onClick={() => submitOpenAnswer(textAnswer)}
                disabled={!textAnswer.trim()}
                className="w-full bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-400 hover:to-orange-400 disabled:from-slate-600 disabled:to-slate-600 disabled:cursor-not-allowed text-slate-900 disabled:text-slate-400 font-bold py-3 rounded-xl transition-all"
              >
                Submit Answer
              </button>
            </div>
          ) : (
            <div className="space-y-4">
              <p className="text-slate-400 text-sm mb-2">
                Drag to reorder (1st at top, last at bottom):
              </p>

              {/* Ranked list */}
              <div className="space-y-2">
                {rankedOrder.map((item, index) => (
                  <div
                    key={item}
                    className="flex items-center gap-3 bg-slate-700 rounded-xl px-4 py-3"
                  >
                    <span className="text-amber-500 font-bold w-6">{index + 1}.</span>
                    <span className="flex-1">{item}</span>
                    <div className="flex gap-1">
                      <button
                        onClick={() => moveItem(index, "up")}
                        disabled={index === 0}
                        className="p-1 hover:bg-slate-600 rounded disabled:opacity-30 disabled:cursor-not-allowed"
                      >
                        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 15l7-7 7 7" />
                        </svg>
                      </button>
                      <button
                        onClick={() => moveItem(index, "down")}
                        disabled={index === rankedOrder.length - 1}
                        className="p-1 hover:bg-slate-600 rounded disabled:opacity-30 disabled:cursor-not-allowed"
                      >
                        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                        </svg>
                      </button>
                    </div>
                  </div>
                ))}
              </div>

              <button
                onClick={submitRankedAnswer}
                className="w-full bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-400 hover:to-orange-400 text-slate-900 font-bold py-3 rounded-xl transition-all"
              >
                Lock In Order
              </button>
            </div>
          )}
        </div>

        {/* Current score */}
        {gameState.scores.length > 0 && (
          <div className="text-center text-slate-400">
            Current score: <span className="text-amber-500 font-bold">{gameState.scores.reduce((a, b) => a + b, 0)}</span> points
          </div>
        )}
      </div>
    </div>
  );
}
