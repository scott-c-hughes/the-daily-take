"use client";

import { useState, useEffect } from "react";
import Link from "next/link";

interface GameResults {
  date: string;
  answers: string[];
  scores: number[];
  questions: string[];
}

export default function ResultsPage() {
  const [results, setResults] = useState<GameResults | null>(null);

  useEffect(() => {
    const stored = localStorage.getItem("lastGameResults");
    if (stored) {
      setResults(JSON.parse(stored));
    }
  }, []);

  if (!results) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-slate-900 to-slate-800 text-white flex flex-col items-center justify-center px-4">
        <h1 className="text-2xl font-bold mb-4">No results found</h1>
        <p className="text-slate-400 mb-8">Play today&apos;s game first!</p>
        <Link
          href="/"
          className="bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-400 hover:to-orange-400 text-slate-900 font-bold px-8 py-3 rounded-full"
        >
          Go Home
        </Link>
      </div>
    );
  }

  const totalScore = results.scores.reduce((a, b) => a + b, 0);
  const maxScore = results.scores.length * 100;
  const percentage = Math.round((totalScore / maxScore) * 100);

  // Generate shareable text
  const getShareText = () => {
    const scoreEmojis = results.scores.map((score) => {
      if (score >= 80) return "🟢";
      if (score >= 50) return "🟡";
      if (score > 0) return "🟠";
      return "🔴";
    });

    return `The Daily Take - ${results.date}\n\n${scoreEmojis.join(" ")}\n\nScore: ${totalScore}/${maxScore} (${percentage}%)\n\nPlay at: thedailytake.com`;
  };

  const handleShare = async () => {
    const text = getShareText();

    if (navigator.share) {
      try {
        await navigator.share({ text });
      } catch {
        // User cancelled or error
        copyToClipboard(text);
      }
    } else {
      copyToClipboard(text);
    }
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    alert("Results copied to clipboard!");
  };

  // Get performance message
  const getMessage = () => {
    if (percentage >= 90) return "Outstanding! You're a trivia master!";
    if (percentage >= 70) return "Great job! Solid performance!";
    if (percentage >= 50) return "Not bad! Room to improve.";
    if (percentage >= 30) return "Keep practicing!";
    return "Tough day! Try again tomorrow.";
  };

  // Get score color
  const getScoreColor = (score: number) => {
    if (score >= 80) return "text-emerald-400";
    if (score >= 50) return "text-amber-400";
    if (score > 0) return "text-orange-400";
    return "text-red-400";
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-900 to-slate-800 text-white">
      <div className="max-w-2xl mx-auto px-4 py-8">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold bg-gradient-to-r from-amber-400 to-orange-500 bg-clip-text text-transparent mb-2">
            Game Complete!
          </h1>
          <p className="text-slate-400">{results.date}</p>
        </div>

        {/* Total Score */}
        <div className="bg-slate-800/50 rounded-2xl p-8 border border-slate-700 mb-6 text-center">
          <div className="text-6xl font-bold mb-2">
            <span className="bg-gradient-to-r from-amber-400 to-orange-500 bg-clip-text text-transparent">
              {totalScore}
            </span>
            <span className="text-slate-500 text-3xl">/{maxScore}</span>
          </div>
          <div className="text-2xl text-slate-400 mb-4">{percentage}%</div>
          <p className="text-lg text-slate-300">{getMessage()}</p>
        </div>

        {/* Question breakdown */}
        <div className="bg-slate-800/50 rounded-2xl p-6 border border-slate-700 mb-6">
          <h2 className="text-xl font-semibold mb-4">Question Breakdown</h2>
          <div className="space-y-4">
            {results.questions.map((question, index) => (
              <div
                key={index}
                className="bg-slate-700/50 rounded-xl p-4"
              >
                <div className="flex justify-between items-start mb-2">
                  <span className="text-slate-400 text-sm">Q{index + 1}</span>
                  <span className={`font-bold ${getScoreColor(results.scores[index])}`}>
                    {results.scores[index]} pts
                  </span>
                </div>
                <p className="text-slate-300 text-sm mb-2">{question}</p>
                <p className="text-slate-500 text-sm">
                  Your answer: <span className="text-slate-300">{results.answers[index]}</span>
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Share button */}
        <button
          onClick={handleShare}
          className="w-full bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-400 hover:to-orange-400 text-slate-900 font-bold py-4 rounded-xl transition-all mb-4 flex items-center justify-center gap-2"
        >
          <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z"
            />
          </svg>
          Share Results
        </button>

        {/* Navigation */}
        <div className="flex gap-4">
          <Link
            href="/"
            className="flex-1 text-center border border-slate-600 hover:border-amber-500 text-slate-300 hover:text-white font-semibold py-3 rounded-xl transition-all"
          >
            Home
          </Link>
          <Link
            href="/leaderboard"
            className="flex-1 text-center border border-slate-600 hover:border-amber-500 text-slate-300 hover:text-white font-semibold py-3 rounded-xl transition-all"
          >
            Leaderboard
          </Link>
        </div>
      </div>
    </div>
  );
}
