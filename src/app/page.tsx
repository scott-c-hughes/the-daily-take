import Link from "next/link";

export default function Home() {
  // Get today's date for display
  const today = new Date();
  const dateString = today.toLocaleDateString("en-US", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-900 to-slate-800 text-white">
      <main className="flex flex-col items-center justify-center min-h-screen px-4">
        {/* Logo/Title */}
        <div className="text-center mb-12">
          <h1 className="text-5xl md:text-7xl font-bold mb-4 bg-gradient-to-r from-amber-400 to-orange-500 bg-clip-text text-transparent">
            The Daily Take
          </h1>
          <p className="text-slate-400 text-lg md:text-xl">
            Finance • Sports • General Knowledge
          </p>
        </div>

        {/* Date */}
        <p className="text-slate-500 mb-8">{dateString}</p>

        {/* Game Info */}
        <div className="bg-slate-800/50 rounded-2xl p-6 mb-8 max-w-md w-full border border-slate-700">
          <h2 className="text-xl font-semibold mb-4 text-center">How It Works</h2>
          <ul className="space-y-3 text-slate-300">
            <li className="flex items-start gap-3">
              <span className="bg-amber-500 text-slate-900 rounded-full w-6 h-6 flex items-center justify-center text-sm font-bold shrink-0">
                5
              </span>
              <span>Questions per day</span>
            </li>
            <li className="flex items-start gap-3">
              <span className="bg-amber-500 text-slate-900 rounded-full w-6 h-6 flex items-center justify-center text-sm font-bold shrink-0">
                1
              </span>
              <span>Guess per question — no going back!</span>
            </li>
            <li className="flex items-start gap-3">
              <span className="bg-amber-500 text-slate-900 rounded-full w-6 h-6 flex items-center justify-center text-sm font-bold shrink-0">
                ?
              </span>
              <span>Unique answers score higher points</span>
            </li>
          </ul>
        </div>

        {/* Play Button */}
        <Link
          href="/play"
          className="bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-400 hover:to-orange-400 text-slate-900 font-bold text-xl px-12 py-4 rounded-full transition-all transform hover:scale-105 shadow-lg shadow-amber-500/25"
        >
          Play Today&apos;s Game
        </Link>

        {/* Footer links */}
        <div className="flex gap-6 mt-12 text-slate-500 text-sm">
          <Link href="/leaderboard" className="hover:text-amber-400 transition-colors">
            Leaderboard
          </Link>
          <Link href="/about" className="hover:text-amber-400 transition-colors">
            About
          </Link>
        </div>
      </main>
    </div>
  );
}
