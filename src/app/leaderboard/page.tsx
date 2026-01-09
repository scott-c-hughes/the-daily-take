import Link from "next/link";

// Sample leaderboard data - in production, this would come from a database
const sampleLeaderboard = [
  { rank: 1, name: "FinanceWhiz", score: 385, streak: 12 },
  { rank: 2, name: "TriviaKing", score: 370, streak: 8 },
  { rank: 3, name: "MarketMaster", score: 355, streak: 15 },
  { rank: 4, name: "QuizPro", score: 340, streak: 5 },
  { rank: 5, name: "BrainStorm", score: 325, streak: 3 },
  { rank: 6, name: "StockStar", score: 310, streak: 7 },
  { rank: 7, name: "TriviaBuff", score: 295, streak: 2 },
  { rank: 8, name: "QuizChamp", score: 280, streak: 4 },
  { rank: 9, name: "FactFinder", score: 265, streak: 1 },
  { rank: 10, name: "KnowledgeNinja", score: 250, streak: 6 },
];

export default function LeaderboardPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-900 to-slate-800 text-white">
      <div className="max-w-2xl mx-auto px-4 py-8">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <Link
            href="/"
            className="text-slate-400 hover:text-white transition-colors"
          >
            &larr; Back
          </Link>
          <h1 className="text-2xl font-bold bg-gradient-to-r from-amber-400 to-orange-500 bg-clip-text text-transparent">
            Leaderboard
          </h1>
          <div className="w-16"></div>
        </div>

        {/* Coming soon notice */}
        <div className="bg-amber-500/10 border border-amber-500/30 rounded-xl p-4 mb-6 text-center">
          <p className="text-amber-400">
            Sign up to save your scores and compete on the leaderboard!
          </p>
        </div>

        {/* Leaderboard table */}
        <div className="bg-slate-800/50 rounded-2xl border border-slate-700 overflow-hidden">
          <div className="grid grid-cols-12 gap-4 px-6 py-3 bg-slate-700/50 text-slate-400 text-sm font-semibold">
            <div className="col-span-2">Rank</div>
            <div className="col-span-5">Player</div>
            <div className="col-span-3 text-right">Score</div>
            <div className="col-span-2 text-right">Streak</div>
          </div>

          {sampleLeaderboard.map((player) => (
            <div
              key={player.rank}
              className="grid grid-cols-12 gap-4 px-6 py-4 border-t border-slate-700/50 hover:bg-slate-700/30 transition-colors"
            >
              <div className="col-span-2">
                {player.rank <= 3 ? (
                  <span
                    className={`inline-flex items-center justify-center w-8 h-8 rounded-full font-bold ${
                      player.rank === 1
                        ? "bg-amber-500 text-slate-900"
                        : player.rank === 2
                        ? "bg-slate-400 text-slate-900"
                        : "bg-amber-700 text-white"
                    }`}
                  >
                    {player.rank}
                  </span>
                ) : (
                  <span className="text-slate-400 pl-2">{player.rank}</span>
                )}
              </div>
              <div className="col-span-5 font-medium">{player.name}</div>
              <div className="col-span-3 text-right text-amber-400 font-semibold">
                {player.score}
              </div>
              <div className="col-span-2 text-right text-slate-400">
                {player.streak} days
              </div>
            </div>
          ))}
        </div>

        {/* Your position */}
        <div className="mt-6 bg-slate-800/50 rounded-xl p-4 border border-slate-700 text-center">
          <p className="text-slate-400">
            Play today&apos;s game to see your ranking!
          </p>
        </div>
      </div>
    </div>
  );
}
