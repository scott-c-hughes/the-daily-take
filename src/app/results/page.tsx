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
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    const stored = localStorage.getItem("lastGameResults");
    if (stored) {
      setResults(JSON.parse(stored));
    }
  }, []);

  if (!results) {
    return (
      <div className="min-h-screen bg-slate-900 text-white flex flex-col items-center justify-center px-4">
        <h1 className="text-2xl font-bold mb-4">No results found</h1>
        <p className="text-slate-400 mb-8">Play today&apos;s game first!</p>
        <Link
          href="/"
          className="bg-amber-500 hover:bg-amber-400 text-slate-900 font-bold px-8 py-3 rounded-full"
        >
          Go Home
        </Link>
      </div>
    );
  }

  const totalScore = results.scores.reduce((a, b) => a + b, 0);
  const maxScore = results.scores.length * 100;

  // Format date nicely
  const formatDate = (dateStr: string) => {
    const date = new Date(dateStr + "T00:00:00");
    return date.toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    });
  };

  // Get block color based on score
  const getBlockColor = (score: number) => {
    if (score >= 80) return "bg-emerald-500";
    if (score >= 50) return "bg-amber-500";
    if (score > 0) return "bg-orange-500";
    return "bg-slate-600";
  };

  // Get emoji for share text
  const getEmoji = (score: number) => {
    if (score >= 80) return "🟩";
    if (score >= 50) return "🟨";
    if (score > 0) return "🟧";
    return "⬛";
  };

  // Generate shareable text
  const getShareText = () => {
    const emojiRow = results.scores.map(getEmoji).join("");
    return `The Daily Take\n${formatDate(results.date)}\n\n${emojiRow}\n\n${totalScore}/${maxScore}\n\nthe-daily-take.vercel.app`;
  };

  const handleShare = async () => {
    const text = getShareText();

    if (navigator.share) {
      try {
        await navigator.share({ text });
      } catch {
        copyToClipboard(text);
      }
    } else {
      copyToClipboard(text);
    }
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  // Get score color for breakdown
  const getScoreColor = (score: number) => {
    if (score >= 80) return "text-emerald-400";
    if (score >= 50) return "text-amber-400";
    if (score > 0) return "text-orange-400";
    return "text-slate-500";
  };

  return (
    <div className="bg-slate-900 text-white">
      {/* ========== SCREENSHOT AREA ========== */}
      <div className="max-w-md mx-auto px-4 pt-12 pb-6">
        {/* Logo */}
        <h1 className="text-3xl font-bold text-center mb-1 tracking-tight">
          The Daily Take
        </h1>

        {/* Date */}
        <p className="text-slate-500 text-center text-sm mb-8">
          {formatDate(results.date)}
        </p>

        {/* Score Blocks */}
        <div className="flex justify-center gap-3 mb-8">
          {results.scores.map((score, index) => (
            <div
              key={index}
              className={`w-14 h-14 rounded-lg ${getBlockColor(score)} flex items-center justify-center`}
            >
              <span className="text-white font-bold">{score}</span>
            </div>
          ))}
        </div>

        {/* Total Score */}
        <div className="text-center mb-8">
          <span className="text-6xl font-bold">{totalScore}</span>
          <span className="text-slate-500 text-3xl">/{maxScore}</span>
        </div>

        {/* URL for screenshot */}
        <p className="text-slate-600 text-center text-sm mb-6">
          the-daily-take.vercel.app
        </p>

        {/* Share Button - in screenshot area */}
        <button
          onClick={handleShare}
          className="w-full bg-amber-500 hover:bg-amber-400 text-slate-900 font-bold py-4 rounded-xl transition-all flex items-center justify-center gap-2"
        >
          {copied ? (
            <>
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
              Copied!
            </>
          ) : (
            <>
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z" />
              </svg>
              Share Results
            </>
          )}
        </button>
      </div>
      {/* ========== END SCREENSHOT AREA ========== */}

      {/* Below the fold */}
      <div className="max-w-md mx-auto px-4 pb-8">
        <Link
          href="/"
          className="block w-full text-center border border-slate-700 hover:border-slate-500 text-slate-400 hover:text-white font-semibold py-3 rounded-xl transition-all mb-8"
        >
          Back to Home
        </Link>

        {/* Question Breakdown */}
        <div className="border-t border-slate-800 mb-6"></div>
        <h2 className="text-sm font-semibold text-slate-500 uppercase tracking-wide mb-4">
          Your Answers
        </h2>
        <div className="space-y-3">
          {results.questions.map((question, index) => (
            <div
              key={index}
              className="bg-slate-800/50 rounded-xl p-4"
            >
              <div className="flex justify-between items-center mb-2">
                <span className="text-slate-500 text-xs">Q{index + 1}</span>
                <span className={`font-bold text-sm ${getScoreColor(results.scores[index])}`}>
                  {results.scores[index]} pts
                </span>
              </div>
              <p className="text-slate-400 text-sm mb-1">{question}</p>
              <p className="text-white text-sm">{results.answers[index]}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
